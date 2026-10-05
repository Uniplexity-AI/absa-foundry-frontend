repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

script_part = content.split('</script>')[0] + '</script>\n'

new_template = """
<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-white rounded-none w-full max-w-[95vw] shadow-2xl relative flex flex-col max-h-[95vh] overflow-hidden border border-gray-700">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
        
        <!-- Header: Minimalist -->
        <div class="px-8 py-5 flex items-center justify-between bg-white relative z-10 shrink-0 border-b border-gray-200">
          <div class="flex items-center gap-6">
            <img src="/absa-logo.png" alt="Absa Logo" class="h-6 w-auto object-contain">
            <div class="w-px h-6 bg-gray-200 shrink-0"></div>
            <div>
               <h3 class="text-sm font-mono font-bold uppercase tracking-widest text-gray-900">
                 Promise to Fund Ledger
               </h3>
            </div>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- KPI Strip: Grid format, clean -->
        <div class="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200 bg-gray-50/50 relative z-10 shrink-0">
          <div class="px-8 py-4 flex flex-col justify-center group hover:bg-white transition-colors">
            <span class="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">Total Promises</span>
            <span class="text-3xl font-light tracking-tight text-gray-900">{{ totalPromises }}</span>
          </div>
          <div class="px-8 py-4 flex flex-col justify-center group hover:bg-white transition-colors">
            <span class="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">Expected Value</span>
            <span class="text-3xl font-light tracking-tight text-gray-900">{{ totalExpectedValue }}</span>
          </div>
          <div class="px-8 py-4 flex flex-col justify-center group hover:bg-white transition-colors">
            <span class="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">Unique Customers</span>
            <span class="text-3xl font-light tracking-tight text-gray-900">{{ uniqueCustomers }}</span>
          </div>
        </div>

        <!-- Body / Table -->
        <div class="overflow-auto relative z-10 flex-1 bg-white">
          <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <span class="material-symbols-outlined animate-spin text-3xl text-absa-passion mb-4">progress_activity</span>
            <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">Syncing Master Data...</p>
          </div>
          
          <div v-else-if="engagements && engagements.length" class="min-w-max">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-white">
                  <th class="sticky top-0 bg-white/95 backdrop-blur z-20 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 px-6 py-4 whitespace-nowrap">Date</th>
                  <th class="sticky top-0 bg-white/95 backdrop-blur z-20 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 px-6 py-4 whitespace-nowrap">Customer</th>
                  <th class="sticky top-0 bg-white/95 backdrop-blur z-20 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 px-6 py-4 whitespace-nowrap">Account</th>
                  <th class="sticky top-0 bg-white/95 backdrop-blur z-20 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 px-6 py-4 whitespace-nowrap">Contact</th>
                  <th class="sticky top-0 bg-white/95 backdrop-blur z-20 text-[9px] font-mono font-bold uppercase tracking-widest text-absa-passion border-b border-gray-200 px-6 py-4 whitespace-nowrap">Promise</th>
                  <th class="sticky top-0 bg-white/95 backdrop-blur z-20 text-[9px] font-mono font-bold uppercase tracking-widest text-gray-400 border-b border-gray-200 px-6 py-4 whitespace-nowrap">Details & Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in engagements" :key="h.id" class="hover:bg-gray-50 transition-colors border-b border-gray-100 group">
                  
                  <!-- Date -->
                  <td class="px-6 py-5 text-[11px] text-gray-600 align-top whitespace-nowrap">{{ fmtDate(h.at) }}</td>
                  
                  <!-- Customer Info -->
                  <td class="px-6 py-5 align-top whitespace-nowrap">
                    <div class="text-[12px] font-bold text-gray-900 mb-1">{{ h.customerName || h.customerId || 'Unknown' }}</div>
                    <div class="text-[10px] font-mono text-gray-400 mb-2">ID: {{ h.customerId }}</div>
                    <span class="inline-block px-1.5 py-0.5 border border-gray-200 text-[9px] font-mono uppercase tracking-widest text-gray-500 rounded-none">
                      {{ profiles[h.customerId]?.market_segment || 'N/A' }}
                    </span>
                  </td>
                  
                  <!-- Account Details -->
                  <td class="px-6 py-5 align-top whitespace-nowrap">
                    <div class="flex items-baseline gap-2 mb-1">
                      <span class="w-8 text-[9px] font-mono uppercase tracking-widest text-gray-400">ACC</span>
                      <span class="text-[11px] font-mono text-gray-800">{{ profiles[h.customerId]?.account_number || 'N/A' }}</span>
                    </div>
                    <div class="flex items-baseline gap-2 mb-1">
                      <span class="w-8 text-[9px] font-mono uppercase tracking-widest text-gray-400">TYP</span>
                      <span class="text-[11px] text-gray-600">{{ profiles[h.customerId]?.account_type || 'N/A' }}</span>
                    </div>
                    <div class="flex items-baseline gap-2">
                      <span class="w-8 text-[9px] font-mono uppercase tracking-widest text-gray-400">BRN</span>
                      <span class="text-[11px] text-gray-600">{{ profiles[h.customerId]?.branch_code || h.meta?.branch_to_visit || 'N/A' }}</span>
                    </div>
                  </td>
                  
                  <!-- Contact Info -->
                  <td class="px-6 py-5 align-top whitespace-nowrap">
                    <div class="flex items-baseline gap-2 mb-1">
                      <span class="w-8 text-[9px] font-mono uppercase tracking-widest text-gray-400">MOB</span>
                      <span class="text-[11px] font-mono text-gray-800">{{ profiles[h.customerId]?.mobile_number || 'N/A' }}</span>
                    </div>
                    <div class="flex items-baseline gap-2 mb-1">
                      <span class="w-8 text-[9px] font-mono uppercase tracking-widest text-gray-400">EML</span>
                      <span class="text-[11px] text-gray-600">{{ profiles[h.customerId]?.email || 'N/A' }}</span>
                    </div>
                    <div class="flex items-baseline gap-2">
                      <span class="w-8 text-[9px] font-mono uppercase tracking-widest text-gray-400">NOK</span>
                      <span class="text-[11px] text-gray-600">
                        {{ profiles[h.customerId]?.next_of_kin_name || 'N/A' }}
                        <span v-if="profiles[h.customerId]?.next_of_kin_phone" class="font-mono ml-1 text-gray-400">({{ profiles[h.customerId].next_of_kin_phone }})</span>
                      </span>
                    </div>
                  </td>
                  
                  <!-- Promise Details -->
                  <td class="px-6 py-5 align-top whitespace-nowrap">
                    <div class="text-[13px] font-bold text-gray-900 mb-1 border-l-2 border-absa-passion pl-2">{{ formatCurrency(h.meta?.expectedAmount) }}</div>
                    <div class="flex items-baseline gap-2 mb-1 pl-2.5">
                      <span class="text-[9px] font-mono uppercase tracking-widest text-gray-400">DUE</span>
                      <span class="text-[11px] font-bold text-gray-700">{{ h.meta?.expectedDate || 'N/A' }}</span>
                    </div>
                    <div class="flex items-baseline gap-2 pl-2.5 mt-2">
                      <span class="text-[9px] font-mono uppercase tracking-widest text-gray-400">RM</span>
                      <span class="text-[11px] text-gray-600">{{ h.actor || '-' }}</span>
                    </div>
                  </td>
                  
                  <!-- Outcome & Notes -->
                  <td class="px-6 py-5 align-top min-w-[300px] max-w-[450px]">
                    <div class="text-[11px] font-bold text-gray-900 mb-2 uppercase tracking-wide">{{ h.meta?.outcome || h.type || 'N/A' }}</div>
                    <div v-if="h.meta?.dormancy_reason" class="flex gap-2 mb-1 text-[11px]">
                      <span class="text-[9px] font-mono uppercase tracking-widest text-gray-400 w-12 shrink-0">Reason</span>
                      <span class="text-gray-700">{{ h.meta.dormancy_reason }}</span>
                    </div>
                    <div v-if="h.meta?.customer_feedback" class="flex gap-2 mb-1 text-[11px]">
                      <span class="text-[9px] font-mono uppercase tracking-widest text-gray-400 w-12 shrink-0">Feedback</span>
                      <span class="text-gray-700">{{ h.meta.customer_feedback }}</span>
                    </div>
                    <div v-if="h.detail || h.meta?.notes" class="flex gap-2 mt-2 text-[11px]">
                      <span class="text-[9px] font-mono uppercase tracking-widest text-gray-400 w-12 shrink-0">Notes</span>
                      <span class="text-gray-600 leading-relaxed">{{ h.detail || h.meta?.notes }}</span>
                    </div>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
          
          <div v-else class="text-center py-32 flex flex-col items-center">
            <span class="material-symbols-outlined text-[32px] text-gray-300 mb-4">folder_open</span>
            <p class="text-[10px] text-gray-400 font-mono tracking-widest uppercase font-bold">No ledger records found.</p>
          </div>
        </div>
        
        <!-- Footer: Clean POS buttons -->
        <div class="px-8 py-5 border-t border-gray-200 bg-white relative z-10 flex justify-between shrink-0 items-center">
          <div class="flex gap-6">
            <button @click="exportCsv" class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-absa-passion transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">grid_on</span>
              Export Excel
            </button>
            <div class="w-px h-4 bg-gray-300"></div>
            <button @click="exportPdf" class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-absa-passion transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              Export PDF
            </button>
          </div>
          <button @click="$emit('close')" class="px-8 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors">
            Close Ledger
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
}
/* Ultra minimal scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 0;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
"""

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(script_part + new_template)
print("done redesign")
