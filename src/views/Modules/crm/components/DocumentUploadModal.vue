<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-none shadow-2xl max-w-2xl w-full overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto border border-gray-200 relative">
            <!-- Header -->
      <div class="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 sticky top-0 z-10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight">
            Upload Document
          </h3>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 p-2 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-6 relative z-10">
        <!-- File Upload Area -->
        <div class="border-2 border-dashed border-gray-200 rounded-none p-8 text-center hover:border-[#2F2E8B] transition bg-gray-50/30 group">
          <input
            ref="fileInput"
            type="file"
            @change="handleFileSelect"
            class="hidden"
            accept="*/*"
          />
          <div v-if="!selectedFile">
            <i class="fas fa-cloud-upload-alt text-6xl text-gray-400 mb-4"></i>
            <p class="text-gray-700 font-semibold mb-2">Click to upload or drag and drop</p>
            <p class="text-sm text-gray-500">Any file type supported</p>
            <button
              @click="$refs.fileInput.click()"
              class="mt-4 px-8 py-3 bg-white border border-gray-200 text-gray-500 font-bold font-mono text-[10px] rounded-none hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition uppercase tracking-widest shadow-none"
            >
              Select File
            </button>
          </div>
          <div v-else class="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-none shadow-none relative overflow-hidden">
                        <div class="relative z-10 flex items-center gap-3">
              <i :class="getFileIcon(selectedFile.type)" class="text-3xl text-[#2F2E8B]"></i>
              <div class="text-left">
                <p class="font-black text-gray-900 font-display uppercase tracking-tight text-sm">{{ selectedFile.name }}</p>
                <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">{{ formatFileSize(selectedFile.size) }}</p>
              </div>
            </div>
            <button
              @click="selectedFile = null"
              class="text-red-500 hover:bg-red-50 p-2 rounded-none transition relative z-10"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Upload Progress -->
        <div v-if="uploading" class="space-y-2">
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>Uploading...</span>
            <span>{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-100 rounded-none h-1.5 overflow-hidden">
            <div
              class="bg-[#2F2E8B] h-full rounded-none transition-all duration-300"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>

        <!-- Document Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Name -->
          <div class="md:col-span-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Document Name *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="ENTER DOCUMENT NAME"
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
              required
            />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Category *</label>
            <select
              v-model="form.category"
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
              required
            >
              <option value="">SELECT CATEGORY</option>
              <option value="contract">CONTRACT</option>
              <option value="invoice">INVOICE</option>
              <option value="proposal">PROPOSAL</option>
              <option value="quotation">QUOTATION</option>
              <option value="presentation">PRESENTATION</option>
              <option value="other">OTHER</option>
            </select>
          </div>

          <!-- Folder -->
          <div>
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Folder</label>
            <input
              v-model="form.folder"
              type="text"
              placeholder="ENTER FOLDER NAME"
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
            />
          </div>

          <!-- Link to CRM Record -->
          <div>
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Link To</label>
            <select
              v-model="form.linked_to_type"
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
            >
              <option value="">NONE</option>
              <option value="lead">LEAD</option>
              <option value="contact">CONTACT</option>
              <option value="account">ACCOUNT</option>
              <option value="deal">DEAL</option>
              <option value="campaign">CAMPAIGN</option>
            </select>
          </div>

          <!-- Link ID -->
          <div v-if="form.linked_to_type">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Record ID</label>
            <input
              v-model="form.linked_to_id"
              type="text"
              placeholder="ENTER RECORD ID"
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
            />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="ENTER DOCUMENT DESCRIPTION"
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
            ></textarea>
          </div>

          <!-- Tags -->
          <div class="md:col-span-2">
            <label class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Tags</label>
            <input
              v-model="tagsInput"
              type="text"
              placeholder="ENTER TAGS SEPARATED BY COMMAS"
              class="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-none text-sm focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] font-mono"
            />
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2">Separate multiple tags with commas</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50/80 backdrop-blur-md px-6 py-4 flex justify-end gap-3 sticky bottom-0 border-t border-gray-100 relative z-20">
        <button
          @click="close"
          :disabled="uploading"
          class="px-8 py-3 border border-gray-200 text-gray-400 font-bold font-mono text-[10px] rounded-none hover:bg-gray-100 transition disabled:opacity-50 uppercase tracking-widest"
        >
          Cancel
        </button>
        <button
          @click="uploadDocument"
          :disabled="!canUpload || uploading"
          class="px-8 py-3 bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
        >
          <span v-if="!uploading">Execute Upload</span>
          <span v-else>Processing...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import * as documentsApi from '@/services/documents_api';
import { decodeJWT } from '@/services/decodeJWT.js';

const { getTenantId } = decodeJWT();

const props = defineProps({
  modelValue: Boolean,
  linkedEntity: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'uploaded']);

// State
const selectedFile = ref(null);
const uploading = ref(false);
const uploadProgress = ref(0);
const tagsInput = ref('');
const form = ref({
  name: '',
  category: '',
  folder: '',
  linked_to_type: '',
  linked_to_id: '',
  description: '',
});

const fileInput = ref(null);

// Computed
const canUpload = computed(() => {
  return selectedFile.value && form.value.name && form.value.category;
});

// Watch for linkedEntity prop to pre-populate form
watch(() => props.linkedEntity, (newEntity) => {
  if (newEntity && newEntity.type && newEntity.id) {
    form.value.linked_to_type = newEntity.type;
    form.value.linked_to_id = newEntity.id;
  }
}, { immediate: true });

// Methods
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    if (!form.value.name) {
      form.value.name = file.name;
    }
  }
}

