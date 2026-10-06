import { _ as _export_sfc, r as ref, M as watch, o as openBlock, C as createBlock, c as createElementBlock, b as createBaseVNode, t as toDisplayString, x as withDirectives, L as vModelSelect, y as vModelText, j as createCommentVNode, N as vModelCheckbox, T as Teleport, F as Fragment, e as renderList, n as normalizeStyle, A as createTextVNode, i as computed, f as onMounted, h as normalizeClass, q as createVNode, s as unref, Q as axios, R as API_BASE_URL, g as onBeforeUnmount, w as withCtx, a as createStaticVNode, D as resolveComponent, E as useRoute, u as useRouter, J as decodeJWT, K as withKeys, v as withModifiers } from './index-_vIa0xlU.js';
import { u as useCustomerStore } from './customerStore-rXaNJ0B1.js';
import { u as usePredictionStore } from './predictionStore-CpkNRHsz.js';
import { useSnapshotStore } from './snapshotStore-Bol18Xlu.js';
import { _ as _sfc_main$4, t as tierColor, s as stateTier, h as healthTier, c as churnTier } from './CustomerStatePill-Fpy6dAxY.js';
import { g as getActionLog, h as hydrateLogFromServer, b as getCustomerState, r as recordAction, u as updateAction, d as deleteAction } from './absaActions-DdmYbxIx.js';
import { n as notify } from './absaExport-D9syV00a.js';
import { f as fetchCustomerProfile } from './customerProfileApi-CIYHt11a.js';
import { _ as _sfc_main$5, d as deleteCustomer } from './customerAdminApi-B5eRKzIX.js';
import { _ as _sfc_main$6 } from './LoadingSkeleton-ufHhXLkC.js';
import { l as logEngagement } from './crmApi-PvLR7KJh.js';
import { C as Chart, a as CategoryScale, L as LinearScale, B as BarElement, c as plugin_title, p as plugin_tooltip, b as plugin_legend } from './chart-D1QGMS6v.js';
import { B as Bar } from './index-BfDZoNIj.js';
/* empty css                                                               */

const _hoisted_1$3 = {
  key: 0,
  class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
};
const _hoisted_2$3 = { class: "bg-white rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative border border-gray-200" };
const _hoisted_3$3 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10" };
const _hoisted_4$3 = { class: "flex items-center gap-2" };
const _hoisted_5$3 = { class: "text-xs font-mono font-bold uppercase tracking-widest text-gray-900" };
const _hoisted_6$3 = { class: "p-5 space-y-5 relative z-10" };
const _hoisted_7$3 = { class: "grid grid-cols-3 gap-4" };
const _hoisted_8$3 = ["disabled"];
const _hoisted_9$3 = ["disabled"];
const _hoisted_10$3 = ["disabled"];
const _hoisted_11$3 = { class: "grid grid-cols-3 gap-4" };
const _hoisted_12$2 = ["disabled"];
const _hoisted_13$2 = ["disabled"];
const _hoisted_14$2 = { class: "col-span-1" };
const _hoisted_15$2 = { class: "flex gap-2" };
const _hoisted_16$2 = ["disabled"];
const _hoisted_17$2 = ["disabled"];
const _hoisted_18$2 = { class: "grid grid-cols-2 gap-4" };
const _hoisted_19$2 = ["disabled"];
const _hoisted_20$2 = ["disabled"];
const _hoisted_21$2 = ["disabled"];
const _hoisted_22$2 = { class: "flex items-center gap-2" };
const _hoisted_23$2 = ["disabled"];
const _hoisted_24$2 = {
  key: 0,
  class: "grid grid-cols-2 gap-4 bg-gray-50/80 p-4 border border-gray-200 rounded-none relative z-10"
};
const _hoisted_25$2 = ["disabled"];
const _hoisted_26$2 = ["disabled"];
const _hoisted_27$2 = { class: "px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end gap-3" };
const _hoisted_28$2 = ["disabled"];


