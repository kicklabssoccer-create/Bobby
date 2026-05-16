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
  createAdminSession, validateAdminSession, deleteAdminSession,
  getCMSProducts, saveCMSProducts,
  getCMSVideos, saveCMSVideos,
  getCMSDrills, saveCMSDrills,
  getCMSAnnouncements, saveCMSAnnouncements,
  computeStats,
  type KickUser, type KickPayment,
  type CMSProduct, type CMSVideo, type CMSDrill, type CMSAnnouncement,
} from './lib/kv'

type Bindings = {
  KICKLAB_KV: KVNamespace
  MAILCHIMP_API_KEY: string
  MAILCHIMP_AUDIENCE_ID: string
  MAILCHIMP_SERVER: string
}

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
import { adminContentPage } from './admin/pages/content'

const app = new Hono<{ Bindings: Bindings }>()

// ─── STATIC FILES ────────────────────────────────────────────────
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ root: './', path: '/public/favicon.svg' }))
app.use('/manifest.json', serveStatic({ root: './', path: '/public/manifest.json' }))
// Serve service worker with correct MIME type (must be at root scope)
app.get('/sw.js', (c) => {
  const swContent = `// Kicklabs Soccer Service Worker — PWA offline support
const CACHE_NAME = 'kicklabs-soccer-v1';
const PRECACHE_URLS = ['/','/drills','/videos','/programs','/pricing','/products','/dashboard'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/')) return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.status === 200 && event.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/')))
  );
});

self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'Kicklab', {
      body: data.body || 'Time to train! ⚽',
      icon: '/static/icons/icon-192.png',
      badge: '/static/icons/icon-96.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
});`;
  return new Response(swContent, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Service-Worker-Allowed': '/',
    }
  });
})

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

// Helper: build Set-Cookie header string
function makeUserCookie(token: string): string {
  return `${USER_SESSION_COOKIE}=${token}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`
}
function clearUserCookie(): string {
  return `${USER_SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
}

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
    const { passwordHash: _, ...safeUser } = user
    // Auto-subscribe to Mailchimp (fire and forget — don't block signup)
    if (c.env.MAILCHIMP_API_KEY && c.env.MAILCHIMP_AUDIENCE_ID) {
      const server = c.env.MAILCHIMP_SERVER || 'us16'
      fetch(`https://${server}.api.mailchimp.com/3.0/lists/${c.env.MAILCHIMP_AUDIENCE_ID}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa('anystring:' + c.env.MAILCHIMP_API_KEY)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: user.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: user.name.split(' ')[0] || user.name,
            LNAME: user.name.split(' ').slice(1).join(' ') || '',
          },
          tags: [user.plan, user.level || 'beginner'],
        }),
      }).catch(() => {}) // silent fail — never block signup
    }
    return new Response(JSON.stringify({ ok: true, user: safeUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Set-Cookie': makeUserCookie(token) },
    })
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
    user.lastLogin = new Date().toISOString()
    await saveUser(kv, user)
    const token = await createSession(kv, email)
    const { passwordHash: _, ...safeUser } = user
    return new Response(JSON.stringify({ ok: true, user: safeUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Set-Cookie': makeUserCookie(token) },
    })
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
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Set-Cookie': clearUserCookie() },
  })
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

async function requireAdminAPI(c: any) {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const valid = await validateAdminSession(kv, token)
  if (!valid) return c.json({ error: 'Unauthorized' }, 401)
  return null
}

// GET /api/admin/stats — dashboard numbers
app.get('/api/admin/stats', async (c) => {
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const [users, payments] = await Promise.all([getAllUsers(kv), getAllPayments(kv)])
  const stats = computeStats(users, payments)
  return c.json({ ok: true, stats })
})

// GET /api/admin/users — full user list
app.get('/api/admin/users', async (c) => {
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const users = await getAllUsers(kv)
  const safe = users.map(({ passwordHash: _, ...u }) => u)
  return c.json({ ok: true, users: safe, total: safe.length })
})

// GET /api/admin/payments — all payments with status
app.get('/api/admin/payments', async (c) => {
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const payments = await getAllPayments(kv)
  return c.json({ ok: true, payments, total: payments.length })
})

// POST /api/admin/payment/approve — admin approves a Venmo payment
app.post('/api/admin/payment/approve', async (c) => {
  const authErr = await requireAdminAPI(c)
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
  const authErr = await requireAdminAPI(c)
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
  const authErr = await requireAdminAPI(c)
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
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const raw = await kv.get('stats:signups_daily')
  const data = raw ? JSON.parse(raw) : {}
  return c.json({ ok: true, data })
})

// ─── MAILCHIMP INTEGRATION ───────────────────────────────────────

