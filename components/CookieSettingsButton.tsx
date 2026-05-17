"use client";

export default function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event("cookie-consent-open"))}
      className="text-sm text-neutral-400 hover:text-white transition-colors text-left"
    >
      Cookie Settings
    </button>
  );
}
