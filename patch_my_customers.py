import re
with open('src/views/MyCustomers.vue', 'r', encoding='utf-8') as f:
    content = f.read()

if "import { useAuthStore } from '@/stores/auth'" not in content:
    content = content.replace("import { decodeJWT } from '@/services/decodeJWT'", "import { decodeJWT } from '@/services/decodeJWT'\nimport { useAuthStore } from '@/stores/auth'")

old_canLoadData = '''const canLoadData = computed(() => {
  try {
    const jwt = decodeJWT()
    const roles = jwt.getUserRoles?.() || [jwt.getUserRole?.()].filter(Boolean)
    return roles.map((r) => String(r).toUpperCase()).some((r) => LOAD_ROLES.includes(r))
  } catch {
    return false
  }
})'''

new_canLoadData = '''const canLoadData = computed(() => {
  const authStore = useAuthStore()
  return authStore.hasPermission('crm', 'write') || authStore.hasPermission('operations', 'write')
})'''

old_canDelete = '''const canDelete = computed(() => {
  try {
    const jwt = decodeJWT()
    const roles = jwt.getUserRoles?.() || [jwt.getUserRole?.()].filter(Boolean)
    return roles.map((r) => String(r).toUpperCase()).some((r) => DELETE_ROLES.includes(r))
  } catch {
    return false
  }
})'''

new_canDelete = '''const canDelete = computed(() => {
  const authStore = useAuthStore()
  return authStore.hasPermission('crm', 'delete') || authStore.hasPermission('operations', 'delete')
})'''

content = content.replace(old_canLoadData, new_canLoadData)
content = content.replace(old_canDelete, new_canDelete)

with open('src/views/MyCustomers.vue', 'w', encoding='utf-8') as f:
    f.write(content)
