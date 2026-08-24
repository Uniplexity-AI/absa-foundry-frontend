import { d as defineComponent, J as shallowRef, K as h, M as version, r as ref, h as onMounted, N as onUnmounted, O as watch, P as toRaw, Q as isProxy, R as nextTick, D as computed, o as openBlock, c as createElementBlock, y as unref, b as createBaseVNode, q as createVNode, F as Fragment, v as withDirectives, S as vModelSelect, e as renderList, t as toDisplayString, m as createTextVNode, l as createCommentVNode, a as createStaticVNode, j as normalizeClass, I as useRoute, A as resolveComponent, n as normalizeStyle, w as withCtx } from './index-F0Jaczum.js';
import { _ as _sfc_main$1 } from './LoadingSkeleton-qKyxdt4w.js';
import { C as Chart$1, B as BarController, D as DoughnutController, A as ArcElement, a as BarElement, b as CategoryScale, L as LinearScale, p as plugin_tooltip, c as plugin_legend } from './chart-zgLQ0LEq.js';
import { u as useCustomerStore } from './customerStore-CYbEJoNT.js';
import { u as usePredictionStore } from './predictionStore-YU93sQRm.js';

const CommonProps = {
    data: {
        type: Object,
        required: true
    },
    options: {
        type: Object,
        default: ()=>({})
    },
    plugins: {
        type: Array,
        default: ()=>[]
    },
    datasetIdKey: {
        type: String,
        default: "label"
    },
    updateMode: {
        type: String,
        default: undefined
    }
};
const A11yProps = {
    ariaLabel: {
        type: String
    },
    ariaDescribedby: {
        type: String
    }
};
const Props = {
    type: {
        type: String,
        required: true
    },
    destroyDelay: {
        type: Number,
        default: 0 // No delay by default
    },
    ...CommonProps,
    ...A11yProps
};

const compatProps = version[0] === "2" ? (internals, props)=>Object.assign(internals, {
        attrs: props
    }) : (internals, props)=>Object.assign(internals, props);
function toRawIfProxy(obj) {
    return isProxy(obj) ? toRaw(obj) : obj;
}
function cloneProxy(obj) {
    let src = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : obj;
    return isProxy(src) ? new Proxy(obj, {}) : obj;
}
function setOptions(chart, nextOptions) {
    const options = chart.options;
    if (options && nextOptions) {
        Object.assign(options, nextOptions);
    }
}
function setLabels(currentData, nextLabels) {
    currentData.labels = nextLabels;
}
function setDatasets(currentData, nextDatasets, datasetIdKey) {
    const addedDatasets = [];
    currentData.datasets = nextDatasets.map((nextDataset)=>{
        // given the new set, find it's current match
        const currentDataset = currentData.datasets.find((dataset)=>dataset[datasetIdKey] === nextDataset[datasetIdKey]);
        // There is no original to update, so simply add new one
        if (!currentDataset || !nextDataset.data || addedDatasets.includes(currentDataset)) {
            return {
                ...nextDataset
            };
        }
        addedDatasets.push(currentDataset);
        Object.assign(currentDataset, nextDataset);
        return currentDataset;
    });
}
function cloneData(data, datasetIdKey) {
    const nextData = {
        labels: [],
        datasets: []
    };
    setLabels(nextData, data.labels);
    setDatasets(nextData, data.datasets, datasetIdKey);
    return nextData;
}

