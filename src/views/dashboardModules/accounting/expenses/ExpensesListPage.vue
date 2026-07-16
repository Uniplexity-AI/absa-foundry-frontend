<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-gray-50">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <BackButton route="/dashboard/expenses" variant="icon-only" />
          <div class="w-1.5 h-8 bg-blue-600 rounded-none"></div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i class="fas fa-list text-blue-600"></i>
              <span>Accounting // Expenses // Ledger</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Expense Ledger</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <div v-if="branches.length > 0" class="hidden md:block">
            <select v-model="selectedBranch" class="rounded-none border-gray-200 shadow-sm text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3">
              <option :value="null">All Branches</option>
              <option v-for="branch in branches" :key="branch.id" :value="branch">{{ branch.name }}</option>
            </select>
          </div>
          <button @click="refreshData" :disabled="loading" class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider transition-all disabled:opacity-50 border border-blue-200 px-3 py-1.5 hover:bg-blue-50">
            <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }"></i> Sync
          </button>
          <button @click="openAddFromButton" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-none text-[10px] font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i> Add Expense
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative z-10 space-y-6">
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <div class="h-12 w-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin shadow-lg mb-4"></div>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest animate-pulse">Reading Ledger...</p>
      </div>

      <div v-else class="space-y-6">
        <!-- KPI Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm relative overflow-hidden group">
            <div class="flex items-start justify-between mb-2">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Total</span>
              <div class="w-7 h-7 rounded-none bg-blue-50 border border-blue-100 flex items-center justify-center">
                <i class="fas fa-calculator text-blue-600 text-[11px]"></i>
              </div>
            </div>
            <div class="text-lg font-black text-gray-900 tracking-tight font-mono">{{ formatWithSymbol(filteredTotal) }}</div>
            <div class="text-[9px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">{{ activeFilterLabel }}</div>
          </div>
          <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm relative overflow-hidden group">
            <div class="flex items-start justify-between mb-2">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Records</span>
              <div class="w-7 h-7 rounded-none bg-green-50 border border-green-100 flex items-center justify-center">
                <i class="fas fa-list-ol text-green-600 text-[11px]"></i>
              </div>
            </div>
            <div class="text-lg font-black text-gray-900 tracking-tight font-mono">{{ filteredCount }}</div>
            <div class="text-[9px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Entries Found</div>
          </div>
          <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm relative overflow-hidden group">
            <div class="flex items-start justify-between mb-2">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Average</span>
              <div class="w-7 h-7 rounded-none bg-amber-50 border border-amber-100 flex items-center justify-center">
                <i class="fas fa-chart-line text-amber-600 text-[11px]"></i>
              </div>
            </div>
            <div class="text-lg font-black text-gray-900 tracking-tight font-mono">{{ formatWithSymbol(filteredAverage) }}</div>
            <div class="text-[9px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">Per Entry</div>
          </div>
          <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm relative overflow-hidden group">
            <div class="flex items-start justify-between mb-2">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Largest</span>
              <div class="w-7 h-7 rounded-none bg-purple-50 border border-purple-100 flex items-center justify-center">
                <i class="fas fa-arrow-up-wide-short text-purple-600 text-[11px]"></i>
              </div>
            </div>
            <div class="text-lg font-black text-gray-900 tracking-tight font-mono">{{ filteredMaxEntry ? formatWithSymbol(filteredMaxEntry.amount) : 'K 0.00' }}</div>
            <div class="text-[9px] font-mono text-gray-400 uppercase tracking-wider mt-0.5">{{ filteredMaxEntry ? (filteredMaxEntry.name || '—') : 'No Data' }}</div>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="bg-white border border-gray-100 p-4 rounded-none shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button
                @click="viewMode = 'normal'"
                class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider border transition-colors"
                :class="viewMode === 'normal' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'"
              >
                <i class="fas fa-list mr-1"></i> Normal
              </button>
              <button
                @click="viewMode = 'excel'"
                class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider border transition-colors"
                :class="viewMode === 'excel' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'"
              >
                <i class="fas fa-table mr-1"></i> Excel
              </button>
              <button
                @click="showBatchModal = true"
                class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider border border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <i class="fas fa-layer-group mr-1"></i> Batch Add
              </button>
              <button
                @click="exportToCSV"
                class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider border border-gray-200 bg-white text-gray-500 hover:border-green-300 hover:text-green-600 transition-colors"
              >
                <i class="fas fa-file-csv mr-1"></i> Export CSV
              </button>
            </div>
            <div v-if="viewMode === 'excel' && dirtyRows.size > 0" class="flex items-center gap-2">
              <span class="text-[8px] font-mono font-bold text-amber-600 uppercase">{{ dirtyRows.size }} row(s) edited</span>
              <button @click="discardAllEdits" class="px-3 py-1.5 text-[9px] font-mono font-bold uppercase border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors bg-white">
                <i class="fas fa-undo mr-1"></i> Discard All
              </button>
              <button @click="saveAllInlineEdits" :disabled="savingInline" class="px-4 py-1.5 text-[9px] font-mono font-bold uppercase bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
                <i class="fas fa-save mr-1" :class="{'fa-spinner fa-spin': savingInline}"></i>
                {{ savingInline ? 'Saving...' : 'Save All' }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="md:col-span-2">
              <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Search Item</label>
              <input v-model="searchQuery" type="text" placeholder="Search by name or description..." class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            </div>
            <div>
              <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Category</label>
              <select v-model="categoryFilter" class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">All Categories</option>
                <optgroup v-for="group in categoryGroups" :key="group.code" :label="group.label">
                  <option v-for="sub in group.children" :key="sub.code" :value="sub.label">{{ sub.code }} — {{ sub.label }}</option>
                </optgroup>
                <!-- Also show categories from data that may not match the chart of accounts -->
                <optgroup v-if="legacyCategories.length" label="Other / Legacy">
                  <option v-for="cat in legacyCategories" :key="cat" :value="cat">{{ cat }}</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 block">Time Frame</label>
              <select v-model="timeFrame" class="w-full rounded-none border border-gray-200 px-4 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        <BulkActionsBar :count="selectionCount" @clear="clearSelection" @delete="bulkDelete" :deleting="bulkDeleting" />

        <!-- Excel Mode Banner -->
        <div v-if="viewMode === 'excel' && dirtyRows.size > 0" class="bg-amber-50 border border-amber-200 px-4 py-2 flex items-center justify-between rounded-none">
          <div class="flex items-center gap-2 text-[10px] font-mono text-amber-700">
            <i class="fas fa-pen"></i>
            <span><strong>{{ dirtyRows.size }}</strong> row(s) have unsaved changes. Click <strong>Save All</strong> to persist.</span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="discardAllEdits" class="px-3 py-1 text-[9px] font-mono font-bold uppercase border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors bg-white">
              Discard
            </button>
            <button @click="saveAllInlineEdits" :disabled="savingInline" class="px-4 py-1 text-[9px] font-mono font-bold uppercase bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50">
              <i class="fas fa-save mr-1" :class="{'fa-spinner fa-spin': savingInline}"></i>
              {{ savingInline ? 'Saving...' : 'Save All Changes' }}
            </button>
          </div>
        </div>

        <!-- Ledger Table -->
        <div class="bg-white border border-gray-100 rounded-none shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-100">
                  <th class="py-3 px-3 text-center w-10">
                    <SelectAllCheckbox :model-value="isAllPageSelected" @update:model-value="toggleSelectAll" />
                  </th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Expense Item</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Category</th>
                  <th class="py-3 px-4 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Description</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th class="py-3 px-4 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="e in paginatedExpenses" :key="e.id || e._id" class="hover:bg-gray-50/50 transition-colors group" :class="{ 'bg-blue-50/40': isSelected(e), 'bg-amber-50/40': viewMode === 'excel' && dirtyRows.has(e.id || e._id) }">
                  <td class="py-3 px-3 text-center">
                    <input type="checkbox" :checked="isSelected(e)" @change="toggleSelect(e, undefined, $event)" class="rounded-sm border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  </td>
                  <td v-if="viewMode === 'excel'" class="py-2 px-4">
                    <input
                      type="date"
                      :value="getEditValue(e, 'expense_date')"
                      @input="setEditValue(e, 'expense_date', $event.target.value)"
                      class="w-full border border-gray-200 px-2 py-1 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white rounded-none uppercase"
                    />
                  </td>
                  <td v-else class="py-3 px-4 text-[10px] font-mono text-gray-500 uppercase">{{ formatDate(e.expense_date) }}</td>

                  <td v-if="viewMode === 'excel'" class="py-2 px-4">
                    <input
                      type="text"
                      :value="getEditValue(e, 'name')"
                      @input="setEditValue(e, 'name', $event.target.value)"
                      class="w-full border border-gray-200 px-2 py-1 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white rounded-none uppercase"
                    />
                  </td>
                  <td v-else class="py-3 px-4 text-[10px] font-mono font-bold text-gray-900 uppercase tracking-tight">{{ e.name }}</td>

                  <td v-if="viewMode === 'excel'" class="py-2 px-4">
                    <input
                      type="text"
                      :value="getEditValue(e, 'category')"
                      @input="setEditValue(e, 'category', $event.target.value)"
                      class="w-full border border-gray-200 px-2 py-1 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white rounded-none uppercase"
                    />
                  </td>
                  <td v-else class="py-3 px-4">
                    <span class="text-[8px] font-mono font-black px-2 py-0.5 border border-blue-100 bg-blue-50 text-blue-600 uppercase">{{ e.category }}</span>
                  </td>

                  <td v-if="viewMode === 'excel'" class="py-2 px-4">
                    <input
                      type="text"
                      :value="getEditValue(e, 'description')"
                      @input="setEditValue(e, 'description', $event.target.value)"
                      class="w-full border border-gray-200 px-2 py-1 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white rounded-none"
                      placeholder="—"
                    />
                  </td>
                  <td v-else class="py-3 px-4 text-[10px] font-mono text-gray-400 max-w-[200px] truncate italic">{{ e.description || '—' }}</td>

                  <td v-if="viewMode === 'excel'" class="py-2 px-4">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      :value="getEditValue(e, 'amount')"
                      @input="setEditValue(e, 'amount', $event.target.value)"
                      class="w-full border border-gray-200 px-2 py-1 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white rounded-none text-right"
                    />
                  </td>
                  <td v-else class="py-3 px-4 text-right text-[11px] font-mono font-black text-gray-900">{{ formatWithSymbol(e.amount) }}</td>

                  <td class="py-3 px-4 text-right">
                    <div class="flex items-center justify-end gap-1">
                      <!-- Attachment indicator + preview -->
                      <button @click="openPreview(e)" class="p-1.5 flex items-center gap-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50" title="View Attachments">
                        <i class="fas fa-paperclip text-xs"></i>
                        <span v-if="e.attachments && e.attachments.length" class="text-[8px] font-mono font-black text-blue-600">{{ e.attachments.length }}</span>
                      </button>
                      <button @click="editExpense(e)" class="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50" title="Edit"><i class="fas fa-edit text-xs"></i></button>
                      <button @click="deleteEntry(e)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50" title="Delete"><i class="fas fa-trash text-xs"></i></button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredExpenses.length === 0">
                  <td colspan="7" class="py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">NO_RECORDS_MATCH_SEARCH</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div v-if="filteredExpenses.length > 0" class="px-4 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50/30">
            <div class="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredExpenses.length) }} of {{ filteredExpenses.length }}</div>
            <div class="flex gap-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-white transition-colors">Prev</button>
              <span class="px-3 py-1 text-[9px] font-mono font-bold text-[#2F2E8B]">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-3 py-1 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-white transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Expense Modal -->
    <div v-if="showExpenseModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="closeExpenseModal"></div>
      <div class="bg-white w-full max-w-xl shadow-2xl relative z-10 border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
            <span class="w-2 h-2" :class="modalMode === 'edit' ? 'bg-amber-500' : 'bg-blue-600'"></span>
            <span>{{ modalMode === 'edit' ? 'EDIT_EXPENSE_ENTRY' : 'NEW_EXPENSE_ENTRY' }}</span>
          </h3>
          <button @click="closeExpenseModal" class="text-gray-400 hover:text-red-500 transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Expense Name</label>
            <input v-model="expenseForm.name" type="text" class="w-full bg-gray-50 border border-gray-200 text-[11px] font-mono focus:border-blue-600 focus:ring-0 placeholder:text-gray-300" placeholder="e.g. Fuel" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Amount</label>
              <div class="relative">
                <span class="absolute left-3 top-2.5 text-xs text-gray-400 font-mono">{{ currencySymbol?.value || currencySymbol || 'K' }}</span>
                <input v-model.number="expenseForm.amount" type="number" min="0" class="w-full bg-gray-50 border border-gray-200 pl-8 text-[11px] font-mono focus:border-blue-600 focus:ring-0" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
              <input v-model="expenseForm.expense_date" type="date" class="w-full bg-gray-50 border border-gray-200 text-[10px] font-mono focus:border-blue-600 focus:ring-0 text-gray-600 uppercase" />
            </div>
          </div>

          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
            <select v-model="expenseForm.category" class="w-full bg-gray-50 border border-gray-200 text-[10px] font-mono focus:border-blue-600 focus:ring-0 text-gray-600 uppercase py-2">
              <option value="" disabled>SELECT_CATEGORY</option>
              <optgroup v-for="group in categoryGroups" :key="group.code" :label="group.label">
                <option v-for="sub in group.children" :key="sub.code" :value="sub.label">{{ sub.code }} — {{ sub.label }}</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Description</label>
            <textarea v-model="expenseForm.description" rows="3" class="w-full bg-gray-50 border border-gray-200 text-[11px] font-mono focus:border-blue-600 focus:ring-0" placeholder="Optional notes..."></textarea>
          </div>

          <!-- Proof of Payment Attachment -->
          <div>
            <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-1">Proof of Payment (PDF / Image)</label>
            <div
              class="border-2 border-dashed border-gray-200 rounded p-4 text-center cursor-pointer hover:border-blue-400 transition-colors"
              @click="$refs.attachInput.click()"
              @dragover.prevent
              @drop.prevent="onAttachDrop"
            >
              <i class="fas fa-paperclip text-gray-300 text-xl mb-1"></i>
              <p class="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Drop files here or click to browse</p>
              <p class="text-[8px] font-mono text-gray-300 mt-1">PDF, JPG, PNG · max 5 MB each</p>
            </div>
            <input ref="attachInput" type="file" accept="application/pdf,image/*" multiple class="hidden" @change="onAttachSelect" />
            <!-- Staged files -->
            <div v-if="stagedFiles.length" class="mt-2 space-y-1">
              <div v-for="(f, i) in stagedFiles" :key="i" class="flex items-center justify-between px-3 py-1.5 bg-gray-50 border border-gray-100 text-[9px] font-mono">
                <span class="flex items-center gap-2 text-gray-700">
                  <i :class="f.type === 'application/pdf' ? 'fas fa-file-pdf text-red-500' : 'fas fa-image text-blue-500'"></i>
                  {{ f.name }}
                </span>
                <button @click.stop="stagedFiles.splice(i,1)" class="text-gray-300 hover:text-red-500"><i class="fas fa-times text-xs"></i></button>
              </div>
            </div>
            <!-- Already-saved attachments when editing -->
            <div v-if="modalMode === 'edit' && expenseForm.attachments && expenseForm.attachments.length" class="mt-2">
              <p class="text-[8px] font-mono text-gray-400 uppercase mb-1">Existing attachments</p>
              <div v-for="(a, i) in expenseForm.attachments" :key="i" class="flex items-center justify-between px-3 py-1.5 bg-blue-50 border border-blue-100 text-[9px] font-mono">
                <span class="flex items-center gap-2 text-blue-700 cursor-pointer hover:underline" @click="previewSingleAttachment(a)">
                  <i :class="a.type === 'application/pdf' ? 'fas fa-file-pdf text-red-500' : 'fas fa-image text-blue-500'"></i>
                  {{ a.name }}
                </span>
                <button @click.stop="deleteAttachment(expenseForm.id, i)" class="text-gray-300 hover:text-red-500"><i class="fas fa-times text-xs"></i></button>
              </div>
            </div>
          </div>

        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button @click="closeExpenseModal" class="px-4 py-2 text-[10px] font-mono font-bold text-gray-500 uppercase hover:bg-gray-200 transition-colors">Cancel</button>
          <button @click="submitExpense" :disabled="savingExpense" class="px-6 py-2 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-700 transition-colors disabled:opacity-50">
            {{ savingExpense ? 'SAVING...' : (modalMode === 'edit' ? 'UPDATE_ENTRY' : 'CONFIRM_ENTRY') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Attachment Preview Modal -->
    <div v-if="previewExpense" class="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="previewExpense = null"></div>
      <div class="bg-white w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative z-10 border border-gray-100">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Proof of Payment</div>
            <div class="text-sm font-mono font-black text-gray-900 uppercase mt-0.5">{{ previewExpense.name }}</div>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-[10px] font-mono font-black text-blue-600">{{ formatWithSymbol(previewExpense.amount) }}</span>
            <button @click="previewExpense = null" class="text-gray-400 hover:text-red-500"><i class="fas fa-times"></i></button>
          </div>
        </div>

        <!-- Attachment list or loading -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="previewLoading" class="flex items-center justify-center py-16">
            <i class="fas fa-spinner fa-spin text-blue-500 text-2xl"></i>
          </div>
          <div v-else-if="!previewAttachments.length" class="flex flex-col items-center justify-center py-16 text-gray-300">
            <i class="fas fa-paperclip text-4xl mb-3"></i>
            <p class="text-[10px] font-mono uppercase tracking-widest">No attachments yet</p>
            <button @click="openEditFromPreview" class="mt-4 px-4 py-2 border border-blue-200 text-[9px] font-mono font-bold text-blue-600 uppercase hover:bg-blue-50 transition-colors">
              <i class="fas fa-plus-circle mr-1"></i> Add Attachment
            </button>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(att, i) in previewAttachments" :key="i" class="border border-gray-100 rounded overflow-hidden">
              <!-- PDF -->
              <div v-if="att.type === 'application/pdf'">
                <div class="flex items-center justify-between px-4 py-2 bg-red-50 border-b border-red-100">
                  <span class="text-[9px] font-mono font-bold text-red-600 flex items-center gap-2"><i class="fas fa-file-pdf"></i> {{ att.name }}</span>
                  <div class="flex gap-2">
                    <a :href="att.data" :download="att.name" class="text-[8px] font-mono text-gray-500 hover:text-blue-600 px-2 py-1 border border-gray-200 hover:border-blue-300">
                      <i class="fas fa-download mr-1"></i>Download
                    </a>
                    <button @click="deleteAttachment(previewExpense.id || previewExpense._id, i, true)" class="text-[8px] font-mono text-gray-300 hover:text-red-500 px-2 py-1 border border-gray-200 hover:border-red-300">
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
                    <a :href="att.data" :download="att.name" class="text-[8px] font-mono text-gray-500 hover:text-blue-600 px-2 py-1 border border-gray-200 hover:border-blue-300">
                      <i class="fas fa-download mr-1"></i>Download
                    </a>
                    <button @click="deleteAttachment(previewExpense.id || previewExpense._id, i, true)" class="text-[8px] font-mono text-gray-300 hover:text-red-500 px-2 py-1 border border-gray-200 hover:border-red-300">
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
          <span class="text-[9px] font-mono text-gray-400 uppercase">{{ previewAttachments.length }} attachment{{ previewAttachments.length !== 1 ? 's' : '' }}</span>
          <button @click="openEditFromPreview" class="px-4 py-2 text-[9px] font-mono font-bold text-white bg-[#2F2E8B] hover:bg-blue-800 uppercase">
            <i class="fas fa-plus-circle mr-1"></i> Add More
          </button>
        </div>
      </div>
    </div>

   <!-- Batch Add Modal -->
    <div v-if="showBatchModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" @click="closeBatchModal"></div>
      <div class="bg-white w-full max-w-3xl shadow-2xl relative z-10 border border-gray-100 max-h-[90vh] flex flex-col">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
            <span class="w-2 h-2 bg-blue-600"></span>
            <span>Batch Add Expenses</span>
          </h3>
          <div class="flex items-center gap-3">
            <span class="text-[9px] font-mono text-gray-400">{{ batchValidCount }} / {{ batchRows.length }} valid</span>
            <button @click="closeBatchModal" class="text-gray-400 hover:text-red-500 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div class="flex items-center gap-4 pb-2 border-b border-gray-100">
            <label class="flex items-center gap-2 text-[10px] font-mono text-gray-600 cursor-pointer">
              <input type="checkbox" v-model="batchSameDate" class="rounded-sm text-blue-600 focus:ring-blue-500" />
              Same Date
            </label>
            <label class="flex items-center gap-2 text-[10px] font-mono text-gray-600 cursor-pointer">
              <input type="checkbox" v-model="batchSameCategory" class="rounded-sm text-blue-600 focus:ring-blue-500" />
              Same Category
            </label>
            <button @click="addBatchRow" class="ml-auto px-3 py-1.5 text-[9px] font-mono font-bold uppercase border border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors">
              <i class="fas fa-plus mr-1"></i> Add Row
            </button>
          </div>

          <div v-for="(row, i) in batchRows" :key="i" class="border border-gray-100 p-3 bg-gray-50/30 relative group">
            <button
              @click="removeBatchRow(i)"
              v-if="batchRows.length > 1"
              class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white flex items-center justify-center text-[8px] hover:bg-red-600 transition-colors rounded-none opacity-0 group-hover:opacity-100"
            >
              <i class="fas fa-times"></i>
            </button>
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div class="sm:col-span-2">
                <label class="text-[7px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-0.5">Name</label>
                <input v-model="row.name" type="text" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none bg-white" placeholder="e.g. Fuel" />
              </div>
              <div>
                <label class="text-[7px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-0.5">Amount</label>
                <input v-model.number="row.amount" type="number" min="0" step="0.01" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none bg-white" placeholder="0.00" />
              </div>
              <div>
                <label class="text-[7px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-0.5">Category</label>
                <input v-model="row.category" type="text" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none bg-white" placeholder="e.g. UTILITIES" />
              </div>
              <div>
                <label class="text-[7px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-0.5">Date</label>
                <input v-model="row.expense_date" type="date" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none bg-white uppercase" />
              </div>
            </div>
            <div class="mt-2">
              <label class="text-[7px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-0.5">Description</label>
              <input v-model="row.description" type="text" class="w-full border border-gray-200 px-2 py-1.5 text-[10px] font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-none bg-white" placeholder="Optional notes..." />
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <span class="text-[9px] font-mono text-gray-400">{{ batchRows.length }} row(s) · {{ batchValidCount }} valid</span>
          <div class="flex gap-3">
            <button @click="closeBatchModal" class="px-4 py-2 text-[10px] font-mono font-bold text-gray-500 uppercase hover:bg-gray-200 transition-colors">Cancel</button>
            <button @click="submitBatch" :disabled="batchSubmitting || batchValidCount === 0" class="px-6 py-2 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-700 transition-colors disabled:opacity-50">
              <i class="fas fa-save mr-1" :class="{'fa-spinner fa-spin': batchSubmitting}"></i>
              {{ batchSubmitting ? 'Submitting...' : `Submit ${batchValidCount} Entry(ies)` }}
            </button>
          </div>
        </div>
      </div>
    </div>

   <!-- closing tag -->
    </div>
</template>

<script setup>
import { BackButton, BulkActionsBar, SelectAllCheckbox } from '@/components/ui'
import { useBulkSelect } from '@/composables/useBulkSelect'
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import { useCurrency } from '@/composables/useCurrency.js';
import { useActivityTracker } from '@/config/useActivityTracker.js';
import { useAudit } from '@/config/useAudit.js';
import { useExpenses } from '@/views/dashboardModules/functions/useExpenses.js';

const router = useRouter();
const route = useRoute();
const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getToken, getUserRole, getUserEmail } = decodeJWT();
const { formatCurrency, currencySymbol } = useCurrency();
const { categoryGroups } = useExpenses();
const { logAudit } = useAudit();
useActivityTracker({ userId: getUserEmail(), tenantId: getTenantId(), module: 'expenses-list' });

const loading = ref(false);
const expenses = ref([]);
const branches = ref([]);
const selectedBranch = ref(null);

// Filters
const searchQuery = ref('');
const categoryFilter = ref('');
const timeFrame = ref(route.query.time || 'all');
const customStartDate = ref('');
const customEndDate = ref('');

// Add/Edit modal state
const showExpenseModal = ref(false);
const modalMode = ref('add'); // 'add' | 'edit'
const savingExpense = ref(false);
const expenseForm = ref({
  id: null,
  name: '',
  amount: 0,
  category: '',
  description: '',
  expense_date: new Date().toISOString().split('T')[0],
  attachments: []
});

// Attachment state
const stagedFiles = ref([]); // File objects waiting to be uploaded
const attachInput = ref(null);

// Preview modal state
const previewExpense = ref(null);
const previewAttachments = ref([]);
const previewLoading = ref(false);

const onAttachSelect = (evt) => {
  const newFiles = Array.from(evt.target.files || []);
  stagedFiles.value.push(...newFiles);
  evt.target.value = '';
};

const onAttachDrop = (evt) => {
  const newFiles = Array.from(evt.dataTransfer.files || []);
  stagedFiles.value.push(...newFiles.filter(f =>
    f.type === 'application/pdf' || f.type.startsWith('image/')
  ));
};

const openPreview = async (expense) => {
  previewExpense.value = expense;
  previewAttachments.value = [];
  previewLoading.value = true;
  try {
    const res = await fetch(
      `${API_BASE_URL}/expenses/${expense.id || expense._id}/attachments?tenant_id=${getTenantId()}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (res.ok) {
      const data = await res.json();
      previewAttachments.value = data.attachments || [];
    }
  } catch (e) { console.error(e); }
  finally { previewLoading.value = false; }
};

const previewSingleAttachment = (att) => {
  // Open in new tab
  const w = window.open();
  if (att.type === 'application/pdf') {
    w.document.write(`<iframe src="${att.data}" style="width:100%;height:100vh;border:none"></iframe>`);
  } else {
    w.document.write(`<img src="${att.data}" style="max-width:100%;margin:auto;display:block" />`);
  }
};

const openEditFromPreview = () => {
  const e = previewExpense.value;
  previewExpense.value = null;
  if (e) editExpense(e);
};

const deleteAttachment = async (expenseId, index, fromPreview = false) => {
  if (!confirm('Remove this attachment?')) return;
  try {
    const res = await fetch(
      `${API_BASE_URL}/expenses/${expenseId}/attachments/${index}?tenant_id=${getTenantId()}`,
      { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (res.ok) {
      await logAudit('delete', 'expenses', { resource_type: 'attachment', expense_id: expenseId, attachment_index: index });
      if (fromPreview) {
        previewAttachments.value.splice(index, 1);
        const exp = expenses.value.find(e => (e.id || e._id) === expenseId);
        if (exp && exp.attachments) exp.attachments.splice(index, 1);
      } else if (expenseForm.value.attachments) {
        expenseForm.value.attachments.splice(index, 1);
      }
    }
  } catch (e) { console.error(e); }
};

const uploadStagedFiles = async (expenseId) => {
  if (!stagedFiles.value.length) return;
  const fd = new FormData();
  stagedFiles.value.forEach(f => fd.append('files', f));
  try {
    const res = await fetch(
      `${API_BASE_URL}/expenses/${expenseId}/attachments?tenant_id=${getTenantId()}`,
      { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('Attachment upload failed:', err.detail || res.status);
    }
  } catch (e) { console.error('Attachment upload error:', e); }
  stagedFiles.value = [];
};

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(25);

const bulkDeleting = ref(false);

// Only pull what isn't re-implemented locally below. `isAllPageSelected`,
// `toggleSelect`, `toggleSelectAll`, and `clearSelection` are page-aware
// re-implementations that operate on `paginatedExpenses` (defined further
// down) — destructuring them here too previously caused
// "Identifier has already been declared" compile errors.
const { selectedIds, selectionCount, isSelected } = useBulkSelect();

// View mode: 'normal' | 'excel'
const viewMode = ref('normal');

// Excel inline editing state
const dirtyRows = ref(new Set());
const editedValues = ref(new Map()); // Map<rowId, {field: value}>
const savingInline = ref(false);

// Batch add state
const showBatchModal = ref(false);
const batchRows = ref([]);
const batchSameDate = ref(true);
const batchSameCategory = ref(false);
const batchSubmitting = ref(false);

const isAllPageSelected = computed(() => {
  if (paginatedExpenses.value.length === 0) return false;
  return paginatedExpenses.value.every(e => selectedIds.value.has(e.id || e._id));
});

const toggleSelect = (e) => {
  const id = e.id || e._id;
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
};

const toggleSelectAll = () => {
  const next = new Set(selectedIds.value);
  if (isAllPageSelected.value) {
    paginatedExpenses.value.forEach(e => next.delete(e.id || e._id));
  } else {
    paginatedExpenses.value.forEach(e => next.add(e.id || e._id));
  }
  selectedIds.value = next;
};

const clearSelection = () => { selectedIds.value = new Set(); };

const bulkDelete = async () => {
  const count = selectedIds.value.size;
  if (!count) return;
  if (!confirm(`Are you sure you want to delete ${count} expense(s)? This action cannot be undone.`)) return;

  bulkDeleting.value = true;
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/bulk-delete?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expense_ids: [...selectedIds.value] })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.detail || 'Bulk delete failed');
    }
    const result = await response.json();
    // Remove deleted entries from local state
    expenses.value = expenses.value.filter(e => !selectedIds.value.has(e.id || e._id));
    clearSelection();
    alert(result.message || `${count} expense(s) deleted.`);
  } catch (err) {
    console.error(err);
    alert(err?.message || 'Bulk delete failed');
  } finally {
    bulkDeleting.value = false;
  }
};

// ═══════════════════════════════════════════════════════════
//  EXCEL MODE — INLINE EDITING
// ═══════════════════════════════════════════════════════════

const getEditValue = (expense, field) => {
  const id = expense.id || expense._id;
  const edits = editedValues.value.get(id);
  if (edits && edits[field] !== undefined) return edits[field];
  // For expense_date, return just the date part
  if (field === 'expense_date') return (expense[field] || '').slice(0, 10);
  if (field === 'description') return expense[field] || '';
  if (field === 'amount') return expense[field] || 0;
  return expense[field] || '';
};

const setEditValue = (expense, field, value) => {
  const id = expense.id || expense._id;
  const edits = editedValues.value.get(id) || {};

  // Check if value matches original
  let original = expense[field];
  if (field === 'expense_date') original = (original || '').slice(0, 10);
  if (field === 'amount') original = Number(original) || 0;
  if (field === 'description') original = original || '';

  if (String(value) === String(original)) {
    delete edits[field];
    if (Object.keys(edits).length === 0) {
      editedValues.value.delete(id);
      const next = new Set(dirtyRows.value);
      next.delete(id);
      dirtyRows.value = next;
      return;
    }
  }

  edits[field] = value;
  editedValues.value.set(id, edits);

  const next = new Set(dirtyRows.value);
  next.add(id);
  dirtyRows.value = next;
};

const discardRowEdits = (expense) => {
  const id = expense.id || expense._id;
  editedValues.value.delete(id);
  const next = new Set(dirtyRows.value);
  next.delete(id);
  dirtyRows.value = next;
};

const discardAllEdits = () => {
  editedValues.value = new Map();
  dirtyRows.value = new Set();
};

const saveAllInlineEdits = async () => {
  if (dirtyRows.value.size === 0) return;
  savingInline.value = true;

  const updates = [];
  for (const rowId of dirtyRows.value) {
    const edits = editedValues.value.get(rowId) || {};
    const original = expenses.value.find(e => (e.id || e._id) === rowId);
    if (!original) continue;
    updates.push({
      id: rowId,
      name: edits.name !== undefined ? edits.name : original.name,
      amount: edits.amount !== undefined ? Number(edits.amount) : Number(original.amount),
      category: edits.category !== undefined ? edits.category : original.category,
      description: edits.description !== undefined ? edits.description : (original.description || ''),
      expense_date: edits.expense_date !== undefined ? edits.expense_date : (original.expense_date || '').slice(0, 10),
    });
  }

  let saved = 0;
  let failed = 0;

  for (const u of updates) {
    try {
      const url = new URL(`${API_BASE_URL}/expenses/${u.id}`);
      url.searchParams.append('tenant_id', getTenantId());
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: u.name,
          amount: u.amount,
          category: u.category,
          description: u.description,
          expense_date: u.expense_date,
        })
      });
      if (response.ok) {
        saved++;
        // Update local state
        const idx = expenses.value.findIndex(e => (e.id || e._id) === u.id);
        if (idx >= 0) {
          expenses.value[idx] = { ...expenses.value[idx], ...u };
        }
      } else {
        failed++;
      }
    } catch (e) {
      failed++;
      console.error(`Failed to save row ${u.id}:`, e);
    }
  }

  savingInline.value = false;
  discardAllEdits();

  if (failed === 0) {
    alert(`✅ ${saved} expense(s) updated successfully.`);
  } else {
    alert(`⚠️ ${saved} saved, ${failed} failed.`);
  }
};

const exportToCSV = () => {
  const rows = filteredExpenses.value.map(e => ({
    Date: (e.expense_date || '').slice(0, 10),
    Name: e.name || '',
    Category: e.category || '',
    Description: e.description || '',
    Amount: e.amount || 0,
  }));

  const headers = ['Date', 'Name', 'Category', 'Description', 'Amount'];
  let csv = headers.join(',') + '\n';
  for (const r of rows) {
    csv += [
      r.Date,
      `"${(r.Name || '').replace(/"/g, '""')}"`,
      `"${(r.Category || '').replace(/"/g, '""')}"`,
      `"${(r.Description || '').replace(/"/g, '""')}"`,
      r.Amount,
    ].join(',') + '\n';
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses_export_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ═══════════════════════════════════════════════════════════
//  BATCH ADD EXPENSES
// ═══════════════════════════════════════════════════════════

const createEmptyBatchRow = () => ({
  name: '',
  amount: 0,
  category: '',
  description: '',
  expense_date: new Date().toISOString().split('T')[0],
});

const initBatchRows = () => {
  batchRows.value = [createEmptyBatchRow()];
  batchSameDate.value = true;
  batchSameCategory.value = false;
};

const addBatchRow = () => {
  const row = createEmptyBatchRow();
  // Inherit date and category if "same" toggles are on
  if (batchSameDate.value && batchRows.value.length > 0) {
    row.expense_date = batchRows.value[0].expense_date;
  }
  if (batchSameCategory.value && batchRows.value.length > 0) {
    row.category = batchRows.value[0].category;
  }
  batchRows.value.push(row);
};

const removeBatchRow = (i) => {
  if (batchRows.value.length <= 1) return;
  batchRows.value.splice(i, 1);
};

const closeBatchModal = () => {
  showBatchModal.value = false;
  initBatchRows();
};

// Sync date across all rows when batchSameDate is toggled
watch(batchSameDate, (on) => {
  if (on && batchRows.value.length > 0) {
    const date = batchRows.value[0].expense_date;
    batchRows.value.forEach(r => { r.expense_date = date; });
  }
});

// Sync category across all rows when batchSameCategory is toggled
watch(batchSameCategory, (on) => {
  if (on && batchRows.value.length > 0) {
    const cat = batchRows.value[0].category;
    batchRows.value.forEach(r => { r.category = cat; });
  }
});

const batchValidCount = computed(() =>
  batchRows.value.filter(r => (r.name || '').trim() && (r.category || '').trim() && Number(r.amount) > 0).length
);

const submitBatch = async () => {
  const valid = batchRows.value.filter(r => (r.name || '').trim() && (r.category || '').trim() && Number(r.amount) > 0);
  if (!valid.length) {
    alert('Please fill in name, category, and amount > 0 for at least one row.');
    return;
  }

  batchSubmitting.value = true;
  const selectedBranchId = selectedBranch.value?.id || selectedBranch.value?._id || '';
  let saved = 0;
  let failed = 0;

  for (const row of valid) {
    try {
      const payload = {
        name: (row.name || '').trim(),
        amount: Number(row.amount) || 0,
        category: (row.category || '').trim(),
        description: (row.description || '').trim(),
        expense_date: row.expense_date || new Date().toISOString().split('T')[0],
        ...(selectedBranchId ? { branch_id: selectedBranchId } : {}),
      };

      const url = new URL(`${API_BASE_URL}/expenses/`);
      url.searchParams.append('tenant_id', getTenantId());
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        saved++;
      } else {
        failed++;
      }
    } catch (e) {
      failed++;
      console.error('Batch row failed:', e);
    }
  }

  batchSubmitting.value = false;
  await fetchData();
  closeBatchModal();

  if (failed === 0) {
    alert(`✅ ${saved} expense(s) created successfully.`);
  } else {
    alert(`⚠️ ${saved} saved, ${failed} failed.`);
  }
};

const categories = computed(() => [...new Set(expenses.value.map(e => e.category))].filter(Boolean));

// Categories from existing data that don't match the new chart of accounts
const knownCategories = computed(() => categoryGroups.value.flatMap(g => g.children.map(c => c.label)));
const legacyCategories = computed(() => categories.value.filter(c => !knownCategories.value.includes(c)));

const filteredExpenses = computed(() => {
  let res = [...expenses.value];

  if (categoryFilter.value) res = res.filter(e => e.category === categoryFilter.value);
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    res = res.filter(e => (e.name || '').toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q));
  }

  if (timeFrame.value === 'custom') {
    if (customStartDate.value) {
      const start = new Date(customStartDate.value);
      start.setHours(0, 0, 0, 0);
      res = res.filter(e => new Date(e.expense_date) >= start);
    }
    if (customEndDate.value) {
      const end = new Date(customEndDate.value);
      end.setHours(23, 59, 59, 999);
      res = res.filter(e => new Date(e.expense_date) <= end);
    }
  } else if (timeFrame.value !== 'all') {
    const now = new Date();
    res = res.filter(e => {
      const d = new Date(e.expense_date);
      if (timeFrame.value === 'today') return d.toDateString() === now.toDateString();
      if (timeFrame.value === 'week') return d >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (timeFrame.value === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      if (timeFrame.value === 'year') return d.getFullYear() === now.getFullYear();
      return true;
    });
  }

  res.sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date));
  return res;
});

