import re
filepath = 'src/views/Modules/crm/CRMOmnichannelWorkspace.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the red outline buttons with neutral grey outline buttons
content = content.replace(
    'bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10',
    'bg-white text-gray-700 border border-gray-300 hover:border-absa-passion hover:text-absa-passion'
)

# Also replace the red 'Release' button
content = content.replace(
    'bg-transparent text-red-400 border border-red-500 hover:bg-red-500/20',
    'bg-white text-gray-700 border border-gray-300 hover:border-red-500 hover:text-red-500'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Buttons updated.")
