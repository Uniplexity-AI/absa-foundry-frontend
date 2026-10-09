import os, re

path = 'src/assets/main.css'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the background rules for layout classes
content = re.sub(
    r'\.superadmin-layout,\s*\.superadmin-main\s*\{\s*background:\s*var\(--color-background\)\s*!important;\s*color:\s*var\(--color-text-primary\);\s*\}',
    r'.superadmin-layout, .superadmin-main { color: var(--color-text-primary); }',
    content
)

content = re.sub(
    r'\.dashboard-layout,\s*\.dashboard-main\s*\{\s*background:\s*var\(--color-background\)\s*!important;\s*color:\s*var\(--color-text-primary\);\s*\}',
    r'.dashboard-layout, .dashboard-main { color: var(--color-text-primary); }',
    content
)

# Also check for .superadmin-main > :is(...) and .dashboard-main > :is(...)
content = re.sub(
    r'\.superadmin-main > :is\(\.min-h-screen, main\)\s*\{\s*background-color:\s*transparent\s*!important;\s*color:\s*var\(--color-text-primary\);\s*\}',
    r'.superadmin-main > :is(.min-h-screen, main) { color: var(--color-text-primary); }',
    content
)

content = re.sub(
    r'\.dashboard-main > :is\(\.min-h-screen, main\)\s*\{\s*background-color:\s*transparent\s*!important;\s*color:\s*var\(--color-text-primary\);\s*\}',
    r'.dashboard-main > :is(.min-h-screen, main) { color: var(--color-text-primary); }',
    content
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed main.css backgrounds")
