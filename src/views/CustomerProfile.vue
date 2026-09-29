<script setup>
/**
 * Customer Profile — single-customer predictive profile.
 *
 * Pairs with the My Customers list: identity/predictive-insight cards on top,
 * the 12-month lifecycle journey, the AI next-best-action card, and the
 * per-customer action history below.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
import EngagementModal from '@/components/crm/EngagementModal.vue'
import PostEngagementPerformance from '@/components/crm/PostEngagementPerformance.vue'

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
// Set when the master record could not be read, so the page can say why the
// identity panel is running on snapshot data instead of failing silently.
const profileError = ref('')

const showEngagementModal = ref(false)
const nextOfKin = computed(() => profile.value?.next_of_kin_name ? {
  name: profile.value.next_of_kin_name,
  relation: profile.value.next_of_kin_relationship,
  phone: profile.value.next_of_kin_phone
} : null)
const activeTab = ref('interactions') // 'interactions' or 'nok'

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

const bozRemainingDays = computed(() => {
  const days = features.value.days_since_last_txn
  // 1 year (365) to become dormant + 10 years (3650) dormant period = 4015 days
  if ((state.value === 'DORMANT' || state.value === 'CHURNED') && days != null) {
    return 4015 - days
  }
  return null
})

const bozRemainingText = computed(() => {
  const remaining = bozRemainingDays.value
  if (remaining == null) return null
  if (remaining < 0) return `Overdue by ${Math.abs(remaining)} days`
  const years = Math.floor(remaining / 365)
  const days = remaining % 365
  if (years > 0) return `${years} years, ${days} days`
  return `${remaining} days`
})

const bozAlert = computed(() => {
  const remaining = bozRemainingDays.value
  // Show alert if < 1 year remaining (365 days) or overdue
  return remaining != null && remaining <= 365
})

const detailFields = computed(() => {
  const f = features.value
  const fields = [
    { label: 'Mobile', value: profile.value?.mobile_number || customer.value._raw?.mobile_number || '—' },
    { label: 'Branch', value: profile.value?.branch_code || customer.value.branch || '—' },
    { label: 'Segment', value: profile.value?.market_segment || customer.value.segmentLabel || '—' },
    { label: 'KYC Tier', value: profile.value?.kyc_tier || '—' },
    { label: 'Nationality', value: profile.value?.nationality || '—' },
    { label: 'Gender', value: profile.value?.gender || '—' },
    { label: 'Last Activity', value: lastActivityText.value },
    { label: 'Lifecycle State', value: String(state.value).replace(/_/g, ' ') },
  ]
  if (bozRemainingText.value) {
    fields.push({ label: 'BOZ Transfer In', value: bozRemainingText.value })
  }
  return fields
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

const EXCLUDED_INTERACTION_TYPES = new Set([
  'CUSTOMER_DELETED',
  'CUSTOMER_RESTORED',
  'CUSTOMER_DELETED_PERMANENT',
  'BULK_ACTION',
  'BULK_DELETE',
  'SYSTEM',
  'AUDIT',
])

const historyEntries = computed(() => {
  return actionLog.value
    .filter((a) => {
      // Must strictly match this customer ID
      if (!a.customerId || a.customerId !== customerId.value) return false
      // Administrative audit actions must not appear in customer interaction history
      const rawType = String(a.type || '').toUpperCase()
      if (rawType.includes('DELETE') || rawType.includes('RESTORE')) return false
      if (EXCLUDED_INTERACTION_TYPES.has(rawType)) return false
      return true
    })
    .map((a) => ({
      id: a.id,
      title: prettify(a.type || 'Action'),
      at: a.at,
      detail: a.detail || a.meta?.reason || 'Logged by the relationship manager.',
      actor: a.actor,
      meta: a.meta,
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

    // The profile 404s once removed, so leave before the page refetches anything.
    notify(
      `Permanently deleted ${displayName.value} from the database`,
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
/**
 * Load everything the page shows for one customer.
 *
 * Called on mount AND on a change of `route.params.id`, so bouncing between two
 * profiles (or back into a cached history entry) cannot leave stale identity
 * facts on screen. Before this, only `onMounted` ran — the header kept the
 * previous customer's data whenever the component was reused.
 */
