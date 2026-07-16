<template>
  <Teleport to="#modal-target">
    <div v-if="showScanner" style="position:fixed;inset:0;z-index:110000;" class="flex items-start justify-center p-2 md:p-6 overflow-auto pointer-events-auto">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" @click="closeScanner"></div>
      
      <div class="bg-white border border-gray-200 shadow-2xl w-full max-w-4xl sm:max-w-3xl md:max-w-4xl flex flex-col max-h-[95vh] sm:max-h-[90vh] h-auto rounded-none relative overflow-hidden mt-20 md:mt-24 pointer-events-auto z-10">
        <div class="h-1.5 w-full bg-[#2F2E8B] shrink-0"></div>
        <div class="absolute inset-0 dotted-pattern opacity-[0.02] pointer-events-none"></div>

        <div class="px-4 sm:px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-md sticky top-0 z-20 shrink-0">
          <div class="flex items-center gap-4">
            <div class="h-10 w-10 bg-indigo-50 flex items-center justify-center rounded-none border border-indigo-100/50 shadow-sm">
                <i class="fas fa-barcode text-[#2F2E8B]"></i>
            </div>
            <div>
              <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#2F2E8B] rounded-none"></span>
                Hardware Interface
              </div>
              <div class="text-sm font-black uppercase tracking-tight text-gray-900 mt-0.5">Digital Product Scanner</div>
            </div>
          </div>
          <button @click="closeScanner" class="text-gray-400 hover:text-red-500 transition-colors w-10 h-10 flex items-center justify-center hover:bg-red-50 rounded-none border border-transparent hover:border-red-100">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6 overflow-y-auto relative z-10 flex-1 min-h-0 bg-white">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Side: Scanner Viewport -->
        <div class="flex-1 min-w-0">
          <!-- Scanner Type Tabs -->
          <div class="flex p-1 bg-gray-100/80 rounded-none mb-4 w-full sm:w-auto self-start border border-gray-200/50">
            <button 
              @click="scannerType = 'camera'"
              :class="[
                'flex-1 sm:flex-none px-6 py-2 rounded-none text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-200',
                scannerType === 'camera' 
                  ? 'bg-[#2F2E8B] text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <i class="fas fa-camera mr-2"></i>Camera
            </button>
            <button 
              @click="scannerType = 'usb'"
              :class="[
                'flex-1 sm:flex-none px-6 py-2 rounded-none text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-200',
                scannerType === 'usb' 
                  ? 'bg-[#2F2E8B] text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <i class="fas fa-usb mr-2"></i>USB Scanner
            </button>
            <button 
              @click="scannerType = 'generate'"
              :class="[
                'flex-1 sm:flex-none px-6 py-2 rounded-none text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-200',
                scannerType === 'generate' 
                  ? 'bg-[#2F2E8B] text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <i class="fas fa-magic mr-2"></i>Generate
            </button>
            <button 
              @click="scannerType = 'history'"
              :class="[
                'flex-1 sm:flex-none px-6 py-2 rounded-none text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-200',
                scannerType === 'history' 
                  ? 'bg-[#2F2E8B] text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <i class="fas fa-history mr-2"></i>History
            </button>
          </div>

          <!-- Camera View -->
          <div v-show="scannerType === 'camera'" class="relative aspect-[16/9] bg-black rounded-none overflow-hidden shadow-inner ring-1 ring-gray-200">
            <video 
              ref="videoElement"
              class="w-full h-full object-cover"
              playsinline
              autoplay
              muted
            ></video>
            
            <!-- Scanning Overlay -->
            <div class="absolute inset-0 pointer-events-none">
              <div class="absolute inset-0 border-[40px] border-black/30"></div>
              <div class="absolute inset-[40px] border-2 border-white/50 rounded-none">
                <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white"></div>
              </div>
              <div 
                class="absolute left-[50px] right-[50px] h-0.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] scanning-line"
                :style="{ top: `${scanLinePosition}%` }"
              ></div>
            </div>

            <div class="absolute bottom-4 right-4 flex gap-2 pointer-events-auto">
               <select 
                v-model="selectedCamera"
                class="bg-black/60 backdrop-blur text-white text-xs border-0 rounded-none py-2 pl-3 pr-8 focus:ring-0 cursor-pointer hover:bg-black/70 transition-colors"
                @change="switchCamera"
              >
                <option v-for="camera in cameras" :key="camera.deviceId" :value="camera.deviceId">
                  {{ getCameraLabel(camera) }}
                </option>
              </select>

              <button 
                v-if="supportsTorch"
                @click="toggleFlashlight"
                class="w-8 h-8 flex items-center justify-center rounded-none bg-black/60 text-white hover:bg-black/70 transition-colors"
                :class="{ 'text-yellow-400': flashlightOn }"
              >
                <i class="fas fa-bolt"></i>
              </button>
            </div>
          </div>

          <!-- USB View -->
          <div v-show="scannerType === 'usb'" class="aspect-[16/9] bg-gray-50 rounded-none border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center">
            <div class="w-16 h-16 bg-white rounded-none shadow-sm flex items-center justify-center mb-4 border border-gray-100">
              <i class="fas fa-barcode text-3xl text-gray-300"></i>
            </div>
            <h4 class="text-lg font-black text-gray-900 uppercase tracking-tight">Scanner Ready</h4>
            <p class="text-[10px] font-mono text-gray-500 max-w-sm mx-auto mb-6 uppercase">Connect hardware or use handheld device</p>
            
            <div class="w-full max-w-md space-y-4">
              <input 
                ref="usbKeyboardInput"
                v-model="keyboardInput"
                @keydown="handleKeyboardInput"
                @input="handleKeyboardScan"
                type="text"
                placeholder="PROBE_SIGNAL_START..."
                class="barcode-keyboard-input w-full text-center text-lg tracking-widest font-mono bg-white border border-gray-200 rounded-none px-4 py-3 focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-shadow uppercase font-black"
              />
              
               <div class="flex items-center justify-center gap-2">
                 <span :class="['w-2 h-2 rounded-none', usbConnected ? 'bg-green-500' : 'bg-gray-300']"></span>
                 <span class="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest">{{ usbConnected ? 'Device Synchronized' : 'Waiting for connection...' }}</span>
               </div>
            </div>
          </div>

          <!-- Barcode History View -->
          <div v-show="scannerType === 'history'" class="aspect-[16/9] bg-white rounded-none border border-gray-200 flex flex-col p-6 overflow-y-auto custom-scrollbar">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
                  <i class="fas fa-history text-[#2F2E8B]"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight leading-none">Generation History</h4>
                  <p class="text-[9px] font-mono text-gray-400 uppercase mt-1 tracking-widest">Manage previously created barcodes</p>
                </div>
              </div>
              <button @click="fetchBarcodeHistory" class="p-2 text-gray-400 hover:text-[#2F2E8B] transition-colors">
                <i class="fas fa-sync-alt text-xs" :class="{ 'fa-spin': isHistoryLoading }"></i>
              </button>
            </div>

            <div v-if="isHistoryLoading" class="flex flex-col items-center justify-center py-12 text-gray-400">
               <i class="fas fa-spinner fa-spin text-2xl mb-3"></i>
               <p class="text-[10px] font-mono font-black uppercase tracking-widest">Retrieving logs...</p>
            </div>

            <div v-else-if="barcodeHistory.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-300 border-2 border-dashed border-gray-100">
               <i class="fas fa-inbox text-4xl mb-3"></i>
               <p class="text-[10px] font-mono font-black uppercase tracking-widest">No history found</p>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="item in barcodeHistory" :key="item.id" 
                class="group relative bg-gray-50 border border-gray-200 p-4 hover:border-[#2F2E8B] hover:bg-white transition-all cursor-pointer"
                @click="reSelectFromHistory(item)"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex-1 min-w-0">
                    <div class="text-[10px] font-black text-gray-900 uppercase truncate mb-1">{{ item.name }}</div>
                    <div class="text-[9px] font-mono font-bold text-gray-400 tracking-wider">{{ item.sku }}</div>
                  </div>
                  <div class="flex gap-1">
                    <button @click.stop="printSpecificBarcode(item)" class="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 shadow-sm transition-all" title="Print">
                      <i class="fas fa-print text-[10px]"></i>
                    </button>
                    <button @click.stop="deleteBarcodeHistory(item.id)" class="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 shadow-sm transition-all" title="Delete">
                      <i class="fas fa-trash-alt text-[10px]"></i>
                    </button>
                  </div>
                </div>
                <div class="flex justify-center bg-white p-2 border border-gray-100 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div :id="`history-barcode-${item.id}`" class="h-10 w-full overflow-hidden flex justify-center items-center">
                    <svg :id="`history-svg-${item.id}`" style="max-width: 100%; height: auto;"></svg>
                  </div>
                </div>
                <div class="mt-2 text-[8px] font-mono text-gray-400 uppercase tracking-widest text-right">
                  {{ new Date(item.created_at).toLocaleDateString() }}
                </div>
              </div>
            </div>
          </div>

          <!-- Generate Barcode View -->
          <div v-show="scannerType === 'generate'" class="aspect-[16/9] bg-white rounded-none border border-gray-200 flex flex-col p-6 overflow-y-auto custom-scrollbar">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
                <i class="fas fa-magic text-[#2F2E8B]"></i>
              </div>
              <div>
                <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight leading-none">Barcode Generator</h4>
                <p class="text-[9px] font-mono text-gray-400 uppercase mt-1 tracking-widest">Create & print product labels</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div class="flex flex-col gap-2">
                  <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Product Name</label>
                  <input 
                    v-model="generationForm.name"
                    type="text"
                    placeholder="Enter product name..."
                    class="w-full bg-gray-50 border border-gray-200 rounded-none px-4 py-3 text-xs font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-shadow uppercase"
                  />
                </div>

                <div class="flex flex-col gap-2 relative">
                  <label class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Barcode / SKU</label>
                  <div class="flex gap-2">
                    <input 
                      v-model="generationForm.sku"
                      type="text"
                      placeholder="Enter or auto-generate..."
                      class="flex-1 bg-gray-50 border border-gray-200 rounded-none px-4 py-3 text-xs font-mono font-bold focus:ring-1 focus:ring-[#2F2E8B] outline-none transition-shadow uppercase"
                    />
                    <button 
                      @click="autoGenerateSKU"
                      class="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 transition-colors border border-gray-200"
                      title="Generate Random SKU"
                    >
                      <i class="fas fa-sync-alt text-xs"></i>
                    </button>
                  </div>
                </div>

                <div class="pt-4 flex gap-2">
                  <button 
                    @click="saveGeneratedItem(false)"
                    :disabled="isSavingGenerated || !generationForm.name || !generationForm.sku"
                    class="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 text-[10px] font-mono font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <i v-if="isSavingGenerated" class="fas fa-spinner fa-spin"></i>
                    <i v-else class="fas fa-database"></i>
                    Save as Data
                  </button>
                  <button 
                    @click="saveGeneratedItem(true)"
                    :disabled="isSavingGenerated || !generationForm.name || !generationForm.sku"
                    class="flex-1 bg-[#2F2E8B] hover:bg-[#1D226B] text-white py-3 text-[10px] font-mono font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <i v-if="isSavingGenerated" class="fas fa-spinner fa-spin"></i>
                    <i v-else class="fas fa-plus-circle"></i>
                    In Inventory
                  </button>
                  <button 
                    @click="printBarcode"
                    :disabled="!generationForm.sku"
                    class="px-5 bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-[10px] font-mono font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center"
                    title="Print Label"
                  >
                    <i class="fas fa-print"></i>
                  </button>
                </div>
              </div>

              <!-- Preview Side -->
              <div class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-none flex flex-col items-center justify-center p-6 text-center min-h-[200px]">
                <div v-if="generationForm.sku" class="bg-white p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2" id="printable-barcode">
                  <div class="text-[9px] font-black text-gray-900 uppercase truncate max-w-[150px] mb-1">{{ generationForm.name || 'Product Preview' }}</div>
                  <svg ref="barcodePreview" class="max-w-full"></svg>
                  <div class="text-[10px] font-mono font-bold text-gray-500 tracking-[0.3em]">{{ generationForm.sku }}</div>
                </div>
                <div v-else class="text-gray-300">
                  <i class="fas fa-barcode text-4xl mb-2"></i>
                  <p class="text-[9px] font-mono font-bold uppercase tracking-widest">Preview Area</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Barcode History View -->
          <div v-show="scannerType === 'history'" class="aspect-[16/9] bg-white rounded-none border border-gray-200 flex flex-col p-6 overflow-y-auto custom-scrollbar">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
                  <i class="fas fa-history text-[#2F2E8B]"></i>
                </div>
                <div>
                  <h4 class="text-sm font-black text-gray-900 uppercase tracking-tight leading-none">Generation History</h4>
                  <p class="text-[9px] font-mono text-gray-400 uppercase mt-1 tracking-widest">Manage previously created barcodes</p>
                </div>
              </div>
              <button @click="fetchBarcodeHistory" class="p-2 text-gray-400 hover:text-[#2F2E8B] transition-colors">
                <i class="fas fa-sync-alt text-xs" :class="{ 'fa-spin': isHistoryLoading }"></i>
              </button>
            </div>

            <div v-if="isHistoryLoading" class="flex flex-col items-center justify-center py-12 text-gray-400">
               <i class="fas fa-spinner fa-spin text-2xl mb-3"></i>
               <p class="text-[10px] font-mono font-black uppercase tracking-widest">Retrieving logs...</p>
            </div>

            <div v-else-if="barcodeHistory.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-300 border-2 border-dashed border-gray-100">
               <i class="fas fa-inbox text-4xl mb-3"></i>
               <p class="text-[10px] font-mono font-black uppercase tracking-widest">No history found</p>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="item in barcodeHistory" :key="item.id" 
                class="group relative bg-gray-50 border border-gray-200 p-4 hover:border-[#2F2E8B] hover:bg-white transition-all cursor-pointer"
                @click="reSelectFromHistory(item)"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex-1 min-w-0">
                    <div class="text-[10px] font-black text-gray-900 uppercase truncate mb-1">{{ item.name }}</div>
                    <div class="text-[9px] font-mono font-bold text-gray-400 tracking-wider">{{ item.sku }}</div>
                  </div>
                  <div class="flex gap-1">
                    <button @click.stop="printSpecificBarcode(item)" class="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 shadow-sm transition-all" title="Print">
                      <i class="fas fa-print text-[10px]"></i>
                    </button>
                    <button @click.stop="deleteBarcodeHistory(item.id)" class="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 shadow-sm transition-all" title="Delete">
                      <i class="fas fa-trash-alt text-[10px]"></i>
                    </button>
                  </div>
                </div>
                <div class="flex justify-center bg-white p-2 border border-gray-100 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div :id="`history-barcode-${item.id}`" class="h-10 w-full overflow-hidden"></div>
                </div>
                <div class="mt-2 text-[8px] font-mono text-gray-400 uppercase tracking-widest text-right">
                  {{ new Date(item.created_at).toLocaleDateString() }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Status & Actions -->
        <div class="lg:w-80 flex flex-col gap-4">
          <div class="bg-gray-50 rounded-none p-5 border border-gray-100 flex-1">
            <h4 class="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest mb-4">Scanner Status</h4>
            
            <div v-if="autoConnecting" class="flex items-center gap-3 text-[#2F2E8B]">
              <div class="animate-spin w-4 h-4 border-2 border-[#2F2E8B] border-t-transparent"></div>
              <span class="text-[10px] font-mono font-black uppercase">Scanning Hardware...</span>
            </div>
            
            <div v-else-if="initializing" class="flex items-center gap-3 text-gray-600">
              <div class="animate-spin w-4 h-4 border-2 border-gray-600 border-t-transparent"></div>
              <span class="text-[10px] font-mono font-black uppercase">Waking Camera...</span>
            </div>

            <div v-else-if="scanning && !lastResult && !error" class="flex items-center gap-3 text-gray-600">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span class="text-[10px] font-mono font-black uppercase tracking-widest">Active Search</span>
            </div>

            <div v-if="lastResult" class="mt-2 bg-white rounded-none p-4 border border-green-100 shadow-sm relative">
              <div class="absolute top-0 right-0 p-1 opacity-10"><i class="fas fa-check-circle text-2xl text-green-500"></i></div>
              <div class="text-[8px] font-mono font-black text-green-600 uppercase tracking-widest mb-1">Code Detected</div>
              <div class="text-xl font-mono font-black text-gray-900 break-all select-all">{{ lastResult }}</div>
            </div>

            <div v-if="error" class="mt-2 bg-white rounded-none p-4 border border-red-100 shadow-sm">
              <div class="flex items-start gap-2">
                <i class="fas fa-exclamation-circle text-red-500 mt-0.5"></i>
                <div class="text-[10px] font-mono font-black text-red-600 uppercase">{{ error }}</div>
              </div>
                <!-- Manual Override Button -->
              <button 
                v-if="scannerType === 'camera'"
                @click="scannerType = 'usb'; error = null"
                class="mt-3 w-full border border-red-200 text-red-600 hover:bg-red-50 text-[9px] uppercase font-bold text-center px-4 py-2 transition-colors rounded-none"
              >
                Switch to Manual/USB Scanner
              </button>
            </div>
          </div>

          <div class="mt-auto space-y-3">
             <div 
               v-if="lastResult"
               class="w-full py-3.5 bg-green-50 border border-green-200 text-green-700 rounded-none font-mono font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2"
             >
               <i class="fas fa-check-circle"></i>
               <span>Detected - Adding to cart...</span>
             </div>
              <button 
               v-else
               @click="autoDetectAndConnect"
               :disabled="autoConnecting"
               class="w-full py-3.5 border border-gray-200 text-gray-600 rounded-none font-mono font-black text-[10px] uppercase tracking-widest hover:border-[#2F2E8B] hover:text-[#2F2E8B] transition-all flex items-center justify-center gap-2"
             >
               Auto-Detect Hardware
             </button>

             <button 
               @click="closeScanner"
               class="w-full py-2.5 text-gray-400 font-mono font-bold text-[9px] uppercase tracking-widest hover:text-red-500 transition-colors"
             >
               Cancel Scan
             </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, reactive } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';

