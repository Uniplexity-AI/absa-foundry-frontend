with open('src/services/auth_api.js', 'r', encoding='utf-8') as f:
    content = f.read()

branch_methods = '''

  async listBranches() {
    const { data } = await apiClient.get('/admin/branches')
    return data
  },

  async createBranch(payload) {
    const { data } = await apiClient.post('/admin/branches', payload)
    return data
  },

  async updateBranch(branchCode, payload) {
    const { data } = await apiClient.patch('/admin/branches/' + branchCode, payload)
    return data
  },

  async deleteBranch(branchCode) {
    const { data } = await apiClient.delete('/admin/branches/' + branchCode)
    return data
  },
'''

content = content.replace(
    'async createRole(payload) {\n    const { data } = await apiClient.post(\'/admin/roles\', payload)\n    return data\n  },',
    'async createRole(payload) {\n    const { data } = await apiClient.post(\'/admin/roles\', payload)\n    return data\n  },' + branch_methods
)

with open('src/services/auth_api.js', 'w', encoding='utf-8') as f:
    f.write(content)

