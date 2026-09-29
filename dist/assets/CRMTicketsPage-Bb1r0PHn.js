import { _ as _export_sfc, r as ref, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, a as createStaticVNode, s as unref, a4 as Filter, A as createTextVNode, F as Fragment, e as renderList, C as createBlock, j as createCommentVNode, T as Teleport, t as toDisplayString, h as normalizeClass, D as resolveComponent, o as openBlock, a2 as MessageSquare, v as withModifiers } from './index-D3zh6Tx5.js';
import { P as Plus } from './plus-DJmFpN5A.js';
import { S as Search } from './search-Q-2cr8Cb.js';
import { A as ArrowLeft } from './arrow-left-DyFrL4eI.js';
import { P as Phone } from './phone-3Z2DrIju.js';
import { L as Layers } from './layers-IF78Nb6A.js';
import { T as TriangleAlert } from './triangle-alert-DR7ACPHk.js';
import { C as Clock } from './clock-q-wEG4lU.js';
import { C as CircleCheckBig } from './circle-check-big-BwXW5hma.js';

const _hoisted_1 = { class: "h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto" };
const _hoisted_2 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-sm shrink-0" };
const _hoisted_3 = { class: "px-4 sm:px-6 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex gap-2" };
const _hoisted_6 = { class: "px-3 py-1.5 bg-transparent border border-gray-300 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2" };
const _hoisted_7 = { class: "flex-1 w-full relative z-10 blur-scoped pb-20" };
const _hoisted_8 = { class: "px-4 sm:px-6 py-6 w-full" };
const _hoisted_9 = { class: "flex justify-between items-center mb-4" };
const _hoisted_10 = { class: "relative w-64" };
const _hoisted_11 = { class: "bg-white border border-gray-200 shadow-sm overflow-x-auto" };
const _hoisted_12 = { class: "w-full text-left border-collapse" };
const _hoisted_13 = { class: "text-xs font-mono" };
const _hoisted_14 = { class: "p-3 text-absa-passion font-bold" };
const _hoisted_15 = { class: "p-3 text-gray-900" };
const _hoisted_16 = { class: "p-3 text-gray-600" };
const _hoisted_17 = { class: "p-3 text-gray-500" };
const _hoisted_18 = { class: "flex items-center gap-1" };
const _hoisted_19 = { class: "p-3" };
const _hoisted_20 = { class: "p-3" };
const _hoisted_21 = { class: "p-3 text-gray-400" };
const _hoisted_22 = { class: "p-3 text-right" };
const _hoisted_23 = ["onClick"];
const _hoisted_24 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_25 = { class: "bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_26 = { class: "bg-white border-b border-gray-200 p-3 flex justify-between items-center" };
const _hoisted_27 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };
const _hoisted_28 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_29 = { class: "bg-white rounded-none shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_30 = { class: "bg-white border-b border-gray-200 p-4 flex justify-between items-center" };
const _hoisted_31 = { class: "text-sm font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" };
const _hoisted_32 = { class: "text-[9px] font-mono text-gray-500 mt-1 uppercase" };
const _hoisted_33 = { class: "p-6 font-mono text-sm space-y-6" };
const _hoisted_34 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_35 = { class: "text-gray-900 font-bold" };
const _hoisted_36 = { class: "text-gray-900 flex items-center gap-2" };
const _hoisted_37 = { class: "text-gray-900 font-bold" };
const _hoisted_38 = { class: "text-gray-400 font-normal" };
const _hoisted_39 = { class: "space-y-3 text-xs" };
const _hoisted_40 = { class: "flex gap-3" };
const _hoisted_41 = { class: "text-gray-500 text-[9px]" };
const _hoisted_42 = { class: "text-gray-800" };
const _hoisted_43 = { class: "flex gap-3" };
const _hoisted_44 = { class: "text-gray-500 text-[9px]" };
const _hoisted_45 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };


