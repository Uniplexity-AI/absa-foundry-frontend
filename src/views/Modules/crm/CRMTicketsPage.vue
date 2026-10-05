<script setup>
import { ref } from 'vue'
import FaqUploadModal from './FaqUploadModal.vue'
import FaqViewModal from './FaqViewModal.vue'
import {
  Layers, Search, Filter, Plus, ArrowLeft,
  CheckCircle, AlertTriangle, Clock, MessageSquare, Phone, Upload
} from 'lucide-vue-next'

const showNewCaseModal = ref(false)

const showFaqUploadModal = ref(false)
const showFaqViewModal = ref(false)

const selectedTicket = ref(null)
const mockTickets = ref([
  { id: 'CASE-4892', type: 'Complaint', customer: '0977 123 456', status: 'Open', priority: 'High', channel: 'Voice', sla: 'At Risk', created: '2026-09-28' },
  { id: 'CASE-4891', type: 'Enquiry', customer: '+260 96 111222', status: 'Resolved', priority: 'Medium', channel: 'WhatsApp', sla: 'Met', created: '2026-09-28' },
  { id: 'CASE-4890', type: 'Account Block', customer: 'John Banda', status: 'Escalated', priority: 'Critical', channel: 'Facebook', sla: 'Breached', created: '2026-09-27' },
  { id: 'CASE-4889', type: 'Card Delivery', customer: 'Mary S.', status: 'Pending', priority: 'Low', channel: 'Email', sla: 'On Track', created: '2026-09-27' },
])

</script>

