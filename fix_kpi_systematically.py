repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Simplify KPI Container
old_kpi_container = '<div class="px-8 py-5 border-b border-gray-200 flex justify-center gap-4 relative z-10 shrink-0 overflow-x-auto" :class="isExportingPdf ? \'bg-gray-50\' : \'bg-gray-50/90 backdrop-blur-sm\'">'
new_kpi_container = '<div class="px-8 py-5 border-b border-gray-200 flex flex-wrap justify-center gap-4 relative z-10 shrink-0 bg-gray-50">'
content = content.replace(old_kpi_container, new_kpi_container)

# Simplify KPI items and explicitly set width
# Find all occurrences of the KPI wrapper and replace them
content = re.sub(
    r'<div class="bg-white border border-gray-200 px-6 py-4 min-w-\[240px\] shadow-sm relative group overflow-hidden" :class="isExportingPdf \? \'\' : \'animate-fade-in-up\'" style="animation-delay: [0-9\.]+s;">',
    r'<div class="bg-white border border-gray-200 px-6 py-4 w-[240px] shadow-sm relative group overflow-hidden opacity-100 visible" style="transform: none;">',
    content
)

# Remove the CSS class entirely just to be safe
content = re.sub(
    r'@keyframes fadeInUp \{[\s\S]*?\}\s*\.animate-fade-in-up \{[\s\S]*?\}',
    '',
    content
)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done systematical fix")
