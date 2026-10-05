import { _ as _export_sfc, r as ref, i as computed, M as watch, f as onMounted, c as createElementBlock, b as createBaseVNode, A as createTextVNode, t as toDisplayString, s as unref, j as createCommentVNode, x as withDirectives, L as vModelSelect, Y as isRef, a as createStaticVNode, F as Fragment, e as renderList, P as nextTick, o as openBlock, h as normalizeClass, v as withModifiers, y as vModelText, K as withKeys } from './index-CSRWfGkc.js';
/* empty css                                                               */
import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-WtZersWu.js';
import { i as useCRMModule } from './CRMModule-Dh_JOtqO.js';
import './useCurrency-BbedTGo0.js';
import './_commonjsHelpers-BFTU3MAI.js';

const _hoisted_1 = { class: "min-h-screen flex flex-col font-sans relative text-gray-900 overflow-hidden" };
const _hoisted_2 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[100] shadow-none" };
const _hoisted_3 = { class: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex items-center gap-3" };
const _hoisted_6 = { class: "text-[10px] font-mono font-bold text-[#2F2E8B] bg-blue-50/50 border border-blue-100 px-3 py-1.5 flex items-center gap-2 rounded-none uppercase" };
const _hoisted_7 = { class: "flex-1 w-full px-4 sm:px-6 lg:px-8 pt-8 pb-40 relative z-10" };
const _hoisted_8 = {
  key: 0,
  class: "absolute inset-0 z-50 bg-white/70 backdrop-blur-[2px] flex flex-col items-center justify-center"
};
const _hoisted_9 = { class: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8" };
const _hoisted_10 = { class: "flex flex-wrap gap-3" };
const _hoisted_11 = { class: "flex flex-col gap-1" };
const _hoisted_12 = {
  key: 0,
  class: "flex flex-col gap-1 animate-scale-in"
};
const _hoisted_13 = { class: "flex-1 min-h-0 relative" };
const _hoisted_14 = { class: "space-y-4 pb-12" };
const _hoisted_15 = {
  key: 0,
  class: "bg-white border border-gray-100 p-20 text-center relative overflow-hidden"
};
const _hoisted_16 = { class: "p-6" };
const _hoisted_17 = { class: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-50 pb-4" };
const _hoisted_18 = { class: "flex items-center gap-4" };
const _hoisted_19 = { class: "w-12 h-12 bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2F2E8B] group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors" };
const _hoisted_20 = { class: "flex items-center gap-2" };
const _hoisted_21 = { class: "text-sm font-black text-gray-900 font-display uppercase tracking-tight" };
const _hoisted_22 = { class: "flex items-center gap-2 mt-0.5" };
const _hoisted_23 = { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest" };
const _hoisted_24 = { class: "flex flex-col items-end text-right" };
const _hoisted_25 = { class: "text-[11px] font-mono font-bold text-gray-900 border border-gray-100 bg-gray-50 px-2 py-1 uppercase" };
const _hoisted_26 = { class: "relative py-4 px-6 bg-gray-50/50 border-l border-gray-200 mb-6 font-mono text-[12px] leading-relaxed text-gray-800" };
const _hoisted_27 = { class: "flex flex-wrap items-center justify-between gap-4" };
const _hoisted_28 = { class: "flex items-center gap-3" };
const _hoisted_29 = { class: "text-[9px] font-mono font-bold text-white bg-[#2F2E8B] px-3 py-1 uppercase tracking-widest" };
const _hoisted_30 = {
  key: 0,
  class: "text-[9px] font-mono font-bold text-[#2F2E8B] border border-blue-100 bg-blue-50/50 px-3 py-1 uppercase tracking-widest"
};
const _hoisted_31 = { class: "text-[9px] font-mono font-bold text-gray-400 border border-gray-100 px-3 py-1 uppercase tracking-widest" };
const _hoisted_32 = { class: "flex items-center gap-2" };
const _hoisted_33 = ["onClick"];
const _hoisted_34 = ["onClick"];
const _hoisted_35 = {
  key: 0,
  class: "mt-8 border-t border-dashed border-gray-100 pt-6"
};
const _hoisted_36 = { class: "space-y-3 mb-6" };
const _hoisted_37 = {
  key: 0,
  class: "bg-gray-50/50 p-4 border border-gray-100 text-center rounded-none"
};
const _hoisted_38 = { class: "flex items-start justify-between gap-4" };
const _hoisted_39 = { class: "text-[11px] font-mono text-gray-700 leading-relaxed" };
const _hoisted_40 = { class: "text-[9px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-0.5 uppercase flex-shrink-0" };
const _hoisted_41 = { class: "flex gap-2" };
const _hoisted_42 = ["onUpdate:modelValue", "onFocus", "onKeyup"];
const _hoisted_43 = ["onClick"];


const _sfc_main = {
  __name: 'CRMWhatsAppPage',
  setup(__props) {

const {
  getUserEmail, moduleLoading, filteredCommunications, communicationFilter,
  whatsappSubtypeFilter, getCommunicationIcon,
  replyToCommunication, deleteCommunicationRecord, callNotes, newCallNote,
  ensureCallNotesLoaded, submitCallNote, crmFormatDateTime, goToModule
} = useCRMModule();

const scrollContainer = ref(null);

// Chronological sort: oldest first at top, newest at bottom
const whatsappChronological = computed(() => {
  if (!filteredCommunications.value) return [];
  // Backend returns newest first, we reverse for "scroll from top to bottom" chat feel
  return [...filteredCommunications.value].reverse();
});

const scrollToBottom = () => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  });
};

// Auto-scroll to bottom when communications change
watch(whatsappChronological, () => {
  scrollToBottom();
}, { deep: true });

onMounted(async () => {
  await goToModule('whatsapp');
  scrollToBottom();
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[23] || (_cache[23] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background opacity-[0.4]" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("button", {
            onClick: _cache[0] || (_cache[0] = $event => (_ctx.$router.push('/dashboard/crm'))),
            class: "text-gray-400 hover:text-[#2F2E8B] transition-colors mr-2"
          }, [...(_cache[3] || (_cache[3] = [
            createBaseVNode("i", { class: "fas fa-arrow-left text-lg" }, null, -1)
          ]))]),
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "w-2 h-8 bg-[#2F2E8B] rounded-none" }, null, -1)),
          _cache[5] || (_cache[5] = createBaseVNode("div", null, [
            createBaseVNode("div", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2" }, [
              createBaseVNode("i", { class: "fab fa-whatsapp text-[#2F2E8B]" }),
              createBaseVNode("span", null, "CRM // WHATSAPP")
            ]),
            createBaseVNode("h1", { class: "text-xl font-black text-gray-900 uppercase tracking-tight font-display" }, "Communications")
          ], -1))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("span", _hoisted_6, [
            _cache[6] || (_cache[6] = createBaseVNode("i", { class: "fas fa-user-circle" }, null, -1)),
            createTextVNode(toDisplayString(unref(getUserEmail)() || 'USER'), 1)
          ])
        ])
      ])
    ]),
    createBaseVNode("main", _hoisted_7, [
      (unref(moduleLoading))
        ? (openBlock(), createElementBlock("div", _hoisted_8, [...(_cache[7] || (_cache[7] = [
            createBaseVNode("div", { class: "w-16 h-16 border-t-2 border-[#2F2E8B] rounded-full animate-spin mb-4" }, null, -1),
            createBaseVNode("div", { class: "text-[10px] font-mono font-bold text-[#2F2E8B] uppercase tracking-[0.2em] animate-pulse" }, "Syncing Encrypted Logs...", -1)
          ]))]))
        : createCommentVNode("", true),
      createBaseVNode("div", _hoisted_9, [
        _cache[12] || (_cache[12] = createBaseVNode("div", null, [
          createBaseVNode("h3", { class: "text-2xl font-black text-gray-900 font-display flex items-center gap-3 uppercase tracking-tight" }, [
            createBaseVNode("i", { class: "fab fa-whatsapp text-[#25D366]" }),
            createTextVNode(" WhatsApp Streams ")
          ]),
          createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1" }, " End-to-end trace documentation // system_ref: wa_matrix_v1 ")
        ], -1)),
        createBaseVNode("div", _hoisted_10, [
          createBaseVNode("div", _hoisted_11, [
            _cache[9] || (_cache[9] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-1" }, "Source Filter", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (isRef(communicationFilter) ? (communicationFilter).value = $event : null)),
              class: "bg-white border border-gray-200 text-gray-900 font-bold font-mono text-[11px] rounded-none px-4 py-2.5 focus:border-[#2F2E8B] focus:ring-0 uppercase transition-all shadow-none w-44"
            }, [...(_cache[8] || (_cache[8] = [
              createStaticVNode("<option value=\"\" data-v-659e45ec>ALL COMM // TRACE</option><option value=\"email\" data-v-659e45ec>EMAIL LOGS</option><option value=\"call\" data-v-659e45ec>VOICE RECORDS</option><option value=\"whatsapp\" data-v-659e45ec>WHATSAPP DATA</option><option value=\"meeting\" data-v-659e45ec>MEETING LOGS</option>", 5)
            ]))], 512), [
              [vModelSelect, unref(communicationFilter)]
            ])
          ]),
          (unref(communicationFilter) === 'whatsapp')
            ? (openBlock(), createElementBlock("div", _hoisted_12, [
                _cache[11] || (_cache[11] = createBaseVNode("label", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest px-1" }, "Subtype Scan", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (isRef(whatsappSubtypeFilter) ? (whatsappSubtypeFilter).value = $event : null)),
                  class: "bg-white border border-[#2F2E8B] text-[#2F2E8B] font-bold font-mono text-[11px] rounded-none px-4 py-2.5 focus:ring-0 uppercase transition-all shadow-none w-44"
                }, [...(_cache[10] || (_cache[10] = [
                  createBaseVNode("option", { value: "" }, "FULL SCAN", -1),
                  createBaseVNode("option", { value: "text" }, "TEXT PARSING", -1),
                  createBaseVNode("option", { value: "audio_call" }, "VOICE COMM", -1),
                  createBaseVNode("option", { value: "video_call" }, "VIDEO TRACE", -1)
                ]))], 512), [
                  [vModelSelect, unref(whatsappSubtypeFilter)]
                ])
              ]))
            : createCommentVNode("", true)
        ])
      ]),
      createBaseVNode("div", _hoisted_13, [
        createBaseVNode("div", {
          ref_key: "scrollContainer",
          ref: scrollContainer,
          class: "absolute inset-0 overflow-y-auto custom-scrollbar px-1"
        }, [
          createBaseVNode("div", _hoisted_14, [
            (!unref(filteredCommunications) || unref(filteredCommunications).length === 0)
              ? (openBlock(), createElementBlock("div", _hoisted_15, [...(_cache[13] || (_cache[13] = [
                  createStaticVNode("<div class=\"absolute inset-0 dotted-pattern opacity-[0.05] pointer-events-none\" data-v-659e45ec></div><div class=\"relative z-10\" data-v-659e45ec><i class=\"fab fa-whatsapp text-gray-100 text-8xl mb-6\" data-v-659e45ec></i><h4 class=\"text-xl font-black text-gray-300 font-display uppercase tracking-tight\" data-v-659e45ec>V0 LOGS // EMPTY</h4><p class=\"text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-2\" data-v-659e45ec>No encrypted communication fragments detected in current matrix.</p></div>", 2)
                ]))]))
              : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(whatsappChronological.value, (comm) => {
              return (openBlock(), createElementBlock("div", {
                key: comm.id,
                class: "bg-white border border-gray-100 hover:border-[#2F2E8B] transition-all duration-300 group relative shadow-none hover:shadow-md"
              }, [
                _cache[22] || (_cache[22] = createBaseVNode("div", { class: "absolute top-0 left-0 w-1 h-full bg-[#2F2E8B] opacity-0 group-hover:opacity-100 transition-opacity" }, null, -1)),
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("div", _hoisted_17, [
                    createBaseVNode("div", _hoisted_18, [
                      createBaseVNode("div", _hoisted_19, [
                        createBaseVNode("i", {
                          class: normalizeClass([unref(getCommunicationIcon)(comm.type), "text-xl"])
                        }, null, 2)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_20, [
                          _cache[14] || (_cache[14] = createBaseVNode("span", { class: "text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest" }, "TRACE_SENDER //", -1)),
                          createBaseVNode("span", _hoisted_21, toDisplayString(comm.contactName), 1)
                        ]),
                        createBaseVNode("div", _hoisted_22, [
                          _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest" }, "ENTITY //", -1)),
                          createBaseVNode("span", _hoisted_23, toDisplayString(comm.company || 'UNKNOWN_ORG'), 1)
                        ])
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_24, [
                      _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1" }, "RECORDED //", -1)),
                      createBaseVNode("span", _hoisted_25, toDisplayString(unref(crmFormatDateTime)(comm.timestamp || comm.created_at)), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_26, [
                    _cache[17] || (_cache[17] = createBaseVNode("div", { class: "absolute top-2 right-2 text-[8px] font-mono font-bold text-gray-300 uppercase select-none" }, "DATA_FRAGMENT", -1)),
                    createTextVNode(" " + toDisplayString(comm.subject || comm.message), 1)
                  ]),
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, [
                      createBaseVNode("span", _hoisted_29, toDisplayString(comm.type), 1),
                      (comm.type === 'whatsapp' && comm.subtype)
                        ? (openBlock(), createElementBlock("span", _hoisted_30, toDisplayString(comm.subtype), 1))
                        : createCommentVNode("", true),
                      createBaseVNode("span", _hoisted_31, "STATUS // " + toDisplayString(comm.status), 1)
                    ]),
                    createBaseVNode("div", _hoisted_32, [
                      createBaseVNode("button", {
                        onClick: $event => (unref(replyToCommunication)(comm)),
                        class: "px-4 py-2 border border-[#2F2E8B] text-[#2F2E8B] text-[9px] font-mono font-bold uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2"
                      }, [...(_cache[18] || (_cache[18] = [
                        createBaseVNode("i", { class: "fas fa-reply" }, null, -1),
                        createTextVNode(" EXECUTE_REPLY ", -1)
                      ]))], 8, _hoisted_33),
                      createBaseVNode("button", {
                        onClick: withModifiers($event => (unref(deleteCommunicationRecord)(comm)), ["stop"]),
                        class: "p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                      }, [...(_cache[19] || (_cache[19] = [
                        createBaseVNode("i", { class: "fas fa-trash-alt" }, null, -1)
                      ]))], 8, _hoisted_34)
                    ])
                  ]),
                  (comm.type === 'whatsapp')
                    ? (openBlock(), createElementBlock("div", _hoisted_35, [
                        _cache[21] || (_cache[21] = createBaseVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                          createBaseVNode("div", { class: "w-1 h-4 bg-gray-200" }),
                          createBaseVNode("h5", { class: "text-[10px] font-mono font-black text-gray-900 uppercase tracking-[0.2em]" }, "APPENDED_NOTES")
                        ], -1)),
                        createBaseVNode("div", _hoisted_36, [
                          (!unref(callNotes)[comm.id] || unref(callNotes)[comm.id].length === 0)
                            ? (openBlock(), createElementBlock("div", _hoisted_37, [...(_cache[20] || (_cache[20] = [
                                createBaseVNode("p", { class: "text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest" }, "No metadata notes attached to this trace.", -1)
                              ]))]))
                            : createCommentVNode("", true),
                          (openBlock(true), createElementBlock(Fragment, null, renderList((unref(callNotes)[comm.id] || []), (n) => {
                            return (openBlock(), createElementBlock("div", {
                              key: n.id,
                              class: "bg-white border-l-2 border-[#2F2E8B] p-4 shadow-none group/note relative"
                            }, [
                              createBaseVNode("div", _hoisted_38, [
                                createBaseVNode("div", _hoisted_39, toDisplayString(n.text), 1),
                                createBaseVNode("div", _hoisted_40, toDisplayString(unref(crmFormatDateTime)(n.created_at)), 1)
                              ])
                            ]))
                          }), 128))
                        ]),
                        createBaseVNode("div", _hoisted_41, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": $event => ((unref(newCallNote)[comm.id]) = $event),
                            onFocus: $event => (unref(ensureCallNotesLoaded)(comm)),
                            onKeyup: withKeys($event => (unref(submitCallNote)(comm)), ["enter"]),
                            placeholder: "INPUT TRACE METADATA...",
                            class: "flex-1 bg-gray-50/50 border border-gray-200 focus:border-[#2F2E8B] focus:ring-0 px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest transition-all rounded-none"
                          }, null, 40, _hoisted_42), [
                            [vModelText, unref(newCallNote)[comm.id]]
                          ]),
                          createBaseVNode("button", {
                            onClick: $event => (unref(submitCallNote)(comm)),
                            class: "bg-[#2F2E8B] text-white px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest hover:opacity-90 shadow-md transition-all rounded-none flex-shrink-0"
                          }, " APPEND ", 8, _hoisted_43)
                        ])
                      ]))
                    : createCommentVNode("", true)
                ])
              ]))
            }), 128))
          ])
        ], 512)
      ])
    ])
  ]))
}
}

};
const CRMWhatsAppPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-659e45ec"]]);

export { CRMWhatsAppPage as default };
