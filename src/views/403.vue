<template>
  <div class="text-center mt-[10vh] p-8 bg-white min-h-screen">
    <h1 class="text-8xl font-light text-gray-900">403</h1>
    <h2 class="text-3xl font-light text-gray-700 mb-4">Unauthorized Access</h2>
    <p class="text-gray-500 font-light mb-8">You do not have permission to view this page.</p>
    <router-link 
      to="/dashboard" 
      class="text-[#2F2E8B] hover:text-[#1D226B] font-light hover:underline transition-colors"
    >
      Go to Dashboard
    </router-link>
  </div>
</template>
