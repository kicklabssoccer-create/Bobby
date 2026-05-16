// Admin credentials & session management
// ──────────────────────────────────────
// Username : kicklab_admin
// Password : KickLab@2026!
// ──────────────────────────────────────

export const ADMIN_USERNAME = 'kicklab_admin'
export const ADMIN_PASSWORD = 'KickLab@2026!'
export const SESSION_COOKIE = 'kl_admin_session'
export const SESSION_SECRET = 'kicklab-admin-secret-2026-xk9p'

// Very lightweight session token: base64(user:timestamp:hmac-ish)
export function createSessionToken(username: string): string {
  const payload = `${username}:${Date.now()}:${SESSION_SECRET}`
  // base64 encode for transport
  return btoa(payload)
}

export function validateSessionToken(token: string): boolean {
  try {
    const decoded = atob(token)
    const parts = decoded.split(':')
    if (parts.length < 3) return false
    // Check secret
    if (!decoded.endsWith(`:${SESSION_SECRET}`)) return false
    // Check expiry (24 hours)
    const ts = parseInt(parts[1])
    if (isNaN(ts)) return false
    const age = Date.now() - ts
    return age < 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

export function adminAuthMiddleware() {
  return async (c: any, next: any) => {
    const cookie = c.req.header('Cookie') || ''
    const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`))
    const token = match ? match[1] : null
    if (!token || !validateSessionToken(decodeURIComponent(token))) {
      return c.redirect('/admin/login')
    }
    await next()
  }
}