const _sfc_main$3 = {
  __name: 'EngagementModal',
  props: {
  open: Boolean,
  customerId: String,
  customerName: String,
  existingEntry: Object,
  readonly: Boolean
},
  emits: ['close', 'logged'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

const type = ref('Call');
const notes = ref('');
const outcome = ref('');
const dormancyReason = ref('');
const crossSell = ref('');
const recommendation = ref('');
const customerExperience = ref('');
const branchToVisit = ref('');
const customerFeedback = ref('');
const isPromise = ref(false);
const expectedAmount = ref('');
const expectedDate = ref('');
const followUpDate = ref('');
const loading = ref(false);

watch(() => props.open, (newOpen) => {
  if (newOpen) {
    if (props.existingEntry) {
      const e = props.existingEntry;
      type.value = e.type || 'Call';
      notes.value = e.meta?.notes || e.detail || '';
      outcome.value = e.meta?.outcome || '';
      dormancyReason.value = e.meta?.dormancy_reason || '';
      crossSell.value = e.meta?.cross_sell_details || '';
      recommendation.value = e.meta?.recommendation || '';
      customerExperience.value = e.meta?.customer_experience || '';
      branchToVisit.value = e.meta?.branch_to_visit || '';
      customerFeedback.value = e.meta?.customer_feedback || '';
      isPromise.value = !!e.meta?.isPromise;
      expectedAmount.value = e.meta?.expectedAmount || '';
      expectedDate.value = e.meta?.expectedDate || '';
      followUpDate.value = e.meta?.followUpDate || '';
    } else {
      type.value = 'Call';
      notes.value = '';
      outcome.value = '';
      dormancyReason.value = '';
      crossSell.value = '';
      recommendation.value = '';
      customerExperience.value = '';
      branchToVisit.value = '';
      customerFeedback.value = '';
      isPromise.value = false;
      expectedAmount.value = '';
      expectedDate.value = '';
      followUpDate.value = '';
    }
  }
});

async function submit() {
  loading.value = true;
  try {
    const payload = {
      type: type.value,
      notes: notes.value,
      outcome: outcome.value,
      dormancy_reason: dormancyReason.value,
      cross_sell_details: crossSell.value,
      recommendation: recommendation.value,
      customer_experience: customerExperience.value,
      branch_to_visit: branchToVisit.value,
      customer_feedback: customerFeedback.value,
      isPromise: isPromise.value,
      expectedAmount: expectedAmount.value,
      expectedDate: expectedDate.value
    };
    await logEngagement(props.customerId, payload);
    emit('logged', payload);
    emit('close');
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.open)
      ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$3, [
            _cache[35] || (_cache[35] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-30" }, null, -1)),
            createBaseVNode("div", _hoisted_3$3, [
              createBaseVNode("div", _hoisted_4$3, [
                _cache[16] || (_cache[16] = createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion shrink-0" }, null, -1)),
                createBaseVNode("h3", _hoisted_5$3, toDisplayString(__props.readonly ? "View Engagement" : (__props.existingEntry ? "Edit Engagement" : "Log Engagement")) + " - " + toDisplayString(__props.customerName || __props.customerId), 1)
              ]),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close'))),
                class: "text-gray-400 hover:text-absa-passion transition-colors"
              }, [...(_cache[17] || (_cache[17] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "close", -1)
              ]))])
            ]),
            createBaseVNode("div", _hoisted_6$3, [
              createBaseVNode("div", _hoisted_7$3, [
                createBaseVNode("div", null, [
                  _cache[19] || (_cache[19] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Type (e.g. Call)", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((type).value = $event)),
                    disabled: __props.readonly,
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10"
                  }, [...(_cache[18] || (_cache[18] = [
                    createBaseVNode("option", null, "Call", -1),
                    createBaseVNode("option", null, "SMS", -1),
                    createBaseVNode("option", null, "Email", -1),
                    createBaseVNode("option", null, "Meeting", -1)
                  ]))], 8, _hoisted_8$3), [
                    [vModelSelect, type.value]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[21] || (_cache[21] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Outcome", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((outcome).value = $event)),
                    disabled: __props.readonly,
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10"
                  }, [...(_cache[20] || (_cache[20] = [
                    createBaseVNode("option", { value: "" }, "-- Select --", -1),
                    createBaseVNode("option", null, "Promised to Activate", -1),
                    createBaseVNode("option", null, "Promised to Fund", -1),
                    createBaseVNode("option", null, "Unreachable", -1),
                    createBaseVNode("option", null, "Not Interested", -1)
                  ]))], 8, _hoisted_9$3), [
                    [vModelSelect, outcome.value]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[23] || (_cache[23] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Dormancy Reason", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((dormancyReason).value = $event)),
                    disabled: __props.readonly,
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10"
                  }, [...(_cache[22] || (_cache[22] = [
                    createBaseVNode("option", { value: "" }, "-- Select --", -1),
                    createBaseVNode("option", null, "Forgot about account", -1),
                    createBaseVNode("option", null, "Using competitor", -1),
                    createBaseVNode("option", null, "Financial difficulties", -1),
                    createBaseVNode("option", null, "Relocated", -1),
                    createBaseVNode("option", null, "Other", -1)
                  ]))], 8, _hoisted_10$3), [
                    [vModelSelect, dormancyReason.value]
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_11$3, [
                createBaseVNode("div", null, [
                  _cache[24] || (_cache[24] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Cross Sell Details", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((crossSell).value = $event)),
                    disabled: __props.readonly,
                    type: "text",
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10",
                    placeholder: "e.g. Pitched personal loan"
                  }, null, 8, _hoisted_12$2), [
                    [vModelText, crossSell.value]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[26] || (_cache[26] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Customer Experience", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((customerExperience).value = $event)),
                    disabled: __props.readonly,
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10"
                  }, [...(_cache[25] || (_cache[25] = [
                    createBaseVNode("option", { value: "" }, "-- Select --", -1),
                    createBaseVNode("option", null, "Excellent", -1),
                    createBaseVNode("option", null, "Good", -1),
                    createBaseVNode("option", null, "Neutral", -1),
                    createBaseVNode("option", null, "Poor", -1)
                  ]))], 8, _hoisted_13$2), [
                    [vModelSelect, customerExperience.value]
                  ])
                ]),
                createBaseVNode("div", _hoisted_14$2, [
                  _cache[28] || (_cache[28] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Recommendation", -1)),
                  createBaseVNode("div", _hoisted_15$2, [
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((recommendation).value = $event)),
                      disabled: __props.readonly,
                      class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10"
                    }, [...(_cache[27] || (_cache[27] = [
                      createBaseVNode("option", { value: "" }, "-- Select --", -1),
                      createBaseVNode("option", null, "Schedule Follow Up", -1),
                      createBaseVNode("option", null, "Send Product Details", -1),
                      createBaseVNode("option", null, "Escalate to RM", -1),
                      createBaseVNode("option", null, "No Action Required", -1)
                    ]))], 8, _hoisted_16$2), [
                      [vModelSelect, recommendation.value]
                    ]),
                    (recommendation.value === 'Schedule Follow Up')
                      ? withDirectives((openBlock(), createElementBlock("input", {
                          key: 0,
                          "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((followUpDate).value = $event)),
                          disabled: __props.readonly,
                          type: "date",
                          class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10",
                          title: "Follow Up Date"
                        }, null, 8, _hoisted_17$2)), [
                          [vModelText, followUpDate.value]
                        ])
                      : createCommentVNode("", true)
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_18$2, [
                createBaseVNode("div", null, [
                  _cache[29] || (_cache[29] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Branch to Visit (Nearest)", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => ((branchToVisit).value = $event)),
                    disabled: __props.readonly,
                    type: "text",
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10",
                    placeholder: "e.g. Levy Mall"
                  }, null, 8, _hoisted_19$2), [
                    [vModelText, branchToVisit.value]
                  ])
                ]),
                createBaseVNode("div", null, [
                  _cache[30] || (_cache[30] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Customer Feedback", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => ((customerFeedback).value = $event)),
                    disabled: __props.readonly,
                    type: "text",
                    class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10",
                    placeholder: "Feedback from customer"
                  }, null, 8, _hoisted_20$2), [
                    [vModelText, customerFeedback.value]
                  ])
                ])
              ]),
              createBaseVNode("div", null, [
                _cache[31] || (_cache[31] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "General Notes", -1)),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => ((notes).value = $event)),
                  disabled: __props.readonly,
                  rows: "2",
                  class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10",
                  placeholder: "Enter general notes..."
                }, null, 8, _hoisted_21$2), [
                  [vModelText, notes.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_22$2, [
                withDirectives(createBaseVNode("input", {
                  type: "checkbox",
                  disabled: __props.readonly,
                  id: "ptf",
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => ((isPromise).value = $event)),
                  class: "rounded-none border-gray-300 text-absa-passion focus:ring-absa-passion relative z-10"
                }, null, 8, _hoisted_23$2), [
                  [vModelCheckbox, isPromise.value]
                ]),
                _cache[32] || (_cache[32] = createBaseVNode("label", {
                  for: "ptf",
                  class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 relative z-10 cursor-pointer"
                }, "Create \"Promise to Fund\"", -1))
              ]),
              (isPromise.value)
                ? (openBlock(), createElementBlock("div", _hoisted_24$2, [
                    createBaseVNode("div", null, [
                      _cache[33] || (_cache[33] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Amount", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => ((expectedAmount).value = $event)),
                        disabled: __props.readonly,
                        type: "number",
                        class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10",
                        placeholder: "e.g. 5000"
                      }, null, 8, _hoisted_25$2), [
                        [vModelText, expectedAmount.value]
                      ])
                    ]),
                    createBaseVNode("div", null, [
                      _cache[34] || (_cache[34] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-900 mb-1.5" }, "Expected Date", -1)),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => ((expectedDate).value = $event)),
                        disabled: __props.readonly,
                        type: "date",
                        class: "w-full border border-gray-300 rounded-none px-3 py-2 text-xs focus:ring-1 focus:ring-absa-passion outline-none bg-white relative z-10"
                      }, null, 8, _hoisted_26$2), [
                        [vModelText, expectedDate.value]
                      ])
                    ])
                  ]))
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_27$2, [
              (!__props.readonly)
                ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    onClick: _cache[14] || (_cache[14] = $event => (_ctx.$emit('close'))),
                    class: "px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                  }, toDisplayString(__props.readonly ? "Close" : "Cancel"), 1))
                : createCommentVNode("", true),
              (!__props.readonly)
                ? (openBlock(), createElementBlock("button", {
                    key: 1,
                    onClick: submit,
                    disabled: loading.value,
                    class: "px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors disabled:opacity-50"
                  }, toDisplayString(loading.value ? 'Saving...' : (__props.existingEntry ? 'Update Engagement' : 'Save Engagement')), 9, _hoisted_28$2))
                : createCommentVNode("", true),
              (__props.readonly)
                ? (openBlock(), createElementBlock("button", {
                    key: 2,
                    onClick: _cache[15] || (_cache[15] = $event => (_ctx.$emit('close'))),
                    class: "px-6 py-2.5 bg-absa-passion text-white text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-absa-power transition-colors"
                  }, " Close "))
                : createCommentVNode("", true)
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const EngagementModal = /*#__PURE__*/_export_sfc(_sfc_main$3, [['__scopeId',"data-v-f607a09e"]]);

const _hoisted_1$2 = {
  key: 0,
  class: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
};
const _hoisted_2$2 = { class: "bg-white rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative border border-gray-200 flex flex-col max-h-[85vh]" };
const _hoisted_3$2 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white relative z-10 shrink-0" };
const _hoisted_4$2 = { class: "flex items-center gap-2" };
const _hoisted_5$2 = { class: "text-xs font-mono font-bold uppercase tracking-widest text-gray-900" };
const _hoisted_6$2 = { class: "p-6 overflow-y-auto relative z-10 flex-1" };
const _hoisted_7$2 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_8$2 = { class: "flex flex-col items-center pt-1 shrink-0" };
const _hoisted_9$2 = { class: "pb-4 min-w-0 flex-1" };
const _hoisted_10$2 = { class: "flex items-start justify-between" };
const _hoisted_11$2 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_12$1 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_13$1 = { class: "text-[10px] text-gray-400" };
const _hoisted_14$1 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_15$1 = {
  key: 0,
  class: "text-[10px] text-gray-400 block uppercase tracking-wide mt-1"
};
const _hoisted_16$1 = { class: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" };
const _hoisted_17$1 = ["onClick"];
const _hoisted_18$1 = ["onClick"];
const _hoisted_19$1 = {
  key: 0,
  class: "mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-100 pt-2"
};
const _hoisted_20$1 = { key: 0 };
const _hoisted_21$1 = { key: 1 };
const _hoisted_22$1 = { key: 2 };
const _hoisted_23$1 = { key: 3 };
const _hoisted_24$1 = { key: 4 };
const _hoisted_25$1 = { key: 5 };
const _hoisted_26$1 = {
  key: 6,
  class: "col-span-2"
};
const _hoisted_27$1 = {
  key: 1,
  class: "text-center py-8"
};
const _hoisted_28$1 = { class: "px-5 py-4 border-t border-gray-200 bg-white relative z-10 flex justify-end shrink-0" };


const _sfc_main$2 = {
  __name: 'AllHistoryModal',
  props: {
  open: Boolean,
  customerName: String,
  customerId: String,
  history: Array
},
  emits: ['close', 'edit', 'delete'],
  setup(__props) {



const fmtDate = (d) => {
  if (!d) return ''
  return new Date(d).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
};

const tierColor = (tier) => {
  const map = {
    power: '#DC0037',
    inspire: '#FF3333',
    hope: '#005587',
    unknown: '#9ca3af'
  };
  return map[tier] || map.unknown
};

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    (__props.open)
      ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          createBaseVNode("div", _hoisted_2$2, [
            _cache[15] || (_cache[15] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern pointer-events-none opacity-30" }, null, -1)),
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("div", _hoisted_4$2, [
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion shrink-0" }, null, -1)),
                createBaseVNode("h3", _hoisted_5$2, " Complete Engagement History - " + toDisplayString(__props.customerName || __props.customerId), 1)
              ]),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('close'))),
                class: "text-gray-400 hover:text-absa-passion transition-colors"
              }, [...(_cache[3] || (_cache[3] = [
                createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "close", -1)
              ]))])
            ]),
            createBaseVNode("div", _hoisted_6$2, [
              (__props.history && __props.history.length)
                ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.history, (h) => {
                      return (openBlock(), createElementBlock("div", {
                        key: h.id,
                        class: "flex gap-3 group relative"
                      }, [
                        createBaseVNode("div", _hoisted_8$2, [
                          createBaseVNode("div", {
                            class: "w-2 h-2 rounded-none",
                            style: normalizeStyle({ background: tierColor('power') })
                          }, null, 4),
                          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "w-[1px] flex-1 bg-gray-200 mt-1 min-h-[30px]" }, null, -1))
                        ]),
                        createBaseVNode("div", _hoisted_9$2, [
                          createBaseVNode("div", _hoisted_10$2, [
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_11$2, [
                                createBaseVNode("span", _hoisted_12$1, toDisplayString(h.title), 1),
                                createBaseVNode("span", _hoisted_13$1, toDisplayString(fmtDate(h.at)), 1)
                              ]),
                              createBaseVNode("p", _hoisted_14$1, toDisplayString(h.detail), 1),
                              (h.actor)
                                ? (openBlock(), createElementBlock("span", _hoisted_15$1, "RM: " + toDisplayString(h.actor), 1))
                                : createCommentVNode("", true)
                            ]),
                            createBaseVNode("div", _hoisted_16$1, [
                              createBaseVNode("button", {
                                onClick: $event => (_ctx.$emit('edit', h)),
                                class: "p-1 text-gray-400 hover:text-absa-passion transition-colors",
                                title: "Edit"
                              }, [...(_cache[5] || (_cache[5] = [
                                createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "edit", -1)
                              ]))], 8, _hoisted_17$1),
                              createBaseVNode("button", {
                                onClick: $event => (_ctx.$emit('delete', h)),
                                class: "p-1 text-gray-400 hover:text-red-600 transition-colors",
                                title: "Delete"
                              }, [...(_cache[6] || (_cache[6] = [
                                createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "delete", -1)
                              ]))], 8, _hoisted_18$1)
                            ])
                          ]),
                          (h.meta && (h.meta.outcome || h.meta.dormancy_reason || h.meta.cross_sell_details || h.meta.branch_to_visit))
                            ? (openBlock(), createElementBlock("div", _hoisted_19$1, [
                                (h.meta.outcome)
                                  ? (openBlock(), createElementBlock("div", _hoisted_20$1, [
                                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Outcome:", -1)),
                                      createTextVNode(" " + toDisplayString(h.meta.outcome), 1)
                                    ]))
                                  : createCommentVNode("", true),
                                (h.meta.dormancy_reason)
                                  ? (openBlock(), createElementBlock("div", _hoisted_21$1, [
                                      _cache[8] || (_cache[8] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Reason:", -1)),
                                      createTextVNode(" " + toDisplayString(h.meta.dormancy_reason), 1)
                                    ]))
                                  : createCommentVNode("", true),
                                (h.meta.cross_sell_details)
                                  ? (openBlock(), createElementBlock("div", _hoisted_22$1, [
                                      _cache[9] || (_cache[9] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Cross Sell:", -1)),
                                      createTextVNode(" " + toDisplayString(h.meta.cross_sell_details), 1)
                                    ]))
                                  : createCommentVNode("", true),
                                (h.meta.recommendation)
                                  ? (openBlock(), createElementBlock("div", _hoisted_23$1, [
                                      _cache[10] || (_cache[10] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Recommendation:", -1)),
                                      createTextVNode(" " + toDisplayString(h.meta.recommendation), 1)
                                    ]))
                                  : createCommentVNode("", true),
                                (h.meta.customer_experience)
                                  ? (openBlock(), createElementBlock("div", _hoisted_24$1, [
                                      _cache[11] || (_cache[11] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Experience:", -1)),
                                      createTextVNode(" " + toDisplayString(h.meta.customer_experience), 1)
                                    ]))
                                  : createCommentVNode("", true),
                                (h.meta.branch_to_visit)
                                  ? (openBlock(), createElementBlock("div", _hoisted_25$1, [
                                      _cache[12] || (_cache[12] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Branch:", -1)),
                                      createTextVNode(" " + toDisplayString(h.meta.branch_to_visit), 1)
                                    ]))
                                  : createCommentVNode("", true),
                                (h.meta.customer_feedback)
                                  ? (openBlock(), createElementBlock("div", _hoisted_26$1, [
                                      _cache[13] || (_cache[13] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Feedback:", -1)),
                                      createTextVNode(" " + toDisplayString(h.meta.customer_feedback), 1)
                                    ]))
                                  : createCommentVNode("", true)
                              ]))
                            : createCommentVNode("", true)
                        ])
                      ]))
                    }), 128))
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_27$1, [...(_cache[14] || (_cache[14] = [
                    createBaseVNode("p", { class: "text-sm text-gray-500" }, "No engagement history found.", -1)
                  ]))]))
            ]),
            createBaseVNode("div", _hoisted_28$1, [
              createBaseVNode("button", {
                onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('close'))),
                class: "px-6 py-2.5 bg-gray-100 text-gray-700 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest shadow-none hover:bg-gray-200 transition-colors"
              }, " Close ")
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const AllHistoryModal = /*#__PURE__*/_export_sfc(_sfc_main$2, [['__scopeId',"data-v-b61414ff"]]);

const _hoisted_1$1 = { class: "bg-white rounded-sm border border-gray-300 p-5 mb-6" };
const _hoisted_2$1 = { class: "flex items-center justify-between mb-4" };
const _hoisted_3$1 = {
  key: 0,
  class: "flex items-center gap-2"
};
const _hoisted_4$1 = {
  key: 0,
  class: "py-10 flex items-center justify-center"
};
const _hoisted_5$1 = {
  key: 1,
  class: "py-10 flex flex-col items-center justify-center text-center gap-3"
};
const _hoisted_6$1 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_7$1 = { class: "text-[10px] uppercase font-bold text-gray-400" };
const _hoisted_8$1 = { class: "flex items-end gap-2 mt-2" };
const _hoisted_9$1 = { class: "text-lg font-mono font-bold text-absa-enrich" };
const _hoisted_10$1 = { class: "text-xs text-absa-inspire font-bold mb-1 line-through" };
const _hoisted_11$1 = { class: "h-64 relative w-full" };


