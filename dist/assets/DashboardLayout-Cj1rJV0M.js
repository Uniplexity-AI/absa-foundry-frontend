import { g as _export_sfc, C as useRBAC, D as computed, h as onMounted, r as ref, E as BASE_URL, G as decodeJWT, H as getModuleCards, o as openBlock, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, t as toDisplayString, a as createStaticVNode, A as resolveComponent, u as useRouter, I as useRoute } from './index-F0Jaczum.js';

const _hoisted_1 = { class: "absa-dashboard-layout" };
const _hoisted_2 = { class: "absa-main" };
const _hoisted_3 = { class: "dark:bg-surface text-primary dark:text-inverse-primary border-b border-outline-variant dark:border-outline flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 fixed top-0 left-0 right-0 z-40 bg-white" };
const _hoisted_4 = { class: "relative group" };
const _hoisted_5 = { class: "absolute left-0 top-full mt-2 w-64 bg-white/20 backdrop-blur-xl border border-white/20 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out z-50 before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-['']" };
const _hoisted_6 = { class: "flex flex-col p-2" };
const _hoisted_7 = { class: "hidden md:flex items-center flex-1 ml-4" };
const _hoisted_8 = { class: "text-headline-lg font-headline-lg text-primary" };
const _hoisted_9 = { class: "flex items-center gap-4" };
const _hoisted_10 = { class: "flex items-center gap-2" };
const _hoisted_11 = { class: "absa-topbar__avatar" };
const _hoisted_12 = { class: "hidden md:block" };
const _hoisted_13 = { class: "text-body-md font-body-md font-semibold" };
const _hoisted_14 = { class: "text-label-sm font-label-sm text-secondary" };
const _hoisted_15 = { class: "absa-content pt-14" };


const _sfc_main = {
  __name: 'DashboardLayout',
  setup(__props) {

useRouter();
const route = useRoute();
const { hasPermission, isAdmin, isSuperAdmin } = useRBAC();

const pageTitle = computed(() => {
  return route.meta.title || 'Dashboard'
});

// Restore saved preference on mount
onMounted(() => {
  fetchSubscribedModules();
});

// ── User Info ──
const userEmail = computed(() => {
  try { return decodeJWT().getUserEmail?.() || 'User' }
  catch { return 'User' }
});

const userInitials = computed(() => {
  const email = userEmail.value;
  if (email && email !== 'User') {
    return email.split('@')[0].slice(0, 2).toUpperCase()
  }
  return 'TT'
});

const userName = computed(() => {
  const email = userEmail.value;
  return email !== 'User' ? email.split('@')[0].replace(/[._]/g, ' ') : 'Tina Tembo'
});

const userRole = computed(() => {
  try { return decodeJWT().getUserRole?.() || 'Relationship Manager' }
  catch { return 'Relationship Manager' }
});

computed(() => isAdmin.value || isSuperAdmin.value || hasPermission('settings', 'read'));

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
          _cache[11] || (_cache[11] = createBaseVNode("button", { class: "text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center" }, [
            createBaseVNode("span", { class: "material-symbols-outlined" }, "menu")
          ], -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("nav", _hoisted_6, [
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/portfolio",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[0] || (_cache[0] = [
                  createBaseVNode("span", {
                    class: "material-symbols-outlined text-[20px]",
                    style: {"font-variation-settings":"'FILL' 1"}
                  }, "dashboard", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Dashboard", -1)
                ]))]),
                _: 1
              }),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/branch-manager",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[1] || (_cache[1] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "store", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Branch Manager", -1)
                ]))]),
                _: 1
              }),
              _cache[9] || (_cache[9] = createBaseVNode("div", { class: "px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400" }, "INTELLIGENCE", -1)),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/customer-value",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[2] || (_cache[2] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "star", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Customer Value", -1)
                ]))]),
                _: 1
              }),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/lifecycle",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[3] || (_cache[3] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "waterfall_chart", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Lifecycle Prediction", -1)
                ]))]),
                _: 1
              }),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/balance-forecast",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[4] || (_cache[4] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "show_chart", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Balance Forecast", -1)
                ]))]),
                _: 1
              }),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/business-outcomes",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[5] || (_cache[5] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "monetization_on", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Business Outcomes", -1)
                ]))]),
                _: 1
              }),
              _cache[10] || (_cache[10] = createBaseVNode("div", { class: "px-4 pt-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-gray-400" }, "AI & DATA", -1)),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/models",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[6] || (_cache[6] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "monitoring", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Model Performance", -1)
                ]))]),
                _: 1
              }),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/etl-run-history",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[7] || (_cache[7] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "schedule", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "Run History", -1)
                ]))]),
                _: 1
              }),
              createVNode(_component_router_link, {
                class: "flex items-center gap-3 px-4 py-2 rounded text-secondary hover:bg-surface-container-low transition-colors",
                to: "/dashboard/etl-config-manager",
                "active-class": "!bg-[#a40022] !text-white !font-semibold"
              }, {
                default: withCtx(() => [...(_cache[8] || (_cache[8] = [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[20px]" }, "settings", -1),
                  createBaseVNode("span", { class: "text-body-md font-medium" }, "ETL Config Manager", -1)
                ]))]),
                _: 1
              })
            ])
          ])
        ]),
        _cache[13] || (_cache[13] = createBaseVNode("div", { class: "flex items-center gap-3 md:hidden" }, [
          createBaseVNode("div", { class: "w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm" }, "A"),
          createBaseVNode("h1", { class: "text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary" }, "Intelligence Unit")
        ], -1)),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("h1", _hoisted_8, toDisplayString(pageTitle.value), 1)
        ]),
        createBaseVNode("div", _hoisted_9, [
          _cache[12] || (_cache[12] = createStaticVNode("<div class=\"hidden md:flex relative w-96\" data-v-106088be><span class=\"material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary\" data-v-106088be>search</span><input class=\"w-full bg-surface-container rounded py-2 pl-10 pr-4 text-body-md border-none focus:ring-1 focus:ring-primary\" placeholder=\"Search customer, account or ID...\" type=\"text\" data-v-106088be></div><button class=\"text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block\" data-v-106088be><span class=\"material-symbols-outlined\" data-v-106088be>notifications</span></button><button class=\"text-secondary hover:bg-surface-container-low p-2 rounded-full transition-colors hidden md:block\" data-v-106088be><span class=\"material-symbols-outlined\" data-v-106088be>help</span></button>", 3)),
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, toDisplayString(userInitials.value), 1),
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("p", _hoisted_13, toDisplayString(userName.value), 1),
              createBaseVNode("p", _hoisted_14, toDisplayString(userRole.value), 1)
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_15, [
        createVNode(_component_router_view)
      ])
    ])
  ]))
}
}

};
const DashboardLayout = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-106088be"]]);

export { DashboardLayout as default };
