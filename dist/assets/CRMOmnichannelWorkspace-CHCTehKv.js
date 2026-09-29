import { $ as createLucideIcon, a1 as defineStore, r as ref, i as computed, _ as _export_sfc, c as createElementBlock, b as createBaseVNode, s as unref, q as createVNode, A as createTextVNode, j as createCommentVNode, w as withCtx, a as createStaticVNode, t as toDisplayString, F as Fragment, e as renderList, a2 as MessageSquare, C as createBlock, a3 as X, x as withDirectives, y as vModelText, T as Teleport, D as resolveComponent, o as openBlock, h as normalizeClass, v as withModifiers } from './index-BCpxTSoZ.js';
import { C as CircleUser } from './circle-user-Bgl5znd9.js';
import { L as List } from './list-DQrdaTVN.js';
import { P as Phone } from './phone-DiCBW5o9.js';
import { C as CircleCheckBig } from './circle-check-big-f6EOpIHk.js';
import { S as Send } from './send-CAnQmFj4.js';
import { M as MessageCircle } from './message-circle-C1oawjf2.js';
import { C as Clock } from './clock-DugY9qOo.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const CircleArrowRight = createLucideIcon("CircleArrowRightIcon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "m12 16 4-4-4-4", key: "1i9zcv" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const OctagonAlert = createLucideIcon("OctagonAlertIcon", [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ShieldAlert = createLucideIcon("ShieldAlertIcon", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
]);

const useCrmStore = defineStore('crm', () => {
  // Phase 4: Mock Backend Integration Prep

  const incomingQueue = ref([
    { id: 'I-9921', channel: 'voice', customer: '0977 123 456', accountTier: 'Gold / High Value', waitTime: '12s', intent: 'Account Enquiry' },
    { id: 'I-9922', channel: 'whatsapp', customer: '+260 96 111222', accountTier: 'Standard', waitTime: '45s', intent: 'Card Block' },
    { id: 'I-9923', channel: 'facebook', customer: 'John Banda', accountTier: 'Unknown', waitTime: '2m 10s', intent: 'Complaint' },
  ]);

  const activeCustomers = ref([]);

  // FR-D-005, FR-O-004: Business Hours Enforcement
  const isAfterHours = computed(() => {
    const hour = new Date().getHours();
    return hour >= 17 || hour < 8 // After 5 PM or before 8 AM
  });

  async function acceptInteraction(interactionId) {
    const item = incomingQueue.value.find(i => i.id === interactionId);
    if (!item) return

    // Simulate API call to backend/Finesse
    // await api.post('/api/crm/interactions/accept', { id: interactionId })

    incomingQueue.value = incomingQueue.value.filter(i => i.id !== interactionId);
    activeCustomers.value.forEach(c => c.active = false);
    
    // FR-B-001: Bot context handoff for digital channels
    const botTranscript = ['whatsapp', 'facebook'].includes(item.channel)
      ? [
          { sender: 'bot', text: 'Hello! I am ABSA FAQ Bot. How can I help?' },
          { sender: 'user', text: `I have an issue with ${item.intent}` },
          { sender: 'bot', text: 'I understand. Let me transfer you to a human agent.' }
        ]
      : [];

    activeCustomers.value.push({
      id: `CUST-${Math.floor(Math.random() * 1000)}`,
      name: item.customer,
      channel: item.channel,
      active: true,
      phone: item.channel === 'voice' ? item.customer : 'N/A',
      tier: item.accountTier,
      openTickets: Math.floor(Math.random() * 3),
      history: 'Screen-pop triggered from queue.',
      botTranscript
    });
  }

  // FR-S-001: SMS Gateway Integration
  async function dispatchSms(phone, message, templateId = null) {
    console.log(`[SMS Gateway] Sending to ${phone}: ${message}`);
    // Mock API Call to SMS Gateway
    // await api.post('/api/crm/sms/send', { phone, message, templateId })
    return { success: true, timestamp: new Date().toISOString() }
  }

  // FR-T-001: Case Creation
  async function createTicket(payload) {
    console.log('[Ticketing] Creating Case:', payload);
    // await api.post('/api/crm/tickets', payload)
    return { ticketId: `CASE-${Math.floor(Math.random() * 10000)}` }
  }

  return {
    incomingQueue,
    activeCustomers,
    isAfterHours,
    acceptInteraction,
    dispatchSms,
    createTicket
  }
});

