import re

with open('src/components/intelligence/AiNbaPanel.vue', 'r', encoding='cp1252') as f:
    content = f.read()

content = content.replace(
    '<!-- 3-Column Body -->\n    <div class="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">',
    '<!-- 3-Column Body -->\n    <div v-if="nbaOverride" class="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">'
)

target_close = """      </div>
    </div>
  </div>
</template>"""

loading_state = """      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="flex flex-col items-center justify-center py-16 bg-gray-50/50">
      <span class="material-symbols-outlined text-[32px] text-absa-energy animate-spin mb-4">sync</span>
      <h3 class="text-sm font-bold text-absa-enrich mb-1">Evaluating Next Best Action...</h3>
      <p class="text-xs text-gray-500 max-w-md text-center">
        The AI decision engine is currently analyzing the customer profile, recent events, and risk factors to prescribe the optimal intervention. This may take up to a minute.
      </p>
    </div>

  </div>
</template>"""

content = content.replace(target_close, loading_state)

with open('src/components/intelligence/AiNbaPanel.vue', 'w', encoding='cp1252') as f:
    f.write(content)

print("Added skeleton loading state")
