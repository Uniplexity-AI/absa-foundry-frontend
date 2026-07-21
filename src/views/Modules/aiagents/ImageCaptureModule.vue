<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900 bg-white">
    <!-- Viewport Mesh Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
      <div class="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-none"></div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">AI Agents // Ingestion</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-outfit">Bulk Image Capture</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
           <!-- History Toggle -->
           <div class="flex bg-gray-100 p-0.5 rounded-none border border-gray-200">
               <button 
                @click="currentView = 'capture'"
                :class="['px-3 py-1 text-[10px] font-bold font-mono uppercase transition-all', currentView === 'capture' ? 'bg-white text-[#2F2E8B] shadow-sm' : 'text-gray-400 hover:text-gray-600']">
                   New Scan
               </button>
               <button 
                @click="currentView = 'history'"
                :class="['px-3 py-1 text-[10px] font-bold font-mono uppercase transition-all', currentView === 'history' ? 'bg-white text-[#2F2E8B] shadow-sm' : 'text-gray-400 hover:text-gray-600']">
                   History
               </button>
           </div>

           <!-- User Badge -->
          <div class="hidden md:flex items-center gap-2 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider border-l border-gray-200 pl-4">
            <i class="fas fa-user-circle"></i>
            {{ getUserEmail?.()?.split('@')[0] || 'Operator' }}
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-12 pb-8 relative z-10 space-y-6 overflow-x-hidden">
      
      <!-- CAPTURE VIEW -->
      <div v-if="currentView === 'capture'" class="space-y-6 animate-modal-in">
        <!-- Controls Toolbar -->
        <div class="bg-white border border-gray-100 p-4 shadow-sm relative overflow-hidden group">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
            <div class="relative z-10 flex flex-col sm:flex-row gap-4 justify-between items-end sm:items-center">
                
                <!-- Destination Selector -->
                <div class="w-full sm:w-auto flex flex-col gap-1">
                    <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Upload Destination</label>
                    <div class="relative">
                        <select v-model="destination" class="appearance-none w-full sm:w-64 bg-gray-50 border border-gray-200 rounded-none px-3 py-2 text-sm font-bold text-[#2F2E8B] uppercase tracking-wide focus:ring-2 focus:ring-[#2F2E8B]/20 focus:border-[#2F2E8B] transition-all">
                            <optgroup label="── Inventory ──">
                              <option value="stock_count">Stock Count (Physical Count)</option>
                              <option value="stock_bulk_upload">Stock Bulk Upload</option>
                              <option value="inventory">Inventory (Add Items)</option>
                              <option value="inventory_sale">POS Module (Sales Transaction)</option>
                            </optgroup>
                            <optgroup label="── Other ──">
                              <option value="crm">CRM Leads</option>
                              <option value="expense">Expense Receipts</option>
                              <option value="invoice">Invoices (Hard Copy)</option>
                              <option value="quotation">Quotations/Estimates</option>
                              <option value="notes">Strategic Notes</option>
                            </optgroup>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#2F2E8B]">
                            <i class="fas fa-chevron-down text-xs"></i>
                        </div>
                    </div>
                </div>

                <!-- Upload Action -->
                <div class="flex gap-2">
                    <button 
                    @click="triggerFileInput"
                    :disabled="previewImages.length >= maxImages || uploading"
                    class="bg-[#2F2E8B] hover:bg-[#1D226B] text-white px-6 py-2 rounded-none text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        <i class="fas fa-camera"></i> 
                        <span>Add Images {{ previewImages.length }}/{{ maxImages }}</span>
                    </button>
                    <input type="file" ref="fileInput" multiple accept="image/*" class="hidden" @change="handleFileSelect">
                    
                    <button 
                        v-if="previewImages.length > 0"
                        @click="processImages" 
                        :disabled="uploading"
                        class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-none text-xs font-bold font-mono uppercase shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
                        <i class="fas fa-microchip"></i>
                        <span>Process</span>
                    </button>
                </div>
            </div>
            
            <!-- Progress Bar -->
            <div v-if="uploading" class="mt-4">
                <div class="flex justify-between text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">
                    <span>Processing AI Analysis...</span>
                    <span>{{ uploadProgress }}%</span>
                </div>
                <div class="w-full bg-gray-100 h-1.5 rounded-none overflow-hidden">
                    <div class="bg-[#2F2E8B] h-full transition-all duration-300" :style="{ width: `${uploadProgress}%` }"></div>
                </div>
            </div>
        </div>

        <!-- Processing State (replaces image grid during AI analysis) -->
        <div v-if="uploading" class="flex flex-col items-center justify-center py-16 border-2 border-[#2F2E8B]/20 bg-[#2F2E8B]/[0.02] animate-modal-in">
            <div class="relative mb-6">
                <div class="w-20 h-20 rounded-full border-4 border-gray-100 border-t-[#2F2E8B] animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-microchip text-[#2F2E8B] text-lg"></i>
                </div>
            </div>
            <h3 class="text-sm font-black text-gray-900 uppercase font-outfit tracking-tight mb-1">AI Processing</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">
                Analyzing {{ previewImages.length }} image{{ previewImages.length > 1 ? 's' : '' }} → {{ destination }}
            </p>
            <div class="w-64">
                <div class="flex justify-between text-[10px] font-mono font-bold text-gray-500 uppercase mb-1">
                    <span>Extracting data...</span>
                    <span>{{ uploadProgress }}%</span>
                </div>
                <div class="w-full bg-gray-100 h-2 rounded-none overflow-hidden">
                    <div class="bg-[#2F2E8B] h-full transition-all duration-300" :style="{ width: `${uploadProgress}%` }"></div>
                </div>
            </div>
            <!-- Mini image strip -->
            <div class="flex gap-1.5 mt-5">
                <div v-for="(image, index) in previewImages.slice(0, 8)" :key="index" class="w-8 h-8 bg-gray-100 border border-gray-200 overflow-hidden opacity-60">
                    <img :src="image.preview" class="w-full h-full object-cover grayscale">
                </div>
                <div v-if="previewImages.length > 8" class="w-8 h-8 bg-gray-100 border border-gray-200 flex items-center justify-center text-[8px] font-mono font-bold text-gray-400">
                    +{{ previewImages.length - 8 }}
                </div>
            </div>
        </div>

        <!-- Image Grid Workspace -->
        <div v-else-if="previewImages.length > 0 && !processedData.length" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-modal-in">
            <div v-for="(image, index) in previewImages" :key="index" class="relative aspect-square bg-gray-100 border border-gray-200 group overflow-hidden">
                <img :src="image.preview" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500">
                <div class="absolute inset-0 bg-[#2F2E8B]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <button @click="removeImage(index)" class="absolute top-2 right-2 bg-white text-red-500 w-6 h-6 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white">
                    <i class="fas fa-times text-xs"></i>
                </button>
                <div class="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    IMG_{{ index + 1 }}
                </div>
            </div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="!processedData.length" class="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 bg-gray-50/50">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <i class="fas fa-cloud-upload-alt text-2xl text-gray-300"></i>
            </div>
            <h3 class="text-sm font-black text-gray-900 uppercase font-outfit tracking-tight mb-1">Ready to Capture</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest max-w-xs text-center">
                Upload images to extract data directly into {{ destination }}
            </p>
        </div>

        <!-- Processed Data Workspace -->
        <div v-if="processedData.length" class="space-y-6">
            
            <!-- Data Toolbar -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                <div class="flex items-center gap-3">
                        <div class="w-1.5 h-4 bg-[#10B981] rounded-none"></div>
                        <div>
                        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-tight">Extracted Data</h3>
                        <div class="flex gap-2 text-[10px] font-mono text-gray-400 uppercase">
                            <span v-if="csvFileId">FID: {{ csvFileId }}</span>
                            <span>•</span>
                            <span>{{ processedData.length }} Records</span>
                        </div>
                        </div>
                </div>
                
                <div class="flex flex-wrap gap-2">
                    <button v-if="hasUnsavedChanges" @click="saveEdits" :disabled="savingEdits || applied" class="bg-[#10B981] text-white hover:bg-[#059669] px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors disabled:opacity-50">
                        <i v-if="savingEdits" class="fas fa-spinner fa-spin mr-1"></i>
                        <i v-else class="fas fa-save mr-1"></i> Save Changes
                    </button>
                    <button v-if="hasUnsavedChanges" @click="discardChanges" class="bg-gray-200 text-gray-600 hover:bg-gray-300 px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors">
                        Discard
                    </button>

                    <button @click="downloadCSV" class="border border-gray-200 text-gray-600 hover:text-[#2F2E8B] hover:border-[#2F2E8B] px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors">
                        <i class="fas fa-download mr-1"></i> CSV
                    </button>

                    <button v-if="applied" @click="viewAppliedData" class="bg-amber-500 text-white hover:bg-amber-600 px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors shadow-md animate-modal-in">
                        <i class="fas fa-external-link-alt mr-1"></i> View in {{ destination === 'crm' ? 'CRM' : formatHeader(destination) }}
                    </button>

                    <!-- View Inventory shortcut for inventory modes -->
                    <button v-if="isInventoryMode" @click="goToInventory" class="border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors">
                        <i class="fas fa-boxes mr-1"></i> Inventory
                    </button>
                    
                    <div class="h-6 w-px bg-gray-200 mx-1"></div>

                    <button v-if="missingProducts.length" @click="openModal('missing')" class="bg-[#F59E0B] text-white hover:bg-[#D97706] px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors shadow-sm">
                        <i class="fas fa-exclamation-triangle mr-1"></i> Resolve Missing ({{ missingProducts.length }})
                    </button>

                    <button v-if="!isInventoryMode || destination === 'stock_bulk_upload'" @click="previewApply" :disabled="!csvFileId || previewLoading" class="bg-gray-800 text-white hover:bg-gray-700 px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors shadow-sm disabled:opacity-50">
                        <i v-if="previewLoading" class="fas fa-spinner fa-spin mr-1"></i> {{ ['inventory', 'stock_bulk_upload'].includes(destination) ? 'Validate' : 'Preview' }}
                    </button>

                    <!-- Hide main apply button for stock_count and inventory_sale — handled in mapping panel -->
                    <button v-if="(!isInventoryMode && destination !== 'inventory_sale') || destination === 'stock_bulk_upload'" @click="applyCsv" :disabled="!csvFileId || applying || applied || (destination === 'inventory' && missingProducts.length > 0)" class="bg-[#2F2E8B] text-white hover:bg-[#1D226B] px-6 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors shadow-md disabled:opacity-50">
                        <i v-if="applying" class="fas fa-spinner fa-spin mr-1"></i> {{ applied ? 'APPLIED' : 'APPLY TO SYSTEM' }}
                    </button>
                </div>
            </div>

            <!-- Spreadsheet Data Table -->
            <div class="bg-white border border-gray-200 shadow-sm relative overflow-hidden">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
            
            <div class="overflow-x-auto relative z-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <table class="w-full text-left border-collapse spreadsheet-table">
                    <thead class="sticky top-0 z-10">
                        <tr class="bg-gray-100 border-b-2 border-gray-300">
                            <th class="spreadsheet-header w-12 text-center">#</th>
                            <th v-for="header in editHeaders" :key="header" 
                                class="spreadsheet-header whitespace-nowrap min-w-[120px]"
                                :class="{ 'min-w-[200px]': ['name', 'email', 'address', 'company', 'notes', 'website', 'linkedin', 'twitter', 'facebook'].includes(header) }">
                                {{ formatHeader(header) }}
                            </th>
                            <th class="spreadsheet-header w-10 text-center" v-if="!applied">
                                <i class="fas fa-ellipsis-v text-gray-400"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIdx) in editableData" :key="rowIdx" 
                            :class="['spreadsheet-row', rowErrorMap[rowIdx] ? 'bg-red-50/50' : rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30']">
                            <td class="spreadsheet-cell text-center text-gray-400 font-bold bg-gray-50 border-r border-gray-200 select-none">{{ rowIdx + 1 }}</td>
                            
                            <td v-for="header in editHeaders" :key="header" 
                                class="spreadsheet-cell p-0"
                                @click="focusCell(rowIdx, header)">
                                <template v-if="header === 'total'">
                                    <span class="block px-2 py-1.5 font-bold text-gray-900 text-xs font-mono">{{ formatTotal(row.total) }}</span>
                                </template>
                                <template v-else>
                                    <input 
                                        :ref="el => { if (el) cellRefs[`${rowIdx}-${header}`] = el; else delete cellRefs[`${rowIdx}-${header}`]; }"
                                        v-model="editableData[rowIdx][header]" 
                                        :type="numericHeaders.includes(header) ? 'number' : 'text'"
                                        :step="numericHeaders.includes(header) ? '0.01' : undefined"
                                        :disabled="applied"
                                        @focus="activeCell = `${rowIdx}-${header}`"
                                        @blur="activeCell = null"
                                        @keydown="handleCellKeydown($event, rowIdx, header)"
                                        @input="markDirty"
                                        class="spreadsheet-input"
                                        :class="{ 'spreadsheet-input-active': activeCell === `${rowIdx}-${header}`, 'opacity-60': applied }"
                                        :placeholder="formatHeader(header)" />
                                </template>
                            </td>
                            
                            <td v-if="!applied" class="spreadsheet-cell text-center p-0">
                                <button @click="removeRow(rowIdx)" class="w-full h-full py-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                                    <i class="fas fa-trash text-[10px]"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <!-- Footer: Add Row + Row Count -->
            <div class="flex items-center justify-between p-2 border-t border-gray-200 bg-gray-50/50">
                <button v-if="!applied" @click="addRow" class="text-[#2F2E8B] hover:text-[#1D226B] hover:bg-[#2F2E8B]/5 text-[10px] font-bold font-mono uppercase flex items-center gap-2 px-3 py-1.5 transition-colors">
                    <i class="fas fa-plus"></i> Add Row
                </button>
                <span v-else></span>
                <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                    {{ editableData.length }} {{ editableData.length === 1 ? 'Record' : 'Records' }}
                </span>
            </div>
            </div>

            <!-- ── Inventory Mapping Panel (Stock Count / Bulk Upload) ──────────────── -->
            <div v-if="isInventoryMode && (inventoryMapping.length || loadingInventory)" class="border border-indigo-100 shadow-sm animate-modal-in">
              <!-- Panel Header -->
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-indigo-100 bg-indigo-50/40">
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-8 bg-[#2F2E8B] rounded-none"></div>
                  <div>
                    <span class="text-[9px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest">
                      {{ destination === 'stock_count' ? 'Stock Count' : 'Bulk Upload' }} // Inventory Mapping
                    </span>
                    <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight">
                      <span v-if="loadingInventory"><i class="fas fa-spinner fa-spin text-[#2F2E8B] mr-1"></i> Loading inventory...</span>
                      <span v-else>
                        <span class="text-emerald-600">{{ inventoryMapping.filter(m => m.inventoryId).length }}</span>
                        / {{ inventoryMapping.length }} items matched
                      </span>
                    </h4>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button @click="buildInventoryMappings()" class="border border-gray-200 text-gray-500 hover:text-[#2F2E8B] hover:border-[#2F2E8B] px-3 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors">
                    <i class="fas fa-sync-alt mr-1"></i> Re-match
                  </button>
                  <button @click="goToInventory()" class="border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white px-4 py-1.5 text-[10px] font-bold font-mono uppercase transition-colors flex items-center gap-1.5">
                    <i class="fas fa-boxes"></i> View Inventory
                    <i class="fas fa-external-link-alt text-[8px]"></i>
                  </button>
                </div>
              </div>

              <!-- Mode info banner -->
              <div v-if="destination === 'stock_count'" class="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
                <i class="fas fa-info-circle text-amber-500 text-xs"></i>
                <p class="text-[10px] font-mono text-amber-700">
                  <strong>Stock Count mode:</strong> Apply will set each matched item's stock quantity to the scanned physical count, overwriting the current value. A history entry is recorded for audit.
                </p>
              </div>
              <div v-else class="px-4 py-2 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                <i class="fas fa-info-circle text-blue-500 text-xs"></i>
                <p class="text-[10px] font-mono text-blue-700">
                  <strong>Bulk Upload mode:</strong> Apply will add or update all scanned items in inventory (matched by name). New items will be created.
                </p>
              </div>

              <!-- Mapping Table -->
              <div class="overflow-x-auto max-h-[50vh] overflow-y-auto custom-scrollbar">
                <table class="w-full text-left border-collapse">
                  <thead class="bg-[#2F2E8B] text-white sticky top-0 z-10">
                    <tr>
                      <th class="px-3 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest w-8">#</th>
                      <th class="px-3 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest min-w-[140px]">Scanned Item</th>
                      <th class="px-3 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest min-w-[200px]">Matched Inventory Item</th>
                      <th class="px-3 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest text-right">
                        {{ destination === 'stock_count' ? 'Physical Count' : 'Scanned Qty' }}
                      </th>
                      <th class="px-3 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest text-right">Current Stock</th>
                      <th class="px-3 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest text-right">Variance</th>
                      <th class="px-3 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="(m, i) in inventoryMapping" :key="i"
                      :class="[i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40', !m.inventoryId ? 'bg-amber-50/40' : '']"
                      class="hover:bg-indigo-50/20 transition-colors">
                      <td class="px-3 py-2 text-[10px] font-mono text-gray-400 select-none">{{ i + 1 }}</td>
                      <td class="px-3 py-2 text-xs font-bold font-mono text-gray-900">{{ m.scannedName }}</td>
                      <td class="px-3 py-2">
                        <select
                          v-model="m.inventoryId"
                          @change="updateMappingMatch(m)"
                          :disabled="applied"
                          class="w-full border border-gray-200 rounded-none text-[10px] font-mono px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] bg-white disabled:opacity-60">
                          <option value="">— Not Matched —</option>
                          <option v-for="inv in inventoryItems" :key="inv._id || inv.id" :value="String(inv._id || inv.id || '')">
                            {{ inv.name }}{{ inv.sku ? ` [${inv.sku}]` : '' }} (Stock: {{ inv.stockQty ?? 0 }})
                          </option>
                        </select>
                      </td>
                      <td class="px-3 py-2 text-right">
                        <input
                          v-model.number="m.scannedQty"
                          type="number" min="0"
                          :disabled="applied"
                          class="w-20 border border-gray-200 rounded-none text-[10px] font-mono px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-[#2F2E8B] disabled:opacity-60" />
                      </td>
                      <td class="px-3 py-2 text-[11px] font-mono text-gray-600 text-right font-bold">
                        {{ m.inventoryId && m.currentStock !== null ? m.currentStock : '—' }}
                      </td>
                      <td class="px-3 py-2 text-[11px] font-mono font-bold text-right"
                        :class="!m.inventoryId ? 'text-gray-300' : m.scannedQty - m.currentStock > 0 ? 'text-emerald-600' : m.scannedQty - m.currentStock < 0 ? 'text-red-500' : 'text-gray-400'">
                        <span v-if="m.inventoryId && m.currentStock !== null">
                          {{ m.scannedQty - m.currentStock > 0 ? '+' : '' }}{{ (m.scannedQty - m.currentStock).toFixed(0) }}
                        </span>
                        <span v-else>—</span>
                      </td>
                      <td class="px-3 py-2 text-center">
                        <span v-if="m.inventoryId" class="inline-block text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 uppercase tracking-wider">
                          <i class="fas fa-check mr-0.5"></i> Matched
                        </span>
                        <span v-else class="inline-block text-[9px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 uppercase tracking-wider">
                          Unmatched
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Panel Footer: summary + apply -->
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-t border-indigo-100 bg-white">
                <div class="text-[10px] font-mono text-gray-500 flex gap-4">
                  <span><span class="font-bold text-emerald-600">{{ inventoryMapping.filter(m => m.inventoryId).length }}</span> matched</span>
                  <span><span class="font-bold text-amber-500">{{ inventoryMapping.filter(m => !m.inventoryId).length }}</span> unmatched</span>
                  <span class="text-gray-400">(unmatched items will be skipped)</span>
                </div>

                <!-- Stock Count Apply -->
                <button
                  v-if="destination === 'stock_count'"
                  @click="applyStockCount"
                  :disabled="applyingStockCount || applied || !inventoryMapping.some(m => m.inventoryId)"
                  class="bg-[#2F2E8B] text-white hover:bg-[#1D226B] px-6 py-2 text-[10px] font-bold font-mono uppercase transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
                  <i v-if="applyingStockCount" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-clipboard-check"></i>
                  {{ applied ? 'STOCK COUNT APPLIED' : 'APPLY STOCK COUNT' }}
                </button>

                <!-- Bulk Upload Apply -->
                <button
                  v-else-if="destination === 'stock_bulk_upload' && !applied"
                  @click="applyCsv"
                  :disabled="applying || applied"
                  class="bg-[#2F2E8B] text-white hover:bg-[#1D226B] px-6 py-2 text-[10px] font-bold font-mono uppercase transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
                  <i v-if="applying" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-upload"></i>
                  APPLY TO INVENTORY
                </button>

                <span v-if="applied" class="text-[10px] font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                  <i class="fas fa-check-circle"></i> Applied successfully
                </span>
              </div>
            </div>

            <!-- ── POS Module Mapping Panel ──────────────── -->
            <div v-if="destination === 'inventory_sale' && editableData.length && editHeaders.length" class="border border-[#2F2E8B]/20 shadow-sm animate-modal-in mt-6">
              <div class="flex items-center justify-between p-4 border-b border-[#2F2E8B]/10 bg-[#2F2E8B]/5">
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-8 bg-[#2F2E8B] rounded-none"></div>
                  <div>
                    <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">Map to POS Cart</h3>
                    <p class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest">Match your extracted columns to POS Receipt format</p>
                  </div>
                </div>
                <button @click="autoMapPosColumns" class="text-[10px] font-mono font-black text-[#2F2E8B] hover:text-[#1D226B] uppercase tracking-widest flex items-center gap-1 border border-[#2F2E8B]/20 px-3 py-1.5 bg-white shadow-sm">
                  <i class="fas fa-magic"></i> Auto Map
                </button>
              </div>

              <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/30">
                <div v-for="field in posMappingFields" :key="field.key" class="flex flex-col gap-1.5">
                  <label class="text-[10px] font-mono font-black text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
                    <i :class="field.icon"></i> {{ field.label }}
                    <span v-if="field.required" class="text-red-500">*</span>
                  </label>
                  <select v-model="posMapping[field.key]" class="w-full bg-white border border-gray-200 rounded-none px-3 py-2 text-xs font-mono font-bold text-[#2F2E8B] uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none cursor-pointer">
                    <option value="">-- DO NOT MAP --</option>
                    <option v-for="col in editHeaders" :key="col" :value="col">{{ formatHeader(col) }}</option>
                  </select>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
                <div class="text-[10px] font-mono font-bold text-gray-500 uppercase">
                  <span v-if="isPosMappingValid" class="text-emerald-600"><i class="fas fa-check-circle mr-1"></i> Ready to send to POS</span>
                  <span v-else class="text-amber-500"><i class="fas fa-exclamation-circle mr-1"></i> Required fields missing (Name, Price, Qty)</span>
                </div>
                <button @click="sendToPos" :disabled="!isPosMappingValid" class="bg-[#2F2E8B] text-white hover:bg-[#1D226B] px-6 py-2 text-[10px] font-bold font-mono uppercase transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
                  <i class="fas fa-paper-plane"></i> ADD TO POS MODULE
                </button>
              </div>
            </div>

            <!-- Validation Feedback -->
            <div v-if="validationResult" class="animate-modal-in">
                <div v-if="validationResult.status === 'failed_validation'" class="bg-red-50 border-l-4 border-red-500 p-4 shadow-sm">
                    <div class="flex items-start gap-3">
                        <i class="fas fa-exclamation-triangle text-red-500 mt-0.5"></i>
                        <div>
                            <h5 class="text-xs font-bold font-mono text-red-700 uppercase tracking-tight mb-2">Validation Issues Found</h5>
                            <ul class="space-y-1">
                                <li v-for="(err, i) in validationResult.errors" :key="i" class="text-xs font-mono text-red-600">
                                    <span class="font-bold">ROW {{ (err.row ?? i) + 1 }}:</span> {{ err.error }}
                                    <span v-if="err.available !== undefined" class="opacity-75">(Auth: {{ err.available }})</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-else-if="validationResult.status === 'preview'" class="bg-[#ECFDF5] border-l-4 border-[#10B981] p-4 shadow-sm">
                    <h5 class="text-xs font-bold font-mono text-[#047857] uppercase tracking-tight mb-2">Ready to Apply</h5>
                    <p class="text-xs font-mono text-[#065F46]">
                        {{ validationResult.valid_count }} valid records ready for insertion into 
                        <span class="font-bold">{{ validationResult.destination_label || destination.toUpperCase() }}</span>.
                        <span v-if="validationResult.total" class="ml-2">Total: {{ validationResult.total }}</span>
                    </p>
                </div>
            </div>

            <!-- Success Result -->
            <div v-if="applyResult" class="bg-[#EFF6FF] border-l-4 border-[#3B82F6] p-4 shadow-sm animate-modal-in">
                <h5 class="text-xs font-bold font-mono text-[#1E40AF] uppercase tracking-tight mb-1">Operation Complete</h5>
                <div class="space-y-1 text-xs font-mono text-[#1E3A8A]">
                    <p>Status: {{ applyResult.status }}</p>
                    <!-- Inventory apply result -->
                    <p v-if="applyResult.sale_id">Sale ID: {{ applyResult.sale_id }}</p>
                    <p v-if="applyResult.total !== undefined">Total Value: {{ applyResult.total }}</p>
                    <!-- Non-inventory apply result -->
                    <p v-if="applyResult.records_created !== undefined">Records Created: {{ applyResult.records_created }}</p>
                    <p v-if="applyResult.destination">Destination: <span class="uppercase font-bold">{{ applyResult.destination }}</span></p>
                    <p v-if="applyResult.message">{{ applyResult.message }}</p>
                </div>
            </div>

        </div>
      </div>

      <!-- HISTORY VIEW -->
      <div v-else-if="currentView === 'history'" class="animate-modal-in">
          <CSVFilesList @preview-file="loadFromHistory" />
      </div>

    </main>

    <!-- Missing Products Modal (Simplified for POS Style) -->
    <div v-if="showMissingModal" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeMissingProductsModal"></div>
        <div class="relative w-full max-w-2xl bg-white rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-modal-in">
             <div class="h-1 bg-[#F59E0B]"></div>
             <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <div>
                    <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Inventory // Resolution</span>
                    <h3 class="text-lg font-black text-gray-900 uppercase font-outfit tracking-tight">Missing Products</h3>
                 </div>
                 <button @click="closeMissingProductsModal" class="text-gray-400 hover:text-gray-600"><i class="fas fa-times"></i></button>
             </div>
             
             <div class="p-4 overflow-y-auto custom-scrollbar flex-1 bg-white space-y-4">
                 <div v-for="(mp, idx) in missingFormModels" :key="idx" class="border border-gray-200 p-4 relative group hover:border-[#F59E0B]/50 transition-colors">
                     <div class="absolute top-2 right-2 text-[9px] font-mono font-bold text-gray-300">ROW {{ mp.row_index + 1 }}</div>
                     
                     <div class="grid grid-cols-2 gap-4">
                         <div class="col-span-2">
                             <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase mb-1">Product Name</label>
                             <input v-model="mp.name" class="w-full border border-gray-200 rounded-none p-2 text-xs focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none" />
                         </div>
                         <div>
                             <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase mb-1">Category</label>
                             <input v-model="mp.category" class="w-full border border-gray-200 rounded-none p-2 text-xs focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none" />
                         </div>
                         <div>
                             <label class="block text-[9px] font-mono font-bold text-gray-500 uppercase mb-1">Price</label>
                             <input v-model.number="mp.price" type="number" class="w-full border rounded-none p-2 text-xs focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none" />
                         </div>
                     </div>
                 </div>
             </div>
             
             <div class="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-2">
                 <button @click="closeMissingProductsModal" class="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold font-mono uppercase">Cancel</button>
                 <button @click="createMissingProducts" :disabled="creatingProducts" class="px-4 py-2 bg-[#F59E0B] text-white text-xs font-bold font-mono uppercase bg-gradient-to-r from-amber-500 to-amber-600 shadow-sm">
                     {{ creatingProducts ? 'Creating...' : 'Create All' }}
                 </button>
             </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import API_BASE_URL from '@/services/api';
import { decodeJWT } from '@/services/decodeJWT.js';
import CSVFilesList from '@/components/CSVFilesList.vue';

const { getTenantId, getUserEmail, getToken } = decodeJWT();
const router = useRouter();

// UI State
const currentView = ref('capture'); // capture | history
const showMissingModal = ref(false);
const destination = ref('inventory');
const maxImages = 20;

const previewImages = ref([]);
const uploadProgress = ref(0);
const uploading = ref(false);
const fileInput = ref(null);

const processedData = ref([]);
const csvHeaders = ref([]);
const csvFileId = ref(null);

const isEditing = ref(false);
const editableData = ref([]);
const editHeaders = computed(() => {
  return csvHeaders.value.filter(h => h !== 'product_id');
});
const savingEdits = ref(false);
const numericHeaders = ['quantity', 'unit_price', 'total', 'price', 'value',
  'opening_stock', 'ordered_stock', 'total_stock', 'closing_stock', 'physical_count',
  'amount_sold', 'total_sales', 'stockQty'];
const activeCell = ref(null);
const hasUnsavedChanges = ref(false);
const cellRefs = {};

const validationResult = ref(null);
const missingProducts = ref([]);
const missingFormModels = ref([]);
const previewLoading = ref(false);
const applying = ref(false);
const applied = ref(false);
const applyResult = ref(null);
const creatingProducts = ref(false);

// ── Inventory mapping state (stock_count / stock_bulk_upload modes) ──────────
const loadingInventory = ref(false);
const inventoryItems = ref([]);
const inventoryMapping = ref([]);
const applyingStockCount = ref(false);

const isInventoryMode = computed(() =>
  ['stock_count', 'stock_bulk_upload'].includes(destination.value)
);

const rowErrorMap = computed(() => {
  const map = {};
  editableData.value.forEach((row, rowIdx) => {
    for (const header of editHeaders.value) {
      if (row[header] === null || row[header] === undefined) {
        map[rowIdx] = true;
      }
    }
  });
  return map;
});

// ── POS Module Mapping State ──────────────────────────────────────────────────
const posMapping = ref({ name: '', sku: '', price: '', quantity: '' });
const posMappingFields = [
  { key: 'name', label: 'Item Name', icon: 'fas fa-box', required: true },
  { key: 'sku', label: 'SKU / Barcode', icon: 'fas fa-barcode', required: false },
  { key: 'price', label: 'Unit Price', icon: 'fas fa-tag', required: true },
  { key: 'quantity', label: 'Quantity', icon: 'fas fa-layer-group', required: true }
];

const autoMapPosColumns = () => {
  const h = editHeaders.value.map(x => x.toLowerCase());
  
  const findMatch = (terms) => {
    for (const term of terms) {
      const idx = h.findIndex(x => x.includes(term));
      if (idx !== -1) return editHeaders.value[idx];
    }
    return '';
  };
  
  posMapping.value.name = findMatch(['name', 'desc', 'item', 'product']);
  posMapping.value.sku = findMatch(['sku', 'code', 'barcode']);
  posMapping.value.price = findMatch(['price', 'cost', 'amount', 'unit']);
  posMapping.value.quantity = findMatch(['qty', 'quantity', 'count']);
};

const isPosMappingValid = computed(() => {
  return posMapping.value.name && posMapping.value.price && posMapping.value.quantity;
});

const sendToPos = () => {
  if (!isPosMappingValid.value) return;
  
  const items = editableData.value.map(row => {
    return {
      name: row[posMapping.value.name] || 'Unknown Item',
      sku: posMapping.value.sku ? row[posMapping.value.sku] : '',
      price: parseFloat(row[posMapping.value.price]) || 0,
      quantity: parseInt(row[posMapping.value.quantity]) || 1
    };
  });
  
  sessionStorage.setItem('pos_imported_cart', JSON.stringify(items));
  router.push('/dashboard/pos');
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files);
  if (previewImages.value.length + files.length > maxImages) {
    alert(`Maximum ${maxImages} images allowed`);
    return;
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImages.value.push({
        file,
        preview: e.target.result
      });
    };
    reader.readAsDataURL(file);
  });
  
  // Clear input
  event.target.value = '';
};

