'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function MidnightHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Deep midnight background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.08) 0%, transparent 50%)'
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12"
        style={{ opacity, y }}
      >
        <div className="max-w-[68ch]"
        >
          {/* Small label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[#8b7355] text-xs uppercase tracking-[0.4em] mb-8"
            style={{ lineHeight: '1.6' }}
          >
            Est. 2018
          </motion.p>

          {/* Dominant statement */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white mb-10"
            style={{ 
              fontSize: 'clamp(48px, 6vw, 90px)',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400
            }}
          >
            We mastered the world's finest sweets.
          </motion.h1>

          {/* Subtle descriptor */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#a3a3a3] mb-16"
            style={{ 
              fontSize: '18px',
              lineHeight: '1.75',
              maxWidth: '42ch',
              letterSpacing: '0.01em'
            }}
          >
            From ancient Egypt through the Silk Road to the New World. 
            Eight kingdoms. One pursuit of perfection.
          </motion.p>

          {/* Single CTA with refined hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link href="#regions">
              <motion.span
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-4 text-[#d4af37] text-sm uppercase tracking-[0.2em] cursor-pointer group"
                style={{ lineHeight: '1.6', padding: '12px 0' }}
              >
                <span>Enter the Atelier</span>
                <motion.span 
                  className="h-px bg-[#d4af37] origin-left"
                  initial={{ width: 48 }}
                  whileHover={{ width: 80 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-[#d4af37]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
