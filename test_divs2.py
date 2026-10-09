with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# find start/end of users div
users_start = None
roles_tab = None
for i, line in enumerate(lines):
    if 'v-show=\"activeTab === \'users\'\"' in line and users_start is None:
        users_start = i
    if '<!-- Roles Tab -->' in line:
        roles_tab = i
        break

print(f'Users v-show starts at line {users_start+1}')
print(f'Roles Tab comment at line {roles_tab+1}')

section = ''.join(lines[users_start:roles_tab])
opens = section.count('<div')
closes = section.count('</div')
print(f'Inside users section: {opens} opens, {closes} closes, diff={opens - closes}')
