import { ref, watch } from 'vue'

const isFullscreen = ref(false)

export function useFullscreenMode() {
  function toggleFullscreen() {
    isFullscreen.value = !isFullscreen.value
  }

  function enterFullscreen() {
    isFullscreen.value = true
  }

  function exitFullscreen() {
    isFullscreen.value = false
  }

  watch(isFullscreen, (val) => {
    document.documentElement.classList.toggle('app-fullscreen-mode', val)
  }, { immediate: true })

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen
  }
}
