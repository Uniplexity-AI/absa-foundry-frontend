<template>
  <div class="performance-dashboard">
    <!-- KPI Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div
        v-for="(category, categoryName) in kpis"
        :key="categoryName"
        class="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-700 capitalize">
            {{ categoryName }} KPIs
          </h3>
          <component 
            :is="getCategoryIcon(categoryName)" 
            class="w-5 h-5 text-gray-500"
          />
        </div>
        
        <div class="space-y-2">
          <div
            v-for="(kpiData, kpiName) in category"
            :key="kpiName"
            class="text-xs"
          >
            <div class="flex items-center justify-between mb-1">
              <span class="text-gray-600">{{ kpiData.name }}</span>
              <span 
                :class="getPerformanceColor(kpiData)"
                class="font-medium"
              >
                {{ formatKPIValue(kpiData) }}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                class="h-1.5 rounded-full transition-all duration-300"
                :class="getPerformanceBarColor(kpiData)"
                :style="{ width: `${getPerformancePercentage(kpiData)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Performance Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Financial Performance Chart -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Financial Performance</h3>
          <div class="flex space-x-2">
            <button
              v-for="period in ['7d', '30d', '90d', '1y']"
              :key="period"
              @click="financialPeriod = period"
              :class="financialPeriod === period ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'"
              class="px-3 py-1 text-sm rounded-md transition-colors"
            >
              {{ period }}
            </button>
          </div>
        </div>
        
        <div class="h-64 flex items-center justify-center">
          <!-- Placeholder for chart - in real implementation, use Chart.js or similar -->
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <p class="text-sm text-gray-500">Financial trend chart</p>
            <p class="text-xs text-gray-400 mt-1">
              Revenue: {{ formatCurrency(getKPIValue('financial', 'revenue')) }} / 
              Target: {{ formatCurrency(getKPITarget('financial', 'revenue')) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Operational Efficiency Chart -->
      <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Operational Efficiency</h3>
          <button 
            @click="refreshData"
            class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div
            v-for="(metric, index) in operationalMetrics"
            :key="index"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ metric.name }}</p>
              <p class="text-xs text-gray-500">{{ metric.description }}</p>
            </div>
            <div class="text-right">
              <p 
                class="text-lg font-semibold"
                :class="metric.trend >= 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ formatMetricValue(metric.value, metric.unit) }}
              </p>
              <p 
                class="text-xs"
                :class="metric.trend >= 0 ? 'text-green-500' : 'text-red-500'"
              >
                {{ metric.trend >= 0 ? '+' : '' }}{{ metric.trend }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Alerts -->
    <div v-if="performanceAlerts.length > 0" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Performance Alerts</h3>
      <div class="space-y-2">
        <div
          v-for="alert in performanceAlerts"
          :key="alert.id"
          class="flex items-start justify-between p-4 rounded-lg border"
          :class="getAlertClasses(alert.type)"
        >
          <div class="flex items-start space-x-3">
            <component 
              :is="getAlertIcon(alert.type)"
              class="w-5 h-5 mt-0.5"
              :class="getAlertIconColor(alert.type)"
            />
            <div>
              <h4 class="font-medium text-gray-900">{{ alert.title }}</h4>
              <p class="text-sm text-gray-600 mt-1">{{ alert.message }}</p>
            </div>
          </div>
          <button
            @click="dismissAlert(alert.id)"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- KPI Comparison Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">KPI Performance Comparison</h3>
          <div class="flex space-x-2">
            <select
              v-model="selectedTimeframe"
              @change="handleTimeframeChange"
              class="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="quarterly">This Quarter</option>
              <option value="yearly">This Year</option>
            </select>
            <button
              @click="exportKPIData"
              class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KPI
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(category, categoryName) in kpis" :key="categoryName">
              <tr
                v-for="(kpiData, kpiName) in category"
                :key="`${categoryName}-${kpiName}`"
                class="hover:bg-gray-50"
              >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ kpiData.name }}</div>
                  <div class="text-xs text-gray-500 capitalize">{{ categoryName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatKPIValue(kpiData) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-600">
                  {{ formatKPITarget(kpiData) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getPerformanceBarColor(kpiData)"
                      :style="{ width: `${Math.min(getPerformancePercentage(kpiData), 100)}%` }"
                    ></div>
                  </div>
                  <span 
                    class="text-sm font-medium"
                    :class="getPerformanceColor(kpiData)"
                  >
                    {{ getPerformancePercentage(kpiData).toFixed(0) }}%
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getTrendClasses(kpiData.trend)"
                >
                  <component 
                    :is="getTrendIcon(kpiData.trend)"
                    class="w-3 h-3 mr-1"
                  />
                  {{ Math.abs(kpiData.trend || 0) }}%
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="openKPIDetails(categoryName, kpiName, kpiData)"
                  class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  View Details
                </button>
              </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  kpis: {
    type: Object,
    default: () => ({})
  },
  timeframe: {
    type: String,
    default: 'monthly'
  },
  performanceAlerts: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits([
  'timeframe-change',
  'refresh-data',
  'dismiss-alert',
  'kpi-update'
])

// Local state
const financialPeriod = ref('30d')
const selectedTimeframe = ref(props.timeframe)

// Computed properties
const operationalMetrics = computed(() => [
  {
    name: 'Inventory Turnover',
    description: 'How quickly inventory converts to sales',
    value: getKPIValue('operational', 'inventoryTurnover') || 0,
    unit: 'ratio',
    trend: getKPITrend('operational', 'inventoryTurnover') || 0
  },
  {
    name: 'Order Fulfillment Rate',
    description: 'Percentage of orders completed on time',
    value: getKPIValue('operational', 'fulfillmentRate') || 95,
    unit: 'percentage',
    trend: 2.3
  },
  {
    name: 'Customer Response Time',
    description: 'Average time to respond to customer inquiries',
    value: getKPIValue('operational', 'responseTime') || 2.4,
    unit: 'hours',
    trend: -15.2
  },
  {
    name: 'Production Efficiency',
    description: 'Output versus planned production',
    value: getKPIValue('operational', 'efficiency') || 87,
    unit: 'percentage',
    trend: 4.1
  }
])

// Methods
const getCategoryIcon = (categoryName) => {
  const icons = {
    financial: 'svg',
    operational: 'svg', 
    customer: 'svg',
    hr: 'svg'
  }
  return icons[categoryName] || 'svg'
}

const getKPIValue = (category, kpiName) => {
  return props.kpis[category]?.[kpiName]?.currentValue || 0
}

const getKPITarget = (category, kpiName) => {
  return props.kpis[category]?.[kpiName]?.targetValue || 0
}

const getKPITrend = (category, kpiName) => {
  return props.kpis[category]?.[kpiName]?.trend || 0
}

const getPerformancePercentage = (kpiData) => {
  if (!kpiData.targetValue || kpiData.targetValue === 0) return 0
  return (kpiData.currentValue / kpiData.targetValue) * 100
}

const getPerformanceColor = (kpiData) => {
  const percentage = getPerformancePercentage(kpiData)
  if (percentage >= 90) return 'text-green-600'
  if (percentage >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

const getPerformanceBarColor = (kpiData) => {
  const percentage = getPerformancePercentage(kpiData)
  if (percentage >= 90) return 'bg-green-500'
  if (percentage >= 70) return 'bg-yellow-500'
  return 'bg-red-500'
}

const formatKPIValue = (kpiData) => {
  if (kpiData.unit === 'currency') {
    return formatCurrency(kpiData.currentValue)
  } else if (kpiData.unit === 'percentage') {
    return `${(kpiData.currentValue || 0).toFixed(1)}%`
  } else if (kpiData.unit === 'count') {
    return formatNumber(kpiData.currentValue)
  } else if (kpiData.unit === 'ratio') {
    return `${(kpiData.currentValue || 0).toFixed(2)}x`
  }
  return formatNumber(kpiData.currentValue)
}

const formatKPITarget = (kpiData) => {
  if (kpiData.unit === 'currency') {
    return formatCurrency(kpiData.targetValue)
  } else if (kpiData.unit === 'percentage') {
    return `${(kpiData.targetValue || 0).toFixed(1)}%`
  } else if (kpiData.unit === 'count') {
    return formatNumber(kpiData.targetValue)
  } else if (kpiData.unit === 'ratio') {
    return `${(kpiData.targetValue || 0).toFixed(2)}x`
  }
  return formatNumber(kpiData.targetValue)
}

const formatMetricValue = (value, unit) => {
  if (unit === 'percentage') {
    return `${value}%`
  } else if (unit === 'hours') {
    return `${value}h`
  } else if (unit === 'ratio') {
    return `${value}x`
  }
  return value.toString()
}

const formatNumber = (num) => {
  if (typeof num !== 'number') return '0'
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

const formatCurrency = (num) => {
  if (num === null || num === undefined) return 'K 0.00'
  const number = Number(num)
  if (isNaN(number)) return 'K 0.00'
  return `K ${number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

const getAlertClasses = (type) => {
  switch (type) {
    case 'critical':
      return 'bg-red-50 border-red-200'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200'
    case 'info':
      return 'bg-blue-50 border-blue-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}

const getAlertIcon = (type) => {
  // Return appropriate SVG component based on type
  return 'svg'
}

const getAlertIconColor = (type) => {
  switch (type) {
    case 'critical':
      return 'text-red-500'
    case 'warning':
      return 'text-yellow-500'
    case 'info':
      return 'text-blue-500'
    default:
      return 'text-gray-500'
  }
}

const getTrendClasses = (trend) => {
  if (trend > 0) {
    return 'bg-green-100 text-green-800'
  } else if (trend < 0) {
    return 'bg-red-100 text-red-800'
  }
  return 'bg-gray-100 text-gray-800'
}

const getTrendIcon = (trend) => {
  // Return appropriate SVG component based on trend
  return 'svg'
}

const handleTimeframeChange = () => {
  emit('timeframe-change', selectedTimeframe.value)
}

const refreshData = () => {
  emit('refresh-data')
}

const dismissAlert = (alertId) => {
  emit('dismiss-alert', alertId)
}

const openKPIDetails = (category, kpiName, kpiData) => {
  // Emit event to open KPI details modal
  emit('kpi-update', { category, kpiName, kpiData })
}

const exportKPIData = () => {
  // Create CSV data
  const csvData = []
  csvData.push(['KPI', 'Category', 'Current', 'Target', 'Performance %', 'Trend %'])
  
  Object.entries(props.kpis).forEach(([categoryName, category]) => {
    Object.entries(category).forEach(([kpiName, kpiData]) => {
      csvData.push([
        kpiData.name,
        categoryName,
        kpiData.currentValue || 0,
        kpiData.targetValue || 0,
        getPerformancePercentage(kpiData).toFixed(2),
        (kpiData.trend || 0).toFixed(2)
      ])
    })
  })
  
  // Create and download CSV
  const csvContent = csvData.map(row => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `kpi-performance-${selectedTimeframe.value}-${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Lifecycle
onMounted(() => {
  selectedTimeframe.value = props.timeframe
})
</script>

<style scoped>
.performance-dashboard {
  width: 100%;
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>