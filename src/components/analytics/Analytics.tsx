import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const STORAGE_KEY = 'ikarmic-cookie-consent';

type Prefs = { analytics: boolean; marketing: boolean };

// Extend window for gtag / fbq typings
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

function getPrefs(): Prefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (typeof p === 'object' && p !== null && 'analytics' in p) {
      return { analytics: Boolean(p.analytics), marketing: Boolean(p.marketing) };
    }
    // Backward compat: old plain-string format
    const granted = raw === 'granted';
    return { analytics: granted, marketing: granted };
  } catch {
    return null;
  }
}

const Analytics = () => {
  const { pathname } = useLocation();
  const [prefs, setPrefs] = useState<Prefs | null>(() => getPrefs());

  // Listen for consent changes dispatched by CookieConsent component
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail === 'object' && 'analytics' in detail) {
        setPrefs({ analytics: Boolean(detail.analytics), marketing: Boolean(detail.marketing) });
      } else {
        // Backward compat: old string-based event
        const granted = detail === 'granted';
        setPrefs({ analytics: granted, marketing: granted });
      }
    };
    window.addEventListener('cookie-consent-updated', handler);
    return () => window.removeEventListener('cookie-consent-updated', handler);
  }, []);

  // Fire GA4 page_view on SPA route change (only when analytics consented)
  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    if (prefs && !prefs.analytics) return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname, prefs]);

  // Fire Meta Pixel PageView on SPA route change (only when marketing consented)
  useEffect(() => {
    if (!META_PIXEL_ID || !prefs?.marketing || typeof window.fbq !== 'function') return;
    window.fbq('track', 'PageView');
  }, [pathname, prefs]);

  const pixelEnabled = prefs?.marketing === true;

  return (
    <Helmet>
      {/* ── Meta Pixel (injected only after explicit marketing consent) ── */}
      {META_PIXEL_ID && pixelEnabled && (
        <script>{`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}</script>
      )}
      {META_PIXEL_ID && pixelEnabled && (
        <noscript>{`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1" />`}</noscript>
      )}
    </Helmet>
  );
};

export default Analytics;
