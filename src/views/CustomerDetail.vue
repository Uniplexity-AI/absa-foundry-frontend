<template>
  <div class="w-full pt-6 px-6 pb-6">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="mb-6 h-6 bg-white rounded-sm w-1/3 animate-pulse"></div>
      <div class="grid grid-cols-12 gap-4 md:gap-4 mb-8">
        <div class="col-span-12 lg:col-span-8"><LoadingSkeleton type="block" /></div>
        <div class="col-span-12 lg:col-span-4"><LoadingSkeleton type="block" /></div>
      </div>
      <div class="grid grid-cols-4 gap-4 md:gap-4 mb-8">
        <LoadingSkeleton v-for="i in 4" :key="i" type="card" />
      </div>
      <LoadingSkeleton type="block" />
    </template>

    <!-- Empty State -->
    <template v-else-if="!customerId || isEmpty">
      <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
        </div>
        <h2 class="text-sm font-bold text-absa-enrich mb-2">Customer Not Found</h2>
        <p class="text-xs text-gray-500 max-w-md">No predictive profile is available for this customer.</p>
        <button @click="goBack" class="mt-6 bg-absa-passion text-white text-xs font-bold py-2 px-5 rounded-sm shadow-none hover:bg-absa-power transition-colors">Back to Predictive Lifecycle Ledger</button>
      </div>
    </template>

    <!-- Main Content -->
    <template v-else>
      <!-- Breadcrumb + Back -->
      <div class="mb-5">
        <button @click="goBack" class="flex items-center gap-2 text-xs font-bold text-absa-passion hover:text-absa-power transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"/></svg>
          Back to Predictive Lifecycle Ledger
        </button>
        <div class="flex items-center gap-2 text-[11px] text-gray-500 mt-2">
          <span>Dashboard</span><span>/</span><span>Portfolio</span><span>/</span>
          <span>Predictive Lifecycle Ledger</span><span>/</span>
          <span class="text-absa-enrich font-bold">{{ customerId }}</span>
        </div>
      </div>

      <!-- ═══ AI Next Best Action Engine ═══ -->
      <div v-if="activeOverride" class="mb-3 flex items-center gap-3 bg-absa-enrich text-white px-4 py-2 rounded-sm text-xs">
        <span class="material-symbols-outlined text-[16px]">edit</span>
        <span class="font-bold">Override active:</span>
        <span>{{ activeOverride.toOffer }}</span>
        <span class="text-gray-300">— {{ activeOverride.reason }}</span>
        <button @click="resetOverride" class="ml-auto text-[11px] font-bold underline hover:text-absa-energy">Undo override</button>
      </div>
      <AiNbaPanel
        :churn-prob="churnProb"
        :customer-id="customerId"
        @execute="showCampaignModal = true"
        @override="openOverrideDialog"
      />

      <!-- AI narration of the rule-engine decision (Ollama, ADR-005) -->
      <AiNarrationPanel
        v-if="customerId"
        class="mt-3"
        :customer-id="customerId"
      />

      <!-- Override Dialog -->
      <div v-if="showOverrideDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="showOverrideDialog = false"></div>
        <div class="relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl">
          <div class="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-absa-enrich">Override AI Recommendation</h3>
              <p class="text-xs text-gray-500 mt-0.5">RM discretion overrides the prescribed intervention for {{ customerId }}</p>
            </div>
            <button @click="showOverrideDialog = false" class="text-gray-400 hover:text-gray-600"><span class="material-symbols-outlined">close</span></button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Alternative Action</label>
              <select v-model="overrideOffer" class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion">
                <option v-for="opt in overrideOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Reason for override</label>
              <textarea v-model="overrideReason" rows="3" placeholder="e.g. Customer is a high-value HNI with a personal relationship — RM will contact directly." class="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:ring-1 focus:ring-absa-passion resize-none"></textarea>
            </div>
            <div class="flex justify-end gap-2 pt-1">
              <button @click="showOverrideDialog = false" class="px-4 py-2 border border-gray-300 text-xs font-bold text-absa-enrich rounded-sm hover:bg-gray-50">Cancel</button>
              <button @click="doOverride" class="px-4 py-2 bg-absa-passion text-white text-xs font-bold rounded-sm hover:bg-absa-power">APPLY OVERRIDE</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ Customer Profile Header ═══ -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0" :style="{ background: STATE_COLORS[state] || '#7f1d1d' }">
              {{ initials }}
            </div>
            <div>
              <div class="flex items-center gap-3 flex-wrap">
                <h1 class="text-sm font-bold text-absa-enrich">{{ customer.fullName || ('Customer ' + (customerId || '').replace('CUST', '')) }}</h1>
                <StatePill :state="state" />
              </div>
              <p class="text-xs text-gray-500 mt-1">ID: {{ customerId }}</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 mt-4 text-xs">
                <div><span class="text-gray-500 block text-[11px] uppercase">Customer Since</span><span class="font-bold text-absa-enrich">{{ customerSince || '—' }}</span></div>
                <div><span class="text-gray-500 block text-[11px] uppercase">Last Activity</span><span class="font-bold text-absa-enrich">{{ lastActivity }}</span></div>
                <div><span class="text-gray-500 block text-[11px] uppercase">Last Snapshot</span><span class="font-bold text-absa-enrich">{{ computedAt || '—' }}</span></div>
                <div><span class="text-gray-500 block text-[11px] uppercase">State Since</span><span class="font-bold text-absa-enrich">{{ stateSince || '—' }}</span></div>
                <div v-if="customer.branch"><span class="text-gray-500 block text-[11px] uppercase">Branch</span><span class="font-bold text-absa-enrich">{{ customer.branch }}</span></div>
                <div><span class="text-gray-500 block text-[11px] uppercase">Market segment</span><span class="font-bold text-absa-enrich">{{ customer.segment }}</span></div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-wrap shrink-0">
            <button @click="goToActionPlan" class="bg-absa-passion text-white text-xs font-bold py-2.5 px-4 shadow-none hover:bg-absa-power transition-colors">CREATE ACTION PLAN</button>
            <div class="relative">
              <button @click="showMoreMenu = !showMoreMenu" class="border border-gray-300 text-absa-enrich text-xs font-bold py-2.5 px-4 hover:bg-gray-50 transition-colors flex items-center gap-1">
                MORE
                <span class="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
              <div v-if="showMoreMenu" class="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 shadow-lg z-30 py-1">
                <button @click="exportProfile()" class="w-full text-left px-4 py-2 text-xs font-semibold text-absa-enrich hover:bg-gray-50 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[16px] text-gray-400">download</span>
                  Export Profile (JSON)
                </button>
                <button @click="goToTakeAction(actionPlan[0])" class="w-full text-left px-4 py-2 text-xs font-semibold text-absa-enrich hover:bg-gray-50 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[16px] text-gray-400">flash_on</span>
                  Take Action
                </button>
                <button @click="copyCustomerId" class="w-full text-left px-4 py-2 text-xs font-semibold text-absa-enrich hover:bg-gray-50 flex items-center gap-2">
                  <span class="material-symbols-outlined text-[16px] text-gray-400">content_copy</span>
                  Copy Customer ID
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ Predictive Lifecycle Summary ═══ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-4 mb-8">
        <!-- Health -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 shadow-none">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase">Customer Health</h3>
            <InfoDot :label="'Combined health score from churn risk, customer value and behavioural engagement.'" />
          </div>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold font-mono text-absa-enrich text-absa-enrich">{{ healthScore != null ? healthScore.toFixed(1) : '—' }}</span>
            <span class="text-xs text-gray-500">/ 100</span>
          </div>
          <div class="pp-track mt-3"><div class="pp-fill" :style="{ width: (healthScore || 0) + '%', background: healthColor }"></div></div>
          <p class="text-xs font-bold mt-2" :style="{ color: healthColor }">{{ healthLabel }}</p>
        </div>

        <!-- Churn -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 shadow-none">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase">Churn Probability</h3>
            <InfoDot :label="'Probability the customer will churn within the prediction horizon, from the XGBoost churn model.'" />
          </div>
          <span class="text-2xl font-bold font-mono text-absa-enrich text-absa-enrich">{{ churnProb != null ? Math.round(churnProb * 100) + '%' : '—' }}</span>
          <p class="text-xs font-bold mt-2" :style="{ color: churnColor }">{{ churnLabel }}</p>
          <a href="#why-predictions" class="text-xs font-bold text-absa-passion hover:text-absa-power mt-2 inline-block">Why?</a>
        </div>

        <!-- CLV -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 shadow-none">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase">Customer Lifetime Value</h3>
            <InfoDot :label="'CLV percentile rank among the portfolio — an estimate, not guaranteed future revenue.'" />
          </div>
          <span class="text-2xl font-bold font-mono text-absa-enrich text-absa-enrich">{{ clvPercentile != null ? 'P' + Math.round(clvPercentile * 100) : '—' }}</span>
          <span class="text-xs text-gray-500"> ZMW</span>
          <p class="text-xs text-gray-500 mt-2">Predicted CLV (percentile rank)</p>
        </div>

        <!-- Lifecycle State -->
        <div class="bg-white rounded-sm border border-gray-300 p-4 shadow-none">
          <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-3">Lifecycle State</h3>
          <StatePill :state="state" size="lg" />
          <p v-if="statePct != null" class="text-xs text-gray-500 mt-3">{{ statePct }}% of portfolio customers are currently {{ state.toLowerCase().replace('_', ' ') }}</p>
          <p v-else class="text-xs text-gray-500 mt-3">Current predictive lifecycle classification</p>
        </div>
      </div>

      <!-- ═══ Why These Predictions ═══ -->
      <div id="why-predictions" class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <div class="mb-4">
          <h2 class="text-sm font-bold text-absa-enrich">Why These Predictions?</h2>
          <p class="text-xs text-gray-500">Explanation of the customer's current lifecycle position</p>
        </div>

        <!-- Health factors -->
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 lg:col-span-6">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-3">Customer Health Score — {{ healthScore != null ? healthScore.toFixed(1) + ' / 100' : '—' }}</h3>
            <div class="space-y-3">
              <div v-for="f in healthFactors" :key="f.key" class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ background: f.good ? '#16a34a' : '#7f1d1d' }"></span>
                <span class="text-xs text-absa-enrich w-48 shrink-0">{{ f.label }}</span>
                <div class="pp-track flex-1"><div class="pp-fill" :style="{ width: (f.value || 0) + '%', background: f.good ? '#16a34a' : '#7f1d1d' }"></div></div>
                <span class="text-xs font-bold text-absa-enrich w-14 text-right">{{ f.value != null ? f.value.toFixed(0) : '—' }}</span>
              </div>
              <p class="text-[11px] text-gray-500 pt-1">Components: Churn risk, customer value (CLV) and behavioural engagement — as produced by the health scorer.</p>
            </div>
          </div>

          <!-- Churn signals -->
          <div class="col-span-12 lg:col-span-6 border-t lg:border-t-0 lg:border-l border-gray-300 lg:pl-6">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-3">What is driving churn? — {{ churnProb != null ? Math.round(churnProb * 100) + '%' : '—' }}</h3>
            <div v-if="riskCodes.length" class="space-y-3">
              <div v-for="r in riskCodes" :key="r.code" class="flex items-start gap-3">
                <span class="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5" :style="{ background: severityColor(r.severity) }"></span>
                <div>
                  <div class="text-xs font-bold text-absa-enrich">{{ codeLabel(r.code) }}</div>
                  <div class="text-[11px] text-gray-500">{{ detailText(r.detail) }}</div>
                </div>
                <span class="ml-auto text-[11px] font-bold" :style="{ color: severityColor(r.severity) }">{{ r.severity }}</span>
              </div>
            </div>
            <p v-else class="text-xs text-gray-500">No churn risk signals flagged for this customer.</p>
          </div>
        </div>

        <!-- CLV explanation -->
        <div class="mt-6 pt-5 border-t border-gray-300">
          <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-2">How was Customer Lifetime Value estimated?</h3>
          <p class="text-xs text-gray-500 max-w-3xl">
            Predicted CLV is the customer's <strong class="text-absa-enrich">percentile rank</strong> ({{ clvPercentile != null ? 'P' + Math.round(clvPercentile * 100) : '—' }})
            within the portfolio, derived from historical revenue (total amount over the last 90 days), customer value, and retention probability.
            It is a <strong class="text-absa-enrich">prediction / estimate</strong>, not a guaranteed future revenue figure.
          </p>
          <p class="text-[11px] text-gray-500 mt-3">{{ clvEvidence.length ? clvEvidence.join(' · ') : 'No historical revenue data available for this customer.' }}</p>
        </div>
      </div>

      <!-- ═══ Lifecycle Journey ═══ -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <h2 class="text-sm font-bold text-absa-enrich mb-5">Customer Lifecycle Journey</h2>
        <div class="flex flex-wrap items-center gap-2">
          <template v-for="(s, i) in LIFECYCLE_ORDER" :key="s">
            <div class="flex items-center gap-2">
              <div :class="['flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-[11px] font-bold uppercase tracking-wider', i === currentStateIndex ? 'pp-current-state' : 'border-gray-300 bg-white']"
                   :style="i === currentStateIndex ? { borderColor: STATE_COLORS[s], color: STATE_COLORS[s] } : { color: '#857371' }">
                <span class="w-2 h-2 rounded-full" :style="{ background: STATE_COLORS[s] }"></span>
                {{ s.replace('_', ' ') }}
              </div>
              <svg v-if="i < LIFECYCLE_ORDER.length - 1" class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
            </div>
          </template>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div class="pp-metric"><span class="pp-metric__label">Date entered current state</span><span class="pp-metric__value">{{ stateSince || '—' }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">Previous state</span><span class="pp-metric__value">{{ previousState || '—' }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">State transitions</span><span class="pp-metric__value">{{ transitions.length || (timelineEntries.length ? timelineEntries.length - 1 : 0) }}</span></div>
          <div class="pp-metric">
            <span class="pp-metric__label">Predicted next state</span>
            <span class="pp-metric__value">{{ predictedNextState ? predictedNextState.state.replace('_', ' ') : '—' }}</span>
            <span v-if="predictedNextState" class="text-[11px] text-gray-500">{{ Math.round(predictedNextState.probability * 100) }}% probability</span>
          </div>
        </div>
      </div>

      <!-- ═══ Activity Timeline ═══ -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <h2 class="text-sm font-bold text-absa-enrich mb-5">Customer Activity Timeline</h2>
        <div v-if="timelineEntries.length" class="relative pl-6">
          <div class="absolute left-2 top-1 bottom-1 w-px bg-outline-variant"></div>
          <div v-for="(e, i) in timelineEntries" :key="i" class="relative pl-6 pb-5">
            <span class="absolute left-[-10px] top-1 w-4 h-4 rounded-full border-2 border-white" :style="{ background: STATE_COLORS[e.state] || '#7f1d1d' }"></span>
            <div class="text-xs font-bold text-absa-enrich">{{ e.state ? e.state.replace('_', ' ') : '—' }}</div>
            <div class="text-[11px] text-gray-500">{{ fmtDate(e.as_of_date) }}</div>
          </div>
        </div>
        <p v-else class="text-xs text-gray-500">No lifecycle activity recorded for this customer.</p>
      </div>

      <!-- ═══ Customer Behaviour ═══ -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <h2 class="text-sm font-bold text-absa-enrich mb-1">Customer Behaviour</h2>
        <p class="text-xs text-gray-500 mb-5">Behavioural signals derived from the customer's transaction and engagement history</p>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div v-for="b in behaviourFactors" :key="b.label" class="border border-gray-300 rounded-sm p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-absa-enrich">{{ b.label }}</span>
              <span class="text-[11px] text-gray-500">{{ b.unit }}</span>
            </div>
            <div v-if="b.evidence" class="text-[11px] text-gray-500 mb-3">{{ b.evidence }}</div>
            <div v-if="b.evidence" class="pp-track"><div class="pp-fill" :style="{ width: behaviourBarWidth(b) + '%', background: '#7f1d1d' }"></div></div>
            <span v-else class="text-xs text-gray-500">Not available for this customer</span>
          </div>
        </div>
      </div>

      <!-- ═══ Risk & Opportunity ═══ -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4 mb-6">
        <div class="bg-white rounded-sm border border-gray-300 shadow-none  p-4">
          <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-4">Risk Signals</h3>
          <div v-if="riskCodes.length" class="space-y-3">
            <div v-for="r in riskCodes" :key="r.code" class="border-l-4 pl-3" :style="{ borderColor: severityColor(r.severity) }">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-absa-enrich">{{ codeLabel(r.code) }}</span>
                <span class="text-[11px] font-bold" :style="{ color: severityColor(r.severity) }">{{ r.severity }}</span>
              </div>
              <p class="text-[11px] text-gray-500">{{ detailText(r.detail) }}</p>
            </div>
          </div>
          <p v-else class="text-xs text-gray-500">No risk signals detected.</p>
        </div>
        <div class="bg-white rounded-sm border border-gray-300 shadow-none  p-4">
          <h3 class="text-[11px] font-bold uppercase tracking-wider text-gray-500 uppercase mb-4">Opportunity Signals</h3>
          <div v-if="opportunityCodes.length" class="space-y-3">
            <div v-for="r in opportunityCodes" :key="r.code" class="border-l-4 pl-3 border-[#4CAF50]">
              <span class="text-xs font-bold text-absa-enrich">{{ codeLabel(r.code) }}</span>
              <p class="text-[11px] text-gray-500">{{ detailText(r.detail) }}</p>
            </div>
          </div>
          <p v-else class="text-xs text-gray-500">No opportunity signals detected.</p>
        </div>
      </div>

      <!-- ═══ Recommended Actions ═══ -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <h2 class="text-sm font-bold text-absa-enrich mb-5">Recommended Actions</h2>
        <div v-if="actionPlan.length" class="space-y-4">
          <div v-for="a in actionPlan" :key="a.priority" class="border border-gray-300 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="w-10 h-10 bg-white border border-gray-200 text-absa-passion flex items-center justify-center font-bold shrink-0">{{ a.priority }}</div>
            <div class="flex-1">
              <div class="text-xs font-bold text-absa-enrich">{{ a.title }}</div>
              <div class="text-[11px] text-gray-500">{{ a.reason }}</div>
              <div class="text-xs text-absa-enrich mt-1">{{ a.action }}</div>
            </div>
            <div class="text-right shrink-0">
              <div class="text-[11px] text-gray-500 mb-1">Propensity {{ a.confidence }}%</div>
              <button @click="goToTakeAction(a)" class="bg-absa-passion text-white text-xs font-bold py-2 px-4 shadow-none hover:bg-absa-power transition-colors">TAKE ACTION</button>
            </div>
          </div>
        </div>
        <p v-else class="text-xs text-gray-500">No recommended actions generated yet.</p>
      </div>

      <!-- ═══ Prediction Confidence + Data Used ═══ -->
      <div class="grid grid-cols-12 gap-4 md:gap-4 mb-6">
        <div class="col-span-12 lg:col-span-5 bg-white rounded-sm border border-gray-300 shadow-none  p-4">
          <h2 class="text-sm font-bold text-absa-enrich mb-4">Prediction Confidence</h2>
          <div class="flex items-baseline gap-2 mb-3">
            <span class="text-2xl font-bold font-mono text-absa-enrich text-absa-enrich">{{ modelConfidence }}</span>
            <span class="text-xs text-gray-500">Model Confidence</span>
          </div>
          <ul class="space-y-2 text-xs">
            <li class="flex justify-between"><span class="text-gray-500">Data completeness</span><span class="font-bold text-absa-enrich">{{ dataCompleteness ? Math.round(dataCompleteness.populated / dataCompleteness.total * 100) + '%' : '—' }}</span></li>
            <li class="flex justify-between"><span class="text-gray-500">Behavioural features populated</span><span class="font-bold text-absa-enrich">{{ dataCompleteness ? dataCompleteness.populated + ' / ' + dataCompleteness.total : '—' }}</span></li>
            <li class="flex justify-between"><span class="text-gray-500">Model version</span><span class="font-bold text-absa-enrich">{{ modelVersion }}</span></li>
            <li class="flex justify-between"><span class="text-gray-500">Last model update</span><span class="font-bold text-absa-enrich">{{ computedAt || '—' }}</span></li>
          </ul>
          <p class="text-[11px] text-gray-500 mt-4">Confidence is based on the amount, recency, and consistency of behavioural data available for this customer. Predictive results are estimates.</p>
        </div>

        <div class="col-span-12 lg:col-span-7 bg-white rounded-sm border border-gray-300 shadow-none  p-4">
          <details open>
            <summary class="text-sm font-bold text-absa-enrich cursor-pointer list-none">Data Used for Prediction</summary>
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="d in dataUsed" :key="d.name" class="border border-gray-300 rounded-sm p-3">
                <div class="text-xs font-bold text-absa-enrich">{{ d.name }}</div>
                <div class="text-[11px] text-gray-500">{{ d.available }}</div>
              </div>
            </div>
          </details>
        </div>
      </div>

      <!-- ═══ Prediction History ═══ -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none overflow-hidden  mb-6">
        <div class="p-4 border-b border-gray-300">
          <h2 class="text-sm font-bold text-absa-enrich">Prediction History</h2>
          <p class="text-xs text-gray-500">Lifecycle state over time</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-outline-variant">
            <thead>
              <tr class="bg-white">
                <th class="p-4 text-[11px] font-bold uppercase tracking-wider text-absa-enrich text-left">Date</th>
                <th class="p-4 text-[11px] font-bold uppercase tracking-wider text-absa-enrich text-left">Lifecycle State</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-outline-variant">
              <tr v-if="!timelineEntries.length"><td colspan="2" class="p-8 text-center text-xs text-gray-500">No history available</td></tr>
              <tr v-for="(e, i) in timelineEntries" :key="i">
                <td class="p-4 text-xs text-absa-enrich">{{ fmtDate(e.as_of_date) }}</td>
                <td class="p-4"><StatePill :state="e.state" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ═══ Customer Alerts ═══ -->
      <div v-if="alertCodes.length" class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm font-bold text-absa-enrich">Customer Alerts</h2>
          <span class="text-[11px] font-bold text-absa-passion">{{ alertCodes.length }} ACTIVE</span>
        </div>
        <div class="space-y-3">
          <div v-for="r in alertCodes" :key="r.code" class="border-l-4 border-[#DC0037] pl-4">
            <div class="text-xs font-bold text-absa-enrich">{{ codeLabel(r.code) }}</div>
            <div class="text-[11px] text-gray-500">Severity: {{ r.severity }} · {{ detailText(r.detail) }}</div>
          </div>
        </div>
      </div>

      <!-- ═══ Customer Information ═══ -->
      <div class="bg-white rounded-sm border border-gray-300 shadow-none p-5 mb-6">
        <h2 class="text-sm font-bold text-absa-enrich mb-4">Customer Information</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="pp-metric"><span class="pp-metric__label">Customer ID</span><span class="pp-metric__value">{{ customerId }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">Name</span><span class="pp-metric__value">{{ customer.fullName || '—' }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">Account status</span><span class="pp-metric__value">{{ state.replace('_', ' ') }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">Customer since</span><span class="pp-metric__value">{{ customerSince || '—' }}</span></div>
          <div v-if="customer.branch" class="pp-metric"><span class="pp-metric__label">Branch</span><span class="pp-metric__value">{{ customer.branch }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">Market segment</span><span class="pp-metric__value">{{ customer.segment }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">Health score</span><span class="pp-metric__value">{{ healthScore != null ? healthScore.toFixed(1) : '—' }}</span></div>
          <div class="pp-metric"><span class="pp-metric__label">Last activity</span><span class="pp-metric__value">{{ lastActivity }}</span></div>
        </div>
        <!-- End of profile sections -->
      </div>
      
      <!-- Modals -->
      <AiCampaignModal
        v-model="showCampaignModal"
        :customers="[{ id: customerId, name: customer.fullName || 'Customer', churnProb, segment: customer.segment }]"
        source-context="portfolio"
      />

    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import AiNbaPanel from '@/components/intelligence/AiNbaPanel.vue'
import AiNarrationPanel from '@/components/intelligence/AiNarrationPanel.vue'
import AiCampaignModal from '@/components/intelligence/AiCampaignModal.vue'
import { useCustomerStore } from '@/stores/customerStore'
import { usePredictionStore } from '@/stores/predictionStore'
import { notify } from '@/utils/absaExport'
import { overrideRecommendation, getOverride, hydrateStateFromServer } from '@/utils/absaActions'

const route = useRoute()
const router = useRouter()
const customerStore = useCustomerStore()
const predictionStore = usePredictionStore()

const api = axios.create({ baseURL: API_BASE_URL, timeout: 20000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const DEFAULT_AS_OF_DATE = '2026-07-27'

const STATE_COLORS = {
  NEW: '#16a34a',
  ACTIVE: '#16a34a',
  GROWING: '#16a34a',
  AT_RISK: '#7f1d1d',
  DORMANT: '#7f1d1d',
  CHURNED: '#7f1d1d',
}
const LIFECYCLE_ORDER = ['NEW', 'ACTIVE', 'GROWING', 'AT_RISK', 'DORMANT', 'CHURNED']

// Inline StatePill (the previously-imported StateBadge component no longer exists)
const StatePill = defineComponent({
  props: { state: { type: String, default: '—' }, size: { type: String, default: 'md' } },
  setup(props) {
    return () => h('span', {
      class: [
        'inline-flex items-center rounded-full font-bold uppercase tracking-wide',
        props.size === 'lg' ? 'px-4 py-1.5 text-xs' : 'px-2.5 py-0.5 text-[11px]',
      ],
      style: {
        background: '#ffffff',
        color: STATE_COLORS[props.state] || '#7f1d1d',
        border: '1px solid #e5e7eb',
      },
    }, (props.state || '—').replace('_', ' '))
  },
})

// Inline info tooltip (title attribute)
const InfoDot = defineComponent({
  props: { label: { type: String, default: '' } },
  setup(props) {
    return () => h('span', { class: 'text-gray-500 cursor-help', title: props.label }, h('svg', {
      class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24',
    }, [h('circle', { cx: '12', cy: '12', r: '9', 'stroke-width': '2' }), h('path', { d: 'M12 16v-4m0-4h.01', 'stroke-linecap': 'round', 'stroke-width': '2' })]))
  },
})

const loading = ref(true)
const showCampaignModal = ref(false)
const showOverrideDialog = ref(false)
const showMoreMenu = ref(false)
const overrideReason = ref('')
const overrideOffer = ref('Fee Waiver (3 months)')
const reasonCodes = ref([])
const recommendations = ref([])

const customerId = computed(() => String(route.params.id || ''))
const isEmpty = computed(() => !loading.value && !customerStore.selectedCustomer)

const customer = computed(() => customerStore.selectedCustomer || {})

const state = computed(() => customer.value.state || customer.value._raw?.state || '—')
const previousState = computed(() => customer.value.previousState || customer.value._raw?.previous_state || null)

const healthScore = computed(() => {
  const h = predictionStore.healthScores[customerId.value]
  if (h?.health_score != null) return h.health_score
  return customer.value.healthScore ?? null
})

const components = computed(() => {
  const h = predictionStore.healthScores[customerId.value]
  const c = customer.value._raw?.component_scores
  return h?.component_scores || c || {}
})

const churnProb = computed(() => {
  const p = predictionStore.predictions[customerId.value]
  return typeof p === 'number' ? p : p?.churn_probability ?? null
})

const clvPercentile = computed(() => {
  const p = predictionStore.predictions[customerId.value]
  return typeof p === 'object' ? p?.clv_percentile ?? null : null
})

const featureSnapshot = computed(() => customerStore.features)

const healthLabel = computed(() => {
  const s = healthScore.value
  if (s == null) return '—'
  if (s < 25) return 'Critical'
  if (s < 50) return 'At Risk'
  if (s < 70) return 'Moderate'
  return 'Healthy'
})

const healthColor = computed(() => {
  const s = healthScore.value
  if (s == null) return '#857371'
  if (s < 25) return '#7f1d1d'
  if (s < 50) return '#7f1d1d'
  if (s < 70) return '#16a34a'
  return '#16a34a'
})

const churnLabel = computed(() => {
  const p = churnProb.value
  if (p == null) return '—'
  if (p < 0.2) return 'Low Risk'
  if (p < 0.5) return 'Moderate Risk'
  return 'High Risk'
})

const churnColor = computed(() => {
  const p = churnProb.value
  if (p == null) return '#857371'
  if (p < 0.2) return '#16a34a'
  if (p < 0.5) return '#16a34a'
  return '#7f1d1d'
})

const timelineEntries = computed(() => {
  const raw = customerStore.timeline
  if (Array.isArray(raw)) return raw
  return raw?.timeline || []
})

const transitions = computed(() => {
  const raw = customerStore.timeline
  if (Array.isArray(raw)) return []
  return raw?.transitions || []
})

const customerSince = computed(() => {
  const entries = timelineEntries.value
  if (!entries.length) return null
  const sorted = [...entries].sort((a, b) => new Date(a.as_of_date) - new Date(b.as_of_date))
  return fmtDate(sorted[0].as_of_date)
})

const stateSince = computed(() => {
  const entries = timelineEntries.value
  if (!entries.length) return null
  // Most recent entry date for the current state
  const current = entries.filter(e => e.state === state.value)
  if (current.length) return fmtDate(current[current.length - 1].as_of_date)
  return fmtDate(entries[entries.length - 1].as_of_date)
})

const computedAt = computed(() => {
  const raw = customer.value._raw?.computed_at || customer.value.computedAt
  if (!raw) return null
  try { return new Date(raw).toLocaleString() } catch { return raw }
})

const lastActivity = computed(() => {
  const f = featureSnapshot.value
  if (f?.days_since_last_txn != null) return `${f.days_since_last_txn} days ago`
  // Fall back to a reason code detail if present
  const rc = reasonCodes.value.find(r => r.code === 'INACTIVE_EXTENDED')
  if (rc?.detail?.days_since_last_txn != null) return `${rc.detail.days_since_last_txn} days ago`
  return '—'
})

const statePct = computed(() => {
  const p = customerStore.portfolio
  const map = { DORMANT: p.dormantPct, AT_RISK: p.atRiskPct, CHURNED: p.churnedPct, ACTIVE: p.activePct }
  return map[state.value] != null ? map[state.value] : null
})

const currentStateIndex = computed(() => LIFECYCLE_ORDER.indexOf(state.value))

const markovStates = computed(() => predictionStore.markovMatrix?.states || [])
const markovMatrix = computed(() => predictionStore.markovMatrix?.matrix || [])

const predictedNextState = computed(() => {
  const states = markovStates.value
  const matrix = markovMatrix.value
  const idx = states.indexOf(state.value)
  if (idx < 0 || !matrix[idx] || !matrix[idx].length) return null
  const row = matrix[idx]
  const maxVal = Math.max(...row)
  const maxIdx = row.indexOf(maxVal)
  return { state: states[maxIdx] || '—', probability: maxVal }
})

const healthFactors = computed(() => {
  const c = components.value
  return [
    { key: 'churn_risk_sub', label: 'Churn Risk', good: false, value: c.churn_risk_sub ?? null },
    { key: 'clv_percentile_sub', label: 'Customer Value (CLV)', good: true, value: c.clv_percentile_sub ?? null },
    { key: 'behaviour_sub', label: 'Behavioural Engagement', good: true, value: c.behaviour_sub ?? null },
  ]
})

const behaviourFactors = computed(() => {
  const f = featureSnapshot.value || {}
  return [
    { label: 'Recency', unit: 'days', evidence: f.days_since_last_txn != null ? `${f.days_since_last_txn} days since last transaction` : null, value: f.days_since_last_txn, max: 180, invert: true },
    { label: 'Transaction Frequency (90d)', unit: 'txns', evidence: f.txn_count_90d != null ? `${f.txn_count_90d} transactions in last 90 days` : null, value: f.txn_count_90d, max: 30, invert: false },
    { label: 'Transaction Frequency (180d)', unit: 'txns', evidence: f.txn_count_180d != null ? `${f.txn_count_180d} transactions in last 180 days` : null, value: f.txn_count_180d, max: 60, invert: false },
    { label: 'Total Value (90d)', unit: 'ZMW', evidence: f.total_amount_90d != null ? `${Math.round(f.total_amount_90d).toLocaleString()} ZMW in last 90 days` : null, value: f.total_amount_90d, max: 500000, invert: false },
    { label: 'Engagement Score', unit: 'pts', evidence: f.engagement_score != null ? `Engagement ${f.engagement_score} / 100` : null, value: f.engagement_score, max: 100, invert: false },
    { label: 'Distinct Channels (90d)', unit: 'channels', evidence: f.distinct_channels_90d != null ? `${f.distinct_channels_90d} channels used` : null, value: f.distinct_channels_90d, max: 6, invert: false },
  ]
})

const riskCodes = computed(() => reasonCodes.value.filter(r => r.category === 'RISK'))
const opportunityCodes = computed(() => reasonCodes.value.filter(r => r.category === 'OPPORTUNITY'))
const alertCodes = computed(() => reasonCodes.value.filter(r => r.severity === 'HIGH'))

const clvEvidence = computed(() => {
  const f = featureSnapshot.value || {}
  const parts = []
  if (f.total_amount_90d != null) parts.push(`90-day value: ${Math.round(f.total_amount_90d).toLocaleString()} ZMW`)
  if (f.avg_amount_90d != null) parts.push(`Avg transaction: ${Math.round(f.avg_amount_90d).toLocaleString()} ZMW`)
  if (f.txn_count_90d != null) parts.push(`${f.txn_count_90d} txns / 90d`)
  if (f.has_salary_credit != null && f.has_salary_credit) parts.push('Salary credit detected')
  if (f.customer_tenure_days != null) parts.push(`Tenure: ${Math.round(f.customer_tenure_days / 30)} months`)
  return parts
})

const actionPlan = computed(() => {
  const recs = recommendations.value
  if (recs.length) {
    return recs.map((r, i) => ({
      priority: i + 1,
      title: r.product_name || r.campaign_name || 'Review Required',
      reason: r.campaign_name ? `Campaign: ${r.campaign_name}` : 'Identified opportunity',
      action: r.is_upsell ? `Upsell to ${r.product_name}` : `Offer ${r.product_name || 'a suitable product'}`,
      confidence: Math.round((r.propensity_score || 0) * 100),
    }))
  }
  // Fallback actions derived from the customer's actual state
  const fallback = []
  if (state.value === 'DORMANT') fallback.push({ priority: 1, title: 'Re-engage Customer', reason: 'Customer has been inactive for an extended period.', action: 'Contact the customer and identify the reason for inactivity.', confidence: 0 })
  if (state.value === 'AT_RISK') fallback.push({ priority: 1, title: 'Retain Customer', reason: 'Customer is showing early signs of disengagement.', action: 'Assign account manager for proactive follow-up.', confidence: 0 })
  if (clvPercentile.value != null && clvPercentile.value > 0.6) fallback.push({ priority: fallback.length + 1, title: 'Review Customer Value', reason: 'Customer historically generated significant value.', action: 'Assign account manager for proactive follow-up.', confidence: 0 })
  return fallback
})

const modelVersion = computed(() => {
  const h = predictionStore.healthScores[customerId.value]
  return h?.model_versions?.churn || predictionStore.predictions[customerId.value]?.model_version || 'churn_v1'
})

const modelConfidence = computed(() => {
  const c = dataCompleteness.value
  if (!c) return '—'
  return Math.round(c.populated / c.total * 100) + '%'
})

const dataCompleteness = computed(() => {
  const f = featureSnapshot.value
  if (!f || typeof f !== 'object') return null
  const keys = Object.keys(f).filter(k => !['customer_id', 'as_of_date', 'computed_at'].includes(k))
  const populated = keys.filter(k => f[k] != null && f[k] !== '').length
  return { populated, total: keys.length }
})

const dataUsed = computed(() => {
  const f = featureSnapshot.value || {}
  const groups = [
    { name: 'Transactions', fields: ['txn_count_30d', 'txn_count_90d', 'txn_count_180d', 'txn_count_365d', 'avg_days_between_txn'] },
    { name: 'Revenue', fields: ['total_amount_90d', 'avg_amount_90d', 'total_amount_180d', 'amount_growth_ratio', 'credit_sum_30d', 'debit_sum_30d'] },
    { name: 'Recency', fields: ['days_since_last_txn', 'days_since_first_txn', 'inactivity_streak_days', 'behav_recency_score'] },
    { name: 'Engagement', fields: ['engagement_score', 'eng_login_count_30d', 'eng_login_count_7d', 'behav_active_days_90d', 'behav_activity_consistency'] },
    { name: 'Purchase frequency', fields: ['behav_txn_count_7d', 'behav_frequency_score', 'txn_frequency_trend'] },
    { name: 'Customer tenure', fields: ['customer_tenure_days', 'customer_segment', 'age_years'] },
    { name: 'Payment history', fields: ['has_salary_credit', 'monthly_income_estimate', 'credit_to_debit_ratio_90d', 'fin_salary_consistency'] },
    { name: 'Lifecycle history', fields: ['rel_customer_status'] },
  ]
  return groups.map(g => {
    const populated = g.fields.filter(k => f[k] != null && f[k] !== '').length
    return { name: g.name, available: `${populated} of ${g.fields.length} data points available` }
  })
})

const initials = computed(() => {
  const name = customer.value.fullName || customerId.value
  return name.replace('CUST', 'C').replace('Customer ', '').slice(0, 2).toUpperCase() || 'CU'
})

function severityColor(sev) {
  if (sev === 'HIGH') return '#7f1d1d'
  if (sev === 'MEDIUM') return '#16a34a'
  return '#16a34a'
}

function codeLabel(code) {
  return String(code || '').replace(/_/g, ' ')
}

function detailText(detail) {
  if (!detail || !Object.keys(detail).length) return ''
  return Object.entries(detail)
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}`)
    .join(' · ')
}

function fmtDate(d) {
  if (!d) return '—'
  try { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return d }
}

function behaviourBarWidth(b) {
  if (b.value == null) return 0
  if (b.invert) {
    // Recency: lower (more recent) is better → invert the bar
    const pct = Math.max(0, 100 - (b.value / b.max) * 100)
    return Math.min(100, pct)
  }
  return Math.min(100, (b.value / b.max) * 100)
}

function goBack() {
  if (route.query.from === 'ledger') {
    router.push({ path: '/dashboard/portfolio', query: { page: route.query.page || 1 } })
  } else {
    router.back()
  }
}

function goToActionPlan() {
  router.push({
    path: `/dashboard/customer/${customerId.value}/action-plan`,
    query: { from: route.query.from || undefined, page: route.query.page || undefined },
  })
}

function goToTakeAction(a) {
  router.push({
    path: `/dashboard/customer/${customerId.value}/take-action`,
    query: {
      action: JSON.stringify(a),
      from: route.query.from || undefined,
      page: route.query.page || undefined,
    },
  })
}

function exportProfile() {
  const payload = {
    customer_id: customerId.value,
    name: customer.value.fullName || null,
    state: state.value,
    health_score: healthScore.value,
    churn_probability: churnProb.value,
    clv_percentile: clvPercentile.value,
    reason_codes: reasonCodes.value,
    recommendations: recommendations.value,
    features: featureSnapshot.value || {},
    exported_at: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${customerId.value || 'customer'}-profile.json`
  a.click()
  URL.revokeObjectURL(url)
  notify(`Profile exported for ${customerId.value}`, 'success', { autoClose: 2500 })
  showMoreMenu.value = false
}

async function copyCustomerId() {
  try {
    await navigator.clipboard.writeText(customerId.value)
    notify(`Customer ID ${customerId.value} copied`, 'success', { autoClose: 2000 })
  } catch {
    notify('Could not copy — clipboard unavailable', 'error', { autoClose: 2500 })
  }
  showMoreMenu.value = false
}

// ── Override dialog ──────────────────────────────────────────────────────────
const overrideOptions = [
  'Fee Waiver (3 months)',
  'Rate Review on Home Loan',
  'Digital Reactivation SMS',
  'RM Courtesy Call',
  'No Action — Escalate to Branch',
]

const activeOverride = ref(null)

function openOverrideDialog() {
  showOverrideDialog.value = true
  showMoreMenu.value = false
}

function doOverride() {
  if (!overrideReason.value.trim()) {
    notify('Please add a reason for the override', 'error', { autoClose: 2500 })
    return
  }
  activeOverride.value = overrideRecommendation(customerId.value, 'AI Prescribed Intervention', overrideOffer.value, overrideReason.value.trim())
  showOverrideDialog.value = false
  overrideReason.value = ''
  notify(`Override applied — ${overrideOffer.value}`, 'success', { autoClose: 3000 })
}

function resetOverride() {
  activeOverride.value = null
  showOverrideDialog.value = false
  overrideReason.value = ''
  notify('Override removed — AI recommendation restored', 'info', { autoClose: 2500 })
}

onMounted(async () => {
  loading.value = true
  const id = customerId.value
  if (!id) { loading.value = false; return }

  // Pull any server-persisted state first (other pilot viewers / browsers),
  // then rehydrate a prior override for this customer, if any.
  await hydrateStateFromServer(id)
  activeOverride.value = getOverride(id)

  await Promise.allSettled([
    customerStore.fetchCustomerDetail(id),
    customerStore.fetchCustomerTimeline(id),
    customerStore.fetchPortfolio(),
  ])
  await Promise.allSettled([
    customerStore.fetchCustomerFeatures(id),
    predictionStore.fetchPrediction(id),
    predictionStore.fetchHealthScore(id),
    predictionStore.fetchMarkovMatrix(),
  ])
  loading.value = false

  // Background: structured reason codes + recommendations
  await Promise.allSettled([
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/insights/reason-codes/${id}`, { params: { as_of_date: DEFAULT_AS_OF_DATE }, timeout: 30000 })
        reasonCodes.value = data.reason_codes || []
      } catch (e) { console.warn('reason-codes failed:', e.message); reasonCodes.value = [] }
    })(),
    (async () => {
      try {
        const { data } = await api.get(`/api/v1/recommendations/${id}`, { params: { as_of_date: DEFAULT_AS_OF_DATE }, timeout: 30000 })
        recommendations.value = data.recommendations || []
      } catch (e) { console.warn('recommendations failed:', e.message); recommendations.value = [] }
    })(),
  ])
})
</script>




