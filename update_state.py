import os

path = r'src/views/Modules/managers/BranchManagerDashboard.vue'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

script_to_add = '''const activeProducts = ref([])

const fetchProducts = async () => {
  try {
    const res = await api.get('/api/v1/decisions/catalog/products')
    if (res.data && res.data.length > 0) {
      activeProducts.value = res.data.map(p => ({
        id: p.id,
        name: p.title,
        description: p.description,
        segment: p.target_segment || 'All'
      }))
    }
  } catch (err) {
    console.error("Failed to fetch products:", err)
  }
}

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return
  try {
    await api.delete(/api/v1/decisions/catalog/products/)
    await fetchProducts()
  } catch (err) {
    console.error("Failed to delete product:", err)
  }
}
'''

content = content.replace(
    'const activeCampaigns = ref([])',
    script_to_add + '\nconst activeCampaigns = ref([])'
)

content = content.replace(
    'fetchCampaigns()',
    'fetchCampaigns()\n    fetchProducts()'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated state for products')
