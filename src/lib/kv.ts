/**
 * Cloudflare KV helper layer.
 * All user data is stored in KICKLAB_KV with the following key schema:
 *
 *   user:{email}         → KickUser JSON
 *   user_index           → JSON array of all email strings
 *   payment:{id}         → KickPayment JSON
 *   payment_index        → JSON array of all payment IDs
 *   session:{token}      → email string (24hr TTL)
 *   stats:signups_daily  → { "2026-05-16": 3, ... }
 */

export type KickUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  plan: 'free' | 'starter' | 'pro' | 'elite';
  gender: 'male' | 'female' | 'other' | 'prefer_not';
  age: string;           // e.g. "18-24"
  location: string;      // city or country
  level: string;         // Beginner / Intermediate / Advanced
  phone?: string;
  joined: string;        // ISO timestamp
  lastLogin?: string;
  streak: number;
  sessionsCompleted: number;
  paymentMethod?: string;
  paymentStatus?: 'pending' | 'confirmed' | 'failed';
  venmoHandle?: string;
};

export type KickPayment = {
  id: string;
  userId: string;
  email: string;
  name: string;
  plan: string;
  amount: string;
  method: 'venmo' | 'card' | 'zelle' | 'paypal';
  venmoHandle?: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
  confirmedAt?: string;
  billing: 'monthly' | 'annual';
  note?: string;
};

// ── Simple hash (no crypto module in CF Workers — use Web Crypto) ──
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + 'kicklab-salt-2026');
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return (await hashPassword(password)) === hash;
}

// ── Session token ──────────────────────────────────────────────────
export function makeSessionToken(): string {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── User CRUD ─────────────────────────────────────────────────────
export async function getUser(kv: KVNamespace, email: string): Promise<KickUser | null> {
  const raw = await kv.get(`user:${email.toLowerCase()}`);
  return raw ? JSON.parse(raw) : null;
}

export async function saveUser(kv: KVNamespace, user: KickUser): Promise<void> {
  await kv.put(`user:${user.email.toLowerCase()}`, JSON.stringify(user));
  // Update index
  const indexRaw = await kv.get('user_index');
  const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];
  if (!index.includes(user.email.toLowerCase())) {
    index.push(user.email.toLowerCase());
    await kv.put('user_index', JSON.stringify(index));
  }
  // Update daily signup stat
  const today = new Date().toISOString().split('T')[0];
  const statsRaw = await kv.get('stats:signups_daily');
  const stats: Record<string, number> = statsRaw ? JSON.parse(statsRaw) : {};
  if (!stats[today]) stats[today] = 0;
  stats[today]++;
  await kv.put('stats:signups_daily', JSON.stringify(stats));
}

export async function getAllUsers(kv: KVNamespace): Promise<KickUser[]> {
  const indexRaw = await kv.get('user_index');
  if (!indexRaw) return [];
  const emails: string[] = JSON.parse(indexRaw);
  const users = await Promise.all(emails.map(e => getUser(kv, e)));
  return users.filter(Boolean) as KickUser[];
}

// ── Payment CRUD ──────────────────────────────────────────────────
export async function savePayment(kv: KVNamespace, p: KickPayment): Promise<void> {
  await kv.put(`payment:${p.id}`, JSON.stringify(p));
  const indexRaw = await kv.get('payment_index');
  const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];
  if (!index.includes(p.id)) {
    index.push(p.id);
    await kv.put('payment_index', JSON.stringify(index));
  }
}

export async function getPayment(kv: KVNamespace, id: string): Promise<KickPayment | null> {
  const raw = await kv.get(`payment:${id}`);
  return raw ? JSON.parse(raw) : null;
}

export async function getAllPayments(kv: KVNamespace): Promise<KickPayment[]> {
  const indexRaw = await kv.get('payment_index');
  if (!indexRaw) return [];
  const ids: string[] = JSON.parse(indexRaw);
  const payments = await Promise.all(ids.map(id => getPayment(kv, id)));
  return payments.filter(Boolean) as KickPayment[];
}

// ── Session ───────────────────────────────────────────────────────
export async function createSession(kv: KVNamespace, email: string): Promise<string> {
  const token = makeSessionToken();
  await kv.put(`session:${token}`, email.toLowerCase(), { expirationTtl: 86400 });
  return token;
}

export async function getSessionEmail(kv: KVNamespace, token: string): Promise<string | null> {
  return await kv.get(`session:${token}`);
}

export async function deleteSession(kv: KVNamespace, token: string): Promise<void> {
  await kv.delete(`session:${token}`);
}

// ── Admin sessions (stored in KV with admin: prefix) ──────────────
export async function createAdminSession(kv: KVNamespace): Promise<string> {
  const token = makeSessionToken();
  await kv.put(`admin_session:${token}`, 'admin', { expirationTtl: 86400 });
  return token;
}

export async function validateAdminSession(kv: KVNamespace, token: string): Promise<boolean> {
  if (!token) return false;
  const val = await kv.get(`admin_session:${token}`);
  return val === 'admin';
}

export async function deleteAdminSession(kv: KVNamespace, token: string): Promise<void> {
  await kv.delete(`admin_session:${token}`);
}

// ── Analytics helpers ─────────────────────────────────────────────
export function computeStats(users: KickUser[], payments: KickPayment[]) {
  const total = users.length;
  const byPlan = { free: 0, starter: 0, pro: 0, elite: 0 };
  const byGender = { male: 0, female: 0, other: 0, prefer_not: 0 };
  const byAge: Record<string, number> = {};
  const byLevel = { Beginner: 0, Intermediate: 0, Advanced: 0 };

  for (const u of users) {
    byPlan[u.plan] = (byPlan[u.plan] || 0) + 1;
    byGender[u.gender] = (byGender[u.gender] || 0) + 1;
    byAge[u.age] = (byAge[u.age] || 0) + 1;
    byLevel[u.level as keyof typeof byLevel] = (byLevel[u.level as keyof typeof byLevel] || 0) + 1;
  }

  // Revenue calculation (monthly)
  const PRICES = { starter: 9, pro: 19, elite: 29 };
  const mrr = users.reduce((sum, u) => {
    return sum + (PRICES[u.plan as keyof typeof PRICES] || 0);
  }, 0);

  // Signups last 30 days
  const cutoff = new Date(Date.now() - 30 * 86400000).toISOString();
  const recentSignups = users.filter(u => u.joined >= cutoff).length;

  // Pending payments
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const confirmedRevenue = payments
    .filter(p => p.status === 'confirmed')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '') || '0'), 0);

  return { total, byPlan, byGender, byAge, byLevel, mrr, recentSignups, pendingPayments, confirmedRevenue };
}
