import { adminShell } from '../layout'

export function adminPaymentsPage() {
  return adminShell({
    title: 'Payments',
    activePage: 'payments',
    extraHead: '',
    body: `
<!-- Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-in">
  <div>
    <h2 class="text-white text-xl font-bold">Payments & Subscriptions</h2>
    <p class="text-slate-500 text-sm mt-0.5">Review submissions, activate plans, and look up customer accounts</p>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <select id="status-filter" onchange="filterPayments()"
      class="bg-[#1e293b] border border-white/10 text-slate-300 text-sm rounded-xl px-4 py-2.5 cursor-pointer">
      <option value="all">All Payments</option>
      <option value="pending" selected>⏳ Pending</option>
      <option value="confirmed">✅ Confirmed</option>
      <option value="failed">❌ Failed / Rejected</option>
    </select>
    <button onclick="loadPayments()"
      class="flex items-center gap-2 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/20 text-accent-400 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
      <i class="fas fa-sync-alt text-xs"></i> Refresh
    </button>
    <button onclick="openManualModal()"
      class="flex items-center gap-2 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 text-green-400 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
      <i class="fas fa-user-check text-xs"></i> Manual Activation
    </button>
  </div>
</div>

<!-- Stats bar -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <div class="bg-[#1e293b] border border-white/6 rounded-xl p-4">
    <p class="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Payments</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-total">—</p>
  </div>
  <div class="bg-[#1e293b] border border-yellow-500/20 rounded-xl p-4">
    <p class="text-yellow-400 text-xs font-medium uppercase tracking-wider">⏳ Pending Review</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-pending">—</p>
    <p class="text-yellow-400/60 text-xs mt-1" id="stat-pending-sub"></p>
  </div>
  <div class="bg-[#1e293b] border border-green-500/20 rounded-xl p-4">
    <p class="text-green-400 text-xs font-medium uppercase tracking-wider">✅ Confirmed</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-confirmed">—</p>
  </div>
  <div class="bg-[#1e293b] border border-accent-600/20 rounded-xl p-4">
    <p class="text-accent-400 text-xs font-medium uppercase tracking-wider">Confirmed Revenue</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-revenue">—</p>
  </div>
</div>

<!-- Customer lookup bar -->
<div class="bg-[#1e293b] border border-white/8 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
  <div class="flex items-center gap-2 text-slate-400 text-sm shrink-0">
    <i class="fas fa-user-circle text-accent-400"></i>
    <span class="font-semibold text-white">Customer Lookup</span>
    <span class="text-slate-600">—</span>
    <span>find any account by email</span>
  </div>
  <div class="flex gap-2 flex-1 w-full sm:w-auto">
    <div class="relative flex-1">
      <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
      <input type="email" id="lookup-email" placeholder="customer@email.com"
        class="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-8 pr-4 py-2 text-white text-sm placeholder-slate-600"
        onkeydown="if(event.key==='Enter')lookupCustomer()">
    </div>
    <button onclick="lookupCustomer()"
      class="bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shrink-0">
      Look Up
    </button>
  </div>
</div>

<!-- Customer account panel (hidden until lookup) -->
<div id="customer-panel" class="bg-[#1e293b] border border-accent-600/30 rounded-2xl overflow-hidden mb-6" style="display:none">
  <div class="flex items-center justify-between px-5 py-3.5 bg-accent-600/10 border-b border-accent-600/20">
    <div class="flex items-center gap-2">
      <i class="fas fa-user-circle text-accent-400"></i>
      <span class="text-white font-bold text-sm" id="cp-title">Customer Account</span>
    </div>
    <button onclick="closeCustomerPanel()" class="text-slate-400 hover:text-white text-xs"><i class="fas fa-times"></i></button>
  </div>
  <div class="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Account info -->
    <div>
      <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Account Details</p>
      <div class="space-y-2.5 text-sm" id="cp-details"></div>
    </div>
    <!-- Quick actions -->
    <div>
      <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Quick Actions</p>
      <div class="space-y-2" id="cp-actions"></div>
    </div>
  </div>
  <!-- Payment history for this customer -->
  <div class="border-t border-white/6 px-5 pb-5">
    <p class="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-4 mb-3">Payment History</p>
    <div id="cp-payments" class="space-y-2"></div>
  </div>
</div>

<!-- Loading state -->
<div id="payments-loading" class="text-center py-16">
  <i class="fas fa-spinner fa-spin text-accent-400 text-2xl mb-3"></i>
  <p class="text-slate-500 text-sm">Loading payments…</p>
</div>

<!-- Empty state -->
<div id="payments-empty" class="text-center py-16" style="display:none">
  <div class="w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
    <i class="fas fa-credit-card text-slate-500 text-2xl"></i>
  </div>
  <h3 class="text-white font-semibold text-lg mb-2">No payments found</h3>
  <p class="text-slate-500 text-sm">Payments will appear here when users subscribe via Venmo/Zelle/PayPal.</p>
</div>

<!-- Payments table -->
<div id="payments-table-wrap" class="bg-[#1e293b] border border-white/6 rounded-2xl overflow-hidden" style="display:none">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[800px]">
      <thead>
        <tr class="bg-[#0f172a]/50 border-b border-white/5">
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Customer</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Plan</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Amount</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Method</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Submitted</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">TXN / Note</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Status</th>
          <th class="text-right px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody id="payments-tbody" class="divide-y divide-white/4"></tbody>
    </table>
  </div>
  <div class="px-5 py-3 border-t border-white/5 text-xs text-slate-500" id="payments-count-bar"></div>
</div>

<!-- ── Payment Detail / Approve Modal ──────────────────────────────── -->
<div id="payment-detail-modal" class="fixed inset-0 z-50 hidden items-center justify-center"
  onclick="if(event.target===this)closePaymentDetail()">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  <div class="relative bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-lg mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/10">
      <h3 class="text-white font-bold text-lg" id="pd-title">Payment Detail</h3>
      <button onclick="closePaymentDetail()" class="text-slate-400 hover:text-white"><i class="fas fa-times text-lg"></i></button>
    </div>
    <div id="payment-detail-body" class="p-5"></div>
    <div id="payment-detail-actions" class="px-5 pb-5 flex gap-3"></div>
  </div>
</div>

<!-- ── Manual Activation Modal ─────────────────────────────────────── -->
<div id="manual-modal" class="fixed inset-0 z-50 hidden items-center justify-center"
  onclick="if(event.target===this)closeManualModal()">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  <div class="relative bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/10">
      <h3 class="text-white font-bold">Manual Plan Activation</h3>
      <button onclick="closeManualModal()" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5 space-y-4">
      <p class="text-slate-400 text-sm">Use this when a customer paid cash, in-person, or you need to manually grant access. A confirmed payment record is created for your audit trail.</p>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Customer Email *</label>
        <input type="email" id="manual-email" placeholder="customer@email.com"
          class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan *</label>
          <select id="manual-plan" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="free">Free</option>
            <option value="starter">Starter</option>
            <option value="pro" selected>Pro</option>
            <option value="elite">Elite</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Billing</label>
          <select id="manual-billing" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Payment Method</label>
          <select id="manual-method" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="venmo">Venmo</option>
            <option value="zelle">Zelle</option>
            <option value="paypal">PayPal</option>
            <option value="card">Card</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Amount ($)</label>
          <input type="number" id="manual-amount" placeholder="19" min="0"
            class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Transaction ID / Note</label>
        <input type="text" id="manual-note" placeholder="TXN ID, confirmation #, or notes"
          class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
      </div>
      <div id="manual-error" class="text-red-400 text-sm hidden"></div>
      <div class="pt-1 flex gap-3">
        <button onclick="closeManualModal()"
          class="flex-1 border border-white/10 text-slate-400 hover:text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Cancel</button>
        <button onclick="submitManualActivation()" id="manual-btn"
          class="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
          <i class="fas fa-user-check text-xs"></i> Activate Plan
        </button>
      </div>
    </div>
  </div>
</div>

<script>
let _allPayments = [];
let _currentFilter = 'pending';
let _currentCustomer = null;

const planColors  = { starter: '#22c55e', pro: '#2563eb', elite: '#d97706', free: '#475569' };
const planPrices  = { free: 0, starter: 9, pro: 19, elite: 29 };
const statusCls   = {
  pending:   'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/10 border border-green-500/20 text-green-400',
  failed:    'bg-red-500/10 border border-red-500/20 text-red-400',
};
const methodIcons = { venmo: '📱', zelle: '📲', paypal: '🅿️', card: '💳' };

// ── Load all payments ─────────────────────────────────────────────
async function loadPayments() {
  document.getElementById('payments-loading').style.display = 'block';
  document.getElementById('payments-table-wrap').style.display = 'none';
  document.getElementById('payments-empty').style.display = 'none';
  try {
    const res = await fetch('/api/admin/payments');
    if (!res.ok) { showToast('Failed to load payments', 'error'); return; }
    const data = await res.json();
    _allPayments = (data.payments || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    updateStats();
    renderPayments();
  } catch(e) {
    showToast('Network error loading payments', 'error');
  } finally {
    document.getElementById('payments-loading').style.display = 'none';
  }
}

// ── Stats bar ─────────────────────────────────────────────────────
function updateStats() {
  const total     = _allPayments.length;
  const pending   = _allPayments.filter(p => p.status === 'pending');
  const confirmed = _allPayments.filter(p => p.status === 'confirmed').length;
  const revenue   = _allPayments
    .filter(p => p.status === 'confirmed')
    .reduce((s, p) => s + parseFloat((p.amount || '0').replace('$','')), 0);

  document.getElementById('stat-total').textContent     = total;
  document.getElementById('stat-pending').textContent   = pending.length;
  document.getElementById('stat-confirmed').textContent = confirmed;
  document.getElementById('stat-revenue').textContent   = '$' + revenue.toFixed(2);

  // Show methods breakdown in pending sub-line
  if (pending.length) {
    const byMethod = {};
    pending.forEach(p => byMethod[p.method] = (byMethod[p.method]||0)+1);
    document.getElementById('stat-pending-sub').textContent =
      Object.entries(byMethod).map(([m,c]) => (methodIcons[m]||'') + ' ' + c + ' ' + m).join(' · ');
  } else {
    document.getElementById('stat-pending-sub').textContent = 'all clear';
  }
}

// ── Filter ────────────────────────────────────────────────────────
function filterPayments() {
  _currentFilter = document.getElementById('status-filter').value;
  renderPayments();
}

function renderPayments() {
  const list = _currentFilter === 'all'
    ? _allPayments
    : _allPayments.filter(p => p.status === _currentFilter);

  const countBar = document.getElementById('payments-count-bar');
  if (!list.length) {
    document.getElementById('payments-table-wrap').style.display = 'none';
    document.getElementById('payments-empty').style.display = 'block';
    return;
  }
  document.getElementById('payments-empty').style.display = 'none';
  document.getElementById('payments-table-wrap').style.display = 'block';

  countBar.textContent = 'Showing ' + list.length + ' of ' + _allPayments.length + ' payments';

  const tbody = document.getElementById('payments-tbody');
  tbody.innerHTML = list.map(p => {
    const date      = new Date(p.createdAt);
    const dateStr   = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    + ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const pc        = planColors[p.plan] || '#475569';
    const sc        = statusCls[p.status] || statusCls.pending;
    const mi        = methodIcons[p.method] || '💳';
    const noteShort = (p.note || '—').length > 28 ? p.note.slice(0, 25) + '…' : (p.note || '—');
    const idStr     = JSON.stringify(JSON.stringify(p.id));

    let actions = '';
    if (p.status === 'pending') {
      actions =
        '<button onclick="quickApprove(' + idStr + ')" title="Approve & activate plan" class="flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-check"></i> Approve</button>' +
        '<button onclick="quickReject(' + idStr + ')" title="Reject — plan stays inactive" class="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-times"></i> Reject</button>' +
        '<button onclick="openPaymentDetail(' + idStr + ')" title="View full details" class="text-slate-400 hover:text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all"><i class="fas fa-expand-alt"></i></button>';
    } else {
      actions =
        '<button onclick="openPaymentDetail(' + idStr + ')" class="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all">View</button>' +
        '<button onclick="lookupByEmail(' + JSON.stringify(JSON.stringify(p.email)) + ')" title="Open customer account" class="text-accent-400 hover:text-accent-300 text-xs px-2.5 py-1.5 rounded-lg border border-accent-600/20 hover:border-accent-600/40 transition-all"><i class="fas fa-user"></i></button>';
    }

    return \`
    <tr class="hover:bg-white/[0.02] transition-colors">
      <td class="px-5 py-3.5">
        <div class="text-white text-sm font-medium">\${p.name || '—'}</div>
        <div class="text-slate-500 text-xs flex items-center gap-1.5">
          \${p.email}
          <button onclick="lookupByEmail(\${JSON.stringify(JSON.stringify(p.email))})" title="Look up account"
            class="text-accent-400/60 hover:text-accent-400 transition-colors"><i class="fas fa-external-link-alt text-[10px]"></i></button>
        </div>
      </td>
      <td class="px-5 py-3.5">
        <span class="text-xs font-bold px-2 py-1 rounded-full capitalize" style="color:\${pc};background:\${pc}22;border:1px solid \${pc}44">
          \${p.plan?.toUpperCase() || 'FREE'}
        </span>
        <div class="text-slate-600 text-xs mt-0.5">\${p.billing || 'monthly'}</div>
      </td>
      <td class="px-5 py-3.5">
        <span class="text-white font-bold text-sm">\${p.amount}</span>
      </td>
      <td class="px-5 py-3.5">
        <span class="text-white text-sm">\${mi} \${(p.method||'').charAt(0).toUpperCase()+(p.method||'').slice(1)}</span>
        \${p.venmoHandle ? '<div class="text-slate-500 text-xs">@'+p.venmoHandle+'</div>' : ''}
      </td>
      <td class="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">\${dateStr}</td>
      <td class="px-5 py-3.5">
        <span class="text-slate-400 text-xs font-mono" title="\${p.note || ''}">\${noteShort}</span>
      </td>
      <td class="px-5 py-3.5">
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full \${sc}">
          \${p.status === 'pending' ? '⏳ Pending' : p.status === 'confirmed' ? '✅ Confirmed' : '❌ Failed'}
        </span>
      </td>
      <td class="px-5 py-3.5">
        <div class="flex items-center justify-end gap-1.5">\${actions}</div>
      </td>
    </tr>\`;
  }).join('');
}

// ── Quick approve / reject (inline table buttons) ─────────────────
async function quickApprove(idJson) {
  const id = JSON.parse(idJson);
  const p = _allPayments.find(x => x.id === id);
  if (!p) return;
  if (!confirm('Approve payment from ' + p.name + ' (' + p.email + ')?\n\nPlan: ' + p.plan.toUpperCase() + ' · ' + p.amount + '\n\nThis will immediately activate their plan.')) return;
  await doApprove(id);
}

async function quickReject(idJson) {
  const id = JSON.parse(idJson);
  const p = _allPayments.find(x => x.id === id);
  if (!p) return;
  if (!confirm('Reject payment from ' + p.name + '?\n\nTheir plan will NOT be activated.')) return;
  await doReject(id);
}

async function doApprove(id) {
  try {
    const res = await fetch('/api/admin/payment/approve', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ paymentId: id })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Approval failed', 'error'); return; }
    showToast('✅ Payment approved — plan activated!', 'success');
    await loadPayments();
    // Refresh customer panel if open for this email
    if (_currentCustomer) {
      const p = _allPayments.find(x => x.id === id);
      if (p && p.email === _currentCustomer) lookupCustomer(_currentCustomer);
    }
  } catch(e) { showToast('Network error', 'error'); }
}

async function doReject(id) {
  try {
    const res = await fetch('/api/admin/payment/reject', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ paymentId: id })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Rejection failed', 'error'); return; }
    showToast('Payment marked as failed.', 'warning');
    await loadPayments();
  } catch(e) { showToast('Network error', 'error'); }
}

// ── Payment detail modal ──────────────────────────────────────────
function openPaymentDetail(idJson) {
  const id  = JSON.parse(idJson);
  const p   = _allPayments.find(x => x.id === id);
  if (!p) return;

  const sc  = statusCls[p.status] || statusCls.pending;
  const mi  = methodIcons[p.method] || '💳';
  const pc  = planColors[p.plan] || '#475569';

  document.getElementById('pd-title').textContent = p.status === 'pending'
    ? '⏳ Pending Payment — action required'
    : p.status === 'confirmed' ? '✅ Confirmed Payment' : '❌ Failed / Rejected';

  document.getElementById('payment-detail-body').innerHTML = \`
    <div class="space-y-3 text-sm">
      <div class="flex justify-between items-start gap-2">
        <span class="text-slate-400 shrink-0">Customer</span>
        <div class="text-right">
          <p class="text-white font-semibold">\${p.name || '—'}</p>
          <p class="text-slate-500 text-xs">\${p.email}</p>
        </div>
      </div>
      <div class="flex justify-between"><span class="text-slate-400">Plan</span>
        <span class="font-bold text-xs px-2 py-1 rounded-full capitalize" style="color:\${pc};background:\${pc}22;border:1px solid \${pc}44">\${(p.plan||'').toUpperCase()}</span>
      </div>
      <div class="flex justify-between"><span class="text-slate-400">Amount</span><span class="text-white font-bold">\${p.amount} / \${p.billing||'month'}</span></div>
      <div class="flex justify-between"><span class="text-slate-400">Method</span><span class="text-white">\${mi} \${(p.method||'').charAt(0).toUpperCase()+(p.method||'').slice(1)}</span></div>
      \${p.venmoHandle ? '<div class="flex justify-between"><span class="text-slate-400">Handle</span><span class="text-white">@'+p.venmoHandle+'</span></div>' : ''}
      \${p.note ? '<div class="flex justify-between items-center gap-4"><span class="text-slate-400 shrink-0">TXN / Note</span><span class="text-green-300 font-mono text-xs break-all text-right">'+p.note+'</span></div>' : '<div class="flex justify-between"><span class="text-slate-400">TXN / Note</span><span class="text-slate-600 italic text-xs">not provided</span></div>'}
      <div class="flex justify-between"><span class="text-slate-400">Submitted</span><span class="text-white text-xs">\${new Date(p.createdAt).toLocaleString()}</span></div>
      \${p.confirmedAt ? '<div class="flex justify-between"><span class="text-slate-400">Confirmed at</span><span class="text-white text-xs">'+new Date(p.confirmedAt).toLocaleString()+'</span></div>' : ''}
      <div class="flex justify-between items-center pt-1 border-t border-white/5">
        <span class="text-slate-400">Status</span>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full \${sc}">\${p.status}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-slate-400">Payment ID</span>
        <span class="text-slate-600 font-mono text-[10px]">\${p.id}</span>
      </div>
    </div>
  \`;

  const actEl = document.getElementById('payment-detail-actions');
  const idStr = JSON.stringify(JSON.stringify(p.id));
  if (p.status === 'pending') {
    actEl.innerHTML =
      '<button onclick="doApprove(' + idStr + ');closePaymentDetail()" class="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 font-bold py-3 rounded-xl transition-all text-sm"><i class="fas fa-check mr-2"></i>Approve & Activate</button>' +
      '<button onclick="doReject(' + idStr + ');closePaymentDetail()" class="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold py-3 rounded-xl transition-all text-sm"><i class="fas fa-times mr-2"></i>Reject</button>';
  } else {
    actEl.innerHTML =
      '<button onclick="lookupByEmail(' + JSON.stringify(JSON.stringify(p.email)) + ');closePaymentDetail()" class="flex-1 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/20 text-accent-400 font-semibold py-3 rounded-xl transition-all text-sm"><i class="fas fa-user mr-2"></i>View Account</button>' +
      '<button onclick="closePaymentDetail()" class="flex-1 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 font-semibold py-3 rounded-xl transition-all text-sm">Close</button>';
  }

  const modal = document.getElementById('payment-detail-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closePaymentDetail() {
  const modal = document.getElementById('payment-detail-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// ── Customer lookup ───────────────────────────────────────────────
async function lookupCustomer(emailOverride) {
  const email = emailOverride || document.getElementById('lookup-email').value.trim().toLowerCase();
  if (!email) { showToast('Enter a customer email', 'error'); return; }

  document.getElementById('lookup-email').value = email;

  try {
    const [userRes, paymentsRes] = await Promise.all([
      fetch('/api/admin/users/' + encodeURIComponent(email)),
      fetch('/api/admin/payments'),
    ]);

    if (!userRes.ok) {
      if (userRes.status === 404) showToast('No account found for ' + email, 'error');
      else showToast('Lookup failed', 'error');
      closeCustomerPanel();
      return;
    }

    const userData = await userRes.json();
    const paymentsData = await paymentsRes.json();
    const u = userData.user;
    _currentCustomer = email;

    const userPayments = (paymentsData.payments || [])
      .filter(p => p.email === email)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    renderCustomerPanel(u, userPayments);
  } catch(e) {
    showToast('Network error during lookup', 'error');
  }
}

function lookupByEmail(emailJson) {
  const email = JSON.parse(emailJson);
  document.getElementById('lookup-email').value = email;
  document.getElementById('customer-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  lookupCustomer(email);
}

function closeCustomerPanel() {
  document.getElementById('customer-panel').style.display = 'none';
  _currentCustomer = null;
}

function renderCustomerPanel(u, userPayments) {
  const pc = planColors[u.plan] || '#475569';
  const joined = u.joined ? new Date(u.joined).toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'}) : '—';
  const lastLogin = u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('en-US', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) : 'Never';

  document.getElementById('cp-title').textContent = u.name + ' — ' + u.email;

  document.getElementById('cp-details').innerHTML = \`
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 bg-accent-600/20 rounded-full flex items-center justify-center text-accent-400 font-bold text-sm">
        \${(u.name||'?').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}
      </div>
      <div>
        <p class="text-white font-semibold text-sm">\${u.name}</p>
        <p class="text-slate-500 text-xs">\${u.email}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
      <div><span class="text-slate-500">Plan</span><br>
        <span class="font-bold capitalize" style="color:\${pc}">\${u.plan?.toUpperCase()}</span>
      </div>
      <div><span class="text-slate-500">Payment Status</span><br>
        <span class="text-white">\${u.paymentStatus || 'none'}</span>
      </div>
      <div><span class="text-slate-500">Level</span><br><span class="text-white">\${u.level||'—'}</span></div>
      <div><span class="text-slate-500">Location</span><br><span class="text-white">\${u.location||'—'}</span></div>
      <div><span class="text-slate-500">Joined</span><br><span class="text-white">\${joined}</span></div>
      <div><span class="text-slate-500">Last Login</span><br><span class="text-white">\${lastLogin}</span></div>
      <div><span class="text-slate-500">Sessions</span><br><span class="text-white">\${u.sessionsCompleted||0}</span></div>
      <div><span class="text-slate-500">Streak</span><br><span class="text-orange-400">\${u.streak > 0 ? '🔥 ' + u.streak + ' days' : '—'}</span></div>
    </div>
  \`;

  const emailEnc = encodeURIComponent(u.email);
  const emailJson = JSON.stringify(JSON.stringify(u.email));

  document.getElementById('cp-actions').innerHTML = \`
    <div class="space-y-2">
      <p class="text-slate-600 text-xs uppercase font-semibold tracking-wider">Change Plan</p>
      <div class="flex flex-wrap gap-2">
        \${['free','starter','pro','elite'].map(p => \`
          <button onclick="setCustomerPlan('\${emailEnc}', '\${p}')"
            class="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all \${u.plan===p ? 'border-accent-600 text-accent-400 bg-accent-600/10' : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'}">
            \${p.charAt(0).toUpperCase()+p.slice(1)}\${u.plan===p ? ' ✓' : ''}
          </button>
        \`).join('')}
      </div>
      <div class="border-t border-white/6 pt-2 mt-2 flex flex-wrap gap-2">
        <button onclick="openManualModal(\${emailJson})"
          class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-500/20 text-green-400 hover:bg-green-500/10 transition-all">
          <i class="fas fa-money-check-alt"></i> Record Payment
        </button>
        <button onclick="showPasswordReset(\${emailJson})"
          class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-all">
          <i class="fas fa-key"></i> Reset Password
        </button>
      </div>
    </div>
  \`;

  // Payment history
  const cpPayEl = document.getElementById('cp-payments');
  if (!userPayments.length) {
    cpPayEl.innerHTML = '<p class="text-slate-600 text-sm italic">No payment records on file for this account.</p>';
  } else {
    cpPayEl.innerHTML = userPayments.map(p => {
      const sc  = statusCls[p.status] || statusCls.pending;
      const mi  = methodIcons[p.method] || '💳';
      const dt  = new Date(p.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      const idStr = JSON.stringify(JSON.stringify(p.id));
      return \`
      <div class="flex items-center gap-3 bg-[#0f172a]/60 rounded-xl px-4 py-3">
        <span class="text-lg">\${mi}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-white text-sm font-semibold">\${p.plan?.toUpperCase()} — \${p.amount}</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full \${sc}">\${p.status}</span>
          </div>
          <p class="text-slate-500 text-xs">\${dt} · \${(p.method||'').charAt(0).toUpperCase()+(p.method||'').slice(1)}\${p.note ? ' · ' + p.note : ''}</p>
        </div>
        \${p.status === 'pending' ? '<div class="flex gap-1.5 shrink-0"><button onclick="doApprove('+idStr+');lookupCustomer(\''+u.email+'\')" class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all"><i class="fas fa-check mr-1"></i>Approve</button><button onclick="doReject('+idStr+');lookupCustomer(\''+u.email+'\')" class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"><i class="fas fa-times"></i></button></div>' : ''}
      </div>\`;
    }).join('');
  }

  document.getElementById('customer-panel').style.display = 'block';
}

// ── Set plan directly from customer panel ─────────────────────────
async function setCustomerPlan(emailEnc, plan) {
  const email = decodeURIComponent(emailEnc);
  if (!confirm('Change ' + email + '\'s plan to ' + plan.toUpperCase() + '?\n\nThis updates their account immediately without creating a payment record. Use "Record Payment" if you want an audit trail.')) return;
  try {
    const res = await fetch('/api/admin/users/' + emailEnc, {
      method: 'PUT', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ plan })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Update failed', 'error'); return; }
    showToast('Plan updated to ' + plan.toUpperCase(), 'success');
    lookupCustomer(email);
    await loadPayments();
  } catch(e) { showToast('Network error', 'error'); }
}

// ── Password reset helper ─────────────────────────────────────────
function showPasswordReset(emailJson) {
  const email = JSON.parse(emailJson);
  const pw = prompt('Set a new temporary password for ' + email + ':\n(minimum 8 characters)');
  if (!pw) return;
  if (pw.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
  // Call the users PUT endpoint with a password field (we need to add that)
  fetch('/api/admin/users/' + encodeURIComponent(email), {
    method: 'PUT', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ password: pw })
  }).then(r => r.json()).then(d => {
    if (d.ok) showToast('Password reset for ' + email, 'success');
    else showToast(d.error || 'Reset failed', 'error');
  }).catch(() => showToast('Network error', 'error'));
}

// ── Manual activation modal ───────────────────────────────────────
function openManualModal(emailJson) {
  const email = emailJson ? JSON.parse(emailJson) : '';
  document.getElementById('manual-email').value = email;
  document.getElementById('manual-error').classList.add('hidden');
  document.getElementById('manual-btn').textContent = 'Activate Plan';
  document.getElementById('manual-btn').disabled = false;

  // Auto-fill price based on plan
  const planSel = document.getElementById('manual-plan');
  const amtEl   = document.getElementById('manual-amount');
  function fillPrice() { amtEl.value = planPrices[planSel.value] || 0; }
  planSel.onchange = fillPrice;
  fillPrice();

  const modal = document.getElementById('manual-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeManualModal() {
  const modal = document.getElementById('manual-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

async function submitManualActivation() {
  const email   = document.getElementById('manual-email').value.trim();
  const plan    = document.getElementById('manual-plan').value;
  const billing = document.getElementById('manual-billing').value;
  const method  = document.getElementById('manual-method').value;
  const amount  = document.getElementById('manual-amount').value;
  const note    = document.getElementById('manual-note').value.trim();
  const errEl   = document.getElementById('manual-error');

  if (!email) { errEl.textContent = 'Customer email is required'; errEl.classList.remove('hidden'); return; }
  errEl.classList.add('hidden');

  const btn = document.getElementById('manual-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i> Activating…';
  btn.disabled = true;

  try {
    const res = await fetch('/api/admin/payment/manual', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, plan, billing, method, amount, note })
    });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error || 'Activation failed'; errEl.classList.remove('hidden'); return; }
    closeManualModal();
    showToast('✅ ' + email + ' activated on ' + plan.toUpperCase() + ' plan!', 'success');
    await loadPayments();
    if (_currentCustomer === email.toLowerCase()) lookupCustomer(email);
  } catch(e) {
    errEl.textContent = 'Network error — please try again';
    errEl.classList.remove('hidden');
  } finally {
    btn.innerHTML = '<i class="fas fa-user-check text-xs"></i> Activate Plan';
    btn.disabled = false;
  }
}

// ── Toast ─────────────────────────────────────────────────────────
function showToast(msg, type) {
  // Use global showToast from admin shell if available, otherwise inline
  const t = document.getElementById('admin-toast') || (() => {
    const el = document.createElement('div');
    el.id = 'admin-toast';
    document.body.appendChild(el);
    return el;
  })();
  const colors = {
    success: 'bg-green-500/20 border border-green-500/30 text-green-300',
    error:   'bg-red-500/20 border border-red-500/30 text-red-300',
    warning: 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300',
    info:    'bg-accent-600/20 border border-accent-600/30 text-accent-300',
  };
  t.className = 'fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xl ' + (colors[type] || colors.success);
  t.textContent = msg;
  t.style.display = 'flex';
  setTimeout(() => { t.style.display = 'none'; }, 4000);
}

// ── Init ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', loadPayments);
</script>

<div id="admin-toast" class="fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xl" style="display:none"></div>
`
  })
}
