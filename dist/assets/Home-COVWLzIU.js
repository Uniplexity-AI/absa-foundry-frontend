import { d as defineComponent, r as ref, o as openBlock, c as createElementBlock, a as createStaticVNode, b as createBaseVNode, F as Fragment, e as renderList, _ as _imports_0, t as toDisplayString, f as _imports_1, g as _export_sfc } from './index-F0Jaczum.js';

const _hoisted_1 = { class: "absa-landing" };
const _hoisted_2 = {
  id: "impact",
  class: "absa-stats-banner"
};
const _hoisted_3 = { class: "absa-container absa-stats-grid" };
const _hoisted_4 = { class: "absa-stat-item__value" };
const _hoisted_5 = { class: "absa-stat-item__label" };
const _hoisted_6 = { class: "absa-stat-item__desc" };
const _hoisted_7 = {
  id: "features",
  class: "absa-features"
};
const _hoisted_8 = { class: "absa-container" };
const _hoisted_9 = { class: "absa-features-grid" };
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = { class: "absa-feature-card__title" };
const _hoisted_12 = { class: "absa-feature-card__desc" };
const _hoisted_13 = { class: "absa-feature-card__list" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Home",
  setup(__props) {
    const systemStats = ref([
      { value: "94.2%", label: "Prediction Precision", description: "Accurate 60-day early warning churn detection" },
      { value: "45%", label: "Attrition Reduction", description: "Lower churn rate across target private accounts" },
      { value: "1.2M+", label: "Accounts Analyzed", description: "Real-time daily transaction pattern scoring" },
      { value: "< 200ms", label: "Engine Response", description: "Instant Next Best Action recommendation generation" }
    ]);
    const systemFeatures = ref([
      {
        title: "AI Customer Health Scoring",
        description: "Dynamic 0–100 health metrics calculated daily based on cash flows, channel activity, and product usage.",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
        bullets: ["Automated risk status categorization", "60-day predictive lookahead window", "Historical trajectory tracking"]
      },
      {
        title: "Explainable AI (SHAP Drivers)",
        description: "Full transparency into machine learning decisions with explicit risk driver rankings for every account.",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
        bullets: ["Identifies specific behavioral drops", "Inflow & deposit variance analytics", "No black-box predictions"]
      },
      {
        title: "Next Best Action (NBA) Engine",
        description: "Context-aware retention recommendations generated automatically to guide Relationship Managers.",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        bullets: ["Priority rank & AI confidence score", "One-click action logging modal", "Pre-crafted campaign offers"]
      },
      {
        title: "Lifecycle Journey Mapping",
        description: "12-month visual timeline tracing every state transition from onboarding through active, at-risk, or churned states.",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        bullets: ["Transition point tagging", "Historical state comparisons", "Tenure vs risk mapping"]
      },
      {
        title: "Portfolio Risk Ledger",
        description: "Interactive dashboard for Relationship Managers to filter, search, and manage high-value account risks.",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
        bullets: ["Multi-branch filtering capabilities", "Instant alert acknowledgments", "Direct Core Banking integration"]
      },
      {
        title: "Air-Gapped Enterprise Security",
        description: "Designed to operate within Absa strict private cloud constraints without external cloud dependency.",
        iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
        bullets: ["Role-Based Access Control (RBAC)", "End-to-end audit log tracking", "Zero external data transmission"]
      }
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[1] || (_cache[1] = createStaticVNode('<header class="absa-nav" data-v-9740fa99><div class="absa-container absa-nav__inner" data-v-9740fa99><div class="absa-brand" data-v-9740fa99><img src="' + _imports_0 + '" alt="ABSA Intelligence Unit" class="h-8 w-auto object-contain" data-v-9740fa99><span class="absa-brand__text" data-v-9740fa99><span class="absa-brand__sub" data-v-9740fa99>Intelligence Unit</span></span></div><nav class="absa-nav__links" data-v-9740fa99><a href="#features" class="absa-nav__link" data-v-9740fa99>System Capabilities</a><a href="#impact" class="absa-nav__link" data-v-9740fa99>Enterprise Impact</a><a href="#architecture" class="absa-nav__link" data-v-9740fa99>Security &amp; Core Integration</a></nav><div class="absa-nav__actions" data-v-9740fa99><a href="/login" class="absa-btn-secondary" data-v-9740fa99>Sign In</a><a href="/dashboard" class="absa-btn-primary" data-v-9740fa99>Launch Dashboard →</a></div></div></header><section class="absa-hero" data-v-9740fa99><div class="absa-container absa-hero__grid" data-v-9740fa99><div class="absa-hero__content" data-v-9740fa99><div class="absa-pill-badge" data-v-9740fa99><span class="absa-pill-badge__dot" data-v-9740fa99></span> NEXT-GEN AI RETENTION ENGINE </div><h1 class="absa-hero__title" data-v-9740fa99> Predictive Customer Lifecycle &amp; Attrition Intelligence </h1><p class="absa-hero__subtitle" data-v-9740fa99> Transform customer retention from reactive outreach to proactive AI precision. Real-time churn risk detection, explainable AI drivers, and Next Best Action recommendations integrated directly into Absa core banking workflows. </p><div class="absa-hero__cta-group" data-v-9740fa99><a href="/dashboard" class="absa-btn-hero-primary" data-v-9740fa99> Access Intelligence Hub <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-9740fa99><line x1="5" y1="12" x2="19" y2="12" data-v-9740fa99></line><polyline points="12 5 19 12 12 19" data-v-9740fa99></polyline></svg></a><a href="#features" class="absa-btn-hero-secondary" data-v-9740fa99> Explore Platform Features </a></div><div class="absa-hero__trust-badge" data-v-9740fa99><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5" data-v-9740fa99><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-9740fa99></path></svg><span data-v-9740fa99>Air-Gapped On-Premises Deployment | Bank-Grade Encryption</span></div></div><div class="absa-hero__visual" data-v-9740fa99><div class="absa-hero-card-stack" data-v-9740fa99><div class="absa-glass-card absa-glass-card--main" data-v-9740fa99><div class="absa-glass-card__header" data-v-9740fa99><div class="absa-glass-card__title" data-v-9740fa99>Live Health Engine</div><span class="absa-status-badge" data-v-9740fa99>ACTIVE MONITORING</span></div><div class="absa-hero-metrics" data-v-9740fa99><div class="absa-metric" data-v-9740fa99><span class="absa-metric__val" data-v-9740fa99>94.2%</span><span class="absa-metric__label" data-v-9740fa99>Churn Accuracy</span></div><div class="absa-metric" data-v-9740fa99><span class="absa-metric__val" data-v-9740fa99>ZMW 12.4M</span><span class="absa-metric__label" data-v-9740fa99>CLV Protected</span></div></div><div class="absa-graphic-bars" data-v-9740fa99><div class="absa-bar" style="height:40%;" data-v-9740fa99></div><div class="absa-bar" style="height:65%;" data-v-9740fa99></div><div class="absa-bar" style="height:50%;" data-v-9740fa99></div><div class="absa-bar absa-bar--active" style="height:85%;" data-v-9740fa99></div><div class="absa-bar" style="height:60%;" data-v-9740fa99></div><div class="absa-bar" style="height:95%;" data-v-9740fa99></div></div></div><div class="absa-floating-alert" data-v-9740fa99><div class="absa-floating-alert__icon" data-v-9740fa99>!</div><div data-v-9740fa99><div class="absa-floating-alert__title" data-v-9740fa99>High Risk Trigger Detected</div><div class="absa-floating-alert__sub" data-v-9740fa99>Customer ID: 994022/11/1 • Salary drop -42%</div></div></div></div></div></div></section>', 2)),
        createBaseVNode("section", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(systemStats.value, (stat) => {
              return openBlock(), createElementBlock("div", {
                class: "absa-stat-item",
                key: stat.label
              }, [
                createBaseVNode("div", _hoisted_4, toDisplayString(stat.value), 1),
                createBaseVNode("div", _hoisted_5, toDisplayString(stat.label), 1),
                createBaseVNode("div", _hoisted_6, toDisplayString(stat.description), 1)
              ]);
            }), 128))
          ])
        ]),
        createBaseVNode("section", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "absa-section-header" }, [
              createBaseVNode("span", { class: "absa-section-header__tag" }, "CORE SYSTEM CAPABILITIES"),
              createBaseVNode("h2", { class: "absa-section-header__title" }, "Engineered for Modern Relationship Management"),
              createBaseVNode("p", { class: "absa-section-header__desc" }, " A comprehensive suite of machine learning models and actionable relationship workflows built specifically for retail and private banking operations. ")
            ], -1)),
            createBaseVNode("div", _hoisted_9, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(systemFeatures.value, (feat) => {
                return openBlock(), createElementBlock("div", {
                  class: "absa-feature-card",
                  key: feat.title
                }, [
                  createBaseVNode("div", {
                    class: "absa-feature-card__icon",
                    innerHTML: feat.iconSvg
                  }, null, 8, _hoisted_10),
                  createBaseVNode("h3", _hoisted_11, toDisplayString(feat.title), 1),
                  createBaseVNode("p", _hoisted_12, toDisplayString(feat.description), 1),
                  createBaseVNode("ul", _hoisted_13, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(feat.bullets, (item, idx) => {
                      return openBlock(), createElementBlock("li", { key: idx }, toDisplayString(item), 1);
                    }), 128))
                  ])
                ]);
              }), 128))
            ])
          ])
        ]),
        _cache[2] || (_cache[2] = createStaticVNode('<section class="absa-cta-banner" data-v-9740fa99><div class="absa-container absa-cta-banner__inner" data-v-9740fa99><div data-v-9740fa99><h2 class="absa-cta-banner__title" data-v-9740fa99>Ready to Empower Your Relationship Managers?</h2><p class="absa-cta-banner__desc" data-v-9740fa99>Access real-time risk scores, automated Next Best Actions, and full account histories right now.</p></div><a href="/dashboard" class="absa-btn-cta-light" data-v-9740fa99>Launch Intelligence Hub</a></div></section><footer class="absa-footer" data-v-9740fa99><div class="absa-container absa-footer__grid" data-v-9740fa99><div class="absa-footer__brand-col" data-v-9740fa99><div class="absa-brand" data-v-9740fa99><img src="' + _imports_1 + '" alt="ABSA Intelligence Unit" class="h-6 w-auto object-contain" data-v-9740fa99><span class="absa-brand__text absa-brand__text--light" data-v-9740fa99><span class="absa-brand__sub" data-v-9740fa99>Intelligence Unit</span></span></div><p class="absa-footer__about" data-v-9740fa99> The Absa Customer Lifecycle Prediction Hub is an internal enterprise platform for predictive churn mitigation, behavioral analytics, and automated retention management. </p></div><div class="absa-footer__col" data-v-9740fa99><h4 class="absa-footer__col-title" data-v-9740fa99>Platform Modules</h4><a href="/dashboard" class="absa-footer__link" data-v-9740fa99>Portfolio Dashboard</a><a href="/customers" class="absa-footer__link" data-v-9740fa99>Customer Ledger</a><a href="/analytics" class="absa-footer__link" data-v-9740fa99>Predictive Models</a><a href="/alerts" class="absa-footer__link" data-v-9740fa99>Priority Triggers</a></div><div class="absa-footer__col" data-v-9740fa99><h4 class="absa-footer__col-title" data-v-9740fa99>Security &amp; Governance</h4><a href="#" class="absa-footer__link" data-v-9740fa99>Air-Gapped Deployment</a><a href="#" class="absa-footer__link" data-v-9740fa99>Core Banking API</a><a href="#" class="absa-footer__link" data-v-9740fa99>Audit Log Compliance</a><a href="#" class="absa-footer__link" data-v-9740fa99>Access Control (RBAC)</a></div><div class="absa-footer__col" data-v-9740fa99><h4 class="absa-footer__col-title" data-v-9740fa99>Internal Support</h4><a href="#" class="absa-footer__link" data-v-9740fa99>System Documentation</a><a href="#" class="absa-footer__link" data-v-9740fa99>RM Training Hub</a><a href="#" class="absa-footer__link" data-v-9740fa99>IT Helpdesk</a><a href="#" class="absa-footer__link" data-v-9740fa99>Model Release Notes</a></div></div><div class="absa-footer__bottom" data-v-9740fa99><div class="absa-container absa-footer__bottom-inner" data-v-9740fa99><span data-v-9740fa99>© 2026 Absa Bank Zambia PLC. All Rights Reserved. Internal Confidential System.</span><div class="absa-footer__legal" data-v-9740fa99><a href="#" data-v-9740fa99>Privacy Notice</a><a href="#" data-v-9740fa99>Security Protocol</a><a href="#" data-v-9740fa99>Terms of Operational Use</a></div></div></div></footer>', 2))
      ]);
    };
  }
});

const Home = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9740fa99"]]);

export { Home as default };
