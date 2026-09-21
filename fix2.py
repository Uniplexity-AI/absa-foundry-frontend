import re

file_path = 'src/views/Modules/managers/BranchManagerDashboard.vue'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const activeTab = ref('overview')\n", "")
content = content.replace("const caseFilter = ref('all')\n", "")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
