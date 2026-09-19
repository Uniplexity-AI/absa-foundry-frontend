import { _ as _export_sfc, G as useRBAC, l as useAuthStore, i as computed, r as ref, f as onMounted, H as onUnmounted, I as BASE_URL, J as decodeJWT, c as createElementBlock, b as createBaseVNode, C as createBlock, w as withCtx, j as createCommentVNode, t as toDisplayString, x as withDirectives, y as vModelText, s as unref, K as withKeys, A as createTextVNode, F as Fragment, e as renderList, v as withModifiers, a as createStaticVNode, q as createVNode, D as resolveComponent, u as useRouter, E as useRoute, o as openBlock } from './index-DX7cgo_Y.js';
import { useSnapshotStore } from './snapshotStore-CF8KuLqG.js';

/** ABSA Customer Lifecycle Intelligence module registry. */

const BASE_ROUTE = '/dashboard';

const MODULE_CARDS = [
  { id: 'portfolio', emoji: '📊', icon: 'fas fa-chart-line', title: 'Customer Portfolio', desc: 'Monitor customer lifecycle, churn risk, and retention opportunities.', free: true, route: `${BASE_ROUTE}/portfolio` },
  { id: 'etl', emoji: '🔄', icon: 'fas fa-database', title: 'Data Pipeline', desc: 'Monitor ETL runs, data quality, and source freshness.', free: true, route: `${BASE_ROUTE}/etl-pipeline` },
  { id: 'models', emoji: '🧠', icon: 'fas fa-brain', title: 'Model Monitoring', desc: 'Monitor lifecycle prediction model performance and drift.', free: true, route: `${BASE_ROUTE}/models` },
  { id: 'ai', emoji: '🤖', icon: 'fas fa-robot', title: 'ABSA AI Assistant', desc: 'Get customer insights and retention recommendations.', free: true, route: `${BASE_ROUTE}/ai` },
  { id: 'crm', emoji: '🧑‍💼', icon: 'fas fa-address-book', title: 'Customer Engagement', desc: 'Manage customer interactions and action plans.', free: true, route: `${BASE_ROUTE}/crm` },
  { id: 'branch-manager', emoji: '🏢', icon: 'fas fa-building', title: 'Branch Manager', desc: 'Review branch-level performance and churn risk.', free: true, route: `${BASE_ROUTE}/branch-manager` },
  { id: 'subaccounts', emoji: '👥', icon: 'fas fa-users-cog', title: 'User Management', desc: 'Manage users, roles, branches, and access to customer intelligence.', free: true, route: `${BASE_ROUTE}/subaccounts` },
  { id: 'settings', emoji: '⚙️', icon: 'fas fa-cogs', title: 'Settings', desc: 'Manage access, branches, and user preferences.', free: true, route: `${BASE_ROUTE}/settings` },
];

function getModuleCards() { return [...MODULE_CARDS]; }

MODULE_CARDS.map(({ id, title }) => ({
  id,
  title,
  requiresSubscription: false,
}));

