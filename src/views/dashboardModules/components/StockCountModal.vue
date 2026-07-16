<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[9999] overflow-hidden">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        @click="$emit('close')"
      ></div>

      <!-- Modal positioning container -->
      <div class="fixed inset-0 flex items-center justify-center p-2 md:p-6 overflow-hidden pointer-events-none">
        <!-- Modal card -->
        <div
          class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-6xl flex flex-col max-h-[95vh] rounded-none pointer-events-auto"
        >
          <!-- Top blue indicator bar -->
          <div class="h-1.5 w-full bg-[#2F2E8B]"></div>

          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 bg-indigo-50 flex items-center justify-center text-[#2F2E8B] rounded-none">
                <i class="fas fa-barcode"></i>
              </div>
              <div>
                <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  Inventory Management
                </div>
                <div class="text-sm font-black text-gray-900 uppercase tracking-tight">
                  {{ mode === 'transfer' ? 'Stock Transfer' : mode === 'restock' ? 'Bulk Restock' : 'Physical Stock Audit' }}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button
                v-if="mode !== 'transfer' && changedRows.length > 0"
                :disabled="saving"
                @click="saveAdjustments"
                class="px-4 py-2 bg-[#2F2E8B] text-white font-black text-[9px] uppercase tracking-widest hover:bg-[#1D226B] transition-all flex items-center gap-2 shadow-lg shadow-indigo-100/50 animate-pulse"
              >
                <i v-if="saving" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-save"></i>
                Quick Save ({{ changedRows.length }})
              </button>
              <button
                @click="$emit('close')"
                class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Main scrollable content area -->
          <div class="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
            <!-- Dashboard Controls -->
            <div class="bg-white border border-gray-200 rounded-none overflow-hidden">
              <!-- Tier 1: Mode tabs + status pill -->
              <div class="flex items-stretch justify-between border-b border-gray-100 bg-gradient-to-b from-gray-50/80 to-white">
                <div role="tablist" class="flex">
                  <button
                    v-if="canCountStock"
                    @click="mode = 'count'"
                    role="tab"
                    :aria-selected="mode === 'count'"
                    :class="[
                      'group relative px-5 lg:px-7 py-3 text-[10px] font-mono font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2',
                      mode === 'count'
                        ? 'text-[#2F2E8B] bg-white'
                        : 'text-gray-400 hover:text-gray-700 hover:bg-white/60'
                    ]"
                  >
                    <i class="fas fa-clipboard-check text-[11px]"></i>
                    <span>Stock Count</span>
                    <span v-if="mode === 'count'" class="absolute left-0 right-0 -bottom-px h-[2px] bg-[#2F2E8B]"></span>
                  </button>
                  <button
                    v-if="canAddStock"
                    @click="mode = 'restock'"
                    role="tab"
                    :aria-selected="mode === 'restock'"
                    :class="[
                      'group relative px-5 lg:px-7 py-3 text-[10px] font-mono font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2',
                      mode === 'restock'
                        ? 'text-[#2F2E8B] bg-white'
                        : 'text-gray-400 hover:text-gray-700 hover:bg-white/60'
                    ]"
                  >
                    <i class="fas fa-boxes text-[11px]"></i>
                    <span>Bulk Restock</span>
                    <span v-if="mode === 'restock'" class="absolute left-0 right-0 -bottom-px h-[2px] bg-[#2F2E8B]"></span>
                  </button>
                  <button
                    v-if="canCountStock"
                    @click="mode = 'transfer'"
                    role="tab"
                    :aria-selected="mode === 'transfer'"
                    :class="[
                      'group relative px-5 lg:px-7 py-3 text-[10px] font-mono font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2 whitespace-nowrap',
                      mode === 'transfer'
                        ? 'text-emerald-600 bg-white'
                        : 'text-gray-400 hover:text-gray-700 hover:bg-white/60'
                    ]"
                  >
                    <i class="fas fa-exchange-alt text-[11px]"></i>
                    <span>Transfer</span>
                    <span v-if="mode === 'transfer'" class="absolute left-0 right-0 -bottom-px h-[2px] bg-emerald-500"></span>
                  </button>
                </div>

                <!-- Status pill, right side -->
                <div class="hidden md:flex items-center pr-4">
                  <div
                    v-if="mode === 'count'"
                    class="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-[#2F2E8B]"></span>
                    <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">
                      {{ changedRows.length }} change{{ changedRows.length === 1 ? '' : 's' }} pending
                    </span>
                  </div>
                  <div
                    v-else-if="mode === 'restock'"
                    class="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full"
                  >
                    <i class="fas fa-info-circle text-[#2F2E8B] text-[10px]"></i>
                    <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">
                      {{ changedRows.length }} row{{ changedRows.length === 1 ? '' : 's' }} to save
                    </span>
                  </div>
                  <div
                    v-else-if="mode === 'transfer'"
                    class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full"
                  >
                    <i class="fas fa-exchange-alt text-emerald-600 text-[10px]"></i>
                    <span class="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-widest">
                      {{ transferItems.filter(t => t.quantity > 0).length }} item{{ transferItems.filter(t => t.quantity > 0).length === 1 ? '' : 's' }} to transfer
                    </span>
                  </div>
                </div>
              </div>

              <!-- Tier 2: Configuration row -->
              <div class="p-4 lg:p-5 flex flex-col lg:flex-row lg:items-end gap-4">
                <!-- Count / Restock: Branch + Audit Date -->
                <template v-if="mode !== 'transfer'">
                  <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">
                        Branch
                      </label>
                      <div class="relative">
                        <i class="fas fa-store absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none"></i>
                        <select
                          v-model="countBranch"
                          class="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase tracking-widest focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none appearance-none transition-all"
                        >
                          <option value="">All Branches</option>
                          <option value="main">MAIN BRANCH</option>
                          <option v-for="b in allBranches" :key="b._id || b.id" :value="b._id || b.id">
                            {{ (b.name || '').toUpperCase() }}
                          </option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-[9px] pointer-events-none"></i>
                      </div>
                    </div>
                    <div class="space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">
                        Audit Date
                      </label>
                      <div class="relative">
                        <i class="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none"></i>
                        <input
                          type="date"
                          v-model="stockCountDate"
                          class="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase tracking-widest focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Transfer: From -> To branch -->
                <template v-else>
                  <div class="flex-1 flex flex-col sm:flex-row sm:items-end gap-3">
                    <div class="flex-1 space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.15em]">
                        From Branch
                      </label>
                      <div class="relative">
                        <i class="fas fa-arrow-up-from-bracket absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-[10px] pointer-events-none"></i>
                        <select
                          v-model="transferSourceBranch"
                          @change="fetchBranchItems(transferSourceBranch)"
                          class="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase tracking-widest focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] outline-none appearance-none transition-all"
                        >
                          <option value="">Select Source</option>
                          <option value="main">MAIN BRANCH</option>
                          <option v-for="b in allBranches" :key="b._id || b.id" :value="b._id || b.id">
                            {{ (b.name || '').toUpperCase() }}
                          </option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-[9px] pointer-events-none"></i>
                      </div>
                    </div>
                    <div class="flex items-center justify-center sm:pb-2.5 sm:px-1">
                      <div class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200">
                        <i class="fas fa-arrow-right text-emerald-600 text-[11px]"></i>
                      </div>
                    </div>
                    <div class="flex-1 space-y-1.5">
                      <label class="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-[0.15em]">
                        To Branch
                      </label>
                      <div class="relative">
                        <i class="fas fa-arrow-down-to-bracket absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 text-[10px] pointer-events-none"></i>
                        <select
                          v-model="transferDestBranch"
                          class="w-full pl-9 pr-9 py-2.5 bg-white border border-emerald-200 rounded-none text-[10px] font-mono font-black uppercase tracking-widest focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none appearance-none transition-all"
                        >
                          <option value="">Select Destination</option>
                          <option value="main" :disabled="transferSourceBranch === 'main'">MAIN BRANCH</option>
                          <option
                            v-for="b in allBranches"
                            :key="b._id || b.id"
                            :value="b._id || b.id"
                            :disabled="(b._id || b.id) === transferSourceBranch"
                          >
                            {{ (b.name || '').toUpperCase() }}
                          </option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 text-[9px] pointer-events-none"></i>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Discrepancies toggle (count/restock only) -->
                <div v-if="mode !== 'transfer'" class="flex items-center">
                  <label class="flex items-center gap-2.5 cursor-pointer select-none px-3 py-2.5 border border-gray-200 hover:border-gray-300 transition-colors">
                    <div class="relative inline-block w-8 h-4 shrink-0">
                      <input
                        v-model="showOnlyChanges"
                        type="checkbox"
                        class="peer appearance-none w-8 h-4 bg-gray-200 rounded-full checked:bg-[#2F2E8B] transition-colors cursor-pointer"
                      />
                      <div class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4 pointer-events-none"></div>
                    </div>
                    <span class="text-[9px] font-mono font-black text-gray-700 uppercase tracking-[0.15em] whitespace-nowrap">
                      Discrepancies Only
                    </span>
                  </label>
                </div>

                <!-- Mobile-only status pill -->
                <div class="md:hidden">
                  <div v-if="mode === 'count'" class="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full w-fit">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#2F2E8B]"></span>
                    <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ changedRows.length }} pending</span>
                  </div>
                  <div v-else-if="mode === 'restock'" class="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full w-fit">
                    <i class="fas fa-info-circle text-[#2F2E8B] text-[10px]"></i>
                    <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">{{ changedRows.length }} to save</span>
                  </div>
                  <div v-else class="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full w-fit">
                    <i class="fas fa-exchange-alt text-emerald-600 text-[10px]"></i>
                    <span class="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-widest">{{ transferItems.filter(t => t.quantity > 0).length }} to transfer</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- SEARCH ITEMS ROW (Moved to separate line below top controls) -->
            <div v-if="mode !== 'transfer'" class="flex flex-col lg:flex-row lg:items-end gap-3 w-full mb-6">
              <div class="flex-1 w-full space-y-2">
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">
                  Search Items
                </label>
                <div class="relative group w-full">
                  <i
                    class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2F2E8B] transition-colors text-xs"
                  ></i>
                  <input
                    v-model="search"
                    placeholder="Filter items..."
                    class="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase tracking-widest focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-all"
                  />
                </div>
              </div>
              <!-- Toolbar: Import / Columns / Scan -->
              <div class="flex items-center gap-2 flex-wrap">
                <button v-if="canCountStock" @click="showImportPanel = !showImportPanel" class="h-[42px] px-3 bg-white border border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600 text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all" title="Bulk import counts from CSV/Excel">
                  <i class="fas fa-file-import"></i> Import
                </button>
                <div class="relative">
                  <button @click="showColumnPicker = !showColumnPicker" class="h-[42px] px-3 bg-white border border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600 text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all" title="Show/hide table columns">
                    <i class="fas fa-columns"></i> Columns
                  </button>
                  <div v-if="showColumnPicker" class="absolute right-0 mt-1 w-56 bg-white border border-gray-200 shadow-xl z-50 p-3 space-y-1.5">
                    <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 pb-1.5 border-b border-gray-100">Column Visibility</div>
                    <label v-for="col in [
                      { key: 'itemName', label: 'Item Name', alwaysOn: true },
                      { key: 'sku', label: 'SKU / Barcode' },
                      { key: 'systemQty', label: 'System Qty' },
                      ...(mode === 'restock' ? [{ key: 'buyPrice', label: 'Buy Price' }, { key: 'sellPrice', label: 'Sell Price' }] : []),
                      { key: 'countedQty', label: mode === 'restock' ? 'Add Qty' : 'Counted Qty' },
                      { key: 'variance', label: mode === 'restock' ? 'New Total' : 'Variance' },
                      { key: 'valueDelta', label: 'Value Delta' }
                    ]" :key="col.key" class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-1.5 py-1 text-[10px] font-mono text-gray-700">
                      <input type="checkbox" :checked="columnVisibility[col.key] !== false" :disabled="col.alwaysOn" @change="columnVisibility[col.key] = $event.target.checked" class="accent-[#2F2E8B]" />
                      <span :class="{ 'text-gray-400': col.alwaysOn }">{{ col.label }}</span>
                    </label>
                    <button @click="resetColumns(); showColumnPicker = false" class="w-full mt-2 pt-2 border-t border-gray-100 text-[9px] font-mono font-black text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-widest">Reset</button>
                  </div>
                </div>
                <button v-if="canCountStock" @click="toggleScanner" :class="scannerActive ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'" class="h-[42px] px-3 border text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all" title="Toggle barcode scanner mode">
                  <i class="fas fa-barcode"></i> Scan
                </button>
                <button v-if="canCountStock && mode !== 'transfer'" @click="openCameraScanner" :class="showCameraScanner ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'" class="h-[42px] px-3 border text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all" title="Camera barcode scanner — scan multiple items continuously">
                  <i class="fas fa-camera"></i> Camera
                </button>
              </div>
            </div>

            <!-- Audit Report Trigger (kept at the top of the modal) -->
            <div v-if="mode !== 'transfer' && mode !== 'restock'" class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-indigo-50/40 border border-indigo-100 rounded-none">
              <div>
                <div class="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-widest">Audit Report</div>
                <div class="text-xs text-gray-600 font-mono mt-1">Full history with product metadata, sorting, filtering and multi-format export.</div>
              </div>
              <button
                @click="openAuditReport"
                class="px-5 py-2.5 bg-[#2F2E8B] text-white font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#1D226B] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100/40 rounded-none"
              >
                <i class="fas fa-clipboard-list"></i>
                View Audit Report
                <span v-if="auditLoading" class="ml-1"><i class="fas fa-spinner fa-spin"></i></span>
                <span v-else-if="auditRowsAll.length" class="ml-1 opacity-70">({{ auditRowsAll.length }})</span>
              </button>
            </div>

            <!-- Barcode Scanner Input (visible when scannerActive) -->
            <div v-if="mode !== 'transfer' && scannerActive" class="mb-6 p-4 bg-[#2F2E8B]/5 border border-[#2F2E8B]/30 rounded-none">
              <div class="flex items-center gap-3 mb-2">
                <i class="fas fa-barcode text-[#2F2E8B]"></i>
                <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Scanner Active</span>
                <span class="text-[9px] font-mono text-gray-500 normal-case">Scan barcode or type SKU/Name and press Enter — adds +1 to counted qty</span>
              </div>
              <div class="flex items-center gap-2">
                <input
                  ref="scannerInputRef"
                  v-model="scannerInput"
                  @keydown.enter.prevent="onScanSubmit"
                  placeholder="Scan or type SKU/barcode..."
                  class="flex-1 px-4 py-2.5 bg-white border-2 border-[#2F2E8B] rounded-none text-[11px] font-mono font-black uppercase tracking-widest focus:ring-2 focus:ring-[#2F2E8B] outline-none"
                />
                <button @click="onScanSubmit" class="px-4 py-2.5 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#1D226B]">Add</button>
              </div>
              <div v-if="scanFeedback" :class="scanFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'" class="mt-2 px-3 py-1.5 border text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2">
                <i :class="scanFeedback.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'"></i> {{ scanFeedback.message }}
              </div>
            </div>

            <!-- Bulk Import Panel -->
            <div v-if="mode !== 'transfer' && showImportPanel" class="mb-6 p-4 bg-amber-50/40 border border-amber-200/60 rounded-none space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fas fa-file-import text-amber-600"></i>
                  <span class="text-[10px] font-mono font-black text-amber-700 uppercase tracking-widest">Bulk Import Counts</span>
                </div>
                <button @click="showImportPanel = false; resetImport()" class="text-gray-400 hover:text-gray-700 text-xs"><i class="fas fa-times"></i></button>
              </div>
              <div class="text-[10px] font-mono text-gray-600 normal-case leading-relaxed">
                Upload a CSV or Excel file with columns: <code class="bg-white px-1 border border-gray-200">name</code>, <code class="bg-white px-1 border border-gray-200">sku</code> (or barcode), and <code class="bg-white px-1 border border-gray-200">{{ mode === 'restock' ? 'add_qty' : 'counted_qty' }}</code>.
                <button @click="downloadImportTemplate" class="ml-1 text-[#2F2E8B] hover:underline font-black uppercase tracking-widest">Download Template</button>
              </div>

              <div class="space-y-2 p-3 bg-white border border-amber-100/80">
                <div class="flex items-center justify-between gap-2">
                  <div class="text-[9px] font-mono font-black text-amber-700 uppercase tracking-widest">Field Mapping</div>
                  <button
                    v-if="importSourceHeaders.length"
                    @click="applyImportMappings"
                    class="text-[9px] font-mono font-black uppercase tracking-widest text-[#2F2E8B] hover:underline"
                  >
                    Refresh Mapping
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div class="space-y-1">
                    <label class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">System Name</label>
                    <select v-model="importFieldMap.name" :disabled="!importSourceHeaders.length" class="w-full px-3 py-2 bg-white border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest disabled:bg-gray-50">
                      <option value="">Auto / None</option>
                      <option v-for="header in importSourceHeaders" :key="`name-${header}`" :value="header">{{ header }}</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">System SKU / Barcode</label>
                    <select v-model="importFieldMap.sku" :disabled="!importSourceHeaders.length" class="w-full px-3 py-2 bg-white border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest disabled:bg-gray-50">
                      <option value="">Auto / None</option>
                      <option v-for="header in importSourceHeaders" :key="`sku-${header}`" :value="header">{{ header }}</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">System Qty / Count</label>
                    <select v-model="importFieldMap.quantity" :disabled="!importSourceHeaders.length" class="w-full px-3 py-2 bg-white border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest disabled:bg-gray-50">
                      <option value="">Auto / None</option>
                      <option v-for="header in importSourceHeaders" :key="`qty-${header}`" :value="header">{{ header }}</option>
                    </select>
                  </div>
                </div>
                <div class="text-[9px] font-mono text-gray-500 normal-case leading-relaxed">
                  Map your uploaded Excel columns to the system fields before applying the import. The system will try to auto-detect common headers, but you can override them here.
                </div>
              </div>

              <!-- Match mode + import mode + file input -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="space-y-1">
                  <label class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Match By</label>
                  <select v-model="importMatchMode" class="w-full px-3 py-2 bg-white border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest">
                    <option value="either">Name OR SKU</option>
                    <option value="both">Name AND SKU</option>
                    <option value="name">Name Only</option>
                    <option value="sku">SKU / Barcode Only</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Apply Mode</label>
                  <select v-model="importMode" class="w-full px-3 py-2 bg-white border border-gray-200 text-[10px] font-mono font-black uppercase tracking-widest">
                    <option value="overwrite">Overwrite Counts</option>
                    <option value="add">Add To Existing</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">File</label>
                  <input type="file" accept=".csv,.xlsx,.xls" @change="onImportFile" class="block w-full text-[10px] font-mono text-gray-700 file:mr-2 file:py-1.5 file:px-3 file:border-0 file:bg-[#2F2E8B] file:text-white file:font-black file:uppercase file:tracking-widest file:cursor-pointer" />
                </div>
              </div>

              <div v-if="importParseError" class="px-3 py-2 bg-red-50 border border-red-200 text-red-700 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2">
                <i class="fas fa-exclamation-triangle"></i> {{ importParseError }}
              </div>

              <!-- Preview -->
              <div v-if="importHasPreview" class="space-y-3">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div class="px-3 py-2 bg-white border border-gray-200">
                    <div class="text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Total Rows</div>
                    <div class="text-base font-black text-gray-900">{{ importStats.total }}</div>
                  </div>
                  <div class="px-3 py-2 bg-emerald-50 border border-emerald-200">
                    <div class="text-[8px] font-mono font-black text-emerald-500 uppercase tracking-widest">Matched</div>
                    <div class="text-base font-black text-emerald-700">{{ importStats.matched }}</div>
                  </div>
                  <div class="px-3 py-2 bg-amber-50 border border-amber-200">
                    <div class="text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">Conflicts</div>
                    <div class="text-base font-black text-amber-700">{{ importStats.conflicts }}</div>
                  </div>
                  <div class="px-3 py-2 bg-red-50 border border-red-200">
                    <div class="text-[8px] font-mono font-black text-red-500 uppercase tracking-widest">Unmatched</div>
                    <div class="text-base font-black text-red-700">{{ importStats.unmatched }}</div>
                  </div>
                </div>

                <div class="max-h-[280px] overflow-y-auto border border-gray-200 bg-white">
                  <table class="w-full text-[10px] font-mono">
                    <thead class="bg-gray-50 text-gray-400 sticky top-0">
                      <tr>
                        <th class="text-left px-3 py-2 font-black uppercase tracking-widest">Row</th>
                        <th class="text-left px-3 py-2 font-black uppercase tracking-widest">Name</th>
                        <th class="text-left px-3 py-2 font-black uppercase tracking-widest">SKU</th>
                        <th class="text-right px-3 py-2 font-black uppercase tracking-widest">Qty</th>
                        <th class="text-left px-3 py-2 font-black uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-for="r in importRows" :key="r.idx" :class="{
                        'bg-emerald-50/40': r._matchedItem && !r._conflict,
                        'bg-amber-50/40': r._conflict,
                        'bg-red-50/40': !r._matchedItem && !r._conflict
                      }">
                        <td class="px-3 py-1.5 text-gray-400">{{ r.idx }}</td>
                        <td class="px-3 py-1.5 font-black text-gray-900 normal-case">{{ r.name || '—' }}</td>
                        <td class="px-3 py-1.5 text-gray-700">{{ r.sku || '—' }}</td>
                        <td class="px-3 py-1.5 text-right font-black">{{ r.quantity ?? '—' }}</td>
                        <td class="px-3 py-1.5">
                          <span v-if="r._error" class="text-red-600 normal-case">{{ r._error }}</span>
                          <span v-else-if="r._conflict" class="text-amber-700 font-black uppercase tracking-widest">→ {{ r._candidates.length }} matches (apply to all)</span>
                          <span v-else-if="r._matchedItem" class="text-emerald-700 font-black uppercase tracking-widest">→ {{ r._matchedItem.name }}</span>
                          <span v-else class="text-red-600 font-black uppercase tracking-widest">No match</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="flex items-center justify-between gap-2">
                  <button v-if="importStats.unmatched > 0" @click="exportUnmatchedImport"
                    class="px-4 py-2 bg-red-50 text-red-700 text-[9px] font-mono font-black uppercase tracking-widest border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-1.5"
                    title="Download unmatched items as Excel for audit review">
                    <i class="fas fa-file-excel"></i> Export {{ importStats.unmatched }} Unmatched
                  </button>
                  <span v-else></span>
                  <div class="flex items-center gap-2">
                    <button @click="resetImport()" class="px-4 py-2 text-[9px] font-mono font-black text-gray-500 hover:text-gray-700 uppercase tracking-widest">Clear</button>
                    <button :disabled="importStats.matched === 0" @click="applyImport" class="px-5 py-2 bg-emerald-600 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                      <i class="fas fa-check"></i> Apply {{ importStats.matched }} Match{{ importStats.matched === 1 ? '' : 'es' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Transfer Mode: Search + toolbar (Columns / Scan) -->
            <div v-if="mode === 'transfer'" class="space-y-2">
              <div class="flex flex-col lg:flex-row lg:items-center gap-3">
                <div class="relative group flex-1">
                  <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors text-xs"></i>
                  <input
                    v-model="transferSearch"
                    placeholder="Search items to transfer..."
                    class="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase tracking-widest focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <div class="relative">
                    <button @click="showColumnPicker = !showColumnPicker" class="h-[42px] px-3 bg-white border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 text-gray-600 text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                      <i class="fas fa-columns"></i> Columns
                    </button>
                    <div v-if="showColumnPicker" class="absolute right-0 mt-1 w-56 bg-white border border-gray-200 shadow-xl z-50 p-3 space-y-1.5">
                      <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2 pb-1.5 border-b border-gray-100">Column Visibility</div>
                      <label v-for="col in [
                        { key: 'itemName', label: 'Item Name', alwaysOn: true },
                        { key: 'sku', label: 'SKU' },
                        { key: 'transferAvailable', label: 'Available Qty' },
                        { key: 'transferBuyPrice', label: 'Buy Price' },
                        { key: 'transferSellPrice', label: 'Sell Price' },
                        { key: 'transferQty', label: 'Transfer Qty' },
                        { key: 'transferRemaining', label: 'Remaining' }
                      ]" :key="col.key" class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-1.5 py-1 text-[10px] font-mono text-gray-700">
                        <input type="checkbox" :checked="columnVisibility[col.key] !== false" :disabled="col.alwaysOn" @change="columnVisibility[col.key] = $event.target.checked" class="accent-emerald-600" />
                        <span :class="{ 'text-gray-400': col.alwaysOn }">{{ col.label }}</span>
                      </label>
                      <button @click="resetColumns(); showColumnPicker = false" class="w-full mt-2 pt-2 border-t border-gray-100 text-[9px] font-mono font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest">Reset</button>
                    </div>
                  </div>
                  <button @click="toggleScanner" :class="scannerActive ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600'" class="h-[42px] px-3 border text-[9px] font-mono font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                    <i class="fas fa-barcode"></i> Scan
                  </button>
                </div>
              </div>
              <div v-if="scannerActive" class="p-4 bg-emerald-50/50 border border-emerald-200/60">
                <div class="flex items-center gap-3 mb-2">
                  <i class="fas fa-barcode text-emerald-600"></i>
                  <span class="text-[9px] font-mono font-black text-emerald-700 uppercase tracking-widest">Scanner Active</span>
                  <span class="text-[9px] font-mono text-gray-500 normal-case">Adds +1 to transfer qty</span>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    ref="scannerInputRef"
                    v-model="scannerInput"
                    @keydown.enter.prevent="onScanSubmit"
                    placeholder="Scan or type SKU/barcode..."
                    class="flex-1 px-4 py-2.5 bg-white border-2 border-emerald-500 rounded-none text-[11px] font-mono font-black uppercase tracking-widest focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button @click="onScanSubmit" class="px-4 py-2.5 bg-emerald-600 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-emerald-700">Add</button>
                </div>
                <div v-if="scanFeedback" :class="scanFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'" class="mt-2 px-3 py-1.5 border text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2">
                  <i :class="scanFeedback.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'"></i> {{ scanFeedback.message }}
                </div>
              </div>
            </div>

            <!-- Transfer Mode: Loading state -->
            <div v-if="mode === 'transfer' && transferLoading" class="flex items-center justify-center py-16">
              <div class="flex flex-col items-center gap-3">
                <div class="h-10 w-10 border-3 border-gray-100 border-t-emerald-500 rounded-full animate-spin"></div>
                <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Loading branch items...</span>
              </div>
            </div>

            <!-- Transfer Mode: No source selected -->
            <div v-if="mode === 'transfer' && !transferSourceBranch && !transferLoading" class="flex flex-col items-center justify-center py-20 bg-gray-50/30 border border-gray-100">
              <i class="fas fa-code-branch text-4xl text-gray-300 mb-4"></i>
              <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Select a source branch to view items</p>
            </div>

            <!-- Transfer Mode: Items Table -->
            <div
              v-if="mode === 'transfer' && transferSourceBranch && !transferLoading"
              class="border border-gray-100 rounded-none overflow-hidden min-h-[300px] max-h-[55vh] overflow-x-auto overflow-y-auto custom-scrollbar"
            >
              <table class="w-full font-mono text-[10px] min-w-[800px]">
                <thead class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                  <tr>
                    <th v-if="isColVisible('itemName')" class="text-left px-6 py-4 font-black uppercase tracking-widest">Item Name</th>
                    <th v-if="isColVisible('sku')" class="text-left px-6 py-4 font-black uppercase tracking-widest">SKU</th>
                    <th v-if="isColVisible('transferAvailable')" class="text-right px-6 py-4 font-black uppercase tracking-widest">Available Qty</th>
                    <th v-if="isColVisible('transferBuyPrice')" class="text-right px-6 py-4 font-black uppercase tracking-widest">Buy Price</th>
                    <th v-if="isColVisible('transferSellPrice')" class="text-right px-6 py-4 font-black uppercase tracking-widest">Sell Price</th>
                    <th v-if="isColVisible('transferQty')" class="text-right px-6 py-4 font-black uppercase tracking-widest">Transfer Qty</th>
                    <th v-if="isColVisible('transferRemaining')" class="text-right px-6 py-4 font-black uppercase tracking-widest">Remaining</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="item in filteredTransferItems"
                    :key="item.id"
                    :id="`stock-row-${item.id}`"
                    class="hover:bg-gray-50/50 transition-colors"
                    :class="{
                      'bg-emerald-50/40 ring-1 ring-inset ring-emerald-200': item.quantity > 0,
                      'bg-emerald-100/70 ring-2 ring-emerald-500 animate-pulse': scannedHighlightId === item.id
                    }"
                  >
                    <td v-if="isColVisible('itemName')" class="px-6 py-4">
                      <div class="font-black text-gray-900 uppercase">{{ item.name }}</div>
                      <div class="text-[8px] text-gray-400 mt-0.5">{{ item.category }} • {{ item.type }}</div>
                      <div v-if="item.quantity > 0" class="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase tracking-widest rounded-none">
                        <i class="fas fa-circle text-[6px]"></i> Will transfer
                      </div>
                    </td>
                    <td v-if="isColVisible('sku')" class="px-6 py-4 text-gray-500">{{ item.sku || '---' }}</td>
                    <td v-if="isColVisible('transferAvailable')" class="px-6 py-4 text-right font-bold text-gray-500">{{ item.stockQty }}</td>
                    <td v-if="isColVisible('transferBuyPrice')" class="px-6 py-4 text-right font-bold text-gray-500">{{ formatCurrency(item.buyingPrice) }}</td>
                    <td v-if="isColVisible('transferSellPrice')" class="px-6 py-4 text-right font-bold text-gray-500">{{ formatCurrency(item.sellingPrice) }}</td>
                    <td v-if="isColVisible('transferQty')" class="px-6 py-4 text-right">
                      <input
                        type="number"
                        min="0"
                        :max="item.stockQty"
                        v-model.number="item.quantity"
                        @keydown.enter.prevent
                        class="w-24 px-3 py-1.5 bg-white border rounded-none text-right font-black focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                        :class="item.quantity > 0 ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-200'"
                      />
                    </td>
                    <td v-if="isColVisible('transferRemaining')" class="px-6 py-4 text-right font-bold" :class="item.quantity > 0 ? 'text-amber-600' : 'text-gray-400'">
                      {{ item.stockQty - (item.quantity || 0) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="filteredTransferItems.length === 0" class="flex flex-col items-center justify-center py-20 bg-gray-50/30">
                <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">No items found in this branch</p>
              </div>
            </div>

            <!-- Transfer Summary -->
            <div v-if="mode === 'transfer' && transferSourceBranch" class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 bg-emerald-50/30 border border-emerald-100/50 rounded-none">
              <div class="flex gap-10">
                <div class="space-y-1">
                  <div class="text-[9px] font-mono font-black text-emerald-500 uppercase tracking-widest">Items to Transfer</div>
                  <div class="text-xl font-black text-emerald-600">{{ transferItems.filter(t => t.quantity > 0).length }}</div>
                </div>
                <div class="space-y-1">
                  <div class="text-[9px] font-mono font-black text-emerald-500 uppercase tracking-widest">Total Units</div>
                  <div class="text-xl font-black text-emerald-600">{{ transferItems.reduce((s, t) => s + (t.quantity || 0), 0) }}</div>
                </div>
                <div class="space-y-1">
                  <div class="text-[9px] font-mono font-black text-emerald-500 uppercase tracking-widest">Transfer Value</div>
                  <div class="text-xl font-black text-emerald-600">{{ formatCurrency(transferItems.reduce((s, t) => s + ((t.quantity || 0) * (t.sellingPrice || 0)), 0)) }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">Source Items</div>
                <div class="text-xl font-black text-gray-900">{{ transferItems.length }}</div>
              </div>
            </div>

            <!-- Audit Table (Stock Count / Restock modes only) -->
            <!-- Loading state when fetching branch items -->
            <div v-if="mode !== 'transfer' && countBranchLoading" class="flex items-center justify-center py-16">
              <div class="flex flex-col items-center gap-3">
                <div class="h-10 w-10 border-3 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
                <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Loading branch items...</span>
              </div>
            </div>
            <div
              v-if="mode !== 'transfer' && !countBranchLoading"
              class="border border-gray-100 rounded-none overflow-hidden min-h-[400px] max-h-[60vh] overflow-x-auto overflow-y-auto custom-scrollbar"
            >
              <table class="w-full font-mono text-[10px] min-w-[1000px]">
                <thead
                  class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100 shadow-sm"
                >
                  <tr>
                    <th v-if="isColVisible('itemName')" class="text-left px-6 py-4 font-black uppercase tracking-widest">Item Name</th>
                    <th v-if="isColVisible('sku')" class="text-left px-6 py-4 font-black uppercase tracking-widest">SKU / Barcode</th>
                    <th v-if="isColVisible('systemQty')" class="text-right px-6 py-4 font-black uppercase tracking-widest">System Qty</th>
                    <th v-if="mode === 'restock' && isColVisible('buyPrice')" class="text-right px-6 py-4 font-black uppercase tracking-widest">
                      Buy Price
                    </th>
                    <th v-if="mode === 'restock' && isColVisible('sellPrice')" class="text-right px-6 py-4 font-black uppercase tracking-widest">
                      Sell Price
                    </th>
                    <th v-if="isColVisible('countedQty')" class="text-right px-6 py-4 font-black uppercase tracking-widest">
                      {{ mode === 'restock' ? 'Add Qty' : 'Counted Qty' }}
                    </th>
                    <th v-if="isColVisible('variance')" class="text-right px-6 py-4 font-black uppercase tracking-widest">
                      {{ mode === 'restock' ? 'New Total' : 'Variance' }}
                    </th>
                    <th v-if="isColVisible('valueDelta')" class="text-right px-6 py-4 font-black uppercase tracking-widest">Value Delta</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="row in pagedDisplayed"
                    :key="row.id"
                    :id="`stock-row-${row.id}`"
                    :data-row-id="row.id"
                    class="hover:bg-gray-50/50 transition-colors"
                    :class="{
                      'bg-indigo-50/40 ring-1 ring-inset ring-indigo-200': isRowDirty(row),
                      'bg-emerald-100/60 ring-2 ring-emerald-400 animate-pulse': scannedHighlightId === row.id
                    }"
                  >
                    <td v-if="isColVisible('itemName')" class="px-6 py-4">
                      <div class="font-black text-gray-900 uppercase">{{ row.name }}</div>
                      <div class="text-[8px] text-gray-400 mt-0.5">
                        {{ row.category }} • {{ row.type }}
                      </div>
                      <div
                        v-if="isRowDirty(row)"
                        class="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-indigo-100 text-[#2F2E8B] text-[8px] font-black uppercase tracking-widest rounded-none"
                      >
                        <i class="fas fa-circle text-[6px]"></i> Will save
                      </div>
                    </td>
                    <td v-if="isColVisible('sku')" class="px-6 py-4">
                      <input
                        v-model="skus[row.id]"
                        type="text"
                        placeholder="---"
                        @keydown.enter.prevent
                        class="w-full px-3 py-1.5 bg-white border rounded-none text-left font-black focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-all uppercase"
                        :class="isSkuDirty(row) ? 'border-indigo-400 bg-indigo-50/50' : 'border-gray-200'"
                      />
                    </td>
                    <td v-if="isColVisible('systemQty')" class="px-6 py-4 text-right font-bold text-gray-500">{{ row.systemQty }}</td>

                    <td v-if="mode === 'restock' && isColVisible('buyPrice')" class="px-6 py-4 text-right">
                      <input
                        type="number"
                        step="0.01"
                        @keydown.enter.prevent
                        class="w-24 px-3 py-1.5 bg-white border rounded-none text-right font-black focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-all"
                        :class="
                          buyingPrices[row.id] !== row.buyingPrice
                            ? 'border-indigo-400 bg-indigo-50/50'
                            : 'border-gray-200'
                        "
                        v-model.number="buyingPrices[row.id]"
                      />
                    </td>

                    <td v-if="mode === 'restock' && isColVisible('sellPrice')" class="px-6 py-4 text-right">
                      <input
                        type="number"
                        step="0.01"
                        @keydown.enter.prevent
                        class="w-24 px-3 py-1.5 bg-white border rounded-none text-right font-black focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-all"
                        :class="
                          sellingPrices[row.id] !== row.sellingPrice
                            ? 'border-indigo-400 bg-indigo-50/50'
                            : 'border-gray-200'
                        "
                        v-model.number="sellingPrices[row.id]"
                      />
                    </td>

                    <td v-if="isColVisible('countedQty')" class="px-6 py-4 text-right">
                      <input
                        type="number"
                        step="1"
                        @keydown.enter.prevent
                        placeholder="Enter count"
                        class="w-24 px-3 py-1.5 bg-white border rounded-none text-right font-black focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-all"
                        :class="isQtyDirty(row) ? 'border-indigo-400 bg-indigo-50/50' : 'border-gray-200'"
                        :value="counts[row.id] == null ? '' : counts[row.id]"
                        @input="e => { const v = e.target.value.trim(); counts[row.id] = v === '' ? null : Number(v) }"
                      />
                    </td>

                    <td v-if="isColVisible('variance')" class="px-6 py-4 text-right font-bold" :class="variance(row).cls">
                      {{ mode === 'restock' ? (row.systemQty + (counts[row.id] || 0)) : (variance(row).uncounted ? '—' : variance(row).qty) }}
                    </td>
                    <td v-if="isColVisible('valueDelta')" class="px-6 py-4 text-right font-bold" :class="variance(row).cls">
                      {{ variance(row).uncounted ? '—' : formatCurrency(variance(row).value) }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                v-if="displayed.length === 0"
                class="flex flex-col items-center justify-center py-20 bg-gray-50/30"
              >
                <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
                  No items found
                </p>
              </div>
            </div>

            <!-- Summary -->
            <div
              v-if="mode !== 'transfer' && !countBranchLoading"
              class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 bg-indigo-50/30 border border-indigo-100/50 rounded-none"
            >
              <div class="flex gap-10">
                <div class="space-y-1">
                  <div class="text-[9px] font-mono font-black text-indigo-400 uppercase tracking-widest">
                    Total Unit Change
                  </div>
                  <div
                    class="text-xl font-black"
                    :class="mode === 'restock' ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ mode === 'restock' ? totals.addedQty : totals.missingQty }}
                  </div>
                </div>
                <div class="space-y-1">
                  <div class="text-[9px] font-mono font-black text-indigo-400 uppercase tracking-widest">
                    Total Value Change
                  </div>
                  <div
                    class="text-xl font-black"
                    :class="mode === 'restock' ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ formatCurrency(mode === 'restock' ? totals.addedValue : totals.missingValue) }}
                  </div>
                </div>
                <div
                  v-if="mode === 'restock' && priceOnlyChanges > 0"
                  class="space-y-1"
                >
                  <div class="text-[9px] font-mono font-black text-indigo-400 uppercase tracking-widest">
                    Price-Only Updates
                  </div>
                  <div class="text-xl font-black text-indigo-600">{{ priceOnlyChanges }}</div>
                </div>
              </div>

              <div class="text-right">
                <div class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">
                  Items Listed
                </div>
                <div class="text-xl font-black text-gray-900">{{ displayed.length }}</div>
              </div>
            </div>

            <div class="flex gap-3 w-full md:w-auto">
              <button
                @click="$emit('close')"
                class="flex-1 md:flex-none px-6 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-600 transition-colors"
              >
                Cancel
              </button>
              <!-- Transfer Save Button -->
              <button
                v-if="mode === 'transfer'"
                :disabled="saving || !transferDestBranch || transferItems.filter(t => t.quantity > 0).length === 0"
                @click="saveTransfer"
                class="flex-1 md:flex-none px-10 py-2.5 font-black text-[10px] uppercase tracking-[0.2em] rounded-none shadow-lg transition-all transform active:scale-95 disabled:opacity-50 md:min-w-[200px]"
                :class="
                  transferDestBranch && transferItems.filter(t => t.quantity > 0).length > 0
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                "
              >
                <span v-if="!saving">
                  Transfer Stock
                  <span v-if="transferItems.filter(t => t.quantity > 0).length > 0" class="ml-1 opacity-70">({{ transferItems.filter(t => t.quantity > 0).length }})</span>
                </span>
                <span v-else class="flex items-center gap-2 justify-center">
                  <i class="fas fa-spinner fa-spin"></i>
                  Transferring...
                </span>
              </button>
              <!-- Regular Save Button -->
              <button
                v-else
                :disabled="saving || changedRows.length === 0"
                @click="saveAdjustments"
                class="flex-1 md:flex-none px-10 py-2.5 font-black text-[10px] uppercase tracking-[0.2em] rounded-none shadow-lg transition-all transform active:scale-95 disabled:opacity-50 md:min-w-[200px]"
                :class="
                  changedRows.length > 0
                    ? 'bg-[#2F2E8B] hover:bg-[#1D226B] text-white shadow-indigo-100'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                "
              >
                <span v-if="!saving">
                  {{ mode === 'restock' ? 'Save Restock' : 'Save Adjustments' }}
                  <span v-if="changedRows.length > 0" class="ml-1 opacity-70">({{ changedRows.length }})</span>
                </span>
                <span v-else class="flex items-center gap-2 justify-center">
                  <i class="fas fa-spinner fa-spin"></i>
                  Saving...
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Audit Report Popup Modal -->
  <Teleport to="body">
    <div v-if="showAuditReportModal" class="fixed inset-0 z-[10001] overflow-hidden">
      <div class="fixed inset-0 bg-black/60 backdrop-blur-md" @click="showAuditReportModal = false"></div>
      <div class="fixed inset-0 flex items-stretch sm:items-center justify-center p-0 sm:p-3 md:p-6 overflow-hidden pointer-events-none">
        <div class="relative bg-white border border-gray-200 shadow-2xl w-full h-full sm:max-w-7xl flex flex-col sm:h-[95vh] rounded-none pointer-events-auto">
          <div class="h-1.5 w-full bg-[#2F2E8B]"></div>

          <!-- Header -->
          <div class="px-3 sm:px-6 py-3 border-b border-gray-100 flex flex-wrap justify-between items-center gap-2 bg-gray-50/50">
            <div class="flex items-center gap-3 min-w-0">
              <div class="h-9 w-9 sm:h-10 sm:w-10 bg-indigo-50 flex items-center justify-center text-[#2F2E8B] rounded-none shrink-0">
                <i class="fas fa-clipboard-list"></i>
              </div>
              <div class="min-w-0">
                <div class="text-[9px] sm:text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Inventory Management</div>
                <div class="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-tight truncate">Stock Audit Report</div>
                <div v-if="countBranch" class="text-[9px] font-mono text-indigo-500 uppercase tracking-widest mt-0.5">
                  <i class="fas fa-code-branch mr-1"></i>
                  {{ countBranch === 'main' ? 'Main Branch' : (allBranches.find(b => (b._id || b.id) === countBranch)?.name || countBranch) }}
                </div>
                <div v-else class="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">All Branches</div>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-wrap justify-end">
              <!-- Columns picker -->
              <div class="relative">
                <button @click="showAuditColumnPicker = !showAuditColumnPicker"
                  class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 hover:text-[#2F2E8B] border border-gray-200 hover:border-[#2F2E8B] rounded-none flex items-center gap-1.5"
                  title="Show / hide columns">
                  <i class="fas fa-columns"></i> Columns
                  <span v-if="auditHiddenCols.size" class="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[8px]">{{ auditHiddenCols.size }}</span>
                </button>
                <div v-if="showAuditColumnPicker"
                  class="absolute right-0 mt-1 w-64 bg-white border border-gray-200 shadow-2xl z-30 rounded-none">
                  <div class="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span class="text-[9px] font-mono font-black uppercase tracking-widest text-gray-500">Visible Columns</span>
                    <button @click="showAllAuditCols" class="text-[9px] font-mono font-black uppercase tracking-widest text-[#2F2E8B] hover:underline">Show all</button>
                  </div>
                  <div class="max-h-72 overflow-y-auto py-1">
                    <label v-for="col in auditColumns" :key="col.key"
                      class="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" :checked="isAuditColVisible(col.key)" @change="toggleAuditCol(col.key)"
                        class="accent-[#2F2E8B] cursor-pointer" />
                      <span class="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider">{{ col.label }}</span>
                    </label>
                  </div>
                  <div class="px-3 py-2 border-t border-gray-100 text-[8px] font-mono text-gray-400">
                    Applies to view and CSV / Excel / PDF / DOCX exports.
                  </div>
                </div>
              </div>
              <div v-if="canExportInventory" class="hidden md:flex items-center gap-1 bg-white border border-gray-200 rounded-none p-1">
                <button @click="exportAudit('csv')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 hover:bg-gray-100 disabled:opacity-40 flex items-center gap-1.5" title="Export CSV"><i class="fas fa-file-csv"></i> CSV</button>
                <button @click="exportAudit('excel')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 flex items-center gap-1.5" title="Export Excel"><i class="fas fa-file-excel"></i> Excel</button>
                <button @click="exportAudit('pdf')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-red-600 hover:bg-red-50 disabled:opacity-40 flex items-center gap-1.5" title="Export PDF"><i class="fas fa-file-pdf"></i> PDF</button>
                <button @click="exportAudit('docx')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 disabled:opacity-40 flex items-center gap-1.5" title="Export Word"><i class="fas fa-file-word"></i> DOCX</button>
              </div>
              <button @click="showAuditReportModal = false" class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Filters (collapsible on small screens) -->
          <div class="px-3 sm:px-6 py-2 sm:py-3 border-b border-gray-100 bg-white">
            <button @click="showAuditFiltersMobile = !showAuditFiltersMobile" class="sm:hidden w-full flex items-center justify-between px-2 py-1 text-[10px] font-mono font-black uppercase tracking-widest text-gray-600">
              <span><i class="fas fa-filter mr-1"></i> Filters</span>
              <i :class="showAuditFiltersMobile ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas text-[9px]"></i>
            </button>
            <div :class="['sm:flex sm:items-end sm:gap-3 sm:flex-wrap', showAuditFiltersMobile ? 'grid grid-cols-2 gap-2 mt-2' : 'hidden']">
            <div class="col-span-2 sm:col-span-3 lg:flex-1 lg:min-w-[180px]">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Search</label>
              <input v-model="auditSearch" type="text" placeholder="Product, SKU, category, brand, branch..."
                class="mt-1 w-full px-3 py-2 text-xs border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none font-mono" />
            </div>
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">From</label>
              <input v-model="auditDateFrom" type="date" class="mt-1 px-3 py-2 text-xs border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none font-mono" />
            </div>
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">To</label>
              <input v-model="auditDateTo" type="date" class="mt-1 px-3 py-2 text-xs border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none font-mono" />
            </div>
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Variance</label>
              <select v-model="auditVarianceFilter" class="mt-1 px-3 py-2 text-xs border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none font-mono">
                <option value="all">All</option>
                <option value="loss">Loss (negative)</option>
                <option value="gain">Gain (positive)</option>
                <option value="zero">No Variance</option>
                <option value="not_counted">Not Counted</option>
              </select>
            </div>
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Product</label>
              <select v-model="auditProductFilter" class="mt-1 px-3 py-2 text-xs border border-gray-200 focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none font-mono max-w-[180px]">
                <option value="">All</option>
                <option v-for="opt in auditProductOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <button @click="resetAuditFilters" class="col-span-2 sm:col-auto px-3 py-2 text-[9px] font-mono font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-none">
              <i class="fas fa-undo mr-1"></i> Reset
            </button>
            </div>
          </div>

          <!-- Summary strip (compact on mobile) -->
          <div class="px-3 sm:px-6 py-2 sm:py-3 border-b border-gray-100 bg-gray-50/40 grid grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 text-center md:text-left">
            <div><div class="text-[8px] sm:text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Records</div><div class="text-xs sm:text-sm font-black text-gray-900">{{ filteredAuditRows.length }}</div></div>
            <div><div class="text-[8px] sm:text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Products</div><div class="text-xs sm:text-sm font-black text-gray-900">{{ auditProductOptions.length }}</div></div>
            <div><div class="text-[8px] sm:text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Var Qty</div><div class="text-xs sm:text-sm font-black" :class="auditTotals.qty < 0 ? 'text-red-600' : 'text-green-600'">{{ auditTotals.qty }}</div></div>
            <div class="hidden md:block"><div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Total Variance Value</div><div class="text-sm font-black" :class="auditTotals.value < 0 ? 'text-red-600' : 'text-green-600'">{{ formatCurrency(auditTotals.value) }}</div></div>
            <div class="hidden md:block"><div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Date Range</div><div class="text-[10px] font-mono font-bold text-gray-700">{{ auditRangeLabel }}</div></div>
          </div>

          <!-- Bulk action bar (visible when at least one row is selected) -->
          <BulkActionsBar :count="selectionCount" @clear="clearAuditSelection" :show-delete="false">
            <template #actions>
              <div class="flex items-center gap-1">
                <label class="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">Status</label>
                <select v-model="bulkStatusChoice" class="px-2 py-1 text-[10px] border border-gray-300 rounded-none font-mono">
                  <option value="">-- pick --</option>
                  <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ s }}</option>
                </select>
                <button @click="applyBulkStatus" :disabled="!bulkStatusChoice || bulkBusy" class="px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest bg-[#2F2E8B] text-white disabled:opacity-40">Apply</button>
              </div>
              <div class="flex items-center gap-1">
                <label class="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500">Class</label>
                <select v-model="bulkClassChoice" class="px-2 py-1 text-[10px] border border-gray-300 rounded-none font-mono">
                  <option value="">-- pick --</option>
                  <option v-for="opt in CLASS_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
                <button @click="applyBulkClass" :disabled="!bulkClassChoice || bulkBusy" class="px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest bg-[#2F2E8B] text-white disabled:opacity-40">Apply</button>
              </div>
              <button v-if="canDeleteStock" @click="applyBulkDelete" :disabled="bulkBusy" class="px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest bg-red-600 text-white disabled:opacity-40 flex items-center gap-1" title="Delete selected entries (counted records only)">
                <i class="fas fa-trash"></i> Delete
              </button>
            </template>
          </BulkActionsBar>

          <!-- Scrollable Table -->
          <div class="relative flex-1 min-h-0 overflow-hidden">
            <div ref="auditScrollRef" class="audit-scroll h-full overflow-y-scroll overflow-x-auto">
              <table class="w-full font-mono text-[10px] min-w-[1100px]">
                <thead class="bg-gray-100 text-gray-500 sticky top-0 z-10 border-b border-gray-200">
                  <tr>
                    <th class="px-2 py-3 w-8 text-center sticky left-0 bg-gray-100 z-20">
                      <SelectAllCheckbox :model-value="isAllPageSelected(auditEligibleRows, { filterFn: r => Boolean(r.item_id) })" :indeterminate="isPartiallySelected(auditEligibleRows, { filterFn: r => Boolean(r.item_id) })" @update:model-value="(v) => toggleSelectAll(auditEligibleRows, { filterFn: r => Boolean(r.item_id) })" />
                    </th>
                    <th v-for="col in visibleAuditColumns" :key="col.key"
                      @click="sortAuditBy(col.key)"
                      class="px-3 py-3 font-black tracking-widest uppercase text-[9px] whitespace-nowrap cursor-pointer select-none hover:text-[#2F2E8B]"
                      :class="col.align === 'right' ? 'text-right' : 'text-left'">
                      {{ col.label }}
                      <span v-if="auditSort.key === col.key" class="ml-1">{{ auditSort.dir === 'asc' ? '\u25B2' : '\u25BC' }}</span>
                    </th>
                    <th class="px-2 py-3 w-10 text-center font-black tracking-widest uppercase text-[9px]">Del</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50 bg-white">
                  <tr v-if="auditLoading">
                    <td :colspan="visibleAuditColumns.length + 2" class="px-4 py-10 text-center text-gray-400 text-xs"><i class="fas fa-spinner fa-spin mr-2"></i>Loading audit history...</td>
                  </tr>
                  <tr v-else-if="!filteredAuditRows.length">
                    <td :colspan="visibleAuditColumns.length + 2" class="px-4 py-10 text-center text-gray-400 text-xs">No audit records match the current filters.</td>
                  </tr>
                  <template v-for="(row, idx) in filteredAuditRows" :key="row._rowKey || idx">
                  <tr class="hover:bg-indigo-50/30" :class="isSelected(row) ? 'bg-indigo-50/60' : ''">
                    <td class="px-2 py-2 w-8 text-center sticky left-0 bg-white z-[1]" :class="isSelected(row) ? '!bg-indigo-50/80' : ''">
                      <input type="checkbox" :checked="isSelected(row)" :disabled="!row.item_id" @change="toggleSelect(row, idx, $event)" class="accent-[#2F2E8B] cursor-pointer" />
                    </td>
                    <template v-for="col in visibleAuditColumns" :key="col.key">
                      <td v-if="col.key === 'status'" class="px-3 py-2 text-center whitespace-nowrap">
                        <span v-if="row._notCounted" class="px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest bg-gray-100 text-gray-400 border border-gray-200">Not Counted</span>
                        <select v-else :value="row.status || 'Submitted'"
                          @change="setStatus(row, $event.target.value)"
                          :disabled="row._busy || !row.item_id || (!canReviewVariance && !canApproveVariance)"
                          :class="statusBadgeClass(row)"
                          :title="statusTitle(row)">
                          <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ s }}</option>
                        </select>
                      </td>
                      <td v-else-if="col.key === 'varianceClass'" class="px-3 py-2 text-center whitespace-nowrap">
                        <span v-if="row._notCounted" class="text-gray-400 italic text-[9px]">—</span>
                        <div v-else class="inline-flex items-center gap-1">
                          <select :value="row.varianceClass || autoClass(row)"
                            @change="setVarianceClass(row, $event.target.value)"
                            :disabled="row._busy || !row.item_id || !canReviewVariance || hasBreakdown(row)"
                            :class="classBadgeClass(row)"
                            :title="hasBreakdown(row) ? breakdownTitle(row) : (canReviewVariance ? 'Click to classify variance' : 'Requires Inventory → Edit permission')">
                            <option v-if="hasBreakdown(row)" value="__split__">SPLIT ({{ breakdownTotal(row) }})</option>
                            <option v-for="opt in getClassOptionsForVariance(row.variance || 0)" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                          </select>
                          <button v-if="canReviewVariance && row.item_id && Math.abs(row.variance || 0) > 0"
                            @click.stop="openSplit(row)"
                            :disabled="row._busy"
                            class="px-1.5 py-1 text-[8px] font-mono font-black uppercase tracking-widest text-[#2F2E8B] border border-indigo-300 hover:bg-indigo-50 disabled:opacity-40"
                            :title="'Split variance across multiple classes'">
                            <i class="fas fa-code-branch"></i>
                          </button>
                          <button v-if="hasBreakdown(row)"
                            @click.stop="toggleExpandRow(row._rowKey)"
                            class="px-1.5 py-1 text-[8px] font-mono font-black uppercase tracking-widest border border-gray-300 hover:bg-gray-50"
                            :title="'Show/hide breakdown details'">
                            <i :class="expandedAuditRows.has(row._rowKey) ? 'fa-chevron-up' : 'fa-chevron-down'" class="fas"></i>
                          </button>
                        </div>
                      </td>
                      <td v-else :class="auditCellClass(row, col.key)">{{ auditCellValue(row, col.key) }}</td>
                    </template>
                    <!-- Delete action cell -->
                    <td class="px-2 py-2 text-center">
                      <button
                        v-if="!row._notCounted && canDeleteStock"
                        @click.stop="deleteAuditEntry(row)"
                        :disabled="row._busy"
                        class="px-1.5 py-1 text-[9px] font-mono font-black uppercase tracking-widest text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-40"
                        title="Delete this audit entry">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <!-- Expandable breakdown detail row -->
                  <tr v-if="expandedAuditRows.has(row._rowKey)" class="bg-indigo-50/20">
                    <td :colspan="visibleAuditColumns.length + 2" class="px-6 py-3">
                      <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-2">Variance Breakdown</div>
                      <table class="w-full text-xs font-mono">
                        <thead class="bg-gray-100 text-gray-500">
                          <tr>
                            <th class="px-3 py-2 text-left font-black uppercase tracking-widest text-[9px]">Class</th>
                            <th class="px-3 py-2 text-right font-black uppercase tracking-widest text-[9px]">Qty</th>
                            <th class="px-3 py-2 text-left font-black uppercase tracking-widest text-[9px]">Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(breakdown, bi) in (row.varianceBreakdown || [])" :key="bi" class="border-t border-gray-200">
                            <td class="px-3 py-2"><span :class="classBadgeClass({ varianceClass: breakdown.class })" class="px-2 py-0.5 text-[10px] uppercase">{{ breakdown.class }}</span></td>
                            <td class="px-3 py-2 text-right font-bold">{{ breakdown.qty }}</td>
                            <td class="px-3 py-2 text-gray-600">{{ breakdown.reason || '—' }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="mt-3 flex items-center gap-2">
                        <button v-if="canReviewVariance" @click="openSplit(row)" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest bg-[#2F2E8B] text-white">
                          <i class="fas fa-edit mr-1"></i> Edit Split
                        </button>
                        <button v-if="canReviewVariance" @click="openAdjustStock(row)" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest bg-amber-600 text-white">
                          <i class="fas fa-balance-scale mr-1"></i> Adjust Count
                        </button>
                      </div>
                    </td>
                  </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Footer with mobile exports -->
          <div class="px-3 sm:px-6 py-3 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center justify-between gap-2">
            <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ filteredAuditRows.length }} of {{ auditRowsAll.length }} records</div>
            <div v-if="canExportInventory" class="flex md:hidden items-center gap-1 flex-wrap">
              <button @click="exportAudit('csv')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 border border-gray-200 disabled:opacity-40 flex items-center gap-1.5"><i class="fas fa-file-csv"></i> CSV</button>
              <button @click="exportAudit('excel')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-emerald-700 border border-emerald-200 disabled:opacity-40 flex items-center gap-1.5"><i class="fas fa-file-excel"></i> Excel</button>
              <button @click="exportAudit('pdf')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-red-600 border border-red-200 disabled:opacity-40 flex items-center gap-1.5"><i class="fas fa-file-pdf"></i> PDF</button>
              <button @click="exportAudit('docx')" :disabled="!filteredAuditRows.length" class="px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-blue-600 border border-blue-200 disabled:opacity-40 flex items-center gap-1.5"><i class="fas fa-file-word"></i> DOCX</button>
            </div>
            <button @click="showAuditReportModal = false" class="px-6 py-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:text-gray-900">Close</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Variance Split Modal: distribute variance qty across multiple classes -->
  <Teleport to="body">
    <div v-if="splitEditor.open" class="fixed inset-0 z-[10010]">
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="closeSplit"></div>
      <div class="fixed inset-0 flex items-stretch sm:items-center justify-center p-0 sm:p-3 pointer-events-none">
        <div class="relative bg-white border border-gray-200 shadow-2xl w-full h-full sm:h-auto sm:max-w-md flex flex-col pointer-events-auto rounded-none">
          <div class="h-1.5 w-full bg-[#2F2E8B]"></div>
          <div class="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Split Variance</div>
              <div class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ splitEditor.productName || '---' }}</div>
            </div>
            <button @click="closeSplit" class="text-gray-400 hover:text-gray-900 w-9 h-9 flex items-center justify-center hover:bg-gray-100"><i class="fas fa-times"></i></button>
          </div>
          <div class="px-4 sm:px-6 py-3 grid grid-cols-3 gap-3 border-b border-gray-100 bg-gray-50/30">
            <div><div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Variance</div><div class="text-sm font-black" :class="splitEditor.variance < 0 ? 'text-red-600' : 'text-green-600'">{{ splitEditor.variance }}</div></div>
            <div><div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Allocated</div><div class="text-sm font-black text-[#2F2E8B]">{{ splitTotal }}</div></div>
            <div><div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Remaining</div><div class="text-sm font-black" :class="splitRemaining < 0 ? 'text-red-600' : 'text-gray-700'">{{ splitRemaining }}</div></div>
          </div>
          <div class="px-4 sm:px-6 py-3 max-h-[50vh] overflow-y-auto custom-scrollbar space-y-2">
            <div v-for="(line, i) in splitEditor.lines" :key="i" class="border border-gray-200 p-2 space-y-2">
              <div class="flex items-center gap-2">
                <select v-model="line.class" class="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-none font-mono">
                  <option v-for="opt in getClassOptionsForVariance(splitEditor.variance).filter(o => o.value !== 'none')" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
                <input v-model.number="line.qty" type="number" min="0" :max="Math.abs(splitEditor.variance)"
                  class="w-24 px-2 py-1.5 text-xs border border-gray-200 rounded-none font-mono text-right"
                  placeholder="Qty" />
                <button @click="splitEditor.lines.splice(i, 1)" class="w-8 h-8 text-gray-400 hover:text-red-600 flex items-center justify-center border border-gray-200 hover:border-red-300"><i class="fas fa-trash text-xs"></i></button>
              </div>
              <input v-model="line.reason" type="text" maxlength="500"
                class="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-none font-mono"
                :placeholder="splitEditor.variance < 0 ? 'Reason (e.g., damaged, expired, theft...)' : 'Reason (e.g., found, return, system error...)'" />
            </div>
            <button @click="addSplitLine" class="w-full py-1.5 text-[10px] font-mono font-black uppercase tracking-widest text-[#2F2E8B] border border-dashed border-indigo-300 hover:bg-indigo-50">
              <i class="fas fa-plus mr-1"></i> Add class
            </button>
          </div>
          <div class="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-2">
            <button @click="clearSplit" class="px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 border border-gray-200">Clear</button>
            <div class="flex items-center gap-2">
              <button @click="closeSplit" class="px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 hover:text-gray-900">Cancel</button>
              <button @click="saveSplit" :disabled="splitEditor.busy || splitRemaining < 0" class="px-4 py-2 text-[10px] font-mono font-black uppercase tracking-widest bg-[#2F2E8B] text-white disabled:opacity-40">
                <i class="fas fa-save mr-1"></i> Save split
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- Stock Adjustment Modal -->
  <Teleport to="body">
    <div v-if="stockAdjustEditor.open" class="fixed inset-0 z-[10010]">
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="closeAdjustStock"></div>
      <div class="fixed inset-0 flex items-stretch sm:items-center justify-center p-0 sm:p-3 pointer-events-none">
        <div class="relative bg-white border border-gray-200 shadow-2xl w-full h-full sm:h-auto sm:max-w-md flex flex-col pointer-events-auto rounded-none">
          <div class="h-1.5 w-full bg-amber-600"></div>
          <div class="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div>
              <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Adjust Stock Count</div>
              <div class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ stockAdjustEditor.row?.productName || '---' }}</div>
            </div>
            <button @click="closeAdjustStock" class="text-gray-400 hover:text-gray-900 w-9 h-9 flex items-center justify-center hover:bg-gray-100"><i class="fas fa-times"></i></button>
          </div>
          <div class="px-4 sm:px-6 py-4 space-y-4">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div><div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">System Qty</div><div class="text-base font-black text-gray-700">{{ stockAdjustEditor.row?.systemQty || 0 }}</div></div>
              <div><div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">Current Count</div><div class="text-base font-black text-gray-700">{{ stockAdjustEditor.row?.qty || 0 }}</div></div>
            </div>
            <div>
              <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">New Physical Count</label>
              <input v-model.number="stockAdjustEditor.newCount" type="number" min="0"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-none font-mono font-bold text-right" />
              <div class="mt-1 text-xs text-gray-500 font-mono">
                New variance: <span :class="(stockAdjustEditor.newCount - (stockAdjustEditor.row?.systemQty || 0)) < 0 ? 'text-red-600' : 'text-green-600'" class="font-bold">
                  {{ stockAdjustEditor.newCount - (stockAdjustEditor.row?.systemQty || 0) }}
                </span>
              </div>
            </div>
            <div>
              <label class="block text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1">Reason for Adjustment</label>
              <textarea v-model="stockAdjustEditor.reason" maxlength="500" rows="3"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-none font-mono resize-none"
                placeholder="e.g., Items were miscounted, additional stock found in storage, damaged items removed..."></textarea>
            </div>
          </div>
          <div class="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-2">
            <button @click="closeAdjustStock" class="px-3 py-2 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 hover:text-gray-900">Cancel</button>
            <button @click="saveAdjustStock" :disabled="stockAdjustEditor.busy" class="px-4 py-2 text-[10px] font-mono font-black uppercase tracking-widest bg-amber-600 text-white disabled:opacity-40">
              <i class="fas fa-check mr-1"></i> Apply Adjustment
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== Camera Barcode Scanner Overlay ===== -->
    <div v-if="showCameraScanner" class="fixed inset-0 z-[10100] flex items-center justify-center" style="background:rgba(0,0,0,0.70)" @click.self="closeCameraScanner">
      <div class="bg-white border-2 border-[#2F2E8B] shadow-2xl flex flex-col" style="width:400px;max-height:92vh;">
        <div class="h-1 w-full bg-[#2F2E8B]"></div>
        <!-- Panel header -->
        <div class="px-4 py-2.5 flex items-center justify-between bg-[#2F2E8B]/5 border-b border-[#2F2E8B]/20">
          <div class="flex items-center gap-2">
            <i class="fas fa-camera text-[#2F2E8B]"></i>
            <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Camera Scanner</span>
            <span v-if="cameraScannerSupported" class="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-600 uppercase tracking-widest">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
            </span>
          </div>
          <button @click="closeCameraScanner" class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700"><i class="fas fa-times"></i></button>
        </div>

        <!-- Not supported -->
        <div v-if="!cameraScannerSupported" class="p-6 text-center space-y-3">
          <i class="fas fa-exclamation-triangle text-amber-500 text-3xl"></i>
          <p class="text-[10px] font-mono text-gray-600 normal-case leading-relaxed">
            Camera barcode detection is not supported in this browser.<br/>
            Please use <strong>Chrome</strong> or <strong>Edge</strong>, or use the manual Scan input.
          </p>
          <button @click="closeCameraScanner" class="px-4 py-2 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest">Close</button>
        </div>

        <template v-else>
          <!-- Live video feed -->
          <div class="relative bg-black flex-shrink-0" style="height:220px">
            <video ref="cameraVideoRef" autoplay playsinline muted class="w-full h-full object-cover"></video>
            <!-- Scanning reticle -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="border-2 border-white/90" style="width:80%;height:55%;box-shadow:0 0 0 9999px rgba(0,0,0,0.38)"></div>
            </div>
            <!-- Last detected code -->
            <div class="absolute bottom-2 left-0 right-0 flex justify-center">
              <span class="bg-black/65 text-white text-[9px] font-mono px-2.5 py-1 uppercase tracking-widest">
                {{ cameraLastCode ? `Detected: ${cameraLastCode}` : 'Aim camera at barcode' }}
              </span>
            </div>
          </div>

          <!-- Hint -->
          <div class="px-3 py-1.5 bg-[#2F2E8B]/5 border-b border-[#2F2E8B]/10">
            <span class="text-[9px] font-mono text-gray-500 normal-case">Scanned items accumulate below. Adjust quantities then click <strong>Apply</strong>.</span>
          </div>

          <!-- Scan list -->
          <div class="overflow-y-auto flex-1" style="max-height:260px">
            <div v-if="!cameraScanList.length" class="py-8 flex flex-col items-center gap-2 text-gray-400">
              <i class="fas fa-barcode text-2xl"></i>
              <span class="text-[9px] font-mono uppercase tracking-widest">No items scanned yet</span>
            </div>
            <div v-else>
              <div class="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <span class="text-[9px] font-mono font-black text-gray-600 uppercase tracking-widest">{{ cameraScanList.length }} item(s)</span>
                <button @click="cameraScanList.length = 0" class="text-[9px] font-mono text-red-500 hover:text-red-700 uppercase tracking-widest"><i class="fas fa-trash-alt mr-1"></i>Clear All</button>
              </div>
              <div v-for="(row, idx) in cameraScanList" :key="row.id" class="px-3 py-2 flex items-center gap-2 border-b border-gray-50 hover:bg-gray-50/70">
                <span class="flex-1 text-[10px] font-mono font-black text-gray-800 truncate" :title="row.name">{{ row.name }}</span>
                <div class="flex items-center gap-0.5 shrink-0">
                  <button @click="row.qty = Math.max(1, row.qty - 1)" class="w-6 h-6 border border-gray-300 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-xs flex items-center justify-center font-black">−</button>
                  <input v-model.number="row.qty" type="number" min="1" class="w-12 border border-gray-200 text-center text-[11px] font-mono font-black h-6 focus:ring-1 focus:ring-[#2F2E8B] outline-none" />
                  <button @click="row.qty++" class="w-6 h-6 border border-gray-300 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-xs flex items-center justify-center font-black">+</button>
                  <button @click="cameraScanList.splice(idx, 1)" class="w-6 h-6 text-red-400 hover:text-red-600 text-xs flex items-center justify-center ml-1"><i class="fas fa-times"></i></button>
                </div>
              </div>
            </div>
          </div>

          <!-- Action row -->
          <div class="px-4 py-3 border-t border-gray-100 flex items-center gap-2 bg-gray-50/50">
            <button @click="closeCameraScanner" class="flex-1 py-2 border border-gray-200 text-[9px] font-mono font-black uppercase tracking-widest text-gray-500 hover:border-gray-400 hover:text-gray-700">Cancel</button>
            <button @click="applyCameraScanList" :disabled="!cameraScanList.length" class="flex-2 px-5 py-2 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest disabled:opacity-40 hover:bg-[#1D226B] flex items-center gap-1.5">
              <i class="fas fa-check"></i> Apply{{ cameraScanList.length ? ` (${cameraScanList.length})` : '' }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, reactive, toRefs, watch, ref, onMounted, onErrorCaptured, nextTick } from 'vue';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT';
