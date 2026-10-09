import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the powershell variable interpolation bug
content = re.sub(r'fetch\(\/roles\?tenant_id=,', 'fetch(`${BASE_URL}/roles?tenant_id=${tenant}`,', content)
content = re.sub(r'fetch\(\/roles\/\?tenant_id=,', 'fetch(`${BASE_URL}/roles/${role.id}?tenant_id=${tenant}`,', content)
content = re.sub(r'fetch\(\/roles\?tenant_id=absa,', 'fetch(`${BASE_URL}/roles?tenant_id=absa`,', content)

# Check for any other broken interpolations
content = re.sub(r'throw new Error\(txt \|\| `HTTP `\)', 'throw new Error(txt || `HTTP ${res.status}`)', content)
content = re.sub(r'throw new Error\(`HTTP `\)', 'throw new Error(`HTTP ${res.status}`)', content)
content = re.sub(r'confirm\(`Are you sure you want to delete role \?`\)', 'confirm(`Are you sure you want to delete role ${role.name}?`)', content)

# Look carefully for exactly what happened:
# "const res = await fetch(${BASE_URL}/roles?tenant_id=, {" -> wait, the powershell string was:
# fetch(`${BASE_URL}/roles?tenant_id=${tenant}`, {

# Actually, let's just do a blind replace of the broken strings
content = content.replace("fetch(`/roles?tenant_id=`, {", "fetch(`${BASE_URL}/roles?tenant_id=${tenant}`, {")
content = content.replace("fetch(`/roles/?tenant_id=`, {", "fetch(`${BASE_URL}/roles/${role.id}?tenant_id=${tenant}`, {")

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
