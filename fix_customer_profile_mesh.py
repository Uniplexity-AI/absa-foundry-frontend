import re

filepath = 'src/views/CustomerProfile.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_str = """<div class="w-full min-h-screen pt-6 px-6 pb-12 font-sans relative text-gray-900 bg-transparent">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>"""

new_str = """<div class="w-full min-h-screen pt-6 px-6 pb-12 font-sans relative text-gray-900 absa-mesh">
    <div class="absolute inset-0 z-0 pointer-events-none dotted-pattern opacity-30"></div>"""

content = re.sub(r'<div class="w-full min-h-screen pt-6 px-6 pb-12 font-sans relative text-gray-900 bg-transparent">\s*<!-- Mesh Background -->\s*<div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>', new_str, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated CustomerProfile.vue")
