import { g as _export_sfc, o as openBlock, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, m as createTextVNode, A as resolveComponent } from './index-F0Jaczum.js';

const _sfc_main = {  };

const _hoisted_1 = { class: "text-center mt-[10vh] p-8 bg-white min-h-screen" };

function _sfc_render(_ctx, _cache) {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[1] || (_cache[1] = createBaseVNode("h1", { class: "text-8xl font-light text-gray-900" }, "403", -1)),
    _cache[2] || (_cache[2] = createBaseVNode("h2", { class: "text-3xl font-light text-gray-700 mb-4" }, "Unauthorized Access", -1)),
    _cache[3] || (_cache[3] = createBaseVNode("p", { class: "text-gray-500 font-light mb-8" }, "You do not have permission to view this page.", -1)),
    createVNode(_component_router_link, {
      to: "/dashboard",
      class: "text-[#2F2E8B] hover:text-[#1D226B] font-light hover:underline transition-colors"
    }, {
      default: withCtx(() => [...(_cache[0] || (_cache[0] = [
        createTextVNode(" Go to Dashboard ", -1)
      ]))]),
      _: 1
    })
  ]))
}
const _403 = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render]]);

export { _403 as default };
