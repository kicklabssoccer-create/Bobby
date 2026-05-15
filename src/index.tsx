import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { homePage } from './pages/home'
import { pricingPage } from './pages/pricing'
import { drillsPage } from './pages/drills'
import { videosPage } from './pages/videos'
import { programsPage } from './pages/programs'
import { productsPage } from './pages/products'
import { loginPage, signupPage } from './pages/auth'
import { dashboardPage } from './pages/dashboard'

const app = new Hono()

// Static files
app.use('/static/*', serveStatic({ root: './' }))
app.use('/favicon.svg', serveStatic({ root: './', path: '/public/favicon.svg' }))
app.use('/manifest.json', serveStatic({ root: './', path: '/public/manifest.json' }))

// Home
app.get('/', (c) => c.html(homePage()))

// Training content
app.get('/programs', (c) => c.html(programsPage()))
app.get('/drills', (c) => {
  const level = c.req.query('level')
  const cat = c.req.query('cat')
  const drill = c.req.query('drill')
  return c.html(drillsPage({ level, cat, drill }))
})
app.get('/videos', (c) => c.html(videosPage()))

// Subscription
app.get('/pricing', (c) => c.html(pricingPage()))

// Shop
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

// Redirect unknown paths to home
app.notFound((c) => c.redirect('/'))

export default app
