"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

// ── Shared easing ──────────────────────────────────────────────────────────
const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ── FadeUp ─────────────────────────────────────────────────────────────────
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease },
  }),
};

interface AnimProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      variants={fadeUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── FadeLeft ───────────────────────────────────────────────────────────────
const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease },
  }),
};

export function FadeLeft({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      variants={fadeLeftVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── FadeRight ──────────────────────────────────────────────────────────────
const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, delay, ease },
  }),
};

export function FadeRight({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
      variants={fadeRightVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── ScaleIn ────────────────────────────────────────────────────────────────
export function ScaleIn({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stagger container ──────────────────────────────────────────────────────
interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({ children, className = "", staggerDelay = 0.1 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerItem ────────────────────────────────────────────────────────────
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── HoverCard – lift + subtle border glow on hover ─────────────────────────
export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── CountUp – animated number (simple CSS-only fallback for SSR safety) ────
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease }}
      className={className}
    >
      {value}
    </motion.span>
  );
}
