<template>
  <Teleport to="#modal-target">
    <!-- Modal Container with backdrop - ULTRA HIGH Z-INDEX -->
    <div class="fixed inset-0 z-[200000] overflow-y-auto overflow-x-hidden">
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer" @click="$emit('close')"></div>
      
      <!-- Modal Content Centering Wrapper -->
      <div class="min-h-full flex items-center justify-center p-2 md:p-6 pointer-events-none">
        <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-6xl flex flex-col max-h-[90vh] rounded-none pointer-events-auto">
      <!-- Header -->
      <div class="h-1.5 w-full bg-[#2F2E8B]"></div>
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-indigo-50 flex items-center justify-center text-[#2F2E8B] rounded-none">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Inventory Alerts</div>
            <div class="text-sm font-black text-gray-900 uppercase tracking-tight">Batch Stock Limits</div>
          </div>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Content -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <div class="p-4 md:p-6 overflow-y-auto flex-1 space-y-6">
          <div class="space-y-3">
            <label class="block text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest ml-1">Search Items</label>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search by name or SKU..."
              class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-all"
            />
          </div>

          <div class="max-h-[50vh] overflow-x-auto border border-gray-100 rounded-none">
            <table class="w-full font-mono text-[9px] min-w-[600px]">
              <thead class="bg-gray-50 text-gray-400 sticky top-0 z-10 border-b border-gray-100">
              <tr>
                <th class="px-4 py-3 text-left font-black uppercase tracking-widest">Item Name</th>
                <th class="px-4 py-3 text-left font-black uppercase tracking-widest">Current Qty</th>
                <th class="px-4 py-3 text-left font-black uppercase tracking-widest">Low Stock Limit</th>
                <th class="px-4 py-3 text-left font-black uppercase tracking-widest">Critical Stock Limit</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50/50">
                <td class="px-4 py-3">
                  <div class="font-black text-gray-900 uppercase">{{ item.name }}</div>
                  <div class="text-gray-400">{{ item.sku || 'N/A' }}</div>
                </td>
                <td class="px-4 py-3 font-black text-gray-900">{{ item.stockQty ?? 0 }}</td>
                <td class="px-4 py-3">
                  <input
                    v-model.number="item.lowStockThreshold"
                    type="number"
                    min="0"
                    class="w-20 px-2 py-1 bg-white border border-gray-200 rounded-none text-[9px] font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B] outline-none"
                  />
                </td>
                <td class="px-4 py-3">
                  <input
                    v-model.number="item.criticalStockThreshold"
                    type="number"
                    min="0"
                    class="w-20 px-2 py-1 bg-white border border-gray-200 rounded-none text-[9px] font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B] outline-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="filteredItems.length === 0" class="text-center py-10 text-gray-500">No items found.</div>
        </div>
        </div>

        <!-- Footer Actions (Sticky) -->
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:p-6 bg-gray-50 border-t border-gray-100">
          <div v-if="filteredItems.length > 0" class="flex items-center gap-1">
            <button @click="currentPage--" :disabled="currentPage === 1" class="h-8 w-8 flex items-center justify-center bg-white border border-gray-200 rounded-none hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all font-mono text-[10px] font-black uppercase shadow-sm active:scale-95">
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="px-4 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-none font-mono text-[9px] font-black text-gray-900 uppercase tracking-widest shadow-sm">
                PAGE {{ currentPage }} OF {{ Math.ceil(filteredItems.length / pageSize) }}
            </div>
            <button @click="currentPage++" :disabled="currentPage * pageSize >= filteredItems.length" class="h-8 w-8 flex items-center justify-center bg-white border border-gray-200 rounded-none hover:border-[#2F2E8B] hover:text-[#2F2E8B] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all font-mono text-[10px] font-black uppercase shadow-sm active:scale-95">
                <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div class="flex justify-end gap-3 w-full md:w-auto">
            <button type="button" @click="$emit('close')" class="flex-1 md:flex-none px-6 py-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-gray-600 transition-colors">Cancel</button>
            <button type="button" @click="handleSave" :disabled="saving" class="flex-1 md:flex-none px-8 py-2.5 bg-[#2F2E8B] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-none hover:bg-[#1D226B] shadow-lg shadow-indigo-100 transition-all transform active:scale-95 disabled:opacity-50">
              <span v-if="saving"><i class="fas fa-spinner fa-spin mr-2"></i>Saving...</span>
              <span v-else>Save Batch Limits</span>
            </button>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
    
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close', 'save']);

// Local state
const searchTerm = ref('');
const currentPage = ref(1);
const pageSize = ref(30);
const saving = ref(false);

// Create a mutable copy of items
const localItems = ref(props.items.map(item => ({
  id: item.id || item._id,
  name: item.name,
  sku: item.sku || 'N/A',
  stockQty: item.stockQty ?? 0,
  lowStockThreshold: item.lowStockThreshold ?? '',
  criticalStockThreshold: item.criticalStockThreshold ?? ''
})));

// Computed properties
const filteredItems = computed(() => {
  if (!searchTerm.value) {
    return localItems.value;
  }
  
  const term = searchTerm.value.toLowerCase();
  return localItems.value.filter(item => 
    item.name.toLowerCase().includes(term) ||
    (item.sku && item.sku.toLowerCase().includes(term))
  );
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredItems.value.slice(start, end);
});

// Reset page when search changes
watch(searchTerm, () => {
  currentPage.value = 1;
});

// Handle save
const handleSave = () => {
  saving.value = true;
  emit('save', localItems.value);
};

// Expose saving state to parent
defineExpose({
  setSaving: (value) => {
    saving.value = value;
  }
});
</script>
