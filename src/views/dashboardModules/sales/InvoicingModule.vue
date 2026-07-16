<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <!-- Viewport Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="flex items-center gap-2">
              <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <i class="fas fa-file-invoice text-[#2F2E8B]"></i>
                <span>Billing // Overview</span>
              </div>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Billing Dashboard</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <!-- Branch Selector -->
          <div v-if="branches.length > 0" class="hidden md:block">
            <select 
              v-model="selectedBranch" 
              class="rounded-none border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-[#2F2E8B] text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3"
            >
              <option v-for="branch in branches" :key="branch.id" :value="branch">
                {{ branch.name }}
              </option>
            </select>
          </div>

          <!-- Refresh Button -->
          <button 
            @click="refreshAllData" 
            :disabled="loading"
            class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-wider transition-all disabled:opacity-50 border border-[#2F2E8B]/20 px-3 py-1.5 hover:bg-[#2F2E8B]/5"
          >
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i>
            Refresh Data
          </button>

          <!-- KPI Report Button -->
          <button 
            @click="navigateTo('/dashboard/invoicing/reports')"
            class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2"
          >
            <i class="fas fa-chart-bar"></i> KPI Reports
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-8">
      
      <!-- Date Filter Toolbar -->
      <div class="relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-sm">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Timeframe Filter</span>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <select v-model="dateFilter" class="rounded-none border border-gray-200 px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                <option value="all">All Time</option>
                <option value="daily">Daily (Today)</option>
                <option value="yesterday">Yesterday</option>
                <option value="weekly">Weekly (Last 7 days)</option>
                <option value="monthly">Monthly (This Month)</option>
                <option value="custom">Custom Range</option>
              </select>
              <div v-if="dateFilter === 'custom'" class="flex items-center gap-2">
                <input v-model="customStartDate" type="date" class="rounded-none border border-gray-200 px-3 py-1.5 text-[10px] font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                <span class="text-gray-400 font-mono text-[10px]">TO</span>
                <input v-model="customEndDate" type="date" class="rounded-none border border-gray-200 px-3 py-1.5 text-[10px] font-mono focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                <button @click="refreshAllData" class="bg-gray-100 hover:bg-gray-200 p-2 text-[#2F2E8B] transition-colors">
                  <i class="fas fa-sync-alt text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Invoice Data...</p>
      </div>

      <div v-else class="space-y-8">
        
        <!-- Document Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          
          <!-- Invoices -->
          <div class="relative overflow-hidden bg-white border border-gray-100 hover:border-[#2F2E8B] p-5 shadow-sm transition-all cursor-pointer group" @click="navigateTo('/dashboard/invoicing/invoices')">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 bg-[#2F2E8B]/10 group-hover:bg-[#2F2E8B] flex items-center justify-center transition-colors">
                <i class="fas fa-file-invoice text-[#2F2E8B] group-hover:text-white text-sm transition-colors"></i>
              </div>
            </div>
            <h3 class="text-2xl font-black text-gray-900 font-display mb-1">{{ kpiData.invoices.count }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Invoices</p>
            <p class="text-[9px] font-mono text-[#2F2E8B] font-bold">{{ formatCurrencyShort(kpiData.invoices.amount) }}</p>
            </div>
          </div>

          <!-- Quotations -->
          <div class="relative overflow-hidden bg-white border border-gray-100 hover:border-emerald-500 p-5 shadow-sm transition-all cursor-pointer group" @click="navigateTo('/dashboard/invoicing/quotations')">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 bg-emerald-500/10 group-hover:bg-emerald-500 flex items-center justify-center transition-colors">
                <i class="fas fa-quote-left text-emerald-500 group-hover:text-white text-sm transition-colors"></i>
              </div>
            </div>
            <h3 class="text-2xl font-black text-gray-900 font-display mb-1">{{ kpiData.quotations.count }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Quotations</p>
            <p class="text-[9px] font-mono text-emerald-600 font-bold">{{ formatCurrencyShort(kpiData.quotations.amount) }}</p>
            </div>
          </div>

          <!-- Proposals -->
          <div class="relative overflow-hidden bg-white border border-gray-100 hover:border-amber-500 p-5 shadow-sm transition-all cursor-pointer group" @click="navigateTo('/dashboard/invoicing/proposals')">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 bg-amber-500/10 group-hover:bg-amber-500 flex items-center justify-center transition-colors">
                <i class="fas fa-file-alt text-amber-500 group-hover:text-white text-sm transition-colors"></i>
              </div>
            </div>
            <h3 class="text-2xl font-black text-gray-900 font-display mb-1">{{ kpiData.proposals.count }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Proposals</p>
            <p class="text-[9px] font-mono text-amber-600 font-bold">{{ formatCurrencyShort(kpiData.proposals.amount) }}</p>
            </div>
          </div>

          <!-- Contracts -->
          <div class="relative overflow-hidden bg-white border border-gray-100 hover:border-blue-500 p-5 shadow-sm transition-all cursor-pointer group" @click="navigateTo('/dashboard/invoicing/contracts')">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 bg-blue-500/10 group-hover:bg-blue-500 flex items-center justify-center transition-colors">
                <i class="fas fa-file-signature text-blue-500 group-hover:text-white text-sm transition-colors"></i>
              </div>
            </div>
            <h3 class="text-2xl font-black text-gray-900 font-display mb-1">{{ kpiData.contracts.count }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Contracts</p>
            <p class="text-[9px] font-mono text-blue-600 font-bold">{{ formatCurrencyShort(kpiData.contracts.amount) }}</p>
            </div>
          </div>

          <!-- Total Summary -->
          <div class="bg-gradient-to-br from-[#2F2E8B] to-[#1D226B] p-5 shadow-md transition-all">
            <div class="text-white/70 text-[8px] font-mono font-bold uppercase tracking-widest mb-3">Total Value</div>
            <h3 class="text-2xl font-black text-white font-display mb-1">{{ formatCurrencyShort(kpiData.totalAmount) }}</h3>
            <p class="text-white/80 text-[9px] font-mono font-bold uppercase">{{ kpiData.totalCount }} Documents</p>
          </div>

          <!-- Recurring Invoices -->
          <div class="relative overflow-hidden bg-white border border-gray-100 hover:border-emerald-600 p-5 shadow-sm transition-all cursor-pointer group" @click="navigateTo('/dashboard/invoicing/recurring')">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 bg-emerald-600/10 group-hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <i class="fas fa-redo text-emerald-600 group-hover:text-white text-sm transition-colors"></i>
                </div>
              </div>
              <h3 class="text-2xl font-black text-gray-900 font-display mb-1">{{ kpiData.recurringCount || 0 }}</h3>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Recurring</p>
              <p class="text-[9px] font-mono text-emerald-600 font-bold">{{ kpiData.recurringUpcoming || 0 }} upcoming</p>
            </div>
          </div>

          <!-- Receipts -->
          <div class="relative overflow-hidden bg-white border border-gray-100 hover:border-cyan-500 p-5 shadow-sm transition-all cursor-pointer group" @click="navigateTo('/dashboard/invoicing/receipts')">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 bg-cyan-500/10 group-hover:bg-cyan-500 flex items-center justify-center transition-colors">
                  <i class="fas fa-receipt text-cyan-500 group-hover:text-white text-sm transition-colors"></i>
                </div>
              </div>
              <h3 class="text-2xl font-black text-gray-900 font-display mb-1">{{ kpiData.receipts?.count || 0 }}</h3>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Receipts</p>
              <p class="text-[9px] font-mono text-cyan-600 font-bold">{{ formatCurrencyShort(kpiData.receipts?.amount || 0) }}</p>
            </div>
          </div>

          <!-- Credit/Debit Notes -->
          <div class="relative overflow-hidden bg-white border border-gray-100 hover:border-purple-500 p-5 shadow-sm transition-all cursor-pointer group" @click="navigateTo('/dashboard/invoicing/credit-debit-notes')">
            <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 bg-purple-500/10 group-hover:bg-purple-500 flex items-center justify-center transition-colors">
                  <i class="fas fa-exchange-alt text-purple-500 group-hover:text-white text-sm transition-colors"></i>
                </div>
              </div>
              <h3 class="text-2xl font-black text-gray-900 font-display mb-1">{{ kpiData.creditDebitNotes?.count || 0 }}</h3>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Credit/Debit Notes</p>
              <p class="text-[9px] font-mono text-purple-600 font-bold">{{ formatCurrencyShort(kpiData.creditDebitNotes?.amount || 0) }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Access Actions -->
        <div class="relative overflow-hidden bg-white border border-gray-100 p-6 rounded-none shadow-sm">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-5 bg-[#2F2E8B] rounded-none"></div>
                <span class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest">Quick Actions</span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <button v-for="link in quickLinks" :key="link.label" @click="link.action ? link.action() : navigateTo(link.path)" class="quick-link-btn group flex flex-col items-center p-5 bg-gray-50 border border-gray-200 hover:border-[#2F2E8B] hover:shadow-md transition-all rounded-none text-center">
                <i :class="[link.icon, 'text-gray-400 group-hover:text-[#2F2E8B] text-2xl mb-3 transition-colors']"></i>
                <span class="text-[9px] font-mono font-bold text-gray-600 group-hover:text-[#2F2E8B] uppercase leading-tight">{{ link.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Analytics Grid - Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- Left Column: Recent Documents & Summary -->
          <div class="lg:col-span-2 space-y-6">
            
            <!-- Secondary Metrics Row -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Total Value -->
              <div class="relative overflow-hidden bg-white border border-gray-100 p-5 rounded-none shadow-sm group hover:border-[#2F2E8B]/30 transition-all">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <i class="fas fa-coins text-gray-300 text-xl group-hover:text-[#2F2E8B] transition-colors"></i>
                    <span class="text-[8px] font-mono font-black text-[#2F2E8B] bg-blue-50 px-1.5 py-0.5 uppercase">Total</span>
                  </div>
                  <div>
                    <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Combined Value</p>
                    <h4 class="text-xl font-black text-gray-900 font-display mt-1">{{ formatCurrencyShort(kpiData.totalAmount) }}</h4>
                  </div>
                </div>
                </div>
              </div>

              <!-- Total Documents -->
              <div class="relative overflow-hidden bg-white border border-gray-100 p-5 rounded-none shadow-sm group hover:border-[#2F2E8B]/30 transition-all">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <i class="fas fa-folder-open text-gray-300 text-xl group-hover:text-[#2F2E8B] transition-colors"></i>
                    <span class="text-[8px] font-mono font-black text-gray-500 bg-gray-50 px-1.5 py-0.5 uppercase">{{ kpiData.totalCount }} Docs</span>
                  </div>
                  <div>
                    <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">All Documents</p>
                    <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ kpiData.totalCount }}</h4>
                  </div>
                </div>
                </div>
              </div>

              <!-- Progress Reports -->
              <div class="relative overflow-hidden bg-white border border-gray-100 p-5 rounded-none shadow-sm group hover:border-[#2F2E8B]/30 transition-all cursor-pointer" @click="navigateTo('/dashboard/invoicing/progress-reports')">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <i class="fas fa-chart-line text-gray-300 text-xl group-hover:text-[#2F2E8B] transition-colors"></i>
                    <span class="text-[8px] font-mono font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 uppercase">Reports</span>
                  </div>
                  <div>
                    <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Progress Reports</p>
                    <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ kpiData.progressReports?.count || 0 }}</h4>
                  </div>
                </div>
                </div>
              </div>

              <!-- Paid vs Unpaid -->
              <div class="relative overflow-hidden bg-white border border-gray-100 p-5 rounded-none shadow-sm group hover:border-[#2F2E8B]/30 transition-all">
                <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
                <div class="relative z-10">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <i class="fas fa-check-circle text-gray-300 text-xl group-hover:text-emerald-500 transition-colors"></i>
                    <span class="text-[8px] font-mono font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 uppercase">Status</span>
                  </div>
                  <div>
                    <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Paid Invoices</p>
                    <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ kpiData.paidCount || 0 }}</h4>
                  </div>
                </div>
                </div>
              </div>
            </div>

            <!-- Document Type Distribution -->
            <div class="relative overflow-hidden bg-white border border-gray-100 p-6 rounded-none shadow-sm">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-5 bg-[#2F2E8B] rounded-none"></div>
                    <span class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest">Document Distribution</span>
                  </div>
                </div>
                
                <div class="space-y-5">
                  <div v-for="docType in documentDistribution" :key="docType.label" class="group">
                    <div class="flex justify-between text-[10px] font-mono font-bold mb-2 uppercase">
                      <span class="text-gray-700">{{ docType.label }}</span>
                      <span class="text-[#2F2E8B]">{{ docType.count }} DOCS &bull; {{ docType.percentage }}%</span>
                    </div>
                    <div class="w-full bg-gray-100 h-2 rounded-none overflow-hidden">
                      <div class="h-full transition-all duration-500 rounded-none" :class="docType.barClass" :style="{ width: docType.percentage + '%' }"></div>
                    </div>
                  </div>
                  <div v-if="kpiData.totalCount === 0" class="text-center py-8 text-[10px] font-mono text-gray-400 uppercase">
                    NO_DOCUMENTS_FOUND
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Documents Table -->
            <div class="relative overflow-hidden bg-white border border-gray-100 p-6 rounded-none shadow-sm">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10">
                <div class="flex justify-between items-center mb-6">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-5 bg-[#2F2E8B] rounded-none"></div>
                    <span class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest">Recent Documents</span>
                  </div>
                  <button @click="navigateTo('/dashboard/invoicing/all')" class="text-[9px] font-mono font-black text-[#2F2E8B] hover:underline uppercase tracking-wider">
                    View All <i class="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full border-collapse">
                    <thead>
                      <tr class="bg-gray-50 border-y border-gray-100">
                        <th class="py-3 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Type</th>
                        <th class="py-3 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Number</th>
                        <th class="py-3 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Client</th>
                        <th class="py-3 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Date</th>
                        <th class="py-3 px-3 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Amount</th>
                        <th class="py-3 px-3 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Status</th>
                        <th class="py-3 px-3 text-center text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                      <tr v-for="doc in recentDocuments" :key="doc.id" class="hover:bg-gray-50/50 transition-colors group">
                        <td class="py-3 px-3">
                          <div class="flex items-center gap-2">
                            <div class="w-7 h-7 flex items-center justify-center transition-colors" :class="getDocTypeIconBg(doc.docType)">
                              <i :class="getDocTypeIcon(doc.docType)" class="text-[11px] text-white"></i>
                            </div>
                            <span class="text-[10px] font-bold font-mono text-gray-900 uppercase">{{ doc.docType }}</span>
                          </div>
                        </td>
                        <td class="py-3 px-3 text-[10px] font-mono text-gray-500 uppercase">#{{ getDocNumber(doc) }}</td>
                        <td class="py-3 px-3 text-[10px] font-bold font-mono text-gray-700 uppercase">{{ getDocClient(doc) }}</td>
                        <td class="py-3 px-3 text-[10px] font-mono text-gray-500 uppercase">{{ formatDate(getDocDate(doc)) }}</td>
                        <td class="py-3 px-3 text-right">
                          <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ formatCurrencyShort(getDocAmount(doc)) }}</span>
                        </td>
                        <td class="py-3 px-3 text-right">
                          <span :class="getStatusClass(doc.status)" class="text-[8px] font-mono font-black px-2 py-1 border uppercase">
                            {{ doc.status || 'Draft' }}
                          </span>
                        </td>
                        <td class="py-3 px-3">
                          <div class="flex items-center justify-center gap-1">
                            <button @click.stop="viewDocument(doc)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="View">
                              <i class="fas fa-eye text-xs"></i>
                            </button>
                            <button @click.stop="editDocument(doc)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit">
                              <i class="fas fa-edit text-xs"></i>
                            </button>
                            <button @click.stop="duplicateDocument(doc)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Duplicate">
                              <i class="fas fa-copy text-xs"></i>
                            </button>
                            <button @click.stop="openActionModal(doc)" class="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors" title="Credit/Debit / Delete">
                              <i class="fas fa-exchange-alt text-xs"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="recentDocuments.length === 0">
                        <td colspan="7" class="py-8 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">NO_DOCUMENTS_FOUND</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Quick Stats & Status -->
          <div class="space-y-6">
            
            <!-- Status Summary -->
            <div class="relative overflow-hidden bg-white border border-gray-100 p-6 rounded-none shadow-sm">
              <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-6">
                  <div class="w-1.5 h-5 bg-[#2F2E8B] rounded-none"></div>
                  <span class="text-[11px] font-mono font-black text-gray-400 uppercase tracking-widest">Status Overview</span>
                </div>
                
                <div class="space-y-3">
                  <div v-for="status in statusSummary" :key="status.label" class="bg-gray-50 border-l-2 p-3 hover:bg-gray-100 transition-colors rounded-none border border-gray-100" :class="status.borderClass">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="text-center min-w-[35px]">
                          <div class="text-xl font-black font-display leading-none" :class="status.textClass">{{ status.count }}</div>
                        </div>
                        <div class="flex-1">
                          <div class="text-[10px] font-bold font-mono text-gray-900 uppercase leading-tight">{{ status.label }}</div>
                          <div class="text-[9px] text-gray-500 font-mono uppercase mt-1">
                            {{ status.description }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

    <!-- ========== ACTION MODAL (Credit Note / Debit Note / Delete) ========== -->
    <Teleport to="body">
      <div v-if="showActionModal" class="fixed inset-0 z-[200] flex items-center justify-center" @click.self="closeActionModal">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <!-- Modal -->
        <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-md mx-4 animate-fade-in-up">
          <!-- Modal Header -->
          <div class="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-purple-500 rounded-none"></div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Document Action</p>
                <h3 class="text-sm font-black text-gray-900 uppercase font-display">
                  {{ actionDoc?.docType || 'Document' }} #{{ actionDocNumber }}
                </h3>
              </div>
            </div>
            <button @click="closeActionModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <i class="fas fa-times text-lg"></i>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="px-6 py-5 space-y-4">
            <!-- Client info -->
            <div class="bg-gray-50 border border-gray-100 p-3 text-[10px] font-mono">
              <span class="text-gray-500 uppercase tracking-wider">Client: </span>
              <span class="font-bold text-gray-900">{{ actionDocClient }}</span>
              <span class="text-gray-300 mx-2">|</span>
              <span class="text-gray-500 uppercase tracking-wider">Amount: </span>
              <span class="font-bold text-[#2F2E8B]">{{ formatCurrencyShort(actionDocAmount) }}</span>
            </div>

            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Choose an action:</p>

            <!-- Option 1: Credit Note -->
            <button @click="confirmCreditNote(actionDoc)" class="w-full text-left p-4 border border-gray-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all group flex items-start gap-4">
              <div class="w-10 h-10 bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center flex-shrink-0 transition-colors">
                <i class="fas fa-minus-circle text-amber-600"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[11px] font-mono font-black text-gray-800 uppercase tracking-wider">Cancel / Reduce</p>
                <p class="text-[9px] font-mono text-gray-500 mt-0.5 leading-tight">
                  Create a <strong class="text-amber-600">Credit Note</strong> to reduce the invoice value
                  (returns, discounts, cancellations). The original document stays intact.
                </p>
              </div>
              <i class="fas fa-chevron-right text-gray-300 group-hover:text-amber-500 self-center transition-colors"></i>
            </button>

            <!-- Option 2: Debit Note -->
            <button @click="confirmDebitNote(actionDoc)" class="w-full text-left p-4 border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group flex items-start gap-4">
              <div class="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center flex-shrink-0 transition-colors">
                <i class="fas fa-plus-circle text-blue-600"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[11px] font-mono font-black text-gray-800 uppercase tracking-wider">Increase / Debit</p>
                <p class="text-[9px] font-mono text-gray-500 mt-0.5 leading-tight">
                  Create a <strong class="text-blue-600">Debit Note</strong> to increase the invoice value
                  (corrections, additional charges). The original document stays intact.
                </p>
              </div>
              <i class="fas fa-chevron-right text-gray-300 group-hover:text-blue-500 self-center transition-colors"></i>
            </button>

            <!-- Option 3: Delete Permanently -->
            <div class="border-t border-gray-100 pt-4">
              <button @click="confirmDelete(actionDoc)" class="w-full text-left p-4 border border-red-200 hover:border-red-400 hover:bg-red-50 transition-all group flex items-start gap-4">
                <div class="w-10 h-10 bg-red-100 group-hover:bg-red-200 flex items-center justify-center flex-shrink-0 transition-colors">
                  <i class="fas fa-trash text-red-600"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[11px] font-mono font-black text-red-700 uppercase tracking-wider">Delete Permanently</p>
                  <p class="text-[9px] font-mono text-gray-500 mt-0.5 leading-tight">
                    <strong class="text-red-600">Remove from system</strong> — This action cannot be undone.
                    The document will be permanently deleted.
                  </p>
                </div>
                <i class="fas fa-chevron-right text-gray-300 group-hover:text-red-500 self-center transition-colors"></i>
              </button>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="border-t border-gray-100 px-6 py-3 flex justify-end">
            <button @click="closeActionModal" class="px-4 py-2 text-[10px] font-mono font-bold uppercase text-gray-600 border border-gray-200 hover:border-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import { useCurrency } from '@/composables/useCurrency.js';
import { useActivityTracker } from '@/config/useActivityTracker.js';

const router = useRouter();
const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getToken, getUserRole, getUserEmail } = decodeJWT();
const { formatCurrency, currencySymbol, formatCurrencyCompact } = useCurrency();

const dateFilter = ref('all');
const customStartDate = ref('');
const customEndDate = ref('');

// Navigation
const navigateTo = (path) => {
  router.push(path);
};

// Quick Links
const quickLinks = ref([
  { label: 'Invoices', path: '/dashboard/invoicing/invoices', icon: 'fas fa-file-invoice' },
  { label: 'Quotations', path: '/dashboard/invoicing/quotations', icon: 'fas fa-quote-left' },
  { label: 'Proposals', path: '/dashboard/invoicing/proposals', icon: 'fas fa-file-alt' },
  { label: 'Contracts', path: '/dashboard/invoicing/contracts', icon: 'fas fa-file-signature' },
  { label: 'Recurring', path: '/dashboard/invoicing/recurring', icon: 'fas fa-redo' },
  { label: 'Billing Report', path: '/dashboard/invoicing/billing-report', icon: 'fas fa-chart-bar' },
  { label: 'Reports', path: '/dashboard/invoicing/progress-reports', icon: 'fas fa-chart-line' },
  { label: 'Receipts', path: '/dashboard/invoicing/receipts', icon: 'fas fa-receipt' },
  { label: 'Credit/Debit Notes', path: '/dashboard/invoicing/credit-debit-notes', icon: 'fas fa-exchange-alt' },
  { label: 'Bank Accounts', path: '/dashboard/invoicing/bank-accounts', icon: 'fas fa-university' },
  { label: 'All Docs', path: '/dashboard/invoicing/all', icon: 'fas fa-folder-open' }
]);

// Local helper (mirrors InvoicingModuleFull)
const formatNumber = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try {
    if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n);
  } catch (e) { /* fallback */ }
  const sym = currencySymbol?.value || currencySymbol || 'K';
  return `${sym}${formatNumber(n)}`;
};

// Activity Tracker
useActivityTracker({
  userId: getUserEmail(),
  tenantId: getTenantId(),
  module: 'invoicing-dashboard'
});

// State
const loading = ref(false);
const branches = ref([]);
const selectedBranch = ref(null);

// Dashboard data — single source of truth from the aggregation endpoint
const dashboardData = ref({
  kpis: {
    invoices: { count: 0, amount: 0 },
    quotations: { count: 0, amount: 0 },
    proposals: { count: 0, amount: 0 },
    contracts: { count: 0, amount: 0 },
    progressReports: { count: 0 },
    receipts: { count: 0, amount: 0 },
    creditDebitNotes: { count: 0, amount: 0 },
    totalCount: 0,
    totalAmount: 0,
    paidCount: 0,
    recurringCount: 0,
    recurringUpcoming: 0,
  },
  documentDistribution: [],
  statusSummary: [],
  recentDocuments: []
});

// KPI data — direct from backend aggregation
const kpiData = computed(() => dashboardData.value.kpis);

const documentDistribution = computed(() => dashboardData.value.documentDistribution);

const statusSummary = computed(() => dashboardData.value.statusSummary);

const recentDocuments = computed(() => dashboardData.value.recentDocuments);

// Build date filter params for the backend
const getDateParams = () => {
  const params = {};
  const today = new Date();
  
  if (dateFilter.value === 'all') return params;
  
  if (dateFilter.value === 'daily') {
    params.date_from = today.toISOString().split('T')[0];
    params.date_to = today.toISOString().split('T')[0];
  } else if (dateFilter.value === 'yesterday') {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    params.date_from = yesterday.toISOString().split('T')[0];
    params.date_to = yesterday.toISOString().split('T')[0];
  } else if (dateFilter.value === 'weekly') {
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    params.date_from = lastWeek.toISOString().split('T')[0];
    params.date_to = today.toISOString().split('T')[0];
  } else if (dateFilter.value === 'monthly') {
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    params.date_from = firstDay.toISOString().split('T')[0];
    params.date_to = today.toISOString().split('T')[0];
  } else if (dateFilter.value === 'custom' && customStartDate.value && customEndDate.value) {
    params.date_from = customStartDate.value;
    params.date_to = customEndDate.value;
  }
  return params;
};

// Data Fetching — single aggregation call replaces 8+ parallel requests
const fetchAllData = async () => {
  loading.value = true;
  const tenantId = getTenantId();
  const branchId = selectedBranch.value?.id || '';
  
  try {
    const params = new URLSearchParams({ tenant_id: tenantId });
    if (branchId) params.append('branch_id', branchId);
    
    // Add date filter params
    const dateParams = getDateParams();
    if (dateParams.date_from) params.append('date_from', dateParams.date_from);
    if (dateParams.date_to) params.append('date_to', dateParams.date_to);

    const response = await fetch(`${API_BASE_URL}/invoices/dashboard-summary?${params}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (response.ok) {
      const data = await response.json();
      dashboardData.value = data;
    } else {
      console.error('Failed to load dashboard data');
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    loading.value = false;
  }
};

// Utility functions
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-ZM', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
};

const formatCurrencyShort = (amount) => {
  if (!amount || isNaN(amount)) return formatWithSymbol(0);
  return formatWithSymbol(amount);
};

const getDocTypeIcon = (type) => {
  const icons = {
    invoice: 'fas fa-file-invoice',
    quotation: 'fas fa-quote-left',
    proposal: 'fas fa-file-alt',
    contract: 'fas fa-file-signature',
    receipt: 'fas fa-receipt',
    report: 'fas fa-chart-line',
    'progress-report': 'fas fa-chart-line'
  };
  return icons[type] || 'fas fa-file';
};

const getDocTypeIconBg = (type) => {
  const bgs = {
    invoice: 'bg-[#2F2E8B]',
    quotation: 'bg-emerald-500',
    proposal: 'bg-amber-500',
    contract: 'bg-blue-500',
    receipt: 'bg-cyan-500',
    report: 'bg-purple-500',
    'progress-report': 'bg-purple-500'
  };
  return bgs[type] || 'bg-gray-500';
};

const getDocNumber = (doc) => {
  return doc.invoiceNumber || doc.quotationNumber || doc.number || doc.title || doc.id?.slice(-6) || '—';
};

const getDocClient = (doc) => {
  return doc.clientName || doc.client_name || doc.preparedFor || doc.partyB?.name || 'Unknown';
};

const getDocDate = (doc) => {
  return doc.date || doc.created_at || doc.updated_at || null;
};

const getDocAmount = (doc) => {
  if (doc.total) return doc.total;
  if (doc.amount) return parseFloat(doc.amount) || 0;
  const items = doc.items || [];
  return items.reduce((s, item) => s + ((item.quantity || item.qty || 0) * (item.unitPrice || item.unit_price || item.price || 0)), 0);
};

const getStatusClass = (status) => {
  const s = (status || 'draft').toLowerCase();
  const classes = {
    paid: 'text-green-600 border-green-200 bg-green-50',
    sent: 'text-blue-600 border-blue-200 bg-blue-50',
    draft: 'text-gray-500 border-gray-200 bg-gray-50',
    pending: 'text-amber-600 border-amber-200 bg-amber-50',
    accepted: 'text-green-600 border-green-200 bg-green-50',
    rejected: 'text-red-600 border-red-200 bg-red-50',
    cancelled: 'text-red-600 border-red-200 bg-red-50',
    completed: 'text-emerald-600 border-emerald-200 bg-emerald-50',
    credited: 'text-purple-600 border-purple-200 bg-purple-50',
    debited: 'text-indigo-600 border-indigo-200 bg-indigo-50'
  };
  return classes[s] || 'text-gray-500 border-gray-200 bg-gray-50';
};

const viewDocument = (doc) => {
  const docId = doc.id || doc._id;
  const docType = doc.docType.toLowerCase();
  
  // Route to the appropriate page based on document type
  const routeMap = {
    'invoice': '/dashboard/invoicing/invoices',
    'quotation': '/dashboard/invoicing/quotations',
    'proposal': '/dashboard/invoicing/proposals',
    'contract': '/dashboard/invoicing/contracts',
    'progress-report': '/dashboard/invoicing/progress-reports',
    'report': '/dashboard/invoicing/progress-reports',
    'receipt': '/dashboard/invoicing/receipts'
  };
  
  const path = routeMap[docType] || '/dashboard/invoicing/invoices';
  
  router.push({ 
    path, 
    query: { action: 'view', docId, docType } 
  });
};

const editDocument = (doc) => {
  const docId = doc.id || doc._id;
  const docType = doc.docType.toLowerCase();
  
  // Route to the appropriate page based on document type
  const routeMap = {
    'invoice': '/dashboard/invoicing/invoices',
    'quotation': '/dashboard/invoicing/quotations',
    'proposal': '/dashboard/invoicing/proposals',
    'contract': '/dashboard/invoicing/contracts',
    'progress-report': '/dashboard/invoicing/progress-reports',
    'report': '/dashboard/invoicing/progress-reports',
    'receipt': '/dashboard/invoicing/receipts'
  };
  
  const path = routeMap[docType] || '/dashboard/invoicing/invoices';
  
  router.push({ 
    path, 
    query: { action: 'edit', docId, docType } 
  });
};

const duplicateDocument = (doc) => {
  const docId = doc.id || doc._id;
  const docType = doc.docType.toLowerCase();
  
  // Route to the appropriate page based on document type
  const routeMap = {
    'invoice': '/dashboard/invoicing/invoices',
    'quotation': '/dashboard/invoicing/quotations',
    'proposal': '/dashboard/invoicing/proposals',
    'contract': '/dashboard/invoicing/contracts',
    'progress-report': '/dashboard/invoicing/progress-reports',
    'report': '/dashboard/invoicing/progress-reports',
    'receipt': '/dashboard/invoicing/receipts'
  };
  
  const path = routeMap[docType] || '/dashboard/invoicing/invoices';
  
  router.push({ 
    path, 
    query: { action: 'duplicate', docId, docType } 
  });
};

const deleteDocument = async (doc) => {
  if (!confirm(`Delete this ${doc.docType}?`)) return;
  
  try {
    const tenantId = getTenantId();
    const docId = doc.id || doc._id;
    const docType = doc.docType.toLowerCase();
    
    let endpoint = '';
    if (docType === 'invoice' || docType === 'quotation') endpoint = `/invoices/${docId}`;
    else if (docType === 'proposal') endpoint = `/invoices/proposals/${docId}`;
    else if (docType === 'contract') endpoint = `/invoices/contracts/${docId}`;
    else if (docType === 'report' || docType === 'progress-report') endpoint = `/invoices/progress-reports/${docId}`;
    else if (docType === 'receipt') endpoint = `/pos/sales/${docId}`;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}?tenant_id=${tenantId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    
    if (response.ok) {
      await fetchAllData();
    } else {
      alert('Failed to delete document');
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('Failed to delete document');
  }
};

// Action Modal state
const showActionModal = ref(false);
const actionDoc = ref(null);

const actionDocNumber = computed(() => {
  const doc = actionDoc.value;
  if (!doc) return '—';
  return doc.invoiceNumber || doc.quotationNumber || doc.number || doc.title || doc.id?.slice(-6) || '—';
});

const actionDocClient = computed(() => {
  const doc = actionDoc.value;
  if (!doc) return '—';
  return doc.clientName || doc.client_name || doc.preparedFor || doc.partyB?.name || 'Unknown';
});

const actionDocAmount = computed(() => {
  const doc = actionDoc.value;
  if (!doc) return 0;
  if (doc.total) return doc.total;
  if (doc.amount) return parseFloat(doc.amount) || 0;
  const items = doc.items || [];
  return items.reduce((s, item) => s + ((item.quantity || item.qty || 0) * (item.unitPrice || item.unit_price || item.price || 0)), 0);
});

const openActionModal = (doc) => {
  actionDoc.value = doc;
  showActionModal.value = true;
};

const closeActionModal = () => {
  showActionModal.value = false;
  actionDoc.value = null;
};

const confirmCreditNote = (doc) => {
  const docId = doc.id || doc._id;
  const docType = doc.docType?.toLowerCase() || 'invoice';
  const docNumber = actionDocNumber.value;
  closeActionModal();
  router.push({
    path: '/dashboard/invoicing/credit-debit-notes',
    query: { action: 'create-credit', docId, docType, docNumber }
  });
};

const confirmDebitNote = (doc) => {
  const docId = doc.id || doc._id;
  const docType = doc.docType?.toLowerCase() || 'invoice';
  const docNumber = actionDocNumber.value;
  closeActionModal();
  router.push({
    path: '/dashboard/invoicing/credit-debit-notes',
    query: { action: 'create-debit', docId, docType, docNumber }
  });
};

const confirmDelete = async (doc) => {
  closeActionModal();
  await deleteDocument(doc);
};

const refreshAllData = async () => {
  await fetchAllData();
};

// Branch initialization
const initializeBranches = async () => {
  try {
    branches.value = await getBranches();
    const fixedBranchId = getBranchId();
    const userRole = getUserRole();
    const isOwner = ['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase());

    if (fixedBranchId && !isOwner) {
      const branch = branches.value.find(b => b.id === fixedBranchId || b._id === fixedBranchId);
      if (branch) {
        selectedBranch.value = branch;
        setSelectedBranch(branch);
        return;
      }
    } else {
      if (!branches.value.some(b => !b.id && b.name === 'All Branches')) {
        branches.value.unshift({ id: '', name: 'All Branches' });
      }
    }

    const storedBranch = getSelectedBranch();
    if (fixedBranchId && storedBranch && branches.value.some(b => (b.id === storedBranch.id || (!b.id && !storedBranch.id)))) {
      selectedBranch.value = storedBranch;
    } else if (branches.value.length > 0) {
      selectedBranch.value = branches.value[0];
      setSelectedBranch(branches.value[0]);
    }
  } catch (err) {
    console.error('Error initializing branches:', err);
  }
};

watch(selectedBranch, async (newVal) => {
  if (newVal) {
    setSelectedBranch(newVal);
    await fetchAllData();
  }
}, { deep: true });

onMounted(async () => {
  await initializeBranches();
  await fetchAllData();
});
</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
}

.quick-link-btn:hover i {
  transform: scale(1.1);
}

.dotted-pattern {
  background-image: radial-gradient(circle, rgba(47, 46, 139, 0.08) 1px, transparent 1px);
  background-size: 16px 16px;
}
</style>
