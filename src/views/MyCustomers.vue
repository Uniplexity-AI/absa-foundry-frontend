<script setup>
/**
 * My Customers — portfolio-wide customer list for the RM workspace.
 *
 * Shows every customer in the pilot portfolio with lifecycle state, health,
 * churn risk, CLV, segment, branch and the recommended next action. Clicking a
 * row (or "View profile") opens the single-customer CustomerProfile page.
 */
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { computeCustomerStates } from '@/services/ingestApi'
import { MARKET_SEGMENT_OPTIONS } from '@/config/customerSegments'
import { downloadCsv, notify, reportFilename } from '@/utils/absaExport'
import { healthTier, stateTier, tierColor } from '@/composables/useSeverityTier'
import { decodeJWT } from '@/services/decodeJWT'
import { useAuthStore } from '@/stores/auth'
import {
  MAX_BULK_DELETE,
  bulkDeleteCustomers,
  deleteCustomer,
  } from '@/services/customerAdminApi'
import CustomerStatePill from '@/components/CustomerStatePill.vue'
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'
import LoadCustomerDataModal from '@/components/ingest/LoadCustomerDataModal.vue'
import AddCustomerModal from '@/components/ingest/AddCustomerModal.vue'
import EditCustomerModal from '@/components/ingest/EditCustomerModal.vue'

import { useCurrency } from '@/composables/useCurrency'
import { getActionLog } from '@/utils/absaActions'
import PromiseToFundModal from '@/components/crm/PromiseToFundModal.vue'

defineOptions({ name: 'MyCustomers' })

const PAGE_SIZE = 25

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()
const snapshotStore = useSnapshotStore()
const { formatCurrency } = useCurrency()

// Data loading is limited to the roles the gateway's ingest matrix allows.
const LOAD_ROLES = ['ADMIN', 'RELATIONSHIP_MANAGER', 'OPERATIONS']
const showLoadData = ref(false)

const showPromiseToFund = ref(false)
const ptfEngagements = computed(() => {
  return getActionLog().filter(e => e.meta && (e.meta.isPromise === true || e.meta.isPromise === 'true' || e.meta.outcome === 'Promised to Fund'))
})

const showAddCustomer = ref(false)
const showEditCustomer = ref(false)
const editingCustomer = ref(null)
const canLoadData = computed(() => {
  const authStore = useAuthStore()
  return authStore.hasPermission('crm', 'write') || authStore.hasPermission('operations', 'write')
})

// Deleting customers is an OPERATIONS action on the backend (ADMIN bypasses).
// The server is the authority — this only decides whether to render the
// controls, so a user who tampers with it still gets a 403.
const DELETE_ROLES = ['ADMIN', 'OPERATIONS']
const canDelete = computed(() => {
  const authStore = useAuthStore()
  return authStore.hasPermission('crm', 'delete') || authStore.hasPermission('operations', 'delete')
})
const deleting = ref(false)


const COLUMNS = [
  { key: 'name', label: 'Customer' },
  { key: 'state', label: 'State' },
  { key: 'health', label: 'Health Score' },
  { key: 'churn', label: 'Churn Risk' },
  { key: 'clv', label: 'CLV' },
  { key: 'segment', label: 'Segment' },
  { key: 'branch', label: 'Branch' },
  { key: 'action', label: 'Recommended Action' },
  { key: 'go', label: '' },
]

// ── Filter state ────────────────────────────────────────────────
const search = ref(String(route.query.q || ''))
const state = ref(String(route.query.state || ''))
const segment = ref('')
const branch = ref('')
const sortKey = ref('health-asc')
const page = ref(1)
const crmView = ref('all')

const rows = computed(() => customerStore.customers)

const stateChips = computed(() => {
  const counts = {}
  for (const c of rows.value) {
    if (crmView.value === 'risk' && !['DORMANT', 'AT_RISK'].includes(c.state)) continue
    counts[c.state] = (counts[c.state] || 0) + 1
  }
  
  // Calculate total count respecting crmView
  const totalCount = rows.value.filter(c => 
    crmView.value === 'risk' ? ['DORMANT', 'AT_RISK'].includes(c.state) : true
  ).length

  return [
    { value: '', label: 'All', count: totalCount },
    { value: 'ACTIVE', label: 'Active', count: counts.ACTIVE || 0 },
    { value: 'AT_RISK', label: 'At Risk', count: counts.AT_RISK || 0 },
    { value: 'DORMANT', label: 'Dormant', count: counts.DORMANT || 0 },
    { value: 'CHURNED', label: 'Churned', count: counts.CHURNED || 0 },
  ]
})

