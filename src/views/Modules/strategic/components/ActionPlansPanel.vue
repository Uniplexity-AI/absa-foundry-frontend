<template>
  <div class="action-plans-panel bg-white rounded-lg shadow-none border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Action Plans</h2>
      <button
        @click="$emit('open-action-plan-modal')"
        class="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Action Plan</span>
      </button>
    </div>

    <!-- Action Plans Filter and Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
      <div class="flex items-center space-x-3">
        <select
          v-model="selectedStatus"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="completed">Completed</option>
        </select>
        
        <select
          v-model="selectedAssignee"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Assignees</option>
          <option
            v-for="assignee in uniqueAssignees"
            :key="assignee"
            :value="assignee"
          >
            {{ assignee }}
          </option>
        </select>

        <select
          v-model="selectedPriority"
          class="text-sm border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-500">{{ filteredActionPlans.length }} plan{{ filteredActionPlans.length !== 1 ? 's' : '' }}</span>
        <div class="flex space-x-1">
          <button
            @click="viewMode = 'kanban'"
            :class="viewMode === 'kanban' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'"
            class="p-2 rounded-sm hover:bg-gray-100"
            title="Kanban View"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </button>
          <button
            @click="viewMode = 'timeline'"
            :class="viewMode === 'timeline' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'"
            class="p-2 rounded-sm hover:bg-gray-100"
            title="Timeline View"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'"
            class="p-2 rounded-sm hover:bg-gray-100"
            title="List View"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredActionPlans.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ selectedStatus === 'all' ? 'No action plans created yet' : `No ${selectedStatus} action plans` }}
      </h3>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        {{ selectedStatus === 'all' 
          ? 'Create action plans to break down your strategies into executable tasks and track progress.'
          : `There are currently no action plans with "${selectedStatus}" status.`
        }}
      </p>
      <button
        @click="$emit('open-action-plan-modal')"
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Create Your First Action Plan
      </button>
    </div>

    <!-- Kanban View -->
    <div v-else-if="viewMode === 'kanban'" class="kanban-board">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="status in kanbanColumns"
          :key="status.key"
          class="kanban-column"
        >
          <div class="kanban-header p-3 rounded-t-lg" :class="status.bgColor">
            <h3 class="font-medium text-white">{{ status.label }}</h3>
            <span class="text-xs opacity-90">{{ getActionPlansByStatus(status.key).length }} plans</span>
          </div>
          <div class="kanban-body bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 p-3 min-h-[400px]">
            <div class="space-y-3">
              <div
                v-for="actionPlan in getActionPlansByStatus(status.key)"
                :key="actionPlan.id"
                class="action-plan-card bg-white rounded-lg p-4 shadow-none hover:shadow-md transition-shadow cursor-pointer"
                @click="openActionPlanDetails(actionPlan)"
              >
                <div class="flex items-start justify-between mb-2">
                  <h4 class="font-medium text-gray-900 text-sm">{{ actionPlan.title }}</h4>
                  <div class="flex items-center space-x-1">
                    <div 
                      class="w-2 h-2 rounded-full"
                      :class="getPriorityColor(actionPlan.priority)"
                    ></div>
                    <button
                      @click.stop="toggleActionPlanMenu(actionPlan.id)"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <p v-if="actionPlan.description" class="text-xs text-gray-600 mb-3 line-clamp-2">
                  {{ actionPlan.description }}
                </p>

                <!-- Progress Bar -->
                <div class="mb-3">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-500">Progress</span>
                    <span class="text-xs text-gray-600">{{ actionPlan.progress || 0 }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      class="h-1.5 rounded-full transition-all duration-300"
                      :class="getProgressBarColor(actionPlan.progress)"
                      :style="{ width: `${actionPlan.progress || 0}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Assignee and Due Date -->
                <div class="flex items-center justify-between text-xs text-gray-500">
                  <div v-if="actionPlan.assignedTo" class="flex items-center">
                    <div class="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center mr-1">
                      <span class="text-xs font-medium text-gray-600">
                        {{ getInitials(actionPlan.assignedTo) }}
                      </span>
                    </div>
                    <span class="truncate">{{ actionPlan.assignedTo }}</span>
                  </div>
                  <div v-if="actionPlan.dueDate" class="flex items-center">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ formatActionPlanDate(actionPlan.dueDate) }}</span>
                  </div>
                </div>

                <!-- Action Plan Menu Dropdown -->
                <div 
                  v-if="activeActionPlanMenu === actionPlan.id"
                  class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
                >
                  <button
                    @click.stop="editActionPlan(actionPlan)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Edit Action Plan
                  </button>
                  <button
                    @click.stop="duplicateActionPlan(actionPlan)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Duplicate
                  </button>
                  <div class="border-t border-gray-100 my-1"></div>
                  <button
                    @click.stop="deleteActionPlan(actionPlan)"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div v-if="getActionPlansByStatus(status.key).length === 0" class="text-center py-8">
                <p class="text-sm text-gray-400">No {{ status.label.toLowerCase() }} plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline View -->
    <div v-else-if="viewMode === 'timeline'" class="timeline-view">
      <div class="space-y-6">
        <div
          v-for="(plansByMonth, monthKey) in actionPlansByMonth"
          :key="monthKey"
          class="timeline-month"
        >
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ formatMonthLabel(monthKey) }}</h3>
          <div class="space-y-3">
            <div
              v-for="actionPlan in plansByMonth"
              :key="actionPlan.id"
              class="timeline-item bg-white border border-gray-200 rounded-lg p-4 hover:shadow-none transition-shadow cursor-pointer"
              @click="openActionPlanDetails(actionPlan)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h4 class="font-medium text-gray-900">{{ actionPlan.title }}</h4>
                    <span 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                      :class="getActionPlanStatusClasses(actionPlan)"
                    >
                      {{ getActionPlanStatus(actionPlan) }}
                    </span>
                    <div 
                      class="w-2 h-2 rounded-full"
                      :class="getPriorityColor(actionPlan.priority)"
                    ></div>
                  </div>
                  <p v-if="actionPlan.description" class="text-sm text-gray-600 mb-2">
                    {{ actionPlan.description }}
                  </p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <div v-if="actionPlan.assignedTo" class="flex items-center">
                      <div class="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center mr-1">
                        <span class="text-xs font-medium text-gray-600">
                          {{ getInitials(actionPlan.assignedTo) }}
                        </span>
                      </div>
                      <span>{{ actionPlan.assignedTo }}</span>
                    </div>
                    <div v-if="actionPlan.dueDate">
                      Due: {{ formatActionPlanDate(actionPlan.dueDate) }}
                    </div>
                  </div>
                </div>
                <div class="ml-4 text-right">
                  <div class="text-lg font-semibold text-gray-900">{{ actionPlan.progress || 0 }}%</div>
                  <div class="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getProgressBarColor(actionPlan.progress)"
                      :style="{ width: `${actionPlan.progress || 0}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="list-view">
      <div class="space-y-3">
        <div
          v-for="actionPlan in filteredActionPlans"
          :key="actionPlan.id"
          class="action-plan-row bg-white border border-gray-200 rounded-lg p-4 hover:shadow-none transition-shadow cursor-pointer"
          @click="openActionPlanDetails(actionPlan)"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="font-medium text-gray-900">{{ actionPlan.title }}</h3>
                <span 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="getActionPlanStatusClasses(actionPlan)"
                >
                  {{ getActionPlanStatus(actionPlan) }}
                </span>
                <div 
                  class="w-2 h-2 rounded-full"
                  :class="getPriorityColor(actionPlan.priority)"
                ></div>
                <span v-if="actionPlan.priority" class="text-xs text-gray-500 capitalize">
                  {{ actionPlan.priority }} priority
                </span>
              </div>
              <p v-if="actionPlan.description" class="text-sm text-gray-600 mb-2 line-clamp-1">
                {{ actionPlan.description }}
              </p>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div v-if="actionPlan.assignedTo" class="flex items-center">
                  <div class="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center mr-1">
                    <span class="text-xs font-medium text-gray-600">
                      {{ getInitials(actionPlan.assignedTo) }}
                    </span>
                  </div>
                  <span>{{ actionPlan.assignedTo }}</span>
                </div>
                <div v-if="actionPlan.dueDate">
                  Due: {{ formatActionPlanDate(actionPlan.dueDate) }}
                </div>
                <div v-if="actionPlan.tasks">
                  {{ getCompletedTasksCount(actionPlan) }}/{{ actionPlan.tasks.length }} tasks
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-4 ml-4">
              <!-- Progress -->
              <div class="flex items-center space-x-2">
                <div class="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-300"
                    :class="getProgressBarColor(actionPlan.progress)"
                    :style="{ width: `${actionPlan.progress || 0}%` }"
                  ></div>
                </div>
                <span class="text-sm text-gray-600 font-medium min-w-[3rem]">
                  {{ actionPlan.progress || 0 }}%
                </span>
              </div>

              <!-- Actions -->
              <div class="relative">
                <button
                  @click.stop="toggleActionPlanMenu(actionPlan.id)"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                <!-- Action Plan Menu Dropdown -->
                <div 
                  v-if="activeActionPlanMenu === actionPlan.id"
                  class="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
                >
                  <button
                    @click.stop="editActionPlan(actionPlan)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Edit Action Plan
                  </button>
                  <button
                    @click.stop="duplicateActionPlan(actionPlan)"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Duplicate
                  </button>
                  <div class="border-t border-gray-100 my-1"></div>
                  <button
                    @click.stop="deleteActionPlan(actionPlan)"
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

    <!-- Action Plans Analytics Summary -->
    <div v-if="actionPlans.length > 0" class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ actionPlans.length }}</div>
        <div class="text-sm opacity-90">Total Plans</div>
      </div>
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ getInProgressPlansCount() }}</div>
        <div class="text-sm opacity-90">In Progress</div>
      </div>
      <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ Math.round(getAverageProgress()) }}%</div>
        <div class="text-sm opacity-90">Avg Progress</div>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ getOverduePlansCount() }}</div>
        <div class="text-sm opacity-90">Overdue</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  actionPlans: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits([
  'open-action-plan-modal',
  'action-plan-update',
  'action-plan-delete',
  'open-action-plan-details'
])

