// MegaMenu.jsx — accessible hover-intent desktop mega menu.
//
// UX standards observed:
// - Hover-intent open (150ms delay) and close (220ms delay) so brief
//   hover-pass-throughs don't open/close the panel.
// - "Bridge" zone above the panel keeps it open during diagonal mouse moves.
// - Focus and hover stay synced: focusing a trigger opens it; Esc closes.
// - Tab cycles through items inside the panel naturally.
// - ARIA: trigger uses button[aria-haspopup="true"][aria-expanded], panel
//   uses role="region" and aria-label, items are proper <a> links.
// - Outside-click closes.

const { useEffect: useMegaEffect, useState: useMegaState, useRef: useMegaRef } = React;

const MEGA_DATA = {
  Solutions: {
    columns: [
      {
        title: "Customer Experience",
        items: [
          { label: "CX & Support AI",          desc: "60% ticket deflection on day one",   iconPath: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z", href: "#" },
          { label: "AI-Powered Marketing",     desc: "4× content velocity",                 iconPath: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z", href: "#" },
        ],
      },
      {
        title: "Operations",
        items: [
          { label: "Intelligent Automation",   desc: "80% faster back-office processing",   iconPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9", href: "#" },
          { label: "Predictive Intelligence",  desc: "Forecast demand &amp; churn early",   iconPath: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z", href: "#" },
        ],
      },
      {
        title: "Platform",
        items: [
          { label: "Enterprise AI Platform",   desc: "POC to production in 8 weeks",        iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2", href: "#" },
          { label: "Governance Toolkit",       desc: "Bias checks &amp; privacy guardrails", iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", href: "#" },
        ],
      },
    ],
    featured: {
      eyebrow: "New",
      title: "Enterprise AI Platform v2",
      desc: "Production-grade RAG, evals, and observability bundled into one deployable stack. Ship your first agent in two weeks.",
      link: "See what's new",
      href: "#",
    },
    footMeta: [
      { label: "Deployed", value: "50+ orgs" },
      { label: "IP transfer", value: "100%" },
    ],
    footCta: { label: "All solutions", href: "#" },
  },
  Industries: {
    columns: [
      {
        title: "Commerce",
        items: [
          { label: "Retail &amp; E-Commerce",  desc: "Personalisation &amp; forecasting",    iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", href: "#" },
          { label: "Manufacturing",            desc: "Predictive maintenance &amp; quality", iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", href: "#" },
        ],
      },
      {
        title: "Knowledge",
        items: [
          { label: "Education",                desc: "Adaptive learning &amp; admin AI",     iconPath: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z", href: "#" },
          { label: "Technology",               desc: "AI-native product features &amp; MLOps", iconPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18", href: "#" },
        ],
      },
      {
        title: "Coming Soon",
        items: [
          { label: "Financial Services",       desc: "Risk &amp; fraud — Q3 2026",           iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", href: "#" },
          { label: "Healthcare",               desc: "Clinical workflows — Q4 2026",         iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", href: "#" },
        ],
      },
    ],
    featured: {
      eyebrow: "Industry Report",
      title: "AI maturity benchmarks across four sectors",
      desc: "Where retail, manufacturing, education, and tech actually are with AI adoption — and what it took to ship.",
      link: "Download the report",
      href: "#",
    },
    footMeta: [
      { label: "Sectors served", value: "4+" },
      { label: "Engagements", value: "50+" },
    ],
    footCta: { label: "All industries", href: "#" },
  },
  Services: {
    columns: [
      {
        title: "By Capability",
        items: [
          { label: "AI Chatbots",         desc: "24/7 conversational support",     iconPath: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", href: "#" },
          { label: "Business Automation", desc: "Eliminate repetitive work",       iconPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", href: "#" },
          { label: "Generative AI",       desc: "Content and code at scale",       iconPath: "M13 10V3L4 14h7v7l9-11h-7z", href: "#" },
        ],
      },
      {
        title: "Analytics & Custom",
        items: [
          { label: "Data Analytics",      desc: "Forecasting and predictive ML",   iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10", href: "#" },
          { label: "Custom AI",           desc: "Bespoke models, full IP transfer", iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", href: "#" },
          { label: "MLOps & Monitoring",  desc: "Production reliability",          iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2", href: "#" },
        ],
      },
      {
        title: "Resources",
        items: [
          { label: "Pricing",             desc: "Engagement models, weekly demos", iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", href: "#" },
          { label: "Documentation",       desc: "Integration & API references",    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", href: "#" },
          { label: "Case Studies",        desc: "Outcomes from past engagements",  iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", href: "#" },
        ],
      },
    ],
    featured: {
      eyebrow: "Featured",
      title: "60% ticket deflection from day one",
      desc: "How a retail brand cut support costs and lifted CSAT in 6 weeks with our chatbot framework.",
      link: "Read the case study",
      href: "#",
    },
    footMeta: [
      { label: "Median POC", value: "6 weeks" },
      { label: "Response SLA", value: "2 days" },
    ],
    footCta: { label: "Get a scoping call", href: "#" },
  },
};

function MegaMenu({ label = "Services", id = "mega-services" }) {
  const [open, setOpen] = useMegaState(false);
  const hostRef = useMegaRef(null);
  const openT = useMegaRef(null);
  const closeT = useMegaRef(null);

  function clearTimers() {
    if (openT.current) { clearTimeout(openT.current); openT.current = null; }
    if (closeT.current) { clearTimeout(closeT.current); closeT.current = null; }
  }
  function scheduleOpen() {
    clearTimers();
    openT.current = setTimeout(() => setOpen(true), 120);
  }
  function scheduleClose() {
    clearTimers();
    closeT.current = setTimeout(() => setOpen(false), 220);
  }

  // Esc + outside-click
  useMegaEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === "Escape") { setOpen(false); hostRef.current?.querySelector(".ik-mega-trigger")?.focus(); } }
    function onClick(e) { if (hostRef.current && !hostRef.current.contains(e.target)) setOpen(false); }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const data = MEGA_DATA[label] || MEGA_DATA.Services;
  const panelId = id + "-panel";

  return (
    <div
      className="ik-mega-host"
      ref={hostRef}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="ik-mega-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => { clearTimers(); setOpen(true); }}
      >
        {label}
        <Icon path={ICONS.chevronDown} size={12} stroke={2.5} />
      </button>

      <div
        className={"ik-mega-bridge" + (open ? " is-open" : "")}
        onMouseEnter={() => clearTimers()}
        onMouseLeave={scheduleClose}
      >
        <nav
          id={panelId}
          className="ik-mega-panel"
          role="region"
          aria-label={label + " menu"}
        >
          <div className="ik-mega-body">
            {data.columns.map((col) => (
              <div key={col.title} className="ik-mega-col">
                <p className="ik-mega-coltitle">{col.title}</p>
                {col.items.map((it) => (
                  <a key={it.label} href={it.href} className="ik-mega-item">
                    <span className="ik-mega-item-ico" aria-hidden="true">
                      <Icon path={it.iconPath} size={16} />
                    </span>
                    <span>
                      <span className="ik-mega-item-lab">{it.label}</span>
                      <span className="ik-mega-item-desc">{it.desc}</span>
                    </span>
                  </a>
                ))}
              </div>
            ))}

            <div className="ik-mega-featured">
              <span className="ik-mega-feat-eyebrow">{data.featured.eyebrow}</span>
              <h3 className="ik-mega-feat-title">{data.featured.title}</h3>
              <p className="ik-mega-feat-desc">{data.featured.desc}</p>
              <a href={data.featured.href} className="ik-mega-feat-link">
                {data.featured.link}
                <Icon path={ICONS.arrowRight} size={12} stroke={2.5} />
              </a>
            </div>
          </div>

          <div className="ik-mega-foot">
            <div className="ik-mega-foot-meta">
              {data.footMeta.map((m, i) => (
                <React.Fragment key={m.label}>
                  {i > 0 && <span className="sep"></span>}
                  <span><strong>{m.value}</strong> · {m.label}</span>
                </React.Fragment>
              ))}
            </div>
            <a href={data.footCta.href} className="ik-mega-foot-cta">
              {data.footCta.label}
              <Icon path={ICONS.arrowRight} size={12} stroke={2.5} />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}

window.MegaMenu = MegaMenu;
