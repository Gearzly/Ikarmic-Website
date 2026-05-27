import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";

export const metadata: Metadata = {
  title: "Education AI",
  description: "Ikarmic helps education organisations deliver adaptive learning, automate administrative tasks, and surface actionable student insights — ethically and at scale.",
  keywords: ["education AI", "adaptive learning AI", "EdTech AI", "student analytics", "AI tutoring", "educational automation"],
  alternates: { canonical: "https://ikarmic.com/industries/education" },
  openGraph: {
    title: "Education AI | Ikarmic",
    description: "AI for personalised learning at scale — adaptive systems, student support, admin automation.",
    url: "https://ikarmic.com/industries/education",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Education AI | Ikarmic", description: "Adaptive learning, student insights, and admin automation.", images: ["/og-default.png"] },
};

export default function EducationPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: "https://ikarmic.com" },
          { name: "Industries", item: "https://ikarmic.com/industries" },
          { name: "Education", item: "https://ikarmic.com/industries/education" },
        ]}
      />
      <IndustryPageTemplate
        tag="AI for Education"
        headline="Personalised Learning at Scale"
        intro="We help education organisations deliver adaptive learning experiences, automate administrative tasks, and surface actionable student insights — ethically and at scale."

        challengeTitle="What Education Teams Face"
        challenges={[
          { text: "One-size-fits-all curricula fail to keep diverse learners engaged — completion rates suffer." },
          { text: "Faculty spend 40%+ of their time on repetitive assessment, grading, and content-creation tasks." },
          { text: "Administrative back-offices operate on manual, paper-heavy workflows that slow enrolment and compliance." },
          { text: "Data-rich platforms underuse the behavioural signals that could improve student outcomes and early intervention." },
        ]}
        servicesTitle="Services Mapped to Education"
        services={[
          {
            title: "Generative AI",
            desc: "Adaptive learning paths, auto-generated quizzes, and AI tutoring assistants that personalise at every student's pace.",
            href: "/services/generative-ai",
          },
          {
            title: "AI Chatbots",
            desc: "Multilingual student-support bots for admissions, financial aid, and campus services — 24/7, with human escalation.",
            href: "/services/ai-chatbots",
          },
          {
            title: "Custom AI",
            desc: "Predictive retention models and curriculum-effectiveness analytics tailored to your learning management data.",
            href: "/services/custom-ai",
          },
        ]}
        useCasesTitle="Education AI in Action"
        useCases={[
          {
            title: "AI-powered tutoring that adapts difficulty in real time",
            desc: "LLM tutors calibrate question complexity to each student's demonstrated mastery, keeping learners in the productive struggle zone.",
          },
          {
            title: "24/7 admissions chatbot handling 80% of routine queries",
            desc: "Multilingual bot handles course eligibility, deadlines, and document submission — freeing admissions staff for high-value conversations.",
          },
          {
            title: "Early-warning system flagging at-risk students before midterms",
            desc: "Engagement signals, grade trajectories, and attendance patterns feed a model that identifies at-risk students 3–4 weeks before crisis point.",
          },
        ]}
        outcomesTitle="Measurable Education Impact"
        outcomes={[
          { value: "28%", label: "Higher course-completion rate" },
          { value: "60%", label: "Query deflection via chatbot" },
          { value: "2×", label: "Content creation speed" },
          { value: "4.5★", label: "Student satisfaction score" },
        ]}
        ctaTitle="Ready to Elevate Learning?"
        ctaDesc="Tell us about your education initiatives and we'll map the AI solutions that improve student outcomes — built responsibly around your data."
        breadcrumb={{ name: "Education", item: "https://ikarmic.com/industries/education" }}
      />
    </>
  );
}
