import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<thead class="bg-gray-50">', '<thead class="bg-white border-b border-absa-passion">')
content = content.replace('text-[11px] font-bold uppercase tracking-wider text-gray-500', 'font-mono text-[9px] font-bold uppercase tracking-widest text-gray-900')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed table headers")