const totalPages = computed(() => Math.ceil(filteredExpenses.value.length / itemsPerPage.value) || 1);
const paginatedExpenses = computed(() => filteredExpenses.value.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value));

// KPI computed properties — react to all active filters
const filteredTotal = computed(() => filteredExpenses.value.reduce((sum, e) => sum + (Number(e.amount) || 0), 0));
const filteredCount = computed(() => filteredExpenses.value.length);
const filteredAverage = computed(() => filteredCount.value > 0 ? filteredTotal.value / filteredCount.value : 0);
const filteredMax = computed(() => filteredExpenses.value.reduce((max, e) => Math.max(max, Number(e.amount) || 0), 0));
const filteredMaxEntry = computed(() => filteredExpenses.value.reduce((best, e) => (!best || (Number(e.amount) || 0) > (Number(best.amount) || 0)) ? e : best, null));

const activeFilterLabel = computed(() => {
  const parts = [];
  if (timeFrame.value === 'custom') {
    if (customStartDate.value && customEndDate.value) parts.push(`${customStartDate.value} → ${customEndDate.value}`);
    else if (customStartDate.value) parts.push(`From ${customStartDate.value}`);
    else if (customEndDate.value) parts.push(`Until ${customEndDate.value}`);
    else parts.push('Custom Range');
  } else if (timeFrame.value !== 'all') {
    const labels = { today: 'Today', week: 'This Week', month: 'This Month', year: 'This Year' };
    parts.push(labels[timeFrame.value] || timeFrame.value);
  } else {
    parts.push('All Time');
  }
  if (categoryFilter.value) parts.push(categoryFilter.value);
  if (searchQuery.value) parts.push(`"${searchQuery.value}"`);
  return parts.join(' · ');
});

