import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Business Automation",
  description: "Replace manual data entry, document handling, and approval chains with AI-driven workflows that run reliably at scale.",
  keywords: ["business automation", "AI workflow automation", "robotic process automation", "document automation AI", "approval workflow automation"],
  alternates: { canonical: "https://ikarmic.com/services/business-automation" },
  openGraph: {
    title: "Business Automation | Ikarmic AI",
    description: "AI-driven workflows replacing manual data entry, document handling, and approval chains.",
    url: "https://ikarmic.com/services/business-automation",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Business Automation | Ikarmic AI", description: "AI workflows that run reliably at scale.", images: ["/og-default.png"] },
};

export default function BusinessAutomationPage() {
  return (
    <ServicePageTemplate
      tag="AI Business Automation"
      headline="Automate What Slows You Down"
      intro="Replace manual data entry, document handling, and approval chains with AI-driven workflows that run reliably at scale."
      ctaHref="/contact"
      ctaLabel="Discuss Your Automation Goals"
      challengeTitle="Manual Processes Create Bottlenecks"
      challengeDesc="Data re-keying, multi-system copy-paste, and manual compliance checks eat thousands of employee hours each year — and introduce errors that cost even more to fix."
      opportunityTitle="End-to-End Intelligent Automation"
      opportunityDesc="Modern AI can read documents, understand context, make routing decisions, and execute downstream actions — transforming multi-day workflows into minutes with human oversight only where it matters."
      approachTitle="How We Build Automation"
      steps={[
        {
          num: "01",
          title: "Process Mining",
          desc: "We audit current workflows, quantify manual effort, and identify the highest-ROI automation opportunities.",
        },
        {
          num: "02",
          title: "Document Intelligence",
          desc: "OCR, NLP, and layout models extract structured data from unstructured sources with validation gates.",
        },
        {
          num: "03",
          title: "Orchestration & Monitoring",
          desc: "We wire automated steps into your existing systems with dashboards, alerts, and human-in-the-loop controls.",
        },
      ]}
      useCases={[
        {
          title: "Document Intelligence",
          desc: "Extract, classify, and route data from invoices, contracts, and forms with 95%+ accuracy.",
        },
        {
          title: "Email Triage & Routing",
          desc: "Automatically categorize inbound emails, flag urgency, and assign to the right team.",
        },
        {
          title: "Workflow Orchestration",
          desc: "Chain multi-step approval flows across systems with human-in-the-loop checkpoints.",
        },
        {
          title: "Compliance Checks",
          desc: "Run automated audits against regulatory checklists and flag deviations before submission.",
        },
      ]}
      integrations={[
        "ERP Systems (SAP, Oracle, NetSuite)",
        "HRMS (Workday, BambooHR)",
        "Cloud Storage (S3, Azure Blob, GCS)",
        "RPA Platforms (UiPath, Automation Anywhere)",
        "Document Management (SharePoint, Box)",
        "Custom REST / GraphQL APIs",
      ]}
      outcomes={[
        { value: "80%", label: "Processing time reduction" },
        { value: "95%+", label: "Extraction accuracy" },
        { value: "70%", label: "Fewer manual review cycles" },
        { value: "3×", label: "Throughput increase" },
      ]}
      ctaBoxTitle="Ready to Eliminate Manual Work?"
      ctaBoxDesc="Share your highest-friction processes. We'll identify automation wins you can ship in weeks."
    />
  );
}
