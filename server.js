import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createPool } from 'mysql2/promise'
import { randomBytes, createHash } from 'crypto'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import bcrypt from 'bcrypt'
import * as Brevo from '@getbrevo/brevo'
import { ExpressAuth, getSession } from '@auth/express'
import { createAuthConfig } from './auth.config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const SITE_URL = process.env.SITE_URL || 'https://ikarmic.com'

// ── MySQL connection pool ────────────────────────────────
const pool = createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
  waitForConnections: true,
  connectionLimit: 10,
  timezone: '+00:00',
})

const VALID_STAGES = new Set(['new', 'qualified', 'proposal', 'won', 'lost'])

// Create tables and run lightweight column migrations
async function initDb() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id           INT AUTO_INCREMENT PRIMARY KEY,
      name         VARCHAR(255) NOT NULL,
      email        VARCHAR(255) NOT NULL,
      company      VARCHAR(255),
      phone        VARCHAR(100),
      message      TEXT NOT NULL,
      source       VARCHAR(50) NOT NULL,
      stage        VARCHAR(20) NOT NULL DEFAULT 'new',
      deal_value   INT NULL,
      tags         JSON NULL,
      follow_up_at DATETIME NULL,
      utm_source   VARCHAR(100) NULL,
      utm_medium   VARCHAR(100) NULL,
      utm_campaign VARCHAR(100) NULL,
      created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
      read_at      DATETIME NULL
    )
  `)
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS lead_notes (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      lead_id    INT NOT NULL,
      note       TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    )
  `)

  // ── Admin users (replaces env-var auth) ──
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      username      VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role          VARCHAR(20) NOT NULL DEFAULT 'admin',
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login_at DATETIME NULL
    )
  `)

  // ── Audit log ──
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS admin_audit_log (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      user_id     INT NULL,
      action      VARCHAR(50) NOT NULL,
      target_type VARCHAR(50) NULL,
      target_id   INT NULL,
      metadata    JSON NULL,
      ip          VARCHAR(45) NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // ── Site settings (key-value store for admin-configurable options) ──
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      \`key\`      VARCHAR(100) NOT NULL PRIMARY KEY,
      value      JSON NOT NULL,
      \`group\`    VARCHAR(50) NOT NULL DEFAULT 'general',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `)

  // ── Lead activity timeline ──
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS lead_activity (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      lead_id    INT NOT NULL,
      type       VARCHAR(50) NOT NULL,
      summary    TEXT NOT NULL,
      metadata   JSON NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    )
  `)

  // ── Invoices (CRM) ──
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS invoices (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      lead_id     INT NULL,
      client_id   INT NULL,
      number      VARCHAR(50) NOT NULL UNIQUE,
      amount      DECIMAL(10,2) NOT NULL,
      currency    VARCHAR(3) NOT NULL DEFAULT 'GBP',
      status      VARCHAR(20) NOT NULL DEFAULT 'draft',
      due_date    DATE NULL,
      paid_date   DATE NULL,
      description TEXT NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_invoices_client (client_id),
      INDEX idx_invoices_lead (lead_id)
    )
  `)

  // ── Documents (CRM) ──
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS documents (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      lead_id     INT NULL,
      client_id   INT NULL,
      project_id  INT NULL,
      name        VARCHAR(255) NOT NULL,
      file_path   VARCHAR(500) NOT NULL,
      file_size   INT NULL,
      mime_type   VARCHAR(100) NULL,
      uploaded_by INT NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // ── Client Portal tables ──
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS clients (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      name          VARCHAR(255) NOT NULL,
      email         VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      company       VARCHAR(255) NULL,
      phone         VARCHAR(100) NULL,
      lead_id       INT NULL,
      verified      TINYINT(1) NOT NULL DEFAULT 0,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login_at DATETIME NULL
    )
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS client_sessions (
      id         VARCHAR(128) NOT NULL PRIMARY KEY,
      client_id  INT NOT NULL,
      ip         VARCHAR(45) NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    )
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS client_projects (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      client_id   INT NOT NULL,
      name        VARCHAR(255) NOT NULL,
      description TEXT NULL,
      status      VARCHAR(30) NOT NULL DEFAULT 'active',
      start_date  DATE NULL,
      end_date    DATE NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    )
  `)

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS client_messages (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      client_id   INT NOT NULL,
      project_id  INT NULL,
      sender_type VARCHAR(10) NOT NULL DEFAULT 'client',
      sender_id   INT NOT NULL,
      message     TEXT NOT NULL,
      read_at     DATETIME NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
    )
  `)

  // Migrations for pre-existing leads tables
  const migrations = [
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS stage        VARCHAR(20)  NOT NULL DEFAULT 'new'`,
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS deal_value   INT          NULL`,
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS tags         JSON         NULL`,
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS follow_up_at DATETIME     NULL`,
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source   VARCHAR(100) NULL`,
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium   VARCHAR(100) NULL`,
    `ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(100) NULL`,
  ]
  for (const sql of migrations) {
    await pool.execute(sql)
  }

  // Widen client_sessions.id if it was previously created as VARCHAR(64)
  try {
    await pool.execute(`ALTER TABLE client_sessions MODIFY COLUMN id VARCHAR(128) NOT NULL`)
  } catch { /* ignore if already correct */ }

  // Cleanup expired sessions
  try {
    await pool.execute('DELETE FROM client_sessions WHERE expires_at < NOW()')
  } catch { /* ignore */ }
}

// ── Brevo transactional email client ────────────────────
const brevoClient = new Brevo.TransactionalEmailsApi()
brevoClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY ?? ''

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@ikarmic.ai'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@ikarmic.ai'
const FROM_NAME = 'Ikarmic Website'

// ── Security helpers ─────────────────────────────────────

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

