<template>
  <div class="global-mesh-bg text-on-background w-full p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pt-20">
    <!-- Loading Skeleton -->
    <template v-if="customerStore.loading">
      <div class="min-h-[calc(100vh-6rem)] flex flex-col">
        <div class="mb-8">
          <LoadingSkeleton type="stats" />
        </div>
        <div class="grid grid-cols-12 gap-4 md:gap-gutter flex-1 mb-8 min-h-0">
          <div class="col-span-12 lg:col-span-4">
            <div class="h-full"><LoadingSkeleton type="block" /></div>
          </div>
          <div class="col-span-12 lg:col-span-8">
            <div class="h-full"><LoadingSkeleton type="block" /></div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 md:gap-gutter">
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="card" />
        </div>
      </div>
    </template>

    <!-- Main Content -->
    <template v-else>
      <!-- Page Title & Snapshot -->
      <div class="mb-6 flex justify-end items-end">
        <div class="flex items-center gap-3">
          <span class="text-body-md text-secondary">Data Snapshot:</span>
          <select v-model="selectedSnapshot" @change="onSnapshotChange" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#DC0037] focus:border-[#DC0037] sm:text-sm rounded-md shadow-sm bg-white">
            <option v-for="option in snapshotOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <!-- Top Stats Row -->
      <div class="grid grid-cols-4 gap-4 md:gap-gutter mb-8">
        <!-- Total Customers -->
        <div class="card-container p-card-padding">
          <div class="card-content flex flex-col h-full justify-between">
            <h3 class="text-label-caps font-label-caps text-secondary uppercase mb-2">Total Customers</h3>
            <div class="flex items-baseline gap-2 mb-4">
              <span class="text-metric-lg font-metric-lg text-on-surface">{{ customerStore.portfolio.total.toLocaleString() || '—' }}</span>
              <span class="text-body-md font-body-md text-[#FF780F] font-semibold flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 10l7-7m0 0l7 7m-7-7v18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                {{ customerStore.portfolio.activePct }}% active
              </span>
            </div>
            <div class="flex items-end gap-1.5 h-12 mt-auto">
              <div v-if="totalCustomersSparkline.length === 0" class="w-full h-full flex items-center justify-center text-label-sm text-secondary">—</div>
              <div v-for="(h, i) in totalCustomersSparkline" :key="i" class="w-1/6 bg-primary rounded-t" :style="{ height: h + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- At Risk -->
        <div class="card-container p-card-padding">
          <div class="card-content flex flex-col h-full justify-between">
            <h3 class="text-label-caps font-label-caps text-secondary uppercase mb-2">At Risk</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-metric-lg font-metric-lg text-[#FF780F]">{{ customerStore.portfolio.atRisk.toLocaleString() || '—' }}</span>
              <span class="text-body-md font-body-md text-secondary">| {{ customerStore.portfolio.atRiskPct }}%</span>
            </div>
            <p class="text-body-md font-body-md text-secondary mt-auto">+4 since last snapshot</p>
          </div>
        </div>

        <!-- Dormant -->
        <div class="card-container p-card-padding">
          <div class="card-content flex flex-col h-full justify-between">
            <h3 class="text-label-caps font-label-caps text-secondary uppercase mb-2">Dormant</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-metric-lg font-metric-lg text-[#B50232]">{{ customerStore.portfolio.dormant.toLocaleString() || '—' }}</span>
              <span class="text-body-md font-body-md text-secondary">| {{ customerStore.portfolio.dormantPct }}%</span>
            </div>
            <p class="text-body-md font-body-md text-secondary mt-auto">Stable across 3 periods</p>
          </div>
        </div>

        <!-- Churned -->
        <div class="card-container p-card-padding">
          <div class="card-content flex flex-col h-full justify-between">
            <h3 class="text-label-caps font-label-caps text-secondary uppercase mb-2">Churned</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-metric-lg font-metric-lg text-[#DC0037]">{{ customerStore.portfolio.churned.toLocaleString() || '—' }}</span>
              <span class="text-body-md font-body-md text-secondary">| {{ customerStore.portfolio.churnedPct }}%</span>
            </div>
            <p class="text-body-md font-body-md text-secondary mt-auto">Last 90 days</p>
          </div>
        </div>
      </div>

      <!-- Charts Row: Donut + Histogram -->
      <div class="grid grid-cols-12 gap-4 md:gap-gutter mb-8">
        <div class="col-span-12 lg:col-span-5 card-container p-card-padding">
          <h3 class="text-label-caps font-label-caps text-secondary uppercase mb-4">State Distribution</h3>
          <div class="h-64">
            <Doughnut :data="donutChartData" :options="donutChartOptions" />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-7 card-container p-card-padding">
          <h3 class="text-label-caps font-label-caps text-secondary uppercase mb-4">Health Score Distribution</h3>
          <div class="h-64">
            <Bar :data="histogramChartData" :options="histogramChartOptions" />
          </div>
        </div>
      </div>

      <!-- Main Grid Layout -->
      <div class="grid grid-cols-12 gap-4 md:gap-gutter">
        <!-- Left Column: Critical Alerts -->
        <div class="col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-gutter overflow-y-auto">
          <div class="card-container flex flex-col h-[500px]">
            <div class="card-content border-b border-gray-200 p-4 flex justify-between items-center bg-white z-10">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-[#DC0037]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                <h3 class="text-headline-md font-headline-md">Critical Alerts</h3>
              </div>
              <span class="text-label-sm font-label-sm text-[#DC0037]">
                {{ alerts.length }} NEW
              </span>
            </div>
            <div class="card-content flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              <div v-if="alerts.length === 0" class="text-body-md text-secondary text-center py-8">No critical alerts</div>
              <!-- Alerts List -->
              <div 
                v-for="(alert, index) in alerts" 
                :key="index" 
                class="py-1"
              >
                <div class="flex justify-between items-start mb-1">
                  <h4 class="font-bold text-body-md text-on-surface">{{ alert.name }}</h4>
                  <span class="text-label-sm text-secondary">{{ alert.time }}</span>
                </div>
                <p :class="['text-body-md font-bold mb-1', alert.titleColorClass]">{{ alert.title }}</p>
                <p class="text-body-md text-secondary mb-3">{{ alert.description }}</p>
                <button 
                  v-if="alert.actionable" 
                  :class="[
                    'w-full text-body-md font-bold py-2 px-4 rounded shadow-sm transition-colors',
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
          <div class="card-container h-[500px]">
            <div class="card-content h-full flex flex-col">
              <div class="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                <h3 class="text-headline-md font-headline-md">Predictive Lifecycle Ledger</h3>
                <div class="flex gap-2">
                  <button class="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                  </button>
                  <button class="p-1.5 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto flex-1">
                <table class="min-w-full divide-y divide-outline-variant">
                  <thead>
                    <tr class="border-b border-outline-variant bg-white">
                      <th class="p-4 text-label-caps font-label-caps text-on-surface" scope="col">Name</th>
                      <th class="p-4 text-label-caps font-label-caps text-on-surface" scope="col">State</th>
                      <th class="p-4 text-label-caps font-label-caps text-on-surface" scope="col">Health ↑</th>
                      <th class="p-4 text-label-caps font-label-caps text-on-surface" scope="col">Churn Prob</th>
                      <th class="p-4 text-label-caps font-label-caps text-on-surface" scope="col">CLV (ZMW)</th>
                      <th class="p-4 text-label-caps font-label-caps text-on-surface" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-outline-variant">
                    <tr v-if="customerStore.customers.length === 0">
                      <td colspan="6" class="p-12 text-center text-body-md text-secondary">No customer data available</td>
                    </tr>
                    <tr v-for="customer in customerStore.customers.slice((ledgerPage - 1) * 5, ledgerPage * 5)" :key="customer.customerId">
                      <td class="p-4 whitespace-nowrap">
                        <div>
                            <router-link :to="`/dashboard/customer/${encodeURIComponent(customer.customerId)}`" class="font-bold text-body-md text-on-surface hover:text-[#DC0037] transition-colors">{{ customer.fullName }}</router-link>
                            <div class="text-label-sm text-secondary">ID: {{ customer.customerId }}</div>
                          </div>
                      </td>
                      <td class="p-4 whitespace-nowrap">
                        <span class="text-body-md">{{ customer.state }}</span>
                      </td>
                      <td class="p-4 whitespace-nowrap">
                        <div class="text-body-md font-bold mb-1">{{ customer.healthScore ?? '--' }}</div>
                        <div class="progress-bar-container">
                          <div class="progress-bar-fill bg-[#B50232]" :style="{ width: (customer.healthScore ?? 0) + '%' }"></div>
                        </div>
                      </td>
                      <td class="p-4 whitespace-nowrap text-body-md font-bold">
                        {{ predictionStore.getChurnProbability(customer.customerId) != null ? Math.round(predictionStore.getChurnProbability(customer.customerId) * 100) + '%' : '--' }}
                      </td>
                      <td class="p-4 whitespace-nowrap text-body-md">{{ predictionStore.predictions[customer.customerId]?.clv_percentile != null ? 'P' + (predictionStore.predictions[customer.customerId].clv_percentile * 100).toFixed(0) : '--' }}</td>
                      <td class="p-4 whitespace-nowrap">
                        <button class="text-body-md font-bold py-1.5 px-3 rounded shadow-sm transition-colors w-full bg-[#DC0037] text-white">
                          REVIEW
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Pagination -->
              <div class="p-4 border-t border-gray-200 bg-white flex items-center justify-between mt-auto">
                <span class="text-body-md text-secondary">Showing {{ ledgerStart }}-{{ ledgerEnd }} of {{ customerStore.pagination.total }} customers</span>
                <div class="flex gap-2">
                  <button @click="ledgerPage--" :disabled="ledgerPage <= 1" :class="['px-3 py-1 border border-gray-300 rounded text-body-md', ledgerPage <= 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-secondary hover:bg-gray-50']">Previous</button>
                  <button @click="ledgerPage++" :disabled="ledgerPage >= ledgerTotalPages" :class="['px-3 py-1 border border-gray-300 rounded text-body-md', ledgerPage >= ledgerTotalPages ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-on-surface hover:bg-gray-50']">Next</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Row: AI & Trend -->
      <div class="grid grid-cols-2 gap-4 md:gap-gutter mt-8">
        <!-- AI Recommendation -->
        <div class="rounded p-6 flex flex-col relative overflow-hidden shadow-lg text-white min-h-[200px]" style="background: linear-gradient(135deg, #95052A 0%, #131010 50%, #000000 100%);">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div class="relative z-10">
            <h3 class="text-label-caps font-label-caps uppercase text-white mb-4">AI Churn Intelligence</h3>
            <div v-if="predictionStore.churnDrivers.length > 0" class="space-y-2">
              <div v-for="d in predictionStore.churnDrivers.slice(0, 3)" :key="d.rank" class="flex justify-between items-center">
                <span class="text-body-sm text-white/70 truncate mr-2">{{ d.driver_name }}</span>
                <span class="text-body-sm font-bold text-white whitespace-nowrap">{{ d.contribution_pct }}% <span class="text-white/50 font-normal">({{ d.affected_customer_count.toLocaleString() }})</span></span>
              </div>
            </div>
            <p v-else class="text-body-md text-white/80 leading-relaxed">Churn intelligence data will appear here once computed.</p>
          </div>
        </div>

        <!-- Portfolio Health Trend -->
        <div class="card-container p-6 flex items-center min-h-[200px]">
          <div class="card-content flex gap-4 items-start w-full">
            <div class="flex-shrink-0 w-12 h-16 bg-[#FF780F]/10 rounded-md flex items-center justify-center">
              <svg class="w-6 h-6 text-[#FF780F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-headline-md font-headline-md mb-2">Portfolio Health Trend</h3>
              <p class="text-body-md text-secondary leading-relaxed">
                <strong class="text-on-surface font-bold">{{ customerStore.portfolio.total.toLocaleString() }}</strong> customers tracked.
                <strong v-if="customerStore.portfolio.atRiskPct > 0" class="text-[#DC0037]">{{ customerStore.portfolio.atRiskPct }}% at risk</strong>,
                <strong v-if="customerStore.portfolio.dormantPct > 0" class="text-[#B50232]">{{ customerStore.portfolio.dormantPct }}% dormant</strong>,
                <strong v-if="customerStore.portfolio.churnedPct > 0" class="text-on-surface">{{ customerStore.portfolio.churnedPct }}% churned</strong>.
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
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()

onMounted(async () => {
  await customerStore.fetchPortfolio()
  ledgerPage.value = 1
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
    backgroundColor: ['#4CAF50', '#FF780F', '#2196F3', '#DC0037', '#B50232', '#77021E'],
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
    backgroundColor: '#B50232',
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
      titleColorClass: 'text-[#DC0037]',
      description: `Customer ${id.replace('CUST', '')} has a ${Math.round(p.churn_probability * 100)}% likelihood of churning within 90 days.`,
      actionable: true,
      buttonClass: 'bg-[#DC0037] text-white hover:bg-[#B50232]',
    }))
  list.push(...highRisk.slice(0, 3))

  // 2. Portfolio-level: Dormancy is the dominant state
  if (customerStore.portfolio.dormantPct > 40) {
    list.push({
      name: 'Portfolio Dormancy',
      time: `${customerStore.portfolio.dormantPct}%`,
      title: 'Dormancy Dominant',
      titleColorClass: 'text-[#B50232]',
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
      titleColorClass: 'text-[#FF780F]',
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap');

body {
  background-color: #fbf9f8;
  color: #1a1a1a;
  font-family: 'Hanken Grotesk', sans-serif;
}

.rounded-custom {
  border-radius: 0.25rem;
}

.bg-grid {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h18v18H1V1zm1 1v16h16V2H2z' fill='%23e5e7eb' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}

.bg-ai-gradient {
  background-image: linear-gradient(135deg, #7c001b 0%, #1a0006 100%);
}

.card-container {
  background-color: #ffffff;
  background-image: radial-gradient(circle, #f3f4f6 1.5px, transparent 1.5px);
  background-size: 14px 14px;
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-content {
  position: relative;
  z-index: 1;
}

.progress-bar-container {
  width: 100px;
  height: 6px;
  background-color: #e5e5e5;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ccc; 
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #999; 
}
</style>