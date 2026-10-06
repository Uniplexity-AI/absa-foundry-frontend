import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace fixed width with flex-1
content = content.replace(
    "class=\"min-w-[280px] w-72 bg-gray-50/50 rounded-sm border border-gray-200 flex flex-col max-h-[70vh]\"",
    "class=\"flex-1 min-w-[280px] bg-gray-50/50 rounded-sm border border-gray-200 flex flex-col max-h-[70vh]\""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