async function auditLog(userId, action, targetType, targetId, metadata, ip) {
  try {
    await pool.execute(
      `INSERT INTO admin_audit_log (user_id, action, target_type, target_id, metadata, ip) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, action, targetType, targetId, metadata ? JSON.stringify(metadata) : null, ip],
    )
  } catch (err) {
    console.error('[audit] Failed to log:', err)
  }
}

// Auth.js session-based admin middleware (reads JWT from HttpOnly cookie)
async function requireAdmin(req, res, next) {
  const session = res.locals.session ?? await getSession(req, createAuthConfig(pool))
  if (!session?.user) return res.status(401).json({ error: 'Unauthorized' })
  req.adminUser = { id: Number(session.user.id), username: session.user.name, role: session.user.role }
  next()
}

// Client portal session middleware (SHA-256 hashed token in DB)
const CLIENT_SESSION_TTL_HOURS = 24

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex')
}

async function requireClient(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  const token = authHeader.slice(7)
  const hashed = hashToken(token)
  try {
    const [rows] = await pool.execute(
      `SELECT cs.client_id, c.name, c.email, c.company
       FROM client_sessions cs
       JOIN clients c ON c.id = cs.client_id
       WHERE cs.id = ? AND cs.expires_at > NOW()`,
      [hashed],
    )
    if (!rows.length) return res.status(401).json({ error: 'Session expired' })
    req.client = { id: rows[0].client_id, name: rows[0].name, email: rows[0].email, company: rows[0].company }
    next()
  } catch (err) {
    console.error('[requireClient] DB error:', err)
    res.status(500).json({ error: 'Internal error' })
  }
}

async function createClientSession(clientId, ip) {
  const token = randomBytes(32).toString('hex')
  const hashed = hashToken(token)
  const expiresAt = new Date(Date.now() + CLIENT_SESSION_TTL_HOURS * 60 * 60 * 1000)
  await pool.execute(
    'INSERT INTO client_sessions (id, client_id, ip, expires_at) VALUES (?, ?, ?, ?)',
    [hashed, clientId, ip, expiresAt],
  )
  return { token, expiresAt }
}

// ── Lead activity logger ─────────────────────────────────

async function logLeadActivity(leadId, type, summary, metadata = null) {
  try {
    await pool.execute(
      'INSERT INTO lead_activity (lead_id, type, summary, metadata) VALUES (?, ?, ?, ?)',
      [leadId, type, summary, metadata ? JSON.stringify(metadata) : null],
    )
  } catch (err) {
    console.error('[leadActivity] Failed to log:', err)
  }
}

// ── Helpers ─────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function insertLead(data) {
  const {
    name,
    email,
    company = null,
    phone = null,
    message,
    source,
    utm_source = null,
    utm_medium = null,
    utm_campaign = null,
  } = data
  const [result] = await pool.execute(
    `INSERT INTO leads
       (name, email, company, phone, message, source, utm_source, utm_medium, utm_campaign)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      company,
      phone,
      message,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
    ],
  )
  return result.insertId
}

function sanitizeUtm(val) {
  if (typeof val !== 'string') return null
  const trimmed = val.trim().slice(0, 100)
  return trimmed || null
}

function fireOpenClaw(lead) {
  const webhookUrl = process.env.OPENCLAW_WEBHOOK_URL
  if (!webhookUrl) return
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  }).catch((err) => console.error('[OpenClaw] webhook error:', err))
}

// ── Security Middleware ──────────────────────────────────

// HTTPS redirect in production (behind reverse proxy)
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.url}`)
    }
    next()
  })
}

// Security headers (HSTS, CSP, X-Frame-Options, etc.)
app.use(helmet({
  contentSecurityPolicy: false, // Let Vite/React handle CSP in dev
  crossOriginEmbedderPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true },
}))

// CORS — allow only our domain + localhost for dev
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [SITE_URL]
    : [SITE_URL, 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))

// Rate limiting on login endpoint
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                     // 5 attempts per window per IP
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// General API rate limiter (100 reqs/min for public endpoints)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(express.json({ limit: '16kb' }))
app.use(express.static(join(__dirname, 'dist')))
app.use('/api', apiLimiter)

// ── Auth.js route handler (manages /api/auth/* endpoints + session cookies) ──
app.use('/api/auth/*', loginLimiter, ExpressAuth(createAuthConfig(pool)))

// ── API Routes ───────────────────────────────────────────

// Contact page form
app.post('/api/contact', async (req, res) => {
  const {
    name,
    email,
    company,
    phone,
    message,
    utm_source,
    utm_medium,
    utm_campaign,
  } = req.body ?? {}

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'Name, email, and message are required.' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  try {
    await insertLead({
      name,
      email,
      company,
      phone,
      message,
      source: 'contact-page',
      utm_source: sanitizeUtm(utm_source),
      utm_medium: sanitizeUtm(utm_medium),
      utm_campaign: sanitizeUtm(utm_campaign),
    })
  } catch (err) {
    console.error('[/api/contact] DB error:', err)
  }

  fireOpenClaw({ name, email, company, phone, message, source: 'contact-page' })

  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail()
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
    sendSmtpEmail.to = [{ email: CONTACT_EMAIL }]
    sendSmtpEmail.replyTo = { email: email, name: escapeHtml(name) }
    sendSmtpEmail.subject = `New consultation request from ${escapeHtml(name)}`
    sendSmtpEmail.htmlContent = `
        <h2 style="font-family:sans-serif">New consultation request</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Company</td><td>${escapeHtml(company || '—')}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Phone</td><td>${escapeHtml(phone || '—')}</td></tr>
        </table>
        <p style="font-family:sans-serif;margin-top:16px"><strong>Message:</strong></p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
      `
    await brevoClient.sendTransacEmail(sendSmtpEmail)
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/contact] Brevo error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

// Home CTA form
app.post('/api/cta', async (req, res) => {
  const {
    name,
    email,
    company,
    message,
    utm_source,
    utm_medium,
    utm_campaign,
  } = req.body ?? {}

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'Name, email, and message are required.' })
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email address.' })
  }

  try {
    await insertLead({
      name,
      email,
      company,
      message,
      source: 'home-cta',
      utm_source: sanitizeUtm(utm_source),
      utm_medium: sanitizeUtm(utm_medium),
      utm_campaign: sanitizeUtm(utm_campaign),
    })
  } catch (err) {
    console.error('[/api/cta] DB error:', err)
  }

  fireOpenClaw({ name, email, company, message, source: 'home-cta' })

  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail()
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
    sendSmtpEmail.to = [{ email: CONTACT_EMAIL }]
    sendSmtpEmail.replyTo = { email: email, name: escapeHtml(name) }
    sendSmtpEmail.subject = `New project enquiry from ${escapeHtml(name)}`
    sendSmtpEmail.htmlContent = `
        <h2 style="font-family:sans-serif">New project enquiry (home CTA)</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#666">Company</td><td>${escapeHtml(company || '—')}</td></tr>
        </table>
        <p style="font-family:sans-serif;margin-top:16px"><strong>Message:</strong></p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
      `
    await brevoClient.sendTransacEmail(sendSmtpEmail)
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/cta] Brevo error:', err)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
})

// ── Admin Auth (via Auth.js — login/logout handled by /api/auth/*) ───

// Convenience endpoint for frontend to check current session
app.get('/api/admin/me', requireAdmin, (req, res) => {
  res.json(req.adminUser)
})

// ── Admin Leads API ──────────────────────────────────────

app.get('/api/admin/leads', requireAdmin, async (req, res) => {
  try {
    const { q, stage, source, from, to } = req.query
    const conditions = []
    const params = []

    if (q) {
      conditions.push('(name LIKE ? OR email LIKE ? OR company LIKE ?)')
      const like = `%${q}%`
      params.push(like, like, like)
    }
    if (stage && VALID_STAGES.has(stage)) {
      conditions.push('stage = ?')
      params.push(stage)
    }
    if (source) {
      conditions.push('source = ?')
      params.push(source)
    }
    if (from) {
      conditions.push('created_at >= ?')
      params.push(from)
    }
    if (to) {
      conditions.push('created_at <= ?')
      params.push(to)
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const sql = `SELECT id, name, email, company, phone, message, source, stage,
                        deal_value, tags, follow_up_at,
                        utm_source, utm_medium, utm_campaign,
                        created_at, read_at
                 FROM leads ${where} ORDER BY created_at DESC`
    const [rows] = await pool.execute(sql, params)
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/leads] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch leads.' })
  }
})

app.get('/api/admin/leads/export.csv', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT id, name, email, company, phone, message, source, stage,
              deal_value, follow_up_at, utm_source, utm_medium, utm_campaign,
              created_at, read_at
       FROM leads ORDER BY created_at DESC`,
    )
    const cols = [
      'id',
      'name',
      'email',
      'company',
      'phone',
      'message',
      'source',
      'stage',
      'deal_value',
      'follow_up_at',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'created_at',
      'read_at',
    ]
    const escape = (v) => {
      if (v == null) return ''
      const s = String(v).replace(/"/g, '""')
      return /[,"\n\r]/.test(s) ? `"${s}"` : s
    }
    const csv = [
      cols.join(','),
      ...rows.map((r) => cols.map((c) => escape(r[c])).join(',')),
    ].join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"')
    res.send(csv)
  } catch (err) {
    console.error('[/api/admin/leads/export.csv] DB error:', err)
    res.status(500).json({ error: 'Failed to export.' })
  }
})

