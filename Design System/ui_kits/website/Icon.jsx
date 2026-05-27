// Icon.jsx — inline Heroicons-outline-style SVG renderer.
// Mirrors the codebase pattern: fill=none, stroke=currentColor, strokeWidth=1.5.

function Icon({ path, size = 20, stroke = 1.5, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

// Common icon paths used across the kit
const ICONS = {
  arrowRight: "M17 8l4 4m0 0l-4 4m4-4H3",
  chevronDown: "M19 9l-7 7-7-7",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M6 18L18 6M6 6l12 12",
  check: "M5 13l4 4L19 7",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  send: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  bolt: "M13 10V3L4 14h7v7l9-11h-7z",
  sparkle: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  arrowDiag: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
};

window.Icon = Icon;
window.ICONS = ICONS;
