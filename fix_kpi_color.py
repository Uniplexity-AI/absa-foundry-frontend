import os, re

files_modified = []
for root, _, files in os.walk('src/views'):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace 'text-2xl font-black tracking-tight text-absa-passion' 
            # or variations with 'text-gray-900'
            new_content = re.sub(
                r'(class="[^"]*text-2xl[^"]*font-black[^"]*tracking-tight[^"]*)text-absa-passion([^"]*")',
                r'\1text-gray-900\2',
                content
            )
            # Also catch text-3xl if any
            new_content = re.sub(
                r'(class="[^"]*text-3xl[^"]*font-black[^"]*tracking-tight[^"]*)text-absa-passion([^"]*")',
                r'\1text-gray-900\2',
                new_content
            )
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_modified.append(path)

print(f"Modified {len(files_modified)} files to text-gray-900")
