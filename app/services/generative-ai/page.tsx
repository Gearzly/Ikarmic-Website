import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Generative AI Solutions",
  description: "Harness large language models with retrieval pipelines, guardrails, and fine-tuning to unlock content creation, knowledge access, and process acceleration.",
  keywords: ["generative AI", "LLM development", "RAG pipeline", "AI content generation", "LLM fine-tuning", "ChatGPT integration", "generative AI consulting"],
  alternates: { canonical: "https://ikarmic.com/services/generative-ai" },
  openGraph: {
    title: "Generative AI Solutions | Ikarmic AI",
    description: "LLMs with retrieval pipelines, guardrails, and fine-tuning for content creation and process acceleration.",
    url: "https://ikarmic.com/services/generative-ai",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Generative AI | Ikarmic AI", description: "Content at scale with LLMs, RAG, and fine-tuning.", images: ["/og-default.png"] },
};

export default function GenerativeAiPage() {
  return (
    <ServicePageTemplate
      tag="Generative AI Solutions"
      headline="Generate, Reason, Automate"
      intro="Harness large language models with retrieval pipelines, guardrails, and fine-tuning to unlock content creation, knowledge access, and process acceleration."
      ctaHref="/contact"
      ctaLabel="Discuss Your Gen AI Project"
      challengeTitle="Content Bottlenecks & Knowledge Silos"
      challengeDesc="Teams spend hours drafting copy, searching internal docs, and re-answering the same questions. Institutional knowledge lives in scattered files only a few people know how to navigate."
      opportunityTitle="AI That Creates and Retrieves"
      opportunityDesc="RAG pipelines paired with fine-tuned models unlock instant answers over proprietary data, while generative content engines produce on-brand assets at scale — all behind responsible guardrails."
      approachTitle="How We Ship Gen AI Safely"
      steps={[
        {
          num: "01",
          title: "RAG Pipeline Design",
          desc: "We index your proprietary data into vector stores and build retrieval chains that surface accurate, grounded answers.",
        },
        {
          num: "02",
          title: "Model Selection & Tuning",
          desc: "Right-size the model for your task — from open-source 7B models to GPT-4o — with prompt engineering and optional fine-tuning.",
        },
        {
          num: "03",
          title: "Guardrails & Evaluation",
          desc: "Content filters, hallucination detection, and automated eval suites ensure quality and compliance before going live.",
        },
      ]}
      useCases={[
        {
          title: "Content Generation",
          desc: "Marketing copy, product descriptions, and social posts generated at 4× velocity with brand-consistent tone.",
        },
        {
          title: "Knowledge Assistants",
          desc: "Internal RAG-powered assistants that answer questions from company docs, policies, and wikis.",
        },
        {
          title: "Marketing Automation",
          desc: "Personalized email sequences, ad copy variants, and campaign briefs produced on demand.",
        },
        {
          title: "Code & Data Assistants",
          desc: "Developer copilots and data query tools that accelerate engineering teams by 30%+.",
        },
      ]}
      integrations={[
        "CMS Platforms (WordPress, Contentful)",
        "Internal Wikis (Confluence, Notion)",
        "Slack & Microsoft Teams",
        "Marketing Platforms (HubSpot, Mailchimp)",
        "Vector Databases (Pinecone, Weaviate)",
        "LLM Providers (OpenAI, Anthropic, Open-source)",
      ]}
      outcomes={[
        { value: "4×", label: "Content velocity" },
        { value: "60%", label: "Reduction in knowledge search time" },
        { value: "30%", label: "Engineering productivity boost" },
        { value: "<3 wks", label: "From pilot to production" },
      ]}
      ctaBoxTitle="Ready to Build With Gen AI?"
      ctaBoxDesc="Describe your content, search, or automation challenge. We'll scope a Gen AI pilot you can validate in weeks."
    />
  );
}
