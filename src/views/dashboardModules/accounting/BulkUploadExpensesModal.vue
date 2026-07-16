<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-7xl overflow-hidden animate-scale-in max-h-[95vh] flex flex-col">
      <!-- Header -->
      <div class="bg-gradient-to-r from-[#2F2E8B] to-[#3D2F88] p-6 flex-shrink-0">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <i class="fas fa-file-invoice-dollar text-white text-xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Bulk Upload Expenses</h3>
              <p class="text-sm text-white text-opacity-90">Import multiple expenses from Excel, CSV or PDF</p>
            </div>
          </div>
          <button @click="close" class="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Step 1: File Upload -->
        <div v-if="currentStep === 1" class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-bold text-gray-900">Step 1: Upload File</h4>
          </div>

          <!-- File Upload Area -->
          <div
            @drop.prevent="handleFileDrop"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            :class="dragOver ? 'border-[#2F2E8B] bg-[#E8E8F5]' : 'border-gray-300'"
            class="border-2 border-dashed rounded-xl p-12 text-center transition-all"
          >
            <input
              ref="fileInput"
              type="file"
              @change="handleFileSelect"
              accept=".xlsx,.xls,.csv,.pdf"
              class="hidden"
            />
            
            <div v-if="!selectedFile">
              <i class="fas fa-cloud-upload text-6xl text-gray-400 mb-4"></i>
              <p class="text-lg font-semibold text-gray-700 mb-2">Drag & drop your file here</p>
              <p class="text-sm text-gray-500 mb-4">or</p>
              <button
                @click="$refs.fileInput.click()"
                class="px-6 py-3 bg-[#2F2E8B] text-white font-bold rounded-lg hover:bg-[#3D2F88] transition"
              >
                Browse Files
              </button>
              <p class="text-xs text-gray-500 mt-4">Supported formats: Excel (.xlsx, .xls), CSV (.csv) or PDF (.pdf)</p>
            </div>

            <div v-else class="space-y-4">
              <i :class="getFileIconClass(selectedFile.name)" class="text-6xl mb-2"></i>
              <p class="text-lg font-semibold text-gray-900">{{ selectedFile.name }}</p>
              <p class="text-sm text-gray-600">{{ formatFileSize(selectedFile.size) }}</p>
              <div class="flex gap-2 justify-center mt-4">
                <button
                  @click="uploadFile"
                  :disabled="uploading"
                  class="px-6 py-2 bg-[#2F2E8B] text-white font-bold rounded-lg hover:bg-[#3D2F88] transition disabled:opacity-50"
                >
                  <i v-if="uploading" class="fas fa-spinner fa-spin mr-2"></i>
                  {{ uploading ? 'Processing...' : 'Continue' }}
                </button>
                <button
                  @click="selectedFile = null"
                  class="px-6 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition"
                >
                  Change File
                </button>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg p-4">
            <div class="flex items-start gap-3">
              <i class="fas fa-info-circle text-[#2F2E8B] mt-1"></i>
              <div class="text-sm text-[#1F2937]">
                <p class="font-semibold mb-2">Tips for successful import:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Ensure your file has clear headers</li>
                  <li>Required fields: <strong>Name</strong>, <strong>Amount</strong>, and <strong>Date</strong></li>
                  <li>For PDF files, the system will attempt to extract text automatically</li>
                  <li>Branch ID is optional and defaults to your current branch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Column Mapping -->
        <div v-if="currentStep === 2" class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-lg font-bold text-gray-900">Step 2: Map Columns</h4>
              <p class="text-sm text-gray-600">Match your file columns to expense fields</p>
            </div>
            <button
              @click="autoMapColumns"
              class="px-4 py-2 bg-[#2F2E8B] text-white rounded-lg hover:bg-[#3D2F88] transition flex items-center gap-2"
            >
              <i class="fas fa-magic"></i>
              <span>Auto-Map Columns</span>
            </button>
          </div>

          <!-- Column Mapping Table -->
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="overflow-x-auto max-h-[400px] overflow-y-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 sticky top-0">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Your Column</th>
                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Sample Data</th>
                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Map to Expense Field</th>
                    <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Required</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="column in detectedColumns" :key="column" class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ column }}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">
                      {{ getSampleData(column) }}
                    </td>
                    <td class="px-6 py-4">
                      <select
                        v-model="columnMapping[column]"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent text-sm"
                      >
                        <option value="">-- Skip this column --</option>
                        <option v-for="field in expenseFields" :key="field.value" :value="field.value">
                          {{ field.label }}
                        </option>
                      </select>
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <span
                        v-if="isFieldRequired(columnMapping[column])"
                        class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold"
                      >
                        Required
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Step 3: Preview & Edit -->
        <div v-if="currentStep === 3" class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-lg font-bold text-gray-900">Step 3: Preview & Edit</h4>
              <p class="text-sm text-gray-600">Review and edit expenses before final import</p>
            </div>
          </div>

          <!-- Editable Preview Table -->
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="overflow-x-auto max-h-[450px] overflow-y-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase w-12">#</th>
                    <th 
                      v-for="field in mappedFieldsList" 
                      :key="field.value"
                      class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase whitespace-nowrap"
                    >
                      {{ field.label }}
                      <span v-if="field.required" class="text-red-600">*</span>
                    </th>
                    <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase w-28">Status</th>
                    <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase w-24">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    v-for="(row, idx) in editableRows" 
                    :key="idx" 
                    :class="!row.isValid ? 'bg-red-50' : ''"
                    class="hover:bg-opacity-80 transition"
                  >
                    <td class="px-3 py-2 text-sm text-gray-600 font-medium">{{ idx + 1 }}</td>
                    
                    <td 
                      v-for="field in mappedFieldsList" 
                      :key="field.value"
                      class="px-3 py-2"
                    >
                      <input
                        v-if="field.value === 'expense_date'"
                        v-model="row.mappedData[field.value]"
                        type="date"
                        @change="validateRow(row)"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#2F2E8B]"
                      />
                      <select
                        v-else-if="field.value === 'category'"
                        v-model="row.mappedData[field.value]"
                        @change="validateRow(row)"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#2F2E8B]"
                      >
                        <optgroup v-for="group in categoryGroups" :key="group.code" :label="group.label">
                          <option v-for="sub in group.children" :key="sub.code" :value="sub.label">{{ sub.code }} — {{ sub.label }}</option>
                        </optgroup>
                      </select>
                      <input
                        v-else
                        v-model="row.mappedData[field.value]"
                        @input="validateRow(row)"
                        :type="field.value === 'amount' ? 'number' : 'text'"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-[#2F2E8B]"
                        :class="field.required && !row.mappedData[field.value] ? 'border-red-300' : ''"
                      />
                    </td>
                    
                    <td class="px-3 py-2 text-sm">
                      <div v-if="!row.isValid" class="flex flex-col items-start gap-1">
                        <div class="flex items-center gap-1">
                          <i class="fas fa-exclamation-circle text-red-600"></i>
                          <span class="text-xs text-red-700 font-semibold">Invalid</span>
                        </div>
                        <span class="text-[10px] text-red-600 leading-tight">Missing required fields</span>
                      </div>
                      <div v-else class="flex flex-col items-start gap-1">
                        <div class="flex items-center gap-1">
                          <i class="fas fa-check-circle text-[#059669]"></i>
                          <span class="text-xs text-[#059669] font-semibold">Valid</span>
                        </div>
                      </div>
                    </td>
                    
                    <td class="px-3 py-2">
                      <button
                        @click="deleteRow(idx)"
                        class="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-medium"
                      >
                        <i class="fas fa-trash mr-1"></i>Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="editableRows.length === 0" class="p-8 text-center text-gray-500">
              <i class="fas fa-inbox text-4xl mb-2"></i>
              <p>No rows to display.</p>
            </div>
          </div>

          <!-- Summary Stats -->
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p class="text-xs text-blue-600 font-medium">Valid Expenses</p>
              <p class="text-2xl font-bold text-blue-900">{{ validRowCount }}</p>
            </div>
            <div class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-xs text-red-600 font-medium">Invalid</p>
              <p class="text-2xl font-bold text-red-900">{{ invalidCount }}</p>
            </div>
          </div>
        </div>

        <!-- Step 4: Results -->
        <div v-if="currentStep === 4" class="space-y-4 text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-check text-4xl text-[#059669]"></i>
          </div>
          <h4 class="text-2xl font-bold text-gray-900 mb-2">Import Complete!</h4>
          <p class="text-gray-600">Your expenses have been processed successfully</p>

          <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
            <div class="bg-green-50 border border-green-200 rounded-lg p-6">
              <p class="text-3xl font-bold text-green-900">{{ importResults.success }}</p>
              <p class="text-sm text-green-700 font-medium">Imported</p>
            </div>
            <div class="bg-red-50 border border-red-200 rounded-lg p-6">
              <p class="text-3xl font-bold text-red-900">{{ importResults.failed }}</p>
              <p class="text-sm text-red-700 font-medium">Failed</p>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p class="text-3xl font-bold text-blue-900">{{ importResults.total }}</p>
              <p class="text-sm text-blue-700 font-medium">Total</p>
            </div>
          </div>

          <div v-if="importResults.errors?.length" class="mt-6 text-left max-w-2xl mx-auto bg-red-50 p-4 rounded-lg">
            <p class="font-bold text-red-800 mb-2">Errors encountered:</p>
            <ul class="text-sm text-red-700 list-disc list-inside">
              <li v-for="(err, i) in importResults.errors.slice(0, 5)" :key="i">{{ err }}</li>
              <li v-if="importResults.errors.length > 5">And {{ importResults.errors.length - 5 }} more...</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t flex-shrink-0">
        <div class="text-sm text-gray-600">
          Step {{ currentStep }} of 4
        </div>
        <div class="flex gap-3">
          <button
            v-if="currentStep > 1 && currentStep < 4"
            @click="currentStep--"
            class="px-6 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Back
          </button>
          
          <button
            v-if="currentStep === 2"
            @click="preparePreview"
            class="px-6 py-2 bg-[#2F2E8B] text-white font-bold rounded-lg hover:bg-[#3D2F88]"
          >
            Continue
          </button>

          <button
            v-if="currentStep === 3"
            @click="processImport"
            :disabled="importing || validRowCount === 0"
            class="px-6 py-2 bg-[#059669] text-white font-bold rounded-lg hover:bg-[#047857] disabled:opacity-50"
          >
            <i v-if="importing" class="fas fa-spinner fa-spin mr-2"></i>
            Import {{ validRowCount }} Expenses
          </button>

          <button
            v-if="currentStep === 4"
            @click="close"
            class="px-6 py-2 bg-[#2F2E8B] text-white font-bold rounded-lg hover:bg-[#3D2F88]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useExpenses } from '@/views/dashboardModules/functions/useExpenses.js';
import { useAudit } from '@/config/useAudit.js';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'imported']);

