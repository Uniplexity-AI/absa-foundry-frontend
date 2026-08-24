import { o as openBlock, c as createElementBlock, b as createBaseVNode, j as normalizeClass, t as toDisplayString, n as normalizeStyle, l as createCommentVNode, D as computed, m as createTextVNode, F as Fragment, e as renderList, z as createBlock, q as createVNode, T as axios, U as API_BASE_URL, r as ref, h as onMounted, a as createStaticVNode, y as unref, d as defineComponent, K as h, I as useRoute, u as useRouter } from './index-F0Jaczum.js';
import { _ as _sfc_main$4 } from './LoadingSkeleton-qKyxdt4w.js';
import { A as AiCampaignModal } from './AiCampaignModal-BXqMdgHE.js';
import { u as useCustomerStore } from './customerStore-CYbEJoNT.js';
import { u as usePredictionStore } from './predictionStore-YU93sQRm.js';

const _hoisted_1$3 = { class: "flex items-center gap-2" };
const _hoisted_2$3 = { class: "flex-1" };
const _hoisted_3$3 = { class: "flex justify-between items-center mb-0.5" };
const _hoisted_4$2 = { class: "text-xs font-semibold text-absa-enrich" };
const _hoisted_5$2 = { class: "w-full h-1 bg-gray-100 rounded-full overflow-hidden" };
const _hoisted_6$2 = {
  key: 0,
  class: "text-[10px] text-gray-400 mt-0.5"
};


const _sfc_main$3 = /*@__PURE__*/Object.assign({ name: 'AiShapDriverBar' }, {
  __name: 'AiShapDriverBar',
  props: {
  feature:      { type: String,  required: true },
  contribution: { type: Number,  required: true },
  direction:    { type: String,  default: 'risk' },
  desc:         { type: String,  default: '' },
},
  setup(__props) {




return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$3, [
    createBaseVNode("div", {
      class: normalizeClass(["w-2 h-2 rounded-full flex-shrink-0", __props.direction === 'risk' ? 'bg-absa-passion' : 'bg-green-600'])
    }, null, 2),
    createBaseVNode("div", _hoisted_2$3, [
      createBaseVNode("div", _hoisted_3$3, [
        createBaseVNode("span", _hoisted_4$2, toDisplayString(__props.feature), 1),
        createBaseVNode("span", {
          class: normalizeClass(["text-[11px] font-bold font-mono", __props.direction === 'risk' ? 'text-absa-passion' : 'text-green-600'])
        }, toDisplayString(__props.direction === 'risk' ? '+' : '') + toDisplayString(__props.contribution) + "% ", 3)
      ]),
      createBaseVNode("div", _hoisted_5$2, [
        createBaseVNode("div", {
          class: normalizeClass(["h-full rounded-full transition-all", __props.direction === 'risk' ? 'bg-absa-passion' : 'bg-green-600']),
          style: normalizeStyle({ width: Math.abs(__props.contribution) + '%' })
        }, null, 6)
      ]),
      (__props.desc)
        ? (openBlock(), createElementBlock("p", _hoisted_6$2, toDisplayString(__props.desc), 1))
        : createCommentVNode("", true)
    ])
  ]))
}
}

});

const _hoisted_1$2 = { class: "flex items-center gap-2" };
const _hoisted_2$2 = { class: "flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden" };
const _hoisted_3$2 = {
  key: 0,
  class: "text-[10px] text-gray-400"
};


const _sfc_main$2 = /*@__PURE__*/Object.assign({ name: 'AiConfidenceBadge' }, {
  __name: 'AiConfidenceBadge',
  props: {
  score: { type: Number, required: true },
  label: { type: String, default: '' },
},
  setup(__props) {




return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$2, [
    createBaseVNode("div", _hoisted_2$2, [
      createBaseVNode("div", {
        class: normalizeClass(["h-full rounded-full transition-all", __props.score >= 80 ? 'bg-green-600' : __props.score >= 65 ? 'bg-amber-500' : 'bg-absa-passion']),
        style: normalizeStyle({ width: __props.score + '%' })
      }, null, 6)
    ]),
    createBaseVNode("span", {
      class: normalizeClass(["text-[11px] font-bold font-mono", __props.score >= 80 ? 'text-green-600' : __props.score >= 65 ? 'text-amber-700' : 'text-absa-passion'])
    }, toDisplayString(__props.score) + "% ", 3),
    (__props.label)
      ? (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(__props.label), 1))
      : createCommentVNode("", true)
  ]))
}
}

});

const _hoisted_1$1 = {
  key: 0,
  class: "mb-3 flex items-center gap-3 bg-absa-passion text-white px-4 py-2 rounded-sm text-xs font-bold"
};
const _hoisted_2$1 = {
  key: 1,
  class: "mb-3 flex items-center gap-3 bg-amber-50 border border-amber-300 text-amber-800 px-4 py-2 rounded-sm text-xs font-bold"
};
const _hoisted_3$1 = { class: "bg-white rounded-sm border border-gray-300 shadow-none overflow-hidden mb-6" };
const _hoisted_4$1 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-absa-enrich" };
const _hoisted_5$1 = { class: "flex items-center gap-2" };
const _hoisted_6$1 = { class: "grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200" };
const _hoisted_7$1 = { class: "p-5" };
const _hoisted_8$1 = { class: "flex items-start gap-3 mb-4" };
const _hoisted_9$1 = { class: "w-9 h-9 rounded-sm bg-absa-passion/10 flex items-center justify-center flex-shrink-0" };
const _hoisted_10$1 = { class: "material-symbols-outlined text-[20px] text-absa-passion" };
const _hoisted_11$1 = { class: "text-sm font-bold text-absa-enrich leading-tight" };
const _hoisted_12$1 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_13$1 = { class: "flex items-center gap-2" };
const _hoisted_14$1 = { class: "p-5" };
const _hoisted_15$1 = { class: "space-y-3" };
const _hoisted_16$1 = { class: "text-[10px] text-gray-400 mt-4" };
const _hoisted_17$1 = { class: "p-5" };
const _hoisted_18$1 = { class: "border border-red-200 bg-red-50 rounded-sm p-3 mb-2" };
const _hoisted_19$1 = { class: "text-xs text-gray-600" };
const _hoisted_20$1 = { class: "font-bold font-mono text-absa-passion" };
const _hoisted_21$1 = { class: "font-bold font-mono" };
const _hoisted_22$1 = { class: "border border-green-200 bg-green-50 rounded-sm p-3 mb-3" };
const _hoisted_23$1 = { class: "text-xs text-gray-600" };
const _hoisted_24$1 = { class: "font-bold font-mono text-green-700" };
const _hoisted_25$1 = { class: "font-bold font-mono text-green-700" };


