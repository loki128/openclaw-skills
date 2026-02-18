'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function DoctorTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const barFill1 = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const barFill2 = useTransform(scrollYProgress, [0.1, 0.6], [0, 100]);
  const barFill3 = useTransform(scrollYProgress, [0.2, 0.7], [0, 100]);

  const stats = [
    { label: "CANCER CELLS", before: "MILLIONS", after: "ZERO", fill: barFill1, color: "#ff4444" },
    { label: "LEAN MASS", before: "165 LBS", after: "215 LBS", fill: barFill2, color: "#00ff88" },
    { label: "STRENGTH", before: "BROKEN", after: "ELITE", fill: barFill3, color: "#4488ff" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 bg-[#0a0a0a]"
    >
      {/* Background pulse */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ 
          background: [
            "radial-gradient(circle at 50% 50%, #ff4444 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #00ff88 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #ff4444 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#666] text-xs uppercase tracking-[0.4em] mb-4 font-mono"
          >
            The Transformation
          </motion.p>          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white mb-4"
            style={{
              fontFamily: "'Tungsten', 'Impact', sans-serif",
              fontSize: 'clamp(48px, 10vw, 120px)',
              fontWeight: 700,
              letterSpacing: '0.02em'
            }}
          >
            BEFORE / AFTER
          </motion.h2>          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-[#888] text-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Not photos. Data.
          </motion.p>
        </div>

        {/* Stats bars */}
        <div className="space-y-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="relative"
            >
              <div className="flex justify-between items-end mb-4"
              >
                <span 
                  className="text-[#666] text-sm uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </span>                
                <div className="flex gap-8"
                >
                  <span 
                    className="text-[#444] text-2xl"
                    style={{ fontFamily: "'Tungsten', sans-serif" }}
                  >
                    {stat.before}
                  </span>                  <span className="text-[#333]">→</span>                  <span 
                    className="text-2xl"
                    style={{ 
                      fontFamily: "'Tungsten', sans-serif",
                      color: stat.color
                    }}
                  >
                    {stat.after}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-4 bg-[#1a1a1a] overflow-hidden relative"
              >
                <motion.div
                  className="h-full absolute left-0 top-0"
                  style={{ 
                    backgroundColor: stat.color,
                    width: stat.fill.get()
                  }}
                />                
                <motion.div
                  className="h-full"
                  style={{ 
                    backgroundColor: stat.color,
                    width: useTransform(stat.fill, v => `${v}%`)
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <p 
            className="text-white text-2xl md:text-3xl mb-4"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'italic',
              lineHeight: '1.4'
            }}
          >
            "They said I might not make it.
            <br />
            I said watch me deadlift 500."
          </p>          
          <cite 
            className="text-[#666] text-sm uppercase tracking-[0.3em] not-italic"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            — Dr. Dan
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
}
