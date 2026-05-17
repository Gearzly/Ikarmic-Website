import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Data Analytics & Predictive AI",
  description: "Turn raw data into forecasts, anomaly alerts, and strategic insights with production-grade analytics models and clear explanations.",
  keywords: ["data analytics AI", "predictive analytics", "AI forecasting", "anomaly detection", "business intelligence AI", "ML data models"],
  alternates: { canonical: "https://ikarmic.com/services/data-analytics" },
  openGraph: {
    title: "Data Analytics & Predictive AI | Ikarmic AI",
    description: "Forecasts, anomaly alerts, and strategic insights from production-grade analytics models.",
    url: "https://ikarmic.com/services/data-analytics",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Data Analytics | Ikarmic AI", description: "Turn raw data into forecasts and strategic insights.", images: ["/og-default.png"] },
};

export default function DataAnalyticsPage() {
  return (
    <ServicePageTemplate
      tag="AI Data Analytics & Predictive Intelligence"
      headline="From Data to Decisions, Faster"
      intro="Turn raw data into forecasts, anomaly alerts, and strategic insights with production-grade analytics models and clear explanations."
      ctaHref="/contact"
      ctaLabel="Discuss Your Analytics Goals"
      challengeTitle="Decisions Still Run on Gut Feel"
      challengeDesc="Most companies sit on vast data stores but lack the models and pipelines to translate that data into actionable forecasts. By the time insights reach decision-makers they're stale."
      opportunityTitle="Real-Time Predictive Edge"
      opportunityDesc="Predictive models that surface insights continuously — in dashboards, alerts, and downstream systems — allow teams to act early on opportunities and risks alike."
      approachTitle="How We Build Analytics Systems"
      steps={[
        {
          num: "01",
          title: "Data Readiness Audit",
          desc: "We assess quality, freshness, and coverage of your data sources before committing to a model strategy.",
        },
        {
          num: "02",
          title: "Model Development",
          desc: "Time-series, classification, and anomaly detection models built with explainability and drift monitoring baked in.",
        },
        {
          num: "03",
          title: "Dashboard & Integration",
          desc: "Insights surfaced through BI dashboards, automated alerts, and API endpoints for downstream decision systems.",
        },
      ]}
      useCases={[
        {
          title: "Demand Forecasting",
          desc: "Predict sales volume, inventory needs, and capacity with time-series models that learn from seasonality and market signals.",
        },
        {
          title: "Churn Prediction",
          desc: "Identify at-risk customers before they leave and trigger retention workflows automatically.",
        },
        {
          title: "Anomaly & Fraud Detection",
          desc: "Surface outliers in transactions, sensor data, or user behavior in real time with explainable alerts.",
        },
        {
          title: "Pricing Optimization",
          desc: "Dynamic pricing models that balance margin, demand elasticity, and competitive positioning.",
        },
      ]}
      integrations={[
        "Data Warehouses (Snowflake, BigQuery, Redshift)",
        "BI Tools (Tableau, Power BI, Looker)",
        "Cloud Pipelines (Airflow, dbt, Dagster)",
        "Event Streams (Kafka, Kinesis)",
        "CRM & ERP Systems",
        "Custom REST / GraphQL APIs",
      ]}
      outcomes={[
        { value: "25%", label: "Forecast accuracy improvement" },
        { value: "40%", label: "Faster insight-to-decision" },
        { value: "18%", label: "Inventory waste reduction" },
        { value: "3×", label: "Analyst productivity gain" },
      ]}
      ctaBoxTitle="Ready to Predict What's Next?"
      ctaBoxDesc="Share your data challenge. We'll assess readiness and scope a model that delivers ROI within weeks."
    />
  );
}
