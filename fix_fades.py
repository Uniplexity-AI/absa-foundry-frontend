repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Fix KPI Container classes (remove backdrop blur and alpha)
old_kpi = 'class="px-8 py-5 border-b border-gray-200 flex flex-row justify-center gap-4 relative z-10 shrink-0 bg-gray-50 py-8"'
# I notice I might have already replaced it but it might be different, let's use regex
content = re.sub(r'bg-gray-50/90\s+backdrop-blur-sm', 'bg-gray-50', content)
content = re.sub(r'bg-white/95\s+backdrop-blur-md', 'bg-white', content)
content = re.sub(r'bg-black/60\s+backdrop-blur-md', 'bg-black/60', content)

# Make KPI text darker
content = content.replace('text-gray-500 uppercase tracking-widest">Total Promises', 'text-gray-600 uppercase tracking-widest">Total Promises')
content = content.replace('text-gray-500 uppercase tracking-widest">Expected Value', 'text-gray-600 uppercase tracking-widest">Expected Value')
content = content.replace('text-gray-500 uppercase tracking-widest">Customers', 'text-gray-600 uppercase tracking-widest">Customers')

# Fix Table Wrapper min-w-max
# Find: :class="isExportingPdf ? 'bg-white min-w-max' : 'bg-white overflow-auto'"
# Replace: :class="isExportingPdf ? 'bg-white w-full' : 'bg-white overflow-auto w-full'"
content = re.sub(r':class="isExportingPdf \? \'[^\']+\' : \'[^\']+\'"', ':class="isExportingPdf ? \'bg-white w-full\' : \'bg-white overflow-auto w-full\'"', content)

# Remove any lingering min-w-max classes inside the table wrappers
content = content.replace('class="min-w-max"', 'class="w-full"')
content = content.replace('class="bg-white min-w-max"', 'class="bg-white w-full"')

# Change the modal container to scale properly without cutting off
# Find: :class="isExportingPdf ? 'w-max min-w-full' : 'w-full max-w-[95vw] max-h-[95vh] overflow-hidden'"
# Let's just hardcode the replacement to be safe.
content = re.sub(r':class="isExportingPdf \? \'w-max min-w-full\' : \'w-full max-w-\[95vw\] max-h-\[95vh\] overflow-hidden\'"', ':class="isExportingPdf ? \'w-max min-w-full overflow-hidden\' : \'w-full max-w-[95vw] max-h-[95vh] overflow-hidden\'"', content)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done fixing fades and overflows")
