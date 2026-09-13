import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\views\Modules\aiagents\Models.vue"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

injection_html = """
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
                <p class="text-2xl font-mono text-status-success mt-1">{{ simulatedMetrics.tp }}</p>
              </div>
              <div class="border border-gray-200 rounded p-4 text-center bg-gray-50">
                <p class="text-[10px] font-bold text-gray-500 uppercase">Simulated False Positives</p>
                <p class="text-2xl font-mono text-status-warning mt-1">{{ simulatedMetrics.fp }}</p>
              </div>
              <div class="border border-gray-200 rounded p-4 text-center bg-gray-50">
                <p class="text-[10px] font-bold text-gray-500 uppercase">Simulated True Negatives</p>
                <p class="text-2xl font-mono text-status-success mt-1">{{ simulatedMetrics.tn }}</p>
              </div>
              <div class="border border-gray-200 rounded p-4 text-center bg-gray-50">
                <p class="text-[10px] font-bold text-gray-500 uppercase">Simulated False Negatives</p>
                <p class="text-2xl font-mono text-status-warning mt-1">{{ simulatedMetrics.fn }}</p>
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
                  <span class="text-3xl font-mono" :class="simulationResult.classification === 'HIGH_RISK' ? 'text-absa-passion' : 'text-status-success'">
                    {{ (simulationResult.simulated_probability * 100).toFixed(1) }}%
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
"""

# Insert just before the champion tab
content = content.replace("<template v-else-if=\"activeTab === 'champion'\">", injection_html + "\n        <template v-else-if=\"activeTab === 'champion'\">")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Injected missing tab templates!")
