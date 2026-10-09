import os, re

matches = []
for root, _, files in os.walk('src/views'):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find class="... text-2xl ..." or text-3xl etc
                found = re.findall(r'class="[^"]*\btext-[2-5]xl\b[^"]*"', content)
                for m in found:
                    matches.append(f"{path}: {m}")

print('\n'.join(matches[:30]))
print(f"\nTotal matches: {len(matches)}")
