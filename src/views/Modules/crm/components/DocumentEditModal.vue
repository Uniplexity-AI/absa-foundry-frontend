<template>
  <div v-if="modelValue && document" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-none shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative">
      <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
      <!-- Header -->
      <div class="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight">
            Edit Document
          </h3>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6 relative z-10">
        <div>
          <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Document Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
          />
        </div>

        <div>
          <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
          <select
            v-model="form.category"
            class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
          >
            <option value="contract">CONTRACT</option>
            <option value="invoice">INVOICE</option>
            <option value="proposal">PROPOSAL</option>
            <option value="quotation">QUOTATION</option>
            <option value="presentation">PRESENTATION</option>
            <option value="other">OTHER</option>
          </select>
        </div>

        <div>
          <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
          ></textarea>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100 relative z-20">
        <button
          @click="close"
          class="px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
        >
          Cancel
        </button>
        <button
          @click="saveChanges"
          class="px-8 py-3 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition shadow-md uppercase tracking-widest"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import * as documentsApi from '@/services/documents_api';
import { decodeJWT } from '@/services/decodeJWT.js';

const { getTenantId } = decodeJWT();

const props = defineProps({
  modelValue: Boolean,
  document: Object
});

const emit = defineEmits(['update:modelValue', 'updated']);

const form = ref({
  name: '',
  category: '',
  description: ''
});

watch(() => props.document, (newDoc) => {
  if (newDoc) {
    form.value = {
      name: newDoc.name || '',
      category: newDoc.category || '',
      description: newDoc.description || ''
    };
  }
}, { immediate: true });

async function saveChanges() {
  try {
    const tenantId = getTenantId();
    const docId = props.document?._id || props.document?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await documentsApi.updateDocument(docId, form.value, tenantId);
    emit('updated');
    close();
  } catch (error) {
    console.error('Failed to update document:', error);
    alert('Failed to update document');
  }
}

function close() {
  emit('update:modelValue', false);
}
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
