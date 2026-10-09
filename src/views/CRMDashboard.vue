<script setup>
import { ref } from 'vue'
import {
  TrendingUp, Clock, AlertTriangle, Activity, 
  Users, BarChart2, Briefcase, CheckCircle,
  PhoneCall, Users as CustomersIcon, Layers, PieChart, FileText, Calendar
} from 'lucide-vue-next'

// Mock Data for KPIs (Call Centre FRD metrics)
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
              <p class="text-2xl font-black tracking-tight text-gray-900">{{ kpis.serviceLevel }}<span class="text-sm font-normal text-gray-400">%</span></p>
            </div>
            <!-- Card 2 -->
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-blue-500"><Clock :size="18"/></div>
                <span class="text-xs text-blue-600 font-medium">Avg Time</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Speed to Answer</h5>
              <p class="text-2xl font-black tracking-tight text-gray-900">{{ kpis.avgSpeedAnswer }}<span class="text-sm font-normal text-gray-400 ml-1">sec</span></p>
            </div>
            <!-- Card 3 -->
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-orange-500"><AlertTriangle :size="18"/></div>
                <span class="text-xs text-orange-600 font-medium">Critical</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Abandon Rate</h5>
              <p class="text-2xl font-black tracking-tight text-orange-500">{{ kpis.abandonmentRate }}<span class="text-sm font-normal text-gray-400">%</span></p>
            </div>
            <!-- Card 4 (Analytics Highlight) -->
            <div class="bg-absa-passion border border-absa-passion shadow-sm p-4 relative group hover:bg-[#b3002d] transition cursor-pointer flex flex-col justify-between">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 border border-white/20 bg-white/10 text-white"><BarChart2 :size="18"/></div>
                <span class="text-[9px] text-white font-mono font-bold uppercase tracking-widest opacity-80">Analytics</span>
              </div>
              <div>
                <h5 class="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest mb-1">CRM_Analytics</h5>
                <p class="text-lg font-black text-white tracking-tight">View Dashboard</p>
              </div>
            </div>
          </div>

          <!-- Row 2 KPIs -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Activity :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">+120 Today</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Interactions</h5>
              <p class="text-2xl font-black tracking-tight text-gray-900">{{ kpis.totalInteractions }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Users :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">24 Act.</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Active Agents</h5>
              <p class="text-2xl font-black tracking-tight text-gray-900">{{ kpis.activeAgents }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Briefcase :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">12 Open</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Escalations</h5>
              <p class="text-2xl font-black tracking-tight text-gray-900">{{ kpis.escalations }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><CheckCircle :size="18"/></div>
                <span class="text-xs text-gray-400 font-medium">76% FCR</span>
              </div>
              <h5 class="text-xs font-medium text-gray-500 mb-1">Avg Handle Time</h5>
              <p class="text-2xl font-black tracking-tight text-gray-900">{{ kpis.avgHandleTime }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Access Links Section -->
        <div class="pt-6">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <!-- Card 1 -->
            <router-link to="/dashboard/crm/workspace" class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <PhoneCall :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Agent Workspace</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Voice &diams; Chat &diams; Email &diams; SMS
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
                Open &rarr;
              </span>
            </router-link>

            <!-- Card 2 -->
            <router-link to="/dashboard/customers" class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <CustomersIcon :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Customers</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Manage &diams; Filter &diams; View &diams; Profiles
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
                Open &rarr;
              </span>
            </router-link>

            <!-- Card 3 -->
            <div class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <Layers :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Tickets & Cases</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Open &diams; Resolved &diams; Escalations
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
                Open &rarr;
              </span>
            </div>

            <!-- Card 4 -->
            <div class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <PieChart :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Analytics</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Reports &diams; Trends &diams; Forecasts
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
                Open &rarr;
              </span>
            </div>

            <!-- Card 5 -->
            <router-link to="/dashboard/crm/forms" class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <FileText :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Calendar & Activities</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Events &diams; Tasks &diams; Follow-ups
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
                Open &rarr;
              </span>
            </router-link>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

