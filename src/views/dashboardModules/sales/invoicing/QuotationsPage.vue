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
              <i class="fas fa-quote-left text-brand"></i>
              <span>Invoice Management // Quotations</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Quotations</h1>
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
            <i class="fas fa-plus"></i> New Quotation
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">
      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-brand rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Quotations...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Quotations</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ filteredQuotations.length }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Value</p>
            <h4 class="text-2xl font-black text-brand font-display mt-1">{{ formatWithSymbol(totalValue) }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Accepted</p>
            <h4 class="text-2xl font-black text-brand font-display mt-1">{{ acceptedCount }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Draft</p>
            <h4 class="text-2xl font-black text-gray-500 font-display mt-1">{{ draftCount }}</h4>
          </div>
        </div>

        <!-- Filter & Search -->
        <div class="relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-sm">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <input v-model="searchQuery" type="text" placeholder="Search quotations..." class="w-full rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
              </div>
              <select v-model="statusFilter" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono">
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
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

        <!-- Bulk Actions Bar -->
        <BulkActionsBar :count="selectionCount" @clear="clearSelection" @delete="bulkDelete" :deleting="bulkDeleting" />

        <!-- Quotations Table -->
        <div class="relative overflow-visible bg-white border border-gray-100 rounded-none shadow-sm">
          <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="py-3 px-3 text-center w-10">
                    <SelectAllCheckbox :model-value="isAllPageSelected" @update:model-value="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Number</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Client</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Valid Until</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="q in paginatedQuotations" :key="q.id || q._id" class="hover:bg-gray-50/50 transition-colors group" :class="{ 'bg-blue-50/40': selectedIds.has(q.id || q._id) }">
                  <td class="py-3 px-3 text-center">
                    <input type="checkbox" :checked="selectedIds.has(q.id || q._id)" @change="toggleSelect(q)" class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] cursor-pointer" />
                  </td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-brand uppercase whitespace-nowrap">#{{ q.quotationNumber || q.invoiceNumber || q.number || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-gray-700 uppercase min-w-[180px]">{{ q.clientName || q.client_name || 'Unknown' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500 whitespace-nowrap">{{ formatDate(q.date) }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500 whitespace-nowrap">{{ formatDate(q.validUntil || q.dueDate || q.due_date) }}</td>
                  <td class="py-3 px-4 text-right text-[10px] font-mono font-black text-gray-900 whitespace-nowrap">{{ formatWithSymbol(getDocAmount(q)) }}</td>
                  <td class="py-3 px-4 text-right">
                    <span :class="getStatusClass(q.status)" class="text-[8px] font-mono font-black px-2 py-1 border uppercase">{{ q.status || 'Draft' }}</span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button @click="viewDoc(q)" class="p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors" title="View"><i class="fas fa-eye text-xs"></i></button>
                      <button @click="editDoc(q)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit"><i class="fas fa-edit text-xs"></i></button>
                      <button @click="downloadPDF(q)" class="p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors" title="Download PDF"><i class="fas fa-file-pdf text-xs"></i></button>
                      <button @click="makeCopy(q)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="Make a Copy"><i class="fas fa-copy text-xs"></i></button>
                      <button @click="openConvertModal(q)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-blue-50 transition-colors" title="Convert to Invoice"><i class="fas fa-exchange-alt text-xs"></i></button>
                      <button @click="confirmDelete(q)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><i class="fas fa-trash text-xs"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredQuotations.length === 0">
                  <td colspan="8" class="py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <i class="fas fa-quote-left text-3xl text-gray-200 mb-3 block"></i>
                    NO_QUOTATIONS_FOUND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="filteredQuotations.length > 0" class="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
            <div class="text-[9px] font-mono text-gray-400 uppercase">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredQuotations.length) }} of {{ filteredQuotations.length }}
            </div>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Prev</button>
              <span class="px-3 py-1 text-[9px] font-mono font-bold text-emerald-600">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ═══════════ PREVIEW MODAL ═══════════ -->
    <Teleport to="body">
      <div v-if="showPreviewModal" @click.self="showPreviewModal = false" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative">
          <!-- Brand Accent Top -->
          <div class="h-1.5 w-full bg-brand"></div>
          
          <div class="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center z-10">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase tracking-tight">Quotation Preview</h3>
            <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600 p-2 transition-colors"><i class="fas fa-times text-xl"></i></button>
          </div>
          
          <div v-if="selectedQuotation" class="p-8 md:p-12 bg-white min-h-full">
            <!-- Document Header: Logo & Company Info -->
            <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div class="flex items-center gap-4">
                <div v-if="brandPrefs.companyLogo || tenantDetails.company_logo" class="w-24 h-24 bg-gray-50 flex items-center justify-center p-2 border border-gray-100 shadow-sm">
                  <img :src="brandPrefs.companyLogo || tenantDetails.company_logo" class="max-w-full max-h-full object-contain" alt="Logo" />
                </div>
                <div>
                   <h2 class="text-2xl font-black tracking-tighter text-brand uppercase">{{ brandPrefs.companyName || tenantDetails.company_name || 'Your Company' }}</h2>
                   <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">Official Quotation</div>
                </div>
              </div>
              
              <div class="text-left md:text-right space-y-1">
                <p class="text-sm font-bold text-gray-900 uppercase">{{ tenantDetails.address || 'Company Address' }}</p>
                <p class="text-[11px] font-medium text-gray-500 uppercase">{{ tenantDetails.city }}{{ tenantDetails.city && tenantDetails.country ? ', ' : '' }}{{ tenantDetails.country }}</p>
                <p class="text-[11px] font-medium text-gray-500">Tel: {{ tenantDetails.phone_number || 'N/A' }}</p>
                <p class="text-[11px] font-mono font-bold text-brand uppercase">TPIN: {{ tenantDetails.tpin || 'N/A' }}</p>
              </div>
            </div>

            <!-- Quotation Basics -->
            <div class="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 pb-8 border-b border-gray-100">
              <div class="space-y-4">
                <div>
                  <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Document Index</p>
                  <p class="text-4xl font-black text-brand tracking-tighter">#{{ selectedQuotation.quotationNumber || selectedQuotation.invoiceNumber || selectedQuotation.number || '—' }}</p>
                </div>
                <div class="flex gap-10">
                  <div>
                    <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Issue Date</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(selectedQuotation.date) }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Expiration</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(selectedQuotation.validUntil || selectedQuotation.dueDate || selectedQuotation.due_date) }}</p>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div :class="getStatusClass(selectedQuotation.status)" class="inline-block text-xs font-mono font-black px-6 py-2 border-2 uppercase tracking-widest">{{ selectedQuotation.status || 'Draft' }}</div>
              </div>
            </div>

            <!-- Entity Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 min-w-0">
              <div class="bg-gray-50/50 p-6 border-l-4 border-brand min-w-0 overflow-hidden">
                <h4 class="text-[10px] font-mono font-black text-brand uppercase tracking-widest mb-4">Recipient Information</h4>
                <div class="space-y-3">
                  <div>
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Client Name</p>
                    <p class="text-base font-black text-gray-900 uppercase break-words">{{ selectedQuotation.clientName || selectedQuotation.client_name || '—' }}</p>
                  </div>
                  <div v-if="selectedQuotation.clientEmail || selectedQuotation.client_email">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Contact Email</p>
                    <p class="text-sm font-bold text-gray-700">{{ selectedQuotation.clientEmail || selectedQuotation.client_email }}</p>
                  </div>
                  <div v-if="selectedQuotation.clientAddress || selectedQuotation.client_address">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Billing Address</p>
                    <p class="text-sm text-gray-600">{{ selectedQuotation.clientAddress || selectedQuotation.client_address }}</p>
                  </div>
                  <div v-if="selectedQuotation.clientTpin || selectedQuotation.client_tpin">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Client TPIN</p>
                    <p class="text-sm font-mono font-bold text-gray-700">{{ selectedQuotation.clientTpin || selectedQuotation.client_tpin }}</p>
                  </div>
                </div>
              </div>
              
              <div v-if="selectedQuotation.momoNumber || selectedQuotation.bankAccount || selectedQuotation.accountName || selectedQuotation.swiftCode" class="p-6 border border-gray-100">
                <h4 class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4">Settlement Channels</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div v-if="selectedQuotation.momoNumber || selectedQuotation.momo_number">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Mobile Payment</p>
                    <p class="text-sm font-black text-gray-800">{{ selectedQuotation.momoNumber || selectedQuotation.momo_number }}</p>
                  </div>
                  <div v-if="selectedQuotation.bankName || selectedQuotation.bank_name">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Institution</p>
                    <p class="text-sm font-black text-gray-800">{{ selectedQuotation.bankName || selectedQuotation.bank_name }}</p>
                  </div>
                  <div v-if="selectedQuotation.accountName || selectedQuotation.account_name">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Account Name</p>
                    <p class="text-sm font-black text-gray-800">{{ selectedQuotation.accountName || selectedQuotation.account_name }}</p>
                  </div>
                  <div v-if="selectedQuotation.bankAccount || selectedQuotation.bank_account">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Acc Number</p>
                    <p class="text-sm font-mono font-bold text-gray-800">{{ selectedQuotation.bankAccount || selectedQuotation.bank_account }}</p>
                  </div>
                  <div v-if="selectedQuotation.swiftCode || selectedQuotation.swift_code">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Swift Code</p>
                    <p class="text-sm font-mono font-bold text-gray-800">{{ selectedQuotation.swiftCode || selectedQuotation.swift_code }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Line Items Table -->
            <div class="mb-10 overflow-x-auto border border-gray-200">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-brand text-white">
                    <th class="py-4 px-6 text-[10px] font-mono font-black uppercase tracking-widest">Service / Item Description</th>
                    <th class="py-4 px-4 text-center text-[10px] font-mono font-black uppercase tracking-widest w-24">Qty</th>
                    <th class="py-4 px-4 text-right text-[10px] font-mono font-black uppercase tracking-widest w-40">Unit Price</th>
                    <th class="py-4 px-6 text-right text-[10px] font-mono font-black uppercase tracking-widest w-40">Extension</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(item, idx) in selectedQuotation.items" :key="idx" class="hover:bg-gray-50/50 transition-colors">
                    <td class="py-4 px-6">
                      <p class="text-sm font-black text-gray-800 uppercase">{{ item.description }}</p>
                    </td>
                    <td class="py-4 px-4 text-center text-sm font-mono font-bold">{{ item.quantity || item.qty }}</td>
                    <td class="py-4 px-4 text-right text-sm font-mono">{{ formatWithSymbol(item.unitPrice || item.unit_price || item.price) }}</td>
                    <td class="py-4 px-6 text-right text-sm font-mono font-black text-gray-900">{{ formatWithSymbol((item.quantity || item.qty || 0) * (item.unitPrice || item.unit_price || item.price || 0)) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Financial Recap -->
            <div class="flex flex-col md:flex-row justify-between gap-10 mb-12">
              <div class="flex-1 max-w-lg">
                <div v-if="selectedQuotation.notes" class="bg-gray-50 p-6 rounded-none">
                  <h4 class="text-[10px] font-mono font-black text-brand uppercase tracking-widest mb-3">Terms & Conditions</h4>
                  <p class="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{{ selectedQuotation.notes }}</p>
                </div>
              </div>
              
              <div class="w-full md:w-96 space-y-3">
                <div class="flex justify-between items-center py-2 px-4">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Gross Subtotal</span>
                   <span class="text-sm font-mono font-bold text-gray-900">{{ formatWithSymbol(selectedQuotation.subtotal || getDocAmount(selectedQuotation)) }}</span>
                </div>
                <div v-if="selectedQuotation.vat || selectedQuotation.tax" class="flex justify-between items-center py-2 px-4">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Sales Tax / VAT</span>
                  <span class="text-sm font-mono font-bold text-gray-900">{{ formatWithSymbol(selectedQuotation.vat || selectedQuotation.tax || 0) }}</span>
                </div>
                <div v-if="selectedQuotation.discountAmount || selectedQuotation.discount_amount" class="flex justify-between items-center py-2 px-4 bg-red-50">
                  <span class="text-[10px] font-mono font-black text-red-600 uppercase tracking-widest">Discount ({{ selectedQuotation.discountType === 'percentage' || selectedQuotation.discount_type === 'percentage' ? selectedQuotation.discount + '%' : 'Fixed' }})</span>
                  <span class="text-sm font-mono font-bold text-red-600">-{{ formatWithSymbol(selectedQuotation.discountAmount || selectedQuotation.discount_amount) }}</span>
                </div>
                <div class="flex justify-between items-center py-5 px-6 bg-brand text-white shadow-lg">
                  <span class="text-sm font-mono font-black uppercase tracking-tighter">Total Payable Amount</span>
                  <span class="text-2xl font-mono font-black">{{ formatWithSymbol(selectedQuotation.total || getDocAmount(selectedQuotation)) }}</span>
                </div>
              </div>
            </div>

            <!-- Action Toolbar -->
            <div class="flex flex-wrap gap-3 justify-end pt-8 border-t border-gray-100 no-print">
              <button @click="downloadPDF(selectedQuotation)" class="bg-brand hover:opacity-90 text-white px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all shadow-md active:scale-95">
                <i class="fas fa-file-pdf"></i> Generate PDF Document
              </button>
              <button @click="openConvertModal(selectedQuotation)" class="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all">
                <i class="fas fa-exchange-alt"></i> Finalize to Invoice
              </button>
              <button @click="showPreviewModal = false; editDoc(selectedQuotation)" class="bg-white border border-gray-200 text-gray-700 hover:border-brand hover:text-brand px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all">
                <i class="fas fa-edit"></i> Modify Record
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

    <!-- ═══════════ CONVERT TO INVOICE MODAL ═══════════ -->
    <Teleport to="body">
      <div v-if="showConvertModal" @click.self="showConvertModal = false" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10001] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-md w-full">
          <div class="h-1.5 w-full bg-brand"></div>
          <div class="p-6 space-y-5">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-black text-gray-900 uppercase">Convert to Invoice</h3>
              <button @click="showConvertModal = false" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
            </div>
            <p class="text-sm text-gray-600">
              Quotation: <strong class="font-mono">{{ selectedQuotation?.quotationNumber || '—' }}</strong><br>
              Client: <strong>{{ selectedQuotation?.clientName || '—' }}</strong><br>
              Total: <strong class="text-brand">{{ formatWithSymbol(getDocAmount(selectedQuotation)) }}</strong>
            </p>

            <div>
              <label class="block text-xs font-bold text-gray-700 mb-2">Payment Type</label>
              <div class="flex gap-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="convertPaymentType" value="full" class="text-brand focus:ring-brand">
                  <span class="text-sm font-mono">Full Payment</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="convertPaymentType" value="partial" class="text-brand focus:ring-brand">
                  <span class="text-sm font-mono">Partial Payment</span>
                </label>
              </div>
            </div>

            <div v-if="convertPaymentType === 'partial'" class="space-y-3 bg-gray-50 p-4 border border-gray-200">
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Amount Paid Now</label>
                <input v-model.number="convertPartialAmount" type="number" step="0.01" min="0"
                  class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm font-mono focus:border-brand focus:ring-1 focus:ring-brand">
                <p class="text-[9px] text-gray-400 mt-1 font-mono">
                  Remaining: {{ formatWithSymbol(Math.max(0, getDocAmount(selectedQuotation) - convertPartialAmount)) }}
                </p>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 mb-1">Expected Date for Remaining Payment</label>
                <input v-model="convertRemainingDueDate" type="date"
                  class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
              </div>
            </div>

            <div class="flex gap-3 pt-2">
              <button @click="showConvertModal = false" class="flex-1 border border-gray-300 text-gray-700 py-2.5 text-xs font-mono font-bold uppercase hover:bg-gray-50">Cancel</button>
              <button @click="executeConversion" :disabled="saving"
                class="flex-1 bg-brand hover:opacity-90 text-white py-2.5 text-xs font-mono font-bold uppercase disabled:opacity-50 flex items-center justify-center gap-2">
                <i :class="saving ? 'fas fa-spinner fa-spin' : 'fas fa-exchange-alt'"></i>
                {{ saving ? 'Converting...' : 'Convert' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ═══════════ CREATE / EDIT MODAL ═══════════ -->
    <Teleport to="body">
      <div v-if="showEditModal" @click.self="closeEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">{{ editingQuotation ? 'Edit Quotation' : 'Create Quotation' }}</h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>
          <form @submit.prevent="saveQuotation" class="p-4 sm:p-6 space-y-6">
            <!-- Client Information -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-user-tie text-brand"></i> Client Information
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Contact Person</label>
                  <!-- Autocomplete: past quotation clients + CRM leads (if subscribed) -->
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

            <!-- Quotation Details -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-quote-left text-brand"></i> Quotation Details
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Quotation Number</label>
                  <input v-model="formData.quotationNumber" type="text" placeholder="Auto-generated" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm font-mono focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Date *</label>
                  <input v-model="formData.date" required type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Valid Until *</label>
                  <input v-model="formData.validUntil" required type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select v-model="formData.status" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
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
              <!-- Recurring Schedule -->
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

            <!-- CRM Linkage -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-link text-brand"></i> CRM Linkage (Optional)
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Link to Type</label>
                  <select v-model="formData.linked_to_type" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                    <option value="">None</option>
                    <option value="lead">Lead</option>
                    <option value="contact">Contact</option>
                    <option value="account">Account</option>
                    <option value="deal">Deal</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Link to ID</label>
                  <input v-model="formData.linked_to_id" type="text" placeholder="Enter CRM record ID" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
                </div>
              </div>
            </div>

            <!-- Line Items -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-list text-brand"></i> Line Items
              </h4>
              <div class="space-y-4 sm:space-y-3">
                <div v-for="(item, idx) in formData.items" :key="idx"
                     class="grid grid-cols-12 gap-2 items-start border border-gray-100 sm:border-0 p-2 sm:p-0 bg-gray-50 sm:bg-transparent">
                  <div class="col-span-12 sm:col-span-5 relative">
                    <label class="block sm:hidden text-[9px] font-mono font-bold text-gray-400 uppercase mb-1">Description</label>
                    <!-- Inventory picker (read-only lookup — never deducts stock on quotations) -->
                    <template v-if="hasInventoryModule">
                      <div class="relative">
                        <input
                          v-model="item.description"
                          @focus="invItemDropdown[idx] = true; invItemSearch[idx] = item.description || ''"
                          @input="invItemSearch[idx] = item.description; invItemDropdown[idx] = true"
                          @blur="setTimeout(() => { invItemDropdown[idx] = false }, 180)"
                          placeholder="Type or search inventory…"
                          class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"
                        />
                        <div v-if="invItemDropdown[idx] && filteredInvItems(idx).length" class="absolute z-50 left-0 right-0 top-full bg-white border border-gray-200 shadow-lg max-h-52 overflow-y-auto">
                          <div
                            v-for="invRow in filteredInvItems(idx)"
                            :key="invRow._id || invRow.id"
                            @mousedown.prevent="selectInvItem(idx, invRow)"
                            class="flex items-center justify-between px-3 py-2 hover:bg-indigo-50 cursor-pointer"
                          >
                            <span class="text-xs font-mono truncate max-w-[55%]">{{ invRow.name }}</span>
                            <span class="text-[9px] font-mono text-gray-400 whitespace-nowrap ml-2">
                              {{ invRow.type || 'product' }} · K{{ Number(invRow.sellingPrice || 0).toFixed(2) }}
                            </span>
                          </div>
                        </div>
                        <div v-else-if="invItemDropdown[idx] && !inventoryItems.length" class="absolute z-50 left-0 right-0 top-full bg-white border border-gray-200 shadow text-[10px] font-mono text-gray-400 px-3 py-2">No inventory items found</div>
                      </div>
                    </template>
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
                    <button @click="removeItem(idx)" type="button" class="p-2 text-red-600 hover:bg-red-50 transition-colors" aria-label="Remove item">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              <button @click="addItem" type="button" class="mt-3 text-[10px] font-mono font-bold text-brand hover:opacity-80 uppercase tracking-wider flex items-center gap-2">
                <i class="fas fa-plus-circle"></i> Add Item
              </button>
            </div>

            <!-- Payment Details -->
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

            <!-- Notes with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-sticky-note text-brand"></i> Notes
              </h4>
              <div class="flex flex-col sm:flex-row items-stretch sm:items-start gap-2">
                <textarea v-model="formData.notes" rows="3" placeholder="Additional notes, terms & conditions..." class="flex-1 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand"></textarea>
                <AIEnhanceButton v-model="formData.notes" context="quotation_notes" tooltip="Use AI to enhance notes" />
              </div>
            </div>

            <!-- Total Preview -->
            <div class="flex justify-end">
              <div class="w-full sm:w-80 p-4 bg-gray-50 border border-gray-200">
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
                {{ saving ? 'Saving...' : (editingQuotation ? 'Update Quotation' : 'Create Quotation') }}
              </button>
            </div>
          </form>
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
import { BackButton, BulkActionsBar, SelectAllCheckbox } from '@/components/ui';
import { useBulkSelect } from '@/composables/useBulkSelect';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import { usePreferences } from '@/config/usePreferences.js';
import AIEnhanceButton from '@/components/AIEnhanceButton.vue';
import { listBankAccounts } from '@/api_services/bank_accounts_api.js';
const router = useRouter();
const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getToken, getUserRole, getUserEmail } = decodeJWT();
const { formatCurrency, currencySymbol } = useCurrency();
const { preferences: brandPrefs, fetchPreferences } = usePreferences();
const tenantDetails = ref({});

const formatNumber = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try { if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n); return `${currencySymbol.value || 'K'}${formatNumber(n)}`; } catch (e) { return `${currencySymbol.value || 'K'}${formatNumber(n)}`; }
};
const hexToRgb = (hex) => {
  if (!hex || hex[0] !== '#') return [16, 185, 129]; // Default emerald
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

useActivityTracker({ userId: getUserEmail(), tenantId: getTenantId(), module: 'quotations-page' });

// ═══ Inventory module integration (read-only — no stock deduction for quotations) ═══
const hasInventoryModule = ref(false);
const inventoryItems = ref([]);
const invItemSearch = ref([]);
const invItemDropdown = ref([]);

async function loadInventoryModule() {
  try {
    const res = await fetch(`${API_BASE_URL}/modules-manager/owner/modules?tenant_id=${getTenantId()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    hasInventoryModule.value = (data.modules || []).includes('inventory');
  } catch (e) { console.error('Failed to check inventory module', e); }
}

async function loadInventoryItems() {
  if (!hasInventoryModule.value) return;
  try {
    const res = await fetch(`${API_BASE_URL}/inventory?tenant_id=${getTenantId()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) return;
    const data = await res.json();
    inventoryItems.value = Array.isArray(data) ? data : (data.items || []);
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

// ═══ State ═══
const loading = ref(false);
const saving = ref(false);
const quotations = ref([]);
const branches = ref([]);
const selectedBranch = ref(null);
const searchQuery = ref('');
const statusFilter = ref('all');
const dateFilter = ref('all');
const customStartDate = ref('');
const customEndDate = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(20);

// Multi-select state
const bulkDeleting = ref(false);
const showPreviewModal = ref(false);
const showEditModal = ref(false);
const showConvertModal = ref(false);
const selectedQuotation = ref(null);
const editingQuotation = ref(null);

// Conversion options
const convertPaymentType = ref('full'); // 'full' | 'partial'
const convertPartialAmount = ref(0);
const convertRemainingDueDate = ref('');

// ═══ Form Data ═══
const defaultForm = () => ({
  clientName: '',
  clientCompanyName: '',
  clientEmail: '',
  clientPhone: '',
  clientTpin: '',
  clientAddress: '',
  quotationNumber: '',
  date: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  status: 'draft',
  items: [{ description: '', quantity: 1, unitPrice: 0, item_id: null, item_type: null }],
  momoNumber: '',
  bankName: '',
  accountName: '',
  bankAccount: '',
  swiftCode: '',
  bankCode: '',
  sortCode: '',
  bank_account_id: '',
  notes: '',
  taxType: 'none',
  taxAmount: 0,
  discount: 0,
  discountType: 'percentage',
  linked_to_type: '',
  linked_to_id: '',
  paymentType: 'one-time',
  recurringFrequency: 'monthly',
  recurringInterval: 1,
  recurringStartDate: new Date().toISOString().split('T')[0],
  recurringEndDate: ''
});
const formData = ref(defaultForm());

// ═══ Computed ═══
const totalValue = computed(() => filteredQuotations.value.reduce((sum, q) => sum + getDocAmount(q), 0));
const acceptedCount = computed(() => filteredQuotations.value.filter(q => (q.status || '').toLowerCase() === 'accepted').length);
const draftCount = computed(() => filteredQuotations.value.filter(q => (q.status || 'draft').toLowerCase() === 'draft').length);

const filteredQuotations = computed(() => {
  let result = [...quotations.value];
  if (statusFilter.value !== 'all') result = result.filter(q => (q.status || 'draft').toLowerCase() === statusFilter.value);
  
  // Date range filter
  if (dateFilter.value !== 'all') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    result = result.filter(q => {
      const dateStr = q.date || q.created_at || q.updated_at;
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
    const s = searchQuery.value.toLowerCase();
    result = result.filter(q => (q.clientName || q.client_name || '').toLowerCase().includes(s) || (q.quotationNumber || q.invoiceNumber || '').toLowerCase().includes(s));
  }
  result.sort((a, b) => new Date(b.updated_at || b.created_at || b.date || 0) - new Date(a.updated_at || a.created_at || a.date || 0));
  return result;
});

const totalPages = computed(() => Math.ceil(filteredQuotations.value.length / itemsPerPage.value) || 1);
const paginatedQuotations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredQuotations.value.slice(start, start + itemsPerPage.value);
});

// ═══ Helpers ═══
const formatDate = (d) => { if (!d) return '—'; return new Date(d).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }); };

const calculateSubtotal = () => (formData.value.items || []).reduce((sum, item) => sum + ((item.quantity || 0) * (item.unitPrice || 0)), 0);

const calculateDiscountAmount = () => {
  const subtotal = calculateSubtotal();
  if (formData.value.discountType === 'percentage') return (subtotal * (formData.value.discount || 0)) / 100;
  return formData.value.discount || 0;
};

const calculateTaxAmount = () => {
  const subtotal = calculateSubtotal();
  const discount = calculateDiscountAmount();
  const taxableAmount = subtotal - discount;
  if (formData.value.taxType === 'turnover') return taxableAmount * 0.04;
  if (formData.value.taxType === 'vat16') return taxableAmount * 0.16;
  return 0;
};

const calculateTotal = () => {
  return calculateSubtotal() - calculateDiscountAmount() + calculateTaxAmount();
};

const getTaxLabel = () => {
  if (formData.value.taxType === 'turnover') return 'Turnover Tax (4%)';
  if (formData.value.taxType === 'vat16') return 'VAT (16%)';
  return 'Tax';
};

const getDocAmount = (doc) => {
  if (doc.total) return parseFloat(doc.total) || 0;
  if (doc.amount) return parseFloat(doc.amount) || 0;
  return (doc.items || []).reduce((s, i) => s + ((i.quantity || i.qty || 0) * (i.unitPrice || i.unit_price || i.price || 0)), 0);
};

const getStatusClass = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  const s = status.toLowerCase();
  if (s === 'draft') return 'bg-gray-100 text-gray-800';
  if (s === 'sent') return 'bg-blue-100 text-blue-800';
  if (s === 'accepted') return 'bg-green-100 text-green-800';
  if (s === 'rejected') return 'bg-red-100 text-red-800';
  return 'bg-gray-100 text-gray-800';
};
// ═══ Modal Actions ═══
const resetForm = () => { formData.value = defaultForm(); };

// Saved bank accounts
const bankAccounts = ref([]);
async function loadBankAccounts() {
  try {
    const data = await listBankAccounts(getTenantId());
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

// ── Client autocomplete (past quotation clients + CRM leads if module active) ──
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

const pastQuotationClients = computed(() => {
  const seen = new Set();
  const result = [];
  for (const q of quotations.value) {
    const name = q.clientName || q.client_name || '';
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({
      name,
      email: q.clientEmail || q.client_email || '',
      phone: q.clientPhone || q.client_phone || '',
      tpin: q.clientTpin || q.client_tpin || '',
      address: q.clientAddress || q.client_address || '',
      _source: 'past'
    });
  }
  return result;
});

const clientSuggestions = computed(() => {
  const q = clientSearchQuery.value.toLowerCase();
  const merged = [...pastQuotationClients.value];
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

const openCreateModal = async () => {
  resetForm();
  editingQuotation.value = null;
  selectedQuotation.value = null;
  showEditModal.value = true;
  await loadBankAccounts();
  const def = bankAccounts.value.find((a) => a.is_default);
  if (def) {
    formData.value.bank_account_id = def.id;
    applyBankAccount();
  }
  if (hasInventoryModule.value) await loadInventoryItems();
  invItemSearch.value = formData.value.items.map(i => i.description || '');
  invItemDropdown.value = formData.value.items.map(() => false);
  await loadCrmLeads();
  clientSearchQuery.value = '';
  clientDropdownOpen.value = false;
};

const viewDoc = (q) => {
  selectedQuotation.value = q;
  showPreviewModal.value = true;
};

const editDoc = (q) => {
  editingQuotation.value = q;
  selectedQuotation.value = q;
  formData.value = {
    clientName: q.clientName || q.client_name || '',
    clientEmail: q.clientEmail || q.client_email || '',
    clientPhone: q.clientPhone || q.client_phone || '',
    clientTpin: q.clientTpin || q.client_tpin || '',
    clientAddress: q.clientAddress || q.client_address || '',
    quotationNumber: q.quotationNumber || q.invoiceNumber || q.number || '',
    date: q.date ? new Date(q.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    validUntil: (q.validUntil || q.dueDate || q.due_date) ? new Date(q.validUntil || q.dueDate || q.due_date).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: (q.status || 'draft').toLowerCase(),
    items: (q.items || []).map(i => ({
      description: i.description || '',
      quantity: i.quantity || i.qty || 0,
      unitPrice: i.unitPrice || i.unit_price || i.price || 0,
      item_id: i.item_id || null,
      item_type: i.item_type || null
    })),
    momoNumber: q.momoNumber || q.momo_number || '',
    bankName: q.bankName || q.bank_name || '',
    accountName: q.accountName || q.account_name || '',
    bankAccount: q.bankAccount || q.bank_account || '',
    swiftCode: q.swiftCode || q.swift_code || '',
    bankCode: q.bankCode || q.bank_code || '',
    sortCode: q.sortCode || q.sort_code || '',
    bank_account_id: q.bank_account_id || '',
    notes: q.notes || '',
    taxType: q.taxType || q.tax_type || 'none',
    discount: q.discount || q.discount_amount || 0,
    discountType: q.discountType || 'fixed',
    linked_to_type: q.linked_to_type || '',
    linked_to_id: q.linked_to_id || ''
  };
  showEditModal.value = true;
  loadBankAccounts();
  if (hasInventoryModule.value) loadInventoryItems();
  invItemSearch.value = formData.value.items.map(i => i.description || '');
  invItemDropdown.value = formData.value.items.map(() => false);
  loadCrmLeads();
  clientSearchQuery.value = formData.value.clientName || '';
  clientDropdownOpen.value = false;
};

const makeCopy = (q) => {
  editingQuotation.value = null;
  selectedQuotation.value = null;
  formData.value = {
    clientName: q.clientName || q.client_name || '',
    clientEmail: q.clientEmail || q.client_email || '',
    clientPhone: q.clientPhone || q.client_phone || '',
    clientTpin: q.clientTpin || q.client_tpin || '',
    clientAddress: q.clientAddress || q.client_address || '',
    quotationNumber: '',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft',
    items: (q.items || []).map(i => ({
      description: i.description || '',
      quantity: i.quantity || i.qty || 0,
      unitPrice: i.unitPrice || i.unit_price || i.price || 0,
      item_id: i.item_id || null,
      item_type: i.item_type || null
    })),
    momoNumber: q.momoNumber || q.momo_number || '',
    bankName: q.bankName || q.bank_name || '',
    accountName: q.accountName || q.account_name || '',
    bankAccount: q.bankAccount || q.bank_account || '',
    swiftCode: q.swiftCode || q.swift_code || '',
    bankCode: q.bankCode || q.bank_code || '',
    sortCode: q.sortCode || q.sort_code || '',
    bank_account_id: q.bank_account_id || '',
    notes: q.notes || '',
    taxType: q.taxType || q.tax_type || 'none',
    discount: q.discount || q.discount_amount || 0,
    discountType: q.discountType || 'fixed',
    linked_to_type: '',
    linked_to_id: ''
  };
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
  setTimeout(() => { resetForm(); editingQuotation.value = null; }, 300);
};

const addItem = () => {
  formData.value.items.push({ description: '', quantity: 1, unitPrice: 0, item_id: null, item_type: null });
  const idx = formData.value.items.length - 1;
  invItemSearch.value[idx] = '';
  invItemDropdown.value[idx] = false;
};
const removeItem = (idx) => { if (formData.value.items.length > 1) formData.value.items.splice(idx, 1); };

// ═══ Convert Modal ═══
function openConvertModal(q) {
  // If from table row, close preview modal first
  showPreviewModal.value = false;
  selectedQuotation.value = q;
  convertPaymentType.value = 'full';
  convertPartialAmount.value = 0;
  convertRemainingDueDate.value = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  showConvertModal.value = true;
}

// ═══ Convert to Invoice ═══
const executeConversion = async () => {
  const q = selectedQuotation.value;
  if (!q) return;
  saving.value = true;
  try {
    const tenantId = getTenantId();
    const branchId = selectedBranch.value?.id || '';
    const total = getDocAmount(q);
    const partialAmount = convertPaymentType.value === 'partial' ? convertPartialAmount.value : total;
    
    const payload = {
      tenant_id: tenantId,
      branch_id: branchId,
      clientName: q.clientName || q.client_name || '',
      clientEmail: q.clientEmail || q.client_email || '',
      clientPhone: q.clientPhone || q.client_phone || '',
      clientTpin: q.clientTpin || q.client_tpin || '',
      clientAddress: q.clientAddress || q.client_address || '',
      date: new Date().toISOString().split('T')[0],
      dueDate: q.validUntil || q.dueDate || q.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'invoice',
      items: (q.items || []).map(item => ({
        description: item.description || '',
        quantity: parseInt(item.quantity || item.qty) || 1,
        unitPrice: parseFloat(item.unitPrice || item.unit_price || item.price) || 0,
        item_id: item.item_id || null,
        item_type: item.item_type || null
      })),
      notes: q.notes || '',
      momo_number: q.momoNumber || q.momo_number || null,
      bank_account: q.bankAccount || q.bank_account || null,
      bank_name: q.bankName || q.bank_name || null,
      bank_code: q.bankCode || q.bank_code || null,
      subtotal: total,
      total: partialAmount,
      status: convertPaymentType.value === 'partial' ? 'pending' : 'paid',
      linked_to_type: q.linked_to_type || null,
      linked_to_id: q.linked_to_id || null,
      // Partial payment fields
      paymentStatus: convertPaymentType.value === 'partial' ? 'partial' : 'full',
      partialAmount: partialAmount,
      remainingAmount: convertPaymentType.value === 'partial' ? Math.max(0, total - partialAmount) : 0,
      remainingDueDate: convertPaymentType.value === 'partial' ? convertRemainingDueDate.value : null,
      fullTotal: total
    };

    const response = await fetch(`${API_BASE_URL}/invoices?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Failed to create invoice from quotation');
    const result = await response.json();
    showConvertModal.value = false;
    alert(`Invoice #${result.invoiceNumber || result.id || ''} created${payload.paymentStatus === 'partial' ? ' (partial payment)' : ''}!`);
  } catch (err) {
    console.error('Convert error:', err);
    alert(err.message || 'Failed to convert quotation to invoice');
  } finally {
    saving.value = false;
  }
};

// ═══ Save Quotation ═══
const saveQuotation = async () => {
  saving.value = true;
  try {
    if (!formData.value.clientEmail?.trim()) throw new Error('Client email is required');
    if (!formData.value.date) throw new Error('Quotation date is required');
    if (!formData.value.validUntil) throw new Error('Valid until date is required');
    if (formData.value.items.length === 0) throw new Error('At least one item is required');

    const tenantId = getTenantId();
    const branchId = selectedBranch.value?.id || '';

    const payload = {
      tenant_id: tenantId,
      branch_id: branchId,
      clientName: formData.value.clientName.trim(),
      clientCompanyName: formData.value.clientCompanyName?.trim() || '',
      clientEmail: formData.value.clientEmail.trim(),
      clientPhone: formData.value.clientPhone?.trim() || '',
      clientTpin: formData.value.clientTpin?.trim() || '',
      clientAddress: formData.value.clientAddress?.trim() || '',
      quotationNumber: formData.value.quotationNumber?.trim() || '',
      invoiceNumber: formData.value.quotationNumber?.trim() || '',
      date: formData.value.date,
      dueDate: formData.value.validUntil,
      validUntil: formData.value.validUntil,
      type: 'quotation',
      items: formData.value.items.map(item => ({
        description: (item.description || '').trim(),
        quantity: parseInt(item.quantity) || 1,
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
      total: calculateTotal(),
      taxType: formData.value.taxType,
      taxAmount: calculateTaxAmount(),
      discount: parseFloat(formData.value.discount) || 0,
      discountType: formData.value.discountType,
      discountAmount: calculateDiscountAmount(),
      status: formData.value.status || 'draft',
      linked_to_type: formData.value.linked_to_type || null,
      linked_to_id: formData.value.linked_to_id || null,
      paymentType: formData.value.paymentType || 'one-time',
      recurringFrequency: formData.value.recurringFrequency || 'monthly',
      recurringInterval: formData.value.recurringInterval || 1,
      recurringStartDate: formData.value.recurringStartDate || '',
      recurringEndDate: formData.value.recurringEndDate || ''
    };

    let url, method;
    if (editingQuotation.value) {
      url = `${API_BASE_URL}/invoices/${editingQuotation.value.id || editingQuotation.value._id}?tenant_id=${tenantId}`;
      method = 'PATCH';
    } else {
      url = `${API_BASE_URL}/invoices?tenant_id=${tenantId}`;
      method = 'POST';
    }

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Failed to save quotation');
    }

    const result = await response.json();

    if (editingQuotation.value) {
      const index = quotations.value.findIndex(q => (q.id || q._id) === (editingQuotation.value.id || editingQuotation.value._id));
      if (index !== -1) quotations.value[index] = result;
    } else {
      quotations.value.unshift(result);
    }

    closeEditModal();
    
    // If payment type is recurring, auto-create recurring invoice template
    if (payload.paymentType === 'recurring' && !editingQuotation.value) {
      try {
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
    
    alert(editingQuotation.value ? 'Quotation updated successfully!' : 'Quotation created successfully!');
  } catch (error) {
    console.error('Save error:', error);
    alert(error.message || 'Failed to save quotation');
  } finally {
    saving.value = false;
  }
};

const fetchTenantDetails = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${getTenantId()}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (res.ok) {
      const data = await res.json();
      tenantDetails.value = data.tenant || data;
    }
  } catch (err) {
    console.error('Error fetching tenant details:', err);
  }
};

const loadImage = (url) => {
  if (!url) return Promise.resolve(null);
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
    img.onerror = (e) => {
      console.warn('Image load error:', e);
      resolve(null);
    };
    img.src = url;
  });
};

// ═══ PDF Download ═══
const downloadPDF = async (q) => {
  try {
    const doc = new jsPDF();
    const qNum = q.quotationNumber || q.invoiceNumber || q.number || 'DRAFT';
    const primaryRGB = hexToRgb(brandPrefs.primaryColor || '#10b981');
    
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
    const qCompanyName = (brandPrefs.companyName || tenantDetails.value.company_name || 'YOUR COMPANY').toUpperCase();
    const qCompanyNameLines = doc.splitTextToSize(qCompanyName, 90);
    qCompanyNameLines.forEach((line, i) => doc.text(line, 196, 20 + (i * 7), { align: 'right' }));
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    let compY = 20 + (qCompanyNameLines.length * 7);
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
    doc.text('QUOTATION', 14, headerY + 10);
    
    doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setLineWidth(1);
    doc.line(14, headerY + 14, 60, headerY + 14);

    // 4. Quotation Info (Under Title)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text(`QUOTATION #`, 14, headerY + 22);
    doc.setFont('helvetica', 'normal');
    doc.text(qNum, 45, headerY + 22);

    doc.setFont('helvetica', 'bold');
    doc.text(`DATE`, 14, headerY + 28);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(q.date), 45, headerY + 28);

    doc.setFont('helvetica', 'bold');
    doc.text(`VALID UNTIL`, 14, headerY + 34);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(q.validUntil || q.dueDate || q.due_date), 45, headerY + 34);

    // 5. Bill To (Right Side, Same level as Title)
    const billToY = headerY + 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text('BILL TO:', 120, billToY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    const qClientName = (q.clientName || q.client_name || 'CLIENT NAME').toUpperCase();
    const qClientNameLines = doc.splitTextToSize(qClientName, 68);
    doc.text(qClientNameLines, 120, billToY + 7);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    let cliY = billToY + 7 + (qClientNameLines.length * 5.5) + 1;
    if (q.clientAddress || q.client_address) {
       const addrLines = doc.splitTextToSize(q.clientAddress || q.client_address, 70);
       doc.text(addrLines, 120, cliY);
       cliY += (addrLines.length * 5);
    }
    if (q.clientEmail || q.client_email) { doc.text(q.clientEmail || q.client_email, 120, cliY); cliY += 5; }
    if (q.clientPhone || q.client_phone) { doc.text(q.clientPhone || q.client_phone, 120, cliY); cliY += 5; }
    if (q.clientTpin || q.client_tpin) { doc.text(`TPIN: ${q.clientTpin || q.client_tpin}`, 120, cliY); cliY += 5; }

    // 6. Table
    const tableStartY = Math.max(headerY + 45, cliY + 5);
    const items = q.items || [];
    
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
    const subtotal = q.subtotal || getDocAmount(q);
    const total = q.total || getDocAmount(q);
    
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
    
    if (q.taxAmount || q.tax_amount) {
      const taxLabel = q.taxType === 'vat16' || q.tax_type === 'vat16' ? 'VAT (16%)' : (q.taxType === 'turnover' || q.tax_type === 'turnover' ? 'Turnover Tax (4%)' : 'Tax:');
      doc.text(taxLabel, 110, currentTotalsY);
      doc.text(formatWithSymbol(q.taxAmount || q.tax_amount), 196, currentTotalsY, { align: 'right' });
      currentTotalsY += 6;
    }

    if (q.discountAmount || q.discount_amount) {
      const discLabel = (q.discountType === 'percentage' || q.discount_type === 'percentage') ? `Discount (${q.discount}%):` : 'Discount:';
      doc.text(discLabel, 110, currentTotalsY);
      doc.setTextColor(200, 0, 0);
      doc.text(`-${formatWithSymbol(q.discountAmount || q.discount_amount)}`, 196, currentTotalsY, { align: 'right' });
      doc.setTextColor(100);
      currentTotalsY += 6;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('TOTAL AMOUNT:', 110, currentTotalsY + 4);
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text(formatWithSymbol(total), 196, currentTotalsY + 4, { align: 'right' });

    // 8. Bottom Section (Notes & Payment)
    const PAGE_BOTTOM = 272; // leave room for footer at 280
    let bottomY = currentTotalsY + 16;
    
    const ensureSpace = (needed) => {
      if (bottomY + needed > PAGE_BOTTOM) {
        doc.addPage();
        bottomY = 20;
      }
    };
    
    if (q.notes) {
      ensureSpace(12);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.text('NOTES & TERMS', 14, bottomY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.setFontSize(9);
      const noteLines = doc.splitTextToSize(q.notes, 170);
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

    if (q.momoNumber || q.momo_number || q.bankAccount || q.bank_account) {
      ensureSpace(12);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.text('PAYMENT INFORMATION', 14, bottomY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100);
      doc.setFontSize(9);
      bottomY += 6;
      if (q.momoNumber || q.momo_number) { ensureSpace(5); doc.text(`Mobile Money: ${q.momoNumber || q.momo_number}`, 14, bottomY); bottomY += 5; }
      if (q.bankName || q.bank_name) { ensureSpace(5); doc.text(`Bank: ${q.bankName || q.bank_name}`, 14, bottomY); bottomY += 5; }
      if (q.accountName || q.account_name) { ensureSpace(5); doc.text(`Account Name: ${q.accountName || q.account_name}`, 14, bottomY); bottomY += 5; }
      if (q.bankAccount || q.bank_account) { ensureSpace(5); doc.text(`Account Number: ${q.bankAccount || q.bank_account}`, 14, bottomY); bottomY += 5; }
      if (q.swiftCode || q.swift_code) { ensureSpace(5); doc.text(`Swift Code: ${q.swiftCode || q.swift_code}`, 14, bottomY); bottomY += 5; }
      if (q.bankCode || q.bank_code) { ensureSpace(5); doc.text(`Bank Code: ${q.bankCode || q.bank_code}`, 14, bottomY); bottomY += 5; }
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

    doc.save(`Quotation_${qNum}.pdf`);
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF');
  }
};

// ═══ Delete ═══
const confirmDelete = async (q) => {
  if (!confirm(`Delete quotation #${q.quotationNumber || q.invoiceNumber || '—'}?`)) return;
  try {
    const resp = await fetch(`${API_BASE_URL}/invoices/${q.id || q._id}?tenant_id=${getTenantId()}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (resp.ok) quotations.value = quotations.value.filter(i => (i.id || i._id) !== (q.id || q._id));
    else alert('Failed to delete');
  } catch (err) { console.error(err); alert('Failed to delete'); }
};

const {
  selectedIds, selectionCount, isSelected, isAllPageSelected,
  toggleSelect, toggleSelectAll, clearSelection
} = useBulkSelect();

const bulkDelete = async () => {
  const count = selectedIds.value.size;
  if (!count) return;
  if (!confirm(`Are you sure you want to delete ${count} quotation(s)? This action cannot be undone.`)) return;

  bulkDeleting.value = true;
  try {
    const tenantId = getTenantId();
    const response = await fetch(`${API_BASE_URL}/invoices/quotations/bulk-delete?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [...selectedIds.value] })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.detail || 'Bulk delete failed');
    }
    const result = await response.json();
    quotations.value = quotations.value.filter(q => !selectedIds.value.has(q.id || q._id));
    clearSelection();
    alert(result.message || `${count} quotation(s) deleted.`);
  } catch (err) {
    console.error(err);
    alert(err?.message || 'Bulk delete failed');
  } finally {
    bulkDeleting.value = false;
  }
};

// ═══ Fetch Data ═══
const fetchQuotations = async () => {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    const branchParam = selectedBranch.value?.id ? `&branch_id=${selectedBranch.value.id}` : '';
    const resp = await fetch(`${API_BASE_URL}/invoices?tenant_id=${tenantId}&type=quotation${branchParam}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (resp.ok) {
      const data = await resp.json();
      quotations.value = Array.isArray(data) ? data : (data.quotations || data.invoices || []);
    }
  } catch (err) { console.error(err); } finally { loading.value = false; }
};

const refreshData = () => fetchQuotations();

// ═══ Branches ═══
const initializeBranches = async () => {
  try {
    branches.value = await getBranches();
    const fixedBranchId = getBranchId();
    const isOwner = ['owner', 'admin', 'super_admin'].includes(getUserRole()?.toLowerCase());
    if (fixedBranchId && !isOwner) {
      const b = branches.value.find(b => b.id === fixedBranchId);
      if (b) { selectedBranch.value = b; setSelectedBranch(b); return; }
    } else {
      if (!branches.value.some(b => !b.id && b.name === 'All Branches')) branches.value.unshift({ id: '', name: 'All Branches' });
    }
    const stored = getSelectedBranch();
    if (stored && branches.value.some(b => b.id === stored.id)) selectedBranch.value = stored;
    else if (branches.value.length > 0) { selectedBranch.value = branches.value[0]; setSelectedBranch(branches.value[0]); }
  } catch (err) { console.error(err); }
};

watch(selectedBranch, async (v) => { if (v) { setSelectedBranch(v); await fetchQuotations(); } }, { deep: true });
onMounted(async () => { 
  await initializeBranches(); 
  await fetchQuotations(); 
  await fetchPreferences();
  await fetchTenantDetails();
  await loadInventoryModule();
  await loadCrmModule();
});
</script>

<style scoped>
.mesh-background { background-color: #fff; background-image: linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px); background-size: 30px 30px; }
.bg-brand { background-color: v-bind('brandPrefs.primaryColor || "#10b981"'); }
.text-brand { color: v-bind('brandPrefs.primaryColor || "#10b981"'); }
.border-brand { border-color: v-bind('brandPrefs.primaryColor || "#10b981"'); }
.bg-brand\/5 { background-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#10b981"'), transparent 95%); }
.border-brand\/20 { border-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#10b981"'), transparent 80%); }
.border-t-brand { border-top-color: v-bind('brandPrefs.primaryColor || "#10b981"'); }
.focus\:border-brand:focus { border-color: v-bind('brandPrefs.primaryColor || "#10b981"'); }
.focus\:ring-brand:focus { --tw-ring-color: v-bind('brandPrefs.primaryColor || "#10b981"'); }
</style>
