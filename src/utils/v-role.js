import { useAuthStore } from '@/stores/auth'

/**
 * v-role directive — hides an element if the current user does not have
 * at least one of the required roles.
 *
 * Usage:
 *   <button v-role="'ADMIN'">Delete</button>
 *   <button v-role="['ADMIN', 'OPERATIONS']">Delete</button>
 */
export default {
  mounted(el, binding) {
    const authStore = useAuthStore()
    const required = Array.isArray(binding.value) ? binding.value : [binding.value]
    const userRoles = authStore.roles

    const hasAccess = required.some(r => userRoles.includes(r))
    if (!hasAccess) {
      el.parentNode?.removeChild(el)
    }
  },

  updated(el, binding) {
    const authStore = useAuthStore()
    const required = Array.isArray(binding.value) ? binding.value : [binding.value]
    const userRoles = authStore.roles

    const hasAccess = required.some(r => userRoles.includes(r))
    if (!hasAccess && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  },
}