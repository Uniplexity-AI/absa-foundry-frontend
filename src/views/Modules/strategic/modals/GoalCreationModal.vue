<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-[#2F2E8B] rounded-t-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-bullseye text-2xl"></i>
            <div>
              <h2 class="text-xl font-bold">Create Strategic Goal</h2>
              <p class="text-blue-100 text-sm">Define clear, measurable objectives</p>
            </div>
          </div>
          <button @click="$emit('close')" class="hover:bg-blue-600 p-2 rounded-lg transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <form @submit.prevent="createGoal" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Goal Title *
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="e.g., Increase Revenue by 25%"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Category *
              </label>
              <select
                v-model="form.category"
                required
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="financial">Financial</option>
                <option value="customer">Customer</option>
                <option value="process">Internal Process</option>
                <option value="learning">Learning & Growth</option>
                <option value="operational">Operational</option>
                <option value="strategic">Strategic</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-[#1F2937] mb-2">
              Description
            </label>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Provide detailed context and rationale for this goal..."
              class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- SMART Goals Framework -->
          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
              <i class="fas fa-target text-[#2F2E8B]"></i>
              SMART Goals Framework
            </h3>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Specific -->
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  <span class="text-[#2F2E8B] font-bold">S</span>pecific
                </label>
                <textarea
                  v-model="form.smart.specific"
                  rows="2"
                  placeholder="What exactly will be accomplished?"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
                ></textarea>
              </div>

              <!-- Measurable -->
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  <span class="text-[#2F2E8B] font-bold">M</span>easurable
                </label>
                <textarea
                  v-model="form.smart.measurable"
                  rows="2"
                  placeholder="How will progress be measured?"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
                ></textarea>
              </div>

              <!-- Achievable -->
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  <span class="text-[#2F2E8B] font-bold">A</span>chievable
                </label>
                <textarea
                  v-model="form.smart.achievable"
                  rows="2"
                  placeholder="Is this goal realistic?"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
                ></textarea>
              </div>

              <!-- Relevant -->
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  <span class="text-[#2F2E8B] font-bold">R</span>elevant
                </label>
                <textarea
                  v-model="form.smart.relevant"
                  rows="2"
                  placeholder="Why does this goal matter?"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
                ></textarea>
              </div>

              <!-- Time-bound -->
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  <span class="text-[#2F2E8B] font-bold">T</span>ime-bound
                </label>
                <textarea
                  v-model="form.smart.timeBound"
                  rows="2"
                  placeholder="When will this be completed?"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Timeline & Metrics -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Timeline -->
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Timeline
              </label>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Start Date</label>
                  <input
                    v-model="form.startDate"
                    type="date"
                    class="w-full px-3 py-2 border border-[#F1F1F1] rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Target Date</label>
                  <input
                    v-model="form.targetDate"
                    type="date"
                    class="w-full px-3 py-2 border border-[#F1F1F1] rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Priority & Status -->
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Priority & Status
              </label>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Priority</label>
                  <select
                    v-model="form.priority"
                    class="w-full px-3 py-2 border border-[#F1F1F1] rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
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
                    v-model="form.status"
                    class="w-full px-3 py-2 border border-[#F1F1F1] rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Performance Indicators -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <label class="block text-sm font-medium text-[#1F2937]">
                Key Performance Indicators
              </label>
              <button
                type="button"
                @click="addKPI"
                class="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors"
              >
                <i class="fas fa-plus"></i>
                Add KPI
              </button>
            </div>

            <div v-for="(kpi, index) in form.kpis" :key="index" class="bg-gray-50 rounded-lg p-4 mb-3">
              <div class="grid md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">KPI Name</label>
                  <input
                    v-model="kpi.name"
                    type="text"
                    placeholder="e.g., Revenue Growth"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Target Value</label>
                  <input
                    v-model="kpi.target"
                    type="text"
                    placeholder="e.g., 25%"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  />
                </div>
                <div class="flex items-end gap-2">
                  <div class="flex-1">
                    <label class="block text-xs text-[#6B7280] mb-1">Unit</label>
                    <input
                      v-model="kpi.unit"
                      type="text"
                      placeholder="%, $, units"
                      class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeKPI(index)"
                    class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors"
                  >
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="form.kpis.length === 0" class="text-center py-8 text-[#6B7280]">
              <i class="fas fa-chart-line text-2xl mb-2"></i>
              <p>No KPIs defined yet. Click "Add KPI" to start tracking metrics.</p>
            </div>
          </div>

          <!-- Owner Assignment -->
          <div>
            <label class="block text-sm font-medium text-[#1F2937] mb-2">
              Goal Owner
            </label>
            <select
              v-model="form.owner"
              class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
            >
              <option value="">Select Owner</option>
              <option value="ceo">CEO</option>
              <option value="cfo">CFO</option>
              <option value="coo">COO</option>
              <option value="sales-director">Sales Director</option>
              <option value="operations-manager">Operations Manager</option>
              <option value="hr-director">HR Director</option>
              <option value="it-director">IT Director</option>
            </select>
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
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['close', 'goal-created'])

const form = reactive({
  title: '',
  category: '',
  description: '',
  smart: {
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  },
  startDate: '',
  targetDate: '',
  priority: 'medium',
  status: 'draft',
  owner: '',
  kpis: []
})

const addKPI = () => {
  form.kpis.push({
    name: '',
    target: '',
    unit: '',
    currentValue: 0
  })
}

const removeKPI = (index) => {
  form.kpis.splice(index, 1)
}

const saveDraft = () => {
  const goalData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: 0
  }

  // Save to localStorage
  const existingGoals = JSON.parse(localStorage.getItem('strategic_goals') || '[]')
  existingGoals.push(goalData)
  localStorage.setItem('strategic_goals', JSON.stringify(existingGoals))

  emit('goal-created', goalData)
  emit('close')
}

const createGoal = () => {
  if (!form.title || !form.category) {
    alert('Please fill in the required fields (Title and Category)')
    return
  }

  const goalData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    progress: 0,
    status: 'active'
  }

  // Save to localStorage
  const existingGoals = JSON.parse(localStorage.getItem('strategic_goals') || '[]')
  existingGoals.push(goalData)
  localStorage.setItem('strategic_goals', JSON.stringify(existingGoals))

  emit('goal-created', goalData)
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