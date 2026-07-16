// import store from '@/store'  // ✅ Import Vuex store
import axios from 'axios'
import store from '@/store/store'
import { logAuditEvent } from './audit_log';


import { API_BASE_URL } from './api';

const API_URL = `${API_BASE_URL}/auth`

export default {

  async updateUserRole(role) {
    try {
      const email = localStorage.getItem('userEmail'); // ✅ Get email

      if (!email) {
        throw new Error('User email not found. Please log in.');
      }

      const response = await axios.put(`${API_URL}/update-role`, { email, role });
      // Audit log for permission/role change
      logAuditEvent('update_role', { email, role });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to update role');
    }
  },

  //   async updateUserRole(selectedType) {
  //     const email = store.getters.getUserEmail  // ✅ Get email from Vuex

  //     if (!email) {
  //       throw new Error('User email not found. Please log in.')
  //     }

  //     try {
  //       const response = await axios.put(`${API_URL}/update-role`, {
  //         email,   // ✅ Send email with request
  //         role: selectedType
  //       })
  //       return response.data
  //     } catch (error) {
  //       throw new Error(error.response?.data?.detail || 'Role update failed')
  //     }
  //   },


  getUserEmail() {
    return localStorage.getItem('userEmail'); // Get email from storage
  },

  logout() {
    localStorage.removeItem('userEmail'); // Clear email on logout
  },

};







// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000';

// export default {
//   async updateUserRole(role) {
//     try {
//       const token = localStorage.getItem('token');  // Ensure token is stored properly
//       if (!token) throw new Error("No token found, please log in");

//       const response = await axios.put(
//         `${API_URL}/auth/update-role`,
//         { role },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       return response.data;  // Ensure backend returns a proper success response
//     } catch (error) {
//       console.error("Error updating role:", error.response?.data || error.message);
//       throw error;
//     }
//   }
// };
