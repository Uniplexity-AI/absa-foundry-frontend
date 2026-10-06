import re

filepath = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace classes for views
content = content.replace(
    "class=\"px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5\"",
    "class=\"px-3 h-7 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest transition flex items-center gap-1.5\""
)

# Replace classes for filters
content = content.replace(
    "class=\"px-3 py-1.5 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition\"",
    "class=\"px-3 h-7 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap transition flex items-center justify-center\""
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed Box Sizes")
