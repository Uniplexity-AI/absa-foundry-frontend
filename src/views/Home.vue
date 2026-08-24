<template>
  <div class="absa-landing">
    <!-- ── Public Top Navigation Header ── -->
    <header class="absa-nav">
      <div class="absa-container absa-nav__inner">
        <div class="absa-brand">
          <img src="/logo_red.png" alt="ABSA Intelligence Unit" class="h-8 w-auto object-contain" />
          <span class="absa-brand__text"> <span class="absa-brand__sub">Intelligence Unit</span></span>
        </div>

        <nav class="absa-nav__links">
          <a href="#features" class="absa-nav__link">System Capabilities</a>
          <a href="#impact" class="absa-nav__link">Enterprise Impact</a>
          <a href="#architecture" class="absa-nav__link">Security & Core Integration</a>
        </nav>

        <div class="absa-nav__actions">
          <a href="/login" class="absa-btn-secondary">Sign In</a>
          <a href="/dashboard" class="absa-btn-primary">Launch Dashboard →</a>
        </div>
      </div>
    </header>

    <!-- ── Hero Section ── -->
    <section class="absa-hero">
      <div class="absa-container absa-hero__grid">
        <div class="absa-hero__content">
          <div class="absa-pill-badge">
            <span class="absa-pill-badge__dot"></span>
            NEXT-GEN AI RETENTION ENGINE
          </div>

          <h1 class="absa-hero__title">
            Predictive Customer Lifecycle & Attrition Intelligence
          </h1>

          <p class="absa-hero__subtitle">
            Transform customer retention from reactive outreach to proactive AI precision. 
            Real-time churn risk detection, explainable AI drivers, and Next Best Action recommendations integrated directly into Absa core banking workflows.
          </p>

          <div class="absa-hero__cta-group">
            <a href="/dashboard" class="absa-btn-hero-primary">
              Access Intelligence Hub
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="#features" class="absa-btn-hero-secondary">
              Explore Platform Features
            </a>
          </div>

          <div class="absa-hero__trust-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Air-Gapped On-Premises Deployment | Bank-Grade Encryption</span>
          </div>
        </div>

        <!-- Visual Graphic / Interactive Hero Graphic -->
        <div class="absa-hero__visual">
          <div class="absa-hero-card-stack">
            <div class="absa-glass-card absa-glass-card--main">
              <div class="absa-glass-card__header">
                <div class="absa-glass-card__title">Live Health Engine</div>
                <span class="absa-status-badge">ACTIVE MONITORING</span>
              </div>
              <div class="absa-hero-metrics">
                <div class="absa-metric">
                  <span class="absa-metric__val">94.2%</span>
                  <span class="absa-metric__label">Churn Accuracy</span>
                </div>
                <div class="absa-metric">
                  <span class="absa-metric__val">ZMW 12.4M</span>
                  <span class="absa-metric__label">CLV Protected</span>
                </div>
              </div>
              <!-- Graphic Chart Preview -->
              <div class="absa-graphic-bars">
                <div class="absa-bar" style="height: 40%"></div>
                <div class="absa-bar" style="height: 65%"></div>
                <div class="absa-bar" style="height: 50%"></div>
                <div class="absa-bar absa-bar--active" style="height: 85%"></div>
                <div class="absa-bar" style="height: 60%"></div>
                <div class="absa-bar" style="height: 95%"></div>
              </div>
            </div>

            <!-- Floating Alert Card Overlay -->
            <div class="absa-floating-alert">
              <div class="absa-floating-alert__icon">!</div>
              <div>
                <div class="absa-floating-alert__title">High Risk Trigger Detected</div>
                <div class="absa-floating-alert__sub">Customer ID: 994022/11/1 • Salary drop -42%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Impact Stats Banner ── -->
    <section id="impact" class="absa-stats-banner">
      <div class="absa-container absa-stats-grid">
        <div class="absa-stat-item" v-for="stat in systemStats" :key="stat.label">
          <div class="absa-stat-item__value">{{ stat.value }}</div>
          <div class="absa-stat-item__label">{{ stat.label }}</div>
          <div class="absa-stat-item__desc">{{ stat.description }}</div>
        </div>
      </div>
    </section>

    <!-- ── System Capabilities / Features Grid ── -->
    <section id="features" class="absa-features">
      <div class="absa-container">
        <div class="absa-section-header">
          <span class="absa-section-header__tag">CORE SYSTEM CAPABILITIES</span>
          <h2 class="absa-section-header__title">Engineered for Modern Relationship Management</h2>
          <p class="absa-section-header__desc">
            A comprehensive suite of machine learning models and actionable relationship workflows built specifically for retail and private banking operations.
          </p>
        </div>

        <div class="absa-features-grid">
          <div class="absa-feature-card" v-for="feat in systemFeatures" :key="feat.title">
            <div class="absa-feature-card__icon" v-html="feat.iconSvg"></div>
            <h3 class="absa-feature-card__title">{{ feat.title }}</h3>
            <p class="absa-feature-card__desc">{{ feat.description }}</p>
            <ul class="absa-feature-card__list">
              <li v-for="(item, idx) in feat.bullets" :key="idx">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Enterprise CTA Banner ── -->
    <section class="absa-cta-banner">
      <div class="absa-container absa-cta-banner__inner">
        <div>
          <h2 class="absa-cta-banner__title">Ready to Empower Your Relationship Managers?</h2>
          <p class="absa-cta-banner__desc">Access real-time risk scores, automated Next Best Actions, and full account histories right now.</p>
        </div>
        <a href="/dashboard" class="absa-btn-cta-light">Launch Intelligence Hub</a>
      </div>
    </section>

    <!-- ── Compliant Banking Footer ── -->
    <footer class="absa-footer">
      <div class="absa-container absa-footer__grid">
        <div class="absa-footer__brand-col">
          <div class="absa-brand">
            <img src="/logo_white.png" alt="ABSA Intelligence Unit" class="h-6 w-auto object-contain" />
            <span class="absa-brand__text absa-brand__text--light"><span class="absa-brand__sub">Intelligence Unit</span></span>
          </div>
          <p class="absa-footer__about">
            The Absa Customer Lifecycle Prediction Hub is an internal enterprise platform for predictive churn mitigation, behavioral analytics, and automated retention management.
          </p>
        </div>

        <div class="absa-footer__col">
          <h4 class="absa-footer__col-title">Platform Modules</h4>
          <a href="/dashboard" class="absa-footer__link">Portfolio Dashboard</a>
          <a href="/customers" class="absa-footer__link">Customer Ledger</a>
          <a href="/analytics" class="absa-footer__link">Predictive Models</a>
          <a href="/alerts" class="absa-footer__link">Priority Triggers</a>
        </div>

        <div class="absa-footer__col">
          <h4 class="absa-footer__col-title">Security & Governance</h4>
          <a href="#" class="absa-footer__link">Air-Gapped Deployment</a>
          <a href="#" class="absa-footer__link">Core Banking API</a>
          <a href="#" class="absa-footer__link">Audit Log Compliance</a>
          <a href="#" class="absa-footer__link">Access Control (RBAC)</a>
        </div>

        <div class="absa-footer__col">
          <h4 class="absa-footer__col-title">Internal Support</h4>
          <a href="#" class="absa-footer__link">System Documentation</a>
          <a href="#" class="absa-footer__link">RM Training Hub</a>
          <a href="#" class="absa-footer__link">IT Helpdesk</a>
          <a href="#" class="absa-footer__link">Model Release Notes</a>
        </div>
      </div>

      <div class="absa-footer__bottom">
        <div class="absa-container absa-footer__bottom-inner">
          <span>&copy; 2026 Absa Bank Zambia PLC. All Rights Reserved. Internal Confidential System.</span>
          <div class="absa-footer__legal">
            <a href="#">Privacy Notice</a>
            <a href="#">Security Protocol</a>
            <a href="#">Terms of Operational Use</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Enterprise Impact Metrics Data
