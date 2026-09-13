import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\aiagents\Models.vue"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_blocks = """
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
              <button @click="triggerRetrain" :disabled="retraining || selectedFeaturesForTraining.length === 0" class="px-4 py-2 bg-absa-passion text-white rounded text-sm font-bold hover:bg-absa-power disabled:opacity-50">
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
                    <span class="font-bold">{{ modelComparisonData.champion.auc_roc != null ? modelComparisonData.champion.auc_roc.toFixed(3) : 'N/A' }}</span>
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
                      <span class="font-bold">{{ modelComparisonData.challenger.auc_roc != null ? modelComparisonData.challenger.auc_roc.toFixed(3) : 'N/A' }}</span>
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
        </template>
"""

# Replace everything from <template v-else-if="activeTab === 'champion'"> to <template v-else-if="activeTab === 'monitoring'">
content = re.sub(r'<template v-else-if="activeTab === \'champion\'">.*?(?=<template v-else-if="activeTab === \'monitoring\'>|<template v-else-if="activeTab === \'monitoring\'">)', new_blocks, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
