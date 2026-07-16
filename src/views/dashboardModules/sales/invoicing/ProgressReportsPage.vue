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
              <i class="fas fa-chart-line text-brand"></i>
              <span>Invoice Management // Progress Reports</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Progress Reports</h1>
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
            <i class="fas fa-plus"></i> New Report
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-purple-500 rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Progress Reports...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Reports</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ reports.length }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Completed</p>
            <h4 class="text-2xl font-black text-green-600 font-display mt-1">{{ completedCount }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">In Progress</p>
            <h4 class="text-2xl font-black text-brand font-display mt-1">{{ inProgressCount }}</h4>
          </div>
          <div class="bg-white border border-gray-100 p-5 rounded-none shadow-sm">
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Draft</p>
            <h4 class="text-2xl font-black text-gray-500 font-display mt-1">{{ draftCount }}</h4>
          </div>
        </div>

        <!-- Filter & Search -->
        <div class="relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-sm">
          <div class="flex flex-col sm:flex-row gap-3">
            <input v-model="searchQuery" type="text" placeholder="Search reports..." class="flex-1 rounded-none border border-gray-200 px-4 py-2.5 text-sm font-mono focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
            <select v-model="statusFilter" class="rounded-none border border-gray-200 px-4 py-2.5 text-sm font-mono focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="submitted">Submitted</option>
            </select>
          </div>
        </div>

        <!-- Bulk Actions Bar -->
        <BulkActionsBar :count="selectionCount" @clear="clearSelection" @delete="bulkDelete" :deleting="bulkDeleting" />

        <!-- Reports Table -->
        <div class="relative overflow-hidden bg-white border border-gray-100 rounded-none shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="py-3 px-3 text-center w-10">
                    <SelectAllCheckbox :model-value="isAllPageSelected" @update:model-value="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Title</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Report #</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Prepared By</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest cursor-pointer select-none hover:text-purple-600 transition-colors" @click="toggleDateSort">
                    Date <i class="fas" :class="sortDirection === 'desc' ? 'fa-sort-down' : 'fa-sort-up'"></i>
                  </th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Updates</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="r in paginatedReports" :key="r.id || r._id" class="hover:bg-gray-50/50 transition-colors group" :class="{ 'bg-blue-50/40': selectedIds.has(r.id || r._id) }">
                  <td class="py-3 px-3 text-center">
                    <input type="checkbox" :checked="selectedIds.has(r.id || r._id)" @change="toggleSelect(r)" class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B] cursor-pointer" />
                  </td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-purple-600 uppercase max-w-[200px] truncate">{{ r.title || 'Untitled' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500">{{ r.report_number || r.reportNumber || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono font-bold text-gray-700 uppercase">{{ r.prepared_by || r.preparedBy || '—' }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500">{{ formatDate(r.date || r.created_at) }}</td>
                  <td class="py-3 px-4 text-[10px] font-mono text-gray-500">{{ (r.detailed_updates || r.detailedUpdates || []).length }} sections</td>
                  <td class="py-3 px-4 text-right">
                    <span :class="getStatusClass(r.status)" class="text-[8px] font-mono font-black px-2 py-1 border uppercase">{{ r.status || 'Draft' }}</span>
                  </td>
                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <button @click="viewReport(r)" class="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors" title="View"><i class="fas fa-eye text-xs"></i></button>
                      <button @click="editReport(r)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit"><i class="fas fa-edit text-xs"></i></button>
                      <button @click="downloadReportPDF(r)" class="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Download PDF"><i class="fas fa-file-pdf text-xs"></i></button>
                      <button @click="makeCopy(r)" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition-colors" title="Make a Copy"><i class="fas fa-copy text-xs"></i></button>
                      <button @click="openDeleteConfirmModal(r)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><i class="fas fa-trash text-xs"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredReports.length === 0">
                  <td colspan="8" class="py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                    <i class="fas fa-chart-line text-3xl text-gray-200 mb-3 block"></i>NO_REPORTS_FOUND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="filteredReports.length > 0" class="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
            <div class="text-[9px] font-mono text-gray-400 uppercase">Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredReports.length) }} of {{ filteredReports.length }}</div>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50">Prev</button>
              <span class="px-3 py-1 text-[9px] font-mono font-bold text-purple-600">{{ currentPage }} / {{ totalPages }}</span>
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
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">Progress Report Preview</h3>
            <button @click="showPreviewModal = false" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>
          <div v-if="selectedReport" class="p-8">
            <!-- Header -->
            <div class="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
              <div>
                <p class="text-[9px] font-mono text-gray-400 uppercase tracking-wider mb-1">Progress Report {{ selectedReport.report_number || selectedReport.reportNumber || '' }}</p>
                <p class="text-3xl font-black text-brand font-display">{{ selectedReport.title || 'Untitled Report' }}</p>
              </div>
              <div class="text-right">
                <span :class="getStatusClass(selectedReport.status)" class="text-xs font-mono font-black px-4 py-2 border uppercase">{{ selectedReport.status || 'Draft' }}</span>
              </div>
            </div>

            <!-- Info Grid -->
            <div class="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3">Report Details</h4>
                <div class="space-y-2">
                  <div v-if="selectedReport.prepared_by || selectedReport.preparedBy">
                    <p class="text-xs text-gray-500">Prepared By</p>
                    <p class="font-bold text-gray-900">{{ selectedReport.prepared_by || selectedReport.preparedBy }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">Date</p>
                    <p class="font-mono text-sm font-bold text-gray-900">{{ formatDate(selectedReport.date || selectedReport.created_at) }}</p>
                  </div>
                  <div v-if="selectedReport.period_start || selectedReport.periodStart || selectedReport.period_label || selectedReport.periodLabel">
                    <p class="text-xs text-gray-500">Reporting Period</p>
                    <p class="font-mono text-sm font-bold text-gray-900">
                      <template v-if="selectedReport.period_label || selectedReport.periodLabel">{{ selectedReport.period_label || selectedReport.periodLabel }}</template>
                      <template v-else>{{ formatDate(selectedReport.period_start || selectedReport.periodStart) }} &ndash; {{ formatDate(selectedReport.period_end || selectedReport.periodEnd) }}</template>
                    </p>
                  </div>
                </div>
              </div>
              <div v-if="previewContact">
                <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3">Contact Information</h4>
                <div class="space-y-2">
                  <div v-if="previewContact.name"><p class="text-xs text-gray-500">Name</p><p class="font-bold text-gray-900">{{ previewContact.name }}</p></div>
                  <div v-if="previewContact.email"><p class="text-xs text-gray-500">Email</p><p class="font-mono text-sm text-gray-700">{{ previewContact.email }}</p></div>
                  <div v-if="previewContact.phone"><p class="text-xs text-gray-500">Phone</p><p class="font-mono text-sm text-gray-700">{{ previewContact.phone }}</p></div>
                </div>
              </div>
            </div>

            <!-- Executive Summary -->
            <div v-if="selectedReport.executive_summary || selectedReport.executiveSummary" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Executive Summary</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedReport.executive_summary || selectedReport.executiveSummary }}</p>
            </div>

            <!-- Detailed Updates -->
            <div v-if="previewUpdates.length > 0" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-4 pb-1 border-b border-gray-200">Detailed Updates</h4>
              <div v-for="(update, i) in previewUpdates" :key="i" class="mb-4 pl-4 border-l-2 border-purple-200">
                <h5 class="text-sm font-bold text-purple-700 mb-1">{{ update.heading }}</h5>
                <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ update.body }}</p>
              </div>
            </div>

            <!-- Conclusion -->
            <div v-if="selectedReport.conclusion" class="mb-6">
              <h4 class="text-sm font-black text-[#2F2E8B] uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Conclusion</h4>
              <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{{ selectedReport.conclusion }}</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button @click="downloadReportPDF(selectedReport)" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 transition-colors">
                <i class="fas fa-download"></i> Download PDF
              </button>
              <button @click="showPreviewModal = false; editReport(selectedReport)" class="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 transition-colors">
                <i class="fas fa-edit"></i> Edit Report
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
            <h3 class="text-lg font-black text-gray-900 font-display uppercase">{{ editingReport ? 'Edit Progress Report' : 'Create Progress Report' }}</h3>
            <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 text-xl"><i class="fas fa-times"></i></button>
          </div>

          <form @submit.prevent="saveReport" class="p-6 space-y-6">
            <!-- Report Information -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-chart-line text-purple-500"></i> Report Information
              </h4>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Report Title *</label>
                  <div class="flex gap-2">
                    <input v-model="formData.title" required type="text" placeholder="e.g. Q1 Progress Report" class="flex-1 border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <button type="button" @click="generateDocNumber" :disabled="isGeneratingNumber" class="px-3 py-2 bg-gray-50 text-purple-600 border border-gray-200 rounded-none hover:bg-gray-100 transition-colors text-xs font-bold whitespace-nowrap flex items-center gap-1 disabled:opacity-50">
                      <i :class="isGeneratingNumber ? 'fas fa-spinner animate-spin' : 'fas fa-magic'"></i> Gen #
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Prepared By</label>
                  <input v-model="formData.preparedBy" type="text" placeholder="Author name" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Date</label>
                  <input v-model="formData.date" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select v-model="formData.status" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <option value="draft">Draft</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="submitted">Submitted</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Reporting Period -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-calendar-week text-purple-500"></i> Reporting Period
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Period Start</label>
                  <input v-model="formData.periodStart" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Period End</label>
                  <input v-model="formData.periodEnd" type="date" :min="formData.periodStart || undefined" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Period Label <span class="font-normal text-gray-400">(optional)</span></label>
                  <input v-model="formData.periodLabel" type="text" placeholder="e.g. Q1 2026 / May 2026" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-3">
                <button type="button" @click="applyPeriodPreset('this_week')" class="text-[9px] font-mono font-bold text-purple-600 border border-purple-200 px-2.5 py-1 hover:bg-purple-50 uppercase">This Week</button>
                <button type="button" @click="applyPeriodPreset('last_week')" class="text-[9px] font-mono font-bold text-purple-600 border border-purple-200 px-2.5 py-1 hover:bg-purple-50 uppercase">Last Week</button>
                <button type="button" @click="applyPeriodPreset('this_month')" class="text-[9px] font-mono font-bold text-purple-600 border border-purple-200 px-2.5 py-1 hover:bg-purple-50 uppercase">This Month</button>
                <button type="button" @click="applyPeriodPreset('last_month')" class="text-[9px] font-mono font-bold text-purple-600 border border-purple-200 px-2.5 py-1 hover:bg-purple-50 uppercase">Last Month</button>
                <button type="button" @click="applyPeriodPreset('this_quarter')" class="text-[9px] font-mono font-bold text-purple-600 border border-purple-200 px-2.5 py-1 hover:bg-purple-50 uppercase">This Quarter</button>
                <button type="button" @click="applyPeriodPreset('ytd')" class="text-[9px] font-mono font-bold text-purple-600 border border-purple-200 px-2.5 py-1 hover:bg-purple-50 uppercase">YTD</button>
              </div>
            </div>

            <!-- CRM Link -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-link text-purple-500"></i> Link to CRM (Optional)
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 border border-gray-200">
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Link To</label>
                  <select v-model="formData.linkedToType" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    <option value="">None</option>
                    <option value="lead">Lead</option>
                    <option value="contact">Contact</option>
                    <option value="account">Account</option>
                    <option value="deal">Deal</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-700 mb-1">Select Record</label>
                  <select v-model="formData.linkedToId" :disabled="!formData.linkedToType || loadingCrmRecords" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed">
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
                <i class="fas fa-file-alt text-purple-500"></i> Executive Summary
              </h4>
              <textarea v-model="formData.executiveSummary" rows="5" placeholder="Provide a high-level overview of the progress..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"></textarea>
              <AIEnhanceButton v-model="formData.executiveSummary" context="progress_report_executive_summary" tooltip="Use AI to enhance executive summary" />
            </div>

            <!-- Detailed Updates (Dynamic Sections) -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-list-alt text-purple-500"></i> Detailed Updates
              </h4>
              <div class="space-y-4">
                <div v-for="(update, idx) in formData.detailedUpdates" :key="idx" class="bg-gray-50 border border-gray-200 p-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-[9px] font-mono font-bold text-purple-600 uppercase tracking-wider">Section {{ idx + 1 }}</span>
                    <button type="button" @click="removeUpdate(idx)" class="text-red-600 hover:text-red-800 transition-colors text-xs">
                      <i class="fas fa-times-circle"></i> Remove
                    </button>
                  </div>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Heading *</label>
                      <input v-model="formData.detailedUpdates[idx].heading" required placeholder="Section heading (e.g. Backend Development)" class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1">Body *</label>
                      <textarea v-model="formData.detailedUpdates[idx].body" required rows="4" placeholder="Describe the progress for this section..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"></textarea>
                      <AIEnhanceButton v-model="formData.detailedUpdates[idx].body" :context="`progress_report_update_${update.heading || 'section'}`" tooltip="Use AI to enhance this update" />
                    </div>
                  </div>
                </div>
                <button type="button" @click="addUpdate" class="text-[10px] font-mono font-bold text-purple-600 hover:text-purple-700 uppercase tracking-wider flex items-center gap-2">
                  <i class="fas fa-plus-circle"></i> Add Update Section
                </button>
              </div>
            </div>

            <!-- Conclusion with AI Enhance -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-flag-checkered text-purple-500"></i> Conclusion
              </h4>
              <textarea v-model="formData.conclusion" rows="4" placeholder="Summarize findings and next steps..." class="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500"></textarea>
              <AIEnhanceButton v-model="formData.conclusion" context="progress_report_conclusion" tooltip="Use AI to enhance conclusion" />
            </div>

            <!-- Contact Information -->
            <div>
              <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="fas fa-address-card text-purple-500"></i> Contact Information
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input v-model="formData.contact.name" placeholder="Contact Name" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                <input v-model="formData.contact.email" placeholder="Email" type="email" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                <input v-model="formData.contact.phone" placeholder="Phone" class="border border-gray-300 rounded-none px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <button @click="closeEditModal" type="button" class="border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase transition-colors">
                Cancel
              </button>
              <button type="submit" :disabled="saving" class="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-none text-[10px] font-bold font-mono uppercase flex items-center gap-2 transition-colors disabled:opacity-50">
                <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
                {{ saving ? 'Saving...' : (editingReport ? 'Update Report' : 'Create Report') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ============ DELETE CONFIRM MODAL ============ -->
    <Teleport to="body">
      <div v-if="reportPendingDelete" @click.self="cancelDelete" class="fixed inset-0 bg-black/60 flex items-center justify-center z-[10001] p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-md" @click.stop>
          <div class="h-1.5 w-full bg-red-600"></div>
          <div class="p-6">
            <div class="flex items-start gap-4 mb-4">
              <div class="flex h-11 w-11 shrink-0 items-center justify-center border border-red-200 bg-red-50 text-red-600">
                <i class="fas fa-trash-alt text-sm"></i>
              </div>
              <div>
                <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">Irreversible Action</p>
                <p class="text-sm text-gray-700">Delete <strong>{{ reportPendingDelete.title || 'Untitled Report' }}</strong>? This removes the report and cannot be undone.</p>
              </div>
            </div>
            <div class="border border-gray-200 bg-gray-50 px-4 py-2.5 mb-5">
              <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Report # {{ reportPendingDelete.report_number || reportPendingDelete.reportNumber || '—' }}</p>
            </div>
            <div class="flex gap-3 justify-end">
              <button @click="cancelDelete" :disabled="isDeletingReport" class="px-4 py-2 border border-gray-300 text-gray-700 text-[10px] font-bold font-mono uppercase hover:bg-gray-50 disabled:opacity-50">Cancel</button>
              <button @click="confirmDeleteReport" :disabled="isDeletingReport" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold font-mono uppercase flex items-center gap-2 disabled:opacity-50">
                <i :class="isDeletingReport ? 'fas fa-spinner fa-spin' : 'fas fa-trash-alt'"></i>
                {{ isDeletingReport ? 'Deleting...' : 'Delete Report' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- ============ FEEDBACK MODAL ============ -->
    <Teleport to="body">
      <div v-if="showFeedbackModal" @click.self="closeFeedbackModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-[10001] p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-md" @click.stop>
          <div class="h-1.5 w-full bg-amber-500"></div>
          <div class="p-6">
            <p class="text-xs font-black text-gray-900 uppercase tracking-wider mb-2">{{ feedbackDialogTitle }}</p>
            <p class="text-sm text-gray-700">{{ feedbackDialogMessage }}</p>
            <div class="flex justify-end mt-5">
              <button @click="closeFeedbackModal" class="px-4 py-2 bg-[#2F2E8B] hover:opacity-90 text-white text-[10px] font-bold font-mono uppercase">Close</button>
            </div>
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
import { jsPDF } from 'jspdf';
import { BackButton, BulkActionsBar, SelectAllCheckbox } from '@/components/ui';
import { useBulkSelect } from '@/composables/useBulkSelect';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import { usePreferences } from '@/config/usePreferences.js';
import AIEnhanceButton from '@/components/AIEnhanceButton.vue';

const { getTenantId, getUserEmail, getUserName, getToken, getBranches, getBranchId, getUserRole, getSelectedBranch, setSelectedBranch } = decodeJWT();
const { preferences: brandPrefs, fetchPreferences } = usePreferences();

const tenantDetails = ref({});
const fetchTenantDetails = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/tenants/details?tenant_id=${getTenantId()}`);
    if (res.ok) tenantDetails.value = await res.json();
  } catch (err) { console.error(err); }
};

const loading = ref(false);
const saving = ref(false);
const reports = ref([]);
const branches = ref([]);
const selectedBranch = ref(null);
const searchQuery = ref('');
const statusFilter = ref('all');
const currentPage = ref(1);
const itemsPerPage = ref(20);
const sortDirection = ref('desc'); // 'desc' = newest date first

// Multi-select state
const bulkDeleting = ref(false);

const crmRecords = ref([]);
const loadingCrmRecords = ref(false);

const showPreviewModal = ref(false);
const showEditModal = ref(false);
const selectedReport = ref(null);
const editingReport = ref(null);
const isGeneratingNumber = ref(false);
const showDeleteConfirmModal = ref(false);
const reportPendingDelete = ref(null);
const isDeletingReport = ref(false);
const showFeedbackModal = ref(false);
const feedbackModal = ref({ title: '', message: '' });
const feedbackDialogTitle = computed(() => feedbackModal.value.title || 'System Message');
const feedbackDialogMessage = computed(() => feedbackModal.value.message || '');

const completedCount = computed(() => reports.value.filter(r => (r.status || '').toLowerCase() === 'completed').length);
const inProgressCount = computed(() => reports.value.filter(r => (r.status || '').toLowerCase() === 'in progress').length);
const draftCount = computed(() => reports.value.filter(r => (r.status || 'draft').toLowerCase() === 'draft').length);

const filteredReports = computed(() => {
  let result = [...reports.value];
  if (statusFilter.value !== 'all') result = result.filter(r => (r.status || 'draft').toLowerCase() === statusFilter.value);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(r => (r.title || '').toLowerCase().includes(q) || (r.prepared_by || r.preparedBy || '').toLowerCase().includes(q));
  }
  result.sort((a, b) => {
    const da = new Date(a.date || a.created_at || 0).getTime();
    const db_ = new Date(b.date || b.created_at || 0).getTime();
    return sortDirection.value === 'desc' ? db_ - da : da - db_;
  });
  return result;
});

const toggleDateSort = () => {
  sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc';
  currentPage.value = 1;
};

const totalPages = computed(() => Math.ceil(filteredReports.value.length / itemsPerPage.value) || 1);
const paginatedReports = computed(() => filteredReports.value.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value));

const previewUpdates = computed(() => {
  if (!selectedReport.value) return [];
  const updates = selectedReport.value.detailed_updates || selectedReport.value.detailedUpdates || [];
  return updates.filter(u => u && u.heading);
});

const previewContact = computed(() => {
  if (!selectedReport.value) return null;
  const c = selectedReport.value.contact;
  if (!c || (!c.name && !c.email && !c.phone)) return null;
  return c;
});

const getResponseMessage = async (response, fallbackMessage) => {
  try {
    const raw = await response.text();
    if (!raw) return fallbackMessage;

    try {
      const parsed = JSON.parse(raw);
      return parsed.detail || parsed.message || parsed.error || fallbackMessage;
    } catch {
      return raw.trim() || fallbackMessage;
    }
  } catch {
    return fallbackMessage;
  }
};

const openDeleteConfirmModal = (report) => {
  reportPendingDelete.value = report;
};

const cancelDelete = () => {
  if (isDeletingReport.value) return;
  reportPendingDelete.value = null;
};

const closeDeleteConfirmModal = (force = false) => {
  if (isDeletingReport.value && !force) return;
  showDeleteConfirmModal.value = false;
  reportPendingDelete.value = null;
};

const openFeedbackModal = (title, message) => {
  feedbackModal.value = { title, message };
  showFeedbackModal.value = true;
};

const closeFeedbackModal = () => {
  showFeedbackModal.value = false;
  feedbackModal.value = { title: '', message: '' };
};

// ─── Form ───────────────────────────────
const getDefaultForm = () => ({
  title: 'Progress Report',
  preparedBy: '',
  date: new Date().toISOString().split('T')[0],
  periodStart: '',
  periodEnd: '',
  periodLabel: '',
  status: 'draft',
  executiveSummary: '',
  detailedUpdates: [{ heading: '', body: '' }],
  conclusion: '',
  contact: { name: '', email: '', phone: '' },
  linkedToType: '',
  linkedToId: '',
  reportNumber: ''
});

const formData = ref(getDefaultForm());

// ─── Helpers ────────────────────────────
const formatDate = (d) => { if (!d) return '—'; return new Date(d).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }); };
const getStatusClass = (status) => {
  const s = (status || 'draft').toLowerCase();
  return { draft: 'text-gray-500 border-gray-200 bg-gray-50', 'in progress': 'text-purple-600 border-purple-200 bg-purple-50', completed: 'text-green-600 border-green-200 bg-green-50', submitted: 'text-blue-600 border-blue-200 bg-blue-50' }[s] || 'text-gray-500 border-gray-200 bg-gray-50';
};

// ─── Update Rows ────────────────────────
const addUpdate = () => formData.value.detailedUpdates.push({ heading: '', body: '' });
const removeUpdate = (idx) => { if (formData.value.detailedUpdates.length > 1) formData.value.detailedUpdates.splice(idx, 1); };

// ─── Period Presets ─────────────────────
const toISO = (d) => d.toISOString().split('T')[0];
const applyPeriodPreset = (preset) => {
  const now = new Date();
  let start, end, label = '';
  switch (preset) {
    case 'this_week': {
      const day = now.getDay() || 7; // Mon=1..Sun=7
      start = new Date(now); start.setDate(now.getDate() - (day - 1));
      end = new Date(start); end.setDate(start.getDate() + 6);
      label = 'This Week';
      break;
    }
    case 'last_week': {
      const day = now.getDay() || 7;
      end = new Date(now); end.setDate(now.getDate() - day);
      start = new Date(end); start.setDate(end.getDate() - 6);
      label = 'Last Week';
      break;
    }
    case 'this_month': {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      label = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      break;
    }
    case 'last_month': {
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0);
      label = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      break;
    }
    case 'this_quarter': {
      const q = Math.floor(now.getMonth() / 3);
      start = new Date(now.getFullYear(), q * 3, 1);
      end = new Date(now.getFullYear(), q * 3 + 3, 0);
      label = `Q${q + 1} ${now.getFullYear()}`;
      break;
    }
    case 'ytd': {
      start = new Date(now.getFullYear(), 0, 1);
      end = now;
      label = `YTD ${now.getFullYear()}`;
      break;
    }
  }
  if (start && end) {
    formData.value.periodStart = toISO(start);
    formData.value.periodEnd = toISO(end);
    formData.value.periodLabel = label;
  }
};

// ─── Generate Number ────────────────────
const generateDocNumber = async () => {
  isGeneratingNumber.value = true;
  try {
    const resp = await fetch(`${API_BASE_URL}/invoices/generate-number?tenant_id=${getTenantId()}&type=progress-report`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) { const data = await resp.json(); formData.value.reportNumber = data.number || data.document_number || data; }
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
  editingReport.value = null;
  formData.value = getDefaultForm();
  showEditModal.value = true;
};

const viewReport = (r) => { selectedReport.value = r; showPreviewModal.value = true; };

const editReport = (r) => {
  editingReport.value = r;
  const updates = r.detailed_updates || r.detailedUpdates || [];
  formData.value = {
    title: r.title || 'Progress Report',
    preparedBy: r.prepared_by || r.preparedBy || '',
    date: (r.date || '').split('T')[0] || new Date().toISOString().split('T')[0],
    periodStart: (r.period_start || r.periodStart || '').split('T')[0] || '',
    periodEnd: (r.period_end || r.periodEnd || '').split('T')[0] || '',
    periodLabel: r.period_label || r.periodLabel || '',
    status: r.status || 'draft',
    executiveSummary: r.executive_summary || r.executiveSummary || '',
    detailedUpdates: updates.length > 0 ? updates.map(u => ({ heading: u.heading || '', body: u.body || '' })) : [{ heading: '', body: '' }],
    conclusion: r.conclusion || '',
    contact: {
      name: r.contact?.name || '',
      email: r.contact?.email || '',
      phone: r.contact?.phone || ''
    },
    linkedToType: r.linked_to_type || r.linkedToType || '',
    linkedToId: r.linked_to_id || r.linkedToId || '',
    reportNumber: r.report_number || r.reportNumber || ''
  };
  showEditModal.value = true;
};

const makeCopy = (r) => {
  editingReport.value = null;
  const updates = r.detailed_updates || r.detailedUpdates || [];
  formData.value = {
    title: r.title ? `${r.title} (Copy)` : 'Progress Report',
    preparedBy: r.prepared_by || r.preparedBy || '',
    date: new Date().toISOString().split('T')[0],
    periodStart: (r.period_start || r.periodStart || '').split('T')[0] || '',
    periodEnd: (r.period_end || r.periodEnd || '').split('T')[0] || '',
    periodLabel: r.period_label || r.periodLabel || '',
    status: 'draft',
    executiveSummary: r.executive_summary || r.executiveSummary || '',
    detailedUpdates: updates.length > 0 ? updates.map(u => ({ heading: u.heading || '', body: u.body || '' })) : [{ heading: '', body: '' }],
    conclusion: r.conclusion || '',
    contact: {
      name: r.contact?.name || '',
      email: r.contact?.email || '',
      phone: r.contact?.phone || ''
    },
    linkedToType: '',
    linkedToId: '',
    reportNumber: ''
  };
  showEditModal.value = true;
};

const closeEditModal = () => { showEditModal.value = false; editingReport.value = null; };

// ─── Save Report ────────────────────────
const saveReport = async () => {
  saving.value = true;
  try {
    // The backend expects ProgressReport Pydantic model fields
    const payload = {
      tenantId: getTenantId(),
      title: formData.value.title,
      prepared_by: formData.value.preparedBy,
      date: formData.value.date,
      period_start: formData.value.periodStart || null,
      period_end: formData.value.periodEnd || null,
      period_label: formData.value.periodLabel || null,
      status: formData.value.status,
      executive_summary: formData.value.executiveSummary,
      detailed_updates: formData.value.detailedUpdates.filter(u => u.heading && u.body),
      conclusion: formData.value.conclusion,
      contact: formData.value.contact,
      linked_to_type: formData.value.linkedToType || null,
      linked_to_id: formData.value.linkedToId || null
    };

    if (formData.value.reportNumber) payload.report_number = formData.value.reportNumber;

    let resp;
    if (editingReport.value) {
      const id = editingReport.value.id || editingReport.value._id;
      resp = await fetch(`${API_BASE_URL}/invoices/progress-reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify(payload)
      });
    } else {
      resp = await fetch(`${API_BASE_URL}/invoices/progress-reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify(payload)
      });
    }

    if (resp.ok) {
      await fetchReports();
      closeEditModal();
    } else {
      const errorMessage = await getResponseMessage(resp, 'Failed to save report. Please try again.');
      console.error('Save failed:', errorMessage);
      openFeedbackModal('Save Failed', errorMessage);
    }
  } catch (err) {
    console.error(err);
    openFeedbackModal('Save Failed', 'Failed to save report. Please try again.');
  } finally { saving.value = false; }
};

// ─── Delete ─────────────────────────────
const confirmDeleteReport = async () => {
  const report = reportPendingDelete.value;
  if (!report || isDeletingReport.value) return;

  isDeletingReport.value = true;
  try {
    const reportId = report.id || report._id;
    const resp = await fetch(`${API_BASE_URL}/invoices/progress-reports/${reportId}?tenant_id=${getTenantId()}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });

    if (resp.ok) {
      reports.value = reports.value.filter(item => (item.id || item._id) !== reportId);
      if (currentPage.value > totalPages.value) currentPage.value = Math.max(1, totalPages.value);
      if ((selectedReport.value?.id || selectedReport.value?._id) === reportId) {
        selectedReport.value = null;
        showPreviewModal.value = false;
      }
      reportPendingDelete.value = null;
    } else {
      const errorMessage = await getResponseMessage(resp, 'Failed to delete the report. Please try again.');
      console.error('Delete failed:', errorMessage);
      reportPendingDelete.value = null;
      openFeedbackModal('Delete Failed', errorMessage);
    }
  } catch (err) {
    console.error(err);
    reportPendingDelete.value = null;
    openFeedbackModal('Delete Failed', 'Failed to delete the report. Please try again.');
  } finally {
    isDeletingReport.value = false;
  }
};

