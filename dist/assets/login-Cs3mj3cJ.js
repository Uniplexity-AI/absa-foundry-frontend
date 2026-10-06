import { i as computed, o as openBlock, c as createElementBlock, b as createBaseVNode, j as createCommentVNode, k as renderSlot, m as mergeProps, h as normalizeClass, n as normalizeStyle, l as useAuthStore, r as ref, p as reactive, a as createStaticVNode, q as createVNode, w as withCtx, s as unref, u as useRouter, t as toDisplayString, v as withModifiers, x as withDirectives, y as vModelText, z as vModelDynamic, A as createTextVNode, B as login } from './index-DJKk8LB7.js';
import { _ as _imports_0 } from './absa-logo-9HGm9yZP.js';
/* empty css                                                               */
import './DashboardWidgets.vue_vue_type_style_index_0_scoped_b35b74ab_lang-BRUU9VcN.js';

const _hoisted_1$2 = ["disabled"];
const _hoisted_2$2 = {
  key: 0,
  class: "animate-spin h-4 w-4",
  fill: "none",
  viewBox: "0 0 24 24"
};


const _sfc_main$2 = {
  __name: 'AbsaButton',
  props: {
  /** absa: Passion bg (primary), power: Power bg, outline: Passion border, ghost: no bg */
  variant: {
    type: String,
    default: 'absa',
    validator: (v) => ['absa', 'power', 'hope', 'outline', 'ghost', 'energy', 'danger'].includes(v)
  },
  /** sm, md, lg */
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  /** Make button full-width */
  block: { type: Boolean, default: false }
},
  setup(__props) {

const props = __props;

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-button',
  md: 'px-4 py-2 text-sm gap-2 rounded-button',
  lg: 'px-6 py-3 text-base gap-2.5 rounded-button'
};

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center font-semibold transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--absa-passion,#DC0037)]',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeClasses[props.size],
    props.block ? 'w-full' : ''
  ];

  const variants = {
    absa: [
      'bg-[var(--absa-passion,#DC0037)] text-white',
      'hover:bg-[var(--absa-power,#B50232)] hover:shadow-md',
      'active:bg-[var(--absa-hope,#95052A)]'
    ],
    power: [
      'bg-[var(--absa-power,#B50232)] text-white',
      'hover:bg-[var(--absa-hope,#95052A)] hover:shadow-md',
      'active:bg-[var(--absa-inspire,#77021E)]'
    ],
    hope: [
      'bg-[var(--absa-hope,#95052A)] text-white',
      'hover:bg-[var(--absa-inspire,#77021E)] hover:shadow-md',
      'active:bg-[var(--absa-inspire,#77021E)]'
    ],
    outline: [
      'border-2 border-[var(--absa-passion,#DC0037)] text-[var(--absa-passion,#DC0037)] bg-transparent',
      'hover:bg-[var(--absa-passion,#DC0037)] hover:text-white hover:shadow-md',
      'active:bg-[var(--absa-power,#B50232)] active:border-[var(--absa-power,#B50232)]'
    ],
    ghost: [
      'text-[var(--absa-passion,#DC0037)] bg-transparent',
      'hover:bg-red-50',
      'active:bg-red-100'
    ],
    energy: [
      'bg-[var(--absa-energy,#FF780F)] text-white',
      'hover:brightness-110 hover:shadow-md',
      'active:brightness-95'
    ],
    danger: [
      'bg-red-600 text-white',
      'hover:bg-red-700 hover:shadow-md',
      'active:bg-red-800'
    ]
  };

  return [...base, ...(variants[props.variant] || variants.absa)]
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("button", mergeProps({
    class: buttonClasses.value,
    disabled: __props.disabled || __props.loading
  }, _ctx.$attrs), [
    (__props.loading)
      ? (openBlock(), createElementBlock("svg", _hoisted_2$2, [...(_cache[0] || (_cache[0] = [
          createBaseVNode("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4"
          }, null, -1),
          createBaseVNode("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          }, null, -1)
        ]))]))
      : createCommentVNode("", true),
    (!__props.loading)
      ? renderSlot(_ctx.$slots, "icon-left", { key: 1 })
      : createCommentVNode("", true),
    createBaseVNode("span", null, [
      renderSlot(_ctx.$slots, "default")
    ]),
    (!__props.loading)
      ? renderSlot(_ctx.$slots, "icon-right", { key: 2 })
      : createCommentVNode("", true)
  ], 16, _hoisted_1$2))
}
}

};

