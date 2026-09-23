import { o as openBlock, c as createElementBlock, b as createBaseVNode, F as Fragment, e as renderList, a as createStaticVNode, t as toDisplayString, j as createCommentVNode } from './index-CJBj3n9Z.js';

const _hoisted_1 = {
  key: 0,
  class: "animate-pulse bg-white border border-gray-200 p-5"
};
const _hoisted_2 = {
  key: 1,
  class: "animate-pulse bg-white border border-gray-200 p-6"
};
const _hoisted_3 = {
  key: 2,
  class: "animate-pulse"
};
const _hoisted_4 = {
  key: 3,
  class: "animate-pulse bg-white border border-gray-200 p-6"
};
const _hoisted_5 = {
  key: 4,
  class: "animate-pulse"
};
const _hoisted_6 = { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" };
const _hoisted_7 = {
  key: 5,
  class: "animate-pulse h-full"
};
const _hoisted_8 = {
  key: 6,
  class: "flex items-center justify-center py-6"
};
const _hoisted_9 = { class: "flex items-center gap-3" };
const _hoisted_10 = {
  key: 0,
  class: "text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest"
};
const _hoisted_11 = {
  key: 7,
  class: "animate-pulse"
};


const _sfc_main = {
  __name: 'LoadingSkeleton',
  props: {
  type: {
    type: String,
    required: true,
    validator: (value) => ['card', 'kpi', 'table', 'module', 'stats', 'block', 'spinner'].includes(value)
  },
  message: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 5
  }
},
  setup(__props) {



return (_ctx, _cache) => {
  return (__props.type === 'kpi')
    ? (openBlock(), createElementBlock("div", _hoisted_1, [...(_cache[0] || (_cache[0] = [
        createBaseVNode("div", { class: "space-y-3" }, [
          createBaseVNode("div", { class: "h-3 bg-gray-200 rounded-none w-2/3" }),
          createBaseVNode("div", { class: "h-8 bg-gray-200 rounded-none w-1/2" }),
          createBaseVNode("div", { class: "h-3 bg-gray-200 rounded-none w-1/3" })
        ], -1)
      ]))]))
    : (__props.type === 'card')
      ? (openBlock(), createElementBlock("div", _hoisted_2, [...(_cache[1] || (_cache[1] = [
          createBaseVNode("div", { class: "space-y-4" }, [
            createBaseVNode("div", { class: "h-4 bg-gray-200 rounded-none w-3/4" }),
            createBaseVNode("div", { class: "h-8 bg-gray-200 rounded-none w-1/2" }),
            createBaseVNode("div", { class: "h-3 bg-gray-200 rounded-none w-full" })
          ], -1)
        ]))]))
      : (__props.type === 'table')
        ? (openBlock(), createElementBlock("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.count, (i) => {
              return (openBlock(), createElementBlock("div", {
                key: i,
                class: "flex gap-4 py-3 border-b border-gray-100"
              }, [...(_cache[2] || (_cache[2] = [
                createBaseVNode("div", { class: "h-4 bg-gray-200 rounded-none w-1/4" }, null, -1),
                createBaseVNode("div", { class: "h-4 bg-gray-200 rounded-none w-1/3" }, null, -1),
                createBaseVNode("div", { class: "h-4 bg-gray-200 rounded-none w-1/4" }, null, -1),
                createBaseVNode("div", { class: "h-4 bg-gray-200 rounded-none w-1/6" }, null, -1)
              ]))]))
            }), 128))
          ]))
        : (__props.type === 'module')
          ? (openBlock(), createElementBlock("div", _hoisted_4, [...(_cache[3] || (_cache[3] = [
              createStaticVNode("<div class=\"flex items-center gap-4 mb-4\"><div class=\"w-12 h-12 bg-gray-200 rounded-none\"></div><div class=\"flex-1\"><div class=\"h-5 bg-gray-200 rounded-none w-3/4 mb-2\"></div><div class=\"h-4 bg-gray-200 rounded-none w-1/2\"></div></div></div><div class=\"h-10 bg-gray-200 rounded-none w-full\"></div>", 2)
            ]))]))
          : (__props.type === 'stats')
            ? (openBlock(), createElementBlock("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  (openBlock(), createElementBlock(Fragment, null, renderList(4, (i) => {
                    return createBaseVNode("div", {
                      key: i,
                      class: "bg-white border border-gray-200 p-5"
                    }, [...(_cache[4] || (_cache[4] = [
                      createBaseVNode("div", { class: "h-3 bg-gray-200 rounded-none w-2/3 mb-3" }, null, -1),
                      createBaseVNode("div", { class: "h-7 bg-gray-200 rounded-none w-1/2 mb-2" }, null, -1),
                      createBaseVNode("div", { class: "h-3 bg-gray-200 rounded-none w-1/4" }, null, -1)
                    ]))])
                  }), 64))
                ])
              ]))
            : (__props.type === 'block')
              ? (openBlock(), createElementBlock("div", _hoisted_7, [...(_cache[5] || (_cache[5] = [
                  createStaticVNode("<div class=\"bg-white border border-gray-200 p-6 h-full\"><div class=\"h-4 bg-gray-200 rounded-none w-1/3 mb-4\"></div><div class=\"space-y-3\"><div class=\"h-3 bg-gray-200 rounded-none w-full\"></div><div class=\"h-3 bg-gray-200 rounded-none w-5/6\"></div><div class=\"h-3 bg-gray-200 rounded-none w-4/6\"></div></div></div>", 1)
                ]))]))
              : (__props.type === 'spinner')
                ? (openBlock(), createElementBlock("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      _cache[6] || (_cache[6] = createBaseVNode("div", { class: "h-5 w-5 border-2 border-gray-200 border-t-[var(--brand-primary)] rounded-full animate-spin" }, null, -1)),
                      (__props.message)
                        ? (openBlock(), createElementBlock("p", _hoisted_10, toDisplayString(__props.message), 1))
                        : createCommentVNode("", true)
                    ])
                  ]))
                : (openBlock(), createElementBlock("div", _hoisted_11, [...(_cache[7] || (_cache[7] = [
                    createBaseVNode("div", { class: "bg-gray-200 rounded-none h-4 w-full" }, null, -1)
                  ]))]))
}
}

};

export { _sfc_main as _ };
