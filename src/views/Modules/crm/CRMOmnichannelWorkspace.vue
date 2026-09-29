<script setup>
import { ref, computed } from 'vue'
import { useCrmStore } from '../../../stores/crmStore'
import {
  Phone, Mail, MessageSquare, Plus, Search, UserCircle, Bell, Video,
  MessageCircle, Twitter, List, X, ChevronDown, CheckCircle, Clock,
  MoreVertical, ShieldAlert, ArrowRightCircle, AlertOctagon, Send
} from 'lucide-vue-next'

const crmStore = useCrmStore()

const selectedTab = ref('active_queue')

const showTicketModal = ref(false)
const showEscalationModal = ref(false)
const showWrapUpModal = ref(false)
const showTemplateModal = ref(false)
const showSmsModal = ref(false)
const smsMessage = ref('')

function activateCustomer(id) {
  crmStore.activeCustomers.forEach(c => c.active = (c.id === id))
}

function acceptInteraction(interaction) {
  crmStore.acceptInteraction(interaction.id)
}

function handleSendSms() {
  if(!smsMessage.value) return
  crmStore.dispatchSms(currentCustomer.value.phone, smsMessage.value)
  smsMessage.value = ''
  showSmsModal.value = false
}

const currentCustomer = computed(() => crmStore.activeCustomers.find(c => c.active))

</script>

