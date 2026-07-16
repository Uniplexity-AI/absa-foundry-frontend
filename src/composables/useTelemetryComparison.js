/**
 * Composable for Telemetry vs Image Analysis Comparison
 * Manages state, data fetching, and business logic for comparison module
 */

import { ref, computed, reactive, watch } from 'vue'
import TelemetryComparisonService from '@/api_services/telemetry_comparison_api'

export function useTelemetryComparison() {
  // State
  const isLoading = ref(false)
  const error = ref(null)
  const comparisonData = ref([])
  const realTimeData = ref({})
  const selectedMachine = ref(null)
  
  // Filters
  const filters = reactive({
    machineType: '',
    fromDate: '',
    toDate: '',
    machineId: '',
    parameter: '',
    minVariance: null,
    maxVariance: null
  })

  // Pagination
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    sortBy: 'timestamp',
    sortOrder: 'desc'
  })

  // Computed properties
  const filteredData = computed(() => {
    let data = [...comparisonData.value]

    // Apply filters
    if (filters.machineType) {
      data = data.filter(item => item.machineType === filters.machineType)
    }
    
    if (filters.machineId) {
      data = data.filter(item => 
        item.machineId.toLowerCase().includes(filters.machineId.toLowerCase())
      )
    }
    
    if (filters.parameter) {
      data = data.filter(item => 
        item.parameter.toLowerCase().includes(filters.parameter.toLowerCase())
      )
    }
    
    if (filters.minVariance !== null) {
      data = data.filter(item => Math.abs(item.variance) >= filters.minVariance)
    }
    
    if (filters.maxVariance !== null) {
      data = data.filter(item => Math.abs(item.variance) <= filters.maxVariance)
    }

    // Apply sorting
    data.sort((a, b) => {
      const aVal = a[pagination.sortBy]
      const bVal = b[pagination.sortBy]
      
      if (pagination.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return data
  })

  const paginatedData = computed(() => {
    const start = (pagination.currentPage - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    return filteredData.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / pagination.pageSize)
  })

  const metrics = computed(() => {
    const data = filteredData.value
    
    if (data.length === 0) {
      return {
        totalComparisons: 0,
        accuracyRate: 0,
        averageVariance: 0,
        correlationCoefficient: 0,
        activeMachines: 0,
        criticalAlerts: 0
      }
    }

    const totalComparisons = data.length
    const accurateCount = data.filter(item => Math.abs(item.variance) <= 5).length
    const accuracyRate = Math.round((accurateCount / totalComparisons) * 100)
    
    const totalVariance = data.reduce((sum, item) => sum + Math.abs(item.variance), 0)
    const averageVariance = Math.round(totalVariance / totalComparisons)
    
    const uniqueMachines = new Set(data.map(item => item.machineId))
    const activeMachines = uniqueMachines.size
    
    const criticalAlerts = data.filter(item => Math.abs(item.variance) > 20).length
    
    // Simple correlation calculation
    const telemetryValues = data.map(item => item.telemetryValue)
    const imageValues = data.map(item => item.imageValue)
    const correlationCoefficient = calculateCorrelation(telemetryValues, imageValues)

    return {
      totalComparisons,
      accuracyRate,
      averageVariance,
      correlationCoefficient,
      activeMachines,
      criticalAlerts
    }
  })

  const chartData = computed(() => {
    const data = filteredData.value.slice(0, 20) // Last 20 data points for chart
    
    return {
      labels: data.map(item => new Date(item.timestamp).toLocaleDateString()),
      datasets: [
        {
          label: 'Telemetry Values',
          data: data.map(item => item.telemetryValue),
          borderColor: '#2F2E8B',
          backgroundColor: '#2F2E8B20',
          tension: 0.4
        },
        {
          label: 'Image Analysis Values',
          data: data.map(item => item.imageValue),
          borderColor: '#059669',
          backgroundColor: '#05966920',
          tension: 0.4
        }
      ]
    }
  })

  // Methods
  const fetchComparisonData = async (customFilters = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const mergedFilters = { ...filters, ...customFilters }
      
      // For development, use mock data
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        comparisonData.value = TelemetryComparisonService.generateMockData({
          count: 100,
          machineTypes: ['sandvik_dump_truck', 'rock_breaker']
        })
      } else {
        const data = await TelemetryComparisonService.getComparisonData(mergedFilters)
        comparisonData.value = data
      }
      
      // Reset pagination when new data is loaded
      pagination.currentPage = 1
      
    } catch (err) {
      error.value = err.message || 'Failed to fetch comparison data'
      console.error('Error fetching comparison data:', err)
    } finally {
      isLoading.value = false
    }
  }

  const fetchRealTimeData = async (machineId) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        // Mock real-time data
        realTimeData.value[machineId] = {
          timestamp: new Date().toISOString(),
          status: 'online',
          parameters: {
            engine_hours: Math.random() * 1000,
            fuel_consumption: Math.random() * 50,
            hydraulic_pressure: Math.random() * 300,
            temperature: Math.random() * 100,
            vibration_level: Math.random() * 10
          }
        }
      } else {
        const data = await TelemetryComparisonService.getRealTimeTelemetry(machineId)
        realTimeData.value[machineId] = data
      }
    } catch (err) {
      console.error('Error fetching real-time data:', err)
    }
  }

  const exportData = async (format = 'csv') => {
    try {
      if (process.env.NODE_ENV === 'development') {
        // Mock export for development
        const csvContent = generateCSV(filteredData.value)
        downloadCSV(csvContent, `telemetry_comparison_${new Date().toISOString().split('T')[0]}.csv`)
      } else {
        const blob = await TelemetryComparisonService.exportComparisonData({
          ...filters,
          format
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `telemetry_comparison_${new Date().toISOString().split('T')[0]}.${format}`
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (err) {
      error.value = `Failed to export data: ${err.message}`
      console.error('Error exporting data:', err)
    }
  }

  const refreshData = () => {
    fetchComparisonData()
  }

  const clearFilters = () => {
    Object.keys(filters).forEach(key => {
      filters[key] = ''
    })
    filters.minVariance = null
    filters.maxVariance = null
    fetchComparisonData()
  }

  const updatePagination = (updates) => {
    Object.assign(pagination, updates)
  }

  const sortData = (field) => {
    if (pagination.sortBy === field) {
      pagination.sortOrder = pagination.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      pagination.sortBy = field
      pagination.sortOrder = 'asc'
    }
  }

  // Utility functions
  const calculateCorrelation = (x, y) => {
    if (x.length !== y.length || x.length === 0) return 0

    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    return denominator === 0 ? 0 : Math.round((numerator / denominator) * 100) / 100
  }

  const generateCSV = (data) => {
    const headers = ['Machine ID', 'Type', 'Parameter', 'Telemetry', 'Image Analysis', 'Variance', 'Status', 'Timestamp']
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.machineId,
        row.machineType,
        row.parameter,
        row.telemetryValue,
        row.imageValue,
        row.variance,
        row.status,
        row.timestamp
      ].join(','))
    ].join('\n')
    return csvContent
  }

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const formatMachineType = (type) => {
    return type.replace(/_/g, ' ').split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getVarianceColor = (variance) => {
    const absVariance = Math.abs(variance)
    if (absVariance <= 5) return 'bg-green-100 text-green-800'
    if (absVariance <= 15) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accurate': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Watchers
  watch(
    () => [filters.machineType, filters.fromDate, filters.toDate],
    () => {
      fetchComparisonData()
    },
    { deep: true }
  )

  // Initialize with default date range
  const initializeFilters = () => {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    filters.toDate = today.toISOString().split('T')[0]
    filters.fromDate = weekAgo.toISOString().split('T')[0]
  }

  return {
    // State
    isLoading,
    error,
    comparisonData,
    realTimeData,
    selectedMachine,
    filters,
    pagination,
    
    // Computed
    filteredData,
    paginatedData,
    totalPages,
    metrics,
    chartData,
    
    // Methods
    fetchComparisonData,
    fetchRealTimeData,
    exportData,
    refreshData,
    clearFilters,
    updatePagination,
    sortData,
    initializeFilters,
    
    // Utilities
    formatMachineType,
    formatTimestamp,
    getVarianceColor,
    getStatusColor
  }
}