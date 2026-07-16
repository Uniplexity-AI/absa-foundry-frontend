<template>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] flex flex-col">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-[#2F2E8B]">Create Quotation</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <!-- Content -->
      <div class="p-4 md:p-6 overflow-y-auto flex-1">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <!-- Client Information -->
          <div>
             <h3 class="text-lg font-semibold text-gray-800 mb-4">Client Information</h3>
            
            <!-- CRM Linking -->
            <div class="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-700">Link to CRM (Optional)</h4>
                <i class="fas fa-link text-[#2F2E8B]"></i>
              </div>
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">Link To</label>
                  <select v-model="quotationForm.linkedToType" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] text-sm py-2">
                    <option value="">None</option>
                    <option value="lead">Lead</option>
                    <option value="contact">Contact</option>
                    <option value="account">Account</option>
                    <option value="deal">Deal</option>
                  </select>
                </div>
                <div>
                   <div class="flex justify-between">
                     <label class="block text-xs font-medium text-gray-600 mb-1">Select Record</label>
                     <span v-if="loadingCrmRecords" class="text-xs text-[#2F2E8B] animate-pulse">Loading...</span>
                   </div>
                   <select 
                     v-model="quotationForm.linkedToId" 
                     :disabled="!quotationForm.linkedToType || loadingCrmRecords"
                     class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] text-sm py-2 disabled:bg-gray-100 disabled:cursor-not-allowed" 
                   >
                     <option value="">Select {{ quotationForm.linkedToType ? quotationForm.linkedToType.charAt(0).toUpperCase() + quotationForm.linkedToType.slice(1) : 'Record' }}</option>
                     <option v-for="rec in crmRecords" :key="rec.id || rec._id" :value="rec.id || rec._id">
                       {{ rec.name || rec.title || (rec.firstName ? `${rec.firstName} ${rec.lastName}` : 'Unknown') }}
                     </option>
                   </select>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                <input v-model="quotationForm.clientName" required type="text" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Client TPIN</label>
                  <input v-model="quotationForm.clientTpin" type="text" placeholder="Client Tax ID" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Company TPIN</label>
                  <input v-model="quotationForm.companyTpin" type="text" placeholder="Your Tax ID" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input v-model="quotationForm.clientEmail" required type="email" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input v-model="quotationForm.clientPhone" type="tel" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea v-model="quotationForm.clientAddress" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] h-24 resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- Quotation Details -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Quotation Details</h3>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Quotation Number</label>
                <div class="flex gap-2">
                  <input v-model="quotationForm.quotationNumber" required type="text" class="flex-1 rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                  <button 
                    type="button" 
                    @click="generateQuotationNumber" 
                    :disabled="isGeneratingNumber"
                    class="px-3 py-2 bg-gray-50 text-[#2F2E8B] border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-xs font-semibold whitespace-nowrap flex items-center gap-1 disabled:opacity-50"
                  >
                    <i v-if="isGeneratingNumber" class="fas fa-spinner animate-spin"></i>
                    <i v-else class="fas fa-magic"></i>
                    Generate
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input v-model="quotationForm.date" required type="date" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Valid Until *</label>
                <input v-model="quotationForm.validUntil" required type="date" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select v-model="quotationForm.status" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]">
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Line Items -->
        <div class="mt-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-800">Quoted Items</h3>
          </div>
          
          <!-- Items List (Vertical) -->
          <div class="space-y-3">
            <div v-for="(item, idx) in quotationForm.items" :key="idx" class="border border-[#F1F1F1] rounded-lg p-4 bg-[#FAFAFA]">
              <div class="flex justify-between items-start mb-3">
                <span class="text-sm font-medium text-[#6B7280]">Item {{ idx + 1 }}</span>
                <button @click="removeLineItem(idx)" type="button" class="px-3 py-1 bg-[#DC2626] text-white text-sm rounded hover:bg-[#9B1C1C]" :disabled="quotationForm.items.length <= 1">
                  Remove
                </button>
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-[#4B5563] mb-1">Description</label>
                  <input v-model="item.description" type="text" placeholder="Item description..." class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] text-sm p-2" />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-sm font-medium text-[#4B5563] mb-1">Quantity</label>
                    <input v-model.number="item.quantity" type="number" min="1" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] text-sm p-2" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#4B5563] mb-1">Unit Price</label>
                    <input v-model.number="item.unitPrice" type="number" min="0" step="0.01" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] text-sm p-2" />
                  </div>
                </div>
                <div class="text-right text-sm text-[#6B7280]">
                  Line Total: <span class="font-semibold text-[#1F2937]">{{ formatWithSymbol(item.quantity * item.unitPrice || 0) }}</span>
                </div>
              </div>
            </div>
            <button @click="addLineItem" type="button" class="w-full px-3 py-2 bg-[#2F2E8B] text-white rounded-lg hover:bg-[#3D2F88] flex items-center justify-center gap-2 text-sm">
              <span>+</span> Add Item
            </button>
          </div>

          <!-- Tax Type Selector and Totals -->
          <div class="mt-6">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Tax Type</label>
              <select v-model="quotationForm.taxType" class="w-full sm:w-64 rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] px-3 py-2 text-sm">
                <option v-for="taxOption in taxTypes" :key="taxOption.value" :value="taxOption.value">
                  {{ taxOption.label }}
                </option>
              </select>
              <p v-if="quotationForm.taxType === 'turnover' && subtotal < 12000" class="text-xs text-amber-600 mt-1">
                <i class="fas fa-info-circle"></i> Turnover tax applies to amounts ≥ K12,000. Current subtotal: {{ formatWithSymbol(subtotal) }}
              </p>
            </div>
            <div class="flex justify-end">
              <div class="bg-gray-50 p-4 rounded-lg w-80">
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{{ formatWithSymbol(subtotal) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span>{{ taxLabel }} ({{ (taxRate * 100).toFixed(0) }}%):</span>
                    <span>{{ formatWithSymbol(tax) }}</span>
                  </div>
                  <div class="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{{ formatWithSymbol(total) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="mt-8">
                <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea v-model="quotationForm.notes" placeholder="Additional notes or terms..." class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] h-24 resize-none"></textarea>
                <AIEnhanceButton 
                  v-model="quotationForm.notes" 
                  context="invoice_notes"
                  tooltip="Use AI to improve quotation notes"
                />
              </div>

              <!-- Payment Details -->
              <div class="mt-6">
                <h4 class="text-sm font-semibold text-gray-800 mb-2">Payment Details (optional)</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Momo Number</label>
                    <input v-model="quotationForm.momoNumber" type="tel" placeholder="e.g. 2567XXXXXXXX" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                    <input v-model="quotationForm.bankAccount" type="text" placeholder="Account number" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <input v-model="quotationForm.bankName" type="text" placeholder="e.g. Stanbic, KCB" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Bank Code</label>
                    <input v-model="quotationForm.bankCode" type="text" placeholder="e.g. 001234" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                    <input v-model="quotationForm.branch" type="text" placeholder="Branch name or code" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0]" />
                  </div>
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                  <textarea v-model="quotationForm.additionalComments" placeholder="Any extra comments for this quotation (will be sent to the server)" class="w-full rounded-lg border border-[#F1F1F1] shadow-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#F0F0F0] h-20 resize-none"></textarea>
                </div>
              </div>
      </div>

      <!-- Footer Actions -->
      <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
        <button @click="$emit('close')" type="button" class="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
          Cancel
        </button>
        <button @click="createQuotation" type="button" class="w-full sm:w-auto px-6 py-2 bg-[#2F2E8B] text-white rounded-lg hover:bg-[#2F2E8B]/80" :disabled="isCreating">
          {{ isCreating ? 'Creating...' : 'Create Quotation' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import useCurrency from '../../../composables/useCurrency';
import AIEnhanceButton from '@/components/AIEnhanceButton.vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import { usePreferences } from '@/config/usePreferences.js';

const { preferences } = usePreferences();

const props = defineProps({
  showModal: Boolean
});

const emit = defineEmits(['close', 'quotationCreated']);

watch(() => props.showModal, async (newVal) => {
  if (newVal) {
    // Pre-fill notes from global preferences if local notes are empty
    if (!quotationForm.value.notes && preferences.quotationNotes) {
      quotationForm.value.notes = preferences.quotationNotes;
    }
    
    // Load company TPIN when modal opens
    try {
      const tenantId = getTenantId();
      const resp = await fetch(`${API_BASE_URL}/tenant-details/details?tenant_id=${tenantId}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (resp.ok) {
        const data = await resp.json();
        const tenant = data?.tenant ?? data ?? null;
        if (tenant) {
          quotationForm.value.companyTpin = tenant.tpin || tenant.tax_pin || tenant.company_tpin || '';
        }
      }
    } catch (e) {
      console.error('Failed to pre-fill company TPIN', e);
    }
  }
});

const isCreating = ref(false);
const isGeneratingNumber = ref(false);

const { getTenantId, getToken } = decodeJWT();

const generateQuotationNumber = async () => {
  if (isGeneratingNumber.value) return;
  isGeneratingNumber.value = true;
  try {
    const tenantId = getTenantId();
    const resp = await fetch(`${API_BASE_URL}/invoices/generate-number?tenant_id=${tenantId}&type=quotation`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!resp.ok) throw new Error('Failed to generate number');
    const data = await resp.json();
    quotationForm.value.quotationNumber = data.number;
  } catch (err) {
    console.error('Error generating quotation number:', err);
    alert('Failed to generate sequential quotation number. Please enter manually.');
  } finally {
    isGeneratingNumber.value = false;
  }
};

// Generate quotation number - will be auto-generated by backend
// Tax type options
const taxTypes = [
  { value: 'vat', label: 'VAT (16%)', rate: 0.16 },
  { value: 'turnover', label: 'Turnover Tax (5%)', rate: 0.05, minAmount: 12000 },
  { value: 'income', label: 'Income Tax (35%)', rate: 0.35 },
  { value: 'none', label: 'No Tax (0%)', rate: 0 }
];

const quotationForm = ref({
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientAddress: '',
  clientTpin: '',
  companyTpin: '',
  // quotationNumber will be auto-generated by backend
  date: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
  status: 'draft',
  taxType: 'vat', // Default to VAT
  items: [{ description: '', quantity: 1, unitPrice: 0 }],
    notes: '',
    // New payment / comments fields
    momoNumber: '',
    bankAccount: '',
    bankName: '',
    bankCode: '',
    branch: '',
    additionalComments: '',
    linkedToType: '',
    linkedToId: ''
});

// CRM Integration
const crmRecords = ref([]);
const loadingCrmRecords = ref(false);

// Watch for CRM Type change to fetch records
watch(() => quotationForm.value.linkedToType, async (newType) => {
  if (!newType) {
    crmRecords.value = [];
    quotationForm.value.linkedToId = '';
    return;
  }
  
  loadingCrmRecords.value = true;
  quotationForm.value.linkedToId = '';
  crmRecords.value = [];
  
  try {
    let endpoint = '';
    if (newType === 'lead') endpoint = '/crm/leads';
    else if (newType === 'contact') endpoint = '/crm/contacts'; 
    else if (newType === 'account') endpoint = '/crm/customers';
    else if (newType === 'deal') endpoint = '/crm/deals';
    
    if (endpoint) {
       const token = getToken();
       const tenantId = getTenantId();
       const response = await fetch(`${API_BASE_URL}${endpoint}?tenant_id=${tenantId}&limit=100`, {
          headers: { 'Authorization': `Bearer ${token}` }
       });
       if (response.ok) {
         const data = await response.json();
         crmRecords.value = Array.isArray(data) ? data : (data.items || []);
       }
    }
  } catch (error) {
    console.error('Failed to fetch CRM records:', error);
  } finally {
    loadingCrmRecords.value = false;
  }
});

// Watch for CRM Record selection to auto-fill client details
watch(() => quotationForm.value.linkedToId, (newId) => {
  if (!newId || !crmRecords.value.length) return;
  
  const record = crmRecords.value.find(r => (r.id === newId || r._id === newId));
  if (record) {
    // Auto-fill client details if empty
    if (!quotationForm.value.clientName) quotationForm.value.clientName = record.name || record.company || (record.firstName ? `${record.firstName} ${record.lastName}` : '');
    if (!quotationForm.value.clientEmail) quotationForm.value.clientEmail = record.email || '';
    if (!quotationForm.value.clientPhone) quotationForm.value.clientPhone = record.phone || record.mobile || '';
    if (!quotationForm.value.clientAddress && record.address) quotationForm.value.clientAddress = record.address;
  }
});

// Currency composable
const { formatCurrency, currencySymbol, currentSettings } = useCurrency();

function formatNumber(n) {
  const dp = (currentSettings && currentSettings.value && typeof currentSettings.value.decimalPlaces === 'number') ? currentSettings.value.decimalPlaces : 2;
  return Number(n || 0).toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

// Local helper to format currency-aware strings
const formatWithSymbol = (amount) => {
  const n = Number(amount) || 0;
  try {
    if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(n);
    return `${currencySymbol.value || 'K'}${formatNumber(n)}`;
  } catch (e) {
    return `${currencySymbol.value || 'K'}${formatNumber(n)}`;
  }
};

// Computed totals
const subtotal = computed(() => 
  quotationForm.value.items.reduce((sum, item) => 
    sum + (Number(item.quantity) * Number(item.unitPrice || 0)), 0)
);

// Get current tax rate based on selected tax type
const currentTaxType = computed(() => taxTypes.find(t => t.value === quotationForm.value.taxType) || taxTypes[0]);
const taxRate = computed(() => {
  const taxType = currentTaxType.value;
  // For turnover tax, only apply if subtotal >= 12,000
  if (taxType.value === 'turnover' && subtotal.value < (taxType.minAmount || 0)) {
    return 0;
  }
  return taxType.rate;
});
const taxLabel = computed(() => currentTaxType.value.label.split(' (')[0]);
const tax = computed(() => subtotal.value * taxRate.value);
const total = computed(() => subtotal.value + tax.value);

// Keep vat as alias for backward compatibility
const vat = computed(() => tax.value);

// Line item actions
function addLineItem() {
  quotationForm.value.items.push({ description: '', quantity: 1, unitPrice: 0 });
}

function removeLineItem(index) {
  if (quotationForm.value.items.length > 1) {
    quotationForm.value.items.splice(index, 1);
  }
}

// Create quotation
async function createQuotation() {
  if (!quotationForm.value.clientName || !quotationForm.value.clientEmail) {
    alert('Please fill in required fields');
    return;
  }

  isCreating.value = true;

  try {
    // Emit success event with quotation data - the parent will handle saving
    emit('quotationCreated', {
      ...quotationForm.value,
      subtotal: subtotal.value,
      tax: tax.value,
      taxType: quotationForm.value.taxType,
      taxRate: taxRate.value,
      taxLabel: taxLabel.value,
      vat: vat.value, // backward compatibility
      total: total.value,
      // ensure new fields are present at top-level for parent handler
      momoNumber: quotationForm.value.momoNumber || null,
      bankAccount: quotationForm.value.bankAccount || null,
      bank_name: quotationForm.value.bankName || null,
      bank_code: quotationForm.value.bankCode || null,
      bank_branch: quotationForm.value.branch || null,
      additionalComments: quotationForm.value.additionalComments || null,
      linkedToType: quotationForm.value.linkedToType || null,
      linkedToId: quotationForm.value.linkedToId || null
    });
    
    // Reset form
    resetForm();
    
    // Close modal
    emit('close');
    
  } catch (error) {
    console.error('Error creating quotation:', error);
    alert('Failed to create quotation. Please try again.');
  } finally {
    isCreating.value = false;
  }
}

// Reset form
function resetForm() {
  quotationForm.value = {
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientTpin: '',
    companyTpin: '',
    // quotationNumber will be auto-generated by backend
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unitPrice: 0 }],
    notes: '',
    momoNumber: '',
    bankAccount: '',
    bankName: '',
    bankCode: '',
    branch: '',
    additionalComments: '',
    linkedToType: '',
    linkedToId: ''
  };
}
</script>

<style scoped>
/* Custom scrollbar for the modal */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>