import { useCurrency } from '@/composables/useCurrency';
import { useRBAC } from '@/composables/useRBAC';
import * as XLSX from 'xlsx';
import { BarcodeDetector as BarcodeDetectorPolyfill } from 'barcode-detector/ponyfill';
import { useBulkSelect } from '@/composables/useBulkSelect';
// Use native BarcodeDetector on Android/ChromeOS, polyfill everywhere else (Windows/Mac Chrome).
const _BarcodeDetector = (typeof window !== 'undefined' && 'BarcodeDetector' in window)
  ? window.BarcodeDetector
  : BarcodeDetectorPolyfill;

const { formatCurrency } = useCurrency();

const componentError = ref(null);
onErrorCaptured((err, instance, info) => {
  console.error('StockCountModal error:', err, info);
  componentError.value = err.message;
  return false;
});

const props = defineProps({
  items: { type: Array, default: () => [] },
  branches: { type: Array, default: () => [] }
});
const emit = defineEmits(['close', 'saved']);

const { getTenantId, getBranches, getToken } = decodeJWT();
const { canRead, canWrite, canEdit, canDelete, canApprove, canExport, initializeRBAC } = useRBAC();
const canViewInventory = computed(() => canRead('inventory'));
const canAddStock = computed(() => canWrite('inventory'));
const canCountStock = computed(() => canEdit('inventory'));
const canDeleteStock = computed(() => canDelete('inventory'));
const canExportInventory = computed(() => canExport('inventory'));
const canReviewVariance = computed(() => canEdit('inventory'));
const canApproveVariance = computed(() => canApprove('inventory'));

