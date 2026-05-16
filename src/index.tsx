import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { cors } from 'hono/cors'
import { VIDEO_MAP, queryKey } from './data/videoMap'
import {
  hashPassword, verifyPassword,
  getUser, saveUser, getAllUsers,
  savePayment, getPayment, getAllPayments,
  createSession, getSessionEmail, deleteSession,
  computeStats,
  type KickUser, type KickPayment,
} from './lib/kv'

type Bindings = { KICKLAB_KV: KVNamespace }

// Public pages
import { homePage } from './pages/home'
import { pricingPage } from './pages/pricing'
import { drillsPage } from './pages/drills'
import { videosPage } from './pages/videos'
import { programsPage } from './pages/programs'
import { productsPage } from './pages/products'
import { loginPage, signupPage } from './pages/auth'
import { dashboardPage } from './pages/dashboard'

// Admin
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  SESSION_COOKIE,
  createSessionToken,
  validateSessionToken,
} from './admin/auth'
import { adminLoginPage } from './admin/pages/login'
import { adminDashboardPage } from './admin/pages/dashboard'
import { adminUsersPage } from './admin/pages/users'
import { adminDrillsPage } from './admin/pages/drills'
import { adminVideosPage } from './admin/pages/videos'
import { adminProductsPage } from './admin/pages/products'
import { adminPlansPage } from './admin/pages/plans'
import { adminSettingsPage } from './admin/pages/settings'
import { adminPaymentsPage } from './admin/pages/payments'

const app = new Hono<{ Bindings: Bindings }>()

// ─── STATIC FILES ────────────────────────────────────────────────
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ root: './', path: '/public/favicon.svg' }))
app.use('/manifest.json', serveStatic({ root: './', path: '/public/manifest.json' }))

