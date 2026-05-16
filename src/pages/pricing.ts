import { pageShell } from '../lib/html';

export function pricingPage() {
  return pageShell({
    title: 'Pricing — Kicklabs Soccer',
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
          ['How does Venmo payment work?', 'Select Venmo at checkout. We\'ll show you the exact amount and our Venmo handle (@kicklabs-soccer). Pay from your Venmo app, then submit your transaction ID. An admin manually verifies and activates your plan — usually within a few hours.'],
          ['Can I upgrade or downgrade?', 'Absolutely. You can change your plan at any time. Upgrades are instant; downgrades take effect at the next billing cycle.'],
          ['Do programs work for all ages?', 'Yes! Programs are designed for players aged 8 and up. Foundation Builder is ideal for younger players; Elite is for serious adult players.'],
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

<!-- ============================================================
     CHECKOUT MODAL — Multi-step with payment method selection
     ============================================================ -->
<div id="checkout-modal" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" style="display:none" onclick="if(event.target===this)closeCheckout()">
  <div class="bg-surface border border-white/10 rounded-2xl w-full max-w-lg mx-4 overflow-hidden" style="max-height:90vh;overflow-y:auto">
    <div class="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-surface z-10">
      <h3 class="text-white font-bold text-lg" id="checkout-title">Subscribe</h3>
      <button onclick="closeCheckout()" class="text-gray-400 hover:text-white"><i class="fas fa-times text-lg"></i></button>
    </div>

    <!-- Step 1: Account + Method Selection -->
    <div id="checkout-step-1" class="p-6">
      <div id="checkout-plan-info" class="bg-panel rounded-xl p-4 mb-5"></div>

      <!-- Account fields -->
      <div class="space-y-3 mb-5">
        <div>
          <label class="block text-gray-400 text-xs font-medium mb-1">Email Address *</label>
          <input type="email" placeholder="your@email.com" class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600" id="checkout-email">
        </div>
        <div>
          <label class="block text-gray-400 text-xs font-medium mb-1">Full Name *</label>
          <input type="text" placeholder="Your full name" class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600" id="checkout-name">
        </div>
        <div>
          <label class="block text-gray-400 text-xs font-medium mb-1">Password * (min 8 chars)</label>
          <input type="password" placeholder="Create a password" class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600" id="checkout-pass">
        </div>
      </div>

      <!-- Payment method selection -->
      <div class="mb-5">
        <label class="block text-gray-400 text-xs font-medium mb-3">Choose Payment Method</label>
        <div class="grid grid-cols-2 gap-2" id="payment-method-grid">
          <button onclick="selectMethod('venmo')" id="method-venmo" class="method-btn flex items-center gap-2 border border-white/10 bg-panel hover:border-accent-600/40 rounded-xl p-3 text-left transition-all">
            <span class="text-xl">📱</span>
            <div><div class="text-white text-sm font-medium">Venmo</div><div class="text-gray-600 text-xs">Manual verify</div></div>
          </button>
          <button onclick="selectMethod('zelle')" id="method-zelle" class="method-btn flex items-center gap-2 border border-white/10 bg-panel hover:border-accent-600/40 rounded-xl p-3 text-left transition-all">
            <span class="text-xl">📲</span>
            <div><div class="text-white text-sm font-medium">Zelle</div><div class="text-gray-600 text-xs">Manual verify</div></div>
          </button>
          <button onclick="selectMethod('paypal')" id="method-paypal" class="method-btn flex items-center gap-2 border border-white/10 bg-panel hover:border-accent-600/40 rounded-xl p-3 text-left transition-all">
            <span class="text-xl">🅿️</span>
            <div><div class="text-white text-sm font-medium">PayPal</div><div class="text-gray-600 text-xs">Manual verify</div></div>
          </button>
          <button onclick="selectMethod('card')" id="method-card" class="method-btn flex items-center gap-2 border border-white/10 bg-panel hover:border-accent-600/40 rounded-xl p-3 text-left transition-all">
            <span class="text-xl">💳</span>
            <div><div class="text-white text-sm font-medium">Credit Card</div><div class="text-gray-600 text-xs">Coming soon</div></div>
          </button>
        </div>
      </div>

      <div id="checkout-error" class="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-red-300 text-sm" style="display:none"></div>

      <button onclick="proceedToPayment()" id="checkout-next-btn" class="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm">
        Continue to Payment →
      </button>
      <p class="text-gray-700 text-xs text-center mt-3">By signing up you agree to our Terms & Privacy Policy</p>
    </div>

    <!-- Step 2: Venmo / Zelle / PayPal Manual Payment -->
    <div id="checkout-step-2" style="display:none" class="p-6">
      <div id="payment-instructions" class="mb-5"></div>

      <!-- TXN ID submission -->
      <div id="txn-section" class="mb-5">
        <label class="block text-gray-400 text-xs font-medium mb-1">Transaction ID / Confirmation Number *</label>
        <input type="text" id="txn-id" placeholder="Enter the transaction ID from your payment app"
          class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600">
        <p class="text-gray-600 text-xs mt-1.5">After sending payment, copy the transaction ID from your app and paste it here.</p>
      </div>

      <div id="checkout-error-2" class="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-red-300 text-sm" style="display:none"></div>

      <button onclick="submitPayment()" id="submit-payment-btn" class="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm mb-3">
        <i class="fas fa-paper-plane mr-2"></i>Submit for Verification
      </button>
      <button onclick="goBackStep1()" class="w-full text-gray-500 hover:text-white text-sm py-2 transition-colors">← Change payment method</button>
    </div>

    <!-- Step 3: Success / Pending -->
    <div id="checkout-step-3" style="display:none" class="p-6 text-center">
      <div class="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <i class="fas fa-clock text-green-400 text-2xl"></i>
      </div>
      <h3 class="font-oswald text-2xl font-bold text-white mb-2">Payment Submitted!</h3>
      <p class="text-gray-400 text-sm mb-5">Your payment is being verified. We'll activate your plan within a few hours and send you an email confirmation.</p>

      <div id="pending-summary" class="bg-panel border border-white/10 rounded-xl p-4 mb-5 text-left"></div>

      <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
        <div class="flex items-start gap-3">
          <i class="fas fa-info-circle text-yellow-400 text-sm mt-0.5 flex-shrink-0"></i>
          <div class="text-left">
            <p class="text-yellow-300 text-sm font-medium mb-1">What happens next?</p>
            <ul class="text-gray-400 text-xs space-y-1">
              <li>• An admin reviews your transaction ID</li>
              <li>• Your plan is activated (usually within 2–4 hours)</li>
              <li>• You'll receive a confirmation email</li>
            </ul>
          </div>
        </div>
      </div>

      <a href="/dashboard" class="block w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm text-center">
        Go to Dashboard →
      </a>
    </div>
  </div>
</div>

<script>
let currentBilling = 'monthly';
let currentPlan = 'pro';
let selectedMethod = null;
let _paymentId = null;
let _venmoUrl = null;

const planData = {
  starter: { name: 'Starter', emoji: '🌱', monthly: '9.99', annual: '7.99', color: 'text-green-400' },
  pro:     { name: 'Pro',     emoji: '⚡', monthly: '19.99', annual: '15.99', color: 'text-accent-400' },
  elite:   { name: 'Elite',  emoji: '🏆', monthly: '34.99', annual: '27.99', color: 'text-yellow-400' },
};

const methodInstructions = {
  venmo: (amount, plan) => \`
    <div class="bg-[#008CFF]/10 border border-[#008CFF]/30 rounded-xl p-5 text-center mb-4">
      <div class="text-4xl mb-2">📱</div>
      <h4 class="text-white font-bold text-lg mb-1">Pay via Venmo</h4>
      <p class="text-gray-400 text-sm mb-4">Send <span class="text-white font-bold text-xl">$\${amount}</span> to <span class="text-[#008CFF] font-bold">@kicklabs-soccer</span></p>
      <a id="venmo-deep-link" href="venmo://paycharge?txn=pay&recipients=kicklabs-soccer&amount=\${amount}&note=Kicklab+\${plan}+Subscription" 
         class="inline-flex items-center gap-2 bg-[#008CFF] hover:bg-[#0070cc] text-white font-bold px-6 py-3 rounded-xl transition-all text-sm mb-3">
        <i class="fas fa-external-link-alt"></i> Open Venmo App
      </a>
      <p class="text-gray-600 text-xs">Note to include: "Kicklab \${plan} Subscription"</p>
    </div>
    <div class="bg-panel border border-white/10 rounded-xl p-4 mb-4">
      <p class="text-gray-400 text-xs"><strong class="text-white">Can't use the app button?</strong><br/>
      Open Venmo manually → Search <strong class="text-[#008CFF]">@kicklabs-soccer</strong> → Send $\${amount} → Add note: "Kicklab \${plan} Subscription"</p>
    </div>
  \`,
  zelle: (amount, plan) => \`
    <div class="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 text-center mb-4">
      <div class="text-4xl mb-2">📲</div>
      <h4 class="text-white font-bold text-lg mb-1">Pay via Zelle</h4>
      <p class="text-gray-400 text-sm mb-3">Send <span class="text-white font-bold text-xl">$\${amount}</span> to:</p>
      <div class="bg-panel rounded-xl p-3 mb-3">
        <p class="text-purple-300 font-bold text-lg">kicklabs.soccer@gmail.com</p>
        <p class="text-gray-500 text-xs mt-1">Memo: Kicklab \${plan} Subscription</p>
      </div>
    </div>
    <div class="bg-panel border border-white/10 rounded-xl p-4 mb-4">
      <p class="text-gray-400 text-xs"><strong class="text-white">How to pay with Zelle:</strong><br/>
      Open your bank app → Zelle → Send to <strong class="text-purple-300">kicklabs.soccer@gmail.com</strong> → Amount: $\${amount}</p>
    </div>
  \`,
  paypal: (amount, plan) => \`
    <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 text-center mb-4">
      <div class="text-4xl mb-2">🅿️</div>
      <h4 class="text-white font-bold text-lg mb-1">Pay via PayPal</h4>
      <p class="text-gray-400 text-sm mb-3">Send <span class="text-white font-bold text-xl">$\${amount}</span> to:</p>
      <div class="bg-panel rounded-xl p-3 mb-3">
        <p class="text-blue-300 font-bold text-lg">kicklabs.soccer@gmail.com</p>
        <p class="text-gray-500 text-xs mt-1">Select "Friends & Family" · Note: Kicklab \${plan} Subscription</p>
      </div>
      <a href="https://paypal.me/kicklabsoccer/\${amount}" target="_blank"
         class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm">
        <i class="fas fa-external-link-alt"></i> Open PayPal.me
      </a>
    </div>
  \`,
  card: (amount) => \`
    <div class="bg-gray-500/10 border border-gray-500/30 rounded-xl p-5 text-center mb-4">
      <div class="text-4xl mb-2">💳</div>
      <h4 class="text-white font-bold text-lg mb-2">Credit Card</h4>
      <p class="text-gray-400 text-sm">Card payments are coming soon. Please use Venmo, Zelle, or PayPal for now.</p>
    </div>
  \`,
};

function setBilling(mode) {
  currentBilling = mode;
  document.getElementById('billing-monthly').className = 'px-5 py-2 rounded-full text-sm font-semibold transition-all ' + (mode==='monthly'?'tab-active':'tab-inactive');
  document.getElementById('billing-annual').className = 'px-5 py-2 rounded-full text-sm font-semibold transition-all ' + (mode==='annual'?'tab-active':'tab-inactive') + ' flex items-center gap-2';
  document.querySelectorAll('[data-monthly]').forEach(el => {
    el.textContent = '$' + (mode === 'monthly' ? el.dataset.monthly : el.dataset.annual);
  });
  ['starter','pro','elite'].forEach(plan => {
    const el = document.getElementById(plan + '-savings');
    if (el) el.style.display = mode === 'annual' ? 'block' : 'none';
  });
}

function openCheckout(plan) {
  currentPlan = plan;
  selectedMethod = null;
  _paymentId = null;
  const p = planData[plan];
  const price = currentBilling === 'monthly' ? p.monthly : p.annual;
  document.getElementById('checkout-title').textContent = p.emoji + ' ' + p.name + ' Plan';
  document.getElementById('checkout-plan-info').innerHTML =
    '<div class="flex items-center justify-between">' +
    '<span class="text-gray-300 text-sm">' + p.name + ' Plan (' + currentBilling + ')</span>' +
    '<span class="font-bold text-white text-lg">$' + price + '/mo</span></div>' +
    '<div class="mt-1 text-gray-600 text-xs">7-day free trial included — charged after trial ends</div>';
  // Reset all steps
  document.getElementById('checkout-step-1').style.display = 'block';
  document.getElementById('checkout-step-2').style.display = 'none';
  document.getElementById('checkout-step-3').style.display = 'none';
  document.getElementById('checkout-error').style.display = 'none';
  // Remove method highlights
  document.querySelectorAll('.method-btn').forEach(b => {
    b.style.borderColor = '';
    b.classList.remove('border-accent-600');
  });
  document.getElementById('checkout-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function selectMethod(method) {
  selectedMethod = method;
  document.querySelectorAll('.method-btn').forEach(b => {
    b.style.borderColor = 'rgba(255,255,255,0.1)';
  });
  const btn = document.getElementById('method-' + method);
  if (btn) btn.style.borderColor = '#2563eb';
}

async function proceedToPayment() {
  const email = document.getElementById('checkout-email').value.trim();
  const name  = document.getElementById('checkout-name').value.trim();
  const pass  = document.getElementById('checkout-pass').value;
  const errEl = document.getElementById('checkout-error');

  if (!email || !email.includes('@')) { errEl.textContent = 'Please enter a valid email address.'; errEl.style.display = 'block'; return; }
  if (!name) { errEl.textContent = 'Please enter your full name.'; errEl.style.display = 'block'; return; }
  if (!pass || pass.length < 8) { errEl.textContent = 'Password must be at least 8 characters.'; errEl.style.display = 'block'; return; }
  if (!selectedMethod) { errEl.textContent = 'Please select a payment method.'; errEl.style.display = 'block'; return; }
  errEl.style.display = 'none';

  const nextBtn = document.getElementById('checkout-next-btn');
  nextBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Setting up...';
  nextBtn.disabled = true;

  try {
    // 1. Create account (or verify existing)
    const signupRes = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password: pass, level: 'beginner', gender: 'prefer_not', age: '18_24', location: '', phone: '', venmoHandle: '' })
    });
    const signupData = await signupRes.json();
    if (!signupRes.ok && !signupData.error?.includes('already')) {
      errEl.textContent = signupData.error || 'Could not create account.';
      errEl.style.display = 'block';
      nextBtn.innerHTML = 'Continue to Payment →';
      nextBtn.disabled = false;
      return;
    }

    // 2. Initiate payment
    const p = planData[currentPlan];
    const amount = currentBilling === 'monthly' ? p.monthly : p.annual;
    const payRes = await fetch('/api/payment/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, plan: currentPlan, amount, method: selectedMethod, billing: currentBilling })
    });
    const payData = await payRes.json();
    if (!payRes.ok) {
      errEl.textContent = payData.error || 'Payment setup failed.';
      errEl.style.display = 'block';
      nextBtn.innerHTML = 'Continue to Payment →';
      nextBtn.disabled = false;
      return;
    }

    _paymentId = payData.paymentId;
    _venmoUrl  = payData.venmoUrl;

    // 3. Show step 2
    const instrFn = methodInstructions[selectedMethod];
    document.getElementById('payment-instructions').innerHTML = instrFn ? instrFn(amount, p.name) : '';

    // Hide TXN section for card (not applicable)
    document.getElementById('txn-section').style.display = selectedMethod === 'card' ? 'none' : 'block';

    document.getElementById('checkout-step-1').style.display = 'none';
    document.getElementById('checkout-step-2').style.display = 'block';
    document.getElementById('checkout-title').textContent = 'Complete Payment';

  } catch(err) {
    errEl.textContent = 'Network error. Please try again.';
    errEl.style.display = 'block';
  }

  nextBtn.innerHTML = 'Continue to Payment →';
  nextBtn.disabled = false;
}

async function submitPayment() {
  const txnId = document.getElementById('txn-id').value.trim();
  const errEl = document.getElementById('checkout-error-2');

  if (selectedMethod !== 'card' && !txnId) {
    errEl.textContent = 'Please enter your transaction ID.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  const submitBtn = document.getElementById('submit-payment-btn');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;

  try {
    const res = await fetch('/api/payment/confirm-venmo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: _paymentId, txnId })
    });
    const data = await res.json();

    if (!res.ok) {
      errEl.textContent = data.error || 'Submission failed. Please try again.';
      errEl.style.display = 'block';
      submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit for Verification';
      submitBtn.disabled = false;
      return;
    }

    // Show success step
    const p = planData[currentPlan];
    const amount = currentBilling === 'monthly' ? p.monthly : p.annual;
    const methodLabels = { venmo: 'Venmo', zelle: 'Zelle', paypal: 'PayPal', card: 'Credit Card' };
    document.getElementById('pending-summary').innerHTML =
      '<div class="space-y-2 text-sm">' +
      '<div class="flex justify-between"><span class="text-gray-400">Plan</span><span class="text-white font-medium">' + p.emoji + ' ' + p.name + '</span></div>' +
      '<div class="flex justify-between"><span class="text-gray-400">Amount</span><span class="text-white font-medium">$' + amount + '/mo</span></div>' +
      '<div class="flex justify-between"><span class="text-gray-400">Method</span><span class="text-white font-medium">' + (methodLabels[selectedMethod] || selectedMethod) + '</span></div>' +
      '<div class="flex justify-between"><span class="text-gray-400">Transaction ID</span><span class="text-gray-300 text-xs">' + (txnId || 'N/A') + '</span></div>' +
      '<div class="flex justify-between"><span class="text-gray-400">Status</span><span class="text-yellow-400 font-medium">⏳ Pending Verification</span></div>' +
      '</div>';

    document.getElementById('checkout-step-2').style.display = 'none';
    document.getElementById('checkout-step-3').style.display = 'block';
    document.getElementById('checkout-title').textContent = '✅ Payment Submitted';

    // Also store user in localStorage
    localStorage.setItem('kicklab_user', JSON.stringify(data.user || { email: document.getElementById('checkout-email').value, plan: 'free' }));

  } catch(err) {
    errEl.textContent = 'Network error. Please try again.';
    errEl.style.display = 'block';
    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Submit for Verification';
    submitBtn.disabled = false;
  }
}

function goBackStep1() {
  document.getElementById('checkout-step-2').style.display = 'none';
  document.getElementById('checkout-step-1').style.display = 'block';
  document.getElementById('checkout-title').textContent = planData[currentPlan].emoji + ' ' + planData[currentPlan].name + ' Plan';
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
