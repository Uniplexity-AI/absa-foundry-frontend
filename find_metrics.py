import os, re

matches = []
for root, _, files in os.walk('src/views'):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find elements with text-2xl to text-5xl that also have a font-weight or color
                # that look like KPIs
                found = re.findall(r'class="[^"]*(?:text-[2-5]xl)[^"]*"[^>]*>\s*\{\{[^}]+\}\}', content)
                if found:
                    for m in found:
                        matches.append(f"{path}: {m}")

print('\n'.join(matches[:20]))
print(f"\nTotal metric blocks found: {len(matches)}")
