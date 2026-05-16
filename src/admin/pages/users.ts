import { adminShell } from '../layout'

export function adminUsersPage() {
  return adminShell({
    title: 'User Management',
    activePage: 'users',
    body: `
<!-- Header row -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <p class="text-slate-400 text-sm" id="user-subtitle">Loading users…</p>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <div class="relative">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
      <input type="text" id="user-search" placeholder="Search users…" oninput="searchUsers(this.value)"
        class="bg-[#1e293b] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-slate-600 w-56">
    </div>
    <button onclick="openModal('add-user-modal')"
      class="bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2">
      <i class="fas fa-user-plus text-xs"></i> Add User
    </button>
    <button onclick="confirmDeleteAll()"
      class="bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 hover:text-red-300 text-sm font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2">
      <i class="fas fa-trash-alt text-xs"></i> Delete All
    </button>
  </div>
</div>

<!-- Plan filter pills -->
<div class="flex flex-wrap gap-2 mb-5" id="filter-pills">
  <!-- Populated by JS after data loads -->
</div>

<!-- Users table -->
<div class="bg-[#1e293b] border border-white/6 rounded-2xl overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[700px]">
      <thead>
        <tr class="bg-[#0f172a]/60 border-b border-white/5">
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">User</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Plan</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Joined</th>
          <th class="text-center px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Sessions</th>
          <th class="text-center px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Streak</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Status</th>
          <th class="text-center px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody id="users-tbody" class="divide-y divide-white/4">
        <tr id="loading-row">
          <td colspan="7" class="px-5 py-10 text-center text-slate-500">
            <i class="fas fa-spinner fa-spin mr-2"></i>Loading users…
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
    <span id="user-count-label">—</span>
    <span id="data-source-label">Live data from Cloudflare KV</span>
  </div>
</div>

<!-- Add User Modal -->
<div id="add-user-modal" class="fixed inset-0 z-[100] modal-bg items-center justify-center hidden"
  onclick="if(event.target===this)closeModal('add-user-modal')">
  <div class="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/8">
      <h3 class="text-white font-bold">Add New User</h3>
      <button onclick="closeModal('add-user-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Full Name *</label>
        <input type="text" id="new-user-name" placeholder="Enter full name"
          class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email *</label>
        <input type="email" id="new-user-email" placeholder="email@example.com"
          class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan</label>
        <select id="new-user-plan" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
          <option value="free">Free</option>
          <option value="starter">Starter — $9/mo</option>
          <option value="pro">Pro — $19/mo</option>
          <option value="elite">Elite — $29/mo</option>
        </select>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Temp Password</label>
        <input type="text" id="new-user-pass" placeholder="Leave blank to auto-generate"
          class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div id="add-user-error" class="text-red-400 text-sm hidden"></div>
      <div class="pt-2 flex gap-3">
        <button onclick="closeModal('add-user-modal')"
          class="flex-1 border border-white/10 text-slate-400 hover:text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Cancel</button>
        <button onclick="saveNewUser()" id="add-user-btn"
          class="flex-1 bg-accent-600 hover:bg-accent-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all">Create User</button>
      </div>
    </div>
  </div>
</div>

<!-- Edit User Modal -->
<div id="edit-user-modal" class="fixed inset-0 z-[100] modal-bg items-center justify-center hidden"
  onclick="if(event.target===this)closeModal('edit-user-modal')">
  <div class="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/8">
      <h3 class="text-white font-bold">Edit User</h3>
      <button onclick="closeModal('edit-user-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5 space-y-4">
      <input type="hidden" id="edit-user-email-original">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Full Name</label>
        <input type="text" id="edit-user-name"
          class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email (read-only)</label>
        <input type="email" id="edit-user-email-display" readonly
          class="w-full bg-[#0f172a]/50 border border-white/5 rounded-xl px-4 py-2.5 text-slate-500 text-sm cursor-not-allowed">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan</label>
        <select id="edit-user-plan" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
          <option value="free">Free</option>
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
          <option value="elite">Elite</option>
        </select>
      </div>
      <div id="edit-user-error" class="text-red-400 text-sm hidden"></div>
      <div class="pt-2 flex gap-3">
        <button onclick="closeModal('edit-user-modal')"
          class="flex-1 border border-white/10 text-slate-400 hover:text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Cancel</button>
        <button onclick="saveEditUser()" id="edit-user-btn"
          class="flex-1 bg-accent-600 hover:bg-accent-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all">Save Changes</button>
      </div>
    </div>
  </div>
</div>

<script>
// ── State ─────────────────────────────────────────────────────────
let ALL_USERS = [];
let activeFilter = 'all';

// ── Load users from API ───────────────────────────────────────────
async function loadUsers() {
  try {
    const res = await fetch('/api/admin/users');
    if (!res.ok) throw new Error('Failed to load users (status ' + res.status + ')');
    const data = await res.json();
    ALL_USERS = data.users || [];
    renderUsers(ALL_USERS);
    renderFilterPills();
    updateSubtitle();
  } catch (err) {
    document.getElementById('users-tbody').innerHTML =
      '<tr><td colspan="7" class="px-5 py-10 text-center text-red-400"><i class="fas fa-exclamation-triangle mr-2"></i>' + err.message + '</td></tr>';
    document.getElementById('user-subtitle').textContent = 'Failed to load users';
  }
}

// ── Render table rows ─────────────────────────────────────────────
function renderUsers(users) {
  const tbody = document.getElementById('users-tbody');
  if (!users.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="px-5 py-10 text-center text-slate-500">No users found</td></tr>';
    document.getElementById('user-count-label').textContent = '0 users';
    return;
  }

  tbody.innerHTML = users.map(u => {
    const initials = (u.name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const joined = u.joined ? u.joined.split('T')[0] : '—';
    const statusColor = u.paymentStatus === 'confirmed'
      ? 'text-green-400 bg-green-500/10 border-green-500/20'
      : u.paymentStatus === 'pending'
        ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
        : 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    const statusLabel = u.paymentStatus || 'active';
    const emailSafe = encodeURIComponent(u.email);
    const nameSafe = (u.name || '').replace(/'/g, "\\'");
    return \`
    <tr class="table-row user-row" data-plan="\${u.plan}" data-name="\${(u.name || '').toLowerCase()}" data-email="\${u.email.toLowerCase()}">
      <td class="px-5 py-3.5">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-accent-600/20 rounded-full flex items-center justify-center text-accent-400 text-xs font-bold flex-shrink-0">\${initials}</div>
          <div>
            <p class="text-white text-sm font-medium">\${u.name || '(no name)'}</p>
            <p class="text-slate-500 text-xs">\${u.email}</p>
          </div>
        </div>
      </td>
      <td class="px-5 py-3.5">
        <span class="badge-\${u.plan} text-xs font-semibold px-2.5 py-1 rounded-full border">
          \${(u.plan || 'free').charAt(0).toUpperCase() + (u.plan || 'free').slice(1)}
        </span>
      </td>
      <td class="px-5 py-3.5 text-slate-400 text-sm">\${joined}</td>
      <td class="px-5 py-3.5 text-center text-white text-sm font-semibold">\${u.sessionsCompleted || 0}</td>
      <td class="px-5 py-3.5 text-center">
        <span class="text-orange-400 text-sm font-semibold">\${u.streak > 0 ? '🔥 ' + u.streak : '—'}</span>
      </td>
      <td class="px-5 py-3.5">
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full border \${statusColor} capitalize">\${statusLabel}</span>
      </td>
      <td class="px-5 py-3.5">
        <div class="flex items-center justify-center gap-2">
          <button onclick="editUser('\${emailSafe}','\${nameSafe}','\${u.plan || 'free'}')"
            class="text-accent-400 hover:text-accent-300 hover:bg-accent-600/10 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="Edit user">
            <i class="fas fa-edit text-xs"></i>
          </button>
          <button onclick="deleteUser('\${emailSafe}','\${nameSafe}')"
            class="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="Delete user">
            <i class="fas fa-trash text-xs"></i>
          </button>
        </div>
      </td>
    </tr>\`;
  }).join('');

  document.getElementById('user-count-label').textContent = 'Showing ' + users.length + ' of ' + ALL_USERS.length + ' users · Live KV data';
}

// ── Filter pills ──────────────────────────────────────────────────
function renderFilterPills() {
  const counts = { all: ALL_USERS.length, free: 0, starter: 0, pro: 0, elite: 0 };
  ALL_USERS.forEach(u => { if (counts[u.plan] !== undefined) counts[u.plan]++; });

  const pills = [
    { label: 'All Users', val: 'all' },
    { label: 'Free',      val: 'free' },
    { label: 'Starter',   val: 'starter' },
    { label: 'Pro',       val: 'pro' },
    { label: 'Elite',     val: 'elite' },
  ];

  document.getElementById('filter-pills').innerHTML = pills.map(f => \`
    <button onclick="filterUsers('\${f.val}')" id="filter-\${f.val}"
      class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 \${f.val === activeFilter ? 'bg-accent-600 text-white' : 'bg-[#1e293b] text-slate-400 hover:text-white border border-white/8'}"
      data-filter="\${f.val}">
      \${f.label}
      <span class="bg-white/10 px-1.5 py-0.5 rounded-full">\${counts[f.val]}</span>
    </button>
  \`).join('');
}

function updateSubtitle() {
  document.getElementById('user-subtitle').textContent =
    ALL_USERS.length + ' real user' + (ALL_USERS.length !== 1 ? 's' : '') + ' · Cloudflare KV';
}

// ── Filter ────────────────────────────────────────────────────────
function filterUsers(plan) {
  activeFilter = plan;
  document.querySelectorAll('[data-filter]').forEach(btn => {
    const isActive = btn.dataset.filter === plan;
    btn.className = 'px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ' +
      (isActive ? 'bg-accent-600 text-white' : 'bg-[#1e293b] text-slate-400 hover:text-white border border-white/8');
  });
  const q = document.getElementById('user-search').value.toLowerCase();
  applyFilters(plan, q);
}

function searchUsers(q) {
  q = q.toLowerCase();
  applyFilters(activeFilter, q);
}

function applyFilters(plan, q) {
  const filtered = ALL_USERS.filter(u => {
    const matchPlan = plan === 'all' || u.plan === plan;
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchPlan && matchSearch;
  });
  renderUsers(filtered);
}

// ── Delete single user ────────────────────────────────────────────
async function deleteUser(emailEncoded, name) {
  const email = decodeURIComponent(emailEncoded);
  if (!confirm('Delete user "' + name + '" (' + email + ')? This cannot be undone.')) return;
  try {
    const res = await fetch('/api/admin/users/' + emailEncoded, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Delete failed');
    showToast('User "' + name + '" deleted', 'warning');
    await loadUsers();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

// ── Delete all users ──────────────────────────────────────────────
async function confirmDeleteAll() {
  if (!confirm('Delete ALL users? This will permanently remove every account (admin account is preserved). This cannot be undone.')) return;
  if (!confirm('Are you absolutely sure? ALL user data will be deleted from the database.')) return;
  try {
    const res = await fetch('/api/admin/users/all', { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Delete failed');
    showToast('Deleted ' + data.deleted + ' user' + (data.deleted !== 1 ? 's' : ''), 'warning');
    await loadUsers();
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

// ── Edit user ─────────────────────────────────────────────────────
function editUser(emailEncoded, name, plan) {
  const email = decodeURIComponent(emailEncoded);
  document.getElementById('edit-user-email-original').value = emailEncoded;
  document.getElementById('edit-user-name').value = name;
  document.getElementById('edit-user-email-display').value = email;
  document.getElementById('edit-user-plan').value = plan;
  document.getElementById('edit-user-error').classList.add('hidden');
  openModal('edit-user-modal');
}

async function saveEditUser() {
  const emailEncoded = document.getElementById('edit-user-email-original').value;
  const name = document.getElementById('edit-user-name').value.trim();
  const plan = document.getElementById('edit-user-plan').value;
  const errEl = document.getElementById('edit-user-error');
  if (!name) { errEl.textContent = 'Name is required'; errEl.classList.remove('hidden'); return; }
  errEl.classList.add('hidden');
  const btn = document.getElementById('edit-user-btn');
  btn.textContent = 'Saving…'; btn.disabled = true;
  try {
    const res = await fetch('/api/admin/users/' + emailEncoded, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, plan }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Update failed');
    closeModal('edit-user-modal');
    showToast('User updated successfully', 'success');
    await loadUsers();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.remove('hidden');
  } finally {
    btn.textContent = 'Save Changes'; btn.disabled = false;
  }
}

// ── Add new user ──────────────────────────────────────────────────
async function saveNewUser() {
  const name = document.getElementById('new-user-name').value.trim();
  const email = document.getElementById('new-user-email').value.trim();
  const plan = document.getElementById('new-user-plan').value;
  const password = document.getElementById('new-user-pass').value.trim();
  const errEl = document.getElementById('add-user-error');

  if (!name || !email) {
    errEl.textContent = 'Name and email are required';
    errEl.classList.remove('hidden');
    return;
  }
  errEl.classList.add('hidden');
  const btn = document.getElementById('add-user-btn');
  btn.textContent = 'Creating…'; btn.disabled = true;
  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, plan, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Create failed');
    closeModal('add-user-modal');
    document.getElementById('new-user-name').value = '';
    document.getElementById('new-user-email').value = '';
    document.getElementById('new-user-pass').value = '';
    document.getElementById('new-user-plan').value = 'free';
    showToast('User "' + name + '" created', 'success');
    await loadUsers();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.remove('hidden');
  } finally {
    btn.textContent = 'Create User'; btn.disabled = false;
  }
}

// ── Init ──────────────────────────────────────────────────────────
loadUsers();
</script>
`
  })
}
