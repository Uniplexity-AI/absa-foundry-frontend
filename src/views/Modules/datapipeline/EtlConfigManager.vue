<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  fetchETLConfigs,
  fetchETLConfigContent,
  createETLConfig,
  saveETLConfig,
  deleteETLConfig,
  triggerETLPipeline,
} from '@/services/etlApi'
import { notify } from '@/utils/absaExport'

// Tab & Search State
const activeTab = ref('configurations')
const searchQuery = ref('')
const isSaving = ref(false)

// Editor view state: null = show configs table, config object = show editor
const editorView = ref(null)
const editingConfig = ref(null)
const editorMode = ref('edit') // 'edit' | 'preview'
const isNewConfig = ref(false)

// Config Specifications Data (loaded from the backend extraction_specs dir)
const configs = ref([])
const configsLoading = ref(false)
const configsError = ref(null)

// Map backend config rows to the shape the template expects.
function toDisplayConfig(c) {
  return {
    id: c.name,                    // filename is the stable key
    name: c.name,
    description: c.description || '',
    status: c.status === 'ok' ? 'valid' : 'check needed',
    lastModified: c.last_modified || '',
    size: c.size_bytes != null ? (c.size_bytes / 1024).toFixed(1) : '—',
    content: c.content || null,
  }
}

async function loadConfigs() {
  configsLoading.value = true
  configsError.value = null
  try {
    const list = await fetchETLConfigs()
    configs.value = (list || []).map(toDisplayConfig)
  } catch (e) {
    configsError.value = e.message || 'Failed to load configs'
    configs.value = []
  } finally {
    configsLoading.value = false
  }
}

// Search Filter Computed Property
const filteredConfigs = computed(() => {
  if (!searchQuery.value.trim()) return configs.value
  const query = searchQuery.value.toLowerCase()
  return configs.value.filter(
    item => (item.name || '').toLowerCase().includes(query) || (item.description || '').toLowerCase().includes(query)
  )
})

// Editor content lines for line numbers
const editorLines = computed(() => {
  if (!editingConfig.value?.content) return []
  return editingConfig.value.content.split('\n')
})

// Open editor for existing config
async function openEditor(config) {
  if (!config) return
  // Always fetch the freshest content from the backend before editing.
  try {
    const detail = await fetchETLConfigContent(config.name)
    editingConfig.value = {
      ...config,
      content: detail.content,
      lastModified: detail.last_modified || config.lastModified,
    }
  } catch (e) {
    notify(`Failed to load "${config.name}" — ${e.message || 'backend error'}`, 'error')
    editingConfig.value = JSON.parse(JSON.stringify(config))
  }
  isNewConfig.value = false
  editorMode.value = 'edit'
  editorView.value = config.name
}

// Open editor for new config
function openNewEditor() {
  editingConfig.value = {
    id: null,
    name: 'new_extraction.yaml',
    description: 'New data extraction specification.',
    status: 'valid',
    lastModified: new Date().toISOString().slice(0, 10),
    size: '1.0',
    content: `spec_version: "v2.1"
name: "new_extraction"
description: "New specification"
source:
  type: "postgres"
  connection_ref: "prod_db"
output:
  type: "postgres"
  table: "staging_new_extraction"`
  }
  isNewConfig.value = true
  editorMode.value = 'edit'
  editorView.value = 'new'
}

// Close editor, return to table
function closeEditor() {
  editorView.value = null
  editingConfig.value = null
  isNewConfig.value = false
}

// Save config (create or update) against the backend
async function saveConfig() {
  if (!editingConfig.value?.content) return
  if (!editingConfig.value.content.trim()) {
    notify('Config content is empty', 'error')
    return
  }
  isSaving.value = true
  try {
    if (isNewConfig.value) {
      // Backend derives the filename from the YAML `name:` field.
      const created = await createETLConfig(editingConfig.value.content)
      notify(`Config created — ${created.name || 'see backend'}`, 'success')
    } else {
      const name = editingConfig.value.name || editingConfig.value.id
      await saveETLConfig(name, editingConfig.value.content)
      notify(`Config saved — ${name}`, 'success')
    }
    closeEditor()
    await loadConfigs()
  } catch (e) {
    notify(`Failed to save config — ${e.message || 'backend error'}`, 'error', { autoClose: 5000 })
  } finally {
    isSaving.value = false
  }
}

