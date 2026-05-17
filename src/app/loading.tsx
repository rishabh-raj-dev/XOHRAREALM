'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9990] bg-bg-primary flex items-center justify-center vhs-scanlines">
      <div className="text-center">
        {/* VHS loading text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="font-body text-xs tracking-[0.3em] text-text-muted">
            loading...
          </p>
        </motion.div>

        <motion.div
          className="mt-4 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-accent-amber"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        <motion.p
          className="mt-6 font-body text-[9px] tracking-[0.2em] text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
        >
          [ xohra realm ]
        </motion.p>
      </div>
    </div>
  );
}
