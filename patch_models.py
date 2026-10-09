import re
with open('src/views/Modules/aiagents/Models.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure useAuthStore is imported
if "import { useAuthStore } from '@/stores/auth'" not in content:
    content = content.replace("import { decodeJWT } from '@/services/decodeJWT'", "import { decodeJWT } from '@/services/decodeJWT'\nimport { useAuthStore } from '@/stores/auth'")

old_canRetrain = '''const canRetrain = computed(() => {
  try {
    const roles = (decodeJWT().getUserRoles?.() || []).map((r) => String(r).toUpperCase())
    return roles.includes('ADMIN') || roles.includes('DATA_SCIENTIST')
  } catch (e) {
    return false
  }
})'''

new_canRetrain = '''const canRetrain = computed(() => {
  const authStore = useAuthStore()
  return authStore.hasPermission('intelligence', 'execute')
})'''

content = content.replace(old_canRetrain, new_canRetrain)

with open('src/views/Modules/aiagents/Models.vue', 'w', encoding='utf-8') as f:
    f.write(content)
