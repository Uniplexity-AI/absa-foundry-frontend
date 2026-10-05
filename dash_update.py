repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\CRMDashboard.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_card = """<!-- Card 5 -->
            <div class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <FileText :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Digital Forms</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Templates &diams; Responses &diams; Sign-Offs
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
                Open &rarr;
              </span>
            </div>"""

new_card = """<!-- Card 5 -->
            <router-link to="/dashboard/crm/forms" class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <FileText :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Digital Forms</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Templates &diams; Responses &diams; Sign-Offs
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
                Open &rarr;
              </span>
            </router-link>"""

content = content.replace(old_card, new_card)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done dashboard update")
