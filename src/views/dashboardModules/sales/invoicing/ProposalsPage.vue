<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/invoicing" variant="icon-only" />
          <div class="w-2 h-8 bg-amber-500 rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-file-alt text-amber-500"></i>
              <span>Invoice Management // Proposals</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Proposals</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div v-if="branches.length > 0" class="hidden md:block">
            <select v-model="selectedBranch" class="rounded-none border-gray-200 shadow-sm focus:border-[#2F2E8B] focus:ring-[#2F2E8B] text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3">
              <option v-for="branch in branches" :key="branch.id" :value="branch">{{ branch.name }}</option>
            </select>
          </div>
          <button @click="refreshData" :disabled="loading" class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider transition-all disabled:opacity-50 border border-amber-200 px-3 py-1.5 hover:bg-amber-50">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Refresh
          </button>
          <button @click="openCreateModal" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> New Proposal
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">
      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-amber-500 rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Proposals...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Proposals</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ proposals.length }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Value</p>
            <h4 class="text-2xl font-black text-amber-600 font-display mt-1">{{ formatWithSymbol(totalValue) }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Accepted</p>
            <h4 class="text-2xl font-black text-green-600 font-display mt-1">{{ acceptedCount }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Draft</p>
            <h4 class="text-2xl font-black text-gray-500 font-display mt-1">{{ draftCount }}</h4>
          </div>
        </div>

        <!-- Filter & Search -->
        <div class="relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-sm">
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1">
              <input v-model="searchQuery" type="text" placeholder="Search proposals..." class="w-full rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono">
            </div>
            <select v-model="statusFilter" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono">
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <!-- Bulk Actions Bar -->
        <BulkActionsBar :count="selectionCount" @clear="clearSelection" @delete="bulkDelete" :deleting="bulkDeleting" />

        <!-- Proposals Table -->
        <div class="relative overflow-hidden bg-white border border-gray-100 rounded-none shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="py-3 px-3 text-center w-10">
                    <SelectAllCheckbox :model-value="isAllPageSelected" @update:model-value="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Title</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Prepared For</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Prepared By</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Value</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="p in paginatedProposals" :key="p.id || p._id" class="hover:bg-gray-50/50 transition-colors group" :class="{ 'bg-blue-50/40': selectedIds.has(p.id || p._id) }">
                  <td class="py-3 px-3 text-center">
                    <input type="checkbox" :checked="selectedIds.has(p.id || p._id)" @change="toggleSelect(p)" class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] cursor-pointer" />
                  </td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-amber-600 uppercase">{{ p.title || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-gray-700 uppercase">{{ p.preparedFor || p.prepared_for || p.clientName || 'Unknown' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500">{{ p.preparedBy || p.prepared_by || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500">{{ formatDate(p.date) }}</td>
                  <td class="py-3 px-4 text-right text-[10px] font-mono font-black text-gray-900">{{ formatWithSymbol(getProposalValue(p)) }}</td>
                  <td class="py-3 px-4 text-right">
                    <span :class="getStatusClass(p.status)" class="text-[8px] font-mono font-black px-2 py-1 border uppercase">{{ p.status || 'Draft' }}</span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button @click="viewProposal(p)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Preview">
                        <i class="fas fa-eye text-xs"></i>
                      </button>
                      <button @click="editProposal(p)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                        <i class="fas fa-edit text-xs"></i>
                      </button>
                      <button @click="downloadProposalPDF(p)" class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Download PDF">
                        <i class="fas fa-file-pdf text-xs"></i>
                      </button>
                      <button @click="makeCopy(p)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="Make a Copy">
                        <i class="fas fa-copy text-xs"></i>
                      </button>
                      <button @click="confirmDelete(p)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                        <i class="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredProposals.length === 0">
                  <td colspan="8" class="py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <i class="fas fa-file-alt text-3xl text-gray-200 mb-3 block"></i>
                    NO_PROPOSALS_FOUND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="filteredProposals.length > 0" class="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
            <div class="text-[9px] font-mono text-gray-400 uppercase">
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredProposals.length) }} of {{ filteredProposals.length }}
            </div>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Prev</button>
              <span class="px-3 py-1 text-[9px] font-mono font-bold text-amber-600">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ============ PREVIEW MODAL ============ -->
    <Teleport to="body">
      <div v-if="showPreviewModal" @click.self="showPreviewModal = false" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
        <div class="bg-white rounded-none shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto" @click.stop>
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">Proposal Preview</h3>
            <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>
          <div v-if="selectedProposal" class="p-8">
            <!-- Header -->
            <div class="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
              <div>
                <p class="text-[9px] font-mono text-gray-400 uppercase tracking-wider mb-1">Proposal</p>
                <p class="text-3xl font-black text-amber-600 font-display">{{ selectedProposal.title || 'Untitled Proposal' }}</p>
              </div>
              <div class="text-right">
                <span :class="getStatusClass(selectedProposal.status)" class="text-xs font-mono font-black px-4 py-2 border uppercase">{{ selectedProposal.status || 'Draft' }}</span>
              </div>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3">Client / Recipient</h4>
                <div class="space-y-2">
                  <div v-if="selectedProposal.preparedFor || selectedProposal.prepared_for">
                    <p class="text-xs text-gray-500">Prepared For</p>
                    <p class="font-bold text-gray-900">{{ selectedProposal.preparedFor || selectedProposal.prepared_for }}</p>
                  </div>
                  <div v-if="selectedProposal.clientTpin || selectedProposal.client_tpin">
                    <p class="text-xs text-gray-500">Client TPIN</p>
                    <p class="font-mono text-sm text-gray-700">{{ selectedProposal.clientTpin || selectedProposal.client_tpin }}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3">Proposal Details</h4>
                <div class="space-y-2">
                  <div>
                    <p class="text-xs text-gray-500">Prepared By</p>
                    <p class="font-bold text-gray-900">{{ selectedProposal.preparedBy || selectedProposal.prepared_by || '—' }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Date</p>
                    <p class="font-mono text-sm font-bold text-gray-900">{{ formatDate(selectedProposal.date) }}</p>
                  </div>
                  <div v-if="selectedProposal.companyTpin || selectedProposal.company_tpin">
                    <p class="text-xs text-gray-500">Company TPIN</p>
                    <p class="font-mono text-sm text-gray-700">{{ selectedProposal.companyTpin || selectedProposal.company_tpin }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content Sections -->
            <div v-if="selectedProposal.executiveSummary || selectedProposal.executive_summary" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Executive Summary</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedProposal.executiveSummary || selectedProposal.executive_summary }}</p>
            </div>

            <div v-if="selectedProposal.introduction" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Introduction</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedProposal.introduction }}</p>
            </div>

            <div v-if="previewObjectives.length > 0" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Objectives</h4>
              <ul class="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li v-for="(obj, i) in previewObjectives" :key="i">{{ obj }}</li>
              </ul>
            </div>

            <div v-if="selectedProposal.methodology" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Methodology</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedProposal.methodology }}</p>
            </div>

            <div v-if="previewTimeline.length > 0" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Timeline</h4>
              <table class="w-full border border-gray-200 text-sm">
                <thead><tr class="bg-gray-50"><th class="py-2 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase">Phase</th><th class="py-2 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase">Activity</th><th class="py-2 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase">Duration</th></tr></thead>
                <tbody>
                  <tr v-for="(t, i) in previewTimeline" :key="i" class="border-t border-gray-100">
                    <td class="py-2 px-3 font-medium text-gray-900">{{ t.phase }}</td>
                    <td class="py-2 px-3 text-gray-700">{{ t.activity }}</td>
                    <td class="py-2 px-3 text-gray-700">{{ t.duration }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="previewBudget.length > 0" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Budget</h4>
              <table class="w-full border border-gray-200 text-sm">
                <thead><tr class="bg-gray-50"><th class="py-2 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase">Item</th><th class="py-2 px-3 text-left text-[8px] font-mono font-black text-gray-400 uppercase">Description</th><th class="py-2 px-3 text-right text-[8px] font-mono font-black text-gray-400 uppercase">Cost</th></tr></thead>
                <tbody>
                  <tr v-for="(b, i) in previewBudget" :key="i" class="border-t border-gray-100">
                    <td class="py-2 px-3 font-medium text-gray-900">{{ b.item }}</td>
                    <td class="py-2 px-3 text-gray-700">{{ b.description }}</td>
                    <td class="py-2 px-3 text-right font-mono font-bold text-gray-900">{{ formatWithSymbol(b.cost) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="border-t-2 border-gray-900 bg-gray-50">
                    <td colspan="2" class="py-2 px-3 text-right font-black text-gray-900 uppercase text-xs">Total:</td>
                    <td class="py-2 px-3 text-right font-mono font-black text-amber-600 text-lg">{{ formatWithSymbol(previewBudgetTotal) }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div v-if="selectedProposal.expectedOutcomes || selectedProposal.expected_outcomes" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Expected Outcomes</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedProposal.expectedOutcomes || selectedProposal.expected_outcomes }}</p>
            </div>

            <div v-if="selectedProposal.conclusion" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Conclusion</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedProposal.conclusion }}</p>
            </div>

            <div v-if="selectedProposal.appendices" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Appendices</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedProposal.appendices }}</p>
            </div>

            <!-- Contact Info -->
            <div v-if="previewContact" class="mb-6 p-4 bg-gray-50 border border-gray-200">
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3">Contact Information</h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div v-if="previewContact.name"><p class="text-xs text-gray-500">Name</p><p class="font-bold text-gray-900">{{ previewContact.name }}</p></div>
                <div v-if="previewContact.position"><p class="text-xs text-gray-500">Position</p><p class="text-gray-700">{{ previewContact.position }}</p></div>
                <div v-if="previewContact.organization"><p class="text-xs text-gray-500">Organization</p><p class="text-gray-700">{{ previewContact.organization }}</p></div>
                <div v-if="previewContact.email"><p class="text-xs text-gray-500">Email</p><p class="font-mono text-gray-700">{{ previewContact.email }}</p></div>
                <div v-if="previewContact.phone"><p class="text-xs text-gray-500">Phone</p><p class="font-mono text-gray-700">{{ previewContact.phone }}</p></div>
              </div>
            </div>

            <!-- Rendered HTML Content Fallback -->
            <div v-if="selectedProposal.content && !selectedProposal.executiveSummary && !selectedProposal.executive_summary" class="mb-6 prose prose-sm max-w-none" v-html="selectedProposal.content"></div>

            <!-- Actions -->
            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button @click="downloadProposalPDF(selectedProposal)" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 transition-colors">
                <i class="fas fa-download"></i> Download PDF
              </button>
              <button @click="showPreviewModal = false; editProposal(selectedProposal)" class="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 transition-colors">
                <i class="fas fa-edit"></i> Edit Proposal
              </button>
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
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">{{ editingProposal ? 'Edit Proposal' : 'Create Business Proposal' }}</h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>

          <form @submit.prevent="saveProposal" class="p-6 space-y-6">
            <!-- Project Information -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-project-diagram text-amber-500"></i> Project Information
              </h4>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Project Title *</label>
                  <div class="flex gap-2">
                    <input v-model="formData.title" required type="text" placeholder="e.g. Web Application Development" class="flex-1 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                    <button type="button" @click="generateDocNumber" :disabled="isGeneratingNumber" class="px-3 py-2 bg-gray-50 text-amber-600 border border-gray-200 rounded-none hover:bg-gray-100 transition-colors text-xs font-bold whitespace-nowrap flex items-center gap-1 disabled:opacity-50">
                      <i :class="isGeneratingNumber ? 'fas fa-spinner animate-spin' : 'fas fa-magic'"></i> Generate #
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Prepared For *</label>
                  <input v-model="formData.preparedFor" required type="text" placeholder="Client / Company name" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Client TPIN</label>
                  <input v-model="formData.clientTpin" type="text" placeholder="Client Tax ID" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Company TPIN</label>
                  <input v-model="formData.companyTpin" type="text" placeholder="Your Company Tax ID" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Prepared By</label>
                  <input v-model="formData.preparedBy" type="text" placeholder="Your name" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Date</label>
                  <input v-model="formData.date" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select v-model="formData.status" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- CRM Link -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-link text-amber-500"></i> Link to CRM (Optional)
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 border border-gray-200">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Link To</label>
                  <select v-model="formData.linkedToType" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                    <option value="">None</option>
                    <option value="lead">Lead</option>
                    <option value="contact">Contact</option>
                    <option value="account">Account</option>
                    <option value="deal">Deal</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Select Record</label>
                  <select v-model="formData.linkedToId" :disabled="!formData.linkedToType || loadingCrmRecords" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <option value="">Select {{ formData.linkedToType ? formData.linkedToType.charAt(0).toUpperCase() + formData.linkedToType.slice(1) : 'Record' }}</option>
                    <option v-for="rec in crmRecords" :key="rec.id || rec._id" :value="rec.id || rec._id">
                      {{ rec.name || rec.title || (rec.firstName ? `${rec.firstName} ${rec.lastName}` : 'Unknown') }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Executive Summary with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-file-alt text-amber-500"></i> Executive Summary
              </h4>
              <textarea v-model="formData.executiveSummary" rows="4" placeholder="Provide a high-level overview of the proposal..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"></textarea>
              <AIEnhanceButton v-model="formData.executiveSummary" context="proposal_summary" tooltip="Use AI to enhance executive summary" />
            </div>

            <!-- Introduction with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-paragraph text-amber-500"></i> Introduction
              </h4>
              <textarea v-model="formData.introduction" rows="4" placeholder="Introduce the project background and context..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"></textarea>
              <AIEnhanceButton v-model="formData.introduction" context="proposal_introduction" tooltip="Use AI to enhance introduction" />
            </div>

            <!-- Objectives -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-bullseye text-amber-500"></i> Objectives
              </h4>
              <div class="space-y-2">
                <div v-for="(obj, i) in formData.objectives" :key="i" class="flex gap-2">
                  <input v-model="formData.objectives[i]" placeholder="Objective" class="flex-1 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <button type="button" @click="removeObjective(i)" class="px-3 py-2 text-red-600 hover:bg-red-50 border border-gray-300 rounded-none text-xs font-bold transition-colors">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <button type="button" @click="addObjective" class="text-[10px] font-mono font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider flex items-center gap-2">
                  <i class="fas fa-plus-circle"></i> Add Objective
                </button>
              </div>
            </div>

            <!-- Methodology with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-cogs text-amber-500"></i> Methodology
              </h4>
              <textarea v-model="formData.methodology" rows="4" placeholder="Describe the approach and methodology..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"></textarea>
              <AIEnhanceButton v-model="formData.methodology" context="proposal_methodology" tooltip="Use AI to enhance methodology" />
            </div>

            <!-- Timeline -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-calendar-alt text-amber-500"></i> Timeline
              </h4>
              <div class="space-y-2">
                <div v-for="(t, idx) in formData.timeline" :key="idx" class="grid grid-cols-12 gap-2 items-center">
                  <input v-model="formData.timeline[idx].phase" placeholder="Phase" class="col-span-2 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <input v-model="formData.timeline[idx].activity" placeholder="Activity" class="col-span-7 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <input v-model="formData.timeline[idx].duration" placeholder="Duration" class="col-span-2 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <div class="col-span-1 text-center">
                    <button type="button" @click="removeTimelineEntry(idx)" class="text-red-600 hover:text-red-800 transition-colors"><i class="fas fa-times"></i></button>
                  </div>
                </div>
                <button type="button" @click="addTimelineEntry" class="text-[10px] font-mono font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider flex items-center gap-2">
                  <i class="fas fa-plus-circle"></i> Add Timeline Row
                </button>
              </div>
            </div>

            <!-- Budget -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-money-bill-wave text-amber-500"></i> Budget
              </h4>
              <div class="space-y-2">
                <div v-for="(b, idx) in formData.budget" :key="idx" class="grid grid-cols-12 gap-2 items-center">
                  <input v-model="formData.budget[idx].item" placeholder="Item" class="col-span-3 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <input v-model="formData.budget[idx].description" placeholder="Description" class="col-span-6 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <input v-model.number="formData.budget[idx].cost" placeholder="Cost" type="number" step="0.01" class="col-span-2 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                  <div class="col-span-1 text-center">
                    <button type="button" @click="removeBudgetRow(idx)" class="text-red-600 hover:text-red-800 transition-colors"><i class="fas fa-times"></i></button>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <button type="button" @click="addBudgetRow" class="text-[10px] font-mono font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider flex items-center gap-2">
                    <i class="fas fa-plus-circle"></i> Add Budget Row
                  </button>
                  <p class="text-sm font-mono font-black text-gray-900">Total: <span class="text-amber-600">{{ formatWithSymbol(budgetTotal) }}</span></p>
                </div>
              </div>
            </div>

            <!-- Expected Outcomes with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-chart-line text-amber-500"></i> Expected Outcomes
              </h4>
              <textarea v-model="formData.expectedOutcomes" rows="3" placeholder="Describe the expected results and deliverables..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"></textarea>
              <AIEnhanceButton v-model="formData.expectedOutcomes" context="proposal_outcomes" tooltip="Use AI to enhance expected outcomes" />
            </div>

            <!-- Conclusion with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-flag-checkered text-amber-500"></i> Conclusion
              </h4>
              <textarea v-model="formData.conclusion" rows="3" placeholder="Summarize the proposal and next steps..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"></textarea>
              <AIEnhanceButton v-model="formData.conclusion" context="proposal_conclusion" tooltip="Use AI to enhance conclusion" />
            </div>

            <!-- Appendices with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-paperclip text-amber-500"></i> Appendices (Optional)
              </h4>
              <textarea v-model="formData.appendices" rows="3" placeholder="Additional supporting information..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"></textarea>
              <AIEnhanceButton v-model="formData.appendices" context="proposal_appendices" tooltip="Use AI to enhance appendices" />
            </div>

            <!-- Contact Information -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-address-card text-amber-500"></i> Contact Information
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input v-model="formData.contact.name" placeholder="Name" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                <input v-model="formData.contact.position" placeholder="Position" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                <input v-model="formData.contact.organization" placeholder="Organization" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                <input v-model="formData.contact.email" placeholder="Email" type="email" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
                <input v-model="formData.contact.phone" placeholder="Phone" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500">
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button @click="closeEditModal" type="button" class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase transition-colors">
                Cancel
              </button>
              <button type="submit" :disabled="saving" class="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 transition-colors disabled:opacity-50">
                <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ saving ? 'Saving...' : (editingProposal ? 'Update Proposal' : 'Create Proposal') }}
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
import { usePreferences } from '@/config/usePreferences.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import AIEnhanceButton from '@/components/AIEnhanceButton.vue';

