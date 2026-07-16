<template>
  <div class="min-h-screen bg-white overflow-x-hidden landing-scaled">
    <Navbar />

    <!-- Enhanced Floating Background Elements - Subtle/White Theme -->
    <!-- Clean Background -->
    <!-- Enhanced Professional Background - Analytics/Math Mesh Theme -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <!-- Base Background -->
      <div class="absolute inset-0 bg-white"></div>
      
      <!-- Analytics/Math Mesh Pattern (Grey Grid) -->
      <div class="absolute inset-0" 
           style="background-image: linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px); 
                  background-size: 40px 40px; 
                  opacity: 0.25;">
      </div>
      
      <!-- Secondary Finer Mesh (Subtle detail) -->
      <div class="absolute inset-0" 
           style="background-image: linear-gradient(#e2e8f0 0.5px, transparent 0.5px), linear-gradient(90deg, #e2e8f0 0.5px, transparent 0.5px); 
                  background-size: 10px 10px; 
                  opacity: 0.15;">
      </div>
      
      <!-- Illustrative SVG Patterns (Grey) -->
      
      <!-- 1. Rising Graph Line (Financial/Growth) -->
      <svg class="absolute top-20 right-0 w-[50%] h-[600px] opacity-[0.06] text-gray-500 transform translate-x-1/4" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 250 C100 240, 150 200, 200 150 C250 100, 300 120, 400 50" stroke="currentColor" stroke-width="2" />
        <path d="M0 280 C100 270, 150 230, 200 180 C250 130, 300 150, 400 80" stroke="currentColor" stroke-width="1" stroke-dasharray="5 5" />
        <circle cx="200" cy="150" r="4" fill="currentColor" />
        <circle cx="400" cy="50" r="4" fill="currentColor" />
      </svg>
      
      <!-- 2. Network/Circuit Connections (Tech/Data) -->
      <svg class="absolute bottom-0 left-0 w-[40%] h-[500px] opacity-[0.05] text-gray-600 transform -translate-x-10 translate-y-20" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="50" cy="250" r="3" fill="currentColor" />
         <circle cx="150" cy="150" r="3" fill="currentColor" />
         <circle cx="250" cy="200" r="3" fill="currentColor" />
         <circle cx="100" cy="50" r="3" fill="currentColor" />
         <path d="M50 250 L150 150 L250 200" stroke="currentColor" stroke-width="1" />
         <path d="M150 150 L100 50" stroke="currentColor" stroke-width="1" />
         <path d="M50 250 L130 250 L150 150" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" />
      </svg>

      <!-- 3. Abstract Geometric Hexagons (Structure/Stability) -->
      <svg class="absolute top-1/3 left-10 w-24 h-24 opacity-[0.04] text-gray-700 animate-float-delayed" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2L2 7L12 12L22 7L12 2Z" />
         <path d="M2 17L12 22L22 17L22 7L12 12L2 7V17Z" stroke="currentColor" stroke-width="0.5" fill="none"/>
      </svg>
      <svg class="absolute bottom-1/4 right-20 w-32 h-32 opacity-[0.03] text-gray-500 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5">
         <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" />
         <path d="M12 22V12" />
         <path d="M12 12L21 7" />
         <path d="M12 12L3 7" />
      </svg>
      
      <!-- Subtle Professional Gradient Overlay -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gray-100/60 via-gray-50/40 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gray-50/50 via-white to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
    </div>

    <!-- Content Sections -->
    <div class="relative z-10 animate-fadeIn">
      <section class="pt-4 sm:pt-6 md:pt-10 pb-4 sm:pb-6">
        <HeroSection />
      </section>
    </div>
    
    <div id="features" class="relative z-10 animate-fadeIn bg-white">
      <FeaturesSection />
    </div>
    
    <div id="daas" class="relative z-10 animate-fadeIn bg-gradient-to-b from-slate-50 to-white">
      <DaasSection />
    </div>

    <div id="partnership" class="relative z-10 animate-fadeIn">
      <PartnershipSection />
    </div>

    <div id="modules" class="relative z-10 animate-fadeIn bg-white">
      <SolutionsSection />
    </div>

    <div id="sales" class="relative z-10 animate-fadeIn">
      <SalesSection />
    </div>
    
    <div id="testimonials" class="relative z-10 animate-fadeIn bg-white">
      <TestimonialsSection />
    </div>
    
    <div id="pricing" class="relative z-10 animate-fadeIn bg-white">
      <PricingSection />
    </div>
    
    <div class="relative z-10 animate-fadeIn bg-white border-t border-gray-100">
      <CallToAction />
    </div>

    <div id="jobs" class="relative z-10 animate-fadeIn">
      <JobsSection />
    </div>

    <div class="relative z-10 animate-fadeIn bg-white border-t border-gray-100">
      <FooterSection />
    </div>
    
    <!-- Back to Top floating button -->
    <BackToTop />
    
    <!-- Landing Page AI Chatbot -->
    <LandingChatWidget @robotDragPosition="handleRobotDrag" />
    
    <!-- Spotlight Trail Canvas -->
    <canvas 
      ref="spotlightCanvas" 
      class="spotlight-canvas"
      :class="{ 'active': isRobotDragging }"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '@/components/LandingPage/Navbar.vue';
