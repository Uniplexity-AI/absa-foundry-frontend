import os, re

path = 'src/views/Modules/settings/UserManagement.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the mesh-background div completely
content = re.sub(r'<div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>\n?', '', content)

# Remove the dotted-pattern and mesh-background CSS definitions completely
content = re.sub(r'\.dotted-pattern\s*\{[^}]+\}', '', content)
content = re.sub(r'\.mesh-background\s*\{[^}]+\}', '', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up UserManagement backgrounds")
