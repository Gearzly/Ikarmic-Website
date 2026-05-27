import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Retail & E-commerce AI",
  description: "From demand forecasting to conversational commerce, Ikarmic helps retailers reduce waste, lift revenue, and delight customers with AI.",
  keywords: ["retail AI", "e-commerce AI", "demand forecasting retail", "AI personalisation", "conversational commerce", "retail automation AI"],
  alternates: { canonical: "https://ikarmic.com/industries/retail" },
  openGraph: {
    title: "Retail & E-commerce AI | Ikarmic",
    description: "AI for smarter retail — demand forecasting, personalised recommendations, conversational support.",
    url: "https://ikarmic.com/industries/retail",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Retail AI | Ikarmic", description: "Demand forecasting, personalisation, and conversational commerce.", images: ["/og-default.png"] },
};

export default function RetailPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://ikarmic.com" },
          { name: "Industries", item: "https://ikarmic.com/industries" },
          { name: "Retail & E-commerce", item: "https://ikarmic.com/industries/retail" },
        ]}
      />
      <IndustryPageTemplate
        tag="AI for Retail & E-commerce"
        headline="Smarter Retail, Better Margins"
        intro="From demand forecasting to conversational commerce, we help retailers reduce waste, lift revenue, and delight customers — without adding headcount."

        challengeTitle="What Retail Teams Face"
        challenges={[
          { text: "Demand volatility makes inventory planning unreliable — over-stocking and stock-outs erode margin." },
          { text: "Cart abandonment rates exceed 70% without AI-driven engagement and personalisation." },
          { text: "Personalisation expectations grow while support budgets shrink." },
          { text: "Legacy systems make it hard to act on real-time signals from customer behaviour." },
        ]}
        servicesTitle="Services Mapped to Retail"
        services={[
          {
            title: "Predictive Analytics",
            desc: "Demand forecasting and pricing optimisation that reduce waste and grow margin across every SKU category.",
            href: "/services/data-analytics",
          },
          {
            title: "AI Chatbots",
            desc: "Multi-channel support that resolves tier-1 queries instantly on web, WhatsApp, and voice — boosting CSAT while cutting costs.",
            href: "/services/ai-chatbots",
          },
          {
            title: "Generative AI",
            desc: "Product description generation, personalised recommendations, and marketing automation at 4× velocity.",
            href: "/services/generative-ai",
          },
        ]}
        useCasesTitle="Retail AI in Action"
        useCases={[
          {
            title: "Demand forecasting across 100+ SKU categories",
            desc: "Rolling-window ML models updated weekly to account for seasonal trends, promotions, and supply disruptions.",
          },
          {
            title: "AI-powered post-purchase support on WhatsApp",
            desc: "Automated order tracking, return initiation, and complaint handling — deflecting 65% of tier-1 tickets.",
          },
          {
            title: "Dynamic product recommendations on storefront",
            desc: "Collaborative filtering + content-based models that lift revenue on key categories by 12%.",
          },
        ]}
        outcomesTitle="Measurable Retail Impact"
        outcomes={[
          { value: "30%", label: "Forecast accuracy gain" },
          { value: "65%", label: "Support ticket deflection" },
          { value: "12%", label: "Revenue lift on key categories" },
          { value: "18%", label: "Inventory waste reduction" },
        ]}
        ctaTitle="Ready to Transform Retail?"
        ctaDesc="Tell us about your retail challenges and we'll scope the AI solutions that move the needle — with a clear ROI target from day one."
        breadcrumb={{ name: "Retail", item: "https://ikarmic.com/industries/retail" }}
      />
    </>
  );
}