const search = ref('');
const showOnlyChanges = ref(false);
const saving = ref(false);
const stockCountDate = ref(new Date().toISOString().split('T')[0]);
const mode = ref('count');

// --- Transfer State ---
const transferSourceBranch = ref('');
const transferDestBranch = ref('');
const transferItems = ref([]);
const transferLoading = ref(false);
const transferSearch = ref('');

// --- Stock Count / Restock Branch State ---
const countBranch = ref('');
const countBranchItems = ref([]);
const countBranchLoading = ref(false);

// --- Column Visibility (persisted per mode in localStorage) ---
const COL_STORAGE_KEY = 'stockCountModal.columnVisibility.v1';
const DEFAULT_COL_VIS = {
  itemName: true, sku: true, systemQty: true, buyPrice: true, sellPrice: true,
  countedQty: true, variance: true, valueDelta: true,
  // transfer-mode columns
  transferAvailable: true, transferBuyPrice: true, transferSellPrice: true,
  transferQty: true, transferRemaining: true
};
const columnVisibility = reactive({ ...DEFAULT_COL_VIS, ...(() => {
  try { return JSON.parse(localStorage.getItem(COL_STORAGE_KEY) || '{}'); } catch { return {}; }
})() });
const showColumnPicker = ref(false);
watch(columnVisibility, () => {
  try { localStorage.setItem(COL_STORAGE_KEY, JSON.stringify(columnVisibility)); } catch {}
}, { deep: true });
const isColVisible = (key) => columnVisibility[key] !== false;
function resetColumns() { Object.keys(DEFAULT_COL_VIS).forEach(k => columnVisibility[k] = true); }

