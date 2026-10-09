<script setup>
import { ref } from 'vue'
import {
  BarChart2, Activity, Users, Clock, AlertTriangle, 
  ArrowLeft, Search, Filter, Download
} from 'lucide-vue-next'
import { Bar, Doughnut } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement 
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const asaData = {
  labels: ['< 5s', '5-10s', '10-15s', '15-20s', '20-30s', '> 30s'],
  datasets: [{
    label: 'Call Volume',
    backgroundColor: '#DC0037',
    data: [450, 320, 210, 110, 50, 12]
  }]
}

const channelData = {
  labels: ['Voice (Complaints)', 'Voice (Enquiries)', 'WhatsApp', 'Facebook', 'Email'],
  datasets: [{
    label: 'Volume',
    backgroundColor: ['#DC0037', '#e84c6c', '#25D366', '#1877F2', '#EAB308'],
    data: [350, 600, 200, 80, 120]
  }]
}

const resolutionData = {
  labels: ['Resolved (FCR)', 'Resolved (Follow-up)', 'Pending', 'Escalated'],
  datasets: [{
    backgroundColor: ['#22c55e', '#84cc16', '#eab308', '#DC0037'],
    data: [65, 20, 10, 5]
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { borderDash: [2, 4] } }
  }
}
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { family: 'monospace', size: 10 } } }
  }
}

// Mock Table Data for Abandonment Contributions
const agentAbandonment = ref([
  { id: 'QA-01', name: 'John Doe', queue: 'Retail Voice', callsOffered: 145, abandoned: 12, rate: '8.2%' },
  { id: 'QA-02', name: 'Mary Banda', queue: 'SME Voice', callsOffered: 120, abandoned: 15, rate: '12.5%' },
  { id: 'QA-03', name: 'System (IVR)', queue: 'Main Menu', callsOffered: 800, abandoned: 45, rate: '5.6%' },
])

</script>

<template>
  <div class="h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto">
    
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-sm shrink-0">
      <div class="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <router-link to="/dashboard/crm" class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1"><ArrowLeft :size="14"/> Back</router-link>
          <div class="w-2 h-8 bg-absa-passion rounded-none ml-2"></div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Team Leader</span>
              <span class="text-[10px] font-mono font-bold text-gray-300">//</span>
              <span class="text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest">Analytics</span>
            </div>
            <h1 class="text-xl font-black font-display text-gray-900 uppercase tracking-tight">Workforce & QA Dashboard</h1>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button class="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2"><Filter :size="12"/> Filter</button>
          <button class="px-3 py-1.5 bg-absa-passion text-white text-[9px] font-mono font-bold uppercase rounded-none hover:bg-[#b3002d] transition flex items-center gap-2"><Download :size="12"/> Export Report</button>
        </div>
      </div>
    </header>

    <div class="flex-1 w-full relative z-10 blur-scoped pb-20">
      <div class="px-4 sm:px-6 py-6 space-y-6 w-full">
        
        <!-- Top KPI Bar for Manager -->
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white border border-gray-200 p-4 flex flex-col justify-between">
             <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Current SLA (Target 85%)</span>
             <div class="text-2xl font-black font-display text-gray-900 mt-2">82.4%</div>
          </div>
          <div class="bg-white border border-gray-200 p-4 flex flex-col justify-between">
             <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Avg Speed of Answer</span>
             <div class="text-2xl font-black font-display text-gray-900 mt-2">18 <span class="text-xs text-gray-500">sec</span></div>
          </div>
          <div class="bg-white border border-gray-200 p-4 flex flex-col justify-between">
             <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Global Abandon Rate</span>
             <div class="text-2xl font-black font-display text-gray-900 mt-2">12.5%</div>
          </div>
          <div class="bg-white border border-gray-200 p-4 flex flex-col justify-between">
             <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">First Contact Resolution</span>
             <div class="text-2xl font-black font-display text-gray-900 mt-2">76.0%</div>
          </div>
        </div>

        <!-- Charts Row 1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white border border-gray-200 p-4">
            <h3 class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">ASA Distribution Bands</h3>
            <div class="h-64">
              <Bar :data="asaData" :options="chartOptions" />
            </div>
          </div>
          <div class="bg-white border border-gray-200 p-4">
            <h3 class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Case Resolution vs Pending</h3>
            <div class="h-64">
              <Doughnut :data="resolutionData" :options="doughnutOptions" />
            </div>
          </div>
        </div>

        <!-- Charts Row 2 & Table -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white border border-gray-200 p-4 col-span-1">
            <h3 class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Queue Volumes by Channel</h3>
            <div class="h-64">
              <Bar :data="channelData" :options="chartOptions" />
            </div>
          </div>

          <div class="bg-white border border-gray-200 p-4 col-span-2 flex flex-col">
            <h3 class="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4 flex items-center justify-between">
              <span>Abandonment Contributions (QA Root Cause)</span>
              <span class="text-absa-passion">FR-R-002 Focus</span>
            </h3>
            <div class="flex-1 overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-gray-50 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest border-y border-gray-200">
                    <th class="p-3">Agent / Queue ID</th>
                    <th class="p-3">Name</th>
                    <th class="p-3">Assigned Queue</th>
                    <th class="p-3 text-right">Calls Offered</th>
                    <th class="p-3 text-right">Abandoned</th>
                    <th class="p-3 text-right">Abandon Rate</th>
                  </tr>
                </thead>
                <tbody class="text-xs font-mono">
                  <tr v-for="agent in agentAbandonment" :key="agent.id" class="border-b border-gray-100 hover:bg-gray-50">
                    <td class="p-3 text-gray-500 font-bold">{{ agent.id }}</td>
                    <td class="p-3 text-gray-900">{{ agent.name }}</td>
                    <td class="p-3 text-gray-500">{{ agent.queue }}</td>
                    <td class="p-3 text-right text-gray-900">{{ agent.callsOffered }}</td>
                    <td class="p-3 text-right text-absa-passion font-bold">{{ agent.abandoned }}</td>
                    <td class="p-3 text-right text-orange-500 font-bold">{{ agent.rate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
