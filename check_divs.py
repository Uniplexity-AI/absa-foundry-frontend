with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

template = content.split('<script')[0]
opens = template.count('<div')
closes = template.count('</div')
print(f'Template: {opens} opens, {closes} closes, diff={opens - closes}')
