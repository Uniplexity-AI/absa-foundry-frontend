<template>
  <div class="dashboard-root  w-full min-h-screen p-4 md:p-6 lg:p-8">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="min-h-screen flex flex-col space-y-8">
        <div class="flex justify-end">
          <LoadingSkeleton type="kpi" />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <LoadingSkeleton v-for="i in 4" :key="i" type="kpi" />
        </div>
        <LoadingSkeleton type="block" />
        <LoadingSkeleton type="table" :count="5" />
      </div>
    </template>
    <template v-else>
      <!-- Page Header -->
      <div class="mb-6 pb-4 border-b border-gray-300 flex justify-between items-end">
        <div>
          <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
            <span>Dashboard</span><span>/</span>
            <span>Data Pipeline</span><span>/</span>
            <span class="text-absa-enrich font-bold">Run History</span>
          </div>
          <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">Data Pipeline Health</h1>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none">
            <span class="material-symbols-outlined text-[18px]" data-icon="download">download</span>
            Export Logs
          </button>
          <button @click="openTriggerModal" class="px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors font-label text-sm font-semibold shadow-none">
            <span class="material-symbols-outlined text-[18px]">play_arrow</span>
            Trigger Manual Run
          </button>
          <router-link to="/dashboard/etl-config-manager" class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none">
            <span class="material-symbols-outlined text-[18px]">settings</span>
            Config Manager
          </router-link>
        </div>
      </div>

      <!-- Trigger Banners -->
      <div v-if="triggerSuccess" class="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded-sm text-sm text-green-700 flex justify-between items-center">
        <span>✓ {{ triggerSuccess }}</span>
        <button @click="triggerSuccess = null" class="text-green-500 hover:text-green-700">×</button>
      </div>
      <div v-if="triggerError" class="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700 flex justify-between items-center">
        <span>{{ triggerError }}</span>
        <button @click="triggerError = null" class="text-red-500 hover:text-red-700">×</button>
      </div>
      <div id="health-trend-container" class="relative w-full grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 h-auto min-h-fit block md:grid">
        <div id="health-column" class="relative lg:col-span-1 flex flex-col gap-4 w-full h-auto min-h-[220px]">
          <div class="flex flex-col gap-4 w-full">
            <div v-if="pipelineHealth.length === 0" class="bg-white rounded-sm border border-gray-300 p-5 text-center text-body-md text-secondary">No health data available</div>
            <div v-for="svc in pipelineHealth" :key="svc.name" class="bg-white rounded-sm border border-gray-300 p-5  shadow-none flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 flex items-center justify-center text-primary">
                  <span class="material-symbols-outlined">{{ svc.icon }}</span>
                </div>
                <div>
                  <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-1">{{ svc.name }}</p>
                  <p class="text-lg font-headline font-bold text-on-surface">{{ svc.status }}</p>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span class="w-3 h-3 rounded-full bg-[#FF780F] mb-1"></span>
                <span class="text-xs text-[#FF780F] font-semibold">{{ svc.metric }}</span>
              </div>
            </div>
          </div>
        </div>
        <div id="trend-column" class="relative lg:col-span-3 flex flex-col w-full h-auto min-h-[220px]">
          <div class="bg-white rounded-sm border border-gray-300 p-6  shadow-none w-full h-auto min-h-[220px] flex flex-col justify-between">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-headline-md font-headline font-semibold text-on-surface">Quality Score Trend</h3>
              <div class="flex gap-2 bg-white-container-low p-1 rounded-sm border border-gray-300">
                <button class="px-3 py-1 text-xs font-semibold rounded-sm bg-white shadow-none">24 HOURS</button>
                <button class="px-3 py-1 text-xs font-semibold rounded-sm text-on-surface-variant">7 DAYS</button>
              </div>
            </div>
            <div class="h-48 w-full relative mb-4">
              <div v-if="qualityTrendData.length === 0" class="flex items-center justify-center h-full text-body-md text-secondary">No trend data available</div>
              <div v-else class="absolute inset-0 flex items-end gap-1">
                <div v-for="(val, i) in qualityTrendData" :key="i" class="w-full bg-primary rounded-t" :style="{ height: val + '%' }"></div>
              </div>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-300 text-sm text-on-surface-variant">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 bg-primary rounded-sm block"></span>
                <span class="font-semibold text-on-surface">Data Integrity Score: {{ dataIntegrityScore != null ? dataIntegrityScore : '—' }}</span>
              </div>
              <span>{{ lastScanTime ? 'Last scan: ' + lastScanTime : '' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <section class="mb-8">
        <div class="bg-white rounded-sm shadow-none overflow-hidden ">
          <div class="p-5 flex justify-between items-center bg-white">
            <h3 class="text-headline-md font-headline font-semibold text-on-surface font-bold">Execution History</h3>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-on-surface-variant">Filter by:</span>
              <select class="border border-gray-300 rounded-sm text-sm py-1 pl-2 pr-8 bg-white">
                <option>All Statuses</option>
                <option>Running</option>
                <option>Completed</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-white text-xs text-on-surface-variant font-label uppercase tracking-wider">
                  <th class="p-4 font-semibold">Run ID</th>
                  <th class="p-4 font-semibold">Batch ID</th>
                  <th class="p-4 font-semibold">Duration</th>
                  <th class="p-4 font-semibold">Rows (RCV/VAL/LD/REJ)</th>
                  <th class="p-4 font-semibold">Quality Score</th>
                  <th class="p-4 font-semibold">Status</th>
                  <th class="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-if="executionRuns.length === 0">
                  <td colspan="7" class="p-12 text-center text-body-md text-secondary">No execution runs recorded</td>
                </tr>
                <tr v-for="run in executionRuns" :key="run.id" class="hover:bg-white-container-low transition-colors cursor-pointer" @click="router.push('/dashboard/etl-run-history/batch/' + run.auditId)">
                  <td class="p-4 font-semibold" :class="run.status === 'FAILED' ? 'text-primary' : 'text-on-surface'">{{ run.runId }}</td>
                  <td class="p-4 text-on-surface-variant">{{ run.batchId }}</td>
                  <td class="p-4">{{ run.duration }}</td>
                  <td class="p-4">{{ run.rows }}</td>
                  <td class="p-4">
                    <div class="w-16 h-2 bg-white-variant rounded-full overflow-hidden">
                      <div class="h-full" :class="run.qualityColor" :style="{ width: run.quality + '%' }"></div>
                    </div>
                  </td>
                  <td class="p-4">
                    <span :class="['inline-flex items-center gap-1.5 text-xs font-bold', run.statusColor]">
                      <span v-if="run.status === 'RUNNING'" class="w-1.5 h-1.5 rounded-full animate-pulse" :class="run.statusDot"></span>
                      <span v-if="run.status === 'COMPLETED'" class="material-symbols-outlined text-[14px]">check</span>
                      <span v-if="run.status === 'FAILED'" class="material-symbols-outlined text-[14px]">close</span>
                      {{ run.status }}
                    </span>
                  </td>
                  <td class="p-4 text-on-surface-variant">
                    <button @click.stop="router.push('/dashboard/etl-run-history/batch/' + run.auditId)" class="p-1 rounded-sm hover:bg-white-variant" title="View batch details">
                      <span class="material-symbols-outlined text-[18px]">open_in_new</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
          <div class="p-4 flex items-center justify-between bg-white text-sm text-on-surface-variant">
            <span>{{ pagination.total ? `Showing ${pagination.from} to ${pagination.to} of ${pagination.total} results` : 'No results' }}</span>
            <div class="flex items-center gap-1">
              <button @click="prevPage" :disabled="pagination.page <= 1" class="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-white-variant disabled:opacity-30">
                <span class="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button v-for="p in etlStore.totalPages" :key="p" @click="goToPage(p)" :class="['w-8 h-8 flex items-center justify-center rounded-sm border font-semibold', p === pagination.page ? 'bg-primary text-on-primary border-primary' : 'border-gray-300 hover:bg-white-variant']">{{ p }}</button>
              <button @click="nextPage" :disabled="pagination.page >= etlStore.totalPages" class="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-300 hover:bg-white-variant disabled:opacity-30">
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Metrics Grid -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-sm border border-gray-300 p-5 shadow-none ">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Storage Growth</p>
          <div class="flex items-end gap-3 mb-2">
            <span class="text-2xl font-black tracking-tight text-gray-900">{{ footerMetrics.storageGrowth.value != null ? '+' + footerMetrics.storageGrowth.value : '—' }}</span>
            <span v-if="footerMetrics.storageGrowth.change != null" class="text-sm font-semibold text-[#FF780F] flex items-center">
              <span class="material-symbols-outlined text-[16px]">trending_up</span> {{ footerMetrics.storageGrowth.change }}%
            </span>
          </div>
          <div class="w-full bg-white-variant h-1 rounded-full overflow-hidden mt-4">
            <div class="w-[75%] h-full bg-primary"></div>
          </div>
          <p class="text-[10px] text-on-surface-variant mt-2">{{ footerMetrics.storageGrowth.used ? footerMetrics.storageGrowth.used + ' of ' + footerMetrics.storageGrowth.total + ' Allocated' : '—' }}</p>
        </div>
        <div class="bg-white rounded-sm border border-gray-300 p-5 shadow-none flex flex-col justify-between ">
          <div>
            <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Average Quality</p>
            <div class="flex items-end gap-3">
              <span class="text-2xl font-black tracking-tight text-gray-900">{{ footerMetrics.averageQuality.value != null ? footerMetrics.averageQuality.value + '%' : '—' }}</span>
              <span v-if="footerMetrics.averageQuality.change != null" class="text-sm font-semibold text-[#FF780F] flex items-center">
                <span class="material-symbols-outlined text-[16px]">arrow_upward</span> {{ footerMetrics.averageQuality.change }}%
              </span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-sm border border-gray-300 p-5 shadow-none flex flex-col justify-between ">
          <div>
            <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Failed Retries</p>
            <div class="flex items-end justify-between">
              <span class="text-2xl font-black tracking-tight text-gray-900">{{ footerMetrics.failedRetries.count != null ? String(footerMetrics.failedRetries.count).padStart(2, '0') : '—' }}</span>
              <span v-if="footerMetrics.failedRetries.status" class="text-xs font-semibold text-primary flex items-center gap-1 border border-primary-fixed px-2 py-0.5 rounded">
                <span class="material-symbols-outlined text-[14px]">error</span> {{ footerMetrics.failedRetries.status }}
              </span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-sm border border-gray-300 p-5 shadow-none ">
          <p class="text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Gateway Latency</p>
          <div class="flex items-end justify-between mb-2">
            <span class="text-2xl font-black tracking-tight text-gray-900">{{ footerMetrics.gatewayLatency.value != null ? footerMetrics.gatewayLatency.value : '—' }}</span>
            <span v-if="footerMetrics.gatewayLatency.level" class="text-sm font-semibold text-primary flex items-center">
              <span class="material-symbols-outlined text-[16px]">warning</span> {{ footerMetrics.gatewayLatency.level }}
            </span>
          </div>
          <p class="text-[10px] text-on-surface-variant mt-2">{{ footerMetrics.gatewayLatency.note || '—' }}</p>
        </div>
      </section>
    </template>

    <!-- Trigger Pipeline Modal -->
    <Teleport to="body">
      <div v-if="showTrigger" class="fixed inset-0 z-50 flex items-center justify-center" @click.self="closeTriggerModal">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-sm border border-gray-300 shadow-lg p-6 w-full max-w-md mx-4">
          <h3 class="text-headline-md font-headline font-semibold text-on-surface mb-4">Trigger Pipeline Run</h3>

          <div v-if="triggerConfigsLoading" class="flex items-center justify-center py-8">
            <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>

          <div v-else-if="triggerConfigsError" class="text-sm text-red-600 mb-4">
            <p>{{ triggerConfigsError }}</p>
            <button @click="openTriggerModal" class="text-primary font-semibold hover:underline mt-1">Retry</button>
          </div>

          <div v-else-if="triggerConfigs.length === 0" class="text-sm text-on-surface-variant py-4">
            No extraction specs found in etl/config/extraction_specs/
          </div>

          <template v-else>
            <label class="block text-xs text-on-surface-variant font-label uppercase tracking-wide font-semibold mb-2">Select extraction spec</label>
            <select v-model="selectedConfig" class="w-full border border-gray-300 rounded-sm bg-white text-on-surface text-sm py-2 pl-3 pr-8 mb-4 focus:outline-none focus:ring-2 focus:ring-primary">
              <option :value="null" disabled>— Choose a config —</option>
              <option v-for="cfg in triggerConfigs" :key="cfg.name" :value="cfg.name">
                {{ cfg.name }} — {{ cfg.description || 'No description' }}
              </option>
            </select>

            <div class="flex justify-end gap-3">
              <button @click="closeTriggerModal" :disabled="triggerRunning" class="px-4 py-2 text-sm border border-gray-300 rounded-sm hover:bg-white-variant transition-colors disabled:opacity-50">Cancel</button>
              <button @click="confirmTrigger" :disabled="!selectedConfig || triggerRunning" class="px-4 py-2 text-sm bg-primary text-on-primary rounded-sm hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-2">
                <span v-if="triggerRunning" class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Run Pipeline
              </button>
            </div>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useETLStore } from '@/stores/etlStore'
import { fetchETLConfigs, triggerETLPipeline } from '@/services/etlApi'

const router = useRouter()
const etlStore = useETLStore()
const loading = ref(true)

// ── Pipeline health cards ──
const pipelineHealth = computed(() => {
  const s = etlStore.statusPanel
  if (!s) return []
  return [
    { name: 'PostgreSQL Cluster', icon: 'storage', status: s.current_status || '—', metric: s.current_pipeline || '—' },
    { name: 'Redis Cache', icon: 'memory', status: s.current_status || '—', metric: s.last_successful_duration || '—' },
    { name: 'API Gateway', icon: 'cloud', status: s.current_status || '—', metric: s.last_successful_rows || '—' },
  ]
})

// ── Quality trend chart ──
const qualityTrendData = computed(() =>
  (etlStore.qualityTrend || []).map(t => t.value)
)

// ── Data integrity score ──
const dataIntegrityScore = computed(() =>
  etlStore.kpis?.avg_quality != null ? etlStore.kpis.avg_quality + '%' : null
)

// ── Last scan time ──
const lastScanTime = computed(() =>
  etlStore.statusPanel?.current_status_since?.slice(0, 10) || null
)

// ── Execution runs table ──
const executionRuns = computed(() =>
  (etlStore.runs || []).map(r => ({
    id: r.id,
    auditId: r.runId,
    runId: r.runId?.slice(0, 12) || '—',
    batchId: r.batchId?.slice(0, 12) || '—',
    duration: r.duration || '—',
    rows: `${r.rowsReceived || '—'}/${r.rowsValid || '—'}/${r.rowsLoaded || '—'}/${r.rowsRejected || 0}`,
    quality: r.qualityScore || 0,
    qualityColor: r.qualityScore >= 95 ? 'bg-absa-passion' : r.qualityScore >= 80 ? 'bg-absa-energy' : 'bg-absa-inspire',
    status: r.status,
    statusColor: r.status === 'COMPLETED' ? 'text-absa-passion' : r.status === 'FAILED' ? 'text-absa-inspire' : 'text-absa-energy',
    statusDot: r.status === 'RUNNING' ? 'bg-absa-energy' : '',
  }))
)

// ── Pagination ──
const pagination = computed(() => ({
  page: etlStore.page,
  total: etlStore.totalRuns,
  from: (etlStore.page - 1) * etlStore.limit + 1,
  to: Math.min(etlStore.page * etlStore.limit, etlStore.totalRuns),
}))

// ── Footer metrics ──
const footerMetrics = computed(() => ({
  storageGrowth: { value: etlStore.totalRuns, change: null, used: null, total: null },
  averageQuality: { value: etlStore.kpis?.avg_quality != null ? etlStore.kpis.avg_quality + '%' : null, change: null },
  failedRetries: { count: etlStore.kpis?.failed_runs || 0, status: etlStore.kpis?.failed_runs > 0 ? 'warning' : null },
  gatewayLatency: { value: etlStore.kpis?.avg_duration || null, level: null, note: null },
}))

// ── Pagination actions ──
function goToPage(p) { etlStore.setPage(p) }
function nextPage() { if (etlStore.page < etlStore.totalPages) etlStore.setPage(etlStore.page + 1) }
function prevPage() { if (etlStore.page > 1) etlStore.setPage(etlStore.page - 1) }

// ── Trigger Pipeline Modal ──
const showTrigger = ref(false)
const triggerConfigs = ref([])
const triggerConfigsLoading = ref(false)
const triggerConfigsError = ref(null)
const selectedConfig = ref(null)
const triggerRunning = ref(false)
const triggerSuccess = ref(null)
const triggerError = ref(null)

async function openTriggerModal() {
  showTrigger.value = true
  selectedConfig.value = null
  triggerSuccess.value = null
  triggerError.value = null
  if (triggerConfigs.value.length === 0 && !triggerConfigsLoading.value) {
    triggerConfigsLoading.value = true
    triggerConfigsError.value = null
    try {
      triggerConfigs.value = await fetchETLConfigs()
    } catch (e) {
      triggerConfigsError.value = e.message || 'Failed to load configs'
    } finally {
      triggerConfigsLoading.value = false
    }
  }
}

function closeTriggerModal() {
  showTrigger.value = false
  selectedConfig.value = null
}

async function confirmTrigger() {
  if (!selectedConfig.value) return
  triggerRunning.value = true
  triggerError.value = null
  try {
    const res = await triggerETLPipeline(selectedConfig.value)
    triggerSuccess.value = res.message || `Pipeline triggered — ${selectedConfig.value}`
    closeTriggerModal()
    setTimeout(() => { triggerSuccess.value = null }, 5000)
    await etlStore.refresh()
  } catch (e) {
    triggerError.value = e.message || 'Failed to trigger pipeline'
    setTimeout(() => { triggerError.value = null }, 8000)
  } finally {
    triggerRunning.value = false
  }
}

// ── Init ──
onMounted(async () => {
  await etlStore.loadDashboard()
  loading.value = false
})
</script>

<style scoped>
/* 1. RESET ALL CHILD POSITIONS TO NORMAL DOCUMENT FLOW */
.dashboard-root,
.dashboard-root main,
.dashboard-root section,
.dashboard-root div,
.dashboard-root header,
.dashboard-root table,
.dashboard-root tr,
.dashboard-root td,
.dashboard-root th,
.dashboard-root h1,
.dashboard-root h2,
.dashboard-root h3,
.dashboard-root p,
.dashboard-root span {
  position: relative !important;
  float: none !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
  transform: none !important;
  clear: both !important;
}

/* 1b. Restore absolute positioning for chart histogram bars */
#trend-column .absolute {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
}
#trend-column .absolute > div {
  position: static !important;
}

