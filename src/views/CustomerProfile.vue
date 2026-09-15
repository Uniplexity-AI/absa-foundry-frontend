<script setup>
/**
 * Customer Profile — single-customer predictive profile.
 *
 * Pairs with the My Customers list: identity/predictive-insight cards on top,
 * the 12-month lifecycle journey, the AI next-best-action card, and the
 * per-customer action history below.
 */
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { churnTier, healthTier, stateTier, tierColor } from '@/composables/useSeverityTier'
import { getActionLog, getCustomerState, hydrateLogFromServer, recordAction } from '@/utils/absaActions'
import { notify } from '@/utils/absaExport'
import { fetchCustomerProfile } from '@/services/customerProfileApi'
import { deleteCustomer } from '@/services/customerAdminApi'
import { decodeJWT } from '@/services/decodeJWT'
import CustomerStatePill from '@/components/CustomerStatePill.vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

defineOptions({ name: 'CustomerProfile' })

const TWELVE_MONTHS_MS = 365 * 24 * 60 * 60 * 1000

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()
const snapshotStore = useSnapshotStore()

const api = axios.create({ baseURL: API_BASE_URL, timeout: 30000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const loading = ref(true)
const reasonCodes = ref([])
const recommendations = ref([])
const actionLog = ref([])
const historyFilter = ref('')
const nbaDismissed = ref(false)
const localState = ref(null)
// Identity facts composed server-side from the clean layer (account number,
// national ID, tenure, assigned RM, health score).
const profile = ref(null)

const customerId = computed(() => String(route.params.id || ''))
const customer = computed(() => customerStore.selectedCustomer || {})
// The identity header comes from Postgres, so the page stays useful even when
// the customer-state / prediction services are unreachable.
const isEmpty = computed(() => !loading.value && !customerStore.selectedCustomer && !profile.value)
const features = computed(() => customerStore.features || {})

const displayName = computed(
  () => profile.value?.full_name || customer.value.fullName || `Customer ${customerId.value}`
)
const state = computed(
  () => profile.value?.lifecycle_state || customer.value.state || 'UNKNOWN'
)
const stateColor = computed(() => tierColor(stateTier(state.value)))

const initials = computed(() => {
  const name = displayName.value.replace(/^Customer\s+/i, '')
  return name.slice(0, 2).toUpperCase() || 'CU'
})

const clientTier = computed(() => {
  const code = customer.value.segmentCode
  if (['Prestige', 'Premier'].includes(code)) return 'Verified Private Client'
  return profile.value?.market_segment || customer.value.segmentLabel || ''
})

const healthScore = computed(() => {
  const fromProfile = profile.value?.health_score
  if (fromProfile != null) return fromProfile
  const h = predictionStore.healthScores[customerId.value]?.health_score
  if (h != null) return h
  return customer.value.healthScore ?? null
})

const churnProbability = computed(() => {
  const p = predictionStore.predictions[customerId.value]
  const value = p?.churn_probability ?? customer.value.churnProbability
  return value == null ? null : Number(value)
})

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value]
  return p?.clv_percentile ?? null
})

const components = computed(() => {
  const h = predictionStore.healthScores[customerId.value]
  return h?.component_scores || customer.value._raw?.component_scores || {}
})

const computedAt = computed(() => customer.value._raw?.computed_at || customer.value.computedAt || null)

const timelineEntries = computed(() => {
  const raw = customerStore.timeline
  return Array.isArray(raw) ? raw : (raw?.timeline || [])
})

const stateSince = computed(() => {
  const entries = timelineEntries.value
  if (!entries.length) return null
  const current = entries.filter((e) => e.state === state.value)
  return (current.length ? current[current.length - 1] : entries[entries.length - 1]).as_of_date
})

const tenureLabel = computed(() => {
  const days = features.value.customer_tenure_days
  if (days != null) {
    const years = days / 365
    return years >= 1 ? `${years.toFixed(0)} Years` : `${Math.round(days / 30)} Months`
  }
  const entries = timelineEntries.value
  if (entries.length) {
    const sorted = [...entries].sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date))
    const first = new Date(sorted[0].as_of_date)
    const months = Math.max(1, Math.round((Date.now() - first.getTime()) / TWELVE_MONTHS_MS * 12))
    return months >= 12 ? `${(months / 12).toFixed(0)} Years` : `${months} Months`
  }
  return '—'
})

