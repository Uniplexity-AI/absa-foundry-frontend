repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\MyCustomers.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_statement = """import { getActionLog } from '@/utils/absaActions'
import PromiseToFundModal from '@/components/crm/PromiseToFundModal.vue'

defineOptions({ name: 'MyCustomers' })"""

content = content.replace("defineOptions({ name: 'MyCustomers' })", import_statement)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done import patch")