const Chart = defineComponent({
    props: Props,
    setup (props, param) {
        let { expose , slots  } = param;
        const canvasRef = ref(null);
        const chartRef = shallowRef(null);
        expose({
            chart: chartRef
        });
        const renderChart = ()=>{
            if (!canvasRef.value) return;
            const { type , data , options , plugins , datasetIdKey  } = props;
            const clonedData = cloneData(data, datasetIdKey);
            const proxiedData = cloneProxy(clonedData, data);
            chartRef.value = new Chart$1(canvasRef.value, {
                type,
                data: proxiedData,
                options: {
                    ...options
                },
                plugins
            });
        };
        const destroyChart = ()=>{
            const chart = toRaw(chartRef.value);
            if (chart) {
                if (props.destroyDelay > 0) {
                    setTimeout(()=>{
                        chart.destroy();
                        chartRef.value = null;
                    }, props.destroyDelay);
                } else {
                    chart.destroy();
                    chartRef.value = null;
                }
            }
        };
        const update = (chart)=>{
            chart.update(props.updateMode);
        };
        onMounted(renderChart);
        onUnmounted(destroyChart);
        watch([
            ()=>props.options,
            ()=>props.data
        ], (param, param1)=>{
            let [nextOptionsProxy, nextDataProxy] = param, [prevOptionsProxy, prevDataProxy] = param1;
            const chart = toRaw(chartRef.value);
            if (!chart) {
                return;
            }
            let shouldUpdate = false;
            if (nextOptionsProxy) {
                const nextOptions = toRawIfProxy(nextOptionsProxy);
                const prevOptions = toRawIfProxy(prevOptionsProxy);
                if (nextOptions && nextOptions !== prevOptions) {
                    setOptions(chart, nextOptions);
                    shouldUpdate = true;
                }
            }
            if (nextDataProxy) {
                const nextLabels = toRawIfProxy(nextDataProxy.labels);
                const prevLabels = toRawIfProxy(prevDataProxy.labels);
                const nextDatasets = toRawIfProxy(nextDataProxy.datasets);
                const prevDatasets = toRawIfProxy(prevDataProxy.datasets);
                if (nextLabels !== prevLabels) {
                    setLabels(chart.config.data, nextLabels);
                    shouldUpdate = true;
                }
                if (nextDatasets && nextDatasets !== prevDatasets) {
                    setDatasets(chart.config.data, nextDatasets, props.datasetIdKey);
                    shouldUpdate = true;
                }
            }
            if (shouldUpdate) {
                nextTick(()=>{
                    update(chart);
                });
            }
        }, {
            deep: true
        });
        return ()=>{
            return h("canvas", {
                role: "img",
                "aria-label": props.ariaLabel,
                "aria-describedby": props.ariaDescribedby,
                ref: canvasRef
            }, [
                h("p", {}, [
                    slots.default ? slots.default() : ""
                ])
            ]);
        };
    }
});

