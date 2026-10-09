import re

with open("src/stores/auth.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the hasPermission getter
old_has_perm = r"hasPermission: \(state\) => \(entity, action\) => \{[\s\S]*?return false\n\s*\},"

new_has_perm = """hasPermission: (state) => (entity, action) => {
      // 1. If backend gave us granular permissions, use them
      if (state.effectivePermissions && state.effectivePermissions[entity]) {
        return state.effectivePermissions[entity].includes(action)
      }
      
      // 2. Check Robust Local Simulation overrides (mock_absa_roles)
      let localRoles = []
      try {
        localRoles = JSON.parse(localStorage.getItem('mock_absa_roles') || '[]')
      } catch (e) {}

      for (const role of state.roles) {
        // Try local overrides first
        const customRole = localRoles.find(r => r.name === role || r.id === role)
        if (customRole && customRole.permissions && customRole.permissions[entity] && customRole.permissions[entity].includes(action)) {
          return true
        }

        // 3. Fallback to our local default role-based map
        const rolePerms = DEFAULT_ROLE_PERMISSIONS[role]
        if (rolePerms && rolePerms[entity] && rolePerms[entity].includes(action)) {
          return true
        }
      }
      return false
    },"""

content = re.sub(old_has_perm, new_has_perm, content)

with open("src/stores/auth.js", "w", encoding="utf-8") as f:
    f.write(content)
