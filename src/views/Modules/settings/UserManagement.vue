<template>
  <div class="absa-um">
    <div class="absa-um__content">

      <!-- Breadcrumb -->
      <div class="absa-um__breadcrumb">
        <span>Home</span>
        <svg width="12" height="12" viewBox="0 0 6 10" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M1 1l4 4-4 4"/></svg>
        <span>Settings</span>
        <svg width="12" height="12" viewBox="0 0 6 10" fill="none" stroke="#9CA3AF" stroke-width="1.5"><path d="M1 1l4 4-4 4"/></svg>
        <span class="absa-um__breadcrumb-current">User Management</span>
      </div>

      <!-- Header -->
      <div class="absa-um__header">
        <div>
          <h1 class="absa-um__title">User Management</h1>
          <p class="absa-um__subtitle">Manage platform users, roles, and access permissions. Ensure compliance protocols are followed by assigning granular privileges across departments.</p>
        </div>
        <button class="absa-um__btn absa-um__btn--primary" @click="showInviteModal = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" y1="11" x2="23" y2="16"/><line x1="20.5" y1="13.5" x2="25.5" y2="13.5"/></svg>
          Invite User
        </button>
      </div>

      <!-- ═══ Main Grid: Table + Sidebar ═══ -->
      <div class="absa-um__grid">

        <!-- ── Left Column (Table area) ── -->
        <div class="absa-um__table-col">

          <!-- Tabs -->
          <div class="absa-um__tabs">
            <button v-for="t in tabs" :key="t.key" :class="['absa-um__tab', { 'absa-um__tab--active': activeTab === t.key }]" @click="activeTab = t.key">{{ t.label }}</button>
          </div>

          <!-- ── Users Tab ── -->
          <template v-if="activeTab === 'users'">
            <div class="absa-um__toolbar">
              <div class="absa-um__filters">
                <div class="absa-um__select-wrap">
                  <select v-model="filterRole" class="absa-um__select">
                    <option value="">All Roles</option>
                    <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                  </select>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <div class="absa-um__select-wrap">
                  <select v-model="filterStatus" class="absa-um__select">
                    <option value="">Status: All</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div class="absa-um__search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input v-model="search" type="text" placeholder="Search users..." class="absa-um__search-input" />
              </div>
            </div>

            <div class="absa-um__table-wrap">
              <table class="absa-um__table">
                <thead>
                  <tr>
                    <th>USER NAME</th>
                    <th>ROLE</th>
                    <th>DEPARTMENT</th>
                    <th>STATUS</th>
                    <th>LAST LOGIN</th>
                    <th style="width: 88px;">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="u in filteredUsers" :key="u.id" @click="openEditUser(u)">
                    <td>
                      <div class="absa-um__user-cell">
                        <div class="absa-um__avatar" :style="{ background: u.avatarColor || '#BE0F2C' }">{{ u.initials }}</div>
                        <div>
                          <div class="absa-um__user-name">{{ u.name }}</div>
                          <div class="absa-um__user-email">{{ u.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td><span class="absa-um__role-text">{{ u.role }}</span></td>
                    <td><span class="absa-um__dept-text">{{ u.department }}</span></td>
                    <td>
                      <span :class="['absa-um__status', u.status === 'ACTIVE' ? 'absa-um__status--active' : 'absa-um__status--inactive']">
                        <span class="absa-um__status-dot"></span>
                        {{ u.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE' }}
                      </span>
                    </td>
                    <td class="absa-um__login-time">{{ u.lastLogin }}</td>
                    <td>
                      <div class="absa-um__actions" @click.stop>
                        <button class="absa-um__action-btn" @click="openEditUser(u)" title="Edit user">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <div class="absa-um__action-cell">
                          <button class="absa-um__action-btn" @click="toggleDropdown(u.id)" title="More">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="#6B7280"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                          </button>
                          <Transition name="dropdown">
                          <div v-if="openDropdownId === u.id" class="absa-um__dropdown">
                            <button class="absa-um__dropdown-item" @click="viewUser(u)">View Profile</button>
                            <button class="absa-um__dropdown-item" @click="toggleUserStatus(u)">{{ u.status === 'ACTIVE' ? 'Deactivate' : 'Activate' }}</button>
                            <button class="absa-um__dropdown-item absa-um__dropdown-item--danger" @click="confirmDeleteUser(u)">Delete</button>
                          </div>
                          </Transition>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="filteredUsers.length === 0">
                    <td colspan="6" class="absa-um__empty">No users match the current filters.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="absa-um__pagination">
              <span class="absa-um__pagination-info">Showing {{ pageInfo }}</span>
              <div class="absa-um__page-btns">
                <button :disabled="page <= 1" @click="page--">
                  <svg width="10" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 1l-4 4 4 4"/></svg>
                </button>
                <button v-for="p in pageNumbers" :key="p" :class="{ 'absa-um__page--active': p === page }" @click="page = p" :disabled="p === '...'">{{ p }}</button>
                <button :disabled="page >= totalPages" @click="page++">
                  <svg width="10" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4-4 4"/></svg>
                </button>
              </div>
            </div>
          </template>

          <!-- ── Roles Tab ── -->
          <template v-if="activeTab === 'roles'">
            <div class="absa-um__tab-content">
              <div class="absa-um__roles-header">
                <p class="absa-um__tab-desc">Define and manage roles with specific permission sets.</p>
                <button class="absa-um__btn absa-um__btn--outline" @click="showCreateRole = true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Create Role
                </button>
              </div>
              <div class="absa-um__table-wrap">
                <table class="absa-um__table">
                  <thead>
                    <tr>
                      <th>ROLE NAME</th>
                      <th>USERS</th>
                      <th>PERMISSIONS</th>
                      <th>CREATED</th>
                      <th style="width: 64px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in roleList" :key="r.id">
                      <td><span class="absa-um__role-name">{{ r.name }}</span></td>
                      <td><span class="absa-um__role-count">{{ r.userCount }}</span></td>
                      <td><span class="absa-um__perm-count">{{ r.permissionCount }} permissions</span></td>
                      <td class="absa-um__login-time">{{ r.created }}</td>
                      <td>
                        <button class="absa-um__action-btn" @click="editRole(r)" title="Edit role">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                      </td>
                    </tr>
                    <tr v-if="roleList.length === 0">
                      <td colspan="5" class="absa-um__empty">No roles defined yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>

          <!-- ── Permissions Tab ── -->
          <template v-if="activeTab === 'permissions'">
            <div class="absa-um__tab-content">
              <div class="absa-um__perm-topbar">
                <div class="absa-um__perm-role-select">
                  <label>Showing permissions for:</label>
                  <div class="absa-um__select-wrap">
                    <select v-model="permSelectedRole" class="absa-um__select">
                      <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                    </select>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div class="absa-um__search">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input v-model="permSearch" type="text" placeholder="Filter permissions..." class="absa-um__search-input" />
                </div>
              </div>

              <div class="absa-um__perm-stats">
                <div class="absa-um__perm-stats-bar">
                  <div class="absa-um__perm-stats-fill" :style="{ width: permGrantedPct + '%' }"></div>
                </div>
                <span class="absa-um__perm-stats-label">{{ permGrantedCount }} of {{ permTotalCount }} permissions granted to <strong>{{ permSelectedRole }}</strong></span>
              </div>

              <div class="absa-um__perm-modules">
                <div v-for="mod in filteredPermModules" :key="mod.id" class="absa-um__perm-module">
                  <div class="absa-um__perm-module-header" @click="togglePermModule(mod.id)">
                    <div class="absa-um__perm-module-left">
                      <div :class="['absa-um__perm-module-icon', 'absa-um__perm-module-icon--' + mod.color]">{{ mod.icon }}</div>
                      <div>
                        <div class="absa-um__perm-module-name">{{ mod.name }}</div>
                        <div class="absa-um__perm-module-sub">{{ mod.grantedCount }}/{{ mod.permissions.length }} permissions</div>
                      </div>
                    </div>
                    <div class="absa-um__perm-module-right">
                      <div class="absa-um__perm-module-track">
                        <div class="absa-um__perm-module-track-fill" :style="{ width: (mod.grantedCount / mod.permissions.length * 100) + '%' }"></div>
                      </div>
                      <div class="absa-um__perm-module-actions">
                        <button class="absa-um__perm-bulk-btn" @click.stop="grantAll(mod, true)" title="Grant all">Grant all</button>
                        <button class="absa-um__perm-bulk-btn absa-um__perm-bulk-btn--revoke" @click.stop="grantAll(mod, false)" title="Revoke all">Revoke all</button>
                      </div>
                      <svg :class="['absa-um__perm-chevron', { 'absa-um__perm-chevron--open': expandedPermModules[mod.id] }]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>
                  <Transition name="perm-expand">
                    <div v-if="expandedPermModules[mod.id]" class="absa-um__perm-module-body">
                      <div v-for="p in mod.permissions" :key="p.id" class="absa-um__perm-row">
                        <span class="absa-um__perm-row-label">{{ p.label }}</span>
                        <span class="absa-um__perm-row-desc">{{ p.description }}</span>
                        <label class="absa-um__switch-field" @click.prevent="togglePermission(mod.id, p.id)">
                          <input type="checkbox" :checked="p.granted" />
                          <span class="absa-um__switch-control" aria-hidden="true"></span>
                        </label>
                      </div>
                    </div>
                  </Transition>
                </div>
                <div v-if="filteredPermModules.length === 0" class="absa-um__empty">No permissions match your filter.</div>
              </div>
            </div>
          </template>

        </div>

        <!-- ── Right Column (Sidebar) ── -->
        <div class="absa-um__sidebar-col">
          <!-- Access Summary -->
          <div class="absa-um__card absa-um__access-summary">
            <h3 class="absa-um__card-title">ACCESS SUMMARY</h3>
            <div class="absa-um__stat-list">
              <div v-for="s in accessStats" :key="s.label" class="absa-um__stat-row">
                <span class="absa-um__stat-label">{{ s.label }}</span>
                <span class="absa-um__stat-value">{{ s.count }}</span>
              </div>
            </div>
          </div>

          <!-- Role Hierarchy -->
          <div class="absa-um__card absa-um__hierarchy-card">
            <div class="absa-um__hierarchy-image"></div>
            <h3 class="absa-um__card-title">Role Management Hierarchy</h3>
            <p class="absa-um__card-desc">Assign system roles with predefined permission sets or create custom roles for specific departmental requirements.</p>
            <button class="absa-um__btn absa-um__btn--link" @click="showCreateRole = true">
              Configure Hierarchies
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Invite User Modal ═══ -->
    <Teleport to="body">
      <Transition name="modal">
      <div v-if="showInviteModal" class="absa-um__modal-overlay" @click.self="showInviteModal = false">
        <div class="absa-um__modal absa-um__modal--lg">
          <div class="absa-um__modal-header">
            <h2 class="absa-um__modal-title">Invite New User</h2>
            <button class="absa-um__modal-close" @click="showInviteModal = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="absa-um__modal-body">
            <div class="absa-um__form-grid">
              <div class="absa-um__form-group">
                <label>Full Name</label>
                <input v-model="inviteForm.name" type="text" placeholder="e.g. John Doe" class="absa-um__input" />
              </div>
              <div class="absa-um__form-group">
                <label>Email Address</label>
                <input v-model="inviteForm.email" type="email" placeholder="e.g. john.doe@company.com" class="absa-um__input" />
              </div>
              <div class="absa-um__form-group">
                <label>Role</label>
                <div class="absa-um__select-wrap">
                  <select v-model="inviteForm.role" class="absa-um__select">
                    <option value="">Select role</option>
                    <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                  </select>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div class="absa-um__form-group">
                <label>Department</label>
                <div class="absa-um__select-wrap">
                  <select v-model="inviteForm.department" class="absa-um__select">
                    <option value="">Select department</option>
                    <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
                  </select>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div class="absa-um__form-group">
                <label>Password</label>
                <input v-model="inviteForm.password" type="password" placeholder="Min. 8 characters" class="absa-um__input" />
              </div>
              <div class="absa-um__form-group">
                <label>Confirm Password</label>
                <input v-model="inviteForm.confirmPassword" type="password" placeholder="Confirm password" class="absa-um__input" />
              </div>
            </div>
          </div>
          <div class="absa-um__modal-footer">
            <button class="absa-um__btn absa-um__btn--outline" @click="showInviteModal = false">Cancel</button>
            <button class="absa-um__btn absa-um__btn--primary" @click="handleInviteUser" :disabled="saving">
              <svg v-if="saving" class="absa-um__spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {{ saving ? 'Sending Invite...' : 'Send Invite' }}
            </button>
          </div>
        </div>
      </div>
      </Transition>
    </Teleport>

    <!-- ═══ Edit User Modal ═══ -->
    <Teleport to="body">
      <Transition name="modal">
      <div v-if="showEditModal" class="absa-um__modal-overlay" @click.self="showEditModal = false">
        <div class="absa-um__modal absa-um__modal--lg">
          <div class="absa-um__modal-header">
            <h2 class="absa-um__modal-title">Edit User</h2>
            <button class="absa-um__modal-close" @click="showEditModal = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="absa-um__modal-body">
            <div class="absa-um__form-grid">
              <div class="absa-um__form-group">
                <label>Full Name</label>
                <input v-model="editForm.name" type="text" class="absa-um__input" />
              </div>
              <div class="absa-um__form-group">
                <label>Email Address</label>
                <input v-model="editForm.email" type="email" disabled class="absa-um__input absa-um__input--disabled" />
              </div>
              <div class="absa-um__form-group">
                <label>Role</label>
                <div class="absa-um__select-wrap">
                  <select v-model="editForm.role" class="absa-um__select">
                    <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                  </select>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div class="absa-um__form-group">
                <label>Department</label>
                <div class="absa-um__select-wrap">
                  <select v-model="editForm.department" class="absa-um__select">
                    <option v-for="d in departments" :key="d" :value="d">{{ d }}</option>
                  </select>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div class="absa-um__form-group">
                <label>New Password</label>
                <input v-model="editForm.password" type="password" placeholder="Leave blank to keep current" class="absa-um__input" />
              </div>
              <div class="absa-um__form-group">
                <label>Status</label>
                <div class="absa-um__select-wrap">
                  <select v-model="editForm.status" class="absa-um__select">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>
          </div>
          <div class="absa-um__modal-footer">
            <button class="absa-um__btn absa-um__btn--outline" @click="showEditModal = false">Cancel</button>
            <button class="absa-um__btn absa-um__btn--primary" @click="handleEditUser" :disabled="saving">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
      </Transition>
    </Teleport>

    <!-- ═══ Create Role Modal ═══ -->
    <Teleport to="body">
      <Transition name="modal">
      <div v-if="showCreateRole" class="absa-um__modal-overlay" @click.self="showCreateRole = false">
        <div class="absa-um__modal">
          <div class="absa-um__modal-header">
            <h2 class="absa-um__modal-title">Create Role</h2>
            <button class="absa-um__modal-close" @click="showCreateRole = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="absa-um__modal-body">
            <div class="absa-um__form-group">
              <label>Role Name</label>
              <input v-model="roleForm.name" type="text" placeholder="e.g. Senior Analyst" class="absa-um__input" />
            </div>
            <div class="absa-um__form-group">
              <label>Description</label>
              <textarea v-model="roleForm.description" placeholder="Describe the role's responsibilities" class="absa-um__input absa-um__textarea" rows="3"></textarea>
            </div>
            <div class="absa-um__form-group">
              <label>Base Permissions</label>
              <div class="absa-um__perm-checks">
                <label v-for="p in basePermissions" :key="p.id" class="absa-um__perm-check">
                  <input type="checkbox" :value="p.id" v-model="roleForm.permissions" />
                  <span>{{ p.label }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="absa-um__modal-footer">
            <button class="absa-um__btn absa-um__btn--outline" @click="showCreateRole = false">Cancel</button>
            <button class="absa-um__btn absa-um__btn--primary" @click="handleCreateRole">Create Role</button>
          </div>
        </div>
      </div>
      </Transition>
    </Teleport>

    <!-- ═══ Delete Confirmation ═══ -->
    <Teleport to="body">
      <Transition name="modal">
      <div v-if="showDeleteConfirm" class="absa-um__modal-overlay" @click.self="showDeleteConfirm = false">
        <div class="absa-um__modal absa-um__modal--sm">
          <div class="absa-um__modal-header">
            <h2 class="absa-um__modal-title">Delete User</h2>
            <button class="absa-um__modal-close" @click="showDeleteConfirm = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="absa-um__modal-body">
            <p class="absa-um__delete-warn">Are you sure you want to delete <strong>{{ deleteTarget?.name }}</strong>? This action cannot be undone.</p>
          </div>
          <div class="absa-um__modal-footer">
            <button class="absa-um__btn absa-um__btn--outline" @click="showDeleteConfirm = false">Cancel</button>
            <button class="absa-um__btn absa-um__btn--danger" @click="handleDeleteUser">Delete User</button>
          </div>
        </div>
      </div>
      </Transition>
    </Teleport>

    <!-- ═══ Toast Notifications ═══ -->
    <Teleport to="body">
      <div class="absa-um__toast-container">
        <TransitionGroup name="toast">
          <div v-for="toast in toasts" :key="toast.id" :class="['absa-um__toast', 'absa-um__toast--' + toast.type]">
            <svg v-if="toast.type === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <span>{{ toast.message }}</span>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tabs = [
  { key: 'users', label: 'Users' },
  { key: 'roles', label: 'Roles' },
  { key: 'permissions', label: 'Permissions' }
]
const activeTab = ref('users')

const roles = ['Compliance Lead', 'Analyst', 'Auditor', 'Manager', 'Admin', 'Viewer']
const departments = ['Risk & Security', 'Corporate KYC', 'External Relations', 'Operations', 'Finance', 'Legal']

const avatarColors = ['#BE0F2C', '#1E40AF', '#7C3AED', '#059669', '#D97706', '#DC2626']

const users = ref([
  { id: 1, name: 'Alistair Wright', email: 'alistair.w@absa.co.za', initials: 'AW', role: 'Compliance Lead', department: 'Risk & Security', status: 'ACTIVE', lastLogin: '2 mins ago' },
  { id: 2, name: 'Mandla Madiba', email: 'm.madiba@absa.co.za', initials: 'MM', role: 'Analyst', department: 'Corporate KYC', status: 'ACTIVE', lastLogin: '1 hour ago' },
  { id: 3, name: 'Elena Kovic', email: 'e.kovic@absa.co.za', initials: 'EK', role: 'Auditor', department: 'External Relations', status: 'INACTIVE', lastLogin: '3 days ago' },
  { id: 4, name: 'Sarah Jenkins', email: 's.jenkins@absa.co.za', initials: 'SJ', role: 'Compliance Lead', department: 'Risk & Security', status: 'ACTIVE', lastLogin: 'Online' },
  { id: 5, name: 'Thabo Mbeki', email: 't.mbeki@absa.co.za', initials: 'TM', role: 'Analyst', department: 'Corporate KYC', status: 'ACTIVE', lastLogin: '30 mins ago' },
  { id: 6, name: 'Priya Patel', email: 'p.patel@absa.co.za', initials: 'PP', role: 'Auditor', department: 'External Relations', status: 'ACTIVE', lastLogin: '5 hours ago' },
  { id: 7, name: 'James Kariuki', email: 'j.kariuki@absa.co.za', initials: 'JK', role: 'Manager', department: 'Operations', status: 'INACTIVE', lastLogin: '1 week ago' },
  { id: 8, name: 'Lindiwe Zulu', email: 'l.zulu@absa.co.za', initials: 'LZ', role: 'Compliance Lead', department: 'Legal', status: 'ACTIVE', lastLogin: 'Online' }
])
users.value.forEach((u, i) => u.avatarColor = avatarColors[i % avatarColors.length])

const accessStats = computed(() => {
  const counts = {}
  users.value.forEach(u => {
    counts[u.role] = (counts[u.role] || 0) + 1
  })
  return Object.entries(counts).map(([label, count]) => ({ label, count: String(count).padStart(2, '0') }))
})

const filterRole = ref('')
const filterStatus = ref('')
const search = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    if (filterRole.value && u.role !== filterRole.value) return false
    if (filterStatus.value && u.status !== filterStatus.value) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
    }
    return true
  })
})

