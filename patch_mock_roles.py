import re

with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

mock_fetch = """
  const fetchRoles = async () => {
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
  }
"""

mock_save = """
  const saveRoleDetails = async () => {
    if (!selectedRole.value) return
    savingRole.value = true
    errorMsg.value = ''
    try {
      const roleId = selectedRole.value.id || selectedRole.value.name.toLowerCase().replace(/ /g, '_')
      
      const payload = {
        id: roleId,
        name: selectedRole.value.name,
        description: selectedRole.value.description || '',
        permissions: selectedRole.value.permissions
      }

      // Robust Local Simulation for Save
      let localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || '[]')
      const existingIdx = localRoles.findIndex(r => r.id === roleId)
      if (existingIdx >= 0) {
        localRoles[existingIdx] = payload
      } else {
        localRoles.push(payload)
      }
      localStorage.setItem('mock_absa_roles', JSON.stringify(localRoles))

      closeRoleDetails()
      await fetchRoles()
    } catch (err) {
      console.error('Failed to save role', err)
      errorMsg.value = err.message || 'Failed to save role'
    } finally {
      savingRole.value = false
    }
  }
"""

mock_del = """
  const deleteRole = async (role) => {
    if (!confirm(`Are you sure you want to delete role ${role.name}?`)) return
    try {
      // Robust Local Simulation for Delete
      let localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || '[]')
      localRoles = localRoles.filter(r => r.id !== role.id)
      localStorage.setItem('mock_absa_roles', JSON.stringify(localRoles))
      
      await fetchRoles()
    } catch (err) {
      console.error('Failed to delete role', err)
      rolesError.value = err.message || 'Failed to delete role'
    }
  }
"""

# Now replace the existing functions with our mocks
content = re.sub(r'const fetchRoles = async \(\) => \{.*?(?=\n  const openRoleDetails|\n  const saveRoleDetails|\n  const deleteRole|\n  const closeRoleDetails)', mock_fetch, content, flags=re.DOTALL)
content = re.sub(r'const saveRoleDetails = async \(\) => \{.*?(?=\n  const closeRoleDetails|\n  const openRoleDetails|\n  const deleteRole)', mock_save, content, flags=re.DOTALL)
content = re.sub(r'const deleteRole = async \(role\) => \{.*?(?=\n  const fetchRoles|\n  const saveRoleDetails|\n  const openRoleDetails)', mock_del, content, flags=re.DOTALL)

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)
