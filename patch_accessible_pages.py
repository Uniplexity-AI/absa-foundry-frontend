import re

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if "import { DEFAULT_ROLE_PERMISSIONS } from '@/stores/auth'" not in content:
        content = content.replace("import { useRouter } from 'vue-router'", "import { useRouter } from 'vue-router'\nimport { DEFAULT_ROLE_PERMISSIONS } from '@/stores/auth'")

    old_func = '''const getAccessiblePages = (roleName) => {
  const routes = router.getRoutes()
  const pages = new Set()
  
  routes.forEach(route => {
    if (route.meta && route.meta.requiresRoles && route.meta.requiresRoles.includes(roleName)) {
      if (route.meta.title) {
        pages.add(route.meta.title)
      } else if (route.name) {
        pages.add(route.name)
      }
    }
  })
  
  return Array.from(pages).sort()
}'''

    new_func = '''const getAccessiblePages = (roleName) => {
  const routes = router.getRoutes()
  const pages = new Set()
  const rolePerms = DEFAULT_ROLE_PERMISSIONS[roleName] || {}
  
  routes.forEach(route => {
    let hasAccess = false
    
    // Check RBAC permissions
    if (route.meta && route.meta.requiredPermissions) {
      hasAccess = route.meta.requiredPermissions.every(p => {
        return rolePerms[p.entity] && rolePerms[p.entity].includes(p.action)
      })
    } 
    // Fallback for legacy roles
    else if (route.meta && route.meta.requiresRoles) {
      hasAccess = route.meta.requiresRoles.includes(roleName)
    }

    if (hasAccess) {
      if (route.meta.title) {
        pages.add(route.meta.title)
      } else if (route.name) {
        pages.add(route.name)
      }
    }
  })
  
  return Array.from(pages).sort()
}'''
    
    # We use regex replacement to be safe with indentation
    # Let's just do a direct string replace
    # Wait, the indentation might differ
    pattern = re.compile(r'const getAccessiblePages = \(roleName\) => \{.*?\n\}', re.DOTALL)
    content = pattern.sub(new_func, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('src/views/Modules/settings/SettingsModule.vue')
update_file('src/views/Modules/settings/UserManagement.vue')
