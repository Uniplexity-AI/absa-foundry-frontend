<template>
  <section class="py-24 bg-white relative overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none mesh-background"></div>
    <div class="absolute top-10 left-10 w-64 h-64 border border-gray-100 rounded-full opacity-40 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
        <div class="flex-1">
          <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-blue-50 border border-blue-100 rounded-sm">
            <span class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest">Drive revenue</span>
          </div>
          <h2 class="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tight leading-none mb-6">
            Sales &amp; Business<br/>
            <span class="text-[#2F2E8B]">Development</span>
          </h2>
          <p class="font-mono text-xs sm:text-sm text-gray-500 max-w-lg mb-8 leading-relaxed">
            From lead capture to closed deals, Uniplexity gives your sales team the tools they need to track pipelines, manage customers, and grow revenue.
          </p>
          <ul class="space-y-3">
            <li v-for="item in salesFeatures" :key="item.label" class="flex items-start gap-3">
              <i :class="[item.icon, 'text-[#2F2E8B] text-xs mt-0.5']"></i>
              <div>
                <span class="text-xs font-bold text-gray-900 uppercase">{{ item.label }}</span>
                <p class="text-[10px] font-mono text-gray-400">{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex-1 w-full max-w-md">
          <div class="bg-white border border-gray-200 p-8 shadow-sm">
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Sales Pipeline</div>
            <div class="space-y-4">
              <div v-for="stage in pipelineStages" :key="stage.name" class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" :class="stage.color"></div>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-[10px] font-mono font-bold text-gray-700 uppercase">{{ stage.name }}</span>
                    <span class="text-[10px] font-mono text-gray-400">{{ stage.count }}</span>
                  </div>
                  <div class="h-1.5 bg-gray-100 rounded-none overflow-hidden">
                    <div class="h-full rounded-none transition-all duration-500" :class="stage.barColor" :style="{ width: stage.percent }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const salesFeatures = [
  { icon: 'fas fa-users', label: 'Lead Management', desc: 'Capture, qualify, and nurture leads from any source' },
  { icon: 'fas fa-chart-pie', label: 'Pipeline Tracking', desc: 'Visual sales pipeline with drag-and-drop deal management' },
  { icon: 'fas fa-file-signature', label: 'Quotations & Invoicing', desc: 'Generate professional quotes and invoices in seconds' },
  { icon: 'fas fa-chart-line', label: 'Sales Analytics', desc: 'Real-time dashboards for revenue forecasts and team performance' },
]

const pipelineStages = [
  { name: 'New Leads', count: '24', percent: '100%', color: 'bg-blue-500', barColor: 'bg-blue-500' },
  { name: 'Qualified', count: '18', percent: '75%', color: 'bg-indigo-500', barColor: 'bg-indigo-500' },
  { name: 'Proposal', count: '12', percent: '50%', color: 'bg-[#2F2E8B]', barColor: 'bg-[#2F2E8B]' },
  { name: 'Negotiation', count: '7', percent: '30%', color: 'bg-amber-500', barColor: 'bg-amber-500' },
  { name: 'Closed Won', count: '4', percent: '16%', color: 'bg-emerald-500', barColor: 'bg-emerald-500' },
]
</script>
