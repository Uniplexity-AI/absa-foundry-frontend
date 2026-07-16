<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 bg-black/60 flex items-center justify-center z-[10001] p-4" @click.self="close">
      <div class="bg-white shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative">
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>

        <!-- Header -->
        <div class="bg-white/90 backdrop-blur-md px-6 py-5 sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
            <div>
              <h3 class="text-sm font-black text-gray-900 font-mono uppercase tracking-tight">ATTACH_DOCUMENT</h3>
              <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-0.5">TARGET: {{ recordType?.toUpperCase() }} // {{ recordName }}</p>
            </div>
          </div>
          <button @click="close" class="text-gray-400 hover:text-gray-900 hover:bg-gray-100 p-2 transition border border-transparent hover:border-gray-200">
            <X :size="16" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-6 relative z-10">
          <!-- Mode Selection -->
          <div class="flex gap-2">
            <button
              @click="mode = 'upload'"
              :class="mode === 'upload' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
              class="flex-1 px-4 py-3 font-black font-mono text-[10px] transition flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Upload :size="12" />
              UPLOAD_NEW
            </button>
            <button
              @click="mode = 'link'"
              :class="mode === 'link' ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white border border-gray-200 text-gray-400 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'"
              class="flex-1 px-4 py-3 font-black font-mono text-[10px] transition flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <Link :size="12" />
              LINK_EXISTING
            </button>
          </div>

          <!-- Upload Mode -->
          <div v-if="mode === 'upload'" class="space-y-5">
            <!-- File Upload Area -->
            <div
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleDrop"
              @click="!selectedFile && $refs.fileInput.click()"
              :class="isDragging ? 'border-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-300 hover:border-[#2F2E8B]'"
              class="border-2 border-dashed p-8 text-center transition cursor-pointer"
            >
              <input
                ref="fileInput"
                type="file"
                @change="handleFileSelect"
                class="hidden"
                accept="*/*"
              />
              <div v-if="!selectedFile">
                <CloudUpload :size="48" class="text-gray-300 mx-auto mb-4" />
                <p class="text-[11px] font-mono font-black text-gray-700 uppercase tracking-widest mb-1">DROP_FILE_HERE</p>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">OR CLICK TO BROWSE // ALL FORMATS ACCEPTED</p>
              </div>
              <div v-else class="flex items-center justify-between bg-gray-50 border border-gray-100 p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-[#2F2E8B]/10 border border-[#2F2E8B]/20 flex items-center justify-center">
                    <FileText :size="18" class="text-[#2F2E8B]" />
                  </div>
                  <div class="text-left">
                    <p class="text-[10px] font-mono font-black text-gray-900 uppercase truncate max-w-[280px]">{{ selectedFile.name }}</p>
                    <p class="text-[9px] font-mono font-bold text-gray-400 uppercase">{{ formatFileSize(selectedFile.size) }}</p>
                  </div>
                </div>
                <button
                  @click.stop="selectedFile = null"
                  class="text-red-500 hover:bg-red-50 p-2 transition border border-transparent hover:border-red-200"
                >
                  <X :size="14" />
                </button>
              </div>
            </div>

            <!-- Upload Progress -->
            <div v-if="uploading" class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">UPLOADING_ASSET...</span>
                <span class="text-[10px] font-mono font-black text-[#2F2E8B]">{{ uploadProgress }}%</span>
              </div>
              <div class="w-full bg-gray-100 h-1.5">
                <div
                  class="bg-[#2F2E8B] h-1.5 transition-all duration-300"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
            </div>

            <!-- Document Details -->
            <div class="space-y-4">
              <div>
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">DOCUMENT_NAME *</label>
                <input
                  v-model="uploadForm.name"
                  type="text"
                  placeholder="ENTER_DOCUMENT_NAME..."
                  class="w-full px-3 py-2.5 border border-gray-200 text-[11px] font-mono font-bold text-gray-900 uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-300"
                />
              </div>

              <div>
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">CATEGORY *</label>
                <select
                  v-model="uploadForm.category"
                  class="w-full px-3 py-2.5 border border-gray-200 text-[11px] font-mono font-bold text-gray-900 uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition bg-white"
                >
                  <option value="">SELECT_CATEGORY...</option>
                  <option value="contract">CONTRACT</option>
                  <option value="invoice">INVOICE</option>
                  <option value="proposal">PROPOSAL</option>
                  <option value="quotation">QUOTATION</option>
                  <option value="presentation">PRESENTATION</option>
                  <option value="report">REPORT</option>
                  <option value="agreement">AGREEMENT</option>
                  <option value="id_document">ID_DOCUMENT</option>
                  <option value="other">OTHER</option>
                </select>
              </div>

              <div>
                <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest block mb-2">DESCRIPTION</label>
                <textarea
                  v-model="uploadForm.description"
                  rows="3"
                  placeholder="OPTIONAL_DOCUMENT_DESCRIPTION..."
                  class="w-full px-3 py-2.5 border border-gray-200 text-[11px] font-mono font-bold text-gray-900 focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition resize-none placeholder:text-gray-300"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Link Existing Mode -->
          <div v-else-if="mode === 'link'" class="space-y-4">
            <!-- Search Existing Documents -->
            <div class="relative">
              <Search :size="14" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
              <input
                v-model="searchQuery"
                @input="searchDocuments"
                type="text"
                placeholder="SEARCH_DOCUMENT_INDEX..."
                class="w-full pl-9 pr-4 py-2.5 border border-gray-200 text-[11px] font-mono font-bold text-gray-900 uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition placeholder:text-gray-300"
              />
            </div>

            <!-- Available Documents List -->
            <div v-if="searchingDocs" class="flex justify-center py-8">
              <Loader2 :size="20" class="animate-spin text-[#2F2E8B]" />
            </div>

            <div v-else-if="availableDocuments.length > 0" class="space-y-1 max-h-80 overflow-y-auto">
              <div
                v-for="doc in availableDocuments"
                :key="doc._id"
                @click="toggleDocSelection(doc)"
                :class="isDocSelected(doc._id) ? 'border-[#2F2E8B] bg-[#2F2E8B]/5' : 'border-gray-100 hover:border-gray-200'"
                class="flex items-center gap-3 p-3 border cursor-pointer transition"
              >
                <div
                  :class="isDocSelected(doc._id) ? 'bg-[#2F2E8B] border-[#2F2E8B]' : 'bg-white border-gray-300'"
                  class="w-4 h-4 border-2 flex items-center justify-center transition flex-shrink-0"
                >
                  <Check v-if="isDocSelected(doc._id)" :size="10" class="text-white" />
                </div>
                <div class="w-8 h-8 bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                  <FileText :size="14" class="text-[#2F2E8B]" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-mono font-black text-gray-900 uppercase truncate">{{ doc.name }}</p>
                  <p class="text-[8px] font-mono font-bold text-gray-400 uppercase mt-0.5">{{ doc.category || 'OBJECT' }} // {{ formatFileSize(doc.file_size) }}</p>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-12 bg-gray-50/50 border border-dashed border-gray-200">
              <FileText :size="24" class="text-gray-200 mx-auto mb-3" />
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">NO_UNLINKED_DOCUMENTS</p>
            </div>

            <!-- Selected Count -->
            <div v-if="selectedDocIds.length > 0" class="bg-[#2F2E8B]/5 border border-[#2F2E8B]/20 p-3 text-center">
              <p class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">
                {{ selectedDocIds.length }} ASSET{{ selectedDocIds.length > 1 ? 'S' : '' }}_SELECTED
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50/80 px-6 py-4 flex justify-end gap-3 sticky bottom-0 z-10 border-t border-gray-100">
          <button
            @click="close"
            :disabled="uploading"
            class="px-6 py-2.5 border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white text-[10px] font-mono font-black uppercase tracking-widest transition disabled:opacity-50"
          >
            PROTOCOL_ABORT
          </button>
          <button
            v-if="mode === 'upload'"
            @click="uploadAndAttach"
            :disabled="!canUpload || uploading"
            class="px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition shadow-lg shadow-[#2F2E8B]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Loader2 v-if="uploading" :size="12" class="animate-spin" />
            <Save v-else :size="12" />
            {{ uploading ? 'UPLOADING...' : 'COMMIT_UPLOAD' }}
          </button>
          <button
            v-else
            @click="linkSelected"
            :disabled="selectedDocIds.length === 0"
            class="px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition shadow-lg shadow-[#2F2E8B]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Link :size="12" />
            LINK_SELECTED [{{ selectedDocIds.length }}]
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue';
import { X, Upload, Link, CloudUpload, FileText, Search, Loader2, Check, Save } from 'lucide-vue-next';
import * as documentsApi from '@/api_services/documents_api';
import { decodeJWT } from '@/api_services/decodeJWT.js';

const { getTenantId } = decodeJWT();

const props = defineProps({
  modelValue: Boolean,
  recordType: String,
  recordId: String,
  recordName: String
});

const emit = defineEmits(['update:modelValue', 'attached']);

// State
const mode = ref('upload');
const selectedFile = ref(null);
const uploading = ref(false);
const uploadProgress = ref(0);
const isDragging = ref(false);
const uploadForm = ref({
  name: '',
  category: '',
  description: ''
});

const searchQuery = ref('');
const searchingDocs = ref(false);
const availableDocuments = ref([]);
const selectedDocIds = ref([]);

const fileInput = ref(null);

// Computed
const canUpload = computed(() => {
  return selectedFile.value && uploadForm.value.name && uploadForm.value.category;
});

// Methods
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    if (!uploadForm.value.name) {
      uploadForm.value.name = file.name;
    }
  }
}

