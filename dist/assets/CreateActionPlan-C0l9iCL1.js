import { g as _export_sfc, D as computed, r as ref, h as onMounted, o as openBlock, c as createElementBlock, b as createBaseVNode, m as createTextVNode, t as toDisplayString, v as withDirectives, x as vModelText, S as vModelSelect, a as createStaticVNode, l as createCommentVNode, u as useRouter, I as useRoute } from './index-F0Jaczum.js';
import { u as useCustomerStore } from './customerStore-CYbEJoNT.js';
import { u as usePredictionStore } from './predictionStore-YU93sQRm.js';

const _hoisted_1 = { class: "text-on-background w-full p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pt-20 pb-24" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "flex items-center gap-2 text-label-sm text-secondary mt-2" };
const _hoisted_4 = { class: "text-body-md text-secondary mb-6" };
const _hoisted_5 = { class: "grid grid-cols-2 md:grid-cols-5 gap-4 mb-6" };
const _hoisted_6 = { class: "pp-metric" };
const _hoisted_7 = { class: "pp-metric__value" };
const _hoisted_8 = { class: "pp-metric" };
const _hoisted_9 = { class: "pp-metric__value" };
const _hoisted_10 = { class: "pp-metric" };
const _hoisted_11 = { class: "pp-metric__value" };
const _hoisted_12 = { class: "pp-metric" };
const _hoisted_13 = { class: "pp-metric__value" };
const _hoisted_14 = { class: "pp-metric" };
const _hoisted_15 = { class: "pp-metric__value" };
const _hoisted_16 = { class: "bg-white border border-gray-300 shadow-none p-4" };
const _hoisted_17 = { class: "grid grid-cols-1 md:grid-cols-2 gap-5" };
const _hoisted_18 = { class: "col-span-1 md:col-span-2" };
const _hoisted_19 = { class: "col-span-1 md:col-span-2" };
const _hoisted_20 = { class: "col-span-1 md:col-span-2" };
const _hoisted_21 = { class: "col-span-1 md:col-span-2" };
const _hoisted_22 = {
  key: 0,
  class: "mt-5 border-l-4 border-[#4CAF50] bg-white-variant p-4"
};
const _hoisted_23 = { class: "text-body-md font-bold text-on-surface" };


const _sfc_main = {
  __name: 'CreateActionPlan',
  setup(__props) {

const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();

const customerId = computed(() => String(route.params.id || ''));
const customer = computed(() => customerStore.selectedCustomer || {});
const customerName = computed(() => customer.value.fullName || ('Customer ' + (customerId.value || '').replace('CUST', '')));
const state = computed(() => customer.value.state || customer.value._raw?.state || '—');

const healthScore = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  return h?.health_score ?? customer.value.healthScore ?? null
});

const churnProb = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return typeof p === 'number' ? p : p?.churn_probability ?? null
});

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return typeof p === 'object' ? p?.clv_percentile ?? null : null
});

const form = ref({
  title: '',
  priority: '2',
  assignee: '',
  dueDate: '',
  outcome: 'Reactivate customer',
  reason: '',
  action: '',
  notes: '',
});

const saved = ref(false);

function goBack() {
  router.push({
    path: `/dashboard/customer/${customerId.value}`,
    query: { from: route.query.from || undefined, page: route.query.page || undefined },
  });
}

