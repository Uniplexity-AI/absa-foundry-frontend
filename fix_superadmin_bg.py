import os, re

path = 'src/components/layouts/SuperAdminLayout.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'background:\s*#F8F8FA;', 'background: transparent;', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Made SuperAdminLayout background transparent")
