import { pageShell } from '../lib/html';

// Each topic has a curated search query + display metadata
const TOPICS = [
  // FREE — shown to everyone
  { id: 'bc-beg',    label: 'Ball Control — Beginner',       query: 'soccer ball control training beginner drills',          level: 'Beginner',     category: 'Ball Control', plan: 'free',    emoji: '⚽' },
  { id: 'drib-beg',  label: 'Dribbling — Beginner',          query: 'how to dribble a soccer ball for beginners tutorial',   level: 'Beginner',     category: 'Dribbling',   plan: 'free',    emoji: '🏃' },
  { id: 'drill-all', label: 'Best Soccer Drills — All',      query: 'best soccer training drills all levels 2024',           level: 'All Levels',   category: 'Drills',      plan: 'free',    emoji: '🎯' },
  { id: 'youth-fun', label: 'Fun Youth Soccer Games',        query: 'fun soccer games for kids youth training drills',       level: 'Beginner',     category: 'Youth',       plan: 'free',    emoji: '🧒' },

  // STARTER
  { id: 'bc-int',    label: 'Ball Mastery — Intermediate',   query: 'soccer ball mastery exercises intermediate training',   level: 'Intermediate', category: 'Ball Control', plan: 'starter', emoji: '⚽' },
  { id: 'pass-beg',  label: 'Passing — Beginner',            query: 'soccer passing drills for beginners tutorial',          level: 'Beginner',     category: 'Passing',     plan: 'starter', emoji: '↗️' },
  { id: 'shoot-beg', label: 'Shooting — Beginner',           query: 'how to shoot a soccer ball technique tutorial beginner',level: 'Beginner',     category: 'Shooting',    plan: 'starter', emoji: '🥅' },
  { id: 'drib-int',  label: 'Dribbling — Intermediate',      query: 'intermediate soccer dribbling skills 1v1 moves',       level: 'Intermediate', category: 'Dribbling',   plan: 'starter', emoji: '🏃' },
  { id: 'def-beg',   label: 'Defending — Beginner',          query: 'soccer defending basics for beginners how to defend',   level: 'Beginner',     category: 'Defending',   plan: 'starter', emoji: '🛡️' },
  { id: 'fit-beg',   label: 'Fitness — Beginner',            query: 'soccer fitness training for beginners get match ready', level: 'Beginner',     category: 'Fitness',     plan: 'starter', emoji: '💪' },
  { id: 'gk-beg',    label: 'Goalkeeper — Beginner',         query: 'goalkeeper training basics for beginners positioning',  level: 'Beginner',     category: 'Goalkeeper',  plan: 'starter', emoji: '🧤' },
  { id: 'youth-dev', label: 'Youth Development — Skills',    query: 'youth soccer skills development U12 U14 training',     level: 'Intermediate', category: 'Youth',       plan: 'starter', emoji: '🧒' },

  // PRO
  { id: 'bc-adv',    label: 'Ball Control — Advanced',       query: 'advanced soccer ball control elite footwork training',  level: 'Advanced',     category: 'Ball Control', plan: 'pro',     emoji: '⚽' },
  { id: 'pass-int',  label: 'Passing Combos — Intermediate', query: 'soccer passing combinations awareness rondo drills',    level: 'Intermediate', category: 'Passing',     plan: 'pro',     emoji: '↗️' },
  { id: 'shoot-int', label: 'Shooting — Intermediate',       query: 'soccer shooting improvement plan power accuracy drills',level: 'Intermediate', category: 'Shooting',    plan: 'pro',     emoji: '🥅' },
  { id: 'def-int',   label: '1v1 Defending Masterclass',     query: '1v1 defending soccer masterclass intermediate drills',  level: 'Intermediate', category: 'Defending',   plan: 'pro',     emoji: '🛡️' },
  { id: 'tac-beg',   label: 'Tactics — Understanding Formations', query: 'soccer tactics formations for beginners explained', level: 'Beginner',     category: 'Tactics',     plan: 'pro',     emoji: '🧠' },
  { id: 'tac-int',   label: 'Tactics — Reading the Game',    query: 'soccer tactics reading the game intermediate',         level: 'Intermediate', category: 'Tactics',     plan: 'pro',     emoji: '🧠' },
  { id: 'fit-int',   label: 'Speed & Agility — Intermediate',query: 'soccer speed agility training intermediate exercises',  level: 'Intermediate', category: 'Fitness',     plan: 'pro',     emoji: '💪' },
  { id: 'gk-adv',    label: 'Goalkeeper — Advanced',         query: 'advanced goalkeeper training reflexes distribution',    level: 'Advanced',     category: 'Goalkeeper',  plan: 'pro',     emoji: '🧤' },
  { id: 'mental-pr', label: 'Mental Performance — Focus',    query: 'soccer mental toughness confidence focus mindset',     level: 'All Levels',   category: 'Mental',      plan: 'pro',     emoji: '🧘' },

  // ELITE
  { id: 'drib-adv',  label: 'Dribbling — Elite 1v1 Moves',  query: 'advanced elite soccer dribbling skills 1v1 professional',level: 'Advanced',    category: 'Dribbling',   plan: 'elite',   emoji: '🏃' },
  { id: 'pass-adv',  label: 'Long Ball & Switching Play',    query: 'soccer long ball switching play advanced passing session',level: 'Advanced',    category: 'Passing',     plan: 'elite',   emoji: '↗️' },
  { id: 'shoot-adv', label: 'Advanced Finishing — Angles',   query: 'advanced soccer finishing goals from tight angles long range',level: 'Advanced', category: 'Shooting',    plan: 'elite',   emoji: '🥅' },
  { id: 'def-adv',   label: 'Defending — Zonal vs Man Mark', query: 'advanced defensive tactics zonal man marking soccer',   level: 'Advanced',     category: 'Defending',   plan: 'elite',   emoji: '🛡️' },
  { id: 'tac-adv',   label: 'High Press — Gegenpressing',    query: 'high press gegenpressing soccer tactics advanced',      level: 'Advanced',     category: 'Tactics',     plan: 'elite',   emoji: '🧠' },
  { id: 'fit-adv',   label: 'Elite Conditioning',            query: 'elite soccer conditioning yo-yo sprint intervals fitness',level: 'Advanced',    category: 'Fitness',     plan: 'elite',   emoji: '💪' },
  { id: 'mental-el', label: 'Elite Mental Performance',      query: 'elite soccer mental performance professional mindset',  level: 'Advanced',     category: 'Mental',      plan: 'elite',   emoji: '🧘' },
  { id: 'youth-adv', label: 'Youth Advanced — U16 Training', query: 'U16 U18 youth soccer advanced skill development session',level: 'Advanced',    category: 'Youth',       plan: 'elite',   emoji: '🧒' },
];