// --- Barcode Scanner ---
const scannerActive = ref(false);
const scannerInput = ref('');
const scannerInputRef = ref(null);
const scanFeedback = ref(null); // { type: 'success'|'error', message, ts }
const scannedHighlightId = ref(null);
let scanFeedbackTimer = null;
function showScanFeedback(type, message) {
  scanFeedback.value = { type, message, ts: Date.now() };
  if (scanFeedbackTimer) clearTimeout(scanFeedbackTimer);
  scanFeedbackTimer = setTimeout(() => { scanFeedback.value = null; }, 2500);
}
function toggleScanner() {
  scannerActive.value = !scannerActive.value;
  if (scannerActive.value) {
    setTimeout(() => { try { scannerInputRef.value?.focus(); } catch {} }, 50);
  }
}
function onScanSubmit() {
  const code = String(scannerInput.value || '').trim();
  scannerInput.value = '';
  if (!code) return;
  // Match by sku or partNumber (case-insensitive) or exact name
  const codeLower = code.toLowerCase();
  let target = null;
  if (mode.value === 'transfer') {
    target = transferItems.value.find(i =>
      String(i.sku || '').toLowerCase() === codeLower ||
      String(i.partNumber || '').toLowerCase() === codeLower ||
      String(i.name || '').toLowerCase() === codeLower
    );
    if (!target) { showScanFeedback('error', `No item matches "${code}"`); return; }
    const current = Number(target.quantity || 0);
    const max = Number(target.stockQty || 0);
    if (current >= max) { showScanFeedback('error', `${target.name} — max available reached`); return; }
    target.quantity = current + 1;
  } else {
    target = normalized.value.find(i =>
      String(i.sku || '').toLowerCase() === codeLower ||
      String(i.partNumber || '').toLowerCase() === codeLower ||
      String(i.name || '').toLowerCase() === codeLower
    );
    if (!target) { showScanFeedback('error', `No item matches "${code}"`); return; }
    const current = Number(counts[target.id] ?? (mode.value === 'restock' ? 0 : target.systemQty)) || 0;
    counts[target.id] = current + 1;
  }
  scannedHighlightId.value = target.id;
  showScanFeedback('success', `+1 ${target.name}`);
  // Scroll into view
  setTimeout(() => {
    try { document.getElementById(`stock-row-${target.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch {}
  }, 30);
  // Refocus scanner
  setTimeout(() => { try { scannerInputRef.value?.focus(); } catch {} }, 60);
}

// -------- Camera Barcode Scanner --------
const showCameraScanner = ref(false);
const cameraVideoRef = ref(null);
const cameraScanList = ref([]); // [{ id, name, qty }]
const cameraScannerSupported = ref(false);
const cameraLastCode = ref('');
let _cameraStream = null;
let _cameraRAF = null;
let _cameraLastTs = 0;
let _cameraLastVal = '';

async function openCameraScanner() {
  if (mode.value !== 'transfer' && !countBranch.value) {
    alert('Please select a branch first before using the camera scanner.');
    return;
  }
  // Always supported — polyfill handles desktop Chrome where native BarcodeDetector is absent.
  cameraScannerSupported.value = true;
  showCameraScanner.value = true;
  await nextTick();
  try {
    _cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 640 }, height: { ideal: 480 } }
    });
    if (cameraVideoRef.value) {
      cameraVideoRef.value.srcObject = _cameraStream;
      await cameraVideoRef.value.play().catch(() => {});
    }
    _startCameraDetection();
  } catch (err) {
    const msg = err && err.name === 'NotAllowedError'
      ? 'Camera access denied — allow camera permission in browser settings'
      : 'Could not access camera — make sure no other app is using it';
    closeCameraScanner();
    alert(msg);
  }
}

function closeCameraScanner() {
  _stopCameraDetection();
  if (_cameraStream) { _cameraStream.getTracks().forEach(t => t.stop()); _cameraStream = null; }
  showCameraScanner.value = false;
  cameraLastCode.value = '';
}

function _startCameraDetection() {
  let detector;
  try {
    detector = new _BarcodeDetector({
      formats: ['ean_13','ean_8','code_128','code_39','qr_code','upc_a','upc_e','itf','data_matrix','codabar']
    });
  } catch { return; }
  async function loop() {
    if (!showCameraScanner.value || !cameraVideoRef.value) return;
    try {
      const codes = await detector.detect(cameraVideoRef.value);
      if (codes.length) {
        const val = codes[0].rawValue;
        const now = Date.now();
        if (val !== _cameraLastVal || now - _cameraLastTs > 2000) {
          _cameraLastVal = val;
          _cameraLastTs = now;
          cameraLastCode.value = val;
          _handleCameraCode(val);
        }
      }
    } catch {}
    _cameraRAF = requestAnimationFrame(loop);
  }
  _cameraRAF = requestAnimationFrame(loop);
}

function _stopCameraDetection() {
  if (_cameraRAF) { cancelAnimationFrame(_cameraRAF); _cameraRAF = null; }
}

function _handleCameraCode(code) {
  const low = code.toLowerCase();
  const target = normalized.value.find(i =>
    String(i.sku || '').toLowerCase() === low ||
    String(i.partNumber || '').toLowerCase() === low ||
    String(i.name || '').toLowerCase() === low
  );
  if (!target) { showScanFeedback('error', `No match: "${code}"`); return; }
  const existing = cameraScanList.value.find(r => r.id === target.id);
  if (existing) { existing.qty++; }
  else { cameraScanList.value.push({ id: target.id, name: target.name, qty: 1 }); }
  showScanFeedback('success', `+1 ${target.name}`);
}

function applyCameraScanList() {
  if (!cameraScanList.value.length) return;
  for (const row of cameraScanList.value) {
    if (mode.value === 'restock') {
      counts[row.id] = Number(counts[row.id] || 0) + row.qty;
    } else {
      // stock count: set physical count (accumulate if already partially counted)
      counts[row.id] = Number(counts[row.id] ?? 0) + row.qty;
    }
  }
  showScanFeedback('success', `Applied ${cameraScanList.value.length} item(s) from camera scan`);
  cameraScanList.value = [];
  closeCameraScanner();
}

// --- Bulk Import (CSV/XLSX) ---
const showImportPanel = ref(false);
const importMatchMode = ref('either'); // 'either' | 'both' | 'name' | 'sku'
const importMode = ref('overwrite'); // 'overwrite' | 'add'
const importRows = ref([]); // [{ name, sku, quantity, _matched, _matchedItem, _conflict }]
const importParseError = ref('');
const importFileName = ref('');
const importSourceHeaders = ref([]);
const importFieldMap = reactive({ name: '', sku: '', quantity: '' });
const importHasPreview = computed(() => importRows.value.length > 0);
const importStats = computed(() => {
  const total = importRows.value.length;
  const matched = importRows.value.filter(r => (r._candidates?.length || (r._matchedItem ? 1 : 0)) > 0).length;
  const conflicts = importRows.value.filter(r => r._conflict).length;
  const unmatched = importRows.value.filter(r => !(r._candidates?.length) && !r._matchedItem).length;
  return { total, matched, conflicts, unmatched };
});
function resetImport() {
  importRows.value = [];
  importParseError.value = '';
  importFileName.value = '';
  importSourceHeaders.value = [];
  importFieldMap.name = '';
  importFieldMap.sku = '';
  importFieldMap.quantity = '';
}
function exportUnmatchedImport() {
  const unmatched = importRows.value.filter(r => !(r._candidates?.length) && !r._matchedItem);
  if (!unmatched.length) return;
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const headers = ['#', 'Name', 'SKU', 'Quantity', 'Reason'];
  const data = unmatched.map((row, i) => [
    row.idx ?? (i + 1),
    row.name || '',
    row.sku || '',
    row.quantity ?? '',
    'Not found in inventory — item may not exist in selected branch',
  ]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  ws['!cols'] = [
    { wch: 5 },
    { wch: 30 },
    { wch: 20 },
    { wch: 12 },
    { wch: 55 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Unmatched Audit Items');
  XLSX.writeFile(wb, `unmatched-stock-audit-${timestamp}.xlsx`);
}
function normalizeImportHeader(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}
function detectImportHeader(headers, candidates) {
  const normalized = headers.map(h => [h, normalizeImportHeader(h)]);
  for (const candidate of candidates) {
    const exact = normalized.find(([, key]) => key === candidate);
    if (exact) return exact[0];
  }
  for (const candidate of candidates) {
    const partial = normalized.find(([, key]) => key.includes(candidate) || candidate.includes(key));
    if (partial) return partial[0];
  }
  return '';
}
function applyImportMappings() {
  importRows.value = importRows.value.map(r => {
    const source = r._source || {};
    const name = importFieldMap.name ? String(source[importFieldMap.name] || '').trim() : '';
    const sku = importFieldMap.sku ? String(source[importFieldMap.sku] || '').trim() : '';
    const rawQty = importFieldMap.quantity ? source[importFieldMap.quantity] : '';
    const quantity = Number(String(rawQty).replace(/[^0-9.-]/g, ''));
    const valid = !isNaN(quantity) && quantity >= 0 && (name || sku);
    return {
      ...r,
      name,
      sku,
      quantity: valid ? quantity : null,
      _error: valid ? '' : 'Invalid row (need mapped name/SKU and a non-negative qty)',
    };
  });
  runImportMatching();
}
watch(importFieldMap, applyImportMappings, { deep: true });
async function onImportFile(ev) {
  const file = ev.target?.files?.[0];
  if (!file) return;
  importFileName.value = file.name;
  importParseError.value = '';
  try {
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
    if (!rows.length) throw new Error('File is empty');
    const headers = Object.keys(rows[0] || {});
    if (!headers.length) throw new Error('No header row found');

    importSourceHeaders.value = headers;
    importFieldMap.name = detectImportHeader(headers, ['name', 'itemname', 'item', 'product', 'productname', 'description']) || '';
    importFieldMap.sku = detectImportHeader(headers, ['sku', 'barcode', 'partnumber', 'part', 'code']) || '';
    importFieldMap.quantity = detectImportHeader(headers, ['quantity', 'qty', 'count', 'countedqty', 'counted', 'physicalcount', 'physical', 'addqty', 'restock', 'amount']) || '';

    importRows.value = rows.map((r, idx) => ({
      idx: idx + 2,
      _source: r,
      name: '',
      sku: '',
      quantity: null,
      _matchedItem: null,
      _conflict: false,
      _error: '',
    }));

    applyImportMappings();
  } catch (e) {
    importParseError.value = e.message || 'Failed to parse file';
    importRows.value = [];
  } finally {
    if (ev.target) ev.target.value = '';
  }
}
function runImportMatching() {
  const items = normalized.value;
  for (const r of importRows.value) {
    r._matchedItem = null;
    r._candidates = [];
    r._conflict = false;
    if (r.quantity === null || r.quantity === undefined) continue;
    const nameLower = (r.name || '').toLowerCase();
    const skuLower = (r.sku || '').toLowerCase();
    const matchByName = nameLower ? items.filter(i => String(i.name || '').toLowerCase() === nameLower) : [];
    const matchBySku = skuLower ? items.filter(i =>
      String(i.sku || '').toLowerCase() === skuLower ||
      String(i.partNumber || '').toLowerCase() === skuLower
    ) : [];
    let candidates = [];
    switch (importMatchMode.value) {
      case 'name': candidates = matchByName; break;
      case 'sku': candidates = matchBySku; break;
      case 'both': {
        const skuIds = new Set(matchBySku.map(i => i.id));
        candidates = matchByName.filter(i => skuIds.has(i.id));
        break;
      }
      case 'either':
      default: {
        const seen = new Set();
        for (const m of [...matchBySku, ...matchByName]) {
          if (!seen.has(m.id)) {
            seen.add(m.id);
            candidates.push(m);
          }
        }
      }
    }
    r._candidates = candidates;
    r._matchedItem = candidates[0] || null;
    r._conflict = candidates.length > 1;
  }
}
watch(importMatchMode, runImportMatching);
function applyImport() {
  if (!canCountStock.value) { alert('Requires Inventory → Edit permission.'); return; }
  // Branch must be selected first — same gate as the manual table.
  if (mode.value !== 'transfer' && !countBranch.value) {
    alert('Please select a branch first. Bulk import follows the selected branch, just like the manual stock count.');
    return;
  }
  // Re-run matching against the CURRENT branch items so we use fresh references.
  runImportMatching();

  let applied = 0;
  let unmatched = 0;
  const touchedIds = [];
  const validIds = new Set(normalized.value.map(i => i.id));
  const itemById = new Map(normalized.value.map(i => [i.id, i]));
  const aggregatedByItem = new Map();

  for (const r of importRows.value) {
    if (r.quantity === null) { unmatched++; continue; }
    const targets = (r._candidates && r._candidates.length)
      ? r._candidates
      : (r._matchedItem ? [r._matchedItem] : []);
    if (!targets.length) { unmatched++; continue; }
    let matchedAny = false;
    for (const item of targets) {
      if (!validIds.has(item.id)) continue; // skip items not in current branch
      aggregatedByItem.set(item.id, Number(aggregatedByItem.get(item.id) || 0) + Number(r.quantity || 0));
      matchedAny = true;
    }
    if (!matchedAny) unmatched++;
  }

  for (const [itemId, importedTotal] of aggregatedByItem.entries()) {
    const item = itemById.get(itemId);
    if (!item) continue;
    if (mode.value === 'restock') {
      const existing = Number(counts[itemId] || 0);
      counts[itemId] = importMode.value === 'add' ? existing + importedTotal : importedTotal;
    } else {
      const existing = Number(counts[itemId] ?? item.systemQty) || 0;
      counts[itemId] = importMode.value === 'add' ? existing + importedTotal : importedTotal;
    }
    touchedIds.push(itemId);
    applied++;
  }

  if (applied === 0) {
    const branchName = countBranch.value === 'main'
      ? 'Main Branch'
      : (allBranches.value?.find(b => (b._id || b.id) === countBranch.value)?.name || countBranch.value);
    alert(
      `No items matched in "${branchName}".\n\n` +
      `Imported rows: ${importRows.value.length}\n` +
      `Unmatched: ${unmatched}\n\n` +
      `Make sure the items in your file exist in the selected branch, ` +
      `and that the name/SKU columns match. Try switching match mode (Name / SKU / Either).`
    );
    return;
  }

  // Surface unmatched rows but keep the matched ones applied.
  showScanFeedback('success', `Applied ${applied} item(s)${unmatched ? ` (${unmatched} unmatched)` : ''} — duplicate import rows were aggregated.`);
  showImportPanel.value = false;
  resetImport();

  // Scroll the first touched row into view so the user can see the populated field.
  nextTick(() => {
    if (showOnlyChanges.value === false) {
      const first = touchedIds[0];
      const el = first ? document.querySelector(`[data-row-id="${CSS.escape(String(first))}"]`) : null;
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}
function downloadImportTemplate() {
  const isRestock = mode.value === 'restock';
  const headers = ['name', 'sku', isRestock ? 'add_qty' : 'counted_qty'];
  const sample = normalized.value.slice(0, 3).map(r => [r.name, r.sku || r.partNumber || '', isRestock ? 0 : r.systemQty]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...sample]);
  ws['!cols'] = [{ wch: 30 }, { wch: 18 }, { wch: 15 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, `stock-import-template-${mode.value}.xlsx`);
}

async function fetchCountBranchItems(branchId) {
  if (!branchId) {
    countBranchItems.value = [];
    return;
  }
  countBranchLoading.value = true;
  try {
    const tenantId = getTenantId?.();
    const res = await fetch(
      `${API_BASE_URL}/inventory?tenant_id=${tenantId}&branch_id=${encodeURIComponent(branchId)}`,
      { headers: { 'Authorization': `Bearer ${getToken()}` } }
    );
    if (!res.ok) throw new Error(`Failed to fetch branch items: ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.items || []);
    const filtered = branchId === 'main'
      ? items.filter(i => !i.branch_id || i.branch_id === 'main')
      : items.filter(i => i.branch_id === branchId);
    countBranchItems.value = filtered.filter(
      i => String(i.type || '').toLowerCase() !== 'service'
    );
  } catch (e) {
    console.error('Error fetching count branch items:', e);
    countBranchItems.value = [];
  } finally {
    countBranchLoading.value = false;
  }
}

// Reset counts when branch changes in count/restock mode
watch(countBranch, (val) => {
  // Clear existing counts so they re-initialise for new items
  Object.keys(counts).forEach(k => delete counts[k]);
  Object.keys(buyingPrices).forEach(k => delete buyingPrices[k]);
  Object.keys(sellingPrices).forEach(k => delete sellingPrices[k]);
  Object.keys(skus).forEach(k => delete skus[k]);
  Object.keys(originalCounts).forEach(k => delete originalCounts[k]);
  Object.keys(originalBuyingPrices).forEach(k => delete originalBuyingPrices[k]);
  Object.keys(originalSellingPrices).forEach(k => delete originalSellingPrices[k]);
  Object.keys(originalSkus).forEach(k => delete originalSkus[k]);
  // Invalidate cached audit report so it re-fetches with the new branch scope
  auditRowsAll.value = [];
  fetchCountBranchItems(val);
});

const allBranches = computed(() => {
  // Use API branches first, fallback to props, then localStorage
  if (branchesFromApi.value && branchesFromApi.value.length > 0) {
    return branchesFromApi.value;
  }
  const b = props.branches && props.branches.length > 0 ? props.branches : (getBranches() || []);
  return b;
});

const filteredTransferItems = computed(() => {
  const q = (transferSearch.value || '').toLowerCase();
  if (!q) return transferItems.value;
  return transferItems.value.filter(item => {
    const txt = [item.name, item.category, item.type, item.sku].filter(Boolean).join(' ').toLowerCase();
    return txt.includes(q);
  });
});

async function fetchBranchItems(branchId) {
  if (!branchId) {
    transferItems.value = [];
    return;
  }
  transferLoading.value = true;
  try {
    const tenantId = getTenantId?.();
    const branchParam = branchId === 'main' ? 'main' : branchId;
    const res = await fetch(`${API_BASE_URL}/inventory?tenant_id=${tenantId}&branch_id=${branchParam}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error(`Failed to fetch branch items: ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.items || []);
    // Filter to items that actually belong to this specific branch (not inherited main items when viewing a sub-branch)
    const branchItems = branchId === 'main'
      ? items.filter(i => !i.branch_id || i.branch_id === 'main')
      : items.filter(i => i.branch_id === branchId);
    transferItems.value = branchItems
      .filter(i => String(i.type || '').toLowerCase() !== 'service')
      .map(i => ({
        id: i._id || i.id,
        name: i.name,
        category: i.category || '',
        type: i.type || '',
        sku: i.sku || i.partNumber || '',
        stockQty: parseFloat(i.stockQty || 0),
        buyingPrice: parseFloat(i.buyingPrice || i.equipmentBuyingPrice || 0),
        sellingPrice: parseFloat(i.sellingPrice || i.equipmentPrice || i.price || 0),
        quantity: 0
      }));
  } catch (e) {
    console.error('Error fetching branch items:', e);
    transferItems.value = [];
  } finally {
    transferLoading.value = false;
  }
}

// Reset transfer state when destination changes to avoid stale selections
watch(transferSourceBranch, () => {
  transferDestBranch.value = '';
});

async function saveTransfer() {
  if (!canCountStock.value) { alert('Requires Inventory → Edit permission.'); return; }
  const tenantId = getTenantId?.();
  if (!tenantId) return alert('Missing tenant id');
  if (!transferSourceBranch.value || !transferDestBranch.value) return alert('Select both source and destination branches');

  const itemsToTransfer = transferItems.value.filter(t => t.quantity > 0);
  if (!itemsToTransfer.length) return;

  // Validate quantities
  for (const item of itemsToTransfer) {
    if (item.quantity > item.stockQty) {
      return alert(`Cannot transfer more than available for "${item.name}" (${item.stockQty} available)`);
    }
  }

  saving.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/inventory/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify({
        tenant_id: tenantId,
        source_branch: transferSourceBranch.value,
        destination_branch: transferDestBranch.value,
        items: itemsToTransfer.map(i => ({
          item_id: i.id,
          quantity: i.quantity,
          name: i.name
        }))
      })
    });
    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      throw new Error(msg || `Transfer failed: ${res.status}`);
    }
    const result = await res.json();
    const errors = (result.results || []).filter(r => r.status === 'error');
    if (errors.length > 0) {
      alert(`Some transfers failed:\n${errors.map(e => `${e.message}`).join('\n')}`);
    }
    emit('saved');
    emit('close');
  } catch (e) {
    console.error(e);
    alert(e.message || 'Transfer failed');
  } finally {
    saving.value = false;
  }
}

