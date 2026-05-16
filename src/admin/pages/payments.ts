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
    <p class="text-slate-500 text-sm mt-0.5">Review Venmo/Zelle/PayPal submissions and activate plans</p>
  </div>
  <div class="flex items-center gap-3">
    <select id="status-filter" onchange="filterPayments()" class="bg-[#1e293b] border border-white/10 text-slate-300 text-sm rounded-xl px-4 py-2.5 cursor-pointer">
      <option value="all">All Payments</option>
      <option value="pending" selected>⏳ Pending</option>
      <option value="confirmed">✅ Confirmed</option>
      <option value="failed">❌ Failed</option>
    </select>
    <button onclick="loadPayments()" class="flex items-center gap-2 bg-accent-600/10 hover:bg-accent-600/20 border border-accent-600/20 text-accent-400 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
      <i class="fas fa-sync-alt text-xs"></i> Refresh
    </button>
  </div>
</div>

<!-- Stats bar -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <div class="bg-[#1e293b] border border-white/6 rounded-xl p-4">
    <p class="text-slate-500 text-xs font-medium">Total Payments</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-total">—</p>
  </div>
  <div class="bg-[#1e293b] border border-yellow-500/20 rounded-xl p-4">
    <p class="text-yellow-400 text-xs font-medium">Pending Review</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-pending">—</p>
  </div>
  <div class="bg-[#1e293b] border border-green-500/20 rounded-xl p-4">
    <p class="text-green-400 text-xs font-medium">Confirmed</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-confirmed">—</p>
  </div>
  <div class="bg-[#1e293b] border border-accent-600/20 rounded-xl p-4">
    <p class="text-accent-400 text-xs font-medium">Confirmed Revenue</p>
    <p class="text-white text-2xl font-bold mt-1" id="stat-revenue">—</p>
  </div>
</div>

<!-- Loading state -->
<div id="payments-loading" class="text-center py-16">
  <i class="fas fa-spinner fa-spin text-accent-400 text-2xl mb-3"></i>
  <p class="text-slate-500 text-sm">Loading payments...</p>
</div>

<!-- Empty state -->
<div id="payments-empty" class="text-center py-16" style="display:none">
  <div class="w-16 h-16 bg-slate-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
    <i class="fas fa-credit-card text-slate-500 text-2xl"></i>
  </div>
  <h3 class="text-white font-semibold text-lg mb-2">No payments found</h3>
  <p class="text-slate-500 text-sm">Payments will appear here when users subscribe.</p>
</div>

<!-- Payments table -->
<div id="payments-table-wrap" class="bg-[#1e293b] border border-white/6 rounded-2xl overflow-hidden" style="display:none">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[800px]">
      <thead>
        <tr class="bg-[#0f172a]/50 border-b border-white/5">
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">User</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Plan</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Amount</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Method</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Submitted</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Status</th>
          <th class="text-right px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody id="payments-tbody" class="divide-y divide-white/4"></tbody>
    </table>
  </div>
</div>

<!-- Payment detail modal -->
<div id="payment-detail-modal" class="fixed inset-0 z-50 flex items-center justify-center" style="display:none" onclick="if(event.target===this)closePaymentDetail()">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
  <div class="relative bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/10">
      <h3 class="text-white font-bold text-lg">Payment Detail</h3>
      <button onclick="closePaymentDetail()" class="text-slate-400 hover:text-white"><i class="fas fa-times text-lg"></i></button>
    </div>
    <div id="payment-detail-body" class="p-5"></div>
    <div id="payment-detail-actions" class="px-5 pb-5 flex gap-3"></div>
  </div>
</div>

<!-- Toast notification -->
<div id="admin-toast" class="fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xl transition-all" style="display:none"></div>

<script>
let _allPayments = [];
let _currentFilter = 'pending';

const planColors = { starter: '#22c55e', pro: '#2563eb', elite: '#d97706', free: '#475569' };
const statusColors = {
  pending:   'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/10 border border-green-500/20 text-green-400',
  failed:    'bg-red-500/10 border border-red-500/20 text-red-400',
};
const methodIcons = { venmo: '📱', zelle: '📲', paypal: '🅿️', card: '💳' };

