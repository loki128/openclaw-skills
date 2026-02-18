'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface EntranceProps {
  onEnter: () => void;
}

export default function TheEntrance({ onEnter }: EntranceProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center">
      {/* Atmospheric depth */}
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(100,80,40,0.05) 0%, transparent 40%)
          `
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[#8b7355] text-xs uppercase tracking-[0.5em] mb-12"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.4em' }}
        >
          Est. 2018
        </motion.p>

        {/* Massive headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-white mb-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 10vw, 140px)',
            fontWeight: 300,
            lineHeight: '0.95',
            letterSpacing: '-0.02em'
          }}
        >
          Cleopatra
          <br />
          <span style={{ fontStyle: 'italic' }}>Delights</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-[#666] mb-20 max-w-md mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 400,
            lineHeight: '1.5',
            fontStyle: 'italic'
          }}
        >
          A global house of dessert mastery
        </motion.p>

        {/* Elegant invitation */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          onClick={onEnter}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative"
        >
          <span 
            className="text-[#C9A227] text-sm uppercase tracking-[0.3em] transition-all duration-500"
            style={{ 
              fontFamily: "'Inter', sans-serif",
              letterSpacing: isHovered ? '0.4em' : '0.3em'
            }}
          >
            Enter the Salon
          </span>
          
          <motion.div
            className="h-px bg-[#C9A227] mt-4 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? 120 : 80 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.button>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-px bg-[#1a1a1a]" />
      <div className="absolute top-8 left-8 w-px h-16 bg-[#1a1a1a]" />
      <div className="absolute top-8 right-8 w-16 h-px bg-[#1a1a1a]" />
      <div className="absolute top-8 right-8 w-px h-16 bg-[#1a1a1a]" />
      <div className="absolute bottom-8 left-8 w-16 h-px bg-[#1a1a1a]" />
      <div className="absolute bottom-8 left-8 w-px h-16 bg-[#1a1a1a]" />
      <div className="absolute bottom-8 right-8 w-16 h-px bg-[#1a1a1a]" />
      <div className="absolute bottom-8 right-8 w-px h-16 bg-[#1a1a1a]" />
    </section>
  );
}
