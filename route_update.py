repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\router\index.js'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Find where CRM routes are and insert it
# path: 'crm', component: () => import('@/views/Modules/crm/CRMModule.vue'), children: [ ... ]
# Let's just find "path: 'workspace',"
insert_str = ",\n        {\n          path: 'forms',\n          name: 'CRMDigitalForms',\n          component: () => import('@/views/Modules/crm/CRMDigitalFormsPage.vue')\n        }"

content = content.replace(
    "path: 'workspace',\n          name: 'CRMOmnichannelWorkspace',\n          component: () => import('@/views/Modules/crm/CRMOmnichannelWorkspace.vue')\n        }",
    "path: 'workspace',\n          name: 'CRMOmnichannelWorkspace',\n          component: () => import('@/views/Modules/crm/CRMOmnichannelWorkspace.vue')\n        }" + insert_str
)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done router")
