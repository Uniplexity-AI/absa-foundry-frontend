<script setup>
import { ref } from 'vue'
import { logEngagement } from '@/services/crmApi'

const props = defineProps({
  open: Boolean,
  customerId: String,
  customerName: String
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
const loading = ref(false)

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
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white rounded-sm w-full max-w-md overflow-hidden shadow-xl">
      <div class="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 class="text-sm font-bold text-absa-enrich">Log Engagement — {{ customerName || customerId }}</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
      <div class="p-5 space-y-4">
        <div class="grid grid-cols-2 gap-4">
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
        <div class="grid grid-cols-2 gap-4">
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
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Recommendation</label>
            <input v-model="recommendation" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="e.g. Follow up in 2 weeks">
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1">Branch to Visit (Nearest)</label>
            <input v-model="branchToVisit" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="e.g. Manda Hill">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">Customer Feedback</label>
          <input v-model="customerFeedback" type="text" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="Feedback from customer">
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-700 mb-1">General Notes</label>
          <textarea v-model="notes" rows="2" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion outline-none" placeholder="Enter general notes..."></textarea>
        </div>
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
      <div class="px-5 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900">Cancel</button>
        <button @click="submit" :disabled="loading" class="px-4 py-2 bg-absa-passion text-white text-xs font-bold rounded-sm hover:bg-absa-power disabled:opacity-50">
          {{ loading ? 'Saving...' : 'Save Engagement' }}
        </button>
      </div>
    </div>
  </div>
</template>