function handleDrop(event) {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    selectedFile.value = file;
    if (!uploadForm.value.name) {
      uploadForm.value.name = file.name;
    }
  }
}

async function uploadAndAttach() {
  if (!canUpload.value) return;

  uploading.value = true;
  uploadProgress.value = 0;

  try {
    const tenantId = getTenantId();
    
    // Create FormData for file upload (matching DocumentUploadModal implementation)
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('name', uploadForm.value.name);
    formData.append('category', uploadForm.value.category);
    formData.append('linked_to_type', props.recordType);
    formData.append('linked_to_id', props.recordId);
    
    if (uploadForm.value.description) {
      formData.append('description', uploadForm.value.description);
    }

    // Track upload progress
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10;
      }
    }, 100);

    // Upload document with actual file
    await documentsApi.uploadDocument(formData, tenantId);
    
    clearInterval(progressInterval);
    uploadProgress.value = 100;
    
    // Emit success
    emit('attached');
    
    setTimeout(() => {
      close();
    }, 300);
  } catch (error) {
    console.error('Failed to upload document:', error);
    alert('Failed to upload document. Please try again.');
  } finally {
    uploading.value = false;
    uploadProgress.value = 0;
  }
}

async function searchDocuments() {
  searchingDocs.value = true;
  try {
    const tenantId = getTenantId();
    const response = await documentsApi.getDocuments(tenantId, {
      search: searchQuery.value || undefined,
      per_page: 50
    });
    
    // Filter out documents already linked to this record
    availableDocuments.value = (response.items || []).filter(doc => 
      !doc.linked_to_type || doc.linked_to_type !== props.recordType || doc.linked_to_id !== props.recordId
    );
  } catch (error) {
    console.error('Failed to search documents:', error);
    availableDocuments.value = [];
  } finally {
    searchingDocs.value = false;
  }
}

