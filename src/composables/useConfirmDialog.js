import { ref } from 'vue';

const defaultConfirmState = {
  title: 'Confirm Action',
  message: '',
  detail: '',
  variant: 'danger',
  eyebrow: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  busyLabel: 'Working...',
  showCancel: true,
  confirmDisabled: false,
  onConfirm: null,
  onCancel: null,
  onClose: null,
  onError: null,
};

export function useConfirmDialog() {
  const confirmState = ref(null);

  const openConfirm = (options = {}) => {
    confirmState.value = {
      ...defaultConfirmState,
      ...options,
    };
  };

  const clearConfirm = () => {
    const current = confirmState.value;
    confirmState.value = null;
    current?.onClose?.();
  };

  const cancelConfirm = () => {
    const current = confirmState.value;
    confirmState.value = null;
    current?.onCancel?.();
    current?.onClose?.();
  };

  const confirmAction = async () => {
    const current = confirmState.value;
    if (!current) return;

    confirmState.value = null;

    try {
      await current.onConfirm?.();
    } catch (error) {
      current.onError?.(error);
      throw error;
    }
  };

  return {
    confirmState,
    openConfirm,
    clearConfirm,
    cancelConfirm,
    confirmAction,
  };
}