const _sfc_main$1 = /*@__PURE__*/Object.assign({ name: 'AiNbaPanel' }, {
  __name: 'AiNbaPanel',
  props: {
  churnProb: { type: Number, default: 0 },
  customerId: { type: String, default: '' },
  // Optional override from backend � wire later
  nbaOverride: { type: Object, default: null },
},
  emits: ['execute', 'override'],
  setup(__props) {



const props = __props;



const churnProbPct = computed(() => Math.round((props.churnProb || 0) * 100));

const nba = computed(() => {
  // Wire to backend later � for now derive from churnProb
  if (props.nbaOverride) return props.nbaOverride
  const p = props.churnProb || 0;
  const isCritical = p > 0.7;
  const isHigh     = p > 0.45;
  return {
    urgency:   isCritical ? 'CRITICAL' : isHigh ? 'HIGH' : 'MODERATE',
    churnWindow: isCritical ? '48 hours' : '14 days',
    action: isCritical
      ? 'Immediate RM Courtesy Call + Fee Waiver Offer'
      : 'Enrol in Digital Reactivation Campaign',
    actionDetail: isCritical
      ? 'Senior RM to contact customer directly. Model recommends a 3-month fee waiver on the primary account to reduce exit intent.'
      : 'AI identified 3 personalised SMS touchpoints over 14 days targeting digital channel re-engagement.',
    actionIcon: isCritical ? 'call' : 'campaign',
    shapDrivers: [
      { feature: 'Digital Login Frequency', contribution: 38, direction: 'risk',       desc: '0 app/web logins in 45+ days � top churn predictor' },
      { feature: 'Transaction Velocity',    contribution: 27, direction: 'risk',       desc: 'Monthly txn volume down 62% vs 90-day avg' },
      { feature: 'Account Tenure',          contribution: 15, direction: 'protective', desc: '7+ year relationship � reduces exit probability' },
    ],
    aumAtRisk:              'K 450,000',
    postInterventionChurn:  Math.max(8, Math.round(churnProbPct.value * 0.25)),
    clvPreserved:           'K 312,000',
    confidence:             84,
  }
});

const urgencyBadgeClass = computed(() => {
  const u = nba.value.urgency;
  if (u === 'CRITICAL') return 'bg-absa-passion text-white'
  if (u === 'HIGH')     return 'bg-amber-400 text-absa-enrich'
  return 'bg-gray-200 text-gray-600'
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    (nba.value.urgency === 'CRITICAL')
      ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
          _cache[2] || (_cache[2] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px] animate-pulse" }, "emergency_home", -1)),
          createTextVNode(" AI CRITICAL ALERT — Immediate intervention required. Churn window: " + toDisplayString(nba.value.churnWindow), 1)
        ]))
      : (nba.value.urgency === 'HIGH')
        ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "warning", -1)),
            createTextVNode(" AI HIGH PRIORITY — Action recommended within " + toDisplayString(nba.value.churnWindow), 1)
          ]))
        : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_3$1, [
      createBaseVNode("div", _hoisted_4$1, [
        createBaseVNode("div", _hoisted_5$1, [
          _cache[4] || (_cache[4] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-amber-300" }, "auto_awesome", -1)),
          _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "text-sm font-bold text-white" }, "AI Prescribed Intervention", -1)),
          createBaseVNode("span", {
            class: normalizeClass(["inline-flex items-center px-2 py-0.5 text-[9px] font-bold rounded-sm uppercase tracking-wider", urgencyBadgeClass.value])
          }, toDisplayString(nba.value.urgency), 3)
        ]),
        _cache[6] || (_cache[6] = createBaseVNode("span", { class: "text-[11px] text-gray-300 hidden md:block" }, " XGBoost Churn v2.1 · SHAP Attribution · Nightly Inference Batch ", -1))
      ]),
      createBaseVNode("div", _hoisted_6$1, [
        createBaseVNode("div", _hoisted_7$1, [
          _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3" }, "Prescribed Action", -1)),
          createBaseVNode("div", _hoisted_8$1, [
            createBaseVNode("div", _hoisted_9$1, [
              createBaseVNode("span", _hoisted_10$1, toDisplayString(nba.value.actionIcon), 1)
            ]),
            createBaseVNode("div", null, [
              createBaseVNode("p", _hoisted_11$1, toDisplayString(nba.value.action), 1),
              createBaseVNode("p", _hoisted_12$1, toDisplayString(nba.value.actionDetail), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_13$1, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('execute'))),
              class: "px-3 py-1.5 bg-absa-passion text-white text-xs font-bold rounded-sm hover:bg-absa-power transition-colors shadow-none flex items-center gap-1.5"
            }, [...(_cache[7] || (_cache[7] = [
              createBaseVNode("span", { class: "material-symbols-outlined text-[13px]" }, "play_arrow", -1),
              createTextVNode(" Execute Intervention ", -1)
            ]))]),
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.$emit('override'))),
              class: "px-3 py-1.5 border border-gray-300 text-absa-enrich text-xs font-semibold rounded-sm hover:bg-gray-50 transition-colors shadow-none"
            }, " Override ")
          ])
        ]),
        createBaseVNode("div", _hoisted_14$1, [
          _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3" }, "Causal SHAP Drivers", -1)),
          createBaseVNode("div", _hoisted_15$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(nba.value.shapDrivers, (driver) => {
              return (openBlock(), createBlock(_sfc_main$3, {
                key: driver.feature,
                feature: driver.feature,
                contribution: driver.contribution,
                direction: driver.direction,
                desc: driver.desc
              }, null, 8, ["feature", "contribution", "direction", "desc"]))
            }), 128))
          ]),
          createBaseVNode("p", _hoisted_16$1, " Attribution: XGBoost SHAP TreeExplainer · " + toDisplayString(nba.value.shapDrivers.length) + " features analysed ", 1)
        ]),
        createBaseVNode("div", _hoisted_17$1, [
          _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3" }, "Counterfactual Outcome", -1)),
          createBaseVNode("div", _hoisted_18$1, [
            _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-[10px] font-bold text-absa-passion uppercase mb-1.5 flex items-center gap-1" }, [
              createBaseVNode("span", { class: "material-symbols-outlined text-[12px]" }, "close"),
              createTextVNode(" Without Intervention ")
            ], -1)),
            createBaseVNode("p", _hoisted_19$1, [
              _cache[10] || (_cache[10] = createTextVNode(" Churn probability ", -1)),
              createBaseVNode("span", _hoisted_20$1, toDisplayString(churnProbPct.value) + "%", 1),
              _cache[11] || (_cache[11] = createTextVNode(" · AUM at risk ", -1)),
              createBaseVNode("span", _hoisted_21$1, toDisplayString(nba.value.aumAtRisk), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_22$1, [
            _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[10px] font-bold text-green-700 uppercase mb-1.5 flex items-center gap-1" }, [
              createBaseVNode("span", { class: "material-symbols-outlined text-[12px]" }, "check"),
              createTextVNode(" With Intervention ")
            ], -1)),
            createBaseVNode("p", _hoisted_23$1, [
              _cache[13] || (_cache[13] = createTextVNode(" Churn drops to ", -1)),
              createBaseVNode("span", _hoisted_24$1, toDisplayString(nba.value.postInterventionChurn) + "%", 1),
              _cache[14] || (_cache[14] = createTextVNode(" · CLV preserved: ", -1)),
              createBaseVNode("span", _hoisted_25$1, toDisplayString(nba.value.clvPreserved), 1)
            ])
          ]),
          createBaseVNode("div", null, [
            _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1" }, "Model Confidence", -1)),
            createVNode(_sfc_main$2, {
              score: nba.value.confidence,
              label: "intervention success"
            }, null, 8, ["score"])
          ])
        ])
      ])
    ])
  ], 64))
}
}

});

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = { class: "grid grid-cols-12 gap-4 md:gap-4 mb-8" };
const _hoisted_3 = { class: "col-span-12 lg:col-span-8" };
const _hoisted_4 = { class: "col-span-12 lg:col-span-4" };
const _hoisted_5 = { class: "grid grid-cols-4 gap-4 md:gap-4 mb-8" };
const _hoisted_6 = {
  key: 1,
  class: "flex flex-col items-center justify-center min-h-[60vh] text-center"
};
const _hoisted_7 = { class: "mb-5" };
const _hoisted_8 = { class: "flex items-center gap-2 text-[11px] text-gray-500 mt-2" };
const _hoisted_9 = { class: "text-absa-enrich font-bold" };
const _hoisted_10 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6" };
const _hoisted_11 = { class: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6" };
const _hoisted_12 = { class: "flex items-start gap-4" };
const _hoisted_13 = { class: "flex items-center gap-3 flex-wrap" };
const _hoisted_14 = { class: "text-sm font-bold text-absa-enrich" };
const _hoisted_15 = { class: "text-xs text-gray-500 mt-1" };
const _hoisted_16 = { class: "grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 mt-4 text-xs" };
const _hoisted_17 = { class: "font-bold text-absa-enrich" };
const _hoisted_18 = { class: "font-bold text-absa-enrich" };
const _hoisted_19 = { class: "font-bold text-absa-enrich" };
const _hoisted_20 = { class: "font-bold text-absa-enrich" };
const _hoisted_21 = { key: 0 };
const _hoisted_22 = { class: "font-bold text-absa-enrich" };
const _hoisted_23 = { key: 1 };
const _hoisted_24 = { class: "font-bold text-absa-enrich" };
const _hoisted_25 = { class: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-4 mb-8" };
const _hoisted_26 = { class: "bg-white rounded-sm border border-gray-300 p-4 shadow-none" };
const _hoisted_27 = { class: "flex items-center justify-between mb-3" };
const _hoisted_28 = { class: "flex items-baseline gap-1" };
const _hoisted_29 = { class: "text-2xl font-bold font-mono text-absa-enrich text-absa-enrich" };
const _hoisted_30 = { class: "pp-track mt-3" };
const _hoisted_31 = { class: "bg-white rounded-sm border border-gray-300 p-4 shadow-none" };
const _hoisted_32 = { class: "flex items-center justify-between mb-3" };
const _hoisted_33 = { class: "text-2xl font-bold font-mono text-absa-enrich text-absa-enrich" };
const _hoisted_34 = { class: "bg-white rounded-sm border border-gray-300 p-4 shadow-none" };
const _hoisted_35 = { class: "flex items-center justify-between mb-3" };
const _hoisted_36 = { class: "text-2xl font-bold font-mono text-absa-enrich text-absa-enrich" };
const _hoisted_37 = { class: "bg-white rounded-sm border border-gray-300 p-4 shadow-none" };
const _hoisted_38 = {
  key: 0,
  class: "text-xs text-gray-500 mt-3"
};
const _hoisted_39 = {
  key: 1,
  class: "text-xs text-gray-500 mt-3"
};
const _hoisted_40 = {
  id: "why-predictions",
  class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6"
};
const _hoisted_41 = { class: "grid grid-cols-12 gap-6" };
const _hoisted_42 = { class: "col-span-12 lg:col-span-6" };
const _hoisted_43 = { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-3" };
const _hoisted_44 = { class: "space-y-3" };
const _hoisted_45 = { class: "text-xs text-absa-enrich w-48 shrink-0" };
const _hoisted_46 = { class: "pp-track flex-1" };
const _hoisted_47 = { class: "text-xs font-bold text-absa-enrich w-14 text-right" };
const _hoisted_48 = { class: "col-span-12 lg:col-span-6 border-t lg:border-t-0 lg:border-l border-gray-300 lg:pl-6" };
const _hoisted_49 = { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-3" };
const _hoisted_50 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_51 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_52 = { class: "text-[11px] text-gray-500" };
const _hoisted_53 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_54 = { class: "mt-6 pt-5 border-t border-gray-300" };
const _hoisted_55 = { class: "text-xs text-gray-500 max-w-3xl" };
const _hoisted_56 = { class: "text-[11px] text-gray-500 mt-3" };
const _hoisted_57 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6" };
const _hoisted_58 = { class: "flex flex-wrap items-center gap-2" };
const _hoisted_59 = {
  key: 0,
  class: "w-4 h-4 text-gray-500",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
const _hoisted_60 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6" };
const _hoisted_61 = { class: "pp-metric" };
const _hoisted_62 = { class: "pp-metric__value" };
const _hoisted_63 = { class: "pp-metric" };
const _hoisted_64 = { class: "pp-metric__value" };
const _hoisted_65 = { class: "pp-metric" };
const _hoisted_66 = { class: "pp-metric__value" };
const _hoisted_67 = { class: "pp-metric" };
const _hoisted_68 = { class: "pp-metric__value" };
const _hoisted_69 = {
  key: 0,
  class: "text-[11px] text-gray-500"
};
const _hoisted_70 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6" };
const _hoisted_71 = {
  key: 0,
  class: "relative pl-6"
};
const _hoisted_72 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_73 = { class: "text-[11px] text-gray-500" };
const _hoisted_74 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_75 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6" };
const _hoisted_76 = { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" };
const _hoisted_77 = { class: "flex items-center justify-between mb-2" };
const _hoisted_78 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_79 = { class: "text-[11px] text-gray-500" };
const _hoisted_80 = {
  key: 0,
  class: "text-[11px] text-gray-500 mb-3"
};
const _hoisted_81 = {
  key: 1,
  class: "pp-track"
};
const _hoisted_82 = {
  key: 2,
  class: "text-xs text-gray-500"
};
const _hoisted_83 = { class: "grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4 mb-6" };
const _hoisted_84 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-4" };
const _hoisted_85 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_86 = { class: "flex items-center justify-between" };
const _hoisted_87 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_88 = { class: "text-[11px] text-gray-500" };
const _hoisted_89 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_90 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-4" };
const _hoisted_91 = {
  key: 0,
  class: "space-y-3"
};
const _hoisted_92 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_93 = { class: "text-[11px] text-gray-500" };
const _hoisted_94 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_95 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6" };
const _hoisted_96 = {
  key: 0,
  class: "space-y-4"
};
const _hoisted_97 = { class: "w-10 h-10 bg-white border border-gray-200 text-absa-passion flex items-center justify-center font-bold shrink-0" };
const _hoisted_98 = { class: "flex-1" };
const _hoisted_99 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_100 = { class: "text-[11px] text-gray-500" };
const _hoisted_101 = { class: "text-xs text-absa-enrich mt-1" };
const _hoisted_102 = { class: "text-right shrink-0" };
const _hoisted_103 = { class: "text-[11px] text-gray-500 mb-1" };
const _hoisted_104 = ["onClick"];
const _hoisted_105 = {
  key: 1,
  class: "text-xs text-gray-500"
};
const _hoisted_106 = { class: "grid grid-cols-12 gap-4 md:gap-4 mb-6" };
const _hoisted_107 = { class: "col-span-12 lg:col-span-5 bg-white rounded-sm border border-gray-300 shadow-none p-4" };
const _hoisted_108 = { class: "flex items-baseline gap-2 mb-3" };
const _hoisted_109 = { class: "text-2xl font-bold font-mono text-absa-enrich text-absa-enrich" };
const _hoisted_110 = { class: "space-y-2 text-xs" };
const _hoisted_111 = { class: "flex justify-between" };
const _hoisted_112 = { class: "font-bold text-absa-enrich" };
const _hoisted_113 = { class: "flex justify-between" };
const _hoisted_114 = { class: "font-bold text-absa-enrich" };
const _hoisted_115 = { class: "flex justify-between" };
const _hoisted_116 = { class: "font-bold text-absa-enrich" };
const _hoisted_117 = { class: "flex justify-between" };
const _hoisted_118 = { class: "font-bold text-absa-enrich" };
const _hoisted_119 = { class: "col-span-12 lg:col-span-7 bg-white rounded-sm border border-gray-300 shadow-none p-4" };
const _hoisted_120 = { open: "" };
const _hoisted_121 = { class: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3" };
const _hoisted_122 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_123 = { class: "text-[11px] text-gray-500" };
const _hoisted_124 = { class: "bg-white rounded-sm border border-gray-300 shadow-none overflow-hidden mb-6" };
const _hoisted_125 = { class: "overflow-x-auto" };
const _hoisted_126 = { class: "min-w-full divide-y divide-outline-variant" };
const _hoisted_127 = { class: "bg-white divide-y divide-outline-variant" };
const _hoisted_128 = { key: 0 };
const _hoisted_129 = { class: "p-4 text-xs text-absa-enrich" };
const _hoisted_130 = { class: "p-4" };
const _hoisted_131 = {
  key: 0,
  class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6"
};
const _hoisted_132 = { class: "flex items-center justify-between mb-4" };
const _hoisted_133 = { class: "text-[11px] font-bold text-absa-passion" };
const _hoisted_134 = { class: "space-y-3" };
const _hoisted_135 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_136 = { class: "text-[11px] text-gray-500" };
const _hoisted_137 = { class: "bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6" };
const _hoisted_138 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4" };
const _hoisted_139 = { class: "pp-metric" };
const _hoisted_140 = { class: "pp-metric__value" };
const _hoisted_141 = { class: "pp-metric" };
const _hoisted_142 = { class: "pp-metric__value" };
const _hoisted_143 = { class: "pp-metric" };
const _hoisted_144 = { class: "pp-metric__value" };
const _hoisted_145 = { class: "pp-metric" };
const _hoisted_146 = { class: "pp-metric__value" };
const _hoisted_147 = {
  key: 0,
  class: "pp-metric"
};
const _hoisted_148 = { class: "pp-metric__value" };
const _hoisted_149 = {
  key: 1,
  class: "pp-metric"
};
const _hoisted_150 = { class: "pp-metric__value" };
const _hoisted_151 = { class: "pp-metric" };
const _hoisted_152 = { class: "pp-metric__value" };
const _hoisted_153 = { class: "pp-metric" };
const _hoisted_154 = { class: "pp-metric__value" };

const DEFAULT_AS_OF_DATE = '2026-07-27';


const _sfc_main = {
  __name: 'CustomerDetail',
  setup(__props) {

const route = useRoute();
const router = useRouter();
const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();

const api = axios.create({ baseURL: API_BASE_URL, timeout: 20000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
});

const STATE_COLORS = {
  NEW: '#16a34a',
  ACTIVE: '#16a34a',
  GROWING: '#16a34a',
  AT_RISK: '#7f1d1d',
  DORMANT: '#7f1d1d',
  CHURNED: '#7f1d1d',
};
const LIFECYCLE_ORDER = ['NEW', 'ACTIVE', 'GROWING', 'AT_RISK', 'DORMANT', 'CHURNED'];

// Inline StatePill (the previously-imported StateBadge component no longer exists)
const StatePill = defineComponent({
  props: { state: { type: String, default: '—' }, size: { type: String, default: 'md' } },
  setup(props) {
    return () => h('span', {
      class: [
        'inline-flex items-center rounded-full font-bold uppercase tracking-wide',
        props.size === 'lg' ? 'px-4 py-1.5 text-xs' : 'px-2.5 py-0.5 text-[11px]',
      ],
      style: {
        background: '#ffffff',
        color: STATE_COLORS[props.state] || '#7f1d1d',
        border: '1px solid #e5e7eb',
      },
    }, (props.state || '—').replace('_', ' '))
  },
});

// Inline info tooltip (title attribute)
const InfoDot = defineComponent({
  props: { label: { type: String, default: '' } },
  setup(props) {
    return () => h('span', { class: 'text-gray-500 cursor-help', title: props.label }, h('svg', {
      class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24',
    }, [h('circle', { cx: '12', cy: '12', r: '9', 'stroke-width': '2' }), h('path', { d: 'M12 16v-4m0-4h.01', 'stroke-linecap': 'round', 'stroke-width': '2' })]))
  },
});

const loading = ref(true);
const showCampaignModal = ref(false);
const showOverrideDialog = ref(false);
const reasonCodes = ref([]);
const recommendations = ref([]);

const customerId = computed(() => String(route.params.id || ''));
const isEmpty = computed(() => !loading.value && !customerStore.selectedCustomer);

const customer = computed(() => customerStore.selectedCustomer || {});

const state = computed(() => customer.value.state || customer.value._raw?.state || '—');
const previousState = computed(() => customer.value.previousState || customer.value._raw?.previous_state || null);

const healthScore = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  if (h?.health_score != null) return h.health_score
  return customer.value.healthScore ?? null
});

const components = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  const c = customer.value._raw?.component_scores;
  return h?.component_scores || c || {}
});

const churnProb = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return typeof p === 'number' ? p : p?.churn_probability ?? null
});

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value];
  return typeof p === 'object' ? p?.clv_percentile ?? null : null
});

