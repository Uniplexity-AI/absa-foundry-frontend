<script setup>
/**
 * Add Customer — one customer, with either or both of the loadable datasets.
 *
 *   Customer details  → public.customers_clean     (12 identity fields)
 *   Feature snapshot  → public.customer_features   (85 feature columns, keyed
 *                                                    on customer_id + as_of_date)
 *
 * The feature column set is the same one the CSV export carries, and both tabs
 * are rendered from `GET /api/v1/ingest/schema` — labels, required flags,
 * formats, allowed values and examples all come from the loader's own contract,
 * so the form cannot drift from what the backend accepts.
 *
 * The master row is written first (create-only: see the endpoint's
 * `allow_update`), then the snapshot, so adding a customer and their features is
 * one action. Ticking "only add the snapshot" skips the master write for a
 * customer that already exists.
 */
import { computed, ref, watch } from 'vue'
import { notify } from '@/utils/absaExport'
import { addCustomer, computeCustomerStates, fetchIngestSchema } from '@/services/ingestApi'
import { useSnapshotStore } from '@/stores/snapshotStore'

const props = defineProps({
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'added'])

const snapshotStore = useSnapshotStore()

const MASTER = 'customers'
const SNAPSHOT = 'customer_features'

/**
 * The snapshot date the portfolio views read. Defaulting the form to it here is
 * what makes an added customer actually show up in the portfolio.
 */

/** Presentation-only grouping for the master tab. Unlisted fields still render. */
const MASTER_GROUPS = [
  { title: 'Identity', fields: ['customer_id', 'full_name', 'national_id', 'date_of_birth', 'gender'] },
  { title: 'Account & relationship', fields: ['status', 'account_number', 'branch_code', 'customer_since_date', 'kyc_tier'] },
  { title: 'Segmentation', fields: ['market_segment_code', 'nationality'] },
]

const schema = ref(null)
const schemaLoading = ref(false)
const schemaError = ref('')

const tab = ref(MASTER)
const master = ref({})
const snapshot = ref({})
const snapshotFilter = ref('')
const skipMaster = ref(false)
const computeSnapshot = ref(true)

const touched = ref({})
const attempted = ref(false)
const submitting = ref(false)
const serverErrors = ref([])
const partialWarning = ref('')

// ── Schema ──────────────────────────────────────────────────────
const byKey = computed(() =>
  Object.fromEntries((schema.value?.datasets || []).map((d) => [d.key, d])),
)
const masterDataset = computed(() => byKey.value[MASTER] || null)
const snapshotDataset = computed(() => byKey.value[SNAPSHOT] || null)
const masterFields = computed(() => masterDataset.value?.fields || [])
const snapshotFields = computed(() => snapshotDataset.value?.fields || [])
/** customer_id is shared between the two tables, so it is entered once. */
const snapshotInputFields = computed(() => snapshotFields.value.filter((f) => f.name !== 'customer_id'))

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

const visibleSnapshotFields = computed(() => {
  const q = snapshotFilter.value.trim().toLowerCase()
  if (!q) return snapshotInputFields.value
  return snapshotInputFields.value.filter(
    (f) => f.name.toLowerCase().includes(q) || (f.label || '').toLowerCase().includes(q),
  )
})

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

