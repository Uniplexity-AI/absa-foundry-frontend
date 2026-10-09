import os, re

path = 'src/views/Modules/settings/SubAccountModule.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'<div class="absolute inset-0 dotted-pattern[^>]*></div>\n?', '', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up SubAccountModule backgrounds")
