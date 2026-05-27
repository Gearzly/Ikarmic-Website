// StepsSection.jsx — "How We Work" 3-step block.

function StepsSection() {
  const { steps } = window.IK_DATA;
  return (
    <section className="ik-container" style={{ paddingBottom: "6rem" }}>
      <div style={{ borderRadius: "1.5rem", background: "#171717", border: "1px solid #262626", overflow: "hidden" }}>
        <div style={{ padding: "3.5rem 3rem" }}>
          <FadeUp>
            <p className="ik-eyebrow">How We Work</p>
            <h2 className="ik-h2">From idea to production<br />in six weeks.</h2>
            <p className="ik-lede" style={{ marginBottom: "3rem", maxWidth: "32rem" }}>
              Every engagement follows the same three-phase structure. Predictable pace, working demos at every milestone, no surprises.
            </p>
          </FadeUp>

          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {steps.map((step) => (
              <div key={step.num}>
                <div style={{ padding: "1.75rem", borderRadius: "1rem", background: "rgba(38,38,38,0.5)", border: "1px solid rgba(64,64,64,0.5)", transition: "border-color 0.2s", height: "100%" }}>
                  <div className="ik-icobox" style={{ marginBottom: "1.5rem" }}>
                    <Icon path={step.num === "01" ? ICONS.search : step.num === "02" ? ICONS.arrowDiag : ICONS.bolt} size={20} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    <h3 className="ik-h4" style={{ fontSize: "1.125rem" }}>{step.title}</h3>
                    <span style={{ fontSize: "0.625rem", padding: "0.25rem 0.625rem", borderRadius: 999, background: "rgba(49,46,129,0.8)", color: "#818cf8", border: "1px solid rgba(55,48,163,0.4)", fontWeight: 600 }}>
                      {step.duration}
                    </span>
                  </div>
                  <p className="ik-body-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </Stagger>

          <FadeUp delay={0.3}>
            <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#" className="ik-btn ik-btn-primary ik-btn-md">
                Start with a free scoping call
                <Icon path={ICONS.arrowRight} size={16} stroke={2} />
              </a>
              <a href="#" className="ik-btn-text" style={{ color: "#a3a3a3" }}>Learn about us →</a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

window.StepsSection = StepsSection;
