<template>
  <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border border-gray-200 mb-6 overflow-x-auto shadow-none">
    <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
    <div class="max-w-[1920px] mx-auto px-4 py-2">
      <div class="flex items-center gap-1 overflow-x-auto no-scrollbar">
        <div class="flex items-center gap-2 mr-4 border-r border-gray-200 pr-4">
          <div class="w-1.5 h-6 bg-[#2F2E8B]"></div>
          <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">STRATEGIC // NAV_INDEX</span>
        </div>
        
        <button 
          v-for="tab in navigationTabs" 
          :key="tab.id"
          @click="navigateToTab(tab.id)"
          :class="[
            'flex items-center gap-2 px-4 py-2 transition-all text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap border-b-2',
            activeTab === tab.id 
              ? 'border-[#2F2E8B] text-[#2F2E8B] bg-blue-50/50' 
              : 'border-transparent text-gray-500 hover:text-[#2F2E8B] hover:bg-gray-50'
          ]"
        >
          <i :class="[tab.icon, activeTab === tab.id ? 'text-[#2F2E8B]' : 'text-gray-400']"></i>
          <span>{{ tab.label }}</span>
          <span v-if="tab.badge" class="px-1 py-0.5 text-[8px] bg-[#2F2E8B] text-white">{{ tab.badge }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

const router = useRouter()

const navigationTabs = ref([
  { id: 'overview', label: 'Overview', icon: 'fas fa-tachometer-alt' },
  { id: 'notes', label: 'Notes', icon: 'fas fa-sticky-note' },
  { id: 'governance', label: 'Governance', icon: 'fas fa-gavel' },
  { id: 'goals', label: 'Goals', icon: 'fas fa-bullseye' },
  { id: 'actions', label: 'Actions', icon: 'fas fa-bolt' },
  { id: 'analysis', label: 'Analysis', icon: 'fas fa-brain' },
  { id: 'predictions', label: 'Predictions', icon: 'fas fa-chart-line' },
  { id: 'funding', label: 'Funding', icon: 'fas fa-hand-holding-usd' },
  { id: 'environmental', label: 'Environmental', icon: 'fas fa-globe-americas' },
  { id: 'internal', label: 'Internal Analysis', icon: 'fas fa-chess-knight' },
  { id: 'positioning', label: 'Positioning', icon: 'fas fa-chess-queen' },
  { id: 'brand', label: 'Brand Strategy', icon: 'fas fa-palette' }
])

const navigateToTab = (tabId) => {
  const routeMap = {
    overview: '/dashboard/strategic/overview',
    notes: '/dashboard/strategic/notes',
    governance: '/dashboard/strategic/governance',
    goals: '/dashboard/strategic/goals',
    actions: '/dashboard/strategic/actions',
    analysis: '/dashboard/strategic/analysis',
    predictions: '/dashboard/strategic/predictions',
    funding: '/dashboard/strategic/funding',
    environmental: '/dashboard/strategic/environmental',
    internal: '/dashboard/strategic/internal-analysis',
    positioning: '/dashboard/strategic/positioning',
    brand: '/dashboard/strategic/brand'
  }
  if (routeMap[tabId]) {
    router.push(routeMap[tabId])
  }
}
</script>
