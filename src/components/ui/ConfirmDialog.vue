<template>
  <Modal
    v-if="open"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
    @close="handleClose"
  >
    <template #title>
      <span :id="titleId">{{ title }}</span>
    </template>

    <template #content>
      <div ref="contentRef" :id="descriptionId" class="space-y-5">
        <div class="flex items-start gap-4">
          <div :class="iconBoxClasses" class="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border">
            <i :class="iconClass" class="text-sm"></i>
          </div>
          <div class="space-y-2">
            <p class="text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-gray-400">
              {{ eyebrow }}
            </p>
            <p v-if="message" class="text-sm leading-6 text-gray-700 whitespace-pre-line">
              {{ message }}
            </p>
          </div>
        </div>

        <div v-if="detail" class="border border-gray-200 bg-gray-50/80 px-4 py-3">
          <p class="text-[10px] font-mono uppercase tracking-widest text-gray-500 whitespace-pre-line">
            {{ detail }}
          </p>
        </div>

        <slot name="body" />
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <button
          v-if="showCancel"
          type="button"
          @click="handleCancel"
          :data-autofocus="showCancel"
          :disabled="busy"
          class="px-4 py-2 border border-gray-300 text-gray-700 text-[10px] font-bold font-mono uppercase tracking-wider hover:bg-gray-50 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F2E8B] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
        >
          {{ cancelLabel }}
        </button>

        <button
          type="button"
          @click="handleConfirm"
          :data-autofocus="!showCancel"
          :disabled="busy || confirmDisabled"
          :class="confirmButtonClasses"
          class="px-4 py-2 text-white text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
        >
          <i :class="busy ? 'fas fa-spinner fa-spin' : iconClass"></i>
          {{ busy ? busyLabel : confirmLabel }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { computed } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  detail: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'danger',
    validator: (value) => ['danger', 'warning', 'info', 'neutral'].includes(value),
  },
  eyebrow: {
    type: String,
    default: '',
  },
  confirmLabel: {
    type: String,
    default: 'Confirm',
  },
  cancelLabel: {
    type: String,
    default: 'Cancel',
  },
  busyLabel: {
    type: String,
    default: 'Working...',
  },
  busy: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  confirmDisabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['confirm', 'cancel', 'close']);

const dialogId = Math.random().toString(36).slice(2, 10);
const titleId = `confirm-dialog-title-${dialogId}`;
const descriptionId = `confirm-dialog-description-${dialogId}`;

const variantConfig = computed(() => {
  const config = {
    danger: {
      icon: 'fas fa-trash-alt',
      eyebrow: 'Irreversible Action',
      iconBoxClasses: 'border-red-200 bg-red-50 text-red-600',
      confirmButtonClasses: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
    },
    warning: {
      icon: 'fas fa-circle-exclamation',
      eyebrow: 'System Message',
      iconBoxClasses: 'border-amber-200 bg-amber-50 text-amber-600',
      confirmButtonClasses: 'bg-[#2F2E8B] hover:opacity-90 focus-visible:ring-[#2F2E8B]',
    },
    info: {
      icon: 'fas fa-circle-info',
      eyebrow: 'System Message',
      iconBoxClasses: 'border-[#2F2E8B]/20 bg-[#2F2E8B]/5 text-[#2F2E8B]',
      confirmButtonClasses: 'bg-[#2F2E8B] hover:opacity-90 focus-visible:ring-[#2F2E8B]',
    },
    neutral: {
      icon: 'fas fa-circle-info',
      eyebrow: 'System Message',
      iconBoxClasses: 'border-gray-200 bg-gray-50 text-gray-600',
      confirmButtonClasses: 'bg-gray-900 hover:bg-gray-800 focus-visible:ring-gray-500',
    },
  };

  return config[props.variant] || config.danger;
});

const eyebrow = computed(() => props.eyebrow || variantConfig.value.eyebrow);
const iconClass = computed(() => variantConfig.value.icon);
const iconBoxClasses = computed(() => variantConfig.value.iconBoxClasses);
const confirmButtonClasses = computed(() => variantConfig.value.confirmButtonClasses);

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
  emit('close');
};

const handleClose = () => {
  emit('close');
};
</script>
