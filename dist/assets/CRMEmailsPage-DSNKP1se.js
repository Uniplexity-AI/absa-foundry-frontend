/* empty css                                                               */
import { a2 as createLucideIcon, _ as _export_sfc, r as ref, o as openBlock, c as createElementBlock, b as createBaseVNode, s as unref, q as createVNode, a3 as X, v as withModifiers, x as withDirectives, y as vModelText, K as withKeys, F as Fragment, e as renderList, A as createTextVNode, t as toDisplayString, j as createCommentVNode, N as vModelCheckbox, f as onMounted, a as createStaticVNode, C as createBlock, T as Teleport, h as normalizeClass, a7 as FileText } from './index-CJBj3n9Z.js';
import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-Br5jucyZ.js';
import { _ as _sfc_main$2 } from './BackButton-MdKuCcLl.js';
import { u as useCRMModule } from './CRMModule-CFTZWsYA.js';
import { L as List } from './list-D0YPBdje.js';
import { P as Paperclip } from './paperclip-fuCOJjTM.js';
import { L as LoaderCircle } from './loader-circle-ByYt2axK.js';
import { C as ChevronDown } from './chevron-down-Crj7lPWX.js';
import { C as CircleUser } from './circle-user-Dc3LrmL0.js';
import { P as Plus } from './plus-BwQjmxmM.js';
import { S as Send } from './send-B7Htio-g.js';
import { C as Clock } from './clock-BgZjyJ4n.js';
import { I as Inbox } from './inbox-DQkWlyzz.js';
import './useCurrency-DVuQBX2G.js';

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Bold = createLucideIcon("BoldIcon", [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Italic = createLucideIcon("ItalicIcon", [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const MailOpen = createLucideIcon("MailOpenIcon", [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
]);

/**
 * @license lucide-vue-next v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const MousePointerClick = createLucideIcon("MousePointerClickIcon", [
  ["path", { d: "M14 4.1 12 6", key: "ita8i4" }],
  ["path", { d: "m5.1 8-2.9-.8", key: "1go3kf" }],
  ["path", { d: "m6 12-1.9 2", key: "mnht97" }],
  ["path", { d: "M7.2 2.2 8 5.1", key: "1cfko1" }],
  [
    "path",
    {
      d: "M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
      key: "s0h3yz"
    }
  ]
]);

const _hoisted_1$1 = { class: "fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 shadow-2xl" };
const _hoisted_2$1 = { class: "bg-white shadow-[0_0_50px_rgba(47,46,139,0.2)] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-200 rounded-none relative" };
const _hoisted_3$1 = { class: "flex items-center justify-between p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md relative z-10 sticky top-0" };
const _hoisted_4$1 = { class: "flex items-center gap-3" };
const _hoisted_5$1 = { class: "flex-1 overflow-y-auto p-6 custom-scrollbar bg-white relative z-10" };
const _hoisted_6$1 = { class: "space-y-4" };
const _hoisted_7$1 = { class: "flex items-start gap-4" };
const _hoisted_8$1 = { class: "flex-1" };
const _hoisted_9$1 = ["onKeydown"];
const _hoisted_10$1 = {
  key: 0,
  class: "flex flex-wrap gap-2 mt-3"
};
const _hoisted_11$1 = ["onClick"];
const _hoisted_12$1 = { class: "flex items-center gap-2 pt-2" };
const _hoisted_13$1 = {
  key: 0,
  class: "flex items-start gap-4"
};
const _hoisted_14$1 = { class: "flex-1" };
const _hoisted_15$1 = {
  key: 1,
  class: "flex items-start gap-4"
};
const _hoisted_16$1 = { class: "flex-1" };
const _hoisted_17$1 = { class: "flex items-start gap-4 border-t border-dashed border-gray-100 pt-4" };
const _hoisted_18$1 = { class: "flex-1" };
const _hoisted_19$1 = { class: "border border-gray-200 rounded-none overflow-hidden flex flex-col h-72" };
const _hoisted_20$1 = { class: "bg-gray-50 p-2 border-b border-gray-200 flex items-center gap-2" };
const _hoisted_21$1 = {
  type: "button",
  class: "p-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition"
};
const _hoisted_22$1 = {
  type: "button",
  class: "p-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition"
};
const _hoisted_23$1 = {
  type: "button",
  class: "p-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition"
};
const _hoisted_24$1 = {
  type: "button",
  class: "px-3 py-2 text-gray-400 hover:text-[#2F2E8B] hover:bg-white rounded-none border border-transparent hover:border-gray-200 shadow-none transition flex items-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest"
};
const _hoisted_25$1 = { class: "p-6 bg-gray-50/80 border-t border-gray-100 backdrop-blur-md flex items-center justify-between relative z-10" };
const _hoisted_26$1 = { class: "flex items-center gap-3 cursor-pointer group" };
const _hoisted_27$1 = { class: "relative flex items-center justify-center w-4 h-4 border border-gray-300 bg-white group-hover:border-[#2F2E8B] transition-colors" };
const _hoisted_28$1 = {
  key: 0,
  class: "w-2 h-2 bg-[#2F2E8B]"
};
const _hoisted_29$1 = { class: "flex items-center gap-4" };
const _hoisted_30$1 = { class: "flex items-center shadow-lg shadow-[#2F2E8B]/20 rounded-none overflow-hidden" };
const _hoisted_31$1 = ["disabled"];
const _hoisted_32$1 = ["disabled"];


const _sfc_main$1 = {
  __name: 'CRMEmailModal',
  setup(__props) {

const {
  emailForm, showCc, showBcc, closeEmailModal, sendEmail
} = useCRMModule();

const recipientInput = ref('');
const sending = ref(false);

const addRecipient = () => {
  const email = recipientInput.value.trim();
  if (email && email.includes('@')) {
    if (!emailForm.value.recipients) emailForm.value.recipients = [];
    if (!emailForm.value.recipients.some(r => r.email === email)) {
      emailForm.value.recipients.push({ email });
    }
    recipientInput.value = '';
  }
};

const removeRecipient = (index) => {
  emailForm.value.recipients.splice(index, 1);
};

const submitEmail = async () => {
  if (emailForm.value.recipients.length === 0 && !recipientInput.value) {
    alert("Please add at least one recipient.");
    return;
  }
  if (recipientInput.value) {
    addRecipient();
  }
  
  sending.value = true;
  try {
    await sendEmail();
  } catch (error) {
    console.error('Failed to send email:', error);
  } finally {
    sending.value = false;
  }
};

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      _cache[22] || (_cache[22] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.02]" }, null, -1)),
      createBaseVNode("header", _hoisted_3$1, [
        _cache[10] || (_cache[10] = createBaseVNode("div", { class: "flex items-center gap-3" }, [
          createBaseVNode("div", { class: "w-1.5 h-6 bg-[#2F2E8B]" }),
          createBaseVNode("div", null, [
            createBaseVNode("span", { class: "text-[10px] font-mono font-black text-gray-400 tracking-[0.2em] uppercase block mb-0.5" }, "Email_Center // Compose"),
            createBaseVNode("h2", { class: "text-xl font-black text-gray-900 tracking-tight uppercase font-outfit" }, "New_Message_Transmission")
          ])
        ], -1)),
        createBaseVNode("div", _hoisted_4$1, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => (unref(closeEmailModal) && unref(closeEmailModal)(...args))),
            class: "w-10 h-10 flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-none group"
          }, [
            createVNode(unref(X), {
              size: 18,
              class: "group-hover:rotate-90 transition-transform"
            })
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_5$1, [
        createBaseVNode("form", {
          onSubmit: withModifiers(submitEmail, ["prevent"]),
          class: "space-y-6"
        }, [
          createBaseVNode("div", _hoisted_6$1, [
            createBaseVNode("div", _hoisted_7$1, [
              _cache[11] || (_cache[11] = createBaseVNode("label", { class: "w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest" }, "Routing_To", -1)),
              createBaseVNode("div", _hoisted_8$1, [
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((recipientInput).value = $event)),
                  onKeydown: withKeys(withModifiers(addRecipient, ["prevent"]), ["enter"]),
                  placeholder: "ENTER_EMAIL_AND_PRESS_ENTER...",
                  class: "w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none p-3 text-[10px] font-mono uppercase tracking-widest transition-all"
                }, null, 40, _hoisted_9$1), [
                  [vModelText, recipientInput.value]
                ]),
                (unref(emailForm).recipients && unref(emailForm).recipients.length > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(emailForm).recipients, (rec, index) => {
                        return (openBlock(), createElementBlock("span", {
                          key: index,
                          class: "inline-flex items-center gap-2 bg-blue-50 text-[#2F2E8B] text-[9px] font-mono font-black px-3 py-1.5 border border-blue-100 tracking-widest uppercase"
                        }, [
                          createTextVNode(toDisplayString(rec.email) + " ", 1),
                          createBaseVNode("button", {
                            type: "button",
                            onClick: $event => (removeRecipient(index)),
                            class: "hover:text-red-500"
                          }, [
                            createVNode(unref(X), { size: 12 })
                          ], 8, _hoisted_11$1)
                        ]))
                      }), 128))
                    ]))
                  : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_12$1, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: _cache[2] || (_cache[2] = $event => (showCc.value = !unref(showCc))),
                  class: "text-[9px] font-mono font-black text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest border border-gray-100 px-2 py-1 bg-gray-50 transition-colors"
                }, "Cc"),
                createBaseVNode("button", {
                  type: "button",
                  onClick: _cache[3] || (_cache[3] = $event => (showBcc.value = !unref(showBcc))),
                  class: "text-[9px] font-mono font-black text-gray-400 hover:text-[#2F2E8B] uppercase tracking-widest border border-gray-100 px-2 py-1 bg-gray-50 transition-colors"
                }, "Bcc")
              ])
            ]),
            (unref(showCc))
              ? (openBlock(), createElementBlock("div", _hoisted_13$1, [
                  _cache[12] || (_cache[12] = createBaseVNode("label", { class: "w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest" }, "Route_Cc", -1)),
                  createBaseVNode("div", _hoisted_14$1, [
                    withDirectives(createBaseVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((unref(emailForm).cc) = $event)),
                      placeholder: "CC_RECIPIENTS...",
                      class: "w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none p-3 text-[10px] font-mono uppercase tracking-widest transition-all"
                    }, null, 512), [
                      [vModelText, unref(emailForm).cc]
                    ])
                  ]),
                  _cache[13] || (_cache[13] = createBaseVNode("div", { class: "w-[68px]" }, null, -1))
                ]))
              : createCommentVNode("", true),
            (unref(showBcc))
              ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
                  _cache[14] || (_cache[14] = createBaseVNode("label", { class: "w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest" }, "Route_Bcc", -1)),
                  createBaseVNode("div", _hoisted_16$1, [
                    withDirectives(createBaseVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((unref(emailForm).bcc) = $event)),
                      placeholder: "BCC_RECIPIENTS...",
                      class: "w-full bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2F2E8B] focus:ring-1 focus:ring-[#2F2E8B] rounded-none p-3 text-[10px] font-mono uppercase tracking-widest transition-all"
                    }, null, 512), [
                      [vModelText, unref(emailForm).bcc]
                    ])
                  ]),
                  _cache[15] || (_cache[15] = createBaseVNode("div", { class: "w-[68px]" }, null, -1))
                ]))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_17$1, [
              _cache[16] || (_cache[16] = createBaseVNode("label", { class: "w-20 text-[10px] font-mono font-black text-gray-400 pt-3 text-right uppercase tracking-widest" }, "Subject", -1)),
              createBaseVNode("div", _hoisted_18$1, [
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((unref(emailForm).subject) = $event)),
                  placeholder: "TRANSMISSION_SUBJECT...",
                  class: "w-full bg-transparent border-b-2 border-transparent hover:border-gray-100 focus:border-[#2F2E8B] focus:ring-0 rounded-none p-2 text-sm font-mono font-bold text-gray-900 transition-all placeholder-gray-300 focus:outline-none"
                }, null, 512), [
                  [vModelText, unref(emailForm).subject]
                ])
              ]),
              _cache[17] || (_cache[17] = createBaseVNode("div", { class: "w-[68px]" }, null, -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_19$1, [
            createBaseVNode("div", _hoisted_20$1, [
              createBaseVNode("button", _hoisted_21$1, [
                createVNode(unref(Bold), { size: 14 })
              ]),
              createBaseVNode("button", _hoisted_22$1, [
                createVNode(unref(Italic), { size: 14 })
              ]),
              createBaseVNode("button", _hoisted_23$1, [
                createVNode(unref(List), { size: 14 })
              ]),
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "w-px h-6 bg-gray-200 mx-2" }, null, -1)),
              createBaseVNode("button", _hoisted_24$1, [
                createVNode(unref(Paperclip), { size: 12 }),
                _cache[18] || (_cache[18] = createTextVNode(" ATTACH_PAYLOAD ", -1))
              ])
            ]),
            withDirectives(createBaseVNode("textarea", {
              "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((unref(emailForm).body) = $event)),
              class: "flex-1 w-full bg-white border-0 focus:ring-0 p-6 text-[11px] font-mono leading-relaxed text-gray-800 resize-none custom-scrollbar focus:outline-none",
              placeholder: "BEGIN_MESSAGE_BODY_HERE..."
            }, null, 512), [
              [vModelText, unref(emailForm).body]
            ])
          ])
        ], 32)
      ]),
      createBaseVNode("footer", _hoisted_25$1, [
        createBaseVNode("label", _hoisted_26$1, [
          createBaseVNode("div", _hoisted_27$1, [
            withDirectives(createBaseVNode("input", {
              type: "checkbox",
              "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((unref(emailForm).usePersonalEmail) = $event)),
              class: "opacity-0 absolute inset-0 cursor-pointer"
            }, null, 512), [
              [vModelCheckbox, unref(emailForm).usePersonalEmail]
            ]),
            (unref(emailForm).usePersonalEmail)
              ? (openBlock(), createElementBlock("div", _hoisted_28$1))
              : createCommentVNode("", true)
          ]),
          _cache[20] || (_cache[20] = createBaseVNode("span", { class: "text-[9px] font-mono font-black text-gray-400 group-hover:text-[#2F2E8B] tracking-widest uppercase transition-colors" }, "ROUTE_VIA_PERSONAL_NODE", -1))
        ]),
        createBaseVNode("div", _hoisted_29$1, [
          createBaseVNode("button", {
            type: "button",
            onClick: _cache[9] || (_cache[9] = (...args) => (unref(closeEmailModal) && unref(closeEmailModal)(...args))),
            class: "px-6 py-2.5 bg-white border border-gray-200 text-gray-400 hover:text-gray-900 rounded-none text-[10px] font-mono font-black uppercase tracking-widest hover:border-gray-300 transition-all shadow-none"
          }, " ABORT "),
          createBaseVNode("div", _hoisted_30$1, [
            createBaseVNode("button", {
              type: "button",
              onClick: submitEmail,
              disabled: sending.value,
              class: "px-8 py-2.5 bg-[#2F2E8B] text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-[#3D2F88] transition-all disabled:opacity-50 flex items-center gap-3 border-r border-white/10"
            }, [
              (sending.value)
                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createVNode(unref(LoaderCircle), {
                      size: 14,
                      class: "animate-spin"
                    }),
                    _cache[21] || (_cache[21] = createTextVNode(" TRANSMITTING... ", -1))
                  ], 64))
                : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(" EXEC_TRANSMIT ")
                  ], 64))
            ], 8, _hoisted_31$1),
            createBaseVNode("button", {
              type: "button",
              class: "px-3 py-2.5 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition-all flex items-center justify-center disabled:opacity-50",
              disabled: sending.value
            }, [
              createVNode(unref(ChevronDown), { size: 14 })
            ], 8, _hoisted_32$1)
          ])
        ])
      ])
    ])
  ]))
}
}

};
const CRMEmailModal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-47f9b4e2"]]);

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900" };
const _hoisted_2 = { class: "bg-white border-b border-gray-200 sticky top-0 z-30 shadow-none relative text-gray-800 blur-scoped" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-none uppercase tracking-wider" };
const _hoisted_7 = { class: "flex-1 w-full relative z-10 pb-40 blur-scoped" };
const _hoisted_8 = { class: "px-4 sm:px-6 lg:px-8 py-6 relative space-y-6" };
const _hoisted_9 = {
  key: 0,
  class: "absolute inset-0 z-20 bg-white/70 backdrop-blur-[1px] flex items-center justify-center"
};
const _hoisted_10 = { class: "flex items-center gap-3 text-[#2F2E8B]" };
const _hoisted_11 = { class: "flex items-center justify-between" };
const _hoisted_12 = { class: "grid grid-cols-1 md:grid-cols-4 gap-4" };
const _hoisted_13 = { class: "bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all duration-300 relative overflow-hidden group p-4 rounded-none" };
const _hoisted_14 = { class: "flex justify-between items-start mb-2 relative z-10" };
const _hoisted_15 = { class: "text-2xl font-black text-[#2F2E8B] tracking-tighter relative z-10" };
const _hoisted_16 = { class: "bg-white border border-gray-200 hover:border-green-500 transition-all duration-300 relative overflow-hidden group p-4 rounded-none" };
const _hoisted_17 = { class: "flex justify-between items-start mb-2 relative z-10" };
const _hoisted_18 = { class: "text-2xl font-black text-green-600 tracking-tighter relative z-10" };
const _hoisted_19 = { class: "bg-white border border-gray-200 hover:border-purple-500 transition-all duration-300 relative overflow-hidden group p-4 rounded-none" };
const _hoisted_20 = { class: "flex justify-between items-start mb-2 relative z-10" };
const _hoisted_21 = { class: "text-2xl font-black text-purple-600 tracking-tighter relative z-10" };
const _hoisted_22 = { class: "bg-white border border-gray-200 hover:border-orange-500 transition-all duration-300 relative overflow-hidden group p-4 rounded-none" };
const _hoisted_23 = { class: "flex justify-between items-start mb-2 relative z-10" };
const _hoisted_24 = { class: "text-2xl font-black text-orange-600 tracking-tighter relative z-10" };
const _hoisted_25 = { class: "bg-white border border-gray-200 rounded-none relative overflow-hidden flex flex-col h-[600px]" };
const _hoisted_26 = { class: "border-b border-gray-100 bg-gray-50/50 relative z-10 flex border-t-0" };
const _hoisted_27 = ["onClick"];
const _hoisted_28 = { class: "flex-1 overflow-y-auto custom-scrollbar relative z-10" };
const _hoisted_29 = {
  key: 0,
  class: "flex flex-col items-center justify-center h-full py-16"
};
const _hoisted_30 = { class: "w-16 h-16 bg-gray-50 border border-gray-100 rounded-none flex items-center justify-center mb-4" };
const _hoisted_31 = { class: "text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-2" };
const _hoisted_32 = {
  key: 1,
  class: "divide-y divide-gray-100"
};
const _hoisted_33 = ["onClick"];
const _hoisted_34 = { class: "flex items-start gap-4" };
const _hoisted_35 = { class: "w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center text-[#2F2E8B] font-mono font-black text-sm uppercase flex-shrink-0 group-hover:bg-[#2F2E8B] group-hover:text-white transition-colors" };
const _hoisted_36 = { class: "flex-1 min-w-0" };
const _hoisted_37 = { class: "flex items-center justify-between mb-1" };
const _hoisted_38 = { class: "text-[11px] font-mono font-black text-gray-900 uppercase truncate" };
const _hoisted_39 = { class: "text-[9px] font-mono text-gray-400 uppercase tracking-widest" };
const _hoisted_40 = { class: "text-[10px] font-mono font-bold text-gray-700 truncate uppercase mt-0.5" };
const _hoisted_41 = { class: "text-[10px] font-mono text-gray-500 truncate mt-1 tracking-tight" };


const _sfc_main = {
  __name: 'CRMEmailsPage',
  setup(__props) {

const {
  getUserEmail, getInitials, activeTab, moduleLoading, emailStats, emails, emailListFilter,
  filteredEmails, openNewEmail, openEmailDetail, formatEmailDate, loadEmails, loadEmailStats,
  showEmailModal
} = useCRMModule();

onMounted(() => {
  activeTab.value = 'emails';
  loadEmails();
  loadEmailStats();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[15] || (_cache[15] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(unref(_sfc_main$2), {
            route: "/dashboard/crm",
            variant: "icon-only"
          }),
          _cache[1] || (_cache[1] = createStaticVNode("<div class=\"w-1.5 h-6 bg-[#2F2E8B]\" data-v-cc0c7951></div><div data-v-cc0c7951><div class=\"flex items-center gap-1.5\" data-v-cc0c7951><span class=\"text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-cc0c7951>CRM</span><span class=\"text-[10px] font-mono font-bold text-gray-300\" data-v-cc0c7951>//</span><span class=\"text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest\" data-v-cc0c7951>Emails</span></div><h1 class=\"text-lg font-black text-gray-900 uppercase tracking-tight\" data-v-cc0c7951>Email_Center</h1></div>", 2))
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
          ? (openBlock(), createElementBlock("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createVNode(unref(LoaderCircle), {
                  class: "animate-spin",
                  size: 24
                }),
                _cache[2] || (_cache[2] = createBaseVNode("span", { class: "font-mono font-black uppercase text-sm tracking-widest" }, "Loading_Emails...", -1))
              ])
            ]))
          : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_11, [
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
            createBaseVNode("div", { class: "w-1 h-4 bg-[#2F2E8B]" }),
            createBaseVNode("h3", { class: "text-[10px] font-black text-gray-900 uppercase tracking-widest font-mono" }, "Communications_Hub")
          ], -1)),
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = (...args) => (unref(openNewEmail) && unref(openNewEmail)(...args))),
            class: "px-4 py-2 bg-[#2F2E8B] text-white hover:bg-[#3D2F88] transition flex items-center gap-2 font-mono font-bold uppercase text-[9px] rounded-none tracking-widest"
          }, [
            createVNode(unref(Plus), { size: 12 }),
            _cache[3] || (_cache[3] = createTextVNode(" Compose_Message ", -1))
          ])
        ]),
        createBaseVNode("div", _hoisted_12, [
          createBaseVNode("div", _hoisted_13, [
            _cache[6] || (_cache[6] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
            createBaseVNode("div", _hoisted_14, [
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]" }, "Sent_Today", -1)),
              createVNode(unref(Send), {
                size: 14,
                class: "text-blue-500"
              })
            ]),
            createBaseVNode("div", _hoisted_15, toDisplayString(unref(emailStats).sentToday), 1)
          ]),
          createBaseVNode("div", _hoisted_16, [
            _cache[8] || (_cache[8] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
            createBaseVNode("div", _hoisted_17, [
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]" }, "Open_Rate", -1)),
              createVNode(unref(MailOpen), {
                size: 14,
                class: "text-green-500"
              })
            ]),
            createBaseVNode("div", _hoisted_18, toDisplayString(unref(emailStats).openRate) + "%", 1)
          ]),
          createBaseVNode("div", _hoisted_19, [
            _cache[10] || (_cache[10] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
            createBaseVNode("div", _hoisted_20, [
              _cache[9] || (_cache[9] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]" }, "Click_Rate", -1)),
              createVNode(unref(MousePointerClick), {
                size: 14,
                class: "text-purple-500"
              })
            ]),
            createBaseVNode("div", _hoisted_21, toDisplayString(unref(emailStats).clickRate) + "%", 1)
          ]),
          createBaseVNode("div", _hoisted_22, [
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.03]" }, null, -1)),
            createBaseVNode("div", _hoisted_23, [
              _cache[11] || (_cache[11] = createBaseVNode("div", { class: "text-[8px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em]" }, "Scheduled", -1)),
              createVNode(unref(Clock), {
                size: 14,
                class: "text-orange-500"
              })
            ]),
            createBaseVNode("div", _hoisted_24, toDisplayString(unref(emailStats).scheduled), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_25, [
          _cache[14] || (_cache[14] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-[0.01]" }, null, -1)),
          createBaseVNode("div", _hoisted_26, [
            (openBlock(), createElementBlock(Fragment, null, renderList(['inbox', 'sent', 'scheduled', 'drafts'], (folder) => {
              return createBaseVNode("button", {
                key: folder,
                onClick: $event => (emailListFilter.value = folder),
                class: normalizeClass(["px-6 py-4 transition-all text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-2 whitespace-nowrap border-b-2", unref(emailListFilter) === folder ? 'border-[#2F2E8B] text-[#2F2E8B] font-black bg-white shadow-none' : 'border-transparent text-gray-400 hover:text-gray-600 font-bold'])
              }, [
                (folder === 'inbox')
                  ? (openBlock(), createBlock(unref(Inbox), {
                      key: 0,
                      size: 14
                    }))
                  : createCommentVNode("", true),
                (folder === 'sent')
                  ? (openBlock(), createBlock(unref(Send), {
                      key: 1,
                      size: 14
                    }))
                  : createCommentVNode("", true),
                (folder === 'scheduled')
                  ? (openBlock(), createBlock(unref(Clock), {
                      key: 2,
                      size: 14
                    }))
                  : createCommentVNode("", true),
                (folder === 'drafts')
                  ? (openBlock(), createBlock(unref(FileText), {
                      key: 3,
                      size: 14
                    }))
                  : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(folder) + "_[" + toDisplayString(unref(emails).filter(e => e.folder === folder).length) + "] ", 1)
              ], 10, _hoisted_27)
            }), 64))
          ]),
          createBaseVNode("div", _hoisted_28, [
            (unref(filteredEmails).length === 0)
              ? (openBlock(), createElementBlock("div", _hoisted_29, [
                  createBaseVNode("div", _hoisted_30, [
                    createVNode(unref(Inbox), {
                      size: 24,
                      class: "text-gray-300"
                    })
                  ]),
                  _cache[13] || (_cache[13] = createBaseVNode("h3", { class: "text-[11px] font-mono font-black text-gray-400 uppercase tracking-[0.2em]" }, "EMPTY_DIRECTORY", -1)),
                  createBaseVNode("p", _hoisted_31, "No emails in " + toDisplayString(unref(emailListFilter)), 1)
                ]))
              : (openBlock(), createElementBlock("div", _hoisted_32, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredEmails), (email) => {
                    return (openBlock(), createElementBlock("div", {
                      key: email.id,
                      onClick: $event => (unref(openEmailDetail)(email)),
                      class: "p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    }, [
                      createBaseVNode("div", _hoisted_34, [
                        createBaseVNode("div", _hoisted_35, toDisplayString(unref(getInitials)(unref(emailListFilter) === 'sent' ? email.to : (email.from || email.to))), 1),
                        createBaseVNode("div", _hoisted_36, [
                          createBaseVNode("div", _hoisted_37, [
                            createBaseVNode("div", _hoisted_38, toDisplayString(unref(emailListFilter) === 'sent' ? email.to : (email.from || email.to)), 1),
                            createBaseVNode("div", _hoisted_39, toDisplayString(unref(formatEmailDate)(email.timestamp)), 1)
                          ]),
                          createBaseVNode("div", _hoisted_40, toDisplayString(email.subject || 'NO_SUBJECT'), 1),
                          createBaseVNode("div", _hoisted_41, toDisplayString(email.preview), 1)
                        ])
                      ])
                    ], 8, _hoisted_33))
                  }), 128))
                ]))
          ])
        ])
      ])
    ]),
    (unref(showEmailModal))
      ? (openBlock(), createBlock(Teleport, {
          key: 0,
          to: "#modal-target"
        }, [
          createVNode(CRMEmailModal)
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const CRMEmailsPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-cc0c7951"]]);

export { CRMEmailsPage as default };
