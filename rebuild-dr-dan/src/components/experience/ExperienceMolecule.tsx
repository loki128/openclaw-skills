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
  
  // Molecule rotation and assembly
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Data points animation
  const dataReveal = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  const dataPoints = [
    { label: 'Protein', value: '92%', color: '#00ff88', angle: 0, distance: 200 },
    { label: 'Leucine', value: '2.8g', color: '#4488ff', angle: 90, distance: 220 },
    { label: 'Digestibility', value: '98%', color: '#ff3333', angle: 180, distance: 200 },
    { label: 'BCAAs', value: '5.5g', color: '#ffffff', angle: 270, distance: 220 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[200vh] bg-[#050505]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Holographic glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity }}
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 60%)'
            }}
          />
        </motion.div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center mb-12"
          >
            <p className="text-[#333] text-xs uppercase tracking-[0.4em] mb-4">The Molecule</p>            
            <h2 
              className="text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 600
              }}
            >
              Holographic Structure
            </h2>
          </motion.div>

          {/* Molecule visualization */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            style={{ rotate: rotation, scale, opacity }}
          >
            {/* Central core */}
            <motion.div
              className="absolute w-24 h-24 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #4488ff 100%)',
                boxShadow: '0 0 60px rgba(0,255,136,0.4)'
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-black text-xs font-bold">WHEY</span>
            </motion.div>

            {/* Orbiting atoms */}
            {dataPoints.map((point, index) => {
              const rad = (point.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 140;
              const y = Math.sin(rad) * 140;
              
              return (
                <motion.div
                  key={point.label}
                  className="absolute"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
                  style={{ x, y }}
                >
                  {/* Atom */}
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: point.color,
                      boxShadow: `0 0 20px ${point.color}`
                    }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <span className="text-black text-[10px] font-bold">{point.label[0]}</span>
                  </motion.div>

                  {/* Connection line */}
                  <motion.div
                    className="absolute top-6 left-6 h-px bg-[#333] origin-left"
                    style={{
                      width: 140,
                      rotate: point.angle + 180
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  />
                </motion.div>
              );
            })}

            {/* Outer ring */}
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full border border-[#222]"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.5 } : {}}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border border-[#00ff88] opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(0,255,136,0.1), transparent)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Data points */}
          <motion.div
            className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mt-8"
            style={{ opacity: dataReveal }}
          >
            {dataPoints.map((point) => (
              <motion.div
                key={point.label}
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
              >
                <p 
                  className="text-2xl font-bold mb-1"
                  style={{ 
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: point.color
                  }}
                >
                  {point.value}
                </p>                
                <p className="text-[#444] text-xs uppercase tracking-wider">{point.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
