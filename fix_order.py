import re
content = open('src/components/ingest/EditCustomerModal.vue', 'r', encoding='utf-8').read()

# Fix order of paginatedGroups and masterGroups
content = content.replace(
    'const paginatedGroups = computed(() => {\n  const start = (currentPage.value - 1) * itemsPerPage\n  return masterGroups.value.slice(start, start + itemsPerPage)\n})\nconst totalPages = computed(() => Math.ceil(masterGroups.value.length / itemsPerPage))\n\nconst masterGroups = computed(() => {',
    'const masterGroups = computed(() => {'
)

content = content.replace(
    '  return groups\n})',
    '  return groups\n})\n\nconst paginatedGroups = computed(() => {\n  const start = (currentPage.value - 1) * itemsPerPage\n  return masterGroups.value.slice(start, start + itemsPerPage)\n})\nconst totalPages = computed(() => Math.ceil(masterGroups.value.length / itemsPerPage))'
)

open('src/components/ingest/EditCustomerModal.vue', 'w', encoding='utf-8').write(content)
