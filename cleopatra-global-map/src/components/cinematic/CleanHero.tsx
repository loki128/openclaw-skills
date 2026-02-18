'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function CleanHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32"
    >
      {/* Minimal background */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-charcoal/20 to-void" />
      
      {/* Single subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold-400/5 rounded-full blur-[120px]" />

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        style={{ opacity }}
      >
        {/* Clean eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold-400 text-xs uppercase tracking-[0.4em] mb-8"
        >
          From the Pyramids to the World
        </motion.p>

        {/* Main headline - cleaner */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-6 tracking-tight"
        >
          Cleopatra
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gold-400 text-2xl md:text-3xl font-light tracking-wide mb-12"
        >
          Delights
        </motion.p>

        {/* Simple tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-16 leading-relaxed"
        >
          We mastered sweets across eight culinary kingdoms.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="#journey">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-gold-400 text-void font-medium uppercase tracking-wider text-sm hover:bg-gold-500 transition-colors"
            >
              Explore the Journey
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Minimal scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-gold-400/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
