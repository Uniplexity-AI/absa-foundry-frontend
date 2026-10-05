import { _ as _export_sfc, r as ref, f as onMounted, c as createElementBlock, b as createBaseVNode, q as createVNode, w as withCtx, A as createTextVNode, j as createCommentVNode, v as withModifiers, x as withDirectives, y as vModelText, h as normalizeClass, t as toDisplayString, z as vModelDynamic, C as createBlock, s as unref, a as createStaticVNode, E as useRoute, D as resolveComponent, u as useRouter, o as openBlock } from './index-CSRWfGkc.js';
import { _ as _imports_0, a as _imports_1 } from './logo_white-DPEPhQGw.js';
import { a as resetPassword } from './auth_api-CkzB0jMn.js';
import { E as Eye } from './eye-BSX0WebV.js';
import { E as EyeOff } from './eye-off-R4NjDIfS.js';
import { L as LoaderCircle } from './loader-circle-RZsy0lpi.js';

const _hoisted_1 = { class: "min-h-screen flex flex-col lg:flex-row bg-white font-sans overflow-hidden" };
const _hoisted_2 = { class: "flex flex-col justify-center items-center w-full lg:w-5/12 relative z-10 bg-white border-r border-gray-200" };
const _hoisted_3 = { class: "w-full max-w-md mx-auto px-6 py-8" };
const _hoisted_4 = { class: "text-center mb-10" };
const _hoisted_5 = { class: "bg-white/80 backdrop-blur-sm p-1 rounded-none" };
const _hoisted_6 = {
  key: 0,
  class: "mb-8 p-5 bg-green-50 border-l-4 border-green-500 text-green-700 font-mono text-sm shadow-none animate-pulse"
};
const _hoisted_7 = { class: "group" };
const _hoisted_8 = { class: "relative" };
const _hoisted_9 = {
  key: 0,
  class: "mt-1 text-xs text-red-500 font-mono tracking-tighter"
};
const _hoisted_10 = { class: "group" };
const _hoisted_11 = { class: "relative" };
const _hoisted_12 = {
  key: 0,
  class: "mt-1 text-xs text-red-500 font-mono tracking-tighter"
};
const _hoisted_13 = { class: "group" };
const _hoisted_14 = { class: "relative" };
const _hoisted_15 = ["type"];
const _hoisted_16 = {
  key: 0,
  class: "mt-1 text-xs text-red-500 font-mono tracking-tighter"
};
const _hoisted_17 = { class: "group" };
const _hoisted_18 = { class: "relative" };
const _hoisted_19 = ["type"];
const _hoisted_20 = {
  key: 0,
  class: "mt-1 text-xs text-red-500 font-mono tracking-tighter"
};
const _hoisted_21 = { class: "flex gap-4 pt-4" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = ["disabled"];
const _hoisted_24 = { class: "relative flex items-center justify-center gap-2" };
const _hoisted_25 = { class: "mt-10 pt-6 border-t border-gray-100 text-center" };


const _sfc_main = {
  __name: 'ResetPassword',
  setup(__props) {

const form = ref({
  email: '',
  otp: '',
  password: '',
  confirmPassword: ''
});
const errors = ref({
  email: null,
  otp: null,
  password: null,
  confirmPassword: null
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const showSuccess = ref(false);

const router = useRouter();
const route = useRoute();

// Pre-fill email if passed as query parameter
onMounted(() => {
  if (route.query.email) {
    form.value.email = route.query.email;
  }
});

function validatePassword() {
  errors.value.email = null;
  errors.value.otp = null;
  errors.value.password = null;
  errors.value.confirmPassword = null;

  if (!form.value.email) {
    errors.value.email = 'Email is required';
    return false;
  }

  if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = 'Invalid email format';
    return false;
  }

  if (!form.value.otp) {
    errors.value.otp = 'Reset code is required';
    return false;
  }

  if (form.value.otp.length !== 6 || !/^\d{6}$/.test(form.value.otp)) {
    errors.value.otp = 'Reset code must be 6 digits';
    return false;
  }

  if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters long';
    return false;
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
    return false;
  }

  return true;
}

async function handleSubmit() {
  if (isLoading.value) return;

  if (!validatePassword()) return;

  isLoading.value = true;

  try {
    await resetPassword(form.value.email, form.value.otp, form.value.password);
    showSuccess.value = true;
    // Redirect to login after a short delay so the user sees confirmation
    setTimeout(() => router.push('/login'), 2500);
  } catch (error) {
    errors.value.password = error.message || 'Failed to reset password. Please try again.';
  } finally {
    isLoading.value = false;
  }
}

return (_ctx, _cache) => {
  const _component_router_link = resolveComponent("router-link");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", _hoisted_2, [
      _cache[23] || (_cache[23] = createBaseVNode("div", {
        class: "absolute inset-0 pointer-events-none opacity-[0.03]",
        style: {"background-image":"radial-gradient(#2F2E8B 1px, transparent 1px)","background-size":"24px 24px"}
      }, null, -1)),
      createBaseVNode("div", _hoisted_3, [
        createBaseVNode("div", _hoisted_4, [
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 text-[#2F2E8B] text-xs font-mono mb-6 rounded-sm" }, [
            createBaseVNode("i", { class: "fas fa-sync-alt" }),
            createBaseVNode("span", null, "// RESET_SEQUENCE_V2.0")
          ], -1)),
          createVNode(_component_router_link, {
            to: "/",
            class: "block mb-6 group"
          }, {
            default: withCtx(() => [...(_cache[7] || (_cache[7] = [
              createBaseVNode("img", {
                src: _imports_0,
                alt: "ABSA Intelligence Unit",
                class: "h-12 mx-auto object-contain transition-transform group-hover:scale-105"
              }, null, -1)
            ]))]),
            _: 1
          }),
          _cache[9] || (_cache[9] = createBaseVNode("h2", { class: "text-2xl font-bold text-gray-900 mb-2 tracking-tight" }, [
            createTextVNode("CREDENTIAL "),
            createBaseVNode("span", { class: "text-[#2F2E8B]" }, "UPDATE")
          ], -1)),
          _cache[10] || (_cache[10] = createBaseVNode("p", { class: "text-gray-500 text-sm font-mono" }, "Execute password synchronization protocol.", -1))
        ]),
        createBaseVNode("div", _hoisted_5, [
          (showSuccess.value)
            ? (openBlock(), createElementBlock("div", _hoisted_6, [...(_cache[11] || (_cache[11] = [
                createBaseVNode("p", { class: "font-bold flex items-center gap-2 mb-2" }, [
                  createBaseVNode("i", { class: "fas fa-check-circle" }),
                  createTextVNode(" RESET_SUCCESS ")
                ], -1),
                createBaseVNode("p", { class: "opacity-80 leading-relaxed" }, "System initialized with new credentials. Redirecting to auth terminal...", -1)
              ]))]))
            : createCommentVNode("", true),
          (!showSuccess.value)
            ? (openBlock(), createElementBlock("form", {
                key: 1,
                onSubmit: withModifiers(handleSubmit, ["prevent"]),
                class: "space-y-5",
                novalidate: ""
              }, [
                createBaseVNode("div", _hoisted_7, [
                  _cache[13] || (_cache[13] = createBaseVNode("label", {
                    for: "email",
                    class: "block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors"
                  }, "Target_Identity", -1)),
                  createBaseVNode("div", _hoisted_8, [
                    withDirectives(createBaseVNode("input", {
                      id: "email",
                      type: "email",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((form.value.email) = $event)),
                      required: "",
                      class: normalizeClass(["block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none", { 'border-red-500 bg-red-50': errors.value.email }]),
                      placeholder: "USER@DOMAIN.COM"
                    }, null, 2), [
                      [vModelText, form.value.email]
                    ]),
                    _cache[12] || (_cache[12] = createBaseVNode("div", { class: "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity" }, null, -1))
                  ]),
                  (errors.value.email)
                    ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(errors.value.email), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_10, [
                  _cache[15] || (_cache[15] = createBaseVNode("label", {
                    for: "otp",
                    class: "block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors"
                  }, "Verification_Key", -1)),
                  createBaseVNode("div", _hoisted_11, [
                    withDirectives(createBaseVNode("input", {
                      id: "otp",
                      type: "text",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((form.value.otp) = $event)),
                      required: "",
                      class: normalizeClass(["block w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none", { 'border-red-500 bg-red-50': errors.value.otp }]),
                      placeholder: "000000"
                    }, null, 2), [
                      [vModelText, form.value.otp]
                    ]),
                    _cache[14] || (_cache[14] = createBaseVNode("div", { class: "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity" }, null, -1))
                  ]),
                  (errors.value.otp)
                    ? (openBlock(), createElementBlock("p", _hoisted_12, toDisplayString(errors.value.otp), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_13, [
                  _cache[17] || (_cache[17] = createBaseVNode("label", {
                    for: "password",
                    class: "block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors"
                  }, "New_Secret", -1)),
                  createBaseVNode("div", _hoisted_14, [
                    withDirectives(createBaseVNode("input", {
                      id: "password",
                      type: showPassword.value ? 'text' : 'password',
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((form.value.password) = $event)),
                      required: "",
                      class: normalizeClass(["block w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none", { 'border-red-500 bg-red-50': errors.value.password }]),
                      placeholder: "••••••••••••"
                    }, null, 10, _hoisted_15), [
                      [vModelDynamic, form.value.password]
                    ]),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[3] || (_cache[3] = $event => (showPassword.value = !showPassword.value)),
                      class: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2F2E8B] transition-colors"
                    }, [
                      (!showPassword.value)
                        ? (openBlock(), createBlock(unref(Eye), {
                            key: 0,
                            class: "w-4 h-4"
                          }))
                        : (openBlock(), createBlock(unref(EyeOff), {
                            key: 1,
                            class: "w-4 h-4"
                          }))
                    ]),
                    _cache[16] || (_cache[16] = createBaseVNode("div", { class: "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity" }, null, -1))
                  ]),
                  (errors.value.password)
                    ? (openBlock(), createElementBlock("p", _hoisted_16, toDisplayString(errors.value.password), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_17, [
                  _cache[19] || (_cache[19] = createBaseVNode("label", {
                    for: "confirmPassword",
                    class: "block text-xs font-mono font-bold text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-[#2F2E8B] transition-colors"
                  }, "Verify_Secret", -1)),
                  createBaseVNode("div", _hoisted_18, [
                    withDirectives(createBaseVNode("input", {
                      id: "confirmPassword",
                      type: showConfirmPassword.value ? 'text' : 'password',
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => ((form.value.confirmPassword) = $event)),
                      required: "",
                      class: normalizeClass(["block w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#2F2E8B] focus:bg-white transition-all font-mono text-sm shadow-none", { 'border-red-500 bg-red-50': errors.value.confirmPassword }]),
                      placeholder: "••••••••••••"
                    }, null, 10, _hoisted_19), [
                      [vModelDynamic, form.value.confirmPassword]
                    ]),
                    createBaseVNode("button", {
                      type: "button",
                      onClick: _cache[5] || (_cache[5] = $event => (showConfirmPassword.value = !showConfirmPassword.value)),
                      class: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2F2E8B] transition-colors"
                    }, [
                      (!showConfirmPassword.value)
                        ? (openBlock(), createBlock(unref(Eye), {
                            key: 0,
                            class: "w-4 h-4"
                          }))
                        : (openBlock(), createBlock(unref(EyeOff), {
                            key: 1,
                            class: "w-4 h-4"
                          }))
                    ]),
                    _cache[18] || (_cache[18] = createBaseVNode("div", { class: "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#2F2E8B] opacity-0 group-focus-within:opacity-100 transition-opacity" }, null, -1))
                  ]),
                  (errors.value.confirmPassword)
                    ? (openBlock(), createElementBlock("p", _hoisted_20, toDisplayString(errors.value.confirmPassword), 1))
                    : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: _cache[6] || (_cache[6] = $event => (unref(router).push('/login'))),
                    class: "flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-mono text-xs uppercase tracking-widest hover:bg-gray-50 hover:text-[#2F2E8B] hover:border-[#2F2E8B] transition-all",
                    disabled: isLoading.value
                  }, " CANCEL ", 8, _hoisted_22),
                  createBaseVNode("button", {
                    type: "submit",
                    class: "flex-1 relative group overflow-hidden bg-[#2F2E8B] text-white py-3 px-4 font-mono text-xs uppercase tracking-widest hover:bg-[#1a1955] transition-all duration-300 disabled:opacity-70",
                    disabled: isLoading.value
                  }, [
                    _cache[20] || (_cache[20] = createBaseVNode("div", { class: "absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" }, null, -1)),
                    createBaseVNode("span", _hoisted_24, [
                      (isLoading.value)
                        ? (openBlock(), createBlock(unref(LoaderCircle), {
                            key: 0,
                            class: "animate-spin h-3 w-3"
                          }))
                        : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(isLoading.value ? 'UPDATING...' : 'FINALIZE_RESET'), 1)
                    ])
                  ], 8, _hoisted_23)
                ])
              ], 32))
            : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_25, [
            _cache[22] || (_cache[22] = createBaseVNode("p", { class: "text-sm text-gray-600 mb-3" }, "Identity remembered?", -1)),
            createVNode(_component_router_link, {
              to: "/login",
              class: "inline-flex items-center gap-2 text-[#2F2E8B] font-mono text-sm font-bold uppercase hover:bg-blue-50 px-4 py-2 border border-transparent hover:border-blue-100 transition-all"
            }, {
              default: withCtx(() => [...(_cache[21] || (_cache[21] = [
                createBaseVNode("i", { class: "fas fa-chevron-left text-[10px]" }, null, -1),
                createTextVNode(" BACK_TO_AUTH ", -1)
              ]))]),
              _: 1
            })
          ])
        ])
      ])
    ]),
    _cache[24] || (_cache[24] = createStaticVNode("<div class=\"hidden lg:flex lg:w-7/12 relative overflow-hidden\" data-v-6f0f672d><div class=\"absolute inset-0 bg-[#0a0a2a]\" data-v-6f0f672d><div class=\"absolute inset-0 flex items-center justify-end overflow-hidden\" data-v-6f0f672d><img src=\"" + _imports_1 + "\" alt=\"Logo Background\" class=\"w-[120%] max-w-none opacity-10 blur-sm translate-x-[20%] mix-blend-overlay grayscale\" data-v-6f0f672d></div><div class=\"absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(47,46,139,0.4)_0%,transparent_50%)]\" data-v-6f0f672d></div><div class=\"absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,46,139,0.3)_0%,transparent_50%)]\" data-v-6f0f672d></div><div class=\"absolute inset-0 bg-gradient-to-br from-[#0a0a2a] via-[#2F2E8B]/20 to-[#0a0a2a]\" data-v-6f0f672d></div><div class=\"absolute inset-0 opacity-[0.15]\" style=\"background-image:linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),\r\n                 linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);background-size:50px 50px;\" data-v-6f0f672d></div></div><div class=\"relative z-10 w-full h-full flex flex-col justify-center px-20\" data-v-6f0f672d><div class=\"border-l-4 border-blue-400 pl-10\" data-v-6f0f672d><div class=\"text-blue-300 font-mono text-xs mb-6 tracking-[0.3em] uppercase flex items-center gap-3\" data-v-6f0f672d><span class=\"w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#60A5FA]\" data-v-6f0f672d></span> SECURITY_CLEARANCE: REQUIRED </div><h2 class=\"text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight font-sans tracking-tight\" data-v-6f0f672d> Reset Secret<br data-v-6f0f672d><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white\" data-v-6f0f672d>To Continue Securely</span></h2><p class=\"text-blue-100/60 text-xl max-w-lg leading-relaxed font-light font-sans italic\" data-v-6f0f672d> &quot;Updated credentials ensure the integrity of your business network. Follow the sequence to restoration.&quot; </p></div></div></div>", 1))
  ]))
}
}

};
const ResetPassword = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-6f0f672d"]]);

export { ResetPassword as default };
