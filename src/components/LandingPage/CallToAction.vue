<template>
  <section class="relative py-24 overflow-hidden bg-gray-50">
    <!-- Dot Matrix / Grid Points Background (Different from Mesh) -->
    <div class="absolute inset-0 bg-white"></div>
    <div class="absolute inset-0 z-0 pointer-events-none dot-matrix-bg opacity-40"></div>
    
    <!-- Moving Scanline Effect -->
    <div class="absolute inset-0 z-0 pointer-events-none scanline-moving opacity-10"></div> 

    <!-- Corner Accents -->
    <div class="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-gray-200 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-gray-200 pointer-events-none"></div>

    <div class="container mx-auto px-6 text-center relative z-10">
      
      <!-- Status Badge -->
      <div class="mb-10 flex justify-center">
        <div class="inline-flex flex-col items-center">
             <div class="mb-4 relative">
                <div class="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center relative z-10">
                    <img src="/uniplexity_logo.png" alt="System Core" class="w-10 h-auto opacity-80" />
                </div>
                <!-- Pulsing Rings -->
                <div class="absolute inset-0 rounded-full border border-[#2F2E8B] opacity-20 animate-ping"></div>
                <div class="absolute -inset-4 rounded-full border border-gray-200 opacity-50"></div>
             </div>
             <div class="px-4 py-1.5 bg-gray-900 text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">
               READY TO GET STARTED
             </div>
        </div>
      </div>

      <!-- Main Heading -->
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-gray-900 uppercase tracking-tight leading-none animate-fadeInUp">
        {{ displayHeading1 }}<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#2F2E8B] to-[#1D226B]">{{ displayHeading2 }}</span>
      </h2>
      
      <!-- Subheading -->
      <p class="text-sm md:text-base text-gray-500 mb-8 max-w-2xl mx-auto font-mono bg-white/50 backdrop-blur-sm p-4 border-l-2 border-[#2F2E8B] animate-fadeInUp" style="animation-delay: 0.1s;">
        {{ displayText }}
      </p>

      <!-- Key Benefits -->
      <div class="flex flex-wrap justify-center items-center gap-3 lg:gap-8 mb-12 animate-fadeInUp" style="animation-delay: 0.2s;">
        <div class="flex items-center gap-3 px-4 py-2 border border-green-100 bg-green-50/50 rounded-sm">
          <span class="font-mono text-green-600 text-xs font-bold">[OK]</span>
          <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Helpful AI insights</span>
        </div>
        <div class="hidden md:block text-gray-300 font-mono">/</div>
        <div class="flex items-center gap-3 px-4 py-2 border border-green-100 bg-green-50/50 rounded-sm">
           <span class="font-mono text-green-600 text-xs font-bold">[OK]</span>
          <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Clear reports</span>
        </div>
        <div class="hidden md:block text-gray-300 font-mono">/</div>
        <div class="flex items-center gap-3 px-4 py-2 border border-green-100 bg-green-50/50 rounded-sm">
           <span class="font-mono text-green-600 text-xs font-bold">[OK]</span>
          <span class="text-xs font-bold text-gray-700 uppercase tracking-wide">Support when you need it</span>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp" style="animation-delay: 0.3s;">
        <router-link
          to="/terms-acceptance"
          class="relative group px-8 py-4 bg-gray-900 text-white font-mono text-xs font-bold uppercase tracking-wider overflow-hidden hover:shadow-2xl hover:shadow-[#2F2E8B]/20 transition-all duration-300"
        >
          <div class="absolute inset-0 w-full h-full bg-[#2F2E8B]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          <span class="relative flex items-center gap-3">
             <i class="fas fa-terminal text-[#2F2E8B]"></i>
             Start free trial
          </span>
        </router-link>
        
        <router-link
          to="/contact"
          class="relative group px-8 py-4 bg-transparent border-2 border-gray-200 text-gray-600 font-mono text-xs font-bold uppercase tracking-wider hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
        >
          <span class="relative flex items-center gap-3">
             <i class="fas fa-headset"></i>
             Contact sales
          </span>
        </router-link>
      </div>

      <!-- Trust Footer -->
      <div class="mt-16 border-t border-gray-200 pt-8 max-w-lg mx-auto animate-fadeInUp" style="animation-delay: 0.4s;">
        <p class="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-4">
            Trusted by growing teams across Zambia
        </p>
        <div class="flex justify-center items-center gap-6 opacity-40 grayscale">
            <!-- Representational Logos as simple geometric shapes for tech feel -->
           <div class="h-6 w-20 bg-gray-800/10 rounded-sm"></div>
           <div class="h-6 w-20 bg-gray-800/10 rounded-sm"></div>
           <div class="h-6 w-20 bg-gray-800/10 rounded-sm"></div>
           <div class="h-6 w-20 bg-gray-800/10 rounded-sm hidden sm:block"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const targetHeading1 = "Ready to Transform";
const targetHeading2 = "Your Business?";
const targetText = "Join thousands of businesses that use UB App to streamline operations, save time, and make smarter decisions.";

const displayHeading1 = ref("");
const displayHeading2 = ref("");
const displayText = ref("");

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

const animateText = (target, displayRef, speed = 30) => {
  let iteration = 0;
  const interval = setInterval(() => {
    displayRef.value = target
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return target[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= target.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3; 
  }, speed);
};

onMounted(() => {
  animateText(targetHeading1, displayHeading1);
  setTimeout(() => animateText(targetHeading2, displayHeading2), 500); // Stagger animation
  setTimeout(() => animateText(targetText, displayText, 20), 1000);   // Stagger body text
});
</script>

<style scoped>
/* Dot Matrix Background Pattern */
.dot-matrix-bg {
  background-image: radial-gradient(#e5e7eb 2px, transparent 2px);
  background-size: 24px 24px;
}

/* Moving Scanline Animation */
.scanline-moving {
  background: linear-gradient(to bottom, transparent, rgba(47, 46, 139, 0.1), transparent);
  background-size: 100% 4px;
  animation: scanSmooth 8s linear infinite;
}

@keyframes scanSmooth {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0; /* Ensures it starts invisible */
}

/* Ensure Font Mono */
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>

