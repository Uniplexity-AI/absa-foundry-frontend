<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-none shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in border border-gray-200 relative">
            <!-- Header -->
      <div class="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between relative z-10">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight">
            {{ mode === 'link' ? 'Link Existing Asset' : 'Generate New Asset' }}
          </h3>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-8 space-y-6">
        <!-- Loading State -->
        <div v-if="checkingAccess" class="text-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Checking subscription access...</p>
        </div>

        <!-- No Access Warning -->
        <div v-else-if="!hasInvoicingAccess" class="bg-orange-50/30 border border-orange-100 p-8">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <i class="fas fa-exclamation-triangle text-orange-500 text-xl"></i>
            </div>
            <div>
              <h4 class="text-lg font-black text-gray-900 font-display uppercase tracking-tight mb-2">Subscription Required</h4>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-4">
                You need access to the <span class="text-orange-600">Invoicing Module</span> to authorize document generation.
              </p>
              <button
                @click="$emit('subscription-required'); close()"
                class="px-8 py-3 bg-orange-600 text-white font-bold font-mono text-[10px] rounded-none hover:bg-orange-700 transition shadow-md flex items-center gap-3 uppercase tracking-widest"
              >
                <i class="fas fa-rocket"></i>
                <span>Authorize Subscription</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Action Area -->
        <div v-else class="space-y-6">
          <!-- Mode Toggle -->
          <div class="flex border border-gray-100 p-1 bg-gray-50/50">
            <button 
              @click="mode = 'redirect'"
              :class="mode === 'redirect' ? 'bg-white text-[#2F2E8B] shadow-none' : 'text-gray-400 hover:text-gray-600'"
              class="flex-1 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all"
            >
              Redirect to Module
            </button>
            <button 
              @click="mode = 'link'"
              :class="mode === 'link' ? 'bg-white text-[#2F2E8B] shadow-none' : 'text-gray-400 hover:text-gray-600'"
              class="flex-1 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all"
            >
              Link Existing ID
            </button>
          </div>

          <div v-if="mode === 'redirect'" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <!-- Left: Call to Action -->
            <div class="text-center md:text-left">
              <div class="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto md:mx-0 mb-6">
                <i class="fas fa-file-invoice text-gray-300 text-3xl"></i>
              </div>
              <h4 class="text-2xl font-black text-gray-900 font-display uppercase tracking-tight mb-2">Generate Assets</h4>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-6">
                Redirecting to <span class="text-[#2F2E8B]">Invoicing Module</span> for document construction.
              </p>
              
              <div class="bg-gray-50/50 border border-gray-100 p-6 relative overflow-hidden">
                                <div class="flex items-start gap-3 relative z-10">
                  <i class="fas fa-info-circle text-[#2F2E8B] mt-1"></i>
                  <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                    <p class="text-gray-900 mb-1">Automated Referencing</p>
                    <p>Invoicing assets are automatically mapped to CRM database records.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Features List -->
            <div class="bg-gray-50/50 p-6 border border-gray-100 relative overflow-hidden">
                            <h5 class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                <i class="fas fa-check-circle text-[#2F2E8B]"></i>
                Module Capabilities:
              </h5>
              <ul class="space-y-3 relative z-10">
                <li class="flex items-start gap-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                  <i class="fas fa-check text-[#2F2E8B] mt-0.5"></i>
                  <span>Professional Invoices & Quotes</span>
                </li>
                <li class="flex items-start gap-3 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                  <i class="fas fa-check text-[#2F2E8B] mt-0.5"></i>
                  <span>Linked Leads & Deals</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Link Mode Form -->
          <div v-else class="space-y-6">
            <div class="bg-blue-50/30 border border-blue-100 p-6 relative overflow-hidden">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Asset Type</label>
                  <select v-model="referenceForm.category" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:border-[#2F2E8B] focus:ring-0">
                    <option value="invoice">INVOICE</option>
                    <option value="quotation">QUOTATION</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Asset ID (System Serial)</label>
                  <input 
                    v-model="referenceForm.reference_id"
                    type="text" 
                    placeholder="E.G. INV-000001"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:border-[#2F2E8B] focus:ring-0"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                  <input 
                    v-model="referenceForm.name"
                    type="text" 
                    placeholder="E.G. Q1 PROJECT INVOICE"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:border-[#2F2E8B] focus:ring-0"
                  />
                </div>
              </div>
            </div>
            
            <p v-if="submitting" class="text-center text-[10px] font-mono font-bold text-[#2F2E8B] animate-pulse">
              SYNCHRONIZING WITH BACKEND...
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100 relative z-20">
        <button
          @click="close"
          class="px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
        >
          Cancel
        </button>
        <button
          v-if="hasInvoicingAccess"
          @click="mode === 'redirect' ? goToInvoicing() : createReference()"
          :disabled="mode === 'link' && (!referenceForm.reference_id || !referenceForm.name || submitting)"
          class="px-8 py-3 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition shadow-md flex items-center gap-3 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{{ mode === 'redirect' ? 'Initialize Module' : 'Authorize Link' }}</span>
          <i :class="mode === 'redirect' ? 'fas fa-arrow-right' : 'fas fa-link'"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { checkModuleSubscription } from '@/services/modules_api';
import * as documentsApi from '@/services/documents_api';
import { decodeJWT } from '@/services/decodeJWT.js';

const { getTenantId } = decodeJWT();
const router = useRouter();

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'subscription-required', 'created']);

const hasInvoicingAccess = ref(false);
const checkingAccess = ref(true);
const mode = ref('redirect'); // 'redirect' or 'link'
const submitting = ref(false);

const referenceForm = ref({
  name: '',
  category: 'invoice',
  reference_id: ''
});

async function checkSubscription() {
  try {
    checkingAccess.value = true;
    hasInvoicingAccess.value = await checkModuleSubscription('invoicing');
  } catch (error) {
    console.error('Error checking invoicing subscription:', error);
    hasInvoicingAccess.value = false;
  } finally {
    checkingAccess.value = false;
  }
}

async function createReference() {
  if (!referenceForm.value.reference_id || !referenceForm.value.name) return;
  
  submitting.value = true;
  try {
    const tenantId = getTenantId();
    await documentsApi.createInvoiceReference({
      ...referenceForm.value,
      // Pass IDs if we want to be explicit, but reference_id is used by backend to find the invoice
      invoice_id: referenceForm.value.category === 'invoice' ? referenceForm.value.reference_id : null,
      quote_id: referenceForm.value.category === 'quotation' ? referenceForm.value.reference_id : null,
    }, tenantId);
    
    emit('created');
    close();
  } catch (error) {
    console.error('Failed to create reference:', error);
    alert('Failed to link document reference: ' + (error.message || 'ID not found'));
  } finally {
    submitting.value = false;
  }
}

function goToInvoicing() {
  // Clear any old data
  sessionStorage.removeItem('crm_invoice_data');
  
  // Navigate to invoicing module
  router.push('/dashboard/invoicing');
  close();
}

function close() {
  emit('update:modelValue', false);
}

// Check subscription when modal opens
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    checkSubscription();
  }
});

// Initial check
onMounted(() => {
  if (props.modelValue) {
    checkSubscription();
  }
});
</script>

<style scoped>
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

.dotted-pattern {
  background-image: radial-gradient(rgba(47, 46, 139, 0.2) 1px, transparent 1px);
  background-size: 10px 10px;
}
</style>
