import { pageShell } from '../lib/html';

export function homePage() {
  return pageShell({
    title: 'Kicklab — Train Like a Pro',
    activePath: '/',
    body: `
<!-- HERO SECTION -->
<section class="relative min-h-screen overflow-hidden flex items-center">
  <div class="absolute inset-0 z-0">
    <div class="absolute inset-0" style="background:linear-gradient(135deg,#080e1a 0%,#0d1626 60%,#111f38 100%)"></div>
    <div class="absolute inset-0 opacity-5 hero-grid-bg"></div>
  </div>
  <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl pointer-events-none z-0"></div>
  <div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div class="animate-fade-in">
        <div class="inline-flex items-center gap-2 bg-accent-600/10 border border-accent-600/20 rounded-full px-4 py-1.5 mb-6">
          <span class="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></span>
          <span class="text-accent-400 text-sm font-medium">New: Elite Performance Program 2026</span>
        </div>
        <h1 class="font-oswald text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          TRAIN LIKE<br/>
          <span class="gradient-text">A PRO.</span><br/>
          PLAY LIKE<br/>
          A CHAMPION.
        </h1>
        <p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
          Structured training programs, 200+ professional drills, and expert video tutorials — everything you need to elevate your soccer game from grassroots to elite level.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="/pricing" class="bg-accent-600 hover:bg-accent-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-2xl hover:shadow-accent-600/30 flex items-center gap-2">
            <i class="fas fa-star"></i> View Plans
          </a>
          <a href="/videos" class="bg-white/8 hover:bg-white/12 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all flex items-center gap-2">
            <i class="fas fa-film"></i> Watch Videos
          </a>
        </div>
        <div class="mt-10 flex items-center gap-6">
          <div class="flex -space-x-2">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-accent-700 to-accent-500 border-2 border-midnight flex items-center justify-center text-sm">🧑</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-accent-700 to-accent-500 border-2 border-midnight flex items-center justify-center text-sm">👩</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-accent-700 to-accent-500 border-2 border-midnight flex items-center justify-center text-sm">🧔</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-accent-700 to-accent-500 border-2 border-midnight flex items-center justify-center text-sm">👱</div>
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-accent-700 to-accent-500 border-2 border-midnight flex items-center justify-center text-sm">🧕</div>
          </div>
          <div>
            <div class="text-yellow-400 text-sm">★★★★★</div>
            <p class="text-gray-500 text-xs">Trusted by <span class="text-white font-semibold">50,000+</span> players worldwide</p>
          </div>
        </div>
      </div>

      <div class="hidden lg:grid grid-cols-2 gap-4">
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 card-hover">
          <div class="text-3xl mb-3 soccer-ball-float" style="animation-delay:0s">⚽</div>
          <div class="font-oswald text-2xl font-bold text-white">200+ Drills</div>
          <div class="text-gray-500 text-sm mt-1">From beginner to pro</div>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 card-hover mt-6">
          <div class="text-3xl mb-3 soccer-ball-float" style="animation-delay:0.4s">🎥</div>
          <div class="font-oswald text-2xl font-bold text-white">120+ Videos</div>
          <div class="text-gray-500 text-sm mt-1">HD tutorial library</div>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 card-hover">
          <div class="text-3xl mb-3 soccer-ball-float" style="animation-delay:0.2s">📋</div>
          <div class="font-oswald text-2xl font-bold text-white">3 Programs</div>
          <div class="text-gray-500 text-sm mt-1">8–12 week structured</div>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 card-hover mt-6">
          <div class="text-3xl mb-3 soccer-ball-float" style="animation-delay:0.6s">📈</div>
          <div class="font-oswald text-2xl font-bold text-white">50K+ Players</div>
          <div class="text-gray-500 text-sm mt-1">Training worldwide</div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
      <i class="fas fa-chevron-down text-gray-600 text-xs"></i>
    </div>
  </div>
</section>

<!-- STATS BANNER -->
<section class="bg-panel border-y border-white/5 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div><div class="font-oswald text-3xl font-bold text-white">50,000+</div><div class="text-gray-500 text-sm">Active Players</div></div>
      <div><div class="font-oswald text-3xl font-bold text-white">200+</div><div class="text-gray-500 text-sm">Pro Drills</div></div>
      <div><div class="font-oswald text-3xl font-bold text-white">120+</div><div class="text-gray-500 text-sm">Video Lessons</div></div>
      <div><div class="font-oswald text-3xl font-bold text-white">3</div><div class="text-gray-500 text-sm">Skill Programs</div></div>
    </div>
  </div>
</section>

<!-- PROGRAMS SECTION -->
<section class="py-24 bg-midnight">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <div class="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Training Programs</div>
      <h2 class="font-oswald text-4xl sm:text-5xl font-bold text-white mb-4">FIND YOUR LEVEL</h2>
      <p class="text-gray-400 max-w-2xl mx-auto">Structured 8–12 week programs designed by professional coaches. Each subscription tier unlocks the matching program and its full content library.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Foundation Builder -->
      <a href="/programs#foundation" class="bg-panel border border-white/10 rounded-2xl overflow-hidden card-hover group" style="text-decoration:none">
        <div class="h-40 relative overflow-hidden" style="background:linear-gradient(135deg,#1e3a8a,#2563eb)">
          <div class="absolute inset-0 flex items-center justify-center text-6xl opacity-20">⚽</div>
          <div class="absolute top-4 left-4"><span class="bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded-full">🌱 BEGINNER</span></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="font-oswald text-2xl font-bold text-white">Foundation Builder</div>
            <div class="text-accent-200 text-sm">8 Weeks • 24 Sessions</div>
          </div>
        </div>
        <div class="p-5">
          <p class="text-gray-400 text-sm mb-4">Master the fundamentals of soccer with structured drills covering ball control, basic passing, positioning, and first touch.</p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Ball Control</span>
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Basic Passing</span>
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Dribbling</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-accent-400 text-sm font-semibold">Included in Starter →</span>
          </div>
        </div>
      </a>

      <!-- Skill Accelerator -->
      <a href="/programs#accelerator" class="bg-panel border border-white/10 rounded-2xl overflow-hidden card-hover group" style="text-decoration:none">
        <div class="h-40 relative overflow-hidden" style="background:linear-gradient(135deg,#4c1d95,#7c3aed)">
          <div class="absolute inset-0 flex items-center justify-center text-6xl opacity-20">⚡</div>
          <div class="absolute top-4 left-4"><span class="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">⚡ INTERMEDIATE</span></div>
          <div class="absolute top-4 right-4"><span class="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">POPULAR</span></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="font-oswald text-2xl font-bold text-white">Skill Accelerator</div>
            <div class="text-purple-200 text-sm">10 Weeks • 30 Sessions</div>
          </div>
        </div>
        <div class="p-5">
          <p class="text-gray-400 text-sm mb-4">Take your game to the next level with advanced passing, shooting techniques, tactical awareness and combination play.</p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Advanced Passing</span>
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Shooting</span>
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">1v1</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-purple-400 text-sm font-semibold">Included in Pro →</span>
          </div>
        </div>
      </a>

      <!-- Elite Performance -->
      <a href="/programs#elite" class="bg-panel border border-white/10 rounded-2xl overflow-hidden card-hover group" style="text-decoration:none">
        <div class="h-40 relative overflow-hidden" style="background:linear-gradient(135deg,#78350f,#d97706)">
          <div class="absolute inset-0 flex items-center justify-center text-6xl opacity-20">🏆</div>
          <div class="absolute top-4 left-4"><span class="bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">🏆 ADVANCED</span></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="font-oswald text-2xl font-bold text-white">Elite Performance</div>
            <div class="text-yellow-200 text-sm">12 Weeks • 48 Sessions</div>
          </div>
        </div>
        <div class="p-5">
          <p class="text-gray-400 text-sm mb-4">Professional-level training: set pieces, high-intensity pressing, complex combination play and elite conditioning.</p>
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Set Pieces</span>
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Pressing</span>
            <span class="bg-white/5 text-gray-400 text-xs px-2 py-0.5 rounded">Mental</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-yellow-400 text-sm font-semibold">Included in Elite →</span>
          </div>
        </div>
      </a>
    </div>

    <!-- Featured videos -->
    <div class="mt-16">
      <div class="flex items-center justify-between mb-8">
        <h3 class="font-oswald text-2xl font-bold text-white">FEATURED VIDEOS</h3>
        <a href="/videos" class="text-accent-400 hover:text-accent-300 text-sm font-semibold flex items-center gap-1">View All <i class="fas fa-arrow-right text-xs"></i></a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { query: 'soccer footwork training beginner to advanced drills', title: 'Soccer Footwork Training: Beginner to Advanced', tag: 'Ball Control', emoji: '⚽', dur: '20–25 min' },
          { query: 'best football soccer drills 2024 all levels tutorial', title: 'Best Football Drills — All Levels', tag: 'Drills', emoji: '🎯', dur: '25–35 min' },
          { query: 'soccer training session for beginners full workout', title: 'Full Beginner Soccer Training Session', tag: 'Training', emoji: '🏃', dur: '15–30 min' },
        ].map(v => `
          <div class="bg-panel border border-white/10 rounded-2xl overflow-hidden card-hover cursor-pointer group" onclick="openVideoSearch('${v.query}', '${v.title}')">
            <div class="relative h-44 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
              <div class="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">${v.emoji}</div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="play-btn w-14 h-14 bg-accent-600/90 rounded-full flex items-center justify-center hover:bg-accent-500 transition-all shadow-lg shadow-accent-600/30">
                  <i class="fas fa-play text-white text-xl ml-1"></i>
                </div>
              </div>
              <div class="absolute top-2 left-2 bg-accent-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">${v.tag}</div>
              <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1"><i class="fab fa-youtube text-red-400 text-[10px]"></i> ${v.dur}</div>
            </div>
            <div class="p-4">
              <h4 class="text-white text-sm font-semibold line-clamp-2 mb-1">${v.title}</h4>
              <p class="text-gray-500 text-xs flex items-center gap-1"><i class="fab fa-youtube text-red-400"></i> Live YouTube results — always current</p>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- PRICING TEASER -->
<section class="py-24 bg-surface">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <div class="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Subscription Plans</div>
      <h2 class="font-oswald text-4xl sm:text-5xl font-bold text-white mb-4">TRAIN AT YOUR<br/>OWN PACE.</h2>
      <p class="text-gray-400">Start free, upgrade when you're ready. Three tiers built for every skill level.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div class="bg-panel border border-white/10 rounded-2xl p-6 card-hover text-center">
        <div class="text-3xl mb-3">🌱</div>
        <div class="font-oswald text-xl font-bold text-white mb-2">Starter</div>
        <p class="text-gray-400 text-sm mb-4">Beginner drills, 32 videos & the Foundation Builder program</p>
        <a href="/pricing" class="block w-full text-center border border-accent-600 text-accent-400 hover:bg-accent-600 hover:text-white font-semibold py-2.5 rounded-lg transition-all text-sm">See Pricing</a>
      </div>
      <div class="bg-panel border-2 border-accent-600 rounded-2xl p-6 card-hover text-center plan-card-popular relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-600 text-white text-xs font-bold px-3 py-0.5 rounded-full">MOST POPULAR</div>
        <div class="text-3xl mb-3">⚡</div>
        <div class="font-oswald text-xl font-bold text-white mb-2">Pro</div>
        <p class="text-gray-400 text-sm mb-4">112 drills, 80 videos, 2 full programs + tactical sessions</p>
        <a href="/pricing" class="block w-full text-center bg-accent-600 hover:bg-accent-500 text-white font-semibold py-2.5 rounded-lg transition-all text-sm">See Pricing</a>
      </div>
      <div class="bg-panel border border-white/10 rounded-2xl p-6 card-hover text-center">
        <div class="text-3xl mb-3">🏆</div>
        <div class="font-oswald text-xl font-bold text-white mb-2">Elite</div>
        <p class="text-gray-400 text-sm mb-4">Complete library — 200+ drills, 120+ videos, all 3 programs</p>
        <a href="/pricing" class="block w-full text-center border border-accent-600 text-accent-400 hover:bg-accent-600 hover:text-white font-semibold py-2.5 rounded-lg transition-all text-sm">See Pricing</a>
      </div>
    </div>
  </div>
</section>

<!-- SHOP TEASER -->
<section class="py-24 bg-midnight">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/20 text-xs font-bold px-2 py-0.5 rounded">Available on Amazon</span>
        </div>
        <h2 class="font-oswald text-4xl font-bold text-white">TRAINING GEAR STORE</h2>
        <p class="text-gray-400 mt-2">Equipment used across all Kicklab programs — buy directly on Amazon</p>
      </div>
      <a href="/products" class="flex-shrink-0 bg-[#FF9900] hover:bg-[#FFB347] text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
        <i class="fas fa-shopping-cart"></i> Shop All Gear
      </a>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      ${[
        { emoji: '⚽', name: 'Nike Academy Soccer Ball', price: '$24.99', rating: '4.8', badge: 'Most Popular' },
        { emoji: '🟠', name: 'Pro Disc Cones (Set of 50)', price: '$19.99', rating: '4.9', badge: 'Must Have' },
        { emoji: '⚡', name: 'Agility Ladder + 12 Cones', price: '$29.99', rating: '4.8', badge: 'Best Value' },
        { emoji: '🥅', name: 'Portable Soccer Goal 12×6 ft', price: '$89.99', rating: '4.7', badge: 'Top Rated' },
      ].map(p => `
        <a href="/products" class="bg-panel border border-white/10 rounded-2xl p-4 card-hover group" style="text-decoration:none">
          ${p.badge ? `<div class="bg-[#FF9900]/10 text-[#FF9900] text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-3">${p.badge}</div>` : '<div class="mb-6"></div>'}
          <div class="text-4xl mb-3">${p.emoji}</div>
          <h4 class="text-white text-sm font-semibold mb-1 line-clamp-2">${p.name}</h4>
          <div class="flex items-center justify-between mt-2">
            <span class="text-[#FF9900] font-bold text-sm">${p.price}</span>
            <span class="text-yellow-400 text-xs">★ ${p.rating}</span>
          </div>
        </a>
      `).join('')}
    </div>
  </div>
</section>

<!-- INSTAGRAM SECTION -->
<section class="py-24 bg-surface border-t border-white/5">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 mb-6">
      <i class="fab fa-instagram text-pink-400"></i>
      <span class="text-pink-400 text-sm font-medium">@kick.lab.soccer</span>
    </div>
    <h2 class="font-oswald text-4xl font-bold text-white mb-4">INSTAGRAM</h2>
    <p class="text-gray-400 text-lg mb-2">⚽ Daily drills, training tips & player highlights</p>
    <p class="text-gray-500 mb-8">Follow for free content → subscribe for full access</p>
    <a href="https://instagram.com/kick.lab.soccer" target="_blank" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:opacity-90 hover:shadow-2xl hover:shadow-pink-500/20">
      <i class="fab fa-instagram text-lg"></i> Follow @kick.lab.soccer
    </a>
    <p class="text-gray-600 text-sm mt-6">Follow <strong class="text-gray-400">@kick.lab.soccer</strong> for daily free drills, tutorials & challenges</p>
  </div>
</section>

<!-- VIDEO SEARCH MODAL -->
<div id="video-modal" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm items-center justify-center" style="display:none" onclick="if(event.target===this)closeVideoModal()">
  <div class="bg-surface border border-white/10 rounded-2xl overflow-hidden w-full max-w-4xl mx-4 flex flex-col" style="max-height:90vh">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <i class="fab fa-youtube text-white text-sm"></i>
        </div>
        <div class="min-w-0">
          <h3 id="modal-video-title" class="text-white font-semibold text-sm line-clamp-1"></h3>
          <p class="text-gray-500 text-xs">Live YouTube results — click any video to watch</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0 ml-3">
        <a id="modal-yt-link" href="#" target="_blank" class="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors">
          <i class="fab fa-youtube"></i> Open in YouTube
        </a>
        <button onclick="closeVideoModal()" class="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- Search refinement bar -->
    <div class="px-4 py-2 border-b border-white/5 flex-shrink-0 flex items-center gap-2 bg-midnight/50">
      <i class="fas fa-search text-gray-500 text-xs"></i>
      <input id="modal-search-input" type="text" placeholder="Refine your search..." 
        class="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600"
        onkeydown="if(event.key==='Enter')refineSearch()">
      <button onclick="refineSearch()" class="text-xs bg-accent-600 hover:bg-accent-500 text-white px-3 py-1 rounded-md transition-colors">Search</button>
    </div>
    <!-- YouTube search iframe -->
    <div class="relative flex-1" style="min-height:480px">
      <div id="modal-loading" class="absolute inset-0 flex flex-col items-center justify-center bg-midnight z-10">
        <div class="w-10 h-10 border-2 border-accent-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p class="text-gray-400 text-sm">Loading soccer videos...</p>
      </div>
      <iframe id="modal-iframe" 
        width="100%" height="100%" 
        frameborder="0"
        style="min-height:480px"
        onload="document.getElementById('modal-loading').style.display='none'">
      </iframe>
    </div>
  </div>
</div>

<script>
var _currentQuery = '';
function openVideoSearch(query, title) {
  _currentQuery = query;
  var ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
  document.getElementById('modal-iframe').src = ytUrl;
  document.getElementById('modal-video-title').textContent = title;
  document.getElementById('modal-yt-link').href = ytUrl;
  document.getElementById('modal-search-input').value = query;
  document.getElementById('modal-loading').style.display = 'flex';
  document.getElementById('video-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function refineSearch() {
  var q = document.getElementById('modal-search-input').value.trim();
  if (!q) return;
  _currentQuery = q;
  var ytUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
  document.getElementById('modal-iframe').src = ytUrl;
  document.getElementById('modal-yt-link').href = ytUrl;
  document.getElementById('modal-loading').style.display = 'flex';
}
function closeVideoModal() {
  document.getElementById('modal-iframe').src = '';
  document.getElementById('video-modal').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('modal-loading').style.display = 'flex';
}
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeVideoModal(); });
</script>
`
  });
}
