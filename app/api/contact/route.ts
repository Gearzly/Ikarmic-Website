import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ── Input validation ────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim().slice(0, 2000)
}

// ── POST /api/contact ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, phone, service, message } = body

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 },
      )
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 },
      )
    }

    // Sanitize all inputs
    const cleanName = sanitize(name)
    const cleanEmail = sanitize(email)
    const cleanCompany = company ? sanitize(String(company)) : '—'
    const cleanPhone = phone ? sanitize(String(phone)) : '—'
    const cleanService = service ? sanitize(String(service)) : '—'
    const cleanMessage = sanitize(message)

    // ── SMTP Transport ──────────────────────────────────────────────────────
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT ?? 587)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('[contact/route] Missing SMTP config')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
      authMethod: 'LOGIN',
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      tls: { rejectUnauthorized: false },
    })

    await transporter.verify()

    // ── Email to Ikarmic team ───────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Ikarmic Website" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_TO ?? 'hello@ikarmic.com',
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `New enquiry from ${cleanName}${cleanCompany !== '—' ? ` · ${cleanCompany}` : ''}`,
      text: [
        `Name:     ${cleanName}`,
        `Email:    ${cleanEmail}`,
        `Company:  ${cleanCompany}`,
        `Phone:    ${cleanPhone}`,
        `Service:  ${cleanService}`,
        ``,
        `Message:`,
        cleanMessage,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#e5e5e5;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 32px;">
            <h1 style="margin:0;font-size:20px;color:#fff;font-weight:700;">New Contact Enquiry</h1>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Received via ikarmic.com/contact</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#a3a3a3;width:100px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:600;">${cleanName}</td></tr>
              <tr><td style="padding:8px 0;color:#a3a3a3;">Email</td><td style="padding:8px 0;"><a href="mailto:${cleanEmail}" style="color:#818cf8;text-decoration:none;">${cleanEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#a3a3a3;">Company</td><td style="padding:8px 0;color:#fff;">${cleanCompany}</td></tr>
              <tr><td style="padding:8px 0;color:#a3a3a3;">Phone</td><td style="padding:8px 0;color:#fff;">${cleanPhone}</td></tr>
              <tr><td style="padding:8px 0;color:#a3a3a3;">Interest</td><td style="padding:8px 0;color:#fff;">${cleanService}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #27272a;margin:24px 0;" />
            <p style="margin:0 0 8px;color:#a3a3a3;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
            <p style="margin:0;color:#e5e5e5;line-height:1.7;white-space:pre-wrap;">${cleanMessage}</p>
          </div>
          <div style="padding:16px 32px;background:#111111;font-size:12px;color:#52525b;text-align:center;">
            Reply directly to this email to respond to ${cleanName}.
          </div>
        </div>
      `,
    })

    // ── Auto-reply to the sender ────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Ikarmic AI" <${process.env.SMTP_FROM}>`,
      to: `"${cleanName}" <${cleanEmail}>`,
      subject: 'We received your message — Ikarmic AI',
      text: [
        `Hi ${cleanName},`,
        ``,
        `Thanks for reaching out. We received your message and will get back to you within 2 business days.`,
        ``,
        `In the meantime, feel free to explore what we do:`,
        `https://ikarmic.com/services`,
        ``,
        `— The Ikarmic AI Team`,
        `hello@ikarmic.com`,
      ].join('\n'),
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0f;color:#e5e5e5;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 32px;">
            <h1 style="margin:0;font-size:20px;color:#fff;font-weight:700;">Message received ✓</h1>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 16px;color:#e5e5e5;">Hi <strong>${cleanName}</strong>,</p>
            <p style="margin:0 0 16px;color:#a3a3a3;line-height:1.7;">Thanks for reaching out. We received your message and will get back to you within <strong style="color:#e5e5e5;">2 business days</strong>.</p>
            <a href="https://ikarmic.com/services" style="display:inline-block;margin-top:8px;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Explore our services →</a>
          </div>
          <div style="padding:16px 32px;background:#111111;font-size:12px;color:#52525b;text-align:center;">
            Ikarmic AI · Hyderabad, India · <a href="mailto:hello@ikarmic.com" style="color:#52525b;">hello@ikarmic.com</a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] SMTP error:', err)
    return NextResponse.json(
      {
        error:
          'Failed to send message. Please try emailing us directly at hello@ikarmic.com.',
      },
      { status: 500 },
    )
  }
}
