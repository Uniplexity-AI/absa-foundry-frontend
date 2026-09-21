import re

with open('src/components/intelligence/AiCampaignModal.vue', 'r', encoding='cp1252') as f:
    content = f.read()

# Target replacement string
target_start = """    <!-- Scrollable Body -->
    <div class="p-6 overflow-y-auto flex-1 bg-white">
      
      <!-- Selected Cohort Header -->"""

replacement_start = """    <!-- Scrollable Body -->
    <div class="p-6 overflow-y-auto flex-1 bg-white">
      
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-16 h-full text-center">
        <span class="material-symbols-outlined text-[48px] text-absa-passion animate-spin mb-4">sync</span>
        <h3 class="text-lg font-bold text-absa-enrich mb-2">Analyzing Cohort...</h3>
        <p class="text-sm text-gray-500 max-w-sm">
          The AI decision engine is currently analyzing the selected customers and generating tailored campaign strategies to maximize retention and CLV.
        </p>
      </div>

      <div v-else>
      <!-- Selected Cohort Header -->"""

content = content.replace(target_start, replacement_start)

# End replacement string
target_end = """      </div>
      <!-- Launch Panel Footer -->"""

replacement_end = """      </div>
      </div>
      <!-- Launch Panel Footer -->"""

content = content.replace(target_end, replacement_end)

with open('src/components/intelligence/AiCampaignModal.vue', 'w', encoding='cp1252') as f:
    f.write(content)

print("Added modal loading state successfully")
