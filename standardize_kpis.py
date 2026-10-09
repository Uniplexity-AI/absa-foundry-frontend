import os, re

files_modified = []
for root, _, files in os.walk('src/views'):
    for file in files:
        if file.endswith('.vue'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find all classes attached to metrics (elements containing {{ ... }})
            # We want to replace any text-2xl/3xl/4xl and font-bold/black/mono with text-2xl font-black
            # And standard colors to text-absa-passion, EXCEPT if it's explicitly green/amber/orange/success/warning
            
            def replacer(match):
                class_str = match.group(1)
                inner_text = match.group(2)
                
                # If it doesn't look like a number, skip
                if not re.search(r'\{\{.*\}\}', inner_text):
                    return match.group(0)
                    
                # Check if it has text-[2-5]xl
                if not re.search(r'text-[2-5]xl', class_str):
                    return match.group(0)
                    
                # Determine new classes
                new_classes = []
                
                # Keep layout classes
                for cls in class_str.split():
                    if 'text-' in cls and 'xl' in cls: continue
                    if 'font-' in cls: continue
                    if 'tracking-' in cls: continue
                    if 'leading-' in cls: continue
                    if 'mt-' in cls or 'mb-' in cls or 'relative' in cls or 'z-' in cls or 'flex' in cls or 'items-' in cls or 'justify-' in cls or 'w-' in cls or 'h-' in cls or 'bg-' in cls or 'border' in cls or 'shadow' in cls or 'shrink' in cls or 'truncate' in cls or 'sm:' in cls or 'xl:' in cls or 'md:' in cls:
                        new_classes.append(cls)
                
                # Add our standard Absa KPI styling
                new_classes.extend(['text-2xl', 'font-black', 'tracking-tight'])
                
                # Handle color
                if 'text-status-success' in class_str or 'text-green-' in class_str:
                    new_classes.append('text-status-success')
                elif 'text-status-warning' in class_str or 'text-amber-' in class_str or 'text-orange-' in class_str:
                    new_classes.append('text-orange-500')
                elif 'text-red-' in class_str or 'text-absa-passion' in class_str:
                    new_classes.append('text-absa-passion')
                else:
                    new_classes.append('text-absa-passion') # Default to absa red!
                
                # Remove duplicates and reconstruct
                final_class = ' '.join(dict.fromkeys(new_classes))
                return f'class="{final_class}">{inner_text}'

            new_content = re.sub(r'class="([^"]*)"[^>]*>\s*(\{\{[^}]+\}\})', replacer, content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                files_modified.append(path)

print(f"Modified {len(files_modified)} files:")
for f in files_modified:
    print(f" - {f}")
