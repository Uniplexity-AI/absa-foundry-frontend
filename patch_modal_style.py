repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\EngagementModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Update modal container
content = content.replace('<div class="bg-white rounded-sm w-full max-w-3xl overflow-hidden shadow-xl">',
                          '<div class="bg-white rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative border border-gray-200">\n      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>')

# Update Header
header_old = """
      <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 class="text-sm font-bold text-absa-enrich">{{ existingEntry ? "Edit Engagement" : "Log Engagement" }} - {{ customerName || customerId }}</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
"""
header_new = """
      <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10">
        <div class="flex items-center gap-2">
          <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
          <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900">{{ existingEntry ? "Edit Engagement" : "Log Engagement" }} - {{ customerName || customerId }}</h3>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
"""
content = content.replace(header_old.strip(), header_new.strip())

# Update Labels
content = content.replace('class="block text-xs font-bold text-gray-700 mb-1"', 'class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5"')

# Update Inputs
content = content.replace('rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none"',
                          'rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10"')

# Update Checkbox
content = content.replace('rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion', 'rounded-none border-gray-300 text-absa-passion focus:ring-absa-passion relative z-10')
content = content.replace('class="text-xs font-bold text-gray-700"', 'class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 relative z-10 cursor-pointer"')

# Update Promise to Fund container
content = content.replace('<div v-if="isPromise" class="grid grid-cols-2 gap-4 bg-gray-50 p-3 border border-gray-200 rounded-sm">',
                          '<div v-if="isPromise" class="grid grid-cols-2 gap-4 bg-gray-50/80 p-4 border border-gray-200 rounded-none relative z-10">')
                          
# Wrap form in relative z-10
content = content.replace('<div class="p-5 space-y-4">', '<div class="p-5 space-y-5 relative z-10">')

# Update Footer
footer_old = """
      <div class="px-5 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900">Cancel</button>
        <button @click="submit" :disabled="loading" class="px-4 py-2 bg-absa-passion text-white text-xs font-bold rounded-sm hover:bg-absa-power disabled:opacity-50">
          {{ loading ? 'Saving...' : (existingEntry ? 'Update Engagement' : 'Save Engagement') }}
        </button>
      </div>
"""
footer_new = """
      <div class="px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
        <button @click="submit" :disabled="loading" class="px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors disabled:opacity-50">
          {{ loading ? 'Saving...' : (existingEntry ? 'Update Engagement' : 'Save Engagement') }}
        </button>
      </div>
"""
content = content.replace(footer_old.strip(), footer_new.strip())

# Add scoped styles
styles = """
<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image:
    linear-gradient(color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px);
  background-size: 38px 38px;
}
.dotted-pattern {
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.03;
}
</style>
"""
if "<style scoped>" not in content:
    content += "\n" + styles

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done style")