const FREE_TOPICS  = TOPICS.filter(t => t.plan === 'free');
const ALL_CATS     = ['All', ...new Set(TOPICS.map(t => t.category))];
const ALL_LEVELS   = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];
const ALL_PLANS    = ['free', 'starter', 'pro', 'elite'];

const PLAN_BADGE: Record<string, string> = {
  free:    'bg-gray-700/50 text-gray-300 border border-gray-600/30',
  starter: 'bg-green-500/15 text-green-400 border border-green-500/25',
  pro:     'bg-accent-600/15 text-accent-400 border border-accent-600/25',
  elite:   'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
};

function topicCard(t: typeof TOPICS[0], locked: boolean) {
  const badge = PLAN_BADGE[t.plan] || PLAN_BADGE.free;
  const lvlClass = t.level === 'Beginner' ? 'badge-beginner' : t.level === 'Intermediate' ? 'badge-intermediate' : t.level === 'Advanced' ? 'badge-advanced' : 'bg-white/10 text-gray-300';

  if (locked) {
    return `
    <div class="topic-card bg-panel border border-white/10 rounded-2xl overflow-hidden relative group cursor-pointer card-hover"
         data-plan="${t.plan}" data-cat="${t.category}" data-level="${t.level}" data-label="${t.label.toLowerCase()}"
         onclick="showUpgradeModal('${t.plan}')">
      <!-- Lock overlay -->
      <div class="h-36 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-5xl opacity-20">${t.emoji}</span>
        </div>
        <div class="relative text-center">
          <div class="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <i class="fas fa-lock text-gray-500 text-lg"></i>
          </div>
          <span class="text-gray-500 text-xs font-semibold uppercase tracking-wider">Unlock with ${t.plan.charAt(0).toUpperCase() + t.plan.slice(1)}</span>
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2 flex-wrap">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badge} uppercase">${t.plan}</span>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${lvlClass}">${t.level}</span>
        </div>
        <h4 class="text-gray-500 text-sm font-semibold line-clamp-2 mb-1">${t.label}</h4>
        <p class="text-gray-600 text-xs">${t.category}</p>
      </div>
    </div>`;
  }

  // Unlocked — clicking opens YouTube search in modal
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(t.query)}`;
  return `
  <div class="topic-card bg-panel border border-white/10 rounded-2xl overflow-hidden cursor-pointer card-hover group"
       data-plan="${t.plan}" data-cat="${t.category}" data-level="${t.level}" data-label="${t.label.toLowerCase()}"
       onclick="openSearch('${encodeURIComponent(t.query)}','${t.label.replace(/'/g, "\\'")}')">
    <!-- Thumbnail-style preview -->
    <div class="h-36 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center relative overflow-hidden group-hover:from-accent-900/40 transition-all duration-300">
      <span class="text-6xl opacity-30 group-hover:opacity-50 transition-all duration-300">${t.emoji}</span>
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div class="w-14 h-14 bg-accent-600/90 rounded-full flex items-center justify-center shadow-2xl shadow-accent-600/40">
          <i class="fab fa-youtube text-white text-2xl"></i>
        </div>
      </div>
      <div class="absolute bottom-2 right-2">
        <span class="bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
          <i class="fab fa-youtube text-red-500 text-xs"></i> Live Search
        </span>
      </div>
      ${t.plan === 'free' ? '<div class="absolute top-2 left-2"><span class="bg-accent-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">FREE</span></div>' : ''}
    </div>
    <div class="p-4">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${badge} uppercase">${t.plan}</span>
        <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${lvlClass}">${t.level}</span>
      </div>
      <h4 class="text-white text-sm font-semibold line-clamp-2 mb-1 group-hover:text-accent-300 transition-colors">${t.label}</h4>
      <p class="text-gray-500 text-xs">${t.category}</p>
    </div>
  </div>`;
}

export function videosPage() {
  // Server-side: render all cards (JS will handle lock/unlock per user plan)
  const allCards = TOPICS.map(t => topicCard(t, false)).join('');

  return pageShell({
    title: 'Video Library — Kicklab',
    activePath: '/videos',
    body: `
