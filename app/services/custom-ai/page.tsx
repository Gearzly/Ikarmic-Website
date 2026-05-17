import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Custom AI Development",
  description: "When off-the-shelf tools can't compete, we design bespoke ML models, AI-powered products, and intelligent platforms — from first prototype to production handover.",
  keywords: ["custom AI development", "bespoke machine learning", "custom ML model", "AI product development", "AI software development", "custom AI solutions"],
  alternates: { canonical: "https://ikarmic.com/services/custom-ai" },
  openGraph: {
    title: "Custom AI Development | Ikarmic AI",
    description: "Bespoke ML models and AI platforms from first prototype to production.",
    url: "https://ikarmic.com/services/custom-ai",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Custom AI | Ikarmic AI", description: "Built for your specific workflow, from prototype to production.", images: ["/og-default.png"] },
};

export default function CustomAiPage() {
  return (
    <ServicePageTemplate
      tag="Custom AI Development"
      headline="Built for Your Business, Owned by You"
      intro="When off-the-shelf tools can't compete, we design bespoke ML models, AI-powered products, and intelligent platforms — from first prototype to production handover."
      ctaHref="/contact"
      ctaLabel="Start Your Custom AI Project"
      challengeTitle="Generic Tools Don't Fit"
      challengeDesc="Pre-built AI products are designed for average use cases. When your data, domain, or workflow is unique, you need models trained on your reality — not someone else's demo dataset."
      opportunityTitle="Purpose-Built Competitive Edge"
      opportunityDesc="Custom AI becomes a moat. Proprietary models, unique data pipelines, and tailored UX create differentiation no competitor can buy off the shelf."
      approachTitle="How We Deliver Custom AI"
      steps={[
        {
          num: "01",
          title: "Discovery & Scoping",
          desc: "We define success criteria, map data sources, and design system architecture before writing production code.",
        },
        {
          num: "02",
          title: "Iterative Build",
          desc: "Weekly sprint demos with working software — from baseline model to optimized pipeline — with continuous feedback.",
        },
        {
          num: "03",
          title: "Handover & Support",
          desc: "Full codebase ownership, documentation, runbooks, and optional retainer for retraining and monitoring.",
        },
      ]}
      useCases={[
        {
          title: "AI SaaS Products",
          desc: "End-to-end AI product builds — from model design to API layer to front-end — for startups and scale-ups.",
        },
        {
          title: "Recommendation Engines",
          desc: "Personalization models that drive engagement, upsell, and retention across digital experiences.",
        },
        {
          title: "Intelligent Applications",
          desc: "Custom AI features embedded into existing platforms — search, ranking, classification, and more.",
        },
        {
          title: "ML Platform Engineering",
          desc: "Feature stores, model registries, and serving infra that make your ML org production-ready.",
        },
      ]}
      integrations={[
        "Cloud-Native (AWS, GCP, Azure)",
        "Kubernetes & Container Orchestration",
        "CI/CD Pipelines (GitHub Actions, GitLab)",
        "Feature Stores (Feast, Tecton)",
        "Model Serving (TorchServe, TFServing, vLLM)",
        "Any Language or Framework",
      ]}
      outcomes={[
        { value: "8 wks", label: "POC to production" },
        { value: "99.9%", label: "Model serving uptime" },
        { value: "50%", label: "Faster iteration cycles" },
        { value: "Full", label: "Ownership & IP transfer" },
      ]}
      ctaBoxTitle="Ready to Build Something Unique?"
      ctaBoxDesc="Describe your vision. We'll scope the architecture, timeline, and team structure for a custom AI solution you own completely."
    />
  );
}
