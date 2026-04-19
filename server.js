import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createPool } from 'mysql2/promise'
import { randomBytes, timingSafeEqual } from 'crypto'
import * as Brevo from '@getbrevo/brevo'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

// ── MySQL connection pool ────────────────────────────────
const pool = createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
  waitForConnections: true,
  connectionLimit: 5,
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
}

// ── Brevo transactional email client ────────────────────
const brevoClient = new Brevo.TransactionalEmailsApi()
brevoClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY ?? ''

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@ikarmic.ai'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@ikarmic.ai'
const FROM_NAME = 'Ikarmic Website'

// ── In-memory admin session tokens ──────────────────────
const tokenStore = new Set()

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

function requireAdmin(req, res, next) {
  const auth = req.headers['authorization'] ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
  if (!token || !tokenStore.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// ── Middleware ───────────────────────────────────────────

app.use(express.json({ limit: '16kb' }))
app.use(express.static(join(__dirname, 'dist')))

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

// ── Admin Auth ───────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body ?? {}
  const adminUsername = process.env.ADMIN_USERNAME ?? ''
  const adminPassword = process.env.ADMIN_PASSWORD ?? ''

  if (!username || !password || !adminUsername || !adminPassword) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  let userMatch = false
  let passMatch = false
  try {
    userMatch = timingSafeEqual(
      Buffer.from(username),
      Buffer.from(adminUsername),
    )
    passMatch = timingSafeEqual(
      Buffer.from(password),
      Buffer.from(adminPassword),
    )
  } catch {
    userMatch = false
    passMatch = false
  }

  if (!userMatch || !passMatch) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const token = randomBytes(32).toString('hex')
  tokenStore.add(token)
  res.json({ token })
})

app.post('/api/admin/logout', requireAdmin, (req, res) => {
  const token = (req.headers['authorization'] ?? '').slice(7)
  tokenStore.delete(token)
  res.json({ ok: true })
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
    await pool.execute('UPDATE leads SET stage = ? WHERE id = ?', [stage, id])
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
    res.json({ id: result.insertId })
  } catch (err) {
    console.error('[/api/admin/leads/:id/notes POST] DB error:', err)
    res.status(500).json({ error: 'Failed to add note.' })
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
