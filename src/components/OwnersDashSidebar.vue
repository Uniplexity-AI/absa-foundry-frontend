<template>
  <aside class="w-20 min-h-screen bg-white border-r border-gray-200">
    <nav class="flex flex-col items-center py-8 space-y-8">
      <!-- <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
        <font-awesome-icon :icon="['fas', 'user']" class="w-6 h-6 text-gray-600" />
      </div> -->
      
      <router-link 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        class="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
        :class="{ 'bg-blue-50': isActive(item.path) }"
      >
        <font-awesome-icon :icon="item.icon" class="w-6 h-6" />
      </router-link>

      <div class="mt-auto">
        <button class="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-gray-100">
          <font-awesome-icon :icon="['fas', 'cog']" class="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHome,
  faChartLine, 
  faGasPump, 
  faExchangeAlt, 
  faFileAlt, 
  faHeadset,
  faUser,
  faCog,
  faUsersGear,
  faUserPlus,
  faDroplet,
  faIndustry,
  faCamera
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faHome,
  faChartLine, 
  faGasPump, 
  faExchangeAlt, 
  faFileAlt, 
  faHeadset,
  faUser,
  faCog,
  faUsersGear,
  faUserPlus,
  faDroplet,
  faIndustry,
  faCamera
)

const route = useRoute()

// Base menu items always shown (those unrelated to dashboard module subscriptions)
const baseMenuItems = [
  {
    name: 'Dashboard',
    icon: ['fas', 'home'],
    path: '/stationOwners/dashboard'
  },
  {
    name: 'User Management',
    icon: ['fas', 'users-gear'],
    path: '/stationOwners/user-management'
  },
  {
    name: 'Attendant Management',
    icon: ['fas', 'user-plus'],
    path: '/stationOwners/attendant-management'
  },
  {
    name: 'Fuel Management',
    icon: ['fas', 'droplet'],
    path: '/stationowners/fuel-management'
  },
  {
    name: 'Pump And Tank Management',
    icon: ['fas', 'gas-pump'],
    path: '/stationowners/pump-management'
  },
  {
    name: 'Transactions',
    icon: ['fas', 'exchange-alt'],
    path: '/stationowners/transaction-history'
  },
  {
    name: 'Reports',
    icon: ['fas', 'file-alt'],
    path: '/stationowners/reports'
  },
]

// Items tied to dashboard modules (visibility depends on subscription/approval)
const moduleMenuItems = [
  {
    id: 'mining-image-capture',
    name: 'Mining Image Capture',
    icon: ['fas', 'camera'],
    path: '/dashboard/mining-image-capture'
  }
]

const dashboardStore = useDashboardStore()

// Compute menu items to render: include module items only when subscribed/approved
const menuItems = computed(() => {
  const subs = dashboardStore.subscribedModules || []
  // normalize to ids
  const ids = subs.map(s => (s && (s.id || s.module_id)) ? (s.id || s.module_id) : (typeof s === 'string' ? s : null)).filter(Boolean)
  const visibleModuleItems = moduleMenuItems.filter(mi => ids.includes(mi.id) || ids.includes('mining') || ids.includes('mining-image-capture'))
  return [
    ...baseMenuItems,
    {
      name: 'Station Management',
      icon: ['fas', 'industry'],
      path: '/stationowners/station-management'
    },
    {
      name: 'Support',
      icon: ['fas', 'headset'],
      path: '/StationOwners/support'
    },
    ...visibleModuleItems
  ]
})

onMounted(() => {
  // Ensure dashboard modules are fetched so subscription state is available
  if (dashboardStore && typeof dashboardStore.fetchModules === 'function') {
    dashboardStore.fetchModules().catch(() => {})
  }
})

const isActive = (path) => route.path === path
</script>