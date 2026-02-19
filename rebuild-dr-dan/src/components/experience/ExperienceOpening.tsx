'use client';

import { motion } from 'framer-motion';

export default function ExperienceOpening() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-[#050505] px-8 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[#333] text-xs uppercase tracking-[0.5em] mb-8 z-10"
      >
        Performance Lab
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-white text-center z-10"
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
        className="text-[#444] text-lg mt-12 max-w-[50ch] text-center z-10"
      >
        PhD formulated. Third-party tested. Zero compromises.
      </motion.p>

      {/* Product silhouette */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <div className="w-48 h-64 relative"
          style={{
            background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 10%, 100% 90%, 80% 100%, 20% 100%, 0% 90%, 0% 10%)',
            border: '1px solid #1a1a1a'
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <span className="text-[#00ff88] text-xs uppercase tracking-[0.3em] mb-2"
            >NO BS</span>
            
            <span className="text-white text-2xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              WHEY
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