app.put('/api/admin/leads/:id/read', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid id.' })
  }
  try {
    await pool.execute(
      'UPDATE leads SET read_at = NOW() WHERE id = ? AND read_at IS NULL',
      [id],
    )
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/leads/:id/read] DB error:', err)
    res.status(500).json({ error: 'Failed to update lead.' })
  }
})

app.put('/api/admin/leads/:id/stage', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid id.' })
  }
  const { stage } = req.body ?? {}
  if (!stage || !VALID_STAGES.has(stage)) {
    return res.status(400).json({ error: 'Invalid stage.' })
  }
  try {
    const [before] = await pool.execute('SELECT stage FROM leads WHERE id = ?', [id])
    const oldStage = before[0]?.stage
    await pool.execute('UPDATE leads SET stage = ? WHERE id = ?', [stage, id])
    await logLeadActivity(id, 'stage_change', `Stage changed from ${oldStage} to ${stage}`, { from: oldStage, to: stage })
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/leads/:id/stage] DB error:', err)
    res.status(500).json({ error: 'Failed to update stage.' })
  }
})

app.put('/api/admin/leads/:id/followup', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1)
    return res.status(400).json({ error: 'Invalid id.' })
  const { follow_up_at } = req.body ?? {}
  const val = follow_up_at ? new Date(follow_up_at) : null
  if (follow_up_at && isNaN(val))
    return res.status(400).json({ error: 'Invalid date.' })
  try {
    await pool.execute('UPDATE leads SET follow_up_at = ? WHERE id = ?', [
      val,
      id,
    ])
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/leads/:id/followup] DB error:', err)
    res.status(500).json({ error: 'Failed to update follow-up.' })
  }
})

app.put('/api/admin/leads/:id/value', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1)
    return res.status(400).json({ error: 'Invalid id.' })
  const val = Number(req.body?.deal_value ?? null)
  if (req.body?.deal_value !== undefined && (isNaN(val) || val < 0)) {
    return res.status(400).json({ error: 'Invalid value.' })
  }
  const stored = req.body?.deal_value == null ? null : Math.floor(val)
  try {
    await pool.execute('UPDATE leads SET deal_value = ? WHERE id = ?', [
      stored,
      id,
    ])
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/leads/:id/value] DB error:', err)
    res.status(500).json({ error: 'Failed to update value.' })
  }
})

app.put('/api/admin/leads/:id/tags', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1)
    return res.status(400).json({ error: 'Invalid id.' })
  const { tags } = req.body ?? {}
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== 'string')) {
    return res.status(400).json({ error: 'tags must be an array of strings.' })
  }
  const clean = tags.map((t) => t.trim().slice(0, 50)).filter(Boolean)
  try {
    await pool.execute('UPDATE leads SET tags = ? WHERE id = ?', [
      JSON.stringify(clean),
      id,
    ])
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/leads/:id/tags] DB error:', err)
    res.status(500).json({ error: 'Failed to update tags.' })
  }
})

// ── Notes API ────────────────────────────────────────────

app.get('/api/admin/leads/:id/notes', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1)
    return res.status(400).json({ error: 'Invalid id.' })
  try {
    const [rows] = await pool.execute(
      'SELECT id, note, created_at FROM lead_notes WHERE lead_id = ? ORDER BY created_at ASC',
      [id],
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/leads/:id/notes GET] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch notes.' })
  }
})

