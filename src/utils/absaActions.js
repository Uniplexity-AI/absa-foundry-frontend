// ─────────────────────────────────────────────────────────────────────────────
// ABSA pilot action log — localStorage-first, with server write-through.
//
// Every action button (assign RM, enrol campaign, acknowledge alert, override
// NBA, launch campaign, save action plan, record action) updates localStorage
// instantly (so the UI + reads stay synchronous and work offline) AND posts to
// the gateway so the action is persisted in the pilot backend (etl_clean):
//
//   POST /api/v1/pilot/actions/log           — append action-log row
//   POST /api/v1/pilot/actions/state/{id}    — merge per-customer state
//
// If the backend is unreachable, the local store is still fully functional
// (the pre-pilot behaviour). Call sites never change.
// ─────────────────────────────────────────────────────────────────────────────
import { API_BASE_URL } from '@/services/api'

const LOG_KEY = 'absa_pilot_action_log'
const STATE_KEY = 'absa_pilot_action_state'
const ACTIONS_ENDPOINT = `${API_BASE_URL}/api/v1/pilot/actions`

// Server write-through is ON by default (silent + non-blocking; failures fall
// back to the local store). Set VITE_PILOT_SYNC=false for purely-local dev.
const SYNC_ENABLED = String(import.meta.env.VITE_PILOT_SYNC || '').trim().toLowerCase() !== 'false'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full/blocked — ignore in PoC */
  }
}

function authHeaders() {
  const h = { 'Content-Type': 'application/json' }
  const token = localStorage.getItem('token')
  if (token) h.Authorization = `Bearer ${token}`
  return h
}

/**
 * Fire-and-forget POST to the pilot-action gateway endpoints.
 * Never throws — failures keep the local store authoritative.
 */
