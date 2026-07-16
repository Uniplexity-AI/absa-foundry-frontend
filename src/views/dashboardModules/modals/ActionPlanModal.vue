<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-[#2F2E8B] rounded-t-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-tasks text-2xl"></i>
            <div>
              <h2 class="text-xl font-bold">Create Action Plan</h2>
              <p class="text-blue-100 text-sm">Break down strategies into executable tasks</p>
            </div>
          </div>
          <button @click="$emit('close')" class="hover:bg-blue-600 p-2 rounded-lg transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <form @submit.prevent="createActionPlan" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Action Plan Title *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="e.g., Q1 Sales Campaign Implementation"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Related Strategy
              </label>
              <select
                v-model="form.strategyId"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="">Select Strategy (Optional)</option>
                <option v-for="strategy in availableStrategies" :key="strategy.id" :value="strategy.id">
                  {{ strategy.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-[#1F2937] mb-2">
              Plan Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Describe the purpose and context of this action plan..."
              class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Timeline & Priority -->
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Start Date
              </label>
              <input
                v-model="form.startDate"
                type="date"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Target End Date
              </label>
              <input
                v-model="form.endDate"
                type="date"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Priority Level
              </label>
              <select
                v-model="form.priority"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <!-- Tasks Section -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <label class="block text-sm font-medium text-[#1F2937]">
                Action Items & Tasks
              </label>
              <button
                type="button"
                @click="addTask"
                class="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors"
              >
                <i class="fas fa-plus"></i>
                Add Task
              </button>
            </div>

            <div v-for="(task, index) in form.tasks" :key="index" class="bg-gray-50 rounded-lg p-4 mb-4 border-l-4" :class="getTaskBorderColor(task.priority)">
              <div class="grid md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Task Title</label>
                  <input
                    v-model="task.title"
                    type="text"
                    placeholder="e.g., Design marketing materials"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Assignee</label>
                  <select
                    v-model="task.assignee"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  >
                    <option value="">Unassigned</option>
                    <option value="ceo">CEO</option>
                    <option value="cfo">CFO</option>
                    <option value="coo">COO</option>
                    <option value="sales-manager">Sales Manager</option>
                    <option value="marketing-manager">Marketing Manager</option>
                    <option value="operations-manager">Operations Manager</option>
                    <option value="hr-manager">HR Manager</option>
                    <option value="it-manager">IT Manager</option>
                  </select>
                </div>
              </div>

              <div class="grid md:grid-cols-4 gap-4 mb-3">
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Priority</label>
                  <select
                    v-model="task.priority"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Status</label>
                  <select
                    v-model="task.status"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Due Date</label>
                  <input
                    v-model="task.dueDate"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  />
                </div>
                <div class="flex items-end">
                  <button
                    type="button"
                    @click="removeTask(index)"
                    class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors w-full"
                  >
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Task Description</label>
                <textarea
                  v-model="task.description"
                  rows="2"
                  placeholder="Detailed description of the task and requirements..."
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
                ></textarea>
              </div>

              <!-- Subtasks -->
              <div class="mt-3">
                <div class="flex items-center justify-between mb-2">
                  <label class="block text-xs text-[#6B7280]">Subtasks</label>
                  <button
                    type="button"
                    @click="addSubtask(index)"
                    class="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    <i class="fas fa-plus mr-1"></i>Add Subtask
                  </button>
                </div>
                <div v-for="(subtask, subIndex) in task.subtasks" :key="subIndex" class="flex items-center gap-2 mb-1">
                  <input
                    v-model="subtask.title"
                    type="text"
                    placeholder="Subtask description"
                    class="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                  />
                  <button
                    type="button"
                    @click="toggleSubtaskComplete(index, subIndex)"
                    :class="[
                      'px-2 py-1 rounded text-xs transition-colors',
                      subtask.completed 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                    ]"
                  >
                    <i :class="subtask.completed ? 'fas fa-check' : 'far fa-square'"></i>
                  </button>
                  <button
                    type="button"
                    @click="removeSubtask(index, subIndex)"
                    class="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="form.tasks.length === 0" class="text-center py-8 text-[#6B7280]">
              <i class="fas fa-clipboard-list text-2xl mb-2"></i>
              <p>No tasks defined yet. Click "Add Task" to start building your action plan.</p>
            </div>
          </div>

          <!-- Dependencies & Resources -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Dependencies
              </label>
              <textarea
                v-model="form.dependencies"
                rows="3"
                placeholder="List any dependencies, prerequisites, or blockers..."
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Required Resources
              </label>
              <textarea
                v-model="form.resources"
                rows="3"
                placeholder="Budget, tools, personnel, or other resources needed..."
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Success Metrics -->
          <div>
            <label class="block text-sm font-medium text-[#1F2937] mb-2">
              Success Metrics & KPIs
            </label>
            <textarea
              v-model="form.successMetrics"
              rows="3"
              placeholder="Define how success will be measured for this action plan..."
              class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-end gap-4 pt-6 border-t border-[#F1F1F1]">
            <button
              type="button"
              @click="$emit('close')"
              class="px-6 py-2 text-[#6B7280] hover:text-[#1F2937] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="saveDraft"
              class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              class="bg-[#2F2E8B] hover:bg-[#252470] text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <i class="fas fa-plus"></i>
              Create Action Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['close', 'action-plan-created'])

const form = reactive({
  title: '',
  strategyId: '',
  description: '',
  startDate: '',
  endDate: '',
  priority: 'medium',
  tasks: [],
  dependencies: '',
  resources: '',
  successMetrics: ''
})

// Mock data for available strategies
const availableStrategies = computed(() => {
  return JSON.parse(localStorage.getItem('strategic_strategies') || '[]')
})

const addTask = () => {
  form.tasks.push({
    title: '',
    description: '',
    assignee: '',
    priority: 'medium',
    status: 'not-started',
    dueDate: '',
    subtasks: []
  })
}

const removeTask = (index) => {
  form.tasks.splice(index, 1)
}

const addSubtask = (taskIndex) => {
  form.tasks[taskIndex].subtasks.push({
    title: '',
    completed: false
  })
}

const removeSubtask = (taskIndex, subtaskIndex) => {
  form.tasks[taskIndex].subtasks.splice(subtaskIndex, 1)
}

const toggleSubtaskComplete = (taskIndex, subtaskIndex) => {
  form.tasks[taskIndex].subtasks[subtaskIndex].completed = !form.tasks[taskIndex].subtasks[subtaskIndex].completed
}

const getTaskBorderColor = (priority) => {
  switch (priority) {
    case 'critical': return 'border-red-500'
    case 'high': return 'border-orange-500'
    case 'medium': return 'border-yellow-500'
    case 'low': return 'border-green-500'
    default: return 'border-gray-300'
  }
}

const saveDraft = () => {
  const actionPlanData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    progress: 0
  }

  // Save to localStorage
  const existingPlans = JSON.parse(localStorage.getItem('strategic_action_plans') || '[]')
  existingPlans.push(actionPlanData)
  localStorage.setItem('strategic_action_plans', JSON.stringify(existingPlans))

  emit('action-plan-created', actionPlanData)
  emit('close')
}

const createActionPlan = () => {
  if (!form.title) {
    alert('Please enter an action plan title')
    return
  }

  const actionPlanData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    progress: 0
  }

  // Save to localStorage
  const existingPlans = JSON.parse(localStorage.getItem('strategic_action_plans') || '[]')
  existingPlans.push(actionPlanData)
  localStorage.setItem('strategic_action_plans', JSON.stringify(existingPlans))

  emit('action-plan-created', actionPlanData)
  emit('close')
}
</script>

<style scoped>
/* Custom scrollbar for modal */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>