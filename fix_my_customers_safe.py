import re

filepath = 'src/views/MyCustomers.vue'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the root wrapper div
old_root = '<div class="w-full pt-6 px-6 pb-8">'
new_root = """<div class="w-full pt-6 px-6 pb-8 absa-mesh relative min-h-screen">
    <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30 z-0"></div>
    <div class="relative z-10 w-full">"""

content = content.replace(old_root, new_root, 1) # only the first occurrence

# Add the two closing divs precisely before the LAST </template>
content = re.sub(r'</template>\s*$', '  </div>\n</div>\n</template>\n', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Safely updated MyCustomers.vue")