const _sfc_main$1 = {
  __name: 'PostEngagementPerformance',
  props: {
  customerId: { type: String, required: true },
  engagementDate: { type: String, required: false }
},
  setup(__props) {

Chart.register(CategoryScale, LinearScale, BarElement, plugin_title, plugin_tooltip, plugin_legend);

const props = __props;

const before = ref(null);
const after = ref(null);
const loading = ref(true);

/** True only when we have real (non-null) numbers from the API */
const hasData = computed(() =>
  before.value?.txValue != null && after.value?.txValue != null
);

function pct(b, a) {
  if (!b) return 0
  return Math.round(((a - b) / b) * 100)
}

const metrics = computed(() => {
  if (!hasData.value) return []
  return [
    {
      label: 'Total Transaction Value',
      before: before.value.txValue?.toLocaleString() ?? '-',
      after:  after.value.txValue?.toLocaleString()  ?? '-',
      unit: 'ZMW',
      change: pct(before.value.txValue, after.value.txValue)
    },
    {
      label: 'Txn Frequency',
      before: before.value.txCount ?? '-',
      after:  after.value.txCount  ?? '-',
      unit: 'txns',
      change: pct(before.value.txCount, after.value.txCount)
    },
    {
      label: 'Digital Logins',
      before: before.value.logins ?? '-',
      after:  after.value.logins  ?? '-',
      unit: 'logins',
      change: pct(before.value.logins, after.value.logins)
    },
    {
      label: 'Average Balance',
      before: before.value.balance?.toLocaleString() ?? '-',
      after:  after.value.balance?.toLocaleString()  ?? '-',
      unit: 'ZMW',
      change: pct(before.value.balance, after.value.balance)
    }
  ]
});

async function fetchPerformanceData() {
  loading.value = true;
  before.value = null;
  after.value = null;

  try {
    const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
    const token = localStorage.getItem('token');
    if (token) api.defaults.headers.Authorization = `Bearer ${token}`;

    const engageDate = props.engagementDate ? new Date(props.engagementDate) : new Date();
    
    // Calculate strict 30-day windows around the engagement date
    const beforeStart = new Date(engageDate);
    beforeStart.setDate(beforeStart.getDate() - 30);
    
    const afterEnd = new Date(engageDate);
    afterEnd.setDate(afterEnd.getDate() + 30);

    const beforeStartStr = beforeStart.toISOString().split('T')[0];
    const engageDateStr = engageDate.toISOString().split('T')[0];
    const afterEndStr = afterEnd.toISOString().split('T')[0];

    // Fetch exact real-time transaction activity for the two windows!
    const [beforeActivityRes, afterActivityRes, latestRes] = await Promise.all([
      api.get(`/features/${props.customerId}/gap-activity?start_date=${beforeStartStr}&end_date=${engageDateStr}`).catch(() => null),
      api.get(`/features/${props.customerId}/gap-activity?start_date=${engageDateStr}&end_date=${afterEndStr}`).catch(() => null),
      api.get(`/features/${props.customerId}/latest`).catch(() => null)
    ]);

    const beforeActivity = beforeActivityRes?.data ?? { txn_count: 0, total_amount: 0 };
    const afterActivity = afterActivityRes?.data ?? { txn_count: 0, total_amount: 0 };
    const latestData = latestRes?.data ?? {};

    // Now we use the EXACT transaction counts and amounts for the 30-day windows
    const beforeTxValue = Math.round(beforeActivity.total_amount);
    const afterTxValue = Math.round(afterActivity.total_amount);
    const beforeTxCount = beforeActivity.txn_count;
    const afterTxCount = afterActivity.txn_count;

    // For logins and balance, we still don't have time-series, so we leave them null
    const afterLogins   = null;
    const beforeLogins  = null;
    const afterBalance  = null;
    const beforeBalance = null;

    // If both windows have exactly zero transactions, it's effectively "no data"
    if (beforeTxCount === 0 && afterTxCount === 0) {
      before.value = null;
      after.value  = null;
    } else {
      before.value = { txValue: beforeTxValue, txCount: beforeTxCount, logins: beforeLogins, balance: beforeBalance };
      after.value  = { txValue: afterTxValue,  txCount: afterTxCount,  logins: afterLogins,  balance: afterBalance };
    }
  } catch (err) {
    console.error('Failed to fetch performance data', err);
    before.value = null;
    after.value  = null;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchPerformanceData);
watch(() => props.customerId,     fetchPerformanceData);
watch(() => props.engagementDate, fetchPerformanceData);

const chartData = computed(() => ({
  labels: ['Total Value (ZMW)', 'Txn Count', 'Digital Logins', 'Avg Balance (ZMW)'],
  datasets: [
    {
      label: 'Before Engagement',
      backgroundColor: '#d1d5db',
      data: [
        before.value?.txValue  ?? 0,
        (before.value?.txCount  ?? 0) * 1000,
        (before.value?.logins   ?? 0) * 1000,
        before.value?.balance  ?? 0
      ]
    },
    {
      label: 'After Engagement',
      backgroundColor: '#DC0037',
      data: [
        after.value?.txValue  ?? 0,
        (after.value?.txCount  ?? 0) * 1000,
        (after.value?.logins   ?? 0) * 1000,
        after.value?.balance  ?? 0
      ]
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(context) {
          let label = context.dataset.label ? context.dataset.label + ': ' : '';
          label += (context.dataIndex === 1 || context.dataIndex === 2)
            ? context.raw / 1000
            : context.raw + ' ZMW';
          return label
        }
      }
    }
  },
  scales: {
    y: { display: false },
    x: { grid: { display: false } }
  }
};

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    createBaseVNode("div", _hoisted_2$1, [
      _cache[1] || (_cache[1] = createBaseVNode("div", null, [
        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Post-Engagement Performance"),
        createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Comparing real-time 30-day activity before vs after the most recent RM engagement.")
      ], -1)),
      (hasData.value)
        ? (openBlock(), createElementBlock("div", _hoisted_3$1, [...(_cache[0] || (_cache[0] = [
            createBaseVNode("span", { class: "flex items-center gap-1 text-[11px] font-bold text-gray-500" }, [
              createBaseVNode("span", { class: "w-3 h-3 rounded-full bg-gray-300" }),
              createTextVNode(" Before ")
            ], -1),
            createBaseVNode("span", { class: "flex items-center gap-1 text-[11px] font-bold text-absa-enrich" }, [
              createBaseVNode("span", { class: "w-3 h-3 rounded-full bg-[#DC0037]" }),
              createTextVNode(" After ")
            ], -1)
          ]))]))
        : createCommentVNode("", true)
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_4$1, [...(_cache[2] || (_cache[2] = [
          createBaseVNode("div", { class: "w-5 h-5 border-2 border-absa-inspire border-t-transparent rounded-full animate-spin" }, null, -1)
        ]))]))
      : (!hasData.value)
        ? (openBlock(), createElementBlock("div", _hoisted_5$1, [...(_cache[3] || (_cache[3] = [
            createBaseVNode("svg", {
              class: "w-10 h-10 text-gray-300",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              createBaseVNode("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "1.5",
                d: "M9 17v-2a4 4 0 014-4h0a4 4 0 014 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
              })
            ], -1),
            createBaseVNode("p", { class: "text-sm font-semibold text-gray-400" }, "No performance data available yet", -1),
            createBaseVNode("p", { class: "text-xs text-gray-400 max-w-xs" }, " Post-engagement metrics will appear here once activity data is recorded for the 30-day windows around this customer's engagements. ", -1)
          ]))]))
        : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", _hoisted_6$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(metrics.value, (metric) => {
                return (openBlock(), createElementBlock("div", {
                  key: metric.label,
                  class: "p-3 border border-gray-200 rounded-sm"
                }, [
                  createBaseVNode("p", _hoisted_7$1, toDisplayString(metric.label), 1),
                  createBaseVNode("div", _hoisted_8$1, [
                    createBaseVNode("p", _hoisted_9$1, toDisplayString(metric.after) + " " + toDisplayString(metric.unit), 1),
                    createBaseVNode("p", _hoisted_10$1, toDisplayString(metric.before) + " " + toDisplayString(metric.unit), 1)
                  ]),
                  createBaseVNode("p", {
                    class: normalizeClass(["text-[11px] font-bold mt-1", metric.change >= 0 ? 'text-[#16a34a]' : 'text-red-500'])
                  }, toDisplayString(metric.change >= 0 ? '+' : '') + toDisplayString(metric.change) + "% ", 3)
                ]))
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_11$1, [
              createVNode(unref(Bar), {
                data: chartData.value,
                options: chartOptions
              }, null, 8, ["data"])
            ])
          ], 64))
  ]))
}
}

};

