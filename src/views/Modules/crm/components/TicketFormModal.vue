<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
  initialData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['close', 'save'])

const form = ref({
  subject: '',
  customer: '',
  type: 'Complaint',
  priority: 'Low',
  channel: 'In-Branch',
  assignedTo: 'Unassigned',
  description: ''
})

watch(() => props.open, (newVal) => {
  if (newVal) {
    form.value = {
      subject: props.initialData?.subject || '',
      customer: props.initialData?.customer || '',
      type: props.initialData?.type || 'Complaint',
      priority: props.initialData?.priority || 'Low',
      channel: props.initialData?.channel || 'In-Branch',
      assignedTo: props.initialData?.assignedTo || 'Unassigned',
      description: props.initialData?.description || ''
    }
  }
})

const handleSave = () => {
  if (!form.value.subject || !form.value.customer) {
    alert("Subject and Customer are required!")
    return
  }
  emit('save', { ...form.value })
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-none shadow-2xl w-full max-w-2xl border border-gray-200 overflow-hidden flex flex-col relative">
        
        <div class="px-5 py-4 border-b border-gray-200 bg-white relative z-10 flex justify-between items-start">
          <div>
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight font-display flex items-center gap-2">
              <span class="material-symbols-outlined text-absa-passion">support_agent</span>
              {{ isEditing ? 'Edit Ticket' : 'Create New Ticket' }}
            </h3>
            <p class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mt-1">{{ isEditing ? 'Update existing customer support case' : 'Open a new customer support case' }}</p>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="p-6 font-mono space-y-5 overflow-y-auto max-h-[75vh] bg-white relative z-10">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="md:col-span-2">
              <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Subject / Title <span class="text-absa-passion">*</span></label>
              <input type="text" v-model="form.subject" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Brief summary of issue" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Customer Phone / ID <span class="text-absa-passion">*</span></label>
              <input type="text" v-model="form.customer" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="e.g. +260 96 111..." />
            </div>
            
            <div>
              <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Case Category</label>
              <select v-model="form.type" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
                <option>Complaint</option>
                <option>Enquiry</option>
                <option>Request</option>
                <option>Account Block</option>
                <option>Card Delivery</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Priority</label>
              <select v-model="form.priority" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Channel / Source</label>
              <select v-model="form.channel" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
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
              <select v-model="form.assignedTo" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors">
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
            <textarea v-model="form.description" rows="4" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white transition-colors" placeholder="Detailed description of the case..."></textarea>
          </div>

        </div>
        
        <div class="px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3">
          <button @click="$emit('close')" class="px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
          <button @click="handleSave" class="px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors">
            {{ isEditing ? 'Update Ticket' : 'Create Ticket' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
