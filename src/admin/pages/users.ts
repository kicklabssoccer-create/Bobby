import { adminShell } from '../layout'

const MOCK_USERS = [
  { id:'u001', name:'Marcus Silva',    email:'marcus.silva@email.com',   plan:'pro',     joined:'2025-11-12', sessions:48, streak:14, status:'active'   },
  { id:'u002', name:'Sarah Jones',     email:'sarah.jones@email.com',    plan:'elite',   joined:'2025-09-04', sessions:132, streak:31, status:'active'   },
  { id:'u003', name:'Tom Baker',       email:'tom.baker@email.com',       plan:'free',    joined:'2026-03-18', sessions:3,   streak:0,  status:'cancelled' },
  { id:'u004', name:'Aisha Kamara',    email:'aisha.kamara@email.com',   plan:'starter', joined:'2026-01-07', sessions:22,  streak:5,  status:'active'    },
  { id:'u005', name:'Luca Romano',     email:'luca.romano@email.com',    plan:'pro',     joined:'2025-12-20', sessions:61,  streak:9,  status:'active'    },
  { id:'u006', name:'Emma Zhang',      email:'emma.zhang@email.com',     plan:'elite',   joined:'2025-08-15', sessions:204, streak:42, status:'active'    },
  { id:'u007', name:'Diego Morales',   email:'diego.morales@email.com',  plan:'starter', joined:'2026-02-11', sessions:14,  streak:2,  status:'active'    },
  { id:'u008', name:'Fatima Hassan',   email:'fatima.hassan@email.com',  plan:'free',    joined:'2026-04-01', sessions:1,   streak:0,  status:'trial'     },
  { id:'u009', name:'James O\'Brien',  email:'james.obrien@email.com',   plan:'pro',     joined:'2025-10-30', sessions:88,  streak:22, status:'active'    },
  { id:'u010', name:'Yuki Tanaka',     email:'yuki.tanaka@email.com',    plan:'elite',   joined:'2025-07-22', sessions:310, streak:67, status:'active'    },
  { id:'u011', name:'Carlos Reyes',    email:'carlos.reyes@email.com',   plan:'starter', joined:'2026-03-05', sessions:9,   streak:3,  status:'active'    },
  { id:'u012', name:'Priya Sharma',    email:'priya.sharma@email.com',   plan:'pro',     joined:'2026-01-19', sessions:42,  streak:11, status:'active'    },
]

