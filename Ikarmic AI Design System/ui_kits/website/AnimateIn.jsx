// AnimateIn.jsx — CSS-keyframe versions of the framer-motion wrappers.
// Reveal once on mount (close enough for a static demo).

const { useEffect, useRef, useState } = React;

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { rootMargin: "-60px" });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);
  return [ref, seen];
}

function FadeUp({ children, delay = 0, className = "", style = {} }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        animation: seen ? `ik-fadeup 0.4s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s both` : "none",
        opacity: seen ? undefined : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function FadeLeft({ children, delay = 0, className = "", style = {} }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={className} style={{ animation: seen ? `ik-fadeleft 0.4s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s both` : "none", opacity: seen ? undefined : 0, ...style }}>{children}</div>
  );
}

function FadeRight({ children, delay = 0, className = "", style = {} }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={className} style={{ animation: seen ? `ik-faderight 0.4s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s both` : "none", opacity: seen ? undefined : 0, ...style }}>{children}</div>
  );
}

function Stagger({ children, className = "", staggerDelay = 0.08, style = {} }) {
  const [ref, seen] = useInView();
  const kids = React.Children.toArray(children);
  return (
    <div ref={ref} className={className} style={style}>
      {kids.map((child, i) =>
        React.cloneElement(child, {
          style: {
            ...(child.props.style || {}),
            animation: seen ? `ik-fadeup 0.35s cubic-bezier(0.25,0.46,0.45,0.94) ${i * staggerDelay}s both` : "none",
            opacity: seen ? undefined : 0,
          },
          key: i,
        })
      )}
    </div>
  );
}

Object.assign(window, { FadeUp, FadeLeft, FadeRight, Stagger });
