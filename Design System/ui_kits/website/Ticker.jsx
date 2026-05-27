// Ticker.jsx — infinite-scroll capability bar that runs under the hero.

function Ticker() {
  const items = window.IK_DATA.tickerItems;
  const doubled = [...items, ...items];
  return (
    <section className="ik-ticker">
      <div className="ik-ticker-row">
        <div className="ik-ticker-row-inner">
          {doubled.map((item, i) => (
            <span key={i} className="ik-ticker-item">
              <span className="dot"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Ticker = Ticker;
