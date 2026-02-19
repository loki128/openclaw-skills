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
  const barY = useTransform(scrollYProgress, [0.2, 0.6], [120, -80]);
  
  // Generate barbell plates
  const leftPlates = [
    { width: 24, height: 80, x: 32 },
    { width: 20, height: 64, x: 64 },
    { width: 16, height: 48, x: 92 },
    { width: 12, height: 32, x: 116 },
  ];
  
  const rightPlates = [
    { width: 24, height: 80, x: -32 },
    { width: 20, height: 64, x: -64 },
    { width: 16, height: 48, x: -92 },
    { width: 12, height: 32, x: -116 },
  ];

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

        <div className="relative w-80 h-96 mb-16"
        >
          {/* Barbell */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-96 h-3 bg-gradient-to-r from-[#1a1a1a] via-[#333] to-[#1a1a1a] rounded-full"
            style={{ y: barY }}
          >
            {/* Center knurling texture */}
            <div className="absolute left-1/2 -translate-x-1/2 w-32 h-full opacity-30"
              style={{
                background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 4px)'
              }}
            />
            
            {/* Left plates */}
            {leftPlates.map((plate, i) => (
              <motion.div
                key={`left-${i}`}
                className="absolute top-1/2 -translate-y-1/2 rounded-sm"
                style={{
                  left: plate.x,
                  width: plate.width,
                  height: plate.height,
                  background: 'linear-gradient(180deg, #222 0%, #111 50%, #222 100%)',
                  border: '1px solid #333',
                  boxShadow: '-2px 0 10px rgba(0,0,0,0.5)'
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            ))}
            
            {/* Right plates */}
            {rightPlates.map((plate, i) => (
              <motion.div
                key={`right-${i}`}
                className="absolute top-1/2 -translate-y-1/2 rounded-sm"
                style={{
                  right: plate.x,
                  width: plate.width,
                  height: plate.height,
                  background: 'linear-gradient(180deg, #222 0%, #111 50%, #222 100%)',
                  border: '1px solid #333',
                  boxShadow: '2px 0 10px rgba(0,0,0,0.5)'
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            ))}
            
            {/* Collars */}
            <div className="absolute left-28 top-1/2 -translate-y-1/2 w-4 h-12 bg-[#444] rounded-sm" />
            <div className="absolute right-28 top-1/2 -translate-y-1/2 w-4 h-12 bg-[#444] rounded-sm" />
          </motion.div>

          {/* Body silhouette */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ delay: 0.8 }}
          >
            {/* Head */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#222] to-[#111] mx-auto mb-3" />
            
            {/* Torso - V-taper */}
            <div 
              className="mx-auto mb-2"
              style={{
                width: 80,
                height: 100,
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
              }}
            />
            
            {/* Legs */}
            <div className="flex justify-center gap-6"
            >
              <div 
                className="w-10 h-32"
                style={{
                  background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)'
                }}
              />
              
              <div 
                className="w-10 h-32"
                style={{
                  background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)'
                }}
              />
            </div>
          </motion.div>

          {/* Arms reaching up */}
          <motion.div
            className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-32"
            style={{ y: useTransform(barY, (v) => v * 0.6) }}
          >
            <div 
              className="w-5 h-28 origin-bottom"
              style={{
                background: 'linear-gradient(180deg, #222 0%, #111 100%)',
                transform: 'rotate(-15deg)'
              }}
            />
            
            <div 
              className="w-5 h-28 origin-bottom"
              style={{
                background: 'linear-gradient(180deg, #222 0%, #111 100%)',
                transform: 'rotate(15deg)'
              }}
            />
          </motion.div>
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
