import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Change height and remove rounded-sm
content = content.replace(
    "class=\"h-[140px] bg-white rounded-sm p-2 transition flex flex-col\"",
    "class=\"h-[180px] bg-white rounded-none p-2 transition flex flex-col\""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