async function uploadDocument() {
  if (!canUpload.value) return;

  uploading.value = true;
  uploadProgress.value = 0;

  try {
    const tenantId = getTenantId();
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('name', form.value.name);
    formData.append('category', form.value.category);
    
    if (form.value.folder) formData.append('folder', form.value.folder);
    if (form.value.linked_to_type) formData.append('linked_to_type', form.value.linked_to_type);
    if (form.value.linked_to_id) formData.append('linked_to_id', form.value.linked_to_id);
    if (form.value.description) formData.append('description', form.value.description);
    
    // Parse and add tags
    const tags = tagsInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }
    
    formData.append('file_type', selectedFile.value.name.split('.').pop().toLowerCase());
    formData.append('file_size', selectedFile.value.size.toString());

    // Upload document with progress tracking (supported via apiClient interceptors or options if implemented in api_services)
    // For now, simple call as we cleaned up the manual XHR
    await documentsApi.uploadDocument(formData, tenantId);
    
    uploadProgress.value = 100;
    
    // Emit success
    emit('uploaded');
    setTimeout(() => {
      close();
    }, 500);
  } catch (error) {
    console.error('Failed to upload document:', error);
    alert(`Failed to upload document: ${error.message || 'Please try again.'}`);
  } finally {
    uploading.value = false;
    uploadProgress.value = 0;
  }
}

function close() {
  emit('update:modelValue', false);
  resetForm();
}

function resetForm() {
  selectedFile.value = null;
  form.value = {
    name: '',
    category: '',
    folder: '',
    linked_to_type: '',
    linked_to_id: '',
    description: '',
  };
  tagsInput.value = '';
}

function getFileIcon(fileType) {
  const type = fileType.split('/')[1] || fileType;
  const icons = {
    'pdf': 'fas fa-file-pdf',
    'doc': 'fas fa-file-word',
    'docx': 'fas fa-file-word',
    'xls': 'fas fa-file-excel',
    'xlsx': 'fas fa-file-excel',
    'ppt': 'fas fa-file-powerpoint',
    'pptx': 'fas fa-file-powerpoint',
    'jpg': 'fas fa-file-image',
    'jpeg': 'fas fa-file-image',
    'png': 'fas fa-file-image',
    'gif': 'fas fa-file-image',
    'zip': 'fas fa-file-archive',
    'rar': 'fas fa-file-archive',
  };
  return icons[type] || 'fas fa-file';
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
</script>

<style scoped>
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out;
}

.dotted-pattern {
  background-image: radial-gradient(rgba(47, 46, 139, 0.2) 1px, transparent 1px);
  background-size: 12px 12px;
}
</style>
