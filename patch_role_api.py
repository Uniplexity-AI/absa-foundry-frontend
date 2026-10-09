import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update API Endpoint
old_fetch = '''const res = await fetch(${BASE_URL}/auth/admin/roles, {'''
new_fetch = '''const res = await fetch(${BASE_URL}/roles?tenant_id=absa, {'''
content = content.replace(old_fetch, new_fetch)

# 2. Rename role_name to name in template and script
content = content.replace('role.role_name', 'role.name')
content = content.replace('selectedRole.value.role_name', 'selectedRole.value.name')
content = content.replace('selectedRole.role_name', 'selectedRole.name')

# 3. Rename role_id to id
content = content.replace('role.role_id', 'role.id')

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
