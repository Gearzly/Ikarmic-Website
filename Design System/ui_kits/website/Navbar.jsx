// Navbar.jsx — fixed top nav, logo + 4 links + 3 flyouts + CTA.
const { useState: useNavState } = React;

function Navbar() {
  const [open, setOpen] = useNavState(false);

  return (
    <header className="ik-nav">
      <div className="ik-nav-inner">
        <a href="#" className="ik-nav-logo">
          <img src="../../assets/logo.png" alt="Ikarmic AI" />
        </a>

        <nav className="ik-nav-links" style={{ display: open ? "none" : undefined }} aria-label="Primary">
          <a href="#" className="ik-nav-link">Home</a>
          <a href="#" className="ik-nav-link">About</a>
          <MegaMenu label="Services" id="mega-services" />
          <MegaMenu label="Solutions" id="mega-solutions" />
          <MegaMenu label="Industries" id="mega-industries" />
          <a href="#" className="ik-nav-link">Blog</a>
          <a href="#" className="ik-nav-link">Contact</a>
        </nav>

        <a href="#" className="ik-btn ik-btn-primary ik-btn-md">Start a project</a>
      </div>
    </header>
  );
}

function NavGroup({ label, footer }) {
  return (
    <div className="ik-nav-group">
      <button className="ik-nav-link">
        {label}
        <Icon path={ICONS.chevronDown} size={12} stroke={2} />
      </button>
      <div className="ik-flyout-wrap">
        <Flyout footer={footer} />
      </div>
    </div>
  );
}

function Flyout({ footer }) {
  const items = window.IK_DATA.navServices;
  return (
    <div className="ik-flyout">
      <div className="ik-flyout-top"></div>
      <div className="ik-flyout-grid">
        {items.map((it, i) => (
          <a key={i} className="ik-flyout-item" href="#">
            <div className="ik-flyout-ico">
              <Icon path={it.iconPath} size={16} />
            </div>
            <div>
              <p className="ik-flyout-lab">{it.label}</p>
              <p className="ik-flyout-desc">{it.desc}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="ik-flyout-foot">
        <span className="a">Not sure which fits?</span>
        <a href="#" className="b">{footer} →</a>
      </div>
    </div>
  );
}

window.Navbar = Navbar;