// ─── YOUTUBE TOP VIDEO API ───────────────────────────────────────
// Returns the highest-view YouTube video ID for a given search query.
// First checks our curated VIDEO_MAP (no API key needed).
// If not found, falls back to YouTube Data API v3 (requires YOUTUBE_API_KEY secret).
app.get('/api/youtube-top', async (c) => {
  const q = (c.req.query('q') || '').trim()
  if (!q) return c.json({ error: 'Missing query' }, 400)

  const key = queryKey(q)

  // 1. Check curated map first (instant, no API call)
  if (VIDEO_MAP[key]) {
    const v = VIDEO_MAP[key]
    return c.json({
      videoId: v.id,
      title: v.title,
      channel: v.channel,
      views: v.views,
      source: 'curated',
    })
  }

  // 2. Try YouTube Data API v3 if key is configured
  const ytKey = (c.env as any)?.YOUTUBE_API_KEY
  if (ytKey) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&order=viewCount&maxResults=1&key=${ytKey}`
      const res = await fetch(url)
      const data: any = await res.json()
      if (data?.items?.[0]) {
        const item = data.items[0]
        return c.json({
          videoId: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
          views: '',
          source: 'youtube-api',
        })
      }
    } catch (e) {
      console.error('YouTube API error:', e)
    }
  }

  // 3. No match found
  return c.json({ error: 'No video found', key }, 404)
})

// ─── USER AUTH API ────────────────────────────────────────────────
const USER_SESSION_COOKIE = 'kl_user_session'

app.use('/api/*', cors())

// POST /api/auth/signup
app.post('/api/auth/signup', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  try {
    const body = await c.req.json() as any
    const { name, email, password, gender, age, location, level, phone, venmoHandle } = body
    if (!name || !email || !password) return c.json({ error: 'Name, email and password are required' }, 400)
    if (password.length < 8) return c.json({ error: 'Password must be at least 8 characters' }, 400)
    const existing = await getUser(kv, email)
    if (existing) return c.json({ error: 'An account with that email already exists' }, 409)
    const user: KickUser = {
      id: crypto.randomUUID(),
      email: email.toLowerCase().trim(),
      name: name.trim(),
      passwordHash: await hashPassword(password),
      plan: 'free',
      gender: gender || 'prefer_not',
      age: age || 'prefer_not',
      location: location || '',
      level: level || 'Beginner',
      phone: phone || '',
      venmoHandle: venmoHandle || '',
      joined: new Date().toISOString(),
      streak: 0,
      sessionsCompleted: 0,
    }
    await saveUser(kv, user)
    const token = await createSession(kv, email)
    setCookie(c, USER_SESSION_COOKIE, token, { httpOnly: true, secure: true, sameSite: 'Lax', maxAge: 86400, path: '/' })
    const { passwordHash: _, ...safeUser } = user
    return c.json({ ok: true, user: safeUser })
  } catch (e: any) {
    return c.json({ error: e.message || 'Signup failed' }, 500)
  }
})

// POST /api/auth/login
app.post('/api/auth/login', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  try {
    const body = await c.req.json() as any
    const { email, password } = body
    if (!email || !password) return c.json({ error: 'Email and password required' }, 400)
    const user = await getUser(kv, email)
    if (!user) return c.json({ error: 'No account found with that email' }, 401)
    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) return c.json({ error: 'Incorrect password' }, 401)
    // Update lastLogin
    user.lastLogin = new Date().toISOString()
    await saveUser(kv, user)
    const token = await createSession(kv, email)
    setCookie(c, USER_SESSION_COOKIE, token, { httpOnly: true, secure: true, sameSite: 'Lax', maxAge: 86400, path: '/' })
    const { passwordHash: _, ...safeUser } = user
    return c.json({ ok: true, user: safeUser })
  } catch (e: any) {
    return c.json({ error: e.message || 'Login failed' }, 500)
  }
})

// GET /api/auth/me — returns current logged-in user
app.get('/api/auth/me', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const token = getCookie(c, USER_SESSION_COOKIE)
  if (!token) return c.json({ error: 'Not authenticated' }, 401)
  const email = await getSessionEmail(kv, token)
  if (!email) return c.json({ error: 'Session expired' }, 401)
  const user = await getUser(kv, email)
  if (!user) return c.json({ error: 'User not found' }, 404)
  const { passwordHash: _, ...safeUser } = user
  return c.json({ ok: true, user: safeUser })
})

// POST /api/auth/logout
app.post('/api/auth/logout', async (c) => {
  const kv = c.env.KICKLAB_KV
  const token = getCookie(c, USER_SESSION_COOKIE)
  if (token && kv) await deleteSession(kv, token)
  deleteCookie(c, USER_SESSION_COOKIE, { path: '/' })
  return c.json({ ok: true })
})

// ─── PAYMENT API ──────────────────────────────────────────────────
const PLAN_PRICES: Record<string, { monthly: number; annual: number }> = {
  starter: { monthly: 9,  annual: 7  },
  pro:     { monthly: 19, annual: 15 },
  elite:   { monthly: 29, annual: 23 },
}

// POST /api/payment/initiate — creates a pending payment record
app.post('/api/payment/initiate', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  try {
    const body = await c.req.json() as any
    const { email, name, plan, billing, method, venmoHandle, password, gender, age, location, level } = body
    if (!email || !plan || !method) return c.json({ error: 'Missing required fields' }, 400)
    const prices = PLAN_PRICES[plan]
    if (!prices) return c.json({ error: 'Invalid plan' }, 400)
    const amount = billing === 'annual' ? prices.annual : prices.monthly

    // Create or get user
    let user = await getUser(kv, email)
    if (!user) {
      if (!password) return c.json({ error: 'Password required for new accounts' }, 400)
      user = {
        id: crypto.randomUUID(),
        email: email.toLowerCase().trim(),
        name: name?.trim() || email.split('@')[0],
        passwordHash: await hashPassword(password),
        plan: 'free', // will upgrade on payment confirm
        gender: gender || 'prefer_not',
        age: age || 'prefer_not',
        location: location || '',
        level: level || 'Beginner',
        venmoHandle: venmoHandle || '',
        joined: new Date().toISOString(),
        streak: 0,
        sessionsCompleted: 0,
        paymentStatus: 'pending',
      }
      await saveUser(kv, user)
    }

    const paymentId = crypto.randomUUID()
    const payment: KickPayment = {
      id: paymentId,
      userId: user.id,
      email: user.email,
      name: user.name,
      plan,
      amount: `$${amount}`,
      method,
      venmoHandle: venmoHandle || '',
      status: 'pending',
      billing: billing || 'monthly',
      createdAt: new Date().toISOString(),
      note: body.note || '',
    }
    await savePayment(kv, payment)

    // For Venmo: return deep-link URL
    let venmoUrl = ''
    if (method === 'venmo') {
      const venmoNote = encodeURIComponent(`KickLab ${plan} plan (${billing}) - ${email}`)
      venmoUrl = `venmo://paycharge?txn=pay&recipients=kicklabs-soccer&amount=${amount}&note=${venmoNote}`
    }

    return c.json({ ok: true, paymentId, venmoUrl, amount: `$${amount}`, plan, method })
  } catch (e: any) {
    return c.json({ error: e.message || 'Payment initiation failed' }, 500)
  }
})

