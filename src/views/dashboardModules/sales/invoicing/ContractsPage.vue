<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/invoicing" variant="icon-only" />
          <div class="w-2 h-8 bg-brand rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-file-signature text-brand"></i>
              <span>Invoice Management // Contracts</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Contracts</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div v-if="branches.length > 0" class="hidden md:block">
            <select v-model="selectedBranch" class="rounded-none border-gray-200 shadow-sm text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3">
              <option v-for="branch in branches" :key="branch.id" :value="branch">{{ branch.name }}</option>
            </select>
          </div>
          <button @click="refreshData" :disabled="loading" class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-brand hover:opacity-80 uppercase tracking-wider transition-all disabled:opacity-50 border border-brand/20 px-3 py-1.5 hover:bg-brand/5">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
          </button>
          <button @click="openCreateModal" class="bg-brand hover:opacity-90 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> New Contract
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-brand rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Contracts...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Contracts</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ contracts.length }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Value</p>
            <h4 class="text-2xl font-black text-brand font-display mt-1">{{ formatWithSymbol(totalValue) }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active</p>
            <h4 class="text-2xl font-black text-green-600 font-display mt-1">{{ activeCount }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Draft</p>
            <h4 class="text-2xl font-black text-gray-500 font-display mt-1">{{ draftCount }}</h4>
          </div>
        </div>

        <!-- Filter & Search -->
        <div class="relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-sm">
          <div class="flex flex-col sm:flex-row gap-3">
            <input v-model="searchQuery" type="text" placeholder="Search contracts..." class="flex-1 rounded-none border border-gray-200 px-4 py-2.5 text-sm font-mono focus:border-brand focus:ring-1 focus:ring-brand">
            <select v-model="statusFilter" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm font-mono focus:border-brand focus:ring-1 focus:ring-brand">
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="signed">Signed</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <!-- Bulk Actions Bar -->
        <BulkActionsBar :count="selectionCount" @clear="clearSelection" @delete="bulkDelete" :deleting="bulkDeleting" />

        <!-- Contracts Table -->
        <div class="relative overflow-hidden bg-white border border-gray-100 rounded-none shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="py-3 px-3 text-center w-10">
                    <SelectAllCheckbox :model-value="isAllPageSelected" @update:model-value="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Title</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Type</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Party B</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Period</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="c in paginatedContracts" :key="c.id || c._id" class="hover:bg-gray-50/50 transition-colors group" :class="{ 'bg-blue-50/40': selectedIds.has(c.id || c._id) }">
                  <td class="py-3 px-3 text-center">
                    <input type="checkbox" :checked="selectedIds.has(c.id || c._id)" @change="toggleSelect(c)" class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] cursor-pointer" />
                  </td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-brand uppercase max-w-[200px] truncate">{{ c.title || 'Untitled' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500 uppercase">{{ c.contractType || c.type || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-gray-700 uppercase">{{ c.partyBName || c.partyB?.name || c.clientName || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500">{{ formatDate(c.startDate || c.start_date) }} — {{ formatDate(c.endDate || c.end_date) }}</td>
                  <td class="py-3 px-4 text-right text-[10px] font-mono font-black text-gray-900">{{ formatWithSymbol(parseFloat(c.amount) || 0) }}</td>
                  <td class="py-3 px-4 text-right">
                    <span :class="getStatusClass(c.status)" class="text-[8px] font-mono font-black px-2 py-1 border uppercase">{{ c.status || 'Draft' }}</span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button @click="viewContract(c)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="View"><i class="fas fa-eye text-xs"></i></button>
                      <button @click="editContract(c)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit"><i class="fas fa-edit text-xs"></i></button>
                      <button @click="downloadContractPDF(c)" class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Download PDF"><i class="fas fa-file-pdf text-xs"></i></button>
                      <button @click="makeCopy(c)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="Make a Copy"><i class="fas fa-copy text-xs"></i></button>
                      <button @click="confirmDelete(c)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><i class="fas fa-trash text-xs"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredContracts.length === 0">
                  <td colspan="8" class="py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <i class="fas fa-file-signature text-3xl text-gray-200 mb-3 block"></i>NO_CONTRACTS_FOUND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="filteredContracts.length > 0" class="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
            <div class="text-[9px] font-mono text-gray-400 uppercase">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredContracts.length) }} of {{ filteredContracts.length }}</div>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Prev</button>
              <span class="px-3 py-1 text-[9px] font-mono font-bold text-blue-600">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ============ PREVIEW MODAL ============ -->
    <Teleport to="body">
      <div v-if="showPreviewModal" @click.self="showPreviewModal = false" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div @click.stop class="bg-white rounded-none shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto relative">
          <!-- Brand Accent Top -->
          <div class="h-1.5 w-full bg-brand"></div>

          <div class="sticky top-1.5 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex justify-between items-center z-10">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase tracking-tight">Contract Preview</h3>
            <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600 p-2 transition-colors"><i class="fas fa-times text-xl"></i></button>
          </div>

          <div v-if="selectedContract" class="p-8 md:p-12 bg-white">

            <!-- ── Document Header: Logo & Company Info ── -->
            <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <!-- Left: Logo + Company Identity -->
              <div class="flex items-center gap-4">
                <div v-if="brandPrefs.companyLogo || tenantDetails.company_logo" class="w-24 h-24 bg-gray-50 flex items-center justify-center p-2 border border-gray-100 shadow-sm flex-shrink-0">
                  <img :src="brandPrefs.companyLogo || tenantDetails.company_logo" class="max-w-full max-h-full object-contain" alt="Logo" />
                </div>
                <div>
                  <h2 class="text-2xl font-black tracking-tighter text-brand uppercase">{{ brandPrefs.companyName || tenantDetails.company_name || 'Your Company' }}</h2>
                  <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">Legal Contract</div>
                  <p v-if="tenantDetails.email" class="text-[11px] font-mono text-gray-500 mt-1">{{ tenantDetails.email }}</p>
                  <p v-if="tenantDetails.website" class="text-[11px] font-mono text-brand mt-0.5">{{ tenantDetails.website }}</p>
                </div>
              </div>
              <!-- Right: Full Tenant Contact Details -->
              <div class="text-left md:text-right space-y-1">
                <p v-if="tenantDetails.address" class="text-sm font-bold text-gray-900 uppercase">{{ tenantDetails.address }}</p>
                <p v-if="tenantDetails.city || tenantDetails.country" class="text-[11px] font-medium text-gray-500 uppercase">
                  {{ tenantDetails.city }}{{ tenantDetails.city && tenantDetails.country ? ', ' : '' }}{{ tenantDetails.country }}
                </p>
                <p v-if="tenantDetails.province || tenantDetails.state" class="text-[11px] font-medium text-gray-500 uppercase">{{ tenantDetails.province || tenantDetails.state }}</p>
                <p v-if="tenantDetails.phone_number" class="text-[11px] font-medium text-gray-500">Tel: {{ tenantDetails.phone_number }}</p>
                <p v-if="tenantDetails.tpin" class="text-[11px] font-mono font-bold text-brand uppercase">TPIN: {{ tenantDetails.tpin }}</p>
                <p v-if="tenantDetails.email && !tenantDetails.address" class="text-[11px] font-mono text-gray-500">{{ tenantDetails.email }}</p>
              </div>
            </div>

            <!-- ── Contract Title & Meta ── -->
            <div class="flex flex-col md:flex-row justify-between items-start gap-6 mb-10 pb-8 border-b border-gray-100">
              <div class="space-y-4">
                <div>
                  <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Contract Reference</p>
                  <p class="text-4xl font-black text-brand tracking-tighter">#{{ selectedContract.contract_number || selectedContract.contractNumber || '—' }}</p>
                </div>
                <div>
                  <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Contract Title</p>
                  <p class="text-lg font-black text-gray-900 uppercase">{{ selectedContract.title || 'Untitled Contract' }}</p>
                </div>
                <div class="flex gap-8">
                  <div v-if="selectedContract.contractType || selectedContract.type">
                    <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Type</p>
                    <p class="text-sm font-bold text-gray-800 uppercase">{{ selectedContract.contractType || selectedContract.type }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Start Date</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(selectedContract.startDate || selectedContract.start_date) }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">End Date</p>
                    <p class="text-sm font-bold text-gray-900">{{ formatDate(selectedContract.endDate || selectedContract.end_date) }}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end gap-4">
                <div :class="getStatusClass(selectedContract.status)" class="inline-block text-xs font-mono font-black px-6 py-2 border-2 uppercase tracking-widest">{{ selectedContract.status || 'Draft' }}</div>
                <div class="text-right">
                  <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-wider mb-1">Contract Value</p>
                  <p class="text-3xl font-black text-brand tracking-tighter">{{ formatWithSymbol(parseFloat(selectedContract.amount) || 0) }}</p>
                </div>
              </div>
            </div>

            <!-- ── Parties Grid ── -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div class="bg-gray-50/50 p-6 border-l-4 border-brand">
                <h4 class="text-[10px] font-mono font-black text-brand uppercase tracking-widest mb-4">Party A — Our Company</h4>
                <div class="space-y-3">
                  <div>
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Name</p>
                    <p class="text-base font-black text-gray-900 uppercase">{{ selectedContract.partyAName || selectedContract.partyA?.name || brandPrefs.companyName || tenantDetails.company_name || '—' }}</p>
                  </div>
                  <div v-if="selectedContract.partyAEmail || selectedContract.partyA?.email">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Email</p>
                    <p class="text-sm font-bold text-gray-700">{{ selectedContract.partyAEmail || selectedContract.partyA?.email }}</p>
                  </div>
                  <div v-if="selectedContract.partyAAddress || selectedContract.partyA?.address">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Address</p>
                    <p class="text-sm text-gray-600">{{ selectedContract.partyAAddress || selectedContract.partyA?.address }}</p>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50/50 p-6 border-l-4 border-gray-300">
                <h4 class="text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest mb-4">Party B — Client / Counterparty</h4>
                <div class="space-y-3">
                  <div>
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Name</p>
                    <p class="text-base font-black text-gray-900 uppercase">{{ selectedContract.partyBName || selectedContract.partyB?.name || selectedContract.clientName || '—' }}</p>
                  </div>
                  <div v-if="selectedContract.partyBEmail || selectedContract.partyB?.email">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Email</p>
                    <p class="text-sm font-bold text-gray-700">{{ selectedContract.partyBEmail || selectedContract.partyB?.email }}</p>
                  </div>
                  <div v-if="selectedContract.partyBAddress || selectedContract.partyB?.address">
                    <p class="text-[10px] font-mono text-gray-400 uppercase">Address</p>
                    <p class="text-sm text-gray-600">{{ selectedContract.partyBAddress || selectedContract.partyB?.address }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── Content Sections ── -->
            <div v-if="selectedContract.scopeOfWork || selectedContract.scope_of_work" class="mb-6">
              <h4 class="text-sm font-black text-brand uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Scope of Work</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedContract.scopeOfWork || selectedContract.scope_of_work }}</p>
            </div>
            <div v-if="selectedContract.termsAndConditions || selectedContract.terms_and_conditions" class="mb-6">
              <h4 class="text-sm font-black text-brand uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Terms & Conditions</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedContract.termsAndConditions || selectedContract.terms_and_conditions }}</p>
            </div>
            <div v-if="selectedContract.paymentTerms || selectedContract.payment_terms" class="mb-6">
              <h4 class="text-sm font-black text-brand uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Payment Terms</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedContract.paymentTerms || selectedContract.payment_terms }}</p>
            </div>

            <!-- ── Deliverables Table ── -->
            <div v-if="previewDeliverables.length > 0" class="mb-8 overflow-hidden border border-gray-200">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-brand text-white">
                    <th class="py-3 px-5 text-[10px] font-mono font-black uppercase tracking-widest">Deliverable</th>
                    <th class="py-3 px-4 text-center text-[10px] font-mono font-black uppercase tracking-widest w-36">Due Date</th>
                    <th class="py-3 px-5 text-[10px] font-mono font-black uppercase tracking-widest">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(d, i) in previewDeliverables" :key="i" class="hover:bg-gray-50/50 transition-colors">
                    <td class="py-3 px-5 text-sm font-black text-gray-800 uppercase">{{ d.title }}</td>
                    <td class="py-3 px-4 text-center text-sm font-mono font-bold text-gray-700">{{ d.dueDate || '—' }}</td>
                    <td class="py-3 px-5 text-sm text-gray-600">{{ d.description || '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="selectedContract.confidentiality" class="mb-6">
              <h4 class="text-sm font-black text-brand uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Confidentiality</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedContract.confidentiality }}</p>
            </div>
            <div v-if="selectedContract.disputeResolution || selectedContract.dispute_resolution" class="mb-6">
              <h4 class="text-sm font-black text-brand uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Dispute Resolution</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedContract.disputeResolution || selectedContract.dispute_resolution }}</p>
            </div>
            <div v-if="selectedContract.notes" class="mb-6">
              <h4 class="text-sm font-black text-brand uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Additional Notes</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedContract.notes }}</p>
            </div>

            <!-- ── Signature Block ── -->
            <div class="mt-10 grid grid-cols-2 gap-16 border-t border-gray-100 pt-10">
              <div>
                <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6">Party A Signature</p>
                <div class="border-b-2 border-gray-300 mb-2"></div>
                <p class="text-[10px] font-mono text-gray-500">{{ selectedContract.partyAName || selectedContract.partyA?.name || brandPrefs.companyName || '' }}</p>
                <p class="text-[10px] font-mono text-gray-400 mt-1">Date: _______________</p>
              </div>
              <div>
                <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-6">Party B Signature</p>
                <div class="border-b-2 border-gray-300 mb-2"></div>
                <p class="text-[10px] font-mono text-gray-500">{{ selectedContract.partyBName || selectedContract.partyB?.name || selectedContract.clientName || '' }}</p>
                <p class="text-[10px] font-mono text-gray-400 mt-1">Date: _______________</p>
              </div>
            </div>

            <!-- ── Action Toolbar ── -->
            <div class="flex flex-wrap gap-3 justify-end pt-8 border-t border-gray-100 mt-10">
              <button @click="downloadContractPDF(selectedContract)" class="bg-brand hover:opacity-90 text-white px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all shadow-md active:scale-95">
                <i class="fas fa-file-pdf"></i> Generate PDF Document
              </button>
              <button @click="showPreviewModal = false; editContract(selectedContract)" class="bg-white border border-gray-200 text-gray-700 hover:border-brand hover:text-brand px-8 py-3 rounded-none text-[10px] font-black font-mono uppercase flex items-center gap-3 transition-all">
                <i class="fas fa-edit"></i> Modify Record
              </button>
            </div>

            <!-- ── Footer Attribution ── -->
            <div class="mt-10 text-center">
              <p class="text-[9px] font-mono text-gray-300 uppercase tracking-[0.2em]">Generated Securely via {{ brandPrefs.companyName || tenantDetails.company_name || 'UB App' }} Cloud Systems</p>
            </div>

          </div>
        </div>
      </div>
    </Teleport>

    <!-- ============ CREATE / EDIT MODAL ============ -->
    <Teleport to="body">
      <div v-if="showEditModal" @click.self="closeEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div class="bg-white rounded-none shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto" @click.stop>
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">{{ editingContract ? 'Edit Contract' : 'Create New Contract' }}</h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>

          <form @submit.prevent="saveContract" class="p-6 space-y-6">
            <!-- Contract Information -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-file-signature text-blue-500"></i> Contract Information
              </h4>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Contract Title *</label>
                  <div class="flex gap-2">
                    <input v-model="formData.title" required type="text" placeholder="e.g. Service Agreement" class="flex-1 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <button type="button" @click="generateDocNumber" :disabled="isGeneratingNumber" class="px-3 py-2 bg-gray-50 text-blue-600 border border-gray-200 rounded-none hover:bg-gray-100 transition-colors text-xs font-bold whitespace-nowrap flex items-center gap-1 disabled:opacity-50">
                      <i :class="isGeneratingNumber ? 'fas fa-spinner animate-spin' : 'fas fa-magic'"></i> Gen #
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Contract Type</label>
                  <select v-model="formData.contractType" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">Select Type</option>
                    <option value="service">Service Agreement</option>
                    <option value="employment">Employment Contract</option>
                    <option value="nda">NDA</option>
                    <option value="partnership">Partnership Agreement</option>
                    <option value="sales">Sales Contract</option>
                    <option value="lease">Lease Agreement</option>
                    <option value="consulting">Consulting Agreement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Start Date</label>
                  <input v-model="formData.startDate" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">End Date</label>
                  <input v-model="formData.endDate" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Contract Amount</label>
                  <input v-model.number="formData.amount" type="number" step="0.01" placeholder="0.00" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select v-model="formData.status" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="signed">Signed</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Party A -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-building text-blue-500"></i> Party A (Your Company)
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 border border-gray-200">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                  <input v-model="formData.partyAName" type="text" placeholder="Your company name" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Email</label>
                  <input v-model="formData.partyAEmail" type="email" placeholder="company@email.com" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Address</label>
                  <input v-model="formData.partyAAddress" type="text" placeholder="Address" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
              </div>
            </div>

            <!-- Party B -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-user-tie text-blue-500"></i> Party B (Client / Counterparty)
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 border border-gray-200">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Name *</label>
                  <input v-model="formData.partyBName" required type="text" placeholder="Client / Company name" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Email</label>
                  <input v-model="formData.partyBEmail" type="email" placeholder="client@email.com" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Address</label>
                  <input v-model="formData.partyBAddress" type="text" placeholder="Address" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                </div>
              </div>
            </div>

            <!-- CRM Link -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-link text-blue-500"></i> Link to CRM (Optional)
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 border border-gray-200">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Link To</label>
                  <select v-model="formData.linkedToType" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option value="">None</option>
                    <option value="lead">Lead</option>
                    <option value="contact">Contact</option>
                    <option value="account">Account</option>
                    <option value="deal">Deal</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Select Record</label>
                  <select v-model="formData.linkedToId" :disabled="!formData.linkedToType || loadingCrmRecords" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <option value="">Select {{ formData.linkedToType ? formData.linkedToType.charAt(0).toUpperCase() + formData.linkedToType.slice(1) : 'Record' }}</option>
                    <option v-for="rec in crmRecords" :key="rec.id || rec._id" :value="rec.id || rec._id">
                      {{ rec.name || rec.title || (rec.firstName ? `${rec.firstName} ${rec.lastName}` : 'Unknown') }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Scope of Work with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-tasks text-blue-500"></i> Scope of Work
              </h4>
              <textarea v-model="formData.scopeOfWork" rows="5" placeholder="Describe the work to be performed under this contract..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              <AIEnhanceButton v-model="formData.scopeOfWork" context="contract_scope_of_work" tooltip="Use AI to enhance scope of work" />
            </div>

            <!-- Terms & Conditions with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-gavel text-blue-500"></i> Terms & Conditions
              </h4>
              <textarea v-model="formData.termsAndConditions" rows="5" placeholder="Specify the terms and conditions of this contract..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              <AIEnhanceButton v-model="formData.termsAndConditions" context="contract_terms_and_conditions" tooltip="Use AI to enhance terms" />
            </div>

            <!-- Payment Terms with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-money-check-alt text-blue-500"></i> Payment Terms
              </h4>
              <textarea v-model="formData.paymentTerms" rows="3" placeholder="Describe payment schedule and conditions..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              <AIEnhanceButton v-model="formData.paymentTerms" context="contract_payment_terms" tooltip="Use AI to enhance payment terms" />
            </div>

            <!-- Deliverables -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-clipboard-list text-blue-500"></i> Deliverables
              </h4>
              <div class="space-y-2">
                <div v-for="(d, idx) in formData.deliverables" :key="idx" class="grid grid-cols-12 gap-2 items-center">
                  <input v-model="formData.deliverables[idx].title" placeholder="Deliverable name" class="col-span-3 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <input v-model="formData.deliverables[idx].description" placeholder="Description" class="col-span-5 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <input v-model="formData.deliverables[idx].dueDate" placeholder="Due date" type="date" class="col-span-3 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <div class="col-span-1 text-center">
                    <button type="button" @click="removeDeliverable(idx)" class="text-red-600 hover:text-red-800 transition-colors"><i class="fas fa-times"></i></button>
                  </div>
                </div>
                <button type="button" @click="addDeliverable" class="text-[10px] font-mono font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider flex items-center gap-2">
                  <i class="fas fa-plus-circle"></i> Add Deliverable
                </button>
              </div>
            </div>

            <!-- Confidentiality with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-lock text-blue-500"></i> Confidentiality Clause
              </h4>
              <textarea v-model="formData.confidentiality" rows="3" placeholder="Confidentiality and non-disclosure terms..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              <AIEnhanceButton v-model="formData.confidentiality" context="contract_confidentiality_clause" tooltip="Use AI to enhance confidentiality clause" />
            </div>

            <!-- Dispute Resolution with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-balance-scale text-blue-500"></i> Dispute Resolution
              </h4>
              <textarea v-model="formData.disputeResolution" rows="3" placeholder="Process for resolving disputes..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
              <AIEnhanceButton v-model="formData.disputeResolution" context="contract_dispute_resolution" tooltip="Use AI to enhance dispute resolution" />
            </div>

            <!-- Additional Notes -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-sticky-note text-blue-500"></i> Additional Notes
              </h4>
              <textarea v-model="formData.notes" rows="3" placeholder="Any additional notes or clauses..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button @click="closeEditModal" type="button" class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase transition-colors">
                Cancel
              </button>
              <button type="submit" :disabled="saving" class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 transition-colors disabled:opacity-50">
                <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ saving ? 'Saving...' : (editingContract ? 'Update Contract' : 'Create Contract') }}
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
import { usePreferences } from '@/config/usePreferences';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import AIEnhanceButton from '@/components/AIEnhanceButton.vue';

const router = useRouter();
const { preferences: brandPrefs, fetchPreferences } = usePreferences();
const tenantDetails = ref({});
const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getToken, getUserRole, getUserEmail } = decodeJWT();
const { formatCurrency, currencySymbol } = useCurrency();
const formatNumber = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try { if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n); return `${currencySymbol.value || 'K'}${formatNumber(n)}`; } catch (e) { return `${currencySymbol.value || 'K'}${formatNumber(n)}`; }
};
useActivityTracker({ userId: getUserEmail(), tenantId: getTenantId(), module: 'contracts-page' });

