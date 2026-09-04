<template>
  <div class="w-full pt-6 px-6 pb-6">

    <!-- Page Header -->
    <div class="mb-0 pb-4 border-b border-gray-300 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
          <span>Home</span><span>/</span>
          <span>Intelligence</span><span>/</span>
          <span class="text-absa-enrich font-bold">Lifecycle</span>
        </div>
        <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">Customer Lifecycle Prediction</h1>
        <p class="text-body-md text-gray-500 mt-1">Stage distribution, transition analysis, onboarding health, and win-back intelligence</p>
      </div>
      <div class="flex items-center gap-3">
        <button @click="exportReport" class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none">
          <span class="material-symbols-outlined text-[18px]">download</span>
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
      <div class="flex border-b border-gray-300 mb-6 mt-4">
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

      <!-- ─────────────── TAB 1: STAGE DISTRIBUTION ─────────────── -->
      <div v-if="activeTab === 'distribution'">

        <!-- 7 KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <div
            v-for="stage in store.lifecycleData?.distribution"
            :key="stage.stage"
            class="bg-white border border-gray-300 rounded-sm p-4"
          >
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{{ stage.label }}</p>
            <p class="text-2xl font-bold font-mono" :class="stage.color ?? 'text-absa-enrich'">
              {{ stage.count?.toLocaleString() }}
            </p>
            <p class="text-[11px] text-gray-500 mt-1">{{ stage.pct }}% of portfolio</p>
            <p class="text-[10px] mt-1 flex items-center gap-0.5">
              <span
                v-if="stage.mom_delta > 0"
                class="text-absa-inspire font-bold"
              >&#9650; {{ Math.abs(stage.mom_delta).toLocaleString() }}</span>
              <span
                v-else-if="stage.mom_delta < 0"
                class="text-absa-passion font-bold"
              >&#9660; {{ Math.abs(stage.mom_delta).toLocaleString() }}</span>
              <span v-else class="text-gray-400">&mdash;</span>
              <span class="text-gray-400 ml-0.5">MoM</span>
            </p>
          </div>
        </div>

        <!-- Portfolio Lifecycle Flow Panel -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Portfolio Lifecycle Flow</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Customer counts by lifecycle stage &mdash; proportional distribution</p>
            </div>
          </div>
          <div class="p-5 space-y-4">
            <!-- Legend row -->
            <div class="flex items-center gap-4 border-b border-gray-100 pb-3">
              <div class="w-28 flex-shrink-0 text-[10px] text-gray-400 font-bold uppercase">Stage</div>
              <div class="w-20 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase">Count</div>
              <div class="flex-1 text-[10px] text-gray-400 font-bold uppercase pl-1">Distribution</div>
              <div class="w-12 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase">Pct</div>
              <div class="w-24 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase">MoM Delta</div>
            </div>
            <div
              v-for="stage in store.lifecycleData?.distribution"
              :key="stage.stage"
              class="flex items-center gap-4"
            >
              <div class="w-28 flex-shrink-0">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600">
                  {{ stage.label }}
                </span>
              </div>
              <div class="w-20 flex-shrink-0 text-right">
                <span class="text-xs font-mono font-bold text-absa-enrich">{{ stage.count?.toLocaleString() }}</span>
              </div>
              <div class="flex-1">
                <div class="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    :class="['h-full rounded-full', stageBarClass(stage.stage)]"
                    :style="{ width: stage.pct + '%' }"
                  ></div>
                </div>
              </div>
              <div class="w-12 flex-shrink-0 text-right">
                <span class="text-xs font-mono text-gray-500">{{ stage.pct }}%</span>
              </div>
              <div class="w-24 flex-shrink-0 text-right">
                <span
                  v-if="stage.mom_delta > 0"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-100 text-absa-inspire"
                >&#9650; {{ Math.abs(stage.mom_delta).toLocaleString() }}</span>
                <span
                  v-else-if="stage.mom_delta < 0"
                  class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion"
                >&#9660; {{ Math.abs(stage.mom_delta).toLocaleString() }}</span>
                <span v-else class="text-[10px] text-gray-400">&mdash;</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ─────────────── TAB 2: STAGE TRANSITIONS ─────────────── -->
      <div v-if="activeTab === 'transitions'">

        <!-- Collapsible scope note (Remediation 6) -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <button
            @click="transitionScopeExpanded = !transitionScopeExpanded"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
          >
            <span class="material-symbols-outlined text-[18px] text-gray-400 flex-shrink-0">info</span>
            <span class="text-xs font-semibold text-gray-600 flex-1">How to read this heatmap</span>
            <span class="material-symbols-outlined text-[18px] text-gray-400 transition-transform" :class="transitionScopeExpanded ? 'rotate-180' : ''">expand_more</span>
          </button>
          <div v-if="transitionScopeExpanded" class="px-4 pb-3 pt-0 border-t border-gray-100">
            <p class="text-xs text-gray-500 leading-relaxed">
              This heatmap shows how many customers moved between lifecycle stages in the last 30 days.
              <strong class="text-absa-enrich">Diagonal cells</strong> represent customers who remained in the same stage.
              <strong class="text-absa-enrich">Off-diagonal cells</strong> represent transitions &mdash; the larger the number,
              the more significant the movement.
            </p>
          </div>
        </div>

        <!-- Transition heatmap -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Stage Transition Heatmap</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Last 30 days &mdash; rows = From stage, columns = To stage</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-3 py-1.5 min-w-[120px]">FROM \ TO</th>
                  <th
                    v-for="(stage, colIdx) in transitionStageLabels"
                    :key="colIdx"
                    class="px-3 py-3 text-center min-w-[80px]"
                  >{{ stage }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="(row, rowIdx) in store.lifecycleData?.transitions?.matrix"
                  :key="rowIdx"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-3 py-1.5">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600">
                      {{ transitionStageLabels[rowIdx] ?? 'Stage ' + rowIdx }}
                    </span>
                  </td>
                  <td
                    v-for="(cell, colIdx) in row"
                    :key="colIdx"
                    :class="[
                      'px-3 py-3 text-center text-xs',
                      rowIdx === colIdx
                        ? 'bg-gray-50 text-gray-400 italic'
                        : cell > 1000
                          ? 'bg-red-50 font-bold text-absa-passion'
                          : 'text-absa-enrich'
                    ]"
                  >
                    {{ cell > 0 ? cell.toLocaleString() : '—' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- ─────────────── TAB 3: ONBOARDING HEALTH ─────────────── -->
      <div v-if="activeTab === 'onboarding'">

        <!-- KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">New Customers (MTD)</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ store.lifecycleData?.onboarding?.total_new?.toLocaleString() ?? '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">This month</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Activated (30D)</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ store.lifecycleData?.onboarding?.activated_30d?.toLocaleString() ?? '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">{{ activation30Pct }}% of new</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Activated (60D)</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ store.lifecycleData?.onboarding?.activated_60d?.toLocaleString() ?? '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">{{ activation60Pct }}% of new</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Activated (90D)</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ store.lifecycleData?.onboarding?.activated_90d?.toLocaleString() ?? '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">{{ activation90Pct }}% of new</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Early At-Risk</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">{{ store.lifecycleData?.onboarding?.early_at_risk?.toLocaleString() ?? '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Flagged within 90D</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Avg Products Held</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ store.lifecycleData?.onboarding?.avg_products?.toFixed(1) ?? '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Per new customer</p>
          </div>
        </div>

        <!-- Two panels side by side -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- Activation Funnel -->
          <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
            <div class="px-5 py-4 border-b border-gray-200">
              <h2 class="text-sm font-bold text-absa-enrich">Activation Funnel</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">30D / 60D / 90D activation rates for new customers</p>
            </div>
            <div class="p-5 space-y-5">
              <!-- 30D -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <p class="text-xs font-bold text-absa-enrich">30-Day Activation</p>
                  <p class="text-xs font-mono font-bold text-absa-enrich">{{ activation30Pct }}%</p>
                </div>
                <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-absa-passion rounded-full" :style="{ width: activation30Pct + '%' }"></div>
                </div>
                <p class="text-[10px] text-gray-400 mt-1">{{ store.lifecycleData?.onboarding?.activated_30d?.toLocaleString() }} customers activated within 30 days</p>
              </div>
              <!-- 60D -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <p class="text-xs font-bold text-absa-enrich">60-Day Activation</p>
                  <p class="text-xs font-mono font-bold text-absa-enrich">{{ activation60Pct }}%</p>
                </div>
                <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-absa-passion rounded-full" :style="{ width: activation60Pct + '%' }"></div>
                </div>
                <p class="text-[10px] text-gray-400 mt-1">{{ store.lifecycleData?.onboarding?.activated_60d?.toLocaleString() }} customers activated within 60 days</p>
              </div>
              <!-- 90D -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <p class="text-xs font-bold text-absa-enrich">90-Day Activation</p>
                  <p class="text-xs font-mono font-bold text-absa-enrich">{{ activation90Pct }}%</p>
                </div>
                <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-absa-passion rounded-full" :style="{ width: activation90Pct + '%' }"></div>
                </div>
                <p class="text-[10px] text-gray-400 mt-1">{{ store.lifecycleData?.onboarding?.activated_90d?.toLocaleString() }} customers activated within 90 days</p>
              </div>
            </div>
          </div>

          <!-- Digital Enrolment -->
          <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
            <div class="px-5 py-4 border-b border-gray-200">
              <h2 class="text-sm font-bold text-absa-enrich">Digital Enrolment</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Online &amp; mobile banking uptake among new customers</p>
            </div>
            <div class="p-5 flex flex-col items-center justify-center text-center" style="min-height: 200px;">
              <p class="text-6xl font-bold font-mono text-absa-enrich mb-2">
                {{ store.lifecycleData?.onboarding?.digital_enrolled ?? '—' }}%
              </p>
              <p class="text-xs text-gray-500 leading-relaxed max-w-[240px]">
                of new customers enrolled in digital banking within 30 days
              </p>
              <div class="w-32 mt-6">
                <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-absa-passion rounded-full"
                    :style="{ width: (store.lifecycleData?.onboarding?.digital_enrolled ?? 0) + '%' }"
                  ></div>
                </div>
              </div>
              <p class="text-[10px] text-gray-400 mt-2">
                Target: 80% &nbsp;&middot;&nbsp;
                <span
                  :class="(store.lifecycleData?.onboarding?.digital_enrolled ?? 0) >= 80
                    ? 'text-absa-passion font-bold'
                    : 'text-absa-inspire font-bold'"
                >
                  {{ (store.lifecycleData?.onboarding?.digital_enrolled ?? 0) >= 80 ? 'ON TRACK' : 'BELOW TARGET' }}
                </span>
              </p>
            </div>
          </div>

        </div>

      </div>

      <!-- ─────────────── TAB 4: WIN-BACK PIPELINE ─────────────── -->
      <div v-if="activeTab === 'winback'">

        <!-- KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Win-Back Eligible</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ winBackEligibleCount.toLocaleString() }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Eligible for campaign</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">In Campaign</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ winBackInCampaignCount.toLocaleString() }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Active win-back campaigns</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Avg Win-Back Prob</p>
            <p class="text-2xl font-bold font-mono text-absa-enrich">{{ avgWinBackProb }}%</p>
            <p class="text-[11px] text-gray-500 mt-1">Predicted success rate</p>
          </div>
          <div class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Est. Total Win-Back Value</p>
            <p class="text-2xl font-bold font-mono text-absa-passion">{{ estTotalWinBackValue }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Projected revenue recovery</p>
          </div>
        </div>

        <!-- Remediation 5: Bulk Actions Bar -->
        <div
          v-if="selectedWinback.size > 0"
          class="flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm mb-3"
        >
          <span class="material-symbols-outlined text-[16px]">check_box</span>
          <span class="text-sm font-semibold">{{ selectedWinback.size }} customer{{ selectedWinback.size > 1 ? 's' : '' }} selected</span>
          <div class="flex items-center gap-2 ml-auto">
            <button
              @click="bulkAddToCampaign"
              class="px-3 py-1 bg-amber-400 text-absa-enrich rounded-sm text-[11px] font-bold hover:bg-amber-300 transition-colors shadow-none flex items-center gap-1"
            >
              <span class="material-symbols-outlined text-[14px]">auto_awesome</span>AI Campaign Generator
            </button>
            <button
              @click="clearWinbackSelection"
              class="px-2 py-1 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
            >Clear</button>
          </div>
        </div>

        <!-- Win-Back Table -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Win-Back Pipeline</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Churned customers ranked by win-back probability and estimated value</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50">
                  <th class="px-3 py-2 w-8">
                    <input
                      type="checkbox"
                      :checked="allWinbackSelected"
                      @change="toggleWinbackAll"
                      class="rounded-sm cursor-pointer"
                      title="Select all eligible"
                    />
                  </th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer ID</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Last Product</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Months Since Churn</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Win-Back Prob</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Est. Value</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="w in store.lifecycleData?.win_back"
                  :key="w.customer_id"
                  :class="['transition-colors', selectedWinback.has(w.customer_id) ? 'bg-amber-50' : 'hover:bg-gray-50']"
                >
                  <td class="px-3 py-1.5 w-8">
                    <input
                      type="checkbox"
                      :checked="selectedWinback.has(w.customer_id)"
                      :disabled="w.status !== 'ELIGIBLE'"
                      @change="toggleWinback(w.customer_id)"
                      class="rounded-sm cursor-pointer disabled:opacity-30"
                    />
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono text-gray-500">{{ w.customer_id }}</td>
                  <td class="px-3 py-1.5 text-xs font-semibold text-absa-enrich">{{ w.name }}</td>
                  <td class="px-3 py-1.5 text-xs text-gray-500">{{ w.last_product }}</td>
                  <td class="px-3 py-1.5 text-xs font-mono text-absa-enrich">{{ w.months_churned ?? w.months_since_churn }}mo</td>
                  <td class="px-3 py-1.5">
                    <div class="flex flex-col gap-1">
                      <span class="text-xs font-bold font-mono text-absa-enrich">{{ (w.prob * 100).toFixed(1) }}%</span>
                      <div class="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-absa-passion rounded-full"
                          :style="{ width: (w.prob * 100) + '%' }"
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td class="px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich">{{ w.est_value ?? formatEstValue(w.est_value_num) }}</td>
                  <td class="px-3 py-1.5">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', winBackStatusClass(w.status)]">
                      <span class="w-1 h-1 rounded-full" :class="winBackDotClass(w.status)"></span>
                      {{ w.status }}
                    </span>
                  </td>
                  <td class="px-3 py-1.5">
                    <button v-if="w.status === 'ELIGIBLE'" @click="campaignCustomers = [w]; showCampaignModal = true" class="px-3 py-1 bg-absa-passion text-white rounded-sm text-[10px] font-bold hover:bg-absa-power transition-colors shadow-none flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">auto_awesome</span>AI Campaign</button>
                    <button
                      v-else-if="w.status === 'IN CAMPAIGN'"
                      @click="viewCampaign(w)"
                      class="px-3 py-1 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-none"
                    >View Campaign</button>
                    <span v-else class="text-xs text-gray-400">&mdash;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </template>
    
    <AiCampaignModal
      v-model="showCampaignModal"
      :customers="campaignCustomers"
      source-context="win-back"
      @campaign-launched="selectedWinback = new Set()"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import AiCampaignModal from '@/components/intelligence/AiCampaignModal.vue'
import { useIntelligenceStore } from '@/stores/intelligenceStore'
import { downloadCsv, notify, reportFilename } from '@/utils/absaExport'

const store = useIntelligenceStore()
const loading = ref(true)
const showCampaignModal = ref(false)
const campaignCustomers = ref([])
const activeTab = ref('distribution')
const tabs = [
  { id: 'distribution', label: 'Stage Distribution', icon: 'waterfall_chart' },
  { id: 'transitions',  label: 'Stage Transitions',  icon: 'compare_arrows'  },
  { id: 'onboarding',   label: 'Onboarding Health',  icon: 'new_releases'    },
  { id: 'winback',      label: 'Win-Back Pipeline',  icon: 'redo'            },
]

// ─── Helpers ────────────────────────────────────────────────────────────────

const stageBarClass = (stage) => {
  const map = {
    ONBOARDING: 'bg-gray-400',
    GROWING:    'bg-absa-passion',
    MATURE:     'bg-absa-enrich',
    AT_RISK:    'bg-absa-energy',
    CHURNING:   'bg-absa-inspire',
    CHURNED:    'bg-red-900',
    WIN_BACK:   'bg-amber-500',
  }
  return map[stage] || 'bg-gray-300'
}

function formatEstValue(val) {
  if (val == null) return '—'
  if (typeof val === 'string') return val
  if (val >= 1e9) return 'K ' + (val / 1e9).toFixed(2) + 'B'
  if (val >= 1e6) return 'K ' + (val / 1e6).toFixed(1) + 'M'
  if (val >= 1e3) return 'K ' + (val / 1e3).toFixed(0) + 'K'
  return 'K ' + val.toLocaleString()
}

function winBackStatusClass(status) {
  if (status === 'ELIGIBLE')    return 'bg-red-50 text-absa-passion'
  if (status === 'IN CAMPAIGN') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-500'
}

function winBackDotClass(status) {
  if (status === 'ELIGIBLE')    return 'bg-absa-passion'
  if (status === 'IN CAMPAIGN') return 'bg-amber-500'
  return 'bg-gray-400'
}

// ─── Computed ────────────────────────────────────────────────────────────────

const transitionStageLabels = computed(() => {
  const dist = store.lifecycleData?.distribution ?? []
  if (dist.length) return dist.map(s => s.label)
  const matrix = store.lifecycleData?.transitions?.matrix ?? []
  return matrix.map((_, i) => 'Stage ' + (i + 1))
})

// Onboarding activation percentages
const activation30Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding
  if (!ob?.total_new || !ob?.activated_30d) return 0
  return ((ob.activated_30d / ob.total_new) * 100).toFixed(1)
})

