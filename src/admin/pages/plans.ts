import { adminShell } from '../layout'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    color: 'slate',
    badge: null,
    features: [
      '5 free drills',
      '4 free videos',
      'Basic progress tracking',
      'Community access',
    ],
    limits: { drills: 5, videos: 4, programs: 0 },
    subscribers: 38540,
    mrr: 0,
  },
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 9, annual: 7 },
    color: 'green',
    badge: null,
    features: [
      'Everything in Free',
      '25+ drills (all levels)',
      '20+ training videos',
      'Foundation Builder program (8 weeks)',
      'Weekly progress reports',
      'Mobile-optimized access',
    ],
    limits: { drills: 25, videos: 20, programs: 1 },
    subscribers: 7230,
    mrr: 7230 * 9,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 19, annual: 15 },
    color: 'blue',
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'All 50+ drills',
      '35+ premium videos',
      'Skill Accelerator program (10 weeks)',
      'Advanced performance analytics',
      'Drill customization tools',
      'Priority support',
    ],
    limits: { drills: 50, videos: 35, programs: 2 },
    subscribers: 3820,
    mrr: 3820 * 19,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: { monthly: 39, annual: 31 },
    color: 'yellow',
    badge: 'Best Results',
    features: [
      'Everything in Pro',
      'All 70+ drills including elite',
      'All 43 videos',
      'Elite Performance program (12 weeks)',
      'Elite gear recommendations',
      '1-on-1 coach messaging',
      'Custom training plans',
      'Early access to new content',
    ],
    limits: { drills: 70, videos: 43, programs: 3 },
    subscribers: 752,
    mrr: 752 * 39,
  },
]

