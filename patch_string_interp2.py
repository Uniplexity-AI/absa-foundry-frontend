with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    "const res = await fetch(${BASE_URL}/roles?tenant_id=, {",
    "const res = await fetch(`${BASE_URL}/roles?tenant_id=${tenant}`, {"
)

content = content.replace(
    "const res = await fetch(${BASE_URL}/roles/?tenant_id=, {",
    "const res = await fetch(`${BASE_URL}/roles/${role.id}?tenant_id=${tenant}`, {"
)

# And fix any broken template literals for errors
content = content.replace("throw new Error(txt || `HTTP `)", "throw new Error(txt || `HTTP ${res.status}`)")
content = content.replace("throw new Error(`HTTP `)", "throw new Error(`HTTP ${res.status}`)")
content = content.replace("confirm(`Are you sure you want to delete role ?`)", "confirm(`Are you sure you want to delete role ${role.name}?`)")

# And fetchRoles had a broken one too! Oh wait, fetchRoles line 838 is using backticks properly.
content = content.replace("fetch(`${BASE_URL}/auth/admin/roles`, {", "fetch(`${BASE_URL}/roles?tenant_id=absa`, {")


with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
