<script setup>
import { ref, computed } from 'vue'

// Tab & Search State
const activeTab = ref('configurations')
const searchQuery = ref('')
const isModalOpen = ref(false)
const isSaving = ref(false)

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

// Currently Active Modal Config
const activeConfig = ref({ ...configs.value[0] })

// Search Filter Computed Property
const filteredConfigs = computed(() => {
  if (!searchQuery.value.trim()) return configs.value
  const query = searchQuery.value.toLowerCase()
  return configs.value.filter(
    item => item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
  )
})

// Modal & Data Actions
function openEditModal(config) {
  activeConfig.value = JSON.parse(JSON.stringify(config))
  isModalOpen.value = true
}

function openNewConfigModal() {
  const newId = Date.now()
  activeConfig.value = {
    id: newId,
    name: `new_extraction_${configs.value.length + 1}.yaml`,
    description: 'New data extraction specification.',
    status: 'valid',
    lastModified: new Date().toISOString().split('T')[0],
    size: '1.0',
    content: `spec_version: "v2.1"\nname: "new_extraction"\ndescription: "New specification"`
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function saveConfig() {
  isSaving.value = true
  setTimeout(() => {
    const index = configs.value.findIndex(c => c.id === activeConfig.value.id)
    if (index !== -1) {
      configs.value[index] = { ...activeConfig.value }
    } else {
      configs.value.push({ ...activeConfig.value })
    }
    isSaving.value = false
    isModalOpen.value = false
  }, 500)
}

function deleteConfig(id) {
  configs.value = configs.value.filter(c => c.id !== id)
}
</script>

<template>
  <div class="absa-mesh font-body text-[#131010] h-full min-h-screen flex flex-col md:flex-row antialiased relative">
    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col min-h-screen relative">
      <!-- TopNavBar -->
      <header class="bg-[#FFFFFF] fixed top-0 right-0 left-0 h-20 border-b border-[#e4e2e2] z-10">
        <div class="flex justify-between items-center px-8 w-full h-full max-w-[1440px] mx-auto">
          <h2 class="text-headline-lg font-bold text-[#DC0037] tracking-tight">Branch Manager Dashboard</h2>
          <div class="flex items-center gap-6">
            <div class="relative focus-within:ring-2 focus-within:ring-[#DC0037]/20 rounded-full border border-[#e4e2e2]">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#131010]/70 text-[20px]">search</span>
              <input 
                v-model="searchQuery" 
                class="bg-[#FFFFFF] border-none rounded-full pl-10 pr-4 py-2 text-body-md focus:ring-0 w-64 text-[#131010]" 
                placeholder="Search..." 
                type="text"
              />
            </div>
            <div class="flex items-center gap-4 border-l border-[#e4e2e2] pl-6">
              <button class="text-[#131010]/70 hover:text-[#DC0037] transition-colors relative">
                <span class="material-symbols-outlined text-[24px]">notifications</span>
                <span class="absolute top-0 right-0 w-2 h-2 bg-[#DC0037] rounded-full"></span>
              </button>
              <button class="text-[#131010]/70 hover:text-[#DC0037] transition-colors">
                <span class="material-symbols-outlined text-[24px]">help</span>
              </button>
              <div class="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#e4e2e2] overflow-hidden ml-2 cursor-pointer">
                <img 
                  class="w-full h-full object-cover" 
                  alt="Banking Executive Profile" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzw1Q0XcIAyuSpFszByxrqLFJbsTsRotMJ9dCBPQrV6dlooAT-XzYc7E97aeC59XPjy5E24sgzIbh7ZEGiVvgQCw06Q3oFDwSp1RZemSgS3Q1ireT8XJIBDrvsBK3Y7aC7m-zb2I6Ac71LnINdLUIdieh-v4wYLAEwHbX6tPEhLuWSP6PyRJ-9j9bb9cX3XAoJKJUPgYd0H4qh3-dI5oYkxiHSVC9jJUnqJ2IQTYb4PQBYKu4jx5s8sA"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Canvas -->
      <main class="flex-1 pt-28 px-8 pb-12 max-w-[1440px] mx-auto w-full">
        <div class="mb-8 flex items-end justify-between">
          <div>
            <h1 class="text-headline-xl font-bold text-[#131010] tracking-tight mb-2">ETL Config Manager</h1>
            <p class="text-body-lg text-[#131010]/70">Manage and execute data extraction specifications.</p>
          </div>
        </div>

        <!-- Tabbed Navigation -->
        <div class="flex border-b border-[#e4e2e2] mb-6">
          <button 
            @click="activeTab = 'run_history'"
            :class="[
              'px-6 py-3 text-body-lg flex items-center gap-2 transition-colors',
              activeTab === 'run_history' ? 'font-bold text-[#DC0037] border-b-2 border-[#DC0037]' : 'font-medium text-[#131010]/70 hover:text-[#DC0037]'
            ]"
          >
            <span class="material-symbols-outlined text-[20px]">history</span>
            Run History
          </button>
          <button 
            @click="activeTab = 'configurations'"
            :class="[
              'px-6 py-3 text-body-lg flex items-center gap-2 transition-colors',
              activeTab === 'configurations' ? 'font-bold text-[#DC0037] border-b-2 border-[#DC0037]' : 'font-medium text-[#131010]/70 hover:text-[#DC0037]'
            ]"
          >
            <span 
              class="material-symbols-outlined text-[20px]" 
              :style="{ fontVariationSettings: activeTab === 'configurations' ? '\'FILL\' 1' : '\'FILL\' 0' }"
            >description</span>
            Configurations
          </button>
        </div>

        <!-- Configurations Panel -->
        <div v-if="activeTab === 'configurations'" class="bg-[#FFFFFF] border border-[#DC0037] rounded-xl shadow-sm overflow-hidden relative">
          <div class="absolute inset-0 dotted-pattern pointer-events-none"></div>
          <div class="relative z-10 px-6 py-5 border-b border-[#e4e2e2] flex justify-between items-center bg-[#FFFFFF]/90 backdrop-blur-sm">
            <p class="text-body-md font-medium text-[#131010]/70 uppercase tracking-widest text-[12px]">
              {{ configs.length }} extraction specs in etl/config/extraction_specs/
            </p>
            <button @click="openNewConfigModal" class="bg-[#DC0037] hover:bg-[#B50232] text-[#FFFFFF] font-medium py-2 px-4 rounded transition-colors flex items-center gap-2 text-body-md shadow-sm">
              <span class="material-symbols-outlined text-[18px]">add</span>
              New Config
            </button>
          </div>
          <div class="relative z-10 overflow-x-auto bg-[#FFFFFF]">
            <table class="w-full text-left text-body-md">
              <thead class="bg-[#FFFFFF] border-b border-[#e4e2e2] text-label-caps text-[#131010]/70">
                <tr>
                  <th class="px-6 py-4 font-bold tracking-widest">Name</th>
                  <th class="px-6 py-4 font-bold tracking-widest">Status</th>
                  <th class="px-6 py-4 font-bold tracking-widest">Last Modified</th>
                  <th class="px-6 py-4 font-bold tracking-widest">Size (KB)</th>
                  <th class="px-6 py-4 font-bold tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e4e2e2] bg-[#FFFFFF]">
                <tr v-for="config in filteredConfigs" :key="config.id" class="hover:bg-[#f5f5f5] transition-colors group">
                  <td class="px-6 py-4">
                    <div class="font-semibold text-[#131010]">{{ config.name }}</div>
                    <div class="text-[#131010]/70 text-sm mt-0.5">{{ config.description }}</div>
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
                  <td class="px-6 py-4 text-[#131010]/70 font-mono text-sm">{{ config.lastModified }}</td>
                  <td class="px-6 py-4 text-[#131010]/70 font-mono text-sm">{{ config.size }}</td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button @click="openEditModal(config)" class="p-1.5 text-[#131010]/70 hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded transition-colors" title="Edit">
                        <span class="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button class="p-1.5 text-[#131010]/70 hover:text-[#2e7d32] hover:bg-[#2e7d32]/10 rounded transition-colors" title="Run">
                        <span class="material-symbols-outlined text-[20px]">play_arrow</span>
                      </button>
                      <button @click="deleteConfig(config.id)" class="p-1.5 text-[#131010]/70 hover:text-[#DC0037] hover:bg-[#DC0037]/10 rounded transition-colors" title="Delete">
                        <span class="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Run History Panel -->
        <div v-else class="bg-[#FFFFFF] border border-[#e4e2e2] rounded-xl p-8 text-center text-[#131010]/70">
          <p class="text-body-lg">Run History logs will appear here.</p>
        </div>
      </main>
    </div>

    <!-- YAML Editor Modal (Overlay) -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-[#131010]/60 backdrop-blur-sm p-4 md:p-8">
      <div class="bg-[#FFFFFF] w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-full border border-[#DC0037] overflow-hidden">
        <div class="px-6 py-4 border-b border-[#131010] flex justify-between items-center bg-[#131010]">
          <h3 class="text-headline-md font-bold text-[#FFFFFF] flex items-center gap-2">
            <span class="material-symbols-outlined text-[#DC0037] text-[24px]">edit_document</span>
            Edit config - <span class="font-mono text-[#DC0037] bg-[#FFFFFF]/10 px-2 py-0.5 rounded text-lg">{{ activeConfig.name }}</span>
          </h3>
          <button @click="closeModal" class="text-[#FFFFFF]/70 hover:text-[#FFFFFF] p-1 rounded-full hover:bg-[#FFFFFF]/10 transition-colors">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>
        <div class="p-6 flex-1 overflow-y-auto bg-[#FFFFFF] flex flex-col gap-4">
          <div>
            <label class="block text-label-caps text-[#131010]/70 mb-1.5">File name</label>
            <input 
              v-model="activeConfig.name" 
              class="w-full bg-[#FFFFFF] border border-[#e4e2e2] rounded px-3 py-2 text-body-md font-mono text-[#131010] cursor-not-allowed" 
              readonly 
              type="text"
            />
          </div>
          <div class="flex-1 flex flex-col min-h-[300px]">
            <label class="block text-label-caps text-[#131010]/70 mb-1.5 flex justify-between">
              <span>Specification (YAML)</span>
              <span class="text-[#DC0037] cursor-pointer hover:underline normal-case font-medium">View Docs</span>
            </label>
            <textarea 
              v-model="activeConfig.content" 
              class="flex-1 w-full bg-[#131010] text-[#FFFFFF] border border-[#131010] rounded p-4 font-mono text-sm focus:ring-1 focus:ring-[#DC0037] focus:border-[#DC0037] resize-none" 
              spellcheck="false"
            ></textarea>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-[#e4e2e2] bg-[#FFFFFF] flex justify-between items-center">
          <div class="flex items-center gap-2 text-[#2e7d32] text-label-sm font-bold tracking-widest uppercase">
            <span class="w-2 h-2 rounded-full bg-[#2e7d32] animate-pulse"></span> YAML valid
          </div>
          <div class="flex items-center gap-3">
            <button @click="closeModal" class="px-4 py-2 text-body-md font-medium text-[#131010] hover:bg-[#f5f5f5] border border-[#e4e2e2] rounded transition-colors">Cancel</button>
            <button @click="saveConfig" class="px-4 py-2 bg-[#DC0037] hover:bg-[#B50232] text-[#FFFFFF] text-body-md font-medium rounded transition-colors flex items-center gap-2">
              <span v-if="isSaving" class="material-symbols-outlined text-[18px] animate-spin">sync</span>
              Save config
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

