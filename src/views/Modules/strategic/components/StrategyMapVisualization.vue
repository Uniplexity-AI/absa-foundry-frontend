<template>
  <div class="strategy-map-visualization bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Strategy Map</h2>
      <div class="flex space-x-2">
        <select
          v-model="selectedTimeframe"
          @change="handleTimeframeChange"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="quarterly">This Quarter</option>
          <option value="yearly">This Year</option>
          <option value="all">All Time</option>
        </select>
        <button
          @click="exportStrategyMap"
          class="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export</span>
        </button>
      </div>
    </div>

    <!-- Strategy Map Legend -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-sm font-medium text-gray-900 mb-3">Strategy Map Legend</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-green-500 rounded"></div>
          <span class="text-sm text-gray-600">Completed ({{ getStatusCount('completed') }})</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-blue-500 rounded"></div>
          <span class="text-sm text-gray-600">Active ({{ getStatusCount('active') }})</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-yellow-500 rounded"></div>
          <span class="text-sm text-gray-600">Planning ({{ getStatusCount('planning') }})</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-red-500 rounded"></div>
          <span class="text-sm text-gray-600">On Hold ({{ getStatusCount('on-hold') }})</span>
        </div>
      </div>
    </div>

    <!-- Strategy Perspectives -->
    <div class="strategy-perspectives space-y-8">
      <!-- Financial Perspective -->
      <div class="perspective-section">
        <div class="perspective-header mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">Financial Perspective</h3>
            </div>
            <span class="text-sm text-gray-500">
              {{ getObjectivesByPerspective('financial').length }} objective{{ getObjectivesByPerspective('financial').length !== 1 ? 's' : '' }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-1">How do we create value for shareholders and stakeholders?</p>
        </div>
        
        <div class="objectives-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="objective in getObjectivesByPerspective('financial')"
            :key="objective.id"
            class="objective-card p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
            :class="getObjectiveCardClasses(objective)"
            @click="openObjectiveDetails(objective)"
          >
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-medium text-gray-900 text-sm">{{ objective.title }}</h4>
              <div 
                class="w-3 h-3 rounded-full flex-shrink-0"
                :class="getObjectiveStatusColor(objective.status)"
              ></div>
            </div>
            <p v-if="objective.description" class="text-xs text-gray-600 mb-3 line-clamp-2">
              {{ objective.description }}
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-500">{{ objective.kpis?.length || 0 }} KPI{{ (objective.kpis?.length || 0) !== 1 ? 's' : '' }}</span>
              <span class="font-medium" :class="getProgressColor(objective.progress)">
                {{ objective.progress || 0 }}%
              </span>
            </div>
          </div>
          
          <!-- Add New Objective Button -->
          <button
            @click="createObjective('financial')"
            class="objective-card p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
          >
            <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm">Add Objective</span>
          </button>
        </div>
      </div>

      <!-- Customer Perspective -->
      <div class="perspective-section">
        <div class="perspective-header mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">Customer Perspective</h3>
            </div>
            <span class="text-sm text-gray-500">
              {{ getObjectivesByPerspective('customer').length }} objective{{ getObjectivesByPerspective('customer').length !== 1 ? 's' : '' }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-1">How do we create value for our customers?</p>
        </div>
        
        <div class="objectives-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="objective in getObjectivesByPerspective('customer')"
            :key="objective.id"
            class="objective-card p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
            :class="getObjectiveCardClasses(objective)"
            @click="openObjectiveDetails(objective)"
          >
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-medium text-gray-900 text-sm">{{ objective.title }}</h4>
              <div 
                class="w-3 h-3 rounded-full flex-shrink-0"
                :class="getObjectiveStatusColor(objective.status)"
              ></div>
            </div>
            <p v-if="objective.description" class="text-xs text-gray-600 mb-3 line-clamp-2">
              {{ objective.description }}
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-500">{{ objective.kpis?.length || 0 }} KPI{{ (objective.kpis?.length || 0) !== 1 ? 's' : '' }}</span>
              <span class="font-medium" :class="getProgressColor(objective.progress)">
                {{ objective.progress || 0 }}%
              </span>
            </div>
          </div>
          
          <!-- Add New Objective Button -->
          <button
            @click="createObjective('customer')"
            class="objective-card p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
          >
            <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm">Add Objective</span>
          </button>
        </div>
      </div>

      <!-- Internal Process Perspective -->
      <div class="perspective-section">
        <div class="perspective-header mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">Internal Process Perspective</h3>
            </div>
            <span class="text-sm text-gray-500">
              {{ getObjectivesByPerspective('process').length }} objective{{ getObjectivesByPerspective('process').length !== 1 ? 's' : '' }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-1">What processes must we excel at to satisfy customers and shareholders?</p>
        </div>
        
        <div class="objectives-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="objective in getObjectivesByPerspective('process')"
            :key="objective.id"
            class="objective-card p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
            :class="getObjectiveCardClasses(objective)"
            @click="openObjectiveDetails(objective)"
          >
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-medium text-gray-900 text-sm">{{ objective.title }}</h4>
              <div 
                class="w-3 h-3 rounded-full flex-shrink-0"
                :class="getObjectiveStatusColor(objective.status)"
              ></div>
            </div>
            <p v-if="objective.description" class="text-xs text-gray-600 mb-3 line-clamp-2">
              {{ objective.description }}
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-500">{{ objective.kpis?.length || 0 }} KPI{{ (objective.kpis?.length || 0) !== 1 ? 's' : '' }}</span>
              <span class="font-medium" :class="getProgressColor(objective.progress)">
                {{ objective.progress || 0 }}%
              </span>
            </div>
          </div>
          
          <!-- Add New Objective Button -->
          <button
            @click="createObjective('process')"
            class="objective-card p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
          >
            <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm">Add Objective</span>
          </button>
        </div>
      </div>

      <!-- Learning & Growth Perspective -->
      <div class="perspective-section">
        <div class="perspective-header mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">Learning & Growth Perspective</h3>
            </div>
            <span class="text-sm text-gray-500">
              {{ getObjectivesByPerspective('learning').length }} objective{{ getObjectivesByPerspective('learning').length !== 1 ? 's' : '' }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-1">How do we align intangible assets to improve performance?</p>
        </div>
        
        <div class="objectives-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="objective in getObjectivesByPerspective('learning')"
            :key="objective.id"
            class="objective-card p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
            :class="getObjectiveCardClasses(objective)"
            @click="openObjectiveDetails(objective)"
          >
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-medium text-gray-900 text-sm">{{ objective.title }}</h4>
              <div 
                class="w-3 h-3 rounded-full flex-shrink-0"
                :class="getObjectiveStatusColor(objective.status)"
              ></div>
            </div>
            <p v-if="objective.description" class="text-xs text-gray-600 mb-3 line-clamp-2">
              {{ objective.description }}
            </p>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-500">{{ objective.kpis?.length || 0 }} KPI{{ (objective.kpis?.length || 0) !== 1 ? 's' : '' }}</span>
              <span class="font-medium" :class="getProgressColor(objective.progress)">
                {{ objective.progress || 0 }}%
              </span>
            </div>
          </div>
          
          <!-- Add New Objective Button -->
          <button
            @click="createObjective('learning')"
            class="objective-card p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-gray-500 hover:text-gray-600"
          >
            <svg class="w-6 h-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span class="text-sm">Add Objective</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Strategy Map Summary -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ getTotalObjectives() }}</div>
        <div class="text-sm opacity-90">Total Objectives</div>
      </div>
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ getActiveObjectives() }}</div>
        <div class="text-sm opacity-90">Active</div>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ Math.round(getAverageProgress()) }}%</div>
        <div class="text-sm opacity-90">Avg Progress</div>
      </div>
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ getCompletedObjectives() }}</div>
        <div class="text-sm opacity-90">Completed</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  objectives: {
    type: Array,
    default: () => []
  },
  strategies: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits([
  'create-objective',
  'open-objective-details',
  'timeframe-change'
])

