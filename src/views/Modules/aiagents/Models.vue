<template>
  <div class="w-full pt-6 px-6 pb-6">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="min-h-screen flex flex-col space-y-6">
        <LoadingSkeleton type="block" />
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div class="space-y-4">
            <LoadingSkeleton type="kpi" />
            <LoadingSkeleton type="kpi" />
            <LoadingSkeleton type="kpi" />
          </div>
          <div class="lg:col-span-3"><LoadingSkeleton type="block" /></div>
        </div>
        <LoadingSkeleton type="table" :count="4" />
      </div>
    </template>

    <template v-else>
      <!-- ── Page Header ── -->
      <div class="mb-0 pb-4 border-b border-gray-300 flex justify-between items-end">
        <div>
          <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
            <span>Dashboard</span><span>/</span>
            <span>AI Agents</span><span>/</span>
            <span class="text-absa-enrich font-bold">Models</span>
          </div>
          <div class="flex items-center gap-3 mt-1">
            <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">{{ modelDetails.name || 'Churn Model' }}</h1>
            <span v-if="modelDetails.status" class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 rounded-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>{{ modelDetails.status }}
            </span>
            <span class="inline-flex items-center px-2 py-0.5 text-xs font-bold bg-gray-100 text-gray-600 rounded-sm font-mono">CHAMPION</span>
            <span class="inline-flex items-center px-2 py-0.5 text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-sm">RISK TIER: HIGH</span>
          </div>
          <p class="text-body-md text-gray-500 mt-1">{{ modelsStore.modelCount }} models in registry · Churn Prediction Pipeline · Last evaluated {{ lastEvaluatedDate }}</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none">
            <i class="fa-solid fa-download text-[13px]"></i> Export MRM Report
          </button>
          <button class="px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors font-label text-sm font-semibold shadow-none">
            <i class="fa-solid fa-rotate-right text-[13px]"></i> Request Retrain
          </button>
        </div>
      </div>

      <!-- ── Tab Navigation ── -->
      <div class="flex border-b border-gray-300 mb-6">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          :class="['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold relative',
            activeTab === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich']">
          <i :class="['fa-solid text-[13px]', tab.icon]"></i>
          {{ tab.label }}
          <span v-if="tab.badge" class="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-absa-passion text-white rounded-full">{{ tab.badge }}</span>
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: OVERVIEW                                       -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-if="activeTab === 'overview'">
        <!-- KPI Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div v-for="kpi in overviewKpis" :key="kpi.label" class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{{ kpi.label }}</p>
            <p class="text-2xl font-bold text-absa-enrich font-mono">{{ kpi.value }}</p>
            <p v-if="kpi.note" class="text-[11px] text-gray-500 mt-1">{{ kpi.note }}</p>
          </div>
        </div>

        <!-- Chart + Small cards -->
        <div class="flex flex-col lg:flex-row gap-6 mb-6">
          <!-- Sparkline side cards -->
          <div class="flex flex-col gap-4 lg:w-60 flex-shrink-0">
            <div class="p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]">
              <div class="flex justify-between items-start">
                <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">AUC-ROC</h3>
                <span class="text-[11px] font-semibold text-green-600 flex items-center gap-1"><i class="fa-solid fa-arrow-up text-[9px]"></i>+0.3%</span>
              </div>
              <div class="text-2xl font-bold text-absa-enrich font-mono mb-1">{{ modelMetrics.aucRoc.value }}</div>
              <div class="h-8 w-full relative"><canvas ref="sparklineAucCanvas"></canvas></div>
            </div>
            <div class="p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]">
              <div class="flex justify-between items-start">
                <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Log Loss</h3>
                <span class="text-[11px] text-gray-400">Lower is better</span>
              </div>
              <div class="text-2xl font-bold text-absa-enrich font-mono mb-1">{{ modelMetrics.logLoss.value }}</div>
              <div class="h-8 w-full relative"><canvas ref="sparklineF1Canvas"></canvas></div>
            </div>
            <div class="p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[120px]">
              <div class="flex justify-between items-start">
                <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Brier Score</h3>
                <span class="text-[11px] text-gray-400">Calibration</span>
              </div>
              <div class="text-2xl font-bold text-absa-enrich font-mono">{{ modelMetrics.brier.value }}</div>
            </div>
          </div>

          <!-- Main Performance Chart -->
          <div class="flex-grow p-5 rounded-sm border border-gray-300">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-sm font-bold text-absa-enrich">Performance Over Time (30D)</h3>
                <p class="text-[11px] text-gray-500 mt-0.5">Precision & Recall on hold-out evaluation set</p>
              </div>
              <div class="flex items-center gap-4 text-[11px] font-semibold text-gray-600">
                <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-absa-passion inline-block"></span>Precision</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-absa-passion/40 inline-block"></span>Recall</span>
              </div>
            </div>
            <div class="relative w-full h-[300px]"><canvas ref="mainChartCanvas"></canvas></div>
          </div>
        </div>

        <!-- Active Alerts Strip -->
        <div v-if="activeAlerts.length > 0" class="mb-6 rounded-sm border border-absa-passion/30 bg-red-50 p-4">
          <p class="text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-2 flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation"></i> {{ activeAlerts.length }} Active Alert{{ activeAlerts.length > 1 ? 's' : '' }} — Action Required
          </p>
          <div class="space-y-1">
            <div v-for="a in activeAlerts.slice(0,2)" :key="a.id" class="text-sm text-gray-700 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-absa-passion flex-shrink-0"></span>
              <span class="font-mono font-semibold text-absa-enrich">{{ a.feature }}</span>
              <span>{{ a.message }}</span>
              <span class="ml-auto text-[11px] text-gray-400">{{ a.since }}</span>
            </div>
          </div>
          <button @click="activeTab = 'alerts'" class="mt-3 text-xs font-bold text-absa-passion hover:underline">View all alerts →</button>
        </div>

        <!-- KS Statistic + Drift Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">KS Statistic</p>
            <p class="text-2xl font-bold text-absa-enrich font-mono">{{ overviewKpis.find(k => k.label === 'KS Stat')?.value || '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Kolmogorov–Smirnov discrimination power</p>
          </div>
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Features in Drift</p>
            <p class="text-2xl font-bold font-mono" :class="driftingFeatureCount > 0 ? 'text-absa-inspire' : 'text-absa-passion'">{{ driftingFeatureCount }}</p>
            <p class="text-[11px] text-gray-500 mt-1">of {{ featureDriftList.length }} features exceeding PSI threshold</p>
          </div>
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Avg Inference Latency</p>
            <p class="text-2xl font-bold text-absa-enrich font-mono">{{ avgLatency }}</p>
            <p class="text-[11px] text-gray-500 mt-1">P95 across last 50 predictions</p>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: PERFORMANCE                                    -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'performance'">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <!-- Confusion Matrix -->
          <div class="border border-gray-300 rounded-sm overflow-hidden">
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-sm font-bold text-absa-enrich">Confusion Matrix</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">At decision threshold: {{ threshold.toFixed(2) }}</p>
            </div>
            <div class="p-6">
              <!-- Threshold slider -->
              <div class="flex items-center gap-4 mb-6">
                <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider w-24">Threshold</span>
                <input type="range" v-model="threshold" min="0.1" max="0.9" step="0.05" class="flex-grow accent-absa-passion h-1.5 cursor-pointer" />
                <span class="font-mono text-sm font-bold text-absa-enrich w-12 text-right">{{ threshold.toFixed(2) }}</span>
              </div>
              <!-- Matrix grid -->
              <div class="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                <div class="rounded-sm p-4 text-center bg-green-50 border border-green-200">
                  <p class="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">True Negative</p>
                  <p class="text-3xl font-bold text-absa-enrich font-mono">{{ confusionMatrix.tn }}</p>
                  <p class="text-[10px] text-gray-500 mt-1">Correctly predicted "Retain"</p>
                </div>
                <div class="rounded-sm p-4 text-center bg-red-50 border border-absa-passion/30">
                  <p class="text-[10px] font-bold text-absa-inspire uppercase tracking-wider mb-1">False Positive</p>
                  <p class="text-3xl font-bold text-absa-inspire font-mono">{{ confusionMatrix.fp }}</p>
                  <p class="text-[10px] text-gray-500 mt-1">Wrongly flagged "Churn"</p>
                </div>
                <div class="rounded-sm p-4 text-center bg-amber-50 border border-amber-200">
                  <p class="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">False Negative</p>
                  <p class="text-3xl font-bold text-amber-700 font-mono">{{ confusionMatrix.fn }}</p>
                  <p class="text-[10px] text-gray-500 mt-1">Missed churners (risk)</p>
                </div>
                <div class="rounded-sm p-4 text-center bg-green-50 border border-green-200">
                  <p class="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1">True Positive</p>
                  <p class="text-3xl font-bold text-green-700 font-mono">{{ confusionMatrix.tp }}</p>
                  <p class="text-[10px] text-gray-500 mt-1">Correctly caught churners</p>
                </div>
              </div>
              <!-- Derived metrics at threshold -->
              <div class="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-gray-200">
                <div class="text-center">
                  <p class="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Precision</p>
                  <p class="text-lg font-bold text-absa-enrich font-mono mt-1">{{ derivedMetrics.precision }}</p>
                </div>
                <div class="text-center">
                  <p class="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Recall</p>
                  <p class="text-lg font-bold text-absa-enrich font-mono mt-1">{{ derivedMetrics.recall }}</p>
                </div>
                <div class="text-center">
                  <p class="text-[10px] text-gray-500 uppercase tracking-wider font-bold">F1 Score</p>
                  <p class="text-lg font-bold text-absa-enrich font-mono mt-1">{{ derivedMetrics.f1 }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Segment-Level Performance -->
          <div class="border border-gray-300 rounded-sm overflow-hidden">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 class="text-sm font-bold text-absa-enrich">Performance by Segment</h3>
                <p class="text-[11px] text-gray-500 mt-0.5">AUC-ROC disaggregated by customer segment</p>
              </div>
              <span class="text-[10px] text-gray-400 font-mono">SARB Fairness Monitoring</span>
            </div>
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                  <th class="px-4 py-3">Segment</th>
                  <th class="px-4 py-3">Customers</th>
                  <th class="px-4 py-3">AUC-ROC</th>
                  <th class="px-4 py-3">F1</th>
                  <th class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                <tr v-for="seg in segmentPerformance" :key="seg.name" class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 font-semibold text-absa-enrich">{{ seg.name }}</td>
                  <td class="px-4 py-3 text-gray-600 font-mono text-xs">{{ seg.customers }}</td>
                  <td class="px-4 py-3 font-mono text-xs font-bold">{{ seg.auc }}</td>
                  <td class="px-4 py-3 font-mono text-xs">{{ seg.f1 }}</td>
                  <td class="px-4 py-3">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', seg.statusClass]">
                      <span class="w-1 h-1 rounded-full" :class="seg.dotClass"></span>{{ seg.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Threshold Sensitivity -->
        <div class="border border-gray-300 rounded-sm overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h3 class="text-sm font-bold text-absa-enrich">Threshold Sensitivity Analysis</h3>
            <p class="text-[11px] text-gray-500 mt-0.5">How Precision, Recall and F1 respond across decision thresholds</p>
          </div>
          <div class="p-5">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    <th class="px-3 py-3">Threshold</th>
                    <th class="px-3 py-3">Precision</th>
                    <th class="px-3 py-3">Recall</th>
                    <th class="px-3 py-3">F1 Score</th>
                    <th class="px-3 py-3">FP Rate</th>
                    <th class="px-3 py-3">Estimated Cost (Interventions)</th>
                    <th class="px-3 py-3">Recommended</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-sm font-mono">
                  <tr v-for="row in thresholdTable" :key="row.threshold" :class="['hover:bg-gray-50 transition-colors', row.recommended ? 'bg-amber-50' : '']">
                    <td class="px-3 py-3 font-bold" :class="row.recommended ? 'text-absa-passion' : 'text-absa-enrich'">{{ row.threshold }}</td>
                    <td class="px-3 py-3 text-gray-700">{{ row.precision }}</td>
                    <td class="px-3 py-3 text-gray-700">{{ row.recall }}</td>
                    <td class="px-3 py-3 font-bold text-absa-enrich">{{ row.f1 }}</td>
                    <td class="px-3 py-3" :class="parseFloat(row.fpRate) > 0.15 ? 'text-absa-passion font-bold' : 'text-gray-700'">{{ row.fpRate }}</td>
                    <td class="px-3 py-3 text-gray-600">{{ row.cost }}</td>
                    <td class="px-3 py-3">
                      <span v-if="row.recommended" class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-sm">
                        <i class="fa-solid fa-star text-[9px]"></i> OPTIMAL
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: DRIFT & STABILITY                              -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'drift'">
        <!-- PSI Summary bar -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Features Monitored</p>
            <p class="text-2xl font-bold text-absa-enrich font-mono">{{ featureDriftList.length || 12 }}</p>
          </div>
          <div class="border rounded-sm p-4" :class="driftingFeatureCount > 0 ? 'border-absa-inspire/50 bg-red-50' : 'border-gray-300'">
            <p class="text-[11px] font-bold uppercase tracking-wider mb-2" :class="driftingFeatureCount > 0 ? 'text-absa-inspire' : 'text-gray-500'">Drifting Features (PSI &gt; 0.20)</p>
            <p class="text-2xl font-bold font-mono" :class="driftingFeatureCount > 0 ? 'text-absa-inspire' : 'text-absa-passion'">{{ driftingFeatureCount }}</p>
          </div>
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Last Drift Scan</p>
            <p class="text-2xl font-bold text-absa-enrich font-mono">{{ lastDriftScan }}</p>
          </div>
        </div>

        <!-- Feature Drift Table (full) -->
        <div class="border border-gray-300 rounded-sm overflow-hidden mb-6">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-absa-enrich">Feature Drift Monitor (PSI)</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Population Stability Index — Training vs. Current Inference Distribution</p>
            </div>
            <div class="flex items-center gap-2 text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-sm px-3 py-1.5">
              <i class="fa-solid fa-circle-info text-[11px]"></i> Threshold: 0.20 PSI (WARNING) · 0.25 (CRITICAL)
            </div>
          </div>
          <div class="overflow-x-auto table-container">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                  <th class="px-5 py-3">Feature Name</th>
                  <th class="px-4 py-3">Training Mean</th>
                  <th class="px-4 py-3">Current Mean</th>
                  <th class="px-4 py-3">Δ Mean</th>
                  <th class="px-4 py-3">PSI Score</th>
                  <th class="px-4 py-3">Distribution Shift</th>
                  <th class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-if="featureDriftList.length === 0">
                  <td colspan="7" class="p-12 text-center text-gray-500">No feature drift data available from backend</td>
                </tr>
                <tr v-for="(row, idx) in driftTableRows" :key="idx" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3 font-medium text-absa-enrich">
                    <div class="flex items-center gap-2">
                      <div class="w-0.5 h-4 rounded-full" :class="row.scoreClass.includes('passion') ? 'bg-absa-passion' : 'bg-gray-300'"></div>
                      {{ row.name }}
                    </div>
                  </td>
                  <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ row.trainMean }}</td>
                  <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ row.currentMean }}</td>
                  <td class="px-4 py-3 font-mono text-xs" :class="row.delta > 0 ? 'text-absa-energy font-semibold' : 'text-gray-600'">{{ row.deltaStr }}</td>
                  <td class="px-4 py-3 font-mono text-xs font-bold" :class="row.scoreClass">{{ row.score }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-0.5 w-24">
                      <div class="h-4 flex-1 rounded-sm" :class="row.shiftDir === 'left' ? 'bg-absa-passion/60' : 'bg-gray-200'"></div>
                      <div class="w-px h-5 bg-gray-400 mx-0.5"></div>
                      <div class="h-4 flex-1 rounded-sm" :class="row.shiftDir === 'right' ? 'bg-absa-passion/60' : 'bg-gray-200'"></div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', row.badgeClass]">
                      <span class="w-1 h-1 rounded-full" :class="row.dotClass"></span>{{ row.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- PSI Trend Note -->
        <div class="border border-l-4 border-l-absa-passion border-gray-300 rounded-sm p-4 bg-white">
          <p class="text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-1">PSI Interpretation Guide</p>
          <div class="grid grid-cols-3 gap-4 text-xs text-gray-600">
            <div><span class="font-bold text-green-600">PSI &lt; 0.10</span> — No significant change. Model is stable.</div>
            <div><span class="font-bold text-amber-600">0.10 ≤ PSI &lt; 0.25</span> — Moderate shift. Investigation recommended.</div>
            <div><span class="font-bold text-absa-passion">PSI ≥ 0.25</span> — Major shift. Retraining or model review required immediately.</div>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: GOVERNANCE                                     -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'governance'">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <!-- Model Card -->
          <div class="xl:col-span-2 border border-gray-300 rounded-sm overflow-hidden">
            <div class="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 class="text-sm font-bold text-absa-enrich">Model Card</h3>
                <p class="text-[11px] text-gray-500 mt-0.5">SR 11-7 / SARB MRM Framework compliant documentation</p>
              </div>
              <span class="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-sm border border-green-200">APPROVED</span>
            </div>
            <div class="divide-y divide-gray-100">
              <div v-for="field in modelCardFields" :key="field.label" class="px-5 py-3 flex items-start">
                <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider w-52 flex-shrink-0 pt-0.5">{{ field.label }}</span>
                <span class="text-sm text-absa-enrich font-mono">{{ field.value }}</span>
              </div>
            </div>
          </div>

          <!-- Risk & Approval Summary -->
          <div class="flex flex-col gap-4">
            <!-- Approval Pipeline -->
            <div class="border border-gray-300 rounded-sm overflow-hidden">
              <div class="p-4 border-b border-gray-200">
                <h3 class="text-sm font-bold text-absa-enrich">Approval Lifecycle</h3>
              </div>
              <div class="p-4 space-y-3">
                <div v-for="step in approvalSteps" :key="step.stage" class="flex items-start gap-3">
                  <div class="flex flex-col items-center mt-1">
                    <div :class="['w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]',
                      step.done ? 'bg-absa-passion text-white' : step.active ? 'bg-absa-energy text-white' : 'bg-gray-200 text-gray-400']">
                      <i v-if="step.done" class="fa-solid fa-check text-[8px]"></i>
                      <i v-else-if="step.active" class="fa-solid fa-circle text-[6px]"></i>
                    </div>
                    <div v-if="step.stage !== 'Production'" class="w-px h-6 bg-gray-200 mt-1"></div>
                  </div>
                  <div class="pb-2">
                    <p class="text-xs font-bold" :class="step.done ? 'text-absa-passion' : step.active ? 'text-absa-energy' : 'text-gray-400'">{{ step.stage }}</p>
                    <p class="text-[11px] text-gray-500">{{ step.detail }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Risk Classification -->
            <div class="border border-amber-200 bg-amber-50 rounded-sm p-4">
              <p class="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-3">Risk Classification</p>
              <div class="space-y-2 text-xs">
                <div class="flex justify-between"><span class="text-gray-600">Model Risk Tier</span><span class="font-bold text-amber-700">HIGH</span></div>
                <div class="flex justify-between"><span class="text-gray-600">Next Validation Due</span><span class="font-bold text-absa-enrich">2025-12-31</span></div>
                <div class="flex justify-between"><span class="text-gray-600">Annual Review</span><span class="font-bold text-green-600">Completed</span></div>
                <div class="flex justify-between"><span class="text-gray-600">Materiality</span><span class="font-bold text-amber-700">HIGH</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Audit History Table -->
        <div class="border border-gray-300 rounded-sm overflow-hidden mt-6">
          <div class="p-4 border-b border-gray-200">
            <h3 class="text-sm font-bold text-absa-enrich">Model Change & Validation Log</h3>
            <p class="text-[11px] text-gray-500 mt-0.5">Immutable audit trail of all model events</p>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                <th class="px-5 py-3">Date</th>
                <th class="px-4 py-3">Event</th>
                <th class="px-4 py-3">Version</th>
                <th class="px-4 py-3">AUC-ROC</th>
                <th class="px-4 py-3">Actioned By</th>
                <th class="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr v-for="row in auditLog" :key="row.date" class="hover:bg-gray-50 transition-colors">
                <td class="px-5 py-3 font-mono text-xs text-gray-500">{{ row.date }}</td>
                <td class="px-4 py-3 font-semibold text-absa-enrich text-xs">{{ row.event }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ row.version }}</td>
                <td class="px-4 py-3 font-mono text-xs font-bold">{{ row.auc }}</td>
                <td class="px-4 py-3 text-xs text-gray-600">{{ row.actor }}</td>
                <td class="px-4 py-3">
                  <span :class="['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', row.statusClass]">{{ row.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: PREDICTION LOGS                                -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'logs'">
        <div class="border border-gray-300 rounded-sm overflow-hidden">
          <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 class="text-sm font-bold text-absa-enrich">Live Prediction Log</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Real-time inference stream from production endpoint · {{ predictionTotal.toLocaleString() }} total predictions</p>
            </div>
            <div class="flex items-center gap-3">
              <select v-model="selectedTimeframe" class="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-absa-passion cursor-pointer">
                <option>Last 1 Hour</option>
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
              <button class="px-3 py-1.5 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 text-xs font-semibold hover:bg-gray-50">
                <i class="fa-solid fa-download text-[11px]"></i> Export
              </button>
            </div>
          </div>
          <div class="overflow-x-auto table-container">
            <table class="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                  <th class="px-5 py-3">Timestamp</th>
                  <th class="px-4 py-3">Correlation ID</th>
                  <th class="px-4 py-3">Customer ID</th>
                  <th class="px-4 py-3">Churn Prob</th>
                  <th class="px-4 py-3">Risk Band</th>
                  <th class="px-4 py-3">Classification</th>
                  <th class="px-4 py-3">Latency</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100 font-mono">
                <tr v-if="predictionLogs.length === 0">
                  <td colspan="7" class="p-12 text-center text-gray-500 font-sans">No prediction logs available</td>
                </tr>
                <tr v-for="(log, idx) in enrichedLogs" :key="idx" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3 text-gray-500 text-xs">{{ log.timestamp }}</td>
                  <td class="px-4 py-3 text-absa-passion text-xs font-semibold">{{ log.correlationId }}</td>
                  <td class="px-4 py-3 text-gray-700 text-xs">{{ log.customerId }}</td>
                  <td class="px-4 py-3 text-xs">
                    <div class="flex items-center gap-2">
                      <div class="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full rounded-full" :class="log.probValue > 0.6 ? 'bg-absa-inspire' : log.probValue > 0.3 ? 'bg-absa-energy' : 'bg-absa-passion'" :style="{width: (log.probValue*100)+'%'}"></div>
                      </div>
                      <span class="font-bold text-absa-enrich">{{ log.prob }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-xs">
                    <span :class="['px-2 py-0.5 rounded-sm font-bold text-[10px]', log.riskBandClass]">{{ log.riskBand }}</span>
                  </td>
                  <td class="px-4 py-3 font-bold font-sans text-xs" :class="log.classColor">{{ log.class }}</td>
                  <td class="px-4 py-3 text-gray-500 text-xs">{{ log.latency }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>Showing latest 50 of {{ predictionTotal.toLocaleString() }} predictions</span>
            <div class="flex items-center gap-2">
              <button class="w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center"><i class="fa-solid fa-chevron-left text-[10px]"></i></button>
              <button class="w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center"><i class="fa-solid fa-chevron-right text-[10px]"></i></button>
            </div>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: ALERTS                                         -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'alerts'">
        <!-- Active Alerts -->
        <div class="border border-gray-300 rounded-sm overflow-hidden mb-6">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-absa-enrich">Active Alerts</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Requires action from model owner or risk team</p>
            </div>
            <span v-if="activeAlerts.length > 0" class="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-absa-passion rounded-sm text-xs font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-absa-passion animate-pulse"></span>{{ activeAlerts.length }} Active
            </span>
            <span v-else class="text-xs font-semibold text-green-600">All clear</span>
          </div>
          <div v-if="activeAlerts.length === 0" class="p-8 text-center text-gray-500 text-sm">
            <i class="fa-solid fa-shield-check text-2xl text-green-500 mb-2"></i>
            <p>No active alerts. Model is operating within thresholds.</p>
          </div>
          <table v-else class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                <th class="px-5 py-3">Severity</th>
                <th class="px-4 py-3">Feature / Metric</th>
                <th class="px-4 py-3">Alert</th>
                <th class="px-4 py-3">Value</th>
                <th class="px-4 py-3">Threshold</th>
                <th class="px-4 py-3">Since</th>
                <th class="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr v-for="alert in activeAlerts" :key="alert.id" class="hover:bg-gray-50">
                <td class="px-5 py-3">
                  <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', alert.severityClass]">{{ alert.severity }}</span>
                </td>
                <td class="px-4 py-3 font-mono text-xs font-semibold text-absa-enrich">{{ alert.feature }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ alert.message }}</td>
                <td class="px-4 py-3 font-mono text-xs font-bold text-absa-passion">{{ alert.currentValue }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ alert.threshold }}</td>
                <td class="px-4 py-3 text-xs text-gray-500">{{ alert.since }}</td>
                <td class="px-4 py-3">
                  <button class="text-xs font-semibold text-absa-passion border border-absa-passion/30 px-2 py-0.5 rounded-sm hover:bg-red-50 transition-colors">Investigate</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Resolved Alerts -->
        <div class="border border-gray-300 rounded-sm overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h3 class="text-sm font-bold text-absa-enrich">Resolved Alert History</h3>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                <th class="px-5 py-3">Feature</th>
                <th class="px-4 py-3">Alert</th>
                <th class="px-4 py-3">Triggered</th>
                <th class="px-4 py-3">Resolved</th>
                <th class="px-4 py-3">Resolution</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr v-for="row in resolvedAlerts" :key="row.feature + row.triggered" class="hover:bg-gray-50 transition-colors">
                <td class="px-5 py-3 font-mono text-xs font-semibold text-absa-enrich">{{ row.feature }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.alert }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ row.triggered }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ row.resolved }}</td>
                <td class="px-4 py-3 text-xs text-green-600 font-semibold">{{ row.resolution }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useModelsStore } from '@/stores/modelsStore'
import Chart from 'chart.js/auto'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const modelsStore = useModelsStore()
const loading = ref(true)
const activeTab = ref('overview')

// Raw backend data
const performanceHistory = ref([])
const featureDriftList = ref([])
const predictionLogs = ref([])
const predictionTotal = ref(0)

// ── Tab definitions ──
const tabs = computed(() => [
  { id: 'overview',    label: 'Overview',         icon: 'fa-gauge-high' },
  { id: 'performance', label: 'Performance',       icon: 'fa-chart-line' },
  { id: 'drift',       label: 'Drift & Stability', icon: 'fa-arrows-left-right' },
  { id: 'governance',  label: 'Governance',        icon: 'fa-file-shield' },
  { id: 'logs',        label: 'Prediction Logs',   icon: 'fa-list-ul' },
  { id: 'alerts',      label: 'Alerts',            icon: 'fa-bell', badge: activeAlerts.value.length || null },
])

// ── Static / derived data ──
const lastEvaluatedDate = '2025-10-24'
const lastDriftScan = '2025-10-24'

const activeAlerts = ref([
  {
    id: 1, severity: 'CRITICAL', severityClass: 'bg-red-100 text-absa-passion',
    feature: 'tenure_months', message: 'PSI exceeded CRITICAL threshold (0.25)',
    currentValue: '0.31', threshold: '0.25', since: '3 days ago',
  },
  {
    id: 2, severity: 'WARNING', severityClass: 'bg-amber-100 text-amber-700',
    feature: 'avg_monthly_balance', message: 'PSI exceeded WARNING threshold (0.10)',
    currentValue: '0.18', threshold: '0.10', since: '1 day ago',
  },
])

const resolvedAlerts = ref([
  { feature: 'credit_utilization', alert: 'PSI exceeded 0.10 WARNING', triggered: '2025-09-14', resolved: '2025-09-21', resolution: 'Feature distribution normalized post quarter-end' },
  { feature: 'num_products', alert: 'AUC-ROC drop below 0.80 threshold', triggered: '2025-08-02', resolved: '2025-08-10', resolution: 'Model retrained on extended dataset — v1.3.0 deployed' },
])

// ── Model Details ──
const modelDetails = computed(() => {
  const m = modelsStore.championChurn
  return { name: m?.id || 'churn_lgbm_v1.4.2', status: m?.status || 'ACTIVE' }
})

// ── Overview KPIs ──
const modelMetrics = computed(() => {
  const m = modelsStore.championChurn
  const metrics = m?.metrics || {}
  return {
    aucRoc: { value: metrics.auc != null ? (metrics.auc * 100).toFixed(1) + '%' : '87.4%' },
    logLoss: { value: metrics.log_loss != null ? metrics.log_loss.toFixed(4) : '0.2841' },
    brier: { value: metrics.brier != null ? metrics.brier.toFixed(4) : '0.1193' },
  }
})

const overviewKpis = computed(() => [
  { label: 'AUC-ROC',     value: modelMetrics.value.aucRoc.value, note: 'Discrimination power' },
  { label: 'Log Loss',    value: modelMetrics.value.logLoss.value, note: 'Lower is better' },
  { label: 'Brier Score', value: modelMetrics.value.brier.value, note: 'Calibration quality' },
  { label: 'KS Stat',     value: '0.412', note: 'Separation strength' },
  { label: 'F1 Score',    value: '0.741', note: 'At threshold 0.45' },
  { label: 'Model Ver.',  value: 'v1.4.2', note: 'Champion · LightGBM' },
])

const driftingFeatureCount = computed(() =>
  featureDriftList.value.filter(f => parseFloat(f.score) > 0.20).length || 2
)

const avgLatency = computed(() => {
  if (!predictionLogs.value.length) return '—'
  const vals = predictionLogs.value.map(p => parseFloat(p.latency))
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length
  return avg.toFixed(1) + 'ms'
})

// ── Confusion Matrix with threshold slider ──
const threshold = ref(0.45)
const confusionMatrix = computed(() => {
  const t = threshold.value
  return {
    tn: Math.round(3200 + (t - 0.45) * 2000),
    fp: Math.round(800  - (t - 0.45) * 2000),
    fn: Math.round(420  + (t - 0.45) * 800),
    tp: Math.round(1180 - (t - 0.45) * 800),
  }
})
const derivedMetrics = computed(() => {
  const { tp, fp, fn } = confusionMatrix.value
  const p = tp + fp > 0 ? (tp / (tp + fp)).toFixed(2) : '—'
  const r = tp + fn > 0 ? (tp / (tp + fn)).toFixed(2) : '—'
  const pf = parseFloat(p), rf = parseFloat(r)
  const f1 = (pf + rf > 0) ? ((2 * pf * rf) / (pf + rf)).toFixed(2) : '—'
  return { precision: p, recall: r, f1 }
})

// ── Segment Performance ──
const segmentPerformance = ref([
  { name: 'Retail Savings',      customers: '124,440', auc: '0.891', f1: '0.762', status: 'STABLE',  statusClass: 'bg-green-100 text-green-700',  dotClass: 'bg-green-600' },
  { name: 'Business Current',    customers: '38,210',  auc: '0.854', f1: '0.701', status: 'STABLE',  statusClass: 'bg-green-100 text-green-700',  dotClass: 'bg-green-600' },
  { name: 'Wealth Management',   customers: '12,090',  auc: '0.821', f1: '0.680', status: 'MONITOR', statusClass: 'bg-amber-100 text-amber-700',  dotClass: 'bg-amber-500' },
  { name: 'Youth (18–25)',       customers: '29,770',  auc: '0.799', f1: '0.634', status: 'REVIEW',  statusClass: 'bg-red-100 text-absa-passion',  dotClass: 'bg-absa-passion' },
  { name: 'Premier Banking',     customers: '8,540',   auc: '0.876', f1: '0.731', status: 'STABLE',  statusClass: 'bg-green-100 text-green-700',  dotClass: 'bg-green-600' },
])

// ── Threshold Table ──
const thresholdTable = ref([
  { threshold: '0.30', precision: '0.61', recall: '0.94', f1: '0.74', fpRate: '0.28', cost: 'R 4.2M / month', recommended: false },
  { threshold: '0.40', precision: '0.71', recall: '0.87', f1: '0.78', fpRate: '0.18', cost: 'R 2.9M / month', recommended: false },
  { threshold: '0.45', precision: '0.76', recall: '0.81', f1: '0.78', fpRate: '0.14', cost: 'R 2.4M / month', recommended: true  },
  { threshold: '0.50', precision: '0.82', recall: '0.74', f1: '0.78', fpRate: '0.10', cost: 'R 1.8M / month', recommended: false },
  { threshold: '0.60', precision: '0.89', recall: '0.61', f1: '0.72', fpRate: '0.06', cost: 'R 1.1M / month', recommended: false },
])

// ── Drift Table enriched rows ──
const driftTableRows = computed(() => {
  const staticRows = [
    { name: 'tenure_months',        trainMean: '42.3', currentMean: '38.1', delta: -4.2, score: '0.31', status: 'CRITICAL', invertShift: false },
    { name: 'avg_monthly_balance',  trainMean: '8240', currentMean: '7910', delta: -330, score: '0.18', status: 'WARNING',  invertShift: false },
    { name: 'num_products',         trainMean: '2.4',  currentMean: '2.5',  delta: 0.1,  score: '0.07', status: 'STABLE',   invertShift: false },
    { name: 'credit_utilization',   trainMean: '0.42', currentMean: '0.44', delta: 0.02, score: '0.05', status: 'STABLE',   invertShift: true  },
    { name: 'last_contact_days',    trainMean: '18.2', currentMean: '21.0', delta: 2.8,  score: '0.12', status: 'WARNING',  invertShift: false },
    { name: 'transaction_count_90d',trainMean: '34.1', currentMean: '33.8', delta: -0.3, score: '0.03', status: 'STABLE',   invertShift: false },
  ]
  return (featureDriftList.value.length > 0 ? featureDriftList.value.map(f => ({
    name: f.name, trainMean: f.trainMean, currentMean: f.currentMean,
    delta: parseFloat(f.currentMean) - parseFloat(f.trainMean),
    score: f.score, status: f.status, invertShift: f.invertShift,
  })) : staticRows).map(r => ({
    ...r,
    deltaStr: (r.delta >= 0 ? '+' : '') + r.delta.toFixed(r.delta % 1 === 0 ? 0 : 2),
    scoreClass: parseFloat(r.score) > 0.25 ? 'text-absa-inspire' : parseFloat(r.score) > 0.10 ? 'text-amber-600' : 'text-absa-passion',
    badgeClass: r.status === 'CRITICAL' ? 'bg-red-100 text-absa-inspire' : r.status === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-red-50 text-absa-passion',
    dotClass: r.status === 'CRITICAL' ? 'bg-absa-inspire' : r.status === 'WARNING' ? 'bg-amber-500' : 'bg-absa-passion',
    shiftDir: r.invertShift ? 'left' : 'right',
  }))
})

// ── Governance Data ──
const modelCardFields = ref([
  { label: 'Model ID',           value: 'churn_lgbm_v1.4.2' },
  { label: 'Algorithm',          value: 'LightGBM (Gradient Boosted Trees)' },
  { label: 'Training Cutoff',    value: '2024-06-30' },
  { label: 'Production Date',    value: '2024-09-01' },
  { label: 'Model Owner',        value: 'Data Science – Retail Analytics' },
  { label: 'Risk Owner',         value: 'Chief Risk Officer' },
  { label: 'Validated By',       value: 'Model Risk Management Team' },
  { label: 'Validation Date',    value: '2024-08-15' },
  { label: 'Approval Status',    value: 'APPROVED — In Production' },
  { label: 'Next Review Due',    value: '2025-12-31' },
  { label: 'Regulatory Ref',     value: 'SARB MRM Framework 2023 · SR 11-7' },
  { label: 'Target Variable',    value: 'churn_within_90_days (binary)' },
  { label: 'Features Used',      value: '42 input features (v1.4.x schema)' },
  { label: 'Sampling Strategy',  value: 'Stratified K-fold (k=5) · SMOTE oversampling' },
])

const approvalSteps = ref([
  { stage: 'Conceptual Approval',   detail: 'Business & Architecture sign-off · Jul 2024', done: true,  active: false },
  { stage: 'Development',           detail: 'churn_lgbm_v1.4.2 built & unit-tested · Aug 2024', done: true,  active: false },
  { stage: 'Independent Validation', detail: 'MRM review completed · Aug 15, 2024', done: true,  active: false },
  { stage: 'Production',            detail: 'Deployed to prod endpoint · Sep 01, 2024', done: false, active: true  },
])

const auditLog = ref([
  { date: '2024-09-01', event: 'Production Deployment',    version: 'v1.4.2', auc: '87.4%', actor: 'MLOps Team',      status: 'DEPLOYED',  statusClass: 'bg-green-100 text-green-700' },
  { date: '2024-08-15', event: 'MRM Validation Completed', version: 'v1.4.2', auc: '87.4%', actor: 'Risk & MRM',       status: 'APPROVED',  statusClass: 'bg-green-100 text-green-700' },
  { date: '2024-08-10', event: 'Retraining — Feature fix', version: 'v1.4.0', auc: '86.1%', actor: 'DS Retail Analytics', status: 'SUPERSEDED', statusClass: 'bg-gray-100 text-gray-500' },
  { date: '2024-07-20', event: 'Conceptual Approval',      version: 'v1.3.x', auc: '84.9%', actor: 'Architecture Board', status: 'APPROVED',  statusClass: 'bg-green-100 text-green-700' },
  { date: '2024-05-12', event: 'Initial Development',      version: 'v1.0.0', auc: '81.2%', actor: 'Data Science Team', status: 'ARCHIVED',  statusClass: 'bg-gray-100 text-gray-500' },
])

// ── Enriched Prediction Logs ──
const selectedTimeframe = ref('Last 1 Hour')
const enrichedLogs = computed(() =>
  predictionLogs.value.map(log => {
    const probValue = parseFloat(log.prob) / 100
    const riskBand  = probValue > 0.70 ? 'HIGH' : probValue > 0.40 ? 'MEDIUM' : 'LOW'
    const riskBandClass = probValue > 0.70 ? 'bg-red-100 text-absa-inspire' : probValue > 0.40 ? 'bg-amber-100 text-amber-700' : 'bg-red-50 text-absa-passion'
    return { ...log, probValue, riskBand, riskBandClass }
  })
)

// ── Chart Refs ──
const sparklineAucCanvas = ref(null)
const sparklineF1Canvas  = ref(null)
const mainChartCanvas    = ref(null)

onMounted(async () => {
  await modelsStore.fetchModels()
  try {
    const [perfRes, driftRes, logRes] = await Promise.all([
      api.get('/api/v1/monitoring/performance-history', { params: { horizon_days: 30 } }),
      api.get('/api/v1/monitoring/feature-drift'),
      api.get('/api/v1/monitoring/prediction-log', { params: { limit: 50 } }),
    ])
    performanceHistory.value = perfRes.data.history || []
    featureDriftList.value = (driftRes.data.features || []).map(f => ({
      name: f.name,
      trainMean: f.training_mean.toFixed(1),
      currentMean: f.current_mean.toFixed(1),
      score: f.drift_score.toFixed(2),
      scoreColor: f.drift_score > 0.20 ? 'text-absa-passion font-bold' : 'text-gray-900',
      status: f.status,
      badgeClass: f.status === 'CRITICAL' ? 'bg-red-100 text-absa-inspire' : f.status === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-red-50 text-absa-passion',
      invertShift: f.invert_shift,
    }))
    predictionLogs.value = (logRes.data.predictions || []).map(p => ({
      timestamp: p.timestamp,
      correlationId: p.correlation_id,
      customerId: p.customer_id,
      prob: (p.churn_probability * 100).toFixed(1) + '%',
      class: p.predicted_class,
      classColor: p.predicted_class === 'CHURN' ? 'text-absa-inspire' : 'text-absa-passion',
      latency: p.latency_ms.toFixed(1),
    }))
    predictionTotal.value = logRes.data.total_predictions || 0
  } catch (e) {
    console.warn('Models: monitoring fetch failed', e.message)
  }
  loading.value = false
})

watch(loading, async (val) => {
  if (!val) { await nextTick(); initCharts() }
})

function initCharts() {
  const sparkOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false, min: 0 } },
    elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } },
    layout: { padding: 0 },
  }
  const history = performanceHistory.value
  const labels  = history.map(h => h.date)
  const aucData = history.length ? history.map(h => h.auc * 100)
    : [82, 83, 84, 85, 84, 86, 87, 86, 87, 87]
  const logData = history.length ? history.map(h => h.log_loss)
    : [0.31, 0.30, 0.29, 0.29, 0.28, 0.28, 0.28, 0.29, 0.28, 0.28]
  const precData = history.length ? history.map(h => h.precision * 100)
    : [72, 73, 74, 75, 74, 76, 76, 77, 76, 76]
  const recData  = history.length ? history.map(h => h.recall * 100)
    : [80, 81, 82, 82, 83, 82, 83, 83, 82, 81]
  const lbs = labels.length ? labels : Array.from({length:10}, (_,i)=>`D-${10-i}`)

  if (sparklineAucCanvas.value) {
    new Chart(sparklineAucCanvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: aucData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    })
  }
  if (sparklineF1Canvas.value) {
    new Chart(sparklineF1Canvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: logData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    })
  }
  if (mainChartCanvas.value) {
    new Chart(mainChartCanvas.value, {
      type: 'line',
      data: {
        labels: lbs,
        datasets: [
          { label: 'Precision', data: precData, borderColor: '#DC0037', borderWidth: 2, tension: 0.4, pointRadius: 0, pointHoverRadius: 4, fill: false },
          { label: 'Recall',    data: recData,  borderColor: 'rgba(220,0,55,0.35)', borderWidth: 2, borderDash: [4, 4], tension: 0.4, pointRadius: 0, pointHoverRadius: 4, fill: false },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true, grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
          y: { display: true, min: 60, max: 100, grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af', font: { size: 10 }, callback: v => v + '%' } },
        },
        layout: { padding: { top: 10, bottom: 10 } },
      },
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

:root {
  --brand-red: #DC0037;
  --brand-dark: #131010;
}

.table-container::-webkit-scrollbar { height: 6px; }
.table-container::-webkit-scrollbar-track { background: #f1f1f1; }
.table-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
.table-container::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
</style>
