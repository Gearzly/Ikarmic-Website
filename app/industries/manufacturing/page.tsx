import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Manufacturing AI",
  description: "Ikarmic helps manufacturers cut downtime, automate document workflows, and deploy precision AI models built around operational data.",
  keywords: ["manufacturing AI", "predictive maintenance AI", "AI quality control", "factory automation AI", "industrial AI", "document automation manufacturing"],
  alternates: { canonical: "https://ikarmic.com/industries/manufacturing" },
  openGraph: {
    title: "Manufacturing AI | Ikarmic",
    description: "AI for intelligent factories — predictive maintenance, quality control, document automation.",
    url: "https://ikarmic.com/industries/manufacturing",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Manufacturing AI | Ikarmic", description: "Predictive maintenance, quality control, and document automation.", images: ["/og-default.png"] },
};

export default function ManufacturingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://ikarmic.com" },
          { name: "Industries", item: "https://ikarmic.com/industries" },
          { name: "Manufacturing", item: "https://ikarmic.com/industries/manufacturing" },
        ]}
      />
      <IndustryPageTemplate
        tag="AI for Manufacturing"
        headline="Intelligent Factories, Zero Guesswork"
        intro="We help manufacturers cut downtime, automate document workflows, and deploy precision AI models — all built around your operational data."

        challengeTitle="What Manufacturing Teams Face"
        challenges={[
          { text: "Unplanned downtime costs manufacturers $50B+ annually worldwide — and most failures are predictable." },
          { text: "Quality-control feedback loops are too slow for modern throughput targets, letting defects through." },
          { text: "Manual document workflows bottleneck procurement, invoicing, and compliance audit trails." },
          { text: "Siloed data across systems prevents end-to-end supply-chain visibility and root-cause analysis." },
        ]}
        servicesTitle="Services Mapped to Manufacturing"
        services={[
          {
            title: "Data Analytics",
            desc: "Sensor-driven predictive maintenance and yield optimisation models across production lines — before failures occur.",
            href: "/services/data-analytics",
          },
          {
            title: "Business Automation",
            desc: "Intelligent document processing for purchase orders, invoices, and audit trails — 95%+ extraction accuracy.",
            href: "/services/business-automation",
          },
          {
            title: "Custom AI",
            desc: "Bespoke computer vision and anomaly-detection models trained on your specific production data and defect taxonomy.",
            href: "/services/custom-ai",
          },
        ]}
        useCasesTitle="Manufacturing AI in Action"
        useCases={[
          {
            title: "Predictive maintenance for critical production equipment",
            desc: "Vibration, temperature, and current-draw sensors feed anomaly models that flag impending failure 48–72 hours ahead.",
          },
          {
            title: "Automated extraction of purchase-order and invoice data",
            desc: "ML extraction models handle variable formats — handwritten fields, scanned PDFs — routing clean data to ERP automatically.",
          },
          {
            title: "Real-time defect detection on assembly lines",
            desc: "Computer vision models trained on your defect library classify and flag quality issues at line speed.",
          },
        ]}
        outcomesTitle="Measurable Manufacturing Impact"
        outcomes={[
          { value: "40%", label: "Unplanned downtime reduction" },
          { value: "95%+", label: "Document extraction accuracy" },
          { value: "3×", label: "Throughput on QC workflows" },
          { value: "22%", label: "Energy waste reduction" },
        ]}
        ctaTitle="Ready to Modernise Your Plant?"
        ctaDesc="Tell us about your manufacturing challenges and we'll scope the AI solutions that deliver ROI — starting with the highest-cost process first."
        breadcrumb={{ name: "Manufacturing", item: "https://ikarmic.com/industries/manufacturing" }}
      />
    </>
  );
}
