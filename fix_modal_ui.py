import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

# Remove Tabs section
content = re.sub(
    r'<!-- Tabs -->.*?</div>\s*<div class=\"p-6\">',
    '<div class=\"p-6\">',
    content,
    flags=re.DOTALL
)

# Remove skipMaster checkbox
content = re.sub(
    r'<label class=\"flex items-start gap-2 text-\[11px\].*?</label>',
    '',
    content,
    flags=re.DOTALL
)

# Remove skipMaster from data/logic
content = re.sub(
    r'const skipMaster = ref\(.*?\)',
    '',
    content
)

content = re.sub(
    r'if \(skipMaster\.value\) \{.*?\}',
    '',
    content,
    flags=re.DOTALL
)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