const removeImage = (index) => {
  previewImages.value.splice(index, 1);
};

const processImages = async () => {
  if (!previewImages.value.length) return;

  uploading.value = true;
  uploadProgress.value = 0;
  processedData.value = [];
  validationResult.value = null;
  applyResult.value = null;
  applied.value = false;

  const formData = new FormData();
  previewImages.value.forEach(img => {
    formData.append('files', img.file);
  });
  formData.append('tenant_id', getTenantId());
  formData.append('destination', destination.value); // Sending destination to backend

  try {
    // Simulate progress
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) uploadProgress.value += 10;
    }, 500);

    const response = await fetch(`${API_BASE_URL}/bulk-image-capture/process-images?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });

    clearInterval(progressInterval);
    uploadProgress.value = 100;

    if (!response.ok) throw new Error('Failed to process images');

    const result = await response.json();
    processedData.value = result.data;
    csvHeaders.value = result.headers;
    csvFileId.value = result.file_id;
    
    // Auto-populate editable spreadsheet
    editableData.value = JSON.parse(JSON.stringify(result.data));
    hasUnsavedChanges.value = false;

    // Fetch inventory for matching if in stock_count / stock_bulk_upload mode
    if (isInventoryMode.value) await fetchInventoryForMapping();
    
  } catch (error) {
    console.error('Processing error:', error);
    alert('Failed to process images: ' + error.message);
  } finally {
    uploading.value = false;
  }
};

const downloadCSV = () => {
  const data = editableData.value.length ? editableData.value : processedData.value;
  if (!data.length) return;
  
  const headers = csvHeaders.value;
  const escapeCell = (val) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  
  const csvRows = [
    headers.map(h => escapeCell(h)).join(','),
    ...data.map(row => headers.map(h => escapeCell(row[h])).join(','))
  ];
  
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const link = document.createElement('a');
  link.href = url;
  link.download = `bulk_import_${ts}.csv`;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

const markDirty = () => {
  hasUnsavedChanges.value = true;
};

const discardChanges = () => {
  editableData.value = JSON.parse(JSON.stringify(processedData.value));
  hasUnsavedChanges.value = false;
};

const focusCell = (rowIdx, header) => {
  const key = `${rowIdx}-${header}`;
  if (cellRefs[key]) cellRefs[key].focus();
};

const handleCellKeydown = (e, rowIdx, header) => {
  const headers = editHeaders.value;
  const colIdx = headers.indexOf(header);
  
  if (e.key === 'Tab') {
    e.preventDefault();
    const nextCol = e.shiftKey ? colIdx - 1 : colIdx + 1;
    if (nextCol >= 0 && nextCol < headers.length) {
      focusCell(rowIdx, headers[nextCol]);
    } else if (!e.shiftKey && nextCol >= headers.length && rowIdx + 1 < editableData.value.length) {
      focusCell(rowIdx + 1, headers[0]);
    } else if (e.shiftKey && nextCol < 0 && rowIdx > 0) {
      focusCell(rowIdx - 1, headers[headers.length - 1]);
    }
  } else if (e.key === 'ArrowDown' && rowIdx + 1 < editableData.value.length) {
    e.preventDefault();
    focusCell(rowIdx + 1, header);
  } else if (e.key === 'ArrowUp' && rowIdx > 0) {
    e.preventDefault();
    focusCell(rowIdx - 1, header);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (rowIdx + 1 < editableData.value.length) {
      focusCell(rowIdx + 1, header);
    }
  }
};

const addRow = () => {
  const newRow = {};
  csvHeaders.value.forEach(h => newRow[h] = '');
  editableData.value.push(newRow);
  hasUnsavedChanges.value = true;
};

const removeRow = (index) => {
  editableData.value.splice(index, 1);
  hasUnsavedChanges.value = true;
};

const saveEdits = async () => {
  savingEdits.value = true;
  try {
    // 1. Update CSV on server
    const resp = await fetch(`${API_BASE_URL}/bulk-image-capture/csv-files/${csvFileId.value}?tenant_id=${getTenantId()}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        data: editableData.value,
        headers: csvHeaders.value
      })
    });
    
    if (!resp.ok) throw new Error('Failed to update CSV');
    
    const result = await resp.json();
    
    // 2. Update local state - server may return data at result.data or as the result itself
    const updatedData = result.data || result.rows || editableData.value;
    processedData.value = Array.isArray(updatedData) ? updatedData : editableData.value;
    editableData.value = JSON.parse(JSON.stringify(processedData.value));
    hasUnsavedChanges.value = false;
    
    // Reset validation/apply status since data changed
    validationResult.value = null;
    applyResult.value = null;
    missingProducts.value = [];
    // Rebuild inventory mappings if applicable
    if (isInventoryMode.value) buildInventoryMappings();
    
  } catch (err) {
    console.error(err);
    alert('Error saving edits: ' + err.message);
  } finally {
    savingEdits.value = false;
  }
};