<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto">
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-sm shrink-0">
      <div class="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/dashboard/crm" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1"><ArrowLeft :size="14"/> Back</router-link>
          <div class="w-2 h-8 bg-absa-passion rounded-none ml-2"></div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Case Management</span>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Global Queue</span>
            </div>
            <h1 class="text-xl font-black font-display text-gray-900 uppercase tracking-tight">Tickets & Cases</h1>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button class="px-3 py-1.5 bg-transparent border border-gray-300 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2"><Filter :size="12"/> Filter</button>
          
          <!-- Bot FAQ Upload Modal Trigger -->
          <button @click="showFaqViewModal = true" class="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2">
            <span class="material-symbols-outlined text-[12px]">visibility</span>
            View FAQs
          </button>
          <button @click="showFaqUploadModal = true" class="px-3 py-1.5 bg-gray-50 border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2">
            <Upload :size="12" /> 
            Upload FAQs
          </button>

          <button @click="showNewCaseModal = true" class="px-3 py-1.5 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-2"><Plus :size="12"/> New Case</button>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 blur-scoped pb-20">
      <div class="px-4 sm:px-6 py-6 w-full ">
        
        <!-- Controls -->
        <div class="flex justify-between items-center mb-4">
          <div class="relative w-64">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="14"/>
            <input type="text" placeholder="Search ticket ID or phone..." class="w-full bg-white border border-gray-200 rounded-none pl-9 pr-3 py-1.5 text-xs font-mono outline-none focus:border-absa-passion" />
          </div>
          <div class="flex text-[9px] font-mono font-bold uppercase border border-gray-200 bg-white">
             <button class="px-3 py-1.5 bg-gray-50 text-absa-passion border-r border-gray-200">All</button>
             <button class="px-3 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-500">Open</button>
             <button class="px-3 py-1.5 hover:bg-gray-50 text-gray-500">Escalated</button>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white border border-gray-200 shadow-sm overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200">
                <th class="p-3">Ticket ID</th>
                <th class="p-3">Customer Info</th>
                <th class="p-3">Type</th>
                <th class="p-3">Channel</th>
                <th class="p-3">Status</th>
                <th class="p-3">SLA Health</th>
                <th class="p-3">Created</th>
                <th class="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="text-xs font-mono">
              <tr v-for="ticket in mockTickets" :key="ticket.id" class="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                <td class="p-3 text-absa-passion font-bold">{{ ticket.id }}</td>
                <td class="p-3 text-gray-900">{{ ticket.customer }}</td>
                <td class="p-3 text-gray-600">{{ ticket.type }}</td>
                <td class="p-3 text-gray-500">
                   <div class="flex items-center gap-1">
                      <Phone v-if="ticket.channel === 'Voice'" :size="12"/>
                      <MessageSquare v-if="ticket.channel === 'WhatsApp'" :size="12" class="text-green-500"/>
                      <Layers v-if="ticket.channel === 'Facebook'" :size="12" class="text-blue-500"/>
                      {{ ticket.channel }}
                   </div>
                </td>
                <td class="p-3">
                   <span class="px-2 py-0.5 border border-gray-200 bg-white text-[9px] uppercase tracking-widest font-bold"
                         :class="ticket.status === 'Open' ? 'text-blue-600 border-blue-200' : ticket.status === 'Escalated' ? 'text-orange-500 border-orange-200' : 'text-gray-500'">
                     {{ ticket.status }}
                   </span>
                </td>
                <td class="p-3">
                   <span class="flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold"
                         :class="ticket.sla === 'Breached' ? 'text-red-500' : ticket.sla === 'At Risk' ? 'text-orange-500' : 'text-green-500'">
                     <AlertTriangle v-if="ticket.sla === 'Breached'" :size="12"/>
                     <Clock v-if="ticket.sla === 'At Risk'" :size="12"/>
                     <CheckCircle v-if="ticket.sla === 'Met' || ticket.sla === 'On Track'" :size="12"/>
                     {{ ticket.sla }}
                   </span>
                </td>
                <td class="p-3 text-gray-400">{{ ticket.created }}</td>
                <td class="p-3 text-right">
                   <button @click.stop="selectedTicket = ticket" class="px-2 py-1 bg-transparent text-gray-500 border border-gray-300 hover:border-absa-passion hover:text-absa-passion text-[9px] font-bold uppercase rounded-none transition">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <Teleport to="body">
      <!-- New Case Modal -->
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
      </div>
      </Teleport>

      <Teleport to="body">
      <!-- View Ticket Modal -->
      <div v-if="selectedTicket" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2">{{ selectedTicket.id }}</h3>
              <div class="text-[9px] font-mono text-gray-500 mt-1 uppercase">{{ selectedTicket.type }} &bull; {{ selectedTicket.created }}</div>
            </div>
            <button @click="selectedTicket = null" class="text-gray-400 hover:text-absa-passion">X</button>
          </div>
          <div class="p-6 font-mono text-sm space-y-6">
            
            <div class="grid grid-cols-2 gap-4">
               <div>
                 <span class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Customer Info</span>
                 <span class="text-gray-900 font-bold">{{ selectedTicket.customer }}</span>
               </div>
               <div>
                 <span class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Channel</span>
                 <span class="text-gray-900 flex items-center gap-2">{{ selectedTicket.channel }}</span>
               </div>
               <div>
                 <span class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Status</span>
                 <span class="px-2 py-0.5 border border-gray-200 bg-white text-[9px] uppercase tracking-widest font-bold"
                       :class="selectedTicket.status === 'Open' ? 'text-blue-600' : selectedTicket.status === 'Escalated' ? 'text-orange-500' : 'text-gray-500'">
                   {{ selectedTicket.status }}
                 </span>
               </div>
               <div>
                 <span class="block text-[9px] font-bold text-gray-400 uppercase mb-1">Priority & SLA</span>
                 <span class="text-gray-900 font-bold">{{ selectedTicket.priority }} <span class="text-gray-400 font-normal">({{ selectedTicket.sla }})</span></span>
               </div>
            </div>
            
            <div>
               <span class="block text-[9px] font-bold text-gray-400 uppercase mb-2 border-b border-gray-100 pb-1">Activity Log</span>
               <div class="space-y-3 text-xs">
                 <div class="flex gap-3">
                   <div class="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5"></div>
                   <div>
                     <div class="text-gray-500 text-[9px]">{{ selectedTicket.created }} 08:42 AM</div>
                     <div class="text-gray-800">Case opened by System via {{ selectedTicket.channel }}</div>
                   </div>
                 </div>
                 <div class="flex gap-3">
                   <div class="w-1.5 h-1.5 rounded-full bg-absa-passion mt-1.5"></div>
                   <div>
                     <div class="text-gray-500 text-[9px]">{{ selectedTicket.created }} 09:15 AM</div>
                     <div class="text-gray-800">Assigned to queue and acknowledged.</div>
                   </div>
                 </div>
               </div>
            </div>

          </div>
          <div class="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button class="px-4 py-2 bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-50 text-[10px] font-bold uppercase rounded-none mr-auto">Escalate</button>
            <button @click="selectedTicket = null" class="px-6 py-2 bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 text-[10px] font-bold uppercase rounded-none">Close Viewer</button>
          </div>
        </div>
      </div>
      </Teleport>
    </div>
  </div>
  <FaqUploadModal :open="showFaqUploadModal" @close="showFaqUploadModal = false" />
  <FaqViewModal v-if="showFaqViewModal" @close="showFaqViewModal = false" />
</template>


<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image:
    linear-gradient(color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px);
  background-size: 38px 38px;
}
</style>


