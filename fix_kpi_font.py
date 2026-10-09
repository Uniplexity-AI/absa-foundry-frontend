import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('text-3xl font-black text-gray-900 uppercase tracking-tight leading-none mb-1', 'text-3xl font-black font-display text-gray-900 uppercase tracking-tight leading-none mb-1')

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
