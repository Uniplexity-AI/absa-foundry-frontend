/**
 * Finance Module Composable
 * Pulls data from existing endpoints across the application
 * for the Finance Dashboard KPIs
 */
import { ref, computed } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api';

export function useFinance() {
  const { getTenantId, getUserEmail, getSelectedBranch, getToken } = decodeJWT();
  
  // Helper to get auth headers
  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  });
  
  // Loading states
  const loading = ref(false);
  const error = ref(null);

  // ========== FINANCIAL SUMMARY ==========
  const financeSummary = ref({
    // Sales (from POS/KPIs)
    totalSales: 0,
    todaySales: 0,
    monthSales: 0,
    transactionCount: 0,
    
    // Invoices (from Invoicing module)
    totalInvoices: 0,
    invoiceCount: 0,
    pendingInvoices: 0,
    paidInvoices: 0,
    overdueInvoices: 0,
    quotationCount: 0,
    quotationTotal: 0,
    
    // Taxes (calculated from ZRA/sales)
    totalTaxes: 0,
    vatAmount: 0,
    withholdingTax: 0,
    
    // Expenses (from Expenses module)
    totalExpenses: 0,
    expenseCount: 0,
    expensesByCategory: {},
    
    // Investments (from Income Capital module)
    investments: 0,
    internalInvestments: 0,
    externalInvestments: 0,
    
    // Loans (from Loans module)
    loanBalance: 0,
    activeLoans: 0,
    totalLoans: 0,
    totalGrants: 0,
    totalCapital: 0,
    
    // Credit (from Loans module)
    creditScore: 0,
    availableCredit: 0,
    
    // Payroll (from Payroll module)
    payrollTotal: 0,
    employeeCount: 0,
    
    // Calculated values
    netProfit: 0,
    grossProfit: 0,
    cashInflow: 0,
    cashOutflow: 0
  });

  const upcomingPayments = ref([]);
  const recentTransactions = ref([]);

  // ========== FETCH FUNCTIONS ==========
  
  /**
   * Fetch sales data from KPIs endpoint
   */
  const fetchSalesData = async () => {
    const tenantId = getTenantId();
    const branch = getSelectedBranch();
    
    console.log('[Finance] Fetching sales data for tenant:', tenantId);
    
    try {
      // Primary: KPIs endpoint
      const branchQuery = branch?._id ? `&branch_id=${branch._id}` : '';
      const url = `${API_BASE_URL}/kpis/kpis?tenant_id=${tenantId}&include_delivery=true${branchQuery}`;
      console.log('[Finance] Sales URL:', url);
      
      const response = await fetch(url, { headers: getAuthHeaders() });
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Finance] Sales data received:', data);
        financeSummary.value.totalSales = parseFloat(data.total_sales || data.totalSales || 0);
        financeSummary.value.todaySales = parseFloat(data.today_sales || data.todaySales || 0);
        financeSummary.value.monthSales = parseFloat(data.month_sales || data.monthSales || data.total_sales || 0);
        financeSummary.value.transactionCount = parseInt(data.transaction_count || data.transactionCount || 0);
        // cashInflow computed later in calculateDerivedValues after all data is loaded
        return data;
      } else {
        console.warn('[Finance] Sales response not OK:', response.status);
      }
    } catch (err) {
      console.warn('[Finance] Sales fetch failed, trying alternative endpoint:', err.message);
    }

    // Fallback: Summary endpoint
    try {
      const response = await fetch(`${API_BASE_URL}/kpis/summary?tenant_id=${tenantId}`, { headers: getAuthHeaders() });
      if (response.ok) {
        const data = await response.json();
        financeSummary.value.totalSales = parseFloat(data.total_sales || 0);
        financeSummary.value.todaySales = parseFloat(data.today_sales || 0);
        financeSummary.value.transactionCount = parseInt(data.transaction_count || data.transactionCount || 0);
        // cashInflow computed later in calculateDerivedValues after all data is loaded
        return data;
      }
    } catch (err) {
      console.error('[Finance] All sales endpoints failed:', err.message);
    }
    
    return null;
  };

  /**
   * Fetch invoice data from Invoicing module endpoints
   */
  const fetchInvoiceData = async () => {
    const tenantId = getTenantId();
    const branch = getSelectedBranch();
    
    console.log('[Finance] Fetching invoice data for tenant:', tenantId);
    
    try {
      // Match the InvoicingModule.vue endpoint format
      const branchQuery = branch?._id ? `&branch_id=${branch._id}` : '';
      const url = `${API_BASE_URL}/invoices/?tenant_id=${tenantId}${branchQuery}`;
      console.log('[Finance] Invoices URL:', url);
      
      const response = await fetch(url, { headers: getAuthHeaders() });
      console.log('[Finance] Invoices response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Finance] Invoices data received:', data);
        const allItems = Array.isArray(data) ? data : (data.invoices || data.data || []);

        // Separate invoices from quotations by type field
        const actualInvoices = allItems.filter(i =>
          !i.type || i.type === 'invoice' || i.type === 'standard' ||
          (!i.type && !i.quotation_number && (i.invoice_number || i.number))
        );
        const quotations = allItems.filter(i =>
          i.type === 'quotation' || i.type === 'quote' || !!i.quotation_number
        );

        console.log('[Finance] Invoices:', actualInvoices.length, 'Quotations:', quotations.length);
        
        financeSummary.value.invoiceCount = actualInvoices.length;
        financeSummary.value.totalInvoices = actualInvoices.reduce((sum, inv) => {
          return sum + (parseFloat(inv.total) || parseFloat(inv.amount) || parseFloat(inv.grand_total) || 0);
        }, 0);
        
        financeSummary.value.pendingInvoices = actualInvoices.filter(i => 
          i.status === 'pending' || i.status === 'unpaid' || i.status === 'sent'
        ).length;
        
        financeSummary.value.paidInvoices = actualInvoices.filter(i => 
          i.status === 'paid' || i.status === 'completed'
        ).length;
        
        financeSummary.value.overdueInvoices = actualInvoices.filter(i => {
          if (i.status === 'paid' || i.status === 'completed') return false;
          const dueDate = new Date(i.due_date || i.dueDate);
          return dueDate < new Date();
        }).length;

        financeSummary.value.quotationCount = quotations.length;
        financeSummary.value.quotationTotal = quotations.reduce((sum, q) => {
          return sum + (parseFloat(q.total) || parseFloat(q.amount) || parseFloat(q.grand_total) || 0);
        }, 0);

        // Add to recent transactions (invoices only, not quotations)
        actualInvoices.slice(0, 5).forEach(inv => {
          recentTransactions.value.push({
            id: inv._id || inv.id,
            date: inv.date || inv.created_at || inv.invoice_date,
            description: `Invoice #${inv.invoice_number || inv.number || inv.id}`,
            type: 'invoice',
            amount: parseFloat(inv.total) || parseFloat(inv.amount) || 0,
            status: inv.status
          });
        });
        
        console.log('[Finance] Invoice summary - count:', financeSummary.value.invoiceCount, 'total:', financeSummary.value.totalInvoices);
        return invoices;
      } else {
        console.warn('[Finance] Invoices response not OK:', response.status);
      }
    } catch (err) {
      console.error('[Finance] Invoice fetch failed:', err.message);
    }
    
    return [];
  };

  /**
   * Fetch expense data from Expenses module endpoints
   */
  const fetchExpenseData = async () => {
    const tenantId = getTenantId();
    const branch = getSelectedBranch();
    
    console.log('[Finance] Fetching expense data for tenant:', tenantId);
    
    try {
      // Build URL like useExpenses.js does
      const url = new URL(`${API_BASE_URL}/expenses/`);
      url.searchParams.append('tenant_id', tenantId);
      if (branch?._id) {
        url.searchParams.append('branch_id', branch._id);
      }
      // Request max records so all expenses are loaded (backend caps at 1000)
      url.searchParams.append('limit', '1000');
      
      console.log('[Finance] Expenses URL:', url.toString());
      const response = await fetch(url.toString(), { headers: getAuthHeaders() });
      console.log('[Finance] Expenses response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Finance] Expenses data received:', data);
        const expenses = Array.isArray(data) ? data : (data.expenses || data.data || []);
        console.log('[Finance] Parsed expenses count:', expenses.length);
        
        financeSummary.value.expenseCount = expenses.length;
        financeSummary.value.totalExpenses = expenses.reduce((sum, exp) => {
          return sum + (parseFloat(exp.amount) || 0);
        }, 0);
        
        // Group by category
        const byCategory = {};
        expenses.forEach(exp => {
          const cat = exp.category || 'Other';
          byCategory[cat] = (byCategory[cat] || 0) + (parseFloat(exp.amount) || 0);
        });
        financeSummary.value.expensesByCategory = byCategory;
        
        financeSummary.value.cashOutflow += financeSummary.value.totalExpenses;

        // Add to recent transactions
        expenses.slice(0, 5).forEach(exp => {
          recentTransactions.value.push({
            id: exp._id || exp.id,
            date: exp.expense_date || exp.date || exp.created_at,
            description: exp.name || exp.description || exp.category,
            type: 'expense',
            amount: -(parseFloat(exp.amount) || 0),
            status: 'completed'
          });
        });
        
        console.log('[Finance] Expense summary - count:', financeSummary.value.expenseCount, 'total:', financeSummary.value.totalExpenses);
        return expenses;
      } else {
        console.warn('[Finance] Expenses response not OK:', response.status);
      }
    } catch (err) {
      console.error('[Finance] Expense fetch failed:', err.message);
    }
    
    return [];
  };

  /**
   * Fetch loan and funding data from Loans module endpoints
   */
  const fetchLoanData = async () => {
    const tenantId = getTenantId();
    
    try {
      // Fetch loans, grants, capital, and credit in parallel
      const [loansRes, grantsRes, capitalRes, creditRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/loans/loans?tenant_id=${tenantId}`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/loans/loans/grants?tenant_id=${tenantId}`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/loans/loans/capital?tenant_id=${tenantId}`, { headers: getAuthHeaders() }),
        fetch(`${API_BASE_URL}/loans/loans/credit?tenant_id=${tenantId}`, { headers: getAuthHeaders() })
      ]);

      // Process loans
      if (loansRes.status === 'fulfilled' && loansRes.value.ok) {
        const data = await loansRes.value.json();
        const loans = Array.isArray(data) ? data : (data.loans || []);
        const activeLoans = loans.filter(l => l.status === 'active' || l.status === 'pending' || !l.status);
        
        financeSummary.value.activeLoans = activeLoans.length;
        financeSummary.value.totalLoans = loans.length;
        financeSummary.value.loanBalance = activeLoans.reduce((sum, l) => {
          return sum + (parseFloat(l.remaining_balance) || parseFloat(l.balance) || parseFloat(l.amount) || 0);
        }, 0);

        // Add upcoming loan payments
        activeLoans.forEach(l => {
          if (l.next_payment_date || l.nextPaymentDate) {
            upcomingPayments.value.push({
              id: l._id || l.id,
              description: l.lender || l.source || 'Loan Payment',
              type: 'loan',
              dueDate: l.next_payment_date || l.nextPaymentDate,
              amount: parseFloat(l.monthly_payment) || parseFloat(l.installment) || 0
            });
          }
        });
      }

      // Process grants
      if (grantsRes.status === 'fulfilled' && grantsRes.value.ok) {
        const data = await grantsRes.value.json();
        const grants = Array.isArray(data) ? data : (data.grants || []);
        financeSummary.value.totalGrants = grants.reduce((sum, g) => {
          return sum + (parseFloat(g.amount) || 0);
        }, 0);
      }

      // Process capital
      if (capitalRes.status === 'fulfilled' && capitalRes.value.ok) {
        const data = await capitalRes.value.json();
        const capital = Array.isArray(data) ? data : (data.capital || []);
        financeSummary.value.totalCapital = capital.reduce((sum, c) => {
          return sum + (parseFloat(c.amount) || 0);
        }, 0);
      }

      // Process credit score
      if (creditRes.status === 'fulfilled' && creditRes.value.ok) {
        const data = await creditRes.value.json();
        financeSummary.value.creditScore = parseInt(data.credit_score || data.creditScore || data.score || 0);
        financeSummary.value.availableCredit = parseFloat(data.available_credit || data.availableCredit || data.limit || 0);
      }
    } catch (err) {
      console.error('[Finance] Loan data fetch failed:', err.message);
    }
  };

  /**
   * Fetch investment data from Income Capital module
   */
  const fetchInvestmentData = async () => {
    const tenantId = getTenantId();
    
    try {
      const response = await fetch(`${API_BASE_URL}/income-capital/all-data?tenant_id=${tenantId}`, { headers: getAuthHeaders() });
      
      if (response.ok) {
        const data = await response.json();
        
        // Process investments
        const investments = data.investments || [];
        const internalInv = investments.filter(inv => inv.type === 'Internal');
        const externalInv = investments.filter(inv => inv.type === 'External');
        
        financeSummary.value.internalInvestments = internalInv.reduce((sum, inv) => {
          return sum + (parseFloat(inv.amount) || parseFloat(inv.value) || 0);
        }, 0);
        
        financeSummary.value.externalInvestments = externalInv.reduce((sum, inv) => {
          return sum + (parseFloat(inv.amount) || parseFloat(inv.value) || 0);
        }, 0);
        
        financeSummary.value.investments = financeSummary.value.internalInvestments + financeSummary.value.externalInvestments;

        // Process metrics if available
        if (data.metrics) {
          financeSummary.value.totalSales = financeSummary.value.totalSales || parseFloat(data.metrics.totalSales || 0);
        }
        
        return data;
      }
    } catch (err) {
      console.error('[Finance] Investment data fetch failed:', err.message);
    }
    
    return null;
  };

  /**
   * Fetch payroll data from Payroll module
   */
  const fetchPayrollData = async () => {
    const tenantId = getTenantId();
    
    console.log('[Finance] Fetching payroll data for tenant:', tenantId);
    
    try {
      // Build URL like PayrollModule.vue does - NOTE: PayrollModule doesn't use auth headers
      const url = new URL(`${API_BASE_URL}/payroll/employees`);
      url.searchParams.append('tenant_id', tenantId);
      
      console.log('[Finance] Payroll URL:', url.toString());
      
      // Try without auth first (like PayrollModule does)
      let response = await fetch(url.toString());
      console.log('[Finance] Payroll response status (no auth):', response.status);
      
      // If unauthorized, try with auth headers
      if (response.status === 401) {
        console.log('[Finance] Retrying payroll with auth headers');
        response = await fetch(url.toString(), { headers: getAuthHeaders() });
        console.log('[Finance] Payroll response status (with auth):', response.status);
      }
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Finance] Payroll raw data:', data);
        const employees = Array.isArray(data) ? data : (data.employees || data.data || []);
        console.log('[Finance] Parsed employees count:', employees.length);
        
        financeSummary.value.employeeCount = employees.length;
        financeSummary.value.payrollTotal = employees.reduce((sum, emp) => {
          // Calculate gross pay like PayrollModule does: basicPay + earnings
          const basePay = parseFloat(emp.basicPay) || 0;
          const earnings = (emp.earnings && typeof emp.earnings === 'object') ? emp.earnings : {};
          const earningsTotal = Object.values(earnings).reduce((s, val) => s + (parseFloat(val) || 0), 0);
          const grossPay = basePay + earningsTotal;
          console.log('[Finance] Employee:', emp.name, '| basicPay:', basePay, '| earnings:', earningsTotal, '| gross:', grossPay);
          return sum + grossPay;
        }, 0);
        
        console.log('[Finance] Payroll summary - employees:', financeSummary.value.employeeCount, 'total:', financeSummary.value.payrollTotal);
        
        financeSummary.value.cashOutflow += financeSummary.value.payrollTotal;

        // Add payroll to upcoming payments (end of month)
        const now = new Date();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        if (financeSummary.value.payrollTotal > 0) {
          upcomingPayments.value.push({
            id: 'payroll-monthly',
            description: 'Monthly Payroll',
            type: 'payroll',
            dueDate: endOfMonth.toISOString(),
            amount: financeSummary.value.payrollTotal
          });
        }
        
        return employees;
      } else {
        console.warn('[Finance] Payroll response not OK:', response.status);
      }
    } catch (err) {
      console.error('[Finance] Payroll fetch failed:', err.message);
    }
    
    return [];
  };

  /**
   * Calculate tax estimates based on sales
   */
  const calculateTaxes = () => {
    // VAT rate (16% in Zambia)
    const vatRate = 0.16;
    // Withholding tax rate (varies, using 15% as default)
    const withholdingRate = 0.15;
    
    // VAT on sales
    financeSummary.value.vatAmount = financeSummary.value.totalSales * vatRate;
    
    // Withholding tax on certain payments
    financeSummary.value.withholdingTax = financeSummary.value.payrollTotal * withholdingRate * 0.1; // Simplified estimate
    
    financeSummary.value.totalTaxes = financeSummary.value.vatAmount + financeSummary.value.withholdingTax;

    // Add tax payment to upcoming if significant
    if (financeSummary.value.totalTaxes > 0) {
      const now = new Date();
      const taxDueDate = new Date(now.getFullYear(), now.getMonth() + 1, 14); // 14th of next month
      
      upcomingPayments.value.push({
        id: 'tax-monthly',
        description: 'Tax Payment (VAT + WHT)',
        type: 'tax',
        dueDate: taxDueDate.toISOString(),
        amount: financeSummary.value.totalTaxes
      });
    }
  };

  /**
   * Calculate net profit and other derived values
   */
  const calculateDerivedValues = () => {
    const fs = financeSummary.value;
    
    // Operating Revenue = Sales + Invoices
    const operatingRevenue = fs.totalSales + fs.totalInvoices;
    // Grants are non-repayable — treat as other income
    const grantsIncome = fs.totalGrants || 0;
    const totalRevenue = operatingRevenue + grantsIncome;

    // Cost of Goods (estimated at 60% of sales portion only)
    const estimatedCOGS = fs.totalSales * 0.6;
    fs.grossProfit = totalRevenue - estimatedCOGS;
    
    // Net profit = Total Revenue - COGS - Expenses - Taxes - Payroll
    // (Capital & Loans are NOT profit — they're equity/liabilities)
    fs.netProfit = 
      totalRevenue -
      estimatedCOGS -
      fs.totalExpenses - 
      fs.totalTaxes -
      fs.payrollTotal;

    // Cash inflow = Sales + Invoices + Grants + Capital + Loans (all money coming in)
    fs.cashInflow = 
      operatingRevenue + 
      grantsIncome + 
      (fs.totalCapital || 0) + 
      (fs.totalLoans || 0);

    // Cash outflow = Expenses + Taxes + Payroll (money going out)
    fs.cashOutflow = 
      fs.totalExpenses + 
      fs.totalTaxes + 
      fs.payrollTotal;

    // Calculate comprehensive credit score based on all financial metrics
    calculateCreditScore();
  };

  /**
   * Fetch all financial data
   */
  const fetchAllFinanceData = async () => {
    loading.value = true;
    error.value = null;
    
    // Clear previous data
    recentTransactions.value = [];
    upcomingPayments.value = [];
    financeSummary.value.cashOutflow = 0;
    
    try {
      // Fetch all data in parallel for better performance
      await Promise.allSettled([
        fetchSalesData(),
        fetchInvoiceData(),
        fetchExpenseData(),
        fetchLoanData(),
        fetchInvestmentData(),
        fetchPayrollData()
      ]);

      // Calculate derived values
      calculateTaxes();
      calculateDerivedValues();

      // Sort recent transactions by date
      recentTransactions.value.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Sort upcoming payments by date
      upcomingPayments.value.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    } catch (err) {
      console.error('[Finance] Error fetching all data:', err);
      error.value = err.message || 'Failed to fetch financial data';
    } finally {
      loading.value = false;
    }
  };

  // ========== COMPUTED VALUES ==========
  
  const netCashFlow = computed(() => {
    return financeSummary.value.cashInflow - financeSummary.value.cashOutflow;
  });

  const profitMargin = computed(() => {
    const totalRevenue = financeSummary.value.totalSales + financeSummary.value.totalInvoices + (financeSummary.value.totalGrants || 0);
    if (totalRevenue === 0) return 0;
    return ((financeSummary.value.netProfit / totalRevenue) * 100).toFixed(1);
  });

  const expenseRatio = computed(() => {
    const totalRevenue = financeSummary.value.totalSales + financeSummary.value.totalInvoices + (financeSummary.value.totalGrants || 0);
    if (totalRevenue === 0) return 0;
    return ((financeSummary.value.totalExpenses / totalRevenue) * 100).toFixed(1);
  });

  const totalFunding = computed(() => {
    return financeSummary.value.totalGrants + financeSummary.value.totalCapital;
  });

  // ========== SIMPLE KPI CREDIT SCORE ==========
  /**
   * Simple weighted KPI model
   * Final score range: 300-850
   *
   * Components:
   * - Sales Performance (30%)
   * - Profitability (25%)
   * - Debt Health (20%)
   * - Payment Reliability (15%)
   * - Cash Flow Health (10%)
   */
  const creditScoreBreakdown = ref({
    salesPerformance: { score: 0, weight: 0.30, maxPoints: 165 },
    profitability: { score: 0, weight: 0.25, maxPoints: 137.5 },
    debtHealth: { score: 0, weight: 0.20, maxPoints: 110 },
    paymentReliability: { score: 0, weight: 0.15, maxPoints: 82.5 },
    cashFlowHealth: { score: 0, weight: 0.10, maxPoints: 55 }
  });

  const calculateCreditScore = () => {
    const fs = financeSummary.value;
    const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
    const toWeightedPoints = (componentScore, maxPoints) => (clamp(componentScore) / 100) * maxPoints;

    // 1) Sales performance: blends absolute sales scale and activity volume.
    const salesScaleScore = clamp((Math.log10((fs.totalSales || 0) + 1) / 6) * 100);
    const activityBonus = fs.transactionCount >= 100 ? 15 : fs.transactionCount >= 50 ? 10 : fs.transactionCount >= 20 ? 5 : 0;
    const salesPerformance = clamp(salesScaleScore + activityBonus);

    // 2) Profitability: based on net margin.
    const netMargin = fs.totalSales > 0 ? (fs.netProfit / fs.totalSales) * 100 : -100;
    const profitability = netMargin >= 20 ? 100
      : netMargin >= 10 ? 85
      : netMargin >= 5 ? 70
      : netMargin >= 0 ? 55
      : netMargin >= -10 ? 35
      : 15;

    // 3) Debt health: loan balance relative to total sales.
    const debtRatio = fs.totalSales > 0 ? (fs.loanBalance || 0) / fs.totalSales : (fs.loanBalance > 0 ? 1.5 : 0);
    const debtHealth = debtRatio <= 0.10 ? 100
      : debtRatio <= 0.25 ? 85
      : debtRatio <= 0.50 ? 65
      : debtRatio <= 1.00 ? 45
      : 20;

    // 4) Payment reliability: invoice payment quality.
    let paymentReliability = 50;
    if (fs.invoiceCount > 0) {
      const paidRatio = (fs.paidInvoices || 0) / fs.invoiceCount;
      const overdueRatio = (fs.overdueInvoices || 0) / fs.invoiceCount;
      paymentReliability = clamp((paidRatio * 100) - (overdueRatio * 40));
      if ((fs.overdueInvoices || 0) === 0 && (fs.paidInvoices || 0) > 0) {
        paymentReliability = clamp(paymentReliability + 10);
      }
    }

    // 5) Cash flow health: net flow as a fraction of inflow.
    const netFlow = (fs.cashInflow || 0) - (fs.cashOutflow || 0);
    const flowRatio = (fs.cashInflow || 0) > 0 ? netFlow / fs.cashInflow : -1;
    const cashFlowHealth = flowRatio >= 0.30 ? 100
      : flowRatio >= 0.15 ? 85
      : flowRatio >= 0.05 ? 70
      : flowRatio >= 0 ? 55
      : flowRatio >= -0.15 ? 35
      : 15;

    // Convert component scores to weighted points (total additional points out of 550).
    const salesPoints = toWeightedPoints(salesPerformance, creditScoreBreakdown.value.salesPerformance.maxPoints);
    const profitPoints = toWeightedPoints(profitability, creditScoreBreakdown.value.profitability.maxPoints);
    const debtPoints = toWeightedPoints(debtHealth, creditScoreBreakdown.value.debtHealth.maxPoints);
    const paymentPoints = toWeightedPoints(paymentReliability, creditScoreBreakdown.value.paymentReliability.maxPoints);
    const flowPoints = toWeightedPoints(cashFlowHealth, creditScoreBreakdown.value.cashFlowHealth.maxPoints);

    const additionalPoints = salesPoints + profitPoints + debtPoints + paymentPoints + flowPoints;
    const finalScore = Math.round(clamp(300 + additionalPoints, 300, 850));

    creditScoreBreakdown.value.salesPerformance.score = Math.round(salesPoints);
    creditScoreBreakdown.value.profitability.score = Math.round(profitPoints);
    creditScoreBreakdown.value.debtHealth.score = Math.round(debtPoints);
    creditScoreBreakdown.value.paymentReliability.score = Math.round(paymentPoints);
    creditScoreBreakdown.value.cashFlowHealth.score = Math.round(flowPoints);

    financeSummary.value.creditScore = finalScore;

    console.log('[Finance] Simple credit score calculated:', {
      finalScore,
      components: {
        salesPerformance,
        profitability,
        debtHealth,
        paymentReliability,
        cashFlowHealth
      }
    });

    return finalScore;
  };

  /**
   * Get credit score recommendation based on score range
   */
  const getCreditScoreRecommendation = computed(() => {
    const score = financeSummary.value.creditScore;
    
    if (score >= 750) {
      return {
        level: 'Excellent',
        color: 'green',
        message: 'Your business has excellent financial health. You qualify for premium loan rates and high credit limits.',
        tips: [
          'Maintain your current payment habits',
          'Consider expanding credit lines for growth',
          'You may qualify for low-interest business loans'
        ]
      };
    } else if (score >= 650) {
      return {
        level: 'Good',
        color: 'blue',
        message: 'Your business has good financial health. Most lenders will approve your applications.',
        tips: [
          'Pay invoices before due dates to boost score',
          'Reduce outstanding debt by 10-15%',
          'Diversify income streams for better stability'
        ]
      };
    } else if (score >= 550) {
      return {
        level: 'Fair',
        color: 'yellow',
        message: 'Your business has fair financial health. You may face higher interest rates.',
        tips: [
          'Focus on clearing overdue invoices immediately',
          'Reduce debt-to-income ratio below 40%',
          'Build cash reserves for emergencies',
          'Consider restructuring existing loans'
        ]
      };
    } else if (score >= 450) {
      return {
        level: 'Poor',
        color: 'orange',
        message: 'Your business financial health needs improvement. Loan approvals may be difficult.',
        tips: [
          'Prioritize paying off high-interest debt',
          'Create a strict budget to control expenses',
          'Seek financial counseling or advisory',
          'Consider consolidating debts',
          'Focus on increasing revenue streams'
        ]
      };
    } else {
      return {
        level: 'Very Poor',
        color: 'red',
        message: 'Your business is in financial distress. Immediate action is required.',
        tips: [
          'Consult with a financial advisor immediately',
          'Negotiate payment plans with creditors',
          'Cut non-essential expenses drastically',
          'Explore emergency funding options',
          'Consider business restructuring'
        ]
      };
    }
  });

  /**
   * Get detailed breakdown for display
   */
  const creditScoreDetails = computed(() => {
    const breakdown = creditScoreBreakdown.value;
    return [
      {
        name: 'Sales Performance',
        weight: '30%',
        score: breakdown.salesPerformance.score,
        maxScore: Math.round(breakdown.salesPerformance.maxPoints),
        percentage: breakdown.salesPerformance.maxPoints > 0 
          ? Math.round((breakdown.salesPerformance.score / breakdown.salesPerformance.maxPoints) * 100) 
          : 0,
        description: 'Sales volume and transaction activity',
        icon: 'fas fa-chart-line'
      },
      {
        name: 'Profitability',
        weight: '25%',
        score: breakdown.profitability.score,
        maxScore: Math.round(breakdown.profitability.maxPoints),
        percentage: breakdown.profitability.maxPoints > 0 
          ? Math.round((breakdown.profitability.score / breakdown.profitability.maxPoints) * 100) 
          : 0,
        description: 'Net profit margin against revenue',
        icon: 'fas fa-coins'
      },
      {
        name: 'Debt Health',
        weight: '20%',
        score: breakdown.debtHealth.score,
        maxScore: Math.round(breakdown.debtHealth.maxPoints),
        percentage: breakdown.debtHealth.maxPoints > 0 
          ? Math.round((breakdown.debtHealth.score / breakdown.debtHealth.maxPoints) * 100) 
          : 0,
        description: 'Loan balance relative to sales',
        icon: 'fas fa-balance-scale'
      },
      {
        name: 'Payment Reliability',
        weight: '15%',
        score: breakdown.paymentReliability.score,
        maxScore: Math.round(breakdown.paymentReliability.maxPoints),
        percentage: breakdown.paymentReliability.maxPoints > 0 
          ? Math.round((breakdown.paymentReliability.score / breakdown.paymentReliability.maxPoints) * 100) 
          : 0,
        description: 'Paid vs overdue invoice behavior',
        icon: 'fas fa-history'
      },
      {
        name: 'Cash Flow Health',
        weight: '10%',
        score: breakdown.cashFlowHealth.score,
        maxScore: Math.round(breakdown.cashFlowHealth.maxPoints),
        percentage: breakdown.cashFlowHealth.maxPoints > 0 
          ? Math.round((breakdown.cashFlowHealth.score / breakdown.cashFlowHealth.maxPoints) * 100) 
          : 0,
        description: 'Net cash flow compared to inflow',
        icon: 'fas fa-wallet'
      }
    ];
  });

  // ========== HELPER FUNCTIONS ==========
  
  const getCreditScoreClass = (score) => {
    if (score >= 750) return 'bg-green-100 text-green-700';
    if (score >= 650) return 'bg-yellow-100 text-yellow-700';
    if (score >= 500) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  const getCreditScoreLabel = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 500) return 'Fair';
    if (score > 0) return 'Poor';
    return 'N/A';
  };

  const getFlowPercentage = (value) => {
    const max = Math.max(financeSummary.value.cashInflow, financeSummary.value.cashOutflow);
    return max > 0 ? (value / max) * 100 : 0;
  };

  const getPaymentTypeClass = (type) => {
    const classes = {
      loan: 'bg-cyan-500',
      tax: 'bg-amber-500',
      payroll: 'bg-indigo-500',
      supplier: 'bg-purple-500',
      default: 'bg-gray-500'
    };
    return classes[type] || classes.default;
  };

  const getPaymentTypeIcon = (type) => {
    const icons = {
      loan: 'fas fa-hand-holding-usd',
      tax: 'fas fa-file-invoice-dollar',
      payroll: 'fas fa-users',
      supplier: 'fas fa-truck',
      default: 'fas fa-money-bill'
    };
    return icons[type] || icons.default;
  };

  const getTransactionTypeClass = (type) => {
    const classes = {
      sale: 'bg-green-100 text-green-700',
      expense: 'bg-red-100 text-red-700',
      invoice: 'bg-blue-100 text-blue-700',
      loan: 'bg-cyan-100 text-cyan-700',
      payroll: 'bg-indigo-100 text-indigo-700',
      tax: 'bg-amber-100 text-amber-700'
    };
    return classes[type] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-ZM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // ========== RETURN ==========
  return {
    // State
    loading,
    error,
    financeSummary,
    upcomingPayments,
    recentTransactions,
    creditScoreBreakdown,
    
    // Computed
    netCashFlow,
    profitMargin,
    expenseRatio,
    totalFunding,
    getCreditScoreRecommendation,
    creditScoreDetails,
    
    // Methods
    fetchAllFinanceData,
    fetchSalesData,
    fetchInvoiceData,
    fetchExpenseData,
    fetchLoanData,
    fetchInvestmentData,
    fetchPayrollData,
    calculateTaxes,
    calculateDerivedValues,
    calculateCreditScore,
    
    // Helpers
    getCreditScoreClass,
    getCreditScoreLabel,
    getFlowPercentage,
    getPaymentTypeClass,
    getPaymentTypeIcon,
    getTransactionTypeClass,
    formatDate
  };
}