const counts = reactive({});
const buyingPrices = reactive({});
const sellingPrices = reactive({});
const skus = reactive({});

const originalCounts = reactive({});
const originalBuyingPrices = reactive({});
const originalSellingPrices = reactive({});
const originalSkus = reactive({});

const normalized = computed(() => {
  // Use branch-specific items when a branch is selected in count/restock mode
  const sourceItems = countBranch.value
    ? countBranchItems.value
    : (props.items || []);
  return sourceItems
    .filter(i => i && String(i.type || '').toLowerCase() !== 'service')
    .map(i => {
      const systemQty = toNumberSafe(i.stockQty ?? i.equipmentQty ?? 0);
      const t = String(i.type || '').toLowerCase();
      let costCandidate;
      if (t === 'equipment') {
        costCandidate = firstNonEmpty([i.equipmentPrice, i.price, i.sellingPrice, i.buyingPrice, i.costPrice]);
      } else {
        costCandidate = firstNonEmpty([i.buyingPrice, i.costPrice, i.price, i.sellingPrice, i.equipmentPrice]);
      }
      const cost = toNumberSafe(costCandidate);
      const buyingPrice = toNumberSafe(i.buyingPrice ?? i.equipmentBuyingPrice ?? 0);
      const sellingPrice = toNumberSafe(i.sellingPrice ?? i.equipmentPrice ?? i.price ?? 0);

      return {
        id: i._id || i.id,
        name: i.name,
        category: i.category,
        type: i.type,
        sku: i.sku,
        partNumber: i.partNumber,
        systemQty,
        cost,
        buyingPrice,
        sellingPrice
      };
    });
});