const _hoisted_1$1 = { class: "relative z-10" };
const _hoisted_2$1 = {
  key: 0,
  class: "mb-4"
};
const _hoisted_3$1 = {
  key: 1,
  class: "mt-4 pt-4 border-t border-gray-100"
};


const _sfc_main$1 = /*@__PURE__*/Object.assign({ name: 'AbsaCard' }, {
  __name: 'AbsaCard',
  props: {
  /** Card padding size */
  padding: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  /** Accent bar colour */
  accent: {
    type: String,
    default: 'passion',
    validator: (v) => ['passion', 'power', 'hope', 'energy', 'none'].includes(v)
  },
  /** Enable hover lift + gradient effect */
  hoverable: { type: Boolean, default: true },
  /** Flat style — no shadow, lighter border */
  flat: { type: Boolean, default: false },
  /** Render the standard card border */
  bordered: { type: Boolean, default: true },
  /** Corner treatment for the card shell */
  rounded: {
    type: String,
    default: 'xl',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'xl'].includes(v)
  }
},
  setup(__props) {



const props = __props;

const paddingClasses = {
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8'
};

const roundedClasses = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
};

const accentColorClass = computed(() => {
  const map = {
    passion: 'bg-[var(--absa-passion,#DC0037)]',
    power: 'bg-[var(--absa-power,#B50232)]',
    hope: 'bg-[var(--absa-hope,#95052A)]',
    energy: 'bg-[var(--absa-energy,#FF780F)]',
    none: 'bg-transparent'
  };
  return map[props.accent]
});

const hoverGradient = computed(() => {
  // Extra-subtle brand red gradient — only visible on hover
  return 'background: linear-gradient(135deg, rgba(220,0,55,0.015) 0%, rgba(181,2,50,0.015) 50%, rgba(149,5,42,0.01) 100%)'
});

const cardClasses = computed(() => [
  'relative bg-white overflow-hidden group transition-all duration-200',
  roundedClasses[props.rounded],
  paddingClasses[props.padding],
  props.hoverable ? 'hover:shadow-md hover:-translate-y-0.5' : '',
  props.bordered ? (props.flat ? 'border border-gray-300 shadow-none' : 'border border-[#E8E8EC] shadow-sm') : 'border-0 shadow-none'
]);

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", mergeProps({ class: cardClasses.value }, _ctx.$attrs), [
    createBaseVNode("div", {
      class: normalizeClass(["absolute top-0 left-0 right-0 h-1 rounded-t-xl", accentColorClass.value]),
      "aria-hidden": "true"
    }, null, 2),
    (__props.hoverable)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
          style: normalizeStyle(hoverGradient.value),
          "aria-hidden": "true"
        }, null, 4))
      : createCommentVNode("", true),
    createBaseVNode("div", _hoisted_1$1, [
      (_ctx.$slots.header)
        ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
            renderSlot(_ctx.$slots, "header")
          ]))
        : createCommentVNode("", true),
      renderSlot(_ctx.$slots, "default"),
      (_ctx.$slots.footer)
        ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
            renderSlot(_ctx.$slots, "footer")
          ]))
        : createCommentVNode("", true)
    ])
  ], 16))
}
}

});

const _hoisted_1 = { class: "absa-mesh min-h-screen px-6 py-10 text-absa-enrich lg:flex lg:items-center lg:justify-center" };
const _hoisted_2 = { class: "w-full max-w-md" };
const _hoisted_3 = {
  class: "mb-5 min-h-12",
  "aria-live": "polite"
};
const _hoisted_4 = {
  key: 0,
  class: "flex min-h-12 items-start gap-2 border border-red-900/20 border-l-4 border-l-red-900 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-900",
  role: "alert"
};
const _hoisted_5 = { class: "font-semibold" };
const _hoisted_6 = {
  key: 1,
  class: "flex min-h-12 items-start gap-2 border border-green-600/20 border-l-4 border-l-green-600 bg-green-50 px-3 py-2.5 text-xs leading-5 text-green-700",
  role: "status"
};
const _hoisted_7 = { class: "font-semibold" };
const _hoisted_8 = {
  key: 0,
  class: "mt-1 text-xs font-semibold text-red-900"
};
const _hoisted_9 = { class: "relative" };
const _hoisted_10 = ["type"];
const _hoisted_11 = ["aria-label"];
const _hoisted_12 = {
  class: "material-symbols-outlined text-[20px]",
  "aria-hidden": "true"
};
const _hoisted_13 = { class: "mt-1 min-h-5" };
const _hoisted_14 = {
  key: 0,
  class: "flex items-center gap-1 text-xs font-semibold text-amber-700"
};
const _hoisted_15 = {
  key: 1,
  class: "text-xs font-semibold text-red-900"
};


