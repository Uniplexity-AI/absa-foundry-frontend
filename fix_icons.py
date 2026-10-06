import re

for filepath in ['src/views/Modules/crm/CRMModule.vue', 'src/views/CRMDashboard.vue']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix Card 1 (Red)
    content = content.replace(
        '<div class="p-2 border border-green-100 bg-green-50 text-green-500"><TrendingUp :size="18"/></div>',
        '<div class="text-absa-passion"><TrendingUp :size="18"/></div>'
    )
    content = content.replace(
        '<span class="text-[9px] text-green-600 font-mono font-bold uppercase">Target 80%</span>',
        '<span class="text-[9px] text-absa-passion font-mono font-bold uppercase">Target 80%</span>'
    )

    # Fix Card 2 (Blue)
    content = content.replace(
        '<div class="p-2 border border-blue-100 bg-blue-50 text-blue-500"><Clock :size="18"/></div>',
        '<div class="text-blue-500"><Clock :size="18"/></div>'
    )

    # Fix Card 3 (Orange)
    content = content.replace(
        '<div class="p-2 border border-orange-100 bg-orange-50 text-orange-500"><AlertTriangle :size="18"/></div>',
        '<div class="text-orange-500"><AlertTriangle :size="18"/></div>'
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Icon containers removed and colors updated.")
