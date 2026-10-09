with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '<!-- Roles Tab -->' in line:
        break

html_up_to_roles = ''.join(lines[:i])
open_divs = html_up_to_roles.count('<div')
close_divs = html_up_to_roles.count('</div')
print(f'Open divs: {open_divs}, Close divs: {close_divs}')
print(f'Roles Tab starts at line {i+1}')
