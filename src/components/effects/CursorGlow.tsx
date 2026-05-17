'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const cursorX = useSpring(0, { stiffness: 200, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    setVisible(true);

    const handler = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9998] mix-blend-screen"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <div className="w-48 h-48 rounded-full bg-accent-amber/[0.04] blur-3xl" />
      <div className="absolute inset-1/4 w-24 h-24 rounded-full bg-accent-rust/[0.06] blur-2xl" />
    </motion.div>
  );
}