export function adminUsersPage() {
  const planCounts = {
    free:    MOCK_USERS.filter(u => u.plan === 'free').length,
    starter: MOCK_USERS.filter(u => u.plan === 'starter').length,
    pro:     MOCK_USERS.filter(u => u.plan === 'pro').length,
    elite:   MOCK_USERS.filter(u => u.plan === 'elite').length,
  }

  return adminShell({
    title: 'User Management',
    activePage: 'users',
    body: `
<!-- Header row -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <p class="text-slate-400 text-sm">${MOCK_USERS.length} users shown (demo data — connect a database for live records)</p>
  </div>
  <div class="flex items-center gap-3">
    <div class="relative">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
      <input type="text" id="user-search" placeholder="Search users..." oninput="searchUsers(this.value)"
        class="bg-[#1e293b] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-slate-600 w-56">
    </div>
    <button onclick="openModal('add-user-modal')" class="bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2">
      <i class="fas fa-user-plus text-xs"></i> Add User
    </button>
  </div>
</div>

<!-- Plan filter pills -->
<div class="flex flex-wrap gap-2 mb-5">
  ${[
    { label:'All Users',  val:'all',     count: MOCK_USERS.length },
    { label:'Free',       val:'free',    count: planCounts.free    },
    { label:'Starter',    val:'starter', count: planCounts.starter  },
    { label:'Pro',        val:'pro',     count: planCounts.pro      },
    { label:'Elite',      val:'elite',   count: planCounts.elite    },
  ].map((f, i) => `
    <button onclick="filterUsers('${f.val}')" id="filter-${f.val}"
      class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${i === 0 ? 'bg-accent-600 text-white' : 'bg-[#1e293b] text-slate-400 hover:text-white border border-white/8'}"
      data-filter="${f.val}">
      ${f.label}
      <span class="bg-white/10 px-1.5 py-0.5 rounded-full">${f.count}</span>
    </button>
  `).join('')}
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
        ${MOCK_USERS.map(u => {
          const initials = u.name.split(' ').map(n => n[0]).join('')
          const statusColor = u.status === 'active' ? 'text-green-400 bg-green-500/10 border-green-500/20'
            : u.status === 'trial' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
            : 'text-red-400 bg-red-500/10 border-red-500/20'
          return `
          <tr class="table-row user-row" data-plan="${u.plan}" data-name="${u.name.toLowerCase()}" data-email="${u.email.toLowerCase()}">
            <td class="px-5 py-3.5">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-accent-600/20 rounded-full flex items-center justify-center text-accent-400 text-xs font-bold flex-shrink-0">${initials}</div>
                <div>
                  <p class="text-white text-sm font-medium">${u.name}</p>
                  <p class="text-slate-500 text-xs">${u.email}</p>
                </div>
              </div>
            </td>
            <td class="px-5 py-3.5">
              <span class="badge-${u.plan} text-xs font-semibold px-2.5 py-1 rounded-full border">
                ${u.plan.charAt(0).toUpperCase() + u.plan.slice(1)}
              </span>
            </td>
            <td class="px-5 py-3.5 text-slate-400 text-sm">${u.joined}</td>
            <td class="px-5 py-3.5 text-center text-white text-sm font-semibold">${u.sessions}</td>
            <td class="px-5 py-3.5 text-center">
              <span class="text-orange-400 text-sm font-semibold">${u.streak > 0 ? '🔥 ' + u.streak : '—'}</span>
            </td>
            <td class="px-5 py-3.5">
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor} capitalize">${u.status}</span>
            </td>
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-center gap-2">
                <button onclick="editUser('${u.id}','${u.name}','${u.email}','${u.plan}')"
                  class="text-accent-400 hover:text-accent-300 hover:bg-accent-600/10 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="Edit">
                  <i class="fas fa-edit text-xs"></i>
                </button>
                <button onclick="changePlan('${u.id}','${u.name}','${u.plan}')"
                  class="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="Change Plan">
                  <i class="fas fa-tag text-xs"></i>
                </button>
                <button onclick="deleteUser('${u.id}','${u.name}')"
                  class="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="Delete">
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
            </td>
          </tr>`
        }).join('')}
      </tbody>
    </table>
  </div>
  <div class="px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
    <span id="user-count-label">Showing ${MOCK_USERS.length} of ${MOCK_USERS.length} users</span>
    <span>Demo data · Connect database for live records</span>
  </div>
</div>

<!-- Add User Modal -->
<div id="add-user-modal" class="fixed inset-0 z-[100] modal-bg items-center justify-center hidden" onclick="if(event.target===this)closeModal('add-user-modal')">
  <div class="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/8">
      <h3 class="text-white font-bold">Add New User</h3>
      <button onclick="closeModal('add-user-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Full Name</label>
        <input type="text" id="new-user-name" placeholder="Enter full name" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
        <input type="email" id="new-user-email" placeholder="email@example.com" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan</label>
        <select id="new-user-plan" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
          <option value="free">Free</option>
          <option value="starter">Starter — $9.99/mo</option>
          <option value="pro">Pro — $19.99/mo</option>
          <option value="elite">Elite — $34.99/mo</option>
        </select>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Temp Password</label>
        <input type="text" id="new-user-pass" placeholder="Set initial password" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div class="pt-2 flex gap-3">
        <button onclick="closeModal('add-user-modal')" class="flex-1 border border-white/10 text-slate-400 hover:text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Cancel</button>
        <button onclick="saveNewUser()" class="flex-1 bg-accent-600 hover:bg-accent-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all">Create User</button>
      </div>
    </div>
  </div>
</div>

<!-- Edit User Modal -->
<div id="edit-user-modal" class="fixed inset-0 z-[100] modal-bg items-center justify-center hidden" onclick="if(event.target===this)closeModal('edit-user-modal')">
  <div class="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/8">
      <h3 class="text-white font-bold">Edit User</h3>
      <button onclick="closeModal('edit-user-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5 space-y-4">
      <input type="hidden" id="edit-user-id">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Full Name</label>
        <input type="text" id="edit-user-name" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
        <input type="email" id="edit-user-email" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
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
      <div class="pt-2 flex gap-3">
        <button onclick="closeModal('edit-user-modal')" class="flex-1 border border-white/10 text-slate-400 hover:text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Cancel</button>
        <button onclick="saveEditUser()" class="flex-1 bg-accent-600 hover:bg-accent-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all">Save Changes</button>
      </div>
    </div>
  </div>
</div>

<script>
function filterUsers(plan) {
  document.querySelectorAll('[data-filter]').forEach(btn => {
    const isActive = btn.dataset.filter === plan;
    btn.className = 'px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ' + (isActive ? 'bg-accent-600 text-white' : 'bg-[#1e293b] text-slate-400 hover:text-white border border-white/8');
  });
  let visible = 0;
  document.querySelectorAll('.user-row').forEach(row => {
    const match = plan === 'all' || row.dataset.plan === plan;
    row.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('user-count-label').textContent = 'Showing ' + visible + ' of ${MOCK_USERS.length} users';
}

function searchUsers(q) {
  q = q.toLowerCase();
  let visible = 0;
  document.querySelectorAll('.user-row').forEach(row => {
    const match = row.dataset.name.includes(q) || row.dataset.email.includes(q);
    row.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('user-count-label').textContent = 'Showing ' + visible + ' of ${MOCK_USERS.length} users';
}

function editUser(id, name, email, plan) {
  document.getElementById('edit-user-id').value = id;
  document.getElementById('edit-user-name').value = name;
  document.getElementById('edit-user-email').value = email;
  document.getElementById('edit-user-plan').value = plan;
  openModal('edit-user-modal');
}

function saveEditUser() {
  const name = document.getElementById('edit-user-name').value;
  closeModal('edit-user-modal');
  showToast('User "' + name + '" updated successfully', 'success');
}

function saveNewUser() {
  const name = document.getElementById('new-user-name').value.trim();
  const email = document.getElementById('new-user-email').value.trim();
  if (!name || !email) { showToast('Please fill in all required fields', 'error'); return; }
  closeModal('add-user-modal');
  showToast('User "' + name + '" created successfully', 'success');
}

function changePlan(id, name, currentPlan) {
  const plans = ['free','starter','pro','elite'];
  const newPlan = prompt('Change plan for ' + name + '\\nCurrent: ' + currentPlan + '\\nEnter new plan (free/starter/pro/elite):');
  if (newPlan && plans.includes(newPlan.toLowerCase())) {
    showToast(name + ' plan changed to ' + newPlan, 'success');
  } else if (newPlan) {
    showToast('Invalid plan. Use: free, starter, pro, or elite', 'error');
  }
}

function deleteUser(id, name) {
  if (confirm('Delete user "' + name + '"? This cannot be undone.')) {
    showToast('User "' + name + '" deleted', 'warning');
  }
}
</script>
`
  })
}