const _hoisted_1 = { class: "absa-dashboard-layout" };
const _hoisted_2 = { class: "absa-main" };
const _hoisted_3 = { class: "dark:bg-surface text-primary dark:text-inverse-primary border-b border-outline-variant dark:border-outline flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 fixed top-0 left-0 right-0 z-40 bg-white" };
const _hoisted_4 = { class: "relative group" };
const _hoisted_5 = { class: "absolute left-0 top-full mt-2 w-64 bg-white/20 backdrop-blur-xl border border-white/20 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out z-50 before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-['']" };
const _hoisted_6 = { class: "flex flex-col p-2" };
const _hoisted_7 = {
  key: 3,
  class: "px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400"
};
const _hoisted_8 = {
  key: 11,
  class: "px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400"
};
const _hoisted_9 = { class: "hidden md:flex items-center flex-1 ml-4" };
const _hoisted_10 = { class: "text-headline-lg font-headline-lg text-primary" };
const _hoisted_11 = { class: "flex items-center gap-4" };
const _hoisted_12 = { class: "hidden md:flex items-center gap-2 text-xs text-gray-500" };
const _hoisted_13 = { class: "hidden md:flex relative w-96" };
const _hoisted_14 = {
  key: 0,
  class: "absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#DC0037] text-white text-[9px] font-bold rounded-full flex items-center justify-center"
};
const _hoisted_15 = ["aria-expanded"];
const _hoisted_16 = { class: "absa-topbar__avatar" };
const _hoisted_17 = { class: "hidden md:block text-left" };
const _hoisted_18 = { class: "text-body-md font-body-md font-semibold" };
const _hoisted_19 = { class: "text-label-sm font-label-sm text-secondary" };
const _hoisted_20 = {
  key: 0,
  role: "menu",
  class: "absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-xl z-50"
};
const _hoisted_21 = { class: "px-4 py-3 border-b border-gray-200" };
const _hoisted_22 = { class: "text-xs font-bold text-absa-enrich truncate" };
const _hoisted_23 = { class: "text-[11px] text-gray-500 truncate mt-0.5" };
const _hoisted_24 = { class: "inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-absa-passion border border-gray-200 rounded-sm px-2 py-0.5" };
const _hoisted_25 = {
  key: 0,
  class: "fixed top-16 right-6 z-50 w-96 bg-white border border-gray-200 shadow-xl"
};
const _hoisted_26 = { class: "max-h-96 overflow-y-auto" };
const _hoisted_27 = {
  key: 0,
  class: "px-4 py-8 text-center text-xs text-gray-500"
};
const _hoisted_28 = ["onClick"];
const _hoisted_29 = { class: "flex items-start gap-2" };
const _hoisted_30 = { class: "material-symbols-outlined text-[16px] text-absa-passion mt-0.5" };
const _hoisted_31 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_32 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_33 = { class: "relative w-full max-w-md bg-white border border-gray-200 shadow-2xl" };
const _hoisted_34 = { class: "px-5 py-4 border-b border-gray-200 flex items-center justify-between" };
const _hoisted_35 = { class: "absa-content pt-14" };


const _sfc_main = {
  __name: 'DashboardLayout',
  setup(__props) {

const router = useRouter();
const route = useRoute();
const { hasPermission, isSuperAdmin } = useRBAC();
const snapshotStore = useSnapshotStore();
const authStore = useAuthStore();

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
});

// ── Header: search / notifications / help / account menu ──
const searchQuery = ref('');
const showNotifications = ref(false);
const showHelp = ref(false);
const showUserMenu = ref(false);
const userMenuRef = ref(null);

const notifications = ref([
  { title: 'High churn risk flagged', body: 'Customer CUST00421 has a 91% churn probability.', icon: 'warning', to: '/dashboard/customer/CUST00421' },
  { title: 'Campaign cohort ready', body: '34 customers are eligible for the Digital Reactivation campaign.', icon: 'campaign', to: '/dashboard/lifecycle' },
  { title: 'Pilot data snapshot refreshed', body: 'Synthetic ABSA data as-of 2026-07-27 is loaded.', icon: 'database', to: '/dashboard/portfolio' },
]);
const notificationCount = computed(() => notifications.value.length);

function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
  showHelp.value = false;
  showUserMenu.value = false;
}

function openNotification(n) {
  showNotifications.value = false;
  if (n?.to) router.push(n.to);
}

function clearNotifications() {
  notifications.value = [];
}

// ── Snapshot (as-of) date selector ──
function onSnapshotDateChange() {
  snapshotStore.setDate(snapshotStore.selectedDate);
  // The chosen date is read by every store/view on fetch; a full reload is the
  // simplest way to guarantee the visible page re-queries with the new date.
  window.location.reload();
}

