
<template>
  <div
    class="flex flex-col lg:flex-row items-center mb-20 animate-fadeInUp solution-item-container"
    :class="{ 'lg:flex-row-reverse': reverse }"
    :style="`animation-delay: ${delay}s;`"
  >
    <!-- Content Section -->
    <div class="lg:w-1/2 px-6 mb-8 lg:mb-0">
      <div class="solution-content">
        <h3 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {{ title }}
          <div class="solution-title-accent"></div>
        </h3>
        
        <div class="features-grid mb-8">
          <div 
            v-for="(point, i) in points" 
            :key="i" 
            class="feature-item"
            :style="`animation-delay: ${delay + 0.1 + i * 0.1}s;`"
          >
            <div class="feature-icon">
              <i class="fas fa-check-circle text-blue-600"></i>
            </div>
            <span class="feature-text">{{ point }}</span>
          </div>
        </div>

        <!-- Get Started Button -->
        <div class="solution-cta">
          <router-link
            to="/terms-acceptance"
            class="get-started-btn group"
          >
            <span class="btn-text">Get Started with {{ title }}</span>
            <div class="btn-icon">
              <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
            </div>
            <div class="btn-glow"></div>
          </router-link>
          
          <button 
            @click="learnMore"
            class="learn-more-btn"
          >
            <i class="fas fa-info-circle mr-2"></i>
            Learn More
          </button>
        </div>
      </div>
    </div>

    <!-- Image Section -->
    <div class="lg:w-1/2 px-6">
      <div class="image-container">
        <img 
          :src="image" 
          :alt="title" 
          class="solution-image" 
          @error="handleImageError"
        />
        <div class="image-overlay">
          <div class="overlay-content">
            <i class="fas fa-play-circle text-4xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
          </div>
        </div>
        <div class="image-glow"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { } from 'vue';

const props = defineProps({
  title: String,
  points: Array,
  image: String,
  reverse: Boolean,
  delay: Number
});

const learnMore = () => {
  // Scroll to features section or show more details
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleImageError = (event) => {
  // Fallback to a default image if the specified image fails to load
  event.target.src = './assets/default-solution.jpeg';
};
</script>

<style scoped>
.solution-item-container {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(248, 250, 252, 0.8) 100%
  );
  border: 1px solid rgba(96, 165, 250, 0.15);
  border-radius: 24px;
  padding: 3rem 2rem;
  box-shadow: 
    0 10px 30px rgba(37, 99, 235, 0.08),
    0 4px 15px rgba(96, 165, 250, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.solution-item-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 20% 80%, 
    rgba(96, 165, 250, 0.06) 0%, 
    transparent 50%
  );
  opacity: 0.8;
  z-index: 0;
  transition: opacity 0.4s ease;
}

.solution-item-container:hover {
  box-shadow: 
    0 25px 50px rgba(37, 99, 235, 0.15),
    0 10px 30px rgba(96, 165, 250, 0.1);
  transform: translateY(-5px);
  border-color: rgba(96, 165, 250, 0.25);
}

.solution-item-container:hover::before {
  opacity: 1;
}

.solution-content {
  position: relative;
  z-index: 1;
}

.solution-title-accent {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #2563eb, #60a5fa);
  border-radius: 2px;
  margin-top: 8px;
  transition: width 0.4s ease;
}

.solution-item-container:hover .solution-title-accent {
  width: 80px;
}

.features-grid {
  display: grid;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(96, 165, 250, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInLeft 0.6s ease forwards;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.feature-item:hover {
  background: rgba(96, 165, 250, 0.05);
  border-color: rgba(96, 165, 250, 0.2);
  transform: translateX(4px);
}

.feature-icon {
  margin-right: 0.75rem;
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.feature-text {
  color: #374151;
  font-weight: 500;
  line-height: 1.5;
}

.solution-cta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.get-started-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%);
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 25px rgba(37, 99, 235, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.get-started-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 12px 35px rgba(37, 99, 235, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-icon {
  margin-left: 0.5rem;
  position: relative;
  z-index: 2;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(96, 165, 250, 0.3) 0%, 
    rgba(37, 99, 235, 0.2) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: inherit;
}

.get-started-btn:hover .btn-glow {
  opacity: 1;
}

.learn-more-btn {
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: #2563eb;
  border: 2px solid #2563eb;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
}

.learn-more-btn:hover {
  background: #2563eb;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
}

.image-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(37, 99, 235, 0.15),
    0 5px 15px rgba(96, 165, 250, 0.1);
  transition: all 0.4s ease;
  min-height: 320px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.image-container:hover {
  transform: scale(1.03) translateY(-5px);
  box-shadow: 
    0 25px 50px rgba(37, 99, 235, 0.25),
    0 10px 25px rgba(96, 165, 250, 0.15);
}

.image-container:hover .solution-image {
  transform: scale(1.05);
}

.solution-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
  transition: all 0.4s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.8) 0%,
    rgba(96, 165, 250, 0.6) 100%
  );
  opacity: 0;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-glow {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(135deg, 
    rgba(96, 165, 250, 0.4) 0%, 
    rgba(37, 99, 235, 0.3) 100%
  );
  border-radius: 24px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.image-container:hover .image-glow {
  opacity: 1;
}

@media (max-width: 1024px) {
  .solution-item-container {
    padding: 2rem 1.5rem;
  }
  
  .solution-cta {
    align-items: center;
  }
  
  .get-started-btn {
    width: 100%;
    max-width: 300px;
  }

  .image-container {
    min-height: 280px;
  }

  .solution-image {
    height: 280px;
  }
}

@media (max-width: 640px) {
  .features-grid {
    gap: 0.75rem;
  }
  
  .feature-item {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  
  .get-started-btn {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  h3 {
    font-size: 1.875rem !important;
  }

  .image-container {
    min-height: 240px;
  }

  .solution-image {
    height: 240px;
  }
}
</style>
