'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceIron() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Silhouette animation based on scroll
  const liftProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const barY = useTransform(liftProgress, [0, 1], [100, -80]);
  const silhouetteScale = useTransform(liftProgress, [0, 1], [0.9, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#050505]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid - subtle */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#333] text-xs uppercase tracking-[0.4em] mb-16"
          >
            The Iron
          </motion.p>

          {/* Lifting silhouette */}
          <motion.div
            className="relative w-64 h-80 mx-auto"
            style={{ scale: silhouetteScale }}
          >
            {/* Barbell */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-80 h-2 bg-[#222]"
              style={{ y: barY }}
            >
              {/* Weight plates left */}
              <motion.div className="absolute left-4 -top-8 w-4 h-20 bg-[#1a1a1a] border border-[#2a2a2a]" />
              <motion.div className="absolute left-10 -top-6 w-3 h-16 bg-[#1a1a1a] border border-[#2a2a2a]" />              
              <motion.div className="absolute left-16 -top-4 w-2 h-12 bg-[#1a1a1a] border border-[#2a2a2a]" />
              
              {/* Weight plates right */}
              <motion.div className="absolute right-4 -top-8 w-4 h-20 bg-[#1a1a1a] border border-[#2a2a2a]" />
              <motion.div className="absolute right-10 -top-6 w-3 h-16 bg-[#1a1a1a] border border-[#2a2a2a]" />              
              <motion.div className="absolute right-16 -top-4 w-2 h-12 bg-[#1a1a1a] border border-[#2a2a2a]" />
            </motion.div>

            {/* Body silhouette - minimal */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.3 } : {}}
              transition={{ delay: 0.5 }}
            >
              {/* Head */}
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] mx-auto mb-2" />              
              {/* Torso */}
              <div className="w-20 h-32 bg-[#1a1a1a] mx-auto" />              
              {/* Legs */}
              <div className="flex justify-center gap-4">
                <div className="w-6 h-24 bg-[#1a1a1a]" />                <div className="w-6 h-24 bg-[#1a1a1a]" />
              </div>
            </motion.div>

            {/* Arms reaching up */}
            <motion.div
              className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-20"
              style={{ y: useTransform(liftProgress, [0, 1], [0, -60]) }}
            >
              <div className="w-4 h-24 bg-[#1a1a1a] origin-bottom rotate-12" />              <div className="w-4 h-24 bg-[#1a1a1a] origin-bottom -rotate-12" />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <p 
              className="text-white text-2xl md:text-3xl mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500
              }}
            >
              Old school. No compromise.
            </p>            
            <p className="text-[#444] text-sm">
              The bar doesn't care about your excuses.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
