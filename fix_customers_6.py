import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('text-sm font-bold uppercase tracking-wider', 'text-[10px] font-mono font-bold uppercase tracking-widest')
content = content.replace('text-xs text-amber-900', 'text-[9px] font-mono font-bold uppercase tracking-widest text-amber-900')
content = content.replace('text-xs', 'text-[10px] font-mono font-bold uppercase tracking-widest')
content = content.replace('text-sm', 'text-[10px] font-mono font-bold uppercase tracking-widest')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Swept remaining text-xs and text-sm")