const _hoisted_1 = { class: "w-full min-h-screen pt-6 px-6 pb-12 font-sans relative text-gray-900 absa-mesh" };
const _hoisted_2 = { class: "relative z-10 w-full" };
const _hoisted_3 = {
  key: 0,
  class: "mb-4 px-4 py-3 bg-amber-50 border border-amber-300 rounded-sm flex items-start gap-2"
};
const _hoisted_4 = { class: "text-xs text-amber-900" };
const _hoisted_5 = { class: "mt-0.5" };
const _hoisted_6 = { class: "grid grid-cols-12 gap-4 mb-6" };
const _hoisted_7 = {
  key: 2,
  class: "flex flex-col items-center justify-center min-h-[50vh] text-center"
};
const _hoisted_8 = {
  key: 0,
  class: "mb-5 bg-red-50/80 border-l-4 border-l-red-600 border border-red-200 rounded-none p-4 flex items-start gap-3 shadow-sm"
};
const _hoisted_9 = { class: "text-xs text-absa-enrich mt-1" };
const _hoisted_10 = { class: "font-bold" };
const _hoisted_11 = { class: "mb-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3" };
const _hoisted_12 = { class: "flex items-center gap-2 text-[11px] text-gray-500 mb-1 flex-wrap" };
const _hoisted_13 = { class: "text-absa-enrich font-bold" };
const _hoisted_14 = { class: "text-[11px] text-gray-400" };
const _hoisted_15 = { key: 0 };
const _hoisted_16 = { class: "flex items-center gap-2 flex-wrap shrink-0" };
const _hoisted_17 = ["href"];
const _hoisted_18 = ["disabled"];
const _hoisted_19 = { class: "bg-white border border-gray-200 rounded-none shadow-sm mb-5 relative overflow-hidden" };
const _hoisted_20 = { class: "relative z-10" };
const _hoisted_21 = { class: "p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6" };
const _hoisted_22 = { class: "flex items-start gap-4 min-w-0" };
const _hoisted_23 = { class: "min-w-0" };
const _hoisted_24 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_25 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" };
const _hoisted_26 = {
  key: 0,
  class: "text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500 border border-gray-200 rounded-none px-2 py-0.5 bg-gray-50"
};
const _hoisted_27 = { class: "text-xl font-bold font-display uppercase tracking-tight text-gray-900 leading-tight mt-1.5" };
const _hoisted_28 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_29 = { key: 0 };
const _hoisted_30 = { class: "grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 shrink-0" };
const _hoisted_31 = { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" };
const _hoisted_32 = { class: "text-xs font-bold text-gray-900 mt-0.5 break-words font-display" };
const _hoisted_33 = { class: "border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 bg-gray-50/40" };
const _hoisted_34 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_35 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_36 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_37 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_38 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_39 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_40 = { class: "px-5 py-4 border-b border-gray-200 sm:border-b-0 sm:border-r xl:border-r border-gray-200" };
const _hoisted_41 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_42 = { class: "px-5 py-4" };
const _hoisted_43 = { class: "flex items-baseline gap-1 mt-1" };
const _hoisted_44 = {
  key: 0,
  class: "text-[11px] text-gray-400"
};
const _hoisted_45 = { class: "h-1 bg-gray-200 rounded-none overflow-hidden mt-2" };
const _hoisted_46 = { class: "grid grid-cols-12 gap-4 mb-5" };
const _hoisted_47 = { class: "col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-none shadow-sm p-5 relative overflow-hidden" };
const _hoisted_48 = { class: "relative z-10" };
const _hoisted_49 = { class: "flex items-center justify-between mb-1" };
const _hoisted_50 = {
  key: 0,
  class: "text-[10px] text-gray-400"
};
const _hoisted_51 = { class: "flex flex-col sm:flex-row items-center gap-5 mt-4" };
const _hoisted_52 = { class: "flex flex-col items-center" };
const _hoisted_53 = ["viewBox", "aria-label"];
const _hoisted_54 = ["cx", "cy", "r"];
const _hoisted_55 = ["cx", "cy", "r", "stroke", "stroke-dasharray", "stroke-dashoffset", "transform"];
const _hoisted_56 = ["x", "y", "fill", "font-size"];
const _hoisted_57 = ["x", "y", "fill", "font-size"];
const _hoisted_58 = { class: "flex-1 w-full space-y-3" };
const _hoisted_59 = { class: "flex items-center justify-between text-[11px] mb-1" };
const _hoisted_60 = { class: "text-gray-500 font-semibold" };
const _hoisted_61 = { class: "h-1.5 bg-gray-100 rounded-none overflow-hidden" };
const _hoisted_62 = { class: "col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-none shadow-sm p-5 relative overflow-hidden" };
const _hoisted_63 = { class: "relative z-10" };
const _hoisted_64 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_65 = { class: "flex items-center justify-between mb-1" };
const _hoisted_66 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_67 = { class: "h-1.5 bg-gray-100 rounded-none overflow-hidden mb-1.5" };
const _hoisted_68 = { class: "text-[11px] text-gray-500 leading-snug" };
const _hoisted_69 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_70 = { class: "bg-white border border-gray-200 rounded-none shadow-sm p-5 mb-5 relative overflow-hidden" };
const _hoisted_71 = { class: "relative z-10" };
const _hoisted_72 = { class: "flex items-center justify-between mb-1" };
const _hoisted_73 = { class: "text-[10px] text-gray-400" };
const _hoisted_74 = {
  key: 0,
  class: "mt-6 overflow-x-auto pb-2"
};
const _hoisted_75 = { class: "flex items-start min-w-[560px]" };
const _hoisted_76 = { class: "flex flex-col items-center flex-1 min-w-[92px]" };
const _hoisted_77 = { class: "text-[10px] font-semibold text-gray-500 mt-0.5 uppercase tracking-wide" };
const _hoisted_78 = {
  key: 1,
  class: "text-xs text-gray-500 mt-4"
};
const _hoisted_79 = { class: "grid grid-cols-12 gap-4" };
const _hoisted_80 = {
  class: "col-span-12 lg:col-span-4 rounded-none p-5 text-white bg-[#0F172A] border border-gray-800 shadow-sm relative overflow-hidden flex flex-col justify-between",
  style: {"background":"linear-gradient(135deg, #77021E 0%, #3d0110 55%, #131010 100%)"}
};
const _hoisted_81 = { class: "flex items-center justify-between mb-4" };
const _hoisted_82 = { class: "text-[10px] font-bold uppercase tracking-widest" };
const _hoisted_83 = {
  key: 0,
  class: "text-[10px] font-bold uppercase tracking-widest"
};
const _hoisted_84 = { class: "flex items-start gap-4" };
const _hoisted_85 = { class: "w-12 h-12 rounded-none bg-white/10 border border-white/20 flex items-center justify-center shrink-0" };
const _hoisted_86 = { class: "material-symbols-outlined text-[26px]" };
const _hoisted_87 = { class: "min-w-0" };
const _hoisted_88 = { class: "text-sm font-bold" };
const _hoisted_89 = { class: "text-[11px] text-white/70 mt-0.5" };
const _hoisted_90 = { class: "text-xs text-white/85 mt-4 leading-relaxed" };
const _hoisted_91 = { class: "flex items-center gap-2 mt-5" };
const _hoisted_92 = ["disabled"];
const _hoisted_93 = ["disabled"];
const _hoisted_94 = { class: "col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-none shadow-sm p-5 flex flex-col relative overflow-hidden" };
const _hoisted_95 = { class: "relative z-10 flex flex-col flex-1" };
const _hoisted_96 = { class: "flex items-center gap-4 border-b border-gray-200 mb-4 pb-2" };
const _hoisted_97 = { class: "ml-auto flex items-center gap-2" };
const _hoisted_98 = {
  key: 0,
  class: "flex-1"
};
const _hoisted_99 = { class: "flex items-center justify-end mb-4" };
const _hoisted_100 = {
  key: 0,
  class: "space-y-4 max-h-[280px] overflow-y-auto pr-1"
};
const _hoisted_101 = { class: "flex flex-col items-center pt-1 shrink-0" };
const _hoisted_102 = { class: "pb-1 min-w-0 flex-1" };
const _hoisted_103 = { class: "flex items-start justify-between" };
const _hoisted_104 = { class: "flex items-center gap-2 flex-wrap" };
const _hoisted_105 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_106 = { class: "text-[10px] text-gray-400" };
const _hoisted_107 = { class: "text-[11px] text-gray-500 mt-0.5" };
const _hoisted_108 = {
  key: 0,
  class: "text-[10px] text-gray-400 block uppercase tracking-wide mt-1"
};
const _hoisted_109 = { class: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" };
const _hoisted_110 = ["onClick"];
const _hoisted_111 = ["onClick"];
const _hoisted_112 = {
  key: 0,
  class: "mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] border-t border-gray-100 pt-2"
};
const _hoisted_113 = { key: 0 };
const _hoisted_114 = { key: 1 };
const _hoisted_115 = { key: 2 };
const _hoisted_116 = { key: 3 };
const _hoisted_117 = { key: 4 };
const _hoisted_118 = { key: 5 };
const _hoisted_119 = {
  key: 6,
  class: "col-span-2"
};
const _hoisted_120 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_121 = {
  key: 1,
  class: "flex-1 pt-2 flex flex-col gap-4"
};
const _hoisted_122 = { class: "bg-blue-50 border border-blue-200 p-4 rounded-sm flex items-center justify-between" };
const _hoisted_123 = { class: "flex items-center gap-3" };
const _hoisted_124 = { class: "text-sm font-bold text-blue-800" };
const _hoisted_125 = { class: "text-right" };
const _hoisted_126 = { class: "text-xs font-bold text-blue-900" };
const _hoisted_127 = {
  key: 2,
  class: "flex-1 pt-2"
};
const _hoisted_128 = {
  key: 0,
  class: "grid grid-cols-2 gap-4 bg-gray-50/70 p-4 border border-gray-200 rounded-none"
};
const _hoisted_129 = { class: "mt-1 text-sm font-bold text-absa-enrich" };
const _hoisted_130 = { class: "mt-1 text-sm font-bold text-absa-enrich" };
const _hoisted_131 = { class: "mt-1 text-sm font-bold font-mono text-absa-enrich" };
const _hoisted_132 = {
  key: 1,
  class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400"
};
const _hoisted_133 = {
  key: 3,
  class: "flex-1 pt-4"
};
const _hoisted_134 = {
  key: 1,
  class: "text-center py-8"
};
const _hoisted_135 = ["onKeydown"];

const TWELVE_MONTHS_MS = 365 * 24 * 60 * 60 * 1000;

const RING_SIZE = 132;
const RING_STROKE = 11;

const _sfc_main = /*@__PURE__*/Object.assign({ name: 'CustomerProfile' }, {
  __name: 'CustomerProfile',
  setup(__props) {

/**
 * Customer Profile — single-customer predictive profile.
 *
 * Pairs with the My Customers list: identity/predictive-insight cards on top,
 * the 12-month lifecycle journey, the AI next-best-action card, and the
 * per-customer action history below.
 */


const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();
const snapshotStore = useSnapshotStore();

const api = axios.create({ baseURL: API_BASE_URL, timeout: 30000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const loading = ref(true);
const reasonCodes = ref([]);
const recommendations = ref([]);
const actionLog = ref([]);
ref('');
const nbaDismissed = ref(false);
const localState = ref(null);
// Identity facts composed server-side from the clean layer (account number,
// national ID, tenure, assigned RM, health score).
const profile = ref(null);
// Set when the master record could not be read, so the page can say why the
// identity panel is running on snapshot data instead of failing silently.
const profileError = ref('');

const showEngagementModal = ref(false);
const showAllHistoryModal = ref(false);

const engagementToEdit = ref(null);


function editEngagement(entry) {
  engagementToEdit.value = entry;
  showEngagementModal.value = true;
}



function handleEngagementUpdated(payload) {
  updateAction(engagementToEdit.value.id, {
    type: payload.type,
    detail: payload.notes || 'Engagement updated.',
    meta: payload
  });
  actionLog.value = getActionLog();
  engagementToEdit.value = null;
  showEngagementModal.value = false;
}

const engagementToDelete = ref(null);
const showDeleteEngagementDialog = ref(false);

function promptDeleteEngagement(entry) {
  engagementToDelete.value = entry;
  showDeleteEngagementDialog.value = true;
}

function confirmDeleteEngagement() {
  if (engagementToDelete.value) {
    deleteAction(engagementToDelete.value.id);
    actionLog.value = getActionLog();
  }
  showDeleteEngagementDialog.value = false;
  engagementToDelete.value = null;
}

const nextOfKin = computed(() => profile.value?.next_of_kin_name ? {
  name: profile.value.next_of_kin_name,
  relation: profile.value.next_of_kin_relationship,
  phone: profile.value.next_of_kin_phone
} : null);
const activeTab = ref('interactions'); // 'interactions' or 'nok'

const customerId = computed(() => String(route.params.id || ''));
const customer = computed(() => customerStore.selectedCustomer || {});
// The identity header comes from Postgres, so the page stays useful even when
// the customer-state / prediction services are unreachable.
const isEmpty = computed(() => !loading.value && !customerStore.selectedCustomer && !profile.value);
const features = computed(() => customerStore.features || {});

const displayName = computed(
  () => profile.value?.full_name || customer.value.fullName || `Customer ${customerId.value}`
);
const state = computed(
  () => profile.value?.lifecycle_state || customer.value.state || 'UNKNOWN'
);
const stateColor = computed(() => tierColor(stateTier(state.value)));

const initials = computed(() => {
  const name = displayName.value.replace(/^Customer\s+/i, '');
  return name.slice(0, 2).toUpperCase() || 'CU'
});

function handleEngagementLogged(payload) {
  const entry = recordAction({
    type: payload.type || 'Engagement',
    customerId: customerId.value,
    customerName: displayName.value,
    detail: payload.notes || 'Engagement logged by RM.',
    meta: payload
  });
  actionLog.value = [entry, ...actionLog.value];
}

const clientTier = computed(() => {
  const code = customer.value.segmentCode;
  if (['Prestige', 'Premier'].includes(code)) return 'Verified Private Client'
  return profile.value?.market_segment || customer.value.segmentLabel || ''
});

const healthScore = computed(() => {
  const fromProfile = profile.value?.health_score;
  if (fromProfile != null) return fromProfile
  const h = predictionStore.healthScores[customerId.value]?.health_score;
  if (h != null) return h
  return customer.value.healthScore ?? null
});

const churnProbability = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  const value = p?.churn_probability ?? customer.value.churnProbability;
  return value == null ? null : Number(value)
});

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return p?.clv_percentile ?? null
});

const components = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  return h?.component_scores || customer.value._raw?.component_scores || {}
});

const computedAt = computed(() => customer.value._raw?.computed_at || customer.value.computedAt || null);

const timelineEntries = computed(() => {
  const raw = customerStore.timeline;
  return Array.isArray(raw) ? raw : (raw?.timeline || [])
});

const stateSince = computed(() => {
  const entries = timelineEntries.value;
  if (!entries.length) return null
  const current = entries.filter((e) => e.state === state.value);
  return (current.length ? current[current.length - 1] : entries[entries.length - 1]).as_of_date
});

const tenureLabel = computed(() => {
  const days = features.value.customer_tenure_days;
  if (days != null) {
    const years = days / 365;
    return years >= 1 ? `${years.toFixed(0)} Years` : `${Math.round(days / 30)} Months`
  }
  const entries = timelineEntries.value;
  if (entries.length) {
    const sorted = [...entries].sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date));
    const first = new Date(sorted[0].as_of_date);
    const months = Math.max(1, Math.round((Date.now() - first.getTime()) / TWELVE_MONTHS_MS * 12));
    return months >= 12 ? `${(months / 12).toFixed(0)} Years` : `${months} Months`
  }
  return '—'
});

const assignedRm = computed(() => {
  const fromProfile = profile.value?.assigned_rm;
  if (fromProfile) return fromProfile
  const s = localState.value || getCustomerState(customerId.value);
  return s?.rm || customer.value._raw?.assigned_rm || null
});

// ── Headline identity facts (account, NRC, tenure, RM, health) ──
const accountNumber = computed(() => profile.value?.account_number || customer.value._raw?.account_number || null);

const accountSub = computed(() => {
  const type = profile.value?.account_type;
  const count = profile.value?.account_count;
  if (!accountNumber.value) return 'No account on record'
  const parts = [];
  if (type) parts.push(prettify(type));
  if (count > 1) parts.push(`${count} accounts held`);
  return parts.join(' · ') || null
});

const nationalId = computed(() => profile.value?.national_id || customer.value._raw?.national_id || null);

const tenureText = computed(() => profile.value?.tenure_label || (tenureLabel.value !== '—' ? tenureLabel.value : null));

const tenureSub = computed(() => {
  const since = profile.value?.customer_since_date || customer.value._raw?.customer_since_date;
  return since ? `Since ${fmtDate(since)}` : null
});

const assignedRmSub = computed(() => (assignedRm.value ? 'Relationship Manager' : 'Not yet assigned'));

const ageText = computed(() => {
  const age = profile.value?.age_years;
  return age != null ? `${age} years old` : null
});

const lastActivityText = computed(() => {
  const days = features.value.days_since_last_txn;
  if (days == null) return '—'
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
});

const healthTileLabel = computed(() => (hasHealth.value ? ringTierLabel.value : 'Not available'));

const bozRemainingDays = computed(() => {
  const days = features.value.days_since_last_txn;
  // 1 year (365) to become dormant + 10 years (3650) dormant period = 4015 days
  if ((state.value === 'DORMANT' || state.value === 'CHURNED') && days != null) {
    return 4015 - days
  }
  return null
});

const bozRemainingText = computed(() => {
  const remaining = bozRemainingDays.value;
  if (remaining == null) return null
  if (remaining < 0) return `Overdue by ${Math.abs(remaining)} days`
  const years = Math.floor(remaining / 365);
  const days = remaining % 365;
  if (years > 0) return `${years} years, ${days} days`
  return `${remaining} days`
});

const bozAlert = computed(() => {
  const remaining = bozRemainingDays.value;
  // Show alert if < 1 year remaining (365 days) or overdue
  return remaining != null && remaining <= 365
});

const detailFields = computed(() => {
  features.value;
  const fields = [
    { label: 'Mobile', value: profile.value?.mobile_number || customer.value._raw?.mobile_number || '—' },
    { label: 'Branch', value: profile.value?.branch_code || customer.value.branch || '—' },
    { label: 'Segment', value: profile.value?.market_segment || customer.value.segmentLabel || '—' },
    { label: 'KYC Tier', value: profile.value?.kyc_tier || '—' },
    { label: 'Nationality', value: profile.value?.nationality || '—' },
    { label: 'Gender', value: profile.value?.gender || '—' },
    { label: 'Last Activity', value: lastActivityText.value },
    { label: 'Lifecycle State', value: String(state.value).replace(/_/g, ' ') },
  ];
  if (bozRemainingText.value) {
    fields.push({ label: 'BOZ Transfer In', value: bozRemainingText.value });
  }
  return fields
});

// ── Health-score ring (inline SVG) ──────────────────────────────
const ringValue = computed(() => {
  const n = Number(healthScore.value);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : 0
});
const hasHealth = computed(() => healthScore.value != null && Number.isFinite(Number(healthScore.value)));
const ringColor = computed(() => tierColor(healthTier(ringValue.value)));
const ringTierLabel = computed(() => {
  if (!hasHealth.value) return 'No Data'
  const s = ringValue.value;
  if (s < 25) return 'Critical'
  if (s < 40) return 'High Risk'
  if (s < 60) return 'Watch'
  if (s < 80) return 'Healthy'
  return 'Thriving'
});
const ringRadius = computed(() => (RING_SIZE - RING_STROKE) / 2);
const ringCircumference = computed(() => 2 * Math.PI * ringRadius.value);
const ringDashOffset = computed(() => ringCircumference.value * (1 - ringValue.value / 100));

