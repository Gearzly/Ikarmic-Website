import Link from "next/link";
import Logo from "@/components/Logo";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-3 text-sm text-neutral-400 max-w-xs">
              AI systems shipped in weeks, not quarters. We design calm, reliable machine learning for support, operations, analytics, and product teams.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.linkedin.com/company/ikarmic-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/ikarmicai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                X / Twitter
              </a>
              <a
                href="mailto:hello@ikarmic.com"
                className="text-neutral-400 hover:text-white transition-colors text-sm"
              >
                Email
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Solutions", href: "/solutions" },
                { label: "Products", href: "/products" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Services</p>
            <ul className="space-y-2">
              {[
                { label: "AI Chatbots", href: "/services/ai-chatbots" },
                { label: "Business Automation", href: "/services/business-automation" },
                { label: "Data Analytics", href: "/services/data-analytics" },
                { label: "Generative AI", href: "/services/generative-ai" },
                { label: "Custom AI", href: "/services/custom-ai" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Resources</p>
            <ul className="space-y-2">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Industries", href: "/industries" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-500">© 2026 Ikarmic AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">Terms</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
