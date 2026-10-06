import re
filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Make today number red
content = content.replace(
    "<span class=\"text-xs font-bold\" :class=\"day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'\">",
    "<span class=\"text-xs font-bold\" :class=\"day.isToday ? 'text-absa-passion' : (day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400')\">"
)

# 2. Make followup events red
content = content.replace(
    "'bg-absa-enrich': evt.type === 'followup'",
    "'bg-absa-passion': evt.type === 'followup'"
)

# 3. Make kanban followup borders red
content = content.replace(
    "'border-l-absa-passion' : 'border-l-absa-enrich'",
    "'border-l-absa-passion' : 'border-l-absa-passion'"
)

# 4. Make list view followup tags red instead of blue
content = content.replace(
    "'bg-blue-50 text-absa-enrich border border-blue-100'",
    "'bg-red-50 text-absa-passion border border-red-100'"
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
