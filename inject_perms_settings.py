with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Add Role button
content = re.sub(
    r'<button @click="openRoleDetails\(\{ name: \'\', description: \'\', permissions: \{\} \}\)"',
    r'<button v-permission="[\'settings\', \'write\']" @click="openRoleDetails({ name: \'\', description: \'\', permissions: {} })"',
    content
)

# Edit Role button
content = re.sub(
    r'<button @click="openRoleDetails\(role\)"',
    r'<button v-permission="[\'settings\', \'edit\']" @click="openRoleDetails(role)"',
    content
)

# Delete Role button
content = re.sub(
    r'<button @click="deleteRole\(role\.id\)"',
    r'<button v-permission="[\'settings\', \'delete\']" @click="deleteRole(role.id)"',
    content
)

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)

print("Settings protected")
