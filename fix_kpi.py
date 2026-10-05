repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded animate-fade-in-up with conditional
content = content.replace(
    'class="bg-white border border-gray-200 px-6 py-4 min-w-[240px] shadow-sm relative group overflow-hidden animate-fade-in-up"',
    'class="bg-white border border-gray-200 px-6 py-4 min-w-[240px] shadow-sm relative group overflow-hidden" :class="isExportingPdf ? \'\' : \'animate-fade-in-up\'"'
)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done fixing kpi animation")
