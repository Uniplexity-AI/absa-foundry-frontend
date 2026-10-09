import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove font-mono from Disable button
content = content.replace('text-[10px] font-mono font-bold uppercase tracking-widest cursor-pointer"', 'text-[10px] font-bold uppercase tracking-widest cursor-pointer"')

# Fix list view toggle button color (remove green)
content = content.replace("'text-green-500 hover:border-green-500'", "'text-gray-800 hover:border-gray-900 hover:text-gray-900'")

with open('src/views/Modules/settings/UserManagement.vue', 'w', encoding='utf-8') as f:
    f.write(content)
