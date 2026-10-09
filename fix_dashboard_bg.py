import os, re

path = 'src/components/layouts/DashboardLayout.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'background:\s*#ffffff;', 'background: transparent;', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Made DashboardLayout background transparent")
