<template>
  <div class="strategies-panel bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Strategic Plans</h2>
      <button
        @click="$emit('open-strategy-modal')"
        class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Strategy</span>
      </button>
    </div>

    <!-- Strategies Filter and Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
      <div class="flex items-center space-x-3">
        <select
          v-model="selectedFilter"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Strategies</option>
          <option value="active">Active</option>
          <option value="planning">In Planning</option>
          <option value="executing">Executing</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </select>
        
        <select
          v-model="selectedCategory"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Categories</option>
          <option value="growth">Growth</option>
          <option value="operational">Operational</option>
          <option value="financial">Financial</option>
          <option value="customer">Customer</option>
          <option value="innovation">Innovation</option>
          <option value="hr">Human Resources</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">{{ filteredStrategies.length }} strateg{{ filteredStrategies.length !== 1 ? 'ies' : 'y' }}</span>
        <button
          @click="showStrategyMap = !showStrategyMap"
          :class="showStrategyMap ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'"
          class="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Toggle Strategy Map"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Strategy Map View -->
    <div v-if="showStrategyMap" class="mb-8 p-6 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Strategy Map</h3>
      <div class="strategy-map">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in strategyCategories"
            :key="category.name"
            class="category-column"
          >
            <div class="category-header p-3 rounded-t-lg" :class="category.bgColor">
              <h4 class="font-medium text-white">{{ category.label }}</h4>
              <p class="text-xs opacity-90">{{ getCategoryStrategies(category.name).length }} strategies</p>
            </div>
            <div class="category-body bg-white rounded-b-lg border border-t-0 border-gray-200 p-3 min-h-[200px]">
              <div class="space-y-2">
                <div
                  v-for="strategy in getCategoryStrategies(category.name)"
                  :key="strategy.id"
                  class="strategy-card p-3 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  @click="openStrategyDetails(strategy)"
                >
                  <h5 class="font-medium text-sm text-gray-900 mb-1">{{ strategy.title }}</h5>
                  <div class="flex items-center justify-between">
                    <span 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :class="getStrategyStatusClasses(strategy)"
                    >
                      {{ getStrategyStatus(strategy) }}
                    </span>
                    <span class="text-xs text-gray-500">{{ strategy.progress || 0 }}%</span>
                  </div>
                </div>
                <div v-if="getCategoryStrategies(category.name).length === 0" class="text-center py-4">
                  <p class="text-sm text-gray-400">No strategies yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredStrategies.length === 0 && !showStrategyMap" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ selectedFilter === 'all' ? 'No strategies defined yet' : `No ${selectedFilter} strategies` }}
      </h3>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        {{ selectedFilter === 'all' 
          ? 'Create strategic plans to guide your organization toward achieving its goals and objectives.'
          : `There are currently no strategies matching the "${selectedFilter}" filter.`
        }}
      </p>
      <button
        @click="$emit('open-strategy-modal')"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create Your First Strategy
      </button>
    </div>

    <!-- Strategies List -->
    <div v-else-if="!showStrategyMap" class="space-y-4">
      <div
        v-for="strategy in filteredStrategies"
        :key="strategy.id"
        class="strategy-item bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
        @click="openStrategyDetails(strategy)"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-medium text-gray-900">{{ strategy.title }}</h3>
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStrategyStatusClasses(strategy)"
              >
                {{ getStrategyStatus(strategy) }}
              </span>
              <div v-if="strategy.category" class="flex items-center">
                <div 
                  class="w-2 h-2 rounded-full mr-2"
                  :class="getCategoryColor(strategy.category)"
                ></div>
                <span class="text-xs text-gray-500 capitalize">{{ strategy.category }}</span>
              </div>
            </div>
            <p v-if="strategy.description" class="text-gray-600 text-sm mb-3">
              {{ strategy.description }}
            </p>
          </div>

          <div class="flex items-center space-x-2 ml-4">
            <button
              @click.stop="toggleStrategyFavorite(strategy)"
              class="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg 
                class="w-4 h-4" 
                :class="strategy.isFavorite ? 'text-yellow-500 fill-current' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <div class="relative">
              <button
                @click.stop="toggleStrategyMenu(strategy.id)"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <!-- Strategy Menu Dropdown -->
              <div 
                v-if="activeStrategyMenu === strategy.id"
                class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
              >
                <button
                  @click.stop="editStrategy(strategy)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit Strategy
                </button>
                <button
                  @click.stop="duplicateStrategy(strategy)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Duplicate
                </button>
                <button
                  @click.stop="exportStrategy(strategy)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Export
                </button>
                <div class="border-t border-gray-100 my-1"></div>
                <button
                  @click.stop="archiveStrategy(strategy)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {{ strategy.isArchived ? 'Unarchive' : 'Archive' }}
                </button>
                <button
                  @click.stop="deleteStrategy(strategy)"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Strategy Progress -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">Overall Progress</span>
            <span class="text-sm text-gray-600">{{ strategy.progress || 0 }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              class="h-2.5 rounded-full transition-all duration-300"
              :class="getProgressBarColor(strategy.progress)"
              :style="{ width: `${strategy.progress || 0}%` }"
            ></div>
          </div>
        </div>

        <!-- Strategy Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-semibold text-gray-900">{{ strategy.linkedGoals?.length || 0 }}</div>
            <div class="text-xs text-gray-500">Linked Goals</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-semibold text-gray-900">{{ strategy.actionPlans?.length || 0 }}</div>
            <div class="text-xs text-gray-500">Action Plans</div>
          </div>
          <div class="text-center p-3 bg-gray-50 rounded-lg">
            <div class="text-lg font-semibold text-gray-900">{{ strategy.milestones?.length || 0 }}</div>
            <div class="text-xs text-gray-500">Milestones</div>
          </div>
        </div>

        <!-- Strategy Timeline -->
        <div v-if="strategy.startDate || strategy.targetDate" class="flex items-center space-x-4 text-sm text-gray-500">
          <div v-if="strategy.startDate" class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Started {{ formatStrategyDate(strategy.startDate) }}</span>
          </div>
          <div v-if="strategy.targetDate" class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Target {{ formatStrategyDate(strategy.targetDate) }}</span>
          </div>
        </div>

        <!-- Strategy Tags -->
        <div v-if="strategy.tags && strategy.tags.length > 0" class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="tag in strategy.tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Strategy Analytics Summary -->
    <div v-if="strategies.length > 0" class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ strategies.length }}</div>
        <div class="text-sm opacity-90">Total Strategies</div>
      </div>
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ getActiveStrategiesCount() }}</div>
        <div class="text-sm opacity-90">Active</div>
      </div>
      <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ Math.round(getAverageProgress()) }}%</div>
        <div class="text-sm opacity-90">Avg Progress</div>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ getCompletedStrategiesCount() }}</div>
        <div class="text-sm opacity-90">Completed</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  strategies: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits([
  'open-strategy-modal',
  'strategy-update',
  'strategy-delete',
  'open-strategy-details'
])

