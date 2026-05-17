import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Head back to Ikarmic AI.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      {/* Decorative blob */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
      />

      <p className="relative text-8xl font-black text-transparent bg-clip-text"
        style={{ backgroundImage: "linear-gradient(135deg, #6366f1, #818cf8)" }}>
        404
      </p>

      <h1 className="relative mt-6 text-3xl md:text-4xl font-bold text-white">
        Page not found
      </h1>
      <p className="relative mt-4 text-neutral-400 max-w-md leading-relaxed">
        The page you&apos;re looking for has been moved, deleted, or never existed. Let&apos;s get you somewhere useful.
      </p>

      <div className="relative mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-colors"
        >
          Contact Us
        </Link>
      </div>

      <div className="relative mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        {[
          { label: "Services", href: "/services" },
          { label: "Solutions", href: "/solutions" },
          { label: "About", href: "/about" },
          { label: "Blog", href: "/blog" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-neutral-500 hover:text-indigo-400 transition-colors underline underline-offset-4"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
