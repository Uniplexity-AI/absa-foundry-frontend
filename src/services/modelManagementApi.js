import { API_BASE_URL, authFetch } from './api'

async function _handleRes(res) {
  const text = await res.text()
  let data = null
  if (text) {
    try { data = JSON.parse(text) } catch { data = null }
  }
  if (!res.ok) {
    const err = new Error(data?.detail || data?.message || `Request failed (${res.status})`)
    err.status = res.status
    throw err
  }
  return data
}

export async function fetchModels() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models`)
  return _handleRes(res)
}

export async function fetchChampion() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/champion`)
  return _handleRes(res)
}

export async function fetchChallengers() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/challengers`)
  return _handleRes(res)
}



export async function fetchFeatures() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/features`)
  return _handleRes(res)
}

export async function simulateCalibration(threshold) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/simulate-calibration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ threshold })
  })
  return _handleRes(res)
}

export async function submitCalibrationProposal(modelId, threshold, metrics) {

  const res = await authFetch(`${API_BASE_URL}/api/v1/models/calibration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model_id: modelId, proposed_threshold: threshold, metrics_snapshot: metrics }),
  })
  return _handleRes(res)
}

export async function approveCalibration(proposalId) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/calibration/${proposalId}/approve`, { method: 'POST' })
  return _handleRes(res)
}

export async function triggerRetrain(featureIds, datasetVersion = 'latest') {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/training`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ feature_ids: featureIds, dataset_version: datasetVersion }),
  })
  return _handleRes(res)
}

export async function fetchModelComparison() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/compare`)
  return _handleRes(res)
}

export async function validateModel(modelId) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/${modelId}/validate`, { method: 'POST' })
  return _handleRes(res)
}

export async function nominateModel(modelId) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/${modelId}/nominate`, { method: 'POST' })
  return _handleRes(res)
}

export async function approveModel(modelId) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/${modelId}/approve`, { method: 'POST' })
  return _handleRes(res)
}

export async function promoteModel(modelId) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/${modelId}/promote`, { method: 'POST' })
  return _handleRes(res)
}

export async function fetchAuditLogs() {
  const res = await authFetch(`${API_BASE_URL}/api/v1/models/audit`)
  return _handleRes(res)
}

export async function simulatePrediction(payload) {
  const res = await authFetch(`${API_BASE_URL}/api/v1/predictions/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return _handleRes(res)
}
