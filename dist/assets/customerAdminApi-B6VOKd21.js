/* empty css                                                               */
import { _ as _export_sfc, i as computed, r as ref, S as onErrorCaptured, f as onMounted, g as onBeforeUnmount, o as openBlock, C as createBlock, b as createBaseVNode, m as mergeProps, k as renderSlot, c as createElementBlock, j as createCommentVNode, T as Teleport, P as nextTick, w as withCtx, t as toDisplayString, h as normalizeClass, A as createTextVNode, R as API_BASE_URL } from './index-Dxw7beKB.js';

const _hoisted_1$1 = { style: {"position":"fixed","inset":"0","z-index":"10000","display":"flex","align-items":"flex-start","justify-content":"center","padding":"1rem","padding-top":"2rem","overflow":"auto","pointer-events":"none"} };
const _hoisted_2$1 = { style: {"padding":"1rem 1.5rem","border-bottom":"1px solid rgb(229,231,235)","display":"flex","justify-content":"space-between","align-items":"center","background-color":"rgba(249,250,251,0.5)","backdrop-filter":"blur(12px)","position":"sticky","top":"0","z-index":"20","flex-shrink":"0","pointer-events":"auto"} };
const _hoisted_3$1 = { style: {"display":"flex","gap":"0.75rem","align-items":"center"} };
const _hoisted_4$1 = { style: {"font-size":"0.75rem","font-weight":"900","color":"rgb(17,24,39)","text-transform":"uppercase","letter-spacing":"0.2em","font-family":"monospace"} };
const _hoisted_5$1 = {
  style: {"padding":"1.5rem","overflow-y":"auto","position":"relative","z-index":"10","flex":"1","min-height":"0","pointer-events":"auto"},
  class: "custom-scrollbar"
};
const _hoisted_6$1 = {
  key: 0,
  style: {"padding":"1rem 1.5rem","background-color":"rgba(249,250,251,0.8)","border-top":"1px solid rgb(229,231,235)","backdrop-filter":"blur(12px)","position":"sticky","bottom":"0","z-index":"20","flex-shrink":"0","pointer-events":"auto"}
};


const __default__ = {
  inheritAttrs: false
};