function syncPost(path, payload) {
  if (!SYNC_ENABLED) return
  fetch(`${ACTIONS_ENDPOINT}${path}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  }).catch(() => { /* offline — local store remains source of truth */ })
}

/** Read the full recent-activity log (most recent first). */
export function getActionLog() {
  return read(LOG_KEY, [])
}

/**
 * Record an action. Returns the created entry.
 * @param {object} entry { type, customerId?, customerName?, detail, meta? }
 */
export function recordAction(entry) {
  const log = read(LOG_KEY, [])
  const item = {
    id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    actor: read('userName', null) || 'RM',
    ...entry,
  }
  log.unshift(item)
  write(LOG_KEY, log.slice(0, 100))
  // Server write-through — append to the shared action log in etl_clean.
  if (item.type && item.customerId) {
    syncPost('/log', {
      customer_id: item.customerId,
      action_type: item.type,
      detail: item.detail || '',
      meta: item.meta || {},
      actor: item.actor,
    })
  }
  return item
}

/** All persisted mutable state (per-customer). */
export function getActionState() {
  return read(STATE_KEY, {})
}

function setCustomerState(customerId, patch) {
  const state = read(STATE_KEY, {})
  state[customerId] = { ...(state[customerId] || {}), ...patch }
  write(STATE_KEY, state)
  // Server write-through — merge this customer's whole blob into etl_clean.
  syncPost(`/state/${encodeURIComponent(customerId)}`, { patch: state[customerId] })
  return state[customerId]
}

export function getCustomerState(customerId) {
  return read(STATE_KEY, {})[customerId] || {}
}

/** Assign an RM (or mark contact made) for a customer. */
export function assignRm(customerId, rmName, contacted = false) {
  const state = setCustomerState(customerId, { rm: rmName, assignedAt: new Date().toISOString() })
  recordAction({
    type: contacted ? 'RM_CONTACTED' : 'RM_ASSIGNED',
    customerId,
    detail: contacted ? `Contacted ${rmName}` : `Assigned RM: ${rmName}`,
    meta: { rm: rmName },
  })
  return state
}

/** Enrol one customer into a campaign. */
export function enrolCustomer(customerId, campaignName) {
  const existing = read(STATE_KEY, {})[customerId] || {}
  const campaigns = new Set(existing.campaigns || [])
  campaigns.add(campaignName)
  const state = setCustomerState(customerId, { campaigns: Array.from(campaigns) })
  recordAction({
    type: 'CAMPAIGN_ENROLLED',
    customerId,
    detail: `Enrolled in ${campaignName}`,
    meta: { campaign: campaignName },
  })
  return state
}

/** Acknowledge an alert for a customer by alert id. */
export function acknowledgeAlert(customerId, alertId) {
  const existing = read(STATE_KEY, {})[customerId] || {}
  const acked = new Set(existing.ackedAlerts || [])
  acked.add(alertId)
  const state = setCustomerState(customerId, { ackedAlerts: Array.from(acked) })
  recordAction({
    type: 'ALERT_ACKNOWLEDGED',
    customerId,
    detail: `Acknowledged alert ${alertId}`,
  })
  return state
}

export function isAlertAcked(customerId, alertId) {
  const st = read(STATE_KEY, {})[customerId] || {}
  return (st.ackedAlerts || []).includes(alertId)
}

/** Persist an override of the NBA recommendation for a customer. */
export function overrideRecommendation(customerId, fromOffer, toOffer, reason) {
  const state = setCustomerState(customerId, {
    override: { fromOffer, toOffer, reason, at: new Date().toISOString() },
  })
  recordAction({
    type: 'NBA_OVERRIDE',
    customerId,
    detail: `Override: ${fromOffer} → ${toOffer}`,
    meta: { reason },
  })
  return state
}

export function getOverride(customerId) {
  return read(STATE_KEY, {})[customerId]?.override || null
}

/** Mark an intervention/campaign as executed/launched. */
export function recordExecuted(customerIds, campaignName) {
  const ids = Array.isArray(customerIds) ? customerIds : [customerIds]
  ids.forEach((id) => enrolCustomer(id, campaignName))
  recordAction({
    type: 'CAMPAIGN_LAUNCHED',
    customerId: ids.length === 1 ? ids[0] : undefined,
    detail: `Launched ${campaignName} for ${ids.length} customer${ids.length === 1 ? '' : 's'}`,
    meta: { campaign: campaignName, count: ids.length },
  })
}

// ── Server rehydration ───────────────────────────────────────────────────────
// Pull the server's per-customer state for a customer and merge it into the
// local store, so state persisted by another pilot viewer (or another browser)
// is reflected on load. Resolves to the merged local blob (or null on failure).
export async function hydrateStateFromServer(customerId) {
  if (!SYNC_ENABLED || !customerId) return null
  try {
    const res = await fetch(`${ACTIONS_ENDPOINT}/state/${encodeURIComponent(customerId)}`, {
      headers: authHeaders(),
    })
    if (!res.ok) return null
    const data = await res.json()
    const serverState = (data && data.state) || {}
    if (!Object.keys(serverState).length) return null
    const state = read(STATE_KEY, {})
    state[customerId] = { ...(serverState || {}), ...(state[customerId] || {}) }
    write(STATE_KEY, state)
    return state[customerId]
  } catch {
    return null
  }
}

/** Pull the recent shared action log and merge server rows into the local log. */
export async function hydrateLogFromServer(limit = 50) {
  if (!SYNC_ENABLED) return getActionLog()
  try {
    const res = await fetch(`${ACTIONS_ENDPOINT}?limit=${limit}`, { headers: authHeaders() })
    if (!res.ok) return getActionLog()
    const rows = await res.json()
    if (!Array.isArray(rows) || !rows.length) return getActionLog()
    const log = read(LOG_KEY, [])
    const seen = new Set(log.map((l) => l.serverId || l.id))
    const serverEntries = rows
      .filter((r) => !seen.has(r.id))
      .map((r) => ({
        serverId: r.id,
        type: r.action_type,
        customerId: r.customer_id,
        detail: r.detail || '',
        meta: r.meta || {},
        actor: r.actor || 'RM',
        at: r.created_at || new Date().toISOString(),
      }))
    if (serverEntries.length) {
      write(LOG_KEY, [...serverEntries, ...log].slice(0, 100))
    }
    return read(LOG_KEY, [])
  } catch {
    return getActionLog()
  }
}

// ── Action plans & actions taken (full-form server rows) ────────────────────
// The Create Action Plan / Take Action pages persist their full forms. We keep
// the existing per-customer localStorage keys for instant reads + offline, and
// ALSO persist the full form to the server under ACTION_PLAN_CREATED /
// ACTION_RECORDED rows (meta = the whole form). Rehydrate helpers pull those
// rows back so plans/actions made on another machine/browser show up here.

function planKey(customerId) { return `action_plans_${customerId}` }
function actionKey(customerId) { return `actions_taken_${customerId}` }

/** GET server action-log rows for one customer (newest first). Never throws. */
async function fetchCustomerServerActions(customerId) {
  if (!SYNC_ENABLED || !customerId) return []
  try {
    const res = await fetch(
      `${ACTIONS_ENDPOINT}?customer_id=${encodeURIComponent(customerId)}&limit=200`,
      { headers: authHeaders() }
    )
    if (!res.ok) return []
    const rows = await res.json()
    return Array.isArray(rows) ? rows : []
  } catch {
    return []
  }
}

/** Merge full forms extracted from server rows into a local list, deduped by client id. */
function mergeServerForms(localList, serverRows, targetType) {
  const seen = new Set((localList || []).map((x) => x.client_id).filter(Boolean))
  const fresh = serverRows
    .filter((r) => r.action_type === targetType && r.meta && typeof r.meta === 'object')
    .map((r) => ({ ...(r.meta || {}), server_id: r.id, client_id: r.meta.client_id || `srv_${r.id}` }))
    .filter((x) => x.client_id && !seen.has(x.client_id))
  return fresh.length ? [...(localList || []), ...fresh] : (localList || [])
}

// ---- Action plans ----

/** Read saved action plans for a customer from localStorage (synchronous). */
export function getLocalActionPlans(customerId) {
  return read(planKey(customerId), [])
}

/**
 * Save one full action plan (localStorage + server row).
 * Returns the updated list of plans for the customer.
 */
export function saveActionPlan(customerId, plan) {
  const entry = {
    ...(plan || {}),
    customer_id: customerId,
    client_id: `plan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    created_at: new Date().toISOString(),
  }
  const plans = getLocalActionPlans(customerId)
  plans.push(entry)
  write(planKey(customerId), plans)
  recordAction({
    type: 'ACTION_PLAN_CREATED',
    customerId,
    detail: `Created action plan: ${entry.title || 'Untitled plan'}`,
    meta: entry,
  })
  return plans
}