const page = ref(1)
const pageSize = 5
const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / pageSize)))
const pagedUsers = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredUsers.value.slice(start, start + pageSize)
})
const pageInfo = computed(() => {
  const total = filteredUsers.value.length
  const start = (page.value - 1) * pageSize + 1
  const end = Math.min(page.value * pageSize, total)
  return `Showing ${start} - ${end} of ${total} user${total !== 1 ? 's' : ''}`
})
const pageNumbers = computed(() => {
  const pages = []
  const tp = totalPages.value
  if (tp <= 5) { for (let i = 1; i <= tp; i++) pages.push(i) }
  else {
    pages.push(1)
    if (page.value > 3) pages.push('...')
    for (let i = Math.max(2, page.value - 1); i <= Math.min(tp - 1, page.value + 1); i++) pages.push(i)
    if (page.value < tp - 2) pages.push('...')
    pages.push(tp)
  }
  return pages
})

// Modals
const showInviteModal = ref(false)
const showEditModal = ref(false)
const showCreateRole = ref(false)
const showDeleteConfirm = ref(false)
const saving = ref(false)
const openDropdownId = ref(null)
const deleteTarget = ref(null)

const inviteForm = ref({ name: '', email: '', role: '', department: '', password: '', confirmPassword: '' })
const editForm = ref({ id: null, name: '', email: '', role: '', department: '', password: '', status: 'ACTIVE' })
const roleForm = ref({ name: '', description: '', permissions: [] })

