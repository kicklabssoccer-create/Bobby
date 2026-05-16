import { adminShell } from '../layout'
import { DRILLS, DRILL_CATEGORIES, DRILL_LEVELS } from '../../data/drills'

export function adminDrillsPage() {
  return adminShell({
    title: 'Drills Management',
    activePage: 'drills',
    body: `
<!-- Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <p class="text-slate-400 text-sm">${DRILLS.length} drills in library</p>
  <div class="flex items-center gap-3">
    <div class="relative">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
      <input type="text" placeholder="Search drills..." oninput="searchDrills(this.value)"
        class="bg-[#1e293b] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-slate-600 w-52">
    </div>
    <button onclick="openAddDrillModal()" class="bg-accent-600 hover:bg-accent-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-2">
      <i class="fas fa-plus text-xs"></i> Add Drill
    </button>
  </div>
</div>

<!-- Filters -->
<div class="flex flex-wrap gap-2 mb-5">
  <select id="drill-level-filter" onchange="applyDrillFilters()" class="bg-[#1e293b] border border-white/10 rounded-xl px-3 py-2 text-slate-400 text-sm">
    <option value="">All Levels</option>
    ${DRILL_LEVELS.filter(l => l !== 'All').map(l => `<option value="${l}">${l}</option>`).join('')}
  </select>
  <select id="drill-cat-filter" onchange="applyDrillFilters()" class="bg-[#1e293b] border border-white/10 rounded-xl px-3 py-2 text-slate-400 text-sm">
    <option value="">All Categories</option>
    ${DRILL_CATEGORIES.filter(c => c !== 'All').map(c => `<option value="${c}">${c}</option>`).join('')}
  </select>
  <select id="drill-plan-filter" onchange="applyDrillFilters()" class="bg-[#1e293b] border border-white/10 rounded-xl px-3 py-2 text-slate-400 text-sm">
    <option value="">All Plans</option>
    <option value="free">Free</option>
    <option value="starter">Starter</option>
    <option value="pro">Pro</option>
    <option value="elite">Elite</option>
  </select>
  <span id="drill-count-badge" class="bg-[#1e293b] border border-white/10 rounded-xl px-3 py-2 text-slate-400 text-sm">${DRILLS.length} drills</span>
</div>

<!-- Table -->
<div class="bg-[#1e293b] border border-white/6 rounded-2xl overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full min-w-[750px]">
      <thead>
        <tr class="bg-[#0f172a]/60 border-b border-white/5">
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Drill</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Category</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Level</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Plan</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Duration</th>
          <th class="text-left px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Players</th>
          <th class="text-center px-5 py-3.5 text-slate-500 text-xs font-semibold uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody id="drills-tbody" class="divide-y divide-white/4">
        ${DRILLS.map(d => `
          <tr class="table-row drill-row"
              data-level="${d.level.toLowerCase()}"
              data-cat="${d.category.toLowerCase()}"
              data-plan="${d.plan}"
              data-title="${d.title.toLowerCase()}">
            <td class="px-5 py-3.5">
              <div>
                <p class="text-white text-sm font-medium">${d.title}</p>
                <p class="text-slate-600 text-xs mt-0.5 truncate max-w-[240px]">${d.description}</p>
              </div>
            </td>
            <td class="px-5 py-3.5 text-slate-400 text-sm">${d.category}</td>
            <td class="px-5 py-3.5">
              <span class="badge-${d.level.toLowerCase()} text-xs font-semibold px-2 py-0.5 rounded-full">${d.level}</span>
            </td>
            <td class="px-5 py-3.5">
              <span class="badge-${d.plan} text-xs font-semibold px-2 py-0.5 rounded-full border">
                ${d.plan.charAt(0).toUpperCase() + d.plan.slice(1)}
              </span>
            </td>
            <td class="px-5 py-3.5 text-slate-400 text-sm">${d.duration}</td>
            <td class="px-5 py-3.5 text-slate-400 text-sm">${d.players}</td>
            <td class="px-5 py-3.5">
              <div class="flex items-center justify-center gap-2">
                <button onclick="viewDrill(${JSON.stringify(d).replace(/"/g,'&quot;')})"
                  class="text-slate-400 hover:text-white hover:bg-white/5 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="View">
                  <i class="fas fa-eye text-xs"></i>
                </button>
                <button onclick="editDrill(${JSON.stringify(d).replace(/"/g,'&quot;')})"
                  class="text-accent-400 hover:text-accent-300 hover:bg-accent-600/10 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="Edit">
                  <i class="fas fa-edit text-xs"></i>
                </button>
                <button onclick="deleteDrill('${d.id}','${d.title}')"
                  class="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-7 h-7 rounded-lg flex items-center justify-center transition-all" title="Delete">
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</div>

