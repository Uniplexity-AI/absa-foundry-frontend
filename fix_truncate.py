repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove truncate and max-w-[200px]
old_line = '<div class="text-[11px] text-gray-600 font-mono mt-1 truncate max-w-[200px]" :title="profiles[h.customerId]?.next_of_kin_name">'
new_line = '<div class="text-[11px] text-gray-600 font-mono mt-1" :title="profiles[h.customerId]?.next_of_kin_name">'
content = content.replace(old_line, new_line)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done removing truncate")