<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-hidden">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    
    <!-- After Hours Banner -->
    <div v-if="crmStore.isAfterHours" class="bg-orange-500 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 shrink-0">
      <AlertOctagon :size="14" /> Business Hours Ended (17:00). New digital interactions are routing to After-Hours Auto-Reply.
    </div>

    <!-- Primary Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm shrink-0 blur-scoped">
      <div class="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/dashboard/crm" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1">&larr; Back</router-link>
          <div class="w-2 h-8 bg-absa-passion rounded-none ml-2"></div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Workspace</span>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Omnichannel</span>
            </div>
            <h1 class="text-xl font-black font-display text-gray-900 uppercase tracking-tight">Agent Desktop</h1>
          </div>
        </div>

        <!-- Finesse State & User -->
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-none">
            <div class="w-2 h-2 rounded-none bg-green-500 animate-pulse"></div>
            <span class="text-[10px] font-mono font-bold text-green-700 uppercase tracking-widest">Ready (Voice & Digital)</span>
          </div>
          
          <span class="text-[10px] font-mono font-bold text-absa-passion bg-[#FDE8EC] border border-[#f5c6cb] px-3 py-1.5 flex items-center gap-2 rounded-none uppercase tracking-wider">
            <UserCircle :size="14" /> CSR Agent
          </span>
        </div>
      </div>
    </header>

    <!-- Main Workspace -->
    <div class="flex-1 w-full relative z-10 flex overflow-hidden">
      
      <!-- LEFT SIDEBAR: Queue Panel -->
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 shrink-0">
        <div class="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 class="text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
            <List :size="14" class="text-gray-400" /> Interaction Queue
          </h3>
          <span class="text-[9px] font-mono font-bold text-white bg-absa-passion px-2 py-0.5 rounded-none">
            {{ crmStore.incomingQueue.length }} WAITING
          </span>
        </div>

        <div class="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          <!-- Queue Items -->
          <div v-for="item in crmStore.incomingQueue" :key="item.id" class="bg-white border border-gray-200 rounded-none shadow-sm hover:border-absa-passion transition cursor-pointer relative overflow-hidden group">
            <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]"></div>
            <div class="p-3 relative z-10">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-1.5">
                  <Phone v-if="item.channel === 'voice'" :size="12" class="text-blue-500" />
                  <MessageCircle v-if="item.channel === 'whatsapp'" :size="12" class="text-green-500" />
                  <MessageSquare v-if="item.channel === 'facebook'" :size="12" class="text-blue-600" />
                  <span class="text-[9px] font-mono font-bold text-gray-500 uppercase">{{ item.channel }}</span>
                </div>
                <span class="text-[9px] font-mono font-bold text-orange-500 flex items-center gap-1"><Clock :size="10"/> {{ item.waitTime }}</span>
              </div>
              <h4 class="font-bold text-gray-900 text-sm mb-1 truncate">{{ item.customer }}</h4>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-none uppercase tracking-wider"
                  :class="item.accountTier.includes('Gold') || item.accountTier.includes('Platinum') ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'">
                  {{ item.accountTier }}
                </span>
              </div>
              <button @click="acceptInteraction(item)" class="w-full py-1.5 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase tracking-widest rounded-none  transition flex items-center justify-center gap-2">
                Accept <ArrowRightCircle :size="12"/>
              </button>
            </div>
          </div>
          
          <div v-if="crmStore.incomingQueue.length === 0" class="text-center py-8">
             <p class="text-[10px] font-mono font-bold text-gray-400 uppercase">Queue is empty</p>
          </div>
        </div>
      </div>

      <!-- MAIN AREA: Multi-Customer Handling -->
      <div class="flex-1 flex flex-col bg-transparent">
        
        <!-- Tab Bar -->
        <div class="h-10 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-end px-2 gap-1 overflow-x-auto custom-scrollbar sticky top-0 z-20">
          <button v-for="cust in crmStore.activeCustomers" :key="cust.id" 
            @click="activateCustomer(cust.id)"
            class="h-8 px-4 border border-b-0 rounded-none flex items-center gap-2 text-[10px] font-mono font-bold uppercase transition-all min-w-[140px] max-w-[200px]"
            :class="cust.active ? 'bg-white border-gray-200 text-absa-passion shadow-[0_-2px_10px_rgba(0,0,0,0.05)]' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'">
            <div class="w-1.5 h-1.5 rounded-none" :class="cust.channel === 'voice' ? 'bg-blue-500' : 'bg-green-500'"></div>
            <span class="truncate flex-1 text-left">{{ cust.name }}</span>
            <X @click.stop="crmStore.activeCustomers = crmStore.activeCustomers.filter(c => c.id !== cust.id)" :size="12" class="text-gray-400 hover:text-red-500" />
          </button>
        </div>

        <!-- Active Customer Workspace (Screen Pop) -->
        <div v-if="currentCustomer" class="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative">
          <!-- Cisco Control Panel (Mock) -->
          <div v-if="currentCustomer.channel === 'voice'" class="bg-gray-900 rounded-none p-3 mb-6 flex items-center justify-between shadow-lg border border-gray-700">
             <div class="flex items-center gap-3">
               <div class="bg-blue-500/20 p-2 rounded-none"><Phone :size="16" class="text-blue-400" /></div>
               <div>
                 <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Active Call - Cisco Finesse</div>
                 <div class="text-white font-mono text-sm">{{ currentCustomer.phone }} (02:14)</div>
               </div>
             </div>
             <div class="flex gap-2">
               <button class="px-3 py-1 bg-transparent text-gray-300 border border-gray-500 hover:bg-gray-800 text-[10px] font-mono font-bold uppercase rounded-none ">Hold</button>
               <button class="px-3 py-1 bg-transparent text-gray-300 border border-gray-500 hover:bg-gray-800 text-[10px] font-mono font-bold uppercase rounded-none ">Transfer</button>
               <button class="px-3 py-1 bg-transparent text-red-400 border border-red-500 hover:bg-red-500/20 text-[10px] font-mono font-bold uppercase rounded-none ">Release</button>
             </div>
          </div>

          <!-- Screen Pop Content -->
          
          <div class="bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden mb-6">
            <div class="border-b border-gray-100 bg-gray-50 p-2 px-4 flex items-center justify-between">
              <span class="text-[10px] font-mono font-bold text-gray-500 uppercase">Case Actions</span>
              <div class="flex gap-2">
                <button @click="showTicketModal = true" class="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition">Create Ticket</button>
                <button @click="showTemplateModal = true" class="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition">Templates</button>
                <button @click="showEscalationModal = true" class="px-3 py-1 bg-transparent text-orange-500 border border-orange-500 text-[9px] font-mono font-bold uppercase rounded-none hover:bg-orange-50 transition">Escalate</button>
                
                <button @click="showSmsModal = true" class="px-3 py-1 bg-transparent text-gray-700 border border-gray-300 hover:border-gray-500 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1"><MessageSquare :size="10"/> SMS Gateway</button>
                <button @click="showWrapUpModal = true" class="px-3 py-1 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none  transition">Wrap-Up Call</button>
              </div>
            </div>
            <!-- Screen Pop Main Info -->
            <div class="border-b border-gray-100 bg-white p-4 flex items-center justify-between">
            
               <div class="flex items-center gap-3">
                 <UserCircle :size="32" class="text-gray-300" />
                 <div>
                   <h2 class="text-lg font-black font-display text-gray-900 uppercase tracking-tight">{{ currentCustomer.name }}</h2>
                   <div class="text-[10px] font-mono font-bold text-gray-500 uppercase">{{ currentCustomer.id }}</div>
                 </div>
               </div>
               <div class="text-right">
                 <div class="inline-block px-2 py-1 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase tracking-widest rounded-none mb-1">
                   {{ currentCustomer.tier }} Tier
                 </div>
                 <div class="text-[10px] font-mono text-gray-500">Open Tickets: <span class="font-bold text-orange-500">{{ currentCustomer.openTickets }}</span></div>
               </div>
            </div>
            
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               
                 <div>
                   <h4 class="text-[10px] font-mono font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-3">FAQ Bot Transcript</h4>
                   <div v-if="currentCustomer.botTranscript && currentCustomer.botTranscript.length > 0" class="p-3 bg-gray-50 border border-gray-100 text-xs font-mono space-y-2 h-40 overflow-y-auto">
                     <div v-for="(msg, idx) in currentCustomer.botTranscript" :key="idx" :class="msg.sender === 'bot' ? 'text-gray-500' : 'text-absa-passion font-bold'">
                       [{{ msg.sender.toUpperCase() }}] {{ msg.text }}
                     </div>
                   </div>
                   <div v-else class="p-3 bg-gray-50 border border-gray-100 text-xs font-mono text-gray-400 italic">No bot pre-interaction available.</div>
                 </div>
                 <div>
                   <h4 class="text-[10px] font-mono font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-3">CRM Context</h4>
                 <div class="space-y-2">
                   <div class="flex justify-between text-sm"><span class="text-gray-500">Account Status</span><span class="font-bold text-green-600">Active</span></div>
                   <div class="flex justify-between text-sm"><span class="text-gray-500">Last Branch Visit</span><span class="font-bold text-gray-900">12 Aug 2026</span></div>
                 </div>
               </div>
            </div>
          </div>
          
        </div>
        
        <div v-else class="flex-1 flex items-center justify-center">
           <div class="text-center">
              <ShieldAlert :size="48" class="mx-auto mb-4 text-gray-300" />
              <h2 class="text-xl font-black font-display text-gray-400 uppercase tracking-widest">No Active Interaction</h2>
              <p class="text-[10px] font-mono text-gray-400 mt-2">Select a customer from the queue or tabs</p>
           </div>
        </div>
      </div>

    </div>
  </div>

    <Teleport to="body">
    <!-- PHASE 2 MODALS -->
    
      
      <!-- Create Ticket Modal -->
      <div v-if="showTicketModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-md border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <h3 class="text-xs font-black text-absa-passion font-display uppercase tracking-widest">Create New Ticket</h3>
            <button @click="showTicketModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="14"/></button>
          </div>
          <div class="p-6 space-y-4 font-mono text-sm">
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Customer / Phone</label>
              <input type="text" disabled :value="currentCustomer?.phone" class="w-full bg-gray-50 border border-gray-200 rounded-none p-2 text-gray-600 outline-none" />
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Issue Category</label>
              <select class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion">
                <option>Account Enquiry</option>
                <option>Card Block / Fraud</option>
                <option>Transaction Dispute</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Details</label>
              <textarea rows="3" class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion"></textarea>
            </div>
          </div>
          <div class="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="showTicketModal = false" class="px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded-none">Cancel</button>
            <button @click="showTicketModal = false" class="px-4 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none ">Generate Ticket</button>
          </div>
        </div>
      </div>

      <!-- Templates Modal -->
      <div v-if="showTemplateModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <h3 class="text-xs font-black text-absa-passion font-display uppercase tracking-widest">Quick Access Templates</h3>
            <button @click="showTemplateModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="14"/></button>
          </div>
          <div class="p-4 bg-gray-50 border-b border-gray-100 flex gap-2">
             <button class="px-3 py-1 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none">Holding (>=2 Days)</button>
             <button class="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion">Resolution</button>
          </div>
          <div class="p-6 space-y-3 font-mono text-xs">
            <div class="p-3 border border-gray-200 rounded-none hover:border-absa-passion cursor-pointer transition">
              <strong class="block text-gray-800 mb-1">Standard Holding SMS</strong>
              <span class="text-gray-500">"Dear customer, your ticket {CASE_ID} is still under review. We appreciate your patience..."</span>
            </div>
            <div class="p-3 border border-gray-200 rounded-none hover:border-absa-passion cursor-pointer transition">
              <strong class="block text-gray-800 mb-1">Standard Holding Email</strong>
              <span class="text-gray-500">"Dear customer, regarding case {CASE_ID}, our technical team is currently investigating..."</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Wrap Up Modal -->
      <div v-if="showWrapUpModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <h3 class="text-xs font-black text-absa-passion font-display uppercase tracking-widest flex items-center gap-2"><CheckCircle :size="14"/> Call Wrap-Up</h3>
          </div>
          <div class="p-6 space-y-4 font-mono text-sm">
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Disposition Code</label>
              <select class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion">
                <option>Resolved on Call</option>
                <option>Ticket Created - Pending</option>
                <option>Dropped / Disconnected</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Notes</label>
              <textarea rows="4" class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion"></textarea>
            </div>
          </div>
          <div class="p-3 bg-gray-50 border-t border-gray-100 flex justify-end">
            
                <button @click="showSmsModal = true" class="px-3 py-1 bg-transparent text-gray-700 border border-gray-300 hover:border-gray-500 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1"><MessageSquare :size="10"/> SMS Gateway</button>
                <button @click="showWrapUpModal = false" class="px-6 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none ">Complete Wrap-Up</button>
          </div>
        </div>
      </div>
    
      
      

      
      <!-- SMS Dispatch Modal -->
      <div v-if="showSmsModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2"><MessageSquare :size="14"/> Dispatch SMS</h3>
            <button @click="showSmsModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="14"/></button>
          </div>
          <div class="p-6 space-y-4 font-mono text-sm">
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">To (Phone)</label>
              <input type="text" disabled :value="currentCustomer?.phone" class="w-full bg-gray-50 border border-gray-200 rounded-none p-2 text-gray-600 outline-none" />
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Message Payload</label>
              <textarea v-model="smsMessage" rows="3" class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion" placeholder="Type SMS..."></textarea>
            </div>
          </div>
          <div class="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="handleSendSms" class="px-6 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none flex items-center gap-2">Send SMS <Send :size="12"/></button>
          </div>
        </div>
      </div>
      

      
      <!-- Escalation Modal -->
      <div v-if="showEscalationModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-3 flex justify-between items-center">
            <h3 class="text-xs font-black text-absa-passion font-display uppercase tracking-widest">Escalate Case</h3>
            <button @click="showEscalationModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="14"/></button>
          </div>
          <div class="p-6 space-y-4 font-mono text-sm">
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Route To Unit</label>
              <select class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-orange-500">
                <option>Tier 2 Tech Support</option>
                <option>Fraud Investigations</option>
                <option>Branch Manager</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Escalation Priority</label>
              <select class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-orange-500">
                <option>P1 - Critical (SLA 2hrs)</option>
                <option>P2 - High (SLA 24hrs)</option>
                <option>P3 - Normal (SLA 48hrs)</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-500 uppercase mb-1">Audit Notes / Reason</label>
              <textarea rows="3" class="w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-orange-500" placeholder="Mandatory trail for compliance..."></textarea>
            </div>
          </div>
          <div class="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="showEscalationModal = false" class="px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded-none">Cancel</button>
            <button @click="showEscalationModal = false" class="px-4 py-2 bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-50 text-[10px] font-bold uppercase rounded-none hover:bg-orange-50">Route Case</button>
          </div>
        </div>
      </div>

    

  </Teleport>
</template>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image:
    linear-gradient(color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px);
  background-size: 38px 38px;
}
.dotted-pattern {
  background-image: radial-gradient(#DC0037 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.05;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

<!-- cache bust -->
