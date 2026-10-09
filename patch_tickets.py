with open("src/views/Modules/CRM/CRMTicketsPage.vue", "r", encoding="utf-8") as f:
    content = f.read()

import re

old_modal = """      <!-- New Case Modal -->
      <div v-if="showNewCaseModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2">New Case</h3>
            <button @click="showNewCaseModal = false" class="text-gray-400 hover:text-absa-passion">X</button>
          </div>
          <div class="p-6 space-y-4 font-mono text-sm">
            
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Customer Phone / ID</label>
              <input type="text" class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion" placeholder="e.g. +260 96 111..." />
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Case Category</label>
              <select class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion">
                <option>Complaint</option>
                <option>Enquiry</option>
                <option>Account Block</option>
                <option>Card Delivery</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Priority</label>
              <select class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Description</label>
              <textarea rows="3" class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion" placeholder="Case details..."></textarea>
            </div>

          </div>
          <div class="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="showNewCaseModal = false" class="px-4 py-2 bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 text-[10px] font-bold uppercase rounded-none">Cancel</button>
            <button @click="showNewCaseModal = false" class="px-6 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none">Create Case</button>
          </div>
        </div>
      </div>"""

new_modal = """      <!-- New Case Modal -->
      <div v-if="showNewCaseModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2">New Case</h3>
            <button @click="showNewCaseModal = false" class="text-gray-400 hover:text-absa-passion">X</button>
          </div>
          <div class="p-6 space-y-4 font-mono text-sm overflow-y-auto max-h-[75vh]">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Subject / Title</label>
                <input type="text" class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-900 outline-none focus:border-absa-passion" placeholder="Brief summary of issue" />
              </div>

              <div class="md:col-span-2">
                <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Customer Phone / ID</label>
                <input type="text" class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-900 outline-none focus:border-absa-passion" placeholder="e.g. +260 96 111..." />
              </div>
              
              <div>
                <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Case Category</label>
                <select class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-900 outline-none focus:border-absa-passion">
                  <option>Complaint</option>
                  <option>Enquiry</option>
                  <option>Request</option>
                  <option>Account Block</option>
                  <option>Card Delivery</option>
                </select>
              </div>

              <div>
                <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Priority</label>
                <select class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-900 outline-none focus:border-absa-passion">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Channel / Source</label>
                <select class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-900 outline-none focus:border-absa-passion">
                  <option>In-Branch</option>
                  <option>Phone Call</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                  <option>Mobile App</option>
                  <option>Social Media</option>
                </select>
              </div>

              <div>
                <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Assign To</label>
                <select class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-900 outline-none focus:border-absa-passion">
                  <option>Unassigned</option>
                  <option>Self (Me)</option>
                  <option>Front Office Team</option>
                  <option>Technical Support</option>
                  <option>Fraud & Risk</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Description</label>
              <textarea rows="4" class="w-full bg-white border border-gray-200 rounded-none p-2 text-gray-900 outline-none focus:border-absa-passion" placeholder="Detailed description of the case..."></textarea>
            </div>

          </div>
          <div class="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="showNewCaseModal = false" class="px-5 py-2.5 bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 text-[10px] font-bold uppercase rounded-none transition">Cancel</button>
            <button @click="showNewCaseModal = false" class="px-6 py-2.5 bg-absa-passion text-white hover:bg-[#b3002d] text-[10px] font-bold uppercase rounded-none transition flex items-center gap-2 shadow-sm">
              <i class="fas fa-save"></i> Create Ticket
            </button>
          </div>
        </div>
      </div>"""

if old_modal in content:
    content = content.replace(old_modal, new_modal)
    with open("src/views/Modules/CRM/CRMTicketsPage.vue", "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully replaced modal")
else:
    print("Could not find the exact old modal string.")
