"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export type CookieConsent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

const COOKIE_NAME = "ikarmic-cookie-consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function readConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)")
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export function writeConsent(consent: CookieConsent) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(consent)
  )}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent("cookie-consent-update", { detail: consent })
  );
}

function Toggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
      <div className="min-w-0">
        <p className="text-white font-semibold text-sm">{title}</p>
        <p className="text-neutral-500 text-xs mt-0.5 leading-relaxed">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${title} cookies`}
        onClick={() => onChange(!checked)}
        className={`shrink-0 mt-0.5 relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
          checked ? "bg-indigo-600" : "bg-neutral-700"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const openPreferences = useCallback(() => {
    const c = readConsent();
    setAnalytics(c?.analytics ?? false);
    setMarketing(c?.marketing ?? false);
    setShowPreferences(true);
    setVisible(true);
  }, []);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    } else {
      // Re-dispatch stored consent so analytics integrations can initialise
      window.dispatchEvent(
        new CustomEvent("cookie-consent-update", { detail: existing })
      );
    }

    const handler = () => openPreferences();
    window.addEventListener("cookie-consent-open", handler);
    return () => window.removeEventListener("cookie-consent-open", handler);
  }, [openPreferences]);

  const acceptAll = useCallback(() => {
    writeConsent({ essential: true, analytics: true, marketing: true, ts: Date.now() });
    setVisible(false);
    setShowPreferences(false);
  }, []);

  const rejectAll = useCallback(() => {
    writeConsent({ essential: true, analytics: false, marketing: false, ts: Date.now() });
    setVisible(false);
    setShowPreferences(false);
  }, []);

  const savePreferences = useCallback(() => {
    writeConsent({ essential: true, analytics, marketing, ts: Date.now() });
    setVisible(false);
    setShowPreferences(false);
  }, [analytics, marketing]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      {showPreferences && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
          aria-hidden="true"
          onClick={() => setShowPreferences(false)}
        />
      )}

      {showPreferences ? (
        /* ── Preferences panel ── */
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="fixed inset-x-4 bottom-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] z-[999] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-6"
        >
          <h2 className="text-white font-bold text-lg mb-1">Cookie Preferences</h2>
          <p className="text-neutral-400 text-sm mb-5 leading-relaxed">
            Choose which cookies you allow. Your preferences are saved for one year.{" "}
            <Link
              href="/privacy#cookies"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
            >
              Cookie Policy
            </Link>
          </p>

          <div className="space-y-3 mb-6">
            {/* Essential — always on */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
              <div>
                <p className="text-white font-semibold text-sm">Essential</p>
                <p className="text-neutral-500 text-xs mt-0.5 leading-relaxed">
                  Required for the site to work correctly. Cannot be disabled.
                </p>
              </div>
              <span className="shrink-0 mt-0.5 text-xs px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 whitespace-nowrap">
                Always on
              </span>
            </div>

            <Toggle
              title="Analytics"
              description="Helps us understand how visitors use the site via Google Analytics 4. Data is anonymised."
              checked={analytics}
              onChange={setAnalytics}
            />

            <Toggle
              title="Marketing"
              description="Used for advertising measurement via Meta Pixel. Only activated when you enable this."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={savePreferences}
              className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            >
              Save preferences
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-700 hover:border-neutral-600 text-neutral-300 hover:text-white text-sm font-semibold transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>
      ) : (
        /* ── Main banner ── */
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[999] border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-md px-4 py-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-neutral-300 flex-1 leading-relaxed">
              We use cookies to improve your experience and analyse site traffic. Essential cookies are
              always active.{" "}
              <Link
                href="/privacy#cookies"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
              >
                Learn more
              </Link>
            </p>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => openPreferences()}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-600 transition-colors"
              >
                Manage preferences
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-600 transition-colors"
              >
                Reject non-essential
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
