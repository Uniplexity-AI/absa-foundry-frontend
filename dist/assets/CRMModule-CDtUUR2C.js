import { $ as createLucideIcon, r as ref, f as onMounted, Q as axios, c as createElementBlock, b as createBaseVNode, q as createVNode, s as unref, A as createTextVNode, t as toDisplayString, w as withCtx, a0 as Calendar, D as resolveComponent, u as useRouter, o as openBlock } from './index-rR_eRHdu.js';
import { b as authApi } from './auth_api-BRvnNIi6.js';
import { T as TrendingUp } from './trending-up-B4EJ2ZQm.js';
import { C as Clock } from './clock-CJg8CEyk.js';
import { T as TriangleAlert } from './triangle-alert-XzMZerFP.js';
import { U as Users } from './users-CBPL83Gc.js';
import { B as Briefcase } from './briefcase-ChPmMcgV.js';
import { C as CircleCheckBig } from './circle-check-big-FiGp5QRO.js';
import { P as PhoneCall } from './phone-call-DUhHLuvX.js';
import { L as Layers } from './layers-Bt4UD5Vr.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Activity = createLucideIcon("ActivityIcon", [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ChartNoAxesColumn = createLucideIcon("ChartNoAxesColumnIcon", [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ChartPie = createLucideIcon("ChartPieIcon", [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
]);

