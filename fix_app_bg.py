import os

path = 'src/App.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove 'app-gradient' from the class
content = content.replace('app-gradient absa-mesh', 'absa-mesh')

# Optional: clean up the CSS
import re
content = re.sub(r'\.app-gradient\s*\{[^}]+\}', '', content)
content = re.sub(r':global\(\.dark\)\s*\.app-gradient\s*\{[^}]+\}', '', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed app-gradient from App.vue")
