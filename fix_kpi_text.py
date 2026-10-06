import re

for filepath in ['src/views/Modules/crm/CRMModule.vue', 'src/views/CRMDashboard.vue']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the top-right tags (e.g. "Target 80%")
    # Remove font-mono, uppercase
    content = re.sub(r'class="text-\[9px\] (.*?) font-mono font-bold uppercase"', r'class="text-xs \1 font-medium"', content)

    # 2. Update the main KPI titles (e.g. Service_Level)
    # class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" -> class="text-xs font-medium text-gray-500 mb-1"
    content = content.replace('class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1"', 'class="text-xs font-medium text-gray-500 mb-1"')
    
    # 3. Replace underscores with spaces in the titles
    content = content.replace(">Service_Level<", ">Service Level<")
    content = content.replace(">Speed_To_Answer<", ">Speed to Answer<")
    content = content.replace(">Abandon_Rate<", ">Abandon Rate<")
    content = content.replace(">Active_Agents<", ">Active Agents<")
    content = content.replace(">Avg_Handle_Time<", ">Avg Handle Time<")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Text styles updated.")