// Local state
const selectedTimeframe = ref('quarterly')

// Computed properties
const filteredObjectives = computed(() => {
  return props.objectives.filter(objective => {
    if (selectedTimeframe.value === 'all') return true
    return objective.timeframe === selectedTimeframe.value
  })
})

// Methods
const getObjectivesByPerspective = (perspective) => {
  return filteredObjectives.value.filter(objective => objective.perspective === perspective)
}

const getStatusCount = (status) => {
  return filteredObjectives.value.filter(objective => 
    getObjectiveStatus(objective).toLowerCase().replace(' ', '-') === status
  ).length
}

const getObjectiveStatus = (objective) => {
  if (objective.progress >= 100) return 'completed'
  if (objective.progress > 0) return 'active'
  if (objective.status === 'on-hold') return 'on-hold'
  return 'planning'
}

const getObjectiveStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500'
    case 'active':
      return 'bg-blue-500'
    case 'planning':
      return 'bg-yellow-500'
    case 'on-hold':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

const getObjectiveCardClasses = (objective) => {
  const status = getObjectiveStatus(objective)
  
  switch (status) {
    case 'completed':
      return 'border-green-200 bg-green-50'
    case 'active':
      return 'border-blue-200 bg-blue-50'
    case 'on-hold':
      return 'border-red-200 bg-red-50'
    default:
      return 'border-gray-200 bg-white'
  }
}

const getProgressColor = (progress) => {
  if (progress >= 90) return 'text-green-600'
  if (progress >= 70) return 'text-blue-600'
  if (progress >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

const getTotalObjectives = () => {
  return filteredObjectives.value.length
}

const getActiveObjectives = () => {
  return filteredObjectives.value.filter(obj => getObjectiveStatus(obj) === 'active').length
}

const getCompletedObjectives = () => {
  return filteredObjectives.value.filter(obj => getObjectiveStatus(obj) === 'completed').length
}

const getAverageProgress = () => {
  if (filteredObjectives.value.length === 0) return 0
  const totalProgress = filteredObjectives.value.reduce((sum, obj) => sum + (obj.progress || 0), 0)
  return totalProgress / filteredObjectives.value.length
}

const handleTimeframeChange = () => {
  emit('timeframe-change', selectedTimeframe.value)
}

const createObjective = (perspective) => {
  emit('create-objective', perspective)
}

const openObjectiveDetails = (objective) => {
  emit('open-objective-details', objective)
}

const exportStrategyMap = () => {
  // Create export data
  const exportData = {
    timeframe: selectedTimeframe.value,
    exportDate: new Date().toISOString(),
    summary: {
      totalObjectives: getTotalObjectives(),
      activeObjectives: getActiveObjectives(),
      completedObjectives: getCompletedObjectives(),
      averageProgress: getAverageProgress()
    },
    perspectives: {
      financial: getObjectivesByPerspective('financial'),
      customer: getObjectivesByPerspective('customer'),
      process: getObjectivesByPerspective('process'),
      learning: getObjectivesByPerspective('learning')
    }
  }

  // Create and download JSON file
  const jsonData = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `strategy-map-${selectedTimeframe.value}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.objective-card {
  min-height: 120px;
  transition: all 0.2s ease;
}

.objective-card:hover {
  transform: translateY(-2px);
}

.perspective-section {
  position: relative;
}

.perspective-section:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 1rem;
  background: linear-gradient(to bottom, #e5e7eb, transparent);
}
</style>