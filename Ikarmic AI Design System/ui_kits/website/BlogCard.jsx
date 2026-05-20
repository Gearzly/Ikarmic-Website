// BlogCard.jsx + TestimonialCard.jsx + their sections.

const tagTints = {
  indigo:  { c: "#818cf8", bg: "rgba(49,46,129,0.6)", b: "rgba(55,48,163,0.4)" },
  violet:  { c: "#a78bfa", bg: "rgba(46,16,101,0.6)", b: "rgba(91,33,182,0.4)" },
  emerald: { c: "#34d399", bg: "rgba(2,44,34,0.6)",   b: "rgba(6,95,70,0.4)"  },
};

function BlogCard({ post }) {
  const t = tagTints[post.tagTint] || tagTints.indigo;
  return (
    <a href="#" style={{ display: "block", height: "100%" }}>
      <div className="ik-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <span style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", padding: "0.25rem 0.625rem", borderRadius: 999, border: "1px solid " + t.b, background: t.bg, color: t.c }}>
            {post.tag}
          </span>
          <span style={{ fontSize: "0.75rem", color: "#525252" }}>{post.readTime} read</span>
        </div>
        <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#fff", margin: "0 0 0.75rem", lineHeight: 1.35, flex: 1 }}>{post.title}</h3>
        <p className="ik-body-sm" style={{ marginBottom: "1.25rem" }}>{post.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid #262626" }}>
          <span style={{ fontSize: "0.75rem", color: "#525252" }}>{post.date}</span>
          <span className="ik-btn-text" style={{ fontSize: "0.75rem" }}>
            Read
            <Icon path={ICONS.arrowRight} size={12} stroke={2.5} />
          </span>
        </div>
      </div>
    </a>
  );
}

function BlogSection() {
  const { blogPosts } = window.IK_DATA;
  return (
    <section className="ik-section ik-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
        <FadeLeft>
          <p className="ik-eyebrow">Insights</p>
          <h2 className="ik-h2">Thinking out loud<br />about AI that lasts.</h2>
        </FadeLeft>
        <FadeRight>
          <a href="#" className="ik-btn-text">All articles<Icon path={ICONS.arrowRight} size={14} stroke={2.5} /></a>
        </FadeRight>
      </div>
      <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {blogPosts.map((p) => <div key={p.title}><BlogCard post={p} /></div>)}
      </Stagger>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div className="ik-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem" }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#818cf8">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote style={{ fontSize: "0.875rem", color: "#d4d4d4", lineHeight: 1.625, flex: 1, marginBottom: "1.5rem", margin: 0 }}>
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "1.25rem", marginTop: "1.5rem", borderTop: "1px solid #262626" }}>
        <div style={{ width: 40, height: 40, borderRadius: "0.75rem", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>{t.avatar}</div>
        <div>
          <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", margin: 0 }}>{t.name}</p>
          <p style={{ fontSize: "0.75rem", color: "#737373", margin: 0 }}>{t.title}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const { testimonials } = window.IK_DATA;
  return (
    <section className="ik-section ik-container">
      <FadeUp>
        <p className="ik-eyebrow">Client Results</p>
        <h2 className="ik-h2" style={{ marginBottom: "3rem" }}>Heard from people who've shipped with us</h2>
      </FadeUp>
      <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {testimonials.map((t) => <div key={t.name}><TestimonialCard t={t} /></div>)}
      </Stagger>
    </section>
  );
}

window.BlogCard = BlogCard;
window.BlogSection = BlogSection;
window.TestimonialCard = TestimonialCard;
window.TestimonialsSection = TestimonialsSection;
