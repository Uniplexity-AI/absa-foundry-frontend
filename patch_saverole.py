import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Add saveRoleDetails function
save_func = '''
  const saveRoleDetails = async () => {
    if (!selectedRole.value) return
    savingRole.value = true
    errorMsg.value = ''
    try {
      const token = localStorage.getItem('token')
      const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim() || 'http://22.84.115.25:8080'
      const tenant = 'absa' // Hardcoded for this app context

      const roleId = selectedRole.value.id || selectedRole.value.role_name.toLowerCase().replace(/ /g, '_')

      const payload = {
        id: roleId,
        name: selectedRole.value.role_name,
        description: selectedRole.value.description || '',
        permissions: selectedRole.value.permissions
      }

      // We use POST to create/upsert
      const res = await fetch(${BASE_URL}/roles?tenant_id=, {
        method: 'POST',
        headers: {
          'Authorization': Bearer ,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || HTTP )
      }

      // Success
      closeRoleDetails()
      await fetchRoles()
    } catch (err) {
      console.error('Failed to save role', err)
      errorMsg.value = err.message || 'Failed to save role'
    } finally {
      savingRole.value = false
    }
  }
'''

content = content.replace("const closeRoleDetails = () => {", save_func + "\n  const closeRoleDetails = () => {")

# Bind the button
content = content.replace(
    '''<button @click="closeRoleDetails" class="px-5 py-2.5 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b3002d] transition-colors shadow-md">UPDATE ROLE</button>''',
    '''<button @click="saveRoleDetails" :disabled="savingRole" class="px-5 py-2.5 bg-absa-passion text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b3002d] transition-colors shadow-md disabled:opacity-50">
              <span v-if="savingRole">SAVING...</span>
              <span v-else>UPDATE ROLE</span>
            </button>'''
)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
