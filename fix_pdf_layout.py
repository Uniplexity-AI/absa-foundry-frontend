repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Fix container overflow and width
content = content.replace(
    '<div ref="reportContainer" class="bg-white rounded-none w-full max-w-[95vw] shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? \'\' : \'max-h-[95vh] overflow-hidden\'">',
    '<div ref="reportContainer" class="bg-white rounded-none shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? \'w-max min-w-full\' : \'w-full max-w-[95vw] max-h-[95vh] overflow-hidden\'">'
)

# Fix Main Header background
content = content.replace(
    '<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white/90 backdrop-blur-md relative z-10 shrink-0 border-b border-gray-200">',
    '<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 shrink-0 border-b border-gray-200" :class="isExportingPdf ? \'bg-white\' : \'bg-white/90 backdrop-blur-md\'">'
)

# Hide Close Button
content = content.replace(
    '<button @click="$emit(\'close\')" class="text-gray-400',
    '<button v-if="!isExportingPdf" @click="$emit(\'close\')" class="text-gray-400'
)

# Fix KPI Section background
content = content.replace(
    '<div class="px-8 py-5 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 flex justify-center gap-4 relative z-10 shrink-0 overflow-x-auto">',
    '<div class="px-8 py-5 border-b border-gray-200 flex justify-center gap-4 relative z-10 shrink-0 overflow-x-auto" :class="isExportingPdf ? \'bg-gray-50\' : \'bg-gray-50/90 backdrop-blur-sm\'">'
)

# Fix Table Wrapper background
content = content.replace(
    '<div class="relative z-10 flex-1 bg-white/95 backdrop-blur-md" :class="isExportingPdf ? \'\' : \'overflow-auto\'">',
    '<div class="relative z-10 flex-1" :class="isExportingPdf ? \'bg-white min-w-max\' : \'bg-white/95 backdrop-blur-md overflow-auto\'">'
)

# Fix table header backdrop-blur
content = content.replace('bg-absa-passion backdrop-blur z-20', 'bg-absa-passion z-20')

# Update html2canvas options for scale and layout
content = content.replace(
    'html2canvas:  { scale: 2, useCORS: true, logging: false },',
    'html2canvas:  { scale: 3, useCORS: true, logging: false, windowWidth: 1600 },'
)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done fixing pdf layout issues")
