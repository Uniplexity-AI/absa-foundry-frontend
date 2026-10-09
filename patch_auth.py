import re

with open('src/stores/auth.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add the permissions mapping and state
imports_end = content.find('\nconst STORAGE_KEYS')
addition = '''
// Hardcoded fallback roles to permissions map to support Phase 2 RBAC
// without requiring immediate backend changes.
const DEFAULT_ROLE_PERMISSIONS = {
  ADMIN: {
    'crm': ['read', 'write', 'execute', 'approve', 'delete'],
    'etl-pipeline': ['read', 'write', 'execute', 'approve', 'delete'],
    'intelligence': ['read', 'write', 'execute', 'approve', 'delete'],
    'operations': ['read', 'write', 'execute', 'approve', 'delete'],
    'settings': ['read', 'write', 'execute', 'approve', 'delete']
  },
  RELATIONSHIP_MANAGER: {
    'crm': ['read', 'write'],
    'intelligence': ['read']
  },
  DATA_SCIENTIST: {
    'intelligence': ['read', 'write', 'execute'],
    'etl-pipeline': ['read']
  },
  OPERATIONS: {
    'operations': ['read', 'write'],
    'etl-pipeline': ['read', 'execute']
  }
}
'''
content = content[:imports_end] + addition + content[imports_end:]

# Add effectivePermissions to state
state_match = re.search(r'(state:\s*\(\)\s*=>\s*\(\{.*?roles:\s*\[\],.*?)(\n\s*branchCode:)', content, re.DOTALL)
if state_match:
    content = content[:state_match.end(1)] + "\n    effectivePermissions: {}," + content[state_match.start(2):]

# Add hasPermission getter/action
getters_match = re.search(r'(getters:\s*\{)', content)
if getters_match:
    getter_addition = '''
    hasPermission: (state) => (entity, action) => {
      // 1. If backend gave us granular permissions, use them
      if (state.effectivePermissions && state.effectivePermissions[entity]) {
        return state.effectivePermissions[entity].includes(action)
      }
      
      // 2. Fallback to our local role-based map
      for (const role of state.roles) {
        const rolePerms = DEFAULT_ROLE_PERMISSIONS[role]
        if (rolePerms && rolePerms[entity] && rolePerms[entity].includes(action)) {
          return true
        }
      }
      return false
    },'''
    content = content[:getters_match.end(1)] + getter_addition + content[getters_match.end(1):]

with open('src/stores/auth.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated auth store with permissions logic.")
