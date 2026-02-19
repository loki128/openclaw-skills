'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceMolecule() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section 
      ref={containerRef}
      className="h-[200vh] bg-[#050505] relative"
    >
      <motion.div 
        className="sticky top-0 h-screen flex items-center px-16"
        style={{ opacity }}
      >
        <div className="w-1/3">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#00ff88] text-xs uppercase tracking-[0.5em] mb-8"
          >
            The Science
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(48px, 6vw, 80px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}
          >
            Molecular
            <br />
            Precision.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#555] text-lg max-w-[40ch] leading-relaxed"
          >
            Cold-processed microfiltration preserves delicate protein 
            fractions for rapid absorption.
          </motion.p>
        </div>

        <div className="absolute right-16 top-1/2 -translate-y-1/2"
        >
          <motion.div
            className="w-[400px] h-[400px] relative"
            style={{ rotate: rotation }}
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00ff88, #4488ff)',
                boxShadow: '0 0 40px rgba(0,255,136,0.3)'
              }}
            >
              <span className="text-black text-sm font-bold">WHEY</span>
            </div>

            {[
              { color: '#00ff88', angle: 0, label: '92%' },
              { color: '#4488ff', angle: 90, label: '2.8g' },
              { color: '#ff3333', angle: 180, label: '98%' },
              { color: '#ffffff', angle: 270, label: '5.5g' },
            ].map((item, index) => {
              const rad = (item.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 140;
              const y = Math.sin(rad) * 140;
              
              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 20px ${item.color}60`,
                    x, y
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  <span className="text-black text-xs font-bold">{item.label}</span>
                </motion.div>
              );
            })}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-[#222]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-[#1a1a1a]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
