import { pageShell } from '../lib/html';

export function programsPage() {
  return pageShell({
    title: 'Training Programs — Kicklab',
    activePath: '/programs',
    body: `
<section class="py-16 bg-midnight min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center mb-16">
      <div class="text-accent-400 text-sm font-semibold uppercase tracking-wider mb-3">Training Programs</div>
      <h1 class="font-oswald text-5xl font-bold text-white mb-4">YOUR PATH TO<br/><span class="gradient-text">ELITE PERFORMANCE.</span></h1>
      <p class="text-gray-400 max-w-2xl mx-auto">Three structured programs designed by professional coaches. Choose your level, follow the plan, and see measurable improvement every week.</p>
    </div>

    <!-- How it works -->
    <div class="bg-panel border border-white/10 rounded-2xl p-8 mb-16">
      <h2 class="font-oswald text-2xl font-bold text-white mb-6 text-center">HOW IT WORKS</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        ${[
          { step: '01', icon: 'fas fa-user-check', title: 'Choose Your Level', desc: 'Select the program that matches your current skill level and goals.' },
          { step: '02', icon: 'fas fa-calendar-alt', title: 'Follow the Schedule', desc: 'Each program gives you daily and weekly training sessions to follow.' },
          { step: '03', icon: 'fas fa-dumbbell', title: 'Complete Drills', desc: 'Work through structured drills with video tutorials and step-by-step guides.' },
          { step: '04', icon: 'fas fa-chart-line', title: 'Track Progress', desc: 'Log sessions, track your streak, and monitor improvement over time.' },
        ].map(s => `
          <div class="text-center relative">
            <div class="w-12 h-12 bg-accent-600/20 border border-accent-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i class="${s.icon} text-accent-400"></i>
            </div>
            <div class="text-gray-700 text-xs font-bold mb-1">STEP ${s.step}</div>
            <h3 class="text-white font-semibold text-sm mb-2">${s.title}</h3>
            <p class="text-gray-500 text-xs leading-relaxed">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Foundation Builder -->
    <div class="mb-12" id="foundation">
      <div class="bg-panel border border-white/10 rounded-2xl overflow-hidden">
        <div class="h-3 w-full" style="background:linear-gradient(90deg,#1e3a8a,#2563eb)"></div>
        <div class="p-8">
          <div class="flex flex-col lg:flex-row gap-10">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="bg-accent-600/20 text-accent-400 border border-accent-600/30 text-xs font-bold px-3 py-1 rounded-full">🌱 BEGINNER</span>
                <span class="text-gray-600 text-xs">Included in Starter & above</span>
              </div>
              <h2 class="font-oswald text-4xl font-bold text-white mb-2">Foundation Builder</h2>
              <p class="text-accent-400 text-sm font-medium mb-4">Master the fundamentals of soccer</p>
              <p class="text-gray-400 leading-relaxed mb-6">Build a solid technical foundation with structured drills covering ball control, basic passing, positioning, first touch, and simple shooting. Designed for players aged 8–14 or anyone new to the sport.</p>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                ${[['📅', '8 Weeks', 'Duration'], ['🎯', '24 Sessions', 'Total Sessions'], ['⏰', '3x per week', 'Frequency'], ['⚽', '48 Drills', 'Content']].map(([icon, val, label]) =>
                  `<div class="bg-midnight rounded-xl p-3 text-center"><div class="text-xl mb-1">${icon}</div><div class="text-white text-sm font-bold">${val}</div><div class="text-gray-600 text-xs">${label}</div></div>`
                ).join('')}
              </div>

              <div class="mb-6">
                <h4 class="text-white font-semibold text-sm mb-3">Key Skills</h4>
                <div class="flex flex-wrap gap-2">
                  ${['Ball Control', 'Basic Passing', 'Dribbling Fundamentals', 'Positioning & Movement', 'First Touch', 'Simple Shooting'].map(s =>
                    `<span class="bg-accent-600/10 text-accent-300 border border-accent-600/20 text-xs px-2.5 py-1 rounded-full">${s}</span>`
                  ).join('')}
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-white font-semibold text-sm mb-3">Equipment Needed</h4>
                <div class="flex flex-wrap gap-2">
                  ${['Size 4 Soccer Ball', '6 Cones', 'Open Space (10x10 min)'].map(e =>
                    `<span class="bg-panel border border-white/10 text-gray-300 text-xs px-2.5 py-1 rounded-full"><i class="fas fa-check text-green-400 mr-1 text-[10px]"></i>${e}</span>`
                  ).join('')}
                </div>
              </div>

              <div class="flex gap-3">
                <a href="/pricing" class="bg-accent-600 hover:bg-accent-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                  <i class="fas fa-star"></i> Start Starter Plan
                </a>
                <a href="/drills" class="border border-white/20 text-gray-300 hover:text-white hover:border-white/40 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                  Browse Drills
                </a>
              </div>
            </div>

            <div class="lg:w-80 flex-shrink-0">
              <div class="bg-midnight rounded-2xl p-5 border border-white/5">
                <h4 class="font-oswald text-lg font-bold text-white mb-4">8-WEEK OUTLINE</h4>
                <div class="space-y-2">
                  ${[
                    ['Week 1–2', 'Ball Familiarisation & Juggling', 'complete'],
                    ['Week 3–4', 'Cone Dribbling & Ball Mastery', 'active'],
                    ['Week 5–6', 'Basic Passing & Receiving', 'locked'],
                    ['Week 7', 'Positioning & Movement', 'locked'],
                    ['Week 8', 'Shooting & Final Challenge', 'locked'],
                  ].map(([week, topic, state]) => `
                    <div class="flex items-center gap-3 p-2.5 rounded-lg ${state === 'complete' ? 'bg-green-500/5' : state === 'active' ? 'bg-accent-600/10' : 'opacity-40'}">
                      <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${state === 'complete' ? 'bg-green-500' : state === 'active' ? 'bg-accent-600' : 'bg-gray-700'}">
                        ${state === 'complete' ? '<i class="fas fa-check text-white"></i>' : state === 'active' ? '<i class="fas fa-play text-white" style="font-size:8px;margin-left:1px"></i>' : '<i class="fas fa-lock text-gray-500"></i>'}
                      </div>
                      <div>
                        <div class="text-${state === 'complete' ? 'green-400' : state === 'active' ? 'accent-400' : 'gray-600'} text-[10px] font-bold">${week}</div>
                        <div class="text-${state === 'locked' ? 'gray-600' : 'gray-300'} text-xs">${topic}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill Accelerator -->
    <div class="mb-12" id="accelerator">
      <div class="bg-panel border border-white/10 rounded-2xl overflow-hidden">
        <div class="h-3 w-full" style="background:linear-gradient(90deg,#4c1d95,#7c3aed)"></div>
        <div class="p-8">
          <div class="flex flex-col lg:flex-row gap-10">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="bg-purple-600/20 text-purple-400 border border-purple-600/30 text-xs font-bold px-3 py-1 rounded-full">⚡ INTERMEDIATE</span>
                <span class="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">MOST POPULAR</span>
                <span class="text-gray-600 text-xs">Included in Pro & above</span>
              </div>
              <h2 class="font-oswald text-4xl font-bold text-white mb-2">Skill Accelerator</h2>
              <p class="text-purple-400 text-sm font-medium mb-4">Take your game to the next level</p>
              <p class="text-gray-400 leading-relaxed mb-6">Advance your technical and tactical abilities with challenging drills focusing on advanced passing, shooting accuracy, tactical awareness, 1v1 situations, and combination play. For players with 1–3 years of experience.</p>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                ${[['📅', '10 Weeks', 'Duration'], ['🎯', '30 Sessions', 'Total Sessions'], ['⏰', '3x per week', 'Frequency'], ['⚽', '64 Drills', 'Content']].map(([icon, val, label]) =>
                  `<div class="bg-midnight rounded-xl p-3 text-center"><div class="text-xl mb-1">${icon}</div><div class="text-white text-sm font-bold">${val}</div><div class="text-gray-600 text-xs">${label}</div></div>`
                ).join('')}
              </div>

              <div class="mb-6">
                <h4 class="text-white font-semibold text-sm mb-3">Key Skills</h4>
                <div class="flex flex-wrap gap-2">
                  ${['Advanced Passing', 'Shooting Accuracy', 'Tactical Awareness', '1v1 Attacking', '1v1 Defending', 'Combination Play'].map(s =>
                    `<span class="bg-purple-600/10 text-purple-300 border border-purple-600/20 text-xs px-2.5 py-1 rounded-full">${s}</span>`
                  ).join('')}
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-white font-semibold text-sm mb-3">Equipment Needed</h4>
                <div class="flex flex-wrap gap-2">
                  ${['Size 5 Soccer Ball', '10 Cones', 'Agility Ladder', 'Goal (or Target Boards)'].map(e =>
                    `<span class="bg-panel border border-white/10 text-gray-300 text-xs px-2.5 py-1 rounded-full"><i class="fas fa-check text-green-400 mr-1 text-[10px]"></i>${e}</span>`
                  ).join('')}
                </div>
              </div>

              <div class="flex gap-3">
                <a href="/pricing" class="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                  <i class="fas fa-star"></i> Start Pro Plan
                </a>
                <a href="/drills" class="border border-white/20 text-gray-300 hover:text-white hover:border-white/40 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                  Browse Drills
                </a>
              </div>
            </div>

            <div class="lg:w-80 flex-shrink-0">
              <div class="bg-midnight rounded-2xl p-5 border border-white/5">
                <h4 class="font-oswald text-lg font-bold text-white mb-4">10-WEEK OUTLINE</h4>
                <div class="space-y-2">
                  ${[
                    ['Week 1–2', 'Advanced Ball Mastery'],
                    ['Week 3–4', 'Passing Combinations & Wall Work'],
                    ['Week 5–6', 'Shooting Technique & Power'],
                    ['Week 7–8', '1v1 Situations & Decisions'],
                    ['Week 9', 'Tactical Positioning & Shape'],
                    ['Week 10', 'Full Skill Assessment'],
                  ].map(([week, topic]) => `
                    <div class="flex items-center gap-3 p-2.5 rounded-lg opacity-60">
                      <div class="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0"><i class="fas fa-lock text-gray-500" style="font-size:8px"></i></div>
                      <div>
                        <div class="text-gray-600 text-[10px] font-bold">${week}</div>
                        <div class="text-gray-500 text-xs">${topic}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
                <div class="mt-4 pt-4 border-t border-white/5 text-center">
                  <a href="/pricing" class="text-purple-400 text-xs font-semibold hover:text-purple-300">Unlock with Pro →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Elite Performance -->
    <div class="mb-16" id="elite">
      <div class="bg-panel border border-yellow-600/30 rounded-2xl overflow-hidden" style="background:linear-gradient(135deg,#1a2235 0%,#1c1a0f 100%)">
        <div class="h-3 w-full" style="background:linear-gradient(90deg,#78350f,#d97706,#fbbf24)"></div>
        <div class="p-8">
          <div class="flex flex-col lg:flex-row gap-10">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-4">
                <span class="bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 text-xs font-bold px-3 py-1 rounded-full">🏆 ADVANCED</span>
                <span class="bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 text-xs px-2 py-0.5 rounded-full">NEW 2026</span>
                <span class="text-gray-600 text-xs">Included in Elite plan only</span>
              </div>
              <h2 class="font-oswald text-4xl font-bold text-white mb-2">Elite Performance</h2>
              <p class="text-yellow-400 text-sm font-medium mb-4">Professional-level training for serious players</p>
              <p class="text-gray-400 leading-relaxed mb-6">The most comprehensive soccer training program available. Focuses on set pieces, high-intensity pressing, complex combination play, mental performance, and elite conditioning. Designed for serious players who want to perform at the highest level.</p>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                ${[['📅', '12 Weeks', 'Duration'], ['🎯', '48 Sessions', 'Total Sessions'], ['⏰', '4x per week', 'Frequency'], ['⚽', '80 Drills', 'Content']].map(([icon, val, label]) =>
                  `<div class="bg-midnight rounded-xl p-3 text-center"><div class="text-xl mb-1">${icon}</div><div class="text-white text-sm font-bold">${val}</div><div class="text-gray-600 text-xs">${label}</div></div>`
                ).join('')}
              </div>

              <div class="mb-6">
                <h4 class="text-white font-semibold text-sm mb-3">Key Skills</h4>
                <div class="flex flex-wrap gap-2">
                  ${['Set Pieces', 'High-Intensity Pressing', 'Complex Combination Play', 'Mental Fortitude', 'Elite Conditioning', 'Game Intelligence'].map(s =>
                    `<span class="bg-yellow-600/10 text-yellow-300 border border-yellow-600/20 text-xs px-2.5 py-1 rounded-full">${s}</span>`
                  ).join('')}
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-white font-semibold text-sm mb-3">Equipment Needed</h4>
                <div class="flex flex-wrap gap-2">
                  ${['Size 5 Soccer Ball', '20+ Cones', 'Agility Ladder', 'Resistance Bands', 'Goal', 'Video Recording Device'].map(e =>
                    `<span class="bg-panel border border-white/10 text-gray-300 text-xs px-2.5 py-1 rounded-full"><i class="fas fa-check text-green-400 mr-1 text-[10px]"></i>${e}</span>`
                  ).join('')}
                </div>
              </div>

              <div class="flex gap-3">
                <a href="/pricing" class="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                  <i class="fas fa-trophy"></i> Start Elite Plan
                </a>
                <a href="/products?tier=Elite" class="border border-yellow-600/30 text-yellow-400 hover:bg-yellow-600/10 font-semibold px-6 py-3 rounded-xl transition-all text-sm">
                  Get Gear
                </a>
              </div>
            </div>

            <div class="lg:w-80 flex-shrink-0">
              <div class="bg-midnight rounded-2xl p-5 border border-white/5">
                <h4 class="font-oswald text-lg font-bold text-white mb-4">12-WEEK OUTLINE</h4>
                <div class="space-y-1.5">
                  ${[
                    'Weeks 1–2: Advanced Ball Mastery',
                    'Weeks 3–4: Complex Passing Patterns',
                    'Weeks 5–6: Elite Shooting & Finishing',
                    'Weeks 7–8: High Press & Defensive Shape',
                    'Weeks 9–10: Set Pieces & Transitions',
                    'Week 11: Mental Performance Module',
                    'Week 12: Full Elite Assessment',
                  ].map(w => `
                    <div class="flex items-center gap-2 p-2 rounded-lg opacity-50">
                      <i class="fas fa-lock text-gray-600 text-[10px] flex-shrink-0"></i>
                      <span class="text-gray-500 text-xs">${w}</span>
                    </div>
                  `).join('')}
                </div>
                <div class="mt-4 pt-4 border-t border-white/5 text-center">
                  <a href="/pricing" class="text-yellow-400 text-xs font-semibold hover:text-yellow-300">Unlock with Elite →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison -->
    <div class="text-center">
      <h2 class="font-oswald text-3xl font-bold text-white mb-8">CHOOSE YOUR PROGRAM</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${[
          { name: 'Foundation Builder', plan: 'Starter', price: '$9.99/mo', color: 'accent-600', weeks: '8 wks', sessions: '24', drills: '48', icon: '🌱' },
          { name: 'Skill Accelerator', plan: 'Pro', price: '$19.99/mo', color: 'purple-600', weeks: '10 wks', sessions: '30', drills: '64', icon: '⚡' },
          { name: 'Elite Performance', plan: 'Elite', price: '$34.99/mo', color: 'yellow-600', weeks: '12 wks', sessions: '48', drills: '80', icon: '🏆' },
        ].map(p => `
          <div class="bg-panel border border-white/10 rounded-2xl p-6 text-center card-hover">
            <div class="text-3xl mb-3">${p.icon}</div>
            <h3 class="font-oswald text-xl font-bold text-white mb-1">${p.name}</h3>
            <p class="text-gray-500 text-xs mb-4">Requires ${p.plan} plan or above</p>
            <div class="space-y-2 mb-5 text-sm">
              <div class="flex justify-between text-gray-400"><span>Duration</span><span class="text-white">${p.weeks}</span></div>
              <div class="flex justify-between text-gray-400"><span>Sessions</span><span class="text-white">${p.sessions}</span></div>
              <div class="flex justify-between text-gray-400"><span>Drills</span><span class="text-white">${p.drills}</span></div>
            </div>
            <a href="/pricing" class="block w-full bg-${p.color}/20 hover:bg-${p.color}/30 text-${p.color === 'yellow-600' ? 'yellow-400' : p.color === 'purple-600' ? 'purple-400' : 'accent-400'} font-semibold py-2.5 rounded-xl transition-all text-sm border border-${p.color}/20">
              Start for ${p.price}
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>
`
  });
}
