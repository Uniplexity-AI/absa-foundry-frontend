with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# everything before the users v-show
users_start = None
for i, line in enumerate(lines):
    if 'v-show=\"activeTab === \'users\'\"' in line:
        users_start = i
        break

header_section = ''.join(lines[:users_start])
opens = header_section.count('<div')
closes = header_section.count('</div')
print(f'Before users section: {opens} opens, {closes} closes, diff={opens - closes}')
for i, line in enumerate(lines[:users_start]):
    if '<div' in line and '</div' not in line:
        print(f'  Line {i+1}: OPEN: {line.strip()[:80]}')