const _sfc_main$1 = /*@__PURE__*/Object.assign(__default__, {
  __name: 'Modal',
  props: {
  to: {
    type: [String, Object],
    default: 'body'
  },
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  trapFocus: {
    type: Boolean,
    default: true,
  },
  restoreFocus: {
    type: Boolean,
    default: true,
  }
},
  emits: ['close'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

// Reactive target for Teleport
const toTarget = computed(() => props.to || 'body');
const dialogRef = ref(null);
let previouslyFocusedElement = null;

onErrorCaptured((err, instance, info) => {
  console.error('[Modal] Captured render/runtime error:', err, 'Info:', info, 'Instance:', instance);
  return false;
});

const focusableSelectors = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

const getFocusableElements = () => {
  const dialog = dialogRef.value;
  if (!dialog) return [];

  return Array.from(dialog.querySelectorAll(focusableSelectors)).filter((element) => {
    if (!(element instanceof HTMLElement)) return false;
    if (element.hasAttribute('disabled')) return false;
    const isVisible = element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
    return isVisible;
  });
};

const focusInitialElement = async () => {
  await nextTick();

  const dialog = dialogRef.value;
  if (!dialog) {
    console.warn('[Modal] Cannot focus initial element: dialogRef is null');
    return;
  }

  const autofocusElement = dialog.querySelector('[autofocus], [data-autofocus]');
  if (autofocusElement instanceof HTMLElement) {
    autofocusElement.focus({ preventScroll: true });
    return;
  }

  const focusables = getFocusableElements();
  if (focusables.length > 0) {
    focusables[0].focus({ preventScroll: true });
    return;
  }

  dialog.focus({ preventScroll: true });
};

const restoreFocus = () => {
  if (!props.restoreFocus) return;

  const target = previouslyFocusedElement;
  if (!target || !target.isConnected || typeof target.focus !== 'function') return;

  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault();
    console.log('[Modal] Escape key pressed, closing modal');
    emit('close');
    return;
  }

  if (event.key !== 'Tab' || !props.trapFocus) return;

  const dialog = dialogRef.value;
  if (!dialog) return;

  const focusables = getFocusableElements();
  if (focusables.length === 0) {
    event.preventDefault();
    dialog.focus({ preventScroll: true });
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  const activeInsideDialog = active instanceof Node && dialog.contains(active);

  if (event.shiftKey && (active === first || !activeInsideDialog)) {
    event.preventDefault();
    last.focus({ preventScroll: true });
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
  }
};

const handleFocusIn = (event) => {
  if (!props.trapFocus) return;

  const dialog = dialogRef.value;
  if (!dialog) return;

  if (event.target instanceof Node && dialog.contains(event.target)) return;

  const focusables = getFocusableElements();
  if (focusables.length > 0) {
    focusables[0].focus({ preventScroll: true });
  } else {
    dialog.focus({ preventScroll: true });
  }
};

// Prevent body scrolling while modal is open
onMounted(() => {
  console.log('[Modal] onMounted called. toTarget:', toTarget.value);
  previouslyFocusedElement = document.activeElement instanceof HTMLElement && document.activeElement !== document.body
    ? document.activeElement
    : null;

  try { document.body.classList.add('modal-open'); } catch (e) { /* ignore */ }

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('focusin', handleFocusIn);
  focusInitialElement();
});

onBeforeUnmount(() => {
  console.log('[Modal] onBeforeUnmount called');
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('focusin', handleFocusIn);
  try { document.body.classList.remove('modal-open'); } catch (e) { /* ignore */ }
  restoreFocus();
});

return (_ctx, _cache) => {
  return (openBlock(), createBlock(Teleport, { to: toTarget.value }, [
    createBaseVNode("div", _hoisted_1$1, [
      createBaseVNode("div", {
        style: {"position":"absolute","inset":"0","background-color":"rgba(0,0,0,0.6)","pointer-events":"auto"},
        onClick: _cache[0] || (_cache[0] = $event => (emit('close')))
      }),
      createBaseVNode("div", mergeProps({
        ref_key: "dialogRef",
        ref: dialogRef
      }, _ctx.$attrs, {
        style: {"position":"relative","background-color":"white","border":"1px solid rgb(229,231,235)","box-shadow":"0 20px 25px -5px rgba(0,0,0,0.1)","width":"100%","max-width":"28rem","display":"flex","flex-direction":"column","max-height":"95vh","border-radius":"0","overflow":"hidden","animation":"fade-in-up 0.25s cubic-bezier(0.16,1,0.3,1)","margin-top":"2rem","pointer-events":"auto"},
        role: "dialog",
        "aria-modal": "true",
        tabindex: "-1"
      }), [
        _cache[4] || (_cache[4] = createBaseVNode("div", { style: {"height":"0.375rem","width":"100%","background-color":"#2F2E8B","flex-shrink":"0"} }, null, -1)),
        _cache[5] || (_cache[5] = createBaseVNode("div", {
          style: {"position":"absolute","inset":"0","opacity":"0.02","pointer-events":"none"},
          class: "dotted-pattern"
        }, null, -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            _cache[2] || (_cache[2] = createBaseVNode("div", { style: {"width":"0.375rem","height":"1.5rem","background-color":"#2F2E8B","border-radius":"0.125rem"} }, null, -1)),
            createBaseVNode("h3", _hoisted_4$1, [
              renderSlot(_ctx.$slots, "title", {}, undefined, true)
            ])
          ]),
          createBaseVNode("button", {
            "aria-label": "Close dialog",
            onClick: _cache[1] || (_cache[1] = $event => (emit('close'))),
            style: {"color":"rgb(156,163,175)","cursor":"pointer","width":"2.5rem","height":"2.5rem","display":"flex","align-items":"center","justify-content":"center","border-radius":"0.125rem","transition":"all 0.2s","border":"none","background":"transparent","pointer-events":"auto"},
            onmouseover: "this.style.color='rgb(17,24,39)';this.style.backgroundColor='rgb(243,244,246)'",
            onmouseout: "this.style.color='rgb(156,163,175)';this.style.backgroundColor='transparent'"
          }, [...(_cache[3] || (_cache[3] = [
            createBaseVNode("i", { class: "fas fa-times" }, null, -1)
          ]))])
        ]),
        createBaseVNode("div", _hoisted_5$1, [
          renderSlot(_ctx.$slots, "content", {}, undefined, true)
        ]),
        (_ctx.$slots.footer)
          ? (openBlock(), createElementBlock("div", _hoisted_6$1, [
              renderSlot(_ctx.$slots, "footer", {}, undefined, true)
            ]))
          : createCommentVNode("", true)
      ], 16)
    ])
  ], 8, ["to"]))
}
}

});
const Modal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-d7c0feb5"]]);

