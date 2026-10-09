with open("src/views/Modules/CRM/CRMTicketsPage.vue", "r", encoding="utf-8") as f:
    content = f.read()

import re

old_modal = re.compile(
    r"<!-- New Case Modal -->.*?<div v-if=\"showNewCaseModal\".*?<div class=\"bg-white rounded-none shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col\">.*?</div>\s*</div>\s*</div>",
    re.DOTALL
)

new_modal_html = """<!-- New Case Modal -->
      <div v-if="showNewCaseModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-2xl border border-gray-200 overflow-hidden flex flex-col relative">
          
          <div class="px-5 py-4 border-b border-gray-200 bg-white relative z-10 flex justify-between items-start">
            <div>
              <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight font-display flex items-center gap-2">
                <span class="material-symbols-outlined text-absa-passion">support_agent</span>
                Create New Ticket
              </h3>
              <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mt-1">Open a new customer support case</p>
            </div>
            <button @click="showNewCaseModal = false" class="text-gray-400 hover:text-absa-passion transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="p-6 font-mono space-y-5 overflow-y-auto max-h-[75vh] bg-white relative z-10">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="md:col-span-2">
                <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Subject / Title <span class="text-absa-passion">*</span></label>
                <input type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Brief summary of issue" />
              </div>

              <div class="md:col-span-2">
                <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Customer Phone / ID <span class="text-absa-passion">*</span></label>
                <input type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="e.g. +260 96 111..." />
              </div>
              
              <div>
                <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Case Category</label>
                <select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
                  <option>Complaint</option>
                  <option>Enquiry</option>
                  <option>Request</option>
                  <option>Account Block</option>
                  <option>Card Delivery</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Priority</label>
                <select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Channel / Source</label>
                <select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
                  <option>In-Branch</option>
                  <option>Phone Call</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>Mobile App</option>
                  <option>Social Media</option>
                </select>
              </div>

              <div>
                <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Assign To</label>
                <select class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
                  <option>Unassigned</option>
                  <option>Self (Me)</option>
                  <option>Front Office Team</option>
                  <option>Technical Support</option>
                  <option>Fraud & Risk</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Description</label>
              <textarea rows="4" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Detailed description of the case..."></textarea>
            </div>

          </div>
          
          <div class="px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3">
            <button @click="showNewCaseModal = false" class="px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
            <button @click="showNewCaseModal = false" class="px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors">
              Create Ticket
            </button>
          </div>
        </div>
      </div>"""

if old_modal.search(content):
    content = old_modal.sub(new_modal_html, content)
    with open("src/views/Modules/CRM/CRMTicketsPage.vue", "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully replaced modal with Engagement UI style.")
else:
    print("Could not find the exact old modal string via regex.")