const basePermissions = [
  { id: 'view_users', label: 'View Users' },
  { id: 'create_users', label: 'Create Users' },
  { id: 'edit_users', label: 'Edit Users' },
  { id: 'delete_users', label: 'Delete Users' },
  { id: 'manage_roles', label: 'Manage Roles' },
  { id: 'view_reports', label: 'View Reports' },
  { id: 'manage_settings', label: 'Manage Settings' }
]

const roleList = ref([
  { id: 1, name: 'Compliance Lead', userCount: 3, permissionCount: 12, created: '2026-01-15' },
  { id: 2, name: 'Analyst', userCount: 5, permissionCount: 8, created: '2026-02-01' },
  { id: 3, name: 'Auditor', userCount: 4, permissionCount: 6, created: '2026-01-20' },
  { id: 4, name: 'Manager', userCount: 2, permissionCount: 15, created: '2025-11-01' }
])

// Permission matrix state
const permSelectedRole = ref('Analyst')
const permSearch = ref('')
const expandedPermModules = ref({})

const permissionModules = ref([
  { id: 'crm', name: 'CRM Module', icon: 'CR', color: 'maroon', permissions: [
    { id: 'crm_view', label: 'View Customers', description: 'Browse and search customer profiles', granted: true },
    { id: 'crm_edit', label: 'Edit Customers', description: 'Modify customer details and notes', granted: true },
    { id: 'crm_delete', label: 'Delete Customers', description: 'Remove customer records permanently', granted: false },
    { id: 'crm_export', label: 'Export Data', description: 'Download customer data as CSV/Excel', granted: true },
    { id: 'crm_impersonate', label: 'Impersonate Customer', description: 'Login as customer for support', granted: false }
  ]},
  { id: 'analytics', name: 'Analytics', icon: 'AN', color: 'blue', permissions: [
    { id: 'an_view', label: 'View Dashboards', description: 'Access analytics dashboards', granted: true },
    { id: 'an_create', label: 'Create Reports', description: 'Build custom reports and charts', granted: false },
    { id: 'an_export', label: 'Export Reports', description: 'Download reports as PDF/Excel', granted: true },
    { id: 'an_schedule', label: 'Schedule Reports', description: 'Set up automated report delivery', granted: false }
  ]},
  { id: 'settings', name: 'Settings & Admin', icon: 'ST', color: 'amber', permissions: [
    { id: 'st_view', label: 'View Settings', description: 'Access system configuration', granted: true },
    { id: 'st_edit', label: 'Edit Settings', description: 'Modify system configuration', granted: false },
    { id: 'st_branding', label: 'Manage Branding', description: 'Update logos, colors, and themes', granted: false }
  ]},
  { id: 'compliance', name: 'Compliance', icon: 'CP', color: 'green', permissions: [
    { id: 'co_view', label: 'View Audit Logs', description: 'Access compliance audit trail', granted: true },
    { id: 'co_export', label: 'Export Audit Data', description: 'Download audit logs for review', granted: true },
    { id: 'co_manage', label: 'Manage Policies', description: 'Create and update compliance policies', granted: false }
  ]},
  { id: 'users', name: 'User Management', icon: 'UM', color: 'purple', permissions: [
    { id: 'um_view', label: 'View Users', description: 'Browse user directory', granted: true },
    { id: 'um_create', label: 'Create Users', description: 'Invite new users to the platform', granted: false },
    { id: 'um_edit', label: 'Edit Users', description: 'Modify user profiles and roles', granted: false },
    { id: 'um_delete', label: 'Delete Users', description: 'Remove users from the platform', granted: false }
  ]}
])

