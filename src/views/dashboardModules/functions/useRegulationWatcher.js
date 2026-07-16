import { ref, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';

export function useRegulationWatcher() {
  const { getTenantId } = decodeJWT();

  const regulations = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const filters = ref({
    source: '',
    category: '',
    dateRange: 'week'
  });

  const sources = ref([
    'Government Gazette',
    'Ministry of Mines',
    'ZEMA',
    'ZRA',
    'BOZ',
    'ERB',
    'NHIMA'
  ]);

  const categories = ref([
    'Mining & Minerals',
    'Environmental',
    'Tax & Revenue',
    'Health & Safety',
    'Employment',
    'Energy',
    'Financial'
  ]);

  const fetchRegulations = async () => {
    loading.value = true;
    error.value = null;

    try {
      const url = new URL(`${API_BASE_URL}/compliance/regulations`);
      url.searchParams.append('tenant_id', getTenantId());
      
      if (filters.value.source) url.searchParams.append('source', filters.value.source);
      if (filters.value.category) url.searchParams.append('category', filters.value.category);
      if (filters.value.dateRange) url.searchParams.append('date_range', filters.value.dateRange);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch regulations: ${response.status}`);
      }

      const data = await response.json();
      regulations.value = data.regulations || [];

    } catch (err) {
      console.error('Error fetching regulations:', err);
      error.value = err.message;

      // Mock data
      regulations.value = [
        {
          id: 1,
          title: 'Updated Mineral Royalty Rates',
          source: 'ZRA',
          category: 'Tax & Revenue',
          summary: 'New royalty rates for copper and cobalt mining operations effective January 2025',
          impact_level: 'high',
          published_date: '2024-12-15',
          effective_date: '2025-01-01',
          url: '#'
        },
        {
          id: 2,
          title: 'Environmental Impact Assessment Guidelines',
          source: 'ZEMA',
          category: 'Environmental',
          summary: 'Updated EIA requirements for mining projects above 1000 hectares',
          impact_level: 'medium',
          published_date: '2024-12-10',
          effective_date: '2025-03-01',
          url: '#'
        }
      ];
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchRegulations();
  });

  return {
    regulations,
    loading,
    error,
    filters,
    sources,
    categories,
    fetchRegulations
  };
}