const router = useRouter();
const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getToken, getUserRole, getUserEmail } = decodeJWT();
const { formatCurrency, currencySymbol } = useCurrency();
const formatNumber = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try { if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n); return `${currencySymbol.value || 'K'}${formatNumber(n)}`; } catch (e) { return `${currencySymbol.value || 'K'}${formatNumber(n)}`; }
};
useActivityTracker({ userId: getUserEmail(), tenantId: getTenantId(), module: 'proposals-page' });

const { preferences: brandPrefs, fetchPreferences } = usePreferences();
const tenantDetails = ref({});

const hexToRgb = (hex) => {
  if (!hex || hex[0] !== '#') return [16, 185, 129];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
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

// ─── State ──────────────────────────────
const loading = ref(false);
const saving = ref(false);
const proposals = ref([]);
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
const selectedProposal = ref(null);
const editingProposal = ref(null);
const isGeneratingNumber = ref(false);

// CRM linking
const crmRecords = ref([]);
const loadingCrmRecords = ref(false);

// ─── Form ───────────────────────────────
const getDefaultForm = () => ({
  title: '',
  preparedFor: '',
  preparedBy: '',
  clientTpin: '',
  companyTpin: '',
  date: new Date().toISOString().split('T')[0],
  status: 'draft',
  linkedToType: '',
  linkedToId: '',
  executiveSummary: '',
  introduction: '',
  objectives: [''],
  methodology: '',
  timeline: [{ phase: '', activity: '', duration: '' }],
  budget: [{ item: '', description: '', cost: 0 }],
  expectedOutcomes: '',
  conclusion: '',
  appendices: '',
  contact: { name: '', position: '', organization: '', email: '', phone: '' }
});

const formData = ref(getDefaultForm());

// ─── Computed ───────────────────────────
const totalValue = computed(() => proposals.value.reduce((sum, p) => sum + getProposalValue(p), 0));
const acceptedCount = computed(() => proposals.value.filter(p => (p.status || '').toLowerCase() === 'accepted').length);
const draftCount = computed(() => proposals.value.filter(p => (p.status || 'draft').toLowerCase() === 'draft').length);

const filteredProposals = computed(() => {
  let result = [...proposals.value];
  if (statusFilter.value !== 'all') result = result.filter(p => (p.status || 'draft').toLowerCase() === statusFilter.value);
  if (searchQuery.value) {
    const s = searchQuery.value.toLowerCase();
    result = result.filter(p =>
      (p.title || '').toLowerCase().includes(s) ||
      (p.preparedFor || p.prepared_for || p.clientName || '').toLowerCase().includes(s) ||
      (p.preparedBy || p.prepared_by || '').toLowerCase().includes(s)
    );
  }
  result.sort((a, b) => new Date(b.updated_at || b.created_at || b.date || 0) - new Date(a.updated_at || a.created_at || a.date || 0));
  return result;
});

const totalPages = computed(() => Math.ceil(filteredProposals.value.length / itemsPerPage.value) || 1);
const paginatedProposals = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProposals.value.slice(start, start + itemsPerPage.value);
});

