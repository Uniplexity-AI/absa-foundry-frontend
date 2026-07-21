<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100000] p-4">
      <div class="bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-4xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200 relative">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]"></div>
        
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 z-10 bg-white">
          <div class="flex items-center gap-3">
            <div class="w-1 h-5 bg-[#2F2E8B]"></div>
            <div>
              <p class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]">Bulk Import // Accounts</p>
              <h3 class="text-base font-black text-gray-900 uppercase tracking-tight">Bulk Upload Accounts</h3>
            </div>
          </div>
          <button @click="close" class="w-8 h-8 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-500 transition-all">
            <X :size="16" />
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 space-y-5">
          <!-- Step 1: File Upload -->
          <div v-if="currentStep === 1" class="space-y-5">
            <div class="flex items-center justify-between">
              <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Step 1: Upload File</h4>
              <button @click="downloadTemplate" class="px-3 py-1.5 border border-gray-200 text-gray-500 hover:text-[#2F2E8B] hover:border-[#2F2E8B] text-[8px] font-mono font-black uppercase tracking-widest transition flex items-center gap-1.5">
                <Download :size="11" /> Template
              </button>
            </div>
            <div @drop.prevent="handleFileDrop" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false"
              :class="dragOver ? 'border-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-200 bg-gray-50/30'"
              class="border border-dashed p-10 text-center transition relative">
              <input ref="fileInput" type="file" @change="handleFileSelect" accept=".xlsx,.xls,.csv" class="hidden" />
              <div v-if="!selectedFile" class="space-y-3">
                <Upload :size="28" class="mx-auto text-gray-300" />
                <p class="text-[10px] font-mono font-bold text-gray-600 uppercase">Drop file or <button @click="$refs.fileInput.click()" class="text-[#2F2E8B] underline">browse</button></p>
                <p class="text-[8px] font-mono text-gray-400">.XLSX, .XLS, .CSV</p>
              </div>
              <div v-else class="space-y-3">
                <FileSpreadsheet :size="32" class="mx-auto text-emerald-600" />
                <p class="text-[10px] font-mono font-bold text-gray-800">{{ selectedFile.name }}</p>
                <div class="flex gap-3 justify-center">
                  <button @click="processFile" :disabled="processing" class="px-5 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-1.5">
                    <Loader2 v-if="processing" :size="11" class="animate-spin" /> {{ processing ? 'Processing...' : 'Process File' }}
                  </button>
                  <button @click="selectedFile = null" class="px-4 py-2 border border-gray-200 text-gray-400 text-[8px] font-mono font-black uppercase tracking-widest hover:border-red-500 hover:text-red-500 transition">Remove</button>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 border border-gray-100 p-4 space-y-1.5">
              <p class="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">Tips</p>
              <p class="text-[8px] font-mono text-gray-500">• Download template for correct format</p>
              <p class="text-[8px] font-mono text-gray-500">• Required: Name, Email (for dedup)</p>
              <p class="text-[8px] font-mono text-gray-500">• Duplicates are skipped automatically</p>
            </div>
          </div>

          <!-- Step 2: Column Mapping -->
          <div v-if="currentStep === 2" class="space-y-5">
            <div class="flex items-center justify-between">
              <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Step 2: Column Mapping</h4>
              <button @click="autoMapColumns" class="px-3 py-1.5 bg-gray-900 text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-black transition flex items-center gap-1.5">
                <Wand2 :size="11" /> Auto Map
              </button>
            </div>
            <div class="border border-gray-200 overflow-hidden">
              <table class="w-full text-[8px] font-mono">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="px-3 py-2 text-left font-black text-gray-500 uppercase tracking-widest">Source Column</th>
                    <th class="px-3 py-2 text-left font-black text-gray-500 uppercase tracking-widest">Sample Data</th>
                    <th class="px-3 py-2 text-left font-black text-gray-500 uppercase tracking-widest">Map To Field</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(col, i) in parsedColumns" :key="i" class="border-b border-gray-100 hover:bg-gray-50/50">
                    <td class="px-3 py-2 font-bold text-gray-800">{{ col.name }}</td>
                    <td class="px-3 py-2 text-gray-500 truncate max-w-[200px]">{{ col.sample }}</td>
                    <td class="px-3 py-2">
                      <select v-model="col.field" class="w-full border border-gray-200 px-2 py-1 text-[8px] font-mono font-bold uppercase tracking-widest focus:outline-none focus:border-[#2F2E8B] bg-white">
                        <option value="">— Skip —</option>
                        <option v-for="f in accountFields" :key="f.value" :value="f.value">{{ f.label }}</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bg-blue-50 border border-blue-100 p-3 flex items-center gap-2">
              <Info :size="12" class="text-blue-500 shrink-0" />
              <p class="text-[8px] font-mono text-blue-700">Name and Email fields are used for duplicate detection.</p>
            </div>
          </div>

          <!-- Step 3: Preview & Import -->
          <div v-if="currentStep === 3" class="space-y-5">
            <div class="flex items-center justify-between">
              <h4 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest">Step 3: Preview ({{ previewData.length }} records)</h4>
              <div class="flex items-center gap-2">
                <span class="text-[8px] font-mono font-bold text-green-600">{{ importStats.new }} New</span>
                <span class="text-[8px] font-mono font-bold text-amber-600">{{ importStats.skip }} Duplicates</span>
                <span class="text-[8px] font-mono font-bold text-red-600">{{ importStats.errors }} Errors</span>
              </div>
            </div>
            <div class="border border-gray-200 overflow-x-auto max-h-60 overflow-y-auto">
              <table class="w-full text-[8px] font-mono">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <th class="px-2 py-1.5 text-left font-black text-gray-500 uppercase" v-for="h in previewHeaders" :key="h">{{ h }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, i) in previewData" :key="i" class="border-b border-gray-100"
                    :class="row._dup ? 'bg-amber-50' : row._err ? 'bg-red-50' : ''">
                    <td class="px-2 py-1 text-gray-700" v-for="h in previewHeaders" :key="h">{{ row[h] || '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Step 4: Results -->
          <div v-if="currentStep === 4" class="text-center py-12 space-y-4">
            <CheckCircle :size="48" class="mx-auto text-emerald-500" />
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight">Import Complete</h3>
            <div class="flex justify-center gap-8">
              <div><p class="text-2xl font-black text-green-600">{{ importStats.new }}</p><p class="text-[8px] font-mono text-gray-500">Imported</p></div>
              <div><p class="text-2xl font-black text-amber-600">{{ importStats.skip }}</p><p class="text-[8px] font-mono text-gray-500">Duplicates Skipped</p></div>
              <div><p class="text-2xl font-black text-red-600">{{ importStats.errors }}</p><p class="text-[8px] font-mono text-gray-500">Errors</p></div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between sticky bottom-0 z-10">
          <div>
            <span v-if="currentStep === 1" class="text-[8px] font-mono text-gray-400">Upload a spreadsheet to begin</span>
            <span v-else-if="currentStep === 2" class="text-[8px] font-mono text-gray-400">Map columns to account fields</span>
            <span v-else-if="currentStep === 3" class="text-[8px] font-mono text-gray-400">Review and confirm import</span>
            <span v-else class="text-[8px] font-mono text-gray-400">Import completed</span>
          </div>
          <div class="flex items-center gap-2">
            <button v-if="currentStep < 4" @click="close" class="px-4 py-2 border border-gray-200 text-gray-500 hover:text-gray-700 text-[8px] font-mono font-black uppercase tracking-widest transition">Cancel</button>
            <button v-if="currentStep === 2" @click="currentStep = 3; buildPreview()" class="px-5 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition">Preview</button>
            <button v-if="currentStep === 3" @click="executeImport" :disabled="importing" class="px-5 py-2 bg-green-600 text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-green-700 transition flex items-center gap-1.5">
              <Loader2 v-if="importing" :size="11" class="animate-spin" /> {{ importing ? 'Importing...' : 'Import All' }}
            </button>
            <button v-if="currentStep === 4" @click="close" class="px-5 py-2 bg-[#2F2E8B] text-white text-[8px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition">Done</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { X, Upload, Download, FileSpreadsheet, CheckCircle, Loader2, Info, Wand2, AlertTriangle } from 'lucide-vue-next';
import { decodeJWT } from '@/services/decodeJWT.js';
import * as crmApi from '@/services/crm_api.js';
import { XLSXCompat as XLSX } from '@/utils/excel.js';

const { getTenantId } = decodeJWT();

const props = defineProps({ modelValue: Boolean, branchId: { type: String, default: '' } });
const emit = defineEmits(['update:modelValue', 'imported']);

const currentStep = ref(1);
const selectedFile = ref(null);
const dragOver = ref(false);
const processing = ref(false);
const importing = ref(false);
const fileInput = ref(null);
const parsedColumns = ref([]);
const rawRows = ref([]);
const previewData = ref([]);
const previewHeaders = ref([]);
const importStats = ref({ new: 0, skip: 0, errors: 0 });

const accountFields = [
  { value: 'name', label: 'Account Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'industry', label: 'Industry' },
  { value: 'website', label: 'Website' },
  { value: 'billing_city', label: 'City' },
  { value: 'billing_country', label: 'Country' },
  { value: 'billing_address', label: 'Address' },
  { value: 'tpin', label: 'TPIN' },
  { value: 'description', label: 'Description' },
  { value: 'assigned_to', label: 'Assigned To' },
  { value: 'status', label: 'Status' }
];

function close() { emit('update:modelValue', false); setTimeout(() => { currentStep.value = 1; selectedFile.value = null; parsedColumns.value = []; rawRows.value = []; previewData.value = []; importStats.value = { new: 0, skip: 0, errors: 0 }; }, 300); }

function downloadTemplate() {
  const ws = XLSX.utils.json_to_sheet([
    { Name: 'Example Pharmacy', Email: 'pharmacy@example.com', Phone: '260971234567', Industry: 'Healthcare', City: 'Lusaka', Country: 'Zambia', Address: '123 Main St', TPIN: '1234567890', Description: 'Retail pharmacy', Status: 'active' }
  ]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Accounts');
  XLSX.writeFile(wb, 'accounts_import_template.xlsx');
}

function handleFileDrop(e) { dragOver.value = false; const f = e.dataTransfer.files[0]; if (f) selectedFile.value = f; }
function handleFileSelect(e) { const f = e.target.files[0]; if (f) selectedFile.value = f; }

async function processFile() {
  if (!selectedFile.value) return;
  processing.value = true;
  try {
    const buf = await selectedFile.value.arrayBuffer();
    const wb = await XLSX.read(buf, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
    rawRows.value = json;
    if (json.length === 0) { alert('No data found in file.'); processing.value = false; return; }
    
    const cols = Object.keys(json[0]);
    parsedColumns.value = cols.map((c, i) => {
      const lower = c.toLowerCase();
      const match = accountFields.find(f => lower.includes(f.value.replace(/_/g, '')) || lower.includes(f.label.toLowerCase().replace(/ /g, '')));
      return { name: c, sample: String(json[0][c] || '').substring(0, 50), field: match ? match.value : '' };
    });
    currentStep.value = 2;
  } catch (e) { console.error(e); alert('Failed to parse file. Ensure it is a valid .xlsx or .csv.'); }
  finally { processing.value = false; }
}

function autoMapColumns() {
  parsedColumns.value.forEach(col => {
    if (col.field) return;
    const lower = col.name.toLowerCase();
    const match = accountFields.find(f => lower.includes(f.value.replace(/_/g, '')) || lower.includes(f.label.toLowerCase().replace(/ /g, '')));
    if (match) col.field = match.value;
  });
}

async function checkDuplicates(field, value, tenantId) {
  if (!value) return false;
  try {
    const existing = await crmApi.getAccounts(tenantId, { [field]: value, per_page: 1 });
    const items = existing?.items || existing?.data || existing || [];
    return Array.isArray(items) ? items.length > 0 : !!items;
  } catch { return false; }
}

function buildPreview() {
  const mapped = parsedColumns.value.filter(c => c.field).map(c => c.field);
  const headers = [...new Set(mapped)];
  previewHeaders.value = ['_status', ...headers];
  
  const data = rawRows.value.map(row => {
    const obj = { _status: 'NEW', _dup: false, _err: false };
    parsedColumns.value.forEach(col => {
      if (col.field) obj[col.field] = String(row[col.name] || '').trim();
    });
    return obj;
  });
  previewData.value = data;
}

async function executeImport() {
  importing.value = true;
  const tenantId = getTenantId();
  let newCount = 0, skipCount = 0, errCount = 0;
  
  for (const row of previewData.value) {
    try {
      const name = row.name || '';
      const email = row.email || '';
      
      // Duplicate check by email or name
      if (email) {
        const dup = await checkDuplicates('email', email, tenantId);
        if (dup) { row._status = 'SKIP (Duplicate Email)'; row._dup = true; skipCount++; continue; }
      }
      if (name) {
        const dup = await checkDuplicates('name', name, tenantId);
        if (dup) { row._status = 'SKIP (Duplicate Name)'; row._dup = true; skipCount++; continue; }
      }
      
      const payload = {
        tenant_id: tenantId,
        name, email: row.email || '',
        phone: row.phone || '', industry: row.industry || '',
        billing_city: row.billing_city || '', billing_country: row.billing_country || '',
        billing_address: row.billing_address || '', website: row.website || '',
        tpin: row.tpin || '', description: row.description || '',
        status: row.status || 'active', branch_id: props.branchId || undefined
      };
      await crmApi.createAccount(payload);
      row._status = 'IMPORTED';
      newCount++;
    } catch (e) {
      row._status = 'ERROR: ' + (e?.response?.data?.detail || e.message || 'Unknown');
      row._err = true;
      errCount++;
    }
  }
  
  importStats.value = { new: newCount, skip: skipCount, errors: errCount };
  currentStep.value = 4;
  importing.value = false;
  emit('imported');
}
</script>
