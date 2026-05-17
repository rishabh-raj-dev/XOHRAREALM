import { Variants } from 'framer-motion';

// ─── Entrance Animations ───
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

// ─── Slide Animations ───
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ─── Stagger Container ───
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ─── Analog / Grunge Animations ───
export const vhsFlicker: Variants = {
  animate: {
    opacity: [1, 0.8, 1, 0.6, 1, 0.9, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      times: [0, 0.92, 0.94, 0.96, 0.97, 0.99, 1],
    },
  },
};

export const analogDrift: Variants = {
  animate: {
    x: [0, 3, -2, 2, 0],
    y: [0, -2, 3, -1, 0],
    rotate: [0, 0.5, -0.3, 0.2, 0],
    transition: {
      duration: 12,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const glitchShake: Variants = {
  animate: {
    x: [0, -2, 3, -1, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatDelay: 4,
    },
  },
};

export const floatY: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// ─── Page Transitions ───
export const pageEnter: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.25 },
  },
};

// ─── Hover Animations ───
export const magneticHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { type: 'tween', duration: 0.2 },
  },
  tap: { scale: 0.97 },
};

export const cardHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.01,
    rotate: 0.3,
    transition: { duration: 0.3 },
  },
};

// ─── Reveal on Scroll ───
export const revealOnScroll: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};
