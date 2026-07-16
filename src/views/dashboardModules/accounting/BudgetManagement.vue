<template>
  <div class="min-h-screen bg-[#F0F2F5] flex flex-col font-sans relative text-gray-900 print:bg-white">

    <!-- PRINT LAYOUT (hidden on screen) -->
    <div v-if="printBudget" id="budget-print-report" class="hidden print:block print-report">
      <!-- Company Letterhead -->
      <div class="print-letterhead">
        <div class="print-letterhead-left">
          <div class="print-report-type">BUDGET REPORT // FINANCE DEPARTMENT</div>
          <div class="print-report-title">{{ printBudget.name }}</div>
          <div class="print-report-meta">
            Period: {{ printBudget.period }} &nbsp;|&nbsp; Frequency: {{ printBudget.type?.toUpperCase() }}
            <span v-if="printBudget.fiscal_year"> &nbsp;|&nbsp; FY: {{ printBudget.fiscal_year }}</span>
          </div>
        </div>
        <div class="print-letterhead-right">
          <div class="print-company-name">{{ companyDisplayName.toUpperCase() }}</div>
          <div v-if="companyAddressLine" class="print-company-detail">{{ companyAddressLine }}</div>
          <div class="print-company-detail" v-if="companyDetails.companyEmail || companyDetails.companyPhone">
            <span v-if="companyDetails.companyEmail">{{ companyDetails.companyEmail }}</span>
            <span v-if="companyDetails.companyEmail && companyDetails.companyPhone"> &nbsp;|&nbsp; </span>
            <span v-if="companyDetails.companyPhone">{{ companyDetails.companyPhone }}</span>
          </div>
          <div class="print-company-detail" v-if="companyDetails.companyTpin">TPIN: {{ companyDetails.companyTpin }}</div>
          <div class="print-date">Date: {{ today }}</div>
          <div class="print-status-badge" :class="'print-status-' + (printBudget.approval_status || 'draft')">{{ printBudget.approval_status?.toUpperCase() || 'DRAFT' }}</div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="print-summary-grid">
        <div class="print-summary-card">
          <div class="print-summary-label">Total Budget</div>
          <div class="print-summary-value">{{ formatCurrency(printBudget.total_amount) }}</div>
        </div>
        <div class="print-summary-card">
          <div class="print-summary-label">Line Items</div>
          <div class="print-summary-value print-summary-value-dark">{{ (printBudget.items || []).length }}</div>
        </div>
        <div class="print-summary-card">
          <div class="print-summary-label">Status</div>
          <div class="print-summary-value print-summary-value-dark" style="font-size:13px">{{ printBudget.status }}</div>
        </div>
      </div>

      <!-- Allocations Table -->
      <table class="print-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Name / Reference</th>
            <th>Qty</th>
            <th>Unit Cost</th>
            <th>Department</th>
            <th>Assigned To</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in (printBudget.items || [])" :key="i" :class="{ 'print-row-alt': i % 2 === 0 }">
            <td class="print-td-num">{{ i + 1 }}</td>
            <td class="print-td-cat">{{ item.category }}</td>
            <td>{{ item.name || '—' }}</td>
            <td class="print-td-num">{{ item.quantity || 1 }}</td>
            <td class="print-td-amount">{{ formatCurrency(item.unit_cost || 0) }}</td>
            <td>{{ item.department || '—' }}</td>
            <td>{{ item.assigned_to || '—' }}</td>
            <td class="print-td-amount print-td-amount-bold">{{ formatCurrency(item.amount || (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_cost) || 0)) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="7">TOTAL BUDGET ALLOCATION</td>
            <td class="print-td-amount">{{ formatCurrency(printBudget.total_amount) }}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Notes -->
      <div v-if="printBudget.description || printBudget.notes" class="print-notes-box">
        <div class="print-notes-title">Notes &amp; Remarks</div>
        <p>{{ printBudget.description || printBudget.notes }}</p>
      </div>

      <!-- Approval Trail -->
      <div v-if="printBudget.submitted_by || printBudget.approved_by" class="print-approval-box">
        <div class="print-notes-title">Approval Trail</div>
        <div v-if="printBudget.submitted_by" class="print-approval-row">
          <span class="print-approval-role">Submitted By:</span>
          <span>{{ printBudget.submitted_by }}</span>
          <span v-if="printBudget.submitted_at" class="print-approval-date">{{ fmtDate(printBudget.submitted_at) }}</span>
        </div>
        <div v-if="printBudget.approved_by" class="print-approval-row">
          <span class="print-approval-role">{{ printBudget.approval_status === 'approved' ? 'Approved By:' : 'Rejected By:' }}</span>
          <span>{{ printBudget.approved_by }}</span>
          <span v-if="printBudget.approved_at" class="print-approval-date">{{ fmtDate(printBudget.approved_at) }}</span>
        </div>
        <div v-if="printBudget.rejection_reason" class="print-rejection-reason">
          <strong>Reason:</strong> {{ printBudget.rejection_reason }}
        </div>
      </div>

      <!-- Signature Block -->
      <div class="print-signatures">
        <div class="print-signature-line">
          <div class="print-signature-rule"></div>
          <div class="print-signature-label">Prepared By</div>
        </div>
        <div class="print-signature-line">
          <div class="print-signature-rule"></div>
          <div class="print-signature-label">Finance Manager</div>
        </div>
        <div class="print-signature-line">
          <div class="print-signature-rule"></div>
          <div class="print-signature-label">Approved By (CEO)</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="print-footer">
        <span>{{ companyDisplayName }} &mdash; Budget Report</span>
        <span>Generated {{ today }}</span>
        <span>Page 1 of 1</span>
      </div>
    </div>

    <!-- SCREEN LAYOUT -->
    <div class="print:hidden flex flex-col min-h-screen">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
        <div class="w-full px-6 h-16 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-2 h-8 bg-[#2F2E8B]"></div>
            <div>
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Finance // Budget Terminal</div>
              <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">Budget Management</h1>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <select v-model="selectedBranch" class="text-[10px] font-bold font-mono uppercase bg-white border border-gray-200 px-3 py-2 outline-none">
              <option :value="null">All Branches</option>
              <option v-for="b in branches" :key="b.id || b._id" :value="b">{{ (b.name || '').toUpperCase() }}</option>
            </select>
            <button @click="openCreateModal()" class="h-10 px-6 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] active:scale-95 flex items-center gap-2">
              <i class="fas fa-plus"></i> New Budget
            </button>
          </div>
        </div>
      </header>

      <!-- KPI Cards -->
      <div class="px-6 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div class="kpi-card">
          <div class="kpi-label">Total Budgets</div>
          <div class="kpi-value text-gray-900">{{ kpis.total_budgets }}</div>
          <div class="kpi-sub">All periods</div>
        </div>
        <div class="kpi-card border-l-amber-400">
          <div class="kpi-label">Pending Approval</div>
          <div class="kpi-value text-amber-600">{{ kpis.pending_approval }}</div>
          <div class="kpi-sub">{{ formatCurrency(kpis.pending_amount) }}</div>
        </div>
        <div class="kpi-card border-l-emerald-500">
          <div class="kpi-label">Approved</div>
          <div class="kpi-value text-emerald-600">{{ kpis.approved }}</div>
          <div class="kpi-sub">{{ formatCurrency(kpis.approved_amount) }}</div>
        </div>
        <div class="kpi-card border-l-blue-400">
          <div class="kpi-label">Draft</div>
          <div class="kpi-value text-blue-600">{{ kpis.draft }}</div>
          <div class="kpi-sub">Awaiting submission</div>
        </div>
        <div class="kpi-card border-l-rose-400">
          <div class="kpi-label">Rejected</div>
          <div class="kpi-value text-rose-500">{{ kpis.rejected }}</div>
          <div class="kpi-sub">Needs revision</div>
        </div>
        <div class="kpi-card border-l-[#2F2E8B]">
          <div class="kpi-label">Total Allocated</div>
          <div class="kpi-value text-[#2F2E8B] text-base">{{ formatCurrency(kpis.total_amount) }}</div>
          <div class="kpi-sub">All budgets</div>
        </div>
      </div>

      <!-- Main layout: list + detail -->
      <div class="flex flex-1 overflow-hidden px-6 pb-6 gap-4">

        <!-- Left: Budget Register -->
        <div class="flex-1 flex flex-col bg-white border border-gray-200 overflow-hidden min-w-0">
          <div class="px-4 py-3 border-b border-gray-100 flex flex-wrap gap-3 items-center">
            <div class="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-gray-50 min-w-[200px]">
              <i class="fas fa-search text-gray-300 text-xs"></i>
              <input v-model="searchQuery" placeholder="SEARCH BUDGETS..." class="bg-transparent border-none focus:ring-0 text-[10px] font-mono font-bold uppercase w-full outline-none" />
            </div>
            <select v-model="filterApproval" class="text-[10px] font-mono font-bold uppercase border border-gray-200 bg-gray-50 px-3 py-2 outline-none">
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select v-model="filterType" class="text-[10px] font-mono font-bold uppercase border border-gray-200 bg-gray-50 px-3 py-2 outline-none">
              <option value="">All Frequencies</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="semi-annual">Semi-Annual</option>
              <option value="yearly">Annual</option>
            </select>
            <div class="ml-auto flex gap-2">
              <button @click="fetchBudgets" class="px-3 py-2 border border-gray-200 text-[10px] font-mono font-bold text-gray-500 hover:text-[#2F2E8B] uppercase flex items-center gap-1">
                <i class="fas fa-sync-alt text-[9px]" :class="{'fa-spin': loading}"></i> Refresh
              </button>
              <button @click="handleExportPdf" class="px-3 py-2 border border-gray-200 text-[10px] font-mono font-bold text-gray-500 hover:text-[#B42318] uppercase flex items-center gap-1">
                <i class="fas fa-file-pdf text-[9px]"></i> {{ exportPdfLabel }}
              </button>
              <button @click="handleExportExcel" class="px-3 py-2 border border-gray-200 text-[10px] font-mono font-bold text-gray-500 hover:text-[#2F2E8B] uppercase flex items-center gap-1">
                <i class="fas fa-file-excel text-[9px]"></i> {{ exportExcelLabel }}
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div v-if="loading" class="flex flex-col items-center justify-center py-20">
              <div class="h-10 w-10 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin mb-3"></div>
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Loading register...</div>
            </div>
            <div v-else-if="filteredBudgets.length === 0" class="flex flex-col items-center justify-center py-20">
              <i class="fas fa-folder-open text-gray-200 text-4xl mb-4"></i>
              <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">No budgets found</div>
              <button @click="openCreateModal()" class="mt-4 px-6 py-2 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase hover:opacity-90">+ Create Budget</button>
            </div>
            <table v-else class="w-full text-left border-collapse">
              <thead class="sticky top-0 z-10">
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="th-cell w-8">
                    <input type="checkbox" @change="toggleSelectAll" :checked="allSelected" class="w-3 h-3 accent-[#2F2E8B]" />
                  </th>
                  <th class="th-cell w-8">#</th>
                  <th class="th-cell">Budget Name</th>
                  <th class="th-cell hidden md:table-cell">Period</th>
                  <th class="th-cell hidden lg:table-cell">Frequency</th>
                  <th class="th-cell hidden xl:table-cell">Department</th>
                  <th class="th-cell text-right">Amount</th>
                  <th class="th-cell">Approval</th>
                  <th class="th-cell hidden md:table-cell">Status</th>
                  <th class="th-cell text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(b, idx) in filteredBudgets"
                  :key="b.id"
                  class="border-b border-gray-100 hover:bg-indigo-50/40 transition-colors"
                  :class="{ 'bg-indigo-50/60 border-l-4 border-l-[#2F2E8B]': selectedBudget?.id === b.id }"
                >
                  <td class="td-cell w-8" @click.stop>
                    <input type="checkbox" :checked="selectedBudgetIds.includes(b.id)" @change="toggleBudgetSelect(b.id)" class="w-3 h-3 accent-[#2F2E8B] cursor-pointer" />
                  </td>
                  <td class="td-cell text-gray-400 font-mono text-[9px]" @click="selectBudget(b)">{{ idx + 1 }}</td>
                  <td class="td-cell" @click="selectBudget(b)">
                    <div class="text-[11px] font-black uppercase text-gray-900">{{ b.name }}</div>
                    <div class="text-[8px] font-mono text-gray-400 uppercase mt-0.5">{{ b.branch_id ? 'Branch: ' + b.branch_id : 'Main' }}</div>
                  </td>
                  <td class="td-cell hidden md:table-cell">
                    <span class="text-[10px] font-mono font-bold text-gray-700">{{ b.period }}</span>
                    <span v-if="b.fiscal_year" class="text-[8px] font-mono text-gray-400 ml-1">FY{{ b.fiscal_year }}</span>
                  </td>
                  <td class="td-cell" @click="selectBudget(b)">
                    <span class="text-[9px] font-mono font-bold uppercase px-2 py-0.5 bg-gray-100 text-gray-600">{{ b.type }}</span>
                  </td>
                  <td class="td-cell hidden xl:table-cell text-[9px] font-mono text-gray-500" @click="selectBudget(b)">{{ getDepartments(b) || '—' }}</td>
                  <td class="td-cell text-right" @click="selectBudget(b)">
                    <span class="text-[11px] font-black font-mono text-gray-900">{{ formatCurrency(b.total_amount) }}</span>
                  </td>
                  <td class="td-cell" @click="selectBudget(b)">
                    <span class="approval-badge" :class="approvalBadgeClass(b.approval_status)">{{ b.approval_status || 'draft' }}</span>
                  </td>
                  <td class="td-cell hidden md:table-cell" @click="selectBudget(b)">
                    <span class="status-badge" :class="statusBadgeClass(b.status)">{{ b.status }}</span>
                  </td>
                  <td class="td-cell text-center" @click.stop>
                    <div class="flex items-center justify-center gap-1">
                      <button @click="selectBudget(b)" title="View" class="action-icon text-indigo-500 hover:bg-indigo-50"><i class="fas fa-eye"></i></button>
                      <button @click="openEditModal(b)" title="Edit" class="action-icon text-gray-500 hover:bg-gray-100"><i class="fas fa-edit"></i></button>
                      <button @click="triggerPrint(b)" title="Print" class="action-icon text-gray-500 hover:bg-gray-100"><i class="fas fa-print"></i></button>
                      <button @click="confirmDelete(b)" title="Delete" class="action-icon text-rose-400 hover:bg-rose-50"><i class="fas fa-trash-alt"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right: Detail Panel -->
        <div class="w-80 xl:w-96 bg-white border border-gray-200 flex flex-col shrink-0 overflow-hidden">
          <div v-if="!selectedBudget" class="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <i class="fas fa-file-invoice-dollar text-gray-200 text-4xl mb-4"></i>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Select a budget to view details</div>
          </div>

          <template v-else>
            <div class="p-5 border-b border-gray-100 bg-gray-50">
              <div class="flex items-start justify-between mb-2">
                <div class="w-1.5 h-5 bg-[#2F2E8B] mr-3 shrink-0 mt-1"></div>
                <div class="flex-1">
                  <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Budget Detail</div>
                  <h3 class="text-sm font-black text-gray-900 uppercase leading-tight mt-0.5">{{ selectedBudget.name }}</h3>
                  <div class="text-[9px] font-mono text-gray-500 mt-1 uppercase">
                    {{ selectedBudget.period }} · {{ selectedBudget.type }}
                    <span v-if="selectedBudget.fiscal_year"> · FY{{ selectedBudget.fiscal_year }}</span>
                  </div>
                </div>
                <button @click="selectedBudget = null" class="text-gray-300 hover:text-gray-700 ml-2"><i class="fas fa-times text-xs"></i></button>
              </div>
              <div class="flex gap-2 mt-3">
                <span class="approval-badge" :class="approvalBadgeClass(selectedBudget.approval_status)">{{ selectedBudget.approval_status || 'draft' }}</span>
                <span class="status-badge" :class="statusBadgeClass(selectedBudget.status)">{{ selectedBudget.status }}</span>
              </div>
            </div>

            <div class="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-[#2F2E8B]">
              <span class="text-[9px] font-mono font-bold text-white/60 uppercase tracking-widest">Total Budget</span>
              <span class="text-lg font-black text-white font-mono">{{ formatCurrency(selectedBudget.total_amount) }}</span>
            </div>

            <div class="flex-1 overflow-y-auto custom-scrollbar">
              <div class="p-4">
                <div class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-3">Allocations ({{ (selectedBudget.items || []).length }})</div>
                <div class="space-y-2">
                  <div v-for="(item, i) in (selectedBudget.items || [])" :key="i" class="p-3 border border-gray-100 bg-gray-50/50">
                    <div class="flex justify-between items-start mb-1">
                      <div>
                        <div class="text-[10px] font-black uppercase text-gray-900">{{ item.category }}</div>
                        <div v-if="item.name" class="text-[8px] font-mono text-gray-400 uppercase">{{ item.name }}</div>
                      </div>
                      <span class="text-[11px] font-black font-mono text-[#2F2E8B]">{{ formatCurrency(item.amount || (parseFloat(item.quantity) || 0) * (parseFloat(item.unit_cost) || 0)) }}</span>
                    </div>
                    <div class="flex gap-3 mt-1.5 flex-wrap">
                      <div v-if="item.quantity && item.quantity > 1" class="text-[8px] font-mono text-gray-500 flex items-center gap-1"><i class="fas fa-cubes text-[7px] text-gray-300"></i>Qty: {{ item.quantity }} × {{ formatCurrency(item.unit_cost || 0) }}</div>
                      <div v-if="item.department" class="text-[8px] font-mono text-gray-500 flex items-center gap-1"><i class="fas fa-building text-[7px] text-gray-300"></i>{{ item.department }}</div>
                      <div v-if="item.assigned_to" class="text-[8px] font-mono text-gray-500 flex items-center gap-1"><i class="fas fa-user text-[7px] text-gray-300"></i>{{ item.assigned_to }}</div>
                    </div>
                  </div>
                </div>

                <div v-if="selectedBudget.description || selectedBudget.notes" class="mt-4 p-3 border border-dashed border-gray-200">
                  <div class="text-[8px] font-mono font-black text-gray-400 uppercase mb-1">Notes</div>
                  <p class="text-[10px] text-gray-600">{{ selectedBudget.description || selectedBudget.notes }}</p>
                </div>

                <div v-if="selectedBudget.submitted_by || selectedBudget.approved_by" class="mt-4 space-y-2">
                  <div class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Approval Trail</div>
                  <div v-if="selectedBudget.submitted_by" class="flex items-center gap-2 text-[9px] font-mono">
                    <i class="fas fa-paper-plane text-blue-400 text-[9px]"></i>
                    <div><span class="text-gray-400 uppercase">Submitted by </span><span class="font-bold text-gray-700">{{ selectedBudget.submitted_by }}</span><span v-if="selectedBudget.submitted_at" class="text-gray-400"> · {{ fmtDate(selectedBudget.submitted_at) }}</span></div>
                  </div>
                  <div v-if="selectedBudget.approved_by" class="flex items-center gap-2 text-[9px] font-mono">
                    <i :class="selectedBudget.approval_status === 'approved' ? 'fas fa-check-circle text-emerald-500' : 'fas fa-times-circle text-rose-500'" class="text-[9px]"></i>
                    <div><span class="text-gray-400 uppercase">{{ selectedBudget.approval_status === 'approved' ? 'Approved' : 'Rejected' }} by </span><span class="font-bold text-gray-700">{{ selectedBudget.approved_by }}</span><span v-if="selectedBudget.approved_at" class="text-gray-400"> · {{ fmtDate(selectedBudget.approved_at) }}</span></div>
                  </div>
                  <div v-if="selectedBudget.rejection_reason" class="text-[9px] font-mono p-2 bg-rose-50 border border-rose-100 text-rose-700 mt-1"><span class="font-black uppercase">Reason: </span>{{ selectedBudget.rejection_reason }}</div>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-gray-100 space-y-2">
              <button
                v-if="!selectedBudget.approval_status || selectedBudget.approval_status === 'draft' || selectedBudget.approval_status === 'rejected'"
                @click="openSubmitModal"
                class="w-full py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <i class="fas fa-paper-plane"></i> Submit for Approval
              </button>
              <div v-if="selectedBudget.approval_status === 'pending'" class="grid grid-cols-2 gap-2">
                <button @click="openApproveModal" class="py-2.5 bg-emerald-600 text-white text-[10px] font-mono font-black uppercase hover:bg-emerald-700 flex items-center justify-center gap-1"><i class="fas fa-check"></i> Approve</button>
                <button @click="openRejectModal" class="py-2.5 bg-rose-500 text-white text-[10px] font-mono font-black uppercase hover:bg-rose-600 flex items-center justify-center gap-1"><i class="fas fa-times"></i> Reject</button>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button @click="openEditModal(selectedBudget)" class="py-2 border border-gray-200 text-[9px] font-mono font-black uppercase text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1"><i class="fas fa-edit"></i> Edit</button>
                <button @click="triggerPrint(selectedBudget)" class="py-2 border border-gray-200 text-[9px] font-mono font-black uppercase text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1"><i class="fas fa-print"></i> Print</button>
                <button @click="confirmDelete(selectedBudget)" class="py-2 border border-rose-100 text-[9px] font-mono font-black uppercase text-rose-500 hover:bg-rose-50 flex items-center justify-center gap-1"><i class="fas fa-trash-alt"></i> Void</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <Teleport to="#modal-target" v-if="showBudgetModal || showSubmitModal || showApproveModal || showRejectModal" :key="modalKey">

      <!-- Create / Edit Budget Modal -->
      <div v-if="showBudgetModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showBudgetModal = false"></div>
        <div class="relative w-full max-w-5xl bg-white shadow-2xl flex flex-col max-h-[93vh] overflow-hidden">
          <div class="h-1.5 bg-[#2F2E8B]"></div>
          <div class="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-1.5 h-7 bg-[#2F2E8B]"></div>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">{{ isEditing ? 'Edit Budget' : 'Create New Budget' }}</h3>
            </div>
            <button @click="showBudgetModal = false" class="text-gray-400 hover:text-gray-900 text-base"><i class="fas fa-times"></i></button>
          </div>
          <div class="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8 bg-gray-50/30">
            <section>
              <div class="section-title">01 — Budget Identity</div>
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-3">
                  <label class="field-label">Budget Name *</label>
                  <input v-model="form.name" placeholder="E.G. OPERATIONS — MAY 2026" class="field-input" />
                </div>
                <div>
                  <label class="field-label">Frequency *</label>
                  <select v-model="form.type" class="field-input">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="semi-annual">Semi-Annual</option>
                    <option value="yearly">Annual / Yearly</option>
                  </select>
                </div>
                <div>
                  <label class="field-label">Period *</label>
                  <input v-model="form.period" :type="periodInputType" class="field-input uppercase font-mono" :placeholder="periodPlaceholder" />
                </div>
                <div>
                  <label class="field-label">Fiscal Year</label>
                  <input v-model="form.fiscal_year" placeholder="E.G. 2026" class="field-input font-mono" />
                </div>
                <div>
                  <label class="field-label">Branch / Office</label>
                  <select v-model="form.branch_id" class="field-input">
                    <option :value="null">Main / All</option>
                    <option v-for="b in branches" :key="b.id || b._id" :value="b.id || b._id">{{ (b.name || '').toUpperCase() }}</option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label class="field-label">Description / Purpose</label>
                  <textarea v-model="form.description" rows="2" placeholder="Brief description of this budget..." class="field-input resize-none"></textarea>
                </div>
              </div>
            </section>
            <section>
              <div class="flex items-center justify-between mb-3">
                <div class="section-title mb-0">02 — Budget Allocations</div>
              </div>
              <div class="grid grid-cols-12 gap-2 px-3 mb-1">
                <div class="col-span-2 text-[7px] font-mono font-black text-gray-400 uppercase">Category</div>
                <div class="col-span-1 text-[7px] font-mono font-black text-gray-400 uppercase text-center">Qty</div>
                <div class="col-span-2 text-[7px] font-mono font-black text-gray-400 uppercase">Unit Cost</div>
                <div class="col-span-1 text-[7px] font-mono font-black text-gray-400 uppercase text-right">Total</div>
                <div class="col-span-2 text-[7px] font-mono font-black text-gray-400 uppercase">Department</div>
                <div class="col-span-2 text-[7px] font-mono font-black text-gray-400 uppercase">Assigned To</div>
                <div class="col-span-2"></div>
              </div>
              <div class="space-y-2.5">
                <div v-for="(item, idx) in form.items" :key="idx" class="grid grid-cols-12 gap-3 p-3.5 bg-white border border-gray-100 group items-start relative">
                  <div class="col-span-2">
                    <select v-model="item.category" class="field-input-sm">
                      <option value="" disabled>SELECT</option>
                      <option v-for="cat in expenseCategories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                  </div>
                  <div class="col-span-1">
                    <input v-model.number="item.quantity" type="number" min="1" step="1" placeholder="1" class="field-input-sm text-center font-black" />
                  </div>
                  <div class="col-span-2">
                    <input v-model.number="item.unit_cost" type="number" min="0" step="0.01" placeholder="0.00" class="field-input-sm font-black" />
                  </div>
                  <div class="col-span-1 flex items-center justify-end pr-1">
                    <span class="text-[11px] font-black font-mono text-[#2F2E8B]">{{ formatCurrency((parseFloat(item.quantity) || 0) * (parseFloat(item.unit_cost) || 0)) }}</span>
                  </div>
                  <div class="col-span-2">
                    <input v-model="item.department" placeholder="Dept." class="field-input-sm" />
                  </div>
                  <div class="col-span-2">
                    <input v-model="item.assigned_to" placeholder="Staff / Role" class="field-input-sm" />
                  </div>
                  <div class="col-span-2">
                    <input v-model="item.name" placeholder="Ref / Name" class="field-input-sm" />
                    <button v-if="form.items.length > 1" @click="removeItem(idx)" class="absolute -top-1 -right-1 text-gray-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white">
                      <i class="fas fa-times text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-3 flex justify-between items-center gap-4 pr-2">
                <button @click="addItem" class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase px-4 py-2 border border-[#2F2E8B]/20 hover:bg-[#2F2E8B]/5 flex items-center gap-1.5">
                  <i class="fas fa-plus text-[9px]"></i> Add Line
                </button>
                <div class="flex items-center gap-4">
                  <span class="text-[10px] font-mono font-black text-gray-400 uppercase">Total Allocation</span>
                  <span class="text-2xl font-black text-[#2F2E8B] font-mono">{{ formatCurrency(calculatedTotal) }}</span>
                </div>
              </div>
            </section>
          </div>
          <div class="px-8 py-5 border-t border-gray-100 bg-white flex gap-4">
            <button @click="showBudgetModal = false" class="flex-1 py-3.5 border border-gray-200 text-[11px] font-mono font-black uppercase text-gray-500 hover:bg-gray-50">Cancel</button>
            <button @click="saveBudget" :disabled="submitting" class="flex-1 py-3.5 bg-[#2F2E8B] text-white text-[11px] font-mono font-black uppercase hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
              <i v-if="submitting" class="fas fa-spinner fa-spin"></i>
              {{ isEditing ? 'Update Budget' : 'Create Budget' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Submit Modal -->
      <div v-if="showSubmitModal" class="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showSubmitModal = false"></div>
        <div class="relative w-full max-w-sm bg-white shadow-2xl">
          <div class="h-1 bg-amber-400"></div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 bg-amber-50 flex items-center justify-center border border-amber-100"><i class="fas fa-paper-plane text-amber-500"></i></div>
              <div>
                <h3 class="text-sm font-black uppercase text-gray-900">Submit for Approval</h3>
                <p class="text-[9px] font-mono text-gray-400 uppercase">{{ selectedBudget?.name }}</p>
              </div>
            </div>
            <label class="field-label">Submitted By *</label>
            <input v-model="approvalForm.submitted_by" placeholder="Your name or email" class="field-input mb-4" />
            <div class="flex gap-3">
              <button @click="showSubmitModal = false" class="flex-1 py-2.5 border border-gray-200 text-[10px] font-mono font-black uppercase text-gray-500">Cancel</button>
              <button @click="submitForApproval" :disabled="submitting" class="flex-1 py-2.5 bg-amber-500 text-white text-[10px] font-mono font-black uppercase hover:bg-amber-600 disabled:opacity-50"><i v-if="submitting" class="fas fa-spinner fa-spin mr-1"></i> Submit</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Approve Modal -->
      <div v-if="showApproveModal" class="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showApproveModal = false"></div>
        <div class="relative w-full max-w-sm bg-white shadow-2xl">
          <div class="h-1 bg-emerald-500"></div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 bg-emerald-50 flex items-center justify-center border border-emerald-100"><i class="fas fa-check-circle text-emerald-500 text-lg"></i></div>
              <div>
                <h3 class="text-sm font-black uppercase text-gray-900">Approve Budget</h3>
                <p class="text-[9px] font-mono text-gray-400 uppercase">{{ selectedBudget?.name }}</p>
              </div>
            </div>
            <label class="field-label">Approved By (Name / Title) *</label>
            <input v-model="approvalForm.approved_by" placeholder="E.G. John Banda — CEO" class="field-input mb-4" />
            <div class="flex gap-3">
              <button @click="showApproveModal = false" class="flex-1 py-2.5 border border-gray-200 text-[10px] font-mono font-black uppercase text-gray-500">Cancel</button>
              <button @click="approveBudget" :disabled="submitting" class="flex-1 py-2.5 bg-emerald-600 text-white text-[10px] font-mono font-black uppercase hover:bg-emerald-700 disabled:opacity-50"><i v-if="submitting" class="fas fa-spinner fa-spin mr-1"></i> Confirm Approve</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Reject Modal -->
      <div v-if="showRejectModal" class="fixed inset-0 z-[1001] flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showRejectModal = false"></div>
        <div class="relative w-full max-w-sm bg-white shadow-2xl">
          <div class="h-1 bg-rose-500"></div>
          <div class="p-6">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-10 h-10 bg-rose-50 flex items-center justify-center border border-rose-100"><i class="fas fa-times-circle text-rose-500 text-lg"></i></div>
              <div>
                <h3 class="text-sm font-black uppercase text-gray-900">Reject Budget</h3>
                <p class="text-[9px] font-mono text-gray-400 uppercase">{{ selectedBudget?.name }}</p>
              </div>
            </div>
            <label class="field-label">Rejected By (Name / Title) *</label>
            <input v-model="approvalForm.approved_by" placeholder="E.G. Jane Phiri — CFO" class="field-input mb-3" />
            <label class="field-label">Reason for Rejection *</label>
            <textarea v-model="approvalForm.rejection_reason" rows="3" placeholder="Provide a clear reason..." class="field-input resize-none mb-4"></textarea>
            <div class="flex gap-3">
              <button @click="showRejectModal = false" class="flex-1 py-2.5 border border-gray-200 text-[10px] font-mono font-black uppercase text-gray-500">Cancel</button>
              <button @click="rejectBudget" :disabled="submitting" class="flex-1 py-2.5 bg-rose-500 text-white text-[10px] font-mono font-black uppercase hover:bg-rose-600 disabled:opacity-50"><i v-if="submitting" class="fas fa-spinner fa-spin mr-1"></i> Confirm Reject</button>
            </div>
          </div>
        </div>
      </div>

    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT';
import { useExpenses } from '@/views/dashboardModules/functions/useExpenses';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const { getTenantId, getToken } = decodeJWT();
const tenantId = getTenantId();
const { categories: expenseCategoriesRaw, branches, selectedBranch } = useExpenses();

const expenseCategories = computed(() => {
  const raw = expenseCategoriesRaw.value;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  return Object.values(raw).flat();
});

// State
const loading = ref(false);
const submitting = ref(false);
const allBudgets = ref([]);
const selectedBudget = ref(null);
const printBudget = ref(null);
const searchQuery = ref('');
const filterApproval = ref('');
const filterType = ref('');
const companyDetails = ref({
  companyName: '',
  companyEmail: '',
  companyPhone: '',
  companyTpin: '',
  companyAddress: ''
});
const brandPrefs = ref({
  companyName: '',
  primaryColor: '#2F2E8B',
  companyLogo: ''
});
const kpis = ref({ total_budgets: 0, total_amount: 0, pending_approval: 0, pending_amount: 0, approved: 0, approved_amount: 0, draft: 0, rejected: 0 });
const showBudgetModal = ref(false);
const showSubmitModal = ref(false);
const showApproveModal = ref(false);
const showRejectModal = ref(false);
const isEditing = ref(false);
const modalKey = ref(0);

const selectedBudgetIds = ref([]);
const allSelected = computed(() => filteredBudgets.value.length > 0 && selectedBudgetIds.value.length === filteredBudgets.value.length);

function toggleBudgetSelect(id) {
  const idx = selectedBudgetIds.value.indexOf(id);
  if (idx >= 0) selectedBudgetIds.value.splice(idx, 1);
  else selectedBudgetIds.value.push(id);
}

function toggleSelectAll() {
  if (allSelected.value) {
    selectedBudgetIds.value = [];
  } else {
    selectedBudgetIds.value = filteredBudgets.value.map(b => b.id);
  }
}

const exportPdfLabel = computed(() => selectedBudgetIds.value.length > 0 ? `Export Selected (${selectedBudgetIds.value.length})` : 'Export PDF');
const exportExcelLabel = computed(() => selectedBudgetIds.value.length > 0 ? `Export Selected (${selectedBudgetIds.value.length})` : 'Export Excel');

function handleExportPdf() {
  if (selectedBudgetIds.value.length > 0) exportSelectedBudgets('pdf');
  else exportBudgetList('pdf');
}

function handleExportExcel() {
  if (selectedBudgetIds.value.length > 0) exportSelectedBudgets('excel');
  else exportBudgetList('excel');
}

const emptyForm = () => ({
  id: null, name: '', type: 'monthly',
  period: new Date().toISOString().substring(0, 7),
  fiscal_year: String(new Date().getFullYear()),
  branch_id: null, description: '', notes: '', status: 'Draft',
  items: [{ category: '', quantity: 1, unit_cost: 0, name: '', department: '', assigned_to: '', description: '' }],
  total_amount: 0
});
const form = ref(emptyForm());
const approvalForm = ref({ submitted_by: '', approved_by: '', rejection_reason: '' });

// Computed
const calculatedTotal = computed(() => form.value.items.reduce((s, i) => s + (parseFloat(i.quantity) || 0) * (parseFloat(i.unit_cost) || 0), 0));

const periodInputType = computed(() => {
  const t = form.value.type;
  if (t === 'monthly' || t === 'semi-annual' || t === 'quarterly') return 'month';
  if (t === 'yearly') return 'number';
  return 'date';
});

const periodPlaceholder = computed(() => {
  const t = form.value.type;
  if (t === 'monthly') return 'YYYY-MM';
  if (t === 'quarterly') return 'E.G. 2026-Q2';
  if (t === 'yearly') return 'YYYY';
  if (t === 'semi-annual') return 'E.G. 2026-H1';
  if (t === 'weekly') return 'YYYY-W01';
  if (t === 'biweekly') return 'YYYY-BW01';
  return '';
});

const filteredBudgets = computed(() => {
  let list = [...allBudgets.value];
  const q = searchQuery.value.toLowerCase();
  if (q) list = list.filter(b => b.name?.toLowerCase().includes(q) || b.period?.includes(q) || getDepartments(b)?.toLowerCase().includes(q));
  if (filterApproval.value) list = list.filter(b => (b.approval_status || 'draft') === filterApproval.value);
  if (filterType.value) list = list.filter(b => b.type === filterType.value);
  return list;
});

const today = computed(() => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }));
const companyDisplayName = computed(() => companyDetails.value.companyName || 'Your Company');
const companyAddressLine = computed(() => companyDetails.value.companyAddress || '');
const exportCompanyName = computed(() => brandPrefs.value.companyName || companyDisplayName.value);

// Helpers
function formatCurrency(val) {
  const n = parseFloat(val) || 0;
  return 'K ' + n.toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(val) {
  if (!val) return '';
  return new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function getDepartments(budget) {
  const d = [...new Set((budget.items || []).map(i => i.department).filter(Boolean))];
  return d.slice(0, 2).join(', ') + (d.length > 2 ? ' +' + (d.length - 2) : '');
}

function hexToRgb(hex) {
  const safeHex = (hex || '').replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(safeHex)) return [47, 46, 139];
  const value = parseInt(safeHex, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function loadImageAsDataUrl(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function hydrateBrandPrefs() {
  try {
    const raw = localStorage.getItem('ub_branding_prefs') || localStorage.getItem('brandPrefs');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    brandPrefs.value = {
      companyName: parsed.companyName || parsed.businessName || '',
      primaryColor: parsed.primaryColor || '#2F2E8B',
      companyLogo: parsed.companyLogo || parsed.logo || ''
    };
  } catch {
    brandPrefs.value = { companyName: '', primaryColor: '#2F2E8B', companyLogo: '' };
  }
}

function normalizeCompanyDetails(raw) {
  return {
    companyName: raw.company_name || raw.companyName || raw.business_name || raw.businessName || raw.trading_name || raw.tradingName || raw.name || '',
    companyEmail: raw.email || raw.owner_email || raw.contact_email || '',
    companyPhone: raw.phone_number || raw.phone || raw.contact_phone || '',
    companyTpin: raw.tpin || raw.TPIN || '',
    companyAddress: [raw.address || raw.location || '', raw.city || '', raw.country || ''].filter(Boolean).join(', ')
  };
}
function approvalBadgeClass(status) {
  switch (status) {
    case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'rejected': return 'bg-rose-100 text-rose-600 border-rose-200';
    default: return 'bg-gray-100 text-gray-500 border-gray-200';
  }
}
function statusBadgeClass(status) {
  switch (status) {
    case 'Active': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Completed': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Cancelled': return 'bg-gray-100 text-gray-500 border-gray-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

// Auth
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

// Fetch
async function fetchBudgets() {
  loading.value = true;
  try {
    const params = { tenant_id: tenantId };
    if (selectedBranch.value?.id) params.branch_id = selectedBranch.value.id;
    const { data } = await axios.get(`${API_BASE_URL}/budgets/`, { params, headers: authHeaders() });
    allBudgets.value = data;
    if (selectedBudget.value) {
      const fresh = data.find(b => b.id === selectedBudget.value.id);
      if (fresh) selectedBudget.value = fresh;
    }
  } catch (e) { console.error('Failed to fetch budgets', e); }
  finally { loading.value = false; }
}

async function fetchKpis() {
  try {
    const params = { tenant_id: tenantId };
    if (selectedBranch.value?.id) params.branch_id = selectedBranch.value.id;
    const { data } = await axios.get(`${API_BASE_URL}/budgets/kpis`, { params, headers: authHeaders() });
    kpis.value = data;
  } catch (e) { /* non-fatal */ }
}

async function fetchCompanyDetails() {
  try {
    if (!tenantId) return;
    let payload = null;
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tenant-details/details`, { params: { tenant_id: tenantId }, headers: authHeaders() });
      payload = data;
    } catch {
      const { data } = await axios.get(`${API_BASE_URL}/tenants/details`, { params: { tenant_id: tenantId }, headers: authHeaders() });
      payload = data;
    }
    const tenant = payload?.tenant ?? payload;
    if (tenant) companyDetails.value = normalizeCompanyDetails(tenant);
  } catch (e) {
    console.error('Failed to fetch company details for budget docs:', e);
  }
}

function refreshAll() { fetchBudgets(); fetchKpis(); }

// Modal openers
function openCreateModal() { isEditing.value = false; form.value = emptyForm(); modalKey.value++; showBudgetModal.value = true; }
function openEditModal(budget) {
  isEditing.value = true;
  form.value = { id: budget.id, name: budget.name, type: budget.type || 'monthly', period: budget.period, fiscal_year: budget.fiscal_year || '', branch_id: budget.branch_id || null, description: budget.description || '', notes: budget.notes || '', status: budget.status || 'Draft', items: (budget.items || []).map(i => ({ category: i.category || '', quantity: i.quantity || 1, unit_cost: i.unit_cost || i.amount || 0, name: i.name || '', department: i.department || '', assigned_to: i.assigned_to || '', description: i.description || '' })), total_amount: budget.total_amount };
  modalKey.value++;
  showBudgetModal.value = true;
}
function selectBudget(b) { selectedBudget.value = b; }
function openSubmitModal() { approvalForm.value = { submitted_by: '', approved_by: '', rejection_reason: '' }; modalKey.value++; showSubmitModal.value = true; }
function openApproveModal() { approvalForm.value = { submitted_by: '', approved_by: '', rejection_reason: '' }; modalKey.value++; showApproveModal.value = true; }
function openRejectModal() { approvalForm.value = { submitted_by: '', approved_by: '', rejection_reason: '' }; modalKey.value++; showRejectModal.value = true; }

// CRUD
async function saveBudget() {
  if (!form.value.name || !form.value.period || !form.value.type) { alert('Please fill in all required fields: Name, Frequency, and Period.'); return; }
  if (form.value.items.some(i => !i.category)) { alert('All line items must have a category.'); return; }
  submitting.value = true;
  try {
    const itemsWithAmount = form.value.items.map(i => ({
      ...i,
      amount: (parseFloat(i.quantity) || 0) * (parseFloat(i.unit_cost) || 0)
    }));
    const payload = { ...form.value, items: itemsWithAmount, total_amount: calculatedTotal.value };
    if (isEditing.value) {
      await axios.put(`${API_BASE_URL}/budgets/${form.value.id}`, payload, { params: { tenant_id: tenantId }, headers: authHeaders() });
    } else {
      await axios.post(`${API_BASE_URL}/budgets/`, payload, { params: { tenant_id: tenantId }, headers: authHeaders() });
    }
    showBudgetModal.value = false;
    refreshAll();
  } catch (e) { console.error('Failed to save budget', e); alert('Error saving budget.'); }
  finally { submitting.value = false; }
}

async function confirmDelete(budget) {
  if (!confirm(`Delete budget "${budget.name}"? This cannot be undone.`)) return;
  try {
    await axios.delete(`${API_BASE_URL}/budgets/${budget.id}`, { params: { tenant_id: tenantId }, headers: authHeaders() });
    if (selectedBudget.value?.id === budget.id) selectedBudget.value = null;
    refreshAll();
  } catch (e) { alert('Error deleting budget.'); }
}

// Approval
async function submitForApproval() {
  if (!approvalForm.value.submitted_by.trim()) { alert('Please enter your name.'); return; }
  submitting.value = true;
  try {
    await axios.post(`${API_BASE_URL}/budgets/${selectedBudget.value.id}/submit`, { submitted_by: approvalForm.value.submitted_by }, { params: { tenant_id: tenantId }, headers: authHeaders() });
    showSubmitModal.value = false;
    refreshAll();
  } catch (e) { alert(e.response?.data?.detail || 'Failed to submit.'); }
  finally { submitting.value = false; }
}
async function approveBudget() {
  if (!approvalForm.value.approved_by.trim()) { alert('Please enter your name / title.'); return; }
  submitting.value = true;
  try {
    await axios.post(`${API_BASE_URL}/budgets/${selectedBudget.value.id}/approve`, { approved_by: approvalForm.value.approved_by }, { params: { tenant_id: tenantId }, headers: authHeaders() });
    showApproveModal.value = false;
    refreshAll();
  } catch (e) { alert(e.response?.data?.detail || 'Failed to approve.'); }
  finally { submitting.value = false; }
}
async function rejectBudget() {
  if (!approvalForm.value.approved_by.trim()) { alert('Please enter your name.'); return; }
  if (!approvalForm.value.rejection_reason.trim()) { alert('Rejection reason is required.'); return; }
  submitting.value = true;
  try {
    await axios.post(`${API_BASE_URL}/budgets/${selectedBudget.value.id}/reject`, { approved_by: approvalForm.value.approved_by, rejection_reason: approvalForm.value.rejection_reason }, { params: { tenant_id: tenantId }, headers: authHeaders() });
    showRejectModal.value = false;
    refreshAll();
  } catch (e) { alert(e.response?.data?.detail || 'Failed to reject.'); }
  finally { submitting.value = false; }
}

// Print
function triggerPrint(budget) {
  printBudget.value = budget;
  setTimeout(() => window.print(), 150);
  window.addEventListener('afterprint', () => { printBudget.value = null; }, { once: true });
}

// Export
function normalizeApprovalStatus(status) {
  const value = (status || 'draft').toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function resolveBudgetList(listOverride = null) {
  return listOverride || filteredBudgets.value;
}

function exportSelectedBudgets(format = 'excel') {
  const list = filteredBudgets.value.filter(b => selectedBudgetIds.value.includes(b.id));
  if (!list.length) {
    alert('No budgets selected for export.');
    return;
  }
  if (format === 'pdf') {
    exportBudgetListPdf(list);
    return;
  }
  exportBudgetListExcel(list);
  selectedBudgetIds.value = [];
}

function exportBudgetList(format = 'excel') {
  if (!filteredBudgets.value.length) {
    alert('No budgets available to export.');
    return;
  }

  if (format === 'pdf') {
    exportBudgetListPdf();
    return;
  }

  exportBudgetListExcel();
}

function exportBudgetListExcel(listOverride = null) {
  const dateLabel = new Date().toISOString().substring(0, 10);
  const workbook = XLSX.utils.book_new();
  const exportList = resolveBudgetList(listOverride);

  const registerRows = exportList.map((b, idx) => ({
    'No.': idx + 1,
    Name: b.name,
    Period: b.period,
    Frequency: (b.type || '').toUpperCase(),
    'Fiscal Year': b.fiscal_year || '',
    Departments: getDepartments(b) || '',
    'Approval Status': normalizeApprovalStatus(b.approval_status),
    Status: b.status || '',
    'Submitted By': b.submitted_by || '',
    'Approved By': b.approved_by || '',
    'Total Amount': parseFloat(b.total_amount) || 0
  }));

  const registerSheet = XLSX.utils.json_to_sheet(registerRows);
  registerSheet['!cols'] = [
    { wch: 6 },
    { wch: 34 },
    { wch: 16 },
    { wch: 14 },
    { wch: 12 },
    { wch: 26 },
    { wch: 15 },
    { wch: 12 },
    { wch: 24 },
    { wch: 24 },
    { wch: 16 }
  ];
  XLSX.utils.book_append_sheet(workbook, registerSheet, 'Budget Register');

  const detailRows = [];
  exportList.forEach((budget) => {
    const items = budget.items || [];
    if (!items.length) {
      detailRows.push({
        'Budget Name': budget.name,
        Period: budget.period,
        Frequency: budget.type,
        Category: '',
        'Item Name': '',
        Quantity: 1,
        'Unit Cost': 0,
        Department: '',
        'Assigned To': '',
        Amount: 0
      });
      return;
    }

    items.forEach((item) => {
      const qty = parseFloat(item.quantity) || 1;
      const unitCost = parseFloat(item.unit_cost) || parseFloat(item.amount) || 0;
      detailRows.push({
        'Budget Name': budget.name,
        Period: budget.period,
        Frequency: budget.type,
        Category: item.category || '',
        'Item Name': item.name || '',
        Quantity: qty,
        'Unit Cost': unitCost,
        Department: item.department || '',
        'Assigned To': item.assigned_to || '',
        Amount: qty * unitCost
      });
    });
  });

  const detailSheet = XLSX.utils.json_to_sheet(detailRows);
  detailSheet['!cols'] = [
    { wch: 34 },
    { wch: 16 },
    { wch: 12 },
    { wch: 20 },
    { wch: 24 },
    { wch: 10 },
    { wch: 14 },
    { wch: 20 },
    { wch: 20 },
    { wch: 14 }
  ];
  XLSX.utils.book_append_sheet(workbook, detailSheet, 'Allocations');

  const totalAmount = exportList.reduce((sum, b) => sum + (parseFloat(b.total_amount) || 0), 0);
  const summaryRows = [
    { Metric: 'Company', Value: exportCompanyName.value },
    { Metric: 'Company Email', Value: companyDetails.value.companyEmail || '-' },
    { Metric: 'Company Phone', Value: companyDetails.value.companyPhone || '-' },
    { Metric: 'TPIN', Value: companyDetails.value.companyTpin || '-' },
    { Metric: 'Address', Value: companyAddressLine.value || '-' },
    { Metric: '', Value: '' },
    { Metric: 'Total Budgets', Value: exportList.length },
    { Metric: 'Total Allocation', Value: totalAmount },
    { Metric: 'Pending Approval', Value: exportList.filter((b) => (b.approval_status || 'draft') === 'pending').length },
    { Metric: 'Approved', Value: exportList.filter((b) => (b.approval_status || 'draft') === 'approved').length },
    { Metric: 'Rejected', Value: exportList.filter((b) => (b.approval_status || 'draft') === 'rejected').length }
  ];
  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  summarySheet['!cols'] = [{ wch: 26 }, { wch: 22 }];
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

  const companySheetRows = [
    { Field: 'Company Name', Value: exportCompanyName.value },
    { Field: 'Company Email', Value: companyDetails.value.companyEmail || '-' },
    { Field: 'Company Phone', Value: companyDetails.value.companyPhone || '-' },
    { Field: 'Company TPIN', Value: companyDetails.value.companyTpin || '-' },
    { Field: 'Company Address', Value: companyAddressLine.value || '-' },
    { Field: 'Generated On', Value: new Date().toLocaleString('en-GB') }
  ];
  const companySheet = XLSX.utils.json_to_sheet(companySheetRows);
  companySheet['!cols'] = [{ wch: 24 }, { wch: 64 }];
  XLSX.utils.book_append_sheet(workbook, companySheet, 'Company Info');

  XLSX.writeFile(workbook, `Budget_Register_Professional_${dateLabel}.xlsx`);
}

async function exportBudgetListPdf(listOverride = null) {
  const exportList = resolveBudgetList(listOverride);
  const isSingleBudget = exportList.length === 1;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const generatedAt = new Date();
  const generatedText = generatedAt.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const primaryRgb = hexToRgb(brandPrefs.value.primaryColor);
  doc.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
  doc.rect(0, 0, pageWidth, 74, 'F');

  const logoUrl = brandPrefs.value.companyLogo;
  if (logoUrl) {
    const logoDataUrl = await loadImageAsDataUrl(logoUrl);
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, 'PNG', 40, 14, 36, 36, undefined, 'FAST');
    }
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('BUDGET REGISTER REPORT', 84, 34);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${generatedText}`, 84, 48);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text((exportCompanyName.value || 'YOUR COMPANY').toUpperCase(), pageWidth - 40, 22, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const companyLine1 = companyAddressLine.value || 'Address not configured';
  const companyLine2 = [companyDetails.value.companyEmail || '', companyDetails.value.companyPhone || ''].filter(Boolean).join(' | ') || 'Contact not configured';
  const companyLine3 = companyDetails.value.companyTpin ? `TPIN: ${companyDetails.value.companyTpin}` : '';
  doc.text(companyLine1, pageWidth - 40, 34, { align: 'right' });
  doc.text(companyLine2, pageWidth - 40, 44, { align: 'right' });
  if (companyLine3) doc.text(companyLine3, pageWidth - 40, 54, { align: 'right' });

  const totalAmount = exportList.reduce((sum, b) => sum + (parseFloat(b.total_amount) || 0), 0);
  const pendingCount = exportList.filter((b) => (b.approval_status || 'draft') === 'pending').length;
  const approvedCount = exportList.filter((b) => (b.approval_status || 'draft') === 'approved').length;

  autoTable(doc, {
    startY: 82,
    theme: 'grid',
    body: [[
      `Total Budgets: ${exportList.length}`,
      `Total Allocation: ${formatCurrency(totalAmount)}`,
      `Pending: ${pendingCount} | Approved: ${approvedCount}`
    ]],
    styles: {
      fontSize: 9,
      textColor: [31, 41, 55],
      halign: 'left',
      cellPadding: 8
    },
    columnStyles: {
      0: { fillColor: [248, 250, 252] },
      1: { fillColor: [241, 245, 249] },
      2: { fillColor: [248, 250, 252] }
    }
  });

  const tableRows = exportList.map((b, idx) => [
    idx + 1,
    b.name || '-',
    b.period || '-',
    (b.type || '').toUpperCase(),
    normalizeApprovalStatus(b.approval_status),
    b.status || '-',
    formatCurrency(b.total_amount)
  ]);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 12,
    head: [['#', 'Budget Name', 'Period', 'Frequency', 'Approval', 'Status', 'Amount']],
    body: tableRows,
    theme: 'striped',
    headStyles: {
      fillColor: [primaryRgb[0], primaryRgb[1], primaryRgb[2]],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'left'
    },
    styles: {
      fontSize: 8,
      textColor: [31, 41, 55],
      cellPadding: 6,
      overflow: 'linebreak'
    },
    columnStyles: {
      0: { cellWidth: 24, halign: 'center' },
      1: { cellWidth: 160 },
      2: { cellWidth: 70 },
      3: { cellWidth: 68 },
      4: { cellWidth: 62 },
      5: { cellWidth: 58 },
      6: { cellWidth: 74, halign: 'right' }
    },
    didDrawPage: () => {
      const pageCount = doc.getNumberOfPages();
      const currentPage = doc.getCurrentPageInfo().pageNumber;
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(`Page ${currentPage} of ${pageCount}`, pageWidth - 80, doc.internal.pageSize.getHeight() - 20);
    }
  });

  const detailBudget = isSingleBudget ? exportList[0] : selectedBudget.value;
  if (detailBudget) {
    doc.addPage();
    doc.setTextColor(31, 41, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(isSingleBudget ? 'BUDGET DETAIL REPORT' : 'BUDGET DETAIL ATTACHMENT', 40, 46);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Issued By: ${exportCompanyName.value}`, 40, 52);
    doc.text(`Budget: ${detailBudget.name || '-'}`, 40, 66);
    doc.text(`Period: ${detailBudget.period || '-'} | Frequency: ${(detailBudget.type || '').toUpperCase()}`, 40, 82);
    doc.text(`Approval: ${normalizeApprovalStatus(detailBudget.approval_status)} | Status: ${detailBudget.status || '-'}`, 40, 98);

    const allocationRows = (detailBudget.items || []).map((item, idx) => {
      const qty = parseFloat(item.quantity) || 1;
      const unitCost = parseFloat(item.unit_cost) || parseFloat(item.amount) || 0;
      return [
        idx + 1,
        item.category || '-',
        item.name || '-',
        String(qty),
        formatCurrency(unitCost),
        item.department || '-',
        item.assigned_to || '-',
        formatCurrency(qty * unitCost)
      ];
    });

    autoTable(doc, {
      startY: 114,
      head: [['#', 'Category', 'Name / Ref', 'Qty', 'Unit Cost', 'Department', 'Assigned To', 'Amount']],
      body: allocationRows.length ? allocationRows : [['-', 'No allocation lines found', '-', '1', formatCurrency(0), '-', '-', formatCurrency(0)]],
      theme: 'grid',
      headStyles: {
        fillColor: [primaryRgb[0], primaryRgb[1], primaryRgb[2]],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 8,
        cellPadding: 6,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { cellWidth: 80 },
        2: { cellWidth: 90 },
        3: { cellWidth: 28, halign: 'center' },
        4: { cellWidth: 72, halign: 'right' },
        5: { cellWidth: 70 },
        6: { cellWidth: 70 },
        7: { cellWidth: 76, halign: 'right' }
      }
    });

    const endY = doc.lastAutoTable.finalY + 18;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Total Allocation: ${formatCurrency(detailBudget.total_amount)}`, 40, endY);
  }

  doc.save(`Budget_Register_Professional_${new Date().toISOString().substring(0, 10)}.pdf`);
}

function addItem() { form.value.items.push({ category: '', quantity: 1, unit_cost: 0, name: '', department: '', assigned_to: '', description: '' }); }
function removeItem(idx) { form.value.items.splice(idx, 1); }

watch(selectedBranch, refreshAll);
onMounted(async () => {
  hydrateBrandPrefs();
  await fetchCompanyDetails();
  refreshAll();
});
</script>

<style scoped>
.kpi-card { @apply bg-white border border-gray-200 border-l-4 border-l-gray-300 px-4 py-3 flex flex-col; }
.kpi-label { @apply text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1; }
.kpi-value { @apply text-2xl font-black; }
.kpi-sub { @apply text-[8px] font-mono text-gray-400 mt-0.5; }
.th-cell { @apply px-3 py-2.5 text-[8px] font-mono font-black text-gray-500 uppercase tracking-widest border-b border-gray-200; }
.td-cell { @apply px-3 py-3; }
.approval-badge { @apply text-[8px] font-mono font-black uppercase px-2 py-0.5 border tracking-wider; }
.status-badge { @apply text-[8px] font-mono font-black uppercase px-2 py-0.5 border tracking-wider; }
.action-icon { @apply w-6 h-6 flex items-center justify-center text-[10px] transition-colors; }
.field-label { @apply block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2; }
.field-input { @apply w-full px-4 py-3 bg-white border border-gray-200 text-[12px] font-mono font-bold outline-none focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] transition-all; }
.field-input-sm { @apply w-full px-3 py-2.5 bg-gray-50 border border-gray-100 text-[11px] font-mono font-bold uppercase outline-none focus:bg-white focus:border-[#2F2E8B] transition-all; }
.section-title { @apply text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest mb-4 pb-2 border-b border-[#2F2E8B]/10; }
.custom-scrollbar::-webkit-scrollbar { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-gray-200; }
@media print {
  .print-report { padding: 32px; font-family: Arial, sans-serif; }
  @page { margin: 20mm; size: A4; }
}
</style>

<!-- Non‑scoped global print rules: hide all UI chrome, show only the report -->
<style>
@media print {
  /* Hide ALL page content by default */
  body > *:not(#budget-print-report) {
    display: none !important;
  }
  /* Ensure the print report is visible and fills the page */
  #budget-print-report {
    display: block !important;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100vh;
    background: #fff;
    color: #1a1a1a;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.5;
    padding: 0;
    margin: 0;
  }
  /* ── Professional Print Styles ── */
  #budget-print-report * {
    box-sizing: border-box;
  }
  /* Letterhead */
  .print-letterhead {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 3px solid #2F2E8B;
    padding-bottom: 18px;
    margin-bottom: 24px;
  }
  .print-letterhead-left { flex: 1; }
  .print-letterhead-right { text-align: right; min-width: 220px; }
  .print-report-type {
    font-size: 7pt;
    font-family: 'Courier New', monospace;
    color: #777;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .print-report-title {
    font-size: 22pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -1px;
    color: #111;
  }
  .print-report-meta {
    font-size: 9pt;
    font-family: 'Courier New', monospace;
    color: #555;
    margin-top: 6px;
  }
  .print-company-name {
    font-size: 9pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #2F2E8B;
    margin-bottom: 4px;
  }
  .print-company-detail {
    font-size: 8pt;
    color: #555;
    margin-top: 2px;
  }
  .print-date {
    font-size: 8pt;
    color: #888;
    margin-top: 10px;
    font-family: 'Courier New', monospace;
  }
  .print-status-badge {
    display: inline-block;
    margin-top: 8px;
    padding: 3px 12px;
    font-size: 7pt;
    font-family: 'Courier New', monospace;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
  }
  .print-status-draft { background: #94a3b8; }
  .print-status-pending { background: #f59e0b; }
  .print-status-approved { background: #10b981; }
  .print-status-rejected { background: #ef4444; }

  /* Summary Grid */
  .print-summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  .print-summary-card {
    border: 1px solid #e2e8f0;
    padding: 14px 16px;
    background: #fafbfc;
  }
  .print-summary-label {
    font-size: 7pt;
    font-family: 'Courier New', monospace;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px;
  }
  .print-summary-value {
    font-size: 18pt;
    font-weight: 900;
    color: #2F2E8B;
  }
  .print-summary-value-dark { color: #1a1a1a; }

  /* Table */
  .print-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
    margin-bottom: 24px;
  }
  .print-table thead tr {
    background: #2F2E8B;
    color: #fff;
  }
  .print-table th {
    padding: 9px 10px;
    text-align: left;
    font-family: 'Courier New', monospace;
    font-size: 7pt;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .print-table th:last-child,
  .print-table th:nth-child(5),
  .print-table th:nth-child(4) { text-align: right; }
  .print-table td {
    padding: 8px 10px;
    border-bottom: 1px solid #e5e7eb;
    color: #333;
  }
  .print-row-alt td { background: #f8fafc; }
  .print-td-num {
    font-family: 'Courier New', monospace;
    color: #888;
    text-align: center;
  }
  .print-td-cat { font-weight: 700; text-transform: uppercase; }
  .print-td-amount {
    font-family: 'Courier New', monospace;
    text-align: right;
  }
  .print-td-amount-bold { font-weight: 900; color: #2F2E8B; }

  /* Footer row */
  .print-table tfoot tr {
    border-top: 2px solid #2F2E8B;
  }
  .print-table tfoot td {
    padding: 10px;
    font-weight: 900;
    text-transform: uppercase;
    font-family: 'Courier New', monospace;
    font-size: 9pt;
    letter-spacing: 1px;
    border-bottom: none;
  }
  .print-table tfoot td:last-child {
    font-size: 13pt;
    color: #2F2E8B;
    text-align: right;
  }

  /* Notes Box */
  .print-notes-box {
    border: 1px solid #e2e8f0;
    padding: 14px 16px;
    margin-bottom: 20px;
    background: #fafbfc;
  }
  .print-notes-title {
    font-size: 7pt;
    font-family: 'Courier New', monospace;
    font-weight: 900;
    text-transform: uppercase;
    color: #666;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .print-notes-box p {
    font-size: 9pt;
    color: #444;
    margin: 0;
    line-height: 1.6;
  }

  /* Approval Box */
  .print-approval-box {
    border: 1px solid #e2e8f0;
    padding: 14px 16px;
    margin-bottom: 32px;
    background: #fafbfc;
  }
  .print-approval-row {
    font-size: 9pt;
    padding: 4px 0;
    color: #333;
  }
  .print-approval-role {
    font-weight: 700;
    margin-right: 6px;
    color: #555;
  }
  .print-approval-date {
    color: #999;
    font-size: 8pt;
    margin-left: 8px;
  }
  .print-rejection-reason {
    margin-top: 8px;
    padding: 8px 12px;
    background: #fef2f2;
    border-left: 3px solid #ef4444;
    font-size: 9pt;
    color: #991b1b;
  }

  /* Signatures */
  .print-signatures {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    margin-top: 48px;
    margin-bottom: 48px;
  }
  .print-signature-rule {
    border-top: 1px solid #555;
    margin-bottom: 6px;
  }
  .print-signature-label {
    font-size: 8pt;
    font-family: 'Courier New', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #666;
    text-align: center;
  }

  /* Footer */
  .print-footer {
    border-top: 1px solid #d1d5db;
    padding-top: 12px;
    display: flex;
    justify-content: space-between;
    font-size: 7pt;
    font-family: 'Courier New', monospace;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}
</style>
