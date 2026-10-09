import { $ as createLucideIcon, a1 as defineStore, r as ref, i as computed, _ as _export_sfc, f as onMounted, c as createElementBlock, b as createBaseVNode, s as unref, q as createVNode, A as createTextVNode, j as createCommentVNode, w as withCtx, t as toDisplayString, F as Fragment, e as renderList, a2 as MessageSquare, a as createStaticVNode, C as createBlock, a3 as X, x as withDirectives, L as vModelSelect, y as vModelText, T as Teleport, D as resolveComponent, o as openBlock, h as normalizeClass, v as withModifiers } from './index-rR_eRHdu.js';
import { u as useCustomerStore } from './customerStore-Dl_Q7G8c.js';
import { f as fetchCustomerProfile } from './customerProfileApi-Desznnjy.js';
import { c as createTicket } from './crmApi-tVC4Z0BZ.js';
import { _ as _sfc_main$1 } from './TicketFormModal-CD1vLlGj.js';
import { C as CircleUser } from './circle-user-CEgMKEcl.js';
import { L as List } from './list-mu7L4Duu.js';
import { P as Phone } from './phone-CQHYwDhI.js';
import { C as CircleCheckBig } from './circle-check-big-FiGp5QRO.js';
import { S as Send } from './send-DA9lZaHb.js';
import { M as MessageCircle } from './message-circle-DJerd85H.js';
import { C as Clock } from './clock-CJg8CEyk.js';
import './snapshotStore-40uEPdOz.js';

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

  const incomingQueue = ref([]);

  const activeCustomers = ref([]);

  async function initializeQueue() {
    if (incomingQueue.value.length > 0) return
    const customerStore = useCustomerStore();
    
    // Fallback if not loaded
    if (!customerStore.customers || customerStore.customers.length === 0) {
      await customerStore.fetchPortfolio();
    }
    
    // Pick first 3
    const seed = customerStore.customers.slice(0, 3);
    if (seed.length === 0) return // No customers available

    const channels = ['voice', 'whatsapp', 'facebook'];
    const intents = ['Account Enquiry', 'Card Block', 'Complaint'];
    const waitTimes = ['12s', '45s', '2m 10s'];

    incomingQueue.value = seed.map((c, i) => {
      return {
        id: `I-992${i + 1}`,
        channel: channels[i % channels.length],
        customer: c.fullName, // Display real name
        customerId: c.customerId, 
        accountTier: c.marketSegment || 'Standard',
        waitTime: waitTimes[i % waitTimes.length],
        intent: intents[i % intents.length]
      }
    });
  }


  // FR-D-005, FR-O-004: Business Hours Enforcement
  const isAfterHours = computed(() => {
    const hour = new Date().getHours();
    return hour >= 17 || hour < 8 // After 5 PM or before 8 AM
  });

  async function acceptInteraction(interactionId) {
    const item = incomingQueue.value.find(i => i.id === interactionId);
    if (!item) return

    incomingQueue.value = incomingQueue.value.filter(i => i.id !== interactionId);
    activeCustomers.value.forEach(c => c.active = false);
    
    const botTranscript = ['whatsapp', 'facebook'].includes(item.channel)
      ? [
          { sender: 'bot', text: 'Hello! I am ABSA FAQ Bot. How can I help?' },
          { sender: 'user', text: `I have an issue with ${item.intent}` },
          { sender: 'bot', text: 'I understand. Let me transfer you to a human agent.' }
        ]
      : [];

    // Fetch actual profile to get phone and other details
    let phone = 'N/A';
    try {
      if (item.customerId) {
        const profile = await fetchCustomerProfile(item.customerId);
        if (profile && profile.mobile_number) {
          phone = profile.mobile_number;
        }
      }
    } catch(e) {
      console.warn('Failed to load profile for omnichannel:', e);
    }

    activeCustomers.value.push({
      id: item.customerId || `CUST-${Math.floor(Math.random() * 1000)}`,
      name: item.customer,
      channel: item.channel,
      active: true,
      phone: phone,
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
    initializeQueue,
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
const _hoisted_3 = { class: "bg-white border-b border-gray-200 shrink-0 relative z-0" };
const _hoisted_4 = { class: "max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4" };
const _hoisted_5 = { class: "flex items-center gap-3 min-w-0" };
const _hoisted_6 = { class: "flex items-center gap-2 shrink-0" };
const _hoisted_7 = { class: "text-[10px] h-9 font-mono font-bold text-gray-700 bg-transparent border border-gray-200 px-3 flex items-center gap-2 uppercase tracking-wider" };
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
const _hoisted_24 = { class: "bg-white border-b border-gray-200 flex items-center px-4 gap-1 overflow-x-auto custom-scrollbar relative z-10 shrink-0 h-10" };
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { class: "truncate flex-1 text-left" };
const _hoisted_27 = {
  key: 0,
  class: "flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative"
};
const _hoisted_28 = {
  key: 0,
  class: "bg-white rounded-none p-3 mb-6 flex items-center justify-between shadow-sm border border-gray-200"
};
const _hoisted_29 = { class: "flex items-center gap-3" };
const _hoisted_30 = { class: "bg-blue-50 border border-blue-100 p-2 rounded-none" };
const _hoisted_31 = { class: "text-gray-900 font-mono font-bold text-sm" };
const _hoisted_32 = { class: "bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden mb-6" };
const _hoisted_33 = { class: "border-b border-gray-100 bg-gray-50 p-2 px-4 flex items-center justify-between" };
const _hoisted_34 = { class: "flex gap-2" };
const _hoisted_35 = { class: "border-b border-gray-100 bg-white p-4 flex items-center justify-between" };
const _hoisted_36 = { class: "flex items-center gap-3" };
const _hoisted_37 = { class: "text-lg font-black font-display text-gray-900 uppercase tracking-tight" };
const _hoisted_38 = { class: "text-[10px] font-mono font-bold text-gray-500 uppercase" };
const _hoisted_39 = { class: "text-right" };
const _hoisted_40 = { class: "inline-block px-2 py-1 bg-white text-gray-700 border border-gray-300 hover:border-absa-passion hover:text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest rounded-none mb-1" };
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
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
};
const _hoisted_49 = { class: "bg-white shadow-2xl w-full max-w-lg border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_50 = { class: "bg-white border-b border-gray-200 p-4 flex justify-between items-center" };
const _hoisted_51 = { class: "p-6 space-y-3 font-mono text-xs max-h-[60vh] overflow-y-auto" };
const _hoisted_52 = {
  key: 1,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
};
const _hoisted_53 = { class: "bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_54 = { class: "bg-white border-b border-gray-200 p-4 flex justify-between items-center" };
const _hoisted_55 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" };
const _hoisted_56 = { class: "p-6 space-y-5 font-mono text-sm" };
const _hoisted_57 = { class: "p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };
const _hoisted_58 = {
  key: 2,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
};
const _hoisted_59 = { class: "bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_60 = { class: "bg-white border-b border-gray-200 p-4 flex justify-between items-center" };
const _hoisted_61 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" };
const _hoisted_62 = { class: "p-6 space-y-5 font-mono text-sm" };
const _hoisted_63 = ["value"];
const _hoisted_64 = { class: "p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };
const _hoisted_65 = {
  key: 3,
  class: "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
};
const _hoisted_66 = { class: "bg-white shadow-2xl w-full max-w-sm border border-gray-200 overflow-hidden flex flex-col" };
const _hoisted_67 = { class: "bg-white border-b border-gray-200 p-4 flex justify-between items-center" };
const _hoisted_68 = { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-display flex items-center gap-2" };
const _hoisted_69 = { class: "p-6 space-y-5 font-mono text-sm" };
const _hoisted_70 = { class: "p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2" };


const _sfc_main = {
  __name: 'CRMOmnichannelWorkspace',
  setup(__props) {

const crmStore = useCrmStore();

onMounted(() => {
  crmStore.initializeQueue();
});

ref('active_queue');

const showTicketModal = ref(false);
const ticketModalInitialData = ref({});

const openTicketModal = () => {
  if (currentCustomer.value) {
    let mappedChannel = 'In-Branch';
    if (currentCustomer.value.channel === 'voice') mappedChannel = 'Phone Call';
    if (currentCustomer.value.channel === 'whatsapp') mappedChannel = 'WhatsApp';
    if (currentCustomer.value.channel === 'email') mappedChannel = 'Email';
    if (currentCustomer.value.channel === 'social') mappedChannel = 'Social Media';
    
    ticketModalInitialData.value = {
      customer: currentCustomer.value.phone || currentCustomer.value.id || '',
      channel: mappedChannel,
      subject: `Inbound ${mappedChannel} Case - ${currentCustomer.value.name || 'Customer'}`
    };
  } else {
    ticketModalInitialData.value = {};
  }
  showTicketModal.value = true;
};

const handleSaveTicket = async (ticketData) => {
  try {
    await createTicket(ticketData);
    showTicketModal.value = false;
    alert("Ticket created successfully!");
  } catch (error) {
    console.error("Failed to create ticket", error);
    alert("Error creating ticket.");
  }
};

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

const escalateForm = ref({ unit: 'Tier 2 Tech Support', priority: 'P2 - High', reason: '' });
function handleEscalate() {
  if (currentCustomer.value) {
    currentCustomer.value.tier = 'Escalated ' + currentCustomer.value.tier;
    alert(`Case routed to ${escalateForm.value.unit}`);
  }
  showEscalationModal.value = false;
}

const wrapUpForm = ref({ disposition: 'Resolved', notes: '' });
function handleWrapUp() {
  if (currentCustomer.value) {
    crmStore.activeCustomers = crmStore.activeCustomers.filter(c => c.id !== currentCustomer.value.id);
    alert(`Call wrapped up with code: ${wrapUpForm.value.disposition}`);
  }
  showWrapUpModal.value = false;
}

function handleTemplateSelect(text) {
  // Simple mock: assume there's a chat interface to inject into. Since there isn't a direct v-model available here, we'll just alert or set a variable if it existed.
  alert(`Template inserted: "${text}"`);
  showTemplateModal.value = false;
}

const currentCustomer = computed(() => crmStore.activeCustomers.find(c => c.active));


return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock(Fragment, null, [
    createBaseVNode("div", _hoisted_1, [
      (unref(crmStore).isAfterHours)
        ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(unref(OctagonAlert), { size: 14 }),
            _cache[20] || (_cache[20] = createTextVNode(" Business Hours Ended (17:00). New digital interactions are routing to After-Hours Auto-Reply. ", -1))
          ]))
        : createCommentVNode("", true),
      createBaseVNode("header", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_router_link, {
              to: "/dashboard/crm",
              class: "h-9 px-3 border border-gray-200 text-gray-400 hover:text-absa-passion hover:border-absa-passion transition flex items-center justify-center bg-white cursor-pointer mr-2 shrink-0"
            }, {
              default: withCtx(() => [...(_cache[21] || (_cache[21] = [
                createTextVNode(" ← ", -1)
              ]))]),
              _: 1
            }),
            _cache[22] || (_cache[22] = createBaseVNode("div", { class: "min-w-0" }, [
              createBaseVNode("span", { class: "block text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "Module // Omnichannel Workspace"),
              createBaseVNode("h1", { class: "text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight font-display leading-tight truncate" }, "Agent Desktop"),
              createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1" }, " Handle multi-channel interactions, Voice, and Tickets ")
            ], -1))
          ]),
          createBaseVNode("div", _hoisted_6, [
            _cache[24] || (_cache[24] = createBaseVNode("div", { class: "flex items-center gap-2 bg-transparent border border-gray-200 px-3 h-9" }, [
              createBaseVNode("div", { class: "w-1.5 h-1.5 bg-green-500 animate-pulse" }),
              createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-700 uppercase tracking-widest" }, "Ready (Voice & Digital)")
            ], -1)),
            createBaseVNode("span", _hoisted_7, [
              createVNode(unref(CircleUser), {
                size: 14,
                class: "text-gray-400"
              }),
              _cache[23] || (_cache[23] = createTextVNode(" CSR Agent ", -1))
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
              _cache[25] || (_cache[25] = createTextVNode(" Interaction Queue ", -1))
            ]),
            createBaseVNode("span", _hoisted_12, toDisplayString(unref(crmStore).incomingQueue.length) + " WAITING ", 1)
          ]),
          createBaseVNode("div", _hoisted_13, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(crmStore).incomingQueue, (item) => {
              return (openBlock(), createElementBlock("div", {
                key: item.id,
                class: "bg-white border border-gray-200 rounded-none shadow-sm hover:border-absa-passion transition cursor-pointer relative overflow-hidden group"
              }, [
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
                    class: "w-full py-1.5 bg-white text-gray-700 border border-gray-300 hover:border-absa-passion hover:text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest rounded-none transition flex items-center justify-center gap-2"
                  }, [
                    _cache[26] || (_cache[26] = createTextVNode(" Accept ", -1)),
                    createVNode(unref(CircleArrowRight), { size: 12 })
                  ], 8, _hoisted_21)
                ])
              ]))
            }), 128)),
            (unref(crmStore).incomingQueue.length === 0)
              ? (openBlock(), createElementBlock("div", _hoisted_22, [...(_cache[27] || (_cache[27] = [
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
                class: normalizeClass(["h-full px-4 border-b-2 flex items-center gap-2 text-[10px] font-mono font-bold uppercase transition-colors min-w-[140px] max-w-[200px]", cust.active ? 'border-absa-passion text-absa-passion bg-white' : 'border-transparent text-gray-500 hover:text-gray-900 bg-transparent'])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["w-1.5 h-1.5", cust.channel === 'voice' ? 'bg-blue-500' : 'bg-green-500'])
                }, null, 2),
                createBaseVNode("span", _hoisted_26, toDisplayString(cust.name), 1),
                createVNode(unref(X), {
                  onClick: withModifiers($event => (unref(crmStore).activeCustomers = unref(crmStore).activeCustomers.filter(c => c.id !== cust.id)), ["stop"]),
                  size: 12,
                  class: "text-gray-400 hover:text-absa-passion"
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
                            class: "text-blue-500"
                          })
                        ]),
                        createBaseVNode("div", null, [
                          _cache[28] || (_cache[28] = createBaseVNode("div", { class: "text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Active Call - Cisco Finesse", -1)),
                          createBaseVNode("div", _hoisted_31, toDisplayString(currentCustomer.value.phone) + " (02:14)", 1)
                        ])
                      ]),
                      _cache[29] || (_cache[29] = createBaseVNode("div", { class: "flex gap-2" }, [
                        createBaseVNode("button", { class: "h-8 px-3 bg-white text-gray-600 border border-gray-200 hover:border-absa-passion hover:text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer" }, "Hold"),
                        createBaseVNode("button", { class: "h-8 px-3 bg-white text-gray-600 border border-gray-200 hover:border-absa-passion hover:text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer" }, "Transfer"),
                        createBaseVNode("button", { class: "h-8 px-3 bg-white text-gray-900 border border-gray-200 hover:border-absa-passion hover:text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer" }, "Release")
                      ], -1))
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("div", _hoisted_33, [
                    _cache[31] || (_cache[31] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" }, "Case Actions", -1)),
                    createBaseVNode("div", _hoisted_34, [
                      createBaseVNode("button", {
                        onClick: openTicketModal,
                        class: "h-8 px-3 border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer"
                      }, " Create Ticket "),
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = $event => (showTemplateModal.value = true)),
                        class: "h-8 px-3 border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer"
                      }, " Templates "),
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = $event => (showEscalationModal.value = true)),
                        class: "h-8 px-3 border border-absa-passion text-absa-passion text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:bg-absa-passion hover:text-white cursor-pointer"
                      }, " Escalate "),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = $event => (showSmsModal.value = true)),
                        class: "h-8 px-3 border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 bg-white hover:border-absa-passion hover:text-absa-passion cursor-pointer"
                      }, [
                        createVNode(unref(MessageSquare), { size: 12 }),
                        _cache[30] || (_cache[30] = createTextVNode(" SMS Gateway ", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[3] || (_cache[3] = $event => (showWrapUpModal.value = true)),
                        class: "h-8 px-3 border border-gray-200 bg-white text-gray-600 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors flex items-center gap-2 hover:border-absa-passion hover:text-absa-passion cursor-pointer"
                      }, " Wrap-Up Call ")
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
                        _cache[32] || (_cache[32] = createTextVNode("Open Tickets: ", -1)),
                        createBaseVNode("span", _hoisted_42, toDisplayString(currentCustomer.value.openTickets), 1)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_43, [
                    createBaseVNode("div", null, [
                      _cache[33] || (_cache[33] = createBaseVNode("h4", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-3" }, "FAQ Bot Transcript", -1)),
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
                    _cache[34] || (_cache[34] = createStaticVNode("<div data-v-efba356b><h4 class=\"text-[10px] font-mono font-bold text-gray-400 uppercase border-b border-gray-100 pb-2 mb-3\" data-v-efba356b>CRM Context</h4><div class=\"space-y-2\" data-v-efba356b><div class=\"flex justify-between text-sm\" data-v-efba356b><span class=\"text-gray-500\" data-v-efba356b>Account Status</span><span class=\"font-bold text-green-600\" data-v-efba356b>Active</span></div><div class=\"flex justify-between text-sm\" data-v-efba356b><span class=\"text-gray-500\" data-v-efba356b>Last Branch Visit</span><span class=\"font-bold text-gray-900\" data-v-efba356b>12 Aug 2026</span></div></div></div>", 1))
                  ])
                ])
              ]))
            : (openBlock(), createElementBlock("div", _hoisted_46, [
                createBaseVNode("div", _hoisted_47, [
                  createVNode(unref(ShieldAlert), {
                    size: 48,
                    class: "mx-auto mb-4 text-gray-300"
                  }),
                  _cache[35] || (_cache[35] = createBaseVNode("h2", { class: "text-xl font-black font-display text-gray-400 uppercase tracking-widest" }, "No Active Interaction", -1)),
                  _cache[36] || (_cache[36] = createBaseVNode("p", { class: "text-[10px] font-mono text-gray-400 mt-2" }, "Select a customer from the queue or tabs", -1))
                ])
              ]))
        ])
      ])
    ]),
    (openBlock(), createBlock(Teleport, { to: "body" }, [
      createVNode(_sfc_main$1, {
        open: showTicketModal.value,
        initialData: ticketModalInitialData.value,
        onClose: _cache[4] || (_cache[4] = $event => (showTicketModal.value = false)),
        onSave: handleSaveTicket
      }, null, 8, ["open", "initialData"]),
      (showTemplateModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_48, [
            createBaseVNode("div", _hoisted_49, [
              createBaseVNode("div", _hoisted_50, [
                _cache[37] || (_cache[37] = createBaseVNode("h3", { class: "text-xs font-black text-gray-900 uppercase tracking-widest font-display" }, "Quick Access Templates", -1)),
                createBaseVNode("button", {
                  onClick: _cache[5] || (_cache[5] = $event => (showTemplateModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 16 })
                ])
              ]),
              createBaseVNode("div", _hoisted_51, [
                createBaseVNode("div", {
                  onClick: _cache[6] || (_cache[6] = $event => (handleTemplateSelect('Dear customer, your ticket {CASE_ID} is still under review. We appreciate your patience...'))),
                  class: "p-4 border border-gray-200 hover:border-absa-passion cursor-pointer transition"
                }, [...(_cache[38] || (_cache[38] = [
                  createBaseVNode("strong", { class: "block text-gray-900 mb-1 text-[10px] uppercase tracking-wider" }, "Standard Holding SMS", -1),
                  createBaseVNode("span", { class: "text-gray-500" }, "\"Dear customer, your ticket {CASE_ID} is still under review. We appreciate your patience...\"", -1)
                ]))]),
                createBaseVNode("div", {
                  onClick: _cache[7] || (_cache[7] = $event => (handleTemplateSelect('Dear customer, regarding case {CASE_ID}, our technical team is currently investigating...'))),
                  class: "p-4 border border-gray-200 hover:border-absa-passion cursor-pointer transition"
                }, [...(_cache[39] || (_cache[39] = [
                  createBaseVNode("strong", { class: "block text-gray-900 mb-1 text-[10px] uppercase tracking-wider" }, "Standard Holding Email", -1),
                  createBaseVNode("span", { class: "text-gray-500" }, "\"Dear customer, regarding case {CASE_ID}, our technical team is currently investigating...\"", -1)
                ]))])
              ])
            ])
          ]))
        : createCommentVNode("", true),
      (showWrapUpModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_52, [
            createBaseVNode("div", _hoisted_53, [
              createBaseVNode("div", _hoisted_54, [
                createBaseVNode("h3", _hoisted_55, [
                  createVNode(unref(CircleCheckBig), {
                    size: 14,
                    class: "text-absa-passion"
                  }),
                  _cache[40] || (_cache[40] = createTextVNode(" Call Wrap-Up", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[8] || (_cache[8] = $event => (showWrapUpModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 16 })
                ])
              ]),
              createBaseVNode("div", _hoisted_56, [
                createBaseVNode("div", null, [
                  _cache[42] || (_cache[42] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5" }, "Disposition Code", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((wrapUpForm.value.disposition) = $event)),
                    class: "w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion"
                  }, [...(_cache[41] || (_cache[41] = [
                    createBaseVNode("option", null, "Resolved on Call", -1),
                    createBaseVNode("option", null, "Ticket Created - Pending", -1),
                    createBaseVNode("option", null, "Dropped / Disconnected", -1)
                  ]))], 512), [
                    [vModelSelect, wrapUpForm.value.disposition]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[43] || (_cache[43] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5" }, "Notes", -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((wrapUpForm.value.notes) = $event)),
                    rows: "4",
                    class: "w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion"
                  }, null, 512), [
                    [vModelText, wrapUpForm.value.notes]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_57, [
                createBaseVNode("button", {
                  onClick: _cache[11] || (_cache[11] = $event => (showWrapUpModal.value = false)),
                  class: "h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:border-gray-300 transition-colors cursor-pointer"
                }, "Cancel"),
                createBaseVNode("button", {
                  onClick: handleWrapUp,
                  class: "h-9 px-4 border border-absa-passion text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:bg-absa-passion hover:text-white transition-colors cursor-pointer"
                }, "Complete")
              ])
            ])
          ]))
        : createCommentVNode("", true),
      (showSmsModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_58, [
            createBaseVNode("div", _hoisted_59, [
              createBaseVNode("div", _hoisted_60, [
                createBaseVNode("h3", _hoisted_61, [
                  createVNode(unref(MessageSquare), {
                    size: 14,
                    class: "text-absa-passion"
                  }),
                  _cache[44] || (_cache[44] = createTextVNode(" Dispatch SMS", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[12] || (_cache[12] = $event => (showSmsModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 16 })
                ])
              ]),
              createBaseVNode("div", _hoisted_62, [
                createBaseVNode("div", null, [
                  _cache[45] || (_cache[45] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5" }, "To (Phone)", -1)),
                  createBaseVNode("input", {
                    type: "text",
                    disabled: "",
                    value: currentCustomer.value?.phone,
                    class: "w-full bg-gray-50 border border-gray-200 p-2 text-gray-600 outline-none"
                  }, null, 8, _hoisted_63)
                ]),
                createBaseVNode("div", null, [
                  _cache[46] || (_cache[46] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5" }, "Message Payload", -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((smsMessage).value = $event)),
                    rows: "3",
                    class: "w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion",
                    placeholder: "Type SMS..."
                  }, null, 512), [
                    [vModelText, smsMessage.value]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_64, [
                createBaseVNode("button", {
                  onClick: _cache[14] || (_cache[14] = $event => (showSmsModal.value = false)),
                  class: "h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:border-gray-300 transition-colors cursor-pointer"
                }, "Cancel"),
                createBaseVNode("button", {
                  onClick: handleSendSms,
                  class: "h-9 px-4 border border-absa-passion text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:bg-absa-passion hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                }, [
                  _cache[47] || (_cache[47] = createTextVNode("Send ", -1)),
                  createVNode(unref(Send), { size: 12 })
                ])
              ])
            ])
          ]))
        : createCommentVNode("", true),
      (showEscalationModal.value)
        ? (openBlock(), createElementBlock("div", _hoisted_65, [
            createBaseVNode("div", _hoisted_66, [
              createBaseVNode("div", _hoisted_67, [
                createBaseVNode("h3", _hoisted_68, [
                  createVNode(unref(ShieldAlert), {
                    size: 14,
                    class: "text-absa-passion"
                  }),
                  _cache[48] || (_cache[48] = createTextVNode(" Escalate Case", -1))
                ]),
                createBaseVNode("button", {
                  onClick: _cache[15] || (_cache[15] = $event => (showEscalationModal.value = false)),
                  class: "text-gray-400 hover:text-absa-passion"
                }, [
                  createVNode(unref(X), { size: 16 })
                ])
              ]),
              createBaseVNode("div", _hoisted_69, [
                createBaseVNode("div", null, [
                  _cache[50] || (_cache[50] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5" }, "Route To Unit", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => ((escalateForm.value.unit) = $event)),
                    class: "w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion"
                  }, [...(_cache[49] || (_cache[49] = [
                    createBaseVNode("option", null, "Tier 2 Tech Support", -1),
                    createBaseVNode("option", null, "Fraud Investigations", -1),
                    createBaseVNode("option", null, "Branch Manager", -1)
                  ]))], 512), [
                    [vModelSelect, escalateForm.value.unit]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[52] || (_cache[52] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5" }, "Escalation Priority", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => ((escalateForm.value.priority) = $event)),
                    class: "w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion"
                  }, [...(_cache[51] || (_cache[51] = [
                    createBaseVNode("option", null, "P1 - Critical (SLA 2hrs)", -1),
                    createBaseVNode("option", null, "P2 - High (SLA 24hrs)", -1),
                    createBaseVNode("option", null, "P3 - Normal (SLA 48hrs)", -1)
                  ]))], 512), [
                    [vModelSelect, escalateForm.value.priority]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[53] || (_cache[53] = createBaseVNode("label", { class: "block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5" }, "Audit Notes / Reason", -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => ((escalateForm.value.reason) = $event)),
                    rows: "3",
                    class: "w-full bg-white border border-gray-200 p-2 outline-none focus:border-absa-passion",
                    placeholder: "Mandatory trail for compliance..."
                  }, null, 512), [
                    [vModelText, escalateForm.value.reason]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_70, [
                createBaseVNode("button", {
                  onClick: _cache[19] || (_cache[19] = $event => (showEscalationModal.value = false)),
                  class: "h-9 px-4 border border-gray-200 text-gray-600 text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:border-gray-300 transition-colors cursor-pointer"
                }, "Cancel"),
                createBaseVNode("button", {
                  onClick: handleEscalate,
                  class: "h-9 px-4 border border-absa-passion text-absa-passion text-[10px] font-mono font-bold uppercase tracking-widest bg-white hover:bg-absa-passion hover:text-white transition-colors cursor-pointer"
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
const CRMOmnichannelWorkspace = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-efba356b"]]);

export { CRMOmnichannelWorkspace as default };
