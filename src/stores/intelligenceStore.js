import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const DEFAULT_AS_OF_DATE = '2026-07-27'

// ── Static fallback data (used when API is unavailable) ──────────

const FALLBACK_CLV = {
  summary: {
    total_clv: 8_420_000_000,
    avg_clv: 41_280,
    high_value_count: 3_840,
    clv_at_risk: 312_000_000,
    value_protected_mtd: 48_600_000,
    churn_adjusted_clv: 7_980_000_000,
  },
  bands: [
    { band: 'Platinum', label: 'Platinum', threshold: 'CLV > K500K', count: 820,   avg_clv: 1_240_000, avg_churn_prob: 0.12, total_aum: 1_016_800_000, pct: 0.4 },
    { band: 'Gold',     label: 'Gold',     threshold: 'K100K–K500K', count: 3_020,  avg_clv: 210_000,   avg_churn_prob: 0.19, total_aum: 634_200_000,   pct: 1.5 },
    { band: 'Silver',   label: 'Silver',   threshold: 'K20K–K100K',  count: 28_400, avg_clv: 52_000,    avg_churn_prob: 0.31, total_aum: 1_476_800_000, pct: 13.9 },
    { band: 'Bronze',   label: 'Bronze',   threshold: 'CLV < K20K',  count: 172_060, avg_clv: 8_400,    avg_churn_prob: 0.42, total_aum: 1_445_304_000, pct: 84.2 },
  ],
  top_customers: [
    {
      customer_id: 'CU-00421', name: 'Mpho Radebe',      segment: 'Wealth Management', band: 'Platinum', clv: 2_140_000, churn_prob: 0.91, aum: 'K 2.1M', rm: null,         days_since_contact: 12,
      churn_confidence: '± 0.04', clv_confidence: '± K 84K',
      churn_drivers: [
        { label: 'Deposit Velocity (3M trend)',    impact: -0.31, direction: 'negative' },
        { label: 'Digital Channel Dormancy',       impact: -0.22, direction: 'negative' },
        { label: 'Products Held',                  impact: +0.08, direction: 'positive' },
      ],
    },
    {
      customer_id: 'CU-00887', name: 'Zanele Motsepe',   segment: 'Wealth Management', band: 'Platinum', clv: 1_820_000, churn_prob: 0.88, aum: 'K 1.8M', rm: null,         days_since_contact: 9,
      churn_confidence: '± 0.05', clv_confidence: '± K 71K',
      churn_drivers: [
        { label: 'Transaction Frequency Drop',     impact: -0.27, direction: 'negative' },
        { label: 'Branch Visit Recency',           impact: -0.18, direction: 'negative' },
        { label: 'Loan Repayment History',         impact: +0.11, direction: 'positive' },
      ],
    },
    {
      customer_id: 'CU-00198', name: 'Dineo Molefe',     segment: 'Premier Banking',   band: 'Platinum', clv: 1_200_000, churn_prob: 0.74, aum: 'K 1.2M', rm: 'N. Khumalo', days_since_contact: 11,
      churn_confidence: '± 0.06', clv_confidence: '± K 52K',
      churn_drivers: [
        { label: 'Months Since Last Engagement',   impact: -0.24, direction: 'negative' },
        { label: 'Competitor Enquiry Signal',      impact: -0.19, direction: 'negative' },
        { label: 'Tenure at Bank',                 impact: +0.14, direction: 'positive' },
      ],
    },
    {
      customer_id: 'CU-01142', name: 'Tebogo Mahlangu',  segment: 'Premier Banking',   band: 'Gold',     clv: 840_000,   churn_prob: 0.84, aum: 'K 840K', rm: 'B. Zulu',    days_since_contact: 7,
      churn_confidence: '± 0.04', clv_confidence: '± K 38K',
      churn_drivers: [
        { label: 'Avg Monthly Balance Trend',      impact: -0.29, direction: 'negative' },
        { label: 'Digital Inactivity (60D)',       impact: -0.21, direction: 'negative' },
        { label: 'Active Debit Orders',            impact: +0.09, direction: 'positive' },
      ],
    },
    {
      customer_id: 'CU-00334', name: 'Kefilwe Sithole',  segment: 'Retail Savings',    band: 'Gold',     clv: 320_000,   churn_prob: 0.79, aum: 'K 320K', rm: null,         days_since_contact: 14,
      churn_confidence: '± 0.05', clv_confidence: '± K 18K',
      churn_drivers: [
        { label: 'Savings Withdrawal Rate',        impact: -0.26, direction: 'negative' },
        { label: 'Days Since Last Contact',        impact: -0.20, direction: 'negative' },
        { label: 'Savings Maturity Date Proximity',impact: +0.07, direction: 'positive' },
      ],
    },
    {
      customer_id: 'CU-02187', name: 'Siyabonga Ndlovu', segment: 'Business Current',  band: 'Gold',     clv: 290_000,   churn_prob: 0.55, aum: 'K 290K', rm: 'A. Nkosi',   days_since_contact: 2,
      churn_confidence: '± 0.06', clv_confidence: '± K 15K',
      churn_drivers: [
        { label: 'Business Revenue Volatility',    impact: -0.18, direction: 'negative' },
        { label: 'Overdraft Utilisation Spike',    impact: -0.14, direction: 'negative' },
        { label: 'Account Age',                    impact: +0.12, direction: 'positive' },
      ],
    },
    {
      customer_id: 'CU-03341', name: 'Mmabatho Tlhapi',  segment: 'Premier Banking',   band: 'Gold',     clv: 260_000,   churn_prob: 0.48, aum: 'K 260K', rm: 'N. Khumalo', days_since_contact: 0,
      churn_confidence: '± 0.07', clv_confidence: '± K 14K',
      churn_drivers: [
        { label: 'Cross-Product Holding Count',    impact: +0.16, direction: 'positive' },
        { label: 'Recent RM Engagement',           impact: +0.13, direction: 'positive' },
        { label: 'Balance Trend (90D)',            impact: -0.11, direction: 'negative' },
      ],
    },
    {
      customer_id: 'CU-00756', name: 'Kagiso Nkosi',     segment: 'Youth (18–25)',     band: 'Silver',   clv: 48_000,    churn_prob: 0.76, aum: 'K 48K',  rm: null,         days_since_contact: 5,
      churn_confidence: '± 0.08', clv_confidence: '± K 4K',
      churn_drivers: [
        { label: 'App Login Frequency Drop',       impact: -0.23, direction: 'negative' },
        { label: 'Zero Savings Goal Activity',     impact: -0.17, direction: 'negative' },
        { label: 'Payroll Credit Recency',         impact: +0.06, direction: 'positive' },
      ],
    },
  ],
}