const systemStats = ref([
  { value: '94.2%', label: 'Prediction Precision', description: 'Accurate 60-day early warning churn detection' },
  { value: '45%', label: 'Attrition Reduction', description: 'Lower churn rate across target private accounts' },
  { value: '1.2M+', label: 'Accounts Analyzed', description: 'Real-time daily transaction pattern scoring' },
  { value: '< 200ms', label: 'Engine Response', description: 'Instant Next Best Action recommendation generation' }
]);

// System Features Mapping to Platform Requirements
const systemFeatures = ref([
  {
    title: 'AI Customer Health Scoring',
    description: 'Dynamic 0–100 health metrics calculated daily based on cash flows, channel activity, and product usage.',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    bullets: ['Automated risk status categorization', '60-day predictive lookahead window', 'Historical trajectory tracking']
  },
  {
    title: 'Explainable AI (SHAP Drivers)',
    description: 'Full transparency into machine learning decisions with explicit risk driver rankings for every account.',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
    bullets: ['Identifies specific behavioral drops', 'Inflow & deposit variance analytics', 'No black-box predictions']
  },
  {
    title: 'Next Best Action (NBA) Engine',
    description: 'Context-aware retention recommendations generated automatically to guide Relationship Managers.',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    bullets: ['Priority rank & AI confidence score', 'One-click action logging modal', 'Pre-crafted campaign offers']
  },
  {
    title: 'Lifecycle Journey Mapping',
    description: '12-month visual timeline tracing every state transition from onboarding through active, at-risk, or churned states.',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    bullets: ['Transition point tagging', 'Historical state comparisons', 'Tenure vs risk mapping']
  },
  {
    title: 'Portfolio Risk Ledger',
    description: 'Interactive dashboard for Relationship Managers to filter, search, and manage high-value account risks.',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
    bullets: ['Multi-branch filtering capabilities', 'Instant alert acknowledgments', 'Direct Core Banking integration']
  },
  {
    title: 'Air-Gapped Enterprise Security',
    description: 'Designed to operate within Absa strict private cloud constraints without external cloud dependency.',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BE0F2C" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    bullets: ['Role-Based Access Control (RBAC)', 'End-to-end audit log tracking', 'Zero external data transmission']
  }
]);
</script>