const previewApply = async () => {
  previewLoading.value = true;
  validationResult.value = null;
  missingProducts.value = [];
  
  try {
    const resp = await fetch(`${API_BASE_URL}/bulk-image-capture/apply-csv-preview/${csvFileId.value}?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    
    const result = await resp.json();
    validationResult.value = result;
    
    // If we have missing products info
    if (result.status === 'failed_validation' && result.missing_products) {
      missingProducts.value = result.missing_products;
    }
    
  } catch (err) {
    console.error(err);
    alert('Error during preview: ' + err.message);
  } finally {
    previewLoading.value = false;
  }
};

const openMissingProductsModal = () => {
  showMissingModal.value = true;
  
  // Pre-fill forms
  missingFormModels.value = missingProducts.value.map(mp => ({
    row_index: mp.row_index,
    name: mp.prefill?.description || mp.prefill?.name || '',
    category: '', // User must fill
    price: mp.prefill?.unit_price || 0,
    barcode: mp.prefill?.barcode || '',
    quantity: mp.prefill?.quantity || 0 
  }));
};

const closeMissingProductsModal = () => {
  showMissingModal.value = false;
};

const openModal = (type) => {
    if(type === 'missing') openMissingProductsModal();
}

const createMissingProducts = async () => {
  // Validate forms
  for (const m of missingFormModels.value) {
    if (!m.name || !m.category) {
      alert('Please fill in Name and Category for all products.');
      return;
    }
  }

  creatingProducts.value = true;
  try {
    // Call backend to create products
    // We send payload to a special endpoint in bulk-image-capture which handles creation 
    const resp = await fetch(`${API_BASE_URL}/bulk-image-capture/csv-files/${csvFileId.value}/create-missing-products?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        products: missingFormModels.value
      })
    });
    
    if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.detail || 'Failed to create products');
    }
    
    const result = await resp.json();
    alert(`Created ${result.created_count} products.`);
    
    closeMissingProductsModal();
    missingProducts.value = [];
    
    // Re-run preview validation
    await previewApply();
    
  } catch (err) {
    console.error(err);
    alert('Error: ' + err.message);
  } finally {
    creatingProducts.value = false;
  }
};

