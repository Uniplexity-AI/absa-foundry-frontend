import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('rounded-none-full', 'rounded-none')
content = content.replace('text-[11px] font-bold text-absa-enrich', 'text-[10px] font-mono font-bold uppercase tracking-widest text-absa-enrich')
content = content.replace('text-xs text-red-700', 'text-[10px] font-mono font-bold uppercase tracking-widest text-red-700')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed rounded-none-full and pagination")
