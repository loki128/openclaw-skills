'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceOpening() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-[#050505]"
    >
      <motion.div 
        className="text-center z-10 px-8"
        style={{ opacity, y }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#333] text-sm uppercase tracking-[0.5em] mb-8"
        >
          Performance Lab
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-white text-6xl md:text-8xl font-bold mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          DR DAN'S
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white text-6xl md:text-8xl font-bold mb-12"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          NO BS WHEY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-[#444] text-sm uppercase tracking-[0.3em]"
        >
          Scroll to enter
        </motion.p>
      </motion.div>
    </section>
  );
}
