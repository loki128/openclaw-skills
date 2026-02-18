'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animated molecule component
function MoleculeAtom({ delay, x, y, color }: { delay: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute w-4 h-4 rounded-full"
      style={{ 
        backgroundColor: color,
        left: x,
        top: y,
        boxShadow: `0 0 20px ${color}`
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function MoleculeBond({ delay, x1, y1, x2, y2 }: { delay: number; x1: string; y1: string; x2: string; y2: string }) {
  return (
    <motion.div
      className="absolute h-0.5 bg-[#444] origin-left"
      style={{ left: x1, top: y1 }}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100px", opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    />
  );
}

export default function DoctorLab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const moleculeRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const moleculeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 1]);

  const credentials = [
    { label: "PhD", value: "Biochemistry", color: "#00ff88" },
    { label: "CSCS", value: "Certified", color: "#4488ff" },
    { label: "Cancer", value: "Survivor", color: "#ff4444" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#666] text-xs uppercase tracking-[0.4em] mb-4 font-mono"
          >
            The Laboratory
          </motion.p>          
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white"
            style={{
              fontFamily: "'Tungsten', 'Impact', sans-serif",
              fontSize: 'clamp(40px, 8vw, 100px)',
              fontWeight: 700,
              letterSpacing: '0.02em'
            }}
          >
            PHD + IRON
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Credentials */}
          <div className="space-y-8">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15 }}
                className="border-l-4 pl-6"
                style={{ borderColor: cred.color }}
              >
                <span 
                  className="block text-4xl font-bold mb-1"
                  style={{ 
                    fontFamily: "'Tungsten', sans-serif",
                    color: cred.color
                  }}
                >
                  {cred.label}
                </span>                
                <span 
                  className="text-[#888] text-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {cred.value}
                </span>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="text-[#666] mt-12 max-w-md"
              style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.8' }}
            >
              When the lab coat meets the lifting belt. 
              When peer-reviewed research meets blood, sweat, and iron. 
              That's where the impossible becomes routine.
            </motion.p>
          </div>

          {/* Right: Animated Molecule */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            style={{ rotate: moleculeRotation, scale: moleculeScale }}
          >
            {/* Central atom */}
            <motion.div
              className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#4488ff] to-[#00ff88]"
              style={{ boxShadow: '0 0 60px rgba(68,136,255,0.5)' }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            />

            {/* Orbiting atoms */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-8 h-8 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? "#ff4444" : "#ffffff",
                  boxShadow: `0 0 30px ${i % 2 === 0 ? "#ff4444" : "#ffffff"}`
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={isInView ? { 
                  scale: 1,
                  x: Math.cos(angle * Math.PI / 180) * 150,
                  y: Math.sin(angle * Math.PI / 180) * 150
                } : {}}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              />
            ))}

            {/* Connection lines */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={`line-${angle}`}
                className="absolute h-0.5 bg-[#333] origin-left"
                style={{ width: 150, left: '50%', top: '50%' }}
                initial={{ scaleX: 0, rotate: angle }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 1.2 + i * 0.05 }}
              />
            ))}

            {/* Electron rings */}
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border border-[#333]"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.3 } : {}}
              transition={{ delay: 1.5 }}
            />            
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border border-[#222]"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.2 } : {}}
              transition={{ delay: 1.7 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
