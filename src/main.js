import { createPinia } from 'pinia';

import './assets/main.css';
import './assets/patterns.css';
import './assets/pages.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './index.css'; // Adding Tailwind to the project
// import store from '@/store/index';
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import vRole from './utils/v-role';
import currencyPlugin from './config/currency.js';
// Auth protections
// import authStore from './store/auth_store';
import { LucideHome, LucideFileText, LucidePercent, LucideFilter, LucideMessageSquare, LucideCalendar, LucideAward, LucideX } from 'lucide-vue-next';
// Import Firebase notification functions
// import { requestNotificationPermission, onMessageListener } from './firebase';
import { registerSW } from 'virtual:pwa-register';
import { DEV_BYPASS } from '@/config/devFlags.js';

// Capture PWA install prompt globally to avoid missing it before components mount
window.deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
  console.log('✨ Captured beforeinstallprompt event globally');
});

import vue3GoogleLogin from 'vue3-google-login';

// Global dev bypass: set VITE_DEV_BYPASS=true to skip service worker registration
if (!DEV_BYPASS) {
  registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('✨ New content available, click reload button to update.');
    },
    // onOfflineReady() {
    //   console.log('💾 App ready to work offline');
    // },
    onRegisterError(error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  });
} else {
  console.log('🚧 Dev bypass enabled (VITE_DEV_BYPASS=true) — skipping service worker registration');
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .then(() => {
        if ('caches' in window) {
          return caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))));
        }
        return null;
      })
      .then(() => {
        console.log('🚧 Dev bypass cleared existing service workers and runtime caches');
      })
      .catch((error) => {
        console.warn('⚠️ Dev bypass could not clear service workers:', error);
      });
  }
}


const app = createApp(App);
const pinia = createPinia(); // Create Pinia instance

// app.use(store);  // Use Vuex store (Legacy)
app.use(pinia); // Use Pinia for state management
app.use(router); // Use the router
app.use(currencyPlugin); // Use currency plugin for global currency formatting

// Configure Google OAuth - Always initialize with the Client ID from env
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '692487163735-87grn53oulccnsesgdiacc2oa40gvuqj.apps.googleusercontent.com';
app.use(vue3GoogleLogin, {
  clientId: googleClientId
});

app.component('LucideHome', LucideHome);
app.component('LucideFileText', LucideFileText);
app.component('LucidePercent', LucidePercent);
app.component('LucideFilter', LucideFilter);
app.component('LucideMessageSquare', LucideMessageSquare);
app.component('LucideCalendar', LucideCalendar);
app.component('LucideAward', LucideAward);
app.component('LucideX', LucideX);
app.directive('role', vRole);

// Configure toast notifications
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'colored',
  position: 'top-right',
  closeOnClick: true,
  pauseOnHover: true,
});



// ── App version check ──────────────────────────────────────────
// Checks version.json on startup and notifies if a new version is available.
fetch('/version.json?t=' + Date.now())
  .then(r => r.json())
  .then(v => {
    const stored = localStorage.getItem('app_version');
    if (stored && stored !== v.version) {
      console.log('🔄 New app version detected:', v.version, '(was:', stored, ')');
      // Trigger SW update check
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(reg => {
          if (reg) reg.update();
        });
      }
    }
    localStorage.setItem('app_version', v.version);
  })
  .catch(() => {/* version.json may not exist in dev */});

// Mount the app
app.mount('#app');



