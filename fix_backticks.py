import re
with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "if (!confirm(Are you sure you want to delete role ?)) return",
    "if (!confirm(`Are you sure you want to delete role ${role.name}?`)) return"
)
with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
