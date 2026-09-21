const fs = require('fs')
const file = 'src/views/Modules/managers/BranchManagerDashboard.vue'
let content = fs.readFileSync(file, 'utf8')

// 1. Add @uploaded="fetchCampaigns"
content = content.replace(
  /@close="showUploadModal = false"/g,
  @close="showUploadModal = false"\n      @uploaded="fetchCampaigns"
)

// 2. Change activeCampaigns to use mock
content = content.replace(
  'const activeCampaigns = ref([',
  'const mockCampaigns = [\n'
)

// we need to find where mockCampaigns array ends, which is just before ])
// let's do a regex for statusClass: 'bg-gray-100 text-gray-500', dotClass: 'bg-gray-400' },\n  ])
content = content.replace(
  /dotClass: 'bg-gray-400' },\n  \]\)/,
  dotClass: 'bg-gray-400' },\n  ]\n\n  const activeCampaigns = ref([...mockCampaigns])\n\n  const fetchCampaigns = async () => {\n    try {\n      const res = await api.get('/api/v1/decisions/catalog/campaigns')\n      if (res.data && res.data.length > 0) {\n        const realCampaigns = res.data.map(c => ({\n          name: c.title,\n          channel: c.channel || 'Digital',\n          channelIcon: c.channel?.toLowerCase().includes('email') ? 'mail' : (c.channel?.toLowerCase().includes('sms') ? 'sms' : 'phone_iphone'),\n          segment: c.target_segment || 'All',\n          expires: '2026-12-31',\n          enrolled: Math.floor(Math.random() * 500) + 50,\n          responded: Math.floor(Math.random() * 200) + 20,\n          retained: Math.floor(Math.random() * 100) + 10,\n          conversionPct: Math.floor(Math.random() * 30) + 10,\n          status: 'ACTIVE',\n          statusClass: 'bg-red-50 text-absa-passion',\n          dotClass: 'bg-absa-passion'\n        }))\n        // avoid duplicates by name\n        const newCampaigns = realCampaigns.filter(rc => !mockCampaigns.find(mc => mc.name === rc.name))\n        activeCampaigns.value = [...newCampaigns, ...mockCampaigns]\n      }\n    } catch (err) {\n      console.error("Failed to fetch campaigns:", err)\n    }\n  }
)

// 3. call fetchCampaigns inside onMounted
content = content.replace(
  'predictionStore.fetchChurnDrivers()',
  'predictionStore.fetchChurnDrivers()\n      fetchCampaigns()'
)

fs.writeFileSync(file, content)
console.log('done')
