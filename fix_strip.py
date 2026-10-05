repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Centre KPIs
# Find: <div class="px-8 py-5 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 flex gap-4 relative z-10 shrink-0 overflow-x-auto">
# Replace with: <div class="px-8 py-5 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 flex justify-center gap-4 relative z-10 shrink-0 overflow-x-auto">
old_kpi_container = '<div class="px-8 py-5 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 flex gap-4 relative z-10 shrink-0 overflow-x-auto">'
new_kpi_container = '<div class="px-8 py-5 bg-gray-50/90 backdrop-blur-sm border-b border-gray-200 flex justify-center gap-4 relative z-10 shrink-0 overflow-x-auto">'
content = content.replace(old_kpi_container, new_kpi_container)

# 2. Make Table Header Red
# <tr class="bg-gray-100/90"> -> <tr class="bg-absa-passion">
content = content.replace('<tr class="bg-gray-100/90">', '<tr class="bg-absa-passion shadow-sm">')

# Replace th bg and text colors
# bg-gray-100/95 -> bg-absa-passion
content = content.replace('bg-gray-100/95', 'bg-absa-passion')
# text-gray-500 -> text-white
content = re.sub(r'<th class="sticky([^"]*)text-gray-500([^"]*)">', r'<th class="sticky\1text-white/95\2">', content)
# border-gray-200 -> border-absa-passion (or something that blends)
content = re.sub(r'<th class="sticky([^"]*)border-b border-gray-200([^"]*)">', r'<th class="sticky\1border-b border-absa-passion\2">', content)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done centering and styling header")
