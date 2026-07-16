<template>
  <div class="group relative bg-white border border-gray-200 hover:border-[#2F2E8B] transition-colors duration-300 flex flex-col h-full rounded-sm overflow-hidden">
    <!-- Card Header / Image Area (Compact) -->
    <div class="relative h-36 bg-gray-50 border-b border-gray-100 group-hover:bg-[#2F2E8B]/5 transition-colors">
      <!-- Background Pattern -->
      <div 
        class="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
        style="background-image: radial-gradient(#2F2E8B 1px, transparent 1px); background-size: 10px 10px;"
      ></div>
      
      <!-- Avatar / Icon Center (Compact) -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div v-if="t.avatar_url" class="relative w-16 h-16">
          <div class="absolute inset-0 bg-[#2F2E8B] blur-xl opacity-20 rounded-full"></div>
          <img :src="t.avatar_url" class="relative w-full h-full object-cover rounded-full border-2 border-white shadow-md grayscale group-hover:grayscale-0 transition-all duration-500" @error="onAvatarError" />
        </div>
        <div v-else class="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-gray-100">
           <span class="font-black text-lg text-gray-400 font-mono">{{ getInitials(t.name) }}</span>
        </div>
      </div>

      <!-- Top Left Label -->
      <div class="absolute top-3 left-3">
        <div class="w-6 h-6 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm opacity-60">
          <i class="fas fa-code-branch text-[#2F2E8B] text-[10px]"></i>
        </div>
      </div>

      <!-- Top Right: Status Badge -->
      <div class="absolute top-3 right-3 flex flex-col items-end">
         <div class="flex items-center gap-1.5 px-1.5 py-0.5 bg-white border border-[#2F2E8B]/20 text-[#2F2E8B] text-[9px] font-bold tracking-wider uppercase rounded-sm">
            <span class="w-1 h-1 rounded-full bg-[#2F2E8B] animate-pulse"></span>
            Verified
         </div>
      </div>
    </div>

    <!-- Content Body -->
    <div class="p-5 flex-1 flex flex-col">
      <div class="flex items-center justify-between mb-2">
         <span class="text-[9px] font-mono text-[#2F2E8B] tracking-widest uppercase">Success Story</span>
      </div>
      
      <h3 class="text-sm font-black text-gray-900 leading-tight mb-3 uppercase tracking-tight group-hover:text-[#2F2E8B] transition-colors">
        {{ t.name }}
      </h3>

      <!-- Testimonial/Description (Truncated) -->
      <div class="mb-4 relative">
        <p class="text-xs text-gray-600 leading-relaxed font-mono line-clamp-3 relative z-0">
          "{{ t.message }}"
        </p>
      </div>

       <!-- Tags -->
      <div class="mt-auto mb-4 flex flex-wrap gap-2">
         <span class="px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[9px] font-mono uppercase border border-gray-100">
            {{ t.role || 'User' }}
         </span>
         <span class="px-1.5 py-0.5 bg-[#2F2E8B] text-white text-[9px] font-mono uppercase">
            Ref: {{ generateRef(index) }}
         </span>
      </div>

      <!-- Technical Footer (The Grid) -->
      <div class="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
         <div>
            <div class="flex items-center gap-1 mb-0.5">
               <i class="fas fa-map-marker-alt text-[#2F2E8B] text-[9px]"></i>
               <span class="text-[9px] font-mono text-gray-400 uppercase">LOC //</span>
            </div>
            <div class="text-[10px] font-bold text-gray-800 uppercase tracking-tight truncate">
               {{ t.company || 'Unknown' }}
            </div>
         </div>
         
         <div class="col-span-1">
             <div class="flex items-center gap-1 mb-0.5">
               <i class="fas fa-calendar-alt text-[#2F2E8B] text-[9px]"></i>
               <span class="text-[9px] font-mono text-gray-400 uppercase">DATE</span>
            </div>
             <div class="text-[10px] font-bold text-gray-800 uppercase tracking-tight font-mono">
               {{ formatDate() }}
            </div>
         </div>
      </div>
    </div>

    <!-- Hover Corner Accent -->
    <div class="absolute bottom-0 right-0 w-0 h-0 border-b-[15px] border-r-[15px] border-b-[#2F2E8B] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  t: Object,
  index: Number
});

const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
};

const generateRef = (index) => {
  return `A${index + 1}`.padStart(2, '0');
};

const formatDate = () => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const now = new Date();
  return `${months[now.getMonth()]} ${now.getFullYear()}`;
};

const onAvatarError = (e) => {
    e.target.style.display = 'none';
}
</script>

<style scoped>
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
</style>
