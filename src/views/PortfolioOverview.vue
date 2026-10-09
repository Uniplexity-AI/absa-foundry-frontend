<template>
  <div class="w-full pt-6 px-6 pb-6 font-sans">
    <!-- Loading Skeleton -->
    <template v-if="customerStore.loading">
      <div class="min-h-[calc(100vh-6rem)] flex flex-col">
        <div class="mb-8">
          <LoadingSkeleton type="stats" />
        </div>
        <div class="grid grid-cols-12 gap-4 md:gap-4 flex-1 mb-8 min-h-0">
          <div class="col-span-12 lg:col-span-4">
            <div class="h-full"><LoadingSkeleton type="block" /></div>
          </div>
          <div class="col-span-12 lg:col-span-8">
            <div class="h-full"><LoadingSkeleton type="block" /></div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 md:gap-4">
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="card" />
        </div>
      </div>
    </template>

    <!-- Main Content -->
    <template v-else>
      <!-- Page Header -->
      <div class="mb-6 pb-4 border-b border-gray-200 flex justify-between items-end">
        <div>
          <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
            <span>Dashboard</span><span>/</span>
            <span class="text-absa-enrich font-bold">Portfolio</span>
          </div>
          <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">Portfolio Overview</h1>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm font-bold text-gray-600">Data Snapshot:</span>
          <input
            v-model="snapshotStore.selectedDate"
            type="date"
            @change="onSnapshotChange"
            class="block w-48 pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-absa-passion focus:border-absa-passion sm:text-sm rounded-sm bg-white font-mono text-absa-enrich border"
          />
        </div>
      </div>

      <!-- Top Stats Row -->
      <div class="grid grid-cols-4 gap-4 md:gap-4 mb-8">
        <!-- Total Customers -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 mb-6">
          <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Total Customers</h3>
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-2xl font-black tracking-tight text-gray-900">{{ customerStore.portfolio.total.toLocaleString() || '—' }}</span>
              <span class="text-xs font-bold text-amber-700 font-semibold flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 10l7-7m0 0l7 7m-7-7v18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                {{ customerStore.portfolio.activePct }}% active
              </span>
            </div>
            <div class="flex items-end gap-1.5 h-12 mt-auto">
              <div v-if="totalCustomersSparkline.length === 0" class="w-full h-full flex items-center justify-center text-[11px] text-gray-500 font-mono mt-0.5">—</div>
              <div v-for="(h, i) in totalCustomersSparkline" :key="i" class="w-1/6 bg-primary rounded-t" :style="{ height: h + '%' }"></div>
            </div>
        </div>

        <!-- At Risk -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 mb-6">
            <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">At Risk</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-2xl font-black tracking-tight text-orange-500">{{ customerStore.portfolio.atRisk.toLocaleString() || '—' }}</span>
              <span class="text-xs text-gray-500">| {{ customerStore.portfolio.atRiskPct }}%</span>
            </div>
            <p class="text-xs text-gray-500 mt-auto">+4 since last snapshot</p>
        </div>

        <!-- Dormant -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 mb-6">
            <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Dormant</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-2xl font-black tracking-tight text-gray-900">{{ customerStore.portfolio.dormant.toLocaleString() || '—' }}</span>
              <span class="text-xs text-gray-500">| {{ customerStore.portfolio.dormantPct }}%</span>
            </div>
            <p class="text-xs text-gray-500 mt-auto">Stable across 3 periods</p>
        </div>

        <!-- Churned -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 mb-6">
            <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Churned</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-2xl font-black tracking-tight text-gray-900">{{ customerStore.portfolio.churned.toLocaleString() || '—' }}</span>
              <span class="text-xs text-gray-500">| {{ customerStore.portfolio.churnedPct }}%</span>
            </div>
            <p class="text-xs text-gray-500 mt-auto">Last 90 days</p>
        </div>
      </div>

      <!-- Charts Row: Donut + Histogram -->
      <div class="grid grid-cols-12 gap-4 md:gap-4 mb-8">
        <div class="col-span-12 lg:col-span-5 bg-white rounded-sm border border-gray-300 p-4 mb-6">
          <h3 class="text-sm font-bold text-absa-enrich mb-4">State Distribution</h3>
          <div class="h-64">
            <Doughnut :data="donutChartData" :options="donutChartOptions" />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-7 bg-white rounded-sm border border-gray-300 p-4 mb-6">
          <h3 class="text-sm font-bold text-absa-enrich mb-4">Health Score Distribution</h3>
          <div class="h-64">
            <Bar :data="histogramChartData" :options="histogramChartOptions" />
          </div>
        </div>
      </div>

      <!-- Main Grid Layout -->
      <div class="grid grid-cols-12 gap-4 md:gap-4">
        <!-- Left Column: Critical Alerts -->
        <div class="col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-4 overflow-y-auto">
          <div class="bg-white rounded-sm border border-gray-300 shadow-none  flex flex-col h-[500px]">
            <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white z-10">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-absa-passion text-[20px]">campaign</span>
                <h3 class="text-sm font-bold text-absa-enrich">Critical Alerts</h3>
              </div>
              <span class="text-label-sm font-label-sm text-absa-passion">
                {{ alerts.length }} NEW
              </span>
            </div>
            <div class="card-content flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              <div v-if="alerts.length === 0" class="text-xs text-gray-500 text-center py-8">No critical alerts</div>
              <!-- Alerts List -->
              <div 
                v-for="(alert, index) in alerts" 
                :key="index" 
                class="py-1"
              >
                <div class="flex justify-between items-start mb-1">
                  <h4 class="text-xs font-bold text-absa-enrich">{{ alert.name }}</h4>
                  <span class="text-[11px] text-gray-500 font-mono mt-0.5">{{ alert.time }}</span>
                </div>
                <p :class="['text-xs font-bold font-mono text-absa-enrich mb-1', alert.titleColorClass]">{{ alert.title }}</p>
                <p class="text-xs text-gray-500 mb-3">{{ alert.description }}</p>
                <button 
                  v-if="alert.actionable" 
                  :class="[
                    'w-full text-xs font-bold py-2 px-4 rounded-sm shadow-none transition-colors',
                    alert.buttonClass
                  ]"
                  @click="acknowledgeAlert(index)"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Center/Right Column: Main Content Area -->
        <div class="col-span-12 lg:col-span-8 flex flex-col gap-4 overflow-y-auto">
          <!-- Predictive Lifecycle Ledger -->
          <div class="bg-white rounded-sm shadow-none  overflow-hidden h-[500px]">
            <div class="h-full flex flex-col">
              <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
                <h3 class="text-sm font-bold text-absa-enrich">Predictive Lifecycle Ledger</h3>
                <div class="flex gap-2">
                  <select v-model="ledgerMarketSegment" aria-label="Filter ledger by market segment" class="rounded-sm border border-gray-300 bg-white px-2 py-1.5 text-xs text-absa-enrich focus:border-absa-passion focus:outline-none focus:ring-1 focus:ring-absa-passion" @change="ledgerPage = 1">
                    <option value="">All segments</option>
                    <option v-for="segment in marketSegmentOptions" :key="segment.code" :value="segment.marketSegment === null ? 'other' : String(segment.marketSegment)">
                      {{ segment.code }} — {{ segment.label }}
                    </option>
                  </select>
                  <button @click="toggleLedgerFilter" title="Filter: show at-risk only" :class="['p-1.5 border rounded-sm transition-colors', ledgerAtRiskOnly ? 'border-absa-passion text-absa-passion bg-red-50' : 'border-gray-300 text-gray-500 hover:bg-gray-50']">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                  </button>
                  <button @click="exportLedgerCsv" title="Export ledger as CSV" class="p-1.5 border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto flex-1">
                <table class="min-w-full divide-y divide-gray-100">
                  <thead>
                    <tr class="border-b border-gray-200 bg-gray-50">
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Name</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">State</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Segment</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Health ↑</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Churn Prob</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">CLV (ZMW)</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-if="ledgerRows.length === 0">
                      <td colspan="7" class="p-12 text-center text-xs text-gray-500">No customers match the current ledger filters</td>
                    </tr>
                    <tr v-for="customer in ledgerRows" :key="customer.customerId">
                      <td class="px-3 py-1.5 whitespace-nowrap">
                        <div>
                            <router-link :to="`/dashboard/customer/${encodeURIComponent(customer.customerId)}`" class="text-xs font-bold text-absa-enrich hover:text-absa-passion transition-colors">{{ customer.fullName }}</router-link>
                            <div class="text-[11px] text-gray-500 font-mono mt-0.5">ID: {{ customer.customerId }}</div>
                          </div>
                      </td>
                      <td class="px-3 py-1.5 whitespace-nowrap">
                        <span class="text-xs">{{ customer.state }}</span>
                      </td>
                      <td class="px-3 py-1.5 text-xs text-gray-600">{{ customer.segment }}</td>
                      <td class="px-3 py-1.5 whitespace-nowrap">
                        <div class="text-xs font-bold font-mono text-absa-enrich mb-1">{{ customer.healthScore ?? '--' }}</div>
                        <div class="progress-bar-container">
                          <div class="progress-bar-fill bg-red-900" :style="{ width: (customer.healthScore ?? 0) + '%' }"></div>
                        </div>
                      </td>
                      <td class="px-3 py-1.5 whitespace-nowrap text-xs font-bold">
                        {{ predictionStore.getChurnProbability(customer.customerId) != null ? Math.round(predictionStore.getChurnProbability(customer.customerId) * 100) + '%' : '--' }}
                      </td>
                      <td class="px-3 py-1.5 whitespace-nowrap text-xs font-mono">{{ clvCell(customer.customerId) }}</td>
                      <td class="px-3 py-1.5 whitespace-nowrap">
                        <router-link :to="`/dashboard/customer/${encodeURIComponent(customer.customerId)}?from=ledger&page=${ledgerPage}`" class="text-xs font-bold py-1.5 px-3 rounded-sm shadow-none transition-colors w-full bg-absa-passion text-white hover:bg-red-900 inline-block text-center">
                          REVIEW
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Pagination -->
              <div class="p-4 border-t border-gray-200 bg-white flex items-center justify-between mt-auto">
                <span class="text-xs text-gray-500">
                  Showing {{ ledgerStart }}-{{ ledgerEnd }} of {{ ledgerTotal.toLocaleString() }} customers
                  <span v-if="ledgerWindowed" class="text-gray-400">· paging the first {{ ledgerHeld.toLocaleString() }} loaded</span>
                  <span v-else-if="ledgerHasFilter" class="text-gray-400">matching</span>
                </span>
                <div class="flex gap-2">
                  <button @click="ledgerPage--" :disabled="ledgerPage <= 1" :class="['px-3 py-1 border border-gray-300 rounded-sm text-xs', ledgerPage <= 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50']">Previous</button>
                  <button @click="ledgerPage++" :disabled="ledgerPage >= ledgerTotalPages" :class="['px-3 py-1 border border-gray-300 rounded-sm text-xs', ledgerPage >= ledgerTotalPages ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-absa-enrich hover:bg-gray-50']">Next</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Row: AI & Trend -->
      <div class="grid grid-cols-2 gap-4 md:gap-4 mt-8">
        <!-- AI Recommendation -->
        <div class="bg-white rounded-sm border border-gray-300 border-l-4 border-l-absa-passion p-5 mb-6 flex flex-col relative overflow-hidden shadow-none min-h-[200px]">
          <div class="relative z-10">
            <h3 class="text-sm font-bold text-absa-enrich mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-absa-passion">auto_awesome</span>
              AI Churn Intelligence
            </h3>
            <div v-if="predictionStore.churnDrivers.length > 0" class="space-y-2">
              <div v-for="d in predictionStore.churnDrivers.slice(0, 3)" :key="d.rank" class="flex justify-between items-center pb-2 border-b border-gray-100 last:border-0">
                <span class="text-body-sm text-gray-600 truncate mr-2">{{ d.driver_name }}</span>
                <span class="text-body-sm font-bold text-absa-enrich whitespace-nowrap">{{ d.contribution_pct }}% <span class="text-gray-400 font-normal">({{ d.affected_customer_count.toLocaleString() }})</span></span>
              </div>
            </div>
            <p v-else class="text-xs text-gray-500 leading-relaxed">Churn intelligence data will appear here once computed.</p>
          </div>
        </div>

        <!-- Portfolio Health Trend -->
        <div class="bg-white rounded-sm border border-gray-300 p-6 shadow-none  flex items-center min-h-[200px]">
          <div class="card-content flex gap-4 items-start w-full">
            <div class="flex-shrink-0 w-12 h-16 bg-[#FF780F]/10 rounded-md flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-absa-enrich mb-2">Portfolio Health Trend</h3>
              <p class="text-xs text-gray-500 leading-relaxed">
                <strong class="text-absa-enrich font-bold">{{ customerStore.portfolio.total.toLocaleString() }}</strong> customers tracked.
                <strong v-if="customerStore.portfolio.atRiskPct > 0" class="text-absa-passion">{{ customerStore.portfolio.atRiskPct }}% at risk</strong>,
                <strong v-if="customerStore.portfolio.dormantPct > 0" class="text-red-900">{{ customerStore.portfolio.dormantPct }}% dormant</strong>,
                <strong v-if="customerStore.portfolio.churnedPct > 0" class="text-absa-enrich">{{ customerStore.portfolio.churnedPct }}% churned</strong>.
                {{ customerStore.portfolio.actionsDue.toLocaleString() }} actions due.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent RM Activity -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none mt-8 overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px] text-absa-passion">history</span>
            <h3 class="text-sm font-bold text-absa-enrich">Recent RM Activity</h3>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-label-sm text-gray-500">{{ recentActivity.length }} recent</span>
            <button @click="refreshActivity" class="text-xs font-bold text-absa-passion hover:text-absa-power flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px]">refresh</span> Refresh
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th class="px-3 py-2">Action</th>
                <th class="px-3 py-2">Customer</th>
                <th class="px-3 py-2">Detail</th>
                <th class="px-3 py-2">Performed By</th>
                <th class="px-3 py-2">When</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="recentActivity.length === 0">
                <td colspan="5" class="px-3 py-8 text-center text-xs text-gray-500">
                  No RM actions yet — assign an RM, enrol a campaign or launch an intervention to see activity here.
                </td>
              </tr>
              <tr v-for="a in recentActivity" :key="a.key" class="hover:bg-gray-50 transition-colors">
                <td class="px-3 py-2">
                  <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', actionBadgeClass(a.type)]">
                    <span class="material-symbols-outlined text-[12px]">{{ actionIcon(a.type) }}</span>
                    {{ actionLabel(a.type) }}
                  </span>
                </td>
                <td class="px-3 py-2">
                  <router-link v-if="a.customerId" :to="`/dashboard/customer/${encodeURIComponent(a.customerId)}`" class="text-xs font-bold text-absa-enrich hover:text-absa-passion font-mono">
                    {{ a.customerId }}
                  </router-link>
                  <span v-else class="text-xs text-gray-400">—</span>
                </td>
                <td class="px-3 py-2 text-xs text-gray-600 max-w-[360px] truncate">{{ a.detail }}</td>
                <td class="px-3 py-2 text-xs text-gray-500">{{ a.actor }}</td>
                <td class="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">{{ fmtActivityTime(a.at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { downloadCsv, notify, reportFilename } from '@/utils/absaExport'
import { acknowledgeAlert as persistAck, isAlertAcked, hydrateLogFromServer, getActionLog } from '@/utils/absaActions'
import { MARKET_SEGMENT_OPTIONS } from '@/config/customerSegments'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()
const snapshotStore = useSnapshotStore()
const route = useRoute()

onMounted(async () => {
  await customerStore.fetchPortfolio()
  ledgerPage.value = parseInt(route.query.page) || 1
  // Header search may arrive as ?q= — prefill + enable filter
  if (route.query.q) {
    searchText.value = String(route.query.q)
    ledgerAtRiskOnly.value = false
  }
  // Batch-fetch predictions for visible customers
  const ids = customerStore.customers.slice(0, 50).map(c => c.customerId)
  predictionStore.fetchBatchPredictions(ids, snapshotStore.asOfDate)
  // Fetch churn drivers for AI engine
  predictionStore.fetchChurnDrivers()
  snapshotStore.fetchAvailable()
})

/** Absolute CLV (ZMW) for the "CLV (ZMW)" column — never the percentile. */
function clvCell(customerId) {
  const v = predictionStore.predictions[customerId]?.clv
  return v == null ? '--' : Number(v).toLocaleString()
}

async function onSnapshotChange() {
  snapshotStore.setDate(snapshotStore.selectedDate)
  await customerStore.fetchPortfolio({ as_of_date: snapshotStore.asOfDate })
  ledgerPage.value = 1
}

// Donut chart: State Distribution (6-state)
const donutChartData = computed(() => ({
  labels: ['New', 'Active', 'Growing', 'At Risk', 'Dormant', 'Churned'],
  datasets: [{
    data: [
      customerStore.portfolio.active,  // NOTE: backend may not return all states yet
      0,  // NEW — pending backend enrichment
      0,  // GROWING — pending backend enrichment
      customerStore.portfolio.atRisk,
      customerStore.portfolio.dormant,
      customerStore.portfolio.churned,
    ],
    backgroundColor: ['#16a34a', '#16a34a', '#16a34a', '#b45309', '#7f1d1d', '#7f1d1d'],
    borderWidth: 0,
  }]
}))

const donutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } },
}

