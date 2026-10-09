import os, re

base_path = 'src/views'
count = 0

for root, _, files in os.walk(base_path):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find the first div after <template>
            match = re.search(r'<template>\s*<div[^>]*class="([^"]*)"', content)
            if match:
                classes = match.group(1)
                if 'bg-' in classes:
                    # Let's remove any solid background classes from the root container
                    new_classes = re.sub(r'\bbg-(white|gray-50|gray-100|surface)\b', '', classes)
                    if new_classes != classes:
                        # Replace only the first occurrence
                        content = content.replace(f'class="{classes}"', f'class="{new_classes}"', 1)
                        with open(path, 'w', encoding='utf-8') as f:
                            f.write(content)
                        count += 1
                        print(f"Removed solid bg from root of {file}: {classes} -> {new_classes}")

print(f"Total files cleaned of root solid bg: {count}")