watch(normalized, (rows) => {
  for (const r of rows) {
    if (counts[r.id] === undefined) {
      // In stock count mode, start blank (null) so the field is empty until user enters a value.
      // In restock mode, default to 0 (user enters qty to add).
      counts[r.id] = mode.value === 'restock' ? 0 : null;
    }
    if (buyingPrices[r.id] === undefined) {
      buyingPrices[r.id] = r.buyingPrice;
    }
    if (sellingPrices[r.id] === undefined) {
      sellingPrices[r.id] = r.sellingPrice;
    }
    if (skus[r.id] === undefined) {
      skus[r.id] = r.sku || r.partNumber || '';
    }

    if (originalCounts[r.id] === undefined) {
      originalCounts[r.id] = mode.value === 'restock' ? 0 : null;
    }
    if (originalBuyingPrices[r.id] === undefined) {
      originalBuyingPrices[r.id] = r.buyingPrice;
    }
    if (originalSellingPrices[r.id] === undefined) {
      originalSellingPrices[r.id] = r.sellingPrice;
    }
    if (originalSkus[r.id] === undefined) {
      originalSkus[r.id] = r.sku || r.partNumber || '';
    }
  }
}, { immediate: true });

watch(mode, (newMode) => {
  for (const r of normalized.value) {
    const defaultQty = newMode === 'restock' ? 0 : null;
    counts[r.id] = defaultQty;
    originalCounts[r.id] = defaultQty;

    if (newMode === 'restock') {
      buyingPrices[r.id] = r.buyingPrice;
      sellingPrices[r.id] = r.sellingPrice;
      originalBuyingPrices[r.id] = r.buyingPrice;
      originalSellingPrices[r.id] = r.sellingPrice;
    }
  }
});

function isQtyDirty(row) {
  if (mode.value === 'restock') {
    return (counts[row.id] || 0) !== 0;
  }
  // Treat any explicit count as a persisted stock-count entry, including zero variance.
  return counts[row.id] != null;
}

function isBuyPriceDirty(row) {
  return Number(buyingPrices[row.id] ?? row.buyingPrice) !== Number(originalBuyingPrices[row.id] ?? row.buyingPrice);
}

function isSellPriceDirty(row) {
  return Number(sellingPrices[row.id] ?? row.sellingPrice) !== Number(originalSellingPrices[row.id] ?? row.sellingPrice);
}

function isSkuDirty(row) {
  return (skus[row.id] || '') !== (originalSkus[row.id] || '');
}

function isRowDirty(row) {
  if (mode.value === 'restock') {
    return isQtyDirty(row) || isBuyPriceDirty(row) || isSellPriceDirty(row) || isSkuDirty(row);
  }
  return isQtyDirty(row) || isSkuDirty(row);
}

const changedRows = computed(() => normalized.value.filter(r => isRowDirty(r)));

const priceOnlyChanges = computed(() =>
  normalized.value.filter(r => !isQtyDirty(r) && (isBuyPriceDirty(r) || isSellPriceDirty(r))).length
);

const filtered = computed(() => {
  const q = (search.value || '').toLowerCase();
  return normalized.value.filter(r => {
    const txt = [r.name, r.category, r.type, r.sku, r.partNumber].filter(Boolean).join(' ').toLowerCase();
    if (showOnlyChanges.value && !isRowDirty(r)) return false;
    return !q || txt.includes(q);
  });
});

const displayed = filtered;
const pagedDisplayed = displayed; // no pagination for now

function variance(row) {
  if (mode.value === 'restock') {
    const added = Number(counts[row.id] || 0);
    const value = added * row.cost;
    const cls = added > 0 ? 'text-[#16A34A]' : 'text-[#4B5563]';
    return { qty: added, value, cls };
  } else {
    // If user hasn't entered a count yet, return uncounted sentinel
    if (counts[row.id] == null) {
      return { qty: null, value: 0, cls: 'text-[#9CA3AF]', uncounted: true };
    }
    const physical = Number(counts[row.id]) || 0;
    const qty = physical - row.systemQty;
    const value = qty * row.cost;
    const cls = qty < 0 ? 'text-[#DC2626]' : qty > 0 ? 'text-[#16A34A]' : 'text-[#4B5563]';
    return { qty, value, cls };
  }
}

const totals = computed(() => {
  let missingQty = 0, missingValue = 0, addedQty = 0, addedValue = 0;
  for (const r of displayed.value) {
    const v = variance(r);
    if (mode.value === 'restock') {
      addedQty += v.qty;
      addedValue += v.value;
    } else {
      if (v.qty < 0) {
        missingQty += Math.abs(v.qty);
        missingValue += Math.abs(v.value);
      }
    }
  }
  return { missingQty, missingValue, addedQty, addedValue };
});

function toNumberSafe(v) {
  if (v === null || v === undefined || v === '') return 0;
  const cleaned = String(v).replace(/[^0-9.\-]/g, '');
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function firstNonEmpty(arr) {
  for (const x of arr) {
    if (x !== null && x !== undefined && x !== '') return x;
  }
  return 0;
}

async function saveAdjustments() {
  const needPerm = mode.value === 'restock' ? canAddStock.value : canCountStock.value;
  if (!needPerm) {
    alert(`Requires Inventory → ${mode.value === 'restock' ? 'Write' : 'Edit'} permission.`);
    return;
  }
  const tenantId = getTenantId?.();
  if (!tenantId) return alert('Missing tenant id');

  const changes = changedRows.value;
  if (!changes.length) {
    emit('close');
    return;
  }

  saving.value = true;
  try {
    await Promise.all(
      changes.map(async (r) => {
        const physical = Number(counts[r.id] || 0);

        const params = new URLSearchParams({
          tenant_id: tenantId,
          stockCountDate: stockCountDate.value,
          unitCost: String(r.cost ?? 0),
          systemQty: String(r.systemQty ?? 0),
          isRestock: mode.value === 'restock' ? 'true' : 'false'
        });

        if (mode.value === 'restock') {
          // Send only the amount to ADD — the backend adds it to systemQty internally.
          // Sending systemQty + physical was causing the double-add bug (e.g. 1383+30=1413
          // sent as stockQty, then backend computed 1383+1413=2796).
          params.append('stockQty', String(physical));

          if (isBuyPriceDirty(r)) {
            params.append('buyingPrice', String(buyingPrices[r.id]));
          }
          if (isSellPriceDirty(r)) {
            params.append('sellingPrice', String(sellingPrices[r.id]));
          }
          if (isSkuDirty(r)) {
            params.append('sku', String(skus[r.id]));
          }
        } else {
          params.append('stockQty', String(physical));
          if (isSkuDirty(r)) {
            params.append('sku', String(skus[r.id]));
          }
        }

        const url = `${API_BASE_URL}/stock-count/${encodeURIComponent(r.id)}?${params.toString()}`;
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!res.ok) {
          const msg = await res.text().catch(() => '');
          throw new Error(`Failed updating ${r.name}: ${res.status} ${msg}`);
        }
        return true;
      })
    );
    emit('saved');
    emit('close');
  } catch (e) {
    console.error(e);
    alert(e.message || 'Failed to save adjustments');
  } finally {
    saving.value = false;
  }
}

function downloadExcel() {
  const isRestock = mode.value === 'restock';
  const now = new Date();
  const tsIso = now.toISOString();
  const tsLocal = now.toLocaleString();
  const userEmail = (() => { try { return decodeJWT().getUserEmail?.() || 'unknown'; } catch { return 'unknown'; } })();
  const userName = (() => { try { return decodeJWT().getUserFullname?.() || ''; } catch { return ''; } })();
  const branchObj = allBranches.value.find(b => (b._id || b.id) === countBranch.value);
  const branchLabel = countBranch.value === 'main' ? 'MAIN BRANCH' : (branchObj?.name || countBranch.value || 'ALL_BRANCHES');

  // Meta header rows
  const meta = [
    [isRestock ? 'BULK RESTOCK REPORT' : 'PHYSICAL STOCK AUDIT REPORT'],
    ['Generated At (Local)', tsLocal],
    ['Generated At (ISO)', tsIso],
    ['Audit Date', stockCountDate.value],
    ['Branch', branchLabel],
    ['Generated By', `${userName} <${userEmail}>`],
    ['Total Items', String(displayed.value.length)],
    ['Items With Discrepancies', String(changedRows.value.length)],
    [], // spacer
  ];

  const headers = isRestock
    ? ['Item Name', 'Category', 'Type', 'SKU/Barcode', 'System Qty', 'Buy Price', 'Sell Price', 'Restock Amount', 'Total After', 'Unit Cost', 'Value Delta', 'Audit Date', 'Exported At', 'Branch', 'User', 'Status']
    : ['Item Name', 'Category', 'Type', 'SKU/Barcode', 'System Qty', 'Physical Count', 'Variance Qty', 'Variance %', 'Unit Cost', 'Value Delta', 'Audit Date', 'Exported At', 'Branch', 'User', 'Status'];

  const data = displayed.value.map(row => {
    const rawCount = counts[row.id];
    const userInput = isRestock ? (Number(rawCount) || 0) : (rawCount == null ? null : (Number(rawCount) || 0));
    const v = variance(row);
    // For uncounted rows (null count): show blank count, no variance computed
    const displayCount = userInput == null ? '' : userInput;
    const displayVarianceQty = v.uncounted ? '' : v.qty;
    const displayVariancePct = (!v.uncounted && row.systemQty) ? ((v.qty / row.systemQty) * 100).toFixed(2) + '%' : '—';
    const status = isRestock
      ? ((userInput || 0) > 0 ? 'RESTOCKED' : 'NO_CHANGE')
      : (v.uncounted ? 'NOT_COUNTED' : (v.qty === 0 ? 'OK' : (v.qty > 0 ? 'OVERAGE' : 'SHORTAGE')));
    if (isRestock) {
      return [
        row.name || '', row.category || '', row.type || '', row.sku || row.partNumber || '',
        row.systemQty, buyingPrices[row.id] ?? row.buyingPrice, sellingPrices[row.id] ?? row.sellingPrice,
        userInput || 0, row.systemQty + (userInput || 0), row.cost || 0, v.value,
        stockCountDate.value, tsLocal, branchLabel, userEmail, status
      ];
    } else {
      return [
        row.name || '', row.category || '', row.type || '', row.sku || row.partNumber || '',
        row.systemQty, displayCount, displayVarianceQty, displayVariancePct, row.cost || 0, v.uncounted ? '' : v.value,
        stockCountDate.value, tsLocal, branchLabel, userEmail, status
      ];
    }
  });

  const aoa = [...meta, headers, ...data];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wscols = isRestock
    ? [{ wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 18 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 20 }, { wch: 18 }, { wch: 24 }, { wch: 14 }]
    : [{ wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 18 }, { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 12 }, { wch: 20 }, { wch: 18 }, { wch: 24 }, { wch: 14 }];
  ws['!cols'] = wscols;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, isRestock ? 'Bulk Restock' : 'Stock Count');
  const fname = (isRestock ? 'bulk-restock' : 'stock-count') + `-${stockCountDate.value}-${now.getTime()}.xlsx`;
  XLSX.writeFile(wb, fname);
}

const historyRows = ref([]);
const branchesFromApi = ref([]);