// Bar chart: Health Score Distribution (computed from customer data)
const healthScoreHistogram = computed(() => {
  const bins = [0, 0, 0, 0, 0]  // 0-20, 21-40, 41-60, 61-80, 81-100
  customerStore.customers.forEach(c => {
    const h = c.healthScore
    if (h == null) return
    if (h <= 20) bins[0]++
    else if (h <= 40) bins[1]++
    else if (h <= 60) bins[2]++
    else if (h <= 80) bins[3]++
    else bins[4]++
  })
  return bins
})

const histogramChartData = computed(() => ({
  labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
  datasets: [{
    label: 'Customers',
    data: healthScoreHistogram.value,
    backgroundColor: '#7f1d1d',
    borderRadius: 4,
  }]
}))

const histogramChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
}

const totalCustomersSparkline = ref([])

// Ledger pagination + filter
const ledgerPage = ref(1)
const ledgerPageSize = 5
const ledgerAtRiskOnly = ref(false)
const ledgerMarketSegment = ref('')
const searchText = ref('')
const marketSegmentOptions = MARKET_SEGMENT_OPTIONS

// Filterable, pageable ledger rows (churn risk only when filter active)
const ledgerFiltered = computed(() => {
  let rows = customerStore.customers || []
  if (ledgerAtRiskOnly.value) {
    rows = rows.filter(c => {
      const p = predictionStore.getChurnProbability(c.customerId)
      return p != null && p > 0.5
    })
  }
  if (ledgerMarketSegment.value) {
    rows = rows.filter((customer) => (
      ledgerMarketSegment.value === 'other'
        ? customer.marketSegment === null
        : customer.marketSegment === Number(ledgerMarketSegment.value)
    ))
  }
  const q = (searchText.value || '').trim().toLowerCase()
  if (q) {
    rows = rows.filter(c =>
      (c.fullName || '').toLowerCase().includes(q) ||
      (c.customerId || '').toLowerCase().includes(q) ||
      (c.state || '').toLowerCase().includes(q)
    )
  }
  return rows
})

