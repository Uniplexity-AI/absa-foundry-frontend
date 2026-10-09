import re
with open('src/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

import_statement = "import { permissionDirective } from './directives/permission';\n"
if "permissionDirective" not in content:
    content = content.replace("import App from './App.vue';", import_statement + "import App from './App.vue';")

directive_statement = "app.directive('permission', permissionDirective);\n"
if "app.directive('permission'" not in content:
    content = content.replace("app.use(router);", "app.use(router);\n" + directive_statement)

with open('src/main.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Registered directive in main.js")
