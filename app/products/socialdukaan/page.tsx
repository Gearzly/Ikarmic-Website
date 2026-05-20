import type { Metadata } from "next";
import ProductPageTemplate from "@/components/ProductPageTemplate";

export const metadata: Metadata = {
  title: "SocialDukaan",
  description: "AI-powered commerce platform for WhatsApp and Instagram sellers. Automate orders, payments, and customer relationships — built for Indian businesses by Ikarmic.",
  keywords: ["SocialDukaan", "WhatsApp commerce", "Instagram selling", "AI order management", "UPI payments", "small business automation", "Bharat commerce", "Ikarmic product"],
  alternates: { canonical: "https://ikarmic.com/products/socialdukaan" },
  openGraph: {
    title: "SocialDukaan — AI Commerce for WhatsApp & Instagram Sellers | Ikarmic",
    description: "Run your business. AI handles the rest. SocialDukaan takes orders on WhatsApp & Instagram, sends payment links, and remembers every customer.",
    url: "https://ikarmic.com/products/socialdukaan",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "SocialDukaan | Ikarmic", description: "AI commerce for WhatsApp & Instagram sellers. Built in Bharat, for Bharat.", images: ["/og-default.png"] },
};

export default function SocialDukaanPage() {
  return (
    <ProductPageTemplate
      tag="Ikarmic Product"
      headline="Run Your Business. AI Handles the Rest."
      intro="SocialDukaan is an India-first AI commerce platform that turns WhatsApp and Instagram chats into orders, payments, and lasting customer relationships. Built for the way Bharat sells — not the way Silicon Valley thinks we should."
      productUrl="https://socialdukaan.online/"
      productUrlLabel="Visit SocialDukaan"
      painPointTitle="Small Indian Sellers Are Stuck on Manual Chat"
      painPointDesc="Across India, millions of small sellers — boutique owners, food vendors, jewellers, artisans — run their entire business on WhatsApp and Instagram. They stay up late replying to 'is this available?' messages, chase customers for UPI payment screenshots, and track orders in notebooks. It does not scale. Growth means burnout, missed orders, and inconsistent customer experience."
      opportunityTitle="AI That Speaks Bharat — in Hindi, Hinglish, and Every Regional Nuance"
      opportunityDesc="SocialDukaan plugs into WhatsApp Business and Instagram, reads every incoming message, drafts context-aware replies in the seller's voice, attaches product photos, creates orders, and sends UPI payment links — all automatically. The seller approves and ships. No Shopify needed. No coding. No SMS OTPs. India servers, DPDP-ready."
      featuresTitle="Everything a Seller Needs, Built Into One Platform"
      features={[
        {
          title: "AI Order Desk",
          desc: "AI reads customer messages, identifies purchase intent, drafts a reply in the seller's voice, attaches the right product photo, and creates a draft order. Seller approves, AI sends.",
        },
        {
          title: "Instant UPI Payment Links",
          desc: "Razorpay-powered links with deep UPI integration. Customers open PhonePe, GPay, or Paytm directly. Orders auto-update when paid — no more chasing screenshots.",
        },
        {
          title: "Customer Memory",
          desc: "AI remembers buying patterns, preferred sizes, language, payment methods, and past conversations. When a customer returns, the AI already knows what they want.",
        },
        {
          title: "Instagram Comment-to-Order",
          desc: "AI monitors Instagram comments and DMs, turning casual interest into structured orders. Every customer gets a reply within seconds — not hours.",
        },
        {
          title: "Broadcast Campaigns",
          desc: "Send targeted promotions to customer segments based on past purchases, abandoned carts, or seasonal relevance. One-click campaigns with AI-crafted messages.",
        },
        {
          title: "Voice Assistant (Hindi/Hinglish)",
          desc: "Speak your order instructions in Hindi or Hinglish. The AI transcribes, processes, and acts — designed for sellers who prefer voice over typing.",
        },
      ]}
      useCasesTitle="Who Uses SocialDukaan"
      useCasesSubtitle="Built for the Real Businesses of Bharat"
      useCases={[
        {
          title: "Boutiques & Fashion",
          desc: "Saree shops, clothing boutiques, and fashion retailers handling dozens of daily inquiries about availability, size, colour, and pricing across WhatsApp.",
        },
        {
          title: "Food & Bakery Sellers",
          desc: "Home bakers, cloud kitchens, and sweet shops taking custom orders, managing delivery slots, and sending payment links for prepaid orders.",
        },
        {
          title: "Jewellery & Handicrafts",
          desc: "Artisanal jewellers and craft sellers managing custom requests, sharing product catalogues, and handling high-value prepaid orders with UPI links.",
        },
        {
          title: "D2C & Resellers",
          desc: "Direct-to-consumer brands and Instagram resellers scaling beyond manual DMs — automating the entire chat-to-checkout funnel without an engineering team.",
        },
      ]}
      outcomesTitle="What Sellers Achieve with SocialDukaan"
      outcomes={[
        { value: "8,400+", label: "Active sellers on the platform" },
        { value: "3×", label: "Average business growth reported" },
        { value: "98%", label: "AI reply accuracy rate" },
        { value: "< 2 min", label: "Full setup time, no coding" },
      ]}
      relatedServices={[
        { label: "AI Chatbots & Conversational AI", href: "/services/ai-chatbots" },
        { label: "Business Automation", href: "/services/business-automation" },
        { label: "Generative AI Solutions", href: "/services/generative-ai" },
      ]}
      ctaBoxTitle="Want to Build Something Like SocialDukaan?"
      ctaBoxDesc="SocialDukaan is one of our flagship products — built end-to-end by Ikarmic AI. If you have an idea for an AI-powered product or need a commerce automation solution tailored to your market, let's talk."
    />
  );
}
