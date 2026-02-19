'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceMolecule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const dataPoints = [
    { label: 'Protein', value: '92%', color: '#00ff88' },
    { label: 'Leucine', value: '2.8g', color: '#4488ff' },
    { label: 'Digestibility', value: '98%', color: '#ff3333' },
    { label: 'BCAAs', value: '5.5g', color: '#ffffff' },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-[#050505]"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#00ff88] text-sm uppercase tracking-[0.5em] mb-6"
            >
              Science of the Molecule
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-4xl md:text-5xl font-bold mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Molecular Precision
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#888] text-lg leading-relaxed mb-6"
            >
              Every scoop delivers 25g of pure whey protein isolate, 
              carefully filtered to remove lactose, fat, and carbohydrates. 
              The result is a molecular structure your body can absorb 
              rapidly and completely.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#888] text-lg leading-relaxed mb-8"
            >
              Our cold-processed microfiltration preserves the delicate 
              protein fractions that trigger muscle protein synthesis. 
              This isn't just protein—it's a precision tool for recovery.
            </motion.p>

            <div className="grid grid-cols-2 gap-6">
              {dataPoints.map((point, index) => (
                <motion.div
                  key={point.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 border border-[#1a1a1a]"
                >
                  <p className="text-2xl font-bold mb-1"
                    style={{ color: point.color, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {point.value}
                  </p>
                  <p className="text-[#444] text-xs uppercase tracking-wider">
                    {point.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="aspect-square flex items-center justify-center"
              style={{ rotate: rotation }}
            >
              <motion.div
                className="absolute w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00ff88, #4488ff)',
                  boxShadow: '0 0 40px rgba(0,255,136,0.3)'
                }}
              >
                <span className="text-black text-sm font-bold">WHEY</span>
              </motion.div>

              {dataPoints.map((point, index) => {
                const angle = index * 90;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * 120;
                const y = Math.sin(rad) * 120;
                
                return (
                  <motion.div
                    key={point.label}
                    className="absolute w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: point.color,
                      boxShadow: `0 0 20px ${point.color}60`,
                      x, y
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    <span className="text-black text-xs font-bold">{point.label[0]}</span>
                  </motion.div>
                );
              })}

              <div className="absolute w-[300px] h-[300px] rounded-full border border-[#222]" />
              <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-[#1a1a1a]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
