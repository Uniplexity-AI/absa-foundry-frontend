import re
with open('src/components/layouts/DashboardLayout.vue', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const canAdmin     = computed(() => authStore.isAdmin)", "")

with open('src/components/layouts/DashboardLayout.vue', 'w', encoding='utf-8') as f:
    f.write(content)