// A ledger filter (risk / segment / search) narrows the rows we hold, so once one
// is active the honest denominator is the filtered count. With no filter the
// denominator is the real portfolio size from the server — never the size of the
// fetched page, which is capped at 500 rows and previously masqueraded as the
// portfolio total.
const ledgerHasFilter = computed(() =>
  ledgerAtRiskOnly.value || !!ledgerMarketSegment.value || !!(searchText.value || '').trim()
)
const ledgerHeld = computed(() => ledgerFiltered.value.length)
const ledgerTotal = computed(() =>
  ledgerHasFilter.value ? ledgerHeld.value : (customerStore.pagination.total || ledgerHeld.value)
)
// Paging is over the rows we actually hold, so "Next" can never land on an empty page.
const ledgerTotalPages = computed(() => Math.max(1, Math.ceil(ledgerHeld.value / ledgerPageSize)))
const ledgerRows = computed(() => ledgerFiltered.value.slice((ledgerPage.value - 1) * ledgerPageSize, ledgerPage.value * ledgerPageSize))
const ledgerStart = computed(() => ledgerHeld.value === 0 ? 0 : (ledgerPage.value - 1) * ledgerPageSize + 1)
const ledgerEnd = computed(() => Math.min(ledgerPage.value * ledgerPageSize, ledgerHeld.value))
// True when the portfolio is larger than what this session loaded.
const ledgerWindowed = computed(() => !ledgerHasFilter.value && ledgerHeld.value < ledgerTotal.value)

