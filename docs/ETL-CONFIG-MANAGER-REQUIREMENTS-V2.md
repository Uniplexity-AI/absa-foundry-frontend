# Frontend Functional Requirements

## ETL Config Manager — customer-lifecycle-ai

**Document version:** 1.0  
**Prepared by:** Uniplexity AI — Systems Architecture  
**Component path:** `src/views/Modules/datapipeline/ETLRunHistory.vue`  
**Backend:** `gateway/routes/etl_routes.py` — 7 endpoints (runs + config CRUD + trigger)  
**Scope:** Add a tabbed "Configurations" panel alongside the existing Run History view, including a YAML editor modal and pipeline trigger capability.

---

## 1. Overview

The ETL Config Manager extends the existing `ETLRunHistory.vue` component with a second tab — **Configurations** — that allows data scientists to list, create, edit, delete, and trigger ETL extraction specs stored on the backend at `etl/config/extraction_specs/*.yaml`. The Run History tab remains unchanged in behaviour.

---

## 2. Mockup

```
+-----------------------------------------------------------------+
|  ETL Pipeline Manager                                           |
|  customer-lifecycle-ai - absa-foundry-backend                   |
|                                         +----------+----------+ |
|                                         |Run history| Configs <| |
|                                         +----------+----------+ |
+-----------------------------------------------------------------+
|  11 extraction specs in etl/config/extraction_specs/            |
|                                              [ + New Config ]   |
|                                                                 |
|  +------------------+------------+----------+------+---------+  |
|  | Name             | Status     | Modified | Size | Actions |  |
|  +------------------+------------+----------+------+---------+  |
|  | customer_360     | - valid    |2026-08-09|3.1KB |[Edit][>]|  |
|  | Full 360 view... |            |          |      |    [X] |  |
|  +------------------+------------+----------+------+---------+  |
|  |transaction_master| - valid    |2026-08-09|2.8KB |[Edit][>]|  |
|  | All debit/credit |            |          |      |    [X] |  |
|  +------------------+------------+----------+------+---------+  |
|  | account_summary  | ! check    |2026-08-08|2.2KB |[Edit][>]|  |
|  | Account-level... |            |          |      |    [X] |  |
|  +------------------+------------+----------+------+---------+  |
|                                                                 |
|  [OK] Pipeline triggered -> run_etl.py --extraction-spec ...   |
+-----------------------------------------------------------------+

          YAML Editor Modal (opens on Edit or New Config)

+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
|  +--------------------------------------------------------+   |
|  | Edit config - customer_360.yaml              [ x ]     |   |
|  +--------------------------------------------------------+   |
|  | File name  [ customer_360.yaml (read-only)         ]  |   |
|  |                                                        |   |
|  |  spec_version: "1.0"                                   |   |
|  |  name: customer_360                                    |   |
|  |  description: "Full 360-degree customer view"          |   |
|  |                                                        |   |
|  |  source:                                               |   |
|  |    connector: postgres                                  |   |
|  |    schema: public                                      |   |
|  |    table: customers                                    |   |
|  |                                                        |   |
|  |  output:                                               |   |
|  |    destination: feature_store                          |   |
|  |    mode: upsert                                        |   |
|  |    key: customer_id                                    |   |
|  |                                                        |   |
|  |  - YAML valid                                          |   |
|  +--------------------------------------------------------+   |
|  |                        [ Cancel ]  [ Save config ]     |   |
|  +--------------------------------------------------------+   |
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -+
```

---

## 3. Tab Structure

The component renders two tabs: **Run History** and **Configurations**.

| Tab | Default state | Notes |
|-----|--------------|-------|
| Run History | Active on initial load | Existing behaviour -- no changes |
| Configurations | Inactive on initial load | New tab added by this feature |

Switching tabs must not trigger a page reload. Active tab state is local component state (`activeTab: "history" | "configs"`). The YAML editor modal closes when switching tabs.

---

## 4. Configurations Tab

### 4.1 Header row

- **Left side:** informational label -- e.g. `11 extraction specs in etl/config/extraction_specs/`.
- **Right side:** **+ New Config** button. Opens the YAML editor modal in create mode (empty file name field, default YAML template pre-filled).

### 4.2 Config table

Fetched from `GET /api/etl/configs` on tab mount. Columns:

| Column | Source field | Notes |
|--------|-------------|-------|
| Name | `name` (primary) + `description` (secondary, muted, below name) | Two-line cell |
| Status | `status` field (`"ok"` or `"warn"`) | Badge: green "valid" / amber "check needed" |
| Last modified | `last_modified` | Display as `YYYY-MM-DD` |
| Size | `size_bytes` | Format as `x.x KB` |
| Actions | -- | Three controls: Edit, Run, Delete |

