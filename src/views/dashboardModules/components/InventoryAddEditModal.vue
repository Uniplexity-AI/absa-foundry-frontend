<template>
  <Teleport to="#modal-target">
  <!-- Modal Container with backdrop - ULTRA HIGH Z-INDEX -->
  <div class="fixed inset-0 z-[200000] overflow-y-auto overflow-x-hidden">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-md cursor-pointer" @click="$emit('close')"></div>
    
    <!-- Modal Content Centering Wrapper -->
    <div class="min-h-full flex items-center justify-center p-2 md:p-6 pointer-events-none">
      <div class="relative bg-white border border-gray-200 shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] rounded-none pointer-events-auto">
      <!-- Header -->
      <div class="h-1.5 w-full bg-[#2F2E8B]"></div>
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div class="flex items-center gap-4">
          <div class="h-10 w-10 bg-indigo-50 flex items-center justify-center text-[#2F2E8B] rounded-none">
            <i :class="isEditing ? 'fas fa-edit' : 'fas fa-plus-square'" class="text-lg"></i>
          </div>
          <div>
            <div class="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
              {{ isEditing ? 'Edit Entry' : 'New Entry' }}
            </div>
            <div class="text-sm font-black text-gray-900 uppercase tracking-tight">
              {{ isEditing ? 'Update Item' : 'Add New Item' }}
            </div>
          </div>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-900 w-10 h-10 flex items-center justify-center hover:bg-gray-100">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Content -->
      <form @submit.prevent="$emit('submit')" class="flex flex-col flex-1 overflow-hidden">
        <div class="p-6 overflow-y-auto flex-1 space-y-6">
          <!-- Type Selector -->
          <div class="flex flex-col gap-3">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Item Type</label>
            <div class="flex p-1 bg-gray-50 border border-gray-200 rounded-none">
              <button 
                v-for="itemType in ['product', 'equipment', 'service']" 
                :key="itemType"
                type="button"
                @click="$emit('update:type', itemType)"
                :class="[
                  'flex-1 py-3 text-[10px] font-mono font-black uppercase tracking-widest transition-all rounded-none',
                  type === itemType ? 'bg-[#2F2E8B] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                ]"
              >
                {{ itemType }}
              </button>
            </div>
          </div>

          <!-- Name Field -->
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
              Item Name <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.name" 
              type="text" 
              required
              placeholder="Enter item name"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
            />
          </div>

          <!-- Category and Supplier -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Category</label>
              <input
                v-model="form.category"
                list="inventory-category-options"
                type="text"
                placeholder="Select or type custom category"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
              <datalist id="inventory-category-options">
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </datalist>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Supplier</label>
              <select 
                v-model="form.supplier"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              >
                <option value="">Select Supplier</option>
                <option value="Local">Local</option>
                <option value="International">International</option>
                <option v-for="s in suppliersFiltered" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
          </div>

          <!-- Branch -->
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Branch</label>
            <select
              v-model="form.itemBranch"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
            >
              <option value="main">Main Branch</option>
              <option v-for="b in branches" :key="b._id || b.id" :value="b._id || b.id">{{ b.name }}</option>
            </select>
          </div>

          <!-- Primary SKU/Barcode + Extra Barcodes -->
          <div class="flex flex-col gap-3 p-4 bg-gray-50 border border-gray-200">
            <div class="flex items-center gap-2">
              <i class="fas fa-barcode text-[#2F2E8B]"></i>
              <label class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">
                {{ type === 'equipment' ? 'Part Number / Barcodes' : 'SKU / Barcodes' }}
              </label>
            </div>

            <!-- Primary barcode -->
            <div class="flex flex-col gap-1">
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Primary Barcode</span>
              <div class="flex items-center gap-2">
                <input 
                  v-model="form.sku" 
                  type="text"
                  placeholder="Enter or scan barcode"
                  class="inventory-scanner-input flex-1 px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
                <button 
                  type="button" 
                  @click="$emit('open-scanner')"
                  class="px-4 py-3 bg-indigo-50 text-[#2F2E8B] border border-indigo-100 rounded-none hover:bg-indigo-100 transition-colors"
                  title="Scan barcode"
                >
                  <i class="fas fa-barcode"></i>
                </button>
              </div>
            </div>

            <!-- Additional barcodes -->
            <div v-if="form.extra_barcodes && form.extra_barcodes.length > 0" class="flex flex-col gap-2">
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase">Additional Barcodes</span>
              <div v-for="(_, idx) in form.extra_barcodes" :key="idx" class="flex items-center gap-2">
                <input 
                  v-model="form.extra_barcodes[idx]"
                  type="text"
                  :placeholder="`Barcode ${idx + 2}`"
                  class="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
                <button 
                  type="button"
                  @click="form.extra_barcodes.splice(idx, 1)"
                  class="px-3 py-2.5 bg-red-50 text-red-500 border border-red-100 rounded-none hover:bg-red-100 transition-colors"
                  title="Remove barcode"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>

            <button 
              type="button"
              @click="form.extra_barcodes = [...(form.extra_barcodes || []), '']"
              class="self-start flex items-center gap-2 px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-[#2F2E8B] bg-indigo-50 border border-indigo-100 rounded-none hover:bg-indigo-100 transition-colors"
            >
              <i class="fas fa-plus text-[9px]"></i> Add Another Barcode
            </button>
          </div>

          <!-- Stock Quantity -->
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Stock Quantity</label>
            <input 
              v-model.number="form.stockQty" 
              type="number" 
              step="1"
              min="0"
              placeholder="0"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
            />
          </div>

          <!-- Product Fields -->
          <div v-if="type === 'product'" class="space-y-4">
            <!-- Unit Settings -->
            <div class="p-6 bg-indigo-50/30 border border-indigo-100/50 space-y-4">
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2">
                  <i class="fas fa-ruler-combined text-[#2F2E8B]"></i>
                  <label class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Unit Settings</label>
                </div>
                <!-- Unit Settings Toggle -->
                <button 
                  type="button"
                  @click="form.is_unit_conversion_enabled = !form.is_unit_conversion_enabled"
                  class="flex items-center gap-2 px-2 py-1 rounded-none border transition-all"
                  :class="form.is_unit_conversion_enabled ? 'bg-[#2F2E8B] border-[#2F2E8B] text-white' : 'bg-white border-gray-200 text-gray-400'"
                >
                  <span class="text-[8px] font-mono font-black uppercase">{{ form.is_unit_conversion_enabled ? 'Enabled' : 'Disabled' }}</span>
                  <i :class="['fas', form.is_unit_conversion_enabled ? 'fa-toggle-on' : 'fa-toggle-off']"></i>
                </button>
              </div>

              <div v-if="form.is_unit_conversion_enabled" class="space-y-4 pt-2 border-t border-indigo-100/50">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-[8px] font-mono font-black text-gray-400 uppercase">Measurement Type</label>
                    <select 
                      v-model="form.measurement_type"
                      class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#2F2E8B]"
                    >
                      <option value="count">Count (pcs, box)</option>
                      <option value="weight">Weight (kg, g)</option>
                      <option value="volume">Volume (L, ml)</option>
                      <option value="length">Length (m, cm)</option>
                    </select>
                  </div>

                  <div class="flex flex-col gap-2">
                    <label class="text-[8px] font-mono font-black text-gray-400 uppercase">Base Unit (Stocking)</label>
                    <input 
                      v-model="form.base_unit" 
                      type="text" 
                      placeholder="e.g. kg"
                      class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#2F2E8B]"
                    />
                  </div>

                  <div class="flex flex-col gap-2">
                    <label class="text-[8px] font-mono font-black text-gray-400 uppercase">Sales Unit</label>
                    <input 
                      v-model="form.sales_unit" 
                      type="text" 
                      placeholder="e.g. g"
                      class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#2F2E8B]"
                    />
                  </div>
                </div>

                <div class="flex items-center gap-4 p-3 bg-white border border-gray-100">
                  <div class="flex-1">
                    <label class="text-[8px] font-mono font-black text-gray-400 uppercase">Conversion Factor</label>
                    <div class="text-[10px] text-gray-500 mt-1">1 {{ form.sales_unit }} = {{ form.conversion_factor }} {{ form.base_unit }}</div>
                  </div>
                  <input 
                    v-model.number="form.conversion_factor"
                    type="number" 
                    step="0.0001"
                    class="w-32 px-4 py-2 bg-gray-50 border border-gray-200 rounded-none text-xs font-mono"
                  />
                </div>
              </div>

              <!-- Batch Toggle -->
              <div class="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  v-model="form.is_batch_enabled" 
                  id="is_batch_enabled" 
                  class="h-4 w-4 text-[#2F2E8B] border-gray-300 rounded"
                />
                <label for="is_batch_enabled" class="text-[9px] font-mono font-bold text-gray-600 uppercase">
                  Enable Batch/Group Pricing (Trays, Crates, etc)
                </label>
              </div>

              <div v-if="form.is_batch_enabled" class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                <div class="flex flex-col gap-2">
                  <label class="text-[8px] font-mono font-black text-gray-400 uppercase">Batch Name</label>
                  <input 
                    v-model="form.batch_name" 
                    type="text" 
                    placeholder="e.g. Tray"
                    class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#2F2E8B]"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label class="text-[8px] font-mono font-black text-gray-400 uppercase">Items per Batch</label>
                  <input 
                    v-model.number="form.batch_size" 
                    type="number" 
                    min="1"
                    class="w-full px-4 py-2 bg-white border border-gray-200 rounded-none text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#2F2E8B]"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">
                  Buying Price (Per {{ form.is_batch_enabled ? (form.batch_name || 'Batch') : form.sales_unit }})
                </label>
                <input 
                  v-model.number="form.buyingPrice" 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
                <div class="text-[9px] font-mono text-gray-400">≈ {{ buyingPricePerBaseUnit }} per {{ form.base_unit }}</div>
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between">
                  <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Selling Price (Per {{ form.sales_unit }})</label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      v-model="form.is_free"
                      class="rounded-sm border-gray-300 text-[#2F2E8B] focus:ring-[#2F2E8B]"
                    />
                    <span class="text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-widest">Free Item</span>
                  </label>
                </div>
                <input 
                  v-model.number="form.sellingPrice" 
                  type="number" 
                  step="0.01"
                  min="0"
                  :placeholder="form.is_free ? '0.00 (Free)' : '0.00'"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                />
                <div class="text-[9px] font-mono text-gray-400">≈ {{ sellingPricePerBaseUnit }} per {{ form.base_unit }}</div>
              </div>
            </div>

            <!-- Price Analysis Preview -->
            <div class="p-4 bg-gray-900 text-white rounded-none space-y-2">
               <div class="text-[8px] font-mono text-indigo-300 uppercase tracking-widest">Price Configuration Preview</div>
               <div class="flex flex-wrap gap-x-8 gap-y-2">
                 <div class="flex flex-col">
                   <span class="text-[8px] uppercase text-gray-400">Base Unit Cost ({{ form.base_unit }})</span>
                   <span class="text-xs font-black text-emerald-400">{{ buyingPricePerBaseUnit }}</span>
                 </div>
                 <div class="flex flex-col">
                   <span class="text-[8px] uppercase text-gray-400">Sales Unit Price ({{ form.sales_unit }})</span>
                   <span class="text-xs font-black text-white">{{ form.sellingPrice || '0.00' }}</span>
                 </div>
                 <div v-if="form.is_batch_enabled" class="flex flex-col">
                   <span class="text-[8px] uppercase text-gray-400">{{ form.batch_name || 'Batch' }} Cost</span>
                   <span class="text-xs font-black text-amber-400">{{ Number(form.buyingPrice || 0).toFixed(2) }}</span>
                 </div>
                 <div v-if="form.is_batch_enabled" class="flex flex-col">
                   <span class="text-[8px] uppercase text-gray-400">{{ form.batch_name || 'Batch' }} Price</span>
                   <span class="text-xs font-black text-blue-400">{{ batchSellingPrice }}</span>
                 </div>
               </div>
            </div>

            <div class="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-none">
              <input 
                type="checkbox" 
                v-model="form.vatApplicable" 
                id="vatApplicable" 
                class="h-4 w-4 text-[#2F2E8B] border-gray-300 rounded"
              />
              <label for="vatApplicable" class="text-[10px] font-mono font-bold text-gray-600 uppercase">
                VAT Applicable (Charge tax for this item)
              </label>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Buying Date</label>
                <input 
                  v-model="form.buyingDate" 
                  type="date"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Expiry Date</label>
                <input 
                  v-model="form.expiryDate" 
                  type="date"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Equipment Fields -->
          <div v-if="type === 'equipment'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Equipment Buying Price</label>
                <input 
                  v-model.number="form.equipmentBuyingPrice" 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Equipment Price</label>
                <input 
                  v-model.number="form.equipmentPrice" 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Equipment Buying Date</label>
              <input 
                v-model="form.equipmentBuyingDate" 
                type="date"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Equipment Description</label>
              <textarea 
                v-model="form.equipmentDescription"
                rows="3"
                placeholder="Additional equipment details..."
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Service Fields -->
          <div v-if="type === 'service'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Service Price</label>
                <input 
                  v-model.number="form.price" 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Labor Cost</label>
                <input 
                  v-model.number="form.laborCost" 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Duration</label>
                <input 
                  v-model="form.duration" 
                  type="text"
                  placeholder="e.g. 30 mins"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Staff</label>
                <input 
                  v-model="form.staff" 
                  type="text"
                  placeholder="Staff member name"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Availability</label>
                <input 
                  v-model="form.availability" 
                  type="text"
                  placeholder="e.g. By appointment"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Description (for non-equipment) -->
          <div v-if="type !== 'equipment'" class="flex flex-col gap-2">
            <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Description</label>
            <textarea 
              v-model="form.description"
              rows="3"
              placeholder="Additional notes..."
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- Stock Thresholds -->
          <div v-if="type !== 'service'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Low Stock Threshold</label>
              <input 
                v-model.number="form.lowStockThreshold" 
                type="number" 
                step="1"
                min="0"
                placeholder="10"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Critical Stock Threshold</label>
              <input 
                v-model.number="form.criticalStockThreshold" 
                type="number" 
                step="1"
                min="0"
                placeholder="5"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
              />
            </div>
          </div>

          <!-- Expiry Reminder Settings (only for products) -->
          <div v-if="type === 'product'" class="p-4 bg-amber-50/50 border border-amber-200 space-y-3">
            <div class="flex items-center gap-2">
              <i class="fas fa-clock text-amber-600"></i>
              <label class="text-[10px] font-mono font-black text-amber-700 uppercase tracking-widest">Expiry Reminder Settings</label>
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-[8px] font-mono font-bold text-gray-500 uppercase">Remind me before expiry (days)</label>
              <div class="flex items-center gap-3">
                <select
                  v-model.number="form.expiry_reminder_days"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2F2E8B] focus:border-transparent"
                >
                  <option :value="null">No reminder</option>
                  <option :value="1">1 day before</option>
                  <option :value="3">3 days before</option>
                  <option :value="7">7 days before</option>
                  <option :value="14">14 days before</option>
                  <option :value="30">30 days before</option>
                  <option :value="60">60 days before</option>
                  <option :value="90">90 days before</option>
                </select>
                <span class="text-[9px] font-mono text-gray-400 whitespace-nowrap" v-if="form.expiry_reminder_days">
                  Alert {{ form.expiry_reminder_days }} day(s) before
                </span>
              </div>
            </div>
            <div v-if="form.expiryDate" class="text-[9px] font-mono text-gray-500">
              <span class="font-bold">Expiry:</span> {{ form.expiryDate }}
              <span v-if="form.expiry_reminder_days" class="text-amber-600">
                · Reminder: {{ calculateReminderDate(form.expiryDate, form.expiry_reminder_days) }}
              </span>
            </div>
          </div>

          <!-- Image Attachments -->
          <div class="p-4 bg-gray-50 border border-gray-200 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i class="fas fa-images text-[#2F2E8B]"></i>
                <label class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Item Images</label>
              </div>
              <span class="text-[8px] font-mono text-gray-400">Max 5MB each</span>
            </div>

            <!-- Existing Images (for edit mode) -->
            <div v-if="form.images && form.images.length > 0" class="flex flex-wrap gap-2">
              <div v-for="(img, idx) in form.images" :key="idx" class="relative group">
                <img 
                  :src="getImageSrc(img)" 
                  class="w-20 h-20 object-cover border border-gray-200 rounded-none"
                  @error="handleImageError"
                />
                <button
                  type="button"
                  @click="removeImage(img)"
                  class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  title="Remove image"
                >
                  <i class="fas fa-times text-[8px]"></i>
                </button>
              </div>
            </div>

            <!-- Upload new images -->
            <div class="flex items-center gap-3">
              <label class="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-dashed border-gray-300 rounded-none hover:border-[#2F2E8B] transition-colors">
                <i class="fas fa-cloud-upload-alt text-[#2F2E8B]"></i>
                <span class="text-[9px] font-mono font-black text-gray-600 uppercase tracking-widest">Choose Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  class="hidden"
                  @change="handleImageFilesSelected"
                />
              </label>
              <span v-if="pendingImages.length > 0" class="text-[9px] font-mono text-emerald-600">
                {{ pendingImages.length }} image(s) selected
              </span>
            </div>

            <!-- Pending image previews -->
            <div v-if="pendingImages.length > 0" class="flex flex-wrap gap-2">
              <div v-for="(file, idx) in pendingImages" :key="'pending-' + idx" class="relative group">
                <img 
                  :src="getPendingImagePreview(file)" 
                  class="w-20 h-20 object-cover border-2 border-emerald-300 rounded-none opacity-90"
                />
                <button
                  type="button"
                  @click="removePendingImage(idx)"
                  class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow"
                  title="Remove"
                >
                  <i class="fas fa-times text-[8px]"></i>
                </button>
                <div class="absolute bottom-0 left-0 right-0 bg-emerald-500/80 text-white text-[7px] font-mono text-center py-0.5">
                  NEW
                </div>
              </div>
            </div>
          </div>

          <!-- Government Information Section -->
          <div class="border border-gray-200">
            <button
              type="button"
              @click="showGovSection = !showGovSection"
              class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-2">
                <i class="fas fa-shield-alt text-[#2F2E8B] text-xs"></i>
                <span class="text-[10px] font-mono font-black text-[#2F2E8B] uppercase tracking-widest">Government Information</span>
                <span v-if="form.gov_sync_status" 
                  class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none text-[7px] font-black uppercase tracking-widest"
                  :class="form.gov_sync_status === 'synced' ? 'bg-emerald-100 text-emerald-700' : form.gov_sync_status === 'failed' ? 'bg-red-100 text-red-700' : form.gov_sync_status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'">
                  {{ form.gov_sync_status }}
                </span>
              </div>
              <i class="fas fa-chevron-down text-gray-400 text-xs transition-transform" :class="{ 'rotate-180': showGovSection }"></i>
            </button>
            <div v-if="showGovSection" class="p-4 space-y-4 border-t border-gray-200 animate-fade-in">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Government Item Code</span>
                  <input v-model="form.gov_item_code" type="text"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none"
                    placeholder="Auto-generated or manual entry" />
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Classification Code (UNSPSC)</span>
                  <input v-model="form.gov_classification_code" type="text"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none"
                    placeholder="e.g. 50102517" />
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Tax Type</span>
                  <select v-model="form.gov_tax_type"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none">
                    <option value="">Select Tax Type</option>
                    <option value="VAT">VAT</option>
                    <option value="EXCISE">Excise Duty</option>
                    <option value="TOURISM_LEVY">Tourism Levy</option>
                    <option value="IPL">IPL</option>
                    <option value="NONE">None</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">VAT Category</span>
                  <select v-model="form.gov_vat_category"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none">
                    <option value="">Select VAT Category</option>
                    <option value="A">A — Standard Rate (16%)</option>
                    <option value="B">B — Zero Rated (0%)</option>
                    <option value="C">C — Exempt</option>
                    <option value="D">D — Not Registered</option>
                    <option value="E">E — Reverse Charge</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Packaging Unit Code</span>
                  <select v-model="form.gov_packaging_unit"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none">
                    <option value="">Select Package Code</option>
                    <option value="EA">EA — Each</option>
                    <option value="BX">BX — Box</option>
                    <option value="CS">CS — Case</option>
                    <option value="BG">BG — Bag</option>
                    <option value="TN">TN — Tonne</option>
                    <option value="CR">CR — Crate</option>
                    <option value="PL">PL — Pallet</option>
                    <option value="DR">DR — Drum</option>
                    <option value="CN">CN — Can</option>
                    <option value="BO">BO — Bottle</option>
                    <option value="CA">CA — Carton</option>
                    <option value="PK">PK — Pack</option>
                    <option value="RL">RL — Roll</option>
                    <option value="ST">ST — Set</option>
                    <option value="UN">UN — Unit</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Package Qty (units per pkg)</span>
                  <input v-model.number="form.gov_pkg_qty" type="number" min="1" step="1"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none"
                    placeholder="1" />
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Quantity Unit Code</span>
                  <select v-model="form.gov_quantity_unit"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none">
                    <option value="">Select Qty Unit Code</option>
                    <option value="EA">EA — Each</option>
                    <option value="KGS">KGS — Kilograms</option>
                    <option value="LTR">LTR — Litres</option>
                    <option value="MTR">MTR — Metres</option>
                    <option value="TON">TON — Tonnes</option>
                    <option value="GRM">GRM — Grams</option>
                    <option value="MLT">MLT — Millilitres</option>
                    <option value="SQF">SQF — Square Feet</option>
                    <option value="SQM">SQM — Square Metres</option>
                    <option value="CBM">CBM — Cubic Metres</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Country of Origin</span>
                  <input v-model="form.gov_country_of_origin" type="text"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none"
                    placeholder="ZM" />
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">IPL Category Code</span>
                  <select v-model="form.gov_ipl_cat_cd"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none">
                    <option value="">Not Applicable</option>
                    <option value="IPL1">IPL1 — Standard Rate</option>
                    <option value="IPL2">IPL2 — Reduced Rate</option>
                    <option value="IPL3">IPL3 — Exempt</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Tourism Levy Category Code</span>
                  <select v-model="form.gov_tl_cat_cd"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none">
                    <option value="">Not Applicable</option>
                    <option value="TL01">TL01 — Standard Rate</option>
                    <option value="TL02">TL02 — Reduced Rate</option>
                    <option value="TL03">TL03 — Exempt</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Excise Tax Category Code</span>
                  <select v-model="form.gov_excise_cat_cd"
                    class="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none">
                    <option value="">Not Applicable</option>
                    <option value="EX01">EX01 — Standard Rate</option>
                    <option value="EX02">EX02 — Reduced Rate</option>
                    <option value="EX03">EX03 — Exempt</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Acknowledgement Number</span>
                  <input v-model="form.gov_acknowledgement_no" type="text" readonly
                    class="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-none text-[10px] font-mono text-gray-400 uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none cursor-not-allowed"
                    placeholder="Populated by VSDC" />
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Sync Status</span>
                  <input :value="form.gov_sync_status || 'Not Synced'" type="text" readonly
                    class="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-none text-[10px] font-mono font-black uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none cursor-not-allowed"
                    :class="form.gov_sync_status === 'synced' ? 'text-emerald-600' : form.gov_sync_status === 'failed' ? 'text-red-600' : 'text-gray-400'" />
                </label>
                <label class="block">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Last Sync</span>
                  <input :value="form.gov_last_sync_at ? new Date(form.gov_last_sync_at).toLocaleString() : '—'" type="text" readonly
                    class="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-none text-[10px] font-mono text-gray-400 uppercase focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none cursor-not-allowed" />
                </label>
                <label class="block md:col-span-2">
                  <span class="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">Last Sync Error</span>
                  <textarea v-model="form.gov_last_sync_error" readonly rows="2"
                    class="mt-1 w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-none text-[10px] font-mono text-red-500 focus:ring-1 focus:ring-[#2F2E8B] focus:border-[#2F2E8B] outline-none resize-none cursor-not-allowed"
                    placeholder="No errors"></textarea>
                </label>
              </div>
              <div class="flex items-center gap-3 pt-3 border-t border-gray-100">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" v-model="form.gov_enabled" class="sr-only peer" />
                  <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
                <span class="text-[9px] font-mono font-black uppercase tracking-widest" :class="form.gov_enabled ? 'text-emerald-600' : 'text-gray-400'">
                  {{ form.gov_enabled ? 'Government sync enabled' : 'Excluded from government sync' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="flex flex-col sm:flex-row justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200">
          <button 
            type="button" 
            @click="$emit('close')"
            class="w-full sm:w-auto px-6 py-3 text-[10px] font-mono font-black uppercase tracking-widest text-gray-600 bg-white border border-gray-200 rounded-none hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="isSaving"
            class="w-full sm:w-auto px-6 py-3 text-[10px] font-mono font-black uppercase tracking-widest text-white bg-[#2F2E8B] border border-[#2F2E8B] rounded-none hover:bg-[#252470] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSaving" class="flex items-center gap-2">
              <i class="fas fa-spinner fa-spin"></i>
              Saving...
            </span>
            <span v-else>
              {{ isEditing ? 'Update Item' : 'Add Item' }}
            </span>
          </button>
        </div>
      </form>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { watch, onMounted, onErrorCaptured, ref, computed } from 'vue';
import { unitConversions, getMultiplier } from '@/utils/unit_conversions';

// Error boundary
const componentError = ref(null);
onErrorCaptured((err, instance, info) => {
  console.error('InventoryAddEditModal error:', err, info);
  componentError.value = err.message;
  return false;
});

const props = defineProps({
  show: Boolean,
  form: Object,
  type: String,
  categories: Array,
  suppliers: Array,
  branches: { type: Array, default: () => [] },
  isEditing: Boolean,
  isSaving: Boolean,
  tenantId: { type: String, default: '' }
});

const emit = defineEmits(['close', 'submit', 'update:type', 'open-scanner', 'remove-image', 'add-pending-images']);

// Pending images (not yet uploaded - will be uploaded after save)
const pendingImages = ref([]);
const pendingImagePreviews = ref({});

// Suppliers from API minus the hardcoded defaults so there are no duplicates
const suppliersFiltered = computed(() => {
  const defaults = ['local', 'international'];
  return (props.suppliers || []).filter(s => !defaults.includes(String(s).toLowerCase()));
});

// VSDC section collapse state
const showGovSection = ref(false);

// Image helpers
const getImageSrc = (img) => {
  if (!img) return '';
  // If already a full URL, return as-is
  if (img.startsWith('http')) return img;
  // If it's a legacy /uploads/ path, keep it (backwards compatibility)
  if (img.startsWith('/uploads')) return img;
  // Otherwise it's a GridFS file ID — serve via /api/files
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  return `${baseUrl}/api/files/${img}?tenant_id=${encodeURIComponent(props.tenantId)}`;
};

const handleImageError = (e) => {
  e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22%3E%3Crect fill=%22%23f1f5f9%22 width=%2280%22 height=%2280%22/%3E%3Ctext fill=%22%2394a3b8%22 font-size=%228%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E';
};

const handleImageFilesSelected = (event) => {
  const files = Array.from(event.target.files || []);
  if (files.length === 0) return;

  // Validate file sizes (max 5MB each)
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
      event.target.value = '';
      return;
    }
  }

  pendingImages.value = [...pendingImages.value, ...files];
  emit('add-pending-images', files);
  event.target.value = '';
};

const removePendingImage = (idx) => {
  pendingImages.value.splice(idx, 1);
  // Also emit so parent can sync
  emit('remove-image', { pending: idx });
};

const removeImage = (imgUrl) => {
  emit('remove-image', { url: imgUrl, pending: false });
};

const getPendingImagePreview = (file) => {
  if (!pendingImagePreviews.value[file.name]) {
    pendingImagePreviews.value[file.name] = URL.createObjectURL(file);
  }
  return pendingImagePreviews.value[file.name];
};

// Calculate reminder date from expiry date
const calculateReminderDate = (expiryDateStr, days) => {
  if (!expiryDateStr || !days) return '';
  try {
    const expiry = new Date(expiryDateStr);
    expiry.setDate(expiry.getDate() - days);
    return expiry.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (e) {
    return '';
  }
};

// Price calculations
const sellingPricePerBaseUnit = computed(() => {
  if (props.form.is_free) return '0.00';
  const price = Number(props.form.sellingPrice) || 0;
  const factor = Number(props.form.conversion_factor) || 1;
  return (price / factor).toFixed(2);
});

const buyingPricePerBaseUnit = computed(() => {
  let price = Number(props.form.buyingPrice) || 0;
  // If batch is enabled, entered price is for the whole batch
  if (props.form.is_batch_enabled) {
    const size = Number(props.form.batch_size) || 1;
    price = price / size;
  }
  const factor = Number(props.form.conversion_factor) || 1;
  return (price / factor).toFixed(2);
});

const batchSellingPrice = computed(() => {
  if (props.form.is_free) return '0.00';
  const price = Number(props.form.sellingPrice) || 0;
  const size = Number(props.form.batch_size) || 1;
  return (price * size).toFixed(2);
});

// Watch for unit changes to update conversion factor automatically
watch(() => props.form.is_free, (val) => {
  if (val) {
    props.form.sellingPrice = '';
  }
});
watch(() => props.form.sellingPrice, (val) => {
  if (val && Number(val) > 0) {
    props.form.is_free = false;
  }
});

watch(() => [props.form.measurement_type, props.form.base_unit, props.form.sales_unit], ([type, from, to]) => {
  if (type && from && to) {
    props.form.conversion_factor = getMultiplier(type, from, to);
  }
}, { immediate: true });

// Sync calculated prices to form for submission
watch([sellingPricePerBaseUnit, buyingPricePerBaseUnit], ([s, b]) => {
  props.form.selling_price_per_base_unit = s;
  props.form.buying_price_per_base_unit = b;
});

onMounted(() => {
  console.log('✅ InventoryAddEditModal mounted', props);
});

watch(() => props.show, (newVal) => {
  console.log('🔍 Modal show changed:', newVal, 'form:', props.form);
});
</script>

<style scoped>
/* Hide number input spinners for cleaner look */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