const formatNumber = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try {
    if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n);
  } catch (e) { /* fallback */ }
  const sym = currencySymbol?.value || currencySymbol || 'K';
  return `${sym}${formatNumber(n)}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-ZM', { day: '2-digit', month: 'short', year: '2-digit' }).toUpperCase();
};

const openAddFromButton = () => router.push({ name: 'ExpensesList', query: { ...route.query, action: 'add' } });

const editExpense = (e) => {
  const id = e?.id || e?._id;
  if (!id) return;
  router.push({ name: 'ExpensesList', query: { ...route.query, action: 'edit', id } });
};

const resetExpenseForm = () => {
  expenseForm.value = {
    id: null,
    name: '',
    amount: 0,
    category: '',
    description: '',
    expense_date: new Date().toISOString().split('T')[0],
    attachments: []
  };
  stagedFiles.value = [];
};

const closeExpenseModal = async () => {
  showExpenseModal.value = false;
  modalMode.value = 'add';
  resetExpenseForm();
  const nextQuery = { ...route.query };
  delete nextQuery.action;
  delete nextQuery.id;
  await router.replace({ query: nextQuery });
};

const openAddModal = () => {
  modalMode.value = 'add';
  resetExpenseForm();
  showExpenseModal.value = true;
};

const openEditModal = async (expenseId) => {
  modalMode.value = 'edit';
  resetExpenseForm();
  showExpenseModal.value = true;
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}?tenant_id=${getTenantId()}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!response.ok) throw new Error('Failed to load expense');
    const data = await response.json();
    expenseForm.value = {
      id: data.id || data._id || expenseId,
      name: data.name || '',
      amount: Number(data.amount) || 0,
      category: data.category || '',
      description: data.description || '',
      expense_date: (data.expense_date || '').slice(0, 10) || new Date().toISOString().split('T')[0],
      attachments: data.attachments || []
    };
    // Load full attachment data (with base64)
    try {
      const attRes = await fetch(`${API_BASE_URL}/expenses/${expenseId}/attachments?tenant_id=${getTenantId()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (attRes.ok) {
        const attData = await attRes.json();
        expenseForm.value.attachments = attData.attachments || [];
      }
    } catch (_) {}
  } catch (err) {
    console.error(err);
  }
};

