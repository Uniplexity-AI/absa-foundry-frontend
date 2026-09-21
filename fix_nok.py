import re

content = open('src/views/CustomerProfile.vue', 'r', encoding='utf-8').read()

# Remove import getNextOfKin
content = re.sub(r'import { getNextOfKin } from \'@/services/crmApi\'\n', '', content)

# Update nextOfKin computed
content = content.replace(
    'const nextOfKin = ref(null)',
    "const nextOfKin = computed(() => profile.value?.next_of_kin_name ? {\n  name: profile.value.next_of_kin_name,\n  relation: profile.value.next_of_kin_relationship,\n  phone: profile.value.next_of_kin_phone\n} : null)"
)

# Remove getNextOfKin from mounted
content = re.sub(
    r',\s*getNextOfKin\(id\)\s*\.then\(\(data\) => \{ nextOfKin\.value = data \}\)\s*\.catch\(\(e\) => \{ console\.warn\(\'next of kin failed:\', e\.message\) \}\),',
    '',
    content,
    flags=re.DOTALL
)

open('src/views/CustomerProfile.vue', 'w', encoding='utf-8').write(content)
