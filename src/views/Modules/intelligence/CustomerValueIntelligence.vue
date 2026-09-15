<template>
  <div class="w-full pt-6 px-6 pb-6">

    <!-- Page Header -->
    <div class="mb-0 pb-4 border-b border-gray-300 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
          <span>Home</span><span>/</span>
          <span>Intelligence</span><span>/</span>
          <span class="text-absa-enrich font-bold">Customer Value</span>
        </div>
        <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">Customer Value Intelligence</h1>
        <p class="text-body-md text-gray-500 mt-1">CLV scoring, value segmentation, and churn-adjusted priority analysis</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="runClvPredictions"
          :disabled="runningClv"
          class="px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none disabled:opacity-50"
        >
          <span class="material-symbols-outlined text-[18px]">{{ runningClv ? 'hourglass_top' : 'model_training' }}</span>
          {{ runningClv ? 'Running…' : 'Run CLV Predictions' }}
        </button>
        <button @click="exportReport" class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none">
          <span class="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </button>
        <button @click="activeTab = 'matrix'" class="px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none">
          <span class="material-symbols-outlined text-[18px]">grid_on</span>
          View Priority Matrix
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="mt-6">
      <LoadingSkeleton />
    </div>

    <!-- Empty state: no CLV data, or the CLV model is not loaded -->
    <div v-else-if="!store.clvData || store.clvData.status === 'CLV_MODEL_UNAVAILABLE'" class="mt-6">
      <div class="bg-white border border-gray-300 rounded-sm p-10 text-center">
        <span class="material-symbols-outlined text-[36px] text-gray-300">stacked_line_chart</span>
        <h2 class="text-sm font-bold text-absa-enrich mt-3">CLV model not available</h2>
        <p class="text-xs text-gray-500 mt-1">
          No CLV data for {{ snapshotStore.asOfDate }}. The CLV LightGBM model is not
          loaded (or the prediction service is unreachable) — no fallback values are shown.
        </p>
      </div>
    </div>

    <template v-else>

      <!-- Tab Navigation -->
      <div class="flex border-b border-gray-300 mb-6 mt-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich']"
        >
          <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <!-- ───────────────────── TAB 1: OVERVIEW ───────────────────── -->
      <div v-if="activeTab === 'overview'">

        <!-- KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Total Portfolio CLV</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ formatCurrency(store.clvData?.summary?.total_clv) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Churn-adjusted</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Avg Customer CLV</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ formatCurrency(store.clvData?.summary?.avg_clv) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Per customer</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Platinum + Gold Count</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ platinumGoldCount.toLocaleString() }}</p>
            <p class="text-[11px] text-gray-500 mt-1">High-value customers</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">CLV at Risk</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">{{ formatCurrency(store.clvData?.summary?.clv_at_risk) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">High-value + high-churn</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Value Protected MTD</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">{{ formatCurrency(store.clvData?.summary?.value_protected_mtd) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Interventions this month</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Churn-Adj. CLV</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ formatCurrency(store.clvData?.summary?.churn_adjusted_clv) }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Expected realised value</p>
          </div>
        </div>

        <!-- CLV Distribution Panel -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">CLV Distribution by Value Band</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Horizontal distribution of customers across Platinum, Gold, Silver, and Bronze tiers</p>
            </div>
          </div>
          <div class="p-5">
            <!-- Legend row -->
            <div class="flex items-center gap-4 border-b border-gray-100 pb-3 mb-4">
              <div class="w-36 flex-shrink-0 text-[10px] text-gray-400 font-bold uppercase">Band</div>
              <div class="w-20 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase">Customers</div>
              <div class="flex-1 text-[10px] text-gray-400 font-bold uppercase pl-1">Distribution</div>
              <div class="w-24 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase">Avg CLV</div>
              <div class="w-20 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase">Avg Churn</div>
            </div>
            <div class="space-y-5">
              <div
                v-for="band in bandsWithPct"
                :key="band.band"
                class="flex items-center gap-4"
              >
                <div class="w-36 flex-shrink-0">
                  <span :class="['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(band.band)]">
                    {{ band.band }}
                  </span>
                  <p class="text-[10px] text-gray-400 mt-0.5">{{ band.threshold }}</p>
                </div>
                <div class="w-20 flex-shrink-0 text-right">
                  <span class="text-xs font-mono font-bold text-absa-enrich">{{ band.count.toLocaleString() }}</span>
                </div>
                <div class="flex-1">
                  <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div class="h-full bg-absa-passion rounded-full" :style="{ width: band.pct + '%' }"></div>
                  </div>
                </div>
                <div class="w-24 flex-shrink-0 text-right">
                  <span class="text-xs font-mono text-absa-enrich">{{ formatCurrency(band.avg_clv) }}</span>
                </div>
                <div class="w-20 flex-shrink-0 text-right">
                  <span :class="['text-xs font-bold font-mono', churnProbColor(band.avg_churn_prob)]">
                    {{ (band.avg_churn_prob * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ───────────────────── TAB 2: VALUE SEGMENTS ───────────────────── -->
      <div v-if="activeTab === 'segments'">

        <!-- Band boundaries: absolute ZMW ranges replace the percentile default -->
        <div class="bg-white border border-gray-300 rounded-sm p-4 mb-6">
          <div class="flex items-start justify-between mb-3">
            <div>
              <p class="text-xs font-bold text-absa-enrich">Value band configuration</p>
              <p class="text-[10px] text-gray-400 mt-0.5">
                Boundaries are 12-month predicted CLV in ZMW. The four ranges must be contiguous and cover every customer.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <label class="text-[10px] text-gray-500 flex items-center gap-1">
                <input type="radio" value="percentile" v-model="bandMode" /> Percentile
              </label>
              <label class="text-[10px] text-gray-500 flex items-center gap-1">
                <input type="radio" value="custom" v-model="bandMode" /> Custom ZMW
              </label>
            </div>
          </div>

          <div v-if="bandsCustom" class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="row in bandRows" :key="row.band" class="flex items-center gap-2">
              <span :class="['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold w-20', bandBadgeClass(row.band)]">
                {{ row.band }}
              </span>
              <input
                v-model="row.min"
                type="text"
                inputmode="numeric"
                placeholder="no minimum"
                class="w-28 border border-gray-300 rounded-sm px-2 py-1 text-xs font-mono"
              />
              <span class="text-xs text-gray-400">to</span>
              <input
                v-model="row.max"
                type="text"
                inputmode="numeric"
                placeholder="no maximum"
                class="w-28 border border-gray-300 rounded-sm px-2 py-1 text-xs font-mono"
              />
            </div>
          </div>

          <p v-if="bandError" class="text-[11px] text-red-600 mt-2">{{ bandError }}</p>

          <div class="flex items-center gap-2 mt-3">
            <button
              @click="applyBands"
              :disabled="store.loading.clv"
              class="px-3 py-1 rounded-sm bg-absa-enrich text-white text-xs font-bold disabled:opacity-50"
            >
              Apply
            </button>
            <button
              @click="resetBands"
              :disabled="store.loading.clv"
              class="px-3 py-1 rounded-sm border border-gray-300 text-xs font-bold text-gray-600"
            >
              Reset to percentile
            </button>
            <span v-if="bandsCustom && bandPreview" class="text-[10px] text-gray-400 font-mono truncate">
              {{ bandPreview }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            v-for="band in store.clvData?.bands"
            :key="band.band"
            class="bg-white border border-gray-300 rounded-sm p-4"
          >
            <div class="flex items-center justify-between mb-3">
              <div>
                <span :class="['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(band.band)]">
                  {{ band.band }}
                </span>
                <p class="text-[10px] text-gray-400 mt-0.5">{{ band.threshold }}</p>
              </div>
              <span class="text-[10px] text-gray-400">{{ band.action_count ?? 0 }} actions pending</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Customers</p>
                <p class="text-base font-mono font-bold text-absa-enrich">{{ band.count.toLocaleString() }}</p>
              </div>
              <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Avg CLV</p>
                <p class="text-base font-mono font-bold text-absa-enrich">{{ formatCurrency(band.avg_clv) }}</p>
              </div>
              <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Avg Churn Prob</p>
                <p :class="['text-base font-mono font-bold', churnProbColor(band.avg_churn_prob)]">
                  {{ (band.avg_churn_prob * 100).toFixed(1) }}%
                </p>
              </div>
              <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-0.5">Total AUM</p>
                <p class="text-base font-mono font-bold text-absa-enrich">{{ formatCurrency(band.total_aum) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Value Band Summary</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Aggregated metrics per value tier</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Band</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customers</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">% of Portfolio</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Avg CLV</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Avg Churn Prob</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total AUM</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">At Risk Count</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="band in store.clvData?.bands"
                  :key="band.band"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-3 py-1.5">
                    <span :class="['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(band.band)]">
                      {{ band.band }}
                    </span>
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ band.count.toLocaleString() }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ bandPct(band.count) }}%</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ formatCurrency(band.avg_clv) }}</td>
                  <td class="px-3 py-1.5">
                    <span :class="['text-xs font-bold font-mono', churnProbColor(band.avg_churn_prob)]">
                      {{ (band.avg_churn_prob * 100).toFixed(1) }}%
                    </span>
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ formatCurrency(band.total_aum) }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-passion font-bold">{{ band.at_risk_count?.toLocaleString() ?? '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ───────────────────── TAB 3: PRIORITY MATRIX ───────────────────── -->
      <div v-if="activeTab === 'matrix'">

        <!-- Collapsible scope note (Remediation 6) -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <button
            @click="matrixScopeExpanded = !matrixScopeExpanded"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
          >
            <span class="material-symbols-outlined text-[18px] text-gray-400 flex-shrink-0">info</span>
            <span class="text-xs font-semibold text-gray-600 flex-1">How to read this matrix</span>
            <span class="material-symbols-outlined text-[18px] text-gray-400 transition-transform" :class="matrixScopeExpanded ? 'rotate-180' : ''">expand_more</span>
          </button>
          <div v-if="matrixScopeExpanded" class="px-4 pb-3 pt-0 border-t border-gray-100">
            <p class="text-xs text-gray-500 leading-relaxed">
              The Priority Matrix plots every customer by their <strong class="text-absa-enrich">Customer Lifetime Value (Y-axis)</strong> vs
              <strong class="text-absa-enrich">Churn Probability (X-axis)</strong>. Four quadrants determine the action required. Use this view
              to prioritise Relationship Manager assignments, campaign enrolments, and BAU monitoring schedules.
            </p>
          </div>
        </div>

        <!-- 4 Quadrant Cards 2x2 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <!-- PROTECT -->
          <div class="rounded-sm border border-gray-300 overflow-hidden bg-red-50">
            <div class="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-100 text-absa-passion">
                <span class="w-1 h-1 rounded-full bg-absa-passion"></span>PROTECT
              </span>
              <span class="text-[11px] text-gray-500">High Value &middot; High Risk</span>
            </div>
            <div class="p-5">
              <p class="text-xs text-gray-600 mb-3">Immediate RM assignment or senior intervention required</p>
              <div class="flex items-end gap-2">
                <p class="text-3xl font-bold font-mono text-absa-passion">{{ protectCount }}</p>
                <p class="text-xs text-gray-400 mb-1">customers</p>
              </div>
              <p class="text-[10px] text-gray-400 mt-1">CLV top 50% &amp; Churn Prob &gt; 50%</p>
            </div>
          </div>
          <!-- MAINTAIN -->
          <div class="rounded-sm border border-gray-300 overflow-hidden bg-red-50">
            <div class="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion">
                <span class="w-1 h-1 rounded-full bg-absa-passion"></span>MAINTAIN
              </span>
              <span class="text-[11px] text-gray-500">High Value &middot; Low Risk</span>
            </div>
            <div class="p-5">
              <p class="text-xs text-gray-600 mb-3">Preserve relationship &mdash; proactive check-ins</p>
              <div class="flex items-end gap-2">
                <p class="text-3xl font-bold font-mono text-absa-passion">{{ maintainCount }}</p>
                <p class="text-xs text-gray-400 mb-1">customers</p>
              </div>
              <p class="text-[10px] text-gray-400 mt-1">CLV top 50% &amp; Churn Prob &le; 50%</p>
            </div>
          </div>
          <!-- MONITOR -->
          <div class="rounded-sm border border-gray-300 overflow-hidden bg-amber-50">
            <div class="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-amber-100 text-amber-700">
                <span class="w-1 h-1 rounded-full bg-amber-500"></span>MONITOR
              </span>
              <span class="text-[11px] text-gray-500">Low Value &middot; High Risk</span>
            </div>
            <div class="p-5">
              <p class="text-xs text-gray-600 mb-3">Campaign enrolment &mdash; cost-effective intervention</p>
              <div class="flex items-end gap-2">
                <p class="text-3xl font-bold font-mono text-amber-700">{{ monitorCount }}</p>
                <p class="text-xs text-gray-400 mb-1">customers</p>
              </div>
              <p class="text-[10px] text-gray-400 mt-1">CLV bottom 50% &amp; Churn Prob &gt; 50%</p>
            </div>
          </div>
          <!-- OBSERVE -->
          <div class="rounded-sm border border-gray-300 overflow-hidden bg-gray-50">
            <div class="px-5 py-4 border-b border-gray-200 flex items-center gap-3">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-200 text-gray-600">
                <span class="w-1 h-1 rounded-full bg-gray-500"></span>OBSERVE
              </span>
              <span class="text-[11px] text-gray-500">Low Value &middot; Low Risk</span>
            </div>
            <div class="p-5">
              <p class="text-xs text-gray-600 mb-3">Standard BAU &mdash; no intervention needed</p>
              <div class="flex items-end gap-2">
                <p class="text-3xl font-bold font-mono text-gray-600">{{ observeCount }}</p>
                <p class="text-xs text-gray-400 mb-1">customers</p>
              </div>
              <p class="text-[10px] text-gray-400 mt-1">CLV bottom 50% &amp; Churn Prob &le; 50%</p>
            </div>
          </div>
        </div>

        <!-- Chart placeholder + top 10 table (with ML explain popovers — Remediation 1) -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Priority Matrix &mdash; Scatter View</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">CLV vs Churn Probability per customer &mdash; top 10 customers shown below</p>
            </div>
          </div>
          <div class="p-5 pb-0">
            <div class="w-full h-12 bg-gray-50 border border-dashed border-gray-300 rounded-sm flex items-center justify-center mb-5">
              <p class="text-xs text-gray-400 flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px]">scatter_plot</span>
                Interactive scatter plot rendered by chart.js &mdash; awaiting canvas implementation
              </p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer ID</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Segment</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">CLV</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Churn Prob</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Quadrant</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="c in top10ByCLV"
                  :key="c.customer_id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-3 py-1.5 text-xs font-mono text-gray-500">{{ c.customer_id }}</td>
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">{{ c.name }}</td>
                  <td class="px-3 py-1.5 text-xs text-gray-500">{{ c.segment }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich">{{ formatCurrency(c.clv) }}</td>
                  <td class="px-3 py-1.5">
                    <!-- Remediation 1: ML Explain Popover -->
                    <MlExplainPopover
                      :label="c.name"
                      :display-score="(c.churn_prob * 100).toFixed(1) + '%'"
                      score-label="Churn Probability"
                      :score-class="churnProbColor(c.churn_prob)"
                      :confidence="c.churn_confidence ?? '± 0.05'"
                      :drivers="c.churn_drivers ?? []"
                      :score-date="snapshotStore.asOfDate"
                      :align-right="true"
                    >
                      <span :class="['text-xs font-bold font-mono', churnProbColor(c.churn_prob)]">
                        {{ (c.churn_prob * 100).toFixed(1) }}%
                      </span>
                    </MlExplainPopover>
                  </td>
                  <td class="px-3 py-1.5">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', quadrantClass(getQuadrant(c.clv_percentile, c.churn_prob))]">
                      {{ getQuadrant(c.clv_percentile, c.churn_prob) }}
                    </span>
                  </td>
                  <td class="px-3 py-1.5">
                    <button
                      v-if="getQuadrant(c.clv_percentile, c.churn_prob) === 'PROTECT'"
                      @click="assignRmToCustomer(c)"
                      class="px-3 py-1 bg-absa-passion text-absa-serene rounded-sm text-[10px] font-bold hover:bg-absa-power transition-colors shadow-none"
                    >Assign RM</button>
                    <button
                      v-else-if="getQuadrant(c.clv_percentile, c.churn_prob) === 'MAINTAIN'"
                      @click="contactRmForCustomer(c)"
                      class="px-3 py-1 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-none"
                    >Contact RM</button>
                    <button
                      v-else-if="getQuadrant(c.clv_percentile, c.churn_prob) === 'MONITOR'"
                      @click="enrolCampaignForCustomer(c)"
                      class="px-3 py-1 bg-amber-100 text-amber-700 rounded-sm text-[10px] font-bold hover:bg-amber-200 transition-colors shadow-none"
                    >Enrol Campaign</button>
                    <span v-else class="text-xs text-gray-400">&mdash;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ───────────────────── TAB 4: TOP VALUE CUSTOMERS ───────────────────── -->
      <div v-if="activeTab === 'customers'">

        <!-- Remediation 5: Bulk Actions Bar -->
        <div
          v-if="selectedCustomers.size > 0"
          class="flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm mb-3"
        >
          <span class="material-symbols-outlined text-[16px]">check_box</span>
          <span class="text-sm font-semibold">{{ selectedCustomers.size }} customer{{ selectedCustomers.size > 1 ? 's' : '' }} selected</span>
          <div class="flex items-center gap-2 ml-auto">
            <button
              @click="bulkAction('Enrol in Campaign')"
              class="px-3 py-1 bg-amber-400 text-absa-enrich rounded-sm text-[11px] font-bold hover:bg-amber-300 transition-colors shadow-none flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-[14px]">campaign</span>
              Enrol in Campaign
            </button>
            <button
              @click="bulkAction('Assign RM')"
              class="px-3 py-1 bg-absa-passion text-white rounded-sm text-[11px] font-bold hover:bg-absa-power transition-colors shadow-none flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-[14px]">person_add</span>
              Assign RM
            </button>
            <button
              @click="clearSelection"
              class="px-2 py-1 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
            >Clear</button>
          </div>
        </div>

        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Top Value Customers</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Ranked by CLV &mdash; includes churn risk, AUM, RM assignment, and action priority</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <!-- Checkbox header -->
                  <th class="px-3 py-2 w-8">
                    <input
                      type="checkbox"
                      :checked="allSelected"
                      @change="toggleSelectAll"
                      class="rounded-sm cursor-pointer"
                      title="Select all"
                    />
                  </th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Segment</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Value Band</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">CLV</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Churn Prob</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">AUM</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Assigned RM</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Days Since Contact</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="c in store.clvData?.top_customers"
                  :key="c.customer_id"
                  :class="['transition-colors', selectedCustomers.has(c.customer_id) ? 'bg-red-50' : 'hover:bg-gray-50']"
                >
                  <!-- Checkbox cell -->
                  <td class="px-3 py-1.5 w-8">
                    <input
                      type="checkbox"
                      :checked="selectedCustomers.has(c.customer_id)"
                      @change="toggleCustomer(c.customer_id)"
                      class="rounded-sm cursor-pointer"
                    />
                  </td>
                  <td class="px-3 py-1.5">
                    <p class="text-xs font-semibold text-absa-enrich">{{ c.name }}</p>
                    <p class="text-[10px] font-mono text-gray-400">{{ c.customer_id }}</p>
                  </td>
                  <td class="px-3 py-1.5 text-xs text-gray-500">{{ c.segment }}</td>
                  <td class="px-3 py-1.5">
                    <span :class="['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', bandBadgeClass(c.band)]">
                      {{ c.band }}
                    </span>
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich">{{ formatCurrency(c.clv) }}</td>
                  <td class="px-3 py-1.5">
                    <!-- Remediation 1: ML Explain Popover on Churn Prob -->
                    <MlExplainPopover
                      :label="c.name"
                      :display-score="(c.churn_prob * 100).toFixed(1) + '%'"
                      score-label="Churn Probability"
                      :score-class="churnProbColor(c.churn_prob)"
                      :confidence="c.churn_confidence ?? '± 0.05'"
                      :drivers="c.churn_drivers ?? []"
                      :score-date="snapshotStore.asOfDate"
                      :align-right="true"
                    >
                      <div class="flex flex-col gap-1">
                        <span :class="['text-xs font-bold font-mono', churnProbColor(c.churn_prob)]">
                          {{ (c.churn_prob * 100).toFixed(1) }}%
                        </span>
                        <div class="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-absa-passion rounded-full"
                            :style="{ width: (c.churn_prob * 100) + '%' }"
                          ></div>
                        </div>
                      </div>
                    </MlExplainPopover>
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ c.aum }}</td>
                  <td class="px-3 py-1.5 text-xs text-gray-500">
                    <span v-if="hasRm(c)">{{ hasRm(c) }}</span>
                    <span v-else class="text-gray-300 italic text-[11px]">Unassigned</span>
                  </td>
                  <td class="px-3 py-1.5">
                    <span v-if="c.days_since_contact > 7" class="text-xs font-bold font-mono text-absa-passion">{{ c.days_since_contact }}d</span>
                    <span v-else-if="c.days_since_contact > 3" class="text-xs font-bold font-mono text-amber-700">{{ c.days_since_contact }}d</span>
                    <span v-else class="text-xs font-mono text-gray-500">{{ c.days_since_contact }}d</span>
                  </td>
                  <td class="px-3 py-1.5">
                    <button
                      v-if="!hasRm(c)"
                      @click="assignRmToCustomer(c)"
                      class="px-3 py-1 bg-absa-passion text-absa-serene rounded-sm text-[10px] font-bold hover:bg-absa-power transition-colors shadow-none"
                    >Assign RM</button>
                    <button
                      v-else
                      @click="contactRmForCustomer(c)"
                      class="px-3 py-1 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-none"
                    >Contact RM</button>
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
import { ref, computed, onMounted } from 'vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import MlExplainPopover from '@/components/ui/MlExplainPopover.vue'
import { useIntelligenceStore } from '@/stores/intelligenceStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { downloadCsv, notify, reportFilename } from '@/utils/absaExport'
import { assignRm, enrolCustomer, recordAction, getActionState, hydrateStateFromServer } from '@/utils/absaActions'
import { useClvBands } from '@/composables/useClvBands'

const store = useIntelligenceStore()
const snapshotStore = useSnapshotStore()

// Value-band boundaries (absolute ZMW). Persisted per browser; the store reads
// the saved spec when it fetches, so no call site has to thread it through.
const {
  mode: bandMode, rows: bandRows, error: bandError,
  isCustom: bandsCustom, preview: bandPreview,
  apply: applyBandConfig, reset: resetBandConfig,
} = useClvBands()

async function applyBands() {
  if (!applyBandConfig()) return        // invalid configuration; message already shown
  await store.fetchClv()
}

async function resetBands() {
  resetBandConfig()
  await store.fetchClv()
}
const loading = ref(true)
const activeTab = ref('overview')

const tabs = [
  { id: 'overview',   label: 'Overview',            icon: 'insights'    },
  { id: 'segments',   label: 'Value Segments',      icon: 'donut_large' },
  { id: 'matrix',     label: 'Priority Matrix',     icon: 'grid_on'     },
  { id: 'customers',  label: 'Top Value Customers', icon: 'star'        },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(val) {
  if (val == null) return '—'
  if (typeof val === 'string') return val
  if (val >= 1e9) return 'K ' + (val / 1e9).toFixed(2) + 'B'
  if (val >= 1e6) return 'K ' + (val / 1e6).toFixed(1) + 'M'
  if (val >= 1e3) return 'K ' + (val / 1e3).toFixed(0) + 'K'
  return 'K ' + val.toLocaleString()
}

function getQuadrant(clvPercentile, prob) {
  // Option A: the quadrant is decided by CLV *percentile* (>0.5 = high value),
  // not an absolute money threshold. The trained CLV model returns 12-month net
  // revenue (ZMW) — a very different scale from the old AUM proxy — so a fixed
  // K100K cutoff would push every customer into MONITOR/OBSERVE.
  const highValue = (clvPercentile ?? 0) > 0.5
  if (highValue && prob > 0.5) return 'PROTECT'
  if (highValue && prob <= 0.5) return 'MAINTAIN'
  if (!highValue && prob > 0.5) return 'MONITOR'
  return 'OBSERVE'
}

function quadrantClass(q) {
  if (q === 'PROTECT')  return 'bg-red-100 text-absa-inspire'
  if (q === 'MAINTAIN') return 'bg-red-50 text-absa-passion'
  if (q === 'MONITOR')  return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-600'
}

function churnProbColor(prob) {
  if (prob > 0.4)  return 'text-absa-inspire'
  if (prob > 0.25) return 'text-absa-power'
  return 'text-absa-passion'
}

function bandBadgeClass(band) {
  const b = (band || '').toUpperCase()
  if (b === 'PLATINUM') return 'bg-gray-200 text-gray-700'
  if (b === 'GOLD')     return 'bg-amber-100 text-amber-700'
  if (b === 'SILVER')   return 'bg-gray-100 text-gray-500'
  return 'bg-gray-50 text-gray-400'
}

// ─── Computed ────────────────────────────────────────────────────────────────

const platinumGoldCount = computed(() => {
  const bands = store.clvData?.bands ?? []
  return bands
    .filter(b => { const n = (b.band || '').toUpperCase(); return n === 'PLATINUM' || n === 'GOLD' })
    .reduce((acc, b) => acc + (b.count ?? 0), 0)
})

const totalCustomers = computed(() =>
  (store.clvData?.bands ?? []).reduce((acc, b) => acc + (b.count ?? 0), 0)
)

const bandsWithPct = computed(() => {
  const total = totalCustomers.value || 1
  return (store.clvData?.bands ?? []).map(b => ({
    ...b,
    pct: Math.round((b.count / total) * 100),
  }))
})

function bandPct(count) {
  const total = totalCustomers.value || 1
  return ((count / total) * 100).toFixed(1)
}

const top10ByCLV = computed(() =>
  [...(store.clvData?.top_customers ?? [])]
    .sort((a, b) => (b.clv ?? 0) - (a.clv ?? 0))
    .slice(0, 10)
)

const protectCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'PROTECT').length
)
const maintainCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'MAINTAIN').length
)
const monitorCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'MONITOR').length
)
const observeCount = computed(() =>
  (store.clvData?.top_customers ?? []).filter(c => getQuadrant(c.clv_percentile, c.churn_prob) === 'OBSERVE').length
)

