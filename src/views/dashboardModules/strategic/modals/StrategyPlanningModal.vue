<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-[#2F2E8B] rounded-t-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-chess text-2xl"></i>
            <div>
              <h2 class="text-xl font-bold">Strategic Planning</h2>
              <p class="text-blue-100 text-sm">Design comprehensive strategies to achieve your goals</p>
            </div>
          </div>
          <button @click="$emit('close')" class="hover:bg-blue-600 p-2 rounded-lg transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <form @submit.prevent="createStrategy" class="space-y-6">
          <!-- Strategy Overview -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Strategy Name *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="e.g., Digital Transformation Initiative"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Strategic Focus *
              </label>
              <select
                v-model="form.focus"
                required
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="">Select Focus Area</option>
                <option value="growth">Growth Strategy</option>
                <option value="efficiency">Operational Efficiency</option>
                <option value="innovation">Innovation & R&D</option>
                <option value="market-expansion">Market Expansion</option>
                <option value="cost-reduction">Cost Reduction</option>
                <option value="digital-transformation">Digital Transformation</option>
                <option value="sustainability">Sustainability</option>
                <option value="customer-experience">Customer Experience</option>
              </select>
            </div>
          </div>

          <!-- Strategy Description -->
          <div>
            <label class="block text-sm font-medium text-[#1F2937] mb-2">
              Strategy Overview
            </label>
            <textarea
              v-model="form.overview"
              rows="4"
              placeholder="Describe the strategic approach, context, and expected outcomes..."
              class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Strategic Analysis Framework -->
          <div class="bg-purple-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
              <i class="fas fa-analyze text-[#2F2E8B]"></i>
              Strategic Analysis
            </h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- SWOT Analysis -->
              <div>
                <h4 class="font-medium text-[#1F2937] mb-3">SWOT Analysis</h4>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-green-700 mb-1">Strengths</label>
                    <textarea
                      v-model="form.swot.strengths"
                      rows="3"
                      placeholder="Internal positive factors..."
                      class="w-full px-3 py-2 border border-green-200 bg-green-50 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-xs"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-red-700 mb-1">Weaknesses</label>
                    <textarea
                      v-model="form.swot.weaknesses"
                      rows="3"
                      placeholder="Internal negative factors..."
                      class="w-full px-3 py-2 border border-red-200 bg-red-50 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-xs"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-blue-700 mb-1">Opportunities</label>
                    <textarea
                      v-model="form.swot.opportunities"
                      rows="3"
                      placeholder="External positive factors..."
                      class="w-full px-3 py-2 border border-blue-200 bg-blue-50 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-yellow-700 mb-1">Threats</label>
                    <textarea
                      v-model="form.swot.threats"
                      rows="3"
                      placeholder="External negative factors..."
                      class="w-full px-3 py-2 border border-yellow-200 bg-yellow-50 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none text-xs"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Porter's Five Forces -->
              <div>
                <h4 class="font-medium text-[#1F2937] mb-3">Porter's Five Forces</h4>
                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-medium text-[#6B7280] mb-1">Competitive Rivalry</label>
                    <select v-model="form.porterForces.rivalry" class="w-full px-3 py-2 border border-gray-200 rounded-md text-xs">
                      <option value="">Select Impact</option>
                      <option value="low">Low Impact</option>
                      <option value="medium">Medium Impact</option>
                      <option value="high">High Impact</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#6B7280] mb-1">Supplier Power</label>
                    <select v-model="form.porterForces.supplierPower" class="w-full px-3 py-2 border border-gray-200 rounded-md text-xs">
                      <option value="">Select Impact</option>
                      <option value="low">Low Impact</option>
                      <option value="medium">Medium Impact</option>
                      <option value="high">High Impact</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#6B7280] mb-1">Buyer Power</label>
                    <select v-model="form.porterForces.buyerPower" class="w-full px-3 py-2 border border-gray-200 rounded-md text-xs">
                      <option value="">Select Impact</option>
                      <option value="low">Low Impact</option>
                      <option value="medium">Medium Impact</option>
                      <option value="high">High Impact</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#6B7280] mb-1">Threat of Substitutes</label>
                    <select v-model="form.porterForces.substitutes" class="w-full px-3 py-2 border border-gray-200 rounded-md text-xs">
                      <option value="">Select Impact</option>
                      <option value="low">Low Impact</option>
                      <option value="medium">Medium Impact</option>
                      <option value="high">High Impact</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-[#6B7280] mb-1">Threat of New Entry</label>
                    <select v-model="form.porterForces.newEntry" class="w-full px-3 py-2 border border-gray-200 rounded-md text-xs">
                      <option value="">Select Impact</option>
                      <option value="low">Low Impact</option>
                      <option value="medium">Medium Impact</option>
                      <option value="high">High Impact</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Strategic Objectives -->
          <div>
            <div class="flex items-center justify-between mb-4">
              <label class="block text-sm font-medium text-[#1F2937]">
                Strategic Objectives
              </label>
              <button
                type="button"
                @click="addObjective"
                class="bg-[#059669] hover:bg-[#047857] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 transition-colors"
              >
                <i class="fas fa-plus"></i>
                Add Objective
              </button>
            </div>

            <div v-for="(objective, index) in form.objectives" :key="index" class="bg-gray-50 rounded-lg p-4 mb-3">
              <div class="grid md:grid-cols-4 gap-4 mb-3">
                <div class="md:col-span-2">
                  <label class="block text-xs text-[#6B7280] mb-1">Objective Title</label>
                  <input
                    v-model="objective.title"
                    type="text"
                    placeholder="e.g., Increase Market Share"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Priority</label>
                  <select
                    v-model="objective.priority"
                    class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
                <div class="flex items-end">
                  <button
                    type="button"
                    @click="removeObjective(index)"
                    class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors w-full"
                  >
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Description</label>
                <textarea
                  v-model="objective.description"
                  rows="2"
                  placeholder="Describe the objective and expected outcomes..."
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none text-sm"
                ></textarea>
              </div>
            </div>

            <div v-if="form.objectives.length === 0" class="text-center py-8 text-[#6B7280]">
              <i class="fas fa-bullseye text-2xl mb-2"></i>
              <p>No objectives defined yet. Click "Add Objective" to set strategic targets.</p>
            </div>
          </div>

          <!-- Implementation Timeline -->
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Implementation Phase
              </label>
              <select
                v-model="form.phase"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="planning">Planning Phase</option>
                <option value="pilot">Pilot Phase</option>
                <option value="rollout">Full Rollout</option>
                <option value="optimization">Optimization</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

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
                Target Completion
              </label>
              <input
                v-model="form.targetDate"
                type="date"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>
          </div>

          <!-- Resource Requirements -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Budget Allocation
              </label>
              <div class="relative">
                <span class="absolute left-3 top-3 text-[#6B7280]">$</span>
                <input
                  v-model="form.budget"
                  type="number"
                  placeholder="0"
                  class="w-full pl-8 pr-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Risk Level
              </label>
              <select
                v-model="form.riskLevel"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
                <option value="critical">Critical Risk</option>
              </select>
            </div>
          </div>

          <!-- Success Metrics -->
          <div>
            <label class="block text-sm font-medium text-[#1F2937] mb-2">
              Success Criteria & Metrics
            </label>
            <textarea
              v-model="form.successMetrics"
              rows="3"
              placeholder="Define how success will be measured (KPIs, benchmarks, milestones)..."
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
              Create Strategy
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close', 'strategy-created'])

const form = reactive({
  name: '',
  focus: '',
  overview: '',
  swot: {
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: ''
  },
  porterForces: {
    rivalry: '',
    supplierPower: '',
    buyerPower: '',
    substitutes: '',
    newEntry: ''
  },
  objectives: [],
  phase: 'planning',
  startDate: '',
  targetDate: '',
  budget: '',
  riskLevel: 'medium',
  successMetrics: ''
})

const addObjective = () => {
  form.objectives.push({
    title: '',
    description: '',
    priority: 'medium'
  })
}

const removeObjective = (index) => {
  form.objectives.splice(index, 1)
}

const saveDraft = () => {
  const strategyData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    progress: 0
  }

  // Save to localStorage
  const existingStrategies = JSON.parse(localStorage.getItem('strategic_strategies') || '[]')
  existingStrategies.push(strategyData)
  localStorage.setItem('strategic_strategies', JSON.stringify(existingStrategies))

  emit('strategy-created', strategyData)
  emit('close')
}

const createStrategy = () => {
  if (!form.name || !form.focus) {
    alert('Please fill in the required fields (Strategy Name and Focus Area)')
    return
  }

  const strategyData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    progress: 0
  }

  // Save to localStorage
  const existingStrategies = JSON.parse(localStorage.getItem('strategic_strategies') || '[]')
  existingStrategies.push(strategyData)
  localStorage.setItem('strategic_strategies', JSON.stringify(existingStrategies))

  emit('strategy-created', strategyData)
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