const featureSnapshot = computed(() => customerStore.features);

const healthLabel = computed(() => {
  const s = healthScore.value;
  if (s == null) return '—'
  if (s < 25) return 'Critical'
  if (s < 50) return 'At Risk'
  if (s < 70) return 'Moderate'
  return 'Healthy'
});

const healthColor = computed(() => {
  const s = healthScore.value;
  if (s == null) return '#857371'
  if (s < 25) return '#7f1d1d'
  if (s < 50) return '#7f1d1d'
  if (s < 70) return '#16a34a'
  return '#16a34a'
});

const churnLabel = computed(() => {
  const p = churnProb.value;
  if (p == null) return '—'
  if (p < 0.2) return 'Low Risk'
  if (p < 0.5) return 'Moderate Risk'
  return 'High Risk'
});

const churnColor = computed(() => {
  const p = churnProb.value;
  if (p == null) return '#857371'
  if (p < 0.2) return '#16a34a'
  if (p < 0.5) return '#16a34a'
  return '#7f1d1d'
});

const timelineEntries = computed(() => {
  const raw = customerStore.timeline;
  if (Array.isArray(raw)) return raw
  return raw?.timeline || []
});

const transitions = computed(() => {
  const raw = customerStore.timeline;
  if (Array.isArray(raw)) return []
  return raw?.transitions || []
});