// ─── Remediation 6: Collapsible scope note ───────────────────────────────────
const matrixScopeExpanded = ref(true)

// ─── Remediation 5: Bulk selection ───────────────────────────────────────────
const selectedCustomers = ref(new Set())

const allSelected = computed(() => {
  const customers = store.clvData?.top_customers ?? []
  return customers.length > 0 && customers.every(c => selectedCustomers.value.has(c.customer_id))
})

function toggleSelectAll() {
  const customers = store.clvData?.top_customers ?? []
  if (allSelected.value) {
    selectedCustomers.value = new Set()
  } else {
    selectedCustomers.value = new Set(customers.map(c => c.customer_id))
  }
}

function toggleCustomer(id) {
  const s = new Set(selectedCustomers.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  selectedCustomers.value = s
}

function bulkAction(action) {
  const ids = Array.from(selectedCustomers.value)
  if (!ids.length) return
  if (action === 'Enrol in Campaign') {
    ids.forEach((id) => enrolCustomer(id, 'Value Retention Cohort'))
    notify(`Enrolled ${ids.length} customer${ids.length === 1 ? '' : 's'} in Value Retention Cohort`, 'success')
  } else if (action === 'Assign RM') {
    ids.forEach((id, i) => assignRm(id, poolRm(i), false))
    notify(`Assigned RM to ${ids.length} customer${ids.length === 1 ? '' : 's'}`, 'success')
  } else {
    recordAction({ type: 'BULK_ACTION', detail: `${action} for ${ids.length} customers` })
    notify(`Bulk action "${action}" completed for ${ids.length} customers`, 'success')
  }
  selectedCustomers.value = new Set()
}

function clearSelection() {
  selectedCustomers.value = new Set()
}

// ─── Action handlers (row + bulk) ────────────────────────────────────────────

// Deterministic "pool" of RM names so assignments look plausible in the PoC.
const RM_POOL = ['N. Khumalo', 'B. Zulu', 'A. Nkosi', 'P. Dlamini', 'T. Nkuna', 'L. van Wyk']
function poolRm(seed) {
  const s = typeof seed === 'number' ? seed : String(seed).length
  return RM_POOL[s % RM_POOL.length]
}

// Local override map so the UI reflects assignments made this session.
const rmOverrides = ref({})

function hasRm(c) {
  return (c.rm || rmOverrides.value[c.customer_id]) || null
}

function assignRmToCustomer(c) {
  const rm = poolRm(c.customer_id)
  assignRm(c.customer_id, rm, false)
  rmOverrides.value = { ...rmOverrides.value, [c.customer_id]: rm }
  notify(`RM ${rm} assigned to ${c.name}`, 'success')
}

function contactRmForCustomer(c) {
  const rm = hasRm(c) || poolRm(c.customer_id)
  if (!c.rm && !rmOverrides.value[c.customer_id]) {
    rmOverrides.value = { ...rmOverrides.value, [c.customer_id]: rm }
  }
  assignRm(c.customer_id, rm, true)
  notify(`Contact logged with ${rm} for ${c.name}`, 'success')
}

function enrolCampaignForCustomer(c) {
  enrolCustomer(c.customer_id, 'Value Retention Cohort')
  notify(`${c.name} enrolled in Value Retention Cohort`, 'success')
}

// ─── Run CLV Predictions (explicit) ───────────────────────────────────────────

const runningClv = ref(false)

async function runClvPredictions() {
  if (runningClv.value) return
  runningClv.value = true
  try {
    const summary = await store.runClvPredictions()
    if (summary?.status === 'CLV_MODEL_NOT_LOADED') {
      notify('CLV model is not loaded — no predictions were produced', 'error', { autoClose: 6000 })
      return
    }
    if (summary?.status === 'NO_DATA') {
      notify(`No feature data for ${snapshotStore.asOfDate}`, 'error', { autoClose: 6000 })
      return
    }
    notify(
      `CLV predicted for ${summary?.customers_scored ?? 0} customers (${summary?.clv_model ?? 'model'}) · `
        + `mean K${(summary?.mean_clv ?? 0).toLocaleString()}`,
      'success',
      { autoClose: 5000 },
    )
    await store.fetchClv()
  } catch (e) {
    notify(e?.message || 'CLV prediction run failed', 'error', { autoClose: 6000 })
  } finally {
    runningClv.value = false
  }
}

// ─── Export Report ───────────────────────────────────────────────────────────

function exportReport() {
  const which = activeTab.value
  const bands = (store.clvData?.bands ?? []).map(b => ({
    ...b,
    avg_clv: b.avg_clv,
    avg_churn_prob: b.avg_churn_prob,
    total_aum: b.total_aum,
  }))
  const top = store.clvData?.top_customers ?? []
  if (which === 'segments' || which === 'overview') {
    downloadCsv(reportFilename('clv-bands'), bands, ['band', 'threshold', 'count', 'avg_clv', 'avg_churn_prob', 'total_aum'])
  } else {
    const rows = top.map(c => ({
      customer_id: c.customer_id, name: c.name, segment: c.segment, band: c.band,
      clv: c.clv, churn_prob: c.churn_prob, aum: c.aum, rm: hasRm(c) || '', days_since_contact: c.days_since_contact,
      quadrant: getQuadrant(c.clv_percentile, c.churn_prob),
    }))
    downloadCsv(reportFilename('priority-customers'), rows, ['customer_id', 'name', 'segment', 'band', 'clv', 'churn_prob', 'aum', 'rm', 'days_since_contact', 'quadrant'])
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 })
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

onMounted(async () => {
  // Rehydrate RM assignments made in previous sessions so UI stays truthful.
  const overrides = {}
  const st = getActionState()
  Object.keys(st).forEach((id) => { if (st[id].rm) overrides[id] = st[id].rm })
  // Pull server-side per-customer state too (other pilot viewers / browsers).
  const topIds = (store.clvData?.top_customers ?? []).map((c) => c.customer_id)
  await Promise.allSettled(topIds.map((id) => hydrateStateFromServer(id)))
  const st2 = getActionState()
  Object.keys(st2).forEach((id) => { if (st2[id].rm) overrides[id] = st2[id].rm })
  if (Object.keys(overrides).length) rmOverrides.value = overrides
  await store.fetchClv()
  loading.value = false
})
</script>
