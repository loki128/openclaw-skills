'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Animated letter component
function AnimatedLetter({ letter, index }: { letter: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: 0.8 + index * 0.05, 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="inline-block"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
}

// Glitch text component
function GlitchText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-[#ff3333] opacity-0"
        animate={{ 
          opacity: [0, 0.8, 0, 0, 0.8, 0],
          x: [-2, 2, -1, 0, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-[#00ff88] opacity-0"
        animate={{ 
          opacity: [0, 0, 0.8, 0, 0, 0.8, 0],
          x: [0, -1, 2, -2, 0, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.1 }}
        aria-hidden
      >
        {text}
      </motion.span>
    </span>
  );
}

// Neon box text
function NeonBox({ children, color = '#00ff88', delay = 0 }: { children: React.ReactNode; color?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
      className="relative inline-block px-6 py-3"
      style={{
        border: `1px solid ${color}40`,
        boxShadow: `0 0 20px ${color}20, inset 0 0 20px ${color}10`,
        background: `linear-gradient(135deg, ${color}08 0%, transparent 50%)`
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: `linear-gradient(90deg, transparent, ${color}20, transparent)`
        }}
      />
      {children}
    </motion.div>
  );
}

export default function ExperienceOpening() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const title1 = "DR DAN'S";
  const title2 = "NO BS WHEY";

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.05]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '80px 80px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      <motion.div 
        className="text-center z-10 px-8"
        style={{ opacity, scale, y }}
      >
        {/* Label in neon box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <NeonBox color="#4488ff" delay={0.5}>
            <span className="text-[#4488ff] text-xs uppercase tracking-[0.5em] font-medium">
              Performance Lab
            </span>
          </NeonBox>
        </motion.div>

        {/* Main title - letter by letter animation */}
        <div className="mb-2">
          <h1
            className="text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(40px, 10vw, 140px)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.02em'
            }}
          >
            {title1.split('').map((letter, i) => (
              <AnimatedLetter key={i} letter={letter} index={i} />
            ))}
          </h1>
        </div>

        <div className="mb-12">
          <h1
            className="text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(40px, 10vw, 140px)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.02em'
            }}
          >
            {title2.split('').map((letter, i) => (
              <AnimatedLetter key={i} letter={letter} index={i + title1.length} />
            ))}
          </h1>
        </div>

        {/* Subtitle with scanline effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="relative inline-block"
        >
          <div className="px-8 py-3 border border-[#222] bg-[#0a0a0a]">
            <p className="text-[#555] text-sm uppercase tracking-[0.4em]">
              <GlitchText text="Scroll to enter" />
            </p>
          </div>
          {/* Scanline */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff88] to-transparent opacity-10"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Scroll indicator with animated border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-16"
        >
          <div className="relative w-6 h-12 mx-auto border border-[#333] rounded-full">
            <motion.div
              className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#00ff88] rounded-full"
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32 },
        { bottom: 32, left: 32 },
        { bottom: 32, right: 32 }
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16"
          style={pos}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 + i * 0.1 }}
        >
          <div 
            className="absolute w-full h-px bg-gradient-to-r from-[#00ff88] to-transparent"
            style={{ top: 0, left: 0 }}
          />
          <div 
            className="absolute w-px h-full bg-gradient-to-b from-[#00ff88] to-transparent"
            style={{ top: 0, left: 0 }}
          />
        </motion.div>
      ))}
    </section>
  );
}
