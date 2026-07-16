<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Clear authentication data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tenantId');
  
  // Redirect to login
  router.push('/login');
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-600">Logging out...</p>
    </div>
  </div>
</template>