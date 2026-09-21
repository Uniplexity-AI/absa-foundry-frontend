import re

file_path = 'src/views/Modules/managers/BranchManagerDashboard.vue'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('â€"', '—')
content = content.replace('â€“', '—')
content = content.replace('â€”', '—')
content = content.replace('A\u00a0', ' | ')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
