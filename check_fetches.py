import re

with open('src/views/Modules/settings/UserManagement.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's see the broken fetch calls in the file
matches = re.findall(r'fetch\(.*?\)', content)
print("FETCH CALLS IN FILE:")
for m in matches:
    print(m)
