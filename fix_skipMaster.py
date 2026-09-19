content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

content = content.replace('f.required && !skipMaster', 'f.required')

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