// ── Inventory mapping helpers ─────────────────────────────────────────────────
const fetchInventoryForMapping = async () => {
  if (!isInventoryMode.value) return;
  loadingInventory.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/inventory?tenant_id=${getTenantId()}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (res.ok) {
      const data = await res.json();
      inventoryItems.value = Array.isArray(data) ? data : (data.items || []);
    }
  } catch (e) {
    console.warn('Could not fetch inventory for mapping:', e);
  } finally {
    loadingInventory.value = false;
    buildInventoryMappings();
  }
};

const QTY_KEYS = ['closing_stock', 'physical_count', 'total_stock', 'quantity', 'qty', 'stockQty'];

const buildInventoryMappings = () => {
  inventoryMapping.value = editableData.value
    .map((row, idx) => {
      const scannedName = (row.name || row.item_name || row.product || row.description || '').trim();
      if (!scannedName) return null;

      let scannedQty = 0;
      for (const k of QTY_KEYS) {
        const v = parseFloat(row[k]);
        if (!isNaN(v) && v >= 0) { scannedQty = v; break; }
      }

      const lower = scannedName.toLowerCase();
      // Try exact match first, then partial
      let match = inventoryItems.value.find(inv =>
        (inv.name || '').toLowerCase().trim() === lower ||
        (inv.sku || '').toLowerCase().trim() === lower ||
        (inv.partNumber || '').toLowerCase().trim() === lower
      );
      if (!match && lower.length > 2) {
        match = inventoryItems.value.find(inv => {
          const invName = (inv.name || '').toLowerCase().trim();
          return invName.includes(lower) || lower.includes(invName);
        });
      }

      return {
        rowIndex: idx,
        scannedName,
        scannedQty,
        inventoryId: match ? String(match._id || match.id || '') : '',
        matchedName: match ? match.name : '',
        currentStock: match != null ? (match.stockQty ?? 0) : null,
      };
    })
    .filter(Boolean);
};