function openHelp() {
  showHelp.value = !showHelp.value;
  showNotifications.value = false;
  showUserMenu.value = false;
}

// ── Account menu (corner avatar) ──
function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
  if (showUserMenu.value) {
    showNotifications.value = false;
    showHelp.value = false;
  }
}

function onDocumentPointerDown(event) {
  if (!showUserMenu.value) return
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false;
  }
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape') showUserMenu.value = false;
}

async function submitSearch() {
  const q = (searchQuery.value || '').trim();
  if (!q) return
  // Customer ID patterns seen in the synthetic portfolio: CUST####, CU-####, CU####
  if (/^CUST?\d{2,}/i.test(q) || /^CU-?\d{2,}/i.test(q)) {
    router.push({ name: 'CustomerProfile', params: { id: q } });
  } else {
    // Free-text queries land on the My Customers list with the query pre-applied.
    router.push({ name: 'MyCustomers', query: { q } });
  }
  searchQuery.value = '';
}

// ── State ──

async function handleLogout() {
  showUserMenu.value = false;
  // Single canonical sign-out path (clears the session, revokes the token and
  // redirects) — see services/decodeJWT.js.
  await decodeJWT().logout();
}

// Restore saved preference on mount
onMounted(() => {
  fetchSubscribedModules();
  snapshotStore.fetchAvailable();
  document.addEventListener('pointerdown', onDocumentPointerDown);
  document.addEventListener('keydown', onDocumentKeydown);
});

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown);
  document.removeEventListener('keydown', onDocumentKeydown);
});

// ── User Info (ABSA roles: ADMIN / RELATIONSHIP_MANAGER / DATA_SCIENTIST / OPERATIONS) ──
const ROLE_LABELS = {
  ADMIN: 'Administrator',
  RELATIONSHIP_MANAGER: 'Relationship Manager',
  DATA_SCIENTIST: 'Data Scientist',
  OPERATIONS: 'Operations Analyst'
};


const userEmail = computed(() => authStore.email || 'User');

// Use authStore (roles array) for all access decisions
const canAnalytics = computed(() => authStore.isAdmin || authStore.isRM);
const canPredict   = computed(() => authStore.isAdmin || authStore.isRM || authStore.isDS);
const canModels    = computed(() => authStore.isAdmin || authStore.isDS);
const canEtl       = computed(() => authStore.isAdmin || authStore.isOps);
const canAdmin     = computed(() => authStore.isAdmin);

// Keep currentRole for display labels (uses first role)
const currentRole = computed(() => authStore.primaryRole || '');

const userName = computed(() => {
  if (authStore.displayName) return authStore.displayName
  const email = authStore.email || '';
  return email ? email.split('@')[0].replace(/[._]/g, ' ') : 'Absa User'
});

const userRole = computed(() => ROLE_LABELS[currentRole.value] || 'Relationship Manager');

const userInitials = computed(() => {
  const parts = String(userName.value).replace(/[()]/g, '').trim().split(/\s+/);
  const initials = ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
  return (initials || 'AU').toUpperCase()
});

computed(() => authStore.isAdmin);

// ── Dynamic Modules ──
const allModuleCards = getModuleCards();
const subscribedModules = ref([]);

// Filter: show modules the user is subscribed to, excluding primary nav items & admin pages
computed(() => {
  const primaryIds = ['dashboard', 'crm', 'portfolio'];
  const alwaysShow = ['profile', 'allshops', 'ai', 'image-capture', 'taxes', 'compliance', 'marketplace', 'hr-staff'];
  
  const filtered = allModuleCards.filter(card => {
    // Skip admin-only pages in normal dashboard
    if (card.adminPage) return false
    // Skip primary nav items
    if (primaryIds.includes(card.id)) return false
    // Always show free essentials
    if (alwaysShow.includes(card.id) && card.free) return true
    // Show if subscribed
    return subscribedModules.value.some(m => m.id === card.id)
  });

  // Deduplicate by id
  const seen = new Set();
  return filtered.filter(c => {
    if (seen.has(c.id)) return false
    seen.add(c.id);
    return true
  })
});

