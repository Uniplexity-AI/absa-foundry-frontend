import { ref, computed, watch } from 'vue'
import { decodeJWT } from '@/services/decodeJWT.js'
import API_BASE_URL from '@/services/api'

export function useStrategicManagement() {
  // JWT functions
  const { getTenantId, getUserEmail, getUserName } = decodeJWT()

  // Core state
  const currentTimeframe = ref('monthly')
  const loading = ref(false)
  const error = ref(null)

  // Strategic data
  const visionMission = ref({
    vision: '',
    mission: '',
    lastUpdated: null
  })
  
  const goals = ref([])
  const strategies = ref([])
  const actionPlans = ref([])
  const milestones = ref([])
  const meetings = ref([])
  const kpis = ref({
    financial: {},
    operational: {},
    customer: {},
    hr: {}
  })

  // Modal states
  const showGoalModal = ref(false)
  const showStrategyModal = ref(false)
  const showActionPlanModal = ref(false)
  const showKPIModal = ref(false)
  const showMeetingModal = ref(false)
  const selectedMeeting = ref(null)

  // Alerts and notifications
  const alerts = ref([])

  // Computed properties
  const weeklyKPIs = computed(() => {
    return Object.values(kpis.value).reduce((acc, category) => {
      Object.entries(category).forEach(([key, value]) => {
        if (value.timeframe === 'weekly') {
          acc[key] = value
        }
      })
      return acc
    }, {})
  })

  const upcomingMeetings = computed(() => {
    const now = new Date()
    return meetings.value
      .filter(meeting => new Date(meeting.scheduledDate) > now)
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
  })

  const performanceAlerts = computed(() => {
    const alertList = []
    
    // Check KPI performance
    Object.entries(kpis.value).forEach(([category, categoryKPIs]) => {
      Object.entries(categoryKPIs).forEach(([kpiName, kpiData]) => {
        if (kpiData.currentValue && kpiData.targetValue) {
          const performance = (kpiData.currentValue / kpiData.targetValue) * 100
          
          if (performance < 70) {
            alertList.push({
              id: `kpi_${category}_${kpiName}`,
              type: 'critical',
              title: `${kpiName} Below Target`,
              message: `Currently at ${performance.toFixed(1)}% of target (${formatNumber(kpiData.currentValue)} / ${formatNumber(kpiData.targetValue)})`
            })
          } else if (performance < 85) {
            alertList.push({
              id: `kpi_${category}_${kpiName}`,
              type: 'warning',
              title: `${kpiName} Needs Attention`,
              message: `Currently at ${performance.toFixed(1)}% of target`
            })
          }
        }
      })
    })

    // Check goal deadlines
    goals.value.forEach(goal => {
      if (goal.targetDate) {
        const daysUntilDeadline = Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24))
        
        if (daysUntilDeadline <= 7 && daysUntilDeadline > 0 && goal.currentProgress < 90) {
          alertList.push({
            id: `goal_deadline_${goal.id}`,
            type: 'warning',
            title: `Goal Deadline Approaching`,
            message: `"${goal.title}" is due in ${daysUntilDeadline} days and is ${goal.currentProgress}% complete`
          })
        } else if (daysUntilDeadline < 0 && goal.currentProgress < 100) {
          alertList.push({
            id: `goal_overdue_${goal.id}`,
            type: 'critical',
            title: `Goal Overdue`,
            message: `"${goal.title}" was due ${Math.abs(daysUntilDeadline)} days ago`
          })
        }
      }
    })

    return alertList
  })

  // Watch for performance alerts
  watch(performanceAlerts, (newAlerts) => {
    alerts.value = newAlerts
  }, { deep: true })

  // Core methods
  const handleTimeframeChange = async () => {
    await loadStrategicData()
  }

  const loadStrategicData = async () => {
    loading.value = true
    error.value = null

    try {
      const tenantId = getTenantId()
      
      // Load data based on current timeframe
      await Promise.all([
        loadVisionMission(),
        loadGoals(),
        loadStrategies(), 
        loadActionPlans(),
        loadMilestones(),
        loadMeetings(),
        loadKPIs()
      ])

      // Aggregate cross-module data
      await aggregateModuleData()

    } catch (err) {
      console.error('Error loading strategic data:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const loadVisionMission = async () => {
    try {
      const tenantId = getTenantId()
      
      // Try to load from API
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/strategic/vision-mission?tenant_id=${tenantId}`)
        if (response.ok) {
          const data = await response.json()
          visionMission.value = data
          
          // Cache in localStorage
          localStorage.setItem(`visionMission_${tenantId}`, JSON.stringify(data))
          return
        }
      }
      
      // Fallback to localStorage
      const cached = localStorage.getItem(`visionMission_${tenantId}`)
      if (cached) {
        visionMission.value = JSON.parse(cached)
      }
    } catch (error) {
      console.error('Error loading vision/mission:', error)
    }
  }

  const loadGoals = async () => {
    try {
      const tenantId = getTenantId()
      
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/strategic/goals?tenant_id=${tenantId}&timeframe=${currentTimeframe.value}`)
        if (response.ok) {
          const data = await response.json()
          goals.value = data
          localStorage.setItem(`goals_${tenantId}`, JSON.stringify(data))
          return
        }
      }
      
      const cached = localStorage.getItem(`goals_${tenantId}`)
      if (cached) {
        goals.value = JSON.parse(cached)
      }
    } catch (error) {
      console.error('Error loading goals:', error)
    }
  }

  const loadStrategies = async () => {
    try {
      const tenantId = getTenantId()
      
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/strategic/strategies?tenant_id=${tenantId}&timeframe=${currentTimeframe.value}`)
        if (response.ok) {
          const data = await response.json()
          strategies.value = data
          localStorage.setItem(`strategies_${tenantId}`, JSON.stringify(data))
          return
        }
      }
      
      const cached = localStorage.getItem(`strategies_${tenantId}`)
      if (cached) {
        strategies.value = JSON.parse(cached)
      }
    } catch (error) {
      console.error('Error loading strategies:', error)
    }
  }

  const loadActionPlans = async () => {
    try {
      const tenantId = getTenantId()
      
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/strategic/action-plans?tenant_id=${tenantId}&timeframe=${currentTimeframe.value}`)
        if (response.ok) {
          const data = await response.json()
          actionPlans.value = data
          localStorage.setItem(`actionPlans_${tenantId}`, JSON.stringify(data))
          return
        }
      }
      
      const cached = localStorage.getItem(`actionPlans_${tenantId}`)
      if (cached) {
        actionPlans.value = JSON.parse(cached)
      }
    } catch (error) {
      console.error('Error loading action plans:', error)
    }
  }

  const loadMilestones = async () => {
    try {
      const tenantId = getTenantId()
      
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/strategic/milestones?tenant_id=${tenantId}&timeframe=${currentTimeframe.value}`)
        if (response.ok) {
          const data = await response.json()
          milestones.value = data
          localStorage.setItem(`milestones_${tenantId}`, JSON.stringify(data))
          return
        }
      }
      
      const cached = localStorage.getItem(`milestones_${tenantId}`)
      if (cached) {
        milestones.value = JSON.parse(cached)
      }
    } catch (error) {
      console.error('Error loading milestones:', error)
    }
  }

  const loadMeetings = async () => {
    try {
      const tenantId = getTenantId()
      
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/strategic/meetings?tenant_id=${tenantId}`)
        if (response.ok) {
          const data = await response.json()
          meetings.value = data
          localStorage.setItem(`meetings_${tenantId}`, JSON.stringify(data))
          return
        }
      }
      
      const cached = localStorage.getItem(`meetings_${tenantId}`)
      if (cached) {
        meetings.value = JSON.parse(cached)
      }
    } catch (error) {
      console.error('Error loading meetings:', error)
    }
  }

  const loadKPIs = async () => {
    try {
      const tenantId = getTenantId()
      
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/strategic/kpis?tenant_id=${tenantId}&timeframe=${currentTimeframe.value}`)
        if (response.ok) {
          const data = await response.json()
          kpis.value = data
          localStorage.setItem(`kpis_${tenantId}`, JSON.stringify(data))
          return
        }
      }
      
      const cached = localStorage.getItem(`kpis_${tenantId}`)
      if (cached) {
        kpis.value = JSON.parse(cached)
      }
    } catch (error) {
      console.error('Error loading KPIs:', error)
    }
  }

  const aggregateModuleData = async () => {
    try {
      const tenantId = getTenantId()

      // Aggregate data from other modules for KPI calculation
      const moduleData = {
        pos: await getModuleData('pos'),
        inventory: await getModuleData('inventory'),
        crm: await getModuleData('crm'),
        expenses: await getModuleData('expenses'),
        payroll: await getModuleData('payroll')
      }

      // Calculate KPIs from aggregated data
      kpis.value = calculateKPIsFromModuleData(moduleData)
      
      // Update goal progress based on KPI performance
      updateGoalProgress()
      
    } catch (error) {
      console.error('Error aggregating module data:', error)
    }
  }

  const getModuleData = async (moduleName) => {
    try {
      // First try online API
      if (navigator.onLine) {
        const response = await fetch(`${API_BASE_URL}/${moduleName}/summary?tenant_id=${getTenantId()}`)
        if (response.ok) {
          return await response.json()
        }
      }

      // Fallback to localStorage cache
      const cached = localStorage.getItem(`${moduleName}_summary_${getTenantId()}`)
      return cached ? JSON.parse(cached) : {}
    } catch (error) {
      console.error(`Error getting ${moduleName} data:`, error)
      return {}
    }
  }

  const calculateKPIsFromModuleData = (moduleData) => {
    const calculatedKPIs = {
      financial: {},
      operational: {},
      customer: {},
      hr: {}
    }

    // Financial KPIs
    if (moduleData.pos) {
      calculatedKPIs.financial.revenue = {
        name: 'Revenue',
        currentValue: moduleData.pos.totalSales || 0,
        targetValue: 100000, // Example target
        unit: 'currency',
        trend: moduleData.pos.salesTrend || 0,
        timeframe: currentTimeframe.value
      }

      calculatedKPIs.financial.profitMargin = {
        name: 'Profit Margin',
        currentValue: moduleData.pos.profitMargin || 0,
        targetValue: 25,
        unit: 'percentage',
        trend: moduleData.pos.profitTrend || 0,
        timeframe: currentTimeframe.value
      }
    }

    // Operational KPIs
    if (moduleData.inventory) {
      calculatedKPIs.operational.inventoryTurnover = {
        name: 'Inventory Turnover',
        currentValue: moduleData.inventory.turnoverRate || 0,
        targetValue: 8,
        unit: 'ratio',
        trend: moduleData.inventory.turnoverTrend || 0,
        timeframe: currentTimeframe.value
      }

      calculatedKPIs.operational.stockoutRate = {
        name: 'Stockout Rate',
        currentValue: moduleData.inventory.stockoutRate || 0,
        targetValue: 2,
        unit: 'percentage',
        trend: moduleData.inventory.stockoutTrend || 0,
        timeframe: currentTimeframe.value
      }
    }

    // Customer KPIs
    if (moduleData.crm) {
      calculatedKPIs.customer.customerAcquisition = {
        name: 'Customer Acquisition',
        currentValue: moduleData.crm.newCustomers || 0,
        targetValue: 50,
        unit: 'count',
        trend: moduleData.crm.acquisitionTrend || 0,
        timeframe: currentTimeframe.value
      }

      calculatedKPIs.customer.conversionRate = {
        name: 'Lead Conversion Rate',
        currentValue: moduleData.crm.conversionRate || 0,
        targetValue: 15,
        unit: 'percentage',
        trend: moduleData.crm.conversionTrend || 0,
        timeframe: currentTimeframe.value
      }
    }

    // HR KPIs
    if (moduleData.payroll) {
      calculatedKPIs.hr.revenuePerEmployee = {
        name: 'Revenue per Employee',
        currentValue: moduleData.payroll.revenuePerEmployee || 0,
        targetValue: 50000,
        unit: 'currency',
        trend: moduleData.payroll.productivityTrend || 0,
        timeframe: currentTimeframe.value
      }
    }

    return calculatedKPIs
  }

  const updateGoalProgress = () => {
    goals.value.forEach(goal => {
      // Calculate progress based on related KPIs
      if (goal.relatedKPIs) {
        let totalProgress = 0
        let kpiCount = 0

        goal.relatedKPIs.forEach(kpiPath => {
          const [category, kpiName] = kpiPath.split('.')
          const kpiData = kpis.value[category]?.[kpiName]
          
          if (kpiData && kpiData.targetValue) {
            const kpiProgress = Math.min((kpiData.currentValue / kpiData.targetValue) * 100, 100)
            totalProgress += kpiProgress
            kpiCount++
          }
        })

        if (kpiCount > 0) {
          goal.currentProgress = Math.round(totalProgress / kpiCount)
        }
      }
    })
  }

  // Event handlers
  const handleKPIUpdate = async (category, kpiName, newValue) => {
    if (kpis.value[category] && kpis.value[category][kpiName]) {
      kpis.value[category][kpiName].currentValue = newValue
      
      // Save to backend if online
      if (navigator.onLine) {
        try {
          await fetch(`${API_BASE_URL}/strategic/kpis/${category}/${kpiName}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              currentValue: newValue,
              tenant_id: getTenantId()
            })
          })
        } catch (error) {
          console.error('Error updating KPI:', error)
        }
      }

      // Update goal progress
      updateGoalProgress()
    }
  }

  const handleVisionUpdate = async (newVision) => {
    visionMission.value.vision = newVision
    visionMission.value.lastUpdated = new Date().toISOString()
    
    await saveVisionMission()
  }

  const handleMissionUpdate = async (newMission) => {
    visionMission.value.mission = newMission
    visionMission.value.lastUpdated = new Date().toISOString()
    
    await saveVisionMission()
  }

  const saveVisionMission = async () => {
    const tenantId = getTenantId()
    
    // Save to localStorage
    localStorage.setItem(`visionMission_${tenantId}`, JSON.stringify(visionMission.value))
    
    // Save to backend if online
    if (navigator.onLine) {
      try {
        await fetch(`${API_BASE_URL}/strategic/vision-mission`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...visionMission.value,
            tenant_id: tenantId,
            updated_by: getUserEmail() || 'unknown'
          })
        })
      } catch (error) {
        console.error('Error saving vision/mission:', error)
      }
    }
  }

  const handleGoalCreate = async (goalData) => {
    const newGoal = {
      id: `goal_${Date.now()}`,
      ...goalData,
      tenantId: getTenantId(),
      createdBy: getUserEmail() || 'unknown',
      createdAt: new Date().toISOString(),
      currentProgress: 0
    }

    goals.value.push(newGoal)
    showGoalModal.value = false
    
    await saveGoals()
  }

  const handleGoalUpdate = async (goalId, updates) => {
    const goalIndex = goals.value.findIndex(g => g.id === goalId)
    if (goalIndex !== -1) {
      goals.value[goalIndex] = { ...goals.value[goalIndex], ...updates }
      await saveGoals()
    }
  }

  const saveGoals = async () => {
    const tenantId = getTenantId()
    localStorage.setItem(`goals_${tenantId}`, JSON.stringify(goals.value))
    
    if (navigator.onLine) {
      try {
        await fetch(`${API_BASE_URL}/strategic/goals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            goals: goals.value,
            tenant_id: tenantId
          })
        })
      } catch (error) {
        console.error('Error saving goals:', error)
      }
    }
  }

  const handleStrategyCreate = async (strategyData) => {
    const newStrategy = {
      id: `strategy_${Date.now()}`,
      ...strategyData,
      tenantId: getTenantId(),
      createdBy: getUserEmail() || 'unknown',
      createdAt: new Date().toISOString()
    }

    strategies.value.push(newStrategy)
    showStrategyModal.value = false
    
    await saveStrategies()
  }

  const handleStrategyUpdate = async (strategyId, updates) => {
    const strategyIndex = strategies.value.findIndex(s => s.id === strategyId)
    if (strategyIndex !== -1) {
      strategies.value[strategyIndex] = { ...strategies.value[strategyIndex], ...updates }
      await saveStrategies()
    }
  }

  const saveStrategies = async () => {
    const tenantId = getTenantId()
    localStorage.setItem(`strategies_${tenantId}`, JSON.stringify(strategies.value))
    
    if (navigator.onLine) {
      try {
        await fetch(`${API_BASE_URL}/strategic/strategies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            strategies: strategies.value,
            tenant_id: tenantId
          })
        })
      } catch (error) {
        console.error('Error saving strategies:', error)
      }
    }
  }

  const handleActionPlanCreate = async (actionPlanData) => {
    const newActionPlan = {
      id: `action_${Date.now()}`,
      ...actionPlanData,
      tenantId: getTenantId(),
      createdBy: getUserEmail() || 'unknown',
      createdAt: new Date().toISOString()
    }

    actionPlans.value.push(newActionPlan)
    showActionPlanModal.value = false
    
    await saveActionPlans()
  }

  const handleActionPlanUpdate = async (actionPlanId, updates) => {
    const actionPlanIndex = actionPlans.value.findIndex(a => a.id === actionPlanId)
    if (actionPlanIndex !== -1) {
      actionPlans.value[actionPlanIndex] = { ...actionPlans.value[actionPlanIndex], ...updates }
      await saveActionPlans()
    }
  }

  const saveActionPlans = async () => {
    const tenantId = getTenantId()
    localStorage.setItem(`actionPlans_${tenantId}`, JSON.stringify(actionPlans.value))
    
    if (navigator.onLine) {
      try {
        await fetch(`${API_BASE_URL}/strategic/action-plans`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            actionPlans: actionPlans.value,
            tenant_id: tenantId
          })
        })
      } catch (error) {
        console.error('Error saving action plans:', error)
      }
    }
  }

  const handleMilestoneUpdate = async (milestoneId, updates) => {
    const milestoneIndex = milestones.value.findIndex(m => m.id === milestoneId)
    if (milestoneIndex !== -1) {
      milestones.value[milestoneIndex] = { ...milestones.value[milestoneIndex], ...updates }
      await saveMilestones()
    }
  }

  const saveMilestones = async () => {
    const tenantId = getTenantId()
    localStorage.setItem(`milestones_${tenantId}`, JSON.stringify(milestones.value))
    
    if (navigator.onLine) {
      try {
        await fetch(`${API_BASE_URL}/strategic/milestones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            milestones: milestones.value,
            tenant_id: tenantId
          })
        })
      } catch (error) {
        console.error('Error saving milestones:', error)
      }
    }
  }

  const handleKPICreate = async (kpiData) => {
    const { category, ...kpiDetails } = kpiData
    
    if (!kpis.value[category]) {
      kpis.value[category] = {}
    }
    
    kpis.value[category][kpiDetails.name] = kpiDetails
    showKPIModal.value = false
    
    await saveKPIs()
  }

  const saveKPIs = async () => {
    const tenantId = getTenantId()
    localStorage.setItem(`kpis_${tenantId}`, JSON.stringify(kpis.value))
    
    if (navigator.onLine) {
      try {
        await fetch(`${API_BASE_URL}/strategic/kpis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            kpis: kpis.value,
            tenant_id: tenantId
          })
        })
      } catch (error) {
        console.error('Error saving KPIs:', error)
      }
    }
  }

  const handleMeetingSave = async (meetingData) => {
    if (selectedMeeting.value) {
      // Update existing meeting
      const meetingIndex = meetings.value.findIndex(m => m.id === selectedMeeting.value.id)
      if (meetingIndex !== -1) {
        meetings.value[meetingIndex] = { ...meetings.value[meetingIndex], ...meetingData }
      }
    } else {
      // Create new meeting
      const newMeeting = {
        id: `meeting_${Date.now()}`,
        ...meetingData,
        tenantId: getTenantId(),
        createdBy: getUserEmail() || 'unknown',
        createdAt: new Date().toISOString()
      }
      meetings.value.push(newMeeting)
    }

    showMeetingModal.value = false
    selectedMeeting.value = null
    
    await saveMeetings()
  }

  const saveMeetings = async () => {
    const tenantId = getTenantId()
    localStorage.setItem(`meetings_${tenantId}`, JSON.stringify(meetings.value))
    
    if (navigator.onLine) {
      try {
        await fetch(`${API_BASE_URL}/strategic/meetings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            meetings: meetings.value,
            tenant_id: tenantId
          })
        })
      } catch (error) {
        console.error('Error saving meetings:', error)
      }
    }
  }

  const openMeetingDetails = (meeting) => {
    selectedMeeting.value = meeting
    showMeetingModal.value = true
  }

  const openStrategyDetails = (strategy) => {
    // Implementation for strategy details
    console.log('Open strategy details:', strategy)
  }

  const openGoalDetails = (goal) => {
    // Implementation for goal details
    console.log('Open goal details:', goal)
  }

  const dismissAlert = (alertId) => {
    alerts.value = alerts.value.filter(alert => alert.id !== alertId)
  }

  // Utility functions
  const formatNumber = (num) => {
    if (typeof num !== 'number') return '0'
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
  }

  const formatCurrency = (num) => {
    if (num === null || num === undefined) return 'K 0.00'
    const number = Number(num)
    if (isNaN(number)) return 'K 0.00'
    return `K ${number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }

  const formatMeetingDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getMeetingStatus = (meeting) => {
    const now = new Date()
    const meetingDate = new Date(meeting.scheduledDate)
    const hoursUntilMeeting = (meetingDate - now) / (1000 * 60 * 60)

    if (hoursUntilMeeting < 0) return 'Completed'
    if (hoursUntilMeeting < 2) return 'Starting Soon'
    if (hoursUntilMeeting < 24) return 'Today'
    return 'Scheduled'
  }

  const getMeetingStatusColor = (meeting) => {
    const status = getMeetingStatus(meeting)
    
    switch (status) {
      case 'Completed':
        return 'bg-gray-100 text-gray-800'
      case 'Starting Soon':
        return 'bg-red-100 text-red-800'
      case 'Today':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const refreshKPIs = async () => {
    await aggregateModuleData()
  }

  return {
    // State
    currentTimeframe,
    loading,
    error,
    kpis,
    visionMission,
    goals,
    strategies,
    actionPlans,
    milestones,
    weeklyKPIs,
    upcomingMeetings,
    meetings,
    alerts,
    selectedMeeting,

    // Modal states
    showGoalModal,
    showStrategyModal,
    showActionPlanModal,
    showKPIModal,
    showMeetingModal,

    // Methods
    handleTimeframeChange,
    handleKPIUpdate,
    handleVisionUpdate,
    handleMissionUpdate,
    handleGoalUpdate,
    handleStrategyUpdate,
    handleActionPlanUpdate,
    handleMilestoneUpdate,
    handleGoalCreate,
    handleStrategyCreate,
    handleActionPlanCreate,
    handleKPICreate,
    handleMeetingSave,
    openMeetingDetails,
    openStrategyDetails,
    openGoalDetails,
    dismissAlert,
    formatMeetingDate,
    getMeetingStatus,
    getMeetingStatusColor,
    formatNumber,
    formatCurrency,

    // Data loading
    loadStrategicData,
    refreshKPIs
  }
}