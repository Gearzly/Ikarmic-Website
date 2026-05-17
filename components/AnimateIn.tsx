"use client";

import { motion } from "framer-motion";
import { type ReactNode, useMemo } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

interface AnimProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeUp({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeLeft({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeRight({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = "" }: AnimProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({ children, className = "", staggerDelay = 0.08 }: StaggerProps) {
  const variants = useMemo(() => ({
    visible: { transition: { staggerChildren: staggerDelay } },
  }), [staggerDelay]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className={className}>
      {children}
    </motion.div>
  );
}

export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {value}
    </motion.span>
  );
}
