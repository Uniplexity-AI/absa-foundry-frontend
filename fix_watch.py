import re

repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\EngagementModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The watch block pattern
watch_pattern = r'watch\(\(\) => props\.open.*?\}\n\}\)\n'

# Extract it
match = re.search(watch_pattern, content, flags=re.DOTALL)
if match:
    watch_block = match.group(0)
    # Remove it from current location
    content = content.replace(watch_block, "")
    
    # Insert it right before submit()
    content = content.replace('async function submit() {', watch_block + '\nasync function submit() {')
    
    with open(repo_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("done moving watch block")
else:
    print("watch block not found")
