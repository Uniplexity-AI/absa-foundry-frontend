<template>
  <Teleport to="#modal-target">
  <!-- Modal Container with backdrop -->
  <div class="fixed inset-0 z-[200000] overflow-y-auto overflow-x-hidden">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer" @click="$emit('close')"></div>
    
    <!-- Modal Content Centering Wrapper -->
    <div class="min-h-full flex items-center justify-center p-2 md:p-6 pointer-events-none">
      <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] rounded-none pointer-events-auto">
      <!-- Header -->
      <div class="h-1.5 w-full bg-amber-500"></div>
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-amber-50 flex items-center justify-center text-amber-600 rounded-none">
            <i class="fas fa-clock text-lg"></i>
          </div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              INVENTORY // EXPIRY
            </div>
            <div class="text-sm font-black text-gray-900 uppercase tracking-tight">
              Expiry Alerts
            </div>
          </div>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <!-- Filter Row -->
        <div class="flex items-center justify-between flex-wrap gap-3">
          <div class="flex items-center gap-3">
            <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Show items expiring within</span>
            <select 
              v-model.number="localDaysFilter" 
              @change="$emit('update:daysFilter', localDaysFilter); $emit('refresh')"
              class="text-[11px] font-mono font-bold bg-white border border-gray-300 px-3 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option :value="7">7 days</option>
              <option :value="14">14 days</option>
              <option :value="30">30 days</option>
              <option :value="60">60 days</option>
              <option :value="90">90 days</option>
            </select>
          </div>
          <button 
            @click="$emit('refresh')"
            class="flex items-center gap-2 px-3 py-2 text-[9px] font-mono font-black text-amber-600 bg-amber-50 border border-amber-200 rounded-none hover:bg-amber-100 uppercase tracking-widest transition-colors"
          >
            <i class="fas fa-sync-alt text-[9px]" :class="{ 'fa-spin': loading }"></i>
            Refresh
          </button>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center gap-3 py-12">
          <div class="animate-spin h-6 w-6 border-2 border-amber-400 border-t-transparent rounded-full"></div>
          <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Checking expiry dates...</span>
        </div>

        <!-- Content when loaded -->
        <template v-else>
          <!-- Stats Summary -->
          <div v-if="data.total > 0" class="grid grid-cols-2 gap-3">
            <div class="p-4 bg-red-50 border border-red-200">
              <div class="text-[8px] font-mono font-bold text-red-400 uppercase tracking-widest mb-1">Expired</div>
              <div class="text-2xl font-black text-red-600 font-outfit">{{ data.alreadyExpired?.length || 0 }}</div>
              <div class="text-[9px] font-mono text-red-400 mt-1">items past expiry date</div>
            </div>
            <div class="p-4 bg-amber-50 border border-amber-200">
              <div class="text-[8px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-1">Expiring Soon</div>
              <div class="text-2xl font-black text-amber-600 font-outfit">{{ data.expiringSoon?.length || 0 }}</div>
              <div class="text-[9px] font-mono text-amber-500 mt-1">within {{ localDaysFilter }} days</div>
            </div>
          </div>

          <!-- Already Expired Section -->
          <div v-if="data.alreadyExpired && data.alreadyExpired.length > 0" class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-red-500"></div>
              <h3 class="text-[11px] font-mono font-black text-red-600 uppercase tracking-widest">Already Expired ({{ data.alreadyExpired.length }})</h3>
            </div>
            <div class="overflow-x-auto border border-red-100">
              <table class="w-full text-left">
                <thead class="bg-red-50">
                  <tr>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-red-400 uppercase tracking-widest">Item</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-red-400 uppercase tracking-widest">SKU</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-red-400 uppercase tracking-widest">Category</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-red-400 uppercase tracking-widest">Qty</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-red-400 uppercase tracking-widest">Expired</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-red-400 uppercase tracking-widest">Reminder</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-red-50">
                  <tr v-for="item in data.alreadyExpired" :key="item.id" class="hover:bg-red-50/50 transition-colors">
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <img 
                          v-if="item.images && item.images.length > 0"
                          :src="getThumbSrc(item.images[0])"
                          class="w-8 h-8 object-cover border border-gray-200 flex-shrink-0"
                          @error="onImgError"
                        />
                        <span class="text-[11px] font-bold text-gray-900">{{ item.name }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-[10px] font-mono text-gray-400">{{ item.sku || '---' }}</td>
                    <td class="px-4 py-3">
                      <span class="text-[9px] font-mono font-bold text-gray-500 uppercase">{{ item.category || '---' }}</span>
                    </td>
                    <td class="px-4 py-3 text-[11px] font-bold text-gray-900">{{ item.stockQty }}</td>
                    <td class="px-4 py-3">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 text-[9px] font-mono font-black uppercase">
                        <i class="fas fa-times-circle text-[8px]"></i>
                        {{ Math.abs(item.daysLeft) }}d ago
                      </span>
                    </td>
                    <td class="px-4 py-3 text-[9px] font-mono text-gray-400">
                      {{ item.expiry_reminder_days ? item.expiry_reminder_days + 'd before' : 'Not set' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Expiring Soon Section -->
          <div v-if="data.expiringSoon && data.expiringSoon.length > 0" class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-1 h-4 bg-amber-500"></div>
              <h3 class="text-[11px] font-mono font-black text-amber-600 uppercase tracking-widest">Expiring Soon ({{ data.expiringSoon.length }})</h3>
            </div>
            <div class="overflow-x-auto border border-amber-100">
              <table class="w-full text-left">
                <thead class="bg-amber-50">
                  <tr>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">Item</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">SKU</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">Category</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">Qty</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">Days Left</th>
                    <th class="px-4 py-2 text-[8px] font-mono font-black text-amber-500 uppercase tracking-widest">Reminder</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-amber-50">
                  <tr 
                    v-for="item in data.expiringSoon" :key="item.id" 
                    class="hover:bg-amber-50/50 transition-colors"
                    :class="{ 'bg-red-50/30': item.daysLeft <= 7 }"
                  >
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <img 
                          v-if="item.images && item.images.length > 0"
                          :src="getThumbSrc(item.images[0])"
                          class="w-8 h-8 object-cover border border-gray-200 flex-shrink-0"
                          @error="onImgError"
                        />
                        <div>
                          <span class="text-[11px] font-bold text-gray-900">{{ item.name }}</span>
                          <span 
                            v-if="item.daysLeft <= 7" 
                            class="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 bg-red-100 text-red-600 text-[8px] font-mono font-black uppercase"
                          >
                            <i class="fas fa-exclamation-triangle text-[7px]"></i> URGENT
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-[10px] font-mono text-gray-400">{{ item.sku || '---' }}</td>
                    <td class="px-4 py-3">
                      <span class="text-[9px] font-mono font-bold text-gray-500 uppercase">{{ item.category || '---' }}</span>
                    </td>
                    <td class="px-4 py-3 text-[11px] font-bold text-gray-900">{{ item.stockQty }}</td>
                    <td class="px-4 py-3">
                      <span 
                        class="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-black uppercase"
                        :class="item.daysLeft <= 7 
                          ? 'bg-red-100 text-red-700' 
                          : item.daysLeft <= 14 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-green-50 text-emerald-600'"
                      >
                        <i 
                          class="text-[8px]"
                          :class="item.daysLeft <= 7 
                            ? 'fas fa-exclamation-circle' 
                            : item.daysLeft <= 14 
                              ? 'fas fa-clock' 
                              : 'fas fa-check-circle'"
                        ></i>
                        {{ item.daysLeft }}d
                      </span>
                    </td>
                    <td class="px-4 py-3 text-[9px] font-mono text-gray-400">
                      {{ item.expiry_reminder_days ? item.expiry_reminder_days + 'd before' : 'Not set' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="data.total === 0" class="flex flex-col items-center justify-center py-16 text-center">
            <div class="h-16 w-16 bg-emerald-50 flex items-center justify-center mb-4">
              <i class="fas fa-check-circle text-3xl text-emerald-400"></i>
            </div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">All Clear!</h3>
            <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest max-w-md">
              No items are expiring within the next {{ localDaysFilter }} days. Your inventory is in good shape.
            </p>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200">
        <button 
          @click="$emit('close')"
          class="px-6 py-3 text-[10px] font-mono font-black uppercase tracking-widest text-gray-600 bg-white border border-gray-200 rounded-none hover:bg-gray-100 transition-colors"
        >
          Close
        </button>
      </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  data: { type: Object, default: () => ({ expiringSoon: [], alreadyExpired: [], total: 0 }) },
  loading: Boolean,
  daysFilter: { type: Number, default: 30 },
  tenantId: { type: String, default: '' }
});

const emit = defineEmits(['close', 'refresh', 'update:daysFilter']);

const localDaysFilter = ref(props.daysFilter);

watch(() => props.daysFilter, (val) => {
  localDaysFilter.value = val;
});

const getThumbSrc = (img) => {
  if (!img) return '';
  if (img.startsWith('http')) return img;
  if (img.startsWith('/uploads')) return img;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  return `${baseUrl}/api/files/${img}?tenant_id=${encodeURIComponent(props.tenantId)}`;
};

const onImgError = (e) => {
  e.target.style.display = 'none';
};
</script>
