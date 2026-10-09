import os, re

base_path = 'src/views'
count = 0

for root, _, files in os.walk(base_path):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove <div class="... dot-pattern ..."></div>
            new_content = re.sub(r'<div[^>]*dot-pattern[^>]*></div>\n?', '', content)
            
            # Remove dot-pattern from class attributes where it's mixed with other classes
            new_content = re.sub(r'(class="[^"]*)\bdot-pattern\b([^"]*")', r'\1\2', new_content)
            
            # Remove dot-pattern CSS definitions
            new_content = re.sub(r'\.dot-pattern\s*\{[^}]+\}', '', new_content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Cleaned {file}")

print(f"Total files cleaned of dot-pattern: {count}")
