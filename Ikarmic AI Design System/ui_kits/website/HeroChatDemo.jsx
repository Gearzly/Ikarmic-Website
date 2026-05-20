// HeroChatDemo.jsx — the signature in-product chat preview.
// Animates messages in via CSS keyframes (matches the codebase).

const heroChatStyles = {
  wrap: {
    position: "relative",
    borderRadius: "1rem",
    overflow: "hidden",
    border: "1px solid rgba(64,64,64,0.6)",
    background: "#171717",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), 0 10px 15px -3px rgba(0,0,0,0.3)",
  },
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    background: "rgba(38,38,38,0.7)",
    borderBottom: "1px solid rgba(64,64,64,0.5)",
  },
  dot: (color) => ({ width: 12, height: 12, borderRadius: "50%", background: color }),
  body: {
    padding: "20px 20px 8px",
    height: 280,
    overflow: "hidden",
    position: "relative",
  },
  composer: {
    padding: "12px 16px",
    borderTop: "1px solid #262626",
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(23,23,23,0.8)",
  },
  composerInput: {
    flex: 1,
    background: "rgba(38,38,38,0.8)",
    border: "1px solid rgba(64,64,64,0.4)",
    borderRadius: "0.75rem",
    padding: "10px 16px",
    fontSize: "0.875rem",
    color: "#525252",
    fontStyle: "italic",
    userSelect: "none",
  },
  composerBtn: {
    width: 36,
    height: 36,
    borderRadius: "0.75rem",
    background: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    flexShrink: 0,
    cursor: "pointer",
  },
  fadeOut: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 32,
    background: "linear-gradient(to top, #171717, transparent)",
    pointerEvents: "none",
  },
};

const MESSAGES = [
  { from: "user", text: "How fast can you deploy an AI chatbot?" },
  { from: "ai", text: "Typically 2–3 weeks. We handle integration, training data, and testing." },
  { from: "user", text: "What channels does it support?" },
  { from: "ai", text: "Web chat, WhatsApp, Slack, and email — from one model, simultaneously." },
];

function HeroChatDemo() {
  return (
    <div style={heroChatStyles.wrap}>
      <div style={heroChatStyles.bar}>
        <div style={heroChatStyles.dot("rgba(239,68,68,0.7)")}></div>
        <div style={heroChatStyles.dot("rgba(234,179,8,0.7)")}></div>
        <div style={heroChatStyles.dot("rgba(34,197,94,0.7)")}></div>
        <div style={{ marginLeft: 8, display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", animation: "ik-pulse 2s ease-in-out infinite" }}></span>
          <span style={{ fontSize: "0.75rem", color: "#d4d4d4", fontWeight: 500 }}>Ikarmic AI</span>
        </div>
      </div>

      <div style={heroChatStyles.body}>
        {MESSAGES.map((msg, idx) => (
          <ChatMsg key={idx} msg={msg} delay={0.5 + idx * 0.3} />
        ))}
        <TypingIndicator delay={MESSAGES.length * 0.3 + 0.5} />
        <div style={heroChatStyles.fadeOut}></div>
      </div>

      <div style={heroChatStyles.composer}>
        <div style={heroChatStyles.composerInput}>Ask about AI services, timelines, pricing…</div>
        <div style={heroChatStyles.composerBtn}>
          <Icon path={ICONS.send} size={16} stroke={2} />
        </div>
      </div>
    </div>
  );
}

function ChatMsg({ msg, delay }) {
  const isUser = msg.from === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
      animation: `ik-fadeup 0.4s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s both`,
    }}>
      {!isUser && (
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#4f46e5", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8, flexShrink: 0 }}>AI</div>
      )}
      <div style={{
        maxWidth: "78%",
        padding: "10px 16px",
        borderRadius: 16,
        fontSize: "0.875rem",
        lineHeight: 1.45,
        ...(isUser
          ? { background: "#4f46e5", color: "#fff", borderBottomRightRadius: 4 }
          : { background: "#262626", color: "#e5e5e5", border: "1px solid rgba(64,64,64,0.5)", borderBottomLeftRadius: 4 }),
      }}>
        {msg.text}
      </div>
      {isUser && (
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#404040", color: "#d4d4d4", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 8, flexShrink: 0 }}>You</div>
      )}
    </div>
  );
}

function TypingIndicator({ delay }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 12, animation: `ik-fadeup 0.3s ease ${delay}s both` }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: "#4f46e5", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>AI</div>
      <div style={{ background: "#262626", border: "1px solid rgba(64,64,64,0.5)", borderRadius: 16, borderBottomLeftRadius: 4, padding: "12px 16px", display: "flex", gap: 4 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", animation: "ik-bounce 1s infinite", animationDelay: "0ms" }}></span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", animation: "ik-bounce 1s infinite", animationDelay: "150ms" }}></span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", animation: "ik-bounce 1s infinite", animationDelay: "300ms" }}></span>
      </div>
    </div>
  );
}

window.HeroChatDemo = HeroChatDemo;
