import re

with open('src/components/intelligence/AiCampaignModal.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Try to find the exact pattern and replace it
# The pattern is:
#         </div>
#   
#         </div>
#         <!-- Launch Panel Footer -->

pattern = r'      </div>\s*</div>\s*<!-- Launch Panel Footer -->'
replacement = r'      </div>\n      <!-- Launch Panel Footer -->'

new_content = re.sub(pattern, replacement, content)

with open('src/components/intelligence/AiCampaignModal.vue', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed duplicate div tag")