const _sfc_main = /*@__PURE__*/Object.assign({ name: 'LoginView' }, {
  __name: 'login',
  setup(__props) {



const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const showPassword = ref(false);
const capsLockOn = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const passwordVisibilityLabel = computed(() => (showPassword.value ? 'Hide password' : 'Show password'));

const formData = reactive({
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: ''
});

// ── Caps Lock Detection ──
const checkCapsLock = (e) => {
  if (typeof e?.getModifierState !== 'function') return
  capsLockOn.value = e.getModifierState('CapsLock');
};

// ── Form Validation ──
const validateForm = () => {
  let isValid = true;
  errors.email = '';
  errors.password = '';

  if (!formData.email.trim()) {
    errors.email = 'Email or username is required';
    isValid = false;
  }

  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  }

  return isValid
};

// ── Form Submit ──
const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await login(formData.email, formData.password);
    if (!response.access_token) throw new Error('No token received')

    // Populate the Pinia auth store — this also persists to localStorage
    authStore.setSession(response);

    // Drop legacy fork keys that this ABSA backend never issues
    localStorage.removeItem('company_name');
    localStorage.removeItem('tenant_id');
    localStorage.removeItem('active_subaccount_id');
    localStorage.removeItem('active_subaccount_email');
    localStorage.removeItem('active_subaccount_name');

    successMessage.value = 'Login successful!';

    // Role-based landing: ADMIN/RM → portfolio; DS → models; OPS → ETL
    const landingByRole = {
      DATA_SCIENTIST: '/dashboard/models',
      OPERATIONS: '/dashboard/etl-run-history'
    };
    const primaryRole = authStore.primaryRole || '';
    const defaultLanding = landingByRole[primaryRole] || '/dashboard/portfolio';

    setTimeout(() => {
      const intended = localStorage.getItem('intended_route');
      if (intended) {
        localStorage.removeItem('intended_route');
        router.push(intended);
        return
      }
      router.push(defaultLanding);
    }, 1000);
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = 'Invalid username or password. Please verify your Active Directory credentials or contact IT Support.';
    errors.password = 'Invalid credentials';
  } finally {
    loading.value = false;
  }
};


