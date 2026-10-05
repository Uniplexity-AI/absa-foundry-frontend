repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Modal Container
content = content.replace(
    '''<div ref="reportContainer" class="bg-white rounded-none shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? 'bg-white w-full' : 'bg-white overflow-auto w-full'">''',
    '''<div ref="reportContainer" class="bg-white rounded-none shadow-2xl relative border border-gray-300 flex flex-col" :class="isExportingPdf ? 'w-max min-w-full overflow-hidden' : 'w-full max-w-[95vw] max-h-[95vh] overflow-hidden'">'''
)

# Fix Header
content = content.replace(
    '''<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 shrink-0 border-b border-gray-200" :class="isExportingPdf ? 'bg-white w-full' : 'bg-white overflow-auto w-full'">''',
    '''<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10 shrink-0 border-b border-gray-200 bg-white">'''
)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done restoring classes")
