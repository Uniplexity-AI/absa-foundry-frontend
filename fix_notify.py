import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

content = content.replace(
    r"notify(\Saved record for \\, 'success'",
    r"notify(Saved record for , 'success'"
)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
