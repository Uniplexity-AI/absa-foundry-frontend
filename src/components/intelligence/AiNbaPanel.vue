<template>
  <!-- Urgency Banner -->
  <div v-if="nba.urgency === 'CRITICAL'"
    class="mb-3 flex items-center gap-3 bg-absa-passion text-white px-4 py-2 rounded-sm text-xs font-bold">
    <span class="material-symbols-outlined text-[16px] animate-pulse">emergency_home</span>
    AI CRITICAL ALERT &mdash; Immediate intervention required. Churn window: {{ nba.churnWindow }}
  </div>
  <div v-else-if="nba.urgency === 'HIGH'"
    class="mb-3 flex items-center gap-3 bg-amber-50 border border-amber-300 text-amber-800 px-4 py-2 rounded-sm text-xs font-bold">
    <span class="material-symbols-outlined text-[16px]">warning</span>
    AI HIGH PRIORITY &mdash; Action recommended within {{ nba.churnWindow }}
  </div>

  <!-- Main Panel -->
  <div class="bg-white rounded-sm border border-gray-300 shadow-none overflow-hidden mb-6">

    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-absa-enrich">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px] text-amber-300">auto_awesome</span>
        <h2 class="text-sm font-bold text-white">AI Prescribed Intervention</h2>
        <span class="inline-flex items-center px-2 py-0.5 text-[9px] font-bold rounded-sm uppercase tracking-wider"
          :class="urgencyBadgeClass">{{ nba.urgency }}</span>
      </div>
      <span class="text-[11px] text-gray-300 hidden md:block">
        XGBoost Churn v2.1 &middot; SHAP Attribution &middot; Nightly Inference Batch
      </span>
    </div>

    <!-- 3-Column Body -->
    <div class="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

      <!-- Col 1: Prescribed Action -->
      <div class="p-5">
        <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Prescribed Action</p>
        <div class="flex items-start gap-3 mb-4">
          <div class="w-9 h-9 rounded-sm bg-absa-passion/10 flex items-center justify-center flex-shrink-0">
            <span class="material-symbols-outlined text-[20px] text-absa-passion">{{ nba.actionIcon }}</span>
          </div>
          <div>
            <p class="text-sm font-bold text-absa-enrich leading-tight">{{ nba.action }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ nba.actionDetail }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="$emit('execute')"
            class="px-3 py-1.5 bg-absa-passion text-white text-xs font-bold rounded-sm hover:bg-absa-power transition-colors shadow-none flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[13px]">play_arrow</span>
            Execute Intervention
          </button>
          <button @click="$emit('override')"
            class="px-3 py-1.5 border border-gray-300 text-absa-enrich text-xs font-semibold rounded-sm hover:bg-gray-50 transition-colors shadow-none">
            Override
          </button>
        </div>
      </div>

      <!-- Col 2: SHAP Drivers -->
      <div class="p-5">
        <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Causal SHAP Drivers</p>
        <div class="space-y-3">
          <AiShapDriverBar
            v-for="driver in nba.shapDrivers"
            :key="driver.feature"
            :feature="driver.feature"
            :contribution="driver.contribution"
            :direction="driver.direction"
            :desc="driver.desc"
          />
        </div>
        <p class="text-[10px] text-gray-400 mt-4">
          Attribution: XGBoost SHAP TreeExplainer &middot; {{ nba.shapDrivers.length }} features analysed
        </p>
      </div>

      <!-- Col 3: Counterfactual Outcome -->
      <div class="p-5">
        <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Counterfactual Outcome</p>

        <div class="border border-red-200 bg-red-50 rounded-sm p-3 mb-2">
          <p class="text-[10px] font-bold text-absa-passion uppercase mb-1.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[12px]">close</span> Without Intervention
          </p>
          <p class="text-xs text-gray-600">
            Churn probability <span class="font-bold font-mono text-absa-passion">{{ churnProbPct }}%</span>
            &middot; AUM at risk <span class="font-bold font-mono">{{ nba.aumAtRisk }}</span>
          </p>
        </div>

        <div class="border border-green-200 bg-green-50 rounded-sm p-3 mb-3">
          <p class="text-[10px] font-bold text-green-700 uppercase mb-1.5 flex items-center gap-1">
            <span class="material-symbols-outlined text-[12px]">check</span> With Intervention
          </p>
          <p class="text-xs text-gray-600">
            Churn drops to <span class="font-bold font-mono text-green-700">{{ nba.postInterventionChurn }}%</span>
            &middot; CLV preserved: <span class="font-bold font-mono text-green-700">{{ nba.clvPreserved }}</span>
          </p>
        </div>

        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Model Confidence</p>
          <AiConfidenceBadge :score="nba.confidence" label="intervention success" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AiShapDriverBar from './AiShapDriverBar.vue'
import AiConfidenceBadge from './AiConfidenceBadge.vue'

defineOptions({ name: 'AiNbaPanel' })

const props = defineProps({
  churnProb: { type: Number, default: 0 },
  customerId: { type: String, default: '' },
  // Optional override from backend — wire later
  nbaOverride: { type: Object, default: null },
})

defineEmits(['execute', 'override'])

const churnProbPct = computed(() => Math.round((props.churnProb || 0) * 100))

const nba = computed(() => {
  // Wire to backend later — for now derive from churnProb
  if (props.nbaOverride) return props.nbaOverride
  const p = props.churnProb || 0
  const isCritical = p > 0.7
  const isHigh     = p > 0.45
  return {
    urgency:   isCritical ? 'CRITICAL' : isHigh ? 'HIGH' : 'MODERATE',
    churnWindow: isCritical ? '48 hours' : '14 days',
    action: isCritical
      ? 'Immediate RM Courtesy Call + Fee Waiver Offer'
      : 'Enrol in Digital Reactivation Campaign',
    actionDetail: isCritical
      ? 'Senior RM to contact customer directly. Model recommends a 3-month fee waiver on the primary account to reduce exit intent.'
      : 'AI identified 3 personalised SMS touchpoints over 14 days targeting digital channel re-engagement.',
    actionIcon: isCritical ? 'call' : 'campaign',
    shapDrivers: [
      { feature: 'Digital Login Frequency', contribution: 38, direction: 'risk',       desc: '0 app/web logins in 45+ days — top churn predictor' },
      { feature: 'Transaction Velocity',    contribution: 27, direction: 'risk',       desc: 'Monthly txn volume down 62% vs 90-day avg' },
      { feature: 'Account Tenure',          contribution: 15, direction: 'protective', desc: '7+ year relationship — reduces exit probability' },
    ],
    aumAtRisk:              'K 450,000',
    postInterventionChurn:  Math.max(8, Math.round(churnProbPct.value * 0.25)),
    clvPreserved:           'K 312,000',
    confidence:             84,
  }
})

const urgencyBadgeClass = computed(() => {
  const u = nba.value.urgency
  if (u === 'CRITICAL') return 'bg-absa-passion text-white'
  if (u === 'HIGH')     return 'bg-amber-400 text-absa-enrich'
  return 'bg-gray-200 text-gray-600'
})
</script>