const props = defineProps({
  showScanner: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'barcode-detected']);

// Template refs
const videoElement = ref(null);
const usbKeyboardInput = ref(null);
const barcodePreview = ref(null);

// State
const scannerType = ref('camera'); // 'camera' or 'usb' or 'generate'
const selectedCamera = ref('');
const cameras = ref([]);
const scanning = ref(false);
const lastResult = ref('');
const flashlightOn = ref(false);
const scanLinePosition = ref(0);
const error = ref(null);
const stream = ref(null);
const scanInterval = ref(null);
const supportsTorch = ref(false);
const initializing = ref(false);

// History state
const barcodeHistory = ref([]);
const isHistoryLoading = ref(false);

const fetchBarcodeHistory = async () => {
  isHistoryLoading.value = true;
  try {
    const { getTenantId, getToken } = decodeJWT();
    const resp = await fetch(`${API_BASE_URL}/barcodes?tenant_id=${getTenantId()}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (resp.ok) {
      barcodeHistory.value = await resp.json();
      
      // Render history barcodes on next tick
      await nextTick();
      await loadJsBarcode();
      barcodeHistory.value.forEach(item => {
        const svgEl = document.getElementById(`history-svg-${item.id}`);
        if (svgEl) {
          window.JsBarcode(svgEl, item.sku, {
            format: "CODE128",
            width: 1.5,
            height: 35,
            displayValue: false,
            margin: 0
          });
        }
      });
    }
  } catch (e) {
    console.error('History fetch failed', e);
  } finally {
    isHistoryLoading.value = false;
  }
};

const deleteBarcodeHistory = async (id) => {
  if (!confirm('Are you sure you want to delete this barcode log?')) return;
  
  try {
    const { getTenantId, getToken } = decodeJWT();
    const resp = await fetch(`${API_BASE_URL}/barcodes/${id}?tenant_id=${getTenantId()}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (resp.ok) {
      barcodeHistory.value = barcodeHistory.value.filter(b => b.id !== id);
    }
  } catch (e) {
    console.error('Delete failed', e);
  }
};

const reSelectFromHistory = (item) => {
  generationForm.name = item.name;
  generationForm.sku = item.sku;
  scannerType.value = 'generate';
};

const printSpecificBarcode = async (item) => {
  // Briefly select it to render the main preview
  reSelectFromHistory(item);
  await nextTick();
  setTimeout(() => printBarcode(), 100);
};

// Generation state
const isSavingGenerated = ref(false);
const generationForm = reactive({
  name: '',
  sku: ''
});

// Load JsBarcode dynamically
const loadJsBarcode = () => {
  return new Promise((resolve, reject) => {
    if (window.JsBarcode) {
      resolve(window.JsBarcode);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js';
    script.onload = () => resolve(window.JsBarcode);
    script.onerror = (e) => {
      console.error('Failed to load JsBarcode script', e);
      reject(e);
    };
    document.head.appendChild(script);
  });
};

const autoGenerateSKU = () => {
  // Generate a random 8-digit SKU
  generationForm.sku = Math.floor(10000000 + Math.random() * 90000000).toString();
};

const updateBarcodePreview = async () => {
  if (!generationForm.sku) return;
  
  try {
    await loadJsBarcode();
    if (barcodePreview.value) {
      window.JsBarcode(barcodePreview.value, generationForm.sku, {
        format: "CODE128",
        width: 2,
        height: 50,
        displayValue: false,
        margin: 0
      });
    }
  } catch (e) {
    console.error('Barcode generation failed', e);
  }
};

watch(() => [generationForm.sku, scannerType.value], async () => {
  if (scannerType.value === 'generate') {
    await nextTick();
    updateBarcodePreview();
  }
  if (scannerType.value === 'history') {
    fetchBarcodeHistory();
  }
});

const saveGeneratedItem = async (toInventory = true) => {
  if (!generationForm.name || !generationForm.sku) return;
  
  isSavingGenerated.value = true;
  try {
    const { getTenantId, getToken } = decodeJWT();
    const tenantId = getTenantId();
    const token = getToken();
    
    // 1. Save to barcode history collection
    const histResp = await fetch(`${API_BASE_URL}/barcodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: generationForm.name,
        sku: generationForm.sku,
        tenant_id: tenantId
      })
    });
    
    if (!histResp.ok) {
        const errData = await histResp.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to save barcode history');
    }

    if (toInventory) {
      const payload = {
        name: generationForm.name,
        sku: generationForm.sku,
        tenant_id: tenantId,
        type: 'Product',
        category: 'Other',
        stockQty: 0,
        price: 0,
        sellingPrice: 0,
        buyingPrice: 0,
        vatApplicable: true,
        branch_id: 'main'
      };
      
      const response = await fetch(`${API_BASE_URL}/inventory?tenant_id=${tenantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to save to inventory');
      }
      
      alert(`Barcode saved and item added to inventory successfully!`);
      
      // Trigger inventory refresh in other components
      try {
        window.dispatchEvent(new Event('inventory-updated'));
      } catch (e) {
        console.warn('Failed to dispatch inventory-updated event', e);
      }
    } else {
      alert(`Barcode saved to logs successfully!`);
    }
    
  } catch (e) {
    console.error('Save failed', e);
    alert(`Error: ${e.message}`);
  } finally {
    isSavingGenerated.value = false;
  }
};


const printBarcode = () => {
  const cn = (generationForm.name || 'PRODUCT NAME').toUpperCase();
  const sku = generationForm.sku || '00000000';
  const barcodeEl = document.getElementById('printable-barcode');
  
  if (!barcodeEl) {
    alert('Barcode preview not ready. Please enter a name and SKU first.');
    return;
  }
  
  // Extract SVG content for the barcode
  const svgMatch = barcodeEl.innerHTML.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  const svgContent = svgMatch ? svgMatch[0] : '';

  const barcodePrintHTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Barcode</title><style>@page{size:80mm auto;margin:0}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Arial Black',Arial,sans-serif;font-size:12px;line-height:1.2;width:100%;color:#000;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center}.container{width:80mm;padding:15px 0 20mm 0;display:flex;flex-direction:column;align-items:center;text-align:center;margin:0 auto}.name{font-weight:900;font-size:16px;margin-bottom:4px;text-transform:uppercase;line-height:1.0;letter-spacing:-0.5px;width:100%}.barcode-wrapper{margin:5px 0;display:flex;justify-content:center;align-items:center;width:100%;filter:grayscale(100%) contrast(200%) brightness(80%)}svg{width:70mm!important;height:auto!important;display:block;margin:0 auto}.sku{font-weight:900;font-size:14px;margin-top:2px;letter-spacing:3px;font-family:'Arial Black',sans-serif;width:100%}.footer{margin-top:10px;border-top:2px solid #000;width:90%;padding-top:4px;font-size:11px;font-weight:900;text-transform:uppercase;margin-left:auto;margin-right:auto}</style></head><body><div class="container"><div class="name">${cn}</div><div class="barcode-wrapper">${svgContent}</div><div class="sku">${sku}</div><div class="footer">INVENTORY UNIT</div></div></body></html>`;

  const printWithIframe = () => new Promise(resolve => {
    try {
      let frame = document.getElementById('barcode-print-frame');
      if (!frame) {
        frame = document.createElement('iframe');
        frame.id = 'barcode-print-frame';
        Object.assign(frame.style, { position: 'absolute', top: '-10000px', left: '-10000px', width: '1px', height: '1px', border: 'none' });
        document.body.appendChild(frame);
      }
      const doc = frame.contentDocument || frame.contentWindow.document;
      doc.open(); doc.write(barcodePrintHTML); doc.close();
      setTimeout(() => { try { frame.contentWindow.focus(); frame.contentWindow.print(); resolve(true); } catch (e) { resolve(false); } }, 300);
    } catch (e) { resolve(false); }
  });

  printWithIframe().then(success => {
    if (!success) {
      const pw = window.open('', '_blank', 'width=340,height=400');
      if (pw) { pw.document.write(barcodePrintHTML); pw.document.close(); pw.focus(); setTimeout(() => { pw.print(); }, 500); }
      else { alert('Please allow popups to print barcodes.'); }
    }
  });
};

// Auto-connection state
const autoConnecting = ref(false);
const autoConnectionAttempted = ref(false);
const availableDevices = ref([]);

// USB Scanner state
const usbConnected = ref(false);
const usbConnecting = ref(false);
const usbPort = ref(null);
const usbReader = ref(null);
const serialSupported = ref('serial' in navigator);
const keyboardInput = ref('');
const usbLogs = ref([]);
const usbSettings = ref({
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1
});

// Use native BarcodeDetector if available
const useNativeScanner = 'BarcodeDetector' in window;

// Auto-detect and connect to hardware scanners
const autoDetectAndConnect = async () => {
  console.log('Starting autoDetectAndConnect...');
  if (autoConnectionAttempted.value || autoConnecting.value) return;
  
  autoConnecting.value = true;
  autoConnectionAttempted.value = true;
  availableDevices.value = [];
  
  try {
    addUSBLog('Starting auto-detection...');
    
    // 1. Only check for already granted serial ports (no permission popup)
    if (serialSupported.value) {
      console.log('Serial API supported, checking ports...');
      try {
        const grantedPorts = await navigator.serial.getPorts();
        console.log(`Found ${grantedPorts.length} granted serial ports.`);
        if (grantedPorts.length > 0) {
          addUSBLog(`Found ${grantedPorts.length} previously granted serial port(s)`);
          
          for (const port of grantedPorts) {
            const info = port.getInfo();
            addUSBLog(`Port info: VID=0x${info.usbVendorId?.toString(16) || 'unknown'}, PID=0x${info.usbProductId?.toString(16) || 'unknown'}`);
            
            // Try to identify if it's a barcode scanner
            if (isBarcodeScanner(info)) {
              availableDevices.value.push({ 
                type: 'usb-serial', 
                device: port, 
                name: getDeviceName(info) 
              });
              
              // Auto-connect to first detected scanner
              scannerType.value = 'usb';
              usbPort.value = port;
              await connectUSBScanner();
              return;
            }
          }
        }
        
        // Don't automatically request new ports to avoid popup
        addUSBLog('No previously granted scanners found. Use manual connection if needed.');
        
      } catch (err) {
        console.error('Serial port check failed:', err);
        addUSBLog('Serial port check failed: ' + err.message);
      }
    }
    
    // 2. Check for already granted HID devices (no permission popup)
    if ('hid' in navigator) {
      console.log('HID API supported, checking devices...');
      try {
        addUSBLog('Checking for granted HID devices...');
        const grantedDevices = await navigator.hid.getDevices();
        console.log(`Found ${grantedDevices.length} granted HID devices.`);
        
        // Filter for barcode scanner-like devices
        const scannerDevices = grantedDevices.filter(device => isBarcodeScanner(device));
        
        if (scannerDevices.length > 0) {
          availableDevices.value.push(...scannerDevices.map(device => ({
            type: 'hid',
            device,
            name: getDeviceName(device)
          })));
          addUSBLog(`✅ Found ${scannerDevices.length} granted HID scanner(s)`);
          
          // Auto-focus keyboard input for HID scanners
          scannerType.value = 'usb';
          await nextTick();
          focusKeyboardInput();
          return;
        } else {
          addUSBLog('No granted HID scanners found. Use manual connection if needed.');
        }
      } catch (err) {
        console.error('HID device check failed:', err);
        addUSBLog('HID device check failed: ' + err.message);
      }
    }
    
    // 3. Fallback to camera (this may still show camera permission popup)
    addUSBLog('No hardware scanners detected, using camera...');
    console.log('Fallback to camera...');
    
    // Only set to camera if not already set to usb by autoSelectBestCamera logic or user interaction
    if (scannerType.value !== 'usb') {
       scannerType.value = 'camera';
    }
    
    await autoSelectBestCamera();
    
  } catch (err) {
    console.error('Auto-detection failed:', err);
    error.value = 'Auto-detection failed: ' + err.message;
    addUSBLog('❌ Auto-detection failed: ' + err.message);
  } finally {
    autoConnecting.value = false;
  }
};

// Helper function to detect if a device is likely a barcode scanner
const isBarcodeScanner = (deviceInfo) => {
  if (!deviceInfo) return false;
  
  // Check product name for scanner keywords
  const productName = deviceInfo.productName?.toLowerCase() || '';
  const scannerKeywords = [
    'scanner', 'barcode', 'qr', 'code', 'reader', 'scan',
    'mj3870', 'honeywell', 'symbol', 'zebra', 'datalogic',
    'hand held', 'handheld', '1d', '2d', 'pos', 'retail'
  ];
  
  if (scannerKeywords.some(keyword => productName.includes(keyword))) {
    return true;
  }
  
  // Check known scanner vendor IDs
  const scannerVendors = [
    0x05e0, // Symbol/Zebra
    0x0c2e, // Honeywell
    0x04b4, // Cypress
    0x0536, // Hand Held Products
    0x1eab, // Datalogic
    0x0403, // FTDI
    0x10c4, // Silicon Labs
    0x067b, // Prolific
    0x1a86, // QinHeng
  ];
  
  if (deviceInfo.vendorId && scannerVendors.includes(deviceInfo.vendorId)) {
    return true;
  }
  
  if (deviceInfo.usbVendorId && scannerVendors.includes(deviceInfo.usbVendorId)) {
    return true;
  }
  
  // For HID devices, check usage patterns typical of scanners
  if (deviceInfo.collections) {
    const hasKeyboardCollection = deviceInfo.collections.some(col => 
      col.usagePage === 0x01 && col.usage === 0x06
    );
    // Many barcode scanners appear as keyboards
    return hasKeyboardCollection;
  }
  
  return false;
};

// Helper function to get device name
const getDeviceName = (deviceInfo) => {
  if (deviceInfo.productName) {
    return deviceInfo.productName;
  }
  
  // Try to identify by vendor ID
  const vendorNames = {
    0x05e0: 'Symbol/Zebra Scanner',
    0x0c2e: 'Honeywell Scanner',
    0x04b4: 'Cypress Scanner',
    0x0536: 'Hand Held Products Scanner',
    0x1eab: 'Datalogic Scanner',
    0x0403: 'FTDI USB Scanner',
    0x10c4: 'Silicon Labs Scanner',
    0x067b: 'Prolific Scanner',
    0x1a86: 'QinHeng Scanner',
  };
  
  const vendorId = deviceInfo.vendorId || deviceInfo.usbVendorId;
  if (vendorId && vendorNames[vendorId]) {
    return vendorNames[vendorId];
  }
  
  return `USB Scanner (VID: 0x${vendorId?.toString(16) || 'unknown'})`;
};

// Helper function to get product name filters (if supported by browser)
const getProductNameFilters = () => {
  // Some browsers might support filtering by product name in the future
  // For now, return empty array as most browsers don't support this
  return [];
};

// Helper to fetch keys
const getCameras = async () => {
  console.log('getCameras called');
  if (navigator.permissions) {
    try {
      const permission = await navigator.permissions.query({ name: 'camera' });
      console.log('Camera permission state:', permission.state);
      if (permission.state === 'denied') {
        throw new Error('Camera access denied. Please enable in browser settings.');
      }
    } catch (e) {
      // Ignore permission query errors (some browsers don't support 'camera' name)
      console.warn('Permission query failed', e);
    }
  }

  // Check if enumerateDevices is supported at all
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
     console.warn('Media Devices API enumerateDevices not supported');
     // Don't throw immediately, maybe we can assume USB? But let caller handle
     return []; 
  }

  try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log('All devices:', devices.map(d => ({ kind: d.kind, label: d.label, id: d.deviceId })));
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      if (videoDevices.length === 0) {
        console.warn('No video input devices found');
        // Return empty array instead of throwing, let caller handle "no cameras" logic
        // throwing here causes complex catch handling issues
        return [];
      }

      cameras.value = videoDevices;
      return videoDevices;
  } catch (err) {
      console.error('Error enumerating devices:', err);
      return [];
  }
};