import HeroSection from '@/components/LandingPage/HeroSection.vue';
import FeaturesSection from '@/components/LandingPage/FeatureSection.vue';
import DaasSection from '@/components/LandingPage/DaasSection.vue';
import SolutionsSection from '@/components/LandingPage/SolutionSection.vue';
import PartnershipSection from '@/components/LandingPage/PartnershipSection.vue';
import SalesSection from '@/components/LandingPage/SalesSection.vue';
import JobsSection from '@/components/LandingPage/JobsSection.vue';
import TestimonialsSection from '@/components/LandingPage/TestimonialSection.vue';
import PricingSection from '@/components/LandingPage/PricingSection.vue';
import CallToAction from '@/components/LandingPage/CallToAction.vue';
import FooterSection from '@/components/LandingPage/FooterSection.vue';
import BackToTop from '@/components/LandingPage/BackToTop.vue';
import LandingChatWidget from '@/components/LandingPage/LandingChatWidget.vue';

// Spotlight trail effect
const spotlightCanvas = ref(null);
const isRobotDragging = ref(false);
const trailPoints = ref([]);
let animationId = null;
let ctx = null;

onMounted(() => {
  if (spotlightCanvas.value) {
    ctx = spotlightCanvas.value.getContext('2d');
    spotlightCanvas.value.width = window.innerWidth;
    spotlightCanvas.value.height = window.innerHeight;
    
    window.addEventListener('resize', handleResize);
    startAnimation();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (animationId) cancelAnimationFrame(animationId);
});

const handleResize = () => {
  if (spotlightCanvas.value) {
    spotlightCanvas.value.width = window.innerWidth;
    spotlightCanvas.value.height = window.innerHeight;
  }
};

const handleRobotDrag = (position) => {
  console.log('handleRobotDrag called:', position);
  isRobotDragging.value = position.isDragging;
  
  if (position.isDragging) {
    // Add new trail point
    trailPoints.value.push({
      x: position.x,
      y: position.y,
      alpha: 1,
      radius: 120,
      timestamp: Date.now()
    });
    console.log('Trail points:', trailPoints.value.length);
    
    // Limit trail points
    if (trailPoints.value.length > 20) {
      trailPoints.value.shift();
    }
  }
};

const startAnimation = () => {
  const animate = () => {
    if (!ctx || !spotlightCanvas.value) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, spotlightCanvas.value.width, spotlightCanvas.value.height);
    
    // Fill canvas with semi-transparent white (matching hero overlay)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(0, 0, spotlightCanvas.value.width, spotlightCanvas.value.height);
    
    // Use destination-out to "erase" and reveal background
    ctx.globalCompositeOperation = 'destination-out';
    
    // Update and draw trail points
    const now = Date.now();
    trailPoints.value = trailPoints.value.filter(point => {
      const age = now - point.timestamp;
      const maxAge = 2000; // Trail lasts 2 seconds
      
      if (age > maxAge) return false;
      
      // Fade out over time
      point.alpha = 1 - (age / maxAge);
      
      // Draw reveal circle (erases the white overlay)
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, point.radius
      );
      
      // Stronger alpha in center, fades to edges
      gradient.addColorStop(0, `rgba(255, 255, 255, ${point.alpha * 0.9})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${point.alpha * 0.6})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fill();
      
      return true;
    });
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    
    animationId = requestAnimationFrame(animate);
  };
  
  animate();
};
</script>

<style scoped>
/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

/* Responsive improvements */
@media (max-width: 768px) {
  /* Ensure no horizontal scroll on mobile */
  .min-h-screen {
    overflow-x: hidden;
  }
}

/* Landing page scale/zoom override */
.landing-scaled {
  /* User requested 100% default size */
  /* zoom: 1; removed to avoid stacking context issues */
  -moz-transform: none;
  transform: none;
  width: 100%;
  position: relative; /* Ensure it's a positioning context if needed, but not for fixed */
}

/* Additional spacing for mobile */
@media (max-width: 640px) {
  section {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  /* Reset zoom on mobile if text becomes too small, but user requested default size. 
     Keeping it for desktop primarily, but user said "browser size". 
     Usually phones handle viewport differently. Let's keep it for now. */
}

/* Spotlight Trail Canvas */
.spotlight-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1; /* Above background (-z-10) but below content (z-10) */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.spotlight-canvas.active {
  opacity: 1;
}
</style>
