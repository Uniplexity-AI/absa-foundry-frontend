import { _ as _sfc_main$1 } from './LoadingSkeleton-BO19GnDG.js';
import { A as AiCampaignModal } from './AiCampaignModal-CsC9GN2P.js';
import { u as useIntelligenceStore } from './intelligenceStore-BWsT1Rwc.js';
import { d as downloadCsv, r as reportFilename, n as notify } from './absaExport-oDWFCFjr.js';
import { r as ref, D as computed, h as onMounted, o as openBlock, c as createElementBlock, b as createBaseVNode, m as createTextVNode, q as createVNode, F as Fragment, e as renderList, y as unref, a as createStaticVNode, l as createCommentVNode, j as normalizeClass, t as toDisplayString, n as normalizeStyle } from './index-CeRQDSGV.js';
import './absaActions-bxMhAE5C.js';

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = {
  key: 0,
  class: "mt-6"
};
const _hoisted_3 = { class: "flex border-b border-gray-300 mb-6 mt-4" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { class: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6" };
const _hoisted_8 = { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" };
const _hoisted_9 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_10 = { class: "text-[10px] mt-1 flex items-center gap-0.5" };
const _hoisted_11 = {
  key: 0,
  class: "text-absa-inspire font-bold"
};
const _hoisted_12 = {
  key: 1,
  class: "text-absa-passion font-bold"
};
const _hoisted_13 = {
  key: 2,
  class: "text-gray-400"
};
const _hoisted_14 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_15 = { class: "p-5 space-y-4" };
const _hoisted_16 = { class: "w-28 flex-shrink-0" };
const _hoisted_17 = { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600" };
const _hoisted_18 = { class: "w-20 flex-shrink-0 text-right" };
const _hoisted_19 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_20 = { class: "flex-1" };
const _hoisted_21 = { class: "w-full h-1.5 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_22 = { class: "w-12 flex-shrink-0 text-right" };
const _hoisted_23 = { class: "text-xs font-mono text-gray-500" };
const _hoisted_24 = { class: "w-24 flex-shrink-0 text-right" };
const _hoisted_25 = {
  key: 0,
  class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-100 text-absa-inspire"
};
const _hoisted_26 = {
  key: 1,
  class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion"
};
const _hoisted_27 = {
  key: 2,
  class: "text-[10px] text-gray-400"
};
const _hoisted_28 = { key: 1 };
const _hoisted_29 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_30 = {
  key: 0,
  class: "px-4 pb-3 pt-0 border-t border-gray-100"
};
const _hoisted_31 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_32 = { class: "overflow-x-auto" };
const _hoisted_33 = { class: "w-full text-left border-collapse" };
const _hoisted_34 = { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" };
const _hoisted_35 = { class: "divide-y divide-gray-100" };
const _hoisted_36 = { class: "px-3 py-1.5" };
const _hoisted_37 = { class: "inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-gray-100 text-gray-600" };
const _hoisted_38 = { key: 2 };
const _hoisted_39 = { class: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6" };
const _hoisted_40 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_41 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_42 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_43 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_44 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_45 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_46 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_47 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_48 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_49 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_50 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_51 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_52 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_53 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_54 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_55 = { class: "grid grid-cols-1 md:grid-cols-2 gap-4" };
const _hoisted_56 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_57 = { class: "p-5 space-y-5" };
const _hoisted_58 = { class: "flex justify-between items-center mb-1" };
const _hoisted_59 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_60 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_61 = { class: "text-[10px] text-gray-400 mt-1" };
const _hoisted_62 = { class: "flex justify-between items-center mb-1" };
const _hoisted_63 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_64 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_65 = { class: "text-[10px] text-gray-400 mt-1" };
const _hoisted_66 = { class: "flex justify-between items-center mb-1" };
const _hoisted_67 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_68 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_69 = { class: "text-[10px] text-gray-400 mt-1" };
const _hoisted_70 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_71 = {
  class: "p-5 flex flex-col items-center justify-center text-center",
  style: {"min-height":"200px"}
};
const _hoisted_72 = { class: "text-6xl font-bold font-mono text-absa-enrich mb-2" };
const _hoisted_73 = { class: "w-32 mt-6" };
const _hoisted_74 = { class: "w-full h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_75 = { class: "text-[10px] text-gray-400 mt-2" };
const _hoisted_76 = { key: 3 };
const _hoisted_77 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_78 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_79 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_80 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_81 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_82 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_83 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_84 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_85 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_86 = {
  key: 0,
  class: "flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm mb-3"
};
const _hoisted_87 = { class: "text-sm font-semibold" };
const _hoisted_88 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_89 = { class: "overflow-x-auto" };
const _hoisted_90 = { class: "w-full text-left border-collapse" };
const _hoisted_91 = { class: "border-b border-gray-200 bg-gray-50" };
const _hoisted_92 = { class: "px-3 py-2 w-8" };
const _hoisted_93 = ["checked"];
const _hoisted_94 = { class: "divide-y divide-gray-100" };
const _hoisted_95 = { class: "px-3 py-1.5 w-8" };
const _hoisted_96 = ["checked", "disabled", "onChange"];
const _hoisted_97 = { class: "px-3 py-1.5 text-xs font-mono text-gray-500" };
const _hoisted_98 = { class: "px-3 py-1.5 text-xs font-semibold text-absa-enrich" };
const _hoisted_99 = { class: "px-3 py-1.5 text-xs text-gray-500" };
const _hoisted_100 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_101 = { class: "px-3 py-1.5" };
const _hoisted_102 = { class: "flex flex-col gap-1" };
const _hoisted_103 = { class: "text-xs font-bold font-mono text-absa-enrich" };
const _hoisted_104 = { class: "w-16 h-1 bg-gray-200 rounded-full overflow-hidden" };
const _hoisted_105 = { class: "px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_106 = { class: "px-3 py-1.5" };
const _hoisted_107 = { class: "px-3 py-1.5" };
const _hoisted_108 = ["onClick"];
const _hoisted_109 = ["onClick"];
const _hoisted_110 = {
  key: 2,
  class: "text-xs text-gray-400"
};


const _sfc_main = {
  __name: 'LifecyclePrediction',
  setup(__props) {

const store = useIntelligenceStore();
const loading = ref(true);
const showCampaignModal = ref(false);
const campaignCustomers = ref([]);
const activeTab = ref('distribution');
const tabs = [
  { id: 'distribution', label: 'Stage Distribution', icon: 'waterfall_chart' },
  { id: 'transitions',  label: 'Stage Transitions',  icon: 'compare_arrows'  },
  { id: 'onboarding',   label: 'Onboarding Health',  icon: 'new_releases'    },
  { id: 'winback',      label: 'Win-Back Pipeline',  icon: 'redo'            },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

const stageBarClass = (stage) => {
  const map = {
    ONBOARDING: 'bg-gray-400',
    GROWING:    'bg-absa-passion',
    MATURE:     'bg-absa-enrich',
    AT_RISK:    'bg-absa-energy',
    CHURNING:   'bg-absa-inspire',
    CHURNED:    'bg-red-900',
    WIN_BACK:   'bg-amber-500',
  };
  return map[stage] || 'bg-gray-300'
};

function formatEstValue(val) {
  if (val == null) return '—'
  if (typeof val === 'string') return val
  if (val >= 1e9) return 'K ' + (val / 1e9).toFixed(2) + 'B'
  if (val >= 1e6) return 'K ' + (val / 1e6).toFixed(1) + 'M'
  if (val >= 1e3) return 'K ' + (val / 1e3).toFixed(0) + 'K'
  return 'K ' + val.toLocaleString()
}

function winBackStatusClass(status) {
  if (status === 'ELIGIBLE')    return 'bg-red-50 text-absa-passion'
  if (status === 'IN CAMPAIGN') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-100 text-gray-500'
}

function winBackDotClass(status) {
  if (status === 'ELIGIBLE')    return 'bg-absa-passion'
  if (status === 'IN CAMPAIGN') return 'bg-amber-500'
  return 'bg-gray-400'
}

// ─── Computed ────────────────────────────────────────────────────────────────

const transitionStageLabels = computed(() => {
  const dist = store.lifecycleData?.distribution ?? [];
  if (dist.length) return dist.map(s => s.label)
  const matrix = store.lifecycleData?.transitions?.matrix ?? [];
  return matrix.map((_, i) => 'Stage ' + (i + 1))
});

// Onboarding activation percentages
const activation30Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding;
  if (!ob?.total_new || !ob?.activated_30d) return 0
  return ((ob.activated_30d / ob.total_new) * 100).toFixed(1)
});

const activation60Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding;
  if (!ob?.total_new || !ob?.activated_60d) return 0
  return ((ob.activated_60d / ob.total_new) * 100).toFixed(1)
});

const activation90Pct = computed(() => {
  const ob = store.lifecycleData?.onboarding;
  if (!ob?.total_new || !ob?.activated_90d) return 0
  return ((ob.activated_90d / ob.total_new) * 100).toFixed(1)
});

// Win-back KPIs
const winBackEligibleCount = computed(() =>
  (store.lifecycleData?.win_back ?? []).filter(w => w.status === 'ELIGIBLE').length
);

const winBackInCampaignCount = computed(() =>
  (store.lifecycleData?.win_back ?? []).filter(w => w.status === 'IN CAMPAIGN').length
);

const avgWinBackProb = computed(() => {
  const wb = store.lifecycleData?.win_back ?? [];
  if (!wb.length) return '—'
  const avg = wb.reduce((acc, w) => acc + (w.prob ?? 0), 0) / wb.length;
  return (avg * 100).toFixed(1)
});

const estTotalWinBackValue = computed(() => {
  const wb = store.lifecycleData?.win_back ?? [];
  const total = wb.reduce((acc, w) => acc + (w.est_value ?? 0), 0);
  return formatEstValue(total)
});

// ─── Lifecycle ───────────────────────────────────────────────────────────────

// Remediation 6: Collapsible scope note
const transitionScopeExpanded = ref(true);

// Remediation 5: Bulk selection for Win-Back Pipeline
const selectedWinback = ref(new Set());

const allWinbackSelected = computed(() => {
  const eligible = (store.lifecycleData?.win_back ?? []).filter(r => r.status === 'ELIGIBLE');
  return eligible.length > 0 && eligible.every(r => selectedWinback.value.has(r.customer_id))
});

function toggleWinbackAll() {
  const eligible = (store.lifecycleData?.win_back ?? []).filter(r => r.status === 'ELIGIBLE');
  if (allWinbackSelected.value) {
    selectedWinback.value = new Set();
  } else {
    selectedWinback.value = new Set(eligible.map(r => r.customer_id));
  }
}

function toggleWinback(id) {
  const s = new Set(selectedWinback.value);
  if (s.has(id)) s.delete(id);
  else s.add(id);
  selectedWinback.value = s;
}

function bulkAddToCampaign() {
  campaignCustomers.value = store.lifecycleData?.win_back.filter(c => selectedWinback.value.has(c.customer_id)) || [];
  showCampaignModal.value = true;
}

function clearWinbackSelection() {
  selectedWinback.value = new Set();
}

// ─── Export / Row actions ────────────────────────────────────────────────────

function exportReport() {
  const which = activeTab.value;
  const distribution = (store.lifecycleData?.distribution ?? []).map(s => ({
    stage: s.stage, label: s.label, count: s.count, pct: s.pct, mom_delta: s.mom_delta,
  }));
  if (which === 'distribution') {
    downloadCsv(reportFilename('lifecycle-distribution'), distribution, ['stage', 'label', 'count', 'pct', 'mom_delta']);
  } else if (which === 'transitions') {
    const matrix = store.lifecycleData?.transitions?.matrix ?? [];
    const labels = transitionStageLabels.value;
    const rows = matrix.map((row, i) => {
      const obj = { from: labels[i] ?? `Stage ${i + 1}` };
      row.forEach((cell, j) => { obj[labels[j] ?? `Stage ${j + 1}`] = cell; });
      return obj
    });
    downloadCsv(reportFilename('lifecycle-transitions'), rows);
  } else if (which === 'onboarding') {
    const ob = store.lifecycleData?.onboarding ?? {};
    downloadCsv(reportFilename('onboarding-health'), [{
      total_new: ob.total_new, activated_30d: ob.activated_30d, activated_60d: ob.activated_60d,
      activated_90d: ob.activated_90d, early_at_risk: ob.early_at_risk, avg_products: ob.avg_products,
      digital_enrolled: ob.digital_enrolled, activation_30_pct: activation30Pct.value,
      activation_60_pct: activation60Pct.value, activation_90_pct: activation90Pct.value,
    }]);
  } else {
    const wb = store.lifecycleData?.win_back ?? [];
    downloadCsv(reportFilename('winback-pipeline'), wb, ['customer_id', 'name', 'last_product', 'months_since_churn', 'prob', 'est_value', 'status']);
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 });
}

function viewCampaign(row) {
  if (!row) return
  notify(`Customer ${row.customer_id} is in an active win-back campaign. Open Customer Detail for the full journey.`, 'info', { autoClose: 4000 });
}

onMounted(async () => {
  await store.fetchLifecycle();
  loading.value = false;
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" }, [
      _cache[4] || (_cache[4] = createBaseVNode("div", null, [
        createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
          createBaseVNode("span", null, "Home"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", null, "Intelligence"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Lifecycle")
        ]),
        createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Customer Lifecycle Prediction"),
        createBaseVNode("p", { class: "text-body-md text-gray-500 mt-1" }, "Stage distribution, transition analysis, onboarding health, and win-back intelligence")
      ], -1)),
      createBaseVNode("div", { class: "flex items-center gap-3" }, [
        createBaseVNode("button", {
          onClick: exportReport,
          class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none"
        }, [...(_cache[3] || (_cache[3] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[18px]" }, "download", -1),
          createTextVNode(" Export Report ", -1)
        ]))])
      ])
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createVNode(_sfc_main$1)
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_3, [
            (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
              return createBaseVNode("button", {
                key: tab.id,
                onClick: $event => (activeTab.value = tab.id),
                class: normalizeClass(['px-3 py-1.5 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab.value === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich'])
              }, [
                createBaseVNode("span", _hoisted_5, toDisplayString(tab.icon), 1),
                createTextVNode(" " + toDisplayString(tab.label), 1)
              ], 10, _hoisted_4)
            }), 64))
          ]),
          (activeTab.value === 'distribution')
            ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.distribution, (stage) => {
                    return (openBlock(), createElementBlock("div", {
                      key: stage.stage,
                      class: "bg-white border border-gray-300 rounded-sm p-4"
                    }, [
                      createBaseVNode("p", _hoisted_8, toDisplayString(stage.label), 1),
                      createBaseVNode("p", {
                        class: normalizeClass(["text-2xl font-bold font-mono", stage.color ?? 'text-absa-enrich'])
                      }, toDisplayString(stage.count?.toLocaleString()), 3),
                      createBaseVNode("p", _hoisted_9, toDisplayString(stage.pct) + "% of portfolio", 1),
                      createBaseVNode("p", _hoisted_10, [
                        (stage.mom_delta > 0)
                          ? (openBlock(), createElementBlock("span", _hoisted_11, "▲ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                          : (stage.mom_delta < 0)
                            ? (openBlock(), createElementBlock("span", _hoisted_12, "▼ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                            : (openBlock(), createElementBlock("span", _hoisted_13, "—")),
                        _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-gray-400 ml-0.5" }, "MoM", -1))
                      ])
                    ]))
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_14, [
                  _cache[7] || (_cache[7] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Portfolio Lifecycle Flow"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Customer counts by lifecycle stage — proportional distribution")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_15, [
                    _cache[6] || (_cache[6] = createStaticVNode("<div class=\"flex items-center gap-4 border-b border-gray-100 pb-3\"><div class=\"w-28 flex-shrink-0 text-[10px] text-gray-400 font-bold uppercase\">Stage</div><div class=\"w-20 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">Count</div><div class=\"flex-1 text-[10px] text-gray-400 font-bold uppercase pl-1\">Distribution</div><div class=\"w-12 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">Pct</div><div class=\"w-24 flex-shrink-0 text-right text-[10px] text-gray-400 font-bold uppercase\">MoM Delta</div></div>", 1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.distribution, (stage) => {
                      return (openBlock(), createElementBlock("div", {
                        key: stage.stage,
                        class: "flex items-center gap-4"
                      }, [
                        createBaseVNode("div", _hoisted_16, [
                          createBaseVNode("span", _hoisted_17, toDisplayString(stage.label), 1)
                        ]),
                        createBaseVNode("div", _hoisted_18, [
                          createBaseVNode("span", _hoisted_19, toDisplayString(stage.count?.toLocaleString()), 1)
                        ]),
                        createBaseVNode("div", _hoisted_20, [
                          createBaseVNode("div", _hoisted_21, [
                            createBaseVNode("div", {
                              class: normalizeClass(['h-full rounded-full', stageBarClass(stage.stage)]),
                              style: normalizeStyle({ width: stage.pct + '%' })
                            }, null, 6)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_22, [
                          createBaseVNode("span", _hoisted_23, toDisplayString(stage.pct) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_24, [
                          (stage.mom_delta > 0)
                            ? (openBlock(), createElementBlock("span", _hoisted_25, "▲ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                            : (stage.mom_delta < 0)
                              ? (openBlock(), createElementBlock("span", _hoisted_26, "▼ " + toDisplayString(Math.abs(stage.mom_delta).toLocaleString()), 1))
                              : (openBlock(), createElementBlock("span", _hoisted_27, "—"))
                        ])
                      ]))
                    }), 128))
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'transitions')
            ? (openBlock(), createElementBlock("div", _hoisted_28, [
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("button", {
                    onClick: _cache[0] || (_cache[0] = $event => (transitionScopeExpanded.value = !transitionScopeExpanded.value)),
                    class: "w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                  }, [
                    _cache[8] || (_cache[8] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-gray-400 flex-shrink-0" }, "info", -1)),
                    _cache[9] || (_cache[9] = createBaseVNode("span", { class: "text-xs font-semibold text-gray-600 flex-1" }, "How to read this heatmap", -1)),
                    createBaseVNode("span", {
                      class: normalizeClass(["material-symbols-outlined text-[18px] text-gray-400 transition-transform", transitionScopeExpanded.value ? 'rotate-180' : ''])
                    }, "expand_more", 2)
                  ]),
                  (transitionScopeExpanded.value)
                    ? (openBlock(), createElementBlock("div", _hoisted_30, [...(_cache[10] || (_cache[10] = [
                        createBaseVNode("p", { class: "text-xs text-gray-500 leading-relaxed" }, [
                          createTextVNode(" This heatmap shows how many customers moved between lifecycle stages in the last 30 days. "),
                          createBaseVNode("strong", { class: "text-absa-enrich" }, "Diagonal cells"),
                          createTextVNode(" represent customers who remained in the same stage. "),
                          createBaseVNode("strong", { class: "text-absa-enrich" }, "Off-diagonal cells"),
                          createTextVNode(" represent transitions — the larger the number, the more significant the movement. ")
                        ], -1)
                      ]))]))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_31, [
                  _cache[12] || (_cache[12] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Stage Transition Heatmap"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Last 30 days — rows = From stage, columns = To stage")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_32, [
                    createBaseVNode("table", _hoisted_33, [
                      createBaseVNode("thead", null, [
                        createBaseVNode("tr", _hoisted_34, [
                          _cache[11] || (_cache[11] = createBaseVNode("th", { class: "px-3 py-1.5 min-w-[120px]" }, "FROM \\ TO", -1)),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(transitionStageLabels.value, (stage, colIdx) => {
                            return (openBlock(), createElementBlock("th", {
                              key: colIdx,
                              class: "px-3 py-3 text-center min-w-[80px]"
                            }, toDisplayString(stage), 1))
                          }), 128))
                        ])
                      ]),
                      createBaseVNode("tbody", _hoisted_35, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.transitions?.matrix, (row, rowIdx) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: rowIdx,
                            class: "hover:bg-gray-50 transition-colors"
                          }, [
                            createBaseVNode("td", _hoisted_36, [
                              createBaseVNode("span", _hoisted_37, toDisplayString(transitionStageLabels.value[rowIdx] ?? 'Stage ' + rowIdx), 1)
                            ]),
                            (openBlock(true), createElementBlock(Fragment, null, renderList(row, (cell, colIdx) => {
                              return (openBlock(), createElementBlock("td", {
                                key: colIdx,
                                class: normalizeClass([
                      'px-3 py-3 text-center text-xs',
                      rowIdx === colIdx
                        ? 'bg-gray-50 text-gray-400 italic'
                        : cell > 1000
                          ? 'bg-red-50 font-bold text-absa-passion'
                          : 'text-absa-enrich'
                    ])
                              }, toDisplayString(cell > 0 ? cell.toLocaleString() : '—'), 3))
                            }), 128))
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'onboarding')
            ? (openBlock(), createElementBlock("div", _hoisted_38, [
                createBaseVNode("div", _hoisted_39, [
                  createBaseVNode("div", _hoisted_40, [
                    _cache[13] || (_cache[13] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "New Customers (MTD)", -1)),
                    createBaseVNode("p", _hoisted_41, toDisplayString(unref(store).lifecycleData?.onboarding?.total_new?.toLocaleString() ?? '—'), 1),
                    _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "This month", -1))
                  ]),
                  createBaseVNode("div", _hoisted_42, [
                    _cache[15] || (_cache[15] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Activated (30D)", -1)),
                    createBaseVNode("p", _hoisted_43, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_30d?.toLocaleString() ?? '—'), 1),
                    createBaseVNode("p", _hoisted_44, toDisplayString(activation30Pct.value) + "% of new", 1)
                  ]),
                  createBaseVNode("div", _hoisted_45, [
                    _cache[16] || (_cache[16] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Activated (60D)", -1)),
                    createBaseVNode("p", _hoisted_46, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_60d?.toLocaleString() ?? '—'), 1),
                    createBaseVNode("p", _hoisted_47, toDisplayString(activation60Pct.value) + "% of new", 1)
                  ]),
                  createBaseVNode("div", _hoisted_48, [
                    _cache[17] || (_cache[17] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Activated (90D)", -1)),
                    createBaseVNode("p", _hoisted_49, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_90d?.toLocaleString() ?? '—'), 1),
                    createBaseVNode("p", _hoisted_50, toDisplayString(activation90Pct.value) + "% of new", 1)
                  ]),
                  createBaseVNode("div", _hoisted_51, [
                    _cache[18] || (_cache[18] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Early At-Risk", -1)),
                    createBaseVNode("p", _hoisted_52, toDisplayString(unref(store).lifecycleData?.onboarding?.early_at_risk?.toLocaleString() ?? '—'), 1),
                    _cache[19] || (_cache[19] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Flagged within 90D", -1))
                  ]),
                  createBaseVNode("div", _hoisted_53, [
                    _cache[20] || (_cache[20] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Avg Products Held", -1)),
                    createBaseVNode("p", _hoisted_54, toDisplayString(unref(store).lifecycleData?.onboarding?.avg_products?.toFixed(1) ?? '—'), 1),
                    _cache[21] || (_cache[21] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Per new customer", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_55, [
                  createBaseVNode("div", _hoisted_56, [
                    _cache[25] || (_cache[25] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Activation Funnel"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "30D / 60D / 90D activation rates for new customers")
                    ], -1)),
                    createBaseVNode("div", _hoisted_57, [
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_58, [
                          _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-xs font-bold text-absa-enrich" }, "30-Day Activation", -1)),
                          createBaseVNode("p", _hoisted_59, toDisplayString(activation30Pct.value) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_60, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: activation30Pct.value + '%' })
                          }, null, 4)
                        ]),
                        createBaseVNode("p", _hoisted_61, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_30d?.toLocaleString()) + " customers activated within 30 days", 1)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_62, [
                          _cache[23] || (_cache[23] = createBaseVNode("p", { class: "text-xs font-bold text-absa-enrich" }, "60-Day Activation", -1)),
                          createBaseVNode("p", _hoisted_63, toDisplayString(activation60Pct.value) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_64, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: activation60Pct.value + '%' })
                          }, null, 4)
                        ]),
                        createBaseVNode("p", _hoisted_65, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_60d?.toLocaleString()) + " customers activated within 60 days", 1)
                      ]),
                      createBaseVNode("div", null, [
                        createBaseVNode("div", _hoisted_66, [
                          _cache[24] || (_cache[24] = createBaseVNode("p", { class: "text-xs font-bold text-absa-enrich" }, "90-Day Activation", -1)),
                          createBaseVNode("p", _hoisted_67, toDisplayString(activation90Pct.value) + "%", 1)
                        ]),
                        createBaseVNode("div", _hoisted_68, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: activation90Pct.value + '%' })
                          }, null, 4)
                        ]),
                        createBaseVNode("p", _hoisted_69, toDisplayString(unref(store).lifecycleData?.onboarding?.activated_90d?.toLocaleString()) + " customers activated within 90 days", 1)
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_70, [
                    _cache[28] || (_cache[28] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200" }, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Digital Enrolment"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Online & mobile banking uptake among new customers")
                    ], -1)),
                    createBaseVNode("div", _hoisted_71, [
                      createBaseVNode("p", _hoisted_72, toDisplayString(unref(store).lifecycleData?.onboarding?.digital_enrolled ?? '—') + "% ", 1),
                      _cache[27] || (_cache[27] = createBaseVNode("p", { class: "text-xs text-gray-500 leading-relaxed max-w-[240px]" }, " of new customers enrolled in digital banking within 30 days ", -1)),
                      createBaseVNode("div", _hoisted_73, [
                        createBaseVNode("div", _hoisted_74, [
                          createBaseVNode("div", {
                            class: "h-full bg-absa-passion rounded-full",
                            style: normalizeStyle({ width: (unref(store).lifecycleData?.onboarding?.digital_enrolled ?? 0) + '%' })
                          }, null, 4)
                        ])
                      ]),
                      createBaseVNode("p", _hoisted_75, [
                        _cache[26] || (_cache[26] = createTextVNode(" Target: 80%  ·  ", -1)),
                        createBaseVNode("span", {
                          class: normalizeClass((unref(store).lifecycleData?.onboarding?.digital_enrolled ?? 0) >= 80
                    ? 'text-absa-passion font-bold'
                    : 'text-absa-inspire font-bold')
                        }, toDisplayString((unref(store).lifecycleData?.onboarding?.digital_enrolled ?? 0) >= 80 ? 'ON TRACK' : 'BELOW TARGET'), 3)
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'winback')
            ? (openBlock(), createElementBlock("div", _hoisted_76, [
                createBaseVNode("div", _hoisted_77, [
                  createBaseVNode("div", _hoisted_78, [
                    _cache[29] || (_cache[29] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Win-Back Eligible", -1)),
                    createBaseVNode("p", _hoisted_79, toDisplayString(winBackEligibleCount.value.toLocaleString()), 1),
                    _cache[30] || (_cache[30] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Eligible for campaign", -1))
                  ]),
                  createBaseVNode("div", _hoisted_80, [
                    _cache[31] || (_cache[31] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "In Campaign", -1)),
                    createBaseVNode("p", _hoisted_81, toDisplayString(winBackInCampaignCount.value.toLocaleString()), 1),
                    _cache[32] || (_cache[32] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Active win-back campaigns", -1))
                  ]),
                  createBaseVNode("div", _hoisted_82, [
                    _cache[33] || (_cache[33] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Avg Win-Back Prob", -1)),
                    createBaseVNode("p", _hoisted_83, toDisplayString(avgWinBackProb.value) + "%", 1),
                    _cache[34] || (_cache[34] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Predicted success rate", -1))
                  ]),
                  createBaseVNode("div", _hoisted_84, [
                    _cache[35] || (_cache[35] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Est. Total Win-Back Value", -1)),
                    createBaseVNode("p", _hoisted_85, toDisplayString(estTotalWinBackValue.value), 1),
                    _cache[36] || (_cache[36] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Projected revenue recovery", -1))
                  ])
                ]),
                (selectedWinback.value.size > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_86, [
                      _cache[38] || (_cache[38] = createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "check_box", -1)),
                      createBaseVNode("span", _hoisted_87, toDisplayString(selectedWinback.value.size) + " customer" + toDisplayString(selectedWinback.value.size > 1 ? 's' : '') + " selected", 1),
                      createBaseVNode("div", { class: "flex items-center gap-2 ml-auto" }, [
                        createBaseVNode("button", {
                          onClick: bulkAddToCampaign,
                          class: "px-3 py-1 bg-amber-400 text-absa-enrich rounded-sm text-[11px] font-bold hover:bg-amber-300 transition-colors shadow-none flex items-center gap-1"
                        }, [...(_cache[37] || (_cache[37] = [
                          createBaseVNode("span", { class: "material-symbols-outlined text-[14px]" }, "auto_awesome", -1),
                          createTextVNode("AI Campaign Generator ", -1)
                        ]))]),
                        createBaseVNode("button", {
                          onClick: clearWinbackSelection,
                          class: "px-2 py-1 text-gray-300 hover:text-white text-[11px] font-bold transition-colors"
                        }, "Clear")
                      ])
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_88, [
                  _cache[48] || (_cache[48] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Win-Back Pipeline"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Churned customers ranked by win-back probability and estimated value")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_89, [
                    createBaseVNode("table", _hoisted_90, [
                      createBaseVNode("thead", null, [
                        createBaseVNode("tr", _hoisted_91, [
                          createBaseVNode("th", _hoisted_92, [
                            createBaseVNode("input", {
                              type: "checkbox",
                              checked: allWinbackSelected.value,
                              onChange: toggleWinbackAll,
                              class: "rounded-sm cursor-pointer",
                              title: "Select all eligible"
                            }, null, 40, _hoisted_93)
                          ]),
                          _cache[39] || (_cache[39] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Customer ID", -1)),
                          _cache[40] || (_cache[40] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Name", -1)),
                          _cache[41] || (_cache[41] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Last Product", -1)),
                          _cache[42] || (_cache[42] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Months Since Churn", -1)),
                          _cache[43] || (_cache[43] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Win-Back Prob", -1)),
                          _cache[44] || (_cache[44] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Est. Value", -1)),
                          _cache[45] || (_cache[45] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Status", -1)),
                          _cache[46] || (_cache[46] = createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Action", -1))
                        ])
                      ]),
                      createBaseVNode("tbody", _hoisted_94, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).lifecycleData?.win_back, (w) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: w.customer_id,
                            class: normalizeClass(['transition-colors', selectedWinback.value.has(w.customer_id) ? 'bg-amber-50' : 'hover:bg-gray-50'])
                          }, [
                            createBaseVNode("td", _hoisted_95, [
                              createBaseVNode("input", {
                                type: "checkbox",
                                checked: selectedWinback.value.has(w.customer_id),
                                disabled: w.status !== 'ELIGIBLE',
                                onChange: $event => (toggleWinback(w.customer_id)),
                                class: "rounded-sm cursor-pointer disabled:opacity-30"
                              }, null, 40, _hoisted_96)
                            ]),
                            createBaseVNode("td", _hoisted_97, toDisplayString(w.customer_id), 1),
                            createBaseVNode("td", _hoisted_98, toDisplayString(w.name), 1),
                            createBaseVNode("td", _hoisted_99, toDisplayString(w.last_product), 1),
                            createBaseVNode("td", _hoisted_100, toDisplayString(w.months_churned ?? w.months_since_churn) + "mo", 1),
                            createBaseVNode("td", _hoisted_101, [
                              createBaseVNode("div", _hoisted_102, [
                                createBaseVNode("span", _hoisted_103, toDisplayString((w.prob * 100).toFixed(1)) + "%", 1),
                                createBaseVNode("div", _hoisted_104, [
                                  createBaseVNode("div", {
                                    class: "h-full bg-absa-passion rounded-full",
                                    style: normalizeStyle({ width: (w.prob * 100) + '%' })
                                  }, null, 4)
                                ])
                              ])
                            ]),
                            createBaseVNode("td", _hoisted_105, toDisplayString(w.est_value ?? formatEstValue(w.est_value_num)), 1),
                            createBaseVNode("td", _hoisted_106, [
                              createBaseVNode("span", {
                                class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', winBackStatusClass(w.status)])
                              }, [
                                createBaseVNode("span", {
                                  class: normalizeClass(["w-1 h-1 rounded-full", winBackDotClass(w.status)])
                                }, null, 2),
                                createTextVNode(" " + toDisplayString(w.status), 1)
                              ], 2)
                            ]),
                            createBaseVNode("td", _hoisted_107, [
                              (w.status === 'ELIGIBLE')
                                ? (openBlock(), createElementBlock("button", {
                                    key: 0,
                                    onClick: $event => {campaignCustomers.value = [w]; showCampaignModal.value = true;},
                                    class: "px-3 py-1 bg-absa-passion text-white rounded-sm text-[10px] font-bold hover:bg-absa-power transition-colors shadow-none flex items-center gap-1"
                                  }, [...(_cache[47] || (_cache[47] = [
                                    createBaseVNode("span", { class: "material-symbols-outlined text-[12px]" }, "auto_awesome", -1),
                                    createTextVNode("AI Campaign", -1)
                                  ]))], 8, _hoisted_108))
                                : (w.status === 'IN CAMPAIGN')
                                  ? (openBlock(), createElementBlock("button", {
                                      key: 1,
                                      onClick: $event => (viewCampaign(w)),
                                      class: "px-3 py-1 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm text-[10px] font-bold hover:bg-gray-50 transition-colors shadow-none"
                                    }, "View Campaign", 8, _hoisted_109))
                                  : (openBlock(), createElementBlock("span", _hoisted_110, "—"))
                            ])
                          ], 2))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true)
        ], 64)),
    createVNode(AiCampaignModal, {
      modelValue: showCampaignModal.value,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((showCampaignModal).value = $event)),
      customers: campaignCustomers.value,
      "source-context": "win-back",
      onCampaignLaunched: _cache[2] || (_cache[2] = $event => (selectedWinback.value = new Set()))
    }, null, 8, ["modelValue", "customers"])
  ]))
}
}

};

export { _sfc_main as default };
