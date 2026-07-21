<template>
  <div v-if="modelValue && document" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-none shadow-2xl max-w-md w-full overflow-hidden animate-scale-in border border-gray-200 relative">
      <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
      <!-- Header -->
      <div class="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight">
            Share Document
          </h3>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6 relative z-10">
        <div class="flex items-start gap-4 p-4 bg-gray-50/50 border border-gray-100 relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
          <i :class="getFileIcon(document.file_type)" class="text-3xl text-gray-300 relative z-10"></i>
          <div class="relative z-10">
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Sharing Document</p>
            <h4 class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ document.name }}</h4>
          </div>
        </div>

        <!-- Public Access Toggle -->
        <div class="flex items-center justify-between p-4 border border-gray-100">
          <div>
            <h5 class="text-xs font-black text-gray-900 font-display uppercase tracking-tight">Public Link Access</h5>
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Anyone with the link can view this document</p>
          </div>
          <button 
            @click="togglePublicAccess"
            :disabled="updating"
            :class="isPublic ? 'bg-green-500 border-green-600' : 'bg-gray-200 border-gray-300'"
            class="w-12 h-6 border transition-colors relative"
          >
            <div 
              :class="isPublic ? 'translate-x-6' : 'translate-x-0'"
              class="absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white transition-transform"
            ></div>
          </button>
        </div>

        <!-- Public Link Display -->
        <div v-if="isPublic && publicLink" class="space-y-2">
          <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Direct access link</label>
          <div class="flex gap-2">
            <input
              ref="linkInput"
              type="text"
              readonly
              :value="fullPublicLink"
              class="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 text-[10px] font-mono focus:outline-none"
            />
            <button
              @click="copyLink"
              class="px-4 py-2 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] uppercase hover:opacity-90 transition shadow-md"
            >
              {{ copied ? 'COPIED' : 'COPY' }}
            </button>
          </div>
        </div>
        
        <div v-else-if="updating" class="flex justify-center py-4">
          <div class="animate-spin rounded-none h-6 w-6 border-b-2 border-[#2F2E8B]"></div>
        </div>

        <div v-else-if="!isPublic" class="text-center py-8 bg-gray-50/30 border border-dashed border-gray-200">
          <i class="fas fa-lock text-gray-300 text-3xl mb-3"></i>
          <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">This document is currently private</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100 relative z-20">
        <button
          @click="close"
          class="px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition uppercase tracking-widest"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import * as documentsApi from '@/api_services/documents_api';
import { decodeJWT } from '@/api_services/decodeJWT.js';

const { getTenantId } = decodeJWT();

const props = defineProps({
  modelValue: Boolean,
  document: Object
});

const emit = defineEmits(['update:modelValue', 'shared']);

// State
const updating = ref(false);
const copied = ref(false);
const isPublic = ref(false);
const publicLink = ref(null);

// Computed
const fullPublicLink = computed(() => {
  if (!publicLink.value) return '';
  const baseUrl = window.location.origin;
  return `${baseUrl}/view/doc/${publicLink.value}`;
});

// Watch for document changes
watch(() => props.document, (newDoc) => {
  if (newDoc) {
    isPublic.value = !!newDoc.is_public;
    publicLink.value = newDoc.public_link || null;
  }
}, { immediate: true });

// Methods
async function togglePublicAccess() {
  updating.value = true;
  try {
    const tenantId = getTenantId();
    const result = await documentsApi.shareDocument(props.document._id, {
      is_public: !isPublic.value
    }, tenantId);
    
    isPublic.value = !isPublic.value;
    publicLink.value = result.public_link || null;
    
    emit('shared');
  } catch (error) {
    console.error('Failed to update sharing settings:', error);
    alert('Failed to update sharing settings');
  } finally {
    updating.value = false;
  }
}

function copyLink() {
  if (!fullPublicLink.value) return;
  
  navigator.clipboard.writeText(fullPublicLink.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

function close() {
  emit('update:modelValue', false);
}

function getFileIcon(fileType) {
  const icons = {
    'pdf': 'fas fa-file-pdf',
    'doc': 'fas fa-file-word',
    'docx': 'fas fa-file-word',
    'xls': 'fas fa-file-excel',
    'xlsx': 'fas fa-file-excel',
    'image': 'fas fa-file-image',
    'jpg': 'fas fa-file-image',
    'png': 'fas fa-file-image',
  };
  return icons[fileType?.toLowerCase()] || 'fas fa-file';
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
