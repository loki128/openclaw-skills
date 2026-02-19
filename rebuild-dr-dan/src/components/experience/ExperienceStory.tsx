'use client';

import { motion } from 'framer-motion';

export default function ExperienceStory() {
  return (
    <section className="h-screen bg-[#050505] flex items-center justify-center px-8">
      <div className="text-center max-w-[900px]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#ff3333] text-xs uppercase tracking-[0.5em] mb-12"
        >
          The Story
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white mb-8"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}
        >
          Beat cancer.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#333] mb-16"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}
        >
          Rebuilt stronger.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-[#555] text-xl max-w-[60ch] mx-auto leading-relaxed"
        >
          A PhD biochemist faced mortality. Applied laboratory precision 
          to recovery. Emerged with a formula that doesn't compromise.
        </motion.p>
      </div>
    </section>
  );
}