const fetchBranches = async () => {
  try {
    const tid = getTenantId?.();
    if (!tid) return;
    const res = await fetch(`${API_BASE_URL}/subaccounts/branches/list?tenant_id=${tid}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (res.ok) {
      branchesFromApi.value = await res.json();
    }
  } catch (e) {
    console.error('[StockCountModal] Error fetching branches:', e);
  }
};

onMounted(async () => {
  try { await initializeRBAC?.(); } catch { /* RBAC may already be initialised globally */ }
  fetchBranches();
  // Legacy single-product history kept for backward compatibility; the comprehensive
  // audit report (loaded on demand via openAuditReport) covers all items.
  if (props.items.length) {
    const tenantId = getTenantId?.();
    const itemId = props.items[0]._id || props.items[0].id;
    try {
      const res = await fetch(`${API_BASE_URL}/stock-count-history/${itemId}?tenant_id=${tenantId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (res.ok) historyRows.value = await res.json();
    } catch (e) { /* noop */ }
  }
});

function exportHistoryExcel() {
  const headers = ['Date', 'Physical Count', 'System Qty', 'Variance', 'Cost Variance', 'Unit Cost'];
  const data = historyRows.value.map(row => [row.date, row.qty, row.systemQty, row.variance, row.costVariance, row.unitCost]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Stock Count History');
  XLSX.writeFile(wb, 'stock-count-history.xlsx');
}

// ============================================================
// Comprehensive Audit Report (popup modal)
// ============================================================
const showAuditReportModal = ref(false);
const auditLoading = ref(false);
const auditRowsAll = ref([]);
const auditSearch = ref('');
const auditDateFrom = ref('');
const auditDateTo = ref('');
const auditVarianceFilter = ref('all');
const auditProductFilter = ref('');
const auditSort = reactive({ key: 'date', dir: 'desc' });
const auditScrollRef = ref(null);

// --- Selection state for bulk actions ---
const bulkStatusChoice = ref('');
const bulkClassChoice = ref('');
const bulkBusy = ref(false);
const showAuditFiltersMobile = ref(false);

const {
  selectedIds, selectionCount, hasSelection, isSelected, isAllPageSelected,
  isPartiallySelected, toggleSelect, toggleSelectAll, clearSelection
} = useBulkSelect({ getId: (r) => r._rowKey });

const auditEligibleRows = computed(() => filteredAuditRows.value.filter(r => r.item_id));

function clearAuditSelection() {
  clearSelection();
  bulkStatusChoice.value = '';
  bulkClassChoice.value = '';
}
function _selectedRows() {
  return filteredAuditRows.value.filter(r => selectedIds.value.has(r._rowKey) && r.item_id);
}
async function _postBulk(path, body) {
  const tenantId = getTenantId?.();
  if (!tenantId) return null;
  const res = await fetch(`${API_BASE_URL}${path}?tenant_id=${tenantId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    alert(res.status === 403 ? 'You do not have permission for one or more selected rows.' : 'Bulk update failed.');
    return null;
  }
  return res.json().catch(() => ({}));
}
async function applyBulkStatus() {
  const status = bulkStatusChoice.value;
  const rows = _selectedRows();
  if (!status || !rows.length) return;
  const needsApprove = status === 'Approved' || status === 'Posted';
  if (needsApprove && !canApproveVariance.value) { alert('Requires Inventory \u2192 Approve permission.'); return; }
  if (!needsApprove && !canReviewVariance.value) { alert('Requires Inventory \u2192 Edit permission.'); return; }
  bulkBusy.value = true;
  try {
    const entries = rows.map(r => ({ item_id: r.item_id, entry_index: r.entry_index, timestamp: r.timestamp }));
    const result = await _postBulk('/stock-count-history/bulk-status', { entries, status });
    if (result?.success) {
      rows.forEach(r => {
        r.status = status;
        r.reviewed = ['Submitted', 'Approved', 'Posted'].includes(status);
        r.approved = ['Approved', 'Posted'].includes(status);
      });
      clearAuditSelection();
    }
  } finally { bulkBusy.value = false; }
}
async function applyBulkClass() {
  const varianceClass = bulkClassChoice.value;
  const rows = _selectedRows();
  if (!varianceClass || !rows.length) return;
  if (!canReviewVariance.value) { alert('Requires Inventory → Edit permission.'); return; }
  bulkBusy.value = true;
  try {
    const entries = rows.map(r => ({ item_id: r.item_id, entry_index: r.entry_index, timestamp: r.timestamp }));
    const result = await _postBulk('/stock-count-history/bulk-class', { entries, varianceClass });
    if (result?.success) {
      rows.forEach(r => { r.varianceClass = varianceClass; r.varianceBreakdown = []; });
      clearAuditSelection();
    }
  } finally { bulkBusy.value = false; }
}

async function deleteAuditEntry(row) {
  if (!row || !row.item_id || row._notCounted) return;
  if (!canDeleteStock.value) { alert('Requires Inventory → Delete permission.'); return; }
  if (!window.confirm(`Delete this stock count entry for "${row.productName}"? This cannot be undone.`)) return;
  const tenantId = getTenantId?.();
  if (!tenantId) return;
  row._busy = true;
  try {
    const params = new URLSearchParams({ tenant_id: tenantId });
    if (row.timestamp) params.set('timestamp', row.timestamp);
    else if (typeof row.entry_index === 'number') params.set('entry_index', String(row.entry_index));
    const res = await fetch(`${API_BASE_URL}/stock-count-history/${row.item_id}?${params}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` },
    });
    if (!res.ok) {
      let detail = '';
      try { const j = await res.json(); detail = j?.detail || ''; } catch {}
      alert(res.status === 403 ? 'You do not have permission to delete this entry.' : (detail || `Delete failed (${res.status}).`));
      return;
    }
    // Remove from local state
    const idx = auditRowsAll.value.findIndex(r => r._rowKey === row._rowKey);
    if (idx !== -1) auditRowsAll.value.splice(idx, 1);
    const s = new Set(selectedAuditKeys.value);
    s.delete(row._rowKey);
    selectedAuditKeys.value = s;
  } catch (e) {
    console.error('deleteAuditEntry error', e);
    alert('Delete failed. Please try again.');
  } finally {
    row._busy = false;
  }
}

async function applyBulkDelete() {
  const rows = _selectedRows().filter(r => !r._notCounted);
  if (!rows.length) { alert('No counted entries selected for deletion.'); return; }
  if (!canDeleteStock.value) { alert('Requires Inventory → Delete permission.'); return; }
  if (!window.confirm(`Delete ${rows.length} selected audit entr${rows.length === 1 ? 'y' : 'ies'}? This cannot be undone.`)) return;
  bulkBusy.value = true;
  try {
    const tenantId = getTenantId?.();
    if (!tenantId) return;
    const res = await fetch(`${API_BASE_URL}/stock-count-history/bulk-delete?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify({ entries: rows.map(r => ({ item_id: r.item_id, entry_index: r.entry_index, timestamp: r.timestamp })) }),
    });
    if (!res.ok) {
      alert(res.status === 403 ? 'You do not have permission to delete one or more selected entries.' : 'Bulk delete failed.');
      return;
    }
    const result = await res.json().catch(() => ({}));
    const deletedKeys = new Set(rows.map(r => r._rowKey));
    auditRowsAll.value = auditRowsAll.value.filter(r => !deletedKeys.has(r._rowKey));
    clearAuditSelection();
  } finally { bulkBusy.value = false; }
}

// --- Per-row variance breakdown (split classification) ---
const splitEditor = reactive({ open: false, row: null, productName: '', variance: 0, lines: [], busy: false });
const splitTotal = computed(() => splitEditor.lines.reduce((s, l) => s + (Number(l.qty) || 0), 0));
const splitRemaining = computed(() => Math.abs(splitEditor.variance) - splitTotal.value);
const expandedAuditRows = ref(new Set()); // Track expanded rows
const stockAdjustEditor = reactive({ open: false, row: null, newCount: 0, reason: '', busy: false });

function toggleExpandRow(key) {
  const next = new Set(expandedAuditRows.value);
  if (next.has(key)) next.delete(key); else next.add(key);
  expandedAuditRows.value = next;
}
function hasBreakdown(row) { return Array.isArray(row?.varianceBreakdown) && row.varianceBreakdown.length > 0; }
function breakdownTotal(row) { return (row?.varianceBreakdown || []).reduce((s, b) => s + (Number(b.qty) || 0), 0); }
function breakdownLabel(row) {
  if (!hasBreakdown(row)) return '';
  return (row.varianceBreakdown || []).map(b => `${b.qty} ${b.class}`).join(', ');
}
function breakdownTitle(row) { return `Split: ${breakdownLabel(row)} (click \u201CSplit\u201D to edit)`; }
function openSplit(row) {
  if (!row || !row.item_id) return;
  splitEditor.row = row;
  splitEditor.productName = row.productName || '';
  splitEditor.variance = Number(row.variance) || 0;
  const existing = (row.varianceBreakdown || []).map(b => ({ class: b.class, qty: Number(b.qty) || 0, reason: b.reason || '' }));
  splitEditor.lines = existing.length ? existing : [{ class: autoClass(row) === 'none' ? 'shortage' : autoClass(row), qty: Math.abs(Number(row.variance) || 0), reason: '' }];
  splitEditor.busy = false;
  splitEditor.open = true;
}
function closeSplit() { splitEditor.open = false; splitEditor.row = null; splitEditor.lines = []; }
function clearSplit() { splitEditor.lines = []; }

// --- Stock count adjustment ---
function openAdjustStock(row) {
  if (!row || !row.item_id) return;
  stockAdjustEditor.row = row;
  stockAdjustEditor.newCount = Number(row.physicalCount || row.qty || 0);
  stockAdjustEditor.reason = '';
  stockAdjustEditor.busy = false;
  stockAdjustEditor.open = true;
}
function closeAdjustStock() { stockAdjustEditor.open = false; stockAdjustEditor.row = null; }
async function saveAdjustStock() {
  const row = stockAdjustEditor.row;
  if (!row) return;
  stockAdjustEditor.busy = true;
  const ok = await patchAuditEntry(row, { 
    action: 'adjust_count', 
    newPhysicalCount: Number(stockAdjustEditor.newCount) || 0,
    reason: String(stockAdjustEditor.reason || '').trim()
  });
  stockAdjustEditor.busy = false;
  if (ok) {
    // Recalculate variance
    const newPhysical = Number(stockAdjustEditor.newCount) || 0;
    const system = Number(row.systemQty) || 0;
    const newVariance = newPhysical - system;
    row.physicalCount = newPhysical;
    row.qty = newPhysical;
    row.variance = newVariance;
    row.costVariance = newVariance * (Number(row.unitCost) || 0);
    row.varianceClass = newVariance < 0 ? 'shortage' : (newVariance > 0 ? 'excess' : 'none');
    row.varianceBreakdown = [];
    row.adjustmentReason = String(stockAdjustEditor.reason || '').trim();
    closeAdjustStock();
    await loadAuditReport(); // Refresh to get updated data
  }
}
function addSplitLine() { 
  const variance = splitEditor.variance;
  const defaultClass = variance < 0 ? 'shortage' : (variance > 0 ? 'excess' : 'none');
  splitEditor.lines.push({ class: defaultClass, qty: 0, reason: '' }); 
}
async function saveSplit() {
  const row = splitEditor.row;
  if (!row) return;
  const cleaned = splitEditor.lines
    .map(l => ({ 
      class: String(l.class || '').toLowerCase(), 
      qty: Math.max(0, Math.floor(Number(l.qty) || 0)),
      reason: String(l.reason || '').trim().slice(0, 500)
    }))
    .filter(l => l.class && l.qty > 0);
  splitEditor.busy = true;
  const ok = await patchAuditEntry(row, { action: 'set_breakdown', varianceBreakdown: cleaned });
  splitEditor.busy = false;
  if (ok) {
    row.varianceBreakdown = cleaned;
    if (cleaned.length === 1) row.varianceClass = cleaned[0].class;
    else if (cleaned.length === 0) row.varianceClass = row.varianceClass || autoClass(row);
    closeSplit();
  }
}

