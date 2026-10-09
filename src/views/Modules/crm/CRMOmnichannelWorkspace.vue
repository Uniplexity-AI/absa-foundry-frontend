<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCrmStore } from '../../../stores/crmStore'
import { createTicket } from '@/services/crmApi'
import TicketFormModal from './components/TicketFormModal.vue'
import {
  Phone, Mail, MessageSquare, Plus, Search, UserCircle, Bell, Video,
  MessageCircle, Twitter, List, X, ChevronDown, CheckCircle, Clock,
  MoreVertical, ShieldAlert, ArrowRightCircle, AlertOctagon, Send
} from 'lucide-vue-next'

const crmStore = useCrmStore()

onMounted(() => {
  crmStore.initializeQueue()
})

const selectedTab = ref('active_queue')

const showTicketModal = ref(false)
const ticketModalInitialData = ref({})

const openTicketModal = () => {
  if (currentCustomer.value) {
    let mappedChannel = 'In-Branch'
    if (currentCustomer.value.channel === 'voice') mappedChannel = 'Phone Call'
    if (currentCustomer.value.channel === 'whatsapp') mappedChannel = 'WhatsApp'
    if (currentCustomer.value.channel === 'email') mappedChannel = 'Email'
    if (currentCustomer.value.channel === 'social') mappedChannel = 'Social Media'
    
    ticketModalInitialData.value = {
      customer: currentCustomer.value.phone || currentCustomer.value.id || '',
      channel: mappedChannel,
      subject: `Inbound ${mappedChannel} Case - ${currentCustomer.value.name || 'Customer'}`
    }
  } else {
    ticketModalInitialData.value = {}
  }
  showTicketModal.value = true
}

const handleSaveTicket = async (ticketData) => {
  try {
    await createTicket(ticketData)
    showTicketModal.value = false
    alert("Ticket created successfully!")
  } catch (error) {
    console.error("Failed to create ticket", error)
    alert("Error creating ticket.")
  }
}

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

const escalateForm = ref({ unit: 'Tier 2 Tech Support', priority: 'P2 - High', reason: '' })
function handleEscalate() {
  if (currentCustomer.value) {
    currentCustomer.value.tier = 'Escalated ' + currentCustomer.value.tier
    alert(`Case routed to ${escalateForm.value.unit}`)
  }
  showEscalationModal.value = false
}

const wrapUpForm = ref({ disposition: 'Resolved', notes: '' })
function handleWrapUp() {
  if (currentCustomer.value) {
    crmStore.activeCustomers = crmStore.activeCustomers.filter(c => c.id !== currentCustomer.value.id)
    alert(`Call wrapped up with code: ${wrapUpForm.value.disposition}`)
  }
  showWrapUpModal.value = false
}

function handleTemplateSelect(text) {
  // Simple mock: assume there's a chat interface to inject into. Since there isn't a direct v-model available here, we'll just alert or set a variable if it existed.
  alert(`Template inserted: "${text}"`)
  showTemplateModal.value = false
}

const currentCustomer = computed(() => crmStore.activeCustomers.find(c => c.active))

</script>

