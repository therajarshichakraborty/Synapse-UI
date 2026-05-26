import type { Variants } from "motion/react";

// ─── Entrance animations ──────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ─── Stagger containers ───────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// ─── Interactive card states ──────────────────────────────────────────────────

export const glassCardVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 0 0px rgba(139, 92, 246, 0)",
  },
  hover: {
    scale: 1.015,
    boxShadow: "0 0 40px rgba(139, 92, 246, 0.12)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const sidebarItemVariants: Variants = {
  rest: { x: 0 },
  hover: { x: 3, transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── Page transitions ─────────────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// ─── Sidebar accordion ────────────────────────────────────────────────────────

export const sidebarAccordionContent: Variants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
};

export const chevronVariants: Variants = {
  closed: { rotate: 0 },
  open: { rotate: 90, transition: { duration: 0.25, ease: "easeOut" } },
};