const assignedRm = computed(() => {
  const fromProfile = profile.value?.assigned_rm
  if (fromProfile) return fromProfile
  const s = localState.value || getCustomerState(customerId.value)
  return s?.rm || customer.value._raw?.assigned_rm || null
})

// ── Headline identity facts (account, NRC, tenure, RM, health) ──
const accountNumber = computed(() => profile.value?.account_number || customer.value._raw?.account_number || null)

const accountSub = computed(() => {
  const type = profile.value?.account_type
  const count = profile.value?.account_count
  if (!accountNumber.value) return 'No account on record'
  const parts = []
  if (type) parts.push(prettify(type))
  if (count > 1) parts.push(`${count} accounts held`)
  return parts.join(' · ') || null
})

const nationalId = computed(() => profile.value?.national_id || customer.value._raw?.national_id || null)

const tenureText = computed(() => profile.value?.tenure_label || (tenureLabel.value !== '—' ? tenureLabel.value : null))

const tenureSub = computed(() => {
  const since = profile.value?.customer_since_date || customer.value._raw?.customer_since_date
  return since ? `Since ${fmtDate(since)}` : null
})

const assignedRmSub = computed(() => (assignedRm.value ? 'Relationship Manager' : 'Not yet assigned'))

const ageText = computed(() => {
  const age = profile.value?.age_years
  return age != null ? `${age} years old` : null
})

const lastActivityText = computed(() => {
  const days = features.value.days_since_last_txn
  if (days == null) return '—'
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
})

const healthTileLabel = computed(() => (hasHealth.value ? ringTierLabel.value : 'Not available'))

const detailFields = computed(() => {
  const f = features.value
  return [
    { label: 'Branch', value: profile.value?.branch_code || customer.value.branch || '—' },
    { label: 'Segment', value: profile.value?.market_segment || customer.value.segmentLabel || '—' },
    { label: 'KYC Tier', value: profile.value?.kyc_tier || '—' },
    { label: 'Nationality', value: profile.value?.nationality || '—' },
    { label: 'Last Activity', value: lastActivityText.value },
    { label: 'Lifecycle State', value: String(state.value).replace(/_/g, ' ') },
  ]
})

// ── Health-score ring (inline SVG) ──────────────────────────────
const RING_SIZE = 132
const RING_STROKE = 11
const ringValue = computed(() => {
  const n = Number(healthScore.value)
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0
})
const hasHealth = computed(() => healthScore.value != null && Number.isFinite(Number(healthScore.value)))
const ringColor = computed(() => tierColor(healthTier(ringValue.value)))
const ringTierLabel = computed(() => {
  if (!hasHealth.value) return 'No Data'
  const s = ringValue.value
  if (s < 25) return 'Critical'
  if (s < 40) return 'High Risk'
  if (s < 60) return 'Watch'
  if (s < 80) return 'Healthy'
  return 'Thriving'
})
const ringRadius = computed(() => (RING_SIZE - RING_STROKE) / 2)
const ringCircumference = computed(() => 2 * Math.PI * ringRadius.value)
const ringDashOffset = computed(() => ringCircumference.value * (1 - ringValue.value / 100))

const insightMetrics = computed(() => {
  const c = components.value
  const churnPct = churnProbability.value != null ? (churnProbability.value * 100) : null
  const clvPct = clvPercentile.value != null ? Math.round(clvPercentile.value * 100) : null
  const behaviour = c.behaviour_sub ?? features.value.engagement_score ?? null
  return [
    {
      label: 'Churn Risk',
      value: churnPct != null ? (churnPct >= 60 ? 'High' : churnPct >= 30 ? 'Medium' : 'Low') + ` (${churnPct.toFixed(1)}%)` : '—',
      pct: churnPct ?? 0,
      color: tierColor(churnTier(churnProbability.value)),
    },
    {
      label: 'CLV Percentile',
      value: clvPct != null ? `${clvPct}th` : '—',
      pct: clvPct ?? 0,
      color: tierColor('passion'),
    },
    {
      label: 'Behavioural Score',
      value: behaviour != null ? (Number(behaviour) < 40 ? 'Low' : Number(behaviour) < 70 ? 'Moderate' : 'High') + ` (${Math.round(behaviour)})` : '—',
      pct: behaviour != null ? Math.min(100, Math.max(0, Number(behaviour))) : 0,
      color: behaviour != null && Number(behaviour) < 40 ? tierColor('inspire') : tierColor(healthTier(behaviour)),
    },
  ]
})

