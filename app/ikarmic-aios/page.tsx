import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd, FAQJsonLd } from "next-seo";

export const metadata: Metadata = {
  title: "Ikarmic AIOS — Self-Hosted AI Workforce Platform",
  description: "Self-hosted, white-label Agentic Operating System. Deploy role-based AI employees with governance controls, audit trails, and human-in-the-loop approvals. No per-seat fees.",
  keywords: [
    "Ikarmic AIOS", "Agentic Operating System", "AI employees", "AI workforce platform",
    "self-hosted AI agents", "white-label AI platform", "AI governance controls",
    "AI sales development rep", "AI recruiter", "AI operations coordinator",
    "enterprise AI agents", "human-in-the-loop AI",
  ],
  alternates: { canonical: "https://ikarmic.com/ikarmic-aios" },
  openGraph: {
    title: "Ikarmic AIOS — Self-Hosted AI Workforce Platform | Ikarmic",
    description: "Self-hosted, white-label Agentic Operating System. Deploy role-based AI employees with governance controls, audit trails, and human-in-the-loop approvals.",
    url: "https://ikarmic.com/ikarmic-aios",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Ikarmic AIOS | Ikarmic", description: "Hire AI employees. Keep humans in control. Own your workforce.", images: ["/og-default.png"] },
};

const painPoints = [
  {
    title: "Repetitive Operational Work",
    desc: "Your team spends hours on lead sourcing, candidate screening, task tracking, and status reporting. AIOS employees handle this high-volume grind around the clock, freeing your people for high-judgment work.",
  },
  {
    title: "Inconsistent Outreach & Follow-up",
    desc: "Missed follow-ups cost revenue. The AI SDR follows structured playbooks, never drops a follow-up, and maintains CRM hygiene automatically — every lead gets the attention it deserves.",
  },
  {
    title: "Slow Hiring Pipelines",
    desc: "Recruiters drown in sourcing and screening. The AI Recruiter sources candidates, screens resumes against your job requirements, and schedules interviews continuously — dramatically reducing time-to-hire.",
  },
  {
    title: "Lack of Operational Visibility",
    desc: "Projects stall without anyone noticing. The AI Ops Coordinator continuously monitors tasks, flags delays the moment they arise, and provides clear status summaries — nothing falls through the cracks.",
  },
  {
    title: "Fear of Unsupervised AI",
    desc: "Enterprises cannot risk AI sending emails or updating systems without oversight. AIOS's governance gate requires human approval for sensitive actions, uses single-use approval tokens, and maintains an immutable audit trail for every decision.",
  },
  {
    title: "Vendor Lock-in",
    desc: "SaaS AI platforms mean you don't own your data or your instance. Ikarmic AIOS is self-hosted source code — you own everything. No per-seat pricing. No vendor dependency. No data leaving your infrastructure.",
  },
  {
    title: "Disconnected Tools",
    desc: "Your team toggles between CRM, email, calendar, ATS, and project tools. AIOS connects to all of them — HubSpot, Gmail, Google Calendar, Greenhouse, Linear — so your AI employees work with your real systems, not a walled garden.",
  },
];

const employees = [
  {
    name: "Aria",
    role: "AI Sales Development Rep",
    desc: "Your always-on sales assistant. She finds and qualifies leads, drafts personalised outreach, books meetings on your calendar, and keeps your CRM up to date. Aria never sends an email without your approval — every outbound message pauses in the approval inbox for a human to review before it goes out.",
    skills: ["Find & qualify leads", "Draft outreach emails", "Book meetings", "Update CRM", "Schedule follow-ups", "Log all activity"],
    icon: "M3 3v18h18 M8 12h8 M12 8v8 M12 4v16 M3 21l18-18",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    name: "Rio",
    role: "AI Recruiter — Talent Acquisition",
    desc: "Rio accelerates your hiring pipeline. He sources candidates across platforms, screens resumes against your job requirements, schedules interviews on your calendar, and updates your applicant tracking system. Rio reuses outreach and communication skills from Aria — showing the platform's reuse-first design.",
    skills: ["Source candidates", "Screen resumes", "Schedule interviews", "Update ATS", "Draft outreach", "Send email"],
    icon: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M21 21v-2a4 4 0 00-4-4H11 M8 7a4 4 0 100-8 4 4 0 000 8z",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Otto",
    role: "AI Ops Coordinator",
    desc: "Otto is your internal operations watchdog. He tracks all tasks and projects, flags delays or blockers the moment they arise, assigns work to team members, and produces clear status summaries so you always know where things stand. Otto uses the same shared communication skills to keep stakeholders informed.",
    skills: ["List project tasks", "Flag delays", "Assign tasks", "Summarise status", "Send email", "Schedule follow-ups"],
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const platformFeatures = [
  {
    title: "Governance & Trust",
    desc: "Every action an AI employee takes passes through a gate that checks permissions, confidence levels, and approval rules. Human-in-the-loop approvals with single-use tokens. Role-based access control. Confidence scoring escalates low-confidence actions. Immutable audit log. Rate limiting with per-tenant caps. CAN-SPAM compliance built in.",
    items: ["Human-in-the-loop approvals", "Single-use approval tokens", "Role-based access control", "Confidence scoring & escalation", "Immutable audit log", "Rate limiting & CAN-SPAM"],
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Integrations",
    desc: "AIOS connects to your existing tools so your AI employees work with your real systems. All credentials are encrypted at rest. Live validation ensures integrations work correctly.",
    items: ["HubSpot CRM — OAuth2", "Google Calendar — OAuth2", "Gmail / SendGrid — OAuth2", "Greenhouse ATS — API Key", "Linear — API Key", "Extensible — add Salesforce, Slack, Jira"],
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Skill Marketplace",
    desc: "New capabilities can be created without writing code. Browse, publish, and install skills across your organisation. AI employees can only use marketplace skills your tenant has installed.",
    items: ["Prompt Skills — define system prompts, no code", "Workflow Skills — chain existing skills together", "Code Skills — Python-powered, ships in the box", "Install-gated access — tenant-level control"],
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
];

const roadmap = [
  { title: "AI Support Agent", desc: "Inbox triage, knowledge-base-grounded replies, ticket escalation." },
  { title: "AI Finance Assistant", desc: "Invoice drafts, expense categorisation, reconciliation." },
  { title: "Autonomous Triggers", desc: "Cron schedules and webhook triggers so AI employees run on their own." },
  { title: "ROI Scorecards", desc: "Per-role cost accounting and outcome metrics." },
  { title: "Multi-channel Approvals", desc: "Approve actions from Slack, email, or SMS." },
  { title: "Visual Workflow Builder", desc: "Drag-and-drop canvas for composing multi-step automations." },
];

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://ikarmic.com" },
          { name: "Ikarmic AIOS", item: "https://ikarmic.com/ikarmic-aios" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Ikarmic AIOS"
        applicationCategory="BusinessApplication"
        operatingSystem="Self-hosted, Docker"
        description="Self-hosted, white-label Agentic Operating System. Deploy role-based AI employees with governance controls, audit trails, and human-in-the-loop approvals."
        url="https://ikarmic.com/ikarmic-aios"
        author={{ name: "Ikarmic AI" }}
        publisher={{ name: "Ikarmic AI" }}
        datePublished="2025-05-25"
        offers={{
          price: 0,
          priceCurrency: "INR",
        }}
      />
      <FAQJsonLd
        questions={[
          {
            question: "How is Ikarmic AIOS different from other AI agent platforms?",
            answer: "Ikarmic AIOS is self-hosted source code — you own everything. Unlike SaaS platforms, your data never leaves your infrastructure. It is white-label, governed by human-in-the-loop approvals, and priced per license (not per seat). Every action is audited. Every decision is logged.",
          },
          {
            question: "Can I customise AI employees for my specific business?",
            answer: "Yes. AI employees are pure configuration — role, persona, skills, KPIs, and permissions. Adding a new department requires only defining a new role and skills, not new infrastructure or agent code. The Skill Marketplace lets you create Prompt Skills, Workflow Skills, and Code Skills without writing new code.",
          },
          {
            question: "How does the governance and approval system work?",
            answer: "Every action an AI employee takes passes through a governance gate that checks permissions, confidence levels, and approval rules. Sensitive actions pause in a web approval inbox for human review. Approvals use single-use tokens. An immutable audit trail records every decision permanently.",
          },
          {
            question: "What does deployment look like?",
            answer: "Single-command deployment via Docker Compose. Your AI workforce runs on your own infrastructure with your own database. Cryptographic Ed25519 offline license keys validate your deployment without phoning home. Built-in JWT authentication with refresh tokens — no external identity provider needed.",
          },
        ]}
      />
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-700/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-700/8 blur-[100px] pointer-events-none" />
        <FadeUp>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Ikarmic Product</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white max-w-4xl leading-[1.08] tracking-tight">
              Hire AI Employees.<br />
              <span className="text-gradient">Keep Humans in Control.</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">
              Ikarmic AIOS is a self-hosted, white-label Agentic Operating System that lets any company deploy
              role-based AI employees — not chatbots, but AI staff that work alongside your human team with
              defined roles, skills, and governance controls.
            </p>
            <p className="mt-3 text-neutral-500 max-w-xl leading-relaxed">
              Every action is governed. Every decision is audited. Every email is approved by a human before
              it goes out. You own the code, the data, and the brand — no vendor lock-in, no per-seat fees.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]"
              >
                Schedule a Consultation
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 text-neutral-300 hover:text-white font-medium rounded-xl transition-all gap-2"
              >
                How it works
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* What is AIOS? */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">The Platform</p>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeLeft>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
              <h2 className="text-2xl font-bold text-white mb-4">What is Ikarmic AIOS?</h2>
              <p className="text-neutral-400 leading-relaxed mb-4">
                Ikarmic AIOS is an Agentic Operating System — a reusable platform where AI employees are not
                hardcoded bots but pure configuration. Each AI employee has a defined role, persona, set of
                skills, KPIs, and permissions.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                When you give one a goal, a built-in orchestrator decomposes it into subtasks, delegates to the
                right skills, and passes every action through a governance gate before execution. Think of it as
                hiring staff — but for the repetitive, high-volume operational work that consumes your human team.
              </p>
            </div>
          </FadeLeft>
          <FadeRight>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-indigo-900/40 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
              <div className="space-y-5">
                {[
                  { step: "01", title: "Set a goal", desc: "Type what you need done and pick an AI employee." },
                  { step: "02", title: "Orchestration", desc: "The CEO agent decomposes the goal and delegates subtasks." },
                  { step: "03", title: "Execution", desc: "The AI employee picks the right skills and begins working." },
                  { step: "04", title: "Governance gate", desc: "Every action checks permissions, confidence, and approval rules." },
                  { step: "05", title: "Audit trail", desc: "Everything is logged. Nothing is hidden." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 text-xs font-bold text-indigo-400 font-mono mt-0.5">
                      {s.step}
                    </span>
                    <div>
                      <p className="text-white font-medium text-sm">{s.title}</p>
                      <p className="text-neutral-400 text-sm mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-neutral-500 text-sm mt-6 pt-4 border-t border-neutral-800">
                The same platform runs sales, recruitment, and operations today. Adding a new department requires
                only new role definitions and skills — not new infrastructure or agent code.
              </p>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* Meet Your AI Employees */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Your AI Workforce</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Your AI Employees</h2>
          <p className="text-neutral-400 max-w-2xl leading-relaxed mb-10">
            Three AI employees running on the same platform, sharing skills where it makes sense.
            All governed. All auditable. All white-label.
          </p>
        </FadeUp>
        <Stagger className="grid lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {employees.map((emp) => (
            <StaggerItem key={emp.name}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-800 hover:from-indigo-800/40 hover:via-violet-800/30 hover:to-indigo-800/40 transition-all duration-500 group h-full">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${emp.gradient} bg-opacity-20 border border-white/10 flex items-center justify-center shrink-0`}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={emp.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{emp.name}</h3>
                      <p className="text-xs text-neutral-500">{emp.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-5 flex-1">{emp.desc}</p>
                  <div className="pt-4 border-t border-neutral-800">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {emp.skills.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 text-xs rounded-lg bg-neutral-800 text-neutral-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Pain Areas */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Why AIOS Exists</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Pain Areas We Address</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {painPoints.map((p) => (
            <StaggerItem key={p.title}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-red-900/30 transition-colors h-full">
                <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Platform Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Under the Hood</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Platform Features</h2>
        </FadeUp>
        <Stagger className="grid lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {platformFeatures.map((f) => (
            <StaggerItem key={f.title}>
              <div className="p-7 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/50 transition-colors h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mb-4">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-1">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-neutral-500">
                      <svg className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Ownership & White Label */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Ownership</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">You Own Everything.</h2>
          <p className="text-neutral-400 max-w-2xl leading-relaxed mb-10">
            Ikarmic AIOS is delivered as self-hosted source code, not a SaaS subscription. You run it on your own
            infrastructure with your own database. Your data never leaves your control.
          </p>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {[
            { title: "Self-hosted", desc: "Single-command deployment via Docker Compose. One command, and your AI workforce is running." },
            { title: "White-label", desc: "Customise company name, logo, colours, and email sender identity. Your team sees your brand, not ours." },
            { title: "No per-seat fees", desc: "One license, unlimited AI employees, unlimited actions. No surprise bills." },
            { title: "Offline license keys", desc: "Cryptographic Ed25519 keys validate your deployment without phoning home." },
          ].map((o) => (
            <StaggerItem key={o.title}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40 h-full">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 h-full">
                  <h3 className="font-semibold text-white mb-2">{o.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{o.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Security */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Security Built In</p>
          <h2 className="text-3xl font-bold text-white mb-6">Enterprise-Grade Security</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.06}>
          {[
            { label: "Encryption at rest", desc: "All credentials, tokens, and sensitive config are encrypted before storage." },
            { label: "JWT with refresh rotation", desc: "Secure session management with automatic token refresh." },
            { label: "Login throttling", desc: "Brute-force protection on authentication endpoints." },
            { label: "Immutable audit trail", desc: "Append-only logs. Every action is permanently recorded and searchable." },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="font-semibold text-white text-sm">{s.label}</p>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed pl-6">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Outcomes */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">The AIOS Advantage</p>
          <h2 className="text-3xl font-bold text-white mb-10">Why Enterprises Choose AIOS</h2>
        </FadeUp>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.08}>
          {[
            { value: "100%", label: "Data ownership — you own the source code and your data" },
            { value: "0", label: "Per-seat fees — one license, unlimited AI employees" },
            { value: "< 30 min", label: "Deploy your full AI workforce with one command" },
            { value: "∞", label: "Scalable — add new roles without new infrastructure" },
          ].map((o) => (
            <StaggerItem key={o.label}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                  <CountUp value={o.value} className="text-3xl font-bold text-indigo-400 mb-2 block" />
                  <p className="text-sm text-neutral-400">{o.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Roadmap */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">What's Next</p>
          <h2 className="text-3xl font-bold text-white mb-10">Roadmap</h2>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
          {roadmap.map((r) => (
            <StaggerItem key={r.title}>
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/30 transition-colors h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <h3 className="font-semibold text-white text-sm">{r.title}</h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{r.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Questions & Answers</p>
          <h2 className="text-3xl font-bold text-white mb-10">Frequently Asked Questions</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-2 gap-4" staggerDelay={0.06}>
          {[
            {
              q: "How is Ikarmic AIOS different from other AI agent platforms?",
              a: "Ikarmic AIOS is self-hosted source code — you own everything. Unlike SaaS platforms, your data never leaves your infrastructure. It is white-label, governed by human-in-the-loop approvals, and priced per license (not per seat). Every action is audited. Every decision is logged.",
            },
            {
              q: "Can I customise AI employees for my specific business?",
              a: "Yes. AI employees are pure configuration — role, persona, skills, KPIs, and permissions. Adding a new department requires only defining a new role and skills, not new infrastructure or agent code. The Skill Marketplace lets you create Prompt Skills, Workflow Skills, and Code Skills without writing new code.",
            },
            {
              q: "How does the governance and approval system work?",
              a: "Every action an AI employee takes passes through a governance gate that checks permissions, confidence levels, and approval rules. Sensitive actions pause in a web approval inbox for human review. Approvals use single-use tokens. An immutable audit trail records every decision permanently.",
            },
            {
              q: "What does deployment look like?",
              a: "Single-command deployment via Docker Compose. Your AI workforce runs on your own infrastructure with your own database. Cryptographic Ed25519 offline license keys validate your deployment without phoning home. Built-in JWT authentication with refresh tokens — no external identity provider needed.",
            },
          ].map((faq) => (
            <StaggerItem key={faq.q}>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-indigo-800/30 transition-colors h-full">
                <h3 className="font-semibold text-white text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Related Services */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Related Services</p>
          <h2 className="text-3xl font-bold text-white mb-8">The Services That Power AIOS</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "AI Chatbots & Conversational AI", href: "/services/ai-chatbots" },
              { label: "Business Automation", href: "/services/business-automation" },
              { label: "Custom AI Solutions", href: "/services/custom-ai" },
              { label: "Generative AI", href: "/services/generative-ai" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="px-6 py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-indigo-700 text-sm text-neutral-300 hover:text-white transition-all"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-24">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 to-neutral-900 border border-indigo-900/50 p-10 md:p-14 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-700/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-700/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Own Your AI Workforce
              </h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                Ikarmic AIOS is an AI workforce that works for you, on your terms, under your control.
                Self-hosted. White-label. Enterprise-governed. Let's talk about deploying AIOS in your organisation.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.4)]"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
