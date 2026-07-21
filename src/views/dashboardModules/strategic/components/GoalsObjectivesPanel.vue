<template>
  <div class="goals-objectives-panel bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Goals & Objectives</h2>
      <button
        @click="$emit('open-goal-modal')"
        class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Goal</span>
      </button>
    </div>

    <!-- Goals Filter and Sort -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
      <div class="flex items-center space-x-3">
        <select
          v-model="selectedFilter"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Goals</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
          <option value="upcoming">Upcoming Deadlines</option>
        </select>
        
        <select
          v-model="selectedTimeframe"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Timeframes</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
          <option value="quarterly">This Quarter</option>
          <option value="yearly">This Year</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">{{ filteredGoals.length }} goal{{ filteredGoals.length !== 1 ? 's' : '' }}</span>
        <div class="flex space-x-1">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'"
            class="p-2 rounded hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'"
            class="p-2 rounded hover:bg-gray-100"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredGoals.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ selectedFilter === 'all' ? 'No goals defined yet' : `No ${selectedFilter} goals` }}
      </h3>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        {{ selectedFilter === 'all' 
          ? 'Start by creating your first strategic goal to track progress and stay aligned with your vision.'
          : `There are currently no goals matching the "${selectedFilter}" filter.`
        }}
      </p>
      <button
        @click="$emit('open-goal-modal')"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create Your First Goal
      </button>
    </div>

    <!-- Goals Grid View -->
    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="goal in filteredGoals"
        :key="goal.id"
        class="goal-card bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
        @click="openGoalDetails(goal)"
      >
        <!-- Goal Header -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1">
            <h3 class="font-medium text-gray-900 mb-1 line-clamp-2">
              {{ goal.title }}
            </h3>
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getGoalStatusClasses(goal)"
            >
              {{ getGoalStatus(goal) }}
            </span>
          </div>
          <div class="flex items-center space-x-1 ml-3">
            <button
              @click.stop="toggleGoalFavorite(goal)"
              class="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              <svg 
                class="w-4 h-4" 
                :class="goal.isFavorite ? 'text-yellow-500 fill-current' : ''"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <div class="relative">
              <button
                @click.stop="toggleGoalMenu(goal.id)"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <!-- Goal Menu Dropdown -->
              <div 
                v-if="activeGoalMenu === goal.id"
                class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
              >
                <button
                  @click.stop="editGoal(goal)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit Goal
                </button>
                <button
                  @click.stop="duplicateGoal(goal)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Duplicate
                </button>
                <button
                  @click.stop="archiveGoal(goal)"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {{ goal.isArchived ? 'Unarchive' : 'Archive' }}
                </button>
                <div class="border-t border-gray-100 my-1"></div>
                <button
                  @click.stop="deleteGoal(goal)"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Goal Description -->
        <p v-if="goal.description" class="text-sm text-gray-600 mb-4 line-clamp-3">
          {{ goal.description }}
        </p>

        <!-- Progress Bar -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-medium text-gray-700">Progress</span>
            <span class="text-xs text-gray-600">{{ goal.currentProgress || 0 }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :class="getProgressBarColor(goal.currentProgress)"
              :style="{ width: `${goal.currentProgress || 0}%` }"
            ></div>
          </div>
        </div>

        <!-- Goal Metadata -->
        <div class="space-y-2 text-xs text-gray-500">
          <div v-if="goal.targetDate" class="flex items-center">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Due {{ formatGoalDate(goal.targetDate) }}</span>
          </div>
          <div v-if="goal.priority" class="flex items-center">
            <div 
              class="w-2 h-2 rounded-full mr-2"
              :class="getPriorityColor(goal.priority)"
            ></div>
            <span class="capitalize">{{ goal.priority }} priority</span>
          </div>
          <div v-if="goal.relatedKPIs && goal.relatedKPIs.length > 0" class="flex items-center">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>{{ goal.relatedKPIs.length }} linked KPI{{ goal.relatedKPIs.length !== 1 ? 's' : '' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Goals List View -->
    <div v-else class="space-y-3">
      <div
        v-for="goal in filteredGoals"
        :key="goal.id"
        class="goal-row bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
        @click="openGoalDetails(goal)"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3">
              <h3 class="font-medium text-gray-900">{{ goal.title }}</h3>
              <span 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getGoalStatusClasses(goal)"
              >
                {{ getGoalStatus(goal) }}
              </span>
              <div v-if="goal.priority" class="flex items-center">
                <div 
                  class="w-2 h-2 rounded-full mr-1"
                  :class="getPriorityColor(goal.priority)"
                ></div>
                <span class="text-xs text-gray-500 capitalize">{{ goal.priority }}</span>
              </div>
            </div>
            <p v-if="goal.description" class="text-sm text-gray-600 mt-1 line-clamp-1">
              {{ goal.description }}
            </p>
          </div>

          <div class="flex items-center space-x-4 ml-4">
            <!-- Progress -->
            <div class="flex items-center space-x-2">
              <div class="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300"
                  :class="getProgressBarColor(goal.currentProgress)"
                  :style="{ width: `${goal.currentProgress || 0}%` }"
                ></div>
              </div>
              <span class="text-sm text-gray-600 font-medium min-w-[3rem]">
                {{ goal.currentProgress || 0 }}%
              </span>
            </div>

            <!-- Target Date -->
            <div v-if="goal.targetDate" class="text-sm text-gray-500 min-w-[6rem]">
              {{ formatGoalDate(goal.targetDate) }}
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-1">
              <button
                @click.stop="toggleGoalFavorite(goal)"
                class="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <svg 
                  class="w-4 h-4" 
                  :class="goal.isFavorite ? 'text-yellow-500 fill-current' : ''"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
              <div class="relative">
                <button
                  @click.stop="toggleGoalMenu(goal.id)"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                <!-- Goal Menu Dropdown -->
                <div 
                  v-if="activeGoalMenu === goal.id"
                  class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
                >
                  <button
                    @click.stop="editGoal(goal)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Edit Goal
                  </button>
                  <button
                    @click.stop="duplicateGoal(goal)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Duplicate
                  </button>
                  <button
                    @click.stop="archiveGoal(goal)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {{ goal.isArchived ? 'Unarchive' : 'Archive' }}
                  </button>
                  <div class="border-t border-gray-100 my-1"></div>
                  <button
                    @click.stop="deleteGoal(goal)"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  goals: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits([
  'open-goal-modal',
  'goal-update',
  'goal-delete',
  'open-goal-details'
])

// Local state
const selectedFilter = ref('all')
const selectedTimeframe = ref('all')
const viewMode = ref('grid')
const activeGoalMenu = ref(null)

// Computed properties
const filteredGoals = computed(() => {
  let filtered = [...props.goals]

  // Apply status filter
  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(goal => {
      const status = getGoalStatus(goal)
      
      switch (selectedFilter.value) {
        case 'active':
          return status === 'Active' || status === 'In Progress'
        case 'completed':
          return status === 'Completed'
        case 'overdue':
          return status === 'Overdue'
        case 'upcoming':
          return status === 'Due Soon'
        default:
          return true
      }
    })
  }

  // Apply timeframe filter
  if (selectedTimeframe.value !== 'all') {
    const now = new Date()
    filtered = filtered.filter(goal => {
      if (!goal.targetDate) return false
      
      const targetDate = new Date(goal.targetDate)
      const timeDiff = targetDate.getTime() - now.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

      switch (selectedTimeframe.value) {
        case 'weekly':
          return daysDiff <= 7 && daysDiff >= 0
        case 'monthly':
          return daysDiff <= 30 && daysDiff >= 0
        case 'quarterly':
          return daysDiff <= 90 && daysDiff >= 0
        case 'yearly':
          return daysDiff <= 365 && daysDiff >= 0
        default:
          return true
      }
    })
  }

  // Sort by priority and due date
  return filtered.sort((a, b) => {
    // First sort by priority
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const aPriority = priorityOrder[a.priority] || 0
    const bPriority = priorityOrder[b.priority] || 0
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }

    // Then sort by due date
    if (a.targetDate && b.targetDate) {
      return new Date(a.targetDate) - new Date(b.targetDate)
    }
    
    return 0
  })
})

// Methods
const getGoalStatus = (goal) => {
  if (goal.currentProgress >= 100) {
    return 'Completed'
  }

  if (goal.targetDate) {
    const now = new Date()
    const targetDate = new Date(goal.targetDate)
    const timeDiff = targetDate.getTime() - now.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

    if (daysDiff < 0) {
      return 'Overdue'
    } else if (daysDiff <= 7) {
      return 'Due Soon'
    }
  }

  if (goal.currentProgress > 0) {
    return 'In Progress'
  }

  return 'Active'
}

const getGoalStatusClasses = (goal) => {
  const status = getGoalStatus(goal)
  
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Overdue':
      return 'bg-red-100 text-red-800'
    case 'Due Soon':
      return 'bg-yellow-100 text-yellow-800'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800'
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

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

const formatGoalDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const timeDiff = date.getTime() - now.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

  if (daysDiff === 0) {
    return 'Today'
  } else if (daysDiff === 1) {
    return 'Tomorrow'
  } else if (daysDiff === -1) {
    return 'Yesterday'
  } else if (daysDiff > 0 && daysDiff <= 7) {
    return `in ${daysDiff} days`
  } else if (daysDiff < 0 && daysDiff >= -7) {
    return `${Math.abs(daysDiff)} days ago`
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const toggleGoalMenu = (goalId) => {
  activeGoalMenu.value = activeGoalMenu.value === goalId ? null : goalId
}

const closeAllMenus = () => {
  activeGoalMenu.value = null
}

const openGoalDetails = (goal) => {
  emit('open-goal-details', goal)
}

const editGoal = (goal) => {
  // Emit event to edit goal
  console.log('Edit goal:', goal)
  closeAllMenus()
}

const duplicateGoal = (goal) => {
  const duplicatedGoal = {
    ...goal,
    id: `goal_${Date.now()}`,
    title: `${goal.title} (Copy)`,
    currentProgress: 0,
    createdAt: new Date().toISOString()
  }
  emit('goal-update', duplicatedGoal)
  closeAllMenus()
}

const archiveGoal = (goal) => {
  emit('goal-update', {
    ...goal,
    isArchived: !goal.isArchived
  })
  closeAllMenus()
}

const deleteGoal = (goal) => {
  if (confirm(`Are you sure you want to delete the goal "${goal.title}"? This action cannot be undone.`)) {
    emit('goal-delete', goal.id)
  }
  closeAllMenus()
}

const toggleGoalFavorite = (goal) => {
  emit('goal-update', {
    ...goal,
    isFavorite: !goal.isFavorite
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
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goal-card:hover,
.goal-row:hover {
  transform: translateY(-1px);
}

.goal-card,
.goal-row {
  transition: all 0.2s ease;
}
</style>