// cache bust

const _hoisted_1 = { class: "h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-hidden" };
const _hoisted_2 = {
  key: 0,
  class: "bg-orange-500 text-white px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 shrink-0"
};
const _hoisted_3 = { class: "bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm shrink-0 blur-scoped" };
const _hoisted_4 = { class: "px-4 sm:px-6 h-16 flex items-center justify-between" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "flex items-center gap-3" };
const _hoisted_7 = { class: "text-[10px] font-mono font-bold text-absa-passion bg-[#FDE8EC] border border-[#f5c6cb] px-3 py-1.5 flex items-center gap-2 rounded-none uppercase tracking-wider" };
const _hoisted_8 = { class: "flex-1 w-full relative z-10 flex overflow-hidden" };
const _hoisted_9 = { class: "w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 shrink-0" };
const _hoisted_10 = { class: "p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between" };
const _hoisted_11 = { class: "text-xs font-black text-gray-900 uppercase tracking-tight flex items-center gap-2" };
const _hoisted_12 = { class: "text-[9px] font-mono font-bold text-white bg-absa-passion px-2 py-0.5 rounded-none" };
const _hoisted_13 = { class: "flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar" };
const _hoisted_14 = { class: "p-3 relative z-10" };
const _hoisted_15 = { class: "flex justify-between items-start mb-2" };
const _hoisted_16 = { class: "flex items-center gap-1.5" };
const _hoisted_17 = { class: "text-[9px] font-mono font-bold text-gray-500 uppercase" };
const _hoisted_18 = { class: "text-[9px] font-mono font-bold text-orange-500 flex items-center gap-1" };
const _hoisted_19 = { class: "font-bold text-gray-900 text-sm mb-1 truncate" };
const _hoisted_20 = { class: "flex items-center gap-2 mb-3" };
const _hoisted_21 = ["onClick"];
const _hoisted_22 = {
  key: 0,
  class: "text-center py-8"
};
const _hoisted_23 = { class: "flex-1 flex flex-col bg-transparent" };
const _hoisted_24 = { class: "h-10 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-end px-2 gap-1 overflow-x-auto custom-scrollbar sticky top-0 z-20" };
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { class: "truncate flex-1 text-left" };
const _hoisted_27 = {
  key: 0,
  class: "flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative"
};
const _hoisted_28 = {
  key: 0,
  class: "bg-gray-900 rounded-none p-3 mb-6 flex items-center justify-between shadow-lg border border-gray-700"
};
const _hoisted_29 = { class: "flex items-center gap-3" };
const _hoisted_30 = { class: "bg-blue-500/20 p-2 rounded-none" };
const _hoisted_31 = { class: "text-white font-mono text-sm" };
const _hoisted_32 = { class: "bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden mb-6" };
const _hoisted_33 = { class: "border-b border-gray-100 bg-gray-50 p-2 px-4 flex items-center justify-between" };
const _hoisted_34 = { class: "flex gap-2" };
const _hoisted_35 = { class: "border-b border-gray-100 bg-white p-4 flex items-center justify-between" };
const _hoisted_36 = { class: "flex items-center gap-3" };
const _hoisted_37 = { class: "text-lg font-black font-display text-gray-900 uppercase tracking-tight" };
const _hoisted_38 = { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" };
const _hoisted_39 = { class: "text-right" };
const _hoisted_40 = { class: "inline-block px-2 py-1 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase tracking-widest rounded-none mb-1" };
const _hoisted_41 = { class: "text-[10px] font-mono text-gray-500" };
const _hoisted_42 = { class: "font-bold text-orange-500" };
const _hoisted_43 = { class: "p-6 grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_44 = {
  key: 0,
  class: "p-3 bg-gray-50 border border-gray-100 text-xs font-mono space-y-2 h-40 overflow-y-auto"
};
const _hoisted_45 = {
  key: 1,
  class: "p-3 bg-gray-50 border border-gray-100 text-xs font-mono text-gray-400 italic"
};
const _hoisted_46 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_47 = { class: "text-center" };
const _hoisted_48 = {
  key: 0,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_49 = { class: "bg-white rounded-none shadow-2xl w-full max-w-md border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_50 = { class: "bg-white border-b border-gray-200 p-3 flex justify-between items-center" };
const _hoisted_51 = { class: "p-6 space-y-4 font-mono text-sm" };
const _hoisted_52 = ["value"];
const _hoisted_53 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };
const _hoisted_54 = {
  key: 1,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_55 = { class: "bg-white rounded-none shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_56 = { class: "bg-white border-b border-gray-200 p-3 flex justify-between items-center" };
const _hoisted_57 = {
  key: 2,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_58 = { class: "bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_59 = { class: "bg-white border-b border-gray-200 p-3 flex justify-between items-center" };
const _hoisted_60 = { class: "text-xs font-black text-absa-passion font-display uppercase tracking-widest flex items-center gap-2" };
const _hoisted_61 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end" };
const _hoisted_62 = {
  key: 3,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_63 = { class: "bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_64 = { class: "bg-white border-b border-gray-200 p-3 flex justify-between items-center" };
const _hoisted_65 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" };
const _hoisted_66 = { class: "p-6 space-y-4 font-mono text-sm" };
const _hoisted_67 = ["value"];
const _hoisted_68 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };
const _hoisted_69 = {
  key: 4,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
};
const _hoisted_70 = { class: "bg-white rounded-none shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_71 = { class: "bg-white border-b border-gray-200 p-3 flex justify-between items-center" };
const _hoisted_72 = { class: "p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };


const _sfc_main = {
  __name: 'CRMOmnichannelWorkspace',
  setup(__props) {

const crmStore = useCrmStore();

ref('active_queue');

const showTicketModal = ref(false);
const showEscalationModal = ref(false);
const showWrapUpModal = ref(false);
const showTemplateModal = ref(false);
const showSmsModal = ref(false);
const smsMessage = ref('');

function activateCustomer(id) {
  crmStore.activeCustomers.forEach(c => c.active = (c.id === id));
}

function acceptInteraction(interaction) {
  crmStore.acceptInteraction(interaction.id);
}

function handleSendSms() {
  if(!smsMessage.value) return
  crmStore.dispatchSms(currentCustomer.value.phone, smsMessage.value);
  smsMessage.value = '';
  showSmsModal.value = false;
}

const currentCustomer = computed(() => crmStore.activeCustomers.find(c => c.active));


return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      _cache[34] || (_cache[34] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
      (unref(crmStore).isAfterHours)
        ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(unref(OctagonAlert), { size: 14 }),
            _cache[16] || (_cache[16] = createTextVNode(" Business Hours Ended (17:00). New digital interactions are routing to After-Hours Auto-Reply. ", -1))
          ]))
        : createCommentVNode("", true),
      createBaseVNode("header", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_router_link, {
              to: "/dashboard/crm",
              class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1"
            }, {
              default: withCtx(() => [...(_cache[17] || (_cache[17] = [
                createTextVNode("← Back", -1)
              ]))]),
              _: 1
            }),
            _cache[18] || (_cache[18] = createStaticVNode("<div class=\"w-2 h-8 bg-absa-passion rounded-none ml-2\" data-v-4c5e03cc></div><div data-v-4c5e03cc><div class=\"flex items-center gap-1.5\" data-v-4c5e03cc><span class=\"text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-4c5e03cc>Workspace</span><span class=\"text-[10px] font-mono font-bold text-gray-300\" data-v-4c5e03cc>//</span><span class=\"text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest\" data-v-4c5e03cc>Omnichannel</span></div><h1 class=\"text-xl font-black font-display text-gray-900 uppercase tracking-tight\" data-v-4c5e03cc>Agent Desktop</h1></div>", 2))
          ]),
          createBaseVNode("div", _hoisted_6, [
            _cache[20] || (_cache[20] = createBaseVNode("div", { class: "flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-none" }, [
              createBaseVNode("div", { class: "w-2 h-2 rounded-none bg-green-500 animate-pulse" }),
              createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-green-700 uppercase tracking-widest" }, "Ready (Voice & Digital)")
            ], -1)),
            createBaseVNode("span", _hoisted_7, [
              createVNode(unref(CircleUser), { size: 14 }),
              _cache[19] || (_cache[19] = createTextVNode(" CSR Agent ", -1))
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_8, [
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("h3", _hoisted_11, [
              createVNode(unref(List), {
                size: 14,
                class: "text-gray-400"
              }),
              _cache[21] || (_cache[21] = createTextVNode(" Interaction Queue ", -1))
            ]),
            createBaseVNode("span", _hoisted_12, toDisplayString(unref(crmStore).incomingQueue.length) + " WAITING ", 1)
          ]),
          createBaseVNode("div", _hoisted_13, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(crmStore).incomingQueue, (item) => {
              return (openBlock(), createElementBlock("div", {
                key: item.id,
                class: "bg-white border border-gray-200 rounded-none shadow-sm hover:border-absa-passion transition cursor-pointer relative overflow-hidden group"
              }, [
                _cache[23] || (_cache[23] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("div", _hoisted_16, [
                      (item.channel === 'voice')
                        ? (openBlock(), createBlock(unref(Phone), {
                            key: 0,
                            size: 12,
                            class: "text-blue-500"
                          }))
                        : createCommentVNode("", true),
                      (item.channel === 'whatsapp')
                        ? (openBlock(), createBlock(unref(MessageCircle), {
                            key: 1,
                            size: 12,
                            class: "text-green-500"
                          }))
                        : createCommentVNode("", true),
                      (item.channel === 'facebook')
                        ? (openBlock(), createBlock(unref(MessageSquare), {
                            key: 2,
                            size: 12,
                            class: "text-blue-600"
                          }))
                        : createCommentVNode("", true),
                      createBaseVNode("span", _hoisted_17, toDisplayString(item.channel), 1)
                    ]),
                    createBaseVNode("span", _hoisted_18, [
                      createVNode(unref(Clock), { size: 10 }),
                      createTextVNode(" " + toDisplayString(item.waitTime), 1)
                    ])
                  ]),
                  createBaseVNode("h4", _hoisted_19, toDisplayString(item.customer), 1),
                  createBaseVNode("div", _hoisted_20, [
                    createBaseVNode("span", {
                      class: normalizeClass(["text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-none uppercase tracking-wider", item.accountTier.includes('Gold') || item.accountTier.includes('Platinum') ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'])
                    }, toDisplayString(item.accountTier), 3)
                  ]),
                  createBaseVNode("button", {
                    onClick: $event => (acceptInteraction(item)),
                    class: "w-full py-1.5 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase tracking-widest rounded-none transition flex items-center justify-center gap-2"
                  }, [
                    _cache[22] || (_cache[22] = createTextVNode(" Accept ", -1)),
                    createVNode(unref(CircleArrowRight), { size: 12 })
                  ], 8, _hoisted_21)
                ])
              ]))
            }), 128)),
            (unref(crmStore).incomingQueue.length === 0)
              ? (openBlock(), createElementBlock("div", _hoisted_22, [...(_cache[24] || (_cache[24] = [
                  createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase" }, "Queue is empty", -1)
                ]))]))
              : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_23, [
          createBaseVNode("div", _hoisted_24, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(crmStore).activeCustomers, (cust) => {
              return (openBlock(), createElementBlock("button", {
                key: cust.id,
                onClick: $event => (activateCustomer(cust.id)),
                class: normalizeClass(["h-8 px-4 border border-b-0 rounded-none flex items-center gap-2 text-[10px] font-mono font-bold uppercase transition-all min-w-[140px] max-w-[200px]", cust.active ? 'bg-white border-gray-200 text-absa-passion shadow-[0_-2px_10px_rgba(0,0,0,0.05)]' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["w-1.5 h-1.5 rounded-none", cust.channel === 'voice' ? 'bg-blue-500' : 'bg-green-500'])
                }, null, 2),
                createBaseVNode("span", _hoisted_26, toDisplayString(cust.name), 1),
                createVNode(unref(X), {
                  onClick: withModifiers($event => (unref(crmStore).activeCustomers = unref(crmStore).activeCustomers.filter(c => c.id !== cust.id)), ["stop"]),
                  size: 12,
                  class: "text-gray-400 hover:text-red-500"
                }, null, 8, ["onClick"])
              ], 10, _hoisted_25))
            }), 128))
          ]),
          (currentCustomer.value)
            ? (openBlock(), createElementBlock("div", _hoisted_27, [
                (currentCustomer.value.channel === 'voice')
                  ? (openBlock(), createElementBlock("div", _hoisted_28, [
                      createBaseVNode("div", _hoisted_29, [
                        createBaseVNode("div", _hoisted_30, [
                          createVNode(unref(Phone), {
                            size: 16,
                            class: "text-blue-400"
                          })
                        ]),
                        createBaseVNode("div", null, [
                          _cache[25] || (_cache[25] = createBaseVNode("div", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Active Call - Cisco Finesse", -1)),
                          createBaseVNode("div", _hoisted_31, toDisplayString(currentCustomer.value.phone) + " (02:14)", 1)
                        ])
                      ]),
                      _cache[26] || (_cache[26] = createBaseVNode("div", { class: "flex gap-2" }, [
                        createBaseVNode("button", { class: "px-3 py-1 bg-transparent text-gray-300 border border-gray-500 hover:bg-gray-800 text-[10px] font-mono font-bold uppercase rounded-none" }, "Hold"),
                        createBaseVNode("button", { class: "px-3 py-1 bg-transparent text-gray-300 border border-gray-500 hover:bg-gray-800 text-[10px] font-mono font-bold uppercase rounded-none" }, "Transfer"),
                        createBaseVNode("button", { class: "px-3 py-1 bg-transparent text-red-400 border border-red-500 hover:bg-red-500/20 text-[10px] font-mono font-bold uppercase rounded-none" }, "Release")
                      ], -1))
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("div", _hoisted_33, [
                    _cache[28] || (_cache[28] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" }, "Case Actions", -1)),
                    createBaseVNode("div", _hoisted_34, [
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = $event => (showTicketModal.value = true)),
                        class: "px-3 py-1 bg-white border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition"
                      }, "Create Ticket"),
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = $event => (showTemplateModal.value = true)),
                        class: "px-3 py-1 bg-white border border-gray-300 text-gray-700 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition"
                      }, "Templates"),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = $event => (showEscalationModal.value = true)),
                        class: "px-3 py-1 bg-transparent text-orange-500 border border-orange-500 text-[9px] font-mono font-bold uppercase rounded-none hover:bg-orange-50 transition"
                      }, "Escalate"),
                      createBaseVNode("button", {
                        onClick: _cache[3] || (_cache[3] = $event => (showSmsModal.value = true)),
                        class: "px-3 py-1 bg-transparent text-gray-700 border border-gray-300 hover:border-gray-500 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1"
                      }, [
                        createVNode(unref(MessageSquare), { size: 10 }),
                        _cache[27] || (_cache[27] = createTextVNode(" SMS Gateway", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[4] || (_cache[4] = $event => (showWrapUpModal.value = true)),
                        class: "px-3 py-1 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none transition"
                      }, "Wrap-Up Call")
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("div", _hoisted_36, [
                      createVNode(unref(CircleUser), {
                        size: 32,
                        class: "text-gray-300"
                      }),
                      createBaseVNode("div", null, [
                        createBaseVNode("h2", _hoisted_37, toDisplayString(currentCustomer.value.name), 1),
                        createBaseVNode("div", _hoisted_38, toDisplayString(currentCustomer.value.id), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_39, [
                      createBaseVNode("div", _hoisted_40, toDisplayString(currentCustomer.value.tier) + " Tier ", 1),
                      createBaseVNode("div", _hoisted_41, [
                        _cache[29] || (_cache[29] = createTextVNode("Open Tickets: ", -1)),
                        createBaseVNode("span", _hoisted_42, toDisplayString(currentCustomer.value.openTickets), 1)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_43, [
                    createBaseVNode("div", null, [
                      _cache[30] || (_cache[30] = createBaseVNode("h4", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-3" }, "FAQ Bot Transcript", -1)),
                      (currentCustomer.value.botTranscript && currentCustomer.value.botTranscript.length > 0)
                        ? (openBlock(), createElementBlock("div", _hoisted_44, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(currentCustomer.value.botTranscript, (msg, idx) => {
                              return (openBlock(), createElementBlock("div", {
                                key: idx,
                                class: normalizeClass(msg.sender === 'bot' ? 'text-gray-500' : 'text-absa-passion font-bold')
                              }, " [" + toDisplayString(msg.sender.toUpperCase()) + "] " + toDisplayString(msg.text), 3))
                            }), 128))
                          ]))
                        : (openBlock(), createElementBlock("div", _hoisted_45, "No bot pre-interaction available."))
                    ]),
                    _cache[31] || (_cache[31] = createStaticVNode("<div data-v-4c5e03cc><h4 class=\"text-[10px] font-mono font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-3\" data-v-4c5e03cc>CRM Context</h4><div class=\"space-y-2\" data-v-4c5e03cc><div class=\"flex justify-between text-sm\" data-v-4c5e03cc><span class=\"text-gray-500\" data-v-4c5e03cc>Account Status</span><span class=\"font-bold text-green-600\" data-v-4c5e03cc>Active</span></div><div class=\"flex justify-between text-sm\" data-v-4c5e03cc><span class=\"text-gray-500\" data-v-4c5e03cc>Last Branch Visit</span><span class=\"font-bold text-gray-900\" data-v-4c5e03cc>12 Aug 2026</span></div></div></div>", 1))
                  ])
                ])
              ]))
            : (openBlock(), createElementBlock("div", _hoisted_46, [
                createBaseVNode("div", _hoisted_47, [
                  createVNode(unref(ShieldAlert), {
                    size: 48,
                    class: "mx-auto mb-4 text-gray-300"
                  }),
                  _cache[32] || (_cache[32] = createBaseVNode("h2", { class: "text-xl font-black font-display text-gray-400 uppercase tracking-widest" }, "No Active Interaction", -1)),
                  _cache[33] || (_cache[33] = createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 mt-2" }, "Select a customer from the queue or tabs", -1))
                ])
              ]))
        ])
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      (showTicketModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_48, [
            createBaseVNode("div", _hoisted_49, [
              createBaseVNode("div", _hoisted_50, [
                _cache[35] || (_cache[35] = createBaseVNode("h3", { class: "text-xs font-black text-absa-passion font-display uppercase tracking-widest" }, "Create New Ticket", -1)),
                createBaseVNode("button", {
                  onClick: _cache[5] || (_cache[5] = $event => (showTicketModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 14 })
                ])
              ]),
              createBaseVNode("div", _hoisted_51, [
                createBaseVNode("div", null, [
                  _cache[36] || (_cache[36] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Customer / Phone", -1)),
                  createBaseVNode("input", {
                    type: "text",
                    disabled: "",
                    value: currentCustomer.value?.phone,
                    class: "w-full bg-gray-50 border border-gray-200 rounded-none p-2 text-gray-600 outline-none"
                  }, null, 8, _hoisted_52)
                ]),
                _cache[37] || (_cache[37] = createBaseVNode("div", null, [
                  createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Issue Category"),
                  createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion" }, [
                    createBaseVNode("option", null, "Account Enquiry"),
                    createBaseVNode("option", null, "Card Block / Fraud"),
                    createBaseVNode("option", null, "Transaction Dispute")
                  ])
                ], -1)),
                _cache[38] || (_cache[38] = createBaseVNode("div", null, [
                  createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Details"),
                  createBaseVNode("textarea", {
                    rows: "3",
                    class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion"
                  })
                ], -1))
              ]),
              createBaseVNode("div", _hoisted_53, [
                createBaseVNode("button", {
                  onClick: _cache[6] || (_cache[6] = $event => (showTicketModal.value = false)),
                  class: "px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded-none"
                }, "Cancel"),
                createBaseVNode("button", {
                  onClick: _cache[7] || (_cache[7] = $event => (showTicketModal.value = false)),
                  class: "px-4 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none"
                }, "Generate Ticket")
              ])
            ])
          ]))
        : createCommentVNode("", true),
      (showTemplateModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_54, [
            createBaseVNode("div", _hoisted_55, [
              createBaseVNode("div", _hoisted_56, [
                _cache[39] || (_cache[39] = createBaseVNode("h3", { class: "text-xs font-black text-absa-passion font-display uppercase tracking-widest" }, "Quick Access Templates", -1)),
                createBaseVNode("button", {
                  onClick: _cache[8] || (_cache[8] = $event => (showTemplateModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 14 })
                ])
              ]),
              _cache[40] || (_cache[40] = createBaseVNode("div", { class: "p-4 bg-gray-50 border-b border-gray-100 flex gap-2" }, [
                createBaseVNode("button", { class: "px-3 py-1 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[9px] font-mono font-bold uppercase rounded-none" }, "Holding (>=2 Days)"),
                createBaseVNode("button", { class: "px-3 py-1 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion" }, "Resolution")
              ], -1)),
              _cache[41] || (_cache[41] = createBaseVNode("div", { class: "p-6 space-y-3 font-mono text-xs" }, [
                createBaseVNode("div", { class: "p-3 border border-gray-200 rounded-none hover:border-absa-passion cursor-pointer transition" }, [
                  createBaseVNode("strong", { class: "block text-gray-800 mb-1" }, "Standard Holding SMS"),
                  createBaseVNode("span", { class: "text-gray-500" }, "\"Dear customer, your ticket {CASE_ID} is still under review. We appreciate your patience...\"")
                ]),
                createBaseVNode("div", { class: "p-3 border border-gray-200 rounded-none hover:border-absa-passion cursor-pointer transition" }, [
                  createBaseVNode("strong", { class: "block text-gray-800 mb-1" }, "Standard Holding Email"),
                  createBaseVNode("span", { class: "text-gray-500" }, "\"Dear customer, regarding case {CASE_ID}, our technical team is currently investigating...\"")
                ])
              ], -1))
            ])
          ]))
        : createCommentVNode("", true),
      (showWrapUpModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_57, [
            createBaseVNode("div", _hoisted_58, [
              createBaseVNode("div", _hoisted_59, [
                createBaseVNode("h3", _hoisted_60, [
                  createVNode(unref(CircleCheckBig), { size: 14 }),
                  _cache[42] || (_cache[42] = createTextVNode(" Call Wrap-Up", -1))
                ])
              ]),
              _cache[44] || (_cache[44] = createBaseVNode("div", { class: "p-6 space-y-4 font-mono text-sm" }, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Disposition Code"),
                  createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion" }, [
                    createBaseVNode("option", null, "Resolved on Call"),
                    createBaseVNode("option", null, "Ticket Created - Pending"),
                    createBaseVNode("option", null, "Dropped / Disconnected")
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Notes"),
                  createBaseVNode("textarea", {
                    rows: "4",
                    class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion"
                  })
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_61, [
                createBaseVNode("button", {
                  onClick: _cache[9] || (_cache[9] = $event => (showSmsModal.value = true)),
                  class: "px-3 py-1 bg-transparent text-gray-700 border border-gray-300 hover:border-gray-500 text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1"
                }, [
                  createVNode(unref(MessageSquare), { size: 10 }),
                  _cache[43] || (_cache[43] = createTextVNode(" SMS Gateway", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[10] || (_cache[10] = $event => (showWrapUpModal.value = false)),
                  class: "px-6 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none"
                }, "Complete Wrap-Up")
              ])
            ])
          ]))
        : createCommentVNode("", true),
      (showSmsModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_62, [
            createBaseVNode("div", _hoisted_63, [
              createBaseVNode("div", _hoisted_64, [
                createBaseVNode("h3", _hoisted_65, [
                  createVNode(unref(MessageSquare), { size: 14 }),
                  _cache[45] || (_cache[45] = createTextVNode(" Dispatch SMS", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[11] || (_cache[11] = $event => (showSmsModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 14 })
                ])
              ]),
              createBaseVNode("div", _hoisted_66, [
                createBaseVNode("div", null, [
                  _cache[46] || (_cache[46] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "To (Phone)", -1)),
                  createBaseVNode("input", {
                    type: "text",
                    disabled: "",
                    value: currentCustomer.value?.phone,
                    class: "w-full bg-gray-50 border border-gray-200 rounded-none p-2 text-gray-600 outline-none"
                  }, null, 8, _hoisted_67)
                ]),
                createBaseVNode("div", null, [
                  _cache[47] || (_cache[47] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Message Payload", -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((smsMessage).value = $event)),
                    rows: "3",
                    class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-absa-passion",
                    placeholder: "Type SMS..."
                  }, null, 512), [
                    [vModelText, smsMessage.value]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_68, [
                createBaseVNode("button", {
                  onClick: handleSendSms,
                  class: "px-6 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-bold uppercase rounded-none flex items-center gap-2"
                }, [
                  _cache[48] || (_cache[48] = createTextVNode("Send SMS ", -1)),
                  createVNode(unref(Send), { size: 12 })
                ])
              ])
            ])
          ]))
        : createCommentVNode("", true),
      (showEscalationModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_69, [
            createBaseVNode("div", _hoisted_70, [
              createBaseVNode("div", _hoisted_71, [
                _cache[49] || (_cache[49] = createBaseVNode("h3", { class: "text-xs font-black text-absa-passion font-display uppercase tracking-widest" }, "Escalate Case", -1)),
                createBaseVNode("button", {
                  onClick: _cache[13] || (_cache[13] = $event => (showEscalationModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 14 })
                ])
              ]),
              _cache[50] || (_cache[50] = createBaseVNode("div", { class: "p-6 space-y-4 font-mono text-sm" }, [
                createBaseVNode("div", null, [
                  createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Route To Unit"),
                  createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-orange-500" }, [
                    createBaseVNode("option", null, "Tier 2 Tech Support"),
                    createBaseVNode("option", null, "Fraud Investigations"),
                    createBaseVNode("option", null, "Branch Manager")
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Escalation Priority"),
                  createBaseVNode("select", { class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-orange-500" }, [
                    createBaseVNode("option", null, "P1 - Critical (SLA 2hrs)"),
                    createBaseVNode("option", null, "P2 - High (SLA 24hrs)"),
                    createBaseVNode("option", null, "P3 - Normal (SLA 48hrs)")
                  ])
                ]),
                createBaseVNode("div", null, [
                  createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-500 uppercase mb-1" }, "Audit Notes / Reason"),
                  createBaseVNode("textarea", {
                    rows: "3",
                    class: "w-full bg-white border border-gray-200 rounded-none p-2 outline-none focus:border-orange-500",
                    placeholder: "Mandatory trail for compliance..."
                  })
                ])
              ], -1)),
              createBaseVNode("div", _hoisted_72, [
                createBaseVNode("button", {
                  onClick: _cache[14] || (_cache[14] = $event => (showEscalationModal.value = false)),
                  class: "px-4 py-2 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase rounded-none"
                }, "Cancel"),
                createBaseVNode("button", {
                  onClick: _cache[15] || (_cache[15] = $event => (showEscalationModal.value = false)),
                  class: "px-4 py-2 bg-transparent text-orange-500 border border-orange-500 hover:bg-orange-50 text-[10px] font-bold uppercase rounded-none hover:bg-orange-50"
                }, "Route Case")
              ])
            ])
          ]))
        : createCommentVNode("", true)
    ]))
  ], 64))
}
}

};
const CRMOmnichannelWorkspace = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-4c5e03cc"]]);

export { CRMOmnichannelWorkspace as default };
