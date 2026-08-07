<template>
  <div class="min-h-screen bg-[#f8f9fa]">
    <div class="max-w-[1600px] mx-auto p-8 flex flex-col gap-8">
      <!-- Breadcrumbs + Period Selector -->
      <div class="flex items-end justify-between w-full">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-0">
            <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">Home</span>
            <svg class="mx-1" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">Dashboard</span>
          </div>
          <h1 class="text-[#191c1d] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">Portfolio Overview</h1>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Data Snapshot:</span>
          <div class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[4px] flex items-center gap-2 px-[17px] py-[9px]">
            <span class="text-[#191c1d] text-[14px] font-semibold">Latest (July 20, 2026)</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#191c1d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- KPI Cards (reactive) -->
      <LoadingSkeleton v-if="pageLoading" type="stats" />
      <div v-else class="flex gap-6 w-full">
        <!-- Total Customers -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">TOTAL CUSTOMERS</span>
          <div v-if="customerStore.loading" class="h-10">
            <div class="h-8 w-20 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div v-else class="relative h-10 w-full">
            <span class="text-[#191c1d] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">{{ customerStore.portfolio.total.toLocaleString() }}</span>
          </div>
        </div>

        <!-- At Risk -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] pb-[41px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">AT RISK</span>
          <div v-if="customerStore.loading" class="h-10">
            <div class="h-8 w-16 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div v-else class="flex items-baseline gap-2">
            <span class="text-[#ed6c02] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">{{ customerStore.portfolio.atRisk }}</span>
            <span class="text-[#5d3f3f] text-[12px] font-medium opacity-60 tracking-[0.6px] leading-[16px]">| {{ customerStore.portfolio.atRiskPct }}%</span>
          </div>
        </div>

        <!-- Dormant -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] pb-[41px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">DORMANT</span>
          <div v-if="customerStore.loading" class="h-10">
            <div class="h-8 w-16 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div v-else class="flex items-baseline gap-2">
            <span class="text-[#757575] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">{{ customerStore.portfolio.dormant }}</span>
            <span class="text-[#5d3f3f] text-[12px] font-medium opacity-60 tracking-[0.6px] leading-[16px]">| {{ customerStore.portfolio.dormantPct }}%</span>
          </div>
        </div>

        <!-- Actions Due Today -->
        <div class="flex-1 bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] p-[25px] pb-[38px] flex flex-col">
          <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] uppercase leading-[16px] pb-2">ACTIONS DUE TODAY</span>
          <div v-if="customerStore.loading" class="h-10">
            <div class="h-8 w-12 bg-gray-100 rounded animate-pulse"></div>
          </div>
          <div v-else class="flex items-baseline">
            <span class="text-[#dc0037] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">{{ customerStore.portfolio.actionsDue }}</span>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <LoadingSkeleton v-if="pageLoading" type="block" />
      <div v-else class="flex gap-6 w-full" style="min-height: 320px">
        <div class="bg-white border border-[#e7bcbc] rounded-[6px] p-6 flex flex-col" style="width: 40%">
          <h3 class="text-[#191c1d] text-lg font-bold mb-4">State Distribution</h3>
          <div class="flex-1 flex items-center justify-center">
            <Doughnut :data="doughnutData" :options="chartOptions" />
          </div>
        </div>
        <div class="bg-white border border-[#e7bcbc] rounded-[6px] p-6 flex flex-col" style="width: 60%">
          <h3 class="text-[#191c1d] text-lg font-bold mb-4">Health Score Distribution</h3>
          <div class="flex-1 flex items-center justify-center">
            <Bar :data="histogramData" :options="chartOptions" />
          </div>
        </div>
      </div>

      <div v-if="customerStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
        <span class="text-red-700 text-sm font-medium">Could not load portfolio data</span>
        <button @click="customerStore.fetchPortfolio()" class="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200 font-medium">Retry</button>
      </div>

      <!-- Two-column grid: Alerts + Table -->
      <div class="grid grid-cols-3 gap-6 w-full" style="grid-template-rows: 500px">
        <!-- Critical Alerts -->
        <LoadingSkeleton v-if="pageLoading" type="card" />
        <div v-else class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[6px] flex flex-col h-[500px] overflow-hidden p-px col-span-1">
          <div class="border-b border-[#e7bcbc] px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M10 0L20 16H0L10 0z" fill="#dc0037" opacity="0.8"/>
                <rect x="9" y="5" width="2" height="5" fill="white"/>
                <rect x="9" y="11" width="2" height="2" fill="white"/>
              </svg>
              <h3 class="text-[#191c1d] text-[18px] font-bold leading-[28px]">Critical Alerts</h3>
            </div>
            <span class="bg-[#dc0037] text-white text-[10px] font-bold px-2 py-0.5 rounded-[12px] leading-[15px]">5 NEW</span>
          </div>
          <div class="flex-1 overflow-auto relative">
            <div class="p-6 text-center text-sm text-gray-400">
              Alerts surface when risk thresholds are crossed.
            </div>
          </div>
        </div>

        <!-- Predictive Lifecycle Ledger -->
        <LoadingSkeleton v-if="pageLoading" type="table" :count="5" />
        <div v-else class="bg-white border border-[#e7bcbc] rounded-[6px] flex flex-col h-[500px] overflow-hidden p-px col-span-2">
          <div class="bg-white border-b border-[#e7bcbc] px-6 py-4 flex items-center justify-between">
            <h3 class="text-[#191c1d] text-[18px] font-bold leading-[28px]">Predictive Lifecycle Ledger</h3>
            <div class="flex gap-2">
              <button class="border border-[#e7bcbc] rounded-[2px] p-[7px] pb-[11px] flex items-center justify-center">
                <svg width="10.5" height="7" viewBox="0 0 10.5 7" fill="none">
                  <path d="M0 0h10.5v1.5H0zM0 6h10.5v1H0z" fill="#5d3f3f"/>
                </svg>
              </button>
              <button class="border border-[#e7bcbc] rounded-[2px] p-[7px] pb-[11px] flex items-center justify-center">
                <svg width="9.333" height="9.333" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="1.5" fill="#5d3f3f"/>
                  <circle cx="5" cy="1" r="1.5" fill="#5d3f3f"/>
                  <circle cx="5" cy="9" r="1.5" fill="#5d3f3f"/>
                  <circle cx="1" cy="5" r="1.5" fill="#5d3f3f"/>
                  <circle cx="9" cy="5" r="1.5" fill="#5d3f3f"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-[#e7e8e9]">
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">NAME</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">STATE</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">
                    <span class="flex items-center gap-1">
                      HEALTH
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="3.5" fill="#5d3f3f" opacity="0.5"/>
                        <path d="M4 2v2.5M4 5.5v.5" stroke="white" stroke-width="0.8"/>
                      </svg>
                    </span>
                  </th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">CHURN<br/>PROB</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">CLV<br/>(ZMW)</th>
                  <th class="text-[#5d3f3f] text-xs font-bold tracking-[0.5791px] uppercase text-left px-5 py-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in customerStore.customers.slice(0, 5)" :key="row.customerId" class="border-t border-[#e7bcbc]">
                  <td class="pl-5 py-3">
                    <div class="flex gap-3 items-center">
                      <div class="w-1 h-8 rounded-full"
                        :style="{ backgroundColor: row.state === 'CHURNED' ? '#dc0037' : row.state === 'AT_RISK' ? '#ed6c02' : row.state === 'DORMANT' ? '#757575' : '#2e7d32' }"></div>
                      <div>
                        <div class="text-[#191c1d] text-sm font-bold leading-5">{{ row.fullName }}</div>
                        <div class="text-[#5d3f3f] text-xs font-normal">ID: {{ row.customerId }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="pl-8 py-3">
                    <StateBadge :state="row.state" size="sm" />
                  </td>
                  <td class="px-5 py-3">
                    <div class="w-24">
                      <span class="text-[#191c1d] text-xs font-normal">{{ row.healthScore || '--' }}%</span>
                      <div class="bg-[#e1e3e4] h-1.5 rounded w-full mt-1">
                        <div class="h-full rounded" :style="{ width: (row.healthScore || 0) + '%', backgroundColor: (row.healthScore || 0) >= 70 ? '#2e7d32' : (row.healthScore || 0) >= 40 ? '#ed6c02' : '#dc0037' }"></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-xs font-bold" :style="{ color: (row.churnProbability || 0) > 0.6 ? '#dc0037' : (row.churnProbability || 0) > 0.3 ? '#ed6c02' : '#2e7d32' }">{{ row.churnProbability ? Math.round(row.churnProbability * 100) + '%' : '--' }}</span>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#191c1d] text-xs font-medium">{{ row.clv ? (row.clv / 1000).toFixed(1) + 'K' : '--' }}</span>
                  </td>
                  <td class="px-5 py-3">
                    <span class="text-[#5d3f3f] text-xs font-medium">{{ row.state === 'AT_RISK' ? 'REVIEW' : row.state === 'CHURNED' ? 'RETENTION' : row.state === 'DORMANT' ? 'KYC' : 'UPSELL' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="border-t border-[#e7bcbc] px-4 py-4 flex items-center justify-between">
            <span class="text-[#5d3f3f] text-[12px] font-medium leading-[16px]">Showing {{ Math.min(customerStore.customers.length, 5) }} of {{ customerStore.pagination.total }} customers</span>
            <div class="flex gap-2">
              <button class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[2px] px-[9px] py-[5px] opacity-50 text-[#5d3f3f] text-[12px] font-medium leading-[16px]">Previous</button>
              <button class="bg-[#f8f9fa] border border-[#e7bcbc] rounded-[2px] px-[9px] py-[5px] text-[#5d3f3f] text-[12px] font-medium leading-[16px]">Next</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contextual Insight Footer -->
      <div class="flex gap-6 w-full">
        <!-- AI Recommendation -->
        <div class="flex-1 border border-[#e7bcbc] rounded-[6px] p-[25px] flex gap-6 items-start" style="background-image: url(&quot;data:image/svg+xml;utf8,<svg viewBox='0 0 466 132' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><g transform='matrix(43.196 12.143 -42.868 17.711 34.042 10.57)' opacity='1'><rect height='44.318' width='107.39' fill='url(%23grad)' id='quad' shape-rendering='crispEdges'/><use href='%23quad' transform='scale(1 -1)'/><use href='%23quad' transform='scale(-1 1)'/><use href='%23quad' transform='scale(-1 -1)'/></g><defs><linearGradient id='grad' gradientUnits='userSpaceOnUse' x2='5' y2='5'><stop stop-color='rgba(220,35,55,1)' offset='0'/><stop stop-color='rgba(169,25,42,1)' offset='0.19952'/><stop stop-color='rgba(118,14,29,1)' offset='0.39904'/><stop stop-color='rgba(68,15,23,1)' offset='0.69952'/><stop stop-color='rgba(43,16,19,1)' offset='0.84976'/><stop stop-color='rgba(18,16,16,1)' offset='1'/></linearGradient></defs></svg>&quot;); background-repeat: no-repeat; background-position: center;">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="white" stroke-width="1.5" opacity="0.8"/>
            <path d="M11 7v4M11 14v1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="flex flex-col gap-[3px]">
            <h4 class="text-white text-[14px] font-bold leading-[20px]">AI Recommendation Engine</h4>
            <p class="text-white text-[12px] font-normal leading-[19.5px]">
              System predicts risk patterns across portfolio segments based on real-time transaction data and behavioral scoring.
            </p>
          </div>
        </div>
        <!-- Portfolio Health Trend -->
        <div class="flex-1 bg-[#f3f4f5] border border-[#e7bcbc] rounded-[6px] p-[25px] flex gap-6 items-center">
          <div class="bg-[rgba(46,125,50,0.1)] h-16 w-[30px] rounded-[12px] flex items-center justify-center">
            <svg width="25" height="15" viewBox="0 0 25 15" fill="none">
              <path d="M0 12l6-6 5 4 8-8 6 6" stroke="#2e7d32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <circle cx="19" cy="2" r="2" fill="#2e7d32"/>
            </svg>
          </div>
          <div class="flex flex-col gap-[3px]">
            <h4 class="text-[#191c1d] text-[14px] font-bold leading-[20px]">Portfolio Health Trend</h4>
            <p class="text-[#5d3f3f] text-[12px] font-normal leading-[19.5px]">
              Overall portfolio health score reflects aggregated customer health metrics computed by the prediction engine.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCustomerStore } from '@/stores/customerStore'
import StateBadge from '@/components/absa/StateBadge.vue'
import LoadingSkeleton from '@/components/absa/LoadingSkeleton.vue'
import { Doughnut, Bar } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const customerStore = useCustomerStore()
const pageLoading = ref(true)

const doughnutData = computed(() => ({
  labels: ['Active', 'At Risk', 'Dormant', 'Churned'],
  datasets: [{
    data: [
      customerStore.portfolio.active || 0,
      customerStore.portfolio.atRisk || 0,
      customerStore.portfolio.dormant || 0,
      customerStore.portfolio.churned || 0,
    ],
    backgroundColor: ['var(--absa-success, #16A34A)', 'var(--absa-warning, #F59E0B)', '#6B7280', 'var(--absa-critical, #DC2626)'],
    borderWidth: 0,
  }],
}))

const histogramData = computed(() => {
  const bins = Array(10).fill(0)
  customerStore.customers.forEach((c) => {
    const score = c.healthScore ?? 0
    const idx = Math.min(Math.floor(score / 10), 9)
    bins[idx]++
  })
  return {
    labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
    datasets: [{
      label: 'Customers',
      data: bins,
      backgroundColor: 'rgba(190, 15, 44, 0.7)',
      borderRadius: 4,
    }],
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } },
}))

onMounted(async () => {
  console.time('⏱ PortfolioOverview.onMounted')
  console.log('📊 PortfolioOverview: fetching portfolio...')
  await customerStore.fetchPortfolio()
  pageLoading.value = false
  console.log('📊 PortfolioOverview: done — customers:', customerStore.customers.length, 'loading:', customerStore.loading, 'error:', customerStore.error)
  console.timeEnd('⏱ PortfolioOverview.onMounted')
})
</script>
