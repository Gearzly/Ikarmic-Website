import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";

export const metadata: Metadata = {
  title: "Enterprise AI Platform",
  description: "The infrastructure layer that turns AI experiments into reliable, scalable systems — then transfers ownership completely to your team. POC to production in 8 weeks.",
  keywords: ["enterprise AI platform", "AI infrastructure", "MLOps", "AI platform development", "production AI", "scalable AI system", "AI POC to production"],
  alternates: { canonical: "https://ikarmic.com/solutions/enterprise-ai-platform" },
  openGraph: {
    title: "Enterprise AI Platform | Ikarmic AI",
    description: "AI infrastructure that turns experiments into reliable, scalable production systems.",
    url: "https://ikarmic.com/solutions/enterprise-ai-platform",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Enterprise AI Platform | Ikarmic AI", description: "POC to production in 8 weeks.", images: ["/og-default.png"] },
};

export default function EnterpriseAiPlatformPage() {
  return (
    <SolutionPageTemplate
      tag="Enterprise AI Platform"
      headline="Take AI From Prototype to Production — and Own It"
      intro="We design and build the infrastructure layer that turns AI experiments into reliable, scalable systems — then transfer ownership completely to your team."
      challengeTitle="Pilots That Never Reach Production"
      challengeDesc="Most enterprise AI projects stall after the proof-of-concept stage. The gap between a working notebook and a production-grade system — with monitoring, retraining, governance, and scalability — is wider than most teams expect."
      opportunityTitle="A Platform Your Team Actually Owns"
      opportunityDesc="A purpose-built AI platform — with feature stores, model registries, serving infrastructure, and retraining pipelines — gives your data scientists a reliable foundation and gives leadership the observability they need."
      approachTitle="How We Build Enterprise AI Platforms"
      steps={[
        {
          num: "01",
          title: "Architecture Design",
          desc: "We design the end-to-end platform — ingestion, feature engineering, model lifecycle, serving, monitoring — aligned to your cloud environment and compliance needs.",
        },
        {
          num: "02",
          title: "Platform Build",
          desc: "Incremental delivery of platform components — feature store, CI/CD for ML, model registry, serving layer — with your team embedded from day one.",
        },
        {
          num: "03",
          title: "Handover & Enablement",
          desc: "Full codebase transfer, documentation, runbooks, and training workshops — so your team runs the platform independently from day one after handover.",
        },
      ]}
      useCases={[
        {
          title: "ML Platform Build",
          desc: "End-to-end ML infrastructure — feature store, model registry, serving, monitoring — on your cloud of choice.",
        },
        {
          title: "Model Governance",
          desc: "Audit logs, drift monitoring, and explainability tooling that satisfy regulators and executives.",
        },
        {
          title: "AI SaaS Foundation",
          desc: "Multi-tenant AI infrastructure for software companies adding AI features to their products.",
        },
        {
          title: "Data Platform Modernisation",
          desc: "Lakehouse architecture, data quality pipelines, and a semantic layer that makes AI a first-class citizen in your data stack.",
        },
      ]}
      outcomes={[
        { value: "8 wks", label: "Typical POC-to-production timeline" },
        { value: "99.9%", label: "Model serving uptime target" },
        { value: "50%", label: "Faster model iteration cycles" },
        { value: "100%", label: "IP ownership transferred" },
      ]}
      relatedServices={[
        { label: "Custom AI Development", href: "/services/custom-ai" },
        { label: "Data & Analytics", href: "/services/data-analytics" },
        { label: "Business Process Automation", href: "/services/business-automation" },
      ]}
      ctaBoxTitle="Ready to Build Your Enterprise AI Platform?"
      ctaBoxDesc="Tell us where your AI experiments are stalling. We'll scope the platform architecture and delivery plan together."
    />
  );
}
