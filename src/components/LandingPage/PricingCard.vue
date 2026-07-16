<template>
  <div
    class="bg-white border rounded-2xl p-6 shadow-lg text-center animate-fadeInUp hover-scale"
    :class="highlighted ? 'border-blue-500 shadow-blue-200' : 'border-gray-200'"
    :style="`animation-delay: ${delay}s;`"
  >
    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-3xl font-bold text-blue-500 mb-4">{{ price }}</p>
    <ul class="text-gray-700 space-y-2 mb-6">
      <li v-for="(feature, i) in features" :key="i">{{ feature }}</li>
    </ul>
    <router-link
      to="/terms-acceptance"
      class="bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-blue-600 transition inline-block"
    >
      {{ cta }}
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  price: String,
  features: Array,
  highlighted: Boolean,
  cta: String,
  delay: Number
});
</script>

<style scoped></style>