// Local state
const selectedStatus = ref('all')
const selectedAssignee = ref('all')
const selectedPriority = ref('all')
const viewMode = ref('kanban')
const activeActionPlanMenu = ref(null)

// Kanban columns
const kanbanColumns = [
  { key: 'not-started', label: 'Not Started', bgColor: 'bg-gray-600' },
  { key: 'in-progress', label: 'In Progress', bgColor: 'bg-blue-600' },
  { key: 'blocked', label: 'Blocked', bgColor: 'bg-red-600' },
  { key: 'completed', label: 'Completed', bgColor: 'bg-green-600' }
]

// Computed properties
const uniqueAssignees = computed(() => {
  const assignees = new Set()
  props.actionPlans.forEach(plan => {
    if (plan.assignedTo) {
      assignees.add(plan.assignedTo)
    }
  })
  return Array.from(assignees).sort()
})

const filteredActionPlans = computed(() => {
  let filtered = [...props.actionPlans]

  // Apply status filter
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(plan => getActionPlanStatus(plan).toLowerCase().replace(' ', '-') === selectedStatus.value)
  }

  // Apply assignee filter
  if (selectedAssignee.value !== 'all') {
    filtered = filtered.filter(plan => plan.assignedTo === selectedAssignee.value)
  }

  // Apply priority filter
  if (selectedPriority.value !== 'all') {
    filtered = filtered.filter(plan => plan.priority === selectedPriority.value)
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
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    
    return 0
  })
})