const updateMappingMatch = (m) => {
  const inv = inventoryItems.value.find(i => String(i._id || i.id || '') === m.inventoryId);
  if (inv) {
    m.matchedName = inv.name;
    m.currentStock = inv.stockQty ?? 0;
  } else {
    m.matchedName = '';
    m.currentStock = null;
  }
};

const applyStockCount = async () => {
  const mapped = inventoryMapping.value.filter(m => m.inventoryId);
  if (!mapped.length) {
    alert('No items are matched to inventory items. Please map them using the dropdown.');
    return;
  }
  if (!confirm(`Update physical stock count for ${mapped.length} inventory items? This will overwrite their current stock quantities.`)) return;

  applyingStockCount.value = true;
  try {
    const resp = await fetch(
      `${API_BASE_URL}/bulk-image-capture/apply-stock-count/${csvFileId.value}?tenant_id=${getTenantId()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify({
          mappings: mapped.map(m => ({
            inventory_id: m.inventoryId,
            physical_count: m.scannedQty,
            row_index: m.rowIndex
          }))
        })
      }
    );
    if (!resp.ok) { const e = await resp.json(); throw new Error(e.detail || 'Failed to apply stock count'); }
    const result = await resp.json();
    applyResult.value = result;
    applied.value = true;
  } catch (err) {
    alert('Error applying stock count: ' + err.message);
  } finally {
    applyingStockCount.value = false;
  }
};

const goToInventory = () => {
  router.push({ name: 'InventoryModule' });
};

const destLabels = { 
  inventory: 'Inventory (Add Items)', 
  inventory_sale: 'Inventory (Create Sale)', 
  crm: 'CRM Leads', 
  notes: 'Strategic Notes', 
  expense: 'Expense Records',
  invoice: 'Invoice (Hard Copy)',
  quotation: 'Quotation/Estimate',
  stock_count: 'Stock Count (Physical)',
  stock_bulk_upload: 'Inventory Bulk Upload'
};

const destRoutes = {
  inventory: 'InventoryModule',
  inventory_sale: 'Transactions',
  crm: 'CrmLeads',
  notes: 'StrategicNotes',
  expense: 'ExpensesList',
  invoice: 'InvoicesPage',
  quotation: 'QuotationsPage'
};

const viewAppliedData = () => {
  const routeName = destRoutes[destination.value];
  if (routeName) {
    router.push({ 
        name: routeName,
        query: { source: 'bulk_image_capture' }
    });
  } else {
    alert('Route for this module not found.');
  }
};

const loadFromHistory = (doc) => {
  // Load a file from history into the scan/edit view
  processedData.value = doc.data || [];
  csvHeaders.value = doc.headers || (doc.data?.length ? Object.keys(doc.data[0]) : []);
  csvFileId.value = doc.id;
  destination.value = doc.destination || 'inventory';
  applied.value = !!doc.verified;
  applyResult.value = null;
  validationResult.value = null;
  missingProducts.value = [];
  editableData.value = JSON.parse(JSON.stringify(doc.data || []));
  hasUnsavedChanges.value = false;
  previewImages.value = [];
  currentView.value = 'capture';
  // Fetch inventory for mapping if applicable
  if (isInventoryMode.value) fetchInventoryForMapping();
};

const applyCsv = async () => {
  const label = destLabels[destination.value] || destination.value;
  if (!confirm(`Apply this data to ${label}? This action cannot be easily undone.`)) return;
  
  applying.value = true;
  try {
    const resp = await fetch(`${API_BASE_URL}/bulk-image-capture/apply-csv/${csvFileId.value}?tenant_id=${getTenantId()}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    
    if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.detail || 'Failed to apply data');
    }
    
    const result = await resp.json();
    applyResult.value = result;
    applied.value = true;
    
  } catch (err) {
    console.error(err);
    alert('Error applying data: ' + err.message);
  } finally {
    applying.value = false;
  }
};