// Compute granted counts per module
permissionModules.value.forEach(m => {
  m.grantedCount = m.permissions.filter(p => p.granted).length
})

const filteredPermModules = computed(() => {
  const q = permSearch.value.toLowerCase()
  return permissionModules.value.map(mod => {
    const perms = q ? mod.permissions.filter(p => p.label.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) : mod.permissions
    return { ...mod, permissions: perms }
  }).filter(mod => mod.permissions.length > 0)
})

const permTotalCount = computed(() => {
  return permissionModules.value.reduce((sum, m) => sum + m.permissions.length, 0)
})
const permGrantedCount = computed(() => {
  return permissionModules.value.reduce((sum, m) => sum + m.permissions.filter(p => p.granted).length, 0)
})
const permGrantedPct = computed(() => {
  return permTotalCount.value ? (permGrantedCount.value / permTotalCount.value * 100) : 0
})

function togglePermModule(id) {
  expandedPermModules.value[id] = !expandedPermModules.value[id]
}

function togglePermission(moduleId, permId) {
  const mod = permissionModules.value.find(m => m.id === moduleId)
  if (!mod) return
  const perm = mod.permissions.find(p => p.id === permId)
  if (perm) {
    perm.granted = !perm.granted
    mod.grantedCount = mod.permissions.filter(p => p.granted).length
  }
}

