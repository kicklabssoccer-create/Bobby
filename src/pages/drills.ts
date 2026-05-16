import { pageShell } from '../lib/html';
import { DRILLS, DRILL_CATEGORIES, DRILL_LEVELS } from '../data/drills';

export function drillsPage(query: { level?: string; cat?: string; drill?: string }) {
  return pageShell({
    title: 'Drills Library — Kicklab',
    activePath: '/drills',
    body: `
<section class="py-16 bg-midnight min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-10">
      <div class="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-2">Drills Library</div>
      <h1 class="font-oswald text-5xl font-bold text-white mb-3">200+ PRO DRILLS</h1>
      <p class="text-gray-400 max-w-2xl">Structured drills for every level — from beginner ball control to advanced pressing patterns. Subscribe to unlock the full library.</p>
    </div>

    <!-- Access notice for free users -->
    <div class="bg-accent-600/10 border border-accent-600/20 rounded-xl p-4 flex items-center gap-4 mb-8" id="free-notice">
      <i class="fas fa-info-circle text-accent-400 text-lg flex-shrink-0"></i>
      <div class="flex-1">
        <span class="text-accent-300 font-medium text-sm">You're viewing free drills only.</span>
        <span class="text-gray-400 text-sm ml-1">Subscribe to unlock 200+ professional drills.</span>
      </div>
      <a href="/pricing" class="flex-shrink-0 bg-accent-600 hover:bg-accent-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">Upgrade</a>
    </div>

    <!-- Filters -->
    <div class="flex flex-col gap-4 mb-10">
      <!-- Level filter -->
      <div class="flex flex-wrap gap-2" id="level-filters">
        ${DRILL_LEVELS.map(l => `
          <button onclick="filterDrills('level','${l}')" class="pill-${l === 'All' ? 'active' : 'inactive'} px-4 py-1.5 rounded-full text-sm font-medium transition-all" data-filter-type="level" data-filter-val="${l}">${l}</button>
        `).join('')}
      </div>
      <!-- Category filter -->
      <div class="flex flex-wrap gap-2" id="cat-filters">
        ${DRILL_CATEGORIES.map(c => `
          <button onclick="filterDrills('cat','${c}')" class="pill-${c === 'All' ? 'active' : 'inactive'} px-4 py-1.5 rounded-full text-sm font-medium transition-all" data-filter-type="cat" data-filter-val="${c}">${c}</button>
        `).join('')}
      </div>
    </div>

    <!-- CMS Featured Drills (loaded dynamically) -->
    <div id="cms-drills-section" class="hidden mb-8">
      <div class="flex items-center gap-2 mb-4">
        <span class="w-1 h-5 bg-accent-500 rounded-full"></span>
        <h2 class="text-white font-bold text-lg">Featured Drills</h2>
        <span class="bg-accent-600/20 text-accent-400 text-xs font-bold px-2 py-0.5 rounded-full border border-accent-600/30">New</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" id="cms-drills-grid"></div>
    </div>

    <!-- Stats -->
    <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
      <span id="drill-count" class="text-white font-semibold">${DRILLS.length} drills</span>
      <span>• <span class="text-green-400">3 free</span> | <span class="text-gray-400">Rest locked (subscribe to unlock)</span></span>
    </div>

    <!-- Drills grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" id="drills-grid">
      ${DRILLS.map(d => {
        const isFree = d.plan === 'free';
        const badgeClass = d.level === 'Beginner' ? 'badge-beginner' : d.level === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';
        return `
          <div class="bg-panel border border-white/10 rounded-2xl overflow-hidden card-hover drill-card cursor-pointer ${!isFree ? 'drill-card-locked' : ''}"
               data-level="${d.level}" data-cat="${d.category}" data-plan="${d.plan}"
               data-drill-id="${d.id}" data-drill-plan="${d.plan}"
               onclick="${isFree ? `openDrill('${d.id}')` : 'showUpgradePrompt()'}">
            <div class="p-5">
              <div class="flex items-start justify-between mb-3">
                <span class="${badgeClass} text-xs font-semibold px-2 py-0.5 rounded-full">${d.level}</span>
                <span class="lock-icon" style="${isFree ? 'display:none' : ''}"><i class="fas fa-lock text-gray-600 text-sm"></i></span>
                <span class="unlock-icon" style="${isFree ? '' : 'display:none'}"><i class="fas fa-unlock text-green-400 text-sm"></i></span>
              </div>
              <h3 class="text-white font-semibold text-sm mb-1 line-clamp-2">${d.title}</h3>
              <p class="text-accent-400 text-xs font-medium mb-3">${d.category}</p>
              ${!isFree ? '<div class="text-gray-600 text-xs mb-3">Subscribe to a higher plan to access this drill.</div>' : `<p class="text-gray-500 text-xs line-clamp-2 mb-3">${d.description}</p>`}
              <div class="flex items-center gap-3 text-gray-600 text-xs">
                <span class="flex items-center gap-1"><i class="fas fa-clock"></i> ${d.duration}</span>
                <span class="flex items-center gap-1"><i class="fas fa-users"></i> ${d.players}</span>
                <span class="flex items-center gap-1 truncate"><i class="fas fa-box"></i> ${d.equipment.split(',')[0]}</span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Upgrade CTA -->
    <div class="mt-12 bg-gradient-to-r from-accent-900/40 to-accent-700/20 border border-accent-600/30 rounded-2xl p-8 text-center">
      <div class="text-4xl mb-4">🔓</div>
      <h3 class="font-oswald text-3xl font-bold text-white mb-3">Unlock All 200+ Drills</h3>
      <p class="text-gray-400 mb-6">You're currently viewing 3 free drills. Subscribe to get full access to every drill, video, and program.</p>
      <a href="/pricing" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-accent-600/30">
        <i class="fas fa-star"></i> View Subscription Plans
      </a>
    </div>
  </div>
</section>

<!-- Drill Detail Modal -->
<div id="drill-modal" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" style="display:none" onclick="if(event.target===this)closeDrillModal()">
  <div class="bg-surface border border-white/10 rounded-2xl w-full max-w-2xl mx-4 flex flex-col" style="max-height:92vh">
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b border-white/10 flex-shrink-0">
      <div>
        <span id="modal-drill-badge" class="text-xs font-semibold px-2 py-0.5 rounded-full badge-beginner"></span>
        <div id="modal-drill-category" class="text-gray-500 text-xs mt-1"></div>
      </div>
      <button onclick="closeDrillModal()" class="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"><i class="fas fa-times text-lg"></i></button>
    </div>
    <!-- Scrollable content -->
    <div class="overflow-y-auto flex-1">
      <div class="p-6">
        <h2 id="modal-drill-title" class="font-oswald text-2xl font-bold text-white mb-1"></h2>
        <p id="modal-drill-desc" class="text-gray-400 text-sm mb-5 leading-relaxed"></p>
        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div class="bg-panel rounded-xl p-3 text-center"><div class="text-accent-400 text-lg mb-1"><i class="fas fa-clock"></i></div><div id="modal-drill-duration" class="text-white text-sm font-semibold"></div><div class="text-gray-600 text-xs">Duration</div></div>
          <div class="bg-panel rounded-xl p-3 text-center"><div class="text-accent-400 text-lg mb-1"><i class="fas fa-users"></i></div><div id="modal-drill-players" class="text-white text-sm font-semibold"></div><div class="text-gray-600 text-xs">Players</div></div>
          <div class="bg-panel rounded-xl p-3 text-center"><div class="text-accent-400 text-lg mb-1"><i class="fas fa-box"></i></div><div id="modal-drill-equipment" class="text-white text-xs font-semibold leading-tight"></div><div class="text-gray-600 text-xs">Equipment</div></div>
        </div>
        <!-- VIDEO SECTION -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-oswald text-lg font-bold text-white flex items-center gap-2"><i class="fab fa-youtube text-red-500"></i> DRILL VIDEOS</h4>
            <a id="modal-drill-yt-link" href="#" target="_blank" class="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors">
              <i class="fab fa-youtube"></i> Open in YouTube
            </a>
          </div>
          <div class="relative rounded-xl overflow-hidden bg-black" style="aspect-ratio:16/9">
            <div id="drill-video-loading" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
              <div class="w-8 h-8 border-2 border-accent-600 border-t-transparent rounded-full animate-spin mb-2"></div>
              <p class="text-gray-400 text-xs">Finding top video...</p>
            </div>
            <iframe id="drill-video-iframe"
              width="100%" height="100%"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style="position:absolute;top:0;left:0;width:100%;height:100%"
              onload="if(this.src)document.getElementById('drill-video-loading').style.display='none'">
            </iframe>
          </div>
          <p id="drill-video-meta" class="text-gray-500 text-xs mt-2 truncate"></p>
        </div>
        <!-- Steps -->
        <div class="mb-5">
          <h4 class="font-oswald text-lg font-bold text-white mb-3">STEPS</h4>
          <ol id="modal-drill-steps" class="space-y-2"></ol>
        </div>
        <!-- Tips -->
        <div>
          <h4 class="font-oswald text-lg font-bold text-white mb-3">COACHING TIPS</h4>
          <ul id="modal-drill-tips" class="space-y-2"></ul>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Upgrade Prompt Modal -->
<div id="upgrade-modal" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" style="display:none" onclick="if(event.target===this)closeUpgradeModal()">
  <div class="bg-surface border border-white/10 rounded-2xl w-full max-w-sm mx-4 p-8 text-center">
    <div class="text-5xl mb-4">🔒</div>
    <h3 class="font-oswald text-2xl font-bold text-white mb-2">Premium Drill</h3>
    <p class="text-gray-400 text-sm mb-6">This drill is part of a premium plan. Upgrade to unlock access to 200+ professional drills.</p>
    <a href="/pricing" class="block w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-xl transition-all mb-3">View Plans</a>
    <button onclick="closeUpgradeModal()" class="w-full text-gray-500 hover:text-white text-sm py-2 transition-colors">Maybe Later</button>
  </div>
</div>

<script>
const drillsData = ${JSON.stringify(DRILLS)};

let activeLevel = 'All';
let activeCat = 'All';

function filterDrills(type, val) {
  if (type === 'level') {
    activeLevel = val;
    document.querySelectorAll('[data-filter-type="level"]').forEach(btn => {
      btn.className = 'px-4 py-1.5 rounded-full text-sm font-medium transition-all ' + (btn.dataset.filterVal === val ? 'pill-active' : 'pill-inactive');
    });
  } else {
    activeCat = val;
    document.querySelectorAll('[data-filter-type="cat"]').forEach(btn => {
      btn.className = 'px-4 py-1.5 rounded-full text-sm font-medium transition-all ' + (btn.dataset.filterVal === val ? 'pill-active' : 'pill-inactive');
    });
  }
  applyFilters();
}

function applyFilters() {
  const cards = document.querySelectorAll('.drill-card');
  let visible = 0;
  cards.forEach(card => {
    const matchLevel = activeLevel === 'All' || card.dataset.level === activeLevel;
    const matchCat = activeCat === 'All' || card.dataset.cat === activeCat;
    if (matchLevel && matchCat) { card.style.display = ''; visible++; }
    else card.style.display = 'none';
  });
  document.getElementById('drill-count').textContent = visible + ' drills';
}

function openDrill(id) {
  const drill = drillsData.find(d => d.id === id);
  if (!drill) return;
  
  const badgeClass = drill.level === 'Beginner' ? 'badge-beginner' : drill.level === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';
  document.getElementById('modal-drill-badge').className = 'text-xs font-semibold px-2 py-0.5 rounded-full ' + badgeClass;
  document.getElementById('modal-drill-badge').textContent = drill.level;
  document.getElementById('modal-drill-category').textContent = drill.category;
  document.getElementById('modal-drill-title').textContent = drill.title;
  document.getElementById('modal-drill-desc').textContent = drill.description;
  document.getElementById('modal-drill-duration').textContent = drill.duration;
  document.getElementById('modal-drill-players').textContent = drill.players;
  document.getElementById('modal-drill-equipment').textContent = drill.equipment;
  
  // Load top YouTube video for this drill via server API
  var ytQuery = drill.title + ' soccer drill tutorial ' + drill.level;
  document.getElementById('drill-video-loading').style.display = 'flex';
  document.getElementById('drill-video-iframe').src = '';
  document.getElementById('modal-drill-yt-link').href = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(ytQuery);
  document.getElementById('drill-video-meta').textContent = '';
  fetch('/api/youtube-top?q=' + encodeURIComponent(ytQuery))
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.videoId) {
        document.getElementById('drill-video-iframe').src =
          'https://www.youtube.com/embed/' + data.videoId + '?autoplay=0&rel=0&modestbranding=1';
        document.getElementById('modal-drill-yt-link').href =
          'https://www.youtube.com/watch?v=' + data.videoId;
        var meta = data.title + (data.channel ? ' · ' + data.channel : '') + (data.views ? ' · ' + data.views : '');
        document.getElementById('drill-video-meta').textContent = meta;
      } else {
        document.getElementById('drill-video-loading').innerHTML =
          '<p class="text-gray-500 text-sm">No video found for this drill.</p>';
      }
    })
    .catch(function() {
      document.getElementById('drill-video-loading').innerHTML =
        '<p class="text-gray-500 text-sm">Could not load video.</p>';
    });
  
  const stepsList = document.getElementById('modal-drill-steps');
  stepsList.innerHTML = drill.steps.map((s, i) => 
    '<li class="flex items-start gap-3"><span class="w-5 h-5 bg-accent-600/20 text-accent-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">' + (i+1) + '</span><span class="text-gray-300 text-sm">' + s + '</span></li>'
  ).join('');
  
  const tipsList = document.getElementById('modal-drill-tips');
  tipsList.innerHTML = drill.tips.map(t => 
    '<li class="flex items-start gap-2 text-sm"><i class="fas fa-lightbulb text-yellow-400 text-xs mt-0.5 flex-shrink-0"></i><span class="text-gray-300">' + t + '</span></li>'
  ).join('');
  
  document.getElementById('drill-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeDrillModal() {
  document.getElementById('drill-video-iframe').src = '';
  document.getElementById('drill-video-loading').style.display = 'flex';
  document.getElementById('drill-video-loading').innerHTML = '<div class="w-8 h-8 border-2 border-accent-600 border-t-transparent rounded-full animate-spin mb-2"></div><p class="text-gray-400 text-xs">Finding top video...</p>';
  document.getElementById('drill-video-meta').textContent = '';
  document.getElementById('drill-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function showUpgradePrompt() {
  document.getElementById('upgrade-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeUpgradeModal() {
  document.getElementById('upgrade-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// Plan tier order for access control
var PLAN_ORDER = ['free','starter','pro','elite'];

// Unlock drills based on user plan from localStorage
// Load CMS featured drills from API
async function loadCMSDrills() {
  try {
    const res = await fetch('/api/cms/drills');
    if (!res.ok) return;
    const data = await res.json();
    const drills = data.drills || [];
    if (!drills.length) return;
    const PLAN_LABEL = { free: '🆓 Free', starter: '🌱 Starter', pro: '⚡ Pro', elite: '🏆 Elite' };
    const LEVEL_CLS  = { Beginner: 'badge-beginner', Intermediate: 'badge-intermediate', Advanced: 'badge-advanced' };
    const grid = document.getElementById('cms-drills-grid');
    const section = document.getElementById('cms-drills-section');
    const userObj = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
    const UP = ['free','starter','pro','elite'];
    const uTier = UP.indexOf((userObj && userObj.plan) || 'free');
    grid.innerHTML = drills.map(d => {
      const canAccess = uTier >= UP.indexOf(d.planRequired || 'free');
      const lvlCls = LEVEL_CLS[d.level] || 'badge-beginner';
      return \`<div class="bg-panel border border-accent-600/20 rounded-2xl overflow-hidden card-hover cursor-pointer"
           onclick="\${canAccess ? 'void(0)' : "window.location='/pricing'"}">
        <div class="p-5">
          <div class="flex items-start justify-between mb-3">
            <span class="\${lvlCls} text-xs font-semibold px-2 py-0.5 rounded-full">\${d.level}</span>
            <span class="bg-accent-600/15 text-accent-400 text-[10px] font-bold px-1.5 py-0.5 rounded">✨ New</span>
          </div>
          <h3 class="text-white font-semibold text-sm mb-1 line-clamp-2">\${d.title}</h3>
          <p class="text-accent-400 text-xs font-medium mb-2">\${d.category}</p>
          \${canAccess
            ? \`<p class="text-gray-500 text-xs line-clamp-2 mb-3">\${d.description || ''}</p>\`
            : \`<p class="text-gray-600 text-xs mb-3">Requires \${PLAN_LABEL[d.planRequired] || d.planRequired} plan.</p>\`
          }
          <div class="flex items-center gap-3 text-gray-600 text-xs">
            <span class="flex items-center gap-1"><i class="fas fa-clock"></i> \${d.duration}</span>
          </div>
          \${d.instructions && canAccess ? \`
          <div class="mt-3 pt-3 border-t border-white/5">
            <details class="group">
              <summary class="text-accent-400 text-xs font-semibold cursor-pointer">View Instructions</summary>
              <pre class="text-gray-400 text-xs mt-2 whitespace-pre-wrap leading-relaxed">\${d.instructions}</pre>
            </details>
          </div>\` : ''}
        </div>
      </div>\`;
    }).join('');
    section.classList.remove('hidden');
  } catch(e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  loadCMSDrills();
  const user = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
  const userPlan = (user && user.plan) ? user.plan : 'free';
  const userTier = PLAN_ORDER.indexOf(userPlan);
  const notice = document.getElementById('free-notice');

  if (userTier > 0 && notice) notice.style.display = 'none';

  // Unlock cards the user's plan covers
  document.querySelectorAll('.drill-card').forEach(function(card) {
    var cardPlan = card.dataset.drillPlan || 'free';
    var cardTier = PLAN_ORDER.indexOf(cardPlan);
    if (userTier >= cardTier) {
      // User can access this drill
      card.classList.remove('drill-card-locked');
      var drillId = card.dataset.drillId;
      card.setAttribute('onclick', 'openDrill("' + drillId + '")');
      // Show unlock icon
      var lockIcon = card.querySelector('.lock-icon');
      if (lockIcon) lockIcon.style.display = 'none';
      var unlockIcon = card.querySelector('.unlock-icon');
      if (unlockIcon) unlockIcon.style.display = 'inline';
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeDrillModal(); closeUpgradeModal(); }
});
</script>
`
  });
}
