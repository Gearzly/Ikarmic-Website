import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";

export const metadata: Metadata = {
  title: "Intelligent Automation",
  description: "Automate the manual, error-prone work that slows your teams down — document processing, email routing, approval workflows, and data entry — reliably and around the clock.",
  keywords: ["intelligent automation", "AI document processing", "AI email routing", "workflow automation AI", "back-office automation", "AI RPA"],
  alternates: { canonical: "https://ikarmic.com/solutions/intelligent-automation" },
  openGraph: {
    title: "Intelligent Automation | Ikarmic AI",
    description: "Automate document processing, email routing, and approvals reliably around the clock.",
    url: "https://ikarmic.com/solutions/intelligent-automation",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Intelligent Automation | Ikarmic AI", description: "80% faster back-office processing with AI.", images: ["/og-default.png"] },
};

export default function IntelligentAutomationPage() {
  return (
    <SolutionPageTemplate
      tag="Intelligent Automation"
      headline="Eliminate the Work That Slows You Down"
      intro="We automate the manual, error-prone work that slows your teams down — document processing, email routing, approval workflows, and data entry — reliably and around the clock."
      challengeTitle="Manual Work Is Expensive and Fragile"
      challengeDesc="Repetitive back-office tasks consume hours of skilled time, introduce errors, and create bottlenecks that delay business decisions. Traditional RPA breaks when layouts change. Teams spend more time maintaining bots than gaining from them."
      opportunityTitle="AI That Reads, Routes, and Acts"
      opportunityDesc="Intelligent automation pairs document understanding with decision logic, so the system can handle variability — different invoice formats, handwritten fields, exception handling — without constant re-configuration."
      approachTitle="How We Automate Your Operations"
      steps={[
        {
          num: "01",
          title: "Process Audit",
          desc: "We map your highest-cost manual workflows, quantify time and error rates, and prioritise the processes with the fastest ROI.",
        },
        {
          num: "02",
          title: "Document Intelligence Build",
          desc: "We deploy extraction models for invoices, contracts, forms, and emails — trained on your document variants, not generic samples.",
        },
        {
          num: "03",
          title: "Workflow Orchestration",
          desc: "Extracted data flows into your ERP, CRM, or approval systems via pre-built connectors or custom APIs — with exception queues for human review.",
        },
      ]}
      useCases={[
        {
          title: "Invoice Processing",
          desc: "Extract line items, match POs, and route for approval — reducing processing time from days to minutes.",
        },
        {
          title: "Email Triage & Routing",
          desc: "Classify inbound emails by intent and route to the right team or trigger a workflow automatically.",
        },
        {
          title: "Contract Review",
          desc: "Flag non-standard clauses, extract obligations, and summarise key terms for legal team review.",
        },
        {
          title: "Compliance Reporting",
          desc: "Aggregate data from multiple systems and auto-generate compliance reports on schedule.",
        },
      ]}
      outcomes={[
        { value: "80%", label: "Processing time reduction" },
        { value: "95%+", label: "Extraction accuracy" },
        { value: "70%", label: "Fewer manual reviews" },
        { value: "3×", label: "Throughput increase" },
      ]}
      relatedServices={[
        { label: "Business Process Automation", href: "/services/business-automation" },
        { label: "Data & Analytics", href: "/services/data-analytics" },
      ]}
      ctaBoxTitle="Ready to Automate Your Back Office?"
      ctaBoxDesc="Describe the process taking the most time from your team. We'll scope an automation pilot with a clear ROI target."
    />
  );
}
