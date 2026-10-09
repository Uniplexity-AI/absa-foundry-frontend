<template>
  <div v-if="modelValue && document" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-none shadow-2xl max-w-4xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative">
            <!-- Header -->
      <div class="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 sticky top-0 z-10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <div>
            <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight">{{ document.name }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-0.5">v{{ document.version }} • {{ formatDate(document.created_at) }}</p>
          </div>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-8 relative z-10">
        <!-- Quick Actions -->
        <div class="flex flex-wrap gap-2">
          <button
            @click="downloadDocument"
            class="px-6 py-2.5 bg-white border border-gray-200 text-green-600 font-bold font-mono text-[10px] rounded-none hover:bg-green-50 hover:border-green-600 transition flex items-center gap-2 uppercase tracking-widest shadow-none"
          >
            <i class="fas fa-download"></i>
            Download
          </button>
          <button
            @click="$emit('refresh')"
            class="px-6 py-2.5 bg-white border border-gray-200 text-[#2F2E8B] font-bold font-mono text-[10px] rounded-none hover:bg-blue-50 hover:border-[#2F2E8B] transition flex items-center gap-2 uppercase tracking-widest shadow-none"
          >
            <i class="fas fa-sync"></i>
            Refresh
          </button>
          <button
            v-if="fullFileUrl"
            @click="openInNewTab"
            class="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold font-mono text-[10px] rounded-none hover:bg-gray-50 hover:border-gray-400 transition flex items-center gap-2 uppercase tracking-widest shadow-none"
          >
            <i class="fas fa-external-link-alt"></i>
            Open in New Tab
          </button>
        </div>

        <!-- File Preview -->
        <div class="border border-gray-200 bg-gray-50 relative">
          <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">File Preview</p>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ previewLabel }}</p>
          </div>
          <div class="w-full bg-gray-100 flex items-center justify-center" style="min-height: 480px;">
            <!-- Invoice reference (no file) -->
            <div v-if="document.file_type === 'invoice_ref'" class="text-center p-10">
              <i class="fas fa-file-invoice text-5xl text-[#2F2E8B] mb-4"></i>
              <p class="text-sm font-bold text-gray-700 font-display uppercase tracking-tight">Invoice / Quote Reference</p>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2">Open the invoicing module to view the PDF</p>
            </div>
            <!-- No file URL -->
            <div v-else-if="!fullFileUrl" class="text-center p-10">
              <i class="fas fa-file-excel text-5xl text-gray-300 mb-4"></i>
              <p class="text-sm font-bold text-gray-700 font-display uppercase tracking-tight">No File Available</p>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2">This document has no attached file URL</p>
            </div>
            <!-- Image preview -->
            <img
              v-else-if="isImage"
              :src="fullFileUrl"
              :alt="document.name"
              class="max-w-full max-h-[70vh] object-contain bg-white"
              @error="previewError = true"
            />
            <!-- PDF preview -->
            <iframe
              v-else-if="isPdf"
              :src="fullFileUrl"
              class="w-full bg-white"
              style="height: 70vh; border: 0;"
              :title="document.name"
            ></iframe>
            <!-- Text preview -->
            <iframe
              v-else-if="isText"
              :src="fullFileUrl"
              class="w-full bg-white"
              style="height: 70vh; border: 0;"
              :title="document.name"
            ></iframe>
            <!-- Office files: try Google Docs viewer if URL is publicly reachable, else fallback -->
            <div v-else class="text-center p-10">
              <i :class="getFileIcon(extension)" class="text-5xl text-[#2F2E8B] mb-4"></i>
              <p class="text-sm font-bold text-gray-700 font-display uppercase tracking-tight">Preview Not Available</p>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2">{{ extension ? extension.toUpperCase() : 'FILE' }} files cannot be previewed inline</p>
              <button
                @click="downloadDocument"
                class="mt-4 px-6 py-2.5 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition uppercase tracking-widest"
              >
                <i class="fas fa-download mr-2"></i>
                Download to View
              </button>
            </div>
          </div>
        </div>

        <!-- Document Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-6 border border-gray-100 relative overflow-hidden">
                    <div class="space-y-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Category</label>
              <p class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ document.category || 'N/A' }}</p>
            </div>
            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">File Size</label>
              <p class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ formatFileSize(document.file_size) }}</p>
            </div>
            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Uploaded By</label>
              <p class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ document.uploaded_by }}</p>
            </div>
          </div>
          <div class="space-y-6 relative z-10">
            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Views</label>
              <p class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ document.views }}</p>
            </div>
            <div>
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Downloads</label>
              <p class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ document.downloads }}</p>
            </div>
            <div v-if="document.linked_to_type">
              <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Linked To</label>
              <p class="text-sm font-black text-gray-900 font-display uppercase tracking-tight">{{ document.linked_to_type }}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div v-if="document.description">
          <label class="text-sm font-semibold text-gray-600">Description</label>
          <p class="text-gray-900 mt-1">{{ document.description }}</p>
        </div>

        <!-- Tags -->
        <div v-if="document.tags && document.tags.length > 0">
          <label class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1">Tags</label>
          <div class="flex flex-wrap gap-2 mt-2">
            <span v-for="tag in document.tags" :key="tag" class="px-3 py-1 bg-gray-50 border border-gray-100 text-[9px] font-mono font-bold text-gray-400 uppercase">
              {{ tag }}
            </span>
          </div>
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
import { computed, ref, watch } from 'vue';
import { decodeJWT } from '@/services/decodeJWT.js';
import * as documentsApi from '@/services/documents_api';