async function loadProfilePage() {
  loading.value = true
  profileError.value = ''

  const id = customerId.value
  if (!id) {
    loading.value = false
    return
  }

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
      .then((data) => {
        profile.value = data
        if (data == null) {
          profileError.value =
            'No identity record was found for this customer, so the details below '
            + 'come from the last snapshot instead of the customer master record.'
        }
      })
      .catch((e) => {
        // Swallowing this left the page silently rendering snapshot fallbacks
        // ("Customer 00123", "Not on file") whenever the master read broke —
        // which is exactly what made saved edits look like they were ignored.
        console.warn('customer profile header failed:', e.message)
        profile.value = null
        profileError.value = e.message
          || 'The customer master record could not be read.'
      })
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
}

onMounted(loadProfilePage)

// A different id in the same route (profile → profile) must re-read the header.
watch(() => route.params.id, (id, previous) => {
  if (!id || id === previous) return
  loadProfilePage()
})

// Coming back via browser Back/Forward can restore the page from the bfcache
// without re-running onMounted; refetch when it becomes visible again.
function onPageShow(event) {
  if (event?.persisted) loadProfilePage()
}
onMounted(() => window.addEventListener('pageshow', onPageShow))
onBeforeUnmount(() => window.removeEventListener('pageshow', onPageShow))
</script>