function grantAll(mod, grant) {
  mod.permissions.forEach(p => { p.granted = grant })
  mod.grantedCount = grant ? mod.permissions.length : 0
  addToast('success', `${grant ? 'Granted' : 'Revoked'} all permissions for ${mod.name}`)
}

const toasts = ref([])

function addToast(type, message) {
  const id = Date.now()
  toasts.value.push({ id, type, message })
  setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, 4000)
}

function toggleDropdown(id) {
  openDropdownId.value = openDropdownId.value === id ? null : id
}

function handleClickOutside(e) {
  if (openDropdownId.value !== null && !e.target.closest('.absa-um__action-cell')) {
    openDropdownId.value = null
  }
}

function openEditUser(u) {
  editForm.value = { id: u.id, name: u.name, email: u.email, role: u.role, department: u.department, password: '', status: u.status }
  showEditModal.value = true
}

function viewUser(u) {
  openDropdownId.value = null
  openEditUser(u)
}

function toggleUserStatus(u) {
  u.status = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
  openDropdownId.value = null
  addToast('success', `${u.name} ${u.status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully.`)
}

function confirmDeleteUser(u) {
  deleteTarget.value = u
  showDeleteConfirm.value = true
  openDropdownId.value = null
}

function handleInviteUser() {
  const f = inviteForm.value
  if (!f.name || !f.email || !f.role || !f.department || !f.password) {
    addToast('error', 'Please fill in all required fields.')
    return
  }
  if (f.password !== f.confirmPassword) {
    addToast('error', 'Passwords do not match.')
    return
  }
  saving.value = true
  setTimeout(() => {
    const initials = f.name.split(' ').map(n => n[0]).join('').toUpperCase()
    users.value.push({
      id: Date.now(),
      name: f.name,
      email: f.email,
      initials,
      avatarColor: avatarColors[users.value.length % avatarColors.length],
      role: f.role,
      department: f.department,
      status: 'ACTIVE',
      lastLogin: 'Just now'
    })
    saving.value = false
    showInviteModal.value = false
    inviteForm.value = { name: '', email: '', role: '', department: '', password: '', confirmPassword: '' }
    addToast('success', `Invitation sent to ${f.name}.`)
  }, 800)
}

function handleEditUser() {
  const f = editForm.value
  saving.value = true
  setTimeout(() => {
    const u = users.value.find(x => x.id === f.id)
    if (u) {
      u.name = f.name
      u.role = f.role
      u.department = f.department
      u.status = f.status
      u.initials = f.name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    saving.value = false
    showEditModal.value = false
    addToast('success', `${f.name}'s profile updated.`)
  }, 600)
}

function handleDeleteUser() {
  if (!deleteTarget.value) return
  users.value = users.value.filter(u => u.id !== deleteTarget.value.id)
  showDeleteConfirm.value = false
  deleteTarget.value = null
  addToast('success', 'User deleted successfully.')
}

function handleCreateRole() {
  if (!roleForm.value.name) {
    addToast('error', 'Please enter a role name.')
    return
  }
  const roleName = roleForm.value.name
  roleList.value.push({
    id: Date.now(),
    name: roleName,
    userCount: 0,
    permissionCount: roleForm.value.permissions.length,
    created: new Date().toISOString().split('T')[0]
  })
  showCreateRole.value = false
  roleForm.value = { name: '', description: '', permissions: [] }
  addToast('success', `Role "${roleName}" created.`)
}



onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ═══ User Management Page ═══ */
.absa-um__content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  flex: 1;
}