const { getTenantId } = decodeJWT();

const props = defineProps({
  modelValue: Boolean,
  document: Object
});

const emit = defineEmits(['update:modelValue', 'refresh']);

const previewError = ref(false);

watch(() => props.document?._id || props.document?.id, () => {
  previewError.value = false;
});

const fullFileUrl = computed(() => {
  const url = props.document?.file_url;
  if (!url) return '';
  return url.startsWith('http') ? url : `${documentsApi.apiClient.defaults.baseURL}${url}`;
});

const extension = computed(() => {
  const name = props.document?.name || props.document?.file_name || props.document?.file_url || '';
  const fromName = name.split('?')[0].split('#')[0].split('.').pop();
  const ext = (fromName || props.document?.file_type || '').toString().toLowerCase();
  return ext;
});

const isImage = computed(() => ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(extension.value));
const isPdf = computed(() => extension.value === 'pdf' || props.document?.file_type === 'pdf');
const isText = computed(() => ['txt', 'csv', 'json', 'log', 'md', 'xml', 'html'].includes(extension.value));

const previewLabel = computed(() => {
  if (props.document?.file_type === 'invoice_ref') return 'INVOICE REF';
  if (isImage.value) return 'IMAGE';
  if (isPdf.value) return 'PDF';
  if (isText.value) return 'TEXT';
  return extension.value ? extension.value.toUpperCase() : 'FILE';
});

function close() {
  emit('update:modelValue', false);
}

function openInNewTab() {
  if (fullFileUrl.value) {
    window.open(fullFileUrl.value, '_blank', 'noopener,noreferrer');
  }
}

async function downloadDocument() {
  try {
    const tenantId = getTenantId();
    const docId = props.document?._id || props.document?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await documentsApi.trackDownload(docId, tenantId);
    
    if (props.document.file_url) {
      const fullUrl = props.document.file_url.startsWith('http') ? props.document.file_url : `${documentsApi.apiClient.defaults.baseURL}${props.document.file_url}`;
      window.open(fullUrl, '_blank');
    } else {
      alert('No file URL available for this document');
    }
    
    emit('refresh');
  } catch (error) {
    console.error('Failed to download:', error);
    alert('Failed to download document');
  }
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

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
