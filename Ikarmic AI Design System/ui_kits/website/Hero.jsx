// Hero.jsx — full hero block.

function Hero() {
  const { miniStats } = window.IK_DATA;
  return (
    <section className="ik-hero">
      <div className="ik-hero-bg">
        <div className="ik-hero-dots"></div>
        <div className="ik-hero-vignette"></div>
        <div className="ik-hero-blob1 ik-float"></div>
        <div className="ik-hero-blob2 ik-float-d"></div>
      </div>

      <div className="ik-hero-content">
        <div className="ik-hero-grid">
          <div>
            <FadeUp>
              <span className="ik-pill" style={{ marginBottom: "2rem" }}>
                <span className="ik-pill-dot ik-pulse"></span>
                AI Services &amp; Solutions Company
              </span>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="ik-h1 ik-h1-hero">
                AI that works
                <br />
                <span className="ik-gradient">for people.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="ik-lede">
                We design and ship machine learning systems that are calm, reliable, and easy to adopt — across products, operations, and customer experiences.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <a href="#" className="ik-btn ik-btn-primary">
                  Get a Free AI Scoping Call
                  <Icon path={ICONS.arrowRight} size={16} stroke={2} />
                </a>
                <a href="#" className="ik-btn ik-btn-secondary">View Solutions</a>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="ik-hero-stats">
                {miniStats.map((s) => (
                  <div key={s.l} className="ik-hero-stat">
                    <div className="v">{s.v}</div>
                    <div className="l">{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          <FadeRight delay={0.12}>
            <HeroChatDemo />
          </FadeRight>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