// ─── State ──────────────────────────────
const loading = ref(false);
const saving = ref(false);
const contracts = ref([]);
const branches = ref([]);
const selectedBranch = ref(null);
const searchQuery = ref('');
const statusFilter = ref('all');
const currentPage = ref(1);
const itemsPerPage = ref(20);

// Multi-select state
const bulkDeleting = ref(false);

const showPreviewModal = ref(false);
const showEditModal = ref(false);
const selectedContract = ref(null);
const editingContract = ref(null);
const isGeneratingNumber = ref(false);

// CRM linking
const crmRecords = ref([]);
const loadingCrmRecords = ref(false);

// ─── Computed ───────────────────────────
const totalValue = computed(() => contracts.value.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0));
const activeCount = computed(() => contracts.value.filter(c => ['active', 'signed'].includes((c.status || '').toLowerCase())).length);
const draftCount = computed(() => contracts.value.filter(c => (c.status || 'draft').toLowerCase() === 'draft').length);

const filteredContracts = computed(() => {
  let result = [...contracts.value];
  if (statusFilter.value !== 'all') result = result.filter(c => (c.status || 'draft').toLowerCase() === statusFilter.value);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(c => (c.title || '').toLowerCase().includes(q) || (c.partyBName || c.partyB?.name || c.clientName || '').toLowerCase().includes(q));
  }
  result.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
  return result;
});

