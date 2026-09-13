import { g as _export_sfc, r as ref, D as computed, h as onMounted, c as createElementBlock, b as createBaseVNode, y as unref, m as createTextVNode, u as useRouter, o as openBlock } from './index-DmPoKdyt.js';
import { k } from './marked.esm-EDWczvkv.js';

const _hoisted_1 = { class: "global-mesh-bg text-on-background w-full p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto pt-20 pb-24" };
const _hoisted_2 = { class: "mb-6" };
const _hoisted_3 = { class: "bg-surface border border-outline-variant shadow-sm global-dotted-bg p-5 md:p-6 mb-6" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = {
  key: 1,
  class: "text-body-md text-secondary"
};


const _sfc_main = {
  __name: 'CodebaseInsights',
  setup(__props) {

const router = useRouter();
const reportContent = ref('');

const renderedMarkdown = computed(() => {
  if (!reportContent.value) return '';
  return k.parse(reportContent.value);
});

const openInteractiveGraph = () => {
  // Assuming graph.html is accessible relative to the frontend's public path
  window.open('/graphify-out/graph.html', '_blank');
};

onMounted(async () => {
  try {
    // Fetch the raw Markdown report
    const response = await fetch('/graphify-out/GRAPH_REPORT.md');
    if (response.ok) {
      reportContent.value = await response.text();
    } else {
      reportContent.value = 'Failed to load Graphify report.';
      console.error('Failed to load Graphify report:', response.statusText);
    }
  } catch (error) {
    reportContent.value = 'Error loading Graphify report.';
    console.error('Error loading Graphify report:', error);
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("button", {
        onClick: _cache[0] || (_cache[0] = $event => (unref(router).back())),
        class: "flex items-center gap-2 text-body-md font-bold text-[#DC0037] hover:text-[#B50232] transition-colors"
      }, [...(_cache[1] || (_cache[1] = [
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
        createTextVNode(" Back ", -1)
      ]))]),
      _cache[2] || (_cache[2] = createBaseVNode("div", { class: "flex items-center gap-2 text-label-sm text-secondary mt-2" }, [
        createBaseVNode("span", null, "Dashboard"),
        createBaseVNode("span", null, "/"),
        createBaseVNode("span", null, "AI Assistant"),
        createBaseVNode("span", null, "/"),
        createBaseVNode("span", { class: "text-on-surface font-bold" }, "Codebase Insights")
      ], -1))
    ]),
    _cache[8] || (_cache[8] = createBaseVNode("h1", { class: "text-headline-lg font-headline font-semibold text-on-surface mb-6" }, "Codebase Insights", -1)),
    createBaseVNode("div", _hoisted_3, [
      _cache[3] || (_cache[3] = createBaseVNode("h2", { class: "text-headline-md font-headline font-semibold text-on-surface mb-4" }, "Graphify Report", -1)),
      (reportContent.value)
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "prose max-w-none",
            innerHTML: renderedMarkdown.value
          }, null, 8, _hoisted_4))
        : (openBlock(), createElementBlock("div", _hoisted_5, "Loading Graphify report...")),
      _cache[4] || (_cache[4] = createBaseVNode("p", { class: "text-label-sm text-secondary mt-4" }, "Data from `absa-foundry-frontend/graphify-out/GRAPH_REPORT.md`", -1))
    ]),
    createBaseVNode("div", { class: "bg-surface border border-outline-variant shadow-sm global-dotted-bg p-5 md:p-6" }, [
      _cache[5] || (_cache[5] = createBaseVNode("h2", { class: "text-headline-md font-headline font-semibold text-on-surface mb-4" }, "Interactive Graph", -1)),
      _cache[6] || (_cache[6] = createBaseVNode("p", { class: "text-body-md text-secondary mb-4" }, "Open the full interactive graph visualization in a new tab.", -1)),
      createBaseVNode("button", {
        onClick: openInteractiveGraph,
        class: "bg-[#DC0037] text-white text-body-md font-bold py-2.5 px-5 shadow-sm hover:bg-[#B50232] transition-colors"
      }, "OPEN INTERACTIVE GRAPH"),
      _cache[7] || (_cache[7] = createBaseVNode("p", { class: "text-label-sm text-secondary mt-4" }, "From `absa-foundry-frontend/graphify-out/graph.html`", -1))
    ])
  ]))
}
}

};
const CodebaseInsights = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-a63c0b6e"]]);

export { CodebaseInsights as default };