// Auto-select the best available camera
const autoSelectBestCamera = async () => {
  try {
    let availableCameras = await getCameras();
    
    // If initial check returns no cameras, try requesting permission
    if (availableCameras.length === 0) {
      console.log('Initial getCameras found no devices. Requesting permission via getUserMedia...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(t => t.stop());
        // Try listing again
        availableCameras = await getCameras();
      } catch (e) {
         console.warn('getUserMedia failed during fallback:', e);
         // If this fails, we definitely have no camera access
      }
    }
    
    if (availableCameras.length === 0) {
      console.log('No cameras available after permission request. Switching to USB.');
      // Force UI update
      await nextTick();
      scannerType.value = 'usb';
      error.value = null; // Clear error to avoid cluttering the USB view
      console.log('Set scannerType to usb and cleared error');
      
      // Set a friendly message instead of an error
      addUSBLog('⚠️ No camera found. Switched to manual/USB mode.');
      return;
    }
    
    // Prefer rear camera for better barcode scanning
    const rearCamera = availableCameras.find(camera => 
      camera.label.toLowerCase().includes('back') ||
      camera.label.toLowerCase().includes('rear') ||
      camera.label.toLowerCase().includes('environment')
    );
    
    selectedCamera.value = rearCamera?.deviceId || availableCameras[0].deviceId;
    cameras.value = availableCameras; // Ensure reactive state is updated
    await initializeScanner();
    addUSBLog(`✅ Auto-selected camera: ${getCameraLabel(rearCamera || availableCameras[0])}`);
    
  } catch (err) {
    // If no camera found, automatically switch to USB mode to avoid "white screen" of death
    if (err.name === 'NotFoundError' || err.message.includes('No cameras') || err.message.includes('Requested device not found') || err.message.includes('Requested deviuce not found')) {
       console.log('No camera found, switching to USB mode UI automatically.');
       scannerType.value = 'usb';
       // Clear the error so it doesn't show as a failure
       error.value = null; 
       return;
    }

    console.error('Camera auto-selection failed:', err);
    error.value = 'Camera initialization failed: ' + err.message;

    // Show manual switch option even if error persists
    if (!cameras.value || cameras.value.length === 0) {
       error.value += ' - Please connect a USB scanner or switch to manual entry.';
       // Force USB switch if we really have no cameras
       scannerType.value = 'usb';
    }
  }
};

