import { B as Bar, D as Doughnut } from './index-axUTU2aC.js';
import { C as Chart, c as plugin_title, p as plugin_tooltip, b as plugin_legend, B as BarElement, a as CategoryScale, L as LinearScale, A as ArcElement } from './chart-D1QGMS6v.js';
import { _ as _export_sfc, r as ref, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, a as createStaticVNode, s as unref, a4 as Filter, A as createTextVNode, F as Fragment, e as renderList, D as resolveComponent, o as openBlock, t as toDisplayString } from './index-CAIvJQgo.js';
import { D as Download } from './download-DjLlzirl.js';
import { A as ArrowLeft } from './arrow-left-B4bx6FN1.js';

const _hoisted_1 = { class: "h-full flex flex-col font-sans relative text-gray-900 bg-transparent overflow-auto" };
const _hoisted_2 = { class: "bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 shadow-sm shrink-0" };
const _hoisted_3 = { class: "px-4 sm:px-6 h-16 flex items-center justify-between" };
const _hoisted_4 = { class: "flex items-center gap-3" };
const _hoisted_5 = { class: "flex gap-2" };
const _hoisted_6 = { class: "px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-[9px] font-mono font-bold uppercase rounded-none hover:border-absa-passion hover:text-absa-passion transition flex items-center gap-2" };
const _hoisted_7 = { class: "px-3 py-1.5 bg-absa-passion text-white text-[9px] font-mono font-bold uppercase rounded-none hover:bg-[#b3002d] transition flex items-center gap-2" };
const _hoisted_8 = { class: "flex-1 w-full relative z-10 blur-scoped pb-20" };
const _hoisted_9 = { class: "px-4 sm:px-6 py-6 space-y-6 w-full" };
const _hoisted_10 = { class: "grid grid-cols-1 md:grid-cols-2 gap-6" };
const _hoisted_11 = { class: "bg-white border border-gray-200 p-4" };
const _hoisted_12 = { class: "h-64" };
const _hoisted_13 = { class: "bg-white border border-gray-200 p-4" };
const _hoisted_14 = { class: "h-64" };
const _hoisted_15 = { class: "grid grid-cols-1 md:grid-cols-3 gap-6" };
const _hoisted_16 = { class: "bg-white border border-gray-200 p-4 col-span-1" };
const _hoisted_17 = { class: "h-64" };
const _hoisted_18 = { class: "bg-white border border-gray-200 p-4 col-span-2 flex flex-col" };
const _hoisted_19 = { class: "flex-1 overflow-x-auto" };
const _hoisted_20 = { class: "w-full text-left border-collapse" };
const _hoisted_21 = { class: "text-xs font-mono" };
const _hoisted_22 = { class: "p-3 text-gray-500 font-bold" };
const _hoisted_23 = { class: "p-3 text-gray-900" };
const _hoisted_24 = { class: "p-3 text-gray-500" };
const _hoisted_25 = { class: "p-3 text-right text-gray-900" };
const _hoisted_26 = { class: "p-3 text-right text-absa-passion font-bold" };
const _hoisted_27 = { class: "p-3 text-right text-orange-500 font-bold" };


const _sfc_main = {
  __name: 'CRMAnalyticsDashboard',
  setup(__props) {

Chart.register(plugin_title, plugin_tooltip, plugin_legend, BarElement, CategoryScale, LinearScale, ArcElement);

const asaData = {
  labels: ['< 5s', '5-10s', '10-15s', '15-20s', '20-30s', '> 30s'],
  datasets: [{
    label: 'Call Volume',
    backgroundColor: '#DC0037',
    data: [450, 320, 210, 110, 50, 12]
  }]
};

const channelData = {
  labels: ['Voice (Complaints)', 'Voice (Enquiries)', 'WhatsApp', 'Facebook', 'Email'],
  datasets: [{
    label: 'Volume',
    backgroundColor: ['#DC0037', '#e84c6c', '#25D366', '#1877F2', '#EAB308'],
    data: [350, 600, 200, 80, 120]
  }]
};

const resolutionData = {
  labels: ['Resolved (FCR)', 'Resolved (Follow-up)', 'Pending', 'Escalated'],
  datasets: [{
    backgroundColor: ['#22c55e', '#84cc16', '#eab308', '#DC0037'],
    data: [65, 20, 10, 5]
  }]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { borderDash: [2, 4] } }
  }
};
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { family: 'monospace', size: 10 } } }
  }
};

// Mock Table Data for Abandonment Contributions
const agentAbandonment = ref([
  { id: 'QA-01', name: 'John Doe', queue: 'Retail Voice', callsOffered: 145, abandoned: 12, rate: '8.2%' },
  { id: 'QA-02', name: 'Mary Banda', queue: 'SME Voice', callsOffered: 120, abandoned: 15, rate: '12.5%' },
  { id: 'QA-03', name: 'System (IVR)', queue: 'Main Menu', callsOffered: 800, abandoned: 45, rate: '5.6%' },
]);


