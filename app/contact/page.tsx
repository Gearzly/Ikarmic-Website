import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { FadeRight } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Ikarmic AI team — let's scope your AI project together. We respond within 2 business days.",
  keywords: ["contact Ikarmic AI", "AI project consultation", "hire AI company", "AI consulting inquiry"],
  alternates: { canonical: "https://ikarmic.com/contact" },
  openGraph: {
    title: "Contact Ikarmic AI",
    description: "Get in touch with the Ikarmic AI team — let's scope your AI project together.",
    url: "https://ikarmic.com/contact",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Contact Ikarmic AI", description: "Let's scope your AI project together.", images: ["/og-default.png"] },
};

export default function ContactPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Contact</p>
        <h1 className="text-5xl md:text-6xl font-bold text-white max-w-2xl leading-tight">
          Let&apos;s Start a Conversation
        </h1>
        <p className="mt-6 text-lg text-neutral-400 max-w-xl leading-relaxed">
          Tell us about your challenge. We&apos;ll come back to you within 2 business days with a clear view on whether and
          how we can help.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form — client component handles SMTP submission */}
          <ContactForm />

          {/* Info */}
          <FadeRight>
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Contact Details</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-0.5">✉</span>
                    <div>
                      <p className="text-sm text-neutral-400">Email</p>
                      <a href="mailto:hello@ikarmic.com" className="text-white hover:text-indigo-300 transition-colors font-medium">
                        hello@ikarmic.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-0.5">✆</span>
                    <div>
                      <p className="text-sm text-neutral-400">Phone</p>
                      <a href="tel:+917075612365" className="text-white hover:text-indigo-300 transition-colors font-medium">
                        +91 7075 612 365
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-0.5">⌖</span>
                    <div>
                      <p className="text-sm text-neutral-400">Location</p>
                      <p className="text-white font-medium">Hyderabad, India</p>
                      <p className="text-neutral-400 text-sm">Remote-first · Serving clients globally</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">Office Hours</p>
                <div className="space-y-2">
                  {[
                    { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM IST" },
                    { days: "Saturday", hours: "10:00 AM – 4:00 PM IST" },
                    { days: "Sunday", hours: "Closed" },
                  ].map((row) => (
                    <div key={row.days} className="flex justify-between text-sm">
                      <span className="text-neutral-400">{row.days}</span>
                      <span className="text-white">{row.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-900/30">
                <p className="font-semibold text-white mb-2">Response Commitment</p>
                <p className="text-sm text-neutral-400">
                  We reply to every enquiry within 2 business days. For urgent projects, mention your timeline in the
                  message and we&apos;ll prioritise accordingly.
                </p>
              </div>
            </div>
          </FadeRight>
        </div>
      </section>
    </>
  );
}

