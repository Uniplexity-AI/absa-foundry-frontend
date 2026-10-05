import re

filepath = 'src/views/CustomerProfile.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any rounded-sm/md/lg etc with rounded-none
content = re.sub(r'rounded-(sm|md|lg|xl|2xl|3xl|t-md|b-md|full)', 'rounded-none', content)
content = re.sub(r'\brounded\b', 'rounded-none', content)
content = content.replace('rounded-none-none', 'rounded-none')

# Check typography just in case
content = content.replace('text-[11px] font-bold text-absa-passion underline', 'text-[10px] font-mono font-bold uppercase tracking-widest text-absa-passion underline')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Double checked CustomerProfile.vue for POS compliance")
