import os, re

files = [
    'src/components/layouts/DashboardLayout.vue',
    'src/components/layouts/SuperAdminLayout.vue',
    'src/views/Modules/settings/SubAccountModule.vue'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the hardcoded font-family that starts with Montserrat
    content = re.sub(r"font-family:\s*'Montserrat'[^;]+;", "/* Removed hardcoded Montserrat */", content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Removed hardcoded Montserrat from layouts")