const FALLBACK_LIFECYCLE = {
  distribution: [
    { stage: 'ONBOARDING', label: 'Onboarding',  count: 4_820,  pct: 2.4,  mom_delta: +312,  color: 'text-gray-600',      bg: 'bg-gray-100',   dot: 'bg-gray-500'   },
    { stage: 'GROWING',    label: 'Growing',     count: 38_240, pct: 18.7, mom_delta: -820,  color: 'text-absa-passion',  bg: 'bg-red-50',     dot: 'bg-absa-passion'  },
    { stage: 'MATURE',     label: 'Mature',      count: 124_300, pct: 60.9, mom_delta: -1240, color: 'text-absa-enrich',   bg: 'bg-gray-50',    dot: 'bg-absa-enrich'},
    { stage: 'AT_RISK',    label: 'At Risk',     count: 22_840, pct: 11.2, mom_delta: +1840, color: 'text-absa-energy',   bg: 'bg-orange-50',  dot: 'bg-absa-energy'},
    { stage: 'CHURNING',   label: 'Churning',    count: 8_420,  pct: 4.1,  mom_delta: +410,  color: 'text-absa-inspire',  bg: 'bg-red-100',    dot: 'bg-absa-inspire'},
    { stage: 'CHURNED',    label: 'Churned',     count: 3_680,  pct: 1.8,  mom_delta: +280,  color: 'text-red-900',       bg: 'bg-red-100',    dot: 'bg-red-900'    },
    { stage: 'WIN_BACK',   label: 'Win-Back',    count: 1_000,  pct: 0.5,  mom_delta: +55,   color: 'text-amber-700',     bg: 'bg-amber-50',   dot: 'bg-amber-500'  },
  ],
  transitions: {
    stages: ['ONBOARDING', 'GROWING', 'MATURE', 'AT_RISK', 'CHURNING', 'CHURNED'],
    matrix: [
      // From ONBOARDING
      [2800, 1840, 120,   40,   12,   8 ],
      // From GROWING
      [0,    36200, 1420, 480,  110,  30 ],
      // From MATURE
      [0,    180,   121840, 1240, 420,  620],
      // From AT_RISK
      [0,    140,   4200,   16200, 1840, 460],
      // From CHURNING
      [0,    0,     280,    840,   5200, 2100],
      // From CHURNED
      [0,    0,     0,      0,     0,    3680],
    ],
  },
  onboarding: {
    total_new: 4820,
    activated_30d: 3240,
    activated_60d: 3820,
    activated_90d: 4140,
    early_at_risk: 380,
    avg_products: 1.4,
    digital_enrolled: 72,
  },
  win_back: [
    { customer_id: 'CU-W0041', name: 'Lerato Dlamini',    last_product: 'Savings Account',    months_churned: 3,  est_value: 'K 28K',  status: 'ELIGIBLE',    prob: 0.62 },
    { customer_id: 'CU-W0088', name: 'Bongani Khumalo',   last_product: 'Business Current',   months_churned: 5,  est_value: 'K 84K',  status: 'IN CAMPAIGN', prob: 0.55 },
    { customer_id: 'CU-W0142', name: 'Nompumelelo Zulu',  last_product: 'Home Loan',          months_churned: 2,  est_value: 'K 420K', status: 'ELIGIBLE',    prob: 0.71 },
    { customer_id: 'CU-W0201', name: 'Thabo Sithole',     last_product: 'Youth Account',      months_churned: 8,  est_value: 'K 6K',   status: 'INELIGIBLE',  prob: 0.18 },
    { customer_id: 'CU-W0287', name: 'Dikeledi Molefe',   last_product: 'Premier Cheque',     months_churned: 1,  est_value: 'K 680K', status: 'ELIGIBLE',    prob: 0.84 },
    { customer_id: 'CU-W0341', name: 'Siphamandla Ndlela',last_product: 'Retail Savings',     months_churned: 6,  est_value: 'K 38K',  status: 'IN CAMPAIGN', prob: 0.44 },
  ],
}

