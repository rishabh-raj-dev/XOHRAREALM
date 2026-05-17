'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUIStore } from '@/stores/uiStore';

const navLinks = [
  { href: '/', label: 'home', num: '01' },
  { href: '/artists', label: 'artists', num: '02' },
  { href: '/releases', label: 'releases', num: '03' },
  { href: '/about', label: 'about', num: '04' },
];

/* ── Framer Motion Variants ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ease = (arr: number[]) => arr as any;

const navEnter = {
  hidden: { y: -64, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: ease([0.22, 1, 0.36, 1]), delay: 0.2 },
  },
};

const linkStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.6 },
  },
};

const linkItem = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const logoBox = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: ease([0.22, 1, 0.36, 1]), delay: 0.4 },
  },
};

const logoText = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.55 },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, closeMenu } = useUIStore();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [logoGlitch, setLogoGlitch] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60);
  });

  /* periodic logo glitch */
  useEffect(() => {
    const id = setInterval(() => {
      setLogoGlitch(true);
      setTimeout(() => setLogoGlitch(false), 300);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  if (pathname?.startsWith('/artist/')) return null;

  return (
    <>
      {/* ════════════════════════════════
          DESKTOP NAVBAR
          ════════════════════════════════ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        variants={navEnter}
        initial="hidden"
        animate="visible"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: scrolled ? 'rgba(15,13,11,0.96)' : 'rgba(15,13,11,0)',
            borderBottomColor: scrolled
              ? 'rgba(220,200,170,0.10)'
              : 'rgba(220,200,170,0)',
          }}
          transition={{ duration: 0.4 }}
          style={{ borderBottomWidth: 1, borderBottomStyle: 'dashed' }}
        />

        <div className="relative w-full px-6 md:px-12">
          <div className="flex items-center justify-between h-[68px] md:h-[76px]">

            {/* ── Logo ── */}
            <Link href="/" onClick={closeMenu} className="flex items-center gap-4 group">
              {/* XR sticker box */}
              <motion.div
                variants={logoBox}
                className="relative w-10 h-10 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
              >
                {/* Outer dashed border — animates on hover */}
                <motion.div
                  className="absolute inset-0 border border-dashed border-accent-amber/30"
                  whileHover={{ borderColor: 'rgba(196,146,42,0.7)' }}
                  transition={{ duration: 0.2 }}
                />
                {/* Animated corner scan line */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[1px] bg-accent-amber/50"
                  animate={{ y: [0, 38, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
                {/* XR text — glitches periodically */}
                <motion.span
                  className="absolute inset-0 flex items-center justify-center font-micro text-[8px] text-accent-amber"
                  animate={
                    logoGlitch
                      ? { x: [-2, 2, -1, 0], opacity: [1, 0.6, 1] }
                      : { x: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.25 }}
                >
                  XR
                </motion.span>
              </motion.div>

              {/* Logo wordmark */}
              <motion.div
                variants={logoText}
                className="flex flex-col justify-center gap-[3px] hidden sm:flex"
              >
                <motion.span
                  className="font-display text-[14px] md:text-[16px] font-bold tracking-[0.2em] text-text-secondary leading-none uppercase"
                  animate={logoGlitch ? { x: [0, -2, 2, 0], skewX: [0, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ color: '#C4922A' }}
                >
                  xohra realm
                </motion.span>
                <span className="font-body text-[8px] md:text-[9px] tracking-[0.3em] text-text-muted uppercase leading-none">
                  sound collective
                </span>
              </motion.div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <motion.div
              className="hidden md:flex items-center gap-8 ml-auto"
              variants={linkStagger}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={linkItem}>
                  <Link
                    href={link.href}
                    className="relative flex items-center px-4 py-2 group"
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {/* Link text */}
                    <motion.span
                      className="font-body text-[13px] md:text-[15px] tracking-[0.15em] lowercase leading-none"
                      animate={{
                        color:
                          hoveredLink === link.href
                            ? '#EDE4D4'
                            : '#A89880',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>

                    {/* Shared animated underline via layoutId */}
                    {hoveredLink === link.href && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-[2px]"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(196,146,42,0.7), transparent)',
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* ── Status indicator ── */}
              <motion.div
                className="flex items-center gap-2 ml-6 pl-6 border-l border-dashed border-border-rough"
                variants={linkItem}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-accent-amber"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="font-body text-[9px] tracking-[0.25em] text-text-muted uppercase">
                  live
                </span>
              </motion.div>
            </motion.div>

            {/* ── Mobile Hamburger ── */}
            <motion.button
              className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[6px] cursor-pointer border border-dashed border-border-rough"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.93 }}
              whileHover={{ borderColor: 'rgba(196,146,42,0.5)' }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-px bg-text-secondary origin-center"
                  style={{ width: i === 1 ? '14px' : '18px' }}
                  animate={
                    isMenuOpen
                      ? i === 0
                        ? { rotate: 45, y: 6, width: '18px' }
                        : i === 1
                          ? { opacity: 0, scaleX: 0 }
                          : { rotate: -45, y: -6, width: '18px' }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1, width: i === 1 ? '14px' : '18px' }
                  }
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ════════════════════════════════
          MOBILE MENU OVERLAY
          ════════════════════════════════ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-primary flex md:hidden flex-col justify-center"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,200,170,0.1) 2px, rgba(220,200,170,0.1) 4px)`,
              }}
            />

            {/* Corner brackets */}
            {[
              'top-5 left-5 border-t border-l',
              'top-5 right-5 border-t border-r',
              'bottom-5 left-5 border-b border-l',
              'bottom-5 right-5 border-b border-r',
            ].map((cls, i) => (
              <motion.div
                key={i}
                className={`absolute w-8 h-8 border-dashed border-border-rough ${cls}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
              />
            ))}

            {/* Links */}
            <div className="px-10 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1] as any,
                  }}
                  className="border-b border-dashed border-border-rough/20"
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-6 py-6 group"
                    onClick={closeMenu}
                  >
                    <span className="font-display text-[9px] text-accent-amber/30 group-hover:text-accent-amber/70 transition-colors w-6">
                      {link.num}
                    </span>
                    <motion.span
                      className="font-display text-xl tracking-[0.08em] text-text-secondary group-hover:text-text-primary lowercase"
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {link.label}
                    </motion.span>
                    <motion.span
                      className="ml-auto text-accent-amber text-xs opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom meta */}
            <motion.div
              className="absolute bottom-8 left-10 right-10 flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 0.55 }}
            >
              <span className="font-body text-[8px] tracking-[0.25em] text-text-muted uppercase">
                est. 2024
              </span>
              <motion.span
                className="font-body text-[8px] tracking-[0.2em] text-accent-amber uppercase"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ● now streaming
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
