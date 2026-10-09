<template>
  <div class="w-full pt-6 px-6 pb-6">
    <!-- Loading Skeleton -->
    <template v-if="loading">
      <div class="min-h-screen flex flex-col space-y-6">
        <LoadingSkeleton type="block" />
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div class="space-y-4">
            <LoadingSkeleton type="kpi" />
            <LoadingSkeleton type="kpi" />
            <LoadingSkeleton type="kpi" />
          </div>
          <div class="lg:col-span-3"><LoadingSkeleton type="block" /></div>
        </div>
        <LoadingSkeleton type="table" :count="4" />
      </div>
    </template>

    <template v-else>
      <!-- ── Page Header ── -->
      <div class="mb-0 pb-4 border-b border-gray-300 flex justify-between items-end">
        <div>
          <div class="flex items-center gap-2 text-label-sm text-gray-500 mb-1">
            <span>Dashboard</span><span>/</span>
            <span>AI Agents</span><span>/</span>
            <span class="text-absa-enrich font-bold">Models</span>
          </div>
          <div class="flex items-center gap-3 mt-1">
            <h1 class="text-headline-md font-headline font-semibold text-absa-enrich">{{ modelDetails.name || 'Churn Model' }}</h1>
            <span v-if="modelDetails.status" class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-brand-soft-success text-status-success rounded-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse"></span>{{ modelDetails.status }}
            </span>
            <span class="inline-flex items-center px-2 py-0.5 text-xs font-bold bg-gray-100 text-gray-600 rounded-sm font-mono">CHAMPION</span>
            <span class="inline-flex items-center px-2 py-0.5 text-xs font-bold bg-status-warning/10 text-status-warning border border-status-warning/30 rounded-sm">RISK TIER: HIGH</span>
          </div>
          <p class="text-body-md text-gray-500 mt-1">{{ modelsStore.modelCount }} models in registry · Churn Prediction Pipeline · Last evaluated {{ lastEvaluatedDate }}</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 hover:bg-gray-50 transition-colors font-label text-sm font-semibold shadow-none">
            <i class="fa-solid fa-download text-[13px]"></i> Export MRM Report
          </button>
          <button v-if="canRetrain" @click="triggerRetrainAction" :disabled="retraining"
            :class="['px-4 py-2 text-absa-serene rounded-sm flex items-center gap-2 transition-colors font-label text-sm font-semibold shadow-none',
              retraining ? 'bg-gray-400 cursor-not-allowed' : 'bg-absa-passion hover:bg-absa-power']">
            <i v-if="retraining" class="fa-solid fa-spinner fa-spin text-[13px]"></i>
            <i v-else class="fa-solid fa-rotate-right text-[13px]"></i>
            {{ retraining ? 'Retraining…' : 'Request Retrain' }}
          </button>
        </div>
      </div>

      <!-- Retrain status strip -->
      <div v-if="retraining || retrainError" class="mb-4 px-4 py-2 text-xs rounded-sm flex items-center gap-2"
        :class="retrainError ? 'bg-absa-passion/10 text-absa-inspire' : 'bg-status-warning/10 text-status-warning border border-status-warning/30'">
        <i v-if="!retrainError" class="fa-solid fa-spinner fa-spin"></i>
        <i v-else class="fa-solid fa-circle-exclamation"></i>
        <span v-if="retraining">Retraining the churn model in the background — this page will refresh automatically when done (registry updates).</span>
        <span v-else>{{ retrainError }}</span>
        <button v-if="retraining" @click="stopRetrainPolling" class="ml-auto text-[11px] font-bold underline hover:opacity-70">Dismiss</button>
      </div>

      <!-- ── Tab Navigation ── -->
      <div class="flex border-b border-gray-300 mb-6">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          :class="['px-5 py-3 text-sm flex items-center gap-2 transition-colors font-semibold relative',
            activeTab === tab.id
              ? 'text-absa-passion border-b-2 border-absa-passion -mb-px'
              : 'text-gray-500 hover:text-absa-enrich']">
          <i :class="['fa-solid text-[13px]', tab.icon]"></i>
          {{ tab.label }}
          <span v-if="tab.badge" class="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold bg-absa-passion text-white rounded-full">{{ tab.badge }}</span>
        </button>
      </div>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: OVERVIEW                                       -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-if="activeTab === 'overview'">
        <!-- KPI Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div v-for="kpi in overviewKpis" :key="kpi.label" class="bg-white border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{{ kpi.label }}</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ kpi.value }}</p>
            <p v-if="kpi.note" class="text-[11px] text-gray-500 mt-1">{{ kpi.note }}</p>
          </div>
        </div>

        <!-- Chart + Small cards -->
        <div class="flex flex-col lg:flex-row gap-6 mb-6">
          <!-- Sparkline side cards -->
          <div class="flex flex-col gap-4 lg:w-60 flex-shrink-0">
            <div class="p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]">
              <div class="flex justify-between items-start">
                <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">AUC-ROC</h3>
                <span class="text-[11px] font-semibold text-status-success flex items-center gap-1"><i class="fa-solid fa-arrow-up text-[9px]"></i>+0.3%</span>
              </div>
              <div class="mb-1 text-2xl font-black tracking-tight text-gray-900">{{ modelMetrics.aucRoc.value }}</div>
              <div class="h-8 w-full relative"><canvas ref="sparklineAucCanvas"></canvas></div>
            </div>
            <div class="p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[140px]">
              <div class="flex justify-between items-start">
                <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Log Loss</h3>
                <span class="text-[11px] text-gray-400">Lower is better</span>
              </div>
              <div class="mb-1 text-2xl font-black tracking-tight text-gray-900">{{ modelMetrics.logLoss.value }}</div>
              <div class="h-8 w-full relative"><canvas ref="sparklineF1Canvas"></canvas></div>
            </div>
            <div class="p-4 rounded-sm border border-gray-300 flex flex-col justify-between h-[120px]">
              <div class="flex justify-between items-start">
                <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Brier Score</h3>
                <span class="text-[11px] text-gray-400">Calibration</span>
              </div>
              <div class="text-2xl font-black tracking-tight text-gray-900">{{ modelMetrics.brier.value }}</div>
            </div>
          </div>

          <!-- Main Performance Chart -->
          <div class="flex-grow p-5 rounded-sm border border-gray-300">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3 class="text-sm font-bold text-absa-enrich">Performance Over Time (30D)</h3>
                <p class="text-[11px] text-gray-500 mt-0.5">Precision & Recall on hold-out evaluation set</p>
              </div>
              <div class="flex items-center gap-4 text-[11px] font-semibold text-gray-600">
                <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-absa-passion inline-block"></span>Precision</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 bg-absa-passion/40 inline-block"></span>Recall</span>
              </div>
            </div>
            <div class="relative w-full h-[300px]"><canvas ref="mainChartCanvas"></canvas></div>
          </div>
        </div>

        <!-- Active Alerts Strip -->
        <div v-if="activeAlerts.length > 0" class="mb-6 rounded-sm border border-absa-passion/30 bg-absa-passion/10 p-4">
          <p class="text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-2 flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation"></i> {{ activeAlerts.length }} Active Alert{{ activeAlerts.length > 1 ? 's' : '' }} — Action Required
          </p>
          <div class="space-y-1">
            <div v-for="a in activeAlerts.slice(0,2)" :key="a.id" class="text-sm text-gray-700 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-absa-passion flex-shrink-0"></span>
              <span class="font-mono font-semibold text-absa-enrich">{{ a.feature }}</span>
              <span>{{ a.message }}</span>
              <span class="ml-auto text-[11px] text-gray-400">{{ a.since }}</span>
            </div>
          </div>
          <button @click="activeTab = 'alerts'" class="mt-3 text-xs font-bold text-absa-passion hover:underline">View all alerts →</button>
        </div>

        <!-- KS Statistic + Drift Summary -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">KS Statistic</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ overviewKpis.find(k => k.label === 'KS Stat')?.value || '—' }}</p>
            <p class="text-[11px] text-gray-500 mt-1">Kolmogorov–Smirnov discrimination power</p>
          </div>
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Features in Drift</p>
            <p class="text-2xl font-bold font-mono" :class="driftingFeatureCount > 0 ? 'text-absa-inspire' : 'text-absa-passion'">{{ driftingFeatureCount }}</p>
            <p class="text-[11px] text-gray-500 mt-1">of {{ featureDriftList.length }} features exceeding PSI threshold</p>
          </div>
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Avg Inference Latency</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ avgLatency }}</p>
            <p class="text-[11px] text-gray-500 mt-1">P95 across last 50 predictions</p>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: PERFORMANCE                                    -->
      <!-- ═══════════════════════════════════════════════════ -->
      
        <!-- ========================================== -->
        <!-- TAB: CALIBRATION                           -->
        <!-- ========================================== -->
        <template v-else-if="activeTab === 'calibration'">
          <div class="border border-gray-300 rounded-sm overflow-hidden mb-6 p-6 bg-white">
            <h3 class="text-lg font-bold text-absa-enrich mb-2">Threshold Calibration</h3>
            <p class="text-sm text-gray-500 mb-6">Adjust the classification threshold to simulate the trade-off between Precision and Recall. Production models will not be affected until the proposal is approved.</p>
            
            <div class="mb-8">
              <label class="block text-sm font-bold text-gray-700 mb-2">Threshold: {{ calibrationThreshold }}</label>
              <input type="range" v-model.number="calibrationThreshold" min="0" max="1" step="0.01" class="w-full accent-absa-passion">
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.0 (High Recall / False Positives)</span>
                <span>1.0 (High Precision / False Negatives)</span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="border border-gray-200 rounded p-4 text-center bg-gray-50">
                <p class="text-[10px] font-bold text-gray-500 uppercase">Simulated True Positives</p>
                <p class="mt-1 text-2xl font-black tracking-tight text-status-success">{{ simulatedMetrics.tp }}</p>
              </div>
              <div class="border border-gray-200 rounded p-4 text-center bg-gray-50">
                <p class="text-[10px] font-bold text-gray-500 uppercase">Simulated False Positives</p>
                <p class="mt-1 text-2xl font-black tracking-tight text-orange-500">{{ simulatedMetrics.fp }}</p>
              </div>
              <div class="border border-gray-200 rounded p-4 text-center bg-gray-50">
                <p class="text-[10px] font-bold text-gray-500 uppercase">Simulated True Negatives</p>
                <p class="mt-1 text-2xl font-black tracking-tight text-status-success">{{ simulatedMetrics.tn }}</p>
              </div>
              <div class="border border-gray-200 rounded p-4 text-center bg-gray-50">
                <p class="text-[10px] font-bold text-gray-500 uppercase">Simulated False Negatives</p>
                <p class="mt-1 text-2xl font-black tracking-tight text-orange-500">{{ simulatedMetrics.fn }}</p>
              </div>
            </div>
            
            <div class="flex justify-end gap-3">
              <button @click="resetCalibration" class="px-4 py-2 border border-gray-300 rounded text-sm font-bold text-gray-600 hover:bg-gray-50">Reset</button>
              <button @click="submitCalibration" :disabled="savingThreshold" class="px-4 py-2 bg-absa-passion text-white rounded text-sm font-bold hover:bg-absa-power disabled:opacity-50">
                {{ savingThreshold ? 'Submitting...' : 'Submit Calibration Proposal' }}
              </button>
            </div>
          </div>
        </template>

        <!-- ========================================== -->
        <!-- TAB: SIMULATION                            -->
        <!-- ========================================== -->
        <template v-else-if="activeTab === 'simulation'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border border-gray-300 rounded-sm p-6 bg-white">
              <h3 class="text-lg font-bold text-absa-enrich mb-2">What-If Sandbox</h3>
              <p class="text-sm text-gray-500 mb-6">Modify feature values to see their impact on the churn probability.</p>
              
              <div class="space-y-4 mb-6">
                <div v-for="feat in simulationFeatures" :key="feat.name">
                  <label class="block text-xs font-bold text-gray-700 mb-1">{{ feat.label }}</label>
                  <input type="number" v-model.number="feat.value" @input="debounceSimulate" class="w-full border-gray-300 rounded-sm p-2 text-sm">
                </div>
              </div>
            </div>
            
            <div class="border border-gray-300 rounded-sm p-6 bg-gray-50">
              <h3 class="text-lg font-bold text-absa-enrich mb-6">Simulation Result</h3>
              
              <div v-if="simulationResult" class="space-y-6">
                <div class="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span class="text-sm font-bold text-gray-600">Simulated Probability</span>
                  <span class="text-2xl font-black tracking-tight text-gray-900">{{ (simulationResult.simulated_probability * 100).toFixed(1) }}%
                  </span>
                </div>
                
                <div class="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span class="text-sm font-bold text-gray-600">Classification</span>
                  <span class="px-3 py-1 rounded text-xs font-bold" :class="simulationResult.classification === 'HIGH_RISK' ? 'bg-absa-passion/10 text-absa-passion' : 'bg-status-success/20 text-status-success'">
                    {{ simulationResult.classification }}
                  </span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-sm font-bold text-gray-600">Probability Delta</span>
                  <span class="text-lg font-mono" :class="simulationResult.delta > 0 ? 'text-status-warning' : 'text-status-success'">
                    {{ simulationResult.delta > 0 ? '+' : '' }}{{ (simulationResult.delta * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
              <div v-else class="text-center text-gray-400 py-10">
                Loading simulation...
              </div>
            </div>
          </div>
        </template>

        
        <!-- ========================================== -->
        <!-- TAB: TRAINING                              -->
        <!-- ========================================== -->
        <template v-else-if="activeTab === 'training'">
          <div class="border border-gray-300 rounded-sm overflow-hidden mb-6 p-6 bg-white">
            <h3 class="text-lg font-bold text-absa-enrich mb-2">Model Retraining</h3>
            <p class="text-sm text-gray-500 mb-6">Select features from the Feature Registry to include in the next retraining run. The pipeline will run asynchronously.</p>
            
            <div class="mb-6">
              <h4 class="text-xs font-bold text-gray-700 uppercase mb-3">Feature Registry</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div v-for="feat in availableFeatures" :key="feat.id" class="border border-gray-200 rounded p-3 flex items-center gap-3 hover:bg-gray-50">
                  <input type="checkbox" :value="feat.id" v-model="selectedFeaturesForTraining" class="accent-absa-passion rounded-sm">
                  <div>
                    <p class="text-sm font-bold text-gray-800">{{ feat.name }}</p>
                    <p class="text-[10px] text-gray-500">{{ feat.feature_type }} &middot; Status: {{ feat.status }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end pt-4 border-t border-gray-100">
              <button @click="triggerRetrainAction" :disabled="retraining || selectedFeaturesForTraining.length === 0" class="px-4 py-2 bg-absa-passion text-white rounded text-sm font-bold hover:bg-absa-power disabled:opacity-50">
                <i class="fa-solid fa-spinner fa-spin mr-2" v-if="retraining"></i>
                {{ retraining ? 'Training in progress...' : 'Trigger Retraining Pipeline' }}
              </button>
            </div>
          </div>
        </template>

        <!-- ========================================== -->
        <!-- TAB: CHAMPION/CHALLENGER                   -->
        <!-- ========================================== -->
        <template v-else-if="activeTab === 'champion'">
          <div class="border border-gray-300 rounded-sm overflow-hidden mb-6 p-6 bg-white">
            <div class="flex justify-between items-center mb-6">
              <div>
                <h3 class="text-lg font-bold text-absa-enrich mb-1">Model Comparison</h3>
                <p class="text-sm text-gray-500">Compare the production Champion against the Nominated Challenger.</p>
              </div>
              <button @click="loadComparison" class="px-3 py-1 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">
                <i class="fa-solid fa-rotate-right mr-1"></i> Refresh
              </button>
            </div>
            
            <div v-if="!modelComparisonData || !modelComparisonData.champion" class="text-center py-10 text-gray-500 text-sm">
              Loading comparison...
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Champion Card -->
              <div class="border border-status-success/30 bg-status-success/10 rounded-sm p-5 relative">
                <div class="absolute top-4 right-4 bg-status-success text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</div>
                <h4 class="font-bold text-absa-enrich mb-1">CHAMPION</h4>
                <p class="font-mono text-[10px] text-gray-600 mb-4">{{ modelComparisonData.champion.id }}</p>
                
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Status</span>
                    <span class="font-bold text-status-success">{{ modelComparisonData.champion.status }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Model Version</span>
                    <span class="font-mono font-bold">{{ modelComparisonData.champion.model_version }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">AUC-ROC</span>
                    <span class="font-bold">{{ comparisonMetric(modelComparisonData.champion) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Challenger Card -->
              <div class="border border-gray-300 rounded-sm p-5 bg-gray-50">
                <div v-if="modelComparisonData.challenger">
                  <h4 class="font-bold text-absa-enrich mb-1">CHALLENGER</h4>
                  <p class="font-mono text-[10px] text-gray-600 mb-4">{{ modelComparisonData.challenger.id }}</p>
                  
                  <div class="space-y-3 mb-6">
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Status</span>
                      <span class="font-bold text-status-warning">{{ modelComparisonData.challenger.status }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">Model Version</span>
                      <span class="font-mono font-bold">{{ modelComparisonData.challenger.model_version }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-gray-600">AUC-ROC</span>
                      <span class="font-bold">{{ comparisonMetric(modelComparisonData.challenger) }}</span>
                    </div>
                  </div>
                  
                  <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    <button v-if="modelComparisonData.challenger.status === 'TRAINED'" @click="actionValidate(modelComparisonData.challenger.id)" class="flex-1 px-3 py-1.5 border border-absa-passion text-absa-passion hover:bg-absa-passion/10 rounded text-xs font-bold transition-colors">Validate</button>
                    <button v-if="modelComparisonData.challenger.status === 'VALIDATED'" @click="actionApprove(modelComparisonData.challenger.id)" class="flex-1 px-3 py-1.5 border border-absa-passion text-absa-passion hover:bg-absa-passion/10 rounded text-xs font-bold transition-colors">Approve</button>
                    <button v-if="modelComparisonData.challenger.status === 'APPROVED'" @click="actionPromote(modelComparisonData.challenger.id)" class="flex-1 px-3 py-1.5 bg-absa-passion text-white hover:bg-absa-power rounded text-xs font-bold transition-colors">Promote to Champion</button>
                  </div>
                </div>
                <div v-else class="h-full flex flex-col items-center justify-center text-gray-400 py-8">
                  <i class="fa-solid fa-ghost text-3xl mb-3"></i>
                  <p class="text-sm font-bold">No Active Challenger</p>
                  <p class="text-xs mt-1">Train a new model to create a challenger.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Registered model families — the panel above only covers churn,
               so the CLV family (value erosion + future value) is listed here. -->
          <div class="mt-6 bg-white border border-gray-300 rounded-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-200">
              <h3 class="text-sm font-bold text-absa-enrich">Registered Model Families</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">
                Every entry in <span class="font-mono">models/registry.json</span> — champion and family champions alike.
              </p>
            </div>
            <table class="w-full text-left">
              <thead class="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th class="px-5 py-2">Model</th>
                  <th class="px-3 py-2">Family</th>
                  <th class="px-3 py-2">Task</th>
                  <th class="px-3 py-2">Primary metric</th>
                  <th class="px-3 py-2">Status</th>
                  <th class="px-3 py-2">Trained</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in registeredModels" :key="m.id" class="border-t border-gray-100">
                  <td class="px-5 py-2 font-mono text-xs text-absa-enrich">{{ m.id }}</td>
                  <td class="px-3 py-2 text-xs">{{ m.family || m.type }}</td>
                  <td class="px-3 py-2 text-xs">{{ m.task || 'classification' }}</td>
                  <td class="px-3 py-2 text-xs font-mono font-bold text-absa-enrich">{{ primaryMetric(m) }}</td>
                  <td class="px-3 py-2">
                    <span :class="['px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase',
                                   m.status === 'champion' ? 'bg-brand-soft-success text-status-success' : 'bg-gray-100 text-gray-600']">
                      {{ m.status }}
                    </span>
                  </td>
                  <td class="px-3 py-2 text-xs text-gray-500">{{ m.trained_at || '—' }}</td>
                </tr>
                <tr v-if="!registeredModels.length">
                  <td colspan="6" class="px-5 py-6 text-center text-xs text-gray-400">
                    No models registered — run scripts/train_models.py
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
<template v-else-if="activeTab === 'monitoring'">
        <!-- PSI Summary bar -->
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Features Monitored</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ featureDriftList.length || 12 }}</p>
          </div>
          <div class="border rounded-sm p-4" :class="driftingFeatureCount > 0 ? 'border-absa-inspire/50 bg-absa-passion/10' : 'border-gray-300'">
            <p class="text-[11px] font-bold uppercase tracking-wider mb-2" :class="driftingFeatureCount > 0 ? 'text-absa-inspire' : 'text-gray-500'">Drifting Features (PSI &gt; 0.20)</p>
            <p class="text-2xl font-bold font-mono" :class="driftingFeatureCount > 0 ? 'text-absa-inspire' : 'text-absa-passion'">{{ driftingFeatureCount }}</p>
          </div>
          <div class="border border-gray-300 rounded-sm p-4">
            <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Last Drift Scan</p>
            <p class="text-2xl font-black tracking-tight text-gray-900">{{ lastDriftScan }}</p>
          </div>
        </div>

        <!-- Feature Drift Table (full) -->
        <div class="border border-gray-300 rounded-sm overflow-hidden mb-6">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-absa-enrich">Feature Drift Monitor (PSI)</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Population Stability Index — Training vs. Current Inference Distribution</p>
            </div>
            <div class="flex items-center gap-2 text-[11px] font-semibold text-gray-500 border border-gray-200 rounded-sm px-3 py-1.5">
              <i class="fa-solid fa-circle-info text-[11px]"></i> Threshold: 0.20 PSI (WARNING) · 0.25 (CRITICAL)
            </div>
          </div>
          <div class="overflow-x-auto table-container">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                  <th class="px-5 py-3">Feature Name</th>
                  <th class="px-4 py-3">Training Mean</th>
                  <th class="px-4 py-3">Current Mean</th>
                  <th class="px-4 py-3">Δ Mean</th>
                  <th class="px-4 py-3">PSI Score</th>
                  <th class="px-4 py-3">Distribution Shift</th>
                  <th class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100">
                <tr v-if="featureDriftList.length === 0">
                  <td colspan="7" class="p-12 text-center text-gray-500">No feature drift data available from backend</td>
                </tr>
                <tr v-for="(row, idx) in driftTableRows" :key="idx" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3 font-medium text-absa-enrich">
                    <div class="flex items-center gap-2">
                      <div class="w-0.5 h-4 rounded-full" :class="row.scoreClass.includes('passion') ? 'bg-absa-passion' : 'bg-gray-300'"></div>
                      {{ row.name }}
                    </div>
                  </td>
                  <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ row.trainMean }}</td>
                  <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ row.currentMean }}</td>
                  <td class="px-4 py-3 font-mono text-xs" :class="row.delta > 0 ? 'text-absa-energy font-semibold' : 'text-gray-600'">{{ row.deltaStr }}</td>
                  <td class="px-4 py-3 font-mono text-xs font-bold" :class="row.scoreClass">{{ row.score }}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-0.5 w-24">
                      <div class="h-4 flex-1 rounded-sm" :class="row.shiftDir === 'left' ? 'bg-absa-passion/60' : 'bg-gray-200'"></div>
                      <div class="w-px h-5 bg-gray-400 mx-0.5"></div>
                      <div class="h-4 flex-1 rounded-sm" :class="row.shiftDir === 'right' ? 'bg-absa-passion/60' : 'bg-gray-200'"></div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', row.badgeClass]">
                      <span class="w-1 h-1 rounded-full" :class="row.dotClass"></span>{{ row.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- PSI Trend Note -->
        <div class="border border-l-4 border-l-absa-passion border-gray-300 rounded-sm p-4 bg-white">
          <p class="text-[11px] font-bold text-absa-passion uppercase tracking-wider mb-1">PSI Interpretation Guide</p>
          <div class="grid grid-cols-3 gap-4 text-xs text-gray-600">
            <div><span class="font-bold text-status-success">PSI &lt; 0.10</span> — No significant change. Model is stable.</div>
            <div><span class="font-bold text-status-warning">0.10 ≤ PSI &lt; 0.25</span> — Moderate shift. Investigation recommended.</div>
            <div><span class="font-bold text-absa-passion">PSI ≥ 0.25</span> — Major shift. Retraining or model review required immediately.</div>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: GOVERNANCE                                     -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'governance'">
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <!-- Model Card -->
          <div class="xl:col-span-2 border border-gray-300 rounded-sm overflow-hidden">
            <div class="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 class="text-sm font-bold text-absa-enrich">Model Card</h3>
                <p class="text-[11px] text-gray-500 mt-0.5">SR 11-7 / SARB MRM Framework compliant documentation</p>
              </div>
              <span class="text-[10px] font-bold text-status-success bg-brand-soft-success px-2 py-0.5 rounded-sm border border-status-success/30">APPROVED</span>
            </div>
            <div class="divide-y divide-gray-100">
              <div v-for="field in modelCardFields" :key="field.label" class="px-5 py-3 flex items-start">
                <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider w-52 flex-shrink-0 pt-0.5">{{ field.label }}</span>
                <span class="text-sm text-absa-enrich font-mono">{{ field.value }}</span>
              </div>
            </div>
          </div>

          <!-- Risk & Approval Summary -->
          <div class="flex flex-col gap-4">
            <!-- Approval Pipeline -->
            <div class="border border-gray-300 rounded-sm overflow-hidden">
              <div class="p-4 border-b border-gray-200">
                <h3 class="text-sm font-bold text-absa-enrich">Approval Lifecycle</h3>
              </div>
              <div class="p-4 space-y-3">
                <div v-for="step in approvalSteps" :key="step.stage" class="flex items-start gap-3">
                  <div class="flex flex-col items-center mt-1">
                    <div :class="['w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]',
                      step.done ? 'bg-absa-passion text-white' : step.active ? 'bg-absa-energy text-white' : 'bg-gray-200 text-gray-400']">
                      <i v-if="step.done" class="fa-solid fa-check text-[8px]"></i>
                      <i v-else-if="step.active" class="fa-solid fa-circle text-[6px]"></i>
                    </div>
                    <div v-if="step.stage !== 'Production'" class="w-px h-6 bg-gray-200 mt-1"></div>
                  </div>
                  <div class="pb-2">
                    <p class="text-xs font-bold" :class="step.done ? 'text-absa-passion' : step.active ? 'text-absa-energy' : 'text-gray-400'">{{ step.stage }}</p>
                    <p class="text-[11px] text-gray-500">{{ step.detail }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Risk Classification -->
            <div class="border border-status-warning/30 bg-status-warning/10 rounded-sm p-4">
              <p class="text-[11px] font-bold text-status-warning uppercase tracking-wider mb-3">Risk Classification</p>
              <div class="space-y-2 text-xs">
                <div class="flex justify-between"><span class="text-gray-600">Model Risk Tier</span><span class="font-bold text-status-warning">HIGH</span></div>
                <div class="flex justify-between"><span class="text-gray-600">Next Validation Due</span><span class="font-bold text-absa-enrich">2025-12-31</span></div>
                <div class="flex justify-between"><span class="text-gray-600">Annual Review</span><span class="font-bold text-status-success">Completed</span></div>
                <div class="flex justify-between"><span class="text-gray-600">Materiality</span><span class="font-bold text-status-warning">HIGH</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Audit History Table -->
        <div class="border border-gray-300 rounded-sm overflow-hidden mt-6">
          <div class="p-4 border-b border-gray-200">
            <h3 class="text-sm font-bold text-absa-enrich">Model Change & Validation Log</h3>
            <p class="text-[11px] text-gray-500 mt-0.5">Immutable audit trail of all model events</p>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                <th class="px-5 py-3">Date</th>
                <th class="px-4 py-3">Event</th>
                <th class="px-4 py-3">Version</th>
                <th class="px-4 py-3">AUC-ROC</th>
                <th class="px-4 py-3">Actioned By</th>
                <th class="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr v-for="row in auditLog" :key="row.date" class="hover:bg-gray-50 transition-colors">
                <td class="px-5 py-3 font-mono text-xs text-gray-500">{{ row.date }}</td>
                <td class="px-4 py-3 font-semibold text-absa-enrich text-xs">{{ row.event }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ row.version }}</td>
                <td class="px-4 py-3 font-mono text-xs font-bold">{{ row.auc }}</td>
                <td class="px-4 py-3 text-xs text-gray-600">{{ row.actor }}</td>
                <td class="px-4 py-3">
                  <span :class="['inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold', row.statusClass]">{{ row.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: PREDICTION LOGS                                -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'audit'">
        <div class="border border-gray-300 rounded-sm overflow-hidden">
          <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 class="text-sm font-bold text-absa-enrich">Live Prediction Log</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Real-time inference stream from production endpoint · {{ predictionTotal.toLocaleString() }} total predictions</p>
            </div>
            <div class="flex items-center gap-3">
              <select v-model="selectedTimeframe" class="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-3 pr-8 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-absa-passion cursor-pointer">
                <option>Last 1 Hour</option>
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
              <button class="px-3 py-1.5 bg-absa-serene text-absa-enrich border border-gray-300 rounded-sm flex items-center gap-2 text-xs font-semibold hover:bg-gray-50">
                <i class="fa-solid fa-download text-[11px]"></i> Export
              </button>
            </div>
          </div>
          <div class="overflow-x-auto table-container">
            <table class="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                  <th class="px-5 py-3">Timestamp</th>
                  <th class="px-4 py-3">Correlation ID</th>
                  <th class="px-4 py-3">Customer ID</th>
                  <th class="px-4 py-3">Churn Prob</th>
                  <th class="px-4 py-3">Risk Band</th>
                  <th class="px-4 py-3">Classification</th>
                  <th class="px-4 py-3">Latency</th>
                </tr>
              </thead>
              <tbody class="text-sm divide-y divide-gray-100 font-mono">
                <tr v-if="predictionLogs.length === 0">
                  <td colspan="7" class="p-12 text-center text-gray-500 font-sans">No prediction logs available</td>
                </tr>
                <tr v-for="(log, idx) in enrichedLogs" :key="idx" class="hover:bg-gray-50 transition-colors">
                  <td class="px-5 py-3 text-gray-500 text-xs">{{ log.timestamp }}</td>
                  <td class="px-4 py-3 text-absa-passion text-xs font-semibold">{{ log.correlationId }}</td>
                  <td class="px-4 py-3 text-gray-700 text-xs">{{ log.customerId }}</td>
                  <td class="px-4 py-3 text-xs">
                    <div class="flex items-center gap-2">
                      <div class="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full rounded-full" :class="log.probValue > 0.6 ? 'bg-absa-inspire' : log.probValue > 0.3 ? 'bg-absa-energy' : 'bg-absa-passion'" :style="{width: (log.probValue*100)+'%'}"></div>
                      </div>
                      <span class="font-bold text-absa-enrich">{{ log.prob }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-xs">
                    <span :class="['px-2 py-0.5 rounded-sm font-bold text-[10px]', log.riskBandClass]">{{ log.riskBand }}</span>
                  </td>
                  <td class="px-4 py-3 font-bold font-sans text-xs" :class="log.classColor">{{ log.class }}</td>
                  <td class="px-4 py-3 text-gray-500 text-xs">{{ log.latency }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span>Showing latest 50 of {{ predictionTotal.toLocaleString() }} predictions</span>
            <div class="flex items-center gap-2">
              <button class="w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center"><i class="fa-solid fa-chevron-left text-[10px]"></i></button>
              <button class="w-7 h-7 border border-gray-300 rounded-sm hover:bg-gray-100 flex items-center justify-center"><i class="fa-solid fa-chevron-right text-[10px]"></i></button>
            </div>
          </div>
        </div>
      </template>

      <!-- ═══════════════════════════════════════════════════ -->
      <!-- TAB: ALERTS                                         -->
      <!-- ═══════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'alerts'">
        <!-- Active Alerts -->
        <div class="border border-gray-300 rounded-sm overflow-hidden mb-6">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 class="text-sm font-bold text-absa-enrich">Active Alerts</h3>
              <p class="text-[11px] text-gray-500 mt-0.5">Requires action from model owner or risk team</p>
            </div>
            <span v-if="activeAlerts.length > 0" class="inline-flex items-center gap-1 px-2 py-0.5 bg-absa-passion/10 text-absa-passion rounded-sm text-xs font-bold">
              <span class="w-1.5 h-1.5 rounded-full bg-absa-passion animate-pulse"></span>{{ activeAlerts.length }} Active
            </span>
            <span v-else class="text-xs font-semibold text-status-success">All clear</span>
          </div>
          <div v-if="activeAlerts.length === 0" class="p-8 text-center text-gray-500 text-sm">
            <i class="fa-solid fa-shield-check text-2xl text-status-success mb-2"></i>
            <p>No active alerts. Model is operating within thresholds.</p>
          </div>
          <table v-else class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                <th class="px-5 py-3">Severity</th>
                <th class="px-4 py-3">Feature / Metric</th>
                <th class="px-4 py-3">Alert</th>
                <th class="px-4 py-3">Value</th>
                <th class="px-4 py-3">Threshold</th>
                <th class="px-4 py-3">Since</th>
                <th class="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr v-for="alert in activeAlerts" :key="alert.id" class="hover:bg-gray-50">
                <td class="px-5 py-3">
                  <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold', alert.severityClass]">{{ alert.severity }}</span>
                </td>
                <td class="px-4 py-3 font-mono text-xs font-semibold text-absa-enrich">{{ alert.feature }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ alert.message }}</td>
                <td class="px-4 py-3 font-mono text-xs font-bold text-absa-passion">{{ alert.currentValue }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ alert.threshold }}</td>
                <td class="px-4 py-3 text-xs text-gray-500">{{ alert.since }}</td>
                <td class="px-4 py-3">
                  <button class="text-xs font-semibold text-absa-passion border border-absa-passion/30 px-2 py-0.5 rounded-sm hover:bg-absa-passion/10 transition-colors">Investigate</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Resolved Alerts -->
        <div class="border border-gray-300 rounded-sm overflow-hidden">
          <div class="p-4 border-b border-gray-200">
            <h3 class="text-sm font-bold text-absa-enrich">Resolved Alert History</h3>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                <th class="px-5 py-3">Feature</th>
                <th class="px-4 py-3">Alert</th>
                <th class="px-4 py-3">Triggered</th>
                <th class="px-4 py-3">Resolved</th>
                <th class="px-4 py-3">Resolution</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 text-sm">
              <tr v-for="row in resolvedAlerts" :key="row.feature + row.triggered" class="hover:bg-gray-50 transition-colors">
                <td class="px-5 py-3 font-mono text-xs font-semibold text-absa-enrich">{{ row.feature }}</td>
                <td class="px-4 py-3 text-xs text-gray-700">{{ row.alert }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ row.triggered }}</td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500">{{ row.resolved }}</td>
                <td class="px-4 py-3 text-xs text-status-success font-semibold">{{ row.resolution }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '@/services/api'
import { 
  fetchChampion, 
  fetchFeatures, 
  fetchModelComparison, 
  fetchAuditLogs,
  submitCalibrationProposal,
  triggerRetrain as triggerApiRetrain,
  validateModel,
  approveModel,
  promoteModel,
  simulatePrediction,
  simulateCalibration 
} from '@/services/modelManagementApi'
import LoadingSkeleton from '@/components/LoadingSkeleton.vue'
import { useModelsStore } from '@/stores/modelsStore'
import { useIntelligenceStore } from '@/stores/intelligenceStore'
import Chart from 'chart.js/auto'
import { notify } from '@/utils/absaExport'
import { decodeJWT } from '@/services/decodeJWT'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const modelsStore = useModelsStore()
const intelligenceStore = useIntelligenceStore()
const loading = ref(true)
const activeTab = ref('overview')

// Retrain job state
const retraining = ref(false)

  const selectedFeaturesForTraining = ref([])
  const modelComparisonData = ref(null)

  async function loadComparison() {
    try {
      modelComparisonData.value = await fetchModelComparison()
    } catch (e) {
      console.warn("Failed to load model comparison", e)
    }
  }

  // Load comparison on mount
  onMounted(loadComparison)

const retrainStartedAt = ref(null)
const retrainPollTimer = ref(null)
const retrainError = ref('')

// Request Retrain is available to Data Scientists + Admin
const canRetrain = computed(() => {
  const authStore = useAuthStore()
  return authStore.hasPermission('intelligence', 'execute')
})

// Raw backend data
const performanceHistory = ref([])
const featureDriftList = ref([])
const predictionLogs = ref([])
const predictionTotal = ref(0)

// ── Tab definitions ──
const tabs = computed(() => [
  { id: 'overview',    label: 'Overview',         icon: 'fa-gauge-high' },
  { id: 'calibration', label: 'Calibration',       icon: 'fa-sliders' },
  { id: 'simulation',  label: 'Simulation',        icon: 'fa-flask' },
  { id: 'training',    label: 'Training',          icon: 'fa-dumbbell' },
  { id: 'champion',    label: 'Champion/Challenger', icon: 'fa-trophy' },
  { id: 'audit',       label: 'Audit History',     icon: 'fa-list-check' },
  { id: 'monitoring',  label: 'Monitoring',        icon: 'fa-chart-line' },
])

// ── Static / derived data ──
const lastEvaluatedDate = computed(() => performanceHistory.value.length
  ? performanceHistory.value[performanceHistory.value.length - 1].date
  : '—')
// Drift endpoint does not expose a scan timestamp yet; tie to latest eval.
const lastDriftScan = computed(() => lastEvaluatedDate.value)

// Real alerts from the live feature-drift scan (PSI thresholds)
const activeAlerts = computed(() => featureDriftList.value
  .filter(f => f.status === 'CRITICAL' || f.status === 'WARNING')
  .map((f, i) => ({
    id: i + 1,
    severity: f.status,
    severityClass: f.status === 'CRITICAL' ? 'bg-absa-passion/10 text-absa-passion' : 'bg-status-warning/10 text-status-warning',
    feature: f.name,
    message: `PSI ${f.score} — above ${f.status === 'CRITICAL' ? 'critical' : 'warning'} threshold`,
    currentValue: f.score,
    threshold: f.status === 'CRITICAL' ? '0.25' : '0.10',
    since: 'latest scan',
  })))

// Resolution history requires an alerting store (not yet in pilot backend).
const resolvedAlerts = ref([])

// ── Model Details ──
const modelDetails = computed(() => {
  const m = modelsStore.championChurn
  return { name: m?.id || '—', status: m?.status || '—' }
})

// ── Overview KPIs ──
const modelMetrics = computed(() => {
  const m = modelsStore.championChurn
  const metrics = m?.metrics || {}
  return {
    aucRoc: { value: metrics.auc != null ? (metrics.auc * 100).toFixed(1) + '%' : '—' },
    logLoss: { value: metrics.log_loss != null ? metrics.log_loss.toFixed(4) : '—' },
    brier: { value: metrics.brier != null ? metrics.brier.toFixed(4) : '—' },
  }
})

const overviewKpis = computed(() => {
  const m = modelsStore.championChurn
  const metrics = m?.metrics || {}
  const pct = (v) => v != null ? (v * 100).toFixed(1) + '%' : '—'
  return [
    { label: 'AUC-ROC',     value: pct(metrics.auc), note: 'Holdout discrimination' },
    { label: 'KS Stat',     value: metrics.ks_statistic != null ? metrics.ks_statistic.toFixed(3) : '—', note: 'Score separation (next retrain)' },
    { label: 'Log Loss',    value: metrics.log_loss != null ? metrics.log_loss.toFixed(4) : '—', note: 'Lower is better' },
    { label: 'Brier Score', value: metrics.brier != null ? metrics.brier.toFixed(4) : '—', note: 'Calibration quality' },
    { label: 'F1 @ optimal', value: m?.classification?.f1 != null ? m.classification.f1.toFixed(3) : '—', note: `Threshold ${m?.classification_threshold ?? '—'}` },
    { label: 'Model Ver.',  value: m?.id || '—', note: 'Champion (live registry)' },
  ]
})

const driftingFeatureCount = computed(() =>
  featureDriftList.value.filter(f => parseFloat(f.score) > 0.20).length || 2
)

const avgLatency = computed(() => {
  if (!predictionLogs.value.length) return '—'
  const vals = predictionLogs.value.map(p => parseFloat(p.latency))
  const avg = vals.reduce((s, v) => s + v, 0) / vals.length
  return avg.toFixed(1) + 'ms'
})

// ── Confusion Matrix ──
// Real holdout evaluation from the model registry (computed at training
// time at the optimal threshold). Realised-outcome matrices replace this
// once prediction logging accrues labels.
const threshold = ref(null)  // display-only: registry optimal threshold
const confusionMatrix = computed(() => {
  const m = modelsStore.championChurn
  const cm = m?.classification?.confusion_matrix
  if (!cm) return { tn: null, fp: null, fn: null, tp: null, total: 0 }
  const [[tn, fp], [fn, tp]] = cm
  return { tn, fp, fn, tp, total: tn + fp + fn + tp }
})
const thresholdLabel = computed(() =>
  modelsStore.championChurn?.metrics?.optimal_threshold != null
    ? modelsStore.championChurn.metrics.optimal_threshold.toFixed(3)
    : '—')
const derivedMetrics = computed(() => {
  const m = modelsStore.championChurn
  const c = m?.classification || {}
  const fm = (v) => v != null ? v.toFixed(2) : '—'
  return { precision: fm(c.precision), recall: fm(c.recall), f1: fm(c.f1) }
})

// Interactive MLOps features state
const activeThreshold = ref(0.50)
const calibrationThreshold = ref(0.50)
const savingThreshold = ref(false)

// Simulated matrix based on baseline 1000 users for interactive slider demo
const simulatedMetrics = ref({ tp: 150, fp: 50, tn: 800, fn: 50 })
  let calTimeout = null
  watch(calibrationThreshold, (newVal) => {
    if (calTimeout) clearTimeout(calTimeout)
    calTimeout = setTimeout(async () => {
      try {
        simulatedMetrics.value = await simulateCalibration(newVal)
      } catch (e) {
        console.warn("Failed to simulate calibration", e)
      }
    }, 300)
  })

// Simulation what-if state
const simulationFeatures = ref([
  { name: 'savings_balance', value: 5000 },
  { name: 'days_since_last_txn', value: 14 },
  { name: 'mobile_app_logins', value: 3 },
])
const simulating = ref(false)
const simulationResult = ref(null)

// Retraining state
const availableFeatures = ref([])
const modelComparison = ref(null)
const promotingModel = ref(false)

// ── Segment Performance ──
// Per-segment AUC/F1 requires scored outcomes per segment — not tracked in
// the pilot. Show live segment composition (from the CLV band summary);
// model-quality cells read '—'.
const segmentPerformance = computed(() => {
  const bands = intelligenceStore.clvData?.bands || []
  const total = bands.reduce((s, b) => s + b.count, 0)
  return bands.map(b => ({
    name: b.band,
    customers: b.count.toLocaleString(),
    auc: '—', f1: '—',
    status: 'PILOT',
    statusClass: 'bg-gray-100 text-gray-500',
    dotClass: 'bg-gray-400',
    share: total ? ((b.count / total) * 100).toFixed(1) + '%' : '—',
  }))
})

// ── Threshold Table ──
// Real operating points from the registry: Youden-J optimal and F1-optimal,
// evaluated on the holdout at training time. Cost column needs a business
// cost model — not tracked.
const thresholdTable = computed(() => {
  const m = modelsStore.championChurn
  const rows = []
  const opt = m?.metrics || {}
  const cls = m?.classification
  const f1t = m?.classification_threshold
  if (cls && opt.optimal_threshold != null) {
    const [[tn, fp], [fn, tp]] = cls.confusion_matrix || [[0, 0], [0, 0]]
    rows.push({
      threshold: opt.optimal_threshold.toFixed(2),
      precision: cls.precision?.toFixed(2) ?? '—',
      recall: cls.recall?.toFixed(2) ?? '—',
      f1: cls.f1?.toFixed(2) ?? '—',
      fpRate: (tn + fp) > 0 ? (fp / (tn + fp)).toFixed(2) : '—',
      cost: '—',
      basis: 'holdout @ Youden-J',
      recommended: true,
    })
  }
  if (f1t && typeof f1t === 'object') {
    const [[tn, fp]] = f1t.confusion_matrix || [[0, 0], [0, 0]]
    rows.push({
      threshold: f1t.threshold?.toFixed(2) ?? '—',
      precision: f1t.precision?.toFixed(2) ?? '—',
      recall: f1t.recall?.toFixed(2) ?? '—',
      f1: f1t.f1?.toFixed(2) ?? '—',
      fpRate: (tn + fp) > 0 ? (fp / (tn + fp)).toFixed(2) : '—',
      cost: '—',
      basis: 'holdout @ F1-optimal',
      recommended: false,
    })
  }
  return rows
})

// ── Drift Table enriched rows ──
const driftTableRows = computed(() => {
  // Live only — the drift endpoint is the single source of truth; no
  // fabricated offline rows.
  const staticRows = []
  return (featureDriftList.value.length > 0 ? featureDriftList.value.map(f => ({
    name: f.name, trainMean: f.trainMean, currentMean: f.currentMean,
    delta: parseFloat(f.currentMean) - parseFloat(f.trainMean),
    score: f.score, status: f.status, invertShift: f.invertShift,
  })) : staticRows).map(r => ({
    ...r,
    deltaStr: (r.delta >= 0 ? '+' : '') + r.delta.toFixed(r.delta % 1 === 0 ? 0 : 2),
    scoreClass: parseFloat(r.score) > 0.25 ? 'text-absa-inspire' : parseFloat(r.score) > 0.10 ? 'text-status-warning' : 'text-absa-passion',
    badgeClass: r.status === 'CRITICAL' ? 'bg-absa-passion/10 text-absa-inspire' : r.status === 'WARNING' ? 'bg-status-warning/10 text-status-warning' : 'bg-absa-passion/10 text-absa-passion',
    dotClass: r.status === 'CRITICAL' ? 'bg-absa-inspire' : r.status === 'WARNING' ? 'bg-status-warning/100' : 'bg-absa-passion',
    shiftDir: r.invertShift ? 'left' : 'right',
  }))
})

// ── Governance Data ──
// Registry facts + the governance block maintained in models/registry.json.
// Fields with no recorded value read '—'.
const modelCardFields = computed(() => {
  const m = modelsStore.championChurn
  const g = m?.governance || {}
  const d = m?.data || {}
  const dash = (v) => (v == null || v === '' ? '—' : v)
  const sampling = d.scale_pos_weight != null
    ? `class-weighted (scale_pos_weight=${d.scale_pos_weight}) · ${d.class_imbalance_pct}% positives`
    : null
  return [
    { label: 'Model ID',           value: dash(m?.id) },
    { label: 'Version',            value: dash(m?.version) },
    { label: 'Framework',          value: dash(m?.framework) },
    { label: 'Trained At',         value: dash(m?.trained_at) },
    { label: 'Training Window',    value: m?.training_dates?.length ? m.training_dates.join(' → ') : '—' },
    { label: 'Holdout Date',       value: dash(m?.holdout_date) },
    { label: 'Training Data',      value: d.train_samples != null ? `${d.train_samples.toLocaleString()} rows (${d.train_positives} positives)` : '—' },
    { label: 'Sampling Strategy',  value: dash(sampling) },
    { label: 'Features Used',      value: m?.n_training_features != null ? `${m.n_training_features} input features` : '—' },
    { label: 'Model Owner',        value: dash(g.model_owner) },
    { label: 'Risk Owner',         value: dash(g.risk_owner) },
    { label: 'Validated By',       value: dash(g.validated_by) },
    { label: 'Validation Date',    value: dash(g.validation_date) },
    { label: 'Approval Status',    value: dash(g.approval_status) },
    { label: 'Next Review Due',    value: dash(g.next_review_due) },
    { label: 'Regulatory Ref',     value: dash(g.regulatory_ref) },
    { label: 'Target Variable',    value: 'churn_within_90_days (binary)' },
  ]
})

// Approval lifecycle: real stages from the registry governance block.
const approvalSteps = computed(() => {
  const stages = modelsStore.championChurn?.governance?.approval_stages
  if (!stages?.length) return []
  return stages.map(s => ({
    stage: s.stage,
    detail: s.detail || s.date || '',
    done: s.status === 'DONE' || s.status === 'APPROVED',
    active: s.status === 'LIVE' || s.status === 'PENDING',
  }))
})

// Audit log: only events with a real backend source (registry + live logs)
const auditLog = computed(() => {
  const m = modelsStore.championChurn
  const rows = []
  if (m) {
    rows.push({
      date: '—', event: 'Registered as champion', version: m.id,
      auc: m.metrics?.auc != null ? (m.metrics.auc * 100).toFixed(1) + '%' : '—',
      actor: 'model registry', status: 'ACTIVE', statusClass: 'bg-brand-soft-success text-status-success',
    })
  }
  if (predictionLogs.value.length) {
    rows.push({
      date: (predictionLogs.value[0].timestamp || '—').slice(0, 10),
      event: 'Serving live predictions', version: m?.id || '—',
      auc: '—', actor: 'prediction-service', status: 'LIVE', statusClass: 'bg-brand-soft-success text-status-success',
    })
  }
  return rows
})

// ── Enriched Prediction Logs ──
const selectedTimeframe = ref('Last 1 Hour')
const enrichedLogs = computed(() =>
  predictionLogs.value.map(log => {
    const probValue = parseFloat(log.prob) / 100
    const riskBand  = probValue > 0.70 ? 'HIGH' : probValue > 0.40 ? 'MEDIUM' : 'LOW'
    const riskBandClass = probValue > 0.70 ? 'bg-absa-passion/10 text-absa-inspire' : probValue > 0.40 ? 'bg-status-warning/10 text-status-warning' : 'bg-absa-passion/10 text-absa-passion'
    return { ...log, probValue, riskBand, riskBandClass }
  })
)

// ── Chart Refs ──
const sparklineAucCanvas = ref(null)
const sparklineF1Canvas  = ref(null)
const mainChartCanvas    = ref(null)
let _sparkAucChart = null
let _sparkF1Chart = null
let _mainChart = null

// ── Retrain action ──────────────────────────────────────────────────────────
// The backend triggers a detached background job (scripts/train_models.py).
// We capture the champion's trained_at/version before starting, then poll the
// registry until it changes (job finished) or a timeout elapses.

const baselineSignature = () => {
  const m = modelsStore.championChurn
  return m ? `${m.trained_at || ''}|${m.version || ''}|${m.metrics?.auc ?? ''}` : 'none'
}

async function requestRetrain() {
  if (retraining.value) return
  retraining.value = true
  retrainError.value = ''
  retrainStartedAt.value = new Date().toISOString()
  const baseline = baselineSignature()
  try {
    const data = await triggerApiRetrain(selectedFeaturesForTraining.value, 'latest')
    notify(`Retrain started — job ${data.job_id}`, 'success', { autoClose: 4000 })
    // Poll for completion every 10s, up to ~10 min (train takes ~1-3 min).
    let attempts = 0
    retrainPollTimer.value = setInterval(async () => {
      attempts += 1
      await modelsStore.fetchModels()
      const done = baselineSignature() !== baseline && modelsStore.championChurn
      if (done || attempts >= 60) {
        clearInterval(retrainPollTimer.value)
        retrainPollTimer.value = null
        retraining.value = false
        if (done) {
          notify('Retrain complete — model registry updated', 'success', { autoClose: 4000 })
          refreshAllData()
        } else {
          notify('Retrain is taking longer than expected — check backend logs', 'warning', { autoClose: 6000 })
        }
      }
    }, 10000)
  } catch (e) {
    retraining.value = false
    retrainError.value = e.response?.data?.detail || e.message || 'Failed to start retrain'
    notify(`Retrain failed to start — ${retrainError.value}`, 'error', { autoClose: 5000 })
  }
}

function stopRetrainPolling() {
  if (retrainPollTimer.value) {
    clearInterval(retrainPollTimer.value)
    retrainPollTimer.value = null
  }
  retraining.value = false
}

async function refreshAllData() {
  await modelsStore.fetchModels()
  try {
    const [perfRes, driftRes, logRes] = await Promise.all([
      api.get('/api/v1/monitoring/performance-history', { params: { horizon_days: 30 } }),
      api.get('/api/v1/monitoring/feature-drift'),
      api.get('/api/v1/monitoring/prediction-log', { params: { limit: 50 } }),
    ])
    performanceHistory.value = perfRes.data.history || []
    featureDriftList.value = (driftRes.data.features || []).map(f => ({
      name: f.name,
      trainMean: f.training_mean.toFixed(1),
      currentMean: f.current_mean.toFixed(1),
      score: f.drift_score.toFixed(2),
      scoreColor: f.drift_score > 0.20 ? 'text-absa-passion font-bold' : 'text-gray-900',
      status: f.status,
      badgeClass: f.status === 'CRITICAL' ? 'bg-absa-passion/10 text-absa-inspire' : f.status === 'WARNING' ? 'bg-status-warning/10 text-status-warning' : 'bg-absa-passion/10 text-absa-passion',
      invertShift: f.invert_shift,
    }))
    predictionLogs.value = (logRes.data.predictions || []).map(p => ({
      timestamp: p.timestamp,
      correlationId: p.correlation_id,
      customerId: p.customer_id,
      prob: (p.churn_probability * 100).toFixed(1) + '%',
      class: p.predicted_class,
      classColor: p.predicted_class === 'CHURN' ? 'text-absa-inspire' : 'text-absa-passion',
      latency: p.latency_ms.toFixed(1),
    }))
    predictionTotal.value = logRes.data.total_predictions || 0
  } catch (e) {
    console.warn('Models: monitoring refresh failed', e.message)
  }
  await nextTick()
  initCharts()
}

onMounted(async () => {
  await modelsStore.fetchModels()
  intelligenceStore.fetchClv()
  try {
    const [perfRes, driftRes, logRes] = await Promise.all([
      api.get('/api/v1/monitoring/performance-history', { params: { horizon_days: 30 } }),
      api.get('/api/v1/monitoring/feature-drift'),
      api.get('/api/v1/monitoring/prediction-log', { params: { limit: 50 } }),
    ])
    performanceHistory.value = perfRes.data.history || []
    featureDriftList.value = (driftRes.data.features || []).map(f => ({
      name: f.name,
      trainMean: f.training_mean.toFixed(1),
      currentMean: f.current_mean.toFixed(1),
      score: f.drift_score.toFixed(2),
      scoreColor: f.drift_score > 0.20 ? 'text-absa-passion font-bold' : 'text-gray-900',
      status: f.status,
      badgeClass: f.status === 'CRITICAL' ? 'bg-absa-passion/10 text-absa-inspire' : f.status === 'WARNING' ? 'bg-status-warning/10 text-status-warning' : 'bg-absa-passion/10 text-absa-passion',
      invertShift: f.invert_shift,
    }))
    predictionLogs.value = (logRes.data.predictions || []).map(p => ({
      timestamp: p.timestamp,
      correlationId: p.correlation_id,
      customerId: p.customer_id,
      prob: (p.churn_probability * 100).toFixed(1) + '%',
      class: p.predicted_class,
      classColor: p.predicted_class === 'CHURN' ? 'text-absa-inspire' : 'text-absa-passion',
      latency: p.latency_ms.toFixed(1),
    }))
    predictionTotal.value = logRes.data.total_predictions || 0
  } catch (e) {
    console.warn('Models: monitoring fetch failed', e.message)
  }
  loading.value = false
})

watch(loading, async (val) => {
  if (!val) { await nextTick(); initCharts() }
})

function initCharts() {
  // Destroy previous instances before recreating (refresh/retrain re-runs this).
  if (_sparkAucChart) _sparkAucChart.destroy()
  if (_sparkF1Chart) _sparkF1Chart.destroy()
  if (_mainChart) _mainChart.destroy()
  const sparkOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false, min: 0 } },
    elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } },
    layout: { padding: 0 },
  }
  const history = performanceHistory.value
  const labels  = history.map(h => h.date)
  const aucData = history.map(h => h.auc * 100)
  const logData = history.map(h => h.log_loss)
  const precData = history.map(h => h.precision * 100)
  const recData  = history.map(h => h.recall * 100)
  const lbs = labels

  if (sparklineAucCanvas.value) {
    _sparkAucChart = new Chart(sparklineAucCanvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: aucData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    })
  }
  if (sparklineF1Canvas.value) {
    _sparkF1Chart = new Chart(sparklineF1Canvas.value, {
      type: 'line',
      data: { labels: lbs, datasets: [{ data: logData, borderColor: '#DC0037', fill: false }] },
      options: sparkOpts,
    })
  }
  if (mainChartCanvas.value) {
    _mainChart = new Chart(mainChartCanvas.value, {
      type: 'line',
      data: {
        labels: lbs,
        datasets: [
          { label: 'Precision', data: precData, borderColor: '#DC0037', borderWidth: 2, tension: 0.4, pointRadius: 0, pointHoverRadius: 4, fill: false },
          { label: 'Recall',    data: recData,  borderColor: 'rgba(220,0,55,0.35)', borderWidth: 2, borderDash: [4, 4], tension: 0.4, pointRadius: 0, pointHoverRadius: 4, fill: false },
        ],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true, grid: { display: false }, ticks: { color: '#9ca3af', font: { size: 10 } } },
          y: { display: true, min: 60, max: 100, grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af', font: { size: 10 }, callback: v => v + '%' } },
        },
        layout: { padding: { top: 10, bottom: 10 } },
      },
    })
  }

  // --- MLOps Governed Functions ---

  async function loadMLOpsData() {
    try {
      const champ = await fetchChampion()
      activeThreshold.value = champ.optimal_threshold || 0.50
      calibrationThreshold.value = activeThreshold.value
      
      const f = await fetchFeatures()
      availableFeatures.value = f
      
      const comp = await fetchModelComparison()
      modelComparison.value = comp
      
      const logs = await fetchAuditLogs()
      auditLogs.value = logs
      
      await doSimulate()
    } catch (e) {
      console.warn("Failed to load MLOps governed data", e)
    }
  }

  async function submitCalibration() {
    savingThreshold.value = true
    try {
      const champ = await fetchChampion()
      await submitCalibrationProposal(champ.id, calibrationThreshold.value, simulatedMetrics.value)
      notify('Calibration proposal submitted for approval', 'success', { autoClose: 3000 })
    } catch (e) {
      notify('Failed to submit calibration proposal', 'error', { autoClose: 5000 })
    } finally {
      savingThreshold.value = false
    }
  }

  function resetCalibration() {
    calibrationThreshold.value = activeThreshold.value
  }

  let simTimeout = null
  function debounceSimulate() {
    clearTimeout(simTimeout)
    simTimeout = setTimeout(doSimulate, 300)
  }

  async function doSimulate() {
    simulating.value = true
    try {
      const payload = {
          features: {},
          baseline_probability: 0.50, // mock baseline
          threshold: calibrationThreshold.value
      }
      simulationFeatures.value.forEach(feat => { payload.features[feat.name] = feat.value })
      simulationResult.value = await simulatePrediction(payload)
    } catch (e) {
      console.warn("Simulation failed", e)
    } finally {
      simulating.value = false
    }
  }

  // Registry rows expose evaluation_metrics (there is no top-level auc_roc).
  // Classifiers carry `auc`; the CLV regressor carries `rmse`.
  function comparisonMetric(m) {
    const em = m?.evaluation_metrics || {}
    if (em.auc != null) return Number(em.auc).toFixed(3)
    if (em.rmse != null) return `RMSE ${Number(em.rmse).toFixed(1)}`
    return 'N/A'
  }

  // ── Registered model families (registry.json models[]) ──
  const registeredModels = computed(() => modelsStore.models || [])

  function primaryMetric(m) {
    const em = m?.metrics || {}
    if (em.auc != null) return `AUC ${Number(em.auc).toFixed(3)}`
    if (em.rmse != null) return `RMSE ${Number(em.rmse).toFixed(1)}`
    if (em.mae != null) return `MAE ${Number(em.mae).toFixed(1)}`
    return '—'
  }

  async function triggerRetrainAction() {
    retraining.value = true
    try {
      // Use the features ticked in the Feature Registry — the API exposes
      // allowed_for_training (not is_active), and an empty list trains on nothing.
      const selected = selectedFeaturesForTraining.value.length
        ? [...selectedFeaturesForTraining.value]
        : availableFeatures.value.filter(feat => feat.allowed_for_training).map(feat => feat.id)
      if (!selected.length) {
        notify('Select at least one feature to train on', 'warning', { autoClose: 5000 })
        return
      }
      const res = await triggerApiRetrain(selected, "latest")
      notify('Background training job queued (Job ID: ' + res.job_id + ')', 'success', { autoClose: 4000 })
      await refreshAllData()
    } catch (e) {
      notify('Failed to start training job', 'error', { autoClose: 5000 })
    } finally {
      retraining.value = false
    }
  }
  
  async function actionValidate(id) {
    try {
        await validateModel(id)
        notify('Model validated successfully', 'success')
        await loadMLOpsData()
    } catch(e) { notify('Validation failed', 'error') }
  }

  async function actionApprove(id) {
    try {
        await approveModel(id)
        notify('Model approved successfully', 'success')
        await loadMLOpsData()
    } catch(e) { notify('Approval failed', 'error') }
  }

  async function actionPromote(id) {
    promotingModel.value = true
    try {
      await promoteModel(id)
      notify('Model promoted to production Champion!', 'success', { autoClose: 4000 })
      await loadMLOpsData()
    } catch (e) {
      notify('Failed to promote model', 'error', { autoClose: 5000 })
    } finally {
      promotingModel.value = false
    }
  }

  onMounted(loadMLOpsData)
}
</script>

<style>
:root {
  --brand-red: #DC0037;
  --brand-dark: #131010;
}

.table-container::-webkit-scrollbar { height: 6px; }
.table-container::-webkit-scrollbar-track { background: #f1f1f1; }
.table-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
.table-container::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
</style>