const budgetTotal = computed(() => (formData.value.budget || []).reduce((s, b) => s + (parseFloat(b.cost) || 0), 0));

// Preview helpers
const previewObjectives = computed(() => {
  if (!selectedProposal.value) return [];
  const objs = selectedProposal.value.objectives || [];
  return Array.isArray(objs) ? objs.filter(o => o) : [];
});
const previewTimeline = computed(() => {
  if (!selectedProposal.value) return [];
  const tl = selectedProposal.value.timeline || [];
  return Array.isArray(tl) ? tl.filter(t => t.phase || t.activity) : [];
});
const previewBudget = computed(() => {
  if (!selectedProposal.value) return [];
  const bg = selectedProposal.value.budget || [];
  return Array.isArray(bg) ? bg.filter(b => b.item) : [];
});
const previewBudgetTotal = computed(() => previewBudget.value.reduce((s, b) => s + (parseFloat(b.cost) || 0), 0));
const previewContact = computed(() => {
  if (!selectedProposal.value) return null;
  const c = selectedProposal.value.contact;
  if (!c) return null;
  if (c.name || c.position || c.organization || c.email || c.phone) return c;
  return null;
});

// ─── Utils ──────────────────────────────
const formatDate = (d) => { if (!d) return '—'; return new Date(d).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }); };

