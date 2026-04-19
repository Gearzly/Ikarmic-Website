/**
 * GSAP Animation Configuration
 * Centralized animation timing and easing functions
 */

export const ANIMATION_TIMINGS = {
  // Micro animations (fast feedback)
  micro: 0.15,
  // Standard transitions (most common)
  standard: 0.2,
  // Moderate animations
  moderate: 0.3,
  // Longer animations (scroll-triggered, complex)
  extended: 0.5,
  // Very long animations (dramatic effects)
  dramatic: 0.8,
} as const;

export const EASING = {
  // Smooth, natural easing
  easeInOutQuad: 'power1.inOut',
  easeInOutCubic: 'power2.inOut',
  // Fast in, slow out (typical UI response)
  easeOutQuad: 'power1.out',
  easeOutCubic: 'power2.out',
  // Slow in, fast out
  easeInQuad: 'power1.in',
  easeInCubic: 'power2.in',
  // Elastic/bounce effects
  elastic: 'elastic.out(1, 0.5)',
  back: 'back.out(1.7)',
  // Linear (used sparingly)
  linear: 'none',
} as const;

export const DEFAULTS = {
  duration: ANIMATION_TIMINGS.standard,
  ease: EASING.easeOutCubic,
  stagger: 0.08,
} as const;

// Scroll trigger defaults
export const SCROLL_TRIGGER_DEFAULTS = {
  trigger: undefined,
  start: 'top center',
  end: 'bottom center',
  scrub: false,
  once: false,
  markers: false,
} as const;
