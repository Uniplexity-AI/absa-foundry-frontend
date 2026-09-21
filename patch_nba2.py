import re

with open('src/components/intelligence/AiNbaPanel.vue', 'r', encoding='cp1252') as f:
    content = f.read()

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
})

const urgencyBadgeClass"""

# Replace everything from `const nba = computed(() => {` up to `const urgencyBadgeClass`
new_content = re.sub(
    r'const nba = computed\(\(\) => \{.*?const urgencyBadgeClass',
    replacement,
    content,
    flags=re.DOTALL
)

with open('src/components/intelligence/AiNbaPanel.vue', 'w', encoding='cp1252') as f:
    f.write(new_content)

if content != new_content:
    print("SUCCESS")
else:
    print("NO MATCH FOUND")
