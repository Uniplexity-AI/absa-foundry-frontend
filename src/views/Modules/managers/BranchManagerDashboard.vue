<template>
  <div class="w-full pt-6 px-6 pb-6">

    <!-- Loading -->
    <template v-if="loading">
      <div class="min-h-screen flex flex-col space-y-6">
        <LoadingSkeleton type="stats" />
        <LoadingSkeleton type="block" />
        <LoadingSkeleton type="table" :count="5" />
      </div>
    </template>

    <template v-else>

      <!-- ── Page Header ── -->
      <div class="mb-0 pb-4 border-b border-gray-300 flex justify-between items-end">
        <div>
          <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
            <span>Home</span><span>/</span>
            <span class="text-absa-enrich font-bold">Branch Manager</span>
          </div>
          <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">Branch Manager Dashboard</h1>
          <p class="text-body-md text-gray-500 mt-1">
            {{ kpis.totalBranches }} branches · {{ customerStore.portfolio.total.toLocaleString() }} total customers · {{ currentMonth }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none">
            <span class="material-symbols-outlined text-[18px]">download</span>Export Report
          </button>
          <button @click="showCampaignModal = true" class="px-4 py-2 bg-absa-passion text-white rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-bold shadow-none">
            <span class="material-symbols-outlined text-[18px]">auto_awesome</span>AI Campaign Generator
          </button>
        </div>
      </div>

      <!-- ── Tab Navigation ── -->
      <div class="flex border-b border-gray-300 mb-6">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          :class="['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich']">
          <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
          {{ tab.label }}
          <span v-if="tab.badge" class="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-absa-passion text-white rounded-full">{{ tab.badge }}</span>
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: OVERVIEW                                       -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-if="activeTab === 'overview'">

        <!-- KPI Strip -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div v-for="kpi in overviewKpis" :key="kpi.label" class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{{ kpi.label }}</p>
            <p class="text-2xl font-bold font-mono" :class="kpi.valueClass || 'text-absa-enrich'">{{ kpi.value }}</p>
            <p class="text-[11px] text-gray-500 mt-1">{{ kpi.note }}</p>
          </div>
        </div>

        <!-- Two-track pipelines -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">

          <!-- RM Pipeline -->
          <div class="rounded-sm border border-gray-300 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 class="text-sm font-bold text-absa-enrich">RM-Managed Pipeline</h2>
                <p class="text-[11px] text-gray-500 mt-0.5">CIB, Enterprise, Prestige & Premier · Dedicated RM per customer</p>
              </div>
              <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider">{{ rmTrack.total.toLocaleString() }} customers</span>
            </div>
            <div class="p-5">
              <div class="grid grid-cols-4 gap-3">
                <div v-for="(stage, i) in rmPipeline" :key="stage.label" class="relative">
                  <div v-if="i > 0" class="absolute -left-2.5 top-4 text-gray-300">
                    <span class="material-symbols-outlined text-[16px]">arrow_right</span>
                  </div>
                  <div class="bg-white border border-gray-300 rounded-sm p-3">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{{ stage.label }}</p>
                    <p class="text-xl font-bold font-mono mb-2" :class="stage.valueClass">{{ stage.value }}</p>
                    <div class="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :class="stage.barClass"
                        :style="{ width: (stage.value / rmPipeline[0].value * 100) + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Branch Campaign Pipeline -->
          <div class="rounded-sm border border-gray-300 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 class="text-sm font-bold text-absa-enrich">Branch Campaign Pipeline</h2>
                <p class="text-[11px] text-gray-500 mt-0.5">Mass, Personal, SME & BB · No dedicated RM · Campaign-based retention</p>
              </div>
              <span class="inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider">{{ branchTrack.total.toLocaleString() }} customers</span>
            </div>
            <div class="p-5">
              <div class="grid grid-cols-4 gap-3">
                <div v-for="(stage, i) in branchPipeline" :key="stage.label" class="relative">
                  <div v-if="i > 0" class="absolute -left-2.5 top-4 text-gray-300">
                    <span class="material-symbols-outlined text-[16px]">arrow_right</span>
                  </div>
                  <div class="bg-white border border-gray-300 rounded-sm p-3">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{{ stage.label }}</p>
                    <p class="text-xl font-bold font-mono mb-2" :class="stage.valueClass">{{ stage.value.toLocaleString() }}</p>
                    <div class="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full rounded-full" :class="stage.barClass"
                        :style="{ width: (stage.value / branchPipeline[0].value * 100) + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Churn Forecast -->
        <div class="rounded-sm border border-gray-300 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Churn Forecast — Projected Exits by Segment</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">AI-projected customer exits · Powered by LightGBM v1.4.2</p>
            </div>
            <div class="flex text-[11px] font-bold border border-gray-300 rounded-sm overflow-hidden">
              <button v-for="d in [30, 60, 90]" :key="d" @click="forecastHorizon = d"
                :class="['px-3 py-1.5', forecastHorizon === d ? 'bg-absa-passion text-white' : 'text-gray-500 hover:bg-gray-50']">
                {{ d }}D
              </button>
            </div>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-3">
                <div v-for="seg in forecastWeeks" :key="seg.label" class="flex items-center gap-3">
                  <div class="flex items-center gap-2 w-44 flex-shrink-0">
                    <span class="inline-flex px-1.5 py-0.5 text-[9px] font-bold rounded-sm"
                      :class="seg.track === 'rm' ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-500'">
                      {{ seg.track === 'rm' ? 'RM' : 'BRANCH' }}
                    </span>
                    <span class="text-xs text-gray-600 font-medium truncate">{{ seg.label }}</span>
                  </div>
                  <div class="flex-1 h-5 bg-gray-100 rounded-sm overflow-hidden relative">
                    <div class="h-full bg-absa-passion/70 rounded-sm transition-all duration-500"
                      :style="{ width: seg.pct + '%' }"></div>
                    <span class="absolute right-2 top-0 h-full flex items-center text-[11px] font-bold text-absa-enrich font-mono">{{ seg.value.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-4">
                <div class="border border-gray-300 rounded-sm p-4 flex justify-between items-center">
                  <div>
                    <p class="text-[11px] text-gray-500 uppercase font-bold tracking-wider">Total Projected Exits</p>
                    <p class="text-2xl font-bold text-absa-passion font-mono mt-1">{{ totalForecast.toLocaleString() }}</p>
                  </div>
                  <span class="material-symbols-outlined text-[30px] text-gray-200">group_remove</span>
                </div>
                <div class="border border-gray-300 rounded-sm p-4 flex justify-between items-center">
                  <div>
                    <p class="text-[11px] text-gray-500 uppercase font-bold tracking-wider">Estimated AUM at Risk</p>
                    <p class="text-2xl font-bold text-absa-enrich font-mono mt-1">{{ estimatedAUM }}</p>
                  </div>
                  <span class="material-symbols-outlined text-[30px] text-gray-200">account_balance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: RM PORTFOLIO                                   -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'rm_portfolio'">

        <!-- Scope note -->
        <div class="mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3">
          <span class="material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0">info</span>
          <p class="text-xs text-gray-600">
            <span class="font-bold text-absa-enrich">Scope:</span> This view covers <span class="font-semibold">CIB, Enterprise, Prestige and Premier</span> customers assigned to a dedicated Relationship Manager. For Mass, Personal, SME and BB retention, see the <span class="font-semibold">Branch Campaigns</span> tab.
          </p>
        </div>

        <!-- RM Summary Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div v-for="kpi in rmSummaryKpis" :key="kpi.label" class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{{ kpi.label }}</p>
            <p class="text-2xl font-bold font-mono" :class="kpi.valueClass || 'text-absa-enrich'">{{ kpi.value }}</p>
            <p class="text-[11px] text-gray-500 mt-1">{{ kpi.note }}</p>
          </div>
        </div>

        <!-- RM Table -->
        <div class="rounded-sm border border-gray-300 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Relationship Manager Workload</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Individual RM operational metrics · RM-managed segments · Sourced from Nightly Inference Batch</p>
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 flex items-center gap-1.5 shadow-none">
                <span class="material-symbols-outlined text-[14px]">filter_list</span>Filter
              </button>
              <button class="px-3 py-1.5 text-xs font-semibold border border-gray-300 rounded-sm hover:bg-gray-50 flex items-center gap-1.5 shadow-none">
                <span class="material-symbols-outlined text-[14px]">download</span>Export
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[860px] text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-5 py-3">Relationship Manager</th>
                  <th class="px-4 py-3 text-right">Portfolio</th>
                  <th class="px-4 py-3 text-right">Avg Risk Score</th>
                  <th class="px-4 py-3 text-right">Pending AI Interventions</th>
                  <th class="px-4 py-3">Cases Actioned MTD</th>
                  <th class="px-4 py-3 text-right">Retention Rate</th>
                  <th class="px-4 py-3 text-right">Last Activity</th>
                  <th class="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                <tr v-if="relationshipManagers.length === 0">
                  <td colspan="8" class="p-12 text-center text-gray-400 text-sm">No RM data available</td>
                </tr>
                <tr v-for="rm in relationshipManagers" :key="rm.name" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3">
                    <p class="font-semibold text-absa-enrich text-xs">{{ rm.name }}</p>
                    <p class="text-[11px] text-gray-400 mt-0.5">{{ rm.segment }}</p>
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-xs text-gray-700">{{ rm.portfolio.toLocaleString() }}</td>
                  <td class="px-4 py-3 text-right font-mono text-xs font-bold"
                    :class="rm.avgRiskScore > 65 ? 'text-absa-inspire' : rm.avgRiskScore > 45 ? 'text-absa-power' : 'text-absa-passion'">
                    {{ rm.avgRiskScore }}
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-xs font-bold"
                    :class="rm.openCases > 15 ? 'text-absa-inspire' : rm.openCases > 8 ? 'text-absa-energy' : 'text-absa-passion'">
                    {{ rm.openCases }}
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-20 h-1 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        <div class="h-full bg-absa-passion rounded-full"
                          :style="{ width: Math.min((rm.actioned / rm.target) * 100, 100) + '%' }"></div>
                      </div>
                      <span class="font-mono text-xs text-absa-enrich whitespace-nowrap">
                        {{ rm.actioned }}<span class="text-gray-400 font-normal"> / {{ rm.target }}</span>
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-right font-mono text-xs font-bold"
                    :class="rm.retentionRate >= 70 ? 'text-absa-passion' : rm.retentionRate >= 50 ? 'text-absa-energy' : 'text-absa-inspire'">
                    {{ rm.retentionRate }}%
                  </td>
                  <td class="px-4 py-3 text-right text-xs"
                    :class="rm.daysSinceActivity > 3 ? 'text-absa-passion font-bold' : 'text-gray-500'">
                    {{ rm.daysSinceActivity === 0 ? 'Today' : rm.daysSinceActivity + 'd ago' }}
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', rm.statusClass]">
                      <span class="w-1 h-1 rounded-full" :class="rm.dotClass"></span>{{ rm.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="px-5 py-3 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400">
            <span class="font-bold text-absa-passion">ON TRACK</span> = actioned &gt;80% of target &amp; retention ≥65% ·
            <span class="font-bold text-absa-inspire">AT RISK</span> = idle &gt;3 days or retention &lt;50% ·
            {{ currentMonth }}
          </div>
        </div>

      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: BRANCH CAMPAIGNS                               -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'campaigns'">

        <!-- Scope note -->
        <div class="mb-6 px-4 py-3 bg-white border border-gray-300 rounded-sm flex items-start gap-3">
          <span class="material-symbols-outlined text-[16px] text-gray-400 mt-0.5 flex-shrink-0">info</span>
          <p class="text-xs text-gray-600">
            <span class="font-bold text-absa-enrich">Scope:</span> Branch-managed customers — <span class="font-semibold">Mass, Personal, SME and BB</span> — have no dedicated RM. Retention is managed through outreach campaigns and call centre referrals.
          </p>
        </div>

        <!-- Campaign KPIs -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div v-for="kpi in campaignKpis" :key="kpi.label" class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{{ kpi.label }}</p>
            <p class="text-2xl font-bold font-mono" :class="kpi.valueClass || 'text-absa-enrich'">{{ kpi.value }}</p>
            <p class="text-[11px] text-gray-500 mt-1">{{ kpi.note }}</p>
          </div>
        </div>

        <!-- Active Campaigns Table -->
        <div class="rounded-sm border border-gray-300 overflow-hidden mb-6">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">Active Retention Campaigns</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Branch-level outreach targeting mass-market at-risk customers</p>
            </div>
            <button class="px-4 py-2 bg-absa-passion text-white rounded-sm text-sm font-semibold hover:bg-absa-power flex items-center gap-2 shadow-none">
              <span class="material-symbols-outlined text-[16px]">add</span>New Campaign
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-5 py-3">Campaign</th>
                  <th class="px-4 py-3">Channel</th>
                  <th class="px-4 py-3">Segment</th>
                  <th class="px-4 py-3 text-right">Enrolled</th>
                  <th class="px-4 py-3 text-right">Responded</th>
                  <th class="px-4 py-3 text-right">Retained</th>
                  <th class="px-4 py-3">Conversion</th>
                  <th class="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-sm">
                <tr v-for="c in activeCampaigns" :key="c.name" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3">
                    <p class="font-semibold text-absa-enrich text-xs">{{ c.name }}</p>
                    <p class="text-[11px] text-gray-400 mt-0.5">Expires {{ c.expires }}</p>
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-600">
                      <span class="material-symbols-outlined text-[14px]">{{ c.channelIcon }}</span>{{ c.channel }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-xs text-gray-600">{{ c.segment }}</td>
                  <td class="px-4 py-3 text-right font-mono text-xs font-bold text-absa-enrich">{{ c.enrolled.toLocaleString() }}</td>
                  <td class="px-4 py-3 text-right font-mono text-xs text-gray-600">{{ c.responded.toLocaleString() }}</td>
                  <td class="px-4 py-3 text-right font-mono text-xs font-bold text-absa-passion">{{ c.retained.toLocaleString() }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <div class="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-absa-passion rounded-full" :style="{ width: c.conversionPct + '%' }"></div>
                      </div>
                      <span class="text-[11px] font-bold font-mono text-absa-enrich">{{ c.conversionPct }}%</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', c.statusClass]">
                      <span class="w-1 h-1 rounded-full" :class="c.dotClass"></span>{{ c.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Unenrolled At-Risk -->
        <div class="rounded-sm border border-gray-300 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 class="text-sm font-bold text-absa-enrich">At-Risk · Not Enrolled in Any Campaign</h2>
              <p class="text-[11px] text-gray-500 mt-0.5">Flagged high-risk with no outreach · Immediate action recommended</p>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-absa-passion border border-absa-passion/30 rounded-sm text-xs font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-absa-passion animate-pulse"></span>
              {{ (branchTrack.atRisk - branchTrack.inCampaign).toLocaleString() }} customers
            </span>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th class="px-5 py-3">Customer</th>
                <th class="px-4 py-3">Segment</th>
                <th class="px-4 py-3">Churn Prob.</th>
                <th class="px-4 py-3">Days Flagged</th>
                <th class="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="cust in unenrolledCustomers" :key="cust.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-5 py-3">
                  <p class="font-semibold text-absa-enrich text-xs">{{ cust.name }}</p>
                  <p class="text-[11px] text-gray-400 font-mono">{{ cust.id }}</p>
                </td>
                <td class="px-4 py-3 text-xs text-gray-600">{{ cust.segment }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <div class="w-14 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-absa-passion rounded-full" :style="{ width: cust.prob + '%' }"></div>
                    </div>
                    <span class="font-bold font-mono text-xs text-absa-passion">{{ cust.prob }}%</span>
                  </div>
                </td>
                <td class="px-4 py-3 font-mono text-xs font-bold text-absa-passion">{{ cust.daysFlagged }}d</td>
                <td class="px-4 py-3 text-right">
                  <button class="text-[11px] font-bold text-absa-passion border border-absa-passion/30 px-2.5 py-1 rounded-sm hover:bg-red-50 transition-colors">
                    Enrol in Campaign
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: ALL CASES                                      -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'cases'">

        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">

          <!-- Unified Cases Table -->
          <div class="xl:col-span-8 rounded-sm border border-gray-300 overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h2 class="text-sm font-bold text-absa-enrich">All High-Risk Cases</h2>
                <p class="text-[11px] text-gray-500 mt-0.5">Ranked by churn probability · Action differs by retention track</p>
              </div>
              <div class="flex gap-1.5">
                <button v-for="f in caseFilters" :key="f.id" @click="caseFilter = f.id"
                  :class="['px-2.5 py-1 text-[11px] font-bold rounded-sm border', caseFilter === f.id ? 'bg-absa-passion text-white border-absa-passion' : 'border-gray-300 text-gray-500 hover:bg-gray-50']">
                  {{ f.label }}
                </button>
              </div>
            </div>
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th class="px-5 py-3">Customer</th>
                  <th class="px-4 py-3">Track</th>
                  <th class="px-4 py-3">Segment</th>
                  <th class="px-4 py-3">Churn Prob.</th>
                  <th class="px-4 py-3">AUM</th>
                  <th class="px-4 py-3">Days Flagged</th>
                  <th class="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="cust in filteredCases" :key="cust.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3">
                    <p class="font-semibold text-absa-enrich text-xs">{{ cust.name }}</p>
                    <p class="text-[11px] text-gray-400 font-mono">{{ cust.id }}</p>
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600">
                      {{ cust.track === 'rm' ? 'RM' : 'BRANCH' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-xs text-gray-600">{{ cust.segment }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <div class="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full rounded-full"
                          :class="cust.prob >= 75 ? 'bg-absa-inspire' : cust.prob >= 50 ? 'bg-absa-energy' : 'bg-absa-passion'"
                          :style="{ width: cust.prob + '%' }"></div>
                      </div>
                      <span class="font-bold font-mono text-xs"
                        :class="cust.prob >= 75 ? 'text-absa-inspire' : cust.prob >= 50 ? 'text-absa-energy' : 'text-absa-passion'">
                        {{ cust.prob }}%
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-3 font-mono text-xs text-gray-700">{{ cust.aum }}</td>
                  <td class="px-4 py-3 font-mono text-xs font-bold"
                    :class="cust.daysFlagged > 7 ? 'text-absa-passion' : 'text-absa-energy'">
                    {{ cust.daysFlagged }}d
                  </td>
                  <td class="px-4 py-3 text-right">
                    <button v-if="cust.track === 'rm'"
                      class="text-[11px] font-bold text-absa-passion border border-absa-passion/30 px-2.5 py-1 rounded-sm hover:bg-red-50 transition-colors">
                      Assign RM
                    </button>
                    <button v-else
                      class="text-[11px] font-bold text-gray-600 border border-gray-300 px-2.5 py-1 rounded-sm hover:bg-gray-50 transition-colors">
                      Enrol Campaign
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- AI Actions + Segment Risk -->
          <div class="xl:col-span-4 flex flex-col gap-4">
            <div class="rounded-sm border border-gray-300 border-l-4 border-l-absa-passion overflow-hidden">
              <div class="px-5 py-4 border-b border-gray-200">
                <h2 class="text-sm font-bold text-absa-enrich flex items-center gap-2">
                  <span class="material-symbols-outlined text-[16px] text-absa-passion">auto_awesome</span>
                  AI Priority Actions
                </h2>
                <p class="text-[11px] text-gray-500 mt-0.5">Recommended by churn intelligence engine</p>
              </div>
              <div class="p-4 flex flex-col gap-3">
                <div v-for="(action, i) in aiPriorityActions" :key="i"
                  class="border border-gray-200 rounded-sm p-3 bg-white hover:border-absa-passion/40 transition-colors">
                  <div class="flex items-start gap-2 mb-2">
                    <span :class="['inline-flex px-1.5 py-0.5 rounded-sm text-[10px] font-bold flex-shrink-0 mt-0.5', action.urgencyClass]">
                      {{ action.urgency }}
                    </span>
                    <p class="text-xs font-semibold text-absa-enrich leading-snug">{{ action.title }}</p>
                  </div>
                  <p class="text-[11px] text-gray-600 leading-relaxed mb-2">{{ action.detail }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-gray-400 font-mono">{{ action.meta }}</span>
                    <button class="text-[11px] font-bold text-absa-passion hover:underline">Act →</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-sm border border-gray-300 overflow-hidden">
              <div class="px-5 py-4 border-b border-gray-200">
                <h2 class="text-sm font-bold text-absa-enrich">Churn Risk by Segment</h2>
              </div>
              <div class="p-4 flex flex-col gap-4">
                <div v-for="seg in churnSegments" :key="seg.name">
                  <div class="flex justify-between text-[11px] mb-1.5">
                    <div class="flex items-center gap-1.5">
                      <span class="inline-flex px-1 py-0.5 rounded-sm text-[9px] font-bold bg-gray-100 text-gray-500">
                        {{ seg.track === 'rm' ? 'RM' : 'BRANCH' }}
                      </span>
                      <span class="text-gray-600 font-medium">{{ seg.name }}</span>
                    </div>
                    <span class="font-bold font-mono text-absa-enrich">{{ seg.pct }}%</span>
                  </div>
                  <div class="w-full h-1 rounded-full overflow-hidden bg-gray-200">
                    <div class="h-full bg-absa-passion rounded-full" :style="{ width: seg.pct + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

    </template>
    
    <AiCampaignModal
      v-model="showCampaignModal"
      :customers="unenrolledCustomers"
      source-context="branch-manager"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import AiCampaignModal from '@/components/intelligence/AiCampaignModal.vue'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'
import { useSnapshotStore } from '@/stores/snapshotStore'
import { formatMarketSegment } from '@/config/customerSegments'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const customerStore   = useCustomerStore()
const predictionStore = usePredictionStore()
const snapshotStore   = useSnapshotStore()

const loading         = ref(true)
const activeTab       = ref('overview')
const forecastHorizon = ref(30)
const caseFilter      = ref('all')
const branchData      = ref([])
const forecastData    = ref(null)

const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })

const backendSegments = computed(() => {
  const groups = new Map()
  for (const customer of customerStore.customers) {
    if (customer.marketSegment === null) continue
    const group = groups.get(customer.marketSegment) || {
      marketSegment: customer.marketSegment,
      label: formatMarketSegment(customer.marketSegment),
      total: 0,
      atRisk: 0,
    }
    group.total += 1
    if (['AT_RISK', 'DORMANT', 'CHURNED'].includes(customer.state)) group.atRisk += 1
    groups.set(customer.marketSegment, group)
  }
  return [...groups.values()]
    .map((group) => ({ ...group, riskPct: group.total ? Math.round((group.atRisk / group.total) * 100) : 0 }))
    .sort((a, b) => b.atRisk - a.atRisk)
})

// ── Portfolio tracks ──
const rmTrack = computed(() => ({ total: 20630, atRisk: 186, openCases: 42 }))
const branchTrack = computed(() => {
  const total  = (customerStore.portfolio.total || 204050) - rmTrack.value.total
  const atRisk = Math.round(total * 0.078)
  return { total, atRisk, inCampaign: Math.round(atRisk * 0.58) }
})

// ── Tabs ──
const tabs = computed(() => [
  { id: 'overview',     label: 'Overview',        icon: 'gauge'            },
  { id: 'rm_portfolio', label: 'RM Portfolio',    icon: 'manage_accounts'  },
  { id: 'campaigns',    label: 'Branch Campaigns',icon: 'campaign'         },
  { id: 'cases',        label: 'All Cases',        icon: 'assignment_late', badge: kpis.value.newFlagsToday || null },
])

// ── KPIs ──
const kpis = computed(() => {
  const avgChurn      = forecastData.value?.churn_rate_pct || customerStore.portfolio.churnedPct || 5.8
  const totalBranches = branchData.value.length || 13
  return {
    totalBranches,
    newFlagsToday:       49,
    retentionRate:       72,
    churnTarget:         6.0,
    monthlyChurnValue:   avgChurn,
    churnRateAboveTarget: avgChurn > 6.0,
  }
})

const overviewKpis = computed(() => [
  { label: 'New High-Risk (Today)', value: kpis.value.newFlagsToday,          valueClass: 'text-absa-passion', note: 'Flagged since yesterday' },
  { label: 'RM Pending AI Interventions',        value: rmTrack.value.openCases,            valueClass: 'text-absa-enrich',  note: 'Premium · uncontacted' },
  { label: 'Not in Campaign',      value: (branchTrack.value.atRisk - branchTrack.value.inCampaign).toLocaleString(), valueClass: 'text-absa-passion', note: 'Mass-market · no outreach' },
  { label: 'Campaign Enrolled',    value: branchTrack.value.inCampaign.toLocaleString(), valueClass: 'text-absa-enrich', note: `of ${branchTrack.value.atRisk.toLocaleString()} at-risk` },
  { label: 'Retention Rate MTD',   value: kpis.value.retentionRate + '%',     valueClass: 'text-absa-passion',    note: 'All channels combined' },
  { label: 'Churn vs Target',      value: kpis.value.monthlyChurnValue + '%', valueClass: kpis.value.churnRateAboveTarget ? 'text-absa-inspire' : 'text-absa-passion', note: `Target: ${kpis.value.churnTarget}%` },
])

// ── RM Pipeline ──
const rmPipeline = computed(() => {
  const f = rmTrack.value.atRisk
  const a = Math.round(f * 0.77), c = Math.round(f * 0.61), r = Math.round(c * 0.82)
  return [
    { label: 'Flagged',   value: f, valueClass: 'text-absa-passion', barClass: 'bg-absa-passion' },
    { label: 'Assigned',  value: a, valueClass: 'text-absa-energy',  barClass: 'bg-absa-energy'  },
    { label: 'Contacted', value: c, valueClass: 'text-absa-enrich',  barClass: 'bg-absa-enrich'  },
    { label: 'Retained',  value: r, valueClass: 'text-absa-passion',    barClass: 'bg-absa-passion'    },
  ]
})

// ── Branch Pipeline ──
const branchPipeline = computed(() => {
  const f = branchTrack.value.atRisk, e = branchTrack.value.inCampaign
  const res = Math.round(e * 0.34), r = Math.round(res * 0.68)
  return [
    { label: 'Flagged',   value: f,   valueClass: 'text-absa-passion', barClass: 'bg-absa-passion' },
    { label: 'Enrolled',  value: e,   valueClass: 'text-absa-energy',  barClass: 'bg-absa-energy'  },
    { label: 'Responded', value: res, valueClass: 'text-absa-enrich',  barClass: 'bg-absa-enrich'  },
    { label: 'Retained',  value: r,   valueClass: 'text-absa-passion',    barClass: 'bg-absa-passion'    },
  ]
})

// ── Forecast ──
const forecastWeeks = computed(() => {
  const segs = backendSegments.value.map((segment) => ({
    label: segment.label,
    value: segment.atRisk,
    track: [30, 50, 60, 85].includes(segment.marketSegment) ? 'rm' : 'branch',
  }))
  const max = Math.max(...segs.map(s => s.value))
  return segs.map(s => ({ ...s, pct: max ? Math.round(s.value / max * 100) : 0 }))
})
const totalForecast = computed(() => forecastWeeks.value.reduce((s, w) => s + w.value, 0))
const estimatedAUM  = computed(() => {
  const v = totalForecast.value * 42000
  return v >= 1e6 ? 'K' + (v / 1e6).toFixed(1) + 'M' : 'K' + v.toLocaleString()
})

// ── RM Table ──
const relationshipManagers = computed(() => [
  { name: 'Naledi Khumalo', segment: formatMarketSegment(30), portfolio: 84,  avgRiskScore: 38, openCases: 8,  actioned: 19, target: 20, retentionRate: 88, daysSinceActivity: 0 },
  { name: 'Ayanda Nkosi',   segment: formatMarketSegment(85), portfolio: 127, avgRiskScore: 48, openCases: 18, actioned: 24, target: 28, retentionRate: 71, daysSinceActivity: 2 },
  { name: 'Dineo Molefe',   segment: formatMarketSegment(60), portfolio: 98,  avgRiskScore: 61, openCases: 16, actioned: 18, target: 25, retentionRate: 65, daysSinceActivity: 1 },
].map(rm => {
  const pct = (rm.actioned / rm.target) * 100
  const s   = pct >= 80 && rm.retentionRate >= 65 ? 'ON TRACK' : rm.daysSinceActivity > 3 || rm.retentionRate < 50 ? 'AT RISK' : 'MONITOR'
  return { ...rm, status: s,
    statusClass: s === 'ON TRACK' ? 'bg-red-50 text-absa-passion' : s === 'AT RISK' ? 'bg-red-100 text-absa-inspire' : 'bg-amber-100 text-amber-700',
    dotClass: s === 'ON TRACK' ? 'bg-absa-passion' : s === 'AT RISK' ? 'bg-absa-inspire' : 'bg-amber-500'
  }
}))

const rmStatusCounts = computed(() =>
  relationshipManagers.value.reduce((a, r) => { a[r.status] = (a[r.status] || 0) + 1; return a }, {})
)

const rmSummaryKpis = computed(() => [
  { label: 'Active RMs',      value: relationshipManagers.value.length, note: 'RM-managed segments' },
  { label: 'On Track',        value: rmStatusCounts.value['ON TRACK'] || 0, valueClass: 'text-absa-passion', note: 'Meeting targets' },
  { label: 'Monitoring',      value: rmStatusCounts.value['MONITOR']  || 0, valueClass: 'text-absa-energy', note: 'Needs attention' },
  { label: 'Needs Attention', value: rmStatusCounts.value['AT RISK']  || 0, valueClass: 'text-absa-passion', note: 'Idle or low retention' },
])

// ── Campaigns ──
const activeCampaigns = ref([
  { name: 'SMS Retention Offer — Personal', channel: 'SMS',         channelIcon: 'sms',           segment: formatMarketSegment(65), expires: '2026-08-31', enrolled: 412, responded: 148, retained: 101, conversionPct: 25, status: 'ACTIVE',  statusClass: 'bg-red-50 text-absa-passion', dotClass: 'bg-absa-passion' },
  { name: 'Mass Re-engagement Drive',       channel: 'Digital',     channelIcon: 'phone_iphone',  segment: formatMarketSegment(75), expires: '2026-09-15', enrolled: 319, responded: 87,  retained: 54,  conversionPct: 17, status: 'ACTIVE',  statusClass: 'bg-red-50 text-absa-passion', dotClass: 'bg-absa-passion' },
  { name: 'Call Centre — SME Win-Back',     channel: 'Call Centre', channelIcon: 'support_agent', segment: formatMarketSegment(45), expires: '2026-08-28', enrolled: 88, responded: 41, retained: 33, conversionPct: 38, status: 'ACTIVE', statusClass: 'bg-red-50 text-absa-passion', dotClass: 'bg-absa-passion' },
  { name: 'Email — Personal Savings',       channel: 'Email',       channelIcon: 'mail',          segment: formatMarketSegment(65), expires: '2026-07-31', enrolled: 204, responded: 55, retained: 38, conversionPct: 19, status: 'EXPIRED', statusClass: 'bg-gray-100 text-gray-500', dotClass: 'bg-gray-400' },
])

const campaignKpis = computed(() => [
  { label: 'Active Campaigns',    value: activeCampaigns.value.filter(c => c.status === 'ACTIVE').length, note: 'Running this month' },
  { label: 'At-Risk Enrolled',    value: branchTrack.value.inCampaign.toLocaleString(), note: `of ${branchTrack.value.atRisk.toLocaleString()} flagged` },
  { label: 'Avg Response Rate',   value: '34%', valueClass: 'text-absa-energy', note: 'Responded to outreach' },
  { label: 'Retained via Campaign', value: Math.round(branchTrack.value.inCampaign * 0.34 * 0.68).toLocaleString(), valueClass: 'text-green-600', note: 'Confirmed no churn MTD' },
])

// ── Unenrolled high-risk (populated from API) ──
const unenrolledCustomers = ref([])

// ── Cases (populated from API) ──
const caseFilters = [
  { id: 'all',    label: 'All'     },
  { id: 'rm',     label: 'RM'      },
  { id: 'branch', label: 'Branch'  },
]

const allCases = ref([])

const filteredCases = computed(() =>
  caseFilter.value === 'all' ? allCases.value : allCases.value.filter(c => c.track === caseFilter.value)
)

const churnSegments = computed(() => backendSegments.value.map((segment) => ({
  name: segment.label,
  pct: segment.riskPct,
  track: [30, 50, 60, 85].includes(segment.marketSegment) ? 'rm' : 'branch',
})))

// ── AI Priority Actions (populated from API) ──
const aiPriorityActions = ref([])

// ── Fetch ──
onMounted(async () => {
  try {
    await customerStore.fetchPortfolio()
    predictionStore.fetchChurnDrivers()

    const [bRes, fRes, casesRes, unenrolledRes, actionsRes] = await Promise.all([
      api.get('/api/v1/churn-intel/branches',       { params: { as_of_date: snapshotStore.asOfDate } }),
      api.get('/api/v1/forecasts/churn',            { params: { as_of_date: snapshotStore.asOfDate } }),
      api.get('/api/v1/churn-intel/at-risk-cases',  { params: { as_of_date: snapshotStore.asOfDate, limit: 50 } }),
      api.get('/api/v1/churn-intel/unenrolled-high-risk', { params: { as_of_date: snapshotStore.asOfDate, limit: 10 } }),
      api.get('/api/v1/churn-intel/priority-actions', { params: { as_of_date: snapshotStore.asOfDate } }),
    ])

    branchData.value   = bRes.data.branches || []
    forecastData.value = fRes.data

    // Map at-risk cases: add segment label for display
    allCases.value = (casesRes.data || []).map(c => ({
      ...c,
      segment: formatMarketSegment(c.segment_code),
    }))

    // Map unenrolled customers: add segment label
    unenrolledCustomers.value = (unenrolledRes.data || []).map(c => ({
      ...c,
      segment: formatMarketSegment(c.segment_code),
    }))

    // Map priority actions: camelCase for template binding
    aiPriorityActions.value = (actionsRes.data || []).map(a => ({
      urgency:       a.urgency,
      urgencyClass:  a.urgency_class,
      title:         a.title,
      detail:        a.detail,
      meta:          a.meta,
    }))

  } catch (e) {
    console.warn('BranchManagerDashboard: API error', e.message)
  } finally {
    loading.value = false
  }
})
</script>