const insightMetrics = computed(() => {
  const c = components.value;
  const churnPct = churnProbability.value != null ? (churnProbability.value * 100) : null;
  const clvPct = clvPercentile.value != null ? Math.round(clvPercentile.value * 100) : null;
  const behaviour = c.behaviour_sub ?? features.value.engagement_score ?? null;
  return [
    {
      label: 'Churn Risk',
      value: churnPct != null ? (churnPct >= 60 ? 'High' : churnPct >= 30 ? 'Medium' : 'Low') + ` (${churnPct.toFixed(1)}%)` : '—',
      pct: churnPct ?? 0,
      color: tierColor(churnTier(churnProbability.value)),
    },
    {
      label: 'CLV Percentile',
      value: clvPct != null ? `${clvPct}th` : '—',
      pct: clvPct ?? 0,
      color: tierColor('passion'),
    },
    {
      label: 'Behavioural Score',
      value: behaviour != null ? (Number(behaviour) < 40 ? 'Low' : Number(behaviour) < 70 ? 'Moderate' : 'High') + ` (${Math.round(behaviour)})` : '—',
      pct: behaviour != null ? Math.min(100, Math.max(0, Number(behaviour))) : 0,
      color: behaviour != null && Number(behaviour) < 40 ? tierColor('inspire') : tierColor(healthTier(behaviour)),
    },
  ]
});

const riskDrivers = computed(() => {
  const risks = reasonCodes.value.filter((r) => r.category === 'RISK' && r.severity !== 'LOW');
  if (risks.length) {
    return risks.slice(0, 4).map((r) => {
      const color = r.severity === 'HIGH' ? tierColor('inspire') : tierColor('hope');
      return {
        label: prettify(r.code),
        value: r.severity,
        pct: r.severity === 'HIGH' ? 92 : r.severity === 'MEDIUM' ? 60 : 30,
        color,
        detail: detailText(r.detail) || 'Flagged by the lifecycle reason-code engine.',
      }
    })
  }
  // Fallback: derive drivers from the behavioural feature snapshot.
  const f = features.value;
  const derived = [];
  if (f.days_since_last_txn != null && f.days_since_last_txn > 30) {
    derived.push({
      label: 'Digital / Transaction Recency',
      value: `${f.days_since_last_txn}d`,
      pct: Math.min(100, (f.days_since_last_txn / 180) * 100),
      color: tierColor('hope'),
      detail: `No transaction activity recorded for ${f.days_since_last_txn} days.`,
    });
  }
  if (f.amount_growth_ratio != null && f.amount_growth_ratio < 0) {
    derived.push({
      label: 'Transaction Value Trend',
      value: `${(f.amount_growth_ratio * 100).toFixed(0)}%`,
      pct: Math.min(100, Math.abs(f.amount_growth_ratio) * 100),
      color: tierColor('inspire'),
      detail: 'Decline in transaction value versus the previous window.',
    });
  }
  if (f.engagement_score != null && f.engagement_score < 40) {
    derived.push({
      label: 'Engagement',
      value: `${Math.round(f.engagement_score)}/100`,
      pct: Math.max(8, 100 - f.engagement_score),
      color: tierColor('hope'),
      detail: 'Low digital engagement relative to the portfolio average.',
    });
  }
  if (f.txn_frequency_trend != null && f.txn_frequency_trend < 0) {
    derived.push({
      label: 'Transaction Frequency',
      value: `${(f.txn_frequency_trend * 100).toFixed(0)}%`,
      pct: Math.min(100, Math.abs(f.txn_frequency_trend) * 100),
      color: tierColor('power'),
      detail: 'Fewer transactions than the prior period.',
    });
  }
  return derived.slice(0, 4)
});

const journeyNodes = computed(() => {
  const entries = [...timelineEntries.value]
    .filter((e) => e.as_of_date)
    .sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date));
  const cutoff = Date.now() - TWELVE_MONTHS_MS;
  const recent = entries.filter((e) => new Date(e.as_of_date).getTime() >= cutoff);
  const source = recent.length ? recent : entries.slice(-6);
  if (!source.length) return []

  // Collapse consecutive duplicate states, always keeping the latest snapshot.
  const collapsed = [];
  for (const e of source) {
    if (!collapsed.length || collapsed[collapsed.length - 1].state !== e.state) collapsed.push(e);
  }
  const last = source[source.length - 1];
  if (collapsed[collapsed.length - 1] !== last) collapsed.push(last);

  return collapsed.slice(-6).map((e, i, arr) => ({
    label: String(e.state || '—').replace(/_/g, ' '),
    color: tierColor(stateTier(e.state)),
    when: relativeMonths(e.as_of_date),
    isCurrent: i === arr.length - 1,
  }))
});

const nba = computed(() => {
  const top = recommendations.value[0];
  const churn = churnProbability.value;
  const confidence = top?.propensity_score != null
    ? Math.round(top.propensity_score * 100)
    : churn != null ? Math.round(Math.min(0.95, 0.55 + churn * 0.45) * 100) : null;

  if (top) {
    const product = top.product_name || top.campaign_name || 'Retention offer';
    return {
      priority: 'I',
      confidence,
      icon: 'phone_in_talk',
      title: top.campaign_name || `Offer ${product}`,
      source: 'AI-Lifecycle Engine',
      rationale: top.reason || `Customer qualifies for ${product} based on current lifecycle signals and product propensity.`,
    }
  }

  const fallback = {
    CHURNED: {
      title: 'Immediate Retention',
      icon: 'phone_in_talk',
      rationale: 'Customer has churned. A win-back conversation with a tailored loyalty offer has the highest probability of re-engagement within 48 hours.',
    },
    DORMANT: {
      title: 'Re-engagement Outreach',
      icon: 'campaign',
      rationale: 'Customer has been dormant for an extended period. A proactive re-engagement call with a personalised offer is recommended.',
    },
    AT_RISK: {
      title: 'Retention Call',
      icon: 'support_agent',
      rationale: 'Customer is showing early signs of disengagement. A retention call with a relationship-manager offer is recommended.',
    },
    ACTIVE: {
      title: 'Relationship Review',
      icon: 'handshake',
      rationale: 'Customer is active. Review product holdings for cross-sell and deepen the relationship.',
    },
  }[state.value] || {
    title: 'Monitor & Review',
    icon: 'visibility',
    rationale: 'No immediate intervention required. Continue monitoring lifecycle signals.',
  };
  return { priority: 'I', confidence, source: 'AI-Lifecycle Engine', ...fallback }
});

const EXCLUDED_INTERACTION_TYPES = new Set([
  'CUSTOMER_DELETED',
  'CUSTOMER_RESTORED',
  'CUSTOMER_DELETED_PERMANENT',
  'BULK_ACTION',
  'BULK_DELETE',
  'SYSTEM',
  'AUDIT',
]);

const historyEntries = computed(() => {
  return actionLog.value
    .filter((a) => {
      // Must strictly match this customer ID
      if (!a.customerId || a.customerId !== customerId.value) return false
      // Administrative audit actions must not appear in customer interaction history
      const rawType = String(a.type || '').toUpperCase();
      if (rawType.includes('DELETE') || rawType.includes('RESTORE')) return false
      if (EXCLUDED_INTERACTION_TYPES.has(rawType)) return false
      return true
    })
    .map((a) => ({
      id: a.id,
      title: prettify(a.type || 'Action'),
      at: a.at,
      detail: a.detail || a.meta?.reason || 'Logged by the relationship manager.',
      actor: a.actor,
      meta: a.meta,
    }))
});

computed(() => [...new Set(historyEntries.value.map((h) => h.title))]);

const filteredHistory = computed(() => {
  return historyEntries.value.slice(0, 3)
});

const coreBankingUrl = computed(() =>
  `https://corebanking.absa.local/customer/${encodeURIComponent(customerId.value)}`
);