const totalPages = computed(() => Math.ceil(filteredContracts.value.length / itemsPerPage.value) || 1);
const paginatedContracts = computed(() => filteredContracts.value.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value));

const previewDeliverables = computed(() => {
  if (!selectedContract.value) return [];
  const d = selectedContract.value.deliverables || [];
  return d.filter(x => x && x.title);
});

// ─── Form ───────────────────────────────
const getDefaultForm = () => ({
  title: '',
  contractType: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  amount: 0,
  status: 'draft',
  partyAName: '',
  partyAEmail: '',
  partyAAddress: '',
  partyBName: '',
  partyBEmail: '',
  partyBAddress: '',
  scopeOfWork: '',
  termsAndConditions: '',
  paymentTerms: '',
  deliverables: [{ title: '', description: '', dueDate: '' }],
  confidentiality: '',
  disputeResolution: '',
  notes: '',
  linkedToType: '',
  linkedToId: '',
  contractNumber: ''
});

const formData = ref(getDefaultForm());

// ─── Helpers ────────────────────────────
const formatDate = (d) => { if (!d) return '—'; return new Date(d).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }); };
const getStatusClass = (status) => {
  const s = (status || 'draft').toLowerCase();
  return { draft: 'text-gray-500 border-gray-200 bg-gray-50', active: 'text-green-600 border-green-200 bg-green-50', signed: 'text-brand border-brand/20 bg-brand/5', expired: 'text-red-600 border-red-200 bg-red-50', cancelled: 'text-red-600 border-red-200 bg-red-50' }[s] || 'text-gray-500 border-gray-200 bg-gray-50';
};

