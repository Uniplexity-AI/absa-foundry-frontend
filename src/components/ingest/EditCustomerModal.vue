<script setup>
import { computed, ref, watch } from 'vue'
import { notify } from '@/utils/absaExport'
import { fetchIngestSchema, patchCustomer } from '@/services/ingestApi'

const props = defineProps({
  customer: { type: Object, default: null },
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'added'])

const MASTER = 'customers'

const MASTER_GROUPS = [
  { title: 'Identity', fields: ['customer_id', 'full_name', 'national_id', 'date_of_birth', 'gender'] },
  { title: 'Account & relationship', fields: ['account_number', 'branch_code', 'customer_since_date', 'kyc_tier'] },
  { title: 'Segmentation', fields: ['market_segment_code', 'nationality'] },
  { title: 'Next of Kin', fields: ['next_of_kin_name', 'next_of_kin_relationship', 'next_of_kin_phone'] },
]

const schema = ref(null)
const schemaLoading = ref(false)
const schemaError = ref('')

const currentPage = ref(1)
const itemsPerPage = 2

const master = ref({})
const touched = ref({})
const attempted = ref(false)
const submitting = ref(false)
const serverErrors = ref([])

// Schema
const byKey = computed(() =>
  Object.fromEntries((schema.value?.datasets || []).map((d) => [d.key, d])),
)
const masterDataset = computed(() => byKey.value[MASTER] || null)
const masterFields = computed(() => (masterDataset.value?.fields || []).filter(f => f.name !== 'status'))

const rowCountFor = (key) => schema.value?.target_row_counts?.[key]

const masterGroups = computed(() => {
  const byName = Object.fromEntries(masterFields.value.map((f) => [f.name, f]))
  const placed = new Set()
  const groups = MASTER_GROUPS.map((g) => {
    const items = g.fields.map((n) => byName[n]).filter(Boolean)
    items.forEach((f) => placed.add(f.name))
    return { title: g.title, items }
  }).filter((g) => g.items.length)
  const rest = masterFields.value.filter((f) => !placed.has(f.name))
  if (rest.length) groups.push({ title: 'Other details', items: rest })
  return groups
})

const paginatedGroups = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return masterGroups.value.slice(start, start + itemsPerPage)
})
const totalPages = computed(() => Math.ceil(masterGroups.value.length / itemsPerPage))

async function ensureSchema() {
  if (schema.value || schemaLoading.value) return
  schemaLoading.value = true
  schemaError.value = ''
  try {
    schema.value = await fetchIngestSchema()
  } catch (e) {
    schemaError.value = e.message || 'Could not load the ingest schema'
  } finally {
    schemaLoading.value = false
  }
}

// Form state
function resetForm() {
  master.value = Object.fromEntries(
    masterFields.value.map((f) => [f.name, props.customer?._raw?.[f.name] ?? ''])
  )
  touched.value = {}
  attempted.value = false
  serverErrors.value = []
  partialWarning.value = ''
  currentPage.value = 1
}

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return
    await ensureSchema()
    resetForm()
  },
  { immediate: true },
)

const customerId = computed(() => String(master.value.customer_id ?? '').trim())

// Validation
function validateField(field, values) {
  const raw = String(values[field.name] ?? '').trim()
  if (!raw) return field.required ? field.label + ' is required' : ''
  if (field.max_length && raw.length > field.max_length) return 'Max ' + field.max_length + ' characters'
  if (field.type === 'enum' && field.allowed_values?.length && !field.allowed_values.includes(raw)) {
    return 'Must be one of: ' + field.allowed_values.join(', ')
  }
  if (field.regex) {
    try {
      if (!new RegExp(field.regex).test(raw)) return field.format || 'Invalid format'
    } catch {
    }
  }
  if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return 'Use YYYY-MM-DD'
  return ''
}

const masterErrors = computed(() =>
  Object.fromEntries(masterFields.value.map((f) => [f.name, validateField(f, master.value)]))
)

const hasErrors = computed(() => Object.values(masterErrors.value).some(Boolean))

const showMasterError = (field) =>
  (attempted.value || touched.value[field.name]) && masterErrors.value[field.name]

function nonEmpty(values, fields) {
  const row = {}
  for (const field of fields) {
    const raw = String(values[field.name] ?? '').trim()
    if (raw) row[field.name] = raw
  }
  return row
}

async function submit() {
  attempted.value = true
  if (submitting.value) return
  if (hasErrors.value) {
    notify('Fix the highlighted fields before saving', 'error', { autoClose: 4000 })
    return
  }

  submitting.value = true
  serverErrors.value = []
  partialWarning.value = ''
  try {
    // Only send non-empty fields — patchCustomer does a targeted SQL UPDATE
    // so omitted fields keep their current database values intact.
    const fieldsToUpdate = nonEmpty(master.value, masterFields.value)
    // Remove customer_id from the fields dict (it's the key, not an update target)
    delete fieldsToUpdate.customer_id

    await patchCustomer(customerId.value, fieldsToUpdate)
    notify('Customer updated successfully', 'success', { autoClose: 6000 })
    emit('added', { customerId: customerId.value, master: true, snapshot: false })
    emit('close')
  } catch (e) {
    const detail = e.data?.detail
    serverErrors.value = Array.isArray(detail)
      ? detail
      : [e.message || 'Could not update the customer']
    notify(e.message || 'Could not update the customer', 'error', { autoClose: 6000 })
  } finally {
    submitting.value = false
  }
}
</script>


