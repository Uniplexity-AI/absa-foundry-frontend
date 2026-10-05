repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix Alpha/Blur backgrounds for PDF Export (Faded KPIs)
content = content.replace("bg-white/90 backdrop-blur-md", "bg-white")
content = content.replace("bg-gray-50/90 backdrop-blur-sm", "bg-gray-50")
content = content.replace("bg-white/95 backdrop-blur-md overflow-auto", "bg-white overflow-auto")

# 2. Fix Table Overflow
# Remove table-fixed
content = content.replace('<table class="w-full text-left border-collapse table-fixed">', '<table class="w-full text-left border-collapse">')
# Change inner min-w-max wrappers to w-full so they don't break out
content = content.replace('<div v-else-if="engagements && engagements.length" class="min-w-max">', '<div v-else-if="engagements && engagements.length" class="w-full">')
content = content.replace(":class=\"isExportingPdf ? 'bg-white min-w-max' : 'bg-white/95 backdrop-blur-md overflow-auto'\"", ":class=\"isExportingPdf ? 'bg-white w-full' : 'bg-white overflow-auto'\"")

# Change min-w-[300px] on Outcome header to w-[300px] so it can constrain
content = content.replace('px-5 py-3 min-w-[300px]', 'px-5 py-3 w-[300px]')

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done fixing pdf layout issues")
