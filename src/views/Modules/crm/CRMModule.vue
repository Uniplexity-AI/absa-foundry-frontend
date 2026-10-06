<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  TrendingUp, Clock, AlertTriangle, Activity, 
  Users, BarChart2, Briefcase, CheckCircle,
  PhoneCall, Users as CustomersIcon, Layers, PieChart, Calendar
} from 'lucide-vue-next'

// Mock Data for KPIs (Call Centre FRD metrics)
const router = useRouter()

function openForms() {
  console.log('Navigating to Calendar & Activities page: /dashboard/crm/calendar')
  router.push('/dashboard/crm/calendar')
}

const kpis = ref({
  serviceLevel: '82.4',
  avgSpeedAnswer: '18',
  abandonmentRate: '12.5',
  fcr: '76.0',
  totalInteractions: '1,245',
  activeAgents: '24',
  escalations: '42',
  avgHandleTime: '4m 20s'
})
</script>

<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <div class="flex-1 w-full relative z-10 blur-scoped pb-20">
      <div class="px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">

        <!-- KPI Section -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-4 bg-absa-passion"></div>
            <h4 class="text-xs font-black text-gray-900 uppercase tracking-tight">Key Performance Indicators</h4>
          </div>

          <!-- Row 1 KPIs -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <!-- Card 1 -->
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-absa-passion"><TrendingUp :size="18"/></div>
                <span class="text-xs text-absa-passion font-medium">Target 80%</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Service Level</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.serviceLevel }}<span class="text-sm font-normal text-gray-400">%</span></p>
            </div>
            <!-- Card 2 -->
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-blue-500"><Clock :size="18"/></div>
                <span class="text-xs text-blue-600 font-medium">Avg Time</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Speed to Answer</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.avgSpeedAnswer }}<span class="text-sm font-normal text-gray-400 ml-1">sec</span></p>
            </div>
            <!-- Card 3 -->
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-orange-500"><AlertTriangle :size="18"/></div>
                <span class="text-xs text-orange-600 font-medium">Critical</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Abandon Rate</h5>
              <p class="text-2xl font-black text-orange-500 tracking-tight">{{ kpis.abandonmentRate }}<span class="text-sm font-normal text-gray-400">%</span></p>
            </div>
            <!-- Card 4 (Analytics Highlight) -->
              <router-link to="/dashboard/crm/analytics" class="bg-absa-passion border border-absa-passion shadow-sm p-4 relative group hover:bg-[#b3002d] transition cursor-pointer flex flex-col justify-between">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 border border-white/20 bg-white/10 text-white"><BarChart2 :size="18"/></div>
                <span class="text-[9px] text-white font-mono font-bold uppercase tracking-widest opacity-80">Analytics</span>
              </div>
              <div>
                <h5 class="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest mb-1">CRM_Analytics</h5>
                <p class="text-lg font-bold font-display text-white tracking-tight">View Dashboard</p>
              </div>
            </router-link>
          </div>

          <!-- Row 2 KPIs -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Activity :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">+120 Today</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Interactions</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.totalInteractions }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Users :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">24 Act.</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Active Agents</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.activeAgents }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Briefcase :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">12 Open</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Escalations</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.escalations }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><CheckCircle :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">76% FCR</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Avg Handle Time</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.avgHandleTime }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Access Links Section -->
        <div class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <!-- Card 1 -->
            <router-link to="/dashboard/crm/workspace" class="bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col text-left">
              <div class="w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <PhoneCall :size="20" class="text-gray-400 "/>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Agent Workspace</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                Voice &diams; Chat &diams; Email &diams; SMS
              </p>
              <span class="text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto">
                Open &rarr;
              </span>
            </router-link>

            <!-- Card 2 -->
            <router-link to="/dashboard/customers" class="bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col text-left">
              <div class="w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <CustomersIcon :size="20" class="text-gray-400 "/>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Customers</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                Manage &diams; Filter &diams; View &diams; Profiles
              </p>
              <span class="text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto">
                Open &rarr;
              </span>
            </router-link>

            <!-- Card 3 -->
              <router-link to="/dashboard/crm/tickets" class="bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col">
              <div class="w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <Layers :size="20" class="text-gray-400 "/>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Tickets & Cases</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                Open &diams; Resolved &diams; Escalations
              </p>
              <span class="text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto">
                Open &rarr;
              </span>
            </router-link>

            <!-- Card 4 -->
              <router-link to="/dashboard/crm/analytics" class="bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col">
              <div class="w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <PieChart :size="20" class="text-gray-400 "/>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Analytics</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                Reports &diams; Trends &diams; Forecasts
              </p>
              <span class="text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto">
                Open &rarr;
              </span>
            </router-link>

            <!-- Card 5 -->
            <div @click="openForms" class="bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col">
              <div class="w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform">
                <Calendar :size="20" class="text-gray-400 "/>
              </div>
              <h3 class="text-sm font-bold text-gray-900 tracking-tight mb-2">Calendar & Activities</h3>
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                Events &diams; Tasks &diams; Follow-ups
              </p>
              <span class="text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto">
                Open &rarr;
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.mesh-background {
  background-color: #ffffff;
  background-image:
    linear-gradient(color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, #DC0037 4%, transparent) 1px, transparent 1px);
  background-size: 38px 38px;
}
</style>

<!-- clear ebusy -->

<!-- clear ebusy -->