const formatHeader = (header) => {
  return header.replace(/_/g, ' ');
};

const formatTotal = (val) => {
    return Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
</script>

<style scoped>
/* Custom animations and scrollbars to match POS */
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-in {
  animation: modal-in 0.2s cubic-bezier(0, 0, 0.2, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2F2E8B;
  border-radius: 0;
}

/* Spreadsheet styles */
.spreadsheet-table {
  border-collapse: collapse;
}

.spreadsheet-header {
  padding: 6px 8px;
  text-align: left;
  font-size: 9px;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
  font-weight: 900;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-right: 1px solid #e5e7eb;
  border-bottom: 2px solid #d1d5db;
  background: #f3f4f6;
  position: sticky;
  top: 0;
  user-select: none;
}

.spreadsheet-header:last-child {
  border-right: none;
}

.spreadsheet-row {
  transition: background-color 0.1s;
}

.spreadsheet-row:hover {
  background-color: #eff6ff !important;
}

.spreadsheet-cell {
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #f3f4f6;
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
  height: 32px;
  vertical-align: middle;
}

.spreadsheet-cell:last-child {
  border-right: none;
}

.spreadsheet-input {
  width: 100%;
  height: 100%;
  padding: 4px 8px;
  border: none;
  background: transparent;
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
  color: #374151;
  outline: none;
  transition: all 0.1s;
}

.spreadsheet-input:focus {
  background: #eff6ff;
  box-shadow: inset 0 0 0 2px #2F2E8B;
}

.spreadsheet-input-active {
  background: #eff6ff;
  box-shadow: inset 0 0 0 2px #2F2E8B;
}

.spreadsheet-input::placeholder {
  color: #d1d5db;
  font-style: italic;
}

.spreadsheet-input:disabled {
  cursor: default;
}

/* Remove number input spinners for cleaner look */
.spreadsheet-input[type="number"]::-webkit-outer-spin-button,
.spreadsheet-input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.spreadsheet-input[type="number"] {
  -moz-appearance: textfield;
}
</style>
