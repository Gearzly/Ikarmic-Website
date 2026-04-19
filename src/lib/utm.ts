const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const

export interface UtmParams {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

/** Call once on app load to capture UTM params from the URL into sessionStorage. */
export function captureUtm(): void {
  const params = new URLSearchParams(window.location.search)
  for (const key of UTM_KEYS) {
    const val = params.get(key)
    if (val) sessionStorage.setItem(key, val)
  }
}

/** Returns stored UTM params (null if not set). */
export function getUtm(): UtmParams {
  return {
    utm_source: sessionStorage.getItem('utm_source'),
    utm_medium: sessionStorage.getItem('utm_medium'),
    utm_campaign: sessionStorage.getItem('utm_campaign'),
  }
}
