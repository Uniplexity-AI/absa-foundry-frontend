<template>
  <div class="predictions-subpage min-h-screen bg-[#F5F5F5] font-sans relative text-gray-900 overflow-x-hidden">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="max-w-[1920px] mx-auto p-4 md:p-6 relative z-10">
      
      <!-- Header with AI Status -->
      <div class="bg-white/80 backdrop-blur-md border border-gray-200 p-6 mb-6 shadow-sm relative overflow-hidden">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div class="flex items-center gap-4">
            <div class="w-2 h-12 bg-[#2F2E8B]"></div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">MODULE // PREDICTIVE_ANALYTICS</span>
              </div>
              <h1 class="text-3xl font-black text-gray-900 uppercase tracking-tight font-outfit">AI Strategic Consultant</h1>
              <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mt-1">REAL_TIME // STRATEGIC_INTEL_STREAM</p>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <select 
              v-model="selectedLanguage"
              class="bg-white border border-gray-200 px-4 py-2 text-[10px] font-mono font-bold uppercase focus:ring-1 focus:ring-[#2F2E8B] rounded-none shadow-sm"
            >
              <option value="en">🇬🇧 ENGLISH</option>
              <option value="bem">BEMBA</option>
              <option value="nya">NYANJA</option>
            </select>

            <button 
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-upload"></i>
              <span>UPLOAD_DATA</span>
            </button>

            <button 
              class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 text-[10px] font-mono font-bold uppercase shadow-md transition-all flex items-center gap-2 rounded-none"
            >
              <i class="fas fa-magic"></i>
              <span>AI_REPORT</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Strategic Navigation -->
      <StrategicNavigation active-tab="predictions" />
      <!-- Predictive Analytics Section -->
      <div class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_REGISTRY // PREDICTIVE_MODELS</div>
          
          <div class="flex items-center justify-between mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Predictive Analytics</h2>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-widest">SERVER_SYNC_LIVE</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div 
              v-for="prediction in predictions" 
              :key="prediction.id"
              class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all relative group border-t-2"
              :class="prediction.trend === 'up' ? 'border-t-emerald-500' : prediction.trend === 'down' ? 'border-t-red-500' : 'border-t-[#2F2E8B]'"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              
              <div class="flex items-start justify-between mb-6">
                <div class="p-3 bg-gray-50 border border-gray-100">
                  <i :class="['fas text-xl', prediction.icon, prediction.trend === 'up' ? 'text-emerald-600' : prediction.trend === 'down' ? 'text-red-600' : 'text-[#2F2E8B]']"></i>
                </div>
                <div class="text-right">
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block">MODEL_TYPE</span>
                  <span class="text-[10px] font-mono font-bold text-gray-900 uppercase">{{ prediction.model }}</span>
                </div>
              </div>

              <div class="mb-6">
                <h3 class="font-black text-gray-900 text-sm uppercase tracking-tight font-outfit mb-1">{{ prediction.title }}</h3>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-black text-gray-900 font-outfit tabular-nums">{{ prediction.predictedValue }}</span>
                  <span :class="['text-[10px] font-mono font-black uppercase tracking-widest', prediction.trend === 'up' ? 'text-emerald-600' : 'text-red-600']">
                    {{ prediction.trend === 'up' ? '+' : '' }}{{ prediction.change }}
                  </span>
                </div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-none mt-2">PROJECTED_RANGE // {{ prediction.timeframe }}</p>
              </div>

              <!-- Confidence Visualizer -->
              <div class="space-y-4 mb-6">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">AI_CONFIDENCE_SCORE</span>
                    <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ prediction.confidence }}%</span>
                  </div>
                  <div class="h-1 bg-gray-100 overflow-hidden">
                    <div 
                      class="h-full bg-[#2F2E8B] transition-all duration-700"
                      :style="{ width: prediction.confidence + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Influence Factors -->
              <div class="pt-4 border-t border-gray-50">
                <span class="text-[8px] font-mono font-black text-gray-300 uppercase tracking-widest block mb-3">KEY_INFLUENCE_FACTORS</span>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="factor in prediction.factors" 
                    :key="factor"
                    class="text-[8px] font-mono font-black text-gray-500 bg-gray-50 px-2 py-1 border border-gray-100 uppercase tracking-widest"
                  >
                    {{ factor }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <!-- Macro-Economic Intelligence Section -->
        <div class="bg-[#F7F7F7] border border-gray-100 p-8 shadow-inner relative overflow-hidden group">
          <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
          <div class="flex flex-col lg:flex-row items-start gap-8 relative z-10">
            <div class="p-4 bg-white border border-gray-100 shadow-sm">
              <i class="fas fa-globe-africa text-[#2F2E8B] text-3xl"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest bg-[#2F2E8B]/5 px-2 py-1">SOURCE_SYNC // EXTERNAL_AGENTS</span>
                <h3 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Macro-Economic Intelligence</h3>
              </div>
              <p class="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest leading-relaxed mb-8 max-w-3xl border-l-2 border-gray-200 pl-4 italic">
                AI INTEGRATES REAL-TIME DATA FROM GLOBAL MULTILATERALS, COMMODITY EXCHANGES, AND REGIONAL TRADE AGREEMENTS (AF_C_F_T_A) TO REFINE PREDICTIVE ACCURACY.
              </p>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white border border-gray-200 p-5 relative overflow-hidden group/card hover:border-[#2F2E8B]/30 transition-all">
                  <div class="absolute top-0 right-0 p-1 text-[7px] font-mono font-black text-gray-300 uppercase tracking-widest">FX_RATE</div>
                  <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">ZMW_EXCHANGE</p>
                  <p class="text-xl font-black font-outfit text-gray-900 tabular-nums">{{ Number(externalData.exchangeRate).toFixed(2) }}</p>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="text-[9px] font-mono font-black text-red-500">-2.3%_AUDIT</span>
                    <div class="flex-1 h-0.5 bg-gray-50 relative overflow-hidden">
                      <div class="absolute inset-0 bg-red-500/20 translate-x-1/2"></div>
                    </div>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 p-5 relative overflow-hidden group/card hover:border-[#2F2E8B]/30 transition-all">
                  <div class="absolute top-0 right-0 p-1 text-[7px] font-mono font-black text-gray-300 uppercase tracking-widest">CPI_DATA</div>
                  <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">INFLATION_RATE</p>
                  <p class="text-xl font-black font-outfit text-gray-900 tabular-nums">{{ externalData.inflation }}%</p>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="text-[9px] font-mono font-black text-amber-500">+0.5%_YOY</span>
                    <div class="flex-1 h-0.5 bg-gray-50"></div>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 p-5 relative overflow-hidden group/card hover:border-[#2F2E8B]/30 transition-all">
                  <div class="absolute top-0 right-0 p-1 text-[7px] font-mono font-black text-gray-300 uppercase tracking-widest">COMMOD_IX</div>
                  <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">INDEX_TRACKER</p>
                  <p class="text-xl font-black font-outfit text-gray-900 tabular-nums">{{ Number(externalData.commodityIndex).toFixed(2) }}</p>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="text-[9px] font-mono font-black text-emerald-500">+4.1%_MTD</span>
                    <div class="flex-1 h-0.5 bg-gray-50 relative overflow-hidden">
                      <div class="absolute inset-0 bg-emerald-500/20 -translate-x-1/3"></div>
                    </div>
                  </div>
                </div>

                <div class="bg-white border border-gray-200 p-5 relative overflow-hidden group/card hover:border-[#2F2E8B]/30 transition-all">
                  <div class="absolute top-0 right-0 p-1 text-[7px] font-mono font-black text-gray-300 uppercase tracking-widest">TRADE_EFF</div>
                  <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">AF_C_F_T_A_IMP</p>
                  <p class="text-xl font-black font-outfit text-gray-900 tabular-nums">+{{ Number(externalData.afcftaImpact).toFixed(2) }}%</p>
                  <div class="mt-2 flex items-center gap-2">
                    <span class="text-[9px] font-mono font-black text-emerald-500">OPTIMAL_SYNC</span>
                    <div class="flex-1 h-0.5 bg-gray-50"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <!-- Scenario Planning Section -->
      <div class="mb-12">
        <div class="bg-white border border-gray-200 p-8 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B]/20 transition-colors">
          <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
          <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-3 py-1 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest z-20">SYSTEM_MEMORY // SIMULATION_LAB</div>
          
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-4 relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-purple-500"></div>
              <h2 class="text-xl font-black font-outfit text-gray-900 uppercase tracking-tight">Scenario Planning</h2>
            </div>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">"WHAT_IF" INTERACTIVE SIMULATIONS</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <div 
              v-for="scenario in scenarios" 
              :key="scenario.id"
              class="bg-white border border-gray-100 p-6 hover:shadow-md transition-all cursor-pointer relative group flex flex-col border-t-2 border-t-purple-500"
              @click="runScenario(scenario.id)"
            >
              <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
              <div class="flex items-start justify-between mb-6 relative z-10">
                <div class="p-3 bg-gray-50 border border-gray-100">
                  <i :class="['fas text-xl', scenario.icon, 'text-purple-600']"></i>
                </div>
                <div class="text-right">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest block">PROBABILITY</span>
                  <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ scenario.probability }}%</span>
                </div>
              </div>
              
              <h4 class="font-black text-gray-900 text-sm uppercase tracking-tight font-outfit mb-2 relative z-10">{{ scenario.title }}</h4>
              <p class="text-[10px] text-gray-500 leading-relaxed font-mono font-bold uppercase tracking-tight mb-8 relative z-10">
                {{ scenario.description }}
              </p>

              <!-- Scenario Impact Preview -->
              <div class="grid grid-cols-2 gap-2 mt-auto relative z-10">
                <div class="bg-gray-50 p-3 border border-gray-100">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase block mb-1">REV_IMP</span>
                  <span :class="['text-[11px] font-mono font-black uppercase', scenario.revenueImpact >= 0 ? 'text-emerald-600' : 'text-red-600']">
                    {{ scenario.revenueImpact >= 0 ? '+' : '' }}{{ scenario.revenueImpact }}%
                  </span>
                </div>
                <div class="bg-gray-50 p-3 border border-gray-100">
                  <span class="text-[8px] font-mono font-black text-gray-400 uppercase block mb-1">RISK_LVL</span>
                  <span :class="['text-[11px] font-mono font-black uppercase', scenario.risk === 'high' ? 'text-red-500' : 'text-emerald-500']">
                    {{ scenario.risk.toUpperCase() }}
                  </span>
                </div>
              </div>

              <button 
                class="w-full mt-4 py-2 border border-[#2F2E8B]/20 text-[#2F2E8B] text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#2F2E8B] hover:text-white transition-all relative z-10"
              >
                EXECUTE_SIMULATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- Scenario Modal (move outside main content) -->
  <div v-if="showScenarioModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-[#F1F1F1]">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-[#1F2937] flex items-center gap-2">
            <span class="p-2 bg-[#F3F3F3] rounded-lg">
              <i class="fas fa-flask text-[#2F2E8B]"></i>
            </span>
            Custom Scenario Planning
          </h3>
          <button 
            @click="showScenarioModal = false"
            class="text-[#6B7280] hover:text-[#4B5563] transition-colors"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <p class="text-sm text-[#4B5563] mt-2">Configure and run custom "What-If" scenarios</p>
      </div>
      <div class="p-6">
        <div class="text-center py-12">
          <i class="fas fa-flask text-6xl text-[#2F2E8B] mb-4"></i>
          <h3 class="text-xl font-bold text-[#1F2937] mb-2">Custom Scenario Builder</h3>
          <p class="text-[#4B5563]">Advanced scenario planning features coming soon...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed, ref } from 'vue'
import { workflowResult } from '@/composables/useStrategicWorkflow'
import { useRouter } from 'vue-router'
import StrategicNavigation from './components/StrategicNavigation.vue'

const router = useRouter()
const aiProcessing = ref(false)
const showScenarioModal = ref(false)

const predictions = computed(() => workflowResult.value?.predictions || [])
const externalData = computed(() => workflowResult.value?.externalData || {})
const scenarios = computed(() => workflowResult.value?.scenarios || [])

console.log('PredictionsSubpage - predictions:', predictions.value)
console.log('PredictionsSubpage - externalData:', externalData.value)
console.log('PredictionsSubpage - scenarios:', scenarios.value)
console.log('PredictionsSubpage - workflowResult:', workflowResult.value)
console.log('PredictionsSubpage - scenarios:', scenarios.value)

const activeTab = ref('predictions')
const selectedLanguage = ref('en')
</script>

<style scoped>
</style>
