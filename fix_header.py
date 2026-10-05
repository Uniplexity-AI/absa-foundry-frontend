repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Update the Header Container
old_header_container = '<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-white/90 backdrop-blur-md relative z-10 shrink-0 border-b border-gray-200">'
new_header_container = '<div class="px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 bg-absa-passion relative z-10 shrink-0 shadow-md">'
content = content.replace(old_header_container, new_header_container)

# 2. Update the Logo
old_logo = '<img src="/absa-logo.png" alt="Absa Logo" class="h-10 w-auto object-contain mt-1 mix-blend-multiply">'
new_logo = '<img src="/absa-logo.png" alt="Absa Logo" class="h-10 w-auto object-contain mt-1 brightness-0 invert">'
content = content.replace(old_logo, new_logo)

# 3. Update the vertical bar
old_bar = '<div class="w-1.5 h-12 bg-absa-passion shrink-0 mt-0.5"></div>'
new_bar = '<div class="w-1.5 h-12 bg-white/30 shrink-0 mt-0.5"></div>'
content = content.replace(old_bar, new_bar)

# 4. Update the Title Text
old_title = '<h3 class="text-xl font-black uppercase tracking-tight text-absa-enrich mb-2 font-display">'
new_title = '<h3 class="text-xl font-black uppercase tracking-tight text-white mb-2 font-display">'
content = content.replace(old_title, new_title)

# 5. Update the Subtitle Text
old_subtitle = '<p class="text-[10px] text-gray-500 max-w-3xl font-mono tracking-wide leading-relaxed">'
new_subtitle = '<p class="text-[10px] text-white/80 max-w-3xl font-mono tracking-wide leading-relaxed">'
content = content.replace(old_subtitle, new_subtitle)

# 6. Update the Close Button
old_btn = '<button @click="$emit(\'close\')" class="text-gray-400 hover:text-absa-passion transition-colors self-start border border-transparent hover:border-absa-passion/30 bg-gray-50 hover:bg-absa-passion/5 p-1 rounded-none">'
new_btn = '<button @click="$emit(\'close\')" class="text-white/70 hover:text-white transition-colors self-start border border-transparent hover:border-white/30 bg-transparent hover:bg-white/10 p-1 rounded-none">'
content = content.replace(old_btn, new_btn)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done header styling")
