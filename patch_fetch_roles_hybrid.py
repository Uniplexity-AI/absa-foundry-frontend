import re

with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

# Find the fetchRoles function
old_fetch_regex = r"const fetchRoles = async \(\) => \{.*?(?=\n  const openRoleDetails|\n  const saveRoleDetails|\n  const deleteRole|\n\})"
match = re.search(old_fetch_regex, content, flags=re.DOTALL)

new_fetch = """const fetchRoles = async () => {
    rolesLoading.value = true
    rolesError.value = ''
    try {
      const token = localStorage.getItem('token')
      const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim() || 'http://22.84.115.25:8080'
      
      let apiRoles = []
      try {
        const res = await fetch(`${BASE_URL}/auth/admin/roles`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const rawRoles = await res.json()
          apiRoles = rawRoles.map(r => ({
            id: r.role_id || r.role_name,
            name: r.role_name,
            description: r.description || '',
            permissions: DEFAULT_ROLE_PERMISSIONS[r.role_name] || DEFAULT_ROLE_PERMISSIONS['SUPERADMIN']
          }))
        }
      } catch (apiErr) {
        console.warn('API roles fetch failed, falling back to local only:', apiErr)
      }

      // Robust Local Simulation for Roles (Overrides)
      let localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || '[]')
      
      const merged = [...apiRoles]
      for (const lr of localRoles) {
        const idx = merged.findIndex(r => r.id === lr.id || r.name === lr.name)
        if (idx >= 0) {
          merged[idx] = { ...merged[idx], ...lr }
        } else {
          merged.push(lr)
        }
      }

      // If empty, supply some defaults just in case
      if (merged.length === 0) {
        merged.push({ id: 'superadmin', name: 'SUPERADMIN', description: 'System Administrator.', permissions: DEFAULT_ROLE_PERMISSIONS['SUPERADMIN'] })
        merged.push({ id: 'relationship_manager', name: 'RELATIONSHIP_MANAGER', description: 'Manages customers.', permissions: DEFAULT_ROLE_PERMISSIONS['RELATIONSHIP_MANAGER'] || {} })
      }
      
      roles.value = merged
    } catch (err) {
      console.error('Failed to fetch roles', err)
      rolesError.value = err.message || 'Failed to load roles'
    } finally {
      rolesLoading.value = false
    }
  }"""

content = re.sub(old_fetch_regex, new_fetch, content, flags=re.DOTALL)

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)
