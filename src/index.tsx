import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

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

const app = new Hono()

// ─── STATIC FILES ────────────────────────────────────────────────
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ root: './', path: '/public/favicon.svg' }))
app.use('/manifest.json', serveStatic({ root: './', path: '/public/manifest.json' }))

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

// ─── 404 ─────────────────────────────────────────────────────────
app.notFound((c) => {
  // Protect /admin/* 404s too
  if (c.req.path.startsWith('/admin')) {
    return c.redirect('/admin/login')
  }
  return c.redirect('/')
})

export default app