// ─── Bulk Delete ────────────────────────
const isAllPageSelected = computed(() => {
  if (paginatedReports.value.length === 0) return false;
  return paginatedReports.value.every(r => selectedIds.value.has(r.id || r._id));
});

const toggleSelect = (r) => {
  const id = r.id || r._id;
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
};

const toggleSelectAll = () => {
  const next = new Set(selectedIds.value);
  if (isAllPageSelected.value) {
    paginatedReports.value.forEach(r => next.delete(r.id || r._id));
  } else {
    paginatedReports.value.forEach(r => next.add(r.id || r._id));
  }
  selectedIds.value = next;
};

const clearSelection = () => { clearSelection(); };

const bulkDelete = async () => {
  const count = selectedIds.value.size;
  if (!count) return;
  if (!confirm(`Are you sure you want to delete ${count} report(s)? This action cannot be undone.`)) return;

  bulkDeleting.value = true;
  try {
    const tenantId = getTenantId();
    const response = await fetch(`${API_BASE_URL}/invoices/progress-reports/bulk-delete?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [...selectedIds.value] })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.detail || 'Bulk delete failed');
    }
    const result = await response.json();
    reports.value = reports.value.filter(r => !selectedIds.value.has(r.id || r._id));
    if (currentPage.value > totalPages.value) currentPage.value = Math.max(1, totalPages.value);
    clearSelection();
    alert(result.message || `${count} report(s) deleted.`);
  } catch (err) {
    console.error(err);
    alert(err?.message || 'Bulk delete failed');
  } finally {
    bulkDeleting.value = false;
  }
};

// ─── Fetch Reports ──────────────────────
const fetchReports = async () => {
  loading.value = true;
  try {
    const branchParam = selectedBranch.value?.id ? `&branch_id=${selectedBranch.value.id}` : '';
    const resp = await fetch(`${API_BASE_URL}/invoices/progress-reports?tenant_id=${getTenantId()}${branchParam}`, { headers: { 'Authorization': `Bearer ${getToken()}` } });
    if (resp.ok) { const data = await resp.json(); reports.value = Array.isArray(data) ? data : (data.progress_reports || data.reports || []); }
  } catch (err) { console.error(err); } finally { loading.value = false; }
};

// ─── PDF Download ───────────────────────
const downloadReportPDF = async (r) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  const primaryRGB = hexToRgb(brandPrefs.primaryColor || '#805ad5');
  let y = 20;

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
  doc.text('PROGRESS REPORT', 14, headerY + 10);
  
  doc.setDrawColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.setLineWidth(1);
  doc.line(14, headerY + 14, 80, headerY + 14);

  // --- 4. Report Info (Under Title) ---
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text(`REPORT TITLE:`, 14, headerY + 22);
  doc.setFont('helvetica', 'normal');
  doc.text(r.title || 'Untitled Report', 60, headerY + 22);

  doc.setFont('helvetica', 'bold');
  doc.text(`REPORT NUMBER:`, 14, headerY + 28);
  doc.setFont('helvetica', 'normal');
  doc.text(r.report_number || r.reportNumber || '—', 60, headerY + 28);

  doc.setFont('helvetica', 'bold');
  doc.text(`DATE:`, 14, headerY + 34);
  doc.setFont('helvetica', 'normal');
  doc.text(formatDate(r.date || r.created_at), 60, headerY + 34);

  // --- 5. Prepared By / Status ---
  const sideInfoY = headerY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text('REPORT DETAILS:', 120, sideInfoY);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text(`PREPARED BY:`, 120, sideInfoY + 7);
  doc.setFont('helvetica', 'normal');
  doc.text(r.prepared_by || r.preparedBy || '—', 155, sideInfoY + 7);

  doc.setFont('helvetica', 'bold');
  doc.text(`CURRENT STATUS:`, 120, sideInfoY + 13);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
  doc.text((r.status || 'draft').toUpperCase(), 155, sideInfoY + 13);

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
    for (let i = 0; i < lines.length; i++) {
        if (y > 280) { doc.addPage(); y = 20; }
        doc.text(lines[i], 14, y);
        y += 5;
    }
    y += 8;
  };

  addSection('EXECUTIVE SUMMARY', r.executive_summary || r.executiveSummary);

  // Detailed Updates
  const updates = r.detailed_updates || r.detailedUpdates || [];
  if (updates.length > 0) {
    if (y > 260) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('DETAILED UPDATES', 14, y); y += 7;

    updates.forEach((update, idx) => {
      if (!update || !update.heading) return;
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(10); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
      doc.setFont('helvetica', 'bold');
      doc.text(`> ${update.heading.toUpperCase()}`, 14, y); y += 6;
      doc.setFontSize(10); doc.setTextColor(60);
      doc.setFont('helvetica', 'normal');
      if (update.body) {
        const blines = doc.splitTextToSize(update.body, 175);
        for (let i = 0; i < blines.length; i++) {
            if (y > 280) { doc.addPage(); y = 20; }
            doc.text(blines[i], 14, y);
            y += 5;
        }
        y += 6;
      }
    });
  }

  addSection('CONCLUSION', r.conclusion);

  // Contact
  const contact = r.contact;
  if (contact && (contact.name || contact.email || contact.phone)) {
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFontSize(12); doc.setTextColor(primaryRGB[0], primaryRGB[1], primaryRGB[2]);
    doc.setFont('helvetica', 'bold');
    doc.text('CONTACT INFORMATION', 14, y); y += 7;
    doc.setFontSize(10); doc.setTextColor(60);
    doc.setFont('helvetica', 'normal');
    if (contact.name) { doc.text(`Name: ${contact.name}`, 14, y); y += 5; }
    if (contact.email) { doc.text(`Email: ${contact.email}`, 14, y); y += 5; }
    if (contact.phone) { doc.text(`Phone: ${contact.phone}`, 14, y); y += 5; }
  }

  doc.save(`Progress_Report_${(r.report_number || r.reportNumber || r.title || 'document').replace(/\s+/g, '_')}.pdf`);
};

// ─── Refresh ────────────────────────────
const refreshData = () => fetchReports();

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

watch(selectedBranch, async (v) => { if (v) { setSelectedBranch(v); await fetchReports(); } }, { deep: true });
watch([searchQuery, statusFilter], () => { currentPage.value = 1; });
onMounted(async () => { 
  await fetchPreferences();
  await fetchTenantDetails();
  await initializeBranches(); 
  await fetchReports(); 
});
</script>

<style scoped>
.mesh-background { background-color: #fff; background-image: linear-gradient(rgba(47, 46, 139, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(47, 46, 139, 0.03) 1px, transparent 1px); background-size: 30px 30px; }
.bg-brand { background-color: v-bind('brandPrefs.primaryColor || "#805ad5"'); }
.text-brand { color: v-bind('brandPrefs.primaryColor || "#805ad5"'); }
.border-brand { border-color: v-bind('brandPrefs.primaryColor || "#805ad5"'); }
.bg-brand\/5 { background-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#805ad5"'), transparent 95%); }
.border-brand\/20 { border-color: color-mix(in srgb, v-bind('brandPrefs.primaryColor || "#805ad5"'), transparent 80%); }
</style>