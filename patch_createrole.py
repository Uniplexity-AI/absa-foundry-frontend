import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'showRoleModal = true', 
    "openRoleDetails({ name: '', description: '', permissions: {} })"
)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
