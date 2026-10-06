import re

with open('src/views/Modules/settings/UserManagement.vue', 'r') as f:
    content = f.read()

# Replace the duplicate block
target = '''const activeBranches = computed(() => {
  const branchSet = new Set(users.value.map(u => u.branch_code).filter(Boolean))
  return branchSet.size || 0
})

const activeUsersCount = computed(() => {
  return users.value.filter(u => u.is_active).length || 0
})

const activeBranches = computed(() => {
  const branchSet = new Set(users.value.map(u => u.branch_code).filter(Boolean))
  return branchSet.size || 0
})'''

replacement = '''const activeBranches = computed(() => {
  const branchSet = new Set(users.value.map(u => u.branch_code).filter(Boolean))
  return branchSet.size || 0
})

const activeUsersCount = computed(() => {
  return users.value.filter(u => u.is_active).length || 0
})'''

if target in content:
    content = content.replace(target, replacement)
    with open('src/views/Modules/settings/UserManagement.vue', 'w') as f:
        f.write(content)
    print('Fixed duplicates!')
else:
    print('Target not found, using regex...')
    content = re.sub(r'const activeBranches = computed\(\(\) => \{.*?\}\)\s*const activeUsersCount = computed\(\(\) => \{.*?\}\)\s*const activeBranches = computed\(\(\) => \{.*?\}\)', replacement, content, flags=re.DOTALL)
    with open('src/views/Modules/settings/UserManagement.vue', 'w') as f:
        f.write(content)
    print('Regex applied.')
