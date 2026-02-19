'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceIron() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const barY = useTransform(scrollYProgress, [0.2, 0.6], [100, -60]);

  return (
    <section 
      ref={containerRef}
      className="h-[200vh] bg-[#050505] relative"
    >
      <motion.div 
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-8"
        style={{ opacity, scale }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#ff3333] text-xs uppercase tracking-[0.5em] mb-16"
        >
          The Iron
        </motion.p>

        <div className="relative w-64 h-80 mb-16"
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-80 h-2 bg-[#333]"
            style={{ y: barY }}
          >
            <div className="absolute left-4 -top-8 w-4 h-20 bg-[#222] border border-[#333]" />
            <div className="absolute left-10 -top-6 w-3 h-16 bg-[#222] border border-[#333]" />
            <div className="absolute right-4 -top-8 w-4 h-20 bg-[#222] border border-[#333]" />
            <div className="absolute right-10 -top-6 w-3 h-16 bg-[#222] border border-[#333]" />
          </motion.div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30"
          >
            <div className="w-12 h-12 rounded-full bg-[#222] mx-auto mb-2" />
            <div className="w-20 h-32 bg-[#222] mx-auto" />
            <div className="flex justify-center gap-4">
              <div className="w-6 h-24 bg-[#222]" />
              <div className="w-6 h-24 bg-[#222]" />
            </div>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-center mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(48px, 8vw, 100px)',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}
        >
          Old school.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#444] text-xl max-w-[50ch] text-center"
        >
          No excuses. No compromises. Just results.
        </motion.p>
      </motion.div>
    </section>
  );
}