const _hoisted_1 = { class: "flex items-start gap-4" };
const _hoisted_2 = { class: "space-y-2" };
const _hoisted_3 = { class: "text-[10px] font-mono font-bold uppercase tracking-[0.28em] text-gray-400" };
const _hoisted_4 = {
  key: 0,
  class: "text-sm leading-6 text-gray-700 whitespace-pre-line"
};
const _hoisted_5 = {
  key: 0,
  class: "border border-gray-200 bg-gray-50/80 px-4 py-3"
};
const _hoisted_6 = { class: "text-[10px] font-mono uppercase tracking-widest text-gray-500 whitespace-pre-line" };
const _hoisted_7 = { class: "flex justify-end gap-3" };
const _hoisted_8 = ["data-autofocus", "disabled"];
const _hoisted_9 = ["data-autofocus", "disabled"];


const _sfc_main = {
  __name: 'ConfirmDialog',
  props: {
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  detail: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'danger',
    validator: (value) => ['danger', 'warning', 'info', 'neutral'].includes(value),
  },
  eyebrow: {
    type: String,
    default: '',
  },
  confirmLabel: {
    type: String,
    default: 'Confirm',
  },
  cancelLabel: {
    type: String,
    default: 'Cancel',
  },
  busyLabel: {
    type: String,
    default: 'Working...',
  },
  busy: {
    type: Boolean,
    default: false,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  confirmDisabled: {
    type: Boolean,
    default: false,
  },
},
  emits: ['confirm', 'cancel', 'close'],
  setup(__props, { emit: __emit }) {

const props = __props;

const emit = __emit;

onErrorCaptured((err, instance, info) => {
  console.error('[ConfirmDialog] Captured error:', err, 'Info:', info);
  return false;
});

onMounted(() => {
  console.log('[ConfirmDialog] onMounted called. Props:', {
    open: props.open,
    title: props.title,
    message: props.message,
    variant: props.variant,
    busy: props.busy,
    confirmLabel: props.confirmLabel,
  });
});

const dialogId = Math.random().toString(36).slice(2, 10);
const titleId = `confirm-dialog-title-${dialogId}`;
const descriptionId = `confirm-dialog-description-${dialogId}`;

const variantConfig = computed(() => {
  const config = {
    danger: {
      icon: 'fas fa-trash-alt',
      eyebrow: 'Irreversible Action',
      iconBoxClasses: 'border-red-200 bg-red-50 text-red-600',
      confirmButtonClasses: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
    },
    warning: {
      icon: 'fas fa-circle-exclamation',
      eyebrow: 'System Message',
      iconBoxClasses: 'border-amber-200 bg-amber-50 text-amber-600',
      confirmButtonClasses: 'bg-[#2F2E8B] hover:opacity-90 focus-visible:ring-[#2F2E8B]',
    },
    info: {
      icon: 'fas fa-circle-info',
      eyebrow: 'System Message',
      iconBoxClasses: 'border-[#2F2E8B]/20 bg-[#2F2E8B]/5 text-[#2F2E8B]',
      confirmButtonClasses: 'bg-[#2F2E8B] hover:opacity-90 focus-visible:ring-[#2F2E8B]',
    },
    neutral: {
      icon: 'fas fa-circle-info',
      eyebrow: 'System Message',
      iconBoxClasses: 'border-gray-200 bg-gray-50 text-gray-600',
      confirmButtonClasses: 'bg-gray-900 hover:bg-gray-800 focus-visible:ring-gray-500',
    },
  };

  return config[props.variant] || config.danger;
});

const eyebrow = computed(() => props.eyebrow || variantConfig.value.eyebrow);
const iconClass = computed(() => variantConfig.value.icon);
const iconBoxClasses = computed(() => variantConfig.value.iconBoxClasses);
const confirmButtonClasses = computed(() => variantConfig.value.confirmButtonClasses);

const handleConfirm = () => {
  console.log('[ConfirmDialog] User confirmed action');
  emit('confirm');
};

const handleCancel = () => {
  console.log('[ConfirmDialog] User cancelled dialog');
  emit('cancel');
  emit('close');
};

const handleClose = () => {
  console.log('[ConfirmDialog] User closed dialog');
  emit('close');
};

return (_ctx, _cache) => {
  return (__props.open)
    ? (openBlock(), createBlock(Modal, {
        key: 0,
        "aria-labelledby": titleId,
        "aria-describedby": descriptionId,
        onClose: handleClose
      }, {
        title: withCtx(() => [
          createBaseVNode("span", { id: titleId }, toDisplayString(__props.title), 1)
        ]),
        content: withCtx(() => [
          createBaseVNode("div", {
            ref: "contentRef",
            id: descriptionId,
            class: "space-y-5"
          }, [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("div", {
                class: normalizeClass([iconBoxClasses.value, "mt-1 flex h-11 w-11 shrink-0 items-center justify-center border"])
              }, [
                createBaseVNode("i", {
                  class: normalizeClass([iconClass.value, "text-sm"])
                }, null, 2)
              ], 2),
              createBaseVNode("div", _hoisted_2, [
                createBaseVNode("p", _hoisted_3, toDisplayString(eyebrow.value), 1),
                (__props.message)
                  ? (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(__props.message), 1))
                  : createCommentVNode("", true)
              ])
            ]),
            (__props.detail)
              ? (openBlock(), createElementBlock("div", _hoisted_5, [
                  createBaseVNode("p", _hoisted_6, toDisplayString(__props.detail), 1)
                ]))
              : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "body")
          ], 512)
        ]),
        footer: withCtx(() => [
          createBaseVNode("div", _hoisted_7, [
            (__props.showCancel)
              ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  onClick: handleCancel,
                  "data-autofocus": __props.showCancel,
                  disabled: __props.busy,
                  class: "px-4 py-2 border border-gray-300 text-gray-700 text-[10px] font-bold font-mono uppercase tracking-wider hover:bg-gray-50 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F2E8B] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                }, toDisplayString(__props.cancelLabel), 9, _hoisted_8))
              : createCommentVNode("", true),
            createBaseVNode("button", {
              type: "button",
              onClick: handleConfirm,
              "data-autofocus": !__props.showCancel,
              disabled: __props.busy || __props.confirmDisabled,
              class: normalizeClass([confirmButtonClasses.value, "px-4 py-2 text-white text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"])
            }, [
              createBaseVNode("i", {
                class: normalizeClass(__props.busy ? 'fas fa-spinner fa-spin' : iconClass.value)
              }, null, 2),
              createTextVNode(" " + toDisplayString(__props.busy ? __props.busyLabel : __props.confirmLabel), 1)
            ], 10, _hoisted_9)
          ])
        ]),
        _: 3
      }))
    : createCommentVNode("", true)
}
}

};

