import { ref, computed, onMounted } from 'vue';
import { decodeJWT } from '@/api_services/decodeJWT.js';
import API_BASE_URL from '@/api_services/api.js';

export function useRiskScoring() {
  const { getTenantId } = decodeJWT();

  // State
  const risks = ref([]);
  const riskMatrix = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const calculating = ref(false);
  const selectedRisk = ref(null);
  const riskHistory = ref([]);

  // Filters
  const filters = ref({
    risk_level: '',
    category: '',
    status: '',
    date_range: 'month'
  });

  // Risk categories
  const riskCategories = ref([
    'Regulatory Compliance',
    'Environmental',
    'Health & Safety',
    'Financial',
    'Operational',
    'Legal',
    'Reputational',
    'Cybersecurity',
    'Supply Chain',
    'Market',
    'Political',
    'Currency'
  ]);

  // Risk levels
  const riskLevels = ref([
    { value: 'critical', label: 'Critical', color: 'red', threshold: 0.9 },
    { value: 'high', label: 'High', color: 'orange', threshold: 0.7 },
    { value: 'medium', label: 'Medium', color: 'yellow', threshold: 0.5 },
    { value: 'low', label: 'Low', color: 'green', threshold: 0.3 },
    { value: 'minimal', label: 'Minimal', color: 'blue', threshold: 0.1 }
  ]);

  // Risk factors
  const riskFactors = ref([
    {
      id: 'compliance_gaps',
      name: 'Compliance Gaps',
      weight: 0.25,
      description: 'Missing or overdue compliance requirements'
    },
    {
      id: 'document_expiry',
      name: 'Document Expiry',
      weight: 0.20,
      description: 'Critical documents nearing expiration'
    },
    {
      id: 'regulatory_changes',
      name: 'Regulatory Changes',
      weight: 0.15,
      description: 'Recent regulatory updates affecting operations'
    },
    {
      id: 'penalty_exposure',
      name: 'Penalty Exposure',
      weight: 0.20,
      description: 'Potential financial penalties from non-compliance'
    },
    {
      id: 'operational_impact',
      name: 'Operational Impact',
      weight: 0.20,
      description: 'Risk of operational disruption or shutdown'
    }
  ]);

  // New risk assessment form
  const newRiskAssessment = ref({
    title: '',
    category: '',
    description: '',
    impact_score: 1,
    probability_score: 1,
    factors: {},
    mitigation_strategies: [''],
    responsible_person: '',
    review_date: ''
  });

  // Computed properties
  const overallRiskScore = computed(() => {
    if (risks.value.length === 0) return 0;
    const totalScore = risks.value.reduce((sum, risk) => sum + risk.risk_score, 0);
    return totalScore / risks.value.length;
  });

  const riskDistribution = computed(() => {
    const distribution = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      minimal: 0
    };

    risks.value.forEach(risk => {
      distribution[risk.risk_level]++;
    });

    return distribution;
  });

  const criticalRisks = computed(() => {
    return risks.value.filter(risk => risk.risk_level === 'critical' || risk.risk_level === 'high');
  });

  const filteredRisks = computed(() => {
    let filtered = [...risks.value];

    if (filters.value.risk_level) {
      filtered = filtered.filter(risk => risk.risk_level === filters.value.risk_level);
    }

    if (filters.value.category) {
      filtered = filtered.filter(risk => risk.category === filters.value.category);
    }

    if (filters.value.status) {
      filtered = filtered.filter(risk => risk.status === filters.value.status);
    }

    return filtered.sort((a, b) => b.risk_score - a.risk_score);
  });

  const riskTrends = computed(() => {
    // Calculate risk trends over time
    const trends = {
      improving: 0,
      deteriorating: 0,
      stable: 0
    };

    risks.value.forEach(risk => {
      if (risk.trend) {
        trends[risk.trend]++;
      } else {
        trends.stable++;
      }
    });

    return trends;
  });

  // Helper functions
  const extractErrorMessage = (errorData) => {
    if (typeof errorData === 'string') return errorData;
    if (errorData.detail) {
      if (typeof errorData.detail === 'string') return errorData.detail;
      if (Array.isArray(errorData.detail)) {
        return errorData.detail.map(err => err.msg || err).join(', ');
      }
    }
    return JSON.stringify(errorData);
  };

  const calculateRiskScore = (impact, probability, factors = {}) => {
    // Base score from impact and probability (1-5 scale)
    const baseScore = (impact * probability) / 25; // Normalize to 0-1

    // Apply factor weights
    let factorAdjustment = 0;
    Object.entries(factors).forEach(([factorId, value]) => {
      const factor = riskFactors.value.find(f => f.id === factorId);
      if (factor) {
        factorAdjustment += (value / 5) * factor.weight;
      }
    });

    return Math.min(baseScore + factorAdjustment, 1);
  };

  const getRiskLevel = (score) => {
    if (score >= 0.9) return 'critical';
    if (score >= 0.7) return 'high';
    if (score >= 0.5) return 'medium';
    if (score >= 0.3) return 'low';
    return 'minimal';
  };

  const getRiskColor = (level) => {
    const riskLevel = riskLevels.value.find(r => r.value === level);
    return riskLevel ? riskLevel.color : 'gray';
  };

  // API Methods
  const fetchRisks = async () => {
    loading.value = true;
    error.value = null;

    try {
      const url = new URL(`${API_BASE_URL}/compliance/risks`);
      url.searchParams.append('tenant_id', getTenantId());

      if (filters.value.date_range) {
        url.searchParams.append('date_range', filters.value.date_range);
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const data = await response.json();
      risks.value = data.risks || [];
      riskMatrix.value = data.risk_matrix || [];

    } catch (err) {
      console.error('Error fetching risks:', err);
      error.value = err.message;

      // Mock data for development
      risks.value = [
        {
          id: 1,
          title: 'Environmental Permit Expiration',
          category: 'Environmental',
          description: 'Mining environmental permit expires in 15 days without renewal application',
          risk_score: 0.85,
          risk_level: 'high',
          impact_score: 5,
          probability_score: 4,
          status: 'active',
          trend: 'deteriorating',
          factors: {
            compliance_gaps: 4,
            document_expiry: 5,
            penalty_exposure: 4,
            operational_impact: 5
          },
          potential_impact: 'Operations shutdown, K2M daily revenue loss',
          mitigation_strategies: [
            'Submit immediate renewal application',
            'Engage environmental consultant for expedited process',
            'Prepare contingency operational plan'
          ],
          responsible_person: 'Environmental Manager',
          last_reviewed: '2024-12-20',
          next_review: '2025-01-05',
          created_at: '2024-12-01'
        },
        {
          id: 2,
          title: 'ZRA Tax Compliance Gap',
          category: 'Regulatory Compliance',
          description: 'Mineral royalty calculations under review, potential back-payment required',
          risk_score: 0.72,
          risk_level: 'high',
          impact_score: 4,
          probability_score: 4,
          status: 'monitoring',
          trend: 'stable',
          factors: {
            compliance_gaps: 4,
            regulatory_changes: 3,
            penalty_exposure: 5,
            operational_impact: 2
          },
          potential_impact: 'K5M penalty exposure, reputation damage',
          mitigation_strategies: [
            'Engage tax consultant for compliance review',
            'Prepare detailed calculation documentation',
            'Establish monthly compliance monitoring'
          ],
          responsible_person: 'Finance Director',
          last_reviewed: '2024-12-18',
          next_review: '2024-12-30',
          created_at: '2024-11-15'
        },
        {
          id: 3,
          title: 'Worker Safety Protocol Updates',
          category: 'Health & Safety',
          description: 'New safety regulations require updated protocols and training',
          risk_score: 0.58,
          risk_level: 'medium',
          impact_score: 4,
          probability_score: 3,
          status: 'mitigating',
          trend: 'improving',
          factors: {
            compliance_gaps: 3,
            regulatory_changes: 4,
            penalty_exposure: 2,
            operational_impact: 3
          },
          potential_impact: 'Work stoppages, K500K training costs',
          mitigation_strategies: [
            'Schedule comprehensive safety training',
            'Update all safety protocols',
            'Conduct safety equipment audit'
          ],
          responsible_person: 'Safety Officer',
          last_reviewed: '2024-12-15',
          next_review: '2025-01-15',
          created_at: '2024-12-10'
        },
        {
          id: 4,
          title: 'Currency Exchange Exposure',
          category: 'Financial',
          description: 'USD/ZMW volatility affecting revenue projections',
          risk_score: 0.45,
          risk_level: 'medium',
          impact_score: 3,
          probability_score: 4,
          status: 'monitoring',
          trend: 'stable',
          factors: {
            penalty_exposure: 1,
            operational_impact: 4
          },
          potential_impact: '15% revenue variance from projections',
          mitigation_strategies: [
            'Implement currency hedging strategy',
            'Diversify revenue streams',
            'Monitor exchange rate trends'
          ],
          responsible_person: 'CFO',
          last_reviewed: '2024-12-19',
          next_review: '2025-01-01',
          created_at: '2024-12-05'
        }
      ];

      // Generate risk matrix data
      riskMatrix.value = generateRiskMatrix();
    } finally {
      loading.value = false;
    }
  };

  const generateRiskMatrix = () => {
    const matrix = [];
    for (let impact = 1; impact <= 5; impact++) {
      for (let probability = 1; probability <= 5; probability++) {
        const risksInCell = risks.value.filter(risk => 
          risk.impact_score === impact && risk.probability_score === probability
        );
        matrix.push({
          impact,
          probability,
          risk_score: calculateRiskScore(impact, probability),
          risk_level: getRiskLevel(calculateRiskScore(impact, probability)),
          risk_count: risksInCell.length,
          risks: risksInCell
        });
      }
    }
    return matrix;
  };

  const calculateOverallRisk = async () => {
    calculating.value = true;
    error.value = null;

    try {
      const response = await fetch(`${API_BASE_URL}/compliance/risks/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenant_id: getTenantId()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const result = await response.json();
      
      // Refresh risks data
      await fetchRisks();

      return result;

    } catch (err) {
      console.error('Error calculating risks:', err);
      error.value = err.message;
    } finally {
      calculating.value = false;
    }
  };

  const createRiskAssessment = async () => {
    try {
      // Calculate risk score
      const riskScore = calculateRiskScore(
        newRiskAssessment.value.impact_score,
        newRiskAssessment.value.probability_score,
        newRiskAssessment.value.factors
      );

      const riskData = {
        ...newRiskAssessment.value,
        tenant_id: getTenantId(),
        risk_score: riskScore,
        risk_level: getRiskLevel(riskScore),
        status: 'active',
        mitigation_strategies: newRiskAssessment.value.mitigation_strategies.filter(s => s.trim())
      };

      const response = await fetch(`${API_BASE_URL}/compliance/risks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(riskData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const createdRisk = await response.json();
      risks.value.unshift(createdRisk);
      resetRiskForm();

    } catch (err) {
      console.error('Error creating risk assessment:', err);
      error.value = err.message;
    }
  };

  const updateRiskStatus = async (riskId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/risks/${riskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenant_id: getTenantId(),
          status: status
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      // Update local data
      const riskIndex = risks.value.findIndex(r => r.id === riskId);
      if (riskIndex !== -1) {
        risks.value[riskIndex].status = status;
      }

    } catch (err) {
      console.error('Error updating risk status:', err);
      error.value = err.message;
    }
  };

  const deleteRisk = async (riskId) => {
    if (!confirm('Are you sure you want to delete this risk assessment?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/compliance/risks/${riskId}?tenant_id=${getTenantId()}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      risks.value = risks.value.filter(r => r.id !== riskId);

    } catch (err) {
      console.error('Error deleting risk:', err);
      error.value = err.message;
    }
  };

  const fetchRiskHistory = async (riskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/compliance/risks/${riskId}/history?tenant_id=${getTenantId()}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`);
      }

      const data = await response.json();
      riskHistory.value = data.history || [];

    } catch (err) {
      console.error('Error fetching risk history:', err);
      error.value = err.message;
    }
  };

  const resetRiskForm = () => {
    newRiskAssessment.value = {
      title: '',
      category: '',
      description: '',
      impact_score: 1,
      probability_score: 1,
      factors: {},
      mitigation_strategies: [''],
      responsible_person: '',
      review_date: ''
    };
  };

  const addMitigationStrategy = () => {
    newRiskAssessment.value.mitigation_strategies.push('');
  };

  const removeMitigationStrategy = (index) => {
    newRiskAssessment.value.mitigation_strategies.splice(index, 1);
  };

  const selectRisk = (risk) => {
    selectedRisk.value = risk;
    fetchRiskHistory(risk.id);
  };

  const clearSelection = () => {
    selectedRisk.value = null;
    riskHistory.value = [];
  };

  // Initialize
  onMounted(() => {
    fetchRisks();
  });

  return {
    // State
    risks,
    riskMatrix,
    loading,
    error,
    calculating,
    selectedRisk,
    riskHistory,

    // Filters and options
    filters,
    riskCategories,
    riskLevels,
    riskFactors,

    // Form
    newRiskAssessment,

    // Computed
    overallRiskScore,
    riskDistribution,
    criticalRisks,
    filteredRisks,
    riskTrends,

    // Methods
    fetchRisks,
    calculateOverallRisk,
    createRiskAssessment,
    updateRiskStatus,
    deleteRisk,
    fetchRiskHistory,
    resetRiskForm,
    addMitigationStrategy,
    removeMitigationStrategy,
    selectRisk,
    clearSelection,
    calculateRiskScore,
    getRiskLevel,
    getRiskColor
  };
}