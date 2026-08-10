<template>
  <div class="flex-1 overflow-y-auto p-8 scrollbar-hide global-mesh-bg pt-20">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="animate-pulse space-y-6">
        <div class="h-8 bg-gray-200 rounded w-1/3"></div>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 lg:col-span-4"><LoadingSkeleton type="block" /></div>
          <div class="col-span-12 lg:col-span-8"><LoadingSkeleton type="block" /></div>
        </div>
        <LoadingSkeleton type="block" />
        <div class="grid grid-cols-2 gap-6">
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="card" />
        </div>
      </div>
    </template>

    <!-- Empty State -->
    <template v-else-if="isEmpty">
      <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle class="w-8 h-8 text-amber-600" />
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Predictions Not Yet Available</h2>
        <p class="text-body-md text-secondary max-w-md">
          Predictions not yet computed for this customer. Run batch prediction to generate health score and churn probability.
        </p>
      </div>
    </template>

    <!-- Main Content -->
    <template v-else>
        <!-- Page Header & Actions -->
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-lg font-bold text-brand-red mb-1">
              {{ customer.fullName || customer.name }} (ID: {{ customer.customerId || customer.id }})
            </h2>
          </div>
          <button class="bg-brand-red hover:bg-red-800 text-white px-5 py-2.5 rounded-md font-medium text-sm flex items-center gap-2 transition-colors shadow-sm">
            <ExternalLink class="w-4 h-4" />
            View in Core Banking
          </button>
        </div>

        <!-- Top Row Grid -->
        <div class="grid grid-cols-12 gap-6 mb-6">
          <!-- Profile Card -->
          <div class="col-span-12 lg:col-span-4 rounded card-border overflow-hidden flex flex-col global-dotted-bg">
            <div class="bg-brand-red h-24 relative p-6">
              <span class="text-white font-bold opacity-80">{{ customer.customerId || customer.id }}</span>
              <img 
                :src="customer.avatar" 
                :alt="customer.fullName || customer.name" 
                class="absolute -bottom-10 left-6 w-20 h-20 rounded-full border-4 border-white object-cover shadow-sm bg-gray-200"
              />
            </div>
            <div class="pt-14 px-6 pb-6 flex-1 flex flex-col">
              <h3 class="text-xl font-bold mb-1">{{ customer.fullName || customer.name || 'Loading...' }}</h3>
              <p class="text-sm text-brand-subtext mb-3">{{ customer.segment || customer.tier }}</p>
              <div class="mb-6">
                <StateBadge :state="customer.state || customer.status" size="md" />
              </div>
              <div class="space-y-4 text-sm mt-auto">
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span class="text-brand-subtext">Account #</span>
                  <span class="font-semibold text-brand-red">{{ customer.accountNumber }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span class="text-brand-subtext">Branch</span>
                  <span class="font-semibold text-brand-red">{{ customer.branch }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span class="text-brand-subtext">ID Number</span>
                  <span class="font-semibold text-brand-red">{{ customer.customerId || customer.id }}</span>
                </div>
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span class="text-brand-subtext">Tenure</span>
                  <span class="font-semibold text-brand-red">{{ customer.tenure }}</span>
                </div>
                <div class="flex justify-between items-center pb-1">
                  <span class="text-brand-subtext">Assigned RM</span>
                  <span class="font-semibold text-brand-red">{{ customer.assignedRm }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Predictive Insights with Health Gauge + Churn Bar -->
          <div class="col-span-12 lg:col-span-8 rounded card-border p-6 relative global-dotted-bg">
            <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div class="flex items-center gap-2 text-brand-red font-bold text-sm tracking-wider uppercase">
                <BrainCircuit class="w-5 h-5" />
                Predictive Insights
              </div>
              <span class="text-xs text-brand-subtext">Last updated: Today, 08:45 AM</span>
            </div>
            
            <div class="grid grid-cols-2 gap-10">
              <!-- Left Side: Health Score Gauge -->
              <div class="flex flex-col items-center justify-center">
                <h4 class="text-sm font-semibold self-start mb-6 w-full">AI Health Score</h4>
                <HealthScoreGauge
                  :score="healthMetrics.score"
                  :trend="healthMetrics.trend"
                  :previousScore="healthMetrics.previousScore"
                />
                <ChurnProbabilityBar
                  :probability="healthMetrics.churnProbability"
                  :showLabel="true"
                  class="mt-6 w-full"
                />
              </div>

              <!-- Right Side: Risk Drivers -->
              <div class="border-l border-gray-100 pl-10">
                <h4 class="text-sm font-semibold mb-6">Key Risk Drivers</h4>
                <div class="space-y-6">
                  <div v-for="(driver, index) in riskDrivers" :key="index">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="font-medium">{{ driver.title }}</span>
                      <span :class="['font-bold', driver.highlightClass]">{{ driver.metric }}</span>
                    </div>
                    <div class="progress-bar-bg mb-2">
                      <div :class="driver.fillClass" :style="{ width: driver.percentage + '%' }"></div>
                    </div>
                    <p class="text-xs text-brand-subtext">{{ driver.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- State Timeline -->
        <div class="rounded card-border p-6 mb-6 global-dotted-bg">
          <h3 class="text-sm font-bold tracking-wider uppercase text-brand-text mb-8">
            Lifecycle Journey
          </h3>
          <StateTimeline :transitions="timelineData" />
        </div>

        <!-- Markov Matrix (Collapsible) -->
        <details class="rounded card-border p-6 mb-6 global-dotted-bg">
          <summary class="text-sm font-bold tracking-wider uppercase text-brand-text cursor-pointer">
            Advanced: State Transition Probabilities
          </summary>
          <div class="mt-6">
            <MarkovMatrix :matrix="markovMatrix" :states="markovStates" />
          </div>
        </details>

        <!-- Bottom Row Grid -->
        <div class="grid grid-cols-12 gap-6">
          <!-- Next Best Action -->
          <div class="col-span-12 lg:col-span-5 rounded overflow-hidden flex flex-col shadow-lg relative" style="background: linear-gradient(135deg, rgb(164, 0, 34) 0%, rgb(27, 28, 28) 50%, rgb(0, 0, 0) 100%);">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div class="flex items-center gap-3 p-6 pb-0 relative z-10">
              <div class="text-5xl font-bold text-white">!</div>
              <div>
                <h3 class="text-xl font-bold text-white leading-tight">Next Best Action</h3>
                <p class="text-[10px] text-white/70 leading-tight">Recommended by AI-Lifecycle Engine</p>
              </div>
            </div>
            
            <div class="flex-1 text-white p-6 pt-4 flex flex-col relative z-10">
              <div class="flex justify-between items-start mb-6">
                <span class="bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                  {{ nextBestAction.priority }}
                </span>
                <div class="text-right">
                  <span class="block text-[8px] uppercase tracking-widest text-gray-400">AI Confidence</span>
                  <span class="text-2xl font-bold">{{ nextBestAction.confidence }}</span>
                </div>
              </div>
              <h4 class="text-2xl font-bold mb-4 leading-tight">{{ nextBestAction.title }}</h4>
              <p class="text-sm text-gray-300 mb-8 leading-relaxed">
                {{ nextBestAction.description }}
              </p>
              <div class="mt-auto flex gap-3">
                <button class="bg-white text-primary font-bold px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-100 transition-colors text-sm">
                  <PhoneForwarded class="w-4 h-4" />
                  Log Action
                </button>
                <button class="bg-white/5 text-white font-medium px-6 py-2 rounded hover:bg-white/10 transition-colors border border-white/20 text-sm">
                  Dismiss
                </button>
              </div>
            </div>
          </div>

          <!-- Action History -->
          <div class="col-span-12 lg:col-span-7 rounded card-border p-6 flex flex-col global-dotted-bg">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-sm font-bold tracking-wider uppercase text-brand-text">Action History</h3>
              <div class="flex items-center gap-4 text-sm font-semibold">
                <button class="flex items-center gap-1 hover:text-brand-red transition-colors">
                  All <ChevronDown class="w-4 h-4" />
                </button>
                <button class="text-brand-red hover:text-red-800 transition-colors">View All</button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto pr-2 scrollbar-hide relative pl-4">
              <div class="absolute left-[27px] top-4 bottom-0 w-px bg-gray-200"></div>
              <div class="space-y-6">
                <div v-for="(item, index) in actionHistory" :key="index" class="relative pl-12">
                  <div :class="['absolute left-[-5px] top-1 w-8 h-8 rounded-full flex items-center justify-center z-10', item.iconBg]">
                    <component :is="item.icon" class="w-4 h-4" :class="item.iconColor" />
                  </div>
                  <div class="bg-gray-50 rounded p-4">
                    <div class="flex justify-between items-start mb-2">
                      <h5 class="font-bold text-sm">{{ item.title }}</h5>
                      <span class="text-xs text-brand-subtext font-medium">{{ item.date }}</span>
                    </div>
                    <p class="text-sm text-brand-text leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </template>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ExternalLink,
  BrainCircuit,
  AlertTriangle,
  MessageSquare,
  Tag,
  UserCheck,
  PhoneForwarded,
  ChevronDown,
} from 'lucide-vue-next'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import HealthScoreGauge from '@/components/absa/HealthScoreGauge.vue'
import ChurnProbabilityBar from '@/components/absa/ChurnProbabilityBar.vue'
import StateTimeline from '@/components/absa/StateTimeline.vue'
import MarkovMatrix from '@/components/absa/MarkovMatrix.vue'
import StateBadge from '@/components/absa/StateBadge.vue'

const loading = ref(true)
const isEmpty = computed(() => !loading.value && healthMetrics.value.score == null)

onMounted(() => { setTimeout(() => loading.value = false, 800) })

// Customer Profile Data
const customer = ref({
  fullName: 'Mwenda Kapambwe',
  customerId: '994022/11/1',
  segment: 'Verified Private Client',
  state: 'CHURNED',
  accountNumber: 'ZMK-8820-192',
  branch: 'Lusaka Main',
  tenure: '8 Years',
  assignedRm: 'Tina Tembo',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Bfm2V-PM9YCvzJU1DmNDLgmOLGqasJ2MIeXbRWVxtBmD8Ai3hB3B0yEdU8QvJ7IntUStXVBQSL3r5YhIu4ai-Jp1NZgsM61qxLXdX_PlymfWvBshcJRWXyPL9smji6LHXUKr4HrYsRL7PDP-8NhrMa2XPB3U9Mbeq5MD-5Q32eL73QTG3lMraYAHCR168UrPl_mNbHTHk9bRWuYuFC7X1ffxHIZX-b1F_TlD5HGy0KwkA3wLxff6Ch5dt1ayJnaYg2k'
})

// Health Metrics for Gauge + Churn Bar
const healthMetrics = ref({
  score: 22,
  trend: 'down',
  previousScore: 34,
  churnProbability: 0.924,
})

const riskDrivers = ref([
  {
    title: 'Salary Inflow',
    metric: '-42%',
    percentage: 58,
    description: 'Major decrease in monthly deposits detected.',
    highlightClass: 'text-brand-red',
    fillClass: 'progress-bar-fill'
  },
  {
    title: 'Digital Activity',
    metric: 'Low',
    percentage: 15,
    description: 'No mobile app logins in the last 45 days.',
    highlightClass: 'text-brand-dark',
    fillClass: 'bg-gray-300 h-full'
  },
  {
    title: 'Withdrawal Volume',
    metric: 'Spike',
    percentage: 85,
    description: 'Recent lump-sum exit to external institution.',
    highlightClass: 'text-brand-red',
    fillClass: 'progress-bar-fill'
  }
])

// Timeline data for StateTimeline component
const timelineData = ref([
  { from: 'ACTIVE', to: 'ACTIVE', date: '2025-08-10', daysInState: 180, triggerReason: 'Regular activity' },
  { from: 'ACTIVE', to: 'AT_RISK', date: '2026-02-10', daysInState: 120, triggerReason: 'Declining transaction frequency' },
  { from: 'AT_RISK', to: 'DORMANT', date: '2026-05-15', daysInState: 94, triggerReason: '90 days inactivity threshold' },
  { from: 'DORMANT', to: 'CHURNED', date: '2026-07-20', daysInState: 66, triggerReason: 'Account closure initiated' },
])

// Markov Matrix data
const markovStates = ref(['ACTIVE', 'AT_RISK', 'DORMANT', 'CHURNED'])
const markovMatrix = ref([
  [0.82, 0.15, 0.02, 0.01],
  [0.10, 0.65, 0.20, 0.05],
  [0.05, 0.10, 0.55, 0.30],
  [0.00, 0.00, 0.00, 1.00],
])

// Next Best Action Data
const nextBestAction = ref({
  priority: 'Priority 1',
  confidence: '92%',
  title: 'Immediate Retention Call',
  description: 'High risk of customer attrition. The AI predicts a 45% chance of re-engagement if contacted within the next 48 hours with a customized "Prestige Loyalty" offer.'
})

// Action History Timeline
const actionHistory = ref([
  {
    title: 'General Inquiry',
    date: 'June 10, 2024',
    description: 'Logged by RM Sarah Bwalaya. Customer queried interest rates on fixed deposits but expressed frustration with app performance.',
    icon: MessageSquare,
    iconBg: 'bg-red-50 border border-brand-red',
    iconColor: 'text-brand-red'
  },
  {
    title: 'Cross-sell: Credit Card',
    date: 'May 15, 2024',
    description: 'Inbound call center lead. Product offered: Absa Infinite Card. Customer declined citing high annual fees.',
    icon: Tag,
    iconBg: 'bg-white border border-gray-300',
    iconColor: 'text-gray-500'
  },
  {
    title: 'KYC Update',
    date: 'April 02, 2024',
    description: 'Routine identity verification completed at Lusaka Main Branch.',
    icon: UserCheck,
    iconBg: 'bg-white border border-gray-300',
    iconColor: 'text-gray-500'
  }
])
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

/* Color Variables & Palette Mapping */
:root {
  --brand-red: #8E001C;
  --brand-red-light: #D2002E;
  --brand-dark: #222222;
  --brand-gray: #F5F5F5;
  --brand-border: #EAEAEA;
  --brand-text: #4A4A4A;
  --brand-subtext: #757575;
}

/* Base Body Background Pattern */
.bg-app-body {
  background-color: #FAFAFA;
  background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M19 0h1v20h-1V0zM0 19h20v1H0v-1z" fill="%23e5e7eb" fill-opacity="0.2" fill-rule="evenodd"/%3E%3C/svg%3E');
}

/* Custom Utilities */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.card-border {
  border: 1px solid #F0F0F0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.progress-bar-bg {
  background-color: #EAEAEA;
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
}
.progress-bar-fill {
  background-color: #8E001C;
  height: 100%;
}

/* Text & Brand Utility Override mappings */
.text-brand-red { color: var(--brand-red); }
.text-brand-dark { color: var(--brand-dark); }
.text-brand-subtext { color: var(--brand-subtext); }
.text-brand-text { color: var(--brand-text); }
.bg-brand-red { background-color: var(--brand-red); }
.bg-brand-red-light { background-color: var(--brand-red-light); }
.border-brand-border { border-color: var(--brand-border); }
.border-brand-red { border-color: var(--brand-red); }
.from-brand-red-light { --tw-gradient-from: var(--brand-red-light); }
.to-brand-red { --tw-gradient-to: var(--brand-red); }
.from-brand-dark { --tw-gradient-from: var(--brand-dark); }
</style>