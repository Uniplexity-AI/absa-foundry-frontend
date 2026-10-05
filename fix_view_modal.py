import re

filepath = 'src/views/Modules/crm/FaqViewModal.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_template = """<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
      <div class="bg-white rounded-none w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl relative border border-gray-200 flex flex-col">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10 shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900">Bot Knowledge Base - Embedded FAQs</h3>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 overflow-y-auto flex-1 bg-transparent relative z-10">
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
            <div class="w-8 h-8 border-4 border-absa-passion/20 border-t-absa-passion rounded-full animate-spin mb-4"></div>
            <p class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Fetching from ChromaDB...</p>
          </div>

          <div v-else-if="error" class="bg-red-50 text-absa-passion p-4 border border-absa-passion flex items-start gap-3 rounded-none">
            <span class="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
            <p class="font-mono text-xs">{{ error }}</p>
          </div>

          <div v-else-if="faqs.length === 0" class="text-center py-12 border border-dashed border-gray-300 bg-gray-50/50">
            <Database :size="32" class="mx-auto mb-4 text-gray-400" />
            <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900 mb-1">Empty Knowledge Base</h3>
            <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">There are no FAQs embedded yet.</p>
          </div>

          <div v-else class="space-y-4">
            <div class="bg-white border border-gray-200 p-5 shadow-sm hover:border-absa-passion transition-colors rounded-none relative" v-for="(faq, index) in faqs" :key="faq.id">
              <div class="flex gap-4">
                <div class="shrink-0 mt-1">
                  <div class="w-6 h-6 bg-gray-50 text-gray-700 text-[9px] font-mono font-bold flex items-center justify-center rounded-none border border-gray-200">
                    {{ String(index + 1).padStart(2, '0') }}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed font-medium" v-html="formatFaq(faq.text)"></div>
                  <div class="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div class="flex items-center gap-2 text-gray-400 font-mono text-[9px] uppercase tracking-widest">
                      <FileText :size="12" />
                      Doc ID: <span class="text-gray-600">{{ faq.document_id }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-400 font-mono text-[9px] uppercase tracking-widest">
                      <Database :size="12" />
                      Vector: <span class="text-gray-600 truncate max-w-[150px] inline-block align-bottom" :title="faq.id">{{ faq.id }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>"""

content = re.sub(r'<template>.*</template>', new_template, content, flags=re.DOTALL)
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated FaqViewModal.vue template")
