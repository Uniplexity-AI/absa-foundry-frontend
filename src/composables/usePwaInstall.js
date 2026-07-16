/**
 * usePwaInstall
 * Shared composable on top of the global `pwaManager` singleton.
 * Provides reactive install state and a unified `triggerInstall()` that
 * uses the native browser prompt when available, or surfaces a manual
 * instruction modal for iOS / Firefox / Safari desktop / already-cooled-down sessions.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import pwaManager from '@/utils/pwaManager.js'

// Singleton reactive state (shared across all components using this composable)
const hasNativePrompt = ref(!!pwaManager.installPromptEvent)
const isInstalled = ref(
  (typeof window !== 'undefined') &&
  (window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator?.standalone === true ||
    localStorage.getItem('pwaInstalled') === 'true')
)
const showInstructionsModal = ref(false)

const isIOS = computed(() =>
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream
)
const isAndroid = computed(() =>
  typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)
)
const isMobile = computed(() => isIOS.value || isAndroid.value)

// Refresh `hasNativePrompt` when the global event fires after composable init.
// We do this once per app load by listening directly to the window event too.
let _bound = false
function bindGlobalListener() {
  if (_bound || typeof window === 'undefined') return
  _bound = true
  window.addEventListener('beforeinstallprompt', () => {
    hasNativePrompt.value = true
  })
  window.addEventListener('appinstalled', () => {
    isInstalled.value = true
    hasNativePrompt.value = false
    localStorage.setItem('pwaInstalled', 'true')
    showInstructionsModal.value = false
  })
}
bindGlobalListener()

async function triggerInstall() {
  // Already installed → quick exit, surface a friendly modal hint.
  if (isInstalled.value) {
    showInstructionsModal.value = true
    return { outcome: 'already-installed' }
  }

  // Sync from singleton in case event arrived before this composable was used.
  if (!hasNativePrompt.value && pwaManager.installPromptEvent) {
    hasNativePrompt.value = true
  }

  if (hasNativePrompt.value && pwaManager.installPromptEvent) {
    try {
      const ev = pwaManager.installPromptEvent
      ev.prompt()
      const choice = await ev.userChoice
      pwaManager.installPromptEvent = null
      hasNativePrompt.value = false
      if (choice?.outcome === 'accepted') {
        isInstalled.value = true
        localStorage.setItem('pwaInstalled', 'true')
      }
      return choice || { outcome: 'dismissed' }
    } catch (err) {
      console.warn('[usePwaInstall] native prompt failed, showing manual modal', err)
      showInstructionsModal.value = true
      return { outcome: 'fallback' }
    }
  }

  // No native prompt: show manual instructions modal (iOS, Safari/Firefox desktop, etc.)
  showInstructionsModal.value = true
  return { outcome: 'manual' }
}

function closeInstructionsModal() {
  showInstructionsModal.value = false
}

export function usePwaInstall() {
  // Refresh installed-state on mount in case display mode changed (PWA opened from icon)
  onMounted(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(display-mode: standalone)').matches) {
      isInstalled.value = true
    }
  })
  onUnmounted(() => { /* nothing - state is module-scoped */ })

  return {
    hasNativePrompt,
    isInstalled,
    isIOS,
    isAndroid,
    isMobile,
    showInstructionsModal,
    triggerInstall,
    closeInstructionsModal,
  }
}

export default usePwaInstall
