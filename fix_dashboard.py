import re
filepath = 'src/views/CRMDashboard.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("text-2xl font-black", "text-2xl font-mono font-black")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