// Lazy load and memoize ZXing
let zxingReaderPromise = null;
const getZXingReader = async () => {
  if (!zxingReaderPromise) {
    zxingReaderPromise = import('@zxing/browser').then(({ BrowserMultiFormatReader }) => {
      return new BrowserMultiFormatReader();
    });
  }
  return zxingReaderPromise;
};

// Debounce successful scans
let lastScanTime = 0;
const DEBOUNCE_MS = 2000;

// Vibrate on scan (mobile)
const vibrateOnScan = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(100);
  }
};

// Play beep sound
const playBeepSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.warn('Audio beep failed');
  }
};

const addUSBLog = (message) => {
  usbLogs.value.push({
    timestamp: new Date().toLocaleTimeString(),
    message
  });
  
  // Keep only last 10 logs
  if (usbLogs.value.length > 10) {
    usbLogs.value.shift();
  }
};

// USB Scanner Functions
const connectUSBScanner = async () => {
  if (!serialSupported.value) {
    error.value = 'Web Serial API not supported in this browser. Use Chrome/Edge.';
    return;
  }

  usbConnecting.value = true;
  error.value = null;
  
  try {
    addUSBLog('Requesting USB port...');
    
    // Request a port
    usbPort.value = await navigator.serial.requestPort();
    
    addUSBLog('Opening connection...');
    
    // Open the port
    await usbPort.value.open({
      baudRate: usbSettings.value.baudRate,
      dataBits: usbSettings.value.dataBits,
      parity: usbSettings.value.parity,
      stopBits: usbSettings.value.stopBits
    });

    usbConnected.value = true;
    addUSBLog(`Connected at ${usbSettings.value.baudRate} baud`);

    // Start reading
    startUSBReading();
    
  } catch (err) {
    console.error('USB connection error:', err);
    error.value = 'Failed to connect USB scanner: ' + err.message;
    addUSBLog('Connection failed: ' + err.message);
  } finally {
    usbConnecting.value = false;
  }
};

