import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

content = re.sub(
    r'<div class=\"flex items-center gap-6 px-6 pt-3 border-b border-gray-200 bg-gray-50\">.*?</div>\s*<!-- Form -->',
    '<!-- Form -->',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'<!-- --------- Feature snapshot --------- -->.*?</fieldset>\s*</div>',
    '',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'let addedSnapshot = false\s+if \(withSnapshot\.value\) \{.*?\}',
    '',
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'let statesUpserted = null\s+if \(addedSnapshot.*?\}',
    '',
    content,
    flags=re.DOTALL
)

content = content.replace('addedSnapshot ? \'feature snapshot\' : null,', '')
content = content.replace('statesUpserted != null', 'False')
content = content.replace('snapshot: addedSnapshot', 'snapshot: False')
content = content.replace('v-show=\"tab === MASTER\"', '')

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