app.post('/api/admin/leads/:id/notes', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1)
    return res.status(400).json({ error: 'Invalid id.' })
  const note = typeof req.body?.note === 'string' ? req.body.note.trim() : ''
  if (!note) return res.status(400).json({ error: 'Note cannot be empty.' })
  if (note.length > 4000)
    return res.status(400).json({ error: 'Note too long.' })
  try {
    const [result] = await pool.execute(
      'INSERT INTO lead_notes (lead_id, note) VALUES (?, ?)',
      [id, note],
    )
    await logLeadActivity(id, 'note_added', note.slice(0, 100))
    res.json({ id: result.insertId })
  } catch (err) {
    console.error('[/api/admin/leads/:id/notes POST] DB error:', err)
    res.status(500).json({ error: 'Failed to add note.' })
  }
})

// ── Site Settings API ────────────────────────────────────

// Public: Read all settings (cached by frontend)
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT `key`, value, `group` FROM site_settings')
    const settings = {}
    for (const row of rows) {
      if (!settings[row.group]) settings[row.group] = {}
      settings[row.group][row.key] = JSON.parse(row.value)
    }
    res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300')
    res.json(settings)
  } catch (err) {
    console.error('[/api/settings] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch settings.' })
  }
})

// Admin: Get all settings (no cache)
app.get('/api/admin/settings', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT `key`, value, `group`, updated_at FROM site_settings ORDER BY `group`, `key`')
    res.json(rows.map((r) => ({ ...r, value: JSON.parse(r.value) })))
  } catch (err) {
    console.error('[/api/admin/settings] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch settings.' })
  }
})

// Admin: Upsert a setting
app.put('/api/admin/settings/:key', requireAdmin, async (req, res) => {
  const { key } = req.params
  const { value, group } = req.body ?? {}
  if (!key || key.length > 100) return res.status(400).json({ error: 'Invalid key.' })
  if (value === undefined) return res.status(400).json({ error: 'value is required.' })
  const grp = (group || 'general').slice(0, 50)
  try {
    await pool.execute(
      `INSERT INTO site_settings (\`key\`, value, \`group\`) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE value = VALUES(value), \`group\` = VALUES(\`group\`)`,
      [key, JSON.stringify(value), grp],
    )
    await auditLog(req.adminUser.id, 'setting_update', 'site_settings', null, { key, value }, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/settings/:key] DB error:', err)
    res.status(500).json({ error: 'Failed to save setting.' })
  }
})

// Admin: Bulk upsert settings
app.put('/api/admin/settings', requireAdmin, async (req, res) => {
  const { settings } = req.body ?? {}
  if (!Array.isArray(settings)) return res.status(400).json({ error: 'settings must be an array.' })
  try {
    for (const { key, value, group } of settings) {
      if (!key || key.length > 100) continue
      const grp = (group || 'general').slice(0, 50)
      await pool.execute(
        `INSERT INTO site_settings (\`key\`, value, \`group\`) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE value = VALUES(value), \`group\` = VALUES(\`group\`)`,
        [key, JSON.stringify(value), grp],
      )
    }
    await auditLog(req.adminUser.id, 'settings_bulk_update', 'site_settings', null, { count: settings.length }, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/settings bulk] DB error:', err)
    res.status(500).json({ error: 'Failed to save settings.' })
  }
})

// Admin: Delete a setting
app.delete('/api/admin/settings/:key', requireAdmin, async (req, res) => {
  const { key } = req.params
  try {
    await pool.execute('DELETE FROM site_settings WHERE `key` = ?', [key])
    await auditLog(req.adminUser.id, 'setting_delete', 'site_settings', null, { key }, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/settings/:key DELETE] DB error:', err)
    res.status(500).json({ error: 'Failed to delete setting.' })
  }
})

// ── Admin User Management (superadmin only) ──────────────

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  if (req.adminUser.role !== 'superadmin') {
    return res.status(403).json({ error: 'Forbidden. Superadmin required.' })
  }
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, role, created_at, last_login_at FROM admin_users ORDER BY created_at ASC',
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/users] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch users.' })
  }
})

app.post('/api/admin/users', requireAdmin, async (req, res) => {
  if (req.adminUser.role !== 'superadmin') {
    return res.status(403).json({ error: 'Forbidden. Superadmin required.' })
  }
  const { username, password, role } = req.body ?? {}
  if (!username || !password) return res.status(400).json({ error: 'Username and password required.' })
  if (username.length > 100) return res.status(400).json({ error: 'Username too long.' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' })
  const userRole = role === 'superadmin' ? 'superadmin' : 'admin'
  try {
    const hash = await bcrypt.hash(password, 12)
    const [result] = await pool.execute(
      'INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)',
      [username, hash, userRole],
    )
    await auditLog(req.adminUser.id, 'user_create', 'admin_users', result.insertId, { username, role: userRole }, getClientIp(req))
    res.json({ id: result.insertId, username, role: userRole })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username already exists.' })
    }
    console.error('[/api/admin/users POST] DB error:', err)
    res.status(500).json({ error: 'Failed to create user.' })
  }
})

app.put('/api/admin/users/:id/password', requireAdmin, async (req, res) => {
  const targetId = Number(req.params.id)
  // Users can change their own password; superadmin can change anyone's
  if (req.adminUser.role !== 'superadmin' && req.adminUser.id !== targetId) {
    return res.status(403).json({ error: 'Forbidden.' })
  }
  const { password } = req.body ?? {}
  if (!password || password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' })
  try {
    const hash = await bcrypt.hash(password, 12)
    await pool.execute('UPDATE admin_users SET password_hash = ? WHERE id = ?', [hash, targetId])
    await auditLog(req.adminUser.id, 'password_change', 'admin_users', targetId, null, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/users/:id/password] DB error:', err)
    res.status(500).json({ error: 'Failed to update password.' })
  }
})

app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
  if (req.adminUser.role !== 'superadmin') {
    return res.status(403).json({ error: 'Forbidden. Superadmin required.' })
  }
  const targetId = Number(req.params.id)
  if (targetId === req.adminUser.id) {
    return res.status(400).json({ error: 'Cannot delete your own account.' })
  }
  try {
    await pool.execute('DELETE FROM admin_users WHERE id = ?', [targetId])
    await auditLog(req.adminUser.id, 'user_delete', 'admin_users', targetId, null, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/users/:id DELETE] DB error:', err)
    res.status(500).json({ error: 'Failed to delete user.' })
  }
})

// ── Audit Log API (superadmin only) ──────────────────────

