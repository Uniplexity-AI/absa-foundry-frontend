import { useAuthStore } from '@/stores/auth';

export default {
  mounted(el, binding) {
    const { value } = binding;
    const authStore = useAuthStore();
    const userRole = authStore.userRole;
    if (!value.includes(userRole)) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
}; 