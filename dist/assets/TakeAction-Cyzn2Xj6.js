import { _ as _export_sfc, i as computed, r as ref, f as onMounted, c as createElementBlock, b as createBaseVNode, A as createTextVNode, t as toDisplayString, j as createCommentVNode, x as withDirectives, L as vModelSelect, a as createStaticVNode, y as vModelText, F as Fragment, e as renderList, u as useRouter, E as useRoute, o as openBlock } from './index-rR_eRHdu.js';
import { u as useCustomerStore } from './customerStore-Dl_Q7G8c.js';
import { n as notify } from './absaExport-CcqpY9wH.js';
import { j as hydrateActionsTakenFromServer, k as saveActionTaken } from './absaActions-DhjJXYSG.js';
import './snapshotStore-40uEPdOz.js';

const _hoisted_1 = { class: "text-on-background w-full p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pt-20 pb-24" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "flex items-center gap-2 text-label-sm text-secondary mt-2" };
const _hoisted_4 = { class: "text-body-md text-secondary mb-6" };
const _hoisted_5 = { class: "bg-white border border-gray-300 shadow-none p-4 mb-6" };
const _hoisted_6 = { class: "space-y-3" };
const _hoisted_7 = { class: "pp-row" };
const _hoisted_8 = { class: "pp-row__value" };
const _hoisted_9 = { class: "pp-row" };
const _hoisted_10 = { class: "pp-row__value" };
const _hoisted_11 = { class: "pp-row" };
const _hoisted_12 = { class: "pp-row__value" };
const _hoisted_13 = {
  key: 0,
  class: "pp-row"
};
const _hoisted_14 = { class: "pp-row__value" };
const _hoisted_15 = { class: "bg-white border border-gray-300 shadow-none p-4" };
const _hoisted_16 = { class: "grid grid-cols-1 md:grid-cols-2 gap-5" };
const _hoisted_17 = { class: "col-span-1 md:col-span-2" };
const _hoisted_18 = ["placeholder"];
const _hoisted_19 = { class: "col-span-1 md:col-span-2" };
const _hoisted_20 = {
  key: 0,
  class: "mt-5 border-l-4 border-[#4CAF50] bg-white-variant p-4"
};
const _hoisted_21 = { class: "text-body-md font-bold text-on-surface" };
const _hoisted_22 = {
  key: 1,
  class: "mt-6"
};
const _hoisted_23 = { class: "space-y-3" };
const _hoisted_24 = { class: "flex items-start justify-between gap-3 mb-1" };
const _hoisted_25 = { class: "text-body-md font-bold text-on-surface" };
const _hoisted_26 = { class: "text-label-sm text-secondary whitespace-nowrap" };
const _hoisted_27 = { class: "flex flex-wrap gap-x-6 gap-y-1 text-label-sm text-secondary mb-1" };
const _hoisted_28 = {
  key: 0,
  class: "text-label-sm text-secondary"
};