const startUSBReading = async () => {
  if (!usbPort.value || !usbPort.value.readable) return;

  try {
    usbReader.value = usbPort.value.readable.getReader();
    addUSBLog('Started reading from scanner...');

    while (usbConnected.value && usbReader.value) {
      const { value, done } = await usbReader.value.read();
      
      if (done) {
        addUSBLog('Reading completed');
        break;
      }

      // Convert bytes to string
      const text = new TextDecoder().decode(value);
      const barcode = text.trim();
      
      if (barcode && barcode.length > 0) {
        addUSBLog(`Scanned: ${barcode}`);
        handleBarcodeDetected(barcode);
      }
    }
  } catch (err) {
    console.error('USB reading error:', err);
    addUSBLog('Reading error: ' + err.message);
    
    if (err.name !== 'NetworkError') {
      error.value = 'USB reading error: ' + err.message;
    }
  }
};

const disconnectUSBScanner = async () => {
  try {
    if (usbReader.value) {
      await usbReader.value.cancel();
      await usbReader.value.releaseLock();
      usbReader.value = null;
    }

    if (usbPort.value) {
      await usbPort.value.close();
      usbPort.value = null;
    }

    usbConnected.value = false;
    addUSBLog('Disconnected');
  } catch (err) {
    console.error('Disconnect error:', err);
    addUSBLog('Disconnect error: ' + err.message);
  }
};

