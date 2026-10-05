import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('rounded-none-none', 'rounded-none')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed rounded-none-none")