app.get('/api/admin/audit-log', requireAdmin, async (req, res) => {
  if (req.adminUser.role !== 'superadmin') {
    return res.status(403).json({ error: 'Forbidden. Superadmin required.' })
  }
  try {
    const [rows] = await pool.execute(
      `SELECT a.id, a.action, a.target_type, a.target_id, a.metadata, a.ip, a.created_at,
              u.username
       FROM admin_audit_log a
       LEFT JOIN admin_users u ON u.id = a.user_id
       ORDER BY a.created_at DESC LIMIT 200`,
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/audit-log] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch audit log.' })
  }
})

// ── Lead Activity Timeline API ───────────────────────────

app.get('/api/admin/leads/:id/activity', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid id.' })
  try {
    const [rows] = await pool.execute(
      'SELECT id, type, summary, metadata, created_at FROM lead_activity WHERE lead_id = ? ORDER BY created_at DESC LIMIT 100',
      [id],
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/leads/:id/activity] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch activity.' })
  }
})

// ── Lead Email (via Brevo) ───────────────────────────────

app.post('/api/admin/leads/:id/email', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid id.' })
  const { subject, body } = req.body ?? {}
  if (!subject?.trim() || !body?.trim()) return res.status(400).json({ error: 'Subject and body are required.' })
  try {
    const [rows] = await pool.execute('SELECT name, email FROM leads WHERE id = ?', [id])
    if (!rows.length) return res.status(404).json({ error: 'Lead not found.' })
    const lead = rows[0]

    const sendSmtpEmail = new Brevo.SendSmtpEmail()
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
    sendSmtpEmail.to = [{ email: lead.email, name: lead.name }]
    sendSmtpEmail.subject = subject.trim()
    sendSmtpEmail.htmlContent = `<div style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(body.trim())}</div>`
    await brevoClient.sendTransacEmail(sendSmtpEmail)

    await logLeadActivity(id, 'email_sent', `Email: ${subject.trim().slice(0, 80)}`, { subject: subject.trim(), sentBy: req.adminUser.username })
    await auditLog(req.adminUser.id, 'email_send', 'leads', id, { subject: subject.trim() }, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/leads/:id/email] Error:', err)
    res.status(500).json({ error: 'Failed to send email.' })
  }
})

// ── Dashboard Analytics API ──────────────────────────────

app.get('/api/admin/analytics', requireAdmin, async (req, res) => {
  try {
    const [stageCounts] = await pool.execute(
      'SELECT stage, COUNT(*) as count, SUM(deal_value) as total_value FROM leads GROUP BY stage',
    )
    const [recentLeads] = await pool.execute(
      'SELECT COUNT(*) as count FROM leads WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)',
    )
    const [overdueFollowups] = await pool.execute(
      'SELECT COUNT(*) as count FROM leads WHERE follow_up_at < NOW() AND stage NOT IN ("won","lost")',
    )
    const [monthlyTrend] = await pool.execute(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count
       FROM leads WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY month ORDER BY month ASC`,
    )
    const [responseMetrics] = await pool.execute(
      `SELECT AVG(TIMESTAMPDIFF(HOUR, created_at, read_at)) as avg_response_hours
       FROM leads WHERE read_at IS NOT NULL`,
    )
    res.json({
      pipeline: stageCounts,
      leadsLast30Days: recentLeads[0].count,
      overdueFollowups: overdueFollowups[0].count,
      monthlyTrend,
      avgResponseHours: Math.round(responseMetrics[0].avg_response_hours || 0),
    })
  } catch (err) {
    console.error('[/api/admin/analytics] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch analytics.' })
  }
})

// ── Invoice API (CRM) ────────────────────────────────────

app.get('/api/admin/invoices', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT i.*, l.name as lead_name, c.name as client_name
       FROM invoices i
       LEFT JOIN leads l ON l.id = i.lead_id
       LEFT JOIN clients c ON c.id = i.client_id
       ORDER BY i.created_at DESC`,
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/invoices] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch invoices.' })
  }
})

app.post('/api/admin/invoices', requireAdmin, async (req, res) => {
  const { number, amount, currency, status, due_date, description, lead_id, client_id } = req.body ?? {}
  if (!number?.trim() || !amount) return res.status(400).json({ error: 'Invoice number and amount required.' })
  const validStatuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled']
  const invoiceStatus = validStatuses.includes(status) ? status : 'draft'
  try {
    const [result] = await pool.execute(
      `INSERT INTO invoices (number, amount, currency, status, due_date, description, lead_id, client_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [number.trim(), amount, currency || 'GBP', invoiceStatus, due_date || null, description || null, lead_id || null, client_id || null],
    )
    await auditLog(req.adminUser.id, 'invoice_create', 'invoices', result.insertId, { number: number.trim(), amount }, getClientIp(req))
    res.json({ id: result.insertId })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Invoice number already exists.' })
    console.error('[/api/admin/invoices POST] DB error:', err)
    res.status(500).json({ error: 'Failed to create invoice.' })
  }
})

app.put('/api/admin/invoices/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid id.' })
  const { amount, currency, status, due_date, paid_date, description } = req.body ?? {}
  const validStatuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled']
  try {
    const fields = []
    const params = []
    if (amount !== undefined) { fields.push('amount = ?'); params.push(amount) }
    if (currency) { fields.push('currency = ?'); params.push(currency) }
    if (status && validStatuses.includes(status)) { fields.push('status = ?'); params.push(status) }
    if (due_date !== undefined) { fields.push('due_date = ?'); params.push(due_date || null) }
    if (paid_date !== undefined) { fields.push('paid_date = ?'); params.push(paid_date || null) }
    if (description !== undefined) { fields.push('description = ?'); params.push(description) }
    if (!fields.length) return res.status(400).json({ error: 'No fields to update.' })
    params.push(id)
    await pool.execute(`UPDATE invoices SET ${fields.join(', ')} WHERE id = ?`, params)
    await auditLog(req.adminUser.id, 'invoice_update', 'invoices', id, req.body, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/invoices/:id PUT] DB error:', err)
    res.status(500).json({ error: 'Failed to update invoice.' })
  }
})

app.delete('/api/admin/invoices/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid id.' })
  try {
    await pool.execute('DELETE FROM invoices WHERE id = ?', [id])
    await auditLog(req.adminUser.id, 'invoice_delete', 'invoices', id, null, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/invoices/:id DELETE] DB error:', err)
    res.status(500).json({ error: 'Failed to delete invoice.' })
  }
})

// ── Document API (CRM) ──────────────────────────────────

app.get('/api/admin/documents', requireAdmin, async (req, res) => {
  const { lead_id, client_id, project_id } = req.query
  try {
    let sql = 'SELECT * FROM documents WHERE 1=1'
    const params = []
    if (lead_id) { sql += ' AND lead_id = ?'; params.push(lead_id) }
    if (client_id) { sql += ' AND client_id = ?'; params.push(client_id) }
    if (project_id) { sql += ' AND project_id = ?'; params.push(project_id) }
    sql += ' ORDER BY created_at DESC'
    const [rows] = await pool.execute(sql, params)
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/documents] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch documents.' })
  }
})

app.post('/api/admin/documents', requireAdmin, async (req, res) => {
  const { name, file_path, file_size, mime_type, lead_id, client_id, project_id } = req.body ?? {}
  if (!name?.trim() || !file_path?.trim()) return res.status(400).json({ error: 'Name and file_path required.' })
  try {
    const [result] = await pool.execute(
      `INSERT INTO documents (name, file_path, file_size, mime_type, lead_id, client_id, project_id, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name.trim(), file_path.trim(), file_size || null, mime_type || null, lead_id || null, client_id || null, project_id || null, req.adminUser.id],
    )
    await auditLog(req.adminUser.id, 'document_upload', 'documents', result.insertId, { name: name.trim() }, getClientIp(req))
    res.json({ id: result.insertId })
  } catch (err) {
    console.error('[/api/admin/documents POST] DB error:', err)
    res.status(500).json({ error: 'Failed to upload document.' })
  }
})

