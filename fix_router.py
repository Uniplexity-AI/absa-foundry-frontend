repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\router\index.js'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find:
# { path: 'crm/workspace',       name: 'CrmWorkspace', component: () => import('../views/Modules/crm/CRMOmnichannelWorkspace.vue'), meta: { requiresRoles: [ADMIN, RM] } },

old_str = "{ path: 'crm/workspace',       name: 'CrmWorkspace', component: () => import('../views/Modules/crm/CRMOmnichannelWorkspace.vue'), meta: { requiresRoles: [ADMIN, RM] } },"
new_str = old_str + "\n      { path: 'crm/forms', name: 'CRMDigitalForms', component: () => import('../views/Modules/crm/CRMDigitalFormsPage.vue'), meta: { requiresRoles: [ADMIN, RM], title: 'Digital Forms' } },"

if old_str in content:
    content = content.replace(old_str, new_str)
else:
    print("WARNING: Could not find old_str")

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done router fix")
