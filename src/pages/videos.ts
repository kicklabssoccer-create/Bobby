import { pageShell } from '../lib/html';
import { VIDEOS, VIDEO_CATEGORIES, VIDEO_LEVELS } from '../data/videos';

export function videosPage() {
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
      <p class="text-gray-400 max-w-2xl">${VIDEOS.length}+ handpicked training videos from the world's top soccer coaches. Beginner, Intermediate, and Advanced content — all in one place.</p>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      ${[['🎥', VIDEOS.length + '+', 'Videos'], ['📚', '15', 'Categories'], ['📊', '25M+', 'Combined Views'], ['🎯', 'All Levels', 'Covered']].map(([emoji, val, label]) =>
        `<div class="bg-panel border border-white/10 rounded-xl p-4 text-center">
          <div class="text-2xl mb-1">${emoji}</div>
          <div class="font-oswald text-xl font-bold text-white">${val}</div>
          <div class="text-gray-500 text-xs">${label}</div>
        </div>`
      ).join('')}
    </div>

    <!-- Staff pick (featured) -->
    ${(() => {
      const featured = VIDEOS.find(v => v.featured);
      if (!featured) return '';
      return `<div class="bg-panel border border-accent-600/30 rounded-2xl overflow-hidden mb-10 cursor-pointer hover:border-accent-600/60 transition-all" onclick="openVideoModal('${featured.youtubeId}', '${featured.title.replace(/'/g, "\\'")}')">
        <div class="flex flex-col md:flex-row">
          <div class="relative md:w-80 h-48 flex-shrink-0 overflow-hidden bg-black">
            <img src="https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg" alt="${featured.title}" class="w-full h-full object-cover opacity-80">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 bg-accent-600/90 rounded-full flex items-center justify-center hover:bg-accent-500 transition-all">
                <i class="fas fa-play text-white text-xl ml-1"></i>
              </div>
            </div>
            <div class="absolute top-3 left-3"><span class="bg-accent-600 text-white text-xs font-bold px-2 py-0.5 rounded">STAFF PICK</span></div>
          </div>
          <div class="p-6 flex flex-col justify-center">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge-beginner text-xs font-semibold px-2 py-0.5 rounded-full">${featured.level}</span>
              <span class="text-gray-600 text-xs">${featured.category}</span>
            </div>
            <h3 class="font-oswald text-2xl font-bold text-white mb-2">${featured.title}</h3>
            <p class="text-gray-500 text-sm">${featured.channel} · ${featured.views} views · ${featured.duration}</p>
            <div class="mt-4 flex items-center gap-2 text-accent-400 text-sm font-semibold">
              <i class="fas fa-play-circle"></i> Watch Now — Free
            </div>
          </div>
        </div>
      </div>`;
    })()}

    <!-- Filters -->
    <div class="flex flex-col gap-3 mb-8">
      <!-- Level tabs -->
      <div class="flex flex-wrap gap-2">
        ${VIDEO_LEVELS.map(l => `
          <button onclick="filterVideos('level','${l}')" class="pill-${l==='All'?'active':'inactive'} px-4 py-1.5 rounded-full text-sm font-medium transition-all" data-vfilter-type="level" data-vfilter-val="${l}">${l}</button>
        `).join('')}
      </div>
      <!-- Category tabs -->
      <div class="flex flex-wrap gap-2">
        ${VIDEO_CATEGORIES.map(c => `
          <button onclick="filterVideos('cat','${c}')" class="pill-${c==='All'?'active':'inactive'} px-3 py-1.5 rounded-full text-xs font-medium transition-all" data-vfilter-type="cat" data-vfilter-val="${c}">${c}</button>
        `).join('')}
      </div>
    </div>

    <!-- Search -->
    <div class="relative mb-8 max-w-md">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
      <input type="text" id="video-search" placeholder="Search videos..." oninput="searchVideos(this.value)" class="w-full bg-panel border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm placeholder-gray-600">
    </div>

    <!-- Count -->
    <div class="flex items-center justify-between mb-6">
      <span class="text-gray-500 text-sm">Showing <span id="video-count" class="text-white font-semibold">${VIDEOS.length}</span> videos</span>
      <span class="text-accent-400 text-xs">
        <i class="fas fa-info-circle mr-1"></i>
        <span id="free-video-note">2 free previews • Subscribe for full access</span>
      </span>
    </div>

    <!-- Videos grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="videos-grid">
      ${VIDEOS.map((v, idx) => {
        const isFree = v.plan === 'free';
        const isLocked = !isFree;
        const badgeClass = v.level === 'Beginner' ? 'badge-beginner' : v.level === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced';
        return `
          <div class="bg-panel border border-white/10 rounded-2xl overflow-hidden card-hover video-card cursor-pointer ${isLocked ? 'video-locked' : ''}"
               data-vlevel="${v.level}" data-vcat="${v.category}" data-vtitle="${v.title.toLowerCase()}" data-vplan="${v.plan}"
               onclick="${isFree ? `openVideoModal('${v.youtubeId}','${v.title.replace(/'/g, "\\'")}')` : 'showVideoUpgrade()'}">
            <div class="relative h-40 overflow-hidden bg-black video-thumb">
              <img src="https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg" alt="${v.title}" class="w-full h-full object-cover ${isLocked ? 'opacity-40' : 'opacity-80'}">
              ${isLocked
                ? `<div class="absolute inset-0 flex items-center justify-center bg-black/40">
                     <div class="text-center">
                       <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1"><i class="fas fa-lock text-gray-400"></i></div>
                       <span class="text-gray-400 text-xs">Upgrade to unlock</span>
                     </div>
                   </div>`
                : `<div class="absolute inset-0 flex items-center justify-center">
                     <div class="play-btn w-12 h-12 bg-accent-600/90 rounded-full flex items-center justify-center hover:bg-accent-500 transition-all">
                       <i class="fas fa-play text-white text-lg ml-0.5"></i>
                     </div>
                   </div>`
              }
              <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">${v.duration}</div>
              ${v.featured ? '<div class="absolute top-2 left-2 bg-accent-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">FEATURED</div>' : ''}
            </div>
            <div class="p-4">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="${badgeClass} text-[10px] font-semibold px-1.5 py-0.5 rounded-full">${v.level}</span>
                <span class="text-gray-600 text-[10px]">${v.category}</span>
              </div>
              <h4 class="text-white text-sm font-semibold line-clamp-2 mb-1">${v.title}</h4>
              <p class="text-gray-500 text-xs">${v.channel} · ${v.views} views</p>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Upgrade CTA -->
    <div class="mt-12 bg-gradient-to-r from-accent-900/40 to-accent-700/20 border border-accent-600/30 rounded-2xl p-8 text-center" id="video-upgrade-cta">
      <div class="text-4xl mb-4">🎥</div>
      <h3 class="font-oswald text-3xl font-bold text-white mb-3">Unlock All ${VIDEOS.length}+ Videos</h3>
      <p class="text-gray-400 mb-6">You're currently viewing 2 free preview videos. Subscribe to get full access to every video, drill, and program.</p>
      <a href="/pricing" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white font-bold px-8 py-4 rounded-xl transition-all">
        <i class="fas fa-star"></i> View Subscription Plans
      </a>
    </div>
  </div>
</section>

<!-- Video Modal -->
<div id="video-modal" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" style="display:none" onclick="if(event.target===this)closeVideoModal()">
  <div class="bg-surface border border-white/10 rounded-2xl overflow-hidden w-full max-w-3xl mx-4">
    <div class="flex items-center justify-between p-4 border-b border-white/10">
      <h3 id="modal-video-title" class="text-white font-semibold text-sm pr-4 line-clamp-1"></h3>
      <button onclick="closeVideoModal()" class="text-gray-400 hover:text-white flex-shrink-0"><i class="fas fa-times text-lg"></i></button>
    </div>
    <div class="aspect-video bg-black">
      <iframe id="modal-iframe" width="100%" height="100%" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</div>

<!-- Upgrade Modal -->
<div id="video-upgrade-modal" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" style="display:none" onclick="if(event.target===this)closeVideoUpgrade()">
  <div class="bg-surface border border-white/10 rounded-2xl w-full max-w-sm mx-4 p-8 text-center">
    <div class="text-5xl mb-4">🎥</div>
    <h3 class="font-oswald text-2xl font-bold text-white mb-2">Premium Video</h3>
    <p class="text-gray-400 text-sm mb-6">This video is part of a premium plan. Upgrade to unlock access to all ${VIDEOS.length}+ training videos.</p>
    <a href="/pricing" class="block w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-xl transition-all mb-3">View Plans</a>
    <button onclick="closeVideoUpgrade()" class="w-full text-gray-500 hover:text-white text-sm py-2 transition-colors">Maybe Later</button>
  </div>
</div>

<script>
let vActiveLevel = 'All';
let vActiveCat = 'All';
let vActiveSearch = '';

function filterVideos(type, val) {
  if (type === 'level') {
    vActiveLevel = val;
    document.querySelectorAll('[data-vfilter-type="level"]').forEach(btn => {
      btn.className = 'px-4 py-1.5 rounded-full text-sm font-medium transition-all ' + (btn.dataset.vfilterVal === val ? 'pill-active' : 'pill-inactive');
    });
  } else {
    vActiveCat = val;
    document.querySelectorAll('[data-vfilter-type="cat"]').forEach(btn => {
      btn.className = 'px-3 py-1.5 rounded-full text-xs font-medium transition-all ' + (btn.dataset.vfilterVal === val ? 'pill-active' : 'pill-inactive');
    });
  }
  applyVideoFilters();
}

function searchVideos(q) {
  vActiveSearch = q.toLowerCase();
  applyVideoFilters();
}

function applyVideoFilters() {
  const cards = document.querySelectorAll('.video-card');
  let visible = 0;
  cards.forEach(card => {
    const matchLevel = vActiveLevel === 'All' || card.dataset.vlevel === vActiveLevel || card.dataset.vlevel === 'All';
    const matchCat = vActiveCat === 'All' || card.dataset.vcat === vActiveCat;
    const matchSearch = !vActiveSearch || card.dataset.vtitle.includes(vActiveSearch);
    if (matchLevel && matchCat && matchSearch) { card.style.display = ''; visible++; }
    else card.style.display = 'none';
  });
  document.getElementById('video-count').textContent = visible;
}

function openVideoModal(ytId, title) {
  document.getElementById('modal-iframe').src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1';
  document.getElementById('modal-video-title').textContent = title;
  document.getElementById('video-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  document.getElementById('modal-iframe').src = '';
  document.getElementById('video-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function showVideoUpgrade() {
  document.getElementById('video-upgrade-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeVideoUpgrade() {
  document.getElementById('video-upgrade-modal').style.display = 'none';
  document.body.style.overflow = '';
}

// Paid user unlock
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
  if (user && user.plan && user.plan !== 'free') {
    document.getElementById('video-upgrade-cta').style.display = 'none';
    const note = document.getElementById('free-video-note');
    if (note) note.textContent = 'Full access — ' + user.plan + ' plan';
    // Enable all videos for paid users
    document.querySelectorAll('.video-card').forEach(card => {
      card.classList.remove('video-locked');
      const ytId = card.querySelector('img') ? card.querySelector('img').src.split('/vi/')[1].split('/')[0] : '';
      const title = card.querySelector('h4') ? card.querySelector('h4').textContent : '';
      if (ytId) card.setAttribute('onclick', "openVideoModal('" + ytId + "','" + title.replace(/'/g, "\\'") + "')");
      // Restore thumbnail brightness and play button
      const img = card.querySelector('img');
      if (img) img.style.opacity = '0.8';
      const lockOverlay = card.querySelector('.bg-black\\/40');
      if (lockOverlay) lockOverlay.innerHTML = '<div class="absolute inset-0 flex items-center justify-center"><div class="play-btn w-12 h-12 bg-accent-600/90 rounded-full flex items-center justify-center hover:bg-accent-500 transition-all"><i class="fas fa-play text-white text-lg ml-0.5"></i></div></div>';
    });
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeVideoModal(); closeVideoUpgrade(); }
});
</script>
`
  });
}
