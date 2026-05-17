"use client";

import { useState, useRef } from "react";
import { FadeLeft } from "@/components/AnimateIn";

type FormState = "idle" | "submitting" | "success" | "error";

const SERVICE_OPTIONS = [
  "AI Chatbots & Conversational AI",
  "Business Automation",
  "Data Analytics & Predictive AI",
  "Generative AI Solutions",
  "Custom AI Development",
  "Not sure yet — need advice",
];

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(payload: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (payload.name ?? "").trim();
  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();

  if (!name || name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!message || message.length < 10) errors.message = "Message must be at least 10 characters.";

  return errors;
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      company: (fd.get("company") as string) ?? "",
      phone: (fd.get("phone") as string) ?? "",
      service: (fd.get("service") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };

    const errors = validate(payload);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setState("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      formRef.current?.reset();
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  return (
    <FadeLeft>
      <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
        <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>

        {/* ── Success State ──────────────────────────────────────────────── */}
        {state === "success" && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
            <p className="text-neutral-400 text-sm max-w-xs">
              We&apos;ve received your enquiry and sent you a confirmation email. Expect a reply within 2 business days.
            </p>
            <button
              onClick={() => setState("idle")}
              className="mt-6 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Send another message
            </button>
          </div>
        )}

        {/* ── Form ──────────────────────────────────────────────────────── */}
        {state !== "success" && (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  placeholder="Jane Smith"
                  className={`w-full px-4 py-3 rounded-lg bg-neutral-800 border text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors ${fieldErrors.name ? "border-rose-500" : "border-neutral-700"}`}
                />
                {fieldErrors.name && <p className="mt-1 text-xs text-rose-400">{fieldErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Email <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className={`w-full px-4 py-3 rounded-lg bg-neutral-800 border text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors ${fieldErrors.email ? "border-rose-500" : "border-neutral-700"}`}
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-rose-400">{fieldErrors.email}</p>}
              </div>
            </div>

            {/* Company + Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Service interest */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-neutral-300 mb-1.5">
                I&apos;m interested in
              </label>
              <select
                id="service"
                name="service"
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
              >
                <option value="">Select a service…</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1.5">
                Message <span className="text-indigo-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                rows={5}
                placeholder="Describe the problem you're trying to solve…"
                className={`w-full px-4 py-3 rounded-lg bg-neutral-800 border text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none ${fieldErrors.message ? "border-rose-500" : "border-neutral-700"}`}
              />
              {fieldErrors.message && <p className="mt-1 text-xs text-rose-400">{fieldErrors.message}</p>}
            </div>

            {/* Error */}
            {state === "error" && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-rose-950/40 border border-rose-800/40 text-sm text-rose-300">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {state === "submitting" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </FadeLeft>
  );
}
