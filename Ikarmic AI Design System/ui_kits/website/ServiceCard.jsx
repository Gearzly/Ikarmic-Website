// ServiceCard.jsx — featured and small service-card variants + the section.

function ServiceCard({ service, featured = false }) {
  return (
    <a href="#" className={"ik-service-card" + (featured ? " featured" : "")}>
      {featured && <div className="glow"></div>}
      <div style={{ position: "relative", zIndex: 1 }}>
        {featured && service.badge && (
          <span className="badge">
            <span className="badge-dot ik-pulse"></span>
            {service.badge}
          </span>
        )}
        <div className={"ik-icobox ik-" + service.tint} style={{ width: featured ? "3rem" : "2.5rem", height: featured ? "3rem" : "2.5rem" }}>
          <Icon path={service.iconPath} size={featured ? 22 : 18} />
        </div>
        <p className="num">{service.num}</p>
        <h3 className="title">{service.title}</h3>
        <p className="desc">{service.desc}</p>
        {featured && (
          <span className="ik-btn-text" style={{ marginTop: "2rem", display: "inline-flex" }}>
            Learn more
            <Icon path={ICONS.arrowRight} size={14} stroke={2.5} />
          </span>
        )}
      </div>
    </a>
  );
}

function ServicesSection() {
  const { services } = window.IK_DATA;
  const [featured, ...rest] = services;
  return (
    <section className="ik-section ik-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", gap: "1rem", flexWrap: "wrap" }}>
        <FadeLeft>
          <p className="ik-eyebrow">Core Services</p>
          <h2 className="ik-h2">Five capabilities,<br />one clear outcome.</h2>
        </FadeLeft>
        <FadeRight>
          <a href="#" className="ik-btn-text">
            All services
            <Icon path={ICONS.arrowRight} size={14} stroke={2.5} />
          </a>
        </FadeRight>
      </div>

      <div className="ik-services-grid">
        <FadeLeft className="ik-service-featured">
          <ServiceCard service={featured} featured={true} />
        </FadeLeft>
        <Stagger className="ik-service-rest">
          {rest.map((s) => (
            <div key={s.num}>
              <ServiceCard service={s} />
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

window.ServiceCard = ServiceCard;
window.ServicesSection = ServicesSection;