/**
 * Customer administration API — soft delete and restore.
 *
 * Backend: gateway `/api/v1/customer-admin/*`
 * (see `gateway/routes/customer_admin_routes.py`).
 *
 * Deliberately a separate prefix from `/api/v1/customers/*`. The gateway's RBAC
 * matrix is a union with no deny rules, so anything under `/api/v1/customers/**`
 * is open to RELATIONSHIP_MANAGER; deletion is restricted to OPERATIONS (+ ADMIN
 * via bypass) and only a prefix outside that wildcard can be restricted.
 *
 * Deletion is a **soft** delete: the customer is flagged and filtered out of
 * every customer-facing read, and can be restored.
 *
 *   DELETE /api/v1/customer-admin/customers/{id}        → soft-delete one
 *   POST   /api/v1/customer-admin/customers/bulk-delete → soft-delete many
 *   POST   /api/v1/customer-admin/restore               → undo
 *   GET    /api/v1/customer-admin/deleted               → recently deleted
 *   GET    /api/v1/customer-admin/deleted/count         → how many are hidden
 */


/** Server-side guard: one bulk operation may not exceed this many customers. */
const MAX_BULK_DELETE = 500;

function _authHeaders(json = true) {
  const token = localStorage.getItem('token') || localStorage.getItem('access_token') || '';
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (json) headers['Content-Type'] = 'application/json';
  return headers
}

