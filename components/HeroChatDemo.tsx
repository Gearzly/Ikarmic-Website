"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  { from: "user", text: "How fast can you deploy an AI chatbot for our support team?" },
  {
    from: "ai",
    text: "Typically 2–3 weeks from scoping to go-live. We handle integration, training data, and testing.",
  },
  { from: "user", text: "What channels does it support?" },
  {
    from: "ai",
    text: "Web chat, WhatsApp, Slack, and email — all from one model, deployed simultaneously.",
  },
  { from: "user", text: "Can it handle complex product queries?" },
  {
    from: "ai",
    text: "Yes. We fine-tune on your docs so it resolves tier-1 and tier-2 queries autonomously — 24/7.",
  },
];

export default function HeroChatDemo() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    function schedule(fn: () => void, delay: number) {
      const t = setTimeout(fn, delay);
      timeouts.push(t);
    }

    function showMessage(index: number) {
      if (index >= MESSAGES.length) {
        schedule(() => {
          setVisible([]);
          setTyping(false);
          schedule(() => showMessage(0), 600);
        }, 3800);
        return;
      }
      const msg = MESSAGES[index];
      if (msg.from === "ai") {
        setTyping(true);
        schedule(() => {
          setTyping(false);
          setVisible((prev) => [...prev, index]);
          schedule(() => showMessage(index + 1), 1500);
        }, 1700);
      } else {
        setVisible((prev) => [...prev, index]);
        schedule(() => showMessage(index + 1), 1000);
      }
    }

    schedule(() => showMessage(0), 700);
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-neutral-700/60 bg-neutral-900 shadow-[0_0_80px_rgba(99,102,241,0.18)] ring-1 ring-inset ring-white/5">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800/70 border-b border-neutral-700/50 backdrop-blur-sm">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="ml-3 flex items-center gap-2 flex-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-neutral-300 font-medium">Ikarmic AI Assistant</span>
        </div>
        <span className="text-[10px] text-neutral-600 font-mono">LIVE DEMO</span>
      </div>

      {/* Messages */}
      <div className="px-5 pt-5 pb-2 h-[300px] overflow-hidden relative">
        <AnimatePresence>
          {visible.map((idx) => {
            const msg = MESSAGES[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`flex mb-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.from === "ai" && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold mr-2 mt-0.5 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-indigo-600 text-white rounded-br-sm shadow-[0_0_16px_rgba(99,102,241,0.3)]"
                      : "bg-neutral-800 text-neutral-200 rounded-bl-sm border border-neutral-700/50"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.from === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-neutral-700 flex items-center justify-center text-neutral-300 text-[10px] font-bold ml-2 mt-0.5 shrink-0">
                    You
                  </div>
                )}
              </motion.div>
            );
          })}

          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-end gap-2 mb-3"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-[10px] font-bold shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                AI
              </div>
              <div className="bg-neutral-800 border border-neutral-700/50 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />
      </div>

      {/* Fake input bar */}
      <div className="px-4 py-3 border-t border-neutral-800 flex items-center gap-3 bg-neutral-900/80">
        <div className="flex-1 bg-neutral-800/80 border border-neutral-700/40 rounded-xl px-4 py-2.5 text-sm text-neutral-600 italic select-none">
          Ask about AI services, timelines, pricing…
        </div>
        <button className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center shrink-0 shadow-[0_0_14px_rgba(99,102,241,0.35)]">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Glow ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-indigo-500/10 pointer-events-none" />
    </div>
  );
}
