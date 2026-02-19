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
  
  const liftProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const barY = useTransform(liftProgress, [0, 1], [100, -80]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#050505]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#ff3333] text-sm uppercase tracking-[0.5em] mb-12"
          >
            The Iron
          </motion.p>

          {/* Lifting silhouette */}
          <motion.div
            className="relative w-64 h-80 mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
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

            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.3 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#222] mx-auto mb-2" />
              <div className="w-20 h-32 bg-[#222] mx-auto" />
              <div className="flex justify-center gap-4">
                <div className="w-6 h-24 bg-[#222]" />
                <div className="w-6 h-24 bg-[#222]" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Old school. No compromise.
            </h2>
            
            <p className="text-[#555] text-lg max-w-xl mx-auto">
              The bar doesn't care about your excuses. Neither do we. 
              Every batch is tested. Every ingredient is verified. 
              No fillers. No marketing fluff. Just results.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
