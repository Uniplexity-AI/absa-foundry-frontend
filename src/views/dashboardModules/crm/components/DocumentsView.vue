<!-- DocumentsView.vue -->
<template>
  <div class="documents-view space-y-6 relative">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background opacity-[0.4]"></div>
    <!-- Header with Stats -->
    <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
      <div class="relative z-10">
        <h3 class="text-2xl font-black text-gray-900 font-display flex items-center gap-3 uppercase tracking-tight">
          <i class="fas fa-file-alt text-[#2F2E8B]"></i>
          Documents & Files
        </h3>
        <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">
          Centralized document management // system_ref: documents_core
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="showUploadModal = true"
          class="bg-white border border-[#2F2E8B] text-[#2F2E8B] font-bold font-mono text-[10px] rounded-none px-6 py-3 transition hover:bg-blue-50 flex items-center gap-2 uppercase tracking-wider"
        >
          <i class="fas fa-upload"></i>
          Upload Document
        </button>
        <button
          @click="showInvoiceModal = true"
          class="bg-[#2F2E8B] text-white font-bold font-mono text-[10px] rounded-none px-6 py-3 transition hover:opacity-90 flex items-center gap-2 uppercase tracking-wider shadow-md"
        >
          <i class="fas fa-file-invoice"></i>
          Create Invoice/Quote
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-none p-5 border border-gray-100 shadow-sm hover:shadow-md transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Documents</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ stats.total_documents || 0 }}</h4>
          </div>
          <div class="bg-gray-50 group-hover:bg-blue-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-blue-100">
            <i class="fas fa-file-alt text-gray-300 group-hover:text-[#2F2E8B] text-xl transition-colors"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-none p-5 border border-gray-100 shadow-sm hover:shadow-md transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Views</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ stats.total_views || 0 }}</h4>
          </div>
          <div class="bg-gray-50 group-hover:bg-purple-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-purple-100">
            <i class="fas fa-eye text-gray-300 group-hover:text-purple-500 text-xl transition-colors"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-none p-5 border border-gray-100 shadow-sm hover:shadow-md transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Downloads</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ stats.total_downloads || 0 }}</h4>
          </div>
          <div class="bg-gray-50 group-hover:bg-green-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-green-100">
            <i class="fas fa-download text-gray-300 group-hover:text-green-500 text-xl transition-colors"></i>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-none p-5 border border-gray-100 shadow-sm hover:shadow-md transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Folders</p>
            <h4 class="text-2xl font-black text-gray-900 font-display mt-1">{{ folders.length }}</h4>
          </div>
          <div class="bg-gray-50 group-hover:bg-yellow-50 p-3 rounded-none transition-colors border border-transparent group-hover:border-yellow-100">
            <i class="fas fa-folder text-gray-300 group-hover:text-yellow-500 text-xl transition-colors"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="relative overflow-hidden bg-white border border-gray-100 p-4 rounded-none shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <!-- Search -->
        <div class="lg:col-span-2 relative">
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            @input="debouncedSearch"
            type="text"
            placeholder="Search documents by name, tags, description..."
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-none text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono"
          />
        </div>

        <!-- Folder Filter -->
        <select
          v-model="folderFilter"
          @change="loadDocuments"
          class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono"
        >
          <option value="">All Folders</option>
          <option v-for="folder in folders" :key="folder" :value="folder">{{ folder }}</option>
        </select>

        <!-- Category Filter -->
        <select
          v-model="categoryFilter"
          @change="loadDocuments"
          class="rounded-none border border-gray-200 px-4 py-2.5 text-sm focus:border-brand focus:ring-1 focus:ring-brand font-mono"
        >
          <option value="">All Categories</option>
          <option value="contract">Contracts</option>
          <option value="invoice">Invoices</option>
          <option value="proposal">Proposals</option>
          <option value="quotation">Quotations</option>
          <option value="presentation">Presentations</option>
          <option value="other">Other</option>
        </select>

        <!-- View Toggle -->
        <div class="flex items-center gap-1 border border-gray-200 rounded-none p-1">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-brand text-white' : 'text-gray-400 hover:text-brand hover:bg-brand/5'"
            class="flex-1 px-3 py-1.5 rounded-none transition-all flex items-center justify-center"
          >
            <i class="fas fa-th text-xs"></i>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-brand text-white' : 'text-gray-400 hover:text-brand hover:bg-brand/5'"
            class="flex-1 px-3 py-1.5 rounded-none transition-all flex items-center justify-center"
          >
            <i class="fas fa-list text-xs"></i>
          </button>
        </div>
      </div>

      <!-- Quick Filters -->
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          v-for="quickFilter in quickFilters"
          :key="quickFilter.value"
          @click="applyQuickFilter(quickFilter.value)"
          :class="linkedToFilter === quickFilter.value ? 'bg-brand text-white border-brand shadow-sm' : 'bg-white text-gray-400 border-gray-200 hover:border-brand hover:text-brand hover:bg-brand/5'"
          class="px-4 py-2 border rounded-none text-[9px] font-mono font-bold uppercase tracking-wider transition-all"
        >
          <i :class="quickFilter.icon" class="mr-2"></i>
          {{ quickFilter.label }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12 relative z-10">
      <div class="animate-spin rounded-none h-12 w-12 border-b-2 border-[#2F2E8B]"></div>
    </div>

    <!-- Grid View -->
    <div v-else-if="viewMode === 'grid' && documents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="doc in documents"
        :key="doc._id"
        @click="viewDocument(doc)"
        class="group bg-white rounded-none shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      >
        <!-- File Icon Header -->
        <div class="bg-gray-50/50 border-b border-gray-100 p-8 flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none"></div>
          <div class="absolute top-3 right-3 z-10">
            <span :class="getCategoryBadgeClass(doc.category)" class="px-2 py-1 rounded-none text-[8px] font-black font-mono uppercase tracking-widest border bg-white">
              {{ doc.category || 'other' }}
            </span>
          </div>
          <i :class="getFileIcon(doc.file_type)" class="text-6xl text-gray-300 group-hover:text-brand transition-colors relative z-10"></i>
        </div>

        <!-- Document Info -->
        <div class="p-4 flex-1 space-y-3">
          <h4 class="text-[11px] font-black text-gray-900 uppercase tracking-tight truncate group-hover:text-brand transition" :title="doc.name">
            {{ doc.name }}
          </h4>

          <!-- Tags -->
          <div v-if="doc.tags && doc.tags.length > 0" class="flex flex-wrap gap-1">
            <span v-for="tag in doc.tags.slice(0, 3)" :key="tag" class="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-mono font-bold text-gray-400 uppercase">
              {{ tag }}
            </span>
            <span v-if="doc.tags.length > 3" class="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[8px] font-mono font-bold text-gray-400 uppercase">
              +{{ doc.tags.length - 3 }}
            </span>
          </div>

          <!-- Linked To -->
          <div v-if="doc.linked_to_type" class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-500 uppercase">
            <i :class="getLinkedIcon(doc.linked_to_type)" class="text-brand"></i>
            <span>{{ doc.linked_to_type }}</span>
          </div>

          <!-- File Size & Type -->
          <div class="flex items-center justify-between text-[9px] font-mono font-bold text-gray-400 pt-2 border-t border-gray-50">
            <span>{{ formatFileSize(doc.file_size) }}</span>
            <span class="uppercase">{{ doc.file_type }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-gray-50/50 px-4 py-3 flex items-center justify-between border-t border-gray-100">
          <span class="text-[8px] font-mono font-black text-gray-300 uppercase">
            v{{ doc.version }}
          </span>
          <div class="flex gap-1">
            <button
              @click.stop="downloadDocument(doc)"
              class="p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors"
              title="Download"
            >
              <i class="fas fa-download text-xs"></i>
            </button>
            <button
              @click.stop="shareDocument(doc)"
              class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="Share"
            >
              <i class="fas fa-share-alt text-xs"></i>
            </button>
            <button
              @click.stop="editDocument(doc)"
              class="p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors"
              title="Edit"
            >
              <i class="fas fa-edit text-xs"></i>
            </button>
            <button
              @click.stop="deleteDoc(doc)"
              class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else-if="viewMode === 'list' && documents.length > 0" class="relative overflow-hidden bg-white border border-gray-100 rounded-none shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100">
              <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Document</th>
              <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Linked To</th>
              <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Size</th>
              <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Stats</th>
              <th class="py-3 px-6 text-left text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Uploaded</th>
              <th class="py-3 px-6 text-right text-[8px] font-mono font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="doc in documents" :key="doc._id" 
                class="hover:bg-gray-50/50 transition-colors group cursor-pointer" 
                @click="viewDocument(doc)">
              <td class="py-3 px-6">
                <div class="flex items-center gap-3">
                  <i :class="getFileIcon(doc.file_type)" class="text-xl text-gray-300 group-hover:text-brand transition-colors"></i>
                  <div>
                    <div class="text-[10px] font-mono font-bold text-gray-700 uppercase">{{ doc.name }}</div>
                    <div class="text-[8px] font-mono text-gray-400 uppercase">{{ doc.file_type }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-6">
                <span :class="getCategoryBadgeClass(doc.category)" class="px-2 py-1 rounded-none text-[8px] font-black font-mono uppercase tracking-widest border">
                  {{ doc.category || 'other' }}
                </span>
              </td>
              <td class="py-3 px-6">
                <div v-if="doc.linked_to_type" class="flex items-center gap-2 text-[10px] font-mono font-bold text-gray-500 uppercase">
                  <i :class="getLinkedIcon(doc.linked_to_type)" class="text-brand"></i>
                  <span>{{ doc.linked_to_type }}</span>
                </div>
                <span v-else class="text-gray-300">-</span>
              </td>
              <td class="py-3 px-6 text-[10px] font-mono text-gray-500">
                {{ formatFileSize(doc.file_size) }}
              </td>
              <td class="py-3 px-6">
                <div class="flex items-center gap-3 text-[10px] font-mono text-gray-500">
                  <span title="Views"><i class="fas fa-eye text-gray-300 mr-1"></i>{{ doc.views }}</span>
                  <span title="Downloads"><i class="fas fa-download text-gray-300 mr-1"></i>{{ doc.downloads }}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-[10px] font-mono text-gray-500">
                {{ formatDate(doc.created_at) }}
              </td>
              <td class="py-3 px-6 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button @click.stop="downloadDocument(doc)" class="p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors" title="Download"><i class="fas fa-download text-xs"></i></button>
                  <button @click.stop="shareDocument(doc)" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Share"><i class="fas fa-share-alt text-xs"></i></button>
                  <button @click.stop="editDocument(doc)" class="p-1.5 text-gray-400 hover:text-brand hover:bg-brand/5 transition-colors" title="Edit"><i class="fas fa-edit text-xs"></i></button>
                  <button @click.stop="deleteDoc(doc)" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete"><i class="fas fa-trash text-xs"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && documents.length === 0" class="bg-white border border-gray-100 p-12 text-center rounded-none shadow-sm relative overflow-hidden">
      <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
      <div class="relative z-10">
        <div class="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-file-alt text-2xl text-gray-200"></i>
        </div>
        <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight mb-2">No documents found</h3>
      <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-8 max-w-md mx-auto">
        {{ searchQuery ? 'Try adjusting your search or filters' : 'Start organizing your documents by uploading your first file' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="showUploadModal = true"
        class="bg-brand text-white font-bold font-mono text-[10px] rounded-none px-8 py-3 transition hover:opacity-90 inline-flex items-center gap-3 uppercase tracking-wider shadow-md"
      >
        <i class="fas fa-upload"></i>
        <span>Upload Your First Document</span>
      </button>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="documents.length > 0" class="px-4 py-3 bg-white border border-gray-100 rounded-none shadow-sm flex justify-between items-center relative z-10">
      <div class="text-[9px] font-mono text-gray-400 uppercase font-bold tracking-widest">
        Showing {{ (currentPage - 1) * perPage + 1 }} to {{ Math.min(currentPage * perPage, totalDocs) }} of {{ totalDocs }}
      </div>
      <div class="flex gap-2">
        <button 
          @click="previousPage" 
          :disabled="currentPage === 1" 
          class="px-4 py-1.5 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50 transition-all rounded-none tracking-widest"
        >
          Prev
        </button>
        <span class="px-4 py-1.5 text-[9px] font-mono font-bold text-[#2F2E8B] border border-blue-100 bg-blue-50/50 uppercase tracking-widest">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          @click="nextPage" 
          :disabled="currentPage >= totalPages" 
          class="px-4 py-1.5 border border-gray-200 text-[9px] font-mono font-bold uppercase disabled:opacity-30 hover:bg-gray-50 transition-all rounded-none tracking-widest"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modals -->
    <DocumentUploadModal v-model="showUploadModal" @uploaded="handleDocumentUploaded" />
    <DocumentDetailModal v-model="showDetailModal" :document="selectedDocument" @refresh="loadDocuments" />
    <DocumentShareModal v-model="showShareModal" :document="documentToShare" @shared="loadDocuments" />
    <DocumentEditModal v-model="showEditModal" :document="documentToEdit" @updated="loadDocuments" />
    <InvoiceCreationModal 
      v-model="showInvoiceModal" 
      @created="handleInvoiceCreated" 
      @subscription-required="showSubscriptionModal = true"
    />
    <SubscriptionRequiredModal 
      v-model="showSubscriptionModal"
      moduleId="invoicing"
      moduleName="Invoicing Module"
      featureName="Create Invoice/Quote"
      :modulePrice="8.00"
      @requested="handleSubscriptionRequested"
    />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <div class="bg-white rounded-none shadow-2xl max-w-md w-full overflow-hidden animate-scale-in border-t-4 border-red-600">
        <div class="p-8">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-red-50 flex items-center justify-center border border-red-100">
              <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
            </div>
            <h3 class="text-xl font-black text-gray-900 font-display uppercase tracking-tight">Delete Document</h3>
          </div>
          <p class="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
            Are you sure you want to delete <span class="text-gray-900">"{{ documentToDelete?.name }}"</span>? 
            This action cannot be undone and the file will be permanently removed.
          </p>
        </div>
        <div class="bg-gray-50 px-8 py-4 flex justify-end gap-3 border-t border-gray-100">
          <button
            @click="showDeleteConfirm = false"
            class="px-6 py-2 border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-100 text-[10px] font-bold font-mono uppercase transition-all rounded-none"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-6 py-2 bg-red-600 text-white font-bold font-mono text-[10px] uppercase hover:bg-red-700 transition-all shadow-md rounded-none"
          >
            Delete Document
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { emit as emitCrmEvent } from '@/events/crmEvents.js';
import * as documentsApi from '@/api_services/documents_api';
import { API_BASE_URL } from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import DocumentUploadModal from './DocumentUploadModal.vue';
import DocumentDetailModal from './DocumentDetailModal.vue';
import DocumentShareModal from './DocumentShareModal.vue';
import DocumentEditModal from './DocumentEditModal.vue';
import InvoiceCreationModal from './InvoiceCreationModal.vue';
import SubscriptionRequiredModal from './SubscriptionRequiredModal.vue';

const { getTenantId } = decodeJWT();
const router = useRouter();

// State
const documents = ref([]);
const folders = ref([]);
const stats = ref({});
const loading = ref(false);
const searchQuery = ref('');
const folderFilter = ref('');
const categoryFilter = ref('');
const linkedToFilter = ref('');
const viewMode = ref('grid');
const currentPage = ref(1);
const perPage = ref(24);
const totalDocs = ref(0);

// Modal states
const showUploadModal = ref(false);
const showDetailModal = ref(false);
const showShareModal = ref(false);
const showEditModal = ref(false);
const showInvoiceModal = ref(false);
const showSubscriptionModal = ref(false);
const showDeleteConfirm = ref(false);

const selectedDocument = ref(null);
const documentToShare = ref(null);
const documentToEdit = ref(null);
const documentToDelete = ref(null);

// Quick filters
const quickFilters = [
  { label: 'All Documents', value: '', icon: 'fas fa-file-alt' },
  { label: 'Linked to Leads', value: 'lead', icon: 'fas fa-user-plus' },
  { label: 'Linked to Contacts', value: 'contact', icon: 'fas fa-address-book' },
  { label: 'Linked to Accounts', value: 'account', icon: 'fas fa-building' },
  { label: 'Linked to Deals', value: 'deal', icon: 'fas fa-handshake' },
];

// Computed
const totalPages = computed(() => Math.ceil(totalDocs.value / perPage.value));

// Methods
async function loadDocuments() {
  loading.value = true;
  try {
    const tenantId = getTenantId();
    const params = {
      page: currentPage.value,
      per_page: perPage.value,
      search: searchQuery.value || undefined,
      folder: folderFilter.value || undefined,
      category: categoryFilter.value || undefined,
      linked_to_type: linkedToFilter.value || undefined,
    };

    const response = await documentsApi.getDocuments(tenantId, params);
    documents.value = response.items || [];
    totalDocs.value = response.total || 0;
  } catch (error) {
    console.error('Failed to load documents:', error);
    documents.value = [];
    totalDocs.value = 0;
  } finally {
    loading.value = false;
  }
}

async function loadFolders() {
  try {
    const tenantId = getTenantId();
    const folderList = await documentsApi.getFolders(tenantId);
    folders.value = Array.isArray(folderList) ? folderList : [];
  } catch (error) {
    console.error('Failed to load folders:', error);
    folders.value = [];
  }
}

async function loadStats() {
  try {
    const tenantId = getTenantId();
    const docStats = await documentsApi.getDocumentStats(tenantId);
    stats.value = docStats || {};
  } catch (error) {
    console.error('Failed to load stats:', error);
    stats.value = {};
  }
}

let searchTimeout = null;
function debouncedSearch() {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    loadDocuments();
  }, 500);
}

function applyQuickFilter(value) {
  linkedToFilter.value = value;
  currentPage.value = 1;
  loadDocuments();
}

function viewDocument(doc) {
  selectedDocument.value = doc;
  showDetailModal.value = true;
}

async function downloadDocument(doc) {
  try {
    const tenantId = getTenantId();
    const docId = doc?._id || doc?.id;
    if (!docId) {
      alert('Document ID is missing');
      return;
    }
    
    // Check if this is an invoice reference (no actual file)
    if (doc.file_type === 'invoice_ref') {
      // This is an invoice/quote reference - fetch from invoicing module
      const invoiceData = await documentsApi.downloadInvoicePdf(docId, tenantId);
      
      if (invoiceData.download_endpoint) {
        // Direct download via endpoint
        const downloadUrl = `${API_BASE_URL}${invoiceData.download_endpoint}`;
        window.open(downloadUrl, '_blank');
      } else {
        // Fallback to invoicing module
        if (confirm('Direct PDF generation not available from here. Go to Invoicing Module?')) {
          router.push('/dashboard/invoicing');
        }
      }
      
      // Refresh to update download count
      loadDocuments();
    } else {
      // Regular document with file
      await documentsApi.trackDownload(docId, tenantId);
      
      // Open document in new tab
      if (doc.file_url) {
        const fullUrl = doc.file_url.startsWith('http') ? doc.file_url : `${API_BASE_URL}${doc.file_url}`;
        window.open(fullUrl, '_blank');
      } else {
        alert('No file URL available for this document');
      }
      
      // Refresh to update download count
      loadDocuments();
    }
  } catch (error) {
    console.error('Failed to download document:', error);
    alert('Failed to download document: ' + (error.message || 'Unknown error'));
  }
}

function shareDocument(doc) {
  documentToShare.value = doc;
  showShareModal.value = true;
}

function editDocument(doc) {
  documentToEdit.value = doc;
  showEditModal.value = true;
}

function deleteDoc(doc) {
  documentToDelete.value = doc;
  showDeleteConfirm.value = true;
}

async function confirmDelete() {
  try {
    const tenantId = getTenantId();
    const docId = documentToDelete.value?._id || documentToDelete.value?.id;
    if (!docId) {
      throw new Error('Document ID is missing');
    }
    await documentsApi.deleteDocument(docId, tenantId);
    showDeleteConfirm.value = false;
    documentToDelete.value = null;
    await loadDocuments();
    await loadStats();
    // Broadcast change
    emitCrmEvent('crm:documents:changed');
  } catch (error) {
    console.error('Failed to delete document:', error);
    alert('Failed to delete document');
  }
}

function handleDocumentUploaded() {
  loadDocuments();
  loadStats();
  loadFolders();
  emitCrmEvent('crm:documents:changed');
}

function handleInvoiceCreated(invoice) {
  // Invoice created - refresh documents
  loadDocuments();
  loadStats();
  emitCrmEvent('crm:documents:changed');
}

function handleSubscriptionRequested(result) {
  console.log('Subscription requested:', result);
  // Could show a success message or update UI
  // The SubscriptionRequiredModal already shows an alert
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadDocuments();
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadDocuments();
  }
}

// Utility functions
function getFileIcon(fileType) {
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
    'txt': 'fas fa-file-alt',
  };
  return icons[fileType?.toLowerCase()] || 'fas fa-file';
}

function getCategoryBadgeClass(category) {
  const classes = {
    'contract': 'bg-blue-50/50 border-blue-100 text-blue-600',
    'invoice': 'bg-green-50/50 border-green-100 text-green-600',
    'proposal': 'bg-purple-50/50 border-purple-100 text-purple-600',
    'quotation': 'bg-amber-50/50 border-amber-100 text-amber-600',
    'presentation': 'bg-pink-50/50 border-pink-100 text-pink-600',
    'other': 'bg-gray-50 border-gray-100 text-gray-400',
  };
  return classes[category] || 'bg-gray-50 border-gray-100 text-gray-400';
}

function getLinkedIcon(type) {
  const icons = {
    'lead': 'fas fa-user-plus',
    'contact': 'fas fa-address-book',
    'account': 'fas fa-building',
    'deal': 'fas fa-handshake',
    'campaign': 'fas fa-bullhorn',
  };
  return icons[type] || 'fas fa-link';
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
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Lifecycle
onMounted(() => {
  loadDocuments();
  loadFolders();
  loadStats();
});
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

.mesh-background {
  background-color: #ffffff;
  background-image: 
      linear-gradient(rgba(47, 46, 139, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(47, 46, 139, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
}

.dotted-pattern {
  background-image: radial-gradient(rgba(47, 46, 139, 0.2) 1px, transparent 1px);
  background-size: 12px 12px;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #2F2E8B;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #3D2F88;
}
</style>
