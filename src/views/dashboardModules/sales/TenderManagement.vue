<template>
  <div class="h-full flex flex-col bg-[#F8FAFC] grid-pattern">
    <!-- Tech Grid Header -->
    <header class="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-[40] shadow-sm flex-shrink-0">
      <div class="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="$router.back()" class="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-[#2F2E8B] hover:bg-[#2F2E8B] text-gray-400 hover:text-white transition-all group">
            <i class="fas fa-arrow-left text-xs"></i>
          </button>
          <div class="w-1.5 h-8 bg-[#2F2E8B] rounded-none hidden sm:block"></div>
          <div>
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">MODULE // TENDER_MANAGEMENT</span>
              <div class="h-px w-6 bg-gray-200 hidden sm:block"></div>
            </div>
            <h1 class="text-xl font-black text-gray-900 uppercase tracking-tight font-display leading-none">Tender_Command_Center</h1>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button @click="fetchTenders" class="group relative px-3 py-2 bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#2F2E8B] transition-all">
            <div class="flex items-center gap-1.5 text-[#2F2E8B]">
              <i class="fas fa-sync-alt text-[10px]" :class="{ 'animate-spin': loading }"></i>
              <span class="text-[9px] font-mono font-bold uppercase tracking-wider">REFRESH</span>
            </div>
          </button>
          <button @click="openCreateTenderModal" class="px-3 py-2 bg-[#2F2E8B] text-white hover:bg-[#1a196b] transition-all flex items-center gap-1.5 border border-[#2F2E8B] group relative overflow-hidden">
            <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <i class="fas fa-plus text-[10px] relative z-10"></i>
            <span class="text-[9px] font-mono font-bold uppercase tracking-widest relative z-10">NEW_TENDER</span>
          </button>
        </div>
      </div>
      
      <div class="border-t border-gray-100 bg-gray-50/50">
        <div class="px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            :class="['px-5 py-2.5 text-[9px] font-mono font-bold uppercase tracking-widest transition-all relative group',
              activeTab === tab.id ? 'text-[#2F2E8B] bg-white border-x border-gray-200 border-t-2 border-t-[#2F2E8B]' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 border-t-2 border-transparent']">
            <i :class="tab.icon" class="mr-1.5 text-[11px]"></i>{{ tab.name }}
          </button>
        </div>
      </div>
    </header>

    <div v-if="loading && !tenders.length" class="flex flex-col items-center justify-center flex-1">
      <div class="w-10 h-10 border-4 border-indigo-200 border-t-[#2F2E8B] rounded-full animate-spin mb-4"></div>
      <p class="text-slate-500 font-medium text-sm">Loading tender data...</p>
    </div>

    <main v-else class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
      <div v-if="activeTab === 'dashboard'" class="space-y-5 animate-in fade-in duration-500">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div v-for="kpi in dashboardKpis" :key="kpi.label" class="bg-white border border-gray-100 p-4 shadow-sm relative overflow-hidden group">
            <div class="absolute top-0 left-0 w-1.5 h-full" :class="kpi.color"></div>
            <div class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">{{ kpi.label }}</div>
            <div class="text-xl font-black font-display" :class="kpi.textColor">{{ kpi.value }}</div>
            <div v-if="kpi.sub" class="text-[9px] font-mono font-bold text-gray-400 mt-1 uppercase">{{ kpi.sub }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div class="lg:col-span-2 bg-white border border-gray-100 p-5 shadow-sm">
            <h3 class="text-sm font-black text-gray-900 mb-4 uppercase font-display tracking-tight flex items-center gap-2">
              <i class="fas fa-chart-pipeline text-[#2F2E8B]"></i> Pipeline Overview
            </h3>
            <div class="space-y-2">
              <div v-for="(count, status) in summary?.status_counts || {}" :key="status" class="flex items-center gap-3">
                <div class="w-20 text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest">{{ formatStatus(status) }}</div>
                <div class="flex-1 h-4 bg-gray-50 relative overflow-hidden border border-gray-100">
                  <div class="h-full transition-all duration-700" :class="getStatusBarColor(status)" :style="{ width: maxTenders ? ((count.count / maxTenders) * 100) + '%' : '0%' }"></div>
                </div>
                <div class="w-14 text-right"><span class="text-xs font-black font-display text-gray-900">{{ count.count }}</span><span class="text-[8px] font-mono text-gray-400 ml-1">tenders</span></div>
              </div>
              <div v-if="!summary?.status_counts || !Object.keys(summary.status_counts).length" class="text-gray-400 text-xs font-mono italic py-4 text-center">NO_DATA_AVAILABLE</div>
            </div>
          </div>
          <div class="bg-white border border-gray-100 p-5 shadow-sm">
            <h3 class="text-sm font-black text-gray-900 mb-4 uppercase font-display tracking-tight flex items-center gap-2"><i class="fas fa-clock text-rose-500"></i> Upcoming Deadlines</h3>
            <div class="space-y-2.5 max-h-[260px] overflow-y-auto tech-scroll">
              <div v-for="deadline in (summary?.upcoming_deadlines || [])" :key="deadline.id" class="border-l-2 pl-3 py-1" :class="isDeadlineSoon(deadline.submission_deadline) ? 'border-rose-500' : 'border-[#2F2E8B]'">
                <div class="text-[9px] font-mono font-bold text-gray-900 uppercase truncate">{{ deadline.title }}</div>
                <div class="text-[8px] font-mono text-gray-400">{{ deadline.client_name }}</div>
                <div class="text-[8px] font-mono font-bold mt-1" :class="isDeadlineSoon(deadline.submission_deadline) ? 'text-rose-600' : 'text-[#2F2E8B]'">{{ formatDate(deadline.submission_deadline) }}</div>
              </div>
              <div v-if="!summary?.upcoming_deadlines?.length" class="text-gray-400 text-xs font-mono italic py-4 text-center">NO_UPCOMING_DEADLINES</div>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div class="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-sm font-black text-gray-900 uppercase font-display tracking-tight flex items-center gap-2"><i class="fas fa-list-ul text-[#2F2E8B]"></i> Recent Tenders</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead><tr class="border-b border-gray-100 bg-gray-50/50">
                <th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Tender</th>
                <th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Client</th>
                <th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Value</th>
                <th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Deadline</th>
                <th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr></thead>
              <tbody>
                <tr v-for="tender in tenders.slice(0, 10)" :key="tender.id" class="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors group font-mono">
                  <td class="px-5 py-3"><div class="font-bold text-[11px] text-gray-900 group-hover:text-[#2F2E8B] transition-colors uppercase">{{ tender.title }}</div><div class="text-[8px] text-gray-400 mt-0.5">{{ tender.reference_number }}</div></td>
                  <td class="px-5 py-3"><div class="text-[10px] font-bold text-gray-700 uppercase">{{ tender.client_name }}</div><div class="text-[8px] text-gray-400">{{ tender.industry_sector }}</div></td>
                  <td class="px-5 py-3"><div class="text-[10px] font-bold text-gray-900">{{ formatCurrency(tender.tender_value) }}</div></td>
                  <td class="px-5 py-3"><span :class="getStatusBadgeClass(tender.status)" class="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border">{{ formatStatus(tender.status) }}</span></td>
                  <td class="px-5 py-3"><div class="text-[10px] font-bold" :class="isDeadlineSoon(tender.submission_deadline) ? 'text-rose-600' : 'text-gray-600'">{{ formatDate(tender.submission_deadline) }}</div></td>
                  <td class="px-5 py-3"><div class="flex gap-1">
                    <button @click="openEditTenderModal(tender)" class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#2F2E8B] hover:bg-indigo-50 transition-colors"><i class="fas fa-edit text-[10px]"></i></button>
                    <button @click="deleteTender(tender.id)" class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"><i class="fas fa-trash-alt text-[10px]"></i></button>
                  </div></td>
                </tr>
                <tr v-if="!tenders.length"><td colspan="6" class="px-5 py-10 text-center text-gray-400 text-xs font-mono italic">NO_TENDERS_REGISTERED</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'pipeline'" class="animate-in fade-in duration-500 h-full flex flex-col">
        <div class="flex items-end justify-between mb-4 flex-shrink-0">
          <div><h2 class="text-lg font-black text-gray-900 uppercase font-display tracking-tight">TENDER_PIPELINE</h2><p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">KANBAN_VIEW // {{ tenders.length }} TENDERS</p></div>
        </div>
        <div class="bg-white border border-gray-200 p-2.5 mb-4 flex flex-wrap gap-2 items-center flex-shrink-0">
          <div class="relative flex-1 min-w-[180px]"><i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-gray-300"></i><input v-model="pipelineSearch" type="text" placeholder="SEARCH_TENDERS..." class="w-full pl-7 pr-3 py-1.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[9px] font-bold text-gray-700 placeholder:text-gray-300 uppercase tracking-widest"></div>
          <select v-model="pipelineSectorFilter" class="px-2.5 py-1.5 bg-gray-50 border border-gray-200 font-mono text-[9px] font-bold text-gray-700 uppercase"><option value="all">ALL SECTORS</option><option v-for="s in uniqueSectors" :key="s" :value="s">{{ s }}</option></select>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-6 flex-1 tech-scroll">
          <div v-for="col in pipelineColumns" :key="col.id" class="w-64 flex-shrink-0 flex flex-col">
            <div class="flex items-center justify-between mb-2 px-2 border-b-2 flex-shrink-0" :class="col.borderColor"><span class="text-[9px] font-mono font-bold text-gray-900 uppercase tracking-widest">{{ col.name }}</span><span class="w-5 h-5 bg-[#2F2E8B] flex items-center justify-center text-[8px] font-bold text-white font-mono">{{ filteredPipelineTenders(col.id).length }}</span></div>
            <div class="flex-1 p-2.5 bg-gray-50/50 border border-dashed min-h-[300px] space-y-2.5 overflow-y-auto tech-scroll transition-colors duration-200"
                 :class="dragOverColumn === col.id ? 'border-[#2F2E8B] bg-indigo-50/30' : 'border-gray-200'"
                 @dragover.prevent="onDragOver($event, col.id)"
                 @dragenter.prevent="onDragEnter(col.id)"
                 @dragleave="onDragLeave(col.id)"
                 @drop="onDrop(col.id)">
              <div v-for="tender in filteredPipelineTenders(col.id)" :key="tender.id"
                   draggable="true"
                   @dragstart="onDragStart($event, tender)"
                   @dragend="onDragEnd"
                   @click="openEditTenderModal(tender)"
                   class="bg-white p-3 shadow-sm border border-gray-100 hover:border-[#2F2E8B] transition-all cursor-pointer group relative overflow-hidden"
                   :class="draggingTenderId === tender.id ? 'opacity-50 scale-95' : ''">
                <div v-if="tender.priority === 'urgent'" class="absolute right-0 top-0 w-0 h-0 border-t-[14px] border-l-[14px] border-t-rose-500 border-l-transparent"></div>
                <div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1">{{ tender.reference_number || '#' + tender.id.toString().slice(-6) }}</div>
                <h4 class="text-xs font-bold text-gray-900 mb-1.5 group-hover:text-[#2F2E8B] transition-colors font-display uppercase leading-tight">{{ tender.title }}</h4>
                <div class="text-[8px] font-mono font-bold text-gray-500 uppercase">{{ tender.client_name }}</div>
                <div class="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-50"><span class="text-[10px] font-bold text-[#2F2E8B]">{{ formatCurrency(tender.tender_value) }}</span><div class="flex gap-1 items-center"><span v-if="tender.documents?.length" class="text-[7px] font-mono text-gray-400"><i class="fas fa-paperclip mr-0.5"></i>{{ tender.documents.length }}</span><i class="fas fa-chevron-right text-[7px] text-gray-300 group-hover:text-[#2F2E8B]"></i></div></div>
              </div>
              <div v-if="!filteredPipelineTenders(col.id).length" class="text-center py-6 text-[8px] font-mono font-bold text-gray-300 uppercase tracking-widest">EMPTY</div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'documents'" class="animate-in fade-in duration-500">
        <div class="flex items-end justify-between mb-4"><div><h2 class="text-lg font-black text-gray-900 uppercase font-display tracking-tight">DOCUMENT_REPOSITORY</h2><p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">ALL_TENDER_DOCUMENTS // CENTRAL_ARCHIVE</p></div></div>
        <div class="bg-white border border-gray-100 shadow-sm overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-100 bg-gray-50/50"><th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Document</th><th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Tender</th><th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Category</th><th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Type</th><th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Uploaded</th><th class="px-5 py-3 text-left text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">Actions</th></tr></thead><tbody>
          <template v-for="tender in tenders" :key="tender.id">
            <tr v-for="(doc, dIdx) in (tender.documents || [])" :key="tender.id + '-' + dIdx" class="border-b border-gray-50 hover:bg-indigo-50/30 transition-colors font-mono">
              <td class="px-5 py-3"><div class="flex items-center gap-2"><i :class="getDocIcon(doc.type)" class="text-[10px] text-gray-400"></i><span class="text-[10px] font-bold text-gray-900 uppercase">{{ doc.name }}</span></div></td>
              <td class="px-5 py-3 text-[10px] font-bold text-gray-700 uppercase">{{ tender.title }}</td>
              <td class="px-5 py-3"><span class="px-2 py-0.5 text-[7px] font-mono font-bold uppercase border bg-gray-50 text-gray-500">{{ doc.category }}</span></td>
              <td class="px-5 py-3 text-[8px] text-gray-400 uppercase">{{ doc.type?.split('/')[1] || 'FILE' }}</td>
              <td class="px-5 py-3 text-[8px] text-gray-400">{{ formatDate(doc.uploaded_at) }}</td>
              <td class="px-5 py-3"><a :href="resolveFileUrl(doc.url)" target="_blank" rel="noopener" class="text-[#2F2E8B] hover:underline text-[8px] font-mono font-bold uppercase">DOWNLOAD</a></td>
            </tr>
          </template>
          <tr v-if="!allDocuments.length"><td colspan="6" class="px-5 py-10 text-center text-gray-400 text-xs font-mono italic">NO_DOCUMENTS_UPLOADED</td></tr>
        </tbody></table></div></div>
      </div>

      <div v-else-if="activeTab === 'analytics'" class="animate-in fade-in duration-500">
        <div class="flex items-end justify-between mb-4"><div><h2 class="text-lg font-black text-gray-900 uppercase font-display tracking-tight">BID_PERFORMANCE_ANALYTICS</h2><p class="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-1">WIN_LOSS_RATIOS // SECTOR_ANALYSIS // MANAGER_PERFORMANCE</p></div><button @click="fetchPerformance" class="px-3 py-2 bg-[#2F2E8B] text-white hover:bg-[#1a196b] text-[9px] font-mono font-bold uppercase tracking-widest transition-all"><i class="fas fa-sync-alt mr-1" :class="{ 'animate-spin': perfLoading }"></i> REFRESH</button></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div class="bg-white border border-gray-100 p-5 shadow-sm"><div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Win Rate</div><div class="text-3xl font-black font-display text-emerald-600">{{ summary?.win_rate || 0 }}<span class="text-lg text-emerald-400">%</span></div><div class="text-[9px] font-mono text-gray-500 mt-1.5">{{ summary?.total_awarded || 0 }} won / {{ (summary?.total_awarded || 0) + (summary?.total_lost || 0) }} decided</div></div>
          <div class="bg-white border border-gray-100 p-5 shadow-sm"><div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Active Pipeline Value</div><div class="text-3xl font-black font-display text-[#2F2E8B]">{{ formatCurrency(summary?.total_active_value || 0) }}</div><div class="text-[9px] font-mono text-gray-500 mt-1.5">{{ summary?.total_tenders || 0 }} total tenders</div></div>
          <div class="bg-white border border-gray-100 p-5 shadow-sm"><div class="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-2">Awarded Value</div><div class="text-3xl font-black font-display text-emerald-600">{{ formatCurrency(summary?.status_counts?.awarded?.total_value || 0) }}</div></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div class="bg-white border border-gray-100 p-5 shadow-sm"><h3 class="text-xs font-black text-gray-900 mb-4 uppercase font-display">Performance by Sector</h3><div class="space-y-2.5"><div v-for="s in (performance?.by_sector || [])" :key="s.sector" class="flex items-center gap-3"><div class="w-24 text-[8px] font-mono font-bold text-gray-500 uppercase truncate">{{ s.sector }}</div><div class="flex-1 h-3 bg-gray-50 relative overflow-hidden border border-gray-100"><div class="h-full bg-emerald-500 transition-all" :style="{ width: s.win_rate + '%' }"></div></div><div class="text-[10px] font-mono font-bold text-gray-700 w-10 text-right">{{ s.win_rate }}%</div></div><div v-if="!performance?.by_sector?.length" class="text-gray-400 text-xs font-mono italic py-4 text-center">NO_DATA</div></div></div>
          <div class="bg-white border border-gray-100 p-5 shadow-sm"><h3 class="text-xs font-black text-gray-900 mb-4 uppercase font-display">Performance by Manager</h3><div class="space-y-2.5"><div v-for="m in (performance?.by_manager || [])" :key="m.manager" class="flex items-center gap-3"><div class="w-24 text-[8px] font-mono font-bold text-gray-500 uppercase truncate">{{ m.manager }}</div><div class="flex-1 h-3 bg-gray-50 relative overflow-hidden border border-gray-100"><div class="h-full bg-[#2F2E8B] transition-all" :style="{ width: m.win_rate + '%' }"></div></div><div class="text-[10px] font-mono font-bold text-gray-700 w-10 text-right">{{ m.win_rate }}%</div></div><div v-if="!performance?.by_manager?.length" class="text-gray-400 text-xs font-mono italic py-4 text-center">NO_DATA</div></div></div>
        </div>
      </div>
    </main>

    <Teleport to="body">
      <div v-if="showTenderModal" class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div class="bg-white border text-left border-gray-100 shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50"><div class="flex items-center gap-3"><div class="w-1.5 h-6 bg-[#2F2E8B]"></div><div><h2 class="text-base font-black text-gray-900 uppercase font-display tracking-tight">{{ editingTender ? 'MODIFY_TENDER' : 'REGISTER_NEW_TENDER' }}</h2><div class="text-[7px] font-mono font-bold text-gray-400 uppercase tracking-widest mt-0.5">ID: {{ editingTender?.id?.toString().slice(-6) || 'NEW' }}</div></div></div><button @click="showTenderModal = false" class="w-7 h-7 flex items-center justify-center border border-gray-200 hover:bg-[#2F2E8B] hover:text-white transition-all"><i class="fas fa-times text-xs"></i></button></div>
          <div class="flex-1 overflow-y-auto p-6 space-y-5">
            <div class="grid grid-cols-2 gap-4"><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">TENDER_TITLE *</label><input v-model="tenderForm.title" type="text" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase transition-colors" placeholder="ENTER_TENDER_TITLE..."></div><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">REFERENCE_NUMBER</label><input v-model="tenderForm.reference_number" type="text" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase transition-colors" placeholder="REF-001"></div></div>
            <div class="grid grid-cols-2 gap-4"><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">CLIENT_NAME *</label><input v-model="tenderForm.client_name" type="text" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase transition-colors" placeholder="CLIENT NAME..."></div><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">INDUSTRY_SECTOR</label><input v-model="tenderForm.industry_sector" type="text" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase transition-colors" placeholder="CONSTRUCTION / MINING / IT..."></div></div>
            <div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">SCOPE_OF_WORK</label><textarea v-model="tenderForm.scope_of_work" rows="2" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] text-gray-600 transition-colors resize-none" placeholder="DESCRIBE_THE_SCOPE..."></textarea></div>
            <div class="grid grid-cols-3 gap-4"><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">TENDER_VALUE</label><input v-model.number="tenderForm.tender_value" type="number" step="0.01" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 transition-colors"></div><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">STATUS</label><select v-model="tenderForm.status" class="w-full px-3 py-2.5 bg-white border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold uppercase"><option value="identified">IDENTIFIED</option><option value="preparing">PREPARING</option><option value="submitted">SUBMITTED</option><option value="under_review">UNDER_REVIEW</option><option value="awarded">AWARDED</option><option value="lost">LOST</option><option value="cancelled">CANCELLED</option></select></div><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">PRIORITY</label><select v-model="tenderForm.priority" class="w-full px-3 py-2.5 bg-white border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold uppercase"><option value="low">LOW</option><option value="medium">MEDIUM</option><option value="high">HIGH</option><option value="urgent">URGENT</option></select></div></div>
            <div class="grid grid-cols-3 gap-4"><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">SUBMISSION_DEADLINE</label><input v-model="tenderForm.submission_deadline" type="date" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-600 uppercase"></div><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">ISSUED_DATE</label><input v-model="tenderForm.issued_date" type="date" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-600 uppercase"></div><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">AWARD_DATE</label><input v-model="tenderForm.award_date" type="date" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-600 uppercase"></div></div>
            <div class="grid grid-cols-2 gap-4"><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">BID_MANAGER</label><input v-model="tenderForm.bid_manager_name" type="text" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase" placeholder="MANAGER NAME"></div><div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">TECHNICAL_LEAD</label><input v-model="tenderForm.technical_lead_name" type="text" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase" placeholder="TECHNICAL LEAD"></div></div>
            <div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">CLIENT_CONTACT</label><div class="grid grid-cols-3 gap-3"><input v-model="tenderForm.client_contact" type="text" class="px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase" placeholder="CONTACT NAME"><input v-model="tenderForm.client_email" type="email" class="px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900" placeholder="EMAIL"><input v-model="tenderForm.client_phone" type="text" class="px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900 uppercase" placeholder="PHONE"></div></div>
            <div><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">FINANCIAL_DETAILS</label><div class="grid grid-cols-3 gap-3"><div><label class="text-[7px] font-mono text-gray-400">SUBMITTED_PRICE</label><input v-model.number="tenderForm.submitted_price" type="number" step="0.01" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900"></div><div><label class="text-[7px] font-mono text-gray-400">BID_PREP_COST</label><input v-model.number="tenderForm.bid_preparation_cost" type="number" step="0.01" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900"></div><div><label class="text-[7px] font-mono text-gray-400">BID_BOND_AMOUNT</label><input v-model.number="tenderForm.bid_bond_amount" type="number" step="0.01" class="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#2F2E8B] outline-none font-mono text-[11px] font-bold text-gray-900"></div></div></div>
            <div v-if="tenderForm.status === 'lost'"><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">LOSS_REASON</label><div class="grid grid-cols-2 gap-3"><select v-model="tenderForm.loss_reason" class="w-full px-3 py-2.5 bg-white border border-gray-200 focus:border-rose-500 outline-none font-mono text-[11px] font-bold uppercase"><option value="">SELECT...</option><option value="price">PRICE</option><option value="technical">TECHNICAL</option><option value="experience">EXPERIENCE</option><option value="compliance">COMPLIANCE</option><option value="other">OTHER</option></select><input v-model="tenderForm.loss_reason_detail" type="text" class="px-3 py-2.5 bg-gray-50 border border-gray-200 focus:border-rose-500 outline-none font-mono text-[11px] font-bold text-gray-900 uppercase" placeholder="DETAILS..."></div></div>
            <div v-if="editingTender"><label class="block text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-1.5">UPLOAD_DOCUMENT</label><div class="flex items-center gap-2.5"><select v-model="docCategory" class="px-2.5 py-2 bg-white border border-gray-200 font-mono text-[9px] font-bold text-gray-700 uppercase"><option value="general">GENERAL</option><option value="bid">BID</option><option value="pricing">PRICING</option><option value="technical">TECHNICAL</option><option value="boq">BOQ</option><option value="contract">CONTRACT</option><option value="certification">CERTIFICATION</option><option value="other">OTHER</option></select><input type="file" @change="uploadTenderDoc" class="flex-1 text-[9px] font-mono text-gray-600 file:mr-3 file:px-3 file:py-1.5 file:border-0 file:text-[9px] file:font-mono file:font-bold file:uppercase file:bg-indigo-50 file:text-[#2F2E8B] hover:file:bg-indigo-100"><span v-if="uploadingDoc" class="text-[9px] font-mono text-[#2F2E8B]"><i class="fas fa-spinner fa-spin mr-1"></i>UPLOADING</span></div><div v-if="tenderForm.documents?.length" class="mt-2.5 space-y-1"><div v-for="(doc, idx) in tenderForm.documents" :key="idx" class="flex items-center gap-2 bg-gray-50 border border-gray-200 px-2.5 py-2"><i :class="getDocIcon(doc.type)" class="text-[9px] text-gray-400"></i><a :href="resolveFileUrl(doc.url)" target="_blank" class="flex-1 text-[9px] font-mono font-bold text-[#2F2E8B] hover:underline truncate uppercase">{{ doc.name }}</a><span class="text-[7px] font-mono text-gray-400 uppercase px-1.5 py-0.5 border bg-white">{{ doc.category }}</span></div></div></div>
          </div>
          <div class="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3"><button @click="showTenderModal = false" :disabled="savingTender" class="px-5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 text-[9px] font-mono font-bold uppercase tracking-widest transition-all">CANCEL</button><button @click="saveTender" :disabled="!tenderForm.title || !tenderForm.client_name || savingTender" class="px-6 py-2 bg-[#2F2E8B] hover:bg-[#1a196b] text-white border border-[#2F2E8B] text-[9px] font-mono font-bold uppercase tracking-widest transition-all shadow-md shadow-indigo-200/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"><i v-if="savingTender" class="fas fa-spinner fa-spin text-[9px]"></i>{{ editingTender ? 'COMMIT_CHANGES' : 'REGISTER_TENDER' }}</button></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT';
import API_BASE_URL from '@/api_services/api';

const { getTenantId, getUserId, getUserFullname, getUserEmail } = decodeJWT();
const tenantId = getTenantId();
const userId = getUserId();
const userName = getUserFullname() || getUserEmail() || 'User';

const tabs = [
  { id: 'dashboard', name: 'Dashboard', icon: 'fas fa-th-large' },
  { id: 'pipeline', name: 'Pipeline', icon: 'fas fa-columns' },
  { id: 'documents', name: 'Documents', icon: 'fas fa-folder-open' },
  { id: 'analytics', name: 'Analytics', icon: 'fas fa-chart-bar' }
];

const activeTab = ref('dashboard');
const loading = ref(false);
const tenders = ref([]);
const summary = ref(null);
const performance = ref(null);
const perfLoading = ref(false);
const pipelineSearch = ref('');
const pipelineSectorFilter = ref('all');
const showTenderModal = ref(false);
const editingTender = ref(null);
const savingTender = ref(false);
const tenderForm = ref(getEmptyForm());
const docCategory = ref('general');
const uploadingDoc = ref(false);
const draggingTenderId = ref(null);
const dragOverColumn = ref(null);

const pipelineColumns = [
  { id: 'identified', name: 'Identified', borderColor: 'border-slate-300' },
  { id: 'preparing', name: 'Preparing', borderColor: 'border-indigo-400' },
  { id: 'submitted', name: 'Submitted', borderColor: 'border-blue-400' },
  { id: 'under_review', name: 'Under Review', borderColor: 'border-purple-400' },
  { id: 'awarded', name: 'Awarded', borderColor: 'border-emerald-400' },
  { id: 'lost', name: 'Lost', borderColor: 'border-rose-400' }
];

const maxTenders = computed(() => {
  if (!summary.value?.status_counts) return 1;
  return Math.max(1, ...Object.values(summary.value.status_counts).map(c => c.count));
});
const uniqueSectors = computed(() => {
  const sectors = new Set();
  tenders.value.forEach(t => { if (t.industry_sector) sectors.add(t.industry_sector); });
  return [...sectors].sort();
});
const allDocuments = computed(() => tenders.value.flatMap(t => (t.documents || []).map(d => ({ ...d, tender_title: t.title }))));
const dashboardKpis = computed(() => [
  { label: 'TOTAL_TENDERS', value: summary.value?.total_tenders || 0, color: 'bg-[#2F2E8B]', textColor: 'text-gray-900', sub: '' },
  { label: 'ACTIVE_PIPELINE', value: formatCurrency(summary.value?.total_active_value || 0), color: 'bg-indigo-600', textColor: 'text-[#2F2E8B]', sub: '' },
  { label: 'AWARDED', value: summary.value?.total_awarded || 0, color: 'bg-emerald-600', textColor: 'text-emerald-700', sub: '' },
  { label: 'LOST', value: summary.value?.total_lost || 0, color: 'bg-rose-600', textColor: 'text-rose-700', sub: '' },
  { label: 'WIN_RATE', value: (summary.value?.win_rate || 0) + '%', color: 'bg-violet-600', textColor: 'text-violet-700', sub: '' },
  { label: 'AWARDED_VALUE', value: formatCurrency(summary.value?.status_counts?.awarded?.total_value || 0), color: 'bg-emerald-600', textColor: 'text-emerald-700', sub: '' },
  { label: 'UPCOMING_DEADLINES', value: summary.value?.upcoming_deadlines?.length || 0, color: 'bg-orange-600', textColor: 'text-orange-700', sub: '' }
]);

function getEmptyForm() {
  return { title: '', reference_number: '', client_name: '', client_contact: '', client_email: '', client_phone: '', scope_of_work: '', industry_sector: 'General', location: '', tender_value: 0, currency: 'ZMW', status: 'identified', priority: 'medium', strategic_importance: 'standard', issued_date: '', submission_deadline: '', award_date: '', contract_start_date: '', contract_end_date: '', bid_manager_name: '', technical_lead_name: '', finance_lead_name: '', submitted_price: 0, bid_preparation_cost: 0, bid_bond_amount: 0, bid_bond_required: false, loss_reason: '', loss_reason_detail: '', competitor_name: '', competitor_price: 0, documents: [] };
}
function formatCurrency(val) { if (!val && val !== 0) return 'ZMW 0'; return 'ZMW ' + Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function formatDate(dateStr) { if (!dateStr) return 'N/A'; try { return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(); } catch { return dateStr; } }
function formatStatus(status) { const m = { identified: 'IDENTIFIED', preparing: 'PREPARING', submitted: 'SUBMITTED', under_review: 'UNDER_REVIEW', awarded: 'AWARDED', lost: 'LOST', cancelled: 'CANCELLED' }; return m[status] || status?.toUpperCase() || 'UNKNOWN'; }
function getStatusBadgeClass(status) { const m = { identified: 'bg-slate-50 text-slate-600 border-slate-200', preparing: 'bg-indigo-50 text-[#2F2E8B] border-indigo-200', submitted: 'bg-blue-50 text-blue-600 border-blue-200', under_review: 'bg-purple-50 text-purple-600 border-purple-200', awarded: 'bg-emerald-50 text-emerald-600 border-emerald-200', lost: 'bg-rose-50 text-rose-600 border-rose-200', cancelled: 'bg-gray-50 text-gray-500 border-gray-200' }; return m[status] || 'bg-gray-50 text-gray-500 border-gray-200'; }
function getStatusBarColor(status) { const m = { identified: 'bg-slate-400', preparing: 'bg-indigo-500', submitted: 'bg-blue-500', under_review: 'bg-purple-500', awarded: 'bg-emerald-500', lost: 'bg-rose-400', cancelled: 'bg-gray-300' }; return m[status] || 'bg-gray-300'; }
function isDeadlineSoon(dateStr) { if (!dateStr) return false; try { const d = new Date(dateStr); const diff = (d.getTime() - Date.now()) / 86400000; return diff <= 7 && diff >= 0; } catch { return false; } }
function getDocIcon(type) { if (!type) return 'fas fa-file'; const t = type.toLowerCase(); if (t.includes('pdf')) return 'fas fa-file-pdf'; if (t.includes('word') || t.includes('document')) return 'fas fa-file-word'; if (t.includes('excel') || t.includes('sheet')) return 'fas fa-file-excel'; if (t.includes('image')) return 'fas fa-file-image'; return 'fas fa-file'; }
function resolveFileUrl(url) { if (!url) return ''; if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url; return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`; }
function filteredPipelineTenders(status) { let list = tenders.value.filter(t => t.status === status); if (pipelineSearch.value) { const term = pipelineSearch.value.toLowerCase(); list = list.filter(t => (t.title || '').toLowerCase().includes(term) || (t.client_name || '').toLowerCase().includes(term) || (t.reference_number || '').toLowerCase().includes(term)); } if (pipelineSectorFilter.value !== 'all') list = list.filter(t => t.industry_sector === pipelineSectorFilter.value); return list; }

// ── Drag & Drop ────────────────────────────────────────────

function onDragStart(e, tender) {
  draggingTenderId.value = tender.id;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', tender.id);
}

function onDragEnd() {
  draggingTenderId.value = null;
  dragOverColumn.value = null;
}

function onDragOver(e, colId) {
  e.dataTransfer.dropEffect = 'move';
}

function onDragEnter(colId) {
  dragOverColumn.value = colId;
}

function onDragLeave(colId) {
  if (dragOverColumn.value === colId) {
    dragOverColumn.value = null;
  }
}

async function onDrop(colId) {
  dragOverColumn.value = null;
  const tenderId = draggingTenderId.value;
  if (!tenderId) return;
  const tender = tenders.value.find(t => t.id === tenderId);
  if (!tender || tender.status === colId) {
    draggingTenderId.value = null;
    return;
  }
  // Optimistically update UI
  const oldStatus = tender.status;
  tender.status = colId;
  draggingTenderId.value = null;
  // Persist to backend
  try {
    const payload = { ...tender, status: colId, tenant_id: tenantId };
    delete payload._id;
    delete payload.id;
    delete payload.documents;
    const res = await fetch(`${API_BASE_URL}/tenders/${tenderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      tender.status = oldStatus;
      const errBody = await res.json().catch(() => ({}));
      console.error('Failed to move tender:', errBody.detail || res.statusText);
    } else {
      fetchSummary();
    }
  } catch (err) {
    tender.status = oldStatus;
    console.error('Move tender failed', err);
  }
}

async function fetchTenders() { loading.value = true; try { const res = await fetch(`${API_BASE_URL}/tenders?tenant_id=${tenantId}&limit=100`); if (res.ok) { const data = await res.json(); tenders.value = data.items || data; } } catch (err) { console.error('Failed to load tenders', err); } finally { loading.value = false; } }
async function fetchSummary() { try { const res = await fetch(`${API_BASE_URL}/tenders/analytics/summary?tenant_id=${tenantId}`); if (res.ok) summary.value = await res.json(); } catch (err) { console.error('Failed to load summary', err); } }
async function fetchPerformance() { perfLoading.value = true; try { const res = await fetch(`${API_BASE_URL}/tenders/analytics/performance?tenant_id=${tenantId}`); if (res.ok) performance.value = await res.json(); } catch (err) { console.error('Failed to load performance', err); } finally { perfLoading.value = false; } }

function openCreateTenderModal() { editingTender.value = null; tenderForm.value = getEmptyForm(); showTenderModal.value = true; }
function openEditTenderModal(tender) { editingTender.value = tender; tenderForm.value = { title: tender.title || '', reference_number: tender.reference_number || '', client_name: tender.client_name || '', client_contact: tender.client_contact || '', client_email: tender.client_email || '', client_phone: tender.client_phone || '', scope_of_work: tender.scope_of_work || '', industry_sector: tender.industry_sector || 'General', location: tender.location || '', tender_value: tender.tender_value || 0, currency: tender.currency || 'ZMW', status: tender.status || 'identified', priority: tender.priority || 'medium', strategic_importance: tender.strategic_importance || 'standard', issued_date: tender.issued_date || '', submission_deadline: tender.submission_deadline || '', award_date: tender.award_date || '', contract_start_date: tender.contract_start_date || '', contract_end_date: tender.contract_end_date || '', bid_manager_name: tender.bid_manager_name || '', technical_lead_name: tender.technical_lead_name || '', finance_lead_name: tender.finance_lead_name || '', submitted_price: tender.submitted_price || 0, bid_preparation_cost: tender.bid_preparation_cost || 0, bid_bond_amount: tender.bid_bond_amount || 0, bid_bond_required: tender.bid_bond_required || false, loss_reason: tender.loss_reason || '', loss_reason_detail: tender.loss_reason_detail || '', competitor_name: tender.competitor_name || '', competitor_price: tender.competitor_price || 0, documents: [...(tender.documents || [])] }; showTenderModal.value = true; }
async function saveTender() { if (savingTender.value) return; savingTender.value = true; const method = editingTender.value ? 'PUT' : 'POST'; const url = editingTender.value ? `${API_BASE_URL}/tenders/${editingTender.value.id}` : `${API_BASE_URL}/tenders`; const payload = { ...tenderForm.value, tenant_id: tenantId, created_by_id: userId, created_by_name: userName }; delete payload.documents; try { const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (res.ok) { showTenderModal.value = false; fetchTenders(); fetchSummary(); } else { const errBody = await res.json().catch(() => ({})); alert(`Failed: ${errBody.detail || res.statusText}`); } } catch (err) { console.error('Save tender failed', err); } finally { savingTender.value = false; } }
async function deleteTender(id) { if (!confirm('DELETE_TENDER?\n\nThis action cannot be undone. Proceed?')) return; try { const res = await fetch(`${API_BASE_URL}/tenders/${id}?tenant_id=${tenantId}`, { method: 'DELETE' }); if (res.ok) { fetchTenders(); fetchSummary(); } } catch (err) { console.error('Delete failed', err); } }
async function uploadTenderDoc(e) { const file = e.target.files?.[0]; if (!file || !editingTender.value) return; uploadingDoc.value = true; try { const fd = new FormData(); fd.append('file', file); const res = await fetch(`${API_BASE_URL}/tenders/${editingTender.value.id}/documents?tenant_id=${tenantId}&category=${docCategory.value}&uploaded_by=${userName}`, { method: 'POST', body: fd }); if (res.ok) { fetchTenders(); const docInfo = await res.json(); tenderForm.value.documents.push(docInfo); } else { const errBody = await res.json().catch(() => ({})); alert(`Upload failed: ${errBody.detail || res.statusText}`); } } catch (err) { console.error('Upload failed', err); } finally { uploadingDoc.value = false; e.target.value = ''; } }

onMounted(async () => { await Promise.all([fetchTenders(), fetchSummary(), fetchPerformance()]); });
</script>

<style scoped>
.grid-pattern { background-image: linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px); background-size: 32px 32px; background-position: -1px -1px; }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.tech-scroll { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
.tech-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
.tech-scroll::-webkit-scrollbar-thumb { background-color: #cbd5e1; }
.tech-scroll::-webkit-scrollbar-track { background: transparent; }
</style>
