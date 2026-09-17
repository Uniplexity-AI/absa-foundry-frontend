import { g as _export_sfc, r as ref, h as onMounted, i as onBeforeUnmount, c as createElementBlock, b as createBaseVNode, a as createStaticVNode, n as normalizeStyle, j as normalizeClass, F as Fragment, e as renderList, u as useRouter, o as openBlock, k as _imports_0, t as toDisplayString } from './index-BbnB6Erv.js';

const _hoisted_1 = { class: "absa-init__canvas" };
const _hoisted_2 = { class: "absa-init__panel" };
const _hoisted_3 = { class: "absa-init__progress-track" };
const _hoisted_4 = { class: "absa-init__steps" };
const _hoisted_5 = {
  key: 0,
  class: "absa-init__step-icon",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none"
};
const _hoisted_6 = {
  key: 1,
  class: "absa-init__step-icon absa-init__step-icon--spin",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none"
};
const _hoisted_7 = {
  key: 2,
  class: "absa-init__step-icon",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none"
};
const _hoisted_8 = { class: "absa-init__step-label" };


const _sfc_main = {
  __name: 'InitialisationScreen',
  setup(__props) {

const router = useRouter();
const progressPercent = ref(0);
const fadingOut = ref(false);

const steps = ref([
  { label: 'Initialising application',       state: 'done' },
  { label: 'Preparing secure workspace',     state: 'done' },
  { label: 'Verifying security',              state: 'done' },
  { label: 'Preparing authentication...',     state: 'active' },
]);

const timers = [];

onMounted(() => {
  // ═══ ~10 second simple initialisation ═══

  // 1.5s — progress to 30%
  timers.push(setTimeout(() => { progressPercent.value = 30; }, 1500));

  // 3.5s — progress to 55%
  timers.push(setTimeout(() => { progressPercent.value = 55; }, 3500));

  // 6.0s — progress to 75%
  timers.push(setTimeout(() => { progressPercent.value = 75; }, 6000));

  // 9.0s — all done, progress 100%
  timers.push(setTimeout(() => {
    steps.value[3].state = 'done';
    progressPercent.value = 100;
  }, 9000));

  // 10.0s — fade out (600ms CSS transition) then navigate
  timers.push(setTimeout(() => {
    fadingOut.value = true;
  }, 10000));

  // 10.7s — navigate to login
  timers.push(setTimeout(() => {
    router.push('/login');
  }, 10700));
});

onBeforeUnmount(() => {
  timers.forEach(t => clearTimeout(t));
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(["absa-init", { 'absa-init--fading': fadingOut.value }])
  }, [
    _cache[5] || (_cache[5] = createBaseVNode("div", { class: "absa-init__grid" }, null, -1)),
    _cache[6] || (_cache[6] = createBaseVNode("div", { class: "absa-init__vignette" }, null, -1)),
    _cache[7] || (_cache[7] = createBaseVNode("div", { class: "absa-init__gradient" }, null, -1)),
    createBaseVNode("main", _hoisted_1, [
      _cache[4] || (_cache[4] = createStaticVNode("<header class=\"absa-init__header\" data-v-b3c2ca3a><img alt=\"Absa Logo\" class=\"absa-init__logo\" src=\"" + _imports_0 + "\" data-v-b3c2ca3a><h1 class=\"absa-init__title\" data-v-b3c2ca3a>Customer Lifecycle Prediction System</h1><p class=\"absa-init__subtitle\" data-v-b3c2ca3a>Enterprise Decision Intelligence Platform</p><p class=\"absa-init__overline\" data-v-b3c2ca3a>Internal Operations Platform</p></header>", 1)),
      createBaseVNode("section", _hoisted_2, [
        _cache[3] || (_cache[3] = createBaseVNode("h2", { class: "absa-init__panel-title" }, "Initialising Secure Platform", -1)),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", {
            class: normalizeClass(["absa-init__progress-fill", { 'absa-init__progress-fill--done': progressPercent.value >= 100 }]),
            style: normalizeStyle({ width: progressPercent.value + '%' })
          }, null, 6)
        ]),
        createBaseVNode("ul", _hoisted_4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(steps.value, (step, i) => {
            return (openBlock(), createElementBlock("li", {
              key: i,
              class: normalizeClass(["absa-init__step", {
              'absa-init__step--done': step.state === 'done',
              'absa-init__step--active': step.state === 'active',
              'absa-init__step--pending': step.state === 'pending',
            }])
            }, [
              (step.state === 'done')
                ? (openBlock(), createElementBlock("svg", _hoisted_5, [...(_cache[0] || (_cache[0] = [
                    createBaseVNode("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10",
                      fill: "#0f9d58",
                      opacity: "0.15"
                    }, null, -1),
                    createBaseVNode("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "#0f9d58",
                      "stroke-width": "2"
                    }, null, -1),
                    createBaseVNode("polyline", {
                      points: "8 12 11 15 17 9",
                      stroke: "#0f9d58",
                      "stroke-width": "2.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, null, -1)
                  ]))]))
                : (step.state === 'active')
                  ? (openBlock(), createElementBlock("svg", _hoisted_6, [...(_cache[1] || (_cache[1] = [
                      createBaseVNode("circle", {
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "#f4eceb",
                        "stroke-width": "2.5"
                      }, null, -1),
                      createBaseVNode("path", {
                        d: "M12 2a10 10 0 0 1 10 10",
                        stroke: "#dc0037",
                        "stroke-width": "2.5",
                        "stroke-linecap": "round"
                      }, null, -1)
                    ]))]))
                  : (openBlock(), createElementBlock("svg", _hoisted_7, [...(_cache[2] || (_cache[2] = [
                      createBaseVNode("circle", {
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "#926e6e",
                        "stroke-width": "2",
                        opacity: "0.5"
                      }, null, -1)
                    ]))])),
              createBaseVNode("span", _hoisted_8, toDisplayString(step.label), 1)
            ], 2))
          }), 128))
        ])
      ])
    ])
  ], 2))
}
}

};
const InitialisationScreen = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-b3c2ca3a"]]);

export { InitialisationScreen as default };
