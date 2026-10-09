import { _ as _export_sfc, r as ref, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, A as createTextVNode, t as toDisplayString, j as createCommentVNode, v as withModifiers, x as withDirectives, y as vModelText, h as normalizeClass, s as unref, C as createBlock, a as createStaticVNode, D as resolveComponent, o as openBlock } from './index-rR_eRHdu.js';
import { _ as _imports_0, a as _imports_1 } from './logo_white-DPEPhQGw.js';
import { r as requestPasswordReset } from './auth_api-BRvnNIi6.js';
import { M as Mail } from './mail-B-IsY1kd.js';
import { L as LoaderCircle } from './loader-circle-CBZniwa2.js';

const _hoisted_1 = { class: "min-h-screen flex flex-col lg:flex-row font-sans overflow-hidden" };
const _hoisted_2 = { class: "flex flex-col justify-center items-center w-full lg:w-5/12 relative z-10 bg-white border-r border-gray-200" };
const _hoisted_3 = { class: "w-full max-w-md mx-auto px-6 py-8" };
const _hoisted_4 = { class: "text-center mb-10" };
const _hoisted_5 = { class: "bg-white/80 backdrop-blur-sm p-1 rounded-none" };
const _hoisted_6 = {
  key: 0,
  class: "mb-8 p-5 bg-green-50 border-l-4 border-green-500 text-green-700 font-mono text-sm shadow-none"
};
const _hoisted_7 = {
  key: 0,
  class: "mt-4 p-3 bg-white/50 border border-green-100 rounded-sm"
};
const _hoisted_8 = { class: "text-lg font-bold text-[#2F2E8B] tracking-widest" };
const _hoisted_9 = { class: "mt-6" };
const _hoisted_10 = {
  key: 1,
  class: "mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-mono flex items-start shadow-none"
};
const _hoisted_11 = { class: "group" };
const _hoisted_12 = { class: "relative" };
const _hoisted_13 = { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" };
const _hoisted_14 = ["disabled"];
const _hoisted_15 = { class: "relative flex items-center justify-center gap-2" };
const _hoisted_16 = {
  key: 1,
  class: "fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
};
const _hoisted_17 = { class: "mt-10 pt-6 border-t border-gray-100 text-center" };


const _sfc_main = {
  __name: 'ForgotPassword',
  setup(__props) {

const email = ref('');
const loading = ref(false);
const error = ref('');
const emailSent = ref(false);
const otpCode = ref('');

const validateEmail = () => {
  if (!email.value) {
    error.value = 'Email is required';
    return false
  }
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Invalid email format';
    return false
  }
  return true
};

const handleSubmit = async () => {
  error.value = '';
  if (!validateEmail()) return

  loading.value = true;
  try {
    const response = await requestPasswordReset(email.value);
    emailSent.value = true;
    // Store OTP if it's returned (for development mode)
    if (response.otp) {
      otpCode.value = response.otp;
    }
  } catch (err) {
    error.value = err.message || 'Failed to send reset instructions. Please try again.';
  } finally {
    loading.value = false;
  }
};

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _cache[15] || (_cache[15] = createBaseVNode("div", {
        class: "absolute inset-0 pointer-events-none opacity-[0.03]",
        style: {"background-image":"radial-gradient(#2F2E8B 1px, transparent 1px)","background-size":"24px 24px"}
      }, null, -1)),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-[#2F2E8B] text-xs font-mono mb-6 rounded-sm" }, [
            createBaseVNode("i", { class: "fas fa-key-skeleton" }),
            createBaseVNode("span", null, "// RECOVERY_PROTOCOL_V1.4")
          ], -1)),
          createVNode(_component_router_link, {
            to: "/",
            class: "block mb-6 group"
          }, {
            default: withCtx(() => [...(_cache[1] || (_cache[1] = [
              createBaseVNode("img", {
                src: _imports_0,
                alt: "ABSA Intelligence Unit",
                class: "h-12 mx-auto object-contain transition-transform group-hover:scale-105"
              }, null, -1)
            ]))]),
            _: 1
          }),
          _cache[3] || (_cache[3] = createBaseVNode("h2", { class: "text-2xl font-bold text-gray-900 mb-2 tracking-tight" }, [
            createTextVNode("IDENTITY "),
            createBaseVNode("span", { class: "text-[#2F2E8B]" }, "RECOVERY")
          ], -1)),
          _cache[4] || (_cache[4] = createBaseVNode("p", { class: "text-gray-500 text-sm font-mono" }, "Initiate access restoration sequence.", -1))
        ]),
        createBaseVNode("div", _hoisted_5, [
          (emailSent.value)
            ? (openBlock(), createElementBlock("div", _hoisted_6, [
                _cache[7] || (_cache[7] = createBaseVNode("p", { class: "font-bold flex items-center gap-2 mb-2" }, [
                  createBaseVNode("i", { class: "fas fa-check-circle" }),
                  createTextVNode(" TRANSMISSION_SUCCESS ")
                ], -1)),
                _cache[8] || (_cache[8] = createBaseVNode("p", { class: "opacity-80 leading-relaxed mb-4" }, "Reset instructions dispatched to your secure address. Check your inbox.", -1)),
                (otpCode.value)
                  ? (openBlock(), createElementBlock("div", _hoisted_7, [
                      _cache[5] || (_cache[5] = createBaseVNode("p", { class: "text-[10px] text-green-600 font-bold mb-1 uppercase tracking-wider" }, "// DEV_BYPASS_KEY:", -1)),
                      createBaseVNode("code", _hoisted_8, toDisplayString(otpCode.value), 1)
                    ]))
                  : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_9, [
                  createVNode(_component_router_link, {
                    to: `/reset-password?email=${encodeURIComponent(email.value)}`,
                    class: "block w-full text-center bg-[#2F2E8B] text-white py-3 px-4 font-mono text-xs uppercase tracking-widest hover:bg-[#1a1955] transition-all"
                  }, {
                    default: withCtx(() => [...(_cache[6] || (_cache[6] = [
                      createTextVNode(" GO_TO_RESET_TERMINAL ", -1),
                      createBaseVNode("i", { class: "fas fa-terminal ml-2" }, null, -1)
                    ]))]),
                    _: 1
                  }, 8, ["to"])
                ])
              ]))
            : createCommentVNode("", true),
          (error.value)
            ? (openBlock(), createElementBlock("div", _hoisted_10, [
                _cache[9] || (_cache[9] = createBaseVNode("i", { class: "fas fa-exclamation-triangle mt-1 mr-3" }, null, -1)),
                createBaseVNode("span", null, toDisplayString(error.value), 1)
              ]))
            : createCommentVNode("", true),
          (!emailSent.value)
            ? (openBlock(), createElementBlock("form", {
                key: 2,
                class: "space-y-6",
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, [
                createBaseVNode("div", _hoisted_11, [
                  _cache[11] || (_cache[11] = createBaseVNode("label", {
                    for: "email",
                    class: "block text-xs font-mono font-bold text-gray-500 mb-2 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors"
                  }, "Registered_Email", -1)),
                  createBaseVNode("div", _hoisted_12, [
                    withDirectives(createBaseVNode("input", {
                      id: "email",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((email).value = $event)),
                      type: "email",
                      required: "",
                      class: normalizeClass(["block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none", { 'border-red-500 bg-red-50': error.value }]),
                      placeholder: "USER@DOMAIN.COM"
                    }, null, 2), [
                      [vModelText, email.value]
                    ]),
                    createBaseVNode("div", _hoisted_13, [
                      createVNode(unref(Mail), { class: "h-4 w-4 text-gray-400 group-focus-within:text-[#2F2E8B] transition-colors" })
                    ]),
                    _cache[10] || (_cache[10] = createBaseVNode("div", { class: "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity" }, null, -1))
                  ])
                ]),
                createBaseVNode("button", {
                  type: "submit",
                  disabled: loading.value,
                  class: "w-full relative group overflow-hidden bg-[#2F2E8B] text-white py-3 px-4 font-mono text-sm uppercase tracking-wider hover:bg-[#1a1955] transition-all duration-300 disabled:opacity-70"
                }, [
                  _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" }, null, -1)),
                  createBaseVNode("span", _hoisted_15, [
                    (loading.value)
                      ? (openBlock(), createBlock(unref(LoaderCircle), {
                          key: 0,
                          class: "animate-spin h-4 w-4"
                        }))
                      : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(loading.value ? 'TRANSMITTING...' : 'SEND_RESET_CODE') + " ", 1),
                    (!loading.value)
                      ? (openBlock(), createElementBlock("i", _hoisted_16))
                      : createCommentVNode("", true)
                  ])
                ], 8, _hoisted_14)
              ], 32))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_17, [
            _cache[14] || (_cache[14] = createBaseVNode("p", { class: "text-sm text-gray-600 mb-3" }, "Identity remembered?", -1)),
            createVNode(_component_router_link, {
              to: "/login",
              class: "inline-flex items-center gap-2 text-[#2F2E8B] font-mono text-sm font-bold uppercase hover:bg-blue-50 px-4 py-2 border border-transparent hover:border-blue-100 transition-all"
            }, {
              default: withCtx(() => [...(_cache[13] || (_cache[13] = [
                createBaseVNode("i", { class: "fas fa-chevron-left text-[10px]" }, null, -1),
                createTextVNode(" BACK_TO_AUTH ", -1)
              ]))]),
              _: 1
            })
          ])
        ])
      ])
    ]),
    _cache[16] || (_cache[16] = createStaticVNode("<div class=\"hidden lg:flex lg:w-7/12 relative overflow-hidden\" data-v-33a66925><div class=\"absolute inset-0 bg-[#0a0a2a]\" data-v-33a66925><div class=\"absolute inset-0 flex items-center justify-end overflow-hidden\" data-v-33a66925><img src=\"" + _imports_1 + "\" alt=\"Logo Background\" class=\"w-[120%] max-w-none opacity-10 blur-sm translate-x-[20%] mix-blend-overlay grayscale\" data-v-33a66925></div><div class=\"absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(47,46,139,0.4)_0%,transparent_50%)]\" data-v-33a66925></div><div class=\"absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(47,46,139,0.3)_0%,transparent_50%)]\" data-v-33a66925></div><div class=\"absolute inset-0 bg-gradient-to-br from-[#0a0a2a] via-[#2F2E8B]/20 to-[#0a0a2a]\" data-v-33a66925></div><div class=\"absolute inset-0 opacity-[0.15]\" style=\"background-image:linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),\r\n                 linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:50px 50px;\" data-v-33a66925></div></div><div class=\"relative z-10 w-full h-full flex flex-col justify-center px-20\" data-v-33a66925><div class=\"border-l-4 border-blue-400 pl-10\" data-v-33a66925><div class=\"text-blue-300 font-mono text-xs mb-6 tracking-[0.3em] uppercase flex items-center gap-3\" data-v-33a66925><span class=\"w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#60A5FA]\" data-v-33a66925></span> RECOVERY_MODE: ENABLED </div><h2 class=\"text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight font-sans tracking-tight\" data-v-33a66925> Secure Password<br data-v-33a66925><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white\" data-v-33a66925>Restoration Hub</span></h2><p class=\"text-blue-100/60 text-xl max-w-lg leading-relaxed font-light font-sans italic\" data-v-33a66925> &quot;Critical systems require verified identity and updated credentials. We&#39;re securing your return.&quot; </p></div></div><div class=\"absolute bottom-8 right-8 text-[#2F2E8B]/20 font-mono text-[10px] text-right pointer-events-none select-none\" data-v-33a66925><div data-v-33a66925>RECOVERY_KEY_SEQUENCE_ACTIVE</div><div data-v-33a66925>HASH_VERIFICATION_PENDING</div></div></div>", 1))
  ]))
}
}

};
const ForgotPassword = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-33a66925"]]);

export { ForgotPassword as default };