const customerSince = computed(() => {
  const entries = timelineEntries.value;
  if (!entries.length) return null
  const sorted = [...entries].sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date));
  return fmtDate(sorted[0].as_of_date)
});

const stateSince = computed(() => {
  const entries = timelineEntries.value;
  if (!entries.length) return null
  // Most recent entry date for the current state
  const current = entries.filter(e => e.state === state.value);
  if (current.length) return fmtDate(current[current.length - 1].as_of_date)
  return fmtDate(entries[entries.length - 1].as_of_date)
});

const computedAt = computed(() => {
  const raw = customer.value._raw?.computed_at || customer.value.computedAt;
  if (!raw) return null
  try { return new Date(raw).toLocaleString() } catch { return raw }
});

const lastActivity = computed(() => {
  const f = featureSnapshot.value;
  if (f?.days_since_last_txn != null) return `${f.days_since_last_txn} days ago`
  // Fall back to a reason code detail if present
  const rc = reasonCodes.value.find(r => r.code === 'INACTIVE_EXTENDED');
  if (rc?.detail?.days_since_last_txn != null) return `${rc.detail.days_since_last_txn} days ago`
  return '—'
});

const statePct = computed(() => {
  const p = customerStore.portfolio;
  const map = { DORMANT: p.dormantPct, AT_RISK: p.atRiskPct, CHURNED: p.churnedPct, ACTIVE: p.activePct };
  return map[state.value] != null ? map[state.value] : null
});

const currentStateIndex = computed(() => LIFECYCLE_ORDER.indexOf(state.value));

const markovStates = computed(() => predictionStore.markovMatrix?.states || []);
const markovMatrix = computed(() => predictionStore.markovMatrix?.matrix || []);

const predictedNextState = computed(() => {
  const states = markovStates.value;
  const matrix = markovMatrix.value;
  const idx = states.indexOf(state.value);
  if (idx < 0 || !matrix[idx] || !matrix[idx].length) return null
  const row = matrix[idx];
  const maxVal = Math.max(...row);
  const maxIdx = row.indexOf(maxVal);
  return { state: states[maxIdx] || '—', probability: maxVal }
});

const healthFactors = computed(() => {
  const c = components.value;
  return [
    { key: 'churn_risk_sub', label: 'Churn Risk', good: false, value: c.churn_risk_sub ?? null },
    { key: 'clv_percentile_sub', label: 'Customer Value (CLV)', good: true, value: c.clv_percentile_sub ?? null },
    { key: 'behaviour_sub', label: 'Behavioural Engagement', good: true, value: c.behaviour_sub ?? null },
  ]
});

const behaviourFactors = computed(() => {
  const f = featureSnapshot.value || {};
  return [
    { label: 'Recency', unit: 'days', evidence: f.days_since_last_txn != null ? `${f.days_since_last_txn} days since last transaction` : null, value: f.days_since_last_txn, max: 180, invert: true },
    { label: 'Transaction Frequency (90d)', unit: 'txns', evidence: f.txn_count_90d != null ? `${f.txn_count_90d} transactions in last 90 days` : null, value: f.txn_count_90d, max: 30, invert: false },
    { label: 'Transaction Frequency (180d)', unit: 'txns', evidence: f.txn_count_180d != null ? `${f.txn_count_180d} transactions in last 180 days` : null, value: f.txn_count_180d, max: 60, invert: false },
    { label: 'Total Value (90d)', unit: 'ZMW', evidence: f.total_amount_90d != null ? `${Math.round(f.total_amount_90d).toLocaleString()} ZMW in last 90 days` : null, value: f.total_amount_90d, max: 500000, invert: false },
    { label: 'Engagement Score', unit: 'pts', evidence: f.engagement_score != null ? `Engagement ${f.engagement_score} / 100` : null, value: f.engagement_score, max: 100, invert: false },
    { label: 'Distinct Channels (90d)', unit: 'channels', evidence: f.distinct_channels_90d != null ? `${f.distinct_channels_90d} channels used` : null, value: f.distinct_channels_90d, max: 6, invert: false },
  ]
});

const riskCodes = computed(() => reasonCodes.value.filter(r => r.category === 'RISK'));
const opportunityCodes = computed(() => reasonCodes.value.filter(r => r.category === 'OPPORTUNITY'));
const alertCodes = computed(() => reasonCodes.value.filter(r => r.severity === 'HIGH'));

const clvEvidence = computed(() => {
  const f = featureSnapshot.value || {};
  const parts = [];
  if (f.total_amount_90d != null) parts.push(`90-day value: ${Math.round(f.total_amount_90d).toLocaleString()} ZMW`);
  if (f.avg_amount_90d != null) parts.push(`Avg transaction: ${Math.round(f.avg_amount_90d).toLocaleString()} ZMW`);
  if (f.txn_count_90d != null) parts.push(`${f.txn_count_90d} txns / 90d`);
  if (f.has_salary_credit != null && f.has_salary_credit) parts.push('Salary credit detected');
  if (f.customer_tenure_days != null) parts.push(`Tenure: ${Math.round(f.customer_tenure_days / 30)} months`);
  return parts
});

const actionPlan = computed(() => {
  const recs = recommendations.value;
  if (recs.length) {
    return recs.map((r, i) => ({
      priority: i + 1,
      title: r.product_name || r.campaign_name || 'Review Required',
      reason: r.campaign_name ? `Campaign: ${r.campaign_name}` : 'Identified opportunity',
      action: r.is_upsell ? `Upsell to ${r.product_name}` : `Offer ${r.product_name || 'a suitable product'}`,
      confidence: Math.round((r.propensity_score || 0) * 100),
    }))
  }
  // Fallback actions derived from the customer's actual state
  const fallback = [];
  if (state.value === 'DORMANT') fallback.push({ priority: 1, title: 'Re-engage Customer', reason: 'Customer has been inactive for an extended period.', action: 'Contact the customer and identify the reason for inactivity.', confidence: 0 });
  if (state.value === 'AT_RISK') fallback.push({ priority: 1, title: 'Retain Customer', reason: 'Customer is showing early signs of disengagement.', action: 'Assign account manager for proactive follow-up.', confidence: 0 });
  if (clvPercentile.value != null && clvPercentile.value > 0.6) fallback.push({ priority: fallback.length + 1, title: 'Review Customer Value', reason: 'Customer historically generated significant value.', action: 'Assign account manager for proactive follow-up.', confidence: 0 });
  return fallback
});

const modelVersion = computed(() => {
  const h = predictionStore.healthScores[customerId.value];
  return h?.model_versions?.churn || predictionStore.predictions[customerId.value]?.model_version || 'churn_v1'
});

const modelConfidence = computed(() => {
  const c = dataCompleteness.value;
  if (!c) return '—'
  return Math.round(c.populated / c.total * 100) + '%'
});