/* 2. RE-ESTABLISH ROOT & MAIN FLEX DIRECTION */
.dashboard-root {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  min-height: 100vh !important;
  background-color: #ffffff !important;
}

.dashboard-root main {
  display: flex !important;
  flex-direction: column !important;
  gap: 2rem !important;
  width: 100% !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
}

/* 3. Side-by-side grid: health cards left, trend chart right */
#health-trend-container {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1.5rem !important;
}

#health-column {
  grid-column: span 1 / span 1 !important;
}

#trend-column {
  grid-column: span 3 / span 3 !important;
}

section.grid {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1rem !important;
}

/* 4. HARDCODE VISIBILITY & CONTRAST (SOLVES FAINT TEXT) */
.dashboard-root,
.dashboard-root h1,
.dashboard-root h2,
.dashboard-root h3,
.dashboard-root p,
.dashboard-root span,
.dashboard-root td,
.dashboard-root th {
  color: #131010 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.text-on-surface-variant {
  color: #B50232 !important;
}

.text-primary {
  color: #DC0037 !important;
}

.bg-white {
  background-color: #ffffff !important;
  border: 1px solid rgba(220, 0, 55, 0.15) !important;
}

/* 6. Force chart canvas/SVG to recalculate dimensions */
#trend-column canvas,
#trend-column svg {
  width: 100% !important;
  height: 100% !important;
  min-height: 220px !important;
}

