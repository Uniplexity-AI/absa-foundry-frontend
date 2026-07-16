<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100000] p-4">
    <div class="bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-7xl overflow-hidden animate-scale-in max-h-[95vh] flex flex-col border border-gray-200 rounded-none relative">
      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
      <!-- Header -->
      <div class="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <div class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Bulk_Leads // PROTOCOL_0{{ currentStep }}</div>
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display">Bulk Upload Leads</h3>
          </div>
        </div>
        <button @click="close" class="w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm">
          <X :size="18" />
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Step 1: File Upload -->
        <div v-if="currentStep === 1" class="space-y-8 min-h-[400px]">
          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <h4 class="text-[12px] font-mono font-black text-gray-900 uppercase tracking-widest">Protocol_01 // FILE_UPLOAD</h4>
            </div>
            <button
              @click="downloadTemplate"
              class="px-6 py-2 bg-white border border-gray-200 text-gray-600 text-[10px] font-mono font-black uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all flex items-center gap-2 shadow-sm"
            >
              <Download :size="14" />
              <span>Download_Template</span>
            </button>
          </div>

          <!-- File Upload Area -->
          <div
            @drop.prevent="handleFileDrop"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            :class="dragOver ? 'border-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-200 bg-gray-50/30'"
            class="border border-dashed p-16 text-center transition-all relative group"
          >
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
            <input
              ref="fileInput"
              type="file"
              @change="handleFileSelect"
              accept=".xlsx,.xls,.csv,.ods"
              class="hidden"
            />
            
            <div v-if="!selectedFile" class="relative z-10">
              <div class="w-20 h-20 bg-white border border-gray-100 mx-auto flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Upload :size="32" class="text-gray-300 group-hover:text-[#2F2E8B] transition-colors" />
              </div>
              <p class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2 font-display">Drag & drop your file here</p>
              <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-6">or</p>
              <button
                @click="$refs.fileInput.click()"
                class="px-10 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-[#2F2E8B]/10 active:scale-95"
              >
                Browse_Local_Files
              </button>
              <p class="text-[9px] font-mono text-gray-400 mt-6 uppercase tracking-[0.2em]">Supported formats: .XLSX, .XLS, .ODS, .CSV</p>
            </div>

            <div v-else class="relative z-10 animate-in zoom-in-95 duration-300">
              <div class="w-24 h-24 bg-emerald-50 border border-emerald-100 mx-auto flex items-center justify-center mb-4">
                <FileSpreadsheet :size="40" class="text-emerald-600" />
              </div>
              <p class="text-lg font-black text-gray-900 uppercase tracking-tight mb-1">{{ selectedFile.name }}</p>
              <p class="text-[10px] font-mono text-gray-400 uppercase font-bold">{{ formatFileSize(selectedFile.size) }}</p>
              
              <div class="flex gap-3 justify-center mt-8">
                <button
                  @click="uploadFile"
                  :disabled="uploading"
                  class="px-10 py-3 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all shadow-lg flex items-center gap-2"
                >
                  <Loader2 v-if="uploading" :size="14" class="animate-spin" />
                  <span>{{ uploading ? 'PROCESSING_PROTOCOL...' : 'COMMIT_FILE_IMPORT' }}</span>
                </button>
                <button
                  @click="selectedFile = null"
                  class="px-8 py-3 border border-gray-200 text-gray-400 text-[10px] font-mono font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition-all bg-white"
                >
                  Change_File
                </button>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="bg-gray-50 border border-gray-100 p-8 space-y-4 relative">
            <div class="absolute inset-0 mesh-background opacity-[0.02]"></div>
            <div class="flex items-center gap-3 relative z-10">
              <Info :size="16" class="text-[#2F2E8B]" />
              <h5 class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">Protocol_Validation_Tips</h5>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 relative z-10">
              <div v-for="tip in [
                'Download template for strict format adherence',
                'REQUIRED: Identity_Name & Communications_Email',
                'Deduplication protocols will skip existing entities',
                'Throughput limit: 10,000 entities per protocol'
              ]" :key="tip" class="flex items-start gap-3">
                <div class="w-1 h-1 bg-[#2F2E8B] mt-1.5 flex-shrink-0"></div>
                <span class="text-[10px] font-mono text-gray-500 uppercase font-bold leading-relaxed">{{ tip }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Column Mapping -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div class="flex items-center justify-between border-b border-gray-100 pb-4">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <div>
                <h4 class="text-[12px] font-mono font-black text-gray-900 uppercase tracking-widest">Protocol_02 // COLUMN_MAPPING</h4>
                <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Synchronize system fields with source data columns</p>
              </div>
            </div>
            <button
              @click="autoMapColumns"
              class="px-6 py-2.5 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-lg"
            >
              <Wand2 :size="14" />
              <span>Auto_Detect_Mapping</span>
            </button>
          </div>

          <!-- Column Mapping Table -->
          <div class="bg-white border border-gray-200 overflow-hidden relative">
            <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>
            <div class="overflow-x-auto max-h-[450px] overflow-y-auto custom-scrollbar relative z-10">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-200">
                  <tr>
                    <th class="px-8 py-4 text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Source_Column</th>
                    <th class="px-8 py-4 text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Data_Snippet</th>
                    <th class="px-8 py-4 text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">System_Attribute_Link</th>
                    <th class="px-8 py-4 text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="column in detectedColumns" :key="column" class="hover:bg-gray-50/50 transition-colors group">
                    <td class="px-8 py-4">
                      <div class="flex items-center gap-2">
                        <TableIcon :size="12" class="text-gray-300 group-hover:text-[#2F2E8B] transition-colors" />
                        <span class="text-[11px] font-black text-gray-900 uppercase tracking-tight">{{ column }}</span>
                      </div>
                    </td>
                    <td class="px-8 py-4">
                      <span class="text-[10px] font-mono font-bold text-gray-500 uppercase">{{ getSampleData(column) }}</span>
                    </td>
                    <td class="px-8 py-4">
                      <div class="relative max-w-xs transition-transform focus-within:scale-[1.02] duration-300">
                        <select
                          v-model="columnMapping[column]"
                          class="w-full appearance-none bg-gray-50 border border-gray-200 px-4 py-2.5 text-[10px] font-mono font-black uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/5 focus:border-[#2F2E8B] outline-none cursor-pointer transition-all"
                        >
                          <option value="">-- SKIP_COLUMN --</option>
                          <option v-for="field in leadFields" :key="field.value" :value="field.value">
                             PROTOCOL_{{ field.label.toUpperCase().replace(' ', '_') }}
                          </option>
                        </select>
                        <ChevronRight :size="12" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#2F2E8B] pointer-events-none rotate-90" />
                      </div>
                    </td>
                    <td class="px-8 py-4">
                      <span
                        v-if="isFieldRequired(columnMapping[column])"
                        class="px-3 py-1 bg-red-50 text-red-600 text-[8px] font-mono font-black uppercase tracking-widest border border-red-100"
                      >
                        Mandatory
                      </span>
                      <span v-else-if="columnMapping[column]" class="px-3 py-1 bg-[#2F2E8B]/5 text-[#2F2E8B] text-[8px] font-mono font-black uppercase tracking-widest border border-[#2F2E8B]/10">
                        Synchronized
                      </span>
                      <span v-else class="text-[8px] font-mono font-bold text-gray-300 uppercase tracking-widest">
                        Ignored
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Validation Warnings -->
          <div v-if="mappingWarnings.length > 0" class="bg-red-50 border border-red-100 p-6 flex flex-col gap-4 relative overflow-hidden">
            <div class="absolute inset-0 mesh-background opacity-[0.03]"></div>
            <div class="flex items-center gap-3 relative z-10">
              <FileWarning :size="16" class="text-red-600" />
              <h5 class="text-[11px] font-mono font-black text-red-900 uppercase tracking-widest">Mapping_Protocol_Conflicts</h5>
            </div>
            <ul class="space-y-2 relative z-10">
              <li v-for="(warning, idx) in mappingWarnings" :key="idx" class="text-[10px] font-mono text-red-600 uppercase font-bold flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                {{ warning }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 3: Preview & Edit -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div class="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-4 gap-4">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-[#2F2E8B]"></div>
              <div>
                <h4 class="text-[12px] font-mono font-black text-gray-900 uppercase tracking-widest">Protocol_03 // PREVIEW_STAIRCASE</h4>
                <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Review and sanitize high-integrity lead data before deployment</p>
              </div>
            </div>
            <button
              @click="checkDuplicates"
              :disabled="checkingDuplicates"
              class="px-6 py-2.5 bg-white border border-gray-200 text-gray-900 text-[10px] font-mono font-black uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Loader2 v-if="checkingDuplicates" :size="14" class="animate-spin" />
              <Search v-else :size="14" />
              <span>{{ checkingDuplicates ? 'CHECKING_DUPLICATES...' : 'INITIALIZE_DEDUPLICATION_CHECK' }}</span>
            </button>
          </div>

          <!-- Import Options -->
          <div class="bg-[#0F0F1A] border border-[#2F2E8B]/30 p-8 shadow-2xl relative overflow-hidden group">
            <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none transition-opacity group-hover:opacity-[0.1]"></div>
            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div class="space-y-2">
                <h5 class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-[0.4em] mb-4">DEPLOYMENT_STRATEGY</h5>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                  <li v-for="info in [
                    'ZERO_REQUIREMENT_MODE: Field-agnostic synchronization',
                    'DEDUPLICATION_LOGIC: Absolute identity matching (Name+EM+PH)',
                    'CONFLICT_RESOLUTION: Marked in AMBER for manual override',
                    'REAL_TIME_SANITIZATION: Direct editing supported in preview'
                  ]" :key="info" class="flex items-center gap-3">
                    <div class="w-1 h-1 bg-[#2F2E8B] flex-shrink-0"></div>
                    <span class="text-[9px] font-mono text-white/50 uppercase tracking-widest font-bold leading-none">{{ info }}</span>
                  </li>
                </ul>
              </div>
              <div class="flex flex-col gap-2 min-w-[220px]">
                <button
                  v-if="duplicateCount > 0"
                  @click="deleteAllDuplicates"
                  class="w-full py-3 bg-red-600/10 border border-red-600/20 text-red-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-900/5 group"
                >
                  PURGE_ALL_DUPLICATES ({{ duplicateCount }})
                </button>
                <button
                  v-if="invalidCount > 0"
                  @click="deleteAllInvalid"
                  class="w-full py-3 bg-amber-600/10 border border-amber-600/20 text-amber-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-lg shadow-amber-900/5"
                >
                  CLEANSE_INVALID_LOGS ({{ invalidCount }})
                </button>
              </div>
            </div>
          </div>

          <!-- Editable Preview Table -->
          <div class="bg-white border border-gray-100 overflow-hidden relative shadow-sm">
            <div class="absolute inset-0 dotted-pattern opacity-[0.01] pointer-events-none"></div>
            <div class="overflow-x-auto max-h-[480px] overflow-y-auto custom-scrollbar relative z-10">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50/90 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest border-r border-gray-100 w-16 text-center">ID_HEX</th>
                    <!-- Dynamic columns based on mapped fields -->
                    <th 
                      v-for="field in mappedFieldsList" 
                      :key="field.value"
                      class="px-4 py-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest min-w-[180px]"
                    >
                      {{ field.label.toUpperCase().replace(' ', '_') }}
                      <span v-if="field.required" class="text-red-500 font-black ml-1 text-[12px] leading-none">*</span>
                    </th>
                    <th class="px-4 py-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest w-40">INTEGRITY_SHIELD</th>
                    <th class="px-4 py-4 text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest w-28 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr 
                    v-for="(row, idx) in editableRows" 
                    :key="idx" 
                    :class="[
                      row.isDuplicate ? 'bg-amber-50/40' : !row.isValid ? 'bg-red-50/40' : 'hover:bg-gray-50/50'
                    ]"
                    class="transition-colors group"
                  >
                    <td class="px-4 py-3 text-[9px] font-mono font-bold text-gray-300 uppercase border-r border-gray-100 text-center">
                      #{{ (idx + 1).toString().padStart(3, '0') }}
                    </td>
                    
                    <!-- Dynamic editable cells -->
                    <td v-for="field in mappedFieldsList" :key="field.value" class="px-4 py-3">
                      <div class="relative group/cell">
                        <!-- Date input -->
                        <input v-if="field.value === 'dateCreated'" v-model="row.mappedData[field.value]" type="date"
                          class="w-full bg-white border border-gray-100 px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/5 focus:border-[#2F2E8B] outline-none transition-all" />
                        
                        <!-- Priority -->
                        <select v-else-if="field.value === 'priority'" v-model="row.mappedData.priority"
                          class="w-full bg-white border border-gray-100 px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/5 focus:border-[#2F2E8B] outline-none transition-all cursor-pointer">
                          <option value="hot">HOT</option>
                          <option value="warm">WARM</option>
                          <option value="cold">COLD</option>
                        </select>
                        
                        <!-- Default Input -->
                        <input v-else v-model="row.mappedData[field.value]" @input="validateRow(row)"
                          :type="field.value === 'email' ? 'email' : field.value === 'value' ? 'number' : 'text'"
                          class="w-full bg-white border border-gray-100 px-3 py-1.5 text-[10px] font-mono font-black uppercase tracking-widest focus:ring-4 focus:ring-[#2F2E8B]/5 focus:border-[#2F2E8B] outline-none transition-all"
                          :class="getFieldErrorClass(row, field.value)"
                          :placeholder="'INPUT_' + field.label.toUpperCase().replace(' ', '_')" />
                        
                        <div class="absolute inset-0 border border-dashed border-[#2F2E8B] opacity-0 group-hover/cell:opacity-20 pointer-events-none transition-opacity"></div>
                      </div>
                    </td>
                    
                    <!-- Status with validation message -->
                    <td class="px-4 py-3">
                      <div v-if="row.isDuplicate" class="flex flex-col gap-0.5">
                        <div class="flex items-center gap-1.5">
                          <AlertTriangle :size="12" class="text-amber-500" />
                          <span class="text-[9px] font-mono font-black text-amber-600 uppercase tracking-widest">Duplicate_Link</span>
                        </div>
                        <span class="text-[8px] font-mono text-amber-400 uppercase font-bold tracking-tighter">EXISTING_ENTITY_DETECTED</span>
                      </div>
                      <div v-else-if="!row.isValid" class="flex flex-col gap-0.5">
                        <div class="flex items-center gap-1.5">
                          <FileWarning :size="12" class="text-red-500" />
                          <span class="text-[9px] font-mono font-black text-red-600 uppercase tracking-widest">Protocol_Error</span>
                        </div>
                        <span class="text-[8px] font-mono text-red-400 uppercase font-bold tracking-tighter">{{ getValidationMessage(row) }}</span>
                      </div>
                      <div v-else class="flex flex-col gap-0.5">
                        <div class="flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle :size="12" />
                          <span class="text-[9px] font-mono font-black uppercase tracking-widest">Integrity_Secure</span>
                        </div>
                        <span class="text-[8px] font-mono text-emerald-400 uppercase font-bold tracking-tighter">DATA_VALIDATED_FOR_IMPORT</span>
                      </div>
                    </td>
                    
                    <!-- Actions -->
                    <td class="px-4 py-3 text-right">
                      <button @click="deleteRow(idx)" class="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all shadow-inner border border-transparent hover:border-red-100">
                        <Trash2 :size="14" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Summary Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div v-for="stat in [
              { label: 'Total Entities', value: editableRows.length, color: 'text-gray-900', bg: 'bg-white border-gray-100' },
              { label: 'Validated Unit', value: validNonDuplicateCount, color: 'text-emerald-600', bg: 'bg-emerald-50/30 border-emerald-100' },
              { label: 'Duplicate Detect', value: duplicateCount, color: 'text-amber-600', bg: 'bg-amber-50/30 border-amber-100' },
              { label: 'Critical Errors', value: invalidCount, color: 'text-red-600', bg: 'bg-red-50/30 border-red-100' }
            ]" :key="stat.label" :class="[stat.bg, 'p-6 border relative overflow-hidden group shadow-sm transition-all hover:scale-[1.02] duration-300']">
              <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity"></div>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em] mb-1 relative z-10">{{ stat.label }}</p>
              <p class="text-3xl font-black tracking-tighter relative z-10" :class="stat.color">{{ stat.value }}</p>
              <div class="absolute bottom-0 right-0 w-12 h-12 -mr-4 -mb-4 opacity-[0.05] relative z-0">
                <TableIcon :size="48" class="text-gray-900" />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Results -->
        <div v-if="currentStep === 4" class="space-y-12 py-12">
          <div class="text-center space-y-4">
            <div class="w-24 h-24 bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto shadow-2xl relative group">
              <div class="absolute inset-0 bg-emerald-500/10 animate-ping rounded-full scale-150 opacity-20"></div>
              <CheckCircle :size="48" class="text-emerald-600 relative z-10" />
            </div>
            <div>
              <h4 class="text-3xl font-black text-gray-900 uppercase tracking-tighter font-display">Synchronization Complete</h4>
              <p class="text-[10px] font-mono text-gray-400 uppercase tracking-[0.4em] font-bold mt-2">Leads repository has been updated successfully</p>
            </div>
          </div>

          <!-- Results Summary Matrix -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div v-for="res in [
              { label: 'Successful Sync', val: importResults.success, icon: CheckCircle, color: 'text-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-50/20' },
              { label: 'Skipped Entities', val: importResults.skipped, icon: AlertTriangle, color: 'text-amber-600', border: 'border-amber-100', bg: 'bg-amber-50/20' },
              { label: 'Failed Protocol', val: importResults.failed, icon: FileWarning, color: 'text-red-600', border: 'border-red-100', bg: 'bg-red-50/20' },
              { label: 'Total Volume', val: importResults.total, icon: TableIcon, color: 'text-[#2F2E8B]', border: 'border-[#2F2E8B]/10', bg: 'bg-[#2F2E8B]/5' }
            ]" :key="res.label" :class="[res.bg, res.border, 'p-8 border text-center relative group shadow-sm']">
              <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity"></div>
              <component :is="res.icon" :size="24" class="mx-auto mb-4 opacity-40" :class="res.color" />
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-1 relative z-10">{{ res.label }}</p>
              <p class="text-4xl font-black tracking-tighter relative z-10" :class="res.color">{{ res.val }}</p>
            </div>
          </div>

          <!-- Critical Error Log -->
          <div v-if="(importResults.errors && importResults.errors.length > 0) || (importResults.warnings && importResults.warnings.length > 0)" class="max-w-5xl mx-auto space-y-6">
            <div class="h-px bg-gray-100 w-full"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div v-if="importResults.errors && importResults.errors.length > 0" class="space-y-4">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                  <h5 class="text-[10px] font-mono font-black text-red-600 uppercase tracking-widest">Protocol_Critical_Errors</h5>
                </div>
                <div class="bg-red-50/30 border border-red-100 p-6 max-h-60 overflow-y-auto custom-scrollbar space-y-3">
                  <div v-for="(error, idx) in importResults.errors" :key="idx" class="text-[10px] font-mono text-red-800 uppercase font-bold border-l-2 border-red-200 pl-4 py-1">
                    <span class="text-red-400">Row_{{ error.row.toString().padStart(3, '0') }}</span> // {{ error.message }}
                  </div>
                </div>
              </div>
              
              <div v-if="importResults.warnings && importResults.warnings.length > 0" class="space-y-4">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                  <h5 class="text-[10px] font-mono font-black text-amber-600 uppercase tracking-widest">Synchronization_Warnings</h5>
                </div>
                <div class="bg-amber-50/30 border border-amber-100 p-6 max-h-60 overflow-y-auto custom-scrollbar space-y-3">
                  <div v-for="(warning, idx) in importResults.warnings" :key="idx" class="text-[10px] font-mono text-amber-800 uppercase font-bold border-l-2 border-amber-200 pl-4 py-1">
                    <span class="text-amber-400">Row_{{ warning.row.toString().padStart(3, '0') }}</span> // {{ warning.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between sticky bottom-0 z-50 backdrop-blur-md">
        <div class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest bg-white border border-gray-100 px-4 py-2">
          <span v-if="currentStep === 1">Upload your Excel or CSV file</span>
          <span v-else-if="currentStep === 2">Map {{ detectedColumns.length }} detected columns</span>
          <span v-else-if="currentStep === 3">System Preview // {{ previewData.length }} entities</span>
          <span v-else-if="currentStep === 4">Import procedure completed</span>
        </div>
        
        <div class="flex gap-3">
          <button
            v-if="currentStep > 1 && currentStep < 4"
            @click="previousStep"
            class="px-6 py-2.5 border border-gray-200 text-gray-400 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition-all"
          >
            <ChevronLeft :size="14" class="inline mr-1" />
            GO_BACK
          </button>
          
          <button
            v-if="currentStep < 3"
            @click="nextStep"
            :disabled="!canProceed"
            class="px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-[#2F2E8B]/20"
          >
            NEXT_PROTOCOL
            <ChevronRight :size="14" />
          </button>
          
          <button
            v-if="currentStep === 3"
            @click="processImport"
            :disabled="importing || validNonDuplicateCount === 0"
            class="px-10 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] shadow-lg shadow-[#2F2E8B]/20 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Loader2 v-if="importing" class="animate-spin" :size="14" />
            <FileUp v-else :size="14" />
            <span>{{ importing ? 'COMMITTING_DATA...' : `COMMIT_IMPORT (${validNonDuplicateCount} LEADS)` }}</span>
          </button>
          
          <button
            v-if="currentStep === 4"
            @click="close"
            class="px-10 py-2.5 bg-gray-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl"
          >
            IMPORT_FINALIZED // CLOSE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import * as crmApi from '@/api_services/crm_api.js';
