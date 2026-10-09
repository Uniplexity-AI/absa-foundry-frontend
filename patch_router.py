import re

with open('src/router/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the router guard logic
guard_pattern = re.compile(r"// Role check\n\s*const required = to\.meta\.requiresRoles\n.*?if \(!canAccess\) return \'/403\'\n\s*\}", re.DOTALL)
new_guard = '''// Permission check (RBAC)
  const requiredPerms = to.meta.requiredPermissions
  if (requiredPerms && requiredPerms.length > 0) {
    const hasAccess = requiredPerms.every(p => authStore.hasPermission(p.entity, p.action))
    if (!hasAccess) return '/403'
  }
  
  // Legacy Role check fallback for routes not yet updated
  const requiredRoles = to.meta.requiresRoles
  if (requiredRoles && requiredRoles.length > 0) {
    const canAccess = requiredRoles.some(r => authStore.roles.includes(r))
    if (!canAccess) return '/403'
  }'''
content = guard_pattern.sub(new_guard, content)

# 2. Update the routes themselves
# For intelligence -> requiredPermissions: [{ entity: 'intelligence', action: 'read' }]
content = re.sub(r"meta:\s*\{\s*requiresRoles:\s*\[ADMIN,\s*RM,\s*DS\]", "meta: { requiredPermissions: [{ entity: 'intelligence', action: 'read' }]", content)

# For CRM -> requiredPermissions: [{ entity: 'crm', action: 'read' }]
content = re.sub(r"meta:\s*\{\s*requiresRoles:\s*\[ADMIN,\s*RM\]", "meta: { requiredPermissions: [{ entity: 'crm', action: 'read' }]", content)

# For Operations / ETL -> requiredPermissions: [{ entity: 'etl-pipeline', action: 'read' }]
content = re.sub(r"meta:\s*\{\s*requiresRoles:\s*\[ADMIN,\s*OPS\]", "meta: { requiredPermissions: [{ entity: 'etl-pipeline', action: 'read' }]", content)

# For Models -> requiredPermissions: [{ entity: 'intelligence', action: 'read' }] (Since DS + ADMIN)
content = re.sub(r"meta:\s*\{\s*requiresRoles:\s*\[ADMIN,\s*DS\]", "meta: { requiredPermissions: [{ entity: 'intelligence', action: 'read' }]", content)

# For Settings -> requiredPermissions: [{ entity: 'settings', action: 'read' }]
content = re.sub(r"meta:\s*\{\s*requiresRoles:\s*\[ADMIN\]", "meta: { requiredPermissions: [{ entity: 'settings', action: 'read' }]", content)

with open('src/router/index.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated router.js with permissions guard.")
