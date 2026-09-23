import { a2 as createLucideIcon, _ as _export_sfc, r as ref, i as computed, f as onMounted, c as createElementBlock, b as createBaseVNode, q as createVNode, s as unref, A as createTextVNode, t as toDisplayString, j as createCommentVNode, F as Fragment, e as renderList, C as createBlock, a3 as X, x as withDirectives, y as vModelText, h as normalizeClass, T as Teleport, L as vModelSelect, N as vModelCheckbox, a4 as resolveDynamicComponent, o as openBlock, a6 as Calendar, a7 as FileText, K as withKeys } from './index-CJBj3n9Z.js';
/* empty css                                                               */
import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-Br5jucyZ.js';
import { _ as _sfc_main$1 } from './BackButton-MdKuCcLl.js';
import { u as useCRMModule } from './CRMModule-CFTZWsYA.js';
import { C as CircleUser } from './circle-user-Dc3LrmL0.js';
import { M as MapPin } from './map-pin-BGKLoxXN.js';
import { P as Plus } from './plus-BwQjmxmM.js';
import { C as Check } from './check-0z2A0ECK.js';
import { N as Navigation } from './navigation-DIEMjTNd.js';
import { P as Pencil } from './pencil-ObFyWTii.js';
import { T as Trash2 } from './trash-2-BgW3JK0W.js';
import { C as CircleCheck } from './circle-check-CUZmTvJV.js';
import { I as Info } from './info-Bm7RzRqv.js';
import { T as TriangleAlert } from './triangle-alert-8CmZMKxS.js';
import { R as RefreshCw } from './refresh-cw-Dzn5Ps_2.js';
import { S as Send } from './send-B7Htio-g.js';
import './useCurrency-DVuQBX2G.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const CalendarClock = createLucideIcon("CalendarClockIcon", [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const LogIn = createLucideIcon("LogInIcon", [
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
  ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
  ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const LogOut = createLucideIcon("LogOutIcon", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Timer = createLucideIcon("TimerIcon", [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const UserMinus = createLucideIcon("UserMinusIcon", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
]);

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-sm uppercase tracking-wider" };
const _hoisted_7 = { class: "flex-1 w-full relative z-10 pb-40" };
const _hoisted_8 = { class: "px-4 sm:px-6 lg:px-8 space-y-6 py-6 relative" };
const _hoisted_9 = {
  key: 0,
  class: "absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center"
};
const _hoisted_10 = { class: "flex items-center justify-between border-b border-gray-100 pb-4" };
const _hoisted_11 = { class: "flex items-center gap-2" };
const _hoisted_12 = { class: "text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2" };
const _hoisted_13 = { class: "bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden" };
const _hoisted_14 = { class: "p-4 md:p-6 space-y-4 relative z-10" };
const _hoisted_15 = {
  key: 0,
  class: "text-center py-12 border-2 border-dashed border-gray-100 rounded-sm"
};
const _hoisted_16 = { class: "flex items-start justify-between mb-4" };
const _hoisted_17 = { class: "flex-1" };
const _hoisted_18 = { class: "flex items-center gap-3 mb-3" };
const _hoisted_19 = { class: "font-bold text-gray-900 text-sm font-mono uppercase tracking-tight" };
const _hoisted_20 = { class: "space-y-2 text-[11px] font-mono text-gray-600" };
const _hoisted_21 = { class: "flex items-center gap-2" };
const _hoisted_22 = { class: "text-gray-900" };
const _hoisted_23 = {
  key: 0,
  class: "flex items-center gap-2"
};
const _hoisted_24 = {
  key: 1,
  class: "flex items-center gap-2"
};
const _hoisted_25 = {
  key: 2,
  class: "flex items-center gap-2"
};
const _hoisted_26 = { class: "flex flex-col gap-2 ml-4" };
const _hoisted_27 = ["href"];
const _hoisted_28 = ["onClick"];
const _hoisted_29 = ["onClick"];
const _hoisted_30 = ["onClick"];
const _hoisted_31 = ["onClick"];
const _hoisted_32 = ["onClick"];
const _hoisted_33 = {
  key: 0,
  class: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded-sm"
};
const _hoisted_34 = { class: "grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] font-mono" };
const _hoisted_35 = {
  key: 0,
  class: "flex items-center gap-2 border-r border-gray-200 pr-2"
};
const _hoisted_36 = { class: "text-gray-900 font-bold" };
const _hoisted_37 = {
  key: 1,
  class: "flex items-center gap-2 border-r border-gray-200 pr-2"
};
const _hoisted_38 = { class: "text-gray-900 font-bold" };
const _hoisted_39 = {
  key: 2,
  class: "flex items-center gap-2"
};
const _hoisted_40 = { class: "text-gray-900 font-bold" };
const _hoisted_41 = {
  key: 1,
  class: "mb-4 p-3 bg-white border border-gray-200 rounded-sm"
};
const _hoisted_42 = { class: "flex items-start gap-3" };
const _hoisted_43 = { class: "p-1.5 border border-gray-100 rounded-sm" };
const _hoisted_44 = { class: "flex-1" };
const _hoisted_45 = { class: "font-mono font-bold text-gray-900 text-[10px] uppercase tracking-wider" };
const _hoisted_46 = {
  key: 0,
  class: "text-[11px] text-gray-600 mt-1 font-mono"
};
const _hoisted_47 = {
  key: 1,
  class: "text-[9px] font-mono font-bold text-orange-600 mt-2 flex items-center gap-1 uppercase tracking-tighter"
};
const _hoisted_48 = { class: "mt-4 pt-4 border-t border-gray-100" };
const _hoisted_49 = { class: "flex items-center justify-between mb-3" };
const _hoisted_50 = { class: "text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_51 = ["onClick"];
const _hoisted_52 = {
  key: 0,
  class: "text-[10px] font-mono text-gray-400 italic mb-2 tracking-tighter"
};
const _hoisted_53 = { class: "flex items-start justify-between" };
const _hoisted_54 = { class: "flex-1" };
const _hoisted_55 = { class: "text-[9px] text-gray-400 ml-2 font-bold" };
const _hoisted_56 = { class: "mt-4 flex gap-2" };
const _hoisted_57 = ["onUpdate:modelValue", "onFocus", "onKeyup"];
const _hoisted_58 = ["onClick"];
const _hoisted_59 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-20 overflow-y-auto"
};
const _hoisted_60 = { class: "bg-white rounded-sm shadow-2xl w-full max-w-2xl border border-gray-200 relative overflow-hidden animate-modal-in" };
const _hoisted_61 = { class: "p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative z-10" };
const _hoisted_62 = { class: "flex items-center gap-3" };
const _hoisted_63 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_64 = { class: "p-4 md:p-6 space-y-6 max-h-[70vh] overflow-y-auto relative z-10" };
const _hoisted_65 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_66 = { class: "relative" };
const _hoisted_67 = { class: "relative" };
const _hoisted_68 = {
  key: 0,
  class: "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-xl max-h-60 overflow-y-auto"
};
const _hoisted_69 = ["onClick"];
const _hoisted_70 = { class: "font-bold text-gray-900" };
const _hoisted_71 = { class: "text-gray-400 ml-2" };
const _hoisted_72 = {
  key: 0,
  class: "px-4 py-2.5 text-[10px] font-mono text-gray-400 italic"
};
const _hoisted_73 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_74 = { key: 0 };
const _hoisted_75 = { class: "p-4 md:p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 relative z-10" };
const _hoisted_76 = ["disabled"];
const _hoisted_77 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-20"
};
const _hoisted_78 = { class: "bg-white rounded-sm shadow-2xl w-full max-w-lg border border-gray-200 relative overflow-hidden animate-modal-in" };
const _hoisted_79 = { class: "p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative z-10" };
const _hoisted_80 = { class: "flex items-center gap-3" };
const _hoisted_81 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_82 = { class: "p-4 md:p-6 space-y-5 relative z-10" };
const _hoisted_83 = {
  key: 0,
  class: "p-3 bg-gray-50 border border-gray-200 rounded-sm"
};
const _hoisted_84 = { class: "text-[10px] font-mono" };
const _hoisted_85 = { class: "font-bold text-gray-900 uppercase mb-1" };
const _hoisted_86 = { class: "text-gray-500 uppercase flex items-center gap-2" };
const _hoisted_87 = { class: "flex items-center gap-3" };
const _hoisted_88 = { key: 1 };
const _hoisted_89 = { class: "p-4 md:p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 relative z-10" };
const _hoisted_90 = ["disabled"];


const _sfc_main = {
  __name: 'CRMVisitsPage',
  setup(__props) {

const {
  getUserEmail, moduleLoading, visits, visitNotes, newVisitNote,
  showVisitModal, editingVisit, visitForm, openVisitModal, closeVisitModal, createVisit,
  onLeadSelect, leads, getLeadNameById, getMapsLink, formatVisitDuration,
  crmFormatDateTime, crmFormatDate, ensureVisitNotesLoaded, submitVisitNote,
  checkInVisit, showCheckOutModal, showCheckOutModalFlag, currentVisitForCheckOut,
  checkOutForm, checkingOut, closeCheckOutModal, confirmCheckOut,
  markVisitCompleted, deleteVisit, goToModule
} = useCRMModule();

const leadSearchQuery = ref('');
const showLeadDropdown = ref(false);

const filteredLeads = computed(() => {
  if (!leadSearchQuery.value) return leads.value;
  const q = leadSearchQuery.value.toLowerCase();
  return leads.value.filter(ld => 
    ld.name.toLowerCase().includes(q) || 
    (ld.company && ld.company.toLowerCase().includes(q))
  );
});

const selectLead = (ld) => {
  visitForm.value.leadId = ld.id;
  leadSearchQuery.value = `${ld.name.toUpperCase()} // ${ld.company.toUpperCase()}`;
  showLeadDropdown.value = false;
  onLeadSelect();
};

onMounted(() => {
  goToModule('visits');
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      _cache[45] || (_cache[45] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
      createBaseVNode("header", _hoisted_2, [
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(unref(_sfc_main$1), {
              route: "/dashboard/crm",
              variant: "icon-only"
            }),
            _cache[17] || (_cache[17] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
            _cache[18] || (_cache[18] = createBaseVNode("div", null, [
              createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Sales // CRM // Visits"),
              createBaseVNode("h1", { class: "text-lg font-black text-gray-900 uppercase tracking-tight" }, "Visit_Logs")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("span", _hoisted_6, [
              createVNode(unref(CircleUser), { size: 14 }),
              createTextVNode(" " + toDisplayString(unref(getUserEmail)() || 'USER'), 1)
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          (unref(moduleLoading))
            ? (openBlock(), createElementBlock("div", _hoisted_9, [...(_cache[19] || (_cache[19] = [
                createBaseVNode("div", { class: "h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin" }, null, -1)
              ]))]))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              _cache[21] || (_cache[21] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
              createBaseVNode("h3", _hoisted_12, [
                createVNode(unref(MapPin), {
                  size: 14,
                  class: "text-gray-400"
                }),
                _cache[20] || (_cache[20] = createTextVNode(" Planned_Visits ", -1))
              ])
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = (...args) => (unref(openVisitModal) && unref(openVisitModal)(...args))),
              class: "px-4 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-[#3D2F88] transition flex items-center gap-2"
            }, [
              createVNode(unref(Plus), { size: 14 }),
              _cache[22] || (_cache[22] = createTextVNode(" Schedule_Visit ", -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_13, [
            _cache[44] || (_cache[44] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
            createBaseVNode("div", _hoisted_14, [
              (!unref(visits).length)
                ? (openBlock(), createElementBlock("div", _hoisted_15, [
                    createVNode(unref(MapPin), {
                      size: 48,
                      class: "text-gray-200 mx-auto mb-4"
                    }),
                    _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "No_Visits_Scheduled", -1)),
                    _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-xs text-gray-400 mt-2" }, "TECHNICAL_LOGS_EMPTY", -1))
                  ]))
                : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visits), (v) => {
                return (openBlock(), createElementBlock("div", {
                  key: v.id,
                  class: normalizeClass(["border border-gray-200 rounded-sm p-4 md:p-5 hover:border-[#2F2E8B]/50 hover:shadow-none transition bg-white group relative overflow-hidden", {
              'border-l-4 border-l-green-500': v.status === 'completed',
              'border-l-4 border-l-blue-500': v.status === 'in-progress',
              'border-l-4 border-l-gray-300': v.status === 'planned',
              'border-l-4 border-l-red-500': v.status === 'canceled'
            }])
                }, [
                  createBaseVNode("div", _hoisted_16, [
                    createBaseVNode("div", _hoisted_17, [
                      createBaseVNode("div", _hoisted_18, [
                        createBaseVNode("h4", _hoisted_19, toDisplayString(v.title || 'VISIT_LOG'), 1),
                        createBaseVNode("span", {
                          class: normalizeClass(["px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold uppercase border", {
                      'bg-green-50 text-green-700 border-green-200': v.status === 'completed',
                      'bg-blue-50 text-blue-700 border-blue-200': v.status === 'in-progress',
                      'bg-gray-50 text-gray-600 border-gray-200': v.status === 'planned',
                      'bg-red-50 text-red-700 border-red-200': v.status === 'canceled'
                    }])
                        }, toDisplayString(v.status), 3)
                      ]),
                      createBaseVNode("div", _hoisted_20, [
                        createBaseVNode("div", _hoisted_21, [
                          _cache[25] || (_cache[25] = createBaseVNode("div", { class: "w-1.5 h-1.5 bg-[#2F2E8B]" }, null, -1)),
                          _cache[26] || (_cache[26] = createTextVNode()),
                          _cache[27] || (_cache[27] = createBaseVNode("span", { class: "text-gray-400 font-bold uppercase tracking-tighter" }, "LEAD:", -1)),
                          _cache[28] || (_cache[28] = createTextVNode()),
                          createBaseVNode("span", _hoisted_22, toDisplayString(unref(getLeadNameById)(v.leadId)), 1)
                        ]),
                        (v.address)
                          ? (openBlock(), createElementBlock("div", _hoisted_23, [
                              createVNode(unref(MapPin), {
                                size: 12,
                                class: "text-[#2F2E8B]"
                              }),
                              _cache[29] || (_cache[29] = createTextVNode()),
                              createBaseVNode("span", null, toDisplayString(v.address), 1)
                            ]))
                          : createCommentVNode("", true),
                        (v.scheduled_at)
                          ? (openBlock(), createElementBlock("div", _hoisted_24, [
                              createVNode(unref(Calendar), {
                                size: 12,
                                class: "text-[#2F2E8B]"
                              }),
                              _cache[30] || (_cache[30] = createTextVNode()),
                              createBaseVNode("span", null, toDisplayString(unref(crmFormatDateTime)(v.scheduled_at)), 1)
                            ]))
                          : createCommentVNode("", true),
                        (v.distance)
                          ? (openBlock(), createElementBlock("div", _hoisted_25, [
                              createVNode(unref(Navigation), {
                                size: 12,
                                class: "text-[#2F2E8B]"
                              }),
                              _cache[31] || (_cache[31] = createTextVNode()),
                              createBaseVNode("span", null, "DIST: " + toDisplayString((v.distance / 1000).toFixed(2)) + " KM • DUR: " + toDisplayString(unref(formatVisitDuration)(v.estimated_duration)), 1)
                            ]))
                          : createCommentVNode("", true)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_26, [
                      (v.location && (v.location.lat || v.location.lng))
                        ? (openBlock(), createElementBlock("a", {
                            key: 0,
                            href: unref(getMapsLink)(v.location),
                            target: "_blank",
                            class: "px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border border-blue-600 text-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2 whitespace-nowrap"
                          }, [
                            createVNode(unref(Navigation), { size: 12 }),
                            _cache[32] || (_cache[32] = createTextVNode(" Directions", -1))
                          ], 8, _hoisted_27))
                        : createCommentVNode("", true),
                      (v.status !== 'completed')
                        ? (openBlock(), createElementBlock("button", {
                            key: 1,
                            onClick: $event => (unref(openVisitModal)(v)),
                            class: "px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border border-[#2F2E8B] text-[#2F2E8B] hover:bg-[#2F2E8B]/5 transition flex items-center justify-center gap-2 whitespace-nowrap"
                          }, [
                            createVNode(unref(Pencil), { size: 12 }),
                            _cache[33] || (_cache[33] = createTextVNode(" Edit", -1))
                          ], 8, _hoisted_28))
                        : createCommentVNode("", true),
                      (v.status === 'planned')
                        ? (openBlock(), createElementBlock("button", {
                            key: 2,
                            onClick: $event => (unref(checkInVisit)(v)),
                            class: "px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center gap-2 whitespace-nowrap"
                          }, [
                            createVNode(unref(LogIn), { size: 12 }),
                            _cache[34] || (_cache[34] = createTextVNode(" Check_In", -1))
                          ], 8, _hoisted_29))
                        : createCommentVNode("", true),
                      (v.status === 'in-progress')
                        ? (openBlock(), createElementBlock("button", {
                            key: 3,
                            onClick: $event => (unref(showCheckOutModal)(v)),
                            class: "px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm bg-orange-600 text-white hover:bg-orange-700 transition flex items-center justify-center gap-2 whitespace-nowrap"
                          }, [
                            createVNode(unref(LogOut), { size: 12 }),
                            _cache[35] || (_cache[35] = createTextVNode(" Check_Out", -1))
                          ], 8, _hoisted_30))
                        : createCommentVNode("", true),
                      (v.status !== 'completed' && v.status !== 'in-progress')
                        ? (openBlock(), createElementBlock("button", {
                            key: 4,
                            onClick: $event => (unref(markVisitCompleted)(v)),
                            class: "px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center justify-center gap-2 whitespace-nowrap"
                          }, [
                            createVNode(unref(Check), { size: 12 }),
                            _cache[36] || (_cache[36] = createTextVNode(" Complete", -1))
                          ], 8, _hoisted_31))
                        : createCommentVNode("", true),
                      createBaseVNode("button", {
                        onClick: $event => (unref(deleteVisit)(v.id)),
                        class: "px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border border-red-600 text-red-600 hover:bg-red-50 transition flex items-center justify-center gap-2 whitespace-nowrap"
                      }, [
                        createVNode(unref(Trash2), { size: 12 }),
                        _cache[37] || (_cache[37] = createTextVNode(" Delete", -1))
                      ], 8, _hoisted_32)
                    ])
                  ]),
                  (v.check_in_time || v.check_out_time)
                    ? (openBlock(), createElementBlock("div", _hoisted_33, [
                        createBaseVNode("div", _hoisted_34, [
                          (v.check_in_time)
                            ? (openBlock(), createElementBlock("div", _hoisted_35, [
                                createVNode(unref(LogIn), {
                                  size: 14,
                                  class: "text-green-600"
                                }),
                                createBaseVNode("div", null, [
                                  _cache[38] || (_cache[38] = createBaseVNode("div", { class: "text-gray-400 font-bold uppercase" }, "CHECKED_IN", -1)),
                                  createBaseVNode("div", _hoisted_36, toDisplayString(unref(crmFormatDateTime)(v.check_in_time)), 1)
                                ])
                              ]))
                            : createCommentVNode("", true),
                          (v.check_out_time)
                            ? (openBlock(), createElementBlock("div", _hoisted_37, [
                                createVNode(unref(LogOut), {
                                  size: 14,
                                  class: "text-orange-600"
                                }),
                                createBaseVNode("div", null, [
                                  _cache[39] || (_cache[39] = createBaseVNode("div", { class: "text-gray-400 font-bold uppercase" }, "CHECKED_OUT", -1)),
                                  createBaseVNode("div", _hoisted_38, toDisplayString(unref(crmFormatDateTime)(v.check_out_time)), 1)
                                ])
                              ]))
                            : createCommentVNode("", true),
                          (v.actual_duration)
                            ? (openBlock(), createElementBlock("div", _hoisted_39, [
                                createVNode(unref(Timer), {
                                  size: 14,
                                  class: "text-blue-600"
                                }),
                                createBaseVNode("div", null, [
                                  _cache[40] || (_cache[40] = createBaseVNode("div", { class: "text-gray-400 font-bold uppercase" }, "TOTAL_DUR", -1)),
                                  createBaseVNode("div", _hoisted_40, toDisplayString(unref(formatVisitDuration)(v.actual_duration)), 1)
                                ])
                              ]))
                            : createCommentVNode("", true)
                        ])
                      ]))
                    : createCommentVNode("", true),
                  (v.visit_outcome)
                    ? (openBlock(), createElementBlock("div", _hoisted_41, [
                        createBaseVNode("div", _hoisted_42, [
                          createBaseVNode("div", _hoisted_43, [
                            (openBlock(), createBlock(resolveDynamicComponent(v.visit_outcome === 'successful' ? unref(CircleCheck) : (v.visit_outcome === 'no_show' ? unref(UserMinus) : (v.visit_outcome === 'rescheduled' ? unref(CalendarClock) : unref(Info)))), {
                              size: 14,
                              class: normalizeClass({ 'text-green-600': v.visit_outcome === 'successful', 'text-red-600': v.visit_outcome === 'no_show', 'text-yellow-600': v.visit_outcome === 'rescheduled', 'text-gray-600': v.visit_outcome === 'other' })
                            }, null, 8, ["class"]))
                          ]),
                          createBaseVNode("div", _hoisted_44, [
                            createBaseVNode("div", _hoisted_45, toDisplayString(v.visit_outcome.replace('_', ' ')), 1),
                            (v.outcome_notes)
                              ? (openBlock(), createElementBlock("div", _hoisted_46, toDisplayString(v.outcome_notes), 1))
                              : createCommentVNode("", true),
                            (v.follow_up_required)
                              ? (openBlock(), createElementBlock("div", _hoisted_47, [
                                  createVNode(unref(TriangleAlert), { size: 10 }),
                                  createTextVNode(" FOLLOW_UP_REQUIRED" + toDisplayString(v.follow_up_date ? ` :: BY ${unref(crmFormatDate)(v.follow_up_date)}` : ''), 1)
                                ]))
                              : createCommentVNode("", true)
                          ])
                        ])
                      ]))
                    : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_48, [
                    createBaseVNode("div", _hoisted_49, [
                      createBaseVNode("div", _hoisted_50, [
                        createVNode(unref(FileText), {
                          size: 14,
                          class: "text-[#2F2E8B]"
                        }),
                        _cache[41] || (_cache[41] = createTextVNode(" Visit_Notes ", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: $event => (unref(ensureVisitNotesLoaded)(v)),
                        class: "text-[9px] font-mono font-bold text-[#2F2E8B] hover:underline uppercase tracking-tighter flex items-center gap-1"
                      }, [
                        createVNode(unref(RefreshCw), { size: 10 }),
                        _cache[42] || (_cache[42] = createTextVNode(" RE_SYNC ", -1))
                      ], 8, _hoisted_51)
                    ]),
                    (!unref(visitNotes)[v.id] || unref(visitNotes)[v.id].length === 0)
                      ? (openBlock(), createElementBlock("div", _hoisted_52, "LOG_EMPTY: NO_NOTES_FOUND"))
                      : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList((unref(visitNotes)[v.id] || []), (n) => {
                      return (openBlock(), createElementBlock("div", {
                        key: n.id,
                        class: "text-[11px] font-mono text-gray-700 border-l border-gray-200 pl-3 py-2 mb-2 bg-gray-50/50 rounded-r-sm"
                      }, [
                        createBaseVNode("div", _hoisted_53, [
                          createBaseVNode("div", _hoisted_54, toDisplayString(n.text), 1),
                          createBaseVNode("div", _hoisted_55, toDisplayString(unref(crmFormatDateTime)(n.created_at)), 1)
                        ])
                      ]))
                    }), 128)),
                    createBaseVNode("div", _hoisted_56, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": $event => ((unref(newVisitNote)[v.id]) = $event),
                        onFocus: $event => (unref(ensureVisitNotesLoaded)(v)),
                        onKeyup: withKeys($event => (unref(submitVisitNote)(v)), ["enter"]),
                        placeholder: "ENTER_NOTE_CMD...",
                        class: "flex-1 border border-gray-200 rounded-sm px-3 py-2 text-[11px] font-mono focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition"
                      }, null, 40, _hoisted_57), [
                        [vModelText, unref(newVisitNote)[v.id]]
                      ]),
                      createBaseVNode("button", {
                        onClick: $event => (unref(submitVisitNote)(v)),
                        class: "px-4 py-2 rounded-sm bg-[#2F2E8B] text-white hover:bg-[#3D2F88] text-[10px] font-mono font-bold uppercase tracking-wider transition flex items-center gap-2"
                      }, [
                        createVNode(unref(Send), { size: 12 }),
                        _cache[43] || (_cache[43] = createTextVNode(" LOG ", -1))
                      ], 8, _hoisted_58)
                    ])
                  ])
                ], 2))
              }), 128))
            ])
          ])
        ])
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (unref(showVisitModal))
        ? (openBlock(), createElementBlock("div", _hoisted_59, [
            createBaseVNode("div", _hoisted_60, [
              _cache[52] || (_cache[52] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
              createBaseVNode("div", _hoisted_61, [
                createBaseVNode("div", _hoisted_62, [
                  _cache[46] || (_cache[46] = createBaseVNode("div", { class: "w-1 h-5 bg-[#2F2E8B]" }, null, -1)),
                  createBaseVNode("h3", _hoisted_63, [
                    createVNode(unref(MapPin), {
                      size: 14,
                      class: "text-gray-400"
                    }),
                    createTextVNode(" " + toDisplayString(unref(editingVisit) ? 'Edit_Visit' : 'Schedule_New_Visit'), 1)
                  ])
                ]),
                createBaseVNode("button", {
                  class: "text-gray-400 hover:text-gray-600 transition",
                  onClick: _cache[1] || (_cache[1] = (...args) => (unref(closeVisitModal) && unref(closeVisitModal)(...args)))
                }, [
                  createVNode(unref(X), { size: 20 })
                ])
              ]),
              createBaseVNode("div", _hoisted_64, [
                createBaseVNode("div", _hoisted_65, [
                  createBaseVNode("div", _hoisted_66, [
                    _cache[47] || (_cache[47] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                      createBaseVNode("div", { class: "w-1 h-1 bg-[#2F2E8B]" }),
                      createTextVNode(" Target_Lead ")
                    ], -1)),
                    createBaseVNode("div", _hoisted_67, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((leadSearchQuery).value = $event)),
                        onFocus: _cache[3] || (_cache[3] = $event => (showLeadDropdown.value = true)),
                        placeholder: "_SEARCH_OR_SELECT_LEAD",
                        class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition bg-white"
                      }, null, 544), [
                        [vModelText, leadSearchQuery.value]
                      ]),
                      (showLeadDropdown.value)
                        ? (openBlock(), createElementBlock("div", _hoisted_68, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredLeads.value, (ld) => {
                              return (openBlock(), createElementBlock("div", {
                                key: ld.id,
                                onClick: $event => (selectLead(ld)),
                                class: "px-4 py-2.5 text-[10px] font-mono cursor-pointer hover:bg-gray-50 border-b border-gray-50 last:border-0"
                              }, [
                                createBaseVNode("span", _hoisted_70, toDisplayString(ld.name.toUpperCase()), 1),
                                createBaseVNode("span", _hoisted_71, "// " + toDisplayString(ld.company.toUpperCase()), 1)
                              ], 8, _hoisted_69))
                            }), 128)),
                            (filteredLeads.value.length === 0)
                              ? (openBlock(), createElementBlock("div", _hoisted_72, " NO_RESULTS_FOUND "))
                              : createCommentVNode("", true)
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[48] || (_cache[48] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                      createBaseVNode("div", { class: "w-1 h-1 bg-[#2F2E8B]" }),
                      createTextVNode(" Visit_Header ")
                    ], -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(visitForm).title) = $event)),
                      class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                      placeholder: "E.G. SITE_VISIT_01"
                    }, null, 512), [
                      [vModelText, unref(visitForm).title]
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_73, [
                  (!unref(visitForm).location)
                    ? (openBlock(), createElementBlock("div", _hoisted_74, [
                        _cache[49] || (_cache[49] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                          createBaseVNode("div", { class: "w-1 h-1 bg-[#2F2E8B]" }),
                          createTextVNode(" Target_Address ")
                        ], -1)),
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(visitForm).destinationAddress) = $event)),
                          class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                          placeholder: "ENTER_LOCATION_DATA..."
                        }, null, 512), [
                          [vModelText, unref(visitForm).destinationAddress]
                        ])
                      ]))
                    : createCommentVNode("", true),
                  createBaseVNode("div", {
                    class: normalizeClass(unref(visitForm).location ? 'md:col-span-2' : '')
                  }, [
                    _cache[50] || (_cache[50] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                      createBaseVNode("div", { class: "w-1 h-1 bg-[#2F2E8B]" }),
                      createTextVNode(" Schedule_Timestamp ")
                    ], -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((unref(visitForm).scheduled_at) = $event)),
                      type: "datetime-local",
                      class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition"
                    }, null, 512), [
                      [vModelText, unref(visitForm).scheduled_at]
                    ])
                  ], 2)
                ]),
                createBaseVNode("div", null, [
                  _cache[51] || (_cache[51] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                    createBaseVNode("div", { class: "w-1 h-1 bg-[#2F2E8B]" }),
                    createTextVNode(" Internal_Context ")
                  ], -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((unref(visitForm).description) = $event)),
                    class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                    rows: "4",
                    placeholder: "ADD_TECHNICAL_NOTES_HERE..."
                  }, null, 512), [
                    [vModelText, unref(visitForm).description]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_75, [
                createBaseVNode("button", {
                  onClick: _cache[8] || (_cache[8] = (...args) => (unref(closeVisitModal) && unref(closeVisitModal)(...args))),
                  class: "px-6 py-2 rounded-sm border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition"
                }, "_CANCEL"),
                createBaseVNode("button", {
                  onClick: _cache[9] || (_cache[9] = (...args) => (unref(createVisit) && unref(createVisit)(...args))),
                  disabled: !unref(visitForm).leadId || !unref(visitForm).title,
                  class: "px-6 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                }, [
                  createVNode(unref(Check), { size: 14 }),
                  createTextVNode(" " + toDisplayString(unref(editingVisit) ? 'UPDATE_VISIT' : 'COMMIT_VISIT'), 1)
                ], 8, _hoisted_76)
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ])),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (unref(showCheckOutModalFlag))
        ? (openBlock(), createElementBlock("div", _hoisted_77, [
            createBaseVNode("div", _hoisted_78, [
              _cache[60] || (_cache[60] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
              createBaseVNode("div", _hoisted_79, [
                createBaseVNode("div", _hoisted_80, [
                  _cache[54] || (_cache[54] = createBaseVNode("div", { class: "w-1 h-5 bg-orange-600" }, null, -1)),
                  createBaseVNode("h3", _hoisted_81, [
                    createVNode(unref(LogOut), {
                      size: 14,
                      class: "text-orange-600"
                    }),
                    _cache[53] || (_cache[53] = createTextVNode(" Technical_Check_Out", -1))
                  ])
                ]),
                createBaseVNode("button", {
                  class: "text-gray-400 hover:text-gray-600 transition",
                  onClick: _cache[10] || (_cache[10] = (...args) => (unref(closeCheckOutModal) && unref(closeCheckOutModal)(...args)))
                }, [
                  createVNode(unref(X), { size: 20 })
                ])
              ]),
              createBaseVNode("div", _hoisted_82, [
                (unref(currentVisitForCheckOut))
                  ? (openBlock(), createElementBlock("div", _hoisted_83, [
                      createBaseVNode("div", _hoisted_84, [
                        createBaseVNode("div", _hoisted_85, toDisplayString(unref(currentVisitForCheckOut).title), 1),
                        createBaseVNode("div", _hoisted_86, "LEAD_ENTITITY: " + toDisplayString(unref(getLeadNameById)(unref(currentVisitForCheckOut).leadId)), 1)
                      ])
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", null, [
                  _cache[56] || (_cache[56] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                    createBaseVNode("div", { class: "w-1 h-1 bg-orange-600" }),
                    createTextVNode(" Performance_Outcome ")
                  ], -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((unref(checkOutForm).visit_outcome) = $event)),
                    class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-orange-600 outline-none transition bg-white"
                  }, [...(_cache[55] || (_cache[55] = [
                    createBaseVNode("option", { value: "" }, "_SELECT_OUTCOME", -1),
                    createBaseVNode("option", { value: "successful" }, "SUCCESSFUL // OBJECTIVES_MET", -1),
                    createBaseVNode("option", { value: "no_show" }, "NO_SHOW // CLIENT_ABSENT", -1),
                    createBaseVNode("option", { value: "rescheduled" }, "RESCHEDULED // TARGET_DATE_CHANGED", -1),
                    createBaseVNode("option", { value: "other" }, "OTHER // MISC_LOG", -1)
                  ]))], 512), [
                    [vModelSelect, unref(checkOutForm).visit_outcome]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[57] || (_cache[57] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                    createBaseVNode("div", { class: "w-1 h-1 bg-orange-600" }),
                    createTextVNode(" Outcome_Summary ")
                  ], -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((unref(checkOutForm).outcome_notes) = $event)),
                    class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-orange-600 outline-none transition",
                    rows: "3",
                    placeholder: "ENTER_TECHNICAL_SUMMARY..."
                  }, null, 512), [
                    [vModelText, unref(checkOutForm).outcome_notes]
                  ])
                ]),
                createBaseVNode("div", _hoisted_87, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((unref(checkOutForm).follow_up_required) = $event)),
                    id: "followUpRequired",
                    class: "w-4 h-4 text-orange-600 border-gray-300 rounded-sm focus:ring-orange-500"
                  }, null, 512), [
                    [vModelCheckbox, unref(checkOutForm).follow_up_required]
                  ]),
                  _cache[58] || (_cache[58] = createBaseVNode("label", {
                    for: "followUpRequired",
                    class: "text-[10px] font-mono font-bold text-gray-700 uppercase tracking-wider"
                  }, "Follow_Up_Required", -1))
                ]),
                (unref(checkOutForm).follow_up_required)
                  ? (openBlock(), createElementBlock("div", _hoisted_88, [
                      _cache[59] || (_cache[59] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                        createBaseVNode("div", { class: "w-1 h-1 bg-orange-600" }),
                        createTextVNode(" Target_Follow_Up_Date ")
                      ], -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => ((unref(checkOutForm).follow_up_date) = $event)),
                        type: "date",
                        class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-orange-600 outline-none transition"
                      }, null, 512), [
                        [vModelText, unref(checkOutForm).follow_up_date]
                      ])
                    ]))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_89, [
                createBaseVNode("button", {
                  onClick: _cache[15] || (_cache[15] = (...args) => (unref(closeCheckOutModal) && unref(closeCheckOutModal)(...args))),
                  class: "px-6 py-2 rounded-sm border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition"
                }, "_CANCEL"),
                createBaseVNode("button", {
                  onClick: _cache[16] || (_cache[16] = (...args) => (unref(confirmCheckOut) && unref(confirmCheckOut)(...args))),
                  disabled: !unref(checkOutForm).visit_outcome || unref(checkingOut),
                  class: "px-6 py-2 rounded-sm bg-orange-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(checkingOut) ? 'Loader2' : 'Check'), {
                    size: 14,
                    class: normalizeClass({ 'animate-spin': unref(checkingOut) })
                  }, null, 8, ["class"])),
                  createTextVNode(" " + toDisplayString(unref(checkingOut) ? 'PROCESSING...' : 'COMMIT_OUTCOME'), 1)
                ], 8, _hoisted_90)
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ]))
  ], 64))
}
}

};
const CRMVisitsPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-a3f6646d"]]);

export { CRMVisitsPage as default };
