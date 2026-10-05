repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\crm\CRMModule.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

old_card = """<!-- Card 5 -->
            <div class="bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col">
              <div class="w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <FileText :size="20" class="text-gray-400 "/>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Digital Forms</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                Templates &diams; Responses &diams; Sign-Offs
              </p>
              <span class="text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto">
                Open &rarr;
              </span>
            </div>"""

new_card = """<!-- Card 5 -->
            <div @click="openForms" class="bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col">
              <div class="w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <FileText :size="20" class="text-gray-400 "/>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Digital Forms</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                Templates &diams; Responses &diams; Sign-Offs
              </p>
              <span class="text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto">
                Open &rarr;
              </span>
            </div>"""

content = content.replace(old_card, new_card)

# Add the openForms function and useRouter
if "import { useRouter } from 'vue-router'" not in content:
    content = content.replace("import { ref } from 'vue'", "import { ref } from 'vue'\nimport { useRouter } from 'vue-router'")
    
if "const router = useRouter()" not in content:
    content = content.replace("const kpis = ref({", "const router = useRouter()\n\nfunction openForms() {\n  console.log('Navigating to Digital Forms page: /dashboard/crm/forms')\n  router.push('/dashboard/crm/forms')\n}\n\nconst kpis = ref({")

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done module update")
