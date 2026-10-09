import os

path = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(' absa-mesh', '')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed explicit absa-mesh from CRMCalendar")
