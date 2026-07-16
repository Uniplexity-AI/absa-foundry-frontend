import { useAuthStore } from '@/store/auth_store';

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