const updateUSBSettings = async () => {
  if (!usbConnected.value) return;
  
  addUSBLog('Updating settings...');
  await disconnectUSBScanner();
  await connectUSBScanner();
};

// Keyboard Input Functions
const focusKeyboardInput = () => {
  nextTick(() => {
    usbKeyboardInput.value?.focus();
  });
};

const handleKeyboardInput = (event) => {
  // Handle Enter key
  if (event.key === 'Enter') {
    event.preventDefault();
    const barcode = keyboardInput.value.trim();
    if (barcode) {
      handleBarcodeDetected(barcode);
      keyboardInput.value = '';
    }
  }
};

const handleKeyboardScan = () => {
  // Auto-detect when barcode ends with newline/carriage return
  const value = keyboardInput.value;
  if (value.includes('\n') || value.includes('\r')) {
    const barcode = value.replace(/[\n\r]/g, '').trim();
    if (barcode) {
      handleBarcodeDetected(barcode);
      keyboardInput.value = '';
    }
  }
};

const handleBarcodeDetected = (barcode) => {
  console.log('Barcode detected in BarcodeScanner.vue:', barcode);
  const now = Date.now();
  if (barcode && barcode !== lastResult.value && now - lastScanTime > DEBOUNCE_MS) {
    console.log('Barcode passed debounce and uniqueness checks:', barcode);
    lastResult.value = barcode;
    lastScanTime = now;
    playBeepSound();
    vibrateOnScan();
    
    // ✅ Automatically emit the barcode without waiting for user to click button
    setTimeout(() => {
      console.log('Sending barcode-detected event to parent (auto-confirm):', barcode);
      emit('barcode-detected', barcode);
      closeScanner();
    }, 300); // Brief delay to allow user to see the detected barcode
  } else {
    console.log('Barcode ignored (duplicate or debounced):', barcode, { lastResult: lastResult.value, timeSinceLast: now - lastScanTime });
  }
};

