import os
path = 'src/views/Modules/datapipeline/EtlVisualBuilder.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('dark:-container rounded-lg p-6 space-y-8', 'dark:bg-surface-container rounded-lg p-6 space-y-8')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed EtlVisualBuilder")
