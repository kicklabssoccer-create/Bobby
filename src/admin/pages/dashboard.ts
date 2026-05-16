import { adminShell } from '../layout'
import { DRILLS } from '../../data/drills'
import { VIDEOS } from '../../data/videos'
import { PRODUCTS } from '../../data/products'

export function adminDashboardPage() {
  const totalDrills = DRILLS.length
  const totalVideos = VIDEOS.length
  const totalProducts = PRODUCTS.length

  // Simulated user stats (in a real app these come from a DB)
  const mockStats = {
    totalUsers: 50342,
    activeToday: 1284,
    newThisWeek: 847,
    revenue: 48920,
    starterUsers: 18400,
    proUsers: 21800,
    eliteUsers: 8100,
    freeUsers: 2042,
  }

  const planBreakdown = [
    { plan: 'Elite',   count: mockStats.eliteUsers,   color: '#d97706', pct: Math.round(mockStats.eliteUsers/mockStats.totalUsers*100) },
    { plan: 'Pro',     count: mockStats.proUsers,     color: '#2563eb', pct: Math.round(mockStats.proUsers/mockStats.totalUsers*100) },
    { plan: 'Starter', count: mockStats.starterUsers, color: '#22c55e', pct: Math.round(mockStats.starterUsers/mockStats.totalUsers*100) },
    { plan: 'Free',    count: mockStats.freeUsers,    color: '#64748b', pct: Math.round(mockStats.freeUsers/mockStats.totalUsers*100) },
  ]

  const recentActivity = [
    { icon: 'fas fa-user-plus', color: 'text-green-400 bg-green-500/10', text: 'New user registered', sub: 'marcus.silva@email.com • Pro Plan', time: '2m ago' },
    { icon: 'fas fa-star', color: 'text-yellow-400 bg-yellow-500/10', text: 'Plan upgraded to Elite', sub: 'sarah.jones@email.com • Elite Plan', time: '14m ago' },
    { icon: 'fas fa-dumbbell', color: 'text-accent-400 bg-accent-600/10', text: 'Drill completed', sub: 'Cone Weave Dribbling • 12 completions today', time: '22m ago' },
    { icon: 'fas fa-play-circle', color: 'text-purple-400 bg-purple-500/10', text: 'Most viewed video', sub: 'Full Soccer Footwork Training • 142 views today', time: '1h ago' },
    { icon: 'fas fa-times-circle', color: 'text-red-400 bg-red-500/10', text: 'Subscription cancelled', sub: 'tom.baker@email.com • Starter Plan', time: '2h ago' },
    { icon: 'fas fa-shopping-cart', color: 'text-orange-400 bg-orange-500/10', text: 'Amazon gear click', sub: 'Nike Academy Soccer Ball • 28 clicks today', time: '3h ago' },
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
  ${[
    { label:'Total Users', value: mockStats.totalUsers.toLocaleString(), sub: '+' + mockStats.newThisWeek + ' this week', icon:'fas fa-users', color:'text-accent-400', ring:'border-accent-600/20', glow:'bg-accent-600/5' },
    { label:'Active Today', value: mockStats.activeToday.toLocaleString(), sub:'↑ 12% vs yesterday', icon:'fas fa-bolt', color:'text-green-400', ring:'border-green-500/20', glow:'bg-green-500/5' },
    { label:'Monthly Revenue', value:'$' + mockStats.revenue.toLocaleString(), sub:'↑ 8.2% vs last month', icon:'fas fa-dollar-sign', color:'text-yellow-400', ring:'border-yellow-500/20', glow:'bg-yellow-500/5' },
    { label:'Content Items', value: (totalDrills+totalVideos+totalProducts).toString(), sub:totalDrills+' drills · '+totalVideos+' videos', icon:'fas fa-layer-group', color:'text-purple-400', ring:'border-purple-500/20', glow:'bg-purple-500/5' },
  ].map(s => `
    <div class="stat-card ${s.glow} border ${s.ring} card-hover">
      <div class="flex items-start justify-between mb-3">
        <div>
          <p class="text-slate-500 text-xs font-medium">${s.label}</p>
          <p class="text-white text-2xl font-bold mt-0.5">${s.value}</p>
        </div>
        <div class="w-10 h-10 rounded-xl ${s.glow} border ${s.ring} flex items-center justify-center flex-shrink-0">
          <i class="${s.icon} ${s.color} text-sm"></i>
        </div>
      </div>
      <p class="text-slate-500 text-xs">${s.sub}</p>
    </div>
  `).join('')}
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
      <p class="text-slate-500 text-xs">${mockStats.totalUsers.toLocaleString()} total users</p>
    </div>
    <div style="height:160px" class="relative">
      <canvas id="plan-chart"></canvas>
    </div>
    <div class="mt-4 space-y-2">
      ${planBreakdown.map(p => `
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <div class="w-2.5 h-2.5 rounded-full flex-shrink-0" style="background:${p.color}"></div>
            <span class="text-slate-400">${p.plan}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-slate-500">${p.count.toLocaleString()}</span>
            <span class="text-white font-semibold w-8 text-right">${p.pct}%</span>
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

  <!-- Recent activity -->
  <div class="lg:col-span-2 bg-[#1e293b] border border-white/6 rounded-2xl p-5">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-white font-semibold text-sm">Recent Activity</h3>
      <a href="/admin/users" class="text-accent-400 hover:text-accent-300 text-xs font-medium">View All →</a>
    </div>
    <div class="space-y-3">
      ${recentActivity.map(a => `
        <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors">
          <div class="w-8 h-8 ${a.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <i class="${a.icon} text-xs"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-slate-200 text-sm font-medium">${a.text}</p>
            <p class="text-slate-500 text-xs truncate">${a.sub}</p>
          </div>
          <span class="text-slate-600 text-xs flex-shrink-0">${a.time}</span>
        </div>
      `).join('')}
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
// Revenue chart
const revCtx = document.getElementById('revenue-chart').getContext('2d');
new Chart(revCtx, {
  type: 'line',
  data: {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [32100, 38500, 41200, 43800, 46100, 48920],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.08)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'New Users',
        data: [620, 750, 810, 780, 830, 847],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.05)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#22c55e',
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
        ticks: { color: '#475569', font: { size: 11 }, callback: v => '$' + v.toLocaleString() }
      },
      y1: {
        position: 'right',
        grid: { drawOnChartArea: false },
        ticks: { color: '#22c55e', font: { size: 10 } }
      }
    }
  }
});

// Plan donut chart
const planCtx = document.getElementById('plan-chart').getContext('2d');
new Chart(planCtx, {
  type: 'doughnut',
  data: {
    labels: ['Elite','Pro','Starter','Free'],
    datasets: [{
      data: [${mockStats.eliteUsers},${mockStats.proUsers},${mockStats.starterUsers},${mockStats.freeUsers}],
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
</script>
`
  })
}