function toggleLedgerFilter() {
  ledgerAtRiskOnly.value = !ledgerAtRiskOnly.value
  ledgerPage.value = 1
  notify(ledgerAtRiskOnly.value ? 'Filter: showing at-risk customers only' : 'Filter cleared — showing all customers', 'info', { autoClose: 2000 })
}

function exportLedgerCsv() {
  const rows = ledgerFiltered.value.map(c => ({
    customerId: c.customerId,
    fullName: c.fullName,
      state: c.state,
      marketSegment: c.marketSegment ?? '',
      segmentCode: c.segmentCode,
      segmentLabel: c.segmentLabel,
    healthScore: c.healthScore ?? '',
    churnProbabilityPct: predictionStore.getChurnProbability(c.customerId) != null
      ? Math.round(predictionStore.getChurnProbability(c.customerId) * 100) + '%'
      : '',
    clv: predictionStore.predictions[c.customerId]?.clv ?? '',
    clvPercentile: predictionStore.predictions[c.customerId]?.clv_percentile != null
      ? Math.round(predictionStore.predictions[c.customerId].clv_percentile * 100)
      : '',
  }))
  if (!rows.length) {
    notify('Nothing to export — no customers in the ledger', 'error', { autoClose: 3000 })
    return
  }
  downloadCsv(reportFilename(`portfolio-ledger${ledgerAtRiskOnly.value ? '-at-risk' : ''}`), rows, ['customerId', 'fullName', 'state', 'marketSegment', 'segmentCode', 'segmentLabel', 'healthScore', 'churnProbabilityPct', 'clv', 'clvPercentile'])
  notify(`Exported ${rows.length} customers to CSV`, 'success', { autoClose: 2500 })
}

