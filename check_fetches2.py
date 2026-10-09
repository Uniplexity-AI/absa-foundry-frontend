import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split("\n")
for i, line in enumerate(lines):
    if "fetch(" in line:
        print(f"Line {i+1}: {line.strip()}")
