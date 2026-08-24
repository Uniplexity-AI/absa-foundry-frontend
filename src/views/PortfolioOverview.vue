<template>
  <div class="w-full pt-6 px-6 pb-6">
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
          <select v-model="selectedSnapshot" @change="onSnapshotChange" class="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-absa-passion focus:border-absa-passion sm:text-sm rounded-sm bg-white font-mono text-absa-enrich border">
            <option v-for="option in snapshotOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <!-- Top Stats Row -->
      <div class="grid grid-cols-4 gap-4 md:gap-4 mb-8">
        <!-- Total Customers -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 mb-6">
          <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Total Customers</h3>
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-2xl font-bold font-mono text-absa-enrich">{{ customerStore.portfolio.total.toLocaleString() || '—' }}</span>
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
              <span class="text-2xl font-bold font-mono text-amber-700">{{ customerStore.portfolio.atRisk.toLocaleString() || '—' }}</span>
              <span class="text-xs text-gray-500">| {{ customerStore.portfolio.atRiskPct }}%</span>
            </div>
            <p class="text-xs text-gray-500 mt-auto">+4 since last snapshot</p>
        </div>

        <!-- Dormant -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 mb-6">
            <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Dormant</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-2xl font-bold font-mono text-red-900">{{ customerStore.portfolio.dormant.toLocaleString() || '—' }}</span>
              <span class="text-xs text-gray-500">| {{ customerStore.portfolio.dormantPct }}%</span>
            </div>
            <p class="text-xs text-gray-500 mt-auto">Stable across 3 periods</p>
        </div>

        <!-- Churned -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 mb-6">
            <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Churned</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-2xl font-bold font-mono text-red-900">{{ customerStore.portfolio.churned.toLocaleString() || '—' }}</span>
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
                  <button class="p-1.5 border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                  </button>
                  <button class="p-1.5 border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50">
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
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Health ↑</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Churn Prob</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">CLV (ZMW)</th>
                      <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-100">
                    <tr v-if="customerStore.customers.length === 0">
                      <td colspan="6" class="p-12 text-center text-xs text-gray-500">No customer data available</td>
                    </tr>
                    <tr v-for="customer in customerStore.customers.slice((ledgerPage - 1) * 5, ledgerPage * 5)" :key="customer.customerId">
                      <td class="px-3 py-1.5 whitespace-nowrap">
                        <div>
                            <router-link :to="`/dashboard/customer/${encodeURIComponent(customer.customerId)}`" class="text-xs font-bold text-absa-enrich hover:text-absa-passion transition-colors">{{ customer.fullName }}</router-link>
                            <div class="text-[11px] text-gray-500 font-mono mt-0.5">ID: {{ customer.customerId }}</div>
                          </div>
                      </td>
                      <td class="px-3 py-1.5 whitespace-nowrap">
                        <span class="text-xs">{{ customer.state }}</span>
                      </td>
                      <td class="px-3 py-1.5 whitespace-nowrap">
                        <div class="text-xs font-bold font-mono text-absa-enrich mb-1">{{ customer.healthScore ?? '--' }}</div>
                        <div class="progress-bar-container">
                          <div class="progress-bar-fill bg-red-900" :style="{ width: (customer.healthScore ?? 0) + '%' }"></div>
                        </div>
                      </td>
                      <td class="px-3 py-1.5 whitespace-nowrap text-xs font-bold">
                        {{ predictionStore.getChurnProbability(customer.customerId) != null ? Math.round(predictionStore.getChurnProbability(customer.customerId) * 100) + '%' : '--' }}
                      </td>
                      <td class="px-3 py-1.5 whitespace-nowrap text-xs">{{ predictionStore.predictions[customer.customerId]?.clv_percentile != null ? 'P' + (predictionStore.predictions[customer.customerId].clv_percentile * 100).toFixed(0) : '--' }}</td>
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
                <span class="text-xs text-gray-500">Showing {{ ledgerStart }}-{{ ledgerEnd }} of {{ customerStore.pagination.total }} customers</span>
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

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()
const route = useRoute()

onMounted(async () => {
  await customerStore.fetchPortfolio()
  ledgerPage.value = parseInt(route.query.page) || 1
  // Batch-fetch predictions for visible customers
  const ids = customerStore.customers.slice(0, 50).map(c => c.customerId)
  predictionStore.fetchBatchPredictions(ids, selectedSnapshot.value)
  // Fetch churn drivers for AI engine
  predictionStore.fetchChurnDrivers()
})

const selectedSnapshot = ref('2026-07-27')
const snapshotOptions = ref([])

// Generate last 30 days of snapshots centered on the default data date
function generateSnapshots() {
  const dates = []
  const base = new Date('2026-07-27')
  for (let i = 14; i >= -15; i--) {
    const d = new Date(base)
    d.setDate(d.getDate() + i)
    dates.push(d.toISOString().slice(0, 10))
  }
  snapshotOptions.value = dates
  selectedSnapshot.value = '2026-07-27'
}
generateSnapshots()

async function onSnapshotChange() {
  await customerStore.fetchPortfolio({ as_of_date: selectedSnapshot.value })
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

// Ledger pagination
const ledgerPage = ref(1)
const ledgerPageSize = 5
const ledgerTotalPages = computed(() => Math.max(1, Math.ceil(customerStore.customers.length / ledgerPageSize)))
const ledgerStart = computed(() => customerStore.customers.length === 0 ? 0 : (ledgerPage.value - 1) * ledgerPageSize + 1)
const ledgerEnd = computed(() => Math.min(ledgerPage.value * ledgerPageSize, customerStore.customers.length))

// Critical Alerts — derived from live prediction + portfolio data
const alerts = computed(() => {
  const list = []

  // 1. High churn risk customers (churn_probability > 60%)
  const highRisk = Object.entries(predictionStore.predictions)
    .filter(([, p]) => p.churn_probability > 0.6)
    .map(([id, p]) => ({
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
      name: 'Top Churn Driver',
      time: `${topDriver.contribution_pct}%`,
      title: topDriver.driver_name,
      titleColorClass: 'text-amber-700',
      description: `Affects ${topDriver.affected_customer_count.toLocaleString()} customers — ${topDriver.contribution_pct}% contribution to churn.`,
      actionable: true,
      buttonClass: 'bg-[#FF780F] text-white hover:bg-[#E06A00]',
    })
  }

  return list
})

const acknowledgeAlert = (index) => {
  // Alerts are computed from live data — mark as acknowledged by filtering
  // For now, this is a no-op since alerts auto-refresh from store data
}
</script>





