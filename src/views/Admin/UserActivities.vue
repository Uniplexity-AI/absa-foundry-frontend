<template>
  <div class="min-h-screen flex flex-col font-sans relative text-gray-900">
    <!-- Mesh Background -->
    <div class="fixed inset-0 z-0 pointer-events-none mesh-background"></div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-[#2F2E8B] rounded-sm"></div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">SYS_ADMIN // ANALYTICS</span>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight">User Activity Tracking</h1>
          </div>
        </div>
        
        <div class="flex items-center gap-3 font-mono">
          <!-- Period Filter -->
          <div class="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-sm p-0.5">
            <button v-for="p in periods" :key="p.value" @click="setPeriod(p.value)"
              class="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors rounded-sm"
              :class="period === p.value ? 'bg-[#2F2E8B] text-white' : 'text-gray-500 hover:text-gray-800'">
              {{ p.label }}
            </button>
          </div>
          <div class="bg-green-50 text-green-700 px-3 py-1 border border-green-100 text-[10px] font-bold rounded-sm uppercase flex items-center gap-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {{ onlineUsers.length }} Users Online
          </div>
          <button @click="fetchData" :disabled="loading" class="bg-white border border-gray-300 hover:border-[#2F2E8B] text-gray-600 px-4 py-2 rounded-sm text-xs font-bold uppercase transition-all flex items-center gap-2">
            <i class="fas fa-sync" :class="{'animate-spin': loading}"></i> Refresh
          </button>
          <button @click="toggleReport"
            class="px-4 py-2 rounded-sm text-xs font-bold uppercase transition-all flex items-center gap-2 border"
            :class="showReport
              ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
              : 'bg-white border-gray-300 hover:border-[#2F2E8B] text-gray-600'">
            <i class="fas fa-exclamation-triangle"></i>
            Reports & Alerts
            <span v-if="alertsSummary.critical > 0"
              class="w-5 h-5 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full animate-pulse">
              {{ alertsSummary.critical > 9 ? '9+' : alertsSummary.critical }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10">
      
      <!-- Top Level Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 border border-gray-200 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B] transition-all cursor-pointer rounded-sm">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
          <div class="relative z-10">
            <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Active_Tenants_{{ periodLabel }}</h3>
            <p class="text-3xl font-black text-[#2F2E8B] tracking-tighter">{{ tenantStats.length }}</p>
          </div>
          <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="fas fa-building text-5xl"></i>
          </div>
        </div>

        <div class="bg-white p-6 border border-gray-200 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B] transition-all cursor-pointer rounded-sm">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
          <div class="relative z-10">
            <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Total_Pings_{{ periodLabel }}</h3>
            <p class="text-3xl font-black text-[#2F2E8B] tracking-tighter">{{ totalPings }}</p>
          </div>
          <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="fas fa-heartbeat text-5xl"></i>
          </div>
        </div>

        <div class="bg-white p-6 border border-gray-200 shadow-sm relative overflow-hidden group hover:border-[#2F2E8B] transition-all cursor-pointer rounded-sm">
          <div class="absolute inset-0 dotted-pattern pointer-events-none opacity-30"></div>
          <div class="relative z-10">
            <h3 class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">Avg_Activity_Session</h3>
            <p class="text-3xl font-black text-[#2F2E8B] tracking-tighter">~42m</p>
          </div>
          <div class="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="fas fa-stopwatch text-5xl"></i>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Sidebar: Tenant List -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden h-fit">
            <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
              <h4 class="text-xs font-black text-gray-900 uppercase">Tenants Activity</h4>
              <span class="text-[9px] font-mono font-bold text-[#2F2E8B]">REAL-TIME</span>
            </div>
            <div class="max-h-[600px] overflow-y-auto">
              <div v-if="loading && !tenantStats.length" class="p-8 text-center text-gray-400 font-mono text-xs">
                LOADING_TENANT_DATA...
              </div>
              <div 
                v-for="tenant in tenantStats" 
                :key="tenant.tenant_id"
                @click="selectTenant(tenant.tenant_id)"
                class="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between group"
                :class="{'bg-blue-50 border-l-4 border-l-[#2F2E8B]': selectedTenantId === tenant.tenant_id}"
              >
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h5 class="text-xs font-bold text-gray-800 uppercase tracking-tight group-hover:text-[#2F2E8B] transition-colors truncate">
                      {{ tenant.company_name || tenant.tenant_id }}
                    </h5>
                  </div>
                  <div v-if="tenant.company_name" class="text-[9px] font-mono text-gray-400 truncate mt-0.5">{{ tenant.tenant_id }}</div>
                  <div class="flex items-center gap-2 mt-1 flex-wrap">
                    <span class="text-[9px] font-mono text-gray-400">{{ tenant.user_count }} Active Users</span>
                    <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span class="text-[9px] font-mono text-gray-400">{{ tenant.total_pings }} Interactions</span>
                    <template v-if="tenant.industry">
                      <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span class="text-[9px] font-mono text-[#2F2E8B] font-bold uppercase">{{ tenant.industry }}</span>
                    </template>
                  </div>
                  <div v-if="tenant.email || tenant.city" class="flex items-center gap-2 mt-1 flex-wrap">
                    <span v-if="tenant.email" class="text-[9px] font-mono text-gray-400 truncate"><i class="fas fa-envelope text-[7px] mr-1"></i>{{ tenant.email }}</span>
                    <template v-if="tenant.city">
                      <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span class="text-[9px] font-mono text-gray-400"><i class="fas fa-map-marker-alt text-[7px] mr-1"></i>{{ tenant.city }}<span v-if="tenant.country">, {{ tenant.country }}</span></span>
                    </template>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                   <div class="text-[8px] font-mono text-gray-400 uppercase">Last Seen</div>
                   <div class="text-[9px] font-mono font-bold text-gray-600">{{ formatRelativeTime(tenant.last_activity) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recently Online -->
          <div class="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
            <div class="p-4 border-b border-gray-200 bg-gray-50/50">
              <h4 class="text-xs font-black text-gray-900 uppercase">Online Users</h4>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="user in onlineUsers" :key="user.user_id + user.tenant_id" class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gray-100 flex items-center justify-center text-[10px] font-black text-[#2F2E8B] rounded-sm uppercase">
                  {{ user.user_id.substring(0, 2) }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h5 class="text-[10px] font-bold text-gray-800 truncate uppercase">{{ user.user_id }}</h5>
                    <span class="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <p class="text-[9px] font-mono text-gray-400 truncate">
                    {{ user.tenant_id }} // <span class="text-[#2F2E8B] font-bold uppercase">{{ user.module }}</span>
                  </p>
                </div>
              </div>
              <div v-if="!onlineUsers.length" class="text-center py-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                NO_USERS_ACTIVE
              </div>
            </div>
          </div>

          <!-- Most Active Users -->
          <div class="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
            <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
              <h4 class="text-xs font-black text-gray-900 uppercase">Most Active Users</h4>
              <span class="text-[9px] font-mono font-bold text-[#2F2E8B] uppercase">{{ periodLabel }}</span>
            </div>
            <div class="max-h-[400px] overflow-y-auto">
              <div v-for="(user, idx) in mostActiveUsers" :key="user.user_id + user.tenant_id" class="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center gap-3">
                <div class="w-7 h-7 flex items-center justify-center text-[10px] font-black rounded-sm shrink-0"
                  :class="idx < 3 ? 'bg-[#2F2E8B] text-white' : 'bg-gray-100 text-gray-500'">
                  {{ idx + 1 }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <h5 class="text-[10px] font-bold text-gray-800 truncate uppercase">{{ user.user_id }}</h5>
                  </div>
                  <p class="text-[9px] font-mono text-gray-400 truncate">
                    {{ user.tenant_id }} // <span class="text-[#2F2E8B] font-bold uppercase">{{ user.top_module }}</span>
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <div class="text-xs font-black text-[#2F2E8B]">{{ user.total_pings }}</div>
                  <div class="text-[8px] font-mono text-gray-400 uppercase">pings</div>
                </div>
              </div>
              <div v-if="!mostActiveUsers.length && !loading" class="text-center py-6 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                NO_DATA_FOR_PERIOD
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content: Detailed Analytics -->
        <div class="lg:col-span-8">
          <div v-if="selectedTenantId" class="space-y-6">
            <!-- Selected Tenant Header -->
            <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm flex items-center justify-between">
              <div>
                <h2 class="text-lg font-black text-gray-900 uppercase tracking-tight">{{ selectedTenantCompany?.company_name || selectedTenantId }}</h2>
                <div v-if="selectedTenantCompany?.company_name" class="text-[10px] font-mono text-gray-400 uppercase mt-0.5">{{ selectedTenantId }}</div>
                <div class="flex items-center gap-4 mt-2 flex-wrap">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-calendar-alt text-gray-400 text-xs"></i>
                    <span class="text-[10px] font-mono font-bold text-gray-600 uppercase">Last {{ days }} Days</span>
                  </div>
                  <div v-if="selectedTenantCompany?.email" class="flex items-center gap-2">
                    <i class="fas fa-envelope text-gray-400 text-xs"></i>
                    <span class="text-[10px] font-mono text-gray-500">{{ selectedTenantCompany.email }}</span>
                  </div>
                  <div v-if="selectedTenantCompany?.phone" class="flex items-center gap-2">
                    <i class="fas fa-phone text-gray-400 text-xs"></i>
                    <span class="text-[10px] font-mono text-gray-500">{{ selectedTenantCompany.phone }}</span>
                  </div>
                  <div v-if="selectedTenantCompany?.city" class="flex items-center gap-2">
                    <i class="fas fa-map-marker-alt text-gray-400 text-xs"></i>
                    <span class="text-[10px] font-mono text-gray-500">{{ selectedTenantCompany.city }}<span v-if="selectedTenantCompany.country">, {{ selectedTenantCompany.country }}</span></span>
                  </div>
                  <div v-if="selectedTenantCompany?.industry" class="flex items-center gap-2">
                    <i class="fas fa-industry text-[#2F2E8B] text-xs"></i>
                    <span class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase">{{ selectedTenantCompany.industry }}</span>
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <button @click="days = 7; fetchTenantDetail()" class="px-3 py-1 text-[9px] font-mono font-bold border rounded-sm uppercase tracking-wider transition-colors" :class="days === 7 ? 'bg-[#2F2E8B] text-white' : 'bg-white text-gray-600'">7_Days</button>
                <button @click="days = 30; fetchTenantDetail()" class="px-3 py-1 text-[9px] font-mono font-bold border rounded-sm uppercase tracking-wider transition-colors" :class="days === 30 ? 'bg-[#2F2E8B] text-white' : 'bg-white text-gray-600'">30_Days</button>
              </div>
            </div>

            <!-- Charts Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm h-[350px] flex flex-col">
                <h5 class="text-xs font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                  <i class="fas fa-chart-bar text-[#2F2E8B]"></i> Activity Volume
                </h5>
                <div class="flex-1 min-h-0 relative">
                  <Bar v-if="chartDataHistory" :data="chartDataHistory" :options="chartOptions" />
                  <div v-else-if="detailLoading" class="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-400">LOADING_CHART...</div>
                </div>
              </div>

              <div class="bg-white p-6 border border-gray-200 shadow-sm rounded-sm h-[350px] flex flex-col">
                <h5 class="text-xs font-black text-gray-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                  <i class="fas fa-pie-chart text-[#2F2E8B]"></i> Module Usage
                </h5>
                <div class="flex-1 min-h-0 relative">
                  <Doughnut v-if="chartDataModules" :data="chartDataModules" :options="chartOptionsPie" />
                  <div v-else-if="detailLoading" class="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-gray-400">LOADING_CHART...</div>
                </div>
              </div>
            </div>

            <!-- Detailed Table (Recent Pings) -->
            <div class="bg-white border border-gray-200 shadow-sm rounded-sm">
              <div class="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                <h4 class="text-xs font-black text-gray-900 uppercase">Recent Interactions</h4>
                <div class="flex items-center gap-4">
                  <div class="text-[9px] font-mono text-gray-400 uppercase">Total Hits: {{ tenantDetail.history?.reduce((acc, curr) => acc + curr.activity_count, 0) || 0 }}</div>
                </div>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-center">Date</th>
                      <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-center">Unq_Users</th>
                      <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">Activity_Level</th>
                      <th class="px-6 py-3 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest text-right">Trend</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="day in tenantDetail.history?.slice().reverse()" :key="day.date" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 text-xs font-mono font-bold text-center">{{ day.date }}</td>
                      <td class="px-6 py-4 text-center">
                        <span class="px-2 py-0.5 bg-blue-50 text-[#2F2E8B] text-[10px] font-bold rounded-sm border border-blue-100">{{ day.user_count }}</span>
                      </td>
                      <td class="px-6 py-4">
                        <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div class="bg-[#2F2E8B] h-full" :style="{ width: Math.min((day.activity_count / 1000) * 100, 100) + '%' }"></div>
                        </div>
                        <span class="text-[9px] font-mono text-gray-500 mt-1 block">{{ day.activity_count }} events recorded</span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <i class="fas fa-arrow-up text-green-500 text-[10px]" v-if="day.activity_count > 500"></i>
                        <i class="fas fa-arrow-right text-gray-400 text-[10px]" v-else></i>
                      </td>
                    </tr>
                    <tr v-if="!tenantDetail.history?.length">
                       <td colspan="4" class="px-6 py-12 text-center text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                          NO_HISTORICAL_DATA_FOUND
                       </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- ── Reports & Alerts Section ── -->
      <div v-if="showReport" class="animate-fade-in">
        
        <!-- Report Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-white dot-pattern p-5 border border-gray-200 shadow-sm rounded-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="p-1.5 text-[#2F2E8B]"><i class="fas fa-building text-base"></i></div>
            </div>
            <h3 class="text-xl font-black text-gray-900 tracking-tight mb-0.5">{{ reportData?.summary?.total_tenants || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Total Tenants</p>
          </div>

          <div class="bg-white dot-pattern p-5 border border-red-200 shadow-sm rounded-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="p-1.5 text-red-500"><i class="fas fa-exclamation-circle text-base"></i></div>
              <span class="text-[9px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-sm uppercase border border-red-100 animate-pulse">Attention!</span>
            </div>
            <h3 class="text-xl font-black text-red-600 tracking-tight mb-0.5">{{ reportData?.summary?.critical_alerts || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Critical (Inactive 7d+)</p>
          </div>

          <div class="bg-white dot-pattern p-5 border border-yellow-200 shadow-sm rounded-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="p-1.5 text-yellow-500"><i class="fas fa-exclamation-triangle text-base"></i></div>
            </div>
            <h3 class="text-xl font-black text-yellow-600 tracking-tight mb-0.5">{{ reportData?.summary?.warning_alerts || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Low Activity Warning</p>
          </div>

          <div class="bg-white dot-pattern p-5 border border-green-200 shadow-sm rounded-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="p-1.5 text-green-500"><i class="fas fa-check-circle text-base"></i></div>
            </div>
            <h3 class="text-xl font-black text-green-600 tracking-tight mb-0.5">{{ reportData?.summary?.healthy_tenants || 0 }}</h3>
            <p class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Healthy Tenants</p>
          </div>
        </div>

        <!-- Critical Alerts List -->
        <div v-if="reportData?.alerts?.critical?.length" class="mb-6">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-1.5 h-6 bg-red-500 rounded-sm"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">Critical — Inactive Tenants</h3>
            <span class="text-[10px] font-mono font-bold text-red-500">({{ reportData.alerts.critical.length }})</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="item in reportData.alerts.critical" :key="item.tenant_id"
              class="bg-red-50 border border-red-200 rounded-sm p-4 flex items-start gap-3 hover:shadow-sm transition-shadow cursor-pointer"
              @click="selectTenant(item.tenant_id); showReport = false">
              <div class="w-8 h-8 bg-red-100 rounded-sm flex items-center justify-center shrink-0">
                <i class="fas fa-user-slash text-red-500 text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-xs font-black text-red-800 uppercase truncate">{{ item.name }}</h4>
                <p class="text-[9px] font-mono text-red-600 truncate">{{ item.tenant_id }}</p>
                <p class="text-[10px] font-mono text-red-700 mt-1">
                  <i class="fas fa-clock mr-1"></i>{{ item.alert_reason }}
                </p>
                <p v-if="item.email" class="text-[9px] font-mono text-red-500 mt-1">
                  <i class="fas fa-envelope mr-1"></i>{{ item.email }}
                </p>
              </div>
              <i class="fas fa-chevron-right text-red-300 text-xs mt-1"></i>
            </div>
          </div>
        </div>

        <!-- Warning Alerts List -->
        <div v-if="reportData?.alerts?.warning?.length" class="mb-6">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-1.5 h-6 bg-yellow-400 rounded-sm"></div>
            <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">Warning — Low Activity</h3>
            <span class="text-[10px] font-mono font-bold text-yellow-600">({{ reportData.alerts.warning.length }})</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="item in reportData.alerts.warning" :key="item.tenant_id"
              class="bg-yellow-50 border border-yellow-200 rounded-sm p-4 flex items-start gap-3 hover:shadow-sm transition-shadow cursor-pointer"
              @click="selectTenant(item.tenant_id); showReport = false">
              <div class="w-8 h-8 bg-yellow-100 rounded-sm flex items-center justify-center shrink-0">
                <i class="fas fa-battery-quarter text-yellow-600 text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-xs font-black text-yellow-800 uppercase truncate">{{ item.name }}</h4>
                <p class="text-[9px] font-mono text-yellow-600 truncate">{{ item.tenant_id }}</p>
                <p class="text-[10px] font-mono text-yellow-700 mt-1">
                  <i class="fas fa-info-circle mr-1"></i>{{ item.alert_reason }}
                </p>
                <p v-if="item.email" class="text-[9px] font-mono text-yellow-600 mt-1">
                  <i class="fas fa-envelope mr-1"></i>{{ item.email }}
                </p>
              </div>
              <i class="fas fa-chevron-right text-yellow-300 text-xs mt-1"></i>
            </div>
          </div>
        </div>

        <!-- Full Report Table -->
        <div class="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-5 bg-[#2F2E8B]"></div>
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">Full Activity Report</h3>
              <span class="text-[10px] font-mono font-bold text-gray-400">({{ reportData?.report?.length || 0 }} tenants)</span>
            </div>
            <div class="flex items-center gap-2">
              <!-- Export Buttons -->
              <div class="flex items-center gap-1 mr-2">
                <button @click="exportExcel" title="Export to Excel"
                  class="px-2 py-1 text-[9px] font-mono font-bold text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 rounded-sm uppercase transition-colors flex items-center gap-1">
                  <i class="fas fa-file-excel text-[10px]"></i> XLSX
                </button>
                <button @click="exportPDF" title="Export to PDF"
                  class="px-2 py-1 text-[9px] font-mono font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-sm uppercase transition-colors flex items-center gap-1">
                  <i class="fas fa-file-pdf text-[10px]"></i> PDF
                </button>
                <button @click="exportDOCX" title="Export to Word"
                  class="px-2 py-1 text-[9px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-sm uppercase transition-colors flex items-center gap-1">
                  <i class="fas fa-file-word text-[10px]"></i> DOCX
                </button>
              </div>
              <button @click="fetchReport" :disabled="reportLoading"
                class="text-[10px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase flex items-center gap-1">
                <i class="fas fa-sync-alt" :class="{'animate-spin': reportLoading}"></i> Refresh
              </button>
            </div>
          </div>

          <div v-if="reportLoading" class="p-10 text-center">
            <i class="fas fa-spinner animate-spin text-gray-300 text-xl mb-2"></i>
            <p class="text-[10px] font-mono text-gray-400 uppercase">Generating report...</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left text-xs font-mono">
              <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Tenant</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Pings (7d)</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Pings (30d)</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Avg/Day</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Users</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Modules</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Last Seen</th>
                  <th class="px-4 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Online</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="r in reportData?.report" :key="r.tenant_id"
                  class="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  @click="selectTenant(r.tenant_id); showReport = false">
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase rounded-sm"
                      :class="alertBadgeClass(r.alert_level)">
                      <span class="w-1.5 h-1.5 rounded-full" :class="alertDotClass(r.alert_level)"></span>
                      {{ r.alert_level }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="font-bold text-gray-900 uppercase truncate max-w-[160px]">{{ r.name }}</div>
                    <code class="text-[9px] bg-gray-100 px-1 py-0.5 rounded-sm text-gray-500">{{ r.tenant_id }}</code>
                  </td>
                  <td class="px-4 py-3 text-right font-bold" :class="r.total_pings_7d < 10 ? 'text-red-500' : 'text-gray-800'">
                    {{ r.total_pings_7d }}
                  </td>
                  <td class="px-4 py-3 text-right text-gray-600">{{ r.total_pings_30d }}</td>
                  <td class="px-4 py-3 text-right text-gray-600">{{ r.avg_daily_pings_7d }}</td>
                  <td class="px-4 py-3 text-right">
                    <span class="px-1.5 py-0.5 bg-blue-50 text-[#2F2E8B] text-[9px] font-bold rounded-sm">{{ r.active_users_7d }}</span>
                  </td>
                  <td class="px-4 py-3 text-right text-gray-600">{{ r.modules_used }}</td>
                  <td class="px-4 py-3 text-gray-500 text-[10px]">
                    <span :class="r.days_since_activity >= 7 ? 'text-red-500 font-bold' : ''">
                      {{ formatRelativeTime(r.last_activity) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span v-if="r.online_now > 0" class="text-green-500"><i class="fas fa-circle text-[6px]"></i></span>
                    <span v-else class="text-gray-300"><i class="fas fa-circle text-[6px]"></i></span>
                  </td>
                </tr>
                <tr v-if="!reportData?.report?.length">
                  <td colspan="9" class="px-4 py-10 text-center text-gray-400 font-mono text-xs">No report data available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Report Legend -->
        <div class="mt-4 flex items-center gap-6 text-[9px] font-mono text-gray-400 uppercase">
          <span>Report generated {{ formatRelativeTime(reportData?.summary?.generated_at) }}</span>
          <span class="w-px h-3 bg-gray-200"></span>
          <span><span class="w-2 h-2 rounded-full bg-red-500 inline-block mr-1"></span> Critical: No activity 7d+</span>
          <span><span class="w-2 h-2 rounded-full bg-yellow-400 inline-block mr-1"></span> Warning: Below &lt;10 pings/7d</span>
          <span><span class="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></span> Healthy: Normal activity</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!selectedTenantId" class="h-[600px] bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col items-center justify-center space-y-4">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <i class="fas fa-mouse-pointer text-gray-300 text-3xl"></i>
            </div>
            <div class="text-center">
              <h3 class="text-sm font-black text-gray-900 uppercase tracking-widest">Select a Tenant</h3>
              <p class="text-[10px] font-mono text-gray-400 uppercase mt-1">Select a tenant from the left sidebar to view detailed activity logs and engagement metrics.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import API_BASE_URL from '@/api_services/api';
import { Bar, Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import { saveAs } from 'file-saver';
import { XLSXCompat as XLSX } from '@/utils/excel.js';
import jsPDF from 'jspdf';
import { Document, Packer, Table, TableRow, TableCell, TextRun, Paragraph, AlignmentType, BorderStyle, WidthType, HeadingLevel } from 'docx';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const loading = ref(false);
const detailLoading = ref(false);
const tenantStats = ref([]);
const onlineUsers = ref([]);
const mostActiveUsers = ref([]);
const selectedTenantId = ref(null);
const tenantDetail = ref({ history: [], modules: [] });
const days = ref(7);
const period = ref('daily');

const periods = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }
];

const periodLabel = computed(() => {
  const map = { daily: '24H', weekly: '7D', monthly: '30D' };
  return map[period.value] || '24H';
});

const totalPings = computed(() => {
  return tenantStats.value.reduce((acc, curr) => acc + curr.total_pings, 0);
});

const selectedTenantCompany = computed(() => {
  if (!selectedTenantId.value) return null;
  return tenantStats.value.find(t => t.tenant_id === selectedTenantId.value) || null;
});

// ── Reports & Alerts ────────────────────────────────────────────────────────
const showReport = ref(false);
const reportData = ref(null);
const reportLoading = ref(false);
const reportError = ref(null);

const alertsSummary = computed(() => ({
  total: reportData.value?.summary?.total_tenants || 0,
  critical: reportData.value?.summary?.critical_alerts || 0,
  warning: reportData.value?.summary?.warning_alerts || 0,
  healthy: reportData.value?.summary?.healthy_tenants || 0,
}));

function toggleReport() {
  showReport.value = !showReport.value;
  if (showReport.value && !reportData.value) {
    fetchReport();
  }
}

async function fetchReport() {
  reportLoading.value = true;
  reportError.value = null;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/activity/admin/activity-report`, {
      params: { min_pings_threshold: 10, inactivity_days: 7 },
      headers: { Authorization: `Bearer ${token}` }
    });
    reportData.value = response.data;
  } catch (error) {
    console.error('Failed to fetch activity report:', error);
    reportError.value = error.message || 'Failed to load report';
  } finally {
    reportLoading.value = false;
  }
}

// ── Export Functions ──────────────────────────────────────────────────────────
function getExportData() {
  if (!reportData.value?.report) return [];
  return reportData.value.report.map(r => ({
    'Status': r.alert_level.toUpperCase(),
    'Tenant Name': r.name,
    'Tenant ID': r.tenant_id,
    'Email': r.email || '—',
    'Pings (7d)': r.total_pings_7d,
    'Pings (30d)': r.total_pings_30d,
    'Avg/Day (7d)': r.avg_daily_pings_7d,
    'Active Users (7d)': r.active_users_7d,
    'Active Users (30d)': r.active_users_30d,
    'Modules Used': r.modules_used,
    'Days Since Activity': r.days_since_activity,
    'Online Now': r.online_now > 0 ? 'Yes' : 'No',
    'Alert': r.alert_reason || '—',
  }));
}

function exportExcel() {
  const data = getExportData();
  if (!data.length) return;

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Style header row
  const headerRange = XLSX.utils.decode_range(ws['!ref']);
  for (let C = headerRange.s.c; C <= headerRange.e.c; C++) {
    const addr = XLSX.utils.encode_cell({ r: 0, c: C });
    if (ws[addr]) ws[addr].s = { font: { bold: true, color: { rgb: 'FFFFFF' } }, fill: { fgColor: { rgb: '2F2E8B' } } };
  }
  ws['!cols'] = [
    { wch: 10 }, { wch: 28 }, { wch: 14 }, { wch: 28 },
    { wch: 10 }, { wch: 10 }, { wch: 12 }, { wch: 12 },
    { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 8 }, { wch: 40 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Activity Report');
  XLSX.write(wb, { bookType: 'xlsx', type: 'array' }).then(buf => {
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), `Activity_Report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  });
}

function exportPDF() {
  const data = reportData.value?.report;
  if (!data?.length) return;

  const doc = new jsPDF('landscape', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  let y = 15;

  // Title
  doc.setFontSize(16);
  doc.text('Tenant Activity Report', pageW / 2, y, { align: 'center' });
  y += 7;
  doc.setFontSize(8);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageW / 2, y, { align: 'center' });
  y += 7;

  // Summary
  const s = reportData.value.summary;
  doc.setFontSize(9);
  doc.text(`Total: ${s.total_tenants}  |  Critical: ${s.critical_alerts}  |  Warning: ${s.warning_alerts}  |  Healthy: ${s.healthy_tenants}`, pageW / 2, y, { align: 'center' });
  y += 8;

  // Column widths (landscape A4 = 297mm)
  const cols = [14, 50, 28, 14, 14, 12, 12, 10, 10, 10, 60];
  const headers = ['Status', 'Tenant', 'ID', 'Pings 7d', 'Pings 30d', 'Avg/D', 'Users', 'Mod', 'Idle D', 'Online', 'Alert'];
  const totalW = cols.reduce((a, b) => a + b, 0);
  const startX = (pageW - totalW) / 2;

  function drawRow(cells, isHeader, fillColor) {
    let x = startX;
    const rowH = isHeader ? 7 : 5.5;

    // Background
    if (fillColor) {
      doc.setFillColor(...fillColor);
      doc.rect(x, y, totalW, rowH, 'F');
    }

    // Grid lines
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    let lx = x;
    for (let i = 0; i <= cols.length; i++) {
      doc.line(lx, y, lx, y + rowH);
      if (i < cols.length) lx += cols[i];
    }
    doc.line(x, y, x + totalW, y);
    doc.line(x, y + rowH, x + totalW, y + rowH);

    // Text
    doc.setFontSize(isHeader ? 7 : 6);
    cells.forEach((text, i) => {
      const cx = x + (i > 0 ? cols.slice(0, i).reduce((a, b) => a + b, 0) : 0);
      const halign = [0, 1, 2, 10].includes(i) ? 'left' : 'right';
      const px = halign === 'right' ? cx + cols[i] - 2 : cx + 2;
      const str = String(text ?? '');
      // Truncate long strings
      const display = str.length > (i === 10 ? 45 : i === 1 ? 28 : 20) ? str.slice(0, i === 10 ? 45 : i === 1 ? 28 : 20) + '...' : str;
      doc.text(display, px, y + rowH - 1.5, { align: halign });
    });

    y += rowH;
  }

  // Draw header
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFillColor(47, 46, 139);
  drawRow(headers, true, [47, 46, 139]);

  // Draw body rows
  doc.setFont('helvetica', 'normal');
  data.forEach((r, idx) => {
    // Check page break
    if (y > 185) {
      doc.addPage();
      y = 15;
      // Re-draw header on new page
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.setFillColor(47, 46, 139);
      drawRow(headers, true, [47, 46, 139]);
      doc.setFont('helvetica', 'normal');
    }

    const status = (r.alert_level || '').toUpperCase();
    let bg = undefined;
    let textColor = [0, 0, 0];
    if (status === 'CRITICAL') { bg = [254, 226, 226]; textColor = [185, 28, 28]; }
    else if (status === 'WARNING') { bg = [254, 249, 195]; textColor = [161, 98, 7]; }
    else { bg = [220, 252, 231]; textColor = [22, 101, 52]; }

    doc.setTextColor(...textColor);
    const cells = [
      status,
      r.name,
      r.tenant_id,
      r.total_pings_7d,
      r.total_pings_30d,
      r.avg_daily_pings_7d,
      r.active_users_7d,
      r.modules_used,
      r.days_since_activity,
      r.online_now > 0 ? 'Yes' : 'No',
      r.alert_reason || '—',
    ];
    drawRow(cells, false, bg);
    doc.setTextColor(0, 0, 0);
  });

  doc.save(`Activity_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
}

async function exportDOCX() {
  const data = reportData.value?.report;
  if (!data?.length) return;
  const s = reportData.value.summary;

  const rows = data.map(r => new TableRow({
    children: [
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.alert_level.toUpperCase(), bold: true, size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.name, size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.tenant_id, size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.total_pings_7d), size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.total_pings_30d), size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.avg_daily_pings_7d), size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.active_users_7d), size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.modules_used), size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.days_since_activity), size: 16 })] })] }),
      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.online_now > 0 ? 'Yes' : 'No', size: 16 })] })] }),
    ]
  }));

  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ children: [new TextRun({ text: 'Tenant Activity Report', bold: true, size: 28 })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `Generated: ${new Date().toLocaleString()}`, size: 18 })], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
        new Paragraph({ children: [new TextRun({ text: `Total: ${s.total_tenants}  |  Critical: ${s.critical_alerts}  |  Warning: ${s.warning_alerts}  |  Healthy: ${s.healthy_tenants}`, size: 18 })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
        new Table({
          rows: [
            new TableRow({
              children: ['Status', 'Tenant', 'ID', 'Pings 7d', 'Pings 30d', 'Avg/D', 'Users', 'Mod', 'Idle D', 'Online'].map(h =>
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 16 })], alignment: AlignmentType.CENTER })],
                  shading: { fill: '2F2E8B', type: 'clear' },
                })
              )
            }),
            ...rows,
          ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Activity_Report_${new Date().toISOString().slice(0, 10)}.docx`);
}

function alertBadgeClass(level) {
  if (level === 'critical') return 'bg-red-50 text-red-700 border border-red-200';
  if (level === 'warning') return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
  return 'bg-green-50 text-green-700 border border-green-200';
}

function alertDotClass(level) {
  if (level === 'critical') return 'bg-red-500';
  if (level === 'warning') return 'bg-yellow-400';
  return 'bg-green-500';
}

async function fetchData() {
  loading.value = true;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/activity/admin/overview`, {
      params: { period: period.value },
      headers: { Authorization: `Bearer ${token}` }
    });
    tenantStats.value = response.data.tenants_stats || [];
    onlineUsers.value = response.data.online_users || [];
    mostActiveUsers.value = response.data.most_active_users || [];
  } catch (error) {
    console.error('Failed to fetch admin overview:', error);
  } finally {
    loading.value = false;
  }
}

function setPeriod(val) {
  period.value = val;
  fetchData();
}

async function selectTenant(tenantId) {
  selectedTenantId.value = tenantId;
  await fetchTenantDetail();
}

async function fetchTenantDetail() {
  if (!selectedTenantId.value) return;
  detailLoading.value = true;
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/activity/admin/tenant-detail`, {
      params: { tenant_id: selectedTenantId.value, days: days.value },
      headers: { Authorization: `Bearer ${token}` }
    });
    tenantDetail.value = response.data;
  } catch (error) {
    console.error('Failed to fetch tenant detail:', error);
  } finally {
    detailLoading.value = false;
  }
}

// Chart Configurations
const chartDataHistory = computed(() => {
  if (!tenantDetail.value.history?.length) return null;
  return {
    labels: tenantDetail.value.history.map(d => d.date),
    datasets: [
      {
        label: 'Ping Activity',
        backgroundColor: '#2F2E8B',
        data: tenantDetail.value.history.map(d => d.activity_count)
      },
      {
        label: 'Unq Users',
        backgroundColor: '#93C5FD',
        data: tenantDetail.value.history.map(d => d.user_count)
      }
    ]
  };
});

const chartDataModules = computed(() => {
  if (!tenantDetail.value.modules?.length) return null;
  return {
    labels: tenantDetail.value.modules.map(m => m.module.toUpperCase()),
    datasets: [{
      backgroundColor: ['#2F2E8B', '#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'],
      data: tenantDetail.value.modules.map(m => m.count)
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#111827',
      titleFont: { size: 10, family: 'monospace' },
      bodyFont: { size: 10, family: 'monospace' },
      cornerRadius: 0
    }
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#F3F4F6' }, ticks: { font: { size: 9, family: 'monospace' } } },
    x: { grid: { display: false }, ticks: { font: { size: 9, family: 'monospace' } } }
  }
};

const chartOptionsPie = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 9, family: 'monospace' }, boxWidth: 10 } },
    tooltip: { cornerRadius: 0 }
  }
};

function formatRelativeTime(dateStr) {
  if (!dateStr) return 'Offline';
  const date = new Date(dateStr);
  const diff = Math.floor((new Date() - date) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString();
}

onMounted(() => {
  fetchData();
  // Auto refresh every 30s
  const interval = setInterval(fetchData, 30000);
  return () => clearInterval(interval);
});
</script>

<style scoped>
.mesh-background {
  background: radial-gradient(circle at 50% 50%, rgba(47, 46, 139, 0.02) 0%, rgba(255, 255, 255, 0) 50%),
              radial-gradient(circle at 0% 0%, rgba(47, 46, 139, 0.01) 0%, rgba(255, 255, 255, 0) 30%),
              radial-gradient(circle at 100% 100%, rgba(47, 46, 139, 0.01) 0%, rgba(255, 255, 255, 0) 30%);
  background-color: #f9fafb;
}

.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 0.5px, transparent 0.5px);
  background-size: 10px 10px;
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}

.animate-fade-in {
  animation: fadeIn 0.35s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
