<template>
  <div class="w-full pt-6 px-6 pb-6">

    <!-- Page Header -->
    <div class="mb-0 pb-4 border-b border-gray-300 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
          <span>Home</span><span>/</span>
          <span>Intelligence</span><span>/</span>
          <span class="text-absa-enrich font-bold">Business Outcomes</span>
        </div>
        <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">Business Outcomes &amp; ROI</h1>
        <p class="text-body-md text-gray-500 mt-1">Retention ROI, revenue protected, success criteria tracking, and pilot performance</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="exportReport" class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none">
          <span class="material-symbols-outlined text-[16px]">download</span>
          Export Report
        </button>
        <button @click="downloadBusinessCase" class="px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none">
          <span class="material-symbols-outlined text-[16px]">description</span>
          Download Business Case
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

      <!-- ======================== TAB 1: ROI SUMMARY ======================== -->
      <div v-if="activeTab === 'roi'">

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">REVENUE PROTECTED</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">K 48.6M</p>
            <p class="text-[11px] text-gray-500 mt-1">Cumulative MTD</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">CUSTOMERS RETAINED</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">1,284</p>
            <p class="text-[11px] text-gray-500 mt-1">Via AI interventions</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">INTERVENTION COST</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">K 3.2M</p>
            <p class="text-[11px] text-gray-500 mt-1">Total campaign + RM cost</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">NET ROI</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">1,418%</p>
            <p class="text-[11px] text-gray-500 mt-1">Revenue protected ÷ cost</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">SYSTEM ROI MULTIPLE</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">15.2×</p>
            <p class="text-[11px] text-gray-500 mt-1">K returned per K1 spent</p>
          </div>
        </div>

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Monthly Revenue Protected</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Cumulative revenue saved through AI-driven retention interventions</p>
            </div>
          </div>
          <div class="p-5">
            <div class="relative h-[240px]">
              <canvas ref="roiCanvas" class="w-full h-[240px]"></canvas>
            </div>
          </div>
        </div>

      </div>

      <!-- ======================== TAB 2: RETENTION PERFORMANCE ======================== -->
      <div v-if="activeTab === 'retention'">

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Retention Performance by Branch / Entity</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Outcomes from AI-flagged intervention workflow</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-3 py-1.5">Branch / Entity</th>
                  <th class="px-3 py-1.5">At-Risk Flagged</th>
                  <th class="px-3 py-1.5">Contacted</th>
                  <th class="px-3 py-1.5">Retained</th>
                  <th class="px-3 py-1.5">Churned Despite Intervention</th>
                  <th class="px-3 py-1.5">Revenue Protected</th>
                  <th class="px-3 py-1.5">Retention Rate</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="row in (store.outcomesData?.retention_performance ?? fallbackRetention)"
                  :key="row.entity"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">{{ row.entity }}</td>
                  <td class="px-3 py-1.5 text-xs text-absa-enrich">{{ row.at_risk?.toLocaleString() ?? '—' }}</td>
                  <td class="px-3 py-1.5 text-xs text-absa-enrich">{{ row.contacted?.toLocaleString() ?? '—' }}</td>
                  <td class="px-3 py-1.5 text-xs text-absa-enrich">{{ row.retained?.toLocaleString() ?? '—' }}</td>
                  <td class="px-3 py-1.5 text-xs font-semibold" :class="row.churned_despite > 50 ? 'text-absa-passion' : 'text-absa-enrich'">
                    {{ row.churned_despite?.toLocaleString() ?? '—' }}
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich">{{ row.revenue_protected ?? '—' }}</td>
                  <td class="px-3 py-1.5 text-xs font-bold">
                    <span :class="retentionRateClass(row.retention_rate)">{{ row.retention_rate ?? '—' }}%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ======================== TAB 3: SUCCESS CRITERIA ======================== -->
      <div v-if="activeTab === 'criteria'">

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 flex items-start gap-3">
            <span class="material-symbols-outlined text-[20px] text-gray-400 mt-0.5">info</span>
            <p class="text-xs text-gray-500 leading-relaxed">
              The following success criteria were formally agreed with ABSA at project inception. This tracker provides a live view of delivery against contract commitments.
            </p>
          </div>
        </div>

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Success Criteria Tracker</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Live status against contractual delivery commitments</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-3 py-1.5 w-2/5">Success Criterion</th>
                  <th class="px-3 py-1.5">Target</th>
                  <th class="px-3 py-1.5">Current</th>
                  <th class="px-3 py-1.5">Delta</th>
                  <th class="px-3 py-1.5">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="row in (store.outcomesData?.success_criteria ?? fallbackCriteria)"
                  :key="row.criterion"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-3 py-1.5 text-xs text-absa-enrich leading-relaxed">{{ row.criterion }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ row.target }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich">{{ row.current }}</td>
                  <td class="px-3 py-1.5 text-xs font-bold font-mono" :class="isDeltaPositive(row.delta) ? 'text-absa-passion' : 'text-absa-passion'">
                    {{ row.delta }}
                  </td>
                  <td class="px-3 py-1.5">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', statusBadgeClass(row.status)]">
                      <span :class="['w-1 h-1 rounded-full', statusDotClass(row.status)]"></span>
                      {{ row.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ======================== TAB 4: PILOT VS CONTROL ======================== -->
      <div v-if="activeTab === 'pilot'">

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 flex items-start gap-3">
            <span class="material-symbols-outlined text-[20px] text-gray-400 mt-0.5">info</span>
            <p class="text-xs text-gray-500 leading-relaxed">
              The pilot programme ran across 6 branches with AI-driven retention interventions enabled. 7 branches operated as control with standard processes. Data covers the 90-day pilot period.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <!-- Pilot Card -->
          <div class="bg-white border border-gray-300 border-t-4 border-t-absa-passion rounded-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-[18px] text-absa-passion">science</span>
              <h3 class="text-sm font-bold text-absa-enrich">Pilot Branches</h3>
              <span class="ml-auto text-[11px] font-bold text-absa-passion bg-red-50 px-2 py-0.5 rounded-sm">AI ENABLED</span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Branches</p>
                <p class="text-xl font-bold font-mono text-absa-enrich">6</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Monthly Churn</p>
                <p class="text-xl font-bold font-mono text-absa-passion">5.1%</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Retention Rate</p>
                <p class="text-xl font-bold font-mono text-absa-passion">74%</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">AUM Change</p>
                <p class="text-xl font-bold font-mono text-absa-power">-1.2%</p>
              </div>
              <div class="col-span-2">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contacts per RM / Month</p>
                <p class="text-xl font-bold font-mono text-absa-enrich">28</p>
              </div>
            </div>
          </div>

          <!-- Control Card -->
          <div class="bg-white border border-gray-300 border-t-4 border-t-gray-300 rounded-sm p-5">
            <div class="flex items-center gap-2 mb-4">
              <span class="material-symbols-outlined text-[18px] text-gray-400">account_balance</span>
              <h3 class="text-sm font-bold text-absa-enrich">Control Branches</h3>
              <span class="ml-auto text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm">STANDARD</span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Branches</p>
                <p class="text-xl font-bold font-mono text-absa-enrich">7</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Monthly Churn</p>
                <p class="text-xl font-bold font-mono text-absa-passion">7.8%</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Retention Rate</p>
                <p class="text-xl font-bold font-mono text-absa-passion">58%</p>
              </div>
              <div>
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">AUM Change</p>
                <p class="text-xl font-bold font-mono text-absa-passion">-4.8%</p>
              </div>
              <div class="col-span-2">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Contacts per RM / Month</p>
                <p class="text-xl font-bold font-mono text-absa-enrich">11</p>
              </div>
            </div>
          </div>

        </div>

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Pilot vs Control — Metric Comparison</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">90-day performance across key retention metrics</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-3 py-1.5">Metric</th>
                  <th class="px-3 py-1.5">Pilot Branches</th>
                  <th class="px-3 py-1.5">Control Branches</th>
                  <th class="px-3 py-1.5">Delta</th>
                  <th class="px-3 py-1.5">Significance</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">Monthly Churn Rate</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">5.1%</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">7.8%</td>
                  <td class="px-3 py-1.5 text-xs font-bold text-absa-passion">-2.7pp</td>
                  <td class="px-3 py-1.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion">
                      <span class="w-1 h-1 rounded-full bg-absa-passion"></span>p &lt; 0.05
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">Retention Rate</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">74%</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">58%</td>
                  <td class="px-3 py-1.5 text-xs font-bold text-absa-passion">+16pp</td>
                  <td class="px-3 py-1.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion">
                      <span class="w-1 h-1 rounded-full bg-absa-passion"></span>p &lt; 0.05
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">AUM Change (90D)</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">-1.2%</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">-4.8%</td>
                  <td class="px-3 py-1.5 text-xs font-bold text-absa-passion">+3.6pp</td>
                  <td class="px-3 py-1.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion">
                      <span class="w-1 h-1 rounded-full bg-absa-passion"></span>p &lt; 0.05
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">RM Contacts per Month</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">28</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">11</td>
                  <td class="px-3 py-1.5 text-xs font-bold text-absa-passion">+17</td>
                  <td class="px-3 py-1.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion">
                      <span class="w-1 h-1 rounded-full bg-absa-passion"></span>p &lt; 0.05
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 flex items-start gap-3">
            <span class="material-symbols-outlined text-[20px] text-absa-passion mt-0.5">verified</span>
            <div>
              <p class="text-xs font-bold text-absa-enrich mb-0.5">Statistical Significance: p &lt; 0.05</p>
              <p class="text-[11px] text-gray-500 leading-relaxed">
                Results are statistically significant at the 95% confidence level. All key metrics show meaningful improvement in pilot branches versus control, validating the AI-driven intervention model.
              </p>
            </div>
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
import { downloadCsv, downloadMarkdown, notify, reportFilename, todayLabel, stamp } from '@/utils/absaExport'

const store = useIntelligenceStore()
const loading = ref(true)
const activeTab = ref('roi')
let roiChart = null
const roiCanvas = ref(null)

// ─── Export / Business Case ──────────────────────────────────────────────────

function exportReport() {
  const retention = store.outcomesData?.retention_performance ?? fallbackRetention
  const criteria = store.outcomesData?.success_criteria ?? fallbackCriteria
  const trend = store.outcomesData?.roi?.trend ?? fallbackRoiTrend
  const pilot = store.outcomesData?.pilot_vs_control ?? [
    { metric: 'Monthly Churn Rate', pilot: '5.1%', control: '7.8%', delta: '-2.7pp', significance: 'p < 0.05' },
    { metric: 'Retention Rate', pilot: '74%', control: '58%', delta: '+16pp', significance: 'p < 0.05' },
    { metric: 'AUM Change (90D)', pilot: '-1.2%', control: '-4.8%', delta: '+3.6pp', significance: 'p < 0.05' },
    { metric: 'RM Contacts per Month', pilot: 28, control: 11, delta: '+17', significance: 'p < 0.05' },
  ]
  const which = activeTab.value
  if (which === 'retention') {
    downloadCsv(reportFilename('retention-performance'), retention, ['entity', 'at_risk', 'contacted', 'retained', 'churned_despite', 'revenue_protected', 'retention_rate'])
  } else if (which === 'criteria') {
    downloadCsv(reportFilename('success-criteria'), criteria, ['criterion', 'target', 'current', 'delta', 'status'])
  } else if (which === 'pilot') {
    downloadCsv(reportFilename('pilot-vs-control'), pilot, ['metric', 'pilot', 'control', 'delta', 'significance'])
  } else {
    downloadCsv(reportFilename('revenue-protected-trend'), trend.map(t => ({ ...t, revenue_m: (t.revenue / 1e6).toFixed(1) })), ['month', 'revenue', 'revenue_m'])
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 })
}

function downloadBusinessCase() {
  const md = [
    '# ABSA Foundry — Business Outcomes & ROI',
    '',
    `Generated: ${todayLabel()}  ·  As-of: 2026-07-27`,
    '',
    '## Headline ROI',
    '- Revenue Protected (MTD): **K 48.6M**',
    '- Customers Retained: **1,284**',
    '- Intervention Cost: **K 3.2M**',
    '- Net ROI: **1,418%**',
    '- System ROI Multiple: **15.2×**',
    '',
    '## Retention Performance by Branch / Entity',
    ...((store.outcomesData?.retention_performance ?? fallbackRetention).map(r =>
      `- ${r.entity}: flagged ${r.at_risk}, contacted ${r.contacted}, retained ${r.retained} (${r.retention_rate}%)`
    )),
    '',
    '## Success Criteria',
    ...((store.outcomesData?.success_criteria ?? fallbackCriteria).map(c =>
      `- [${c.status}] ${c.criterion} — current ${c.current} (target ${c.target})`
    )),
    '',
    '## Pilot vs Control',
    '- Pilot branches: monthly churn **5.1%**, retention **74%**',
    '- Control branches: monthly churn **7.8%**, retention **58%**',
    '- Result: statistically significant (p < 0.05)',
    '',
    '_ABSA Foundry — Customer Lifecycle AI (PoC) report._',
  ].join('\n')
  downloadMarkdown(`absa-business-case-${stamp()}.md`, md)
  notify('Business case downloaded (Markdown)', 'success', { autoClose: 2500 })
}

const tabs = [
  { id: 'roi',       label: 'ROI Summary',          icon: 'trending_up' },
  { id: 'retention', label: 'Retention Performance', icon: 'verified'    },
  { id: 'criteria',  label: 'Success Criteria',      icon: 'checklist'   },
  { id: 'pilot',     label: 'Pilot vs Control',      icon: 'compare'     },
]

const fallbackRetention = [
  { entity: 'Sandton City',    at_risk: 312, contacted: 290, retained: 218, churned_despite:  72, revenue_protected: 'R 8.4M', retention_rate: 75 },
  { entity: 'Rosebank',        at_risk: 241, contacted: 220, retained: 167, churned_despite:  53, revenue_protected: 'R 6.1M', retention_rate: 76 },
  { entity: 'Cape Town CBD',   at_risk: 198, contacted: 185, retained: 128, churned_despite:  57, revenue_protected: 'R 5.2M', retention_rate: 69 },
  { entity: 'Durban Pavilion', at_risk: 176, contacted: 160, retained: 104, churned_despite:  56, revenue_protected: 'R 4.0M', retention_rate: 65 },
  { entity: 'Midrand',         at_risk: 144, contacted: 130, retained:  78, churned_despite:  52, revenue_protected: 'R 2.9M', retention_rate: 60 },
  { entity: 'Pretoria East',   at_risk: 120, contacted: 110, retained:  61, churned_despite:  49, revenue_protected: 'R 2.3M', retention_rate: 55 },
  { entity: 'Port Elizabeth',  at_risk:  98, contacted:  88, retained:  46, churned_despite:  42, revenue_protected: 'R 1.7M', retention_rate: 52 },
]

const fallbackCriteria = [
  { criterion: 'Reduce monthly portfolio churn rate from 6.8% to below 6.0% within 90 days of go-live',  target: '< 6.0%',    current: '5.1%',     delta: '-0.9pp',  status: 'MET'      },
  { criterion: 'Achieve minimum 70% retention rate on AI-flagged at-risk customers after intervention',   target: '>= 70%',    current: '74%',      delta: '+4pp',    status: 'MET'      },
  { criterion: 'Protect a minimum of R 30M in AUM from churn within the first quarter',                  target: 'R 30M',     current: 'R 48.6M',  delta: '+R18.6M', status: 'MET'      },
  { criterion: 'Deploy AI model across all 13 pilot branches within 60 days',                            target: '13 / 60D',  current: '13 / 60D', delta: 'On time', status: 'MET'      },
  { criterion: 'RM daily contact rate to exceed 20 meaningful customer touches per RM per month',        target: '20 / mo',   current: '28 / mo',  delta: '+8',      status: 'ON TRACK' },
  { criterion: 'Achieve system ROI multiple of 10x or greater by end of pilot period',                   target: '>= 10x',    current: '15.2x',    delta: '+5.2x',   status: 'MET'      },
  { criterion: 'Model precision (churn prediction accuracy) to exceed 75% on holdout set',               target: '>= 75%',    current: '78.3%',    delta: '+3.3pp',  status: 'MET'      },
  { criterion: 'Maintain customer satisfaction (NPS) above 42 during intervention period',               target: '> 42',      current: '39',       delta: '-3',      status: 'MONITOR'  },
  { criterion: 'Complete POPIA compliance review and sign-off before data processing begins',            target: 'Pre-go-live', current: 'Done',   delta: 'Done',    status: 'MET'      },
  { criterion: 'Reduce average RM time-to-contact on at-risk flag to under 48 hours',                   target: '< 48h',     current: '51h',      delta: '+3h',     status: 'AT RISK'  },
]

const fallbackRoiTrend = [
  { month: 'Feb', revenue: 3200000  },
  { month: 'Mar', revenue: 5800000  },
  { month: 'Apr', revenue: 7400000  },
  { month: 'May', revenue: 9100000  },
  { month: 'Jun', revenue: 11200000 },
  { month: 'Jul', revenue: 11900000 },
]

function statusBadgeClass(s) {
  if (s === 'MET' || s === 'ON TRACK') return 'bg-red-50 text-absa-passion'
  if (s === 'MONITOR') return 'bg-red-50 text-absa-power'
  if (s === 'AT RISK') return 'bg-red-100 text-absa-passion'
  return 'bg-gray-100 text-gray-500'
}

function statusDotClass(s) {
  if (s === 'MET' || s === 'ON TRACK') return 'bg-absa-passion'
  if (s === 'MONITOR') return 'bg-absa-power'
  if (s === 'AT RISK') return 'bg-absa-passion'
  return 'bg-gray-400'
}

function retentionRateClass(rate) {
  if (rate === null || rate === undefined) return 'text-gray-400'
  if (rate >= 75) return 'text-absa-passion'
  if (rate >= 60) return 'text-absa-power'
  return 'text-absa-passion'
}

function isDeltaPositive(delta) {
  if (!delta) return true
  const s = String(delta)
  if (s === 'On time' || s === 'Done') return true
  return !s.startsWith('-')
}

function renderRoiChart() {
  if (!roiCanvas.value) return
  if (roiChart) roiChart.destroy()
  const trend = store.outcomesData?.roi?.trend ?? fallbackRoiTrend
  roiChart = new Chart(roiCanvas.value, {
    type: 'bar',
    data: {
      labels: trend.map(t => t.month),
      datasets: [{
        label: 'Revenue Protected',
        data: trend.map(t => t.revenue / 1e6),
        backgroundColor: '#DC0037',
        borderRadius: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => 'K' + ctx.parsed.y.toFixed(1) + 'M' } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
        y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af', callback: v => 'K' + Number(v).toFixed(0) + 'M' } },
      },
    },
  })
}

onMounted(async () => {
  await store.fetchOutcomes()
  loading.value = false
  await nextTick()
  renderRoiChart()
})

watch(activeTab, async (val) => {
  if (val === 'roi') {
    await nextTick()
    renderRoiChart()
  }
})
</script>
