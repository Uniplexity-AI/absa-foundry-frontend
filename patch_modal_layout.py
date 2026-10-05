repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\components\crm\EngagementModal.vue'
with open(repo_path, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Teleport and Backdrop Blur
content = content.replace('<div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">',
                          '<Teleport to="body">\n  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">')
content = content.replace('    </div>\n  </div>\n</template>', '    </div>\n  </div>\n  </Teleport>\n</template>')

# Increase Width
content = content.replace('<div class="bg-white rounded-sm w-full max-w-md overflow-hidden shadow-xl">',
                          '<div class="bg-white rounded-sm w-full max-w-3xl overflow-hidden shadow-xl">')

# Reorganize layout
new_form_layout = """
      <div class="p-5 space-y-4">
        <!-- Row 1: 3 Columns -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Type (e.g. Call)</label>
            <select v-model="type" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none">
              <option>Call</option>
              <option>SMS</option>
              <option>Email</option>
              <option>Meeting</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Outcome</label>
            <select v-model="outcome" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none">
              <option value="">-- Select --</option>
              <option>Promised to Activate</option>
              <option>Promised to Fund</option>
              <option>Unreachable</option>
              <option>Not Interested</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Dormancy Reason</label>
            <select v-model="dormancyReason" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none">
              <option value="">-- Select --</option>
              <option>Forgot about account</option>
              <option>Using competitor</option>
              <option>Financial difficulties</option>
              <option>Relocated</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        
        <!-- Row 2: 3 Columns -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Cross Sell Details</label>
            <input v-model="crossSell" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="e.g. Pitched personal loan">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Customer Experience</label>
            <select v-model="customerExperience" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none">
              <option value="">-- Select --</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Neutral</option>
              <option>Poor</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Recommendation</label>
            <input v-model="recommendation" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="e.g. Follow up in 2 weeks">
          </div>
        </div>

        <!-- Row 3: 2 Columns -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Branch to Visit (Nearest)</label>
            <input v-model="branchToVisit" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="e.g. Levy Mall">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Customer Feedback</label>
            <input v-model="customerFeedback" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="Feedback from customer">
          </div>
        </div>

        <!-- Row 4: General Notes -->
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">General Notes</label>
          <textarea v-model="notes" rows="2" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="Enter general notes..."></textarea>
        </div>

        <!-- Row 5: Promise to Fund -->
        <div class="flex items-center gap-2">
          <input type="checkbox" id="ptf" v-model="isPromise" class="rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion">
          <label for="ptf" class="text-xs font-bold text-gray-700">Create "Promise to Fund"</label>
        </div>
        <div v-if="isPromise" class="grid grid-cols-2 gap-4 bg-gray-50 p-3 border border-gray-200 rounded-sm">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Amount</label>
            <input v-model="expectedAmount" type="number" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="e.g. 5000">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Expected Date</label>
            <input v-model="expectedDate" type="date" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none">
          </div>
        </div>
      </div>
"""

# Extract the old layout part and replace
# It starts at `<div class="p-5 space-y-4">` and ends before `<div class="px-5 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">`
old_form_pattern = r'<div class="p-5 space-y-4">.*?</div>\s*<div class="px-5 py-4 border-t'
content = re.sub(old_form_pattern, new_form_layout.strip() + '\n      <div class="px-5 py-4 border-t', content, flags=re.DOTALL)

with open(repo_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("done modal")
