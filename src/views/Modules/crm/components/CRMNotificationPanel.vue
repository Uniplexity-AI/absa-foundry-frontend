<template>
  <div class="relative" ref="panelRoot">
    <!-- Bell Button -->
    <button
      @click="togglePanel"
      class="relative flex items-center justify-center w-9 h-9 border border-gray-200 bg-white hover:border-[#2F2E8B] hover:bg-blue-50 transition-all"
      :class="isOpen ? 'border-[#2F2E8B] bg-blue-50' : ''"
      title="CRM Notifications"
    >
      <Bell :size="16" class="text-gray-600" :class="isOpen ? 'text-[#2F2E8B]' : ''" />
      <!-- Unread badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-mono font-black rounded-full flex items-center justify-center px-1 leading-none"
      >{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <!-- Dropdown Panel -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-[420px] bg-white border border-gray-200 shadow-2xl z-50 flex flex-col max-h-[600px]"
        style="transform-origin: top right"
      >
        <!-- Panel Header -->
        <div class="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between gap-3 shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-1 h-4 bg-[#2F2E8B]"></div>
            <span class="text-[11px] font-mono font-black text-gray-900 uppercase tracking-widest">CRM_NOTIFICATIONS</span>
            <span v-if="unreadCount > 0" class="bg-red-50 border border-red-200 text-red-600 text-[9px] font-mono font-black px-2 py-0.5 uppercase tracking-widest">{{ unreadCount }} UNREAD</span>
          </div>
          <div class="flex items-center gap-1.5">
            <button @click="refresh" :disabled="loading" class="p-1.5 text-gray-400 hover:text-[#2F2E8B] transition-colors" title="Refresh">
              <RefreshCw :size="12" :class="loading ? 'animate-spin' : ''" />
            </button>
            <button @click="markAllRead" :disabled="unreadCount === 0" class="text-[8px] font-mono font-black uppercase tracking-widest text-[#2F2E8B] hover:underline disabled:text-gray-300 disabled:no-underline px-1">
              MARK_ALL_READ
            </button>
            <button @click="isOpen = false" class="p-1 text-gray-400 hover:text-gray-700 transition-colors">
              <X :size="14" />
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-100 shrink-0">
          <button
            v-for="tab in ['all', 'unread']"
            :key="tab"
            @click="activeTab = tab"
            class="flex-1 py-2.5 text-[9px] font-mono font-black uppercase tracking-widest transition-colors"
            :class="activeTab === tab ? 'text-[#2F2E8B] border-b-2 border-[#2F2E8B] bg-blue-50/50' : 'text-gray-400 hover:text-gray-700'"
          >
            {{ tab === 'all' ? `ALL (${notifications.length})` : `UNREAD (${unreadCount})` }}
          </button>
          <!-- Priority filter -->
          <div class="flex items-center px-3 gap-1 border-l border-gray-100">
            <span class="text-[8px] font-mono text-gray-400 uppercase tracking-widest">TYPE:</span>
            <select v-model="filterType" class="text-[8px] font-mono font-black uppercase text-gray-700 border-0 bg-transparent focus:outline-none cursor-pointer">
              <option value="">ALL</option>
              <option v-for="t in notifTypes" :key="t.value" :value="t.value">{{ t.label }}</option>
            </select>
          </div>
        </div>

        <!-- Notification List -->
        <div class="overflow-y-auto flex-1 custom-scrollbar">
          <!-- Loading -->
          <div v-if="loading && notifications.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 :size="24" class="animate-spin text-[#2F2E8B]" />
            <span class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Loading_Notifications...</span>
          </div>

          <!-- Empty -->
          <div v-else-if="filteredNotifications.length === 0" class="flex flex-col items-center justify-center py-16 gap-3">
            <BellOff :size="32" class="text-gray-200" />
            <span class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">NO_NOTIFICATIONS</span>
            <span class="text-[9px] font-mono text-gray-300 uppercase tracking-widest">All clear — nothing to show</span>
          </div>

          <!-- Items -->
          <div v-else>
            <div
              v-for="notif in filteredNotifications"
              :key="notif.id"
              @click="handleNotifClick(notif)"
              class="group relative px-5 py-4 border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer"
              :class="notif.read ? 'opacity-70' : ''"
            >
              <!-- Unread dot + left bar -->
              <div class="absolute left-0 top-0 bottom-0 w-0.5" :class="statusBarClass(notif.status)"></div>
              <div v-if="!notif.read" class="absolute right-5 top-4 w-2 h-2 rounded-full bg-[#2F2E8B]"></div>

              <div class="flex items-start gap-3 pr-4">
                <!-- Type icon -->
                <div class="shrink-0 w-8 h-8 flex items-center justify-center rounded-sm mt-0.5" :class="iconBgClass(notif.status)">
                  <component :is="statusIcon(notif.status)" :size="14" :class="iconColorClass(notif.status)" />
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between gap-2 mb-0.5">
                    <span class="text-[10px] font-mono font-black text-gray-900 uppercase tracking-wide truncate" :class="notif.read ? '' : 'text-[#2F2E8B]'">
                      {{ notif.title }}
                    </span>
                    <span class="text-[8px] font-mono text-gray-400 shrink-0">{{ timeAgo(notif.created_at) }}</span>
                  </div>
                  <p class="text-[9px] font-mono text-gray-500 leading-relaxed line-clamp-2">{{ notif.message }}</p>

                  <!-- Actions (show on hover) -->
                  <div class="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      v-if="!notif.read"
                      @click.stop="markRead(notif)"
                      class="text-[8px] font-mono font-black uppercase tracking-widest text-[#2F2E8B] hover:underline flex items-center gap-1"
                    >
                      <CheckCircle2 :size="9" /> MARK_READ
                    </button>
                    <button
                      @click.stop="dismiss(notif)"
                      class="text-[8px] font-mono font-black uppercase tracking-widest text-gray-400 hover:text-red-500 hover:underline flex items-center gap-1"
                    >
                      <X :size="9" /> DISMISS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel Footer -->
        <div class="px-5 py-3 border-t border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/50">
          <span class="text-[8px] font-mono text-gray-400 uppercase tracking-widest">
            {{ notifications.length }} total · auto-refreshes every 30s
          </span>
          <button
            @click="clearAll"
            :disabled="notifications.length === 0"
            class="text-[8px] font-mono font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:underline disabled:text-gray-300 disabled:no-underline flex items-center gap-1"
          >
            <Trash2 :size="9" /> CLEAR_ALL
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import {
  Bell, BellOff, X, RefreshCw, Loader2, CheckCircle2, Trash2,
  UserPlus, TrendingUp, Briefcase, CalendarCheck, CalendarX,
  MapPin, Clock, MessageSquare, StickyNote, Building2, PhoneCall,
  AlertTriangle, Info
} from 'lucide-vue-next';
import crmApi from '@/services/crm_api.js';

const props = defineProps({
  tenantId: { type: String, required: true }
});

const isOpen = ref(false);
const loading = ref(false);
const notifications = ref([]);
const activeTab = ref('all');
const filterType = ref('');
const panelRoot = ref(null);

let pollTimer = null;

const notifTypes = [
  { value: 'lead_assigned', label: 'LEAD' },
  { value: 'deal_created', label: 'DEAL' },
  { value: 'deal_stage_changed', label: 'STAGE' },
  { value: 'visit_scheduled', label: 'VISIT' },
  { value: 'follow_up_due', label: 'FOLLOW_UP' },
  { value: 'communication', label: 'COMMS' },
];

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

const filteredNotifications = computed(() => {
  let list = notifications.value;
  if (activeTab.value === 'unread') list = list.filter(n => !n.read);
  if (filterType.value) list = list.filter(n => n.status === filterType.value);
  return list;
});

async function loadNotifications() {
  if (!props.tenantId) return;
  loading.value = true;
  try {
    const result = await crmApi.getNotifications(props.tenantId, { category: 'crm', limit: 100 });
    notifications.value = Array.isArray(result) ? result : (result?.items || result?.data || []);
  } catch (e) {
    console.error('[CRMNotificationPanel] Failed to load:', e);
  } finally {
    loading.value = false;
  }
}

async function refresh() {
  await loadNotifications();
  try { await crmApi.scanCrmNotifications(props.tenantId); } catch (e) { /* non-fatal */ }
}

async function markRead(notif) {
  try {
    await crmApi.markNotificationRead(notif.id, props.tenantId);
    notif.read = true;
  } catch (e) { console.error(e); }
}

async function markAllRead() {
  try {
    await crmApi.markAllNotificationsRead(props.tenantId);
    notifications.value.forEach(n => { n.read = true; });
  } catch (e) { console.error(e); }
}

async function dismiss(notif) {
  try {
    await crmApi.dismissNotification(notif.id, props.tenantId);
    notifications.value = notifications.value.filter(n => n.id !== notif.id);
  } catch (e) { console.error(e); }
}

async function clearAll() {
  try {
    await crmApi.dismissAllNotifications(props.tenantId);
    notifications.value = [];
  } catch (e) { console.error(e); }
}

function handleNotifClick(notif) {
  if (!notif.read) markRead(notif);
}

function togglePanel() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) loadNotifications();
}