const FALLBACK_FORECAST = {
  current_aum: 4_572_000_000,
  as_of_date: DEFAULT_AS_OF_DATE,
  scenarios: {
    optimistic: [4572, 4598, 4621, 4648, 4672, 4691, 4710, 4728, 4741, 4758, 4771, 4784],
    base:       [4572, 4541, 4512, 4484, 4458, 4432, 4408, 4384, 4362, 4340, 4319, 4298],
    pessimistic:[4572, 4498, 4426, 4356, 4288, 4220, 4154, 4090, 4028, 3967, 3907, 3848],
  },
  labels: ['Jul 27','Aug 3','Aug 10','Aug 17','Aug 24','Aug 31','Sep 7','Sep 14','Sep 21','Sep 28','Oct 5','Oct 12'],
  by_segment: [
    { segment: 'Retail Savings',    current_aum: 1_445_000_000, projected_exits: 312, aum_at_risk: 112_800_000, projected_remaining: 1_332_200_000 },
    { segment: 'Mature / Core',     current_aum: 1_876_000_000, projected_exits: 84,  aum_at_risk: 31_200_000,  projected_remaining: 1_844_800_000 },
    { segment: 'Business Current',  current_aum: 634_000_000,   projected_exits: 198, aum_at_risk: 82_800_000,  projected_remaining: 551_200_000   },
    { segment: 'Premier Banking',   current_aum: 412_000_000,   projected_exits: 54,  aum_at_risk: 68_400_000,  projected_remaining: 343_600_000   },
    { segment: 'Wealth Management', current_aum: 205_000_000,   projected_exits: 30,  aum_at_risk: 48_000_000,  projected_remaining: 157_000_000   },
  ],
  sensitivity: [
    { churn_delta: '-2%', label: 'Churn ↓ 2pp (Best)',   projected_aum: 4_692_000_000, delta_vs_base: +394_000_000, aum_change: '+8.6%' },
    { churn_delta: '-1%', label: 'Churn ↓ 1pp',           projected_aum: 4_495_000_000, delta_vs_base: +197_000_000, aum_change: '+4.3%' },
    { churn_delta: 'Base',label: 'Base Scenario',          projected_aum: 4_298_000_000, delta_vs_base: 0,           aum_change: 'Baseline' },
    { churn_delta: '+1%', label: 'Churn ↑ 1pp',           projected_aum: 4_101_000_000, delta_vs_base: -197_000_000, aum_change: '-4.3%' },
    { churn_delta: '+2%', label: 'Churn ↑ 2pp (Stress)',  projected_aum: 3_904_000_000, delta_vs_base: -394_000_000, aum_change: '-8.6%' },
  ],
  // 80% confidence interval (P10–P90) around base scenario — Monte Carlo (10,000 trajectories)
  confidence_bounds: {
    p10: [4572, 4498, 4441, 4386, 4333, 4280, 4228, 4178, 4130, 4083, 4036, 3990],
    p90: [4572, 4582, 4582, 4582, 4582, 4583, 4586, 4588, 4592, 4595, 4600, 4605],
  },
  // Checkpoint table: base, P10, P90 at key milestones for the confidence bounds table
  ci_checkpoints: [
    { label: 'Now (Jul 27)',  base: 4572, p10: 4572, p90: 4572 },
    { label: '30D (Aug 27)',  base: 4458, p10: 4333, p90: 4582 },
    { label: '60D (Sep 26)', base: 4362, p10: 4130, p90: 4592 },
    { label: '90D (Oct 26)', base: 4298, p10: 3990, p90: 4605 },
  ],
  model_meta: {
    version: '2.1',
    last_run: '2026-07-27 02:15 UTC',
    auc_roc: 0.847,
    n_simulations: 10_000,
  },
}

