// Shared admin panel layout

export function adminShell(opts: {
  title: string
  activePage: string
  body: string
  extraHead?: string
}) {
  const navItems = [
    { id: 'dashboard',  href: '/admin',           icon: 'fas fa-chart-bar',      label: 'Dashboard'  },
    { id: 'users',      href: '/admin/users',      icon: 'fas fa-users',          label: 'Users'      },
    { id: 'drills',     href: '/admin/drills',     icon: 'fas fa-dumbbell',       label: 'Drills'     },
    { id: 'videos',     href: '/admin/videos',     icon: 'fas fa-play-circle',    label: 'Videos'     },
    { id: 'products',   href: '/admin/products',   icon: 'fas fa-shopping-cart',  label: 'Products'   },
    { id: 'plans',      href: '/admin/plans',      icon: 'fas fa-tag',            label: 'Plans'      },
    { id: 'settings',   href: '/admin/settings',   icon: 'fas fa-cog',            label: 'Settings'   },
  ]

  const sidebarLinks = navItems.map(item => {
    const isActive = opts.activePage === item.id
    return `<a href="${item.href}"
        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/25'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }">
        <i class="${item.icon} w-4 text-center text-sm"></i>
        <span>${item.label}</span>
        ${isActive ? '<span class="ml-auto w-1.5 h-1.5 bg-white rounded-full"></span>' : ''}
      </a>`
  }).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${opts.title} — Kicklab Admin</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { 'inter': ['Inter','sans-serif'] },
          colors: {
            accent: { 400:'#60a5fa', 500:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8' },
            slate:  { 800:'#1e293b', 850:'#172032', 900:'#0f172a', 950:'#080e1a' },
            panel:  { DEFAULT:'#1e293b' },
          }
        }
      }
    }
  </script>
  <style>
    * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
    body { background: #0f172a; color: #e2e8f0; margin: 0; }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 3px; }
    input, select, textarea { outline: none; }
    input:focus, select:focus, textarea:focus {
      border-color: #2563eb !important;
      box-shadow: 0 0 0 2px rgba(37,99,235,0.2) !important;
    }
    .sidebar { width: 240px; flex-shrink: 0; }
    .main-content { flex: 1; min-width: 0; overflow-x: hidden; }
    .stat-card { background: #1e293b; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px; }
    .table-row:hover { background: rgba(255,255,255,0.03); }
    .badge-free    { background:rgba(156,163,175,.15); color:#9ca3af; border:1px solid rgba(156,163,175,.25); }
    .badge-starter { background:rgba(34,197,94,.1);   color:#4ade80; border:1px solid rgba(34,197,94,.2); }
    .badge-pro     { background:rgba(37,99,235,.15);  color:#60a5fa; border:1px solid rgba(37,99,235,.25); }
    .badge-elite   { background:rgba(234,179,8,.1);   color:#fbbf24; border:1px solid rgba(234,179,8,.2); }
    .badge-beginner    { background:rgba(59,130,246,.15); color:#60a5fa; }
    .badge-intermediate{ background:rgba(168,85,247,.15); color:#c084fc; }
    .badge-advanced    { background:rgba(239,68,68,.15);  color:#f87171; }
    .modal-bg { background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); }
    .card-hover { transition: all 0.2s ease; }
    .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    .animate-in { animation: fadeSlide 0.3s ease forwards; }
    @keyframes fadeSlide { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
    .toast { position:fixed; bottom:24px; right:24px; z-index:9999; }
    /* Mobile sidebar */
    @media (max-width: 768px) {
      .sidebar { display: none; position: fixed; inset: 0; z-index: 50; width: 240px; }
      .sidebar.open { display: flex; flex-direction: column; }
      .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 49; }
      .mobile-overlay.open { display: block; }
    }
  </style>
  ${opts.extraHead || ''}
</head>
<body>
<div class="flex min-h-screen">

  <!-- Mobile overlay -->
  <div id="mobile-overlay" class="mobile-overlay" onclick="closeSidebar()"></div>

  <!-- Sidebar -->
  <aside id="sidebar" class="sidebar bg-slate-900 border-r border-white/5 flex flex-col py-6 px-3 min-h-screen">
    <!-- Logo -->
    <div class="px-3 mb-8">
      <a href="/admin" class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
          <span class="text-base">⚽</span>
        </div>
        <div>
          <div class="text-white font-bold text-sm leading-none">KICKLAB</div>
          <div class="text-accent-400 text-[10px] font-semibold uppercase tracking-wider">Admin Panel</div>
        </div>
      </a>
    </div>

    <!-- Nav -->
    <nav class="flex-1 space-y-1">
      <div class="px-3 mb-2">
        <span class="text-slate-600 text-[10px] font-bold uppercase tracking-wider">Navigation</span>
      </div>
      ${sidebarLinks}
    </nav>

    <!-- Divider + bottom links -->
    <div class="mt-4 pt-4 border-t border-white/5 space-y-1 px-0">
      <a href="/" target="_blank" class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
        <i class="fas fa-external-link-alt w-4 text-center text-xs"></i>
        <span>View Site</span>
      </a>
      <a href="/admin/logout" class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all">
        <i class="fas fa-sign-out-alt w-4 text-center text-sm"></i>
        <span>Sign Out</span>
      </a>
    </div>

    <!-- Admin badge -->
    <div class="mt-4 mx-3 bg-white/5 rounded-xl p-3 flex items-center gap-2.5">
      <div class="w-8 h-8 bg-accent-600/30 rounded-full flex items-center justify-center flex-shrink-0">
        <i class="fas fa-user-shield text-accent-400 text-xs"></i>
      </div>
      <div class="min-w-0">
        <div class="text-white text-xs font-semibold truncate">kicklabs.soccer@gmail.com</div>
        <div class="text-slate-500 text-[10px]">Super Admin</div>
      </div>
    </div>
  </aside>

  <!-- Main content -->
  <div class="main-content flex flex-col min-h-screen">
    <!-- Top bar -->
    <header class="bg-slate-900/80 backdrop-blur border-b border-white/5 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
      <div class="flex items-center gap-3">
        <button id="sidebar-toggle" onclick="toggleSidebar()" class="md:hidden text-slate-400 hover:text-white p-1">
          <i class="fas fa-bars text-lg"></i>
        </button>
        <div>
          <h1 class="text-white font-bold text-base leading-none">${opts.title}</h1>
          <p class="text-slate-500 text-xs mt-0.5">Kicklab Admin Panel</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
          <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          <span class="text-green-400 text-xs font-medium">System Online</span>
        </div>
        <a href="/admin/logout" class="text-slate-400 hover:text-red-400 transition-colors" title="Sign Out">
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </header>

    <!-- Page body -->
    <main class="flex-1 p-6">
      ${opts.body}
    </main>
  </div>
</div>

<!-- Toast container -->
<div id="toast-container" class="toast space-y-2"></div>

<script>
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('mobile-overlay').classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('open');
}

function showToast(message, type = 'success') {
  const colors = {
    success: 'bg-green-500/20 border-green-500/30 text-green-300',
    error:   'bg-red-500/20 border-red-500/30 text-red-300',
    info:    'bg-accent-600/20 border-accent-600/30 text-accent-300',
    warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
  };
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
  const t = document.createElement('div');
  t.className = 'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm shadow-xl animate-in ' + (colors[type] || colors.success);
  t.innerHTML = '<i class="fas ' + (icons[type]||'fa-check-circle') + '"></i>' + message;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(20px)'; t.style.transition='all 0.3s'; setTimeout(()=>t.remove(),300); }, 3500);
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('[id$="-modal"]').forEach(m => {
      m.classList.add('hidden'); m.classList.remove('flex');
    });
  }
});
</script>
</body>
</html>`
}