// ─── Deliverable Rows ───────────────────
const addDeliverable = () => formData.value.deliverables.push({ title: '', description: '', dueDate: '' });
const removeDeliverable = (idx) => { if (formData.value.deliverables.length > 1) formData.value.deliverables.splice(idx, 1); };

// ─── Generate Number ────────────────────
const generateDocNumber = async () => {
  isGeneratingNumber.value = true;
  try {
    const resp = await fetch(`${API_BASE_URL}/invoices/generate-number?tenant_id=${getTenantId()}&type=contract`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) { const data = await resp.json(); formData.value.contractNumber = data.number || data.document_number || data; }
  } catch (err) { console.error(err); } finally { isGeneratingNumber.value = false; }
};

// ─── CRM Records ────────────────────────
const fetchCrmRecords = async (type) => {
  if (!type) { crmRecords.value = []; return; }
  loadingCrmRecords.value = true;
  try {
    const endpoint = { lead: 'leads', contact: 'contacts', account: 'accounts', deal: 'deals' }[type] || type;
    const resp = await fetch(`${API_BASE_URL}/crm/${endpoint}?tenant_id=${getTenantId()}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) { const data = await resp.json(); crmRecords.value = Array.isArray(data) ? data : (data[endpoint] || data.items || []); }
  } catch (err) { console.error(err); crmRecords.value = []; } finally { loadingCrmRecords.value = false; }
};

watch(() => formData.value.linkedToType, (v) => fetchCrmRecords(v));

// ─── Modals ─────────────────────────────
const openCreateModal = () => {
  editingContract.value = null;
  formData.value = getDefaultForm();
  fetchTenantDetails();
  showEditModal.value = true;
};

const viewContract = (c) => { selectedContract.value = c; showPreviewModal.value = true; };

const editContract = (c) => {
  editingContract.value = c;
  formData.value = {
    title: c.title || '',
    contractType: c.contractType || c.type || '',
    startDate: (c.startDate || c.start_date || '').split('T')[0],
    endDate: (c.endDate || c.end_date || '').split('T')[0],
    amount: parseFloat(c.amount) || 0,
    status: c.status || 'draft',
    partyAName: c.partyAName || c.partyA?.name || '',
    partyAEmail: c.partyAEmail || c.partyA?.email || '',
    partyAAddress: c.partyAAddress || c.partyA?.address || '',
    partyBName: c.partyBName || c.partyB?.name || c.clientName || '',
    partyBEmail: c.partyBEmail || c.partyB?.email || '',
    partyBAddress: c.partyBAddress || c.partyB?.address || '',
    scopeOfWork: c.scopeOfWork || c.scope_of_work || '',
    termsAndConditions: c.termsAndConditions || c.terms_and_conditions || '',
    paymentTerms: c.paymentTerms || c.payment_terms || '',
    deliverables: (c.deliverables && c.deliverables.length > 0) ? c.deliverables.map(d => ({ title: d.title || '', description: d.description || '', dueDate: d.dueDate || '' })) : [{ title: '', description: '', dueDate: '' }],
    confidentiality: c.confidentiality || '',
    disputeResolution: c.disputeResolution || c.dispute_resolution || '',
    notes: c.notes || '',
    linkedToType: c.linkedToType || c.linked_to_type || '',
    linkedToId: c.linkedToId || c.linked_to_id || '',
    contractNumber: c.contractNumber || c.contract_number || ''
  };
  showEditModal.value = true;
};

const makeCopy = (c) => {
  editingContract.value = null;
  formData.value = {
    title: c.title ? `${c.title} (Copy)` : '',
    contractType: c.contractType || c.type || '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    amount: parseFloat(c.amount) || 0,
    status: 'draft',
    partyAName: c.partyAName || c.partyA?.name || '',
    partyAEmail: c.partyAEmail || c.partyA?.email || '',
    partyAAddress: c.partyAAddress || c.partyA?.address || '',
    partyBName: c.partyBName || c.partyB?.name || c.clientName || '',
    partyBEmail: c.partyBEmail || c.partyB?.email || '',
    partyBAddress: c.partyBAddress || c.partyB?.address || '',
    scopeOfWork: c.scopeOfWork || c.scope_of_work || '',
    termsAndConditions: c.termsAndConditions || c.terms_and_conditions || '',
    paymentTerms: c.paymentTerms || c.payment_terms || '',
    deliverables: (c.deliverables && c.deliverables.length > 0) ? c.deliverables.map(d => ({ title: d.title || '', description: d.description || '', dueDate: '' })) : [{ title: '', description: '', dueDate: '' }],
    confidentiality: c.confidentiality || '',
    disputeResolution: c.disputeResolution || c.dispute_resolution || '',
    notes: c.notes || '',
    linkedToType: '',
    linkedToId: '',
    contractNumber: ''
  };
  showEditModal.value = true;
};

const closeEditModal = () => { showEditModal.value = false; editingContract.value = null; };

// ─── Save Contract ──────────────────────
const saveContract = async () => {
  saving.value = true;
  try {
    const payload = {
      tenant_id: getTenantId(),
      title: formData.value.title,
      contractType: formData.value.contractType,
      type: formData.value.contractType,
      startDate: formData.value.startDate,
      endDate: formData.value.endDate,
      amount: formData.value.amount,
      status: formData.value.status,
      partyAName: formData.value.partyAName,
      partyAEmail: formData.value.partyAEmail,
      partyAAddress: formData.value.partyAAddress,
      partyBName: formData.value.partyBName,
      partyBEmail: formData.value.partyBEmail,
      partyBAddress: formData.value.partyBAddress,
      clientName: formData.value.partyBName,
      scopeOfWork: formData.value.scopeOfWork,
      termsAndConditions: formData.value.termsAndConditions,
      paymentTerms: formData.value.paymentTerms,
      deliverables: formData.value.deliverables.filter(d => d.title),
      confidentiality: formData.value.confidentiality,
      disputeResolution: formData.value.disputeResolution,
      notes: formData.value.notes,
      linked_to_type: formData.value.linkedToType || null,
      linked_to_id: formData.value.linkedToId || null
    };

    if (formData.value.contractNumber) payload.contract_number = formData.value.contractNumber;

    let resp;
    if (editingContract.value) {
      const id = editingContract.value.id || editingContract.value._id;
      resp = await fetch(`${API_BASE_URL}/invoices/contracts/${id}?tenant_id=${getTenantId()}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify(payload)
      });
    } else {
      resp = await fetch(`${API_BASE_URL}/invoices/contracts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify(payload)
      });
    }

    if (resp.ok) {
      await fetchContracts();
      closeEditModal();
    } else {
      const err = await resp.text();
      console.error('Save failed:', err);
      alert('Failed to save contract');
    }
  } catch (err) { console.error(err); alert('Failed to save contract'); } finally { saving.value = false; }
};

// ─── Delete ─────────────────────────────
const confirmDelete = async (c) => {
  if (!confirm(`Delete contract "${c.title || 'Untitled'}"?`)) return;
  try {
    const resp = await fetch(`${API_BASE_URL}/invoices/contracts/${c.id || c._id}?tenant_id=${getTenantId()}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) contracts.value = contracts.value.filter(i => (i.id || i._id) !== (c.id || c._id));
    else alert('Failed to delete');
  } catch (err) { console.error(err); alert('Failed to delete'); }
};

