<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm bg-black/50">
      <div class="bg-white shadow-2xl w-full max-w-6xl h-full sm:h-auto sm:max-h-[92vh] overflow-hidden flex flex-col border border-gray-200">
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-3 sm:px-8 py-3 sm:py-5 border-b border-gray-100 bg-[#2F2E8B] sticky top-0 z-10 flex-shrink-0 gap-2">
          <div class="flex items-center gap-2 sm:gap-3 min-w-0">
            <div class="w-1 h-5 sm:w-1.5 sm:h-6 bg-white/40 shrink-0"></div>
            <div class="min-w-0">
              <div class="text-[7px] sm:text-[9px] font-mono font-black text-blue-200 uppercase tracking-[0.15em] sm:tracking-[0.25em] mb-0.5 truncate">CRM // Intelligence</div>
              <h3 class="text-sm sm:text-lg font-black text-white uppercase tracking-tight truncate">CRM Analytics Dashboard</h3>
            </div>
          </div>
          <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div class="flex items-center gap-1 sm:gap-2 bg-white/10 border border-white/20 px-1.5 sm:px-3 py-1.5 sm:py-2">
              <Calendar :size="10" class="text-white/60 hidden sm:block" />
              <select v-model="dateRange" @change="refreshAnalytics" class="bg-transparent text-white text-[8px] sm:text-[10px] font-mono font-bold uppercase focus:outline-none cursor-pointer w-16 sm:w-auto">
                <option value="7">7D</option>
                <option value="30">30D</option>
                <option value="90">90D</option>
                <option value="365">1Y</option>
              </select>
            </div>
            <button @click="$emit('update:modelValue', false)" class="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all shrink-0">
              <X :size="14" class="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex-1 flex items-center justify-center">
          <div class="h-10 w-10 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
        </div>

        <!-- Body -->
        <div v-else class="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 custom-scrollbar bg-gray-50">

          <!-- Tab Nav -->
          <div class="flex items-center gap-0.5 sm:gap-1 bg-white border border-gray-200 p-1 overflow-x-auto w-full">
            <button v-for="tab in tabs" :key="tab.id" @click="activeAnalyticsTab = tab.id"
              :class="activeAnalyticsTab === tab.id ? 'bg-[#2F2E8B] text-white' : 'text-gray-500 hover:text-gray-700'"
              class="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0">
              <component :is="tab.icon" :size="10" class="sm:w-3 sm:h-3" />
              {{ tab.label }}
            </button>
          </div>

          <!-- ─── TAB: CONVERSION ─── -->
          <div v-if="activeAnalyticsTab === 'conversion'" class="space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Lead Conversion Intelligence</h4>
            </div>

            <!-- Conversion KPIs -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white border border-gray-200 p-4 relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="p-1.5 bg-green-50 border border-green-100"><TrendingUp :size="12" class="text-green-600" /></div>
                    <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Conv. Rate</span>
                  </div>
                  <div class="text-2xl font-black text-gray-900 font-mono">{{ analytics.conversionRate }}%</div>
                  <div class="text-[9px] text-gray-400 font-mono mt-1">leads → clients</div>
                </div>
              </div>
              <div class="bg-white border border-gray-200 p-4 relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="p-1.5 bg-blue-50 border border-blue-100"><Clock :size="12" class="text-blue-600" /></div>
                    <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Avg. Conv. Time</span>
                  </div>
                  <div class="text-2xl font-black text-gray-900 font-mono">{{ analytics.avgConversionDays }}<span class="text-sm font-normal text-gray-400 ml-1">days</span></div>
                  <div class="text-[9px] text-gray-400 font-mono mt-1">lead to client</div>
                </div>
              </div>
              <div class="bg-white border border-gray-200 p-4 relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="p-1.5 bg-purple-50 border border-purple-100"><DollarSign :size="12" class="text-purple-600" /></div>
                    <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Avg. CAC</span>
                  </div>
                  <div class="text-2xl font-black text-gray-900 font-mono">{{ formatCurrency(analytics.avgCAC) }}</div>
                  <div class="text-[9px] text-gray-400 font-mono mt-1">cost per client</div>
                </div>
              </div>
              <div class="bg-white border border-gray-200 p-4 relative overflow-hidden">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                  <div class="flex items-center gap-2 mb-2">
                    <div class="p-1.5 bg-orange-50 border border-orange-100"><AlertCircle :size="12" class="text-orange-600" /></div>
                    <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Stale Leads</span>
                  </div>
                  <div class="text-2xl font-black text-gray-900 font-mono">{{ analytics.staleLeads }}</div>
                  <div class="text-[9px] text-gray-400 font-mono mt-1">> {{ staleThresholdDays }}d no contact</div>
                </div>
              </div>
            </div>

            <!-- Conversion Funnel -->
            <div class="bg-white border border-gray-200 p-5">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-0.5 h-4 bg-[#2F2E8B]"></div>
                <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-tight">Pipeline Funnel</h5>
              </div>
              <div class="space-y-2">
                <div v-for="(stage, idx) in analytics.funnelData" :key="idx" class="flex items-center gap-3">
                  <div class="w-16 sm:w-24 text-[7px] sm:text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wide text-right truncate shrink-0">{{ stage.name }}</div>
                  <div class="flex-1 bg-gray-50 border border-gray-100 h-7 relative overflow-hidden">
                    <div
                      class="h-full transition-all duration-500 flex items-center px-2"
                      :style="{ width: stage.pct + '%', backgroundColor: stage.color + '22', borderRight: `2px solid ${stage.color}` }"
                    >
                      <span class="text-[9px] font-mono font-bold" :style="{ color: stage.color }">{{ stage.count }}</span>
                    </div>
                  </div>
                  <div class="w-10 sm:w-12 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 text-right shrink-0">{{ stage.pct }}%</div>
                </div>
              </div>
            </div>

            <!-- Conversion by Source -->
            <div class="bg-white border border-gray-200 p-5">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-0.5 h-4 bg-[#2F2E8B]"></div>
                <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-tight">Conversion Rate by Lead Source</h5>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div v-for="src in analytics.conversionBySource" :key="src.source" class="border border-gray-100 p-3 min-w-0">
                  <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-1 truncate max-w-full" :title="src.source">{{ src.source }}</div>
                  <div class="text-lg font-black text-gray-900 font-mono">{{ src.rate }}%</div>
                  <div class="mt-1.5 h-1 bg-gray-100">
                    <div class="h-full bg-[#2F2E8B]" :style="{ width: src.rate + '%' }"></div>
                  </div>
                  <div class="text-[9px] text-gray-400 font-mono mt-1">{{ src.converted }}/{{ src.total }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- ─── TAB: PIPELINE ─── -->
          <div v-if="activeAnalyticsTab === 'pipeline'" class="space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Events Pipeline Tracking</h4>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="bg-white border border-gray-200 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-2">Pipeline Value</div>
                <div class="text-2xl font-black text-[#2F2E8B] font-mono">{{ formatCurrency(analytics.pipelineValue) }}</div>
              </div>
              <div class="bg-white border border-gray-200 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-2">Weighted Value</div>
                <div class="text-2xl font-black text-gray-900 font-mono">{{ formatCurrency(analytics.weightedPipelineValue) }}</div>
              </div>
              <div class="bg-white border border-gray-200 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-2">Deals Won</div>
                <div class="text-2xl font-black text-green-600 font-mono">{{ analytics.dealsWon }}</div>
              </div>
              <div class="bg-white border border-gray-200 p-4">
                <div class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-2">Deals Lost</div>
                <div class="text-2xl font-black text-red-500 font-mono">{{ analytics.dealsLost }}</div>
              </div>
            </div>

            <!-- Stage breakdown table -->
            <div class="bg-white border border-gray-200">
              <div class="px-5 py-3 border-b border-gray-100">
                <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-tight">Deals by Pipeline Stage</h5>
              </div>
              <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full min-w-[600px]">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="text-left px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Stage</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Count</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Value</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Avg. Age</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Win Prob.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="stage in analytics.pipelineByStage" :key="stage.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: stage.color }"></div>
                        <span class="text-xs font-mono font-bold text-gray-700">{{ stage.name }}</span>
                      </div>
                    </td>
                    <td class="text-right px-4 py-3 text-xs font-mono font-bold text-gray-900">{{ stage.count }}</td>
                    <td class="text-right px-4 py-3 text-xs font-mono font-bold text-gray-900">{{ formatCurrency(stage.value) }}</td>
                    <td class="text-right px-4 py-3 text-xs font-mono text-gray-500">{{ stage.avgDays }}d</td>
                    <td class="text-right px-4 py-3">
                      <div class="inline-flex items-center gap-1">
                        <div class="w-16 h-1.5 bg-gray-100">
                          <div class="h-full bg-[#2F2E8B]" :style="{ width: stage.winProb + '%' }"></div>
                        </div>
                        <span class="text-[9px] font-mono text-gray-500">{{ stage.winProb }}%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>

          <!-- ─── TAB: STAFF PERFORMANCE ─── -->
          <div v-if="activeAnalyticsTab === 'performance'" class="space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Staff Performance & Activity Report</h4>
            </div>

            <!-- Leaderboard -->
            <div class="bg-white border border-gray-200">
              <div class="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-tight">Sales Leaderboard</h5>
                <span class="text-[9px] font-mono text-gray-400 uppercase">{{ dateRange }}d period</span>
              </div>
              <div class="divide-y divide-gray-50">
                <div v-for="(member, idx) in analytics.staffPerformance" :key="member.email">
                  <!-- Main row -->
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 transition cursor-pointer" @click="toggleUserActivities(member.email)">
                    <div class="flex items-center gap-3 sm:gap-4">
                      <!-- Rank -->
                      <div class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-black text-xs sm:text-sm font-mono shrink-0"
                        :class="idx === 0 ? 'bg-yellow-400 text-white' : idx === 1 ? 'bg-gray-300 text-white' : idx === 2 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500'">
                        {{ idx + 1 }}
                      </div>
                      <!-- Avatar/Name -->
                      <div class="w-7 h-7 sm:w-8 sm:h-8 bg-[#2F2E8B] text-white flex items-center justify-center text-[10px] sm:text-xs font-black shrink-0">
                        {{ getInitials(member.name || member.email) }}
                      </div>
                      <div class="min-w-0">
                        <div class="text-[10px] sm:text-xs font-black text-gray-900 truncate">{{ member.name || member.email }}</div>
                        <div class="text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase truncate">{{ member.email }}</div>
                      </div>
                    </div>
                    <!-- Stats -->
                    <div class="flex items-center gap-2 sm:gap-4 sm:ml-auto flex-wrap sm:flex-nowrap">
                      <div class="text-center">
                        <div class="text-[7px] sm:text-[9px] font-mono text-gray-400 uppercase">Leads</div>
                        <div class="text-xs sm:text-sm font-black text-gray-900 font-mono">{{ member.leadsAssigned }}</div>
                      </div>
                      <div class="text-center">
                        <div class="text-[7px] sm:text-[9px] font-mono text-gray-400 uppercase">Conv</div>
                        <div class="text-xs sm:text-sm font-black text-green-600 font-mono">{{ member.converted }}</div>
                      </div>
                      <div class="text-center">
                        <div class="text-[7px] sm:text-[9px] font-mono text-gray-400 uppercase">Acts</div>
                        <div class="text-xs sm:text-sm font-black text-[#2F2E8B] font-mono">{{ member.activities }}</div>
                      </div>
                      <div class="text-center">
                        <div class="text-[7px] sm:text-[9px] font-mono text-gray-400 uppercase">Rev</div>
                        <div class="text-xs sm:text-sm font-black text-gray-900 font-mono">{{ formatCurrency(member.revenue) }}</div>
                      </div>
                    </div>
                    <!-- Conv Rate Bar -->
                    <div class="w-full sm:w-20 mt-1 sm:mt-0">
                      <div class="flex items-center justify-between sm:justify-end gap-1">
                        <span class="text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase">Rate</span>
                        <span class="text-[9px] sm:text-[9px] font-mono font-bold text-gray-900">{{ member.convRate }}%</span>
                      </div>
                      <div class="h-1.5 bg-gray-100 mt-1">
                        <div class="h-full bg-gradient-to-r from-[#2F2E8B] to-blue-400 transition-all" :style="{ width: Math.min(member.convRate, 100) + '%' }"></div>
                      </div>
                    </div>
                  </div>
                  <!-- Per-user activity breakdown (expandable) -->
                  <div v-if="expandedUsers[member.email]" class="px-3 sm:px-5 pb-3 sm:pb-4 pt-2 ml-0 sm:ml-[88px] border-t border-dashed border-gray-100 w-full">
                    <div class="flex items-center gap-2 sm:gap-4 flex-wrap">
                      <span class="text-[7px] sm:text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Activity:</span>
                      <span v-for="actType in ['call','email','meeting','note','whatsapp']" :key="actType" class="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 border text-[7px] sm:text-[9px] font-mono font-bold uppercase"
                        :style="{ borderColor: getActivityColor(actType) + '44', color: getActivityColor(actType), backgroundColor: getActivityColor(actType) + '11' }">
                        <component :is="getActivityIcon(actType)" :size="8" class="sm:w-2.5 sm:h-2.5" />
                        {{ getUserActivityCount(member.email, actType) }}
                      </span>
                      <span class="text-[7px] sm:text-[9px] font-mono text-gray-400 ml-auto">{{ member.activities }} total</span>
                    </div>
                  </div>
                </div>
                <div v-if="analytics.staffPerformance.length === 0" class="px-5 py-10 text-center text-xs font-mono text-gray-400 uppercase">No performance data for this period</div>
              </div>
            </div>

            <!-- Activity Breakdown -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white border border-gray-200 p-4 sm:p-5">
                <h5 class="text-[9px] sm:text-[10px] font-black text-gray-900 uppercase tracking-tight mb-3 sm:mb-4">Activity Summary</h5>
                <div class="space-y-2 sm:space-y-3">
                  <div v-for="act in analytics.activitySummary" :key="act.type" class="flex items-center gap-3">
                    <div class="w-7 h-7 flex items-center justify-center border" :style="{ borderColor: act.color + '44', backgroundColor: act.color + '11' }">
                      <component :is="act.icon" :size="12" :style="{ color: act.color }" />
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-0.5">
                        <span class="text-[9px] font-mono font-bold text-gray-600 uppercase">{{ act.type }}</span>
                        <span class="text-[9px] font-mono font-bold text-gray-900">{{ act.count }}</span>
                      </div>
                      <div class="h-1 bg-gray-100">
                        <div class="h-full transition-all" :style="{ width: act.pct + '%', backgroundColor: act.color }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white border border-gray-200 p-5">
                <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-tight mb-4">Lead Assignment Status</h5>
                <div class="space-y-3">
                  <div class="flex items-center justify-between py-2 border-b border-gray-50">
                    <span class="text-xs font-mono text-gray-600">Unassigned Leads</span>
                    <span class="text-sm font-black text-red-500 font-mono">{{ analytics.unassignedLeads }}</span>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-gray-50">
                    <span class="text-xs font-mono text-gray-600">Auto-Assigned (Today)</span>
                    <span class="text-sm font-black text-green-600 font-mono">{{ analytics.autoAssignedToday }}</span>
                  </div>
                  <div class="flex items-center justify-between py-2 border-b border-gray-50">
                    <span class="text-xs font-mono text-gray-600">Escalated to Manager</span>
                    <span class="text-sm font-black text-orange-500 font-mono">{{ analytics.escalatedLeads }}</span>
                  </div>
                  <div class="flex items-center justify-between py-2">
                    <span class="text-xs font-mono text-gray-600">Overdue Follow-ups</span>
                    <span class="text-sm font-black text-red-500 font-mono">{{ analytics.overdueFollowUps }}</span>
                  </div>
                </div>

                <!-- Auto-assign button for admins -->
                <button v-if="isAdmin" @click="$emit('auto-assign')" class="mt-4 w-full py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#1D226B] transition flex items-center justify-center gap-2">
                  <Zap :size="12" /> Auto-Assign Unassigned Leads
                </button>
              </div>
            </div>
          </div>

          <!-- ─── TAB: COMMISSIONS ─── -->
          <div v-if="activeAnalyticsTab === 'commissions'" class="space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Commission Calculations & Payouts</h4>
            </div>

            <!-- Commission Config -->
            <div class="bg-white border border-gray-200 p-3 sm:p-5">
              <div class="flex items-center gap-2 mb-3 sm:mb-4">
                <div class="w-0.5 h-3 sm:h-4 bg-[#2F2E8B]"></div>
                <h5 class="text-[9px] sm:text-[10px] font-black text-gray-900 uppercase tracking-tight">Commission Settings</h5>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
                <div>
                  <label class="text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase block mb-1 sm:mb-1.5">Base Rate (%)</label>
                  <input v-model.number="commConfig.baseRate" type="number" min="0" max="100" step="0.5"
                    class="w-full border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono focus:outline-none focus:border-[#2F2E8B]" />
                </div>
                <div>
                  <label class="text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase block mb-1 sm:mb-1.5">Bonus Threshold</label>
                  <input v-model.number="commConfig.bonusThreshold" type="number" min="0"
                    class="w-full border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono focus:outline-none focus:border-[#2F2E8B]" placeholder="Min" />
                </div>
                <div>
                  <label class="text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase block mb-1 sm:mb-1.5">Bonus Rate (%)</label>
                  <input v-model.number="commConfig.bonusRate" type="number" min="0" max="100" step="0.5"
                    class="w-full border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono focus:outline-none focus:border-[#2F2E8B]" />
                </div>
                <div>
                  <label class="text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase block mb-1 sm:mb-1.5">Pay Period</label>
                  <select v-model="commConfig.period" class="w-full border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono focus:outline-none focus:border-[#2F2E8B]">
                    <option value="once-off">Once Off</option>
                    <option value="days-30">30 Days</option>
                    <option value="days-60">60 Days</option>
                    <option value="days-90">90 Days</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label class="text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase block mb-1 sm:mb-1.5">Calculate On</label>
                  <select v-model="commConfig.calculateOn" class="w-full border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono focus:outline-none focus:border-[#2F2E8B]">
                    <option value="all-accounts">All Accounts</option>
                    <option value="selected-accounts">Selected Accounts Only</option>
                  </select>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                <button @click="calcCommissions" class="px-4 sm:px-5 py-2 bg-[#2F2E8B] text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase hover:bg-[#1D226B] transition flex items-center gap-2 w-full sm:w-auto justify-center">
                  <Calculator :size="12" /> Calculate Commissions
                </button>
                <span v-if="commissionRows.length > 0" class="text-[8px] sm:text-[9px] font-mono text-gray-500">
                  Based on <strong>{{ commissionRows.length }}</strong> account(s) · <strong>{{ selectedDealIds.size }}</strong> deal(s)
                </span>
              </div>
            </div>

            <!-- Commission Table — All Accounts -->
            <div class="bg-white border border-gray-200">
              <div class="px-3 sm:px-5 py-2 sm:py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h5 class="text-[9px] sm:text-[10px] font-black text-gray-900 uppercase tracking-tight">Commission Payouts by Account</h5>
                <div class="flex items-center gap-2 sm:gap-3">
                  <div class="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-mono">
                    <span class="text-green-600 font-bold">Paid: {{ formatCurrency(paidCommissionsTotal) }}</span>
                    <span class="w-px h-3 bg-gray-200"></span>
                    <span class="text-amber-600 font-bold">Pending: {{ formatCurrency(unpaidCommissionsTotal) }}</span>
                  </div>
                  <span class="text-[8px] sm:text-[9px] font-mono text-gray-400">| Total:</span>
                  <span class="text-xs sm:text-sm font-black text-[#2F2E8B] font-mono">{{ formatCurrency(totalCommissions) }}</span>
                </div>
              </div>
              <div class="overflow-x-auto custom-scrollbar">
              <table class="w-full min-w-[900px] sm:min-w-[1100px]">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="text-left px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase w-6 sm:w-8">
                      <input type="checkbox" :checked="allAccountsSelected" @change="toggleAllAccounts" class="accent-[#2F2E8B] w-3 h-3" />
                    </th>
                    <th class="text-left px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase">Account</th>
                    <th class="text-left px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase hidden sm:table-cell">Assigned To</th>
                    <th class="text-right px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase">Deals</th>
                    <th class="text-right px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase hidden md:table-cell">Amount</th>
                    <th class="text-right px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase hidden md:table-cell">Rate</th>
                    <th class="text-right px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase hidden md:table-cell">Bonus</th>
                    <th class="text-right px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase">Payout</th>
                    <th class="text-right px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase hidden sm:table-cell">Period</th>
                    <th class="text-center px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase">Status</th>
                    <th class="text-center px-2 sm:px-4 py-2 text-[7px] sm:text-[9px] font-mono font-bold text-gray-400 uppercase w-8 sm:w-10">Act</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="account in allAccountRows" :key="account.id">
                    <tr class="border-b border-gray-50 hover:bg-gray-50 transition" :class="(commissionState[account.id]?.status || account.status) === 'paid' ? 'bg-green-50/30' : ''">
                      <td class="px-2 sm:px-4 py-2 sm:py-3">
                        <input type="checkbox" :checked="selectedAccountIds.has(account.id)" @change="toggleAccount(account.id)" class="accent-[#2F2E8B] w-3 h-3" />
                      </td>
                      <td class="px-2 sm:px-4 py-2 sm:py-3">
                        <div class="flex items-center gap-1.5 sm:gap-2">
                          <div class="w-6 h-6 sm:w-7 sm:h-7 bg-gray-100 border border-gray-200 flex items-center justify-center text-[8px] sm:text-[10px] font-black font-mono text-gray-600 shrink-0">{{ getInitials(account.name) }}</div>
                          <div class="min-w-0">
                            <div class="text-[10px] sm:text-xs font-bold text-gray-900 truncate max-w-[120px] sm:max-w-none">{{ account.name }}</div>
                            <div class="text-[7px] sm:text-[8px] font-mono text-gray-400 hidden sm:block">ID: {{ account.id.substring(0, 8) }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                        <div v-if="account.assignedEmail" class="flex items-center gap-1 sm:gap-1.5">
                          <div class="w-5 h-5 sm:w-6 sm:h-6 bg-[#2F2E8B] text-white flex items-center justify-center text-[7px] sm:text-[8px] font-black shrink-0">{{ getInitials(account.assignedEmail) }}</div>
                          <span class="text-[8px] sm:text-[10px] font-mono font-bold text-gray-700 truncate">{{ account.assignedEmail.split('@')[0] }}</span>
                        </div>
                        <span v-else class="text-[7px] sm:text-[9px] font-mono text-gray-400 italic">—</span>
                      </td>
                      <td class="text-right px-2 sm:px-4 py-2 sm:py-3">
                        <button @click="toggleDealSelection(account.id)" class="inline-flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-mono font-bold text-[#2F2E8B] hover:underline">
                          {{ (account.deals || []).length }}
                          <ChevronDown :size="8" class="sm:w-2.5 sm:h-2.5 transition-transform" :class="expandedDeals[account.id] ? 'rotate-180' : ''" />
                        </button>
                      </td>
                      <td class="text-right px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-mono font-bold text-gray-900 hidden md:table-cell">{{ formatCurrency(account.totalAmount) }}</td>
                      <td class="text-right px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-mono font-bold text-gray-900 hidden md:table-cell">{{ formatCurrency(account.baseCommission) }}</td>
                      <td class="text-right px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-xs font-mono font-bold text-green-600 hidden md:table-cell">{{ formatCurrency(account.bonus) }}</td>
                      <td class="text-right px-2 sm:px-4 py-2 sm:py-3 text-[10px] sm:text-sm font-black text-[#2F2E8B] font-mono">{{ formatCurrency(account.totalPayout) }}</td>
                      <td class="text-right px-2 sm:px-4 py-2 sm:py-3 text-[8px] sm:text-[9px] font-mono font-bold text-gray-500 hidden sm:table-cell">{{ formatCurrency(account.perPeriod) }}</td>
                      <td class="text-center px-2 sm:px-4 py-2 sm:py-3">
                        <div class="flex flex-col items-center gap-1">
                          <select :value="commissionState[account.id]?.status || account.status" @change="updatePayoutStatus(account, $event.target.value)"
                            class="text-[7px] sm:text-[9px] font-mono font-bold uppercase border px-1 sm:px-2 py-0.5 sm:py-1 focus:outline-none transition w-full sm:w-auto"
                            :class="(commissionState[account.id]?.status || account.status) === 'paid' ? 'border-green-200 text-green-700 bg-green-50' : (commissionState[account.id]?.status || account.status) === 'approved' ? 'border-blue-200 text-blue-700 bg-blue-50' : 'border-yellow-200 text-yellow-700 bg-yellow-50'">
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="paid">Paid</option>
                          </select>
                          <button v-if="(commissionState[account.id]?.status || account.status) !== 'paid'" @click="markAsPaid(account.id)" class="text-[7px] font-mono font-bold text-green-600 hover:text-green-800 hover:underline uppercase tracking-wider">
                            Mark Paid
                          </button>
                        </div>
                      </td>
                      <td class="text-center px-2 sm:px-4 py-2 sm:py-3">
                        <button @click="resetCommissionAccount(account.id)" class="text-[7px] sm:text-[8px] font-mono font-bold text-orange-500 hover:text-orange-700 hover:underline uppercase tracking-widest">
                          Reset
                        </button>
                      </td>
                    </tr>
                    <!-- Expandable deal selection row -->
                    <tr v-if="expandedDeals[account.id]">
                      <td colspan="11" class="px-2 sm:px-4 py-2 bg-gray-50/50">
                        <div class="ml-4 sm:ml-8 space-y-1">
                          <div class="flex items-center justify-between mb-1.5">
                            <span class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Select deals to include:</span>
                            <button @click="openAddDealForm(account.id)" class="text-[8px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest flex items-center gap-1">
                              <Plus :size="10" /> Add Deal
                            </button>
                          </div>
                          <!-- Existing deals -->
                          <div v-for="deal in account.deals" :key="deal.id" class="flex items-center gap-3 py-1.5 px-2 hover:bg-white rounded-sm transition cursor-pointer" @click="toggleDeal(account.id, deal.id)">
                            <input type="checkbox" :checked="selectedDealIds.has(deal.id)" @click.stop="toggleDeal(account.id, deal.id)" class="accent-[#2F2E8B]" />
                            <span class="text-[10px] font-mono font-bold text-gray-700 flex-1">{{ deal.name || 'Unnamed Deal' }}</span>
                            <span v-if="deal._local" class="text-[8px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 uppercase">Once-Off</span>
                            <span class="text-[10px] font-mono text-gray-500">{{ deal.stage || '—' }}</span>
                            <span class="text-[10px] font-mono font-bold text-gray-900">{{ formatCurrency(deal.amount || deal.value || 0) }}</span>
                            <button v-if="deal._local" @click.stop="deleteLocalDeal(account.id, deal.id)" class="w-5 h-5 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition" title="Delete this deal">
                              <X :size="10" />
                            </button>
                          </div>
                          <!-- Inline add deal form -->
                          <div v-if="accountDealForms[account.id]?.show" class="mt-2 p-2 bg-white border border-dashed border-gray-200 rounded-sm">
                            <div class="flex items-center gap-2">
                              <input v-model="accountDealForms[account.id].name" type="text" placeholder="Deal name..." class="flex-1 border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                              <input v-model.number="accountDealForms[account.id].amount" type="number" min="0" step="0.01" placeholder="Amount" class="w-28 border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:outline-none focus:border-[#2F2E8B]" />
                              <button @click="saveLocalDeal(account.id)" class="px-3 py-1.5 bg-[#2F2E8B] text-white text-[8px] font-mono font-bold uppercase tracking-widest hover:bg-[#1D226B] transition">Add</button>
                              <button @click="closeAddDealForm(account.id)" class="px-3 py-1.5 text-gray-400 text-[8px] font-mono font-bold uppercase hover:text-red-500 transition">Cancel</button>
                            </div>
                          </div>
                          <div v-if="account.deals.length === 0 && !accountDealForms[account.id]?.show" class="text-[9px] font-mono text-gray-400 italic py-1">No deals linked. Click "Add Deal" to add a once-off deal.</div>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-if="allAccountRows.length === 0">
                    <td colspan="11" class="px-4 py-10 text-center text-xs font-mono text-gray-400 uppercase">No accounts found</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>

            <!-- Summary by Staff Member -->
            <div class="bg-white border border-gray-200 p-5">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-0.5 h-4 bg-[#2F2E8B]"></div>
                  <h5 class="text-[10px] font-black text-gray-900 uppercase tracking-tight">Summary by Staff Member</h5>
                </div>
                <span v-if="commissionCalculatedAt" class="text-[8px] font-mono text-gray-400 uppercase tracking-widest">Updated: {{ commissionCalculatedAt }}</span>
              </div>
              <div class="max-h-[300px] overflow-auto custom-scrollbar">
              <table class="w-full min-w-[600px]">
                <thead class="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                  <tr>
                    <th class="text-left px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Staff Member</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Accounts</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Total Amount</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Base Comm.</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Bonus</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Total Payout</th>
                    <th class="text-right px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Per Period</th>
                    <th class="text-center px-4 py-2 text-[9px] font-mono font-bold text-gray-400 uppercase bg-gray-50 w-10">Act</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(summary, email) in commissionSummary" :key="email" class="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <div class="w-7 h-7 bg-[#2F2E8B] text-white flex items-center justify-center text-[10px] font-black">{{ getInitials(email) }}</div>
                        <div>
                          <div class="text-xs font-bold text-gray-900">{{ email.split('@')[0] }}</div>
                          <div class="text-[8px] font-mono text-gray-400">{{ email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="text-right px-4 py-3 text-xs font-mono font-bold text-gray-900">{{ summary.count }}</td>
                    <td class="text-right px-4 py-3 text-xs font-mono text-gray-700">{{ formatCurrency(summary.totalAmount) }}</td>
                    <td class="text-right px-4 py-3 text-xs font-mono font-bold text-gray-900">{{ formatCurrency(summary.baseCommission) }}</td>
                    <td class="text-right px-4 py-3 text-xs font-mono font-bold text-green-600">{{ formatCurrency(summary.bonus) }}</td>
                    <td class="text-right px-4 py-3 text-sm font-black text-[#2F2E8B] font-mono">{{ formatCurrency(summary.totalPayout) }}</td>
                    <td class="text-right px-4 py-3 text-[9px] font-mono font-bold text-gray-500">{{ formatCurrency(summary.perPeriod) }}</td>
                    <td class="text-center px-4 py-3">
                      <button @click="deleteSummaryStaff(email)" class="text-[8px] font-mono font-bold text-orange-500 hover:text-orange-700 hover:underline uppercase tracking-widest" title="Reset all commissions for this staff member to zero">
                        Reset
                      </button>
                    </td>
                  </tr>
                  <tr v-if="Object.keys(commissionSummary).length === 0">
                    <td colspan="8" class="px-4 py-10 text-center text-xs font-mono text-gray-400 uppercase">No commissions calculated yet</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>

            <!-- Commission History -->
            <div v-if="commissionHistory.length > 0" class="bg-white border border-gray-200 p-4 sm:p-5">
              <div class="flex items-center justify-between mb-3 sm:mb-4">
                <div class="flex items-center gap-2">
                  <div class="w-0.5 h-4 bg-[#2F2E8B]"></div>
                  <h5 class="text-[9px] sm:text-[10px] font-black text-gray-900 uppercase tracking-tight">Commission History</h5>
                </div>
                <div class="flex items-center gap-3 text-[7px] sm:text-[8px] font-mono">
                  <span class="text-green-600 font-bold">Paid: {{ formatCurrency(commissionHistory[0].paidTotal) }}</span>
                  <span class="w-px h-3 bg-gray-200"></span>
                  <span class="text-amber-600 font-bold">Unpaid: {{ formatCurrency(commissionHistory[0].unpaidTotal) }}</span>
                </div>
              </div>
              <div class="max-h-[200px] overflow-auto custom-scrollbar">
              <table class="w-full min-w-[500px]">
                <thead class="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                  <tr>
                    <th class="text-left px-3 py-1.5 text-[8px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Calculated At</th>
                    <th class="text-right px-3 py-1.5 text-[8px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Rows</th>
                    <th class="text-right px-3 py-1.5 text-[8px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Total</th>
                    <th class="text-right px-3 py-1.5 text-[8px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Paid</th>
                    <th class="text-right px-3 py-1.5 text-[8px] font-mono font-bold text-gray-400 uppercase bg-gray-50">Unpaid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(h, hi) in commissionHistory" :key="hi" class="border-b border-gray-50 text-[8px] sm:text-[9px] font-mono" :class="hi === 0 ? 'bg-blue-50/50 font-bold' : ''">
                    <td class="px-3 py-1.5 text-gray-700 uppercase tracking-wider">{{ h.timestamp }}</td>
                    <td class="text-right px-3 py-1.5 text-gray-900">{{ h.rows }}</td>
                    <td class="text-right px-3 py-1.5 text-gray-900 font-bold">{{ formatCurrency(h.total) }}</td>
                    <td class="text-right px-3 py-1.5 text-green-600 font-bold">{{ formatCurrency(h.paidTotal) }}</td>
                    <td class="text-right px-3 py-1.5 text-amber-600 font-bold">{{ formatCurrency(h.unpaidTotal) }}</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>

          <!-- ─── TAB: ACTIVITIES ─── -->
          <div v-if="activeAnalyticsTab === 'activities'" class="space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">CRM Activity Timeline</h4>
            </div>

            <!-- Filters -->
            <div class="flex items-center gap-1.5 sm:gap-3 flex-wrap">
              <select v-model="activitySourceFilter" class="border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-mono font-bold uppercase focus:outline-none focus:border-[#2F2E8B]">
                <option value="">All Sources</option>
                <option value="lead">Leads</option>
                <option value="account">Accounts</option>
              </select>
              <select v-model="activityTypeFilter" class="border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-mono font-bold uppercase focus:outline-none focus:border-[#2F2E8B]">
                <option value="">All Types</option>
                <option value="call">Calls</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Emails</option>
                <option value="meeting">Meetings</option>
                <option value="note">Notes</option>
                <option value="update">Updates</option>
              </select>
              <select v-model="activityUserFilter" class="border border-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-mono font-bold uppercase focus:outline-none focus:border-[#2F2E8B]">
                <option value="">All Staff</option>
                <option v-for="u in staffList" :key="u.email" :value="u.email">{{ u.name || u.email }}</option>
              </select>
            </div>

            <!-- Activity Feed -->
            <div class="bg-white border border-gray-200 overflow-x-auto custom-scrollbar">
              <div class="divide-y divide-gray-50 min-w-[700px]">
                <div v-for="act in filteredActivities" :key="act.id" class="flex items-start gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 transition">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border flex-shrink-0 mt-0.5"
                    :style="{ borderColor: getActivityColor(act.type) + '44', backgroundColor: getActivityColor(act.type) + '11' }">
                    <component :is="getActivityIcon(act.type)" :size="10" class="sm:w-3 sm:h-3" :style="{ color: getActivityColor(act.type) }" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between gap-1 sm:gap-2">
                      <div class="flex-1 min-w-0">
                        <span class="text-[10px] sm:text-xs font-bold text-gray-900 break-words leading-snug">{{ act.notes || act.description || act.action || 'NO_DETAILS' }}</span>
                      </div>
                      <div class="flex flex-col items-end gap-0.5 flex-shrink-0">
                        <span class="text-[7px] sm:text-[9px] font-mono text-gray-900 font-bold whitespace-nowrap">{{ formatFullDate(act.created_at) }}</span>
                        <span class="text-[7px] sm:text-[8px] font-mono text-gray-400 whitespace-nowrap">{{ formatTime(act.created_at) }}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-1.5 sm:gap-3 mt-1 sm:mt-1.5 flex-wrap">
                      <span class="text-[7px] sm:text-[9px] font-mono font-bold text-gray-600">{{ act.user_email || act.actor || 'system' }}</span>
                      <span v-if="act.related_name" class="text-[7px] sm:text-[9px] font-mono text-[#2F2E8B] font-bold">→ {{ act.related_name }}</span>
                      <span class="text-[7px] sm:text-[8px] font-mono font-bold uppercase px-1 py-0.5 border"
                        :class="(act.related_type || act.entity_type) === 'lead' ? 'border-blue-200 text-blue-600 bg-blue-50' : 'border-emerald-200 text-emerald-600 bg-emerald-50'">
                        {{ (act.related_type || act.entity_type || '?').toUpperCase() }}
                      </span>
                      <span class="text-[7px] sm:text-[8px] font-mono font-bold uppercase px-1 py-0.5 border flex-shrink-0 ml-auto"
                        :style="{ borderColor: getActivityColor(act.type) + '44', color: getActivityColor(act.type), backgroundColor: getActivityColor(act.type) + '11' }">
                        {{ (act.type || '').replace(/^communication:/, '') }}
                      </span>
                    </div>
                    <div v-if="act.duration || act.outcome || act.lead_id || act.related_record_id" class="flex flex-wrap items-center gap-x-2 sm:gap-x-4 gap-y-0.5 mt-1 sm:mt-1.5 text-[7px] sm:text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      <span v-if="act.duration">⏱ {{ act.duration }}</span>
                      <span v-if="act.outcome" class="text-green-600">● {{ act.outcome }}</span>
                      <span v-if="act.lead_id">L: {{ act.lead_id.substring(0, 6) }}…</span>
                      <span v-if="act.related_record_id">R: {{ act.related_record_id.substring(0, 6) }}…</span>
                    </div>
                  </div>
                </div>
                <div v-if="filteredActivities.length === 0" class="px-5 py-10 text-center text-xs font-mono text-gray-400 uppercase">No activities found</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
  X, Calendar, TrendingUp, Clock, DollarSign, AlertCircle, Zap, Calculator,
  Phone, Mail, CalendarDays, FileText, MessageSquare, GitBranch, Users, ChevronDown, Plus
} from 'lucide-vue-next';

const props = defineProps({
  modelValue: Boolean,
  stats: { type: Object, default: () => ({}) },
  performanceList: { type: Array, default: () => [] },
  activities: { type: Array, default: () => [] },
  pipelineLeads: { type: Array, default: () => [] },
  pipelineDeals: { type: Array, default: () => [] },
  pipelineAccounts: { type: Array, default: () => [] },
  pipelineStages: { type: Array, default: () => [] },
  tenantUsers: { type: Array, default: () => [] },
  formatCurrency: { type: Function, default: v => v },
  isAdmin: { type: Boolean, default: false },
  currentUserEmail: { type: String, default: '' },
  canAssignCrm: { type: Boolean, default: false },
  canApproveCrm: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'auto-assign', 'update-payout-status', 'refresh-stats']);

const activeAnalyticsTab = ref('conversion');
const dateRange = ref(30);
const loading = ref(false);
const activityTypeFilter = ref('');
const activityUserFilter = ref('');
const activitySourceFilter = ref('');
const expandedUsers = ref({});

function toggleUserActivities(email) {
  expandedUsers.value[email] = !expandedUsers.value[email];
}

function getUserActivityCount(email, type) {
  const breakdown = analytics.value?.userActivityBreakdown?.[email];
  return breakdown?.[type] || 0;
}
const staleThresholdDays = 14;

const commConfig = ref({ baseRate: 5, bonusThreshold: 5, bonusRate: 2, period: 'once-off', calculateOn: 'all-accounts' });
const commissionRows = ref([]);
const commissionHistory = ref([]);
const commissionState = ref({}); // { accountId: { status: 'pending', paidAt: null }, ... } — persists across recomputes
const selectedAccountIds = ref(new Set());
const selectedDealIds = ref(new Set());
const expandedDeals = ref({});
const localDeals = ref({});
const accountDealForms = ref({});
const commissionCalculatedAt = ref('');
const selectionTick = ref(0); // forces re-render on Set changes

/** Build the full account rows with linked deals */
const allAccountRows = computed(() => {
  const accounts = props.pipelineAccounts || [];
  const deals = props.pipelineDeals || [];
  const period = commConfig.value.period;
  const baseRate = commConfig.value.baseRate;
  const bonusRate = commConfig.value.bonusRate;
  const bonusThreshold = commConfig.value.bonusThreshold;

  return accounts.map(a => {
    const email = (a.assignedTo || a.assigned_to || a.owner || '').toLowerCase();
    const accId = (a.id || a._id || '').toString();
    // Find deals linked to this account from backend
    const linkedDeals = deals.filter(d => {
      const dealAccId = (d.accountId || d.account_id || d.related_account_id || '').toString().toLowerCase();
      return dealAccId === accId.toLowerCase();
    });
    // Merge in locally added deals (once-off)
    const addedDeals = localDeals.value[accId] || [];
    const allDeals = [...linkedDeals, ...addedDeals];
    const totalAmount = allDeals.reduce((sum, d) => sum + Number(d.amount || d.value || 0), 0);
    const baseCommission = totalAmount * (baseRate / 100);
    const dealCount = allDeals.length;
    const eligible = dealCount >= bonusThreshold;
    const bonus = eligible ? totalAmount * (bonusRate / 100) : 0;
    const totalPayout = baseCommission + bonus;
    const perPeriod = calcPerPeriod(totalPayout, period);

    return {
      id: accId,
      name: a.name || 'Unnamed Account',
      assignedEmail: email || null,
      deals: allDeals,
      totalAmount,
      baseCommission,
      bonus,
      totalPayout,
      perPeriod,
      status: 'pending'
    };
  });
});

const allAccountsSelected = computed(() => {
  void selectionTick.value; // depend on tick
  return allAccountRows.value.length > 0 && selectedAccountIds.value.size === allAccountRows.value.length;
});

function toggleAllAccounts() {
  if (allAccountsSelected.value) {
    selectedAccountIds.value = new Set();
    selectedDealIds.value = new Set();
  } else {
    selectedAccountIds.value = new Set(allAccountRows.value.map(a => a.id));
    const dealSet = new Set();
    allAccountRows.value.forEach(a => {
      if (a.deals) a.deals.forEach(d => dealSet.add(d.id));
    });
    selectedDealIds.value = dealSet;
  }
  selectionTick.value++;
}

function toggleAccount(accountId) {
  const newSet = new Set(selectedAccountIds.value);
  if (newSet.has(accountId)) {
    newSet.delete(accountId);
    const account = allAccountRows.value.find(a => a.id === accountId);
    if (account) {
      const newDeals = new Set(selectedDealIds.value);
      (account.deals || []).forEach(d => newDeals.delete(d.id));
      selectedDealIds.value = newDeals;
    }
  } else {
    newSet.add(accountId);
    const account = allAccountRows.value.find(a => a.id === accountId);
    if (account) {
      const newDeals = new Set(selectedDealIds.value);
      (account.deals || []).forEach(d => newDeals.add(d.id));
      selectedDealIds.value = newDeals;
    }
  }
  selectedAccountIds.value = newSet;
  selectionTick.value++;
}

function toggleDealSelection(accountId) {
  expandedDeals.value = { ...expandedDeals.value, [accountId]: !expandedDeals.value[accountId] };
}

function toggleDeal(accountId, dealId) {
  const newSet = new Set(selectedDealIds.value);
  if (newSet.has(dealId)) {
    newSet.delete(dealId);
  } else {
    newSet.add(dealId);
  }
  selectedDealIds.value = newSet;

  // Update account selection based on deals selected
  const account = allAccountRows.value.find(a => a.id === accountId);
  if (account) {
    const accountDealIds = new Set(account.deals.map(d => d.id));
    const allSelected = account.deals.every(d => newSet.has(d.id));
    const noneSelected = account.deals.every(d => !newSet.has(d.id));
    const accSet = new Set(selectedAccountIds.value);
    if (allSelected) {
      accSet.add(accountId);
    } else if (noneSelected) {
      accSet.delete(accountId);
    }
    // If some selected, keep account checked
    selectedAccountIds.value = accSet;
  }
}

/** Open the inline "Add Deal" form for an account */
function openAddDealForm(accountId) {
  accountDealForms.value = {
    ...accountDealForms.value,
    [accountId]: { show: true, name: '', amount: null }
  };
}

/** Close the inline form without saving */
function closeAddDealForm(accountId) {
  accountDealForms.value = {
    ...accountDealForms.value,
    [accountId]: { show: false, name: '', amount: null }
  };
}

/** Save a once-off deal added by the user */
function saveLocalDeal(accountId) {
  const form = accountDealForms.value[accountId];
  if (!form || !form.name?.trim()) return;
  const amount = Number(form.amount || 0);
  if (amount <= 0) return;
  const dealId = `local-${accountId}-${Date.now()}`;
  const newDeal = {
    id: dealId,
    name: form.name.trim(),
    amount,
    value: amount,
    stage: 'once-off',
    _local: true,
    accountId: accountId
  };
  // Store in localDeals
  const existing = localDeals.value[accountId] || [];
  localDeals.value = {
    ...localDeals.value,
    [accountId]: [...existing, newDeal]
  };
  // Auto-select this deal
  const newSet = new Set(selectedDealIds.value);
  newSet.add(dealId);
  selectedDealIds.value = newSet;
  // Ensure account is selected
  const accSet = new Set(selectedAccountIds.value);
  accSet.add(accountId);
  selectedAccountIds.value = accSet;
  // Close form
  closeAddDealForm(accountId);
}

/** Delete a locally added once-off deal */
function deleteLocalDeal(accountId, dealId) {
  if (!accountId || !dealId) return;
  const existing = localDeals.value[accountId] || [];
  localDeals.value = { ...localDeals.value, [accountId]: existing.filter(d => d.id !== dealId) };
  const newSet = new Set(selectedDealIds.value);
  newSet.delete(dealId);
  selectedDealIds.value = newSet;
  selectionTick.value++;
}

/** Delete an account from the commission table */
function deleteCommissionAccount(accountId) {
  if (!accountId) return;
  const accs = new Set(selectedAccountIds.value);
  accs.delete(accountId);
  selectedAccountIds.value = accs;
  const account = allAccountRows.value.find(a => a.id === accountId);
  if (account) {
    const deals = new Set(selectedDealIds.value);
    (account.deals || []).forEach(d => deals.delete(d.id));
    selectedDealIds.value = deals;
  }
  selectionTick.value++;
}

/** Reset all commissions for a staff member to zero */
function deleteSummaryStaff(email) {
  if (!email) return;
  const accounts = allAccountRows.value.filter(a => (a.assignedEmail || 'unassigned') === email);
  const updates = { ...commissionState.value };
  accounts.forEach(a => { updates[a.id] = { status: 'pending', paidAt: null }; });
  commissionState.value = updates;
  selectionTick.value++;
}

function calcPerPeriod(amount, period) {
  if (period === 'once-off') return amount;
  const divisor = {
    'days-30': 1, 'days-60': 2, 'days-90': 3,
    'monthly': 1, 'quarterly': 1, 'yearly': 1
  }[period] || 1;
  return amount / divisor;
}

const tabs = [
  { id: 'conversion', label: 'Conversion', icon: TrendingUp },
  { id: 'pipeline', label: 'Pipeline', icon: GitBranch },
  { id: 'performance', label: 'Staff', icon: Users },
  { id: 'commissions', label: 'Commissions', icon: DollarSign },
  { id: 'activities', label: 'Activities', icon: CalendarDays },
];

const staffList = computed(() => props.tenantUsers || []);

// ─── Color palette for dynamic stages ───
const stageColorPalette = [
  '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B',
  '#F97316', '#EF4444', '#10B981', '#14B8A6', '#06B6D4',
  '#2563EB', '#7C3AED', '#DB2777', '#D97706', '#65A30D'
];

/** Build a color map from pipeline stages, assigning from palette for custom stages */
function buildStageColorMap(stages) {
  const defaultColors = {
    'new': '#3B82F6', 'contacted': '#6366F1', 'qualified': '#8B5CF6',
    'proposal': '#F59E0B', 'negotiation': '#F97316',
    'closed-won': '#10B981', 'closed-lost': '#EF4444'
  };
  const map = {};
  let paletteIdx = 0;
  (stages || []).forEach(s => {
    if (defaultColors[s.id]) {
      map[s.id] = defaultColors[s.id];
    } else {
      map[s.id] = stageColorPalette[paletteIdx % stageColorPalette.length];
      paletteIdx++;
    }
  });
  return map;
}

const stageColors = computed(() => buildStageColorMap(props.pipelineStages));

/** Win probability for a stage — default values + 50 for unknown custom stages */
function getWinProb(stageId) {
  const map = { 'new': 10, 'contacted': 20, 'qualified': 40, 'proposal': 60, 'negotiation': 75, 'closed-won': 100, 'closed-lost': 0 };
  if (map[stageId] !== undefined) return map[stageId];
  // Custom stages get a progressive probability based on their order
  const stages = props.pipelineStages || [];
  const idx = stages.findIndex(s => s.id === stageId);
  if (idx === -1) return 50;
  const total = stages.length;
  // Closed-won and closed-lost at the end get fixed values
  return Math.round(10 + (idx / Math.max(total - 1, 1)) * 65);
}

// ─── Computed Analytics ───────────────────────────────────────────────
const analytics = computed(() => {
  const s = props.stats || {};
  let leads = props.pipelineLeads || [];
  let deals = props.pipelineDeals || [];
  const perf = props.performanceList || [];
  const stages = props.pipelineStages || [];
  const colors = stageColors.value;

  // ── Permission scoping: non-admin users only see their own records ──
  const userEmail = (props.currentUserEmail || '').toLowerCase();
  const isOwnerOrAdmin = props.isAdmin;
  if (!isOwnerOrAdmin && userEmail) {
    leads = leads.filter(l => {
      const assigned = (l.assignedTo || l.assigned_to || l.assignedto || l.owner || l.created_by || l.createdBy || '').toLowerCase();
      return assigned === userEmail;
    });
    deals = deals.filter(d => {
      const assigned = (d.assignedTo || d.assigned_to || d.owner || d.created_by || '').toLowerCase();
      return assigned === userEmail;
    });
  }

  // Conversion rate — prefer backend stats, fallback to local calc
  const allLeads = leads.length || 1;
  const closedWon = leads.filter(l => l.stage === 'closed-won' || l.converted_at).length;
  const conversionRate = s.deals?.conversionRate !== undefined
    ? Number(s.deals.conversionRate).toFixed(1)
    : ((closedWon / allLeads) * 100).toFixed(1);

  // Avg days to convert (from leads with converted_at and created_at)
  const convertedLeads = leads.filter(l => l.converted_at && l.created_at);
  const avgConversionDays = convertedLeads.length
    ? Math.round(convertedLeads.reduce((sum, l) => {
        const diff = new Date(l.converted_at) - new Date(l.created_at);
        return sum + diff / (1000 * 60 * 60 * 24);
      }, 0) / convertedLeads.length)
    : 0;

  // Stale leads (no update/activity in staleThresholdDays)
  const cutoff = new Date(Date.now() - staleThresholdDays * 86400000);
  const staleLeads = leads.filter(l => {
    if (['closed-won','closed-lost'].includes(l.stage)) return false;
    const lastActivity = new Date(l.last_activity_at || l.updated_at || l.created_at);
    return lastActivity < cutoff;
  }).length;

  // CAC (rough: pipelineValue / converted count, or 0)
  const convertedCount = convertedLeads.length || 1;
  const avgCAC = (s.deals?.pipelineValue || 0) / convertedCount;

  // ── Pipeline funnel (dynamic by stages) ──
  const stageCounts = {};
  leads.forEach(l => { stageCounts[l.stage] = (stageCounts[l.stage] || 0) + 1; });
  const total = leads.length || 1;
  const funnelData = stages.map(st => ({
    id: st.id,
    name: st.name,
    count: stageCounts[st.id] || 0,
    pct: Math.round((stageCounts[st.id] || 0) / total * 100),
    color: colors[st.id] || '#6B7280'
  }));

  // ── Conversion by lead source ──
  // Prefer backend stats.conversionBySource if available
  let conversionBySource = [];
  if (s.conversionBySource && Array.isArray(s.conversionBySource)) {
    conversionBySource = s.conversionBySource;
  } else {
    // Compute locally from leads data
    const sourceMap = {};
    leads.forEach(l => {
      const src = l.source || l.leadSource || 'Unknown';
      if (!sourceMap[src]) sourceMap[src] = { total: 0, converted: 0 };
      sourceMap[src].total++;
      if (l.stage === 'closed-won' || l.converted_at) sourceMap[src].converted++;
    });
    const wonDealLeadIds = new Set(
      deals.filter(d => d.stage === 'closed-won').map(d => d.lead_id || d.related_lead_id).filter(Boolean)
    );
    // Also count deals that were won as conversions
    leads.forEach(l => {
      if (wonDealLeadIds.has(l.id)) {
        const src = l.source || l.leadSource || 'Unknown';
        if (!sourceMap[src]) sourceMap[src] = { total: 0, converted: 0 };
        sourceMap[src].converted = Math.max(sourceMap[src].converted || 0, 1);
      }
    });
    conversionBySource = Object.entries(sourceMap).map(([source, v]) => ({
      source, total: v.total, converted: v.converted,
      rate: v.total ? Math.round(v.converted / v.total * 100) : 0
    })).sort((a, b) => b.rate - a.rate).slice(0, 8);
  }

  // ── Pipeline by stage (deals) ──
  const dealStageMap = {};
  deals.forEach(d => {
    const stg = d.stage || 'unknown';
    if (!dealStageMap[stg]) dealStageMap[stg] = { count: 0, value: 0, days: [] };
    dealStageMap[stg].count++;
    dealStageMap[stg].value += Number(d.amount || d.value || 0);
    if (d.created_at) dealStageMap[stg].days.push((Date.now() - new Date(d.created_at)) / 86400000);
  });
  // Build pipeline by stage dynamically — include all stages even if count=0
  const pipelineByStage = stages.map(st => {
    const v = dealStageMap[st.id] || { count: 0, value: 0, days: [] };
    return {
      id: st.id,
      name: st.name,
      count: v.count,
      value: v.value,
      avgDays: v.days.length ? Math.round(v.days.reduce((a, b) => a + b, 0) / v.days.length) : 0,
      winProb: getWinProb(st.id),
      color: colors[st.id] || '#6B7280'
    };
  });

  // ── Activity type patterns (used by both per-user and global summaries) ──
  const actTypePatterns = [
    { pattern: 'call', label: 'call' },
    { pattern: 'whatsapp', label: 'whatsapp' },
    { pattern: 'email', label: 'email' },
    { pattern: 'meeting', label: 'meeting' },
    { pattern: 'note', label: 'note' }
  ];

  // ── Staff performance (derived locally from leads, deals & activities) ──
  const userMap = {};
  (props.tenantUsers || []).forEach(u => {
    const email = (u.email || '').toLowerCase();
    if (email) userMap[email] = { email, name: u.name || u.full_name || email.split('@')[0], leadsAssigned: 0, converted: 0, activities: 0, revenue: 0 };
  });
  // Build set of all assigned email addresses (multiple field variants)
  const assignedEmails = new Set();
  leads.forEach(l => {
    const e = (l.assignedTo || l.assigned_to || l.assignedto || l.owner || l.created_by || l.createdBy || '').toLowerCase();
    if (e) assignedEmails.add(e);
  });
  if (Object.keys(userMap).length === 0) {
    assignedEmails.forEach(e => { userMap[e] = { email: e, name: e.split('@')[0], leadsAssigned: 0, converted: 0, activities: 0, revenue: 0 }; });
  }
  // Count leads assigned & converted (check all assignment field variants)
  leads.forEach(l => {
    const email = (l.assignedTo || l.assigned_to || l.assignedto || l.owner || l.created_by || l.createdBy || '').toLowerCase();
    if (!email || !userMap[email]) return;
    userMap[email].leadsAssigned++;
    if (l.stage === 'closed-won' || l.converted_at) userMap[email].converted++;
  });
  // Count revenue from won deals per user (check all assignment field variants)
  deals.forEach(d => {
    const email = (d.assignedTo || d.assigned_to || d.owner || d.created_by || '').toLowerCase();
    if (!email || !userMap[email]) return;
    if (d.stage === 'closed-won') {
      userMap[email].revenue += Number(d.amount || d.value || 0);
    }
  });
  // Count activities per user (also add users found in activities who aren't in tenantUsers)
  (props.activities || []).forEach(a => {
    const email = (a.user_email || a.actor || '').toLowerCase();
    if (!email) return;
    if (!userMap[email]) {
      userMap[email] = { email, name: email.split('@')[0], leadsAssigned: 0, converted: 0, activities: 0, revenue: 0 };
    }
    userMap[email].activities++;
  });
  // Build sorted array
  const staffPerformance = Object.values(userMap)
    .map(m => ({
      ...m,
      convRate: m.leadsAssigned ? Math.round((m.converted / m.leadsAssigned) * 100) : 0
    }))
    .sort((a, b) => b.revenue - a.revenue);

  // ── Per-user activity summary (normalized types) ──
  const userActivityBreakdown = {};
  (props.activities || []).forEach(a => {
    const email = (a.user_email || a.actor || '').toLowerCase();
    if (!email) return;
    if (!userActivityBreakdown[email]) userActivityBreakdown[email] = {};
    const rawType = (a.type || a.action_type || '').toLowerCase();
    for (const { pattern, label } of actTypePatterns) {
      if (rawType.includes(pattern)) {
        userActivityBreakdown[email][label] = (userActivityBreakdown[email][label] || 0) + 1;
        break;
      }
    }
  });

  // ── Activity summary (normalize composite types like 'communication:call' → 'call') ──
  const actCounts = {};
  actTypePatterns.forEach(({ pattern }) => { actCounts[pattern] = 0; });
  (props.activities || []).forEach(a => {
    const rawType = (a.type || a.action_type || '').toLowerCase();
    for (const { pattern, label } of actTypePatterns) {
      if (rawType.includes(pattern)) { actCounts[label]++; break; }
    }
  });
  const maxAct = Math.max(...Object.values(actCounts), 1);
  const actColors = { call:'#3B82F6', email:'#8B5CF6', meeting:'#10B981', note:'#6B7280', whatsapp:'#25D366' };
  const actIcons = { call: Phone, email: Mail, meeting: CalendarDays, note: FileText, whatsapp: MessageSquare };
  const activitySummary = actTypePatterns.map(({ label }) => ({
    type: label, count: actCounts[label] || 0, color: actColors[label],
    icon: actIcons[label] || FileText,
    pct: Math.round((actCounts[label] || 0) / maxAct * 100)
  }));

  // ── Unassigned / auto-assigned ──
  const unassignedLeads = leads.filter(l => {
    const assigned = l.assignedTo || l.assigned_to || l.assignedto || l.owner || l.created_by || l.createdBy || '';
    return !assigned && !['closed-won','closed-lost'].includes(l.stage);
  }).length;
  const escalatedLeads = leads.filter(l => l.escalated_to_manager).length;
  const overdueFollowUps = leads.filter(l => {
    if (!l.next_follow_up) return false;
    return new Date(l.next_follow_up) < new Date() && !['closed-won','closed-lost'].includes(l.stage);
  }).length;

  return {
    conversionRate, avgConversionDays, staleLeads, avgCAC,
    funnelData, conversionBySource,
    pipelineValue: s.deals?.pipelineValue || 0,
    weightedPipelineValue: s.deals?.weightedPipelineValue || 0,
    dealsWon: s.deals?.won || deals.filter(d => d.stage === 'closed-won').length,
    dealsLost: deals.filter(d => d.stage === 'closed-lost').length,
    pipelineByStage,
    staffPerformance,
    userActivityBreakdown,
    activitySummary,
    unassignedLeads,
    autoAssignedToday: leads.filter(l => l.auto_assigned || l.autoAssigned).length,
    escalatedLeads,
    overdueFollowUps
  };
});

const totalCommissions = computed(() => commissionRows.value.reduce((s, r) => s + r.total, 0));
const paidCommissionsTotal = computed(() => {
  void selectionTick.value;
  return allAccountRows.value.filter(a => (commissionState.value[a.id]?.status || a.status) === 'paid').reduce((s, a) => s + a.totalPayout, 0);
});
const unpaidCommissionsTotal = computed(() => {
  void selectionTick.value;
  return allAccountRows.value.filter(a => (commissionState.value[a.id]?.status || a.status) !== 'paid').reduce((s, a) => s + a.totalPayout, 0);
});

const commissionSummary = computed(() => {
  void selectionTick.value;
  const summary = {};
  allAccountRows.value.forEach(a => {
    const email = a.assignedEmail || 'unassigned';
    if (!summary[email]) summary[email] = { count: 0, totalAmount: 0, baseCommission: 0, bonus: 0, totalPayout: 0, perPeriod: 0 };
    summary[email].count++;
    summary[email].totalAmount += a.totalAmount;
    summary[email].baseCommission += a.baseCommission;
    summary[email].bonus += a.bonus;
    summary[email].totalPayout += a.totalPayout;
    summary[email].perPeriod += a.perPeriod;
  });
  return summary;
});

const filteredActivities = computed(() => {
  let acts = props.activities || [];
  // Permission scoping for activity feed
  const userEmail = (props.currentUserEmail || '').toLowerCase();
  if (!props.isAdmin && userEmail) {
    acts = acts.filter(a => (a.user_email || a.actor || '').toLowerCase() === userEmail);
  }
  if (activitySourceFilter.value) acts = acts.filter(a => (a.related_type || a.entity_type || '').toLowerCase() === activitySourceFilter.value);
  if (activityTypeFilter.value) acts = acts.filter(a => (a.type || a.action_type || '').toLowerCase().includes(activityTypeFilter.value));
  if (activityUserFilter.value) acts = acts.filter(a => (a.user_email || a.actor) === activityUserFilter.value);
  return acts.slice(0, 2000);
});

// ─── Functions ─────────────────────────────────────────────────────
function getInitials(v) {
  if (!v) return '?';
  if (v.includes('@')) return v.substring(0, 2).toUpperCase();
  const p = v.split(' ');
  return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : v.substring(0, 2).toUpperCase();
}

function getActivityColor(type) {
  const map = { call:'#3B82F6', email:'#8B5CF6', meeting:'#10B981', note:'#6B7280', whatsapp:'#25D366', stage_change:'#2F2E8B' };
  return map[type] || '#6B7280';
}

function getActivityIcon(type) {
  const map = { call: Phone, email: Mail, meeting: CalendarDays, note: FileText, whatsapp: MessageSquare, stage_change: GitBranch };
  return map[type] || FileText;
}

function formatRelativeTime(dt) {
  if (!dt) return '';
  const diff = Date.now() - new Date(dt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatFullDate(dt) {
  if (!dt) return '—';
  try {
    const d = new Date(dt);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return '—'; }
}

function formatTime(dt) {
  if (!dt) return '';
  try {
    const d = new Date(dt);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch { return ''; }
}

function calcCommissions() {
  const baseRate = commConfig.value.baseRate;
  const bonusRate = commConfig.value.bonusRate;
  const bonusThreshold = commConfig.value.bonusThreshold;
  const period = commConfig.value.period;
  const calcOn = commConfig.value.calculateOn;

  let rows = [];

  if (calcOn === 'all-accounts') {
    // Use all accounts
    rows = allAccountRows.value.map(a => {
      const totalDealAmount = a.deals.reduce((sum, d) => sum + Number(d.amount || d.value || 0), 0);
      const base = totalDealAmount * (baseRate / 100);
      const eligible = a.deals.length >= bonusThreshold;
      const bonus = eligible ? totalDealAmount * (bonusRate / 100) : 0;
      const total = base + bonus;
      const perPeriod = calcPerPeriod(total, period);
      return {
        id: a.id,
        accountName: a.name,
        email: a.assignedEmail,
        deals: a.deals,
        totalAmount: totalDealAmount,
        baseCommission: base,
        bonus,
        total,
        perPeriod,
        status: 'pending'
      };
    });
  } else {
    // Only selected accounts
    const selected = allAccountRows.value.filter(a => selectedAccountIds.value.has(a.id));
    rows = selected.map(a => {
      // Only count selected deals
      const selectedDeals = a.deals.filter(d => selectedDealIds.value.has(d.id));
      const totalDealAmount = selectedDeals.reduce((sum, d) => sum + Number(d.amount || d.value || 0), 0);
      const base = totalDealAmount * (baseRate / 100);
      const eligible = a.deals.length >= bonusThreshold;
      const bonus = eligible ? totalDealAmount * (bonusRate / 100) : 0;
      const total = base + bonus;
      const perPeriod = calcPerPeriod(total, period);
      return {
        id: a.id,
        accountName: a.name,
        email: a.assignedEmail,
        deals: selectedDeals,
        totalAmount: totalDealAmount,
        baseCommission: base,
        bonus,
        total,
        perPeriod,
        status: 'pending'
      };
    });
  }

  commissionRows.value = rows.sort((a, b) => b.total - a.total);
  // Reset commission state for calculated accounts
  const stateUpdates = { ...commissionState.value };
  rows.forEach(r => {
    if (!stateUpdates[r.id]) stateUpdates[r.id] = { status: 'pending', paidAt: null };
  });
  commissionState.value = stateUpdates;
  // Save to history
  const now = new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  const paid = rows.filter(r => (commissionState.value[r.id]?.status || r.status) === 'paid').reduce((s, r) => s + r.total, 0);
  const unpaid = rows.filter(r => (commissionState.value[r.id]?.status || r.status) !== 'paid').reduce((s, r) => s + r.total, 0);
  commissionHistory.value.unshift({ timestamp: now, rows: rows.length, total: paid + unpaid, paidTotal: paid, unpaidTotal: unpaid });
  if (commissionHistory.value.length > 20) commissionHistory.value = commissionHistory.value.slice(0, 20);
  commissionCalculatedAt.value = now;
}

/** Reset an account's commission values to zero */
function resetCommissionAccount(accountId) {
  commissionState.value = { ...commissionState.value, [accountId]: { status: 'pending', paidAt: null } };
  selectionTick.value++;
}

/** Quick mark an account's commission as paid */
function markAsPaid(accountId) {
  commissionState.value = {
    ...commissionState.value,
    [accountId]: {
      status: 'paid',
      paidAt: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
    }
  };
  selectionTick.value++;
}

function updatePayoutStatus(account, newStatus) {
  commissionState.value = {
    ...commissionState.value,
    [account.id]: {
      status: newStatus,
      paidAt: newStatus === 'paid' ? new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : null
    }
  };
  selectionTick.value++;
}

function refreshAnalytics() {
  emit('refresh-stats');
}
</script>

<style scoped>
/* Consistent thin scrollbar across browsers */
:deep(.custom-scrollbar) {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
:deep(.custom-scrollbar::-webkit-scrollbar) {
  width: 4px;
  height: 4px;
}
:deep(.custom-scrollbar::-webkit-scrollbar-track) {
  background: transparent;
}
:deep(.custom-scrollbar::-webkit-scrollbar-thumb) {
  background: #cbd5e1;
  border-radius: 4px;
}
/* Ensure tables don't overflow their container on small screens */
:deep(table) {
  border-collapse: collapse;
}
</style>
