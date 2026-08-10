<template>
  <div class="global-mesh-bg text-on-background min-h-screen flex flex-col md:flex-row pb-[72px] md:pb-0 dashboard-root">
    <div class="flex-1 flex flex-col min-w-0 w-full">
      <main class="flex-1 p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto w-full">
        <!-- Loading Skeleton -->
        <template v-if="loading">
          <div class="min-h-screen flex flex-col">
            <div class="mb-8">
              <LoadingSkeleton type="stats" />
            </div>
            <div class="mb-8">
              <LoadingSkeleton type="block" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-gutter flex-1">
              <div class="lg:col-span-8">
                <LoadingSkeleton type="block" />
              </div>
              <div class="lg:col-span-4">
                <LoadingSkeleton type="card" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
        <div class="md:hidden mb-6">
          <h2 class="text-headline-lg-mobile font-headline-lg-mobile text-primary mb-1">Branch Manager Dashboard</h2>
          <p class="text-body-md font-body-md text-secondary">{{ branch.rank ? `Ranked ${branch.rank} of ${branch.total} branches` : 'Branch ranking unavailable' }}</p>
        </div>
        
        <div class="hidden md:flex items-center text-body-md text-secondary mb-6 gap-2">
          <span class="">Home</span>
          <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          <span class="font-semibold text-primary">Dashboard</span>
        </div>
        <p class="hidden md:block text-body-md font-body-md text-secondary mb-8">{{ branch.rank ? `Ranked ${branch.rank} of ${branch.total} branches` : 'Branch ranking unavailable' }}</p>
        
        <!-- Key Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-gutter mb-8">
          <!-- Metric 1 -->
          <div class="global-dotted-bg rounded border border-outline-variant p-card-padding flex flex-col justify-between hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-label-caps font-label-caps text-secondary uppercase">Aggregate At Risk %</h3>
              <span class="material-symbols-outlined text-primary">warning</span>
            </div>
            <div>
              <div class="text-metric-lg font-metric-lg text-primary mb-2">{{ kpis.aggregateAtRisk.value != null ? kpis.aggregateAtRisk.value + '%' : '—' }}</div>
              <div class="flex items-center gap-2 text-body-md font-body-md">
                <span class="material-symbols-outlined text-[#FF780F] text-[18px]">arrow_upward</span>
                <span class="text-[#FF780F] font-semibold">{{ kpis.aggregateAtRisk.change }}%</span>
                <span class="text-secondary">vs last month</span>
              </div>
            </div>
            <div class="w-full bg-surface-container-high h-1 mt-4 rounded-full overflow-hidden">
              <div class="bg-[#FF780F] h-full rounded-full" :style="{ width: kpis.aggregateAtRisk.value + '%' }"></div>
            </div>
          </div>
          
          <!-- Metric 2 -->
          <div class="global-dotted-bg rounded border border-outline-variant p-card-padding flex flex-col justify-between hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-label-caps font-label-caps text-secondary uppercase">Dormant Accounts</h3>
              <span class="material-symbols-outlined text-primary">snooze</span>
            </div>
            <div>
              <div class="text-metric-lg font-metric-lg text-on-surface mb-2">{{ kpis.dormantAccounts.value != null ? kpis.dormantAccounts.value : '—' }}</div>
              <div class="flex items-center gap-2 text-body-md font-body-md">
                <span class="material-symbols-outlined text-primary text-[18px]">arrow_downward</span>
                <span class="text-primary font-semibold">{{ kpis.dormantAccounts.change }} cases</span>
                <span class="text-secondary">re-activated</span>
              </div>
            </div>
            <div class="w-full bg-surface-container-high h-1 mt-4 rounded-full overflow-hidden">
              <div class="bg-primary h-full rounded-full" :style="{ width: (kpis.dormantAccounts.value / 10) + '%' }"></div>
            </div>
          </div>
          
          <!-- Metric 3 -->
          <div class="global-dotted-bg rounded border border-outline-variant p-card-padding flex flex-col justify-between hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-label-caps font-label-caps text-secondary uppercase">Monthly Churn Rate</h3>
              <span class="material-symbols-outlined text-primary">trending_down</span>
            </div>
            <div>
              <div class="text-metric-lg font-metric-lg text-on-surface mb-2">{{ kpis.monthlyChurn.value != null ? kpis.monthlyChurn.value + '%' : '—' }}</div>
              <div class="flex items-center gap-2 text-body-md font-body-md">
                <span class="material-symbols-outlined text-primary text-[18px]">arrow_downward</span>
                <span class="text-primary font-semibold">{{ kpis.monthlyChurn.change }}%</span>
                <span class="text-secondary">well within 1.5% target</span>
              </div>
            </div>
            <div class="w-full bg-surface-container-high h-1 mt-4 rounded-full overflow-hidden">
              <div class="bg-primary h-full rounded-full" :style="{ width: (kpis.monthlyChurn.value * 10) + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Bento Grid Layout for Lower Section -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-gutter">
          <!-- Performance Table -->
          <div class="global-dotted-bg lg:col-span-12 xl:col-span-12 rounded border border-outline-variant overflow-hidden flex flex-col mb-4 md:mb-0">
            <div class="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 class="text-headline-md font-headline-md">Relationship Manager Performance</h2>
              <div class="flex gap-2 w-full sm:w-auto">
                <button class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-outline-variant text-body-md font-semibold hover:bg-surface-container-low transition-colors bg-white">
                  <span class="material-symbols-outlined text-[18px]">filter_list</span> Filter
                </button>
                <button class="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-body-md font-semibold hover:bg-primary-container transition-colors bg-white text-primary border border-outline-variant">
                  <span class="material-symbols-outlined text-[18px]">download</span> Export Report
                </button>
              </div>
            </div>
            <div class="overflow-x-auto no-scrollbar">
              <table class="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr class="border-b border-outline-variant bg-white">
                    <th class="p-4 text-label-caps font-label-caps text-on-surface w-[250px]">Relationship Manager</th>
                    <th class="p-4 text-label-caps font-label-caps text-on-surface">Portfolio Size</th>
                    <th class="p-4 text-label-caps font-label-caps text-on-surface">At Risk %</th>
                    <th class="p-4 text-label-caps font-label-caps text-on-surface">Actions Logged (MoM)</th>
                    <th class="p-4 text-label-caps font-label-caps text-on-surface text-right pr-8">Avg Health Score</th>
                    <th class="p-4 text-label-caps font-label-caps text-on-surface text-center">Trend</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant">
                  <tr v-if="relationshipManagers.length === 0">
                    <td colspan="6" class="p-12 text-center text-body-md text-secondary">No relationship manager data available</td>
                  </tr>
                  <tr v-for="rm in relationshipManagers" :key="rm.name" class="hover:bg-surface-container-lowest transition-colors">
                    <td class="p-4 flex items-center gap-3">
                      <div>
                        <p class="font-bold text-body-md text-on-surface">{{ rm.name }}</p>
                        <p class="text-label-sm text-secondary">{{ rm.segment }}</p>
                      </div>
                    </td>
                    <td class="p-4 text-body-md">{{ rm.portfolio }} Accounts</td>
                    <td class="p-4 text-body-md font-bold text-primary flex items-center gap-1">{{ rm.atRiskPct }}% <span class="material-symbols-outlined text-[16px]">{{ rm.trend === 'up' ? 'trending_up' : rm.trend === 'down' ? 'trending_down' : 'remove' }}</span></td>
                    <td class="p-4 text-body-md">{{ rm.actions }} <span class="text-secondary">/ {{ rm.target }} target</span></td>
                    <td class="p-4">
                      <div class="flex items-center justify-end gap-3 pr-4">
                        <div class="w-24 h-1.5 bg-surface-container-high rounded-full overflow-hidden flex">
                          <div class="bg-primary h-full rounded-l-full" :style="{ width: rm.healthScore + '%' }"></div>
                        </div>
                        <span class="text-body-md font-bold w-6">{{ rm.healthScore }}</span>
                      </div>
                    </td>
                    <td class="p-4 text-center">
                      <button class="text-secondary hover:text-primary"><span class="material-symbols-outlined">bar_chart</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Churn Forecast -->
          <div class="global-dotted-bg lg:col-span-8 rounded border border-outline-variant p-6 flex flex-col">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 class="text-headline-md font-headline-md mb-1">Churn Forecast Prediction</h2>
                <p class="text-body-md text-secondary">Projected customer exits based on transactional AI patterns</p>
              </div>
              <div class="rounded-lg p-1 flex text-label-caps bg-white border border-outline-variant">
                <button class="px-4 py-2 text-primary rounded shadow-sm font-bold bg-white border border-outline-variant">30 Days</button>
                <button class="px-4 py-2 text-secondary font-semibold hover:text-on-surface">60 Days</button>
                <button class="px-4 py-2 text-secondary font-semibold hover:text-on-surface">90 Days</button>
              </div>
            </div>
            <div class="flex-1 relative h-64 mt-6 pt-4">
              <div v-if="forecastWeeks.length === 0" class="flex items-center justify-center h-full text-body-md text-secondary">No forecast data available</div>
              <div v-else class="flex items-end justify-between h-full w-full px-4 relative z-10">
                <svg class="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 600 200" preserveAspectRatio="none">
                  <path d="M 40 30 C 90 15, 140 20, 190 32 S 290 8, 340 12 S 440 35, 540 20" fill="none" stroke="#DC0037" stroke-width="2" stroke-dasharray="4 4"></path>
                </svg>
                <div v-for="week in forecastWeeks" :key="week.label" class="flex flex-col items-center gap-1.5 w-[12%]">
                  <span class="text-body-md font-bold text-on-surface">{{ week.value }}</span>
                  <div class="w-full bg-primary rounded-t" :style="{ height: week.height + 'px' }"></div>
                  <span class="text-label-caps text-secondary">{{ week.label }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-4 bg-[#131010] rounded p-6 text-inverse-on-surface flex flex-col relative overflow-hidden shadow-lg" style="background: linear-gradient(135deg, #95052A 0%, #131010 50%, #000000 100%);">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <h3 class="text-label-caps font-label-caps text-primary-fixed-dim uppercase mb-6 relative z-10 text-white">Predicted Churn By Segment</h3>
            <div class="flex flex-col gap-6 flex-1 relative z-10">
              <div v-if="churnSegments.length === 0" class="text-body-md text-white/60">No segment data available</div>
              <div v-for="seg in churnSegments" :key="seg.name">
                <div class="flex justify-between text-body-md mb-2 text-white"><span>{{ seg.name }}</span><span class="font-bold">{{ seg.pct }}%</span></div>
                <div class="w-full h-1 rounded-full overflow-hidden bg-white/10"><div class="bg-white h-full" :style="{ width: seg.pct + '%' }"></div></div>
              </div>
            </div>
            <div class="mt-8 bg-black/40 border border-white/10 rounded-lg p-4 relative z-10 backdrop-blur-sm">
              <p class="text-body-md italic text-white/90 mb-3 font-medium">{{ aiInsightQuote }}</p>
              <div class="flex items-center gap-2 text-label-caps text-white/60 font-bold">
                <span class="text-[11px] tracking-widest">AI INSIGHT ENGINE</span>
              </div>
            </div>
          </div>
        </div>

    <!-- BottomNavBar (Mobile Only) -->
    <nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface px-margin-mobile py-2 border-t border-outline-variant dark:border-outline flat no shadows">
      <router-link class="flex flex-col items-center justify-center text-primary dark:text-inverse-primary font-bold hover:bg-surface-container-highest opacity-80 p-2 rounded-lg transition-colors w-16" to="/dashboard/home">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">dashboard</span>
        <span class="text-label-sm font-label-sm mt-1">Dashboard</span>
      </router-link>
      <router-link class="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-highest p-2 rounded-lg transition-colors w-16" to="/dashboard/branch-manager">
        <span class="material-symbols-outlined">groups</span>
        <span class="text-label-sm font-label-sm mt-1">Team</span>
      </router-link>
      <router-link class="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-highest p-2 rounded-lg transition-colors w-16" to="/dashboard/portfolio">
        <span class="material-symbols-outlined">pie_chart</span>
        <span class="text-label-sm font-label-sm mt-1">Portfolio</span>
      </router-link>
    </nav>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'

const loading = ref(true)
onMounted(() => { setTimeout(() => loading.value = false, 800) })

const branch = ref({ rank: null, total: null })

const kpis = ref({
  aggregateAtRisk: { value: null, change: null },
  dormantAccounts: { value: null, change: null },
  monthlyChurn: { value: null, change: null },
})

const relationshipManagers = ref([])
const forecastWeeks = ref([])
const churnSegments = ref([])
const aiInsightQuote = ref('')
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.dashboard-root {
  min-height: max(884px, 100dvh);
}
</style>