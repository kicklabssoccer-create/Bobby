export function adminLoginPage(error?: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Login — Kicklab</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { inter: ['Inter','sans-serif'] },
          colors: {
            accent: { 400:'#60a5fa', 500:'#3b82f6', 600:'#2563eb', 700:'#1d4ed8' }
          }
        }
      }
    }
  </script>
  <style>
    * { font-family: 'Inter', sans-serif; }
    body { background: #080e1a; }
    .grid-bg {
      background-image:
        repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(255,255,255,0.02) 60px,rgba(255,255,255,0.02) 61px),
        repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(255,255,255,0.02) 60px,rgba(255,255,255,0.02) 61px);
    }
    input:focus { border-color:#2563eb!important; box-shadow:0 0 0 3px rgba(37,99,235,0.15)!important; outline:none; }
    .shake { animation: shake 0.4s ease; }
    @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
  </style>
</head>
<body class="min-h-screen bg-[#080e1a] text-white flex items-center justify-center relative overflow-hidden">

  <!-- Background decoration -->
  <div class="absolute inset-0 grid-bg opacity-100"></div>
  <div class="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-600/5 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute top-0 right-0 w-64 h-64 bg-accent-700/5 rounded-full blur-3xl pointer-events-none"></div>

  <div class="relative z-10 w-full max-w-sm mx-4">

    <!-- Lock icon + branding -->
    <div class="text-center mb-8">
      <div class="relative inline-block">
        <div class="w-16 h-16 bg-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-accent-600/40">
          <i class="fas fa-shield-alt text-white text-2xl"></i>
        </div>
        <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#080e1a]">
          <i class="fas fa-lock text-white text-[8px]"></i>
        </div>
      </div>
      <h1 class="text-2xl font-bold text-white mt-2">Admin Access</h1>
      <p class="text-slate-500 text-sm mt-1">Kicklab Backend Management</p>
    </div>

    <!-- Card -->
    <div class="bg-[#1e293b] border border-white/8 rounded-2xl p-7 shadow-2xl" id="login-card">

      ${error ? `
      <div class="bg-red-500/10 border border-red-500/25 rounded-xl p-3 mb-5 flex items-center gap-2.5">
        <i class="fas fa-exclamation-circle text-red-400 flex-shrink-0"></i>
        <span class="text-red-300 text-sm">${error}</span>
      </div>
      ` : ''}

      <form method="POST" action="/admin/login" id="admin-login-form">
        <div class="space-y-4 mb-6">
          <!-- Email -->
          <div>
            <label class="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Email</label>
            <div class="relative">
              <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <i class="fas fa-envelope text-sm"></i>
              </div>
              <input
                type="email"
                name="username"
                id="username"
                placeholder="admin@kicklab.io"
                autocomplete="email"
                required
                class="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Password</label>
            <div class="relative">
              <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <i class="fas fa-lock text-sm"></i>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••••"
                autocomplete="current-password"
                required
                class="w-full bg-[#0f172a] border border-white/10 rounded-xl pl-10 pr-11 py-3 text-white text-sm placeholder-slate-600 transition-all"
              />
              <button type="button" onclick="togglePwd()" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                <i id="eye-icon" class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Remember -->
        <label class="flex items-center gap-2 mb-5 cursor-pointer">
          <input type="checkbox" name="remember" class="w-4 h-4 rounded accent-blue-600 bg-[#0f172a] border-white/20">
          <span class="text-slate-400 text-sm">Keep me signed in for 24 hours</span>
        </label>

        <button type="submit" id="login-btn"
          class="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-accent-600/25">
          <i class="fas fa-sign-in-alt"></i>
          Sign In to Admin
        </button>
      </form>

      <!-- Security note -->
      <div class="mt-5 pt-5 border-t border-white/5 flex items-center gap-2 text-slate-600 text-xs">
        <i class="fas fa-info-circle flex-shrink-0"></i>
        <span>This is a restricted area. All access attempts are logged.</span>
      </div>
    </div>

    <!-- Back to site -->
    <div class="text-center mt-5">
      <a href="/" class="text-slate-600 hover:text-slate-400 text-sm transition-colors flex items-center justify-center gap-1.5">
        <i class="fas fa-arrow-left text-xs"></i> Back to Kicklab
      </a>
    </div>
  </div>

  <script>
  function togglePwd() {
    const inp = document.getElementById('password');
    const icon = document.getElementById('eye-icon');
    if (inp.type === 'password') { inp.type='text'; icon.className='fas fa-eye-slash text-sm'; }
    else { inp.type='password'; icon.className='fas fa-eye text-sm'; }
  }
  document.getElementById('admin-login-form').addEventListener('submit', function(e) {
    const btn = document.getElementById('login-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
    btn.disabled = true;
  });
  ${error ? `document.getElementById('login-card').classList.add('shake');` : ''}
  </script>
</body>
</html>`
}
