<template>
  <section id="daas" class="py-24 bg-white relative overflow-hidden">
    <!-- Mesh Background & Shapes -->
    <div class="absolute inset-0 z-0 pointer-events-none mesh-background"></div>
    
    <!-- Blueprint Shapes -->
    <div class="absolute top-0 right-0 w-96 h-96 border border-gray-100 rounded-full opacity-50 -mr-48 -mt-48 pointer-events-none"></div>
    <div class="absolute bottom-20 left-10 w-4 h-4 bg-[#2F2E8B] rounded-full opacity-20 pointer-events-none"></div>
    <div class="absolute top-40 left-1/4 w-px h-24 bg-gray-200 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">
      
      <!-- Section Header -->
      <div class="text-center max-w-5xl mx-auto mb-20">
         <div class="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-blue-50 border border-blue-100 rounded-sm">
             <div class="w-2 h-2 bg-[#2F2E8B] rounded-full animate-pulse"></div>
             <span class="text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-widest">One platform for your business data</span>
         </div>
         
         <h2 class="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tight leading-none mb-6">
            One platform for<br/>
            <span class="text-[#2F2E8B]">business data and AI</span>
         </h2>
         
         <p class="font-mono text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto border-l-2 border-[#2F2E8B] pl-4 bg-gray-50 py-2">
            Bring your tools, reports, and workflows together so your team can work faster in one place.
         </p>
      </div>

      <!-- Core Benefits -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
         <!-- Simple -->
         <div class="bg-white p-6 border border-gray-200 hover:border-[#2F2E8B] hover:shadow-lg transition-all duration-300 group">
            <div class="text-[10px] font-mono text-gray-400 uppercase mb-2 group-hover:text-[#2F2E8B]">Simple setup</div>
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">Simple</h3>
            <p class="text-xs font-mono text-gray-500 leading-relaxed">
               Start quickly with tools your team can understand.
            </p>
            <div class="w-8 h-1 bg-gray-100 mt-4 group-hover:bg-[#2F2E8B] transition-colors"></div>
         </div>

         <!-- Smart -->
         <div class="bg-white p-6 border border-gray-200 hover:border-[#2F2E8B] hover:shadow-lg transition-all duration-300 group">
            <div class="text-[10px] font-mono text-gray-400 uppercase mb-2 group-hover:text-[#2F2E8B]">Helpful insights</div>
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">Smart</h3>
            <p class="text-xs font-mono text-gray-500 leading-relaxed">
               Get helpful insights without digging through spreadsheets.
            </p>
            <div class="w-8 h-1 bg-gray-100 mt-4 group-hover:bg-[#2F2E8B] transition-colors"></div>
         </div>

         <!-- Ready for growth -->
         <div class="bg-white p-6 border border-gray-200 hover:border-[#2F2E8B] hover:shadow-lg transition-all duration-300 group">
            <div class="text-[10px] font-mono text-gray-400 uppercase mb-2 group-hover:text-[#2F2E8B]">Built to grow</div>
            <h3 class="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">Ready for growth</h3>
            <p class="text-xs font-mono text-gray-500 leading-relaxed">
               Add more teams, locations, and workflows as your business grows.
            </p>
            <div class="w-8 h-1 bg-gray-100 mt-4 group-hover:bg-[#2F2E8B] transition-colors"></div>
         </div>
      </div>

      <!-- Comparison -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
         
         <!-- Problem -->
         <div class="bg-gray-50/50 p-6 border border-red-100 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all duration-300">
            <div class="absolute top-0 right-0 bg-red-50 text-red-500 text-[9px] font-mono font-bold px-2 py-1 border-l border-b border-red-100">What gets in the way</div>
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
               <span class="w-2 h-2 bg-red-500 rounded-full"></span> Problem
            </h3>
            <ul class="space-y-4">
               <li class="flex items-start gap-3">
                  <span class="font-mono text-red-500 text-xs mt-0.5">[x]</span>
                  <span class="text-sm text-gray-600 font-medium">Teams often work in separate tools that do not talk to each other</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-red-500 text-xs mt-0.5">[x]</span>
                  <span class="text-sm text-gray-600 font-medium">Important data gets stuck in spreadsheets, paper, or isolated systems</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-red-500 text-xs mt-0.5">[x]</span>
                  <span class="text-sm text-gray-600 font-medium">Some people are left out when tools are hard to use</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-red-500 text-xs mt-0.5">[x]</span>
                  <span class="text-sm text-gray-600 font-medium">Businesses need software that is affordable and easy to adopt</span>
               </li>
            </ul>
         </div>

         <!-- Solution -->
         <div class="bg-white p-1 rounded-sm shadow-2xl lg:-mt-4 lg:-mb-4 border border-blue-200 relative z-10">
            <div class="bg-white p-6 h-full border border-gray-100">
               <div class="absolute top-0 inset-x-0 h-1 bg-[#2F2E8B] mx-auto w-1/3"></div>
               <h3 class="text-2xl font-black text-[#2F2E8B] uppercase tracking-tight mb-2 text-center">How it helps</h3>
               <p class="text-center text-[10px] font-mono text-gray-400 uppercase mb-8">One place for everyday work</p>
               
               <div class="space-y-2">
                  <!-- Pricing Rows -->
                  <div class="flex items-center justify-between p-3 bg-blue-50/50 border border-blue-100">
                     <div>
                        <div class="font-bold text-gray-900 text-sm uppercase">Business app</div>
                        <div class="text-[10px] font-mono text-[#2F2E8B]">Sales, stock, and reports</div>
                     </div>
                     <div class="font-mono font-bold text-gray-900">K150<span class="text-xs text-gray-400 font-normal">/mo</span></div>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-blue-200 transition-colors">
                     <div>
                        <div class="font-bold text-gray-900 text-sm uppercase">Smart assistant devices</div>
                        <div class="text-[10px] font-mono text-gray-400">Helpful tools for different users</div>
                     </div>
                     <div class="font-mono font-bold text-gray-900">K5,000<span class="text-xs text-gray-400 font-normal">/unit</span></div>
                  </div>

                  <div class="flex items-center justify-between p-3 bg-white border border-gray-100 hover:border-blue-200 transition-colors">
                     <div>
                        <div class="font-bold text-gray-900 text-sm uppercase">Data insights</div>
                        <div class="text-[10px] font-mono text-gray-400">Turn reports into actions</div>
                     </div>
                     <div class="font-mono font-bold text-gray-900 uppercase text-xs">ENTERPRISE</div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Why choose us -->
         <div class="bg-gray-50/50 p-6 border border-green-100 relative overflow-hidden group hover:bg-white hover:shadow-md transition-all duration-300">
            <div class="absolute top-0 right-0 bg-green-50 text-green-600 text-[9px] font-mono font-bold px-2 py-1 border-l border-b border-green-100">Trusted benefits</div>
            <h3 class="text-lg font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
               <span class="w-2 h-2 bg-green-500 rounded-full"></span> Why choose us
            </h3>
            <ul class="space-y-4">
               <li class="flex items-start gap-3">
                  <span class="font-mono text-green-500 text-xs mt-0.5">[+]</span>
                  <span class="text-sm text-gray-600 font-medium">Works for teams of many sizes</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-green-500 text-xs mt-0.5">[+]</span>
                  <span class="text-sm text-gray-600 font-medium">Supports different ways of working and communicating</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-green-500 text-xs mt-0.5">[+]</span>
                  <span class="text-sm text-gray-600 font-medium">Connects your offline and digital workflows</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-green-500 text-xs mt-0.5">[+]</span>
                  <span class="text-sm text-gray-600 font-medium">Helps you stay ready for tax reporting</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-green-500 text-xs mt-0.5">[+]</span>
                  <span class="text-sm text-gray-600 font-medium">Keeps working even when the internet is slow</span>
               </li>
               <li class="flex items-start gap-3">
                  <span class="font-mono text-green-500 text-xs mt-0.5">[+]</span>
                  <span class="text-sm text-gray-600 font-medium">Uses AI to save time and surface useful next steps</span>
               </li>
            </ul>
         </div>

      </div>

      <!-- CTA Actions -->
      <div class="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
        <router-link to="/contact" class="group relative px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-mono text-sm font-bold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300">
           Contact us
           <div class="absolute -bottom-2 -right-2 w-full h-full border border-gray-200 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
        </router-link>
        
        <router-link to="/pricing" class="group relative px-8 py-3 bg-[#2F2E8B] text-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-[#1D226B] transition-all duration-300 shadow-lg hover:shadow-blue-900/25">
           View pricing
           <i class="fas fa-chevron-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup>
// purely presentational
</script>

<style scoped>
/* Mesh Background Pattern */
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}

/* Ensure font-mono works if Tailwind wasn't explicitly loading a mono font */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>