const getProposalValue = (p) => {
  if (p.total) return parseFloat(p.total) || 0;
  if (p.amount) return parseFloat(p.amount) || 0;
  const bg = p.budget || [];
  if (Array.isArray(bg)) return bg.reduce((s, b) => s + (parseFloat(b.cost) || 0), 0);
  return 0;
};

const getStatusClass = (status) => {
  const s = (status || 'draft').toLowerCase();
  return {
    draft: 'text-gray-500 border-gray-200 bg-gray-50',
    sent: 'text-blue-600 border-blue-200 bg-blue-50',
    accepted: 'text-green-600 border-green-200 bg-green-50',
    rejected: 'text-red-600 border-red-200 bg-red-50'
  }[s] || 'text-gray-500 border-gray-200 bg-gray-50';
};

// ─── Form helpers ───────────────────────
const addObjective = () => formData.value.objectives.push('');
const removeObjective = (i) => { if (formData.value.objectives.length > 1) formData.value.objectives.splice(i, 1); };
const addTimelineEntry = () => formData.value.timeline.push({ phase: '', activity: '', duration: '' });
const removeTimelineEntry = (i) => { if (formData.value.timeline.length > 1) formData.value.timeline.splice(i, 1); };
const addBudgetRow = () => formData.value.budget.push({ item: '', description: '', cost: 0 });
const removeBudgetRow = (i) => { if (formData.value.budget.length > 1) formData.value.budget.splice(i, 1); };

