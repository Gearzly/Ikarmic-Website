import { useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'ikarmic-cookie-consent';

export type CookiePrefs = {
  analytics: boolean;
  marketing: boolean;
  version: number;
  savedAt: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function getStoredPrefs(): CookiePrefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null && 'analytics' in parsed) {
      return parsed as CookiePrefs;
    }
    // Backward compat: old plain-string format
    const granted = raw === 'granted';
    return { analytics: granted, marketing: granted, version: 1, savedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}

function persistPrefs(prefs: Pick<CookiePrefs, 'analytics' | 'marketing'>): CookiePrefs {
  const full: CookiePrefs = { ...prefs, version: 1, savedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  return full;
}

function applyGtagConsent(prefs: Pick<CookiePrefs, 'analytics' | 'marketing'>) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    });
  }
}

function Toggle({
  id,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={[
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]',
        disabled
          ? 'cursor-not-allowed opacity-60 bg-indigo-500'
          : checked
          ? 'cursor-pointer bg-indigo-600'
          : 'cursor-pointer bg-white/20',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out',
          checked ? 'translate-x-5' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(() => !getStoredPrefs());
  const [managing, setManaging] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const commit = (prefs: Pick<CookiePrefs, 'analytics' | 'marketing'>) => {
    const saved = persistPrefs(prefs);
    applyGtagConsent(saved);
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: saved }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-[#0d1117]/95 backdrop-blur-md shadow-2xl overflow-hidden">
        {!managing ? (
          /* ── Banner ── */
          <div className="px-5 py-5">
            <p className="text-sm font-semibold text-white mb-1">We use cookies</p>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              We use essential, analytics, and marketing cookies to improve your experience and
              measure site performance. Read our{' '}
              <Link
                to="/privacy"
                className="underline underline-offset-2 text-indigo-400 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy#cookies"
                className="underline underline-offset-2 text-indigo-400 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded"
              >
                Cookie Notice
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => commit({ analytics: true, marketing: true })}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => commit({ analytics: false, marketing: false })}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Manage preferences
              </button>
            </div>
          </div>
        ) : (
          /* ── Preferences panel ── */
          <div className="px-5 py-5">
            <p className="text-sm font-semibold text-white mb-1">Cookie preferences</p>
            <p className="text-xs text-white/50 mb-5 leading-relaxed">
              Choose which cookies you allow. Essential cookies cannot be disabled as they are
              required for the site to function.
            </p>

            <div className="space-y-4 mb-6">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">Essential</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                    Navigation, security, and your saved preferences. Cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <span className="text-xs text-indigo-400 font-medium whitespace-nowrap">Always on</span>
                  <Toggle id="toggle-essential" checked disabled />
                </div>
              </div>

              <div className="border-t border-white/5" />

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">Analytics</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                    Google Analytics 4 — helps us understand page performance. No personally
                    identifiable data is transmitted.
                  </p>
                </div>
                <div className="shrink-0 mt-0.5">
                  <Toggle id="toggle-analytics" checked={analytics} onChange={setAnalytics} />
                </div>
              </div>

              <div className="border-t border-white/5" />

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">Marketing</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                    Meta Pixel and advertising platforms — used to measure campaign effectiveness
                    and personalise relevant ads. Requires explicit consent.
                  </p>
                </div>
                <div className="shrink-0 mt-0.5">
                  <Toggle id="toggle-marketing" checked={marketing} onChange={setMarketing} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => commit({ analytics, marketing })}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={() => commit({ analytics: true, marketing: true })}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={() => commit({ analytics: false, marketing: false })}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Reject all
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
