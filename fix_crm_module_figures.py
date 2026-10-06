import re
filepath = 'src/views/Modules/crm/CRMModule.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the figure styles in CRMModule with the exact styles from CRMDashboard
content = content.replace("text-3xl font-bold font-display", "text-2xl font-black")
content = content.replace("text-3xl font-bold font-display text-orange-500", "text-2xl font-black text-orange-500")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
