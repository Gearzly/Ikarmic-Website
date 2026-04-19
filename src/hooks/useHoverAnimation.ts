import { useRef } from 'react';
import { gsap } from 'gsap';
import { ANIMATION_TIMINGS, EASING } from '@/animations/gsap-config';

interface HoverAnimationOptions {
  duration?: number;
  ease?: string;
  scale?: number;
  y?: number;
  rotation?: number;
}

/**
 * Hook for hover animations
 * Handles scale + lift effect on hover
 */
export const useHoverAnimation = (options: HoverAnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);

  const {
    duration = ANIMATION_TIMINGS.micro,
    ease = EASING.easeOutCubic,
    scale = 1.02,
    y = -4,
  } = options;

  const handleMouseEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale,
      y,
      duration,
      ease,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      y: 0,
      duration,
      ease,
      overwrite: 'auto',
    });
  };

  return { ref, handleMouseEnter, handleMouseLeave };
};

/**
 * Hook for click/tap animations
 * Quick pulse effect on interaction
 */
export const useClickAnimation = () => {
  const ref = useRef<HTMLElement>(null);

  const animateClick = () => {
    if (!ref.current) return;

    gsap.timeline()
      .to(ref.current, {
        scale: 0.95,
        duration: 0.1,
        ease: EASING.easeOutQuad,
      }, 0)
      .to(ref.current, {
        scale: 1,
        duration: 0.2,
        ease: EASING.back,
      }, 0.1);
  };

  return { ref, animateClick };
};

/**
 * Hook for focus ring animation
 * Animated focus state for accessibility
 */
export const useFocusAnimation = (options: { duration?: number } = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { duration = ANIMATION_TIMINGS.micro } = options;

  const handleFocus = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      boxShadow: '0 0 0 3px hsl(243 75% 59%)',
      duration,
      ease: EASING.easeOutQuad,
    });
  };

  const handleBlur = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      boxShadow: '0 0 0 0px transparent',
      duration,
      ease: EASING.easeOutQuad,
    });
  };

  return { ref, handleFocus, handleBlur };
};
