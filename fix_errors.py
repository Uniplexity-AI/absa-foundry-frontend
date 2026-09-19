import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

# Fix the extra parenthesis and add back hasErrors
content = re.sub(
    r'const masterErrors = computed\(\(\) =>\n  Object\.fromEntries\(masterFields\.value\.map\(\(f\) => \[f\.name, validateField\(f, master\.value\)\]\)\)\n\)\n\)',
    'const masterErrors = computed(() =>\n  Object.fromEntries(masterFields.value.map((f) => [f.name, validateField(f, master.value)]))\n)\n\nconst hasErrors = computed(() => Object.values(masterErrors.value).some(Boolean))',
    content,
    flags=re.DOTALL
)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
