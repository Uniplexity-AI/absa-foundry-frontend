import './auto-c3br2bSj.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-Cu_C531j.js';
import { u as useIntelligenceStore } from './intelligenceStore-B09kGDv9.js';
import { n as notify, d as downloadCsv, r as reportFilename } from './absaExport-9YOJ9Gpg.js';
import { a as formatDate } from './formatting-wctwG9eb.js';
import { useSnapshotStore } from './snapshotStore-xpPDqh7a.js';
import { C as Chart } from './chart-D1QGMS6v.js';
import { r as ref, i as computed, f as onMounted, P as nextTick, M as watch, c as createElementBlock, b as createBaseVNode, t as toDisplayString, A as createTextVNode, q as createVNode, s as unref, F as Fragment, e as renderList, a as createStaticVNode, j as createCommentVNode, h as normalizeClass, o as openBlock, n as normalizeStyle } from './index-Dxw7beKB.js';

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" };
const _hoisted_3 = { class: "flex items-center gap-3" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_6 = {
  key: 0,
  class: "mt-6"
};
const _hoisted_7 = {
  key: 1,
  class: "mt-6 rounded-sm border border-gray-300 bg-white p-8 text-center"
};
const _hoisted_8 = { class: "text-[12px] text-gray-500 mt-1" };
const _hoisted_9 = { class: "flex border-b border-gray-300 mb-6 mt-6" };
const _hoisted_10 = ["onClick"];
const _hoisted_11 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" };
const _hoisted_14 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_15 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_16 = { class: "text-[11px] text-gray-500 mt-1" };
const _hoisted_17 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_18 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_19 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_20 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_21 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_22 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_23 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_24 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" };
const _hoisted_25 = { class: "flex items-center gap-1" };
const _hoisted_26 = ["onClick"];
const _hoisted_27 = { class: "p-5" };
const _hoisted_28 = { class: "relative h-[320px]" };
const _hoisted_29 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_30 = { key: 0 };
const _hoisted_31 = { class: "overflow-x-auto" };
const _hoisted_32 = { class: "w-full text-left border-collapse" };
const _hoisted_33 = { class: "divide-y divide-gray-100" };
const _hoisted_34 = { class: "px-3 py-1.5" };
const _hoisted_35 = { class: "text-xs font-semibold text-absa-enrich" };
const _hoisted_36 = {
  key: 0,
  class: "ml-2 text-[10px] bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-sm font-bold"
};
const _hoisted_37 = { class: "px-3 py-1.5" };
const _hoisted_38 = { class: "text-xs font-mono text-absa-passion font-bold" };
const _hoisted_39 = { class: "px-3 py-1.5" };
const _hoisted_40 = { class: "text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_41 = { class: "px-3 py-1.5" };
const _hoisted_42 = { class: "text-xs font-mono text-absa-passion font-bold" };
const _hoisted_43 = { class: "px-3 py-1.5" };
const _hoisted_44 = { class: "text-xs font-mono text-gray-500" };
const _hoisted_45 = { key: 1 };
const _hoisted_46 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_47 = { class: "p-5" };
const _hoisted_48 = { class: "flex justify-between items-center mb-1.5" };
const _hoisted_49 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_50 = { class: "text-[11px] text-absa-passion font-bold" };
const _hoisted_51 = { class: "mb-1" };
const _hoisted_52 = { class: "flex items-center gap-2" };
const _hoisted_53 = { class: "flex-1 h-3 bg-gray-100 rounded-sm overflow-hidden" };
const _hoisted_54 = { class: "text-[11px] font-mono text-absa-enrich w-16 text-right" };
const _hoisted_55 = { class: "flex items-center gap-2" };
const _hoisted_56 = { class: "flex-1 h-3 bg-gray-100 rounded-sm overflow-hidden" };
const _hoisted_57 = { class: "text-[11px] font-mono text-absa-passion w-16 text-right" };
const _hoisted_58 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_59 = { class: "overflow-x-auto" };
const _hoisted_60 = { class: "w-full text-left border-collapse" };
const _hoisted_61 = { class: "divide-y divide-gray-100" };
const _hoisted_62 = { class: "px-3 py-1.5 text-xs font-semibold text-absa-enrich" };
const _hoisted_63 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_64 = { class: "px-3 py-1.5 text-xs text-absa-enrich" };
const _hoisted_65 = { class: "px-3 py-1.5 text-xs font-bold font-mono text-absa-passion" };
const _hoisted_66 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_67 = { key: 2 };
const _hoisted_68 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_69 = {
  key: 0,
  class: "px-4 pb-3 pt-0 border-t border-gray-100"
};
const _hoisted_70 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_71 = { class: "overflow-x-auto" };
const _hoisted_72 = { class: "w-full text-left border-collapse" };
const _hoisted_73 = { class: "divide-y divide-gray-100" };
const _hoisted_74 = {
  key: 0,
  class: "ml-2 inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-gray-200 text-gray-500"
};
const _hoisted_75 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };


const _sfc_main = {
  __name: 'BalanceForecast',
  setup(__props) {

const store = useIntelligenceStore();
const snapshotStore = useSnapshotStore();
const loading = ref(true);
const activeTab = ref('forecast');
const forecastHorizon = ref(90);
const ciExpanded = ref(true);
const sensitivityExpanded = ref(true);
const forecastCanvas = ref(null);
let chartInstance = null;

const forecast = computed(() => store.forecastData ?? null);

// No dummy values: every figure on this page comes from the forecast endpoint,
// so an absent/empty payload must read as "unavailable", not as a stand-in.
const forecastUnavailable = computed(
  () => !store.forecastData || store.forecastData.status === 'NO_DATA' || !!store.error?.forecast
);

const tabs = [
  { id: 'forecast',    label: 'Forecast',    icon: 'show_chart' },
  { id: 'by_segment', label: 'By Segment',   icon: 'bar_chart'  },
  { id: 'sensitivity', label: 'Sensitivity', icon: 'tune'       },
];

function formatAum(val) {
  if (val === null || val === undefined) return '—'
  if (Math.abs(val) >= 1e9) return 'K' + (val / 1e9).toFixed(2) + 'B'
  if (Math.abs(val) >= 1e6) return 'K' + (val / 1e6).toFixed(0) + 'M'
  return 'K' + val.toLocaleString()
}

function segBarWidth(value, seg) {
  const max = seg.current_aum || 1;
  return Math.max(2, Math.min(100, (value / max) * 100))
}

// ─── Run Forecast Model ───────────────────────────────────────────────────────

const runningForecast = ref(false);

async function runForecastModel() {
  if (runningForecast.value) return
  runningForecast.value = true;
  try {
    const summary = await store.runForecastModel();
    if (summary?.status === 'MODEL_NOT_LOADED') {
      notify('Balance Growth model is not loaded — no predictions were produced', 'error', { autoClose: 6000 });
      return
    }
    if (summary?.status === 'NO_DATA') {
      notify(`No feature data for ${snapshotStore.asOfDate}`, 'error', { autoClose: 6000 });
      return
    }
    const n = summary?.customers_scored ?? 0;
    const meanGrowth = summary?.mean_balance_growth_pct ?? 0;
    notify(
      `Balance Growth model ran for ${n} customers · mean growth ${meanGrowth > 0 ? '+' : ''}${(meanGrowth).toFixed(2)}%`,
      'success',
      { autoClose: 5000 },
    );
    // Re-fetch the forecast so the chart updates immediately with the new ML scores
    await store.fetchForecast();
    await nextTick();
    renderChart();
  } catch (e) {
    notify(e?.message || 'Forecast model run failed', 'error', { autoClose: 6000 });
  } finally {
    runningForecast.value = false;
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportReport() {
  const which = activeTab.value;
  const f = store.forecastData ?? {};
  if (which === 'forecast') {
    const cps = f.ci_checkpoints ?? [];
    const rows = cps.length
      ? cps
      : (f.labels ?? []).map((lbl, i) => ({
          checkpoint: lbl,
          optimistic: f.scenarios?.optimistic?.[i],
          base: f.scenarios?.base?.[i],
          pessimistic: f.scenarios?.pessimistic?.[i],
        }));
    downloadCsv(reportFilename('aum-forecast'), rows);
  } else if (which === 'by_segment') {
    downloadCsv(reportFilename('forecast-by-segment'), f.by_segment ?? [], ['segment', 'current_aum', 'projected_remaining', 'aum_at_risk', 'projected_exits', 'pct_change']);
  } else {
    downloadCsv(reportFilename('forecast-sensitivity'), f.sensitivity ?? [], ['scenario', 'churn_assumption', 'projected_aum', 'delta', 'pct_change', 'is_base']);
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 });
}

function renderChart() {
  if (!forecastCanvas.value) return
  const f = store.forecastData;
  const labels      = f?.labels            ?? [];
  const optimistic  = f?.scenarios?.optimistic  ?? [];
  const base        = f?.scenarios?.base        ?? [];
  const pessimistic = f?.scenarios?.pessimistic ?? [];
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(forecastCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Optimistic',  data: optimistic,  borderColor: '#DC0037', backgroundColor: 'rgba(220,0,55,0.05)',  tension: 0.4, fill: false, borderWidth: 2, pointRadius: 2 },
        { label: 'Base',        data: base,        borderColor: '#131010', backgroundColor: 'rgba(19,16,16,0.04)',   tension: 0.4, fill: '-1',  borderWidth: 2, pointRadius: 2 },
        { label: 'Pessimistic', data: pessimistic, borderColor: '#77021E', backgroundColor: 'rgba(119,2,30,0.05)',  tension: 0.4, fill: false, borderWidth: 2, pointRadius: 2, borderDash: [4,4] },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
        y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af', callback: (v) => formatAum(Number(v)) } },
      },
    },
  });
}

onMounted(async () => {
  await store.fetchForecast();
  loading.value = false;
  await nextTick();
  renderChart();
});

watch(() => store.forecastData, async () => {
  await nextTick();
  renderChart();
});

watch(activeTab, async (val) => {
  if (val === 'forecast') {
    await nextTick();
    renderChart();
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _cache[3] || (_cache[3] = createBaseVNode("div", null, [
        createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
          createBaseVNode("span", null, "Home"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", null, "Intelligence"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Balance Forecast")
        ]),
        createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "AUM Balance Forecast"),
        createBaseVNode("p", { class: "text-body-md text-gray-500 mt-1" }, "Projected portfolio value under optimistic, base, and pessimistic churn scenarios")
      ], -1)),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("button", {
          onClick: runForecastModel,
          disabled: runningForecast.value,
          class: "px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none disabled:opacity-50"
        }, [
          createBaseVNode("span", _hoisted_5, toDisplayString(runningForecast.value ? 'hourglass_top' : 'model_training'), 1),
          createTextVNode(" " + toDisplayString(runningForecast.value ? 'Running…' : 'Run Forecast Model'), 1)
        ], 8, _hoisted_4),
        createBaseVNode("button", {
          onClick: exportReport,
          class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none"
        }, [...(_cache[2] || (_cache[2] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "download", -1),
          createTextVNode(" Export Report ", -1)
        ]))])
      ])
    ]),
    (loading.value)
      ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createVNode(_sfc_main$1, { type: "stats" })
        ]))
      : (forecastUnavailable.value)
        ? (openBlock(), createElementBlock("div", _hoisted_7, [
            _cache[4] || (_cache[4] = createBaseVNode("span", { class: "material-symbols-outlined text-[32px] text-gray-400" }, "cloud_off", -1)),
            _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-sm font-bold text-absa-enrich mt-2" }, "Balance forecast unavailable", -1)),
            createBaseVNode("p", _hoisted_8, toDisplayString(unref(store).error?.forecast || 'No feature snapshot exists for the selected as-of date.'), 1)
          ]))
        : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
            createBaseVNode("div", _hoisted_9, [
              (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
                return createBaseVNode("button", {
                  key: tab.id,
                  onClick: $event => (activeTab.value = tab.id),
                  class: normalizeClass(['px-3 py-1.5 text-sm flex items-center gap-2 transition-colors font-semibold',
            activeTab.value === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich'])
                }, [
                  createBaseVNode("span", _hoisted_11, toDisplayString(tab.icon), 1),
                  createTextVNode(" " + toDisplayString(tab.label), 1)
                ], 10, _hoisted_10)
              }), 64))
            ]),
            (activeTab.value === 'forecast')
              ? (openBlock(), createElementBlock("div", _hoisted_12, [
                  createBaseVNode("div", _hoisted_13, [
                    createBaseVNode("div", _hoisted_14, [
                      _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "CURRENT AUM", -1)),
                      createBaseVNode("p", _hoisted_15, toDisplayString(formatAum(forecast.value?.current_aum)), 1),
                      createBaseVNode("p", _hoisted_16, toDisplayString(forecast.value?.as_of_date ? `As of ${unref(formatDate)(forecast.value.as_of_date)}` : 'No snapshot'), 1)
                    ]),
                    createBaseVNode("div", _hoisted_17, [
                      _cache[7] || (_cache[7] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "BASE SCENARIO (90D)", -1)),
                      createBaseVNode("p", _hoisted_18, toDisplayString(formatAum(forecast.value?.base_scenario_aum_90d)), 1),
                      _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Projected end of period", -1))
                    ]),
                    createBaseVNode("div", _hoisted_19, [
                      _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "AUM AT RISK", -1)),
                      createBaseVNode("p", _hoisted_20, toDisplayString(formatAum(forecast.value?.aum_at_risk)), 1),
                      _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Base vs current delta", -1))
                    ]),
                    createBaseVNode("div", _hoisted_21, [
                      _cache[11] || (_cache[11] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "BEST CASE (90D)", -1)),
                      createBaseVNode("p", _hoisted_22, toDisplayString(formatAum(forecast.value?.best_case_aum_90d)), 1),
                      _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "If churn improves 2pp", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_23, [
                    createBaseVNode("div", _hoisted_24, [
                      _cache[13] || (_cache[13] = createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Portfolio AUM Trajectory — 90-Day Forecast"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Scenario projections based on current churn assumptions")
                      ], -1)),
                      createBaseVNode("div", _hoisted_25, [
                        (openBlock(), createElementBlock(Fragment, null, renderList([30, 60, 90], (h) => {
                          return createBaseVNode("button", {
                            key: h,
                            onClick: $event => (forecastHorizon.value = h),
                            class: normalizeClass(['px-3 py-1.5 text-xs font-semibold rounded-sm transition-colors',
                  forecastHorizon.value === h
                    ? 'bg-absa-enrich text-absa-serene'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'])
                          }, toDisplayString(h) + "D", 11, _hoisted_26)
                        }), 64))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_27, [
                      createBaseVNode("div", _hoisted_28, [
                        createBaseVNode("canvas", {
                          ref_key: "forecastCanvas",
                          ref: forecastCanvas,
                          class: "w-full h-[320px]"
                        }, null, 512)
                      ]),
                      _cache[14] || (_cache[14] = createStaticVNode("<div class=\"flex items-center gap-6 mt-4 justify-center\"><div class=\"flex items-center gap-2\"><span class=\"w-3 h-3 rounded-full bg-absa-passion inline-block\"></span><span class=\"text-[11px] text-gray-500 font-semibold\">Optimistic</span></div><div class=\"flex items-center gap-2\"><span class=\"w-3 h-3 rounded-full bg-absa-enrich inline-block\"></span><span class=\"text-[11px] text-gray-500 font-semibold\">Base</span></div><div class=\"flex items-center gap-2\"><span class=\"w-3 h-3 rounded-full bg-absa-passion inline-block\"></span><span class=\"text-[11px] text-gray-500 font-semibold\">Pessimistic</span></div></div>", 1))
                    ])
                  ])
                ]))
              : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_29, [
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = $event => (ciExpanded.value = !ciExpanded.value)),
                class: "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors bg-gray-50 border-b border-gray-200"
              }, [
                _cache[15] || (_cache[15] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-gray-400" }, "analytics", -1)),
                _cache[16] || (_cache[16] = createBaseVNode("span", { class: "text-sm font-bold text-absa-enrich flex-1" }, "80% Confidence Interval Checkpoints", -1)),
                createBaseVNode("span", {
                  class: normalizeClass(["material-symbols-outlined text-[18px] text-gray-400 transition-transform", ciExpanded.value ? 'rotate-180' : ''])
                }, "expand_more", 2)
              ]),
              (ciExpanded.value)
                ? (openBlock(), createElementBlock("div", _hoisted_30, [
                    _cache[18] || (_cache[18] = createBaseVNode("div", { class: "px-4 py-2.5 bg-white border-b border-gray-100 flex items-start gap-2" }, [
                      createBaseVNode("span", { class: "material-symbols-outlined text-[14px] text-gray-400 mt-0.5 flex-shrink-0" }, "info"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 leading-relaxed" }, [
                        createTextVNode("The "),
                        createBaseVNode("strong", { class: "text-absa-enrich" }, "80% confidence interval (P10-P90)"),
                        createTextVNode(" around the base projection. Computed analytically from the sum of independent per-customer churn outcomes (normal approximation, z = 1.2816) — not a simulation. A wider spread indicates higher uncertainty.")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_31, [
                      createBaseVNode("table", _hoisted_32, [
                        _cache[17] || (_cache[17] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "bg-gray-50 border-b border-gray-200" }, [
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Checkpoint"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-absa-passion uppercase tracking-wider" }, "P10 (Pessimistic)"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-absa-enrich uppercase tracking-wider" }, "Base Projection"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-absa-passion uppercase tracking-wider" }, "P90 (Optimistic)"),
                            createBaseVNode("th", { class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider" }, "Range Width")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_33, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList((unref(store).forecastData?.ci_checkpoints ?? []), (cp, i) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: i,
                              class: normalizeClass(i === 0 ? 'bg-gray-50' : 'hover:bg-gray-50 transition-colors')
                            }, [
                              createBaseVNode("td", _hoisted_34, [
                                createBaseVNode("span", _hoisted_35, toDisplayString(cp.label), 1),
                                (i === 0)
                                  ? (openBlock(), createElementBlock("span", _hoisted_36, "NOW"))
                                  : createCommentVNode("", true)
                              ]),
                              createBaseVNode("td", _hoisted_37, [
                                createBaseVNode("span", _hoisted_38, toDisplayString(formatAum(cp.p10)), 1)
                              ]),
                              createBaseVNode("td", _hoisted_39, [
                                createBaseVNode("span", _hoisted_40, toDisplayString(formatAum(cp.base)), 1)
                              ]),
                              createBaseVNode("td", _hoisted_41, [
                                createBaseVNode("span", _hoisted_42, toDisplayString(formatAum(cp.p90)), 1)
                              ]),
                              createBaseVNode("td", _hoisted_43, [
                                createBaseVNode("span", _hoisted_44, toDisplayString(formatAum(cp.p90 - cp.p10)), 1)
                              ])
                            ], 2))
                          }), 128))
                        ])
                      ])
                    ])
                  ]))
                : createCommentVNode("", true)
            ]),
            (activeTab.value === 'by_segment')
              ? (openBlock(), createElementBlock("div", _hoisted_45, [
                  createBaseVNode("div", _hoisted_46, [
                    _cache[21] || (_cache[21] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "AUM by Customer Segment"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Current vs projected remaining AUM across segments")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_47, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList((unref(store).forecastData?.by_segment ?? []), (seg) => {
                        return (openBlock(), createElementBlock("div", {
                          key: seg.segment,
                          class: "mb-5 last:mb-0"
                        }, [
                          createBaseVNode("div", _hoisted_48, [
                            createBaseVNode("span", _hoisted_49, toDisplayString(seg.segment), 1),
                            createBaseVNode("span", _hoisted_50, toDisplayString(formatAum(seg.aum_at_risk)) + " at risk", 1)
                          ]),
                          createBaseVNode("div", _hoisted_51, [
                            createBaseVNode("div", _hoisted_52, [
                              _cache[19] || (_cache[19] = createBaseVNode("span", { class: "text-[10px] text-gray-400 w-20 shrink-0" }, "Current", -1)),
                              createBaseVNode("div", _hoisted_53, [
                                createBaseVNode("div", {
                                  class: "h-full bg-absa-enrich rounded-sm",
                                  style: normalizeStyle({ width: segBarWidth(seg.current_aum, seg) + '%' })
                                }, null, 4)
                              ]),
                              createBaseVNode("span", _hoisted_54, toDisplayString(formatAum(seg.current_aum)), 1)
                            ])
                          ]),
                          createBaseVNode("div", null, [
                            createBaseVNode("div", _hoisted_55, [
                              _cache[20] || (_cache[20] = createBaseVNode("span", { class: "text-[10px] text-gray-400 w-20 shrink-0" }, "Projected", -1)),
                              createBaseVNode("div", _hoisted_56, [
                                createBaseVNode("div", {
                                  class: "h-full bg-absa-passion rounded-sm",
                                  style: normalizeStyle({ width: segBarWidth(seg.projected_remaining, seg) + '%' })
                                }, null, 4)
                              ]),
                              createBaseVNode("span", _hoisted_57, toDisplayString(formatAum(seg.projected_remaining)), 1)
                            ])
                          ])
                        ]))
                      }), 128))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_58, [
                    _cache[23] || (_cache[23] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Segment Breakdown"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Detailed forecast figures by customer segment")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_59, [
                      createBaseVNode("table", _hoisted_60, [
                        _cache[22] || (_cache[22] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Segment"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Current AUM"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Projected Exits"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "AUM at Risk"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Projected Remaining AUM"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "% Change")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_61, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList((unref(store).forecastData?.by_segment ?? []), (seg) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: seg.segment,
                              class: "hover:bg-gray-50 transition-colors"
                            }, [
                              createBaseVNode("td", _hoisted_62, toDisplayString(seg.segment), 1),
                              createBaseVNode("td", _hoisted_63, toDisplayString(formatAum(seg.current_aum)), 1),
                              createBaseVNode("td", _hoisted_64, toDisplayString(seg.projected_exits?.toLocaleString() ?? '—'), 1),
                              createBaseVNode("td", _hoisted_65, toDisplayString(formatAum(seg.aum_at_risk)), 1),
                              createBaseVNode("td", _hoisted_66, toDisplayString(formatAum(seg.projected_remaining)), 1),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-3 py-1.5 text-xs font-bold", seg.pct_change < 0 ? 'text-absa-passion' : 'text-absa-passion'])
                              }, toDisplayString(seg.pct_change > 0 ? '+' : '') + toDisplayString(seg.pct_change?.toFixed(1) ?? '—') + "% ", 3)
                            ]))
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ]))
              : createCommentVNode("", true),
            (activeTab.value === 'sensitivity')
              ? (openBlock(), createElementBlock("div", _hoisted_67, [
                  createBaseVNode("div", _hoisted_68, [
                    createBaseVNode("button", {
                      onClick: _cache[1] || (_cache[1] = $event => (sensitivityExpanded.value = !sensitivityExpanded.value)),
                      class: "w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                    }, [
                      _cache[24] || (_cache[24] = createBaseVNode("span", { class: "material-symbols-outlined text-[18px] text-gray-400" }, "info", -1)),
                      _cache[25] || (_cache[25] = createBaseVNode("span", { class: "text-xs font-semibold text-gray-600 flex-1" }, "How to read the Sensitivity Analysis", -1)),
                      createBaseVNode("span", {
                        class: normalizeClass(["material-symbols-outlined text-[18px] text-gray-400", sensitivityExpanded.value ? 'rotate-180' : ''])
                      }, "expand_more", 2)
                    ]),
                    (sensitivityExpanded.value)
                      ? (openBlock(), createElementBlock("div", _hoisted_69, [...(_cache[26] || (_cache[26] = [
                          createBaseVNode("p", { class: "text-xs text-gray-500 leading-relaxed" }, [
                            createTextVNode("Each row shows a churn scenario vs. the base. "),
                            createBaseVNode("strong", { class: "text-absa-enrich" }, "Delta vs Base"),
                            createTextVNode(" shows the projected AUM gain or loss if actual churn deviates from the base assumption.")
                          ], -1)
                        ]))]))
                      : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_70, [
                    _cache[28] || (_cache[28] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                      createBaseVNode("div", null, [
                        createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Churn Sensitivity Analysis"),
                        createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "90-day AUM outcome across churn rate assumptions")
                      ])
                    ], -1)),
                    createBaseVNode("div", _hoisted_71, [
                      createBaseVNode("table", _hoisted_72, [
                        _cache[27] || (_cache[27] = createBaseVNode("thead", null, [
                          createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Scenario"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Churn Assumption"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Projected AUM (90D)"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "Delta vs Base"),
                            createBaseVNode("th", { class: "px-3 py-1.5" }, "AUM Change %")
                          ])
                        ], -1)),
                        createBaseVNode("tbody", _hoisted_73, [
                          (openBlock(true), createElementBlock(Fragment, null, renderList((unref(store).forecastData?.sensitivity ?? []), (row) => {
                            return (openBlock(), createElementBlock("tr", {
                              key: row.scenario,
                              class: normalizeClass(['hover:bg-gray-50 transition-colors', row.is_base ? 'bg-gray-50 font-bold' : ''])
                            }, [
                              createBaseVNode("td", {
                                class: normalizeClass(["px-3 py-1.5 text-xs text-absa-enrich", row.is_base ? 'font-bold' : ''])
                              }, [
                                createTextVNode(toDisplayString(row.scenario) + " ", 1),
                                (row.is_base)
                                  ? (openBlock(), createElementBlock("span", _hoisted_74, "BASE"))
                                  : createCommentVNode("", true)
                              ], 2),
                              createBaseVNode("td", _hoisted_75, toDisplayString(row.churn_assumption), 1),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-3 py-1.5 text-xs font-mono text-absa-enrich", row.is_base ? 'font-bold' : ''])
                              }, toDisplayString(formatAum(row.projected_aum)), 3),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-3 py-1.5 text-xs font-bold font-mono", row.delta >= 0 ? 'text-absa-passion' : 'text-absa-passion'])
                              }, toDisplayString(row.delta >= 0 ? '+' : '') + toDisplayString(formatAum(row.delta)), 3),
                              createBaseVNode("td", {
                                class: normalizeClass(["px-3 py-1.5 text-xs font-bold", row.pct_change >= 0 ? 'text-absa-passion' : 'text-absa-passion'])
                              }, toDisplayString(row.pct_change >= 0 ? '+' : '') + toDisplayString(row.pct_change?.toFixed(1) ?? '—') + "% ", 3)
                            ], 2))
                          }), 128))
                        ])
                      ])
                    ])
                  ])
                ]))
              : createCommentVNode("", true)
          ], 64))
  ]))
}
}

};

export { _sfc_main as default };
