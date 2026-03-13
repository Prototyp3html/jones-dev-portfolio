import type { Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring" as const, stiffness: 80, damping: 17 };
const EASE_SWIFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const liftHover = {
  y: -8,
  scale: 1.02,
  transition: { type: "spring" as const, stiffness: 280, damping: 22 },
};

// Section wrapper — opacity only; no y-travel so it doesn't fight child animations
export const sectionReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_SWIFT },
  },
};

// Bold spring slide-up for section headings
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 56, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...SPRING },
  },
};

// Softer fade-up for subtitle paragraphs, delayed after heading
export const subtitleReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
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
  hidden: { opacity: 0, y: 60, scale: 0.94, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...SPRING },
  },
};

export const viewportOnce = { once: true, amount: 0.12 };