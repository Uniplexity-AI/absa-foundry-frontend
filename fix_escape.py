with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("v-permission=\"[\\'settings\\', \\'write\\']\"", "v-permission=\"['settings', 'write']\"")
content = content.replace("v-permission=\"[\\'settings\\', \\'edit\\']\"", "v-permission=\"['settings', 'edit']\"")
content = content.replace("v-permission=\"[\\'settings\\', \\'delete\\']\"", "v-permission=\"['settings', 'delete']\"")

with open("src/views/Modules/settings/UserManagement.vue", "w", encoding="utf-8") as f:
    f.write(content)
