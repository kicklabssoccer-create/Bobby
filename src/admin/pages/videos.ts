import { adminShell } from '../layout'
import { VIDEOS } from '../../data/videos'

export function adminVideosPage(): string {
  const rows = VIDEOS.map(v => {
    const planClass = `badge-${v.plan}`
    const levelClass = v.level === 'Beginner' ? 'badge-beginner' : v.level === 'Intermediate' ? 'badge-intermediate' : v.level === 'Advanced' ? 'badge-advanced' : 'bg-white/10 text-slate-300'
    const stars = '★'.repeat(Math.round(4.5)) + '☆'.repeat(5 - Math.round(4.5))
    return `
    <tr class="table-row border-b border-white/5 cursor-pointer" onclick="viewVideo('${v.id}')">
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-20 h-12 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0 relative group">
            <img src="https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg"
                 alt="${v.title.replace(/'/g, "&#39;")}"
                 class="w-full h-full object-cover"
                 onerror="this.style.display='none'"/>
            <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="fas fa-play text-white text-xs"></i>
            </div>
          </div>
          <div class="min-w-0">
            <div class="text-white text-sm font-medium truncate max-w-xs">${v.title}</div>
            <div class="text-slate-400 text-xs mt-0.5">${v.channel}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3">
        <span class="text-xs font-medium px-2 py-1 rounded-full ${levelClass}">${v.level}</span>
      </td>
      <td class="px-4 py-3 text-slate-300 text-sm">${v.category}</td>
      <td class="px-4 py-3 text-slate-300 text-sm">${v.duration}</td>
      <td class="px-4 py-3 text-slate-400 text-sm">${v.views}</td>
      <td class="px-4 py-3">
        <span class="text-xs font-bold px-2.5 py-1 rounded-full uppercase ${planClass}">${v.plan}</span>
      </td>
      <td class="px-4 py-3">
        ${v.featured ? '<span class="text-xs bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full">Featured</span>' : '<span class="text-slate-600 text-xs">—</span>'}
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center gap-2" onclick="event.stopPropagation()">
          <button onclick="editVideo('${v.id}')" class="text-accent-400 hover:text-accent-300 text-sm p-1.5 hover:bg-white/5 rounded-lg transition-all" title="Edit">
            <i class="fas fa-pen"></i>
          </button>
          <a href="https://youtube.com/watch?v=${v.youtubeId}" target="_blank" class="text-green-400 hover:text-green-300 text-sm p-1.5 hover:bg-white/5 rounded-lg transition-all" title="Watch on YouTube" onclick="event.stopPropagation()">
            <i class="fab fa-youtube"></i>
          </a>
          <button onclick="deleteVideo('${v.id}','${v.title.replace(/'/g, "\\'")}')" class="text-red-400 hover:text-red-300 text-sm p-1.5 hover:bg-white/5 rounded-lg transition-all" title="Delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>`
  }).join('')

  // Stat counts
  const freeCount = VIDEOS.filter(v => v.plan === 'free').length
  const starterCount = VIDEOS.filter(v => v.plan === 'starter').length
  const proCount = VIDEOS.filter(v => v.plan === 'pro').length
  const eliteCount = VIDEOS.filter(v => v.plan === 'elite').length

  const body = `
<!-- Page header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <h2 class="text-2xl font-bold text-white">Video Library</h2>
    <p class="text-slate-400 text-sm mt-1">${VIDEOS.length} videos across all plans and categories</p>
  </div>
  <button onclick="openModal('add-video-modal')" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-accent-600/20">
    <i class="fas fa-plus"></i> Add Video
  </button>
</div>

<!-- Stat Cards -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Total Videos</div>
    <div class="text-2xl font-bold text-white">${VIDEOS.length}</div>
    <div class="text-xs text-slate-500 mt-1">Across all plans</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Free Tier</div>
    <div class="text-2xl font-bold text-slate-300">${freeCount}</div>
    <div class="text-xs text-slate-500 mt-1">Public access</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Pro/Elite</div>
    <div class="text-2xl font-bold text-accent-400">${proCount + eliteCount}</div>
    <div class="text-xs text-slate-500 mt-1">Premium content</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Featured</div>
    <div class="text-2xl font-bold text-yellow-400">${VIDEOS.filter(v => v.featured).length}</div>
    <div class="text-xs text-slate-500 mt-1">Staff picks</div>
  </div>
</div>

<!-- Filters + Search -->
<div class="bg-slate-800 border border-white/6 rounded-2xl p-4 mb-4">
  <div class="flex flex-wrap gap-3 items-center">
    <div class="relative flex-1 min-w-[200px]">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
      <input type="text" id="video-search" placeholder="Search title or channel…"
             oninput="filterVideos()"
             class="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-slate-500"/>
    </div>
    <select id="filter-level" onchange="filterVideos()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
      <option value="">All Levels</option>
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Advanced</option>
      <option>All</option>
    </select>
    <select id="filter-cat" onchange="filterVideos()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
      <option value="">All Categories</option>
      <option>Ball Control</option><option>Drills</option><option>Dribbling</option>
      <option>Passing</option><option>Shooting</option><option>Defending</option>
      <option>Tactics</option><option>Fitness</option><option>Goalkeeper</option>
      <option>Mental</option><option>Youth</option>
    </select>
    <select id="filter-plan" onchange="filterVideos()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
      <option value="">All Plans</option>
      <option value="free">Free</option>
      <option value="starter">Starter</option>
      <option value="pro">Pro</option>
      <option value="elite">Elite</option>
    </select>
    <button onclick="clearFilters()" class="text-slate-400 hover:text-white text-sm px-3 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
      <i class="fas fa-times mr-1"></i>Clear
    </button>
  </div>
  <div class="mt-2 text-slate-500 text-xs" id="filter-count">${VIDEOS.length} videos shown</div>
</div>

<!-- Table -->
<div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full" id="videos-table">
      <thead>
        <tr class="border-b border-white/8">
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Video</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Level</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Views</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Featured</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody id="videos-tbody">
        ${rows}
      </tbody>
    </table>
  </div>
  <div id="no-results" class="hidden text-center py-16 text-slate-500">
    <i class="fas fa-film text-4xl mb-3 block opacity-30"></i>
    <p>No videos match your filters.</p>
  </div>
</div>

<!-- =================== VIEW VIDEO MODAL =================== -->
<div id="view-video-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl animate-in">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8">
      <h3 class="text-white font-bold text-lg">Video Details</h3>
      <button onclick="closeModal('view-video-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6" id="view-video-body">
      <!-- filled by JS -->
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8">
      <button onclick="closeModal('view-video-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Close</button>
    </div>
  </div>
</div>

<!-- =================== ADD VIDEO MODAL =================== -->
<div id="add-video-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in max-h-[90vh] overflow-y-auto">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-slate-800 z-10">
      <h3 class="text-white font-bold text-lg">Add New Video</h3>
      <button onclick="closeModal('add-video-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Video Title *</label>
        <input type="text" id="new-title" placeholder="Enter video title"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">YouTube ID *</label>
        <input type="text" id="new-ytid" placeholder="e.g. vJHlhFN5r1c"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"
               oninput="previewThumb()"/>
        <div id="thumb-preview" class="mt-2 hidden">
          <img id="thumb-img" class="w-32 h-20 object-cover rounded-lg border border-white/10"/>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Channel</label>
          <input type="text" id="new-channel" placeholder="Channel name"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Duration</label>
          <input type="text" id="new-duration" placeholder="e.g. 14:32"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Level</label>
          <select id="new-level" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category</label>
          <select id="new-category" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Ball Control</option><option>Drills</option><option>Dribbling</option>
            <option>Passing</option><option>Shooting</option><option>Defending</option>
            <option>Tactics</option><option>Fitness</option><option>Goalkeeper</option>
            <option>Mental</option><option>Youth</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Access</label>
          <select id="new-plan" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="free">Free</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="elite">Elite</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Views</label>
          <input type="text" id="new-views" placeholder="e.g. 1.2M"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
      </div>
      <div class="flex items-center gap-3 pt-1">
        <input type="checkbox" id="new-featured" class="w-4 h-4 rounded accent-blue-600"/>
        <label for="new-featured" class="text-slate-300 text-sm">Mark as Featured / Staff Pick</label>
      </div>
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8 sticky bottom-0 bg-slate-800">
      <button onclick="closeModal('add-video-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Cancel</button>
      <button onclick="saveNewVideo()" class="px-5 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
        <i class="fas fa-plus mr-1.5"></i>Add Video
      </button>
    </div>
  </div>
</div>

<!-- =================== EDIT VIDEO MODAL =================== -->
<div id="edit-video-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in max-h-[90vh] overflow-y-auto">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-slate-800 z-10">
      <h3 class="text-white font-bold text-lg">Edit Video</h3>
      <button onclick="closeModal('edit-video-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6 space-y-4">
      <input type="hidden" id="edit-vid"/>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Video Title</label>
        <input type="text" id="edit-title"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">YouTube ID</label>
        <input type="text" id="edit-ytid"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Channel</label>
          <input type="text" id="edit-channel"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Duration</label>
          <input type="text" id="edit-duration"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Level</label>
          <select id="edit-level" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Access</label>
          <select id="edit-plan" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="free">Free</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="elite">Elite</option>
          </select>
        </div>
      </div>
      <div class="flex items-center gap-3 pt-1">
        <input type="checkbox" id="edit-featured" class="w-4 h-4 rounded accent-blue-600"/>
        <label for="edit-featured" class="text-slate-300 text-sm">Mark as Featured / Staff Pick</label>
      </div>
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8 sticky bottom-0 bg-slate-800">
      <button onclick="closeModal('edit-video-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Cancel</button>
      <button onclick="saveEditVideo()" class="px-5 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
        <i class="fas fa-save mr-1.5"></i>Save Changes
      </button>
    </div>
  </div>
</div>

<script>
// ─── DATA ────────────────────────────────────────────────────────
const VIDEOS_DATA = ${JSON.stringify(VIDEOS)};

// ─── FILTER ──────────────────────────────────────────────────────
function filterVideos() {
  const q   = (document.getElementById('video-search').value || '').toLowerCase();
  const lvl = (document.getElementById('filter-level').value || '').toLowerCase();
  const cat = (document.getElementById('filter-cat').value || '').toLowerCase();
  const pln = (document.getElementById('filter-plan').value || '').toLowerCase();

  const rows = document.querySelectorAll('#videos-tbody tr');
  let shown = 0;
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const cells = row.querySelectorAll('td');
    const rowLevel = cells[1]?.textContent.trim().toLowerCase() || '';
    const rowCat   = cells[2]?.textContent.trim().toLowerCase() || '';
    const rowPlan  = cells[5]?.textContent.trim().toLowerCase() || '';

    const ok = (!q || text.includes(q))
            && (!lvl || rowLevel.includes(lvl))
            && (!cat || rowCat.includes(cat))
            && (!pln || rowPlan.includes(pln));

    row.style.display = ok ? '' : 'none';
    if (ok) shown++;
  });
  document.getElementById('filter-count').textContent = shown + ' videos shown';
  document.getElementById('no-results').classList.toggle('hidden', shown > 0);
}

function clearFilters() {
  document.getElementById('video-search').value = '';
  document.getElementById('filter-level').value = '';
  document.getElementById('filter-cat').value = '';
  document.getElementById('filter-plan').value = '';
  filterVideos();
}

// ─── VIEW ─────────────────────────────────────────────────────────
function viewVideo(id) {
  const v = VIDEOS_DATA.find(x => x.id === id);
  if (!v) return;
  const planColors = { free:'badge-free', starter:'badge-starter', pro:'badge-pro', elite:'badge-elite' };
  document.getElementById('view-video-body').innerHTML = \`
    <div class="space-y-4">
      <div class="aspect-video rounded-xl overflow-hidden bg-slate-900">
        <iframe width="100%" height="100%"
          src="https://www.youtube.com/embed/\${v.youtubeId}"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
      <div>
        <div class="flex items-start gap-3 flex-wrap">
          <h4 class="text-white font-bold text-lg flex-1">\${v.title}</h4>
          <span class="text-xs font-bold px-2.5 py-1 rounded-full uppercase \${planColors[v.plan] || ''}">\${v.plan}</span>
        </div>
        <div class="text-slate-400 text-sm mt-1">\${v.channel} · \${v.views} views · \${v.duration}</div>
      </div>
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-slate-400 text-xs">Level</div>
          <div class="text-white text-sm font-semibold mt-1">\${v.level}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-slate-400 text-xs">Category</div>
          <div class="text-white text-sm font-semibold mt-1">\${v.category}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-slate-400 text-xs">Featured</div>
          <div class="text-sm font-semibold mt-1 \${v.featured ? 'text-yellow-400' : 'text-slate-500'}">\${v.featured ? 'Yes ★' : 'No'}</div>
        </div>
      </div>
      <div class="flex gap-2">
        <a href="https://youtube.com/watch?v=\${v.youtubeId}" target="_blank"
           class="inline-flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-all">
          <i class="fab fa-youtube"></i> Open on YouTube
        </a>
        <button onclick="closeModal('view-video-modal'); editVideo('\${v.id}')"
                class="inline-flex items-center gap-2 bg-accent-600/20 hover:bg-accent-600/30 border border-accent-600/20 text-accent-400 px-4 py-2 rounded-xl text-sm font-medium transition-all">
          <i class="fas fa-pen"></i> Edit
        </button>
      </div>
    </div>\`;
  openModal('view-video-modal');
}

// ─── EDIT ─────────────────────────────────────────────────────────
function editVideo(id) {
  const v = VIDEOS_DATA.find(x => x.id === id);
  if (!v) return;
  document.getElementById('edit-vid').value = v.id;
  document.getElementById('edit-title').value = v.title;
  document.getElementById('edit-ytid').value = v.youtubeId;
  document.getElementById('edit-channel').value = v.channel;
  document.getElementById('edit-duration').value = v.duration;
  document.getElementById('edit-level').value = v.level;
  document.getElementById('edit-plan').value = v.plan;
  document.getElementById('edit-featured').checked = !!v.featured;
  openModal('edit-video-modal');
}

function saveEditVideo() {
  const title = document.getElementById('edit-title').value.trim();
  if (!title) { showToast('Title is required', 'error'); return; }
  showToast('Video updated successfully!', 'success');
  closeModal('edit-video-modal');
}

// ─── ADD ──────────────────────────────────────────────────────────
function previewThumb() {
  const ytid = document.getElementById('new-ytid').value.trim();
  const preview = document.getElementById('thumb-preview');
  const img = document.getElementById('thumb-img');
  if (ytid.length > 5) {
    img.src = 'https://img.youtube.com/vi/' + ytid + '/mqdefault.jpg';
    preview.classList.remove('hidden');
  } else {
    preview.classList.add('hidden');
  }
}

function saveNewVideo() {
  const title = document.getElementById('new-title').value.trim();
  const ytid  = document.getElementById('new-ytid').value.trim();
  if (!title || !ytid) { showToast('Title and YouTube ID are required', 'error'); return; }
  showToast('Video added successfully!', 'success');
  closeModal('add-video-modal');
  document.getElementById('new-title').value = '';
  document.getElementById('new-ytid').value = '';
  document.getElementById('new-channel').value = '';
  document.getElementById('new-duration').value = '';
  document.getElementById('new-views').value = '';
  document.getElementById('thumb-preview').classList.add('hidden');
}

// ─── DELETE ───────────────────────────────────────────────────────
function deleteVideo(id, title) {
  if (confirm('Delete video "' + title + '"?\n\nThis action cannot be undone.')) {
    showToast('Video "' + title.substring(0,30) + '…" removed', 'success');
  }
}
</script>`

  return adminShell({ title: 'Video Library', activePage: 'videos', body })
}
