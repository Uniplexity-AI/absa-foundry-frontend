import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\aiagents\Models.vue"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Green -> Success
content = re.sub(r'text-green-\d00', 'text-status-success', content)
content = re.sub(r'bg-green-(100|50)', 'bg-brand-soft-success', content)
content = re.sub(r'bg-green-\d00', 'bg-status-success', content)
content = re.sub(r'border-green-\d00', 'border-status-success/30', content)

# Amber -> Warning
content = re.sub(r'text-amber-\d00', 'text-status-warning', content)
content = re.sub(r'bg-amber-(100|50)', 'bg-status-warning/10', content)
content = re.sub(r'bg-amber-\d00', 'bg-status-warning', content)
content = re.sub(r'border-amber-\d00', 'border-status-warning/30', content)

# Red -> Error/Absa Passion
content = re.sub(r'text-red-\d00', 'text-absa-passion', content)
content = re.sub(r'bg-red-(100|50)', 'bg-absa-passion/10', content)
content = re.sub(r'bg-red-\d00', 'bg-absa-passion', content)
content = re.sub(r'border-red-\d00', 'border-absa-passion/30', content)

# Blue -> Info
content = re.sub(r'text-blue-\d00', 'text-status-info', content)
content = re.sub(r'bg-blue-(100|50)', 'bg-status-info/10', content)
content = re.sub(r'bg-blue-\d00', 'bg-status-info', content)
content = re.sub(r'border-blue-\d00', 'border-status-info/30', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Colors updated to match brand guide")
