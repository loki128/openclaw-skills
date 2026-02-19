'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

// Text with animated underline
function UnderlineText({ children, color = '#00ff88' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="relative inline-block">
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </span>
  );
}

// Glowing text box
function GlowBox({ 
  children, 
  color = '#00ff88', 
  size = 'md',
  animate = true 
}: { 
  children: React.ReactNode; 
  color?: string; 
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.div
      className={`relative inline-block ${sizeClasses[size]}`}
      style={{
        border: `1px solid ${color}60`,
        background: `linear-gradient(135deg, ${color}10 0%, transparent 60%)`,
        boxShadow: `0 0 30px ${color}20, inset 0 0 30px ${color}10`
      }}
      whileHover={animate ? { 
        boxShadow: `0 0 50px ${color}40, inset 0 0 40px ${color}20`,
        borderColor: `${color}90`
      } : {}}
    >
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={animate ? { 
          opacity: [0, 0.2, 0],
          background: `linear-gradient(90deg, transparent, ${color}30, transparent)`
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <span style={{ color }} className="relative z-10">{children}</span>
    </motion.div>
  );
}

// Split text animation
function SplitText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, duration: 0.4 }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function ExperienceIron() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const liftProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const barY = useTransform(liftProgress, [0, 1], [100, -80]);
  const silhouetteScale = useTransform(liftProgress, [0, 1], [0.9, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#050505]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 text-center">
          {/* Section label in glow box */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-20"
          >
            <GlowBox color="#ff3333" size="sm">
              <span className="uppercase tracking-[0.5em] text-xs font-bold">
                <SplitText text="THE IRON" />
              </span>
            </GlowBox>
          </motion.div>

          {/* Lifting silhouette */}
          <motion.div
            className="relative w-72 h-96 mx-auto"
            style={{ scale: silhouetteScale }}
          >
            {/* Barbell */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-96 h-3 bg-gradient-to-r from-[#1a1a1a] via-[#333] to-[#1a1a1a]"
              style={{ y: barY }}
            >
              {/* Weight plates with glow */}
              {[
                { left: 16, w: 5, h: 24 },
                { left: 28, w: 4, h: 20 },
                { left: 38, w: 3, h: 16 },
                { right: 16, w: 5, h: 24 },
                { right: 28, w: 4, h: 20 },
                { right: 38, w: 3, h: 16 }
              ].map((plate, i) => (
                <motion.div
                  key={i}
                  className="absolute -top-10 border"
                  style={{
                    ...(plate.left ? { left: plate.left } : { right: plate.right }),
                    width: plate.w,
                    height: plate.h,
                    background: 'linear-gradient(180deg, #222 0%, #111 100%)',
                    borderColor: '#333',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                  }}
                  animate={{ 
                    boxShadow: [
                      '0 0 10px rgba(0,0,0,0.5)',
                      '0 0 20px rgba(255,51,51,0.3)',
                      '0 0 10px rgba(0,0,0,0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>

            {/* Body silhouette */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.4 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#222] to-[#111] mx-auto mb-2" />
              <div className="w-24 h-36 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] mx-auto rounded-sm" />
              <div className="flex justify-center gap-5">
                <div className="w-7 h-28 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]" />
                <div className="w-7 h-28 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]" />
              </div>
            </motion.div>

            {/* Arms */}
            <motion.div
              className="absolute bottom-36 left-1/2 -translate-x-1/2 flex gap-24"
              style={{ y: useTransform(liftProgress, [0, 1], [0, -60]) }}
            >
              <div className="w-5 h-28 bg-gradient-to-t from-[#1a1a1a] to-[#222] origin-bottom rotate-12 rounded-sm" />
              <div className="w-5 h-28 bg-gradient-to-t from-[#1a1a1a] to-[#222] origin-bottom -rotate-12 rounded-sm" />
            </motion.div>
          </motion.div>

          {/* Text with creative styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-20 space-y-6"
          >
            {/* Main quote in dramatic box */}
            <div className="relative inline-block px-12 py-6"
              style={{
                border: '1px solid #333',
                background: 'linear-gradient(135deg, rgba(255,51,51,0.05) 0%, transparent 50%)'
              }}
            >
              <p 
                className="text-white text-3xl md:text-4xl mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                <UnderlineText color="#ff3333">
                  <SplitText text="Old school." />
                </UnderlineText>
              </p>
              <p 
                className="text-white text-3xl md:text-4xl"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '-0.02em'
                }}
              >
                <UnderlineText color="#ff3333">
                  <SplitText text="No compromise." />
                </UnderlineText>
              </p>
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ff3333]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#ff3333]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#ff3333]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#ff3333]" />
            </div>

            {/* Subtext in smaller glow box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="mt-8"
            >
              <GlowBox color="#555" size="sm" animate={false}>
                <span className="uppercase tracking-[0.3em] text-xs">
                  <SplitText text="The bar doesn't care about your excuses." />
                </span>
              </GlowBox>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