function toggleDocSelection(doc) {
  const index = selectedDocIds.value.indexOf(doc._id);
  if (index > -1) {
    selectedDocIds.value.splice(index, 1);
  } else {
    selectedDocIds.value.push(doc._id);
  }
}

function isDocSelected(docId) {
  return selectedDocIds.value.includes(docId);
}

async function linkSelected() {
  if (selectedDocIds.value.length === 0) return;

  try {
    const tenantId = getTenantId();
    
    // Update each selected document to link to this record
    const promises = selectedDocIds.value.map(docId =>
      documentsApi.updateDocument(docId, {
        linked_to_type: props.recordType,
        linked_to_id: props.recordId
      }, tenantId)
    );

    await Promise.all(promises);
    
    emit('attached');
    close();
  } catch (error) {
    console.error('Failed to link documents:', error);
    alert('Failed to link documents. Please try again.');
  }
}

function close() {
  emit('update:modelValue', false);
  resetForm();
}

function resetForm() {
  mode.value = 'upload';
  selectedFile.value = null;
  uploadForm.value = {
    name: '',
    category: '',
    description: ''
  };
  searchQuery.value = '';
  availableDocuments.value = [];
  selectedDocIds.value = [];
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Auto-search on mount
searchDocuments();
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
  background-size: 12px 12px;
}
</style>
