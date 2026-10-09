import os, re

path = 'src/views/MyCustomers.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the dotted-pattern div completely
content = re.sub(r'<div class="absolute inset-0 dotted-pattern[^>]*></div>\n?', '', content)

# Remove absa-mesh from the root class
content = content.replace(' absa-mesh', '')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up MyCustomers backgrounds")
