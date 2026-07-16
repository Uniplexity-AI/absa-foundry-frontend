<template>
  <section class="py-24 bg-gray-50 relative overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 w-px h-full bg-gray-200 opacity-50"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-emerald-50 border border-emerald-100 rounded-sm">
          <span class="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-widest">Join the team</span>
        </div>
        <h2 class="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight leading-none mb-6">
          Jobs<br/>
          <span class="text-[#2F2E8B]">Available</span>
        </h2>
        <p class="font-mono text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
          We're looking for talented people who want to build the future of business software.
        </p>
      </div>

      <div class="max-w-3xl mx-auto space-y-4">
        <div v-for="(job, i) in jobs" :key="i" class="bg-white border border-gray-200 hover:border-[#2F2E8B]/20 transition-all duration-200 group">
          <details class="group/open">
            <summary class="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
              <div>
                <h3 class="text-sm font-black text-gray-900 uppercase tracking-tight">{{ job.title }}</h3>
                <div class="flex items-center gap-3 mt-1">
                  <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wider">{{ job.department }}</span>
                  <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span class="text-[9px] font-mono text-gray-400">{{ job.location }}</span>
                  <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm" :class="job.type === 'Remote' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'">{{ job.type }}</span>
                </div>
              </div>
              <i class="fas fa-chevron-down text-gray-300 group-open/open:rotate-180 transition-transform"></i>
            </summary>
            <div class="px-6 pb-5 border-t border-gray-100 pt-4">
              <p class="text-[10px] font-mono text-gray-500 leading-relaxed mb-4">{{ job.description }}</p>
              <a :href="'mailto:careers@uniplexity.com?subject=' + encodeURIComponent(job.title)" class="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-wider">
                <i class="fas fa-arrow-right text-[9px]"></i>
                Apply for this position
              </a>
            </div>
          </details>
        </div>
      </div>

      <div class="text-center mt-12">
        <p class="text-[10px] font-mono text-gray-400 mb-4">Don't see the right role?</p>
        <a href="mailto:careers@uniplexity.com" class="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-wider">
          <i class="fas fa-envelope"></i>
          Send us your CV
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const jobs = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Lusaka, Zambia',
    type: 'Hybrid',
    description: 'Build and maintain core platform features across the stack. Experience with Vue.js, Python, and PostgreSQL required.'
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Remote',
    description: 'Design intuitive interfaces for our business applications. You will own the design system and work closely with product and engineering.'
  },
  {
    title: 'Customer Success Manager',
    department: 'Operations',
    location: 'Lusaka, Zambia',
    type: 'On-site',
    description: 'Help our clients get the most out of Uniplexity. Onboard new customers, gather feedback, and drive product adoption.'
  },
  {
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Lusaka, Zambia',
    type: 'On-site',
    description: 'Identify and engage potential clients across various industries. Experience in B2B SaaS sales is a plus.'
  }
]
</script>
