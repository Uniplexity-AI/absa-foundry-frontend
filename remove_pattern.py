import os

path = 'src/views/Modules/crm/CRMCalendarPage.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

import re
# Remove the div tags that have dotted-pattern
content = re.sub(r'<div class="absolute inset-0 dotted-pattern[^>]*></div>', '', content)

# Remove the CSS class definition just to be clean
content = re.sub(r'\.dotted-pattern\s*\{[^}]+\}', '', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed dotted pattern from CRMCalendarPage")