const riskDrivers = computed(() => {
  const risks = reasonCodes.value.filter((r) => r.category === 'RISK' && r.severity !== 'LOW')
  if (risks.length) {
    return risks.slice(0, 4).map((r) => {
      const color = r.severity === 'HIGH' ? tierColor('inspire') : tierColor('hope')
      return {
        label: prettify(r.code),
        value: r.severity,
        pct: r.severity === 'HIGH' ? 92 : r.severity === 'MEDIUM' ? 60 : 30,
        color,
        detail: detailText(r.detail) || 'Flagged by the lifecycle reason-code engine.',
      }
    })
  }
  // Fallback: derive drivers from the behavioural feature snapshot.
  const f = features.value
  const derived = []
  if (f.days_since_last_txn != null && f.days_since_last_txn > 30) {
    derived.push({
      label: 'Digital / Transaction Recency',
      value: `${f.days_since_last_txn}d`,
      pct: Math.min(100, (f.days_since_last_txn / 180) * 100),
      color: tierColor('hope'),
      detail: `No transaction activity recorded for ${f.days_since_last_txn} days.`,
    })
  }
  if (f.amount_growth_ratio != null && f.amount_growth_ratio < 0) {
    derived.push({
      label: 'Transaction Value Trend',
      value: `${(f.amount_growth_ratio * 100).toFixed(0)}%`,
      pct: Math.min(100, Math.abs(f.amount_growth_ratio) * 100),
      color: tierColor('inspire'),
      detail: 'Decline in transaction value versus the previous window.',
    })
  }
  if (f.engagement_score != null && f.engagement_score < 40) {
    derived.push({
      label: 'Engagement',
      value: `${Math.round(f.engagement_score)}/100`,
      pct: Math.max(8, 100 - f.engagement_score),
      color: tierColor('hope'),
      detail: 'Low digital engagement relative to the portfolio average.',
    })
  }
  if (f.txn_frequency_trend != null && f.txn_frequency_trend < 0) {
    derived.push({
      label: 'Transaction Frequency',
      value: `${(f.txn_frequency_trend * 100).toFixed(0)}%`,
      pct: Math.min(100, Math.abs(f.txn_frequency_trend) * 100),
      color: tierColor('power'),
      detail: 'Fewer transactions than the prior period.',
    })
  }
  return derived.slice(0, 4)
})

const journeyNodes = computed(() => {
  const entries = [...timelineEntries.value]
    .filter((e) => e.as_of_date)
    .sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date))
  const cutoff = Date.now() - TWELVE_MONTHS_MS
  const recent = entries.filter((e) => new Date(e.as_of_date).getTime() >= cutoff)
  const source = recent.length ? recent : entries.slice(-6)
  if (!source.length) return []

  // Collapse consecutive duplicate states, always keeping the latest snapshot.
  const collapsed = []
  for (const e of source) {
    if (!collapsed.length || collapsed[collapsed.length - 1].state !== e.state) collapsed.push(e)
  }
  const last = source[source.length - 1]
  if (collapsed[collapsed.length - 1] !== last) collapsed.push(last)

  return collapsed.slice(-6).map((e, i, arr) => ({
    label: String(e.state || '—').replace(/_/g, ' '),
    color: tierColor(stateTier(e.state)),
    when: relativeMonths(e.as_of_date),
    isCurrent: i === arr.length - 1,
  }))
})

const nba = computed(() => {
  const top = recommendations.value[0]
  const churn = churnProbability.value
  const confidence = top?.propensity_score != null
    ? Math.round(top.propensity_score * 100)
    : churn != null ? Math.round(Math.min(0.95, 0.55 + churn * 0.45) * 100) : null

  if (top) {
    const product = top.product_name || top.campaign_name || 'Retention offer'
    return {
      priority: 'I',
      confidence,
      icon: 'phone_in_talk',
      title: top.campaign_name || `Offer ${product}`,
      source: 'AI-Lifecycle Engine',
      rationale: top.reason || `Customer qualifies for ${product} based on current lifecycle signals and product propensity.`,
    }
  }

  const fallback = {
    CHURNED: {
      title: 'Immediate Retention',
      icon: 'phone_in_talk',
      rationale: 'Customer has churned. A win-back conversation with a tailored loyalty offer has the highest probability of re-engagement within 48 hours.',
    },
    DORMANT: {
      title: 'Re-engagement Outreach',
      icon: 'campaign',
      rationale: 'Customer has been dormant for an extended period. A proactive re-engagement call with a personalised offer is recommended.',
    },
    AT_RISK: {
      title: 'Retention Call',
      icon: 'support_agent',
      rationale: 'Customer is showing early signs of disengagement. A retention call with a relationship-manager offer is recommended.',
    },
    ACTIVE: {
      title: 'Relationship Review',
      icon: 'handshake',
      rationale: 'Customer is active. Review product holdings for cross-sell and deepen the relationship.',
    },
  }[state.value] || {
    title: 'Monitor & Review',
    icon: 'visibility',
    rationale: 'No immediate intervention required. Continue monitoring lifecycle signals.',
  }
  return { priority: 'I', confidence, source: 'AI-Lifecycle Engine', ...fallback }
})

