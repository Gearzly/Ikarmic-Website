import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";

export const metadata: Metadata = {
  title: "CX & Support AI",
  description: "AI-powered customer experience systems that deflect routine tickets, accelerate resolutions, and give your agents space to do their best work.",
  keywords: ["customer experience AI", "support AI", "ticket deflection AI", "AI customer service", "CX automation", "AI helpdesk"],
  alternates: { canonical: "https://ikarmic.com/solutions/cx-support-ai" },
  openGraph: {
    title: "CX & Support AI | Ikarmic AI",
    description: "Deflect routine tickets, accelerate resolutions, and delight customers with AI.",
    url: "https://ikarmic.com/solutions/cx-support-ai",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "CX & Support AI | Ikarmic AI", description: "Resolve more. Spend less. Delight everyone.", images: ["/og-default.png"] },
};

export default function CxSupportAiPage() {
  return (
    <SolutionPageTemplate
      tag="CX & Support AI"
      headline="Resolve More. Spend Less. Delight Everyone."
      intro="We design AI-powered customer experience systems that deflect routine tickets, accelerate resolutions, and give your agents space to do their best work."
      challengeTitle="Support Costs Scale Linearly. Expectations Don't."
      challengeDesc="Growing teams face the same trap: ticket volumes double, headcount doubles, and satisfaction still drops. Most queries — password resets, order status, policy questions — are repetitive and low-value for agents but high-priority for customers."
      opportunityTitle="AI That Knows When to Help and When to Hand Off"
      opportunityDesc="A well-designed CX AI resolves tier-1 queries instantly, escalates complex issues with full context, and learns from every interaction. Agents handle only the cases that genuinely need them — and customers get faster answers on every channel."
      approachTitle="How We Build CX AI"
      steps={[
        {
          num: "01",
          title: "Journey & Intent Mapping",
          desc: "We audit your support taxonomy, identify high-volume query clusters, and define deflection vs. escalation boundaries before writing a single prompt.",
        },
        {
          num: "02",
          title: "Channel Deployment",
          desc: "One conversation engine deployed across web chat, WhatsApp, and voice — with channel-specific UX adaptations and brand tone tuning.",
        },
        {
          num: "03",
          title: "Loop Closure & Learning",
          desc: "Escalation paths are tested against real data. Post-launch, we monitor deflection rates and iterate on failure modes weekly.",
        },
      ]}
      useCases={[
        {
          title: "Tier-1 Auto-Resolution",
          desc: "Instantly resolve FAQs, order status, account queries, and policy questions without involving a human agent.",
        },
        {
          title: "Omnichannel Support",
          desc: "A single AI brain handles web chat, WhatsApp, SMS, and voice — consistent quality on every channel.",
        },
        {
          title: "Smart Escalation",
          desc: "When complexity exceeds confidence thresholds, conversations route to the right agent with full context.",
        },
        {
          title: "Proactive Engagement",
          desc: "Trigger support outreach before customers complain — shipping alerts, renewal reminders, and anomaly alerts.",
        },
      ]}
      outcomes={[
        { value: "60%", label: "Ticket deflection rate" },
        { value: "24/7", label: "Always-on coverage" },
        { value: "35%", label: "Support cost reduction" },
        { value: "4.6★", label: "Avg. end-user satisfaction" },
      ]}
      relatedServices={[
        { label: "AI Chatbots & Conversational AI", href: "/services/ai-chatbots" },
        { label: "Generative AI Solutions", href: "/services/generative-ai" },
      ]}
      ctaBoxTitle="Ready to Transform Your Customer Experience?"
      ctaBoxDesc="Tell us your support volumes, channels, and biggest pain points. We'll scope a CX AI pilot you can launch in weeks."
    />
  );
}
