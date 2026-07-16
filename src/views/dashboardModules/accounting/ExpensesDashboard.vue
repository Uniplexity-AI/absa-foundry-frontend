<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <!-- Mesh Background Overlay -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Sticky Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-1.5 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-money-bill-wave text-[#2F2E8B]"></i>
              <span>Accounting // Expenses</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Expenses Dashboard</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div v-if="branches.length > 0" class="hidden md:block text-right mr-4">
            <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 text-right">Active Branch</p>
            <select v-model="selectedBranch" class="rounded-none border-gray-200 shadow-sm text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3 bg-white/50 backdrop-blur-sm">
              <option :value="null">All Branches</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch">{{ branch.name }}</option>
            </select>
          </div>
          <button @click="refreshData" :disabled="loading" class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-[#2F2E8B] hover:text-blue-700 uppercase tracking-wider transition-all disabled:opacity-50 border border-blue-200 px-3 py-1.5 hover:bg-blue-50">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> SYNC_STATE
          </button>
          <button @click="showAddModal = true" class="bg-[#2F2E8B] hover:bg-blue-800 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> Add Expense
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse text-center">Reading Accounting Ledger...</p>
      </div>

      <div v-else class="animate-in fade-in duration-700 space-y-8">
        <!-- Analytics Controls -->
        <div class="bg-white border border-gray-100 shadow-sm px-4 py-3 flex flex-wrap items-center gap-3">
          <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mr-1">
            <i class="fas fa-sliders-h text-[#2F2E8B]"></i>
            Dashboard Controls
          </div>

          <button @click="showKpis = !showKpis" class="px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all"
            :class="showKpis ? 'border-[#2F2E8B] text-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-200 text-gray-500 hover:border-[#2F2E8B]'">
            <i class="fas mr-1" :class="showKpis ? 'fa-eye' : 'fa-eye-slash'"></i>
            {{ showKpis ? 'Hide KPIs' : 'Show KPIs' }}
          </button>

          <button @click="showGraphs = !showGraphs" class="px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all"
            :class="showGraphs ? 'border-[#2F2E8B] text-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-200 text-gray-500 hover:border-[#2F2E8B]'">
            <i class="fas mr-1" :class="showGraphs ? 'fa-chart-bar' : 'fa-ban'"></i>
            {{ showGraphs ? 'Hide Graphs' : 'Show Graphs' }}
          </button>

          <div class="w-px h-5 bg-gray-200 mx-1"></div>

          <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Spending Timeline</label>
          <select v-model="analyticsPeriod" class="px-3 py-1.5 border border-gray-200 text-[9px] font-mono font-black uppercase tracking-widest text-gray-700 focus:border-[#2F2E8B] focus:ring-0">
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="quarter">Quarterly</option>
            <option value="year">Yearly</option>
            <option value="custom">Custom</option>
          </select>

          <template v-if="analyticsPeriod === 'custom'">
            <input
              v-model="analyticsCustomStartDate"
              type="date"
              class="px-2 py-1.5 border border-gray-200 text-[9px] font-mono font-black uppercase tracking-widest text-gray-700 focus:border-[#2F2E8B] focus:ring-0"
            >
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">to</span>
            <input
              v-model="analyticsCustomEndDate"
              type="date"
              class="px-2 py-1.5 border border-gray-200 text-[9px] font-mono font-black uppercase tracking-widest text-gray-700 focus:border-[#2F2E8B] focus:ring-0"
            >
          </template>

          <div class="ml-auto text-right">
            <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Selected Period Spend</p>
            <p class="text-[11px] font-mono font-black text-[#2F2E8B]">{{ formatWithSymbol(analyticsPeriodTotal) }}</p>
          </div>
        </div>

        <!-- KPI Cards Grid -->
        <div v-if="showKpis" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Expenses (Hero) -->
          <div class="kpi-card-hero group border-l-4 border-l-[#2F2E8B] cursor-pointer" @click="navigateTo('/dashboard/expenses/list')">
            <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">LIFETIME</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-[#2F2E8B]">
                <i class="fas fa-chart-line text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display">{{ formatCurrencyShort(totalExpenses) }}</h3>
              <p class="kpi-label uppercase">Total Expenses</p>
              <div class="flex items-center justify-between mt-3">
                <p class="text-[9px] font-mono font-bold text-gray-500 tracking-tighter">ALL_RECORDS: {{ rawExpenses.length }}</p>
              </div>
            </div>
          </div>

          <!-- Monthly Expenses -->
          <div class="kpi-card-hero group border-l-4 border-l-emerald-500 cursor-pointer" @click="navigateTo('/dashboard/expenses/list?time=month')">
            <div class="absolute top-0 right-0 bg-emerald-50 border-b border-l border-emerald-100 px-2 py-0.5 text-[8px] font-mono font-bold text-emerald-600 uppercase tracking-widest z-20">THIS MONTH</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-emerald-600 bg-emerald-50">
                <i class="fas fa-calendar-alt text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display text-emerald-700">{{ formatCurrencyShort(monthlyExpenses) }}</h3>
              <p class="kpi-label uppercase">Monthly Burn</p>
              <p class="text-[8px] font-mono font-bold text-emerald-500 mt-2">{{ currentMonthName }} {{ currentYear }}</p>
            </div>
          </div>

          <!-- Weekly Expenses -->
          <div class="kpi-card-hero group border-l-4 border-l-amber-500 cursor-pointer" @click="navigateTo('/dashboard/expenses/list?time=week')">
             <div class="absolute top-0 right-0 bg-amber-50 border-b border-l border-amber-100 px-2 py-0.5 text-[8px] font-mono font-bold text-amber-600 uppercase tracking-widest z-20">THIS WEEK</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-amber-600 bg-amber-50">
                <i class="fas fa-calendar-week text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display text-amber-700">{{ formatCurrencyShort(weeklyExpenses) }}</h3>
              <p class="kpi-label uppercase">Weekly Velocity</p>
              <p class="text-[8px] font-mono font-bold text-amber-500 mt-2">LAST_7_DAYS</p>
            </div>
          </div>

          <!-- Category Count -->
          <div class="kpi-card-hero group border-l-4 border-l-indigo-500 cursor-pointer" @click="navigateTo('/dashboard/expenses/reports')">
            <div class="absolute top-0 right-0 bg-indigo-50 border-b border-l border-indigo-100 px-2 py-0.5 text-[8px] font-mono font-bold text-indigo-600 uppercase tracking-widest z-20">CATEGORIES</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-indigo-600 bg-indigo-50">
                <i class="fas fa-tags text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display text-indigo-700">{{ categories.length }}</h3>
              <p class="kpi-label uppercase">Expense Domains</p>
              <p class="text-[8px] font-mono font-bold text-indigo-500 mt-2">DIVERSIFICATION</p>
            </div>
          </div>
        </div>

        <!-- Professional Charts -->
        <div v-if="showGraphs" class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-2 bg-white border border-gray-100 shadow-sm p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <i class="fas fa-chart-column text-[#2F2E8B]"></i>
                Spending Histogram
              </h3>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">{{ analyticsPeriodLabel }}</span>
            </div>
            <div style="position:relative;height:300px;width:100%;">
              <canvas ref="spendingHistogramCanvas"></canvas>
            </div>
          </div>

          <div class="bg-white border border-gray-100 shadow-sm p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <i class="fas fa-chart-pie text-[#2F2E8B]"></i>
                Category Pie Chart
              </h3>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Top Categories</span>
            </div>
            <div style="position:relative;height:300px;width:100%;">
              <canvas ref="categoryPieCanvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Main Content Area: 2/3 and 1/3 -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <!-- Column 1: Recent Expenses & Quick Actions -->
          <div class="xl:col-span-2 space-y-8">
            
            <!-- Quick Actions Grid -->
            <div>
              <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <i class="fas fa-bolt text-[#2F2E8B]"></i> TERMINAL_OPERATIONS
              </p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button v-for="action in quickActions" :key="action.label" 
                  @click="action.handler ? action.handler() : navigateTo(action.path)"
                  class="bg-white border border-gray-100 p-4 hover:border-[#2F2E8B] transition-all group relative overflow-hidden text-left"
                >
                  <div class="absolute inset-0 bg-dotted-pattern opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                  <div class="w-10 h-10 bg-gray-50 group-hover:bg-[#2F2E8B]/5 flex items-center justify-center mb-3 transition-colors">
                    <i :class="[action.icon, 'text-[#2F2E8B] text-sm group-hover:scale-110 transition-transform']"></i>
                  </div>
                  <p class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-wider mb-1">{{ action.label }}</p>
                  <p class="text-[8px] font-mono text-gray-400 uppercase">{{ action.desc }}</p>
                </button>
              </div>
            </div>

            <!-- Recent Expenses Table -->
            <div class="bg-white border border-gray-100 rounded-none overflow-hidden relative shadow-sm">
              <div class="absolute inset-0 bg-dotted-pattern pointer-events-none opacity-5"></div>
              <div class="px-6 py-4 border-b border-gray-50 flex justify-between items-center relative z-10">
                <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <span class="w-2 h-2 bg-[#2F2E8B]"></span> RECENT_LEDGER_ENTRIES
                </h3>
                <button @click="navigateTo('/dashboard/expenses/list')" class="text-[9px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-widest">VIEW_ALL</button>
              </div>
              
              <div class="overflow-x-auto relative z-10">
                <table class="w-full border-collapse">
                  <thead>
                    <tr class="bg-gray-50/50">
                      <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Entry UID</th>
                      <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Expense Item</th>
                      <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Category</th>
                      <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                      <th class="py-3 px-6 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-50">
                    <tr v-for="expense in recentExpenses" :key="expense.id" class="hover:bg-gray-50/80 transition-all group">
                      <td class="py-3 px-6 text-[9px] font-mono font-bold text-gray-400 uppercase">#{{ (expense.id || expense._id || '').slice(-6) }}</td>
                      <td class="py-3 px-6">
                        <div class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-tight group-hover:text-[#2F2E8B] transition-colors truncate max-w-[180px]">
                          {{ expense.name }}
                        </div>
                      </td>
                      <td class="py-3 px-6">
                        <span class="text-[8px] font-mono font-black px-2 py-0.5 border border-indigo-100 bg-indigo-50 text-indigo-600 uppercase tracking-tighter">
                          {{ expense.category }}
                        </span>
                      </td>
                      <td class="py-3 px-6 text-[10px] font-mono text-gray-500 tracking-tighter uppercase">{{ formatDate(expense.expense_date) }}</td>
                      <td class="py-3 px-6 text-right">
                        <div class="text-[11px] font-mono font-black text-gray-900">{{ formatWithSymbol(expense.amount) }}</div>
                      </td>
                    </tr>
                    <tr v-if="recentExpenses.length === 0">
                      <td colspan="5" class="py-12 text-center text-[10px] font-mono text-gray-300 uppercase italic">NO_RECENT_ENTRIES_FOUND</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Column 2: Breakdown & Stats -->
          <div class="space-y-8">
            <!-- Category Breakdown Sidebar -->
            <div class="bg-white border border-gray-100 p-6 shadow-sm relative overflow-hidden group">
              <div class="absolute inset-0 bg-dotted-pattern opacity-[0.03] pointer-events-none transition-opacity group-hover:opacity-[0.07]"></div>
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <i class="fas fa-pie-chart text-[#2F2E8B]"></i> SPENDING_PROFILE
              </h3>
              
              <div class="space-y-5">
                <div v-for="cat in categoryBreakdown" :key="cat.name" class="space-y-2">
                  <!-- Main Group Header -->
                  <div class="flex justify-between items-center">
                    <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-wider">{{ cat.name }}</span>
                    <span class="text-[10px] font-mono font-black text-gray-900">{{ formatWithSymbol(cat.amount) }}</span>
                  </div>
                  <div class="h-2 w-full bg-gray-50 rounded-none overflow-hidden border border-gray-100">
                    <div :style="{ width: cat.percent + '%' }" class="h-full bg-[#2F2E8B] transition-all duration-1000"></div>
                  </div>
                  <!-- Sub-categories -->
                  <div v-for="sub in cat.subs" :key="sub.name" class="pl-4 space-y-1 group/sub">
                    <div class="flex justify-between items-center">
                      <span class="text-[9px] font-mono font-bold text-gray-500 uppercase group-hover/sub:text-[#2F2E8B] transition-colors">{{ sub.name }}</span>
                      <span class="text-[9px] font-mono font-bold text-gray-600">{{ formatWithSymbol(sub.amount) }}</span>
                    </div>
                    <div class="h-1 w-full bg-gray-50 rounded-none overflow-hidden border border-gray-50">
                      <div :style="{ width: sub.percent + '%' }" class="h-full bg-[#2F2E8B]/40 transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-50">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">System Health</span>
                  <span class="text-[9px] font-mono font-bold text-emerald-600 uppercase">Operational</span>
                </div>
                <div class="h-1 w-full bg-emerald-100 rounded-none overflow-hidden">
                  <div class="h-full bg-emerald-500 w-[100%] animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Report Snapshot -->
            <div class="bg-[#2F2E8B] text-white p-6 shadow-xl relative overflow-hidden group">
              <div class="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform">
                <i class="fas fa-file-invoice-dollar text-6xl"></i>
              </div>
              <h3 class="text-[11px] font-mono font-black text-white/60 uppercase tracking-widest mb-4">Export Analysis</h3>
              <p class="text-xs font-mono mb-6 text-white/80 leading-relaxed italic">"Generate high-fidelity financial reports directly from your ledger data."</p>
              <button @click="navigateTo('/dashboard/expenses/reports')" class="w-full py-3 bg-white text-[#2F2E8B] text-[10px] font-mono font-black uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg shadow-black/20">
                OPEN_REPORT_BUILDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Expense Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" @click="closeAddModal"></div>
      <div class="bg-white w-full shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 border border-gray-100" :class="batchMode ? 'max-w-5xl' : 'max-w-lg'">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div class="flex items-center gap-4">
            <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <span class="w-2 h-2 bg-[#2F2E8B]"></span> {{ batchMode ? 'NEW_EXPENSE_BATCH' : 'NEW_EXPENSE_ENTRY' }}
            </h3>
            <div class="flex items-center bg-gray-200 rounded-sm overflow-hidden">
              <button @click="batchMode = false" class="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors" :class="!batchMode ? 'bg-[#2F2E8B] text-white' : 'text-gray-500 hover:bg-gray-300'">Single</button>
              <button @click="batchMode = true" class="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors" :class="batchMode ? 'bg-[#2F2E8B] text-white' : 'text-gray-500 hover:bg-gray-300'">Batch</button>
            </div>
          </div>
          <button @click="closeAddModal" class="text-gray-400 hover:text-red-500 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- SINGLE ENTRY MODE -->
        <template v-if="!batchMode">
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Expense Name</label>
              <input v-model="newExpense.name" type="text" class="w-full bg-gray-50 border-gray-200 text-[11px] font-mono focus:border-[#2F2E8B] focus:ring-0 placeholder:text-gray-300" placeholder="ENTER_DESCRIPTION">
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Amount</label>
                <div class="relative">
                  <span class="absolute left-3 top-2.5 text-xs text-gray-400 font-mono">{{ currencySymbol }}</span>
                  <input v-model="newExpense.amount" type="number" class="w-full bg-gray-50 border-gray-200 pl-8 text-[11px] font-mono focus:border-[#2F2E8B] focus:ring-0" placeholder="0.00">
                </div>
              </div>
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                <input v-model="newExpense.expense_date" type="date" class="w-full bg-gray-50 border-gray-200 text-[10px] font-mono focus:border-[#2F2E8B] focus:ring-0 text-gray-600 uppercase">
              </div>
            </div>

            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
              <select v-model="newExpense.category" class="w-full bg-gray-50 border-gray-200 text-[10px] font-mono focus:border-[#2F2E8B] focus:ring-0 text-gray-600 uppercase py-2">
                <option value="" disabled>SELECT_CATEGORY</option>
                <optgroup v-for="group in categoryGroups" :key="group.code" :label="group.label">
                  <option v-for="sub in group.children" :key="sub.code" :value="sub.label">{{ sub.code }} — {{ sub.label }}</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Description (Optional)</label>
              <textarea
                v-model="newExpense.description"
                rows="3"
                class="w-full bg-gray-50 border-gray-200 text-[11px] font-mono focus:border-[#2F2E8B] focus:ring-0 text-gray-700"
                placeholder="ADD_NOTES_OR_DETAILS"
              ></textarea>
            </div>

            <div>
               <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Branch (Optional)</label>
               <select v-model="selectedBranch" class="w-full bg-gray-50 border-gray-200 text-[10px] font-mono focus:border-[#2F2E8B] focus:ring-0 text-gray-600 uppercase py-2">
                  <option :value="null">All Branches / Global</option>
                  <option v-for="branch in branches" :key="branch.id" :value="branch">{{ branch.name }}</option>
               </select>
            </div>
          </div>
        </template>

        <!-- BATCH ENTRY MODE -->
        <template v-else>
          <div class="p-4 max-h-[55vh] overflow-y-auto custom-scrollbar">
            <div class="mb-2 flex items-center gap-4 px-3">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ batchEntries.length }} Entr{{ batchEntries.length === 1 ? 'y' : 'ies' }}</span>
              <span v-if="batchTotal > 0" class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Total: {{ currencySymbol }}{{ batchTotal.toLocaleString('en-ZM', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-gray-100 border-b border-gray-200">
                    <th class="px-2 py-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-wider w-6">#</th>
                    <th class="px-2 py-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-wider">Name</th>
                    <th class="px-2 py-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-wider w-24">Amount</th>
                    <th class="px-2 py-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-wider w-28">Date</th>
                    <th class="px-2 py-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-wider">Category</th>
                    <th class="px-2 py-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-wider">Description</th>
                    <th class="px-2 py-2 text-[8px] font-mono font-black text-gray-400 uppercase tracking-wider w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(entry, idx) in batchEntries" :key="idx" class="border-b border-gray-100 hover:bg-gray-50/50 group">
                    <td class="px-2 py-1.5 text-[9px] font-mono text-gray-400">{{ idx + 1 }}</td>
                    <td class="px-2 py-1.5">
                      <input v-model="entry.name" type="text" class="w-full bg-transparent border-none text-[10px] font-mono font-bold uppercase focus:ring-0 p-0 placeholder:text-gray-300" placeholder="NAME" />
                    </td>
                    <td class="px-2 py-1.5">
                      <input v-model.number="entry.amount" type="number" step="0.01" class="w-full bg-transparent border-none text-[10px] font-mono font-bold focus:ring-0 p-0 placeholder:text-gray-300" placeholder="0.00" />
                    </td>
                    <td class="px-2 py-1.5">
                      <input v-model="entry.expense_date" type="date" class="w-full bg-transparent border-none text-[9px] font-mono focus:ring-0 p-0 text-gray-600" />
                    </td>
                    <td class="px-2 py-1.5">
                      <select v-model="entry.category" class="w-full bg-transparent border-none text-[9px] font-mono focus:ring-0 p-0 uppercase text-gray-600">
                        <option value="" disabled>—</option>
                        <optgroup v-for="group in categoryGroups" :key="group.code" :label="group.label">
                          <option v-for="sub in group.children" :key="sub.code" :value="sub.label">{{ sub.code }} — {{ sub.label }}</option>
                        </optgroup>
                      </select>
                    </td>
                    <td class="px-2 py-1.5">
                      <input v-model="entry.description" type="text" class="w-full bg-transparent border-none text-[9px] font-mono focus:ring-0 p-0 placeholder:text-gray-300" placeholder="Optional" />
                    </td>
                    <td class="px-2 py-1.5 text-center">
                      <button v-if="batchEntries.length > 1" @click="removeBatchRow(idx)" class="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <i class="fas fa-times text-[10px]"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button @click="addBatchRow" class="mt-3 w-full py-2 border-2 border-dashed border-gray-200 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-colors flex items-center justify-center gap-1">
              <i class="fas fa-plus text-[8px]"></i> Add Row
            </button>
          </div>
        </template>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center gap-3">
          <button @click="closeAddModal" class="px-4 py-2 text-[10px] font-mono font-bold text-gray-500 uppercase hover:bg-gray-200 transition-colors">Cancel</button>
          <button @click="handleSaveExpense" :disabled="isSubmitting" class="px-6 py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-800 transition-colors disabled:opacity-50">
            <span v-if="isSubmitting"><i class="fas fa-spinner fa-spin mr-2"></i>SAVING...</span>
            <span v-else>{{ batchMode ? `SAVE ${batchEntries.length} ENTR${batchEntries.length === 1 ? 'Y' : 'IES'}` : 'CONFIRM_ENTRY' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Bulk Import Modal -->
    <div v-if="showImportModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" @click="showImportModal = false"></div>
      <div class="bg-white w-full max-w-2xl shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
            <span class="w-2 h-2 bg-[#2F2E8B]"></span> BULK_IMPORT_DATA
          </h3>
          <div class="flex items-center gap-4">
            <div v-if="importStep === 2" class="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-widest">
              Step 2: Map Fields
            </div>
            <button @click="showImportModal = false" class="text-gray-400 hover:text-red-500 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <!-- Step 1: Upload -->
        <div v-if="importStep === 1" class="p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#2F2E8B] mb-2">
            <i class="fas fa-cloud-upload-alt text-2xl"></i>
          </div>
          <h4 class="text-sm font-bold font-mono uppercase text-gray-900">Upload Expenses File</h4>
          <p class="text-[10px] font-mono text-gray-500 max-w-xs">Supported formats: .csv, .xlsx. Please ensure your file follows the standard template.</p>
          
          <label class="cursor-pointer group">
            <input type="file" @change="handleFileUpload" accept=".csv, .xlsx" class="hidden" />
            <div class="px-6 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-800 transition-all shadow-md group-hover:-translate-y-0.5">
              Choose File & Prepare
            </div>
          </label>
        </div>

        <!-- Step 2: Mapping -->
        <div v-if="importStep === 2" class="p-6 space-y-4">
          <div class="bg-amber-50 border border-amber-100 p-3 flex gap-3">
            <i class="fas fa-info-circle text-amber-600 mt-0.5"></i>
            <p class="text-[9px] font-mono text-amber-800 uppercase leading-relaxed">
              Match the columns from your file to the expense fields. Required fields are marked with (*).
            </p>
          </div>

          <div class="max-h-[400px] overflow-y-auto pr-2">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="field in expenseFields" :key="field.value" class="space-y-1.5 p-3 border border-gray-100 bg-gray-50/30">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block">
                  {{ field.label }} {{ field.required ? '*' : '' }}
                </label>
                <select 
                  v-model="importMapping[field.value]"
                  class="w-full text-[10px] font-mono border-gray-200 focus:border-blue-500 focus:ring-0 uppercase py-1.5"
                >
                  <option :value="undefined">--- SELECT COLUMN ---</option>
                  <option v-for="col in importFilePreview.columns" :key="col" :value="col">{{ col }}</option>
                </select>
                <div v-if="importMapping[field.value] && importFilePreview.rows.length > 0" class="text-[8px] font-mono text-gray-400 italic truncate">
                  Preview: {{ importFilePreview.rows[0][importMapping[field.value]] || 'Empty' }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-gray-100">
            <button 
              @click="importStep = 1" 
              class="text-[9px] font-mono font-bold text-gray-500 hover:text-gray-700 uppercase tracking-widest flex items-center gap-2"
            >
              <i class="fas fa-arrow-left"></i> Change File
            </button>
            <button 
              @click="startProcessingImport" 
              :disabled="importLoading || !isMappingValid"
              class="px-8 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-800 transition-all shadow-md disabled:opacity-50"
            >
              <i v-if="importLoading" class="fas fa-spinner animate-spin mr-2"></i>
              Start Import ({{ importFilePreview.total }} Rows)
            </button>
          </div>
        </div>

        <div v-if="importStep === 1" class="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-center">
            <a href="#" class="text-[9px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-wide">Download Template</a>
        </div>
      </div>
    </div>

    <!-- Reports Modal -->
    <div v-if="showReportsModal" class="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4">
      <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" @click="closeReportsModal"></div>

      <!-- Sheet: full-screen on mobile, capped card on desktop -->
      <div class="bg-white w-full sm:max-w-4xl relative z-10 flex flex-col
                  h-[95dvh] sm:h-auto sm:max-h-[92vh]
                  rounded-t-2xl sm:rounded-none
                  shadow-2xl border-t border-gray-200 sm:border sm:border-gray-100
                  animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">

        <!-- Header -->
        <div class="flex-none px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <!-- Mobile drag handle -->
          <div class="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full sm:hidden"></div>
          <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 mt-2 sm:mt-0">
            <span class="w-2 h-2 bg-[#2F2E8B] flex-none"></span> GENERATE_FINANCIAL_REPORT
          </h3>
          <button @click="closeReportsModal" class="flex-none w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded-full">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>

        <!-- Scrollable body -->
        <div class="flex-1 overflow-y-auto overscroll-contain">
          <div class="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

            <!-- Left: Config -->
            <div class="space-y-5 sm:space-y-6">

              <!-- Report Type -->
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Select Report Type</label>
                <div class="grid grid-cols-2 gap-3">
                  <button type="button" @click="reportType = 'summary'; resetReportPreview()"
                    :class="['py-4 sm:py-3 px-3 border flex flex-col items-center justify-center gap-1.5 transition-colors active:scale-[0.97]',
                      reportType === 'summary' ? 'border-[#2F2E8B] bg-blue-50 text-[#2F2E8B]' : 'border-gray-200 bg-white text-gray-500']">
                    <i class="fas fa-chart-pie text-lg sm:text-base"></i>
                    <span class="text-[9px] font-mono font-bold uppercase">Expense Summary</span>
                  </button>
                  <button type="button" @click="reportType = 'detailed'; resetReportPreview()"
                    :class="['py-4 sm:py-3 px-3 border flex flex-col items-center justify-center gap-1.5 transition-colors active:scale-[0.97]',
                      reportType === 'detailed' ? 'border-[#2F2E8B] bg-blue-50 text-[#2F2E8B]' : 'border-gray-200 bg-white text-gray-500']">
                    <i class="fas fa-list-ol text-lg sm:text-base"></i>
                    <span class="text-[9px] font-mono font-bold uppercase">Detailed Ledger</span>
                  </button>
                </div>
              </div>

              <!-- Date Range -->
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Reporting Period</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <span class="block text-[8px] font-mono text-gray-400 mb-1 uppercase">Start Date</span>
                    <input v-model="reportStartDate" type="date"
                      class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 sm:py-1.5 text-[11px] sm:text-[10px] font-mono focus:border-[#2F2E8B] focus:outline-none text-gray-700 rounded-none">
                  </div>
                  <div>
                    <span class="block text-[8px] font-mono text-gray-400 mb-1 uppercase">End Date</span>
                    <input v-model="reportEndDate" type="date"
                      class="w-full bg-gray-50 border border-gray-200 px-3 py-2.5 sm:py-1.5 text-[11px] sm:text-[10px] font-mono focus:border-[#2F2E8B] focus:outline-none text-gray-700 rounded-none">
                  </div>
                </div>
                <p v-if="reportError" class="mt-2 text-[10px] font-mono font-bold text-red-600 uppercase tracking-wider">{{ reportError }}</p>
              </div>

              <!-- Output Format -->
              <div>
                <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Output Format</label>
                <div class="grid grid-cols-2 gap-3">
                  <label :class="['flex items-center gap-3 cursor-pointer border p-3 sm:p-2.5 transition-colors',
                    reportFormat === 'pdf' ? 'border-[#2F2E8B] bg-blue-50' : 'border-gray-200 bg-white']">
                    <input v-model="reportFormat" type="radio" value="pdf" name="format" class="text-[#2F2E8B] focus:ring-[#2F2E8B] w-4 h-4">
                    <div>
                      <span class="block text-[10px] font-mono font-bold text-gray-800 uppercase">PDF</span>
                      <span class="block text-[8px] font-mono text-gray-400 uppercase hidden sm:block">Document</span>
                    </div>
                  </label>
                  <label :class="['flex items-center gap-3 cursor-pointer border p-3 sm:p-2.5 transition-colors',
                    reportFormat === 'excel' ? 'border-[#2F2E8B] bg-blue-50' : 'border-gray-200 bg-white']">
                    <input v-model="reportFormat" type="radio" value="excel" name="format" class="text-[#2F2E8B] focus:ring-[#2F2E8B] w-4 h-4">
                    <div>
                      <span class="block text-[10px] font-mono font-bold text-gray-800 uppercase">Excel</span>
                      <span class="block text-[8px] font-mono text-gray-400 uppercase hidden sm:block">Spreadsheet</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Preview Button (mobile-first placement) -->
              <button @click="previewReport" :disabled="isExportingReport"
                class="w-full sm:hidden py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]">
                <i class="fas fa-eye"></i> Preview Report
              </button>
            </div>

            <!-- Right: Preview -->
            <div class="space-y-3 sm:space-y-4">
              <!-- Stats card -->
              <div class="border border-gray-100 bg-gray-50/40 p-3 sm:p-4">
                <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <i class="fas fa-eye text-[#2F2E8B]"></i> Report Preview
                </h4>
                <div class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] font-mono text-gray-600">
                  <div class="flex flex-col"><span class="text-[8px] uppercase tracking-wider text-gray-400">Type</span><span class="font-bold text-gray-900">{{ reportType === 'summary' ? 'SUMMARY' : 'DETAILED' }}</span></div>
                  <div class="flex flex-col"><span class="text-[8px] uppercase tracking-wider text-gray-400">Records</span><span class="font-bold text-gray-900">{{ reportPreviewCount }}</span></div>
                  <div class="flex flex-col col-span-2"><span class="text-[8px] uppercase tracking-wider text-gray-400">Range</span><span class="font-bold text-gray-900 text-[9px]">{{ reportStartDate || '—' }} → {{ reportEndDate || '—' }}</span></div>
                  <div class="flex flex-col col-span-2"><span class="text-[8px] uppercase tracking-wider text-gray-400">Total</span><span class="font-bold text-gray-900 text-sm">{{ formatCurrency(reportPreviewTotal) }}</span></div>
                </div>
              </div>

              <!-- Preview data table -->
              <div v-if="reportPreviewReady" class="border border-gray-100">
                <div class="px-3 sm:px-4 py-2.5 bg-white border-b border-gray-100 text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Preview Data</div>
                <div class="max-h-[240px] sm:max-h-[300px] overflow-auto bg-white">

                  <!-- Summary table -->
                  <template v-if="reportType === 'summary'">
                    <table class="w-full border-collapse">
                      <thead>
                        <tr class="bg-gray-50 sticky top-0">
                          <th class="py-2 px-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Category</th>
                          <th class="py-2 px-3 text-right text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Amount</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-50">
                        <tr v-for="row in reportSummaryByCategory" :key="row.category">
                          <td class="py-2.5 px-3 text-[10px] font-mono text-gray-700 uppercase">{{ row.category }}</td>
                          <td class="py-2.5 px-3 text-right text-[10px] font-mono font-black text-gray-900">{{ formatCurrency(row.amount) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </template>

                  <!-- Detailed — card list on mobile, table on sm+ -->
                  <template v-else>
                    <!-- Mobile cards -->
                    <div class="sm:hidden divide-y divide-gray-50">
                      <div v-for="row in reportPreviewRows" :key="row.id || row._id" class="px-3 py-2.5 space-y-0.5">
                        <div class="flex items-start justify-between gap-2">
                          <span class="text-[10px] font-mono font-bold text-gray-900 uppercase leading-tight">{{ row.name }}</span>
                          <span class="text-[10px] font-mono font-black text-[#2F2E8B] flex-none">{{ formatCurrency(row.amount) }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-[9px] font-mono text-gray-400 uppercase">{{ (row.expense_date || '').slice(0, 10) }}</span>
                          <span class="text-gray-300">·</span>
                          <span class="text-[9px] font-mono text-gray-500 uppercase">{{ row.category }}</span>
                        </div>
                        <p v-if="row.description" class="text-[9px] font-mono text-gray-400 truncate">{{ row.description }}</p>
                      </div>
                    </div>
                    <!-- Desktop table -->
                    <div class="hidden sm:block overflow-x-auto">
                      <table class="border-collapse" style="min-width:520px; width:100%">
                        <thead>
                          <tr class="bg-gray-50 sticky top-0">
                            <th class="py-2 px-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Date</th>
                            <th class="py-2 px-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Name</th>
                            <th class="py-2 px-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Category</th>
                            <th class="py-2 px-3 text-right text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Amount</th>
                            <th class="py-2 px-3 text-left text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Desc.</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                          <tr v-for="row in reportPreviewRows" :key="row.id || row._id" class="hover:bg-gray-50/50">
                            <td class="py-2 px-3 text-[10px] font-mono text-gray-600 uppercase whitespace-nowrap">{{ (row.expense_date || '').slice(0, 10) }}</td>
                            <td class="py-2 px-3 text-[10px] font-mono font-bold text-gray-900 uppercase">{{ row.name }}</td>
                            <td class="py-2 px-3 text-[10px] font-mono text-gray-700 uppercase whitespace-nowrap">{{ row.category }}</td>
                            <td class="py-2 px-3 text-right text-[10px] font-mono font-black text-gray-900 whitespace-nowrap">{{ formatCurrency(row.amount) }}</td>
                            <td class="py-2 px-3 text-[10px] font-mono text-gray-500 max-w-[120px] truncate">{{ row.description || '—' }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </template>
                </div>
              </div>

              <div v-else class="border border-dashed border-gray-200 py-8 bg-white text-center text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest">NO_PREVIEW_YET</div>
            </div>
          </div>
        </div>

        <!-- Footer actions -->
        <div class="flex-none px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
          <button @click="closeReportsModal" class="order-last sm:order-first px-4 py-2.5 sm:py-2 text-[10px] font-mono font-bold text-gray-500 uppercase hover:bg-gray-200 transition-colors text-center">
            Close
          </button>
          <div class="flex gap-2 sm:gap-3">
            <button @click="previewReport" :disabled="isExportingReport"
              class="hidden sm:flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-5 py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-800 transition-colors disabled:opacity-50">
              <i class="fas fa-eye"></i> Preview
            </button>
            <button @click="exportReport" :disabled="!reportPreviewReady || isExportingReport"
              class="flex flex-1 sm:flex-none items-center justify-center gap-1.5 px-5 py-3 sm:py-2 bg-emerald-600 text-white text-[10px] font-mono font-bold uppercase hover:bg-emerald-700 transition-colors disabled:opacity-50 active:scale-[0.98]">
              <i :class="isExportingReport ? 'fas fa-spinner fa-spin' : 'fas fa-download'"></i>
              {{ isExportingReport ? 'Exporting…' : `Export ${reportFormat.toUpperCase()}` }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .bg-dotted-pattern { background-image: radial-gradient(#2F2E8B 0.5px, transparent 0.5px); background-size: 8px 8px; }
</style>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import { useCurrency } from '@/composables/useCurrency.js';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import { useExpenses } from '@/views/dashboardModules/functions/useExpenses.js';
import { useAudit } from '@/config/useAudit.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Chart from 'chart.js/auto';

const router = useRouter();
const route = useRoute();

// UI visibility controls are declared early so template bindings are always available.
const showKpis = ref(true);
const showGraphs = ref(true);

const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getToken, getUserRole, getUserEmail } = decodeJWT();
const { formatCurrency, formatCurrencyCompact, currencySymbol } = useCurrency();
const { logAudit } = useAudit();

// Use the expenses composable
const {
  expenses,
  loading,
  fetchExpenses,
  calculateTotalExpenses,
  calculateMonthlyExpenses,
  calculateWeeklyExpenses,
  categories,
  categoryGroups,
  getCategoryGroup,
  newExpense,
  createExpense,
  isSubmitting,
  branches,
  selectedBranch,
  uploadBulkFile,
  processBulkImport
} = useExpenses();

// Derived state for template
const rawExpenses = computed(() => expenses.value);
const totalExpenses = computed(() => calculateTotalExpenses());
const monthlyExpenses = computed(() => calculateMonthlyExpenses());
const weeklyExpenses = computed(() => calculateWeeklyExpenses());
const currentYear = new Date().getFullYear();

// Helper formatters
const formatCurrencyShort = (val) => formatCurrencyCompact ? formatCurrencyCompact(val) : formatCurrency(val);
const formatWithSymbol = (val) => formatCurrency(val);
const refreshData = () => fetchExpenses();

// Activity Tracker
try {
  useActivityTracker({ userId: getUserEmail?.(), tenantId: getTenantId?.(), module: 'expenses-dashboard' });
} catch (err) {
  console.warn('useActivityTracker init skipped:', err);
}

// Modal States
const showAddModal = ref(false);
const batchMode = ref(false);
const showImportModal = ref(false);
const showReportsModal = ref(false);

const emptyBatchEntry = () => ({
  name: '',
  amount: 0,
  category: '',
  expense_date: new Date().toISOString().split('T')[0],
  description: ''
});
const batchEntries = ref([emptyBatchEntry()]);

const batchTotal = computed(() => batchEntries.value.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0));

function addBatchRow() {
  batchEntries.value.push(emptyBatchEntry());
}

function removeBatchRow(idx) {
  if (batchEntries.value.length > 1) batchEntries.value.splice(idx, 1);
}

function resetBatchEntries() {
  batchEntries.value = [emptyBatchEntry()];
  batchMode.value = false;
}

// Import mapping state
const importStep = ref(1); // 1: Upload, 2: Mapping
const importFilePreview = ref({
  columns: [],
  rows: [],
  total: 0
});
const importMapping = ref({});
const importLoading = ref(false);

const expenseFields = [
  { label: 'Expense Name', value: 'name', required: true },
  { label: 'Amount', value: 'amount', required: true },
  { label: 'Category', value: 'category', required: true },
  { label: 'Expense Date', value: 'expense_date', required: true },
  { label: 'Description', value: 'description', required: false },
  { label: 'Branch ID', value: 'branch_id', required: false }
];

// Reports state
const reportType = ref('summary'); // 'summary' | 'detailed'
const reportStartDate = ref('');
const reportEndDate = ref('');
const reportFormat = ref('pdf'); // 'pdf' | 'excel'
const reportPreviewReady = ref(false);
const reportPreviewRows = ref([]);
const reportSummaryByCategory = ref([]);
const reportError = ref('');
const isExportingReport = ref(false);

const reportPreviewCount = computed(() => {
  if (!reportPreviewReady.value) return 0;
  return reportType.value === 'summary' ? reportSummaryByCategory.value.length : reportPreviewRows.value.length;
});

const reportPreviewTotal = computed(() => {
  if (!reportPreviewReady.value) return 0;
  if (reportType.value === 'summary') {
    return reportSummaryByCategory.value.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  }
  return reportPreviewRows.value.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
});

const currentMonthName = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();

// Dashboard analytics controls
const formatDateInput = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const analyticsPeriod = ref('month'); // week | month | quarter | year | custom
const analyticsCustomStartDate = ref(formatDateInput(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
const analyticsCustomEndDate = ref(formatDateInput(new Date()));
const analyticsPeriodLabel = computed(() => {
  if (analyticsPeriod.value === 'week') return 'By Day (Last 7 Days)';
  if (analyticsPeriod.value === 'quarter') return 'By Month (Current Quarter)';
  if (analyticsPeriod.value === 'year') return 'By Month (Last 12 Months)';
  if (analyticsPeriod.value === 'custom') return `Custom (${analyticsCustomStartDate.value} to ${analyticsCustomEndDate.value})`;
  return 'By Week (Current Month)';
});

const analyticsFilteredExpenses = computed(() => {
  const now = new Date();
  const rows = expenses.value || [];
  const getRowDate = (e) => new Date(e.expense_date || e.created_at || e.date || 0);

  if (analyticsPeriod.value === 'week') {
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return rows.filter((e) => {
      const d = getRowDate(e);
      return !Number.isNaN(d.getTime()) && d >= start;
    });
  }

  if (analyticsPeriod.value === 'quarter') {
    const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
    const start = new Date(now.getFullYear(), quarterStartMonth, 1);
    return rows.filter((e) => {
      const d = getRowDate(e);
      return !Number.isNaN(d.getTime()) && d >= start;
    });
  }

  if (analyticsPeriod.value === 'year') {
    const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    return rows.filter((e) => {
      const d = getRowDate(e);
      return !Number.isNaN(d.getTime()) && d >= start;
    });
  }

  if (analyticsPeriod.value === 'custom') {
    const startRaw = analyticsCustomStartDate.value ? new Date(`${analyticsCustomStartDate.value}T00:00:00`) : null;
    const endRaw = analyticsCustomEndDate.value ? new Date(`${analyticsCustomEndDate.value}T23:59:59`) : null;
    const start = startRaw && endRaw ? (startRaw <= endRaw ? startRaw : endRaw) : startRaw;
    const end = startRaw && endRaw ? (startRaw <= endRaw ? endRaw : startRaw) : endRaw;
    return rows.filter((e) => {
      const d = getRowDate(e);
      if (Number.isNaN(d.getTime())) return false;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
  }

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return rows.filter((e) => {
    const d = getRowDate(e);
    return !Number.isNaN(d.getTime()) && d >= monthStart;
  });
});

const analyticsPeriodTotal = computed(() =>
  analyticsFilteredExpenses.value.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
);

const histogramSeries = computed(() => {
  const now = new Date();
  const grouped = new Map();

  if (analyticsPeriod.value === 'week') {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      grouped.set(key, 0);
    }
    analyticsFilteredExpenses.value.forEach((e) => {
      const d = new Date(e.expense_date || e.created_at || e.date || 0);
      if (Number.isNaN(d.getTime())) return;
      const key = d.toISOString().slice(0, 10);
      if (grouped.has(key)) grouped.set(key, grouped.get(key) + (Number(e.amount) || 0));
    });
    const labels = [...grouped.keys()].map((k) => {
      const d = new Date(k);
      return d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    });
    return { labels, values: [...grouped.values()] };
  }

  if (analyticsPeriod.value === 'year') {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      grouped.set(key, 0);
    }
    analyticsFilteredExpenses.value.forEach((e) => {
      const d = new Date(e.expense_date || e.created_at || e.date || 0);
      if (Number.isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (grouped.has(key)) grouped.set(key, grouped.get(key) + (Number(e.amount) || 0));
    });
    const labels = [...grouped.keys()].map((k) => {
      const [year, month] = k.split('-').map(Number);
      const d = new Date(year, month - 1, 1);
      return d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    });
    return { labels, values: [...grouped.values()] };
  }

  if (analyticsPeriod.value === 'quarter') {
    const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
    for (let i = 0; i < 3; i++) {
      const d = new Date(now.getFullYear(), quarterStartMonth + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      grouped.set(key, 0);
    }
    analyticsFilteredExpenses.value.forEach((e) => {
      const d = new Date(e.expense_date || e.created_at || e.date || 0);
      if (Number.isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (grouped.has(key)) grouped.set(key, grouped.get(key) + (Number(e.amount) || 0));
    });
    const labels = [...grouped.keys()].map((k) => {
      const [year, month] = k.split('-').map(Number);
      const d = new Date(year, month - 1, 1);
      return d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    });
    return { labels, values: [...grouped.values()] };
  }

  if (analyticsPeriod.value === 'custom') {
    analyticsFilteredExpenses.value.forEach((e) => {
      const d = new Date(e.expense_date || e.created_at || e.date || 0);
      if (Number.isNaN(d.getTime())) return;
      const key = d.toISOString().slice(0, 10);
      grouped.set(key, (grouped.get(key) || 0) + (Number(e.amount) || 0));
    });
    const sortedKeys = [...grouped.keys()].sort();
    const labels = sortedKeys.map((k) => {
      const d = new Date(k);
      return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase();
    });
    const values = sortedKeys.map((k) => grouped.get(k));
    return { labels, values };
  }

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const weekCount = Math.ceil(monthEnd.getDate() / 7);
  for (let i = 1; i <= weekCount; i++) grouped.set(`W${i}`, 0);
  analyticsFilteredExpenses.value.forEach((e) => {
    const d = new Date(e.expense_date || e.created_at || e.date || 0);
    if (Number.isNaN(d.getTime()) || d < monthStart || d > monthEnd) return;
    const wk = `W${Math.ceil(d.getDate() / 7)}`;
    grouped.set(wk, (grouped.get(wk) || 0) + (Number(e.amount) || 0));
  });
  return { labels: [...grouped.keys()], values: [...grouped.values()] };
});

const pieSeries = computed(() => {
  const totals = {};
  analyticsFilteredExpenses.value.forEach((e) => {
    const cat = (e.category || 'Uncategorized').toString();
    totals[cat] = (totals[cat] || 0) + (Number(e.amount) || 0);
  });
  const sorted = Object.entries(totals)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 7);
  return {
    labels: sorted.map((x) => x.name.toUpperCase()),
    values: sorted.map((x) => x.amount)
  };
});

const spendingHistogramCanvas = ref(null);
const categoryPieCanvas = ref(null);
let spendingHistogramChart = null;
let categoryPieChart = null;

const chartPalette = ['#2F2E8B', '#4F46E5', '#0EA5E9', '#14B8A6', '#10B981', '#F59E0B', '#EF4444'];

const destroyCharts = () => {
  if (spendingHistogramChart) {
    spendingHistogramChart.destroy();
    spendingHistogramChart = null;
  }
  if (categoryPieChart) {
    categoryPieChart.destroy();
    categoryPieChart = null;
  }
};

const renderAnalyticsCharts = async () => {
  if (!showGraphs.value) {
    destroyCharts();
    return;
  }

  await nextTick();
  if (!spendingHistogramCanvas.value || !categoryPieCanvas.value) return;
  destroyCharts();

  spendingHistogramChart = new Chart(spendingHistogramCanvas.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: histogramSeries.value.labels,
      datasets: [{
        label: 'Spending',
        data: histogramSeries.value.values,
        backgroundColor: '#2F2E8B',
        borderRadius: 2,
        maxBarThickness: 36
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => formatCurrency(ctx.parsed.y || 0)
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10, family: 'monospace' } } },
        y: {
          beginAtZero: true,
          ticks: {
            font: { size: 10, family: 'monospace' },
            callback: (v) => formatCurrencyCompact ? formatCurrencyCompact(v) : formatCurrency(v)
          },
          grid: { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });

  categoryPieChart = new Chart(categoryPieCanvas.value.getContext('2d'), {
    type: 'pie',
    data: {
      labels: pieSeries.value.labels,
      datasets: [{
        data: pieSeries.value.values,
        backgroundColor: pieSeries.value.labels.map((_, i) => chartPalette[i % chartPalette.length]),
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 10, family: 'monospace' } }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${formatCurrency(ctx.parsed || 0)}`
          }
        }
      }
    }
  });
};

const isMappingValid = computed(() => {
  return expenseFields
    .filter(f => f.required)
    .every(f => importMapping.value[f.value] !== undefined);
});

const quickActions = [
  { label: 'Add Expense', desc: 'Record new entry', icon: 'fas fa-plus-circle', handler: () => showAddModal.value = true },
  { label: 'View All', desc: 'Browse ledger', icon: 'fas fa-list', path: '/dashboard/expenses/list' },
  { label: 'Fixed Costs', desc: 'Recurring configs', icon: 'fas fa-calendar-check', path: '/dashboard/expenses/fixed-costs' },
  { label: 'Reports', desc: 'Generate analysis', icon: 'fas fa-chart-bar', handler: () => showReportsModal.value = true },
  { label: 'Bulk Import', desc: 'Upload CSV/Excel', icon: 'fas fa-file-upload', handler: () => showImportModal.value = true },
];

const recentExpenses = computed(() => {
  return [...expenses.value].sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date)).slice(0, 10);
});

const categoryBreakdown = computed(() => {
  // Group by the 3 main account groups
  const groupTotals = {};
  expenses.value.forEach(e => {
    const group = getCategoryGroup(e.category || 'Uncategorized');
    if (!groupTotals[group]) groupTotals[group] = { amount: 0, subs: {} };
    groupTotals[group].amount += (Number(e.amount) || 0);
    const sub = e.category || 'Uncategorized';
    groupTotals[group].subs[sub] = (groupTotals[group].subs[sub] || 0) + (Number(e.amount) || 0);
  });
  const total = calculateTotalExpenses() || 1;
  return Object.entries(groupTotals)
    .map(([name, data]) => ({
      name,
      amount: data.amount,
      percent: Math.min(100, (data.amount / total) * 100),
      subs: Object.entries(data.subs)
        .map(([subName, subAmount]) => ({ name: subName, amount: subAmount, percent: Math.min(100, (subAmount / total) * 100) }))
        .sort((a, b) => b.amount - a.amount)
    }))
    .sort((a, b) => b.amount - a.amount);
});

const navigateTo = (path) => router.push(path);
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-ZM', { day: '2-digit', month: 'short', year: '2-digit' }).toUpperCase();
};

const resetReportPreview = () => {
  reportPreviewReady.value = false;
  reportPreviewRows.value = [];
  reportSummaryByCategory.value = [];
  reportError.value = '';
};

const closeReportsModal = async () => {
  showReportsModal.value = false;
  resetReportPreview();
  if (route.query.open === 'reports') {
    const nextQuery = { ...route.query };
    delete nextQuery.open;
    await router.replace({ query: nextQuery });
  }
};

const closeAddModal = async () => {
  showAddModal.value = false;
  resetBatchEntries();
  if (route.query.open === 'add') {
    const nextQuery = { ...route.query };
    delete nextQuery.open;
    await router.replace({ query: nextQuery });
  }
};

const handleSaveExpense = async () => {
  if (batchMode.value) {
    // Batch mode: submit each entry one by one
    const validEntries = batchEntries.value.filter(e => e.name.trim() && e.category);
    if (validEntries.length === 0) {
      alert('Please fill in at least one entry with a name and category.');
      return;
    }

    isSubmitting.value = true;
    let savedCount = 0;
    const errors = [];

    for (const entry of validEntries) {
      try {
        const expenseData = {
          name: entry.name.trim(),
          amount: Number(entry.amount) || 0,
          category: entry.category.trim(),
          expense_date: entry.expense_date,
          description: entry.description?.trim() || '',
          branch_id: (() => {
            let bId = null;
            if (selectedBranch.value) {
              bId = selectedBranch.value.id || selectedBranch.value._id;
            }
            if (!bId) {
              const userRole = getUserRole();
              if (!['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase())) {
                bId = getBranchId();
              }
            }
            return bId;
          })()
        };

        const url = new URL(`${API_BASE_URL}/expenses/`);
        url.searchParams.append('tenant_id', getTenantId());

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(expenseData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.detail || `HTTP ${response.status}`);
        }

        const created = await response.json();
        expenses.value.unshift(created);
        await logAudit('create', 'expenses', { resource_type: 'expense', label: expenseData.name, amount: expenseData.amount, category: expenseData.category });
        savedCount++;
      } catch (err) {
        errors.push(`${entry.name || 'Unnamed'}: ${err.message}`);
      }
    }

    isSubmitting.value = false;

    if (savedCount > 0) {
      await fetchExpenses();
    }
    if (errors.length > 0) {
      alert(`${savedCount} saved successfully.\n${errors.length} failed:\n${errors.join('\n')}`);
    }
    if (savedCount > 0 && errors.length === 0) {
      await closeAddModal();
    }
  } else {
    // Single entry mode — use existing createExpense
    await createExpense();
    await closeAddModal();
  }
};

const validateReportInputs = () => {
  reportError.value = '';
  if (!reportStartDate.value || !reportEndDate.value) {
    reportError.value = 'SELECT_START_AND_END_DATE';
    return false;
  }
  if (reportStartDate.value > reportEndDate.value) {
    reportError.value = 'START_DATE_MUST_BE_BEFORE_END_DATE';
    return false;
  }
  return true;
};

const getFilteredExpensesForReport = () => {
  const start = reportStartDate.value;
  const end = reportEndDate.value;
  return (expenses.value || [])
    .filter(e => {
      const d = (e.expense_date || '').slice(0, 10);
      if (!d) return false;
      return d >= start && d <= end;
    })
    .sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date));
};

const previewReport = () => {
  resetReportPreview();
  if (!validateReportInputs()) return;

  const data = getFilteredExpensesForReport();
  if (reportType.value === 'summary') {
    const totals = {};
    data.forEach(e => {
      const cat = e.category || 'Uncategorized';
      totals[cat] = (totals[cat] || 0) + (Number(e.amount) || 0);
    });
    reportSummaryByCategory.value = Object.entries(totals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  } else {
    reportPreviewRows.value = data;
  }
  reportPreviewReady.value = true;
};

// ─── Tenant Details ──────────────────────────────────────────────────────────
const tenantDetails = ref({});

const _hexToRgb = (hex) => {
  if (!hex || hex[0] !== '#') return [47, 46, 139];
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
};

const _loadImage = (url) => new Promise((resolve) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    } catch { resolve(null); }
  };
  img.onerror = () => resolve(null);
  img.src = url;
});

const fetchTenantDetails = async () => {
  try {
    const tenantId = getTenantId();
    if (!tenantId) return;
    let data = null;
    try {
      const res = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${tenantId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (res.ok) data = await res.json();
    } catch {}
    if (!data) {
      try {
        const res2 = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${tenantId}`, {
          headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (res2.ok) data = await res2.json();
      } catch {}
    }
    if (data) tenantDetails.value = data.tenant || data;
  } catch (err) {
    console.error('Error fetching tenant details:', err);
  }
};

// ─── Export Report ────────────────────────────────────────────────────────────
const exportReport = async () => {
  if (!reportPreviewReady.value) return;
  isExportingReport.value = true;
  try {
    const baseName = `Expenses_${reportType.value}_${reportStartDate.value}_to_${reportEndDate.value}`;
    const td = tenantDetails.value;
    const brand = [47, 46, 139]; // #2F2E8B
    const companyName = (
      td.company_name || td.companyName || td.businessName || td.business_name ||
      td.trading_name || td.tradingName || td.name || 'YOUR COMPANY'
    );
    const companyEmail = td.email || td.owner_email || td.contact_email || '';
    const companyPhone = td.phone_number || td.phone || td.contact_phone || '';
    const companyAddress = td.address || td.location || '';
    const companyCity = td.city || '';
    const companyCountry = td.country || '';
    const companyTpin = td.tpin || td.TPIN || '';
    const companyLogo = td.company_logo || td.logo || '';

    // ── EXCEL ──────────────────────────────────────────────────────────────────
    if (reportFormat.value === 'excel') {
      const wb = XLSX.utils.book_new();
      const locationParts = [companyAddress, companyCity, companyCountry].filter(Boolean);
      const meta = [
        [companyName.toUpperCase()],
        [''],
        ['COMPANY INFORMATION'],
        ['Business Name:', companyName],
        ...(locationParts.length ? [['Address:', locationParts.join(', ')]] : []),
        ...(companyPhone ? [['Phone:', companyPhone]] : []),
        ...(companyEmail ? [['Email:', companyEmail]] : []),
        ...(companyTpin ? [['TPIN:', companyTpin]] : []),
        [''],
        ['REPORT INFORMATION'],
        ['Report Type:', reportType.value.toUpperCase()],
        ['Period:', `${reportStartDate.value}  to  ${reportEndDate.value}`],
        ['Total Records:', reportPreviewCount.value],
        ['Total Amount:', formatCurrency(reportPreviewTotal.value)],
        ['Generated On:', new Date().toLocaleString()],
        [''],
        ['DATA'],
        ['']
      ];
      const dataOrigin = `A${meta.length + 1}`;

      if (reportType.value === 'summary') {
        const rows = reportSummaryByCategory.value.map(r => ({
          CATEGORY: r.category,
          AMOUNT: Number(r.amount) || 0
        }));
        const ws = XLSX.utils.json_to_sheet(rows, { origin: dataOrigin });
        XLSX.utils.sheet_add_aoa(ws, meta, { origin: 'A1' });
        ws['!cols'] = [{ width: 40 }, { width: 22 }];
        XLSX.utils.book_append_sheet(wb, ws, 'Summary');
      } else {
        const rows = reportPreviewRows.value.map(r => ({
          DATE: (r.expense_date || '').slice(0, 10),
          NAME: r.name || '',
          CATEGORY: r.category || '',
          AMOUNT: Number(r.amount) || 0,
          DESCRIPTION: r.description || ''
        }));
        const ws = XLSX.utils.json_to_sheet(rows, { origin: dataOrigin });
        XLSX.utils.sheet_add_aoa(ws, meta, { origin: 'A1' });
        ws['!cols'] = [{ width: 16 }, { width: 35 }, { width: 22 }, { width: 18 }, { width: 45 }];
        XLSX.utils.book_append_sheet(wb, ws, 'Ledger');
      }

      const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([buf], { type: 'application/octet-stream' }), `${baseName}.xlsx`);
      return;
    }

    // ── PDF ────────────────────────────────────────────────────────────────────
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentW = pageW - margin * 2;

    // 1. Header band
    doc.setFillColor(brand[0], brand[1], brand[2]);
    doc.rect(0, 0, pageW, 32, 'F');

    // 2. Company logo (top-left inside band)
    let logoLoaded = false;
    if (companyLogo) {
      const b64 = await _loadImage(companyLogo);
      if (b64) {
        try { doc.addImage(b64, 'PNG', margin, 6, 20, 20, undefined, 'FAST'); logoLoaded = true; } catch {}
      }
    }

    // 3. Company name in header band (right-aligned)
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    const nameX = logoLoaded ? pageW - margin : pageW - margin;
    doc.text(companyName.toUpperCase(), nameX, 14, { align: 'right' });

    // 4. Sub-line: email | phone
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 205, 230);
    const subParts = [companyEmail, companyPhone].filter(Boolean);
    if (subParts.length) doc.text(subParts.join('  |  '), pageW - margin, 21, { align: 'right' });
    const addrParts = [companyAddress, companyCity, companyCountry].filter(Boolean);
    if (addrParts.length) doc.text(addrParts.join(', '), pageW - margin, 27, { align: 'right' });

    let y = 42;

    // 5. Report Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text('EXPENSE REPORT', margin, y);
    y += 2;
    doc.setDrawColor(brand[0], brand[1], brand[2]);
    doc.setLineWidth(0.7);
    doc.line(margin, y, margin + 65, y);
    y += 8;

    // 6. Meta info grid: left = report info, right = company details
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    const leftMeta = [
      ['Report Type:', reportType.value.toUpperCase()],
      ['Period:', `${reportStartDate.value}  –  ${reportEndDate.value}`],
      ['Generated:', new Date().toLocaleString()],
    ];
    const startY = y;
    leftMeta.forEach(([label, val]) => {
      doc.setFont('helvetica', 'bold'); doc.text(label, margin, y);
      doc.setFont('helvetica', 'normal'); doc.text(val, margin + 26, y);
      y += 6;
    });

    // Right column: tenant address / TPIN
    const midX = pageW / 2 + 5;
    let ry = startY;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text('COMPANY DETAILS', midX, ry); ry += 5.5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    if (companyAddress) { doc.text(companyAddress, midX, ry); ry += 5; }
    if (companyCity || companyCountry) { doc.text([companyCity, companyCountry].filter(Boolean).join(', '), midX, ry); ry += 5; }
    if (companyPhone) { doc.text(`Tel: ${companyPhone}`, midX, ry); ry += 5; }
    if (companyEmail) { doc.text(`Email: ${companyEmail}`, midX, ry); ry += 5; }
    if (companyTpin) { doc.text(`TPIN: ${companyTpin}`, midX, ry); ry += 5; }

    y = Math.max(y, ry) + 4;

    // 7. Summary bar
    doc.setFillColor(240, 241, 252);
    doc.setDrawColor(210, 212, 240);
    doc.setLineWidth(0.4);
    doc.rect(margin, y, contentW, 16, 'FD');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text('SUMMARY', margin + 3, y + 6);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(`Records: ${reportPreviewCount.value}`, margin + 28, y + 6);
    doc.text(`Total Amount: ${formatCurrency(reportPreviewTotal.value)}`, margin + 28, y + 12);
    y += 22;

    // 8. Data table
    if (reportType.value === 'summary') {
      autoTable(doc, {
        startY: y,
        head: [['CATEGORY', 'AMOUNT']],
        body: reportSummaryByCategory.value.map(r => [r.category || '', formatCurrency(Number(r.amount) || 0)]),
        theme: 'grid',
        headStyles: { fillColor: brand, textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
        bodyStyles: { fontSize: 9, textColor: [40, 40, 40] },
        alternateRowStyles: { fillColor: [247, 248, 255] },
        columnStyles: { 1: { halign: 'right', fontStyle: 'bold' } },
        margin: { left: margin, right: margin },
        styles: { cellPadding: 3.5 },
      });
    } else {
      autoTable(doc, {
        startY: y,
        head: [['DATE', 'NAME', 'CATEGORY', 'AMOUNT', 'DESCRIPTION']],
        body: reportPreviewRows.value.map(r => [
          (r.expense_date || '').slice(0, 10),
          r.name || '',
          r.category || '',
          formatCurrency(Number(r.amount) || 0),
          r.description || ''
        ]),
        theme: 'grid',
        headStyles: { fillColor: brand, textColor: [255, 255, 255], fontSize: 8, fontStyle: 'bold' },
        bodyStyles: { fontSize: 8, textColor: [40, 40, 40] },
        alternateRowStyles: { fillColor: [247, 248, 255] },
        columnStyles: {
          0: { cellWidth: 24 },
          1: { cellWidth: 38 },
          2: { cellWidth: 28 },
          3: { cellWidth: 26, halign: 'right', fontStyle: 'bold' },
          4: { cellWidth: 'auto' }
        },
        margin: { left: margin, right: margin },
        styles: { cellPadding: 3 },
      });
    }

    // 9. Footer on every page
    const totalPdfPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPdfPages; i++) {
      doc.setPage(i);
      doc.setDrawColor(210, 212, 240);
      doc.setLineWidth(0.3);
      doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(160, 160, 160);
      doc.text(`${companyName}  —  Expense Report  —  ${reportStartDate.value} to ${reportEndDate.value}`, margin, pageH - 7);
      doc.text(`Page ${i} of ${totalPdfPages}`, pageW - margin, pageH - 7, { align: 'right' });
    }

    doc.save(`${baseName}.pdf`);
  } catch (e) {
    console.error(e);
    alert('Export failed. Please try again.');
  } finally {
    isExportingReport.value = false;
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  importLoading.value = true;
  try {
    const uploadResult = await uploadBulkFile(file);
    if (!uploadResult || !uploadResult.data_rows) {
      throw new Error('Failed to parse file preview data');
    }

    importFilePreview.value = {
      columns: uploadResult.detected_columns || [],
      rows: uploadResult.data_rows || [],
      total: uploadResult.total_rows || uploadResult.data_rows.length
    };

    // Auto-mapping logic
    const mapping = {};
    const columns = uploadResult.detected_columns || [];
    
    columns.forEach(col => {
      const normalizedCol = col.toLowerCase().replace(/[\s_\-]/g, '');
      expenseFields.forEach(field => {
        const normalizedField = field.value.toLowerCase().replace(/[\s_\-]/g, '');
        const normalizedLabel = field.label.toLowerCase().replace(/[\s_\-]/g, '');
        
        if (normalizedCol === normalizedField || 
            normalizedCol === normalizedLabel ||
            (field.value === 'name' && (normalizedCol === 'expensename' || normalizedCol === 'item')) ||
            (field.value === 'expense_date' && (normalizedCol === 'date' || normalizedCol === 'day'))) {
          mapping[field.value] = col;
        }
      });
    });

    importMapping.value = mapping;
    importStep.value = 2;
  } catch (err) {
    console.error('Bulk upload error:', err);
    alert(err.message || 'Upload failed');
  } finally {
    importLoading.value = false;
  }
};

const startProcessingImport = async () => {
  if (!isMappingValid.value) return;
  
  importLoading.value = true;
  try {
    // Reverse mapping for the backend API: { file_column: field_name }
    const columnMappingForBackend = {};
    Object.entries(importMapping.value).forEach(([field, col]) => {
      if (col) columnMappingForBackend[col] = field;
    });

    const payload = {
      column_mapping: columnMappingForBackend,
      data_rows: importFilePreview.value.rows
    };

    const result = await processBulkImport(payload);
    
    if (result.errors && result.errors.length > 0) {
      console.warn('Import warnings:', result.errors);
    }

    alert(`IMPORT_COMPLETE: ${result.success} SUCCESS, ${result.failed} FAILED.`);
    showImportModal.value = false;
    importStep.value = 1;
    await fetchExpenses();
  } catch (err) {
    console.error('Bulk process error:', err);
    alert(err.message || 'Import failed');
  } finally {
    importLoading.value = false;
  }
};

onMounted(() => {
  // Default report range: this month
  const now = new Date();
  reportStartDate.value = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  reportEndDate.value = now.toISOString().split('T')[0];
  fetchExpenses();
  fetchTenantDetails();
  renderAnalyticsCharts();
});

onBeforeUnmount(() => {
  destroyCharts();
});

watch(
  () => route.query.open,
  (open) => {
    if (open === 'reports') showReportsModal.value = true;
    if (open === 'add') showAddModal.value = true;
  },
  { immediate: true }
);

watch([analyticsPeriod, analyticsCustomStartDate, analyticsCustomEndDate, showGraphs, expenses], () => {
  renderAnalyticsCharts();
}, { deep: true });
</script>
