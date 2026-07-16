// Shared mapping of frontend module ids -> backend canonical ids
// Standardized IDs (hrmodule, users, allshops, finance, etc) match both ends.
// This map primarily handles aliases or multi-card mappings.
export const MODULE_ID_MAP = {
  // Alias : Backend Canonical ID
  'hr-dashboard': 'hrmodule',
  'hr': 'hrmodule',

  // Backward compatibility / UI Aliases
  'project_mgmt': 'project-management',
  'finance_dash': 'finance',
  'delivery': 'delivery-tickets',
  'delivery-ticket': 'delivery-tickets',
  'assets': 'assets-manager',
  'hotel': 'hotel-manager',
  'minetech': 'minetech-hub',
  'minetechhub': 'minetech-hub',
  'mine-tech': 'minetech-hub',
  'strategy': 'strategic-management',
  'education': 'edu-manager',
  'edu': 'edu-manager',
  'ai_agent': 'ai',
  'sub_accounts': 'allshops',
  'user_mgmt': 'allshops',
  'users': 'allshops',

  // Mining/Legacy
  'mining-image-capture': 'image-capture',
  'mining_image_capture': 'image-capture',
  'mining': 'image-capture',
  'miningimagecapture': 'image-capture',
  'image-capture': 'image-capture',
  'text-scanner': 'image-capture',
  'text_scanner': 'image-capture',

  // Tender Management
  'tender': 'tender-management',
  'tenders': 'tender-management',

  // Marketplace
  'market': 'marketplace',
  'market-place': 'marketplace'
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
