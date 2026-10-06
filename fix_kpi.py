import re
filepath = 'src/views/Modules/crm/CRMModule.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the grey stripes from regular KPI cards
content = content.replace(" border-l-4 border-l-gray-200", "")
content = content.replace(" hover:border-l-absa-passion", "")

# 2. Remove the red stripe from the Analytics KPI card
content = content.replace(" border-l-4 border-l-[#b3002d]", "")

# 3. Change the font of the KPI numbers to font-mono (the same as the calendar)
# The text classes look like: class="text-2xl font-black text-absa-passion tracking-tight"
# Let's replace 'text-2xl font-black' with 'text-2xl font-mono font-black' everywhere in the KPI sections
content = content.replace("text-2xl font-black", "text-2xl font-mono font-black")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("CRMModule.vue updated.")
