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
        <button
          @click="runForecastModel"
          :disabled="runningForecast"
          class="px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none disabled:opacity-50"
        >
          <span class="material-symbols-outlined text-[18px]">{{ runningForecast ? 'hourglass_top' : 'model_training' }}</span>
          {{ runningForecast ? 'Running…' : 'Run Forecast Model' }}
        </button>
        <button @click="exportReport" class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none">
          <span class="material-symbols-outlined text-[16px]">download</span>
          Export Report
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="mt-6">
      <LoadingSkeleton type="stats" />
    </div>

    <!-- Unavailable State -->
    <div v-else-if="forecastUnavailable" class="mt-6 rounded-sm border border-gray-300 bg-white p-8 text-center">
      <span class="material-symbols-outlined text-[32px] text-gray-400">cloud_off</span>
      <p class="text-sm font-bold text-absa-enrich mt-2">Balance forecast unavailable</p>
      <p class="text-[12px] text-gray-500 mt-1">
        {{ store.error?.forecast || 'No feature snapshot exists for the selected as-of date.' }}
      </p>
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
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ formatAum(forecast?.current_aum) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">
              {{ forecast?.as_of_date ? `As of ${formatDate(forecast.as_of_date)}` : 'No snapshot' }}
            </p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">BASE SCENARIO (90D)</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ formatAum(forecast?.base_scenario_aum_90d) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Projected end of period</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">AUM AT RISK</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ formatAum(forecast?.aum_at_risk) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Base vs current delta</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">BEST CASE (90D)</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ formatAum(forecast?.best_case_aum_90d) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">If churn improves 2pp</p>
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
              <p class="text-[11px] text-gray-500 leading-relaxed">The <strong class="text-absa-enrich">80% confidence interval (P10-P90)</strong> around the base projection. Computed analytically from the sum of independent per-customer churn outcomes (normal approximation, z = 1.2816) — not a simulation. A wider spread indicates higher uncertainty.</p>
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
                    <td class="px-3 py-1.5"><span class="text-xs font-mono text-absa-passion font-bold">{{ formatAum(cp.p10) }}</span></td>
                    <td class="px-3 py-1.5"><span class="text-xs font-mono font-bold text-absa-enrich">{{ formatAum(cp.base) }}</span></td>
                    <td class="px-3 py-1.5"><span class="text-xs font-mono text-absa-passion font-bold">{{ formatAum(cp.p90) }}</span></td>
                    <td class="px-3 py-1.5"><span class="text-xs font-mono text-gray-500">{{ formatAum(cp.p90 - cp.p10) }}</span></td>
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
              v-for="seg in (store.forecastData?.by_segment ?? [])"
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
                  v-for="seg in (store.forecastData?.by_segment ?? [])"
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
                  v-for="row in (store.forecastData?.sensitivity ?? [])"
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
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useIntelligenceStore } from '@/stores/intelligenceStore'
import { downloadCsv, notify, reportFilename } from '@/utils/absaExport'
import { formatDate } from '@/utils/formatting'

import { useSnapshotStore } from '@/stores/snapshotStore'

const store = useIntelligenceStore()
const snapshotStore = useSnapshotStore()
const loading = ref(true)
const activeTab = ref('forecast')
const forecastHorizon = ref(90)
const ciExpanded = ref(true)
const sensitivityExpanded = ref(true)
const forecastCanvas = ref(null)
let chartInstance = null

const forecast = computed(() => store.forecastData ?? null)

// No dummy values: every figure on this page comes from the forecast endpoint,
// so an absent/empty payload must read as "unavailable", not as a stand-in.
const forecastUnavailable = computed(
  () => !store.forecastData || store.forecastData.status === 'NO_DATA' || !!store.error?.forecast
)

const tabs = [
  { id: 'forecast',    label: 'Forecast',    icon: 'show_chart' },
  { id: 'by_segment', label: 'By Segment',   icon: 'bar_chart'  },
  { id: 'sensitivity', label: 'Sensitivity', icon: 'tune'       },
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

// ─── Run Forecast Model ───────────────────────────────────────────────────────

const runningForecast = ref(false)

async function runForecastModel() {
  if (runningForecast.value) return
  runningForecast.value = true
  try {
    const summary = await store.runForecastModel()
    if (summary?.status === 'MODEL_NOT_LOADED') {
      notify('Balance Growth model is not loaded — no predictions were produced', 'error', { autoClose: 6000 })
      return
    }
    if (summary?.status === 'NO_DATA') {
      notify(`No feature data for ${snapshotStore.asOfDate}`, 'error', { autoClose: 6000 })
      return
    }
    const n = summary?.customers_scored ?? 0
    const meanGrowth = summary?.mean_balance_growth_pct ?? 0
    notify(
      `Balance Growth model ran for ${n} customers · mean growth ${meanGrowth > 0 ? '+' : ''}${(meanGrowth).toFixed(2)}%`,
      'success',
      { autoClose: 5000 },
    )
    // Re-fetch the forecast so the chart updates immediately with the new ML scores
    await store.fetchForecast()
    await nextTick()
    renderChart()
  } catch (e) {
    notify(e?.message || 'Forecast model run failed', 'error', { autoClose: 6000 })
  } finally {
    runningForecast.value = false
  }
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
    downloadCsv(reportFilename('forecast-by-segment'), f.by_segment ?? [], ['segment', 'current_aum', 'projected_remaining', 'aum_at_risk', 'projected_exits', 'pct_change'])
  } else {
    downloadCsv(reportFilename('forecast-sensitivity'), f.sensitivity ?? [], ['scenario', 'churn_assumption', 'projected_aum', 'delta', 'pct_change', 'is_base'])
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 })
}

function renderChart() {
  if (!forecastCanvas.value) return
  const f = store.forecastData
  const labels      = f?.labels            ?? []
  const optimistic  = f?.scenarios?.optimistic  ?? []
  const base        = f?.scenarios?.base        ?? []
  const pessimistic = f?.scenarios?.pessimistic ?? []
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
        y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af', callback: (v) => formatAum(Number(v)) } },
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