export function adminPlansPage(): string {
  const totalMRR = PLANS.reduce((s, p) => s + p.mrr, 0)
  const totalSubs = PLANS.reduce((s, p) => s + p.subscribers, 0)

  const planCards = PLANS.map(p => {
    const pct = Math.round((p.subscribers / totalSubs) * 100)
    const colorMap: Record<string, string> = {
      slate: 'border-slate-600/30 bg-slate-700/20',
      green: 'border-green-500/30 bg-green-500/5',
      blue:  'border-accent-600/30 bg-accent-600/5',
      yellow:'border-yellow-500/30 bg-yellow-500/5',
    }
    const textMap: Record<string, string> = {
      slate: 'text-slate-300',
      green: 'text-green-400',
      blue:  'text-accent-400',
      yellow:'text-yellow-400',
    }
    const barMap: Record<string, string> = {
      slate: 'bg-slate-500',
      green: 'bg-green-500',
      blue:  'bg-accent-600',
      yellow:'bg-yellow-500',
    }
    const featureList = p.features.map(f => `
      <li class="flex items-center gap-2 text-slate-300 text-sm">
        <i class="fas fa-check text-xs ${textMap[p.color]}"></i>${f}
      </li>`).join('')

    return `
    <div class="bg-slate-800 border ${colorMap[p.color]} rounded-2xl p-5 flex flex-col gap-4">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-white font-bold text-lg">${p.name}</span>
            ${p.badge ? `<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-600/20 text-accent-400 border border-accent-600/20">${p.badge}</span>` : ''}
          </div>
          <div class="${textMap[p.color]} font-bold text-2xl mt-1">
            ${p.price.monthly === 0 ? 'Free' : `$${p.price.monthly}<span class="text-sm font-normal text-slate-400">/mo</span>`}
          </div>
          ${p.price.annual > 0 ? `<div class="text-slate-500 text-xs">$${p.price.annual}/mo billed annually</div>` : ''}
        </div>
        <button onclick="editPlan('${p.id}')" class="text-slate-400 hover:text-accent-400 p-2 hover:bg-white/5 rounded-lg transition-all">
          <i class="fas fa-pen text-sm"></i>
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white/5 rounded-xl p-3 text-center">
          <div class="text-white font-bold text-xl">${p.subscribers.toLocaleString()}</div>
          <div class="text-slate-400 text-xs">Subscribers</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3 text-center">
          <div class="${textMap[p.color]} font-bold text-xl">${p.mrr > 0 ? '$' + (p.mrr / 1000).toFixed(1) + 'k' : '—'}</div>
          <div class="text-slate-400 text-xs">Monthly Revenue</div>
        </div>
      </div>

      <!-- Share bar -->
      <div>
        <div class="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>User share</span><span class="${textMap[p.color]} font-semibold">${pct}%</span>
        </div>
        <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div class="h-full ${barMap[p.color]} rounded-full" style="width:${pct}%"></div>
        </div>
      </div>

      <!-- Features -->
      <ul class="space-y-1.5">${featureList}</ul>

      <!-- Content limits -->
      <div class="border-t border-white/8 pt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <div class="text-white font-bold text-sm">${p.limits.drills}${p.limits.drills >= 70 ? '+' : ''}</div>
          <div class="text-slate-500 text-[11px]">Drills</div>
        </div>
        <div>
          <div class="text-white font-bold text-sm">${p.limits.videos}</div>
          <div class="text-slate-500 text-[11px]">Videos</div>
        </div>
        <div>
          <div class="text-white font-bold text-sm">${p.limits.programs}</div>
          <div class="text-slate-500 text-[11px]">Programs</div>
        </div>
      </div>
    </div>`
  }).join('')

  // Comparison table headers & rows
  const allFeatures = [
    { label: 'Monthly Price', vals: ['Free', '$9/mo', '$19/mo', '$39/mo'] },
    { label: 'Annual Price',  vals: ['Free', '$7/mo', '$15/mo', '$31/mo'] },
    { label: 'Drills Access', vals: ['5', '25+', '50+', '70+'] },
    { label: 'Video Library', vals: ['4', '20+', '35+', 'All 43'] },
    { label: 'Programs',      vals: ['None', 'Foundation (8wk)', 'Foundation + Skill (10wk)', 'All 3 Programs'] },
    { label: 'Progress Tracking', vals: ['Basic', 'Weekly Reports', 'Advanced Analytics', 'Full Analytics'] },
    { label: 'Support',       vals: ['Community', 'Email', 'Priority Email', '1-on-1 Coach'] },
    { label: 'Custom Plans',  vals: ['✗', '✗', '✗', '✓'] },
    { label: 'Early Access',  vals: ['✗', '✗', '✗', '✓'] },
  ]

  const tableRows = allFeatures.map(row => `
    <tr class="border-b border-white/5 table-row">
      <td class="px-4 py-3 text-slate-400 text-sm font-medium">${row.label}</td>
      ${row.vals.map((v, i) => `
        <td class="px-4 py-3 text-sm text-center ${v === '✓' ? 'text-green-400 font-bold' : v === '✗' ? 'text-slate-600' : 'text-white'}">
          ${v}
        </td>`).join('')}
    </tr>`).join('')

  const body = `
<!-- Page Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <h2 class="text-2xl font-bold text-white">Plans &amp; Pricing</h2>
    <p class="text-slate-400 text-sm mt-1">Manage subscription tiers, pricing, and feature access</p>
  </div>
  <div class="flex gap-3">
    <button onclick="openModal('edit-promo-modal')" class="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all">
      <i class="fas fa-tag"></i> Promo Code
    </button>
    <button onclick="openModal('add-plan-modal')" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-accent-600/20">
      <i class="fas fa-plus"></i> New Plan
    </button>
  </div>
</div>

<!-- Revenue Summary -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Total MRR</div>
    <div class="text-2xl font-bold text-green-400">$${(totalMRR / 1000).toFixed(1)}k</div>
    <div class="text-xs text-slate-500 mt-1">Monthly recurring</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Paid Subscribers</div>
    <div class="text-2xl font-bold text-white">${(PLANS.slice(1).reduce((s, p) => s + p.subscribers, 0)).toLocaleString()}</div>
    <div class="text-xs text-slate-500 mt-1">Active paying users</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">ARR Estimate</div>
    <div class="text-2xl font-bold text-accent-400">$${((totalMRR * 12) / 1000).toFixed(0)}k</div>
    <div class="text-xs text-slate-500 mt-1">Annual run rate</div>
  </div>
  <div class="stat-card">
    <div class="text-slate-400 text-xs mb-1">Free → Paid Conv.</div>
    <div class="text-2xl font-bold text-yellow-400">${((PLANS.slice(1).reduce((s, p) => s + p.subscribers, 0) / totalSubs) * 100).toFixed(1)}%</div>
    <div class="text-xs text-slate-500 mt-1">Conversion rate</div>
  </div>
</div>

<!-- Plan Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
  ${planCards}
</div>

<!-- Feature Comparison Table -->
<div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden mb-6">
  <div class="px-5 py-4 border-b border-white/8 flex items-center justify-between">
    <div>
      <h3 class="text-white font-semibold">Feature Comparison</h3>
      <p class="text-slate-400 text-xs mt-0.5">Side-by-side comparison of all plan tiers</p>
    </div>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-white/8">
          <th class="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-40">Feature</th>
          <th class="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Free</th>
          <th class="px-4 py-3 text-center text-xs font-semibold text-green-400 uppercase tracking-wider">Starter</th>
          <th class="px-4 py-3 text-center text-xs font-semibold text-accent-400 uppercase tracking-wider">Pro</th>
          <th class="px-4 py-3 text-center text-xs font-semibold text-yellow-400 uppercase tracking-wider">Elite</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
  </div>
</div>

<!-- Subscriber Distribution Chart -->
<div class="bg-slate-800 border border-white/6 rounded-2xl p-5 mb-6">
  <h3 class="text-white font-semibold mb-4">Subscriber Distribution</h3>
  <div class="flex flex-col md:flex-row items-center gap-8">
    <div class="w-48 h-48 flex-shrink-0">
      <canvas id="dist-chart"></canvas>
    </div>
    <div class="flex-1 space-y-3 w-full">
      ${PLANS.map(p => {
        const pct = Math.round((p.subscribers / totalSubs) * 100)
        const colors: Record<string, string> = { free:'bg-slate-500', starter:'bg-green-500', pro:'bg-accent-600', elite:'bg-yellow-500' }
        return `
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-slate-300">${p.name}</span>
            <span class="text-slate-400">${p.subscribers.toLocaleString()} <span class="text-slate-500">(${pct}%)</span></span>
          </div>
          <div class="h-2 bg-white/5 rounded-full overflow-hidden">
            <div class="h-full ${colors[p.id]} rounded-full" style="width:${pct}%"></div>
          </div>
        </div>`
      }).join('')}
    </div>
  </div>
</div>

<!-- =================== EDIT PLAN MODAL =================== -->
<div id="edit-plan-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in max-h-[90vh] overflow-y-auto">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-slate-800 z-10">
      <h3 class="text-white font-bold text-lg">Edit Plan: <span id="edit-plan-name" class="text-accent-400"></span></h3>
      <button onclick="closeModal('edit-plan-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6 space-y-4">
      <input type="hidden" id="edit-plan-id"/>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Monthly Price ($)</label>
          <input type="number" id="edit-monthly" min="0" step="1"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Annual Price ($/mo)</label>
          <input type="number" id="edit-annual" min="0" step="1"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Badge Label</label>
        <input type="text" id="edit-plan-badge" placeholder="e.g. Most Popular"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Features (one per line)</label>
        <textarea id="edit-plan-features" rows="6"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none font-mono text-xs"></textarea>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Drills Limit</label>
          <input type="number" id="edit-limit-drills" min="0"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Videos Limit</label>
          <input type="number" id="edit-limit-videos" min="0"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Programs</label>
          <input type="number" id="edit-limit-programs" min="0" max="3"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8 sticky bottom-0 bg-slate-800">
      <button onclick="closeModal('edit-plan-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Cancel</button>
      <button onclick="savePlanEdit()" class="px-5 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
        <i class="fas fa-save mr-1.5"></i>Save Changes
      </button>
    </div>
  </div>
</div>

<!-- =================== ADD PLAN MODAL =================== -->
<div id="add-plan-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8">
      <h3 class="text-white font-bold text-lg">Create New Plan</h3>
      <button onclick="closeModal('add-plan-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6 space-y-4">
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Plan Name *</label>
        <input type="text" id="new-plan-name" placeholder="e.g. Team"
               class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Monthly Price ($)</label>
          <input type="number" id="new-plan-monthly" placeholder="49" min="0"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Annual Price ($)</label>
          <input type="number" id="new-plan-annual" placeholder="39" min="0"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
        </div>
      </div>
      <div>
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Features (one per line)</label>
        <textarea id="new-plan-features" rows="4" placeholder="All Elite features&#10;Team dashboard&#10;5 user seats&#10;Bulk billing"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 resize-none"></textarea>
      </div>
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8">
      <button onclick="closeModal('add-plan-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Cancel</button>
      <button onclick="saveNewPlan()" class="px-5 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
        <i class="fas fa-plus mr-1.5"></i>Create Plan
      </button>
    </div>
  </div>
</div>

<!-- =================== PROMO CODE MODAL =================== -->
<div id="edit-promo-modal" class="hidden fixed inset-0 modal-bg z-50 items-center justify-center p-4">
  <div class="bg-slate-800 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl animate-in">
    <div class="flex items-center justify-between px-6 py-4 border-b border-white/8">
      <h3 class="text-white font-bold text-lg">Promo Codes</h3>
      <button onclick="closeModal('edit-promo-modal')" class="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="p-6 space-y-4">
      <div class="space-y-2">
        ${['KICKSTART30 — 30% off first month (Pro)', 'ELITE50 — 50% off first month (Elite)', 'BACK2SCHOOL — Free Starter for 2 months'].map(promo => `
        <div class="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
          <div class="text-slate-300 text-sm font-mono">${promo.split(' — ')[0]}</div>
          <div class="flex items-center gap-3">
            <span class="text-slate-400 text-xs">${promo.split(' — ')[1]}</span>
            <button class="text-red-400 hover:text-red-300 text-xs p-1" onclick="showToast('Promo code removed','success')">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>`).join('')}
      </div>
      <div class="border-t border-white/8 pt-4">
        <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Create New Promo Code</label>
        <div class="flex gap-2">
          <input type="text" id="new-promo-code" placeholder="NEWCODE25"
                 class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 font-mono"/>
          <input type="number" id="new-promo-pct" placeholder="%" min="1" max="100"
                 class="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-slate-500"/>
          <button onclick="addPromoCode()" class="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">Add</button>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-3 px-6 py-4 border-t border-white/8">
      <button onclick="closeModal('edit-promo-modal')" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-all">Done</button>
    </div>
  </div>
</div>

<script>
const PLANS_DATA = ${JSON.stringify(PLANS)};

// Subscriber distribution donut chart
(function() {
  const ctx = document.getElementById('dist-chart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: PLANS_DATA.map(p => p.name),
      datasets: [{
        data: PLANS_DATA.map(p => p.subscribers),
        backgroundColor: ['rgba(100,116,139,0.7)','rgba(34,197,94,0.7)','rgba(37,99,235,0.7)','rgba(234,179,8,0.7)'],
        borderColor: ['#1e293b'],
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' ' + ctx.label + ': ' + ctx.raw.toLocaleString() + ' users'
          }
        }
      },
      cutout: '70%'
    }
  });
})();

