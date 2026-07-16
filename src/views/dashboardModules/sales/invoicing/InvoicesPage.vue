<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/invoicing" variant="icon-only" />
          <div class="w-2 h-8 bg-brand rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-file-invoice text-brand"></i>
              <span>Invoice Management // Invoices</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Invoices</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div v-if="branches.length > 0" class="hidden md:block">
            <select v-model="selectedBranch" class="rounded-none border-gray-200 shadow-sm focus:border-brand focus:ring-brand text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3">
              <option v-for="branch in branches" :key="branch.id" :value="branch">{{ branch.name }}</option>
            </select>
          </div>
          <button @click="refreshData" :disabled="loading" class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-brand hover:opacity-80 uppercase tracking-wider transition-all disabled:opacity-50 border border-brand/20 px-3 py-1.5 hover:bg-brand/5">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
          </button>
          <button @click="openCreateModal" class="bg-brand hover:opacity-90 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> New Invoice
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">
      
      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-brand rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Invoices...</p>
      </div>

      <div v-else class="space-y-8 animate-in fade-in duration-700">

        <!-- Analytics Controls Bar -->
        <div class="bg-white border border-gray-100 shadow-sm px-4 py-3 flex flex-wrap items-center gap-3">
          <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 mr-1">
            <i class="fas fa-sliders-h text-brand"></i>
            Dashboard Controls
          </div>

          <button @click="showKpis = !showKpis" class="px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all"
            :class="showKpis ? 'border-brand text-brand bg-brand/5' : 'border-gray-200 text-gray-500 hover:border-brand'">
            <i class="fas mr-1" :class="showKpis ? 'fa-eye' : 'fa-eye-slash'"></i>
            {{ showKpis ? 'Hide KPIs' : 'Show KPIs' }}
          </button>

          <button @click="showGraphs = !showGraphs" class="px-3 py-1.5 border text-[9px] font-mono font-black uppercase tracking-widest transition-all"
            :class="showGraphs ? 'border-brand text-brand bg-brand/5' : 'border-gray-200 text-gray-500 hover:border-brand'">
            <i class="fas mr-1" :class="showGraphs ? 'fa-chart-bar' : 'fa-ban'"></i>
            {{ showGraphs ? 'Hide Graphs' : 'Show Graphs' }}
          </button>

          <div class="w-px h-5 bg-gray-200 mx-1"></div>

          <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Invoice Timeline</label>
          <select v-model="analyticsPeriod" class="px-3 py-1.5 border border-gray-200 text-[9px] font-mono font-black uppercase tracking-widest text-gray-700 focus:border-brand focus:ring-0">
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="quarter">Quarterly</option>
            <option value="year">Yearly</option>
            <option value="custom">Custom</option>
          </select>

          <template v-if="analyticsPeriod === 'custom'">
            <input v-model="analyticsCustomStartDate" type="date"
              class="px-2 py-1.5 border border-gray-200 text-[9px] font-mono font-black uppercase tracking-widest text-gray-700 focus:border-brand focus:ring-0">
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">to</span>
            <input v-model="analyticsCustomEndDate" type="date"
              class="px-2 py-1.5 border border-gray-200 text-[9px] font-mono font-black uppercase tracking-widest text-gray-700 focus:border-brand focus:ring-0">
          </template>

          <div class="ml-auto text-right">
            <p class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Selected Period Revenue</p>
            <p class="text-[11px] font-mono font-black text-brand">{{ formatWithSymbol(analyticsPeriodTotal) }}</p>
          </div>
        </div>

        <!-- KPI Cards Grid -->
        <div v-if="showKpis" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Lifetime -->
          <div class="kpi-card-hero group border-l-4 border-l-brand">
            <div class="absolute top-0 right-0 bg-gray-50 border-b border-l border-gray-100 px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest z-20">LIFETIME</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-brand">
                <i class="fas fa-chart-line text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display">{{ formatCurrencyShort(lifetimeTotal) }}</h3>
              <p class="kpi-label uppercase">Total Invoiced</p>
              <div class="flex items-center justify-between mt-3">
                <p class="text-[9px] font-mono font-bold text-gray-500 tracking-tighter">ALL_RECORDS: {{ invoices.length }}</p>
              </div>
            </div>
          </div>

          <!-- Monthly -->
          <div class="kpi-card-hero group border-l-4 border-l-emerald-500">
            <div class="absolute top-0 right-0 bg-emerald-50 border-b border-l border-emerald-100 px-2 py-0.5 text-[8px] font-mono font-bold text-emerald-600 uppercase tracking-widest z-20">THIS MONTH</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-emerald-600 bg-emerald-50">
                <i class="fas fa-calendar-alt text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display text-emerald-700">{{ formatCurrencyShort(monthlyRevenue) }}</h3>
              <p class="kpi-label uppercase">Monthly Billing</p>
              <p class="text-[8px] font-mono font-bold text-emerald-500 mt-2">{{ currentMonthName }} {{ currentYear }}</p>
            </div>
          </div>

          <!-- Weekly -->
          <div class="kpi-card-hero group border-l-4 border-l-amber-500">
            <div class="absolute top-0 right-0 bg-amber-50 border-b border-l border-amber-100 px-2 py-0.5 text-[8px] font-mono font-bold text-amber-600 uppercase tracking-widest z-20">THIS WEEK</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-amber-600 bg-amber-50">
                <i class="fas fa-calendar-week text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display text-amber-700">{{ formatCurrencyShort(weeklyRevenue) }}</h3>
              <p class="kpi-label uppercase">Weekly Velocity</p>
              <p class="text-[8px] font-mono font-bold text-amber-500 mt-2">LAST_7_DAYS</p>
            </div>
          </div>

          <!-- Clients -->
          <div class="kpi-card-hero group border-l-4 border-l-indigo-500">
            <div class="absolute top-0 right-0 bg-indigo-50 border-b border-l border-indigo-100 px-2 py-0.5 text-[8px] font-mono font-bold text-indigo-600 uppercase tracking-widest z-20">CLIENTS</div>
            <div class="flex items-center justify-between mb-4 relative z-10">
              <div class="kpi-icon-wrapper-hero text-indigo-600 bg-indigo-50">
                <i class="fas fa-users text-2xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="kpi-value-hero font-display text-indigo-700">{{ uniqueClientsCount }}</h3>
              <p class="kpi-label uppercase">Client Portfolio</p>
              <p class="text-[8px] font-mono font-bold text-indigo-500 mt-2">DIVERSIFICATION</p>
            </div>
          </div>
        </div>

        <!-- Charts -->
        <div v-if="showGraphs" class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div class="xl:col-span-2 bg-white border border-gray-100 shadow-sm p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <i class="fas fa-chart-column text-brand"></i>
                Invoice Histogram
              </h3>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">{{ analyticsPeriodLabel }}</span>
            </div>
            <div style="position:relative;height:300px;width:100%;">
              <canvas ref="invoiceTrendChartRef"></canvas>
            </div>
          </div>

          <div class="bg-white border border-gray-100 shadow-sm p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                <i class="fas fa-chart-pie text-brand"></i>
                Status Breakdown
              </h3>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Top Statuses</span>
            </div>
            <div style="position:relative;height:300px;width:100%;">
              <canvas ref="invoiceStatusChartRef"></canvas>
            </div>
          </div>
        </div>

        <!-- Filter & Search -->
        <div class="relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-sm">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <input v-model="searchQuery" type="text" placeholder="Search invoices..." class="w-full rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
              </div>
              <select v-model="statusFilter" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="credited">Credited</option>
                <option value="debited">Debited</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select v-model="dateFilter" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
                <option value="all">All Time</option>
                <option value="daily">Daily (Today)</option>
                <option value="yesterday">Yesterday</option>
                <option value="weekly">Weekly (Last 7 days)</option>
                <option value="monthly">Monthly (This Month)</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div v-if="dateFilter === 'custom'" class="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 p-3 border border-gray-100">
              <div class="flex items-center gap-2">
                <label class="text-[9px] font-mono font-bold text-gray-400 uppercase">From:</label>
                <input v-model="customStartDate" type="date" class="rounded-none border border-gray-200 px-3 py-1.5 text-xs focus:border-brand focus:ring-1 focus:ring-brand font-mono">
              </div>
              <div class="flex items-center gap-2">
                <label class="text-[9px] font-mono font-bold text-gray-400 uppercase">To:</label>
                <input v-model="customEndDate" type="date" class="rounded-none border border-gray-200 px-3 py-1.5 text-xs focus:border-brand focus:ring-1 focus:ring-brand font-mono">
              </div>
              <button @click="refreshData" class="text-[9px] font-mono font-bold text-brand hover:underline uppercase tracking-wider ml-auto">Apply Range</button>
            </div>
          </div>
        </div>

        <!-- Invoices Table -->
        <BulkActionsBar :count="selectionCount" @clear="clearSelection" @delete="bulkDelete" :deleting="bulkDeleting" />

        <div class="relative overflow-visible bg-white border border-gray-100 rounded-none shadow-sm">
          <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="py-3 px-3 text-center w-10">
                    <SelectAllCheckbox :model-value="allSelected" @update:model-value="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Number</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Client</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Due Date</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="inv in paginatedInvoices" :key="inv.id || inv._id" class="hover:bg-gray-50/50 transition-colors group" :class="{ 'bg-blue-50/40': isSelected(inv) }">
                  <td class="py-3 px-3 text-center">
                    <input type="checkbox" :checked="isSelected(inv)" @change="toggleSelect(inv, undefined, $event)" class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] cursor-pointer" />
                  </td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-[#2F2E8B] uppercase whitespace-nowrap">#{{ inv.invoiceNumber || inv.number || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-gray-700 uppercase min-w-[180px]">{{ inv.clientName || inv.client_name || 'Unknown' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500 whitespace-nowrap">{{ formatDate(inv.date) }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500 whitespace-nowrap">{{ formatDate(inv.dueDate || inv.due_date) }}</td>
                  <td class="py-3 px-4 text-right text-[10px] font-mono font-black text-gray-900 whitespace-nowrap">{{ formatWithSymbol(getInvoiceAmount(inv)) }}</td>
                  <td class="py-3 px-4 text-right">
                    <span :class="getStatusClass(inv.status)" class="text-[8px] font-mono font-black px-2 py-1 border uppercase">{{ inv.status || 'Draft' }}</span>
                    <span v-if="inv.paymentStatus === 'partial'" class="text-[8px] font-mono font-black px-2 py-1 border border-amber-400 bg-amber-50 text-amber-700 uppercase ml-1">
                      {{ formatWithSymbol(inv.remainingAmount || 0) }} DUE {{ formatDate(inv.remainingDueDate) }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button @click="viewInvoice(inv)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="View">
                        <i class="fas fa-eye text-xs"></i>
                      </button>
                      <button @click="editInvoice(inv)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit">
                        <i class="fas fa-edit text-xs"></i>
                      </button>
                      <button @click="openInvAttachments(inv)" class="p-1.5 flex items-center gap-0.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Payment Attachments">
                        <i class="fas fa-paperclip text-xs"></i>
                        <span v-if="inv.attachments && inv.attachments.length" class="text-[8px] font-mono font-black text-blue-600">{{ inv.attachments.length }}</span>
                      </button>
                      <button @click="downloadPDF(inv)" class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Download PDF">
                        <i class="fas fa-file-pdf text-xs"></i>
                      </button>
                      <button @click="makeCopy(inv)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="Make a Copy">
                        <i class="fas fa-copy text-xs"></i>
                      </button>
                      <button @click="convertToReceipt(inv)" class="p-1.5 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors" title="Convert to Receipt">
                        <i class="fas fa-receipt text-xs"></i>
                      </button>
                      <button @click="convertBackToQuotation(inv)" class="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Convert back to Quotation">
                        <i class="fas fa-undo-alt text-xs"></i>
                      </button>
                      <button @click="openMakeRecurringModal(inv)" class="p-1.5 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors" title="Make Recurring">
                        <i class="fas fa-redo text-xs"></i>
                      </button>
                      <button @click="openActionModal(inv)" class="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors" title="Credit/Debit / Delete">
                        <i class="fas fa-exchange-alt text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredInvoices.length === 0">
                  <td colspan="8" class="py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <i class="fas fa-file-invoice text-3xl text-gray-200 mb-3 block"></i>
                    NO_INVOICES_FOUND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="filteredInvoices.length > 0" class="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
            <div class="text-[9px] font-mono text-gray-400 uppercase">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredInvoices.length) }} of {{ filteredInvoices.length }}
            </div>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Prev</button>
              <span class="px-3 py-1 text-[9px] font-mono font-bold text-[#2F2E8B]">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Invoice Preview Modal -->
    <Teleport to="body">
      <div v-if="showPreviewModal" @click.self="showPreviewModal = false" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative">
          <!-- Brand Accent Top -->
          <div class="h-1.5 w-full bg-brand"></div>
          
          <div class="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center z-10">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase tracking-tight">Invoice Preview</h3>
            <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600 p-2 transition-colors"><i class="fas fa-times text-xl"></i></button>
          </div>
          
          <div v-if="selectedInvoice" class="p-8 md:p-12 bg-white min-h-full">
            <!-- Document Header: Logo & Company Info -->
            <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div class="flex items-center gap-4">
                <div v-if="brandPrefs.companyLogo || tenantDetails.company_logo" class="w-24 h-24 bg-gray-50 flex items-center justify-center p-2 border border-gray-100 shadow-sm">
                  <img :src="brandPrefs.companyLogo || tenantDetails.company_logo" class="max-w-full max-h-full object-contain" alt="Logo" />
                </div>
                <div>
                   <h2 class="text-2xl font-black tracking-tighter text-brand uppercase">{{ brandPrefs.companyName || tenantDetails.company_name || 'Your Company' }}</h2>
                   <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">Commercial Invoice</div>
                </div>
              </div>
              
              <div class="text-left md:text-right space-y-1">
                <p class="text-sm font-bold text-gray-900 uppercase">{{ tenantDetails.address || 'Company Address' }}</p>
                <p class="text-[11px] font-medium text-gray-500 uppercase">{{ tenantDetails.city }}{{ tenantDetails.city && tenantDetails.country ? ', ' : '' }}{{ tenantDetails.country }}</p>
                <p class="text-[11px] font-medium text-gray-500">Tel: {{ tenantDetails.phone_number || 'N/A' }}</p>
                <p class="text-[11px] font-mono font-bold text-brand uppercase">TPIN: {{ tenantDetails.tpin || 'N/A' }}</p>
              </div>
            </div>

            <!-- Invoice Basics -->
            <div class="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 pb-8 border-b border-gray-100">
              <div class="space-y-4">
                <div>
                  <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Document Index</p>
                  <p class="text-4xl font-black text-brand tracking-tighter">#{{ selectedInvoice.invoiceNumber || selectedInvoice.number || '—' }}</p>
                </div>
                <div class="flex gap-10">
                  <div>
                    <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Issue Date</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(selectedInvoice.date) }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Settlement Due</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(selectedInvoice.dueDate || selectedInvoice.due_date) }}</p>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div :class="getStatusClass(selectedInvoice.status)" class="inline-block text-xs font-mono font-black px-6 py-2 border-2 uppercase tracking-widest">{{ selectedInvoice.status || 'Draft' }}</div>
                <div v-if="selectedInvoice.paymentStatus === 'partial'" class="mt-3 bg-amber-50 border border-amber-300 p-3 text-left">
                  <p class="text-[9px] font-mono font-black text-amber-700 uppercase mb-1">⚠ Partial Payment</p>
                  <p class="text-[10px] font-mono text-amber-800">
                    Paid: <strong>{{ formatWithSymbol(selectedInvoice.partialAmount || 0) }}</strong> of {{ formatWithSymbol(selectedInvoice.fullTotal || selectedInvoice.total || 0) }}
                  </p>
                  <p class="text-[10px] font-mono text-amber-800">
                    Remaining: <strong>{{ formatWithSymbol(selectedInvoice.remainingAmount || 0) }}</strong>
                  </p>
                  <p v-if="selectedInvoice.remainingDueDate" class="text-[9px] font-mono text-amber-600">
                    Expected by: <strong>{{ formatDate(selectedInvoice.remainingDueDate) }}</strong>
                  </p>
                </div>
              </div>
            </div>

            <!-- Entity Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 min-w-0">
              <div class="bg-gray-50/50 p-6 border-l-4 border-brand min-w-0 overflow-hidden">
                <h4 class="text-[10px] font-mono font-black text-brand uppercase tracking-widest mb-4">Recipient Information</h4>
                <div class="space-y-3">
                  <div v-if="selectedInvoice.clientCompanyName || selectedInvoice.client_company_name">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Company</p>
                    <p class="text-base font-black text-gray-900 uppercase break-words">{{ selectedInvoice.clientCompanyName || selectedInvoice.client_company_name }}</p>
                  </div>
                  <div v-if="selectedInvoice.clientName || selectedInvoice.client_name">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Contact Person</p>
                    <p class="text-base font-black text-gray-900 uppercase break-words">{{ selectedInvoice.clientName || selectedInvoice.client_name }}</p>
                  </div>
                  <div v-if="selectedInvoice.clientEmail || selectedInvoice.client_email">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Contact Email</p>
                    <p class="text-sm font-bold text-gray-700">{{ selectedInvoice.clientEmail || selectedInvoice.client_email }}</p>
                  </div>
                  <div v-if="selectedInvoice.clientAddress || selectedInvoice.client_address">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Registered Address</p>
                    <p class="text-sm text-gray-600">{{ selectedInvoice.clientAddress || selectedInvoice.client_address }}</p>
                  </div>
                  <div v-if="selectedInvoice.clientTpin || selectedInvoice.client_tpin">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Client TPIN</p>
                    <p class="text-sm font-mono font-bold text-gray-700">{{ selectedInvoice.clientTpin || selectedInvoice.client_tpin }}</p>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedInvoice.momoNumber || selectedInvoice.bankAccount || selectedInvoice.accountName || selectedInvoice.swiftCode" class="p-6 border border-gray-100">
                <h4 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4">Settlement Channels</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-if="selectedInvoice.momoNumber || selectedInvoice.momo_number">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Mobile Payment</p>
                    <p class="text-sm font-black text-gray-800">{{ selectedInvoice.momoNumber || selectedInvoice.momo_number }}</p>
                  </div>
                  <div v-if="selectedInvoice.bankName || selectedInvoice.bank_name">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Institution</p>
                    <p class="text-sm font-black text-gray-800">{{ selectedInvoice.bankName || selectedInvoice.bank_name }}</p>
                  </div>
                  <div v-if="selectedInvoice.accountName || selectedInvoice.account_name">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Account Name</p>
                    <p class="text-sm font-black text-gray-800">{{ selectedInvoice.accountName || selectedInvoice.account_name }}</p>
                  </div>
                  <div v-if="selectedInvoice.bankAccount || selectedInvoice.bank_account">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Acc Number</p>
                    <p class="text-sm font-mono font-bold text-gray-800">{{ selectedInvoice.bankAccount || selectedInvoice.bank_account }}</p>
                  </div>
                  <div v-if="selectedInvoice.swiftCode || selectedInvoice.swift_code">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Swift Code</p>
                    <p class="text-sm font-mono font-bold text-gray-800">{{ selectedInvoice.swiftCode || selectedInvoice.swift_code }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Line Items Table -->
            <div class="mb-10 overflow-x-auto border border-gray-200">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-brand text-white">
                    <th class="py-4 px-6 text-[10px] font-mono font-black uppercase tracking-widest">Description of Services / Items</th>
                    <th class="py-4 px-4 text-center text-[10px] font-mono font-black uppercase tracking-widest w-24">Qty</th>
                    <th class="py-4 px-4 text-right text-[10px] font-mono font-black uppercase tracking-widest w-40">Unit Price</th>
                    <th class="py-4 px-6 text-right text-[10px] font-mono font-black uppercase tracking-widest w-40">Extension</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(item, idx) in selectedInvoice.items" :key="idx" class="hover:bg-gray-50/50 transition-colors">
                    <td class="py-4 px-6">
                      <p class="text-sm font-black text-gray-800 uppercase">{{ item.description }}</p>
                    </td>
                    <td class="py-4 px-4 text-center text-sm font-mono font-bold">{{ item.quantity || item.qty }}</td>
                    <td class="py-4 px-4 text-right text-sm font-mono">{{ formatWithSymbol(item.unitPrice || item.unit_price || item.price) }}</td>
                    <td class="py-4 px-6 text-right text-sm font-mono font-black text-gray-900">{{ formatWithSymbol((item.quantity || item.qty) * (item.unitPrice || item.unit_price || item.price)) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Financial Recap -->
            <div class="flex flex-col md:flex-row justify-between gap-10 mb-12">
              <div class="flex-1 max-w-lg">
                <div v-if="selectedInvoice.notes" class="bg-gray-50 p-6 rounded-none">
                  <h4 class="text-[10px] font-mono font-black text-brand uppercase tracking-widest mb-3">Terms & Conditions</h4>
                  <p class="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{{ selectedInvoice.notes }}</p>
                </div>
              </div>
              
              <div class="w-full md:w-96 space-y-3">
                <div class="flex justify-between items-center py-2 px-4">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Gross Subtotal</span>
                   <span class="text-sm font-mono font-bold text-gray-900">{{ formatWithSymbol(selectedInvoice.subtotal || getInvoiceAmount(selectedInvoice)) }}</span>
                </div>
                <div v-if="selectedInvoice.vat || selectedInvoice.tax" class="flex justify-between items-center py-2 px-4">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Tax ({{ selectedInvoice.taxType || selectedInvoice.tax_type || 'VAT' }})</span>
                  <span class="text-sm font-mono font-bold text-gray-900">{{ formatWithSymbol(selectedInvoice.vat || selectedInvoice.tax || 0) }}</span>
                </div>
                <div v-if="selectedInvoice.discountAmount || selectedInvoice.discount_amount" class="flex justify-between items-center py-2 px-4 bg-red-50">
                  <span class="text-[10px] font-mono font-black text-red-600 uppercase tracking-widest">Discount ({{ selectedInvoice.discountType === 'percentage' || selectedInvoice.discount_type === 'percentage' ? selectedInvoice.discount + '%' : 'Fixed' }})</span>
                  <span class="text-sm font-mono font-bold text-red-600">-{{ formatWithSymbol(selectedInvoice.discountAmount || selectedInvoice.discount_amount) }}</span>
                </div>
                <div class="flex justify-between items-center py-5 px-6 bg-brand text-white shadow-lg">
                  <span class="text-sm font-mono font-black uppercase tracking-tighter">Total Payable Amount</span>
                  <span class="text-2xl font-mono font-black">{{ formatWithSymbol(selectedInvoice.total || getInvoiceAmount(selectedInvoice)) }}</span>
                </div>
                <!-- Remaining Balance (partial payment) -->
                <div v-if="selectedInvoice.paymentStatus === 'partial'" class="flex justify-between items-center py-4 px-6 bg-amber-50 border-t-2 border-amber-400">
                  <div>
                    <span class="text-[10px] font-mono font-black text-amber-700 uppercase tracking-wider">Remaining Balance</span>
                    <p class="text-[9px] font-mono text-amber-600">Due by {{ formatDate(selectedInvoice.remainingDueDate) }}</p>
                  </div>
                  <span class="text-xl font-mono font-black text-amber-700">{{ formatWithSymbol(selectedInvoice.remainingAmount || 0) }}</span>
                </div>
              </div>
            </div>

            <!-- Action Toolbar -->
            <div class="flex flex-wrap gap-3 justify-end pt-8 border-t border-gray-100 no-print">
              <button @click="downloadPDF(selectedInvoice)" class="bg-brand hover:opacity-90 text-white px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all shadow-md active:scale-95">
                <i class="fas fa-file-pdf"></i> Generate PDF Document
              </button>
              <button @click="showPreviewModal = false; editInvoice(selectedInvoice)" class="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all">
                <i class="fas fa-edit"></i> Modify Record
              </button>
              <button @click="showPreviewModal = false" class="bg-white border border-gray-200 text-gray-700 hover:border-brand hover:text-brand px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all">
                Dismiss Preview
              </button>
            </div>
            
            <!-- Footer Attribution -->
            <div class="mt-12 text-center">
               <p class="text-[9px] font-mono text-gray-300 uppercase tracking-[0.2em]">Generated Securely via {{ brandPrefs.companyName || 'UB App' }} Cloud Systems</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
    
    <!-- Invoice Edit Modal -->
    <Teleport to="body">
      <div v-if="showEditModal" @click.self="closeEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">{{ editingInvoice ? 'Edit Invoice' : 'Create Invoice' }}</h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 text-xl">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form @submit.prevent="saveInvoice" class="p-4 sm:p-6 space-y-6">
            <!-- Company Details Section (From Settings - editable per invoice) -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <i class="fas fa-building text-[#2F2E8B]"></i> Company Details (From)
                </h4>
                <button v-if="!showCompanySection" @click="showCompanySection = true" type="button" class="text-[9px] font-mono font-bold text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-wider flex items-center gap-1">
                  <i class="fas fa-chevron-down text-[8px]"></i> Show
                </button>
                <button v-else @click="showCompanySection = false" type="button" class="text-[9px] font-mono font-bold text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-wider flex items-center gap-1">
                  <i class="fas fa-chevron-up text-[8px]"></i> Hide
                </button>
              </div>
              <!-- Collapsed summary -->
              <div v-if="!showCompanySection && formData.companyName" class="p-3 bg-brand/5 border border-brand/10 text-sm">
                <span class="font-bold text-gray-900">{{ formData.companyName }}</span>
                <span v-if="formData.companyEmail" class="text-gray-500 ml-2 font-mono text-xs">{{ formData.companyEmail }}</span>
                <span v-if="formData.companyPhone" class="text-gray-500 ml-2 font-mono text-xs">{{ formData.companyPhone }}</span>
              </div>
              <!-- Expanded form -->
              <div v-if="showCompanySection" class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-brand/5 border border-brand/10">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                  <input v-model="formData.companyName" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company Email</label>
                  <input v-model="formData.companyEmail" type="email" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company Phone</label>
                  <input v-model="formData.companyPhone" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company TPIN</label>
                  <input v-model="formData.companyTpin" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company Address</label>
                  <input v-model="formData.companyAddress" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B]">
                </div>
              </div>
            </div>

            <!-- ===== Mobile-responsive note: grid-cols-2/3 cards stack on small screens ===== -->
            <!-- Client Information Section -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-user-tie text-brand"></i> Client Information (Bill To)
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Contact Person</label>
                  <!-- Autocomplete: past invoice clients + CRM leads (if subscribed) -->
                  <div class="relative">
                    <input
                      v-model="formData.clientName"
                      @focus="clientSearchQuery = formData.clientName; clientDropdownOpen = true"
                      @input="clientSearchQuery = formData.clientName; clientDropdownOpen = true"
                      @blur="setTimeout(() => { clientDropdownOpen = false }, 180)"
                      type="text"
                      placeholder="e.g. John Banda"
                      class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"
                    />
                    <div v-if="clientDropdownOpen && clientSuggestions.length" class="absolute z-50 left-0 right-0 top-full bg-white border border-gray-200 shadow-lg max-h-52 overflow-y-auto">
                      <div
                        v-for="c in clientSuggestions"
                        :key="c.name + c.email"
                        @mousedown.prevent="selectClient(c)"
                        class="flex items-center justify-between px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                      >
                        <div>
                          <div class="text-xs font-mono font-bold text-gray-800">{{ c.name }}</div>
                          <div class="text-[9px] font-mono text-gray-400">{{ c.email }}{{ c.phone ? ' · ' + c.phone : '' }}</div>
                        </div>
                        <span class="text-[8px] font-mono font-bold uppercase ml-2" :class="c._source === 'crm' ? 'text-indigo-400' : 'text-gray-300'">{{ c._source === 'crm' ? 'CRM' : 'past' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                  <input v-model="formData.clientCompanyName" type="text" placeholder="e.g. Nexus Industries Ltd" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Client Email *</label>
                  <input v-model="formData.clientEmail" required type="email" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Phone</label>
                  <input v-model="formData.clientPhone" type="tel" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">TPIN</label>
                  <input v-model="formData.clientTpin" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-bold text-gray-700 mb-1">Address</label>
                  <textarea v-model="formData.clientAddress" rows="2" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"></textarea>
                </div>
              </div>
            </div>

            <!-- Invoice Details Section (responsive) -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-file-invoice text-brand"></i> Invoice Details
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Invoice Number</label>
                  <input v-model="formData.invoiceNumber" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm font-mono focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Date *</label>
                  <input v-model="formData.date" required type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Due Date *</label>
                  <input v-model="formData.dueDate" required type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select v-model="formData.status" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Tax Type</label>
                  <select v-model="formData.taxType" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="none">No Tax</option>
                    <option value="turnover">Turnover Tax (4%)</option>
                    <option value="vat16">VAT (16%)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Payment Type</label>
                  <select v-model="formData.paymentType" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="one-time">One-Time Payment</option>
                    <option value="recurring">Recurring Payment</option>
                  </select>
                </div>
              </div>
              <!-- Recurring Schedule (shown when recurring is selected) -->
              <div v-if="formData.paymentType === 'recurring'" class="mt-4 bg-brand/5 border border-brand/20 p-4 space-y-3">
                <h4 class="text-[9px] font-mono font-black text-brand uppercase tracking-wider">Recurring Schedule</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Frequency</label>
                    <select v-model="formData.recurringFrequency" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div v-if="formData.recurringFrequency === 'custom'">
                    <label class="block text-xs font-bold text-gray-700 mb-1">Every (days)</label>
                    <input v-model.number="formData.recurringInterval" type="number" min="1" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                    <input v-model="formData.recurringStartDate" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">End Date (optional)</label>
                    <input v-model="formData.recurringEndDate" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  </div>
                </div>
              </div>
            </div>

            <!-- Line Items Section -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-list text-brand"></i> Line Items
              </h4>
              <div class="space-y-4 sm:space-y-3">
                <div v-for="(item, idx) in formData.items" :key="idx"
                     class="grid grid-cols-12 gap-2 items-start border border-gray-100 sm:border-0 p-2 sm:p-0 bg-gray-50 sm:bg-transparent">
                  <!-- Description: full row on mobile, flexes on sm+ -->
                  <div class="col-span-12 sm:col-span-5 relative">
                    <label class="block sm:hidden text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Description</label>
                    <!-- Inventory picker (visible only when the tenant has the inventory module) -->
                    <template v-if="hasInventoryModule">
                      <div class="relative">
                        <input
                          v-model="item.description"
                          @focus="invItemDropdown[idx] = true; invItemSearch[idx] = item.description || ''"
                          @input="invItemSearch[idx] = item.description; invItemDropdown[idx] = true; item.item_id = null"
                          @blur="setTimeout(() => { invItemDropdown[idx] = false }, 180)"
                          placeholder="Type or search inventory…"
                          class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand pr-14"
                        />
                        <!-- "LINKED" badge when an inventory item is selected -->
                        <span v-if="item.item_id" class="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-mono font-bold uppercase text-indigo-500 pointer-events-none">LINKED</span>
                        <!-- Dropdown list -->
                        <div v-if="invItemDropdown[idx] && filteredInvItems(idx).length" class="absolute z-50 left-0 right-0 top-full bg-white border border-gray-200 shadow-lg max-h-52 overflow-y-auto">
                          <div
                            v-for="invRow in filteredInvItems(idx)"
                            :key="invRow._id || invRow.id"
                            @mousedown.prevent="selectInvItem(idx, invRow)"
                            class="flex items-center justify-between px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                          >
                            <span class="text-xs font-mono truncate max-w-[55%]">{{ invRow.name }}</span>
                            <span class="text-[9px] font-mono text-gray-400 whitespace-nowrap ml-2">
                              {{ invRow.type || 'product' }} · K{{ Number(invRow.sellingPrice || 0).toFixed(2) }}<span v-if="invRow.stockQty !== undefined"> · Qty: {{ invRow.stockQty }}</span>
                            </span>
                          </div>
                        </div>
                        <div v-else-if="invItemDropdown[idx] && !inventoryItems.length" class="absolute z-50 left-0 right-0 top-full bg-white border border-gray-200 shadow text-[10px] font-mono text-gray-400 px-3 py-2">No inventory items found</div>
                      </div>
                    </template>
                    <!-- Plain description input (no inventory module) -->
                    <input v-else v-model="item.description" placeholder="Description" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand" />
                  </div>
                  <div class="col-span-4 sm:col-span-2">
                    <label class="block sm:hidden text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Qty</label>
                    <input v-model.number="item.quantity" type="number" min="1" placeholder="Qty" class="w-full border border-gray-300 rounded-none px-2 sm:px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  </div>
                  <div class="col-span-4 sm:col-span-2">
                    <label class="block sm:hidden text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Unit Price</label>
                    <input v-model.number="item.unitPrice" type="number" step="0.01" min="0" placeholder="Unit Price" class="w-full border border-gray-300 rounded-none px-2 sm:px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  </div>
                  <div class="col-span-3 sm:col-span-2">
                    <label class="block sm:hidden text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Total</label>
                    <input :value="formatNumber((item.quantity || 0) * (item.unitPrice || 0))" disabled class="w-full border border-gray-200 bg-gray-50 rounded-none px-2 sm:px-3 py-2 text-sm font-mono text-gray-600">
                  </div>
                  <div class="col-span-1 flex sm:items-start justify-end">
                    <button @click="removeItem(idx)" type="button" class="p-2 text-red-600 hover:bg-red-50 transition-colors mt-0 sm:mt-0" aria-label="Remove item">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              <button @click="addItem" type="button" class="mt-3 text-[10px] font-mono font-bold text-brand hover:opacity-80 uppercase tracking-wider flex items-center gap-2">
                <i class="fas fa-plus-circle"></i> Add Item
              </button>
            </div>

            <!-- Payment Details Section (Optional) -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-money-bill-wave text-brand"></i> Payment Details (Optional)
              </h4>
              <!-- Saved Bank Account selector -->
              <div class="mb-4">
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-bold text-gray-700">Use Saved Bank Account</label>
                  <router-link to="/dashboard/invoicing/bank-accounts"
                    class="text-[10px] font-mono font-bold text-brand hover:opacity-80 uppercase tracking-wider">
                    <i class="fas fa-cog mr-1"></i>Manage
                  </router-link>
                </div>
                <select v-model="formData.bank_account_id" @change="applyBankAccount"
                  class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  <option value="">— None (fill manually) —</option>
                  <option v-for="acc in bankAccounts" :key="acc.id" :value="acc.id">
                    {{ acc.label || acc.bank_name || acc.account_number }}{{ acc.is_default ? ' (default)' : '' }}
                  </option>
                </select>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Mobile Money Number</label>
                  <input v-model="formData.momoNumber" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Bank Name</label>
                  <input v-model="formData.bankName" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Account Name</label>
                  <input v-model="formData.accountName" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand" placeholder="Account holder name">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Account Number</label>
                  <input v-model="formData.bankAccount" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Swift Code</label>
                  <input v-model="formData.swiftCode" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand" placeholder="e.g. ZANAZMLX">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Bank Code</label>
                  <input v-model="formData.bankCode" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Sort Code</label>
                  <input v-model="formData.sortCode" type="text" placeholder="e.g. 12-34-56" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
              </div>
            </div>

            <!-- Proof of Payment Attachments -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-paperclip text-brand"></i> Proof of Payment (Optional)
              </h4>
              <div
                class="border-2 border-dashed border-gray-200 rounded p-4 text-center cursor-pointer hover:border-brand transition-colors"
                @click="$refs.invAttachInput.click()"
                @dragover.prevent
                @drop.prevent="onInvAttachDrop"
              >
                <i class="fas fa-paperclip text-gray-300 text-xl mb-1"></i>
                <p class="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Drop files here or click to browse</p>
                <p class="text-[8px] font-mono text-gray-300 mt-1">PDF, JPG, PNG · max 5 MB each</p>
              </div>
              <input ref="invAttachInput" type="file" accept="application/pdf,image/*" multiple class="hidden" @change="onInvAttachSelect" />
              <!-- Staged files -->
              <div v-if="invStagedFiles.length" class="mt-2 space-y-1">
                <div v-for="(f, i) in invStagedFiles" :key="i" class="flex items-center justify-between px-3 py-1.5 bg-gray-50 border border-gray-100 text-[9px] font-mono">
                  <span class="flex items-center gap-2 text-gray-700">
                    <i :class="f.type === 'application/pdf' ? 'fas fa-file-pdf text-red-500' : 'fas fa-image text-blue-500'"></i>
                    {{ f.name }}
                  </span>
                  <button type="button" @click.stop="invStagedFiles.splice(i,1)" class="text-gray-300 hover:text-red-500"><i class="fas fa-times text-xs"></i></button>
                </div>
              </div>
              <!-- Already-saved attachments when editing -->
              <div v-if="editingInvoice && formData.attachments && formData.attachments.length" class="mt-2">
                <p class="text-[8px] font-mono text-gray-400 uppercase mb-1">Existing attachments</p>
                <div v-for="(a, i) in formData.attachments" :key="i" class="flex items-center justify-between px-3 py-1.5 bg-blue-50 border border-blue-100 text-[9px] font-mono">
                  <span class="flex items-center gap-2 text-blue-700 cursor-pointer hover:underline" @click="previewSingleInvAttachment(a)">
                    <i :class="a.type === 'application/pdf' ? 'fas fa-file-pdf text-red-500' : 'fas fa-image text-blue-500'"></i>
                    {{ a.name }}
                  </span>
                  <button type="button" @click.stop="deleteInvAttachment(editingInvoice.id || editingInvoice._id, i)" class="text-gray-300 hover:text-red-500"><i class="fas fa-times text-xs"></i></button>
                </div>
              </div>
            </div>

            <!-- Notes Section -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <i class="fas fa-sticky-note text-brand"></i> Notes / Additional Information
                </h4>
                <button @click="enhanceWithAI" :disabled="enhancingNotes" type="button" class="text-[9px] font-mono font-bold text-white bg-brand hover:opacity-90 px-3 py-1.5 uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-sm">
                  <i class="fas" :class="enhancingNotes ? 'fa-spinner fa-spin' : 'fa-magic'"></i>
                  {{ enhancingNotes ? 'Enhancing...' : 'Enhance with AI' }}
                </button>
              </div>
              <textarea v-model="formData.notes" rows="3" placeholder="Additional notes or comments... Click 'Enhance with AI' to auto-generate professional notes." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"></textarea>
            </div>

            <!-- Total Preview -->
            <div class="flex justify-end">
              <div class="w-full sm:w-96 p-4 bg-gray-50 border border-gray-200">
                <div class="flex justify-between py-2">
                  <span class="text-sm font-mono text-gray-600">Subtotal:</span>
                  <span class="text-sm font-mono font-bold text-gray-900">{{ formatWithSymbol(calculateSubtotal()) }}</span>
                </div>
                <!-- Discount -->
                <div class="flex justify-between items-center py-2 border-t border-gray-200">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-mono text-gray-600">Discount:</span>
                    <div class="flex items-center">
                      <input v-model.number="formData.discount" type="number" min="0" step="0.01" class="w-16 border border-gray-300 rounded-none px-2 py-1 text-xs font-mono text-center focus:border-brand focus:ring-1 focus:ring-brand">
                      <select v-model="formData.discountType" class="border border-gray-300 border-l-0 rounded-none px-1 py-1 text-xs font-mono focus:border-brand focus:ring-1 focus:ring-brand">
                        <option value="percentage">%</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                  </div>
                  <span v-if="calculateDiscountAmount() > 0" class="text-sm font-mono font-bold text-red-600">-{{ formatWithSymbol(calculateDiscountAmount()) }}</span>
                  <span v-else class="text-sm font-mono text-gray-400">—</span>
                </div>
                <!-- Tax -->
                <div v-if="formData.taxType !== 'none'" class="flex justify-between py-2 border-t border-gray-200">
                  <span class="text-sm font-mono text-gray-600">{{ getTaxLabel() }}:</span>
                  <span class="text-sm font-mono font-bold text-gray-900">+{{ formatWithSymbol(calculateTaxAmount()) }}</span>
                </div>
                <div class="flex justify-between py-3 border-t-2 border-gray-900">
                  <span class="text-lg font-mono font-black text-gray-900 uppercase">Total:</span>
                  <span class="text-2xl font-mono font-black text-brand">{{ formatWithSymbol(calculateTotal()) }}</span>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-col sm:flex-row gap-3 sm:justify-end pt-4 border-t border-gray-200">
              <button @click="closeEditModal" type="button" class="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase transition-colors">
                Cancel
              </button>
              <button type="submit" :disabled="saving" class="w-full sm:w-auto bg-brand hover:opacity-90 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i> 
                {{ saving ? 'Saving...' : (editingInvoice ? 'Update Invoice' : 'Create Invoice') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Make Recurring Modal -->
    <Teleport to="body">
      <div v-if="showRecurringModal" @click.self="showRecurringModal = false" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-lg w-full overflow-auto">
          <div class="h-1.5 w-full bg-emerald-600"></div>
          <div class="p-5 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-base font-black text-gray-900 font-display uppercase">Make Recurring</h3>
              <p class="text-[10px] font-mono text-gray-400 uppercase mt-0.5">
                {{ recurringSource?.clientName || recurringSource?.client_name }} &bull; #{{ recurringSource?.invoiceNumber || recurringSource?.number }}
              </p>
            </div>
            <button @click="showRecurringModal = false" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>
          <div class="p-5 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Frequency *</label>
                <select v-model="recurringForm.frequency" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Every (interval)</label>
                <input v-model.number="recurringForm.interval" type="number" min="1" max="12"
                  class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Start Date *</label>
                <input v-model="recurringForm.start_date" type="date" required
                  class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">End Date <span class="text-gray-400 font-normal">(optional)</span></label>
                <input v-model="recurringForm.end_date" type="date"
                  class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
              </div>
            </div>
            <p class="text-[10px] font-mono text-gray-500 bg-gray-50 border border-gray-100 p-3">
              <i class="fas fa-info-circle text-brand mr-1"></i>
              This will create a recurring schedule from the selected invoice. Each cycle a new versioned copy is generated (e.g. <strong>{{ recurringForm.invoiceNumber || 'INV-001' }}-R001</strong>, <strong>-R002</strong> …).
              View and manage all copies in <strong>Recurring Invoices</strong>.
            </p>
          </div>
          <div class="p-5 border-t border-gray-200 flex gap-3 justify-end">
            <button @click="showRecurringModal = false"
              class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 text-[10px] font-bold font-mono uppercase">
              Cancel
            </button>
            <button @click="saveAsRecurring" :disabled="savingRecurring"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-[10px] font-bold font-mono uppercase flex items-center gap-2 disabled:opacity-50">
              <i :class="savingRecurring ? 'fas fa-spinner fa-spin' : 'fas fa-redo'"></i>
              {{ savingRecurring ? 'Creating...' : 'Create Recurring' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Invoice Attachment Preview Modal -->
    <Teleport to="body">
      <div v-if="invPreviewInvoice" class="fixed inset-0 z-[10002] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="invPreviewInvoice = null"></div>
        <div class="bg-white w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative z-10 border border-gray-100">
          <!-- Header -->
          <div class="h-1 w-full bg-brand"></div>
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div>
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Proof of Payment</div>
              <div class="text-sm font-mono font-black text-gray-900 uppercase mt-0.5">
                #{{ invPreviewInvoice.invoiceNumber || invPreviewInvoice.number || '—' }} · {{ invPreviewInvoice.clientName || invPreviewInvoice.client_name }}
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-[10px] font-mono font-black text-brand">{{ formatWithSymbol(getInvoiceAmount(invPreviewInvoice)) }}</span>
              <button @click="invPreviewInvoice = null" class="text-gray-400 hover:text-red-500"><i class="fas fa-times"></i></button>
            </div>
          </div>
          <!-- Body -->
          <div class="flex-1 overflow-y-auto p-6">
            <div v-if="invPreviewLoading" class="flex items-center justify-center py-16">
              <i class="fas fa-spinner fa-spin text-brand text-2xl"></i>
            </div>
            <div v-else-if="!invPreviewAttachments.length" class="flex flex-col items-center justify-center py-16 text-gray-300">
              <i class="fas fa-paperclip text-4xl mb-3"></i>
              <p class="text-[10px] font-mono uppercase tracking-widest">No attachments yet</p>
              <button @click="openInvEditFromPreview" class="mt-4 px-4 py-2 border border-brand text-[9px] font-mono font-bold text-brand uppercase hover:bg-brand/5 transition-colors">
                <i class="fas fa-plus-circle mr-1"></i> Add Attachment
              </button>
            </div>
            <div v-else class="space-y-4">
              <div v-for="(att, i) in invPreviewAttachments" :key="i" class="border border-gray-100 rounded overflow-hidden">
                <!-- PDF -->
                <div v-if="att.type === 'application/pdf'">
                  <div class="flex items-center justify-between px-4 py-2 bg-red-50 border-b border-red-100">
                    <span class="text-[9px] font-mono font-bold text-red-600 flex items-center gap-2"><i class="fas fa-file-pdf"></i> {{ att.name }}</span>
                    <div class="flex gap-2">
                      <a :href="att.data" :download="att.name" class="text-[8px] font-mono text-gray-500 hover:text-brand px-2 py-1 border border-gray-200 hover:border-brand">
                        <i class="fas fa-download mr-1"></i>Download
                      </a>
                      <button @click="deleteInvAttachment(invPreviewInvoice.id || invPreviewInvoice._id, i, true)" class="text-[8px] font-mono text-gray-300 hover:text-red-500 px-2 py-1 border border-gray-200 hover:border-red-300">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <iframe :src="att.data" class="w-full" style="height:500px"></iframe>
                </div>
                <!-- Image -->
                <div v-else>
                  <div class="flex items-center justify-between px-4 py-2 bg-blue-50 border-b border-blue-100">
                    <span class="text-[9px] font-mono font-bold text-blue-600 flex items-center gap-2"><i class="fas fa-image"></i> {{ att.name }}</span>
                    <div class="flex gap-2">
                      <a :href="att.data" :download="att.name" class="text-[8px] font-mono text-gray-500 hover:text-brand px-2 py-1 border border-gray-200 hover:border-brand">
                        <i class="fas fa-download mr-1"></i>Download
                      </a>
                      <button @click="deleteInvAttachment(invPreviewInvoice.id || invPreviewInvoice._id, i, true)" class="text-[8px] font-mono text-gray-300 hover:text-red-500 px-2 py-1 border border-gray-200 hover:border-red-300">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <img :src="att.data" :alt="att.name" class="w-full object-contain max-h-96" />
                </div>
              </div>
            </div>
          </div>
          <!-- Footer -->
          <div class="px-6 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <span class="text-[9px] font-mono text-gray-400 uppercase">{{ invPreviewAttachments.length }} attachment{{ invPreviewAttachments.length !== 1 ? 's' : '' }}</span>
            <button @click="openInvEditFromPreview" class="px-4 py-2 text-[9px] font-mono font-bold text-white bg-brand hover:opacity-90 uppercase">
              <i class="fas fa-plus-circle mr-1"></i> Add More
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ========== ACTION MODAL (Credit Note / Debit Note / Delete) ========== -->
    <Teleport to="body">
      <div v-if="showActionModal" class="fixed inset-0 z-[200] flex items-center justify-center" @click.self="closeActionModal">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-md mx-4 animate-fade-in-up">
          <!-- Modal Header -->
          <div class="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1.5 h-6 bg-purple-500 rounded-none"></div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Invoice Action</p>
                <h3 class="text-sm font-black text-gray-900 uppercase font-display">
                  #{{ actionInvNumber }}
                </h3>
              </div>
            </div>
            <button @click="closeActionModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <i class="fas fa-times text-lg"></i>
            </button>
          </div>

          <div class="px-6 py-5 space-y-4">
            <!-- Client info -->
            <div v-if="actionInv" class="bg-gray-50 border border-gray-100 p-3 text-[10px] font-mono">
              <span class="text-gray-500 uppercase tracking-wider">Client: </span>
              <span class="font-bold text-gray-900">{{ actionInv.clientName || actionInv.client_name || 'Unknown' }}</span>
              <span class="text-gray-300 mx-2">|</span>
              <span class="text-gray-500 uppercase tracking-wider">Amount: </span>
              <span class="font-bold text-[#2F2E8B]">{{ formatWithSymbol(actionInv.total || 0) }}</span>
            </div>

            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Choose an action:</p>

            <!-- Option 1: Credit Note -->
            <button @click="confirmCreditNote(actionInv)" class="w-full text-left p-4 border border-gray-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all group flex items-start gap-4">
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
            <button @click="confirmDebitNote(actionInv)" class="w-full text-left p-4 border border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all group flex items-start gap-4">
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
              <button @click="confirmDeletePermanent(actionInv)" class="w-full text-left p-4 border border-red-200 hover:border-red-400 hover:bg-red-50 transition-all group flex items-start gap-4">
                <div class="w-10 h-10 bg-red-100 group-hover:bg-red-200 flex items-center justify-center flex-shrink-0 transition-colors">
                  <i class="fas fa-trash text-red-600"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[11px] font-mono font-black text-red-700 uppercase tracking-wider">Delete Permanently</p>
                  <p class="text-[9px] font-mono text-gray-500 mt-0.5 leading-tight">
                    <strong class="text-red-600">Remove from system</strong> — This action cannot be undone.
                    The invoice will be permanently deleted.
                  </p>
                </div>
                <i class="fas fa-chevron-right text-gray-300 group-hover:text-red-500 self-center transition-colors"></i>
              </button>
            </div>
          </div>

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
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import { useCurrency } from '@/composables/useCurrency.js';
import { BackButton, BulkActionsBar, SelectAllCheckbox } from '@/components/ui';
import { useBulkSelect } from '@/composables/useBulkSelect';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Chart from 'chart.js/auto';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import { useAudit } from '@/config/useAudit.js';
import { usePreferences } from '@/config/usePreferences.js';
import AIEnhanceButton from '@/components/AIEnhanceButton.vue';
import { listBankAccounts } from '@/api_services/bank_accounts_api.js';

const router = useRouter();
const route = useRoute();
const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getToken, getUserRole, getUserEmail } = decodeJWT();
const { logAudit } = useAudit();
const { formatCurrency, currencySymbol } = useCurrency();
const brandStore = usePreferences();
const brandPrefs = brandStore.preferences;
const fetchPreferences = brandStore.fetchPreferences;
const tenantDetails = ref({});

const formatNumber = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try { if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n); return `${currencySymbol.value || 'K'}${formatNumber(n)}`; } catch (e) { return `${currencySymbol.value || 'K'}${formatNumber(n)}`; }
};

const formatCurrencyShort = (val) => {
  const n = Number(val) || 0;
  const sym = currencySymbol.value || 'K';
  if (n >= 1_000_000) return `${sym} ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${sym} ${(n / 1_000).toFixed(1)}K`;
  return `${sym} ${formatNumber(n)}`;
};

const hexToRgb = (hex) => {
  if (!hex || hex[0] !== '#') return [47, 46, 139]; // Default brand blue
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const loadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

useActivityTracker({ userId: getUserEmail(), tenantId: getTenantId(), module: 'invoices-page' });

// State
const loading = ref(false);
const invoices = ref([]);
const branches = ref([]);
const selectedBranch = ref(null);
const searchQuery = ref('');
const statusFilter = ref('all');
const dateFilter = ref('all');
const customStartDate = ref('');
const customEndDate = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(20);
const showKpis = ref(true);
const showGraphs = ref(false);

// Analytics period controls
const formatDateInput = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const analyticsPeriod = ref('month');
const analyticsCustomStartDate = ref(formatDateInput(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
const analyticsCustomEndDate = ref(formatDateInput(new Date()));

const currentMonthName = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
const currentYear = new Date().getFullYear();

const invoiceTrendChartRef = ref(null);
const invoiceStatusChartRef = ref(null);
let invoiceTrendChart = null;
let invoiceStatusChart = null;

// Multi-select state
const bulkDeleting = ref(false);

const {
  selectedIds, selectionCount, isSelected, isAllPageSelected,
  toggleSelect, toggleSelectAll, clearSelection
} = useBulkSelect();

const allSelected = computed(() => isAllPageSelected(filteredInvoices.value));

const bulkDelete = async () => {
  const count = selectedIds.value.size;
  if (!count) return;
  if (!confirm(`Are you sure you want to delete ${count} invoice(s)? This action cannot be undone.`)) return;

  bulkDeleting.value = true;
  try {
    const tenantId = getTenantId();
    const response = await fetch(`${API_BASE_URL}/invoices/bulk-delete?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ invoice_ids: [...selectedIds.value] })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.detail || 'Bulk delete failed');
    }
    const result = await response.json();
    invoices.value = invoices.value.filter(inv => !selectedIds.value.has(inv.id || inv._id));
    clearSelection();
    await logAudit('delete', 'invoices', { resource_type: 'bulk_invoices', count });
    alert(result.message || `${count} invoice(s) deleted.`);
  } catch (err) {
    console.error(err);
    alert(err?.message || 'Bulk delete failed');
  } finally {
    bulkDeleting.value = false;
  }
};
const showPreviewModal = ref(false);
const showEditModal = ref(false);
const selectedInvoice = ref(null);
const editingInvoice = ref(null);
const saving = ref(false);
const showCompanySection = ref(false);
const enhancingNotes = ref(false);

// ── Payment Attachment state ──────────────────────────────────────────────────
const invStagedFiles = ref([]);          // Files staged in the edit form
const invAttachInput = ref(null);        // Hidden file input ref
const invPreviewInvoice = ref(null);     // Invoice whose attachments are shown
const invPreviewAttachments = ref([]);
const invPreviewLoading = ref(false);

const onInvAttachSelect = (evt) => {
  invStagedFiles.value.push(...Array.from(evt.target.files || []));
  evt.target.value = '';
};

const onInvAttachDrop = (evt) => {
  invStagedFiles.value.push(...Array.from(evt.dataTransfer.files || []).filter(
    f => f.type === 'application/pdf' || f.type.startsWith('image/')
  ));
};

const openInvAttachments = async (inv) => {
  invPreviewInvoice.value = inv;
  invPreviewAttachments.value = [];
  invPreviewLoading.value = true;
  try {
    const res = await fetch(
      `${API_BASE_URL}/invoices/${inv.id || inv._id}/attachments?tenant_id=${getTenantId()}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (res.ok) {
      const data = await res.json();
      invPreviewAttachments.value = data.attachments || [];
    }
  } catch (e) { console.error(e); }
  finally { invPreviewLoading.value = false; }
};

const previewSingleInvAttachment = (att) => {
  const w = window.open();
  if (att.type === 'application/pdf') {
    w.document.write(`<iframe src="${att.data}" style="width:100%;height:100vh;border:none"></iframe>`);
  } else {
    w.document.write(`<img src="${att.data}" style="max-width:100%;margin:auto;display:block" />`);
  }
};

const openInvEditFromPreview = () => {
  const inv = invPreviewInvoice.value;
  invPreviewInvoice.value = null;
  if (inv) editInvoice(inv);
};

const deleteInvAttachment = async (invoiceId, index, fromPreview = false) => {
  if (!confirm('Remove this attachment?')) return;
  try {
    const res = await fetch(
      `${API_BASE_URL}/invoices/${invoiceId}/attachments/${index}?tenant_id=${getTenantId()}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (res.ok) {
      if (fromPreview) {
        invPreviewAttachments.value.splice(index, 1);
        const inv = invoices.value.find(i => (i.id || i._id) === invoiceId);
        if (inv && inv.attachments) inv.attachments.splice(index, 1);
      } else if (formData.value.attachments) {
        formData.value.attachments.splice(index, 1);
      }
    }
  } catch (e) { console.error(e); }
};

const uploadInvStagedFiles = async (invoiceId) => {
  if (!invStagedFiles.value.length) return;
  const fd = new FormData();
  invStagedFiles.value.forEach(f => fd.append('files', f));
  try {
    const res = await fetch(
      `${API_BASE_URL}/invoices/${invoiceId}/attachments?tenant_id=${getTenantId()}`,
      { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd }
    );
    if (!res.ok) console.error('Invoice attachment upload failed:', res.status);
  } catch (e) { console.error(e); }
  invStagedFiles.value = [];
};
// ──────────────────────────────────────────────────────────────────────────────

// Cached tenant company details (fetched once, used as defaults)
const cachedCompanyDetails = ref({
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  companyTpin: '',
  companyAddress: ''
});

// ── Inventory integration (only active when tenant has the inventory module) ────
const hasInventoryModule = ref(false);
const inventoryItems = ref([]);        // flat list of inventory items
const invItemSearch = ref([]);         // per-line-item search strings
const invItemDropdown = ref([]);       // per-line-item dropdown open flags

async function loadInventoryModule() {
  try {
    const tenantId = getTenantId();
    const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${tenantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    const modules = data.modules || [];
    hasInventoryModule.value = modules.includes('inventory');
  } catch (e) { console.error('Failed to check inventory module', e); }
}

async function loadInventoryItems() {
  if (!hasInventoryModule.value) return;
  try {
    const tenantId = getTenantId();
    const res = await fetch(`${API_BASE_URL}/inventory?tenant_id=${tenantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    inventoryItems.value = (Array.isArray(data) ? data : data.items || []);
  } catch (e) { console.error('Failed to load inventory items', e); }
}

function filteredInvItems(idx) {
  const q = (invItemSearch.value[idx] || '').toLowerCase();
  if (!q) return inventoryItems.value.slice(0, 50);
  return inventoryItems.value.filter(it =>
    (it.name || '').toLowerCase().includes(q) ||
    (it.sku || '').toLowerCase().includes(q) ||
    (it.partNumber || '').toLowerCase().includes(q)
  ).slice(0, 50);
}

function selectInvItem(idx, item) {
  const line = formData.value.items[idx];
  if (!line) return;
  line.description = item.name || item.partNumber || '';
  line.unitPrice = item.sellingPrice || item.buyingPrice || 0;
  line.item_id = item._id || item.id || null;
  line.item_type = item.type || 'product';
  invItemSearch.value[idx] = line.description;
  invItemDropdown.value[idx] = false;
}

function syncInvSearch(idx) {
  invItemSearch.value[idx] = formData.value.items[idx]?.description || '';
}

// ── Client autocomplete (past invoice clients + CRM leads if module active) ──
const hasCrmModule = ref(false);
const crmLeads = ref([]);
const clientDropdownOpen = ref(false);
const clientSearchQuery = ref('');

async function loadCrmModule() {
  try {
    const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${getTenantId()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    hasCrmModule.value = (data.modules || []).includes('crm');
  } catch (e) { /* non-fatal */ }
}

async function loadCrmLeads() {
  if (!hasCrmModule.value) return;
  try {
    const res = await fetch(`${API_BASE_URL}/crm/leads?tenant_id=${getTenantId()}&limit=500`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    crmLeads.value = (data.leads || data || []).map(l => ({
      name: l.name || '',
      email: l.email || '',
      phone: l.phone || '',
      tpin: l.tpin || '',
      address: l.address || (l.city ? `${l.city}${l.country ? ', ' + l.country : ''}` : ''),
      _source: 'crm'
    }));
  } catch (e) { /* non-fatal */ }
}

// Unique clients built from already-loaded invoices (always available, no module needed)
const pastInvoiceClients = computed(() => {
  const seen = new Set();
  const result = [];
  for (const inv of invoices.value) {
    const name = inv.clientName || inv.client_name || '';
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({
      name,
      email: inv.clientEmail || inv.client_email || '',
      phone: inv.clientPhone || inv.client_phone || '',
      tpin: inv.clientTpin || inv.client_tpin || '',
      address: inv.clientAddress || inv.client_address || '',
      _source: 'past'
    });
  }
  return result;
});

const clientSuggestions = computed(() => {
  const q = clientSearchQuery.value.toLowerCase();
  const merged = [...pastInvoiceClients.value];
  // Merge CRM leads, skip duplicates (match by name)
  const existingNames = new Set(merged.map(c => c.name.toLowerCase()));
  for (const lead of crmLeads.value) {
    if (!existingNames.has(lead.name.toLowerCase())) merged.push(lead);
  }
  if (!q) return merged.slice(0, 50);
  return merged.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.phone.includes(q)
  ).slice(0, 50);
});

function selectClient(client) {
  formData.value.clientName = client.name;
  formData.value.clientEmail = client.email;
  formData.value.clientPhone = client.phone;
  formData.value.clientTpin = client.tpin;
  formData.value.clientAddress = client.address;
  clientSearchQuery.value = client.name;
  clientDropdownOpen.value = false;
}

// Form data
const formData = ref({
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  companyTpin: '',
  companyAddress: '',
  clientName: '',
  clientCompanyName: '',
  clientEmail: '',
  clientPhone: '',
  clientTpin: '',
  clientAddress: '',
  invoiceNumber: '',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  status: 'draft',
  items: [{ description: '', quantity: 1, unitPrice: 0, item_id: null, item_type: null }],
  taxType: 'none',
  discount: 0,
  discountType: 'percentage',
  momoNumber: '',
  bankName: '',
  accountName: '',
  bankAccount: '',
  swiftCode: '',
  bankCode: '',
  sortCode: '',
  bank_account_id: '',
  notes: '',
  paymentType: 'one-time',
  recurringFrequency: 'monthly',
  recurringInterval: 1,
  recurringStartDate: new Date().toISOString().split('T')[0],
  recurringEndDate: ''
});

// Saved bank accounts (selectable from Payment Details)
const bankAccounts = ref([]);
async function loadBankAccounts() {
  try {
    const tenantId = getTenantId();
    const data = await listBankAccounts(tenantId);
    bankAccounts.value = data.bank_accounts || [];
  } catch (err) {
    console.error('Failed to load bank accounts', err);
    bankAccounts.value = [];
  }
}
function applyBankAccount() {
  const acc = bankAccounts.value.find((a) => a.id === formData.value.bank_account_id);
  if (!acc) return;
  formData.value.momoNumber = acc.momo_number || '';
  formData.value.bankName = acc.bank_name || '';
  formData.value.accountName = acc.account_name || '';
  formData.value.bankAccount = acc.account_number || '';
  formData.value.swiftCode = acc.swift_code || '';
  formData.value.bankCode = acc.bank_code || '';
  formData.value.sortCode = acc.sort_code || '';
}

// ── Recurring invoice quick-setup ─────────────────────────────────────────────
const showRecurringModal = ref(false);
const recurringSource = ref(null);
const savingRecurring = ref(false);
const recurringForm = ref({
  frequency: 'monthly',
  interval: 1,
  start_date: new Date().toISOString().split('T')[0],
  end_date: '',
  invoiceNumber: '',
});

function openMakeRecurringModal(inv) {
  recurringSource.value = inv;
  recurringForm.value = {
    frequency: 'monthly',
    interval: 1,
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    invoiceNumber: inv.invoiceNumber || inv.number || '',
  };
  showRecurringModal.value = true;
}

async function saveAsRecurring() {
  if (!recurringSource.value) return;
  savingRecurring.value = true;
  try {
    const inv = recurringSource.value;
    const payload = {
      frequency: recurringForm.value.frequency,
      interval: recurringForm.value.interval,
      start_date: recurringForm.value.start_date,
      end_date: recurringForm.value.end_date || null,
      clientName: inv.clientName || inv.client_name || '',
      clientEmail: inv.clientEmail || inv.client_email || '',
      clientPhone: inv.clientPhone || inv.client_phone || '',
      clientAddress: inv.clientAddress || inv.client_address || '',
      clientTpin: inv.clientTpin || inv.client_tpin || '',
      companyName: inv.companyName || inv.company_name || '',
      companyEmail: inv.companyEmail || inv.company_email || '',
      companyPhone: inv.companyPhone || inv.company_phone || '',
      companyTpin: inv.companyTpin || inv.company_tpin || '',
      companyAddress: inv.companyAddress || inv.company_address || '',
      invoiceNumber: recurringForm.value.invoiceNumber || inv.invoiceNumber || inv.number || '',
      items: (inv.items || []).map(it => ({
        description: it.description || '',
        quantity: it.quantity || it.qty || 1,
        unitPrice: it.unitPrice || it.unit_price || it.price || 0,
      })),
      taxType: inv.taxType || inv.tax_type || 'none',
      discount: inv.discount || 0,
      discountType: inv.discountType || inv.discount_type || 'percentage',
      notes: inv.notes || '',
      subtotal: inv.subtotal || null,
      vat: inv.vat || null,
      total: inv.total || null,
    };
    const tenantId = getTenantId();
    const r = await fetch(`${API_BASE_URL}/recurring-invoices/?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data?.detail || 'Failed to create recurring invoice');
    showRecurringModal.value = false;
    alert('Recurring invoice created! Manage it from the Recurring Invoices page.');
    router.push('/dashboard/invoicing/recurring');
  } catch (e) {
    alert(e.message || 'Failed to create recurring invoice');
  } finally {
    savingRecurring.value = false;
  }
}
// ── end recurring ─────────────────────────────────────────────────────────────


const totalValue = computed(() => filteredInvoices.value.reduce((sum, inv) => sum + getInvoiceAmount(inv), 0));
const paidCount = computed(() => filteredInvoices.value.filter(i => (i.status || '').toLowerCase() === 'paid').length);
const pendingCount = computed(() => filteredInvoices.value.filter(i => ['pending', 'sent', 'draft'].includes((i.status || 'draft').toLowerCase())).length);

// Expense-style KPI computeds
const lifetimeTotal = computed(() => invoices.value.reduce((sum, inv) => sum + getInvoiceAmount(inv), 0));

const monthlyRevenue = computed(() => {
  const now = new Date();
  return invoices.value.filter(inv => {
    const d = new Date(inv.date || inv.created_at || 0);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((sum, inv) => sum + getInvoiceAmount(inv), 0);
});

const weeklyRevenue = computed(() => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  cutoff.setHours(0, 0, 0, 0);
  return invoices.value.filter(inv => {
    const d = new Date(inv.date || inv.created_at || 0);
    return d >= cutoff;
  }).reduce((sum, inv) => sum + getInvoiceAmount(inv), 0);
});

const uniqueClientsCount = computed(() => {
  const seen = new Set();
  invoices.value.forEach(inv => {
    const name = (inv.clientName || inv.client_name || '').toLowerCase().trim();
    if (name) seen.add(name);
  });
  return seen.size;
});

// Analytics period filtering & histogram
const analyticsFilteredInvoices = computed(() => {
  const now = new Date();
  const rows = invoices.value;
  const getDate = (inv) => new Date(inv.date || inv.created_at || 0);

  if (analyticsPeriod.value === 'week') {
    const start = new Date(now); start.setDate(now.getDate() - 6); start.setHours(0, 0, 0, 0);
    return rows.filter(inv => { const d = getDate(inv); return !isNaN(d) && d >= start; });
  }
  if (analyticsPeriod.value === 'quarter') {
    const qStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    return rows.filter(inv => { const d = getDate(inv); return !isNaN(d) && d >= qStart; });
  }
  if (analyticsPeriod.value === 'year') {
    const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    return rows.filter(inv => { const d = getDate(inv); return !isNaN(d) && d >= start; });
  }
  if (analyticsPeriod.value === 'custom') {
    const s = analyticsCustomStartDate.value ? new Date(`${analyticsCustomStartDate.value}T00:00:00`) : null;
    const e = analyticsCustomEndDate.value ? new Date(`${analyticsCustomEndDate.value}T23:59:59`) : null;
    return rows.filter(inv => {
      const d = getDate(inv);
      if (isNaN(d)) return false;
      if (s && d < s) return false;
      if (e && d > e) return false;
      return true;
    });
  }
  // default: month
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return rows.filter(inv => { const d = getDate(inv); return !isNaN(d) && d >= monthStart; });
});

const analyticsPeriodTotal = computed(() =>
  analyticsFilteredInvoices.value.reduce((sum, inv) => sum + getInvoiceAmount(inv), 0)
);

const analyticsPeriodLabel = computed(() => {
  if (analyticsPeriod.value === 'week') return 'By Day (Last 7 Days)';
  if (analyticsPeriod.value === 'quarter') return 'By Month (Current Quarter)';
  if (analyticsPeriod.value === 'year') return 'By Month (Last 12 Months)';
  if (analyticsPeriod.value === 'custom') return `Custom (${analyticsCustomStartDate.value} → ${analyticsCustomEndDate.value})`;
  return 'By Week (Current Month)';
});

const filteredInvoices = computed(() => {
  let result = [...invoices.value];
  if (statusFilter.value !== 'all') {
    result = result.filter(i => (i.status || 'draft').toLowerCase() === statusFilter.value);
  }

  // Date range filter
  if (dateFilter.value !== 'all') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    result = result.filter(i => {
      const dateStr = i.date || i.created_at || i.updated_at;
      if (!dateStr) return false;

      // Robust parsing for YYYY-MM-DD to avoid timezone shifts
      let d;
      if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
        const [y, m, d_part] = dateStr.split('T')[0].split('-').map(Number);
        d = new Date(y, m - 1, d_part);
      } else {
        d = new Date(dateStr);
      }
      d.setHours(0, 0, 0, 0);
      
      if (dateFilter.value === 'daily') {
        return d.getTime() === today.getTime();
      } else if (dateFilter.value === 'yesterday') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return d.getTime() === yesterday.getTime();
      } else if (dateFilter.value === 'weekly') {
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        return d >= lastWeek && d <= today;
      } else if (dateFilter.value === 'monthly') {
        return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
      } else if (dateFilter.value === 'custom' && customStartDate.value && customEndDate.value) {
        const start = new Date(customStartDate.value);
        const end = new Date(customEndDate.value);
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return d >= start && d <= end;
      }
      return true;
    });
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(i => 
      (i.clientName || i.client_name || '').toLowerCase().includes(q) ||
      (i.invoiceNumber || i.number || '').toLowerCase().includes(q)
    );
  }
  result.sort((a, b) => new Date(b.updated_at || b.created_at || b.date || 0) - new Date(a.updated_at || a.created_at || a.date || 0));
  return result;
});

const invoiceTrendSeries = computed(() => {
  const now = new Date();
  const grouped = new Map();

  if (analyticsPeriod.value === 'week') {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now); d.setDate(now.getDate() - i);
      grouped.set(d.toISOString().slice(0, 10), 0);
    }
    analyticsFilteredInvoices.value.forEach(inv => {
      const d = new Date(inv.date || inv.created_at || 0);
      if (isNaN(d)) return;
      const key = d.toISOString().slice(0, 10);
      if (grouped.has(key)) grouped.set(key, grouped.get(key) + getInvoiceAmount(inv));
    });
    const labels = [...grouped.keys()].map(k => new Date(k).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase());
    return { labels, values: [...grouped.values()] };
  }

  if (analyticsPeriod.value === 'quarter') {
    const qStartMonth = Math.floor(now.getMonth() / 3) * 3;
    for (let i = 0; i < 3; i++) {
      const d = new Date(now.getFullYear(), qStartMonth + i, 1);
      grouped.set(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, 0);
    }
    analyticsFilteredInvoices.value.forEach(inv => {
      const d = new Date(inv.date || inv.created_at || 0);
      if (isNaN(d)) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (grouped.has(key)) grouped.set(key, grouped.get(key) + getInvoiceAmount(inv));
    });
    const labels = [...grouped.keys()].map(k => { const [y, m] = k.split('-').map(Number); return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short' }).toUpperCase(); });
    return { labels, values: [...grouped.values()] };
  }

  if (analyticsPeriod.value === 'year') {
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      grouped.set(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, 0);
    }
    analyticsFilteredInvoices.value.forEach(inv => {
      const d = new Date(inv.date || inv.created_at || 0);
      if (isNaN(d)) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (grouped.has(key)) grouped.set(key, grouped.get(key) + getInvoiceAmount(inv));
    });
    const labels = [...grouped.keys()].map(k => { const [y, m] = k.split('-').map(Number); return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short' }).toUpperCase(); });
    return { labels, values: [...grouped.values()] };
  }

  if (analyticsPeriod.value === 'custom') {
    analyticsFilteredInvoices.value.forEach(inv => {
      const d = new Date(inv.date || inv.created_at || 0);
      if (isNaN(d)) return;
      const key = d.toISOString().slice(0, 10);
      grouped.set(key, (grouped.get(key) || 0) + getInvoiceAmount(inv));
    });
    const sorted = [...grouped.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    return { labels: sorted.map(([k]) => k.slice(5)), values: sorted.map(([, v]) => v) };
  }

  // default: month — by week (W1-W5)
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const weeksInMonth = Math.ceil((new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()) / 7);
  for (let w = 1; w <= weeksInMonth; w++) grouped.set(`W${w}`, 0);
  analyticsFilteredInvoices.value.forEach(inv => {
    const d = new Date(inv.date || inv.created_at || 0);
    if (isNaN(d) || d < monthStart) return;
    const dayOfMonth = d.getDate();
    const week = `W${Math.ceil(dayOfMonth / 7)}`;
    if (grouped.has(week)) grouped.set(week, grouped.get(week) + getInvoiceAmount(inv));
  });
  return { labels: [...grouped.keys()], values: [...grouped.values()] };
});

const invoiceStatusSeries = computed(() => {
  const buckets = {
    PAID: 0,
    SENT: 0,
    PENDING: 0,
    DRAFT: 0,
    CANCELLED: 0
  };
  filteredInvoices.value.forEach((inv) => {
    const key = (inv.status || 'draft').toUpperCase();
    if (key in buckets) buckets[key] += 1;
    else buckets.DRAFT += 1;
  });
  return {
    labels: Object.keys(buckets),
    values: Object.values(buckets)
  };
});

const destroyInvoiceCharts = () => {
  if (invoiceTrendChart) {
    invoiceTrendChart.destroy();
    invoiceTrendChart = null;
  }
  if (invoiceStatusChart) {
    invoiceStatusChart.destroy();
    invoiceStatusChart = null;
  }
};

const renderInvoiceCharts = async () => {
  if (!showGraphs.value) {
    destroyInvoiceCharts();
    return;
  }

  await nextTick();
  const trendCanvas = invoiceTrendChartRef.value;
  const statusCanvas = invoiceStatusChartRef.value;
  if (!trendCanvas || !statusCanvas) return;

  destroyInvoiceCharts();

  invoiceTrendChart = new Chart(trendCanvas, {
    type: 'bar',
    data: {
      labels: invoiceTrendSeries.value.labels,
      datasets: [{
        label: 'Invoice Value',
        data: invoiceTrendSeries.value.values,
        backgroundColor: 'rgba(47,46,139,0.78)',
        borderColor: 'rgba(47,46,139,1)',
        borderWidth: 1,
        borderRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => ` ${formatWithSymbol(ctx.raw)}` } } },
      scales: {
        x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10, family: 'monospace' } } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10, family: 'monospace' }, callback: (v) => formatCurrencyShort(v) } }
      }
    }
  });

  invoiceStatusChart = new Chart(statusCanvas, {
    type: 'doughnut',
    data: {
      labels: invoiceStatusSeries.value.labels,
      datasets: [{
        data: invoiceStatusSeries.value.values,
        backgroundColor: ['#2F2E8B', '#2563EB', '#F59E0B', '#6B7280', '#DC2626'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 10, font: { size: 10, family: 'monospace' } }
        }
      }
    }
  });
};

const totalPages = computed(() => Math.ceil(filteredInvoices.value.length / itemsPerPage.value) || 1);
const paginatedInvoices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredInvoices.value.slice(start, start + itemsPerPage.value);
});

// Utils
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' });
};

const getInvoiceAmount = (inv) => {
  if (inv.total) return parseFloat(inv.total) || 0;
  if (inv.amount) return parseFloat(inv.amount) || 0;
  const items = inv.items || [];
  return items.reduce((s, item) => s + ((item.quantity || item.qty || 0) * (item.unitPrice || item.unit_price || item.price || 0)), 0);
};

const getStatusClass = (status) => {
  const s = (status || 'draft').toLowerCase();
  const brandSubtle = 'text-brand border-brand/20 bg-brand/5';
  const classes = {
    paid: brandSubtle,
    sent: 'text-blue-600 border-blue-200 bg-blue-50',
    draft: 'text-gray-500 border-gray-200 bg-gray-50',
    pending: 'text-amber-600 border-amber-200 bg-amber-50',
    cancelled: 'text-red-600 border-red-200 bg-red-50',
    credited: 'text-purple-600 border-purple-200 bg-purple-50',
    debited: 'text-indigo-600 border-indigo-200 bg-indigo-50'
  };
  return classes[s] || 'text-gray-500 border-gray-200 bg-gray-50';
};

// Fetch tenant details for company info (cached, does NOT save back)
const fetchTenantDetails = async () => {
  try {
    const tenantId = getTenantId();
    if (!tenantId) return;
    let data = null;
    try {
      const res = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${tenantId}`);
      if (res.ok) data = await res.json();
    } catch {}
    if (!data) {
      try {
        const res2 = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${tenantId}`);
        if (res2.ok) data = await res2.json();
      } catch {}
    }
    const tenant = data?.tenant ?? data ?? null;
    if (tenant) {
      tenantDetails.value = tenant;
      cachedCompanyDetails.value = {
        companyName: tenant.company_name || tenant.companyName || tenant.businessName || tenant.business_name || tenant.trading_name || tenant.tradingName || tenant.name || '',
        companyEmail: tenant.email || tenant.owner_email || tenant.contact_email || '',
        companyPhone: tenant.phone_number || tenant.phone || tenant.contact_phone || '',
        companyTpin: tenant.tpin || tenant.TPIN || '',
        companyAddress: [tenant.address || tenant.location || '', tenant.city || '', tenant.country || ''].filter(Boolean).join(', ')
      };
    }
  } catch (err) { console.error('Failed to fetch tenant details:', err); }
};

// Actions
const resetForm = () => {
  formData.value = {
    companyName: cachedCompanyDetails.value.companyName,
    companyEmail: cachedCompanyDetails.value.companyEmail,
    companyPhone: cachedCompanyDetails.value.companyPhone,
    companyTpin: cachedCompanyDetails.value.companyTpin,
    companyAddress: cachedCompanyDetails.value.companyAddress,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientTpin: '',
    clientAddress: '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    momoNumber: '',
    bankName: '',
    accountName: '',
    bankAccount: '',
    swiftCode: '',
    bankCode: '',
    sortCode: '',
    bank_account_id: '',
    notes: ''
  };
};

const fetchNextInvoiceNumber = async () => {
  try {
    const tenantId = getTenantId();
    const res = await fetch(`${API_BASE_URL}/invoices/generate-number?type=invoice&tenant_id=${tenantId}`);
    if (res.ok) {
      const data = await res.json();
      formData.value.invoiceNumber = data.number || '';
    }
  } catch (err) { console.error('Failed to generate invoice number:', err); }
};

const openCreateModal = async () => {
  resetForm();
  editingInvoice.value = null;
  selectedInvoice.value = null;
  showCompanySection.value = false;
  showEditModal.value = true;
  await fetchNextInvoiceNumber();
  await loadBankAccounts();
  if (hasInventoryModule.value) await loadInventoryItems();
  invItemSearch.value = formData.value.items.map(i => i.description || '');
  invItemDropdown.value = formData.value.items.map(() => false);
  await loadCrmLeads();
  clientSearchQuery.value = '';
  clientDropdownOpen.value = false;
  // Auto-select the default bank account when present
  const def = bankAccounts.value.find((a) => a.is_default);
  if (def) {
    formData.value.bank_account_id = def.id;
    applyBankAccount();
  }
};

const enhanceWithAI = async () => {
  enhancingNotes.value = true;
  try {
    const tenantId = getTenantId();
    const context = {
      clientName: formData.value.clientName,
      items: formData.value.items.filter(i => i.description).map(i => `${i.description} (x${i.quantity})`).join(', '),
      total: formatWithSymbol(calculateTotal()),
      dueDate: formData.value.dueDate,
      currentNotes: formData.value.notes
    };
    const prompt = formData.value.notes
      ? `Enhance and professionalize these invoice notes. Keep it concise (2-3 sentences max). Context: Invoice for ${context.clientName}, items: ${context.items}, total: ${context.total}, due: ${context.dueDate}. Current notes: "${context.currentNotes}". Return ONLY the enhanced notes text, no explanations.`
      : `Generate professional invoice notes (2-3 sentences). Context: Invoice for ${context.clientName}, items: ${context.items}, total: ${context.total}, due: ${context.dueDate}. Include payment terms and a thank you. Return ONLY the notes text, no explanations.`;
    const res = await fetch(`${API_BASE_URL}/owners-agent/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify({ query: prompt, thread_id: `invoice_enhance_${Date.now()}` })
    });
    if (res.ok) {
      const data = await res.json();
      const aiText = data.response || data.message || data.reply || '';
      if (aiText) formData.value.notes = aiText.replace(/^["|']|["|']$/g, '').trim();
    }
  } catch (err) { console.error('AI enhancement failed:', err); alert('Failed to enhance with AI. Please try again.'); }
  finally { enhancingNotes.value = false; }
};

const viewInvoice = (inv) => {
  selectedInvoice.value = inv;
  showPreviewModal.value = true;
};

const editInvoice = (inv) => {
  editingInvoice.value = inv;
  selectedInvoice.value = inv;
  // Populate form with invoice data - use saved company details or fall back to cached tenant details
  formData.value = {
    companyName: inv.companyName || inv.company_name || cachedCompanyDetails.value.companyName,
    companyEmail: inv.companyEmail || inv.company_email || cachedCompanyDetails.value.companyEmail,
    companyPhone: inv.companyPhone || inv.company_phone || cachedCompanyDetails.value.companyPhone,
    companyTpin: inv.companyTpin || inv.company_tpin || cachedCompanyDetails.value.companyTpin,
    companyAddress: inv.companyAddress || inv.company_address || cachedCompanyDetails.value.companyAddress,
    clientName: inv.clientName || inv.client_name || '',
    clientCompanyName: inv.clientCompanyName || inv.client_company_name || '',
    clientEmail: inv.clientEmail || inv.client_email || '',
    clientPhone: inv.clientPhone || inv.client_phone || '',
    clientTpin: inv.clientTpin || inv.client_tpin || '',
    clientAddress: inv.clientAddress || inv.client_address || '',
    invoiceNumber: inv.invoiceNumber || inv.number || '',
    date: inv.date ? new Date(inv.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    dueDate: inv.dueDate || inv.due_date ? new Date(inv.dueDate || inv.due_date).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: inv.status || 'draft',
    items: (inv.items && inv.items.length > 0) ? inv.items.map(item => ({
      description: item.description || '',
      quantity: item.quantity || item.qty || 1,
      unitPrice: item.unitPrice || item.unit_price || item.price || 0,
      item_id: item.item_id || null,
      item_type: item.item_type || null
    })) : [{ description: '', quantity: 1, unitPrice: 0, item_id: null, item_type: null }],
    taxType: inv.taxType || inv.tax_type || 'none',
    discount: inv.discount || 0,
    discountType: inv.discountType || inv.discount_type || 'percentage',
    momoNumber: inv.momoNumber || inv.momo_number || '',
    bankName: inv.bankName || inv.bank_name || '',
    accountName: inv.accountName || inv.account_name || '',
    bankAccount: inv.bankAccount || inv.bank_account || '',
    swiftCode: inv.swiftCode || inv.swift_code || '',
    bankCode: inv.bankCode || inv.bank_code || '',
    sortCode: inv.sortCode || inv.sort_code || '',
    bank_account_id: inv.bank_account_id || '',
    notes: inv.notes || ''
  };
  showCompanySection.value = false;
  showEditModal.value = true;
  loadBankAccounts();
  if (hasInventoryModule.value) loadInventoryItems();
  invItemSearch.value = formData.value.items.map(i => i.description || '');
  invItemDropdown.value = formData.value.items.map(() => false);
  loadCrmLeads();
  clientSearchQuery.value = formData.value.clientName || '';
  clientDropdownOpen.value = false;
};

const makeCopy = (inv) => {
  editingInvoice.value = null;
  selectedInvoice.value = null;
  formData.value = {
    companyName: inv.companyName || inv.company_name || cachedCompanyDetails.value.companyName,
    companyEmail: inv.companyEmail || inv.company_email || cachedCompanyDetails.value.companyEmail,
    companyPhone: inv.companyPhone || inv.company_phone || cachedCompanyDetails.value.companyPhone,
    companyTpin: inv.companyTpin || inv.company_tpin || cachedCompanyDetails.value.companyTpin,
    companyAddress: inv.companyAddress || inv.company_address || cachedCompanyDetails.value.companyAddress,
    clientName: inv.clientName || inv.client_name || '',
    clientEmail: inv.clientEmail || inv.client_email || '',
    clientPhone: inv.clientPhone || inv.client_phone || '',
    clientTpin: inv.clientTpin || inv.client_tpin || '',
    clientAddress: inv.clientAddress || inv.client_address || '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    items: (inv.items && inv.items.length > 0) ? inv.items.map(item => ({
      description: item.description || '',
      quantity: item.quantity || item.qty || 1,
      unitPrice: item.unitPrice || item.unit_price || item.price || 0,
      item_id: item.item_id || null,
      item_type: item.item_type || null
    })) : [{ description: '', quantity: 1, unitPrice: 0, item_id: null, item_type: null }],
    taxType: inv.taxType || inv.tax_type || 'none',
    discount: inv.discount || 0,
    discountType: inv.discountType || inv.discount_type || 'percentage',
    momoNumber: inv.momoNumber || inv.momo_number || '',
    bankName: inv.bankName || inv.bank_name || '',
    accountName: inv.accountName || inv.account_name || '',
    bankAccount: inv.bankAccount || inv.bank_account || '',
    swiftCode: inv.swiftCode || inv.swift_code || '',
    bankCode: inv.bankCode || inv.bank_code || '',
    sortCode: inv.sortCode || inv.sort_code || '',
    bank_account_id: inv.bank_account_id || '',
    notes: inv.notes || ''
  };
  showCompanySection.value = false;
  showEditModal.value = true;
  loadBankAccounts();
  if (hasInventoryModule.value) loadInventoryItems();
  invItemSearch.value = formData.value.items.map(i => i.description || '');
  invItemDropdown.value = formData.value.items.map(() => false);
  loadCrmLeads();
  clientSearchQuery.value = '';
  clientDropdownOpen.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  invStagedFiles.value = [];
  setTimeout(() => {
    resetForm();
    editingInvoice.value = null;
  }, 300);
};

const addItem = () => {
  formData.value.items.push({ description: '', quantity: 1, unitPrice: 0, item_id: null, item_type: null });
  const idx = formData.value.items.length - 1;
  invItemSearch.value[idx] = '';
  invItemDropdown.value[idx] = false;
};

const removeItem = (index) => {
  if (formData.value.items.length > 1) {
    formData.value.items.splice(index, 1);
  }
};

const calculateSubtotal = () => {
  return formData.value.items.reduce((sum, item) => {
    return sum + ((item.quantity || 0) * (item.unitPrice || 0));
  }, 0);
};

const calculateDiscountAmount = () => {
  const subtotal = calculateSubtotal();
  const disc = parseFloat(formData.value.discount) || 0;
  if (formData.value.discountType === 'percentage') {
    return subtotal * (disc / 100);
  }
  return disc;
};

const calculateTaxAmount = () => {
  const afterDiscount = calculateSubtotal() - calculateDiscountAmount();
  if (formData.value.taxType === 'vat16') return afterDiscount * 0.16;
  if (formData.value.taxType === 'turnover') return afterDiscount * 0.04;
  return 0;
};

const calculateTotal = () => {
  return calculateSubtotal() - calculateDiscountAmount() + calculateTaxAmount();
};

const getTaxLabel = () => {
  if (formData.value.taxType === 'vat16') return 'VAT (16%)';
  if (formData.value.taxType === 'turnover') return 'Turnover Tax (4%)';
  return '';
};

const saveInvoice = async () => {
  saving.value = true;
  try {
    // Validate
    if (!formData.value.clientEmail?.trim()) throw new Error('Client email is required');
    if (!formData.value.date) throw new Error('Invoice date is required');
    if (!formData.value.dueDate) throw new Error('Due date is required');
    if (formData.value.items.length === 0) throw new Error('At least one item is required');
    
    const tenantId = getTenantId();
    const branchId = selectedBranch.value?.id || '';
    
    const payload = {
      tenant_id: tenantId,
      branch_id: branchId,
      // Company details (saved per invoice, not affecting tenant settings)
      companyName: formData.value.companyName?.trim() || '',
      companyEmail: formData.value.companyEmail?.trim() || '',
      companyPhone: formData.value.companyPhone?.trim() || '',
      companyTpin: formData.value.companyTpin?.trim() || '',
      companyAddress: formData.value.companyAddress?.trim() || '',
      // Client details
      clientName: formData.value.clientName.trim(),
      clientCompanyName: formData.value.clientCompanyName?.trim() || '',
      clientEmail: formData.value.clientEmail.trim(),
      clientPhone: formData.value.clientPhone?.trim() || '',
      clientTpin: formData.value.clientTpin?.trim() || '',
      clientAddress: formData.value.clientAddress?.trim() || '',
      invoiceNumber: formData.value.invoiceNumber?.trim() || '',
      date: formData.value.date,
      dueDate: formData.value.dueDate,
      type: 'invoice',
      items: formData.value.items.map(item => ({
        description: item.description.trim(),
        quantity: parseInt(item.quantity) || 0,
        unitPrice: parseFloat(item.unitPrice) || 0,
        item_id: item.item_id || null,
        item_type: item.item_type || null
      })),
      notes: formData.value.notes?.trim() || '',
      momo_number: formData.value.momoNumber?.trim() || null,
      momoNumber: formData.value.momoNumber?.trim() || null,
      bank_account: formData.value.bankAccount?.trim() || null,
      bankAccount: formData.value.bankAccount?.trim() || null,
      bank_name: formData.value.bankName?.trim() || null,
      bankName: formData.value.bankName?.trim() || null,
      account_name: formData.value.accountName?.trim() || null,
      accountName: formData.value.accountName?.trim() || null,
      swift_code: formData.value.swiftCode?.trim() || null,
      swiftCode: formData.value.swiftCode?.trim() || null,
      bank_code: formData.value.bankCode?.trim() || null,
      bankCode: formData.value.bankCode?.trim() || null,
      sort_code: formData.value.sortCode?.trim() || null,
      sortCode: formData.value.sortCode?.trim() || null,
      bank_account_id: formData.value.bank_account_id || null,
      subtotal: calculateSubtotal(),
      discount: parseFloat(formData.value.discount) || 0,
      discountType: formData.value.discountType,
      discountAmount: calculateDiscountAmount(),
      taxType: formData.value.taxType,
      taxAmount: calculateTaxAmount(),
      total: calculateTotal(),
      status: formData.value.status || 'draft',
      paymentType: formData.value.paymentType || 'one-time',
      recurringFrequency: formData.value.recurringFrequency || 'monthly',
      recurringInterval: formData.value.recurringInterval || 1,
      recurringStartDate: formData.value.recurringStartDate || '',
      recurringEndDate: formData.value.recurringEndDate || ''
    };
    
    const url = editingInvoice.value 
      ? `${API_BASE_URL}/invoices/${editingInvoice.value.id || editingInvoice.value._id}?tenant_id=${tenantId}`
      : `${API_BASE_URL}/invoices?tenant_id=${tenantId}`;
    
    const method = editingInvoice.value ? 'PATCH' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to save invoice');
    }
    
    const result = await response.json();
    
    // Upload any staged payment attachment files
    const savedId = result.id || result._id;
    if (savedId && invStagedFiles.value.length) {
      await uploadInvStagedFiles(savedId);
    }
    invStagedFiles.value = [];

    // Update local list
    if (editingInvoice.value) {
      const index = invoices.value.findIndex(i => (i.id || i._id) === (editingInvoice.value.id || editingInvoice.value._id));
      if (index !== -1) invoices.value[index] = result;
    } else {
      invoices.value.unshift(result);
    }
    
    closeEditModal();
    await logAudit(editingInvoice.value ? 'update' : 'create', 'invoices', { resource_type: 'invoice', invoice_number: payload.invoiceNumber, client: payload.clientName, total: payload.total, resource_id: editingInvoice.value?.id });
    
    // If payment type is recurring, auto-create the recurring invoice template
    if (payload.paymentType === 'recurring' && !editingInvoice.value) {
      try {
        const freqMap = { monthly: 'monthly', quarterly: 'quarterly', yearly: 'yearly', custom: 'monthly' };
        const recurringPayload = {
          ...payload,
          frequency: payload.recurringFrequency === 'custom' ? 'monthly' : payload.recurringFrequency,
          interval: payload.recurringFrequency === 'custom' ? payload.recurringInterval : 
            (payload.recurringFrequency === 'quarterly' ? 3 : payload.recurringFrequency === 'yearly' ? 12 : 1),
          start_date: payload.recurringStartDate || payload.date,
          end_date: payload.recurringEndDate || null
        };
        await fetch(`${API_BASE_URL}/recurring-invoices/?tenant_id=${tenantId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
          body: JSON.stringify(recurringPayload)
        });
      } catch (recurringErr) {
        console.error('Failed to create recurring schedule:', recurringErr);
      }
    }
    
    alert(editingInvoice.value ? 'Invoice updated successfully!' : 'Invoice created successfully!');
  } catch (error) {
    console.error('Save error:', error);
    alert(error.message || 'Failed to save invoice');
  } finally {
    saving.value = false;
  }
};

const downloadPDF = async (inv) => {
  try {
    const doc = new jsPDF();
    const invNum = inv.invoiceNumber || inv.number || 'DRAFT';
    const primaryRGB = hexToRgb(brandPrefs.primaryColor || '#2F2E8B');
    
    // 1. Header & Logo
    let headerY = 15;
    const logoUrl = brandPrefs.companyLogo || tenantDetails.value.company_logo;
    
    if (logoUrl) {
      const base64Logo = await loadImage(logoUrl);
      if (base64Logo) {
        doc.addImage(base64Logo, 'PNG', 14, 15, 30, 30, undefined, 'FAST');
        headerY = 50; 
      }
    }

    // 2. Company Info (Top Right)
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    const invCompanyName = (brandPrefs.companyName || tenantDetails.value.company_name || 'YOUR COMPANY').toUpperCase();
    const invCompanyNameLines = doc.splitTextToSize(invCompanyName, 90);
    invCompanyNameLines.forEach((line, i) => doc.text(line, 196, 20 + (i * 7), { align: 'right' }));
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    let compY = 20 + (invCompanyNameLines.length * 7);
    const compAddr = tenantDetails.value.address || '';
    const compCity = tenantDetails.value.city || '';
    const compCountry = tenantDetails.value.country || '';
    if (compAddr) { doc.text(compAddr, 196, compY, { align: 'right' }); compY += 5; }
    if (compCity || compCountry) { doc.text(`${compCity}${compCity && compCountry ? ', ' : ''}${compCountry}`, 196, compY, { align: 'right' }); compY += 5; }
    if (tenantDetails.value.phone_number) { doc.text(`Tel: ${tenantDetails.value.phone_number}`, 196, compY, { align: 'right' }); compY += 5; }
    if (tenantDetails.value.tpin) { doc.text(`TPIN: ${tenantDetails.value.tpin}`, 196, compY, { align: 'right' }); compY += 5; }

    // 3. Document Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text('TAX INVOICE', 14, headerY + 10);
    
    doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setLineWidth(1);
    doc.line(14, headerY + 14, 60, headerY + 14);

    // 4. Invoice Info (Under Title)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text(`INVOICE NO:`, 14, headerY + 22);
    doc.setFont('helvetica', 'normal');
    doc.text(`#${invNum}`, 45, headerY + 22);

    doc.setFont('helvetica', 'bold');
    doc.text(`DATE ISSUED:`, 14, headerY + 28);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(inv.date), 45, headerY + 28);

    doc.setFont('helvetica', 'bold');
    doc.text(`DUE DATE:`, 14, headerY + 34);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(inv.dueDate || inv.due_date), 45, headerY + 34);

    // 5. Bill To (Right Side, Same level as Title)
    const billToY = headerY + 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text('BILL TO:', 120, billToY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    const cliCompany = (inv.clientCompanyName || inv.client_company_name || '').toUpperCase();
    if (cliCompany) {
      const compLines = doc.splitTextToSize(cliCompany, 68);
      doc.text(compLines, 120, billToY + 7);
      billToY += compLines.length * 5.5;
    }
    const invClientName = (inv.clientName || inv.client_name || 'CLIENT').toUpperCase();
    const invClientNameLines = doc.splitTextToSize(invClientName, 68);
    doc.text(invClientNameLines, 120, billToY + 7);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    let cliY = billToY + 7 + (invClientNameLines.length * 5.5) + 1;
    if (inv.clientAddress || inv.client_address) {
       const addrLines = doc.splitTextToSize(inv.clientAddress || inv.client_address, 70);
       doc.text(addrLines, 120, cliY);
       cliY += (addrLines.length * 5);
    }
    if (inv.clientEmail || inv.client_email) { doc.text(inv.clientEmail || inv.client_email, 120, cliY); cliY += 5; }
    if (inv.clientTpin || inv.client_tpin) { doc.text(`TPIN: ${inv.clientTpin || inv.client_tpin}`, 120, cliY); cliY += 5; }

    // 6. Table
    const tableStartY = Math.max(headerY + 45, cliY + 5);
    const items = inv.items || [];
    
    const formatDesc = (text) => {
      if (!text) return '';
      // Put each bullet point on its own line for clean layout
      return text.replace(/\s*[•·]\s*/g, '\n• ').replace(/^\n/, '').trim();
    };

    autoTable(doc, {
      startY: tableStartY,
      head: [['Description', 'Qty', 'Unit Price', 'Total']],
      body: items.map(item => [
        formatDesc(item.description),
        String(item.quantity || item.qty || 0),
        formatWithSymbol(item.unitPrice || item.unit_price || item.price || 0),
        formatWithSymbol((item.quantity || item.qty || 0) * (item.unitPrice || item.unit_price || item.price || 0))
      ]),
      theme: 'grid',
      headStyles: { fillColor: primaryRGB, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10, cellPadding: 4 },
      bodyStyles: { fontSize: 9, cellPadding: { top: 4, right: 4, bottom: 4, left: 4 }, overflow: 'linebreak', lineColor: [220, 220, 220] },
      columnStyles: {
        0: { cellWidth: 'auto', overflow: 'linebreak' },
        1: { cellWidth: 22, halign: 'center' },
        2: { cellWidth: 35, halign: 'right' },
        3: { cellWidth: 35, halign: 'right' }
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      showHead: 'everyPage',
      margin: { left: 14, right: 14 },
      tableWidth: 'auto',
      pageBreak: 'auto',
      rowPageBreak: 'auto'
    });

    // 7. Totals
    const subtotal = getInvoiceAmount(inv);
    const total = inv.total || getInvoiceAmount(inv);
    
    let finalY = doc.lastAutoTable?.finalY || tableStartY + 20;
    
    // Check if totals section needs a new page (need ~40mm for totals)
    if (finalY + 40 > 275) {
      doc.addPage();
      finalY = 20;
    }
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    
    doc.text('Subtotal:', 110, finalY + 10);
    doc.text(formatWithSymbol(subtotal), 196, finalY + 10, { align: 'right' });
    
    let currentTotalsY = finalY + 16;
    
    if (inv.taxAmount || inv.tax_amount) {
      const taxLabel = inv.taxType === 'vat16' || inv.tax_type === 'vat16' ? 'VAT (16%)' : (inv.taxType === 'turnover' || inv.tax_type === 'turnover' ? 'Turnover Tax (4%)' : 'Tax:');
      doc.text(taxLabel, 110, currentTotalsY);
      doc.text(formatWithSymbol(inv.taxAmount || inv.tax_amount), 196, currentTotalsY, { align: 'right' });
      currentTotalsY += 6;
    }

    if (inv.discountAmount || inv.discount_amount) {
      const discLabel = (inv.discountType === 'percentage' || inv.discount_type === 'percentage') ? `Discount (${inv.discount}%):` : 'Discount:';
      doc.text(discLabel, 110, currentTotalsY);
      doc.setTextColor(200, 0, 0);
      doc.text(`-${formatWithSymbol(inv.discountAmount || inv.discount_amount)}`, 196, currentTotalsY, { align: 'right' });
      doc.setTextColor(100);
      currentTotalsY += 6;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('TOTAL PAYABLE:', 110, currentTotalsY + 4);
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(formatWithSymbol(total), 196, currentTotalsY + 4, { align: 'right' });

    // Remaining balance for partial payments
    if (inv.paymentStatus === 'partial' && inv.remainingAmount > 0) {
      currentTotalsY += 14;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 120, 0);
      doc.text('REMAINING BALANCE:', 110, currentTotalsY);
      doc.text(formatWithSymbol(inv.remainingAmount), 196, currentTotalsY, { align: 'right' });
      doc.setFontSize(8);
      doc.setTextColor(150);
      if (inv.remainingDueDate) {
        doc.text(`Due by: ${formatDate(inv.remainingDueDate)}`, 110, currentTotalsY + 5);
      }
    }

    // 8. Bottom Section (Notes & Payment)
    const PAGE_BOTTOM = 272; // leave room for footer at 280
    let bottomY = currentTotalsY + 16;
    
    const ensureSpace = (needed) => {
      if (bottomY + needed > PAGE_BOTTOM) {
        doc.addPage();
        bottomY = 20;
      }
    };
    
    if (inv.notes) {
      ensureSpace(12);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.text('TERMS & CONDITIONS', 14, bottomY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.setFontSize(9);
      const noteLines = doc.splitTextToSize(inv.notes, 170);
      bottomY += 6;
      for (const line of noteLines) {
        if (bottomY > PAGE_BOTTOM) {
          doc.addPage();
          bottomY = 20;
        }
        doc.text(line, 14, bottomY);
        bottomY += 4.5;
      }
      bottomY += 6;
    }

    if (inv.momoNumber || inv.momo_number || inv.bankAccount || inv.bank_account) {
      ensureSpace(12);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.text('PAYMENT INFORMATION', 14, bottomY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.setFontSize(9);
      bottomY += 6;
      if (inv.momoNumber || inv.momo_number) { ensureSpace(5); doc.text(`Mobile Money: ${inv.momoNumber || inv.momo_number}`, 14, bottomY); bottomY += 5; }
      if (inv.bankName || inv.bank_name) { ensureSpace(5); doc.text(`Bank: ${inv.bankName || inv.bank_name}`, 14, bottomY); bottomY += 5; }
      if (inv.bankAccount || inv.bank_account) { ensureSpace(5); doc.text(`Account: ${inv.bankAccount || inv.bank_account}`, 14, bottomY); bottomY += 5; }
    }

    // 9. Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, 196, 285, { align: 'right' });
        doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 285);
        doc.setDrawColor(230);
        doc.line(14, 280, 196, 280);
    }

    doc.save(`Invoice_${invNum}.pdf`);
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF');
  }
};

const convertBackToQuotation = async (inv) => {
  if (!confirm(`Convert invoice #${inv.invoiceNumber || inv.number || '—'} back to a quotation?`)) return;
  try {
    const tenantId = getTenantId();
    const branchId = selectedBranch.value?.id || '';
    const payload = {
      tenant_id: tenantId,
      branch_id: branchId,
      clientName: inv.clientName || inv.client_name || '',
      clientEmail: inv.clientEmail || inv.client_email || '',
      clientPhone: inv.clientPhone || inv.client_phone || '',
      clientTpin: inv.clientTpin || inv.client_tpin || '',
      clientAddress: inv.clientAddress || inv.client_address || '',
      date: new Date().toISOString().split('T')[0],
      validUntil: inv.dueDate || inv.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'quotation',
      items: (inv.items || []).map(item => ({
        description: item.description || '',
        quantity: parseInt(item.quantity || item.qty) || 1,
        unitPrice: parseFloat(item.unitPrice || item.unit_price || item.price) || 0
      })),
      notes: inv.notes || '',
      momo_number: inv.momoNumber || inv.momo_number || null,
      bank_account: inv.bankAccount || inv.bank_account || null,
      bank_name: inv.bankName || inv.bank_name || null,
      bank_code: inv.bankCode || inv.bank_code || null,
      subtotal: getInvoiceAmount(inv),
      total: getInvoiceAmount(inv),
      status: 'draft'
    };

    const response = await fetch(`${API_BASE_URL}/invoices?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Failed to create quotation from invoice');
    const result = await response.json();
    alert(`Quotation #${result.quotationNumber || result.id || ''} created from invoice!`);
  } catch (err) {
    console.error('Convert error:', err);
    alert(err.message || 'Failed to convert invoice to quotation');
  }
};

const convertToReceipt = async (inv) => {
  if (!confirm(`Generate a receipt from invoice #${inv.invoiceNumber || inv.number || '—'}? This will mark it as paid and create a receipt record.`)) return;
  try {
    const tenantId = getTenantId();
    const invId = inv.id || inv._id;

    const branchId = getBranchId();
    const params = new URLSearchParams({ tenant_id: tenantId });
    if (branchId) params.append('branch_id', branchId);
    const response = await fetch(`${API_BASE_URL}/invoices/${invId}/convert-to-receipt?${params}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || 'Failed to create receipt from invoice');
    }

    const result = await response.json();
    alert(`Receipt #${result.receipt.receipt_number} created successfully from invoice #${inv.invoiceNumber || inv.number || '—'}!`);

    // Navigate to receipts page
    router.push('/dashboard/invoicing/receipts');
  } catch (err) {
    console.error('Convert to receipt error:', err);
    alert(err.message || 'Failed to convert invoice to receipt');
  }
};

const confirmDeletePermanent = async (inv) => {
  closeActionModal();
  try {
    const tenantId = getTenantId();
    const response = await fetch(`${API_BASE_URL}/invoices/${inv.id || inv._id}?tenant_id=${tenantId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (response.ok) {
      invoices.value = invoices.value.filter(i => (i.id || i._id) !== (inv.id || inv._id));
    } else {
      alert('Failed to delete invoice');
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('Failed to delete invoice');
  }
};

// Action Modal state (Credit Note / Debit Note / Delete)
const showActionModal = ref(false);
const actionInv = ref(null);

const actionInvNumber = computed(() => {
  const inv = actionInv.value;
  if (!inv) return '—';
  return inv.invoiceNumber || inv.number || inv.id?.slice(-6) || '—';
});

const openActionModal = (inv) => {
  actionInv.value = inv;
  showActionModal.value = true;
};

const closeActionModal = () => {
  showActionModal.value = false;
  actionInv.value = null;
};

const confirmCreditNote = (inv) => {
  const docId = inv.id || inv._id;
  const docNumber = actionInvNumber.value;
  closeActionModal();
  router.push({
    path: '/dashboard/invoicing/credit-debit-notes',
    query: { action: 'create-credit', docId, docType: 'invoice', docNumber }
  });
};

const confirmDebitNote = (inv) => {
  const docId = inv.id || inv._id;
  const docNumber = actionInvNumber.value;
  closeActionModal();
  router.push({
    path: '/dashboard/invoicing/credit-debit-notes',
    query: { action: 'create-debit', docId, docType: 'invoice', docNumber }
  });
};

// Data fetching
const fetchInvoices = async () => {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    const branchId = selectedBranch.value?.id || '';
    const branchParam = branchId ? `&branch_id=${branchId}` : '';
    
    const response = await fetch(`${API_BASE_URL}/invoices?tenant_id=${tenantId}&type=invoice${branchParam}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    
    if (response.ok) {
      const data = await response.json();
      invoices.value = Array.isArray(data) ? data : (data.invoices || []);
    }
  } catch (err) {
    console.error('Error fetching invoices:', err);
  } finally {
    loading.value = false;
  }
};

const refreshData = () => fetchInvoices();

// Branch init
const initializeBranches = async () => {
  try {
    branches.value = await getBranches();
    const fixedBranchId = getBranchId();
    const userRole = getUserRole();
    const isOwner = ['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase());
    if (fixedBranchId && !isOwner) {
      const branch = branches.value.find(b => b.id === fixedBranchId || b._id === fixedBranchId);
      if (branch) { selectedBranch.value = branch; setSelectedBranch(branch); return; }
    } else {
      if (!branches.value.some(b => !b.id && b.name === 'All Branches')) branches.value.unshift({ id: '', name: 'All Branches' });
    }
    const storedBranch = getSelectedBranch();
    if (storedBranch && branches.value.some(b => b.id === storedBranch.id)) selectedBranch.value = storedBranch;
    else if (branches.value.length > 0) { selectedBranch.value = branches.value[0]; setSelectedBranch(branches.value[0]); }
  } catch (err) { console.error(err); }
};

watch(selectedBranch, async (v) => { if (v) { setSelectedBranch(v); await fetchInvoices(); } }, { deep: true });
watch([filteredInvoices, showGraphs], () => {
  renderInvoiceCharts();
}, { deep: true });
watch([analyticsPeriod, analyticsCustomStartDate, analyticsCustomEndDate], () => {
  renderInvoiceCharts();
});

onMounted(async () => {
  await fetchPreferences();
  await fetchTenantDetails();
  await initializeBranches();
  await fetchInvoices();
  await loadInventoryModule();
  await loadCrmModule();
  await renderInvoiceCharts();
});

onBeforeUnmount(() => {
  destroyInvoiceCharts();
});
</script>

<style scoped>
.mesh-background { background-color: #fff; background-image: linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px); background-size: 30px 30px; }
.bg-dotted-pattern { background-image: radial-gradient(#2F2E8B 0.5px, transparent 0.5px); background-size: 8px 8px; }
.kpi-card-hero { background: #fff; padding: 1.5rem; position: relative; overflow: hidden; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); transition: all .2s; border: 1px solid #f3f4f6; border-radius: 0; }
.kpi-card-hero:hover { box-shadow: 0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1); transform: translateY(-4px); }
.kpi-card-hero:active { transform: scale(0.98); }
.kpi-icon-wrapper-hero { width: 3rem; height: 3rem; border-radius: 0; background: #eff6ff; display: flex; align-items: center; justify-content: center; margin-bottom: .5rem; transition: transform .2s; }
.kpi-card-hero:hover .kpi-icon-wrapper-hero { transform: scale(1.1); }
.kpi-value-hero { font-size: 1.5rem; font-weight: 900; color: #111827; letter-spacing: -.025em; margin-bottom: 0; }
.kpi-label { font-size: 9px; font-family: monospace; font-weight: 700; color: #9ca3af; letter-spacing: .2em; }
.font-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
.bg-brand { background-color: v-bind('brandPrefs.primaryColor || "#2F2E8B"'); }
.text-brand { color: v-bind('brandPrefs.primaryColor || "#2F2E8B"'); }
.border-brand { border-color: v-bind('brandPrefs.primaryColor || "#2F2E8B"'); }
.bg-brand\/5 { background-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#2F2E8B"'), transparent 95%); }
.border-brand\/20 { border-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#2F2E8B"'), transparent 80%); }
.border-t-brand { border-top-color: v-bind('brandPrefs.primaryColor || "#2F2E8B"'); }
.focus\:border-brand:focus { border-color: v-bind('brandPrefs.primaryColor || "#2F2E8B"'); }
.focus\:ring-brand:focus { --tw-ring-color: v-bind('brandPrefs.primaryColor || "#2F2E8B"'); }
</style>
