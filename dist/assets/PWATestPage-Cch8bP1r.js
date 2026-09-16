import { g as _export_sfc, r as ref, h as onMounted, c as createElementBlock, b as createBaseVNode, t as toDisplayString, l as createCommentVNode, a as createStaticVNode, m as createTextVNode, p as pwaManager, o as openBlock } from './index-BDk32LgJ.js';

const _hoisted_1 = { class: "test-container" };
const _hoisted_2 = {
  key: 0,
  class: "stats-display"
};
const _hoisted_3 = {
  key: 1,
  class: "pwa-toast animate-slideInRight"
};


const _sfc_main = {
  __name: 'PWATestPage',
  setup(__props) {

const demoToastVisible = ref(false);
const stats = ref(null);

const showToast = () => {
  demoToastVisible.value = true;
  setTimeout(() => {
    if (demoToastVisible.value) {
      hideToast();
    }
  }, 10000); // Auto-hide after 10 seconds
};

const hideToast = () => {
  demoToastVisible.value = false;
};

const demoInstall = () => {
  alert('Demo PWA Installation! (In real app, this would trigger the actual install prompt)');
  hideToast();
};

const clearPreferences = () => {
  pwaManager.resetUserPreferences();
  alert('PWA user preferences cleared! The notification should appear more frequently now.');
};

const showStats = () => {
  stats.value = pwaManager.getInstallStats();
};

onMounted(() => {
  console.log('PWA Test page loaded');
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[7] || (_cache[7] = createBaseVNode("div", { class: "test-header" }, [
      createBaseVNode("h1", null, "PWA Toast Notification Test"),
      createBaseVNode("p", null, "This page allows you to test the new PWA install notification design")
    ], -1)),
    createBaseVNode("div", { class: "test-controls" }, [
      _cache[0] || (_cache[0] = createBaseVNode("h2", null, "Test Controls", -1)),
      createBaseVNode("div", { class: "button-group" }, [
        createBaseVNode("button", {
          onClick: showToast,
          class: "test-btn primary"
        }, "Show Toast Notification"),
        createBaseVNode("button", {
          onClick: hideToast,
          class: "test-btn secondary"
        }, "Hide Toast"),
        createBaseVNode("button", {
          onClick: clearPreferences,
          class: "test-btn danger"
        }, "Clear User Preferences"),
        createBaseVNode("button", {
          onClick: showStats,
          class: "test-btn info"
        }, "Show PWA Stats")
      ])
    ]),
    (stats.value)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          _cache[1] || (_cache[1] = createBaseVNode("h3", null, "PWA Manager Statistics", -1)),
          createBaseVNode("pre", null, toDisplayString(JSON.stringify(stats.value, null, 2)), 1)
        ]))
      : createCommentVNode("", true),
    (demoToastVisible.value)
      ? (openBlock(), createElementBlock("div", _hoisted_3, [
          _cache[6] || (_cache[6] = createBaseVNode("div", { class: "toast-backdrop" }, null, -1)),
          createBaseVNode("div", { class: "toast-container" }, [
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "toast-progress" }, null, -1)),
            createBaseVNode("div", { class: "toast-content-wrapper" }, [
              _cache[4] || (_cache[4] = createStaticVNode("<div class=\"toast-icon-container\" data-v-4556cb34><div class=\"toast-icon-bg\" data-v-4556cb34><svg class=\"toast-icon\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" data-v-4556cb34><path d=\"M12 2C13.1 2 14 2.9 14 4V8C14 9.1 13.1 10 12 10S10 9.1 10 8V4C10 2.9 10.9 2 12 2M21 9V7H19V9H21M13 0H11V2H13V0M4.93 3.5L3.51 4.93L4.93 6.34L6.34 4.93L4.93 3.5M9 21C9.6 21 10 21.4 10 22S9.6 23 9 23 8 22.6 8 22 8.4 21 9 21M4 10V12H6V10H4M7 20C7 19.4 6.6 19 6 19S5 19.4 5 20 5.4 21 6 21 7 20.6 7 20M19.07 3.5L17.66 4.93L19.07 6.34L20.49 4.93L19.07 3.5M20 10V12H22V10H20M17 20C17 19.4 16.6 19 16 19S15 19.4 15 20 15.4 21 16 21 17 20.6 17 20M15 21C15.6 21 16 21.4 16 22S15.6 23 15 23 14 22.6 14 22 14.4 21 15 21M12 6C13.66 6 15 7.34 15 9S13.66 12 12 12 9 10.66 9 9 10.34 6 12 6Z\" data-v-4556cb34></path></svg></div></div><div class=\"toast-message-content\" data-v-4556cb34><div class=\"toast-header\" data-v-4556cb34><h4 class=\"toast-title\" data-v-4556cb34>Install Uniplexity Business</h4><span class=\"toast-badge\" data-v-4556cb34>PWA</span></div><p class=\"toast-description\" data-v-4556cb34>Get faster access and a native app experience</p><div class=\"toast-benefits\" data-v-4556cb34><span class=\"benefit-item\" data-v-4556cb34>🚀 Faster loading</span><span class=\"benefit-item\" data-v-4556cb34>📱 Offline access</span></div></div>", 2)),
              createBaseVNode("div", { class: "toast-actions" }, [
                createBaseVNode("button", {
                  onClick: demoInstall,
                  class: "install-btn"
                }, [...(_cache[2] || (_cache[2] = [
                  createBaseVNode("svg", {
                    class: "btn-icon",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ], -1),
                  createTextVNode(" Install ", -1)
                ]))]),
                createBaseVNode("button", {
                  onClick: hideToast,
                  class: "dismiss-btn",
                  "aria-label": "Dismiss notification"
                }, [...(_cache[3] || (_cache[3] = [
                  createBaseVNode("svg", {
                    class: "btn-icon",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ], -1)
                ]))])
              ])
            ])
          ])
        ]))
      : createCommentVNode("", true)
  ]))
}
}

};
const PWATestPage = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-4556cb34"]]);

export { PWATestPage as default };
