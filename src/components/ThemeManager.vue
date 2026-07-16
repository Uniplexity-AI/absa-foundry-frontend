<!-- src/components/ThemeManager.vue -->
<script setup>
import { ref, watchEffect, onMounted } from "vue";

const isDark = ref(false);

// Function to apply the theme
const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

// Function to check system theme
const detectSystemTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    isDark.value = storedTheme === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  applyTheme();
};

// Watch for theme changes
watchEffect(() => {
  applyTheme();
});

// Detect system changes dynamically
onMounted(() => {
  detectSystemTheme();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", detectSystemTheme);
});
</script>

<template>
  <button @click="isDark = !isDark" class="fixed bottom-4 left-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow">
    {{ isDark ? "🌙" : "☀️" }}
  </button>
</template>
