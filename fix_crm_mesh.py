import os, re

path = 'src/views/Modules/crm/CRMModule.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>', '', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed explicit mesh from CRMModule")