// Close on outside click
function handleOutsideClick(e) {
  if (panelRoot.value && !panelRoot.value.contains(e.target)) {
    isOpen.value = false;
  }
}

// Status → left bar color
function statusBarClass(status) {
  const map = {
    lead_assigned: 'bg-blue-500',
    deal_created: 'bg-indigo-500',
    deal_stage_changed: 'bg-purple-500',
    visit_scheduled: 'bg-teal-500',
    follow_up_due: 'bg-amber-500',
    communication: 'bg-gray-400',
    meeting_reminder: 'bg-emerald-500',
    meeting_missed: 'bg-red-500',
  };
  return map[status] || 'bg-gray-300';
}

// Status → icon background
function iconBgClass(status) {
  const map = {
    lead_assigned: 'bg-blue-50',
    deal_created: 'bg-indigo-50',
    deal_stage_changed: 'bg-purple-50',
    visit_scheduled: 'bg-teal-50',
    follow_up_due: 'bg-amber-50',
    communication: 'bg-gray-100',
    meeting_reminder: 'bg-emerald-50',
    meeting_missed: 'bg-red-50',
  };
  return map[status] || 'bg-gray-100';
}

// Status → icon color
function iconColorClass(status) {
  const map = {
    lead_assigned: 'text-blue-500',
    deal_created: 'text-indigo-500',
    deal_stage_changed: 'text-purple-500',
    visit_scheduled: 'text-teal-500',
    follow_up_due: 'text-amber-500',
    communication: 'text-gray-500',
    meeting_reminder: 'text-emerald-500',
    meeting_missed: 'text-red-500',
  };
  return map[status] || 'text-gray-400';
}

// Status → lucide icon component
function statusIcon(status) {
  const map = {
    lead_assigned: UserPlus,
    deal_created: Briefcase,
    deal_stage_changed: TrendingUp,
    visit_scheduled: MapPin,
    follow_up_due: Clock,
    communication: MessageSquare,
    meeting_reminder: CalendarCheck,
    meeting_missed: CalendarX,
    account_updated: Building2,
    note_added: StickyNote,
    call_follow_up_due: PhoneCall,
  };
  return map[status] || Info;
}

// Time ago
function timeAgo(isoString) {
  if (!isoString) return '';
  const diff = Date.now() - new Date(isoString).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
  loadNotifications();
  // Poll every 30 seconds
  pollTimer = setInterval(loadNotifications, 30000);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
  if (pollTimer) clearInterval(pollTimer);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #2F2E8B; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
select { appearance: none; -webkit-appearance: none; }
</style>
