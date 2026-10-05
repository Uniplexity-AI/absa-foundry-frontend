repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\MyCustomers.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
imports_target = "import { useCurrency } from '@/composables/useCurrency'"
imports_new = """import { useCurrency } from '@/composables/useCurrency'
import { getActionLog } from '@/utils/absaActions'
import PromiseToFundModal from '@/components/crm/PromiseToFundModal.vue'"""
content = content.replace(imports_target, imports_new)

# 2. State
script_setup_target = "const showLoadData = ref(false)"
script_setup_new = """const showLoadData = ref(false)

const showPromiseToFund = ref(false)
const ptfEngagements = computed(() => {
  return getActionLog().filter(e => e.meta && (e.meta.isPromise === true || e.meta.isPromise === 'true' || e.meta.outcome === 'Promised to Fund'))
})
"""
content = content.replace(script_setup_target, script_setup_new)

# 3. Replace Button safely!
# Find the exact string for the Predictive Ledger button
button_old = """          <router-link
            to="/dashboard/portfolio"
            class="px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-xs font-semibold"
          >
            <span class="material-symbols-outlined text-[18px]">insights</span>
            Predictive Ledger
          </router-link>"""

button_new = """          <button
            @click="showPromiseToFund = true"
            class="px-4 py-2 bg-absa-passion text-white border border-absa-passion rounded-none flex items-center gap-2 hover:bg-absa-power transition-colors text-[10px] font-mono font-bold uppercase tracking-widest shadow-none"
          >
            <span class="material-symbols-outlined text-[14px]">lab_profile</span>
            Promise to Fund Report
          </button>"""

if button_old in content:
    content = content.replace(button_old, button_new)
else:
    # Let's try matching a smaller chunk inside the div flex items-center gap-2
    target_substr = """            <span class="material-symbols-outlined text-[18px]">insights</span>
            Predictive Ledger
          </router-link>"""
    import re
    # We will carefully target just the second router-link.
    content = re.sub(r'<router-link[^>]*>\s*<span class="material-symbols-outlined[^>]*>insights</span>\s*Predictive Ledger\s*</router-link>', button_new, content, flags=re.DOTALL)

# 4. Insert component
template_bottom_target = "  </div>\n</template>"
template_bottom_new = """    <PromiseToFundModal
      :open="showPromiseToFund"
      :engagements="ptfEngagements"
      @close="showPromiseToFund = false"
    />
  </div>
</template>"""
content = content.replace(template_bottom_target, template_bottom_new)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done safe patch")
