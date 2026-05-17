import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { OrganizationJsonLd } from "next-seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://ikarmic.com"),
  title: {
    default: "Ikarmic AI — AI that works for people",
    template: "%s | Ikarmic AI",
  },
  description:
    "Ikarmic designs and ships AI systems that are calm, reliable, and easy to adopt — chatbots, automation, analytics, generative AI, and custom ML for real business outcomes.",
  keywords: [
    "AI solutions", "artificial intelligence", "machine learning", "AI chatbots",
    "business automation", "generative AI", "data analytics", "custom AI",
    "AI consulting", "enterprise AI", "Ikarmic AI", "AI company India",
  ],
  authors: [{ name: "Ikarmic AI", url: "https://ikarmic.com" }],
  creator: "Ikarmic AI",
  publisher: "Ikarmic AI",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ikarmic.com",
    siteName: "Ikarmic AI",
    title: "Ikarmic AI — AI that works for people",
    description:
      "Ikarmic designs and ships AI systems that are calm, reliable, and easy to adopt — chatbots, automation, analytics, generative AI, and custom ML for real business outcomes.",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Ikarmic AI" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ikarmicai",
    creator: "@ikarmicai",
    title: "Ikarmic AI — AI that works for people",
    description:
      "Ikarmic designs and ships AI systems that are calm, reliable, and easy to adopt.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: "https://ikarmic.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <OrganizationJsonLd
          type="Organization"
          name="Ikarmic AI"
          url="https://ikarmic.com"
          sameAs={[
            "https://www.linkedin.com/company/ikarmic-ai",
            "https://x.com/ikarmicai",
          ]}
        />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
