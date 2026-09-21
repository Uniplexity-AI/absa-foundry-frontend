import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

# Remove snapshot state variables
content = re.sub(r'const snapshot = ref\(\{.*?\}\)\n', '', content)
content = re.sub(r'const snapshotFilter = ref\(\'\'\)\n', '', content)
content = re.sub(r'const computeSnapshot = ref\(true\)\n', '', content)
content = re.sub(r'const tab = ref\(MASTER\)\n', '', content)

# Remove snapshot assignments in resetForm
content = re.sub(r'\s*snapshot\.value = Object\.fromEntries\([\s\S]*?\)\s*// Prefill[\s\S]*?as_of_date\n', '\n', content)
content = re.sub(r'\s*snapshotFilter\.value = \'\'\n', '\n', content)
content = re.sub(r'\s*skipMaster\.value = false\n', '\n', content)
content = re.sub(r'\s*computeSnapshot\.value = true\n', '\n', content)
content = re.sub(r'\s*tab\.value = MASTER\n', '\n', content)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
