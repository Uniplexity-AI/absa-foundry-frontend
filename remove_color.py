repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Header
old_header = '<th class="sticky top-0 bg-absa-passion/10 backdrop-blur z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-absa-passion border-b border-gray-200 px-5 py-3 border-x border-absa-passion/20 w-[220px]">Promise Details</th>'
new_header = '<th class="sticky top-0 bg-gray-100/95 backdrop-blur z-20 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200 px-5 py-3 w-[220px]">Promise Details</th>'
content = content.replace(old_header, new_header)

# Fix Body Cell
old_cell = '<td class="px-5 py-4 align-top whitespace-nowrap bg-absa-passion/5 border-x border-absa-passion/20 relative">'
new_cell = '<td class="px-5 py-4 align-top whitespace-nowrap relative">'
content = content.replace(old_cell, new_cell)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done removing color")
