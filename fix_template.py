import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

# Remove snapshot section
content = re.sub(
    r'<!-- --------- Feature snapshot --------- -->.*?</div>\s*<p class=\"text-\[11px\] text-gray-500',
    '<p class=\"text-[11px] text-gray-500',
    content,
    flags=re.DOTALL
)

# Remove withSnapshot hint
content = re.sub(
    r'<span v-if=\"withSnapshot\".*?</span>\s*<button',
    '<button',
    content,
    flags=re.DOTALL
)

# Fix button text
content = content.replace(
    r"{{ submitting ? 'Adding…' : (withSnapshot ? 'Edit customer + snapshot' : 'Edit customer') }}",
    r"{{ submitting ? 'Saving…' : 'Save changes' }}"
)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
