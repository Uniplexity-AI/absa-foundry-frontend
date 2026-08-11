<template>
  <div class="w-full pt-10 px-6 pb-6 space-y-6 global-mesh-bg">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="min-h-screen flex flex-col space-y-6">
        <LoadingSkeleton type="block" />
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div class="space-y-4">
            <LoadingSkeleton type="kpi" />
            <LoadingSkeleton type="kpi" />
            <LoadingSkeleton type="kpi" />
          </div>
          <div class="lg:col-span-3">
            <LoadingSkeleton type="block" />
          </div>
        </div>
        <LoadingSkeleton type="table" :count="4" />
        <LoadingSkeleton type="table" :count="4" />
      </div>
    </template>
    <template v-else>
      <!-- Dashboard Title Area -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div>
          <div class="flex items-center gap-4">
            <h2 class="text-3xl font-bold text-gray-900 tracking-tight">{{ modelDetails.name || '—' }}</h2>
            <span v-if="modelDetails.status" class="text-[#DC0037] text-xs font-bold uppercase tracking-wider">
              {{ modelDetails.status }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-1">{{ modelsStore.modelCount }} models deployed</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="flex items-center gap-2 bg-white border border-[#DC0037] text-[#DC0037] hover:bg-brand-pink px-4 py-2 rounded-md text-sm font-semibold transition-colors">
            <i class="fa-solid fa-download"></i> Export Report
          </button>
          <button class="flex items-center gap-2 bg-[#DC0037] text-white hover:bg-[#95052A] px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">
            <i class="fa-solid fa-rotate-right"></i> Retrain Model
          </button>
        </div>
      </div>

      <!-- Top Metrics Row -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Small Metric Cards Column -->
        <div class="flex flex-col gap-6 lg:w-64 flex-shrink-0">
          <!-- AUC-ROC -->
          <div class="p-5 rounded-md border border-brand-subtle shadow-sm flex flex-col justify-between h-[150px] global-dotted-bg">
            <div class="flex justify-between items-start">
              <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">AUC-ROC</h3>
              <span v-if="modelMetrics.aucRoc.change != null" class="text-xs font-semibold text-brand-green flex items-center gap-1">
                <i class="fa-solid fa-arrow-up text-[10px]"></i> {{ modelMetrics.aucRoc.change }}%
              </span>
            </div>
            <div>
              <div class="text-3xl font-bold text-gray-900 mb-2">{{ modelMetrics.aucRoc.value != null ? modelMetrics.aucRoc.value : '—' }}</div>
              <div class="h-10 w-full relative">
                <canvas ref="sparklineAucCanvas"></canvas>
              </div>
            </div>
          </div>

          <!-- Log Loss -->
          <div class="p-5 rounded-md border border-brand-subtle shadow-sm flex flex-col justify-between h-[150px] global-dotted-bg">
            <div class="flex justify-between items-start">
              <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Log Loss</h3>
              <span class="text-xs font-semibold text-gray-500">Lower is better</span>
            </div>
            <div>
              <div class="text-3xl font-bold text-gray-900 mb-2">{{ modelMetrics.logLoss.value }}</div>
              <div class="h-10 w-full relative">
                <canvas ref="sparklineF1Canvas"></canvas>
              </div>
            </div>
          </div>

          <!-- Brier Score -->
          <div class="p-5 rounded-md border border-brand-subtle shadow-sm flex flex-col justify-between h-[150px] global-dotted-bg">
            <div class="flex justify-between items-start">
              <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Brier Score</h3>
              <span class="text-xs font-semibold text-gray-500">Calibration</span>
            </div>
            <div>
              <div class="text-3xl font-bold text-gray-900 mb-3">{{ modelMetrics.brier.value }}</div>
            </div>
          </div>
        </div>

        <!-- Main Chart Area -->
        <div class="flex-grow p-6 rounded-md border border-brand-subtle shadow-sm global-dotted-bg">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-900">Performance Over Time (30D)</h3>
            <div class="flex items-center gap-4 text-sm font-medium">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-brand-red"></span>
                <span class="text-gray-700">Precision</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#DC0037]/40"></span>
                <span class="text-gray-700">Recall</span>
              </div>
            </div>
          </div>
          <div class="relative w-full h-[360px]">
            <canvas ref="mainChartCanvas"></canvas>
          </div>
        </div>
      </div>

      <!-- Feature Drift Monitor -->
      <div class="rounded-md border border-brand-subtle shadow-sm overflow-hidden global-dotted-bg">
        <div class="p-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Feature Drift Monitor (PSI)</h3>
            <p class="text-sm text-gray-500 mt-1">Analyzing shift between Training Distribution and Current Inference Logs</p>
          </div>
          <div class="text-gray-600 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5">
            <i class="fa-solid fa-circle-info"></i> Threshold: 0.20 PSI
          </div>
        </div>
        <div class="overflow-x-auto table-container">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th class="p-4 pl-6 font-semibold">Feature Name</th>
                <th class="p-4 font-semibold">Training Mean</th>
                <th class="p-4 font-semibold">Current Mean</th>
                <th class="p-4 font-semibold">Distribution Shift</th>
                <th class="p-4 font-semibold">Drift Score (PSI)</th>
                <th class="p-4 pr-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100">
              <tr v-if="featureDriftList.length === 0">
                <td colspan="6" class="p-12 text-center text-body-md text-secondary">No feature drift data available</td>
              </tr>
              <tr v-for="(row, index) in featureDriftList" :key="index" class="transition-colors">
                <td class="p-4 pl-6 font-medium text-gray-900">
                  <div class="flex items-center gap-3">
                    <div class="w-0.5 h-4 bg-[#DC0037] rounded-full"></div>
                    {{ row.name }}
                  </div>
                </td>
                <td class="p-4 text-gray-600">{{ row.trainMean }}</td>
                <td class="p-4 text-gray-600">{{ row.currentMean }}</td>
                <td class="p-4">
                  <div class="flex items-center gap-1">
                    <div :class="['h-4 w-2 rounded-sm', row.invertShift ? 'bg-brand-pink' : 'bg-brand-red']"></div>
                    <div :class="['h-4 w-2 rounded-sm', row.invertShift ? 'bg-brand-red' : 'bg-brand-pink']"></div>
                  </div>
                </td>
                <td :class="['p-4', row.scoreColor || 'text-gray-900']">{{ row.score }}</td>
                <td class="p-4 pr-6">
                  <span :class="['inline-flex items-center px-2 py-0.5 rounded text-xs font-bold', row.badgeClass]">
                    {{ row.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Live Prediction Log -->
      <div class="rounded-md border border-brand-subtle shadow-sm overflow-hidden mb-10 global-dotted-bg">
        <div class="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Live Prediction Log</h3>
            <p class="text-sm text-gray-500 mt-1">Real-time inference stream from production endpoint</p>
          </div>
          <div class="flex items-center gap-3">
            <button class="flex items-center gap-2 bg-white border border-[#DC0037] text-[#DC0037] hover:bg-brand-pink px-3 py-1.5 rounded text-sm font-semibold transition-colors">
              <i class="fa-solid fa-download text-xs"></i> Export Logs
            </button>
            <div class="relative">
              <select v-model="selectedTimeframe" class="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#DC0037] focus:border-[#DC0037] cursor-pointer">
                <option>Last 1 Hour</option>
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <i class="fa-solid fa-chevron-down text-[10px]"></i>
              </div>
            </div>
            <button class="text-gray-500 hover:text-brand-red ml-2">
              <i class="fa-solid fa-bars-staggered"></i>
            </button>
          </div>
        </div>
        <div class="overflow-x-auto table-container">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th class="p-4 pl-6 font-semibold">Timestamp</th>
                <th class="p-4 font-semibold">Correlation ID</th>
                <th class="p-4 font-semibold">Customer ID</th>
                <th class="p-4 font-semibold">Prob (Churn)</th>
                <th class="p-4 font-semibold">Class</th>
                <th class="p-4 pr-6 font-semibold">Latency</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-gray-100 font-mono">
              <tr v-if="predictionLogs.length === 0">
                <td colspan="6" class="p-12 text-center text-body-md text-secondary font-sans">No prediction logs available</td>
              </tr>
              <tr v-for="(log, idx) in predictionLogs" :key="idx" class="transition-colors">
                <td class="p-4 pl-6 text-gray-500">{{ log.timestamp }}</td>
                <td class="p-4 text-[#DC0037] font-medium">{{ log.correlationId }}</td>
                <td class="p-4 text-gray-700">{{ log.customerId }}</td>
                <td class="p-4 text-gray-900 font-sans">{{ log.prob }}</td>
                <td :class="['p-4 font-bold font-sans', log.classColor]">{{ log.class }}</td>
                <td class="p-4 pr-6 text-gray-600 font-sans">{{ log.latency }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination Footer -->
        <div class="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-medium">
          <span>Showing latest 50 of {{ predictionTotal.toLocaleString() }} predictions</span>
          <div class="flex items-center gap-4">
            <button class="hover:text-brand-red disabled:opacity-50"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="hover:text-brand-red"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useModelsStore } from '@/stores/modelsStore'
import Chart from 'chart.js/auto'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const modelsStore = useModelsStore()
const loading = ref(true)

// Monitoring data
const performanceHistory = ref([])
const featureDriftList = ref([])
const predictionLogs = ref([])
const predictionTotal = ref(0)

onMounted(async () => {
  await modelsStore.fetchModels()
  // Fetch monitoring data in parallel
  try {
    const [perfRes, driftRes, logRes] = await Promise.all([
      api.get('/api/v1/monitoring/performance-history', { params: { horizon_days: 30 } }),
      api.get('/api/v1/monitoring/feature-drift'),
      api.get('/api/v1/monitoring/prediction-log', { params: { limit: 50 } }),
    ])
    performanceHistory.value = perfRes.data.history || []
    featureDriftList.value = (driftRes.data.features || []).map(f => ({
      name: f.name,
      trainMean: f.training_mean.toFixed(1),
      currentMean: f.current_mean.toFixed(1),
      score: f.drift_score.toFixed(2),
      scoreColor: f.drift_score > 0.20 ? 'text-[#DC0037] font-bold' : 'text-gray-900',
      status: f.status,
      badgeClass: f.status === 'CRITICAL' ? 'bg-red-100 text-[#DC0037]' : f.status === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700',
      invertShift: f.invert_shift,
    }))
    predictionLogs.value = (logRes.data.predictions || []).map(p => ({
      timestamp: p.timestamp,
      correlationId: p.correlation_id,
      customerId: p.customer_id,
      prob: (p.churn_probability * 100).toFixed(1) + '%',
      class: p.predicted_class,
      classColor: p.predicted_class === 'CHURN' ? 'text-[#DC0037]' : 'text-green-600',
      latency: p.latency_ms.toFixed(1) + 'ms',
    }))
    predictionTotal.value = logRes.data.total_predictions || 0
  } catch (e) {
    console.warn('Models: monitoring fetch failed', e.message)
  }
  loading.value = false
})

// Interactive State
const selectedTimeframe = ref('Last 1 Hour')

// Model Details — from champion churn model
const modelDetails = computed(() => {
  const m = modelsStore.championChurn
  return {
    name: m?.id || '—',
    status: m?.status || null,
  }
})

// Metric cards — from backend model registry
const modelMetrics = computed(() => {
  const m = modelsStore.championChurn
  const metrics = m?.metrics || {}
  return {
    aucRoc: {
      value: metrics.auc != null ? (metrics.auc * 100).toFixed(1) + '%' : '—',
      change: null,
    },
    logLoss: {
      value: metrics.log_loss != null ? metrics.log_loss.toFixed(4) : '—',
    },
    brier: {
      value: metrics.brier != null ? metrics.brier.toFixed(4) : '—',
    },
  }
})

// Chart References
const sparklineAucCanvas = ref(null)
const sparklineF1Canvas = ref(null)
const mainChartCanvas = ref(null)

watch(loading, async (val) => {
  if (!val) {
    await nextTick()
    initCharts()
  }
})

function initCharts() {
  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false, min: 0 } },
    elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } },
    layout: { padding: 0 }
  }

  const history = performanceHistory.value
  const labels = history.map(h => h.date)
  const aucData = history.map(h => h.auc * 100)
  const precisionData = history.map(h => h.precision * 100)
  const recallData = history.map(h => h.recall * 100)

  // AUC-ROC Sparkline
  if (sparklineAucCanvas.value) {
    new Chart(sparklineAucCanvas.value, {
      type: 'line',
      data: { labels, datasets: [{ data: aucData, borderColor: '#DC0037', fill: false }] },
      options: sparklineOptions,
    })
  }

  // Log Loss Sparkline
  if (sparklineF1Canvas.value) {
    new Chart(sparklineF1Canvas.value, {
      type: 'line',
      data: { labels, datasets: [{ data: history.map(h => h.log_loss), borderColor: '#DC0037', fill: false }] },
      options: sparklineOptions,
    })
  }

  // Main Performance Chart
  if (mainChartCanvas.value) {
    new Chart(mainChartCanvas.value, {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Precision', data: precisionData, borderColor: '#DC0037', borderWidth: 2, tension: 0.4, pointRadius: 0, pointHoverRadius: 4 },
          { label: 'Recall', data: recallData, borderColor: 'rgba(220, 0, 55, 0.4)', borderWidth: 2, borderDash: [4, 4], tension: 0.4, pointRadius: 0, pointHoverRadius: 4 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false } },
        scales: { x: { display: false, grid: { display: false } }, y: { display: false, min: 0, max: 100 } },
        layout: { padding: { top: 20, bottom: 20 } },
      },
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --brand-red: #DC0037;
  --brand-dark: #131010;
  --brand-gray: #f5f5f5;
  --brand-border: #e5e7eb;
  --brand-text: #333333;
  --brand-muted: #6b7280;
  --brand-bg: #fafafa;
  --brand-pink: rgba(220, 0, 55, 0.1);
  --brand-green: #FF780F;
  --brand-warn: #FF780F;
}

/* Custom Utilities and Pattern Definitions */
.bg-grid-pattern {
  background-image: linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px);
  background-size: 20px 20px;
}

.text-brand-red { color: var(--brand-red); }
.text-brand-green { color: var(--brand-green); }
.text-brand-text { color: var(--brand-text); }

.bg-brand-red { background-color: var(--brand-red); }
.bg-brand-pink { background-color: var(--brand-pink); }

.border-brand-subtle {
  border-color: rgba(220, 0, 55, 0.2);
}

.card-outline {
  border: 1px solid var(--brand-red);
  border-opacity: 0.2;
}

.table-container::-webkit-scrollbar {
  height: 8px;
}
.table-container::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.table-container::-webkit-scrollbar-thumb {
  background: #c1c1c1; 
  border-radius: 4px;
}
.table-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8; 
}
</style>