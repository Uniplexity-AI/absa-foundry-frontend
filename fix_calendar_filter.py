import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "return events.value.filter(e => isSameDay(new Date(e.date), date))",
    "return filteredEvents.value.filter(e => isSameDay(new Date(e.date), date))"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
