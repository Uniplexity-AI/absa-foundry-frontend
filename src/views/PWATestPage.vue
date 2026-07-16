<template>
  <div class="test-container">
    <div class="test-header">
      <h1>PWA Toast Notification Test</h1>
      <p>This page allows you to test the new PWA install notification design</p>
    </div>
    
    <div class="test-controls">
      <h2>Test Controls</h2>
      <div class="button-group">
        <button @click="showToast" class="test-btn primary">Show Toast Notification</button>
        <button @click="hideToast" class="test-btn secondary">Hide Toast</button>
        <button @click="clearPreferences" class="test-btn danger">Clear User Preferences</button>
        <button @click="showStats" class="test-btn info">Show PWA Stats</button>
      </div>
    </div>
    
    <div v-if="stats" class="stats-display">
      <h3>PWA Manager Statistics</h3>
      <pre>{{ JSON.stringify(stats, null, 2) }}</pre>
    </div>
    
    <!-- Demo toast (manual control) -->
    <div v-if="demoToastVisible" class="pwa-toast animate-slideInRight">
      <div class="toast-backdrop"></div>
      <div class="toast-container">
        <!-- Progress bar -->
        <div class="toast-progress"></div>
        
        <!-- Content wrapper -->
        <div class="toast-content-wrapper">
          <!-- Icon with gradient background -->
          <div class="toast-icon-container">
            <div class="toast-icon-bg">
              <svg class="toast-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4V8C14 9.1 13.1 10 12 10S10 9.1 10 8V4C10 2.9 10.9 2 12 2M21 9V7H19V9H21M13 0H11V2H13V0M4.93 3.5L3.51 4.93L4.93 6.34L6.34 4.93L4.93 3.5M9 21C9.6 21 10 21.4 10 22S9.6 23 9 23 8 22.6 8 22 8.4 21 9 21M4 10V12H6V10H4M7 20C7 19.4 6.6 19 6 19S5 19.4 5 20 5.4 21 6 21 7 20.6 7 20M19.07 3.5L17.66 4.93L19.07 6.34L20.49 4.93L19.07 3.5M20 10V12H22V10H20M17 20C17 19.4 16.6 19 16 19S15 19.4 15 20 15.4 21 16 21 17 20.6 17 20M15 21C15.6 21 16 21.4 16 22S15.6 23 15 23 14 22.6 14 22 14.4 21 15 21M12 6C13.66 6 15 7.34 15 9S13.66 12 12 12 9 10.66 9 9 10.34 6 12 6Z"/>
              </svg>
            </div>
          </div>
          
          <!-- Message content -->
          <div class="toast-message-content">
            <div class="toast-header">
              <h4 class="toast-title">Install Uniplexity Business</h4>
              <span class="toast-badge">PWA</span>
            </div>
            <p class="toast-description">Get faster access and a native app experience</p>
            <div class="toast-benefits">
              <span class="benefit-item">🚀 Faster loading</span>
              <span class="benefit-item">📱 Offline access</span>
            </div>
          </div>
          
          <!-- Action buttons -->
          <div class="toast-actions">
            <button @click="demoInstall" class="install-btn">
              <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Install
            </button>
            <button @click="hideToast" class="dismiss-btn" aria-label="Dismiss notification">
              <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import pwaManager from '@/utils/pwaManager.js';

const demoToastVisible = ref(false);
const stats = ref(null);

const showToast = () => {
  demoToastVisible.value = true;
  setTimeout(() => {
    if (demoToastVisible.value) {
      hideToast();
    }
  }, 10000); // Auto-hide after 10 seconds
};

const hideToast = () => {
  demoToastVisible.value = false;
};

const demoInstall = () => {
  alert('Demo PWA Installation! (In real app, this would trigger the actual install prompt)');
  hideToast();
};

const clearPreferences = () => {
  pwaManager.resetUserPreferences();
  alert('PWA user preferences cleared! The notification should appear more frequently now.');
};

const showStats = () => {
  stats.value = pwaManager.getInstallStats();
};

onMounted(() => {
  console.log('PWA Test page loaded');
});
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: #ffffff;
  padding: 40px 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

.test-header {
  text-align: center;
  margin-bottom: 40px;
}

.test-header h1 {
  color: #1e293b;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 12px 0;
}

