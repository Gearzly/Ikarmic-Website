import type { Metadata } from "next";
import Link from "next/link";
import { FadeUp, FadeLeft, FadeRight, Stagger, StaggerItem, CountUp } from "@/components/AnimateIn";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd, FAQJsonLd } from "next-seo";

export const metadata: Metadata = {
  title: "Ikarmic AIOS — Hire AI Employees. Keep Humans in Control.",
  description: "Deploy role-based AI employees — SDR, Recruiter, Ops Coordinator, and Support Agent — that work with your existing tools. Human-in-the-loop governance. Immutable audit trails. SaaS pricing coming soon.",
  keywords: [
    "Ikarmic AIOS", "Agentic Operating System", "AI employees", "AI workforce platform",
    "AI sales development rep", "AI recruiter", "AI operations coordinator",
    "AI support agent", "enterprise AI agents", "human-in-the-loop AI",
    "AI governance controls", "AI employee platform",
  ],
  alternates: { canonical: "https://ikarmic.com/ikarmic-aios" },
  openGraph: {
    title: "Ikarmic AIOS — Hire AI Employees. Keep Humans in Control. | Ikarmic",
    description: "Deploy role-based AI employees that work with your existing tools. Human-in-the-loop governance, immutable audit trails, and AI staff that follow your business rules.",
    url: "https://ikarmic.com/ikarmic-aios",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Ikarmic AIOS | Ikarmic", description: "Hire AI employees. Keep humans in control.", images: ["/og-default.png"] },
};

const painPoints = [
  {
    title: "Repetitive Operational Work",
    desc: "Your team spends hours on lead sourcing, candidate screening, task tracking, and ticket triage. AIOS employees handle this high-volume grind around the clock, freeing your people for high-judgement work.",
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
    title: "Support Backlogs",
    desc: "Support teams waste hours triaging repetitive tickets. The AI Support Agent classifies incoming issues, searches your knowledge base, drafts replies, and escalates only what needs human judgement — first-response times drop to minutes.",
  },
  {
    title: "Lack of Operational Visibility",
    desc: "Projects stall without anyone noticing. The AI Ops Coordinator continuously monitors tasks, flags delays the moment they arise, and provides clear status summaries — nothing falls through the cracks.",
  },
  {
    title: "Fear of Unsupervised AI",
    desc: "Businesses cannot risk AI sending emails or updating systems without oversight. Every action passes through a governance gate. Sensitive actions pause for human approval with single-use tokens. An immutable audit trail records every decision permanently.",
  },
  {
    title: "Disconnected Tools",
    desc: "Your team toggles between CRM, email, calendar, ATS, and project tools. AIOS connects to all of them through 250+ integrations — HubSpot, Gmail, Google Calendar, Greenhouse, Linear — so your AI employees work with your real systems, not a walled garden.",
  },
];

const employees = [
  {
    name: "Aria",
    role: "AI Sales Development Rep",
    desc: "Your always-on sales assistant. She finds and qualifies leads, drafts personalised outreach, books meetings on your calendar, and keeps your CRM up to date. Aria never sends an email without your approval — every outbound message pauses in the approval inbox for a human to review before it goes out.",
    skills: ["Find & qualify leads", "Draft outreach emails", "Book meetings", "Update CRM", "Schedule follow-ups", "Log all activity"],
    icon: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M8 7a4 4 0 100-8 4 4 0 000 8z",
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
  {
    name: "Sage",
    role: "AI Support Agent",
    desc: "Sage is your first line of support. He triages incoming tickets, searches your knowledge base for relevant answers, drafts support replies grounded in your documentation, and escalates complex issues when human expertise is required. Every escalation includes full context — no repeating yourself.",
    skills: ["Triage tickets", "Search knowledge base", "Draft support replies", "Escalate tickets", "Send email", "Log activity"],
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    gradient: "from-amber-500 to-orange-500",
  },
];

const platformFeatures = [
  {
    title: "Governance & Trust",
    desc: "Every action an AI employee takes passes through a gate that checks permissions, confidence levels, and approval rules. You decide what runs automatically and what needs human sign-off.",
    items: ["Human-in-the-loop approvals", "Single-use approval tokens", "Role-based access control", "Confidence scoring & escalation", "Immutable audit log", "Rate limiting & compliance"],
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "250+ Integrations",
    desc: "AIOS connects to your existing tools so your AI employees work with your real systems. All credentials are encrypted at rest with per-tenant isolation.",
    items: ["HubSpot CRM", "Gmail & Google Calendar", "SendGrid", "Greenhouse ATS", "Linear", "250+ more via Composio"],
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Skill Ecosystem",
    desc: "20+ built-in skills shipping today. New capabilities can be created without writing code — Prompt Skills, Workflow Skills, and Code Skills. AI employees reuse the same skills across roles.",
    items: ["Prompt Skills — no-code system prompts", "Workflow Skills — chain existing skills", "Code Skills — Python-powered, in the box", "Skills are reusable across roles"],
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
];

const whatIsBuilt = [
  { label: "AI Employees", value: "4", suffix: " pre-built roles shipped" },
  { label: "Skills", value: "20+", suffix: " executable, reusable skills" },
  { label: "Integrations", value: "250+", suffix: " tools via Composio" },
  { label: "Database", value: "46", suffix: " migrations with full RLS" },
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
        operatingSystem="Web"
        description="A hosted Agentic Operating System that lets businesses deploy role-based AI employees — SDR, Recruiter, Ops Coordinator, and Support Agent — with governance controls and human-in-the-loop approvals."
        url="https://ikarmic.com/ikarmic-aios"
        author={{ name: "Ikarmic AI" }}
        publisher={{ name: "Ikarmic AI" }}
        datePublished="2025-05-25"
      />
      <FAQJsonLd
        questions={[
          {
            question: "How is Ikarmic AIOS different from other AI agent platforms?",
            answer: "Ikarmic AIOS is not a chatbot builder or a prompt-workflow tool. It is a full Agentic Operating System with pre-built AI employee roles (SDR, Recruiter, Ops, Support), a governance engine that enforces human approval for sensitive actions, and immutable audit trails. Unlike single-purpose AI tools, the same platform runs sales, recruitment, operations, and support.",
          },
          {
            question: "Can I customise AI employees for my specific business?",
            answer: "Yes. AI employees are pure configuration — role, persona, skills, KPIs, and permissions. Adding a new department requires only defining a new role and skills, not new infrastructure or agent code. The Skill Ecosystem lets you create Prompt Skills, Workflow Skills, and Code Skills.",
          },
          {
            question: "How does the governance and approval system work?",
            answer: "Every action an AI employee takes passes through a governance gate that checks permissions, confidence levels, and approval rules. Sensitive actions pause in a web approval inbox for human review. Approvals use single-use tokens bound to the exact action. An immutable audit trail records every decision permanently.",
          },
          {
            question: "How do I get started?",
            answer: "Ikarmic AIOS is a hosted platform. Reach out through our contact form to discuss your requirements, team size, and which AI employees you need. We are currently onboarding early customers and working on a self-serve SaaS subscription model.",
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
              Ikarmic AIOS is a hosted Agentic Operating System that lets any business deploy
              role-based AI employees — not chatbots, but AI staff with defined roles, skills,
              and governance controls that work alongside your human team.
            </p>
            <p className="mt-3 text-neutral-500 max-w-xl leading-relaxed">
              Every action is governed. Every decision is audited. Sensitive actions require
              human approval before executing. Four pre-built AI employees ship today — SDR,
              Recruiter, Ops Coordinator, and Support Agent.
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
                The same platform runs sales, recruitment, operations, and support today. Adding a new department
                requires only new role definitions and skills — not new infrastructure or agent code.
              </p>
            </div>
          </FadeRight>
        </div>
      </section>

      {/* What's Built — Proof Points */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">What's Built Today</p>
          <h2 className="text-3xl font-bold text-white mb-10">Production-Ready, Not a Prototype</h2>
        </FadeUp>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.08}>
          {whatIsBuilt.map((o) => (
            <StaggerItem key={o.label}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40 h-full">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                  <span className="text-3xl font-bold text-indigo-400 mb-2 block">{o.value}</span>
                  <p className="text-xs text-neutral-500 mb-1">{o.label}</p>
                  <p className="text-sm text-neutral-400">{o.suffix}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Meet Your AI Employees */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Your AI Workforce</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Your AI Employees</h2>
          <p className="text-neutral-400 max-w-2xl leading-relaxed mb-10">
            Four AI employees running on the same platform, sharing skills where it makes sense.
            All governed. All auditable. All configured — not coded.
          </p>
        </FadeUp>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
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
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Why AIOS Exists</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Problems We Solve</h2>
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
      <section className="max-w-7xl mx-auto px-6 py-8">
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

      {/* Security */}
      <section className="max-w-7xl mx-auto px-6 py-8">
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
          <h2 className="text-3xl font-bold text-white mb-10">Why Businesses Choose AIOS</h2>
        </FadeUp>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6" staggerDelay={0.08}>
          {[
            { value: "4", label: "AI employee roles — SDR, Recruiter, Ops, and Support — shipping today" },
            { value: "250+", label: "Tool integrations so AI employees work with your real systems" },
            { value: "20+", label: "Built-in skills that any role can reuse across departments" },
            { value: "100%", label: "Governed — every action goes through permissions, confidence, and approval checks" },
          ].map((o) => (
            <StaggerItem key={o.label}>
              <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-600/40 via-violet-600/20 to-indigo-600/40 h-full">
                <div className="rounded-[calc(1rem-1px)] bg-neutral-950 p-6 text-center h-full">
                  <CountUp value={o.value} className="text-3xl font-bold text-indigo-400 mb-2 block" />
                  <p className="text-sm text-neutral-400">{o.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* SaaS Pricing Coming Soon */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/40 to-neutral-900 border border-emerald-900/50 p-10 md:p-14 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-700/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-teal-700/10 blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Coming Soon</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                SaaS Pricing Is On the Way
              </h2>
              <p className="text-neutral-400 mb-3 max-w-xl mx-auto leading-relaxed">
                We are building a self-serve SaaS subscription model with per-month pricing.
                Choose your AI employees, pick a plan, and get started in minutes — no sales calls required.
              </p>
              <p className="text-neutral-500 text-sm max-w-xl mx-auto leading-relaxed">
                Until then, we are onboarding early customers directly. Reach out and we will get
                your AI workforce running while the self-serve experience is being finalised.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <FadeUp>
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Questions & Answers</p>
          <h2 className="text-3xl font-bold text-white mb-10">Frequently Asked Questions</h2>
        </FadeUp>
        <Stagger className="grid md:grid-cols-2 gap-4" staggerDelay={0.06}>
          {[
            {
              q: "How is Ikarmic AIOS different from other AI agent platforms?",
              a: "Ikarmic AIOS is not a chatbot builder or a prompt-workflow tool. It is a full Agentic Operating System with pre-built AI employee roles (SDR, Recruiter, Ops, Support), a governance engine that enforces human approval for sensitive actions, and immutable audit trails. Unlike single-purpose AI tools, the same platform runs sales, recruitment, operations, and support.",
            },
            {
              q: "Can I customise AI employees for my specific business?",
              a: "Yes. AI employees are pure configuration — role, persona, skills, KPIs, and permissions. Adding a new department requires only defining a new role and skills, not new infrastructure or agent code. The Skill Ecosystem lets you create Prompt Skills, Workflow Skills, and Code Skills.",
            },
            {
              q: "How does the governance and approval system work?",
              a: "Every action an AI employee takes passes through a governance gate that checks permissions, confidence levels, and approval rules. Sensitive actions pause in a web approval inbox for human review. Approvals use single-use tokens. An immutable audit trail records every decision permanently.",
            },
            {
              q: "How do I get started?",
              a: "Ikarmic AIOS is a hosted platform. Reach out through our contact form to discuss your requirements, team size, and which AI employees you need. We are currently onboarding early customers and building a self-serve SaaS subscription experience with monthly pricing.",
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
                Put AI Employees to Work
              </h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                Four pre-built AI employees. 20+ skills. 250+ integrations. Full governance and
                audit trails. SaaS pricing coming soon — until then, reach out and we will get
                your workforce running.
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
