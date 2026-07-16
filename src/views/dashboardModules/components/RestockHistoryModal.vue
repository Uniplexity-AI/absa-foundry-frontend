<template>
  <Teleport to="body">
  <!-- Modal Container with backdrop -->
  <div class="fixed inset-0 z-[9999] overflow-hidden">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" @click="$emit('close')"></div>
    
    <!-- Modal Content Centered -->
    <div class="fixed inset-0 flex items-center justify-center p-2 md:p-6 pointer-events-none">
      <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-6xl flex flex-col max-h-[95vh] rounded-none pointer-events-auto">
        <!-- Header -->
      <div class="h-1.5 w-full bg-[#2F2E8B]"></div>
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-indigo-50 flex items-center justify-center text-[#2F2E8B] rounded-none">
            <i class="fas fa-history"></i>
          </div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Inventory Logs</div>
            <div class="text-sm font-black text-gray-900 uppercase tracking-tight">Stock History</div>
          </div>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <!-- Content -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <div class="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
          <!-- Audit Filters -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 p-4 bg-gray-50 border border-gray-100 rounded-none">
            <div class="space-y-2">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Branch</label>
              <select v-model="filters.branchId" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none appearance-none">
                <option value="main">Main Branch</option>
                <option v-for="b in branches" :key="b.id || b._id" :value="b.id || b._id">{{ b.name }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
              <input v-model="filters.startDate" type="date" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none" />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
              <input v-model="filters.endDate" type="date" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none" />
            </div>

            <div class="space-y-2">
              <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Filter Type</label>
              <select v-model="filters.itemType" class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none appearance-none">
                <option value="">All Types</option>
                <option value="Product">Products</option>
                <option value="Equipment">Equipment</option>
                <option value="Service">Services</option>
              </select>
            </div>

            <div class="flex items-end gap-2">
              <button @click="fetchHistory" class="flex-1 h-10 bg-[#2F2E8B] text-white text-[9px] font-mono font-black uppercase tracking-widest rounded-none hover:bg-[#1D226B] shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2">
                <i class="fas fa-sync-alt"></i> Update
              </button>
              <button @click="exportToExcel" :disabled="loading || history.length === 0" class="h-10 w-12 bg-emerald-600 text-white rounded-none hover:bg-emerald-700 transition-all flex items-center justify-center disabled:opacity-30">
                <i class="fas fa-file-excel"></i>
              </button>
            </div>
          </div>

          <!-- Log Table -->
          <div class="border border-gray-100 rounded-none overflow-hidden flex-1 flex flex-col min-h-0 bg-white">
            <div v-if="loading" class="flex flex-col items-center justify-center py-24 bg-gray-50/10 flex-1">
              <div class="w-12 h-12 border-2 border-indigo-100 border-t-[#2F2E8B] rounded-full animate-spin"></div>
              <p class="mt-4 text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Loading history...</p>
            </div>

            <div v-else-if="history.length === 0" class="flex flex-col items-center justify-center py-24 bg-gray-50/10 flex-1">
              <i class="fas fa-database text-gray-200 text-4xl mb-4"></i>
              <p class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">No history found</p>
            </div>

            <div v-else class="overflow-x-auto overflow-y-auto flex-1 custom-scrollbar">
              <table class="w-full font-mono text-[10px] min-w-[800px]">
                <thead class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
                <tr>
                  <th class="px-6 py-4 text-left font-black uppercase tracking-widest">Date & Time</th>
                  <th class="px-6 py-4 text-left font-black uppercase tracking-widest">Item Name</th>
                  <th class="px-6 py-4 text-left font-black uppercase tracking-widest">TYPE</th>
                  <th class="px-6 py-4 text-left font-black uppercase tracking-widest">SKU / Part No.</th>
                  <th class="px-4 py-4 text-right font-black uppercase tracking-widest">Added</th>
                  <th class="px-4 py-4 text-right font-black uppercase tracking-widest">Old Qty</th>
                  <th class="px-4 py-4 text-right font-black uppercase tracking-widest">New Qty</th>
                  <th class="px-6 py-4 text-left font-black uppercase tracking-widest">Source</th>
                  <th class="px-6 py-4 text-right font-black uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="(entry, index) in history" :key="entry.id" class="hover:bg-gray-50/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="font-black text-gray-900 uppercase">{{ formatDate(entry.timestamp) }}</div>
                    <div class="text-[8px] text-gray-400 mt-0.5">{{ formatTime(entry.timestamp) }}</div>
                  </td>
                  <td class="px-6 py-4 font-black text-gray-900 uppercase">{{ entry.item_name }}</td>
                  <td class="px-6 py-4">
                    <span :class="{'text-blue-600': entry.item_type === 'Product', 'text-purple-600': entry.item_type === 'Equipment', 'text-emerald-600': entry.item_type === 'Service'}" class="font-black uppercase text-[9px] tracking-tight">
                      {{ entry.item_type }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-gray-400 font-bold uppercase truncate max-w-[100px]">{{ entry.sku || entry.partNumber || '---' }}</td>
                  <td class="px-4 py-4 text-right font-black text-emerald-600">+{{ entry.quantity_added }}</td>
                  <td class="px-4 py-4 text-right font-bold text-gray-400">{{ entry.previous_qty }}</td>
                  <td class="px-4 py-4 text-right font-black text-gray-900">{{ entry.new_qty }}</td>
                  <td class="px-6 py-4">
                    <span :class="entry.source === 'bulk_import' ? 'text-indigo-600' : 'text-amber-600'" class="text-[9px] font-black uppercase tracking-tight">
                      {{ formatSource(entry.source) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button @click="restoreItem(entry.id)" class="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors" title="Restore Item to Inventory">
                        <i class="fas fa-trash-restore"></i> Restore
                      </button>

                      <button v-if="entry.status !== 'reverted'" @click="revertHistory(entry.id)" class="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-600 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors" title="Revert Stock Addition">
                        <i class="fas fa-undo"></i> Revert
                      </button>
                      <span v-else class="text-[9px] font-black text-gray-400 uppercase tracking-widest italic mr-2">Reverted</span>
                      
                      <button @click="deleteHistory(entry.id)" class="px-2 py-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors" title="Delete Log">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>

        <!-- Footer Stats (Sticky) -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-gray-50 border-t border-gray-100 shrink-0">
            <div class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
                Total logs found: <span class="text-gray-900 ml-1">{{ history.length }}</span>
            </div>
            <button @click="$emit('close')" class="w-full md:w-auto px-8 py-2.5 bg-[#2F2E8B] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-[#1D226B] shadow-lg shadow-indigo-100 transition-all">Close</button>
        </div>
      </div>
      </div>
    </div>
  </div>

  </Teleport>
</template>

<script setup>
import { ref, onMounted, onErrorCaptured } from 'vue';
import axios from 'axios';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import { API_BASE_URL } from '@/api_services/api.js';

// ✅ ERROR BOUNDARY - catch component errors
const componentError = ref(null);
onErrorCaptured((err, instance, info) => {
  console.error('RestockHistoryModal error:', err, info);
  componentError.value = err.message;
  return false; // Prevent error propagation
});

const emit = defineEmits(['close']);

// State
const loading = ref(false);
const history = ref([]);
const filters = ref({
  startDate: '',
  endDate: '',
  itemType: '',
  branchId: 'main'
});

// Get tenant ID using the same method as InventoryModule
const { getTenantId, getToken, getBranches } = decodeJWT();
const tenantId = getTenantId();
const branches = getBranches();

// Fetch restock history
const fetchHistory = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams({ tenant_id: tenantId });
    
    if (filters.value.startDate) params.append('start_date', filters.value.startDate);
    if (filters.value.endDate) params.append('end_date', filters.value.endDate);
    if (filters.value.itemType) params.append('item_type', filters.value.itemType);
    if (filters.value.branchId) params.append('branch_id', filters.value.branchId);

    const response = await axios.get(`${API_BASE_URL}/inventory/restock/history?${params.toString()}`);
    history.value = response.data;
  } catch (error) {
    console.error('Failed to fetch restock history:', error);
    alert('Failed to load restock history. Please try again.');
  } finally {
    loading.value = false;
  }
};

const revertHistory = async (id) => {
  if (!confirm("Are you sure you want to revert this restock? This will deduct the added stock from the inventory.")) return;
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/restock/history/${id}/revert?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to revert stock");
    
    alert(data.message);
    fetchHistory(); // Reload table
  } catch (error) {
    alert("Error reverting restock log: " + error.message);
    console.error(error);
  }
};

const deleteHistory = async (id) => {
  if (!confirm("Delete this log? (This will NOT change inventory quantities)")) return;
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/restock/history/${id}?tenant_id=${tenantId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!response.ok) throw new Error("Failed to delete log");
    
    fetchHistory(); // Reload table
  } catch (error) {
    alert("Error deleting log");
    console.error(error);
  }
};

const restoreItem = async (id) => {
  if (!confirm("Are you sure you want to restore this item to the inventory using its past data?")) return;
  try {
    const response = await fetch(`${API_BASE_URL}/inventory/restock/history/${id}/restore-item?tenant_id=${tenantId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Failed to restore item");
    
    alert(data.message);
  } catch (error) {
    alert("Error restoring item: " + error.message);
    console.error(error);
  }
};

// Export to Excel
const exportToExcel = async () => {
  try {
    const params = new URLSearchParams({ tenant_id: tenantId });
    
    if (filters.value.startDate) {
      params.append('start_date', filters.value.startDate);
    }
    if (filters.value.endDate) {
      params.append('end_date', filters.value.endDate);
    }
    if (filters.value.itemType) {
      params.append('item_type', filters.value.itemType);
    }

    const response = await axios.get(`${API_BASE_URL}/inventory/restock/export?${params.toString()}`, {
      responseType: 'blob'
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `restock_history_${new Date().toISOString().split('T')[0]}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export restock history:', error);
    alert('Failed to export to Excel. Please try again.');
  }
};

// Format date
const formatDate = (timestamp) => {
  if (!timestamp) return '-';
  // Ensure timestamp is treated as UTC if it lacks timezone info
  const ts = timestamp.endsWith('Z') || timestamp.includes('+') ? timestamp : `${timestamp}Z`;
  const date = new Date(ts);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

// Format time
const formatTime = (timestamp) => {
  if (!timestamp) return '-';
  // Ensure timestamp is treated as UTC if it lacks timezone info
  const ts = timestamp.endsWith('Z') || timestamp.includes('+') ? timestamp : `${timestamp}Z`;
  const date = new Date(ts);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Format source
const formatSource = (source) => {
  return source.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Load history on mount
onMounted(() => {
  // Set default date range (last 30 days)
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  filters.value.endDate = today.toISOString().split('T')[0];
  filters.value.startDate = thirtyDaysAgo.toISOString().split('T')[0];
  
  fetchHistory();
});
</script>