<section class="py-16 bg-midnight min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Header -->
    <div class="mb-10">
      <div class="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-2">Video Library</div>
      <h1 class="font-oswald text-5xl font-bold text-white mb-3">LEARN FROM<br/><span class="gradient-text">THE BEST.</span></h1>
      <p class="text-gray-400 max-w-2xl">
        ${TOPICS.length} curated soccer training topics — ball control, dribbling, shooting, tactics, fitness and more.
        Each card searches YouTube live so you always get real, current soccer videos.
      </p>
    </div>

    <!-- How it works banner -->
    <div class="bg-accent-600/8 border border-accent-600/20 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div class="w-10 h-10 bg-accent-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <i class="fab fa-youtube text-red-400 text-xl"></i>
      </div>
      <div class="flex-1">
        <div class="text-white font-semibold text-sm">Live YouTube Search — Always Fresh</div>
        <div class="text-gray-400 text-xs mt-0.5">Click any topic → opens a curated YouTube search for that exact skill. Real videos, real coaches, always up-to-date.</div>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span class="text-green-400 text-xs font-semibold">Live</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      ${[
        ['🎯', TOPICS.length + '', 'Training Topics'],
        ['📚', '10', 'Categories'],
        ['🎚️', '4', 'Skill Levels'],
        ['🔴', 'Live', 'YouTube Search'],
      ].map(([emoji, val, label]) =>
        `<div class="bg-panel border border-white/10 rounded-xl p-4 text-center">
          <div class="text-2xl mb-1">${emoji}</div>
          <div class="font-oswald text-xl font-bold text-white">${val}</div>
          <div class="text-gray-500 text-xs">${label}</div>
        </div>`
      ).join('')}
    </div>

    <!-- Filters -->
    <div class="bg-panel border border-white/10 rounded-2xl p-4 mb-8">
      <div class="flex flex-wrap gap-3 items-center">
        <!-- Search -->
        <div class="relative flex-1 min-w-[180px]">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
          <input type="text" id="topic-search" placeholder="Search topics…"
                 oninput="applyFilters()"
                 class="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-gray-600"/>
        </div>
        <!-- Level -->
        <select id="filter-level" onchange="applyFilters()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
          <option value="">All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>All Levels</option>
        </select>
        <!-- Category -->
        <select id="filter-cat" onchange="applyFilters()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
          <option value="">All Categories</option>
          ${[...new Set(TOPICS.map(t => t.category))].map(c => `<option>${c}</option>`).join('')}
        </select>
        <!-- Clear -->
        <button onclick="clearFilters()" class="text-gray-400 hover:text-white text-sm px-3 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
          <i class="fas fa-times mr-1"></i>Clear
        </button>
      </div>
      <!-- Category pills -->
      <div class="flex flex-wrap gap-2 mt-3">
        <button onclick="setCat('')" data-cat="" class="cat-pill cat-active px-3 py-1.5 rounded-full text-xs font-medium transition-all">All</button>
        ${[...new Set(TOPICS.map(t => t.category))].map(c =>
          `<button onclick="setCat('${c}')" data-cat="${c}" class="cat-pill cat-inactive px-3 py-1.5 rounded-full text-xs font-medium transition-all">${c}</button>`
        ).join('')}
      </div>
      <div class="mt-2 text-gray-600 text-xs" id="filter-count">${TOPICS.length} topics available</div>
    </div>

    <!-- Plan Tier Tabs -->
    <div class="flex flex-wrap gap-3 mb-8" id="plan-tabs">
      <button onclick="setPlan('all')" data-plan="all"
              class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-accent-600 text-white shadow-lg shadow-accent-600/20">
        All Topics
      </button>
      <button onclick="setPlan('free')" data-plan="free"
              class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-gray-300 hover:text-white hover:bg-white/10">
        🆓 Free
      </button>
      <button onclick="setPlan('starter')" data-plan="starter"
              class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-green-400 hover:bg-green-500/10">
        🌱 Starter
      </button>
      <button onclick="setPlan('pro')" data-plan="pro"
              class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-accent-400 hover:bg-accent-600/10">
        ⚡ Pro
      </button>
      <button onclick="setPlan('elite')" data-plan="elite"
              class="plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all bg-white/5 text-yellow-400 hover:bg-yellow-500/10">
        🏆 Elite
      </button>
    </div>

    <!-- Topic Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="topics-grid">
      ${allCards}
    </div>

    <!-- No results -->
    <div id="no-results" style="display:none" class="text-center py-20">
      <div class="text-5xl mb-4">🔍</div>
      <div class="text-gray-400 text-lg font-semibold mb-2">No topics match your filters</div>
      <button onclick="clearFilters()" class="text-accent-400 text-sm hover:underline">Clear filters</button>
    </div>

    <!-- Upgrade CTA (shown to free users) -->
    <div id="upgrade-cta" class="mt-14 bg-gradient-to-r from-accent-900/40 to-accent-700/20 border border-accent-600/30 rounded-2xl p-8 text-center" style="display:none">
      <div class="text-4xl mb-4">🔓</div>
      <h3 class="font-oswald text-3xl font-bold text-white mb-3">Unlock All ${TOPICS.length} Training Topics</h3>
      <p class="text-gray-400 mb-6 max-w-xl mx-auto">
        You have access to <strong class="text-white">${FREE_TOPICS.length} free topics</strong>.
        Subscribe to unlock all topics — ball control, dribbling, tactics, fitness, goalkeeper training and more.
      </p>
      <a href="/pricing" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white font-bold px-8 py-4 rounded-xl transition-all">
        <i class="fas fa-star"></i> View Plans — from $9/mo
      </a>
    </div>

  </div>