const auditColumns = [
  { key: 'date', label: 'Date', align: 'left' },
  { key: 'productName', label: 'Product', align: 'left' },
  { key: 'sku', label: 'SKU', align: 'left' },
  { key: 'category', label: 'Category', align: 'left' },
  { key: 'unit', label: 'Unit', align: 'left' },
  { key: 'branch', label: 'Branch', align: 'left' },
  { key: 'qty', label: 'Counted', align: 'right' },
  { key: 'systemQty', label: 'System', align: 'right' },
  { key: 'variance', label: 'Variance', align: 'right' },
  { key: 'unitCost', label: 'Unit Cost', align: 'right' },
  { key: 'costVariance', label: 'Value Var', align: 'right' },
  { key: 'user', label: 'User', align: 'left' },
  { key: 'varianceClass', label: 'Class', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
];

const STATUS_OPTIONS = ['Draft', 'In Progress', 'Submitted', 'Approved', 'Posted'];
const CLASS_OPTIONS = [
  { value: 'none', label: 'No Variance', type: 'neutral' },
  { value: 'shortage', label: 'Shortage', type: 'negative' },
  { value: 'damaged', label: 'Damaged', type: 'negative' },
  { value: 'expired', label: 'Expired', type: 'negative' },
  { value: 'theft', label: 'Theft', type: 'negative' },
  { value: 'shrinkage', label: 'Shrinkage', type: 'negative' },
  { value: 'excess', label: 'Excess', type: 'positive' },
  { value: 'found', label: 'Found', type: 'positive' },
  { value: 'system_error', label: 'System Error', type: 'positive' },
  { value: 'return', label: 'Return', type: 'positive' },
];

// Filter class options based on variance sign
function getClassOptionsForVariance(variance) {
  if (variance < 0) {
    // Negative variance = shortage, only show negative/neutral classes
    return CLASS_OPTIONS.filter(o => o.type === 'negative' || o.type === 'neutral');
  } else if (variance > 0) {
    // Positive variance = excess, only show positive/neutral classes
    return CLASS_OPTIONS.filter(o => o.type === 'positive' || o.type === 'neutral');
  }
  return CLASS_OPTIONS; // Zero variance = all options
}

// --- Audit column visibility (persisted) ---
const AUDIT_COL_STORAGE_KEY = 'stockAuditReport.columnVisibility.v1';
const auditHiddenCols = ref(new Set((() => {
  try { return JSON.parse(localStorage.getItem(AUDIT_COL_STORAGE_KEY) || '[]'); } catch { return []; }
})()));
const showAuditColumnPicker = ref(false);
const visibleAuditColumns = computed(() => auditColumns.filter(c => !auditHiddenCols.value.has(c.key)));
function toggleAuditCol(key) {
  const next = new Set(auditHiddenCols.value);
  if (next.has(key)) next.delete(key); else next.add(key);
  // Always keep at least one visible column
  if (next.size >= auditColumns.length) return;
  auditHiddenCols.value = next;
  try { localStorage.setItem(AUDIT_COL_STORAGE_KEY, JSON.stringify([...next])); } catch {}
}
function showAllAuditCols() {
  auditHiddenCols.value = new Set();
  try { localStorage.setItem(AUDIT_COL_STORAGE_KEY, '[]'); } catch {}
}
function isAuditColVisible(key) { return !auditHiddenCols.value.has(key); }
function auditCellValue(row, key) {
  if (row._notCounted) {
    if (key === 'productName') return row.productName || '---';
    if (key === 'sku') return row.sku || '---';
    if (key === 'category') return row.category || '---';
    if (key === 'unit') return row.unit || '---';
    if (key === 'branch') return row.branch || '---';
    if (key === 'systemQty') return row.systemQty;
    if (key === 'qty') return '0 (not counted)';
    if (key === 'variance') return '---';
    if (key === 'unitCost') return formatCurrency(Number(row.unitCost) || 0);
    if (key === 'costVariance') return '---';
    if (key === 'status') return 'Not Counted';
    if (key === 'varianceClass') return '---';
    return '---';
  }
  const v = row[key];
  if (key === 'unitCost' || key === 'costVariance') return formatCurrency(Number(v) || 0);
  if (key === 'variance' || key === 'qty' || key === 'systemQty') return v;
  if (key === 'productName') return v || '---';
  if (key === 'status') return row.status || 'Submitted';
  if (key === 'varianceClass') {
    if (Array.isArray(row.varianceBreakdown) && row.varianceBreakdown.length) {
      return row.varianceBreakdown.map(b => `${b.qty} ${(CLASS_OPTIONS.find(o => o.value === b.class) || {}).label || b.class}`).join(' + ');
    }
    const c = row.varianceClass || autoClass(row);
    return (CLASS_OPTIONS.find(o => o.value === c) || {}).label || '---';
  }
  return v == null || v === '' ? '---' : v;
}
function auditCellClass(row, key) {
  const parts = ['px-3 py-2'];
  const col = auditColumns.find(c => c.key === key);
  if (col?.align === 'right') parts.push('text-right');
  if (row._notCounted) {
    parts.push('text-gray-400 italic');
    if (key === 'productName') parts.push('!text-gray-700 !not-italic font-black uppercase');
    return parts.join(' ');
  }
  if (key === 'productName') parts.push('font-black text-gray-900 uppercase');
  else if (key === 'date') parts.push('text-gray-600');
  else if (key === 'qty' || key === 'systemQty') parts.push('font-black');
  else if (key === 'unitCost') parts.push('font-bold text-gray-700');
  else if (key === 'variance') {
    parts.push('font-black');
    if (row.variance < 0) parts.push('text-red-600');
    else if (row.variance > 0) parts.push('text-green-600');
    else parts.push('text-gray-400');
  } else if (key === 'costVariance') {
    parts.push('font-black');
    if (row.costVariance < 0) parts.push('text-red-600');
    else if (row.costVariance > 0) parts.push('text-green-600');
    else parts.push('text-gray-400');
  } else {
    parts.push('text-gray-500');
  }
  return parts.join(' ');
}

async function fetchAuditForAllItems() {
  const tenantId = getTenantId?.();
  if (!tenantId) return [];
  // Respect the branch filter: use branch-scoped items when a branch is selected,
  // identical to what the Physical Stock Audit table shows.
  const sourceItems = countBranch.value
    ? countBranchItems.value
    : (props.items || []);
  if (!sourceItems.length) return [];
  const branchMap = {};
  (branchesFromApi.value || []).forEach(b => { branchMap[b._id || b.id] = b.name || b.label || b._id; });
  const out = [];
  // Track which items had at least one history entry
  const itemsWithHistory = new Set();
  const fetches = sourceItems.map(async (item) => {
    const itemId = item._id || item.id;
    if (!itemId) return;
    try {
      const res = await fetch(`${API_BASE_URL}/stock-count-history/${itemId}?tenant_id=${tenantId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) return;
      const rows = await res.json();
      const entries = Array.isArray(rows) ? rows : [];
      // Only stock count entries belong in the Audit Report.
      // Restock entries are tagged isRestock:true and belong in Stock History instead.
      const countEntries = entries.filter(r => !r.isRestock);
      if (countEntries.length) itemsWithHistory.add(itemId);
      countEntries.forEach((r) => {
        // Use the original index from the full (unfiltered) entries array so PATCH/DELETE
        // hit the correct position even when restock entries sit in between.
        const originalIndex = entries.indexOf(r);
        out.push({
          _rowKey: `${itemId}-${r.date || ''}-${r.timestamp || originalIndex}`,
          item_id: itemId,
          entry_index: originalIndex,
          timestamp: r.timestamp || '',
          date: r.date || '',
          productName: item.name || item.productName || '---',
          sku: item.sku || r.sku || '',
          category: item.category || '',
          brand: item.brand || '',
          type: item.type || '',
          unit: item.unit || item.unitOfMeasure || '',
          branch: branchMap[r.branch_id] || r.branch || item.branch || '',
          qty: Number(r.qty ?? 0),
          systemQty: Number(r.systemQty ?? 0),
          variance: Number(r.variance ?? ((r.qty ?? 0) - (r.systemQty ?? 0))),
          unitCost: Number(r.unitCost ?? item.cost ?? 0),
          costVariance: Number(r.costVariance ?? 0),
          user: r.user || r.created_by || r.updated_by || '',
          reviewed: !!r.reviewed,
          reviewed_by: r.reviewed_by || '',
          reviewed_at: r.reviewed_at || '',
          approved: !!r.approved,
          approved_by: r.approved_by || '',
          approved_at: r.approved_at || '',
          status: r.status || (r.approved ? 'Approved' : (r.reviewed ? 'Submitted' : 'Submitted')),
          status_history: r.status_history || [],
          varianceClass: r.varianceClass || '',
          varianceBreakdown: Array.isArray(r.varianceBreakdown) ? r.varianceBreakdown : [],
          _busy: false,
          _notCounted: false,
        });
      });
    } catch (e) { /* noop */ }
  });
  await Promise.all(fetches);

  // Add synthetic "not counted" rows for items that have no history entries
  // Use the same scoped list so "not counted" respects branch too.
  for (const item of sourceItems) {
    const itemId = item._id || item.id;
    if (!itemId || itemsWithHistory.has(itemId)) continue;
    if (String(item.type || '').toLowerCase() === 'service') continue;
    const sysQty = Number(item.stockQty ?? item.equipmentQty ?? 0);
    out.push({
      _rowKey: `${itemId}-not-counted`,
      item_id: itemId,
      entry_index: null,
      timestamp: '',
      date: '',
      productName: item.name || '---',
      sku: item.sku || '',
      category: item.category || '',
      brand: item.brand || '',
      type: item.type || '',
      unit: item.unit || item.unitOfMeasure || '',
      branch: item.branch || '',
      qty: 0,
      systemQty: sysQty,
      variance: 0 - sysQty,
      unitCost: Number(item.buyingPrice ?? item.costPrice ?? item.cost ?? 0),
      costVariance: 0,
      user: '',
      reviewed: false,
      reviewed_by: '',
      reviewed_at: '',
      approved: false,
      approved_by: '',
      approved_at: '',
      status: 'Not Counted',
      status_history: [],
      varianceClass: '',
      varianceBreakdown: [],
      _busy: false,
      _notCounted: true,
    });
  }

  return out;
}

// --- Workflow / classification controls for audit rows (RBAC-gated) ---
function autoClass(row) {
  if (!row) return 'none';
  if ((row.variance || 0) < 0) return 'shortage';
  if ((row.variance || 0) > 0) return 'excess';
  return 'none';
}

async function patchAuditEntry(row, body) {
  if (!row || !row.item_id) return false;
  const tenantId = getTenantId?.();
  if (!tenantId) return false;
  try {
    row._busy = true;
    const res = await fetch(`${API_BASE_URL}/stock-count-history/${row.item_id}/status?tenant_id=${tenantId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify({
        ...body,
        entry_index: typeof row.entry_index === 'number' ? row.entry_index : null,
        timestamp: row.timestamp || null,
      }),
    });
    if (!res.ok) {
      let detail = '';
      try { const j = await res.json(); detail = j?.detail || ''; } catch {}
      console.error('patchAuditEntry HTTP', res.status, detail, body);
      alert(res.status === 403 ? 'You do not have permission to perform this action.' : (detail || `Update failed (${res.status}).`));
      return false;
    }
    const data = await res.json().catch(() => ({}));
    const entry = data?.entry || {};
    if (body.action === 'set_status') {
      row.status = entry.status || body.status;
      row.reviewed = !!entry.reviewed;
      row.reviewed_by = entry.reviewed_by || '';
      row.reviewed_at = entry.reviewed_at || '';
      row.approved = !!entry.approved;
      row.approved_by = entry.approved_by || '';
      row.approved_at = entry.approved_at || '';
      row.status_history = entry.status_history || row.status_history;
    } else if (body.action === 'set_class') {
      row.varianceClass = entry.varianceClass || body.varianceClass;
      row.varianceBreakdown = [];
    } else if (body.action === 'set_breakdown') {
      row.varianceBreakdown = Array.isArray(entry.varianceBreakdown) ? entry.varianceBreakdown : (body.varianceBreakdown || []);
      if (entry.varianceClass) row.varianceClass = entry.varianceClass;
    }
    return true;
  } catch (e) {
    console.error('patchAuditEntry error', e);
    return false;
  } finally {
    row._busy = false;
  }
}

async function setStatus(row, status) {
  if (!status || row.status === status) return;
  const needsApprove = status === 'Approved' || status === 'Posted';
  if (needsApprove && !canApproveVariance.value) {
    alert('Requires Inventory \u2192 Approve permission.');
    return;
  }
  if (!needsApprove && !canReviewVariance.value) {
    alert('Requires Inventory \u2192 Edit permission.');
    return;
  }
  await patchAuditEntry(row, { action: 'set_status', status });
}

async function setVarianceClass(row, varianceClass) {
  if (!varianceClass) return;
  const current = row.varianceClass || autoClass(row);
  if (current === varianceClass) return;
  if (!canReviewVariance.value) {
    alert('Requires Inventory \u2192 Edit permission.');
    return;
  }
  await patchAuditEntry(row, { action: 'set_class', varianceClass });
}

function statusBadgeClass(row) {
  const base = 'px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border rounded-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-1 focus:ring-[#2F2E8B]';
  switch (row.status || 'Submitted') {
    case 'Draft':       return `${base} bg-gray-50 border-gray-300 text-gray-600`;
    case 'In Progress': return `${base} bg-blue-50 border-blue-300 text-blue-700`;
    case 'Submitted':   return `${base} bg-amber-50 border-amber-300 text-amber-700`;
    case 'Approved':    return `${base} bg-emerald-50 border-emerald-300 text-emerald-700`;
    case 'Posted':      return `${base} bg-indigo-50 border-indigo-400 text-indigo-700`;
    default:            return `${base} bg-gray-50 border-gray-300 text-gray-600`;
  }
}

function classBadgeClass(row) {
  const base = 'px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border rounded-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-1 focus:ring-[#2F2E8B]';
  switch (row.varianceClass || autoClass(row)) {
    case 'shortage': return `${base} bg-red-50 border-red-300 text-red-700`;
    case 'excess':   return `${base} bg-green-50 border-green-300 text-green-700`;
    case 'damaged':  return `${base} bg-orange-50 border-orange-300 text-orange-700`;
    case 'expired':  return `${base} bg-rose-100 border-rose-400 text-rose-800`;
    default:         return `${base} bg-gray-50 border-gray-300 text-gray-600`;
  }
}

function statusTitle(row) {
  const sh = row.status_history || [];
  if (!sh.length) return 'Click to change workflow status';
  const last = sh[sh.length - 1];
  const when = (last.at || '').slice(0, 19).replace('T', ' ');
  return `Last: ${last.status} by ${last.by || 'unknown'} on ${when}`;
}

async function openAuditReport() {
  showAuditReportModal.value = true;
  if (auditRowsAll.value.length) return;
  auditLoading.value = true;
  try {
    auditRowsAll.value = await fetchAuditForAllItems();
  } finally {
    auditLoading.value = false;
  }
}

function resetAuditFilters() {
  auditSearch.value = '';
  auditDateFrom.value = '';
  auditDateTo.value = '';
  auditVarianceFilter.value = 'all';
  auditProductFilter.value = '';
}

function sortAuditBy(key) {
  if (auditSort.key === key) {
    auditSort.dir = auditSort.dir === 'asc' ? 'desc' : 'asc';
  } else {
    auditSort.key = key;
    auditSort.dir = 'asc';
  }
}

const auditProductOptions = computed(() => {
  const set = new Set();
  auditRowsAll.value.forEach(r => { if (r.productName) set.add(r.productName); });
  return Array.from(set).sort();
});

const filteredAuditRows = computed(() => {
  const q = auditSearch.value.trim().toLowerCase();
  const from = auditDateFrom.value;
  const to = auditDateTo.value;
  let rows = auditRowsAll.value.filter(r => {
    if (q) {
      const blob = [r.productName, r.sku, r.category, r.brand, r.type, r.unit, r.branch, r.user].filter(Boolean).join(' ').toLowerCase();
      if (!blob.includes(q)) return false;
    }
    if (from && r.date && r.date < from) return false;
    if (to && r.date && r.date > to) return false;
    if (auditProductFilter.value && r.productName !== auditProductFilter.value) return false;
    // Not-counted rows only appear under 'all' or 'not_counted' filter
    if (r._notCounted) {
      if (auditVarianceFilter.value !== 'all' && auditVarianceFilter.value !== 'not_counted') return false;
    } else {
      if (auditVarianceFilter.value === 'not_counted') return false;
      if (auditVarianceFilter.value === 'loss' && r.variance >= 0) return false;
      if (auditVarianceFilter.value === 'gain' && r.variance <= 0) return false;
      if (auditVarianceFilter.value === 'zero' && r.variance !== 0) return false;
    }
    return true;
  });
  const { key, dir } = auditSort;
  const factor = dir === 'asc' ? 1 : -1;
  rows = rows.slice().sort((a, b) => {
    const av = a[key]; const bv = b[key];
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * factor;
    return String(av).localeCompare(String(bv)) * factor;
  });
  return rows;
});

const auditTotals = computed(() => {
  let qty = 0, value = 0;
  filteredAuditRows.value.forEach(r => { qty += Number(r.variance) || 0; value += Number(r.costVariance) || 0; });
  return { qty, value };
});

const auditRangeLabel = computed(() => {
  const dates = filteredAuditRows.value.map(r => r.date).filter(Boolean).sort();
  if (!dates.length) return '---';
  return dates[0] === dates[dates.length - 1] ? dates[0] : `${dates[0]} \u2192 ${dates[dates.length - 1]}`;
});

function scrollAudit() { /* deprecated: scroll arrow buttons removed in favor of native scrollbar */ }

function _auditFileBase() {
  const d = new Date().toISOString().split('T')[0];
  return `stock-audit-report-${d}`;
}
function _auditTableData() {
  // Always export the full column set so PDF / Excel / DOCX / CSV all carry
  // the same complete dataset, regardless of which columns are toggled visible in the UI.
  const cols = auditColumns;
  const headers = [...cols.map(c => c.label), 'Variance Reason'];
  const rows = filteredAuditRows.value.map(r => {
    if (r._notCounted) {
      // Build a row for items that have never been counted
      const baseRow = cols.map(c => {
        if (c.key === 'status') return 'Not Counted';
        if (c.key === 'qty') return 0;
        if (c.key === 'variance') return '';
        if (c.key === 'costVariance') return '';
        if (c.key === 'varianceClass') return '';
        if (c.key === 'unitCost') return Number(r.unitCost) || 0;
        const v = r[c.key];
        return v == null ? '' : v;
      });
      return [...baseRow, ''];
    }
    const baseRow = cols.map(c => {
      const v = r[c.key];
      if (c.key === 'unitCost' || c.key === 'costVariance') return Number(v) || 0;
      if (c.key === 'varianceClass') {
        if (Array.isArray(r.varianceBreakdown) && r.varianceBreakdown.length) {
          return r.varianceBreakdown.map(b => `${b.qty} ${(CLASS_OPTIONS.find(o => o.value === b.class) || {}).label || b.class}`).join(' + ');
        }
        const c2 = r.varianceClass || autoClass(r);
        return (CLASS_OPTIONS.find(o => o.value === c2) || {}).label || '';
      }
      if (c.key === 'status') return r.status || 'Submitted';
      return v == null ? '' : v;
    });
    // Append breakdown reasons
    const reasons = Array.isArray(r.varianceBreakdown) && r.varianceBreakdown.length
      ? r.varianceBreakdown.filter(b => b.reason).map(b => `${b.class}: ${b.reason}`).join('; ')
      : (r.adjustmentReason || '');
    return [...baseRow, reasons];
  });
  return { headers, rows, cols };
}

async function exportAudit(format) {
  if (!canExportInventory.value) { alert('Requires Inventory → Export permission.'); return; }
  if (!filteredAuditRows.value.length) return;
  const { headers, rows, cols } = _auditTableData();
  const base = _auditFileBase();
  if (format === 'csv') {
    const escape = (v) => {
      const s = String(v ?? '');
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [headers.join(','), ...rows.map(r => r.map(escape).join(','))].join('\r\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    _downloadBlob(blob, `${base}.csv`);
  } else if (format === 'excel') {
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws['!cols'] = headers.map((h) => ({ wch: Math.max(12, h.length + 2) }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Audit Report');
    XLSX.writeFile(wb, `${base}.xlsx`);
  } else if (format === 'pdf') {
    const [{ default: jsPDF }, autoTableMod] = await Promise.all([
      import('jspdf'),
      import('jspdf-autotable'),
    ]);
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    doc.setFontSize(14);
    doc.text('Stock Audit Report', 40, 40);
    doc.setFontSize(9);
    doc.text(`Generated: ${new Date().toLocaleString()}  |  Records: ${rows.length}  |  Variance Qty: ${auditTotals.value.qty}  |  Variance Value: ${formatCurrency(auditTotals.value.value)}`, 40, 56);
    const autoTable = autoTableMod.default || autoTableMod.autoTable || doc.autoTable;
    if (typeof autoTable === 'function') {
      autoTable(doc, {
        startY: 72,
        head: [headers],
        body: rows.map(r => r.map((v, i) => {
          const key = cols[i]?.key;
          if (key === 'unitCost' || key === 'costVariance') return formatCurrency(v);
          return v == null ? '' : v;
        })),
        styles: { fontSize: 7, cellPadding: 3 },
        headStyles: { fillColor: [47, 46, 139], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 40, right: 40 },
      });
    }
    doc.save(`${base}.pdf`);
  } else if (format === 'docx') {
    const docxMod = await import('docx');
    const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, HeadingLevel, WidthType, AlignmentType } = docxMod;
    const headerRow = new TableRow({
      tableHeader: true,
      children: headers.map(h => new TableCell({
        shading: { fill: '2F2E8B' },
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 14 })] })],
      })),
    });
    const bodyRows = rows.map(r => new TableRow({
      children: r.map((v, i) => {
        const col = cols[i];
        const key = col?.key;
        const text = (key === 'unitCost' || key === 'costVariance') ? formatCurrency(v) : String(v ?? '');
        return new TableCell({
          children: [new Paragraph({ alignment: col?.align === 'right' ? AlignmentType.RIGHT : AlignmentType.LEFT, children: [new TextRun({ text, size: 14 })] })],
        });
      }),
    }));
    const table = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [headerRow, ...bodyRows] });
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: 'Stock Audit Report', bold: true })] }),
          new Paragraph({ children: [new TextRun({ text: `Generated: ${new Date().toLocaleString()}`, italics: true, size: 18 })] }),
          new Paragraph({ children: [new TextRun({ text: `Records: ${rows.length}  |  Variance Qty: ${auditTotals.value.qty}  |  Variance Value: ${formatCurrency(auditTotals.value.value)}`, size: 18 })] }),
          new Paragraph({ children: [new TextRun({ text: ' ' })] }),
          table,
        ],
      }],
    });
    const blob = await Packer.toBlob(doc);
    _downloadBlob(blob, `${base}.docx`);
  }
}

function _downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #9ca3af #f1f1f1;
}
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>

<!-- Non-scoped styles so they also apply to <Teleport>-ed content -->
<style>
.audit-scroll {
  scrollbar-width: auto;
  scrollbar-color: #6b7280 #e5e7eb;
  scrollbar-gutter: stable;
}
.audit-scroll::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background: #e5e7eb;
}
.audit-scroll::-webkit-scrollbar-track {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
}
.audit-scroll::-webkit-scrollbar-thumb {
  background: #6b7280;
  border: 2px solid #f3f4f6;
  border-radius: 6px;
  min-height: 32px;
}
.audit-scroll::-webkit-scrollbar-thumb:hover {
  background: #2F2E8B;
}
.audit-scroll::-webkit-scrollbar-corner {
  background: #f3f4f6;
}
</style>