// Helper: call Mailchimp API
async function mailchimp(env: Bindings, method: string, path: string, body?: any) {
  const server = env.MAILCHIMP_SERVER || 'us16'
  const res = await fetch(`https://${server}.api.mailchimp.com/3.0${path}`, {
    method,
    headers: {
      'Authorization': `Basic ${btoa('anystring:' + env.MAILCHIMP_API_KEY)}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res
}

// GET /api/admin/mailchimp/stats — list info + member count
app.get('/api/admin/mailchimp/stats', async (c) => {
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  try {
    const res = await mailchimp(c.env, 'GET', `/lists/${c.env.MAILCHIMP_AUDIENCE_ID}`)
    const data: any = await res.json()
    return c.json({
      ok: true,
      listName: data.name,
      memberCount: data.stats?.member_count || 0,
      openRate: ((data.stats?.open_rate || 0) * 100).toFixed(1),
      clickRate: ((data.stats?.click_rate || 0) * 100).toFixed(1),
      unsubscribeCount: data.stats?.unsubscribe_count || 0,
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// POST /api/admin/mailchimp/sync — bulk sync all KV users to Mailchimp
app.post('/api/admin/mailchimp/sync', async (c) => {
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  try {
    const users = await getAllUsers(kv)
    const members = users.map(u => ({
      email_address: u.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: u.name.split(' ')[0] || u.name,
        LNAME: u.name.split(' ').slice(1).join(' ') || '',
      },
      tags: [u.plan, u.level || 'beginner'],
    }))
    const res = await mailchimp(c.env, 'POST', `/lists/${c.env.MAILCHIMP_AUDIENCE_ID}`, {
      members,
      update_existing: true,
    })
    const data: any = await res.json()
    return c.json({
      ok: true,
      added: data.new_members?.length || 0,
      updated: data.updated_members?.length || 0,
      errors: data.errors?.length || 0,
      total: users.length,
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// POST /api/admin/mailchimp/subscribe — add single user to Mailchimp
// Called automatically on signup
app.post('/api/admin/mailchimp/subscribe', async (c) => {
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  try {
    const { email, name, plan } = await c.req.json() as any
    const res = await mailchimp(c.env, 'POST', `/lists/${c.env.MAILCHIMP_AUDIENCE_ID}/members`, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name?.split(' ')[0] || '',
        LNAME: name?.split(' ').slice(1).join(' ') || '',
      },
      tags: [plan || 'free'],
    })
    const data: any = await res.json()
    if (res.ok) return c.json({ ok: true })
    return c.json({ error: data.detail || 'Mailchimp error' }, 400)
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// POST /api/admin/mailchimp/campaign — create + send a campaign
app.post('/api/admin/mailchimp/campaign', async (c) => {
  const authErr = await requireAdminAPI(c)
  if (authErr) return authErr
  try {
    const { subject, previewText, body } = await c.req.json() as any
    if (!subject || !body) return c.json({ error: 'Subject and body required' }, 400)

    // Step 1: Create campaign
    const campaignRes = await mailchimp(c.env, 'POST', '/campaigns', {
      type: 'regular',
      recipients: { list_id: c.env.MAILCHIMP_AUDIENCE_ID },
      settings: {
        subject_line: subject,
        preview_text: previewText || '',
        from_name: 'Kicklabs Soccer',
        reply_to: 'kicklabs.soccer@gmail.com',
      },
    })
    const campaign: any = await campaignRes.json()
    if (!campaign.id) return c.json({ error: campaign.detail || 'Failed to create campaign' }, 400)

    // Step 2: Set content
    await mailchimp(c.env, 'PUT', `/campaigns/${campaign.id}/content`, {
      html: `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#080e1a;color:#fff;padding:32px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="background:#2563eb;width:48px;height:48px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:24px">⚽</div>
          <h1 style="color:#fff;font-size:28px;margin:12px 0 4px">KICKLABS SOCCER</h1>
          <p style="color:#60a5fa;font-size:13px;margin:0">kicklabssoccer.com</p>
        </div>
        ${body}
        <hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:32px 0"/>
        <p style="color:#6b7280;font-size:12px;text-align:center">
          © 2026 Kicklabs Soccer &middot; <a href="https://www.kicklabssoccer.com" style="color:#6b7280">kicklabssoccer.com</a> &middot; <a href="*|UNSUB|*" style="color:#6b7280">Unsubscribe</a>
        </p>
      </body></html>`,
    })

    // Step 3: Send
    await mailchimp(c.env, 'POST', `/campaigns/${campaign.id}/actions/send`)

    return c.json({ ok: true, campaignId: campaign.id, message: 'Campaign sent successfully!' })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// ─── CMS API ROUTES ──────────────────────────────────────────────

// Public: get active announcement
app.get('/api/announcement', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ announcement: null })
  const items = await getCMSAnnouncements(kv)
  const active = items.find(a => a.active) || null
  return c.json({ announcement: active })
})

// Public: get CMS products (merged with defaults on frontend)
app.get('/api/cms/products', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ products: [] })
  const products = await getCMSProducts(kv)
  return c.json({ products })
})

// Public: get CMS videos
app.get('/api/cms/videos', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ videos: [] })
  const videos = await getCMSVideos(kv)
  return c.json({ videos })
})

// Public: get CMS drills
app.get('/api/cms/drills', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.json({ drills: [] })
  const drills = await getCMSDrills(kv)
  return c.json({ drills })
})

// Admin: Products CRUD
app.get('/api/admin/cms/products', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  return c.json({ products: await getCMSProducts(kv) })
})
app.post('/api/admin/cms/products', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const body = await c.req.json() as any
  const products = await getCMSProducts(kv)
  const product: CMSProduct = {
    id: crypto.randomUUID(),
    name: body.name || 'New Product',
    description: body.description || '',
    price: body.price || '',
    amazonUrl: body.amazonUrl || '',
    category: body.category || 'General',
    tier: body.tier || 'Starter',
    emoji: body.emoji || '⚽',
    featured: body.featured || false,
    createdAt: new Date().toISOString(),
  }
  products.unshift(product)
  await saveCMSProducts(kv, products)
  return c.json({ ok: true, product })
})
app.put('/api/admin/cms/products/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const body = await c.req.json() as any
  const products = await getCMSProducts(kv)
  const idx = products.findIndex(p => p.id === id)
  if (idx === -1) return c.json({ error: 'Not found' }, 404)
  products[idx] = { ...products[idx], ...body, id }
  await saveCMSProducts(kv, products)
  return c.json({ ok: true })
})
app.delete('/api/admin/cms/products/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const products = (await getCMSProducts(kv)).filter(p => p.id !== id)
  await saveCMSProducts(kv, products)
  return c.json({ ok: true })
})

// Admin: Videos CRUD
app.get('/api/admin/cms/videos', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  return c.json({ videos: await getCMSVideos(kv) })
})
app.post('/api/admin/cms/videos', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const body = await c.req.json() as any
  const videos = await getCMSVideos(kv)
  const video: CMSVideo = {
    id: crypto.randomUUID(),
    title: body.title || 'New Video',
    youtubeId: body.youtubeId || '',
    topic: body.topic || 'General',
    level: body.level || 'Beginner',
    description: body.description || '',
    featured: body.featured || false,
    createdAt: new Date().toISOString(),
  }
  videos.unshift(video)
  await saveCMSVideos(kv, videos)
  return c.json({ ok: true, video })
})
app.put('/api/admin/cms/videos/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const body = await c.req.json() as any
  const videos = await getCMSVideos(kv)
  const idx = videos.findIndex(v => v.id === id)
  if (idx === -1) return c.json({ error: 'Not found' }, 404)
  videos[idx] = { ...videos[idx], ...body, id }
  await saveCMSVideos(kv, videos)
  return c.json({ ok: true })
})
app.delete('/api/admin/cms/videos/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const videos = (await getCMSVideos(kv)).filter(v => v.id !== id)
  await saveCMSVideos(kv, videos)
  return c.json({ ok: true })
})

// Admin: Drills CRUD
app.get('/api/admin/cms/drills', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  return c.json({ drills: await getCMSDrills(kv) })
})
app.post('/api/admin/cms/drills', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const body = await c.req.json() as any
  const drills = await getCMSDrills(kv)
  const drill: CMSDrill = {
    id: crypto.randomUUID(),
    title: body.title || 'New Drill',
    category: body.category || 'Dribbling',
    level: body.level || 'Beginner',
    duration: body.duration || '15 min',
    description: body.description || '',
    instructions: body.instructions || '',
    planRequired: body.planRequired || 'free',
    featured: body.featured || false,
    createdAt: new Date().toISOString(),
  }
  drills.unshift(drill)
  await saveCMSDrills(kv, drills)
  return c.json({ ok: true, drill })
})
app.put('/api/admin/cms/drills/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const body = await c.req.json() as any
  const drills = await getCMSDrills(kv)
  const idx = drills.findIndex(d => d.id === id)
  if (idx === -1) return c.json({ error: 'Not found' }, 404)
  drills[idx] = { ...drills[idx], ...body, id }
  await saveCMSDrills(kv, drills)
  return c.json({ ok: true })
})
app.delete('/api/admin/cms/drills/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const drills = (await getCMSDrills(kv)).filter(d => d.id !== id)
  await saveCMSDrills(kv, drills)
  return c.json({ ok: true })
})

// Admin: Announcements CRUD
app.get('/api/admin/cms/announcements', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  return c.json({ announcements: await getCMSAnnouncements(kv) })
})
app.post('/api/admin/cms/announcements', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const body = await c.req.json() as any
  const items = await getCMSAnnouncements(kv)
  // Only one can be active at a time
  if (body.active) items.forEach(a => a.active = false)
  const item: CMSAnnouncement = {
    id: crypto.randomUUID(),
    title: body.title || '',
    message: body.message || '',
    type: body.type || 'info',
    active: body.active || false,
    createdAt: new Date().toISOString(),
  }
  items.unshift(item)
  await saveCMSAnnouncements(kv, items)
  return c.json({ ok: true, item })
})
app.put('/api/admin/cms/announcements/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const body = await c.req.json() as any
  const items = await getCMSAnnouncements(kv)
  if (body.active) items.forEach(a => a.active = false)
  const idx = items.findIndex(a => a.id === id)
  if (idx === -1) return c.json({ error: 'Not found' }, 404)
  items[idx] = { ...items[idx], ...body, id }
  await saveCMSAnnouncements(kv, items)
  return c.json({ ok: true })
})
app.delete('/api/admin/cms/announcements/:id', async (c) => {
  const authErr = await requireAdminAPI(c); if (authErr) return authErr
  const kv = c.env.KICKLAB_KV; if (!kv) return c.json({ error: 'Storage unavailable' }, 503)
  const id = c.req.param('id')
  const items = (await getCMSAnnouncements(kv)).filter(a => a.id !== id)
  await saveCMSAnnouncements(kv, items)
  return c.json({ ok: true })
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

// ─── ADMIN AUTH HELPERS ──────────────────────────────────────────
function makeAdminCookie(token: string): string {
  return `${SESSION_COOKIE}=${token}; Path=/; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`
}
function clearAdminCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
}

// ─── ADMIN LOGIN ─────────────────────────────────────────────────
app.get('/admin/login', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (token && c.env.KICKLAB_KV) {
    const valid = await validateAdminSession(c.env.KICKLAB_KV, token)
    if (valid) return c.redirect('/admin')
  }
  return c.html(adminLoginPage())
})

app.post('/admin/login', async (c) => {
  const kv = c.env.KICKLAB_KV
  if (!kv) return c.html(adminLoginPage('Server error — storage unavailable.'), 503)

  const body = await c.req.parseBody()
  const username = (body['username'] as string || '').trim()
  const password = (body['password'] as string || '').trim()

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Store session token in KV — reliable across all Cloudflare edge nodes
    const token = await createAdminSession(kv)
    // Return 200 with Set-Cookie header + JS redirect.
    // Cloudflare Pages strips Set-Cookie on 302 responses, so we use 200 + JS.
    return new Response(
      `<!DOCTYPE html><html><head><meta charset="UTF-8">
<script>window.location.replace("/admin");</script>
<noscript><meta http-equiv="refresh" content="0;url=/admin"></noscript>
</head><body style="background:#080e1a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">
<p style="font-size:14px">Signing in...</p></body></html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
          'Set-Cookie': makeAdminCookie(token),
        },
      }
    )
  }

  return c.html(adminLoginPage('Invalid email or password. Please try again.'), 401)
})

// ─── ADMIN LOGOUT ────────────────────────────────────────────────
app.get('/admin/logout', async (c) => {
  const kv = c.env.KICKLAB_KV
  const token = getCookie(c, SESSION_COOKIE)
  if (token && kv) await deleteAdminSession(kv, token)
  return new Response('', {
    status: 302,
    headers: {
      'Location': '/admin/login',
      'Set-Cookie': clearAdminCookie(),
    },
  })
})

// ─── ADMIN PROTECTED ROUTES ──────────────────────────────────────
app.get('/admin', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminDashboardPage())
})

app.get('/admin/users', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminUsersPage())
})

app.get('/admin/drills', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminDrillsPage())
})

app.get('/admin/videos', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminVideosPage())
})

app.get('/admin/products', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminProductsPage())
})

app.get('/admin/plans', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminPlansPage())
})

app.get('/admin/settings', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminSettingsPage())
})

app.get('/admin/payments', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminPaymentsPage())
})

app.get('/admin/content', async (c) => {
  const token = getCookie(c, SESSION_COOKIE)
  if (!token || !c.env.KICKLAB_KV || !(await validateAdminSession(c.env.KICKLAB_KV, token)))
    return c.redirect('/admin/login')
  return c.html(adminContentPage())
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
