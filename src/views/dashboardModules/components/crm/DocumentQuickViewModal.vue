<template>
  <Teleport to="body">
    <div v-if="modelValue && document" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10002] p-4" @click.self="close">
      <div class="bg-white shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        <!-- Header -->
        <div class="bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-5 sticky top-0 z-10 flex items-center justify-between">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-1.5 h-6 bg-[#2F2E8B] flex-shrink-0"></div>
            <div class="min-w-0">
              <h3 class="text-sm font-black text-gray-900 font-mono uppercase tracking-tight truncate">{{ document.name }}</h3>
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-0.5">ASSET_PREVIEW // {{ formatDate(document.created_at) }}</p>
            </div>
          </div>
          <button @click="close" class="text-gray-400 hover:text-gray-900 hover:bg-gray-100 p-2 transition border border-transparent hover:border-gray-200 flex-shrink-0">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-5 relative z-10">
          <!-- Quick Actions -->
          <div class="flex flex-col sm:flex-row gap-2">
            <button
              @click="downloadDocument"
              class="flex-1 px-4 py-2.5 bg-white border border-green-600 text-green-600 hover:bg-green-50 transition flex items-center justify-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest"
            >
              <i class="fas fa-download"></i>
              DOWNLOAD_ASSET
            </button>
            <button
              @click="openInNewTab"
              class="flex-1 px-4 py-2.5 bg-white border border-[#2F2E8B] text-[#2F2E8B] hover:bg-blue-50 transition flex items-center justify-center gap-2 text-[10px] font-mono font-black uppercase tracking-widest"
            >
              <i class="fas fa-external-link-alt"></i>
              OPEN_IN_TAB
            </button>
          </div>

          <!-- Document Details -->
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-gray-200">
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-1">CATEGORY</label>
              <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ document.category || 'N/A' }}</p>
            </div>
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-1">FILE_SIZE</label>
              <p class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-tight">{{ formatFileSize(document.file_size) }}</p>
            </div>
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-1">VIEWS</label>
              <p class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-tight">{{ document.views ?? 0 }}</p>
            </div>
            <div>
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-1">DOWNLOADS</label>
              <p class="text-[11px] font-mono font-black text-[#2F2E8B] uppercase tracking-tight">{{ document.downloads ?? 0 }}</p>
            </div>
          </div>

          <!-- Description -->
          <div v-if="document.description" class="pt-4 border-t border-dashed border-gray-200">
            <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">DESCRIPTION</label>
            <p class="text-[11px] font-mono text-gray-700 leading-relaxed">{{ document.description }}</p>
          </div>

          <!-- Tags -->
          <div v-if="document.tags && document.tags.length > 0" class="pt-4 border-t border-dashed border-gray-200">
            <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">TAGS</label>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in document.tags" :key="tag" class="px-2.5 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-[9px] font-mono font-bold uppercase tracking-widest">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50/80 px-6 py-4 flex justify-end sticky bottom-0 z-10 border-t border-gray-100">
          <button
            @click="close"
            class="px-6 py-2.5 border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition"
          >
            CLOSE_PREVIEW
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { decodeJWT } from '@/api_services/decodeJWT.js';
import * as documentsApi from '@/api_services/documents_api';

const { getTenantId } = decodeJWT();

const props = defineProps({
  modelValue: Boolean,
  document: Object
});

const emit = defineEmits(['update:modelValue', 'refresh']);

function close() {
  emit('update:modelValue', false);
}

async function downloadDocument() {
  try {
    const tenantId = getTenantId();
    const docId = props.document?._id || props.document?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await documentsApi.trackDownload(docId, tenantId);
    const fileUrl = props.document?.file_url;
    if (!fileUrl) {
      throw new Error('Document URL is missing');
    }
    const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${documentsApi.apiClient.defaults.baseURL}${fileUrl}`;
    window.open(fullUrl, '_blank');
    emit('refresh');
  } catch (error) {
    console.error('Failed to download:', error);
  }
}

function openInNewTab() {
  const fileUrl = props.document?.file_url;
  if (!fileUrl) return;
  const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${documentsApi.apiClient.defaults.baseURL}${fileUrl}`;
  window.open(fullUrl, '_blank');
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
