// ─── SupplyLens v2.0 — Framer Motion Variants ───

export const fadeUp = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export const fadeUpStagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const fadeUpChild = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
};

export const scaleIn = {
  initial:  { opacity: 0, scale: 0.9 },
  animate:  { opacity: 1, scale: 1 },
  transition: { type: 'spring', stiffness: 200, damping: 20 },
};

export const streamIn = {
  initial:  { opacity: 0, x: -16 },
  animate:  { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const errorShake = {
  animate: { x: [0, -10, 10, -8, 8, -4, 4, 0] },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

export const dismissCollapse = {
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
  },
};

export const slideInRight = {
  initial:  { x: '100%', opacity: 0 },
  animate:  { x: 0, opacity: 1 },
  exit:     { x: '100%', opacity: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export const pageTransition = {
  initial:  { opacity: 0, x: 8 },
  animate:  { opacity: 1, x: 0 },
  exit:     { opacity: 0, x: -8 },
  transition: { duration: 0.25, ease: 'easeOut' },
};

export const staggerContainer = (staggerDelay = 0.08) => ({
  animate: {
    transition: { staggerChildren: staggerDelay },
  },
});

export const cardHover = {
  whileHover: {
    y: -3,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};
