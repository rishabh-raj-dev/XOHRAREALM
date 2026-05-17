'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { fadeInUp, fadeInScale, slideInLeft, slideInRight } from './variants';
import { cinematic } from './transitions';
import { forwardRef } from 'react';

// ─── Animated wrapper that fades in and slides up on mount ───
export const FadeInUp = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function FadeInUp({ children, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeInUp}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

// ─── Animated wrapper that fades in and scales ───
export const FadeInScale = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function FadeInScale({ children, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInScale}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

// ─── Slide from left ───
export const SlideInLeft = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function SlideInLeft({ children, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInLeft}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

// ─── Slide from right ───
export const SlideInRight = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  function SlideInRight({ children, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={slideInRight}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

// ─── Stagger wrapper for children ───
interface StaggerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
}

export const StaggerReveal = forwardRef<HTMLDivElement, StaggerProps>(
  function StaggerReveal({ children, staggerDelay = 0.1, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: 0.1,
            },
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

// ─── Animated text reveal ───
export const TextReveal = forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & { text: string }>(
  function TextReveal({ text, ...props }, ref) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        {...props}
      >
        {text.split(' ').map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { ...cinematic, delay: i * 0.05 },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }
);
