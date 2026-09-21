content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

content = content.replace(
    '  touched.value = {}',
    '  touched.value = {}\n  currentPage.value = 1'
)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
