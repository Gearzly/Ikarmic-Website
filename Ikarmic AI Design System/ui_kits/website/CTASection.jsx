// CTASection.jsx + Footer.jsx

function CTASection() {
  return (
    <section className="ik-container" style={{ paddingBottom: "7rem" }}>
      <FadeUp>
        <div className="ik-cta-block">
          <div className="ik-cta-blob-1"></div>
          <div className="ik-cta-blob-2"></div>
          <div className="ik-cta-dots"></div>
          <div className="ik-cta-inner">
            <span className="ik-pill" style={{ marginBottom: "1.5rem" }}>
              <span className="ik-pill-dot ik-pulse"></span>
              Free 30-min session, no commitment
            </span>
            <h2>Let&apos;s build something<br /><span className="ik-gradient">precise.</span></h2>
            <p>Tell us what you&apos;re trying to automate, predict, or personalise. We&apos;ll reply within two business days with a concrete scoping plan — no slides, no fluff.</p>
            <div className="ik-cta-buttons">
              <a href="#" className="ik-btn ik-btn-primary ik-glow">Book a Free Scoping Call</a>
              <a href="#" className="ik-btn ik-btn-secondary">Explore All Services</a>
            </div>
            <div className="ik-cta-foot">
              <a href="mailto:hello@ikarmic.com">hello@ikarmic.com</a>
              <span className="ik-cta-divider"></span>
              <span>Hyderabad, India · Remote-first</span>
              <span className="ik-cta-divider"></span>
              <span>Respond within 2 business days</span>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ik-footer">
      <div className="ik-footer-inner">
        <div className="ik-footer-grid">
          <div>
            <a href="#" className="ik-nav-logo"><img src="../../assets/logo.png" alt="Ikarmic AI" style={{ height: "2.25rem" }} /></a>
            <p className="ik-footer-blurb">
              Empowering businesses with intelligent AI technologies. We design and ship machine learning systems that are calm, reliable, and easy to adopt.
            </p>
            <div className="ik-footer-socials">
              <a href="#">LinkedIn</a>
              <a href="#">X / Twitter</a>
              <a href="#">Email</a>
            </div>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Solutions</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#">AI Chatbots</a></li>
              <li><a href="#">Business Automation</a></li>
              <li><a href="#">Data Analytics</a></li>
              <li><a href="#">Generative AI</a></li>
              <li><a href="#">Custom AI</a></li>
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Industries</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="ik-footer-bottom">
          <p style={{ margin: 0 }}>© 2026 Ikarmic AI. All rights reserved.</p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.CTASection = CTASection;
window.Footer = Footer;
