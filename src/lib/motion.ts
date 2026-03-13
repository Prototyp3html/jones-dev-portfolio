import type { Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring" as const, stiffness: 72, damping: 18 };

// Section wrapper — opacity only; no y-travel so it doesn't fight child animations
export const sectionReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

// Bold spring slide-up for section headings
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING },
  },
};

// Softer fade-up for subtitle paragraphs, delayed after heading
export const subtitleReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.18, ease: EASE_OUT },
  },
};

// Cards stagger — delay 0.32 gives heading time to land before cards start
export const staggerContainer = (stagger = 0.13, delayChildren = 0.32): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// Cards slide up further with scale + spring for punchy feel
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 52, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...SPRING },
  },
};

export const viewportOnce = { once: true, amount: 0.12 };