<template>
  <div class="w-full min-h-screen pt-6 px-6 pb-12 font-sans relative text-gray-900 bg-transparent">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>
    <div class="relative z-10 w-full">
    <!-- The master record could not be read. Without this the identity panel
         silently falls back to snapshot data and a saved edit looks ignored. -->
    <div
      v-if="!loading && profileError"
      class="mb-4 px-4 py-3 bg-amber-50 border border-amber-300 rounded-sm flex items-start gap-2"
    >
      <span class="material-symbols-outlined text-[18px] text-amber-700">warning</span>
      <div class="text-xs text-amber-900">
        <p class="font-bold">Identity details are unavailable — showing snapshot data only.</p>
        <p class="mt-0.5">{{ profileError }}</p>
        <p class="mt-0.5 text-amber-800">
          Account number, ID number, mobile, next of kin and the other master fields will
          read as "Not on file" until this is fixed, even if they were saved successfully.
        </p>
        <button class="mt-1.5 font-bold underline" @click="loadProfilePage">Try again</button>
      </div>
    </div>

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
        <div class="w-16 h-16 bg-amber-50 border border-amber-200 rounded-none flex items-center justify-center mb-4">
          <span class="material-symbols-outlined text-amber-600 text-[32px]">person_off</span>
        </div>
        <h2 class="text-sm font-bold text-absa-enrich mb-2">Customer Not Found</h2>
        <p class="text-xs text-gray-500 max-w-md">No profile is available for this customer.</p>
        <router-link
          to="/dashboard/customers"
          class="mt-6 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-xs font-mono font-bold tracking-widest uppercase rounded-none py-2.5 px-5 transition-all"
        >Back to My Customers</router-link>
      </div>
    </template>

    <!-- Profile -->
    <template v-else>
      <!-- Breadcrumb + actions -->
      <div v-if="bozAlert" class="mb-5 bg-red-50/80 border-l-4 border-l-red-600 border border-red-200 rounded-none p-4 flex items-start gap-3 shadow-sm">
        <span class="material-symbols-outlined text-absa-inspire mt-0.5">warning</span>
        <div>
          <h3 class="text-sm font-bold text-absa-inspire">URGENT: Account approaching 10-year dormancy (BOZ Transfer Rule)</h3>
          <p class="text-xs text-absa-enrich mt-1">This account has been inactive for {{ features?.days_since_last_txn }} days. Funds are at risk of being transferred to BOZ in <span class="font-bold">{{ bozRemainingText }}</span>. Immediate client contact is required to prevent deposit loss.</p>
          <button @click="showEngagementModal = true" class="mt-2 bg-transparent text-red-600 border border-red-600 hover:bg-red-50 px-3 py-1.5 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest transition-all">Log Outreach</button>
        </div>
      </div>
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
            class="px-4 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 rounded-none flex items-center gap-2 transition-all text-xs font-mono font-bold uppercase tracking-widest"
          >
            <span class="material-symbols-outlined text-[18px]">open_in_new</span>
            View in Core Banking
          </a>
          <router-link
            :to="`/dashboard/customer/${customerId}`"
            class="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-none hover:border-absa-passion hover:text-absa-passion transition-all text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-[18px]">analytics</span>
            Full Analytics
          </router-link>
          <button
            class="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-none hover:border-absa-passion hover:text-absa-passion transition-all text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2"
            @click="copyId"
          >
            <span class="material-symbols-outlined text-[18px]">content_copy</span>
            Copy ID
          </button>
          <button
            v-if="canDelete"
            class="px-4 py-2 bg-transparent text-red-600 border border-red-200 rounded-none hover:bg-red-50 hover:border-red-400 transition-all text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2"
            :disabled="deleting"
            @click="askDelete"
          >
            <span class="material-symbols-outlined text-[18px]">delete</span>
            Delete customer
          </button>
        </div>
      </div>

      <!-- ═══ Customer identity header ═══ -->
      <section class="bg-white border border-gray-200 rounded-none shadow-sm mb-5 relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="relative z-10">
        <div class="p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div class="flex items-start gap-4 min-w-0">
            <div
              class="w-16 h-16 rounded-none border border-white/20 shadow-inner flex items-center justify-center text-white text-xl font-bold font-mono shrink-0"
              :style="{ background: stateColor }"
            >{{ initials }}</div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">{{ customerId }}</span>
                <CustomerStatePill :state="state" />
                <span
                  v-if="clientTier"
                  class="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-none px-2 py-0.5 bg-gray-50"
                >{{ clientTier }}</span>
              </div>
              <h1 class="text-xl font-bold font-display uppercase tracking-tight text-gray-900 leading-tight mt-1.5">{{ displayName }}</h1>
              <p class="text-[11px] text-gray-500 mt-1">
                <span v-if="ageText">{{ ageText }} · </span>
                Profile snapshot {{ fmtDate(profile?.snapshot_date || computedAt) }}
              </p>
            </div>
          </div>

          <dl class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 shrink-0">
            <div v-for="f in detailFields" :key="f.label">
              <dt class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">{{ f.label }}</dt>
              <dd class="text-xs font-bold text-gray-900 mt-0.5 break-words font-display">{{ f.value }}</dd>
            </div>
          </dl>
        </div>

        <!-- Headline facts -->
        <div class="border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-gray-50/40">
          <!-- Account number -->
          <div class="px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200">
            <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Account Number</p>
            <p
              class="mt-1 text-sm font-bold font-mono break-all"
              :class="accountNumber ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'"
            >{{ accountNumber || 'Not on file' }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">{{ accountSub }}</p>
          </div>

          <!-- NRC -->
          <div class="px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200">
            <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">ID Number (NRC)</p>
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
            <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Tenure</p>
            <p
              class="mt-1 text-sm font-bold"
              :class="tenureText ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'"
            >{{ tenureText || 'Not available' }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">{{ tenureSub || 'Customer since date missing' }}</p>
          </div>

          <!-- Assigned RM -->
          <div class="px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200">
            <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Assigned RM</p>
            <p
              class="mt-1 text-sm font-bold"
              :class="assignedRm ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'"
            >{{ assignedRm || 'Unassigned' }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">{{ assignedRmSub }}</p>
          </div>

          <!-- Health score -->
          <div class="px-5 py-4">
            <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Health Score</p>
            <div class="flex items-baseline gap-1 mt-1">
              <span
                class="text-lg font-bold font-mono leading-none"
                :style="{ color: hasHealth ? ringColor : '#9ca3af' }"
              >{{ hasHealth ? Math.round(ringValue) : '—' }}</span>
              <span v-if="hasHealth" class="text-[11px] text-gray-400">/ 100</span>
            </div>
            <div class="h-1 bg-gray-200 rounded-none overflow-hidden mt-2">
              <div class="h-full rounded-none transition-all" :style="{ width: (hasHealth ? ringValue : 0) + '%', background: ringColor }"></div>
            </div>
            <p
              class="text-[11px] font-semibold mt-1"
              :style="{ color: hasHealth ? ringColor : '#9ca3af' }"
            >{{ healthTileLabel }}</p>
          </div>
        </div>
        </div>
      </section>

      <!-- ── Predictive insights / risk drivers ── -->
      <div class="grid grid-cols-12 gap-4 mb-5">
        <section class="col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-none shadow-sm p-5 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="relative z-10">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-2"><div class="w-1 h-3.5 bg-absa-passion rounded-none"></div><h2 class="text-xs font-bold font-display uppercase tracking-tight text-gray-900">Predictive Insights</h2></div>
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
                <div class="h-1.5 bg-gray-100 rounded-none overflow-hidden">
                  <div class="h-full rounded-none" :style="{ width: m.pct + '%', background: m.color }"></div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <!-- Key risk drivers -->
        <section class="col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-none shadow-sm p-5 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="relative z-10">
          <div class="flex items-center gap-2 mb-4"><div class="w-1 h-3.5 bg-absa-passion rounded-none"></div><h2 class="text-xs font-bold font-display uppercase tracking-tight text-gray-900">Key Risk Drivers</h2></div>
          <div v-if="riskDrivers.length" class="space-y-4">
            <div v-for="d in riskDrivers" :key="d.label">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-absa-enrich">{{ d.label }}</span>
                <span class="text-[11px] font-bold font-mono" :style="{ color: d.color }">{{ d.value }}</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-none overflow-hidden mb-1.5">
                <div class="h-full rounded-none" :style="{ width: d.pct + '%', background: d.color }"></div>
              </div>
              <p class="text-[11px] text-gray-500 leading-snug">{{ d.detail }}</p>
            </div>
          </div>
          <p v-else class="text-xs text-gray-500">No material risk drivers detected for this customer.</p>
          </div>
        </section>
      </div>

      <!-- Lifecycle journey -->
      <section class="bg-white border border-gray-200 rounded-none shadow-sm p-5 mb-5 relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="relative z-10">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center gap-2"><div class="w-1 h-3.5 bg-absa-passion rounded-none"></div><h2 class="text-xs font-bold font-display uppercase tracking-tight text-gray-900">Lifecycle Journey (12 Months)</h2></div>
          <span class="text-[10px] text-gray-400">{{ journeyNodes.length }} snapshots</span>
        </div>
        <div v-if="journeyNodes.length" class="mt-6 overflow-x-auto pb-2">
          <div class="flex items-start min-w-[560px]">
            <template v-for="(n, i) in journeyNodes" :key="i">
              <div class="flex flex-col items-center flex-1 min-w-[92px]">
                <div
                  class="w-3.5 h-3.5 rounded-none border-2"
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
        </div>
      </section>

      <!-- Next best action + action history -->
      <div class="grid grid-cols-12 gap-4">
        <section
          class="col-span-12 lg:col-span-4 rounded-none p-5 text-white bg-[#0F172A] border border-gray-800 shadow-sm relative overflow-hidden flex flex-col justify-between"
          style="background: linear-gradient(135deg, #77021E 0%, #3d0110 55%, #131010 100%)"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="text-[10px] font-bold uppercase tracking-widest">Priority {{ nba.priority }}</span>
            <span v-if="nba.confidence != null" class="text-[10px] font-bold uppercase tracking-widest">
              AI Confidence {{ nba.confidence }}%
            </span>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-none bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
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
              class="flex-1 bg-white text-absa-passion border border-white hover:bg-gray-100 text-xs font-mono font-bold tracking-widest uppercase rounded-none py-2 px-3 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              @click="logAction"
            >
              <span class="material-symbols-outlined text-[18px]">call</span>
              Log Action
            </button>
            <button
              :disabled="nbaDismissed"
              class="flex-1 bg-transparent text-white border border-white/30 hover:border-white text-xs font-mono font-bold tracking-widest uppercase rounded-none py-2 px-3 transition-all disabled:opacity-50"
              @click="dismissAction"
            >{{ nbaDismissed ? 'Dismissed' : 'Dismiss' }}</button>
          </div>
        </section>

        <!-- Interaction History / Next of Kin Tabs -->
        <section class="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-none shadow-sm p-5 flex flex-col relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="relative z-10 flex flex-col flex-1">
                      <!-- Tabs Header -->
            <div class="flex items-center gap-4 border-b border-gray-200 mb-4 pb-2">
              <button
                class="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all"
                :class="activeTab === 'interactions' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
                @click="activeTab = 'interactions'"
              >
                Interaction History
              </button>
              <button
                class="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all flex items-center gap-1"
                :class="activeTab === 'omni' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
                @click="activeTab = 'omni'"
              >
                <span class="material-symbols-outlined text-[14px]">headset_mic</span> Omnichannel
              </button>
              <button
                class="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all"
                :class="activeTab === 'nok' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
                @click="activeTab = 'nok'"
              >
                Next of Kin
              </button>
            <div class="ml-auto flex items-center gap-2">
              <button class="bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all flex items-center gap-1" @click="showEngagementModal = true">
                <span class="material-symbols-outlined text-[14px]">add</span>
                Log Engagement
              </button>
            </div>
          </div>

          <!-- Interaction History Tab -->
          <div v-if="activeTab === 'interactions'" class="flex-1">
            <div class="flex items-center justify-between mb-4">
              <select v-model="historyFilter" class="border border-gray-200 rounded-none px-2 py-1 text-[10px] font-mono font-bold uppercase text-gray-600 bg-white outline-none focus:border-absa-passion ml-auto">
                <option value="">All</option>
                <option v-for="t in historyTypes" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <div v-if="filteredHistory.length" class="space-y-4 max-h-[280px] overflow-y-auto pr-1">
              <div v-for="h in filteredHistory" :key="h.id" class="flex gap-3">
                <div class="flex flex-col items-center pt-1">
                  <div class="w-2 h-2 rounded-none" :style="{ background: tierColor('power') }"></div>
                  <div class="w-[1px] flex-1 bg-gray-200 mt-1"></div>
                </div>
                <div class="pb-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-bold text-absa-enrich">{{ h.title }}</span>
                    <span class="text-[10px] text-gray-400">{{ fmtDate(h.at) }}</span>
                  </div>
                  <p class="text-[11px] text-gray-500 mt-0.5">{{ h.detail }}</p>
                  <span v-if="h.actor" class="text-[10px] text-gray-400 block uppercase tracking-wide mt-1">RM: {{ h.actor }}</span>
                  <div v-if="h.meta && (h.meta.outcome || h.meta.dormancy_reason || h.meta.cross_sell_details || h.meta.branch_to_visit)" class="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-100 pt-2">
                    <div v-if="h.meta.outcome"><span class="font-bold text-gray-500">Outcome:</span> {{ h.meta.outcome }}</div>
                    <div v-if="h.meta.dormancy_reason"><span class="font-bold text-gray-500">Reason:</span> {{ h.meta.dormancy_reason }}</div>
                    <div v-if="h.meta.cross_sell_details"><span class="font-bold text-gray-500">Cross Sell:</span> {{ h.meta.cross_sell_details }}</div>
                    <div v-if="h.meta.recommendation"><span class="font-bold text-gray-500">Recommendation:</span> {{ h.meta.recommendation }}</div>
                    <div v-if="h.meta.customer_experience"><span class="font-bold text-gray-500">Experience:</span> {{ h.meta.customer_experience }}</div>
                    <div v-if="h.meta.branch_to_visit"><span class="font-bold text-gray-500">Branch:</span> {{ h.meta.branch_to_visit }}</div>
                    <div v-if="h.meta.customer_feedback" class="col-span-2"><span class="font-bold text-gray-500">Feedback:</span> {{ h.meta.customer_feedback }}</div>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="text-xs text-gray-500">No actions logged for this customer yet.</p>
            <PostEngagementPerformance 
              v-if="filteredHistory.length" 
              :customerId="customerId" 
              :engagementDate="filteredHistory[0].at" 
            />
          </div>

          
            <!-- Omnichannel Tab (FR-D-001) -->
            <div v-if="activeTab === 'omni'" class="flex-1 pt-2 flex flex-col gap-4">
              <!-- Cisco Finesse Incoming Call Mock (FR-V-003) -->
              <div class="bg-blue-50 border border-blue-200 p-4 rounded-sm flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 animate-pulse">
                    <span class="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-blue-900 uppercase tracking-widest">Incoming Call - Cisco Finesse</p>
                    <p class="text-sm font-bold text-blue-800">{{ profile?.mobile_number || '0970000000' }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-[10px] font-bold uppercase text-blue-600">Priority Tier</p>
                  <p class="text-xs font-bold text-blue-900">{{ profile?.market_segment || 'Standard' }} (Auto-matched via ANI)</p>
                  <p class="text-[10px] text-blue-700 mt-1">Linked Cases: <span class="font-mono">CAS-00124</span></p>
                </div>
                <div class="flex gap-2">
                  <button class="bg-blue-600 text-white px-3 py-1.5 rounded-sm text-xs font-bold hover:bg-blue-700">Answer</button>
                  <button class="bg-red-500 text-white px-3 py-1.5 rounded-sm text-xs font-bold hover:bg-red-600">Reject</button>
                </div>
              </div>

              <!-- Unified Desktop Layout -->
              <div class="grid grid-cols-2 gap-4">
                <!-- Case Management (FR-T-001) -->
                <div class="border border-gray-200 rounded-sm">
                  <div class="bg-gray-50 border-b border-gray-200 px-3 py-2">
                    <h4 class="text-xs font-bold text-absa-enrich">Active Tickets / Cases</h4>
                  </div>
                  <div class="p-3">
                    <div class="flex justify-between items-center bg-gray-50 p-2 rounded-sm border border-gray-100 mb-2">
                      <div>
                        <p class="text-[11px] font-bold text-absa-enrich">CAS-00124 <span class="bg-red-100 text-red-600 px-1 rounded-sm text-[9px]">> 2 Days</span></p>
                        <p class="text-[10px] text-gray-500">Unresolved charge dispute</p>
                      </div>
                      <button class="text-[10px] bg-white border border-gray-300 px-2 py-1 rounded-sm hover:bg-gray-50">Open</button>
                    </div>
                    <button class="w-full text-[11px] text-absa-passion font-bold border border-absa-passion py-1.5 rounded-sm hover:bg-absa-passion/5">
                      + Create New Ticket
                    </button>
                  </div>
                </div>

                <!-- Messaging Templates (FR-A-003, FR-S-001) -->
                <div class="border border-gray-200 rounded-sm">
                  <div class="bg-gray-50 border-b border-gray-200 px-3 py-2">
                    <h4 class="text-xs font-bold text-absa-enrich">Quick Responses (SMS/WhatsApp)</h4>
                  </div>
                  <div class="p-3 space-y-2">
                    <button class="w-full text-left bg-gray-50 p-2 border border-gray-200 rounded-sm hover:border-gray-300 group">
                      <p class="text-[11px] font-bold text-absa-enrich">Holding Response Template</p>
                      <p class="text-[10px] text-gray-500 mt-0.5 group-hover:text-gray-700">"Your query CAS-00124 is taking longer than expected..."</p>
                    </button>
                    <button class="w-full text-left bg-gray-50 p-2 border border-gray-200 rounded-sm hover:border-gray-300 group">
                      <p class="text-[11px] font-bold text-absa-enrich">Resolution Template</p>
                      <p class="text-[10px] text-gray-500 mt-0.5 group-hover:text-gray-700">"Your query CAS-00124 has been resolved. Please contact..."</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next of Kin Tab -->
          <div v-if="activeTab === 'nok'" class="flex-1 pt-2">
            <div v-if="nextOfKin" class="grid grid-cols-2 gap-4 bg-gray-50/70 p-4 border border-gray-200 rounded-none">
              <div>
                <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Name</p>
                <p class="mt-1 text-sm font-bold text-absa-enrich">{{ nextOfKin.name }}</p>
              </div>
              <div>
                <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Relationship</p>
                <p class="mt-1 text-sm font-bold text-absa-enrich">{{ nextOfKin.relation }}</p>
              </div>
              <div>
                <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Phone</p>
                <p class="mt-1 text-sm font-bold font-mono text-absa-enrich">{{ nextOfKin.phone }}</p>
              </div>
            </div>
            <p v-else class="text-xs text-gray-500">No Next of Kin data available.</p>
          </div>
          </div>
        </section>
      </div>
    </template>

    <!-- Destructive-action confirmation: permanent deletion cannot be undone. -->
    <ConfirmDialog
      :open="confirmOpen"
      title="Delete customer permanently"
      :message="`Are you sure you want to permanently delete ${displayName} (${customerId})?\n\nAll customer records, accounts, cards, loans, transactions, and predictive metrics will be permanently removed from the database.\n\nThis action is irreversible and cannot be undone.`"
      eyebrow="Permanent delete — cannot be undone"
      confirm-label="Delete Permanently"
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
    
    <EngagementModal
      :open="showEngagementModal"
      :customerId="customerId"
      :customerName="displayName"
      @close="showEngagementModal = false"
      @logged="(payload) => {
        // Record locally so it shows on the UI immediately
        const entry = recordAction({
          type: payload.type || 'Engagement',
          customerId: customerId,
          customerName: displayName,
          detail: payload.notes || 'Engagement logged by RM.',
          meta: payload
        })
        actionLog.value = [entry, ...actionLog.value]
      }"
    />
    </div>
  </div>
</template>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image:
    linear-gradient(color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px);
  background-size: 38px 38px;
}
.dotted-pattern {
  background-image: radial-gradient(#DC0037 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.04;
}
</style>
