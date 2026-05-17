import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";

export const metadata: Metadata = {
  title: "AI-Powered Marketing",
  description: "AI content engines, lead scoring systems, and campaign automation that multiply your marketing output without multiplying headcount.",
  keywords: ["AI marketing", "AI content generation marketing", "lead scoring AI", "marketing automation AI", "AI campaign automation", "AI-powered marketing"],
  alternates: { canonical: "https://ikarmic.com/solutions/ai-powered-marketing" },
  openGraph: {
    title: "AI-Powered Marketing | Ikarmic AI",
    description: "AI content engines and campaign automation that multiply marketing output.",
    url: "https://ikarmic.com/solutions/ai-powered-marketing",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "AI Marketing | Ikarmic AI", description: "4× content velocity without extra headcount.", images: ["/og-default.png"] },
};

export default function AiPoweredMarketingPage() {
  return (
    <SolutionPageTemplate
      tag="AI-Powered Marketing"
      headline="Scale Your Marketing Without Scaling Your Headcount"
      intro="We build AI content engines, lead scoring systems, and campaign automation that multiply your marketing output without multiplying headcount."
      challengeTitle="Marketing Teams Can't Keep Up"
      challengeDesc="Content calendars are full, briefs are backlogged, and campaign planning still relies on spreadsheets and guesswork. Teams spend more time on production than on strategy — and every new channel doubles the workload."
      opportunityTitle="AI That Creates, Scores, and Schedules"
      opportunityDesc="Generative AI handles the production side — copy, personalisation, variant testing — while predictive models identify your best leads and route them to the right nurture sequence automatically."
      approachTitle="How We Automate Marketing"
      steps={[
        {
          num: "01",
          title: "Content Ops Audit",
          desc: "We map your content pipeline, identify repetitive production tasks, and define where AI can generate high-quality output at volume.",
        },
        {
          num: "02",
          title: "Generation Pipeline Build",
          desc: "Brand-tuned LLM pipelines that produce on-strategy copy, adapted for blog, email, social, and ad formats — with human review gates.",
        },
        {
          num: "03",
          title: "Lead Intelligence Layer",
          desc: "Behavioural scoring models that rank prospects by conversion likelihood and trigger the right nurture sequence at the right time.",
        },
      ]}
      useCases={[
        {
          title: "Content at Scale",
          desc: "Blog posts, product pages, ad copy, and social content generated in brand voice — reviewed, not written, by your team.",
        },
        {
          title: "Email Personalisation",
          desc: "AI-written email sequences personalised by segment, lifecycle stage, and behaviour — tested and optimised automatically.",
        },
        {
          title: "Lead Scoring",
          desc: "Predictive models that identify your best prospects from first-party signals and prioritise outreach accordingly.",
        },
        {
          title: "Campaign Automation",
          desc: "Multi-channel campaign logic that routes leads, adjusts bids, and updates creatives based on performance signals.",
        },
      ]}
      outcomes={[
        { value: "4×", label: "Content production velocity" },
        { value: "60%", label: "Less manual content work" },
        { value: "30%", label: "Conversion improvement" },
        { value: "<3 wks", label: "Time to first AI content live" },
      ]}
      relatedServices={[
        { label: "Generative AI Solutions", href: "/services/generative-ai" },
        { label: "Business Process Automation", href: "/services/business-automation" },
      ]}
      ctaBoxTitle="Ready to Scale Your Marketing with AI?"
      ctaBoxDesc="Tell us your content bottleneck or lead qualification challenge. We'll scope an AI marketing pilot in days."
    />
  );
}
