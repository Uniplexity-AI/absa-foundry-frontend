<template>
  <!-- Install button (3 visual variants) -->
  <button
    v-if="!hideWhenInstalled || !isInstalled"
    @click="onClick"
    :class="buttonClasses"
    :title="isInstalled ? 'App is already installed' : 'Install Uniplexity Business as an app'"
    :aria-label="isInstalled ? 'App installed' : 'Install app'"
  >
    <i :class="['fas', isInstalled ? 'fa-check-circle' : 'fa-download', iconSize]" aria-hidden="true"></i>
    <span :class="labelClasses">
      {{ isInstalled ? 'App Installed' : label }}
    </span>
  </button>

  <!-- Manual instructions modal, teleported to body so it sits above sidebars/overlays -->
  <Teleport to="body">
    <transition name="install-fade">
      <div
        v-if="showInstructionsModal"
        class="fixed inset-0 z-[12000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
        @click.self="closeInstructionsModal"
      >
        <div class="relative w-full max-w-md bg-white border border-gray-200 shadow-2xl overflow-hidden">
          <!-- Header strip -->
          <div class="h-1 bg-[#2F2E8B]"></div>

          <button
            @click="closeInstructionsModal"
            class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#2F2E8B] hover:bg-gray-50 transition-colors"
            aria-label="Close"
          >
            <i class="fas fa-times"></i>
          </button>

          <div class="p-6 sm:p-7">
            <div class="flex items-center gap-3 mb-5">
              <div class="w-12 h-12 bg-indigo-50 border border-[#2F2E8B]/30 flex items-center justify-center">
                <i class="fas fa-mobile-screen-button text-[#2F2E8B] text-xl"></i>
              </div>
              <div>
                <div class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-[0.18em]">Progressive Web App</div>
                <h3 class="text-base font-black text-gray-900 tracking-tight">Install Uniplexity Business</h3>
              </div>
            </div>

            <p class="text-xs text-gray-600 leading-relaxed mb-5">
              Add Uniplexity Business to your {{ isMobile ? 'home screen' : 'desktop' }} for faster access,
              offline support, and a full-screen experience — no app store required.
            </p>

            <!-- iOS -->
            <div v-if="isIOS" class="space-y-3">
              <Step :n="1">
                Tap the <span class="font-bold text-[#2F2E8B]">Share</span> icon
                <i class="fas fa-arrow-up-from-bracket mx-1 text-[#2F2E8B]"></i>
                at the bottom of Safari.
              </Step>
              <Step :n="2">
                Scroll and select <span class="font-bold text-[#2F2E8B]">"Add to Home Screen"</span>
                <i class="fas fa-square-plus mx-1 text-[#2F2E8B]"></i>.
              </Step>
              <Step :n="3">Tap <span class="font-bold text-[#2F2E8B]">Add</span> in the top right.</Step>
            </div>

            <!-- Android (no native prompt available) -->
            <div v-else-if="isAndroid" class="space-y-3">
              <Step :n="1">Open the browser menu <i class="fas fa-ellipsis-vertical mx-1 text-[#2F2E8B]"></i>.</Step>
              <Step :n="2">Tap <span class="font-bold text-[#2F2E8B]">"Install app"</span> or <span class="font-bold text-[#2F2E8B]">"Add to Home screen"</span>.</Step>
              <Step :n="3">Confirm to add Uniplexity to your home screen.</Step>
            </div>

            <!-- Desktop fallback (Firefox / Safari desktop / dismissed cooldown) -->
            <div v-else class="space-y-3">
              <Step :n="1">
                Click the install icon
                <i class="fas fa-circle-down mx-1 text-[#2F2E8B]"></i>
                in your address bar (Chrome, Edge, Brave).
              </Step>
              <Step :n="2">If you don't see it, open the browser menu <i class="fas fa-ellipsis-vertical mx-1 text-[#2F2E8B]"></i> and choose <span class="font-bold text-[#2F2E8B]">"Install Uniplexity Business"</span>.</Step>
              <Step :n="3">Confirm to install it as a desktop app.</Step>
            </div>

            <div v-if="isInstalled" class="mt-5 px-4 py-3 bg-emerald-50 border border-emerald-200 flex items-center gap-2">
              <i class="fas fa-check-circle text-emerald-600"></i>
              <span class="text-[11px] font-mono font-black text-emerald-700 uppercase tracking-widest">Already installed on this device</span>
            </div>

            <button
              @click="closeInstructionsModal"
              class="w-full mt-6 bg-[#2F2E8B] text-white font-black text-[11px] font-mono uppercase tracking-[0.18em] py-3 hover:bg-[#1D226B] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, h } from 'vue'
import { usePwaInstall } from '@/composables/usePwaInstall.js'

const props = defineProps({
  /**
   * Visual variant:
   *  - 'pill'    : compact rounded pill (good for hero corners)
   *  - 'card'    : full-width card-like CTA (good for dashboard widgets)
   *  - 'inline'  : minimal inline link/button (good for nav bars)
   *  - 'icon'    : icon-only square button (good for mobile compact spots)
   */
  variant: { type: String, default: 'pill' },
  label: { type: String, default: 'Install App' },
  hideWhenInstalled: { type: Boolean, default: false },
})

const {
  isInstalled,
  isIOS,
  isAndroid,
  isMobile,
  showInstructionsModal,
  triggerInstall,
  closeInstructionsModal,
} = usePwaInstall()

const onClick = () => triggerInstall()

const buttonClasses = computed(() => {
  switch (props.variant) {
    case 'card':
      return 'group w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-[#2F2E8B]/30 hover:border-[#2F2E8B] hover:bg-indigo-50/50 text-[#2F2E8B] text-[11px] font-mono font-black uppercase tracking-[0.15em] transition-all active:scale-[0.98]'
    case 'inline':
      return 'nav-link nav-link-animate flex items-center justify-center gap-2 text-gray-600 hover:text-[#2F2E8B]'
    case 'icon':
      return 'w-10 h-10 flex items-center justify-center bg-white border border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B] text-gray-600 transition-all rounded-sm'
    case 'pill':
    default:
      return 'inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#2F2E8B]/30 hover:border-[#2F2E8B] hover:bg-indigo-50 text-[#2F2E8B] text-[10px] font-mono font-black uppercase tracking-[0.15em] transition-all shadow-sm rounded-sm'
  }
})

const iconSize = computed(() => {
  if (props.variant === 'icon') return 'text-base'
  if (props.variant === 'inline') return 'text-lg'
  return 'text-xs'
})

const labelClasses = computed(() => {
  if (props.variant === 'icon') return 'sr-only'
  if (props.variant === 'inline') return 'font-medium'
  return ''
})

// Tiny render-functional helper component used in the modal steps
const Step = (props2, { slots }) =>
  h('div', { class: 'flex items-start gap-3' }, [
    h('span', { class: 'flex-shrink-0 w-6 h-6 bg-[#2F2E8B] text-white flex items-center justify-center font-black text-[10px] font-mono' }, String(props2.n)),
    h('p', { class: 'text-xs text-gray-700 leading-relaxed' }, slots.default?.()),
  ])
Step.props = { n: { type: Number, required: true } }
</script>

<style scoped>
.install-fade-enter-active,
.install-fade-leave-active {
  transition: opacity 0.2s ease;
}
.install-fade-enter-from,
.install-fade-leave-to {
  opacity: 0;
}
</style>