import { API_BASE_URL } from '@/api_services/api.js';
import { 
  X, ChevronRight, ChevronLeft, Download, Search, 
  FileUp, FileSpreadsheet, CheckCircle, AlertTriangle, 
  Trash2, Loader2, Upload, Info, Wand2, FileWarning,
  Table as TableIcon
} from 'lucide-vue-next';

const { getTenantId } = decodeJWT();

const props = defineProps({
  modelValue: Boolean,
  branchId: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue', 'imported']);

// State
const currentStep = ref(1);
const selectedFile = ref(null);
const dragOver = ref(false);
const uploading = ref(false);
const importing = ref(false);
const checkingDuplicates = ref(false);

// Data
const detectedColumns = ref([]);
const dataRows = ref([]);
const columnMapping = ref({});
const previewData = ref([]);
const editableRows = ref([]);
const importResults = ref({});

// Lead fields definition
const leadFields = ref([
  { label: 'Name', value: 'name', required: false },
  { label: 'Email', value: 'email', required: false },
  { label: 'Phone', value: 'phone', required: false },
  { label: 'Company', value: 'company', required: false },
  { label: 'Position/Title', value: 'position', required: false },
  { label: 'Priority (hot/warm/cold)', value: 'priority', required: false },
  { label: 'Stage', value: 'stage', required: false },
  { label: 'Value/Deal Size', value: 'value', required: false },
  { label: 'Source', value: 'source', required: false },
  { label: 'Assigned To', value: 'assignedTo', required: false },
  { label: 'Notes', value: 'notes', required: false },
  { label: 'Date Created', value: 'dateCreated', required: false },
  { label: 'City', value: 'city', required: false },
  { label: 'Country', value: 'country', required: false },
  { label: 'Address', value: 'address', required: false },
  { label: 'Website', value: 'website', required: false },
  { label: 'Industry', value: 'industry', required: false },
  { label: 'Area Name', value: 'areaName', required: false },
  { label: 'Latitude', value: 'lat', required: false },
  { label: 'Longitude', value: 'lng', required: false },
  { label: 'LinkedIn', value: 'linkedin', required: false },
  { label: 'Twitter', value: 'twitter', required: false },
  { label: 'Facebook', value: 'facebook', required: false },
  { label: 'Instagram', value: 'instagram', required: false }
]);

// Computed
const canProceed = computed(() => {
  if (currentStep.value === 1) return selectedFile.value !== null;
  if (currentStep.value === 2) {
    // No required fields, can proceed with any mapping
    return Object.keys(columnMapping.value).length > 0;
  }
  return true;
});

const mappingWarnings = computed(() => {
  const warnings = [];
  // No required fields anymore
  return warnings;
});

// Computed: Get list of mapped fields for dynamic table columns
const mappedFieldsList = computed(() => {
  const mappedFieldValues = Object.values(columnMapping.value);
  return leadFields.value.filter(field => mappedFieldValues.includes(field.value));
});

const validRowCount = computed(() => {
  return editableRows.value.filter(row => row.isValid && !row.isDuplicate).length;
});

const validNonDuplicateCount = computed(() => {
  return editableRows.value.filter(row => row.isValid && !row.isDuplicate).length;
});

const duplicateCount = computed(() => {
  return editableRows.value.filter(row => row.isDuplicate).length;
});

const invalidCount = computed(() => {
  return editableRows.value.filter(row => !row.isValid).length;
});

// Methods
function handleFileDrop(e) {
  dragOver.value = false;
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
}

function handleFileSelect(e) {
  const files = e.target.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function uploadFile() {
  try {
    uploading.value = true;
    const tenantId = getTenantId();
    
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    
    const response = await crmApi.uploadLeadsBulkFile(formData, tenantId);
    
    detectedColumns.value = response.detected_columns;
    dataRows.value = response.data_rows;
    previewData.value = response.data_rows;
    
    currentStep.value = 2;
  } catch (error) {
    console.error('File upload error:', error);
    alert('Failed to process file: ' + (error.message || 'Unknown error'));
  } finally {
    uploading.value = false;
  }
}

function autoMapColumns() {
  // Intelligent auto-mapping based on column names
  const mapping = {};
  
  detectedColumns.value.forEach(col => {
    const colLower = col.toLowerCase().trim();
    
    // Direct matches
    if (colLower === 'name' || colLower === 'full name' || colLower === 'lead name') mapping[col] = 'name';
    else if (colLower === 'email' || colLower === 'email address' || colLower === 'e-mail') mapping[col] = 'email';
    else if (colLower === 'phone' || colLower === 'phone number' || colLower === 'mobile' || colLower === 'tel') mapping[col] = 'phone';
    else if (colLower === 'company' || colLower === 'organization' || colLower === 'business') mapping[col] = 'company';
    else if (colLower === 'position' || colLower === 'title' || colLower === 'job title') mapping[col] = 'position';
    else if (colLower === 'priority' || colLower === 'lead priority') mapping[col] = 'priority';
    else if (colLower === 'stage' || colLower === 'status' || colLower === 'lead stage') mapping[col] = 'stage';
    else if (colLower === 'value' || colLower === 'deal value' || colLower === 'amount') mapping[col] = 'value';
    else if (colLower === 'source' || colLower === 'lead source') mapping[col] = 'source';
    else if (colLower === 'assigned to' || colLower === 'owner' || colLower === 'assignee') mapping[col] = 'assignedTo';
    else if (colLower === 'notes' || colLower === 'comments' || colLower === 'description') mapping[col] = 'notes';
    else if (colLower === 'date created' || colLower === 'created date' || colLower === 'date' || colLower === 'created') mapping[col] = 'dateCreated';
    else if (colLower === 'city') mapping[col] = 'city';
    else if (colLower === 'country') mapping[col] = 'country';
    else if (colLower === 'address' || colLower === 'street address') mapping[col] = 'address';
    else if (colLower === 'website' || colLower === 'web' || colLower === 'url') mapping[col] = 'website';
    else if (colLower === 'industry' || colLower === 'sector') mapping[col] = 'industry';
    else if (colLower === 'area' || colLower === 'area name' || colLower === 'neighborhood') mapping[col] = 'areaName';
    else if (colLower === 'latitude' || colLower === 'lat') mapping[col] = 'lat';
    else if (colLower === 'longitude' || colLower === 'lng' || colLower === 'long') mapping[col] = 'lng';
    else if (colLower === 'linkedin') mapping[col] = 'linkedin';
    else if (colLower === 'twitter') mapping[col] = 'twitter';
    else if (colLower === 'facebook') mapping[col] = 'facebook';
    else if (colLower === 'instagram') mapping[col] = 'instagram';
  });
  
  columnMapping.value = mapping;
}

function getSampleData(column) {
  if (dataRows.value.length > 0 && dataRows.value[0][column] !== null) {
    const value = String(dataRows.value[0][column]);
    return value.length > 30 ? value.substring(0, 30) + '...' : value;
  }
  return 'No data';
}

function isFieldRequired(fieldValue) {
  const field = leadFields.value.find(f => f.value === fieldValue);
  return field ? field.required : false;
}

function getMappedValue(row, field) {
  // Find which column is mapped to this field
  for (const [col, mappedField] of Object.entries(columnMapping.value)) {
    if (mappedField === field) {
      return row[col] || '';
    }
  }
  return '';
}

function hasValidationError(row) {
  const name = getMappedValue(row, 'name');
  const email = getMappedValue(row, 'email');
  
  if (!name || !email) return true;
  if (!email.includes('@')) return true;
  
  return false;
}

function getPriorityClass(priority) {
  const p = String(priority).toLowerCase();
  if (p === 'hot') return 'bg-red-100 text-red-800';
  if (p === 'warm') return 'bg-yellow-100 text-yellow-800';
  return 'bg-blue-100 text-blue-800';
}

async function downloadTemplate() {
  try {
    const tenantId = getTenantId();
    if (!tenantId) {
      throw new Error('Tenant ID not found. Please log in again.');
    }
    await crmApi.downloadLeadTemplate(tenantId);
  } catch (error) {
    console.error('Template download error:', error);
    alert('Failed to download template: ' + (error.message || 'Unknown error'));
  }
}

async function processImport() {
  try {
    importing.value = true;
    const tenantId = getTenantId();
    
    // Filter out invalid and duplicate rows, and prepare data
    const validRows = editableRows.value.filter(row => row.isValid && !row.isDuplicate);
    
    // Build the data rows from mapped data
    const processRows = validRows.map(row => {
      const newRow = {};
      // Reconstruct original column structure with mapped values
      for (const [col, field] of Object.entries(columnMapping.value)) {
        newRow[col] = row.mappedData[field] || '';
      }
      return newRow;
    });
    
    const payload = {
      column_mapping: columnMapping.value,
      data_rows: processRows,
      skip_duplicates: false, // We already filtered duplicates
      branch_id: props.branchId || null
    };
    
    const result = await crmApi.processLeadsBulkUpload(payload, tenantId);
    
    importResults.value = result;
    currentStep.value = 4;
    
    // Emit imported event
    emit('imported', result);
  } catch (error) {
    console.error('Import processing error:', error);
    alert('Failed to process import: ' + (error.message || 'Unknown error'));
  } finally {
    importing.value = false;
  }
}

// Editable row functions
function isValidEmail(email) {
  if (!email) return true; // Email is optional
  return email.includes('@') && email.includes('.');
}

function validateRow(row) {
  const name = row.mappedData.name;
  const email = row.mappedData.email;
  const phone = row.mappedData.phone;
  
  // All fields optional, but email must be valid if provided
  // Row is valid if at least one field exists and email is valid (if provided)
  const hasData = !!(name || email || phone);
  const emailValid = !email || isValidEmail(email);
  
  row.isValid = hasData && emailValid;
}

// Get validation message for a row
function getValidationMessage(row) {
  const errors = [];
  
  const name = row.mappedData.name;
  const email = row.mappedData.email;
  const phone = row.mappedData.phone;
  
  if (!name && !email && !phone) {
    errors.push('At least one field (Name, Email, or Phone) is required');
  }
  if (email && !isValidEmail(email)) {
    errors.push('Invalid email format (must contain @ and .)');
  }
  
  return errors.length > 0 ? errors.join(', ') : 'Unknown error';
}

// Get CSS class for field with error highlighting
function getFieldErrorClass(row, fieldValue) {
  // Only highlight email if provided and invalid
  if (fieldValue === 'email' && row.mappedData.email) {
    if (!isValidEmail(row.mappedData.email)) {
      return 'border-red-300 bg-red-50';
    }
  }
  return '';
}

function deleteRow(index) {
  editableRows.value.splice(index, 1);
}

function deleteAllDuplicates() {
  if (confirm(`Are you sure you want to delete all ${duplicateCount.value} duplicate rows?`)) {
    editableRows.value = editableRows.value.filter(row => !row.isDuplicate);
  }
}

function deleteAllInvalid() {
  if (confirm(`Are you sure you want to delete all ${invalidCount.value} invalid rows?`)) {
    editableRows.value = editableRows.value.filter(row => row.isValid);
  }
}

function getRowClass(row) {
  if (row.isDuplicate) return 'bg-yellow-50';
  if (!row.isValid) return 'bg-red-50';
  return '';
}

async function checkDuplicates() {
  try {
    checkingDuplicates.value = true;
    const tenantId = getTenantId();
    
    // Get all leads from backend to check duplicates
    const branchParam = props.branchId ? `&branch_id=${encodeURIComponent(props.branchId)}` : '';
    const response = await fetch(`${API_BASE_URL}/crm/leads?tenant_id=${tenantId}${branchParam}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch existing leads');
    
    const existingLeads = await response.json();
    
    // Mark duplicates - must match ALL THREE: name, email, AND phone
    editableRows.value.forEach(row => {
      const name = (row.mappedData.name || '').toLowerCase().trim();
      const email = (row.mappedData.email || '').toLowerCase().trim();
      const phone = (row.mappedData.phone || '').toLowerCase().trim();
      
      // Only check for duplicates if all three fields are present
      if (name && email && phone) {
        const duplicate = existingLeads.some(lead => {
          const leadName = (lead.name || '').toLowerCase().trim();
          const leadEmail = (lead.email || '').toLowerCase().trim();
          const leadPhone = (lead.phone || '').toLowerCase().trim();
          
          // All three must match for duplicate
          return leadName === name && leadEmail === email && leadPhone === phone;
        });
        row.isDuplicate = duplicate;
      } else {
        // If any field is missing, cannot determine duplicate
        row.isDuplicate = false;
      }
    });
  } catch (error) {
    console.error('Duplicate check error:', error);
    alert('Failed to check duplicates: ' + (error.message || 'Unknown error'));
  } finally {
    checkingDuplicates.value = false;
  }
}

function nextStep() {
  if (currentStep.value === 2) {
    // Validate mapping before proceeding
    if (mappingWarnings.value.length > 0) {
      if (!confirm('Required fields are not mapped. Do you want to continue anyway?')) {
        return;
      }
    }
    
    // Prepare editable rows with mapped data
    editableRows.value = dataRows.value.map((row, index) => {
      const mappedData = {};
      
      // Map all fields
      for (const [col, field] of Object.entries(columnMapping.value)) {
        mappedData[field] = row[col] || '';
      }
      
      // Ensure priority has a default
      if (!mappedData.priority) {
        mappedData.priority = 'cold';
      }
      
      // Create editable row object
      const editableRow = {
        originalIndex: index,
        mappedData: mappedData,
        isValid: false,
        isDuplicate: false
      };
      
      // Validate the row
      validateRow(editableRow);
      
      return editableRow;
    });
  }
  
  currentStep.value++;
}

function previousStep() {
  currentStep.value--;
}

function close() {
  emit('update:modelValue', false);
  // Reset state
  setTimeout(() => {
    currentStep.value = 1;
    selectedFile.value = null;
    detectedColumns.value = [];
    dataRows.value = [];
    columnMapping.value = {};
    previewData.value = [];
    editableRows.value = [];
    importResults.value = {};
    checkingDuplicates.value = false;
  }, 300);
}

// Watch for auto-mapping when step 2 is reached
watch(currentStep, (newVal) => {
  if (newVal === 2 && Object.keys(columnMapping.value).length === 0) {
    autoMapColumns();
  }
});
</script>

<style scoped>
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}
</style>
