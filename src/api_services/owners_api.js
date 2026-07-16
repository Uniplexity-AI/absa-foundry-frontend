import axios from 'axios'
//const BASE_URL = 'http://localhost:8000'
import { API_BASE_URL as BASE_URL } from './api'
export default BASE_URL;

export async function getUsers(tenant_id) {
  const config = tenant_id ? { params: { tenant_id } } : {};
  const res = await axios.get(`${BASE_URL}/users/`, config)
  return res.data
}

export async function createUser(data, tenant_id) {
  const res = await axios.post(`${BASE_URL}/users/`, data, {
    params: { tenant_id }
  })
  return res.data
}

export async function updateUser(user_id, data, tenant_id) {
  const res = await axios.put(`${BASE_URL}/users/${user_id}`, data, {
    params: { tenant_id }
  })
  return res.data
}

export async function deleteUser(user_id, tenant_id) {
  const res = await axios.delete(`${BASE_URL}/users/${user_id}`, {
    params: { tenant_id }
  })
  return res.data
}
// Grant admin-module access to an existing user (adds 'admin' to modules and optionally sets role to 'admin')
export async function grantAdmin(user_id, make_role = false, tenant_id) {
  // The backend endpoint expects a PATCH to /users/{user_id}/grant-admin and an optional query param make_role=true
  const res = await axios.patch(`${BASE_URL}/superadmin/users/${user_id}/grant-admin`, null, {
    params: Object.assign({}, tenant_id ? { tenant_id } : {}, { make_role })
  })
  return res.data
}

export async function getSubAccounts(tenant_id) {
  const config = tenant_id ? { params: { tenant_id } } : {};
  const res = await axios.get(`${BASE_URL}/subaccounts/`, config)
  return res.data
}

