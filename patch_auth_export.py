import re
with open('src/stores/auth.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const DEFAULT_ROLE_PERMISSIONS =", "export const DEFAULT_ROLE_PERMISSIONS =")

with open('src/stores/auth.js', 'w', encoding='utf-8') as f:
    f.write(content)