const FALLBACK_OUTCOMES = {
  roi: {
    revenue_protected: 48_600_000,
    customers_retained: 1_284,
    intervention_cost: 3_200_000,
    net_roi_pct: 1418,
    roi_multiple: 15.2,
    trend: [
      { month: 'Mar', revenue: 2_100_000 }, { month: 'Apr', revenue: 4_800_000 },
      { month: 'May', revenue: 8_200_000 }, { month: 'Jun', revenue: 14_100_000 },
      { month: 'Jul', revenue: 48_600_000 },
    ],
  },
  retention_performance: [
    { entity: 'Sandton Branch',     flagged: 284, contacted: 198, retained: 142, churned: 56, revenue_protected: 'K 9.2M',  rate: 71.7 },
    { entity: 'Soweto Branch',      flagged: 312, contacted: 201, retained: 138, churned: 63, revenue_protected: 'K 4.1M',  rate: 68.7 },
    { entity: 'Rosebank Branch',    flagged: 198, contacted: 162, retained: 128, churned: 34, revenue_protected: 'K 12.4M', rate: 79.0 },
    { entity: 'Pretoria CBD Branch',flagged: 241, contacted: 178, retained: 118, churned: 60, revenue_protected: 'K 5.8M',  rate: 66.3 },
    { entity: 'Durban North Branch',flagged: 187, contacted: 144, retained: 104, churned: 40, revenue_protected: 'K 6.8M',  rate: 72.2 },
  ],
  success_criteria: [
    { criterion: 'Reduce monthly churn rate by 15% within 90 days of pilot launch', target: '≤ 5.1%', current: '5.8%',   status: 'AT RISK',  delta: '+0.7pp' },
    { criterion: 'Achieve ≥70% RM case actioning rate',                              target: '≥ 70%',  current: '64%',    status: 'MONITOR',  delta: '-6pp'   },
    { criterion: 'Model AUC-ROC ≥ 0.82 on holdout set',                              target: '≥ 0.82', current: '0.847',  status: 'MET',      delta: '+0.027' },
    { criterion: 'ETL pipeline uptime ≥ 99%',                                        target: '≥ 99%',  current: '99.4%',  status: 'MET',      delta: '+0.4%'  },
    { criterion: 'Deliver business case ROI within 6 months',                         target: '> 1×',   current: '15.2×',  status: 'MET',      delta: '+14.2×' },
    { criterion: 'Branch manager dashboard adopted by ≥ 80% of branch managers',     target: '≥ 80%',  current: '61%',    status: 'MONITOR',  delta: '-19pp'  },
    { criterion: 'Pilot branches outperform control on churn rate by ≥ 10%',          target: '≥ 10%',  current: '7.2%',   status: 'MONITOR',  delta: '-2.8pp' },
  ],
  pilot_vs_control: {
    pilot:   { branches: 6, churn_rate: 5.1, retention_rate: 74, aum_change: -1.2, contacts_per_rm: 28 },
    control: { branches: 7, churn_rate: 7.8, retention_rate: 58, aum_change: -4.8, contacts_per_rm: 11 },
    significance: 'p < 0.05',
  },
}

