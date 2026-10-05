import re

filepath = 'src/views/Modules/crm/FaqUploadModal.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the entire template.
new_template = """<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
      <div class="bg-white rounded-none w-full max-w-2xl overflow-hidden shadow-2xl relative border border-gray-200">
        <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10">
          <div class="flex items-center gap-2">
            <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
            <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900">Upload FAQ Data</h3>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <!-- Format Selection Tabs -->
        <div class="px-5 pt-4 flex items-center gap-4 border-b border-gray-200 bg-gray-50 relative z-10">
          <button
            class="pb-2 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2"
            :class="fileType === 'doc' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-800'"
            @click="fileType = 'doc'"
          >
            <FileText :size="14" /> Word (.doc)
          </button>
          <button
            class="pb-2 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2"
            :class="fileType === 'csv' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-800'"
            @click="fileType = 'csv'"
          >
            <FileSpreadsheet :size="14" /> CSV (.csv)
          </button>
          <button
            class="pb-2 text-[10px] font-mono font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2"
            :class="fileType === 'pdf' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-gray-800'"
            @click="fileType = 'pdf'"
          >
            <File :size="14" /> PDF (.pdf)
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 relative z-10">
          <div class="border-2 border-dashed border-gray-300 bg-gray-50/50 flex flex-col items-center justify-center py-10 transition-colors hover:border-absa-passion hover:bg-gray-50 relative">
            <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="handleFileUpload" />
            <div class="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-3 shadow-sm">
              <Upload :size="20" />
            </div>
            <p class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900 mb-1">Click to browse or drag file here</p>
            <p class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              {{ fileType === 'doc' ? 'Supports .doc, .docx' : (fileType === 'csv' ? 'Supports .csv' : 'Supports .pdf') }}
            </p>
          </div>

          <div v-if="isUploading" class="mt-4 p-4 border border-absa-enrich bg-absa-enrich/5 flex items-center gap-3">
            <div class="w-4 h-4 border-2 border-absa-enrich/30 border-t-absa-enrich rounded-full animate-spin shrink-0"></div>
            <p class="text-[10px] font-mono font-bold text-absa-enrich uppercase tracking-widest">Processing & Embedding FAQs... This may take a moment.</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>"""

content = re.sub(r'<template>.*</template>', new_template, content, flags=re.DOTALL)
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated FaqUploadModal.vue template")
