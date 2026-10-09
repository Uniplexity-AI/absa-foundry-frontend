import os, re

base_path = 'src/views'
count = 0

for root, _, files in os.walk(base_path):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove the mesh-background div completely
            new_content = re.sub(r'<div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>\n?', '', content)
            # Remove the local mesh-background CSS class
            new_content = re.sub(r'\.mesh-background\s*\{[^}]+\}', '', new_content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Cleaned {file}")

print(f"Total files cleaned of local mesh: {count}")
