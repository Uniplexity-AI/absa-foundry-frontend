repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Remove the left border classes from the KPI divs
content = re.sub(r'border-l-4 border-l-absa-passion ', '', content)
content = re.sub(r'border-l-4 border-l-green-600 ', '', content)
content = re.sub(r'border-l-4 border-l-blue-600 ', '', content)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done removing color stripes")
