<script setup>
/**
 * Load customer data into Postgres — two paths, one contract.
 *
 *  • CSV upload   — pick the target dataset, drop a file, review the
 *                   auto-detected column → field mapping (with the expected
 *                   format of every target field), then validate or load.
 *  • Core banking — pull customer data straight from the core Absa system via
 *                   the ETL Engine.
 *
 * A file can land in either loadable dataset:
 *   Customer Master   → public.customers_clean   (one row per customer)
 *   Customer Features → public.customer_features (one row per customer per
 *                                                 as_of_date snapshot)
 *
 * The dataset list, field catalogue and format rules all come from the backend
 * (`GET /api/v1/ingest/schema`), so the UI can never drift from what the loader
 * actually enforces. Switching dataset re-maps the already-staged file, so a
 * file can be tried against both targets without a second upload.
 */
import { computed, ref, watch } from 'vue'
import { notify } from '@/utils/absaExport'
import {
  fetchIngestSchema,
  loadCsv,
  previewCsv,
  remapCsv,
  runCoreBanking,
} from '@/services/ingestApi'

const props = defineProps({
  open: { type: Boolean, default: false },
})
const emit = defineEmits(['close', 'loaded'])

const tab = ref('csv')

// ── Schema (the format contract) ────────────────────────────────
const schema = ref(null)
const schemaError = ref('')
const schemaLoading = ref(false)

const datasets = computed(() => schema.value?.datasets || [])
const datasetKey = ref('')

const activeDataset = computed(
  () => datasets.value.find((d) => d.key === datasetKey.value) || datasets.value[0] || null
)
const fields = computed(() => activeDataset.value?.fields || schema.value?.fields || [])
const fieldByName = computed(() =>
  Object.fromEntries(fields.value.map((f) => [f.name, f]))
)
const coreDatasets = computed(() => schema.value?.core_datasets || [])
const targetTable = computed(
  () => activeDataset.value?.table || schema.value?.target_table || 'public.customers_clean'
)
const targetRowCount = computed(() => {
  const counts = schema.value?.target_row_counts
  if (counts && datasetKey.value in counts) return counts[datasetKey.value]
  return schema.value?.target_row_count
})
const keyColumns = computed(() => activeDataset.value?.key_columns || ['customer_id'])
const keyColumnText = computed(() => keyColumns.value.join(' + '))
const requiredFields = computed(() => fields.value.filter((f) => f.required))

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

// ── CSV flow ────────────────────────────────────────────────────
const step = ref(1)
const file = ref(null)
const preview = ref(null)
const mapping = ref({})
const csvBusy = ref(false)
const csvError = ref('')
const loadResult = ref(null)
const switchBusy = ref(false)

const sampleByColumn = computed(() => {
  const row = preview.value?.sample_rows?.[0] || {}
  return row
})
const checkByColumn = computed(() =>
  Object.fromEntries((preview.value?.column_checks || []).map((c) => [c.source_column, c]))
)

const liveMappingErrors = computed(() => {
  const errors = []
  const targets = Object.values(mapping.value).filter(Boolean)
  const duplicates = [...new Set(targets.filter((t, i) => targets.indexOf(t) !== i))]
  if (duplicates.length) {
    errors.push(`More than one column maps to: ${duplicates.join(', ')}`)
  }
  for (const f of fields.value) {
    if (f.required && !targets.includes(f.name)) {
      errors.push(`${f.label} (${f.name}) is required but no column is mapped to it`)
    }
  }
  return errors
})

const mappedCount = computed(() => Object.values(mapping.value).filter(Boolean).length)
const unmappedColumns = computed(() =>
  Object.entries(mapping.value).filter(([, t]) => !t).map(([c]) => c)
)

function resetCsv() {
  step.value = 1
  file.value = null
  preview.value = null
  mapping.value = {}
  csvError.value = ''
  loadResult.value = null
}

