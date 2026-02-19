'use client';

import { motion } from 'framer-motion';

export default function ExperienceOpening() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-[#050505] px-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[#333] text-xs uppercase tracking-[0.5em] mb-8"
      >
        Performance Lab
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-white text-center"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(64px, 12vw, 160px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 0.95
        }}
      >
        NO BS WHEY
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-[#444] text-lg mt-12 max-w-[50ch] text-center"
      >
        PhD formulated. Third-party tested. Zero compromises.
      </motion.p>
    </section>
  );
}
