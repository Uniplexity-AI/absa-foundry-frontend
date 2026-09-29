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
                <div class="p-2 border border-green-100 bg-green-50 text-green-500"><TrendingUp :size="18"/></div>
                <span class="text-[9px] text-green-600 font-mono font-bold uppercase">Target 80%</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Service_Level</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.serviceLevel }}<span class="text-sm font-normal text-gray-400">%</span></p>
            </div>
            <!-- Card 2 -->
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 border border-blue-100 bg-blue-50 text-blue-500"><Clock :size="18"/></div>
                <span class="text-[9px] text-blue-600 font-mono font-bold uppercase">Avg Time</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Speed_To_Answer</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.avgSpeedAnswer }}<span class="text-sm font-normal text-gray-400 ml-1">sec</span></p>
            </div>
            <!-- Card 3 -->
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="p-2 border border-orange-100 bg-orange-50 text-orange-500"><AlertTriangle :size="18"/></div>
                <span class="text-[9px] text-orange-600 font-mono font-bold uppercase">Critical</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Abandon_Rate</h5>
              <p class="text-2xl font-black text-orange-500 tracking-tight">{{ kpis.abandonmentRate }}<span class="text-sm font-normal text-gray-400">%</span></p>
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
                <span class="text-[9px] text-gray-400 font-mono font-bold uppercase">+120 Today</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Interactions</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.totalInteractions }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Users :size="18"/></div>
                <span class="text-[9px] text-gray-400 font-mono font-bold uppercase">24 Act.</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Active_Agents</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.activeAgents }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><Briefcase :size="18"/></div>
                <span class="text-[9px] text-gray-400 font-mono font-bold uppercase">12 Open</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Escalations</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.escalations }}</p>
            </div>
            <div class="bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer">
              <div class="flex items-center justify-between mb-3">
                <div class="text-gray-400"><CheckCircle :size="18"/></div>
                <span class="text-[9px] text-gray-400 font-mono font-bold uppercase">76% FCR</span>
              </div>
              <h5 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Avg_Handle_Time</h5>
              <p class="text-2xl font-black text-absa-passion tracking-tight">{{ kpis.avgHandleTime }}</p>
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
            <div class="bg-white border border-gray-200 shadow-sm hover:border-absa-passion hover:shadow-md transition flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
              <div class="w-12 h-12 bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#FDE8EC] transition">
                <FileText :size="20" class="text-gray-400 group-hover:text-absa-passion transition"/>
              </div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">Digital Forms</h3>
              <p class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-6">
                Templates &diams; Responses &diams; Sign-Offs
              </p>
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-absa-passion transition">
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