const resetForm = () => { formData.value = getDefaultForm(); };

const generateDocNumber = async () => {
  isGeneratingNumber.value = true;
  try {
    const num = `PROP-${Date.now().toString(36).toUpperCase()}`;
    if (!formData.value.title) formData.value.title = num;
    else formData.value.title = `${formData.value.title} (${num})`;
  } finally {
    isGeneratingNumber.value = false;
  }
};

// ─── CRM Records ────────────────────────
const fetchCrmRecords = async (type) => {
  if (!type) { crmRecords.value = []; return; }
  loadingCrmRecords.value = true;
  try {
    const tenantId = getTenantId();
    const endpointMap = { lead: 'leads', contact: 'contacts', account: 'accounts', deal: 'deals' };
    const endpoint = endpointMap[type] || type;
    const resp = await fetch(`${API_BASE_URL}/crm/${endpoint}?tenant_id=${tenantId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (resp.ok) {
      const data = await resp.json();
      crmRecords.value = Array.isArray(data) ? data : (data[endpoint] || data.items || []);
    }
  } catch (err) { console.error('CRM fetch error:', err); }
  finally { loadingCrmRecords.value = false; }
};

watch(() => formData.value.linkedToType, (newVal) => { fetchCrmRecords(newVal); });

// ─── Modal Actions ──────────────────────
const openCreateModal = () => {
  resetForm();
  editingProposal.value = null;
  selectedProposal.value = null;
  showEditModal.value = true;
};

const viewProposal = (p) => {
  selectedProposal.value = p;
  showPreviewModal.value = true;
};

const editProposal = (p) => {
  editingProposal.value = p;
  selectedProposal.value = p;
  formData.value = {
    title: p.title || '',
    preparedFor: p.preparedFor || p.prepared_for || p.clientName || '',
    preparedBy: p.preparedBy || p.prepared_by || '',
    clientTpin: p.clientTpin || p.client_tpin || '',
    companyTpin: p.companyTpin || p.company_tpin || '',
    date: p.date ? new Date(p.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    status: p.status || 'draft',
    linkedToType: p.linkedToType || p.linked_to_type || '',
    linkedToId: p.linkedToId || p.linked_to_id || '',
    executiveSummary: p.executiveSummary || p.executive_summary || '',
    introduction: p.introduction || '',
    objectives: Array.isArray(p.objectives) && p.objectives.length > 0 ? [...p.objectives] : [''],
    methodology: p.methodology || '',
    timeline: Array.isArray(p.timeline) && p.timeline.length > 0 ? p.timeline.map(t => ({ ...t })) : [{ phase: '', activity: '', duration: '' }],
    budget: Array.isArray(p.budget) && p.budget.length > 0 ? p.budget.map(b => ({ ...b })) : [{ item: '', description: '', cost: 0 }],
    expectedOutcomes: p.expectedOutcomes || p.expected_outcomes || '',
    conclusion: p.conclusion || '',
    appendices: p.appendices || '',
    contact: p.contact ? { ...p.contact } : { name: '', position: '', organization: '', email: '', phone: '' }
  };
  showEditModal.value = true;
};

const makeCopy = (p) => {
  editingProposal.value = null;
  selectedProposal.value = null;
  formData.value = {
    title: p.title ? `${p.title} (Copy)` : '',
    preparedFor: p.preparedFor || p.prepared_for || p.clientName || '',
    preparedBy: p.preparedBy || p.prepared_by || '',
    clientTpin: p.clientTpin || p.client_tpin || '',
    companyTpin: p.companyTpin || p.company_tpin || '',
    date: new Date().toISOString().split('T')[0],
    status: 'draft',
    linkedToType: '',
    linkedToId: '',
    executiveSummary: p.executiveSummary || p.executive_summary || '',
    introduction: p.introduction || '',
    objectives: Array.isArray(p.objectives) && p.objectives.length > 0 ? [...p.objectives] : [''],
    methodology: p.methodology || '',
    timeline: Array.isArray(p.timeline) && p.timeline.length > 0 ? p.timeline.map(t => ({ ...t })) : [{ phase: '', activity: '', duration: '' }],
    budget: Array.isArray(p.budget) && p.budget.length > 0 ? p.budget.map(b => ({ ...b })) : [{ item: '', description: '', cost: 0 }],
    expectedOutcomes: p.expectedOutcomes || p.expected_outcomes || '',
    conclusion: p.conclusion || '',
    appendices: p.appendices || '',
    contact: p.contact ? { ...p.contact } : { name: '', position: '', organization: '', email: '', phone: '' }
  };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  setTimeout(() => { resetForm(); editingProposal.value = null; }, 300);
};

// ─── Assemble Content HTML ──────────────
function assembleContentFromForm(pf) {
  if (!pf) return '';
  const lines = [];
  if (pf.title) lines.push(`<h1 class="text-3xl font-bold mb-4">${pf.title}</h1>`);
  if (pf.executiveSummary) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Executive Summary</h2>`); lines.push(`<p class="mb-4 text-gray-700 whitespace-pre-line">${pf.executiveSummary}</p>`); }
  if (pf.introduction) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Introduction</h2>`); lines.push(`<p class="mb-4 text-gray-700 whitespace-pre-line">${pf.introduction}</p>`); }
  if (Array.isArray(pf.objectives) && pf.objectives.some(o => o)) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Objectives</h2><ul class="list-disc pl-5 mb-4 space-y-1 text-gray-700">`); pf.objectives.forEach(o => { if (o) lines.push(`<li>${o}</li>`); }); lines.push(`</ul>`); }
  if (pf.methodology) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Methodology</h2>`); lines.push(`<p class="mb-4 text-gray-700 whitespace-pre-line">${pf.methodology}</p>`); }
  if (Array.isArray(pf.timeline) && pf.timeline.some(t => t.phase || t.activity)) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Timeline</h2><table class="min-w-full text-left text-sm"><thead class="border-b-2 border-gray-200 bg-gray-50"><tr><th class="px-4 py-2">Phase</th><th class="px-4 py-2">Activity</th><th class="px-4 py-2">Duration</th></tr></thead><tbody>`); pf.timeline.forEach(t => { lines.push(`<tr class="border-b border-gray-100"><td class="px-4 py-2">${t.phase || ''}</td><td class="px-4 py-2">${t.activity || ''}</td><td class="px-4 py-2">${t.duration || ''}</td></tr>`); }); lines.push(`</tbody></table>`); }
  if (Array.isArray(pf.budget) && pf.budget.some(b => b.item)) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Budget</h2><table class="min-w-full text-left text-sm"><thead class="border-b-2 border-gray-200 bg-gray-50"><tr><th class="px-4 py-2">Item</th><th class="px-4 py-2">Description</th><th class="px-4 py-2">Cost</th></tr></thead><tbody>`); pf.budget.forEach(b => { lines.push(`<tr class="border-b border-gray-100"><td class="px-4 py-2">${b.item || ''}</td><td class="px-4 py-2">${b.description || ''}</td><td class="px-4 py-2 font-mono">${b.cost || ''}</td></tr>`); }); lines.push(`</tbody></table>`); }
  if (pf.expectedOutcomes) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Expected Outcomes</h2>`); lines.push(`<p class="mb-4 text-gray-700 whitespace-pre-line">${pf.expectedOutcomes}</p>`); }
  if (pf.conclusion) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Conclusion</h2>`); lines.push(`<p class="mb-4 text-gray-700 whitespace-pre-line">${pf.conclusion}</p>`); }
  if (pf.appendices) { lines.push(`<h2 class="text-xl font-semibold mt-6 mb-3 text-[#2F2E8B]">Appendices</h2>`); lines.push(`<p class="mb-4 text-gray-700 whitespace-pre-line">${pf.appendices}</p>`); }
  return lines.join('\n');
}

// ─── Save (Create/Update) ───────────────
const saveProposal = async () => {
  saving.value = true;
  try {
    if (!formData.value.title?.trim()) throw new Error('Project title is required');
    if (!formData.value.preparedFor?.trim()) throw new Error('Prepared For is required');

    const pf = formData.value;
    const content = assembleContentFromForm(pf);
    const tenantId = getTenantId();
    const branchId = selectedBranch.value?.id || '';

    const payload = {
      tenant_id: tenantId,
      branch_id: branchId,
      tenantId,
      title: pf.title.trim(),
      preparedFor: pf.preparedFor.trim(),
      prepared_for: pf.preparedFor.trim(),
      preparedBy: pf.preparedBy?.trim() || '',
      prepared_by: pf.preparedBy?.trim() || '',
      clientTpin: pf.clientTpin?.trim() || '',
      client_tpin: pf.clientTpin?.trim() || '',
      companyTpin: pf.companyTpin?.trim() || '',
      company_tpin: pf.companyTpin?.trim() || '',
      date: pf.date,
      status: pf.status || 'draft',
      linkedToType: pf.linkedToType || '',
      linked_to_type: pf.linkedToType || '',
      linkedToId: pf.linkedToId || '',
      linked_to_id: pf.linkedToId || '',
      executiveSummary: pf.executiveSummary || '',
      executive_summary: pf.executiveSummary || '',
      introduction: pf.introduction || '',
      objectives: pf.objectives.filter(o => o),
      methodology: pf.methodology || '',
      timeline: pf.timeline.filter(t => t.phase || t.activity),
      budget: pf.budget.filter(b => b.item),
      expectedOutcomes: pf.expectedOutcomes || '',
      expected_outcomes: pf.expectedOutcomes || '',
      conclusion: pf.conclusion || '',
      appendices: pf.appendices || '',
      contact: pf.contact,
      content,
      total: budgetTotal.value,
      value: budgetTotal.value
    };

    const isEdit = !!editingProposal.value;
    const docId = isEdit ? (editingProposal.value.id || editingProposal.value._id) : null;
    const url = isEdit
      ? `${API_BASE_URL}/invoices/proposals/${docId}?tenant_id=${tenantId}`
      : `${API_BASE_URL}/invoices/proposals?tenant_id=${tenantId}`;
    const method = isEdit ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errMsg = `Server returned ${response.status}`;
      try { const err = await response.json(); errMsg = err.detail || err.message || errMsg; } catch {}
      throw new Error(errMsg);
    }

    const result = await response.json();

    if (isEdit) {
      const index = proposals.value.findIndex(p => (p.id || p._id) === docId);
      if (index !== -1) proposals.value[index] = result;
    } else {
      proposals.value.unshift(result);
    }

    closeEditModal();
    alert(isEdit ? 'Proposal updated successfully!' : 'Proposal created successfully!');
  } catch (error) {
    console.error('Save proposal error:', error);
    alert(error.message || 'Failed to save proposal');
  } finally {
    saving.value = false;
  }
};

// ─── Delete ─────────────────────────────
const confirmDelete = async (p) => {
  if (!confirm(`Delete proposal "${p.title || '—'}"?`)) return;
  try {
    const resp = await fetch(`${API_BASE_URL}/invoices/proposals/${p.id || p._id}?tenant_id=${getTenantId()}`, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (resp.ok) proposals.value = proposals.value.filter(i => (i.id || i._id) !== (p.id || p._id));
    else alert('Failed to delete proposal');
  } catch (err) { console.error(err); alert('Failed to delete proposal'); }
};

// ─── Bulk Delete ────────────────────────
const isAllPageSelected = computed(() => {
  if (paginatedProposals.value.length === 0) return false;
  return paginatedProposals.value.every(p => selectedIds.value.has(p.id || p._id));
});

const toggleSelect = (p) => {
  const id = p.id || p._id;
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
};

const toggleSelectAll = () => {
  const next = new Set(selectedIds.value);
  if (isAllPageSelected.value) {
    paginatedProposals.value.forEach(p => next.delete(p.id || p._id));
  } else {
    paginatedProposals.value.forEach(p => next.add(p.id || p._id));
  }
  selectedIds.value = next;
};

const clearSelection = () => { clearSelection(); };

const bulkDelete = async () => {
  const count = selectedIds.value.size;
  if (!count) return;
  if (!confirm(`Are you sure you want to delete ${count} proposal(s)? This action cannot be undone.`)) return;

  bulkDeleting.value = true;
  try {
    const tenantId = getTenantId();
    const response = await fetch(`${API_BASE_URL}/invoices/proposals/bulk-delete?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [...selectedIds.value] })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.detail || 'Bulk delete failed');
    }
    const result = await response.json();
    proposals.value = proposals.value.filter(p => !selectedIds.value.has(p.id || p._id));
    clearSelection();
    alert(result.message || `${count} proposal(s) deleted.`);
  } catch (err) {
    console.error(err);
    alert(err?.message || 'Bulk delete failed');
  } finally {
    bulkDeleting.value = false;
  }
};