// Critical Alerts — derived from live prediction + portfolio data
const alerts = computed(() => {
  const list = []
  const unseen = (alert) => {
    if (!alert.id) return true
    return !isAlertAcked(alert.customerId || 'portfolio', alert.id)
  }

  // 1. High churn risk customers (churn_probability > 60%)
  const highRisk = Object.entries(predictionStore.predictions)
    .filter(([, p]) => p.churn_probability > 0.6)
    .map(([id, p]) => ({
      id: `churn-${id}`,
      customerId: id,
      name: id,
      time: `${Math.round(p.churn_probability * 100)}% risk`,
      title: 'High Churn Probability',
      titleColorClass: 'text-absa-passion',
      description: `Customer ${id.replace('CUST', '')} has a ${Math.round(p.churn_probability * 100)}% likelihood of churning within 90 days.`,
      actionable: true,
      buttonClass: 'bg-absa-passion text-white hover:bg-red-900',
    }))
  list.push(...highRisk.slice(0, 3))

  // 2. Portfolio-level: Dormancy is the dominant state
  if (customerStore.portfolio.dormantPct > 40) {
    list.push({
      id: 'dormancy',
      customerId: 'portfolio',
      name: 'Portfolio Dormancy',
      time: `${customerStore.portfolio.dormantPct}%`,
      title: 'Dormancy Dominant',
      titleColorClass: 'text-red-900',
      description: `${customerStore.portfolio.dormant.toLocaleString()} customers (${customerStore.portfolio.dormantPct}%) are dormant — proactive outreach recommended.`,
      actionable: false,
      buttonClass: '',
    })
  }

  // 3. Top churn driver alert
  const topDriver = predictionStore.churnDrivers[0]
  if (topDriver && topDriver.contribution_pct > 30) {
    list.push({
      id: 'top-driver',
      customerId: 'portfolio',
      name: 'Top Churn Driver',
      time: `${topDriver.contribution_pct}%`,
      title: topDriver.driver_name,
      titleColorClass: 'text-amber-700',
      description: `Affects ${topDriver.affected_customer_count.toLocaleString()} customers — ${topDriver.contribution_pct}% contribution to churn.`,
      actionable: true,
      buttonClass: 'bg-[#FF780F] text-white hover:bg-[#E06A00]',
    })
  }

  return list.filter(unseen)
})

