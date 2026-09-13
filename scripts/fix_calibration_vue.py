import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\aiagents\Models.vue"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add to imports
content = content.replace("simulatePrediction \n} from '@/services/modelManagementApi'", "simulatePrediction,\n  simulateCalibration \n} from '@/services/modelManagementApi'")
content = content.replace("simulatePrediction\n} from '@/services/modelManagementApi'", "simulatePrediction,\n  simulateCalibration \n} from '@/services/modelManagementApi'")

# Replace simulatedMetrics mock
new_sim = """
  const simulatedMetrics = ref({ tp: 150, fp: 50, tn: 800, fn: 50 })
  let calTimeout = null
  watch(calibrationThreshold, (newVal) => {
    if (calTimeout) clearTimeout(calTimeout)
    calTimeout = setTimeout(async () => {
      try {
        simulatedMetrics.value = await simulateCalibration(newVal)
      } catch (e) {
        console.warn("Failed to simulate calibration", e)
      }
    }, 300)
  })
"""

content = re.sub(r'const simulatedMetrics = computed\(\(\) => \{.*?\}\)', new_sim.strip(), content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