async function loadPayments() {
  document.getElementById('payments-loading').style.display = 'block';
  document.getElementById('payments-table-wrap').style.display = 'none';
  document.getElementById('payments-empty').style.display = 'none';

  try {
    const res = await fetch('/api/admin/payments');
    if (!res.ok) { showToast('Failed to load payments', 'error'); return; }
    const data = await res.json();
    _allPayments = data.payments || [];
    updateStats();
    renderPayments();
  } catch(e) {
    showToast('Network error loading payments', 'error');
  } finally {
    document.getElementById('payments-loading').style.display = 'none';
  }
}

function updateStats() {
  const total = _allPayments.length;
  const pending = _allPayments.filter(p => p.status === 'pending').length;
  const confirmed = _allPayments.filter(p => p.status === 'confirmed').length;
  const revenue = _allPayments
    .filter(p => p.status === 'confirmed')
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-confirmed').textContent = confirmed;
  document.getElementById('stat-revenue').textContent = '$' + revenue.toFixed(2);
}

function filterPayments() {
  _currentFilter = document.getElementById('status-filter').value;
  renderPayments();
}

function renderPayments() {
  const filter = _currentFilter;
  const list = filter === 'all' ? _allPayments : _allPayments.filter(p => p.status === filter);

  if (list.length === 0) {
    document.getElementById('payments-table-wrap').style.display = 'none';
    document.getElementById('payments-empty').style.display = 'block';
    return;
  }

  document.getElementById('payments-empty').style.display = 'none';
  document.getElementById('payments-table-wrap').style.display = 'block';

  const tbody = document.getElementById('payments-tbody');
  tbody.innerHTML = list.map(p => {
    const date = new Date(p.createdAt);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const planColor = planColors[p.plan] || '#475569';
    const statusCls = statusColors[p.status] || statusColors.pending;
    const methodIcon = methodIcons[p.method] || '💳';

    let actionBtns = '';
    if (p.status === 'pending') {
      actionBtns =
        '<button onclick="approvePayment(' + JSON.stringify(JSON.stringify(p.id)) + ')" class="flex items-center gap-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-check text-xs"></i> Approve</button>' +
        '<button onclick="rejectPayment(' + JSON.stringify(JSON.stringify(p.id)) + ')" class="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-times text-xs"></i> Reject</button>';
    } else {
      actionBtns = '<button onclick="openPaymentDetail(' + JSON.stringify(JSON.stringify(p.id)) + ')" class="text-slate-400 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all">View</button>';
    }

    return \`
      <tr class="table-row hover:bg-white/[0.02] transition-colors">
        <td class="px-5 py-4">
          <div class="text-white text-sm font-medium">\${p.name || '—'}</div>
          <div class="text-slate-500 text-xs">\${p.email}</div>
        </td>
        <td class="px-5 py-4">
          <span class="text-xs font-bold px-2 py-1 rounded-full" style="color:\${planColor};background:\${planColor}22;border:1px solid \${planColor}44">
            \${p.plan?.toUpperCase() || 'FREE'}
          </span>
          <div class="text-slate-600 text-xs mt-0.5">\${p.billing || 'monthly'}</div>
        </td>
        <td class="px-5 py-4">
          <span class="text-white font-bold text-sm">$\${p.amount}</span>
          <span class="text-slate-500 text-xs">/mo</span>
        </td>
        <td class="px-5 py-4">
          <span class="text-white text-sm">\${methodIcon} \${(p.method || '').charAt(0).toUpperCase() + (p.method || '').slice(1)}</span>
          \${p.venmoHandle ? '<div class="text-slate-500 text-xs">@' + p.venmoHandle + '</div>' : ''}
        </td>
        <td class="px-5 py-4 text-slate-400 text-xs">\${dateStr}</td>
        <td class="px-5 py-4">
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full \${statusCls}">
            \${p.status === 'pending' ? '⏳ Pending' : p.status === 'confirmed' ? '✅ Confirmed' : '❌ Failed'}
          </span>
        </td>
        <td class="px-5 py-4">
          <div class="flex items-center justify-end gap-2">\${actionBtns}</div>
        </td>
      </tr>
    \`;
  }).join('');
}

function openPaymentDetail(idJson) {
  const id = JSON.parse(idJson);
  const p = _allPayments.find(x => x.id === id);
  if (!p) return;

  const dateStr = new Date(p.createdAt).toLocaleString();
  const confirmedStr = p.confirmedAt ? new Date(p.confirmedAt).toLocaleString() : '—';
  const statusCls = statusColors[p.status] || statusColors.pending;
  const methodIcon = methodIcons[p.method] || '💳';

  document.getElementById('payment-detail-body').innerHTML = \`
    <div class="space-y-3 text-sm">
      <div class="flex justify-between"><span class="text-slate-400">Payment ID</span><span class="text-white font-mono text-xs">\${p.id}</span></div>
      <div class="flex justify-between"><span class="text-slate-400">User</span><span class="text-white">\${p.name}</span></div>
      <div class="flex justify-between"><span class="text-slate-400">Email</span><span class="text-white">\${p.email}</span></div>
      <div class="flex justify-between"><span class="text-slate-400">Plan</span><span class="text-white font-bold">\${(p.plan||'').toUpperCase()}</span></div>
      <div class="flex justify-between"><span class="text-slate-400">Amount</span><span class="text-white font-bold">$\${p.amount}/mo</span></div>
      <div class="flex justify-between"><span class="text-slate-400">Billing</span><span class="text-white">\${p.billing || 'monthly'}</span></div>
      <div class="flex justify-between"><span class="text-slate-400">Method</span><span class="text-white">\${methodIcon} \${(p.method||'').charAt(0).toUpperCase()+(p.method||'').slice(1)}</span></div>
      \${p.venmoHandle ? '<div class="flex justify-between"><span class="text-slate-400">Handle</span><span class="text-white">@' + p.venmoHandle + '</span></div>' : ''}
      \${p.note ? '<div class="flex justify-between"><span class="text-slate-400">TXN ID</span><span class="text-green-300 font-mono text-xs">' + p.note + '</span></div>' : ''}
      <div class="flex justify-between"><span class="text-slate-400">Submitted</span><span class="text-white text-xs">\${dateStr}</span></div>
      \${p.confirmedAt ? '<div class="flex justify-between"><span class="text-slate-400">Confirmed</span><span class="text-white text-xs">' + confirmedStr + '</span></div>' : ''}
      <div class="flex justify-between items-center"><span class="text-slate-400">Status</span><span class="text-xs font-semibold px-2.5 py-1 rounded-full \${statusCls}">\${p.status}</span></div>
    </div>
  \`;

  const actionsEl = document.getElementById('payment-detail-actions');
  if (p.status === 'pending') {
    actionsEl.innerHTML =
      '<button onclick="approvePayment(' + JSON.stringify(JSON.stringify(p.id)) + ');closePaymentDetail()" class="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 font-semibold py-2.5 rounded-xl transition-all text-sm"><i class="fas fa-check mr-1"></i>Approve</button>' +
      '<button onclick="rejectPayment(' + JSON.stringify(JSON.stringify(p.id)) + ');closePaymentDetail()" class="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold py-2.5 rounded-xl transition-all text-sm"><i class="fas fa-times mr-1"></i>Reject</button>';
  } else {
    actionsEl.innerHTML = '<button onclick="closePaymentDetail()" class="w-full text-slate-400 hover:text-white py-2.5 text-sm">Close</button>';
  }

  document.getElementById('payment-detail-modal').style.display = 'flex';
}

function closePaymentDetail() {
  document.getElementById('payment-detail-modal').style.display = 'none';
}

async function approvePayment(idJson) {
  const id = JSON.parse(idJson);
  if (!confirm('Approve this payment and activate the user\\'s plan?')) return;
  try {
    const res = await fetch('/api/admin/payment/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: id })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Approval failed', 'error'); return; }
    showToast('✅ Payment approved! Plan activated.', 'success');
    await loadPayments();
  } catch(e) {
    showToast('Network error', 'error');
  }
}

async function rejectPayment(idJson) {
  const id = JSON.parse(idJson);
  if (!confirm('Reject this payment? The user\\'s plan will NOT be activated.')) return;
  try {
    const res = await fetch('/api/admin/payment/reject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: id })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || 'Rejection failed', 'error'); return; }
    showToast('Payment rejected.', 'info');
    await loadPayments();
  } catch(e) {
    showToast('Network error', 'error');
  }
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('admin-toast');
  const colors = {
    success: 'bg-green-500/20 border border-green-500/30 text-green-300',
    error:   'bg-red-500/20 border border-red-500/30 text-red-300',
    info:    'bg-accent-600/20 border border-accent-600/30 text-accent-300',
  };
  t.className = 'fixed top-6 right-6 z-[200] px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 shadow-xl ' + (colors[type] || colors.success);
  t.textContent = msg;
  t.style.display = 'flex';
  setTimeout(() => t.style.display = 'none', 4000);
}

// Load on page ready
document.addEventListener('DOMContentLoaded', loadPayments);
</script>
`
  })
}
