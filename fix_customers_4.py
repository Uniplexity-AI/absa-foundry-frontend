import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('text-xs font-mono', 'text-[11px] font-mono font-bold uppercase tracking-widest')
content = content.replace('text-xs text-gray-600', 'text-[11px] font-mono font-bold uppercase tracking-widest text-gray-600')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed table data styles")
