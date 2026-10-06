<script setup>
import { ref, watch } from 'vue'

import { logEngagement } from '@/services/crmApi'

const props = defineProps({
  open: Boolean,
  customerId: String,
  customerName: String,
  existingEntry: Object,
  readonly: Boolean
})

const emit = defineEmits(['close', 'logged'])

const type = ref('Call')
const notes = ref('')
const outcome = ref('')
const dormancyReason = ref('')
const crossSell = ref('')
const recommendation = ref('')
const customerExperience = ref('')
const branchToVisit = ref('')
const customerFeedback = ref('')
const isPromise = ref(false)
const expectedAmount = ref('')
const expectedDate = ref('')
const followUpDate = ref('')
const loading = ref(false)

watch(() => props.open, (newOpen) => {
  if (newOpen) {
    if (props.existingEntry) {
      const e = props.existingEntry
      type.value = e.type || 'Call'
      notes.value = e.meta?.notes || e.detail || ''
      outcome.value = e.meta?.outcome || ''
      dormancyReason.value = e.meta?.dormancy_reason || ''
      crossSell.value = e.meta?.cross_sell_details || ''
      recommendation.value = e.meta?.recommendation || ''
      customerExperience.value = e.meta?.customer_experience || ''
      branchToVisit.value = e.meta?.branch_to_visit || ''
      customerFeedback.value = e.meta?.customer_feedback || ''
      isPromise.value = !!e.meta?.isPromise
      expectedAmount.value = e.meta?.expectedAmount || ''
      expectedDate.value = e.meta?.expectedDate || ''
      followUpDate.value = e.meta?.followUpDate || ''
    } else {
      type.value = 'Call'
      notes.value = ''
      outcome.value = ''
      dormancyReason.value = ''
      crossSell.value = ''
      recommendation.value = ''
      customerExperience.value = ''
      branchToVisit.value = ''
      customerFeedback.value = ''
      isPromise.value = false
      expectedAmount.value = ''
      expectedDate.value = ''
      followUpDate.value = ''
    }
  }
})

async function submit() {
  loading.value = true
  try {
    const payload = {
      type: type.value,
      notes: notes.value,
      outcome: outcome.value,
      dormancy_reason: dormancyReason.value,
      cross_sell_details: crossSell.value,
      recommendation: recommendation.value,
      customer_experience: customerExperience.value,
      branch_to_visit: branchToVisit.value,
      customer_feedback: customerFeedback.value,
      isPromise: isPromise.value,
      expectedAmount: expectedAmount.value,
      expectedDate: expectedDate.value
    }
    await logEngagement(props.customerId, payload)
    emit('logged', payload)
    emit('close')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
    <div class="bg-white rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative border border-gray-200">
      <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
      <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10">
        <div class="flex items-center gap-2">
          <div class="w-1 h-3.5 bg-absa-passion shrink-0"></div>
          <h3 class="text-xs font-mono font-bold uppercase tracking-widest text-gray-900">{{ readonly ? "View Engagement" : (existingEntry ? "Edit Engagement" : "Log Engagement") }} - {{ customerName || customerId }}</h3>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-absa-passion transition-colors">
          <span class="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
      <div class="p-5 space-y-5 relative z-10">
        <!-- Row 1: 3 Columns -->
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Type (e.g. Call)</label>
            <select v-model="type" :disabled="readonly" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10">
              <option>Call</option>
              <option>SMS</option>
              <option>Email</option>
              <option>Meeting</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Outcome</label>
            <select v-model="outcome" :disabled="readonly" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10">
              <option value="">-- Select --</option>
              <option>Promised to Activate</option>
              <option>Promised to Fund</option>
              <option>Unreachable</option>
              <option>Not Interested</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Dormancy Reason</label>
            <select v-model="dormancyReason" :disabled="readonly" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10">
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
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Cross Sell Details</label>
            <input v-model="crossSell" :disabled="readonly" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" placeholder="e.g. Pitched personal loan">
          </div>
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Customer Experience</label>
            <select v-model="customerExperience" :disabled="readonly" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10">
              <option value="">-- Select --</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Neutral</option>
              <option>Poor</option>
            </select>
          </div>
          <div class="col-span-1">
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Recommendation</label>
            <div class="flex gap-2">
              <select v-model="recommendation" :disabled="readonly" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10">
                <option value="">-- Select --</option>
                <option>Schedule Follow Up</option>
                <option>Send Product Details</option>
                <option>Escalate to RM</option>
                <option>No Action Required</option>
              </select>
              <input v-if="recommendation === 'Schedule Follow Up'" v-model="followUpDate" :disabled="readonly" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" title="Follow Up Date">
            </div>
          </div>
        </div>

        <!-- Row 3: 2 Columns -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Branch to Visit (Nearest)</label>
            <input v-model="branchToVisit" :disabled="readonly" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" placeholder="e.g. Levy Mall">
          </div>
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Customer Feedback</label>
            <input v-model="customerFeedback" :disabled="readonly" type="text" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" placeholder="Feedback from customer">
          </div>
        </div>

        <!-- Row 4: General Notes -->
        <div>
          <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">General Notes</label>
          <textarea v-model="notes" :disabled="readonly" rows="2" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" placeholder="Enter general notes..."></textarea>
        </div>

        <!-- Row 5: Promise to Fund -->
        <div class="flex items-center gap-2">
          <input type="checkbox" :disabled="readonly" id="ptf" v-model="isPromise" class="rounded-none border-gray-300 text-absa-passion focus:ring-absa-passion relative z-10">
          <label for="ptf" class="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 relative z-10 cursor-pointer">Create "Promise to Fund"</label>
        </div>
        <div v-if="isPromise" class="grid grid-cols-2 gap-4 bg-gray-50/80 p-4 border border-gray-200 rounded-none relative z-10">
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Amount</label>
            <input v-model="expectedAmount" :disabled="readonly" type="number" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10" placeholder="e.g. 5000">
          </div>
          <div>
            <label class="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5">Expected Date</label>
            <input v-model="expectedDate" :disabled="readonly" type="date" class="w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10">
          </div>
        </div>
      </div>
      <div class="px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3">
        <button v-if="!readonly" @click="$emit('close')" class="px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">{{ readonly ? "Close" : "Cancel" }}</button>
        <button v-if="!readonly" @click="submit" :disabled="loading" class="px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors disabled:opacity-50">
          {{ loading ? 'Saving...' : (existingEntry ? 'Update Engagement' : 'Save Engagement') }}
        </button>
        <button v-if="readonly" @click="$emit('close')" class="px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors">
          Close
        </button>
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
  background-image: radial-gradient(circle, #000 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.03;
}
</style>

