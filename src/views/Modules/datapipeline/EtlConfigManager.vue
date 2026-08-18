<script setup>
import { ref, computed } from 'vue'

// Tab & Search State
const activeTab = ref('configurations')
const searchQuery = ref('')
const isSaving = ref(false)

// Editor view state: null = show configs table, config object = show editor
const editorView = ref(null)
const editingConfig = ref(null)
const editorMode = ref('edit') // 'edit' | 'preview'

// Config Specifications Data
const configs = ref([
  {
    id: 1,
    name: 'customer_360.yaml',
    description: 'Aggregates retail banking customer profiles.',
    status: 'valid',
    lastModified: '2023-10-24',
    size: '4.2',
    content: `spec_version: "v2.1"
name: "customer_360_aggregation"
description: "Aggregates retail banking customer profiles."

source:
  type: "postgres"
  connection_ref: "prod_retail_db"
  query: |
    SELECT id, first_name, last_name, email, created_at 
    FROM users 
    WHERE status = 'active'

output:
  type: "s3"
  bucket: "pb-data-lake-raw"
  prefix: "customer_360/daily/"
  format: "parquet"`
  },
  {
    id: 2,
    name: 'daily_transactions_eu.yaml',
    description: 'European branch transaction ledger sync.',
    status: 'check needed',
    lastModified: '2023-10-22',
    size: '12.8',
    content: `spec_version: "v2.1"
name: "daily_transactions_eu"
description: "European branch transaction ledger sync."

source:
  type: "postgres"
  connection_ref: "eu_ledger_db"
  query: |
    SELECT transaction_id, amount, currency, timestamp
    FROM ledger
    WHERE region = 'EU'

output:
  type: "s3"
  bucket: "pb-data-lake-raw"
  prefix: "transactions/eu/"
  format: "parquet"`
  }
])

// Search Filter Computed Property
const filteredConfigs = computed(() => {
  if (!searchQuery.value.trim()) return configs.value
  const query = searchQuery.value.toLowerCase()
  return configs.value.filter(
    item => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
  )
})

// Editor content lines for line numbers
const editorLines = computed(() => {
  if (!editingConfig.value?.content) return []
  return editingConfig.value.content.split('\n')
})

// Open editor for existing config
function openEditor(config) {
  editingConfig.value = JSON.parse(JSON.stringify(config))
  editorMode.value = 'edit'
  editorView.value = config.id
}

// Open editor for new config
function openNewEditor() {
  const newId = Date.now()
  editingConfig.value = {
    id: newId,
    name: `new_extraction_${configs.value.length + 1}.yaml`,
    description: 'New data extraction specification.',
    status: 'valid',
    lastModified: new Date().toISOString().split('T')[0],
    size: '1.0',
    content: `spec_version: "v2.1"\nname: "new_extraction"\ndescription: "New specification"`
  }
  editorMode.value = 'edit'
  editorView.value = newId
}

// Close editor, return to table
function closeEditor() {
  editorView.value = null
  editingConfig.value = null
}

// Save config from inline editor
function saveConfig() {
  if (!editingConfig.value) return
  isSaving.value = true
  setTimeout(() => {
    const index = configs.value.findIndex(c => c.id === editingConfig.value.id)
    if (index !== -1) {
      configs.value[index] = { ...editingConfig.value }
    } else {
      configs.value.push({ ...editingConfig.value })
    }
    isSaving.value = false
    editorView.value = null
    editingConfig.value = null
  }, 500)
}

function deleteConfig(id) {
  configs.value = configs.value.filter(c => c.id !== id)
}