// ─── Bulk Delete ────────────────────────
const isAllPageSelected = computed(() => {
  if (paginatedContracts.value.length === 0) return false;
  return paginatedContracts.value.every(c => selectedIds.value.has(c.id || c._id));
});

const toggleSelect = (c) => {
  const id = c.id || c._id;
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
};

const toggleSelectAll = () => {
  const next = new Set(selectedIds.value);
  if (isAllPageSelected.value) {
    paginatedContracts.value.forEach(c => next.delete(c.id || c._id));
  } else {
    paginatedContracts.value.forEach(c => next.add(c.id || c._id));
  }
  selectedIds.value = next;
};

const clearSelection = () => { clearSelection(); };

const bulkDelete = async () => {
  const count = selectedIds.value.size;
  if (!count) return;
  if (!confirm(`Are you sure you want to delete ${count} contract(s)? This action cannot be undone.`)) return;

  bulkDeleting.value = true;
  try {
    const tenantId = getTenantId();
    const response = await fetch(`${API_BASE_URL}/invoices/contracts/bulk-delete?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [...selectedIds.value] })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.detail || 'Bulk delete failed');
    }
    const result = await response.json();
    contracts.value = contracts.value.filter(c => !selectedIds.value.has(c.id || c._id));
    clearSelection();
    alert(result.message || `${count} contract(s) deleted.`);
  } catch (err) {
    console.error(err);
    alert(err?.message || 'Bulk delete failed');
  } finally {
    bulkDeleting.value = false;
  }
};

// ─── Fetch Contracts ────────────────────
const fetchContracts = async () => {
  loading.value = true;
  try {
    const branchParam = selectedBranch.value?.id ? `&branch_id=${selectedBranch.value.id}` : '';
    const resp = await fetch(`${API_BASE_URL}/invoices/contracts?tenant_id=${getTenantId()}${branchParam}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) { const data = await resp.json(); contracts.value = Array.isArray(data) ? data : (data.contracts || []); }
  } catch (err) { console.error(err); } finally { loading.value = false; }
};

