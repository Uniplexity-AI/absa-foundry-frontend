/**
 * Network Status Composable
 * Tracks online/offline status and sync state with the OfflineSyncManager.
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import offlineSyncManager from '@/utils/offlineSync.js';
import inventoryDB from '@/utils/indexedDB.js';

export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine);
  const syncStatus = ref({
    isSyncing: false,
    pendingOperations: 0,
    unsyncedTransactions: 0,
    unsyncedStockChanges: 0,
    pendingInventoryItems: 0,
    pendingCustomers: 0,
    totalPending: 0
  });
  const lastSyncAttempt = ref(null);
  const lastSuccessfulSync = ref(null);
  const syncError = ref(null);

  // Computed
  const isOffline = computed(() => !isOnline.value);
  const hasPendingSync = computed(() => syncStatus.value.totalPending > 0);
  const canSync = computed(() => isOnline.value && hasPendingSync.value);

  /**
   * Update online status and trigger sync if reconnecting
   */
  const updateOnlineStatus = () => {
    const wasOffline = !isOnline.value;
    isOnline.value = navigator.onLine;
    
    // Auto-sync when coming back online
    if (wasOffline && isOnline.value) {
      forceSync();
    }
  };

  /**
   * Update sync status from IndexedDB + sync manager
   */
  const updateSyncStatus = async () => {
    try {
      const { getTenantId } = await import('@/services/decodeJWT.js');
      const tenantId = getTenantId?.();
      
      if (!tenantId) return;

      const [pendingOps, unsyncedTxs, unsyncedStock, allInventory, unsyncedCustomers] = await Promise.all([
        inventoryDB.getPendingOperations(),
        inventoryDB.getUnsyncedTransactions(tenantId),
        inventoryDB.getUnsyncedStockChanges?.() || Promise.resolve([]),
        inventoryDB.getAllInventory(tenantId),
        inventoryDB.getUnsyncedCustomers(tenantId)
      ]);

      const pendingInventory = allInventory.filter(item => item.syncStatus === 'pending');

      syncStatus.value = {
        isSyncing: offlineSyncManager.isSyncing,
        pendingOperations: pendingOps.length,
        unsyncedTransactions: unsyncedTxs.length,
        unsyncedStockChanges: unsyncedStock.length,
        pendingInventoryItems: pendingInventory.length,
        pendingCustomers: unsyncedCustomers.length,
        totalPending: pendingOps.length + unsyncedTxs.length + unsyncedStock.length + pendingInventory.length + unsyncedCustomers.length
      };
    } catch (err) {
      console.warn('[useNetworkStatus] Could not update sync status:', err);
    }
  };

  /**
   * Force sync now — delegates to OfflineSyncManager
   */
  const forceSync = async () => {
    if (!isOnline.value) return false;
    
    lastSyncAttempt.value = new Date().toISOString();
    syncError.value = null;

    try {
      await offlineSyncManager.startSync();
      lastSuccessfulSync.value = new Date().toISOString();
      await updateSyncStatus();
      return true;
    } catch (err) {
      syncError.value = err.message || 'Sync failed';
      console.error('[useNetworkStatus] Force sync failed:', err);
      return false;
    }
  };

  /**
   * Show offline toast notification
   */
  const showOfflineNotification = (message = 'You are currently offline.') => {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'offline-toast';
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f59e0b;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease;
      ">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <span>${message}</span>
      </div>
    `;

    // Add animation keyframes
    if (!document.getElementById('offline-toast-styles')) {
      const style = document.createElement('style');
      style.id = 'offline-toast-styles';
      style.innerHTML = `
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Remove after 4 seconds
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  /**
   * Request notification permission
   */
  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  // Lifecycle — track online/offline + sync status
  let networkDebounceTimer = null;
  const debouncedUpdateOnlineStatus = () => {
    clearTimeout(networkDebounceTimer);
    networkDebounceTimer = setTimeout(updateOnlineStatus, 500);
  };

  onMounted(async () => {
    window.addEventListener('online', debouncedUpdateOnlineStatus);
    window.addEventListener('offline', debouncedUpdateOnlineStatus);

    // Listen for sync manager events to keep status up-to-date
    const removeListener = offlineSyncManager.addListener((event) => {
      if (event.type === 'syncStart') {
        syncStatus.value.isSyncing = true;
      } else if (event.type === 'syncComplete') {
        syncStatus.value.isSyncing = false;
        if (event.success) {
          lastSuccessfulSync.value = new Date().toISOString();
        } else {
          syncError.value = event.error?.message || 'Sync failed';
        }
        updateSyncStatus();
      } else if (event.type === 'conflictsDetected') {
        syncStatus.value.isSyncing = false;
        updateSyncStatus();
      }
    });

    // Initial sync status
    await updateSyncStatus();

    // Store cleanup function
    window.__offlineStatusCleanup = removeListener;
  });

  onUnmounted(() => {
    window.removeEventListener('online', debouncedUpdateOnlineStatus);
    window.removeEventListener('offline', debouncedUpdateOnlineStatus);

    // Clean up sync listener
    if (typeof window.__offlineStatusCleanup === 'function') {
      window.__offlineStatusCleanup();
    }
  });

  return {
    // State
    isOnline,
    isOffline,
    syncStatus,
    lastSyncAttempt,
    lastSuccessfulSync,
    syncError,
    hasPendingSync,
    canSync,

    // Methods
    updateOnlineStatus,
    updateSyncStatus,
    forceSync,
    showOfflineNotification,
    requestNotificationPermission
  };
}