const submitExpense = async () => {
  const payload = {
    name: (expenseForm.value.name || '').trim(),
    amount: Number(expenseForm.value.amount) || 0,
    category: (expenseForm.value.category || '').trim(),
    description: (expenseForm.value.description || '').trim(),
    expense_date: expenseForm.value.expense_date
  };

  if (!payload.name || !payload.category || !payload.expense_date || payload.amount <= 0) {
    alert('Please fill: name, category, date, and amount > 0.');
    return;
  }

  savingExpense.value = true;
  try {
    const selectedBranchId = selectedBranch.value?.id || selectedBranch.value?._id || '';
    if (modalMode.value === 'add') {
      const url = new URL(`${API_BASE_URL}/expenses/`);
      url.searchParams.append('tenant_id', getTenantId());
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...payload, branch_id: selectedBranchId || undefined })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.detail || 'Failed to create expense');
      }
      const created = await response.json();
      const newId = created.id || created._id;
      if (newId) await uploadStagedFiles(newId);
      await logAudit('create', 'expenses', { resource_type: 'expense', label: payload.name, amount: payload.amount, category: payload.category });
    } else {
      const id = expenseForm.value.id;
      const url = new URL(`${API_BASE_URL}/expenses/${id}`);
      url.searchParams.append('tenant_id', getTenantId());
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...payload, branch_id: selectedBranchId || undefined })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.detail || 'Failed to update expense');
      }
      await uploadStagedFiles(expenseForm.value.id);
      await logAudit('update', 'expenses', { resource_type: 'expense', resource_id: id, label: payload.name, amount: payload.amount, category: payload.category });
    }

    await fetchData();
    await closeExpenseModal();
  } catch (err) {
    console.error(err);
    alert(err?.message || 'Save failed');
  } finally {
    savingExpense.value = false;
  }
};