async function onFilePicked(event) {
  const picked = event.target.files?.[0]
  if (picked) await stageFile(picked)
  event.target.value = ''
}

async function onDrop(event) {
  const picked = event.dataTransfer?.files?.[0]
  if (picked) await stageFile(picked)
}

async function stageFile(picked) {
  file.value = picked
  csvBusy.value = true
  csvError.value = ''
  loadResult.value = null
  try {
    const data = await previewCsv(picked, datasetKey.value)
    if (!datasetKey.value) datasetKey.value = data.dataset || ''
    preview.value = data
    mapping.value = { ...data.mapping }
    step.value = 2
  } catch (e) {
    csvError.value = e.message || 'Could not read that file'
    preview.value = null
  } finally {
    csvBusy.value = false
  }
}

/**
 * Switching the target dataset re-runs the whole mapping for the same staged
 * file: a feature-store export and a customer master may share nothing but a
 * customer_id column, so the previous mapping is meaningless on the other
 * target and must not be carried over.
 */
async function changeDataset(next) {
  datasetKey.value = next
  if (!preview.value) return

  switchBusy.value = true
  csvError.value = ''
  loadResult.value = null
  try {
    preview.value = await remapCsv(preview.value.upload_id, next)
    mapping.value = { ...preview.value.mapping }
  } catch (e) {
    csvError.value = e.message || 'Could not re-map that file for the selected target'
  } finally {
    switchBusy.value = false
  }
}

async function runLoad(dryRun) {
  if (!preview.value) return
  csvBusy.value = true
  csvError.value = ''
  try {
    loadResult.value = await loadCsv({
      upload_id: preview.value.upload_id,
      mapping: mapping.value,
      dataset: preview.value.dataset || datasetKey.value,
      filename: preview.value.filename,
      dry_run: dryRun,
    })
    if (dryRun) {
      notify(`Validated ${loadResult.value.rows_valid} of ${loadResult.value.rows_received} rows`, 'info', { autoClose: 3000 })
    } else {
      const r = loadResult.value
      notify(`Loaded ${r.rows_loaded} rows into ${r.target_table} (${r.rows_inserted} new, ${r.rows_updated} updated)`, 'success', { autoClose: 4000 })
      emit('loaded')
    }
  } catch (e) {
    csvError.value = e.message || 'Load failed'
  } finally {
    csvBusy.value = false
  }
}

// ── Core banking flow ───────────────────────────────────────────
const coreDataset = ref('')
const coreLimit = ref(null)
const coreDryRun = ref(false)
const coreBusy = ref(false)
const coreError = ref('')
const coreResult = ref(null)

const selectedCoreDataset = computed(() =>
  coreDatasets.value.find((d) => d.key === coreDataset.value) || null
)

async function runCore() {
  coreBusy.value = true
  coreError.value = ''
  coreResult.value = null
  try {
    coreResult.value = await runCoreBanking({
      dataset: coreDataset.value || undefined,
      limit: coreLimit.value ? Number(coreLimit.value) : null,
      dry_run: coreDryRun.value,
    })
    const r = coreResult.value
    if (coreDryRun.value) {
      notify(`Read ${r.rows_extracted} rows from ${r.source_table} — ${r.rows_valid} valid`, 'info', { autoClose: 3500 })
    } else {
      notify(`Core sync loaded ${r.rows_loaded} customer rows`, 'success', { autoClose: 4000 })
      emit('loaded')
    }
  } catch (e) {
    coreError.value = e.message || 'Core banking pull failed'
  } finally {
    coreBusy.value = false
  }
}

// ── Lifecycle ───────────────────────────────────────────────────
watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    ensureSchema()
    if (!coreDataset.value && coreDatasets.value.length) {
      coreDataset.value = coreDatasets.value[0].key
    }
  }
)
watch(
  coreDatasets,
  (list) => {
    if (!coreDataset.value && list.length) coreDataset.value = list[0].key
  },
  { immediate: true }
)