const getCameraLabel = (camera) => {
  if (!camera.label) {
    return `Camera ${cameras.value.indexOf(camera) + 1}`;
  }

  const lower = camera.label.toLowerCase();
  if (lower.includes('back') || lower.includes('rear') || lower.includes('environment')) {
    return 'Back Camera';
  }
  if (lower.includes('front') || lower.includes('selfie') || lower.includes('user')) {
    return 'Front Camera';
  }

  return camera.label;
};

const getFacingModeForDevice = (deviceId) => {
  const cam = cameras.value.find(c => c.deviceId === deviceId);
  if (!cam || !cam.label) return 'environment';

  const lower = cam.label.toLowerCase();
  if (lower.includes('front') || lower.includes('selfie') || lower.includes('user')) {
    return 'user';
  }
  return 'environment';
};

const initializeScanner = async () => {
  console.log('initializeScanner called. Type:', scannerType.value);
  if (scannerType.value === 'usb') {
    // For USB mode, just focus the keyboard input
    focusKeyboardInput();
    return;
  }

  // Camera initialization logic
  initializing.value = true;
  error.value = null;
  lastResult.value = '';
  lastScanTime = 0;

  try {
    console.log('initializeScanner: Getting cameras...');
    const videoDevices = await getCameras();
    console.log('initializeScanner: Cameras found:', videoDevices.length, videoDevices.map(d => d.label || d.deviceId));

    const backCamera = videoDevices.find(cam => {
      const lower = cam.label?.toLowerCase() || '';
      return lower.includes('back') || lower.includes('rear') || lower.includes('environment');
    });

    if (videoDevices.length > 0) {
      selectedCamera.value = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;
    } else {
      console.warn('initializeScanner: No devices found to select');
      return;
    }
    console.log('Selected camera ID:', selectedCamera.value);

    await startScanner();
  } catch (err) {
    console.error('Initialization error:', err);
    error.value = err.message || 'Failed to access camera. Please allow permissions.';
  } finally {
    initializing.value = false;
  }
};

