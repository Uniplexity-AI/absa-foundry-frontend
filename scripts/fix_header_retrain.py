import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\aiagents\Models.vue"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace @click="requestRetrain" with @click="triggerRetrainAction"
content = content.replace("@click=\"requestRetrain\"", "@click=\"triggerRetrainAction\"")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
