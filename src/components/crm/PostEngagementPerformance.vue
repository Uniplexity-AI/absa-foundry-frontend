<template>
  <div class="bg-white rounded-sm border border-gray-300 p-5 mb-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-sm font-bold text-absa-enrich">Post-Engagement Performance</h2>
        <p class="text-xs text-gray-500 mt-1">Comparing real-time 30-day activity before vs after the most recent RM engagement.</p>
      </div>
      <div v-if="hasData" class="flex items-center gap-2">
        <span class="flex items-center gap-1 text-[11px] font-bold text-gray-500">
          <span class="w-3 h-3 rounded-full bg-gray-300"></span> Before
        </span>
        <span class="flex items-center gap-1 text-[11px] font-bold text-absa-enrich">
          <span class="w-3 h-3 rounded-full bg-[#DC0037]"></span> After
        </span>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="py-10 flex items-center justify-center">
      <div class="w-5 h-5 border-2 border-absa-inspire border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Empty state: no real engagement data yet -->
    <div v-else-if="!hasData" class="py-10 flex flex-col items-center justify-center text-center gap-3">
      <svg class="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
      <p class="text-sm font-semibold text-gray-400">No performance data available yet</p>
      <p class="text-xs text-gray-400 max-w-xs">
        Post-engagement metrics will appear here once activity data is recorded
        for the 30-day windows around this customer's engagements.
      </p>
    </div>

    <!-- Real data view -->
    <template v-else>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div v-for="metric in metrics" :key="metric.label" class="p-3 border border-gray-200 rounded-sm">
          <p class="text-[10px] uppercase font-bold text-gray-400">{{ metric.label }}</p>
          <div class="flex items-end gap-2 mt-2">
            <p class="text-lg font-mono font-bold text-absa-enrich">{{ metric.after }} {{ metric.unit }}</p>
            <p class="text-xs text-absa-inspire font-bold mb-1 line-through">{{ metric.before }} {{ metric.unit }}</p>
          </div>
          <p class="text-[11px] font-bold mt-1" :class="metric.change >= 0 ? 'text-[#16a34a]' : 'text-red-500'">
            {{ metric.change >= 0 ? '+' : '' }}{{ metric.change }}%
          </p>
        </div>
      </div>
      <div class="h-64 relative w-full">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  customerId: { type: String, required: true },
  engagementDate: { type: String, required: false }
})

const before = ref(null)
const after = ref(null)
const loading = ref(true)

/** True only when we have real (non-null) numbers from the API */
const hasData = computed(() =>
  before.value?.txValue != null && after.value?.txValue != null
)

function pct(b, a) {
  if (!b) return 0
  return Math.round(((a - b) / b) * 100)
}

const metrics = computed(() => {
  if (!hasData.value) return []
  return [
    {
      label: 'Total Transaction Value',
      before: before.value.txValue?.toLocaleString() ?? '-',
      after:  after.value.txValue?.toLocaleString()  ?? '-',
      unit: 'ZMW',
      change: pct(before.value.txValue, after.value.txValue)
    },
    {
      label: 'Txn Frequency',
      before: before.value.txCount ?? '-',
      after:  after.value.txCount  ?? '-',
      unit: 'txns',
      change: pct(before.value.txCount, after.value.txCount)
    },
    {
      label: 'Digital Logins',
      before: before.value.logins ?? '-',
      after:  after.value.logins  ?? '-',
      unit: 'logins',
      change: pct(before.value.logins, after.value.logins)
    },
    {
      label: 'Average Balance',
      before: before.value.balance?.toLocaleString() ?? '-',
      after:  after.value.balance?.toLocaleString()  ?? '-',
      unit: 'ZMW',
      change: pct(before.value.balance, after.value.balance)
    }
  ]
})

async function fetchPerformanceData() {
  loading.value = true
  before.value = null
  after.value = null

  try {
    const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
    const token = localStorage.getItem('token')
    if (token) api.defaults.headers.Authorization = `Bearer ${token}`

    const engageDate = props.engagementDate ? new Date(props.engagementDate) : new Date()
    
    // Calculate strict 30-day windows around the engagement date
    const beforeStart = new Date(engageDate)
    beforeStart.setDate(beforeStart.getDate() - 30)
    
    const afterEnd = new Date(engageDate)
    afterEnd.setDate(afterEnd.getDate() + 30)

    const beforeStartStr = beforeStart.toISOString().split('T')[0]
    const engageDateStr = engageDate.toISOString().split('T')[0]
    const afterEndStr = afterEnd.toISOString().split('T')[0]

    // Fetch exact real-time transaction activity for the two windows!
    const [beforeActivityRes, afterActivityRes, latestRes] = await Promise.all([
      api.get(`/features/${props.customerId}/gap-activity?start_date=${beforeStartStr}&end_date=${engageDateStr}`).catch(() => null),
      api.get(`/features/${props.customerId}/gap-activity?start_date=${engageDateStr}&end_date=${afterEndStr}`).catch(() => null),
      api.get(`/features/${props.customerId}/latest`).catch(() => null)
    ])

    const beforeActivity = beforeActivityRes?.data ?? { txn_count: 0, total_amount: 0 }
    const afterActivity = afterActivityRes?.data ?? { txn_count: 0, total_amount: 0 }
    const latestData = latestRes?.data ?? {}

    // Now we use the EXACT transaction counts and amounts for the 30-day windows
    const beforeTxValue = Math.round(beforeActivity.total_amount)
    const afterTxValue = Math.round(afterActivity.total_amount)
    const beforeTxCount = beforeActivity.txn_count
    const afterTxCount = afterActivity.txn_count

    // For logins and balance, we still don't have time-series, so we leave them null
    const afterLogins   = null
    const beforeLogins  = null
    const afterBalance  = null
    const beforeBalance = null

    // If both windows have exactly zero transactions, it's effectively "no data"
    if (beforeTxCount === 0 && afterTxCount === 0) {
      before.value = null
      after.value  = null
    } else {
      before.value = { txValue: beforeTxValue, txCount: beforeTxCount, logins: beforeLogins, balance: beforeBalance }
      after.value  = { txValue: afterTxValue,  txCount: afterTxCount,  logins: afterLogins,  balance: afterBalance }
    }
  } catch (err) {
    console.error('Failed to fetch performance data', err)
    before.value = null
    after.value  = null
  } finally {
    loading.value = false
  }
}

onMounted(fetchPerformanceData)
watch(() => props.customerId,     fetchPerformanceData)
watch(() => props.engagementDate, fetchPerformanceData)

const chartData = computed(() => ({
  labels: ['Total Value (ZMW)', 'Txn Count', 'Digital Logins', 'Avg Balance (ZMW)'],
  datasets: [
    {
      label: 'Before Engagement',
      backgroundColor: '#d1d5db',
      data: [
        before.value?.txValue  ?? 0,
        (before.value?.txCount  ?? 0) * 1000,
        (before.value?.logins   ?? 0) * 1000,
        before.value?.balance  ?? 0
      ]
    },
    {
      label: 'After Engagement',
      backgroundColor: '#DC0037',
      data: [
        after.value?.txValue  ?? 0,
        (after.value?.txCount  ?? 0) * 1000,
        (after.value?.logins   ?? 0) * 1000,
        after.value?.balance  ?? 0
      ]
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(context) {
          let label = context.dataset.label ? context.dataset.label + ': ' : ''
          label += (context.dataIndex === 1 || context.dataIndex === 2)
            ? context.raw / 1000
            : context.raw + ' ZMW'
          return label
        }
      }
    }
  },
  scales: {
    y: { display: false },
    x: { grid: { display: false } }
  }
}
</script>
