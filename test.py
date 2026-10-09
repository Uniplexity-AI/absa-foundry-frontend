with open("src/views/Modules/settings/UserManagement.vue", "r", encoding="utf-8") as f:
    content = f.read()

import re

# Main Permissions Grid
content = re.sub(
    r'<label v-for="perm in \[\'READ\', \'WRITE\', \'EDIT\', \'DELETE\', \'ASSIGN\', \'APPROVE\', \'EXPORT\'\]".*?class="flex items-center gap-2 cursor-pointer group">',
    r'<div v-for="perm in [\'READ\', \'WRITE\', \'EDIT\', \'DELETE\', \'ASSIGN\', \'APPROVE\', \'EXPORT\']" :key="perm" @click.stop.prevent="toggleFeature(activeModalModule, perm.toLowerCase())" class="flex items-center gap-2 cursor-pointer group">',
    content
)

content = re.sub(
    r'</label>\s*</div>\s*</div>\s*<!-- Right Column',
    r'</div>\n                  </div>\n                </div>\n            </div>\n            <!-- Right Column',
    content
)
# Wait, let's just use string replace on the label closing tags within the Main Permissions Grid.
