<script setup>
import { computed } from 'vue'

const props = defineProps({
  open: Boolean,
  customerName: String,
  customerId: String,
  history: Array
})

defineEmits(['close', 'edit', 'delete'])

const fmtDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const tierColor = (tier) => {
  const map = {
    power: '#DC0037',
    inspire: '#FF3333',
    hope: '#005587',
    unknown: '#9ca3af'
  }
  return map[tier] || map.unknown
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
      <div class="bg-white rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative border border-gray-200 flex flex-col max-h-[85vh]">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10 shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900">
              Complete Engagement History - {{ customerName || customerId }}
            </h3>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto relative z-10 flex-1">
          <div v-if="history && history.length" class="space-y-4">
            <div v-for="h in history" :key="h.id" class="flex gap-3 group relative">
              <div class="flex flex-col items-center pt-1 shrink-0">
                <div class="w-2 h-2 rounded-none" :style="{ background: tierColor('power') }"></div>
                <div class="w-[1px] flex-1 bg-gray-200 mt-1 min-h-[30px]"></div>
              </div>
              <div class="pb-4 min-w-0 flex-1">
                <div class="flex items-start justify-between">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-bold text-absa-enrich">{{ h.title }}</span>
                      <span class="text-[10px] text-gray-400">{{ fmtDate(h.at) }}</span>
                    </div>
                    <p class="text-[11px] text-gray-500 mt-0.5">{{ h.detail }}</p>
                    <span v-if="h.actor" class="text-[10px] text-gray-400 block uppercase tracking-wide mt-1">RM: {{ h.actor }}</span>
                  </div>
                  <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="$emit('edit', h)" class="p-1 text-gray-400 hover:text-absa-passion transition-colors" title="Edit">
                      <span class="material-symbols-outlined text-[14px]">edit</span>
                    </button>
                    <button @click="$emit('delete', h)" class="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                      <span class="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                </div>
                <div v-if="h.meta && (h.meta.outcome || h.meta.dormancy_reason || h.meta.cross_sell_details || h.meta.branch_to_visit)" class="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-100 pt-2">
                  <div v-if="h.meta.outcome"><span class="font-bold text-gray-500">Outcome:</span> {{ h.meta.outcome }}</div>
                  <div v-if="h.meta.dormancy_reason"><span class="font-bold text-gray-500">Reason:</span> {{ h.meta.dormancy_reason }}</div>
                  <div v-if="h.meta.cross_sell_details"><span class="font-bold text-gray-500">Cross Sell:</span> {{ h.meta.cross_sell_details }}</div>
                  <div v-if="h.meta.recommendation"><span class="font-bold text-gray-500">Recommendation:</span> {{ h.meta.recommendation }}</div>
                  <div v-if="h.meta.customer_experience"><span class="font-bold text-gray-500">Experience:</span> {{ h.meta.customer_experience }}</div>
                  <div v-if="h.meta.branch_to_visit"><span class="font-bold text-gray-500">Branch:</span> {{ h.meta.branch_to_visit }}</div>
                  <div v-if="h.meta.customer_feedback" class="col-span-2"><span class="font-bold text-gray-500">Feedback:</span> {{ h.meta.customer_feedback }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-sm text-gray-500">No engagement history found.</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end shrink-0">
          <button @click="$emit('close')" class="px-6 py-2.5 bg-gray-100 text-gray-700 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-gray-200 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.dotted-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.03;
}
</style>