.test-header p {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.test-controls {
  max-width: 800px;
  margin: 0 auto 40px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(30, 136, 229, 0.1);
}

.test-controls h2 {
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.button-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.test-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.test-btn.primary {
  background: linear-gradient(135deg, #2F2E8B 0%, #1D226B 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(47, 46, 139, 0.3);
}

.test-btn.primary:hover {
  background: linear-gradient(135deg, #1D226B 0%, #171B55 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(47, 46, 139, 0.4);
}

.test-btn.secondary {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.test-btn.secondary:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.test-btn.danger {
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.test-btn.danger:hover {
  background: #fecaca;
  transform: translateY(-1px);
}

.test-btn.info {
  background: #dbeafe;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

.test-btn.info:hover {
  background: #bfdbfe;
  transform: translateY(-1px);
}

.stats-display {
  max-width: 800px;
  margin: 0 auto;
  background: #1e293b;
  color: #f1f5f9;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #334155;
}

.stats-display h3 {
  color: #f1f5f9;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.stats-display pre {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
}

/* Include all the PWA toast styles from App.vue */
/* Premium PWA Toast Notification Styles */
.pwa-toast {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  max-width: 420px;
  width: calc(100vw - 48px);
}

.toast-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(30, 136, 229, 0.1);
}

.toast-container {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(247, 250, 255, 0.95) 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(30, 136, 229, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(30, 136, 229, 0.15);
}

.toast-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #2F2E8B 0%, #1D226B 50%, #171B55 100%);
  background-size: 200% 100%;
  animation: progressSlide 10s linear forwards;
  border-radius: 20px 20px 0 0;
}

@keyframes progressSlide {
  0% { width: 100%; }
  100% { width: 0%; }
}

.toast-content-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  position: relative;
}

.toast-icon-container {
  flex-shrink: 0;
  position: relative;
}

.toast-icon-bg {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #2F2E8B 0%, #1D226B 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 16px rgba(30, 136, 229, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.toast-icon-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}

.toast-icon {
  width: 24px;
  height: 24px;
  fill: white;
  position: relative;
  z-index: 10;
}

.toast-message-content {
  flex: 1;
  min-width: 0;
}

.toast-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.toast-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
}

.toast-badge {
  font-size: 10px;
  font-weight: 700;
  color: #2F2E8B;
  background: rgba(47, 46, 139, 0.1);
  padding: 2px 6px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.toast-description {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.toast-benefits {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.benefit-item {
  font-size: 11px;
  color: #475569;
  background: rgba(30, 136, 229, 0.06);
  padding: 3px 8px;
  border-radius: 8px;
  border: 1px solid rgba(30, 136, 229, 0.1);
  font-weight: 500;
}

.toast-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-self: flex-start;
  flex-shrink: 0;
}

.install-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #2F2E8B 0%, #1D226B 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 12px rgba(30, 136, 229, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  min-width: 80px;
  justify-content: center;
}

.install-btn:hover {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px rgba(30, 136, 229, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.install-btn:active {
  transform: translateY(0);
  box-shadow: 
    0 2px 8px rgba(30, 136, 229, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.dismiss-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(100, 116, 139, 0.1);
  color: #64748b;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);
}

.dismiss-btn:hover {
  background: rgba(100, 116, 139, 0.15);
  color: #475569;
  transform: scale(1.05);
}

.dismiss-btn:active {
  transform: scale(0.95);
}

.btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Enhanced slide-in animation */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.9);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: blur(0);
  }
}

.animate-slideInRight {
  animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Responsive design */
@media (max-width: 640px) {
  .button-group {
    flex-direction: column;
  }
  
  .test-btn {
    justify-content: center;
  }
  
  .pwa-toast {
    top: auto;
    bottom: 24px;
    right: 16px;
    left: 16px;
    width: auto;
    max-width: none;
  }
  
  .toast-content-wrapper {
    padding: 16px;
    gap: 12px;
    flex-wrap: wrap; /* Added to allow stacking */
  }
  
  .toast-icon-bg {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
  
  .toast-icon {
    width: 20px;
    height: 20px;
  }
  
  .toast-message-content {
    width: calc(100% - 52px); /* Icon width (40px) + gap (12px) */
  }

  .toast-title {
    font-size: 15px;
  }
  
  .toast-description {
    font-size: 13px;
  }
  
  .toast-benefits {
    gap: 8px;
  }
  
  .benefit-item {
    font-size: 10px;
    padding: 2px 6px;
  }
  
  .toast-actions {
    flex-direction: row;
    width: 100%;
    margin-top: 12px;
    gap: 10px;
  }

  .install-btn {
    flex: 1;
    padding: 10px;
    font-size: 13px;
    min-width: 70px;
  }
  
  .dismiss-btn {
    width: 44px;
    height: 44px;
  }
  
  .btn-icon {
    width: 14px;
    height: 14px;
  }
}
</style>