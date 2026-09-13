import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\services\modelManagementApi.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

duplicate_block = """
export async function fetchFeatures() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/features`)
  return _handleRes(res)
}
"""

# Replace the first occurrence of the duplicate block
content = content.replace(duplicate_block.strip(), "", 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
