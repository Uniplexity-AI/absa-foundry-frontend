<template>
  <div class="relative inline-block text-left" ref="bellRef">
    <!-- Notification Bell Icon -->
    <button 
      @click="togglePopover" 
      class="w-10 h-10 rounded-sm bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all relative"
      aria-label="Notifications"
    >
      <i class="fas fa-bell text-sm"></i>
      <span 
        v-if="unreadCount > 0" 
        class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white"
      >
        {{ unreadCount }}
      </span>
    </button>

    <!-- Notification Popover -->
    <div 
      v-if="showPopover" 
      class="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-gray-200 shadow-xl z-50 overflow-hidden rounded-sm"
      style="max-height: 500px;"
    >
      <div class="absolute top-0 right-0 w-1.5 h-full bg-[#2F2E8B]"></div>
      
      <!-- Popover Header -->
      <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">SYSTEM // NOTIFICATIONS</span>
        </div>
        <button @click="markAllAsRead" v-if="unreadCount > 0" class="text-[9px] font-bold text-[#2F2E8B] hover:underline uppercase tracking-wider">
          Mark all as read
        </button>
      </div>

      <!-- Notification List -->
      <div class="overflow-y-auto max-h-[400px] custom-scrollbar">
        <div v-if="notifications.length === 0" class="p-8 text-center">
          <div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-bell-slash text-gray-300"></i>
          </div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">No notifications found</p>
        </div>
        
        <ul v-else class="divide-y divide-gray-50">
          <li 
            v-for="n in notifications" 
            :key="n.id" 
            class="p-4 hover:bg-gray-50 transition-colors cursor-pointer group relative"
            @click="handleNotificationClick(n)"
          >
            <div v-if="!n.read" class="absolute left-0 top-0 bottom-0 w-1 bg-[#2F2E8B]"></div>
            
            <div class="flex items-start gap-3">
              <div 
                class="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0"
                :class="n.read ? 'bg-gray-100 text-gray-400' : 'bg-indigo-50 text-[#2F2E8B]'"
              >
                <i :class="getCategoryIcon(n.category)"></i>
              </div>
              
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 mb-0.5">
                  <h4 class="text-xs font-bold uppercase tracking-tight" :class="n.read ? 'text-gray-500' : 'text-gray-900'">
                    {{ n.title }}
                  </h4>
                  <span class="text-[9px] font-mono text-gray-400 flex-shrink-0">
                    {{ formatTime(n.created_at) }}
                  </span>
                </div>
                <p class="text-[11px] leading-relaxed mb-2" :class="n.read ? 'text-gray-400' : 'text-gray-600'">
                  {{ n.message }}
                </p>
                <div class="flex items-center gap-2">
                  <button 
                    v-if="!n.read"
                    @click.stop="markAsRead(n.id)" 
                    class="text-[9px] font-bold text-[#2F2E8B] uppercase tracking-wider hover:underline"
                  >
                    Mark read
                  </button>
                  <button 
                    @click.stop="dismissNotification(n.id)" 
                    class="text-[9px] font-bold text-gray-400 uppercase tracking-wider hover:text-red-500"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Popover Footer -->
      <div class="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
        <router-link to="/dashboard/settings?tab=notifications" class="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-[#2F2E8B] transition-colors">
          Configure Alert Settings <i class="fas fa-cog ml-1"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { toast } from 'vue3-toastify';
import API_BASE_URL from '@/services/api';
import { decodeJWT } from '@/services/decodeJWT';

const { getTenantId } = decodeJWT();
const notifications = ref([]);
const showPopover = ref(false);
const bellRef = ref(null);
const pollingInterval = ref(null);

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length;
});

async function fetchNotifications(isPolling = false) {
  try {
    const tenantId = getTenantId();
    if (!tenantId) return;

    const res = await fetch(`${API_BASE_URL}/notifications?tenant_id=${tenantId}&limit=50`);
    if (!res.ok) return;

    const data = await res.json();
    const newNotifications = Array.isArray(data) ? data.map(n => ({ 
      id: n._id || n.id, 
      ...n,
      read: !!n.read 
    })) : [];

    // "Small Pop" Logic: If polling and we found a new unread notification that we didn't have before
    if (isPolling) {
      const existingIds = notifications.value.map(n => n.id);
      const newlyArrived = newNotifications.filter(n => !existingIds.includes(n.id) && !n.read);
      
      if (newlyArrived.length > 0) {
        // Show toast for the latest one
        const latest = newlyArrived[0];
        toast.info(`${latest.title}: ${latest.message}`, {
          autoClose: 5000,
          position: "bottom-right",
          onClick: () => {
            showPopover.value = true;
            markAsRead(latest.id);
          }
        });
      }
    }

    notifications.value = newNotifications;
  } catch (e) {
    console.error('Failed to fetch notifications:', e);
  }
}

async function markAsRead(id) {
  try {
    const tenantId = getTenantId();
    await fetch(`${API_BASE_URL}/notifications/${id}/read?tenant_id=${tenantId}`, { method: 'POST' });
    
    // Update locally
    const n = notifications.value.find(notif => notif.id === id);
    if (n) n.read = true;
  } catch (e) {
    console.error('Failed to mark as read:', e);
  }
}

async function dismissNotification(id) {
  try {
    const tenantId = getTenantId();
    await fetch(`${API_BASE_URL}/notifications/${id}/dismiss?tenant_id=${tenantId}`, { method: 'POST' });
    
    // Remove locally
    notifications.value = notifications.value.filter(n => n.id !== id);
  } catch (e) {
    console.error('Failed to dismiss notification:', e);
  }
}

async function markAllAsRead() {
  try {
    const tenantId = getTenantId();
    // Assuming backend has this endpoint, otherwise loop
    await fetch(`${API_BASE_URL}/notifications/read-all?tenant_id=${tenantId}`, { method: 'POST' }).catch(() => {});
    
    // Batch loop as fallback or just set all locally
    for (const n of notifications.value) {
      if (!n.read) await markAsRead(n.id);
    }
  } catch (e) {
    console.error('Failed to mark all as read:', e);
  }
}

function handleNotificationClick(n) {
  if (!n.read) markAsRead(n.id);
  // Optionally navigate based on metadata
  if (n.metadata && n.metadata.route) {
    showPopover.value = false;
    // router.push(n.metadata.route);
  }
}

function togglePopover() {
  showPopover.value = !showPopover.value;
  if (showPopover.value) {
    fetchNotifications();
  }
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'crm': return 'fas fa-users';
    case 'inventory': return 'fas fa-boxes';
    case 'finance': return 'fas fa-money-bill-wave';
    case 'hr': return 'fas fa-user-tie';
    default: return 'fas fa-info-circle';
  }
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function handleClickOutside(event) {
  if (bellRef.value && !bellRef.value.contains(event.target)) {
    showPopover.value = false;
  }
}

onMounted(() => {
  fetchNotifications();
  document.addEventListener('mousedown', handleClickOutside);
  // Poll for new notifications every 60 seconds
  pollingInterval.value = setInterval(() => fetchNotifications(true), 60000);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  if (pollingInterval.value) clearInterval(pollingInterval.value);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