/* Apply consistent border to Execution History table section */
section.mb-8 .bg-white {
  border: 1px solid rgba(220, 0, 55, 0.15) !important;
}
</style>

<style>
/* 1. Force main container into vertical flex column layout */
#app main,
main {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  height: auto !important;
  gap: 1.5rem !important;
}

/* 2. Prevent card surfaces from being transparent or washed out */
.bg-white,
.dashboard-root .bg-white {
  background-color: #ffffff !important;
  opacity: 1 !important;
  border: 1px solid rgba(220, 0, 55, 0.15) !important;
}

/* 3. Ensure table rows stack normally inside the main column */
section {
  width: 100% !important;
  display: block !important;
}

/* 4. Side-by-side grid: health cards left, trend chart right */
#health-trend-container {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1.5rem !important;
  align-items: start !important;
}

#health-column {
  grid-column: span 1 / span 1 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 1rem !important;
}

#trend-column {
  grid-column: span 3 / span 3 !important;
  width: 100% !important;
}

/* 4b. Enforce canvas/SVG height so chart libraries initialize correctly */
#trend-column canvas,
#trend-column svg,
#trend-column .chart-wrapper {
  display: block !important;
  width: 100% !important;
  min-height: 250px !important;
  height: 250px !important;
}

/* 5. Fallback CSS variables for offline backend */
:root {
  --brand-primary: #DC0037;
  --on-surface: #131010;
  --on-surface-variant: #B50232;
  --surface: #ffffff;
  --outline-variant: #e5e7eb;
}

/* 6. Text contrast fallbacks */
.text-on-surface,
[class*="text-on-surface"] {
  color: #131010 !important;
  opacity: 1 !important;
}

.text-on-surface-variant,
[class*="text-on-surface-variant"] {
  color: #B50232 !important;
  opacity: 1 !important;
}

.text-primary,
[class*="text-primary"] {
  color: #DC0037 !important;
  opacity: 1 !important;
}
</style>