// Default the CSV target to whatever the backend declares as the default.
watch(
  [datasets, () => props.open],
  () => {
    if (datasetKey.value || !datasets.value.length) return
    datasetKey.value = schema.value?.default_dataset || datasets.value[0].key
  },
  { immediate: true }
)
function close() {
  emit('close')
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
    <div class="absolute inset-0 bg-black/40" @click="close"></div>

    <div class="relative w-full max-w-5xl bg-white border border-gray-200 shadow-2xl my-6">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200 flex items-start justify-between">
        <div>
          <h2 class="text-sm font-bold text-absa-enrich">Load Customer Data</h2>
          <p class="text-[11px] text-gray-500 mt-0.5">
            Target table <span class="font-mono text-absa-enrich">{{ targetTable }}</span>
            <span v-if="targetRowCount != null"> · {{ targetRowCount.toLocaleString() }} rows currently loaded</span>
          </p>
        </div>
        <button class="text-gray-400 hover:text-gray-600" @click="close">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Tabs -->
      <div class="px-6 pt-3 flex items-center gap-2 border-b border-gray-200">
        <button
          class="px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors"
          :class="tab === 'csv' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich'"
          @click="tab = 'csv'"
        >Upload CSV</button>
        <button
          class="px-3 py-2 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors"
          :class="tab === 'core' ? 'border-absa-passion text-absa-passion' : 'border-transparent text-gray-500 hover:text-absa-enrich'"
          @click="tab = 'core'"
        >Core Banking Sync</button>
      </div>

      <div class="p-6">
        <div v-if="schemaError" class="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
          {{ schemaError }}
        </div>

        <!-- ═══════════════ CSV ═══════════════ -->
        <template v-if="tab === 'csv'">
          <!-- Target dataset: where this file will land -->
          <div class="mb-4">
            <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
              Load into
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                v-for="d in datasets"
                :key="d.key"
                type="button"
                :disabled="switchBusy || csvBusy"
                class="text-left px-3 py-2.5 border rounded-sm transition-colors disabled:opacity-60"
                :class="(preview?.dataset || datasetKey) === d.key
                  ? 'border-absa-passion bg-absa-passion/5'
                  : 'border-gray-300 hover:border-absa-enrich bg-white'"
                @click="changeDataset(d.key)"
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold text-absa-enrich">{{ d.label }}</span>
                  <span
                    v-if="(preview?.dataset || datasetKey) === d.key"
                    class="text-[10px] font-bold uppercase tracking-wide text-absa-passion"
                  >Selected</span>
                </div>
                <p class="text-[11px] text-gray-500 mt-0.5">{{ d.description }}</p>
                <p class="text-[10px] font-mono text-gray-400 mt-1">
                  {{ d.table }} · {{ d.field_count }} fields · key {{ (d.key_columns || []).join(' + ') }}
                </p>
              </button>
            </div>
            <p v-if="switchBusy" class="text-[11px] text-gray-500 mt-2">
              Re-mapping {{ preview?.filename }} against {{ activeDataset?.label }}…
            </p>
            <p v-else-if="preview && preview.dataset !== datasetKey" class="text-[11px] text-amber-800 mt-2">
              The mapping below is still for {{ preview.dataset }} — pick a target above to re-map.
            </p>
          </div>

          <!-- Step 1: pick a file -->
          <div v-if="step === 1">
            <label
              class="block border-2 border-dashed border-gray-300 rounded-sm p-10 text-center cursor-pointer hover:border-absa-passion transition-colors"
              @dragover.prevent
              @drop.prevent="onDrop"
            >
              <span class="material-symbols-outlined text-[32px] text-gray-400">upload_file</span>
              <p class="text-sm font-bold text-absa-enrich mt-2">Choose a CSV file or drop it here</p>
              <p class="text-[11px] text-gray-500 mt-1">
                The first row must be a header. Columns are matched to
                <span class="font-bold">{{ activeDataset?.label || 'the target' }}</span> fields,
                and every column is mapped before anything is written.
              </p>
              <input type="file" accept=".csv,text/csv" class="hidden" @change="onFilePicked" />
            </label>
            <p v-if="csvBusy" class="text-xs text-gray-500 mt-3">Reading file…</p>
          </div>

          <!-- Step 2: map columns -->
          <template v-else>
            <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div class="text-xs text-gray-600">
                <span class="font-bold text-absa-enrich">{{ preview.filename }}</span>
                · {{ preview.row_count.toLocaleString() }} rows · {{ preview.columns.length }} columns
                · {{ mappedCount }} mapped
                <span v-if="unmappedColumns.length"> · {{ unmappedColumns.length }} skipped</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[11px] text-gray-500">
                  Target <span class="font-mono text-absa-enrich">{{ preview.target_table || targetTable }}</span>
                </span>
                <button class="text-[11px] font-bold text-absa-passion underline" @click="resetCsv">Choose another file</button>
              </div>
            </div>

            <div class="border border-gray-300 rounded-sm overflow-hidden">
              <div class="overflow-x-auto max-h-[45vh]">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50 sticky top-0">
                    <tr>
                      <th class="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">CSV column</th>
                      <th class="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Sample</th>
                      <th class="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Maps to field</th>
                      <th class="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Expected format</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 bg-white">
                    <tr v-for="col in preview.columns" :key="col">
                      <td class="px-3 py-2 align-top">
                        <div class="text-xs font-bold text-absa-enrich">{{ col }}</div>
                        <div v-if="checkByColumn[col]?.issues?.length" class="text-[10px] text-red-600 mt-0.5">
                          {{ checkByColumn[col].issues[0] }}
                        </div>
                      </td>
                      <td class="px-3 py-2 align-top">
                        <span class="text-[11px] font-mono text-gray-500">
                          {{ sampleByColumn[col] === '' || sampleByColumn[col] == null ? '—' : sampleByColumn[col] }}
                        </span>
                      </td>
                      <td class="px-3 py-2 align-top">
                        <select
                          v-model="mapping[col]"
                          class="w-56 border border-gray-300 rounded-sm px-2 py-1 text-xs font-semibold text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
                        >
                          <option value="">— Skip this column —</option>
                          <option v-for="f in fields" :key="f.name" :value="f.name">
                            {{ f.label }} ({{ f.name }}){{ f.required ? ' *' : '' }}
                          </option>
                        </select>
                      </td>
                      <td class="px-3 py-2 align-top">
                        <span v-if="mapping[col]" class="text-[11px] text-gray-600">
                          {{ fieldByName[mapping[col]]?.format || '—' }}
                        </span>
                        <span v-else class="text-[11px] text-gray-400">not loaded</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Mapping problems -->
            <div v-if="liveMappingErrors.length" class="mt-3 px-4 py-2 bg-amber-50 border border-amber-200 rounded-sm text-[11px] text-amber-800">
              <p v-for="(e, i) in liveMappingErrors" :key="i">{{ e }}</p>
            </div>

            <!-- Result -->
            <div v-if="loadResult" class="mt-4 border border-gray-300 rounded-sm">
              <div class="px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <span class="text-xs font-bold text-absa-enrich">
                  {{ loadResult.dry_run ? 'Validation only — nothing was written' : 'Load complete' }}
                </span>
                <span class="text-[11px] font-mono text-gray-500">batch {{ loadResult.batch_id }}</span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-5 divide-x divide-gray-200">
                <div class="px-4 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Received</p>
                  <p class="text-sm font-bold font-mono text-absa-enrich">{{ loadResult.rows_received }}</p>
                </div>
                <div class="px-4 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Valid</p>
                  <p class="text-sm font-bold font-mono text-absa-enrich">{{ loadResult.rows_valid }}</p>
                </div>
                <div class="px-4 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Inserted</p>
                  <p class="text-sm font-bold font-mono text-absa-enrich">{{ loadResult.rows_inserted }}</p>
                </div>
                <div class="px-4 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Updated</p>
                  <p class="text-sm font-bold font-mono text-absa-enrich">{{ loadResult.rows_updated }}</p>
                </div>
                <div class="px-4 py-3">
                  <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Rejected</p>
                  <p class="text-sm font-bold font-mono" :class="loadResult.rows_rejected ? 'text-red-700' : 'text-absa-enrich'">
                    {{ loadResult.rows_rejected }}
                  </p>
                </div>
              </div>
              <div class="px-4 py-2 border-t border-gray-200 text-[11px] text-gray-600">
                <span class="font-mono text-absa-enrich">{{ loadResult.target_table || targetTable }}</span>
                · key <span class="font-mono">{{ (loadResult.key_columns || keyColumns).join(' + ') }}</span>
                · data quality <span class="font-bold text-absa-enrich">{{ loadResult.quality_score }}%</span>
                · {{ loadResult.duration_seconds }}s
                <span v-if="loadResult.duplicates_detected"> · {{ loadResult.duplicates_detected }} duplicate key row(s) collapsed (last row wins)</span>
              </div>
              <div v-if="loadResult.rejected_samples?.length" class="border-t border-gray-200 max-h-40 overflow-y-auto">
                <table class="min-w-full text-[11px]">
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="r in loadResult.rejected_samples" :key="r.row_number">
                      <td class="px-4 py-1.5 font-mono text-gray-500 w-16">#{{ r.row_number }}</td>
                      <td class="px-4 py-1.5 text-red-700">{{ r.errors.join('; ') }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-4 flex items-center justify-between gap-2">
              <p class="text-[11px] text-gray-500 max-w-2xl">
                <template v-if="requiredFields.length">
                  Required fields:
                  <span v-for="(f, i) in requiredFields" :key="f.name" class="font-bold">
                    {{ f.name }}<span v-if="i < requiredFields.length - 1">, </span>
                  </span>. 
                </template>
                Rows are matched on
                <span class="font-mono font-bold">{{ keyColumnText }}</span>
                — an existing match is updated in place, anything else is inserted.
              </p>
              <div class="flex items-center gap-2">
                <button
                  :disabled="csvBusy || switchBusy || liveMappingErrors.length > 0"
                  class="px-4 py-2 bg-white text-absa-enrich border border-gray-300 rounded-sm text-xs font-bold hover:bg-gray-50 disabled:opacity-40"
                  @click="runLoad(true)"
                >Validate only</button>
                <button
                  :disabled="csvBusy || switchBusy || liveMappingErrors.length > 0"
                  class="px-4 py-2 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-40"
                  @click="runLoad(false)"
                >{{ csvBusy ? 'Working…' : 'Load into Postgres' }}</button>
              </div>
            </div>
          </template>

          <p v-if="csvError" class="mt-3 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
            {{ csvError }}
          </p>
        </template>

        <!-- ═══════════════ CORE BANKING ═══════════════ -->
        <template v-else>
          <p class="text-xs text-gray-600 mb-4 max-w-3xl">
            The ETL Engine reads the selected core-system extract through the
            <span class="font-mono text-absa-enrich">CoreBankingConnector</span>, normalises every value against the
            ingest contract, then loads it into <span class="font-mono text-absa-enrich">{{ targetTable }}</span>.
          </p>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2">
              <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Core system extract</label>
              <select
                v-model="coreDataset"
                class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none"
              >
                <option v-for="d in coreDatasets" :key="d.key" :value="d.key">{{ d.label }}</option>
              </select>
              <p v-if="selectedCoreDataset" class="text-[11px] text-gray-500 mt-2">{{ selectedCoreDataset.description }}</p>
              <p v-if="selectedCoreDataset?.notes" class="text-[11px] text-amber-800 mt-1">{{ selectedCoreDataset.notes }}</p>

              <div v-if="selectedCoreDataset" class="mt-3 border border-gray-300 rounded-sm">
                <div class="px-3 py-2 bg-gray-50 border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Field mapping
                </div>
                <div class="grid grid-cols-2 gap-x-4 gap-y-1 px-3 py-2 text-[11px]">
                  <div v-for="m in selectedCoreDataset.mapped_fields" :key="m.source_column" class="flex items-center gap-2">
                    <span class="font-mono text-gray-600">{{ m.source_column }}</span>
                    <span class="text-gray-400">→</span>
                    <span class="font-semibold text-absa-enrich">{{ m.target_field }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Row limit</label>
                <input
                  v-model="coreLimit"
                  type="number"
                  min="1"
                  placeholder="All rows"
                  class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-absa-passion outline-none"
                />
                <p class="text-[10px] text-gray-500 mt-1">Leave empty to pull the full extract.</p>
              </div>
              <label class="flex items-center gap-2 text-xs text-gray-700">
                <input v-model="coreDryRun" type="checkbox" class="rounded-sm border-gray-300 text-absa-passion focus:ring-absa-passion" />
                Validate only (no writes)
              </label>
              <button
                :disabled="coreBusy || !coreDataset"
                class="w-full px-4 py-2.5 bg-absa-passion text-white rounded-sm text-xs font-bold hover:bg-absa-power disabled:opacity-40"
                @click="runCore"
              >{{ coreBusy ? 'Extracting…' : (coreDryRun ? 'Test pull' : 'Pull from core system') }}</button>
            </div>
          </div>

          <p v-if="coreError" class="mt-3 px-4 py-2 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
            {{ coreError }}
          </p>

          <div v-if="coreResult" class="mt-4 border border-gray-300 rounded-sm">
            <div class="px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <span class="text-xs font-bold text-absa-enrich">
                {{ coreResult.dry_run ? 'Test pull — nothing was written' : 'Core sync complete' }}
              </span>
              <span class="text-[11px] font-mono text-gray-500">batch {{ coreResult.batch_id }}</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-200">
              <div class="px-4 py-3">
                <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Extracted</p>
                <p class="text-sm font-bold font-mono text-absa-enrich">{{ coreResult.rows_extracted }}</p>
              </div>
              <div class="px-4 py-3">
                <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Loaded</p>
                <p class="text-sm font-bold font-mono text-absa-enrich">{{ coreResult.rows_loaded }}</p>
              </div>
              <div class="px-4 py-3">
                <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Rejected</p>
                <p class="text-sm font-bold font-mono" :class="coreResult.rows_rejected ? 'text-red-700' : 'text-absa-enrich'">
                  {{ coreResult.rows_rejected }}
                </p>
              </div>
              <div class="px-4 py-3">
                <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Quality</p>
                <p class="text-sm font-bold font-mono text-absa-enrich">{{ coreResult.quality_score }}%</p>
              </div>
            </div>
            <div class="px-4 py-2 border-t border-gray-200 text-[11px] text-gray-600">
              Source <span class="font-mono text-absa-enrich">{{ coreResult.source_table }}</span>
              · extracted via <span class="font-semibold text-absa-enrich">{{ coreResult.extraction_mode }}</span>
              <span v-if="coreResult.rows_inserted != null"> · {{ coreResult.rows_inserted }} new, {{ coreResult.rows_updated }} updated</span>
              <span v-if="coreResult.duplicates_detected"> · {{ coreResult.duplicates_detected }} duplicate ID(s) collapsed (last row wins)</span>
              · {{ coreResult.duration_seconds }}s
            </div>
            <div v-if="coreResult.rejected_samples?.length" class="border-t border-gray-200 max-h-40 overflow-y-auto">
              <table class="min-w-full text-[11px]">
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="r in coreResult.rejected_samples" :key="r.row_number">
                    <td class="px-4 py-1.5 font-mono text-gray-500 w-16">#{{ r.row_number }}</td>
                    <td class="px-4 py-1.5 text-red-700">{{ r.errors.join('; ') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
