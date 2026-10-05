repo_path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-frontend\src\utils\absaActions.js'
with open(repo_path, 'r') as f:
    content = f.read()

addition = """
export function deleteAction(id) {
  const log = read(LOG_KEY, [])
  const idx = log.findIndex(x => x.id === id || x.serverId === id)
  if (idx >= 0) {
    const item = log.splice(idx, 1)[0]
    write(LOG_KEY, log)
    if (SYNC_ENABLED && item.serverId) {
      fetch(`${ACTIONS_ENDPOINT}/log/${item.serverId}`, { method: 'DELETE', headers: authHeaders() }).catch(()=>{})
    }
  }
}

export function updateAction(id, payload) {
  const log = read(LOG_KEY, [])
  const idx = log.findIndex(x => x.id === id || x.serverId === id)
  if (idx >= 0) {
    log[idx] = { ...log[idx], ...payload, type: payload.type || log[idx].type, detail: payload.detail || log[idx].detail, meta: payload.meta || log[idx].meta }
    write(LOG_KEY, log)
    if (SYNC_ENABLED && log[idx].serverId) {
      fetch(`${ACTIONS_ENDPOINT}/log/${log[idx].serverId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          customer_id: log[idx].customerId,
          action_type: log[idx].type,
          detail: log[idx].detail,
          meta: log[idx].meta,
          actor: log[idx].actor
        })
      }).catch(()=>{})
    }
  }
}
"""

if "deleteAction" not in content:
    content += "\n" + addition
    with open(repo_path, 'w') as f:
        f.write(content)
    print("done actions")
