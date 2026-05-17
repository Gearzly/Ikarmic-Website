import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Technology & Startups AI",
  description: "Ikarmic helps tech companies and startups ship AI features fast, build production ML infrastructure, and differentiate their product with custom AI.",
  keywords: ["AI for startups", "tech company AI", "ML platform engineering", "AI feature development", "startup AI consulting", "SaaS AI integration"],
  alternates: { canonical: "https://ikarmic.com/industries/technology" },
  openGraph: {
    title: "Technology & Startups AI | Ikarmic",
    description: "Fast AI feature delivery, ML platform engineering, and custom model development for tech companies.",
    url: "https://ikarmic.com/industries/technology",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Technology AI | Ikarmic", description: "Ship AI features fast and build production ML infrastructure.", images: ["/og-default.png"] },
};

export default function TechnologyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://ikarmic.com" },
          { name: "Industries", item: "https://ikarmic.com/industries" },
          { name: "Technology & Startups", item: "https://ikarmic.com/industries/technology" },
        ]}
      />
      <IndustryPageTemplate
        tag="AI for Technology & Startups"
        headline="Ship AI Features. Own the Infra."
        intro="We help tech companies and startups move from AI idea to production in weeks — with the infrastructure, models, and team enablement to scale independently."
        heroImage="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&auto=format&fit=crop"
        heroImageAlt="Technology circuit board and hardware"
        challengeTitle="What Technology Teams Face"
        challenges={[
          { text: "Shipping AI features fast is hard — model selection, evals, guardrails, and serving infra all take longer than expected." },
          { text: "Scaling ML infrastructure from prototype to production exposes gaps in feature engineering, monitoring, and retraining." },
          { text: "Off-the-shelf AI tools create vendor dependency — hard to tune, impossible to own, and expensive at scale." },
          { text: "Data science and engineering teams speak different languages, slowing model-to-production cycles." },
        ]}
        servicesTitle="Services Mapped to Technology"
        services={[
          {
            title: "Custom AI Development",
            desc: "End-to-end AI product builds — from model design to API layer — with full IP transfer and team enablement.",
            href: "/services/custom-ai",
          },
          {
            title: "Generative AI",
            desc: "RAG pipelines, LLM fine-tuning, and guardrail systems that add AI features to your product without hallucination risk.",
            href: "/services/generative-ai",
          },
          {
            title: "Data Analytics",
            desc: "Feature engineering, model evaluation frameworks, and data pipelines that make your ML organisation production-ready.",
            href: "/services/data-analytics",
          },
        ]}
        useCasesTitle="Technology AI in Action"
        useCases={[
          {
            title: "AI SaaS feature shipped in 6 weeks",
            desc: "From scoping to production API — recommendation engine, RAG assistant, or classification feature — with eval suite and monitoring included.",
          },
          {
            title: "ML platform engineering for a Series B startup",
            desc: "Feature store, model registry, and serving infra built on AWS — enabling the data science team to deploy models in hours, not weeks.",
          },
          {
            title: "Generative AI product with responsible guardrails",
            desc: "LLM-powered product feature with content filtering, hallucination detection, and automated evaluation — production-safe from day one.",
          },
        ]}
        outcomesTitle="Measurable Technology Impact"
        outcomes={[
          { value: "8 wks", label: "POC to production" },
          { value: "50%", label: "Faster iteration cycles" },
          { value: "99.9%", label: "Model serving uptime" },
          { value: "100%", label: "IP ownership transferred" },
        ]}
        ctaTitle="Ready to Ship AI That Scales?"
        ctaDesc="Describe the AI feature or platform challenge you're facing. We'll scope the architecture, team structure, and timeline — honestly."
        breadcrumb={{ name: "Technology", item: "https://ikarmic.com/industries/technology" }}
      />
    </>
  );
}
