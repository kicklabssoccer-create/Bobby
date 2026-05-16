// Shared HTML utilities: styles, nav, footer

export const GLOBAL_STYLES = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
          'oswald': ['Oswald', 'sans-serif'],
        },
        colors: {
          'accent': {
            50:  '#eff6ff',100: '#dbeafe',200: '#bfdbfe',300: '#93c5fd',
            400: '#60a5fa',500: '#3b82f6',600: '#2563eb',700: '#1d4ed8',
            800: '#1e40af',900: '#1e3a8a',
          },
          'surface': '#0f1624',
          'panel':   '#1a2235',
          'midnight': '#080e1a',
        }
      }
    }
  }
</script>
<style>
  * { font-family: 'Inter', sans-serif; }
  .font-oswald { font-family: 'Oswald', sans-serif !important; }
  .hero-gradient { background: linear-gradient(135deg, #080e1a 0%, #0d1626 50%, #111f38 100%); }
  .bg-midnight  { background-color: #080e1a; }
  .bg-surface   { background-color: #0f1624; }
  .bg-panel     { background-color: #1a2235; }
  .card-hover   { transition: all 0.3s ease; }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
  .nav-blur { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
  .gradient-text { background: linear-gradient(135deg, #60a5fa, #93c5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .pill-active   { background: #2563eb; color: white; }
  .pill-inactive { background: rgba(255,255,255,0.05); color: #9ca3af; cursor: pointer; }
  .pill-inactive:hover { background: rgba(37,99,235,0.15); color: #60a5fa; }
  .badge-beginner    { background: rgba(59,130,246,0.15);  color: #60a5fa;  border: 1px solid rgba(59,130,246,0.3); }
  .badge-intermediate{ background: rgba(156,163,175,0.15); color: #d1d5db;  border: 1px solid rgba(156,163,175,0.3); }
  .badge-advanced    { background: rgba(255,255,255,0.1);  color: #ffffff;  border: 1px solid rgba(255,255,255,0.25); }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #080e1a; }
  ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 3px; }
  .modal-overlay { background: rgba(0,0,0,0.88); backdrop-filter: blur(10px); }
  .animate-fade-in { animation: fadeIn 0.5s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .soccer-ball-float { animation: float 3s ease-in-out infinite; }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
  .video-thumb:hover .play-btn { transform: scale(1.1); }
  .play-btn { transition: transform 0.2s ease; }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .section-divider { border-color: rgba(255,255,255,0.06); }
  #mobile-bottom-nav { display: none; }
  @media (max-width: 768px) {
    #mobile-bottom-nav { display: flex; }
    body { padding-bottom: 72px; }
  }
  html { scroll-behavior: smooth; }
  .plan-card-popular { box-shadow: 0 0 0 2px #2563eb, 0 20px 60px rgba(37,99,235,0.3); }
  .progress-bar { transition: width 0.8s ease; }
  .tab-active { background: #2563eb; color: white; }
  .tab-inactive { background: rgba(255,255,255,0.05); color: #9ca3af; }
  .tab-inactive:hover { background: rgba(37,99,235,0.15); color: #60a5fa; }
  .drill-card-locked { opacity: 0.7; }
  .amazon-btn { background: linear-gradient(135deg, #FF9900, #e88900); }
  .amazon-btn:hover { background: linear-gradient(135deg, #FFB347, #FF9900); }
  input, select, textarea { outline: none !important; }
  input:focus, select:focus, textarea:focus { border-color: #2563eb !important; box-shadow: 0 0 0 2px rgba(37,99,235,0.2) !important; }
  .nav-link-active { background: rgba(37,99,235,0.2); color: #60a5fa; }
  .nav-link-inactive { color: #9ca3af; }
  .nav-link-inactive:hover { color: #ffffff; background: rgba(255,255,255,0.05); }
  .hero-grid-bg { background-image: repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.03) 60px,rgba(255,255,255,0.03) 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.03) 60px,rgba(255,255,255,0.03) 61px); }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
`;

export function logo(size: 'sm' | 'md' | 'lg' = 'md') {
  const sizes = { sm: { box: 'w-7 h-7', text: 'text-base', dot: 'w-1.5 h-1.5' }, md: { box: 'w-8 h-8', text: 'text-lg', dot: 'w-1.5 h-1.5' }, lg: { box: 'w-10 h-10', text: 'text-2xl', dot: 'w-2 h-2' } };
  const s = sizes[size];
  return `<a href="/" class="flex items-center gap-2.5 group" style="text-decoration:none">
    <div class="${s.box} bg-accent-600 rounded-lg flex items-center justify-center group-hover:bg-accent-500 transition-colors flex-shrink-0">
      <span class="text-white text-base">⚽</span>
    </div>
    <span class="inline-flex items-baseline gap-0 leading-none select-none">
      <span class="font-oswald font-bold text-white tracking-tight ${s.text}">KICK</span>
      <span class="relative inline-flex items-baseline">
        <span class="font-oswald font-bold text-accent-400 tracking-tight ${s.text}">LAB</span>
        <span class="absolute right-0 rounded-full bg-accent-400 ${s.dot} -top-0.5" style="box-shadow:0 0 6px 2px rgba(96,165,250,0.7);"></span>
      </span>
    </span>
  </a>`;
}

export function nav(activePath: string = '/') {
  const links = [
    { href: '/', label: 'Home', icon: 'fas fa-house' },
    { href: '/programs', label: 'Programs', icon: 'fas fa-graduation-cap' },
    { href: '/drills', label: 'Drills', icon: 'fas fa-dumbbell' },
    { href: '/videos', label: 'Videos', icon: 'fas fa-play-circle' },
    { href: '/pricing', label: 'Pricing', icon: 'fas fa-tag' },
  ];
  const desktopLinks = links.map(l => {
    const active = activePath === l.href;
    return `<a href="${l.href}" class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${active ? 'nav-link-active' : 'nav-link-inactive'}">
      <i class="${l.icon} text-xs"></i>${l.label}
    </a>`;
  }).join('');

  const mobileLinks = links.map(l => {
    const active = activePath === l.href;
    return `<a href="${l.href}" class="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${active ? 'nav-link-active' : 'nav-link-inactive'}">
      <i class="${l.icon} w-4"></i>${l.label}
    </a>`;
  }).join('');

  return `<nav class="fixed top-0 left-0 right-0 z-50 nav-blur bg-midnight/85 border-b border-white/5">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      ${logo('md')}
      <div class="hidden md:flex items-center gap-1">
        ${desktopLinks}
        <!-- Shop dropdown -->
        <div class="relative group">
          <button class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activePath.startsWith('/products') ? 'nav-link-active' : 'nav-link-inactive'}">
            <i class="fas fa-shopping-cart text-xs"></i>Shop<i class="fas fa-chevron-down text-xs ml-0.5 group-hover:rotate-180 transition-transform duration-200"></i>
          </button>
          <div class="absolute left-0 top-full mt-2 w-72 bg-surface border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            <div class="p-2">
              <a href="/products" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group/item">
                <div class="w-8 h-8 bg-[#FF9900]/15 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-shopping-cart text-[#FF9900] text-xs"></i></div>
                <div><p class="text-white text-sm font-semibold group-hover/item:text-[#FF9900] transition-colors">All Products</p><p class="text-gray-500 text-xs">Browse all training gear</p></div>
              </a>
              <div class="border-t border-white/5 my-2"></div>
              <a href="/products?cat=Balls" class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"><span class="text-lg">⚽</span><div><p class="text-gray-300 text-sm">Balls</p></div></a>
              <a href="/products?cat=Cones" class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"><span class="text-lg">🟠</span><div><p class="text-gray-300 text-sm">Cones & Markers</p></div></a>
              <a href="/products?cat=Agility" class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"><span class="text-lg">⚡</span><div><p class="text-gray-300 text-sm">Agility & Speed</p></div></a>
              <a href="/products?cat=Goals" class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"><span class="text-lg">🥅</span><div><p class="text-gray-300 text-sm">Goals & Rebounders</p></div></a>
              <a href="/products?cat=GK" class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"><span class="text-lg">🧤</span><div><p class="text-gray-300 text-sm">Goalkeeper Gear</p></div></a>
              <a href="/products?cat=Conditioning" class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"><span class="text-lg">💪</span><div><p class="text-gray-300 text-sm">Conditioning</p></div></a>
              <div class="border-t border-white/5 my-2"></div>
              <div class="px-3 py-2">
                <p class="text-gray-600 text-xs mb-2">Shop by Program</p>
                <div class="flex gap-2">
                  <a href="/products?tier=Starter" class="flex-1 text-center bg-accent-600/15 hover:bg-accent-600/25 text-accent-400 text-xs font-bold py-1.5 rounded-lg border border-accent-600/20">🌱 Starter</a>
                  <a href="/products?tier=Pro" class="flex-1 text-center bg-purple-600/15 hover:bg-purple-600/25 text-purple-400 text-xs font-bold py-1.5 rounded-lg border border-purple-600/20">⚡ Pro</a>
                  <a href="/products?tier=Elite" class="flex-1 text-center bg-yellow-600/15 hover:bg-yellow-600/25 text-yellow-400 text-xs font-bold py-1.5 rounded-lg border border-yellow-600/20">🏆 Elite</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-3" id="nav-auth-desktop">
        <a href="/auth/login" class="text-sm font-medium text-gray-400 hover:text-white transition-colors" id="nav-signin-btn">Sign In</a>
        <a href="/pricing" class="bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-accent-600/25" id="nav-getstarted-btn">Get Started</a>
        <a href="/dashboard" class="hidden bg-panel hover:bg-white/10 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all flex items-center gap-2" id="nav-dashboard-btn"><i class="fas fa-user-circle"></i><span id="nav-username">User</span></a>
      </div>
      <button id="mobile-menu-btn" class="md:hidden text-gray-400 hover:text-white p-2" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>
    <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-white/5 mt-2 pt-4">
      ${mobileLinks}
      <a href="/products" class="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${activePath.startsWith('/products') ? 'nav-link-active' : 'nav-link-inactive'}"><i class="fas fa-shopping-cart w-4"></i>Shop</a>
      <div class="border-t border-white/5 my-3"></div>
      <div id="mobile-auth-btns">
        <a href="/auth/login" class="block mb-2 text-gray-400 text-sm font-medium px-3 py-2.5">Sign In</a>
        <a href="/pricing" class="block bg-accent-600 text-white text-center text-sm font-semibold px-5 py-2.5 rounded-lg">Get Started</a>
      </div>
      <div id="mobile-user-btns" class="hidden">
        <a href="/dashboard" class="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-accent-400 bg-accent-600/10 mb-1"><i class="fas fa-chart-line w-4"></i>My Dashboard</a>
        <button onclick="kicklabLogout()" class="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5">
          <i class="fas fa-sign-out-alt w-4"></i>Sign Out
        </button>
      </div>
    </div>
  </div>
</nav>

<!-- Mobile bottom nav -->
<div id="mobile-bottom-nav" class="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 border-t border-white/10 nav-blur px-2 py-2" style="padding-bottom: max(8px, env(safe-area-inset-bottom))">
  <div class="flex items-center justify-around max-w-lg mx-auto">
    <a href="/" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${activePath === '/' ? 'text-accent-400' : 'text-gray-500'}">
      <i class="fas fa-house text-lg"></i><span class="text-[10px] font-medium">Home</span>
    </a>
    <a href="/drills" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${activePath === '/drills' ? 'text-accent-400' : 'text-gray-500'}">
      <i class="fas fa-dumbbell text-lg"></i><span class="text-[10px] font-medium">Drills</span>
    </a>
    <a href="/videos" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${activePath === '/videos' ? 'text-accent-400' : 'text-gray-500'}">
      <i class="fas fa-play-circle text-lg"></i><span class="text-[10px] font-medium">Videos</span>
    </a>
    <a href="/programs" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${activePath === '/programs' ? 'text-accent-400' : 'text-gray-500'}">
      <i class="fas fa-graduation-cap text-lg"></i><span class="text-[10px] font-medium">Programs</span>
    </a>
    <a href="/dashboard" class="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${activePath === '/dashboard' ? 'text-accent-400' : 'text-gray-500'}">
      <i class="fas fa-user text-lg"></i><span class="text-[10px] font-medium">Me</span>
    </a>
  </div>
</div>

<script>
// Auth state management
function kicklabGetUser() {
  try { return JSON.parse(localStorage.getItem('kicklab_user') || 'null'); } catch { return null; }
}
function kicklabLogout() {
  localStorage.removeItem('kicklab_user');
  window.location.href = '/';
}
function kicklabUpdateNav() {
  const user = kicklabGetUser();
  const signIn = document.getElementById('nav-signin-btn');
  const getStarted = document.getElementById('nav-getstarted-btn');
  const dashboard = document.getElementById('nav-dashboard-btn');
  const mobileAuth = document.getElementById('mobile-auth-btns');
  const mobileUser = document.getElementById('mobile-user-btns');
  if (user) {
    if (signIn) signIn.classList.add('hidden');
    if (getStarted) getStarted.classList.add('hidden');
    if (dashboard) { dashboard.classList.remove('hidden'); dashboard.classList.add('flex'); }
    const nameEl = document.getElementById('nav-username');
    if (nameEl) nameEl.textContent = user.name ? user.name.split(' ')[0] : 'Account';
    if (mobileAuth) mobileAuth.classList.add('hidden');
    if (mobileUser) mobileUser.classList.remove('hidden');
  }
}
document.addEventListener('DOMContentLoaded', kicklabUpdateNav);
</script>`;
}

export function footer() {
  return `<footer class="bg-midnight border-t border-white/5 pt-16 pb-8 mt-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
      <div class="md:col-span-2">
        <div class="mb-4">${logo('md')}</div>
        <p class="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">Elite soccer training for all levels. Start free, upgrade when you're ready. Follow us on Instagram for free daily tips!</p>
        <div class="flex gap-3">
          <a href="https://instagram.com/kick.lab.soccer" target="_blank" class="w-9 h-9 bg-panel rounded-lg flex items-center justify-center text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 transition-all"><i class="fab fa-instagram"></i></a>
          <a href="#" class="w-9 h-9 bg-panel rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"><i class="fab fa-twitter"></i></a>
          <a href="#" class="w-9 h-9 bg-panel rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"><i class="fab fa-youtube"></i></a>
          <a href="#" class="w-9 h-9 bg-panel rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-600/10 transition-all"><i class="fab fa-facebook"></i></a>
        </div>
      </div>
      <div>
        <h4 class="font-semibold text-white text-sm mb-4">Training</h4>
        <ul class="space-y-2.5">
          <li><a href="/programs" class="text-gray-500 hover:text-white text-sm transition-colors">Programs</a></li>
          <li><a href="/drills" class="text-gray-500 hover:text-white text-sm transition-colors">Drills Library</a></li>
          <li><a href="/videos" class="text-gray-500 hover:text-white text-sm transition-colors">Video Tutorials</a></li>
          <li><a href="/pricing" class="text-gray-500 hover:text-white text-sm transition-colors">Pricing Plans</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white text-sm mb-4">Company</h4>
        <ul class="space-y-2.5">
          <li><a href="/products" class="text-gray-500 hover:text-white text-sm transition-colors">Gear Store</a></li>
          <li><a href="/auth/signup" class="text-gray-500 hover:text-white text-sm transition-colors">Create Account</a></li>
          <li><a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-gray-600 text-sm">© 2026 Kicklab. All rights reserved.</p>
      <p class="text-gray-700 text-xs">Amazon affiliate links. Prices may vary. We may earn a commission.</p>
    </div>
  </div>
</footer>`;
}

export function pageShell(opts: { title: string; description?: string; activePath?: string; body: string; extraHead?: string }) {
  const desc = opts.description || 'Kicklab — elite soccer training programs, professional drills, and video tutorials for all skill levels.';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
  <title>${opts.title}</title>
  <meta name="description" content="${desc}"/>

  <!-- PWA / Theme -->
  <meta name="theme-color" content="#2563eb"/>
  <meta name="mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <meta name="apple-mobile-web-app-title" content="Kicklab"/>
  <meta name="application-name" content="Kicklab"/>
  <meta name="msapplication-TileColor" content="#2563eb"/>
  <meta name="msapplication-TileImage" content="/static/icons/icon-144.png"/>

  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json"/>

  <!-- Apple Touch Icons (iOS "Add to Home Screen") -->
  <link rel="apple-touch-icon" href="/static/icons/icon-192.png"/>
  <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/icon-152.png"/>
  <link rel="apple-touch-icon" sizes="144x144" href="/static/icons/icon-144.png"/>
  <link rel="apple-touch-icon" sizes="128x128" href="/static/icons/icon-128.png"/>
  <link rel="apple-touch-icon" sizes="96x96"  href="/static/icons/icon-96.png"/>

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/icon-96.png"/>
  <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/icon-72.png"/>

  <!-- Open Graph (social sharing) -->
  <meta property="og:title" content="${opts.title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="/static/icons/icon-512.png"/>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary"/>
  <meta name="twitter:title" content="${opts.title}"/>
  <meta name="twitter:description" content="${desc}"/>
  <meta name="twitter:image" content="/static/icons/icon-512.png"/>

  ${GLOBAL_STYLES}
  ${opts.extraHead || ''}

  <!-- PWA Install Banner styles -->
  <style>
    #pwa-install-banner {
      position: fixed; bottom: 76px; left: 12px; right: 12px; z-index: 999;
      background: linear-gradient(135deg, #1a2235, #0f1624);
      border: 1px solid rgba(37,99,235,0.4);
      border-radius: 16px; padding: 14px 16px;
      display: flex; align-items: center; gap: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.2);
      transform: translateY(120%); transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
      max-width: 440px; margin: 0 auto;
    }
    #pwa-install-banner.show { transform: translateY(0); }
    @media (min-width: 768px) {
      #pwa-install-banner { bottom: 24px; left: auto; right: 24px; max-width: 380px; margin: 0; }
    }
  </style>
</head>
<body class="bg-midnight text-white">
  ${nav(opts.activePath || '/')}
  <main style="padding-top: 64px;">
    ${opts.body}
  </main>
  ${footer()}

  <!-- PWA Install Banner (shows on mobile after 3s if not installed) -->
  <div id="pwa-install-banner" role="banner" aria-label="Install Kicklab app">
    <div class="w-10 h-10 bg-accent-600 rounded-xl flex items-center justify-center flex-shrink-0">
      <span class="text-xl">⚽</span>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-white text-sm font-bold leading-tight">Install Kicklab App</p>
      <p class="text-gray-400 text-xs mt-0.5">Train anywhere — works offline too</p>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <button id="pwa-install-btn" class="bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all">
        Install
      </button>
      <button id="pwa-dismiss-btn" class="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all">
        <i class="fas fa-times text-xs"></i>
      </button>
    </div>
  </div>

  <!-- Service Worker + PWA Install Logic -->
  <script>
  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  // PWA Install prompt
  let _deferredPrompt = null;
  const banner = document.getElementById('pwa-install-banner');
  const installBtn = document.getElementById('pwa-install-btn');
  const dismissBtn = document.getElementById('pwa-dismiss-btn');

  // Check if already installed (standalone mode)
  const isInstalled = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true;

  // Don't show on desktop or if already installed or dismissed
  const wasDismissed = localStorage.getItem('pwa_dismissed');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    _deferredPrompt = e;
    if (!isInstalled && !wasDismissed) {
      setTimeout(() => banner && banner.classList.add('show'), 3000);
    }
  });

  // iOS Safari: show manual "Add to Home Screen" instructions
  function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; }
  function isInStandaloneMode() { return window.navigator.standalone; }

  if (isMobile && isIOS() && !isInStandaloneMode() && !wasDismissed) {
    setTimeout(() => {
      if (banner) {
        banner.querySelector('p.text-xs').textContent = 'Tap Share → "Add to Home Screen"';
        banner.classList.add('show');
      }
    }, 3000);
  }

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (_deferredPrompt) {
        _deferredPrompt.prompt();
        const { outcome } = await _deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          banner.classList.remove('show');
          localStorage.setItem('pwa_dismissed', '1');
        }
        _deferredPrompt = null;
      } else if (isIOS()) {
        // Show iOS instructions
        installBtn.textContent = 'Tap Share → Add to Home';
        installBtn.style.fontSize = '9px';
      }
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner.classList.remove('show');
      localStorage.setItem('pwa_dismissed', '1');
    });
  }
  </script>
</body>
</html>`;
}
