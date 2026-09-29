<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import * as yaml from 'js-yaml'
import { fetchDatabaseMetadata } from '@/services/etlApi'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const dbMetadata = ref({})
const tablesList = computed(() => Object.keys(dbMetadata.value).sort())

// Helper to get columns for a given table name
function getColumnsForTable(tableName) {
  if (!tableName) return []
  return (dbMetadata.value[tableName] || []).map(c => c.name).sort()
}

// --- State Model ---
// This represents the parsed YAML as a reactive object we can bind to form inputs.
const formState = ref({
  dataset_name: '',
  description: '',
  incremental: {
    enabled: false,
    strategy: 'timestamp',
    watermark_column: '',
    lookback_minutes: 1440
  },
  primary_entity: {
    table: '',
    alias: 'p',
    select_fields: []
  },
  joins: [],
  target: {
    schema: 'public',
    table: '',
    upsert_key: ''
  }
})

// Used to temporarily pause the watcher when updating form from props
let isSyncing = false

// --- Parse initial YAML to Form ---
function parseYamlToForm(yamlStr) {
  try {
    const parsed = yaml.load(yamlStr)
    if (!parsed) return

    formState.value = {
      dataset_name: parsed.dataset_name || '',
      description: parsed.description || '',
      incremental: {
        enabled: parsed.incremental?.enabled || false,
        strategy: parsed.incremental?.strategy || 'timestamp',
        watermark_column: parsed.incremental?.watermark_column || '',
        lookback_minutes: parsed.incremental?.lookback_minutes || 1440
      },
      primary_entity: {
        table: parsed.primary_entity?.table || '',
        alias: parsed.primary_entity?.alias || 'p',
        select_fields: parsed.primary_entity?.select_fields || []
      },
      joins: parsed.joins || [],
      target: {
        schema: parsed.target?.schema || 'public',
        table: parsed.target?.table || '',
        upsert_key: parsed.target?.upsert_key || ''
      }
    }
  } catch (e) {
    console.error("YAML Parse Error in Visual Builder:", e)
    // Don't crash, just leave form blank or show error
  }
}

// --- Serialize Form to YAML ---
function serializeFormToYaml() {
  const obj = {
    version: "1.0",
    dataset_name: formState.value.dataset_name,
    trusted_config: true,
    description: formState.value.description,
    incremental: { ...formState.value.incremental },
    primary_entity: { ...formState.value.primary_entity },
    target: { ...formState.value.target }
  }

  // Only include joins if they exist
  if (formState.value.joins && formState.value.joins.length > 0) {
    obj.joins = formState.value.joins
  }

  return yaml.dump(obj, { indent: 2, skipInvalid: true })
}

// Watch for changes in the form and emit updated YAML
watch(formState, () => {
  if (isSyncing) return
  try {
    const newYaml = serializeFormToYaml()
    emit('update:modelValue', newYaml)
  } catch (e) {
    console.error("YAML Dump Error:", e)
  }
}, { deep: true })

// Watch for external YAML changes (e.g. from code editor or load)
watch(() => props.modelValue, (newVal) => {
  if (isSyncing) return
  isSyncing = true
  parseYamlToForm(newVal)
  // Allow Vue cycle to finish before unpausing
  setTimeout(() => { isSyncing = false }, 10)
})

onMounted(async () => {
  isSyncing = true
  parseYamlToForm(props.modelValue)
  setTimeout(() => { isSyncing = false }, 10)
  
  try {
    const data = await fetchDatabaseMetadata()
    if (data) dbMetadata.value = data
  } catch (e) {
    console.error("Failed to fetch DB metadata:", e)
  }
})

// --- UI Helpers ---
function addPrimaryField() {
  formState.value.primary_entity.select_fields.push({ field: '', alias: '', validation: { type: 'str' } })
}
function removePrimaryField(index) {
  formState.value.primary_entity.select_fields.splice(index, 1)
}
</script>