const { uploadBulkFile, processBulkImport, categories, categoryGroups } = useExpenses();
const { logAudit } = useAudit();

// State
const currentStep = ref(1);
const selectedFile = ref(null);
const dragOver = ref(false);
const uploading = ref(false);
const importing = ref(false);

const detectedColumns = ref([]);
const dataRows = ref([]);
const columnMapping = ref({});
const editableRows = ref([]);
const importResults = ref({});

const expenseFields = [
  { label: 'Expense Name', value: 'name', required: true },
  { label: 'Amount', value: 'amount', required: true },
  { label: 'Category', value: 'category', required: true },
  { label: 'Date', value: 'expense_date', required: true },
  { label: 'Description', value: 'description', required: false },
  { label: 'Branch ID', value: 'branch_id', required: false }
];

// Computed
const mappedFieldsList = computed(() => {
  const mappedFieldValues = Object.values(columnMapping.value);
  return expenseFields.filter(field => mappedFieldValues.includes(field.value));
});

const validRowCount = computed(() => editableRows.value.filter(r => r.isValid).length);
const invalidCount = computed(() => editableRows.value.filter(r => !r.isValid).length);

// Methods
const close = () => {
  emit('update:modelValue', false);
  // Reset state
  currentStep.value = 1;
  selectedFile.value = null;
};

