import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_TIMINGS, EASING } from '@/animations/gsap-config';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  duration?: number;
  ease?: string;
  stagger?: number;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

/**
 * Hook for triggering animations on scroll
 * Handles fade + slideUp by default
 */
export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: ScrollAnimationOptions = {}
) => {
  const {
    duration = ANIMATION_TIMINGS.moderate,
    ease = EASING.easeOutCubic,
    once = false,
    onEnter,
    onLeave,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    // Set initial state
    gsap.set(ref.current, {
      opacity: 0,
      y: 30,
    });

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once,
          onEnter,
          onLeave,
        },
      });
    });

    return () => ctx.revert();
  }, [duration, ease, once, onEnter, onLeave]);
};

/**
 * Hook for staggered animations on scroll
 * Animates children elements with stagger
 */
export const useScrollStaggerAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: ScrollAnimationOptions & { selector?: string } = {}
) => {
  const {
    duration = ANIMATION_TIMINGS.moderate,
    ease = EASING.easeOutCubic,
    stagger = 0.1,
    once = false,
    selector = '> *',
    onEnter,
    onLeave,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll(selector);
    if (children.length === 0) return;

    // Set initial state
    gsap.set(children, {
      opacity: 0,
      y: 30,
    });

    const ctx = gsap.context(() => {
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once,
          onEnter,
          onLeave,
        },
      });
    });

    return () => ctx.revert();
  }, [duration, ease, stagger, once, selector, onEnter, onLeave]);
};

/**
 * Hook for parallax scroll effect
 * Moves element based on scroll position
 */
export const useParallaxScroll = (
  ref: React.RefObject<HTMLElement>,
  intensity: number = 0.5
) => {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: 'random(-100, 100)',
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            if (ref.current) {
              gsap.set(ref.current, {
                y: self.progress * 100 * intensity,
              });
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, [intensity]);
};
