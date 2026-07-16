<template>
  <div class="app-gradient font-sans antialiased text-gray-900 min-h-screen">
    <div v-if="devBypass" class="fixed top-0 left-0 right-0 bg-yellow-200 text-yellow-900 text-center text-xs py-1 z-[9999]">
      Dev Bypass active — Service Worker registration is disabled (VITE_DEV_BYPASS=true)
    </div>
    <!-- POS-Style Terminal Install Popup -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="showInstallToast" class="fixed bottom-6 right-6 z-[2147483647] w-full max-w-sm bg-white border border-gray-200 shadow-2xl overflow-hidden rounded-none">
        <div class="h-1.5 bg-[#2F2E8B] w-full"></div>
        <div class="absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none"></div>
        
        <div class="p-6 relative z-10 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
                <i class="fas fa-download text-[#2F2E8B]"></i>
              </div>
              <div>
                <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">SYSTEM // UPDATE</div>
                <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight font-outfit">Terminal Install</h4>
              </div>
            </div>
            <button @click="dismissInstall" class="text-gray-400 hover:text-gray-900 transition-colors w-8 h-8 flex items-center justify-center hover:bg-gray-50">
              <i class="fas fa-times text-xs"></i>
            </button>
          </div>

          <p class="text-xs font-mono font-bold text-gray-600 uppercase leading-relaxed">
            Install Uniplexity Business for a faster, offline-ready terminal experience.
          </p>

          <div class="flex gap-2">
            <button @click="installPWA" class="flex-1 bg-[#2F2E8B] hover:bg-[#1D226B] text-white py-3 text-[10px] font-mono font-black uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2">
              <i class="fas fa-arrow-alt-circle-down"></i> INSTALL_APP
            </button>
            <button @click="dismissInstall" class="px-4 py-3 bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-600 transition-all text-[10px] font-mono font-bold uppercase">
              LATER
            </button>
          </div>
        </div>
      </div>
    </Transition>
    <router-view />

    <!-- Mining AI Chat Component -->
    <!-- <MiningAiChat /> -->

    <!-- MFE modal overlay: provides the "dark blur" background for the sidebar/shell -->
    <!-- z-index 2147483640 is intentionally BELOW the MFE iframe (z-index 2147483645) -->
    <!-- so it covers the sidebar but NOT the iframe content (where modals render) -->
    <div
      v-if="isMfeModalOpen"
      style="position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);z-index:2147483640;"
      @click="isMfeModalOpen = false; mfePortalLink = null"
    ></div>

    <!-- Host-side Portal Link modal — rendered ABOVE the overlay -->
    <div
      v-if="mfePortalLink"
      style="position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:1rem;pointer-events:none;"
    >
      <div style="background:#fff;width:100%;max-width:32rem;box-shadow:0 30px 60px -15px rgba(0,0,0,0.5);display:flex;flex-direction:column;overflow:hidden;pointer-events:auto;border:1px solid rgba(255,255,255,0.2);">
        <div style="padding:2rem;border-bottom:1px solid #F3F4F6;display:flex;justify-content:space-between;align-items:flex-start;background:#fff;position:relative;overflow:hidden;">
          <div style="position:relative;z-index:10;">
            <h3 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 4px;">Share Borrower Portal</h3>
            <p style="font-size:10px;font-family:monospace;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Accept Applications Directly</p>
          </div>
          <button @click="isMfeModalOpen=false;mfePortalLink=null" style="position:relative;z-index:10;width:32px;height:32px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#F9FAFB;border:1px solid #E5E7EB;cursor:pointer;color:#6B7280;">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div style="padding:2rem;">
          <p style="font-size:10px;font-family:monospace;font-weight:700;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 1.5rem;">Share this link with potential borrowers to accept applications directly into your pipeline.</p>
          <div style="background:#F9FAFB;border:1px solid #F3F4F6;padding:2rem;display:flex;flex-direction:column;align-items:center;gap:1rem;">
            <div style="width:100%;background:#fff;padding:1rem 1.5rem;border:1px solid #E5E7EB;text-align:center;">
              <p style="font-size:9px;font-family:monospace;font-weight:900;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 8px;">Your Unique Portal Link</p>
              <p style="font-size:0.875rem;font-family:monospace;font-weight:900;color:#2F2E8B;word-break:break-all;margin:0;">{{ mfePortalLink }}</p>
            </div>
            <button @click="copyMfeLink" style="min-width:240px;display:flex;align-items:center;justify-content:center;gap:12px;background:#2F2E8B;color:#fff;padding:1rem 2rem;border:none;font-family:monospace;font-size:10px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
              <i :class="mfeCopied ? 'fas fa-check' : 'fas fa-copy'"></i>
              {{ mfeCopied ? 'Link Copied!' : 'Copy Link' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted, watch, version } from 'vue';
// import { useRouter, useRoute } from 'vue-router';
import router from '@/router';
import pwaManager from '@/utils/pwaManager.js';
import currencyService from '@/services/currencyService.js';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import MiningAiChat from '@/components/MiningAiChat.vue';
import { usePreferences } from '@/config/usePreferences.js';
import { useRBAC } from '@/composables/useRBAC.js';
import { DEV_BYPASS } from '@/config/devFlags.js';

const { fetchPreferences } = usePreferences();
const { initializeRBAC } = useRBAC();
// Dev bypass flag: set VITE_DEV_BYPASS=true to disable service worker during development
const devBypass = DEV_BYPASS;
// Offline infrastructure removed
// import inventoryDB from '@/utils/indexedDB.js';
// import offlineSyncManager from '@/utils/offlineSync.js';

// const router = useRouter();
// const route = useRoute();
const route = router.currentRoute;
const showInstallToast = ref(false);
let autoHideTimer = null;

// --- MFE modal overlay (covers sidebar when microfinance modal opens) ---
const isMfeModalOpen = ref(false);
const mfePortalLink = ref(null);
const mfeCopied = ref(false);

const copyMfeLink = async () => {
  try {
    await navigator.clipboard.writeText(mfePortalLink.value);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = mfePortalLink.value;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
  }
  mfeCopied.value = true;
  setTimeout(() => (mfeCopied.value = false), 2000);
};

const handleMfeMessage = (e) => {
  if (e.data?.type === 'MFE_MODAL_OPEN')  isMfeModalOpen.value = true;
  if (e.data?.type === 'MFE_MODAL_CLOSE') { isMfeModalOpen.value = false; mfePortalLink.value = null; }
  if (e.data?.type === 'MFE_SHOW_PORTAL_LINK') {
    mfePortalLink.value = e.data.link;
    isMfeModalOpen.value = true;  // show backdrop
  }
};
window.addEventListener('message', handleMfeMessage);

// Session checking function
const checkAndRedirectIfAuthenticated = () => {
  try {
    const { getUserEmail, getTenantId, getUserRole } = decodeJWT();
    const userEmail = getUserEmail?.();
    const tenantId = getTenantId?.();
    const userRole = getUserRole?.();
    
    // Check if user has valid session data
    if (userEmail && tenantId && userRole) {
      // Check if we're currently on landing page or login/signup pages
      const currentPath = route.value.path;
      const authPages = ['/', '/login', '/signup', '/signup-legacy'];
      
      // Only redirect if on auth pages, not if already on dashboard routes or public portals
      if (authPages.includes(currentPath) && !currentPath.startsWith('/apply/')) {
        console.log('🔄 Valid session detected, redirecting to dashboard');
        router.push('/dashboard/home');
      }
    }
  } catch (error) {
    console.warn('Session check failed:', error);
    // If session is invalid, let the user stay on current page
  }
};

// Setup PWA manager callbacks
onMounted(async () => {
  // Wait for router to be ready to avoid incorrect initial path resolution
  await router.isReady();

  // Check for existing session and redirect if authenticated
  checkAndRedirectIfAuthenticated();
  
  // Offline infrastructure removed - operating in online-only mode
  // IndexedDB and offline sync manager initialization removed

  // Initialize currency service with tenant settings on app startup
  try {
    const { getTenantId } = decodeJWT();
    const tenantId = getTenantId?.();
    if (tenantId) {
      await currencyService.initialize(tenantId);
      console.log('Currency service initialized for tenant:', tenantId);
    }
  } catch (error) {
    console.warn('Failed to initialize currency service:', error);
  }

  // Initialize Global Preferences and RBAC
  await Promise.all([
    fetchPreferences(),
    initializeRBAC()
  ]);

  // ── Offline pre-caching ───────────────────────────────────────
  // Pre-load inventory and customer data into IndexedDB for offline use
  if (navigator.onLine) {
    const { getTenantId } = decodeJWT();
    const tenantId = getTenantId?.();
    if (tenantId) {
      // Fire-and-forget — don't block app startup
      Promise.all([
        import('@/utils/offlineHelpers.js').then(async ({ cacheInventoryForOffline }) => {
          try {
            await cacheInventoryForOffline();
            console.log('✅ Inventory cached for offline use');
          } catch (e) {
            console.warn('Offline inventory cache failed:', e);
          }
        }),
        import('@/utils/offlineHelpers.js').then(async ({ cacheCustomersForOffline }) => {
          try {
            await cacheCustomersForOffline();
            console.log('✅ Customers cached for offline use');
          } catch (e) {
            console.warn('Offline customer cache failed:', e);
          }
        }),
        import('@/utils/offlineSync.js').then(async (mod) => {
          try {
            await mod.default.init();
            console.log('✅ Offline sync manager initialized');
          } catch (e) {
            console.warn('Offline sync init failed:', e);
          }
        })
      ]).catch(e => console.warn('Offline pre-caching error:', e));
    }
  }

  // PWA setup
  pwaManager.onPromptReady(() => {
    showInstallToast.value = true;
    startAutoHideTimer();
  });
  
  pwaManager.onInstallSuccess(() => {
    showInstallToast.value = false;
    clearAutoHideTimer();
  });
  
  pwaManager.onInstallDismiss(() => {
    showInstallToast.value = false;
    clearAutoHideTimer();
  });

  // Register periodic background sync if supported
  if ('serviceWorker' in navigator && 'periodicSync' in navigator.serviceWorker) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.periodicSync.register('periodic-sync', {
        minInterval: 24 * 60 * 60 * 1000 // 24 hours
      });
      console.log('✅ Periodic background sync registered');
    } catch (error) {
      console.warn('Periodic background sync not available:', error);
    }
  }
});

