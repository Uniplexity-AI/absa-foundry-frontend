<template>
  <section id="partners" class="py-8 sm:py-12 md:py-16 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-8 sm:mb-12 text-gray-900 uppercase tracking-tight font-mono animate-fadeInUp">
        TEAMS THAT TRUST US
      </h2>
      
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Loading partner logos...</p>
      </div>

      <!-- Desktop view - Centered grid for few logos (1-4) -->
      <div v-else-if="!loading && partnerLogos.length > 0 && partnerLogos.length <= 4" class="hidden lg:block">
        <div class="flex justify-center gap-8 flex-wrap">
          <div
            v-for="(partner, index) in partnerLogos"
            :key="partner.id || index"
            class="flex-shrink-0 w-32 h-32 mesh-background p-4 rounded-sm shadow-sm hover:shadow-md hover:scale-105 transition duration-300 flex flex-col items-center justify-center border border-gray-200 hover:border-[#2F2E8B]"
            :style="`animation-delay: ${0.1 * (index + 1)}s;`"
          >
            <img 
              :src="partner.image_data" 
              :alt="partner.name"
              class="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Desktop view - Horizontal scrolling marquee for many logos (5+) -->
      <div v-else-if="!loading && partnerLogos.length > 4" class="hidden lg:block partners-marquee overflow-hidden">
        <div class="partners-inner flex flex-nowrap" :style="`animation-duration: ${marqueeSpeed}s;`">
          <div
            v-for="(partner, index) in displayedPartners"
            :key="`marquee-${index}`"
            class="flex-shrink-0 w-32 h-32 mesh-background p-4 rounded-sm shadow-sm hover:shadow-md hover:scale-105 transition duration-300 flex flex-col items-center justify-center mx-3 border border-gray-200 hover:border-[#2F2E8B]"
            :style="`animation-delay: ${0.1 * (index + 1)}s;`"
          >
            <img 
              :src="partner.image_data" 
              :alt="partner.name"
              class="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Tablet view - Grid layout -->
      <div v-else-if="!loading && partnerLogos.length > 0" class="hidden md:block lg:hidden">
        <div class="grid grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          <div
            v-for="(partner, index) in partnerLogos"
            :key="partner.id || index"
            class="mesh-background p-4 rounded-sm shadow-sm hover:shadow-md hover:scale-105 transition duration-300 flex flex-col items-center justify-center w-28 h-28 border border-gray-200 hover:border-[#2F2E8B]"
            :style="`animation-delay: ${0.1 * (index + 1)}s;`"
          >
            <img 
              :src="partner.image_data" 
              :alt="partner.name"
              class="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <!-- Mobile view - Vertical cards -->
      <div v-else-if="!loading && partnerLogos.length > 0" class="block md:hidden">
        <div class="flex flex-col items-center gap-4">
          <div
            v-for="(partner, index) in partnerLogos"
            :key="partner.id || index"
            class="mesh-background p-4 rounded-sm shadow-sm hover:shadow-md transition duration-300 flex items-center justify-center w-24 h-24 border border-gray-200 hover:border-[#2F2E8B]"
            :style="`animation-delay: ${0.1 * (index + 1)}s;`"
          >
            <img 
              :src="partner.image_data" 
              :alt="partner.name"
              class="w-full h-full object-contain opacity-80"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!loading" class="text-center py-12">
        <p class="text-gray-600">We don’t have partner logos to show right now.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import API_BASE_URL from '@/api_services/api';
import { decodeJWT } from '@/api_services/decodeJWT';

const partnerLogos = ref([]);
const loading = ref(true);
const globalMarqueeSpeed = ref(20);

const marqueeSpeed = computed(() => {
  // Use the global marquee speed setting
  return globalMarqueeSpeed.value;
});

const displayedPartners = computed(() => {
  // Only duplicate logos for seamless marquee if we have 5+ logos
  // Otherwise just show them once to avoid looking repetitive
  if (partnerLogos.value.length >= 5) {
    return [...partnerLogos.value, ...partnerLogos.value];
  }
  return partnerLogos.value;
});

async function fetchGlobalSpeed() {
  try {
    const response = await fetch(`${API_BASE_URL}/partner-logos/settings/speed`);
    const data = await response.json();
    
    if (data.success && data.data) {
      globalMarqueeSpeed.value = data.data.marquee_speed || 20;
    }
  } catch (error) {
    console.error('Error fetching global marquee speed:', error);
    // Use default value on error
    globalMarqueeSpeed.value = 20;
  }
}

async function fetchPartnerLogos() {
  try {
    loading.value = true;
    let url = `${API_BASE_URL}/partner-logos/?active_only=true`;
    // We always want global partners for the landing page, regardless of logged-in state
    // So we do not append tenant_id here.
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.success && data.data) {
      partnerLogos.value = data.data;
    }
  } catch (error) {
    console.error('Error fetching partner logos:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchPartnerLogos();
  fetchGlobalSpeed();
});
</script>

<style scoped>
.animate-fadeInUp {
  animation: fadeInUp 1s ease-out forwards;
}

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

/* Marquee animation for desktop */
.partners-inner {
  animation: marquee linear infinite;
}

.partners-inner:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Text line clamping */
.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
}

/* Ensure proper card sizing on desktop */
@media (min-width: 1024px) {
  .features-inner > div {
    aspect-ratio: 1 / 1;
    width: 12rem;
    height: 12rem;
    min-width: 12rem;
    max-width: 12rem;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Tablet responsiveness */
@media (min-width: 768px) and (max-width: 1023px) {
  .grid > div {
    min-height: 180px;
  }
}

/* Animation delays for staggered effect */
.animate-fadeInUp:nth-child(1) { animation-delay: 0.1s; }
.animate-fadeInUp:nth-child(2) { animation-delay: 0.2s; }
.animate-fadeInUp:nth-child(3) { animation-delay: 0.3s; }
.animate-fadeInUp:nth-child(4) { animation-delay: 0.4s; }
.animate-fadeInUp:nth-child(5) { animation-delay: 0.5s; }
.animate-fadeInUp:nth-child(6) { animation-delay: 0.6s; }
.animate-fadeInUp:nth-child(7) { animation-delay: 0.7s; }
.animate-fadeInUp:nth-child(8) { animation-delay: 0.8s; }
.animate-fadeInUp:nth-child(9) { animation-delay: 0.9s; }

/* Mesh Background Pattern */
.mesh-background {
  background-color: #ffffff;
  background-image: 
    linear-gradient(#f3f4f6 1px, transparent 1px),
    linear-gradient(90deg, #f3f4f6 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
}
</style>