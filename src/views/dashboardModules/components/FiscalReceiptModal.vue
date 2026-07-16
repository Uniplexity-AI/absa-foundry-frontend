<template>
  <div class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 flex items-center justify-center p-4">
    <div class="bg-white shadow-xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center gap-3">
          <i class="fas fa-receipt text-[#2F2E8B] text-lg"></i>
          <h2 class="text-sm font-mono font-black text-gray-900 uppercase tracking-widest">Fiscal Receipt</h2>
          <span v-if="receiptData?.fiscal?.status === 'FISCALIZED'"
            class="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-none text-[8px] font-mono font-black uppercase tracking-widest">
            <i class="fas fa-check-circle"></i> Fiscalized
          </span>
          <span v-else-if="receiptData?.fiscal?.status === 'FAILED'"
            class="px-2 py-0.5 bg-red-100 text-red-700 rounded-none text-[8px] font-mono font-black uppercase tracking-widest">
            <i class="fas fa-exclamation-circle"></i> Failed
          </span>
          <span v-else
            class="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-none text-[8px] font-mono font-black uppercase tracking-widest">
            {{ receiptData?.fiscal?.status || 'N/A' }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <button @click="handlePrint"
            class="px-4 py-2 bg-[#2F2E8B] hover:bg-[#1D226B] text-white rounded-none text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5">
            <i class="fas fa-print"></i> Print
          </button>
          <button @click="$emit('close')"
            class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Receipt Preview (iframe) -->
      <div class="flex-1 overflow-auto bg-gray-100 p-4">
        <div v-if="loading" class="flex items-center justify-center py-20">
          <div class="animate-spin h-8 w-8 border-2 border-[#2F2E8B] border-t-transparent rounded-full"></div>
        </div>
        <div v-else-if="error" class="text-center py-12 text-red-500">
          <i class="fas fa-exclamation-triangle text-3xl mb-3"></i>
          <p class="text-sm font-mono">{{ error }}</p>
        </div>
        <iframe v-else-if="receiptHtml" :srcdoc="receiptHtml"
          class="w-full border border-gray-200 bg-white shadow-sm"
          style="min-height: 800px; max-width: 80mm; margin: 0 auto; display: block;"
          ref="receiptFrame"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';

const props = defineProps({
  saleId: { type: String, required: true },
  reprint: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);

const { getTenantId, getToken } = decodeJWT();
const loading = ref(true);
const error = ref(null);
const receiptHtml = ref(null);
const receiptData = ref(null);
const receiptFrame = ref(null);

const fetchReceipt = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch(
      `${API_BASE_URL}/pos/fiscal-receipt/${props.saleId}?tenant_id=${getTenantId()}&format=html${props.reprint ? '&reprint=true' : ''}`,
      { headers: { 'Authorization': `Bearer ${getToken()}` } }
    );
    if (!res.ok) throw new Error('Failed to load receipt');
    receiptHtml.value = await res.text();

    // Also fetch JSON data for status display
    const jsonRes = await fetch(
      `${API_BASE_URL}/pos/fiscal-receipt/${props.saleId}?tenant_id=${getTenantId()}&format=json`,
      { headers: { 'Authorization': `Bearer ${getToken()}` } }
    );
    if (jsonRes.ok) {
      receiptData.value = await jsonRes.json();
    }
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

const handlePrint = () => {
  const frame = receiptFrame.value;
  if (!frame) return;
  try {
    frame.contentWindow.print();
  } catch (e) {
    // Fallback: open in new window and print
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(receiptHtml.value);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 500);
    }
  }
};

onMounted(() => { fetchReceipt(); });
</script>