const handleFileDrop = (e) => {
  dragOver.value = false;
  if (e.dataTransfer.files.length) selectedFile.value = e.dataTransfer.files[0];
};

const handleFileSelect = (e) => {
  if (e.target.files.length) selectedFile.value = e.target.files[0];
};

const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB'][i];
};

const getFileIconClass = (name) => {
  if (name.endsWith('.pdf')) return 'fas fa-file-pdf text-[#DC2626]';
  return 'fas fa-file-excel text-[#059669]';
};

const uploadFile = async () => {
  try {
    uploading.value = true;
    const res = await uploadBulkFile(selectedFile.value);
    
    detectedColumns.value = res.detected_columns;
    dataRows.value = res.data_rows;
    
    // Reset mapping
    columnMapping.value = {};
    autoMapColumns();
    
    currentStep.value = 2;
  } catch (err) {
    alert(err.message);
  } finally {
    uploading.value = false;
  }
};

const autoMapColumns = () => {
  detectedColumns.value.forEach(col => {
    const low = col.toLowerCase();
    if (low.includes('name') || low.includes('expense') || low.includes('item')) columnMapping.value[col] = 'name';
    else if (low.includes('amount') || low.includes('price') || low.includes('cost') || low.includes('value')) columnMapping.value[col] = 'amount';
    else if (low.includes('category') || low.includes('type')) columnMapping.value[col] = 'category';
    else if (low.includes('date') || low.includes('day') || low.includes('time')) columnMapping.value[col] = 'expense_date';
    else if (low.includes('desc')) columnMapping.value[col] = 'description';
    else if (low.includes('branch')) columnMapping.value[col] = 'branch_id';
  });
};

