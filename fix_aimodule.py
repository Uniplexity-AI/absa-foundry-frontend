import os
path = 'src/views/Modules/aiagents/AiModule.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('flex h-[100dvh] overflow-hidden /50 relative', 'flex h-[100dvh] overflow-hidden relative')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed AiModule")
