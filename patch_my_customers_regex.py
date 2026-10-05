repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\MyCustomers.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Use regex to replace the router-link
pattern = r'<router-link\s+to="/dashboard/portfolio"[^>]*>.*?Predictive Ledger\s*</router-link>'

button_new = """<button
            @click="showPromiseToFund = true"
            class="px-4 py-2 bg-absa-passion text-white border border-absa-passion rounded-none flex items-center gap-2 hover:bg-absa-power transition-colors text-[10px] font-mono font-bold uppercase tracking-widest shadow-none"
          >
            <span class="material-symbols-outlined text-[14px]">lab_profile</span>
            Promise to Fund Report
          </button>"""

content = re.sub(pattern, button_new, content, flags=re.DOTALL)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done regex replace")