**Behaviour:**

- Table rows display all configs with no client-side filtering or pagination unless the list exceeds **20 items**, in which case add simple pagination (next/prev).
- On initial load show a **skeleton loader** (3 placeholder rows) while the API call is in flight.
- On API error show an **inline error message** inside the table area with a **Retry** button.

### 4.3 Row actions

**Edit button**
- Opens the YAML editor modal in edit mode.
- Modal title: `Edit config - {filename}`.
- File name field pre-populated and **read-only**.
- YAML content pre-populated from `GET /api/etl/configs/{name}`.
- Show a loading spinner in the modal body while the content fetch is in flight.

**Run button**
- Sends `POST /api/etl/trigger` with body `{ "config_name": "{name}", "dry_run": false }`.
- On success: dismissible green banner with the message: `Pipeline triggered -> run_etl.py --extraction-spec {name}`. Auto-dismiss after 5 seconds.
- On error: dismissible red banner with the API error message. Auto-dismiss after 8 seconds.
- While in flight: disable the Run button for that row, show a spinner inside it.

**Delete button**
- Shows a confirmation prompt: `Delete {name}? This cannot be undone.` with **Cancel** and **Delete** buttons.
- On confirm: sends `DELETE /api/etl/configs/{name}`.
- On success: removes the row from the table without a full reload.
- On error: inline error message below the row, auto-dismiss after 5 seconds.

---

## 5. YAML Editor Modal

Used for both **create** and **edit** modes. No `<form>` elements -- all interactions via Vue event handlers (`@click`, `@input`).

### 5.1 Structure

| Element | Behaviour |
|---------|-----------|
| Modal title | `Edit config - {filename}` (edit mode) / `New Config` (create mode) |
| Close (x) button | Closes modal, discards unsaved changes -- no confirmation |
| File name input | Editable in create mode; **read-only** in edit mode. Auto-appends `.yaml` on save if not present |
| YAML content textarea | Monospace font, resizable vertically, minimum height 260px |
| Validation indicator | Coloured dot + label below textarea -- see section 5.2 |
| Cancel button | Closes modal, discards changes |
| Save config button | Triggers save -- see section 5.3 |

The modal renders as a **centered overlay** with a semi-transparent backdrop. Clicking the backdrop closes the modal.

### 5.2 Client-side YAML validation

Runs on every `@input` event on the textarea. Lightweight only -- backend performs full schema validation on save.

| Check | Pass condition |
|-------|---------------|
| Has `name:` field | `/^name:\s*\S+/m` matches |
| Has `source:` block | `/^source:/m` matches |

Indicator states:
- Both pass -> green dot + `YAML valid`
- Either fails -> red dot + `Missing required fields (name, source)`

### 5.3 Save behaviour

On **Save config** click:

1. Validate file name is not empty.
2. Append `.yaml` if not already present.
3. **Create mode:** `POST /api/etl/configs` with body `{ "content": "{yamlContent}" }` (name is auto-extracted from YAML `name:` field or auto-generated).
4. **Edit mode:** `PUT /api/etl/configs/{name}` with body `{ "content": "{yamlContent}" }`.
5. On success: close the modal and refresh the config list (`GET /api/etl/configs`).
6. On error: show error message in the modal footer -- **do not close** the modal.
7. While saving: disable both Save and Cancel buttons, show spinner on Save button.

### 5.4 Default YAML template (create mode)

```yaml
name: my_extraction
description: ""
spec_version: "1.0"

source:
  connector: postgres
  schema: public
  table: my_table

output:
  destination: feature_store
  mode: upsert
  key: customer_id
```

---

## 6. API Endpoints

All endpoints are prefixed with `/api/etl/`. Base URL from `VITE_API_BASE_URL` (already configured as `http://localhost:8080`).

| Method | Path | Request Body | Success Response | Used By |
|--------|------|-------------|-----------------|---------|
| `GET` | `/api/etl/runs?page=&limit=&status=` | -- | `ETLDashboardResponse` | Run History tab |
| `GET` | `/api/etl/configs` | -- | `ConfigSummary[]` | Config table load |
| `GET` | `/api/etl/configs/{name}` | -- | `ConfigContent` | Edit modal open |
| `POST` | `/api/etl/configs` | `{ content }` | `ConfigContent` | Create new config |
| `PUT` | `/api/etl/configs/{name}` | `{ content }` | `ConfigContent` | Save edited config |
| `DELETE` | `/api/etl/configs/{name}` | -- | `{ status: "deleted" }` | Delete row action |
| `POST` | `/api/etl/trigger` | `{ config_name, dry_run }` | `TriggerResponse` | Run button |