const activation60Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding
  if (!ob?.total_new || !ob?.activated_60d) return 0
  return ((ob.activated_60d / ob.total_new) * 100).toFixed(1)
})

const activation90Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding
  if (!ob?.total_new || !ob?.activated_90d) return 0
  return ((ob.activated_90d / ob.total_new) * 100).toFixed(1)
})

// Win-back KPIs
const winBackEligibleCount = computed(() =>
  (store.lifecycleData?.win_back ?? []).filter(w => w.status === 'ELIGIBLE').length
)

const winBackInCampaignCount = computed(() =>
  (store.lifecycleData?.win_back ?? []).filter(w => w.status === 'IN CAMPAIGN').length
)

const avgWinBackProb = computed(() => {
  const wb = store.lifecycleData?.win_back ?? []
  if (!wb.length) return '—'
  const avg = wb.reduce((acc, w) => acc + (w.prob ?? 0), 0) / wb.length
  return (avg * 100).toFixed(1)
})

const estTotalWinBackValue = computed(() => {
  const wb = store.lifecycleData?.win_back ?? []
  const total = wb.reduce((acc, w) => acc + (w.est_value ?? 0), 0)
  return formatEstValue(total)
})

// ─── Lifecycle ───────────────────────────────────────────────────────────────

// Remediation 6: Collapsible scope note
const transitionScopeExpanded = ref(true)

