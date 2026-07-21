<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/crm" variant="icon-only" />
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Financials // CRM // Analytics</span>
            <h1 class="text-lg font-black text-gray-900 uppercase tracking-tight">Acquisition_Costs</h1>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-mono font-bold text-[#2F2E8B] bg-indigo-50 border border-indigo-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider">
            <UserCircle :size="14" /> {{ getUserEmail() || 'USER' }}
          </span>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 pb-40">
      <div class="px-4 sm:px-6 lg:px-8 space-y-6 py-6 relative">
        <!-- Page Title Row -->
        <div class="flex items-center justify-between border-b border-gray-100 pb-4">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <DollarSign :size="14" class="text-gray-400" /> Lead_Acquisition_Analytics
            </h3>
          </div>
          <button @click="openCOAModal" class="px-4 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#252475] transition flex items-center gap-2 shadow-lg shadow-indigo-900/10">
            <Plus :size="14" /> Log_New_Cost
          </button>
        </div>

        <!-- Analytics Dashboard KPIs (Collapsible) -->
        <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 cursor-pointer select-none" @click="isKpiSectionVisible = !isKpiSectionVisible">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h3 class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider">Key_Performance_Indicators</h3>
            </div>
            <button
              class="flex items-center gap-2 px-3 py-1.5 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest transition border hover:bg-gray-100"
              :class="isKpiSectionVisible ? 'text-gray-500 border-gray-200' : 'text-[#2F2E8B] border-indigo-200 bg-indigo-50/50'"
            >
              <svg
                class="w-3.5 h-3.5 transition-transform duration-300"
                :class="isKpiSectionVisible ? 'rotate-0' : '-rotate-90'"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
              {{ isKpiSectionVisible ? 'Hide_KPIs' : 'Show_KPIs' }}
            </button>
          </div>

          <div v-show="isKpiSectionVisible" class="p-6 transition-all duration-300">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              <div class="bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                  <h4 class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-3 tracking-wider">Total_Marketing_Spend</h4>
                  <p class="text-xl font-black text-gray-900 font-mono tracking-tighter">{{ formatCurrency(totalMarketingSpend) }}</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                  <h4 class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-3 tracking-wider">Avg_Acquisition_Cost</h4>
                  <p class="text-xl font-black text-gray-900 font-mono tracking-tighter">{{ formatCurrency(avgAcquisitionCost) }}</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                  <h4 class="text-[9px] font-mono font-bold text-gray-400 uppercase mb-3 tracking-wider">Total_Investment</h4>
                  <p class="text-xl font-black text-gray-900 font-mono tracking-tighter">{{ formatCurrency(totalCosts) }}</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                  <h4 class="text-[9px] font-mono font-bold text-emerald-500 uppercase mb-3 tracking-wider">Lifetime_Value</h4>
                  <p class="text-xl font-black text-emerald-600 font-mono tracking-tighter">{{ formatCurrency(totalLifetimeValue) }}</p>
              </div>
              <div class="bg-white border border-gray-200 rounded-sm p-5 relative overflow-hidden hover:shadow-md hover:border-gray-300 transition-all">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                  <h4 class="text-[9px] font-mono font-bold text-blue-500 uppercase mb-3 tracking-wider">Revenue_Made</h4>
                  <p class="text-xl font-black text-blue-600 font-mono tracking-tighter">{{ formatCurrency(totalRevenueMade) }}</p>
              </div>
              <div :class="totalRevenueMade - totalCosts >= 0 ? 'border-green-200 bg-green-50/30 hover:border-green-300' : 'border-red-200 bg-red-50/30 hover:border-red-300'" class="border rounded-sm p-5 relative overflow-hidden hover:shadow-md transition-all">
                  <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                  <h4 :class="totalRevenueMade - totalCosts >= 0 ? 'text-green-500' : 'text-red-500'" class="text-[9px] font-mono font-bold uppercase mb-3 tracking-wider">{{ totalRevenueMade - totalCosts >= 0 ? 'Net_Profit' : 'Net_Loss' }}</h4>
                  <p :class="totalRevenueMade - totalCosts >= 0 ? 'text-green-600' : 'text-red-600'" class="text-xl font-black font-mono tracking-tighter">{{ totalRevenueMade - totalCosts >= 0 ? '+' : '' }}{{ formatCurrency(totalRevenueMade - totalCosts) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Saved Cost Records Table -->
        <div class="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h3 class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider">Cost_Records_History</h3>
            </div>
            <span class="text-[9px] font-mono font-bold text-gray-400">{{ costRecords.length }} RECORDS</span>
          </div>

          <div v-if="loadingCosts" class="p-12 text-center">
            <div class="w-6 h-6 border-2 border-gray-200 border-t-[#2F2E8B] rounded-full animate-spin mx-auto mb-3"></div>
            <span class="text-[10px] font-mono font-bold text-gray-400 uppercase">Loading records...</span>
          </div>

          <div v-else-if="costRecords.length === 0" class="p-12 text-center">
            <DollarSign :size="32" class="text-gray-200 mx-auto mb-3" />
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase">No acquisition costs logged yet</p>
            <p class="text-[9px] font-mono text-gray-300 mt-1">Click "Log_New_Cost" to add your first record</p>
          </div>

          <table v-else class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-100">
              <tr>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Lead</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Source</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">Total Cost</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">LTV</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">Revenue Made</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">Profit / Loss</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th class="px-4 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="record in costRecords" :key="record.id" class="hover:bg-indigo-50/30 transition-colors">
                <td class="px-4 py-3">
                  <div class="text-xs font-bold text-gray-900">{{ record.lead_name || '—' }}</div>
                  <div v-if="record.campaign_name" class="text-[9px] font-mono text-gray-400 mt-0.5">{{ record.campaign_name }}</div>
                </td>
                <td class="px-4 py-3">
                  <span v-if="record.lead_source" class="text-[9px] font-mono font-bold text-[#2F2E8B] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-sm uppercase">{{ record.lead_source }}</span>
                  <span v-else class="text-[9px] font-mono text-gray-300">—</span>
                </td>
                <td class="px-4 py-3 text-right text-xs font-mono font-black text-gray-900">{{ formatCurrency(record.total_cost) }}</td>
                <td class="px-4 py-3 text-right text-xs font-mono font-bold text-emerald-600">{{ formatCurrency(record.lifetime_value || 0) }}</td>
                <td class="px-4 py-3 text-right text-xs font-mono font-bold text-blue-600">{{ formatCurrency(record.revenue_made || 0) }}</td>
                <td class="px-4 py-3 text-right">
                  <div class="flex flex-col items-end gap-0.5">
                    <span :class="(record.revenue_made || 0) - (record.total_cost || 0) >= 0 ? 'text-green-600' : 'text-red-600'" class="text-xs font-mono font-black">
                      {{ (record.revenue_made || 0) - (record.total_cost || 0) >= 0 ? '+' : '' }}{{ formatCurrency((record.revenue_made || 0) - (record.total_cost || 0)) }}
                    </span>
                    <span :class="(record.roi || 0) >= 0 ? 'text-green-500 bg-green-50 border-green-100' : 'text-red-500 bg-red-50 border-red-100'" class="text-[8px] font-mono font-bold border px-1.5 py-0.5 rounded-sm">
                      {{ (record.roi || 0) >= 0 ? '▲' : '▼' }} {{ Math.abs(record.roi || 0).toFixed(1) }}% ROI
                    </span>
                  </div>
                </td>
                <td class="px-4 py-3 text-[9px] font-mono text-gray-400">{{ formatDate(record.created_at) }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-1">
                    <button @click="editCost(record)" class="text-gray-300 hover:text-[#2F2E8B] transition-colors p-1" title="Edit">
                      <Pencil :size="12" />
                    </button>
                    <button @click="removeCost(record)" class="text-gray-300 hover:text-red-500 transition-colors p-1" title="Delete">
                      <Trash2 :size="12" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <!-- Cost Log Modal — outside stacking context so it floats over everything -->
    <div v-if="showCOAModal" class="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-xl shadow-2xl rounded-sm border border-gray-100 flex flex-col max-h-[90vh] relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          
          <header class="p-6 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-8 bg-[#2F2E8B]"></div>
              <div>
                <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Financials // CRM</span>
                <h2 class="text-lg font-black text-gray-900 uppercase tracking-tight">{{ editingCostId ? 'Edit_Cost_Record' : 'Acquisition_Cost_Log' }}</h2>
              </div>
            </div>
            <button @click="showCOAModal = false" class="text-gray-400 hover:text-gray-900 transition p-2 hover:bg-gray-50 rounded-full">
              <X :size="20" />
            </button>
          </header>

              <div class="flex-1 overflow-y-auto p-6 space-y-8 relative z-10 bg-white/40">
                <section class="space-y-4">
                  <div class="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <Users :size="14" class="text-[#2F2E8B]" />
                    <h3 class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider">Lead_Association</h3>
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-mono font-bold text-gray-500 uppercase">Select Target Lead *</label>
                    <!-- Searchable lead dropdown -->
                    <div class="relative" ref="leadDropdownRef">
                      <div
                        class="w-full bg-white border rounded-sm px-3 py-3 flex items-center gap-2 cursor-text transition"
                        :class="showLeadDropdown ? 'border-[#2F2E8B] ring-4 ring-[#2F2E8B]/10' : 'border-gray-200 hover:border-gray-300'"
                        @click="openLeadDropdown"
                      >
                        <input
                          ref="leadSearchInputRef"
                          v-model="leadQuery"
                          @focus="openLeadDropdown"
                          @input="showLeadDropdown = true"
                          @keydown.escape="closeLeadDropdown"
                          @keydown.enter.prevent="filteredLeads.length === 1 && selectLead(filteredLeads[0])"
                          :placeholder="selectedLeadDisplayName || '-- CHOOSE_LEAD --'"
                          class="flex-1 outline-none bg-transparent font-mono text-xs tracking-tight placeholder-gray-400 min-w-0"
                        />
                        <button v-if="coaForm.leadId" @click.stop="clearLead" class="text-gray-300 hover:text-red-400 transition flex-shrink-0" title="Clear">
                          <X :size="12" />
                        </button>
                        <ChevronRight
                          class="text-gray-400 flex-shrink-0 pointer-events-none transition-transform"
                          :class="showLeadDropdown ? '-rotate-90' : 'rotate-90'"
                          :size="14"
                        />
                      </div>

                      <!-- Dropdown list -->
                      <div
                        v-if="showLeadDropdown"
                        class="absolute z-[70] w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-sm overflow-hidden"
                      >
                        <div class="max-h-52 overflow-y-auto">
                          <div v-if="filteredLeads.length === 0" class="px-3 py-3 text-[10px] font-mono text-gray-400 uppercase tracking-widest text-center">
                            No leads match "{{ leadQuery }}"
                          </div>
                          <button
                            v-for="lead in filteredLeads"
                            :key="lead.id || lead._id"
                            @mousedown.prevent="selectLead(lead)"
                            class="w-full text-left px-3 py-2.5 text-xs font-mono hover:bg-indigo-50 transition-colors flex items-center justify-between gap-3 border-b border-gray-50 last:border-0"
                            :class="coaForm.leadId === (lead.id || lead._id) ? 'bg-indigo-50 text-[#2F2E8B] font-bold' : 'text-gray-700'"
                          >
                            <span class="truncate">{{ lead.name }}</span>
                            <span class="text-[9px] text-gray-400 flex-shrink-0 font-mono uppercase">{{ lead.company || 'Private' }}</span>
                          </button>
                        </div>
                        <div class="px-3 py-1.5 bg-gray-50 border-t border-gray-100 text-[8px] font-mono text-gray-300 uppercase tracking-widest">
                          {{ filteredLeads.length }} of {{ leads.length }} leads
                        </div>
                      </div>
                    </div>
                    <!-- Lead Source Attribution from CRM -->
                    <div v-if="coaForm.leadId && selectedLeadSource" class="flex items-center gap-2 mt-2 p-2.5 bg-indigo-50 border border-indigo-100 rounded-sm">
                      <Target :size="12" class="text-[#2F2E8B] flex-shrink-0" />
                      <span class="text-[9px] font-mono font-bold text-gray-500 uppercase">Source:</span>
                      <span class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-wider">{{ selectedLeadSource }}</span>
                    </div>
                    <div v-else-if="coaForm.leadId && !selectedLeadSource" class="flex items-center gap-2 mt-2 p-2.5 bg-gray-50 border border-gray-100 rounded-sm">
                      <Target :size="12" class="text-gray-300 flex-shrink-0" />
                      <span class="text-[9px] font-mono text-gray-400 uppercase">No source attribution set for this lead</span>
                    </div>
                  </div>
                </section>

                <section class="space-y-4">
                  <div class="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <Calculator :size="14" class="text-[#2F2E8B]" />
                    <h3 class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider">Expense_Breakdown</h3>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-[10px] font-mono font-bold text-gray-500 uppercase">Marketing Spend (AdWords/Meta)</label>
                      <input type="number" v-model.number="coaForm.marketingSpend" class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[10px] font-mono font-bold text-gray-500 uppercase">Sales Commissions</label>
                      <input type="number" v-model.number="coaForm.salesCommission" class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[10px] font-mono font-bold text-gray-500 uppercase">Sales Tools / Subscriptions</label>
                      <input type="number" v-model.number="coaForm.softwareCosts" class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono" />
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[10px] font-mono font-bold text-gray-500 uppercase">Other Misc Costs</label>
                      <input type="number" v-model.number="coaForm.otherCosts" class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono" />
                    </div>
                  </div>
                </section>

                <section class="space-y-4">
                  <div class="flex items-center gap-2 border-b border-gray-100 pb-2">
                    <TrendingUp :size="14" class="text-[#2F2E8B]" />
                    <h3 class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider">Revenue_&_Client_Value</h3>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-[10px] font-mono font-bold text-gray-500 uppercase">Lifetime Value (LTV)</label>
                      <input type="number" v-model.number="coaForm.lifetimeValue" class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono" placeholder="0" />
                      <span class="text-[8px] font-mono text-gray-400">Expected total revenue over client relationship</span>
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[10px] font-mono font-bold text-gray-500 uppercase">Revenue Made / Will Make</label>
                      <input type="number" v-model.number="coaForm.revenueMade" class="w-full bg-white border border-gray-200 focus:border-[#2F2E8B] rounded-sm p-3 text-sm font-mono" placeholder="0" />
                      <span class="text-[8px] font-mono text-gray-400">Actual or projected revenue from this client</span>
                    </div>
                  </div>
                </section>

                <div class="bg-gray-900 p-5 rounded-sm border border-gray-800 space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Total_Investment</span>
                    <span class="text-lg font-mono font-black text-white">${{ calculatedCOA.toFixed(2) }}</span>
                  </div>
                  <div v-if="coaForm.lifetimeValue" class="flex items-center justify-between border-t border-gray-800 pt-3">
                    <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Lifetime_Value</span>
                    <span class="text-lg font-mono font-black text-emerald-400">${{ (coaForm.lifetimeValue || 0).toFixed(2) }}</span>
                  </div>
                  <div v-if="coaForm.revenueMade" class="flex items-center justify-between border-t border-gray-800 pt-3">
                    <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Revenue_Made</span>
                    <span class="text-lg font-mono font-black text-blue-400">${{ (coaForm.revenueMade || 0).toFixed(2) }}</span>
                  </div>
                  <div v-if="coaForm.revenueMade || calculatedCOA > 0" class="flex items-center justify-between border-t border-gray-800 pt-3">
                    <span class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Profit / Loss</span>
                    <div class="flex items-center gap-3">
                      <span :class="profitLoss >= 0 ? 'text-green-400' : 'text-red-400'" class="text-lg font-mono font-black">
                        {{ profitLoss >= 0 ? '+' : '' }}${{ profitLoss.toFixed(2) }}
                      </span>
                      <span :class="roi >= 0 ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'" class="text-[9px] font-mono font-bold border px-2 py-0.5 rounded-sm">
                        {{ roi >= 0 ? '▲' : '▼' }} {{ Math.abs(roi).toFixed(1) }}% ROI
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <footer class="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between relative z-10">
                <button @click="showCOAModal = false" class="px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition">Cancel_Entry</button>
                <button @click="saveCOA" :disabled="savingCOA" class="px-8 py-2.5 bg-[#2F2E8B] text-white rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#252475] transition flex items-center gap-2 shadow-lg shadow-indigo-900/10 disabled:opacity-50">
                   <div v-if="savingCOA" class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   {{ editingCostId ? 'Update_Record' : 'Save_COA_Analytics' }}
                </button>
              </footer>
        </div>
    </div>
  </div>
</template>

<script setup>
import { BackButton } from '@/components/ui'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useCRMModule } from './composables/CRMModule.js';
import { saveAcquisitionCost, getAcquisitionCosts, deleteAcquisitionCost, updateAcquisitionCost } from '@/services/crm_api.js';
import {
  UserCircle, DollarSign, X, Users, Calculator, 
  TrendingUp, TrendingDown, Plus, ChevronRight, Trash2, Target, Pencil
} from 'lucide-vue-next';

const {
  getUserEmail, getTenantId, showToast, leads, loadLeads, formatCurrency
} = useCRMModule();

const showCOAModal = ref(false);
const savingCOA = ref(false);
const costRecords = ref([]);
const loadingCosts = ref(false);
const editingCostId = ref(null);
const isKpiSectionVisible = ref(true);

// Searchable lead dropdown state
const leadQuery = ref('');
const showLeadDropdown = ref(false);
const leadDropdownRef = ref(null);
const leadSearchInputRef = ref(null);

const selectedLeadDisplayName = computed(() => {
  if (!coaForm.value.leadId) return '';
  const lead = leads.value.find(l => (l.id || l._id) === coaForm.value.leadId);
  return lead ? `${lead.name} (${lead.company || 'Private'})` : '';
});

const filteredLeads = computed(() => {
  const q = leadQuery.value.trim().toLowerCase();
  if (!q) return leads.value;
  return leads.value.filter(l =>
    (l.name || '').toLowerCase().includes(q) ||
    (l.company || '').toLowerCase().includes(q) ||
    (l.email || '').toLowerCase().includes(q)
  );
});

function openLeadDropdown() {
  showLeadDropdown.value = true;
  leadSearchInputRef.value?.focus();
}

function closeLeadDropdown() {
  showLeadDropdown.value = false;
  leadQuery.value = '';
}

function selectLead(lead) {
  coaForm.value.leadId = lead.id || lead._id;
  leadQuery.value = '';
  showLeadDropdown.value = false;
}

function clearLead() {
  coaForm.value.leadId = '';
  leadQuery.value = '';
  showLeadDropdown.value = false;
}

function _handleLeadClickOutside(e) {
  if (leadDropdownRef.value && !leadDropdownRef.value.contains(e.target)) {
    closeLeadDropdown();
  }
}

const coaForm = ref({
  leadId: '',
  campaignName: '',
  marketingSpend: 0,
  salesCommission: 0,
  softwareCosts: 0,
  otherCosts: 0,
  isClosed: false,
  revenueGenerated: 0,
  lifetimeValue: 0,
  revenueMade: 0
});

// Get the selected lead's source attribute from CRM main page
const selectedLeadSource = computed(() => {
  if (!coaForm.value.leadId) return '';
  const lead = leads.value.find(l => (l.id || l._id) === coaForm.value.leadId);
  return lead?.source || '';
});

const selectedLeadName = computed(() => {
  if (!coaForm.value.leadId) return '';
  const lead = leads.value.find(l => (l.id || l._id) === coaForm.value.leadId);
  return lead?.name || '';
});

const calculatedCOA = computed(() => {
  return (coaForm.value.marketingSpend || 0) + (coaForm.value.salesCommission || 0) + (coaForm.value.softwareCosts || 0) + (coaForm.value.otherCosts || 0);
});

const roi = computed(() => {
  if (calculatedCOA.value === 0) return 0;
  const revenue = coaForm.value.revenueMade || 0;
  return ((revenue - calculatedCOA.value) / calculatedCOA.value) * 100;
});

const profitLoss = computed(() => (coaForm.value.revenueMade || 0) - calculatedCOA.value);

// Aggregate KPIs from saved records
const totalMarketingSpend = computed(() => costRecords.value.reduce((sum, r) => sum + (r.marketing_spend || 0), 0));
const totalCosts = computed(() => costRecords.value.reduce((sum, r) => sum + (r.total_cost || 0), 0));
const avgAcquisitionCost = computed(() => costRecords.value.length > 0 ? totalCosts.value / costRecords.value.length : 0);
const totalLifetimeValue = computed(() => costRecords.value.reduce((sum, r) => sum + (r.lifetime_value || 0), 0));
const totalRevenueMade = computed(() => costRecords.value.reduce((sum, r) => sum + (r.revenue_made || 0), 0));

const defaultForm = () => ({ leadId: '', campaignName: '', marketingSpend: 0, salesCommission: 0, softwareCosts: 0, otherCosts: 0, isClosed: false, revenueGenerated: 0, lifetimeValue: 0, revenueMade: 0 });

function openCOAModal() {
  editingCostId.value = null;
  coaForm.value = defaultForm();
  showCOAModal.value = true;
}

function editCost(record) {
  editingCostId.value = record.id;
  coaForm.value = {
    leadId: record.lead_id || '',
    campaignName: record.campaign_name || '',
    marketingSpend: record.marketing_spend || 0,
    salesCommission: record.sales_commission || 0,
    softwareCosts: record.software_costs || 0,
    otherCosts: record.other_costs || 0,
    isClosed: record.is_closed || false,
    revenueGenerated: record.revenue_generated || 0,
    lifetimeValue: record.lifetime_value || 0,
    revenueMade: record.revenue_made || 0
  };
  showCOAModal.value = true;
}

async function loadCostRecords() {
  loadingCosts.value = true;
  try {
    const data = await getAcquisitionCosts(getTenantId());
    costRecords.value = data || [];
  } catch (err) {
    console.error('Failed to load acquisition costs:', err);
  } finally {
    loadingCosts.value = false;
  }
}

async function saveCOA() {
  if (!coaForm.value.leadId) {
    showToast('error', 'Missing Data', 'Please select a lead to attach costs to.');
    return;
  }
  savingCOA.value = true;
  try {
    const payload = {
      lead_id: coaForm.value.leadId,
      lead_name: selectedLeadName.value,
      lead_source: selectedLeadSource.value,
      campaign_name: coaForm.value.campaignName,
      marketing_spend: coaForm.value.marketingSpend || 0,
      sales_commission: coaForm.value.salesCommission || 0,
      software_costs: coaForm.value.softwareCosts || 0,
      other_costs: coaForm.value.otherCosts || 0,
      total_cost: calculatedCOA.value,
      is_closed: coaForm.value.isClosed,
      revenue_generated: coaForm.value.revenueGenerated || 0,
      roi: roi.value,
      lifetime_value: coaForm.value.lifetimeValue || 0,
      revenue_made: coaForm.value.revenueMade || 0,
      tenant_id: getTenantId()
    };

    if (editingCostId.value) {
      await updateAcquisitionCost(editingCostId.value, payload);
      showToast('success', 'Updated', 'Acquisition cost record has been updated.');
    } else {
      await saveAcquisitionCost(payload);
      showToast('success', 'Cost Recorded', 'Acquisition cost has been saved and linked to the lead.');
    }
    showCOAModal.value = false;
    editingCostId.value = null;
    await loadCostRecords();
  } catch (err) {
    showToast('error', 'Save Failed', err.message || 'Could not save acquisition costs.');
  } finally {
    savingCOA.value = false;
  }
}

async function removeCost(record) {
  if (!confirm('Delete this acquisition cost record?')) return;
  try {
    await deleteAcquisitionCost(record.id, getTenantId());
    showToast('success', 'Deleted', 'Acquisition cost record removed.');
    await loadCostRecords();
  } catch (err) {
    showToast('error', 'Delete Failed', err.message || 'Could not delete record.');
  }
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

onMounted(async () => {
  await Promise.all([loadLeads(), loadCostRecords()]);
  document.addEventListener('click', _handleLeadClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', _handleLeadClickOutside);
});
</script>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 0.5px, transparent 0.5px);
  background-size: 20px 20px;
  opacity: 0.05;
}
</style>