function createTypedChart(type, registerables) {
    Chart$1.register(registerables);
    return defineComponent({
        props: CommonProps,
        setup (props, param) {
            let { expose  } = param;
            const ref = shallowRef(null);
            const reforwardRef = (chartRef)=>{
                ref.value = chartRef?.chart;
            };
            expose({
                chart: ref
            });
            return ()=>{
                return h(Chart, compatProps({
                    ref: reforwardRef
                }, {
                    type,
                    ...props
                }));
            };
        }
    });
}
const Bar = /* #__PURE__ */ createTypedChart("bar", BarController);
const Doughnut = /* #__PURE__ */ createTypedChart("doughnut", DoughnutController);

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-6" };
const _hoisted_2 = {
  key: 0,
  class: "min-h-[calc(100vh-6rem)] flex flex-col"
};
const _hoisted_3 = { class: "mb-8" };
const _hoisted_4 = { class: "grid grid-cols-12 gap-4 md:gap-4 flex-1 mb-8 min-h-0" };
const _hoisted_5 = { class: "col-span-12 lg:col-span-4" };
const _hoisted_6 = { class: "h-full" };
const _hoisted_7 = { class: "col-span-12 lg:col-span-8" };
const _hoisted_8 = { class: "h-full" };
const _hoisted_9 = { class: "grid grid-cols-2 gap-4 md:gap-4" };
const _hoisted_10 = { class: "mb-6 pb-4 border-b border-gray-200 flex justify-between items-end" };
const _hoisted_11 = { class: "flex items-center gap-3" };
const _hoisted_12 = ["value"];
const _hoisted_13 = { class: "grid grid-cols-4 gap-4 md:gap-4 mb-8" };
const _hoisted_14 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_15 = { class: "flex items-baseline gap-2 mb-4" };
const _hoisted_16 = { class: "text-2xl font-bold font-mono text-absa-enrich" };
const _hoisted_17 = { class: "text-xs font-bold text-amber-700 font-semibold flex items-center" };
const _hoisted_18 = { class: "flex items-end gap-1.5 h-12 mt-auto" };
const _hoisted_19 = {
  key: 0,
  class: "w-full h-full flex items-center justify-center text-[11px] text-gray-500 font-mono mt-0.5"
};
const _hoisted_20 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_21 = { class: "flex items-baseline gap-2 mb-2" };
const _hoisted_22 = { class: "text-2xl font-bold font-mono text-amber-700" };
const _hoisted_23 = { class: "text-xs text-gray-500" };
const _hoisted_24 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_25 = { class: "flex items-baseline gap-2 mb-2" };
const _hoisted_26 = { class: "text-2xl font-bold font-mono text-red-900" };
const _hoisted_27 = { class: "text-xs text-gray-500" };
const _hoisted_28 = { class: "bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_29 = { class: "flex items-baseline gap-2 mb-2" };
const _hoisted_30 = { class: "text-2xl font-bold font-mono text-red-900" };
const _hoisted_31 = { class: "text-xs text-gray-500" };
const _hoisted_32 = { class: "grid grid-cols-12 gap-4 md:gap-4 mb-8" };
const _hoisted_33 = { class: "col-span-12 lg:col-span-5 bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_34 = { class: "h-64" };
const _hoisted_35 = { class: "col-span-12 lg:col-span-7 bg-white rounded-sm border border-gray-300 p-4 mb-6" };
const _hoisted_36 = { class: "h-64" };
const _hoisted_37 = { class: "grid grid-cols-12 gap-4 md:gap-4" };
const _hoisted_38 = { class: "col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-4 overflow-y-auto" };
const _hoisted_39 = { class: "bg-white rounded-sm border border-gray-300 shadow-none flex flex-col h-[500px]" };
const _hoisted_40 = { class: "px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white z-10" };
const _hoisted_41 = { class: "text-label-sm font-label-sm text-absa-passion" };
const _hoisted_42 = { class: "card-content flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4" };
const _hoisted_43 = {
  key: 0,
  class: "text-xs text-gray-500 text-center py-8"
};
const _hoisted_44 = { class: "flex justify-between items-start mb-1" };
const _hoisted_45 = { class: "text-xs font-bold text-absa-enrich" };
const _hoisted_46 = { class: "text-[11px] text-gray-500 font-mono mt-0.5" };
const _hoisted_47 = { class: "text-xs text-gray-500 mb-3" };
const _hoisted_48 = ["onClick"];
const _hoisted_49 = { class: "col-span-12 lg:col-span-8 flex flex-col gap-4 overflow-y-auto" };
const _hoisted_50 = { class: "bg-white rounded-sm shadow-none overflow-hidden h-[500px]" };
const _hoisted_51 = { class: "h-full flex flex-col" };
const _hoisted_52 = { class: "overflow-x-auto flex-1" };
const _hoisted_53 = { class: "min-w-full divide-y divide-gray-100" };
const _hoisted_54 = { class: "bg-white divide-y divide-gray-100" };
const _hoisted_55 = { key: 0 };
const _hoisted_56 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_57 = { class: "text-[11px] text-gray-500 font-mono mt-0.5" };
const _hoisted_58 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_59 = { class: "text-xs" };
const _hoisted_60 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_61 = { class: "text-xs font-bold font-mono text-absa-enrich mb-1" };
const _hoisted_62 = { class: "progress-bar-container" };
const _hoisted_63 = { class: "px-3 py-1.5 whitespace-nowrap text-xs font-bold" };
const _hoisted_64 = { class: "px-3 py-1.5 whitespace-nowrap text-xs" };
const _hoisted_65 = { class: "px-3 py-1.5 whitespace-nowrap" };
const _hoisted_66 = { class: "p-4 border-t border-gray-200 bg-white flex items-center justify-between mt-auto" };
const _hoisted_67 = { class: "text-xs text-gray-500" };
const _hoisted_68 = { class: "flex gap-2" };
const _hoisted_69 = ["disabled"];
const _hoisted_70 = ["disabled"];
const _hoisted_71 = { class: "grid grid-cols-2 gap-4 md:gap-4 mt-8" };
const _hoisted_72 = { class: "bg-white rounded-sm border border-gray-300 border-l-4 border-l-absa-passion p-5 mb-6 flex flex-col relative overflow-hidden shadow-none min-h-[200px]" };
const _hoisted_73 = { class: "relative z-10" };
const _hoisted_74 = {
  key: 0,
  class: "space-y-2"
};
const _hoisted_75 = { class: "text-body-sm text-gray-600 truncate mr-2" };
const _hoisted_76 = { class: "text-body-sm font-bold text-absa-enrich whitespace-nowrap" };
const _hoisted_77 = { class: "text-gray-400 font-normal" };
const _hoisted_78 = {
  key: 1,
  class: "text-xs text-gray-500 leading-relaxed"
};
const _hoisted_79 = { class: "bg-white rounded-sm border border-gray-300 p-6 shadow-none flex items-center min-h-[200px]" };
const _hoisted_80 = { class: "card-content flex gap-4 items-start w-full" };
const _hoisted_81 = { class: "text-xs text-gray-500 leading-relaxed" };
const _hoisted_82 = { class: "text-absa-enrich font-bold" };
const _hoisted_83 = {
  key: 0,
  class: "text-absa-passion"
};
const _hoisted_84 = {
  key: 1,
  class: "text-red-900"
};
const _hoisted_85 = {
  key: 2,
  class: "text-absa-enrich"
};

const ledgerPageSize = 5;

const _sfc_main = {
  __name: 'PortfolioOverview',
  setup(__props) {

Chart$1.register(ArcElement, BarElement, CategoryScale, LinearScale, plugin_tooltip, plugin_legend);

const customerStore = useCustomerStore();
const predictionStore = usePredictionStore();
const route = useRoute();

onMounted(async () => {
  await customerStore.fetchPortfolio();
  ledgerPage.value = parseInt(route.query.page) || 1;
  // Batch-fetch predictions for visible customers
  const ids = customerStore.customers.slice(0, 50).map(c => c.customerId);
  predictionStore.fetchBatchPredictions(ids, selectedSnapshot.value);
  // Fetch churn drivers for AI engine
  predictionStore.fetchChurnDrivers();
});

const selectedSnapshot = ref('2026-07-27');
const snapshotOptions = ref([]);

// Generate last 30 days of snapshots centered on the default data date
function generateSnapshots() {
  const dates = [];
  const base = new Date('2026-07-27');
  for (let i = 14; i >= -15; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  snapshotOptions.value = dates;
  selectedSnapshot.value = '2026-07-27';
}
generateSnapshots();

async function onSnapshotChange() {
  await customerStore.fetchPortfolio({ as_of_date: selectedSnapshot.value });
  ledgerPage.value = 1;
}

// Donut chart: State Distribution (6-state)
const donutChartData = computed(() => ({
  labels: ['New', 'Active', 'Growing', 'At Risk', 'Dormant', 'Churned'],
  datasets: [{
    data: [
      customerStore.portfolio.active,  // NOTE: backend may not return all states yet
      0,  // NEW — pending backend enrichment
      0,  // GROWING — pending backend enrichment
      customerStore.portfolio.atRisk,
      customerStore.portfolio.dormant,
      customerStore.portfolio.churned,
    ],
    backgroundColor: ['#16a34a', '#16a34a', '#16a34a', '#b45309', '#7f1d1d', '#7f1d1d'],
    borderWidth: 0,
  }]
}));

const donutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } },
};

// Bar chart: Health Score Distribution (computed from customer data)
const healthScoreHistogram = computed(() => {
  const bins = [0, 0, 0, 0, 0];  // 0-20, 21-40, 41-60, 61-80, 81-100
  customerStore.customers.forEach(c => {
    const h = c.healthScore;
    if (h == null) return
    if (h <= 20) bins[0]++;
    else if (h <= 40) bins[1]++;
    else if (h <= 60) bins[2]++;
    else if (h <= 80) bins[3]++;
    else bins[4]++;
  });
  return bins
});

const histogramChartData = computed(() => ({
  labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
  datasets: [{
    label: 'Customers',
    data: healthScoreHistogram.value,
    backgroundColor: '#7f1d1d',
    borderRadius: 4,
  }]
}));

const histogramChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
};

const totalCustomersSparkline = ref([]);

// Ledger pagination
const ledgerPage = ref(1);
const ledgerTotalPages = computed(() => Math.max(1, Math.ceil(customerStore.customers.length / ledgerPageSize)));
const ledgerStart = computed(() => customerStore.customers.length === 0 ? 0 : (ledgerPage.value - 1) * ledgerPageSize + 1);
const ledgerEnd = computed(() => Math.min(ledgerPage.value * ledgerPageSize, customerStore.customers.length));

// Critical Alerts — derived from live prediction + portfolio data
const alerts = computed(() => {
  const list = [];

  // 1. High churn risk customers (churn_probability > 60%)
  const highRisk = Object.entries(predictionStore.predictions)
    .filter(([, p]) => p.churn_probability > 0.6)
    .map(([id, p]) => ({
      name: id,
      time: `${Math.round(p.churn_probability * 100)}% risk`,
      title: 'High Churn Probability',
      titleColorClass: 'text-absa-passion',
      description: `Customer ${id.replace('CUST', '')} has a ${Math.round(p.churn_probability * 100)}% likelihood of churning within 90 days.`,
      actionable: true,
      buttonClass: 'bg-absa-passion text-white hover:bg-red-900',
    }));
  list.push(...highRisk.slice(0, 3));

  // 2. Portfolio-level: Dormancy is the dominant state
  if (customerStore.portfolio.dormantPct > 40) {
    list.push({
      name: 'Portfolio Dormancy',
      time: `${customerStore.portfolio.dormantPct}%`,
      title: 'Dormancy Dominant',
      titleColorClass: 'text-red-900',
      description: `${customerStore.portfolio.dormant.toLocaleString()} customers (${customerStore.portfolio.dormantPct}%) are dormant — proactive outreach recommended.`,
      actionable: false,
      buttonClass: '',
    });
  }

  // 3. Top churn driver alert
  const topDriver = predictionStore.churnDrivers[0];
  if (topDriver && topDriver.contribution_pct > 30) {
    list.push({
      name: 'Top Churn Driver',
      time: `${topDriver.contribution_pct}%`,
      title: topDriver.driver_name,
      titleColorClass: 'text-amber-700',
      description: `Affects ${topDriver.affected_customer_count.toLocaleString()} customers — ${topDriver.contribution_pct}% contribution to churn.`,
      actionable: true,
      buttonClass: 'bg-[#FF780F] text-white hover:bg-[#E06A00]',
    });
  }

  return list
});

const acknowledgeAlert = (index) => {
  // Alerts are computed from live data — mark as acknowledged by filtering
  // For now, this is a no-op since alerts auto-refresh from store data
};

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (unref(customerStore).loading)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_sfc_main$1, { type: "stats" })
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createVNode(_sfc_main$1, { type: "block" })
              ])
            ]),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                createVNode(_sfc_main$1, { type: "block" })
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createVNode(_sfc_main$1, { type: "card" }),
            createVNode(_sfc_main$1, { type: "card" })
          ])
        ]))
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_10, [
            _cache[4] || (_cache[4] = createBaseVNode("div", null, [
              createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-gray-500 mb-1" }, [
                createBaseVNode("span", null, "Dashboard"),
                createBaseVNode("span", null, "/"),
                createBaseVNode("span", { class: "text-absa-enrich font-bold" }, "Portfolio")
              ]),
              createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Portfolio Overview")
            ], -1)),
            createBaseVNode("div", _hoisted_11, [
              _cache[3] || (_cache[3] = createBaseVNode("span", { class: "text-sm font-bold text-gray-600" }, "Data Snapshot:", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((selectedSnapshot).value = $event)),
                onChange: onSnapshotChange,
                class: "block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-absa-passion focus:border-absa-passion sm:text-sm rounded-sm bg-white font-mono text-absa-enrich border"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(snapshotOptions.value, (option) => {
                  return (openBlock(), createElementBlock("option", {
                    key: option,
                    value: option
                  }, toDisplayString(option), 9, _hoisted_12))
                }), 128))
              ], 544), [
                [vModelSelect, selectedSnapshot.value]
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, [
              _cache[6] || (_cache[6] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Total Customers", -1)),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("span", _hoisted_16, toDisplayString(unref(customerStore).portfolio.total.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_17, [
                  _cache[5] || (_cache[5] = createBaseVNode("svg", {
                    class: "w-3 h-3 mr-1",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      d: "M5 10l7-7m0 0l7 7m-7-7v18",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2"
                    })
                  ], -1)),
                  createTextVNode(" " + toDisplayString(unref(customerStore).portfolio.activePct) + "% active ", 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_18, [
                (totalCustomersSparkline.value.length === 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_19, "—"))
                  : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(totalCustomersSparkline.value, (h, i) => {
                  return (openBlock(), createElementBlock("div", {
                    key: i,
                    class: "w-1/6 bg-primary rounded-t",
                    style: normalizeStyle({ height: h + '%' })
                  }, null, 4))
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_20, [
              _cache[7] || (_cache[7] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "At Risk", -1)),
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("span", _hoisted_22, toDisplayString(unref(customerStore).portfolio.atRisk.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_23, "| " + toDisplayString(unref(customerStore).portfolio.atRiskPct) + "%", 1)
              ]),
              _cache[8] || (_cache[8] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-auto" }, "+4 since last snapshot", -1))
            ]),
            createBaseVNode("div", _hoisted_24, [
              _cache[9] || (_cache[9] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Dormant", -1)),
              createBaseVNode("div", _hoisted_25, [
                createBaseVNode("span", _hoisted_26, toDisplayString(unref(customerStore).portfolio.dormant.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_27, "| " + toDisplayString(unref(customerStore).portfolio.dormantPct) + "%", 1)
              ]),
              _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-auto" }, "Stable across 3 periods", -1))
            ]),
            createBaseVNode("div", _hoisted_28, [
              _cache[11] || (_cache[11] = createBaseVNode("h3", { class: "text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2" }, "Churned", -1)),
              createBaseVNode("div", _hoisted_29, [
                createBaseVNode("span", _hoisted_30, toDisplayString(unref(customerStore).portfolio.churned.toLocaleString() || '—'), 1),
                createBaseVNode("span", _hoisted_31, "| " + toDisplayString(unref(customerStore).portfolio.churnedPct) + "%", 1)
              ]),
              _cache[12] || (_cache[12] = createBaseVNode("p", { class: "text-xs text-gray-500 mt-auto" }, "Last 90 days", -1))
            ])
          ]),
          createBaseVNode("div", _hoisted_32, [
            createBaseVNode("div", _hoisted_33, [
              _cache[13] || (_cache[13] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-4" }, "State Distribution", -1)),
              createBaseVNode("div", _hoisted_34, [
                createVNode(unref(Doughnut), {
                  data: donutChartData.value,
                  options: donutChartOptions
                }, null, 8, ["data"])
              ])
            ]),
            createBaseVNode("div", _hoisted_35, [
              _cache[14] || (_cache[14] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-4" }, "Health Score Distribution", -1)),
              createBaseVNode("div", _hoisted_36, [
                createVNode(unref(Bar), {
                  data: histogramChartData.value,
                  options: histogramChartOptions
                }, null, 8, ["data"])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_37, [
            createBaseVNode("div", _hoisted_38, [
              createBaseVNode("div", _hoisted_39, [
                createBaseVNode("div", _hoisted_40, [
                  _cache[15] || (_cache[15] = createBaseVNode("div", { class: "flex items-center gap-2" }, [
                    createBaseVNode("span", { class: "material-symbols-outlined text-absa-passion text-[20px]" }, "campaign"),
                    createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich" }, "Critical Alerts")
                  ], -1)),
                  createBaseVNode("span", _hoisted_41, toDisplayString(alerts.value.length) + " NEW ", 1)
                ]),
                createBaseVNode("div", _hoisted_42, [
                  (alerts.value.length === 0)
                    ? (openBlock(), createElementBlock("div", _hoisted_43, "No critical alerts"))
                    : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(alerts.value, (alert, index) => {
                    return (openBlock(), createElementBlock("div", {
                      key: index,
                      class: "py-1"
                    }, [
                      createBaseVNode("div", _hoisted_44, [
                        createBaseVNode("h4", _hoisted_45, toDisplayString(alert.name), 1),
                        createBaseVNode("span", _hoisted_46, toDisplayString(alert.time), 1)
                      ]),
                      createBaseVNode("p", {
                        class: normalizeClass(['text-xs font-bold font-mono text-absa-enrich mb-1', alert.titleColorClass])
                      }, toDisplayString(alert.title), 3),
                      createBaseVNode("p", _hoisted_47, toDisplayString(alert.description), 1),
                      (alert.actionable)
                        ? (openBlock(), createElementBlock("button", {
                            key: 0,
                            class: normalizeClass([
                    'w-full text-xs font-bold py-2 px-4 rounded-sm shadow-none transition-colors',
                    alert.buttonClass
                  ]),
                            onClick: $event => (acknowledgeAlert())
                          }, " Acknowledge ", 10, _hoisted_48))
                        : createCommentVNode("", true)
                    ]))
                  }), 128))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_49, [
              createBaseVNode("div", _hoisted_50, [
                createBaseVNode("div", _hoisted_51, [
                  _cache[19] || (_cache[19] = createStaticVNode("<div class=\"px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white\"><h3 class=\"text-sm font-bold text-absa-enrich\">Predictive Lifecycle Ledger</h3><div class=\"flex gap-2\"><button class=\"p-1.5 border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50\"><svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path></svg></button><button class=\"p-1.5 border border-gray-300 rounded-sm text-gray-500 hover:bg-gray-50\"><svg class=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path d=\"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></path></svg></button></div></div>", 1)),
                  createBaseVNode("div", _hoisted_52, [
                    createBaseVNode("table", _hoisted_53, [
                      _cache[18] || (_cache[18] = createBaseVNode("thead", null, [
                        createBaseVNode("tr", { class: "border-b border-gray-200 bg-gray-50" }, [
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Name"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "State"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Health ↑"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Churn Prob"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "CLV (ZMW)"),
                          createBaseVNode("th", {
                            class: "px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider",
                            scope: "col"
                          }, "Action")
                        ])
                      ], -1)),
                      createBaseVNode("tbody", _hoisted_54, [
                        (unref(customerStore).customers.length === 0)
                          ? (openBlock(), createElementBlock("tr", _hoisted_55, [...(_cache[16] || (_cache[16] = [
                              createBaseVNode("td", {
                                colspan: "6",
                                class: "p-12 text-center text-xs text-gray-500"
                              }, "No customer data available", -1)
                            ]))]))
                          : createCommentVNode("", true),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(customerStore).customers.slice((ledgerPage.value - 1) * 5, ledgerPage.value * 5), (customer) => {
                          return (openBlock(), createElementBlock("tr", {
                            key: customer.customerId
                          }, [
                            createBaseVNode("td", _hoisted_56, [
                              createBaseVNode("div", null, [
                                createVNode(_component_router_link, {
                                  to: `/dashboard/customer/${encodeURIComponent(customer.customerId)}`,
                                  class: "text-xs font-bold text-absa-enrich hover:text-absa-passion transition-colors"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(customer.fullName), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createBaseVNode("div", _hoisted_57, "ID: " + toDisplayString(customer.customerId), 1)
                              ])
                            ]),
                            createBaseVNode("td", _hoisted_58, [
                              createBaseVNode("span", _hoisted_59, toDisplayString(customer.state), 1)
                            ]),
                            createBaseVNode("td", _hoisted_60, [
                              createBaseVNode("div", _hoisted_61, toDisplayString(customer.healthScore ?? '--'), 1),
                              createBaseVNode("div", _hoisted_62, [
                                createBaseVNode("div", {
                                  class: "progress-bar-fill bg-red-900",
                                  style: normalizeStyle({ width: (customer.healthScore ?? 0) + '%' })
                                }, null, 4)
                              ])
                            ]),
                            createBaseVNode("td", _hoisted_63, toDisplayString(unref(predictionStore).getChurnProbability(customer.customerId) != null ? Math.round(unref(predictionStore).getChurnProbability(customer.customerId) * 100) + '%' : '--'), 1),
                            createBaseVNode("td", _hoisted_64, toDisplayString(unref(predictionStore).predictions[customer.customerId]?.clv_percentile != null ? 'P' + (unref(predictionStore).predictions[customer.customerId].clv_percentile * 100).toFixed(0) : '--'), 1),
                            createBaseVNode("td", _hoisted_65, [
                              createVNode(_component_router_link, {
                                to: `/dashboard/customer/${encodeURIComponent(customer.customerId)}?from=ledger&page=${ledgerPage.value}`,
                                class: "text-xs font-bold py-1.5 px-3 rounded-sm shadow-none transition-colors w-full bg-absa-passion text-white hover:bg-red-900 inline-block text-center"
                              }, {
                                default: withCtx(() => [...(_cache[17] || (_cache[17] = [
                                  createTextVNode(" REVIEW ", -1)
                                ]))]),
                                _: 1
                              }, 8, ["to"])
                            ])
                          ]))
                        }), 128))
                      ])
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_66, [
                    createBaseVNode("span", _hoisted_67, "Showing " + toDisplayString(ledgerStart.value) + "-" + toDisplayString(ledgerEnd.value) + " of " + toDisplayString(unref(customerStore).pagination.total) + " customers", 1),
                    createBaseVNode("div", _hoisted_68, [
                      createBaseVNode("button", {
                        onClick: _cache[1] || (_cache[1] = $event => (ledgerPage.value--)),
                        disabled: ledgerPage.value <= 1,
                        class: normalizeClass(['px-3 py-1 border border-gray-300 rounded-sm text-xs', ledgerPage.value <= 1 ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'])
                      }, "Previous", 10, _hoisted_69),
                      createBaseVNode("button", {
                        onClick: _cache[2] || (_cache[2] = $event => (ledgerPage.value++)),
                        disabled: ledgerPage.value >= ledgerTotalPages.value,
                        class: normalizeClass(['px-3 py-1 border border-gray-300 rounded-sm text-xs', ledgerPage.value >= ledgerTotalPages.value ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 'text-absa-enrich hover:bg-gray-50'])
                      }, "Next", 10, _hoisted_70)
                    ])
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_71, [
            createBaseVNode("div", _hoisted_72, [
              createBaseVNode("div", _hoisted_73, [
                _cache[20] || (_cache[20] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-4 flex items-center gap-2" }, [
                  createBaseVNode("span", { class: "material-symbols-outlined text-[16px] text-absa-passion" }, "auto_awesome"),
                  createTextVNode(" AI Churn Intelligence ")
                ], -1)),
                (unref(predictionStore).churnDrivers.length > 0)
                  ? (openBlock(), createElementBlock("div", _hoisted_74, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(predictionStore).churnDrivers.slice(0, 3), (d) => {
                        return (openBlock(), createElementBlock("div", {
                          key: d.rank,
                          class: "flex justify-between items-center pb-2 border-b border-gray-100 last:border-0"
                        }, [
                          createBaseVNode("span", _hoisted_75, toDisplayString(d.driver_name), 1),
                          createBaseVNode("span", _hoisted_76, [
                            createTextVNode(toDisplayString(d.contribution_pct) + "% ", 1),
                            createBaseVNode("span", _hoisted_77, "(" + toDisplayString(d.affected_customer_count.toLocaleString()) + ")", 1)
                          ])
                        ]))
                      }), 128))
                    ]))
                  : (openBlock(), createElementBlock("p", _hoisted_78, "Churn intelligence data will appear here once computed."))
              ])
            ]),
            createBaseVNode("div", _hoisted_79, [
              createBaseVNode("div", _hoisted_80, [
                _cache[25] || (_cache[25] = createBaseVNode("div", { class: "flex-shrink-0 w-12 h-16 bg-[#FF780F]/10 rounded-md flex items-center justify-center" }, [
                  createBaseVNode("svg", {
                    class: "w-6 h-6 text-amber-700",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createBaseVNode("path", {
                      d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2"
                    })
                  ])
                ], -1)),
                createBaseVNode("div", null, [
                  _cache[24] || (_cache[24] = createBaseVNode("h3", { class: "text-sm font-bold text-absa-enrich mb-2" }, "Portfolio Health Trend", -1)),
                  createBaseVNode("p", _hoisted_81, [
                    createBaseVNode("strong", _hoisted_82, toDisplayString(unref(customerStore).portfolio.total.toLocaleString()), 1),
                    _cache[21] || (_cache[21] = createTextVNode(" customers tracked. ", -1)),
                    (unref(customerStore).portfolio.atRiskPct > 0)
                      ? (openBlock(), createElementBlock("strong", _hoisted_83, toDisplayString(unref(customerStore).portfolio.atRiskPct) + "% at risk", 1))
                      : createCommentVNode("", true),
                    _cache[22] || (_cache[22] = createTextVNode(", ", -1)),
                    (unref(customerStore).portfolio.dormantPct > 0)
                      ? (openBlock(), createElementBlock("strong", _hoisted_84, toDisplayString(unref(customerStore).portfolio.dormantPct) + "% dormant", 1))
                      : createCommentVNode("", true),
                    _cache[23] || (_cache[23] = createTextVNode(", ", -1)),
                    (unref(customerStore).portfolio.churnedPct > 0)
                      ? (openBlock(), createElementBlock("strong", _hoisted_85, toDisplayString(unref(customerStore).portfolio.churnedPct) + "% churned", 1))
                      : createCommentVNode("", true),
                    createTextVNode(". " + toDisplayString(unref(customerStore).portfolio.actionsDue.toLocaleString()) + " actions due. ", 1)
                  ])
                ])
              ])
            ])
          ])
        ], 64))
  ]))
}
}

};

export { _sfc_main as default };