/** Pull this customer's action plans saved on the server into the local list. */
export async function hydrateActionPlansFromServer(customerId) {
  const rows = await fetchCustomerServerActions(customerId)
  if (!rows.length) return getLocalActionPlans(customerId)
  const plans = mergeServerForms(getLocalActionPlans(customerId), rows, 'ACTION_PLAN_CREATED')
  write(planKey(customerId), plans)
  return plans
}

// ---- Actions taken ----

/** Read recorded actions for a customer from localStorage (synchronous). */
export function getLocalActionsTaken(customerId) {
  return read(actionKey(customerId), [])
}

/**
 * Save one full "action taken" record (localStorage + server row).
 * Returns the updated list of actions for the customer.
 */
export function saveActionTaken(customerId, action) {
  const entry = {
    ...(action || {}),
    customer_id: customerId,
    client_id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    created_at: new Date().toISOString(),
  }
  const list = getLocalActionsTaken(customerId)
  list.push(entry)
  write(actionKey(customerId), list)
  recordAction({
    type: 'ACTION_RECORDED',
    customerId,
    detail: `Recorded action via ${entry.channel || 'unknown'} (${entry.outcome || 'PENDING'})`,
    meta: entry,
  })
  return list
}

/** Pull this customer's actions recorded on the server into the local list. */
export async function hydrateActionsTakenFromServer(customerId) {
  const rows = await fetchCustomerServerActions(customerId)
  if (!rows.length) return getLocalActionsTaken(customerId)
  const list = mergeServerForms(getLocalActionsTaken(customerId), rows, 'ACTION_RECORDED')
  write(actionKey(customerId), list)
  return list
}
