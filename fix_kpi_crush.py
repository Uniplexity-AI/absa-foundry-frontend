repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Simplify the KPI card classes completely.
content = content.replace(
    'class="bg-white border border-gray-200 px-6 py-4 w-[240px] shadow-sm relative group overflow-hidden opacity-100 visible" style="transform: none;"',
    'class="bg-white border border-gray-200 px-6 py-4 w-[240px] shadow-sm relative z-10"'
)

# Hide radial-gradient (dotted pattern) during export, as html2canvas famously crashes on them
content = content.replace(
    '<div class="absolute inset-0 dotted-pattern opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity"></div>',
    '<div v-show="!isExportingPdf" class="absolute inset-0 dotted-pattern opacity-5 group-hover:opacity-10 pointer-events-none transition-opacity"></div>'
)

# Fix dotted pattern in the table cell too!
content = content.replace(
    '<div class="absolute inset-0 dotted-pattern opacity-5 pointer-events-none"></div>',
    '<div v-show="!isExportingPdf" class="absolute inset-0 dotted-pattern opacity-5 pointer-events-none"></div>'
)

# Optional: Ensure the wrapper has no clipping
content = content.replace(
    'flex flex-wrap justify-center gap-4 relative z-10 shrink-0 bg-gray-50',
    'flex flex-row justify-center gap-4 relative z-10 shrink-0 bg-gray-50 py-8' # Added padding so it has clear space
)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done cleaning up KPI tags for export")
