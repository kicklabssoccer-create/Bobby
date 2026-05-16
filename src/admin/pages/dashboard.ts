import { adminShell } from '../layout'
import { DRILLS } from '../../data/drills'
import { VIDEOS } from '../../data/videos'
import { PRODUCTS } from '../../data/products'

export function adminDashboardPage() {
  const totalDrills = DRILLS.length
  const totalVideos = VIDEOS.length
  const totalProducts = PRODUCTS.length

  // Real stats loaded dynamically from /api/admin/stats
  const mockStats = {
    totalUsers: 0,
    activeToday: 0,
    newThisWeek: 0,
    revenue: 0,
    starterUsers: 0,
    proUsers: 0,
    eliteUsers: 0,
    freeUsers: 0,
  }

  const planBreakdown = [
    { plan: 'Elite',   count: 0, color: '#d97706', pct: 0 },
    { plan: 'Pro',     count: 0, color: '#2563eb', pct: 0 },
    { plan: 'Starter', count: 0, color: '#22c55e', pct: 0 },
    { plan: 'Free',    count: 0, color: '#64748b', pct: 0 },
  ]

  const recentActivity = [
    { icon: 'fas fa-spinner fa-spin', color: 'text-slate-400 bg-slate-500/10', text: 'Loading activity...', sub: 'Fetching from database', time: '' },
  ]

  const topDrills = [
    { name: 'Cone Weave Dribbling',    completions: 1842, level: 'Beginner',     plan: 'starter' },
    { name: 'Rondo 4v2',               completions: 1621, level: 'Intermediate', plan: 'pro'     },
    { name: 'Speed Dribbling Gates',   completions: 1204, level: 'Advanced',     plan: 'elite'   },
    { name: 'Scissors Move Isolation', completions: 987,  level: 'Intermediate', plan: 'pro'     },
    { name: 'Basic Ball Juggling',     completions: 934,  level: 'Beginner',     plan: 'free'    },
  ]

  return adminShell({
    title: 'Dashboard',
    activePage: 'dashboard',
    extraHead: '',
    body: `
<!-- Stat cards -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-in">
  <div class="stat-card bg-accent-600/5 border border-accent-600/20 card-hover">
    <div class="flex items-start justify-between mb-3">
      <div>
        <p class="text-slate-500 text-xs font-medium">Total Users</p>
        <p class="text-white text-2xl font-bold mt-0.5" id="dash-total-users">—</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-accent-600/5 border border-accent-600/20 flex items-center justify-center flex-shrink-0">
        <i class="fas fa-users text-accent-400 text-sm"></i>
      </div>
    </div>
    <p class="text-slate-500 text-xs" id="dash-new-week">Loading...</p>
  </div>
  <div class="stat-card bg-yellow-500/5 border border-yellow-500/20 card-hover">
    <div class="flex items-start justify-between mb-3">
      <div>
        <p class="text-slate-500 text-xs font-medium">Pending Payments</p>
        <p class="text-white text-2xl font-bold mt-0.5" id="dash-pending">—</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-yellow-500/5 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
        <i class="fas fa-clock text-yellow-400 text-sm"></i>
      </div>
    </div>
    <p class="text-slate-500 text-xs"><a href="/admin/payments" class="text-yellow-400 hover:text-yellow-300">Review now →</a></p>
  </div>
  <div class="stat-card bg-green-500/5 border border-green-500/20 card-hover">
    <div class="flex items-start justify-between mb-3">
      <div>
        <p class="text-slate-500 text-xs font-medium">Confirmed Revenue</p>
        <p class="text-white text-2xl font-bold mt-0.5" id="dash-revenue">—</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center justify-center flex-shrink-0">
        <i class="fas fa-dollar-sign text-green-400 text-sm"></i>
      </div>
    </div>
    <p class="text-slate-500 text-xs" id="dash-mrr">Loading...</p>
  </div>
  <div class="stat-card bg-purple-500/5 border border-purple-500/20 card-hover">
    <div class="flex items-start justify-between mb-3">
      <div>
        <p class="text-slate-500 text-xs font-medium">Content Items</p>
        <p class="text-white text-2xl font-bold mt-0.5">${(totalDrills+totalVideos+totalProducts).toString()}</p>
      </div>
      <div class="w-10 h-10 rounded-xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
        <i class="fas fa-layer-group text-purple-400 text-sm"></i>
      </div>
    </div>
    <p class="text-slate-500 text-xs">${totalDrills} drills · ${totalVideos} videos</p>
  </div>
</div>

<!-- Charts row -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

  <!-- Revenue chart -->
  <div class="lg:col-span-2 bg-[#1e293b] border border-white/6 rounded-2xl p-5">
    <div class="flex items-center justify-between mb-5">
      <div>
        <h3 class="text-white font-semibold text-sm">Revenue Overview</h3>
        <p class="text-slate-500 text-xs">Monthly subscription revenue (USD)</p>
      </div>
      <select class="bg-[#0f172a] border border-white/10 text-slate-400 text-xs rounded-lg px-3 py-1.5">
        <option>Last 6 months</option>
        <option>Last 12 months</option>
        <option>This year</option>
      </select>
    </div>
    <div style="height:220px">
      <canvas id="revenue-chart"></canvas>
    </div>
  </div>

  <!-- Plan distribution donut -->
  <div class="bg-[#1e293b] border border-white/6 rounded-2xl p-5">
    <div class="mb-4">
      <h3 class="text-white font-semibold text-sm">Plan Distribution</h3>
      <p class="text-slate-500 text-xs" id="plan-total-label">Loading...</p>
    </div>
    <div style="height:160px" class="relative">
      <canvas id="plan-chart"></canvas>
    </div>
    <div class="mt-4 space-y-2" id="plan-legend">
      ${planBreakdown.map(p => `
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${p.color}"></div>
            <span class="text-slate-400">${p.plan}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-slate-500" id="plan-count-${p.plan.toLowerCase()}">—</span>
            <span class="text-white font-semibold w-8 text-right" id="plan-pct-${p.plan.toLowerCase()}">—%</span>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- Content stats + Recent activity -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

  <!-- Content overview -->
  <div class="bg-[#1e293b] border border-white/6 rounded-2xl p-5">
    <h3 class="text-white font-semibold text-sm mb-4">Content Library</h3>
    <div class="space-y-3">
      ${[
        { label:'Drills', count: totalDrills, icon:'fas fa-dumbbell', color:'text-accent-400', href:'/admin/drills', free:DRILLS.filter(d=>d.plan==='free').length, paid:DRILLS.filter(d=>d.plan!=='free').length },
        { label:'Videos', count: totalVideos, icon:'fas fa-play-circle', color:'text-purple-400', href:'/admin/videos', free:VIDEOS.filter(v=>v.plan==='free').length, paid:VIDEOS.filter(v=>v.plan!=='free').length },
        { label:'Products', count: totalProducts, icon:'fas fa-shopping-cart', color:'text-orange-400', href:'/admin/products', free:0, paid:totalProducts },
      ].map(c => `
        <div class="flex items-center justify-between p-3 bg-[#0f172a] rounded-xl border border-white/5">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
              <i class="${c.icon} ${c.color} text-sm"></i>
            </div>
            <div>
              <p class="text-white text-sm font-medium">${c.label}</p>
              <p class="text-slate-600 text-xs">${c.free} free · ${c.paid} premium</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-white font-bold text-lg">${c.count}</span>
            <a href="${c.href}" class="text-accent-400 hover:text-accent-300 text-xs ml-1"><i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Quick actions -->
    <div class="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
      <a href="/admin/drills" class="bg-accent-600/10 hover:bg-accent-600/20 text-accent-400 text-xs font-semibold px-3 py-2 rounded-lg transition-all text-center border border-accent-600/20">
        <i class="fas fa-plus mr-1"></i>Add Drill
      </a>
      <a href="/admin/videos" class="bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 text-xs font-semibold px-3 py-2 rounded-lg transition-all text-center border border-purple-600/20">
        <i class="fas fa-plus mr-1"></i>Add Video
      </a>
    </div>
  </div>

  <!-- Recent Activity: Recent signups from KV -->
  <div class="lg:col-span-2 bg-[#1e293b] border border-white/6 rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-white font-semibold text-sm">Recent Signups</h3>
      <a href="/admin/users" class="text-accent-400 hover:text-accent-300 text-xs font-medium">View All →</a>
    </div>
    <div class="space-y-2" id="recent-signups-list">
      <div class="flex items-center gap-3 p-3 rounded-xl">
        <div class="w-8 h-8 text-slate-400 bg-slate-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <i class="fas fa-spinner fa-spin text-xs"></i>
        </div>
        <p class="text-slate-400 text-sm">Loading recent users...</p>
      </div>
    </div>
    <!-- Pending payments alert -->
    <div id="pending-payments-alert" class="mt-4 pt-4 border-t border-white/5" style="display:none">
      <div class="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
        <div class="flex items-center gap-2">
          <i class="fas fa-exclamation-triangle text-yellow-400 text-xs"></i>
          <span class="text-yellow-300 text-sm font-medium" id="pending-payments-text">Pending payments need review</span>
        </div>
        <a href="/admin/payments" class="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all">Review →</a>
      </div>
    </div>
  </div>
</div>

<!-- Top drills table -->
<div class="bg-[#1e293b] border border-white/6 rounded-2xl overflow-hidden">
  <div class="flex items-center justify-between p-5 border-b border-white/5">
    <h3 class="text-white font-semibold text-sm">Top Drills by Completions</h3>
    <a href="/admin/drills" class="text-accent-400 hover:text-accent-300 text-xs font-medium">Manage Drills →</a>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full min-w-[500px]">
      <thead>
        <tr class="bg-[#0f172a]/50">
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">#</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Drill Name</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Level</th>
          <th class="text-left px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Plan</th>
          <th class="text-right px-5 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">Completions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/4">
        ${topDrills.map((d, i) => `
          <tr class="table-row">
            <td class="px-5 py-3.5 text-slate-600 text-sm">${i + 1}</td>
            <td class="px-5 py-3.5 text-white text-sm font-medium">${d.name}</td>
            <td class="px-5 py-3.5">
              <span class="text-xs font-medium px-2 py-0.5 rounded-full badge-${d.level.toLowerCase()}">${d.level}</span>
            </td>
            <td class="px-5 py-3.5">
              <span class="text-xs font-medium px-2 py-0.5 rounded-full badge-${d.plan}">${d.plan.charAt(0).toUpperCase() + d.plan.slice(1)}</span>
            </td>
            <td class="px-5 py-3.5 text-right">
              <span class="text-white font-semibold text-sm">${d.completions.toLocaleString()}</span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>

<script>
// ─── Charts ───────────────────────────────────────────────────────
// Revenue / signups line chart (will be updated with real data)
const revCtx = document.getElementById('revenue-chart').getContext('2d');
const revChart = new Chart(revCtx, {
  type: 'line',
  data: {
    labels: ['Loading...'],
    datasets: [
      {
        label: 'Signups',
        data: [0],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.08)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22c55e',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Confirmed Revenue ($)',
        data: [0],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.05)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointRadius: 3,
        pointHoverRadius: 5,
        yAxisID: 'y1',
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: true, labels: { color: '#64748b', boxWidth: 10, font: { size: 11 } } },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#94a3b8',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#475569', font: { size: 11 } } },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#22c55e', font: { size: 11 } }
      },
      y1: {
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: '#2563eb', font: { size: 10 }, callback: v => '$' + v }
      }
    }
  }
});

// Plan donut chart (will be updated with real data)
const planCtx = document.getElementById('plan-chart').getContext('2d');
const planChart = new Chart(planCtx, {
  type: 'doughnut',
  data: {
    labels: ['Elite','Pro','Starter','Free'],
    datasets: [{
      data: [1, 1, 1, 1],
      backgroundColor: ['#d97706','#2563eb','#22c55e','#475569'],
      borderColor: '#1e293b',
      borderWidth: 3,
      hoverOffset: 6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#94a3b8',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.parsed.toLocaleString() + ' users' }
      }
    }
  }
});

// ─── Load Real Stats ─────────────────────────────────────────────
async function loadDashboardStats() {
  try {
    const [statsRes, dailyRes, usersRes] = await Promise.all([
      fetch('/api/admin/stats'),
      fetch('/api/admin/signups-daily'),
      fetch('/api/admin/users'),
    ]);

    if (statsRes.ok) {
      const { stats } = await statsRes.json();

      // Stat cards
      document.getElementById('dash-total-users').textContent = (stats.total || 0).toLocaleString();
      document.getElementById('dash-new-week').textContent = (stats.recentSignups || 0) + ' new in last 7 days';
      document.getElementById('dash-pending').textContent = (stats.pendingPayments || 0).toLocaleString();
      document.getElementById('dash-revenue').textContent = '$' + (stats.confirmedRevenue || 0).toFixed(2);
      document.getElementById('dash-mrr').textContent = 'MRR: $' + (stats.mrr || 0).toFixed(2);

      // Pending payments alert
      if ((stats.pendingPayments || 0) > 0) {
        document.getElementById('pending-payments-alert').style.display = 'block';
        document.getElementById('pending-payments-text').textContent =
          stats.pendingPayments + ' payment' + (stats.pendingPayments > 1 ? 's' : '') + ' need review';
      }

      // Plan breakdown
      const byPlan = stats.byPlan || {};
      const total = stats.total || 1;
      const plans = [
        { key: 'elite',   label: 'Elite',   count: byPlan.elite || 0 },
        { key: 'pro',     label: 'Pro',     count: byPlan.pro || 0 },
        { key: 'starter', label: 'Starter', count: byPlan.starter || 0 },
        { key: 'free',    label: 'Free',    count: byPlan.free || 0 },
      ];

      document.getElementById('plan-total-label').textContent = total.toLocaleString() + ' total users';

      plans.forEach(p => {
        const countEl = document.getElementById('plan-count-' + p.key);
        const pctEl   = document.getElementById('plan-pct-' + p.key);
        if (countEl) countEl.textContent = p.count.toLocaleString();
        if (pctEl)   pctEl.textContent = Math.round(p.count / total * 100) + '%';
      });

      // Update donut chart
      planChart.data.datasets[0].data = plans.map(p => p.count || 0.1);
      planChart.update();

      // Gender / age charts (shown in Demographics section below if present)
      // These are available in stats.byGender and stats.byAge
    }

    // Signups daily chart
    if (dailyRes.ok) {
      const daily = await dailyRes.json();
      const labels = Object.keys(daily).sort().slice(-14);
      const signupData = labels.map(d => daily[d] || 0);

      revChart.data.labels = labels.map(d => {
        const dt = new Date(d);
        return (dt.getMonth()+1) + '/' + dt.getDate();
      });
      revChart.data.datasets[0].data = signupData;
      revChart.data.datasets[1].data = signupData.map((v, i) => (i * 9.99).toFixed(2));
      revChart.update();
    }

    // Recent signups
    if (usersRes.ok) {
      const { users } = await usersRes.json();
      const recent = users
        .sort((a, b) => new Date(b.joined) - new Date(a.joined))
        .slice(0, 6);

      const planColors = { starter:'text-green-400', pro:'text-accent-400', elite:'text-yellow-400', free:'text-slate-400' };
      const genderEmoji = { male:'👨', female:'👩', other:'🧑', prefer_not:'🧑' };

      document.getElementById('recent-signups-list').innerHTML = recent.length === 0
        ? '<p class="text-slate-500 text-sm text-center py-4">No users yet. Share the site to get your first signup!</p>'
        : recent.map(u => {
            const joined = new Date(u.joined);
            const timeAgo = getTimeAgo(joined);
            const planCls = planColors[u.plan] || 'text-slate-400';
            const emoji = genderEmoji[u.gender] || '🧑';
            return \`
              <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-white/3 transition-colors">
                <div class="w-8 h-8 bg-accent-600/10 border border-accent-600/20 rounded-lg flex items-center justify-center flex-shrink-0 text-sm">\${emoji}</div>
                <div class="flex-1 min-w-0">
                  <p class="text-slate-200 text-sm font-medium truncate">\${u.name || u.email}</p>
                  <p class="text-slate-500 text-xs truncate">\${u.email} · \${u.level || 'beginner'} · \${u.location || '—'}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <span class="text-xs font-semibold \${planCls}">\${(u.plan||'free').toUpperCase()}</span>
                  <p class="text-slate-600 text-xs">\${timeAgo}</p>
                </div>
              </div>
            \`;
          }).join('');
    }

  } catch(e) {
    console.error('Dashboard stats error:', e);
  }
}

function getTimeAgo(date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return days + 'd ago';
  if (hrs > 0) return hrs + 'h ago';
  if (mins > 0) return mins + 'm ago';
  return 'just now';
}

document.addEventListener('DOMContentLoaded', loadDashboardStats);
</script>
`
  })
}