// ── Helpers ────────────────────────────────────────────────────
function prettify(code) {
  return String(code || '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

function detailText(detail) {
  if (!detail || typeof detail !== 'object' || !Object.keys(detail).length) return ''
  return Object.entries(detail)
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}`)
    .join(' · ')
}

function fmtDate(value) {
  if (!value) return '—'
  try { return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return String(value) }
}

function relativeMonths(value) {
  const ms = Date.now() - new Date(value).getTime();
  const months = Math.round(ms / (30 * 24 * 60 * 60 * 1000));
  if (months <= 0) return 'Now'
  return `${months}m ago`
}

// ── Actions ────────────────────────────────────────────────────
async function copyId() {
  try {
    await navigator.clipboard.writeText(customerId.value);
    notify(`Customer ID ${customerId.value} copied`, 'success', { autoClose: 2000 });
  } catch {
    notify('Could not copy — clipboard unavailable', 'error', { autoClose: 2500 });
  }
}
// ── Delete (soft, reversible) ─────────────────────────────
// Deletion is restricted to OPERATIONS on the backend (ADMIN bypasses). This
// only decides whether the control renders — the server still enforces it.
const canDelete = computed(() => {
  try {
    const jwt = decodeJWT();
    const roles = jwt.getUserRoles?.() || [jwt.getUserRole?.()].filter(Boolean);
    return roles
      .map((r) => String(r).toUpperCase())
      .some((r) => ['ADMIN', 'OPERATIONS'].includes(r))
  } catch {
    return false
  }
});

const confirmOpen = ref(false);
const deleteReason = ref('');
const deleting = ref(false);

function askDelete() {
  deleteReason.value = '';
  confirmOpen.value = true;
}

function cancelDelete() {
  confirmOpen.value = false;
  deleteReason.value = '';
}

async function confirmDelete() {
  if (deleting.value) return
  deleting.value = true;
  try {
    const result = await deleteCustomer(customerId.value, deleteReason.value.trim() || undefined);
    confirmOpen.value = false;

    if (!result.deleted) {
      notify(
        result.already_deleted?.length
          ? 'That customer was already deleted'
          : `Customer ${customerId.value} was not found`,
        'error',
        { autoClose: 4000 },
      );
      return
    }

    // The profile 404s once removed, so leave before the page refetches anything.
    notify(
      `Permanently deleted ${displayName.value} from the database`,
      'success',
      { autoClose: 5000 },
    );
    await customerStore.fetchPortfolio();
    router.push({ name: 'MyCustomers' });
  } catch (e) {
    notify(e.message || 'Delete failed', 'error', { autoClose: 6000 });
  } finally {
    deleting.value = false;
  }
}
function logAction() {
  const entry = recordAction({
    type: nba.value.title,
    customerId: customerId.value,
    customerName: displayName.value,
    detail: nba.value.rationale,
    meta: { confidence: nba.value.confidence, source: nba.value.source },
  });
  actionLog.value = [entry, ...actionLog.value];
  notify(`Action logged for ${displayName.value}`, 'success', { autoClose: 2500 });
}

function dismissAction() {
  nbaDismissed.value = true;
  recordAction({
    type: 'Recommendation Dismissed',
    customerId: customerId.value,
    customerName: displayName.value,
    detail: `Dismissed "${nba.value.title}" — RM discretion.`,
  });
  notify('Recommendation dismissed', 'info', { autoClose: 2500 });
}

// ── Effects ────────────────────────────────────────────────────
/**
 * Load everything the page shows for one customer.
 *
 * Called on mount AND on a change of `route.params.id`, so bouncing between two
 * profiles (or back into a cached history entry) cannot leave stale identity
 * facts on screen. Before this, only `onMounted` ran — the header kept the
 * previous customer's data whenever the component was reused.
 */
async function loadProfilePage() {
  loading.value = true;
  profileError.value = '';

  const id = customerId.value;
  if (!id) {
    loading.value = false;
    return
  }

  actionLog.value = getActionLog();

  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchCustomerFeatures(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
    hydrateLogFromServer(50).then(() => { actionLog.value = getActionLog(); }),
    // Identity header (account number, NRC, tenure, assigned RM, health).
    // A 404 resolves to null rather than failing the whole page.
    fetchCustomerProfile(id)
      .then((data) => {
        profile.value = data;
        if (data == null) {
          profileError.value =
            'No identity record was found for this customer, so the details below '
            + 'come from the last snapshot instead of the customer master record.';
        }
      })
      .catch((e) => {
        // Swallowing this left the page silently rendering snapshot fallbacks
        // ("Customer 00123", "Not on file") whenever the master read broke —
        // which is exactly what made saved edits look like they were ignored.
        console.warn('customer profile header failed:', e.message);
        profile.value = null;
        profileError.value = e.message
          || 'The customer master record could not be read.';
      })
  ]);

  localState.value = getCustomerState(id);
  loading.value = false;

  await Promise.allSettled([
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/insights/reason-codes/${id}`, { params: { as_of_date: snapshotStore.asOfDate } });
        reasonCodes.value = data.reason_codes || [];
      } catch (e) { console.warn('reason-codes failed:', e.message); }
    })(),
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/recommendations/${id}`, { params: { as_of_date: snapshotStore.asOfDate } });
        recommendations.value = data.recommendations || [];
      } catch (e) { console.warn('recommendations failed:', e.message); }
    })(),
  ]);
}

onMounted(loadProfilePage);

// A different id in the same route (profile → profile) must re-read the header.
watch(() => route.params.id, (id, previous) => {
  if (!id || id === previous) return
  loadProfilePage();
});

// Coming back via browser Back/Forward can restore the page from the bfcache
// without re-running onMounted; refetch when it becomes visible again.
function onPageShow(event) {
  if (event?.persisted) loadProfilePage();
}
onMounted(() => window.addEventListener('pageshow', onPageShow));
onBeforeUnmount(() => window.removeEventListener('pageshow', onPageShow));

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[71] || (_cache[71] = createBaseVNode("div", { class: "absolute inset-0 z-0 pointer-events-none dotted-pattern opacity-30" }, null, -1)),
    createBaseVNode("div", _hoisted_2, [
      (!loading.value && profileError.value)
        ? (openBlock(), createElementBlock("div", _hoisted_3, [
            _cache[16] || (_cache[16] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-amber-700" }, "warning", -1)),
            createBaseVNode("div", _hoisted_4, [
              _cache[14] || (_cache[14] = createBaseVNode("p", { class: "font-bold" }, "Identity details are unavailable — showing snapshot data only.", -1)),
              createBaseVNode("p", _hoisted_5, toDisplayString(profileError.value), 1),
              _cache[15] || (_cache[15] = createBaseVNode("p", { class: "mt-0.5 text-amber-800" }, " Account number, ID number, mobile, next of kin and the other master fields will read as \"Not on file\" until this is fixed, even if they were saved successfully. ", -1)),
              createBaseVNode("button", {
                class: "mt-1.5 font-bold underline",
                onClick: loadProfilePage
              }, "Try again")
            ])
          ]))
        : createCommentVNode("", true),
      (loading.value)
        ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            _cache[17] || (_cache[17] = createBaseVNode("div", { class: "mb-6 h-5 bg-white rounded-sm w-1/3 animate-pulse" }, null, -1)),
            createBaseVNode("div", _hoisted_6, [
              (openBlock(), createElementBlock(Fragment, null, renderList(3, (i) => {
                return createBaseVNode("div", {
                  key: i,
                  class: "col-span-12 lg:col-span-4"
                }, [
                  createVNode(_sfc_main$6, { type: "block" })
                ])
              }), 64))
            ]),
            createVNode(_sfc_main$6, { type: "block" })
          ], 64))
        : (!customerId.value || isEmpty.value)
          ? (openBlock(), createElementBlock("div", _hoisted_7, [
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "w-16 h-16 bg-amber-50 border border-amber-200 rounded-none flex items-center justify-center mb-4" }, [
                createBaseVNode("span", { class: "material-symbols-outlined text-amber-600 text-[32px]" }, "person_off")
              ], -1)),
              _cache[20] || (_cache[20] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-2" }, "Customer Not Found", -1)),
              _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-xs text-gray-500 max-w-md" }, "No profile is available for this customer.", -1)),
              createVNode(_component_router_link, {
                to: "/dashboard/customers",
                class: "mt-6 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-xs font-mono font-bold tracking-widest uppercase rounded-none py-2.5 px-5 transition-all"
              }, {
                default: withCtx(() => [...(_cache[18] || (_cache[18] = [
                  createTextVNode("Back to My Customers", -1)
                ]))]),
                _: 1
              })
            ]))
          : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
              (bozAlert.value)
                ? (openBlock(), createElementBlock("div", _hoisted_8, [
                    _cache[24] || (_cache[24] = createBaseVNode("span", { class: "material-symbols-outlined text-absa-inspire mt-0.5" }, "warning", -1)),
                    createBaseVNode("div", null, [
                      _cache[23] || (_cache[23] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-inspire" }, "URGENT: Account approaching 10-year dormancy (BOZ Transfer Rule)", -1)),
                      createBaseVNode("p", _hoisted_9, [
                        createTextVNode("This account has been inactive for " + toDisplayString(features.value?.days_since_last_txn) + " days. Funds are at risk of being transferred to BOZ in ", 1),
                        createBaseVNode("span", _hoisted_10, toDisplayString(bozRemainingText.value), 1),
                        _cache[22] || (_cache[22] = createTextVNode(". Immediate client contact is required to prevent deposit loss.", -1))
                      ]),
                      createBaseVNode("button", {
                        onClick: _cache[0] || (_cache[0] = $event => {engagementToEdit.value = null; showEngagementModal.value = true;}),
                        class: "mt-2 bg-transparent text-red-600 border border-red-600 hover:bg-red-50 px-3 py-1.5 text-[10px] font-mono font-bold rounded-none uppercase tracking-widest transition-all"
                      }, "Log Outreach")
                    ])
                  ]))
                : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", null, [
                  createBaseVNode("div", _hoisted_12, [
                    createVNode(_component_router_link, {
                      to: "/dashboard/portfolio",
                      class: "hover:text-absa-passion"
                    }, {
                      default: withCtx(() => [...(_cache[25] || (_cache[25] = [
                        createTextVNode("Home", -1)
                      ]))]),
                      _: 1
                    }),
                    _cache[27] || (_cache[27] = createBaseVNode("span", null, "/", -1)),
                    createVNode(_component_router_link, {
                      to: "/dashboard/customers",
                      class: "hover:text-absa-passion"
                    }, {
                      default: withCtx(() => [...(_cache[26] || (_cache[26] = [
                        createTextVNode("My Customers", -1)
                      ]))]),
                      _: 1
                    }),
                    _cache[28] || (_cache[28] = createBaseVNode("span", null, "/", -1)),
                    createBaseVNode("span", _hoisted_13, toDisplayString(displayName.value) + " (ID: " + toDisplayString(customerId.value) + ")", 1)
                  ]),
                  createBaseVNode("p", _hoisted_14, [
                    createTextVNode(" Snapshot " + toDisplayString(fmtDate(profile.value?.snapshot_date || computedAt.value)) + " ", 1),
                    (stateSince.value)
                      ? (openBlock(), createElementBlock("span", _hoisted_15, " · Lifecycle state since " + toDisplayString(fmtDate(stateSince.value)), 1))
                      : createCommentVNode("", true)
                  ])
                ]),
                createBaseVNode("div", _hoisted_16, [
                  createBaseVNode("a", {
                    href: coreBankingUrl.value,
                    target: "_blank",
                    rel: "noopener",
                    class: "px-4 py-2 bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 rounded-none flex items-center gap-2 transition-all text-xs font-mono font-bold uppercase tracking-widest"
                  }, [...(_cache[29] || (_cache[29] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "open_in_new", -1),
                    createTextVNode(" View in Core Banking ", -1)
                  ]))], 8, _hoisted_17),
                  createVNode(_component_router_link, {
                    to: `/dashboard/customer/${customerId.value}`,
                    class: "px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-none hover:border-absa-passion hover:text-absa-passion transition-all text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2"
                  }, {
                    default: withCtx(() => [...(_cache[30] || (_cache[30] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "analytics", -1),
                      createTextVNode(" Full Analytics ", -1)
                    ]))]),
                    _: 1
                  }, 8, ["to"]),
                  createBaseVNode("button", {
                    class: "px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-none hover:border-absa-passion hover:text-absa-passion transition-all text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2",
                    onClick: copyId
                  }, [...(_cache[31] || (_cache[31] = [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "content_copy", -1),
                    createTextVNode(" Copy ID ", -1)
                  ]))]),
                  (canDelete.value)
                    ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "px-4 py-2 bg-transparent text-red-600 border border-red-200 rounded-none hover:bg-red-50 hover:border-red-400 transition-all text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2",
                        disabled: deleting.value,
                        onClick: askDelete
                      }, [...(_cache[32] || (_cache[32] = [
                        createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "delete", -1),
                        createTextVNode(" Delete customer ", -1)
                      ]))], 8, _hoisted_18))
                    : createCommentVNode("", true)
                ])
              ]),
              createBaseVNode("section", _hoisted_19, [
                _cache[38] || (_cache[38] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_20, [
                  createBaseVNode("div", _hoisted_21, [
                    createBaseVNode("div", _hoisted_22, [
                      createBaseVNode("div", {
                        class: "w-16 h-16 rounded-none border border-white/20 shadow-inner flex items-center justify-center text-white text-xl font-bold font-mono shrink-0",
                        style: normalizeStyle({ background: stateColor.value })
                      }, toDisplayString(initials.value), 5),
                      createBaseVNode("div", _hoisted_23, [
                        createBaseVNode("div", _hoisted_24, [
                          createBaseVNode("span", _hoisted_25, toDisplayString(customerId.value), 1),
                          createVNode(_sfc_main$4, { state: state.value }, null, 8, ["state"]),
                          (clientTier.value)
                            ? (openBlock(), createElementBlock("span", _hoisted_26, toDisplayString(clientTier.value), 1))
                            : createCommentVNode("", true)
                        ]),
                        createBaseVNode("h1", _hoisted_27, toDisplayString(displayName.value), 1),
                        createBaseVNode("p", _hoisted_28, [
                          (ageText.value)
                            ? (openBlock(), createElementBlock("span", _hoisted_29, toDisplayString(ageText.value) + " · ", 1))
                            : createCommentVNode("", true),
                          createTextVNode(" Profile snapshot " + toDisplayString(fmtDate(profile.value?.snapshot_date || computedAt.value)), 1)
                        ])
                      ])
                    ]),
                    createBaseVNode("dl", _hoisted_30, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(detailFields.value, (f) => {
                        return (openBlock(), createElementBlock("div", {
                          key: f.label
                        }, [
                          createBaseVNode("dt", _hoisted_31, toDisplayString(f.label), 1),
                          createBaseVNode("dd", _hoisted_32, toDisplayString(f.value), 1)
                        ]))
                      }), 128))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_33, [
                    createBaseVNode("div", _hoisted_34, [
                      _cache[33] || (_cache[33] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Account Number", -1)),
                      createBaseVNode("p", {
                        class: normalizeClass(["mt-1 text-sm font-bold font-mono break-all", accountNumber.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                      }, toDisplayString(accountNumber.value || 'Not on file'), 3),
                      createBaseVNode("p", _hoisted_35, toDisplayString(accountSub.value), 1)
                    ]),
                    createBaseVNode("div", _hoisted_36, [
                      _cache[34] || (_cache[34] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "ID Number (NRC)", -1)),
                      createBaseVNode("p", {
                        class: normalizeClass(["mt-1 text-sm font-bold font-mono break-all", nationalId.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                      }, toDisplayString(nationalId.value || 'Not on file'), 3),
                      createBaseVNode("p", _hoisted_37, toDisplayString(nationalId.value ? 'Verified identifier' : 'Awaiting source feed'), 1)
                    ]),
                    createBaseVNode("div", _hoisted_38, [
                      _cache[35] || (_cache[35] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Tenure", -1)),
                      createBaseVNode("p", {
                        class: normalizeClass(["mt-1 text-sm font-bold", tenureText.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                      }, toDisplayString(tenureText.value || 'Not available'), 3),
                      createBaseVNode("p", _hoisted_39, toDisplayString(tenureSub.value || 'Customer since date missing'), 1)
                    ]),
                    createBaseVNode("div", _hoisted_40, [
                      _cache[36] || (_cache[36] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Assigned RM", -1)),
                      createBaseVNode("p", {
                        class: normalizeClass(["mt-1 text-sm font-bold", assignedRm.value ? 'text-absa-enrich' : 'text-gray-400 font-normal italic'])
                      }, toDisplayString(assignedRm.value || 'Unassigned'), 3),
                      createBaseVNode("p", _hoisted_41, toDisplayString(assignedRmSub.value), 1)
                    ]),
                    createBaseVNode("div", _hoisted_42, [
                      _cache[37] || (_cache[37] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Health Score", -1)),
                      createBaseVNode("div", _hoisted_43, [
                        createBaseVNode("span", {
                          class: "text-lg font-bold font-mono leading-none",
                          style: normalizeStyle({ color: hasHealth.value ? ringColor.value : '#9ca3af' })
                        }, toDisplayString(hasHealth.value ? Math.round(ringValue.value) : '—'), 5),
                        (hasHealth.value)
                          ? (openBlock(), createElementBlock("span", _hoisted_44, "/ 100"))
                          : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_45, [
                        createBaseVNode("div", {
                          class: "h-full rounded-none transition-all",
                          style: normalizeStyle({ width: (hasHealth.value ? ringValue.value : 0) + '%', background: ringColor.value })
                        }, null, 4)
                      ]),
                      createBaseVNode("p", {
                        class: "text-[11px] font-semibold mt-1",
                        style: normalizeStyle({ color: hasHealth.value ? ringColor.value : '#9ca3af' })
                      }, toDisplayString(healthTileLabel.value), 5)
                    ])
                  ])
                ])
              ]),
              createBaseVNode("div", _hoisted_46, [
                createBaseVNode("section", _hoisted_47, [
                  _cache[41] || (_cache[41] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_48, [
                    createBaseVNode("div", _hoisted_49, [
                      _cache[39] || (_cache[39] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                        createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion rounded-none" }),
                        createBaseVNode("h2", { class: "text-xs font-bold font-display uppercase tracking-tight text-gray-900" }, "Predictive Insights")
                      ], -1)),
                      (profile.value?.snapshot_date || computedAt.value)
                        ? (openBlock(), createElementBlock("span", _hoisted_50, " Updated " + toDisplayString(fmtDate(profile.value?.snapshot_date || computedAt.value)), 1))
                        : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", _hoisted_51, [
                      createBaseVNode("div", _hoisted_52, [
                        (openBlock(), createElementBlock("svg", {
                          width: RING_SIZE,
                          height: RING_SIZE,
                          viewBox: `0 0 ${RING_SIZE} ${RING_SIZE}`,
                          role: "img",
                          "aria-label": `AI health score ${hasHealth.value ? Math.round(ringValue.value) : 'unavailable'}`
                        }, [
                          createBaseVNode("circle", {
                            cx: RING_SIZE / 2,
                            cy: RING_SIZE / 2,
                            r: ringRadius.value,
                            fill: "none",
                            stroke: "#e9e7e7",
                            "stroke-width": RING_STROKE
                          }, null, 8, _hoisted_54),
                          (hasHealth.value)
                            ? (openBlock(), createElementBlock("circle", {
                                key: 0,
                                cx: RING_SIZE / 2,
                                cy: RING_SIZE / 2,
                                r: ringRadius.value,
                                fill: "none",
                                stroke: ringColor.value,
                                "stroke-width": RING_STROKE,
                                "stroke-linecap": "round",
                                "stroke-dasharray": ringCircumference.value,
                                "stroke-dashoffset": ringDashOffset.value,
                                transform: `rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`,
                                style: {"transition":"stroke-dashoffset 600ms ease"}
                              }, null, 8, _hoisted_55))
                            : createCommentVNode("", true),
                          createBaseVNode("text", {
                            x: RING_SIZE / 2,
                            y: RING_SIZE / 2 - 2,
                            "text-anchor": "middle",
                            "dominant-baseline": "middle",
                            fill: hasHealth.value ? ringColor.value : '#9ca3af',
                            "font-size": RING_SIZE * 0.26,
                            "font-weight": "700"
                          }, toDisplayString(hasHealth.value ? Math.round(ringValue.value) : '—'), 9, _hoisted_56),
                          createBaseVNode("text", {
                            x: RING_SIZE / 2,
                            y: RING_SIZE / 2 + RING_SIZE * 0.17,
                            "text-anchor": "middle",
                            "dominant-baseline": "middle",
                            fill: hasHealth.value ? ringColor.value : '#9ca3af',
                            "font-size": RING_SIZE * 0.085,
                            "font-weight": "700",
                            "letter-spacing": "0.5"
                          }, toDisplayString(ringTierLabel.value.toUpperCase()), 9, _hoisted_57)
                        ], 8, _hoisted_53)),
                        _cache[40] || (_cache[40] = createBaseVNode("span", { class: "text-[10px] text-gray-400 mt-1" }, "AI Health Score", -1))
                      ]),
                      createBaseVNode("div", _hoisted_58, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(insightMetrics.value, (m) => {
                          return (openBlock(), createElementBlock("div", {
                            key: m.label
                          }, [
                            createBaseVNode("div", _hoisted_59, [
                              createBaseVNode("span", _hoisted_60, toDisplayString(m.label), 1),
                              createBaseVNode("span", {
                                class: "font-bold",
                                style: normalizeStyle({ color: m.color })
                              }, toDisplayString(m.value), 5)
                            ]),
                            createBaseVNode("div", _hoisted_61, [
                              createBaseVNode("div", {
                                class: "h-full rounded-none",
                                style: normalizeStyle({ width: m.pct + '%', background: m.color })
                              }, null, 4)
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createBaseVNode("section", _hoisted_62, [
                  _cache[43] || (_cache[43] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_63, [
                    _cache[42] || (_cache[42] = createBaseVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                      createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion rounded-none" }),
                      createBaseVNode("h2", { class: "text-xs font-bold font-display uppercase tracking-tight text-gray-900" }, "Key Risk Drivers")
                    ], -1)),
                    (riskDrivers.value.length)
                      ? (openBlock(), createElementBlock("div", _hoisted_64, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(riskDrivers.value, (d) => {
                            return (openBlock(), createElementBlock("div", {
                              key: d.label
                            }, [
                              createBaseVNode("div", _hoisted_65, [
                                createBaseVNode("span", _hoisted_66, toDisplayString(d.label), 1),
                                createBaseVNode("span", {
                                  class: "text-[11px] font-bold font-mono",
                                  style: normalizeStyle({ color: d.color })
                                }, toDisplayString(d.value), 5)
                              ]),
                              createBaseVNode("div", _hoisted_67, [
                                createBaseVNode("div", {
                                  class: "h-full rounded-none",
                                  style: normalizeStyle({ width: d.pct + '%', background: d.color })
                                }, null, 4)
                              ]),
                              createBaseVNode("p", _hoisted_68, toDisplayString(d.detail), 1)
                            ]))
                          }), 128))
                        ]))
                      : (openBlock(), createElementBlock("p", _hoisted_69, "No material risk drivers detected for this customer."))
                  ])
                ])
              ]),
              createBaseVNode("section", _hoisted_70, [
                _cache[45] || (_cache[45] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                createBaseVNode("div", _hoisted_71, [
                  createBaseVNode("div", _hoisted_72, [
                    _cache[44] || (_cache[44] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                      createBaseVNode("div", { class: "w-1 h-3.5 bg-absa-passion rounded-none" }),
                      createBaseVNode("h2", { class: "text-xs font-bold font-display uppercase tracking-tight text-gray-900" }, "Lifecycle Journey (12 Months)")
                    ], -1)),
                    createBaseVNode("span", _hoisted_73, toDisplayString(journeyNodes.value.length) + " snapshots", 1)
                  ]),
                  (journeyNodes.value.length)
                    ? (openBlock(), createElementBlock("div", _hoisted_74, [
                        createBaseVNode("div", _hoisted_75, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(journeyNodes.value, (n, i) => {
                            return (openBlock(), createElementBlock(Fragment, { key: i }, [
                              createBaseVNode("div", _hoisted_76, [
                                createBaseVNode("div", {
                                  class: "w-3.5 h-3.5 rounded-none border-2",
                                  style: normalizeStyle({ borderColor: n.color, background: n.isCurrent ? n.color : '#ffffff' })
                                }, null, 4),
                                createBaseVNode("div", {
                                  class: "text-[11px] font-bold mt-2",
                                  style: normalizeStyle({ color: n.color })
                                }, toDisplayString(n.isCurrent ? 'Current' : n.when), 5),
                                createBaseVNode("div", _hoisted_77, toDisplayString(n.label), 1)
                              ]),
                              (i < journeyNodes.value.length - 1)
                                ? (openBlock(), createElementBlock("div", {
                                    key: 0,
                                    class: "flex-1 h-[2px] mt-2",
                                    style: normalizeStyle({ background: n.color })
                                  }, null, 4))
                                : createCommentVNode("", true)
                            ], 64))
                          }), 128))
                        ])
                      ]))
                    : (openBlock(), createElementBlock("p", _hoisted_78, "No lifecycle history recorded for this customer."))
                ])
              ]),
              createBaseVNode("div", _hoisted_79, [
                createBaseVNode("section", _hoisted_80, [
                  createBaseVNode("div", _hoisted_81, [
                    createBaseVNode("span", _hoisted_82, "Priority " + toDisplayString(nba.value.priority), 1),
                    (nba.value.confidence != null)
                      ? (openBlock(), createElementBlock("span", _hoisted_83, " AI Confidence " + toDisplayString(nba.value.confidence) + "% ", 1))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_84, [
                    createBaseVNode("div", _hoisted_85, [
                      createBaseVNode("span", _hoisted_86, toDisplayString(nba.value.icon), 1)
                    ]),
                    createBaseVNode("div", _hoisted_87, [
                      createBaseVNode("h2", _hoisted_88, toDisplayString(nba.value.title), 1),
                      createBaseVNode("p", _hoisted_89, "Recommended by " + toDisplayString(nba.value.source), 1)
                    ])
                  ]),
                  createBaseVNode("p", _hoisted_90, toDisplayString(nba.value.rationale), 1),
                  createBaseVNode("div", _hoisted_91, [
                    createBaseVNode("button", {
                      disabled: nbaDismissed.value,
                      class: "flex-1 bg-white text-absa-passion border border-white hover:bg-gray-100 text-xs font-mono font-bold tracking-widest uppercase rounded-none py-2 px-3 transition-all flex items-center justify-center gap-2 disabled:opacity-50",
                      onClick: logAction
                    }, [...(_cache[46] || (_cache[46] = [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "call", -1),
                      createTextVNode(" Log Action ", -1)
                    ]))], 8, _hoisted_92),
                    createBaseVNode("button", {
                      disabled: nbaDismissed.value,
                      class: "flex-1 bg-transparent text-white border border-white/30 hover:border-white text-xs font-mono font-bold tracking-widest uppercase rounded-none py-2 px-3 transition-all disabled:opacity-50",
                      onClick: dismissAction
                    }, toDisplayString(nbaDismissed.value ? 'Dismissed' : 'Dismiss'), 9, _hoisted_93)
                  ])
                ]),
                createBaseVNode("section", _hoisted_94, [
                  _cache[69] || (_cache[69] = createBaseVNode("div", { class: "absolute inset-0 dotted-pattern opacity-[0.03] pointer-events-none" }, null, -1)),
                  createBaseVNode("div", _hoisted_95, [
                    createBaseVNode("div", _hoisted_96, [
                      createBaseVNode("button", {
                        class: normalizeClass(["text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all", activeTab.value === 'interactions' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700']),
                        onClick: _cache[1] || (_cache[1] = $event => (activeTab.value = 'interactions'))
                      }, " Interaction History ", 2),
                      createBaseVNode("button", {
                        class: normalizeClass(["text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all flex items-center gap-1", activeTab.value === 'omni' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700']),
                        onClick: _cache[2] || (_cache[2] = $event => (activeTab.value = 'omni'))
                      }, [...(_cache[47] || (_cache[47] = [
                        createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "headset_mic", -1),
                        createTextVNode(" Omnichannel ", -1)
                      ]))], 2),
                      createBaseVNode("button", {
                        class: normalizeClass(["text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all", activeTab.value === 'nok' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700']),
                        onClick: _cache[3] || (_cache[3] = $event => (activeTab.value = 'nok'))
                      }, " Next of Kin ", 2),
                      createBaseVNode("button", {
                        class: normalizeClass(["text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all", activeTab.value === 'performance' ? 'text-absa-passion border-b-2 border-absa-passion' : 'text-gray-500 hover:text-gray-700']),
                        onClick: _cache[4] || (_cache[4] = $event => (activeTab.value = 'performance'))
                      }, " Performance ", 2),
                      createBaseVNode("div", _hoisted_97, [
                        createBaseVNode("button", {
                          class: "bg-transparent text-absa-passion border border-absa-passion hover:bg-absa-passion/10 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-none transition-all flex items-center gap-1",
                          onClick: _cache[5] || (_cache[5] = $event => {engagementToEdit.value = null; showEngagementModal.value = true;})
                        }, [...(_cache[48] || (_cache[48] = [
                          createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "add", -1),
                          createTextVNode(" Log Engagement ", -1)
                        ]))])
                      ])
                    ]),
                    (activeTab.value === 'interactions')
                      ? (openBlock(), createElementBlock("div", _hoisted_98, [
                          createBaseVNode("div", _hoisted_99, [
                            createBaseVNode("button", {
                              onClick: _cache[6] || (_cache[6] = $event => (showAllHistoryModal.value = true)),
                              class: "border border-gray-200 rounded-none px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-gray-600 bg-white outline-none hover:border-absa-passion hover:text-absa-passion transition-colors"
                            }, " View All ")
                          ]),
                          (filteredHistory.value.length)
                            ? (openBlock(), createElementBlock("div", _hoisted_100, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(filteredHistory.value, (h) => {
                                  return (openBlock(), createElementBlock("div", {
                                    key: h.id,
                                    class: "flex gap-3 group relative"
                                  }, [
                                    createBaseVNode("div", _hoisted_101, [
                                      createBaseVNode("div", {
                                        class: "w-2 h-2 rounded-none",
                                        style: normalizeStyle({ background: unref(tierColor)('power') })
                                      }, null, 4),
                                      _cache[49] || (_cache[49] = createBaseVNode("div", { class: "w-[1px] flex-1 bg-gray-200 mt-1" }, null, -1))
                                    ]),
                                    createBaseVNode("div", _hoisted_102, [
                                      createBaseVNode("div", _hoisted_103, [
                                        createBaseVNode("div", null, [
                                          createBaseVNode("div", _hoisted_104, [
                                            createBaseVNode("span", _hoisted_105, toDisplayString(h.title), 1),
                                            createBaseVNode("span", _hoisted_106, toDisplayString(fmtDate(h.at)), 1)
                                          ]),
                                          createBaseVNode("p", _hoisted_107, toDisplayString(h.detail), 1),
                                          (h.actor)
                                            ? (openBlock(), createElementBlock("span", _hoisted_108, "RM: " + toDisplayString(h.actor), 1))
                                            : createCommentVNode("", true)
                                        ]),
                                        createBaseVNode("div", _hoisted_109, [
                                          createBaseVNode("button", {
                                            onClick: $event => (editEngagement(h)),
                                            class: "p-1 text-gray-400 hover:text-absa-passion transition-colors",
                                            title: "Edit"
                                          }, [...(_cache[50] || (_cache[50] = [
                                            createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "edit", -1)
                                          ]))], 8, _hoisted_110),
                                          createBaseVNode("button", {
                                            onClick: $event => (promptDeleteEngagement(h)),
                                            class: "p-1 text-gray-400 hover:text-red-600 transition-colors",
                                            title: "Delete"
                                          }, [...(_cache[51] || (_cache[51] = [
                                            createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "delete", -1)
                                          ]))], 8, _hoisted_111)
                                        ])
                                      ]),
                                      (h.meta && (h.meta.outcome || h.meta.dormancy_reason || h.meta.cross_sell_details || h.meta.branch_to_visit))
                                        ? (openBlock(), createElementBlock("div", _hoisted_112, [
                                            (h.meta.outcome)
                                              ? (openBlock(), createElementBlock("div", _hoisted_113, [
                                                  _cache[52] || (_cache[52] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Outcome:", -1)),
                                                  createTextVNode(" " + toDisplayString(h.meta.outcome), 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (h.meta.dormancy_reason)
                                              ? (openBlock(), createElementBlock("div", _hoisted_114, [
                                                  _cache[53] || (_cache[53] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Reason:", -1)),
                                                  createTextVNode(" " + toDisplayString(h.meta.dormancy_reason), 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (h.meta.cross_sell_details)
                                              ? (openBlock(), createElementBlock("div", _hoisted_115, [
                                                  _cache[54] || (_cache[54] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Cross Sell:", -1)),
                                                  createTextVNode(" " + toDisplayString(h.meta.cross_sell_details), 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (h.meta.recommendation)
                                              ? (openBlock(), createElementBlock("div", _hoisted_116, [
                                                  _cache[55] || (_cache[55] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Recommendation:", -1)),
                                                  createTextVNode(" " + toDisplayString(h.meta.recommendation), 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (h.meta.customer_experience)
                                              ? (openBlock(), createElementBlock("div", _hoisted_117, [
                                                  _cache[56] || (_cache[56] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Experience:", -1)),
                                                  createTextVNode(" " + toDisplayString(h.meta.customer_experience), 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (h.meta.branch_to_visit)
                                              ? (openBlock(), createElementBlock("div", _hoisted_118, [
                                                  _cache[57] || (_cache[57] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Branch:", -1)),
                                                  createTextVNode(" " + toDisplayString(h.meta.branch_to_visit), 1)
                                                ]))
                                              : createCommentVNode("", true),
                                            (h.meta.customer_feedback)
                                              ? (openBlock(), createElementBlock("div", _hoisted_119, [
                                                  _cache[58] || (_cache[58] = createBaseVNode("span", { class: "font-bold text-gray-500" }, "Feedback:", -1)),
                                                  createTextVNode(" " + toDisplayString(h.meta.customer_feedback), 1)
                                                ]))
                                              : createCommentVNode("", true)
                                          ]))
                                        : createCommentVNode("", true)
                                    ])
                                  ]))
                                }), 128))
                              ]))
                            : (openBlock(), createElementBlock("p", _hoisted_120, "No actions logged for this customer yet."))
                        ]))
                      : createCommentVNode("", true),
                    (activeTab.value === 'omni')
                      ? (openBlock(), createElementBlock("div", _hoisted_121, [
                          createBaseVNode("div", _hoisted_122, [
                            createBaseVNode("div", _hoisted_123, [
                              _cache[60] || (_cache[60] = createBaseVNode("div", { class: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 animate-pulse" }, [
                                createBaseVNode("span", { class: "material-symbols-outlined" }, "call")
                              ], -1)),
                              createBaseVNode("div", null, [
                                _cache[59] || (_cache[59] = createBaseVNode("p", { class: "text-xs font-bold text-blue-900 uppercase tracking-widest" }, "Incoming Call - Cisco Finesse", -1)),
                                createBaseVNode("p", _hoisted_124, toDisplayString(profile.value?.mobile_number || '0970000000'), 1)
                              ])
                            ]),
                            createBaseVNode("div", _hoisted_125, [
                              _cache[61] || (_cache[61] = createBaseVNode("p", { class: "text-[10px] font-bold uppercase text-blue-600" }, "Priority Tier", -1)),
                              createBaseVNode("p", _hoisted_126, toDisplayString(profile.value?.market_segment || 'Standard') + " (Auto-matched via ANI)", 1),
                              _cache[62] || (_cache[62] = createBaseVNode("p", { class: "text-[10px] text-blue-700 mt-1" }, [
                                createTextVNode("Linked Cases: "),
                                createBaseVNode("span", { class: "font-mono" }, "CAS-00124")
                              ], -1))
                            ]),
                            _cache[63] || (_cache[63] = createBaseVNode("div", { class: "flex gap-2" }, [
                              createBaseVNode("button", { class: "bg-blue-600 text-white px-3 py-1.5 rounded-sm text-xs font-bold hover:bg-blue-700" }, "Answer"),
                              createBaseVNode("button", { class: "bg-red-500 text-white px-3 py-1.5 rounded-sm text-xs font-bold hover:bg-red-600" }, "Reject")
                            ], -1))
                          ]),
                          _cache[64] || (_cache[64] = createStaticVNode("<div class=\"grid grid-cols-2 gap-4\" data-v-798b5823><div class=\"border border-gray-200 rounded-sm\" data-v-798b5823><div class=\"bg-gray-50 border-b border-gray-200 px-3 py-2\" data-v-798b5823><h4 class=\"text-xs font-bold text-absa-enrich\" data-v-798b5823>Active Tickets / Cases</h4></div><div class=\"p-3\" data-v-798b5823><div class=\"flex justify-between items-center bg-gray-50 p-2 rounded-sm border border-gray-100 mb-2\" data-v-798b5823><div data-v-798b5823><p class=\"text-[11px] font-bold text-absa-enrich\" data-v-798b5823>CAS-00124 <span class=\"bg-red-100 text-red-600 px-1 rounded-sm text-[9px]\" data-v-798b5823>&gt; 2 Days</span></p><p class=\"text-[10px] text-gray-500\" data-v-798b5823>Unresolved charge dispute</p></div><button class=\"text-[10px] bg-white border border-gray-300 px-2 py-1 rounded-sm hover:bg-gray-50\" data-v-798b5823>Open</button></div><button class=\"w-full text-[11px] text-absa-passion font-bold border border-absa-passion py-1.5 rounded-sm hover:bg-absa-passion/5\" data-v-798b5823> + Create New Ticket </button></div></div><div class=\"border border-gray-200 rounded-sm\" data-v-798b5823><div class=\"bg-gray-50 border-b border-gray-200 px-3 py-2\" data-v-798b5823><h4 class=\"text-xs font-bold text-absa-enrich\" data-v-798b5823>Quick Responses (SMS/WhatsApp)</h4></div><div class=\"p-3 space-y-2\" data-v-798b5823><button class=\"w-full text-left bg-gray-50 p-2 border border-gray-200 rounded-sm hover:border-gray-300 group\" data-v-798b5823><p class=\"text-[11px] font-bold text-absa-enrich\" data-v-798b5823>Holding Response Template</p><p class=\"text-[10px] text-gray-500 mt-0.5 group-hover:text-gray-700\" data-v-798b5823>&quot;Your query CAS-00124 is taking longer than expected...&quot;</p></button><button class=\"w-full text-left bg-gray-50 p-2 border border-gray-200 rounded-sm hover:border-gray-300 group\" data-v-798b5823><p class=\"text-[11px] font-bold text-absa-enrich\" data-v-798b5823>Resolution Template</p><p class=\"text-[10px] text-gray-500 mt-0.5 group-hover:text-gray-700\" data-v-798b5823>&quot;Your query CAS-00124 has been resolved. Please contact...&quot;</p></button></div></div></div>", 1))
                        ]))
                      : createCommentVNode("", true),
                    (activeTab.value === 'nok')
                      ? (openBlock(), createElementBlock("div", _hoisted_127, [
                          (nextOfKin.value)
                            ? (openBlock(), createElementBlock("div", _hoisted_128, [
                                createBaseVNode("div", null, [
                                  _cache[65] || (_cache[65] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Name", -1)),
                                  createBaseVNode("p", _hoisted_129, toDisplayString(nextOfKin.value.name), 1)
                                ]),
                                createBaseVNode("div", null, [
                                  _cache[66] || (_cache[66] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Relationship", -1)),
                                  createBaseVNode("p", _hoisted_130, toDisplayString(nextOfKin.value.relation), 1)
                                ]),
                                createBaseVNode("div", null, [
                                  _cache[67] || (_cache[67] = createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "Phone", -1)),
                                  createBaseVNode("p", _hoisted_131, toDisplayString(nextOfKin.value.phone), 1)
                                ])
                              ]))
                            : (openBlock(), createElementBlock("p", _hoisted_132, "No Next of Kin data available."))
                        ]))
                      : createCommentVNode("", true),
                    (activeTab.value === 'performance')
                      ? (openBlock(), createElementBlock("div", _hoisted_133, [
                          (filteredHistory.value.length)
                            ? (openBlock(), createBlock(_sfc_main$1, {
                                key: 0,
                                customerId: customerId.value,
                                engagementDate: filteredHistory.value[0].at
                              }, null, 8, ["customerId", "engagementDate"]))
                            : (openBlock(), createElementBlock("div", _hoisted_134, [...(_cache[68] || (_cache[68] = [
                                createBaseVNode("span", { class: "material-symbols-outlined text-4xl text-gray-300 mb-2" }, "monitoring", -1),
                                createBaseVNode("p", { class: "text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400" }, "No engagements logged yet", -1)
                              ]))]))
                        ]))
                      : createCommentVNode("", true)
                  ])
                ])
              ])
            ], 64)),
      createVNode(_sfc_main$5, {
        open: confirmOpen.value,
        title: "Delete customer permanently",
        message: `Are you sure you want to permanently delete ${displayName.value} (${customerId.value})?\n\nAll customer records, accounts, cards, loans, transactions, and predictive metrics will be permanently removed from the database.\n\nThis action is irreversible and cannot be undone.`,
        eyebrow: "Permanent delete — cannot be undone",
        "confirm-label": "Delete Permanently",
        "busy-label": "Deleting…",
        busy: deleting.value,
        variant: "danger",
        onConfirm: confirmDelete,
        onCancel: cancelDelete,
        onClose: cancelDelete
      }, {
        body: withCtx(() => [
          createBaseVNode("div", null, [
            _cache[70] || (_cache[70] = createBaseVNode("label", { class: "block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1.5" }, " Reason (optional — stored in the audit trail) ", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((deleteReason).value = $event)),
              type: "text",
              maxlength: "255",
              placeholder: "e.g. duplicate record, customer request, test data",
              class: "w-full border border-gray-300 rounded-sm px-3 py-2 text-xs text-absa-enrich focus:ring-1 focus:ring-absa-passion outline-none",
              onKeydown: withKeys(withModifiers(confirmDelete, ["prevent"]), ["enter"])
            }, null, 40, _hoisted_135), [
              [vModelText, deleteReason.value]
            ])
          ])
        ]),
        _: 1
      }, 8, ["open", "message", "busy"]),
      createVNode(EngagementModal, {
        open: showEngagementModal.value,
        customerId: customerId.value,
        customerName: displayName.value,
        existingEntry: engagementToEdit.value,
        onClose: _cache[8] || (_cache[8] = $event => {showEngagementModal.value = false; engagementToEdit.value = null;}),
        onLogged: _cache[9] || (_cache[9] = payload => engagementToEdit.value ? handleEngagementUpdated(payload) : handleEngagementLogged(payload))
      }, null, 8, ["open", "customerId", "customerName", "existingEntry"]),
      createVNode(AllHistoryModal, {
        open: showAllHistoryModal.value,
        history: historyEntries.value,
        customerId: customerId.value,
        customerName: displayName.value,
        onClose: _cache[10] || (_cache[10] = $event => (showAllHistoryModal.value = false)),
        onEdit: _cache[11] || (_cache[11] = h => { showAllHistoryModal.value = false; editEngagement(h); }),
        onDelete: _cache[12] || (_cache[12] = h => { showAllHistoryModal.value = false; promptDeleteEngagement(h); })
      }, null, 8, ["open", "history", "customerId", "customerName"]),
      createVNode(_sfc_main$5, {
        open: showDeleteEngagementDialog.value,
        title: "Delete Engagement",
        message: "Are you sure you want to delete this engagement log?",
        confirmText: "DELETE",
        confirmColor: "bg-absa-passion hover:bg-absa-power",
        onClose: _cache[13] || (_cache[13] = $event => (showDeleteEngagementDialog.value = false)),
        onConfirm: confirmDeleteEngagement
      }, null, 8, ["open"])
    ])
  ]))
}
}

});
const CustomerProfile = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-798b5823"]]);

export { CustomerProfile as default };