return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[10] || (_cache[10] = createBaseVNode("div", { class: "fixed inset-0 z-0 pointer-events-none mesh-background" }, null, -1)),
    createBaseVNode("header", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          createVNode(_component_router_link, {
            to: "/dashboard/crm",
            class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest hover:text-absa-passion transition flex items-center gap-1"
          }, {
            default: withCtx(() => [
              createVNode(unref(ArrowLeft), { size: 14 }),
              _cache[0] || (_cache[0] = createTextVNode(" Back", -1))
            ]),
            _: 1
          }),
          _cache[1] || (_cache[1] = createStaticVNode("<div class=\"w-2 h-8 bg-absa-passion rounded-none ml-2\" data-v-216926a0></div><div data-v-216926a0><div class=\"flex items-center gap-1.5\" data-v-216926a0><span class=\"text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-216926a0>Team Leader</span><span class=\"text-[10px] font-mono font-bold text-gray-300\" data-v-216926a0>//</span><span class=\"text-[10px] font-mono font-bold text-gray-900 uppercase tracking-widest\" data-v-216926a0>Analytics</span></div><h1 class=\"text-xl font-black font-display text-gray-900 uppercase tracking-tight\" data-v-216926a0>Workforce &amp; QA Dashboard</h1></div>", 2))
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("button", _hoisted_6, [
            createVNode(unref(Filter), { size: 12 }),
            _cache[2] || (_cache[2] = createTextVNode(" Filter", -1))
          ]),
          createBaseVNode("button", _hoisted_7, [
            createVNode(unref(Download), { size: 12 }),
            _cache[3] || (_cache[3] = createTextVNode(" Export Report", -1))
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_8, [
      createBaseVNode("div", _hoisted_9, [
        _cache[9] || (_cache[9] = createStaticVNode("<div class=\"grid grid-cols-4 gap-4\" data-v-216926a0><div class=\"bg-white border border-gray-200 p-4 flex flex-col justify-between\" data-v-216926a0><span class=\"text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-216926a0>Current SLA (Target 85%)</span><div class=\"text-2xl font-black font-display text-gray-900 mt-2\" data-v-216926a0>82.4%</div></div><div class=\"bg-white border border-gray-200 p-4 flex flex-col justify-between\" data-v-216926a0><span class=\"text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-216926a0>Avg Speed of Answer</span><div class=\"text-2xl font-black font-display text-gray-900 mt-2\" data-v-216926a0>18 <span class=\"text-xs text-gray-500\" data-v-216926a0>sec</span></div></div><div class=\"bg-white border border-gray-200 p-4 flex flex-col justify-between\" data-v-216926a0><span class=\"text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-216926a0>Global Abandon Rate</span><div class=\"text-2xl font-black font-display text-gray-900 mt-2\" data-v-216926a0>12.5%</div></div><div class=\"bg-white border border-gray-200 p-4 flex flex-col justify-between\" data-v-216926a0><span class=\"text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest\" data-v-216926a0>First Contact Resolution</span><div class=\"text-2xl font-black font-display text-gray-900 mt-2\" data-v-216926a0>76.0%</div></div></div>", 1)),
        createBaseVNode("div", _hoisted_10, [
          createBaseVNode("div", _hoisted_11, [
            _cache[4] || (_cache[4] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4" }, "ASA Distribution Bands", -1)),
            createBaseVNode("div", _hoisted_12, [
              createVNode(unref(Bar), {
                data: asaData,
                options: chartOptions
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_13, [
            _cache[5] || (_cache[5] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4" }, "Case Resolution vs Pending", -1)),
            createBaseVNode("div", _hoisted_14, [
              createVNode(unref(Doughnut), {
                data: resolutionData,
                options: doughnutOptions
              })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("div", _hoisted_16, [
            _cache[6] || (_cache[6] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4" }, "Queue Volumes by Channel", -1)),
            createBaseVNode("div", _hoisted_17, [
              createVNode(unref(Bar), {
                data: channelData,
                options: chartOptions
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_18, [
            _cache[8] || (_cache[8] = createBaseVNode("h3", { class: "text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4 flex items-center justify-between" }, [
              createBaseVNode("span", null, "Abandonment Contributions (QA Root Cause)"),
              createBaseVNode("span", { class: "text-absa-passion" }, "FR-R-002 Focus")
            ], -1)),
            createBaseVNode("div", _hoisted_19, [
              createBaseVNode("table", _hoisted_20, [
                _cache[7] || (_cache[7] = createBaseVNode("thead", null, [
                  createBaseVNode("tr", { class: "bg-gray-50 text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest border-y border-gray-200" }, [
                    createBaseVNode("th", { class: "p-3" }, "Agent / Queue ID"),
                    createBaseVNode("th", { class: "p-3" }, "Name"),
                    createBaseVNode("th", { class: "p-3" }, "Assigned Queue"),
                    createBaseVNode("th", { class: "p-3 text-right" }, "Calls Offered"),
                    createBaseVNode("th", { class: "p-3 text-right" }, "Abandoned"),
                    createBaseVNode("th", { class: "p-3 text-right" }, "Abandon Rate")
                  ])
                ], -1)),
                createBaseVNode("tbody", _hoisted_21, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(agentAbandonment.value, (agent) => {
                    return (openBlock(), createElementBlock("tr", {
                      key: agent.id,
                      class: "border-b border-gray-100 hover:bg-gray-50"
                    }, [
                      createBaseVNode("td", _hoisted_22, toDisplayString(agent.id), 1),
                      createBaseVNode("td", _hoisted_23, toDisplayString(agent.name), 1),
                      createBaseVNode("td", _hoisted_24, toDisplayString(agent.queue), 1),
                      createBaseVNode("td", _hoisted_25, toDisplayString(agent.callsOffered), 1),
                      createBaseVNode("td", _hoisted_26, toDisplayString(agent.abandoned), 1),
                      createBaseVNode("td", _hoisted_27, toDisplayString(agent.rate), 1)
                    ]))
                  }), 128))
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ]))
}
}

};
const CRMAnalyticsDashboard = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-216926a0"]]);

export { CRMAnalyticsDashboard as default };
