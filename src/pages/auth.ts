import { pageShell } from '../lib/html';

export function loginPage() {
  return pageShell({
    title: 'Sign In — Kicklab',
    activePath: '/auth/login',
    body: `
<section class="min-h-[calc(100vh-64px)] flex items-center justify-center py-16 bg-midnight relative">
  <div class="absolute inset-0 opacity-5 hero-grid-bg"></div>
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl pointer-events-none"></div>

  <div class="relative z-10 w-full max-w-md mx-4">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="w-14 h-14 bg-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl">⚽</span>
      </div>
      <h1 class="font-oswald text-3xl font-bold text-white">Welcome Back</h1>
      <p class="text-gray-500 text-sm mt-1">Sign in to your Kicklab account</p>
    </div>

    <div class="bg-panel border border-white/10 rounded-2xl p-8">
      <!-- Error alert -->
      <div id="login-error" class="hidden bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-5 flex items-center gap-2">
        <i class="fas fa-exclamation-circle text-red-400 text-sm flex-shrink-0"></i>
        <span id="login-error-msg" class="text-red-300 text-sm"></span>
      </div>

      <form id="login-form" onsubmit="handleLogin(event)" novalidate>
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-1.5">Email Address</label>
            <input type="email" id="login-email" placeholder="you@example.com" required
              class="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 transition-colors">
          </div>
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
            <div class="relative">
              <input type="password" id="login-password" placeholder="Enter your password" required
                class="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-gray-600 transition-colors">
              <button type="button" onclick="togglePassword('login-password', this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                <i class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mb-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="remember-me" class="w-4 h-4 rounded border-white/20 bg-midnight accent-blue-600">
            <span class="text-gray-400 text-sm">Remember me</span>
          </label>
          <a href="#" onclick="showForgotPassword()" class="text-accent-400 hover:text-accent-300 text-sm font-medium">Forgot password?</a>
        </div>

        <button type="submit" id="login-btn" class="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
          <i class="fas fa-sign-in-alt"></i> Sign In
        </button>
      </form>

      <div class="mt-6 pt-6 border-t border-white/5 text-center">
        <p class="text-gray-500 text-sm">Don't have an account?
          <a href="/auth/signup" class="text-accent-400 hover:text-accent-300 font-semibold ml-1">Create one free</a>
        </p>
      </div>
    </div>

    <!-- Social proof -->
    <div class="mt-6 text-center">
      <div class="flex items-center justify-center gap-2 mb-2">
        <div class="flex -space-x-1.5">
          ${['🧑','👩','🧔'].map(e => `<div class="w-6 h-6 rounded-full bg-accent-600 flex items-center justify-center text-xs border border-midnight">${e}</div>`).join('')}
        </div>
        <span class="text-yellow-400 text-xs">★★★★★</span>
      </div>
      <p class="text-gray-600 text-xs">Joined by 50,000+ players worldwide</p>
    </div>
  </div>
</section>

<!-- Forgot Password Modal -->
<div id="forgot-modal" class="fixed inset-0 z-[100] modal-overlay items-center justify-center" style="display:none">
  <div class="bg-surface border border-white/10 rounded-2xl w-full max-w-sm mx-4 p-8 text-center">
    <i class="fas fa-envelope text-accent-400 text-3xl mb-4"></i>
    <h3 class="font-oswald text-2xl font-bold text-white mb-2">Reset Password</h3>
    <p class="text-gray-400 text-sm mb-5">Enter your email and we'll send you a reset link.</p>
    <input type="email" id="forgot-email" placeholder="your@email.com" class="w-full bg-panel border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 mb-4">
    <button onclick="sendResetEmail()" class="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3 rounded-xl transition-all text-sm mb-3">Send Reset Link</button>
    <button onclick="closeForgot()" class="w-full text-gray-500 hover:text-white text-sm py-2 transition-colors">Cancel</button>
  </div>
</div>

<script>
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const btn = document.getElementById('login-btn');
  
  if (!email || !email.includes('@')) {
    showLoginError('Please enter a valid email address.');
    return;
  }
  if (!password) {
    showLoginError('Please enter your password.');
    return;
  }
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  btn.disabled = true;
  
  setTimeout(() => {
    // Check if user exists in localStorage
    const stored = localStorage.getItem('kicklab_user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === email) {
        window.location.href = '/dashboard';
        return;
      }
    }
    // Create a new session for demo purposes
    const user = { email, name: email.split('@')[0], plan: 'free', joined: new Date().toISOString(), streak: 0, sessionsCompleted: 0 };
    localStorage.setItem('kicklab_user', JSON.stringify(user));
    window.location.href = '/dashboard';
  }, 1200);
}

function showLoginError(msg) {
  document.getElementById('login-error-msg').textContent = msg;
  document.getElementById('login-error').classList.remove('hidden');
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash text-sm';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye text-sm';
  }
}

function showForgotPassword() {
  document.getElementById('forgot-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeForgot() {
  document.getElementById('forgot-modal').style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('forgot-modal').classList.remove('flex');
}

function sendResetEmail() {
  const email = document.getElementById('forgot-email').value.trim();
  if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return; }
  closeForgot();
  // Show success toast
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 right-4 bg-green-500/20 border border-green-500/30 text-green-300 text-sm px-4 py-3 rounded-xl z-[200] flex items-center gap-2';
  toast.innerHTML = '<i class="fas fa-check-circle"></i> Reset link sent to ' + email;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Auto-redirect if already logged in
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
  if (user) window.location.href = '/dashboard';
});
</script>
`
  });
}

