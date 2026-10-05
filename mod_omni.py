repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\crm\CRMOmnichannelWorkspace.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add onMounted if not present
if "onMounted" not in content:
    content = content.replace("import { ref, computed } from 'vue'", "import { ref, computed, onMounted } from 'vue'")

if "crmStore.initializeQueue()" not in content:
    content = content.replace("const crmStore = useCrmStore()", "const crmStore = useCrmStore()\n\nonMounted(() => {\n  crmStore.initializeQueue()\n})")

# In the template, it displays item.customer (which was the phone before, but is now the fullName).
# This is correct. The subtitle used to be `item.accountTier` (or unknown), but let's check how it's rendered.
# <div class="text-[12px] font-black text-gray-900 font-display uppercase tracking-tight">{{ item.customer }}</div>
# <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">
#   <span class="bg-gray-100 px-1 py-0.5">{{ item.accountTier }}</span>
# </div>
# This is already perfect as is.

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done modifying CRMOmnichannelWorkspace")
