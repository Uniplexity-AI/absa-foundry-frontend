import { ref, computed, watch, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';
import { useAudit } from '@/config/useAudit.js';

export function useExpenses() {
  const { getTenantId, getBranches, getSelectedBranch, setSelectedBranch, getBranchId, getUserRole, getToken } = decodeJWT();
  const { logAudit } = useAudit();

  // Branch state
  const branches = ref([]);
  const selectedBranch = ref(null);

  // State
  const expenses = ref([]);
  const isSubmitting = ref(false);
  const loading = ref(false);
  const error = ref(null);

  // Form data
  const newExpense = ref({
    name: '',
    amount: 0,
    category: '',
    expense_date: new Date().toISOString().split('T')[0],
    description: ''
  });

  // Edit state
  const editingExpenseId = ref(null);
  const editingExpense = ref({
    name: '',
    amount: 0,
    category: '',
    expense_date: '',
    description: ''
  });

  // Filters
  const filters = ref({
    time_frame: '',
    category: '',
    start_date: '',
    end_date: ''
  });

  // Pagination
  const page = ref(1);
  const pageSize = ref(10);

  // Chart of Accounts – Expense Categories (grouped)
  const categoryGroups = ref([
    {
      label: 'Cost of Goods Sold',
      code: '5000',
      children: [
        { label: 'Purchases', code: '5010', note: 'Track input VAT separately' },
        { label: 'Cost of Sales / Direct Costs', code: '5100' },
      ]
    },
    {
      label: 'Operating Expenses',
      code: '6000',
      children: [
        { label: 'Salaries & Wages', code: '6000', note: 'With PAYE linkage' },
        { label: 'Rent & Utilities', code: '6100' },
        { label: 'Administrative Expenses', code: '6200' },
        { label: 'Marketing & Selling Expenses', code: '6300' },
        { label: 'Depreciation Expense', code: '6400' },
        { label: 'Bad Debts / Write-offs', code: '6500' },
      ]
    },
    {
      label: 'Other Expenses',
      code: '6800',
      children: [
        { label: 'Interest Expense', code: '6800' },
        { label: 'Taxes Income', code: '6900' },
      ]
    }
  ]);

  // Flat list of all sub-categories (the values stored on each expense)
  const categories = computed(() =>
    categoryGroups.value.flatMap(g => g.children.map(c => c.label))
  );

  // Helper: find which main group a sub-category belongs to
  const getCategoryGroup = (subCategory) => {
    for (const g of categoryGroups.value) {
      if (g.children.some(c => c.label === subCategory)) return g.label;
    }
    return 'Other Expenses';
  };

  // Computed properties
  const sortedExpenses = computed(() => {
    if (!Array.isArray(expenses.value)) return [];
    return [...expenses.value].sort((a, b) => {
      return new Date(b.expense_date || b.created_at) - new Date(a.expense_date || a.created_at);
    });
  });

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(sortedExpenses.value.length / pageSize.value));
  });

  const startIndex = computed(() => {
    return (page.value - 1) * pageSize.value;
  });

  const endIndex = computed(() => {
    return Math.min(startIndex.value + pageSize.value, sortedExpenses.value.length);
  });

  const pagedExpenses = computed(() => {
    return sortedExpenses.value.slice(startIndex.value, endIndex.value);
  });

  // Helper function to extract error messages
  const extractErrorMessage = (errorData) => {
    if (typeof errorData === 'string') return errorData;

    if (errorData.detail) {
      if (typeof errorData.detail === 'string') return errorData.detail;
      if (errorData.detail.message) return errorData.detail.message;
      if (Array.isArray(errorData.detail)) {
        return errorData.detail.map(err => {
          if (typeof err === 'string') return err;
          if (err.msg) return `${err.loc?.join?.('.') || 'Field'}: ${err.msg}`;
          return JSON.stringify(err);
        }).join(', ');
      }
    }

    if (errorData.message) return errorData.message;
    if (errorData.error) return errorData.error;

    // If it's a validation error object, try to extract field errors
    if (typeof errorData === 'object') {
      const fieldErrors = [];
      Object.keys(errorData).forEach(key => {
        const value = errorData[key];
        if (Array.isArray(value)) {
          fieldErrors.push(`${key}: ${value.join(', ')}`);
        } else if (typeof value === 'string') {
          fieldErrors.push(`${key}: ${value}`);
        }
      });
      if (fieldErrors.length > 0) return fieldErrors.join('; ');
    }

    return JSON.stringify(errorData);
  };

  // Methods
  const calculateTotalExpenses = () => {
    if (!Array.isArray(expenses.value)) return 0;
    return expenses.value.reduce((total, expense) => total + (Number(expense.amount) || 0), 0);
  };

  const calculateMonthlyExpenses = () => {
    if (!Array.isArray(expenses.value)) return 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses.value
      .filter(expense => {
        const expenseDate = new Date(expense.expense_date || expense.created_at);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      })
      .reduce((total, expense) => total + (Number(expense.amount) || 0), 0);
  };

  const calculateWeeklyExpenses = () => {
    if (!Array.isArray(expenses.value)) return 0;
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

    return expenses.value
      .filter(expense => {
        const expenseDate = new Date(expense.expense_date || expense.created_at);
        return expenseDate >= oneWeekAgo && expenseDate <= now;
      })
      .reduce((total, expense) => total + (Number(expense.amount) || 0), 0);
  };

  const resetNewExpenseForm = () => {
    newExpense.value = {
      name: '',
      amount: 0,
      category: '',
      expense_date: new Date().toISOString().split('T')[0],
      description: ''
    };
  };

  const validateExpense = (expense) => {
    const errors = [];

    if (!expense.name?.trim()) {
      errors.push('Name is required');
    }

    if (!expense.amount || expense.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    if (!expense.category?.trim()) {
      errors.push('Category is required');
    }

    if (!expense.expense_date?.trim()) {
      errors.push('Date is required');
    }

    return errors;
  };

  const fetchExpenses = async () => {
    loading.value = true;
    error.value = null;

    try {
      const url = new URL(`${API_BASE_URL}/expenses/`);
      url.searchParams.append('tenant_id', getTenantId());
      let branchId = '';
      if (selectedBranch.value) {
        branchId = selectedBranch.value.id || selectedBranch.value._id || '';
      } else {
        // Fallback for restricted users if something goes wrong with state
        const userRole = getUserRole();
        if (!['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase())) {
          branchId = getBranchId();
        }
      }

      if (branchId) {
        url.searchParams.append('branch_id', branchId);
      }

      // Add filters to query params
      if (filters.value.time_frame) {
        url.searchParams.append('time_frame', filters.value.time_frame);
      }
      if (filters.value.category) {
        url.searchParams.append('category', filters.value.category);
      }
      if (filters.value.start_date) {
        url.searchParams.append('start_date', filters.value.start_date);
      }
      if (filters.value.end_date) {
        url.searchParams.append('end_date', filters.value.end_date);
      }

      // Request max records so all expenses are loaded (backend caps at 1000)
      url.searchParams.append('limit', '1000');

      console.log('Fetching expenses from:', url.toString());

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Handle different response formats
      if (Array.isArray(data)) {
        expenses.value = data;
      } else if (data.expenses && Array.isArray(data.expenses)) {
        expenses.value = data.expenses;
      } else if (data.data && Array.isArray(data.data)) {
        expenses.value = data.data;
      } else {
        console.warn('Unexpected expenses data format:', data);
        expenses.value = [];
      }

      console.log('Fetched expenses:', expenses.value.length);

      // Reset to first page when filters change
      page.value = 1;

    } catch (err) {
      console.error('Error fetching expenses:', err);
      error.value = err.message;
      expenses.value = [];
    } finally {
      loading.value = false;
    }
  };

  const exportExpenses = async () => {
    try {
      const { getTenantId } = decodeJWT();
      const tenantId = getTenantId();

      let url = `${API_BASE_URL}/expenses/export?tenant_id=${tenantId}`;
      let branchId = '';
      if (selectedBranch.value) {
        branchId = selectedBranch.value.id || selectedBranch.value._id || '';
      }
      if (branchId) {
        url += `&branch_id=${branchId}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (!response.ok) throw new Error('Export failed');

      const data = await response.json();
      return data.expenses;
    } catch (err) {
      console.error('Export error:', err);
      throw err;
    }
  };

  const uploadBulkFile = async (file) => {
    try {
      const { getTenantId } = decodeJWT();
      const tenantId = getTenantId();

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/expenses/bulk-upload-file?tenant_id=${tenantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Upload failed');
      }

      return await response.json();
    } catch (err) {
      console.error('Bulk upload error:', err);
      throw err;
    }
  };

  const processBulkImport = async (data) => {
    try {
      const { getTenantId } = decodeJWT();
      const tenantId = getTenantId();

      const response = await fetch(`${API_BASE_URL}/expenses/bulk-upload-process?tenant_id=${tenantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Process failed');
      }

      const result = await response.json();
      // Refresh expenses after successful import
      await fetchExpenses();
      return result;
    } catch (err) {
      console.error('Bulk process error:', err);
      throw err;
    }
  };

  const createExpense = async () => {
    const validationErrors = validateExpense(newExpense.value);
    if (validationErrors.length > 0) {
      error.value = validationErrors.join(', ');
      return;
    }

    isSubmitting.value = true;
    error.value = null;

    try {
      const expenseData = {
        name: newExpense.value.name.trim(),
        amount: Number(newExpense.value.amount),
        category: newExpense.value.category.trim(),
        expense_date: newExpense.value.expense_date,
        description: newExpense.value.description?.trim() || '',
        branch_id: (() => {
          let bId = null;
          if (selectedBranch.value) {
            bId = selectedBranch.value.id || selectedBranch.value._id;
          }
          if (!bId) {
            const userRole = getUserRole();
            if (!['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase())) {
              bId = getBranchId();
            }
          }
          return bId;
        })()
      };

      console.log('Creating expense:', expenseData);

      // Add tenant_id as query parameter, not in body
      const url = new URL(`${API_BASE_URL}/expenses/`);
      url.searchParams.append('tenant_id', getTenantId());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error Response:', errorData);

        if (response.status === 422) {
          const errorMessage = extractErrorMessage(errorData);
          throw new Error(`Validation Error: ${errorMessage}`);
        }

        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}: ${response.statusText}`);
      }

      const createdExpense = await response.json();
      console.log('Created expense:', createdExpense);

      await logAudit('create', 'expenses', { resource_type: 'expense', label: expenseData.name, amount: expenseData.amount, category: expenseData.category });

      // Add to local list and reset form
      expenses.value.unshift(createdExpense);
      resetNewExpenseForm();

      // Refresh the list to ensure consistency
      await fetchExpenses();

    } catch (err) {
      console.error('Error creating expense:', err);
      error.value = err.message || 'Failed to create expense';
    } finally {
      isSubmitting.value = false;
    }
  };

  const startEdit = (expense) => {
    editingExpenseId.value = expense.id;
    editingExpense.value = {
      name: expense.name || '',
      amount: expense.amount || 0,
      category: expense.category || '',
      expense_date: expense.expense_date || '',
      description: expense.description || ''
    };
  };

  const cancelEdit = () => {
    editingExpenseId.value = null;
    editingExpense.value = {
      name: '',
      amount: 0,
      category: '',
      expense_date: '',
      description: ''
    };
  };

  const updateExpense = async (expenseId) => {
    const validationErrors = validateExpense(editingExpense.value);
    if (validationErrors.length > 0) {
      error.value = validationErrors.join(', ');
      return;
    }

    isSubmitting.value = true;
    error.value = null;

    try {
      const updateData = {
        name: editingExpense.value.name.trim(),
        amount: Number(editingExpense.value.amount),
        category: editingExpense.value.category.trim(),
        expense_date: editingExpense.value.expense_date,
        description: editingExpense.value.description?.trim() || '',
        branch_id: (() => {
          let bId = null;
          if (selectedBranch.value) {
            bId = selectedBranch.value.id || selectedBranch.value._id;
          }
          if (!bId) {
            const userRole = getUserRole();
            if (!['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase())) {
              bId = getBranchId();
            }
          }
          return bId;
        })()
      };

      console.log('Updating expense:', expenseId, updateData);

      // Add tenant_id as query parameter, not in body
      const url = new URL(`${API_BASE_URL}/expenses/${expenseId}`);
      url.searchParams.append('tenant_id', getTenantId());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error Response:', errorData);
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}: ${response.statusText}`);
      }

      const updatedExpense = await response.json();
      console.log('Updated expense:', updatedExpense);

      await logAudit('update', 'expenses', { resource_type: 'expense', resource_id: expenseId, label: updateData.name, amount: updateData.amount, category: updateData.category });

      // Update local list
      const index = expenses.value.findIndex(e => e.id === expenseId);
      if (index !== -1) {
        expenses.value[index] = updatedExpense;
      }

      cancelEdit();

    } catch (err) {
      console.error('Error updating expense:', err);
      error.value = err.message || 'Failed to update expense';
    } finally {
      isSubmitting.value = false;
    }
  };

  const deleteExpense = async (expenseId) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    error.value = null;

    try {
      console.log('Deleting expense:', expenseId);

      const response = await fetch(`${API_BASE_URL}/expenses/${expenseId}?tenant_id=${getTenantId()}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error Response:', errorData);
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}: ${response.statusText}`);
      }

      await logAudit('delete', 'expenses', { resource_type: 'expense', resource_id: expenseId });

      // Remove from local list
      expenses.value = expenses.value.filter(e => e.id !== expenseId);

      console.log('Deleted expense successfully');

    } catch (err) {
      console.error('Error deleting expense:', err);
      error.value = err.message || 'Failed to delete expense';
    }
  };

  const nextPage = () => {
    if (page.value < totalPages.value) {
      page.value++;
    }
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
    }
  };

  // Initialize on mount
  onMounted(async () => {
    // Initialize branches
    try {
      branches.value = await getBranches();

      const fixedBranchId = getBranchId();
      const userRole = getUserRole();
      const isOwner = ['owner', 'admin', 'super_admin'].includes(userRole?.toLowerCase());

      if (fixedBranchId && !isOwner) {
        // Restricted User
        const branch = branches.value.find(b => b.id === fixedBranchId || b._id === fixedBranchId);
        if (branch) {
          selectedBranch.value = branch;
          setSelectedBranch(branch);
        }
      } else {
        // Owner / Unrestricted
        if (!branches.value.some(b => !b.id && b.name === 'All Branches')) {
          branches.value.unshift({ id: '', name: 'All Branches' });
        }

        // Always default to "All Branches" (first item) for owners to ensure visibility
        if (branches.value.length > 0) {
          selectedBranch.value = branches.value[0];
          setSelectedBranch(branches.value[0]);
        }
      }
    } catch (e) {
      console.warn('Failed to load branches for expenses', e);
    }

    fetchExpenses();
  });

  // Watch for branch changes
  watch(selectedBranch, (newVal) => {
    if (newVal) {
      setSelectedBranch(newVal);
      fetchExpenses();
    }
  });

  return {
    // State
    expenses,
    loading,
    error,
    branches,
    selectedBranch,
    isSubmitting,

    // Form data
    newExpense,
    editingExpenseId,
    editingExpense,

    // Filters and pagination
    filters,
    categories,
    categoryGroups,
    getCategoryGroup,
    page,
    totalPages,
    startIndex,
    endIndex,

    // Computed
    sortedExpenses,
    pagedExpenses,

    // Methods
    calculateTotalExpenses,
    calculateMonthlyExpenses,
    calculateWeeklyExpenses,
    fetchExpenses,
    createExpense,
    startEdit,
    cancelEdit,
    updateExpense,
    deleteExpense,
    nextPage,
    prevPage,
    resetNewExpenseForm,
    validateExpense,
    exportExpenses,
    uploadBulkFile,
    processBulkImport
  };
}