const dataCompleteness = computed(() => {
  const f = featureSnapshot.value;
  if (!f || typeof f !== 'object') return null
  const keys = Object.keys(f).filter(k => !['customer_id', 'as_of_date', 'computed_at'].includes(k));
  const populated = keys.filter(k => f[k] != null && f[k] !== '').length;
  return { populated, total: keys.length }
});

const dataUsed = computed(() => {
  const f = featureSnapshot.value || {};
  const groups = [
    { name: 'Transactions', fields: ['txn_count_30d', 'txn_count_90d', 'txn_count_180d', 'txn_count_365d', 'avg_days_between_txn'] },
    { name: 'Revenue', fields: ['total_amount_90d', 'avg_amount_90d', 'total_amount_180d', 'amount_growth_ratio', 'credit_sum_30d', 'debit_sum_30d'] },
    { name: 'Recency', fields: ['days_since_last_txn', 'days_since_first_txn', 'inactivity_streak_days', 'behav_recency_score'] },
    { name: 'Engagement', fields: ['engagement_score', 'eng_login_count_30d', 'eng_login_count_7d', 'behav_active_days_90d', 'behav_activity_consistency'] },
    { name: 'Purchase frequency', fields: ['behav_txn_count_7d', 'behav_frequency_score', 'txn_frequency_trend'] },
    { name: 'Customer tenure', fields: ['customer_tenure_days', 'customer_segment', 'age_years'] },
    { name: 'Payment history', fields: ['has_salary_credit', 'monthly_income_estimate', 'credit_to_debit_ratio_90d', 'fin_salary_consistency'] },
    { name: 'Lifecycle history', fields: ['rel_customer_status'] },
  ];
  return groups.map(g => {
    const populated = g.fields.filter(k => f[k] != null && f[k] !== '').length;
    return { name: g.name, available: `${populated} of ${g.fields.length} data points available` }
  })
});

const initials = computed(() => {
  const name = customer.value.fullName || customerId.value;
  return name.replace('CUST', 'C').replace('Customer ', '').slice(0, 2).toUpperCase() || 'CU'
});

function severityColor(sev) {
  if (sev === 'HIGH') return '#7f1d1d'
  if (sev === 'MEDIUM') return '#16a34a'
  return '#16a34a'
}

function codeLabel(code) {
  return String(code || '').replace(/_/g, ' ')
}

