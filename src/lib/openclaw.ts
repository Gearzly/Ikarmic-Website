interface LeadPayload {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  source: string
}

/**
 * Fire-and-forget webhook to an OpenClaw gateway.
 * Set VITE_OPENCLAW_WEBHOOK_URL in .env.local (dev) or Netlify env vars (prod).
 * If the variable is absent or the request fails, this is silently a no-op —
 * Netlify Forms remains the primary lead capture.
 */
export function notifyLead(payload: LeadPayload): void {
  const url = import.meta.env.VITE_OPENCLAW_WEBHOOK_URL as string | undefined
  if (!url) return

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Webhook failure is intentionally swallowed — never surfaces to the user
  })
}
