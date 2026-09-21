<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex justify-end">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/40 transition-opacity" @click="close"></div>
    
    <!-- Slide-over panel -->
    <div class="relative w-full max-w-2xl bg-white h-full flex flex-col shadow-2xl transition-transform transform">
      
      <!-- Panel Header -->
      <div class="px-6 py-5 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button @click="close" class="absolute top-5 right-6 text-gray-400 hover:text-gray-600">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div class="flex items-center gap-2 mb-1">
          <span class="material-symbols-outlined text-absa-passion">auto_awesome</span>
          <h2 class="text-lg font-bold text-absa-enrich">AI Campaign Recommendation Engine</h2>
        </div>
        <p class="text-xs text-gray-500 mb-4">Cohort analysis powered by XGBoost Churn Model v2.1 &middot; SHAP feature attribution</p>
        
        <div class="bg-absa-passion/5 border border-absa-passion/20 rounded-sm px-4 py-2 text-xs text-absa-enrich">
          <span class="font-bold">{{ customers.length }}</span> customers selected &middot; AI has identified <span class="font-bold">{{ aiCampaigns.length }}</span> campaign strategies optimised for this cohort
        </div>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-8">
      
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-center h-full">
          <span class="material-symbols-outlined text-[48px] text-absa-passion animate-spin mb-4">sync</span>
          <h3 class="text-lg font-bold text-absa-enrich mb-2">Analyzing Cohort...</h3>
          <p class="text-sm text-gray-500 max-w-sm">
            The AI decision engine is currently analyzing the selected customers and generating tailored campaign strategies to maximize retention and CLV.
          </p>
        </div>

        <template v-else>
        
        <!-- Section 1: Cohort Intelligence -->
        <section>
          <div class="mb-4">
            <h3 class="text-sm font-bold text-absa-enrich">Cohort Analysis</h3>
            <p class="text-xs text-gray-500 mt-1">AI has grouped selected customers by shared behavioural features</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div v-for="driver in cohortDrivers" :key="driver.label" class="bg-white border border-gray-200 rounded-sm p-3 relative flex flex-col h-full overflow-hidden">
              <div class="absolute left-0 top-0 bottom-0 w-1 bg-absa-passion"></div>
              <div class="pl-2">
                <div class="flex justify-between items-start mb-2">
                  <span class="material-symbols-outlined text-[20px] text-gray-400">{{ driver.icon }}</span>
                  <span class="text-[11px] font-bold font-mono text-absa-passion">{{ driver.contribution }}%</span>
                </div>
                <h4 class="text-xs font-bold text-absa-enrich mb-1">{{ driver.label }}</h4>
                <p class="text-[10px] text-gray-500 leading-tight">{{ driver.desc }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 2: AI Campaign Proposals -->
        <section>
          <div class="mb-4">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-bold text-absa-enrich">AI-Generated Campaign Strategies</h3>
              <span class="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-gray-200 text-gray-700 rounded-full">{{ aiCampaigns.length }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Select a strategy. Recommendations are ranked by predicted CLV retention (Uplift Model v1.2).</p>
          </div>

          <div class="space-y-3">
            <div v-for="camp in aiCampaigns" :key="camp.id" 
                 @click="selectedCampaign = camp"
                 class="border rounded-sm p-4 cursor-pointer transition-colors relative"
                 :class="selectedCampaign?.id === camp.id ? 'border-absa-passion bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'">
                 
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-sm"
                        :class="selectedCampaign?.id === camp.id ? 'bg-absa-passion text-white' : 'bg-gray-100 text-gray-600'">
                    #{{ camp.rank }}
                  </span>
                  <span class="px-2 py-0.5 text-[9px] font-bold rounded-sm tracking-wider uppercase" :class="camp.tagClass">{{ camp.tag }}</span>
                  <h4 class="text-sm font-bold text-absa-enrich">{{ camp.title }}</h4>
                </div>
              </div>
              
              <div class="flex items-center gap-1.5 text-[11px] text-gray-500 mb-2">
                <span class="material-symbols-outlined text-[14px]">{{ camp.channelIcon }}</span>
                {{ camp.channel }}
              </div>
              
              <p class="text-xs text-gray-600 mb-4">{{ camp.description }}</p>
              
              <div class="grid grid-cols-4 gap-4 pt-3 border-t" :class="selectedCampaign?.id === camp.id ? 'border-red-100' : 'border-gray-100'">
                <div>
                  <p class="text-[9px] font-bold text-gray-400 uppercase mb-1">Uplift Score</p>
                  <p class="font-mono font-bold text-absa-passion text-sm">{{ camp.upliftScore }}</p>
                </div>
                <div>
                  <p class="text-[9px] font-bold text-gray-400 uppercase mb-1">Success Rate</p>
                  <p class="text-sm font-semibold text-gray-700">{{ camp.successRate }}</p>
                </div>
                <div>
                  <p class="text-[9px] font-bold text-gray-400 uppercase mb-1">AUM Protected</p>
                  <p class="font-mono font-bold text-green-600 text-sm">{{ camp.aumProtected }}</p>
                </div>
                <div>
                  <p class="text-[9px] font-bold text-gray-400 uppercase mb-1">AI Confidence</p>
                  <span class="px-2 py-0.5 text-[10px] font-bold font-mono rounded-sm"
                        :class="camp.confidence >= 80 ? 'bg-green-100 text-green-700' : camp.confidence >= 65 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'">
                    {{ camp.confidence }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3: Predicted Outcomes -->
        <section v-if="selectedCampaign" class="animate-fade-in">
          <div class="mb-4">
            <h3 class="text-sm font-bold text-absa-enrich">AI-Predicted Intervention Outcomes</h3>
            <p class="text-xs text-gray-500 mt-1">Based on Uplift Model v1.2 applied to the cohort historical behaviour. Outcomes are probabilistic estimates.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-red-50 border border-red-100 rounded-sm p-4">
              <div class="flex items-center gap-1.5 mb-3">
                <span class="material-symbols-outlined text-[16px] text-absa-passion">trending_down</span>
                <h4 class="text-[11px] font-bold text-absa-passion uppercase tracking-wider">Projected WITHOUT Action (90 days)</h4>
              </div>
              <ul class="text-xs text-gray-700 space-y-2">
                <li class="flex justify-between border-b border-red-100 pb-1">
                  <span>Expected Exits:</span><span class="font-bold">{{ Math.round(customers.length * 0.82) || 1 }} customers</span>
                </li>
                <li class="flex justify-between border-b border-red-100 pb-1">
                  <span>AUM Lost:</span><span class="font-bold font-mono">K 23.1M</span>
                </li>
                <li class="flex justify-between pb-1">
                  <span>CLV Erosion:</span><span class="font-bold font-mono">K 4.8M</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-green-50 border border-green-100 rounded-sm p-4">
              <div class="flex items-center gap-1.5 mb-3">
                <span class="material-symbols-outlined text-[16px] text-green-600">trending_up</span>
                <h4 class="text-[11px] font-bold text-green-700 uppercase tracking-wider">Projected WITH Campaign</h4>
              </div>
              <ul class="text-xs text-gray-700 space-y-2">
                <li class="flex justify-between border-b border-green-100 pb-1">
                  <span>Customers Retained:</span><span class="font-bold text-green-700">{{ Math.round(customers.length * selectedCampaign.upliftScore / 100) || 1 }}</span>
                </li>
                <li class="flex justify-between border-b border-green-100 pb-1">
                  <span>AUM Protected:</span><span class="font-bold font-mono text-green-700">{{ selectedCampaign.aumProtected }}</span>
                </li>
                <li class="flex justify-between pb-1">
                  <span>Net Benefit:</span><span class="font-bold font-mono text-green-700">~{{ selectedCampaign.aumProtected }}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="text-[9px] text-gray-400 bg-gray-50 p-3 rounded-sm border border-gray-100 text-center">
            <strong>Model Traceability:</strong> Inference Engine: XGBoost Churn v2.1 &middot; Uplift Model: LightGBM v1.2 &middot; Cohort Features: {{ cohortDrivers.length }} SHAP attributes &middot; Batch: Nightly Inference
          </div>
        </section>

        </template>
      </div>
      <!-- Launch Panel Footer -->
      <div class="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center mt-auto">
        <div v-if="!selectedCampaign" class="text-xs text-gray-500 italic">
          Select a campaign strategy above to proceed
        </div>
        <div v-else class="flex flex-col">
          <span class="text-sm font-bold text-absa-enrich">{{ selectedCampaign.title }}</span>
          <span class="text-[11px] text-gray-500">{{ customers.length }} customers &middot; {{ selectedCampaign.duration }} &middot; Confidence: {{ selectedCampaign.confidence }}%</span>
        </div>
        
        <div class="flex gap-3">
          <button @click="close" class="px-4 py-2 border border-gray-300 text-absa-enrich text-xs font-bold rounded-sm hover:bg-white transition-colors shadow-none">
            Cancel
          </button>
          <button @click="launch" :disabled="!selectedCampaign" 
                  class="px-5 py-2 text-white text-xs font-bold rounded-sm transition-colors shadow-none flex items-center gap-2"
                  :class="selectedCampaign ? 'bg-absa-passion hover:bg-absa-power' : 'bg-gray-300 cursor-not-allowed'">
            <span class="material-symbols-outlined text-[16px]">rocket_launch</span>
            Launch Campaign
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { recordExecuted, recordAction } from '@/utils/absaActions'
import { notify } from '@/utils/absaExport'

defineOptions({ name: 'AiCampaignModal' })

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  customers: { type: Array, default: () => [] },
  sourceContext: { type: String, default: 'portfolio' }
})

const emit = defineEmits(['update:modelValue', 'campaign-launched'])

import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import { watch } from 'vue'

const selectedCampaign = ref(null)
const cohortDrivers = ref([])
const aiCampaigns = ref([])
const loading = ref(true)

const api = axios.create({ baseURL: API_BASE_URL, timeout: 300000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

async function fetchCohortInsights() {
  if (!props.modelValue || props.customers.length === 0) return;
  
  loading.value = true;
  cohortDrivers.value = [];
  aiCampaigns.value = [];
  selectedCampaign.value = null;

  try {
      const payload = {
        customers: props.customers.map(c => ({
          customer_id: c.customerId || c.customer_id || c.id || "UNKNOWN",
          churn_probability: c.churnProbability || c.churn_probability || c.churnProb || 0,
          clv: c.clv || c.value_180d || 0,
          health_score: c.healthScore || c.health_score || 0,
          segment: c.segmentCode || c.segment || 'MASS_MARKET'
        }))
      };
    
    // Call the new cohort-campaigns proxy route
    const { data } = await api.post('/api/v1/decisions/cohort-campaigns', payload);
    
    cohortDrivers.value = data.cohort_drivers || [];
    aiCampaigns.value = data.campaigns || [];
  } catch (error) {
    console.error("Failed to fetch AI Cohort Campaigns", error);
  } finally {
    loading.value = false;
  }
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    fetchCohortInsights();
  }
});
function close() {
  emit('update:modelValue', false)
  setTimeout(() => { selectedCampaign.value = null }, 300)
}

function launch() {
  if (!selectedCampaign.value) return
  recordExecuted(
    props.customers.map((c) => c.customer_id || c.id).filter(Boolean),
    selectedCampaign.value.title
  )
  recordAction({
    type: 'CAMPAIGN_LAUNCHED',
    detail: `Launched ${selectedCampaign.value.title} from ${props.sourceContext}`,
    meta: { campaign: selectedCampaign.value.title, context: props.sourceContext, customers: props.customers.length },
  })
  emit('campaign-launched', { campaign: selectedCampaign.value, customers: props.customers })
  close()
  notify(`Campaign launched: ${selectedCampaign.value.title} (${props.customers.length} customer${props.customers.length === 1 ? '' : 's'})`, 'success')
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
