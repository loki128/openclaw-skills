'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function DoctorMolecule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Molecule assembly animation
  const assemblyProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Amino acid positions that assemble as you scroll
  const aminoAcids = [
    { id: 'leu', name: 'LEUCINE', color: '#00ff88', x: -200, y: -150, finalX: 0, finalY: 0 },
    { id: 'iso', name: 'ISOLEUCINE', color: '#4488ff', x: 200, y: -150, finalX: 100, finalY: 0 },
    { id: 'val', name: 'VALINE', color: '#ff4444', x: -200, y: 150, finalX: -100, finalY: 100 },
    { id: 'glu', name: 'GLUTAMINE', color: '#ffffff', x: 200, y: 150, finalX: 100, finalY: 100 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#0a0a0a] overflow-hidden"
    >
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-[1400px] mx-auto px-8 w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-[#666] text-xs uppercase tracking-[0.4em] mb-4 font-mono"
            >
              The Formula
            </motion.p>            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-white mb-4"
              style={{
                fontFamily: "'Tungsten', 'Impact', sans-serif",
                fontSize: 'clamp(40px, 8vw, 80px)',
                fontWeight: 700
              }}
            >
              ASSEMBLE THE WHEY
            </motion.h2>            
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-[#888]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Scroll to build the molecule
            </motion.p>
          </div>

          {/* Molecule visualization */}
          <div className="relative h-[500px] flex items-center justify-center"
          >
            {/* Central protein core */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#4488ff] to-[#00ff88] z-10"
              style={{
                boxShadow: '0 0 80px rgba(68,136,255,0.6)',
              }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <span 
                className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                25G
              </span>
            </motion.div>

            {/* Amino acids that fly in */}
            {aminoAcids.map((aa, index) => (
              <motion.div
                key={aa.id}
                className="absolute"
                initial={{ 
                  x: aa.x, 
                  y: aa.y, 
                  opacity: 0,
                  scale: 0.5
                }}
                animate={isInView ? { 
                  x: aa.finalX, 
                  y: aa.finalY, 
                  opacity: 1,
                  scale: 1
                } : {}}
                transition={{ 
                  delay: 0.8 + index * 0.15,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                {/* Atom */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: aa.color,
                    boxShadow: `0 0 30px ${aa.color}`
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <span className="text-black text-xs font-bold">{aa.id.toUpperCase()}</span>
                </motion.div>
                
                {/* Label */}
                <motion.p
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#666] text-xs whitespace-nowrap"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {aa.name}
                </motion.p>

                {/* Connection line to center */}
                <motion.div
                  className="absolute top-8 left-8 h-0.5 bg-[#333] origin-left"
                  style={{
                    width: Math.sqrt(aa.finalX * aa.finalX + aa.finalY * aa.finalY),
                    rotate: Math.atan2(aa.finalY, aa.finalX) * 180 / Math.PI
                  }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                />
              </motion.div>
            ))}

            {/* Orbital rings */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border border-[#333]"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.2 } : {}}
              transition={{ delay: 2 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border border-[#444]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(0,255,136,0.1), transparent)'
                }}
              />
            </motion.div>
          </div>

          {/* Formula breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.5 }}
            className="mt-12 grid grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { value: '2.8g', label: 'Leucine', color: '#00ff88' },
              { value: '5.5g', label: 'BCAAs', color: '#4488ff' },
              { value: '92%', label: 'Purity', color: '#ff4444' },
              { value: '0g', label: 'Fillers', color: '#ffffff' },
            ].map((item) => (
              <div key={item.label} className="text-center"
              >
                <p 
                  className="text-2xl font-bold mb-1"
                  style={{ 
                    fontFamily: "'Tungsten', sans-serif",
                    color: item.color
                  }}
                >
                  {item.value}
                </p>                
                <p className="text-[#666] text-xs uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
