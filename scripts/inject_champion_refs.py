import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\aiagents\Models.vue"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix triggerRetrain to triggerRetrainAction in the template
content = content.replace("@click=\"triggerRetrain\"", "@click=\"triggerRetrainAction\"")

# Add the new reactive vars
refs_to_add = """
  const selectedFeaturesForTraining = ref([])
  const modelComparisonData = ref(null)

  async function loadComparison() {
    try {
      modelComparisonData.value = await fetchModelComparison()
    } catch (e) {
      console.warn("Failed to load model comparison", e)
    }
  }

  // Load comparison on mount
  onMounted(loadComparison)
"""

content = content.replace("const retraining = ref(false)", "const retraining = ref(false)\n" + refs_to_add)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