<style scoped>
/* ════════════════════════════════════════════════════════
   Absa Public Landing Page Tokens & Styles
   ════════════════════════════════════════════════════════ */

.absa-landing {
  min-height: 100vh;
  background-color: #FFFFFF;
  color: #1F2937;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  line-height: 1.5;
}

.absa-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── Top Navigation Bar ── */
.absa-nav {
  height: 72px;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 50;
}

.absa-nav__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.absa-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-brand__text {
  font-weight: 800;
  font-size: 1.05rem;
  color: #BE0F2C;
}

.absa-brand__text--light { color: #FFFFFF; }

.absa-brand__sub {
  color: #4B5563;
  font-weight: 500;
}

.absa-brand__text--light .absa-brand__sub { color: #9CA3AF; }

.absa-nav__links {
  display: flex;
  gap: 28px;
}

.absa-nav__link {
  text-decoration: none;
  color: #4B5563;
  font-weight: 600;
  font-size: 0.875rem;
  transition: color 0.15s;
}

.absa-nav__link:hover { color: #BE0F2C; }

.absa-nav__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-btn-secondary {
  text-decoration: none;
  color: #1F2937;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 8px 16px;
}

.absa-btn-primary {
  text-decoration: none;
  background: #BE0F2C;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 8px 18px;
  border-radius: 6px;
  transition: background 0.15s;
}

.absa-btn-primary:hover { background: #8B0015; }

/* ── Hero Section ── */
.absa-hero {
  padding: 80px 0;
  background: linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 100%);
  overflow: hidden;
}

.absa-hero__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.absa-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FEE2E2;
  color: #BE0F2C;
  font-size: 0.725rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.absa-pill-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #BE0F2C;
}

.absa-hero__title {
  font-size: 2.75rem;
  font-weight: 900;
  line-height: 1.15;
  color: #111827;
  margin: 0 0 20px 0;
  letter-spacing: -0.02em;
}

.absa-hero__subtitle {
  font-size: 1.1rem;
  color: #4B5563;
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.absa-hero__cta-group {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.absa-btn-hero-primary {
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 6px;
  font-weight: 800;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 14px rgba(190, 15, 44, 0.3);
}

.absa-btn-hero-secondary {
  background: #FFFFFF;
  color: #1F2937;
  border: 1px solid #D1D5DB;
  text-decoration: none;
  padding: 14px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
}

.absa-hero__trust-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.775rem;
  color: #6B7280;
  font-weight: 600;
}

/* Hero Visual Card Stack */
.absa-hero__visual {
  position: relative;
}

.absa-hero-card-stack {
  position: relative;
  width: 100%;
}

.absa-glass-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.absa-glass-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.absa-glass-card__title {
  font-weight: 800;
  font-size: 0.95rem;
}

.absa-status-badge {
  background: #DCFCE7;
  color: #15803D;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 4px;
}

.absa-hero-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;
}

.absa-metric__val {
  display: block;
  font-size: 1.8rem;
  font-weight: 900;
  color: #BE0F2C;
}

.absa-metric__label {
  font-size: 0.75rem;
  color: #6B7280;
  font-weight: 700;
}

.absa-graphic-bars {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  height: 100px;
  padding-top: 10px;
  border-bottom: 1px solid #F3F4F6;
}

.absa-bar {
  flex: 1;
  background: #F3F4F6;
  border-radius: 4px 4px 0 0;
}

.absa-bar--active {
  background: linear-gradient(180deg, #BE0F2C, #8B0015);
}

.absa-floating-alert {
  position: absolute;
  bottom: -20px;
  left: -20px;
  background: #111827;
  color: #FFFFFF;
  border-radius: 8px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.absa-floating-alert__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #DC2626;
  color: white;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

.absa-floating-alert__title { font-size: 0.8rem; font-weight: 800; }
.absa-floating-alert__sub { font-size: 0.7rem; color: #9CA3AF; }

/* ── Stats Banner ── */
.absa-stats-banner {
  background: #8B0015;
  color: #FFFFFF;
  padding: 48px 0;
}

.absa-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.absa-stat-item__value {
  font-size: 2.25rem;
  font-weight: 900;
  color: #FFFFFF;
}

.absa-stat-item__label {
  font-size: 0.85rem;
  font-weight: 800;
  margin-top: 4px;
}

.absa-stat-item__desc {
  font-size: 0.725rem;
  opacity: 0.8;
  margin-top: 2px;
}

/* ── Features Section ── */
.absa-features {
  padding: 96px 0;
}

.absa-section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 64px auto;
}

.absa-section-header__tag {
  font-size: 0.75rem;
  font-weight: 800;
  color: #BE0F2C;
  letter-spacing: 0.05em;
}

.absa-section-header__title {
  font-size: 2rem;
  font-weight: 900;
  margin: 8px 0 16px 0;
  color: #111827;
}

.absa-section-header__desc {
  font-size: 0.95rem;
  color: #6B7280;
}

.absa-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.absa-feature-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 28px;
  transition: transform 0.15s, border-color 0.15s;
}

.absa-feature-card:hover {
  transform: translateY(-4px);
  border-color: #BE0F2C;
}

.absa-feature-card__icon {
  width: 44px;
  height: 44px;
  background: #FFF5F5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.absa-feature-card__title {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0 0 10px 0;
}

.absa-feature-card__desc {
  font-size: 0.85rem;
  color: #6B7280;
  margin-bottom: 20px;
  line-height: 1.5;
}

.absa-feature-card__list {
  padding-left: 16px;
  margin: 0;
  font-size: 0.775rem;
  color: #4B5563;
}

.absa-feature-card__list li {
  margin-bottom: 6px;
}

/* ── CTA Banner ── */
.absa-cta-banner {
  background: linear-gradient(135deg, #BE0F2C, #8B0015);
  color: #FFFFFF;
  padding: 60px 0;
}

.absa-cta-banner__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.absa-cta-banner__title {
  font-size: 1.75rem;
  font-weight: 900;
  margin: 0 0 8px 0;
}

.absa-cta-banner__desc {
  font-size: 0.95rem;
  opacity: 0.9;
  margin: 0;
}

.absa-btn-cta-light {
  background: #FFFFFF;
  color: #8B0015;
  text-decoration: none;
  font-weight: 800;
  padding: 14px 28px;
  border-radius: 6px;
  font-size: 0.9rem;
  white-space: nowrap;
}

/* ── Footer ── */
.absa-footer {
  background: #111827;
  color: #FFFFFF;
  padding-top: 64px;
}

.absa-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 48px;
}

.absa-footer__about {
  font-size: 0.8rem;
  color: #9CA3AF;
  margin-top: 16px;
  max-width: 320px;
  line-height: 1.6;
}

.absa-footer__col-title {
  font-size: 0.85rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 16px 0;
}

.absa-footer__link {
  display: block;
  color: #9CA3AF;
  text-decoration: none;
  font-size: 0.8rem;
  margin-bottom: 10px;
  transition: color 0.15s;
}

.absa-footer__link:hover { color: #FFFFFF; }

.absa-footer__bottom {
  border-top: 1px solid #1F2937;
  padding: 24px 0;
  font-size: 0.75rem;
  color: #6B7280;
}

.absa-footer__bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.absa-footer__legal {
  display: flex;
  gap: 16px;
}

.absa-footer__legal a {
  color: #6B7280;
  text-decoration: none;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .absa-hero__grid, .absa-features-grid, .absa-stats-grid, .absa-footer__grid {
    grid-template-columns: 1fr;
  }
  .absa-nav__links { display: none; }
  .absa-cta-banner__inner { flex-direction: column; gap: 24px; text-align: center; }
}
</style>
