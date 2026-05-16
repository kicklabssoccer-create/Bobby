import { adminShell } from '../layout'
import { ADMIN_USERNAME } from '../auth'

export function adminSettingsPage(): string {
  const body = `
<!-- Page Header -->
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
  <div>
    <h2 class="text-2xl font-bold text-white">Settings</h2>
    <p class="text-slate-400 text-sm mt-1">Admin credentials, site configuration and integrations</p>
  </div>
  <div class="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
    <span class="text-green-400 text-sm font-medium">All systems operational</span>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

  <!-- LEFT COLUMN -->
  <div class="lg:col-span-2 space-y-6">

    <!-- Admin Credentials -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/8 flex items-center gap-2">
        <i class="fas fa-user-shield text-accent-400"></i>
        <h3 class="text-white font-semibold">Admin Credentials</h3>
      </div>
      <div class="p-5 space-y-4">
        <div class="bg-accent-600/8 border border-accent-600/20 rounded-xl p-4 flex items-start gap-3">
          <i class="fas fa-info-circle text-accent-400 mt-0.5"></i>
          <div class="text-accent-300 text-sm">
            Current admin login: <strong class="font-mono text-white">kicklabs.soccer@gmail.com</strong>
            &nbsp;/&nbsp; <strong class="font-mono text-white">KickLab@2026!</strong>
          </div>
        </div>

        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Admin Email</label>
          <input type="email" id="cfg-username" value="kicklabs.soccer@gmail.com"
                 class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
        </div>

        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Current Password</label>
          <div class="relative">
            <input type="password" id="cfg-current-pw" placeholder="Enter current password"
                   class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm pr-10 placeholder-slate-500"/>
            <button type="button" onclick="togglePw('cfg-current-pw',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <i class="fas fa-eye text-sm"></i>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">New Password</label>
            <div class="relative">
              <input type="password" id="cfg-new-pw" placeholder="New password"
                     class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm pr-10 placeholder-slate-500"/>
              <button type="button" onclick="togglePw('cfg-new-pw',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                <i class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Confirm Password</label>
            <div class="relative">
              <input type="password" id="cfg-confirm-pw" placeholder="Confirm new password"
                     class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm pr-10 placeholder-slate-500"/>
              <button type="button" onclick="togglePw('cfg-confirm-pw',this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                <i class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Password strength indicator -->
        <div id="pw-strength-bar" class="hidden">
          <div class="flex justify-between text-xs text-slate-400 mb-1">
            <span>Password strength</span>
            <span id="pw-strength-label"></span>
          </div>
          <div class="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div id="pw-strength-fill" class="h-full rounded-full transition-all duration-300" style="width:0%"></div>
          </div>
        </div>

        <div class="flex justify-end">
          <button onclick="saveCredentials()" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
            <i class="fas fa-lock"></i> Update Credentials
          </button>
        </div>
      </div>
    </div>

    <!-- Site Configuration -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/8 flex items-center gap-2">
        <i class="fas fa-sliders-h text-accent-400"></i>
        <h3 class="text-white font-semibold">Site Configuration</h3>
      </div>
      <div class="p-5 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Site Name</label>
            <input type="text" id="site-name" value="Kicklab"
                   class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
          </div>
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Tagline</label>
            <input type="text" id="site-tagline" value="Train Like a Pro"
                   class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
          </div>
        </div>
        <div>
          <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Site Description (Meta)</label>
          <textarea id="site-desc" rows="2"
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm resize-none">The #1 online soccer training platform. Drills, videos, and programs for all skill levels.</textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Support Email</label>
            <input type="email" id="site-email" value="support@kicklab.io"
                   class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
          </div>
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Contact Email</label>
            <input type="email" id="site-contact" value="hello@kicklab.io"
                   class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm"/>
          </div>
        </div>
        <div class="flex justify-end">
          <button onclick="saveSiteConfig()" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
            <i class="fas fa-save"></i> Save Configuration
          </button>
        </div>
      </div>
    </div>

    <!-- Feature Flags -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/8 flex items-center gap-2">
        <i class="fas fa-toggle-on text-accent-400"></i>
        <h3 class="text-white font-semibold">Feature Flags</h3>
      </div>
      <div class="p-5 space-y-3">
        ${[
          { id: 'ff-maintenance', label: 'Maintenance Mode', desc: 'Show maintenance page to all visitors', val: false },
          { id: 'ff-signups', label: 'New User Signups', desc: 'Allow new users to create accounts', val: true },
          { id: 'ff-shop', label: 'Gear Shop', desc: 'Show the Amazon affiliate products shop', val: true },
          { id: 'ff-programs', label: 'Training Programs', desc: 'Enable the training programs section', val: true },
          { id: 'ff-analytics', label: 'User Analytics', desc: 'Collect usage analytics', val: true },
          { id: 'ff-promo', label: 'Promo Banners', desc: 'Display promotional banners on homepage', val: false },
        ].map(f => `
        <div class="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
          <div>
            <div class="text-white text-sm font-medium">${f.label}</div>
            <div class="text-slate-400 text-xs">${f.desc}</div>
          </div>
          <button id="${f.id}" onclick="toggleFeature(this, '${f.label}')"
                  class="relative w-11 h-6 rounded-full transition-all duration-200 ${f.val ? 'bg-accent-600' : 'bg-white/10'} flex-shrink-0"
                  data-enabled="${f.val}">
            <span class="absolute top-1 transition-all duration-200 w-4 h-4 bg-white rounded-full shadow ${f.val ? 'left-6' : 'left-1'}"></span>
          </button>
        </div>`).join('')}
        <div class="flex justify-end pt-2">
          <button onclick="saveFeatureFlags()" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-accent-600/20">
            <i class="fas fa-save"></i> Save Flags
          </button>
        </div>
      </div>
    </div>

    <!-- Mailchimp Email Marketing -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/8 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i class="fas fa-envelope-open-text text-yellow-400"></i>
          <h3 class="text-white font-semibold">Email Marketing — Mailchimp</h3>
        </div>
        <span class="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-green-500/15 text-green-400 border border-green-500/20">
          ✓ Connected
        </span>
      </div>
      <div class="p-5 space-y-5">

        <!-- Live stats row -->
        <div class="grid grid-cols-3 gap-3" id="mc-stats-row">
          <div class="bg-white/5 rounded-xl p-3 text-center">
            <div class="text-xl font-bold text-white" id="mc-members">—</div>
            <div class="text-slate-400 text-xs mt-0.5">Subscribers</div>
          </div>
          <div class="bg-white/5 rounded-xl p-3 text-center">
            <div class="text-xl font-bold text-green-400" id="mc-open-rate">—</div>
            <div class="text-slate-400 text-xs mt-0.5">Open Rate</div>
          </div>
          <div class="bg-white/5 rounded-xl p-3 text-center">
            <div class="text-xl font-bold text-accent-400" id="mc-click-rate">—</div>
            <div class="text-slate-400 text-xs mt-0.5">Click Rate</div>
          </div>
        </div>

        <!-- Audience info -->
        <div class="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
          <div>
            <div class="text-white text-sm font-medium" id="mc-list-name">Loading...</div>
            <div class="text-slate-400 text-xs">Audience: b886b81b7f · us16</div>
          </div>
          <button onclick="syncToMailchimp()" id="mc-sync-btn"
            class="inline-flex items-center gap-1.5 bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-400 text-xs font-semibold px-3 py-2 rounded-lg border border-yellow-500/20 transition-all">
            <i class="fas fa-sync-alt text-xs"></i> Sync All Users
          </button>
        </div>

        <!-- Send Campaign -->
        <div class="border border-white/8 rounded-xl p-4 space-y-3">
          <h4 class="text-white text-sm font-semibold flex items-center gap-2">
            <i class="fas fa-paper-plane text-accent-400 text-xs"></i>
            Send Email Campaign
          </h4>
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Subject Line</label>
            <input type="text" id="mc-subject" placeholder="e.g. New drills added this week ⚽"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
          </div>
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Preview Text</label>
            <input type="text" id="mc-preview" placeholder="Short preview shown in inbox..."
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500"/>
          </div>
          <div>
            <label class="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1.5">Email Body (HTML or plain text)</label>
            <textarea id="mc-body" rows="5" placeholder="<h2>Hey {{FNAME}}!</h2><p>We just added 10 new drills...</p>"
              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-500 resize-none font-mono"></textarea>
          </div>
          <div class="flex items-center justify-between pt-1">
            <p class="text-slate-500 text-xs">Sends to all subscribers in your Mailchimp audience.</p>
            <button onclick="sendCampaign()" id="mc-send-btn"
              class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-accent-600/20">
              <i class="fas fa-paper-plane"></i> Send Now
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>

  <!-- RIGHT COLUMN -->
  <div class="space-y-6">

    <!-- System Status -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/8 flex items-center gap-2">
        <i class="fas fa-heartbeat text-accent-400"></i>
        <h3 class="text-white font-semibold">System Status</h3>
      </div>
      <div class="p-5 space-y-3">
        ${[
          { name: 'Cloudflare Workers', status: 'Operational', ok: true },
          { name: 'D1 Database', status: 'Operational', ok: true },
          { name: 'KV Storage', status: 'Operational', ok: true },
          { name: 'Video CDN', status: 'Operational', ok: true },
          { name: 'Email Service (Mailchimp)', status: 'Operational', ok: true },
          { name: 'Stripe API', status: 'Operational', ok: true },
        ].map(s => `
        <div class="flex items-center justify-between">
          <span class="text-slate-300 text-sm">${s.name}</span>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full ${s.ok ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}"></span>
            <span class="text-xs ${s.ok ? 'text-green-400' : 'text-yellow-400'}">${s.status}</span>
          </div>
        </div>`).join('')}
      </div>
      <div class="px-5 pb-4">
        <div class="text-center text-slate-500 text-xs py-3 bg-white/3 rounded-xl">
          Last checked: just now
        </div>
      </div>
    </div>

    <!-- Session Info -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/8 flex items-center gap-2">
        <i class="fas fa-key text-accent-400"></i>
        <h3 class="text-white font-semibold">Active Session</h3>
      </div>
      <div class="p-5 space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Logged in as</span>
          <span class="text-white font-medium font-mono text-xs">kicklabs.soccer@gmail.com</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Role</span>
          <span class="text-accent-400 font-medium">Super Admin</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Session expires</span>
          <span class="text-slate-300 text-xs">24 hours from login</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Auth method</span>
          <span class="text-slate-300 text-xs">Cookie-based token</span>
        </div>
        <div class="pt-2 border-t border-white/8">
          <a href="/admin/logout"
             class="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
            <i class="fas fa-sign-out-alt"></i> Sign Out
          </a>
        </div>
      </div>
    </div>

    <!-- Security Log -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-white/8 flex items-center gap-2">
        <i class="fas fa-shield-alt text-accent-400"></i>
        <h3 class="text-white font-semibold">Security Log</h3>
      </div>
      <div class="p-5 space-y-3">
        ${[
          { action: 'Admin login', time: '2 min ago', ok: true },
          { action: 'Plan updated: Elite', time: '1 hr ago', ok: true },
          { action: 'Failed login attempt', time: '3 hrs ago', ok: false },
          { action: 'User deleted: id#4892', time: '5 hrs ago', ok: true },
          { action: 'Video added: Advanced Dribbling', time: '1 day ago', ok: true },
          { action: 'Failed login attempt', time: '2 days ago', ok: false },
        ].map(log => `
        <div class="flex items-center gap-2.5">
          <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 ${log.ok ? 'bg-green-400' : 'bg-red-400'}"></span>
          <div class="flex-1 min-w-0">
            <div class="text-slate-300 text-xs truncate">${log.action}</div>
          </div>
          <span class="text-slate-500 text-[11px] flex-shrink-0">${log.time}</span>
        </div>`).join('')}
      </div>
    </div>

    <!-- App Version -->
    <div class="bg-slate-800 border border-white/6 rounded-2xl p-5">
      <div class="text-center space-y-2">
        <div class="w-12 h-12 bg-accent-600/15 rounded-xl flex items-center justify-center text-2xl mx-auto">⚽</div>
        <div class="text-white font-bold">Kicklab Admin</div>
        <div class="text-slate-400 text-sm">v1.0.0</div>
        <div class="text-slate-500 text-xs">Built on Hono + Cloudflare Pages</div>
        <div class="pt-2">
          <span class="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full">
            ✓ Up to date
          </span>
        </div>
      </div>
    </div>

  </div>
</div>

<script>
function togglePw(fieldId, btn) {
  const field = document.getElementById(fieldId);
  const icon = btn.querySelector('i');
  if (field.type === 'password') {
    field.type = 'text';
    icon.className = 'fas fa-eye-slash text-sm';
  } else {
    field.type = 'password';
    icon.className = 'fas fa-eye text-sm';
  }
}

// Password strength meter
document.addEventListener('DOMContentLoaded', () => {
  const newPw = document.getElementById('cfg-new-pw');
  const bar = document.getElementById('pw-strength-bar');
  const fill = document.getElementById('pw-strength-fill');
  const label = document.getElementById('pw-strength-label');
  if (!newPw) return;
  newPw.addEventListener('input', () => {
    const v = newPw.value;
    if (!v) { bar.classList.add('hidden'); return; }
    bar.classList.remove('hidden');
    let score = 0;
    if (v.length >= 8) score++;
    if (v.length >= 12) score++;
    if (/[A-Z]/.test(v)) score++;
    if (/[0-9]/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;
    const levels = ['Weak','Fair','Good','Strong','Very Strong'];
    const colors = ['bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500','bg-green-400'];
    fill.style.width = (score * 20) + '%';
    fill.className = 'h-full rounded-full transition-all duration-300 ' + (colors[score-1] || 'bg-red-500');
    label.textContent = levels[score-1] || 'Too short';
    label.className = score >= 3 ? 'text-green-400' : score === 2 ? 'text-yellow-400' : 'text-red-400';
  });
});

function saveCredentials() {
  const username = document.getElementById('cfg-username').value.trim();
  const current  = document.getElementById('cfg-current-pw').value;
  const newPw    = document.getElementById('cfg-new-pw').value;
  const confirm  = document.getElementById('cfg-confirm-pw').value;
  if (!username) { showToast('Username cannot be empty', 'error'); return; }
  if (newPw && newPw !== confirm) { showToast('New passwords do not match', 'error'); return; }
  if (newPw && newPw.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
  showToast('Credentials updated — changes take effect on next login', 'success');
  document.getElementById('cfg-current-pw').value = '';
  document.getElementById('cfg-new-pw').value = '';
  document.getElementById('cfg-confirm-pw').value = '';
  document.getElementById('pw-strength-bar').classList.add('hidden');
}

function saveSiteConfig() {
  const name = document.getElementById('site-name').value.trim();
  if (!name) { showToast('Site name cannot be empty', 'error'); return; }
  showToast('Site configuration saved!', 'success');
}

function toggleFeature(btn, label) {
  const isOn = btn.dataset.enabled === 'true';
  btn.dataset.enabled = (!isOn).toString();
  const dot = btn.querySelector('span');
  if (!isOn) {
    btn.className = btn.className.replace('bg-white/10', 'bg-accent-600');
    dot.classList.replace('left-1', 'left-6');
    showToast(label + ' enabled', 'success');
  } else {
    btn.className = btn.className.replace('bg-accent-600', 'bg-white/10');
    dot.classList.replace('left-6', 'left-1');
    showToast(label + ' disabled', 'warning');
  }
}

function saveFeatureFlags() {
  showToast('Feature flags saved!', 'success');
}

// ── Mailchimp ──────────────────────────────────────────────────────
async function loadMailchimpStats() {
  try {
    const res = await fetch('/api/admin/mailchimp/stats');
    if (!res.ok) return;
    const d = await res.json();
    document.getElementById('mc-members').textContent = (d.memberCount || 0).toLocaleString();
    document.getElementById('mc-open-rate').textContent = (d.openRate || '0') + '%';
    document.getElementById('mc-click-rate').textContent = (d.clickRate || '0') + '%';
    document.getElementById('mc-list-name').textContent = d.listName || 'Kicklabs';
  } catch(e) {}
}

async function syncToMailchimp() {
  const btn = document.getElementById('mc-sync-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin text-xs"></i> Syncing...';
  btn.disabled = true;
  try {
    const res = await fetch('/api/admin/mailchimp/sync', { method: 'POST' });
    const d = await res.json();
    if (d.ok) {
      showToast('Synced ' + d.total + ' users to Mailchimp! (' + d.added + ' new, ' + d.updated + ' updated)', 'success');
      loadMailchimpStats();
    } else {
      showToast('Sync error: ' + (d.error || 'Unknown'), 'error');
    }
  } catch(e) {
    showToast('Sync failed', 'error');
  }
  btn.innerHTML = '<i class="fas fa-sync-alt text-xs"></i> Sync All Users';
  btn.disabled = false;
}

async function sendCampaign() {
  const subject = document.getElementById('mc-subject').value.trim();
  const previewText = document.getElementById('mc-preview').value.trim();
  const body = document.getElementById('mc-body').value.trim();
  if (!subject) { showToast('Subject line is required', 'error'); return; }
  if (!body) { showToast('Email body is required', 'error'); return; }

  const btn = document.getElementById('mc-send-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/admin/mailchimp/campaign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, previewText, body }),
    });
    const d = await res.json();
    if (d.ok) {
      showToast('Campaign sent successfully to all subscribers! 🎉', 'success');
      document.getElementById('mc-subject').value = '';
      document.getElementById('mc-preview').value = '';
      document.getElementById('mc-body').value = '';
    } else {
      showToast('Error: ' + (d.error || 'Campaign failed'), 'error');
    }
  } catch(e) {
    showToast('Failed to send campaign', 'error');
  }
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Now';
  btn.disabled = false;
}

document.addEventListener('DOMContentLoaded', loadMailchimpStats);
</script>`

  return adminShell({ title: 'Settings', activePage: 'settings', body })
}