return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("main", _hoisted_2, [
      _cache[9] || (_cache[9] = createStaticVNode("<div class=\"mb-6 flex items-center gap-4 border-b border-gray-300 pb-5\"><img alt=\"Absa\" class=\"h-12 w-12 object-contain\" src=\"" + _imports_0 + "\"><div class=\"border-l-4 border-absa-passion pl-4\"><p class=\"text-[10px] font-bold uppercase tracking-[0.18em] text-absa-passion\">ABSA Intelligence Unit</p><h1 class=\"mt-1 text-xl font-bold tracking-tight text-absa-enrich\"></h1></div></div>", 1)),
      createVNode(unref(_sfc_main$1), {
        accent: "passion",
        hoverable: false,
        flat: "",
        bordered: "",
        rounded: "sm",
        padding: "lg"
      }, {
        default: withCtx(() => [
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "mb-7 border-b border-gray-200 pb-4" }, [
            createBaseVNode("h2", { class: "text-base font-bold text-absa-enrich" }, "Sign in"),
            createBaseVNode("p", { class: "mt-1 text-xs leading-5 text-gray-500" }, "Enter Directory credentials to continue.")
          ], -1)),
          createBaseVNode("div", _hoisted_3, [
            (errorMessage.value)
              ? (openBlock(), createElementBlock("div", _hoisted_4, [
                  _cache[3] || (_cache[3] = createBaseVNode("span", {
                    class: "material-symbols-outlined mt-0.5 text-base",
                    "aria-hidden": "true"
                  }, "error", -1)),
                  createBaseVNode("p", _hoisted_5, toDisplayString(errorMessage.value), 1)
                ]))
              : (successMessage.value)
                ? (openBlock(), createElementBlock("div", _hoisted_6, [
                    _cache[4] || (_cache[4] = createBaseVNode("span", {
                      class: "material-symbols-outlined mt-0.5 text-base",
                      "aria-hidden": "true"
                    }, "check_circle", -1)),
                    createBaseVNode("p", _hoisted_7, toDisplayString(successMessage.value), 1)
                  ]))
                : createCommentVNode("", true)
          ]),
          createBaseVNode("form", {
            class: "space-y-5",
            onSubmit: withModifiers(handleSubmit, ["prevent"])
          }, [
            createBaseVNode("div", null, [
              _cache[5] || (_cache[5] = createBaseVNode("label", {
                class: "mb-2 block text-sm font-semibold text-absa-enrich",
                for: "username"
              }, "Username", -1)),
              withDirectives(createBaseVNode("input", {
                id: "username",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((formData.email) = $event)),
                type: "text",
                required: "",
                class: normalizeClass(["h-11 w-full rounded-sm border border-gray-300 bg-white px-3 text-sm text-absa-enrich placeholder:text-gray-400 transition-colors focus:border-absa-passion focus:outline-none focus:ring-2 focus:ring-absa-passion/15 focus:shadow-[inset_0_0_0_1px_var(--absa-passion)]", { 'border-red-900 focus:border-red-900 focus:ring-red-900/15 focus:shadow-none': errors.email }]),
                placeholder: "Enter AD Username",
                autocomplete: "username",
                autofocus: ""
              }, null, 2), [
                [vModelText, formData.email]
              ]),
              (errors.email)
                ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(errors.email), 1))
                : createCommentVNode("", true)
            ]),
            createBaseVNode("div", null, [
              _cache[7] || (_cache[7] = createBaseVNode("label", {
                class: "mb-2 block text-sm font-semibold text-absa-enrich",
                for: "password"
              }, "Password", -1)),
              createBaseVNode("div", _hoisted_9, [
                withDirectives(createBaseVNode("input", {
                  id: "password",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((formData.password) = $event)),
                  type: showPassword.value ? 'text' : 'password',
                  required: "",
                  class: normalizeClass(["h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-11 text-sm text-absa-enrich placeholder:text-gray-400 transition-colors focus:border-absa-passion focus:outline-none focus:ring-2 focus:ring-absa-passion/15 focus:shadow-[inset_0_0_0_1px_var(--absa-passion)]", { 'border-red-900 focus:border-red-900 focus:ring-red-900/15 focus:shadow-none': errors.password }]),
                  placeholder: "Enter AD Password",
                  autocomplete: "current-password",
                  onKeyup: checkCapsLock,
                  onKeydown: checkCapsLock
                }, null, 42, _hoisted_10), [
                  [vModelDynamic, formData.password]
                ]),
                createBaseVNode("button", {
                  type: "button",
                  class: "absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition-colors hover:text-absa-passion focus:outline-none focus:ring-2 focus:ring-inset focus:ring-absa-passion",
                  onClick: _cache[2] || (_cache[2] = $event => (showPassword.value = !showPassword.value)),
                  "aria-label": passwordVisibilityLabel.value
                }, [
                  createBaseVNode("span", _hoisted_12, toDisplayString(showPassword.value ? 'visibility_off' : 'visibility'), 1)
                ], 8, _hoisted_11)
              ]),
              createBaseVNode("div", _hoisted_13, [
                (capsLockOn.value)
                  ? (openBlock(), createElementBlock("p", _hoisted_14, [...(_cache[6] || (_cache[6] = [
                      createBaseVNode("span", {
                        class: "material-symbols-outlined text-sm",
                        "aria-hidden": "true"
                      }, "keyboard_capslock", -1),
                      createTextVNode(" Caps Lock is on", -1)
                    ]))]))
                  : (errors.password)
                    ? (openBlock(), createElementBlock("p", _hoisted_15, toDisplayString(errors.password), 1))
                    : createCommentVNode("", true)
              ])
            ]),
            createVNode(unref(_sfc_main$2), {
              type: "submit",
              loading: loading.value,
              block: "",
              size: "lg"
            }, {
              default: withCtx(() => [
                createBaseVNode("span", null, toDisplayString(loading.value ? 'Signing In...' : 'Sign In'), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ], 32)
        ]),
        _: 1
      }),
      _cache[10] || (_cache[10] = createBaseVNode("footer", { class: "mt-5 flex items-start gap-2 border-t border-gray-300 pt-4 text-[11px] leading-5 text-gray-500" }, [
        createBaseVNode("span", {
          class: "material-symbols-outlined mt-0.5 text-sm text-absa-passion",
          "aria-hidden": "true"
        }),
        createBaseVNode("p")
      ], -1))
    ])
  ]))
}
}

});

export { _sfc_main as default };
