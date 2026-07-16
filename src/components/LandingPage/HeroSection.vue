<template>
  <header class="hero-background min-h-screen flex items-center relative overflow-hidden pt-24 md:pt-0">
    <!-- Mesh Overlay for Tech Grid Design -->
    <div class="absolute inset-0 mesh-background opacity-20 pointer-events-none z-0"></div>
    
    <div class="container mx-auto px-4 md:px-6 relative z-10">
      <div class="max-w-5xl mr-auto text-left">
        
        <!-- Status Badge -->
        <div class="mb-4 sm:mb-8 animate-fade-in-up">
           <div class="inline-flex items-center gap-3 px-3 py-1 bg-white/80 backdrop-blur border border-gray-200 rounded-sm shadow-sm">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest">Trusted by growing teams</span>
           </div>
        </div>
        
        <!-- Headline -->
        <h1 class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-8 text-gray-900 leading-tight md:leading-none tracking-tighter uppercase animate-fade-in-up delay-100">
          Run your business
          <span class="block text-[#2F2E8B]">from one place</span>
        </h1>
        
        <!-- Subhead -->
        <div class="flex flex-col md:flex-row gap-4 sm:gap-6 items-start animate-fade-in-up delay-200 mb-6 sm:mb-12">
            <div class="w-1 h-24 bg-[#2F2E8B] hidden md:block"></div>
            <p class="text-sm sm:text-lg text-gray-600 font-mono max-w-2xl leading-relaxed bg-white/60 backdrop-blur-sm p-4 border border-gray-100 rounded-sm">
              Manage sales, inventory, invoicing, payroll, and reporting in one simple system.
            </p>
        </div>
        
        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row justify-start items-center gap-3 sm:gap-6 animate-fade-in-up delay-300 w-full sm:w-auto">
          <router-link
            to="/terms-acceptance"
            class="group bg-gray-900 text-white border-2 border-gray-900 px-6 sm:px-10 py-3 sm:py-4 rounded-sm hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center font-mono font-bold text-xs sm:text-sm tracking-widest uppercase w-full sm:w-auto sm:min-w-[220px] justify-center shadow-xl hover:shadow-2xl"
          >
            <i class="fas fa-power-off mr-3 text-[#2F2E8B] group-hover:text-gray-900 transition-colors"></i>
            Get started
          </router-link>
          
          <a
            href="#features"
            class="group bg-transparent text-gray-900 border-2 border-gray-300 px-6 sm:px-10 py-3 sm:py-4 rounded-sm hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all duration-300 flex items-center font-mono font-bold text-xs sm:text-sm tracking-widest uppercase w-full sm:w-auto sm:min-w-[220px] justify-center bg-white/50 backdrop-blur-sm"
          >
            <i class="fas fa-play mr-3 text-xs"></i>
            See how it works
          </a>
        </div>

        <!-- Supportive Footer Stats -->
        <div class="mt-12 sm:mt-16 flex items-center gap-6 sm:gap-8 opacity-60 animate-fade-in-up delay-300">
            <div class="text-[10px] sm:text-xs font-mono text-gray-400">
                <span class="block font-bold text-gray-900 text-base sm:text-lg">Fast</span>
                SETUP
            </div>
            
            <!-- Separator -->
            <div class="h-8 w-px bg-gray-300 rotate-12"></div>

            <div class="text-[10px] sm:text-xs font-mono text-gray-400">
                <span class="block font-bold text-gray-900 text-base sm:text-lg">Secure</span>
                ACCESS
            </div>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
// No complex scripts needed for this clean version
</script>

<style scoped>
/* STRICTLY PRESERVED BACKGROUND */
.hero-background {
  background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95)), url('/assets/posmain.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.mesh-background {
  background-image: radial-gradient(#2F2E8B 1px, transparent 1px);
  background-size: 40px 40px;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0; /* Start hidden */
}
</style>
