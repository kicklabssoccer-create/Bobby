import { adminShell } from '../layout';

export function adminContentPage() {
  return adminShell({
    title: 'Content Management',
    activePage: 'content',
    body: `
<!-- Tab bar -->
<div class="flex items-center gap-2 mb-6 flex-wrap">
  <button onclick="switchTab('announcements')" id="tab-announcements" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all tab-btn-active">
    <i class="fas fa-bullhorn text-xs"></i> Announcements
  </button>
  <button onclick="switchTab('products')" id="tab-products" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all tab-btn-inactive">
    <i class="fas fa-shopping-cart text-xs"></i> Products
  </button>
  <button onclick="switchTab('videos')" id="tab-videos" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all tab-btn-inactive">
    <i class="fas fa-play-circle text-xs"></i> Videos
  </button>
  <button onclick="switchTab('drills')" id="tab-drills" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all tab-btn-inactive">
    <i class="fas fa-dumbbell text-xs"></i> Drills
  </button>
</div>

<!-- ═══ ANNOUNCEMENTS TAB ═══════════════════════════════════════════ -->
<div id="tab-panel-announcements">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-white font-bold text-lg">Site Announcements</h2>
      <p class="text-slate-500 text-xs mt-0.5">Only one announcement can be active at a time. Active banners appear on every public page.</p>
    </div>
    <button onclick="openModal('ann-add-modal')" class="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
      <i class="fas fa-plus text-xs"></i> New Announcement
    </button>
  </div>
  <div id="ann-list" class="space-y-3">
    <div class="text-slate-500 text-sm p-8 text-center"><i class="fas fa-spinner fa-spin mr-2"></i>Loading…</div>
  </div>
</div>

<!-- ═══ PRODUCTS TAB ════════════════════════════════════════════════ -->
<div id="tab-panel-products" class="hidden">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-white font-bold text-lg">Shop Products</h2>
      <p class="text-slate-500 text-xs mt-0.5">CMS products appear at the top of the shop page, above the built-in catalog.</p>
    </div>
    <button onclick="openModal('prod-add-modal')" class="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
      <i class="fas fa-plus text-xs"></i> Add Product
    </button>
  </div>
  <div id="prod-list" class="space-y-3">
    <div class="text-slate-500 text-sm p-8 text-center"><i class="fas fa-spinner fa-spin mr-2"></i>Loading…</div>
  </div>
</div>

<!-- ═══ VIDEOS TAB ═══════════════════════════════════════════════════ -->
<div id="tab-panel-videos" class="hidden">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-white font-bold text-lg">Featured Videos</h2>
      <p class="text-slate-500 text-xs mt-0.5">CMS videos appear at the top of the Videos page as a featured section.</p>
    </div>
    <button onclick="openModal('vid-add-modal')" class="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
      <i class="fas fa-plus text-xs"></i> Add Video
    </button>
  </div>
  <div id="vid-list" class="space-y-3">
    <div class="text-slate-500 text-sm p-8 text-center"><i class="fas fa-spinner fa-spin mr-2"></i>Loading…</div>
  </div>
</div>

<!-- ═══ DRILLS TAB ════════════════════════════════════════════════════ -->
<div id="tab-panel-drills" class="hidden">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h2 class="text-white font-bold text-lg">Drills Library</h2>
      <p class="text-slate-500 text-xs mt-0.5">CMS drills appear at the top of the Drills page as featured cards.</p>
    </div>
    <button onclick="openModal('drill-add-modal')" class="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
      <i class="fas fa-plus text-xs"></i> Add Drill
    </button>
  </div>
  <div id="drill-list" class="space-y-3">
    <div class="text-slate-500 text-sm p-8 text-center"><i class="fas fa-spinner fa-spin mr-2"></i>Loading…</div>
  </div>
</div>


<!-- ════════════════════════════════════════════════════════════════
     MODALS — Announcements
════════════════════════════════════════════════════════════════ -->

<!-- Add Announcement -->
<div id="ann-add-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
    <div class="p-6 border-b border-white/5 flex items-center justify-between">
      <h3 class="text-white font-bold text-lg">New Announcement</h3>
      <button onclick="closeModal('ann-add-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Title</label>
        <input id="ann-add-title" type="text" placeholder="e.g. New Drill Pack Available!" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Message</label>
        <textarea id="ann-add-message" rows="3" placeholder="Announcement body text…" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Type</label>
          <select id="ann-add-type" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="info">ℹ️ Info (blue)</option>
            <option value="success">✅ Success (green)</option>
            <option value="warning">⚠️ Warning (yellow)</option>
          </select>
        </div>
        <div class="flex items-end pb-1">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" id="ann-add-active" class="w-4 h-4 accent-blue-500">
            <span class="text-sm text-white font-medium">Make Active Now</span>
          </label>
        </div>
      </div>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end">
      <button onclick="closeModal('ann-add-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="addAnnouncement()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Publish</button>
    </div>
  </div>
</div>

<!-- Edit Announcement -->
<div id="ann-edit-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
    <div class="p-6 border-b border-white/5 flex items-center justify-between">
      <h3 class="text-white font-bold text-lg">Edit Announcement</h3>
      <button onclick="closeModal('ann-edit-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <input type="hidden" id="ann-edit-id">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Title</label>
        <input id="ann-edit-title" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Message</label>
        <textarea id="ann-edit-message" rows="3" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Type</label>
          <select id="ann-edit-type" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="info">ℹ️ Info (blue)</option>
            <option value="success">✅ Success (green)</option>
            <option value="warning">⚠️ Warning (yellow)</option>
          </select>
        </div>
        <div class="flex items-end pb-1">
          <label class="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" id="ann-edit-active" class="w-4 h-4 accent-blue-500">
            <span class="text-sm text-white font-medium">Active</span>
          </label>
        </div>
      </div>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end">
      <button onclick="closeModal('ann-edit-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="saveAnnouncement()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Save Changes</button>
    </div>
  </div>
</div>


<!-- ════════════════════════════════════════════════════════════════
     MODALS — Products
════════════════════════════════════════════════════════════════ -->

<!-- Add Product -->
<div id="prod-add-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
    <div class="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
      <h3 class="text-white font-bold text-lg">Add Product</h3>
      <button onclick="closeModal('prod-add-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Product Name *</label>
          <input id="prod-add-name" type="text" placeholder="e.g. Nike Academy Soccer Ball" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Price *</label>
          <input id="prod-add-price" type="text" placeholder="$29.99" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Emoji Icon</label>
          <input id="prod-add-emoji" type="text" placeholder="⚽" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category</label>
          <select id="prod-add-category" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Balls</option><option>Cones</option><option>Agility</option>
            <option>Goals</option><option>GK</option><option>Conditioning</option><option>Other</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Tier</label>
          <select id="prod-add-tier" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>All</option><option>Starter</option><option>Pro</option><option>Elite</option>
          </select>
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Amazon URL *</label>
          <input id="prod-add-url" type="url" placeholder="https://amazon.com/dp/…" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
          <textarea id="prod-add-desc" rows="3" placeholder="Short product description…" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
        </div>
        <div class="col-span-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="prod-add-featured" class="w-4 h-4 accent-blue-500">
            <span class="text-sm text-white">Mark as featured</span>
          </label>
        </div>
      </div>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end sticky bottom-0 bg-slate-900">
      <button onclick="closeModal('prod-add-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="addProduct()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Add Product</button>
    </div>
  </div>
</div>

<!-- Edit Product -->
<div id="prod-edit-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
    <div class="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
      <h3 class="text-white font-bold text-lg">Edit Product</h3>
      <button onclick="closeModal('prod-edit-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <input type="hidden" id="prod-edit-id">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Product Name *</label>
          <input id="prod-edit-name" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Price *</label>
          <input id="prod-edit-price" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Emoji Icon</label>
          <input id="prod-edit-emoji" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category</label>
          <select id="prod-edit-category" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Balls</option><option>Cones</option><option>Agility</option>
            <option>Goals</option><option>GK</option><option>Conditioning</option><option>Other</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Tier</label>
          <select id="prod-edit-tier" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>All</option><option>Starter</option><option>Pro</option><option>Elite</option>
          </select>
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Amazon URL *</label>
          <input id="prod-edit-url" type="url" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
          <textarea id="prod-edit-desc" rows="3" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
        </div>
        <div class="col-span-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="prod-edit-featured" class="w-4 h-4 accent-blue-500">
            <span class="text-sm text-white">Mark as featured</span>
          </label>
        </div>
      </div>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end sticky bottom-0 bg-slate-900">
      <button onclick="closeModal('prod-edit-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="saveProduct()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Save Changes</button>
    </div>
  </div>
</div>


<!-- ════════════════════════════════════════════════════════════════
     MODALS — Videos
════════════════════════════════════════════════════════════════ -->

<!-- Add Video -->
<div id="vid-add-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
    <div class="p-6 border-b border-white/5 flex items-center justify-between">
      <h3 class="text-white font-bold text-lg">Add Featured Video</h3>
      <button onclick="closeModal('vid-add-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Video Title *</label>
        <input id="vid-add-title" type="text" placeholder="e.g. 10 Dribbling Moves to Beat Defenders" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">YouTube Video ID *</label>
        <input id="vid-add-ytid" type="text" placeholder="e.g. dQw4w9WgXcQ (from youtube.com/watch?v=...)" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        <p class="text-slate-600 text-xs mt-1">Paste the full YouTube URL — the ID will be extracted automatically.</p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Topic / Category</label>
          <input id="vid-add-topic" type="text" placeholder="e.g. Dribbling" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Level</label>
          <select id="vid-add-level" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All Levels</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
        <textarea id="vid-add-desc" rows="2" placeholder="Brief description…" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" id="vid-add-featured" checked class="w-4 h-4 accent-blue-500">
        <span class="text-sm text-white">Mark as featured (shows in featured section)</span>
      </label>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end">
      <button onclick="closeModal('vid-add-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="addVideo()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Add Video</button>
    </div>
  </div>
</div>

<!-- Edit Video -->
<div id="vid-edit-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
    <div class="p-6 border-b border-white/5 flex items-center justify-between">
      <h3 class="text-white font-bold text-lg">Edit Video</h3>
      <button onclick="closeModal('vid-edit-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <input type="hidden" id="vid-edit-id">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Video Title *</label>
        <input id="vid-edit-title" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">YouTube Video ID *</label>
        <input id="vid-edit-ytid" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Topic / Category</label>
          <input id="vid-edit-topic" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Level</label>
          <select id="vid-edit-level" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All Levels</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
        <textarea id="vid-edit-desc" rows="2" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" id="vid-edit-featured" class="w-4 h-4 accent-blue-500">
        <span class="text-sm text-white">Featured</span>
      </label>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end">
      <button onclick="closeModal('vid-edit-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="saveVideo()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Save Changes</button>
    </div>
  </div>
</div>


<!-- ════════════════════════════════════════════════════════════════
     MODALS — Drills
════════════════════════════════════════════════════════════════ -->

<!-- Add Drill -->
<div id="drill-add-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
    <div class="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
      <h3 class="text-white font-bold text-lg">Add Drill</h3>
      <button onclick="closeModal('drill-add-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Drill Title *</label>
        <input id="drill-add-title" type="text" placeholder="e.g. Cone Weave Dribbling Circuit" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category</label>
          <select id="drill-add-category" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Dribbling</option><option>Passing</option><option>Shooting</option>
            <option>Defending</option><option>Fitness</option><option>Ball Control</option><option>GK</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Level</label>
          <select id="drill-add-level" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Duration</label>
          <input id="drill-add-duration" type="text" placeholder="e.g. 15 min" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Required</label>
          <select id="drill-add-plan" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="free">Free</option><option value="starter">Starter</option>
            <option value="pro">Pro</option><option value="elite">Elite</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
        <textarea id="drill-add-desc" rows="2" placeholder="Brief summary of this drill…" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Instructions (step by step)</label>
        <textarea id="drill-add-instructions" rows="4" placeholder="1. Set up 5 cones in a line…&#10;2. Dribble through using left foot only…&#10;3. Return and repeat right foot…" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" id="drill-add-featured" class="w-4 h-4 accent-blue-500">
        <span class="text-sm text-white">Featured drill</span>
      </label>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end sticky bottom-0 bg-slate-900">
      <button onclick="closeModal('drill-add-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="addDrill()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Add Drill</button>
    </div>
  </div>
</div>

<!-- Edit Drill -->
<div id="drill-edit-modal" class="hidden fixed inset-0 z-50 modal-bg items-center justify-center p-4">
  <div class="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
    <div class="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
      <h3 class="text-white font-bold text-lg">Edit Drill</h3>
      <button onclick="closeModal('drill-edit-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-6 space-y-4">
      <input type="hidden" id="drill-edit-id">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Drill Title *</label>
        <input id="drill-edit-title" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category</label>
          <select id="drill-edit-category" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Dribbling</option><option>Passing</option><option>Shooting</option>
            <option>Defending</option><option>Fitness</option><option>Ball Control</option><option>GK</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Level</label>
          <select id="drill-edit-level" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Duration</label>
          <input id="drill-edit-duration" type="text" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Required</label>
          <select id="drill-edit-plan" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="free">Free</option><option value="starter">Starter</option>
            <option value="pro">Pro</option><option value="elite">Elite</option>
          </select>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
        <textarea id="drill-edit-desc" rows="2" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Instructions</label>
        <textarea id="drill-edit-instructions" rows="4" class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" id="drill-edit-featured" class="w-4 h-4 accent-blue-500">
        <span class="text-sm text-white">Featured</span>
      </label>
    </div>
    <div class="p-6 border-t border-white/5 flex gap-3 justify-end sticky bottom-0 bg-slate-900">
      <button onclick="closeModal('drill-edit-modal')" class="px-5 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 transition-all">Cancel</button>
      <button onclick="saveDrill()" class="px-5 py-2 rounded-xl text-sm bg-accent-600 hover:bg-accent-500 text-white font-semibold transition-all">Save Changes</button>
    </div>
  </div>
</div>


<!-- ════════════════════════════════════════════════════════════════
     JAVASCRIPT
════════════════════════════════════════════════════════════════ -->
<style>
  .tab-btn-active  { background: #2563eb; color: #fff; }
  .tab-btn-inactive { background: rgba(255,255,255,0.05); color: #94a3b8; }
  .tab-btn-inactive:hover { background: rgba(37,99,235,0.15); color: #60a5fa; }
  .modal-bg { background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); }
  .item-row { background: #1e293b; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; }
  .item-row .badge { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 100px; }
  .badge-info    { background: rgba(37,99,235,0.2); color: #60a5fa; }
  .badge-success { background: rgba(34,197,94,0.2); color: #4ade80; }
  .badge-warning { background: rgba(234,179,8,0.2); color: #fbbf24; }
  .badge-active  { background: rgba(34,197,94,0.2); color: #4ade80; }
  .badge-inactive { background: rgba(100,116,139,0.2); color: #94a3b8; }
  .empty-state   { text-align: center; padding: 48px; color: #64748b; }
</style>

<script>
// ── Tab switching ──────────────────────────────────────────────────
const TABS = ['announcements', 'products', 'videos', 'drills'];
let loaded = {};

function switchTab(tab) {
  TABS.forEach(t => {
    document.getElementById('tab-panel-' + t).classList.toggle('hidden', t !== tab);
    document.getElementById('tab-' + t).className =
      'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ' +
      (t === tab ? 'tab-btn-active' : 'tab-btn-inactive');
  });
  if (!loaded[tab]) { loaded[tab] = true; loadTab(tab); }
}

function loadTab(tab) {
  if (tab === 'announcements') loadAnnouncements();
  else if (tab === 'products')  loadProducts();
  else if (tab === 'videos')    loadVideos();
  else if (tab === 'drills')    loadDrills();
}

// Load initial tab
window.addEventListener('DOMContentLoaded', () => {
  loaded['announcements'] = true;
  loadAnnouncements();
});

// ── Utilities ──────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function extractYtId(raw) {
  if (!raw) return '';
  const m = raw.match(/(?:v=|youtu\\.be\\/|embed\\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : raw.trim();
}
function setSelectVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  for (const opt of el.options) { opt.selected = opt.value === val || opt.text === val; }
}

async function apiCall(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Request failed'); }
  return res.json();
}

// ══════════════════════════════════════════════════════════════════
// ANNOUNCEMENTS
// ══════════════════════════════════════════════════════════════════
let anns = [];

async function loadAnnouncements() {
  try {
    const data = await apiCall('GET', '/api/admin/cms/announcements');
    anns = data.announcements || [];
    renderAnnouncements();
  } catch(e) {
    document.getElementById('ann-list').innerHTML = '<div class="empty-state text-red-400"><i class="fas fa-exclamation-circle mr-2"></i>' + e.message + '</div>';
  }
}

function renderAnnouncements() {
  const el = document.getElementById('ann-list');
  if (!anns.length) { el.innerHTML = '<div class="empty-state"><i class="fas fa-bullhorn text-3xl mb-3 block opacity-30"></i>No announcements yet. Create one to display a banner on the site.</div>'; return; }
  el.innerHTML = anns.map(a => {
    const typeCls = { info: 'badge-info', success: 'badge-success', warning: 'badge-warning' }[a.type] || 'badge-info';
    const typeLabel = { info: 'ℹ️ Info', success: '✅ Success', warning: '⚠️ Warning' }[a.type] || a.type;
    return \`<div class="item-row">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="text-white font-semibold text-sm">\${a.title || '(No title)'}</span>
          <span class="badge \${typeCls}">\${typeLabel}</span>
          <span class="badge \${a.active ? 'badge-active' : 'badge-inactive'}">\${a.active ? '● Live' : '○ Off'}</span>
        </div>
        <p class="text-slate-400 text-xs line-clamp-2">\${a.message || ''}</p>
        <p class="text-slate-600 text-[10px] mt-1">\${fmtDate(a.createdAt)}</p>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <button onclick="editAnnouncement('\${a.id}')" class="text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-pen mr-1"></i>Edit</button>
        <button onclick="deleteAnnouncement('\${a.id}')" class="text-xs text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-trash"></i></button>
      </div>
    </div>\`;
  }).join('');
}

async function addAnnouncement() {
  try {
    await apiCall('POST', '/api/admin/cms/announcements', {
      title: document.getElementById('ann-add-title').value.trim(),
      message: document.getElementById('ann-add-message').value.trim(),
      type: document.getElementById('ann-add-type').value,
      active: document.getElementById('ann-add-active').checked,
    });
    closeModal('ann-add-modal');
    document.getElementById('ann-add-title').value = '';
    document.getElementById('ann-add-message').value = '';
    document.getElementById('ann-add-active').checked = false;
    showToast('Announcement published!', 'success');
    await loadAnnouncements();
  } catch(e) { showToast(e.message, 'error'); }
}

function editAnnouncement(id) {
  const a = anns.find(x => x.id === id); if (!a) return;
  document.getElementById('ann-edit-id').value = a.id;
  document.getElementById('ann-edit-title').value = a.title || '';
  document.getElementById('ann-edit-message').value = a.message || '';
  document.getElementById('ann-edit-active').checked = !!a.active;
  setSelectVal('ann-edit-type', a.type);
  openModal('ann-edit-modal');
}

async function saveAnnouncement() {
  const id = document.getElementById('ann-edit-id').value;
  try {
    await apiCall('PUT', '/api/admin/cms/announcements/' + id, {
      title: document.getElementById('ann-edit-title').value.trim(),
      message: document.getElementById('ann-edit-message').value.trim(),
      type: document.getElementById('ann-edit-type').value,
      active: document.getElementById('ann-edit-active').checked,
    });
    closeModal('ann-edit-modal');
    showToast('Announcement updated!', 'success');
    await loadAnnouncements();
  } catch(e) { showToast(e.message, 'error'); }
}

async function deleteAnnouncement(id) {
  if (!confirm('Delete this announcement?')) return;
  try {
    await apiCall('DELETE', '/api/admin/cms/announcements/' + id);
    showToast('Announcement deleted', 'info');
    await loadAnnouncements();
  } catch(e) { showToast(e.message, 'error'); }
}


// ══════════════════════════════════════════════════════════════════
// PRODUCTS
// ══════════════════════════════════════════════════════════════════
let products = [];

async function loadProducts() {
  try {
    const data = await apiCall('GET', '/api/admin/cms/products');
    products = data.products || [];
    renderProducts();
  } catch(e) {
    document.getElementById('prod-list').innerHTML = '<div class="empty-state text-red-400"><i class="fas fa-exclamation-circle mr-2"></i>' + e.message + '</div>';
  }
}

function renderProducts() {
  const el = document.getElementById('prod-list');
  if (!products.length) { el.innerHTML = '<div class="empty-state"><i class="fas fa-shopping-cart text-3xl mb-3 block opacity-30"></i>No CMS products yet. Add a product to feature it at the top of the shop.</div>'; return; }
  el.innerHTML = products.map(p => \`<div class="item-row">
    <div class="text-2xl w-10 text-center flex-shrink-0">\${p.emoji || '📦'}</div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-0.5 flex-wrap">
        <span class="text-white font-semibold text-sm">\${p.name}</span>
        <span class="badge badge-info">\${p.category}</span>
        <span class="badge badge-warning">\${p.tier}</span>
        \${p.featured ? '<span class="badge badge-success">★ Featured</span>' : ''}
      </div>
      <p class="text-slate-400 text-xs line-clamp-1">\${p.description || ''}</p>
      <div class="flex items-center gap-3 mt-1">
        <span class="text-green-400 text-xs font-bold">\${p.price}</span>
        <a href="\${p.amazonUrl}" target="_blank" class="text-[10px] text-slate-500 hover:text-amber-400"><i class="fas fa-external-link-alt mr-0.5"></i>Amazon</a>
        <span class="text-slate-700 text-[10px]">\${fmtDate(p.createdAt)}</span>
      </div>
    </div>
    <div class="flex gap-2 flex-shrink-0">
      <button onclick="editProduct('\${p.id}')" class="text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-pen mr-1"></i>Edit</button>
      <button onclick="deleteProduct('\${p.id}')" class="text-xs text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-trash"></i></button>
    </div>
  </div>\`).join('');
}

async function addProduct() {
  const name = document.getElementById('prod-add-name').value.trim();
  const url  = document.getElementById('prod-add-url').value.trim();
  if (!name || !url) { showToast('Name and Amazon URL are required', 'error'); return; }
  try {
    await apiCall('POST', '/api/admin/cms/products', {
      name, price: document.getElementById('prod-add-price').value.trim(),
      emoji: document.getElementById('prod-add-emoji').value.trim() || '📦',
      category: document.getElementById('prod-add-category').value,
      tier: document.getElementById('prod-add-tier').value,
      amazonUrl: url,
      description: document.getElementById('prod-add-desc').value.trim(),
      featured: document.getElementById('prod-add-featured').checked,
    });
    closeModal('prod-add-modal');
    ['prod-add-name','prod-add-price','prod-add-emoji','prod-add-url','prod-add-desc'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('prod-add-featured').checked = false;
    showToast('Product added!', 'success');
    await loadProducts();
  } catch(e) { showToast(e.message, 'error'); }
}

function editProduct(id) {
  const p = products.find(x => x.id === id); if (!p) return;
  document.getElementById('prod-edit-id').value = p.id;
  document.getElementById('prod-edit-name').value = p.name || '';
  document.getElementById('prod-edit-price').value = p.price || '';
  document.getElementById('prod-edit-emoji').value = p.emoji || '';
  document.getElementById('prod-edit-url').value = p.amazonUrl || '';
  document.getElementById('prod-edit-desc').value = p.description || '';
  document.getElementById('prod-edit-featured').checked = !!p.featured;
  setSelectVal('prod-edit-category', p.category);
  setSelectVal('prod-edit-tier', p.tier);
  openModal('prod-edit-modal');
}

async function saveProduct() {
  const id = document.getElementById('prod-edit-id').value;
  try {
    await apiCall('PUT', '/api/admin/cms/products/' + id, {
      name: document.getElementById('prod-edit-name').value.trim(),
      price: document.getElementById('prod-edit-price').value.trim(),
      emoji: document.getElementById('prod-edit-emoji').value.trim(),
      amazonUrl: document.getElementById('prod-edit-url').value.trim(),
      description: document.getElementById('prod-edit-desc').value.trim(),
      category: document.getElementById('prod-edit-category').value,
      tier: document.getElementById('prod-edit-tier').value,
      featured: document.getElementById('prod-edit-featured').checked,
    });
    closeModal('prod-edit-modal');
    showToast('Product saved!', 'success');
    await loadProducts();
  } catch(e) { showToast(e.message, 'error'); }
}

async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  try {
    await apiCall('DELETE', '/api/admin/cms/products/' + id);
    showToast('Product deleted', 'info');
    await loadProducts();
  } catch(e) { showToast(e.message, 'error'); }
}


// ══════════════════════════════════════════════════════════════════
// VIDEOS
// ══════════════════════════════════════════════════════════════════
let videos = [];

async function loadVideos() {
  try {
    const data = await apiCall('GET', '/api/admin/cms/videos');
    videos = data.videos || [];
    renderVideos();
  } catch(e) {
    document.getElementById('vid-list').innerHTML = '<div class="empty-state text-red-400"><i class="fas fa-exclamation-circle mr-2"></i>' + e.message + '</div>';
  }
}

function renderVideos() {
  const el = document.getElementById('vid-list');
  if (!videos.length) { el.innerHTML = '<div class="empty-state"><i class="fas fa-play-circle text-3xl mb-3 block opacity-30"></i>No featured videos yet. Add a YouTube video to feature it on the Videos page.</div>'; return; }
  el.innerHTML = videos.map(v => {
    const thumb = 'https://img.youtube.com/vi/' + v.youtubeId + '/mqdefault.jpg';
    const levelCls = { Beginner: 'badge-info', Intermediate: 'badge-warning', Advanced: 'badge-success' }[v.level] || 'badge-info';
    return \`<div class="item-row">
      <img src="\${thumb}" onerror="this.src=''" class="w-20 h-14 object-cover rounded-lg flex-shrink-0 bg-slate-800">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-0.5 flex-wrap">
          <span class="text-white font-semibold text-sm">\${v.title}</span>
          <span class="badge \${levelCls}">\${v.level}</span>
          <span class="badge badge-info">\${v.topic}</span>
          \${v.featured ? '<span class="badge badge-success">★ Featured</span>' : ''}
        </div>
        <p class="text-slate-400 text-xs line-clamp-1">\${v.description || ''}</p>
        <div class="flex items-center gap-3 mt-1">
          <span class="text-slate-600 text-[10px] font-mono">ID: \${v.youtubeId}</span>
          <a href="https://youtube.com/watch?v=\${v.youtubeId}" target="_blank" class="text-[10px] text-red-400 hover:text-red-300"><i class="fab fa-youtube mr-0.5"></i>Watch</a>
          <span class="text-slate-700 text-[10px]">\${fmtDate(v.createdAt)}</span>
        </div>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <button onclick="editVideo('\${v.id}')" class="text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-pen mr-1"></i>Edit</button>
        <button onclick="deleteVideo('\${v.id}')" class="text-xs text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-trash"></i></button>
      </div>
    </div>\`;
  }).join('');
}

async function addVideo() {
  const title = document.getElementById('vid-add-title').value.trim();
  const rawYt  = document.getElementById('vid-add-ytid').value.trim();
  const youtubeId = extractYtId(rawYt);
  if (!title || !youtubeId) { showToast('Title and YouTube ID/URL are required', 'error'); return; }
  try {
    await apiCall('POST', '/api/admin/cms/videos', {
      title, youtubeId,
      topic: document.getElementById('vid-add-topic').value.trim() || 'General',
      level: document.getElementById('vid-add-level').value,
      description: document.getElementById('vid-add-desc').value.trim(),
      featured: document.getElementById('vid-add-featured').checked,
    });
    closeModal('vid-add-modal');
    ['vid-add-title','vid-add-ytid','vid-add-topic','vid-add-desc'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('vid-add-featured').checked = true;
    showToast('Video added!', 'success');
    await loadVideos();
  } catch(e) { showToast(e.message, 'error'); }
}

function editVideo(id) {
  const v = videos.find(x => x.id === id); if (!v) return;
  document.getElementById('vid-edit-id').value = v.id;
  document.getElementById('vid-edit-title').value = v.title || '';
  document.getElementById('vid-edit-ytid').value = v.youtubeId || '';
  document.getElementById('vid-edit-topic').value = v.topic || '';
  document.getElementById('vid-edit-desc').value = v.description || '';
  document.getElementById('vid-edit-featured').checked = !!v.featured;
  setSelectVal('vid-edit-level', v.level);
  openModal('vid-edit-modal');
}

async function saveVideo() {
  const id = document.getElementById('vid-edit-id').value;
  const rawYt = document.getElementById('vid-edit-ytid').value.trim();
  try {
    await apiCall('PUT', '/api/admin/cms/videos/' + id, {
      title: document.getElementById('vid-edit-title').value.trim(),
      youtubeId: extractYtId(rawYt),
      topic: document.getElementById('vid-edit-topic').value.trim(),
      level: document.getElementById('vid-edit-level').value,
      description: document.getElementById('vid-edit-desc').value.trim(),
      featured: document.getElementById('vid-edit-featured').checked,
    });
    closeModal('vid-edit-modal');
    showToast('Video saved!', 'success');
    await loadVideos();
  } catch(e) { showToast(e.message, 'error'); }
}

async function deleteVideo(id) {
  if (!confirm('Delete this video?')) return;
  try {
    await apiCall('DELETE', '/api/admin/cms/videos/' + id);
    showToast('Video deleted', 'info');
    await loadVideos();
  } catch(e) { showToast(e.message, 'error'); }
}


// ══════════════════════════════════════════════════════════════════
// DRILLS
// ══════════════════════════════════════════════════════════════════
let drills = [];

async function loadDrills() {
  try {
    const data = await apiCall('GET', '/api/admin/cms/drills');
    drills = data.drills || [];
    renderDrills();
  } catch(e) {
    document.getElementById('drill-list').innerHTML = '<div class="empty-state text-red-400"><i class="fas fa-exclamation-circle mr-2"></i>' + e.message + '</div>';
  }
}

function renderDrills() {
  const el = document.getElementById('drill-list');
  if (!drills.length) { el.innerHTML = '<div class="empty-state"><i class="fas fa-dumbbell text-3xl mb-3 block opacity-30"></i>No CMS drills yet. Add a drill to feature it at the top of the Drills library.</div>'; return; }
  const planBadge = { free: 'badge-success', starter: 'badge-info', pro: 'badge-warning', elite: 'badge badge-inactive' };
  const levelCls  = { Beginner: 'badge-info', Intermediate: 'badge-warning', Advanced: 'badge-success' };
  el.innerHTML = drills.map(d => \`<div class="item-row">
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-0.5 flex-wrap">
        <span class="text-white font-semibold text-sm">\${d.title}</span>
        <span class="badge \${levelCls[d.level] || 'badge-info'}">\${d.level}</span>
        <span class="badge badge-info">\${d.category}</span>
        <span class="badge \${planBadge[d.planRequired] || 'badge-info'}">\${d.planRequired}</span>
        \${d.featured ? '<span class="badge badge-success">★ Featured</span>' : ''}
      </div>
      <p class="text-slate-400 text-xs line-clamp-1">\${d.description || ''}</p>
      <div class="flex items-center gap-3 mt-1">
        <span class="text-slate-500 text-xs"><i class="fas fa-clock text-[10px] mr-1"></i>\${d.duration}</span>
        <span class="text-slate-700 text-[10px]">\${fmtDate(d.createdAt)}</span>
      </div>
    </div>
    <div class="flex gap-2 flex-shrink-0">
      <button onclick="editDrill('\${d.id}')" class="text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-pen mr-1"></i>Edit</button>
      <button onclick="deleteDrill('\${d.id}')" class="text-xs text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all"><i class="fas fa-trash"></i></button>
    </div>
  </div>\`).join('');
}

async function addDrill() {
  const title = document.getElementById('drill-add-title').value.trim();
  if (!title) { showToast('Drill title is required', 'error'); return; }
  try {
    await apiCall('POST', '/api/admin/cms/drills', {
      title,
      category: document.getElementById('drill-add-category').value,
      level: document.getElementById('drill-add-level').value,
      duration: document.getElementById('drill-add-duration').value.trim() || '15 min',
      planRequired: document.getElementById('drill-add-plan').value,
      description: document.getElementById('drill-add-desc').value.trim(),
      instructions: document.getElementById('drill-add-instructions').value.trim(),
      featured: document.getElementById('drill-add-featured').checked,
    });
    closeModal('drill-add-modal');
    ['drill-add-title','drill-add-duration','drill-add-desc','drill-add-instructions'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('drill-add-featured').checked = false;
    showToast('Drill added!', 'success');
    await loadDrills();
  } catch(e) { showToast(e.message, 'error'); }
}

function editDrill(id) {
  const d = drills.find(x => x.id === id); if (!d) return;
  document.getElementById('drill-edit-id').value = d.id;
  document.getElementById('drill-edit-title').value = d.title || '';
  document.getElementById('drill-edit-duration').value = d.duration || '';
  document.getElementById('drill-edit-desc').value = d.description || '';
  document.getElementById('drill-edit-instructions').value = d.instructions || '';
  document.getElementById('drill-edit-featured').checked = !!d.featured;
  setSelectVal('drill-edit-category', d.category);
  setSelectVal('drill-edit-level', d.level);
  setSelectVal('drill-edit-plan', d.planRequired);
  openModal('drill-edit-modal');
}

async function saveDrill() {
  const id = document.getElementById('drill-edit-id').value;
  try {
    await apiCall('PUT', '/api/admin/cms/drills/' + id, {
      title: document.getElementById('drill-edit-title').value.trim(),
      category: document.getElementById('drill-edit-category').value,
      level: document.getElementById('drill-edit-level').value,
      duration: document.getElementById('drill-edit-duration').value.trim(),
      planRequired: document.getElementById('drill-edit-plan').value,
      description: document.getElementById('drill-edit-desc').value.trim(),
      instructions: document.getElementById('drill-edit-instructions').value.trim(),
      featured: document.getElementById('drill-edit-featured').checked,
    });
    closeModal('drill-edit-modal');
    showToast('Drill saved!', 'success');
    await loadDrills();
  } catch(e) { showToast(e.message, 'error'); }
}

async function deleteDrill(id) {
  if (!confirm('Delete this drill?')) return;
  try {
    await apiCall('DELETE', '/api/admin/cms/drills/' + id);
    showToast('Drill deleted', 'info');
    await loadDrills();
  } catch(e) { showToast(e.message, 'error'); }
}
</script>
`
  });
}
