import re

file_path = r"c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\services\modelManagementApi.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_api = """
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
"""

content = content.replace("export async function submitCalibrationProposal(modelId, threshold, metrics) {", new_api.strip() + "\n")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
