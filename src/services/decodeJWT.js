import { jwtDecode } from 'jwt-decode'
import { DEV_AUTH_PAYLOAD, DEV_BYPASS, ensureDevAuthSession } from '@/config/devFlags.js'

// Helper to safely get router only when available
let routerInstance = null;

export function setRouter(router) {
  routerInstance = router;
}

export function decodeJWT() {
  const getToken = () => localStorage.getItem('token')

  const decodeToken = () => {
    try {
      if (DEV_BYPASS) {
        ensureDevAuthSession()
      }

      const token = getToken()
      if (!token) return DEV_BYPASS ? DEV_AUTH_PAYLOAD : null

      const decoded = jwtDecode(token)
      const now = Math.floor(Date.now() / 1000)
      if (decoded.exp < now) {
        if (DEV_BYPASS) return DEV_AUTH_PAYLOAD
        console.warn('Token expired')
        logout()
        return null
      }

      return decoded
    } catch (err) {
      if (DEV_BYPASS) return DEV_AUTH_PAYLOAD
      console.error('Token decoding error:', err)
      logout()
      return null
    }
  }



  const getUserRole = () => {
    const decoded = decodeToken()
    return decoded?.role || null
  }

  const getUserEmail = () => {
    const decoded = decodeToken()
    return decoded?.email || null
  }

  const getUserName = () => {
    const decoded = decodeToken()
    return decoded?.name || null
  }


  const getUserId = () => {
    const decoded = decodeToken()
    return decoded?.id || decoded?.user_id || decoded?.sub || null
  }

  

  const logout = async () => {
    // Revoke token on backend before clearing locally
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
      } catch (e) {
        console.warn('Backend logout failed, clearing locally', e)
      }
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    localStorage.removeItem('branches')
    localStorage.removeItem('selected_branch')

    // Use router instance if set, otherwise fallback
    if (routerInstance) {
      routerInstance.push('/login')
    } else {
      // Fallback to direct navigation
      window.location.href = '/login'
    }
  }

  // Branch management functions
  const setBranches = (branches) => {
    try {
      localStorage.setItem('branches', JSON.stringify(branches || []))
    } catch (e) {
      console.error('Error storing branches:', e)
    }
  }

  const getBranches = () => {
    try {
      const branches = localStorage.getItem('branches')
      return branches ? JSON.parse(branches) : []
    } catch (e) {
      console.error('Error getting branches:', e)
      return []
    }
  }

  const setSelectedBranch = (branch) => {
    try {
      localStorage.setItem('selected_branch', branch ? JSON.stringify(branch) : '')
    } catch (e) {
      console.error('Error storing selected branch:', e)
    }
  }

  const getSelectedBranch = () => {
    try {
      const branch = localStorage.getItem('selected_branch')
      return branch ? JSON.parse(branch) : null
    } catch (e) {
      console.error('Error getting selected branch:', e)
      return null
    }
  }

  const getBranchName = (branchId) => {
    const id = typeof branchId === 'object' ? (branchId?._id || branchId?.id) : branchId
    if (!id) return 'All Branches'
    const branches = getBranches()
    const branch = branches.find(b => b._id === id || b.id === id)
    return branch ? branch.name : 'Unknown Branch'
  }

  const getBranchId = () => {
    const decoded = decodeToken()
    return decoded?.branch_id || decoded?.station_id || null
  }

  return {
    getToken,
    decodeToken,
    getUserRole,
    getUserEmail,
    getUserName,
    getUserId,
    getBranchId,
    logout,
    setBranches,
    getBranches,
    setSelectedBranch,
    getSelectedBranch,
    getBranchName
  }
}
