<template>
  <div class="min-h-screen bg-[#f8f9fa]">
    <div class="max-w-[1600px] mx-auto flex flex-col gap-4 pb-[32px] pt-[8px] px-[32px]">
      <!-- Breadcrumb + View in Core Banking -->
      <div class="flex items-end justify-between w-full">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-0">
            <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">Home</span>
            <svg class="mx-1" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-[#5d3f3f] text-[12px] font-semibold tracking-[0.6px] leading-[16px] cursor-pointer hover:text-[#77021e] hover:underline transition-colors duration-150">My Customers</span>
            <svg class="mx-1" width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1l4 4-4 4" stroke="#5d3f3f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Mwenda Kapambwe</span>
          </div>
          <h1 class="text-[#191c1d] text-[32px] font-bold tracking-[-0.32px] leading-[40px]">{{ customer.fullName || 'Loading...' }} (ID: {{ customer.customerId || '...' }})</h1>
        </div>
        <button class="bg-[#77021e] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-2 px-4 py-[9px] rounded-[2px] text-white text-[16px] font-normal leading-[24px]">
          <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
            <rect x="0.5" y="0.5" width="8" height="10" rx="1.5" stroke="white"/>
            <line x1="2.5" y1="3.5" x2="6.5" y2="3.5" stroke="white" stroke-linecap="round"/>
            <line x1="2.5" y1="5.5" x2="5.5" y2="5.5" stroke="white" stroke-linecap="round"/>
            <line x1="2.5" y1="7.5" x2="6.5" y2="7.5" stroke="white" stroke-linecap="round"/>
          </svg>
          View in Core Banking
        </button>
      </div>

      <!-- Error Banner -->
      <div v-if="loadError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center justify-between max-w-[1600px] mx-auto">
        <span class="text-red-700 text-sm font-medium">Could not load customer data</span>
        <button @click="handleRetry" class="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-medium">Retry</button>
      </div>

      <!-- Skeleton Loading -->
      <div v-if="pageLoading" class="grid grid-cols-12 gap-x-6 gap-y-6 w-full max-w-[1600px]">
        <div class="col-span-4"><LoadingSkeleton type="card" /></div>
        <div class="col-span-8"><LoadingSkeleton type="block" /></div>
        <div class="col-span-12"><LoadingSkeleton type="block" /></div>
        <div class="col-span-4"><LoadingSkeleton type="card" /></div>
        <div class="col-span-8"><LoadingSkeleton type="block" /></div>
      </div>

      <!-- Main Content -->
      <div v-if="!pageLoading" class="grid grid-cols-12 gap-x-6 gap-y-12 w-full max-w-[1600px]">
        <!-- Row 1: Profile Card (4 cols) + AI Intelligence Hub (8 cols) -->
        <!-- Profile Card -->
        <div class="col-span-4 row-start-1">
          <LoadingSkeleton v-if="pageLoading" type="card" />
          <div v-else class="bg-white border border-[#e3bebc] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-clip flex flex-col h-[522px]">
            <div class="bg-[#77021e] h-[96px] flex items-center px-6">
              <span class="text-white text-[16px] font-bold leading-[24px]">{{ customer.customerId || '...' }}</span>
            </div>
            <div class="flex flex-col items-start p-6 relative -mt-[48px]">
              <div class="bg-white border-4 border-white rounded-full shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[80px] flex items-center justify-center overflow-clip">
                <div class="bg-[#ffb3b0] rounded-full size-full flex items-center justify-center">
                  <span class="text-[#77021e] text-[28px] font-bold">{{ initials }}</span>
                </div>
              </div>
              <div class="pt-4 w-full">
                <h2 class="text-[#0b1c30] text-[24px] font-semibold tracking-[-0.24px] leading-[32px]">{{ customer.fullName || 'Loading...' }}</h2>
              </div>
              <div class="py-3 w-full">
                <p class="text-[#191414] text-[14px] font-normal leading-[20px]">{{ customer.segment || '...' }}</p>
              </div>
              <div>
                <StateBadge :state="customer.state || 'ACTIVE'" size="md" />
              </div>
              <div class="flex flex-col gap-[7px] pt-6 w-full">
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Account #</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">{{ customer.accountNumber || '...' }}</span>
                </div>
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Branch</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">{{ customer.branch || '...' }}</span>
                </div>
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">ID Number</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">{{ customer.idNumber || '...' }}</span>
                </div>
                <div class="border-b border-[#e3bebc] flex items-center justify-between pb-[9px] pt-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Tenure</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">{{ customer.tenureYears ? customer.tenureYears + ' Years' : '...' }}</span>
                </div>
                <div class="flex items-center justify-between py-2">
                  <span class="text-[#5d5f5f] text-[12px] font-semibold tracking-[0.6px] leading-[16px]">Assigned RM</span>
                  <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">{{ customer.assignedRM || '...' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Intelligence Hub -->
        <LoadingSkeleton v-if="pageLoading" type="block" />
        <div v-else class="col-span-8 row-start-1 bg-white border border-[#e7bcbc] rounded-[6px] p-[25px] grid grid-cols-2 gap-x-6 gap-y-6">
          <div class="col-span-2 border-b border-[#e7bcbc] pb-[17px] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#77021e" stroke-width="1.5"/>
                <path d="M10 6v4" stroke="#77021e" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="10" cy="14" r="0.75" fill="#77021e"/>
              </svg>
              <span class="text-[#5d3f3f] text-[12px] font-bold tracking-[2.4px] uppercase leading-[16px]">PREDICTIVE INSIGHTS</span>
            </div>
            <span class="text-[#5d3f3f] text-[10px] font-normal italic leading-[15px]">Last updated: Today, 08:45 AM</span>
          </div>

          <!-- Health Score Gauge -->
          <div class="border-r border-[#e7bcbc] flex flex-col items-center justify-center gap-4 px-4 py-6">
            <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">AI Health Score</span>
            <HealthScoreGauge
              :score="healthScore"
              :trend="healthTrend"
              :previous-score="previousHealthScore"
              :loading="predictionStore.loading"
              :error="predictionStore.error"
              @retry="predictionStore.fetchHealthScore(customerId)"
            />
          </div>

          <!-- Churn Probability + Predictions Empty State -->
          <div class="flex flex-col gap-6 pl-[4px] py-6 justify-center">
            <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Churn Risk Assessment</span>

            <!-- Empty predictions state -->
            <div v-if="churnProbability === null && !predictionStore.loading" class="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <span class="text-amber-800 text-sm">Predictions not yet computed for this customer. Run batch prediction to generate health score and churn probability.</span>
            </div>

            <ChurnProbabilityBar
              v-else
              :probability="churnProbability"
              :loading="predictionStore.loading"
              :error="predictionStore.error"
              @retry="predictionStore.fetchChurnProbability(customerId)"
            />

            <!-- Key Risk Drivers (populated by backend) -->
            <div v-if="churnProbability !== null" class="flex flex-col gap-4 mt-2">
              <span class="text-[#191c1d] text-[12px] font-bold tracking-[0.6px] leading-[16px]">Key Risk Drivers</span>
              <div class="p-4 bg-gray-50 rounded-lg text-sm text-gray-400 text-center">
                Risk drivers will be surfaced by the prediction engine.
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: State Timeline + Markov Matrix -->
        <LoadingSkeleton v-if="pageLoading" type="block" />
        <div v-else class="col-span-12 row-start-2 bg-white border border-[#e7bcbc] rounded-[6px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[25px] flex flex-col gap-6">
          <span class="text-[#5d3f3f] text-[12px] font-bold tracking-[2.4px] uppercase leading-[16px]">LIFECYCLE JOURNEY (12 MONTHS)</span>
          <StateTimeline
            :transitions="timeline"
            :loading="customerStore.loading"
            :error="customerStore.error"
            @retry="customerStore.fetchCustomerTimeline(customerId)"
          />

          <!-- Collapsible Markov Matrix -->
          <details class="mt-2">
            <summary class="cursor-pointer font-semibold text-sm text-gray-700 hover:text-[#77021e] transition-colors py-2 select-none">
              Advanced: State Transition Probabilities
            </summary>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <MarkovMatrix
                :matrix="markovMatrix"
                :loading="predictionStore.loading"
                :error="predictionStore.error"
                @retry="predictionStore.fetchMarkovMatrix()"
              />
            </div>
          </details>
        </div>

        <!-- Row 3: NBA + Action History -->
        <LoadingSkeleton v-if="pageLoading" type="card" />
        <LoadingSkeleton v-if="pageLoading" type="block" />
        <template v-else>
        <div class="col-span-4 row-start-3 self-end mb-6 border border-[#ae0029] rounded-[6px] overflow-clip shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex h-[360px]" style="background: linear-gradient(135deg, #dc2337 0%, #a9192a 20%, #760e1d 40%, #440f17 70%, #2b1013 85%, #121010 100%)">
          <div class="bg-[rgba(0,0,0,0.1)] border-r border-[rgba(255,255,255,0.1)] w-[130px] flex flex-col items-center justify-center px-4 py-4">
            <div class="pb-2">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="none" stroke="#ffeded" stroke-width="2"/>
                <path d="M20 12v10" stroke="#ffeded" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="20" cy="27" r="1.5" fill="#ffeded"/>
              </svg>
            </div>
            <h3 class="text-[#ffeded] text-[16px] font-bold text-center leading-[22px]">Next Best<br>Action</h3>
            <div class="pt-1">
              <p class="text-[#ffeded] text-[11px] font-normal text-center opacity-80 leading-[16px]">Recommended by<br>AI-Lifecycle Engine</p>
            </div>
          </div>
          <div class="flex-1 flex flex-col p-4 overflow-clip items-center justify-center">
            <p class="text-[#ffeded] text-[13px] font-normal leading-[18px] text-center opacity-70">
              NBA recommendations will surface here once the AI engine processes this customer's behavioral data.
            </p>
          </div>
        </div>

        <!-- Row 3: Action History (8 cols — 2/3 bento) -->
        <div class="col-span-8 row-start-3 self-end mb-6 bg-white border border-[#e7bcbc] rounded-[6px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[25px] flex flex-col gap-6 h-[360px]">
          <div class="flex items-center w-full">
            <span class="text-[#191414] text-[12px] font-bold tracking-[2.4px] uppercase leading-[16px]">ACTION HISTORY</span>
            <div class="flex-1"></div>
            <div class="flex items-center gap-4">
              <div class="flex items-center cursor-pointer">
                <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px]">All</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M7 10l5 5 5-5" stroke="#77021e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="text-[#77021e] text-[12px] font-bold tracking-[0.6px] leading-[16px] cursor-pointer hover:underline">View All</span>
            </div>
          </div>

          <div class="relative w-full pl-11 flex-1 overflow-y-auto flex items-center justify-center">
            <p class="text-[#5d3f3f] text-[12px] font-normal">Action history will be populated from the backend.</p>
          </div>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'
import StateBadge from '@/components/absa/StateBadge.vue'
import LoadingSkeleton from '@/components/absa/LoadingSkeleton.vue'
import HealthScoreGauge from '@/components/absa/HealthScoreGauge.vue'
import ChurnProbabilityBar from '@/components/absa/ChurnProbabilityBar.vue'
import StateTimeline from '@/components/absa/StateTimeline.vue'
import MarkovMatrix from '@/components/absa/MarkovMatrix.vue'

const route = useRoute()
const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()

const customerId = computed(() => route.params.id)
const loading = computed(() => customerStore.loading || predictionStore.loading)
const loadError = computed(() => customerStore.error || predictionStore.error)
const pageLoading = ref(true)

const customer = computed(() => customerStore.selectedCustomer || {})
const timeline = computed(() => customerStore.timeline || [])
const healthData = computed(() => predictionStore.getHealthScore(customerId.value) || {})
const healthScore = computed(() => healthData.value.score ?? null)
const healthTrend = computed(() => healthData.value.trend ?? 'stable')
const previousHealthScore = computed(() => healthData.value.previousScore ?? null)
const churnProbability = computed(() => predictionStore.getChurnProbability(customerId.value) ?? null)
const markovMatrix = computed(() => predictionStore.markovMatrix)

const initials = computed(() => {
  const name = customer.value.fullName || ''
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return (name[0] || '?').toUpperCase()
})

onMounted(async () => {
  await Promise.all([
    customerStore.fetchCustomerDetail(customerId.value),
    customerStore.fetchCustomerTimeline(customerId.value),
    predictionStore.fetchHealthScore(customerId.value),
    predictionStore.fetchChurnProbability(customerId.value),
    predictionStore.fetchMarkovMatrix(),
  ])
  pageLoading.value = false
})

function handleRetry() {
  customerStore.fetchCustomerDetail(customerId.value)
  customerStore.fetchCustomerTimeline(customerId.value)
  predictionStore.fetchHealthScore(customerId.value)
  predictionStore.fetchChurnProbability(customerId.value)
  predictionStore.fetchMarkovMatrix()
}
</script>