const acknowledgeAlert = (alertIndex) => {
  const alert = alerts.value[alertIndex]
  if (!alert) return
  persistAck(alert.customerId || 'portfolio', alert.id)
  notify(`Alert acknowledged — ${alert.title || alert.name}`, 'success', { autoClose: 2500 })
}

// ── Recent RM Activity ───────────────────────────────────────────────────────
const activityRows = ref([])

const recentActivity = computed(() => activityRows.value.slice(0, 8))

const ACTION_META = {
  RM_ASSIGNED:         { label: 'RM Assigned',         icon: 'person_add',      cls: 'bg-absa-passion/10 text-absa-passion' },
  RM_CONTACTED:        { label: 'RM Contacted',        icon: 'call',            cls: 'bg-absa-passion/10 text-absa-passion' },
  CAMPAIGN_ENROLLED:   { label: 'Campaign Enrolled',   icon: 'campaign',        cls: 'bg-amber-100 text-amber-700' },
  CAMPAIGN_LAUNCHED:   { label: 'Campaign Launched',   icon: 'rocket_launch',   cls: 'bg-absa-passion/10 text-absa-passion' },
  ALERT_ACKNOWLEDGED:  { label: 'Alert Acknowledged', icon: 'notifications_off', cls: 'bg-gray-100 text-gray-600' },
  NBA_OVERRIDE:        { label: 'NBA Override',        icon: 'edit',            cls: 'bg-red-100 text-absa-inspire' },
  ACTION_PLAN_CREATED: { label: 'Action Plan Created', icon: 'checklist',       cls: 'bg-absa-passion/10 text-absa-passion' },
  ACTION_RECORDED:     { label: 'Action Recorded',     icon: 'task_alt',        cls: 'bg-green-100 text-green-700' },
  BULK_ACTION:         { label: 'Bulk Action',         icon: 'select_all',      cls: 'bg-gray-100 text-gray-600' },
}

function actionLabel(type) {
  return ACTION_META[type]?.label || String(type || 'ACTION').replace(/_/g, ' ')
}
function actionIcon(type) {
  return ACTION_META[type]?.icon || 'check'
}
function actionBadgeClass(type) {
  return ACTION_META[type]?.cls || 'bg-gray-100 text-gray-600'
}

function fmtActivityTime(t) {
  if (!t) return '—'
  try { return new Date(t).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch { return t }
}

async function refreshActivity() {
  await hydrateLogFromServer(50)
  activityRows.value = getActionLog().map((a) => ({ ...a, key: a.serverId || a.id }))
}

onMounted(async () => {
  // Fetch the shared action log (local + server) for Recent RM Activity.
  // Portfolio + predictions are fetched by the primary onMounted above.
  refreshActivity()
})
</script>





