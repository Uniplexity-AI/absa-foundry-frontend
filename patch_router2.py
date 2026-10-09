import re
with open('src/router/index.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r"meta:\s*\{\s*requiresAuth:\s*true,\s*requiresRoles:\s*\[ADMIN,\s*RM\]\s*\}", "meta: { requiresAuth: true, requiredPermissions: [{ entity: 'operations', action: 'read' }] }", content)
content = re.sub(r"meta:\s*\{\s*requiresAuth:\s*true,\s*requiresRoles:\s*\[ADMIN,\s*RM,\s*OPS\]\s*\}", "meta: { requiresAuth: true, requiredPermissions: [{ entity: 'operations', action: 'read' }] }", content)

# I noticed Branch Manager got set to etl-pipeline? Wait, Branch Manager is OPS. Let's fix that.
content = re.sub(r"name: 'BranchManagerDashboard',\s*component: \(\) => import\('\.\./views/Modules/managers/BranchManagerDashboard\.vue'\),\s*meta: \{ requiredPermissions: \[\{ entity: 'etl-pipeline', action: 'read' \}\]", 
                 r"name: 'BranchManagerDashboard', component: () => import('../views/Modules/managers/BranchManagerDashboard.vue'), meta: { requiredPermissions: [{ entity: 'operations', action: 'read' }]", content)

with open('src/router/index.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed remaining router issues")