const deleteEntry = async (e) => {
  if (!confirm(`Delete expense entry "${e.name}"?`)) return;
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${e.id || e._id}?tenant_id=${getTenantId()}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (response.ok) {
      await logAudit('delete', 'expenses', { resource_type: 'expense', resource_id: e.id || e._id, label: e.name, amount: e.amount, category: e.category });
      expenses.value = expenses.value.filter(item => (item.id || item._id) !== (e.id || e._id));
    }
  } catch (error) { console.error(error); }
};

const fetchData = async () => {
  loading.value = true;
  try {
    const selectedBranchId = selectedBranch.value?.id || selectedBranch.value?._id || '';
    const branchParam = selectedBranchId ? `&branch_id=${selectedBranchId}` : '';

    // NOTE: backend route is mounted as `/expenses/` (trailing slash). Without it,
    // FastAPI may redirect and some browsers drop auth headers on redirect.
    const response = await fetch(`${API_BASE_URL}/expenses/?tenant_id=${getTenantId()}${branchParam}&limit=1000`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Failed to fetch expenses:', response.status, err);
      expenses.value = [];
      return;
    }
    const data = await response.json();
    expenses.value = Array.isArray(data) ? data : (data.expenses || []);
  } catch (error) { console.error(error); } finally { loading.value = false; }
};

const refreshData = () => fetchData();

const initializeBranches = async () => {
  try {
    branches.value = await getBranches();
    if (!branches.value.some(b => !b.id && b.name === 'All Branches')) branches.value.unshift({ id: '', name: 'All Branches' });
    selectedBranch.value = branches.value[0];
  } catch (err) { console.error(err); }
};

watch(selectedBranch, () => fetchData(), { deep: true });

// Initialize batch rows when modal opens
watch(showBatchModal, (open) => {
  if (open) initBatchRows();
});

watch(
  () => ({ action: route.query.action, id: route.query.id }),
  async ({ action, id }) => {
    if (action === 'add') {
      openAddModal();
    } else if (action === 'edit' && id) {
      await openEditModal(id);
    }
  },
  { immediate: true }
);

onMounted(async () => { await initializeBranches(); await fetchData(); });
</script>