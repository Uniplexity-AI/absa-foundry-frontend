<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useETLStore } from '@/stores/etlStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { API_BASE_URL } from '@/services/api'

const store = useETLStore()

const isExtracting = ref(false)
const extractionProgress = ref(null)
let progressInterval = null

const fetchExtractionProgress = async () => {
  try {
    const { data } = await api.get('/features/extract-historical/status');
    if (data && data.status !== 'idle') {
      extractionProgress.value = data;
      isExtracting.value = data.status === 'running' || data.status === 'started';
      if (!isExtracting.value && progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    }
  } catch (err) {
    console.error('Failed to fetch extraction progress', err);
  }
}

onMounted(() => {
  fetchExtractionProgress();
  progressInterval = setInterval(fetchExtractionProgress, 2000);
});

const triggerHistoricalExtraction = async () => {
  if (isExtracting.value) return;
  isExtracting.value = true;
  extractionProgress.value = { status: 'started', current: 0, total: 24, current_date: '' };
  try {
    await api.post('/features/extract-historical');
    if (!progressInterval) {
      progressInterval = setInterval(fetchExtractionProgress, 2000);
    }
  } catch (err) {
    console.error('Failed to start historical extraction', err);
    alert('Failed to start extraction.');
    isExtracting.value = false;
  }
}

const snapshotStore = useSnapshotStore()
const loading = computed(() => store.loading)

const api = axios.create({ baseURL: API_BASE_URL, timeout: 0 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── System Health from KPIs ──
const pgStatus = computed(() => store.statusPanel?.current_status || '--')
const redisStatus = computed(() => store.statusPanel?.current_status || '--')
const gatewayStatus = computed(() => store.statusPanel?.current_status || '--')
const pgLatency = computed(() => {
  const v = store.kpis?.avg_duration
  return v || '--'
})
const redisMemory = computed(() => '--')
const gatewayUptime = computed(() => {
  const v = store.statusPanel?.current_status_since
  return v ? new Date(v).toLocaleDateString() : '--'
})

// ── Quality Trend ──
const qualityTrend = computed(() => store.qualityTrend || [])
const qualityPoints = computed(() => qualityTrend.value.map(r => r.value ?? 0))

const qualityLine = computed(() => {
  const w = 800; const h = 160; const min = 90
  const pts = qualityPoints.value
  if (pts.length < 2) return '0,0 800,0'
  return pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - ((Math.max(v, min) - min) / (100 - min)) * h}`).join(' ')
})

const qualityArea = computed(() => {
  const w = 800; const h = 160; const min = 90
  const pts = qualityPoints.value
  if (pts.length < 2) return `0,${h} 800,${h}`
  const line = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - ((Math.max(v, min) - min) / (100 - min)) * h}`)
  return `0,${h} ${line.join(' ')} ${w},${h}`
})

const avgQuality = computed(() => {
  const pts = qualityPoints.value
  if (pts.length === 0) return '--'
  return (pts.reduce((a, b) => a + b, 0) / pts.length).toFixed(1) + '%'
})

// ── Execution History ──
const executionHistory = computed(() =>
  store.runs.map(r => ({
    id: r.id || r.runId,
    runId: (r.runId || '').slice(0, 12) || '--',
    batchId: (r.batchId || '').slice(0, 12) || '--',
    duration: r.duration || '--',
    rowsReceived: r.rowsReceived ?? '--',
    rowsValid: r.rowsValid ?? '--',
    rowsLoaded: r.rowsLoaded ?? '--',
    rowsRejected: r.rowsRejected ?? 0,
    qualityScore: r.qualityScore ?? 0,
    qualityClass: (r.qualityScore ?? 0) >= 95 ? 'green' : (r.qualityScore ?? 0) >= 80 ? 'amber' : 'red',
    status: r.status || 'UNKNOWN',
    statusClass: r.status === 'COMPLETED' ? 'green' : r.status === 'FAILED' ? 'red' : 'amber',
  }))
)

// ── Bottom Stats ──
const totalRuns = computed(() => store.totalRuns || '--')
const failedRetries = computed(() => store.kpis?.failed_runs || 0)

// ────────────────────────────────────────────────────────────────
// Pipeline Runner
// ────────────────────────────────────────────────────────────────
const todayStr = new Date().toISOString().slice(0, 10)
const showRunModal = ref(false)
const isRunning = ref(false)
const runDate = ref(todayStr)
const runResult = ref(null)

// ── Per-step elapsed timers ──
const stepTimers = ref({})
const stepIntervals = {}

function startStepTimer(stepId) {
  stepTimers.value[stepId] = 0
  stepIntervals[stepId] = setInterval(() => {
    stepTimers.value[stepId] = (stepTimers.value[stepId] || 0) + 1
  }, 1000)
}

function stopStepTimer(stepId) {
  if (stepIntervals[stepId]) {
    clearInterval(stepIntervals[stepId])
    delete stepIntervals[stepId]
  }
}

function formatElapsed(seconds) {
  if (seconds === undefined || seconds === null) return ''
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

// ── Extraction sub-step progress bar ──
const EXTRACTION_SUB_STEPS = [
  { key: 'connecting',  label: 'Connecting to Denodo / Hadoop' },
  { key: 'streaming',   label: 'Streaming rows from source'    },
  { key: 'validating',  label: 'Validating & transforming'     },
  { key: 'loading',     label: 'Loading into PostgreSQL'       },
  { key: 'ml_features', label: 'Building ML feature tables'    },
]
const extractionSubStep = ref(0)
const liveRowsLoaded = ref(null)
let extractionPollInterval = null

function startExtractionPoll() {
  extractionSubStep.value = 0
  liveRowsLoaded.value = null
  let tick = 0

  extractionPollInterval = setInterval(async () => {
    tick++
    // Auto-advance sub-step every ~10s through first phases
    if (extractionSubStep.value < 3 && tick % 5 === 0) {
      extractionSubStep.value = Math.min(extractionSubStep.value + 1, 3)
    }
    // Poll live row counts from the audit table
    try {
      const { data } = await api.get('/api/etl/runs?limit=1')
      const latest = data?.runs?.[0] || data?.[0]
      if (latest) {
        const loaded = latest.rowsLoaded ?? latest.rows_loaded ?? null
        if (loaded !== null && loaded > 0) {
          liveRowsLoaded.value = loaded
          extractionSubStep.value = Math.max(extractionSubStep.value, 2)
        }
      }
    } catch (_) { /* silently ignore */ }
  }, 2000)
}

function stopExtractionPoll(success) {
  if (extractionPollInterval) {
    clearInterval(extractionPollInterval)
    extractionPollInterval = null
  }
  if (success) extractionSubStep.value = EXTRACTION_SUB_STEPS.length - 1
}

const pipelineSteps = ref([
  { id: 'extraction',  label: '1 — Data Extraction',  detail: '', status: 'idle' },
  { id: 'features',    label: '2 — Feature Engine',   detail: '', status: 'idle' },
  { id: 'states',      label: '3 — State Engine',     detail: '', status: 'idle' },
  { id: 'predictions', label: '4 — Prediction Batch', detail: '', status: 'idle' },
])

function resetSteps() {
  pipelineSteps.value.forEach(s => { s.status = 'idle'; s.detail = '' })
  runResult.value = null
  stepTimers.value = {}
  Object.keys(stepIntervals).forEach(k => { clearInterval(stepIntervals[k]); delete stepIntervals[k] })
  stopExtractionPoll(false)
  extractionSubStep.value = 0
  liveRowsLoaded.value = null
}

function openPipelineRunner() {
  resetSteps()
  showRunModal.value = true
}

function closeRunModal() {
  if (isRunning.value) return
  showRunModal.value = false
}

async function startPipeline() {
  if (isRunning.value) return
  isRunning.value = true
  resetSteps()
  const date = runDate.value

  const stepConfigs = [
    {
      id: 'extraction',
      label: 'Data Extraction',
      call: () => api.post('/api/etl/trigger', {
        config_name: 'customer_360.yaml',
        sync: true,
        source_type: 'denodo',
        snapshot: date,
        force: true,
        run_models: 'shared,churn,clv,lifecycle,balance',
      }),
      summary: (d) => `Extraction complete — ${liveRowsLoaded.value !== null ? liveRowsLoaded.value.toLocaleString() + ' rows loaded' : 'Config: ' + (d?.config_name ?? 'customer_360.yaml')}`,
    },
    {
      id: 'features',
      label: 'Feature Engine',
      call: () => api.post('/features/compute-batch', null, { params: { as_of_date: date } }),
      summary: (d) => `${d?.customers_processed ?? d?.rows_processed ?? '?'} customers processed`,
    },
    {
      id: 'states',
      label: 'State Engine',
      call: () => api.post('/api/v1/customers/compute-states', null, { params: { as_of_date: date } }),
      summary: (d) => `${d?.customers_processed ?? '?'} classified, ${d?.states_upserted ?? '?'} upserted`,
    },
    {
      id: 'predictions',
      label: 'Prediction Batch',
      call: () => api.post('/api/v1/predictions/batch', null, { params: { as_of_date: date } }),
      summary: (d) => `${d?.customers_scored ?? '?'} customers scored`,
    },
  ]

  let allOk = true
  for (const cfg of stepConfigs) {
    const step = pipelineSteps.value.find(s => s.id === cfg.id)
    step.status = 'running'
    step.detail = 'In progress…'
    startStepTimer(cfg.id)
    if (cfg.id === 'extraction') startExtractionPoll()

    try {
      const { data } = await cfg.call()
      stopStepTimer(cfg.id)
      if (cfg.id === 'extraction') stopExtractionPoll(true)
      step.status = 'done'
      step.detail = cfg.summary(data)
    } catch (e) {
      stopStepTimer(cfg.id)
      if (cfg.id === 'extraction') stopExtractionPoll(false)
      step.status = 'error'
      step.detail = e?.response?.data?.detail || e.message || 'Request failed'
      allOk = false
      break
    }
  }

  isRunning.value = false

  if (allOk) {
    runResult.value = { ok: true, message: `Pipeline complete for ${date}. Snapshot selector updated.` }
    await snapshotStore.fetchAvailable()
    snapshotStore.setDate(date)
    store.loadDashboard()
  } else {
    runResult.value = { ok: false, message: 'Pipeline stopped at error above. Fix the issue and re-run.' }
  }
}

onMounted(() => {
  store.loadDashboard()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <header class="bg-white border-b border-gray-200 shrink-0 relative z-0">
      <div class="max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 class="text-2xl font-black text-gray-900 uppercase tracking-tight">Data Pipeline Health</h1>
            <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">Monitoring ingestion, transformation, and quality across all data sources</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button @click="triggerHistoricalExtraction" :disabled="isExtracting" class="h-9 px-4 bg-white border border-gray-200 text-gray-500 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:border-absa-passion hover:text-absa-passion disabled:opacity-50">
              <i class="fas" :class="isExtracting ? 'fa-circle-notch fa-spin' : 'fa-history'"></i>
              {{ isExtracting ? 'Extracting...' : 'Extract Historical Data' }}
            </button>
            <button class="h-9 px-4 bg-white border border-gray-200 text-gray-500 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:border-absa-passion hover:text-absa-passion">
              <i class="fas fa-file-export"></i>
              Export Logs
            </button>
            <button @click="openPipelineRunner" class="h-9 px-5 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 hover:bg-absa-power cursor-pointer">
              <i class="fas fa-play"></i>
              Trigger Manual Run
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex-1 max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-0 space-y-8 pb-20">
      
      <div v-if="extractionProgress && extractionProgress.status !== 'idle'" class="bg-white border border-gray-200 p-6 relative group overflow-hidden dot-pattern">
        <div class="relative z-10 flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <div class="text-[10px] font-black uppercase tracking-widest text-gray-900">
              Historical Extraction
              <span v-if="extractionProgress.status === 'running'" class="text-gray-400 ml-2">- Processing {{ extractionProgress.current_date }}</span>
            </div>
            <div class="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              {{ Math.round((extractionProgress.current / extractionProgress.total) * 100) || 0 }}% ({{ extractionProgress.current }} / {{ extractionProgress.total }} Months)
            </div>
          </div>
          <div class="w-full h-2 bg-gray-100 overflow-hidden relative">
            <div class="absolute inset-y-0 left-0 bg-absa-passion transition-all duration-300" :style="{ width: ((extractionProgress.current / extractionProgress.total) * 100) + '%' }"></div>
          </div>
          <div v-if="extractionProgress.status === 'completed'" class="text-[10px] font-black text-green-600 uppercase tracking-widest">
            Historical Extraction Completed Successfully!
          </div>
        </div>
      </div>

      <LoadingSkeleton v-if="loading" type="stats" />
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- PostgreSQL -->
        <div class="bg-white border border-gray-200 relative group overflow-hidden hover:border-absa-passion transition-colors flex flex-col p-6 min-h-[140px]">
          <div class="absolute inset-0 dot-pattern opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest z-20">PostgreSQL</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-database text-lg"></i></div>
            <span class="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]"></span>
          </div>
          <div class="relative z-10 mt-auto">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cluster Status</p>
            <div class="flex items-end gap-3 mt-1">
              <span class="text-3xl font-black tracking-tighter" :class="pgStatus === 'Operational' ? 'text-green-600' : 'text-amber-600'">{{ pgStatus }}</span>
            </div>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Avg Duration: {{ pgLatency }}</p>
          </div>
        </div>

        <!-- Redis -->
        <div class="bg-white border border-gray-200 relative group overflow-hidden hover:border-absa-passion transition-colors flex flex-col p-6 min-h-[140px]">
          <div class="absolute inset-0 dot-pattern opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest z-20">Redis Cache</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-bolt text-lg"></i></div>
            <span class="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]"></span>
          </div>
          <div class="relative z-10 mt-auto">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cache Status</p>
            <div class="flex items-end gap-3 mt-1">
              <span class="text-3xl font-black tracking-tighter" :class="redisStatus === 'Operational' ? 'text-green-600' : 'text-amber-600'">{{ redisStatus }}</span>
            </div>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Memory: {{ redisMemory }}</p>
          </div>
        </div>

        <!-- API Gateway -->
        <div class="bg-white border border-gray-200 relative group overflow-hidden hover:border-absa-passion transition-colors flex flex-col p-6 min-h-[140px]">
          <div class="absolute inset-0 dot-pattern opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div class="absolute top-0 right-0 bg-white border-b border-l border-gray-200 px-2 py-0.5 text-[9px] font-black text-gray-400 uppercase tracking-widest z-20">API Gateway</div>
          <div class="flex justify-between items-start mb-6 relative z-10">
            <div class="text-gray-400"><i class="fas fa-network-wired text-lg"></i></div>
            <span class="w-2.5 h-2.5 rounded-full" :class="gatewayStatus === 'Operational' ? 'bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]' : 'bg-amber-500 shadow-[0_0_0_3px_rgba(245,158,11,0.2)]'"></span>
          </div>
          <div class="relative z-10 mt-auto">
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gateway Status</p>
            <div class="flex items-end gap-3 mt-1">
              <span class="text-3xl font-black tracking-tighter" :class="gatewayStatus === 'Operational' ? 'text-green-600' : 'text-amber-600'">{{ gatewayStatus }}</span>
            </div>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Uptime: {{ gatewayUptime }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-3 border border-gray-200 flex flex-col relative z-0">
        <div class="flex justify-between items-center p-3 border-b border-gray-100">
          <div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">Quality Score Trend</h3>
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Data Integrity Score: <strong class="text-gray-900">{{ avgQuality }}</strong> &bull; {{ qualityTrend.length }} data points</p>
          </div>
        </div>
        <div class="h-[160px] w-full pt-4 px-2">
          <svg viewBox="0 0 800 160" preserveAspectRatio="none" class="w-full h-full">
            <defs>
              <linearGradient id="qualityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(220,0,55,0.25)"/>
                <stop offset="100%" stop-color="rgba(220,0,55,0.02)"/>
              </linearGradient>
            </defs>
            <line v-for="i in 4" :key="'g'+i" x1="0" :y1="i*40" x2="800" :y2="i*40" stroke="#F3F4F6" stroke-width="1"/>
            <polygon :points="qualityArea" fill="url(#qualityGrad)"/>
            <polyline :points="qualityLine" fill="none" stroke="#DC0037" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="0" y1="30" x2="800" y2="30" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="6,4"/>
            <text x="805" y="34" fill="#F59E0B" font-size="10" font-family="monospace">90%</text>
          </svg>
        </div>
      </div>

      <div>
        <div class="bg-white p-3 border border-gray-200 flex flex-col md:flex-row gap-3 items-center justify-between relative z-0 transition-colors hover:border-absa-passion border-b-0">
          <div class="flex items-center gap-3">
             <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight ml-2">Execution History</h3>
             <span class="px-2 py-0.5 bg-red-50 text-absa-passion border border-red-100 text-[9px] font-black uppercase tracking-widest">Today</span>
          </div>
        </div>

        <div class="relative z-0 bg-white border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Run ID</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Batch ID</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Duration</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Rows R/V/L/R</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">Quality</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-500 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="run in executionHistory" :key="run.id" class="hover:bg-gray-50 transition-colors group">
                  <td class="px-4 py-3">
                    <div class="text-[11px] font-black text-absa-passion uppercase">{{ run.id }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-[11px] font-black text-gray-900 uppercase">{{ run.batchId }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-[10px] font-black text-gray-900 uppercase">{{ run.duration }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase">
                      <span class="text-gray-900">{{ run.rowsReceived }}</span> <span class="text-gray-300">/</span>
                      <span class="text-green-600">{{ run.rowsValid }}</span> <span class="text-gray-300">/</span>
                      <span class="text-blue-600">{{ run.rowsLoaded }}</span> <span class="text-gray-300">/</span>
                      <span class="text-red-600">{{ run.rowsRejected }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="text-[11px] font-black uppercase" :class="run.qualityScore >= 90 ? 'text-green-600' : 'text-amber-600'">
                      {{ run.qualityScore }}%
                    </div>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <span class="inline-flex items-center gap-1.5 px-2 py-1 border text-[9px] font-black uppercase tracking-widest"
                      :class="run.status === 'SUCCESS' ? 'text-green-600 bg-green-50 border-green-200' : run.status === 'FAILED' ? 'text-red-600 bg-red-50 border-red-200' : 'text-amber-600 bg-amber-50 border-amber-200'">
                      {{ run.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <Teleport to="body">
  <div v-if="showRunModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md" @click.self="closeRunModal">
    <div class="bg-white rounded-none w-full max-w-xl overflow-hidden shadow-2xl relative border border-gray-200">
      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
      
      <!-- Header -->
      <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10">
        <div class="flex items-center gap-2">
          <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
          <h3 class="text-xs font-bold uppercase tracking-widest text-gray-900">Run AI Pipeline</h3>
        </div>
        <button @click="closeRunModal" :disabled="isRunning" class="text-gray-400 hover:text-absa-passion transition-colors disabled:opacity-50">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-5 space-y-5 relative z-10 bg-white/50">
        <div class="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
          Runs Feature Engine → State Engine → Predictions in sequence for the selected date.
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase tracking-widest text-gray-900 mb-1.5">As-of Date</label>
          <div class="flex items-center gap-3">
            <input
              v-model="runDate"
              type="date"
              class="border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10 font-bold text-gray-700"
              :disabled="isRunning"
              :max="todayStr"
            />
            <span class="text-[9px] text-gray-400 uppercase tracking-widest hidden sm:inline">Defaults to today. Predictions are keyed by this date.</span>
          </div>
        </div>

        <!-- Pipeline Steps -->
        <div class="space-y-2">
          <div
            v-for="(step, index) in pipelineSteps"
            :key="step.id"
            class="border border-gray-200 bg-white relative z-10 transition-colors overflow-hidden"
            :class="{
              'border-absa-passion shadow-[0_0_0_1px_rgba(220,0,55,1)]': step.status === 'running',
              'border-green-500': step.status === 'done',
              'border-red-500': step.status === 'error',
              'opacity-60': step.status === 'idle'
            }"
          >
            <!-- Main step row -->
            <div class="flex items-center gap-3 px-4 py-3">
              <div class="flex-shrink-0 w-6 h-6 rounded-none flex items-center justify-center border"
                :class="{
                  'border-gray-300 text-gray-400': step.status === 'idle',
                  'border-absa-passion text-absa-passion bg-red-50': step.status === 'running',
                  'border-green-500 text-green-500 bg-green-50': step.status === 'done',
                  'border-red-500 text-red-500 bg-red-50': step.status === 'error',
                }"
              >
                <span class="text-[10px] font-bold" v-if="step.status === 'idle'">{{ index + 1 }}</span>
                <i v-else-if="step.status === 'running'" class="fas fa-circle-notch fa-spin text-[10px]"></i>
                <i v-else-if="step.status === 'done'" class="fas fa-check text-[10px]"></i>
                <i v-else-if="step.status === 'error'" class="fas fa-times text-[10px]"></i>
              </div>
              
              <div class="flex-1 min-w-0">
                <div class="text-[10px] font-bold uppercase tracking-widest"
                  :class="{
                    'text-gray-900': step.status !== 'idle' && step.status !== 'error',
                    'text-gray-500': step.status === 'idle',
                    'text-red-600': step.status === 'error'
                  }"
                >{{ step.label }}</div>
                <div class="text-[9px] text-gray-400 mt-0.5 truncate" v-if="step.detail">{{ step.detail }}</div>
              </div>

              <!-- Elapsed timer -->
              <div v-if="step.status === 'running' || (step.status === 'done' && stepTimers[step.id] !== undefined)"
                class="flex-shrink-0 text-[9px] font-black uppercase tracking-widest tabular-nums"
                :class="step.status === 'running' ? 'text-absa-passion' : 'text-gray-400'"
              >
                <i v-if="step.status === 'running'" class="fas fa-clock mr-1"></i>
                {{ formatElapsed(stepTimers[step.id]) }}
              </div>
            </div>

            <!-- Extraction sub-step progress — shown only when extraction is running -->
            <div v-if="step.id === 'extraction' && step.status === 'running'" class="border-t border-gray-100 px-4 pb-3 pt-2 bg-gray-50 space-y-2">
              <!-- Sub-step labels -->
              <div class="flex items-center gap-2 flex-wrap">
                <div
                  v-for="(sub, si) in EXTRACTION_SUB_STEPS"
                  :key="sub.key"
                  class="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest"
                  :class="{
                    'text-absa-passion': si === extractionSubStep,
                    'text-green-600': si < extractionSubStep,
                    'text-gray-300': si > extractionSubStep,
                  }"
                >
                  <i v-if="si < extractionSubStep" class="fas fa-check"></i>
                  <i v-else-if="si === extractionSubStep" class="fas fa-circle-notch fa-spin"></i>
                  <i v-else class="fas fa-circle" style="font-size:4px"></i>
                  {{ sub.label }}
                  <span v-if="si < EXTRACTION_SUB_STEPS.length - 1" class="text-gray-200 mx-0.5">›</span>
                </div>
              </div>

              <!-- Progress bar -->
              <div class="w-full h-1.5 bg-gray-200 overflow-hidden">
                <div
                  class="h-full bg-absa-passion transition-all duration-700"
                  :style="{ width: ((extractionSubStep / (EXTRACTION_SUB_STEPS.length - 1)) * 100) + '%' }"
                ></div>
              </div>

              <!-- Live row count -->
              <div v-if="liveRowsLoaded !== null" class="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                <i class="fas fa-database mr-1"></i>
                {{ liveRowsLoaded.toLocaleString() }} rows loaded so far…
              </div>
            </div>
          </div>
        </div>

        <div v-if="runResult" class="flex items-center gap-2 px-4 py-3 border text-[10px] font-bold uppercase tracking-widest"
          :class="runResult.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'"
        >
          <i class="fas" :class="runResult.ok ? 'fa-check-circle' : 'fa-exclamation-circle'"></i>
          {{ runResult.message }}
        </div>
      </div>

      <!-- Footer -->
      <div class="px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3">
        <button @click="closeRunModal" :disabled="isRunning" class="px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
          Cancel
        </button>
        <button @click="startPipeline" :disabled="isRunning || !!runResult?.ok" class="flex items-center gap-2 px-6 py-2.5 bg-absa-passion text-white text-[10px] font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors disabled:opacity-50">
          <i v-if="!isRunning" class="fas fa-play text-[9px]"></i>
          <i v-else class="fas fa-circle-notch fa-spin text-[9px]"></i>
          {{ isRunning ? 'Running...' : 'Run Pipeline' }}
        </button>
      </div>

    </div>
  </div>
</Teleport>
    
  </div>
</template>

<style scoped>
.dot-pattern {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 16px 16px;
}

.mesh-background {
  background-color: #fcfcfc;
  background-image:
    linear-gradient(#f0f0f0 1px, transparent 1px),
    linear-gradient(90deg, #f0f0f0 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