// Local state
const selectedFilter = ref('all')
const selectedCategory = ref('all')
const showStrategyMap = ref(false)
const activeStrategyMenu = ref(null)

// Strategy categories for the map view
const strategyCategories = [
  { name: 'growth', label: 'Growth Strategies', bgColor: 'bg-green-600' },
  { name: 'operational', label: 'Operational Excellence', bgColor: 'bg-blue-600' },
  { name: 'financial', label: 'Financial Performance', bgColor: 'bg-yellow-600' },
  { name: 'customer', label: 'Customer Focus', bgColor: 'bg-purple-600' },
  { name: 'innovation', label: 'Innovation & Technology', bgColor: 'bg-red-600' },
  { name: 'hr', label: 'Human Resources', bgColor: 'bg-indigo-600' }
]

// Computed properties
const filteredStrategies = computed(() => {
  let filtered = [...props.strategies]

  // Apply status filter
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(strategy => {
      const status = getStrategyStatus(strategy)
      
      switch (selectedFilter.value) {
        case 'active':
          return status === 'Active' || status === 'Executing'
        case 'planning':
          return status === 'Planning'
        case 'executing':
          return status === 'Executing'
        case 'completed':
          return status === 'Completed'
        case 'on-hold':
          return status === 'On Hold'
        default:
          return true
      }
    })
  }

  // Apply category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(strategy => strategy.category === selectedCategory.value)
  }

  // Sort by progress and priority
  return filtered.sort((a, b) => {
    // First sort by status priority
    const statusOrder = { 'executing': 4, 'active': 3, 'planning': 2, 'on-hold': 1, 'completed': 0 }
    const aStatus = getStrategyStatus(a).toLowerCase()
    const bStatus = getStrategyStatus(b).toLowerCase()
    const aStatusPriority = statusOrder[aStatus] || 0
    const bStatusPriority = statusOrder[bStatus] || 0
    
    if (aStatusPriority !== bStatusPriority) {
      return bStatusPriority - aStatusPriority
    }

    // Then sort by progress (ascending for active, descending for completed)
    if (aStatus === 'completed' && bStatus === 'completed') {
      return new Date(b.completedDate || 0) - new Date(a.completedDate || 0)
    }
    
    return (b.progress || 0) - (a.progress || 0)
  })
})