// Remediation 5: Bulk selection for Win-Back Pipeline
const selectedWinback = ref(new Set())

const allWinbackSelected = computed(() => {
  const eligible = (store.lifecycleData?.win_back ?? []).filter(r => r.status === 'ELIGIBLE')
  return eligible.length > 0 && eligible.every(r => selectedWinback.value.has(r.customer_id))
})

function toggleWinbackAll() {
  const eligible = (store.lifecycleData?.win_back ?? []).filter(r => r.status === 'ELIGIBLE')
  if (allWinbackSelected.value) {
    selectedWinback.value = new Set()
  } else {
    selectedWinback.value = new Set(eligible.map(r => r.customer_id))
  }
}

function toggleWinback(id) {
  const s = new Set(selectedWinback.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  selectedWinback.value = s
}

function bulkAddToCampaign() {
  campaignCustomers.value = store.lifecycleData?.win_back.filter(c => selectedWinback.value.has(c.customer_id)) || []
  showCampaignModal.value = true
}

function clearWinbackSelection() {
  selectedWinback.value = new Set()
}

// ─── Export / Row actions ────────────────────────────────────────────────────

function exportReport() {
  const which = activeTab.value
  const distribution = (store.lifecycleData?.distribution ?? []).map(s => ({
    stage: s.stage, label: s.label, count: s.count, pct: s.pct, mom_delta: s.mom_delta,
  }))
  if (which === 'distribution') {
    downloadCsv(reportFilename('lifecycle-distribution'), distribution, ['stage', 'label', 'count', 'pct', 'mom_delta'])
  } else if (which === 'transitions') {
    const matrix = store.lifecycleData?.transitions?.matrix ?? []
    const labels = transitionStageLabels.value
    const rows = matrix.map((row, i) => {
      const obj = { from: labels[i] ?? `Stage ${i + 1}` }
      row.forEach((cell, j) => { obj[labels[j] ?? `Stage ${j + 1}`] = cell })
      return obj
    })
    downloadCsv(reportFilename('lifecycle-transitions'), rows)
  } else if (which === 'onboarding') {
    const ob = store.lifecycleData?.onboarding ?? {}
    downloadCsv(reportFilename('onboarding-health'), [{
      total_new: ob.total_new, activated_30d: ob.activated_30d, activated_60d: ob.activated_60d,
      activated_90d: ob.activated_90d, early_at_risk: ob.early_at_risk, avg_products: ob.avg_products,
      digital_enrolled: ob.digital_enrolled, activation_30_pct: activation30Pct.value,
      activation_60_pct: activation60Pct.value, activation_90_pct: activation90Pct.value,
    }])
  } else {
    const wb = store.lifecycleData?.win_back ?? []
    downloadCsv(reportFilename('winback-pipeline'), wb, ['customer_id', 'name', 'last_product', 'months_since_churn', 'prob', 'est_value', 'status'])
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 })
}

function viewCampaign(row) {
  if (!row) return
  notify(`Customer ${row.customer_id} is in an active win-back campaign. Open Customer Detail for the full journey.`, 'info', { autoClose: 4000 })
}

onMounted(async () => {
  await store.fetchLifecycle()
  loading.value = false
})
</script>