</section>

<!-- ═══════════════════ YOUTUBE SEARCH MODAL ═══════════════════ -->
<div id="yt-modal" style="display:none" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" onclick="if(event.target===this)closeYT()">
  <div class="bg-surface border border-white/10 rounded-2xl overflow-hidden w-full mx-4 shadow-2xl flex flex-col" style="max-width:960px;max-height:90vh">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <i class="fab fa-youtube text-red-500"></i>
        </div>
        <div class="min-w-0">
          <h3 id="yt-modal-title" class="text-white font-bold text-sm truncate"></h3>
          <p class="text-gray-500 text-xs">Live YouTube search results</p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0 ml-3">
        <a id="yt-open-link" href="#" target="_blank"
           class="hidden sm:inline-flex items-center gap-1.5 bg-red-600/15 hover:bg-red-600/25 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all">
          <i class="fas fa-external-link-alt text-xs"></i> Open in YouTube
        </a>
        <button onclick="closeYT()" class="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-all">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Search bar inside modal to refine -->
    <div class="px-5 py-3 border-b border-white/5 flex-shrink-0 flex items-center gap-3">
      <i class="fas fa-search text-gray-500 text-sm flex-shrink-0"></i>
      <input id="yt-refine" type="text" placeholder="Refine your search…"
             class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-white text-sm placeholder-gray-600"
             onkeydown="if(event.key==='Enter')refineSearch()"/>
      <button onclick="refineSearch()" class="bg-accent-600 hover:bg-accent-700 text-white text-xs px-4 py-1.5 rounded-lg font-semibold transition-all flex-shrink-0">Search</button>
    </div>

    <!-- Iframe -->
    <div class="flex-1 relative min-h-0" style="height:600px">
      <iframe id="yt-iframe"
              src=""
              class="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin">
      </iframe>
      <!-- Loading indicator -->
      <div id="yt-loading" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
        <div class="w-12 h-12 border-2 border-accent-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-gray-400 text-sm">Loading YouTube…</p>
      </div>
    </div>

    <!-- Footer tip -->
    <div class="px-5 py-3 border-t border-white/5 flex-shrink-0 flex items-center gap-2 text-gray-600 text-xs">
      <i class="fas fa-lightbulb text-yellow-500/60 text-xs"></i>
      <span>Click any video in the results to play it. Use the search bar above to narrow down topics.</span>
    </div>
  </div>
