import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any text-3xl font-black font-display text-gray-900 ... with text-2xl font-black text-gray-900 ...
content = re.sub(r'text-3xl font-black (?:font-display )?text-gray-900 uppercase tracking-tight leading-none mb-1', 'text-2xl font-black text-gray-900 tracking-tight leading-none mb-1', content)

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