export function signupPage() {
  return pageShell({
    title: 'Create Account — Kicklab',
    activePath: '/auth/signup',
    body: `
<section class="min-h-[calc(100vh-64px)] flex items-center justify-center py-16 bg-midnight relative">
  <div class="absolute inset-0 opacity-5 hero-grid-bg"></div>
  <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl pointer-events-none"></div>

  <div class="relative z-10 w-full max-w-md mx-4">
    <div class="text-center mb-8">
      <div class="w-14 h-14 bg-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl">⚽</span>
      </div>
      <h1 class="font-oswald text-3xl font-bold text-white">CREATE YOUR ACCOUNT</h1>
      <p class="text-gray-500 text-sm mt-1">Join 50,000+ players already training smarter</p>
    </div>

    <div class="bg-panel border border-white/10 rounded-2xl p-8">
      <div id="signup-error" class="hidden bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-5 flex items-center gap-2">
        <i class="fas fa-exclamation-circle text-red-400 text-sm flex-shrink-0"></i>
        <span id="signup-error-msg" class="text-red-300 text-sm"></span>
      </div>

      <form id="signup-form" onsubmit="handleSignup(event)" novalidate>
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-1.5">Full Name</label>
            <input type="text" id="signup-name" placeholder="Your full name" required
              class="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 transition-colors">
          </div>
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-1.5">Email Address</label>
            <input type="email" id="signup-email" placeholder="you@example.com" required
              class="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 transition-colors">
          </div>
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
            <div class="relative">
              <input type="password" id="signup-password" placeholder="Minimum 8 characters" required
                class="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-gray-600 transition-colors">
              <button type="button" onclick="togglePwd('signup-password', this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                <i class="fas fa-eye text-sm"></i>
              </button>
            </div>
          </div>
          <div>
            <label class="block text-gray-400 text-sm font-medium mb-1.5">Skill Level</label>
            <select id="signup-level" class="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-white text-sm appearance-none cursor-pointer">
              <option value="beginner">🌱 Beginner (just starting out)</option>
              <option value="intermediate">⚡ Intermediate (1–3 years playing)</option>
              <option value="advanced">🏆 Advanced (competitive player)</option>
            </select>
          </div>
        </div>

        <button type="submit" id="signup-btn" class="w-full bg-accent-600 hover:bg-accent-500 text-white font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
          <i class="fas fa-user-plus"></i> Create Free Account
        </button>
      </form>

      <div class="mt-6 pt-6 border-t border-white/5">
        <p class="text-gray-600 text-xs text-center mb-4">or sign up and start training immediately</p>
        <div class="flex gap-3">
          <a href="/pricing" class="flex-1 text-center border border-accent-600/40 text-accent-400 hover:bg-accent-600/10 font-semibold py-2.5 rounded-xl transition-all text-xs">⚡ Pro — $19.99/mo</a>
          <a href="/pricing" class="flex-1 text-center border border-yellow-600/40 text-yellow-400 hover:bg-yellow-600/10 font-semibold py-2.5 rounded-xl transition-all text-xs">🏆 Elite — $34.99/mo</a>
        </div>
      </div>

      <div class="mt-4 text-center">
        <p class="text-gray-500 text-sm">Already have an account?
          <a href="/auth/login" class="text-accent-400 hover:text-accent-300 font-semibold ml-1">Sign in</a>
        </p>
      </div>

      <p class="text-gray-700 text-xs text-center mt-4">By signing up you agree to our <a href="#" class="text-gray-500 hover:text-gray-300">Terms</a> and <a href="#" class="text-gray-500 hover:text-gray-300">Privacy Policy</a>.</p>
    </div>
  </div>
</section>

<script>
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const level = document.getElementById('signup-level').value;
  const btn = document.getElementById('signup-btn');

  if (!name) { showSignupError('Please enter your full name.'); return; }
  if (!email || !email.includes('@')) { showSignupError('Please enter a valid email address.'); return; }
  if (!password || password.length < 8) { showSignupError('Password must be at least 8 characters.'); return; }

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
  btn.disabled = true;

  setTimeout(() => {
    const user = { name, email, plan: 'free', level, joined: new Date().toISOString(), streak: 0, sessionsCompleted: 0, lastSession: null };
    localStorage.setItem('kicklab_user', JSON.stringify(user));
    window.location.href = '/dashboard';
  }, 1200);
}

function showSignupError(msg) {
  document.getElementById('signup-error-msg').textContent = msg;
  document.getElementById('signup-error').classList.remove('hidden');
}

function togglePwd(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash text-sm';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye text-sm';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('kicklab_user') || 'null');
  if (user) window.location.href = '/dashboard';
});
</script>
`
  });
}
