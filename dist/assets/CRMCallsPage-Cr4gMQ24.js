import { a5 as createLucideIcon, g as _export_sfc, r as ref, D as computed, O as watch, h as onMounted, o as openBlock, c as createElementBlock, b as createBaseVNode, q as createVNode, y as unref, m as createTextVNode, t as toDisplayString, l as createCommentVNode, j as normalizeClass, v as withDirectives, x as vModelText, a6 as X, F as Fragment, e as renderList, z as createBlock, S as vModelSelect, ab as isRef, Y as Teleport, a9 as Calendar, aa as FileText, s as withModifiers, H as withKeys } from './index-CeRQDSGV.js';
import { _ as _sfc_main$1 } from './BackButton-JLCEWWTN.js';
import { u as useCRMModule } from './CRMModule-CmKTb6Hd.js';
import { C as CircleUser } from './circle-user-BINs6nwn.js';
import { P as Phone } from './phone-DPx7zpBd.js';
import { L as List } from './list-BTFE0gYL.js';
import { S as Search, C as ChevronLeft } from './search-DHREaQgf.js';
import { C as ChevronRight } from './chevron-right-CJBkyNFY.js';
import { C as Clock } from './clock-DSqTcHsA.js';
import { C as Check } from './check-DBX__2Do.js';
import { P as PhoneCall } from './phone-call-CQ1X6bkO.js';
import { C as ChevronDown } from './chevron-down-BwYbu79O.js';
import { T as Trash2 } from './trash-2-D0Zbbatd.js';
import { S as Send } from './send-4Pb92ofn.js';
import './useCurrency-Bl0BL06g.js';
import './FileSaver.min-CLGdtH5R.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ArrowDownLeft = createLucideIcon("ArrowDownLeftIcon", [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ArrowUpRight = createLucideIcon("ArrowUpRightIcon", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const PhoneMissed = createLucideIcon("PhoneMissedIcon", [
  ["line", { x1: "22", x2: "16", y1: "2", y2: "8", key: "1xzwqn" }],
  ["line", { x1: "16", x2: "22", y1: "2", y2: "8", key: "13zxdn" }],
  [
    "path",
    {
      d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
      key: "foiqr5"
    }
  ]
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
const _hoisted_10 = { class: "space-y-3 border-b border-gray-100 pb-4" };
const _hoisted_11 = { class: "flex items-center justify-between" };
const _hoisted_12 = { class: "flex items-center gap-2" };
const _hoisted_13 = { class: "text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2" };
const _hoisted_14 = { class: "text-[9px] font-mono font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-sm" };
const _hoisted_15 = { class: "relative" };
const _hoisted_16 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "bg-white border border-gray-200 rounded-sm shadow-none relative overflow-hidden" };
const _hoisted_19 = { class: "p-4 md:p-6 space-y-2 relative z-10" };
const _hoisted_20 = {
  key: 0,
  class: "text-center py-12 border-2 border-dashed border-gray-100 rounded-sm"
};
const _hoisted_21 = { class: "flex items-center gap-3 px-3 py-2.5" };
const _hoisted_22 = { class: "font-bold text-gray-900 text-[11px] font-mono uppercase tracking-tight w-44 truncate flex-shrink-0" };
const _hoisted_23 = { class: "flex items-center gap-2 flex-1 flex-wrap min-w-0" };
const _hoisted_24 = {
  key: 0,
  class: "text-[10px] font-mono text-gray-400 truncate"
};
const _hoisted_25 = {
  key: 3,
  class: "text-[9px] font-mono text-gray-400 flex items-center gap-0.5 flex-shrink-0"
};
const _hoisted_26 = { class: "text-[9px] font-mono text-gray-300 flex items-center gap-0.5 flex-shrink-0 ml-auto" };
const _hoisted_27 = ["onClick"];
const _hoisted_28 = ["onClick"];
const _hoisted_29 = {
  key: 0,
  class: "px-3 pb-2 -mt-1"
};
const _hoisted_30 = { class: "text-[9px] font-mono text-gray-400 italic" };
const _hoisted_31 = {
  key: 1,
  class: "border-t border-gray-100 px-3 py-2.5 bg-gray-50/50"
};
const _hoisted_32 = {
  key: 0,
  class: "text-[9px] font-mono text-gray-400 italic mb-2"
};
const _hoisted_33 = { class: "flex-1" };
const _hoisted_34 = { class: "text-[9px] text-gray-400 whitespace-nowrap" };
const _hoisted_35 = { class: "flex gap-2 mt-2" };
const _hoisted_36 = ["onUpdate:modelValue", "onKeyup"];
const _hoisted_37 = ["onClick"];
const _hoisted_38 = {
  key: 1,
  class: "flex items-center justify-between pt-3 border-t border-gray-100 mt-2"
};
const _hoisted_39 = ["disabled"];
const _hoisted_40 = { class: "flex items-center gap-1" };
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["disabled"];
const _hoisted_43 = {
  key: 2,
  class: "pt-2 text-center text-[9px] font-mono text-gray-400 uppercase tracking-widest"
};
const _hoisted_44 = {
  key: 0,
  class: "fixed inset-0 bg-black/60 backdrop-blur-md flex items-start justify-center z-[9999] p-4 pt-20"
};
const _hoisted_45 = { class: "bg-white rounded-sm shadow-2xl w-full max-w-md border border-gray-200 relative overflow-hidden animate-modal-in" };
const _hoisted_46 = { class: "p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative z-10" };
const _hoisted_47 = { class: "flex items-center gap-3" };
const _hoisted_48 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2" };
const _hoisted_49 = { class: "p-4 md:p-6 space-y-5 relative z-10" };
const _hoisted_50 = { class: "p-3 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-between" };
const _hoisted_51 = { class: "flex items-center gap-2" };
const _hoisted_52 = { class: "text-lg font-black text-[#2F2E8B] font-mono" };
const _hoisted_53 = { class: "p-4 md:p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 relative z-10" };