async function fetchSubscribedModules() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(`${BASE_URL}/modules-manager/owner/modules`, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return
    const data = await res.json();

    let moduleIds = [];
    if (data && Array.isArray(data.modules)) {
      moduleIds = data.modules;
    } else if (data?.subscribed_modules) {
      moduleIds = data.subscribed_modules;
    }

    const role = decodeJWT().getUserRole?.()?.toLowerCase();
    const cards = getModuleCards();

    if (role === 'owner' || isAdmin.value || isSuperAdmin.value) {
      subscribedModules.value = cards.filter(c => moduleIds.includes(c.id) || c.free === true);
    } else {
      subscribedModules.value = cards.filter(c => {
        if (c.free) return true
        if (!moduleIds.includes(c.id)) return false
        let permEntity = c.id;
        if (c.id === 'supplier') permEntity = 'suppliers';
        if (c.id === 'hr-dashboard' || c.id === 'hrmodule') permEntity = 'hrmodule';
        return hasPermission(permEntity, 'read')
      });
    }
  } catch (e) {
    console.warn('Failed to fetch subscribed modules for sidebar:', e);
  }
}

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");
  const _component_router_view = resolveComponent("router-view");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("main", _hoisted_2, [
      createBaseVNode("header", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _cache[19] || (_cache[19] = createBaseVNode("button", { class: "text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center" }, [
            createBaseVNode("span", { class: "material-symbols-outlined" }, "menu")
          ], -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("nav", _hoisted_6, [
              (canAnalytics.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 0,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/portfolio",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[6] || (_cache[6] = [
                      createBaseVNode("span", {
                        class: "material-symbols-outlined text-[20px]",
                        style: {"font-variation-settings":"'FILL' 1"}
                      }, "dashboard", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Dashboard", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canAnalytics.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 1,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/customers",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[7] || (_cache[7] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "group", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "My Customers", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canEtl.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 2,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/branch-manager",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[8] || (_cache[8] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "store", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Branch Manager", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canPredict.value)
                ? (openBlock(), createElementBlock("div", _hoisted_7, "INTELLIGENCE"))
                : createCommentVNode("", true),
              (canPredict.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 4,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/customer-value",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[9] || (_cache[9] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "star", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Customer Value", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canPredict.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 5,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/lifecycle",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[10] || (_cache[10] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "waterfall_chart", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Lifecycle Prediction", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canPredict.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 6,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/balance-forecast",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[11] || (_cache[11] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "show_chart", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Balance Forecast", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canPredict.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 7,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/business-outcomes",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[12] || (_cache[12] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "monetization_on", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Business Outcomes", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400" }, "AI & DATA", -1)),
              (canModels.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 8,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/models",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[13] || (_cache[13] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "monitoring", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Model Performance", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canEtl.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 9,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/etl-run-history",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[14] || (_cache[14] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "schedule", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Run History", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canEtl.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 10,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/etl-config-manager",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[15] || (_cache[15] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "settings", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "ETL Config Manager", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canAdmin.value)
                ? (openBlock(), createElementBlock("div", _hoisted_8, "ADMIN"))
                : createCommentVNode("", true),
              (canAdmin.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 12,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/settings",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[16] || (_cache[16] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "manage_accounts", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "Settings", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true),
              (canAdmin.value)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 13,
                    class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                    to: "/dashboard/settings/users",
                    "active-class": "!bg-[#a40022] !text-white !font-semibold"
                  }, {
                    default: withCtx(() => [...(_cache[17] || (_cache[17] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "group_add", -1),
                      createBaseVNode("span", { class: "text-body-md font-medium" }, "User Management", -1)
                    ]))]),
                    _: 1
                  }))
                : createCommentVNode("", true)
            ])
          ])
        ]),
        _cache[26] || (_cache[26] = createBaseVNode("div", { class: "flex items-center gap-3 md:hidden" }, [
          createBaseVNode("div", { class: "w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm" }, "A"),
          createBaseVNode("h1", { class: "text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary" }, "Intelligence Unit")
        ], -1)),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("h1", _hoisted_10, toDisplayString(pageTitle.value), 1)
        ]),
        createBaseVNode("div", _hoisted_11, [
          createBaseVNode("label", _hoisted_12, [
            _cache[20] || (_cache[20] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "calendar_today", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((unref(snapshotStore).selectedDate) = $event)),
              type: "date",
              onChange: onSnapshotDateChange,
              class: "border border-gray-300 rounded-sm px-2 py-1.5 text-xs font-mono text-absa-enrich bg-white"
            }, null, 544), [
              [vModelText, unref(snapshotStore).selectedDate]
            ])
          ]),
          createBaseVNode("div", _hoisted_13, [
            _cache[21] || (_cache[21] = createBaseVNode("span", { class: "material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary" }, "search", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((searchQuery).value = $event)),
              onKeyup: withKeys(submitSearch, ["enter"]),
              onInput: _cache[2] || (_cache[2] = $event => (searchQuery.value = searchQuery.value)),
              class: "w-full bg-surface-container rounded py-2 pl-10 pr-4 text-body-md border-none focus:ring-1 focus:ring-primary",
              placeholder: "Search customer, account or ID... (Enter to open)",
              type: "text"
            }, null, 544), [
              [vModelText, searchQuery.value]
            ])
          ]),
          createBaseVNode("button", {
            onClick: toggleNotifications,
            class: "relative text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block"
          }, [
            _cache[22] || (_cache[22] = createBaseVNode("span", { class: "material-symbols-outlined" }, "notifications", -1)),
            (notificationCount.value > 0)
              ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(notificationCount.value), 1))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("button", {
            onClick: openHelp,
            class: "text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block"
          }, [...(_cache[23] || (_cache[23] = [
            createBaseVNode("span", { class: "material-symbols-outlined" }, "help", -1)
          ]))]),
          createBaseVNode("div", {
            ref_key: "userMenuRef",
            ref: userMenuRef,
            class: "relative"
          }, [
            createBaseVNode("button", {
              type: "button",
              class: "flex items-center gap-2 rounded-full pl-0.5 pr-1.5 py-1 hover:bg-surface-container-low transition-colors",
              "aria-haspopup": "menu",
              "aria-expanded": showUserMenu.value ? 'true' : 'false',
              "aria-label": "Account menu",
              onClick: toggleUserMenu
            }, [
              createBaseVNode("div", _hoisted_16, toDisplayString(userInitials.value), 1),
              createBaseVNode("div", _hoisted_17, [
                createBaseVNode("p", _hoisted_18, toDisplayString(userName.value), 1),
                createBaseVNode("p", _hoisted_19, toDisplayString(userRole.value), 1)
              ]),
              _cache[24] || (_cache[24] = createBaseVNode("span", { class: "material-symbols-outlined text-secondary text-[18px] hidden md:inline" }, "expand_more", -1))
            ], 8, _hoisted_15),
            (showUserMenu.value)
              ? (openBlock(), createElementBlock("div", _hoisted_20, [
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("p", _hoisted_22, toDisplayString(userName.value), 1),
                    createBaseVNode("p", _hoisted_23, toDisplayString(userEmail.value), 1),
                    createBaseVNode("span", _hoisted_24, toDisplayString(userRole.value), 1)
                  ]),
                  createBaseVNode("button", {
                    type: "button",
                    role: "menuitem",
                    class: "w-full text-left px-4 py-2.5 text-xs font-bold text-absa-passion hover:bg-red-50 transition-colors flex items-center gap-2",
                    onClick: handleLogout
                  }, [...(_cache[25] || (_cache[25] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "logout", -1),
                    createTextVNode(" Sign out ", -1)
                  ]))])
                ]))
              : createCommentVNode("", true)
          ], 512)
        ])
      ]),
      (showNotifications.value)
        ? (openBlock(), createElementBlock("div", _hoisted_25, [
            createBaseVNode("div", { class: "px-4 py-3 border-b border-gray-200 flex items-center justify-between" }, [
              _cache[27] || (_cache[27] = createBaseVNode("span", { class: "text-xs font-bold text-absa-enrich uppercase tracking-wider" }, "Notifications", -1)),
              createBaseVNode("button", {
                onClick: clearNotifications,
                class: "text-[11px] font-semibold text-absa-passion hover:underline"
              }, "Mark all read")
            ]),
            createBaseVNode("div", _hoisted_26, [
              (notifications.value.length === 0)
                ? (openBlock(), createElementBlock("div", _hoisted_27, "No new notifications"))
                : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(notifications.value, (n, i) => {
                return (openBlock(), createElementBlock("button", {
                  key: i,
                  onClick: $event => (openNotification(n)),
                  class: "w-full text-left px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                }, [
                  createBaseVNode("div", _hoisted_29, [
                    createBaseVNode("span", _hoisted_30, toDisplayString(n.icon || 'info'), 1),
                    createBaseVNode("div", null, [
                      createBaseVNode("p", _hoisted_31, toDisplayString(n.title), 1),
                      createBaseVNode("p", _hoisted_32, toDisplayString(n.body), 1)
                    ])
                  ])
                ], 8, _hoisted_28))
              }), 128))
            ])
          ]))
        : createCommentVNode("", true),
      (showHelp.value)
        ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "fixed inset-0 z-50 flex items-center justify-center p-4",
            onClick: _cache[5] || (_cache[5] = withModifiers($event => (showHelp.value = false), ["self"]))
          }, [
            createBaseVNode("div", {
              class: "absolute inset-0 bg-black/30",
              onClick: _cache[3] || (_cache[3] = $event => (showHelp.value = false))
            }),
            createBaseVNode("div", _hoisted_33, [
              createBaseVNode("div", _hoisted_34, [
                _cache[29] || (_cache[29] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Intelligence Unit — Help", -1)),
                createBaseVNode("button", {
                  onClick: _cache[4] || (_cache[4] = $event => (showHelp.value = false)),
                  class: "text-gray-400 hover:text-gray-600"
                }, [...(_cache[28] || (_cache[28] = [
                  createBaseVNode("span", { class: "material-symbols-outlined" }, "close", -1)
                ]))])
              ]),
              _cache[30] || (_cache[30] = createStaticVNode("<div class=\"p-5 space-y-3 text-xs text-gray-600\" data-v-2cd00bc5><p data-v-2cd00bc5><strong class=\"text-absa-enrich\" data-v-2cd00bc5>Customer search:</strong> type a customer ID (e.g. CUST00042) or name in the header search and press Enter.</p><p data-v-2cd00bc5><strong class=\"text-absa-enrich\" data-v-2cd00bc5>Alerts:</strong> acknowledge critical alerts on the Portfolio dashboard to clear them.</p><p data-v-2cd00bc5><strong class=\"text-absa-enrich\" data-v-2cd00bc5>Reports:</strong> every intelligence page has an Export button that downloads a CSV report.</p><p data-v-2cd00bc5><strong class=\"text-absa-enrich\" data-v-2cd00bc5>Pilot scope:</strong> data is synthetic ABSA data (as-of 2026-07-27) for the PoC pilot.</p></div>", 1))
            ])
          ]))
        : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_35, [
        createVNode(_component_router_view)
      ])
    ])
  ]))
}
}

};
const DashboardLayout = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2cd00bc5"]]);

export { DashboardLayout as default };
