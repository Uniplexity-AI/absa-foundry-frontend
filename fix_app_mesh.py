import os

path = 'src/App.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<div class="app-gradient font-sans antialiased text-gray-900 min-h-screen">',
    '<div class="app-gradient absa-mesh font-sans antialiased text-gray-900 min-h-screen">'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added absa-mesh to App.vue")
