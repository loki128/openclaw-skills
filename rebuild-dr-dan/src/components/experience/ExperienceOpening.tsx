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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-[#050505]"
    >
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      <motion.div 
        className="text-center z-10 px-8"
        style={{ opacity, scale, y }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[#333] text-xs uppercase tracking-[0.5em] mb-8 font-medium"
        >
          Performance Lab
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 8vw, 120px)',
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: '-0.03em'
          }}
        >
          DR DAN'S
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-white mb-8"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 8vw, 120px)',
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: '-0.03em'
          }}
        >
          NO BS WHEY
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-[#444] text-sm uppercase tracking-[0.3em]"
        >
          Scroll to enter
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[#333] to-transparent mx-auto"
          />
        </motion.div>
      </motion.div>

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-12 h-px bg-[#1a1a1a]" />
      <div className="absolute top-8 left-8 w-px h-12 bg-[#1a1a1a]" />
      <div className="absolute top-8 right-8 w-12 h-px bg-[#1a1a1a]" />
      <div className="absolute top-8 right-8 w-px h-12 bg-[#1a1a1a]" />
      <div className="absolute bottom-8 left-8 w-12 h-px bg-[#1a1a1a]" />
      <div className="absolute bottom-8 left-8 w-px h-12 bg-[#1a1a1a]" />
      <div className="absolute bottom-8 right-8 w-12 h-px bg-[#1a1a1a]" />
      <div className="absolute bottom-8 right-8 w-px h-12 bg-[#1a1a1a]" />
    </section>
  );
}
