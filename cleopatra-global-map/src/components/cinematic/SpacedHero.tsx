'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function SpacedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-void" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold-400/5 rounded-full blur-[100px]" />

      {/* Content - Container 1200px */}
      <motion.div 
        className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12"
        style={{ opacity }}
      >
        <div className="max-w-[68ch] mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-8"
            style={{ lineHeight: '1.6' }}
          >
            From the Pyramids to the World
          </motion.p>

          {/* Headline - generous margin */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-white mb-6"
            style={{ 
              fontSize: 'clamp(40px, 5vw, 84px)',
              lineHeight: '1.05',
              letterSpacing: '-0.02em'
            }}
          >
            Cleopatra Delights
          </motion.h1>
          
          {/* Tagline - reading width, proper line-height */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-text-secondary mb-16 mx-auto"
            style={{ 
              fontSize: '17px',
              lineHeight: '1.7',
              maxWidth: '52ch'
            }}
          >
            We mastered sweets across eight culinary kingdoms. 
            From ancient Egypt through the Silk Road to the New World.
          </motion.p>

          {/* Single CTA - proper tap target */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="#journey">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gold-400 text-void font-medium uppercase tracking-wider text-sm hover:bg-gold-500 transition-colors"
                style={{ minHeight: '44px' }}
              >
                Explore the Journey
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
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
