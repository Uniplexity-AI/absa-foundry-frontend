import { f as fetchPromiseToFundReport } from './crmApi-CaAm0CJT.js';
import { r as ref, f as onMounted, c as createElementBlock, b as createBaseVNode, F as Fragment, e as renderList, o as openBlock, t as toDisplayString, h as normalizeClass } from './index-DX7cgo_Y.js';

const _hoisted_1 = { class: "w-full pt-6 px-6 pb-8" };
const _hoisted_2 = { class: "bg-white border border-gray-300 rounded-sm overflow-hidden" };
const _hoisted_3 = { class: "overflow-x-auto" };
const _hoisted_4 = { class: "min-w-full divide-y divide-gray-200" };
const _hoisted_5 = { class: "divide-y divide-gray-100 bg-white" };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = { class: "px-4 py-3 text-xs font-mono text-gray-600" };
const _hoisted_9 = { class: "px-4 py-3 text-xs font-bold text-absa-enrich" };
const _hoisted_10 = { class: "px-4 py-3 text-xs font-mono text-absa-enrich" };
const _hoisted_11 = { class: "px-4 py-3 text-xs text-gray-600" };
const _hoisted_12 = { class: "px-4 py-3" };


const _sfc_main = {
  __name: 'PromiseToFundReport',
  setup(__props) {

const records = ref([]);
const loading = ref(true);

onMounted(async () => {
  records.value = await fetchPromiseToFundReport();
  loading.value = false;
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[3] || (_cache[3] = createBaseVNode("div", { class: "mb-6 pb-4 border-b border-gray-300" }, [
      createBaseVNode("h1", { class: "text-headline-md font-headline font-semibold text-absa-enrich" }, "Promise to Fund Report"),
      createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Overview of all tracked funding promises from CRM engagements.")
    ], -1)),
    createBaseVNode("div", _hoisted_2, [
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("table", _hoisted_4, [
          _cache[2] || (_cache[2] = createBaseVNode("thead", { class: "bg-gray-50" }, [
            createBaseVNode("tr", null, [
              createBaseVNode("th", {
                scope: "col",
                class: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500"
              }, "Customer ID"),
              createBaseVNode("th", {
                scope: "col",
                class: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500"
              }, "Name"),
              createBaseVNode("th", {
                scope: "col",
                class: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500"
              }, "Amount"),
              createBaseVNode("th", {
                scope: "col",
                class: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500"
              }, "Expected Date"),
              createBaseVNode("th", {
                scope: "col",
                class: "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500"
              }, "Status")
            ])
          ], -1)),
          createBaseVNode("tbody", _hoisted_5, [
            (loading.value)
              ? (openBlock(), createElementBlock("tr", _hoisted_6, [...(_cache[0] || (_cache[0] = [
                  createBaseVNode("td", {
                    colspan: "5",
                    class: "px-4 py-8 text-center text-xs text-gray-500"
                  }, "Loading records...", -1)
                ]))]))
              : (!records.value.length)
                ? (openBlock(), createElementBlock("tr", _hoisted_7, [...(_cache[1] || (_cache[1] = [
                    createBaseVNode("td", {
                      colspan: "5",
                      class: "px-4 py-8 text-center text-xs text-gray-500"
                    }, "No Promise to Fund records found.", -1)
                  ]))]))
                : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(records.value, (r) => {
                    return (openBlock(), createElementBlock("tr", {
                      key: r.id,
                      class: "hover:bg-gray-50"
                    }, [
                      createBaseVNode("td", _hoisted_8, toDisplayString(r.customerId), 1),
                      createBaseVNode("td", _hoisted_9, toDisplayString(r.customerName), 1),
                      createBaseVNode("td", _hoisted_10, toDisplayString(r.amount.toLocaleString()), 1),
                      createBaseVNode("td", _hoisted_11, toDisplayString(r.date), 1),
                      createBaseVNode("td", _hoisted_12, [
                        createBaseVNode("span", {
                          class: normalizeClass([r.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800', "px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide"])
                        }, toDisplayString(r.status), 3)
                      ])
                    ]))
                  }), 128))
          ])
        ])
      ])
    ])
  ]))
}
}

};

export { _sfc_main as default };
