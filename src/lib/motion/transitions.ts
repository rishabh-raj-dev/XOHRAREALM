import { Transition } from 'framer-motion';

export const smoothSpring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const cinematic: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

export const snappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

export const gentle: Transition = {
  duration: 1.2,
  ease: 'easeInOut',
};

export const bounce: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 10,
};

export const slow: Transition = {
  duration: 1.5,
  ease: [0.22, 1, 0.36, 1],
};
