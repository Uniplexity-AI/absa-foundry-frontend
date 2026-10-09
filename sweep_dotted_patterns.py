import os, re

base_path = 'src/views'
count = 0

for root, _, files in os.walk(base_path):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = re.sub(r'<div class="absolute inset-0 dotted-pattern[^>]*></div>\n?', '', content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Cleaned {file}")

print(f"Total files cleaned: {count}")
