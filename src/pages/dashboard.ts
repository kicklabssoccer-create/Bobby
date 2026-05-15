import { pageShell } from '../lib/html';

export function dashboardPage() {
  return pageShell({
    title: 'Dashboard — Kicklab',
    activePath: '/dashboard',
    body: `
<section class="py-16 bg-midnight min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="dashboard-content">
    <!-- Loading state -->
    <div id="dashboard-loading" class="flex items-center justify-center py-32">
      <div class="text-center">
        <i class="fas fa-spinner fa-spin text-accent-400 text-3xl mb-4"></i>
        <p class="text-gray-400">Loading your dashboard...</p>
      </div>
    </div>

    <!-- Not logged in state -->
    <div id="dashboard-guest" class="hidden text-center py-32">
      <div class="text-6xl mb-6">⚽</div>
      <h2 class="font-oswald text-4xl font-bold text-white mb-4">SIGN IN TO CONTINUE</h2>
      <p class="text-gray-400 mb-8">Access your dashboard, track progress, and continue your training journey.</p>
      <div class="flex justify-center gap-4">
        <a href="/auth/login" class="bg-accent-600 hover:bg-accent-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all">Sign In</a>
        <a href="/auth/signup" class="border border-white/20 text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all">Create Account</a>
      </div>
    </div>

    <!-- Dashboard main -->
    <div id="dashboard-main" class="hidden">
      <!-- Welcome header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 class="font-oswald text-4xl font-bold text-white mb-1">
            WELCOME BACK, <span class="gradient-text" id="dash-username">PLAYER</span>!
          </h1>
          <p class="text-gray-500 text-sm" id="dash-subtitle">Keep up the great work. Your next session is ready.</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="bg-panel border border-white/10 rounded-xl px-4 py-2.5 text-center min-w-[80px]">
            <div class="font-oswald text-2xl font-bold text-accent-400" id="dash-streak">0</div>
            <div class="text-gray-500 text-xs">Day Streak 🔥</div>
          </div>
          <button onclick="kicklabLogout()" class="bg-panel border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all flex items-center gap-2">
            <i class="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </div>

      <!-- Plan banner -->
      <div id="plan-banner" class="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"></div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        ${[
          { id: 'stat-sessions', label: 'Sessions Done', icon: 'fas fa-dumbbell', color: 'text-accent-400' },
          { id: 'stat-hours', label: 'Training Hours', icon: 'fas fa-clock', color: 'text-green-400' },
          { id: 'stat-drills', label: 'Drills Completed', icon: 'fas fa-check-circle', color: 'text-purple-400' },
          { id: 'stat-streak', label: 'Best Streak', icon: 'fas fa-fire', color: 'text-orange-400' },
        ].map(s => `
          <div class="bg-panel border border-white/10 rounded-xl p-5">
            <div class="flex items-center gap-2 mb-3">
              <i class="${s.icon} ${s.color} text-sm"></i>
              <span class="text-gray-500 text-xs">${s.label}</span>
            </div>
            <div id="${s.id}" class="font-oswald text-3xl font-bold text-white">0</div>
          </div>
        `).join('')}
      </div>

      <!-- Main grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Today's training -->
        <div class="lg:col-span-2 bg-panel border border-white/10 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-5">
            <h3 class="font-oswald text-xl font-bold text-white">TODAY'S TRAINING</h3>
            <span id="today-date" class="text-gray-500 text-xs"></span>
          </div>
          <div id="today-drills" class="space-y-3"></div>
          <div class="mt-5 pt-5 border-t border-white/5">
            <a href="/drills" class="flex items-center gap-2 text-accent-400 hover:text-accent-300 text-sm font-semibold transition-colors">
              <i class="fas fa-plus-circle"></i> Add More Drills
            </a>
          </div>
        </div>

        <!-- Progress / streak -->
        <div class="bg-panel border border-white/10 rounded-2xl p-6">
          <h3 class="font-oswald text-xl font-bold text-white mb-5">WEEKLY PROGRESS</h3>
          <div class="space-y-4">
            ${[
              { label: 'Dribbling', id: 'prog-dribbling', pct: 65 },
              { label: 'Passing', id: 'prog-passing', pct: 45 },
              { label: 'Shooting', id: 'prog-shooting', pct: 30 },
              { label: 'Fitness', id: 'prog-fitness', pct: 55 },
            ].map(p => `
              <div>
                <div class="flex justify-between items-center mb-1">
                  <span class="text-gray-400 text-xs">${p.label}</span>
                  <span class="text-gray-500 text-xs" id="${p.id}-pct">0%</span>
                </div>
                <div class="h-1.5 bg-midnight rounded-full overflow-hidden">
                  <div id="${p.id}-bar" class="h-full bg-accent-600 rounded-full progress-bar" style="width:0%"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="mt-6 pt-5 border-t border-white/5">
            <h4 class="text-white font-semibold text-sm mb-3">7-Day Streak</h4>
            <div class="flex justify-between gap-1" id="streak-calendar">
              ${['M','T','W','T','F','S','S'].map((d, i) => `
                <div class="flex flex-col items-center gap-1.5">
                  <div id="streak-day-${i}" class="w-8 h-8 rounded-lg bg-midnight border border-white/5 flex items-center justify-center text-xs text-gray-600"></div>
                  <span class="text-gray-700 text-[10px]">${d}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Program progress -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-panel border border-white/10 rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-oswald text-xl font-bold text-white">CURRENT PROGRAM</h3>
            <a href="/programs" class="text-accent-400 hover:text-accent-300 text-xs font-semibold">View All →</a>
          </div>
          <div id="current-program-card" class="bg-midnight rounded-xl p-4 border border-white/5">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-accent-600/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🌱</div>
              <div class="flex-1">
                <h4 class="text-white font-semibold text-sm mb-1">Foundation Builder</h4>
                <p class="text-gray-500 text-xs mb-3">Week 1 of 8 · Session 1 of 24</p>
                <div class="h-1.5 bg-surface rounded-full overflow-hidden mb-1">
                  <div class="h-full bg-accent-600 rounded-full" style="width:4%"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-600 mt-1">
                  <span>4% complete</span>
                  <span>1/24 sessions</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <a href="/drills" class="block w-full text-center bg-accent-600 hover:bg-accent-500 text-white font-bold py-2.5 rounded-xl transition-all text-sm">Start Today's Session</a>
          </div>
        </div>

        <!-- Recent activity -->
        <div class="bg-panel border border-white/10 rounded-2xl p-6">
          <h3 class="font-oswald text-xl font-bold text-white mb-4">RECENT ACTIVITY</h3>
          <div id="recent-activity" class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-midnight rounded-xl border border-white/5">
              <div class="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0"><i class="fas fa-check text-green-400 text-xs"></i></div>
              <div>
                <p class="text-gray-300 text-sm">Account created</p>
                <p class="text-gray-600 text-xs">Welcome to Kicklab! 🎉</p>
              </div>
            </div>
            <div class="text-center py-6 text-gray-700 text-sm">
              <i class="fas fa-dumbbell text-2xl mb-2 block"></i>
              Complete drills to see your activity here
            </div>
          </div>
        </div>
      </div>

      <!-- Quick links -->
      <div>
        <h3 class="font-oswald text-xl font-bold text-white mb-4">QUICK ACCESS</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          ${[
            { href: '/drills', icon: 'fas fa-dumbbell', label: 'Drills', sub: '200+ drills', color: 'accent-600' },
            { href: '/videos', icon: 'fas fa-play-circle', label: 'Videos', sub: '40+ tutorials', color: 'purple-600' },
            { href: '/programs', icon: 'fas fa-graduation-cap', label: 'Programs', sub: '3 programs', color: 'green-600' },
            { href: '/products', icon: 'fas fa-shopping-cart', label: 'Gear Shop', sub: 'Amazon store', color: 'yellow-600' },
          ].map(l => `
            <a href="${l.href}" class="bg-panel border border-white/10 rounded-xl p-5 card-hover text-center" style="text-decoration:none">
              <div class="w-10 h-10 bg-${l.color}/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i class="${l.icon} text-${l.color === 'yellow-600' ? 'yellow-400' : l.color === 'green-600' ? 'green-400' : l.color === 'purple-600' ? 'purple-400' : 'accent-400'}"></i>
              </div>
              <div class="text-white font-semibold text-sm">${l.label}</div>
              <div class="text-gray-600 text-xs mt-0.5">${l.sub}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<script>
const FREE_DRILLS_TODAY = [
  { title: 'Basic Ball Juggling', category: 'Ball Control', duration: '10 min', done: false },
  { title: 'Cone Dribbling Basics', category: 'Dribbling', duration: '15 min', done: false },
  { title: 'Wall Passing Intro', category: 'Passing', duration: '10 min', done: false },
];

const PAID_DRILLS_TODAY = [
  { title: 'Cone Weave Dribbling', category: 'Dribbling', duration: '15 min', done: false },
  { title: 'Triangle Passing Circuit', category: 'Passing', duration: '15 min', done: false },
  { title: 'Agility Ladder Circuit', category: 'Fitness', duration: '20 min', done: false },
  { title: 'Juggling Challenge', category: 'Ball Control', duration: '10 min', done: false },
];

function initDashboard() {
  const user = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
  
  document.getElementById('dashboard-loading').style.display = 'none';
  
  if (!user) {
    document.getElementById('dashboard-guest').classList.remove('hidden');
    return;
  }
  
  document.getElementById('dashboard-main').classList.remove('hidden');
  
  // Update user info
  const firstName = user.name ? user.name.split(' ')[0].toUpperCase() : 'PLAYER';
  document.getElementById('dash-username').textContent = firstName;
  document.getElementById('dash-streak').textContent = user.streak || 0;
  
  // Date
  document.getElementById('today-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  // Plan banner
  const isPaid = user.plan && user.plan !== 'free';
  const planBanner = document.getElementById('plan-banner');
  if (!isPaid) {
    planBanner.innerHTML = \`
      <div class="flex items-center gap-3">
        <i class="fas fa-info-circle text-accent-400 text-xl"></i>
        <div>
          <p class="text-white font-semibold text-sm">You're on the Free Plan</p>
          <p class="text-gray-400 text-xs">Upgrade to unlock 200+ drills, full programs, and progress tracking.</p>
        </div>
      </div>
      <a href="/pricing" class="flex-shrink-0 bg-accent-600 hover:bg-accent-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">Upgrade Now →</a>
    \`;
    planBanner.className = 'bg-accent-600/10 border border-accent-600/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4';
  } else {
    const planColors = { starter: 'green', pro: 'accent', elite: 'yellow' };
    const c = planColors[user.plan] || 'accent';
    planBanner.innerHTML = \`
      <div class="flex items-center gap-3">
        <span class="text-2xl">\${user.plan === 'elite' ? '🏆' : user.plan === 'pro' ? '⚡' : '🌱'}</span>
        <div>
          <p class="text-white font-semibold text-sm capitalize">\${user.plan} Plan Active</p>
          <p class="text-gray-400 text-xs">Full access to all \${user.plan} content unlocked.</p>
        </div>
      </div>
      <a href="/pricing" class="flex-shrink-0 border border-white/10 text-gray-400 hover:text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">Manage Plan</a>
    \`;
    planBanner.className = 'bg-green-500/5 border border-green-500/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4';
  }
  
  // Stats
  const sessions = user.sessionsCompleted || 0;
  document.getElementById('stat-sessions').textContent = sessions;
  document.getElementById('stat-hours').textContent = (sessions * 0.75).toFixed(1);
  document.getElementById('stat-drills').textContent = sessions * 3;
  document.getElementById('stat-streak').textContent = user.streak || 0;
  
  // Today's drills
  const drills = isPaid ? PAID_DRILLS_TODAY : FREE_DRILLS_TODAY;
  const drillsContainer = document.getElementById('today-drills');
  
  // Load completed state
  const completedDrills = JSON.parse(localStorage.getItem('kicklab_completed_drills') || '{}');
  const today = new Date().toDateString();
  
  drillsContainer.innerHTML = drills.map((drill, i) => {
    const isDone = completedDrills[today + '_' + i] === true;
    return \`<div class="flex items-center gap-3 p-3 bg-midnight rounded-xl border border-white/5 hover:border-white/10 transition-colors">
      <button onclick="toggleDrill(\${i})" id="drill-check-\${i}" class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all \${isDone ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-600 hover:bg-accent-600/20 hover:text-accent-400'}">
        <i class="fas fa-\${isDone ? 'check' : 'circle'} text-xs"></i>
      </button>
      <div class="flex-1">
        <p class="text-\${isDone ? 'gray-500 line-through' : 'gray-200'} text-sm font-medium">\${drill.title}</p>
        <p class="text-gray-600 text-xs">\${drill.category} · \${drill.duration}</p>
      </div>
      <a href="/drills" class="text-accent-400 hover:text-accent-300 text-xs">View →</a>
    </div>\`;
  }).join('');
  
  // Progress bars
  const progressData = { dribbling: isPaid ? 35 : 15, passing: isPaid ? 28 : 10, shooting: isPaid ? 20 : 5, fitness: isPaid ? 40 : 12 };
  setTimeout(() => {
    Object.entries(progressData).forEach(([key, pct]) => {
      const bar = document.getElementById('prog-' + key + '-bar');
      const pctEl = document.getElementById('prog-' + key + '-pct');
      if (bar) bar.style.width = pct + '%';
      if (pctEl) pctEl.textContent = pct + '%';
    });
  }, 300);
  
  // Streak calendar
  const now = new Date();
  const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1; // Mon=0
  for (let i = 0; i <= dayOfWeek; i++) {
    const el = document.getElementById('streak-day-' + i);
    if (el) {
      if (i === dayOfWeek) {
        el.className = 'w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center text-xs text-white';
        el.innerHTML = '<i class="fas fa-fire text-[10px]"></i>';
      } else if (i < dayOfWeek && Math.random() > 0.4) {
        el.className = 'w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs text-green-400';
        el.innerHTML = '<i class="fas fa-check text-[10px]"></i>';
      } else {
        el.className = 'w-8 h-8 rounded-lg bg-midnight border border-white/5 flex items-center justify-center text-xs text-gray-600';
        el.innerHTML = '<i class="fas fa-times text-[10px]"></i>';
      }
    }
  }
  
  // Update program card based on plan
  if (user.plan === 'pro' || user.plan === 'elite') {
    document.getElementById('current-program-card').innerHTML = \`
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">⚡</div>
        <div class="flex-1">
          <h4 class="text-white font-semibold text-sm mb-1">Skill Accelerator</h4>
          <p class="text-gray-500 text-xs mb-3">Week 1 of 10 · Session 1 of 30</p>
          <div class="h-1.5 bg-surface rounded-full overflow-hidden mb-1">
            <div class="h-full bg-purple-600 rounded-full" style="width:3%"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-600 mt-1"><span>3% complete</span><span>1/30 sessions</span></div>
        </div>
      </div>\`;
  }
  if (user.plan === 'elite') {
    document.getElementById('current-program-card').innerHTML = \`
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🏆</div>
        <div class="flex-1">
          <h4 class="text-white font-semibold text-sm mb-1">Elite Performance</h4>
          <p class="text-gray-500 text-xs mb-3">Week 1 of 12 · Session 1 of 48</p>
          <div class="h-1.5 bg-surface rounded-full overflow-hidden mb-1">
            <div class="h-full bg-yellow-600 rounded-full" style="width:2%"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-600 mt-1"><span>2% complete</span><span>1/48 sessions</span></div>
        </div>
      </div>\`;
  }
}

function toggleDrill(index) {
  const today = new Date().toDateString();
  const key = today + '_' + index;
  const completed = JSON.parse(localStorage.getItem('kicklab_completed_drills') || '{}');
  
  completed[key] = !completed[key];
  localStorage.setItem('kicklab_completed_drills', JSON.stringify(completed));
  
  const btn = document.getElementById('drill-check-' + index);
  const isDone = completed[key];
  
  if (isDone) {
    btn.className = 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all bg-green-500 text-white';
    btn.innerHTML = '<i class="fas fa-check text-xs"></i>';
    btn.closest('.flex').querySelector('p').classList.add('line-through', 'text-gray-500');
    btn.closest('.flex').querySelector('p').classList.remove('text-gray-200');
    
    // Update user stats
    const user = JSON.parse(localStorage.getItem('kicklab_user') || '{}');
    user.sessionsCompleted = (user.sessionsCompleted || 0) + 1;
    localStorage.setItem('kicklab_user', JSON.stringify(user));
    
    // Show celebration toast
    showToast('🎉 Drill completed!', 'green');
  } else {
    btn.className = 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all bg-white/5 text-gray-600 hover:bg-accent-600/20 hover:text-accent-400';
    btn.innerHTML = '<i class="fas fa-circle text-xs"></i>';
    btn.closest('.flex').querySelector('p').classList.remove('line-through', 'text-gray-500');
    btn.closest('.flex').querySelector('p').classList.add('text-gray-200');
  }
}

function showToast(message, color = 'accent') {
  const toast = document.createElement('div');
  const colors = { green: 'bg-green-500/20 border-green-500/30 text-green-300', accent: 'bg-accent-600/20 border-accent-600/30 text-accent-300' };
  toast.className = 'fixed top-20 right-4 border text-sm px-4 py-3 rounded-xl z-[200] flex items-center gap-2 ' + (colors[color] || colors.accent);
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

document.addEventListener('DOMContentLoaded', initDashboard);
</script>
`
  });
}
