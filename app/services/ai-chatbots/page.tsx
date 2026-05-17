import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AI Chatbots & Conversational AI",
  description: "Deploy channel-agnostic AI chatbots with human escalation that cut support costs and delight customers — from first message to full resolution.",
  keywords: ["AI chatbot development", "conversational AI", "customer support chatbot", "WhatsApp AI bot", "chatbot automation", "NLP chatbot"],
  alternates: { canonical: "https://ikarmic.com/services/ai-chatbots" },
  openGraph: {
    title: "AI Chatbots & Conversational AI | Ikarmic AI",
    description: "Channel-agnostic chatbots with human escalation that cut support costs.",
    url: "https://ikarmic.com/services/ai-chatbots",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AI Chatbots | Ikarmic AI", description: "Intelligent conversations, instant resolution.", images: ["/og-default.png"] },
};

export default function AiChatbotsPage() {
  return (
    <ServicePageTemplate
      tag="AI Chatbots & Conversational AI"
      headline="Intelligent Conversations, Instant Resolution"
      intro="Deploy channel-agnostic chatbots with human escalation that cut support costs and delight customers — from first message to full resolution."
      ctaHref="/contact"
      ctaLabel="Discuss Your Chatbot Project"
      challengeTitle="Support Costs Climb While Response Times Lag"
      challengeDesc="Scaling human support linearly is expensive. Tickets pile up, response latency grows, and customer satisfaction suffers. Most teams spend 70% of agent time on repetitive, low-complexity queries that AI can resolve instantly."
      opportunityTitle="Always-On, Multi-Channel Intelligence"
      opportunityDesc="A well-designed conversational AI system handles tier-1 queries autonomously, routes complex issues to the right team, and learns from every interaction — freeing agents to focus on high-value conversations."
      approachTitle="How We Build Conversational AI"
      steps={[
        {
          num: "01",
          title: "Intent Mapping",
          desc: "We map your support taxonomy, identify high-volume query clusters, and define escalation rules before writing a single prompt.",
        },
        {
          num: "02",
          title: "Channel-Agnostic Design",
          desc: "One conversation engine powers web chat, WhatsApp, SMS, and voice — with channel-specific UX adaptations.",
        },
        {
          num: "03",
          title: "Human Escalation Loop",
          desc: "When confidence drops below threshold, the system routes to a live agent with full conversation context intact.",
        },
      ]}
      useCases={[
        {
          title: "Website & App Chat",
          desc: "Instant, contextual answers embedded in your product — from FAQs to complex troubleshooting.",
        },
        {
          title: "WhatsApp & Messaging",
          desc: "Meet customers on channels they already use with multilingual, always-on chat support.",
        },
        {
          title: "Customer Service Agents",
          desc: "AI-first triage and resolution that handles tier-1 queries and escalates intelligently.",
        },
        {
          title: "Voice Assistants",
          desc: "Natural-language voice interfaces for IVR replacement, appointment booking, and self-service.",
        },
      ]}
      integrations={[
        "CRM Systems (Salesforce, HubSpot)",
        "Ticketing (Zendesk, Freshdesk)",
        "Knowledge Bases & Wikis",
        "WhatsApp Business API",
        "Slack & Microsoft Teams",
        "Custom REST / GraphQL APIs",
      ]}
      outcomes={[
        { value: "60%", label: "Average ticket deflection" },
        { value: "<2s", label: "Median first response" },
        { value: "35%", label: "Support cost reduction" },
        { value: "4.6★", label: "Avg. end-user satisfaction" },
      ]}
      ctaBoxTitle="Ready to Automate Conversations?"
      ctaBoxDesc="Tell us about your support volume, channels, and pain points. We'll scope a chatbot pilot you can launch in weeks."
    />
  );
}
