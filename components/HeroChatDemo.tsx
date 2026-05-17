const MESSAGES = [
  { from: "user", text: "How fast can you deploy an AI chatbot?" },
  { from: "ai", text: "Typically 2-3 weeks. We handle integration, training data, and testing." },
  { from: "user", text: "What channels does it support?" },
  { from: "ai", text: "Web chat, WhatsApp, Slack, and email — from one model, simultaneously." },
];

export default function HeroChatDemo() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-neutral-700/60 bg-neutral-900 shadow-lg ring-1 ring-inset ring-white/5">
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-800/70 border-b border-neutral-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="ml-3 flex items-center gap-2 flex-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-neutral-300 font-medium">Ikarmic AI</span>
        </div>
      </div>

      <div className="px-5 pt-5 pb-2 h-[280px] overflow-hidden relative">
        {MESSAGES.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: `fadeUp 0.4s ease ${0.5 + idx * 0.3}s both` }}
          >
            {msg.from === "ai" && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold mr-2 mt-0.5 shrink-0">
                AI
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.from === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
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
          </div>
        ))}

        {/* Typing indicator */}
        <div className="flex items-end gap-2 mb-3" style={{ animation: "fadeUp 0.3s ease 2s both" }}>
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            AI
          </div>
          <div className="bg-neutral-800 border border-neutral-700/50 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-900 to-transparent" />
      </div>

      <div className="px-4 py-3 border-t border-neutral-800 flex items-center gap-3 bg-neutral-900/80">
        <div className="flex-1 bg-neutral-800/80 border border-neutral-700/40 rounded-xl px-4 py-2.5 text-sm text-neutral-600 italic select-none">
          Ask about AI services, timelines, pricing…
        </div>
        <button className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
