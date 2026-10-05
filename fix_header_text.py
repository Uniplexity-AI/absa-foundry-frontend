repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace text-absa-enrich with text-absa-passion for the header
old_text = '<h3 class="text-xl font-black uppercase tracking-tight text-absa-enrich mb-2 font-display">'
new_text = '<h3 class="text-xl font-black uppercase tracking-tight text-absa-passion mb-2 font-display">'
content = content.replace(old_text, new_text)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done making header text red")
