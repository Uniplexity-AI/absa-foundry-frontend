import { ref, computed, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';

export function useObligationTracker() {
  const { getTenantId } = decodeJWT();

  const obligations = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const newObligation = ref({
    title: '',
    description: '',
    frequency: 'monthly',
    next_due_date: '',
    category: '',
    responsible_person: '',
    penalty_amount: 0
  });

  const frequencies = ref([
    'daily', 'weekly', 'monthly', 'quarterly', 'annually', 'one-time'
  ]);

  const categories = ref([
    'Tax Reporting',
    'Environmental Compliance',
    'Health & Safety',
    'Mining Permits',
    'Employment',
    'Financial Reporting'
  ]);

  const upcomingObligations = computed(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return obligations.value.filter(obligation => {
      const dueDate = new Date(obligation.next_due_date);
      return dueDate >= now && dueDate <= thirtyDaysFromNow;
    }).sort((a, b) => new Date(a.next_due_date) - new Date(b.next_due_date));
  });

  const overdueObligations = computed(() => {
    const now = new Date();
    return obligations.value.filter(obligation => {
      const dueDate = new Date(obligation.next_due_date);
      return dueDate < now && obligation.status !== 'completed';
    });
  });

  const fetchObligations = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE_URL}/compliance/obligations?tenant_id=${getTenantId()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch obligations: ${response.status}`);
      }

      const data = await response.json();
      obligations.value = data.obligations || [];

    } catch (err) {
      console.error('Error fetching obligations:', err);
      error.value = err.message;

      // Mock data
      obligations.value = [
        {
          id: 1,
          title: 'Monthly PAYE Submission',
          description: 'Submit monthly PAYE returns to ZRA',
          frequency: 'monthly',
          next_due_date: '2025-01-10',
          category: 'Tax Reporting',
          responsible_person: 'Finance Manager',
          penalty_amount: 2500,
          status: 'pending'
        },
        {
          id: 2,
          title: 'Environmental Monitoring Report',
          description: 'Submit quarterly environmental impact report to ZEMA',
          frequency: 'quarterly',
          next_due_date: '2025-01-31',
          category: 'Environmental Compliance',
          responsible_person: 'Environmental Officer',
          penalty_amount: 10000,
          status: 'pending'
        }
      ];
    } finally {
      loading.value = false;
    }
  };

  const createObligation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/obligations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newObligation.value,
          tenant_id: getTenantId()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create obligation: ${response.status}`);
      }

      await fetchObligations();
      resetForm();

    } catch (err) {
      console.error('Error creating obligation:', err);
      error.value = err.message;
    }
  };

  const resetForm = () => {
    newObligation.value = {
      title: '',
      description: '',
      frequency: 'monthly',
      next_due_date: '',
      category: '',
      responsible_person: '',
      penalty_amount: 0
    };
  };

  onMounted(() => {
    fetchObligations();
  });

  return {
    obligations,
    loading,
    error,
    newObligation,
    frequencies,
    categories,
    upcomingObligations,
    overdueObligations,
    fetchObligations,
    createObligation,
    resetForm
  };
}