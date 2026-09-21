import re

with open('src/stores/customerStore.js', 'r') as f:
    content = f.read()

# Match 1: variables
content = content.replace(
    'const features = ref(null)',
    'const features = ref(null)\n  const currentNba = ref(null)\n  const loadingNba = ref(false)'
)

# Match 2: action function
action_str = """
  async function fetchNextBestAction(id) {
    loadingNba.value = true
    currentNba.value = null
    try {
      // NOTE: Using the gateway/proxy base or full URL depending on how api.get resolves.
      // Assuming decisions route is proxied like customers.
      const { data } = await api.get(`/api/v1/decisions/${id}/nba`)
      currentNba.value = data || null
    } catch (e) {
      console.warn('fetchNextBestAction failed:', e.message)
      currentNba.value = null
    } finally {
      loadingNba.value = false
    }
  }

  function setFilter(key, value) {"""
content = content.replace('  function setFilter(key, value) {', action_str.strip('\n'))

# Match 3: returns
content = content.replace(
    'features,\n    portfolio,',
    'features,\n    currentNba,\n    loadingNba,\n    portfolio,'
)
content = content.replace(
    'fetchCustomerFeatures,\n    setFilter,',
    'fetchCustomerFeatures,\n    fetchNextBestAction,\n    setFilter,'
)

with open('src/stores/customerStore.js', 'w') as f:
    f.write(content)
print("Patched customerStore.js")
