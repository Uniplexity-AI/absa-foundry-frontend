import os

filepath = '../absa-foundry-backend/customer-lifecycle-ai/gateway/routes/crm_routes.py'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the expanduser with the absolute hardcoded path
content = content.replace(
    'blob_path = os.path.expanduser("~/.ollama/models/blobs/sha256-2bada8a7450677000f678be90653b85d364de7db25eb5ea54136ada5f3933730")',
    'blob_path = "C:/Users/ADMIN/.ollama/models/blobs/sha256-2bada8a7450677000f678be90653b85d364de7db25eb5ea54136ada5f3933730"'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed the model blob path.")
