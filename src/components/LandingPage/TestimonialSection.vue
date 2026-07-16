<template>
  <section id="testimonials" class="py-24 bg-white relative overflow-hidden">
    <!-- Mesh Background -->
    <div class="absolute inset-0 z-0 pointer-events-none mesh-background"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="mb-16">
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4">
          CUSTOMER STORIES
        </h2>
        <div class="h-1 w-24 bg-[#2F2E8B]"></div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-24">
        <div class="flex flex-col items-center gap-4">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#2F2E8B]"></div>
          <p class="font-mono text-sm text-gray-500">Loading customer stories...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="testimonials.length === 0" class="py-24 border border-dashed border-gray-300 rounded-lg text-center bg-gray-50/50 backdrop-blur-sm">
        <i class="fas fa-comment-dots text-4xl text-gray-400 mb-4"></i>
        <p class="font-mono text-gray-500">We don’t have customer stories yet.</p>
      </div>

      <!-- Content Layout -->
      <div v-else>
        
        <!-- Marquee View (5+ Stories) -->
        <div v-if="testimonials.length >= 5" class="marquee-container overflow-hidden relative">
           <div class="marquee-track flex gap-6 py-4">
              <!-- Double the list for seamless looping -->
              <div 
                v-for="(t, index) in [...testimonials, ...testimonials]" 
                :key="`marquee-${index}`"
                class="w-[320px] flex-shrink-0"
              >
                  <TestimonialCard :t="t" :index="index % testimonials.length" />
              </div>
           </div>
        </div>

        <!-- Grid View (< 5 Stories) -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div v-for="(t, index) in testimonials" :key="index">
              <TestimonialCard :t="t" :index="index" />
           </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '@/api_services/api';
import TestimonialCard from './TestimonialCard.vue';

const testimonials = ref([]);
const loading = ref(true);

const fetchTestimonials = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE_URL}/testimonials/public`);
    testimonials.value = response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    testimonials.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTestimonials);
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

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

/* Marquee Animation */
.marquee-track {
  width: max-content;
  animation: marquee 40s linear infinite;
}

.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (max-width: 768px) {
  .marquee-track {
     animation-duration: 30s; /* Faster on mobile if needed, or same */
  }
}
</style>
