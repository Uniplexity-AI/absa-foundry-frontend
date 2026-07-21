<template>
  <div class="linked-documents-widget">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 mt-2">
      <div class="flex items-center gap-2">
        <div class="w-1 h-3 bg-[#2F2E8B]"></div>
        <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">LINKED_ASSETS</h4>
        <span class="text-[9px] font-mono font-black text-[#2F2E8B]">[{{ documents.length }}]</span>
      </div>
      <div class="flex items-center gap-2">
        <!-- View toggle -->
        <div class="flex items-center gap-0.5 border border-gray-200 rounded-sm overflow-hidden">
          <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-[#2F2E8B] text-white' : 'bg-white text-gray-400 hover:text-[#2F2E8B]'" class="px-2 py-1 text-[9px] font-mono font-black transition"><i class="fas fa-th"></i></button>
          <button @click="viewMode = 'table'" :class="viewMode === 'table' ? 'bg-[#2F2E8B] text-white' : 'bg-white text-gray-400 hover:text-[#2F2E8B]'" class="px-2 py-1 text-[9px] font-mono font-black transition"><i class="fas fa-list"></i></button>
        </div>
        <button
          @click="captureCamera"
          class="px-3 py-1 bg-green-600 text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-sm hover:bg-green-700 transition flex items-center gap-2"
        >
          <i class="fas fa-camera"></i>
          TAKE_PICTURE
        </button>
        <button
          @click="showUploadModal = true"
          class="px-3 py-1 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-sm hover:bg-[#3D2F88] transition flex items-center gap-2"
        >
          <Plus :size="10" />
          ATTACH_NODE
        </button>
        <!-- Hidden camera input -->
        <input ref="cameraInputRef" type="file" accept="image/*" capture="environment" class="hidden" @change="onCameraCapture" />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F2E8B]"></div>
    </div>

    <!-- Documents Grid View (default) -->
    <div v-else-if="documents.length > 0 && viewMode === 'grid'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <div
        v-for="doc in documents"
        :key="doc._id"
        class="bg-white border border-gray-200 hover:border-[#2F2E8B]/40 transition group rounded-sm overflow-hidden cursor-pointer relative"
        @click="viewDocument(doc)"
      >
        <!-- Thumbnail / Icon Area -->
        <div class="aspect-[4/3] bg-gray-50 relative overflow-hidden flex items-center justify-center">
          <img v-if="isImageFile(doc.file_type)" :src="getDocumentUrl(doc)" :alt="doc.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            @error="$event.target.style.display = 'none'" />
          <div v-else class="flex flex-col items-center justify-center text-gray-300">
            <component :is="getFileLucideIcon(doc.file_type)" :size="32" class="text-gray-300" />
            <span class="text-[7px] font-mono font-bold text-gray-400 uppercase mt-1">{{ doc.file_type?.toUpperCase() || 'FILE' }}</span>
          </div>
          <!-- Category badge -->
          <span class="absolute top-1 left-1 px-1 py-0.5 bg-[#2F2E8B]/80 text-white text-[6px] font-mono font-black uppercase tracking-widest rounded-sm">{{ doc.category || 'FILE' }}</span>
        </div>
        <!-- Info -->
        <div class="p-1.5">
          <p class="text-[8px] font-mono font-black text-gray-900 uppercase truncate">{{ doc.name }}</p>
          <p class="text-[7px] font-mono text-gray-400 mt-0.5">{{ formatFileSize(doc.file_size) }} // {{ formatDate(doc.created_at) }}</p>
        </div>
        <!-- Actions (always visible) -->
        <div class="flex items-center justify-center gap-2 p-1.5 border-t border-gray-100 bg-gray-50/50">
          <button @click.stop="viewDocument(doc)" class="w-6 h-6 bg-white border border-gray-200 rounded-sm flex items-center justify-center text-[#2F2E8B] hover:bg-[#2F2E8B] hover:text-white hover:border-[#2F2E8B] transition" title="View"><Eye :size="10" /></button>
          <button @click.stop="downloadDocument(doc)" class="w-6 h-6 bg-white border border-gray-200 rounded-sm flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition" title="Download"><Download :size="10" /></button>
          <button @click.stop="deleteDocument(doc)" class="w-6 h-6 bg-white border border-gray-200 rounded-sm flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition" title="Delete"><Trash2 :size="10" /></button>
        </div>
      </div>
    </div>

    <!-- Documents Table View -->
    <div v-else-if="documents.length > 0 && viewMode === 'table'" class="space-y-2">
      <div
        v-for="doc in documents"
        :key="doc._id"
        class="flex items-center justify-between gap-2 p-3 bg-white border border-gray-100 hover:border-[#2F2E8B]/30 transition group rounded-sm"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="w-8 h-8 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center text-[#2F2E8B] flex-shrink-0">
            <component :is="getFileLucideIcon(doc.file_type)" :size="16" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-mono font-black text-gray-900 uppercase truncate tracking-tight">{{ doc.name }}</p>
            <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[8px] font-mono text-gray-400 mt-1 uppercase tracking-tighter">
              <span class="font-black text-[#2F2E8B]">{{ doc.category || 'OBJECT' }}</span>
              <span class="text-gray-300">//</span>
              <span>{{ formatFileSize(doc.file_size) }}</span>
              <span class="text-gray-300 hidden sm:inline">//</span>
              <span class="hidden sm:inline">{{ formatDate(doc.created_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1 flex-shrink-0">
          <button
            @click="viewDocument(doc)"
            class="p-1.5 text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-sm transition"
            title="View"
          >
            <Eye :size="12" />
          </button>
          <button
            @click="downloadDocument(doc)"
            class="p-1.5 text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200 rounded-sm transition"
            title="Download"
          >
            <Download :size="12" />
          </button>
          <button
            @click="deleteDocument(doc)"
            class="p-1.5 text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-sm transition"
            title="Delete"
          >
            <Trash2 :size="12" />
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-gray-50/50 border border-dashed border-gray-200 rounded-sm">
      <FileText :size="24" class="text-gray-200 mx-auto mb-3" />
      <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">ZERO_DOCUMENTS_ATTACHED</p>
      <button
        @click="showUploadModal = true"
        class="text-[#2F2E8B] hover:text-[#3D2F88] text-[9px] font-mono font-black uppercase tracking-[0.2em] border border-[#2F2E8B]/20 px-4 py-1.5 rounded-sm hover:bg-blue-50 transition-all"
      >
        INITIALIZE_ATTACHMENT
      </button>
    </div>

    <!-- Upload Modal -->
    <DocumentAttachModal
      v-model="showUploadModal"
      :recordType="recordType"
      :recordId="recordId"
      :recordName="recordName"
      @attached="handleDocumentAttached"
    />

    <!-- View Modal -->
    <DocumentQuickViewModal
      v-model="showViewModal"
      :document="selectedDocument"
      @refresh="loadDocuments"
    />

    <!-- Delete Confirm Dialog -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="closeDeleteConfirm">
        <div class="bg-white w-full max-w-md mx-4 border border-gray-200 shadow-2xl overflow-hidden">
          <div class="h-1.5 w-full bg-red-600"></div>
          <div class="p-6">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-red-50 border border-red-200 flex items-center justify-center">
                <Trash2 :size="16" class="text-red-600" />
              </div>
              <div>
                <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">DELETE DOCUMENT</p>
                <p class="text-sm font-semibold text-gray-800">Permanently delete "{{ deleteTarget?.name || 'this document' }}"?</p>
                <p class="text-[10px] text-gray-400 mt-2 font-mono leading-relaxed">This action cannot be undone. The file will be permanently removed.</p>
              </div>
            </div>
          </div>
          <div class="px-6 pb-5 flex justify-end gap-3">
            <button type="button" @click="closeDeleteConfirm" :disabled="deletingDoc" class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
              CANCEL
            </button>
            <button type="button" @click="confirmDeleteDoc" :disabled="deletingDoc" class="px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2">
              <Loader2 v-if="deletingDoc" :size="12" class="animate-spin" />
              {{ deletingDoc ? 'DELETING...' : 'DELETE' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { 
  FileText, Plus, Loader2, Eye, Download, Trash2, 
  FileBox, FileArchive, Image as ImageIcon, FileSpreadsheet, 
  FileCode, File as FileIcon 
} from 'lucide-vue-next';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import * as documentsApi from '@/api_services/documents_api';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import DocumentAttachModal from './DocumentAttachModal.vue';
import DocumentQuickViewModal from './DocumentQuickViewModal.vue';

const { getTenantId, getToken } = decodeJWT();
const router = useRouter();

const props = defineProps({
  recordType: {
    type: String,
    required: true,
    validator: (value) => ['lead', 'contact', 'account', 'deal'].includes(value)
  },
  recordId: {
    type: String,
    required: true
  },
  recordName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['documentsLoaded', 'documentAttached', 'documentDeleted']);

// State
const documents = ref([]);
const loading = ref(false);
const showUploadModal = ref(false);
const showViewModal = ref(false);
const selectedDocument = ref(null);
const viewMode = ref('grid');
const cameraInputRef = ref(null);
const uploadingCamera = ref(false);

// Delete confirm state
const showDeleteConfirm = ref(false);
const deleteTarget = ref(null);
const deletingDoc = ref(false);

function isImageFile(fileType) {
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(fileType?.toLowerCase());
}

function getDocumentUrl(doc) {
  const fileUrl = doc?.file_url;
  if (!fileUrl) return '';
  return fileUrl.startsWith('http') ? fileUrl : `${API_BASE_URL}${fileUrl}`;
}

function captureCamera() {
  cameraInputRef.value?.click();
}

async function onCameraCapture(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  uploadingCamera.value = true;
  try {
    const tenantId = getTenantId();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name.replace(/\.[^/.]+$/, '').toUpperCase() || 'CAMERA_CAPTURE');
    formData.append('category', 'photo');
    formData.append('linked_to_type', props.recordType);
    formData.append('linked_to_id', props.recordId);
    await documentsApi.uploadDocument(formData, tenantId);
    emit('documentAttached');
    await loadDocuments();
  } catch (error) {
    console.error('Failed to upload camera capture:', error);
    alert('Failed to upload captured image.');
  } finally {
    uploadingCamera.value = false;
    event.target.value = '';
  }
}

// Methods
async function loadDocuments() {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    
    // 1. Fetch uploaded documents (existing logic)
    const uploadedDocsPromise = documentsApi.getDocuments(tenantId, {
      linked_to_type: props.recordType,
      linked_to_id: props.recordId
    });

    // 2. Fetch Invoicing documents (new logic)
    // We try to match by CRM link (future proofing) or by naive email/name matching if needed
    // For now, we'll fetch all likely candidates and filter client-side if the API doesn't support direct filtering yet
    const invoicingDocsPromise = fetchInvoicingDocs(tenantId);

    const [uploadedDocsResponse, invoicingDocs] = await Promise.all([
      uploadedDocsPromise,
      invoicingDocsPromise
    ]);

    const uploadedItems = uploadedDocsResponse.items || [];
    
    // Merge and sort by date desc
    documents.value = [...uploadedItems, ...invoicingDocs].sort((a, b) => {
      return new Date(b.created_at || b.date) - new Date(a.created_at || a.date);
    });

    emit('documentsLoaded', documents.value.length);
  } catch (error) {
    console.error('Failed to load documents:', error);
    documents.value = [];
  } finally {
    loading.value = false;
  }
}

async function fetchInvoicingDocs(tenantId) {
  try {
    // Only attempt if we have a valid record ID
    if (!props.recordId) return [];

    // Helper to fetch from an endpoint
    const fetchEndpoint = async (endpoint, typeLabel) => {
      try {
        const separator = endpoint.includes('?') ? '&' : '?';
        const res = await fetch(`${API_BASE_URL}/${endpoint}${separator}tenant_id=${tenantId}`, {
          headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!res.ok) return [];
        const data = await res.json();
        const items = Array.isArray(data) ? data : (data.items || data.data || []);
        
        // Filter items that belong to this CRM record
        // This logic assumes the backend might not filter by crm_id directly yet, 
        // so we check if the item has knowledge of this connection, 
        // OR if needed, we could match by email/name context if available.
        // Ideally, we rely on 'linkedToId' matching props.recordId and 'linkedToType' matching props.recordType
        return items.filter(item => {
          // Check explicit link
          if (item.linkedToType === props.recordType && item.linkedToId === props.recordId) return true;
          if (item.linked_to_type === props.recordType && item.linked_to_id === props.recordId) return true;
          
          // Fallback: Check if client ID matches (for accounts/contacts often used as clients)
          if (props.recordType === 'account' || props.recordType === 'contact') {
             if (item.clientId === props.recordId || item.client_id === props.recordId) return true;
          }
          
          return false;
        }).map(item => ({
          ...item,
          _id: item.id || item._id, // Normalize ID
          name: item.title || item.invoiceNumber || `Document ${item.id}`,
          file_type: typeLabel === 'invoice' ? 'pdf' : (typeLabel === 'contract' ? 'pdf' : 'pdf'), // Default to PDF rep
          category: typeLabel,
          created_at: item.date || item.created_at,
          isInvoicingDoc: true, // Flag to handle click differently
          docType: typeLabel // 'invoice', 'proposal', etc.
        }));
      } catch (e) {
        console.warn(`Failed to fetch ${typeLabel}`, e);
        return [];
      }
    };

    const [invoices, quotations, proposals, contracts, reports] = await Promise.all([
      fetchEndpoint('invoices/?type=invoice', 'invoice'),
      fetchEndpoint('invoices/?type=quotation', 'quotation'),
      fetchEndpoint('invoices/proposals', 'proposal'),
      fetchEndpoint('invoices/contracts', 'contract'),
      fetchEndpoint('invoices/progress-reports', 'progress-report')
    ]);

    return [...invoices, ...quotations, ...proposals, ...contracts, ...reports];

  } catch (error) {
    console.error('Error fetching invoicing docs:', error);
    return [];
  }
}

function viewDocument(doc) {
  if (doc.isInvoicingDoc) {
    // Redirect to InvoicingModule with special query params to open this doc
    router.push({
      name: 'Invoicing', 
      query: { 
        openDocId: doc._id || doc.id, 
        docType: doc.docType 
      }
    });
  } else {
    selectedDocument.value = doc;
    showViewModal.value = true;
  }
}

async function downloadDocument(doc) {
  try {
    const tenantId = getTenantId();
    const docId = doc?._id || doc?.id;
    if (docId && !doc?.isInvoicingDoc) {
      await documentsApi.trackDownload(docId, tenantId);
    }
    const fileUrl = doc?.file_url;
    if (!fileUrl) {
      alert('No file URL available for this document');
      return;
    }
    const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${API_BASE_URL}${fileUrl}`;
    window.open(fullUrl, '_blank');
    loadDocuments();
  } catch (error) {
    console.error('Failed to download document:', error);
  }
}

async function unlinkDocument(doc) {
  if (doc?.isInvoicingDoc) {
    alert('Invoicing references cannot be unlinked from this view. Please manage them in Invoicing.');
    return;
  }
  if (!confirm(`Unlink "${doc.name}" from this ${props.recordType}?`)) return;

  try {
    const tenantId = getTenantId();
    const docId = doc?._id || doc?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await documentsApi.updateDocument(docId, {
      linked_to_type: null,
      linked_to_id: null
    }, tenantId);
    await loadDocuments();
  } catch (error) {
    console.error('Failed to unlink document:', error);
    alert('Failed to unlink document');
  }
}

async function deleteDocument(doc) {
  if (doc?.isInvoicingDoc) {
    alert('Invoicing references cannot be deleted from this view.');
    return;
  }
  deleteTarget.value = doc;
  showDeleteConfirm.value = true;
}

function closeDeleteConfirm() {
  showDeleteConfirm.value = false;
  deleteTarget.value = null;
}

async function confirmDeleteDoc() {
  const doc = deleteTarget.value;
  if (!doc) return;
  deletingDoc.value = true;
  try {
    const tenantId = getTenantId();
    const docId = doc?._id || doc?.id;
    if (!docId) throw new Error('Document ID is missing');
    await documentsApi.deleteDocument(docId, tenantId);
    emit('documentDeleted', doc.name);
    closeDeleteConfirm();
    await loadDocuments();
  } catch (error) {
    console.error('Failed to delete document:', error);
    alert('Failed to delete document');
    closeDeleteConfirm();
  } finally {
    deletingDoc.value = false;
  }
}

function handleDocumentAttached() {
  loadDocuments();
  emit('documentAttached');
}

// Utility functions
function getFileLucideIcon(fileType) {
  const icons = {
    'pdf': FileText,
    'doc': FileBox,
    'docx': FileBox,
    'xls': FileSpreadsheet,
    'xlsx': FileSpreadsheet,
    'ppt': FileBox,
    'pptx': FileBox,
    'jpg': ImageIcon,
    'jpeg': ImageIcon,
    'png': ImageIcon,
    'gif': ImageIcon,
    'zip': FileArchive,
    'txt': FileCode,
  };
  return icons[fileType?.toLowerCase()] || FileIcon;
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
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Watch for prop changes
watch(() => [props.recordType, props.recordId], () => {
  if (props.recordId) {
    loadDocuments();
  }
}, { immediate: true });

// Lifecycle
onMounted(() => {
  if (props.recordId) {
    loadDocuments();
  }
});
</script>

<style scoped>
.linked-documents-widget {
  max-height: 400px;
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}
</style>
