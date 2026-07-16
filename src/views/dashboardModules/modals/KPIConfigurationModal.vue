<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="bg-[#2F2E8B] rounded-t-2xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <i class="fas fa-chart-line text-2xl"></i>
            <div>
              <h2 class="text-xl font-bold">KPI Configuration</h2>
              <p class="text-blue-100 text-sm">Define and configure Key Performance Indicators</p>
            </div>
          </div>
          <button @click="$emit('close')" class="hover:bg-blue-600 p-2 rounded-lg transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <form @submit.prevent="createKPI" class="space-y-6">
          <!-- Basic KPI Information -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                KPI Name *
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="e.g., Monthly Revenue Growth"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                KPI Category *
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
                <option value="quality">Quality</option>
                <option value="safety">Safety & Compliance</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">Human Resources</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-[#1F2937] mb-2">
              KPI Description
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Describe what this KPI measures and why it's important..."
              class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Measurement Configuration -->
          <div class="bg-blue-50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
              <i class="fas fa-ruler text-[#2F2E8B]"></i>
              Measurement Configuration
            </h3>
            
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Measurement Unit
                </label>
                <select
                  v-model="form.unit"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="currency">Currency ($)</option>
                  <option value="number">Number</option>
                  <option value="ratio">Ratio</option>
                  <option value="days">Days</option>
                  <option value="hours">Hours</option>
                  <option value="count">Count</option>
                  <option value="score">Score (1-10)</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div v-if="form.unit === 'custom'">
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Custom Unit
                </label>
                <input
                  v-model="form.customUnit"
                  type="text"
                  placeholder="e.g., tickets, orders, etc."
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Measurement Frequency
                </label>
                <select
                  v-model="form.frequency"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                  <option value="real-time">Real-time</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#1F2937] mb-2">
                  Data Source
                </label>
                <select
                  v-model="form.dataSource"
                  class="w-full px-3 py-2 border border-blue-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                >
                  <option value="manual">Manual Entry</option>
                  <option value="pos">POS System</option>
                  <option value="crm">CRM System</option>
                  <option value="inventory">Inventory System</option>
                  <option value="reports">Reports Module</option>
                  <option value="payroll">Payroll System</option>
                  <option value="external">External API</option>
                  <option value="calculated">Calculated/Formula</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Target Configuration -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-green-50 rounded-lg p-4">
              <h4 class="font-medium text-[#1F2937] mb-3 flex items-center gap-2">
                <i class="fas fa-bullseye text-green-600"></i>
                Target Values
              </h4>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Target Value</label>
                  <input
                    v-model="form.targets.target"
                    type="number"
                    step="0.01"
                    placeholder="Target to achieve"
                    class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Minimum Acceptable</label>
                  <input
                    v-model="form.targets.minimum"
                    type="number"
                    step="0.01"
                    placeholder="Minimum threshold"
                    class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Stretch Goal</label>
                  <input
                    v-model="form.targets.stretch"
                    type="number"
                    step="0.01"
                    placeholder="Aspirational target"
                    class="w-full px-3 py-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div class="bg-orange-50 rounded-lg p-4">
              <h4 class="font-medium text-[#1F2937] mb-3 flex items-center gap-2">
                <i class="fas fa-exclamation-triangle text-orange-600"></i>
                Alert Thresholds
              </h4>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Critical Alert (&lt;)</label>
                  <input
                    v-model="form.alerts.critical"
                    type="number"
                    step="0.01"
                    placeholder="Critical threshold"
                    class="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Warning Alert (&lt;)</label>
                  <input
                    v-model="form.alerts.warning"
                    type="number"
                    step="0.01"
                    placeholder="Warning threshold"
                    class="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label class="block text-xs text-[#6B7280] mb-1">Notification Email</label>
                  <input
                    v-model="form.alerts.email"
                    type="email"
                    placeholder="alert@company.com"
                    class="w-full px-3 py-2 border border-orange-200 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Calculation Formula (for calculated KPIs) -->
          <div v-if="form.dataSource === 'calculated'" class="bg-purple-50 rounded-lg p-4">
            <h4 class="font-medium text-[#1F2937] mb-3 flex items-center gap-2">
              <i class="fas fa-calculator text-purple-600"></i>
              Calculation Formula
            </h4>
            
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Formula Expression
              </label>
              <textarea
                v-model="form.formula"
                rows="3"
                placeholder="e.g., (revenue - costs) / revenue * 100 for profit margin"
                class="w-full px-3 py-2 border border-purple-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm font-mono"
              ></textarea>
              <p class="text-xs text-[#6B7280] mt-1">
                Use variable names like 'revenue', 'costs', 'sales', etc. that match your data sources.
              </p>
            </div>

            <!-- Available Variables -->
            <div class="mt-4">
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Available Variables
              </label>
              <div class="grid grid-cols-3 gap-2">
                <div v-for="variable in availableVariables" :key="variable" 
                     @click="insertVariable(variable)"
                     class="bg-white border border-purple-200 rounded px-2 py-1 text-xs cursor-pointer hover:bg-purple-100 transition-colors">
                  {{ variable }}
                </div>
              </div>
            </div>
          </div>

          <!-- Ownership & Responsibility -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                KPI Owner
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
                <option value="marketing-manager">Marketing Manager</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#1F2937] mb-2">
                Reporting Dashboard
              </label>
              <select
                v-model="form.dashboard"
                class="w-full px-4 py-3 border border-[#F1F1F1] rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="">Select Dashboard</option>
                <option value="executive">Executive Dashboard</option>
                <option value="operations">Operations Dashboard</option>
                <option value="sales">Sales Dashboard</option>
                <option value="financial">Financial Dashboard</option>
                <option value="customer">Customer Dashboard</option>
                <option value="hr">HR Dashboard</option>
              </select>
            </div>
          </div>

          <!-- Visualization Settings -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-[#1F2937] mb-3 flex items-center gap-2">
              <i class="fas fa-chart-bar text-[#2F2E8B]"></i>
              Visualization Settings
            </h4>
            
            <div class="grid md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Chart Type</label>
                <select
                  v-model="form.visualization.type"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                >
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="gauge">Gauge</option>
                  <option value="number">Number Display</option>
                  <option value="trend">Trend Indicator</option>
                  <option value="pie">Pie Chart</option>
                </select>
              </div>

              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Color Scheme</label>
                <select
                  v-model="form.visualization.color"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="gradient">Gradient</option>
                </select>
              </div>

              <div>
                <label class="block text-xs text-[#6B7280] mb-1">Display Size</label>
                <select
                  v-model="form.visualization.size"
                  class="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="full-width">Full Width</option>
                </select>
              </div>
            </div>
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
              @click="testKPI"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Test KPI
            </button>
            <button
              type="submit"
              class="bg-[#2F2E8B] hover:bg-[#252470] text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <i class="fas fa-plus"></i>
              Create KPI
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['close', 'kpi-created'])

const form = reactive({
  name: '',
  category: '',
  description: '',
  unit: 'percentage',
  customUnit: '',
  frequency: 'monthly',
  dataSource: 'manual',
  targets: {
    target: '',
    minimum: '',
    stretch: ''
  },
  alerts: {
    critical: '',
    warning: '',
    email: ''
  },
  formula: '',
  owner: '',
  dashboard: '',
  visualization: {
    type: 'line',
    color: 'blue',
    size: 'medium'
  }
})

const availableVariables = computed(() => [
  'revenue', 'costs', 'sales', 'profit', 'customers', 'orders',
  'inventory_value', 'payroll_costs', 'expenses', 'assets',
  'liabilities', 'employees', 'satisfaction_score', 'conversion_rate'
])

const insertVariable = (variable) => {
  form.formula += variable
}

const testKPI = () => {
  if (!form.name) {
    alert('Please enter a KPI name to test')
    return
  }
  
  // Mock test - in reality, this would validate the formula and data sources
  alert(`KPI "${form.name}" configuration is valid and ready for use.`)
}

const createKPI = () => {
  if (!form.name || !form.category) {
    alert('Please fill in the required fields (Name and Category)')
    return
  }

  const kpiData = {
    ...form,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentValue: 0,
    previousValue: 0,
    trend: 'neutral',
    status: 'active'
  }

  // Save to localStorage
  const existingKPIs = JSON.parse(localStorage.getItem('strategic_kpis') || '[]')
  existingKPIs.push(kpiData)
  localStorage.setItem('strategic_kpis', JSON.stringify(existingKPIs))

  emit('kpi-created', kpiData)
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