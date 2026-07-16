<template>
  <Teleport :to="toTarget">
    <div style="position:fixed;inset:0;z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:1rem;padding-top:2rem;overflow:auto;pointer-events:none;">
      <!-- Backdrop with dim (no backdrop-filter to avoid stacking bugs with other modals) -->
      <div style="position:absolute;inset:0;background-color:rgba(0,0,0,0.6);pointer-events:auto;" @click="emit('close')"></div>

      <!-- Modal Container -->
      <div
        ref="dialogRef"
        v-bind="$attrs"
        style="position:relative;background-color:white;border:1px solid rgb(229,231,235);box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);width:100%;max-width:28rem;display:flex;flex-direction:column;max-height:95vh;border-radius:0;overflow:hidden;animation:fade-in-up 0.25s cubic-bezier(0.16,1,0.3,1);margin-top:2rem;pointer-events:auto;"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        <!-- Top Accent Bar (Tech Style) -->
        <div style="height:0.375rem;width:100%;background-color:#2F2E8B;flex-shrink:0;"></div>

        <!-- Dotted Pattern Overlay (Low opacity) -->
        <div style="position:absolute;inset:0;opacity:0.02;pointer-events:none;" class="dotted-pattern"></div>

        <!-- Header -->
        <div style="padding:1rem 1.5rem;border-bottom:1px solid rgb(229,231,235);display:flex;justify-content:space-between;align-items:center;background-color:rgba(249,250,251,0.5);backdrop-filter:blur(12px);position:sticky;top:0;z-index:20;flex-shrink:0;pointer-events:auto;">
          <div style="display:flex;gap:0.75rem;align-items:center;">
             <div style="width:0.375rem;height:1.5rem;background-color:#2F2E8B;border-radius:0.125rem;"></div>
             <h3 style="font-size:0.75rem;font-weight:900;color:rgb(17,24,39);text-transform:uppercase;letter-spacing:0.2em;font-family:monospace;">
               <slot name="title"></slot>
             </h3>
          </div>
          <button aria-label="Close dialog" @click="emit('close')" style="color:rgb(156,163,175);cursor:pointer;width:2.5rem;height:2.5rem;display:flex;align-items:center;justify-content:center;border-radius:0.125rem;transition:all 0.2s;border:none;background:transparent;pointer-events:auto;" onmouseover="this.style.color='rgb(17,24,39)';this.style.backgroundColor='rgb(243,244,246)'" onmouseout="this.style.color='rgb(156,163,175)';this.style.backgroundColor='transparent'">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Content -->
        <div style="padding:1.5rem;overflow-y:auto;position:relative;z-index:10;flex:1;min-height:0;pointer-events:auto;" class="custom-scrollbar">
          <slot name="content"></slot>
        </div>

        <!-- Optional Footer -->
        <div v-if="$slots.footer" style="padding:1rem 1.5rem;background-color:rgba(249,250,251,0.8);border-top:1px solid rgb(229,231,235);backdrop-filter:blur(12px);position:sticky;bottom:0;z-index:20;flex-shrink:0;pointer-events:auto;">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  to: {
    type: [String, Object],
    default: 'body'
  },
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  trapFocus: {
    type: Boolean,
    default: true,
  },
  restoreFocus: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['close']);

// Use reactive ref for teleport target to ensure it's set after DOM is ready
const toTarget = ref('body');
const dialogRef = ref(null);
let previouslyFocusedElement = null;

const focusableSelectors = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

const getFocusableElements = () => {
  const dialog = dialogRef.value;
  if (!dialog) return [];

  return Array.from(dialog.querySelectorAll(focusableSelectors)).filter((element) => {
    if (!(element instanceof HTMLElement)) return false;
    if (element.hasAttribute('disabled')) return false;
    const isVisible = element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
    return isVisible;
  });
};

const focusInitialElement = async () => {
  await nextTick();

  const dialog = dialogRef.value;
  if (!dialog) return;

  const autofocusElement = dialog.querySelector('[autofocus], [data-autofocus]');
  if (autofocusElement instanceof HTMLElement) {
    autofocusElement.focus({ preventScroll: true });
    return;
  }

  const focusables = getFocusableElements();
  if (focusables.length > 0) {
    focusables[0].focus({ preventScroll: true });
    return;
  }

  dialog.focus({ preventScroll: true });
};

const restoreFocus = () => {
  if (!props.restoreFocus) return;

  const target = previouslyFocusedElement;
  if (!target || !target.isConnected || typeof target.focus !== 'function') return;

  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault();
    emit('close');
    return;
  }

  if (event.key !== 'Tab' || !props.trapFocus) return;

  const dialog = dialogRef.value;
  if (!dialog) return;

  const focusables = getFocusableElements();
  if (focusables.length === 0) {
    event.preventDefault();
    dialog.focus({ preventScroll: true });
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  const activeInsideDialog = active instanceof Node && dialog.contains(active);

  if (event.shiftKey && (active === first || !activeInsideDialog)) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
};

const handleFocusIn = (event) => {
  if (!props.trapFocus) return;

  const dialog = dialogRef.value;
  if (!dialog) return;

  if (event.target instanceof Node && dialog.contains(event.target)) return;

  const focusables = getFocusableElements();
  if (focusables.length > 0) {
    focusables[0].focus({ preventScroll: true });
  } else {
    dialog.focus({ preventScroll: true });
  }
};

// Prevent body scrolling while modal is open
onMounted(() => {
  previouslyFocusedElement = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
    ? document.activeElement
    : null;

  toTarget.value = document.body || 'body';
  try { document.body.classList.add('modal-open'); } catch (e) { /* ignore */ }

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('focusin', handleFocusIn);
  focusInitialElement();
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('focusin', handleFocusIn);
  try { document.body.classList.remove('modal-open'); } catch (e) { /* ignore */ }
  restoreFocus();
});
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 0px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* Prevent body scroll when modal is open */
:global(body.modal-open) {
  overflow: hidden;
}

/* When a modal is open, push/hide common fixed bottom bars to avoid blocking the modal on mobile */
:global(body.modal-open) .fixed.bottom-0,
:global(body.modal-open) .fixed.bottom-4,
:global(body.modal-open) .fixed.bottom-6,
:global(body.modal-open) .fixed.bottom-8,
:global(body.modal-open) .fixed.bottom-16,
:global(body.modal-open) .fixed.bottom-24,
:global(body.modal-open) .fixed.bottom-32 {
  pointer-events: none !important;
  transform: translateY(120%) !important;
  opacity: 0 !important;
}
</style>