<script setup>
import { computed, ref, watch } from 'vue'
import { notify } from '@/utils/absaExport'
import { addCustomer, fetchIngestSchema } from '@/services/ingestApi'

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
const partialWarning = ref('')

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
  if (!raw) return field.required ? \\ is required\ : ''
  if (field.max_length && raw.length > field.max_length) return \Max \ characters\
  if (field.type === 'enum' && field.allowed_values?.length && !field.allowed_values.includes(raw)) {
    return \Must be one of: \\
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
    notify('Fix the highlighted fields before adding the customer', 'error', { autoClose: 4000 })
    return
  }

  submitting.value = true
  serverErrors.value = []
  partialWarning.value = ''
  try {
    let addedMaster = false
    const result = await addCustomer(nonEmpty(master.value, masterFields.value), { dataset: MASTER, allowUpdate: true })
    addedMaster = result.rows_inserted === 1 || result.rows_updated === 1
    notify(\Saved record for \\, 'success', { autoClose: 6000 })
    emit('added', { customerId: customerId.value, master: addedMaster, snapshot: false })
    emit('close')
  } catch (e) {
    const detail = e.data?.detail
    serverErrors.value = Array.isArray(detail)
      ? detail
      : [partialWarning.value || e.message || 'Could not add the customer']
    notify(e.message || 'Could not add the customer', 'error', { autoClose: 6000 })
  } finally {
    submitting.value = false
  }
}
</script>