<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
    <div class="absolute inset-0 bg-black/40" @click="emit('close')"></div>

    <div class="relative w-full max-w-5xl bg-white border border-gray-200 shadow-2xl my-6">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
        <div>
          <h2 class="text-sm font-bold text-absa-enrich">Edit Customer</h2>
          <p class="text-[11px] text-gray-500 mt-0.5">
            <span class="font-mono text-absa-enrich">{{ masterDataset?.table || 'public.customers_clean' }}</span>
            <span v-if="rowCountFor(MASTER) != null"> · {{ rowCountFor(MASTER).toLocaleString() }} rows</span>
          </p>
        </div>
        <button class="text-gray-400 hover:text-gray-600" @click="emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="p-6">
        <div v-if="schemaError" class="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
          {{ schemaError }}
        </div>
        <p v-else-if="schemaLoading" class="text-xs text-gray-500">Loading the field contract…</p>

        <!-- Server-side errors -->
        <div v-if="serverErrors.length" class="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-sm">
          <p class="text-[11px] font-bold uppercase tracking-wider text-red-700 mb-1">Not added</p>
          <ul class="text-xs text-red-700 space-y-0.5">
            <li v-for="(msg, i) in serverErrors" :key="i">{{ msg }}</li>
          </ul>
        </div>

        <form class="space-y-6" @submit.prevent="submit">
          <!-- ═════════ Customer details (master) ═════════ -->
          <div  class="space-y-6">
            

            <fieldset v-for="group in paginatedGroups" :key="group.title" :disabled="submitting">
              <legend class="text-[11px] font-bold uppercase tracking-wider text-absa-enrich mb-3">{{ group.title }}</legend>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="f in group.items" :key="f.name">
                  <label :for="`add-master-${f.name}`" class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    {{ f.label }}
                    <span v-if="f.required" class="text-absa-passion" title="Required">*</span>
                  </label>
                  <select
                    v-if="f.type === 'enum' && f.allowed_values?.length"
                    :id="`add-master-${f.name}`"
                    v-model="master[f.name]"
                    class="w-full border rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                    :class="showMasterError(f) ? 'border-red-400' : 'border-gray-300'"
                    @change="touched[f.name] = true"
                  >
                    <option value="">— select —</option>
                    <option v-for="value in f.allowed_values" :key="value" :value="value">{{ value }}</option>
                  </select>
                  <input
                    v-else
                    :id="`add-master-${f.name}`"
                    v-model="master[f.name]"
                    :type="f.type === 'date' ? 'date' : 'text'"
                    :maxlength="f.max_length || undefined"
                    :placeholder="f.example || ''"
                    :disabled="f.name === 'customer_id'"
                    class="w-full border rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none disabled:bg-gray-100 disabled:text-gray-500"
                    :class="showMasterError(f) ? 'border-red-400' : 'border-gray-300'"
                    @blur="touched[f.name] = true"
                  />
                  <p v-if="showMasterError(f)" class="text-[10px] text-red-600 mt-1">{{ masterErrors[f.name] }}</p>
                  <p v-else-if="f.format" class="text-[10px] text-gray-400 mt-1">{{ f.format }}</p>
                </div>
              </div>
            </fieldset>
          </div>

          <p class="text-[11px] text-gray-500 border-t border-gray-200 pt-3">
            <span class="text-absa-passion">*</span> required.
            The customer id is the key: an existing customer is refused rather than overwritten, so use the
            profile page to edit one.
          </p>

          <div class="flex items-center justify-between gap-3 border-t border-gray-200 pt-4">
            <div class="text-[11px] text-gray-500">
              <span v-if="totalPages > 1">Step {{ currentPage }} of {{ totalPages }}</span>
            </div>
            <div class="flex items-center gap-3">
              <button
                v-if="currentPage > 1"
                type="button"
                :disabled="submitting"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-50"
                @click="currentPage--"
              >Previous</button>
              <button
                type="button"
                v-if="currentPage === 1"
                :disabled="submitting"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-50"
                @click="emit('close')"
              >Cancel</button>
              <button
                v-if="currentPage < totalPages"
                type="button"
                :disabled="submitting"
                class="px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-50"
                @click="currentPage++"
              >Next</button>
              <button
                v-if="currentPage === totalPages"
                type="submit"
                :disabled="submitting || schemaLoading || !!schemaError"
                class="px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-50 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-[16px]">{{ submitting ? 'hourglass_top' : 'save' }}</span>
                {{ submitting ? 'Saving...' : 'Save changes' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
