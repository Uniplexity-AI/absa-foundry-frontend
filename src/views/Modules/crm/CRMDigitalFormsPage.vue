<script setup>
import { ref } from 'vue'
import { FileText, Plus, Search, Filter, MoreVertical, CheckCircle, Clock } from 'lucide-vue-next'

const activeTab = ref('templates')

const templates = ref([
  { id: 'T-001', name: 'Customer Onboarding Form', responses: 142, status: 'Active', updated: '12 Aug 2026' },
  { id: 'T-002', name: 'KYC Update Request', responses: 89, status: 'Active', updated: '10 Aug 2026' },
  { id: 'T-003', name: 'Loan Application (SME)', responses: 34, status: 'Draft', updated: '05 Aug 2026' }
])

</script>

<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-hidden">
    <!-- Mesh Background -->
    
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm shrink-0">
      <div class="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/dashboard/crm" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1">&larr; Back</router-link>
          <div class="w-2 h-8 bg-absa-passion rounded-none ml-2"></div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Workspace</span>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Digital Forms</span>
            </div>
            <h1 class="text-xl font-black font-display text-gray-900 uppercase tracking-tight">Form Manager</h1>
          </div>
        </div>
        
        <button class="bg-absa-passion hover:bg-absa-passion/90 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors rounded-none flex items-center gap-2">
          <Plus :size="14" /> Create Form
        </button>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 flex overflow-hidden p-6 max-w-7xl mx-auto w-full gap-6">
      
      <!-- Left Sidebar: Tabs -->
      <div class="w-64 shrink-0 flex flex-col gap-2">
        <button @click="activeTab = 'templates'" :class="activeTab === 'templates' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'" class="p-4 rounded-none text-left transition-colors shadow-sm relative group overflow-hidden">
          <div v-if="activeTab !== 'templates'" class="absolute inset-0 dotted-pattern opacity-[0.03] group-hover:opacity-[0.05] pointer-events-none"></div>
          <div class="flex items-center gap-3 relative z-10">
            <FileText :size="18" :class="activeTab === 'templates' ? 'text-white' : 'text-gray-400'" />
            <div>
              <div class="text-[11px] font-black uppercase tracking-tight font-display">Templates</div>
              <div class="text-[9px] font-mono uppercase tracking-widest mt-0.5 opacity-70">Manage Form Designs</div>
            </div>
          </div>
        </button>

        <button @click="activeTab = 'responses'" :class="activeTab === 'responses' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'" class="p-4 rounded-none text-left transition-colors shadow-sm relative group overflow-hidden">
          <div v-if="activeTab !== 'responses'" class="absolute inset-0 dotted-pattern opacity-[0.03] group-hover:opacity-[0.05] pointer-events-none"></div>
          <div class="flex items-center gap-3 relative z-10">
            <CheckCircle :size="18" :class="activeTab === 'responses' ? 'text-white' : 'text-gray-400'" />
            <div>
              <div class="text-[11px] font-black uppercase tracking-tight font-display">Responses</div>
              <div class="text-[9px] font-mono uppercase tracking-widest mt-0.5 opacity-70">View Submissions</div>
            </div>
          </div>
        </button>
        
        <button @click="activeTab = 'signoffs'" :class="activeTab === 'signoffs' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'" class="p-4 rounded-none text-left transition-colors shadow-sm relative group overflow-hidden">
          <div v-if="activeTab !== 'signoffs'" class="absolute inset-0 dotted-pattern opacity-[0.03] group-hover:opacity-[0.05] pointer-events-none"></div>
          <div class="flex items-center gap-3 relative z-10">
            <Clock :size="18" :class="activeTab === 'signoffs' ? 'text-white' : 'text-gray-400'" />
            <div>
              <div class="text-[11px] font-black uppercase tracking-tight font-display">Sign-Offs</div>
              <div class="text-[9px] font-mono uppercase tracking-widest mt-0.5 opacity-70">Pending Approvals</div>
            </div>
          </div>
        </button>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 bg-white border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
                
        <div class="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between relative z-10">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" :size="14" />
            <input type="text" placeholder="SEARCH..." class="w-64 pl-9 pr-4 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest bg-white border border-gray-200 focus:outline-none focus:border-absa-passion rounded-none placeholder:text-gray-300" />
          </div>
          <button class="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-absa-passion transition">
            <Filter :size="14" /> Filter
          </button>
        </div>

        <div class="flex-1 overflow-auto relative z-10">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-900">
                <th class="sticky top-0 bg-gray-900 text-[10px] font-mono font-bold uppercase tracking-widest text-white/90 border-b border-gray-800 px-5 py-3">Form ID</th>
                <th class="sticky top-0 bg-gray-900 text-[10px] font-mono font-bold uppercase tracking-widest text-white/90 border-b border-gray-800 px-5 py-3">Template Name</th>
                <th class="sticky top-0 bg-gray-900 text-[10px] font-mono font-bold uppercase tracking-widest text-white/90 border-b border-gray-800 px-5 py-3">Status</th>
                <th class="sticky top-0 bg-gray-900 text-[10px] font-mono font-bold uppercase tracking-widest text-white/90 border-b border-gray-800 px-5 py-3">Responses</th>
                <th class="sticky top-0 bg-gray-900 text-[10px] font-mono font-bold uppercase tracking-widest text-white/90 border-b border-gray-800 px-5 py-3">Last Updated</th>
                <th class="sticky top-0 bg-gray-900 text-[10px] font-mono font-bold uppercase tracking-widest text-white/90 border-b border-gray-800 px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in templates" :key="t.id" class="hover:bg-[#FDE8EC]/30 transition-colors border-b border-gray-100 group">
                <td class="px-5 py-4">
                  <span class="inline-block px-2 py-0.5 bg-gray-100 border border-gray-200 text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">{{ t.id }}</span>
                </td>
                <td class="px-5 py-4">
                  <div class="text-[12px] font-black text-gray-900 font-display uppercase tracking-tight">{{ t.name }}</div>
                </td>
                <td class="px-5 py-4">
                  <span :class="t.status === 'Active' ? 'text-green-600 bg-green-50 border-green-200' : 'text-gray-500 bg-gray-50 border-gray-200'" class="inline-flex px-2 py-0.5 border text-[9px] font-mono font-bold uppercase tracking-widest">
                    {{ t.status }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <div class="text-[11px] font-mono font-bold text-gray-900">{{ t.responses }}</div>
                </td>
                <td class="px-5 py-4">
                  <div class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{{ t.updated }}</div>
                </td>
                <td class="px-5 py-4 text-right">
                  <button class="text-gray-400 hover:text-absa-passion transition"><MoreVertical :size="16" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