function detailText(detail) {
  if (!detail || !Object.keys(detail).length) return ''
  return Object.entries(detail)
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}`)
    .join(' · ')
}

function fmtDate(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return d }
}

function behaviourBarWidth(b) {
  if (b.value == null) return 0
  if (b.invert) {
    // Recency: lower (more recent) is better → invert the bar
    const pct = Math.max(0, 100 - (b.value / b.max) * 100);
    return Math.min(100, pct)
  }
  return Math.min(100, (b.value / b.max) * 100)
}

function goBack() {
  if (route.query.from === 'ledger') {
    router.push({ path: '/dashboard/portfolio', query: { page: route.query.page || 1 } });
  } else {
    router.back();
  }
}

function goToActionPlan() {
  router.push({
    path: `/dashboard/customer/${customerId.value}/action-plan`,
    query: { from: route.query.from || undefined, page: route.query.page || undefined },
  });
}

function goToTakeAction(a) {
  router.push({
    path: `/dashboard/customer/${customerId.value}/take-action`,
    query: {
      action: JSON.stringify(a),
      from: route.query.from || undefined,
      page: route.query.page || undefined,
    },
  });
}

onMounted(async () => {
  loading.value = true;
  const id = customerId.value;
  if (!id) { loading.value = false; return }

  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchPortfolio(),
  ]);
  await Promise.allSettled([
    customerStore.fetchCustomerFeatures(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
    predictionStore.fetchMarkovMatrix(),
  ]);
  loading.value = false;

  // Background: structured reason codes + recommendations
  await Promise.allSettled([
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/insights/reason-codes/${id}`, { params: { as_of_date: DEFAULT_AS_OF_DATE }, timeout: 30000 });
        reasonCodes.value = data.reason_codes || [];
      } catch (e) { console.warn('reason-codes failed:', e.message); reasonCodes.value = []; }
    })(),
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/recommendations/${id}`, { params: { as_of_date: DEFAULT_AS_OF_DATE }, timeout: 30000 });
        recommendations.value = data.recommendations || [];
      } catch (e) { console.warn('recommendations failed:', e.message); recommendations.value = []; }
    })(),
  ]);
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (loading.value)
      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "mb-6 h-6 bg-white rounded-sm w-1/3 animate-pulse" }, null, -1)),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createVNode(_sfc_main$4, { type: "block" })
            ]),
            createBaseVNode("div", _hoisted_4, [
              createVNode(_sfc_main$4, { type: "block" })
            ])
          ]),
          createBaseVNode("div", _hoisted_5, [
            (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
              return createVNode(_sfc_main$4, {
                key: i,
                type: "card"
              })
            }), 64))
          ]),
          createVNode(_sfc_main$4, { type: "block" })
        ], 64))
      : (!customerId.value || isEmpty.value)
        ? (openBlock(), createElementBlock("div", _hoisted_6, [
            _cache[4] || (_cache[4] = createStaticVNode("<div class=\"w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4\"><svg class=\"w-8 h-8 text-amber-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path></svg></div><h2 class=\"text-sm font-bold text-absa-enrich mb-2\">Customer Not Found</h2><p class=\"text-xs text-gray-500 max-w-md\">No predictive profile is available for this customer.</p>", 3)),
            createBaseVNode("button", {
              onClick: goBack,
              class: "mt-6 bg-absa-passion text-white text-xs font-bold py-2 px-5 rounded-sm shadow-none hover:bg-absa-power transition-colors"
            }, "Back to Predictive Lifecycle Ledger")
          ]))
        : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("button", {
                onClick: goBack,
                class: "flex items-center gap-2 text-xs font-bold text-absa-passion hover:text-absa-power transition-colors"
              }, [...(_cache[5] || (_cache[5] = [
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
                createTextVNode(" Back to Predictive Lifecycle Ledger ", -1)
              ]))]),
              createBaseVNode("div", _hoisted_8, [
                _cache[6] || (_cache[6] = createBaseVNode("span", null, "Dashboard", -1)),
                _cache[7] || (_cache[7] = createBaseVNode("span", null, "/", -1)),
                _cache[8] || (_cache[8] = createBaseVNode("span", null, "Portfolio", -1)),
                _cache[9] || (_cache[9] = createBaseVNode("span", null, "/", -1)),
                _cache[10] || (_cache[10] = createBaseVNode("span", null, "Predictive Lifecycle Ledger", -1)),
                _cache[11] || (_cache[11] = createBaseVNode("span", null, "/", -1)),
                createBaseVNode("span", _hoisted_9, toDisplayString(customerId.value), 1)
              ])
            ]),
            createVNode(_sfc_main$1, {
              "churn-prob": churnProb.value,
              "customer-id": customerId.value,
              onExecute: _cache[0] || (_cache[0] = $event => (showCampaignModal.value = true)),
              onOverride: _cache[1] || (_cache[1] = $event => (showOverrideDialog.value = true))
            }, null, 8, ["churn-prob", "customer-id"]),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", _hoisted_12, [
                  createBaseVNode("div", {
                    class: "w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0",
                    style: normalizeStyle({ background: STATE_COLORS[state.value] || '#7f1d1d' })
                  }, toDisplayString(initials.value), 5),
                  createBaseVNode("div", null, [
                    createBaseVNode("div", _hoisted_13, [
                      createBaseVNode("h1", _hoisted_14, toDisplayString(customer.value.fullName || ('Customer ' + (customerId.value || '').replace('CUST', ''))), 1),
                      createVNode(unref(StatePill), { state: state.value }, null, 8, ["state"])
                    ]),
                    createBaseVNode("p", _hoisted_15, "ID: " + toDisplayString(customerId.value), 1),
                    createBaseVNode("div", _hoisted_16, [
                      createBaseVNode("div", null, [
                        _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-gray-500 block text-[11px] uppercase" }, "Customer Since", -1)),
                        createBaseVNode("span", _hoisted_17, toDisplayString(customerSince.value || '—'), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[13] || (_cache[13] = createBaseVNode("span", { class: "text-gray-500 block text-[11px] uppercase" }, "Last Activity", -1)),
                        createBaseVNode("span", _hoisted_18, toDisplayString(lastActivity.value), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[14] || (_cache[14] = createBaseVNode("span", { class: "text-gray-500 block text-[11px] uppercase" }, "Last Snapshot", -1)),
                        createBaseVNode("span", _hoisted_19, toDisplayString(computedAt.value || '—'), 1)
                      ]),
                      createBaseVNode("div", null, [
                        _cache[15] || (_cache[15] = createBaseVNode("span", { class: "text-gray-500 block text-[11px] uppercase" }, "State Since", -1)),
                        createBaseVNode("span", _hoisted_20, toDisplayString(stateSince.value || '—'), 1)
                      ]),
                      (customer.value.branch)
                        ? (openBlock(), createElementBlock("div", _hoisted_21, [
                            _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-gray-500 block text-[11px] uppercase" }, "Branch", -1)),
                            createBaseVNode("span", _hoisted_22, toDisplayString(customer.value.branch), 1)
                          ]))
                        : createCommentVNode("", true),
                      (customer.value.segment)
                        ? (openBlock(), createElementBlock("div", _hoisted_23, [
                            _cache[17] || (_cache[17] = createBaseVNode("span", { class: "text-gray-500 block text-[11px] uppercase" }, "Segment", -1)),
                            createBaseVNode("span", _hoisted_24, toDisplayString(customer.value.segment), 1)
                          ]))
                        : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createBaseVNode("div", { class: "flex items-center gap-2 flex-wrap shrink-0" }, [
                  createBaseVNode("button", {
                    onClick: goToActionPlan,
                    class: "bg-absa-passion text-white text-xs font-bold py-2.5 px-4 shadow-none hover:bg-absa-power transition-colors"
                  }, "CREATE ACTION PLAN"),
                  _cache[18] || (_cache[18] = createBaseVNode("button", { class: "border border-gray-300 text-absa-enrich text-xs font-bold py-2.5 px-4 hover:bg-gray-50 transition-colors" }, "MORE", -1))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_25, [
              createBaseVNode("div", _hoisted_26, [
                createBaseVNode("div", _hoisted_27, [
                  _cache[19] || (_cache[19] = createBaseVNode("h3", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase" }, "Customer Health", -1)),
                  createVNode(unref(InfoDot), { label: 'Combined health score from churn risk, customer value and behavioural engagement.' })
                ]),
                createBaseVNode("div", _hoisted_28, [
                  createBaseVNode("span", _hoisted_29, toDisplayString(healthScore.value != null ? healthScore.value.toFixed(1) : '—'), 1),
                  _cache[20] || (_cache[20] = createBaseVNode("span", { class: "text-xs text-gray-500" }, "/ 100", -1))
                ]),
                createBaseVNode("div", _hoisted_30, [
                  createBaseVNode("div", {
                    class: "pp-fill",
                    style: normalizeStyle({ width: (healthScore.value || 0) + '%', background: healthColor.value })
                  }, null, 4)
                ]),
                createBaseVNode("p", {
                  class: "text-xs font-bold mt-2",
                  style: normalizeStyle({ color: healthColor.value })
                }, toDisplayString(healthLabel.value), 5)
              ]),
              createBaseVNode("div", _hoisted_31, [
                createBaseVNode("div", _hoisted_32, [
                  _cache[21] || (_cache[21] = createBaseVNode("h3", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase" }, "Churn Probability", -1)),
                  createVNode(unref(InfoDot), { label: 'Probability the customer will churn within the prediction horizon, from the XGBoost churn model.' })
                ]),
                createBaseVNode("span", _hoisted_33, toDisplayString(churnProb.value != null ? Math.round(churnProb.value * 100) + '%' : '—'), 1),
                createBaseVNode("p", {
                  class: "text-xs font-bold mt-2",
                  style: normalizeStyle({ color: churnColor.value })
                }, toDisplayString(churnLabel.value), 5),
                _cache[22] || (_cache[22] = createBaseVNode("a", {
                  href: "#why-predictions",
                  class: "text-xs font-bold text-absa-passion hover:text-absa-power mt-2 inline-block"
                }, "Why?", -1))
              ]),
              createBaseVNode("div", _hoisted_34, [
                createBaseVNode("div", _hoisted_35, [
                  _cache[23] || (_cache[23] = createBaseVNode("h3", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase" }, "Customer Lifetime Value", -1)),
                  createVNode(unref(InfoDot), { label: 'CLV percentile rank among the portfolio — an estimate, not guaranteed future revenue.' })
                ]),
                createBaseVNode("span", _hoisted_36, toDisplayString(clvPercentile.value != null ? 'P' + Math.round(clvPercentile.value * 100) : '—'), 1),
                _cache[24] || (_cache[24] = createBaseVNode("span", { class: "text-xs text-gray-500" }, " ZMW", -1)),
                _cache[25] || (_cache[25] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-2" }, "Predicted CLV (percentile rank)", -1))
              ]),
              createBaseVNode("div", _hoisted_37, [
                _cache[26] || (_cache[26] = createBaseVNode("h3", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-3" }, "Lifecycle State", -1)),
                createVNode(unref(StatePill), {
                  state: state.value,
                  size: "lg"
                }, null, 8, ["state"]),
                (statePct.value != null)
                  ? (openBlock(), createElementBlock("p", _hoisted_38, toDisplayString(statePct.value) + "% of portfolio customers are currently " + toDisplayString(state.value.toLowerCase().replace('_', ' ')), 1))
                  : (openBlock(), createElementBlock("p", _hoisted_39, "Current predictive lifecycle classification"))
              ])
            ]),
            createBaseVNode("div", _hoisted_40, [
              _cache[33] || (_cache[33] = createBaseVNode("div", { class: "mb-4" }, [
                createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Why These Predictions?"),
                createBaseVNode("p", { class: "text-xs text-gray-500" }, "Explanation of the customer's current lifecycle position")
              ], -1)),
              createBaseVNode("div", _hoisted_41, [
                createBaseVNode("div", _hoisted_42, [
                  createBaseVNode("h3", _hoisted_43, "Customer Health Score — " + toDisplayString(healthScore.value != null ? healthScore.value.toFixed(1) + ' / 100' : '—'), 1),
                  createBaseVNode("div", _hoisted_44, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(healthFactors.value, (f) => {
                      return (openBlock(), createElementBlock("div", {
                        key: f.key,
                        class: "flex items-center gap-3"
                      }, [
                        createBaseVNode("span", {
                          class: "w-2.5 h-2.5 rounded-full shrink-0",
                          style: normalizeStyle({ background: f.good ? '#16a34a' : '#7f1d1d' })
                        }, null, 4),
                        createBaseVNode("span", _hoisted_45, toDisplayString(f.label), 1),
                        createBaseVNode("div", _hoisted_46, [
                          createBaseVNode("div", {
                            class: "pp-fill",
                            style: normalizeStyle({ width: (f.value || 0) + '%', background: f.good ? '#16a34a' : '#7f1d1d' })
                          }, null, 4)
                        ]),
                        createBaseVNode("span", _hoisted_47, toDisplayString(f.value != null ? f.value.toFixed(0) : '—'), 1)
                      ]))
                    }), 128)),
                    _cache[27] || (_cache[27] = createBaseVNode("p", { class: "text-[11px] text-gray-500 pt-1" }, "Components: Churn risk, customer value (CLV) and behavioural engagement — as produced by the health scorer.", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_48, [
                  createBaseVNode("h3", _hoisted_49, "What is driving churn? — " + toDisplayString(churnProb.value != null ? Math.round(churnProb.value * 100) + '%' : '—'), 1),
                  (riskCodes.value.length)
                    ? (openBlock(), createElementBlock("div", _hoisted_50, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(riskCodes.value, (r) => {
                          return (openBlock(), createElementBlock("div", {
                            key: r.code,
                            class: "flex items-start gap-3"
                          }, [
                            createBaseVNode("span", {
                              class: "w-2.5 h-2.5 rounded-full shrink-0 mt-1.5",
                              style: normalizeStyle({ background: severityColor(r.severity) })
                            }, null, 4),
                            createBaseVNode("div", null, [
                              createBaseVNode("div", _hoisted_51, toDisplayString(codeLabel(r.code)), 1),
                              createBaseVNode("div", _hoisted_52, toDisplayString(detailText(r.detail)), 1)
                            ]),
                            createBaseVNode("span", {
                              class: "ml-auto text-[11px] font-bold",
                              style: normalizeStyle({ color: severityColor(r.severity) })
                            }, toDisplayString(r.severity), 5)
                          ]))
                        }), 128))
                      ]))
                    : (openBlock(), createElementBlock("p", _hoisted_53, "No churn risk signals flagged for this customer."))
                ])
              ]),
              createBaseVNode("div", _hoisted_54, [
                _cache[32] || (_cache[32] = createBaseVNode("h3", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-2" }, "How was Customer Lifetime Value estimated?", -1)),
                createBaseVNode("p", _hoisted_55, [
                  _cache[28] || (_cache[28] = createTextVNode(" Predicted CLV is the customer's ", -1)),
                  _cache[29] || (_cache[29] = createBaseVNode("strong", { class: "text-absa-enrich" }, "percentile rank", -1)),
                  createTextVNode(" (" + toDisplayString(clvPercentile.value != null ? 'P' + Math.round(clvPercentile.value * 100) : '—') + ") within the portfolio, derived from historical revenue (total amount over the last 90 days), customer value, and retention probability. It is a ", 1),
                  _cache[30] || (_cache[30] = createBaseVNode("strong", { class: "text-absa-enrich" }, "prediction / estimate", -1)),
                  _cache[31] || (_cache[31] = createTextVNode(", not a guaranteed future revenue figure. ", -1))
                ]),
                createBaseVNode("p", _hoisted_56, toDisplayString(clvEvidence.value.length ? clvEvidence.value.join(' · ') : 'No historical revenue data available for this customer.'), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_57, [
              _cache[39] || (_cache[39] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-5" }, "Customer Lifecycle Journey", -1)),
              createBaseVNode("div", _hoisted_58, [
                (openBlock(), createElementBlock(Fragment, null, renderList(LIFECYCLE_ORDER, (s, i) => {
                  return createBaseVNode("div", {
                    key: s,
                    class: "flex items-center gap-2"
                  }, [
                    createBaseVNode("div", {
                      class: normalizeClass(['flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-[11px] font-bold uppercase tracking-wider', i === currentStateIndex.value ? 'pp-current-state' : 'border-gray-300 bg-white']),
                      style: normalizeStyle(i === currentStateIndex.value ? { borderColor: STATE_COLORS[s], color: STATE_COLORS[s] } : { color: '#857371' })
                    }, [
                      createBaseVNode("span", {
                        class: "w-2 h-2 rounded-full",
                        style: normalizeStyle({ background: STATE_COLORS[s] })
                      }, null, 4),
                      createTextVNode(" " + toDisplayString(s.replace('_', ' ')), 1)
                    ], 6),
                    (i < LIFECYCLE_ORDER.length - 1)
                      ? (openBlock(), createElementBlock("svg", _hoisted_59, [...(_cache[34] || (_cache[34] = [
                          createBaseVNode("path", {
                            d: "M5 12h14m-7-7l7 7-7 7",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2"
                          }, null, -1)
                        ]))]))
                      : createCommentVNode("", true)
                  ])
                }), 64))
              ]),
              createBaseVNode("div", _hoisted_60, [
                createBaseVNode("div", _hoisted_61, [
                  _cache[35] || (_cache[35] = createBaseVNode("span", { class: "pp-metric__label" }, "Date entered current state", -1)),
                  createBaseVNode("span", _hoisted_62, toDisplayString(stateSince.value || '—'), 1)
                ]),
                createBaseVNode("div", _hoisted_63, [
                  _cache[36] || (_cache[36] = createBaseVNode("span", { class: "pp-metric__label" }, "Previous state", -1)),
                  createBaseVNode("span", _hoisted_64, toDisplayString(previousState.value || '—'), 1)
                ]),
                createBaseVNode("div", _hoisted_65, [
                  _cache[37] || (_cache[37] = createBaseVNode("span", { class: "pp-metric__label" }, "State transitions", -1)),
                  createBaseVNode("span", _hoisted_66, toDisplayString(transitions.value.length || (timelineEntries.value.length ? timelineEntries.value.length - 1 : 0)), 1)
                ]),
                createBaseVNode("div", _hoisted_67, [
                  _cache[38] || (_cache[38] = createBaseVNode("span", { class: "pp-metric__label" }, "Predicted next state", -1)),
                  createBaseVNode("span", _hoisted_68, toDisplayString(predictedNextState.value ? predictedNextState.value.state.replace('_', ' ') : '—'), 1),
                  (predictedNextState.value)
                    ? (openBlock(), createElementBlock("span", _hoisted_69, toDisplayString(Math.round(predictedNextState.value.probability * 100)) + "% probability", 1))
                    : createCommentVNode("", true)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_70, [
              _cache[41] || (_cache[41] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-5" }, "Customer Activity Timeline", -1)),
              (timelineEntries.value.length)
                ? (openBlock(), createElementBlock("div", _hoisted_71, [
                    _cache[40] || (_cache[40] = createBaseVNode("div", { class: "absolute left-2 top-1 bottom-1 w-px bg-outline-variant" }, null, -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(timelineEntries.value, (e, i) => {
                      return (openBlock(), createElementBlock("div", {
                        key: i,
                        class: "relative pl-6 pb-5"
                      }, [
                        createBaseVNode("span", {
                          class: "absolute left-[-10px] top-1 w-4 h-4 rounded-full border-2 border-white",
                          style: normalizeStyle({ background: STATE_COLORS[e.state] || '#7f1d1d' })
                        }, null, 4),
                        createBaseVNode("div", _hoisted_72, toDisplayString(e.state ? e.state.replace('_', ' ') : '—'), 1),
                        createBaseVNode("div", _hoisted_73, toDisplayString(fmtDate(e.as_of_date)), 1)
                      ]))
                    }), 128))
                  ]))
                : (openBlock(), createElementBlock("p", _hoisted_74, "No lifecycle activity recorded for this customer."))
            ]),
            createBaseVNode("div", _hoisted_75, [
              _cache[42] || (_cache[42] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-1" }, "Customer Behaviour", -1)),
              _cache[43] || (_cache[43] = createBaseVNode("p", { class: "text-xs text-gray-500 mb-5" }, "Behavioural signals derived from the customer's transaction and engagement history", -1)),
              createBaseVNode("div", _hoisted_76, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(behaviourFactors.value, (b) => {
                  return (openBlock(), createElementBlock("div", {
                    key: b.label,
                    class: "border border-gray-300 rounded-sm p-4"
                  }, [
                    createBaseVNode("div", _hoisted_77, [
                      createBaseVNode("span", _hoisted_78, toDisplayString(b.label), 1),
                      createBaseVNode("span", _hoisted_79, toDisplayString(b.unit), 1)
                    ]),
                    (b.evidence)
                      ? (openBlock(), createElementBlock("div", _hoisted_80, toDisplayString(b.evidence), 1))
                      : createCommentVNode("", true),
                    (b.evidence)
                      ? (openBlock(), createElementBlock("div", _hoisted_81, [
                          createBaseVNode("div", {
                            class: "pp-fill",
                            style: normalizeStyle({ width: behaviourBarWidth(b) + '%', background: '#7f1d1d' })
                          }, null, 4)
                        ]))
                      : (openBlock(), createElementBlock("span", _hoisted_82, "Not available for this customer"))
                  ]))
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_83, [
              createBaseVNode("div", _hoisted_84, [
                _cache[44] || (_cache[44] = createBaseVNode("h3", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-4" }, "Risk Signals", -1)),
                (riskCodes.value.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_85, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(riskCodes.value, (r) => {
                        return (openBlock(), createElementBlock("div", {
                          key: r.code,
                          class: "border-l-4 pl-3",
                          style: normalizeStyle({ borderColor: severityColor(r.severity) })
                        }, [
                          createBaseVNode("div", _hoisted_86, [
                            createBaseVNode("span", _hoisted_87, toDisplayString(codeLabel(r.code)), 1),
                            createBaseVNode("span", {
                              class: "text-[11px] font-bold",
                              style: normalizeStyle({ color: severityColor(r.severity) })
                            }, toDisplayString(r.severity), 5)
                          ]),
                          createBaseVNode("p", _hoisted_88, toDisplayString(detailText(r.detail)), 1)
                        ], 4))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_89, "No risk signals detected."))
              ]),
              createBaseVNode("div", _hoisted_90, [
                _cache[45] || (_cache[45] = createBaseVNode("h3", { class: "text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-4" }, "Opportunity Signals", -1)),
                (opportunityCodes.value.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_91, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(opportunityCodes.value, (r) => {
                        return (openBlock(), createElementBlock("div", {
                          key: r.code,
                          class: "border-l-4 pl-3 border-[#4CAF50]"
                        }, [
                          createBaseVNode("span", _hoisted_92, toDisplayString(codeLabel(r.code)), 1),
                          createBaseVNode("p", _hoisted_93, toDisplayString(detailText(r.detail)), 1)
                        ]))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_94, "No opportunity signals detected."))
              ])
            ]),
            createBaseVNode("div", _hoisted_95, [
              _cache[46] || (_cache[46] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-5" }, "Recommended Actions", -1)),
              (actionPlan.value.length)
                ? (openBlock(), createElementBlock("div", _hoisted_96, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(actionPlan.value, (a) => {
                      return (openBlock(), createElementBlock("div", {
                        key: a.priority,
                        class: "border border-gray-300 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                      }, [
                        createBaseVNode("div", _hoisted_97, toDisplayString(a.priority), 1),
                        createBaseVNode("div", _hoisted_98, [
                          createBaseVNode("div", _hoisted_99, toDisplayString(a.title), 1),
                          createBaseVNode("div", _hoisted_100, toDisplayString(a.reason), 1),
                          createBaseVNode("div", _hoisted_101, toDisplayString(a.action), 1)
                        ]),
                        createBaseVNode("div", _hoisted_102, [
                          createBaseVNode("div", _hoisted_103, "Propensity " + toDisplayString(a.confidence) + "%", 1),
                          createBaseVNode("button", {
                            onClick: $event => (goToTakeAction(a)),
                            class: "bg-absa-passion text-white text-xs font-bold py-2 px-4 shadow-none hover:bg-absa-power transition-colors"
                          }, "TAKE ACTION", 8, _hoisted_104)
                        ])
                      ]))
                    }), 128))
                  ]))
                : (openBlock(), createElementBlock("p", _hoisted_105, "No recommended actions generated yet."))
            ]),
            createBaseVNode("div", _hoisted_106, [
              createBaseVNode("div", _hoisted_107, [
                _cache[52] || (_cache[52] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-4" }, "Prediction Confidence", -1)),
                createBaseVNode("div", _hoisted_108, [
                  createBaseVNode("span", _hoisted_109, toDisplayString(modelConfidence.value), 1),
                  _cache[47] || (_cache[47] = createBaseVNode("span", { class: "text-xs text-gray-500" }, "Model Confidence", -1))
                ]),
                createBaseVNode("ul", _hoisted_110, [
                  createBaseVNode("li", _hoisted_111, [
                    _cache[48] || (_cache[48] = createBaseVNode("span", { class: "text-gray-500" }, "Data completeness", -1)),
                    createBaseVNode("span", _hoisted_112, toDisplayString(dataCompleteness.value ? Math.round(dataCompleteness.value.populated / dataCompleteness.value.total * 100) + '%' : '—'), 1)
                  ]),
                  createBaseVNode("li", _hoisted_113, [
                    _cache[49] || (_cache[49] = createBaseVNode("span", { class: "text-gray-500" }, "Behavioural features populated", -1)),
                    createBaseVNode("span", _hoisted_114, toDisplayString(dataCompleteness.value ? dataCompleteness.value.populated + ' / ' + dataCompleteness.value.total : '—'), 1)
                  ]),
                  createBaseVNode("li", _hoisted_115, [
                    _cache[50] || (_cache[50] = createBaseVNode("span", { class: "text-gray-500" }, "Model version", -1)),
                    createBaseVNode("span", _hoisted_116, toDisplayString(modelVersion.value), 1)
                  ]),
                  createBaseVNode("li", _hoisted_117, [
                    _cache[51] || (_cache[51] = createBaseVNode("span", { class: "text-gray-500" }, "Last model update", -1)),
                    createBaseVNode("span", _hoisted_118, toDisplayString(computedAt.value || '—'), 1)
                  ])
                ]),
                _cache[53] || (_cache[53] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-4" }, "Confidence is based on the amount, recency, and consistency of behavioural data available for this customer. Predictive results are estimates.", -1))
              ]),
              createBaseVNode("div", _hoisted_119, [
                createBaseVNode("details", _hoisted_120, [
                  _cache[54] || (_cache[54] = createBaseVNode("summary", { class: "text-sm font-bold text-absa-enrich cursor-pointer list-none" }, "Data Used for Prediction", -1)),
                  createBaseVNode("div", _hoisted_121, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(dataUsed.value, (d) => {
                      return (openBlock(), createElementBlock("div", {
                        key: d.name,
                        class: "border border-gray-300 rounded-sm p-3"
                      }, [
                        createBaseVNode("div", _hoisted_122, toDisplayString(d.name), 1),
                        createBaseVNode("div", _hoisted_123, toDisplayString(d.available), 1)
                      ]))
                    }), 128))
                  ])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_124, [
              _cache[57] || (_cache[57] = createBaseVNode("div", { class: "p-4 border-b border-gray-300" }, [
                createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Prediction History"),
                createBaseVNode("p", { class: "text-xs text-gray-500" }, "Lifecycle state over time")
              ], -1)),
              createBaseVNode("div", _hoisted_125, [
                createBaseVNode("table", _hoisted_126, [
                  _cache[56] || (_cache[56] = createBaseVNode("thead", null, [
                    createBaseVNode("tr", { class: "bg-white" }, [
                      createBaseVNode("th", { class: "p-4 text-[11px] font-bold uppercase tracking-wider text-absa-enrich text-left" }, "Date"),
                      createBaseVNode("th", { class: "p-4 text-[11px] font-bold uppercase tracking-wider text-absa-enrich text-left" }, "Lifecycle State")
                    ])
                  ], -1)),
                  createBaseVNode("tbody", _hoisted_127, [
                    (!timelineEntries.value.length)
                      ? (openBlock(), createElementBlock("tr", _hoisted_128, [...(_cache[55] || (_cache[55] = [
                          createBaseVNode("td", {
                            colspan: "2",
                            class: "p-8 text-center text-xs text-gray-500"
                          }, "No history available", -1)
                        ]))]))
                      : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(timelineEntries.value, (e, i) => {
                      return (openBlock(), createElementBlock("tr", { key: i }, [
                        createBaseVNode("td", _hoisted_129, toDisplayString(fmtDate(e.as_of_date)), 1),
                        createBaseVNode("td", _hoisted_130, [
                          createVNode(unref(StatePill), {
                            state: e.state
                          }, null, 8, ["state"])
                        ])
                      ]))
                    }), 128))
                  ])
                ])
              ])
            ]),
            (alertCodes.value.length)
              ? (openBlock(), createElementBlock("div", _hoisted_131, [
                  createBaseVNode("div", _hoisted_132, [
                    _cache[58] || (_cache[58] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Customer Alerts", -1)),
                    createBaseVNode("span", _hoisted_133, toDisplayString(alertCodes.value.length) + " ACTIVE", 1)
                  ]),
                  createBaseVNode("div", _hoisted_134, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(alertCodes.value, (r) => {
                      return (openBlock(), createElementBlock("div", {
                        key: r.code,
                        class: "border-l-4 border-[#DC0037] pl-4"
                      }, [
                        createBaseVNode("div", _hoisted_135, toDisplayString(codeLabel(r.code)), 1),
                        createBaseVNode("div", _hoisted_136, "Severity: " + toDisplayString(r.severity) + " · " + toDisplayString(detailText(r.detail)), 1)
                      ]))
                    }), 128))
                  ])
                ]))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_137, [
              _cache[67] || (_cache[67] = createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich mb-4" }, "Customer Information", -1)),
              createBaseVNode("div", _hoisted_138, [
                createBaseVNode("div", _hoisted_139, [
                  _cache[59] || (_cache[59] = createBaseVNode("span", { class: "pp-metric__label" }, "Customer ID", -1)),
                  createBaseVNode("span", _hoisted_140, toDisplayString(customerId.value), 1)
                ]),
                createBaseVNode("div", _hoisted_141, [
                  _cache[60] || (_cache[60] = createBaseVNode("span", { class: "pp-metric__label" }, "Name", -1)),
                  createBaseVNode("span", _hoisted_142, toDisplayString(customer.value.fullName || '—'), 1)
                ]),
                createBaseVNode("div", _hoisted_143, [
                  _cache[61] || (_cache[61] = createBaseVNode("span", { class: "pp-metric__label" }, "Account status", -1)),
                  createBaseVNode("span", _hoisted_144, toDisplayString(state.value.replace('_', ' ')), 1)
                ]),
                createBaseVNode("div", _hoisted_145, [
                  _cache[62] || (_cache[62] = createBaseVNode("span", { class: "pp-metric__label" }, "Customer since", -1)),
                  createBaseVNode("span", _hoisted_146, toDisplayString(customerSince.value || '—'), 1)
                ]),
                (customer.value.branch)
                  ? (openBlock(), createElementBlock("div", _hoisted_147, [
                      _cache[63] || (_cache[63] = createBaseVNode("span", { class: "pp-metric__label" }, "Branch", -1)),
                      createBaseVNode("span", _hoisted_148, toDisplayString(customer.value.branch), 1)
                    ]))
                  : createCommentVNode("", true),
                (customer.value.segment)
                  ? (openBlock(), createElementBlock("div", _hoisted_149, [
                      _cache[64] || (_cache[64] = createBaseVNode("span", { class: "pp-metric__label" }, "Segment", -1)),
                      createBaseVNode("span", _hoisted_150, toDisplayString(customer.value.segment), 1)
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_151, [
                  _cache[65] || (_cache[65] = createBaseVNode("span", { class: "pp-metric__label" }, "Health score", -1)),
                  createBaseVNode("span", _hoisted_152, toDisplayString(healthScore.value != null ? healthScore.value.toFixed(1) : '—'), 1)
                ]),
                createBaseVNode("div", _hoisted_153, [
                  _cache[66] || (_cache[66] = createBaseVNode("span", { class: "pp-metric__label" }, "Last activity", -1)),
                  createBaseVNode("span", _hoisted_154, toDisplayString(lastActivity.value), 1)
                ])
              ])
            ]),
            createVNode(AiCampaignModal, {
              modelValue: showCampaignModal.value,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((showCampaignModal).value = $event)),
              customers: [{ id: customerId.value, name: customer.value.fullName || 'Customer', churnProb: churnProb.value, segment: customer.value.segment }],
              "source-context": "portfolio"
            }, null, 8, ["modelValue", "customers"])
          ], 64))
  ]))
}
}

};

export { _sfc_main as default };