// POST /api/payment/confirm-venmo — user submits their Venmo transaction ID
app.post('/api/payment/confirm-venmo', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  try {
    const body = await c.req.json() as any
    const { paymentId, venmoTransactionId, txnId, email } = body
    const txn = txnId || venmoTransactionId || ''
    const payment = await getPayment(kv, paymentId)
    if (!payment) return c.json({ error: 'Payment not found' }, 404)
    // Update payment with submitted transaction ID
    payment.note = txn ? `TXN: ${txn}` : 'TXN: not provided'
    payment.status = 'pending' // stays pending until admin confirms
    await savePayment(kv, payment)
    return c.json({ ok: true, message: 'Payment submitted for admin verification. You will receive email confirmation within 24 hours.' })
  } catch (e: any) {
    return c.json({ error: e.message || 'Confirmation failed' }, 500)
  }
})

// ─── ADMIN DATA API ───────────────────────────────────────────────
// All admin API routes require admin cookie auth

function requireAdminAPI(c: any) {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !validateSessionToken(token)) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  return null
}

// GET /api/admin/stats — dashboard numbers
app.get('/api/admin/stats', async (c) => {
  const authErr = requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const [users, payments] = await Promise.all([getAllUsers(kv), getAllPayments(kv)])
  const stats = computeStats(users, payments)
  return c.json({ ok: true, stats })
})

// GET /api/admin/users — full user list
app.get('/api/admin/users', async (c) => {
  const authErr = requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const users = await getAllUsers(kv)
  const safe = users.map(({ passwordHash: _, ...u }) => u)
  return c.json({ ok: true, users: safe, total: safe.length })
})

// GET /api/admin/payments — all payments with status
app.get('/api/admin/payments', async (c) => {
  const authErr = requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const payments = await getAllPayments(kv)
  return c.json({ ok: true, payments, total: payments.length })
})

// POST /api/admin/payment/approve — admin approves a Venmo payment
app.post('/api/admin/payment/approve', async (c) => {
  const authErr = requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const { paymentId } = await c.req.json() as any
  const payment = await getPayment(kv, paymentId)
  if (!payment) return c.json({ error: 'Payment not found' }, 404)
  payment.status = 'confirmed'
  payment.confirmedAt = new Date().toISOString()
  await savePayment(kv, payment)
  // Upgrade user plan
  const user = await getUser(kv, payment.email)
  if (user) {
    user.plan = payment.plan as any
    user.paymentStatus = 'confirmed'
    user.paymentMethod = payment.method
    await saveUser(kv, user)
  }
  return c.json({ ok: true, message: `Payment confirmed, user upgraded to ${payment.plan}` })
})

// POST /api/admin/payment/reject
app.post('/api/admin/payment/reject', async (c) => {
  const authErr = requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const { paymentId } = await c.req.json() as any
  const payment = await getPayment(kv, paymentId)
  if (!payment) return c.json({ error: 'Payment not found' }, 404)
  payment.status = 'failed'
  await savePayment(kv, payment)
  return c.json({ ok: true })
})