app.delete('/api/admin/documents/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid id.' })
  try {
    await pool.execute('DELETE FROM documents WHERE id = ?', [id])
    await auditLog(req.adminUser.id, 'document_delete', 'documents', id, null, getClientIp(req))
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/admin/documents/:id DELETE] DB error:', err)
    res.status(500).json({ error: 'Failed to delete document.' })
  }
})

// ── Lead → Client conversion ─────────────────────────────

app.post('/api/admin/leads/:id/convert', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Invalid id.' })
  try {
    const [rows] = await pool.execute('SELECT name, email, company, phone, stage FROM leads WHERE id = ?', [id])
    if (!rows.length) return res.status(404).json({ error: 'Lead not found.' })
    const lead = rows[0]
    if (lead.stage !== 'won') return res.status(400).json({ error: 'Only "won" leads can be converted.' })

    // Check if client already exists
    const [existing] = await pool.execute('SELECT id FROM clients WHERE email = ?', [lead.email])
    if (existing.length) return res.status(409).json({ error: 'Client with this email already exists.', clientId: existing[0].id })

    // Create client with a temp password (they'll reset via forgot-password)
    const tempPw = randomBytes(16).toString('hex')
    const hash = await bcrypt.hash(tempPw, 12)
    const [result] = await pool.execute(
      'INSERT INTO clients (name, email, password_hash, company, phone, lead_id) VALUES (?, ?, ?, ?, ?, ?)',
      [lead.name, lead.email, hash, lead.company, lead.phone, id],
    )
    await logLeadActivity(id, 'converted_to_client', `Converted to client (ID: ${result.insertId})`)
    await auditLog(req.adminUser.id, 'lead_convert', 'clients', result.insertId, { leadId: id }, getClientIp(req))

    // Send welcome email with password reset link
    try {
      const resetToken = randomBytes(32).toString('hex')
      // Store reset token (reuse session table with a special prefix)
      const hashedReset = hashToken(resetToken)
      await pool.execute(
        'INSERT INTO client_sessions (id, client_id, ip, expires_at) VALUES (?, ?, ?, ?)',
        [`reset_${hashedReset}`, result.insertId, getClientIp(req), new Date(Date.now() + 24 * 60 * 60 * 1000)],
      )
      const resetUrl = `${SITE_URL}/portal/reset-password?token=${resetToken}`
      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
      sendSmtpEmail.to = [{ email: lead.email, name: lead.name }]
      sendSmtpEmail.subject = 'Welcome to Your Ikarmic Client Portal'
      sendSmtpEmail.htmlContent = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2>Welcome, ${escapeHtml(lead.name)}!</h2>
          <p>Your client portal account has been created. Click below to set your password and access your projects:</p>
          <p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px">Set Password & Login</a></p>
          <p style="color:#666;font-size:14px">This link expires in 24 hours.</p>
        </div>
      `
      await brevoClient.sendTransacEmail(sendSmtpEmail)
    } catch (emailErr) {
      console.error('[lead_convert] Welcome email failed:', emailErr)
    }

    res.json({ clientId: result.insertId })
  } catch (err) {
    console.error('[/api/admin/leads/:id/convert] DB error:', err)
    res.status(500).json({ error: 'Failed to convert lead.' })
  }
})

// ── Client Portal Auth ───────────────────────────────────

const clientLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.post('/api/portal/login', clientLoginLimiter, async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) return res.status(400).json({ error: 'Email and password required.' })
  try {
    const [rows] = await pool.execute('SELECT id, name, email, company, password_hash, verified FROM clients WHERE email = ?', [email])
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials.' })
    const client = rows[0]
    const valid = await bcrypt.compare(password, client.password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials.' })
    if (!client.verified) return res.status(403).json({ error: 'Account not yet verified. Please check your email for the activation link.' })
    const { token, expiresAt } = await createClientSession(client.id, getClientIp(req))
    await pool.execute('UPDATE clients SET last_login_at = NOW() WHERE id = ?', [client.id])
    res.json({ token, expiresAt, user: { id: client.id, name: client.name, email: client.email, company: client.company } })
  } catch (err) {
    console.error('[/api/portal/login] DB error:', err)
    res.status(500).json({ error: 'Login failed.' })
  }
})

app.post('/api/portal/register', clientLoginLimiter, async (req, res) => {
  const { name, email, password, company } = req.body ?? {}
  if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ error: 'Name, email, and password required.' })
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email.' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' })
  try {
    const hash = await bcrypt.hash(password, 12)
    const [result] = await pool.execute(
      'INSERT INTO clients (name, email, password_hash, company, verified) VALUES (?, ?, ?, ?, 0)',
      [name.trim(), email.trim().toLowerCase(), hash, company?.trim() || null],
    )
    // Send verification email
    const verifyToken = randomBytes(32).toString('hex')
    const hashedVerify = `verify_${hashToken(verifyToken)}`
    await pool.execute(
      'INSERT INTO client_sessions (id, client_id, ip, expires_at) VALUES (?, ?, ?, ?)',
      [hashedVerify, result.insertId, getClientIp(req), new Date(Date.now() + 24 * 60 * 60 * 1000)],
    )
    const verifyUrl = `${SITE_URL}/portal/reset-password?token=${verifyToken}&verify=1`
    try {
      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
      sendSmtpEmail.to = [{ email: email.trim(), name: name.trim() }]
      sendSmtpEmail.subject = 'Verify Your Ikarmic Portal Account'
      sendSmtpEmail.htmlContent = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2>Welcome, ${escapeHtml(name.trim())}!</h2>
          <p>Click below to verify your email and activate your account:</p>
          <p><a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px">Verify Email</a></p>
          <p style="color:#666;font-size:14px">This link expires in 24 hours.</p>
        </div>
      `
      await brevoClient.sendTransacEmail(sendSmtpEmail)
    } catch (emailErr) {
      console.error('[register] Verification email failed:', emailErr)
    }
    res.json({ ok: true, message: 'Registration successful. Please check your email to verify your account.' })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Email already registered.' })
    console.error('[/api/portal/register] DB error:', err)
    res.status(500).json({ error: 'Registration failed.' })
  }
})

