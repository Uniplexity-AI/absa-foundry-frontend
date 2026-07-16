<template>
  <div 
    v-if="showIndicator"
    class="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
    :class="statusClass"
  >
    <!-- Status Icon -->
    <div class="flex items-center gap-2">
      <div 
        class="w-3 h-3 rounded-full animate-pulse"
        :class="dotClass"
      ></div>
      <span class="font-medium">{{ statusText }}</span>
    </div>

    <!-- Pending Operations Count -->
    <div 
      v-if="!isOnline && pendingCount > 0"
      class="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded text-sm font-semibold"
    >
      {{ pendingCount }} pending
    </div>

    <!-- Sync Button -->
    <button
      v-if="!isOnline && pendingCount > 0"
      @click="attemptSync"
      :disabled="isSyncing"
      class="ml-2 px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isSyncing ? 'Syncing...' : 'Retry Sync' }}
    </button>

    <!-- Close Button -->
    <button
      v-if="isDismissible"
      @click="dismiss"
      class="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
      aria-label="Dismiss"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import offlineSyncManager from '@/utils/offlineSync.js';

const props = defineProps({
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
  },
  autoDismiss: {
    type: Boolean,
    default: false
  },
  dismissTimeout: {
    type: Number,
    default: 5000
  },
  showWhenOnline: {
    type: Boolean,
    default: false
  }
});

const isOnline = ref(navigator.onLine);
const pendingCount = ref(0);
const isSyncing = ref(false);
const isDismissed = ref(false);
let dismissTimer = null;
let syncCheckInterval = null;

const showIndicator = computed(() => {
  if (isDismissed.value) return false;
  if (isOnline.value && !props.showWhenOnline) return false;
  return true;
});

const statusClass = computed(() => {
  return isOnline.value 
    ? 'bg-green-500 text-white' 
    : 'bg-orange-500 text-white';
});

const dotClass = computed(() => {
  return isOnline.value 
    ? 'bg-green-200' 
    : 'bg-orange-200';
});

const statusText = computed(() => {
  if (isOnline.value) return 'Online';
  if (isSyncing.value) return 'Syncing...';
  return 'Offline Mode';
});

const isDismissible = computed(() => {
  return props.autoDismiss && isOnline.value;
});

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
  console.log(`📡 Network status changed: ${isOnline.value ? 'Online' : 'Offline'}`);
  
  if (isOnline.value) {
    // When coming online, trigger sync automatically
    attemptSync();
    
    // Auto-dismiss after timeout if configured
    if (props.autoDismiss) {
      dismissTimer = setTimeout(() => {
        isDismissed.value = true;
      }, props.dismissTimeout);
    }
  } else {
    // Clear dismiss timer when going offline
    if (dismissTimer) {
      clearTimeout(dismissTimer);
      dismissTimer = null;
    }
    isDismissed.value = false;
  }
};

const updatePendingCount = async () => {
  try {
    const syncStatus = await offlineSyncManager.getSyncStatus();
    pendingCount.value = syncStatus.pendingOperations + syncStatus.pendingTransactions;
  } catch (error) {
    console.error('Failed to get pending count:', error);
  }
};

const attemptSync = async () => {
  if (!isOnline.value || isSyncing.value) return;
  
  isSyncing.value = true;
  try {
    await offlineSyncManager.syncNow();
    await updatePendingCount();
    console.log('✅ Manual sync completed');
  } catch (error) {
    console.error('Manual sync failed:', error);
  } finally {
    isSyncing.value = false;
  }
};

const dismiss = () => {
  isDismissed.value = true;
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }
};

onMounted(() => {
  // Listen for online/offline events
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial pending count update
  updatePendingCount();
  
  // Periodically check pending count
  syncCheckInterval = setInterval(updatePendingCount, 10000); // Every 10 seconds
  
  // Listen for custom sync events
  window.addEventListener('offline-sync-complete', updatePendingCount);
  window.addEventListener('offline-data-queued', updatePendingCount);
});

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus);
  window.removeEventListener('offline', updateOnlineStatus);
  window.removeEventListener('offline-sync-complete', updatePendingCount);
  window.removeEventListener('offline-data-queued', updatePendingCount);
  
  if (dismissTimer) {
    clearTimeout(dismissTimer);
  }
  if (syncCheckInterval) {
    clearInterval(syncCheckInterval);
  }
});

// Watch for online status changes to reset dismissal
watch(isOnline, (newValue) => {
  if (!newValue) {
    isDismissed.value = false;
  }
});
</script>

<style scoped>
/* Additional animations */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fixed {
  animation: slideIn 0.3s ease-out;
}
</style>