// ─── PDF Download ───────────────────────
const downloadProposalPDF = async (p) => {
  try {
    const doc = new jsPDF();
    const primaryRGB = hexToRgb(brandPrefs.primaryColor || '#10b981');
    let y = 20;

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

    // 3. Document Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text('BUSINESS PROPOSAL', 14, headerY + 10);
    
    doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setLineWidth(1);
    doc.line(14, headerY + 14, 80, headerY + 14);

    // 4. Proposal Info (Under Title)
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text(`PROJECT TITLE:`, 14, headerY + 22);
    doc.setFont('helvetica', 'normal');
    doc.text(p.title || 'Untitled Proposal', 45, headerY + 22);

    doc.setFont('helvetica', 'bold');
    doc.text(`DATE:`, 14, headerY + 28);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(p.date), 45, headerY + 28);

    doc.setFont('helvetica', 'bold');
    doc.text(`STATUS:`, 14, headerY + 34);
    doc.setFont('helvetica', 'normal');
    doc.text((p.status || 'draft').toUpperCase(), 45, headerY + 34);

    // 5. Bill To / Prepared For (Right Side, Same level as Title)
    const billToY = headerY + 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.text('PREPARED FOR:', 120, billToY);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text(p.preparedFor || p.prepared_for || 'CLIENT NAME', 120, billToY + 7);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    let cliY = billToY + 13;
    if (p.preparedBy || p.prepared_by) { doc.text(`Prepared By: ${p.preparedBy || p.prepared_by}`, 120, cliY); cliY += 5; }
    if (p.clientTpin || p.client_tpin) { doc.text(`Client TPIN: ${p.clientTpin || p.client_tpin}`, 120, cliY); cliY += 5; }
    if (p.companyTpin || p.company_tpin) { doc.text(`Company TPIN: ${p.companyTpin || p.company_tpin}`, 120, cliY); cliY += 5; }

    y = Math.max(headerY + 45, cliY + 10);
    doc.setDrawColor(230, 230, 230); doc.line(14, y - 5, 196, y - 5);

    const checkPageBreak = (neededHeight) => {
      if (y + neededHeight > 280) {
        doc.addPage();
        y = 20;
        return true;
      }
      return false;
    };

    const addSection = (title, text) => {
      if (!text) return;
      
      // Header check
      checkPageBreak(15);
      
      doc.setFontSize(12);
      doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), 14, y);
      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.setFont('helvetica', 'normal');
      
      const lines = doc.splitTextToSize(text, 175);
      
      lines.forEach(line => {
        if (y > 280) {
          doc.addPage();
          y = 20;
          // Re-apply styles after page break
          doc.setFontSize(10);
          doc.setTextColor(60);
          doc.setFont('helvetica', 'normal');
        }
        doc.text(line, 14, y);
        y += 5;
      });
      y += 8; // Spacer between sections
    };

    addSection('Executive Summary', p.executiveSummary || p.executive_summary);
    addSection('Introduction', p.introduction);

    // Objectives
    const objs = Array.isArray(p.objectives) ? p.objectives.filter(o => o) : [];
    if (objs.length > 0) {
      checkPageBreak(15);
      doc.setFontSize(12);
      doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('OBJECTIVES', 14, y);
      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(60);
      doc.setFont('helvetica', 'normal');
      
      objs.forEach(o => {
        const objLines = doc.splitTextToSize(`• ${o}`, 170);
        objLines.forEach(line => {
          if (y > 280) {
            doc.addPage();
            y = 20;
            doc.setFontSize(10);
            doc.setTextColor(60);
            doc.setFont('helvetica', 'normal');
          }
          doc.text(line, 14, y);
          y += 5;
        });
      });
      y += 8;
    }

    addSection('Methodology', p.methodology);

    // Timeline table
    const tl = Array.isArray(p.timeline) ? p.timeline.filter(t => t.phase || t.activity) : [];
    if (tl.length > 0) {
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setFontSize(12); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('TIMELINE', 14, y); y += 4;
      autoTable(doc, { 
        startY: y, 
        head: [['Phase', 'Activity', 'Duration']], 
        body: tl.map(t => [t.phase || '', t.activity || '', t.duration || '']), 
        margin: { left: 14 }, 
        styles: { fontSize: 9 },
        headStyles: { fillColor: primaryRGB, textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [250, 250, 250] }
      });
      y = doc.lastAutoTable.finalY + 12;
    }

    // Budget table
    const bg = Array.isArray(p.budget) ? p.budget.filter(b => b.item) : [];
    if (bg.length > 0) {
      if (y > 240) { doc.addPage(); y = 20; }
      doc.setFontSize(12); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('BUDGET', 14, y); y += 4;
      const totalCost = bg.reduce((s, b) => s + (parseFloat(b.cost) || 0), 0);
      autoTable(doc, { 
        startY: y, 
        head: [['Item', 'Description', 'Cost']], 
        body: [...bg.map(b => [b.item || '', b.description || '', formatWithSymbol(b.cost)]), [{ content: 'TOTAL PROJECT COST', colSpan: 2, styles: { halign: 'right', fontStyle: 'bold' } }, { content: formatWithSymbol(totalCost), styles: { fontStyle: 'bold', textColor: primaryRGB } }]], 
        margin: { left: 14 }, 
        styles: { fontSize: 9 },
        headStyles: { fillColor: primaryRGB, textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [250, 250, 250] }
      });
      y = doc.lastAutoTable.finalY + 12;
    }

    addSection('Expected Outcomes', p.expectedOutcomes || p.expected_outcomes);
    addSection('Conclusion', p.conclusion);
    addSection('Appendices', p.appendices);

    // Contact
    const c = p.contact;
    if (c && (c.name || c.email || c.phone)) {
      checkPageBreak(35);
      doc.setFontSize(12); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.setFont('helvetica', 'bold');
      doc.text('Contact Information', 14, y); y += 8;
      doc.setFontSize(10); doc.setTextColor(60);
      doc.setFont('helvetica', 'normal');
      if (c.name) { doc.text(`Name: ${c.name}`, 14, y); y += 5; }
      if (c.position) { doc.text(`Position: ${c.position}`, 14, y); y += 5; }
      if (c.organization) { doc.text(`Organization: ${c.organization}`, 14, y); y += 5; }
      if (c.email) { doc.text(`Email: ${c.email}`, 14, y); y += 5; }
      if (c.phone) { doc.text(`Phone: ${c.phone}`, 14, y); y += 5; }
    }

    doc.save(`Proposal_${(p.title || 'draft').replace(/\s+/g, '_')}.pdf`);
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('Failed to generate PDF');
  }
};

// ─── Data Fetching ──────────────────────
const fetchProposals = async () => {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    const branchParam = selectedBranch.value?.id ? `&branch_id=${selectedBranch.value.id}` : '';
    const resp = await fetch(`${API_BASE_URL}/invoices/proposals?tenant_id=${tenantId}${branchParam}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (resp.ok) {
      const data = await resp.json();
      proposals.value = Array.isArray(data) ? data : (data.proposals || []);
    }
  } catch (err) { console.error('Error fetching proposals:', err); }
  finally { loading.value = false; }
};

const refreshData = () => fetchProposals();

// ─── Branch Init ────────────────────────
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

watch(selectedBranch, async (v) => { if (v) { setSelectedBranch(v); await fetchProposals(); } }, { deep: true });
onMounted(async () => { 
  await fetchPreferences();
  await fetchTenantDetails();
  await initializeBranches(); 
  await fetchProposals(); 
});
</script>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image: linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
}
</style>