// ── Relative timestamp helper ──
function relativeTime(dateStr) {
  if (!dateStr) return '—'
  const then = new Date(dateStr)
  const now = new Date()
  const diffMs = now - then
  const diffMins = Math.floor(diffMs / 60000)
  const diffHrs = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHrs < 24) return `${diffHrs}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return dateStr.slice(0, 10)
}
</script>

<template>
  <div class="dashboard-root global-mesh-bg w-full min-h-screen p-4 md:p-6 lg:p-8">

    <!-- ═══ Tabbed Navigation ═══ -->
    <div class="flex border-b border-outline-variant mb-6">
      <button 
        @click="activeTab = 'run_history'"
        :class="[
          'px-6 py-3 text-body-lg flex items-center gap-2 transition-colors',
          activeTab === 'run_history' ? 'font-bold text-[#DC0037] border-b-2 border-[#DC0037]' : 'font-medium text-on-surface-variant hover:text-[#DC0037]'
        ]"
      >
        <span class="material-symbols-outlined text-[20px]">history</span>
        Run History
      </button>
      <button 
        @click="activeTab = 'configurations'"
        :class="[
          'px-6 py-3 text-body-lg flex items-center gap-2 transition-colors',
          activeTab === 'configurations' ? 'font-bold text-[#DC0037] border-b-2 border-[#DC0037]' : 'font-medium text-on-surface-variant hover:text-[#DC0037]'
        ]"
      >
        <span 
          class="material-symbols-outlined text-[20px]" 
          :style="{ fontVariationSettings: activeTab === 'configurations' ? '\'FILL\' 1' : '\'FILL\' 0' }"
        >description</span>
        Configurations
      </button>
    </div>

        <!-- ═══════════════════════════════════════════════ -->
        <!-- Configurations Panel                          -->
        <!-- ═══════════════════════════════════════════════ -->
        <template v-if="activeTab === 'configurations'">

          <!-- Editor View: inline GitHub-style YAML editor -->
          <div v-if="editorView" class="bg-surface rounded border border-outline-variant global-dotted-bg shadow-sm overflow-hidden flex flex-col relative text-on-surface text-sm min-h-[600px]">
            <!-- Editor Header -->
            <div class="px-4 py-3 flex justify-between items-center border-b border-outline-variant bg-surface relative z-10">
              <div class="flex items-center gap-2 font-mono text-sm">
                <span class="material-symbols-outlined text-on-surface-variant text-[20px]">dataset</span>
                <span class="text-[#DC0037] font-bold">customer-lifecycle-ai</span>
                <span class="text-on-surface-variant">/</span>
                <strong class="text-on-surface">{{ editingConfig?.name }}</strong>
              </div>
              <div class="flex items-center gap-3">
                <button @click="closeEditor" class="px-3 py-1.5 text-sm font-medium text-on-surface-variant bg-surface border border-outline-variant rounded-md hover:border-[#DC0037] hover:text-[#DC0037] transition-colors">Cancel changes</button>
                <button @click="saveConfig" :disabled="isSaving" class="px-3 py-1.5 text-sm font-bold text-on-primary bg-[#DC0037] hover:bg-[#B50232] rounded-md transition-colors flex items-center gap-2 shadow-sm border border-[#DC0037]">
                  <span v-if="isSaving" class="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  save config
                </button>
              </div>
            </div>
            <!-- Editor Sub-header -->
            <div class="flex justify-between items-center px-4 py-2 border-b border-outline-variant bg-surface relative z-10">
              <div class="flex gap-2">
                <button @click="editorMode = 'edit'" :class="['px-3 py-1.5 text-sm font-medium border border-outline-variant rounded-md transition-colors', editorMode === 'edit' ? 'text-on-surface bg-surface' : 'text-on-surface-variant hover:text-on-surface']">Edit</button>
                <button @click="editorMode = 'preview'" :class="['px-3 py-1.5 text-sm font-medium transition-colors', editorMode === 'preview' ? 'text-on-surface bg-surface border border-outline-variant rounded-md' : 'text-on-surface-variant hover:text-on-surface']">Preview</button>
              </div>
              <div class="flex gap-4 items-center">
                <div class="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span>Spaces:</span>
                  <select class="bg-transparent border border-outline-variant rounded-md text-on-surface cursor-pointer py-0.5 pl-2 pr-6 text-sm">
                    <option>2</option>
                    <option>4</option>
                  </select>
                </div>
                <div class="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span>Soft wrap</span>
                  <select class="bg-transparent border border-outline-variant rounded-md text-on-surface cursor-pointer py-0.5 pl-2 pr-6 text-sm">
                    <option>None</option>
                    <option>Word</option>
                  </select>
                </div>
              </div>
            </div>
            <!-- Editor Body: line numbers + YAML content -->
            <div class="flex-1 overflow-auto flex bg-transparent font-mono text-[13px] leading-[1.6] relative z-10">
              <div class="w-12 flex-shrink-0 text-right pr-4 text-on-surface-variant bg-surface-container-low select-none py-4 border-r border-outline-variant">
                <template v-for="(_, i) in editorLines" :key="i">{{ i + 1 }}<br /></template>
              </div>
              <div v-if="editorMode === 'edit'" class="p-4 w-full outline-none focus:ring-0">
                <textarea
                  v-model="editingConfig.content"
                  class="w-full h-full min-h-[400px] bg-transparent border-none outline-none resize-none font-mono text-[13px] leading-[1.6] text-on-surface"
                  spellcheck="false"
                ></textarea>
              </div>
              <div v-else class="p-4 whitespace-pre text-on-surface overflow-x-auto w-full font-medium">
                <template v-for="(line, i) in editorLines" :key="i">
                  <span class="text-[#DC0037] font-bold">{{ line.match(/^\s*\w+/) ? line.match(/^\s*\w+/)[0] : '' }}</span><span>{{ line.replace(/^\s*\w+/, '') }}</span><br />
                </template>
              </div>
            </div>
          </div>

          <!-- Table View: configs list -->
          <div v-else class="bg-surface rounded border border-outline-variant global-dotted-bg shadow-sm relative">
            <div class="relative z-10 px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface">
              <div class="flex items-center gap-4">
                <p class="text-body-md font-medium text-on-surface-variant uppercase tracking-widest text-[12px]">
                  {{ configs.length }} extraction specs in etl/config/extraction_specs/
                </p>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
                  <input v-model="searchQuery" class="bg-surface border border-outline-variant rounded pl-8 pr-3 py-1 text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary w-56" placeholder="Search configs..." type="text" />
                </div>
              </div>
              <button @click="openNewEditor" class="bg-[#DC0037] hover:bg-[#B50232] text-on-primary font-medium py-2 px-4 rounded transition-colors flex items-center gap-2 text-body-md shadow-sm">
                <span class="material-symbols-outlined text-[18px]">add</span>
                New Config
              </button>
            </div>
            <div class="relative z-10 overflow-x-auto bg-surface">
              <table class="w-full text-left text-body-md">
                <thead class="bg-surface border-b border-outline-variant text-label-caps text-on-surface-variant">
                  <tr>
                    <th class="px-6 py-4 font-bold tracking-widest">Name</th>
                    <th class="px-6 py-4 font-bold tracking-widest">Status</th>
                    <th class="px-6 py-4 font-bold tracking-widest">Last Modified</th>
                    <th class="px-6 py-4 font-bold tracking-widest">Size (KB)</th>
                    <th class="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant bg-surface">
                  <tr v-if="filteredConfigs.length === 0 && configs.length > 0">
                    <td colspan="5" class="p-12 text-center text-body-md text-secondary">No configs matching "{{ searchQuery }}"</td>
                  </tr>
                  <tr v-else-if="configs.length === 0">
                    <td colspan="5" class="p-12 text-center text-body-md text-secondary">No extraction specs found — create one with + New Config</td>
                  </tr>
                  <tr v-for="config in filteredConfigs" :key="config.id" class="hover:bg-surface-container-low transition-colors group cursor-pointer" @click="openEditor(config)">
                    <td class="px-6 py-4">
                      <div class="font-semibold text-on-surface">{{ config.name }}</div>
                      <div class="text-on-surface-variant text-sm mt-0.5">{{ config.description }}</div>
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        v-if="config.status === 'valid'"
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2e7d32]/10 text-[#2e7d32] border border-[#2e7d32]/20 text-xs font-semibold"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-[#2e7d32]"></span> valid
                      </span>
                      <span 
                        v-else
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FF780F]/10 text-[#F93F24] border border-[#FF780F]/30 text-xs font-semibold"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-[#F93F24]"></span> check needed
                      </span>
                    </td>
                    <td class="px-6 py-4 text-on-surface-variant font-mono text-sm">{{ relativeTime(config.lastModified) }}</td>
                    <td class="px-6 py-4 text-on-surface-variant font-mono text-sm">{{ config.size }}</td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity" @click.stop>
                        <button @click="openEditor(config)" class="p-1.5 text-on-surface-variant hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded transition-colors" title="Edit">
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button class="p-1.5 text-on-surface-variant hover:text-[#2e7d32] hover:bg-[#2e7d32]/10 rounded transition-colors" title="Run">
                          <span class="material-symbols-outlined text-[20px]">play_arrow</span>
                        </button>
                        <button @click="deleteConfig(config.id)" class="p-1.5 text-on-surface-variant hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded transition-colors" title="Delete">
                          <span class="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>

        <!-- Run History Panel -->
        <div v-else class="bg-surface rounded border border-outline-variant global-dotted-bg shadow-sm p-8 text-center text-on-surface-variant">
          <p class="text-body-lg">Run History logs will appear here.</p>
        </div>
  </div>
</template>

