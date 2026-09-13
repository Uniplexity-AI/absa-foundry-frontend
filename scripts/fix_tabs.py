import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\aiagents\Models.vue"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Map old "drift" to "monitoring"
content = content.replace("activeTab === 'drift'", "activeTab === 'monitoring'")

# 2. Map old "performance" to "champion" for now, so it at least shows something
content = content.replace("activeTab === 'performance'", "activeTab === 'champion'")

# 3. Map old "retraining" to "training"
content = content.replace("activeTab === 'retraining'", "activeTab === 'training'")

# 4. Map old "logs" to "audit"
content = content.replace("activeTab === 'logs'", "activeTab === 'audit'")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Template tabs mapped.")
