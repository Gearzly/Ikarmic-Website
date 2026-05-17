"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useState } from "react";

const services = [
  { label: "AI Chatbots", desc: "24/7 support without extra headcount", href: "/services/ai-chatbots", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { label: "Business Automation", desc: "Eliminate repetitive manual work", href: "/services/business-automation", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { label: "Data Analytics", desc: "Surface insights from your data", href: "/services/data-analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { label: "Generative AI", desc: "Content and code at scale", href: "/services/generative-ai", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Custom AI", desc: "Built for your specific workflow", href: "/services/custom-ai", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

const industries = [
  { label: "Retail & E-Commerce", desc: "Personalisation, demand forecasting & CX AI", href: "/industries/retail", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
  { label: "Manufacturing", desc: "Predictive maintenance & quality automation", href: "/industries/manufacturing", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "Education", desc: "Adaptive learning & administrative AI", href: "/industries/education", icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
  { label: "Technology", desc: "AI-native product features & MLOps", href: "/industries/technology", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
];

const solutions = [
  { label: "CX & Support AI", desc: "60% ticket deflection on day one", href: "/solutions/cx-support-ai", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" },
  { label: "Intelligent Automation", desc: "80% faster back-office processing", href: "/solutions/intelligent-automation", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
  { label: "Predictive Intelligence", desc: "Forecast demand & churn early", href: "/solutions/predictive-intelligence", icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" },
  { label: "AI-Powered Marketing", desc: "4× content velocity", href: "/solutions/ai-powered-marketing", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" },
  { label: "Enterprise AI Platform", desc: "POC to production in 8 weeks", href: "/solutions/enterprise-ai-platform", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
];

function FlyoutMenu({ items, footer }: { items: typeof services; footer: { label: string; href: string } }) {
  const isOdd = items.length % 2 === 1;
  return (
    /* pt-3 creates an invisible mouse-bridge over the gap so the menu stays open */
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[480px]">
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/[0.06]" style={{ background: "linear-gradient(160deg, #1a1a2e 0%, #16161a 100%)" }}>
        {/* Accent top bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
        <div className="p-2">
          <div className="grid grid-cols-2 gap-1">
            {items.map((item, i) => {
              const lastOdd = isOdd && i === items.length - 1;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group/item flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.05] transition-colors${lastOdd ? " col-span-2" : ""}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover/item:bg-indigo-500/20 group-hover/item:border-indigo-500/40 transition-all">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-100 group-hover/item:text-white transition-colors">{item.label}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-snug truncate">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Footer */}
        <div className="mx-2 mb-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between">
          <p className="text-xs text-neutral-600">Not sure which fits?</p>
          <Link href={footer.href} className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            {footer.label} →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">About</Link>

          {/* Services flyout */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1 group-hover:text-white">
              Services
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="hidden group-hover:block">
              <FlyoutMenu items={services} footer={{ label: "All Services", href: "/services" }} />
            </div>
          </div>

          {/* Solutions flyout */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1 group-hover:text-white">
              Solutions
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="hidden group-hover:block">
              <FlyoutMenu items={solutions} footer={{ label: "All Solutions", href: "/solutions" }} />
            </div>
          </div>

          {/* Industries flyout */}
          <div className="relative group">
            <button className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1 group-hover:text-white">
              Industries
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="hidden group-hover:block">
              <FlyoutMenu items={industries} footer={{ label: "All Industries", href: "/industries" }} />
            </div>
          </div>

          <Link href="/blog" className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">Blog</Link>
          <Link href="/contact" className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">Contact</Link>
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Start a project
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-6 py-4 space-y-1 overflow-y-auto max-h-[calc(100dvh-4rem)]">
          <Link href="/" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">Home</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">About</Link>

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Services" ? null : "Services")}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Services
              <svg className={`w-3 h-3 transition-transform ${mobileExpanded === "Services" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileExpanded === "Services" && (
              <div className="pl-4 space-y-1 pb-1">
                {services.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-400 hover:text-white">
                    {s.label}
                  </Link>
                ))}
                <Link href="/services" onClick={() => setOpen(false)} className="block px-3 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  All Services →
                </Link>
              </div>
            )}
          </div>

          {/* Solutions accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Solutions" ? null : "Solutions")}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Solutions
              <svg className={`w-3 h-3 transition-transform ${mobileExpanded === "Solutions" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileExpanded === "Solutions" && (
              <div className="pl-4 space-y-1 pb-1">
                {solutions.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-400 hover:text-white">
                    {s.label}
                  </Link>
                ))}
                <Link href="/solutions" onClick={() => setOpen(false)} className="block px-3 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  All Solutions →
                </Link>
              </div>
            )}
          </div>

          {/* Industries accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "Industries" ? null : "Industries")}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-neutral-300 hover:text-white"
            >
              Industries
              <svg className={`w-3 h-3 transition-transform ${mobileExpanded === "Industries" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileExpanded === "Industries" && (
              <div className="pl-4 space-y-1 pb-1">
                {industries.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-400 hover:text-white">
                    {s.label}
                  </Link>
                ))}
                <Link href="/industries" onClick={() => setOpen(false)} className="block px-3 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                  All Industries →
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">Blog</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:text-white">Contact</Link>
        </div>
      )}
    </header>
  );
}

