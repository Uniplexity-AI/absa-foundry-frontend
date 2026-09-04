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
        <span class="text-on-surface font-bold">Take Action</span>
      </div>
    </div>

    <!-- Page Title -->
    <h1 class="text-headline-lg font-headline font-semibold text-on-surface mb-1">Take Action</h1>
    <p class="text-body-md text-secondary mb-6">{{ customerName }} · {{ action.title || 'Recommended action' }}</p>

    <!-- Selected Action -->
    <div class="bg-white border border-gray-300 shadow-none  p-4 mb-6">
      <h2 class="text-headline-md font-headline font-semibold text-on-surface mb-4">Recommended Action</h2>
      <div class="space-y-3">
        <div class="pp-row"><span class="pp-row__label">Action</span><span class="pp-row__value">{{ action.action || action.title || '—' }}</span></div>
        <div class="pp-row"><span class="pp-row__label">Reason</span><span class="pp-row__value">{{ action.reason || '—' }}</span></div>
        <div class="pp-row"><span class="pp-row__label">Priority</span><span class="pp-row__value">Priority {{ action.priority || '—' }}</span></div>
        <div v-if="action.confidence" class="pp-row"><span class="pp-row__label">Propensity</span><span class="pp-row__value">{{ action.confidence }}%</span></div>
      </div>
    </div>

    <!-- Action Form -->
    <div class="bg-white border border-gray-300 shadow-none  p-4">
      <h2 class="text-headline-md font-headline font-semibold text-on-surface mb-4">Record Action</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="pp-label">Channel</label>
          <select v-model="form.channel" class="pp-input">
            <option value="RM_CALL">Relationship Manager Call</option>
            <option value="RM_DIRECT">RM Direct</option>
            <option value="DIGITAL">Digital (app / web)</option>
            <option value="MARKETING">Marketing</option>
            <option value="BRANCH">Branch Visit</option>
          </select>
        </div>
        <div>
          <label class="pp-label">Outcome</label>
          <select v-model="form.outcome" class="pp-input">
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="DECLINED">Declined</option>
            <option value="NOT_REACHABLE">Not Reachable</option>
          </select>
        </div>
        <div class="col-span-1 md:col-span-2">
          <label class="pp-label">Action Taken</label>
          <input v-model="form.actionTaken" type="text" class="pp-input" :placeholder="action.action || 'Describe the action taken'" />
        </div>
        <div class="col-span-1 md:col-span-2">
          <label class="pp-label">Notes</label>
          <textarea v-model="form.notes" rows="3" class="pp-input" placeholder="Outcome notes, customer response, follow-up needed"></textarea>
        </div>
      </div>

      <div v-if="saved" class="mt-5 border-l-4 border-[#4CAF50] bg-white-variant p-4">
        <p class="text-body-md font-bold text-on-surface">Action recorded for {{ customerName }}.</p>
        <p class="text-label-sm text-secondary">Synced to the pilot backend (etl_clean) and stored locally for this pilot.</p>
      </div>

      <!-- Recorded action history -->
      <div v-if="recordedActions.length > 0" class="mt-6">
        <h2 class="text-headline-md font-headline font-semibold text-on-surface mb-3">Recorded Actions</h2>
        <div class="space-y-3">
          <div v-for="(a, i) in [...recordedActions].reverse()" :key="a.client_id || i" class="border border-gray-300 bg-white p-4">
            <div class="flex items-start justify-between gap-3 mb-1">
              <p class="text-body-md font-bold text-on-surface">{{ a.actionTaken || 'Action taken' }}</p>
              <span class="text-label-sm text-secondary whitespace-nowrap">{{ fmtDate(a.created_at) }}</span>
            </div>
            <div class="flex flex-wrap gap-x-6 gap-y-1 text-label-sm text-secondary mb-1">
              <span>Channel: {{ channelLabel(a.channel) }}</span>
              <span>Outcome: {{ a.outcome || 'PENDING' }}</span>
            </div>
            <p v-if="a.notes" class="text-label-sm text-secondary">{{ a.notes }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 mt-6">
        <button @click="saveAction" class="bg-[#DC0037] text-white text-body-md font-bold py-2.5 px-5 shadow-none hover:bg-[#B50232] transition-colors">RECORD ACTION</button>
        <button @click="goBack" class="border border-gray-300 text-on-surface text-body-md font-bold py-2.5 px-5 hover:bg-white-variant transition-colors">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCustomerStore } from '@/stores/customerStore'
import { notify } from '@/utils/absaExport'
import { saveActionTaken, hydrateActionsTakenFromServer } from '@/utils/absaActions'

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()

const customerId = computed(() => String(route.params.id || ''))
const customer = computed(() => customerStore.selectedCustomer || {})
const customerName = computed(() => customer.value.fullName || ('Customer ' + (customerId.value || '').replace('CUST', '')))

const action = computed(() => {
  try {
    const raw = route.query.action
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return {}
})

const form = ref({
  channel: 'RM_CALL',
  outcome: 'PENDING',
  actionTaken: '',
  notes: '',
})

const saved = ref(false)
const recordedActions = ref([])

function goBack() {
  router.push({
    path: `/dashboard/customer/${customerId.value}`,
    query: { from: route.query.from || undefined, page: route.query.page || undefined },
  })
}

function fmtDate(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch { return d }
}

function channelLabel(ch) {
  return {
    RM_CALL: 'RM Call', RM_DIRECT: 'RM Direct', DIGITAL: 'Digital (app/web)',
    MARKETING: 'Marketing', BRANCH: 'Branch Visit',
  }[ch] || ch || '—'
}

function saveAction() {
  if (!form.value.actionTaken.trim()) {
    form.value.actionTaken = action.value.action || action.value.title || 'Customer intervention'
  }
  const entry = {
    ...form.value,
    customer_id: customerId.value,
    recommendation: action.value,
  }
  const list = saveActionTaken(customerId.value, entry)
  recordedActions.value = list
  saved.value = true
  notify(`Action recorded for ${customerName.value}`, 'success', { autoClose: 3000 })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  const id = customerId.value
  if (!id) return
  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    hydrateActionsTakenFromServer(id).then((list) => { recordedActions.value = list }).catch(() => {}),
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
.pp-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem 0;
}
.pp-row__label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  color: #5d3f3e;
}
.pp-row__value {
  font-size: 14px;
  font-weight: 700;
  color: #201a1a;
  text-align: right;
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