**Response shapes:**

```typescript
interface ConfigSummary {
  name: string
  description: string
  status: "ok" | "warn"          // backend validates: has name: + source: -> "ok"
  last_modified: string | null    // ISO date string
  size_bytes: number
}

interface ConfigContent {
  name: string
  content: string                 // raw YAML
  last_modified: string | null
}

interface TriggerResponse {
  status: "triggered" | "error"
  config_name: string
  message: string
  triggered_at: string            // ISO datetime
}
```

---

## 7. State Management

All state is **local** to `ETLRunHistory.vue`. No Pinia store changes required -- `useETLStore` already handles the Run History tab.

| State variable | Type | Purpose |
|---------------|------|---------|
| `activeTab` | `"history" \| "configs"` | Controls which tab panel is visible |
| `configs` | `ConfigSummary[]` | Config list from API |
| `configsLoading` | `boolean` | Skeleton loader for config table |
| `configsError` | `string \| null` | Error message for config table |
| `showEditor` | `boolean` | Controls modal visibility |
| `editorMode` | `"create" \| "edit"` | Determines modal title and save method |
| `editorName` | `string` | Bound to file name input |
| `editorContent` | `string` | Bound to YAML textarea |
| `editorLoading` | `boolean` | Loading state while fetching YAML content |
| `editorSaving` | `boolean` | Saving state (disables buttons, shows spinner) |
| `editorError` | `string \| null` | Error shown inside modal footer |
| `yamlValid` | `boolean` | Client-side validation indicator |
| `triggerLoadingRow` | `string \| null` | Name of config currently being triggered |
| `triggerSuccess` | `string \| null` | Green success banner text |
| `triggerError` | `string \| null` | Red error banner text |
| `deleteConfirmName` | `string \| null` | Name of config pending delete confirmation |

---

## 8. Error Handling

All API calls wrapped in `try/catch`. Error messages are human-readable -- raw exception strings and HTTP status codes are **not** surfaced directly.

| Scenario | UI Treatment |
|----------|-------------|
| Config list fails to load | Inline message in table area + **Retry** button |
| YAML content fails to load in editor | Message inside modal body + **Retry** button |
| Save fails | Error message in modal footer -- modal stays open |
| Trigger fails | Red error banner beneath table -- auto-dismiss after 8s |
| Delete fails | Inline error message -- auto-dismiss after 5s |

---

## 9. Out of Scope

- Full server-side YAML schema validation in the frontend (backend handles this via Pydantic)
- Renaming configs (delete + create workaround)
- Drag-and-drop reordering
- Config version history or diffing
- Role-based access control (all authenticated users can perform all actions)
- Real-time run status polling after trigger (Run History tab handles this separately)
- The Run History tab content -- no changes to existing behaviour

---

## 10. Backend Implementation

The backend endpoints are implemented in `gateway/routes/etl_routes.py` using:

- **Config storage:** reads/writes YAML files in `etl/config/extraction_specs/*.yaml`
- **Config listing:** scans directory, extracts `description` from YAML frontmatter, runs lightweight validation (`name:` + `source:` check) for `status` field
- **Config CRUD:** path traversal guards (`..`, `/`, `\` rejected), auto-creates directory if missing
- **Pipeline trigger:** launches `run_etl.py --extraction-spec <path>` via `subprocess.Popen` as a background process
- **Safety:** untrusted configs (`trusted_config: false`) reject raw SQL features server-side

---

## 11. Acceptance Criteria

- [ ] Tabs switch without page reload and the correct panel displays for each tab
- [ ] Config table fetches and renders data from `GET /api/etl/configs` on tab mount
- [ ] Skeleton loader displays while the config list is loading
- [ ] Edit opens the modal pre-populated with read-only filename and YAML content from the API
- [ ] New Config opens the modal with an empty filename field and the default YAML template
- [ ] File name input appends `.yaml` automatically on save if not present
- [ ] YAML validation indicator updates on every keystroke
- [ ] Save in create mode calls `POST /api/etl/configs` and refreshes the list on success
- [ ] Save in edit mode calls `PUT /api/etl/configs/{name}` and refreshes the list on success
- [ ] Run button calls `POST /api/etl/trigger`, disables during the request, shows success/error banner
- [ ] Delete shows a confirmation prompt before sending `DELETE /api/etl/configs/{name}`
- [ ] All error states display human-readable messages with retry or dismiss options
- [ ] Modal closes when switching tabs
- [ ] No `<form>` elements used -- all interactions via Vue event handlers
- [ ] Backend `GET /api/etl/configs` returns `status` field validated from YAML content
- [ ] Backend `POST /api/etl/trigger` launches pipeline as background subprocess
