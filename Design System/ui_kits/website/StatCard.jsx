// StatCard.jsx — gradient-border stat card. Used in hero / stats blocks.

function StatCard({ value, label, sub }) {
  return (
    <div className="ik-card-stat">
      <div className="ik-card-stat-inner">
        <div style={{ fontSize: "2.25rem", fontWeight: 700, color: "#818cf8", lineHeight: 1, marginBottom: "0.5rem" }}>{value}</div>
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", margin: "0 0 0.25rem 0" }}>{label}</p>
        {sub && <p style={{ fontSize: "0.75rem", color: "#737373", margin: 0 }}>{sub}</p>}
      </div>
    </div>
  );
}

function StatsSection() {
  const { stats } = window.IK_DATA;
  return (
    <section className="ik-section ik-container">
      <FadeUp>
        <p className="ik-eyebrow" style={{ textAlign: "center" }}>Proven Impact</p>
        <h2 className="ik-h2" style={{ textAlign: "center", marginBottom: "3.5rem" }}>Numbers that move the needle</h2>
      </FadeUp>
      <Stagger className="ik-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
        {stats.map((s) => (
          <div key={s.label}><StatCard {...s} /></div>
        ))}
      </Stagger>
    </section>
  );
}

window.StatCard = StatCard;
window.StatsSection = StatsSection;
