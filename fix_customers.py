import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace all rounded corners except full
content = re.sub(r'rounded-(sm|md|lg|xl|2xl|3xl|t-md|b-md)', 'rounded-none', content)
content = re.sub(r'\brounded\b', 'rounded-none', content)

# 2. Add mesh background
if 'dotted-pattern' not in content:
    content = content.replace('<div class="w-full pt-6 px-6 pb-8">', '<div class="w-full pt-6 px-6 pb-8 relative">\n      <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>')

# 3. Typography changes for the page header
content = content.replace('text-headline-md font-headline font-semibold text-absa-enrich', 'text-xl font-display font-black uppercase tracking-tight text-absa-enrich relative z-10')
content = content.replace('text-xs text-gray-500 mt-1', 'text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mt-1 relative z-10')
content = content.replace('text-[11px] text-gray-500 mb-1', 'text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-2 relative z-10')

# 4. Button typography
content = re.sub(r'text-xs font-semibold', 'text-[10px] font-mono font-bold uppercase tracking-widest relative z-10', content)
content = re.sub(r'text-sm font-semibold', 'text-[10px] font-mono font-bold uppercase tracking-widest relative z-10', content)

# 5. Table Headers
content = content.replace('class="px-4 py-3 border-b-2 border-absa-passion bg-gray-50/50"', 'class="px-4 py-3 border-b-2 border-absa-passion bg-white font-mono text-[9px] font-bold uppercase tracking-widest relative z-10"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied POS styling to MyCustomers.vue")