const getSampleData = (col) => dataRows.value[0]?.[col] || 'N/A';
const isFieldRequired = (val) => expenseFields.find(f => f.value === val)?.required || false;

const preparePreview = () => {
  editableRows.value = dataRows.value.map(row => {
    const mappedData = {};
    Object.entries(columnMapping.value).forEach(([col, field]) => {
      if (field) mappedData[field] = row[col];
    });
    
    // Fill defaults
    if (!mappedData.category) mappedData.category = 'Other';
    if (!mappedData.expense_date) mappedData.expense_date = new Date().toISOString().split('T')[0];
    
    const rowObj = { mappedData, isValid: true };
    validateRow(rowObj);
    return rowObj;
  });
  currentStep.value = 3;
};

const validateRow = (row) => {
  const data = row.mappedData;
  row.isValid = !!(data.name && data.amount && data.expense_date && data.category);
};

const deleteRow = (idx) => editableRows.value.splice(idx, 1);

const processImport = async () => {
  try {
    importing.value = true;
    const processRows = editableRows.value.filter(r => r.isValid).map(r => {
      const row = {};
      Object.entries(columnMapping.value).forEach(([col, field]) => {
        if (field) row[col] = r.mappedData[field];
      });
      return row;
    });

    const res = await processBulkImport({
      column_mapping: columnMapping.value,
      data_rows: processRows
    });

    importResults.value = res;
    currentStep.value = 4;
    await logAudit('import', 'expenses', {
      resource_type: 'bulk_import',
      total: res.total,
      success: res.success,
      failed: res.failed
    });
    emit('imported');
  } catch (err) {
    alert(err.message);
  } finally {
    importing.value = false;
  }
};
</script>

<style scoped>
.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
