import re

with open('src/components/intelligence/AiCampaignModal.vue', 'r', encoding='cp1252') as f:
    content = f.read()

target = """      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-8">"""

replacement = """      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-8">
      
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-center h-full">
          <span class="material-symbols-outlined text-[48px] text-absa-passion animate-spin mb-4">sync</span>
          <h3 class="text-lg font-bold text-absa-enrich mb-2">Analyzing Cohort...</h3>
          <p class="text-sm text-gray-500 max-w-sm">
            The AI decision engine is currently analyzing the selected customers and generating tailored campaign strategies to maximize retention and CLV.
          </p>
        </div>

        <template v-else>"""

content = content.replace(target, replacement)

target_end = """        </section>

      </div>
      <!-- Footer Actions -->"""

replacement_end = """        </section>
        </template>

      </div>
      <!-- Footer Actions -->"""

content = content.replace(target_end, replacement_end)

with open('src/components/intelligence/AiCampaignModal.vue', 'w', encoding='cp1252') as f:
    f.write(content)

print("Added modal loading state successfully")
