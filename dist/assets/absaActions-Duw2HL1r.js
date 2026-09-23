import { P as API_BASE_URL } from './index-CJBj3n9Z.js';

const LOG_KEY = "absa_pilot_action_log";
const STATE_KEY = "absa_pilot_action_state";
const ACTIONS_ENDPOINT = `${API_BASE_URL}/api/v1/pilot/actions`;
const SYNC_ENABLED = String("").trim().toLowerCase() !== "false";
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
function authHeaders() {
  const h = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}
function syncPost(path, payload) {
  if (!SYNC_ENABLED) return;
  fetch(`${ACTIONS_ENDPOINT}${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload)
  }).catch(() => {
  });
}
function getActionLog() {
  return read(LOG_KEY, []);
}
function recordAction(entry) {
  const log = read(LOG_KEY, []);
  const item = {
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    at: (/* @__PURE__ */ new Date()).toISOString(),
    actor: read("userName", null) || "RM",
    ...entry
  };
  log.unshift(item);
  write(LOG_KEY, log.slice(0, 100));
  if (item.type && item.customerId) {
    syncPost("/log", {
      customer_id: item.customerId,
      action_type: item.type,
      detail: item.detail || "",
      meta: item.meta || {},
      actor: item.actor
    });
  }
  return item;
}
function getActionState() {
  return read(STATE_KEY, {});
}
function setCustomerState(customerId, patch) {
  const state = read(STATE_KEY, {});
  state[customerId] = { ...state[customerId] || {}, ...patch };
  write(STATE_KEY, state);
  syncPost(`/state/${encodeURIComponent(customerId)}`, { patch: state[customerId] });
  return state[customerId];
}
function getCustomerState(customerId) {
  return read(STATE_KEY, {})[customerId] || {};
}
function assignRm(customerId, rmName, contacted = false) {
  const state = setCustomerState(customerId, { rm: rmName, assignedAt: (/* @__PURE__ */ new Date()).toISOString() });
  recordAction({
    type: contacted ? "RM_CONTACTED" : "RM_ASSIGNED",
    customerId,
    detail: contacted ? `Contacted ${rmName}` : `Assigned RM: ${rmName}`,
    meta: { rm: rmName }
  });
  return state;
}
function enrolCustomer(customerId, campaignName) {
  const existing = read(STATE_KEY, {})[customerId] || {};
  const campaigns = new Set(existing.campaigns || []);
  campaigns.add(campaignName);
  const state = setCustomerState(customerId, { campaigns: Array.from(campaigns) });
  recordAction({
    type: "CAMPAIGN_ENROLLED",
    customerId,
    detail: `Enrolled in ${campaignName}`,
    meta: { campaign: campaignName }
  });
  return state;
}
function acknowledgeAlert(customerId, alertId) {
  const existing = read(STATE_KEY, {})[customerId] || {};
  const acked = new Set(existing.ackedAlerts || []);
  acked.add(alertId);
  const state = setCustomerState(customerId, { ackedAlerts: Array.from(acked) });
  recordAction({
    type: "ALERT_ACKNOWLEDGED",
    customerId,
    detail: `Acknowledged alert ${alertId}`
  });
  return state;
}
function isAlertAcked(customerId, alertId) {
  const st = read(STATE_KEY, {})[customerId] || {};
  return (st.ackedAlerts || []).includes(alertId);
}
function overrideRecommendation(customerId, fromOffer, toOffer, reason) {
  const state = setCustomerState(customerId, {
    override: { fromOffer, toOffer, reason, at: (/* @__PURE__ */ new Date()).toISOString() }
  });
  recordAction({
    type: "NBA_OVERRIDE",
    customerId,
    detail: `Override: ${fromOffer} → ${toOffer}`,
    meta: { reason }
  });
  return state;
}
function getOverride(customerId) {
  return read(STATE_KEY, {})[customerId]?.override || null;
}
function recordExecuted(customerIds, campaignName) {
  const ids = Array.isArray(customerIds) ? customerIds : [customerIds];
  ids.forEach((id) => enrolCustomer(id, campaignName));
  recordAction({
    type: "CAMPAIGN_LAUNCHED",
    customerId: ids.length === 1 ? ids[0] : void 0,
    detail: `Launched ${campaignName} for ${ids.length} customer${ids.length === 1 ? "" : "s"}`,
    meta: { campaign: campaignName, count: ids.length }
  });
}
async function hydrateStateFromServer(customerId) {
  if (!SYNC_ENABLED || !customerId) return null;
  try {
    const res = await fetch(`${ACTIONS_ENDPOINT}/state/${encodeURIComponent(customerId)}`, {
      headers: authHeaders()
    });
    if (!res.ok) return null;
    const data = await res.json();
    const serverState = data && data.state || {};
    if (!Object.keys(serverState).length) return null;
    const state = read(STATE_KEY, {});
    state[customerId] = { ...serverState || {}, ...state[customerId] || {} };
    write(STATE_KEY, state);
    return state[customerId];
  } catch {
    return null;
  }
}
async function hydrateLogFromServer(limit = 50) {
  if (!SYNC_ENABLED) return getActionLog();
  try {
    const res = await fetch(`${ACTIONS_ENDPOINT}?limit=${limit}`, { headers: authHeaders() });
    if (!res.ok) return getActionLog();
    const rows = await res.json();
    if (!Array.isArray(rows) || !rows.length) return getActionLog();
    const log = read(LOG_KEY, []);
    const seen = new Set(log.map((l) => l.serverId || l.id));
    const serverEntries = rows.filter((r) => !seen.has(r.id)).map((r) => ({
      serverId: r.id,
      type: r.action_type,
      customerId: r.customer_id,
      detail: r.detail || "",
      meta: r.meta || {},
      actor: r.actor || "RM",
      at: r.created_at || (/* @__PURE__ */ new Date()).toISOString()
    }));
    if (serverEntries.length) {
      write(LOG_KEY, [...serverEntries, ...log].slice(0, 100));
    }
    return read(LOG_KEY, []);
  } catch {
    return getActionLog();
  }
}
function planKey(customerId) {
  return `action_plans_${customerId}`;
}
function actionKey(customerId) {
  return `actions_taken_${customerId}`;
}
async function fetchCustomerServerActions(customerId) {
  if (!SYNC_ENABLED || !customerId) return [];
  try {
    const res = await fetch(
      `${ACTIONS_ENDPOINT}?customer_id=${encodeURIComponent(customerId)}&limit=200`,
      { headers: authHeaders() }
    );
    if (!res.ok) return [];
    const rows = await res.json();
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}
function mergeServerForms(localList, serverRows, targetType) {
  const seen = new Set((localList || []).map((x) => x.client_id).filter(Boolean));
  const fresh = serverRows.filter((r) => r.action_type === targetType && r.meta && typeof r.meta === "object").map((r) => ({ ...r.meta || {}, server_id: r.id, client_id: r.meta.client_id || `srv_${r.id}` })).filter((x) => x.client_id && !seen.has(x.client_id));
  return fresh.length ? [...localList || [], ...fresh] : localList || [];
}
function getLocalActionPlans(customerId) {
  return read(planKey(customerId), []);
}
function saveActionPlan(customerId, plan) {
  const entry = {
    ...plan || {},
    customer_id: customerId,
    client_id: `plan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const plans = getLocalActionPlans(customerId);
  plans.push(entry);
  write(planKey(customerId), plans);
  recordAction({
    type: "ACTION_PLAN_CREATED",
    customerId,
    detail: `Created action plan: ${entry.title || "Untitled plan"}`,
    meta: entry
  });
  return plans;
}
async function hydrateActionPlansFromServer(customerId) {
  const rows = await fetchCustomerServerActions(customerId);
  if (!rows.length) return getLocalActionPlans(customerId);
  const plans = mergeServerForms(getLocalActionPlans(customerId), rows, "ACTION_PLAN_CREATED");
  write(planKey(customerId), plans);
  return plans;
}
function getLocalActionsTaken(customerId) {
  return read(actionKey(customerId), []);
}
function saveActionTaken(customerId, action) {
  const entry = {
    ...action || {},
    customer_id: customerId,
    client_id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const list = getLocalActionsTaken(customerId);
  list.push(entry);
  write(actionKey(customerId), list);
  recordAction({
    type: "ACTION_RECORDED",
    customerId,
    detail: `Recorded action via ${entry.channel || "unknown"} (${entry.outcome || "PENDING"})`,
    meta: entry
  });
  return list;
}
async function hydrateActionsTakenFromServer(customerId) {
  const rows = await fetchCustomerServerActions(customerId);
  if (!rows.length) return getLocalActionsTaken(customerId);
  const list = mergeServerForms(getLocalActionsTaken(customerId), rows, "ACTION_RECORDED");
  write(actionKey(customerId), list);
  return list;
}

export { acknowledgeAlert as a, getCustomerState as b, hydrateStateFromServer as c, getOverride as d, hydrateActionPlansFromServer as e, hydrateActionsTakenFromServer as f, getActionLog as g, hydrateLogFromServer as h, isAlertAcked as i, saveActionTaken as j, getActionState as k, enrolCustomer as l, assignRm as m, recordExecuted as n, overrideRecommendation as o, recordAction as r, saveActionPlan as s };
