// Shared mapping of frontend module ids -> backend canonical ids
// This map only handles aliases used by the ABSA lifecycle application.
export const MODULE_ID_MAP = {
  // Alias : Backend Canonical ID
 
  'ai_agent': 'ai',
  'sub_accounts': 'subaccounts',
  'user_mgmt': 'subaccounts',
  'users': 'subaccounts',


};

export function mapFrontendToBackend(id) {
  if (!id) return id;
  const key = id.toString().toLowerCase();
  if (MODULE_ID_MAP[key]) return MODULE_ID_MAP[key];
  return id;
}

/**
 * Maps a backend ID back to all possible frontend IDs.
 * Returns an array because one backend module might support multiple frontend cards/routes.
 * @param {string} id - Backend module ID
 * @returns {string[]} - Array of matching frontend IDs
 */
export function mapBackendToFrontend(id) {
  if (!id) return [];
  const key = id.toString().toLowerCase();

  const matches = Object.keys(MODULE_ID_MAP).filter(k => MODULE_ID_MAP[k] === key);

  // Always include the original ID itself, plus any aliases that map to it
  const result = new Set([key, ...matches]);
  return [...result];
}