const actionPlansByMonth = computed(() => {
  const plansByMonth = {}
  
  filteredActionPlans.value.forEach(plan => {
    if (plan.dueDate) {
      const date = new Date(plan.dueDate)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      if (!plansByMonth[monthKey]) {
        plansByMonth[monthKey] = []
      }
      plansByMonth[monthKey].push(plan)
    }
  })
  
  // Sort months
  const sortedMonths = Object.keys(plansByMonth).sort()
  const result = {}
  sortedMonths.forEach(month => {
    result[month] = plansByMonth[month].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  })
  
  return result
})

// Methods
const getActionPlanStatus = (actionPlan) => {
  if (actionPlan.status === 'completed' || actionPlan.progress >= 100) {
    return 'Completed'
  }
  
  if (actionPlan.status === 'blocked') {
    return 'Blocked'
  }
  
  if (actionPlan.status === 'in-progress' || actionPlan.progress > 0) {
    return 'In Progress'
  }
  
  return 'Not Started'
}

const getActionPlanStatusClasses = (actionPlan) => {
  const status = getActionPlanStatus(actionPlan)
  
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'In Progress':
      return 'bg-blue-100 text-blue-800'
    case 'Blocked':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getActionPlansByStatus = (status) => {
  return filteredActionPlans.value.filter(plan => 
    getActionPlanStatus(plan).toLowerCase().replace(' ', '-') === status
  )
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

const getInitials = (name) => {
  return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase().substring(0, 2)
}

const formatActionPlanDate = (dateString) => {
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

const formatMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1, 1)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

const getCompletedTasksCount = (actionPlan) => {
  if (!actionPlan.tasks) return 0
  return actionPlan.tasks.filter(task => task.completed).length
}

const getInProgressPlansCount = () => {
  return props.actionPlans.filter(plan => getActionPlanStatus(plan) === 'In Progress').length
}

const getOverduePlansCount = () => {
  const now = new Date()
  return props.actionPlans.filter(plan => {
    if (!plan.dueDate) return false
    const dueDate = new Date(plan.dueDate)
    return dueDate < now && getActionPlanStatus(plan) !== 'Completed'
  }).length
}

const getAverageProgress = () => {
  if (props.actionPlans.length === 0) return 0
  const totalProgress = props.actionPlans.reduce((sum, plan) => sum + (plan.progress || 0), 0)
  return totalProgress / props.actionPlans.length
}

const toggleActionPlanMenu = (actionPlanId) => {
  activeActionPlanMenu.value = activeActionPlanMenu.value === actionPlanId ? null : actionPlanId
}

const closeAllMenus = () => {
  activeActionPlanMenu.value = null
}

const openActionPlanDetails = (actionPlan) => {
  emit('open-action-plan-details', actionPlan)
}

const editActionPlan = (actionPlan) => {
  console.log('Edit action plan:', actionPlan)
  closeAllMenus()
}

const duplicateActionPlan = (actionPlan) => {
  const duplicatedActionPlan = {
    ...actionPlan,
    id: `action_${Date.now()}`,
    title: `${actionPlan.title} (Copy)`,
    progress: 0,
    createdAt: new Date().toISOString()
  }
  emit('action-plan-update', duplicatedActionPlan)
  closeAllMenus()
}

const deleteActionPlan = (actionPlan) => {
  if (confirm(`Are you sure you want to delete the action plan "${actionPlan.title}"? This action cannot be undone.`)) {
    emit('action-plan-delete', actionPlan.id)
  }
  closeAllMenus()
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

.action-plan-card:hover,
.action-plan-row:hover,
.timeline-item:hover {
  transform: translateY(-1px);
}

.action-plan-card,
.action-plan-row,
.timeline-item {
  transition: all 0.2s ease;
}

.kanban-column {
  min-height: 500px;
}

.kanban-body {
  max-height: 600px;
  overflow-y: auto;
}
</style>
