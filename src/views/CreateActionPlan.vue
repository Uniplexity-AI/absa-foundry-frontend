<template>
  <div class=" text-on-background w-full p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pt-20 pb-24">
    <!-- Back + Breadcrumb -->
    <div class="mb-6">
      <button @click="goBack" class="flex items-center gap-2 text-body-md font-bold text-[#DC0037] hover:text-[#B50232] transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"/></svg>
        Back to Customer Profile
      </button>
      <div class="flex items-center gap-2 text-label-sm text-secondary mt-2">
        <span>Dashboard</span><span>/</span><span>Portfolio</span><span>/</span>
        <span>Predictive Lifecycle Ledger</span><span>/</span>
        <span>{{ customerId }}</span><span>/</span>
        <span class="text-on-surface font-bold">Create Action Plan</span>
      </div>
    </div>

    <!-- Page Title -->
    <h1 class="text-headline-lg font-headline font-semibold text-on-surface mb-1">Create Action Plan</h1>
    <p class="text-body-md text-secondary mb-6">Define the next steps for {{ customerName }}</p>

    <!-- Customer Context -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div class="pp-metric"><span class="pp-metric__label">Customer</span><span class="pp-metric__value">{{ customerName }}</span></div>
      <div class="pp-metric"><span class="pp-metric__label">Lifecycle State</span><span class="pp-metric__value">{{ state.replace('_', ' ') }}</span></div>
      <div class="pp-metric"><span class="pp-metric__label">Health Score</span><span class="pp-metric__value">{{ healthScore != null ? healthScore.toFixed(1) : '—' }}</span></div>
      <div class="pp-metric"><span class="pp-metric__label">Churn Probability</span><span class="pp-metric__value">{{ churnProb != null ? Math.round(churnProb * 100) + '%' : '—' }}</span></div>
      <div class="pp-metric"><span class="pp-metric__label">CLV</span><span class="pp-metric__value">{{ clvPercentile != null ? 'P' + Math.round(clvPercentile * 100) : '—' }}</span></div>
    </div>

    <!-- Form -->
    <div class="bg-white border border-gray-300 shadow-none  p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="col-span-1 md:col-span-2">
          <label class="pp-label">Plan Title</label>
          <input v-model="form.title" type="text" class="pp-input" placeholder="e.g. Re-engage Customer" />
        </div>

        <div>
          <label class="pp-label">Priority</label>
          <select v-model="form.priority" class="pp-input">
            <option value="1">Priority 1 — Urgent</option>
            <option value="2">Priority 2 — High</option>
            <option value="3">Priority 3 — Standard</option>
          </select>
        </div>

        <div>
          <label class="pp-label">Assigned To</label>
          <input v-model="form.assignee" type="text" class="pp-input" placeholder="Account manager / RM name" />
        </div>

        <div>
          <label class="pp-label">Due Date</label>
          <input v-model="form.dueDate" type="date" class="pp-input" />
        </div>

        <div>
          <label class="pp-label">Expected Outcome</label>
          <select v-model="form.outcome" class="pp-input">
            <option value="Reactivate customer">Reactivate customer</option>
            <option value="Retain customer">Retain customer</option>
            <option value="Increase value">Increase value</option>
            <option value="Resolve issue">Resolve issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="col-span-1 md:col-span-2">
          <label class="pp-label">Reason</label>
          <textarea v-model="form.reason" rows="2" class="pp-input" placeholder="Why this action is needed"></textarea>
        </div>

        <div class="col-span-1 md:col-span-2">
          <label class="pp-label">Recommended Action</label>
          <textarea v-model="form.action" rows="2" class="pp-input" placeholder="What should be done"></textarea>
        </div>

        <div class="col-span-1 md:col-span-2">
          <label class="pp-label">Notes</label>
          <textarea v-model="form.notes" rows="3" class="pp-input" placeholder="Additional context or follow-up notes"></textarea>
        </div>
      </div>

      <!-- Saved confirmation -->
      <div v-if="saved" class="mt-5 border-l-4 border-[#4CAF50] bg-white-variant p-4">
        <p class="text-body-md font-bold text-on-surface">Action plan saved for {{ customerName }}.</p>
        <p class="text-label-sm text-secondary">Stored locally for this pilot. Return to the customer profile to continue.</p>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 mt-6">
        <button @click="savePlan" class="bg-[#DC0037] text-white text-body-md font-bold py-2.5 px-5 shadow-none hover:bg-[#B50232] transition-colors">SAVE ACTION PLAN</button>
        <button @click="goBack" class="border border-gray-300 text-on-surface text-body-md font-bold py-2.5 px-5 hover:bg-white-variant transition-colors">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()

const customerId = computed(() => String(route.params.id || ''))
const customer = computed(() => customerStore.selectedCustomer || {})
const customerName = computed(() => customer.value.fullName || ('Customer ' + (customerId.value || '').replace('CUST', '')))
const state = computed(() => customer.value.state || customer.value._raw?.state || '—')

const healthScore = computed(() => {
  const h = predictionStore.healthScores[customerId.value]
  return h?.health_score ?? customer.value.healthScore ?? null
})

const churnProb = computed(() => {
  const p = predictionStore.predictions[customerId.value]
  return typeof p === 'number' ? p : p?.churn_probability ?? null
})

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value]
  return typeof p === 'object' ? p?.clv_percentile ?? null : null
})

const form = ref({
  title: '',
  priority: '2',
  assignee: '',
  dueDate: '',
  outcome: 'Reactivate customer',
  reason: '',
  action: '',
  notes: '',
})

const saved = ref(false)

function goBack() {
  router.push({
    path: `/dashboard/customer/${customerId.value}`,
    query: { from: route.query.from || undefined, page: route.query.page || undefined },
  })
}

function savePlan() {
  if (!form.value.title) {
    form.value.title = `${state.value === 'DORMANT' ? 'Re-engage' : state.value === 'AT_RISK' ? 'Retain' : 'Review'} ${customerName.value}`
  }
  if (!form.value.reason && state.value === 'DORMANT') {
    form.value.reason = 'Customer has been inactive for an extended period.'
  }
  if (!form.value.action && state.value === 'DORMANT') {
    form.value.action = 'Contact the customer and identify the reason for inactivity.'
  }

  const key = `action_plans_${customerId.value}`
  const plans = JSON.parse(localStorage.getItem(key) || '[]')
  plans.push({
    ...form.value,
    customer_id: customerId.value,
    created_at: new Date().toISOString(),
  })
  localStorage.setItem(key, JSON.stringify(plans))
  saved.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  const id = customerId.value
  if (!id) return
  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
  ])
})
</script>

<style scoped>
:deep(*) {
  border-radius: 0 !important;
}
:deep(.border-gray-300) {
  border-color: #e5e7eb !important;
}
:deep(.divide-outline-variant > :not([hidden]) ~ :not([hidden])) {
  border-color: #e5e7eb !important;
}
.pp-metric {
  border: 1px solid #f0f0f0;
  padding: 0.75rem 1rem;
  background: #ffffff;
}
.pp-metric__label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  color: #5d3f3e;
  margin-bottom: 0.25rem;
}
.pp-metric__value {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #201a1a;
}
.pp-label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
  color: #5d3f3e;
  margin-bottom: 0.25rem;
}
.pp-input {
  width: 100%;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #201a1a;
  font-size: 14px;
  padding: 0.6rem 0.75rem;
}
.pp-input:focus {
  outline: none;
  border-color: #DC0037;
}
</style>
