import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

delete_func = '''
  const deleteRole = async (role) => {
    if (!confirm(Are you sure you want to delete role ?)) return
    try {
      const token = localStorage.getItem('token')
      const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim() || 'http://22.84.115.25:8080'
      const tenant = 'absa'

      const res = await fetch(${BASE_URL}/roles/?tenant_id=, {
        method: 'DELETE',
        headers: {
          'Authorization': Bearer 
        }
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || HTTP )
      }

      await fetchRoles()
    } catch (err) {
      console.error('Failed to delete role', err)
      rolesError.value = err.message || 'Failed to delete role'
    }
  }
'''

content = content.replace("const fetchRoles = async () => {", delete_func + "\n  const fetchRoles = async () => {")

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