const _sfc_main = {
  __name: 'TakeAction',
  setup(__props) {

const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();

const customerId = computed(() => String(route.params.id || ''));
const customer = computed(() => customerStore.selectedCustomer || {});
const customerName = computed(() => customer.value.fullName || ('Customer ' + (customerId.value || '').replace('CUST', '')));

const action = computed(() => {
  try {
    const raw = route.query.action;
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return {}
});

const form = ref({
  channel: 'RM_CALL',
  outcome: 'PENDING',
  actionTaken: '',
  notes: '',
});

const saved = ref(false);
const recordedActions = ref([]);

function goBack() {
  router.push({
    path: `/dashboard/customer/${customerId.value}`,
    query: { from: route.query.from || undefined, page: route.query.page || undefined },
  });
}

function fmtDate(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch { return d }
}

function channelLabel(ch) {
  return {
    RM_CALL: 'RM Call', RM_DIRECT: 'RM Direct', DIGITAL: 'Digital (app/web)',
    MARKETING: 'Marketing', BRANCH: 'Branch Visit',
  }[ch] || ch || '—'
}

function saveAction() {
  if (!form.value.actionTaken.trim()) {
    form.value.actionTaken = action.value.action || action.value.title || 'Customer intervention';
  }
  const entry = {
    ...form.value,
    customer_id: customerId.value,
    recommendation: action.value,
  };
  const list = saveActionTaken(customerId.value, entry);
  recordedActions.value = list;
  saved.value = true;
  notify(`Action recorded for ${customerName.value}`, 'success', { autoClose: 3000 });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(async () => {
  const id = customerId.value;
  if (!id) return
  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    hydrateActionsTakenFromServer(id).then((list) => { recordedActions.value = list; }).catch(() => {}),
  ]);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("button", {
        onClick: goBack,
        class: "flex items-center gap-2 text-body-md font-bold text-[#DC0037] hover:text-[#B50232] transition-colors"
      }, [...(_cache[4] || (_cache[4] = [
        createBaseVNode("svg", {
          class: "w-4 h-4",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24"
        }, [
          createBaseVNode("path", {
            d: "M15 19l-7-7 7-7",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5"
          })
        ], -1),
        createTextVNode(" Back to Customer Profile ", -1)
      ]))]),
      createBaseVNode("div", _hoisted_3, [
        _cache[5] || (_cache[5] = createBaseVNode("span", null, "Dashboard", -1)),
        _cache[6] || (_cache[6] = createBaseVNode("span", null, "/", -1)),
        _cache[7] || (_cache[7] = createBaseVNode("span", null, "Portfolio", -1)),
        _cache[8] || (_cache[8] = createBaseVNode("span", null, "/", -1)),
        _cache[9] || (_cache[9] = createBaseVNode("span", null, "Predictive Lifecycle Ledger", -1)),
        _cache[10] || (_cache[10] = createBaseVNode("span", null, "/", -1)),
        createBaseVNode("span", null, toDisplayString(customerId.value), 1),
        _cache[11] || (_cache[11] = createBaseVNode("span", null, "/", -1)),
        _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-on-surface font-bold" }, "Take Action", -1))
      ])
    ]),
    _cache[27] || (_cache[27] = createBaseVNode("h1", { class: "text-headline-lg font-headline font-semibold text-on-surface mb-1" }, "Take Action", -1)),
    createBaseVNode("p", _hoisted_4, toDisplayString(customerName.value) + " · " + toDisplayString(action.value.title || 'Recommended action'), 1),
    createBaseVNode("div", _hoisted_5, [
      _cache[17] || (_cache[17] = createBaseVNode("h2", { class: "text-headline-md font-headline font-semibold text-on-surface mb-4" }, "Recommended Action", -1)),
      createBaseVNode("div", _hoisted_6, [
        createBaseVNode("div", _hoisted_7, [
          _cache[13] || (_cache[13] = createBaseVNode("span", { class: "pp-row__label" }, "Action", -1)),
          createBaseVNode("span", _hoisted_8, toDisplayString(action.value.action || action.value.title || '—'), 1)
        ]),
        createBaseVNode("div", _hoisted_9, [
          _cache[14] || (_cache[14] = createBaseVNode("span", { class: "pp-row__label" }, "Reason", -1)),
          createBaseVNode("span", _hoisted_10, toDisplayString(action.value.reason || '—'), 1)
        ]),
        createBaseVNode("div", _hoisted_11, [
          _cache[15] || (_cache[15] = createBaseVNode("span", { class: "pp-row__label" }, "Priority", -1)),
          createBaseVNode("span", _hoisted_12, "Priority " + toDisplayString(action.value.priority || '—'), 1)
        ]),
        (action.value.confidence)
          ? (openBlock(), createElementBlock("div", _hoisted_13, [
              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "pp-row__label" }, "Propensity", -1)),
              createBaseVNode("span", _hoisted_14, toDisplayString(action.value.confidence) + "%", 1)
            ]))
          : createCommentVNode("", true)
      ])
    ]),
    createBaseVNode("div", _hoisted_15, [
      _cache[26] || (_cache[26] = createBaseVNode("h2", { class: "text-headline-md font-headline font-semibold text-on-surface mb-4" }, "Record Action", -1)),
      createBaseVNode("div", _hoisted_16, [
        createBaseVNode("div", null, [
          _cache[19] || (_cache[19] = createBaseVNode("label", { class: "pp-label" }, "Channel", -1)),
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.value.channel) = $event)),
            class: "pp-input"
          }, [...(_cache[18] || (_cache[18] = [
            createStaticVNode("<option value=\"RM_CALL\" data-v-2ab05f31>Relationship Manager Call</option><option value=\"RM_DIRECT\" data-v-2ab05f31>RM Direct</option><option value=\"DIGITAL\" data-v-2ab05f31>Digital (app / web)</option><option value=\"MARKETING\" data-v-2ab05f31>Marketing</option><option value=\"BRANCH\" data-v-2ab05f31>Branch Visit</option>", 5)
          ]))], 512), [
            [vModelSelect, form.value.channel]
          ])
        ]),
        createBaseVNode("div", null, [
          _cache[21] || (_cache[21] = createBaseVNode("label", { class: "pp-label" }, "Outcome", -1)),
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.value.outcome) = $event)),
            class: "pp-input"
          }, [...(_cache[20] || (_cache[20] = [
            createBaseVNode("option", { value: "PENDING" }, "Pending", -1),
            createBaseVNode("option", { value: "ACCEPTED" }, "Accepted", -1),
            createBaseVNode("option", { value: "DECLINED" }, "Declined", -1),
            createBaseVNode("option", { value: "NOT_REACHABLE" }, "Not Reachable", -1)
          ]))], 512), [
            [vModelSelect, form.value.outcome]
          ])
        ]),
        createBaseVNode("div", _hoisted_17, [
          _cache[22] || (_cache[22] = createBaseVNode("label", { class: "pp-label" }, "Action Taken", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.actionTaken) = $event)),
            type: "text",
            class: "pp-input",
            placeholder: action.value.action || 'Describe the action taken'
          }, null, 8, _hoisted_18), [
            [vModelText, form.value.actionTaken]
          ])
        ]),
        createBaseVNode("div", _hoisted_19, [
          _cache[23] || (_cache[23] = createBaseVNode("label", { class: "pp-label" }, "Notes", -1)),
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.value.notes) = $event)),
            rows: "3",
            class: "pp-input",
            placeholder: "Outcome notes, customer response, follow-up needed"
          }, null, 512), [
            [vModelText, form.value.notes]
          ])
        ])
      ]),
      (saved.value)
        ? (openBlock(), createElementBlock("div", _hoisted_20, [
            createBaseVNode("p", _hoisted_21, "Action recorded for " + toDisplayString(customerName.value) + ".", 1),
            _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-label-sm text-secondary" }, "Synced to the pilot backend (etl_clean) and stored locally for this pilot.", -1))
          ]))
        : createCommentVNode("", true),
      (recordedActions.value.length > 0)
        ? (openBlock(), createElementBlock("div", _hoisted_22, [
            _cache[25] || (_cache[25] = createBaseVNode("h2", { class: "text-headline-md font-headline font-semibold text-on-surface mb-3" }, "Recorded Actions", -1)),
            createBaseVNode("div", _hoisted_23, [
              (openBlock(true), createElementBlock(Fragment, null, renderList([...recordedActions.value].reverse(), (a, i) => {
                return (openBlock(), createElementBlock("div", {
                  key: a.client_id || i,
                  class: "border border-gray-300 bg-white p-4"
                }, [
                  createBaseVNode("div", _hoisted_24, [
                    createBaseVNode("p", _hoisted_25, toDisplayString(a.actionTaken || 'Action taken'), 1),
                    createBaseVNode("span", _hoisted_26, toDisplayString(fmtDate(a.created_at)), 1)
                  ]),
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("span", null, "Channel: " + toDisplayString(channelLabel(a.channel)), 1),
                    createBaseVNode("span", null, "Outcome: " + toDisplayString(a.outcome || 'PENDING'), 1)
                  ]),
                  (a.notes)
                    ? (openBlock(), createElementBlock("p", _hoisted_28, toDisplayString(a.notes), 1))
                    : createCommentVNode("", true)
                ]))
              }), 128))
            ])
          ]))
        : createCommentVNode("", true),
      createBaseVNode("div", { class: "flex items-center gap-2 mt-6" }, [
        createBaseVNode("button", {
          onClick: saveAction,
          class: "bg-[#DC0037] text-white text-body-md font-bold py-2.5 px-5 shadow-none hover:bg-[#B50232] transition-colors"
        }, "RECORD ACTION"),
        createBaseVNode("button", {
          onClick: goBack,
          class: "border border-gray-300 text-on-surface text-body-md font-bold py-2.5 px-5 hover:bg-white-variant transition-colors"
        }, "CANCEL")
      ])
    ])
  ]))
}
}

};
const TakeAction = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2ab05f31"]]);

export { TakeAction as default };