// ─── Fetch Tenant Details ─────────────────────
const fetchTenantInfo = async () => {
  try {
    let resp = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${getTenantId()}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (!resp.ok) resp = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${getTenantId()}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) tenantDetails.value = await resp.json();
  } catch (err) { console.error(err); }
};

// ─── Pre-fill Party A from tenant (create modal) ─
const fetchTenantDetails = async () => {
  try {
    const d = Object.keys(tenantDetails.value).length ? tenantDetails.value : null;
    const source = d || await (async () => {
      let r = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${getTenantId()}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      if (!r.ok) r = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${getTenantId()}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
      return r.ok ? await r.json() : {};
    })();
    if (!formData.value.partyAName) formData.value.partyAName = source.company_name || source.companyName || '';
    if (!formData.value.partyAEmail) formData.value.partyAEmail = source.email || '';
    if (!formData.value.partyAAddress) formData.value.partyAAddress = [source.address, source.city, source.country].filter(Boolean).join(', ');
  } catch (err) { console.error(err); }
};

// ─── PDF Download ───────────────────────
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const loadImage = (url) => new Promise((resolve) => {
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

const downloadContractPDF = async (c) => {
  const doc = new jsPDF();
  let y = 0;

  const tenantDetails = ref({});
  try {
    let resp = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${getTenantId()}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (!resp.ok) resp = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${getTenantId()}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) tenantDetails.value = await resp.json();
  } catch (err) { console.error('Failed to fetch tenant details for PDF:', err); }

  const primaryRGB = hexToRgb(brandPrefs.primaryColor || '#3b82f6');
  
  // --- 1. Logo & Header ---
  let headerY = 15;
  const logoUrl = brandPrefs.companyLogo || tenantDetails.value.company_logo;
  
  if (logoUrl) {
    const base64Logo = await loadImage(logoUrl);
    if (base64Logo) {
      doc.addImage(base64Logo, 'PNG', 14, 15, 30, 30, undefined, 'FAST');
      headerY = 50; 
    }
  }

  // --- 2. Company Info (Top Right) ---
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text((brandPrefs.companyName || tenantDetails.value.company_name || 'YOUR COMPANY').toUpperCase(), 196, 20, { align: 'right' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  let compY = 26;
  const compAddr = tenantDetails.value.address || '';
  const compCity = tenantDetails.value.city || '';
  const compCountry = tenantDetails.value.country || '';
  if (compAddr) { doc.text(compAddr, 196, compY, { align: 'right' }); compY += 5; }
  if (compCity || compCountry) { doc.text(`${compCity}${compCity && compCountry ? ', ' : ''}${compCountry}`, 196, compY, { align: 'right' }); compY += 5; }
  if (tenantDetails.value.phone_number) { doc.text(`Tel: ${tenantDetails.value.phone_number}`, 196, compY, { align: 'right' }); compY += 5; }
  if (tenantDetails.value.tpin) { doc.text(`TPIN: ${tenantDetails.value.tpin}`, 196, compY, { align: 'right' }); compY += 5; }

  // --- 3. Document Title ---
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('LEGAL CONTRACT', 14, headerY + 10);
  
  doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.setLineWidth(1);
  doc.line(14, headerY + 14, 80, headerY + 14);

  // --- 4. Contract Info (Under Title) ---
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text(`CONTRACT TITLE:`, 14, headerY + 22);
  doc.setFont('helvetica', 'normal');
  doc.text(c.title || 'Untitled Contract', 60, headerY + 22);

  doc.setFont('helvetica', 'bold');
  doc.text(`CONTRACT NUMBER:`, 14, headerY + 28);
  doc.setFont('helvetica', 'normal');
  doc.text(c.contract_number || c.contractNumber || '—', 60, headerY + 28);

  doc.setFont('helvetica', 'bold');
  doc.text(`CONTRACT TYPE:`, 14, headerY + 34);
  doc.setFont('helvetica', 'normal');
  doc.text((c.contractType || c.type || 'Standard').toUpperCase(), 60, headerY + 34);

  // --- 5. Parties Grid ---
  const sideInfoY = headerY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('BETWEEN:', 120, sideInfoY);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('PARTY A (OWNER):', 120, sideInfoY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(c.partyAName || c.partyA?.name || '—', 120, sideInfoY + 11);

  doc.setFont('helvetica', 'bold');
  doc.text('PARTY B (CLIENT):', 120, sideInfoY + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(c.partyBName || c.partyB?.name || c.clientName || '—', 120, sideInfoY + 23);

  y = headerY + 45;
  doc.setDrawColor(230, 230, 230); doc.line(14, y - 5, 196, y - 5);

  const addSection = (title, text) => {
    if (!text) return;
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), 14, y); y += 7;
    doc.setFontSize(10); doc.setTextColor(60);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, 175);
    doc.text(lines, 14, y); y += lines.length * 5 + 8;
  };

  // Details box
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFillColor(248, 248, 250);
  doc.rect(14, y, 182, 14, 'F');
  doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(120);
  doc.text('START DATE', 19, y + 5);
  doc.text('END DATE', 69, y + 5);
  doc.text('CONTRACT VALUE', 124, y + 5);
  doc.setTextColor(0); doc.setFontSize(9);
  doc.text(formatDate(c.startDate || c.start_date), 19, y + 10);
  doc.text(formatDate(c.endDate || c.end_date), 69, y + 10);
  doc.setFont('helvetica', 'bold'); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text(formatWithSymbol(parseFloat(c.amount) || 0), 124, y + 10);
  y += 22;

  // Content Sections
  addSection('SCOPE OF WORK', c.scopeOfWork || c.scope_of_work);
  addSection('TERMS & CONDITIONS', c.termsAndConditions || c.terms_and_conditions);
  addSection('PAYMENT TERMS', c.paymentTerms || c.payment_terms);

  // Deliverables table
  const deliverables = (c.deliverables || []).filter(d => d && d.title);
  if (deliverables.length > 0) {
    if (y > 240) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('DELIVERABLES', 14, y); y += 4;
    autoTable(doc, {
      startY: y, margin: { left: 14, right: 14 },
      head: [['Deliverable', 'Description', 'Due Date']],
      body: deliverables.map(d => [d.title, d.description || '', d.dueDate || '—']),
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: primaryRGB, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [250, 250, 250] }
    });
    y = doc.lastAutoTable.finalY + 12;
  }

  addSection('CONFIDENTIALITY', c.confidentiality);
  addSection('DISPUTE RESOLUTION', c.disputeResolution || c.dispute_resolution);
  addSection('ADDITIONAL NOTES', c.notes);

  // Signature Block
  if (y > 230) { doc.addPage(); y = 20; }
  y += 10;
  doc.setDrawColor(200);
  doc.line(14, y + 15, 84, y + 15);
  doc.line(126, y + 15, 196, y + 15);
  doc.setFontSize(8); doc.setTextColor(120); doc.setFont('helvetica', 'normal');
  doc.text('PARTY A SIGNATURE', 14, y + 20);
  doc.text('PARTY B SIGNATURE', 126, y + 20);
  doc.text('Date: _______________', 14, y + 26);
  doc.text('Date: _______________', 126, y + 26);

  doc.save(`Contract_${c.contract_number || c.contractNumber || (c.title || 'document').replace(/\s+/g, '_')}.pdf`);
};

// ─── Refresh ────────────────────────────
const refreshData = () => fetchContracts();

// ─── Branch Init ────────────────────────
const initializeBranches = async () => {
  try {
    branches.value = await getBranches();
    const fixedBranchId = getBranchId();
    const isOwner = ['owner', 'admin', 'super_admin'].includes(getUserRole()?.toLowerCase());
    if (fixedBranchId && !isOwner) { const b = branches.value.find(b => b.id === fixedBranchId); if (b) { selectedBranch.value = b; setSelectedBranch(b); return; } }
    else { if (!branches.value.some(b => !b.id && b.name === 'All Branches')) branches.value.unshift({ id: '', name: 'All Branches' }); }
    const stored = getSelectedBranch();
    if (stored && branches.value.some(b => b.id === stored.id)) selectedBranch.value = stored;
    else if (branches.value.length > 0) { selectedBranch.value = branches.value[0]; setSelectedBranch(branches.value[0]); }
  } catch (err) { console.error(err); }
};

watch(selectedBranch, async (v) => { if (v) { setSelectedBranch(v); await fetchContracts(); } }, { deep: true });
onMounted(async () => { await fetchPreferences(); await fetchTenantInfo(); await initializeBranches(); await fetchContracts(); });
</script>

<style scoped>
.mesh-background { background-color: #fff; background-image: linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px); background-size: 30px 30px; }
.bg-brand { background-color: v-bind('brandPrefs.primaryColor || "#3b82f6"'); }
.text-brand { color: v-bind('brandPrefs.primaryColor || "#3b82f6"'); }
.border-brand { border-color: v-bind('brandPrefs.primaryColor || "#3b82f6"'); }
.bg-brand\/5 { background-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#3b82f6"'), transparent 95%); }
.border-brand\/20 { border-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#3b82f6"'), transparent 80%); }
.border-t-brand { border-top-color: v-bind('brandPrefs.primaryColor || "#3b82f6"'); }
.focus\:border-brand:focus { border-color: v-bind('brandPrefs.primaryColor || "#3b82f6"'); }
.focus\:ring-brand:focus { --tw-ring-color: v-bind('brandPrefs.primaryColor || "#3b82f6"'); }
.hover\:text-brand-dark:hover { color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#3b82f6"'), black 20%); }
.hover\:bg-brand-dark:hover { background-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#3b82f6"'), black 20%); }
</style>