const PAGE_SIZE = 15;

// All calls (raw, filtered only by type=call)

const _sfc_main = {
  __name: 'CRMCallsPage',
  setup(__props) {

const {
  getUserEmail, moduleLoading, filteredCommunications, callNotes, newCallNote, ensureCallNotesLoaded, submitCallNote, deleteCommunicationRecord,
  crmFormatDateTime, showCallOutcomeModal, callOutcome, callSummary, callTimerSeconds,
  cancelCallOutcome, saveCallOutcome, formatDuration, goToModule
} = useCRMModule();

// Per-card notes toggle state
const openNotes = ref({});

// Search / Filter / Pagination
const callSearch = ref('');
const callFilter = ref('all');
const currentPage = ref(1);
const showAll = ref(false);
const allCalls = computed(() => {
  const q = callSearch.value.trim().toLowerCase();
  const base = (filteredCommunications.value || []).filter(c => c.type === 'call');
  const afterOutcome = callFilter.value === 'all' ? base : base.filter(c => c.outcome === callFilter.value);
  if (!q) return afterOutcome;
  return afterOutcome.filter(c =>
    (c.contactName || '').toLowerCase().includes(q) ||
    (c.phone || '').toLowerCase().includes(q) ||
    (c.outcome || '').toLowerCase().includes(q) ||
    (c.direction || '').toLowerCase().includes(q) ||
    (c.message || '').toLowerCase().includes(q)
  );
});

const totalPages = computed(() => Math.max(1, Math.ceil(allCalls.value.length / PAGE_SIZE)));

const displayedCalls = computed(() => {
  if (showAll.value) return allCalls.value;
  const start = (currentPage.value - 1) * PAGE_SIZE;
  return allCalls.value.slice(start, start + PAGE_SIZE);
});

// Reset page when filter/search changes
watch([callSearch, callFilter], () => { currentPage.value = 1; });

onMounted(() => {
  goToModule('calls');
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[30] || (_cache[30] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(unref(_sfc_main$1), {
            route: "/dashboard/crm",
            variant: "icon-only"
          }),
          _cache[10] || (_cache[10] = createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }, null, -1)),
          _cache[11] || (_cache[11] = createBaseVNode("div", null, [
            createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Sales // CRM // Calls"),
            createBaseVNode("h1", { class: "text-lg font-black text-gray-900 uppercase tracking-tight" }, "Call_Logs")
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
          ? (openBlock(), createElementBlock("div", _hoisted_9, [...(_cache[12] || (_cache[12] = [
              createBaseVNode("div", { class: "h-12 w-12 border-4 border-gray-100 border-t-[#2F2E8B] rounded-full animate-spin" }, null, -1)
            ]))]))
          : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_10, [
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              _cache[14] || (_cache[14] = createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }, null, -1)),
              createBaseVNode("h3", _hoisted_13, [
                createVNode(unref(Phone), {
                  size: 14,
                  class: "text-gray-400"
                }),
                _cache[13] || (_cache[13] = createTextVNode(" Call_Records ", -1))
              ]),
              createBaseVNode("span", _hoisted_14, toDisplayString(displayedCalls.value.length) + " / " + toDisplayString(allCalls.value.length), 1)
            ]),
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = $event => (showAll.value = !showAll.value)),
              class: normalizeClass(["text-[9px] font-mono font-bold uppercase tracking-wider border rounded-sm px-3 py-1.5 transition flex items-center gap-1", showAll.value ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]'])
            }, [
              createVNode(unref(List), { size: 10 }),
              createTextVNode(" " + toDisplayString(showAll.value ? 'Paginated' : 'Show_All'), 1)
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_15, [
            createVNode(unref(Search), {
              size: 13,
              class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
            }),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((callSearch).value = $event)),
              placeholder: "SEARCH_CONTACT, PHONE, OUTCOME...",
              class: "w-full border border-gray-200 rounded-sm pl-9 pr-8 py-2 text-[10px] font-mono focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition"
            }, null, 512), [
              [vModelText, callSearch.value]
            ]),
            (callSearch.value)
              ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: _cache[2] || (_cache[2] = $event => (callSearch.value = '')),
                  class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                }, [
                  createVNode(unref(X), { size: 12 })
                ]))
              : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_16, [
            (openBlock(), createElementBlock(Fragment, null, renderList(['all', 'connected', 'no-answer', 'voicemail', 'busy', 'failed'], (f) => {
              return createBaseVNode("button", {
                key: f,
                onClick: $event => {callFilter.value = f; currentPage.value = 1;},
                class: normalizeClass([callFilter.value === f ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#2F2E8B] hover:text-[#2F2E8B]', "px-3 py-1 rounded-sm border text-[9px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition"])
              }, toDisplayString(f === 'all' ? 'All' : f), 11, _hoisted_17)
            }), 64))
          ])
        ]),
        createBaseVNode("div", _hoisted_18, [
          _cache[21] || (_cache[21] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
          createBaseVNode("div", _hoisted_19, [
            (displayedCalls.value.length === 0)
              ? (openBlock(), createElementBlock("div", _hoisted_20, [
                  createVNode(unref(PhoneMissed), {
                    size: 48,
                    class: "text-gray-200 mx-auto mb-4"
                  }),
                  _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "No_Calls_Logged", -1)),
                  _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-xs text-gray-400 mt-2" }, "TECHNICAL_LOGS_EMPTY", -1))
                ]))
              : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(displayedCalls.value, (comm) => {
              return (openBlock(), createElementBlock("div", {
                key: comm.id,
                class: normalizeClass(["border border-gray-200 rounded-sm hover:border-[#2F2E8B]/40 transition bg-white relative overflow-hidden", {
                'border-l-4 border-l-green-500': comm.outcome === 'connected',
                'border-l-4 border-l-red-400': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                'border-l-4 border-l-yellow-400': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                'border-l-4 border-l-[#2F2E8B]': !comm.outcome,
              }])
              }, [
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("div", {
                    class: normalizeClass(["w-7 h-7 flex-shrink-0 border rounded-sm flex items-center justify-center", {
                    'border-green-200 bg-green-50': comm.outcome === 'connected',
                    'border-red-200 bg-red-50': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                    'border-yellow-200 bg-yellow-50': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                    'border-gray-100 bg-gray-50': !comm.outcome,
                  }])
                  }, [
                    createVNode(unref(PhoneCall), {
                      size: 12,
                      class: normalizeClass({
                      'text-green-600': comm.outcome === 'connected',
                      'text-red-500': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                      'text-yellow-600': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                      'text-[#2F2E8B]': !comm.outcome,
                    })
                    }, null, 8, ["class"])
                  ], 2),
                  createBaseVNode("span", _hoisted_22, toDisplayString(comm.contactName || 'UNKNOWN'), 1),
                  createBaseVNode("div", _hoisted_23, [
                    (comm.phone)
                      ? (openBlock(), createElementBlock("span", _hoisted_24, toDisplayString(comm.phone), 1))
                      : createCommentVNode("", true),
                    (comm.direction)
                      ? (openBlock(), createElementBlock("span", {
                          key: 1,
                          class: normalizeClass(["flex items-center gap-0.5 text-[9px] font-mono font-bold uppercase", comm.direction === 'outbound' ? 'text-blue-500' : 'text-green-600'])
                        }, [
                          (comm.direction === 'outbound')
                            ? (openBlock(), createBlock(unref(ArrowUpRight), {
                                key: 0,
                                size: 9
                              }))
                            : (openBlock(), createBlock(unref(ArrowDownLeft), {
                                key: 1,
                                size: 9
                              })),
                          createTextVNode(" " + toDisplayString(comm.direction), 1)
                        ], 2))
                      : createCommentVNode("", true),
                    (comm.outcome)
                      ? (openBlock(), createElementBlock("span", {
                          key: 2,
                          class: normalizeClass(["px-1.5 py-0.5 rounded-sm text-[8px] font-mono font-bold uppercase border flex-shrink-0", {
                      'bg-green-50 text-green-700 border-green-200': comm.outcome === 'connected',
                      'bg-red-50 text-red-700 border-red-200': comm.outcome === 'no-answer' || comm.outcome === 'failed',
                      'bg-yellow-50 text-yellow-700 border-yellow-200': comm.outcome === 'voicemail' || comm.outcome === 'busy',
                    }])
                        }, toDisplayString(comm.outcome), 3))
                      : createCommentVNode("", true),
                    (comm.duration)
                      ? (openBlock(), createElementBlock("span", _hoisted_25, [
                          createVNode(unref(Clock), { size: 9 }),
                          createTextVNode(" " + toDisplayString(comm.duration) + "s ", 1)
                        ]))
                      : createCommentVNode("", true),
                    createBaseVNode("span", _hoisted_26, [
                      createVNode(unref(Calendar), { size: 9 }),
                      createTextVNode(" " + toDisplayString(unref(crmFormatDateTime)(comm.created_at || comm.timestamp)), 1)
                    ])
                  ]),
                  createBaseVNode("button", {
                    onClick: $event => {openNotes.value[comm.id] = !openNotes.value[comm.id]; openNotes.value[comm.id] && unref(ensureCallNotesLoaded)(comm);},
                    class: "flex-shrink-0 flex items-center gap-1 text-[9px] font-mono font-bold uppercase text-gray-400 hover:text-[#2F2E8B] border border-gray-100 hover:border-[#2F2E8B]/40 px-2 py-1 rounded-sm transition"
                  }, [
                    createVNode(unref(FileText), { size: 9 }),
                    _cache[17] || (_cache[17] = createTextVNode(" Notes ", -1)),
                    createVNode(unref(ChevronDown), {
                      size: 9,
                      class: normalizeClass([openNotes.value[comm.id] ? 'rotate-180' : '', "transition-transform"])
                    }, null, 8, ["class"])
                  ], 8, _hoisted_27),
                  createBaseVNode("button", {
                    onClick: withModifiers($event => (unref(deleteCommunicationRecord)(comm)), ["stop"]),
                    class: "flex-shrink-0 text-gray-300 hover:text-red-500 transition p-1 border border-transparent hover:border-red-200 rounded-sm"
                  }, [
                    createVNode(unref(Trash2), { size: 12 })
                  ], 8, _hoisted_28)
                ]),
                (comm.message || comm.subject)
                  ? (openBlock(), createElementBlock("div", _hoisted_29, [
                      createBaseVNode("span", _hoisted_30, toDisplayString(comm.message || comm.subject), 1)
                    ]))
                  : createCommentVNode("", true),
                (openNotes.value[comm.id])
                  ? (openBlock(), createElementBlock("div", _hoisted_31, [
                      (!unref(callNotes)[comm.id] || unref(callNotes)[comm.id].length === 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_32, "LOG_EMPTY: NO_NOTES_FOUND"))
                        : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList((unref(callNotes)[comm.id] || []), (n) => {
                        return (openBlock(), createElementBlock("div", {
                          key: n.id,
                          class: "text-[10px] font-mono text-gray-700 border-l-2 border-[#2F2E8B]/20 pl-2 py-1 mb-1 flex items-start justify-between gap-2"
                        }, [
                          createBaseVNode("span", _hoisted_33, toDisplayString(n.text), 1),
                          createBaseVNode("span", _hoisted_34, toDisplayString(unref(crmFormatDateTime)(n.created_at)), 1)
                        ]))
                      }), 128)),
                      createBaseVNode("div", _hoisted_35, [
                        withDirectives(createBaseVNode("input", {
                          "onUpdate:modelValue": $event => ((unref(newCallNote)[comm.id]) = $event),
                          onKeyup: withKeys($event => (unref(submitCallNote)(comm)), ["enter"]),
                          placeholder: "ENTER_NOTE_CMD...",
                          class: "flex-1 border border-gray-200 rounded-sm px-2.5 py-1.5 text-[10px] font-mono focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none transition bg-white"
                        }, null, 40, _hoisted_36), [
                          [vModelText, unref(newCallNote)[comm.id]]
                        ]),
                        createBaseVNode("button", {
                          onClick: $event => (unref(submitCallNote)(comm)),
                          class: "px-3 py-1.5 rounded-sm bg-[#2F2E8B] text-white hover:bg-[#3D2F88] text-[9px] font-mono font-bold uppercase tracking-wider transition flex items-center gap-1"
                        }, [
                          createVNode(unref(Send), { size: 10 }),
                          _cache[18] || (_cache[18] = createTextVNode(" LOG ", -1))
                        ], 8, _hoisted_37)
                      ])
                    ]))
                  : createCommentVNode("", true)
              ], 2))
            }), 128)),
            (!showAll.value && totalPages.value > 1)
              ? (openBlock(), createElementBlock("div", _hoisted_38, [
                  createBaseVNode("button", {
                    onClick: _cache[3] || (_cache[3] = $event => (currentPage.value = Math.max(1, currentPage.value - 1))),
                    disabled: currentPage.value <= 1,
                    class: normalizeClass(["flex items-center gap-1 px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border transition disabled:opacity-30", currentPage.value > 1 ? 'border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]' : 'border-gray-100 text-gray-300'])
                  }, [
                    createVNode(unref(ChevronLeft), { size: 10 }),
                    _cache[19] || (_cache[19] = createTextVNode(" Prev ", -1))
                  ], 10, _hoisted_39),
                  createBaseVNode("div", _hoisted_40, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(totalPages.value, (p) => {
                      return (openBlock(), createElementBlock("button", {
                        key: p,
                        onClick: $event => (currentPage.value = p),
                        class: normalizeClass([p === currentPage.value ? 'bg-[#2F2E8B] text-white border-[#2F2E8B]' : 'bg-white text-gray-400 border-gray-200 hover:border-[#2F2E8B]', "w-6 h-6 text-[9px] font-mono font-bold rounded-sm border transition"])
                      }, toDisplayString(p), 11, _hoisted_41))
                    }), 128))
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[4] || (_cache[4] = $event => (currentPage.value = Math.min(totalPages.value, currentPage.value + 1))),
                    disabled: currentPage.value >= totalPages.value,
                    class: normalizeClass(["flex items-center gap-1 px-3 py-1.5 text-[9px] font-mono font-bold uppercase rounded-sm border transition disabled:opacity-30", currentPage.value < totalPages.value ? 'border-gray-200 text-gray-600 hover:border-[#2F2E8B] hover:text-[#2F2E8B]' : 'border-gray-100 text-gray-300'])
                  }, [
                    _cache[20] || (_cache[20] = createTextVNode(" Next ", -1)),
                    createVNode(unref(ChevronRight), { size: 10 })
                  ], 10, _hoisted_42)
                ]))
              : createCommentVNode("", true),
            (showAll.value && allCalls.value.length > PAGE_SIZE)
              ? (openBlock(), createElementBlock("div", _hoisted_43, " Showing all " + toDisplayString(allCalls.value.length) + " records ", 1))
              : createCommentVNode("", true)
          ])
        ])
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (unref(showCallOutcomeModal))
        ? (openBlock(), createElementBlock("div", _hoisted_44, [
            createBaseVNode("div", _hoisted_45, [
              _cache[29] || (_cache[29] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none" }, null, -1)),
              createBaseVNode("div", _hoisted_46, [
                createBaseVNode("div", _hoisted_47, [
                  _cache[23] || (_cache[23] = createBaseVNode("div", { class: "w-1 h-5 bg-[#2F2E8B]" }, null, -1)),
                  createBaseVNode("h3", _hoisted_48, [
                    createVNode(unref(Phone), {
                      size: 14,
                      class: "text-gray-400"
                    }),
                    _cache[22] || (_cache[22] = createTextVNode(" Log_Call_Outcome ", -1))
                  ])
                ]),
                createBaseVNode("button", {
                  class: "text-gray-400 hover:text-gray-600 transition",
                  onClick: _cache[5] || (_cache[5] = (...args) => (unref(cancelCallOutcome) && unref(cancelCallOutcome)(...args)))
                }, [
                  createVNode(unref(X), { size: 20 })
                ])
              ]),
              createBaseVNode("div", _hoisted_49, [
                createBaseVNode("div", _hoisted_50, [
                  createBaseVNode("div", _hoisted_51, [
                    createVNode(unref(Clock), {
                      size: 12,
                      class: "text-[#2F2E8B]"
                    }),
                    _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Call_Duration", -1))
                  ]),
                  createBaseVNode("span", _hoisted_52, toDisplayString(unref(formatDuration)(unref(callTimerSeconds))), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[26] || (_cache[26] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                    createBaseVNode("div", { class: "w-1 h-1 bg-[#2F2E8B]" }),
                    createTextVNode(" Call_Outcome ")
                  ], -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => (isRef(callOutcome) ? (callOutcome).value = $event : null)),
                    class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition bg-white"
                  }, [...(_cache[25] || (_cache[25] = [
                    createBaseVNode("option", { value: "connected" }, "CONNECTED // OBJECTIVES_MET", -1),
                    createBaseVNode("option", { value: "no-answer" }, "NO_ANSWER // CLIENT_UNAVAILABLE", -1),
                    createBaseVNode("option", { value: "voicemail" }, "VOICEMAIL // MESSAGE_LEFT", -1),
                    createBaseVNode("option", { value: "busy" }, "BUSY // LINE_OCCUPIED", -1),
                    createBaseVNode("option", { value: "failed" }, "FAILED // CONNECTION_ERROR", -1)
                  ]))], 512), [
                    [vModelSelect, unref(callOutcome)]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[27] || (_cache[27] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2" }, [
                    createBaseVNode("div", { class: "w-1 h-1 bg-[#2F2E8B]" }),
                    createTextVNode(" Call_Summary ")
                  ], -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => (isRef(callSummary) ? (callSummary).value = $event : null)),
                    rows: "3",
                    class: "w-full border border-gray-200 rounded-sm px-4 py-2.5 text-xs font-mono focus:ring-1 focus:ring-[#2F2E8B] outline-none transition",
                    placeholder: "ADD_CALL_NOTES_HERE..."
                  }, null, 512), [
                    [vModelText, unref(callSummary)]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_53, [
                createBaseVNode("button", {
                  onClick: _cache[8] || (_cache[8] = (...args) => (unref(cancelCallOutcome) && unref(cancelCallOutcome)(...args))),
                  class: "px-6 py-2 rounded-sm border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition"
                }, "_CANCEL"),
                createBaseVNode("button", {
                  onClick: _cache[9] || (_cache[9] = (...args) => (unref(saveCallOutcome) && unref(saveCallOutcome)(...args))),
                  class: "px-6 py-2 rounded-sm bg-[#2F2E8B] text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#3D2F88] transition flex items-center gap-2"
                }, [
                  createVNode(unref(Check), { size: 14 }),
                  _cache[28] || (_cache[28] = createTextVNode(" COMMIT_LOG ", -1))
                ])
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ]))
  ]))
}
}

};
const CRMCallsPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-961310b2"]]);

export { CRMCallsPage as default };