const historyEntries = computed(() => {
  return actionLog.value
    .filter((a) => !a.customerId || a.customerId === customerId.value)
    .map((a) => ({
      id: a.id,
      title: prettify(a.type || 'Action'),
      at: a.at,
      detail: a.detail || a.meta?.reason || 'Logged by the relationship manager.',
      actor: a.actor,
    }))
})

const historyTypes = computed(() => [...new Set(historyEntries.value.map((h) => h.title))])

const filteredHistory = computed(() =>
  historyFilter.value ? historyEntries.value.filter((h) => h.title === historyFilter.value) : historyEntries.value
)

const coreBankingUrl = computed(() =>
  `https://corebanking.absa.local/customer/${encodeURIComponent(customerId.value)}`
)

// ── Helpers ────────────────────────────────────────────────────
function prettify(code) {
  return String(code || '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function detailText(detail) {
  if (!detail || typeof detail !== 'object' || !Object.keys(detail).length) return ''
  return Object.entries(detail)
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}`)
    .join(' · ')
}

function fmtDate(value) {
  if (!value) return '—'
  try { return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return String(value) }
}

function relativeMonths(value) {
  const ms = Date.now() - new Date(value).getTime()
  const months = Math.round(ms / (30 * 24 * 60 * 60 * 1000))
  if (months <= 0) return 'Now'
  return `${months}m ago`
}

// ── Actions ────────────────────────────────────────────────────
async function copyId() {
  try {
    await navigator.clipboard.writeText(customerId.value)
    notify(`Customer ID ${customerId.value} copied`, 'success', { autoClose: 2000 })
  } catch {
    notify('Could not copy — clipboard unavailable', 'error', { autoClose: 2500 })
  }
}
// ── Delete (soft, reversible) ─────────────────────────────
// Deletion is restricted to OPERATIONS on the backend (ADMIN bypasses). This
// only decides whether the control renders — the server still enforces it.
const canDelete = computed(() => {
  try {
    const jwt = decodeJWT()
    const roles = jwt.getUserRoles?.() || [jwt.getUserRole?.()].filter(Boolean)
    return roles
      .map((r) => String(r).toUpperCase())
      .some((r) => ['ADMIN', 'OPERATIONS'].includes(r))
  } catch {
    return false
  }
})

const confirmOpen = ref(false)
const deleteReason = ref('')
const deleting = ref(false)

function askDelete() {
  deleteReason.value = ''
  confirmOpen.value = true
}

function cancelDelete() {
  confirmOpen.value = false
  deleteReason.value = ''
}

async function confirmDelete() {
  if (deleting.value) return
  deleting.value = true
  try {
    const result = await deleteCustomer(customerId.value, deleteReason.value.trim() || undefined)
    confirmOpen.value = false

    if (!result.deleted) {
      notify(
        result.already_deleted?.length
          ? 'That customer was already deleted'
          : `Customer ${customerId.value} was not found`,
        'error',
        { autoClose: 4000 },
      )
      return
    }

    // The profile 404s once flagged, so this page can no longer render the
    // record — leave before the page refetches anything.
    notify(
      `Deleted ${displayName.value} — hidden from the portfolio and restorable from My Customers`,
      'success',
      { autoClose: 5000 },
    )
    await customerStore.fetchPortfolio()
    router.push({ name: 'MyCustomers' })
  } catch (e) {
    notify(e.message || 'Delete failed', 'error', { autoClose: 6000 })
  } finally {
    deleting.value = false
  }
}
function logAction() {
  const entry = recordAction({
    type: nba.value.title,
    customerId: customerId.value,
    customerName: displayName.value,
    detail: nba.value.rationale,
    meta: { confidence: nba.value.confidence, source: nba.value.source },
  })
  actionLog.value = [entry, ...actionLog.value]
  notify(`Action logged for ${displayName.value}`, 'success', { autoClose: 2500 })
}

function dismissAction() {
  nbaDismissed.value = true
  recordAction({
    type: 'Recommendation Dismissed',
    customerId: customerId.value,
    customerName: displayName.value,
    detail: `Dismissed "${nba.value.title}" — RM discretion.`,
  })
  notify('Recommendation dismissed', 'info', { autoClose: 2500 })
}

// ── Effects ────────────────────────────────────────────────────
onMounted(async () => {
  loading.value = true
  const id = customerId.value
  if (!id) { loading.value = false; return }

  actionLog.value = getActionLog()

  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchCustomerFeatures(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
    hydrateLogFromServer(50).then(() => { actionLog.value = getActionLog() }),
    // Identity header (account number, NRC, tenure, assigned RM, health).
    // A 404 resolves to null rather than failing the whole page.
    fetchCustomerProfile(id)
      .then((data) => { profile.value = data })
      .catch((e) => { console.warn('customer profile header failed:', e.message) }),
  ])

  localState.value = getCustomerState(id)
  loading.value = false

  await Promise.allSettled([
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/insights/reason-codes/${id}`, { params: { as_of_date: snapshotStore.asOfDate } })
        reasonCodes.value = data.reason_codes || []
      } catch (e) { console.warn('reason-codes failed:', e.message) }
    })(),
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/recommendations/${id}`, { params: { as_of_date: snapshotStore.asOfDate } })
        recommendations.value = data.recommendations || []
      } catch (e) { console.warn('recommendations failed:', e.message) }
    })(),
  ])
})
</script>

<template>
  <div class="w-full pt-6 px-6 pb-8">
    <!-- Loading -->
    <template v-if="loading">
      <div class="mb-6 h-5 bg-white rounded-sm w-1/3 animate-pulse"></div>
      <div class="grid grid-cols-12 gap-4 mb-6">
        <div v-for="i in 3" :key="i" class="col-span-12 lg:col-span-4"><LoadingSkeleton type="block" /></div>
      </div>
      <LoadingSkeleton type="block" />
    </template>

    <!-- Empty state -->
    <template v-else-if="!customerId || isEmpty">
      <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-amber-600 text-[32px]">person_off</span>
        </div>
        <h2 class="text-sm font-bold text-absa-enrich mb-2">Customer Not Found</h2>
        <p class="text-xs text-gray-500 max-w-md">No profile is available for this customer.</p>
        <router-link
          to="/dashboard/customers"
          class="mt-6 bg-absa-passion text-white text-xs font-bold py-2.5 px-5 rounded-sm hover:bg-absa-power transition-colors"
        >Back to My Customers</router-link>
      </div>
    </template>

    <!-- Profile -->
    <template v-else>
      <!-- Breadcrumb + actions -->
      <div class="mb-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
        <div>
          <div class="flex items-center gap-2 text-[11px] text-gray-500 mb-1 flex-wrap">
            <router-link to="/dashboard/portfolio" class="hover:text-absa-passion">Home</router-link>
            <span>/</span>
            <router-link to="/dashboard/customers" class="hover:text-absa-passion">My Customers</router-link>
            <span>/</span>
            <span class="text-absa-enrich font-bold">{{ displayName }} (ID: {{ customerId }})</span>
          </div>
          <p class="text-[11px] text-gray-400">
            Snapshot {{ fmtDate(profile?.snapshot_date || computedAt) }}
            <span v-if="stateSince"> · Lifecycle state since {{ fmtDate(stateSince) }}</span>
          </p>
        </div>
        <div class="flex items-center gap-2 flex-wrap shrink-0">
          <a
            :href="coreBankingUrl"
            target="_blank"
            rel="noopener"
            class="px-4 py-2.5 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-xs font-bold"
          >
            <span class="material-symbols-outlined text-[18px]">open_in_new</span>
            View in Core Banking
          </a>
          <router-link
            :to="`/dashboard/customer/${customerId}`"
            class="px-4 py-2.5 bg-white text-absa-enrich border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">analytics</span>
            Full Analytics
          </router-link>
          <button
            class="px-4 py-2.5 bg-white text-absa-enrich border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors text-xs font-bold flex items-center gap-2"
            @click="copyId"
          >
            <span class="material-symbols-outlined text-[18px]">content_copy</span>
            Copy ID
          </button>
          <button
            v-if="canDelete"
            class="px-4 py-2.5 bg-white text-absa-passion border border-red-200 rounded-sm hover:bg-red-50 transition-colors text-xs font-bold flex items-center gap-2"
            :disabled="deleting"
            @click="askDelete"
          >
            <span class="material-symbols-outlined text-[18px]">delete</span>
            Delete customer
          </button>
        </div>
      </div>

      <!-- ═══ Customer identity header ═══ -->
      <section class="bg-white border border-gray-300 rounded-sm mb-5">
        <div class="p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div class="flex items-start gap-4 min-w-0">
            <div
              class="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
              :style="{ background: stateColor }"
            >{{ initials }}</div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">{{ customerId }}</span>
                <CustomerStatePill :state="state" />
                <span
                  v-if="clientTier"
                  class="text-[10px] font-bold uppercase tracking-wide text-gray-500 border border-gray-300 rounded-sm px-2 py-0.5"
                >{{ clientTier }}</span>
              </div>
              <h1 class="text-xl font-headline font-semibold text-absa-enrich leading-tight mt-1.5">{{ displayName }}</h1>
              <p class="text-[11px] text-gray-500 mt-1">
                <span v-if="ageText">{{ ageText }} · </span>
                Profile snapshot {{ fmtDate(profile?.snapshot_date || computedAt) }}
              </p>
            </div>
          </div>

          <dl class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 shrink-0">
            <div v-for="f in detailFields" :key="f.label">
              <dt class="text-[10px] font-bold uppercase tracking-wide text-gray-400">{{ f.label }}</dt>
              <dd class="text-xs font-semibold text-absa-enrich mt-0.5 break-words">{{ f.value }}</dd>
            </div>
          </dl>
        </div>

        <!-- Headline facts -->
        <div class="border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
          <!-- Account number -->
          <div class="px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200">
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Account Number</p>
            <p
              class="mt-1 text-sm font-bold font-mono break-all"
              :class="accountNumber ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'"
            >{{ accountNumber || 'Not on file' }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">{{ accountSub }}</p>
          </div>

          <!-- NRC -->
          <div class="px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200">
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">ID Number (NRC)</p>
            <p
              class="mt-1 text-sm font-bold font-mono break-all"
              :class="nationalId ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'"
            >{{ nationalId || 'Not on file' }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">
              {{ nationalId ? 'Verified identifier' : 'Awaiting source feed' }}
            </p>
          </div>

          <!-- Tenure -->
          <div class="px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200">
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Tenure</p>
            <p
              class="mt-1 text-sm font-bold"
              :class="tenureText ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'"
            >{{ tenureText || 'Not available' }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">{{ tenureSub || 'Customer since date missing' }}</p>
          </div>

          <!-- Assigned RM -->
          <div class="px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200">
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Assigned RM</p>
            <p
              class="mt-1 text-sm font-bold"
              :class="assignedRm ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'"
            >{{ assignedRm || 'Unassigned' }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">{{ assignedRmSub }}</p>
          </div>

          <!-- Health score -->
          <div class="px-5 py-4">
            <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Health Score</p>
            <div class="flex items-baseline gap-1 mt-1">
              <span
                class="text-lg font-bold font-mono leading-none"
                :style="{ color: hasHealth ? ringColor : '#9ca3af' }"
              >{{ hasHealth ? Math.round(ringValue) : '—' }}</span>
              <span v-if="hasHealth" class="text-[11px] text-gray-400">/ 100</span>
            </div>
            <div class="h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div class="h-full rounded-full transition-all" :style="{ width: (hasHealth ? ringValue : 0) + '%', background: ringColor }"></div>
            </div>
            <p
              class="text-[11px] font-semibold mt-1"
              :style="{ color: hasHealth ? ringColor : '#9ca3af' }"
            >{{ healthTileLabel }}</p>
          </div>
        </div>
      </section>

      <!-- ── Predictive insights / risk drivers ── -->
      <div class="grid grid-cols-12 gap-4 mb-5">
        <section class="col-span-12 lg:col-span-6 bg-white border border-gray-300 rounded-sm p-5">
          <div class="flex items-center justify-between mb-1">
            <h2 class="text-[11px] font-bold uppercase tracking-wider text-gray-500">Predictive Insights</h2>
            <span v-if="profile?.snapshot_date || computedAt" class="text-[10px] text-gray-400">
              Updated {{ fmtDate(profile?.snapshot_date || computedAt) }}
            </span>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-5 mt-4">
            <!-- AI Health Score ring -->
            <div class="flex flex-col items-center">
              <svg
                :width="RING_SIZE"
                :height="RING_SIZE"
                :viewBox="`0 0 ${RING_SIZE} ${RING_SIZE}`"
                role="img"
                :aria-label="`AI health score ${hasHealth ? Math.round(ringValue) : 'unavailable'}`"
              >
                <circle :cx="RING_SIZE / 2" :cy="RING_SIZE / 2" :r="ringRadius" fill="none" stroke="#e9e7e7" :stroke-width="RING_STROKE" />
                <circle
                  v-if="hasHealth"
                  :cx="RING_SIZE / 2"
                  :cy="RING_SIZE / 2"
                  :r="ringRadius"
                  fill="none"
                  :stroke="ringColor"
                  :stroke-width="RING_STROKE"
                  stroke-linecap="round"
                  :stroke-dasharray="ringCircumference"
                  :stroke-dashoffset="ringDashOffset"
                  :transform="`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`"
                  style="transition: stroke-dashoffset 600ms ease"
                />
                <text
                  :x="RING_SIZE / 2"
                  :y="RING_SIZE / 2 - 2"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  :fill="hasHealth ? ringColor : '#9ca3af'"
                  :font-size="RING_SIZE * 0.26"
                  font-weight="700"
                >{{ hasHealth ? Math.round(ringValue) : '—' }}</text>
                <text
                  :x="RING_SIZE / 2"
                  :y="RING_SIZE / 2 + RING_SIZE * 0.17"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  :fill="hasHealth ? ringColor : '#9ca3af'"
                  :font-size="RING_SIZE * 0.085"
                  font-weight="700"
                  letter-spacing="0.5"
                >{{ ringTierLabel.toUpperCase() }}</text>
              </svg>
              <span class="text-[10px] text-gray-400 mt-1">AI Health Score</span>
            </div>
            <div class="flex-1 w-full space-y-3">
              <div v-for="m in insightMetrics" :key="m.label">
                <div class="flex items-center justify-between text-[11px] mb-1">
                  <span class="text-gray-500 font-semibold">{{ m.label }}</span>
                  <span class="font-bold" :style="{ color: m.color }">{{ m.value }}</span>
                </div>
                <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full rounded-full" :style="{ width: m.pct + '%', background: m.color }"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Key risk drivers -->
        <section class="col-span-12 lg:col-span-6 bg-white border border-gray-300 rounded-sm p-5">
          <h2 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-4">Key Risk Drivers</h2>
          <div v-if="riskDrivers.length" class="space-y-4">
            <div v-for="d in riskDrivers" :key="d.label">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-absa-enrich">{{ d.label }}</span>
                <span class="text-[11px] font-bold font-mono" :style="{ color: d.color }">{{ d.value }}</span>
              </div>
              <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                <div class="h-full rounded-full" :style="{ width: d.pct + '%', background: d.color }"></div>
              </div>
              <p class="text-[11px] text-gray-500 leading-snug">{{ d.detail }}</p>
            </div>
          </div>
          <p v-else class="text-xs text-gray-500">No material risk drivers detected for this customer.</p>
        </section>
      </div>

      <!-- Lifecycle journey -->
      <section class="bg-white border border-gray-300 rounded-sm p-5 mb-5">
        <div class="flex items-center justify-between mb-1">
          <h2 class="text-[11px] font-bold uppercase tracking-wider text-gray-500">Lifecycle Journey (12 Months)</h2>
          <span class="text-[10px] text-gray-400">{{ journeyNodes.length }} snapshots</span>
        </div>
        <div v-if="journeyNodes.length" class="mt-6 overflow-x-auto pb-2">
          <div class="flex items-start min-w-[560px]">
            <template v-for="(n, i) in journeyNodes" :key="i">
              <div class="flex flex-col items-center flex-1 min-w-[92px]">
                <div
                  class="w-4 h-4 rounded-full border-2"
                  :style="{ borderColor: n.color, background: n.isCurrent ? n.color : '#ffffff' }"
                ></div>
                <div class="text-[11px] font-bold mt-2" :style="{ color: n.color }">{{ n.isCurrent ? 'Current' : n.when }}</div>
                <div class="text-[10px] font-semibold text-gray-500 mt-0.5 uppercase tracking-wide">{{ n.label }}</div>
              </div>
              <div
                v-if="i < journeyNodes.length - 1"
                class="flex-1 h-[2px] mt-2"
                :style="{ background: n.color }"
              ></div>
            </template>
          </div>
        </div>
        <p v-else class="text-xs text-gray-500 mt-4">No lifecycle history recorded for this customer.</p>
      </section>

      <!-- Next best action + action history -->
      <div class="grid grid-cols-12 gap-4">
        <section
          class="col-span-12 lg:col-span-4 rounded-sm p-5 text-white"
          style="background: linear-gradient(135deg, #77021E 0%, #3d0110 55%, #131010 100%)"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-[10px] font-bold uppercase tracking-widest">Priority {{ nba.priority }}</span>
            <span v-if="nba.confidence != null" class="text-[10px] font-bold uppercase tracking-widest">
              AI Confidence {{ nba.confidence }}%
            </span>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-[26px]">{{ nba.icon }}</span>
            </div>
            <div class="min-w-0">
              <h2 class="text-sm font-bold">{{ nba.title }}</h2>
              <p class="text-[11px] text-white/70 mt-0.5">Recommended by {{ nba.source }}</p>
            </div>
          </div>
          <p class="text-xs text-white/85 mt-4 leading-relaxed">{{ nba.rationale }}</p>
          <div class="flex items-center gap-2 mt-5">
            <button
              :disabled="nbaDismissed"
              class="flex-1 bg-white/95 text-absa-inspire text-xs font-bold py-2.5 px-4 rounded-sm hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              @click="logAction"
            >
              <span class="material-symbols-outlined text-[18px]">call</span>
              Log Action
            </button>
            <button
              :disabled="nbaDismissed"
              class="flex-1 border border-white/40 text-white text-xs font-bold py-2.5 px-4 rounded-sm hover:bg-white/10 transition-colors disabled:opacity-50"
              @click="dismissAction"
            >{{ nbaDismissed ? 'Dismissed' : 'Dismiss' }}</button>
          </div>
        </section>

        <!-- Action history -->
        <section class="col-span-12 lg:col-span-8 bg-white border border-gray-300 rounded-sm p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-[11px] font-bold uppercase tracking-wider text-gray-500">Action History</h2>
            <select v-model="historyFilter" class="border border-gray-300 rounded-sm px-2 py-1 text-[11px] font-semibold text-absa-enrich outline-none">
              <option value="">All</option>
              <option v-for="t in historyTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
          <div v-if="filteredHistory.length" class="space-y-4 max-h-[320px] overflow-y-auto pr-1">
            <div v-for="h in filteredHistory" :key="h.id" class="flex gap-3">
              <div class="flex flex-col items-center pt-1">
                <div class="w-2.5 h-2.5 rounded-full" :style="{ background: tierColor('power') }"></div>
                <div class="w-[1px] flex-1 bg-gray-200 mt-1"></div>
              </div>
              <div class="pb-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-bold text-absa-enrich">{{ h.title }}</span>
                  <span class="text-[10px] text-gray-400">{{ fmtDate(h.at) }}</span>
                </div>
                <p class="text-[11px] text-gray-500 mt-0.5">{{ h.detail }}</p>
                <span v-if="h.actor" class="text-[10px] text-gray-400">Logged by {{ h.actor }}</span>
              </div>
            </div>
          </div>
          <p v-else class="text-xs text-gray-500">No actions logged for this customer yet.</p>
        </section>
      </div>
    </template>

    <!-- Destructive-action confirmation. Deleting is soft and reversible: the
         record is retained and can be restored from My Customers. -->
    <ConfirmDialog
      :open="confirmOpen"
      title="Delete customer"
      :message="`Remove ${displayName} (${customerId}) from the portfolio?\n\nThe record is hidden from every list, score and report, and this is recorded in the audit trail. You can restore it from My Customers.`"
      eyebrow="Soft delete — reversible"
      confirm-label="Delete customer"
      busy-label="Deleting…"
      :busy="deleting"
      variant="danger"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      @close="cancelDelete"
    >
      <template #body>
        <div>
          <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            Reason (optional — stored in the audit trail)
          </label>
          <input
            v-model="deleteReason"
            type="text"
            maxlength="255"
            placeholder="e.g. duplicate record, customer request, test data"
            class="w-full border border-gray-300 rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
            @keydown.enter.prevent="confirmDelete"
          />
        </div>
      </template>
    </ConfirmDialog>
  </div>
</template>
