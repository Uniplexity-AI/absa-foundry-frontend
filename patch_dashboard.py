import re
with open('src/components/layouts/DashboardLayout.vue', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r"const canAnalytics = computed\(\(\) => authStore\.isAdmin \|\| authStore\.isRM\)",
    "const canAnalytics = computed(() => authStore.hasPermission('crm', 'read') || authStore.hasPermission('operations', 'read'))",
    content
)

content = re.sub(
    r"const canPredict\s*=\s*computed\(\(\) => authStore\.isAdmin \|\| authStore\.isRM \|\| authStore\.isDS\)",
    "const canPredict   = computed(() => authStore.hasPermission('intelligence', 'read'))",
    content
)

content = re.sub(
    r"const canModels\s*=\s*computed\(\(\) => authStore\.isAdmin \|\| authStore\.isDS\)",
    "const canModels    = computed(() => authStore.hasPermission('intelligence', 'read'))",
    content
)

content = re.sub(
    r"const canEtl\s*=\s*computed\(\(\) => authStore\.isAdmin \|\| authStore\.isOps\)",
    "const canEtl       = computed(() => authStore.hasPermission('etl-pipeline', 'read'))",
    content
)

if "const canAdmin = computed(() => authStore.hasPermission('settings', 'read'))" not in content:
    content = content.replace("const canEtl       = computed(() => authStore.hasPermission('etl-pipeline', 'read'))",
                              "const canEtl       = computed(() => authStore.hasPermission('etl-pipeline', 'read'))\nconst canAdmin = computed(() => authStore.hasPermission('settings', 'read'))")

with open('src/components/layouts/DashboardLayout.vue', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated DashboardLayout.vue RBAC controls")