function savePlan() {
  if (!form.value.title) {
    form.value.title = `${state.value === 'DORMANT' ? 'Re-engage' : state.value === 'AT_RISK' ? 'Retain' : 'Review'} ${customerName.value}`;
  }
  if (!form.value.reason && state.value === 'DORMANT') {
    form.value.reason = 'Customer has been inactive for an extended period.';
  }
  if (!form.value.action && state.value === 'DORMANT') {
    form.value.action = 'Contact the customer and identify the reason for inactivity.';
  }

  const key = `action_plans_${customerId.value}`;
  const plans = JSON.parse(localStorage.getItem(key) || '[]');
  plans.push({
    ...form.value,
    customer_id: customerId.value,
    created_at: new Date().toISOString(),
  });
  localStorage.setItem(key, JSON.stringify(plans));
  saved.value = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(async () => {
  const id = customerId.value;
  if (!id) return
  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
  ]);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("button", {
        onClick: goBack,
        class: "flex items-center gap-2 text-body-md font-bold text-[#DC0037] hover:text-[#B50232] transition-colors"
      }, [...(_cache[8] || (_cache[8] = [
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
        _cache[9] || (_cache[9] = createBaseVNode("span", null, "Dashboard", -1)),
        _cache[10] || (_cache[10] = createBaseVNode("span", null, "/", -1)),
        _cache[11] || (_cache[11] = createBaseVNode("span", null, "Portfolio", -1)),
        _cache[12] || (_cache[12] = createBaseVNode("span", null, "/", -1)),
        _cache[13] || (_cache[13] = createBaseVNode("span", null, "Predictive Lifecycle Ledger", -1)),
        _cache[14] || (_cache[14] = createBaseVNode("span", null, "/", -1)),
        createBaseVNode("span", null, toDisplayString(customerId.value), 1),
        _cache[15] || (_cache[15] = createBaseVNode("span", null, "/", -1)),
        _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-on-surface font-bold" }, "Create Action Plan", -1))
      ])
    ]),
    _cache[33] || (_cache[33] = createBaseVNode("h1", { class: "text-headline-lg font-headline font-semibold text-on-surface mb-1" }, "Create Action Plan", -1)),
    createBaseVNode("p", _hoisted_4, "Define the next steps for " + toDisplayString(customerName.value), 1),
    createBaseVNode("div", _hoisted_5, [
      createBaseVNode("div", _hoisted_6, [
        _cache[17] || (_cache[17] = createBaseVNode("span", { class: "pp-metric__label" }, "Customer", -1)),
        createBaseVNode("span", _hoisted_7, toDisplayString(customerName.value), 1)
      ]),
      createBaseVNode("div", _hoisted_8, [
        _cache[18] || (_cache[18] = createBaseVNode("span", { class: "pp-metric__label" }, "Lifecycle State", -1)),
        createBaseVNode("span", _hoisted_9, toDisplayString(state.value.replace('_', ' ')), 1)
      ]),
      createBaseVNode("div", _hoisted_10, [
        _cache[19] || (_cache[19] = createBaseVNode("span", { class: "pp-metric__label" }, "Health Score", -1)),
        createBaseVNode("span", _hoisted_11, toDisplayString(healthScore.value != null ? healthScore.value.toFixed(1) : '—'), 1)
      ]),
      createBaseVNode("div", _hoisted_12, [
        _cache[20] || (_cache[20] = createBaseVNode("span", { class: "pp-metric__label" }, "Churn Probability", -1)),
        createBaseVNode("span", _hoisted_13, toDisplayString(churnProb.value != null ? Math.round(churnProb.value * 100) + '%' : '—'), 1)
      ]),
      createBaseVNode("div", _hoisted_14, [
        _cache[21] || (_cache[21] = createBaseVNode("span", { class: "pp-metric__label" }, "CLV", -1)),
        createBaseVNode("span", _hoisted_15, toDisplayString(clvPercentile.value != null ? 'P' + Math.round(clvPercentile.value * 100) : '—'), 1)
      ])
    ]),
    createBaseVNode("div", _hoisted_16, [
      createBaseVNode("div", _hoisted_17, [
        createBaseVNode("div", _hoisted_18, [
          _cache[22] || (_cache[22] = createBaseVNode("label", { class: "pp-label" }, "Plan Title", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.value.title) = $event)),
            type: "text",
            class: "pp-input",
            placeholder: "e.g. Re-engage Customer"
          }, null, 512), [
            [vModelText, form.value.title]
          ])
        ]),
        createBaseVNode("div", null, [
          _cache[24] || (_cache[24] = createBaseVNode("label", { class: "pp-label" }, "Priority", -1)),
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.value.priority) = $event)),
            class: "pp-input"
          }, [...(_cache[23] || (_cache[23] = [
            createBaseVNode("option", { value: "1" }, "Priority 1 — Urgent", -1),
            createBaseVNode("option", { value: "2" }, "Priority 2 — High", -1),
            createBaseVNode("option", { value: "3" }, "Priority 3 — Standard", -1)
          ]))], 512), [
            [vModelSelect, form.value.priority]
          ])
        ]),
        createBaseVNode("div", null, [
          _cache[25] || (_cache[25] = createBaseVNode("label", { class: "pp-label" }, "Assigned To", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.assignee) = $event)),
            type: "text",
            class: "pp-input",
            placeholder: "Account manager / RM name"
          }, null, 512), [
            [vModelText, form.value.assignee]
          ])
        ]),
        createBaseVNode("div", null, [
          _cache[26] || (_cache[26] = createBaseVNode("label", { class: "pp-label" }, "Due Date", -1)),
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((form.value.dueDate) = $event)),
            type: "date",
            class: "pp-input"
          }, null, 512), [
            [vModelText, form.value.dueDate]
          ])
        ]),
        createBaseVNode("div", null, [
          _cache[28] || (_cache[28] = createBaseVNode("label", { class: "pp-label" }, "Expected Outcome", -1)),
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.value.outcome) = $event)),
            class: "pp-input"
          }, [...(_cache[27] || (_cache[27] = [
            createStaticVNode("<option value=\"Reactivate customer\" data-v-f3573c77>Reactivate customer</option><option value=\"Retain customer\" data-v-f3573c77>Retain customer</option><option value=\"Increase value\" data-v-f3573c77>Increase value</option><option value=\"Resolve issue\" data-v-f3573c77>Resolve issue</option><option value=\"Other\" data-v-f3573c77>Other</option>", 5)
          ]))], 512), [
            [vModelSelect, form.value.outcome]
          ])
        ]),
        createBaseVNode("div", _hoisted_19, [
          _cache[29] || (_cache[29] = createBaseVNode("label", { class: "pp-label" }, "Reason", -1)),
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => ((form.value.reason) = $event)),
            rows: "2",
            class: "pp-input",
            placeholder: "Why this action is needed"
          }, null, 512), [
            [vModelText, form.value.reason]
          ])
        ]),
        createBaseVNode("div", _hoisted_20, [
          _cache[30] || (_cache[30] = createBaseVNode("label", { class: "pp-label" }, "Recommended Action", -1)),
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((form.value.action) = $event)),
            rows: "2",
            class: "pp-input",
            placeholder: "What should be done"
          }, null, 512), [
            [vModelText, form.value.action]
          ])
        ]),
        createBaseVNode("div", _hoisted_21, [
          _cache[31] || (_cache[31] = createBaseVNode("label", { class: "pp-label" }, "Notes", -1)),
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((form.value.notes) = $event)),
            rows: "3",
            class: "pp-input",
            placeholder: "Additional context or follow-up notes"
          }, null, 512), [
            [vModelText, form.value.notes]
          ])
        ])
      ]),
      (saved.value)
        ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createBaseVNode("p", _hoisted_23, "Action plan saved for " + toDisplayString(customerName.value) + ".", 1),
            _cache[32] || (_cache[32] = createBaseVNode("p", { class: "text-label-sm text-secondary" }, "Stored locally for this pilot. Return to the customer profile to continue.", -1))
          ]))
        : createCommentVNode("", true),
      createBaseVNode("div", { class: "flex items-center gap-2 mt-6" }, [
        createBaseVNode("button", {
          onClick: savePlan,
          class: "bg-[#DC0037] text-white text-body-md font-bold py-2.5 px-5 shadow-none hover:bg-[#B50232] transition-colors"
        }, "SAVE ACTION PLAN"),
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
const CreateActionPlan = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-f3573c77"]]);

export { CreateActionPlan as default };