// Watch for route changes and redirect if authenticated user tries to access auth pages
watch(route, (newRoute) => {
  checkAndRedirectIfAuthenticated();
});

// Toggle global blur on shell elements when MFE modal opens
watch(isMfeModalOpen, (val) => {
  if (val) {
    document.body.classList.add('scoped-modal-open');
  } else {
    document.body.classList.remove('scoped-modal-open');
  }
});

onUnmounted(() => {
  clearAutoHideTimer();
});

const startAutoHideTimer = () => {
  clearAutoHideTimer();
  autoHideTimer = setTimeout(() => {
    if (showInstallToast.value) {
      dismissInstall();
    }
  }, 10000); // Auto-hide after 10 seconds
};

const clearAutoHideTimer = () => {
  if (autoHideTimer) {
    clearTimeout(autoHideTimer);
    autoHideTimer = null;
  }
}

// <<<<<<< Sepo
// const cancelInstall = () => {
//   showInstallButton.value = false
//   installPromptEvent = null
// }
// =======
const installPWA = async () => {
  clearAutoHideTimer();
  const success = await pwaManager.install();
  if (!success) {
    showInstallToast.value = false;
  }
};

const dismissInstall = () => {
  clearAutoHideTimer();
  pwaManager.dismiss();
};

</script>

<style scoped>
.app-gradient {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f7faff 0%, #fafcff 100%);
  overflow-x: hidden;
}

:global(.dark) .app-gradient {
  background: linear-gradient(135deg, #0c0c0c 0%, #111111 100%);
}

.dotted-pattern {
  background-image: radial-gradient(#2F2E8B 0.5px, transparent 0.5px);
  background-size: 10px 10px;
}

.font-outfit {
  font-family: 'Outfit', sans-serif;
}

@media (max-width: 640px) {
  .fixed.bottom-6.right-6 {
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
}


.toast-backdrop {
  display: none;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
.animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
.animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
.animate-bounce { animation: bounce 2s infinite; }
.hover-scale { transition: transform 0.3s ease; }
.hover-scale:hover { transform: scale(1.05); }
.nav-hover { transition: all 0.3s ease; }
.nav-hover:hover { color: #1F2937; transform: translateY(-2px); text-decoration: underline; }
</style>
