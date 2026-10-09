import os, re

matches = []
for root, _, files in os.walk('src/views'):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                found = re.findall(r'class="[^"]*(?:text-[2-5]xl)[^"]*"[^>]*>\s*\{\{[^}]+\}\}', content)
                if found:
                    for m in found:
                        matches.append(f"{path}: {m}")

print('\n'.join(matches[20:50]))