function editPlan(id) {
  const p = PLANS_DATA.find(x => x.id === id);
  if (!p) return;
  document.getElementById('edit-plan-id').value = p.id;
  document.getElementById('edit-plan-name').textContent = p.name;
  document.getElementById('edit-monthly').value = p.price.monthly;
  document.getElementById('edit-annual').value = p.price.annual;
  document.getElementById('edit-plan-badge').value = p.badge || '';
  document.getElementById('edit-plan-features').value = p.features.join('\\n');
  document.getElementById('edit-limit-drills').value = p.limits.drills;
  document.getElementById('edit-limit-videos').value = p.limits.videos;
  document.getElementById('edit-limit-programs').value = p.limits.programs;
  openModal('edit-plan-modal');
}

function savePlanEdit() {
  showToast('Plan updated successfully!', 'success');
  closeModal('edit-plan-modal');
}

function saveNewPlan() {
  const name = document.getElementById('new-plan-name').value.trim();
  if (!name) { showToast('Plan name is required', 'error'); return; }
  showToast('New plan "' + name + '" created!', 'success');
  closeModal('add-plan-modal');
  document.getElementById('new-plan-name').value = '';
  document.getElementById('new-plan-monthly').value = '';
  document.getElementById('new-plan-annual').value = '';
  document.getElementById('new-plan-features').value = '';
}

function addPromoCode() {
  const code = document.getElementById('new-promo-code').value.trim().toUpperCase();
  const pct  = document.getElementById('new-promo-pct').value;
  if (!code || !pct) { showToast('Code and discount % required', 'error'); return; }
  showToast('Promo code "' + code + '" (' + pct + '% off) created!', 'success');
  document.getElementById('new-promo-code').value = '';
  document.getElementById('new-promo-pct').value = '';
}
</script>`

  return adminShell({ title: 'Plans & Pricing', activePage: 'plans', body })
}