// Methods
const getStrategyStatus = (strategy) => {
  if (strategy.progress >= 100 || strategy.status === 'completed') {
    return 'Completed'
  }

  if (strategy.status === 'on-hold' || strategy.status === 'paused') {
    return 'On Hold'
  }

  if (strategy.progress > 0 && strategy.progress < 100) {
    return 'Executing'
  }

  if (strategy.status === 'planning' || !strategy.startDate || new Date(strategy.startDate) > new Date()) {
    return 'Planning'
  }

  return 'Active'
}

const getStrategyStatusClasses = (strategy) => {
  const status = getStrategyStatus(strategy)
  
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Executing':
      return 'bg-blue-100 text-blue-800'
    case 'Planning':
      return 'bg-yellow-100 text-yellow-800'
    case 'On Hold':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getProgressBarColor = (progress) => {
  if (progress >= 100) return 'bg-green-500'
  if (progress >= 75) return 'bg-blue-500'
  if (progress >= 50) return 'bg-yellow-500'
  if (progress >= 25) return 'bg-orange-500'
  return 'bg-red-500'
}

const getCategoryColor = (category) => {
  const categoryConfig = strategyCategories.find(c => c.name === category)
  return categoryConfig ? categoryConfig.bgColor.replace('bg-', 'bg-') : 'bg-gray-500'
}

const getCategoryStrategies = (categoryName) => {
  return props.strategies.filter(strategy => strategy.category === categoryName)
}

const formatStrategyDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const getActiveStrategiesCount = () => {
  return props.strategies.filter(strategy => {
    const status = getStrategyStatus(strategy)
    return status === 'Active' || status === 'Executing'
  }).length
}

const getCompletedStrategiesCount = () => {
  return props.strategies.filter(strategy => getStrategyStatus(strategy) === 'Completed').length
}

const getAverageProgress = () => {
  if (props.strategies.length === 0) return 0
  const totalProgress = props.strategies.reduce((sum, strategy) => sum + (strategy.progress || 0), 0)
  return totalProgress / props.strategies.length
}

const toggleStrategyMenu = (strategyId) => {
  activeStrategyMenu.value = activeStrategyMenu.value === strategyId ? null : strategyId
}

const closeAllMenus = () => {
  activeStrategyMenu.value = null
}

const openStrategyDetails = (strategy) => {
  emit('open-strategy-details', strategy)
}

const editStrategy = (strategy) => {
  console.log('Edit strategy:', strategy)
  closeAllMenus()
}

const duplicateStrategy = (strategy) => {
  const duplicatedStrategy = {
    ...strategy,
    id: `strategy_${Date.now()}`,
    title: `${strategy.title} (Copy)`,
    progress: 0,
    createdAt: new Date().toISOString()
  }
  emit('strategy-update', duplicatedStrategy)
  closeAllMenus()
}

const exportStrategy = (strategy) => {
  const exportData = {
    title: strategy.title,
    description: strategy.description,
    category: strategy.category,
    status: getStrategyStatus(strategy),
    progress: strategy.progress || 0,
    startDate: strategy.startDate,
    targetDate: strategy.targetDate,
    linkedGoals: strategy.linkedGoals?.length || 0,
    actionPlans: strategy.actionPlans?.length || 0,
    milestones: strategy.milestones?.length || 0,
    tags: strategy.tags || []
  }

  const jsonData = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `strategy-${strategy.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  
  closeAllMenus()
}

const archiveStrategy = (strategy) => {
  emit('strategy-update', {
    ...strategy,
    isArchived: !strategy.isArchived
  })
  closeAllMenus()
}

const deleteStrategy = (strategy) => {
  if (confirm(`Are you sure you want to delete the strategy "${strategy.title}"? This action cannot be undone.`)) {
    emit('strategy-delete', strategy.id)
  }
  closeAllMenus()
}

const toggleStrategyFavorite = (strategy) => {
  emit('strategy-update', {
    ...strategy,
    isFavorite: !strategy.isFavorite
  })
}

// Event listeners
onMounted(() => {
  document.addEventListener('click', closeAllMenus)
})

onUnmounted(() => {
  document.removeEventListener('click', closeAllMenus)
})
</script>

<style scoped>
.strategy-item:hover {
  transform: translateY(-2px);
}

.strategy-item,
.strategy-card {
  transition: all 0.2s ease;
}

.category-column {
  min-height: 250px;
}

.strategy-map {
  min-height: 300px;
}
</style>