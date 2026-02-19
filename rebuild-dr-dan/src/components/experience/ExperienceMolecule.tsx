'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

// Holographic text effect
function HolographicText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        background: 'linear-gradient(90deg, #00ff88, #4488ff, #00ff88)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
      animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
}

// Data card with neon border
function DataCard({ 
  label, 
  value, 
  color, 
  index 
}: { 
  label: string; 
  value: string; 
  color: string; 
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
      className="relative p-6"
      style={{
        border: `1px solid ${color}40`,
        background: `linear-gradient(135deg, ${color}08 0%, transparent 60%)`,
        boxShadow: `0 0 20px ${color}15`
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background: `linear-gradient(135deg, ${color}15 0%, transparent 80%)`
        }}
      />
      
      <div className="relative z-10 text-center">
        <motion.p
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            color,
            textShadow: `0 0 20px ${color}50`
          }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {value}
        </motion.p>
        
        <p className="text-[#444] text-xs uppercase tracking-[0.3em]">
          {label.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 + i * 0.02 }}
            >
              {char}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Animated corner */}
      <motion.div
        className="absolute top-0 right-0 w-3 h-3"
        style={{ borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Floating atom with label
function FloatingAtom({ 
  label, 
  color, 
  angle, 
  distance, 
  index 
}: { 
  label: string; 
  color: string; 
  angle: number; 
  distance: number;
  index: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance;

  return (
    <motion.div
      className="absolute"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
      style={{ x, y }}
    >
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center relative"
        style={{
          background: `radial-gradient(circle, ${color} 0%, ${color}80 100%)`,
          boxShadow: `0 0 30px ${color}60, inset 0 0 20px rgba(255,255,255,0.3)`
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          boxShadow: [
            `0 0 30px ${color}60`,
            `0 0 50px ${color}80`,
            `0 0 30px ${color}60`
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      >
        <span className="text-black text-sm font-bold">{label[0]}</span>
      </motion.div>

      {/* Label orbiting */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 + index * 0.1 }}
      >
        <span className="text-[10px] uppercase tracking-wider px-2 py-1 border border-[#333] bg-[#0a0a0a]">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceMolecule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const dataPoints = [
    { label: 'Protein', value: '92%', color: '#00ff88', angle: 0, distance: 180 },
    { label: 'Leucine', value: '2.8g', color: '#4488ff', angle: 90, distance: 200 },
    { label: 'Digestibility', value: '98%', color: '#ff3333', angle: 180, distance: 180 },
    { label: 'BCAAs', value: '5.5g', color: '#ffffff', angle: 270, distance: 200 },
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 60%)'
            }}
          />
        </motion.div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-8">
          {/* Header with holographic text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block px-6 py-2 mb-6"
              style={{
                border: '1px solid #333',
                background: 'linear-gradient(90deg, rgba(0,255,136,0.1), rgba(68,136,255,0.1))'
              }}
              initial={{ y: -20 }}
              whileInView={{ y: 0 }}
            >
              <p className="text-[#555] text-xs uppercase tracking-[0.5em]">
                {'The Molecule'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </motion.div>
            
            <h2 
              className="text-4xl md:text-6xl font-bold"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <HolographicText text="Holographic Structure" />
            </h2>
          </motion.div>

          {/* Molecule visualization */}
          <motion.div
            className="relative h-[500px] flex items-center justify-center"
            style={{ rotate: rotation, scale, opacity }}
          >
            {/* Central core */}
            <motion.div
              className="absolute w-28 h-28 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00ff88 0%, #4488ff 50%, #00ff88 100%)',
                backgroundSize: '200% 200%',
                boxShadow: '0 0 60px rgba(0,255,136,0.5), inset 0 0 30px rgba(255,255,255,0.3)'
              }}
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                boxShadow: [
                  '0 0 60px rgba(0,255,136,0.5)',
                  '0 0 80px rgba(68,136,255,0.6)',
                  '0 0 60px rgba(0,255,136,0.5)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-black text-sm font-bold tracking-wider">WHEY</span>
            </motion.div>

            {/* Orbiting atoms */}
            {dataPoints.map((point, index) => (
              <FloatingAtom
                key={point.label}
                label={point.label}
                color={point.color}
                angle={point.angle}
                distance={point.distance}
                index={index}
              />
            ))}

            {/* Connection lines */}
            {dataPoints.map((point, index) => {
              const rad = (point.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 140;
              const y = Math.sin(rad) * 140;
              
              return (
                <motion.div
                  key={`line-${point.label}`}
                  className="absolute top-1/2 left-1/2 h-px origin-left"
                  style={{
                    width: 140,
                    background: `linear-gradient(90deg, ${point.color}60, transparent)`,
                    rotate: point.angle + 180,
                    translateX: x / 2,
                    translateY: y / 2
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 0.6 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                />
              );
            })}

            {/* Outer rings */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border border-[#222]"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.5 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border border-[#00ff88] opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(0,255,136,0.1), transparent)'
                }}
              />
            </motion.div>

            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-[#333]"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Data cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12"
          >
            {dataPoints.map((point, index) => (
              <DataCard
                key={point.label}
                label={point.label}
                value={point.value}
                color={point.color}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