app.post('/api/portal/logout', requireClient, async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader.slice(7)
  const hashed = hashToken(token)
  try {
    await pool.execute('DELETE FROM client_sessions WHERE id = ?', [hashed])
  } catch { /* ignore */ }
  res.json({ ok: true })
})

app.get('/api/portal/me', requireClient, (req, res) => {
  res.json(req.client)
})

app.post('/api/portal/verify-email', async (req, res) => {
  const { token } = req.body ?? {}
  if (!token) return res.status(400).json({ error: 'Token required.' })
  try {
    const hashed = `verify_${hashToken(token)}`
    const [rows] = await pool.execute(
      'SELECT client_id FROM client_sessions WHERE id = ? AND expires_at > NOW()',
      [hashed],
    )
    if (!rows.length) return res.status(400).json({ error: 'Invalid or expired verification link.' })
    const clientId = rows[0].client_id
    await pool.execute('UPDATE clients SET verified = 1 WHERE id = ?', [clientId])
    await pool.execute('DELETE FROM client_sessions WHERE id = ?', [hashed])
    // Create a real session so user is logged in after verifying
    const { token: sessionToken, expiresAt } = await createClientSession(clientId, getClientIp(req))
    const [clientRows] = await pool.execute('SELECT id, name, email, company FROM clients WHERE id = ?', [clientId])
    res.json({ token: sessionToken, expiresAt, user: clientRows[0] })
  } catch (err) {
    console.error('[/api/portal/verify-email] Error:', err)
    res.status(500).json({ error: 'Verification failed.' })
  }
})

app.post('/api/portal/forgot-password', clientLoginLimiter, async (req, res) => {
  const { email } = req.body ?? {}
  if (!email) return res.status(400).json({ error: 'Email required.' })
  // Always return success to prevent email enumeration
  try {
    const [rows] = await pool.execute('SELECT id, name FROM clients WHERE email = ?', [email.trim().toLowerCase()])
    if (rows.length) {
      const client = rows[0]
      const resetToken = randomBytes(32).toString('hex')
      const hashed = hashToken(resetToken)
      await pool.execute(
        'INSERT INTO client_sessions (id, client_id, ip, expires_at) VALUES (?, ?, ?, ?)',
        [`reset_${hashed}`, client.id, getClientIp(req), new Date(Date.now() + 60 * 60 * 1000)],
      )
      const resetUrl = `${SITE_URL}/portal/reset-password?token=${resetToken}`
      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
      sendSmtpEmail.to = [{ email: email.trim(), name: client.name }]
      sendSmtpEmail.subject = 'Reset Your Ikarmic Portal Password'
      sendSmtpEmail.htmlContent = `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2>Password Reset</h2>
          <p>Click below to reset your password:</p>
          <p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:6px">Reset Password</a></p>
          <p style="color:#666;font-size:14px">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
        </div>
      `
      await brevoClient.sendTransacEmail(sendSmtpEmail)
    }
  } catch (err) {
    console.error('[/api/portal/forgot-password] Error:', err)
  }
  res.json({ ok: true })
})

app.post('/api/portal/reset-password', async (req, res) => {
  const { token, password } = req.body ?? {}
  if (!token || !password) return res.status(400).json({ error: 'Token and password required.' })
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' })
  const hashed = `reset_${hashToken(token)}`
  try {
    const [rows] = await pool.execute(
      'SELECT client_id FROM client_sessions WHERE id = ? AND expires_at > NOW()',
      [hashed],
    )
    if (!rows.length) return res.status(400).json({ error: 'Invalid or expired reset link.' })
    const clientId = rows[0].client_id
    const hash = await bcrypt.hash(password, 12)
    await pool.execute('UPDATE clients SET password_hash = ?, verified = 1 WHERE id = ?', [hash, clientId])
    await pool.execute('DELETE FROM client_sessions WHERE id = ?', [hashed])
    res.json({ ok: true })
  } catch (err) {
    console.error('[/api/portal/reset-password] DB error:', err)
    res.status(500).json({ error: 'Failed to reset password.' })
  }
})

// ── Client Portal: Projects ──────────────────────────────

app.get('/api/portal/projects', requireClient, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, description, status, start_date, end_date, created_at FROM client_projects WHERE client_id = ? ORDER BY created_at DESC',
      [req.client.id],
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/portal/projects] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch projects.' })
  }
})

app.get('/api/portal/projects/:id', requireClient, async (req, res) => {
  const id = Number(req.params.id)
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM client_projects WHERE id = ? AND client_id = ?',
      [id, req.client.id],
    )
    if (!rows.length) return res.status(404).json({ error: 'Project not found.' })
    // Include documents and messages for this project
    const [docs] = await pool.execute(
      'SELECT id, name, file_path, file_size, mime_type, created_at FROM documents WHERE project_id = ? AND client_id = ?',
      [id, req.client.id],
    )
    const [messages] = await pool.execute(
      'SELECT id, sender_type, message, read_at, created_at FROM client_messages WHERE project_id = ? AND client_id = ? ORDER BY created_at ASC',
      [id, req.client.id],
    )
    res.json({ ...rows[0], documents: docs, messages })
  } catch (err) {
    console.error('[/api/portal/projects/:id] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch project.' })
  }
})