const _hoisted_1 = { class: "h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto" };
const _hoisted_2 = { class: "flex-1 w-full relative z-10 blur-scoped pb-20" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full" };
const _hoisted_4 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" };
const _hoisted_5 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_6 = { class: "flex items-center justify-between mb-3" };
const _hoisted_7 = { class: "text-absa-passion" };
const _hoisted_8 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_9 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_10 = { class: "flex items-center justify-between mb-3" };
const _hoisted_11 = { class: "text-blue-500" };
const _hoisted_12 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_13 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_14 = { class: "flex items-center justify-between mb-3" };
const _hoisted_15 = { class: "text-orange-500" };
const _hoisted_16 = { class: "text-2xl font-black tracking-tight text-orange-500" };
const _hoisted_17 = { class: "flex items-center justify-between mb-3" };
const _hoisted_18 = { class: "p-2 border border-white/20 bg-white/10 text-white" };
const _hoisted_19 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4" };
const _hoisted_20 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_21 = { class: "flex items-center justify-between mb-3" };
const _hoisted_22 = { class: "text-gray-400" };
const _hoisted_23 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_24 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_25 = { class: "flex items-center justify-between mb-3" };
const _hoisted_26 = { class: "text-gray-400" };
const _hoisted_27 = { class: "text-xs text-gray-400 font-medium" };
const _hoisted_28 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_29 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_30 = { class: "flex items-center justify-between mb-3" };
const _hoisted_31 = { class: "text-gray-400" };
const _hoisted_32 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_33 = { class: "bg-white border border-gray-200 shadow-sm p-4 relative group hover:border-absa-passion transition cursor-pointer" };
const _hoisted_34 = { class: "flex items-center justify-between mb-3" };
const _hoisted_35 = { class: "text-gray-400" };
const _hoisted_36 = { class: "text-2xl font-black tracking-tight text-gray-900" };
const _hoisted_37 = { class: "pt-6" };
const _hoisted_38 = { class: "grid grid-cols-1 md:grid-cols-5 gap-4" };
const _hoisted_39 = { class: "w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform" };
const _hoisted_40 = { class: "w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform" };
const _hoisted_41 = { class: "w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform" };
const _hoisted_42 = { class: "w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform" };
const _hoisted_43 = { class: "w-12 h-12 text-gray-400 flex items-center justify-start mb-6 group-hover:scale-110 transition-transform" };
const _sfc_main = {
  __name: "CRMModule",
  setup(__props) {
    const router = useRouter();
    function openForms() {
      console.log("Navigating to Calendar & Activities page: /dashboard/crm/calendar");
      router.push("/dashboard/crm/calendar");
    }
    const kpis = ref({
      serviceLevel: "82.4",
      avgSpeedAnswer: "18",
      abandonmentRate: "12.5",
      fcr: "76.0",
      totalInteractions: "1,245",
      activeAgents: "...",
      escalations: "42",
      avgHandleTime: "4m 20s"
    });
    const activeRepsLabel = ref("...");
    onMounted(async () => {
      try {
        const BASE_URL = "http://22.84.115.25:8080".trim() || (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://22.84.115.25:8080" : "https://ub-app-backend-692487163735.europe-west1.run.app");
        const token = localStorage.getItem("token") || localStorage.getItem("access_token");
        const metricsRes = await axios.get(`${BASE_URL}/api/v1/crm/metrics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (metricsRes.data) {
          kpis.value.serviceLevel = metricsRes.data.serviceLevel;
          kpis.value.avgSpeedAnswer = metricsRes.data.avgSpeedAnswer;
          kpis.value.abandonmentRate = metricsRes.data.abandonmentRate;
          kpis.value.fcr = metricsRes.data.fcr;
          kpis.value.totalInteractions = metricsRes.data.totalInteractions;
          kpis.value.escalations = metricsRes.data.escalations;
          kpis.value.avgHandleTime = metricsRes.data.avgHandleTime;
        }
      } catch (err) {
        console.error("Failed to load dynamic CRM metrics:", err);
      }
      try {
        const users = await authApi.listUsers();
        const reps = users.filter((u) => {
          if (!u.roles) return false;
          return u.roles.some((r) => typeof r === "string" && r.toLowerCase().includes("customer sales rep"));
        });
        const activeCount = reps.filter((u) => u.is_active !== false).length;
        kpis.value.activeAgents = String(reps.length);
        activeRepsLabel.value = `${activeCount} Act.`;
      } catch (err) {
        console.error("Failed to load users for CSR count:", err);
        kpis.value.activeAgents = "0";
        activeRepsLabel.value = "0 Act.";
      }
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", null, [
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                createBaseVNode("div", { class: "w-1 h-4 bg-absa-passion" }),
                createBaseVNode("h4", { class: "text-xs font-black text-gray-900 uppercase tracking-tight" }, "Key Performance Indicators")
              ], -1)),
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, [
                      createVNode(unref(TrendingUp), { size: 18 })
                    ]),
                    _cache[0] || (_cache[0] = createBaseVNode("span", { class: "text-xs text-absa-passion font-medium" }, "Target 80%", -1))
                  ]),
                  _cache[2] || (_cache[2] = createBaseVNode("h5", { class: "text-xs font-medium text-gray-500 mb-1" }, "Service Level", -1)),
                  createBaseVNode("p", _hoisted_8, [
                    createTextVNode(toDisplayString(kpis.value.serviceLevel), 1),
                    _cache[1] || (_cache[1] = createBaseVNode("span", { class: "text-sm font-normal text-gray-400" }, "%", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_9, [
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(unref(Clock), { size: 18 })
                    ]),
                    _cache[3] || (_cache[3] = createBaseVNode("span", { class: "text-xs text-blue-600 font-medium" }, "Avg Time", -1))
                  ]),
                  _cache[5] || (_cache[5] = createBaseVNode("h5", { class: "text-xs font-medium text-gray-500 mb-1" }, "Speed to Answer", -1)),
                  createBaseVNode("p", _hoisted_12, [
                    createTextVNode(toDisplayString(kpis.value.avgSpeedAnswer), 1),
                    _cache[4] || (_cache[4] = createBaseVNode("span", { class: "text-sm font-normal text-gray-400 ml-1" }, "sec", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("div", _hoisted_14, [
                    createBaseVNode("div", _hoisted_15, [
                      createVNode(unref(TriangleAlert), { size: 18 })
                    ]),
                    _cache[6] || (_cache[6] = createBaseVNode("span", { class: "text-xs text-orange-600 font-medium" }, "Critical", -1))
                  ]),
                  _cache[8] || (_cache[8] = createBaseVNode("h5", { class: "text-xs font-medium text-gray-500 mb-1" }, "Abandon Rate", -1)),
                  createBaseVNode("p", _hoisted_16, [
                    createTextVNode(toDisplayString(kpis.value.abandonmentRate), 1),
                    _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-sm font-normal text-gray-400" }, "%", -1))
                  ])
                ]),
                createVNode(_component_router_link, {
                  to: "/dashboard/crm/analytics",
                  class: "bg-absa-passion border border-absa-passion shadow-sm p-4 relative group hover:bg-[#b3002d] transition cursor-pointer flex flex-col justify-between"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_17, [
                      createBaseVNode("div", _hoisted_18, [
                        createVNode(unref(ChartNoAxesColumn), { size: 18 })
                      ]),
                      _cache[9] || (_cache[9] = createBaseVNode("span", { class: "text-[9px] text-white font-mono font-bold uppercase tracking-widest opacity-80" }, "Analytics", -1))
                    ]),
                    _cache[10] || (_cache[10] = createBaseVNode("div", null, [
                      createBaseVNode("h5", { class: "text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest mb-1" }, "CRM_Analytics"),
                      createBaseVNode("p", { class: "text-lg font-bold font-display text-white tracking-tight" }, "View Dashboard")
                    ], -1))
                  ]),
                  _: 1
                })
              ]),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("div", _hoisted_20, [
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("div", _hoisted_22, [
                      createVNode(unref(Activity), { size: 18 })
                    ]),
                    _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-xs text-gray-400 font-medium" }, "+120 Today", -1))
                  ]),
                  _cache[12] || (_cache[12] = createBaseVNode("h5", { class: "text-xs font-medium text-gray-500 mb-1" }, "Interactions", -1)),
                  createBaseVNode("p", _hoisted_23, toDisplayString(kpis.value.totalInteractions), 1)
                ]),
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("div", _hoisted_25, [
                    createBaseVNode("div", _hoisted_26, [
                      createVNode(unref(Users), { size: 18 })
                    ]),
                    createBaseVNode("span", _hoisted_27, toDisplayString(activeRepsLabel.value), 1)
                  ]),
                  _cache[13] || (_cache[13] = createBaseVNode("h5", { class: "text-xs font-medium text-gray-500 mb-1" }, "Customer Sales Representatives", -1)),
                  createBaseVNode("p", _hoisted_28, toDisplayString(kpis.value.activeAgents), 1)
                ]),
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("div", _hoisted_31, [
                      createVNode(unref(Briefcase), { size: 18 })
                    ]),
                    _cache[14] || (_cache[14] = createBaseVNode("span", { class: "text-xs text-gray-400 font-medium" }, "12 Open", -1))
                  ]),
                  _cache[15] || (_cache[15] = createBaseVNode("h5", { class: "text-xs font-medium text-gray-500 mb-1" }, "Escalations", -1)),
                  createBaseVNode("p", _hoisted_32, toDisplayString(kpis.value.escalations), 1)
                ]),
                createBaseVNode("div", _hoisted_33, [
                  createBaseVNode("div", _hoisted_34, [
                    createBaseVNode("div", _hoisted_35, [
                      createVNode(unref(CircleCheckBig), { size: 18 })
                    ]),
                    _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-xs text-gray-400 font-medium" }, "76% FCR", -1))
                  ]),
                  _cache[17] || (_cache[17] = createBaseVNode("h5", { class: "text-xs font-medium text-gray-500 mb-1" }, "Avg Handle Time", -1)),
                  createBaseVNode("p", _hoisted_36, toDisplayString(kpis.value.avgHandleTime), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_37, [
              createBaseVNode("div", _hoisted_38, [
                createVNode(_component_router_link, {
                  to: "/dashboard/crm/workspace",
                  class: "bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col text-left"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_39, [
                      createVNode(unref(PhoneCall), {
                        size: 20,
                        class: "text-gray-400"
                      })
                    ]),
                    _cache[19] || (_cache[19] = createBaseVNode("h3", { class: "text-sm font-bold text-gray-900 tracking-tight mb-2" }, "Agent Workspace", -1)),
                    _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-6 leading-relaxed" }, " Voice ♦ Chat ♦ Email ♦ SMS ", -1)),
                    _cache[21] || (_cache[21] = createBaseVNode("span", { class: "text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto" }, " Open → ", -1))
                  ]),
                  _: 1
                }),
                createVNode(_component_router_link, {
                  to: "/dashboard/customers",
                  class: "bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col text-left"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_40, [
                      createVNode(unref(Users), {
                        size: 20,
                        class: "text-gray-400"
                      })
                    ]),
                    _cache[22] || (_cache[22] = createBaseVNode("h3", { class: "text-sm font-bold text-gray-900 tracking-tight mb-2" }, "Customers", -1)),
                    _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-6 leading-relaxed" }, " Manage ♦ Filter ♦ View ♦ Profiles ", -1)),
                    _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto" }, " Open → ", -1))
                  ]),
                  _: 1
                }),
                createVNode(_component_router_link, {
                  to: "/dashboard/crm/tickets",
                  class: "bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_41, [
                      createVNode(unref(Layers), {
                        size: 20,
                        class: "text-gray-400"
                      })
                    ]),
                    _cache[25] || (_cache[25] = createBaseVNode("h3", { class: "text-sm font-bold text-gray-900 tracking-tight mb-2" }, "Tickets & Cases", -1)),
                    _cache[26] || (_cache[26] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-6 leading-relaxed" }, " Open ♦ Resolved ♦ Escalations ", -1)),
                    _cache[27] || (_cache[27] = createBaseVNode("span", { class: "text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto" }, " Open → ", -1))
                  ]),
                  _: 1
                }),
                createVNode(_component_router_link, {
                  to: "/dashboard/crm/analytics",
                  class: "bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_42, [
                      createVNode(unref(ChartPie), {
                        size: 20,
                        class: "text-gray-400"
                      })
                    ]),
                    _cache[28] || (_cache[28] = createBaseVNode("h3", { class: "text-sm font-bold text-gray-900 tracking-tight mb-2" }, "Analytics", -1)),
                    _cache[29] || (_cache[29] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-6 leading-relaxed" }, " Reports ♦ Trends ♦ Forecasts ", -1)),
                    _cache[30] || (_cache[30] = createBaseVNode("span", { class: "text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto" }, " Open → ", -1))
                  ]),
                  _: 1
                }),
                createBaseVNode("div", {
                  onClick: openForms,
                  class: "bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-absa-passion transition-all group cursor-pointer relative overflow-hidden flex flex-col"
                }, [
                  createBaseVNode("div", _hoisted_43, [
                    createVNode(unref(Calendar), {
                      size: 20,
                      class: "text-gray-400"
                    })
                  ]),
                  _cache[31] || (_cache[31] = createBaseVNode("h3", { class: "text-sm font-bold text-gray-900 tracking-tight mb-2" }, "Calendar & Activities", -1)),
                  _cache[32] || (_cache[32] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-6 leading-relaxed" }, " Events ♦ Tasks ♦ Follow-ups ", -1)),
                  _cache[33] || (_cache[33] = createBaseVNode("span", { class: "text-xs font-bold text-gray-400 group-hover:text-absa-passion flex items-center gap-2 tracking-widest mt-auto" }, " Open → ", -1))
                ])
              ])
            ])
          ])
        ])
      ]);
    };
  }
};

export { _sfc_main as default };