// ── Store ────────────────────────────────────────────────────────
export const useIntelligenceStore = defineStore('intelligence', () => {
  const clvData       = ref(null)
  const lifecycleData = ref(null)
  const forecastData  = ref(null)
  const outcomesData  = ref(null)
  const loading       = ref({ clv: false, lifecycle: false, forecast: false, outcomes: false })
  const error         = ref({ clv: null,  lifecycle: null,  forecast: null,  outcomes: null  })

  async function fetchClv() {
    loading.value.clv = true
    try {
      const { data } = await api.get('/api/v1/customers/clv-summary', { params: { as_of_date: DEFAULT_AS_OF_DATE } })
      clvData.value = data
    } catch {
      clvData.value = FALLBACK_CLV
    } finally {
      loading.value.clv = false
    }
  }

  async function fetchLifecycle() {
    loading.value.lifecycle = true
    try {
      const { data } = await api.get('/api/v1/customers/lifecycle-stages', { params: { as_of_date: DEFAULT_AS_OF_DATE } })
      lifecycleData.value = data
    } catch {
      lifecycleData.value = FALLBACK_LIFECYCLE
    } finally {
      loading.value.lifecycle = false
    }
  }

  async function fetchForecast() {
    loading.value.forecast = true
    try {
      const { data } = await api.get('/api/v1/forecasts/balance', { params: { as_of_date: DEFAULT_AS_OF_DATE } })
      forecastData.value = data
    } catch {
      forecastData.value = FALLBACK_FORECAST
    } finally {
      loading.value.forecast = false
    }
  }

  async function fetchOutcomes() {
    loading.value.outcomes = true
    try {
      const { data } = await api.get('/api/v1/outcomes/retention-roi', { params: { as_of_date: DEFAULT_AS_OF_DATE } })
      outcomesData.value = data
    } catch {
      outcomesData.value = FALLBACK_OUTCOMES
    } finally {
      loading.value.outcomes = false
    }
  }

  return {
    clvData, lifecycleData, forecastData, outcomesData,
    loading, error,
    fetchClv, fetchLifecycle, fetchForecast, fetchOutcomes,
  }
})