// ── Client Portal: Invoices ──────────────────────────────

app.get('/api/portal/invoices', requireClient, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, number, amount, currency, status, due_date, paid_date, description, created_at FROM invoices WHERE client_id = ? ORDER BY created_at DESC',
      [req.client.id],
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/portal/invoices] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch invoices.' })
  }
})

// ── Client Portal: Messages ──────────────────────────────

app.get('/api/portal/messages', requireClient, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT m.id, m.project_id, m.sender_type, m.message, m.read_at, m.created_at, p.name as project_name
       FROM client_messages m
       LEFT JOIN client_projects p ON p.id = m.project_id
       WHERE m.client_id = ? ORDER BY m.created_at DESC LIMIT 100`,
      [req.client.id],
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/portal/messages] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch messages.' })
  }
})

app.post('/api/portal/messages', requireClient, async (req, res) => {
  const { message, project_id } = req.body ?? {}
  if (!message?.trim()) return res.status(400).json({ error: 'Message required.' })
  if (message.length > 5000) return res.status(400).json({ error: 'Message too long.' })
  try {
    // Verify project belongs to client if specified
    if (project_id) {
      const [proj] = await pool.execute('SELECT id FROM client_projects WHERE id = ? AND client_id = ?', [project_id, req.client.id])
      if (!proj.length) return res.status(400).json({ error: 'Invalid project.' })
    }
    const [result] = await pool.execute(
      'INSERT INTO client_messages (client_id, project_id, sender_type, sender_id, message) VALUES (?, ?, ?, ?, ?)',
      [req.client.id, project_id || null, 'client', req.client.id, message.trim()],
    )
    res.json({ id: result.insertId })
  } catch (err) {
    console.error('[/api/portal/messages POST] DB error:', err)
    res.status(500).json({ error: 'Failed to send message.' })
  }
})

// ── Client Portal: Documents ─────────────────────────────

app.get('/api/portal/documents', requireClient, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, file_path, file_size, mime_type, project_id, created_at FROM documents WHERE client_id = ? ORDER BY created_at DESC',
      [req.client.id],
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/portal/documents] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch documents.' })
  }
})

// ── Admin: Client management endpoints ───────────────────

app.get('/api/admin/clients', requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, company, phone, verified, lead_id, created_at, last_login_at FROM clients ORDER BY created_at DESC',
    )
    res.json(rows)
  } catch (err) {
    console.error('[/api/admin/clients] DB error:', err)
    res.status(500).json({ error: 'Failed to fetch clients.' })
  }
})

app.post('/api/admin/clients/:id/projects', requireAdmin, async (req, res) => {
  const clientId = Number(req.params.id)
  const { name, description, status, start_date, end_date } = req.body ?? {}
  if (!name?.trim()) return res.status(400).json({ error: 'Project name required.' })
  try {
    const [result] = await pool.execute(
      'INSERT INTO client_projects (client_id, name, description, status, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)',
      [clientId, name.trim(), description || null, status || 'active', start_date || null, end_date || null],
    )
    await auditLog(req.adminUser.id, 'project_create', 'client_projects', result.insertId, { clientId, name: name.trim() }, getClientIp(req))
    res.json({ id: result.insertId })
  } catch (err) {
    console.error('[/api/admin/clients/:id/projects POST] DB error:', err)
    res.status(500).json({ error: 'Failed to create project.' })
  }
})

app.post('/api/admin/messages', requireAdmin, async (req, res) => {
  const { client_id, project_id, message } = req.body ?? {}
  if (!client_id || !message?.trim()) return res.status(400).json({ error: 'client_id and message required.' })
  if (message.length > 5000) return res.status(400).json({ error: 'Message too long.' })
  try {
    const [result] = await pool.execute(
      'INSERT INTO client_messages (client_id, project_id, sender_type, sender_id, message) VALUES (?, ?, ?, ?, ?)',
      [client_id, project_id || null, 'admin', req.adminUser.id, message.trim()],
    )
    res.json({ id: result.insertId })
  } catch (err) {
    console.error('[/api/admin/messages POST] DB error:', err)
    res.status(500).json({ error: 'Failed to send message.' })
  }
})

// ── Follow-up reminder check (called via cron or manual trigger) ─────

app.post('/api/admin/check-followups', requireAdmin, async (req, res) => {
  try {
    const [overdue] = await pool.execute(
      `SELECT id, name, email, follow_up_at, stage FROM leads
       WHERE follow_up_at < NOW() AND stage NOT IN ('won', 'lost')
       ORDER BY follow_up_at ASC LIMIT 50`,
    )
    if (overdue.length === 0) return res.json({ reminded: 0 })

    // Send digest email to admin
    const items = overdue.map(l => `<li><strong>${escapeHtml(l.name)}</strong> (${escapeHtml(l.email)}) — due ${new Date(l.follow_up_at).toLocaleDateString()}</li>`).join('')
    const sendSmtpEmail = new Brevo.SendSmtpEmail()
    sendSmtpEmail.sender = { name: FROM_NAME, email: FROM_EMAIL }
    sendSmtpEmail.to = [{ email: CONTACT_EMAIL }]
    sendSmtpEmail.subject = `[Ikarmic CRM] ${overdue.length} overdue follow-up${overdue.length > 1 ? 's' : ''}`
    sendSmtpEmail.htmlContent = `
      <div style="font-family:sans-serif">
        <h2>Overdue Follow-ups</h2>
        <ul>${items}</ul>
        <p><a href="${SITE_URL}/admin">Open CRM</a></p>
      </div>
    `
    await brevoClient.sendTransacEmail(sendSmtpEmail)
    res.json({ reminded: overdue.length })
  } catch (err) {
    console.error('[/api/admin/check-followups] Error:', err)
    res.status(500).json({ error: 'Failed to check follow-ups.' })
  }
})

// ── SPA fallback ─────────────────────────────────────────

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

// ── Start ────────────────────────────────────────────────

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Ikarmic server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to initialise database:', err)
    process.exit(1)
  })