<!-- Add/Edit Drill Modal -->
<div id="drill-modal" class="fixed inset-0 z-[100] modal-bg items-center justify-center hidden" onclick="if(event.target===this)closeModal('drill-modal')">
  <div class="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-2xl mx-4 overflow-y-auto" style="max-height:90vh">
    <div class="flex items-center justify-between p-5 border-b border-white/8">
      <h3 id="drill-modal-title" class="text-white font-bold">Add New Drill</h3>
      <button onclick="closeModal('drill-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5 space-y-4">
      <input type="hidden" id="drill-edit-id">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Drill Title *</label>
          <input type="text" id="drill-title" placeholder="e.g. Cone Weave Dribbling" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category *</label>
          <select id="drill-category" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            ${DRILL_CATEGORIES.filter(c => c !== 'All').map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Level *</label>
          <select id="drill-level" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Access *</label>
          <select id="drill-plan" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option value="free">Free</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="elite">Elite</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Duration</label>
          <input type="text" id="drill-duration" placeholder="e.g. 20 min" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Players</label>
          <input type="text" id="drill-players" placeholder="e.g. 2-4" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Equipment</label>
          <input type="text" id="drill-equipment" placeholder="e.g. Ball, 8 Cones" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600">
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
          <textarea id="drill-description" rows="3" placeholder="Brief description of the drill..." class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 resize-none"></textarea>
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Steps (one per line)</label>
          <textarea id="drill-steps" rows="4" placeholder="Step 1&#10;Step 2&#10;Step 3" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 resize-none"></textarea>
        </div>
        <div class="col-span-2">
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Coaching Tips (one per line)</label>
          <textarea id="drill-tips" rows="3" placeholder="Tip 1&#10;Tip 2&#10;Tip 3" class="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 resize-none"></textarea>
        </div>
      </div>
      <div class="pt-2 flex gap-3">
        <button onclick="closeModal('drill-modal')" class="flex-1 border border-white/10 text-slate-400 hover:text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Cancel</button>
        <button onclick="saveDrill()" id="drill-save-btn" class="flex-1 bg-accent-600 hover:bg-accent-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all">Save Drill</button>
      </div>
    </div>
  </div>
</div>

<!-- View Drill Modal -->
<div id="view-drill-modal" class="fixed inset-0 z-[100] modal-bg items-center justify-center hidden" onclick="if(event.target===this)closeModal('view-drill-modal')">
  <div class="bg-[#1e293b] border border-white/10 rounded-2xl w-full max-w-lg mx-4 overflow-y-auto" style="max-height:85vh">
    <div class="flex items-center justify-between p-5 border-b border-white/8">
      <div>
        <h3 id="view-drill-name" class="text-white font-bold"></h3>
        <p id="view-drill-meta" class="text-slate-500 text-xs mt-0.5"></p>
      </div>
      <button onclick="closeModal('view-drill-modal')" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
    </div>
    <div class="p-5 space-y-4">
      <p id="view-drill-desc" class="text-slate-300 text-sm leading-relaxed"></p>
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-[#0f172a] rounded-xl p-3 text-center"><div id="view-drill-dur" class="text-white font-bold text-sm"></div><div class="text-slate-600 text-xs">Duration</div></div>
        <div class="bg-[#0f172a] rounded-xl p-3 text-center"><div id="view-drill-play" class="text-white font-bold text-sm"></div><div class="text-slate-600 text-xs">Players</div></div>
        <div class="bg-[#0f172a] rounded-xl p-3 text-center"><div id="view-drill-equip" class="text-white font-bold text-xs leading-tight"></div><div class="text-slate-600 text-xs">Equipment</div></div>
      </div>
      <div>
        <h4 class="text-white font-semibold text-xs uppercase tracking-wider mb-2">Steps</h4>
        <ol id="view-drill-steps" class="space-y-1.5"></ol>
      </div>
      <div>
        <h4 class="text-white font-semibold text-xs uppercase tracking-wider mb-2">Tips</h4>
        <ul id="view-drill-tips" class="space-y-1.5"></ul>
      </div>
    </div>
  </div>
</div>

<script>
function searchDrills(q) {
  q = q.toLowerCase();
  let count = 0;
  document.querySelectorAll('.drill-row').forEach(row => {
    const match = row.dataset.title.includes(q);
    row.style.display = match ? '' : 'none';
    if (match) count++;
  });
  document.getElementById('drill-count-badge').textContent = count + ' drills';
}

function applyDrillFilters() {
  const level = document.getElementById('drill-level-filter').value.toLowerCase();
  const cat   = document.getElementById('drill-cat-filter').value.toLowerCase();
  const plan  = document.getElementById('drill-plan-filter').value.toLowerCase();
  let count = 0;
  document.querySelectorAll('.drill-row').forEach(row => {
    const ok = (!level || row.dataset.level === level)
            && (!cat   || row.dataset.cat   === cat)
            && (!plan  || row.dataset.plan  === plan);
    row.style.display = ok ? '' : 'none';
    if (ok) count++;
  });
  document.getElementById('drill-count-badge').textContent = count + ' drills';
}

function openAddDrillModal() {
  document.getElementById('drill-modal-title').textContent = 'Add New Drill';
  document.getElementById('drill-edit-id').value = '';
  ['title','description','steps','tips','duration','players','equipment'].forEach(f => {
    const el = document.getElementById('drill-' + f);
    if (el) el.value = '';
  });
  document.getElementById('drill-category').value = 'Dribbling';
  document.getElementById('drill-level').value = 'Beginner';
  document.getElementById('drill-plan').value = 'starter';
  openModal('drill-modal');
}

function editDrill(d) {
  document.getElementById('drill-modal-title').textContent = 'Edit Drill';
  document.getElementById('drill-edit-id').value = d.id;
  document.getElementById('drill-title').value = d.title;
  document.getElementById('drill-category').value = d.category;
  document.getElementById('drill-level').value = d.level;
  document.getElementById('drill-plan').value = d.plan;
  document.getElementById('drill-duration').value = d.duration;
  document.getElementById('drill-players').value = d.players;
  document.getElementById('drill-equipment').value = d.equipment;
  document.getElementById('drill-description').value = d.description;
  document.getElementById('drill-steps').value = (d.steps || []).join('\\n');
  document.getElementById('drill-tips').value = (d.tips || []).join('\\n');
  openModal('drill-modal');
}

function viewDrill(d) {
  document.getElementById('view-drill-name').textContent = d.title;
  document.getElementById('view-drill-meta').textContent = d.category + ' · ' + d.level + ' · ' + d.plan.charAt(0).toUpperCase() + d.plan.slice(1) + ' plan';
  document.getElementById('view-drill-desc').textContent = d.description;
  document.getElementById('view-drill-dur').textContent = d.duration;
  document.getElementById('view-drill-play').textContent = d.players;
  document.getElementById('view-drill-equip').textContent = d.equipment;
  const stepsList = document.getElementById('view-drill-steps');
  stepsList.innerHTML = (d.steps || []).map((s,i) => '<li class="flex gap-2 text-sm"><span class="text-accent-400 font-bold flex-shrink-0">' + (i+1) + '.</span><span class="text-slate-300">' + s + '</span></li>').join('');
  const tipsList = document.getElementById('view-drill-tips');
  tipsList.innerHTML = (d.tips || []).map(t => '<li class="flex gap-2 text-sm"><span class="text-yellow-400 flex-shrink-0">💡</span><span class="text-slate-300">' + t + '</span></li>').join('');
  openModal('view-drill-modal');
}

function saveDrill() {
  const title = document.getElementById('drill-title').value.trim();
  if (!title) { showToast('Drill title is required', 'error'); return; }
  const isEdit = !!document.getElementById('drill-edit-id').value;
  closeModal('drill-modal');
  showToast(isEdit ? 'Drill "' + title + '" updated' : 'Drill "' + title + '" created', 'success');
}

function deleteDrill(id, title) {
  if (confirm('Delete drill "' + title + '"? This cannot be undone.')) {
    showToast('Drill "' + title + '" deleted', 'warning');
  }
}
</script>
`
  })
}
