repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\PromiseToFundModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Fix the h3 text color, it might still have absa-enrich or absa-passion
content = re.sub(r'<h3 class="([^"]*)text-absa-enrich([^"]*)">', r'<h3 class="\1text-white\2">', content)
content = re.sub(r'<h3 class="([^"]*)text-absa-passion([^"]*)">', r'<h3 class="\1text-white\2">', content)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done fixing h3 color")
