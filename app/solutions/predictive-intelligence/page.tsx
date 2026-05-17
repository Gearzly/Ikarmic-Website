import type { Metadata } from "next";
import SolutionPageTemplate from "@/components/SolutionPageTemplate";

export const metadata: Metadata = {
  title: "Predictive Intelligence",
  description: "Forecasting and anomaly-detection systems that surface demand signals, churn risk, and operational issues before they cost you money.",
  keywords: ["predictive intelligence", "AI demand forecasting", "churn prediction AI", "anomaly detection", "predictive analytics business", "AI forecasting model"],
  alternates: { canonical: "https://ikarmic.com/solutions/predictive-intelligence" },
  openGraph: {
    title: "Predictive Intelligence | Ikarmic AI",
    description: "Forecasting and anomaly detection that surfaces demand signals and churn risk early.",
    url: "https://ikarmic.com/solutions/predictive-intelligence",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Predictive Intelligence | Ikarmic AI", description: "Forecast demand and churn before they cost you.", images: ["/og-default.png"] },
};

export default function PredictiveIntelligencePage() {
  return (
    <SolutionPageTemplate
      tag="Predictive Intelligence"
      headline="See What's Coming Before It Arrives"
      intro="We deploy forecasting and anomaly-detection systems that surface demand signals, churn risk, and operational issues before they cost you money."
      challengeTitle="Decisions Made Too Late on Stale Data"
      challengeDesc="Most organisations react to trends after they've already shifted. Monthly reports lag weeks behind reality. Spreadsheet forecasts break when conditions change. Teams operate on gut feel when data is too slow to trust."
      opportunityTitle="ML Models That Update as the World Does"
      opportunityDesc="Predictive models trained on your data — refreshed on schedule, integrated into your dashboards — give planners, buyers, and executives a forward-looking view they can act on today."
      approachTitle="How We Build Predictive Systems"
      steps={[
        {
          num: "01",
          title: "Data Readiness Audit",
          desc: "We assess your data sources, quality, and recency — and build a clean feature pipeline that gives models something meaningful to learn from.",
        },
        {
          num: "02",
          title: "Model Development",
          desc: "From demand forecasting to churn propensity to anomaly detection, we build and validate models against your historical outcomes.",
        },
        {
          num: "03",
          title: "Dashboard Integration",
          desc: "Predictions surface inside Tableau, Power BI, or your existing BI stack — with confidence intervals and explainability built in.",
        },
      ]}
      useCases={[
        {
          title: "Demand Forecasting",
          desc: "Predict product or service demand 4–12 weeks ahead to optimise inventory, staffing, and procurement.",
        },
        {
          title: "Churn Prediction",
          desc: "Identify customers at risk of leaving before they cancel — with lead time for retention intervention.",
        },
        {
          title: "Operational Anomaly Detection",
          desc: "Flag production, logistics, or financial anomalies in real time before they escalate.",
        },
        {
          title: "Revenue Forecasting",
          desc: "Give finance and leadership a data-driven view of pipeline and revenue — not just gut feel.",
        },
      ]}
      outcomes={[
        { value: "25%", label: "Forecast accuracy improvement" },
        { value: "40%", label: "Faster business decisions" },
        { value: "18%", label: "Reduction in inventory waste" },
        { value: "3×", label: "Analyst productivity" },
      ]}
      relatedServices={[
        { label: "Data & Analytics", href: "/services/data-analytics" },
        { label: "Custom AI Development", href: "/services/custom-ai" },
      ]}
      ctaBoxTitle="Ready to Turn Data Into Foresight?"
      ctaBoxDesc="Tell us what decisions you're trying to make faster. We'll scope a forecasting model with a clear accuracy target."
    />
  );
}
