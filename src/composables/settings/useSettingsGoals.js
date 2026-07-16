import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useSettingsBase } from './useSettingsBase'

export function useSettingsGoals() {
  const { getTenantId, API_BASE_URL, openSettingsConfirm } = useSettingsBase()

  const companyGoals = ref([
    {
      id: 1, title: 'Increase Monthly Revenue',
      description: 'Target a 25% increase in monthly revenue through improved sales and customer retention strategies.',
      category: 'revenue', priority: 'high', currentValue: 45000, targetValue: 60000,
      unit: 'ZMW', deadline: '2025-12-31', status: 'active', progress: 75,
      weeklyChange: 5.2, aiConfidence: 87, riskLevel: 'low', dataSource: 'pos',
      aiInsights: [{ id: 1, type: 'trend', message: 'Revenue growth is accelerating with a 15% increase this week compared to last week.', createdAt: '2025-09-25' }],
      aiInsightsEnabled: true, aiAlertsEnabled: true, aiPredictionsEnabled: true
    },
    {
      id: 2, title: 'Reduce Operating Expenses',
      description: 'Optimize operational costs by implementing efficient inventory management and reducing waste.',
      category: 'expenses', priority: 'medium', currentValue: 15000, targetValue: 12000,
      unit: 'ZMW', deadline: '2025-11-30', status: 'active', progress: 40,
      weeklyChange: -2.1, aiConfidence: 72, riskLevel: 'medium', dataSource: 'expenses',
      aiInsights: [{ id: 3, type: 'alert', message: 'Utility costs have increased by 8% this month. Consider energy-saving measures.', createdAt: '2025-09-26' }],
      aiInsightsEnabled: true, aiAlertsEnabled: true, aiPredictionsEnabled: false
    },
  ])

  const showAddGoalModal = ref(false)
  const showEditGoalModal = ref(false)
  const activeGoalMenu = ref(null)
  const editingGoal = ref(null)

  const goalForm = ref({
    title: '', description: '', category: 'revenue', priority: 'medium',
    currentValue: 0, targetValue: 0, unit: '', deadline: '',
    dataSource: 'manual', aiInsightsEnabled: true, aiAlertsEnabled: true, aiPredictionsEnabled: true
  })

  const activeGoalsCount = computed(() => companyGoals.value.filter(g => g.status === 'active').length)
  const achievedGoalsCount = computed(() => companyGoals.value.filter(g => g.status === 'completed' || g.progress >= 100).length)
  const aiInsightsCount = computed(() => companyGoals.value.reduce((t, g) => t + (g.aiInsights ? g.aiInsights.length : 0), 0))

  function toggleGoalActions(goalId) { activeGoalMenu.value = activeGoalMenu.value === goalId ? null : goalId }

  function closeGoalModal() {
    showAddGoalModal.value = false; showEditGoalModal.value = false; editingGoal.value = null
    goalForm.value = { title: '', description: '', category: 'revenue', priority: 'medium', currentValue: 0, targetValue: 0, unit: '', deadline: '', dataSource: 'manual', aiInsightsEnabled: true, aiAlertsEnabled: true, aiPredictionsEnabled: true }
  }

  function editGoal(goal) {
    editingGoal.value = goal
    goalForm.value = { title: goal.title, description: goal.description, category: goal.category, priority: goal.priority, currentValue: goal.currentValue, targetValue: goal.targetValue, unit: goal.unit, deadline: goal.deadline, dataSource: goal.dataSource, aiInsightsEnabled: goal.aiInsightsEnabled, aiAlertsEnabled: goal.aiAlertsEnabled, aiPredictionsEnabled: goal.aiPredictionsEnabled }
    showEditGoalModal.value = true; activeGoalMenu.value = null
  }

  async function saveGoal() {
    try {
      const tenantId = getTenantId()
      const goalData = { title: goalForm.value.title, description: goalForm.value.description, category: goalForm.value.category, priority: goalForm.value.priority, currentValue: goalForm.value.currentValue, targetValue: goalForm.value.targetValue, unit: goalForm.value.unit, deadline: goalForm.value.deadline, dataSource: goalForm.value.dataSource, aiInsightsEnabled: goalForm.value.aiInsightsEnabled, aiAlertsEnabled: goalForm.value.aiAlertsEnabled, aiPredictionsEnabled: goalForm.value.aiPredictionsEnabled }
      if (editingGoal.value) {
        const response = await fetch(`${API_BASE_URL}/goals/goals/${editingGoal.value.id}?tenant_id=${tenantId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify(goalData)
        })
        if (!response.ok) throw new Error('Failed to update goal')
        const result = await response.json()
        const index = companyGoals.value.findIndex(g => g.id === editingGoal.value.id)
        if (index !== -1) companyGoals.value[index] = result.goal
      } else {
        const response = await fetch(`${API_BASE_URL}/goals/goals?tenant_id=${tenantId}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify(goalData)
        })
        if (!response.ok) throw new Error('Failed to create goal')
        const result = await response.json()
        companyGoals.value.push(result.goal)
      }
      closeGoalModal()
      toast.success(editingGoal.value ? 'Goal updated successfully!' : 'Goal created successfully!')
    } catch (error) { console.error('Error saving goal:', error); toast.error('Failed to save goal. Please try again.') }
  }

  function deleteGoal(goalId) {
    openSettingsConfirm({
      title: 'Delete Goal', message: 'Are you sure you want to delete this goal? This action cannot be undone.',
      variant: 'danger', confirmLabel: 'Delete',
      onConfirm: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/goals/goals/${goalId}?tenant_id=${getTenantId()}`, {
            method: 'DELETE', headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          if (!response.ok) throw new Error('Failed to delete goal')
          companyGoals.value = companyGoals.value.filter(g => g.id !== goalId)
          activeGoalMenu.value = null; toast.success('Goal deleted successfully!')
        } catch (error) { console.error('Error deleting goal:', error); toast.error('Failed to delete goal. Please try again.') }
      }
    })
  }

  function duplicateGoal(goal) {
    companyGoals.value.push({ ...goal, id: Date.now(), title: `${goal.title} (Copy)`, status: 'active', progress: 0, currentValue: 0, aiInsights: [] })
    activeGoalMenu.value = null; toast.success('Goal duplicated successfully!')
  }

  async function generateAIInsights(goal) {
    try {
      activeGoalMenu.value = null
      const response = await fetch(`${API_BASE_URL}/goals/goals/${goal.id}/generate-insights?tenant_id=${getTenantId()}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (!response.ok) throw new Error('Failed to generate AI insights')
      const result = await response.json()
      const goalIndex = companyGoals.value.findIndex(g => g.id === goal.id)
      if (goalIndex !== -1) companyGoals.value[goalIndex].aiInsights = [...result.insights, ...(companyGoals.value[goalIndex].aiInsights || [])].slice(0, 10)
      toast.success('AI insights generated successfully!')
    } catch (error) { console.error('Error generating AI insights:', error); toast.error('Failed to generate AI insights. Please try again.') }
  }

  function getSmartRecommendation(goal) {
    const recommendations = {
      revenue: ['Consider implementing a customer referral program to boost revenue.', 'Analyze your best-selling products and focus marketing efforts on them.', 'Review pricing strategy for underperforming products.', 'Implement upselling techniques at point of sale.'],
      expenses: ['Review supplier contracts for potential cost savings.', 'Implement energy-saving measures to reduce utility costs.', 'Consider bulk purchasing for frequently used items.', 'Automate processes to reduce labor costs.'],
      customers: ['Implement a customer loyalty program to increase retention.', 'Use social media marketing to reach new customers.', 'Improve customer service response times.', 'Collect and act on customer feedback regularly.'],
      inventory: ['Implement just-in-time inventory management.', 'Use demand forecasting to optimize stock levels.', 'Regular inventory audits to reduce waste.', 'Consider dropshipping for slow-moving items.'],
      quality: ['Implement quality control checkpoints in your processes.', 'Train staff on quality standards and customer service.', 'Regularly survey customers for feedback.', 'Monitor and respond to online reviews promptly.'],
      delivery: ['Optimize delivery routes to reduce time and fuel costs.', 'Implement real-time tracking for customer transparency.', 'Set up automated delivery notifications for customers.', 'Consider partnering with local delivery services for peak times.'],
      efficiency: ['Analyze delivery ticket data to identify bottlenecks.', 'Implement delivery scheduling to optimize resource allocation.', 'Track delivery success rates and identify improvement areas.', 'Use data analytics to predict delivery demand patterns.']
    }
    const catRecs = recommendations[goal.category] || recommendations.revenue
    return catRecs[Math.floor(Math.random() * catRecs.length)]
  }

  function getGoalStatusClass(status) {
    const classes = { active: 'bg-blue-100 text-blue-800', completed: 'bg-green-100 text-green-800', paused: 'bg-yellow-100 text-yellow-800', cancelled: 'bg-red-100 text-red-800' }
    return classes[status] || classes.active
  }

  function getGoalPriorityClass(priority) {
    const classes = { high: 'bg-red-100 text-red-800', medium: 'bg-yellow-100 text-yellow-800', low: 'bg-green-100 text-green-800' }
    return classes[priority] || classes.medium
  }

  function getProgressBarClass(progress) {
    if (progress >= 90) return 'bg-green-500'
    if (progress >= 70) return 'bg-blue-500'
    if (progress >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  function getRiskLevelClass(riskLevel) {
    const classes = { low: 'text-green-600', medium: 'text-yellow-600', high: 'text-red-600' }
    return classes[riskLevel] || classes.medium
  }

  function getDaysLeft(deadline) {
    if (!deadline) return 'Not set'
    const daysDiff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 3600 * 24))
    if (daysDiff < 0) return 'Overdue'
    if (daysDiff === 0) return 'Today'
    if (daysDiff === 1) return '1 day'
    return `${daysDiff} days`
  }

  return {
    companyGoals, showAddGoalModal, showEditGoalModal, activeGoalMenu, editingGoal, goalForm,
    activeGoalsCount, achievedGoalsCount, aiInsightsCount,
    toggleGoalActions, closeGoalModal, editGoal, saveGoal, deleteGoal,
    duplicateGoal, generateAIInsights, getSmartRecommendation,
    getGoalStatusClass, getGoalPriorityClass, getProgressBarClass,
    getRiskLevelClass, getDaysLeft
  }
}