<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-hidden">
    <!-- Mesh Background -->
    
    
    <!-- After Hours Banner -->
    <div v-if="crmStore.isAfterHours" class="bg-orange-500 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 shrink-0">
      <AlertOctagon :size="14" /> Business Hours Ended (17:00). New digital interactions are routing to After-Hours Auto-Reply.
    </div>

    <!-- Primary Header -->
    <header class="bg-white border-b border-gray-200 shrink-0 relative z-0">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <router-link to="/dashboard/crm" class="h-9 px-3 border border-gray-200 text-gray-400 hover:text-absa-passion hover:border-absa-passion transition flex items-center justify-center bg-white cursor-pointer mr-2 shrink-0">
             &larr;
          </router-link>
          <div class="min-w-0">
              <span class="block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Module // Omnichannel Workspace</span>
              <h1 class="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-display leading-tight truncate">Agent Desktop</h1>
              <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">
                Handle multi-channel interactions, Voice, and Tickets
              </p>
          </div>
        </div>

        <!-- Finesse State & User -->
        <div class="flex items-center gap-2 shrink-0">
          <div class="flex items-center gap-2 bg-transparent border border-gray-200 px-3 h-9">
            <div class="w-1.5 h-1.5 bg-green-500 animate-pulse"></div>
            <span class="text-[10px] font-mono font-bold text-gray-700 uppercase tracking-widest">Ready (Voice & Digital)</span>
          </div>
          
          <span class="text-[10px] h-9 font-mono font-bold text-gray-700 bg-transparent border border-gray-200 px-3 flex items-center gap-2 uppercase tracking-wider">
            <UserCircle :size="14" class="text-gray-400" /> CSR Agent
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
              <button @click="acceptInteraction(item)" class="w-full py-1.5 bg-white text-gray-700 border border-gray-300 hover:border-absa-passion hover:text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest rounded-none  transition flex items-center justify-center gap-2">
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
        <div class="bg-white border-b border-gray-200 flex items-center px-4 gap-1 overflow-x-auto custom-scrollbar relative z-10 shrink-0 h-10">
          <button v-for="cust in crmStore.activeCustomers" :key="cust.id" 
            @click="activateCustomer(cust.id)"
            class="h-full px-4 border-b-2 flex items-center gap-2 text-[10px] font-mono font-bold uppercase transition-colors min-w-[140px] max-w-[200px]"
            :class="cust.active ? 'border-absa-passion text-absa-passion bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 bg-transparent'">
            <div class="w-1.5 h-1.5" :class="cust.channel === 'voice' ? 'bg-blue-500' : 'bg-green-500'"></div>
            <span class="truncate flex-1 text-left">{{ cust.name }}</span>
            <X @click.stop="crmStore.activeCustomers = crmStore.activeCustomers.filter(c => c.id !== cust.id)" :size="12" class="text-gray-400 hover:text-absa-passion" />
          </button>
        </div>

        <!-- Active Customer Workspace (Screen Pop) -->
        <div v-if="currentCustomer" class="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative">
          <!-- Cisco Control Panel (Mock) -->
          <div v-if="currentCustomer.channel === 'voice'" class="bg-white rounded-none p-3 mb-6 flex items-center justify-between shadow-sm border border-gray-200">
             <div class="flex items-center gap-3">
               <div class="bg-blue-50 border border-blue-100 p-2 rounded-none"><Phone :size="16" class="text-blue-500" /></div>
               <div>
                 <div class="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">Active Call - Cisco Finesse</div>
                 <div class="text-gray-900 font-mono font-bold text-sm">{{ currentCustomer.phone }} (02:14)</div>
               </div>
             </div>
             <div class="flex gap-2">
               <button class="h-8 px-3 bg-white text-gray-600 border border-gray-200 hover:border-absa-passion hover:text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer">Hold</button>
               <button class="h-8 px-3 bg-white text-gray-600 border border-gray-200 hover:border-absa-passion hover:text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer">Transfer</button>
               <button class="h-8 px-3 bg-white text-gray-900 border border-gray-200 hover:border-absa-passion hover:text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer">Release</button>
             </div>
          </div>

          <!-- Screen Pop Content -->
          
          <div class="bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden mb-6">
            <div class="border-b border-gray-100 bg-gray-50 p-2 px-4 flex items-center justify-between">
              <span class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">Case Actions</span>
              <div class="flex gap-2">
                <button @click="openTicketModal" class="h-8 px-3 border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">
                  Create Ticket
                </button>
                <button @click="showTemplateModal = true" class="h-8 px-3 border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">
                  Templates
                </button>
                <button @click="showEscalationModal = true" class="h-8 px-3 border border-absa-passion text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:bg-absa-passion hover:text-white cursor-pointer">
                  Escalate
                </button>
                <button @click="showSmsModal = true" class="h-8 px-3 border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer">
                  <MessageSquare :size="12"/> SMS Gateway
                </button>
                <button @click="showWrapUpModal = true" class="h-8 px-3 border border-gray-200 bg-white text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:border-absa-passion hover:text-absa-passion cursor-pointer">
                  Wrap-Up Call
                </button>
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
                 <div class="inline-block px-2 py-1 bg-white text-gray-700 border border-gray-300 hover:border-absa-passion hover:text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest rounded-none mb-1">
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
      <TicketFormModal 
        :open="showTicketModal" 
        :initialData="ticketModalInitialData" 
        @close="showTicketModal = false" 
        @save="handleSaveTicket" 
      />

      <!-- Templates Modal -->
      <div v-if="showTemplateModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
        <div class="bg-white shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-display">Quick Access Templates</h3>
            <button @click="showTemplateModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="16"/></button>
          </div>
          <div class="p-6 space-y-3 font-mono text-xs max-h-[60vh] overflow-y-auto">
            <div @click="handleTemplateSelect('Dear customer, your ticket {CASE_ID} is still under review. We appreciate your patience...')" class="p-4 border border-gray-200 hover:border-absa-passion cursor-pointer transition">
              <strong class="block text-gray-900 mb-1 text-[10px] uppercase tracking-wider">Standard Holding SMS</strong>
              <span class="text-gray-500">"Dear customer, your ticket {CASE_ID} is still under review. We appreciate your patience..."</span>
            </div>
            <div @click="handleTemplateSelect('Dear customer, regarding case {CASE_ID}, our technical team is currently investigating...')" class="p-4 border border-gray-200 hover:border-absa-passion cursor-pointer transition">
              <strong class="block text-gray-900 mb-1 text-[10px] uppercase tracking-wider">Standard Holding Email</strong>
              <span class="text-gray-500">"Dear customer, regarding case {CASE_ID}, our technical team is currently investigating..."</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Wrap Up Modal -->
      <div v-if="showWrapUpModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
        <div class="bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2"><CheckCircle :size="14" class="text-absa-passion"/> Call Wrap-Up</h3>
            <button @click="showWrapUpModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="16"/></button>
          </div>
          <div class="p-6 space-y-5 font-mono text-sm">
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Disposition Code</label>
              <select v-model="wrapUpForm.disposition" class="w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion">
                <option>Resolved on Call</option>
                <option>Ticket Created - Pending</option>
                <option>Dropped / Disconnected</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Notes</label>
              <textarea v-model="wrapUpForm.notes" rows="4" class="w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion"></textarea>
            </div>
          </div>
          <div class="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="showWrapUpModal = false" class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:border-gray-300 transition-colors cursor-pointer">Cancel</button>
            <button @click="handleWrapUp" class="h-9 px-4 border border-absa-passion text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:bg-absa-passion hover:text-white transition-colors cursor-pointer">Complete</button>
          </div>
        </div>
      </div>

      <!-- SMS Dispatch Modal -->
      <div v-if="showSmsModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
        <div class="bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2"><MessageSquare :size="14" class="text-absa-passion"/> Dispatch SMS</h3>
            <button @click="showSmsModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="16"/></button>
          </div>
          <div class="p-6 space-y-5 font-mono text-sm">
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">To (Phone)</label>
              <input type="text" disabled :value="currentCustomer?.phone" class="w-full bg-gray-50 border border-gray-200 p-2 text-gray-600 outline-none" />
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Message Payload</label>
              <textarea v-model="smsMessage" rows="3" class="w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion" placeholder="Type SMS..."></textarea>
            </div>
          </div>
          <div class="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="showSmsModal = false" class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:border-gray-300 transition-colors cursor-pointer">Cancel</button>
            <button @click="handleSendSms" class="h-9 px-4 border border-absa-passion text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:bg-absa-passion hover:text-white transition-colors cursor-pointer flex items-center gap-2">Send <Send :size="12"/></button>
          </div>
        </div>
      </div>

      <!-- Escalation Modal -->
      <div v-if="showEscalationModal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
        <div class="bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col">
          <div class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2"><ShieldAlert :size="14" class="text-absa-passion"/> Escalate Case</h3>
            <button @click="showEscalationModal = false" class="text-gray-400 hover:text-absa-passion"><X :size="16"/></button>
          </div>
          <div class="p-6 space-y-5 font-mono text-sm">
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Route To Unit</label>
              <select v-model="escalateForm.unit" class="w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion">
                <option>Tier 2 Tech Support</option>
                <option>Fraud Investigations</option>
                <option>Branch Manager</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Escalation Priority</label>
              <select v-model="escalateForm.priority" class="w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion">
                <option>P1 - Critical (SLA 2hrs)</option>
                <option>P2 - High (SLA 24hrs)</option>
                <option>P3 - Normal (SLA 48hrs)</option>
              </select>
            </div>
            <div>
              <label class="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Audit Notes / Reason</label>
              <textarea v-model="escalateForm.reason" rows="3" class="w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion" placeholder="Mandatory trail for compliance..."></textarea>
            </div>
          </div>
          <div class="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
            <button @click="showEscalationModal = false" class="h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:border-gray-300 transition-colors cursor-pointer">Cancel</button>
            <button @click="handleEscalate" class="h-9 px-4 border border-absa-passion text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:bg-absa-passion hover:text-white transition-colors cursor-pointer">Route Case</button>
          </div>
        </div>
      </div>

    

  </Teleport>
</template>

<style scoped>

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