// ── Form state ──────────────────────────────────────────────────
function resetForm() {
  master.value = Object.fromEntries(masterFields.value.map((f) => [f.name, '']))
  snapshot.value = Object.fromEntries(snapshotInputFields.value.map((f) => [f.name, '']))
  // Prefill the snapshot date the views actually read, so the customer lands in
  // a snapshot the portfolio can see.
  if ('as_of_date' in snapshot.value) snapshot.value.as_of_date = snapshotStore.asOfDate
  touched.value = {}
  attempted.value = false
  serverErrors.value = []
  partialWarning.value = ''
  snapshotFilter.value = ''
  skipMaster.value = false
  computeSnapshot.value = true
  tab.value = MASTER
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
/** The snapshot row is written whenever any of its own columns were filled. */
const filledSnapshotCount = computed(
  () => snapshotInputFields.value.filter((f) => String(snapshot.value[f.name] ?? '').trim()).length,
)
const withSnapshot = computed(() => filledSnapshotCount.value > 0)
const snapshotValues = computed(() => ({ customer_id: customerId.value, ...snapshot.value }))
const snapshotDate = computed(() => String(snapshotValues.value.as_of_date ?? '').trim())
/** True when the snapshot would not be visible to the app's own views. */
const offPilotDate = computed(() => !!snapshotDate.value && snapshotDate.value !== snapshotStore.asOfDate)

// ── Validation (mirrors the rules the loader applies) ───────────
function validateField(field, values) {
  const raw = String(values[field.name] ?? '').trim()
  if (!raw) return field.required ? `${field.label} is required` : ''
  if (field.max_length && raw.length > field.max_length) return `Max ${field.max_length} characters`
  if (field.type === 'enum' && field.allowed_values?.length && !field.allowed_values.includes(raw)) {
    return `Must be one of: ${field.allowed_values.join(', ')}`
  }
  if (field.regex) {
    try {
      if (!new RegExp(field.regex).test(raw)) return field.format || 'Invalid format'
    } catch {
      /* an unparsable rule is the backend's to enforce, not the form's */
    }
  }
  if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return 'Use YYYY-MM-DD'
  return ''
}

const masterErrors = computed(() => {
  if (skipMaster.value) {
    return { customer_id: customerId.value ? '' : 'Customer ID is required' }
  }
  return Object.fromEntries(masterFields.value.map((f) => [f.name, validateField(f, master.value)]))
})
const snapshotErrors = computed(() =>
  Object.fromEntries(snapshotFields.value.map((f) => [f.name, validateField(f, snapshotValues.value)])),
)

const hasErrors = computed(() => {
  const badMaster = Object.values(masterErrors.value).some(Boolean)
  const badSnapshot = withSnapshot.value && Object.values(snapshotErrors.value).some(Boolean)
  return badMaster || badSnapshot
})

const showMasterError = (field) => {
  if (skipMaster.value && field.name === 'customer_id') return attempted.value && masterErrors.value.customer_id
  if (skipMaster.value) return ''
  return (attempted.value || touched.value[field.name]) && masterErrors.value[field.name]
}
const showSnapshotError = (field) =>
  withSnapshot.value && (attempted.value || touched.value[field.name]) && snapshotErrors.value[field.name]

/** Only non-empty values are submitted; blanks stay NULL rather than "". */
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
    if (!skipMaster.value) {
      const result = await addCustomer(nonEmpty(master.value, masterFields.value), { dataset: MASTER })
      addedMaster = result.rows_inserted === 1
    }

    let addedSnapshot = false
    if (withSnapshot.value) {
      try {
        const result = await addCustomer(nonEmpty(snapshotValues.value, snapshotFields.value), {
          dataset: SNAPSHOT,
        })
        addedSnapshot = result.rows_loaded > 0
      } catch (e) {
        // The master row is already committed, so say so instead of implying
        // the whole action failed.
        partialWarning.value = addedMaster || skipMaster.value
          ? `Customer saved, but the feature snapshot failed: ${e.message}`
          : ''
        throw e
      }
    }

    // Portfolio lists and counts read customer_states, which is derived from
    // customer_features — so without this the new snapshot is invisible.
    let statesUpserted = null
    if (addedSnapshot && computeSnapshot.value && snapshotDate.value) {
      try {
        const computed = await computeCustomerStates(snapshotDate.value)
        statesUpserted = computed?.states_upserted ?? 0
      } catch (e) {
        partialWarning.value =
          `Snapshot saved for ${snapshotDate.value}, but the lifecycle update failed: ${e.message}. ` +
          'The customer will not appear in the portfolio until it succeeds.'
      }
    }

    const parts = [
      addedMaster ? 'customer' : null,
      addedSnapshot ? 'feature snapshot' : null,
    ].filter(Boolean)
    notify(
      statesUpserted != null
        ? `Added ${parts.join(' + ')} for ${customerId.value} — lifecycle snapshot refreshed (${statesUpserted} row${statesUpserted === 1 ? '' : 's'})`
        : `Added ${parts.join(' + ') || 'record'} for ${customerId.value}`,
      'success',
      { autoClose: 6000 },
    )
    emit('added', { customerId: customerId.value, master: addedMaster, snapshot: addedSnapshot })
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

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
    <div class="absolute inset-0 bg-black/40" @click="emit('close')"></div>

    <div class="relative w-full max-w-5xl bg-white border border-gray-200 shadow-2xl my-6">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
        <div>
          <h2 class="text-sm font-bold text-absa-enrich">Add Customer</h2>
          <p class="text-[11px] text-gray-500 mt-0.5">
            <span class="font-mono text-absa-enrich">{{ masterDataset?.table || 'public.customers_clean' }}</span>
            <span v-if="rowCountFor(MASTER) != null"> · {{ rowCountFor(MASTER).toLocaleString() }} rows</span>
            <span class="mx-1">+</span>
            <span class="font-mono text-absa-enrich">{{ snapshotDataset?.table || 'public.customer_features' }}</span>
            <span v-if="rowCountFor(SNAPSHOT) != null"> · {{ rowCountFor(SNAPSHOT).toLocaleString() }} rows</span>
          </p>
        </div>
        <button class="text-gray-400 hover:text-gray-600" @click="emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Tabs -->
      <div class="px-6 pt-3 flex items-center gap-2 border-b border-gray-200">
        <button
          class="px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors"
          :class="tab === MASTER ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich'"
          @click="tab = MASTER"
        >Customer details ({{ masterFields.length }})</button>
        <button
          class="px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center gap-2"
          :class="tab === SNAPSHOT ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich'"
          @click="tab = SNAPSHOT"
        >
          Feature snapshot ({{ snapshotInputFields.length }})
          <span v-if="withSnapshot" class="px-1.5 py-0.5 bg-absa-passion text-white text-[10px] rounded-sm">
            {{ filledSnapshotCount }}
          </span>
        </button>
      </div>

      <div class="p-6">
        <div v-if="schemaError" class="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
          {{ schemaError }}
        </div>
        <p v-else-if="schemaLoading" class="text-xs text-gray-500">Loading the field contract…</p>

        <!-- Server-side problems / partial success -->
        <div v-if="partialWarning" class="mb-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-900">
          {{ partialWarning }}
        </div>
        <div v-if="serverErrors.length" class="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-sm">
          <p class="text-[11px] font-bold uppercase tracking-wider text-red-700 mb-1">Not added</p>
          <ul class="text-xs text-red-700 space-y-0.5">
            <li v-for="(msg, i) in serverErrors" :key="i">{{ msg }}</li>
          </ul>
        </div>

        <form class="space-y-6" @submit.prevent="submit">
          <!-- ═════════ Customer details (master) ═════════ -->
          <div v-show="tab === MASTER" class="space-y-6">
            <label class="flex items-start gap-2 text-[11px] text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded-sm">
              <input v-model="skipMaster" type="checkbox" class="mt-0.5 rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion" />
              <span>
                Customer already exists — skip the identity record and only add the feature snapshot.
                Leave unticked to create the customer.
              </span>
            </label>

            <fieldset v-for="group in masterGroups" :key="group.title" :disabled="submitting">
              <legend class="text-[11px] font-bold uppercase tracking-wider text-absa-enrich mb-3">{{ group.title }}</legend>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="f in group.items" :key="f.name">
                  <label :for="`add-master-${f.name}`" class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    {{ f.label }}
                    <span v-if="f.required && !skipMaster" class="text-absa-passion" title="Required">*</span>
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
                    class="w-full border rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                    :class="showMasterError(f) ? 'border-red-400' : 'border-gray-300'"
                    @blur="touched[f.name] = true"
                  />
                  <p v-if="showMasterError(f)" class="text-[10px] text-red-600 mt-1">{{ masterErrors[f.name] }}</p>
                  <p v-else-if="f.format" class="text-[10px] text-gray-400 mt-1">{{ f.format }}</p>
                </div>
              </div>
            </fieldset>
          </div>

          <!-- ═════════ Feature snapshot ═════════ -->
          <div v-show="tab === SNAPSHOT" class="space-y-4">
            <p class="text-[11px] text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded-sm">
              Every column of the <span class="font-mono text-absa-enrich">customer_features</span> export,
              keyed on <span class="font-semibold">Customer ID + Snapshot date</span>.
              <span v-if="customerId" class="block mt-1">
                Customer ID <span class="font-mono font-bold text-absa-enrich">{{ customerId }}</span> (from the Customer details tab).
              </span>
              <span v-else class="block mt-1 text-amber-700">
                Enter the Customer ID on the Customer details tab first.
              </span>
              Fill any subset — only non-empty columns are written; the rest stay NULL.
            </p>

            <div
              v-if="offPilotDate"
              class="text-[11px] text-amber-900 border border-amber-200 bg-amber-50 px-3 py-2 rounded-sm"
            >
              The portfolio views read the <span class="font-bold">{{ snapshotStore.asOfDate }}</span> snapshot.
              A snapshot dated <span class="font-bold">{{ snapshotDate }}</span> will be stored, but the
              customer will only appear on the portfolio once the app is pointed at that date.
            </div>

            <label class="flex items-start gap-2 text-[11px] text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded-sm">
              <input v-model="computeSnapshot" type="checkbox" class="mt-0.5 rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion" />
              <span>
                Refresh the lifecycle snapshot for
                <span class="font-mono font-bold">{{ snapshotDate || snapshotStore.asOfDate }}</span>
                after saving. The portfolio list and counts read that derived table, so a snapshot that is not
                recomputed stays invisible even though the data is stored.
              </span>
            </label>

            <div class="flex flex-wrap items-center gap-3">
              <div class="relative flex-1 min-w-[220px]">
                <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-[18px]">search</span>
                <input
                  v-model="snapshotFilter"
                  type="text"
                  placeholder="Filter columns (e.g. txn, risk_, chan_)"
                  class="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                />
              </div>
              <span class="text-[11px] text-gray-500">
                showing {{ visibleSnapshotFields.length }} of {{ snapshotInputFields.length }}
                <span v-if="filledSnapshotCount"> · {{ filledSnapshotCount }} filled</span>
              </span>
              <button
                v-if="filledSnapshotCount"
                type="button"
                class="text-[11px] font-bold text-absa-passion underline"
                @click="snapshot = Object.fromEntries(snapshotInputFields.map((f) => [f.name, '']))"
              >Clear snapshot</button>
            </div>

            <fieldset :disabled="submitting">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="f in visibleSnapshotFields" :key="f.name">
                  <label :for="`add-snap-${f.name}`" class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1" :title="f.label">
                    {{ f.name }}
                    <span v-if="f.required" class="text-absa-passion" title="Required">*</span>
                  </label>
                  <select
                    v-if="f.type === 'enum' && f.allowed_values?.length"
                    :id="`add-snap-${f.name}`"
                    v-model="snapshot[f.name]"
                    class="w-full border rounded-sm px-2 py-1.5 text-[11px] text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                    :class="showSnapshotError(f) ? 'border-red-400' : 'border-gray-300'"
                    @change="touched[f.name] = true"
                  >
                    <option value="">—</option>
                    <option v-for="value in f.allowed_values" :key="value" :value="value">{{ value }}</option>
                  </select>
                  <input
                    v-else
                    :id="`add-snap-${f.name}`"
                    v-model="snapshot[f.name]"
                    :type="f.type === 'date' ? 'date' : 'text'"
                    :placeholder="f.example || f.type || ''"
                    class="w-full border rounded-sm px-2 py-1.5 text-[11px] text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                    :class="showSnapshotError(f) ? 'border-red-400' : 'border-gray-300'"
                    @blur="touched[f.name] = true"
                  />
                  <p v-if="showSnapshotError(f)" class="text-[10px] text-red-600">{{ snapshotErrors[f.name] }}</p>
                </div>
              </div>
              <p v-if="!visibleSnapshotFields.length" class="text-xs text-gray-500 py-4">
                No columns match “{{ snapshotFilter }}”.
              </p>
            </fieldset>
          </div>

          <p class="text-[11px] text-gray-500 border-t border-gray-200 pt-3">
            <span class="text-absa-passion">*</span> required.
            The customer id is the key: an existing customer is refused rather than overwritten, so use the
            profile page to edit one. A feature snapshot is always keyed on customer id + snapshot date, so
            re-submitting the same snapshot updates it.
            <span class="block mt-1">
              The customer's profile is available immediately. Portfolio lists and counts read the lifecycle
              snapshot, so a snapshot becomes visible once the lifecycle state is computed for its date.
            </span>
          </p>

          <div class="flex items-center justify-end gap-3">
            <span v-if="withSnapshot" class="mr-auto text-[11px] text-gray-600">
              Will write: <span class="font-bold">{{ skipMaster ? 'feature snapshot only' : 'customer + feature snapshot' }}</span>
            </span>
            <button
              type="button"
              :disabled="submitting"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-50"
              @click="emit('close')"
            >Cancel</button>
            <button
              type="submit"
              :disabled="submitting || schemaLoading || !!schemaError"
              class="px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-50 flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-[16px]">{{ submitting ? 'hourglass_top' : 'person_add' }}</span>
              {{ submitting ? 'Adding…' : (withSnapshot ? 'Add customer + snapshot' : 'Add customer') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