/* Breadcrumb */
.absa-um__breadcrumb {
  display: flex; align-items: center; gap: 6px;
  font-size: 0.7rem; font-weight: 600; color: #9CA3AF;
  font-family: 'Space Mono', monospace;
}
.absa-um__breadcrumb-current { color: #BE0F2C; }

/* Header */
.absa-um__header {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 16px;
}
.absa-um__title { font-size: 1.5rem; font-weight: 900; color: #111827; margin: 0; letter-spacing: -0.02em; }
.absa-um__subtitle { font-size: 0.7rem; color: #9CA3AF; margin: 4px 0 0 0; font-family: 'Space Mono', monospace; max-width: 640px; line-height: 1.5; }

/* Buttons */
.absa-um__btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 6px; font-size: 0.7rem;
  font-weight: 700; cursor: pointer; transition: all 150ms ease;
  border: 1px solid #E8E8EC; background: #FFF; color: #4B5563;
  font-family: 'Montserrat', system-ui, sans-serif; white-space: nowrap;
}
.absa-um__btn:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-um__btn:focus-visible { outline: 2px solid #BE0F2C; outline-offset: 2px; }
.absa-um__btn:disabled { opacity: 0.5; cursor: not-allowed; }
.absa-um__btn--primary { background: #BE0F2C; color: #FFF; border-color: transparent; }
.absa-um__btn--primary:hover { background: #A01028; color: #FFF; border-color: transparent; }
.absa-um__btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
.absa-um__btn--outline { background: #FFF; }
.absa-um__btn--danger { background: #DC2626; color: #FFF; border-color: transparent; }
.absa-um__btn--danger:hover { background: #B91C1C; color: #FFF; }
.absa-um__btn--link { background: none; border: none; color: #BE0F2C; padding: 0; font-weight: 700; }
.absa-um__btn--link:hover { color: #8B0015; }

/* Grid layout */
.absa-um__grid {
  display: grid;
  grid-template-columns: 1fr 313px;
  gap: 28px;
  align-items: start;
}

/* Table column */
.absa-um__table-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Tabs */
.absa-um__tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #E8E8EC;
}
.absa-um__tab {
  padding: 10px 20px; font-size: 0.75rem; font-weight: 700;
  color: #9CA3AF; background: none; border: none;
  cursor: pointer; position: relative;
  font-family: 'Montserrat', system-ui, sans-serif;
  transition: color 150ms ease;
}
.absa-um__tab:hover { color: #4B5563; }
.absa-um__tab--active { color: #BE0F2C; }
.absa-um__tab--active::after {
  content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
  height: 2px; background: #BE0F2C; border-radius: 1px;
}

/* Toolbar */
.absa-um__toolbar {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}
.absa-um__filters { display: flex; gap: 8px; }
.absa-um__search {
  display: flex; align-items: center; gap: 8px;
  background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 6px;
  padding: 7px 12px; width: 220px;
}
.absa-um__search-input {
  border: none; background: transparent; font-size: 0.7rem;
  color: #111827; outline: none; width: 100%;
  font-family: 'Space Mono', monospace;
}
.absa-um__search-input::placeholder { color: #9CA3AF; }

/* Select */
.absa-um__select-wrap {
  position: relative; display: flex; align-items: center;
}
.absa-um__select-wrap svg {
  position: absolute; right: 10px; pointer-events: none;
  color: #6B7280;
}
.absa-um__select {
  appearance: none; background: #F9FAFB; border: 1px solid #E5E7EB;
  border-radius: 6px; padding: 7px 28px 7px 10px;
  font-size: 0.7rem; font-weight: 600; color: #374151;
  cursor: pointer; outline: none;
  font-family: 'Space Mono', monospace;
  min-width: 120px;
}

/* Table */
.absa-um__table-wrap {
  background: #FFF; border: 1px solid #E8E8EC; border-radius: 12px; overflow: hidden;
}
.absa-um__table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
.absa-um__table th {
  font-family: 'Space Mono', monospace; font-size: 0.575rem; font-weight: 800;
  color: #9CA3AF; letter-spacing: 0.06em; text-align: left;
  padding: 12px 16px; background: #FAFBFC;
}
.absa-um__table td {
  padding: 13px 16px; border-bottom: 1px solid #F3F4F6;
  vertical-align: middle;
}
.absa-um__table tbody tr { cursor: pointer; transition: background 100ms ease; }
.absa-um__table tbody tr:hover { background: #F9FAFB; }
.absa-um__table tbody tr:last-child td { border-bottom: none; }

.absa-um__user-cell { display: flex; align-items: center; gap: 10px; }
.absa-um__avatar {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.6rem; font-weight: 800; color: #FFF; flex-shrink: 0;
}
.absa-um__user-name { font-size: 0.7rem; font-weight: 700; color: #111827; line-height: 1.3; }
.absa-um__user-email { font-size: 0.6rem; color: #9CA3AF; font-family: 'Space Mono', monospace; }

.absa-um__role-text { font-weight: 700; color: #374151; }
.absa-um__dept-text { font-weight: 600; color: #6B7280; }

/* Status */
.absa-um__status {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: 'Space Mono', monospace; font-size: 0.55rem; font-weight: 800;
  padding: 3px 10px; border-radius: 999px; letter-spacing: 0.04em;
}
.absa-um__status--active { background: #DCFCE7; color: #16A34A; }
.absa-um__status--inactive { background: #FEE2E2; color: #DC2626; }
.absa-um__status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.absa-um__login-time { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: #6B7280; }

/* Actions */
.absa-um__actions { display: flex; align-items: center; gap: 2px; }
.absa-um__action-btn {
  width: 30px; height: 30px; display: flex; align-items: center;
  justify-content: center; border: none; background: none;
  border-radius: 6px; cursor: pointer; transition: background 150ms ease;
}
.absa-um__action-btn:hover { background: #F3F4F6; }
.absa-um__action-cell { position: relative; }
.absa-um__dropdown {
  position: absolute; right: 0; top: 100%; z-index: 20;
  background: #FFF; border: 1px solid #E8E8EC; border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08); min-width: 140px;
  overflow: hidden;
}
.absa-um__dropdown-item {
  display: block; width: 100%; text-align: left;
  padding: 9px 16px; font-size: 0.7rem; font-weight: 600; color: #374151;
  background: none; border: none; cursor: pointer;
  font-family: 'Montserrat', system-ui, sans-serif;
  transition: background 100ms ease;
}
.absa-um__dropdown-item:hover { background: #F9FAFB; color: #BE0F2C; }
.absa-um__dropdown-item--danger:hover { color: #DC2626; }
.absa-um__dropdown-item + .absa-um__dropdown-item { border-top: 1px solid #F3F4F6; }

/* Empty state */
.absa-um__empty { text-align: center; padding: 40px 20px; color: #9CA3AF; font-size: 0.75rem; font-weight: 600; }

/* Pagination */
.absa-um__pagination {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Space Mono', monospace; font-size: 0.6rem; color: #9CA3AF;
}
.absa-um__page-btns { display: flex; gap: 4px; }
.absa-um__page-btns button {
  min-width: 28px; height: 28px; display: flex; align-items: center;
  justify-content: center; border: 1px solid #E8E8EC; border-radius: 6px;
  background: #FFF; color: #4B5563; font-size: 0.6rem; font-weight: 700;
  cursor: pointer; transition: all 150ms ease;
  font-family: 'Space Mono', monospace;
}
.absa-um__page-btns button:hover { border-color: #BE0F2C; color: #BE0F2C; }
.absa-um__page-btns button:disabled { opacity: 0.35; cursor: not-allowed; }
.absa-um__page--active { background: #BE0F2C !important; color: #FFF !important; border-color: #BE0F2C !important; }

/* Sidebar column */
.absa-um__sidebar-col {
  display: flex; flex-direction: column; gap: 20px;
}

/* Cards */
.absa-um__card {
  background: #FFF; border: 1px solid #E8E8EC; border-radius: 12px;
  padding: 20px;
}
.absa-um__card-title {
  font-size: 0.65rem; font-weight: 800; color: #9CA3AF;
  letter-spacing: 0.08em; margin: 0 0 16px 0;
  font-family: 'Space Mono', monospace;
}
.absa-um__card-desc {
  font-size: 0.7rem; color: #6B7280; line-height: 1.6; margin: 0 0 16px 0;
}

/* Access Summary */
.absa-um__stat-list { display: flex; flex-direction: column; gap: 8px; }
.absa-um__stat-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; background: #F9FAFB; border-radius: 8px;
  border: 1px solid #F3F4F6;
}
.absa-um__stat-label { font-size: 0.7rem; font-weight: 700; color: #374151; }
.absa-um__stat-value { font-size: 1rem; font-weight: 900; color: #BE0F2C; }

/* Hierarchy card */
.absa-um__hierarchy-card {
  background: linear-gradient(135deg, #FFF 0%, #FDF2F4 100%);
  border-color: #FDE8EC;
}
.absa-um__hierarchy-image {
  width: 100%; height: 80px;
  background: linear-gradient(135deg, #FDE8EC 0%, #F9DCE1 50%, #FDE8EC 100%);
  border-radius: 8px; margin-bottom: 16px;
  display: flex; align-items: center; justify-content: center;
}
.absa-um__hierarchy-image::after {
  content: '';
  width: 48px; height: 48px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='%23BE0F2C' stroke-width='1.5' stroke-linecap='round'%3E%3Crect x='2' y='3' width='8' height='6' rx='1'/%3E%3Crect x='14' y='3' width='8' height='6' rx='1'/%3E%3Crect x='8' y='15' width='8' height='6' rx='1'/%3E%3Cline x1='12' y1='9' x2='12' y2='15'/%3E%3C/svg%3E");
  opacity: 0.6;
}

/* Tab content */
.absa-um__tab-content {
  display: flex; flex-direction: column; gap: 16px;
}
.absa-um__tab-desc { font-size: 0.7rem; color: #9CA3AF; margin: 0; font-family: 'Space Mono', monospace; }
.absa-um__roles-header {
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
}
.absa-um__role-name { font-weight: 700; color: #111827; }
.absa-um__role-count {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; background: #F3F4F6;
  border-radius: 6px; font-size: 0.65rem; font-weight: 800; color: #374151;
  font-family: 'Space Mono', monospace;
}
.absa-um__perm-count { font-size: 0.65rem; color: #6B7280; font-family: 'Space Mono', monospace; }

/* ═══ Permission Matrix ═══ */
.absa-um__perm-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.absa-um__perm-role-select { display: flex; align-items: center; gap: 8px; }
.absa-um__perm-role-select label { font-size: 0.65rem; font-weight: 700; color: #6B7280; font-family: 'Space Mono', monospace; white-space: nowrap; }
.absa-um__perm-role-select .absa-um__select { min-width: 160px; background: #FFF; }

.absa-um__perm-stats { display: flex; align-items: center; gap: 12px; }
.absa-um__perm-stats-bar { flex: 1; height: 6px; background: #E5E7EB; border-radius: 3px; overflow: hidden; max-width: 200px; }
.absa-um__perm-stats-fill { height: 100%; background: linear-gradient(90deg, #16A34A, #22C55E); border-radius: 3px; transition: width 400ms ease; }
.absa-um__perm-stats-label { font-size: 0.65rem; color: #6B7280; font-family: 'Space Mono', monospace; }
.absa-um__perm-stats-label strong { color: #111827; }

.absa-um__perm-modules { display: flex; flex-direction: column; gap: 10px; }
.absa-um__perm-module { background: #FFF; border: 1px solid #E8E8EC; border-radius: 10px; overflow: hidden; }
.absa-um__perm-module-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; cursor: pointer; user-select: none;
  transition: background 100ms ease;
}
.absa-um__perm-module-header:hover { background: #FAFBFC; }
.absa-um__perm-module-left { display: flex; align-items: center; gap: 10px; }
.absa-um__perm-module-icon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.6rem; font-weight: 800; color: #FFF; flex-shrink: 0;
}
.absa-um__perm-module-icon--maroon { background: #BE0F2C; }
.absa-um__perm-module-icon--blue { background: #1E40AF; }
.absa-um__perm-module-icon--amber { background: #D97706; }
.absa-um__perm-module-icon--green { background: #059669; }
.absa-um__perm-module-icon--purple { background: #7C3AED; }
.absa-um__perm-module-name { font-size: 0.75rem; font-weight: 800; color: #111827; }
.absa-um__perm-module-sub { font-size: 0.6rem; color: #9CA3AF; font-family: 'Space Mono', monospace; margin-top: 1px; }
.absa-um__perm-module-right { display: flex; align-items: center; gap: 12px; }
.absa-um__perm-module-track { width: 60px; height: 4px; background: #E5E7EB; border-radius: 2px; overflow: hidden; }
.absa-um__perm-module-track-fill { height: 100%; background: #16A34A; border-radius: 2px; transition: width 300ms ease; }
.absa-um__perm-module-actions { display: flex; gap: 4px; }
.absa-um__perm-bulk-btn {
  font-size: 0.55rem; font-weight: 700; padding: 3px 8px;
  border-radius: 4px; border: 1px solid #D1D5DB; background: #FFF;
  color: #374151; cursor: pointer; font-family: 'Space Mono', monospace;
  transition: all 100ms ease; white-space: nowrap;
}
.absa-um__perm-bulk-btn:hover { border-color: #16A34A; color: #16A34A; }
.absa-um__perm-bulk-btn--revoke:hover { border-color: #DC2626; color: #DC2626; }
.absa-um__perm-chevron { color: #9CA3AF; transition: transform 250ms ease; flex-shrink: 0; }
.absa-um__perm-chevron--open { transform: rotate(180deg); }

.absa-um__perm-module-body { border-top: 1px solid #F3F4F6; padding: 8px 16px 12px; }
.absa-um__perm-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0; gap: 12px;
}
.absa-um__perm-row + .absa-um__perm-row { border-top: 1px solid #F9FAFB; }
.absa-um__perm-row-label { font-size: 0.7rem; font-weight: 700; color: #374151; min-width: 140px; }
.absa-um__perm-row-desc { font-size: 0.6rem; color: #9CA3AF; flex: 1; font-family: 'Space Mono', monospace; }

/* Switch toggle (matching SettingsModule pattern) */
.absa-um__switch-field {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}
.absa-um__switch-field input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.absa-um__switch-control {
  position: relative;
  width: 40px;
  height: 24px;
  border-radius: 999px;
  background: #E5E7EB;
  box-shadow: inset 0 0 0 1px rgba(17,24,39,0.08);
  transition: background 160ms ease, box-shadow 160ms ease;
}
.absa-um__switch-control::after {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #FFF;
  box-shadow: 0 2px 5px rgba(17,24,39,0.22);
  content: '';
  transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.absa-um__switch-field input:checked + .absa-um__switch-control {
  background: #16A34A;
  box-shadow: inset 0 0 0 1px rgba(22,163,74,0.2);
}
.absa-um__switch-field input:checked + .absa-um__switch-control::after {
  transform: translateX(16px);
}
.absa-um__switch-field input:focus-visible + .absa-um__switch-control {
  box-shadow: 0 0 0 3px rgba(190,15,44,0.25);
}

/* Perm expand transition */
.perm-expand-enter-active { transition: all 200ms ease-out; }
.perm-expand-leave-active { transition: all 150ms ease-in; }
.perm-expand-enter-from { opacity: 0; max-height: 0; }
.perm-expand-enter-to { opacity: 1; max-height: 500px; }
.perm-expand-leave-from { opacity: 1; max-height: 500px; }
.perm-expand-leave-to { opacity: 0; max-height: 0; }

/* Modals */
.absa-um__modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; padding: 20px;
}
.absa-um__modal {
  background: #FFF; border-radius: 14px; width: 100%;
  max-width: 520px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  overflow: hidden;
}
.absa-um__modal--lg { max-width: 640px; }
.absa-um__modal--sm { max-width: 420px; }
.absa-um__modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px 0;
}
.absa-um__modal-title { font-size: 1rem; font-weight: 900; color: #111827; margin: 0; }
.absa-um__modal-close {
  width: 32px; height: 32px; display: flex; align-items: center;
  justify-content: center; border: none; background: #F3F4F6;
  border-radius: 8px; cursor: pointer; color: #6B7280;
  transition: all 150ms ease;
}
.absa-um__modal-close:hover { background: #E5E7EB; color: #111827; }
.absa-um__modal-body { padding: 20px 24px; }
.absa-um__modal-footer {
  display: flex; justify-content: flex-end; gap: 8px;
  padding: 0 24px 20px;
}

/* Form */
.absa-um__form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.absa-um__form-group { display: flex; flex-direction: column; gap: 5px; }
.absa-um__form-group label {
  font-size: 0.65rem; font-weight: 700; color: #6B7280;
  font-family: 'Space Mono', monospace; letter-spacing: 0.04em;
}
.absa-um__input {
  border: 1px solid #E5E7EB; border-radius: 6px; padding: 8px 12px;
  font-size: 0.7rem; color: #111827; outline: none;
  font-family: 'Space Mono', monospace;
  transition: border-color 150ms ease;
}
.absa-um__input:focus { border-color: #BE0F2C; }
.absa-um__input--disabled { background: #F9FAFB; color: #9CA3AF; cursor: not-allowed; }
.absa-um__textarea { resize: vertical; min-height: 60px; }
.absa-um__form-group .absa-um__select { width: 100%; background: #FFF; }

/* Delete warning */
.absa-um__delete-warn { font-size: 0.75rem; color: #6B7280; line-height: 1.6; margin: 0; }
.absa-um__delete-warn strong { color: #111827; }

/* Spinner */
.absa-um__spinner { animation: absaUMSpin 1s linear infinite; }
@keyframes absaUMSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* Toast */
.absa-um__toast-container {
  position: fixed; bottom: 24px; right: 24px; z-index: 200;
  display: flex; flex-direction: column; gap: 8px; pointer-events: none;
}
.absa-um__toast {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; border-radius: 10px; font-size: 0.7rem;
  font-weight: 700; color: #FFF; pointer-events: auto;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.absa-um__toast--success { background: #16A34A; }
.absa-um__toast--error { background: #DC2626; }

.toast-enter-active { transition: all 300ms ease-out; }
.toast-leave-active { transition: all 250ms ease-in; }
.toast-enter-from { transform: translateX(100%); opacity: 0; }
.toast-leave-to { transform: translateX(100%); opacity: 0; }

/* Modal transitions */
.modal-enter-active { transition: all 250ms ease-out; }
.modal-leave-active { transition: all 200ms ease-in; }
.modal-enter-from { opacity: 0; }
.modal-enter-from .absa-um__modal { transform: scale(0.95) translateY(10px); }
.modal-enter-to .absa-um__modal { transform: scale(1) translateY(0); }
.modal-leave-to { opacity: 0; }
.modal-leave-to .absa-um__modal { transform: scale(0.95) translateY(10px); }
.modal-enter-active .absa-um__modal { transition: all 250ms ease-out; }
.modal-leave-active .absa-um__modal { transition: all 200ms ease-in; }

/* Dropdown transitions */
.dropdown-enter-active { transition: all 150ms ease-out; }
.dropdown-leave-active { transition: all 120ms ease-in; }
.dropdown-enter-from { opacity: 0; transform: translateY(-4px); }
.dropdown-leave-to { opacity: 0; transform: translateY(-4px); }

/* Responsive */
@media (max-width: 1200px) {
  .absa-um__grid { grid-template-columns: 1fr; }
  .absa-um__sidebar-col { display: grid; grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .absa-um__header { flex-direction: column; }
  .absa-um__toolbar { flex-direction: column; align-items: stretch; }
  .absa-um__filters { flex-wrap: wrap; }
  .absa-um__search { width: 100%; }
  .absa-um__sidebar-col { grid-template-columns: 1fr; }
  .absa-um__form-grid { grid-template-columns: 1fr; }
  .absa-um__perm-topbar { flex-direction: column; align-items: stretch; }
  .absa-um__perm-row { flex-wrap: wrap; gap: 6px; }
  .absa-um__perm-row-label { min-width: 100px; }
  .absa-um__perm-row-desc { display: none; }
  .absa-um__perm-module-actions { display: none; }
  .absa-um__table-wrap { overflow-x: auto; }
  .absa-um__table { min-width: 700px; }
  .absa-um__table th:nth-child(3), .absa-um__table td:nth-child(3) { display: none; }
}
</style>