async function deleteConfig(name) {
  if (!name) return
  if (!window.confirm(`Delete config "${name}"? This cannot be undone.`)) return
  try {
    await deleteETLConfig(name)
    notify(`Config deleted — ${name}`, 'success')
    if (editorView.value === name) closeEditor()
    await loadConfigs()
  } catch (e) {
    notify(`Failed to delete — ${e.message || 'backend error'}`, 'error')
  }
}

// Run a config (jump to Run History and start it) — wire the play button.
async function runConfig(config) {
  const name = config?.name || config?.id
  if (!name) return
  try {
    const res = await triggerETLPipeline(name)
    notify(`${res.message || `Pipeline triggered — ${name}`}`, 'success', { autoClose: 5000 })
    activeTab.value = 'run_history'
  } catch (e) {
    notify(`Failed to run "${name}" — ${e.message || 'backend error'}`, 'error')
  }
}

// ── Relative timestamp helper ──
function relativeTime(dateStr) {
  if (!dateStr) return '—'
  const then = new Date(dateStr)
  if (isNaN(then.getTime())) return dateStr.slice(0, 10)
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

onMounted(() => {
  loadConfigs()
})
</script>

<template>
  <div class="dashboard-root  w-full min-h-screen p-4 md:p-6 lg:p-8">

    <!-- Page Header -->
    <div class="mb-6 pb-4 border-b border-gray-300 flex justify-between items-end">
      <div>
        <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
          <span>Dashboard</span><span>/</span>
          <span>Data Pipeline</span><span>/</span>
          <span class="text-absa-enrich font-bold">Config Manager</span>
        </div>
        <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">ETL Config Manager</h1>
      </div>
    </div>

    <!-- ═══ Tabbed Navigation ═══ -->
    <div class="flex border-b border-gray-300 mb-6">
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
          <div v-if="editorView" class="bg-white rounded-sm border border-gray-300  shadow-none overflow-hidden flex flex-col relative text-on-surface text-sm min-h-[600px]">
            <!-- Editor Header -->
            <div class="px-4 py-3 flex justify-between items-center border-b border-gray-300 bg-white relative z-10">
              <div class="flex items-center gap-2 font-mono text-sm">
                <span class="material-symbols-outlined text-on-surface-variant text-[20px]">dataset</span>
                <span class="text-[#DC0037] font-bold">customer-lifecycle-ai</span>
                <span class="text-on-surface-variant">/</span>
                <strong class="text-on-surface">{{ editingConfig?.name }}</strong>
              </div>
              <div class="flex items-center gap-3">
                <button @click="closeEditor" class="px-3 py-1.5 text-sm font-medium text-on-surface-variant bg-white border border-gray-300 rounded-md hover:border-[#DC0037] hover:text-[#DC0037] transition-colors">Cancel changes</button>
                <button @click="saveConfig" :disabled="isSaving" class="px-3 py-1.5 text-sm font-bold text-on-primary bg-[#DC0037] hover:bg-[#B50232] rounded-md transition-colors flex items-center gap-2 shadow-none border border-[#DC0037]">
                  <span v-if="isSaving" class="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  save config
                </button>
              </div>
            </div>
            <!-- Editor Sub-header -->
            <div class="flex justify-between items-center px-4 py-2 border-b border-gray-300 bg-white relative z-10">
              <div class="flex gap-2">
                <button @click="editorMode = 'edit'" :class="['px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md transition-colors', editorMode === 'edit' ? 'text-on-surface bg-white' : 'text-on-surface-variant hover:text-on-surface']">Edit</button>
                <button @click="editorMode = 'preview'" :class="['px-3 py-1.5 text-sm font-medium transition-colors', editorMode === 'preview' ? 'text-on-surface bg-white border border-gray-300 rounded-md' : 'text-on-surface-variant hover:text-on-surface']">Preview</button>
              </div>
              <div class="flex gap-4 items-center">
                <div class="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span>Spaces:</span>
                  <select class="bg-transparent border border-gray-300 rounded-md text-on-surface cursor-pointer py-0.5 pl-2 pr-6 text-sm">
                    <option>2</option>
                    <option>4</option>
                  </select>
                </div>
                <div class="flex items-center gap-2 text-sm text-on-surface-variant">
                  <span>Soft wrap</span>
                  <select class="bg-transparent border border-gray-300 rounded-md text-on-surface cursor-pointer py-0.5 pl-2 pr-6 text-sm">
                    <option>None</option>
                    <option>Word</option>
                  </select>
                </div>
              </div>
            </div>
            <!-- Editor Body: line numbers + YAML content -->
            <div class="flex-1 overflow-auto flex bg-transparent font-mono text-[13px] leading-[1.6] relative z-10">
              <div class="w-12 flex-shrink-0 text-right pr-4 text-on-surface-variant bg-white-container-low select-none py-4 border-r border-gray-300">
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
          <div v-else class="bg-white rounded-sm border border-gray-300  shadow-none relative">
            <div class="relative z-10 px-6 py-5 border-b border-gray-300 flex justify-between items-center bg-white">
              <div class="flex items-center gap-4">
                <p class="text-body-md font-medium text-on-surface-variant uppercase tracking-widest text-[12px]">
                  {{ configs.length }} extraction specs in etl/config/extraction_specs/
                </p>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
                  <input v-model="searchQuery" class="bg-white border border-gray-300 rounded-sm pl-8 pr-3 py-1 text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary w-56" placeholder="Search configs..." type="text" />
                </div>
              </div>
              <button @click="openNewEditor" class="bg-[#DC0037] hover:bg-[#B50232] text-on-primary font-medium py-2 px-4 rounded-sm transition-colors flex items-center gap-2 text-body-md shadow-none">
                <span class="material-symbols-outlined text-[18px]">add</span>
                New Config
              </button>
            </div>
            <div class="relative z-10 overflow-x-auto bg-white">
              <!-- Loading state -->
              <div v-if="configsLoading" class="p-12 text-center text-body-md text-secondary">
                Loading extraction specs…
              </div>
              <!-- Error state -->
              <div v-else-if="configsError" class="p-12 text-center text-body-md text-primary">
                <p>{{ configsError }}</p>
                <button @click="loadConfigs" class="mt-3 text-[#DC0037] font-semibold hover:underline">Retry</button>
              </div>
              <table v-else class="w-full text-left text-body-md">
                <thead class="bg-white border-b border-gray-300 text-label-caps text-on-surface-variant">
                  <tr>
                    <th class="px-6 py-4 font-bold tracking-widest">Name</th>
                    <th class="px-6 py-4 font-bold tracking-widest">Status</th>
                    <th class="px-6 py-4 font-bold tracking-widest">Last Modified</th>
                    <th class="px-6 py-4 font-bold tracking-widest">Size (KB)</th>
                    <th class="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant bg-white">
                  <tr v-if="filteredConfigs.length === 0 && configs.length > 0">
                    <td colspan="5" class="p-12 text-center text-body-md text-secondary">No configs matching "{{ searchQuery }}"</td>
                  </tr>
                  <tr v-else-if="configs.length === 0">
                    <td colspan="5" class="p-12 text-center text-body-md text-secondary">No extraction specs found — create one with + New Config</td>
                  </tr>
                  <tr v-for="config in filteredConfigs" :key="config.id" class="hover:bg-white-container-low transition-colors group cursor-pointer" @click="openEditor(config)">
                    <td class="px-6 py-4">
                      <div class="font-semibold text-on-surface">{{ config.name }}</div>
                      <div class="text-on-surface-variant text-sm mt-0.5">{{ config.description }}</div>
                    </td>
                    <td class="px-6 py-4">
                      <span 
                        v-if="config.status === 'valid'"
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-green-100 text-green-700 border border-green-200 text-xs font-semibold"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-green-600"></span> valid
                      </span>
                      <span 
                        v-else
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-orange-100 text-absa-energy border border-orange-200 text-xs font-semibold"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-absa-energy"></span> check needed
                      </span>
                    </td>
                    <td class="px-6 py-4 text-on-surface-variant font-mono text-sm">{{ relativeTime(config.lastModified) }}</td>
                    <td class="px-6 py-4 text-on-surface-variant font-mono text-sm">{{ config.size }}</td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity" @click.stop>
                        <button @click="openEditor(config)" class="p-1.5 text-on-surface-variant hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded-sm transition-colors" title="Edit">
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button @click="runConfig(config)" class="p-1.5 text-on-surface-variant hover:text-[#2e7d32] hover:bg-[#2e7d32]/10 rounded-sm transition-colors" title="Run now">
                          <span class="material-symbols-outlined text-[20px]">play_arrow</span>
                        </button>
                        <button @click="deleteConfig(config.name)" class="p-1.5 text-on-surface-variant hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded-sm transition-colors" title="Delete">
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
        <div v-else class="bg-white rounded-sm border border-gray-300  shadow-none p-8 text-center text-on-surface-variant">
          <p class="text-body-lg">Run History logs will appear here.</p>
        </div>
  </div>
</template>

