<script setup>
import { computed } from 'vue'

const props = defineProps({
  open: Boolean,
  entry: Object,
  customerName: String,
  customerId: String
})

defineEmits(['close'])

const fmtDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
      <div class="bg-white rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative border border-gray-200">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10">
          <div class="flex items-center gap-2">
            <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900">
              Engagement Details - {{ customerName || customerId }}
            </h3>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-6 relative z-10" v-if="entry">
          <div class="flex items-center justify-between border-b border-gray-100 pb-3">
             <div>
                <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Date & Time</p>
                <p class="text-sm font-bold text-gray-900 mt-1">{{ fmtDate(entry.at) }}</p>
             </div>
             <div class="text-right">
                <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Logged By</p>
                <p class="text-sm font-bold text-gray-900 mt-1 uppercase">{{ entry.actor || 'RM' }}</p>
             </div>
          </div>
          
          <div class="grid grid-cols-3 gap-6">
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Type</p>
               <p class="text-sm font-bold text-absa-enrich mt-1">{{ entry.type || '-' }}</p>
             </div>
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Outcome</p>
               <p class="text-sm font-bold text-absa-enrich mt-1">{{ entry.meta?.outcome || '-' }}</p>
             </div>
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Dormancy Reason</p>
               <p class="text-sm font-bold text-absa-enrich mt-1">{{ entry.meta?.dormancy_reason || '-' }}</p>
             </div>
          </div>
          
          <div class="grid grid-cols-3 gap-6">
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Cross Sell</p>
               <p class="text-sm text-gray-900 mt-1">{{ entry.meta?.cross_sell_details || '-' }}</p>
             </div>
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Experience</p>
               <p class="text-sm text-gray-900 mt-1">{{ entry.meta?.customer_experience || '-' }}</p>
             </div>
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Recommendation</p>
               <p class="text-sm text-gray-900 mt-1">{{ entry.meta?.recommendation || '-' }}</p>
             </div>
          </div>
          
          <div class="grid grid-cols-2 gap-6">
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Branch to Visit</p>
               <p class="text-sm text-gray-900 mt-1">{{ entry.meta?.branch_to_visit || '-' }}</p>
             </div>
             <div>
               <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Customer Feedback</p>
               <p class="text-sm text-gray-900 mt-1">{{ entry.meta?.customer_feedback || '-' }}</p>
             </div>
          </div>
          
          <div>
             <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">General Notes</p>
             <p class="text-sm text-gray-900 mt-1 bg-gray-50/50 p-3 border border-gray-100 whitespace-pre-wrap">{{ entry.detail || entry.meta?.notes || 'No general notes provided.' }}</p>
          </div>
          
          <div v-if="entry.meta?.isPromise" class="bg-absa-passion/5 p-4 border border-absa-passion/20">
             <p class="text-xs font-bold text-absa-passion mb-2 flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">task_alt</span> Promise to Fund</p>
             <div class="grid grid-cols-2 gap-4">
               <div>
                 <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Expected Amount</p>
                 <p class="text-sm font-bold text-gray-900 mt-1">{{ entry.meta?.expectedAmount ? 'ZMW ' + entry.meta.expectedAmount : '-' }}</p>
               </div>
               <div>
                 <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Expected Date</p>
                 <p class="text-sm font-bold text-gray-900 mt-1">{{ entry.meta?.expectedDate || '-' }}</p>
               </div>
             </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end">
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
