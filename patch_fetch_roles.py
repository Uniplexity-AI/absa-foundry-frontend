import re

with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

old_fetch_regex = r"const fetchRoles = async \(\) => \{[\s\S]*?rolesLoading\.value = false\n\s*\}"

mock_fetch = """const fetchRoles = async () => {
    rolesLoading.value = true
    rolesError.value = ''
    try {
      // Robust Local Simulation for Roles
      let localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || 'null')
      if (!localRoles) {
        localRoles = [
          { id: 'superadmin', name: 'SUPERADMIN', description: 'System Administrator with full access to all modules and tools.', permissions: DEFAULT_ROLE_PERMISSIONS['SUPERADMIN'] },
          { id: 'owner', name: 'OWNER', description: 'Business owner with broad visibility and management access.', permissions: DEFAULT_ROLE_PERMISSIONS['OWNER'] },
          { id: 'relationship_manager', name: 'Relationship Manager', description: 'Manages customer relationships, views profiles, and logs activities.', permissions: DEFAULT_ROLE_PERMISSIONS['Relationship Manager'] }
        ]
        localStorage.setItem('mock_absa_roles', JSON.stringify(localRoles))
      }
      roles.value = localRoles
    } catch (err) {
      console.error('Failed to fetch roles', err)
      rolesError.value = err.message || 'Failed to load roles'
    } finally {
      rolesLoading.value = false
    }
  }"""

content = re.sub(old_fetch_regex, mock_fetch, content)

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)
