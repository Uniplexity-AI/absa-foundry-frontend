import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make search box POS style
content = content.replace('py-2 text-sm', 'py-2 text-[10px] font-mono font-bold uppercase tracking-widest')

# Make chips and bulk actions POS style
content = content.replace('text-[11px] font-bold uppercase tracking-wide', 'text-[9px] font-mono font-bold uppercase tracking-widest')
content = content.replace('text-[11px] font-bold text-absa-passion underline', 'text-[10px] font-mono font-bold uppercase tracking-widest text-absa-passion underline')
content = content.replace('text-[11px] font-bold text-amber-900', 'text-[9px] font-mono font-bold uppercase tracking-widest text-amber-900')
content = content.replace('text-[11px] font-bold text-white', 'text-[9px] font-mono font-bold uppercase tracking-widest text-white')

# Table body cells
content = content.replace('text-sm font-medium text-gray-900', 'text-xs font-mono font-bold text-gray-900')
content = content.replace('text-xs text-gray-500', 'text-[10px] font-mono uppercase tracking-widest text-gray-500')
content = content.replace('text-sm text-gray-900', 'text-[11px] font-mono text-gray-900 font-bold')

# Quick pagination buttons
content = content.replace('text-sm font-medium text-gray-700 hover:bg-gray-50', 'text-[10px] font-mono font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50')
content = content.replace('text-sm text-gray-700', 'text-[10px] font-mono font-bold uppercase tracking-widest text-gray-700')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied more POS styling to MyCustomers.vue")