</div>

<!-- ═══════════════════ UPGRADE MODAL ═══════════════════ -->
<div id="upgrade-modal" style="display:none" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" onclick="if(event.target===this)closeUpgrade()">
  <div class="bg-surface border border-white/10 rounded-2xl w-full max-w-sm mx-4 p-8 text-center">
    <div class="text-5xl mb-4">🔒</div>
    <h3 class="font-oswald text-2xl font-bold text-white mb-2">Premium Content</h3>
    <p class="text-gray-400 text-sm mb-2" id="upgrade-msg">Upgrade to unlock this training topic and all premium content.</p>
    <div id="upgrade-plan-badge" class="mb-6"></div>
    <a href="/pricing" class="block w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-xl transition-all mb-3">
      <i class="fas fa-star mr-2"></i>View Plans
    </a>
    <button onclick="closeUpgrade()" class="w-full text-gray-500 hover:text-white text-sm py-2 transition-colors">Maybe Later</button>
  </div>
</div>

<style>
.cat-active { background: rgba(37,99,235,0.2); color: #60a5fa; border: 1px solid rgba(37,99,235,0.3); }
.cat-inactive { background: rgba(255,255,255,0.05); color: #9ca3af; border: 1px solid rgba(255,255,255,0.08); }
.cat-inactive:hover { color: #fff; background: rgba(255,255,255,0.1); }
</style>

<script>
// ─── DATA ─────────────────────────────────────────────────────────
const TOPICS_DATA = ${JSON.stringify(TOPICS)};
const FREE_IDS    = ${JSON.stringify(FREE_TOPICS.map(t => t.id))};
const PLAN_ORDER  = ['free','starter','pro','elite'];

let activePlan  = 'all';
let activeCat   = '';
let activeLevel = '';
let activeQuery = '';
let userPlan    = 'free'; // set by localStorage on load

// ─── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const stored = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
  userPlan = (stored && stored.plan) ? stored.plan : 'free';
  applyLockState();
  applyFilters();
  if (userPlan === 'free') {
    document.getElementById('upgrade-cta').style.display = 'block';
  }
});

function userCanAccess(plan) {
  return PLAN_ORDER.indexOf(userPlan) >= PLAN_ORDER.indexOf(plan);
}

function applyLockState() {
  document.querySelectorAll('.topic-card').forEach(card => {
    const plan = card.dataset.plan;
    const canAccess = userCanAccess(plan);
    if (canAccess) {
      card.classList.remove('locked-card');
    } else {
      card.classList.add('locked-card');
    }
    // Update the lock overlay visibility
    const lockOverlay = card.querySelector('.lock-icon');
    if (lockOverlay) lockOverlay.style.display = canAccess ? 'none' : 'flex';
  });
}

// ─── FILTERS ──────────────────────────────────────────────────────
function applyFilters() {
  const q     = (document.getElementById('topic-search').value || '').toLowerCase();
  const level = document.getElementById('filter-level').value;
  const cat   = document.getElementById('filter-cat').value;

  const cards = document.querySelectorAll('.topic-card');
  let shown = 0;

  cards.forEach(card => {
    const matchPlan  = activePlan === 'all' || card.dataset.plan === activePlan;
    const matchCat   = !cat   || card.dataset.cat === cat;
    const matchLevel = !level || card.dataset.level === level || card.dataset.level === 'All Levels';
    const matchQ     = !q     || card.dataset.label.includes(q) || card.dataset.cat.toLowerCase().includes(q);

    const show = matchPlan && matchCat && matchLevel && matchQ;
    card.style.display = show ? '' : 'none';
    if (show) shown++;
  });

  document.getElementById('filter-count').textContent = shown + ' topics shown';
  document.getElementById('no-results').style.display = shown === 0 ? 'block' : 'none';
}

function setCat(cat) {
  document.getElementById('filter-cat').value = cat;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    const isActive = btn.dataset.cat === cat;
    btn.className = 'cat-pill ' + (isActive ? 'cat-active' : 'cat-inactive') + ' px-3 py-1.5 rounded-full text-xs font-medium transition-all';
  });
  applyFilters();
}