<template>
  <div class="bg-white dark:bg-surface-container rounded-lg p-6 space-y-8">
    
    <!-- Meta Info -->
    <section>
      <h3 class="text-title-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined">info</span>
        Basic Details
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-secondary mb-1">Dataset Name</label>
          <input v-model="formState.dataset_name" type="text" class="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-absa-enrich" placeholder="e.g. customer_360">
        </div>
        <div class="col-span-1 md:col-span-2">
          <label class="block text-sm font-medium text-secondary mb-1">Description</label>
          <textarea v-model="formState.description" rows="2" class="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-absa-enrich" placeholder="What does this ETL extract?"></textarea>
        </div>
      </div>
    </section>

    <!-- Target / Output -->
    <section>
      <h3 class="text-title-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined">database</span>
        Destination (Target)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-secondary mb-1">Schema</label>
          <input v-model="formState.target.schema" type="text" class="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-absa-enrich">
        </div>
        <div>
          <label class="block text-sm font-medium text-secondary mb-1">Table Name</label>
          <input v-model="formState.target.table" type="text" list="target-tables" class="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-absa-enrich" placeholder="e.g. customers_clean">
          <datalist id="target-tables">
            <option v-for="t in tablesList" :key="t" :value="t"></option>
          </datalist>
        </div>
        <div>
          <label class="block text-sm font-medium text-secondary mb-1">Upsert Key (Primary Key)</label>
          <input v-model="formState.target.upsert_key" type="text" class="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-absa-enrich" placeholder="e.g. customer_id">
        </div>
      </div>
    </section>

    <!-- Source / Primary Entity -->
    <section>
      <h3 class="text-title-lg font-semibold text-primary mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined">source</span>
        Source Entity (From ABSA DW)
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="col-span-2">
          <label class="block text-sm font-medium text-secondary mb-1">Source Table</label>
          <input v-model="formState.primary_entity.table" type="text" list="source-tables" class="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-absa-enrich" placeholder="e.g. a_africa_zam_base_customer">
          <datalist id="source-tables">
            <option v-for="t in tablesList" :key="t" :value="t"></option>
          </datalist>
        </div>
        <div>
          <label class="block text-sm font-medium text-secondary mb-1">Alias</label>
          <input v-model="formState.primary_entity.alias" type="text" class="w-full bg-surface-container-lowest border border-outline-variant rounded p-2 text-absa-enrich">
        </div>
      </div>

      <!-- Field Mappings -->
      <div class="bg-surface-container-low rounded p-4 border border-outline-variant">
        <div class="flex justify-between items-center mb-3">
          <h4 class="font-medium text-secondary">Extracted Fields</h4>
          <button @click="addPrimaryField" class="text-xs bg-primary text-white px-3 py-1 rounded hover:bg-absa-red transition-colors flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">add</span> Add Field
          </button>
        </div>
        
        <div class="space-y-2">
          <!-- Column Datalist for current source table -->
          <datalist id="source-columns">
            <option v-for="c in getColumnsForTable(formState.primary_entity.table)" :key="c" :value="c"></option>
          </datalist>

          <div v-for="(field, idx) in formState.primary_entity.select_fields" :key="idx" class="flex items-center gap-3 bg-white dark:bg-surface-container p-2 rounded shadow-sm border border-outline-variant">
            <input v-model="field.field" type="text" list="source-columns" placeholder="Source Column" class="flex-1 bg-transparent border-b border-outline-variant p-1 text-sm focus:outline-none focus:border-primary">
            <span class="material-symbols-outlined text-gray-400 text-sm">arrow_forward</span>
            <input v-model="field.alias" type="text" placeholder="Target Alias" class="flex-1 bg-transparent border-b border-outline-variant p-1 text-sm focus:outline-none focus:border-primary">
            
            <select v-if="field.validation" v-model="field.validation.type" class="w-24 bg-surface-container-lowest border border-outline-variant rounded p-1 text-xs">
              <option value="str">String</option>
              <option value="int">Integer</option>
              <option value="float">Float</option>
              <option value="date">Date</option>
              <option value="bool">Boolean</option>
            </select>
            
            <button @click="removePrimaryField(idx)" class="text-gray-400 hover:text-absa-red transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div v-if="!formState.primary_entity.select_fields.length" class="text-center py-4 text-sm text-gray-500 italic">
            No fields mapped yet.
          </div>
        </div>
      </div>
    </section>

    <!-- Incremental Logic -->
    <section class="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-title-lg font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
          <span class="material-symbols-outlined">update</span>
          Incremental Load
        </h3>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="formState.incremental.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">Enabled</span>
        </label>
      </div>
      
      <div v-if="formState.incremental.enabled" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-secondary mb-1">Watermark Column</label>
          <input v-model="formState.incremental.watermark_column" type="text" class="w-full bg-white dark:bg-surface-container border border-blue-200 dark:border-blue-800 rounded p-2 text-absa-enrich" placeholder="e.g. cn.customer_creation_date">
        </div>
        <div>
          <label class="block text-sm font-medium text-secondary mb-1">Lookback Minutes</label>
          <input v-model="formState.incremental.lookback_minutes" type="number" class="w-full bg-white dark:bg-surface-container border border-blue-200 dark:border-blue-800 rounded p-2 text-absa-enrich" placeholder="1440">
        </div>
      </div>
      <p v-else class="text-sm text-gray-500">
        Incremental load is disabled. This pipeline will run as a full refresh (overwrite/upsert all records) every time.
      </p>
    </section>

  </div>
</template>