async function _handleRes(res) {
  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = null; }
  }
  if (!res.ok) {
    let detail = data && (data.detail || data.message || data.error);
    if (Array.isArray(detail)) {
      detail = detail.map((d) => (d && (d.msg || d.message)) || JSON.stringify(d)).join('; ');
    } else if (detail && typeof detail === 'object') {
      detail = detail.msg || detail.message || JSON.stringify(detail);
    }
    const err = new Error(detail || res.statusText || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err
  }
  return data
}

/**
 * Soft-delete one customer.
 *
 * @param {string} customerId
 * @param {string} [reason] recorded in the audit trail
 */
async function deleteCustomer(customerId, reason) {
  const query = reason ? `?reason=${encodeURIComponent(reason)}` : '';
  const res = await fetch(
    `${API_BASE_URL}/api/v1/customer-admin/customers/${encodeURIComponent(customerId)}${query}`,
    { method: 'DELETE', headers: _authHeaders() },
  );
  return _handleRes(res)
}

/**
 * Soft-delete many customers in one confirmed action.
 *
 * @param {string[]} customerIds
 * @param {string} [reason]
 * @returns {Promise<{requested:number, deleted:number, deleted_ids:string[],
 *                    already_deleted:string[], not_found:string[]}>}
 */
async function bulkDeleteCustomers(customerIds, reason) {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer-admin/customers/bulk-delete`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({ customer_ids: customerIds, reason: reason || null }),
  });
  return _handleRes(res)
}

/** Undo a soft delete (single id or many). */
async function restoreCustomers(customerIds) {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer-admin/restore`, {
    method: 'POST',
    headers: _authHeaders(),
    body: JSON.stringify({ customer_ids: customerIds }),
  });
  return _handleRes(res)
}

/** Recently deleted customers, newest first. */
async function fetchDeletedCustomers(limit = 100) {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/customer-admin/deleted?limit=${encodeURIComponent(limit)}`,
    { headers: _authHeaders(false) },
  );
  return _handleRes(res)
}

/** How many customers are currently hidden from the portfolio. */
async function fetchDeletedCount() {
  const res = await fetch(`${API_BASE_URL}/api/v1/customer-admin/deleted/count`, {
    headers: _authHeaders(false),
  });
  return _handleRes(res)
}

export { MAX_BULK_DELETE as M, _sfc_main as _, fetchDeletedCustomers as a, bulkDeleteCustomers as b, deleteCustomer as d, fetchDeletedCount as f, restoreCustomers as r };
