with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

import re

old_script = """  const toggleFeature = (modId, featId) => {"""

new_script = """  const deselectAllMain = (modId) => {
    if (!selectedRole.value || !selectedRole.value.permissions || !selectedRole.value.permissions[modId]) return
    const mainPerms = ['read', 'write', 'edit', 'delete', 'assign', 'approve', 'export']
    selectedRole.value.permissions[modId] = selectedRole.value.permissions[modId].filter(p => !mainPerms.includes(p))
  }

  const toggleFeature = (modId, featId) => {"""

content = content.replace(old_script, new_script)

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)
