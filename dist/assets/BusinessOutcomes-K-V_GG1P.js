import './auto-c3br2bSj.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-VRjV--zM.js';
import { u as useIntelligenceStore } from './intelligenceStore-DGA33dZU.js';
import { useSnapshotStore } from './snapshotStore-CCIEAf0O.js';
import { d as downloadCsv, r as reportFilename, n as notify, t as todayLabel, a as downloadMarkdown, s as stamp } from './absaExport-BCibbamN.js';
import { C as Chart } from './chart-D1QGMS6v.js';
import { r as ref, f as onMounted, S as nextTick, M as watch, c as createElementBlock, b as createBaseVNode, A as createTextVNode, q as createVNode, F as Fragment, e as renderList, t as toDisplayString, s as unref, j as createCommentVNode, a as createStaticVNode, o as openBlock, h as normalizeClass } from './index-D7z0QEXH.js';

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = {
  key: 0,
  class: "mt-6"
};
const _hoisted_3 = { class: "flex border-b border-gray-300 mb-6 mt-6" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = { class: "material-symbols-outlined text-[18px]" };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { class: "grid grid-cols-2 md:grid-cols-5 gap-4 mb-6" };
const _hoisted_8 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_9 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_10 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_11 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_12 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_13 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_14 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_15 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_16 = { class: "bg-white border border-gray-300 rounded-sm p-4" };
const _hoisted_17 = { class: "text-2xl font-bold font-mono text-absa-passion" };
const _hoisted_18 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_19 = { class: "p-5" };
const _hoisted_20 = { class: "relative h-[240px]" };
const _hoisted_21 = { key: 1 };
const _hoisted_22 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_23 = { class: "overflow-x-auto" };
const _hoisted_24 = { class: "w-full text-left border-collapse" };
const _hoisted_25 = { class: "divide-y divide-gray-100" };
const _hoisted_26 = { class: "px-3 py-1.5 text-xs font-semibold text-absa-enrich" };
const _hoisted_27 = { class: "px-3 py-1.5 text-xs text-absa-enrich" };
const _hoisted_28 = { class: "px-3 py-1.5 text-xs text-absa-enrich" };
const _hoisted_29 = { class: "px-3 py-1.5 text-xs text-absa-enrich" };
const _hoisted_30 = { class: "px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_31 = { class: "px-3 py-1.5 text-xs font-bold" };
const _hoisted_32 = { key: 2 };
const _hoisted_33 = { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" };
const _hoisted_34 = { class: "overflow-x-auto" };
const _hoisted_35 = { class: "w-full text-left border-collapse" };
const _hoisted_36 = { class: "divide-y divide-gray-100" };
const _hoisted_37 = { class: "px-3 py-1.5 text-xs text-absa-enrich leading-relaxed" };
const _hoisted_38 = { class: "px-3 py-1.5 text-xs font-mono text-absa-enrich" };
const _hoisted_39 = { class: "px-3 py-1.5 text-xs font-mono font-bold text-absa-enrich" };
const _hoisted_40 = { class: "px-3 py-1.5" };
const _hoisted_41 = { key: 3 };


const _sfc_main = {
  __name: 'BusinessOutcomes',
  setup(__props) {

const store = useIntelligenceStore();
const snapshotStore = useSnapshotStore();
const loading = ref(true);
const activeTab = ref('roi');
let roiChart = null;

function formatK(val) {
  if (val == null) return '—'
  if (typeof val === 'string') return val
  if (Math.abs(val) >= 1e9) return 'K ' + (val / 1e9).toFixed(2) + 'B'
  if (Math.abs(val) >= 1e6) return 'K ' + (val / 1e6).toFixed(1) + 'M'
  if (Math.abs(val) >= 1e3) return 'K ' + (val / 1e3).toFixed(1) + 'K'
  return 'K ' + val.toLocaleString()
}
const roiCanvas = ref(null);

// ─── Export / Business Case ──────────────────────────────────────────────────

function exportReport() {
  const retention = store.outcomesData?.retention_performance ?? [];
  const criteria = store.outcomesData?.success_criteria ?? [];
  const trend = store.outcomesData?.roi?.trend ?? [];
  const pilot = store.outcomesData?.pilot_vs_control ?? [];
  const which = activeTab.value;
  if (which === 'retention') {
    downloadCsv(reportFilename('retention-performance'), retention, ['entity', 'at_risk', 'contacted', 'retained', 'churned_despite', 'revenue_protected', 'retention_rate']);
  } else if (which === 'criteria') {
    downloadCsv(reportFilename('success-criteria'), criteria, ['criterion', 'target', 'current', 'delta', 'status']);
  } else if (which === 'pilot') {
    downloadCsv(reportFilename('pilot-vs-control'), pilot, ['metric', 'pilot', 'control', 'delta', 'significance']);
  } else {
    downloadCsv(reportFilename('revenue-protected-trend'), trend.map(t => ({ ...t, revenue_m: (t.revenue / 1e6).toFixed(1) })), ['month', 'revenue', 'revenue_m']);
  }
  notify('Report exported as CSV', 'success', { autoClose: 2500 });
}

function downloadBusinessCase() {
  const md = [
    '# ABSA Foundry — Business Outcomes & ROI',
    '',
    `Generated: ${todayLabel()}  ·  As-of: ${snapshotStore.asOfDate}`,
    '',
    '## Headline ROI',
    `- Revenue Protected (MTD): **${formatK(store.outcomesData?.roi?.revenue_protected)}**`,
    `- Customers Retained: **${store.outcomesData?.roi?.customers_retained?.toLocaleString() ?? '—'}**`,
    `- Intervention Cost: **${formatK(store.outcomesData?.roi?.intervention_cost)}**`,
    `- Net ROI: **${store.outcomesData?.roi?.net_roi_pct?.toLocaleString() ?? '—'}%**`,
    `- System ROI Multiple: **${store.outcomesData?.roi?.roi_multiple?.toLocaleString() ?? '—'}×**`,
    '',
    '## Retention Performance by Branch / Entity',
    ...((store.outcomesData?.retention_performance ?? []).map(r =>
      `- ${r.entity}: flagged ${r.at_risk}, contacted ${r.contacted}, retained ${r.retained} (${r.retention_rate}%)`
    )),
    '',
    '## Success Criteria',
    ...((store.outcomesData?.success_criteria ?? []).map(c =>
      `- [${c.status}] ${c.criterion} — current ${c.current} (target ${c.target})`
    )),
    '',
    '## Pilot vs Control',
    '- Pilot branches: monthly churn **5.1%**, retention **74%**',
    '- Control branches: monthly churn **7.8%**, retention **58%**',
    '- Result: statistically significant (p < 0.05)',
    '',
    '_ABSA Foundry — Customer Lifecycle AI (PoC) report._',
  ].join('\n');
  downloadMarkdown(`absa-business-case-${stamp()}.md`, md);
  notify('Business case downloaded (Markdown)', 'success', { autoClose: 2500 });
}

const tabs = [
  { id: 'roi',       label: 'ROI Summary',          icon: 'trending_up' },
  { id: 'retention', label: 'Retention Performance', icon: 'verified'    },
  { id: 'criteria',  label: 'Success Criteria',      icon: 'checklist'   },
  { id: 'pilot',     label: 'Pilot vs Control',      icon: 'compare'     },
];

function statusBadgeClass(s) {
  if (s === 'MET' || s === 'ON TRACK') return 'bg-red-50 text-absa-passion'
  if (s === 'MONITOR') return 'bg-red-50 text-absa-power'
  if (s === 'AT RISK') return 'bg-red-100 text-absa-passion'
  return 'bg-gray-100 text-gray-500'
}

function statusDotClass(s) {
  if (s === 'MET' || s === 'ON TRACK') return 'bg-absa-passion'
  if (s === 'MONITOR') return 'bg-absa-power'
  if (s === 'AT RISK') return 'bg-absa-passion'
  return 'bg-gray-400'
}

function retentionRateClass(rate) {
  if (rate === null || rate === undefined) return 'text-gray-400'
  if (rate >= 75) return 'text-absa-passion'
  if (rate >= 60) return 'text-absa-power'
  return 'text-absa-passion'
}

function isDeltaPositive(delta) {
  if (!delta) return true
  const s = String(delta);
  if (s === 'On time' || s === 'Done') return true
  return !s.startsWith('-')
}

function renderRoiChart() {
  if (!roiCanvas.value) return
  if (roiChart) roiChart.destroy();
  const trend = store.outcomesData?.roi?.trend ?? [];
  roiChart = new Chart(roiCanvas.value, {
    type: 'bar',
    data: {
      labels: trend.map(t => t.month),
      datasets: [{
        label: 'Revenue Protected',
        data: trend.map(t => t.revenue / 1e6),
        backgroundColor: '#DC0037',
        borderRadius: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => 'K' + ctx.parsed.y.toFixed(1) + 'M' } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
        y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af', callback: v => 'K' + Number(v).toFixed(0) + 'M' } },
      },
    },
  });
}

onMounted(async () => {
  await store.fetchOutcomes();
  loading.value = false;
  await nextTick();
  renderRoiChart();
});

watch(activeTab, async (val) => {
  if (val === 'roi') {
    await nextTick();
    renderRoiChart();
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", { class: "mb-0 pb-4 border-b border-gray-300 flex justify-between items-end" }, [
      _cache[2] || (_cache[2] = createBaseVNode("div", null, [
        createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
          createBaseVNode("span", null, "Home"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", null, "Intelligence"),
          createBaseVNode("span", null, "/"),
          createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Business Outcomes")
        ]),
        createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Business Outcomes & ROI"),
        createBaseVNode("p", { class: "text-body-md text-gray-500 mt-1" }, "Retention ROI, revenue protected, success criteria tracking, and pilot performance")
      ], -1)),
      createBaseVNode("div", { class: "flex items-center gap-3" }, [
        createBaseVNode("button", {
          onClick: exportReport,
          class: "px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm font-semibold shadow-none"
        }, [...(_cache[0] || (_cache[0] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "download", -1),
          createTextVNode(" Export Report ", -1)
        ]))]),
        createBaseVNode("button", {
          onClick: downloadBusinessCase,
          class: "px-4 py-2 bg-absa-passion text-absa-serene rounded-sm flex items-center gap-2 hover:bg-absa-power transition-colors text-sm font-semibold shadow-none"
        }, [...(_cache[1] || (_cache[1] = [
          createBaseVNode("span", { class: "material-symbols-outlined text-[16px]" }, "description", -1),
          createTextVNode(" Download Business Case ", -1)
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
          (activeTab.value === 'roi')
            ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("div", _hoisted_8, [
                    _cache[3] || (_cache[3] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "REVENUE PROTECTED", -1)),
                    createBaseVNode("p", _hoisted_9, toDisplayString(formatK(unref(store).outcomesData?.roi?.revenue_protected)), 1),
                    _cache[4] || (_cache[4] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Cumulative MTD", -1))
                  ]),
                  createBaseVNode("div", _hoisted_10, [
                    _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "CUSTOMERS RETAINED", -1)),
                    createBaseVNode("p", _hoisted_11, toDisplayString(unref(store).outcomesData?.roi?.customers_retained?.toLocaleString() ?? '—'), 1),
                    _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Via AI interventions", -1))
                  ]),
                  createBaseVNode("div", _hoisted_12, [
                    _cache[7] || (_cache[7] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "INTERVENTION COST", -1)),
                    createBaseVNode("p", _hoisted_13, toDisplayString(formatK(unref(store).outcomesData?.roi?.intervention_cost)), 1),
                    _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Total campaign + RM cost", -1))
                  ]),
                  createBaseVNode("div", _hoisted_14, [
                    _cache[9] || (_cache[9] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "NET ROI", -1)),
                    createBaseVNode("p", _hoisted_15, toDisplayString(unref(store).outcomesData?.roi?.net_roi_pct?.toLocaleString() ?? '—') + "%", 1),
                    _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "Revenue protected ÷ cost", -1))
                  ]),
                  createBaseVNode("div", _hoisted_16, [
                    _cache[11] || (_cache[11] = createBaseVNode("p", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "SYSTEM ROI MULTIPLE", -1)),
                    createBaseVNode("p", _hoisted_17, toDisplayString(unref(store).outcomesData?.roi?.roi_multiple?.toLocaleString() ?? '—') + "×", 1),
                    _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-1" }, "K returned per K1 spent", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_18, [
                  _cache[13] || (_cache[13] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Monthly Revenue Protected"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Cumulative revenue saved through AI-driven retention interventions")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, [
                      createBaseVNode("canvas", {
                        ref_key: "roiCanvas",
                        ref: roiCanvas,
                        class: "w-full h-[240px]"
                      }, null, 512)
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'retention')
            ? (openBlock(), createElementBlock("div", _hoisted_21, [
                createBaseVNode("div", _hoisted_22, [
                  _cache[15] || (_cache[15] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Retention Performance by Branch / Entity"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Outcomes from AI-flagged intervention workflow")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_23, [
                    createBaseVNode("table", _hoisted_24, [
                      _cache[14] || (_cache[14] = createBaseVNode("thead", null, [
                        createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Branch / Entity"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "At-Risk Flagged"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Contacted"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Retained"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Churned Despite Intervention"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Revenue Protected"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Retention Rate")
                        ])
                      ], -1)),
                      createBaseVNode("tbody", _hoisted_25, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList((unref(store).outcomesData?.retention_performance ?? []), (row) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: row.entity,
                            class: "hover:bg-gray-50 transition-colors"
                          }, [
                            createBaseVNode("td", _hoisted_26, toDisplayString(row.entity), 1),
                            createBaseVNode("td", _hoisted_27, toDisplayString(row.at_risk?.toLocaleString() ?? '—'), 1),
                            createBaseVNode("td", _hoisted_28, toDisplayString(row.contacted?.toLocaleString() ?? '—'), 1),
                            createBaseVNode("td", _hoisted_29, toDisplayString(row.retained?.toLocaleString() ?? '—'), 1),
                            createBaseVNode("td", {
                              class: normalizeClass(["px-3 py-1.5 text-xs font-semibold", row.churned_despite > 50 ? 'text-absa-passion' : 'text-absa-enrich'])
                            }, toDisplayString(row.churned_despite?.toLocaleString() ?? '—'), 3),
                            createBaseVNode("td", _hoisted_30, toDisplayString(row.revenue_protected ?? '—'), 1),
                            createBaseVNode("td", _hoisted_31, [
                              createBaseVNode("span", {
                                class: normalizeClass(retentionRateClass(row.retention_rate))
                              }, toDisplayString(row.retention_rate ?? '—') + "%", 3)
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'criteria')
            ? (openBlock(), createElementBlock("div", _hoisted_32, [
                _cache[18] || (_cache[18] = createBaseVNode("div", { class: "rounded-sm border border-gray-300 overflow-hidden mb-6" }, [
                  createBaseVNode("div", { class: "px-5 py-4 flex items-start gap-3" }, [
                    createBaseVNode("span", { class: "material-symbols-outlined text-[20px] text-gray-400 mt-0.5" }, "info"),
                    createBaseVNode("p", { class: "text-xs text-gray-500 leading-relaxed" }, " The following success criteria were formally agreed with ABSA at project inception. This tracker provides a live view of delivery against contract commitments. ")
                  ])
                ], -1)),
                createBaseVNode("div", _hoisted_33, [
                  _cache[17] || (_cache[17] = createBaseVNode("div", { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createBaseVNode("div", null, [
                      createBaseVNode("h2", { class: "text-sm font-bold text-absa-enrich" }, "Success Criteria Tracker"),
                      createBaseVNode("p", { class: "text-[11px] text-gray-500 mt-0.5" }, "Live status against contractual delivery commitments")
                    ])
                  ], -1)),
                  createBaseVNode("div", _hoisted_34, [
                    createBaseVNode("table", _hoisted_35, [
                      _cache[16] || (_cache[16] = createBaseVNode("thead", null, [
                        createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, [
                          createBaseVNode("th", { class: "px-3 py-1.5 w-2/5" }, "Success Criterion"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Target"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Current"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Delta"),
                          createBaseVNode("th", { class: "px-3 py-1.5" }, "Status")
                        ])
                      ], -1)),
                      createBaseVNode("tbody", _hoisted_36, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList((unref(store).outcomesData?.success_criteria ?? []), (row) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: row.criterion,
                            class: "hover:bg-gray-50 transition-colors"
                          }, [
                            createBaseVNode("td", _hoisted_37, toDisplayString(row.criterion), 1),
                            createBaseVNode("td", _hoisted_38, toDisplayString(row.target), 1),
                            createBaseVNode("td", _hoisted_39, toDisplayString(row.current), 1),
                            createBaseVNode("td", {
                              class: normalizeClass(["px-3 py-1.5 text-xs font-bold font-mono", isDeltaPositive(row.delta) ? 'text-absa-passion' : 'text-absa-passion'])
                            }, toDisplayString(row.delta), 3),
                            createBaseVNode("td", _hoisted_40, [
                              createBaseVNode("span", {
                                class: normalizeClass(['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', statusBadgeClass(row.status)])
                              }, [
                                createBaseVNode("span", {
                                  class: normalizeClass(['w-1 h-1 rounded-full', statusDotClass(row.status)])
                                }, null, 2),
                                createTextVNode(" " + toDisplayString(row.status), 1)
                              ], 2)
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]))
            : createCommentVNode("", true),
          (activeTab.value === 'pilot')
            ? (openBlock(), createElementBlock("div", _hoisted_41, [...(_cache[19] || (_cache[19] = [
                createStaticVNode("<div class=\"rounded-sm border border-gray-300 overflow-hidden mb-6\"><div class=\"px-5 py-4 flex items-start gap-3\"><span class=\"material-symbols-outlined text-[20px] text-gray-400 mt-0.5\">info</span><p class=\"text-xs text-gray-500 leading-relaxed\"> The pilot programme ran across 6 branches with AI-driven retention interventions enabled. 7 branches operated as control with standard processes. Data covers the 90-day pilot period. </p></div></div><div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\"><div class=\"bg-white border border-gray-300 border-t-4 border-t-absa-passion rounded-sm p-5\"><div class=\"flex items-center gap-2 mb-4\"><span class=\"material-symbols-outlined text-[18px] text-absa-passion\">science</span><h3 class=\"text-sm font-bold text-absa-enrich\">Pilot Branches</h3><span class=\"ml-auto text-[11px] font-bold text-absa-passion bg-red-50 px-2 py-0.5 rounded-sm\">AI ENABLED</span></div><div class=\"grid grid-cols-2 gap-4\"><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Branches</p><p class=\"text-xl font-bold font-mono text-absa-enrich\">6</p></div><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Monthly Churn</p><p class=\"text-xl font-bold font-mono text-absa-passion\">5.1%</p></div><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Retention Rate</p><p class=\"text-xl font-bold font-mono text-absa-passion\">74%</p></div><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">AUM Change</p><p class=\"text-xl font-bold font-mono text-absa-power\">-1.2%</p></div><div class=\"col-span-2\"><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Contacts per RM / Month</p><p class=\"text-xl font-bold font-mono text-absa-enrich\">28</p></div></div></div><div class=\"bg-white border border-gray-300 border-t-4 border-t-gray-300 rounded-sm p-5\"><div class=\"flex items-center gap-2 mb-4\"><span class=\"material-symbols-outlined text-[18px] text-gray-400\">account_balance</span><h3 class=\"text-sm font-bold text-absa-enrich\">Control Branches</h3><span class=\"ml-auto text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm\">STANDARD</span></div><div class=\"grid grid-cols-2 gap-4\"><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Branches</p><p class=\"text-xl font-bold font-mono text-absa-enrich\">7</p></div><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Monthly Churn</p><p class=\"text-xl font-bold font-mono text-absa-passion\">7.8%</p></div><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Retention Rate</p><p class=\"text-xl font-bold font-mono text-absa-passion\">58%</p></div><div><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">AUM Change</p><p class=\"text-xl font-bold font-mono text-absa-passion\">-4.8%</p></div><div class=\"col-span-2\"><p class=\"text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1\">Contacts per RM / Month</p><p class=\"text-xl font-bold font-mono text-absa-enrich\">11</p></div></div></div></div><div class=\"rounded-sm border border-gray-300 overflow-hidden mb-6\"><div class=\"px-5 py-4 border-b border-gray-200 flex justify-between items-center\"><div><h2 class=\"text-sm font-bold text-absa-enrich\">Pilot vs Control — Metric Comparison</h2><p class=\"text-[11px] text-gray-500 mt-0.5\">90-day performance across key retention metrics</p></div></div><div class=\"overflow-x-auto\"><table class=\"w-full text-left border-collapse\"><thead><tr class=\"border-b border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider\"><th class=\"px-3 py-1.5\">Metric</th><th class=\"px-3 py-1.5\">Pilot Branches</th><th class=\"px-3 py-1.5\">Control Branches</th><th class=\"px-3 py-1.5\">Delta</th><th class=\"px-3 py-1.5\">Significance</th></tr></thead><tbody class=\"divide-y divide-gray-100\"><tr class=\"hover:bg-gray-50 transition-colors\"><td class=\"px-3 py-1.5 text-xs font-semibold text-absa-enrich\">Monthly Churn Rate</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">5.1%</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">7.8%</td><td class=\"px-3 py-1.5 text-xs font-bold text-absa-passion\">-2.7pp</td><td class=\"px-3 py-1.5\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion\"><span class=\"w-1 h-1 rounded-full bg-absa-passion\"></span>p &lt; 0.05 </span></td></tr><tr class=\"hover:bg-gray-50 transition-colors\"><td class=\"px-3 py-1.5 text-xs font-semibold text-absa-enrich\">Retention Rate</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">74%</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">58%</td><td class=\"px-3 py-1.5 text-xs font-bold text-absa-passion\">+16pp</td><td class=\"px-3 py-1.5\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion\"><span class=\"w-1 h-1 rounded-full bg-absa-passion\"></span>p &lt; 0.05 </span></td></tr><tr class=\"hover:bg-gray-50 transition-colors\"><td class=\"px-3 py-1.5 text-xs font-semibold text-absa-enrich\">AUM Change (90D)</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">-1.2%</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">-4.8%</td><td class=\"px-3 py-1.5 text-xs font-bold text-absa-passion\">+3.6pp</td><td class=\"px-3 py-1.5\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion\"><span class=\"w-1 h-1 rounded-full bg-absa-passion\"></span>p &lt; 0.05 </span></td></tr><tr class=\"hover:bg-gray-50 transition-colors\"><td class=\"px-3 py-1.5 text-xs font-semibold text-absa-enrich\">RM Contacts per Month</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">28</td><td class=\"px-3 py-1.5 text-xs font-mono text-absa-passion font-bold\">11</td><td class=\"px-3 py-1.5 text-xs font-bold text-absa-passion\">+17</td><td class=\"px-3 py-1.5\"><span class=\"inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-red-50 text-absa-passion\"><span class=\"w-1 h-1 rounded-full bg-absa-passion\"></span>p &lt; 0.05 </span></td></tr></tbody></table></div></div><div class=\"rounded-sm border border-gray-300 overflow-hidden mb-6\"><div class=\"px-5 py-4 flex items-start gap-3\"><span class=\"material-symbols-outlined text-[20px] text-absa-passion mt-0.5\">verified</span><div><p class=\"text-xs font-bold text-absa-enrich mb-0.5\">Statistical Significance: p &lt; 0.05</p><p class=\"text-[11px] text-gray-500 leading-relaxed\"> Results are statistically significant at the 95% confidence level. All key metrics show meaningful improvement in pilot branches versus control, validating the AI-driven intervention model. </p></div></div></div>", 4)
              ]))]))
            : createCommentVNode("", true)
        ], 64))
  ]))
}
}

};

export { _sfc_main as default };
