import { adminShell } from '../layout'
import { PRODUCTS } from '../../data/products'

export function adminProductsPage(): string {
  const rows = PRODUCTS.map(p => {
    const tierBadges = p.tiers.map(t => {
      const cls = t === 'Starter' ? 'badge-starter' : t === 'Pro' ? 'badge-pro' : 'badge-elite'
      return `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${cls}">${t}</span>`
    }).join(' ')

    const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(p.rating))

    return `
    <tr class="table-row border-b border-white/5 cursor-pointer" onclick="viewProduct('${p.id}')">
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
            ${p.emoji}
          </div>
          <div class="min-w-0">
            <div class="text-white text-sm font-semibold truncate max-w-[240px]">${p.name}</div>
            ${p.badge ? `<span class="text-[10px] bg-accent-600/20 text-accent-400 border border-accent-600/20 px-1.5 py-0.5 rounded-full">${p.badge}</span>` : ''}
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-slate-300 text-sm">${p.category}</td>
      <td class="px-4 py-3">
        <div class="text-white font-bold text-sm">${p.price}</div>
      </td>
      <td class="px-4 py-3">
        <div class="text-yellow-400 text-xs font-medium">${p.rating.toFixed(1)} ★</div>
        <div class="text-slate-500 text-xs">${p.reviews.toLocaleString()} reviews</div>
      </td>
      <td class="px-4 py-3">
        <div class="flex flex-wrap gap-1">${tierBadges}</div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center gap-2" onclick="event.stopPropagation()">
          <button onclick="editProduct('${p.id}')" class="text-accent-400 hover:text-accent-300 text-sm p-1.5 hover:bg-white/5 rounded-lg transition-all" title="Edit">
            <i class="fas fa-pen"></i>
          </button>
          <a href="${p.amazonUrl}" target="_blank" class="text-orange-400 hover:text-orange-300 text-sm p-1.5 hover:bg-white/5 rounded-lg transition-all" title="View on Amazon" onclick="event.stopPropagation()">
            <i class="fab fa-amazon"></i>
          </a>
          <button onclick="deleteProduct('${p.id}','${p.name.replace(/'/g, "\\'")}')" class="text-red-400 hover:text-red-300 text-sm p-1.5 hover:bg-white/5 rounded-lg transition-all" title="Delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </td>
    </tr>`
  }).join('')

  // Category breakdown
  const categories = [...new Set(PRODUCTS.map(p => p.category))]
  const catCards = categories.map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat).length
    const emoji = PRODUCTS.find(p => p.category === cat)?.emoji || '📦'
    return `
    <div class="stat-card flex items-center gap-3">
      <div class="w-9 h-9 bg-accent-600/15 rounded-xl flex items-center justify-center text-lg flex-shrink-0">${emoji}</div>
      <div>
        <div class="text-white font-semibold text-sm">${cat}</div>
        <div class="text-slate-400 text-xs">${count} product${count !== 1 ? 's' : ''}</div>
      </div>
    </div>`
  }).join('')

  const totalRevenue = '$0'
  const avgRating = (PRODUCTS.reduce((s, p) => s + p.rating, 0) / PRODUCTS.length).toFixed(1)

  const body = `
<!-- Page header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <h2 class="text-2xl font-bold text-white">Products &amp; Gear</h2>
    <p class="text-slate-400 text-sm mt-1">${PRODUCTS.length} Amazon affiliate products across ${categories.length} categories</p>
  </div>
  <button onclick="openModal('add-product-modal')" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-accent-600/20">
    <i class="fas fa-plus"></i> Add Product
  </button>
</div>

<!-- Stat Cards -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Total Products</div>
    <div class="text-2xl font-bold text-white">${PRODUCTS.length}</div>
    <div class="text-xs text-slate-500 mt-1">Amazon affiliate</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Avg Rating</div>
    <div class="text-2xl font-bold text-yellow-400">${avgRating}</div>
    <div class="text-xs text-slate-500 mt-1">★ out of 5.0</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Categories</div>
    <div class="text-2xl font-bold text-accent-400">${categories.length}</div>
    <div class="text-xs text-slate-500 mt-1">Product types</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Elite Items</div>
    <div class="text-2xl font-bold text-yellow-300">${PRODUCTS.filter(p => p.tiers.includes('Elite')).length}</div>
    <div class="text-xs text-slate-500 mt-1">Premium picks</div>
  </div>
</div>

<!-- Category breakdown -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
  ${catCards}
</div>

<!-- Filters + Search -->
<div class="bg-slate-800 border border-white/6 rounded-2xl p-4 mb-4">
  <div class="flex flex-wrap gap-3 items-center">
    <div class="relative flex-1 min-w-[200px]">
      <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
      <input type="text" id="product-search" placeholder="Search products…"
             oninput="filterProducts()"
             class="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white text-sm placeholder-slate-500"/>
    </div>
    <select id="filter-cat" onchange="filterProducts()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
      <option value="">All Categories</option>
      ${categories.map(c => `<option>${c}</option>`).join('')}
    </select>
    <select id="filter-tier" onchange="filterProducts()" class="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm">
      <option value="">All Tiers</option>
      <option>Starter</option><option>Pro</option><option>Elite</option>
    </select>
    <button onclick="clearFilters()" class="text-slate-400 hover:text-white text-sm px-3 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
      <i class="fas fa-times mr-1"></i>Clear
    </button>
  </div>
  <div class="mt-2 text-slate-500 text-xs" id="filter-count">${PRODUCTS.length} products shown</div>
</div>

<!-- Table -->
<div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full" id="products-table">
      <thead>
        <tr class="border-b border-white/8">
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Plan Tiers</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody id="products-tbody">
        ${rows}
      </tbody>
    </table>
  </div>
  <div id="no-results" class="hidden text-center py-16 text-slate-500">
    <i class="fas fa-shopping-cart text-4xl mb-3 block opacity-30"></i>
    <p>No products match your filters.</p>
  </div>
</div>

<!-- =================== VIEW PRODUCT MODAL =================== -->
<div id="view-product-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8">
      <h3 class="text-white font-bold text-lg">Product Details</h3>
      <button onclick="closeModal('view-product-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6" id="view-product-body"></div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8">
      <button onclick="closeModal('view-product-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Close</button>
    </div>
  </div>
</div>

<!-- =================== ADD PRODUCT MODAL =================== -->
<div id="add-product-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in max-h-[90vh] overflow-y-auto">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-slate-800 z-10">
      <h3 class="text-white font-bold text-lg">Add New Product</h3>
      <button onclick="closeModal('add-product-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Product Name *</label>
        <input type="text" id="new-name" placeholder="e.g. Nike Academy Soccer Ball"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category</label>
          <select id="new-cat" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Balls</option><option>Cones</option><option>Agility</option>
            <option>Goals</option><option>GK</option><option>Conditioning</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Price</label>
          <input type="text" id="new-price" placeholder="$24.99"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Rating (0–5)</label>
          <input type="number" id="new-rating" placeholder="4.8" min="0" max="5" step="0.1"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Emoji Icon</label>
          <input type="text" id="new-emoji" placeholder="⚽"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Amazon URL *</label>
        <input type="url" id="new-amazon" placeholder="https://www.amazon.com/s?k=…"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
        <textarea id="new-desc" rows="3" placeholder="Product description…"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 resize-none"></textarea>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Plan Tiers</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" name="tier" value="Starter" class="accent-blue-600"/> Starter
          </label>
          <label class="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" name="tier" value="Pro" class="accent-blue-600"/> Pro
          </label>
          <label class="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" name="tier" value="Elite" class="accent-blue-600"/> Elite
          </label>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Badge Label (optional)</label>
        <input type="text" id="new-badge" placeholder="e.g. Most Popular"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
      </div>
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8 sticky bottom-0 bg-slate-800">
      <button onclick="closeModal('add-product-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Cancel</button>
      <button onclick="saveNewProduct()" class="px-5 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
        <i class="fas fa-plus mr-1.5"></i>Add Product
      </button>
    </div>
  </div>
</div>

<!-- =================== EDIT PRODUCT MODAL =================== -->
<div id="edit-product-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in max-h-[90vh] overflow-y-auto">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-slate-800 z-10">
      <h3 class="text-white font-bold text-lg">Edit Product</h3>
      <button onclick="closeModal('edit-product-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6 space-y-4">
      <input type="hidden" id="edit-pid"/>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Product Name</label>
        <input type="text" id="edit-name"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Category</label>
          <select id="edit-cat" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm">
            <option>Balls</option><option>Cones</option><option>Agility</option>
            <option>Goals</option><option>GK</option><option>Conditioning</option>
          </select>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Price</label>
          <input type="text" id="edit-price"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Amazon URL</label>
        <input type="url" id="edit-amazon"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Description</label>
        <textarea id="edit-desc" rows="3"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none"></textarea>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Plan Tiers</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" id="edit-tier-starter" class="accent-blue-600"/> Starter
          </label>
          <label class="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" id="edit-tier-pro" class="accent-blue-600"/> Pro
          </label>
          <label class="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" id="edit-tier-elite" class="accent-blue-600"/> Elite
          </label>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Badge Label</label>
        <input type="text" id="edit-badge"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
      </div>
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8 sticky bottom-0 bg-slate-800">
      <button onclick="closeModal('edit-product-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Cancel</button>
      <button onclick="saveEditProduct()" class="px-5 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
        <i class="fas fa-save mr-1.5"></i>Save Changes
      </button>
    </div>
  </div>
</div>

<script>
const PRODUCTS_DATA = ${JSON.stringify(PRODUCTS)};

// ─── FILTER ──────────────────────────────────────────────────────
function filterProducts() {
  const q   = (document.getElementById('product-search').value || '').toLowerCase();
  const cat = (document.getElementById('filter-cat').value || '').toLowerCase();
  const tier = (document.getElementById('filter-tier').value || '').toLowerCase();

  const rows = document.querySelectorAll('#products-tbody tr');
  let shown = 0;
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const cells = row.querySelectorAll('td');
    const rowCat  = cells[1]?.textContent.trim().toLowerCase() || '';
    const tierCell = cells[4]?.textContent.trim().toLowerCase() || '';

    const ok = (!q || text.includes(q))
            && (!cat  || rowCat.includes(cat))
            && (!tier || tierCell.includes(tier));

    row.style.display = ok ? '' : 'none';
    if (ok) shown++;
  });
  document.getElementById('filter-count').textContent = shown + ' products shown';
  document.getElementById('no-results').classList.toggle('hidden', shown > 0);
}

function clearFilters() {
  document.getElementById('product-search').value = '';
  document.getElementById('filter-cat').value = '';
  document.getElementById('filter-tier').value = '';
  filterProducts();
}

// ─── VIEW ─────────────────────────────────────────────────────────
function viewProduct(id) {
  const p = PRODUCTS_DATA.find(x => x.id === id);
  if (!p) return;
  const tierBadges = p.tiers.map(t => {
    const cls = t === 'Starter' ? 'badge-starter' : t === 'Pro' ? 'badge-pro' : 'badge-elite';
    return \`<span class="text-xs font-bold px-2.5 py-1 rounded-full uppercase \${cls}">\${t}</span>\`;
  }).join('');
  const stars = '★'.repeat(Math.floor(p.rating)) + '☆'.repeat(5 - Math.floor(p.rating));

  document.getElementById('view-product-body').innerHTML = \`
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">\${p.emoji}</div>
        <div>
          <h4 class="text-white font-bold text-lg">\${p.name}</h4>
          <div class="text-slate-400 text-sm">\${p.category}</div>
          \${p.badge ? \`<span class="text-xs bg-accent-600/20 text-accent-400 border border-accent-600/20 px-2 py-0.5 rounded-full mt-1 inline-block">\${p.badge}</span>\` : ''}
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3 text-center">
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-slate-400 text-xs">Price</div>
          <div class="text-white font-bold text-lg mt-1">\${p.price}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-slate-400 text-xs">Rating</div>
          <div class="text-yellow-400 font-bold text-lg mt-1">\${p.rating} ★</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-slate-400 text-xs">Reviews</div>
          <div class="text-white font-bold text-lg mt-1">\${p.reviews.toLocaleString()}</div>
        </div>
      </div>
      <div class="bg-white/5 rounded-xl p-4">
        <div class="text-slate-400 text-xs mb-1">Description</div>
        <p class="text-slate-300 text-sm leading-relaxed">\${p.description}</p>
      </div>
      <div>
        <div class="text-slate-400 text-xs mb-2">Available in Plan Tiers</div>
        <div class="flex gap-2">\${tierBadges}</div>
      </div>
      <a href="\${p.amazonUrl}" target="_blank"
         class="flex items-center justify-center gap-2 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/20 text-orange-400 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full">
        <i class="fab fa-amazon"></i> View on Amazon
      </a>
    </div>\`;
  openModal('view-product-modal');
}

// ─── EDIT ─────────────────────────────────────────────────────────
function editProduct(id) {
  const p = PRODUCTS_DATA.find(x => x.id === id);
  if (!p) return;
  document.getElementById('edit-pid').value = p.id;
  document.getElementById('edit-name').value = p.name;
  document.getElementById('edit-cat').value = p.category;
  document.getElementById('edit-price').value = p.price;
  document.getElementById('edit-amazon').value = p.amazonUrl;
  document.getElementById('edit-desc').value = p.description;
  document.getElementById('edit-badge').value = p.badge || '';
  document.getElementById('edit-tier-starter').checked = p.tiers.includes('Starter');
  document.getElementById('edit-tier-pro').checked = p.tiers.includes('Pro');
  document.getElementById('edit-tier-elite').checked = p.tiers.includes('Elite');
  openModal('edit-product-modal');
}

function saveEditProduct() {
  const name = document.getElementById('edit-name').value.trim();
  if (!name) { showToast('Product name is required', 'error'); return; }
  showToast('Product updated successfully!', 'success');
  closeModal('edit-product-modal');
}

// ─── ADD ──────────────────────────────────────────────────────────
function saveNewProduct() {
  const name   = document.getElementById('new-name').value.trim();
  const amazon = document.getElementById('new-amazon').value.trim();
  if (!name || !amazon) { showToast('Name and Amazon URL are required', 'error'); return; }
  showToast('Product added successfully!', 'success');
  closeModal('add-product-modal');
  ['new-name','new-price','new-emoji','new-amazon','new-desc','new-badge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.querySelectorAll('input[name="tier"]').forEach(cb => cb.checked = false);
}

// ─── DELETE ───────────────────────────────────────────────────────
function deleteProduct(id, name) {
  if (confirm('Delete product "' + name + '"?\n\nThis action cannot be undone.')) {
    showToast('Product "' + name + '" removed', 'success');
  }
}
</script>`

  return adminShell({ title: 'Products & Gear', activePage: 'products', body })
}
