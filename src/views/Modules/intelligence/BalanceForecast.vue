<template>
  <div class="w-full pt-6 px-6 pb-6">

    <!-- Page Header -->
    <div class="mb-0 pb-4 border-b border-gray-300 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
          <span>Home</span><span>/</span>
          <span>Intelligence</span><span>/</span>
          <span class="text-absa-enrich font-bold">Balance Forecast</span>
        </div>
        <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">AUM Balance Forecast</h1>
        <p class="text-body-md text-gray-500 mt-1">Projected portfolio value under optimistic, base, and pessimistic churn scenarios</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="exportReport" class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none">
          <span class="material-symbols-outlined text-[16px]">download</span>
          Export Report
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="mt-6">
      <LoadingSkeleton />
    </div>

    <template v-else>
      <!-- Tab Navigation -->
      <div class="flex border-b border-gray-300 mb-6 mt-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['px-3 py-1.5 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich']"
        >
          <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <!-- ======================== TAB 1: FORECAST ======================== -->
      <div v-if="activeTab === 'forecast'">

        <!-- KPI Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">CURRENT AUM</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">K 4.57B</p>
            <p class="text-[11px] text-gray-500 mt-1">As of 27 Jul 2026</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">BASE SCENARIO (90D)</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">K 4.30B</p>
            <p class="text-[11px] text-gray-500 mt-1">Projected end of period</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">AUM AT RISK</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">K 274M</p>
            <p class="text-[11px] text-gray-500 mt-1">Base vs current delta</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">BEST CASE (90D)</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">K 4.78B</p>
            <p class="text-[11px] text-gray-500 mt-1">If churn ↓ 2pp</p>
          </div>
        </div>

        <!-- Forecast Chart Panel -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Portfolio AUM Trajectory — 90-Day Forecast</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Scenario projections based on current churn assumptions</p>
            </div>
            <div class="flex items-center gap-1">
              <button
                v-for="h in [30, 60, 90]"
                :key="h"
                @click="forecastHorizon = h"
                :class="['px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors',
                  forecastHorizon === h
                    ? 'bg-absa-enrich text-absa-serene'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200']"
              >{{ h }}D</button>
            </div>
          </div>
          <div class="p-5">
            <div class="relative h-[320px]">
              <canvas ref="forecastCanvas" class="w-full h-[320px]"></canvas>
            </div>
            <div class="flex items-center gap-6 mt-4 justify-center">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-absa-passion inline-block"></span>
                <span class="text-[11px] text-gray-500 font-semibold">Optimistic</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-absa-enrich inline-block"></span>
                <span class="text-[11px] text-gray-500 font-semibold">Base</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-absa-passion inline-block"></span>
                <span class="text-[11px] text-gray-500 font-semibold">Pessimistic</span>
              </div>
            </div>
          </div>
        </div>

      </div>


        <!-- Remediation 2: Confidence Interval Checkpoint Table -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <button
            @click="ciExpanded = !ciExpanded"
            class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors bg-gray-50 border-b border-gray-200"
          >
            <span class="material-symbols-outlined text-[18px] text-gray-400">analytics</span>
            <span class="text-sm font-bold text-absa-enrich flex-1">80% Confidence Interval Checkpoints</span>
            <span class="material-symbols-outlined text-[18px] text-gray-400 transition-transform" :class="ciExpanded ? 'rotate-180' : ''">expand_more</span>
          </button>
          <div v-if="ciExpanded">
            <div class="px-4 py-2.5 bg-white border-b border-gray-100 flex items-start gap-2">
              <span class="material-symbols-outlined text-[14px] text-gray-400 mt-0.5 flex-shrink-0">info</span>
              <p class="text-[11px] text-gray-500 leading-relaxed">The <strong class="text-absa-enrich">80% confidence interval (P10-P90)</strong> around the base projection. Generated via Monte Carlo simulation (10,000 trajectories). A wider spread indicates higher uncertainty.</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Checkpoint</th>
                    <th class="px-3 py-2 text-[11px] font-bold text-absa-passion uppercase tracking-wider">P10 (Pessimistic)</th>
                    <th class="px-3 py-2 text-[11px] font-bold text-absa-enrich uppercase tracking-wider">Base Projection</th>
                    <th class="px-3 py-2 text-[11px] font-bold text-absa-passion uppercase tracking-wider">P90 (Optimistic)</th>
                    <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Range Width</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(cp, i) in (store.forecastData?.ci_checkpoints ?? [])" :key="i" :class="i === 0 ? 'bg-gray-50' : 'hover:bg-gray-50 transition-colors'">
                    <td class="px-3 py-1.5"><span class="text-xs font-semibold text-absa-enrich">{{ cp.label }}</span><span v-if="i === 0" class="ml-2 text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-sm font-bold">NOW</span></td>
                    <td class="px-3 py-1.5"><span class="text-xs font-mono text-absa-passion font-bold">K {{ cp.p10 }}B</span></td>
                    <td class="px-3 py-1.5"><span class="text-xs font-mono font-bold text-absa-enrich">K {{ cp.base }}B</span></td>
                    <td class="px-3 py-1.5"><span class="text-xs font-mono text-absa-passion font-bold">K {{ cp.p90 }}B</span></td>
                    <td class="px-3 py-1.5"><span class="text-xs font-mono text-gray-500">K {{ (cp.p90 - cp.p10).toFixed(0) }}B</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      <!-- ======================== TAB 2: BY SEGMENT ======================== -->
      <div v-if="activeTab === 'by_segment'">

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">AUM by Customer Segment</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Current vs projected remaining AUM across segments</p>
            </div>
          </div>
          <div class="p-5">
            <div
              v-for="seg in (store.forecastData?.by_segment ?? fallbackSegments)"
              :key="seg.segment"
              class="mb-5 last:mb-0"
            >
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-xs font-bold text-absa-enrich">{{ seg.segment }}</span>
                <span class="text-[11px] text-absa-passion font-bold">{{ formatAum(seg.aum_at_risk) }} at risk</span>
              </div>
              <div class="mb-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-gray-400 w-20 shrink-0">Current</span>
                  <div class="flex-1 h-3 bg-gray-100 rounded-sm overflow-hidden">
                    <div class="h-full bg-absa-enrich rounded-sm" :style="{ width: segBarWidth(seg.current_aum, seg) + '%' }"></div>
                  </div>
                  <span class="text-[11px] font-mono text-absa-enrich w-16 text-right">{{ formatAum(seg.current_aum) }}</span>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-gray-400 w-20 shrink-0">Projected</span>
                  <div class="flex-1 h-3 bg-gray-100 rounded-sm overflow-hidden">
                    <div class="h-full bg-absa-passion rounded-sm" :style="{ width: segBarWidth(seg.projected_remaining, seg) + '%' }"></div>
                  </div>
                  <span class="text-[11px] font-mono text-absa-passion w-16 text-right">{{ formatAum(seg.projected_remaining) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Segment Breakdown</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Detailed forecast figures by customer segment</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-3 py-1.5">Segment</th>
                  <th class="px-3 py-1.5">Current AUM</th>
                  <th class="px-3 py-1.5">Projected Exits</th>
                  <th class="px-3 py-1.5">AUM at Risk</th>
                  <th class="px-3 py-1.5">Projected Remaining AUM</th>
                  <th class="px-3 py-1.5">% Change</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="seg in (store.forecastData?.by_segment ?? fallbackSegments)"
                  :key="seg.segment"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">{{ seg.segment }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ formatAum(seg.current_aum) }}</td>
                  <td class="px-3 py-1.5 text-xs text-absa-enrich">{{ seg.projected_exits?.toLocaleString() ?? '—' }}</td>
                  <td class="px-3 py-1.5 text-xs font-bold font-mono text-absa-passion">{{ formatAum(seg.aum_at_risk) }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ formatAum(seg.projected_remaining) }}</td>
                  <td class="px-3 py-1.5 text-xs font-bold" :class="seg.pct_change < 0 ? 'text-absa-passion' : 'text-absa-passion'">
                    {{ seg.pct_change > 0 ? '+' : '' }}{{ seg.pct_change?.toFixed(1) ?? '—' }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ======================== TAB 3: SENSITIVITY ======================== -->
      <div v-if="activeTab === 'sensitivity'">

        <!-- Remediation 6: Collapsible sensitivity scope note -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <button @click="sensitivityExpanded = !sensitivityExpanded" class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors">
            <span class="material-symbols-outlined text-[18px] text-gray-400">info</span>
            <span class="text-xs font-semibold text-gray-600 flex-1">How to read the Sensitivity Analysis</span>
            <span class="material-symbols-outlined text-[18px] text-gray-400" :class="sensitivityExpanded ? 'rotate-180' : ''">expand_more</span>
          </button>
          <div v-if="sensitivityExpanded" class="px-4 pb-3 pt-0 border-t border-gray-100">
            <p class="text-xs text-gray-500 leading-relaxed">Each row shows a churn scenario vs. the base. <strong class="text-absa-enrich">Delta vs Base</strong> shows the projected AUM gain or loss if actual churn deviates from the base assumption.</p>
          </div>
        </div>
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Churn Sensitivity Analysis</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">90-day AUM outcome across churn rate assumptions</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-3 py-1.5">Scenario</th>
                  <th class="px-3 py-1.5">Churn Assumption</th>
                  <th class="px-3 py-1.5">Projected AUM (90D)</th>
                  <th class="px-3 py-1.5">Delta vs Base</th>
                  <th class="px-3 py-1.5">AUM Change %</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="row in (store.forecastData?.sensitivity ?? fallbackSensitivity)"
                  :key="row.scenario"
                  :class="['hover:bg-gray-50 transition-colors', row.is_base ? 'bg-gray-50 font-bold' : '']"
                >
                  <td class="px-3 py-1.5 text-xs text-absa-enrich" :class="row.is_base ? 'font-bold' : ''">
                    {{ row.scenario }}
                    <span v-if="row.is_base" class="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-gray-200 text-gray-500">BASE</span>
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ row.churn_assumption }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich" :class="row.is_base ? 'font-bold' : ''">{{ formatAum(row.projected_aum) }}</td>
                  <td class="px-3 py-1.5 text-xs font-bold font-mono" :class="row.delta >= 0 ? 'text-absa-passion' : 'text-absa-passion'">
                    {{ row.delta >= 0 ? '+' : '' }}{{ formatAum(row.delta) }}
                  </td>
                  <td class="px-3 py-1.5 text-xs font-bold" :class="row.pct_change >= 0 ? 'text-absa-passion' : 'text-absa-passion'">
                    {{ row.pct_change >= 0 ? '+' : '' }}{{ row.pct_change?.toFixed(1) ?? '—' }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup>
import AbsaCard from '@/components/ui/AbsaCard.vue'
import AbsaBadge from '@/components/ui/AbsaBadge.vue'
import ChurnProbabilityBar from '@/components/telemetry/ChurnProbabilityBar.vue'
import HealthScoreGauge from '@/components/telemetry/HealthScoreGauge.vue'
import StateBadge from '@/components/telemetry/StateBadge.vue'
import StateTimeline from '@/components/telemetry/StateTimeline.vue'
import MarkovMatrix from '@/components/telemetry/MarkovMatrix.vue'
import { ref, onMounted, watch, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useIntelligenceStore } from '@/stores/intelligenceStore'
import { downloadCsv, notify, reportFilename } from '@/utils/absaExport'

const store = useIntelligenceStore()
const loading = ref(true)
const activeTab = ref('forecast')
const forecastHorizon = ref(90)
const ciExpanded = ref(true)
const sensitivityExpanded = ref(true)
const forecastCanvas = ref(null)
let chartInstance = null

const tabs = [
  { id: 'forecast',    label: 'Forecast',    icon: 'show_chart' },
  { id: 'by_segment', label: 'By Segment',   icon: 'bar_chart'  },
  { id: 'sensitivity', label: 'Sensitivity', icon: 'tune'       },
]

const fallbackSegments = [
  { segment: 'Prestige',      current_aum: 1820000000, projected_remaining: 1720000000, aum_at_risk: 100000000, projected_exits: 412, pct_change: -5.5 },
  { segment: 'Private',       current_aum: 1240000000, projected_remaining: 1160000000, aum_at_risk:  80000000, projected_exits: 218, pct_change: -6.5 },
  { segment: 'Gold',          current_aum:  890000000, projected_remaining:  844000000, aum_at_risk:  46000000, projected_exits: 361, pct_change: -5.2 },
  { segment: 'Transactional', current_aum:  620000000, projected_remaining:  572000000, aum_at_risk:  48000000, projected_exits: 529, pct_change: -7.7 },
]

const fallbackSensitivity = [
  { scenario: 'Very Low Churn',  churn_assumption: '3.0% / mo', projected_aum: 4780000000, delta:  210000000, pct_change:  4.6, is_base: false },
  { scenario: 'Low Churn',       churn_assumption: '4.5% / mo', projected_aum: 4550000000, delta:  -20000000, pct_change: -0.4, is_base: false },
  { scenario: 'Base Case',       churn_assumption: '6.0% / mo', projected_aum: 4296000000, delta:          0, pct_change:  0.0, is_base: true  },
  { scenario: 'Elevated Churn',  churn_assumption: '7.5% / mo', projected_aum: 4080000000, delta: -216000000, pct_change: -5.0, is_base: false },
  { scenario: 'High Churn',      churn_assumption: '9.0% / mo', projected_aum: 3820000000, delta: -476000000, pct_change:-11.1, is_base: false },
  { scenario: 'Stress',          churn_assumption:'12.0% / mo', projected_aum: 3340000000, delta: -956000000, pct_change:-22.2, is_base: false },
]

function formatAum(val) {
  if (val === null || val === undefined) return '—'
  if (Math.abs(val) >= 1e9) return 'K' + (val / 1e9).toFixed(2) + 'B'
  if (Math.abs(val) >= 1e6) return 'K' + (val / 1e6).toFixed(0) + 'M'
  return 'K' + val.toLocaleString()
}

function segBarWidth(value, seg) {
  const max = seg.current_aum || 1
  return Math.max(2, Math.min(100, (value / max) * 100))
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportReport() {
  const which = activeTab.value
  const f = store.forecastData ?? {}
  if (which === 'forecast') {
    const cps = f.ci_checkpoints ?? []
    const rows = cps.length
      ? cps
      : (f.labels ?? []).map((lbl, i) => ({
          checkpoint: lbl,
          optimistic: f.scenarios?.optimistic?.[i],
          base: f.scenarios?.base?.[i],
          pessimistic: f.scenarios?.pessimistic?.[i],
        }))
    downloadCsv(reportFilename('aum-forecast'), rows)
  } else if (which === 'by_segment') {
    downloadCsv(reportFilename('forecast-by-segment'), f.by_segment ?? fallbackSegments, ['segment', 'current_aum', 'projected_remaining', 'aum_at_risk', 'projected_exits', 'pct_change'])
  } else {
    downloadCsv(reportFilename('forecast-sensitivity'), f.sensitivity ?? fallbackSensitivity, ['scenario', 'churn_assumption', 'projected_aum', 'delta', 'pct_change', 'is_base'])
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 })
}

function renderChart() {
  if (!forecastCanvas.value) return
  const f = store.forecastData
  const labels      = f?.labels            ?? ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7','Wk 8','Wk 9','Wk 10','Wk 11','Wk 12','Wk 13']
  const optimistic  = f?.scenarios?.optimistic  ?? [4.57,4.60,4.63,4.65,4.68,4.70,4.72,4.74,4.75,4.76,4.77,4.78,4.78]
  const base        = f?.scenarios?.base        ?? [4.57,4.54,4.51,4.49,4.47,4.45,4.43,4.40,4.38,4.36,4.34,4.31,4.30]
  const pessimistic = f?.scenarios?.pessimistic ?? [4.57,4.51,4.45,4.39,4.33,4.27,4.21,4.15,4.10,4.05,4.01,3.97,3.94]
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(forecastCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Optimistic',  data: optimistic,  borderColor: '#DC0037', backgroundColor: 'rgba(220,0,55,0.05)',  tension: 0.4, fill: false, borderWidth: 2, pointRadius: 2 },
        { label: 'Base',        data: base,        borderColor: '#131010', backgroundColor: 'rgba(19,16,16,0.04)',   tension: 0.4, fill: '-1',  borderWidth: 2, pointRadius: 2 },
        { label: 'Pessimistic', data: pessimistic, borderColor: '#77021E', backgroundColor: 'rgba(119,2,30,0.05)',  tension: 0.4, fill: false, borderWidth: 2, pointRadius: 2, borderDash: [4,4] },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
        y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af', callback: (v) => 'K' + Number(v).toFixed(2) + 'B' } },
      },
    },
  })
}

onMounted(async () => {
  await store.fetchForecast()
  loading.value = false
  await nextTick()
  renderChart()
})

watch(() => store.forecastData, async () => {
  await nextTick()
  renderChart()
})

watch(activeTab, async (val) => {
  if (val === 'forecast') {
    await nextTick()
    renderChart()
  }
})
</script>
