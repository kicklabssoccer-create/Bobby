import { pageShell } from '../lib/html';

export function pricingPage() {
  return pageShell({
    title: 'Pricing — Kicklab',
    activePath: '/pricing',
    body: `
<section class="py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <div class="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Subscription Plans</div>
      <h1 class="font-oswald text-5xl font-bold text-white mb-4">TRAIN AT YOUR<br/><span class="gradient-text">OWN PACE.</span></h1>
      <p class="text-gray-400 max-w-2xl mx-auto">Start free, upgrade when you're ready. Pay your way — Credit Card, Venmo, Zelle, or PayPal.</p>

      <!-- Payment methods -->
      <div class="flex flex-wrap justify-center gap-2 mt-6">
        ${[['💳', 'Credit Card'], ['📱', 'Venmo'], ['📲', 'Zelle'], ['🅿️', 'PayPal']].map(([icon, label]) =>
          `<span class="bg-panel border border-white/10 text-gray-300 text-sm font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5">${icon} ${label}</span>`
        ).join('')}
      </div>
    </div>

    <!-- Billing toggle -->
    <div class="flex justify-center mb-10">
      <div class="bg-panel rounded-full p-1 flex items-center gap-1 border border-white/10">
        <button id="billing-monthly" onclick="setBilling('monthly')" class="px-5 py-2 rounded-full text-sm font-semibold transition-all tab-active">Monthly</button>
        <button id="billing-annual" onclick="setBilling('annual')" class="px-5 py-2 rounded-full text-sm font-semibold transition-all tab-inactive">
          Annual <span class="bg-green-500/20 text-green-400 text-xs px-1.5 py-0.5 rounded-full ml-1">Save 20%</span>
        </button>
      </div>
    </div>

    <!-- Plans grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <!-- Free -->
      <div class="bg-panel border border-white/10 rounded-2xl p-6 flex flex-col">
        <div class="mb-5">
          <div class="text-2xl mb-2">👀</div>
          <div class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">FREE</div>
          <h3 class="font-oswald text-2xl font-bold text-white mb-1">Free</h3>
          <p class="text-gray-500 text-sm">Preview the platform — no credit card needed.</p>
        </div>
        <div class="mb-6">
          <span class="font-oswald text-4xl font-bold text-white">$0</span>
          <span class="text-gray-500 text-sm">/mo</span>
        </div>
        <ul class="space-y-2.5 mb-6 flex-1">
          ${['3 beginner drills (free forever)', '2 free preview videos', 'Progress tracker (limited)', 'Program overviews', 'No credit card required'].map(f =>
            `<li class="flex items-start gap-2 text-sm"><i class="fas fa-check text-green-400 text-xs mt-0.5 flex-shrink-0"></i><span class="text-gray-300">${f}</span></li>`
          ).join('')}
        </ul>
        <a href="/auth/signup" class="block w-full text-center border border-white/20 text-gray-300 hover:border-white/40 hover:text-white font-semibold py-3 rounded-xl transition-all text-sm">Get Started Free</a>
      </div>

      <!-- Starter -->
      <div class="bg-panel border border-white/10 rounded-2xl p-6 flex flex-col">
        <div class="mb-5">
          <div class="text-2xl mb-2">🌱</div>
          <div class="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">STARTER</div>
          <h3 class="font-oswald text-2xl font-bold text-white mb-1">Starter</h3>
          <p class="text-gray-500 text-sm">Perfect for beginners building their foundation.</p>
        </div>
        <div class="mb-6">
          <span class="font-oswald text-4xl font-bold text-white" data-monthly="$9.99" data-annual="$7.99">$9.99</span>
          <span class="text-gray-500 text-sm">/mo</span>
          <div class="text-gray-600 text-xs mt-1" id="starter-savings" style="display:none">Save $24 per year</div>
        </div>
        <ul class="space-y-2.5 mb-6 flex-1">
          ${['Full Foundation Builder program (8 wks)', '48 beginner drills', '32 beginner video tutorials', 'Full progress tracker — daily/weekly/monthly', 'Personalized improvement suggestions', 'Session logging + streak tracking', 'Weekly training plan', 'Email support'].map(f =>
            `<li class="flex items-start gap-2 text-sm"><i class="fas fa-check text-green-400 text-xs mt-0.5 flex-shrink-0"></i><span class="text-gray-300">${f}</span></li>`
          ).join('')}
        </ul>
        <button onclick="openCheckout('starter')" class="block w-full text-center border border-accent-600 text-accent-400 hover:bg-accent-600 hover:text-white font-semibold py-3 rounded-xl transition-all text-sm cursor-pointer">Get Starter</button>
      </div>

      <!-- Pro -->
      <div class="bg-panel border-2 border-accent-600 rounded-2xl p-6 flex flex-col relative plan-card-popular">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-600 text-white text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">MOST POPULAR</div>
        <div class="mb-5">
          <div class="text-2xl mb-2">⚡</div>
          <div class="text-accent-400 text-xs font-bold uppercase tracking-wider mb-1">PRO</div>
          <h3 class="font-oswald text-2xl font-bold text-white mb-1">Pro</h3>
          <p class="text-gray-500 text-sm">For developing players ready to level up.</p>
        </div>
        <div class="mb-6">
          <span class="font-oswald text-4xl font-bold text-white" data-monthly="$19.99" data-annual="$15.99">$19.99</span>
          <span class="text-gray-500 text-sm">/mo</span>
          <div class="text-gray-600 text-xs mt-1" id="pro-savings" style="display:none">Save $48 per year</div>
        </div>
        <ul class="space-y-2.5 mb-6 flex-1">
          ${['Everything in Starter', 'Skill Accelerator program (10 wks)', '112 drills (beginner + intermediate)', '80 video tutorials', 'Advanced performance analytics', 'Skill gap analysis + detailed suggestions', 'Tactical analysis videos', 'Priority email support', 'Monthly live Q&A session'].map(f =>
            `<li class="flex items-start gap-2 text-sm"><i class="fas fa-check text-accent-400 text-xs mt-0.5 flex-shrink-0"></i><span class="text-gray-300">${f}</span></li>`
          ).join('')}
        </ul>
        <button onclick="openCheckout('pro')" class="block w-full text-center bg-accent-600 hover:bg-accent-500 text-white font-semibold py-3 rounded-xl transition-all text-sm cursor-pointer">Get Pro</button>
      </div>

      <!-- Elite -->
      <div class="bg-panel border border-yellow-600/30 rounded-2xl p-6 flex flex-col" style="background:linear-gradient(135deg,#1a2235 0%,#1c1a0f 100%)">
        <div class="mb-5">
          <div class="text-2xl mb-2">🏆</div>
          <div class="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">ELITE</div>
          <h3 class="font-oswald text-2xl font-bold text-white mb-1">Elite</h3>
          <p class="text-gray-500 text-sm">Complete access for the most serious players.</p>
        </div>
        <div class="mb-6">
          <span class="font-oswald text-4xl font-bold text-white" data-monthly="$34.99" data-annual="$27.99">$34.99</span>
          <span class="text-gray-500 text-sm">/mo</span>
          <div class="text-gray-600 text-xs mt-1" id="elite-savings" style="display:none">Save $84 per year</div>
        </div>
        <ul class="space-y-2.5 mb-6 flex-1">
          ${['Everything in Pro', 'Elite Performance program (12 wks)', '200+ drills — complete library', '120+ video tutorials', 'All 3 training programs', 'Early access to new content', '1-on-1 coach messaging', 'Priority support'].map(f =>
            `<li class="flex items-start gap-2 text-sm"><i class="fas fa-check text-yellow-400 text-xs mt-0.5 flex-shrink-0"></i><span class="text-gray-300">${f}</span></li>`
          ).join('')}
        </ul>
        <button onclick="openCheckout('elite')" class="block w-full text-center bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition-all text-sm cursor-pointer">Get Elite</button>
      </div>
    </div>

    <!-- Trial / guarantees -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
      ${[
        { icon: 'fas fa-shield-alt', title: '7-Day Free Trial', desc: 'Try any paid plan risk-free', color: 'text-green-400' },
        { icon: 'fas fa-times-circle', title: 'Cancel Anytime', desc: 'No lock-in contracts', color: 'text-accent-400' },
        { icon: 'fas fa-lock', title: 'Secure Payments', desc: 'Card, Venmo & Zelle accepted', color: 'text-purple-400' },
      ].map(g => `
        <div class="bg-panel border border-white/5 rounded-xl p-5 flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0"><i class="${g.icon} ${g.color}"></i></div>
          <div><div class="text-white font-semibold text-sm">${g.title}</div><div class="text-gray-500 text-xs">${g.desc}</div></div>
        </div>
      `).join('')}
    </div>

    <!-- Comparison table -->
    <div class="mb-16">
      <h2 class="font-oswald text-3xl font-bold text-white text-center mb-8">FULL PLAN COMPARISON</h2>
      <div class="overflow-x-auto rounded-2xl border border-white/10">
        <table class="w-full min-w-[640px]">
          <thead>
            <tr class="bg-panel border-b border-white/10">
              <th class="text-left p-4 text-gray-400 font-medium text-sm w-1/3">Feature</th>
              <th class="text-center p-4 text-gray-400 font-medium text-sm">Free<br/><span class="text-gray-600 font-normal text-xs">$0/mo</span></th>
              <th class="text-center p-4 text-green-400 font-medium text-sm">Starter<br/><span class="text-gray-600 font-normal text-xs">$9.99/mo</span></th>
              <th class="text-center p-4 text-accent-400 font-bold text-sm bg-accent-600/5">Pro<br/><span class="text-gray-600 font-normal text-xs">$19.99/mo</span></th>
              <th class="text-center p-4 text-yellow-400 font-medium text-sm">Elite<br/><span class="text-gray-600 font-normal text-xs">$34.99/mo</span></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            ${[
              ['Beginner Drills', '5 only', '48', '48', '48'],
              ['Intermediate Drills', '—', '—', '64', '64'],
              ['Advanced Drills', '—', '—', '—', '80+'],
              ['Beginner Videos', '2 previews', '32', '32', '32'],
              ['Intermediate Videos', '—', '—', '48', '48'],
              ['Advanced Videos', '—', '—', '—', '40+'],
              ['Foundation Builder', '—', '✅', '✅', '✅'],
              ['Skill Accelerator', '—', '—', '✅', '✅'],
              ['Elite Performance', '—', '—', '—', '✅'],
              ['Weekly Training Plan', '—', '✅', '✅', '✅'],
              ['Progress Tracking', '—', '✅', '✅', '✅'],
              ['Monthly Live Q&A', '—', '—', '✅', '✅'],
              ['Coach Messaging', '—', '—', '—', '✅'],
              ['Early Access Content', '—', '—', '—', '✅'],
            ].map(([feature, ...vals]) => `
              <tr class="hover:bg-white/[0.02] transition-colors">
                <td class="p-4 text-gray-300 text-sm">${feature}</td>
                ${vals.map((v, i) => `<td class="p-4 text-center text-sm ${i === 2 ? 'bg-accent-600/5' : ''} ${v === '✅' ? 'text-green-400' : v === '—' ? 'text-gray-700' : 'text-gray-300'}">${v}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- FAQ -->
    <div class="max-w-2xl mx-auto">
      <h2 class="font-oswald text-3xl font-bold text-white text-center mb-8">FREQUENTLY ASKED</h2>
      <div class="space-y-3" id="faq-list">
        ${[
          ['Can I cancel at any time?', 'Yes — cancel anytime from your account settings. You keep access until the end of your billing period. No fees, no questions asked.'],
          ['Is there a free trial?', 'Yes! All paid plans include a 7-day free trial. You won\'t be charged until the trial ends.'],
          ['What payment methods do you accept?', 'We accept all major credit/debit cards, Venmo, Zelle, and PayPal. Pay the way that works for you.'],
          ['Can I upgrade or downgrade?', 'Absolutely. You can change your plan at any time. Upgrades are instant; downgrades take effect at the next billing cycle.'],
          ['Do programs work for all ages?', 'Yes! Programs are designed for players aged 8 and up. Foundation Builder is ideal for younger players; Elite is for serious adult players.'],
          ['Are the videos hosted on YouTube?', 'Yes — we curate the best publicly available soccer training videos from top coaches and trainers worldwide, all in one organized platform.'],
        ].map(([q, a], i) => `
          <div class="bg-panel border border-white/10 rounded-xl overflow-hidden">
            <button onclick="toggleFaq(${i})" class="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
              <span class="text-white font-medium text-sm pr-4">${q}</span>
              <i id="faq-icon-${i}" class="fas fa-chevron-down text-gray-500 text-xs flex-shrink-0 transition-transform"></i>
            </button>
            <div id="faq-body-${i}" class="hidden px-5 pb-5">
              <p class="text-gray-400 text-sm leading-relaxed">${a}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- Checkout Modal -->
<div id="checkout-modal" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" style="display:none" onclick="if(event.target===this)closeCheckout()">
  <div class="bg-surface border border-white/10 rounded-2xl w-full max-w-md mx-4 overflow-hidden">
    <div class="flex items-center justify-between p-5 border-b border-white/10">
      <h3 class="text-white font-bold text-lg" id="checkout-title">Subscribe</h3>
      <button onclick="closeCheckout()" class="text-gray-400 hover:text-white"><i class="fas fa-times text-lg"></i></button>
    </div>
    <div class="p-6">
      <div id="checkout-plan-info" class="bg-panel rounded-xl p-4 mb-5"></div>
      <div class="space-y-3 mb-5">
        <input type="email" placeholder="Email address" class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600" id="checkout-email">
        <input type="text" placeholder="Full name" class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600" id="checkout-name">
        <input type="password" placeholder="Password (min 8 characters)" class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600" id="checkout-pass">
      </div>
      <p class="text-gray-600 text-xs mb-4 text-center">7-day free trial — cancel anytime. No charge today.</p>
      <button onclick="completeCheckout()" class="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm" id="checkout-btn">Start Free Trial</button>
      <p class="text-gray-700 text-xs text-center mt-3">By signing up you agree to our Terms & Privacy Policy</p>
    </div>
  </div>
</div>

<script>
let currentBilling = 'monthly';
let currentPlan = 'pro';

const planData = {
  starter: { name: 'Starter', emoji: '🌱', monthly: '$9.99', annual: '$7.99', color: 'text-green-400' },
  pro:     { name: 'Pro',     emoji: '⚡', monthly: '$19.99', annual: '$15.99', color: 'text-accent-400' },
  elite:   { name: 'Elite',  emoji: '🏆', monthly: '$34.99', annual: '$27.99', color: 'text-yellow-400' },
};

function setBilling(mode) {
  currentBilling = mode;
  document.getElementById('billing-monthly').className = 'px-5 py-2 rounded-full text-sm font-semibold transition-all ' + (mode==='monthly'?'tab-active':'tab-inactive');
  document.getElementById('billing-annual').className = 'px-5 py-2 rounded-full text-sm font-semibold transition-all ' + (mode==='annual'?'tab-active':'tab-inactive') + ' flex items-center gap-2';
  
  document.querySelectorAll('[data-monthly]').forEach(el => {
    el.textContent = mode === 'monthly' ? el.dataset.monthly : el.dataset.annual;
  });
  
  ['starter','pro','elite'].forEach(plan => {
    const el = document.getElementById(plan + '-savings');
    if (el) el.style.display = mode === 'annual' ? 'block' : 'none';
  });
}

function openCheckout(plan) {
  currentPlan = plan;
  const p = planData[plan];
  const price = currentBilling === 'monthly' ? p.monthly : p.annual;
  document.getElementById('checkout-title').textContent = p.emoji + ' ' + p.name + ' Plan';
  document.getElementById('checkout-plan-info').innerHTML = 
    '<div class="flex items-center justify-between"><span class="text-gray-300 text-sm">' + p.name + ' Plan (' + currentBilling + ')</span><span class="font-bold text-white">' + price + '/mo</span></div>' +
    '<div class="mt-1 text-gray-600 text-xs">7-day free trial included — charged after trial ends</div>';
  document.getElementById('checkout-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function completeCheckout() {
  const email = document.getElementById('checkout-email').value.trim();
  const name = document.getElementById('checkout-name').value.trim();
  const pass = document.getElementById('checkout-pass').value;
  
  if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
  if (!name) { alert('Please enter your full name.'); return; }
  if (!pass || pass.length < 8) { alert('Password must be at least 8 characters.'); return; }
  
  const user = { email, name, plan: currentPlan, joined: new Date().toISOString(), streak: 0, sessionsCompleted: 0 };
  localStorage.setItem('kicklab_user', JSON.stringify(user));
  
  closeCheckout();
  window.location.href = '/dashboard';
}

function toggleFaq(i) {
  const body = document.getElementById('faq-body-' + i);
  const icon = document.getElementById('faq-icon-' + i);
  if (body.classList.contains('hidden')) {
    body.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    body.classList.add('hidden');
    icon.style.transform = '';
  }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCheckout(); });
</script>
`
  });
}
