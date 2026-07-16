/**
 * Telemetry and Image Comparison API Service
 * Handles fetching and comparing telemetry data with image analysis results
 */

import axios from 'axios'
import API_BASE_URL from './api'

export class TelemetryComparisonService {
  /**
   * Fetch comparison data between telemetry and image analysis
   * @param {Object} filters - Filter parameters
   * @returns {Promise<Array>} Comparison data
   */
  static async getComparisonData(filters = {}) {
    try {
      const params = new URLSearchParams()
      
      if (filters.machineType) params.append('machine_type', filters.machineType)
      if (filters.fromDate) params.append('from_date', filters.fromDate)
      if (filters.toDate) params.append('to_date', filters.toDate)
      if (filters.machineId) params.append('machine_id', filters.machineId)
      
      const response = await axios.get(`${API_BASE_URL}/telemetry/compare?${params}`)
      return response.data
    } catch (error) {
      console.error('Error fetching comparison data:', error)
      throw error
    }
  }

  /**
   * Fetch real-time telemetry data for a specific machine
   * @param {string} machineId - Machine identifier
   * @returns {Promise<Object>} Real-time telemetry data
   */
  static async getRealTimeTelemetry(machineId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/telemetry/realtime/${machineId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching real-time telemetry:', error)
      throw error
    }
  }

  /**
   * Fetch historical image analysis data for a machine
   * @param {string} machineId - Machine identifier
   * @param {Object} dateRange - Date range filter
   * @returns {Promise<Array>} Historical image analysis data
   */
  static async getImageAnalysisHistory(machineId, dateRange = {}) {
    try {
      const params = new URLSearchParams({ machine_id: machineId })
      
      if (dateRange.fromDate) params.append('from_date', dateRange.fromDate)
      if (dateRange.toDate) params.append('to_date', dateRange.toDate)
      
      const response = await axios.get(`${API_BASE_URL}/mining/image-analysis/history?${params}`)
      return response.data
    } catch (error) {
      console.error('Error fetching image analysis history:', error)
      throw error
    }
  }

  /**
   * Get variance analysis for specific parameters
   * @param {Object} filters - Analysis filters
   * @returns {Promise<Object>} Variance analysis results
   */
  static async getVarianceAnalysis(filters = {}) {
    try {
      const response = await axios.post(`${API_BASE_URL}/telemetry/variance-analysis`, filters)
      return response.data
    } catch (error) {
      console.error('Error fetching variance analysis:', error)
      throw error
    }
  }

  /**
   * Export comparison data to CSV format
   * @param {Object} filters - Export filters
   * @returns {Promise<Blob>} CSV file blob
   */
  static async exportComparisonData(filters = {}) {
    try {
      const response = await axios.post(`${API_BASE_URL}/telemetry/export`, filters, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting comparison data:', error)
      throw error
    }
  }

  /**
   * Get machine performance metrics
   * @param {string} machineId - Machine identifier
   * @param {Object} timeRange - Time range for metrics
   * @returns {Promise<Object>} Performance metrics
   */
  static async getMachineMetrics(machineId, timeRange = {}) {
    try {
      const params = new URLSearchParams({ machine_id: machineId })
      
      if (timeRange.period) params.append('period', timeRange.period) // day, week, month
      if (timeRange.fromDate) params.append('from_date', timeRange.fromDate)
      if (timeRange.toDate) params.append('to_date', timeRange.toDate)
      
      const response = await axios.get(`${API_BASE_URL}/telemetry/metrics?${params}`)
      return response.data
    } catch (error) {
      console.error('Error fetching machine metrics:', error)
      throw error
    }
  }

  /**
   * Submit correlation feedback to improve accuracy
   * @param {Object} feedback - Feedback data
   * @returns {Promise<Object>} Submission result
   */
  static async submitCorrelationFeedback(feedback) {
    try {
      const response = await axios.post(`${API_BASE_URL}/telemetry/feedback`, feedback)
      return response.data
    } catch (error) {
      console.error('Error submitting correlation feedback:', error)
      throw error
    }
  }

  /**
   * Get available machine list with their current status
   * @returns {Promise<Array>} List of machines
   */
  static async getAvailableMachines() {
    try {
      const response = await axios.get(`${API_BASE_URL}/telemetry/machines`)
      return response.data
    } catch (error) {
      console.error('Error fetching available machines:', error)
      throw error
    }
  }

  /**
   * Generate mock data for development/testing
   * @param {Object} params - Parameters for mock data generation
   * @returns {Array} Mock comparison data
   */
  static generateMockData(params = {}) {
    const {
      count = 50,
      machineTypes = ['sandvik_dump_truck', 'rock_breaker'],
      machines = ['SVK-001', 'SVK-002', 'RB-003', 'RB-004', 'SVK-005'],
      parameters = ['engine_hours', 'fuel_consumption', 'hydraulic_pressure', 'temperature', 'vibration_level']
    } = params

    const data = []
    
    for (let i = 0; i < count; i++) {
      const machineId = machines[Math.floor(Math.random() * machines.length)]
      const machineType = machineTypes[Math.floor(Math.random() * machineTypes.length)]
      const parameter = parameters[Math.floor(Math.random() * parameters.length)]
      const telemetryValue = (Math.random() * 1000).toFixed(2)
      const variance = (Math.random() * 40 - 20).toFixed(1) // -20% to +20%
      const imageValue = (telemetryValue * (1 + variance / 100)).toFixed(2)
      const status = Math.abs(variance) <= 5 ? 'Accurate' : Math.abs(variance) <= 15 ? 'Warning' : 'Error'
      
      data.push({
        id: i + 1,
        machineId,
        machineType,
        parameter,
        telemetryValue: parseFloat(telemetryValue),
        imageValue: parseFloat(imageValue),
        variance: parseFloat(variance),
        status,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
        imageSource: `image_${i + 1}.jpg`,
        telemetrySource: 'sensor_data'
      })
    }
    
    return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  /**
   * Calculate correlation metrics between telemetry and image data
   * @param {Array} comparisonData - Comparison dataset
   * @returns {Object} Correlation metrics
   */
  static calculateCorrelationMetrics(comparisonData) {
    if (!comparisonData || comparisonData.length === 0) {
      return {
        accuracy: 0,
        averageVariance: 0,
        correlationCoefficient: 0,
        totalComparisons: 0
      }
    }

    const totalComparisons = comparisonData.length
    const accurateCount = comparisonData.filter(item => Math.abs(item.variance) <= 5).length
    const accuracy = (accurateCount / totalComparisons) * 100

    const totalVariance = comparisonData.reduce((sum, item) => sum + Math.abs(item.variance), 0)
    const averageVariance = totalVariance / totalComparisons

    // Simple correlation calculation
    const telemetryValues = comparisonData.map(item => item.telemetryValue)
    const imageValues = comparisonData.map(item => item.imageValue)
    const correlationCoefficient = this.calculatePearsonCorrelation(telemetryValues, imageValues)

    return {
      accuracy: Math.round(accuracy),
      averageVariance: Math.round(averageVariance * 100) / 100,
      correlationCoefficient: Math.round(correlationCoefficient * 100) / 100,
      totalComparisons
    }
  }

  /**
   * Calculate Pearson correlation coefficient
   * @param {Array} x - First dataset
   * @param {Array} y - Second dataset
   * @returns {number} Correlation coefficient (-1 to 1)
   */
  static calculatePearsonCorrelation(x, y) {
    if (x.length !== y.length || x.length === 0) return 0

    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0)
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    return denominator === 0 ? 0 : numerator / denominator
  }
}

export default TelemetryComparisonService