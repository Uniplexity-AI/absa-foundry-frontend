import re

for filepath in ['src/views/Modules/crm/CRMModule.vue', 'src/views/CRMDashboard.vue']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Revert the font-mono change to the KPI figures
    content = content.replace("text-2xl font-mono font-black", "text-2xl font-black")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
