<template>
  <button
    v-show="visible"
    class="back-to-top"
    @click="scrollTop"
    aria-label="Back to top"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
const threshold = 240 // px before showing the button

const onScroll = () => {
  visible.value = window.scrollY > threshold
}

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  width: 3rem;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #2F2E8B; /* theme blue */
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  z-index: 60; /* above decorative background, below modals */
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
}

.back-to-top:active {
  transform: translateY(0);
}

.back-to-top i {
  font-size: 1rem;
}

/* Responsive sizing */
@media (max-width: 640px) {
  .back-to-top {
    right: 0.9rem;
    bottom: 0.9rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  .back-to-top i {
    font-size: 0.9rem;
  }
}
</style>
