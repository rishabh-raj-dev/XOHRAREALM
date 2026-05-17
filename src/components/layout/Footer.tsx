'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NeonDivider from '@/components/ui/NeonDivider';

export default function Footer() {
  return (
    <footer className="relative pb-28 md:pb-24">
      <NeonDivider className="mb-12" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-body text-sm tracking-[0.15em] mb-4">
              {'[ '}
              <span className="text-text-primary">xohra</span>
              {' '}
              <span className="text-accent-amber">realm</span>
              {' ]'}
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed font-body">
              raw sound. analog soul.<br />
              built in the underground.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-text-muted mb-4">
              navigate
            </h4>
            <div className="flex flex-col gap-3">
              {['artists', 'releases', 'about'].map((link) => (
                <Link
                  key={link}
                  href={`/${link}`}
                  className="text-text-secondary text-xs hover:text-accent-amber transition-colors font-body"
                >
                  {'> '}{link}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-text-muted mb-4">
              connect
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { name: 'instagram', url: '#' },
                { name: 'twitter / x', url: '#' },
                { name: 'youtube', url: '#' },
                { name: 'soundcloud', url: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary text-xs hover:text-accent-rust transition-colors font-body"
                >
                  {'> '}{social.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-dashed border-border-rough flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[10px] tracking-[0.15em] font-body">
            © {new Date().getFullYear()} xohra realm. all rights reserved.
          </p>
          <p className="text-text-muted text-[10px] tracking-[0.15em] font-body animate-vhs-flicker">
            built in the underground ▮
          </p>
        </div>
      </div>
    </footer>
  );
}
