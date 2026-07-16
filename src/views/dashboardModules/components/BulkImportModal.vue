<template>
  <Teleport to="body">
  <!-- Modal Container with backdrop -->
  <div class="fixed inset-0 z-[9999] overflow-hidden">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" @click="$emit('close')"></div>
    
    <!-- Modal Content Centered -->
    <div class="fixed inset-0 flex items-center justify-center p-2 md:p-6 pointer-events-none">
      <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-6xl flex flex-col max-h-[95vh] rounded-none pointer-events-auto">
        <!-- Header -->
      <div class="h-1.5 w-full bg-[#2F2E8B]"></div>
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-indigo-50 flex items-center justify-center text-[#2F2E8B] rounded-none shrink-0">
            <i class="fas fa-file-import"></i>
          </div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest truncate">Inventory Import</div>
            <div class="text-sm font-black text-gray-900 uppercase tracking-tight truncate">Bulk Item Import</div>
          </div>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100 shrink-0">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Content -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <div class="p-4 md:p-6 overflow-y-auto flex-1 space-y-8">
          <!-- Import Mode Toggle -->
          <div class="flex p-1 bg-gray-100 border border-gray-200 rounded-none">
            <button @click="importMode = 'new_items'" :class="['flex-1 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2', importMode === 'new_items' ? 'bg-[#2F2E8B] text-white shadow' : 'text-gray-400 hover:text-gray-700']">
              <i class="fas fa-plus-circle"></i>&nbsp;New Items
            </button>
            <button @click="importMode = 'stock_update'" :class="['flex-1 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2', importMode === 'stock_update' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-gray-700']">
              <i class="fas fa-boxes"></i>&nbsp;Stock Update
            </button>
            <button @click="importMode = 'bulk_update'" :class="['flex-1 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2', importMode === 'bulk_update' ? 'bg-amber-500 text-white shadow' : 'text-gray-400 hover:text-gray-700']">
              <i class="fas fa-edit"></i>&nbsp;Bulk Update
            </button>
            <button @click="importMode = 'price_update'" :class="['flex-1 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2', importMode === 'price_update' ? 'bg-purple-600 text-white shadow' : 'text-gray-400 hover:text-gray-700']">
              <i class="fas fa-dollar-sign"></i>&nbsp;Price Update
            </button>
          </div>

          <!-- Step 1 & 2: Upload & Type -->
          <div v-show="importMode === 'new_items'" class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-gray-50 border border-gray-100 rounded-none">
            <div class="space-y-4">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Select File</label>
              <!-- Branch Selector — always visible -->
              <div class="space-y-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Target Branch</label>
                <div class="relative">
                  <select
                    v-model="selectedImportBranch"
                    class="w-full h-11 px-4 pr-10 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase appearance-none cursor-pointer focus:ring-1 focus:ring-[#2F2E8B] outline-none"
                  >
                    <option value="main">MAIN (DEFAULT)</option>
                    <option v-for="branch in props.branches" :key="branch._id || branch.id" :value="branch._id || branch.id">
                      {{ branch.name ? branch.name.toUpperCase() : branch._id || branch.id }}
                    </option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              <div class="relative group">
                  <input type="file" accept=".xlsx,.xls,.csv" @change="onFileChange" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase file:mr-4 file:py-1 file:px-4 file:rounded-none file:border-0 file:text-[9px] file:font-black file:bg-indigo-50 file:text-[#2F2E8B] hover:file:bg-indigo-100 transition-all" />
              </div>
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-tight px-1">Supported formats: .xlsx, .xls, .csv</p>
              <div v-if="fileName" class="p-3 bg-white border border-indigo-100 rounded-none flex items-center justify-between">
                  <span class="text-[10px] font-mono font-black text-[#2F2E8B] truncate uppercase">{{ fileName }}</span>
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase">{{ parsedRows.length }} Items</span>
              </div>
            </div>

            <div class="space-y-4">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Item Type</label>
              <div class="flex p-1 bg-white border border-gray-200 rounded-none">
                  <button v-for="type in ['product', 'equipment', 'service']" :key="type" 
                      @click="itemType = type"
                      :class="['flex-1 py-3 text-[10px] font-mono font-black uppercase tracking-widest transition-all rounded-none', itemType === type ? 'bg-[#2F2E8B] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600']"
                  >
                      {{ type }}
                  </button>
              </div>
              
              <div class="flex gap-2">
                  <button @click="downloadTemplate(false)" class="flex-1 py-2 bg-indigo-50/50 text-[#2F2E8B] text-[9px] font-mono font-black uppercase border border-indigo-100/50 rounded-none hover:bg-indigo-50 transition-colors">Sample</button>
                  <button @click="downloadTemplate(true)" class="flex-1 py-2 bg-gray-50 text-gray-400 text-[9px] font-mono font-black uppercase border border-gray-200 rounded-none hover:bg-gray-100 transition-colors">Format</button>
              </div>
            </div>
          </div>

          <!-- Bulk Fill for Empty Required Fields -->
          <div v-if="headers.length && importMode === 'new_items'" class="space-y-3 px-1 bg-gray-50/50 border border-gray-100 rounded-none p-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Apply to Empty Fields</label>
              <div class="flex flex-col md:flex-row md:items-center gap-2">
                <select v-model="bulkFillField" class="h-9 px-4 bg-white border border-gray-200 rounded-none text-[9px] font-mono font-black uppercase outline-none min-w-[120px]">
                  <option value="">-- Skip Field --</option>
                  <option v-for="field in fieldsForType.filter(f => !f.required || f.key === 'description' || f.key === 'category')" :key="field.key" :value="field.key">{{ field.label.toUpperCase() }}</option>
                </select>
                <input v-model="bulkFillValue" type="text" placeholder="Value..." class="h-9 px-4 bg-white border border-gray-200 rounded-none text-[9px] font-mono font-black uppercase outline-none" />
                <button @click="applyBulkFillToEmpty" :disabled="!bulkFillField || !bulkFillValue" class="h-9 px-4 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-none hover:bg-[#1D226B] transition-colors disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap">
                  Apply
                </button>
              </div>
            </div>
          </div>

        <!-- Reference Header -->
        <div v-show="importMode === 'new_items'" class="space-y-3 px-1">
          <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Required Column Headers</label>
          <div class="p-4 bg-gray-900 rounded-none border-l-4 border-[#2F2E8B]">
            <template v-if="itemType === 'product'">
              <code class="text-[11px] font-mono text-indigo-300 break-all uppercase tracking-tight">Name, Category, Buying Price, Selling Price, Stock Quantity, Supplier, SKU, Buying Date, Expiry Date, Low Stock Threshold, Critical Stock Threshold, VAT Applicable, Description</code>
            </template>
            <template v-else-if="itemType === 'equipment'">
              <code class="text-[11px] font-mono text-indigo-300 break-all uppercase tracking-tight">Name, Part Number, Quantity, Equipment Price, Equipment Buying Price, Low Stock Threshold, Critical Stock Threshold, VAT Applicable, Description</code>
            </template>
            <template v-else>
              <code class="text-[11px] font-mono text-indigo-300 break-all uppercase tracking-tight">Name, Price, Duration, Staff, Availability, Description, Category, VAT Applicable</code>
            </template>
          </div>
        </div>

        <!-- Step 3: Mapping -->
        <div v-if="headers.length && importMode === 'new_items'" class="space-y-4">
          <div class="flex items-center justify-between border-b border-gray-100 pb-2">
            <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Map Columns</h4>
            <button @click="autoMap" class="text-[9px] font-mono font-black text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-widest flex items-center gap-1">
                <i class="fas fa-magic"></i> Auto Map
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="field in fieldsForType" :key="field.key" class="space-y-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest flex items-center justify-between px-1">
                <span>{{ field.label }}<span v-if="field.required" class="text-red-500 ml-1 font-black">*</span></span>
              </label>
              <select v-model="mapping[field.key]" class="w-full h-11 px-4 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase appearance-none cursor-pointer focus:ring-1 focus:ring-[#2F2E8B] outline-none">
                <option :value="''" :disabled="field.required">-- Skip Field --</option>
                <optgroup label="File Columns">
                  <option v-for="h in headers" :key="'h-'+h" :value="h">{{ h.toUpperCase() }}</option>
                </optgroup>
                <optgroup label="System Fields">
                  <option v-for="opt in internalMappingOptions" :key="'opt-'+opt" :value="opt">{{ (getFieldLabel(opt) || opt).toUpperCase() }}</option>
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        <!-- Step 4: Preview -->
        <div v-if="editableItems.length && importMode === 'new_items'" class="space-y-4">
          <div class="flex items-center justify-between border-b border-gray-100 pb-2">
              <div class="flex items-center gap-4">
                <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest leading-none">Import Preview</h4>
              </div>
              <div class="flex items-center gap-4 text-[9px] font-mono font-black uppercase text-gray-400 tracking-widest">
                <span>Ready: <span class="text-emerald-600">{{ readyCount }}</span></span>
                <span>Error: <span class="text-red-500">{{ missingCount }}</span></span>
              </div>
          </div>

          <!-- Preview & Batch Tools -->
          <div class="bg-gray-50/50 border border-gray-100 rounded-none p-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div class="flex items-center gap-2 w-full md:w-auto">
                 <button @click="jumpToFirstError" class="flex-1 md:flex-none h-9 px-4 border border-gray-200 bg-white rounded-none text-[9px] font-mono font-black uppercase tracking-widest hover:border-red-500 transition-colors" :disabled="!hasAnyRowError">
                    Jump to Error
                 </button>
            </div>

            <div class="h-6 w-px bg-gray-200 hidden md:block"></div>

            <div class="flex flex-col md:flex-row md:items-center gap-3 w-full">
              <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Tools:</span>
              <div class="flex bg-white border border-gray-200 rounded-none p-0.5 w-full md:w-auto overflow-x-auto">
                  <button @click.prevent="trimColumn(currentBatchColumn)" class="flex-1 md:flex-none h-8 px-3 text-[8px] font-mono font-black uppercase hover:bg-gray-50 rounded-none transition-colors whitespace-nowrap">Trim Space</button>
                  <button @click.prevent="upperCaseColumn(currentBatchColumn)" class="flex-1 md:flex-none h-8 px-3 text-[8px] font-mono font-black uppercase hover:bg-gray-50 rounded-none transition-colors whitespace-nowrap">Uppercase</button>
                  <button @click.prevent="lowerCaseColumn(currentBatchColumn)" class="flex-1 md:flex-none h-8 px-3 text-[8px] font-mono font-black uppercase hover:bg-gray-50 rounded-none transition-colors whitespace-nowrap">Lowercase</button>
              </div>
              <select v-model="currentBatchColumn" class="w-full md:w-auto h-9 px-4 bg-white border border-gray-200 rounded-none text-[9px] font-mono font-black uppercase outline-none md:min-w-[150px]">
                <option :value="''">Select Column...</option>
                <option v-for="c in previewHeaders" :key="c" :value="c">{{ (getFieldLabel(c) || c).toUpperCase() }}</option>
              </select>
            </div>
          </div>

          <!-- Hidden columns chips (click to restore) -->
          <div v-if="hiddenPreviewColsList.length" class="flex items-center gap-2 flex-wrap px-1">
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Hidden:</span>
            <button
              v-for="col in hiddenPreviewColsList"
              :key="col"
              @click="restorePreviewCol(col)"
              class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-[9px] font-mono font-black uppercase tracking-widest text-gray-600 transition-colors rounded-none"
              title="Restore column"
            >
              <i class="fas fa-plus text-[8px]"></i>
              {{ (getFieldLabel(col) || col).toUpperCase() }}
            </button>
            <button @click="restoreAllPreviewCols" class="text-[9px] font-mono font-black text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest underline">Restore all</button>
          </div>

          <div class="border border-gray-100 rounded-none overflow-hidden min-h-[400px] max-h-[600px] overflow-x-auto overflow-y-auto custom-scrollbar">
            <table class="w-full font-mono text-[10px] min-w-max">
              <thead class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100">
                <tr>
                  <th class="px-6 py-4 text-left font-black uppercase tracking-widest w-40 sticky left-0 bg-gray-50 z-20 shadow-sm">Action</th>
                  <th v-for="col in previewHeaders" :key="col" class="px-2 py-2 text-left font-black uppercase tracking-widest whitespace-nowrap min-w-[150px] group">
                    <div class="space-y-2">
                      <div class="flex items-center justify-between gap-2">
                        <span>{{ (getFieldLabel(col) || col).toUpperCase() }}</span>
                        <button
                          @click.stop="hidePreviewCol(col)"
                          title="Hide column"
                          class="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-none"
                        >
                          <i class="fas fa-times text-[9px]"></i>
                        </button>
                      </div>
                      <div class="flex items-center gap-1">
                        <input 
                          v-model="columnApplyValues[col]" 
                          type="text" 
                          placeholder="Value..." 
                          class="w-full h-7 px-2 bg-white border border-gray-200 rounded-none text-[8px] font-bold uppercase outline-none focus:ring-1 focus:ring-[#2F2E8B]"
                          @keypress.enter="applyToColumnMissing(col)"
                        />
                        <button 
                          @click="applyToColumnAll(col)" 
                          title="Apply to All"
                          class="h-7 w-7 flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-none transition-colors"
                          :disabled="!columnApplyValues[col]"
                        >
                          <i class="fas fa-fill text-[8px] text-indigo-600"></i>
                        </button>
                        <button 
                          @click="applyToColumnMissing(col)" 
                          title="Apply to Empty"
                          class="h-7 w-7 flex items-center justify-center bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-none transition-colors"
                          :disabled="!columnApplyValues[col]"
                        >
                          <i class="fas fa-fill-drip text-[8px] text-emerald-600"></i>
                        </button>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="(row, idx) in editableItems" :key="idx" :class="['odd:bg-white even:bg-[#FAFAFA]', rowErrors[idx] ? 'bg-red-50/50' : '']">
                  <td class="px-6 py-4 align-top w-40 sticky left-0 z-10 shadow-sm" :class="['odd:bg-white even:bg-[#FAFAFA]', rowErrors[idx] ? 'bg-red-50/50' : '']">
                    <select v-if="duplicateItems.has(editableItems[idx]?.name)" v-model="duplicateActions[idx]" class="w-full text-[9px] font-black uppercase border border-gray-200 rounded-none px-2 py-1.5 focus:ring-1 focus:ring-[#2F2E8B] outline-none" :class="duplicateActions[idx] === 'skip' ? 'bg-red-50 text-red-700 border-red-200' : duplicateActions[idx] === 'updateExisting' ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'">
                      <option value="skip">Skip Duplicate</option>
                      <option value="addStock">Add to Stock</option>
                      <option value="updateExisting">Update Existing</option>
                    </select>
                    <span v-else class="text-[9px] font-black text-gray-300 uppercase tracking-widest pl-2">Create New</span>
                  </td>
                  <td v-for="col in previewHeaders" :key="col" class="px-6 py-4 align-top min-w-[150px]">
                    <div class="relative">
                        <input v-model="editableItems[idx][col]" class="w-full bg-transparent border-0 border-b border-transparent focus:border-[#2F2E8B] focus:ring-0 text-[10px] font-black uppercase p-0.5 transition-all outline-none whitespace-nowrap" :class="isCellInvalid(editableItems[idx], col) ? 'text-red-500 border-red-300' : 'text-gray-700'" />
                        <div v-if="isCellInvalid(editableItems[idx], col)" class="text-[8px] font-black text-red-400 mt-0.5 uppercase whitespace-nowrap">Required</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between pt-4 bg-white/50 border-t border-gray-100">
            <div class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
                Total items in batch: <span class="text-gray-900 font-bold">{{ editableItems.length }}</span>
            </div>
            <div class="text-[9px] font-mono font-bold text-gray-400 uppercase">
              Scroll down to review all items
            </div>
          </div>
        </div>

        <!-- ── STOCK UPDATE MODE ──────────────────────────────────────────── -->
        <div v-if="importMode === 'stock_update'" class="space-y-6">

          <!-- Upload section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 bg-gray-50 border border-gray-100 rounded-none">
            <div class="space-y-4">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Stock Update File</label>
              <!-- Branch selector -->
              <div class="space-y-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Target Branch</label>
                <div class="relative">
                  <select v-model="selectedImportBranch" class="w-full h-11 px-4 pr-10 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase appearance-none cursor-pointer focus:ring-1 focus:ring-[#2F2E8B] outline-none">
                    <option value="main">MAIN (DEFAULT)</option>
                    <option v-for="branch in props.branches" :key="branch._id || branch.id" :value="branch._id || branch.id">
                      {{ branch.name ? branch.name.toUpperCase() : branch._id || branch.id }}
                    </option>
                  </select>
                  <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
                </div>
              </div>
              <input type="file" accept=".xlsx,.xls,.csv" @change="onStockUpdateFileChange"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase file:mr-4 file:py-1 file:px-4 file:rounded-none file:border-0 file:text-[9px] file:font-black file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all" />
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-tight px-1">Supported: .xlsx, .xls, .csv</p>
              <div v-if="stockUpdateFileName" class="p-3 bg-white border border-emerald-100 rounded-none flex items-center justify-between">
                <span class="text-[10px] font-mono font-black text-emerald-700 truncate uppercase">{{ stockUpdateFileName }}</span>
                <span v-if="isLoadingCurrentStock" class="text-[9px] font-mono font-bold text-emerald-600 uppercase">
                  <i class="fas fa-spinner fa-spin mr-1"></i>Loading Stock...
                </span>
                <span v-else class="text-[9px] font-mono font-black text-gray-400 uppercase">{{ stockUpdateRows.length }} Items</span>
              </div>
            </div>
            <div class="space-y-4">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">File Format</label>
              <div class="p-4 bg-gray-900 rounded-none border-l-4 border-emerald-500">
                <code class="text-[11px] font-mono text-emerald-300 break-all uppercase tracking-tight">Name, SKU (optional), Quantity</code>
              </div>
              <button @click="downloadStockUpdateTemplate" class="w-full py-2 bg-emerald-50/50 text-emerald-700 text-[9px] font-mono font-black uppercase border border-emerald-100/50 rounded-none hover:bg-emerald-50 transition-colors">
                <i class="fas fa-download mr-1"></i> Download Template
              </button>
              <div v-if="stockUpdateRows.length && !isLoadingCurrentStock" class="flex flex-wrap items-center gap-4 text-[9px] font-mono font-black uppercase tracking-widest p-3 bg-white border border-gray-100">
                <span>Matched: <span class="text-emerald-600">{{ stockUpdateMatchedCount }}</span></span>
                <span>Not Found: <span class="text-red-500">{{ stockUpdateUnmatchedCount }}</span></span>
                <button v-if="stockUpdateUnmatchedCount > 0" @click="exportUnmatchedStockUpdate"
                  class="ml-auto px-3 py-1.5 bg-red-50 text-red-700 text-[8px] font-mono font-black uppercase border border-red-200 hover:bg-red-100 transition-colors flex items-center gap-1.5"
                  title="Download unmatched items as Excel for audit review">
                  <i class="fas fa-file-excel text-[10px]"></i> Export Unmatched
                </button>
              </div>
            </div>
          </div>

          <!-- Preview table -->
          <div v-if="stockUpdateRows.length && !isLoadingCurrentStock" class="space-y-3">
            <div class="flex items-center justify-between border-b border-gray-100 pb-2">
              <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Stock Update Preview</h4>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">
                Only <span class="text-[#2F2E8B] font-black">Apply Qty</span> is editable
              </span>
            </div>
            <div class="border border-gray-100 rounded-none overflow-hidden max-h-[420px] overflow-x-auto overflow-y-auto custom-scrollbar">
              <table class="w-full font-mono text-[10px] min-w-max">
                <thead class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest w-10">#</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[160px]">Item Name</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[100px]">SKU</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[120px] bg-gray-100/60">Current Stock</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[90px]">From File</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[120px] bg-blue-50/80 text-[#2F2E8B]">Apply Qty ✎</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[100px] bg-emerald-50/80 text-emerald-700">New Total</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[90px]">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="(row, idx) in stockUpdateRows" :key="idx"
                      :class="['odd:bg-white even:bg-[#FAFAFA]', !row.matched ? 'opacity-50' : '']">
                    <td class="px-4 py-3 text-gray-400">{{ idx + 1 }}</td>
                    <td class="px-4 py-3 font-black text-gray-800 uppercase">{{ row.name || '—' }}</td>
                    <td class="px-4 py-3 text-gray-500">{{ row.sku || '—' }}</td>
                    <!-- LOCKED: current stock from DB -->
                    <td class="px-4 py-3 font-black text-gray-700 bg-gray-50/60">
                      <span v-if="row.matched">{{ row.currentStock }}</span>
                      <span v-else class="text-gray-300">—</span>
                    </td>
                    <!-- LOCKED: qty from uploaded file -->
                    <td class="px-4 py-3 text-gray-400">{{ row.fileQty }}</td>
                    <!-- EDITABLE: only this column -->
                    <td class="px-4 py-3 bg-blue-50/20">
                      <input v-if="row.matched" v-model.number="row.applyQty" type="number" min="0" step="1"
                        class="w-20 bg-white border border-[#2F2E8B]/30 focus:border-[#2F2E8B] focus:ring-0 text-[10px] font-black text-[#2F2E8B] px-2 py-1 outline-none rounded-none" />
                      <span v-else class="text-gray-300">—</span>
                    </td>
                    <!-- COMPUTED: current + apply qty -->
                    <td class="px-4 py-3 font-black bg-emerald-50/20" :class="row.matched ? 'text-emerald-700' : 'text-gray-300'">
                      {{ row.matched ? (Number(row.currentStock) + Number(row.applyQty || 0)) : '—' }}
                    </td>
                    <td class="px-4 py-3">
                      <span v-if="row.matched" class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 text-[8px] font-black uppercase">Matched</span>
                      <span v-else class="bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 text-[8px] font-black uppercase">Not Found</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="stockUpdateSuccess" class="p-3 bg-emerald-50 border border-emerald-100 rounded-none flex items-center gap-3">
              <i class="fas fa-check-circle text-emerald-500"></i>
              <span class="text-[10px] font-mono font-black text-emerald-700 uppercase tracking-widest">
                Stock updated for {{ stockUpdateMatchedCount }} items!
              </span>
            </div>
          </div>
        </div>
        <!-- ── END STOCK UPDATE MODE ──────────────────────────────────────── -->

        <!-- ── BULK UPDATE MODE (update specific fields on existing products) ── -->
        <div v-if="importMode === 'bulk_update'" class="space-y-6">

          <!-- Controls Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 bg-gray-50 border border-gray-100 rounded-none">
            <!-- Branch Selector -->
            <div class="space-y-4">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Target Branch</label>
              <div class="relative">
                <select v-model="selectedImportBranch" @change="bulkUpdateLoadProducts" class="w-full h-11 px-4 pr-10 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase appearance-none cursor-pointer focus:ring-1 focus:ring-amber-500 outline-none">
                  <option value="main">MAIN (DEFAULT)</option>
                  <option v-for="branch in props.branches" :key="branch._id || branch.id" :value="branch._id || branch.id">
                    {{ branch.name ? branch.name.toUpperCase() : branch._id || branch.id }}
                  </option>
                </select>
                <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
              </div>
              <button @click="bulkUpdateLoadProducts" :disabled="bulkUpdateLoading" class="w-full h-10 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2">
                <i class="fas fa-sync-alt" :class="{ 'fa-spin': bulkUpdateLoading }"></i>
                {{ bulkUpdateLoading ? 'Loading Products...' : 'Load Existing Products' }}
              </button>
            </div>

            <!-- Field Selector -->
            <div class="space-y-3">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Select Fields to Update</label>
              <p class="text-[9px] font-mono text-gray-400 uppercase">Check the columns you want to edit and apply in bulk:</p>
              <div class="grid grid-cols-2 gap-2">
                <label v-for="field in bulkUpdateAvailableFields" :key="field.key" class="flex items-center gap-2 cursor-pointer p-2 bg-white border border-gray-100 hover:border-amber-300 transition-colors rounded-none">
                  <input type="checkbox" :value="field.key" v-model="bulkUpdateSelectedFields" class="w-3.5 h-3.5 accent-amber-500 cursor-pointer" />
                  <span class="text-[9px] font-mono font-black text-gray-600 uppercase truncate">{{ field.label }}</span>
                </label>
              </div>
              <div v-if="bulkUpdateRows.length > 0" class="flex gap-3 text-[9px] font-mono font-black uppercase tracking-widest p-3 bg-white border border-gray-100">
                <span>Products: <span class="text-amber-600">{{ bulkUpdateRows.length }}</span></span>
                <span>Selected: <span class="text-[#2F2E8B]">{{ bulkUpdateSelectedCount }}</span></span>
              </div>
            </div>
          </div>

          <!-- Global Apply Banner -->
          <div v-if="bulkUpdateRows.length > 0 && bulkUpdateSelectedFields.length > 0" class="p-4 bg-amber-50 border border-amber-100 rounded-none">
            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <span class="text-[10px] font-mono font-black text-amber-700 uppercase tracking-widest whitespace-nowrap">Apply to all rows:</span>
              <div class="flex flex-wrap gap-2">
                <div v-for="field in bulkUpdateActiveFields" :key="'ga-'+field.key" class="flex items-center gap-1.5">
                  <span class="text-[8px] font-mono font-black text-gray-500 uppercase">{{ field.label }}:</span>
                  <input
                    v-model="bulkUpdateGlobalValues[field.key]"
                    :type="field.inputType || 'text'"
                    :placeholder="field.placeholder || 'Value...' "
                    class="h-7 w-28 px-2 bg-white border border-amber-200 rounded-none text-[9px] font-mono font-black focus:ring-1 focus:ring-amber-400 outline-none"
                    @keypress.enter="bulkUpdateApplyGlobal(field.key)"
                  />
                  <button @click="bulkUpdateApplyGlobal(field.key)" :disabled="!bulkUpdateGlobalValues[field.key] && bulkUpdateGlobalValues[field.key] !== 0" title="Apply to all" class="h-7 w-7 flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white rounded-none transition-colors disabled:opacity-30">
                    <i class="fas fa-fill text-[8px]"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Preview Table -->
          <div v-if="bulkUpdateRows.length > 0 && bulkUpdateSelectedFields.length > 0" class="space-y-3">
            <div class="flex items-center justify-between border-b border-gray-100 pb-2">
              <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Product Edit Grid</h4>
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" v-model="bulkUpdateSelectAll" class="w-3.5 h-3.5 accent-amber-500" @change="toggleBulkUpdateSelectAll" />
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase">Select All</span>
                </label>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">
                  Editing <span class="text-amber-600 font-black">{{ bulkUpdateActiveFields.map(f=>f.label).join(', ') }}</span>
                </span>
              </div>
            </div>
            <div class="border border-gray-100 rounded-none overflow-hidden max-h-[450px] overflow-x-auto overflow-y-auto custom-scrollbar">
              <table class="w-full font-mono text-[10px] min-w-max">
                <thead class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100">
                  <tr>
                    <th class="px-3 py-3 text-left font-black uppercase tracking-widest w-8">
                      <input type="checkbox" v-model="bulkUpdateSelectAll" @change="toggleBulkUpdateSelectAll" class="w-3.5 h-3.5 accent-amber-500" />
                    </th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[180px]">Product Name</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[90px]">Type</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[100px]">SKU</th>
                    <th v-for="field in bulkUpdateActiveFields" :key="'th-'+field.key"
                       class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[140px] bg-amber-50/60 text-amber-700">
                      {{ field.label }} ✎
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="(row, idx) in bulkUpdateRows" :key="idx"
                      :class="['odd:bg-white even:bg-[#FAFAFA]', row._selected ? 'bg-amber-50/40' : '']">
                    <td class="px-3 py-3">
                      <input type="checkbox" v-model="row._selected" class="w-3.5 h-3.5 accent-amber-500 cursor-pointer" />
                    </td>
                    <td class="px-4 py-3 font-black text-gray-800 uppercase text-[10px]">{{ row.name || '—' }}</td>
                    <td class="px-4 py-3 text-gray-500 text-[9px]">
                      <span :class="row.type === 'Equipment' ? 'text-amber-600' : row.type === 'Service' ? 'text-purple-600' : 'text-[#2F2E8B]'" class="font-black uppercase">{{ row.type || '—' }}</span>
                    </td>
                    <td class="px-4 py-3 text-gray-400 text-[9px]">{{ row.sku || row.partNumber || '—' }}</td>
                    <td v-for="field in bulkUpdateActiveFields" :key="'td-'+field.key" class="px-4 py-3 bg-amber-50/10">
                      <input
                        v-model="row[field.key]"
                        :type="field.inputType || 'text'"
                        :step="field.step || undefined"
                        :placeholder="row._original?.[field.key] !== undefined ? String(row._original[field.key]) : field.placeholder || ''"
                        class="w-full bg-white border border-amber-200/60 focus:border-amber-400 focus:ring-0 text-[10px] font-black text-gray-700 px-2 py-1 outline-none rounded-none"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Success banner -->
            <div v-if="bulkUpdateSuccess" class="p-3 bg-emerald-50 border border-emerald-100 rounded-none flex items-center gap-3">
              <i class="fas fa-check-circle text-emerald-500"></i>
              <span class="text-[10px] font-mono font-black text-emerald-700 uppercase tracking-widest">
                Updated {{ bulkUpdateSuccessCount }} product(s) successfully!
              </span>
            </div>
            <div v-if="bulkUpdateError" class="p-3 bg-red-50 border border-red-100 rounded-none flex items-center gap-3">
              <i class="fas fa-times-circle text-red-500"></i>
              <span class="text-[10px] font-mono font-black text-red-700 uppercase tracking-widest">{{ bulkUpdateError }}</span>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else-if="!bulkUpdateLoading && bulkUpdateRows.length === 0" class="flex flex-col items-center justify-center py-12 text-center gap-3">
            <div class="h-14 w-14 bg-amber-50 border border-amber-100 flex items-center justify-center">
              <i class="fas fa-edit text-amber-400 text-2xl"></i>
            </div>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Select a branch and click "Load Existing Products"</p>
            <p class="text-[9px] font-mono text-gray-300 uppercase">Then choose the fields you want to update in bulk</p>
          </div>
          <div v-else-if="!bulkUpdateLoading && bulkUpdateRows.length > 0 && bulkUpdateSelectedFields.length === 0" class="flex flex-col items-center justify-center py-8 text-center gap-3">
            <i class="fas fa-hand-pointer text-amber-300 text-2xl"></i>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Select at least one field column to edit</p>
          </div>

        </div>
        <!-- ── END BULK UPDATE MODE ──────────────────────────────────────────── -->

        <!-- ── PRICE UPDATE MODE (update prices on existing products from CSV) ── -->
        <div v-if="importMode === 'price_update'" class="space-y-6">

          <!-- Controls Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6 bg-gray-50 border border-gray-100 rounded-none">
            <!-- Branch Selector -->
            <div class="space-y-4">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Target Branch</label>
              <div class="relative">
                <select v-model="selectedImportBranch" @change="priceUpdateLoadProducts" class="w-full h-11 px-4 pr-10 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase appearance-none cursor-pointer focus:ring-1 focus:ring-purple-500 outline-none">
                  <option value="main">MAIN (DEFAULT)</option>
                  <option v-for="branch in props.branches" :key="branch._id || branch.id" :value="branch._id || branch.id">
                    {{ branch.name ? branch.name.toUpperCase() : branch._id || branch.id }}
                  </option>
                </select>
                <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
              </div>
              <input type="file" accept=".xlsx,.xls,.csv" @change="onPriceUpdateFileChange"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase file:mr-4 file:py-1 file:px-4 file:rounded-none file:border-0 file:text-[9px] file:font-black file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all" />
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-tight px-1">Supported: .xlsx, .xls, .csv</p>
              <div v-if="priceUpdateFileName" class="p-3 bg-white border border-purple-100 rounded-none flex items-center justify-between">
                <span class="text-[10px] font-mono font-black text-purple-700 truncate uppercase">{{ priceUpdateFileName }}</span>
                <span v-if="priceUpdateLoading" class="text-[9px] font-mono font-bold text-purple-600 uppercase">
                  <i class="fas fa-spinner fa-spin mr-1"></i>Loading Products...
                </span>
                <span v-else class="text-[9px] font-mono font-black text-gray-400 uppercase">{{ priceUpdateRows.length }} Items</span>
              </div>
            </div>

            <!-- Field Selector -->
            <div class="space-y-3">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Select Price Fields to Update</label>
              <p class="text-[9px] font-mono text-gray-400 uppercase">Check the price columns you want to edit and apply in bulk:</p>
              <div class="grid grid-cols-2 gap-2">
                <label v-for="field in priceUpdateAvailableFields" :key="field.key" class="flex items-center gap-2 cursor-pointer p-2 bg-white border border-gray-100 hover:border-purple-300 transition-colors rounded-none">
                  <input type="checkbox" :value="field.key" v-model="priceUpdateSelectedFields" class="w-3.5 h-3.5 accent-purple-500 cursor-pointer" />
                  <span class="text-[9px] font-mono font-black text-gray-600 uppercase truncate">{{ field.label }}</span>
                </label>
              </div>
              <div v-if="priceUpdateRows.length > 0" class="flex gap-3 text-[9px] font-mono font-black uppercase tracking-widest p-3 bg-white border border-gray-100">
                <span>Products: <span class="text-purple-600">{{ priceUpdateRows.length }}</span></span>
                <span>Selected: <span class="text-[#2F2E8B]">{{ priceUpdateSelectedCount }}</span></span>
              </div>
            </div>
          </div>

          <!-- Global Apply Banner -->
          <div v-if="priceUpdateRows.length > 0 && priceUpdateSelectedFields.length > 0" class="p-4 bg-purple-50 border border-purple-100 rounded-none">
            <div class="flex flex-col md:flex-row md:items-center gap-3">
              <span class="text-[10px] font-mono font-black text-purple-700 uppercase tracking-widest whitespace-nowrap">Apply to all selected rows:</span>
              <div class="flex flex-wrap gap-2">
                <div v-for="field in priceUpdateActiveFields" :key="'ga-'+field.key" class="flex items-center gap-1.5">
                  <span class="text-[8px] font-mono font-black text-gray-500 uppercase">{{ field.label }}:</span>
                  <input
                    v-model="priceUpdateGlobalValues[field.key]"
                    :type="field.inputType || 'text'"
                    :step="field.step || undefined"
                    :placeholder="field.placeholder || 'Value...' "
                    class="h-7 w-28 px-2 bg-white border border-purple-200 rounded-none text-[9px] font-mono font-black focus:ring-1 focus:ring-purple-400 outline-none"
                    @keypress.enter="priceUpdateApplyGlobal(field.key)"
                  />
                  <button @click="priceUpdateApplyGlobal(field.key)" :disabled="!priceUpdateGlobalValues[field.key] && priceUpdateGlobalValues[field.key] !== 0" title="Apply to all" class="h-7 w-7 flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-none transition-colors disabled:opacity-30">
                    <i class="fas fa-fill text-[8px]"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Preview Table -->
          <div v-if="priceUpdateRows.length > 0 && priceUpdateSelectedFields.length > 0" class="space-y-3">
            <div class="flex items-center justify-between border-b border-gray-100 pb-2">
              <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Price Edit Grid</h4>
              <div class="flex items-center gap-3">
                <label class="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" v-model="priceUpdateSelectAll" class="w-3.5 h-3.5 accent-purple-500" @change="togglePriceUpdateSelectAll" />
                  <span class="text-[9px] font-mono font-black text-gray-400 uppercase">Select All Matched</span>
                </label>
                <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">
                  Editing <span class="text-purple-600 font-black">{{ priceUpdateActiveFields.map(f=>f.label).join(', ') }}</span>
                </span>
              </div>
            </div>
            <div class="border border-gray-100 rounded-none overflow-hidden max-h-[450px] overflow-x-auto overflow-y-auto custom-scrollbar">
              <table class="w-full font-mono text-[10px] min-w-max">
                <thead class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100">
                  <tr>
                    <th class="px-3 py-3 text-left font-black uppercase tracking-widest w-8">
                      <input type="checkbox" v-model="priceUpdateSelectAll" @change="togglePriceUpdateSelectAll" class="w-3.5 h-3.5 accent-purple-500" />
                    </th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[180px]">Product Name</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[90px]">Type</th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[100px]">SKU</th>
                    <th v-for="field in priceUpdateAvailableFields" :key="'th-'+field.key"
                       class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[120px] bg-gray-50/60 text-gray-700">
                      Current {{ field.label }}
                    </th>
                    <th v-for="field in priceUpdateActiveFields" :key="'th-new-'+field.key"
                       class="px-4 py-3 text-left font-black uppercase tracking-widest min-w-[140px] bg-purple-50/60 text-purple-700">
                      New {{ field.label }} ✎
                    </th>
                    <th class="px-4 py-3 text-left font-black uppercase tracking-widest w-24">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr v-for="(row, idx) in priceUpdateRows" :key="idx"
                      :class="['odd:bg-white even:bg-[#FAFAFA]', row.matched ? (row._selected ? 'bg-purple-50/40' : '') : 'opacity-50']">
                    <td class="px-3 py-3">
                      <input type="checkbox" v-model="row._selected" :disabled="!row.matched" class="w-3.5 h-3.5 accent-purple-500 cursor-pointer" />
                    </td>
                    <td class="px-4 py-3 font-black text-gray-800 uppercase text-[10px]">{{ row.name || '—' }}</td>
                    <td class="px-4 py-3 text-gray-500 text-[9px]">
                      <span :class="row.type === 'Equipment' ? 'text-amber-600' : row.type === 'Service' ? 'text-purple-600' : 'text-[#2F2E8B]'" class="font-black uppercase">{{ row.type || '—' }}</span>
                    </td>
                    <td class="px-4 py-3 text-gray-400 text-[9px]">{{ row.sku || '—' }}</td>
                    <td v-for="field in priceUpdateAvailableFields" :key="'td-orig-'+field.key" class="px-4 py-3 bg-gray-50/10">
                      <span class="text-[10px] font-medium text-gray-500">{{ row[`_original_${field.key}`] !== undefined ? row[`_original_${field.key}`] : '—' }}</span>
                    </td>
                    <td v-for="field in priceUpdateActiveFields" :key="'td-new-'+field.key" class="px-4 py-3 bg-purple-50/10">
                      <input
                        v-model="row[field.key]"
                        :type="field.inputType || 'text'"
                        :step="field.step || undefined"
                        :placeholder="row[`_original_${field.key}`] !== undefined ? String(row[`_original_${field.key}`]) : field.placeholder || ''"
                        class="w-full bg-white border border-purple-200/60 focus:border-purple-400 focus:ring-0 text-[10px] font-black text-gray-700 px-2 py-1 outline-none rounded-none"
                      />
                    </td>
                    <td class="px-4 py-3">
                      <span v-if="row.matched" class="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 text-[8px] font-black uppercase">Matched</span>
                      <span v-else class="bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 text-[8px] font-black uppercase">Not Found</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Success banner -->
            <div v-if="priceUpdateSuccess" class="p-3 bg-emerald-50 border border-emerald-100 rounded-none flex items-center gap-3">
              <i class="fas fa-check-circle text-emerald-500"></i>
              <span class="text-[10px] font-mono font-black text-emerald-700 uppercase tracking-widest">
                Updated {{ priceUpdateSuccessCount }} product(s) successfully!
              </span>
            </div>
            <div v-if="priceUpdateError" class="p-3 bg-red-50 border border-red-100 rounded-none flex items-center gap-3">
              <i class="fas fa-times-circle text-red-500"></i>
              <span class="text-[10px] font-mono font-black text-red-700 uppercase tracking-widest">{{ priceUpdateError }}</span>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else-if="!priceUpdateLoading && priceUpdateRows.length === 0" class="flex flex-col items-center justify-center py-12 text-center gap-3">
            <div class="h-14 w-14 bg-purple-50 border border-purple-100 flex items-center justify-center">
              <i class="fas fa-dollar-sign text-purple-400 text-2xl"></i>
            </div>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Upload a CSV/Excel file with product names/SKUs and new prices</p>
            <p class="text-[9px] font-mono text-gray-300 uppercase">Ensure your file has 'Name' or 'SKU' and price columns like 'Selling Price' or 'Buying Price'</p>
            <button @click="downloadPriceUpdateTemplate" class="mt-4 w-full md:w-auto py-2 bg-purple-50/50 text-purple-700 text-[9px] font-mono font-black uppercase border border-purple-100/50 rounded-none hover:bg-purple-50 transition-colors">
              <i class="fas fa-download mr-1"></i> Download Template
            </button>
          </div>
          <div v-else-if="!priceUpdateLoading && priceUpdateRows.length > 0 && priceUpdateSelectedFields.length === 0" class="flex flex-col items-center justify-center py-8 text-center gap-3">
            <i class="fas fa-hand-pointer text-purple-300 text-2xl"></i>
            <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Select at least one price column to edit</p>
          </div>

        </div>
        <!-- ── END PRICE UPDATE MODE ─────────────────────────────────────────── -->
      
        <!-- Footer Actions -->
        <div v-show="importMode === 'new_items'" class="flex items-center justify-between w-full pt-6 mt-6 border-t border-gray-100">
            <div class="flex-1 max-w-2xl">
                <div v-if="importing" class="space-y-2">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-[9px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Importing: {{ progressPercent }}%</span>
                        <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">{{ done }} of {{ totalToImport }} items</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-none h-1.5 overflow-hidden">
                       
                    </div>
                </div>

                <div v-if="!importing && importResults.length" class="p-3 bg-amber-50 border border-amber-100 rounded-none flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <i class="fas fa-exclamation-circle text-amber-500"></i>
                        <span class="text-[10px] font-mono font-black text-amber-700 uppercase tracking-widest">{{ importResults.length }} issues found in this batch</span>
                    </div>
                    <div class="flex gap-2">
                        <button @click="showErrorModal = true" class="px-4 py-1.5 bg-gray-600 text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-none hover:bg-gray-700 transition-colors">View Details</button>
                        <button @click="retryFailed" class="px-4 py-1.5 bg-amber-600 text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-none hover:bg-amber-700 transition-colors">Retry Now</button>
                    </div>
                </div>

                <div v-else-if="importSuccess" class="p-3 bg-emerald-50 border border-emerald-100 rounded-none flex items-center gap-3">
                    <i class="fas fa-check-circle text-emerald-500"></i>
                    <span class="text-[10px] font-mono font-black text-emerald-700 uppercase tracking-widest">All items imported successfully!</span>
                </div>
            </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 shrink-0">
            <!-- Branch indicator -->
            <div v-if="props.branches && props.branches.length" class="flex items-center gap-2 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              <i class="fas fa-code-branch text-[#2F2E8B]"></i>
              <span>Branch:</span>
              <span class="text-[#2F2E8B] font-black">
                {{ selectedImportBranch === 'main' ? 'MAIN' : (props.branches.find(b => (b._id || b.id) === selectedImportBranch)?.name?.toUpperCase() || (selectedImportBranch ? selectedImportBranch.toUpperCase() : 'ALL / DEFAULT')) }}
              </span>
            </div>
            <div class="flex items-center gap-3 md:gap-4 w-full md:w-auto">
            <button @click="$emit('close')" class="w-full md:w-auto px-6 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-600 transition-colors">Cancel</button>
            <!-- New Items import button -->
            <button 
                v-if="importMode === 'new_items' && !importSuccess && !importResults.length"
                :disabled="!canImport || importing"
                @click="startImport"
                class="w-full md:w-auto px-8 py-2.5 bg-[#2F2E8B] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-[#1D226B] shadow-lg shadow-indigo-100 transition-all transform active:scale-95 disabled:opacity-50 md:min-w-[200px]"
            >
                <span v-if="importing" class="flex items-center gap-3 justify-center">
                    <i class="fas fa-spinner fa-spin"></i>
                    Importing...
                </span>
                <span v-else>Import {{ readyCount }} Items Now</span>
            </button>
            <!-- Stock Update import button -->
            <button
                v-if="importMode === 'stock_update' && !stockUpdateSuccess"
                :disabled="!stockUpdateCanImport || stockUpdateImporting"
                @click="startStockUpdateImport"
                class="w-full md:w-auto px-8 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-emerald-700 shadow-lg transition-all transform active:scale-95 disabled:opacity-50 md:min-w-[200px]"
            >
                <span v-if="stockUpdateImporting" class="flex items-center gap-3 justify-center">
                    <i class="fas fa-spinner fa-spin"></i>
                    Updating...
                </span>
                <span v-else>Update {{ stockUpdateMatchedCount }} Item Stock</span>
            </button>
            <!-- Bulk Field Update button -->
            <button
                v-if="importMode === 'bulk_update' && !bulkUpdateSuccess"
                :disabled="!bulkUpdateCanSubmit || bulkUpdateSubmitting"
                @click="startBulkFieldUpdate"
                class="w-full md:w-auto px-8 py-2.5 bg-amber-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-amber-600 shadow-lg transition-all transform active:scale-95 disabled:opacity-50 md:min-w-[220px]"
            >
                <span v-if="bulkUpdateSubmitting" class="flex items-center gap-3 justify-center">
                    <i class="fas fa-spinner fa-spin"></i>
                    Updating fields...
                </span>
                <span v-else>Update {{ bulkUpdateSelectedCount }} Product(s)</span>
            </button>
            <!-- Price Update button -->
            <button
                v-if="importMode === 'price_update' && !priceUpdateSuccess"
                :disabled="!priceUpdateCanSubmit || priceUpdateSubmitting"
                @click="startPriceUpdate"
                class="w-full md:w-auto px-8 py-2.5 bg-purple-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-purple-700 shadow-lg transition-all transform active:scale-95 disabled:opacity-50 md:min-w-[200px]"
            >
                <span v-if="priceUpdateSubmitting" class="flex items-center gap-3 justify-center">
                    <i class="fas fa-spinner fa-spin"></i>
                    Updating prices...
                </span>
                <span v-else>Update {{ priceUpdateSelectedCount }} Product(s) Prices</span>
            </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  <!-- Error Details Modal -->
  <div v-if="showErrorModal" class="fixed inset-0 flex items-center justify-center p-2 md:p-6 overflow-hidden z-[9999]">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="showErrorModal = false"></div>
    
    <!-- Modal Content -->
    <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-5xl flex flex-col max-h-[90vh] rounded-none pointer-events-auto">
      <!-- Header -->
      <div class="h-1.5 w-full bg-[#2F2E8B]"></div>
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-red-50 flex items-center justify-center text-red-500 rounded-none shrink-0">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest truncate">Import Issues</div>
            <div class="text-sm font-black text-gray-900 uppercase tracking-tight truncate">Failed Items</div>
          </div>
        </div>
        <button @click="showErrorModal = false" class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100 shrink-0">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Content -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <div class="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
          <!-- Summary -->
          <div class="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-none">
            <i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>
            <div>
              <p class="text-sm font-mono font-black text-red-700 uppercase tracking-widest">Import Issues Summary</p>
              <p class="text-[10px] font-mono text-red-600 mt-1">{{ importResults.length }} item(s) failed to import</p>
            </div>
          </div>

          <!-- Failed Items Table -->
          <div class="border border-gray-200 rounded-none overflow-x-auto">
            <table class="w-full text-sm min-w-[600px]">
              <thead class="bg-gray-50 sticky top-0">
                <tr class="border-b border-gray-200">
                  <th class="px-4 py-3 text-left text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest w-20">Row</th>
                  <th class="px-4 py-3 text-left text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Item Name</th>
                  <th class="px-4 py-3 text-left text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest w-28">Status</th>
                  <th class="px-4 py-3 text-left text-[10px] font-mono font-black text-gray-500 uppercase tracking-widest">Reason</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="(item, idx) in importResults" :key="idx" class="hover:bg-gray-50 transition-colors">
                  <td class="px-4 py-3 text-[10px] font-mono text-gray-600">{{ item.row }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-box text-gray-400 text-xs"></i>
                      <span class="text-[10px] font-mono font-bold text-gray-700">{{ item.name }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span 
                      :class="item.status === 'Failed' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'"
                      class="px-2 py-1 text-[9px] font-mono font-black uppercase tracking-widest border rounded-none inline-block"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-[10px] font-mono text-gray-600">{{ item.reason }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Export Failed Items -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-200 rounded-none">
            <p class="text-[10px] font-mono text-gray-600">You can retry these items after fixing the errors or export them for review.</p>
            <button 
              @click="exportFailedItems" 
              class="px-4 py-2 bg-gray-600 text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-none hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-download"></i>
              Export Failed
            </button>
          </div>
        </div>

        <!-- Footer Actions (Sticky) -->
        <div class="flex flex-col md:flex-row items-center justify-end gap-3 md:gap-4 p-6 bg-gray-50 border-t border-gray-100 shrink-0">
          <button 
            @click="showErrorModal = false" 
            class="w-full md:w-auto px-6 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-600 transition-colors"
          >
            Close
          </button>
          <button 
            @click="showErrorModal = false; retryFailed()" 
            class="w-full md:w-auto px-6 py-2 bg-amber-600 text-white text-[10px] font-mono font-black uppercase tracking-widest rounded-none hover:bg-amber-700 transition-colors"
          >
            Retry Failed Items
          </button>
        </div>
      </div>
    </div>
  </div>
<!-- </div> -->

  </Teleport>
</template>

<script setup>
import { computed, reactive, ref, watch, onErrorCaptured } from 'vue';
import * as XLSX from 'xlsx';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT.js';

// ✅ ERROR BOUNDARY - catch component errors
const componentError = ref(null);
onErrorCaptured((err, instance, info) => {
  console.error('BulkImportModal error:', err, info);
  componentError.value = err.message;
  return false; // Prevent error propagation
});

const bulkUpdateSuccess = ref(false);
const bulkUpdateError = ref('');
const bulkUpdateRows = ref([]);
const bulkUpdateLoading = ref(false);
const bulkUpdateAvailableFields = ref([
  { key: 'name', label: 'Name' },
  { key: 'sku', label: 'SKU' },
  { key: 'sellingPrice', label: 'Selling Price' }
]);
const bulkUpdateSelectedFields = ref([]);
const bulkUpdateGlobalValues = ref({});
const bulkUpdateSelectAll = ref(false);
const bulkUpdateActiveFields = computed(() => bulkUpdateAvailableFields.value.filter(f => bulkUpdateSelectedFields.value.includes(f.key)));
const bulkUpdateSelectedCount = computed(() => bulkUpdateRows.value.filter(r => r.selected).length);

const priceUpdateSuccess = ref(false);
const priceUpdateError = ref('');
const priceUpdateLoading = ref(false);
const priceUpdateAvailableFields = ref([
  { key: 'sellingPrice', label: 'Selling Price' },
  { key: 'buyingPrice', label: 'Buying Price' }
]);
const priceUpdateSelectedFields = ref([]);
const priceUpdateGlobalValues = ref({});
const priceUpdateSelectAll = ref(false);
const priceUpdateActiveFields = computed(() => priceUpdateAvailableFields.value.filter(f => priceUpdateSelectedFields.value.includes(f.key)));
const priceUpdateSelectedCount = computed(() => priceUpdateRows.value.filter(r => r.selected).length);

const emit = defineEmits(['close', 'imported']);
const props = defineProps({
  branchId:    { type: String, default: '' },
  branches:    { type: Array,  default: () => [] },
  initialMode: { type: String, default: 'new_items' },
});

// Local branch selection — defaults to the branch currently active in the parent
const selectedImportBranch = ref(props.branchId || 'main');

// Keep in sync with parent — { immediate: true } ensures it fires on mount too
watch(() => props.branchId, (newVal) => {
  // Always sync, even if newVal is '' (means ALL) → fall back to 'main'
  selectedImportBranch.value = newVal || 'main';
}, { immediate: true });

// Re-run duplicate check whenever the branch dropdown changes (clear stale results first)
watch(selectedImportBranch, () => {
  duplicateItems.value = new Set();
  duplicateActions.value = {};
  // Clear stale field-level errors from the previous branch check
  for (const k of Object.keys(rowErrors)) delete rowErrors[k];
  if (editableItems.value.length) {
    checkForDuplicates();
    preflightExistsCheck();
  }
});

const { getTenantId } = decodeJWT();

// ── Import Mode ──────────────────────────────────────────────────────────────
// Initialise from the parent-supplied prop so opening the modal via the
// "Bulk Update" toolbar button lands directly on the right tab.
const importMode = ref(props.initialMode || 'new_items'); // 'new_items' | 'stock_update' | 'bulk_update' | 'price_update'

// Keep in sync if the parent changes the prop after mount (e.g. the user clicks
// a different shortcut button while the modal is already open).
watch(() => props.initialMode, (val) => {
  if (val && val !== importMode.value) importMode.value = val;
});

watch(importMode, (mode) => {
  if (mode === 'stock_update') {
    stockUpdateRows.value = [];
    stockUpdateFileName.value = '';
    stockUpdateSuccess.value = false;
  }
  if (mode === 'bulk_update') {
    bulkUpdateSuccess.value = false;
    bulkUpdateError.value = '';
  }
  if (mode === 'price_update') {
    priceUpdateRows.value = [];
    priceUpdateFileName.value = '';
    priceUpdateSuccess.value = false;
    priceUpdateError.value = '';
  }
});

// ── Price Update state ───────────────────────────────────────────────────────
const priceUpdateFileName = ref('');
const priceUpdateRows = ref([]);
const stockUpdateFileName = ref('');
const stockUpdateRows = ref([]);
const isLoadingCurrentStock = ref(false);
const stockUpdateImporting = ref(false);
const stockUpdateSuccess = ref(false);

const stockUpdateMatchedCount = computed(() => stockUpdateRows.value.filter(r => r.matched).length);
const stockUpdateUnmatchedCount = computed(() => stockUpdateRows.value.filter(r => !r.matched).length);
const stockUpdateCanImport = computed(() => stockUpdateMatchedCount.value > 0 && !stockUpdateImporting.value);

function onPriceUpdateFileChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  priceUpdateFileName.value = file.name;
  priceUpdateSuccess.value = false;
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      let wb;
      if (ext === 'csv') wb = XLSX.read(evt.target.result, { type: 'string' });
      else wb = XLSX.read(evt.target.result, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '', raw: false });
      if (!rows.length) { priceUpdateRows.value = []; return; }
      const hdrs = Object.keys(rows[0]).map(h => ({ raw: h, norm: h.toLowerCase().trim() }));
      const nameCol = hdrs.find(h => /^(name|item|product)/.test(h.norm))?.raw;
      const skuCol  = hdrs.find(h => /^(sku|barcode|code|part)/.test(h.norm))?.raw;
      
      if (!nameCol && !skuCol) {
        errorMessages.value = ['Could not detect a Name or SKU column. Ensure your file has a "Name" or "SKU" header.'];
        priceUpdateRows.value = [];
        return;
      }

      // Identify price-related columns in the uploaded file
      const filePriceCols = priceUpdateAvailableFields.map(f => {
        const foundCol = hdrs.find(h => h.norm === f.key.toLowerCase() || h.norm === f.label.toLowerCase() || h.norm === f.label.toLowerCase().replace(/ \(equip\/service\)/, ''))?.raw;
        return foundCol ? { key: f.key, fileCol: foundCol } : null;
      }).filter(Boolean);

      if (!filePriceCols.length) {
        errorMessages.value = ['No price columns found in the file. Ensure your file has headers like "Selling Price", "Buying Price", "Price", etc.'];
        priceUpdateRows.value = [];
        return;
      }

      priceUpdateRows.value = rows
        .map(r => {
          const rawQty = qtyCol ? String(r[qtyCol] || '0').replace(/[,\s]/g, '') : '0';
          const qty = parseFloat(rawQty) || 0;
          return {
            name:         nameCol ? String(r[nameCol] || '').trim() : '',
            sku:          skuCol  ? String(r[skuCol]  || '').trim() : '',
            fileQty:      qty,
            applyQty:     qty,
            currentStock: 0,
            matched:      false,
            existingId:   null,
          };
        })
        .filter(r => r.name || r.sku);
      fetchCurrentStockForRows();
    } catch (err) {
      errorMessages.value = [`Failed to parse file: ${err.message}`];
      console.error(err);
      priceUpdateRows.value = [];
    }
  };
  reader.readAsArrayBuffer(file);
}

async function fetchCurrentStockForRows() {
  if (!stockUpdateRows.value.length) return;
  isLoadingCurrentStock.value = true;
  try {
    const { getToken } = decodeJWT();
    const targetBranch = selectedImportBranch.value || 'main';
    const res = await fetch(
      `${API_BASE_URL}/inventory?tenant_id=${getTenantId()}&branch_id=${targetBranch}`,
      { headers: { 'Authorization': `Bearer ${getToken()}` } }
    );
    if (!res.ok) return;
    const data = await res.json();
    const inv = Array.isArray(data) ? data : (data.items || data.inventory || []);
    const byName = new Map();
    const bySku  = new Map();
    for (const item of inv) {
      const n = (item.name || '').toLowerCase().trim();
      const s = (item.sku  || '').toLowerCase().trim();
      if (n) byName.set(n, item);
      if (s) bySku.set(s, item);
    }
    for (const row of stockUpdateRows.value) {
      const m = (row.name ? byName.get(row.name.toLowerCase().trim()) : null)
             || (row.sku  ? bySku.get(row.sku.toLowerCase().trim())   : null);
      if (m) {
        row.matched      = true;
        row.currentStock = Number(m.stockQty ?? m.quantity ?? 0);
        row.existingId   = m._id || m.id || null;
      } else {
        row.matched      = false;
        row.currentStock = 0;
        row.existingId   = null;
      }
    }
  } catch (err) {
    console.error('[StockUpdate] fetchCurrentStockForRows error:', err);
  } finally {
    isLoadingCurrentStock.value = false;
  }
}

// Re-fetch stock when branch changes while in stock update mode
watch(selectedImportBranch, () => {
  if (importMode.value === 'stock_update' && stockUpdateRows.value.length) {
    fetchCurrentStockForRows();
  }
});

async function startStockUpdateImport() {
  if (!stockUpdateCanImport.value) return;
  stockUpdateImporting.value = true;
  try {
    const { getToken } = decodeJWT();
    const targetBranch = selectedImportBranch.value || 'main';
    const payload = stockUpdateRows.value
      .filter(r => r.matched && Number(r.applyQty) > 0)
      .map(r => ({
        name:      r.name || undefined,
        sku:       r.sku  || undefined,
        stockQty:  Number(r.applyQty),
        type:      'product',
        branch_id: targetBranch,
        _action:   'addStock',
      }));
    if (!payload.length) { stockUpdateImporting.value = false; return; }
    const res = await fetch(
      `${API_BASE_URL}/inventory/bulk?tenant_id=${getTenantId()}&branch_id=${targetBranch}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify(payload),
      }
    );
    if (res.ok) {
      stockUpdateSuccess.value = true;
      const result = await res.json();
      emit('imported', {
        success:  result.updated || result.inserted || payload.length,
        mode:     'stock_update',
        branchId: targetBranch,
      });
    } else {
      const err = await res.json().catch(() => ({}));
      errorMessages.value = [err.detail || 'Stock update failed.'];
    }
  } catch (err) {
    errorMessages.value = [err.message || 'Stock update failed.'];
  } finally {
    stockUpdateImporting.value = false;
  }
}

function downloadStockUpdateTemplate() {
  const headers = priceUpdateAvailableFields.map(f => f.label);
  const csvContent = headers.join(',') + '\n';
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `price-update-template-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportUnmatchedStockUpdate() {
  const unmatched = stockUpdateRows.value.filter(r => !r.matched);
  if (!unmatched.length) return;
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const headers = ['#', 'Name', 'SKU', 'Quantity (from file)', 'Reason'];
  const data = unmatched.map((row, i) => [
    i + 1,
    row.name || '',
    row.sku || '',
    row.fileQty ?? '',
    'Not found in inventory — item may not exist in this branch',
  ]);
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  // Set column widths for readability
  ws['!cols'] = [
    { wch: 5 },
    { wch: 30 },
    { wch: 20 },
    { wch: 18 },
    { wch: 55 },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Unmatched Items');
  XLSX.writeFile(wb, `unmatched-stock-update-${timestamp}.xlsx`);
}

const fileName = ref('');
const headers = ref([]); // from file
const parsedRows = ref([]); // array of objects keyed by header
const itemType = ref('product');

// Mapping state
const mapping = reactive({});

// Progress state
const importing = ref(false);
const importSuccess = ref(false);
const done = ref(0);
const totalToImport = ref(0);
const errorMessages = ref([]);
const showErrorModal = ref(false);

// Bulk fill state for applying value to empty fields
const bulkFillField = ref('');
const bulkFillValue = ref('');

// Per-column apply state
const columnApplyValues = reactive({});

// Hidden preview columns (user-removed). Persisted per item type so equipment vs product remember separately.
const hiddenPreviewCols = ref(new Set());
function hidePreviewCol(col) {
  const next = new Set(hiddenPreviewCols.value);
  next.add(col);
  hiddenPreviewCols.value = next;
}
function restorePreviewCol(col) {
  const next = new Set(hiddenPreviewCols.value);
  next.delete(col);
  hiddenPreviewCols.value = next;
}
function restoreAllPreviewCols() { hiddenPreviewCols.value = new Set(); }

const fieldsConfig = {
  product: [
    { key: 'name', label: 'Name', required: true, synonyms: ['name', 'item', 'product'] },
    { key: 'category', label: 'Category', required: true, synonyms: ['category', 'group', 'dept', 'department'] },
    { key: 'buyingPrice', label: 'Buying Price', required: true, synonyms: ['buying price', 'cost', 'purchase price', 'bp', 'buy'] },
    { key: 'sellingPrice', label: 'Selling Price', required: true, synonyms: ['selling price', 'price', 'sp', 'sell'] },
    { key: 'stockQty', label: 'Stock Quantity', required: false, synonyms: ['qty', 'quantity', 'stock', 'on hand'] },
    { key: 'supplier', label: 'Supplier', required: false, synonyms: ['supplier', 'vendor'] },
    { key: 'sku', label: 'SKU / Barcode', required: false, synonyms: ['sku', 'barcode', 'ean', 'upc'] },
    { key: 'buyingDate', label: 'Buying Date', required: false, synonyms: ['buying date', 'purchase date', 'buy date'] },
    { key: 'expiryDate', label: 'Expiry Date', required: false, synonyms: ['expiry', 'expiration', 'exp date'] },
    { key: 'lowStockThreshold', label: 'Low Stock Threshold', required: false, synonyms: ['low stock threshold', 'low stock', 'reorder level'] },
    { key: 'criticalStockThreshold', label: 'Critical Stock Threshold', required: false, synonyms: ['critical stock threshold', 'critical stock', 'minimum stock'] },
    { key: 'vatApplicable', label: 'VAT Applicable', required: false, synonyms: ['vat applicable', 'vat', 'tax applicable', 'taxable'] },
    { key: 'description', label: 'Description', required: false, synonyms: ['description', 'desc', 'details', 'notes'] },
  ],
  equipment: [
    // Limit equipment mapping fields to only the fields expected by the equipment schema
    { key: 'name', label: 'Name', required: true, synonyms: ['name', 'item', 'equipment'] },
    { key: 'type', label: 'Type', required: true, synonyms: ['type'] },
    { key: 'category', label: 'Category', required: false, synonyms: ['category', 'group'] },
    { key: 'supplier', label: 'Supplier', required: false, synonyms: ['supplier', 'vendor'] },
    { key: 'equipmentBuyingPrice', label: 'Equipment Buying Price', required: false, synonyms: ['buying price', 'cost', 'purchase price', 'equipment buying price'] },
    { key: 'equipmentPrice', label: 'Equipment Price', required: false, synonyms: ['price', 'equipment price', 'unit price'] },
    { key: 'partNumber', label: 'Part Number', required: false, synonyms: ['part number', 'part', 'pn', 'code'] },
    { key: 'stockQty', label: 'Stock Qty', required: false, synonyms: ['qty', 'quantity', 'stock'] },
    { key: 'equipmentBuyingDate', label: 'Equipment Buying Date', required: false, synonyms: ['equipment buying date', 'buying date'] },
    { key: 'lowStockThreshold', label: 'Low Stock Threshold', required: false, synonyms: ['low stock threshold', 'reorder'] },
    { key: 'criticalStockThreshold', label: 'Critical Stock Threshold', required: false, synonyms: ['critical stock threshold'] },
    { key: 'vatApplicable', label: 'VAT Applicable', required: false, synonyms: ['vat applicable', 'vat', 'tax applicable', 'taxable'] },
    { key: 'equipmentDescription', label: 'Equipment Description', required: false, synonyms: ['description', 'desc', 'details', 'notes'] },
  ],
  service: [
    { key: 'name', label: 'Name', required: true, synonyms: ['name', 'service'] },
    { key: 'price', label: 'Price', required: true, synonyms: ['price', 'rate', 'fee', 'charge'] },
    { key: 'duration', label: 'Duration', required: false, synonyms: ['duration', 'time', 'length'] },
    { key: 'staff', label: 'Staff', required: false, synonyms: ['staff', 'personnel', 'assigned'] },
    { key: 'availability', label: 'Availability', required: false, synonyms: ['availability', 'schedule'] },
    { key: 'vatApplicable', label: 'VAT Applicable', required: false, synonyms: ['vat applicable', 'vat', 'tax applicable', 'taxable'] },
    { key: 'description', label: 'Description', required: false, synonyms: ['description', 'desc', 'details', 'notes'] },
    { key: 'category', label: 'Category', required: false, synonyms: ['category', 'group'], defaultValue: 'Services' },
  ],
};

const fieldsForType = computed(() => fieldsConfig[itemType.value]);

// Internal mapping options (fields that users may want to map to even if not present in CSV headers)
const internalMappingOptions = computed(() => {
  if (itemType.value === 'equipment') {
    return ['tenant_id', 'type', 'category', 'supplier', 'equipmentBuyingPrice', 'equipmentPrice', 'partNumber', 'stockQty', 'equipmentBuyingDate', 'equipmentDescription', 'lowStockThreshold', 'criticalStockThreshold', 'vatApplicable'];
  }
  if (itemType.value === 'product') {
    return ['tenant_id', 'category', 'description', 'stockQty', 'sku', 'buyingDate', 'expiryDate', 'lowStockThreshold', 'criticalStockThreshold', 'vatApplicable', 'buyingPrice', 'sellingPrice'];
  }
  // service types
  return ['tenant_id', 'category', 'description', 'price', 'duration', 'staff', 'availability', 'vatApplicable'];
});

function normalizeHeader(h) {
  return String(h || '').trim().toLowerCase();
}

function autoMap() {
  const available = headers.value.map(h => ({ raw: h, norm: normalizeHeader(h) }));
  for (const field of fieldsForType.value) {
    const match = available.find(h => {
      const inSyn = (field.synonyms || []).some(s => h.norm === s);
      return inSyn || h.norm === field.key.toLowerCase();
    });
    mapping[field.key] = match ? match.raw : (field.defaultValue ? '' : '');
  }
}

watch([headers, itemType], () => {
  // Reset and re-automap when headers or type change
  for (const f of fieldsForType.value) {
    mapping[f.key] = '';
  }
  if (headers.value.length) autoMap();
});

function onFileChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  fileName.value = file.name;
  const ext = file.name.split('.').pop()?.toLowerCase();
  const reader = new FileReader();

  reader.onload = (evt) => {
    const data = evt.target.result;
    let wb;
    try {
      if (ext === 'csv') {
        wb = XLSX.read(data, { type: 'string' });
      } else {
        wb = XLSX.read(data, { type: 'array' });
      }
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '', raw: false });
      parsedRows.value = rows;
      headers.value = rows.length ? Object.keys(rows[0]) : [];
      autoMap();
    } catch (err) {
      parsedRows.value = [];
      headers.value = [];
      errorMessages.value = [
        `Failed to parse file. Ensure it's a valid .xlsx/.xls/.csv. Error: ${err?.message || err}`,
      ];
    }
  };

  if (ext === 'csv') reader.readAsText(file);
  else reader.readAsArrayBuffer(file);
}

function parseNumber(val) {
  if (val === null || val === undefined || val === '') return undefined;
  if (typeof val === 'number') return val;
  const s = String(val).replace(/[,\s]/g, '').replace(/[A-Za-z$KZ]/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
}

function pick(row, key) {
  const col = mapping[key];
  if (!col) return undefined;
  const v = row[col];
  if (v === undefined || v === '') return undefined;
  return v;
}

function toItem(row) {
  const type = itemType.value;
  if (type === 'product') {
    const name = pick(row, 'name');
    const category = pick(row, 'category');
    const buyingPrice = parseNumber(pick(row, 'buyingPrice'));
    const sellingPrice = parseNumber(pick(row, 'sellingPrice'));
    const stockQty = parseNumber(pick(row, 'stockQty'));
    const supplier = pick(row, 'supplier');
    const sku = pick(row, 'sku');
    const buyingDate = pick(row, 'buyingDate');
    const expiryDate = pick(row, 'expiryDate');
    const lowStockThreshold = parseNumber(pick(row, 'lowStockThreshold'));
    const criticalStockThreshold = parseNumber(pick(row, 'criticalStockThreshold'));
    const vatApplicable = pick(row, 'vatApplicable');
    const description = pick(row, 'description');
    
    // Parse boolean for VAT applicable
    let vatBool = true; // default
    if (vatApplicable !== undefined) {
      const val = String(vatApplicable).toLowerCase().trim();
      vatBool = !['false', 'no', '0', 'n', 'off'].includes(val);
    }
    
    return {
      name,
      category,
      type: 'Product',
      price: sellingPrice ?? 0,
      stockQty: stockQty ?? null,
      supplier: supplier || undefined,
      sku: sku || undefined,
      buyingPrice: buyingPrice ?? undefined,
      sellingPrice: sellingPrice ?? undefined,
      buyingDate: buyingDate || undefined,
      expiryDate: expiryDate || undefined,
      lowStockThreshold: lowStockThreshold ?? undefined,
      criticalStockThreshold: criticalStockThreshold ?? undefined,
      vatApplicable: vatBool,
      description: description || undefined,
      tenant_id: getTenantId(),
    };
  }
  if (type === 'equipment') {
    const name = pick(row, 'name');
    const partNumber = pick(row, 'partNumber');
    // Use stockQty for equipment quantity to match backend expectations
    const stockQty = parseNumber(pick(row, 'stockQty')) ?? 0;
    const equipmentPrice = parseNumber(pick(row, 'equipmentPrice')) ?? parseNumber(pick(row, 'price')) ?? 0;
    const equipmentDescription = pick(row, 'equipmentDescription') ?? pick(row, 'description') ?? '';
    // supplier if mapped
    const supplier = pick(row, 'supplier') || undefined;
    // low/critical thresholds if provided
    const lowStockThreshold = parseNumber(pick(row, 'lowStockThreshold'));
    const criticalStockThreshold = parseNumber(pick(row, 'criticalStockThreshold'));
    const equipmentBuyingDate = pick(row, 'equipmentBuyingDate') || undefined;
    const equipmentBuyingPrice = parseNumber(pick(row, 'equipmentBuyingPrice'));
    const vatApplicable = pick(row, 'vatApplicable');
    
    // Parse boolean for VAT applicable
    let vatBool = true; // default
    if (vatApplicable !== undefined) {
      const val = String(vatApplicable).toLowerCase().trim();
      vatBool = !['false', 'no', '0', 'n', 'off'].includes(val);
    }

    const out = {
      name,
      type: 'Equipment',
      category: pick(row, 'category') || 'Equipment',
      supplier: supplier,
      equipmentBuyingPrice: equipmentBuyingPrice === undefined ? undefined : equipmentBuyingPrice,
      equipmentPrice: equipmentPrice === undefined ? undefined : equipmentPrice,
      price: equipmentPrice, // Backend expects price field as well
      partNumber: partNumber || undefined,
      stockQty: stockQty,
      equipmentBuyingDate: equipmentBuyingDate,
      equipmentDescription: equipmentDescription || undefined,
      vatApplicable: vatBool,
      tenant_id: getTenantId(),
    };
    if (lowStockThreshold !== undefined) out.lowStockThreshold = lowStockThreshold;
    if (criticalStockThreshold !== undefined) out.criticalStockThreshold = criticalStockThreshold;
    return out;
  }
  // service
  const name = pick(row, 'name');
  const price = parseNumber(pick(row, 'price')) ?? 0;
  const duration = pick(row, 'duration');
  const staff = pick(row, 'staff');
  const availability = pick(row, 'availability');
  const description = pick(row, 'description');
  const category = pick(row, 'category') || 'Services';
  const vatApplicable = pick(row, 'vatApplicable');
  
  // Parse boolean for VAT applicable
  let vatBool = true; // default
  if (vatApplicable !== undefined) {
    const val = String(vatApplicable).toLowerCase().trim();
    vatBool = !['false', 'no', '0', 'n', 'off'].includes(val);
  }
  
  return {
    name,
    category,
    type: 'Service',
    price,
    stockQty: null,
    duration: duration || undefined,
    staff: staff || undefined,
    availability: availability || undefined,
    vatApplicable: vatBool,
    description: description || undefined,
    tenant_id: getTenantId(),
  };
}

function hasRequired(row) {
  const f = fieldsForType.value;
  for (const req of f.filter(x => x.required)) {
    const col = mapping[req.key];
    if (!col) return false;
    const v = row[col];
    if (v === undefined || String(v).trim() === '') return false;
  }
  return true;
}

// editableItems holds the transformed items but is editable by the user in the preview grid
const editableItems = ref([]);

// Duplicate handling state
const duplicateItems = ref(new Set()); // Set of item names that are duplicates
const duplicateActions = ref({}); // { rowIndex: 'skip' | 'addStock' }

// AbortControllers so stale in-flight requests are cancelled when the branch changes
let _dupCheckAbort = null;
let _preflightAbort = null;

// Check for duplicates against existing inventory — scoped to the selected import branch
async function checkForDuplicates() {
  if (!editableItems.value.length) return;
  
  const names = editableItems.value
    .map(item => item.name)
    .filter(name => name && String(name).trim());
  
  if (!names.length) return;

  // Cancel any previous in-flight request for this check
  if (_dupCheckAbort) _dupCheckAbort.abort();
  _dupCheckAbort = new AbortController();
  const signal = _dupCheckAbort.signal;
  
  try {
    const { getToken } = decodeJWT();
    const targetBranch = selectedImportBranch.value || 'main';
    console.log('[BulkImport] checkForDuplicates — branch:', targetBranch);
    const response = await fetch(
      `${API_BASE_URL}/inventory/exists?tenant_id=${getTenantId()}&branch_id=${targetBranch}`,
      {
        method: 'POST',
        signal,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ names })
      }
    );
    
    if (!response.ok) return;
    const data = await response.json();
    
    // Mark duplicates
    duplicateItems.value = new Set(data.names || []);
    
    // Initialize actions for duplicates (default to 'skip')
    editableItems.value.forEach((item, index) => {
      if (duplicateItems.value.has(item.name)) {
        duplicateActions.value[index] = 'skip';
      }
    });
  } catch (error) {
    if (error.name === 'AbortError') return; // stale request cancelled — ignore
    console.error('Failed to check for duplicates:', error);
  }
}

// Apply action to all duplicates
function applyActionToAllDuplicates() {
  const actionValue = prompt('Choose action for all duplicates:\n\n1 = Skip\n2 = Add Stock\n3 = Update Existing\n\nEnter 1, 2 or 3:');
  const action = actionValue === '1' ? 'skip' : actionValue === '2' ? 'addStock' : actionValue === '3' ? 'updateExisting' : null;
  
  if (!action) return;
  
  Object.keys(duplicateActions.value).forEach(key => {
    duplicateActions.value[key] = action;
  });
}


function setEditableItemsFromParsed() {
  try {
    editableItems.value = parsedRows.value.map(r => {
      const it = toItem(r) || {};
      // ensure all expected keys exist so v-model works
      for (const f of fieldsForType.value) {
        // Always ensure the key exists and is a string (JSON stringify will remove undefined)
        it[f.key] = it[f.key] ?? '';
      }
      return JSON.parse(JSON.stringify(it));
    });
    // run preflight uniqueness check after creating editable items
    preflightExistsCheck();
    // Check for duplicates against existing inventory
    checkForDuplicates();
    // If importing equipment, try to populate missing equipmentPrice values from tenant inventory
    if (itemType.value === 'equipment') {
      fetchInventoryPricesAndFill();
    }
  } catch (e) {
    editableItems.value = [];
  }
}

async function fetchInventoryPricesAndFill() {
  try {
    const { getToken } = decodeJWT();
    const res = await fetch(`${API_BASE_URL}/inventory/?tenant_id=${getTenantId()}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    if (!res.ok) return;
    const inv = await res.json();
    // Build lookup maps by lowercased name and partNumber
    const byName = new Map();
    const byPart = new Map();
    for (const it of inv || []) {
      const name = (it.name || '').toString().trim().toLowerCase();
      const part = (it.partNumber || '').toString().trim().toLowerCase();
      const p = (it.equipmentPrice !== undefined && it.equipmentPrice !== null) ? Number(it.equipmentPrice) : ((it.price !== undefined && it.price !== null) ? Number(it.price) : undefined);
      if (p !== undefined && name) byName.set(name, p);
      if (p !== undefined && part) byPart.set(part, p);
    }

    // Fill editableItems when equipmentPrice is missing
    for (let i = 0; i < editableItems.value.length; i++) {
      const row = editableItems.value[i];
      // only attempt for equipment rows
      if (itemType.value !== 'equipment') break;
      // if equipmentPrice already present and non-empty, skip
      if (row.equipmentPrice !== undefined && row.equipmentPrice !== null && String(row.equipmentPrice).trim() !== '') continue;
      // try partNumber first
      const part = (row.partNumber || '').toString().trim().toLowerCase();
      const name = (row.name || '').toString().trim().toLowerCase();
      let found = undefined;
      if (part && byPart.has(part)) found = byPart.get(part);
      if (found === undefined && name && byName.has(name)) found = byName.get(name);
      if (found !== undefined) {
        // coerce to numeric where appropriate
        editableItems.value[i].equipmentPrice = Number(found);
      }
    }
  } catch (e) {
    console.warn('Failed to fetch inventory prices for preview population', e);
  }
}

// Initialize editable items when parsedRows changes or mapping/type changes
watch([parsedRows, mapping, itemType], () => {
  if (parsedRows.value.length) setEditableItemsFromParsed();
  else editableItems.value = [];
});

const transformed = computed(() => editableItems.value);

// Per-row server error storage (indexed by original item index)
const rowErrors = reactive({});

const rowErrorsSummary = computed(() => {
  const list = [];
  for (let i = 0; i < editableItems.value.length; i++) {
    const e = rowErrors[i];
    if (e) list.push({ index: i, message: typeof e === 'string' ? e : JSON.stringify(e) });
  }
  return list;
});

function parseCurrency(value, locale = 'en-US') {
  if (value === null || value === undefined || String(value).trim() === '') return undefined;
  if (typeof value === 'number') return value;
  let s = String(value).trim();
  // Remove common currency symbols, locale-specific thousands separators
  s = s.replace(/[^0-9\.\-]/g, '');
  // Collapse multiple dots
  const parts = s.split('.');
  if (parts.length > 2) s = parts.slice(0, -1).join('') + '.' + parts.slice(-1);
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
}

function isISODateString(val) {
  if (!val) return false;
  // Strict ISO 8601 date (YYYY-MM-DD) or full datetime
  return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/.test(String(val));
}

const hasAnyRowError = computed(() => Object.keys(rowErrors).length > 0);

async function preflightExistsCheck() {
  // Cancel any previous in-flight preflight request
  if (_preflightAbort) _preflightAbort.abort();
  _preflightAbort = new AbortController();
  const signal = _preflightAbort.signal;

  try {
    const names = editableItems.value.map(i => i.name).filter(Boolean);
    const skus = editableItems.value.map(i => i.sku).filter(Boolean);
    const partNumbers = editableItems.value.map(i => i.partNumber).filter(Boolean);
    const payload = { names, skus, partNumbers };
    const { getToken } = decodeJWT();
    const targetBranch = selectedImportBranch.value || 'main';
    const res = await fetch(`${API_BASE_URL}/inventory/exists?tenant_id=${getTenantId()}&branch_id=${targetBranch}`, {
      method: 'POST',
      signal,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }, 
      body: JSON.stringify(payload)
    });
    if (!res.ok) return;
    const found = await res.json();
    // mark conflicts inline
    for (let i = 0; i < editableItems.value.length; i++) {
      const it = editableItems.value[i];
      if (it.name && found.names && found.names.includes(it.name)) {
        if (!rowErrors[i]) rowErrors[i] = {};
        rowErrors[i]['name'] = 'Name already exists';
      }
      if (it.sku && found.skus && found.skus.includes(it.sku)) {
        if (!rowErrors[i]) rowErrors[i] = {};
        rowErrors[i]['sku'] = 'SKU already exists';
      }
      if (it.partNumber && found.partNumbers && found.partNumbers.includes(it.partNumber)) {
        if (!rowErrors[i]) rowErrors[i] = {};
        rowErrors[i]['partNumber'] = 'Part number already exists';
      }
    }
  } catch (e) {
    if (e.name === 'AbortError') return; // stale request cancelled — ignore
    console.warn('Preflight exists check failed', e);
  }
}

function jumpToFirstError() {
  const keys = Object.keys(rowErrors).map(k => parseInt(k, 10)).filter(n => !isNaN(n));
  if (!keys.length) return;
  const first = Math.min(...keys);
  
  // Find the row in the scroll container and scroll to it
  const container = document.querySelector('.custom-scrollbar');
  if (container) {
    const rows = container.querySelectorAll('tbody tr');
    if (rows[first]) {
      rows[first].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Suggestion pill helpers
function getSuggestionForCell(item, col) {
  if (/price|cost|amount/i.test(col)) {
    const v = parseCurrency(item[col]);
    if (v !== undefined && v !== item[col]) return v;
  }
  if (/expiry|expiryDate|buyingDate|equipmentBuyingDate/i.test(col)) {
    if (item[col] && !isISODateString(item[col])) {
      const d = new Date(String(item[col]));
      if (!isNaN(d.getTime())) return d.toISOString();
    }
  }
  return null;
}

function acceptSuggestion(idx, col, suggestion) {
  editableItems.value[idx][col] = suggestion;
}

// Batch toolbar helpers
const currentBatchColumn = ref('');
function trimColumn(col) {
  if (!col) return;
  for (let i = 0; i < editableItems.value.length; i++) {
    const v = editableItems.value[i][col];
    if (v !== undefined && v !== null) editableItems.value[i][col] = String(v).trim();
  }
}
function upperCaseColumn(col) {
  if (!col) return;
  for (let i = 0; i < editableItems.value.length; i++) {
    const v = editableItems.value[i][col];
    if (v !== undefined && v !== null) editableItems.value[i][col] = String(v).toUpperCase();
  }
}
function lowerCaseColumn(col) {
  if (!col) return;
  for (let i = 0; i < editableItems.value.length; i++) {
    const v = editableItems.value[i][col];
    if (v !== undefined && v !== null) editableItems.value[i][col] = String(v).toLowerCase();
  }
}
function multiplyColumn(col, factor) {
  if (!col) return;
  for (let i = 0; i < editableItems.value.length; i++) {
    const v = parseNumber(editableItems.value[i][col]);
    if (v !== undefined) editableItems.value[i][col] = v * factor;
  }
}

function hasRequiredItem(item) {
  const f = fieldsForType.value;
  for (const req of f.filter(x => x.required)) {
    const v = item[req.key];
    if (v === undefined || v === null || String(v).trim() === '') return false;
  }
  return true;
}

const readyFlags = computed(() => editableItems.value.map(it => hasRequiredItem(it)));
const readyCount = computed(() => readyFlags.value.filter(Boolean).length);
const missingCount = computed(() => readyFlags.value.filter(x => !x).length);

// Build preview headers from canonical fields and any extra mapped or populated columns.
const previewHeaders = computed(() => {
  const headersOut = [];
  const seen = new Set();
  // include canonical fields in configured order when they are mapped, required, or have any manual values
  for (const f of fieldsForType.value) {
    const mapped = mapping[f.key];
    const hasManual = editableItems.value.some(it => it[f.key] !== undefined && it[f.key] !== null && String(it[f.key]).trim() !== '');
    if (mapped || f.required || hasManual) {
      headersOut.push(f.key);
      seen.add(f.key);
    }
  }
  // include any additional keys present in the editable rows that weren't part of the canonical list
  for (const r of editableItems.value) {
    for (const k of Object.keys(r)) {
      if (!seen.has(k)) {
        const anyValue = editableItems.value.some(rr => rr[k] !== undefined && rr[k] !== null && String(rr[k]).trim() !== '');
        if (anyValue) {
          headersOut.push(k);
          seen.add(k);
        }
      }
    }
  }
  return headersOut.filter(c => !hiddenPreviewCols.value.has(c));
});

// All preview headers (unfiltered) — used to compute which columns are hidden for the restore chips.
const allPreviewHeaders = computed(() => {
  const headersOut = [];
  const seen = new Set();
  for (const f of fieldsForType.value) {
    const mapped = mapping[f.key];
    const hasManual = editableItems.value.some(it => it[f.key] !== undefined && it[f.key] !== null && String(it[f.key]).trim() !== '');
    if (mapped || f.required || hasManual) { headersOut.push(f.key); seen.add(f.key); }
  }
  for (const r of editableItems.value) {
    for (const k of Object.keys(r)) {
      if (!seen.has(k)) {
        const anyValue = editableItems.value.some(rr => rr[k] !== undefined && rr[k] !== null && String(rr[k]).trim() !== '');
        if (anyValue) { headersOut.push(k); seen.add(k); }
      }
    }
  }
  return headersOut;
});
const hiddenPreviewColsList = computed(() => allPreviewHeaders.value.filter(c => hiddenPreviewCols.value.has(c)));

function columnHasNoValues(col) {
  return !editableItems.value.some(r => r[col] !== undefined && r[col] !== null && String(r[col]).trim() !== '');
}

function columnHasInvalid(col) {
  // consider entire editableItems (not just page) for validation state
  for (let i = 0; i < editableItems.value.length; i++) {
    if (isCellInvalid(editableItems.value[i], col)) return true;
  }
  return false;
}

// Apply-to-all helpers
const applyValues = reactive({});
const activeApplyColumn = ref(null);

function toggleApply(col) {
  if (activeApplyColumn.value === col) {
    activeApplyColumn.value = null;
    return;
  }
  activeApplyColumn.value = col;
  if (!(col in applyValues)) applyValues[col] = '';
}

function cancelApply() {
  activeApplyColumn.value = null;
}

// Coerce string input into appropriate type for column
function coerceValueForColumn(col, raw) {
  // Try to convert numeric-like columns to numbers
  if (/price|buying|selling|qty|quantity|stock|amount|cost|price/i.test(col)) {
    const n = parseNumber(raw);
    return n === undefined ? raw : n;
  }
  return raw;
}

// Simple history for last apply per column (allows undo)
const lastApplySnapshot = reactive({});
// Option to apply only to remaining rows (not-yet-filled or invalid)
const applyOnlyRemaining = reactive({});

function applyToAll(col) {
  const val = applyValues[col];
  // Save snapshot of previous values for undo
  lastApplySnapshot[col] = editableItems.value.map(r => r[col]);

  for (let i = 0; i < editableItems.value.length; i++) {
    const item = editableItems.value[i];
    // if applyOnlyRemaining is true for this column, skip rows that already have a non-empty valid value
    if (applyOnlyRemaining[col]) {
      const cur = item[col];
      if (cur !== undefined && cur !== null && String(cur).trim() !== '') continue;
    }
    editableItems.value[i][col] = coerceValueForColumn(col, val);
  }
  // refresh preview if needed
  activeApplyColumn.value = null;
}

function undoLastApply(col) {
  const snap = lastApplySnapshot[col];
  if (!snap) return;
  for (let i = 0; i < editableItems.value.length; i++) {
    editableItems.value[i][col] = snap[i];
  }
  // clear snapshot after undo
  delete lastApplySnapshot[col];
}

function getFieldLabel(col) {
  const f = fieldsForType.value.find(x => x.key === col);
  if (f) return f.label;
  const internalLabelMap = {
    tenant_id: 'Tenant ID',
    category: 'Category',
    description: 'Description',
    price: 'Price',
    stockQty: 'Stock Quantity',
    sku: 'SKU',
    partNumber: 'Part Number',
    equipmentPrice: 'Equipment Price',
    equipmentBuyingPrice: 'Equipment Buying Price',
    equipmentDescription: 'Equipment Description',
    vatApplicable: 'VAT Applicable',
    lowStockThreshold: 'Low Stock Threshold',
    criticalStockThreshold: 'Critical Stock Threshold',
    buyingDate: 'Buying Date',
    expiryDate: 'Expiry Date',
    equipmentBuyingDate: 'Equipment Buying Date'
  };
  return internalLabelMap[col] || col;
}

function getFieldForKey(key) {
  return fieldsForType.value.find(f => f.key === key) || null;
}

function isCellInvalid(item, col) {
  const f = getFieldForKey(col);
  if (!f) return false;
  const v = item[col];
  if (f.required) {
    if (v === undefined || v === null || String(v).trim() === '') return true;
  }
  // For numeric-like fields, ensure parseNumber yields a value when present
  if (/price|buying|selling|qty|quantity|stock|amount|cost|price/i.test(col)) {
    if (v === undefined || v === null || String(v).trim() === '') {
      // only invalid if required
      return !!f.required;
    }
    const n = parseNumber(v);
    if (n === undefined) return true;
    // non-negative check for quantities and prices
    if (/qty|quantity|stock/i.test(col) || /price|cost|amount/i.test(col)) {
      if (typeof n === 'number' && n < 0) return true;
    }
  }
  // Date parsing for expiry/buying dates
  if (/expiry|expiryDate|buyingDate|equipmentBuyingDate/i.test(col)) {
    if (v === undefined || v === null || String(v).trim() === '') {
      return !!f.required;
    }
    try {
      // Simple ISO parse attempt
      const d = new Date(String(v));
      if (isNaN(d.getTime())) return true;
    } catch (e) {
      return true;
    }
  }
  // SKU/partNumber format: allow alphanum, dashes, slashes, spaces
  if (/sku|partnumber|part number|part/i.test(col)) {
    if (v && !/^[\w\-\/\s\.\#]+$/.test(String(v))) return true;
  }
  return false;
}

// Bulk fill function to apply value to empty fields
function applyBulkFillToEmpty() {
  if (!bulkFillField.value || !bulkFillValue.value) return;
  
  const field = bulkFillField.value;
  const value = coerceValueForColumn(field, bulkFillValue.value);
  
  let count = 0;
  for (let i = 0; i < editableItems.value.length; i++) {
    const item = editableItems.value[i];
    const currentValue = item[field];
    
    // Apply only if the field is empty or missing
    if (currentValue === undefined || currentValue === null || String(currentValue).trim() === '') {
      editableItems.value[i][field] = value;
      count++;
    }
  }
  
  console.log(`[BulkImport] Applied "${value}" to ${count} empty ${field} fields`);
  
  // Clear the inputs after applying
  bulkFillField.value = '';
  bulkFillValue.value = '';
}

// Apply value to all cells in a column
function applyToColumnAll(col) {
  const value = columnApplyValues[col];
  if (!value) return;
  
  const coercedValue = coerceValueForColumn(col, value);
  let count = 0;
  
  for (let i = 0; i < editableItems.value.length; i++) {
    editableItems.value[i][col] = coercedValue;
    count++;
  }
  
  console.log(`[BulkImport] Applied "${coercedValue}" to ${count} cells in column "${col}"`);
  columnApplyValues[col] = ''; // Clear after applying
}

// Apply value only to empty cells in a column
function applyToColumnMissing(col) {
  const value = columnApplyValues[col];
  if (!value) return;
  
  const coercedValue = coerceValueForColumn(col, value);
  let count = 0;
  
  for (let i = 0; i < editableItems.value.length; i++) {
    const item = editableItems.value[i];
    const currentValue = item[col];
    
    // Apply only if the field is empty or missing
    if (currentValue === undefined || currentValue === null || String(currentValue).trim() === '') {
      editableItems.value[i][col] = coercedValue;
      count++;
    }
  }
  
  console.log(`[BulkImport] Applied "${coercedValue}" to ${count} empty cells in column "${col}"`);
  columnApplyValues[col] = ''; // Clear after applying
}

// Allow import when at least one parsed row is ready (has required values), even if some mappings are still not set for optional fields.
// Keep a defensive check that there are parsed rows.
const canImport = computed(() => !!parsedRows.value.length && readyCount.value > 0);
const progressPercent = computed(() => totalToImport.value ? Math.round((done.value / totalToImport.value) * 100) : 0);

function downloadTemplate(includeInternalHeaders = false) {
  const type = itemType.value;
  const fields = fieldsForType.value.map(f => f.label || f.key);
  let headerRow = fields.join(',') + '\n';
  if (includeInternalHeaders) {
    // include internal-friendly names (keys) alongside labels so users can map precisely
    const internal = internalMappingOptions.value.map(k => getFieldLabel(k));
    headerRow = [...fields, ...internal].join(',') + '\n';
  }
  const blob = new Blob([headerRow], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${type}-template${includeInternalHeaders ? '-internal' : ''}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const importResults = ref([]);

async function startImport() {
  const { getToken } = decodeJWT();
  console.log('[BulkImport] startImport — selectedImportBranch:', selectedImportBranch.value, '| props.branchId:', props.branchId, '| branches count:', props.branches?.length);
  if (!canImport.value || importing.value) return;
  importing.value = true;
  importSuccess.value = false;
  done.value = 0;
  // Clear only if starting fresh, but here we probably want to clear previous run's errors
  errorMessages.value = [];
  importResults.value = []; // Reset detailed results
  for (const k of Object.keys(rowErrors)) delete rowErrors[k];

  // 1. Identify all rows that are technically "ready" (have required fields mapped)
  // The user rule: "if name is not there... row is invalid". `readyFlags` checks required fields (like name).
  const candidateIndices = editableItems.value
    .map((_, idx) => idx)
    .filter(idx => readyFlags.value[idx]);

  // 2. Further validate "Only valid date is entered"
  // If a row has a date field but it is invalid, we skip it or mark it error.
  // We'll filter `candidateIndices` down to `validIndices`.
  const validIndices = [];
  const headersToSend = new Set(previewHeaders.value);

  for (const idx of candidateIndices) {
    const r = editableItems.value[idx];
    let rowIsValid = true;
    for (const key of Object.keys(r)) {
      if (!headersToSend.has(key)) continue;
      // Date checks
      if (/expiry|expiryDate|buyingDate|equipmentBuyingDate/i.test(key)) {
        const val = r[key];
        if (val && !isISODateString(val)) {
          // Attempt parse
          const d = new Date(String(val));
          if (isNaN(d.getTime())) {
             // User requested: "Rows with invalid dates are should not be skipped"
             // So we do NOT set rowIsValid = false.
             // We can optionally flag it as a warning in UI, but we must ensure it gets added to validIndices.
             if (!rowErrors[idx]) rowErrors[idx] = {};
             rowErrors[idx][key] = 'Invalid Date (will be ignored)';
          }
        }
      }
    }
    if (rowIsValid) {
      validIndices.push(idx);
    }
  }
  
  // Track rows that were candidate but NOT valid (e.g. missing name, though readyFlags mostly catches that)
  // readyFlags handles missing name. So candidateIndices IS the set of rows with names.

  const rowsToImportCount = validIndices.length;
  totalToImport.value = rowsToImportCount;

  if (rowsToImportCount === 0) {
    importing.value = false;
    if (Object.keys(rowErrors).length > 0) {
        errorMessages.value.push("Validation errors found. Please fix and try again.");
    } else {
        errorMessages.value.push("No valid rows to import.");
    }
    return;
  }

  let totalSuccess = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  // 3. Batching Loop
  const BATCH_SIZE = 100;
  
  for (let i = 0; i < rowsToImportCount; i += BATCH_SIZE) {
    const batchIndices = validIndices.slice(i, i + BATCH_SIZE);
    
    // Build payload for this batch
    const payload = batchIndices
      .filter(idx => {
        // Filter out items marked as 'skip' in duplicate actions
        if (duplicateActions.value[idx] === 'skip') {
          totalSkipped++;
          return false;
        }
        return true;
      })
      .map(idx => {
      const r = editableItems.value[idx];
      const copy = {};
      for (const key of Object.keys(r)) {
        if (!headersToSend.has(key)) continue;
        let val = r[key];
        // Coerce all numeric fields — price, cost, amount, qty, quantity, stock, threshold
        if (/price|cost|amount|qty|quantity|stock|threshold/i.test(key)) {
            if (val === '' || val === null || val === undefined) {
                val = null; // send null so Pydantic Optional[float] accepts it
            } else {
                const n = parseCurrency(val);
                val = n !== undefined ? n : null;
            }
        }
        if (/expiry|expiryDate|buyingDate|equipmentBuyingDate/i.test(key)) {
           if (val && !isISODateString(val)) {
             const d = new Date(String(val));
             if (!isNaN(d.getTime())) {
                 val = d.toISOString();
             } else {
                 val = null; // Invalid date: send null so backend doesn't reject the whole row
             }
           }
           if (val === '') val = null;
        }
        copy[key] = val;
      }
      
      // Add _action flag for duplicate items
      if (duplicateActions.value[idx] === 'addStock') {
        copy._action = 'addStock';
      } else if (duplicateActions.value[idx] === 'updateExisting') {
        copy._action = 'updateExisting';
      }
      
      // Add branch_id
      copy.branch_id = selectedImportBranch.value || 'main';

      return copy;
    });

    try {
      const targetBranch = selectedImportBranch.value || 'main';
      const respQuery = `&branch_id=${targetBranch}`;
      const res = await fetch(`${API_BASE_URL}/inventory/bulk?tenant_id=${getTenantId()}${respQuery}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Batch failed: ${res.status} ${await res.text()}`);
      }

      const result = await res.json();
      const inserted = result.inserted || 0;
      const updated = result.updated || 0;
      totalSuccess += inserted + updated;

      // Handle Skipped
      if (result.skipped && Array.isArray(result.skipped)) {
        totalSkipped += result.skipped.length;
        for (const s of result.skipped) {
            const batchIdx = typeof s.index === 'number' ? s.index : s.idx;
            if (typeof batchIdx === 'number' && batchIdx < batchIndices.length) {
                const originalIndex = batchIndices[batchIdx];
                const item = editableItems.value[originalIndex];
                const name = item.name || `Row ${originalIndex+1}`;
                const msg = s.message || s.errmsg || 'Skipped: item already exists';
                
                if (!rowErrors[originalIndex]) rowErrors[originalIndex] = {};
                rowErrors[originalIndex]['skipped'] = msg;
                
                // Add to results list
                importResults.value.push({
                    row: originalIndex + 1,
                    name: name,
                    status: 'Skipped',
                    reason: msg
                });
            }
        }
      }

      // Handle Errors
      if (result.errors && Array.isArray(result.errors)) {
        totalFailed += result.errors.length; // Count actually failed rows
        for (const e of result.errors) {
            const batchIdx = typeof e.index === 'number' ? e.index : e.idx;
             if (typeof batchIdx === 'number' && batchIdx < batchIndices.length) {
                const originalIndex = batchIndices[batchIdx];
                const item = editableItems.value[originalIndex];
                const name = item.name || `Row ${originalIndex+1}`;
                const msg = e.errmsg || e.message || JSON.stringify(e);
                const field = e.field || e.key || null;
                
                if (field) {
                    if (!rowErrors[originalIndex]) rowErrors[originalIndex] = {};
                    rowErrors[originalIndex][field] = msg;
                } else {
                    if (!rowErrors[originalIndex]) rowErrors[originalIndex] = {};
                    rowErrors[originalIndex]['_general'] = msg; 
                }
                
                // Add to results list
                importResults.value.push({
                    row: originalIndex + 1,
                    name: name,
                    status: 'Failed',
                    reason: msg
                });

             } else {
                 errorMessages.value.push(`Batch Error: ${e.message || JSON.stringify(e)}`);
             }
        }
      }

    } catch (err) {
      console.error("Batch import error", err);
      totalFailed += batchIndices.length; // assume whole batch failed
      errorMessages.value.push(err.message || String(err));
      // Add generic error for batch items?
      // Might be too many items, but user wants to know.
      // Let's just rely on global error message for network/server crash.
    }

    // Update progress
    done.value = Math.min(rowsToImportCount, done.value + batchIndices.length);
  }

  importing.value = false;
  
  if (totalSuccess > 0 || totalSkipped > 0 || totalFailed > 0) {
    importSuccess.value = totalFailed === 0; // Only strictly success if no failures? Or partial success?
    importSuccess.value = true; 
    
    emit('imported', { 
      success: totalSuccess, 
      skipped: totalSkipped, 
      failed: totalFailed,
      failedItems: importResults.value,
      branchId: selectedImportBranch.value || null
    });
    
    // Auto-close removed to let user decide, especially with retry workflow.
  }
}

async function retryFailed() {
  if (!importResults.value.length) return;
  
  // 1. Identify rows to keep (0-based indices from original import)
  const failedIndices = new Set(importResults.value.map(r => r.row - 1));
  const reasonsMap = new Map(); // oldIndex -> reason
  importResults.value.forEach(r => reasonsMap.set(r.row - 1, r.reason));
  
  // 2. Filter parsedRows to keep only failed items
  // Since parsedRows and editableItems logic is 1:1, we can filter parsedRows.
  // Note: This WILL reset any manual edits made to those rows if we reload from parsedRows.
  // But usually "Retry" implies starting fresh with the rejected set.
  // To preserve manual edits would be harder as editableItems is derivative.
  const newParsed = parsedRows.value.filter((_, idx) => failedIndices.has(idx));
  
  // 3. Update parsedRows - this triggers the watcher to regenerate editableItems
  parsedRows.value = newParsed;
  
  // 4. Reset states
  importResults.value = [];
  errorMessages.value = [];
  importSuccess.value = false;
  done.value = 0;
  totalToImport.value = 0;
  
  // 5. Populate rowErrors for the NEW indices
  // We need to wait for watcher to fire? Vue watchers are usually sync or nextTick.
  // Let's use setTimeout or nextTick to ensure editableItems is ready.
  setTimeout(() => {
      // Clear old errors
      for (const k of Object.keys(rowErrors)) delete rowErrors[k];
      
      // The new list preserves order of the filtered items.
      // So if we had indices [0, 5, 9] failed:
      // New index 0 was Old 0
      // New index 1 was Old 5
      // New index 2 was Old 9
      
      let newIdx = 0;
      // We iterate the original indices in order to match the new array order
      // (assuming parsedRows.filter preserves order, which it does)
      const sortedOldIndices = Array.from(failedIndices).sort((a, b) => a - b);
      
      for (const oldIdx of sortedOldIndices) {
          const reason = reasonsMap.get(oldIdx);
          if (reason) {
              if (!rowErrors[newIdx]) rowErrors[newIdx] = {};
              rowErrors[newIdx]['_general'] = `Previous Attempt: ${reason}`;
              // Try to map specific field errors if reason contains field name? 
              // Hard to parse string reason "Name already exists".
              if (/name/i.test(reason)) rowErrors[newIdx]['name'] = reason;
              if (/sku/i.test(reason)) rowErrors[newIdx]['sku'] = reason;
              if (/date/i.test(reason)) rowErrors[newIdx]['expiryDate'] = reason;
          }
          newIdx++;
      }
      
  }, 100);
}

function exportFailedItems() {
  if (!importResults.value.length) return;
  
  // Create CSV content
  const headers = ['Row', 'Item Name', 'Status', 'Reason'];
  const rows = importResults.value.map(item => [
    item.row,
    `"${item.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
    item.status,
    `"${item.reason.replace(/"/g, '""')}"`
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `failed-items-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log(`[BulkImport] Exported ${importResults.value.length} failed items to CSV`);
}

// ── Placeholder functions for missing UI bindings ──────────────────────────
function bulkUpdateLoadProducts() { console.warn('bulkUpdateLoadProducts not implemented'); }
function bulkUpdateApplyGlobal(key) { console.warn('bulkUpdateApplyGlobal not implemented', key); }
function toggleBulkUpdateSelectAll() {
  const state = bulkUpdateSelectAll.value;
  bulkUpdateRows.value.forEach(r => r.selected = state);
}
function bulkUpdateSubmit() { console.warn('bulkUpdateSubmit not implemented'); }

function priceUpdateLoadProducts() { console.warn('priceUpdateLoadProducts not implemented'); }
function priceUpdateApplyGlobal(key) { console.warn('priceUpdateApplyGlobal not implemented', key); }
function togglePriceUpdateSelectAll() {
  const state = priceUpdateSelectAll.value;
  priceUpdateRows.value.forEach(r => r.selected = state);
}
function priceUpdateSubmit() { console.warn('priceUpdateSubmit not implemented'); }

</script>

<style scoped>
</style>