const _sfc_main = {
  __name: 'CRMTicketsPage',
  setup(__props) {

const showNewCaseModal = ref(false);
const selectedTicket = ref(null);
const mockTickets = ref([
  { id: 'CASE-4892', type: 'Complaint', customer: '0977 123 456', status: 'Open', priority: 'High', channel: 'Voice', sla: 'At Risk', created: '2026-09-28' },
  { id: 'CASE-4891', type: 'Enquiry', customer: '+260 96 111222', status: 'Resolved', priority: 'Medium', channel: 'WhatsApp', sla: 'Met', created: '2026-09-28' },
  { id: 'CASE-4890', type: 'Account Block', customer: 'John Banda', status: 'Escalated', priority: 'Critical', channel: 'Facebook', sla: 'Breached', created: '2026-09-27' },
  { id: 'CASE-4889', type: 'Card Delivery', customer: 'Mary S.', status: 'Pending', priority: 'Low', channel: 'Email', sla: 'On Track', created: '2026-09-27' },
]);


return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[24] || (_cache[24] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(_component_router_link, {
            to: "/dashboard/crm",
            class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1"
          }, {
            default: withCtx(() => [
              createVNode(unref(ArrowLeft), { size: 14 }),
              _cache[6] || (_cache[6] = createTextVNode(" Back", -1))
            ]),
            _: 1
          }),
          _cache[7] || (_cache[7] = createStaticVNode("<div class=\"w-2 h-8 bg-absa-passion rounded-none ml-2\" data-v-08b0e855></div><div data-v-08b0e855><div class=\"flex items-center gap-1.5\" data-v-08b0e855><span class=\"text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-08b0e855>Case Management</span><span class=\"text-[10px] font-mono font-bold text-gray-300\" data-v-08b0e855>//</span><span class=\"text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest\" data-v-08b0e855>Global Queue</span></div><h1 class=\"text-xl font-black font-display text-gray-900 uppercase tracking-tight\" data-v-08b0e855>Tickets &amp; Cases</h1></div>", 2))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("button", _hoisted_6, [
            createVNode(unref(Filter), { size: 12 }),
            _cache[8] || (_cache[8] = createTextVNode(" Filter", -1))
          ]),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = $event => (showNewCaseModal.value = true)),
            class: "px-3 py-1.5 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-2"
          }, [
            createVNode(unref(Plus), { size: 12 }),
            _cache[9] || (_cache[9] = createTextVNode(" New Case", -1))
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_7, [
      createBaseVNode("div", _hoisted_8, [
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createVNode(unref(Search), {
              class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
              size: 14
            }),
            _cache[10] || (_cache[10] = createBaseVNode("input", {
              type: "text",
              placeholder: "Search ticket ID or phone...",
              class: "w-full bg-white border border-gray-200 rounded-none pl-9 pr-3 py-1.5 text-xs font-mono outline-none focus:border-absa-passion"
            }, null, -1))
          ]),
          _cache[11] || (_cache[11] = createBaseVNode("div", { class: "flex text-[9px] font-mono font-bold uppercase border border-gray-200 bg-white" }, [
            createBaseVNode("button", { class: "px-3 py-1.5 bg-gray-50 text-absa-passion border-r border-gray-200" }, "All"),
            createBaseVNode("button", { class: "px-3 py-1.5 hover:bg-gray-50 border-r border-gray-200 text-gray-500" }, "Open"),
            createBaseVNode("button", { class: "px-3 py-1.5 hover:bg-gray-50 text-gray-500" }, "Escalated")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_11, [
          createBaseVNode("table", _hoisted_12, [
            _cache[12] || (_cache[12] = createBaseVNode("thead", null, [
              createBaseVNode("tr", { class: "bg-gray-50 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200" }, [
                createBaseVNode("th", { class: "p-3" }, "Ticket ID"),
                createBaseVNode("th", { class: "p-3" }, "Customer Info"),
                createBaseVNode("th", { class: "p-3" }, "Type"),
                createBaseVNode("th", { class: "p-3" }, "Channel"),
                createBaseVNode("th", { class: "p-3" }, "Status"),
                createBaseVNode("th", { class: "p-3" }, "SLA Health"),
                createBaseVNode("th", { class: "p-3" }, "Created"),
                createBaseVNode("th", { class: "p-3 text-right" }, "Action")
              ])
            ], -1)),
            createBaseVNode("tbody", _hoisted_13, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(mockTickets.value, (ticket) => {
                return (openBlock(), createElementBlock("tr", {
                  key: ticket.id,
                  class: "border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                }, [
                  createBaseVNode("td", _hoisted_14, toDisplayString(ticket.id), 1),
                  createBaseVNode("td", _hoisted_15, toDisplayString(ticket.customer), 1),
                  createBaseVNode("td", _hoisted_16, toDisplayString(ticket.type), 1),
                  createBaseVNode("td", _hoisted_17, [
                    createBaseVNode("div", _hoisted_18, [
                      (ticket.channel === 'Voice')
                        ? (openBlock(), createBlock(unref(Phone), {
                            key: 0,
                            size: 12
                          }))
                        : createCommentVNode("", true),
                      (ticket.channel === 'WhatsApp')
                        ? (openBlock(), createBlock(unref(MessageSquare), {
                            key: 1,
                            size: 12,
                            class: "text-green-500"
                          }))
                        : createCommentVNode("", true),
                      (ticket.channel === 'Facebook')
                        ? (openBlock(), createBlock(unref(Layers), {
                            key: 2,
                            size: 12,
                            class: "text-blue-500"
                          }))
                        : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(ticket.channel), 1)
                    ])
                  ]),
                  createBaseVNode("td", _hoisted_19, [
                    createBaseVNode("span", {
                      class: normalizeClass(["px-2 py-0.5 border border-gray-200 bg-white text-[9px] uppercase tracking-widest font-bold", ticket.status === 'Open' ? 'text-blue-600 border-blue-200' : ticket.status === 'Escalated' ? 'text-orange-500 border-orange-200' : 'text-gray-500'])
                    }, toDisplayString(ticket.status), 3)
                  ]),
                  createBaseVNode("td", _hoisted_20, [
                    createBaseVNode("span", {
                      class: normalizeClass(["flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold", ticket.sla === 'Breached' ? 'text-red-500' : ticket.sla === 'At Risk' ? 'text-orange-500' : 'text-green-500'])
                    }, [
                      (ticket.sla === 'Breached')
                        ? (openBlock(), createBlock(unref(TriangleAlert), {
                            key: 0,
                            size: 12
                          }))
                        : createCommentVNode("", true),
                      (ticket.sla === 'At Risk')
                        ? (openBlock(), createBlock(unref(Clock), {
                            key: 1,
                            size: 12
                          }))
                        : createCommentVNode("", true),
                      (ticket.sla === 'Met' || ticket.sla === 'On Track')
                        ? (openBlock(), createBlock(unref(CircleCheckBig), {
                            key: 2,
                            size: 12
                          }))
                        : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(ticket.sla), 1)
                    ], 2)
                  ]),
                  createBaseVNode("td", _hoisted_21, toDisplayString(ticket.created), 1),
                  createBaseVNode("td", _hoisted_22, [
                    createBaseVNode("button", {
                      onClick: withModifiers($event => (selectedTicket.value = ticket), ["stop"]),
                      class: "px-2 py-1 bg-transparent text-gray-500 border border-gray-300 hover:border-absa-passion hover:text-absa-passion text-[9px] font-bold uppercase rounded-none transition"
                    }, "View", 8, _hoisted_23)
                  ])
                ]))
              }), 128))
            ])
          ])
        ])
      ]),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (showNewCaseModal.value)
          ? (openBlock(), createElementBlock("div", _hoisted_24, [
              createBaseVNode("div", _hoisted_25, [
                createBaseVNode("div", _hoisted_26, [
                  _cache[13] || (_cache[13] = createBaseVNode("h3", { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" }, "New Case", -1)),
                  createBaseVNode("button", {
                    onClick: _cache[1] || (_cache[1] = $event => (showNewCaseModal.value = false)),
                    class: "text-gray-400 hover:text-absa-passion"
                  }, "X")
                ]),
                _cache[14] || (_cache[14] = createBaseVNode("div", { class: "p-6 space-y-4 font-mono text-sm" }, [
                  createBaseVNode("div", null, [
                    createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Customer Phone / ID"),
                    createBaseVNode("input", {
                      type: "text",
                      class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion",
                      placeholder: "e.g. +260 96 111..."
                    })
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Case Category"),
                    createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion" }, [
                      createBaseVNode("option", null, "Complaint"),
                      createBaseVNode("option", null, "Enquiry"),
                      createBaseVNode("option", null, "Account Block"),
                      createBaseVNode("option", null, "Card Delivery")
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Priority"),
                    createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion" }, [
                      createBaseVNode("option", null, "Low"),
                      createBaseVNode("option", null, "Medium"),
                      createBaseVNode("option", null, "High"),
                      createBaseVNode("option", null, "Critical")
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Description"),
                    createBaseVNode("textarea", {
                      rows: "3",
                      class: "w-full bg-white border border-gray-200 rounded-none p-2 text-gray-600 outline-none focus:border-absa-passion",
                      placeholder: "Case details..."
                    })
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_27, [
                  createBaseVNode("button", {
                    onClick: _cache[2] || (_cache[2] = $event => (showNewCaseModal.value = false)),
                    class: "px-4 py-2 bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 text-[10px] font-bold uppercase rounded-none"
                  }, "Cancel"),
                  createBaseVNode("button", {
                    onClick: _cache[3] || (_cache[3] = $event => (showNewCaseModal.value = false)),
                    class: "px-6 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none"
                  }, "Create Case")
                ])
              ])
            ]))
          : createCommentVNode("", true)
      ])),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        (selectedTicket.value)
          ? (openBlock(), createElementBlock("div", _hoisted_28, [
              createBaseVNode("div", _hoisted_29, [
                createBaseVNode("div", _hoisted_30, [
                  createBaseVNode("div", null, [
                    createBaseVNode("h3", _hoisted_31, toDisplayString(selectedTicket.value.id), 1),
                    createBaseVNode("div", _hoisted_32, toDisplayString(selectedTicket.value.type) + " • " + toDisplayString(selectedTicket.value.created), 1)
                  ]),
                  createBaseVNode("button", {
                    onClick: _cache[4] || (_cache[4] = $event => (selectedTicket.value = null)),
                    class: "text-gray-400 hover:text-absa-passion"
                  }, "X")
                ]),
                createBaseVNode("div", _hoisted_33, [
                  createBaseVNode("div", _hoisted_34, [
                    createBaseVNode("div", null, [
                      _cache[15] || (_cache[15] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Customer Info", -1)),
                      createBaseVNode("span", _hoisted_35, toDisplayString(selectedTicket.value.customer), 1)
                    ]),
                    createBaseVNode("div", null, [
                      _cache[16] || (_cache[16] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Channel", -1)),
                      createBaseVNode("span", _hoisted_36, toDisplayString(selectedTicket.value.channel), 1)
                    ]),
                    createBaseVNode("div", null, [
                      _cache[17] || (_cache[17] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Status", -1)),
                      createBaseVNode("span", {
                        class: normalizeClass(["px-2 py-0.5 border border-gray-200 bg-white text-[9px] uppercase tracking-widest font-bold", selectedTicket.value.status === 'Open' ? 'text-blue-600' : selectedTicket.value.status === 'Escalated' ? 'text-orange-500' : 'text-gray-500'])
                      }, toDisplayString(selectedTicket.value.status), 3)
                    ]),
                    createBaseVNode("div", null, [
                      _cache[18] || (_cache[18] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-1" }, "Priority & SLA", -1)),
                      createBaseVNode("span", _hoisted_37, [
                        createTextVNode(toDisplayString(selectedTicket.value.priority) + " ", 1),
                        createBaseVNode("span", _hoisted_38, "(" + toDisplayString(selectedTicket.value.sla) + ")", 1)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", null, [
                    _cache[22] || (_cache[22] = createBaseVNode("span", { class: "block text-[9px] font-bold text-gray-400 uppercase mb-2 border-b border-gray-100 pb-1" }, "Activity Log", -1)),
                    createBaseVNode("div", _hoisted_39, [
                      createBaseVNode("div", _hoisted_40, [
                        _cache[19] || (_cache[19] = createBaseVNode("div", { class: "w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" }, null, -1)),
                        createBaseVNode("div", null, [
                          createBaseVNode("div", _hoisted_41, toDisplayString(selectedTicket.value.created) + " 08:42 AM", 1),
                          createBaseVNode("div", _hoisted_42, "Case opened by System via " + toDisplayString(selectedTicket.value.channel), 1)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_43, [
                        _cache[21] || (_cache[21] = createBaseVNode("div", { class: "w-1.5 h-1.5 rounded-full bg-absa-passion mt-1.5" }, null, -1)),
                        createBaseVNode("div", null, [
                          createBaseVNode("div", _hoisted_44, toDisplayString(selectedTicket.value.created) + " 09:15 AM", 1),
                          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "text-gray-800" }, "Assigned to queue and acknowledged.", -1))
                        ])
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("div", _hoisted_45, [
                  _cache[23] || (_cache[23] = createBaseVNode("button", { class: "px-4 py-2 bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-50 text-[10px] font-bold uppercase rounded-none mr-auto" }, "Escalate", -1)),
                  createBaseVNode("button", {
                    onClick: _cache[5] || (_cache[5] = $event => (selectedTicket.value = null)),
                    class: "px-6 py-2 bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-100 text-[10px] font-bold uppercase rounded-none"
                  }, "Close Viewer")
                ])
              ])
            ]))
          : createCommentVNode("", true)
      ]))
    ])
  ]))
}
}

};
const CRMTicketsPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-08b0e855"]]);

export { CRMTicketsPage as default };
