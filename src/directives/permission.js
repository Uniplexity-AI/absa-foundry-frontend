export const permissionDirective = {
  mounted(el, binding) {
    const { entity, action } = binding.value;
    
    // Dynamically import the store to avoid initialization issues
    import('@/stores/auth').then(({ useAuthStore }) => {
      const authStore = useAuthStore();
      
      if (!authStore.hasPermission(entity, action)) {
        // Remove the element from the DOM
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        } else {
          el.style.display = 'none';
        }
      }
    });
  }
};
