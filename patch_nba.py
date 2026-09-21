import re

with open('src/components/intelligence/AiNbaPanel.vue', 'r', encoding='cp1252') as f:
    content = f.read()

target = """const nba = computed(() => {
  // Wire to backend later - for now derive from churnProb
  if (props.nbaOverride) return props.nbaOverride
  const p = props.churnProb || 0
  const isCritical = p > 0.7
  const isHigh     = p > 0.45
  return {
    urgency:   isCritical ? 'CRITICAL' : isHigh ? 'HIGH' : 'MODERATE',
    churnWindow: isCritical ? '48 hours' : '14 days',
    action: isCritical
      ? 'Immediate RM Courtesy Call + Fee Waiver Offer'
      : 'Enrol in Digital Reactivation Campaign',
    actionDetail: isCritical
      ? 'Senior RM to contact customer directly. Model recommends a 3-month fee waiver on the primary account to reduce exit intent.'
      : 'AI identified 3 personalised SMS touchpoints over 14 days targeting digital channel re-engagement.',
    actionIcon: isCritical ? 'call' : 'campaign',
    shapDrivers: [
      { feature: 'Digital Login Frequency', contribution: 38, direction: 'risk',       desc: '0 app/web logins in 45+ days - top churn predictor' },
      { feature: 'Transaction Velocity',    contribution: 27, direction: 'risk',       desc: 'Monthly txn volume down 62% vs 90-day avg' },
      { feature: 'Account Tenure',          contribution: 15, direction: 'protective', desc: '7+ year relationship - reduces exit probability' },
    ],
    aumAtRisk:              'K 450,000',
    postInterventionChurn:  Math.max(8, Math.round(churnProbPct.value * 0.25)),
    clvPreserved:           'K 312,000',
    confidence:             84,
  }
})"""

replacement = """const nba = computed(() => {
  if (!props.nbaOverride) {
    return {
      urgency: 'MODERATE',
      churnWindow: '-',
      action: 'Evaluating Next Best Action...',
      actionDetail: 'Awaiting AI decision engine response.',
      actionIcon: 'sync',
      shapDrivers: [],
      aumAtRisk: '-',
      postInterventionChurn: '-',
      clvPreserved: '-',
      confidence: 0,
    }
  }

  const ov = props.nbaOverride;
  const mappedDrivers = (ov.reason_codes || []).map((code, idx) => ({
    feature: `Factor ${idx + 1}`,
    contribution: Math.round(100 / (ov.reason_codes.length || 1)),
    direction: 'risk',
    desc: code
  }));

  return {
    urgency: ov.priority_score > 80 ? 'CRITICAL' : (ov.priority_score > 50 ? 'HIGH' : 'MODERATE'),
    churnWindow: 'Immediate',
    action: ov.next_best_action || 'No Action Recommended',
    actionDetail: ov.explanation || '',
    actionIcon: (ov.channel || '').toLowerCase().includes('digital') ? 'campaign' : 'call',
    shapDrivers: mappedDrivers,
    aumAtRisk: `ZMW ${ov.estimated_revenue ? ov.estimated_revenue.toLocaleString() : '0'}`,
    postInterventionChurn: ov.estimated_churn_reduction ? Math.max(0, churnProbPct.value - Math.round(ov.estimated_churn_reduction * 100)) : churnProbPct.value,
    clvPreserved: `ZMW ${ov.estimated_revenue ? ov.estimated_revenue.toLocaleString() : '0'}`,
    confidence: ov.confidence ? Math.round(ov.confidence * 100) : 0,
  }
})"""

content = content.replace(target, replacement)

with open('src/components/intelligence/AiNbaPanel.vue', 'w', encoding='cp1252') as f:
    f.write(content)

print("Removed dummy data from AiNbaPanel.vue")
