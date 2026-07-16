import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';
import Chart from 'chart.js/auto';
import '@/assets/main.css';
import { useCurrency } from '@/composables/useCurrency.js';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function useReportsModule() {
  // JWT functions must be called inside setup
  const { getTenantId, getUserEmail, getUserName, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getUserRole } = decodeJWT();

  // Core State
  const currentTab = ref('financial');
  const totalSales = ref(0);
  const totalSalesInitialized = ref(false);

  // Global Date Filters
  const reportRange = ref('month'); // daily, weekly, monthly, custom
  const customStartDate = ref('');
  const customEndDate = ref('');
  const customStartTime = ref('00:00');
  const customEndTime = ref('23:59');

  // Helper to get date boundaries (now includes time)
  const dateParams = computed(() => {
    const now = new Date();
    let start = null;
    let end = new Date(); // end is usually now

    if (reportRange.value === 'daily') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (reportRange.value === 'weekly') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      start = new Date(now.setDate(diff));
      start.setHours(0, 0, 0, 0);
    } else if (reportRange.value === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (reportRange.value === 'custom') {
      if (customStartDate.value) {
        start = new Date(customStartDate.value);
        const [sh, sm] = (customStartTime.value || '00:00').split(':').map(Number);
        start.setHours(sh, sm, 0, 0);
      }
      if (customEndDate.value) {
        end = new Date(customEndDate.value);
        const [eh, em] = (customEndTime.value || '23:59').split(':').map(Number);
        end.setHours(eh, em, 0, 0);
      }
    }

    return {
      startDate: start ? start.toISOString() : null,
      endDate: end ? end.toISOString() : null,
      range: reportRange.value
    };
  });

  const hotelSales = ref({
    total: 0,
    room_rev: 0,
    conf_rev: 0,
    serv_rev: 0,
    room_pct: 0,
    conf_pct: 0,
    serv_pct: 0,
    daily_revenue: [],
    transactions: []
  });

  const reportTabs = [
    { id: 'financial', name: 'Financial Statement', icon: 'fas fa-file-invoice-dollar' },
    { id: 'sales', name: 'Sales Analysis', icon: 'fas fa-chart-line' },
    { id: 'balance', name: 'Balance Sheet', icon: 'fas fa-balance-scale' },
    { id: 'inventory', name: 'Inventory Report', icon: 'fas fa-boxes' },
    { id: 'delivery', name: 'Delivery Notes', icon: 'fas fa-truck' },
    { id: 'hotels', name: 'Hotel Report', icon: 'fas fa-hotel' }
  ];

  // Branch State
  const branches = ref([]);
  const selectedBranch = ref(null);

  onMounted(async () => {
    // Initialize branches logic
    const availableBranches = getBranches() || [];
    const userBranchId = getBranchId();
    const userRole = getUserRole();
    const isOwner = ['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase());

    if (userBranchId && !isOwner) {
      // Restricted Subaccount
      // Handle both _id and id cases just to be safe
      const restricted = availableBranches.find(b => (b._id || b.id) === userBranchId);
      if (restricted) {
        branches.value = [restricted];
        selectedBranch.value = restricted;
      } else {
        // Fallback dummy if not found but ID exists (shouldn't happen often)
        const dummy = { _id: userBranchId, id: userBranchId, name: 'Assigned Branch' };
        branches.value = [dummy];
        selectedBranch.value = dummy;
      }
    } else {
      // Unrestricted (Owner/Admin)
      branches.value = availableBranches;
      const stored = getSelectedBranch();
      let found = null;
      if (stored) {
        found = branches.value.find(b => (b._id || b.id) === (stored._id || stored.id));
      }
      // Default to stored selection or NULL (All Branches)
      selectedBranch.value = found || null;
    }
    // Refresh all data on mount
    refreshAllData();
    fetchCompanyDetails();
  });

  // Persist selected branch
  watch(selectedBranch, (newVal) => {
    if (newVal !== undefined) {
      setSelectedBranch(newVal);
      // Refetch all data when branch changes
      refreshAllData();
    }
  });

  async function refreshAllData() {
    await Promise.allSettled([
      fetchTopKPIs(),
      fetchFinancialData(),
      fetchInventoryData(),
      fetchTaxData(),
      fetchDeliveryTickets(),
      fetchInventorySummary(),
      fetchDeliveryFilterOptions(),
      fetchInvoices(),
      fetchSalesChartData(),
      fetchHotelSales()
    ]);
  }

  // Watch for date changes to refresh everything
  watch([reportRange, customStartDate, customEndDate, customStartTime, customEndTime], () => {
    refreshAllData();
  });



  const loading = ref(false);
  const showReportModal = ref(false);
  const salesChart = ref(null);
  const salesProfitChart = ref(null); // [NEW] - migrated
  const weeklyTransactionsChart = ref(null); // [NEW] - migrated
  let chartInstance = null;
  const chartInstances = {}; // [NEW] - migrated

  // [NEW] Data for charts
  const salesData = ref([]);
  const weeklyTransactions = ref([]);
  const processedData = ref(null);

  // [NEW] Automatically update charts when data is processed
  watch(processedData, (newData) => {
    if (newData && currentTab.value === 'sales') {
      nextTick(() => updateMovedCharts());
    }
  });

  // [NEW] Process Data Inline (from DashboardHome)
  function processDataInline(sales, weekly) {
    const downsample = (data, maxPoints = 200) => {
      if (!Array.isArray(data) || data.length <= maxPoints) return data;
      const out = [];
      const bucketSize = Math.ceil(data.length / maxPoints);
      for (let i = 0; i < data.length; i += bucketSize) {
        const slice = data.slice(i, i + bucketSize);
        const avg = slice.reduce((s, v) => ({
          sales: (s.sales || 0) + (v.sales || 0),
          profit: (s.profit || 0) + (v.profit || 0),
          dateCount: (s.dateCount || 0) + 1
        }), { sales: 0, profit: 0, dateCount: 0 });
        out.push({
          sales: Math.round(avg.sales / avg.dateCount),
          profit: Math.round(avg.profit / avg.dateCount),
          date: slice[Math.floor(slice.length / 2)].date
        });
      }
      return out;
    };
    const sd = downsample(sales || [], 200);
    const weeklyArr = (weekly || []).map(w => ({ day: w.day, transactions: Number(w.transactions || 0) }));
    const salesArr = sd.map(d => Number(d.sales || 0));
    const profitArr = sd.map(d => Number(d.profit || 0));
    return {
      salesData: sd,
      weeklyTransactions: weeklyArr,
      salesArr,
      profitArr,
      weeklyArrNum: weeklyArr.map(w => w.transactions),
      salesMax: salesArr.length ? Math.max(...salesArr) : 0,
      weeklyMax: weeklyArr.length ? Math.max(...weeklyArr.map(w => w.transactions || 0)) : 0
    };
  }

  // [NEW] Update Chart Logic
  function updateMovedCharts() {
    const pdata = processedData.value;
    if (!pdata) return;

    // Sales & Profit Trend Chart
    if (salesProfitChart.value) {
      const sourceSales = pdata.salesData || [];
      const fullDateLabels = sourceSales.map(item => {
        const raw = item && typeof item === 'object' ? (item.date || item) : item;
        try {
          return new Date(raw).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } catch (e) { return String(raw); }
      }) || ['No Data'];

      const salesArr = pdata.salesArr || [];
      const profitArr = pdata.profitArr || [];

      if (chartInstances.salesProfit) {
        chartInstances.salesProfit.data.labels = fullDateLabels;
        chartInstances.salesProfit.data.datasets[0].data = salesArr;
        chartInstances.salesProfit.data.datasets[1].data = profitArr;
        chartInstances.salesProfit.update();
      } else {
        chartInstances.salesProfit = new Chart(salesProfitChart.value, {
          type: 'line',
          data: {
            labels: fullDateLabels,
            datasets: [
              {
                label: 'Sales',
                data: salesArr,
                borderColor: '#2F2E8B',
                backgroundColor: 'rgba(47, 46, 139, 0.2)',
                fill: true,
                tension: 0.4
              },
              {
                label: 'Profit',
                data: profitArr,
                borderColor: '#3D2F88',
                backgroundColor: 'rgba(61, 47, 136, 0.2)',
                fill: true,
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true },
              x: { display: false }
            },
            plugins: { legend: { display: true } }
          }
        });
      }
    }

    // Weekly Transactions Chart
    if (weeklyTransactionsChart.value) {
      const transactionLabels = pdata.weeklyTransactions ? pdata.weeklyTransactions.map(t => t.day) : ['No Data'];
      const weeklyDataArr = pdata.weeklyArrNum || [0];

      if (chartInstances.weeklyTransactions) {
        chartInstances.weeklyTransactions.data.labels = transactionLabels;
        chartInstances.weeklyTransactions.data.datasets[0].data = weeklyDataArr;
        chartInstances.weeklyTransactions.update();
      } else {
        chartInstances.weeklyTransactions = new Chart(weeklyTransactionsChart.value, {
          type: 'line',
          data: {
            labels: transactionLabels,
            datasets: [{
              label: 'Transactions',
              data: weeklyDataArr,
              borderColor: '#2F2E8B',
              backgroundColor: 'rgba(47, 46, 139, 0.2)',
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true },
              x: { display: true }
            },
            plugins: { legend: { display: false } }
          }
        });
      }
    }
  }

  watch(currentTab, (val) => {
    if (val === 'hotels') {
      fetchHotelSales();
      totalSales.value = hotelSales.value.total;
    }
    if (val === 'sales') {
      fetchSalesChartData();
      // Sync totalSales with the sales total if available
      nextTick(() => {
        updateMovedCharts();
      });
    }
  });

  // Watch hotelSales to update top KPI if we are on that tab
  watch(() => hotelSales.value.total, (newVal) => {
    if (currentTab.value === 'hotels') {
      totalSales.value = newVal;
    }
  });


  // Data states

  // Only set totalSales when the value is authoritative. If we've already initialized
  // a non-zero value from the KPI endpoint, avoid overwriting it with later zero/failed fetches.
  const setAuthoritativeTotalSales = (v) => {
    try {
      const n = Number(v) || 0;
      if (!totalSalesInitialized.value || n !== 0) {
        totalSales.value = n;
        totalSalesInitialized.value = true;
      } else {
        console.debug('[ReportsModule] skip overwriting authoritative totalSales with zero');
      }
    } catch (e) {
      // ignore
    }
  };
  const monthlySales = ref(0);
  const netProfit = ref(0);
  const inventoryValue = ref(0);
  const inventoryItems = ref(0);
  const inventoryItemsList = ref([]);
  // Delivery tickets state
  const deliveryTickets = ref([]);
  const deliverySummary = ref({
    totalTickets: 0,
    totalQuantity: 0,
    totalCost: 0,
    totalEquipmentBuyingPrice: 0,
    totalEquipmentPrice: 0,
    totalBuyingCost: 0,
    varianceLoss: 0,
    totalProfit: 0,
    netSales: 0
  });
  const showDeliveryModal = ref(false);
  // Filters for delivery tickets
  const deliveryFilter = ref({
    status: '',
    technician: '',
    deliveryAddress: '',
    startDate: '',
    endDate: ''
  });
  const showLowStockDetails = ref(false);
  // Dynamic filter option lists for delivery tickets
  const deliveryTechnicianOptions = ref([]);
  const deliveryStatusOptions = ref([]);
  const deliveryAddressOptions = ref([]);

  // pagination state for delivery tickets
  const deliveryPage = ref(0);
  const deliveryPageSize = ref(20);
  const deliveryTotalCount = ref(0);

  // Stock pagination state
  const lowStockPage = ref(0);
  const criticalStockPage = ref(0);
  const emptyStockPage = ref(0);
  const stockPageSize = ref(15);

  // Computed for paginated lists
  const paginatedLowStock = computed(() => {
    const list = deliverySummary.value.lowStock || [];
    const start = lowStockPage.value * stockPageSize.value;
    return list.slice(start, start + stockPageSize.value);
  });

  const paginatedCriticalStock = computed(() => {
    const list = deliverySummary.value.criticalStock || [];
    const start = criticalStockPage.value * stockPageSize.value;
    return list.slice(start, start + stockPageSize.value);
  });

  const paginatedEmptyStock = computed(() => {
    const list = deliverySummary.value.emptyStock || [];
    const start = emptyStockPage.value * stockPageSize.value;
    return list.slice(start, start + stockPageSize.value);
  });

  // Computed for total pages
  const totalLowStockPages = computed(() => Math.max(1, Math.ceil((deliverySummary.value.lowStock || []).length / stockPageSize.value)));
  const totalCriticalStockPages = computed(() => Math.max(1, Math.ceil((deliverySummary.value.criticalStock || []).length / stockPageSize.value)));
  const totalEmptyStockPages = computed(() => Math.max(1, Math.ceil((deliverySummary.value.emptyStock || []).length / stockPageSize.value)));

  // Navigation methods
  const nextLowStockPage = () => {
    if (lowStockPage.value < totalLowStockPages.value - 1) lowStockPage.value++;
  };
  const prevLowStockPage = () => {
    if (lowStockPage.value > 0) lowStockPage.value--;
  };

  const nextCriticalStockPage = () => {
    if (criticalStockPage.value < totalCriticalStockPages.value - 1) criticalStockPage.value++;
  };
  const prevCriticalStockPage = () => {
    if (criticalStockPage.value > 0) criticalStockPage.value--;
  };

  const nextEmptyStockPage = () => {
    if (emptyStockPage.value < totalEmptyStockPages.value - 1) emptyStockPage.value++;
  };
  const prevEmptyStockPage = () => {
    if (emptyStockPage.value > 0) emptyStockPage.value--;
  };
  const grandTotalAllDeliveryTickets = computed(() => {
    try {
      return deliveryTickets.value.reduce((acc, t) => {
        const val = getTicketTotal(t);
        return acc + (isNaN(val) ? 0 : val);
      }, 0);
    } catch (e) {
      return 0;
    }
  });
  // Sum of per-delivery-ticket profit adjustments: (equipmentPrice - equipmentBuyingPrice) * qty
  const deliveryProfitAdjustment = computed(() => {
    try {
      const total = deliveryTickets.value.reduce((acc, t) => {
        const items = Array.isArray(t.equipment) ? t.equipment : [];
        let ticketProfit = 0;
        if (items.length) {
          for (const it of items) {
            const qty = Number(it.quantity || it.qty || 1) || 0;
            const sell = Number(it.equipmentPrice ?? it.price ?? it.sellingPrice ?? 0) || 0;
            let buy = Number(it.equipmentBuyingPrice ?? it.buyingPrice ?? it.buying_price ?? 0) || 0;

            // If buying price is 0 or missing, try to get fresh price from inventory
            if (buy === 0 && inventoryItemsList.value && inventoryItemsList.value.length > 0) {
              const inventoryItem = inventoryItemsList.value.find(inv =>
                inv.id === it.id ||
                inv.name === it.name ||
                (inv.partNumber && it.partNumber && inv.partNumber === it.partNumber)
              );
              if (inventoryItem) {
                buy = Number(inventoryItem.equipmentBuyingPrice ?? inventoryItem.buyingPrice ?? 0) || 0;
                if (buy > 0) {
                  console.log('[DeliveryProfit] Enriched buying price from inventory:', {
                    name: it.name,
                    storedBuyingPrice: Number(it.equipmentBuyingPrice ?? it.buyingPrice ?? 0),
                    freshBuyingPrice: buy
                  });
                }
              }
            }

            const itemProfit = (sell - buy) * qty;
            ticketProfit += itemProfit;

            // Debug log for each item
            if (itemProfit !== 0 || buy === 0) {
              console.log('[DeliveryProfit] Item:', {
                name: it.name,
                qty,
                sellingPrice: sell,
                buyingPrice: buy,
                profit: itemProfit
              });
            }
          }
        } else {
          // fallback to ticket-level fields
          const qty = Number(t.quantity || 1) || 1;
          const sell = Number(t.equipmentPrice ?? t.grandTotal ?? t.cost ?? 0) || 0;
          const buy = Number(t.equipmentBuyingPrice ?? t.buyingPrice ?? 0) || 0;
          // If grandTotal is used as sell and represents sum over items, don't multiply by qty again.
          const effectiveSell = (t.grandTotal ? Number(t.grandTotal) : sell * qty) || 0;
          ticketProfit += (effectiveSell - buy * qty);
        }
        return acc + ticketProfit;
      }, 0);

      console.log('[DeliveryProfit] Total delivery profit adjustment:', total);
      return total;
    } catch (e) {
      console.error('[DeliveryProfit] Error calculating:', e);
      return 0;
    }
  });
  // backend-provided net profit (kept separate until we combine with delivery adjustments)
  const backendNetProfit = ref(null);

  // Update the displayed net profit by combining backend net profit and delivery-ticket profit adjustments
  const updateDisplayedNetProfit = () => {
    try {
      // Use only one source: backendNetProfit if present, otherwise deliveryProfitAdjustment
      let net = 0;
      if (backendNetProfit.value !== null && backendNetProfit.value !== undefined && !isNaN(Number(backendNetProfit.value))) {
        net = Number(backendNetProfit.value) || 0;
        console.log('[ReportsModule] Net Profit Calculation (backend only):', {
          backendNetProfit: net
        });
      } else {
        net = Number(deliveryProfitAdjustment.value) || 0;
        console.log('[ReportsModule] Net Profit Calculation (delivery only):', {
          deliveryProfitAdjustment: net
        });
      }
      netProfit.value = net;
    } catch (e) {
      console.error('[ReportsModule] Error updating net profit:', e);
      netProfit.value = Number(financials.value.netProfit || 0) + (Number(deliveryProfitAdjustment.value) || 0);
    }
  };
  // persisted inventory summary counts (from backend)
  const persistedInventorySummary = ref({
    lowStockCount: null,
    criticalStockCount: null,
    emptyStockCount: null
  });

  const fetchInventorySummary = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      const { getToken } = decodeJWT();
      const res = await fetch(`${API_BASE_URL}/reports/reports/inventory/summary?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) throw new Error('Failed to fetch inventory summary');
      const data = await res.json();
      persistedInventorySummary.value = {
        lowStockCount: data.lowStockCount != null ? Number(data.lowStockCount) : null,
        criticalStockCount: data.criticalStockCount != null ? Number(data.criticalStockCount) : null,
        emptyStockCount: data.emptyStockCount != null ? Number(data.emptyStockCount) : null
      };
      // also update deliverySummary arrays if backend provided them
      if (data.lowStock) deliverySummary.value.lowStock = data.lowStock;
      if (data.criticalStock) deliverySummary.value.criticalStock = data.criticalStock;
      if (data.emptyStock) deliverySummary.value.emptyStock = data.emptyStock;
    } catch (err) {
      persistedInventorySummary.value = { lowStockCount: null, criticalStockCount: null, emptyStockCount: null };
    }
  };

  const fetchDeliveryFilterOptions = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      const { getToken } = decodeJWT();
      const res = await fetch(`${API_BASE_URL}/reports/reports/delivery-tickets/filters?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) throw new Error('Failed to fetch filter options');
      const data = await res.json();
      deliveryTechnicianOptions.value = Array.isArray(data.technicians) ? data.technicians.map(t => t.name) : [];
      deliveryStatusOptions.value = Array.isArray(data.statuses) ? data.statuses.map(s => s.status) : [];
      deliveryAddressOptions.value = Array.isArray(data.deliveryAddresses) ? data.deliveryAddresses : [];
    } catch (err) {
      console.error('Failed to load delivery filters', err);
      deliveryTechnicianOptions.value = [];
      deliveryStatusOptions.value = [];
      deliveryAddressOptions.value = [];
    }
  };
  const payroll = ref({ totalPayroll: 0, headcount: 0, byDepartment: {}, employees: [] });
  const salesTrend = ref(0);
  const profitTrend = ref(0);

  const financials = ref({
    revenue: 0,
    vat: 0,
    grossProfit: 0,
    expenses: 0,
    expenseBreakdown: {},
    netProfit: 0
  });

  const balanceSheet = ref({
    assets: [],
    liabilities: [],
    totalAssets: 0,
    totalLiabilities: 0
  });

  const equity = ref({
    capitalContributions: 0,
    grants: 0,
    retainedEarnings: 0,
    dividendsPaid: 0,
    total: 0
  });

  const liabilities = ref({
    loans: 0,
    loansDueDate: null,
    taxPayable: 0,
    taxDueDate: null,
    other: 0,
    total: 0
  });

  const dividends = ref([]);

  const salesMetrics = ref([
    { name: 'Revenue', value: 'K0.00' },
    { name: 'Expenses', value: 'K0.00' },
    { name: 'Net Profit', value: 'K0.00' },
    { name: 'Profit Margin', value: '0%' }
  ]);

  const salesChartData = ref({
    labels: [],
    datasets: []
  });

  const taxSummary = ref({
    totalTaxPaid: 0,
    outstandingTax: 0,
    nextDueDate: null,
    complianceScore: 0
  });

  const taxHistory = ref([]);

  async function fetchHotelSales() {
    try {
      const tid = getTenantId() || localStorage.getItem('tenant_id');
      console.log('[ReportsModule] Fetching hotel sales for tenant:', tid);

      const params = new URLSearchParams({ 
        tenant_id: tid || 'default', 
        period: dateParams.value.range === 'custom' ? 'custom' : (dateParams.value.range === 'month' ? 'monthly' : dateParams.value.range) 
      });
      
      if (dateParams.value.startDate) params.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) params.append('endDate', dateParams.value.endDate);

      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      
      const { getToken } = decodeJWT();
      const baseUrl = API_BASE_URL.replace(/\/$/, '');
      const url = `${baseUrl}/hotel/reports/sales?${params.toString()}`;
      
      console.log('[ReportsModule] Requesting URL:', url);

      const res = await fetch(url, {
        headers: { 
          'Authorization': `Bearer ${getToken()}`,
          'Accept': 'application/json'
        }
      });
      
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      
      const data = await res.json();
      console.log('[ReportsModule] Hotel sales data received:', data);

      hotelSales.value = {
        total: data.total_revenue || data.total || 0,
        room_rev: data.summary?.roomRevenue || 0,
        conf_rev: data.summary?.conferenceRevenue || 0,
        serv_rev: data.summary?.serviceRevenue || 0,
        room_pct: data.summary?.roomPercent || 0,
        conf_pct: data.summary?.conferencePercent || 0,
        serv_pct: data.summary?.servicePercent || 0,
        daily_revenue: Array.isArray(data.dailyRevenue) ? data.dailyRevenue : [],
        transactions: Array.isArray(data.transactions) ? data.transactions : []
      };
    } catch (err) {
      console.error('[ReportsModule] Error fetching hotel sales:', err);
    }
  }

  const newReport = ref({
    type: 'financial',
    startDate: '',
    endDate: '',
    startTime: '00:00',
    endTime: '23:59',
    companyName: '',
    companyAddress: '',
    reportTitle: '',
    logo: ''
  });

  const fetchCompanyDetails = async () => {
    try {
      const tenantId = getTenantId();
      if (!tenantId) return;
      
      let data = null;
      try {
        const u = new URL(`${API_BASE_URL}/tenant-details/details`);
        u.searchParams.append('tenant_id', tenantId);
        const res = await fetch(u);
        if (res.ok) data = await res.json();
      } catch {}
      
      if (!data) {
        try {
          const u2 = new URL(`${API_BASE_URL}/tenants/details`);
          u2.searchParams.append('tenant_id', tenantId);
          const res2 = await fetch(u2);
          if (res2.ok) data = await res2.json();
        } catch {}
      }
      
      const tenant = data?.tenant ?? data ?? null;
      if (tenant) {
        const name = tenant.company_name || tenant.companyName || tenant.businessName || tenant.name || '';
        const addr = tenant.address || tenant.location || '';
        const logo = tenant.company_logo || tenant.logo || '';
        
        newReport.value.companyName = name;
        newReport.value.companyAddress = addr;
        newReport.value.logo = logo;
      }
    } catch (err) {
      console.error('Error fetching company details for reports:', err);
    }
  };

  // Invoices (used to include recent invoices/proposals in reports)
  const invoices = ref([]);
  const invoicesSummary = ref({ totalAmount: 0, count: 0 });

  const fetchInvoices = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId(), limit: 20 });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      if (dateParams.value.startDate) params.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) params.append('endDate', dateParams.value.endDate);

      const { getToken } = decodeJWT();
      const resp = await fetch(`${API_BASE_URL}/invoices/?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!resp.ok) throw new Error('Failed to fetch invoices');
      const data = await resp.json();
      const items = Array.isArray(data) ? data : (data.data || data.items || []);
      invoices.value = items.map(inv => ({
        id: inv.id,
        title: inv.title || inv.name || inv.clientName || `Invoice ${inv.id}`,
        amount: Number(inv.total ?? inv.amount ?? inv.value ?? 0) || 0,
        date: inv.date || inv.created_at || inv.payment_date || null,
        status: inv.status || 'draft'
      }));
      invoicesSummary.value = {
        totalAmount: invoices.value.reduce((s, i) => s + (Number(i.amount) || 0), 0),
        count: invoices.value.length
      };
    } catch (err) {
      console.error('Error fetching invoices for reports:', err);
      invoices.value = [];
      invoicesSummary.value = { totalAmount: 0, count: 0 };
    }
  };

  // Formatting functions
  const formatNumber = (num) => {
    // Use current currency settings for decimal places but return numeric-only string (no symbol)
    const decimals = (currentSettings && currentSettings.value && currentSettings.value.decimalPlaces != null)
      ? parseInt(currentSettings.value.decimalPlaces)
      : 2;
    const n = Number(num) || 0;
    return n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  // Currency composable integration
  const {
    initializeCurrency,
    formatCurrency,
    formatCurrencyCompact,
    currencySymbol,
    currencyCode,
    currentSettings
  } = useCurrency();

  // Local helpers used in templates to replace hard-coded 'K' prefixes
  const formatWithSymbol = (amount) => {
    return formatCurrency(amount);
  };

  // Return the total cost (sum of equipment selling prices) for a delivery ticket.
  // Explicitly sums (item.equipmentPrice * qty) for all items in the ticket.
  const getTicketTotal = (d) => {
    try {
      if (!d) return 0;

      const equipment = Array.isArray(d.equipment) ? d.equipment : [];
      if (equipment.length) {
        return equipment.reduce((acc, it) => {
          const qty = Number(it.quantity || it.qty || 1) || 1;
          const price = Number(it.equipmentPrice ?? it.price ?? it.unitPrice ?? it.sellingPrice ?? 0) || 0;
          return acc + (price * qty);
        }, 0);
      }

      // Fallback only if no equipment list is present (e.g. legacy records)
      const c = d.cost;
      if (c !== undefined && c !== null && !isNaN(Number(c)) && Number(c) !== 0) return Number(c);

      const gt = d.grandTotal;
      if (gt !== undefined && gt !== null && !isNaN(Number(gt))) return Number(gt);

      return 0;
    } catch (e) {
      return 0;
    }
  };

  const formatNegative = (amount) => {
    // display negative amounts with leading minus and formatted currency
    const num = Number(amount) || 0;
    if (num === 0) return formatCurrency(0);
    if (num < 0) return formatCurrency(num); // service will include the sign
    return `-${formatCurrency(num)}`;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    // Ensure timestamp is treated as UTC if it lacks timezone info
    const ts = (typeof dateValue === 'string' && (dateValue.endsWith('Z') || dateValue.includes('+') || dateValue.length === 10))
      ? dateValue
      : (typeof dateValue === 'string' ? `${dateValue}Z` : dateValue);

    const date = new Date(ts);
    if (isNaN(date.getTime())) return 'N/A';

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPeriod = (period) => {
    if (!period || !period.month || !period.year) {
      return 'N/A';
    }
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    try {
      const monthName = months[period.month - 1];
      return `${monthName} ${period.year}`;
    } catch (error) {
      console.error('Error formatting period:', error);
      return 'N/A';
    }
  };

  // Build an HTML report preview (MathJax-ready). This is separate from the LaTeX generation used for PDFs.
  const buildReportPreviewHtml = () => {
    const title = (newReport.value.reportTitle || '').replace(/</g, '&lt;');
    const company = (newReport.value.companyName || '').replace(/</g, '&lt;');
    const address = (newReport.value.companyAddress || '').replace(/</g, '&lt;').replace(/\n/g, '<br/>');
    const dateRange = `${formatDate(newReport.value.startDate)} – ${formatDate(newReport.value.endDate)}`;

    const section = (h) => `<h3 style=\"margin-top:2.5rem;margin-bottom:1rem;color:#1F2937;font-size:1.2rem;border-left:4px solid #2F2E8B;padding-left:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:700;\">${h}</h3>`;
    const tableOpen = (cols) => `<div style=\"overflow-x:auto;margin-top:1rem;border-radius:8px;border:1px solid #f3f4f6;\"><table style=\"width:100%;border-collapse:collapse;font-size:0.9rem;min-width:600px;\"><thead><tr style=\"background:#f9fafb;\">${cols.map(c => `<th style=\"text-align:left;border-bottom:2px solid #f3f4f6;padding:.85rem 1rem;color:#4B5563;font-weight:600;white-space:nowrap;\">${c}</th>`).join('')}</tr></thead><tbody>`;
    const tr = (cells) => `<tr>${cells.map((c, i) => `<td style=\"padding:.85rem 1rem;border-bottom:1px solid #f9fafb;color:#374151;${i === cells.length - 1 ? 'text-align:right;font-weight:700;color:#111827;' : ''}\">${c}</td>`).join('')}</tr>`;
    const tableClose = () => `</tbody></table></div>`;

    let html = `
  <div style=\"font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; color:#111827; background: white; max-width: 1000px; margin: 0 auto;\">
    <div style=\"display:flex;justify-content:space-between;align-items:flex-start;gap:2rem;margin-bottom:3rem;padding-bottom:2rem;border-bottom:1px solid #f3f4f6;\">
      <div style=\"display:flex;gap:1.5rem;align-items:center;\">
        ${newReport.value.logo ? `<div style=\"width:90px;height:90px;border-radius:16px;overflow:hidden;background:#f9fafb;border:1px solid #f3f4f6;display:flex;align-items:center;justify-content:center;box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);\">
          <img src=\"${newReport.value.logo}\" style=\"max-width:100%;max-height:100%;object-fit:contain;\" />
        </div>` : ''}
        <div>
          <h1 style=\"font-size:2rem;margin:0;color:#111827;font-weight:800;letter-spacing:-0.03em;\">${title || 'Business Intelligence Report'}</h1>
          <div style=\"margin-top:.35rem;color:#2F2E8B;font-size:1.35rem;font-weight:700;\">${company}</div>
          <div style=\"color:#6B7280;max-width:400px;font-size:0.95rem;line-height:1.5;\">${address}</div>
        </div>
      </div>
      <div style=\"text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:1rem;\">
         <div style=\"background:#EEF2FF;padding:1.25rem;border-radius:16px;border:1px solid #E0E7FF;box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);min-width:240px;\">
            <div style=\"color:#4338CA;font-weight:700;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;\">Analytical Framework</div>
            <div style=\"color:#1E1B4B;font-size:1.1rem;font-family: serif; font-style: italic;\">$Net\\ Profit = Revenue - Expenses - VAT$</div>
         </div>
         <div style=\"padding:.6rem 1rem;background:#F9FAFB;border-radius:10px;display:inline-block;font-size:0.85rem;color:#4B5563;border:1px solid #F3F4F6;\">
            <i class=\"fas fa-calendar-alt mr-2\"></i> <strong>${dateRange}</strong> &nbsp; <span style=\"color:#D1D5DB;\">|</span> &nbsp; <i class=\"fas fa-clock mr-2\"></i> ${new Date().toLocaleDateString('en-GB')}
         </div>
      </div>
    </div>
    <div style=\"padding:0 0.5rem;\">
  `;

    if (newReport.value.type === 'financial') {
      html += section('Income Statement');
      html += tableOpen(['Item', `Amount (${currencyCode.value || 'ZMW'})`]);
      html += tr(['Revenue', formatWithSymbol(financials.value.revenue)]);
      html += tr(['VAT', `<span style=\\"color:#6B6A9E\\">-${formatWithSymbol(financials.value.vat)}</span>`]);
      html += tr(['Gross Profit', formatWithSymbol(financials.value.grossProfit)]);
      html += tr(['Total Expenses', `<span style=\\"color:#6B6A9E\\">-${formatWithSymbol(financials.value.expenses)}</span>`]);
      html += tr(['Net Profit', formatWithSymbol(financials.value.netProfit)]);
      html += tableClose();

      html += section('Financial Ratios');
      html += tableOpen(['Metric', 'Value']);
      html += tr(['Net Worth', formatWithSymbol(netWorth.value)]);
      html += tr(['Total Equity & Liabilities', formatWithSymbol(totalEquityAndLiabilities.value)]);
      html += tr(['Debt to Equity Ratio', formatNumber(debtToEquityRatio.value)]);
      html += tableClose();

      html += section('Tax Summary');
      html += tableOpen(['Metric', 'Value']);
      html += tr(['Total Tax Paid', formatWithSymbol(taxSummary.value.totalTaxPaid)]);
      html += tr(['Outstanding Tax', formatWithSymbol(taxSummary.value.outstandingTax)]);
      html += tr(['Next Due Date', formatDate(taxSummary.value.nextDueDate)]);
      html += tr(['Compliance Score', `${taxSummary.value.complianceScore}%`]);
      html += tableClose();

      html += `<h4 style=\"margin-top:2.5rem;margin-bottom:1rem;color:#1F2937;font-size:1.1rem;font-weight:700;\">Recent Tax Payments</h4>`;
      html += tableOpen(['Period', 'Amount', 'Status', 'Payment Date']);
      if (!taxHistory.value.length) {
        html += `<tr><td colspan=\"4\" style=\"padding:1.5rem;text-align:center;color:#6B7280;background:#F9FAFB;border-radius:8px;\">No tax payment history available</td></tr>`;
      } else {
        html += taxHistory.value.map(p => tr([
          formatPeriod(p.tax_period),
          formatWithSymbol(p.amount),
          `<span style=\"background:#F3F4F6;padding:2px 8px;border-radius:4px;font-family:monospace;font-size:0.85rem;\">${p.status}</span>`,
          formatDate(p.payment_date)
        ])).join('');
      }
      html += tableClose();

      html += `<h4 style=\"margin-top:2.5rem;margin-bottom:1rem;color:#1F2937;font-size:1.1rem;font-weight:700;\">Recent Invoices / Proposals</h4>`;
      html += tableOpen(['Title', `Amount (${currencyCode.value || 'ZMW'})`]);
      if (!invoices.value.length) {
        html += `<tr><td colspan=\"2\" style=\"padding:1rem;text-align:center;color:#6B7280;background:#F9FAFB;border-radius:8px;\">No invoices available</td></tr>`;
      } else {
        html += invoices.value.map(inv => tr([
          String(inv.title || ''),
          formatWithSymbol(inv.amount)
        ])).join('');
        html += tr([`<strong style=\"color:#2F2E8B\">Total Invoices</strong>`, `<strong style=\"color:#2F2E8B\">${formatWithSymbol(invoicesSummary.value.totalAmount)}</strong>`]);
      }
      html += tableClose();

      html += section('Equity & Capital');
      html += tableOpen(['Item', `Amount (${currencyCode.value || 'ZMW'})`]);
      html += tr(['Capital Contributions', formatWithSymbol(equity.value.capitalContributions)]);
      html += tr(['Grants', formatWithSymbol(equity.value.grants)]);
      html += tr(['Retained Earnings', formatWithSymbol(equity.value.retainedEarnings)]);
      html += tr(['Dividends Paid', `<span style=\\"color:#6B6A9E\\">-${formatWithSymbol(equity.value.dividendsPaid)}</span>`]);
      html += tr(['Total Equity', `<strong>${formatWithSymbol(equity.value.total)}</strong>`]);
      html += tableClose();

      html += section('Liabilities');
      html += tableOpen(['Item', `Amount (${currencyCode.value || 'ZMW'})`, 'Due Date']);
      html += tr(['Outstanding Loans', formatWithSymbol(liabilities.value.loans), formatDate(liabilities.value.loansDueDate)]);
      html += tr(['Tax Payable', formatWithSymbol(liabilities.value.taxPayable), formatDate(liabilities.value.taxDueDate)]);
      html += tr(['Other Liabilities', formatWithSymbol(liabilities.value.other), '-']);
      html += tr(['Total Liabilities', `<strong>${formatWithSymbol(liabilities.value.total)}</strong>`, '-']);
      html += tableClose();
    } else if (newReport.value.type === 'sales') {
      html += section('Sales Metrics');
      html += tableOpen(['Metric', 'Value']);
      html += salesMetrics.value.map(m => tr([m.name, m.value])).join('');
      html += tableClose();

      html += section('Monthly Sales Comparison');
      const ds = salesChartData.value.datasets || [];
      const revenue = ds[0]?.data || [0, 0];
      const expenses = ds[1]?.data || [0, 0];
      const net = ds[2]?.data || [0, 0];
      html += tableOpen(['Period', 'Revenue', 'Expenses', 'Net Profit']);
      html += tr(['Previous Month', formatWithSymbol(revenue[0] || 0), formatWithSymbol(expenses[0] || 0), formatWithSymbol(net[0] || 0)]);
      html += tr(['Current Month', formatWithSymbol(revenue[1] || 0), formatWithSymbol(expenses[1] || 0), formatWithSymbol(net[1] || 0)]);
      html += tableClose();
    } else if (newReport.value.type === 'balance') {
      html += section('Assets');
      html += tableOpen(['Asset', `Value (${currencyCode.value || 'ZMW'})`]);
      html += balanceSheet.value.assets.map(a => tr([a.name, formatWithSymbol(a.value)])).join('');
      html += tr(['Total Assets', `<strong>${formatWithSymbol(balanceSheet.value.totalAssets)}</strong>`]);
      html += tableClose();

      html += section('Liabilities');
      html += tableOpen(['Liability', `Value (${currencyCode.value || 'ZMW'})`]);
      html += balanceSheet.value.liabilities.map(l => tr([l.name, formatWithSymbol(l.value)])).join('');
      html += tr(['Total Liabilities', `<strong>${formatWithSymbol(balanceSheet.value.totalLiabilities)}</strong>`]);
      html += tableClose();
    } else if (newReport.value.type === 'inventory') {
      html += section('Inventory Report');
      html += tableOpen(['Item', 'Quantity', `Value (${currencyCode.value || 'ZMW'})`]);
      html += inventoryItemsList.value.map(i => tr([i.name, String(i.quantity), formatWithSymbol(i.value)])).join('');
      html += tr(['Total', String(inventoryItems.value), `<strong>${formatWithSymbol(inventoryValue.value)}</strong>`]);
      html += tableClose();
    } else if (newReport.value.type === 'income') {
      html += section('Income Statement');
      html += tableOpen(['Item', `Amount (${currencyCode.value || 'ZMW'})`]);
      html += tr(['Revenue', formatWithSymbol(financials.value.revenue)]);
      html += tr(['VAT', `<span style=\\"color:#6B6A9E\\">-${formatWithSymbol(financials.value.vat)}</span>`]);
      html += tr(['Gross Profit', formatWithSymbol(financials.value.grossProfit)]);
      html += tr(['Total Expenses', `<span style=\\"color:#6B6A9E\\">-${formatWithSymbol(financials.value.expenses)}</span>`]);
      html += tr(['Net Profit', `<strong>${formatWithSymbol(financials.value.netProfit)}</strong>`]);
      html += tableClose();
    } else if (newReport.value.type === 'hotel') {
      html += section('Hotel Sales Report');
      html += tableOpen(['Metric', 'Value', 'Percentage']);
      html += tr(['Room Revenue', formatWithSymbol(hotelSales.value.room_rev), `${hotelSales.value.room_pct}%`]);
      html += tr(['Conference Revenue', formatWithSymbol(hotelSales.value.conf_rev), `${hotelSales.value.conf_pct}%`]);
      html += tr(['Service Revenue', formatWithSymbol(hotelSales.value.serv_rev), `${hotelSales.value.serv_pct}%`]);
      html += tr(['<strong>Total Hotel Revenue</strong>', `<strong>${formatWithSymbol(hotelSales.value.total)}</strong>`, '100%']);
      html += tableClose();

      html += section('Daily Summary');
      html += tableOpen(['Date', 'Amount']);
      if (!hotelSales.value.daily_revenue.length) {
        html += `<tr><td colspan="2" style="padding:.5rem;text-align:center;color:#6B7280">No daily data available</td></tr>`;
      } else {
        html += hotelSales.value.daily_revenue.slice(-10).map(d => tr([
          formatDate(d.date),
          formatWithSymbol(d.amount)
        ])).join('');
      }
      html += tableClose();

      html += section('Recent Hotel Transactions');
      html += tableOpen(['Receipt #', 'Customer', 'Type', 'Amount', 'Date']);
      if (!hotelSales.value.transactions.length) {
        html += `<tr><td colspan="5" style="padding:1rem;text-align:center;color:#6B7280;background:#F9FAFB;">No hotel transactions available</td></tr>`;
      } else {
        html += hotelSales.value.transactions.map(t => t.type !== 'summary' ? tr([
          `<div style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:monospace;font-size:0.8rem;" title="${t.receipt_number || t.id}">${t.receipt_number || (t.id ? t.id.substring(0,12) : '—')}</div>`,
          `<div style="max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t.customer || '-'}</div>`,
          `<span style="text-transform:capitalize;font-size:0.8rem;background:#F3F4F6;padding:2px 6px;border-radius:4px;">${t.category || 'room'}</span>`,
          formatWithSymbol(t.amount),
          formatDate(t.date)
        ]) : '').join('');
      }
      html += tableClose();
    } else if (newReport.value.type === 'full') {
      // Financial core
      html += section('Income Statement');
      html += tableOpen(['Item', `Amount (${currencyCode.value || 'ZMW'})`]);
      html += tr(['Revenue', formatWithSymbol(financials.value.revenue)]);
      html += tr(['VAT', `<span style=\\"color:#6B6A9E\\">-${formatWithSymbol(financials.value.vat)}</span>`]);
      html += tr(['Gross Profit', formatWithSymbol(financials.value.grossProfit)]);
      html += tr(['Total Expenses', `<span style=\\"color:#6B6A9E\\">-${formatWithSymbol(financials.value.expenses)}</span>`]);
      html += tr(['Net Profit', `<strong>${formatWithSymbol(financials.value.netProfit)}</strong>`]);
      html += tableClose();

      html += section('Financial Ratios');
      html += tableOpen(['Metric', 'Value']);
      html += tr(['Net Worth', formatWithSymbol(netWorth.value)]);
      html += tr(['Total Equity & Liabilities', formatWithSymbol(totalEquityAndLiabilities.value)]);
      html += tr(['Debt to Equity Ratio', formatNumber(debtToEquityRatio.value)]);
      html += tableClose();

      html += section('Tax Summary');
      html += tableOpen(['Metric', 'Value']);
      html += tr(['Total Tax Paid', formatWithSymbol(taxSummary.value.totalTaxPaid)]);
      html += tr(['Outstanding Tax', formatWithSymbol(taxSummary.value.outstandingTax)]);
      html += tr(['Next Due Date', formatDate(taxSummary.value.nextDueDate)]);
      html += tr(['Compliance Score', `${taxSummary.value.complianceScore}%`]);
      html += tableClose();

      html += `<h4 style=\"margin-top:2rem;margin-bottom:1rem;color:#1F2937;font-size:1.1rem;font-weight:700;\">Recent Invoices / Proposals</h4>`;
      html += tableOpen(['Title', `Amount (${currencyCode.value || 'ZMW'})`]);
      if (!invoices.value.length) {
        html += `<tr><td colspan=\"2\" style=\"padding:1.5rem;text-align:center;color:#6B7280;background:#F9FAFB;\">No invoices available</td></tr>`;
      } else {
        html += invoices.value.map(inv => tr([
          String(inv.title || ''),
          formatWithSymbol(inv.amount)
        ])).join('');
        html += tr([`<strong style=\"color:#2F2E8B\">Total Invoices</strong>`, `<strong>${formatWithSymbol(invoicesSummary.value.totalAmount)}</strong>`]);
      }
      html += tableClose();

      html += section('Assets');
      html += tableOpen(['Asset', `Value (${currencyCode.value || 'ZMW'})`]);
      html += balanceSheet.value.assets.map(a => tr([a.name, formatWithSymbol(a.value)])).join('');
      html += tr(['Total Assets', `<strong>${formatWithSymbol(balanceSheet.value.totalAssets)}</strong>`]);
      html += tableClose();

      html += section('Liabilities');
      html += tableOpen(['Liability', `Value (${currencyCode.value || 'ZMW'})`]);
      html += balanceSheet.value.liabilities.map(l => tr([l.name, formatWithSymbol(l.value)])).join('');
      html += tr(['Total Liabilities', `<strong>${formatWithSymbol(balanceSheet.value.totalLiabilities)}</strong>`]);
      html += tableClose();

      html += section('Inventory Report');
      html += tableOpen(['Item', 'Quantity', `Value (${currencyCode.value || 'ZMW'})`]);
      html += inventoryItemsList.value.map(i => tr([i.name, String(i.quantity), formatWithSymbol(i.value)])).join('');
      html += tr(['Total', String(inventoryItems.value), `<strong>${formatWithSymbol(inventoryValue.value)}</strong>`]);
      html += tableClose();

      // Sales section
      html += section('Sales Metrics');
      html += tableOpen(['Metric', 'Value']);
      html += (salesMetrics.value || []).map(m => tr([m.name, m.value])).join('');
      html += tableClose();
      const ds = salesChartData.value?.datasets || [];
      const revenue = ds[0]?.data || [0, 0];
      const expenses = ds[1]?.data || [0, 0];
      const net = ds[2]?.data || [0, 0];
      html += section('Monthly Sales Comparison');
      html += tableOpen(['Period', 'Revenue', 'Expenses', 'Net Profit']);
      html += tr(['Current Month', formatWithSymbol(revenue[1] || 0), formatWithSymbol(expenses[1] || 0), formatWithSymbol(net[1] || 0)]);
      html += tableClose();

      html += `<h4 style=\"margin-top:2rem;margin-bottom:1rem;color:#1F2937;font-size:1.1rem;font-weight:700;\">Recent Tax Payments</h4>`;
      html += tableOpen(['Period', 'Amount', 'Status', 'Payment Date']);
      if (!taxHistory.value.length) {
        html += `<tr><td colspan=\"4\" style=\"padding:1.5rem;text-align:center;color:#6B7280;background:#F9FAFB;\">No tax payment history available</td></tr>`;
      } else {
        html += taxHistory.value.map(p => tr([
          formatPeriod(p.tax_period),
          formatWithSymbol(p.amount),
          `<span style=\"background:#F3F4F6;padding:2px 8px;border-radius:4px;font-family:monospace;font-size:0.85rem;\">${p.status}</span>`,
          formatDate(p.payment_date)
        ])).join('');
      }
      html += tableClose();

      html += section('Hotel Sales Summary');
      html += tableOpen(['Metric', 'Value']);
      html += tr(['Total Hotel Revenue', formatWithSymbol(hotelSales.value.total)]);
      html += tr(['Room Revenue', formatWithSymbol(hotelSales.value.room_rev)]);
      html += tr(['Conference Revenue', formatWithSymbol(hotelSales.value.conf_rev)]);
      html += tr(['Service Revenue', formatWithSymbol(hotelSales.value.serv_rev)]);
      html += tableClose();
    }

    html += `</div></div>`;
    return html;
  };

  // Fetch data functions
  const fetchFinancialData = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }

      // Add global date filters
      if (dateParams.value.startDate) params.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) params.append('endDate', dateParams.value.endDate);

      // Financial Data needs the branch_id param as well
      // The financial endpoint was updated to accept branch_id
      // We also need to fetch the KPIs to get the main financial summary (revenue, expenses etc)
      const kpiParams = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        kpiParams.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      if (dateParams.value.startDate) kpiParams.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) kpiParams.append('endDate', dateParams.value.endDate);

      // Fetch financial summary from backend report endpoint
      const { getToken } = decodeJWT();
      const headers = { 'Authorization': `Bearer ${getToken()}` };

      // Fetch financial summary from backend report endpoint
      const finRes = await fetch(`${API_BASE_URL}/reports/financial?${kpiParams.toString()}`, { headers });
      if (finRes.ok) {
        const finData = await finRes.json();
        financials.value = finData;
      }

      // Keep existing logic for loans/capital if they don't support branch filtering yet (assumed global/main for now or to be updated later)
      // If loans/capital need filtering, their endpoints need updates. Assuming they are tenant-wide for now or not scope of this immediate task step.
      const [loansResponse, grantsResponse, capitalResponse] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/loans/loans?${params}`, { headers }),
        fetch(`${API_BASE_URL}/loans/loans/grants?${params}`, { headers }),
        fetch(`${API_BASE_URL}/loans/loans/capital?${params}`, { headers })
      ]);

      let loansData = [];
      let grantsData = [];
      let capitalData = [];

      if (loansResponse.status === 'fulfilled' && loansResponse.value.ok) {
        try { loansData = await loansResponse.value.json(); } catch (e) { console.debug('JSON parse fail loans', e); }
      }
      if (grantsResponse.status === 'fulfilled' && grantsResponse.value.ok) {
        try { grantsData = await grantsResponse.value.json(); } catch (e) { console.debug('JSON parse fail grants', e); }
      }
      if (capitalResponse.status === 'fulfilled' && capitalResponse.value.ok) {
        try { capitalData = await capitalResponse.value.json(); } catch (e) { console.debug('JSON parse fail capital', e); }
      }

      loansData = Array.isArray(loansData) ? loansData : [];
      grantsData = Array.isArray(grantsData) ? grantsData : [];
      capitalData = Array.isArray(capitalData) ? capitalData : [];

      const totalLoans = loansData.reduce((sum, loan) => sum + (Number(loan.amount) || 0), 0);
      const totalGrants = grantsData.reduce((sum, grant) => sum + (Number(grant.amount) || 0), 0);
      const totalCapital = capitalData.reduce((sum, cap) => sum + (Number(cap.amount) || 0), 0);

      equity.value = {
        capitalContributions: totalCapital,
        grants: totalGrants,
        retainedEarnings: financials.value.netProfit || 0,
        dividendsPaid: (dividends.value || []).reduce((sum, div) => sum + (Number(div.amount) || 0), 0),
        total: totalCapital + totalGrants + (financials.value.netProfit || 0)
      };

      liabilities.value = {
        loans: totalLoans,
        loansDueDate: loansData[0]?.dueDate || null,
        taxPayable: financials.value.taxPayable || 0,
        taxDueDate: null,
        other: 0,
        total: totalLoans + (financials.value.taxPayable || 0)
      };

      dividends.value = capitalData
        .filter(cap => cap.type === 'dividend')
        .map(div => ({
          id: div.id,
          period: formatDate(div.dateContributed),
          amount: Number(div.amount) || 0,
          distributionDate: div.dateContributed
        }));

      balanceSheet.value = {
        assets: [
          { name: 'Cash & Equivalents', value: financials.value.cashBalance || 0 },
          { name: 'Inventory', value: inventoryValue.value },
          { name: 'Equipment', value: financials.value.equipmentValue || 0 }
        ],
        liabilities: [
          { name: 'Outstanding Loans', value: totalLoans },
          { name: 'Tax Payable', value: financials.value.taxPayable || 0 },
          { name: 'Other Liabilities', value: 0 }
        ],
        totalAssets: (financials.value.cashBalance || 0) + inventoryValue.value + (financials.value.equipmentValue || 0),
        totalLiabilities: totalLoans + (financials.value.taxPayable || 0)
      };
    } catch (error) {
      console.error('Error fetching financial data:', error);
      alert('Failed to load financial data. Please try again.');
    }
  };

  const fetchTaxData = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      
      // Use the global date filters for more accurate tax audit
      if (dateParams.value.startDate) params.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) params.append('endDate', dateParams.value.endDate);

      const { getToken } = decodeJWT();
      
      // Fetch summary from the unified ZRA tax summary endpoint
      const response = await fetch(`${API_BASE_URL}/zra/tax-summary?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch tax summary');
      const data = await response.json();
      
      // Map history from the summary response
      const history = Array.isArray(data.history) ? data.history : [];
      taxHistory.value = history.map(payment => ({
        id: payment.id || `tax-${Date.now()}`,
        tax_period: payment.tax_period || {
          month: new Date(payment.payment_date).getMonth() + 1,
          year: new Date(payment.payment_date).getFullYear()
        },
        amount: payment.amount || 0,
        status: payment.status || 'paid',
        payment_date: payment.payment_date || new Date().toISOString()
      }));

      // Update summary cards with audit-based calculations from backend
      taxSummary.value = {
        totalTaxPaid: history.reduce((sum, p) => sum + (p.status === 'paid' ? p.amount : 0), 0),
        outstandingTax: data.outstanding || 0,
        nextDueDate: history.find(p => p.status === 'pending')?.due_date || null,
        complianceScore: history.length ? Math.round((history.filter(p => p.status === 'paid').length / history.length) * 100) : 100,
        estimatedTax: data.estimated_tax || 0,
        auditSales: data.audit_sales || 0
      };
    } catch (error) {
      console.error('Error fetching tax data:', error);
      taxHistory.value = [];
      taxSummary.value = { totalTaxPaid: 0, outstandingTax: 0, nextDueDate: null, complianceScore: 0 };
    }
  };

  const fetchInventoryData = async () => {
    try {
      // Use the main inventory endpoint to get full item details including equipmentBuyingPrice
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      const { getToken } = decodeJWT();
      const response = await fetch(`${API_BASE_URL}/inventory?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch inventory data: ${response.statusText}`);
      const data = await response.json();

      // Handle both array and object responses
      const items = Array.isArray(data) ? data : (data.items || data.data || []);
      // Add value property to each item for display in the table
      const processedItems = items.map(item => {
        const price = Number(item.price || item.sellingPrice || item.equipmentPrice || 0);
        const qty = Number(item.stockQty || item.quantity || 0);
        return {
          ...item,
          value: price * qty,
          quantity: qty
        };
      });
      inventoryItemsList.value = processedItems;
      // Calculate totals from processed items
      inventoryItems.value = processedItems.length;
      inventoryValue.value = processedItems.reduce((sum, item) => sum + item.value, 0);

      console.log('[ReportsModule] Fetched inventory:', {
        itemCount: items.length,
        totalValue: inventoryValue.value,
        sampleItem: items[0],
        equipmentItems: items.filter(i => i.type === 'equipment').length
      });
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      alert('Failed to load inventory data. Please try again.');
    }
  };

  // Fetch top-level KPIs (combined POS + delivery sales and net profit)
  // Use the same KPI endpoint DashboardHome uses so totals match across modules
  const fetchTopKPIs = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      params.set('include_delivery', 'true');
      params.set('include_pos', 'true');
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      if (dateParams.value.startDate) params.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) params.append('endDate', dateParams.value.endDate);

      const { getToken } = decodeJWT();
      const url = `${API_BASE_URL}/kpis/kpis?${params.toString()}`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) {
        // fallback to older financial endpoint if KPIs endpoint missing
        if (selectedBranch.value && selectedBranch.value._id) {
          params.set('branch_id', selectedBranch.value._id);
        }
        const fallback = await fetch(`${API_BASE_URL}/reports/financial?${params.toString()}`, {
          headers: { 'Authorization': `Bearer ${getToken()}` }
        }).catch(() => null);
        if (!fallback || !fallback.ok) return;
        const fdata = await fallback.json();
        if (fdata && typeof fdata.totalSales !== 'undefined') setAuthoritativeTotalSales(Number(fdata.totalSales) || 0);
        if (fdata && typeof fdata.netProfit !== 'undefined') {
          let np = fdata.netProfit;
          if (typeof np === 'object' && np !== null) np = np.value || np.amount || 0;
          backendNetProfit.value = Number(np) || 0;
          updateDisplayedNetProfit();
        }
        return;
      }
      const data = await res.json();
      // Map KPI fields into module state. KPI endpoint may return different key names across versions.
      setAuthoritativeTotalSales(data.totalSales);

      // [NEW] Populate chart data
      salesData.value = data.salesData || [];
      weeklyTransactions.value = data.weeklyTransactions || [];
      processedData.value = processDataInline(salesData.value, weeklyTransactions.value);

      let rawProfit = data.profits ?? data.netProfit ?? data.net_profit ?? 0;
      if (typeof rawProfit === 'object' && rawProfit !== null) rawProfit = rawProfit.value || rawProfit.amount || 0;
      backendNetProfit.value = Number(rawProfit) || 0;
      updateDisplayedNetProfit();
    } catch (e) {
      // ignore and let other flows set KPIs
      console.debug('fetchTopKPIs failed', e);
    }
  };

  const fetchPayrollData = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      if (dateParams.value.startDate) params.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) params.append('endDate', dateParams.value.endDate);

      const { getToken } = decodeJWT();
      const response = await fetch(`${API_BASE_URL}/reports/reports/financial?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch payroll data: ${response.statusText}`);
      const data = await response.json();
      // backend returns payroll inside the financial payload
      if (data && data.payroll) {
        payroll.value = {
          totalPayroll: data.payroll.totalPayroll || 0,
          headcount: data.payroll.headcount || 0,
          byDepartment: data.payroll.byDepartment || {},
          employees: data.payroll.employees || []
        };
      }
    } catch (error) {
      console.error('Error fetching payroll data:', error);
      // keep payroll at safe defaults
      payroll.value = { totalPayroll: 0, headcount: 0, byDepartment: {}, employees: [] };
    }
  };

  // Fetch delivery tickets and KPI summary
  const fetchDeliveryTickets = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (deliveryFilter.value.status) params.set('status', deliveryFilter.value.status);
      if (deliveryFilter.value.technician) params.set('technician', deliveryFilter.value.technician);
      if (deliveryFilter.value.deliveryAddress) params.set('deliveryAddress', deliveryFilter.value.deliveryAddress);
      if (deliveryFilter.value.startDate) params.set('startDate', deliveryFilter.value.startDate);
      if (deliveryFilter.value.endDate) params.set('endDate', deliveryFilter.value.endDate);
      if (deliveryFilter.value.endDate) params.set('endDate', deliveryFilter.value.endDate);
      params.set('limit', String(deliveryPageSize.value));
      params.set('offset', String(deliveryPage.value * deliveryPageSize.value));
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      const { getToken } = decodeJWT();
      const url = `${API_BASE_URL}/reports/reports/delivery-tickets?${params.toString()}`;
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (!res.ok) throw new Error(`Failed to fetch delivery tickets: ${res.status}`);
      const data = await res.json();
      deliveryTickets.value = Array.isArray(data.items) ? data.items : [];
      deliveryTotalCount.value = Number(data.totalCount || 0);
      if (data.summary) {
        // copy known keys defensively
        const s = data.summary;
        deliverySummary.value = {
          totalTickets: s.totalTickets || 0,
          totalQuantity: s.totalQuantity || 0,
          totalCost: s.totalCost || 0,
          totalEquipmentBuyingPrice: s.totalEquipmentBuyingPrice || 0,
          totalEquipmentPrice: s.totalEquipmentPrice || 0,
          totalBuyingCost: s.totalBuyingCost || 0,
          varianceLoss: s.varianceLoss || 0,
          totalProfit: s.totalProfit || 0,
          netSales: s.netSales || 0
        };
        // attach stock lists if present
        deliverySummary.value.lowStock = s.lowStock || [];
        deliverySummary.value.criticalStock = s.criticalStock || [];
        deliverySummary.value.emptyStock = s.emptyStock || [];
      }
      // refresh persisted counts which backend may have upserted
      try {
        await fetchInventorySummary();
      } catch (e) {
        // ignore
      }
      // After delivery tickets are loaded, recalc displayed net profit
      updateDisplayedNetProfit();
    } catch (err) {
      console.error('Error fetching delivery tickets:', err);
      deliveryTickets.value = [];
    }
  };

  const clearDeliveryFilters = () => {
    deliveryFilter.value = { status: '', technician: '', deliveryAddress: '', startDate: '', endDate: '' };
    deliveryPage.value = 0;
    fetchDeliveryTickets();
  };

  const previewPrev = () => {
    if (deliveryPage.value > 0) {
      deliveryPage.value -= 1;
      fetchDeliveryTickets();
    }
  };

  const previewNext = () => {
    const max = Math.floor((deliveryTotalCount.value - 1) / deliveryPageSize.value);
    if (deliveryPage.value < max) {
      deliveryPage.value += 1;
      fetchDeliveryTickets();
    }
  };

  const applyDeliveryFilters = () => {
    deliveryPage.value = 0;
    fetchDeliveryTickets();
  };

  // Notifications (basic): fetch and mark-read handlers (graceful if backend lacks endpoints)
  const notifications = ref([]);
  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

  const fetchNotifications = async () => {
    try {
      const { getToken } = decodeJWT();
      const res = await fetch(`${API_BASE_URL}/notifications?tenant_id=${getTenantId()}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) return; // silent fail
      const data = await res.json();
      notifications.value = Array.isArray(data) ? data : [];
    } catch (e) {
      // ignore
    }
  };

  const markNotificationRead = async (id) => {
    try {
      const { getToken } = decodeJWT();
      await fetch(`${API_BASE_URL}/notifications/${id}/read?tenant_id=${getTenantId()}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const n = notifications.value.find(x => x.id === id);
      if (n) n.read = true;
    } catch (e) {
      // ignore
    }
  };

  const dismissNotification = async (id) => {
    try {
      const { getToken } = decodeJWT();
      const res = await fetch(`${API_BASE_URL}/notifications/${id}?tenant_id=${getTenantId()}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!res.ok) return;
      // remove from local list
      notifications.value = notifications.value.filter(n => n.id !== id);
    } catch (e) {
      // ignore
    }
  };

  const fetchSalesChartData = async () => {
    try {
      const params = new URLSearchParams({ tenant_id: getTenantId() });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      if (dateParams.value.startDate) params.append('startDate', dateParams.value.startDate);
      if (dateParams.value.endDate) params.append('endDate', dateParams.value.endDate);

      const { getToken } = decodeJWT();
      const response = await fetch(`${API_BASE_URL}/reports/reports/sales/chart?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch sales chart data: ${response.statusText}`);
      const data = await response.json();
      salesChartData.value = {
        labels: data.labels || [],
        datasets: [
          {
            label: 'Revenue',
            data: data.revenue || [],
            backgroundColor: 'rgba(34, 197, 94, 0.2)', // Green background
            borderColor: '#22C55E', // Green border
            borderWidth: 2
          },
          {
            label: 'Expenses',
            data: data.expenses || [],
            backgroundColor: 'rgba(239, 68, 68, 0.2)', // Red background
            borderColor: '#EF4444', // Red border
            borderWidth: 2
          },
          {
            label: 'Net Profit',
            data: data.netProfit || [],
            backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue background
            borderColor: '#3B82F6', // Blue border
            borderWidth: 2
          }
        ]
      };
    } catch (error) {
      console.error('Error fetching sales chart data:', error);
      salesChartData.value = { labels: [], datasets: [] };
      alert('Failed to load sales chart data. Please try again.');
    }
  };

  const fetchExpensesData = async () => {
    try {
      const currentDate = new Date();
      const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const firstDayPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const params = new URLSearchParams({
        tenant_id: getTenantId(),
        start_date: firstDayPreviousMonth.toISOString().split('T')[0],
        end_date: currentDate.toISOString().split('T')[0]
      });
      if (selectedBranch.value && (selectedBranch.value._id || selectedBranch.value.id)) {
        params.append('branch_id', selectedBranch.value._id || selectedBranch.value.id);
      }
      const { getToken } = decodeJWT();
      const response = await fetch(`${API_BASE_URL}/expenses/?${params}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const expensesData = await response.json();
      const currentMonthExpenses = expensesData
        .filter(expense => new Date(expense.expense_date) >= firstDayCurrentMonth)
        .reduce((sum, expense) => sum + expense.amount, 0);
      const previousMonthExpenses = expensesData
        .filter(expense => {
          const expenseDate = new Date(expense.expense_date);
          return expenseDate >= firstDayPreviousMonth && expenseDate < firstDayCurrentMonth;
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        currentMonth: currentMonthExpenses,
        previousMonth: previousMonthExpenses,
        categoryBreakdown: expensesData.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {})
      };
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return { currentMonth: 0, previousMonth: 0, categoryBreakdown: {} };
    }
  };

  const fetchMonthlySalesData = async () => {
    try {
      const currentDate = new Date();
      const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const firstDayPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const currentMonthParams = new URLSearchParams({
        tenant_id: getTenantId(),
        range: 'custom',
        start_date: firstDayPreviousMonth.toISOString().split('T')[0],
        end_date: currentDate.toISOString().split('T')[0]
      });
      const previousMonthParams = new URLSearchParams({
        tenant_id: getTenantId(),
        range: 'custom',
        start_date: firstDayPreviousMonth.toISOString().split('T')[0],
        end_date: firstDayCurrentMonth.toISOString().split('T')[0]
      });
      if (selectedBranch.value && selectedBranch.value._id) {
        currentMonthParams.append('branch_id', selectedBranch.value._id);
        previousMonthParams.append('branch_id', selectedBranch.value._id);
      }
      const { getToken } = decodeJWT();
      const headers = { 'Authorization': `Bearer ${getToken()}` };
      const [currentMonthResponse, previousMonthResponse, expensesData] = await Promise.all([
        fetch(`${API_BASE_URL}/pos/sales?${currentMonthParams}`, { headers }),
        fetch(`${API_BASE_URL}/pos/sales?${previousMonthParams}`, { headers }),
        fetchExpensesData()
      ]);
      const [currentMonthData, previousMonthData] = await Promise.all([
        currentMonthResponse.json(),
        previousMonthResponse.json()
      ]);

      const currentMonthSales = currentMonthData.total || 0;
      const previousMonthSales = previousMonthData.total || 0;
      // store month-specific sales separately so we don't overwrite the authoritative KPI totalSales
      monthlySales.value = currentMonthSales;
      const salesDifference = currentMonthSales - previousMonthSales;
      salesTrend.value = previousMonthSales !== 0
        ? ((salesDifference / previousMonthSales) * 100).toFixed(1)
        : '0';

      const daysInCurrentMonth = Math.ceil((currentDate - firstDayCurrentMonth) / (1000 * 60 * 60 * 24));
      const currentMonthProfit = currentMonthSales - expensesData.currentMonth;
      const previousMonthProfit = previousMonthSales - expensesData.previousMonth;
      const profitDifference = currentMonthProfit - previousMonthProfit;
      financials.value = {
        ...financials.value,
        revenue: currentMonthSales,
        vat: currentMonthData.vat || 0,
        expenses: expensesData.currentMonth,
        expenseBreakdown: expensesData.categoryBreakdown,
        grossProfit: currentMonthSales - (currentMonthData.vat || 0),
        netProfit: currentMonthProfit
      };
      // keep top-level summary in sync
      // set financials.netProfit (used as fallback) and update displayed net profit combining backend and delivery adjustments
      financials.value = {
        ...financials.value,
        revenue: currentMonthSales,
        vat: currentMonthData.vat || 0,
        expenses: expensesData.currentMonth,
        expenseBreakdown: expensesData.categoryBreakdown,
        grossProfit: currentMonthSales - (currentMonthData.vat || 0),
        netProfit: currentMonthProfit
      };
      // If backendNetProfit wasn't set by fetchTopKPIs, use the computed currentMonthProfit as base
      if (backendNetProfit.value === null) {
        backendNetProfit.value = Number(currentMonthProfit) || 0;
      }
      updateDisplayedNetProfit();
      profitTrend.value = previousMonthProfit !== 0
        ? ((profitDifference / Math.abs(previousMonthProfit)) * 100).toFixed(1)
        : '0';
      salesMetrics.value = [
        { name: 'Revenue', value: formatWithSymbol(currentMonthSales) },
        { name: 'Expenses', value: formatWithSymbol(expensesData.currentMonth) },
        { name: 'Payroll', value: formatWithSymbol(payroll.totalPayroll) },
        { name: 'Net Profit (after Payroll)', value: formatWithSymbol(currentMonthProfit - payroll.totalPayroll) },
        { name: 'Profit Margin', value: `${(((currentMonthProfit - payroll.totalPayroll) / currentMonthSales) * 100 || 0).toFixed(1)}%` }
      ];
      salesChartData.value = {
        labels: ['Previous Month', 'Current Month'],
        datasets: [
          {
            label: 'Revenue',
            data: [previousMonthSales, currentMonthSales],
            backgroundColor: 'rgba(34, 197, 94, 0.2)', // Green background
            borderColor: '#22C55E', // Green border
            borderWidth: 2
          },
          {
            label: 'Expenses',
            data: [expensesData.previousMonth, expensesData.currentMonth],
            backgroundColor: 'rgba(239, 68, 68, 0.2)', // Red background
            borderColor: '#EF4444', // Red border
            borderWidth: 2
          },
          {
            label: 'Net Profit',
            data: [previousMonthProfit, currentMonthProfit],
            backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue background
            borderColor: '#3B82F6', // Blue border
            borderWidth: 2
          }
        ]
      };
      if (currentTab.value === 'sales' && salesChart.value) {
        nextTick(() => initSalesChart());
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
      // Don't overwrite the top-level KPI `totalSales` which we fetch from the KPI endpoint
      // earlier (fetchTopKPIs). If the monthly POS calls fail, we should keep the KPI value
      // provided by the backend instead of clearing it — otherwise the Total Sales card
      // will flash then disappear.
      salesTrend.value = '0';
      // Reset only the local computed netProfit fallback; preserve backendNetProfit if it exists.
      financials.value = { ...financials.value, netProfit: 0 };
      updateDisplayedNetProfit();
      // Keep sales metrics useful: show totalSales (if present) and zero for month-specific values
      salesMetrics.value = [
        { name: 'Revenue', value: formatWithSymbol(totalSales.value || 0) },
        { name: 'Expenses', value: formatWithSymbol(0) },
        { name: 'Payroll', value: formatWithSymbol(payroll.totalPayroll) },
        { name: 'Net Profit (after Payroll)', value: formatWithSymbol((Number(financials.value.netProfit || 0) - payroll.totalPayroll)) },
        { name: 'Profit Margin', value: '0%' }
      ];
      salesChartData.value = {
        labels: ['Previous Month', 'Current Month'],
        datasets: [
          {
            label: 'Revenue',
            data: [0, 0],
            backgroundColor: 'rgba(34, 197, 94, 0.2)', // Green background
            borderColor: '#22C55E', // Green border
            borderWidth: 2
          },
          {
            label: 'Expenses',
            data: [0, 0],
            backgroundColor: 'rgba(239, 68, 68, 0.2)', // Red background
            borderColor: '#EF4444', // Red border
            borderWidth: 2
          },
          {
            label: 'Net Profit',
            data: [0, 0],
            backgroundColor: 'rgba(59, 130, 246, 0.2)', // Blue background
            borderColor: '#3B82F6', // Blue border
            borderWidth: 2
          }
        ]
      };
    }
  };

  // Initialize Chart.js
  const initSalesChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (salesChart.value && salesChartData.value.labels.length > 0) {
      // create local formatter wrappers to avoid relying on Chart runtime 'this' and to handle missing functions
      const tickFormatter = (raw) => {
        const v = (raw && typeof raw === 'object' && raw.value != null) ? raw.value : raw;
        try {
          if (formatCurrencyCompact && typeof formatCurrencyCompact === 'function') return formatCurrencyCompact(v);
          if (formatCurrency && typeof formatCurrency === 'function') return formatCurrency(v);
          return v;
        } catch (e) {
          return v;
        }
      };

      const tooltipFormatter = (label, raw) => {
        const v = (raw && raw.parsed && raw.parsed.y != null) ? raw.parsed.y : raw;
        try {
          return label ? `${label}: ${formatCurrency(v)}` : formatCurrency(v);
        } catch (e) {
          return label ? `${label}: ${v}` : `${v}`;
        }
      };

      chartInstance = new Chart(salesChart.value, {
        type: 'bar',
        data: salesChartData.value,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: `Amount (${currencyCode.value || 'ZMW'})`,
                font: { weight: 'bold' },
                color: '#1F2937'
              },
              ticks: {
                color: '#4B5563',
                callback: function (value) {
                  return tickFormatter(value);
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Period',
                font: { weight: 'bold' },
                color: '#1F2937'
              },
              ticks: { color: '#4B5563' }
            }
          },
          plugins: {
            legend: { position: 'top', labels: { color: '#1F2937' } },
            title: {
              display: true,
              text: `Monthly Sales Comparison (${currencyCode.value || 'ZMW'})`,
              font: { size: 16, weight: 'bold' },
              color: '#1F2937'
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || '';
                  return tooltipFormatter(label, context);
                }
              }
            }
          }
        }
      });
    }
  };

  // Generate LaTeX report
  const generateReport = async () => {
    if (!newReport.value.startDate || !newReport.value.endDate || !newReport.value.companyName || !newReport.value.reportTitle) {
      alert('Please fill in all required fields.');
      return;
    }
    loading.value = true;
    try {
      let latexContent = `
\\documentclass[11pt, a4paper, twocolumn]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{margin=1in}
\\usepackage{booktabs}
\\usepackage{xcolor}
\\usepackage{parskip}
\\usepackage{sectsty}
\\sectionfont{\\large\\bfseries}
\\subsectionfont{\\normalsize\\bfseries}
\\usepackage{times}
\\setlength{\\columnsep}{20pt}
\\usepackage{caption}
\\captionsetup{font=small,labelfont=bf}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\setlength{\\headheight}{14pt}
\\fancyhead[L]{${newReport.value.companyName.replace(/&/g, '\\&').replace(/%/g, '\\%')}}
\\fancyhead[R]{${newReport.value.reportTitle.replace(/&/g, '\\&').replace(/%/g, '\\%')}}
\\fancyfoot[C]{\\thepage}
\\definecolor{headercolor}{HTML}{1F2937}
\\definecolor{subheadercolor}{HTML}{6B7280}
\\definecolor{highlightcolor}{HTML}{F7F7F7}
\\definecolor{accentcolor}{HTML}{2F2E8B}
\\definecolor{negativecolor}{HTML}{6B6A9E}
\\begin{document}

\\begin{titlepage}
    \\centering
    \\vspace*{2cm}
    \\Huge
    \\textbf{${newReport.value.reportTitle.replace(/&/g, '\\&')}} \\\\
    \\vspace{0.5cm}
    \\Large
    ${newReport.value.type === 'financial' ? 'Financial Statement' : newReport.value.type === 'sales' ? 'Sales Analysis' : newReport.value.type === 'balance' ? 'Balance Sheet' : 'Inventory Report'} \\\\
    \\vspace{0.5cm}
    \\normalsize
    ${newReport.value.companyName.replace(/&/g, '\\&')} \\\\
    ${newReport.value.companyAddress.replace(/&/g, '\\&').replace(/\n/g, '\\\\')} \\\\
    \\vspace{2cm}
    \\normalsize
    Prepared on ${formatDate(new Date())} \\\\
    \\vfill
    \\normalsize
    Date Range: ${formatDate(newReport.value.startDate)} to ${formatDate(newReport.value.endDate)} \\\\
\\end{titlepage}

`;

      // Inject payroll LaTeX when available so backend pdflatex receives payroll info
      try {
        const payrollInfo = payroll.value || { totalPayroll: 0, headcount: 0, byDepartment: {}, employees: [] };
        const deptRows = Object.entries(payrollInfo.byDepartment || {}).map(([d, s]) => {
          const total = formatNumber(s.total || 0);
          const count = s.count || 0;
          return `        ${d.replace(/&/g, '\\&')} & ${total} & ${count} \\\\`;
        }).join('\n');

        const employeesRows = (payrollInfo.employees || []).map(e => `        ${String(e.name || '').replace(/&/g, '\\&')} & ${String(e.empNo || '')} & ${String(e.department || '').replace(/&/g, '\\&')} & ${formatNumber(e.basicPay || 0)} \\\\`).join('\n');

        const payrollTex = `
\\section{Payroll Summary}
\\begin{table}[h]
    \\centering
    \\caption{Payroll Summary}
    \\begin{tabular}{l r}
        \\toprule
        \\textbf{Metric} & \\textbf{Value} \\\\ 
        \\midrule
        Total Payroll & ${formatNumber(payrollInfo.totalPayroll || 0)} \\\\ 
        Headcount & ${payrollInfo.headcount || 0} \\\\ 
        \\bottomrule
    \\end{tabular}
\\end{table}
`;

        let payrollDeptTex = '';
        if (deptRows.length) {
          payrollDeptTex = `\n\\subsection{Payroll by Department}\n\\begin{tabular}{l r l}\n\\toprule\\nDepartment & Total (${currencyCode.value || 'ZMW'}) & Headcount\\\\n\\midrule\n${deptRows}\n\\bottomrule\n\\end{tabular}\n`;
        }

        let payrollEmployeesTex = '';
        if (employeesRows.length) {
          payrollEmployeesTex = `\n\\subsection{Employee List}\n\\begin{tabular}{l l l r}\n\\toprule\\nName & Emp No & Department & Basic Pay\\\\n\\midrule\n${employeesRows}\n\\bottomrule\n\\end{tabular}\n`;
        }

        // For financial reports include full payroll section; for sales/balance include brief summary
        if (newReport.value.type === 'financial') {
          latexContent += payrollTex + payrollDeptTex + payrollEmployeesTex + '\n';
        } else if (newReport.value.type === 'sales' || newReport.value.type === 'balance') {
          latexContent += payrollTex + '\n';
        }
      } catch (e) {
        console.debug('Skipping payroll injection into LaTeX due to error:', e);
      }

      if (newReport.value.type === 'financial') {
        latexContent += `
\\section{Income Statement}
\\begin{table}[h]
  \\centering
  \\caption{Income Statement}
  \\begin{tabular}{l r}
    \\toprule
    \\textbf{Item} & \\textbf{Amount (${currencyCode.value || 'ZMW'})} \\\\
        \\midrule
        Revenue & ${formatNumber(financials.value.revenue)} \\\\
        VAT & \\textcolor{negativecolor}{-${formatNumber(financials.value.vat)}} \\\\
        \\rowcolor{highlightcolor} Gross Profit & ${formatNumber(financials.value.grossProfit)} \\\\
        \\midrule
        \\multicolumn{2}{l}{\\textit{Expenses Breakdown}} \\\\
${Object.entries(financials.value.expenseBreakdown).map(([category, amount]) => `        ${category.replace(/&/g, '\\&')} & \\textcolor{negativecolor}{-${formatNumber(amount)}} \\\\`).join('\n')}
        \\midrule
        Total Expenses & \\textcolor{negativecolor}{-${formatNumber(financials.value.expenses)}} \\\\
        \\rowcolor{highlightcolor} \\textbf{Net Profit} & \\textcolor{${financials.value.netProfit >= 0 ? 'accentcolor' : 'negativecolor'}}{${formatNumber(financials.value.netProfit)}} \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\section{Financial Ratios}
\\begin{tabular}{l l}
    \\toprule
    \\textbf{Metric} & \\textbf{Value} \\\\
    \\midrule
    Net Worth & ${formatNumber(netWorth.value)} \\\\
    Total Equity \\& Liabilities & ${formatNumber(totalEquityAndLiabilities.value)} \\\\
    Debt to Equity Ratio & ${formatNumber(debtToEquityRatio.value)} \\\\
    \\bottomrule
\\end{tabular}

\\section{Tax Summary}
\\begin{tabular}{l l}
    \\toprule
    \\textbf{Metric} & \\textbf{Value} \\\\
    \\midrule
    Total Tax Paid & ${formatNumber(taxSummary.value.totalTaxPaid)} \\\\
    Outstanding Tax & ${formatNumber(taxSummary.value.outstandingTax)} \\\\
    Next Due Date & ${formatDate(taxSummary.value.nextDueDate)} \\\\
    Compliance Score & ${taxSummary.value.complianceScore}\\% \\\\
    \\bottomrule
\\end{tabular}

\subsection{Recent Tax Payments}
\begin{table}[h]
  \centering
  \caption{Recent Tax Payments}
  \begin{tabular}{l r c r}
    	oprule
  	extbf{Period} & \textbf{Amount (${currencyCode.value || 'ZMW'})} & \textbf{Status} & \textbf{Payment Date} \\
    \midrule
${taxHistory.value.length === 0 ? '        \\multicolumn{4}{c}{No tax payment history available} \\' : taxHistory.value.map(payment => `        ${formatPeriod(payment.tax_period).replace(/&/g, '\\&')} & ${formatNumber(payment.amount)} & \\texttt{${payment.status.replace(/&/g, '\\&')}} & ${formatDate(payment.payment_date).replace(/&/g, '\\&')} \\`).join('\n')}
    \bottomrule
  \end{tabular}
\end{table}

\subsection{Recent Invoices}
\begin{table}[h]
  \centering
  \caption{Recent Invoices / Proposals}
  \begin{tabular}{l r}
    	oprule
    	extbf{Title} & \textbf{Amount (${currencyCode.value || 'ZMW'})} \\
    \midrule
${invoices.value.length === 0 ? '        \\multicolumn{2}{c}{No invoices available} \\' : invoices.value.map(inv => `        ${String(inv.title || '').replace(/&/g, '\\&')} & ${formatNumber(inv.amount)} \\`).join('\n')}
    \rowcolor{highlightcolor} \textbf{Total Invoices} & ${formatNumber(invoicesSummary.value.totalAmount)} \\
    \bottomrule
  \end{tabular}
\end{table}
\\section{Equity \\& Capital}
\\begin{table}[h]
    \\centering
  \\caption{Equity \\& Capital}
  \\begin{tabular}{l r}
    \\toprule
    \\textbf{Item} & \\textbf{Amount (${currencyCode.value || 'ZMW'})} \\\\
        \\midrule
        Capital Contributions & ${formatNumber(equity.value.capitalContributions)} \\\\
        Grants & ${formatNumber(equity.value.grants)} \\\\
        Retained Earnings & ${formatNumber(equity.value.retainedEarnings)} \\\\
        Dividends Paid & \\textcolor{negativecolor}{-${formatNumber(equity.value.dividendsPaid)}} \\\\
        \\rowcolor{highlightcolor} \\textbf{Total Equity} & ${formatNumber(equity.value.total)} \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\section{Liabilities}
\\begin{table}[h]
    \\centering
    \\caption{Liabilities}
  \\begin{tabular}{l r r}
    \\toprule
    \\textbf{Item} & \\textbf{Amount (${currencyCode.value || 'ZMW'})} & \\textbf{Due Date} \\\\
        \\midrule
        Outstanding Loans & ${formatNumber(liabilities.value.loans)} & ${formatDate(liabilities.value.loansDueDate)} \\\\
        Tax Payable & ${formatNumber(liabilities.value.taxPayable)} & ${formatDate(liabilities.value.taxDueDate)} \\\\
        Other Liabilities & ${formatNumber(liabilities.value.other)} & - \\\\
        \\rowcolor{highlightcolor} \\textbf{Total Liabilities} & ${formatNumber(liabilities.value.total)} & - \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\section{Dividend Distribution}
\\begin{table}[h]
    \\centering
  \\caption{Dividend Distribution}
  \\begin{tabular}{l r r}
    \\toprule
    \\textbf{Period} & \\textbf{Amount (${currencyCode.value || 'ZMW'})} & \\textbf{Distribution Date} \\\\
        \\midrule
${dividends.value.map(dividend => `        ${dividend.period.replace(/&/g, '\\&')} & ${formatNumber(dividend.amount)} & ${formatDate(dividend.distributionDate).replace(/&/g, '\\&')} \\\\`).join('\n')}
        \\bottomrule
    \\end{tabular}
\\end{table}
`;
      } else if (newReport.value.type === 'sales') {
        latexContent += `
\\section{Sales Analysis}
\\subsection{Sales Metrics}
\\begin{tabular}{l l}
    \\toprule
    \\textbf{Metric} & \\textbf{Value} \\\\
    \\midrule
${salesMetrics.value.map(metric => `    ${metric.name.replace(/&/g, '\\&')} & ${metric.value.replace(/&/g, '\\&')} \\\\`).join('\n')}
    \\bottomrule
\\end{tabular}

\\subsection{Monthly Sales Comparison}
% Note: Bar chart would be included here if graphics were supported
\\begin{tabular}{l r r}
    \\toprule
    \\textbf{Period} & \\textbf{Revenue (ZMW)} & \\textbf{Expenses (ZMW)} & \\textbf{Net Profit (ZMW)} \\\\
    \\midrule
    Previous Month & ${formatNumber(salesChartData.value.datasets[0].data[0])} & ${formatNumber(salesChartData.value.datasets[1].data[0])} & ${formatNumber(salesChartData.value.datasets[2].data[0])} \\\\
    Current Month & ${formatNumber(salesChartData.value.datasets[0].data[1])} & ${formatNumber(salesChartData.value.datasets[1].data[1])} & ${formatNumber(salesChartData.value.datasets[2].data[1])} \\\\
    \\bottomrule
\\end{tabular}
`;
      } else if (newReport.value.type === 'balance') {
        latexContent += `
\\section{Balance Sheet}
\\subsection{Assets}
\\begin{table}[h]
    \\centering
    \\caption{Assets}
    \\begin{tabular}{l r}
        \\toprule
        \\textbf{Asset} & \\textbf{Value (ZMW)} \\\\
        \\midrule
${balanceSheet.value.assets.map(asset => `        ${asset.name.replace(/&/g, '\\&')} & ${formatNumber(asset.value)} \\\\`).join('\n')}
        \\rowcolor{highlightcolor} \\textbf{Total Assets} & ${formatNumber(balanceSheet.value.totalAssets)} \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}

\\subsection{Liabilities}
\\begin{table}[h]
    \\centering
    \\caption{Liabilities}
    \\begin{tabular}{l r}
        \\toprule
        \\textbf{Liability} & \\textbf{Value (ZMW)} \\\\
        \\midrule
${balanceSheet.value.liabilities.map(liability => `        ${liability.name.replace(/&/g, '\\&')} & ${formatNumber(liability.value)} \\\\`).join('\n')}
        \\rowcolor{highlightcolor} \\textbf{Total Liabilities} & ${formatNumber(balanceSheet.value.totalLiabilities)} \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}
`;
      } else if (newReport.value.type === 'inventory') {
        latexContent += `
\\section{Inventory Report}
\\begin{table}[h]
    \\centering
    \\caption{Inventory Report}
    \\begin{tabular}{l r r}
        \\toprule
        \\textbf{Item} & \\textbf{Quantity} & \\textbf{Value (ZMW)} \\\\
        \\midrule
${inventoryItemsList.value.map(item => `        ${item.name.replace(/&/g, '\\&')} & ${item.quantity} & ${formatNumber(item.value)} \\\\`).join('\n')}
        \\rowcolor{highlightcolor} \\textbf{Total} & ${inventoryItems.value} & ${formatNumber(inventoryValue.value)} \\\\
        \\bottomrule
    \\end{tabular}
\\end{table}
`;
      }

      latexContent += `
\\end{document}
`;

      // Send LaTeX content to backend for PDF generation
      // Prepare payload and log its size to help debug server-side 500s (large payloads, timeouts, etc.)
      const payload = {
        tenant_id: getTenantId(),
        latexContent,
        type: newReport.value.type,
        startDate: newReport.value.startDate,
        endDate: newReport.value.endDate,
        branch_id: selectedBranch.value ? selectedBranch.value._id : null
      };
      const bodyStr = JSON.stringify(payload);
      try {
        console.debug('Generating report — payload size (bytes):', new Blob([bodyStr]).size);
      } catch (e) {
        console.debug('Generating report — payload length (chars):', bodyStr.length);
      }

      const response = await fetch(`${API_BASE_URL}/reports/reports/generate?tenant_id=${getTenantId()}${selectedBranch.value ? `&branch_id=${selectedBranch.value._id}` : ''}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyStr
      });

      if (!response.ok) {
        // Try to capture any textual error returned by the backend for easier debugging
        let errText = '<no response body>';
        try {
          errText = await response.text();
        } catch (e) {
          // ignore
        }
        console.error('Report generation failed', { status: response.status, statusText: response.statusText, body: errText });
        throw new Error(`Failed to generate report: ${response.status} ${response.statusText} ${errText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${newReport.value.reportTitle.replace(/\s+/g, '_')}-${newReport.value.type}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showReportModal.value = false;
      newReport.value = { type: 'financial', startDate: '', endDate: '', companyName: '', companyAddress: '', reportTitle: '' };
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      loading.value = false;
    }
  };

  // Computed properties
  const totalEquity = computed(() => {
    return equity.value.capitalContributions +
      equity.value.grants +
      equity.value.retainedEarnings -
      equity.value.dividendsPaid;
  });

  const totalLiabilities = computed(() => {
    return liabilities.value.loans +
      liabilities.value.taxPayable +
      liabilities.value.other;
  });

  const totalEquityAndLiabilities = computed(() => {
    return equity.value.total + liabilities.value.total;
  });

  const netWorth = computed(() => {
    return balanceSheet.value.totalAssets - balanceSheet.value.totalLiabilities;
  });

  const debtToEquityRatio = computed(() => {
    return equity.value.total === 0 ? 0 : (liabilities.value.total / equity.value.total).toFixed(2);
  });

  // Debug watchers: log KPI changes to help trace unexpected resets in the UI.
  watch(totalSales, (newVal, oldVal) => {
    try { console.debug('[ReportsModule] totalSales changed', oldVal, '=>', newVal); } catch (e) { }
  });
  watch(monthlySales, (newVal, oldVal) => {
    try { console.debug('[ReportsModule] monthlySales changed', oldVal, '=>', newVal); } catch (e) { }
  });
  watch(backendNetProfit, (newVal, oldVal) => {
    try { console.debug('[ReportsModule] backendNetProfit changed', oldVal, '=>', newVal); } catch (e) { }
  });

  // Initialize
  onMounted(async () => {
    // Ensure currency settings are loaded for this tenant before rendering/formatting
    try {
      await initializeCurrency();
    } catch (e) {
      console.warn('ReportsModule: currency initialization failed or skipped', e);
    }

    // fetch delivery filter options first so dropdowns populate
    try {
      await fetchDeliveryFilterOptions();
    } catch (e) {
      // continue even if filter options fail
    }

    // fetch notifications for quick admin view
    try {
      await fetchNotifications();
    } catch (e) {
      // ignore
    }

    // fetch persisted inventory summary counts
    try {
      await fetchInventorySummary();
    } catch (e) {
      // continue even if fetching summary fails
    }

    // fetch top-level KPIs (combined sales and net profit)
    try {
      await fetchTopKPIs();
    } catch (e) {
      // ignore
    }

    await Promise.all([
      fetchFinancialData(),
      fetchInventoryData(),
      fetchDeliveryTickets(),
      fetchMonthlySalesData(),
      fetchTaxData(),
      fetchPayrollData(),
      fetchInvoices()
    ]);
  });

  // Modal pagination helpers
  const goToPreviousDeliveryPage = () => {
    if (deliveryPage.value > 0) {
      deliveryPage.value -= 1;
      fetchDeliveryTickets();
    }
  };

  const goToNextDeliveryPage = () => {
    const max = Math.floor((deliveryTotalCount.value - 1) / deliveryPageSize.value);
    if (deliveryPage.value < max) {
      deliveryPage.value += 1;
      fetchDeliveryTickets();
    }
  };

  const downloadStockReportExcel = async (type) => {
    try {

    } catch (error) {
      console.error('Error downloading stock report:', error);
      alert('Failed to download report');
    }
  };

  const downloadDeliveryTicketsExcel = () => {
    if (!deliveryTickets.value.length) {
      alert('No delivery tickets to export.');
      return;
    }
    const exportData = deliveryTickets.value.map(d => ({
      'Client': d.clientName || d.customerName || '-',
      'Qty': d.quantity,
      'Cost (ticket total)': getTicketTotal(d),
      'Delivery Date': formatDate(d.deliveryDate),
      'Status': d.status || '-',
      'Technician': d.technicianName || d.assignedTo || '-',
      'Delivery Address': d.deliveryAddress || d.address || '-'
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Delivery Tickets');
    XLSX.writeFile(wb, `Delivery_Tickets_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const downloadDeliveryTicketsPDF = () => {
    if (!deliveryTickets.value.length) {
      alert('No delivery tickets to export.');
      return;
    }
    const doc = new jsPDF();
    doc.text('Delivery Tickets Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    const tableData = deliveryTickets.value.map(d => [
      d.clientName || d.customerName || '-',
      String(d.quantity),
      formatWithSymbol(getTicketTotal(d)),
      formatDate(d.deliveryDate),
      d.status || '-',
      d.technicianName || d.assignedTo || '-',
      d.deliveryAddress || d.address || '-'
    ]);

    doc.autoTable({
      startY: 25,
      head: [['Client', 'Qty', 'Cost', 'Date', 'Status', 'Technician', 'Address']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [243, 244, 246], textColor: [31, 41, 55], fontStyle: 'bold' },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 30 },
        6: { cellWidth: 'auto' }
      }
    });

    doc.save(`Delivery_Tickets_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Watchers
  watch([currentTab, salesChartData], () => {
    if (currentTab.value === 'sales' && salesChartData.value.labels.length > 0) {
      initSalesChart();
    }
  });

  watch(currentTab, async (newTab) => {
    if (newTab === 'financial') {
      await fetchFinancialData();
    } else if (newTab === 'sales') {
      await fetchMonthlySalesData();
    } else if (newTab === 'inventory') {
      await Promise.all([fetchInventoryData(), fetchDeliveryTickets()]);
    } else if (newTab === 'delivery') {
      await fetchDeliveryTickets();
    } else if (newTab === 'balance') {
      await fetchFinancialData();
    }
  });

  // Re-render chart when currency settings change so labels/ticks update dynamically
  watch([currencyCode, currentSettings], () => {
    if (currentTab.value === 'sales') {
      // re-init chart to pick up new formatting and titles
      nextTick(() => {
        if (chartInstance) chartInstance.destroy();
        initSalesChart();
      });
    }
  });
  return {
    // State
    loading,
    showReportModal,
    currentTab,
    salesChart,
    salesProfitChart,
    weeklyTransactionsChart,
    updateMovedCharts,
    totalSales,
    totalSalesInitialized,
    reportRange,
    customStartDate,
    customEndDate,
    customStartTime,
    customEndTime,
    monthlySales,
    netProfit,
    inventoryValue,
    inventoryItems,
    inventoryItemsList,
    deliveryTickets,
    deliverySummary,
    showDeliveryModal,
    deliveryFilter,
    showLowStockDetails,
    deliveryTechnicianOptions,
    deliveryStatusOptions,
    deliveryAddressOptions,
    deliveryPage,
    deliveryPageSize,
    deliveryTotalCount,
    backendNetProfit,
    persistedInventorySummary,
    payroll,
    salesTrend,
    profitTrend,
    financials,
    balanceSheet,
    equity,
    liabilities,
    dividends,
    salesMetrics,
    salesChartData,
    taxSummary,
    taxHistory,
    reportTabs,
    newReport,
    notifications,
    invoicesSummary,
    invoices,

    // Computed
    grandTotalAllDeliveryTickets,
    deliveryProfitAdjustment,
    unreadCount,
    totalEquity,
    totalLiabilities,
    totalEquityAndLiabilities,
    netWorth,
    debtToEquityRatio,

    // Methods
    setAuthoritativeTotalSales,
    updateDisplayedNetProfit,
    fetchInventorySummary,
    fetchDeliveryFilterOptions,
    formatNumber,
    formatWithSymbol,
    getTicketTotal,
    formatNegative,
    formatDate,
    formatPeriod,
    fetchFinancialData,
    fetchTaxData,
    fetchInventoryData,
    fetchTopKPIs,
    fetchPayrollData,
    fetchDeliveryTickets,
    clearDeliveryFilters,
    previewPrev,
    previewNext,
    applyDeliveryFilters,
    fetchNotifications,
    markNotificationRead,
    dismissNotification,
    fetchSalesChartData,
    fetchExpensesData,
    fetchMonthlySalesData,
    initSalesChart,
    generateReport,
    goToPreviousDeliveryPage,
    goToNextDeliveryPage,
    fetchInvoices,
    buildReportPreviewHtml,
    hotelSales,
    fetchHotelSales,

    // Currency composable
    initializeCurrency,
    formatCurrency,
    formatCurrencyCompact,
    currencySymbol,
    currencyCode,
    currentSettings,

    // Stock Pagination
    lowStockPage,
    criticalStockPage,
    emptyStockPage,
    stockPageSize,
    paginatedLowStock,
    paginatedCriticalStock,
    paginatedEmptyStock,
    totalLowStockPages,
    totalCriticalStockPages,
    totalEmptyStockPages,
    nextLowStockPage,
    prevLowStockPage,
    nextCriticalStockPage,
    prevCriticalStockPage,
    nextEmptyStockPage,
    prevEmptyStockPage,
    downloadStockReportExcel,
    downloadDeliveryTicketsExcel,
    downloadDeliveryTicketsPDF,

    // Branch state
    branches,
    selectedBranch,
  };
}