const branchOptions = computed(() =>
  [...new Set(rows.value.map((c) => c.branch).filter(Boolean))].sort()
)

const activeFilterCount = computed(() =>
  [search.value, state.value, segment.value, branch.value, crmView.value === 'risk' ? 'risk' : ''].filter(Boolean).length
)

const filteredRows = computed(() => {
  const q = search.value.trim().toLowerCase()
  let list = rows.value.filter((c) => {
    if (crmView.value === 'risk' && !['DORMANT', 'AT_RISK'].includes(c.state)) return false
    if (state.value && c.state !== state.value) return false
    if (segment.value && String(c.marketSegment) !== String(segment.value)) return false
    if (branch.value && c.branch !== branch.value) return false
    if (q) {
      const haystack = [c.customerId, c.fullName, c._raw?.account_number, c.segmentLabel]
        .filter(Boolean).join(' ').toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  const STATE_ORDER = ['CHURNED', 'DORMANT', 'AT_RISK', 'ACTIVE', 'GROWING', 'NEW']
  const sorters = {
    'health-asc': (a, b) => (a.healthScore ?? Infinity) - (b.healthScore ?? Infinity),
    'health-desc': (a, b) => (b.healthScore ?? -Infinity) - (a.healthScore ?? -Infinity),
    'churn-desc': (a, b) => (churnOf(b) ?? -1) - (churnOf(a) ?? -1),
    'name-asc': (a, b) => String(a.fullName || a.customerId).localeCompare(String(b.fullName || b.customerId)),
    state: (a, b) => STATE_ORDER.indexOf(a.state) - STATE_ORDER.indexOf(b.state),
  }
  list = [...list].sort(sorters[sortKey.value] || sorters['health-asc'])
  return list
})

const totalFiltered = computed(() => filteredRows.value.length)
// The list API caps `limit` at 500, so `rows` is a window, not the portfolio.
const portfolioTotal = computed(() => customerStore.pagination.total || rows.value.length)
const totalPages = computed(() => Math.max(1, Math.ceil(totalFiltered.value / PAGE_SIZE)))
const pageStart = computed(() => (page.value - 1) * PAGE_SIZE)
const pageRows = computed(() => filteredRows.value.slice(pageStart.value, pageStart.value + PAGE_SIZE))

// ── Helpers ────────────────────────────────────────────────────
function churnOf(c) {
  const p = predictionStore.predictions[c.customerId]
  const value = p?.churn_probability ?? c.churnProbability
  return value == null ? null : Number(value)
}

/** Absolute CLV in ZMW — this is the CLV column. Never a rank. */
function clvOf(c) {
  const p = predictionStore.predictions[c.customerId]
  const value = p?.clv ?? c.clv
  return value == null ? null : Number(value)
}

function clvLabel(c) {
  const v = clvOf(c)
  return v == null ? '—' : formatCurrency(v)
}

/** Rank of that CLV within the snapshot cohort, for percentile-labelled cells. */
function clvPercentileLabel(c) {
  const pct = predictionStore.predictions[c.customerId]?.clv_percentile
  if (pct == null) return '—'
  const n = Math.round(pct * 100)
  const mod100 = n % 100
  const suffix = mod100 >= 11 && mod100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th')
  return `${n}${suffix}`
}

// ── Forward stage forecast (14/30/90d) ──────────────────────────
// Lifecycle severity order: a predicted stage further right is a deterioration.
const LIFECYCLE_ORDER = ['NEW', 'ACTIVE', 'GROWING', 'AT_RISK', 'DORMANT', 'CHURNED']

/** 14/30/90-day stage forecast for a row, or null when unavailable. */
function forecastOf(c) {
  return predictionStore.getLifecycleForecast(c.customerId)
}

/** +1 deteriorating, -1 improving, 0 stable/unknown — judged on the 30-day horizon. */
function driftOf(c) {
  const predicted = forecastOf(c)?.['30']?.stage
  if (!predicted) return 0
  const from = LIFECYCLE_ORDER.indexOf(String(c.state || '').toUpperCase())
  const to = LIFECYCLE_ORDER.indexOf(predicted)
  if (from < 0 || to < 0 || from === to) return 0
  return to > from ? 1 : -1
}

function healthPct(c) {
  const h = Number(c.healthScore)
  return Number.isFinite(h) ? Math.min(100, Math.max(0, h)) : 0
}

function healthColor(c) {
  return tierColor(healthTier(c.healthScore))
}

function churnColor(c) {
  const p = churnOf(c)
  if (p == null) return '#9ca3af'
  if (p < 0.2) return tierColor('passion')
  if (p < 0.5) return tierColor('power')
  if (p < 0.8) return tierColor('hope')
  return tierColor('inspire')
}

function stateColor(s) {
  return tierColor(stateTier(s))
}

function initialsOf(c) {
  const name = c.fullName || c.customerId || ''
  return name.replace(/^Customer\s+/i, '').slice(0, 2).toUpperCase() || 'CU'
}

const ACTION_BY_STATE = {
  CHURNED: 'Win-back outreach',
  DORMANT: 'Re-engagement call',
  AT_RISK: 'Retention call',
  ACTIVE: 'Relationship review',
  GROWING: 'Cross-sell review',
  NEW: 'Onboarding check-in',
}

function recommendedAction(c) {
  return ACTION_BY_STATE[c.state] || 'Monitor'
}

// ── Actions ────────────────────────────────────────────────────
function openEditCustomer(c) {
  editingCustomer.value = c
  showEditCustomer.value = true
}

function openProfile(c) {
  router.push({
    name: 'CustomerProfile',
    params: { id: c.customerId },
    query: { from: 'my-customers', page: String(page.value) },
  })
}

function clearFilters() {
  search.value = ''
  state.value = ''
  segment.value = ''
  branch.value = ''
  page.value = 1
}

function exportList() {
  const data = filteredRows.value.map((c) => ({
    customerId: c.customerId,
    fullName: c.fullName,
    state: c.state,
    healthScore: c.healthScore,
    churnProbability: churnOf(c),
    clv: clvOf(c) ?? '',
    clvPercentile: clvPercentileLabel(c),
    segment: c.segmentLabel,
    branch: c.branch,
    recommendedAction: recommendedAction(c),
  }))
  downloadCsv(
    reportFilename('my-customers'),
    data,
    ['customerId', 'fullName', 'state', 'healthScore', 'churnProbability', 'clv', 'clvPercentile', 'segment', 'branch', 'recommendedAction'],
  )
  notify(`Exported ${data.length} customers`, 'success', { autoClose: 2500 })
}

async function reload() {
  await customerStore.fetchPortfolio()
}

const computing = ref(false)

/** Recompute lifecycle states for the currently selected snapshot date. */
async function computeStates() {
  computing.value = true
  try {
    const result = await computeCustomerStates(snapshotStore.asOfDate)
    if (result?.status === 'NO_DATA') {
      notify(
        `No feature data for ${snapshotStore.asOfDate} — load a snapshot for that date first`,
        'error',
        { autoClose: 6000 },
      )
      return
    }
    const n = result?.states_upserted ?? 0
    notify(
      `Computed ${n} customer state${n === 1 ? '' : 's'} for ${snapshotStore.asOfDate}`,
      'success',
      { autoClose: 4000 },
    )
    await onDataLoaded()
  } catch (e) {
    notify(e.message || 'Compute failed', 'error', { autoClose: 6000 })
  } finally {
    computing.value = false
  }
}

// ── Delete / restore ──────────────────────────────────
// Selection is keyed by customer id so it survives paging and re-sorting.
const selectedIds = ref(new Set())
const selectedCount = computed(() => selectedIds.value.size)
const selectedRows = computed(() => rows.value.filter((c) => selectedIds.value.has(c.customerId)))

// Confirm dialog state. `mode` decides single vs bulk copy and the handler.
const confirmState = ref(null)
const deleteReason = ref('')

const pageIds = computed(() => pageRows.value.map((c) => c.customerId))
const allPageSelected = computed(
  () => pageIds.value.length > 0 && pageIds.value.every((id) => selectedIds.value.has(id))
)
const somePageSelected = computed(
  () => !allPageSelected.value && pageIds.value.some((id) => selectedIds.value.has(id))
)
const overBulkLimit = computed(() => selectedCount.value > MAX_BULK_DELETE)

function toggleRow(customerId) {
  const next = new Set(selectedIds.value)
  if (next.has(customerId)) next.delete(customerId)
  else next.add(customerId)
  selectedIds.value = next
}

function togglePage() {
  const next = new Set(selectedIds.value)
  if (allPageSelected.value) pageIds.value.forEach((id) => next.delete(id))
  else pageIds.value.forEach((id) => next.add(id))
  selectedIds.value = next
}

function clearSelection() {
  selectedIds.value = new Set()
}

/** Ask for confirmation before removing anything — never delete on a bare click. */
function askDeleteOne(customer) {
  confirmState.value = {
    mode: 'single',
    rows: [customer],
    title: 'Delete customer',
    message:
      `Remove ${customer.fullName || customer.customerId} from the portfolio?\n\n` +
      'All data for this customer will be permanently removed from the database, and this action is ' + 
      'recorded in the audit trail. This action cannot be undone.',
    confirmLabel: 'Delete customer',
  }
  deleteReason.value = ''
}

function askDeleteSelected() {
  if (!selectedCount.value) return
  const names = selectedRows.value.slice(0, 5).map((c) => c.customerId)
  const extra = selectedCount.value - names.length
  confirmState.value = {
    mode: 'bulk',
    rows: selectedRows.value,
    title: `Delete ${selectedCount.value} customers`,
    message:
      'Remove the selected customers from the portfolio?\n\n' +
      'All data for the selected customers will be permanently removed from the database, and this action is ' + 
      'recorded in the audit trail. This action cannot be undone.\n\n' +
      (names.join(', ') + (extra > 0 ? ` and ${extra} more` : '')),
    confirmLabel: `Delete ${selectedCount.value} customers`,
  }
  deleteReason.value = ''
}

function cancelDelete() {
  confirmState.value = null
  deleteReason.value = ''
}

async function confirmDelete() {
  const state = confirmState.value
  if (!state) return
  deleting.value = true
  try {
    const ids = state.rows.map((c) => c.customerId)
    const reason = deleteReason.value.trim() || undefined
    const result = ids.length === 1
      ? await deleteCustomer(ids[0], reason)
      : await bulkDeleteCustomers(ids, reason)

    const removed = result.deleted ?? 0
    const skipped = (result.already_deleted?.length || 0) + (result.not_found?.length || 0)
    confirmState.value = null
    deleteReason.value = ''
    clearSelection()

    if (removed === 0) {
      notify(
        result.not_found?.length
          ? `No matching customer found (${result.not_found.join(', ')})`
          : 'Nothing deleted — those customers were already removed',
        'error',
        { autoClose: 4000 },
      )
    } else {
      notify(
        `Deleted ${removed} customer${removed === 1 ? '' : 's'}` +
        (skipped ? ` · ${skipped} already removed or unknown` : '') +
        ' — hidden from the portfolio, restorable below',
        'success',
        { autoClose: 5000 },
      )
    }
    await refreshAfterDelete()
  } catch (e) {
    notify(e.message || 'Delete failed', 'error', { autoClose: 6000 })
  } finally {
    deleting.value = false
  }
}



/** Reload the portfolio and re-sync the hidden-count banner. */
async function refreshAfterDelete() {
  await customerStore.fetchPortfolio()
  
  const ids = pageRows.value.map((c) => c.customerId)
  if (ids.length) predictionStore.fetchBatchPredictions(ids)
}



/** Refresh the table (and the visible rows' predictions) after an ingest. */
async function onDataLoaded() {
  await customerStore.fetchPortfolio()
  const ids = pageRows.value.map((c) => c.customerId)
  if (ids.length) predictionStore.fetchBatchPredictions(ids)
}

// ── Effects ────────────────────────────────────────────────────
watch([search, state, segment, branch, sortKey, crmView], () => { page.value = 1 })
watch(totalPages, (max) => { if (page.value > max) page.value = max })

// Header search targets this route by name, so react to query changes too.
watch(() => route.query.q, (q) => {
  if (q == null) return
  search.value = String(q)
  page.value = 1
})
watch(() => route.query.state, (s) => {
  if (s == null) return
  state.value = String(s)
  page.value = 1
})

onMounted(async () => {
  await customerStore.fetchPortfolio()
  // Enrich the visible page with churn + CLV percentile (batched, non-blocking).
  const ids = pageRows.value.map((c) => c.customerId)
  if (ids.length) predictionStore.fetchBatchPredictions(ids)
  
})
</script>

<template>
  <div class="w-full pt-6 px-6 pb-8 relative min-h-screen">
        <div class="relative z-10 w-full">
    <!-- Page header -->
    <div class="mb-6 pb-4 border-b border-gray-300 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-[11px] text-gray-500 mb-1">
          <router-link to="/dashboard/portfolio" class="hover:text-absa-passion">Home</router-link>
          <span>/</span>
          <span class="text-absa-enrich font-bold">My Customers</span>
        </div>
        <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">My Customers</h1>
        <p class="text-xs text-gray-500 mt-1">
          Showing {{ totalFiltered.toLocaleString() }} of {{ rows.length.toLocaleString() }} loaded
          <template v-if="portfolioTotal > rows.length">
            · {{ portfolioTotal.toLocaleString() }} in the portfolio
          </template>
          <span v-if="activeFilterCount"> · {{ activeFilterCount }} filter{{ activeFilterCount > 1 ? 's' : '' }} applied</span>
        </p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button
          v-if="canLoadData"
          class="px-4 py-2 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-xs font-semibold"
          @click="showAddCustomer = true"
        >
          <span class="material-symbols-outlined text-[18px]">person_add</span>
          Add Customer
        </button>
        <button
          v-if="canLoadData"
          class="px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold"
          @click="showLoadData = true"
        >
          <span class="material-symbols-outlined text-[18px]">upload_file</span>
          Load Data
        </button>
        <button
          v-if="canLoadData"
          :disabled="computing"
          class="px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold disabled:opacity-40"
          @click="computeStates"
        >
          <span class="material-symbols-outlined text-[18px]">calculate</span>
          {{ computing ? 'Computing…' : 'Compute States' }}
        </button>
        <button
          :disabled="!rows.length"
          class="px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold disabled:opacity-40"
          @click="exportList"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          Export CSV
        </button>
                  <button
            @click="showPromiseToFund = true"
            class="px-4 py-2 bg-absa-passion text-white border border-absa-passion rounded-none flex items-center gap-2 hover:bg-absa-power transition-colors text-[10px] font-mono font-bold uppercase tracking-widest shadow-none"
          >
            <span class="material-symbols-outlined text-[14px]">lab_profile</span>
            Promise to Fund Report
          </button>
      </div>
    </div>

    <!-- Error banner -->
    <div
      v-if="customerStore.error"
      class="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700 flex justify-between items-center"
    >
      <span>{{ customerStore.error }}</span>
      <button class="font-bold underline" @click="reload">Retry</button>
    </div>

    <!-- CRM View Tabs -->
    <div class="flex items-center gap-6 border-b border-gray-300 mb-6">
      <button
        class="pb-2 text-sm font-bold uppercase tracking-wider transition-colors"
        :class="crmView === 'all' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
        @click="crmView = 'all'"
      >All Customers</button>
      <button
        class="pb-2 text-sm font-bold uppercase tracking-wider transition-colors"
        :class="crmView === 'risk' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700'"
        @click="crmView = 'risk'"
      >Dormant / At Risk</button>
    </div>

    <!-- Filters -->
    <div class="bg-white border border-gray-300 rounded-sm p-4 mb-4">
      <div class="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div class="relative flex-1 min-w-[220px]">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
          <input
            v-model="search"
            type="text"
            placeholder="Search customer, account or ID..."
            class="w-full border border-gray-300 rounded-sm pl-10 pr-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion focus:border-absa-passion outline-none"
          />
        </div>
        <select v-model="segment" class="border border-gray-300 rounded-sm px-3 py-2 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none">
          <option value="">All segments</option>
          <option v-for="opt in MARKET_SEGMENT_OPTIONS" :key="String(opt.marketSegment)" :value="String(opt.marketSegment)">
            {{ opt.code }} — {{ opt.label }}
          </option>
        </select>
        <select v-model="branch" class="border border-gray-300 rounded-sm px-3 py-2 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none">
          <option value="">All branches</option>
          <option v-for="b in branchOptions" :key="b" :value="b">{{ b }}</option>
        </select>
        <select v-model="sortKey" class="border border-gray-300 rounded-sm px-3 py-2 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none">
          <option value="health-asc">Health: worst first</option>
          <option value="health-desc">Health: best first</option>
          <option value="churn-desc">Churn risk: highest</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="state">Lifecycle state</option>
        </select>
      </div>
      <div class="flex items-center gap-2 flex-wrap mt-3">
        <button
          v-for="chip in stateChips"
          :key="chip.value"
          class="px-3 py-1 rounded-sm border text-[11px] font-bold uppercase tracking-wide transition-colors"
          :class="state === chip.value
            ? 'bg-absa-passion border-absa-passion text-white'
            : 'bg-white border-gray-300 text-gray-600 hover:border-absa-passion hover:text-absa-passion'"
          @click="state = chip.value"
        >
          {{ chip.label }} ({{ chip.count }})
        </button>
        <button v-if="activeFilterCount" class="ml-auto text-[11px] font-bold text-absa-passion underline" @click="clearFilters">
          Clear filters
        </button>
      </div>
    </div>

    <!-- Bulk selection bar -->
    <div
      v-if="canDelete && selectedCount > 0"
      class="mb-4 px-4 py-2.5 bg-absa-enrich text-white rounded-sm flex flex-wrap items-center justify-between gap-3"
    >
      <div class="flex items-center gap-3 text-xs">
        <span class="font-bold">{{ selectedCount.toLocaleString() }} selected</span>
        <span v-if="overBulkLimit" class="text-red-200">
          Limit is {{ MAX_BULK_DELETE }} per operation — trim the selection.
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1.5 border border-white/40 rounded-sm text-[11px] font-bold text-white hover:bg-white/10"
          @click="clearSelection"
        >Clear selection</button>
        <button
          :disabled="deleting || overBulkLimit"
          class="px-3 py-1.5 bg-absa-passion rounded-sm text-[11px] font-bold text-white hover:bg-absa-power disabled:opacity-40 flex items-center gap-1.5"
          @click="askDeleteSelected"
        >
          <span class="material-symbols-outlined text-[16px]">delete</span>
          Delete selected
        </button>
      </div>
    </div>

    <!-- Customer table -->
    <div class="bg-white border border-gray-300 rounded-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th v-if="canDelete" scope="col" class="pl-4 pr-2 py-3 w-10">
                <input
                  type="checkbox"
                  class="rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion cursor-pointer"
                  :checked="allPageSelected"
                  :indeterminate.prop="somePageSelected"
                  :aria-label="allPageSelected ? 'Deselect all on this page' : 'Select all on this page'"
                  @click.stop="togglePage"
                />
              </th>
              <th
                v-for="col in COLUMNS"
                :key="col.key"
                scope="col"
                class="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap"
              >{{ col.label }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-if="customerStore.loading && !rows.length">
              <td :colspan="COLUMNS.length + (canDelete ? 1 : 0)" class="px-4 py-10 text-center text-xs text-gray-500">Loading customers…</td>
            </tr>
            <tr v-else-if="!pageRows.length">
              <td :colspan="COLUMNS.length + (canDelete ? 1 : 0)" class="px-4 py-10 text-center text-xs text-gray-500">
                No customers match the current filters.
              </td>
            </tr>
            <tr
              v-for="c in pageRows"
              :key="c.customerId"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              :class="selectedIds.has(c.customerId) ? 'bg-red-50/60' : ''"
              @click="openProfile(c)"
            >
              <td v-if="canDelete" class="pl-4 pr-2 py-3" @click.stop>
                <input
                  type="checkbox"
                  class="rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion cursor-pointer"
                  :checked="selectedIds.has(c.customerId)"
                  :aria-label="`Select ${c.customerId}`"
                  @click.stop="toggleRow(c.customerId)"
                />
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                    :style="{ background: stateColor(c.state) }"
                  >{{ initialsOf(c) }}</div>
                  <div class="min-w-0">
                    <div class="text-xs font-bold text-absa-enrich truncate">{{ c.fullName || c.customerId }}</div>
                    <div class="text-[11px] text-gray-500">{{ c.customerId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <CustomerStatePill :state="c.state" />
                <span v-if="c.isTransition" class="ml-1 text-[10px] text-gray-400" :title="`Moved from ${c.previousState}`">↑</span>
                <!-- Forward stage per horizon; deterioration flagged only when the
                     30d prediction moves *later* in the lifecycle order. -->
                <div v-if="forecastOf(c)" class="mt-1 text-[10px] font-mono"
                     :class="driftOf(c) > 0 ? 'text-red-900 font-bold' : driftOf(c) < 0 ? 'text-absa-enrich' : 'text-gray-500'">
                  {{ ['14', '30', '90'].map(h => `${h}d ${forecastOf(c)[h]?.stage || '—'}`).join(' · ') }}
                  <span v-if="driftOf(c) > 0" title="Predicted to deteriorate within 30 days">▼</span>
                  <span v-else-if="driftOf(c) < 0" title="Predicted to improve within 30 days">▲</span>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full rounded-full" :style="{ width: healthPct(c) + '%', background: healthColor(c) }"></div>
                  </div>
                  <span class="text-xs font-mono font-bold text-absa-enrich">{{ c.healthScore != null ? Math.round(c.healthScore) : '—' }}</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-xs font-mono">
                <span v-if="churnOf(c) != null" class="font-bold" :style="{ color: churnColor(c) }">
                  {{ (churnOf(c) * 100).toFixed(1) }}%
                </span>
                <span v-else class="text-gray-400">—</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-xs font-mono text-absa-enrich">{{ clvLabel(c) }}</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="text-[11px] font-semibold text-gray-600">{{ c.segmentLabel || '—' }}</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-xs text-gray-600">{{ c.branch || '—' }}</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="text-[11px] font-semibold text-absa-enrich">{{ recommendedAction(c) }}</span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-right">
                <div class="flex items-center justify-end gap-3">
                  <button
                    class="text-gray-400 hover:text-absa-enrich"
                    :title="`Edit ${c.customerId}`"
                    :aria-label="`Edit ${c.customerId}`"
                    @click.stop="openEditCustomer(c)"
                  >
                    <span class="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    v-if="canDelete"
                    class="text-gray-400 hover:text-absa-passion"
                    :title="`Delete ${c.customerId}`"
                    :aria-label="`Delete ${c.customerId}`"
                    @click.stop="askDeleteOne(c)"
                  >
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                  <button
                    class="text-[11px] font-bold text-absa-passion hover:text-absa-power underline"
                    @click.stop="openProfile(c)"
                  >View profile</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <span class="text-[11px] text-gray-500">
          Showing {{ pageStart + 1 }}–{{ Math.min(pageStart + PAGE_SIZE, totalFiltered) }} of {{ totalFiltered.toLocaleString() }}
        </span>
        <div class="flex items-center gap-1">
          <button
            :disabled="page === 1"
            class="px-3 py-1.5 border border-gray-300 rounded-sm text-[11px] font-bold text-absa-enrich hover:bg-gray-50 disabled:opacity-40"
            @click="page = Math.max(1, page - 1)"
          >Prev</button>
          <span class="px-3 text-[11px] font-bold text-absa-enrich">{{ page }} / {{ totalPages }}</span>
          <button
            :disabled="page >= totalPages"
            class="px-3 py-1.5 border border-gray-300 rounded-sm text-[11px] font-bold text-absa-enrich hover:bg-gray-50 disabled:opacity-40"
            @click="page = Math.min(totalPages, page + 1)"
          >Next</button>
        </div>
      </div>
    </div>

    <!-- Data ingest: CSV mapping + core-banking sync -->
    <LoadCustomerDataModal :open="showLoadData" @close="showLoadData = false" @loaded="onDataLoaded" />
    <AddCustomerModal :open="showAddCustomer" @close="showAddCustomer = false" @added="onDataLoaded" />
    <EditCustomerModal :open="showEditCustomer" :customer="editingCustomer" @close="showEditCustomer = false" @added="onDataLoaded" />

    <!-- Destructive-action confirmation (permanent deletion) -->
    <ConfirmDialog
      :open="!!confirmState"
      :title="confirmState?.title || 'Delete customer'"
      :message="confirmState?.message || ''"
      eyebrow="Permanent delete"
      :confirm-label="confirmState?.confirmLabel || 'Delete'"
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
    <PromiseToFundModal
      :open="showPromiseToFund"
      :engagements="ptfEngagements"
      @close="showPromiseToFund = false"
    />
  </div>
  </div>
</template>




