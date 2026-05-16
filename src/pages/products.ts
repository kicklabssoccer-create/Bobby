import { pageShell } from '../lib/html';
import { PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_TIERS } from '../data/products';

export function productsPage(query: { cat?: string; tier?: string }) {
  return pageShell({
    title: 'Training Gear Store — Kicklabs Soccer',
    activePath: '/products',
    body: `
<section class="py-16 bg-midnight min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-3">
        <span class="bg-[#FF9900]/10 text-[#FF9900] border border-[#FF9900]/20 text-xs font-bold px-2 py-0.5 rounded">Available on Amazon</span>
      </div>
      <h1 class="font-oswald text-5xl font-bold text-white mb-3">OFFICIAL TRAINING<br/><span style="color:#FF9900">GEAR STORE</span></h1>
      <p class="text-gray-400 max-w-2xl">Every product recommended and used across Kicklab's Starter, Pro & Elite programs. Click any product to buy directly from Amazon.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      ${[['📦', PRODUCTS.length, 'Products'], ['✅', '100%', 'Amazon Verified'], ['📂', '6', 'Categories'], ['⭐', '4.7★', 'Avg Rating']].map(([emoji, val, label]) =>
        `<div class="bg-panel border border-white/10 rounded-xl p-4 text-center"><div class="text-2xl mb-1">${emoji}</div><div class="font-oswald text-xl font-bold text-white">${val}</div><div class="text-gray-500 text-xs">${label}</div></div>`
      ).join('')}
    </div>

    <!-- Gear packs -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      ${[
        { tier: 'Starter', icon: '🌱', color: 'accent-600', items: ['Nike Academy Soccer Ball', 'Pro Disc Cones (Set of 50)', 'Agility Ladder 20ft + 12 Cones', 'Portable Soccer Goal 12×6 ft'] },
        { tier: 'Pro', icon: '⚡', color: 'purple-600', items: ['Everything in Starter', 'SKLZ Pro Soccer Rebounder', 'Tall Training Pylons (Set of 12)', 'Soccer Resistance Bands (5-Pack)'] },
        { tier: 'Elite', icon: '🏆', color: 'yellow-600', items: ['Everything in Pro', 'SKLZ Golden Touch Weighted Ball', 'Speed Resistance Parachute 56"', 'Complete Speed & Agility Training Kit', 'Pro Soccer Goalkeeper Gloves'] },
      ].map(pack => `
        <div class="bg-panel border border-white/10 rounded-2xl p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-lg">${pack.icon}</span>
            <span class="font-oswald text-lg font-bold text-white">${pack.tier} Plan</span>
          </div>
          <p class="text-gray-500 text-xs mb-4">${pack.tier} Program Gear Pack</p>
          <ul class="space-y-1.5 mb-4">
            ${pack.items.map(item => `<li class="flex items-start gap-2 text-xs text-gray-400"><i class="fas fa-check text-green-400 text-[10px] mt-0.5 flex-shrink-0"></i>${item}</li>`).join('')}
          </ul>
          <button onclick="filterProducts('tier','${pack.tier}')" class="block w-full text-center bg-${pack.color}/15 hover:bg-${pack.color}/25 text-${pack.color === 'yellow-600' ? 'yellow-400' : pack.color === 'purple-600' ? 'purple-400' : 'accent-400'} font-bold py-2 rounded-lg transition-all text-sm border border-${pack.color}/20">
            View ${pack.tier} Gear →
          </button>
        </div>
      `).join('')}
    </div>

    <!-- Filters -->
    <div class="flex flex-col gap-3 mb-6">
      <div class="flex flex-wrap gap-2">
        ${PRODUCT_CATEGORIES.map(c => `
          <button onclick="filterProducts('cat','${c}')" class="pill-${c==='All'?'active':'inactive'} px-4 py-1.5 rounded-full text-sm font-medium transition-all" data-pfilter-type="cat" data-pfilter-val="${c}">
            ${c === 'Balls' ? '⚽ ' : c === 'Cones' ? '🟠 ' : c === 'Agility' ? '⚡ ' : c === 'Goals' ? '🥅 ' : c === 'GK' ? '🧤 ' : c === 'Conditioning' ? '💪 ' : ''}${c}
          </button>
        `).join('')}
      </div>
      <div class="flex flex-wrap gap-2">
        ${PRODUCT_TIERS.map(t => `
          <button onclick="filterProducts('tier','${t}')" class="pill-${t==='All'?'active':'inactive'} px-4 py-1.5 rounded-full text-sm font-medium transition-all" data-pfilter-type="tier" data-pfilter-val="${t}">
            ${t === 'Starter' ? '🌱 ' : t === 'Pro' ? '⚡ ' : t === 'Elite' ? '🏆 ' : ''}${t}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Count -->
    <div class="flex items-center justify-between mb-6">
      <p class="text-gray-500 text-sm">Showing <span id="product-count" class="text-white font-semibold">${PRODUCTS.length}</span> products</p>
      <p class="text-gray-600 text-xs flex items-center gap-1.5"><span class="text-[#FF9900]">a</span>Shop on Amazon — Trusted &amp; Secure</p>
    </div>

    <!-- CMS Featured Products (loaded dynamically) -->
    <div id="cms-products-section" class="hidden mb-8">
      <div class="flex items-center gap-2 mb-4">
        <span class="w-1 h-5 bg-accent-500 rounded-full"></span>
        <h2 class="text-white font-bold text-lg">New Arrivals</h2>
        <span class="bg-accent-600/20 text-accent-400 text-xs font-bold px-2 py-0.5 rounded-full border border-accent-600/30">Just Added</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="cms-products-grid"></div>
    </div>

    <!-- Products grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="products-grid">
      ${PRODUCTS.map(p => {
        const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
        return `
          <div class="bg-panel border border-white/10 rounded-2xl overflow-hidden card-hover product-card flex flex-col"
               data-pcat="${p.category}" data-ptiers="${p.tiers.join(',')}">
            <div class="p-5 flex-1">
              ${p.badge ? `<div class="bg-[#FF9900]/10 text-[#FF9900] text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-3">${p.badge}</div>` : '<div class="mb-5"></div>'}
              <div class="text-4xl mb-3">${p.emoji}</div>
              <h3 class="text-white font-semibold text-sm mb-2 line-clamp-2">${p.name}</h3>
              <p class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">${p.description}</p>
              <div class="flex items-center gap-1 mb-2">
                <span class="text-yellow-400 text-xs">${'★'.repeat(Math.floor(p.rating))}</span>
                <span class="text-gray-500 text-xs">${p.rating} (${p.reviews.toLocaleString()})</span>
              </div>
              <div class="flex flex-wrap gap-1 mb-3">
                ${p.tiers.map(t => `<span class="bg-white/5 text-gray-500 text-[10px] px-1.5 py-0.5 rounded border border-white/5">${t}</span>`).join('')}
              </div>
            </div>
            <div class="px-5 pb-5">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[#FF9900] font-bold text-lg">${p.price}</span>
                <span class="text-gray-600 text-xs">Approx. price</span>
              </div>
              <a href="${p.amazonUrl}" target="_blank" rel="noopener noreferrer" class="amazon-btn flex items-center justify-center gap-2 text-black font-bold py-2.5 rounded-xl text-sm w-full transition-all">
                <span style="font-weight:900;font-size:14px;">a</span> Buy on Amazon
              </a>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <!-- Disclaimer -->
    <div class="mt-10 bg-panel border border-white/5 rounded-xl p-4 flex items-start gap-3">
      <span class="text-[#FF9900] text-lg flex-shrink-0">a</span>
      <p class="text-gray-600 text-xs leading-relaxed">Shop on Amazon — Trusted & Secure. All product links go directly to Amazon.com. Prices shown are approximate and may vary. Kicklab may earn a small commission from purchases, which helps fund free content at no extra cost to you. ✅</p>
    </div>
  </div>
</section>

<script>
let pActiveCat = '${query.cat || 'All'}';
let pActiveTier = '${query.tier || 'All'}';

function filterProducts(type, val) {
  if (type === 'cat') {
    pActiveCat = val;
    document.querySelectorAll('[data-pfilter-type="cat"]').forEach(btn => {
      btn.className = 'px-4 py-1.5 rounded-full text-sm font-medium transition-all ' + (btn.dataset.pfilterVal === val ? 'pill-active' : 'pill-inactive');
    });
  } else {
    pActiveTier = val;
    document.querySelectorAll('[data-pfilter-type="tier"]').forEach(btn => {
      btn.className = 'px-4 py-1.5 rounded-full text-sm font-medium transition-all ' + (btn.dataset.pfilterVal === val ? 'pill-active' : 'pill-inactive');
    });
  }
  applyProductFilters();
}

function applyProductFilters() {
  const cards = document.querySelectorAll('.product-card');
  let visible = 0;
  cards.forEach(card => {
    const matchCat = pActiveCat === 'All' || card.dataset.pcat === pActiveCat;
    const matchTier = pActiveTier === 'All' || card.dataset.ptiers.includes(pActiveTier);
    if (matchCat && matchTier) { card.style.display = ''; visible++; }
    else card.style.display = 'none';
  });
  document.getElementById('product-count').textContent = visible;
}

// Load CMS products from API
async function loadCMSProducts() {
  try {
    const res = await fetch('/api/cms/products');
    if (!res.ok) return;
    const data = await res.json();
    const products = data.products || [];
    if (!products.length) return;
    const grid = document.getElementById('cms-products-grid');
    const section = document.getElementById('cms-products-section');
    grid.innerHTML = products.map(p => \`
      <div class="bg-panel border border-accent-600/20 rounded-2xl overflow-hidden card-hover flex flex-col">
        <div class="p-5 flex-1">
          <div class="bg-accent-600/10 text-accent-400 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-3">✨ New</div>
          <div class="text-4xl mb-3">\${p.emoji || '📦'}</div>
          <h3 class="text-white font-semibold text-sm mb-2 line-clamp-2">\${p.name}</h3>
          <p class="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">\${p.description || ''}</p>
          <div class="flex flex-wrap gap-1 mb-3">
            \${p.category ? '<span class="bg-white/5 text-gray-500 text-[10px] px-1.5 py-0.5 rounded border border-white/5">' + p.category + '</span>' : ''}
            \${p.tier && p.tier !== 'All' ? '<span class="bg-white/5 text-gray-500 text-[10px] px-1.5 py-0.5 rounded border border-white/5">' + p.tier + '</span>' : ''}
          </div>
        </div>
        <div class="px-5 pb-5">
          <div class="flex items-center justify-between mb-3">
            <span class="text-[#FF9900] font-bold text-lg">\${p.price || 'View on Amazon'}</span>
          </div>
          <a href="\${p.amazonUrl}" target="_blank" rel="noopener noreferrer" class="amazon-btn flex items-center justify-center gap-2 text-black font-bold py-2.5 rounded-xl text-sm w-full transition-all">
            <span style="font-weight:900;font-size:14px;">a</span> Buy on Amazon
          </a>
        </div>
      </div>
    \`).join('');
    section.classList.remove('hidden');
  } catch(e) {}
}

// Apply initial filters from URL
document.addEventListener('DOMContentLoaded', () => {
  loadCMSProducts();
  if (pActiveCat !== 'All' || pActiveTier !== 'All') {
    applyProductFilters();
    // Update active buttons
    if (pActiveCat !== 'All') {
      document.querySelectorAll('[data-pfilter-type="cat"]').forEach(btn => {
        btn.className = 'px-4 py-1.5 rounded-full text-sm font-medium transition-all ' + (btn.dataset.pfilterVal === pActiveCat ? 'pill-active' : 'pill-inactive');
      });
    }
    if (pActiveTier !== 'All') {
      document.querySelectorAll('[data-pfilter-type="tier"]').forEach(btn => {
        btn.className = 'px-4 py-1.5 rounded-full text-sm font-medium transition-all ' + (btn.dataset.pfilterVal === pActiveTier ? 'pill-active' : 'pill-inactive');
      });
    }
  }
});
</script>
`
  });
}