function setPlan(plan) {
  activePlan = plan;
  document.querySelectorAll('.plan-tab').forEach(btn => {
    const isActive = btn.dataset.plan === plan;
    btn.className = 'plan-tab px-5 py-2 rounded-full text-sm font-semibold transition-all '
      + (isActive ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/20' : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10');
  });
  applyFilters();
}

function clearFilters() {
  document.getElementById('topic-search').value = '';
  document.getElementById('filter-level').value = '';
  document.getElementById('filter-cat').value = '';
  setCat('');
  setPlan('all');
}

// ─── YOUTUBE SEARCH MODAL ─────────────────────────────────────────
function openSearch(encodedQuery, title) {
  const query = decodeURIComponent(encodedQuery);
  const ytSearchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);

  document.getElementById('yt-modal-title').textContent = title;
  document.getElementById('yt-refine').value = query;
  document.getElementById('yt-open-link').href = ytSearchUrl;
  document.getElementById('yt-loading').style.display = 'flex';

  // Embed the search inside an iframe
  document.getElementById('yt-iframe').src = ytSearchUrl;
  document.getElementById('yt-iframe').onload = () => {
    document.getElementById('yt-loading').style.display = 'none';
  };

  document.getElementById('yt-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function refineSearch() {
  const q = document.getElementById('yt-refine').value.trim();
  if (!q) return;
  const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q + ' soccer training');
  document.getElementById('yt-open-link').href = url;
  document.getElementById('yt-loading').style.display = 'flex';
  document.getElementById('yt-iframe').src = url;
  document.getElementById('yt-iframe').onload = () => {
    document.getElementById('yt-loading').style.display = 'none';
  };
}

function closeYT() {
  document.getElementById('yt-iframe').src = '';
  document.getElementById('yt-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// ─── UPGRADE MODAL ────────────────────────────────────────────────
function showUpgradeModal(plan) {
  const planNames = { starter: 'Starter 🌱', pro: 'Pro ⚡', elite: 'Elite 🏆' };
  const planColors = { starter: 'text-green-400', pro: 'text-accent-400', elite: 'text-yellow-400' };
  document.getElementById('upgrade-msg').textContent =
    'This topic requires a ' + (planNames[plan] || plan) + ' plan or higher.';
  document.getElementById('upgrade-plan-badge').innerHTML =
    '<span class="text-sm font-bold ' + (planColors[plan]||'text-white') + '">Required: ' + (planNames[plan]||plan) + '</span>';
  document.getElementById('upgrade-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeUpgrade() {
  document.getElementById('upgrade-modal').style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeYT(); closeUpgrade(); }
});
</script>
`
  });
}