// POST /api/admin/user/update-plan — manually change a user's plan
app.post('/api/admin/user/update-plan', async (c) => {
  const authErr = requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const { email, plan } = await c.req.json() as any
  const user = await getUser(kv, email)
  if (!user) return c.json({ error: 'User not found' }, 404)
  user.plan = plan
  await saveUser(kv, user)
  return c.json({ ok: true })
})

// GET /api/admin/signups-daily — for chart data
app.get('/api/admin/signups-daily', async (c) => {
  const authErr = requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const raw = await kv.get('stats:signups_daily')
  const data = raw ? JSON.parse(raw) : {}
  return c.json({ ok: true, data })
})

// ─── PUBLIC ROUTES ───────────────────────────────────────────────
app.get('/', (c) => c.html(homePage()))
app.get('/programs', (c) => c.html(programsPage()))
app.get('/drills', (c) => {
  const level = c.req.query('level')
  const cat = c.req.query('cat')
  const drill = c.req.query('drill')
  return c.html(drillsPage({ level, cat, drill }))
})
app.get('/videos', (c) => c.html(videosPage()))
app.get('/pricing', (c) => c.html(pricingPage()))
app.get('/products', (c) => {
  const cat = c.req.query('cat')
  const tier = c.req.query('tier')
  return c.html(productsPage({ cat, tier }))
})

// Auth
app.get('/auth/login', (c) => c.html(loginPage()))
app.get('/auth/signup', (c) => c.html(signupPage()))

// Dashboard / Progress
app.get('/dashboard', (c) => c.html(dashboardPage()))
app.get('/progress', (c) => c.html(dashboardPage()))

// ─── ADMIN AUTH HELPER ───────────────────────────────────────────
function isAdminAuthenticated(c: any): boolean {
  const token = getCookie(c, SESSION_COOKIE)
  return !!token && validateSessionToken(token)
}

function requireAdmin(c: any): Response | null {
  if (!isAdminAuthenticated(c)) {
    return c.redirect('/admin/login')
  }
  return null
}

// ─── ADMIN LOGIN ─────────────────────────────────────────────────
app.get('/admin/login', (c) => {
  // If already logged in, redirect to dashboard
  if (isAdminAuthenticated(c)) return c.redirect('/admin')
  return c.html(adminLoginPage())
})

app.post('/admin/login', async (c) => {
  const body = await c.req.parseBody()
  const username = (body['username'] as string || '').trim()
  const password = (body['password'] as string || '').trim()

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = createSessionToken(username)
    setCookie(c, SESSION_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    return c.redirect('/admin')
  }

  // Wrong credentials — re-render login page with error
  return c.html(adminLoginPage('Invalid username or password. Please try again.'), 401)
})

// ─── ADMIN LOGOUT ────────────────────────────────────────────────
app.get('/admin/logout', (c) => {
  deleteCookie(c, SESSION_COOKIE, { path: '/' })
  return c.redirect('/admin/login')
})

// ─── ADMIN PROTECTED ROUTES ──────────────────────────────────────
app.get('/admin', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminDashboardPage())
})

app.get('/admin/users', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminUsersPage())
})

app.get('/admin/drills', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminDrillsPage())
})

app.get('/admin/videos', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminVideosPage())
})

app.get('/admin/products', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminProductsPage())
})

app.get('/admin/plans', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminPlansPage())
})

app.get('/admin/settings', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminSettingsPage())
})

app.get('/admin/payments', (c) => {
  const redirect = requireAdmin(c)
  if (redirect) return redirect
  return c.html(adminPaymentsPage())
})

// ─── 404 ─────────────────────────────────────────────────────────
app.notFound((c) => {
  // Protect /admin/* 404s too
  if (c.req.path.startsWith('/admin')) {
    return c.redirect('/admin/login')
  }
  return c.redirect('/')
})

export default app