const startScanner = async () => {
  console.log('startScanner called');
  stopScanning();

  try {
    const facingMode = getFacingModeForDevice(selectedCamera.value);
    console.log('Camera facing mode:', facingMode);

    const constraints = {
      video: {
        deviceId: selectedCamera.value ? { exact: selectedCamera.value } : undefined,
        facingMode: { ideal: facingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    console.log('Requesting getUserMedia with constraints:', JSON.stringify(constraints));
    stream.value = await navigator.mediaDevices.getUserMedia(constraints);
    console.log('Stream obtained:', stream.value.id);

    // Wait for video element to be available (sometimes delayed due to Modal/Teleport)
    if (!videoElement.value) {
      console.log('Waiting for video element ref...');
      await nextTick();
      // Retry once after a short delay if still null
      if (!videoElement.value) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    if (videoElement.value) {
      console.log('Video element found. Attaching stream...');
      videoElement.value.srcObject = stream.value;

      await new Promise((resolve) => {
        if (videoElement.value.readyState >= 2) {
          resolve();
        } else {
          videoElement.value.addEventListener('loadeddata', resolve, { once: true });
        }
      });

      const videoTrack = stream.value.getVideoTracks()[0];
      if (videoTrack && typeof videoTrack.getCapabilities === 'function') {
        const capabilities = videoTrack.getCapabilities();
        supportsTorch.value = !!capabilities.torch;
        flashlightOn.value = false;
      }

      scanning.value = true;
      startScanning();
      animateScanLine();
    } else {
      console.warn('Video element ref not found even after waiting');
      // Fallback: try to find by tag if ref fails
      const manualVideo = document.querySelector('video');
      if (manualVideo) {
         videoElement.value = manualVideo;
         manualVideo.srcObject = stream.value;
         scanning.value = true;
         startScanning();
         animateScanLine();
      } else {
         throw new Error('Video display element not found');
      }
    }
  } catch (err) {
    console.error('Camera start error:', err);
    error.value = err.name === 'NotAllowedError' 
      ? 'Camera permission denied. Please allow in browser settings.' 
      : 'Failed to start camera: ' + err.message;
  }
};

const startScanning = () => {
  if (useNativeScanner) {
    console.log('Starting native BarcodeDetector scan loop');
    startNativeScanning();
  } else {
    console.log('Starting ZXing scan loop');
    startZXingScanning();
  }
};

const startNativeScanning = () => {
  const formats = ['ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a', 'upc_e', 'qr_code'];
  const detector = new BarcodeDetector({ formats });

  scanInterval.value = setInterval(async () => {
    if (!videoElement.value || !scanning.value) return;

    try {
      const barcodes = await detector.detect(videoElement.value);
      if (barcodes.length > 0) {
        const rawValue = barcodes[0].rawValue?.trim();
        if (rawValue) {
          handleBarcodeDetected(rawValue);
        }
      }
    } catch (err) {
      console.warn('Native scan error:', err);
    }
  }, 500);
};

const startZXingScanning = async () => {
  try {
    const codeReader = await getZXingReader();

    scanInterval.value = setInterval(async () => {
      if (!videoElement.value || !scanning.value) return;

      try {
        const result = await codeReader.decodeOnceFromVideoElement(videoElement.value);
        const text = result?.getText()?.trim();
        if (text) {
          handleBarcodeDetected(text);
        }
      } catch (err) {
        if (err.message !== 'NotFoundException') {
          console.warn('ZXing scan error:', err);
        }
      }
    }, 500);
  } catch (err) {
    console.error('ZXing load error:', err);
    error.value = 'Scanner not supported';
  }
};

const animateScanLine = () => {
  let direction = 1;
  const interval = setInterval(() => {
    if (scanning.value) {
      scanLinePosition.value += direction * 0.5;
      if (scanLinePosition.value >= 95) direction = -1;
      if (scanLinePosition.value <= 5) direction = 1;
    } else {
      clearInterval(interval);
    }
  }, 20);
};

const switchCamera = async () => {
  if (cameras.value.length <= 1) return;
  
  const currentIndex = cameras.value.findIndex(c => c.deviceId === selectedCamera.value);
  const nextIndex = (currentIndex + 1) % cameras.value.length;
  selectedCamera.value = cameras.value[nextIndex].deviceId;
  
  await startScanner();
};

const toggleFlashlight = async () => {
  try {
    const videoTrack = stream.value?.getVideoTracks()[0];
    if (!videoTrack || typeof videoTrack.getCapabilities !== 'function') return;

    const capabilities = videoTrack.getCapabilities();
    if (!capabilities.torch) return;

    const newState = !flashlightOn.value;
    await videoTrack.applyConstraints({
      advanced: [{ torch: newState }]
    });
    flashlightOn.value = newState;
  } catch (err) {
    console.error('Torch error:', err);
    error.value = 'Flashlight not supported on this device';
  }
};

const confirmBarcode = () => {
  if (lastResult.value) {
    emit('barcode-detected', lastResult.value);
    closeScanner();
  }
};

const stopScanning = () => {
  scanning.value = false;

  if (scanInterval.value) {
    clearInterval(scanInterval.value);
    scanInterval.value = null;
  }

  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop());
    stream.value = null;
  }

  if (videoElement.value) {
    videoElement.value.srcObject = null;
  }
};

const closeScanner = async () => {
  stopScanning();
  await disconnectUSBScanner();
  emit('close');
};

// Lifecycle
onMounted(() => {
  console.log('BarcodeScanner mounted. ShowScanner:', props.showScanner);
  if (props.showScanner) {
    // Auto-detect and connect on first open
    autoDetectAndConnect();
  }
});

onUnmounted(() => {
  console.log('BarcodeScanner unmounting');
  stopScanning();
  disconnectUSBScanner();
});

watch(() => props.showScanner, async (newValue) => {
  console.log('watch(showScanner):', newValue);
  if (newValue) {
    // Auto-detect and connect when scanner opens
    if (!autoConnectionAttempted.value) {
      await autoDetectAndConnect();
    } else {
      await initializeScanner();
    }
  } else {
    stopScanning();
    await disconnectUSBScanner();
    // Reset auto-connection attempt when scanner closes
    autoConnectionAttempted.value = false;
  }
});

watch(scannerType, (newType) => {
  if (newType === 'camera') {
    initializeScanner();
  } else {
    stopScanning();
    focusKeyboardInput();
  }
});
</script>

<style scoped>
.scanning-line {
  animation: scan 2.5s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
  opacity: 0.8;
}

@keyframes scan {
  0% { top: 5%; opacity: 0.5; }
  50% { top: 95%; opacity: 0.9; }
  100% { top: 5%; opacity: 0.5; }
}

video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}
</style>
