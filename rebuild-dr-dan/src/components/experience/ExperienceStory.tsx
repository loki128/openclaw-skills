'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Dramatic reveal text
function RevealText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const totalIndex = text.split(' ').slice(0, wordIndex).join(' ').length + charIndex + wordIndex;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: delay + totalIndex * 0.03,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

// Glowing stat box
function StatBox({ value, label, index }: { value: string; label: string; index: number }) {
  const colors = ['#00ff88', '#4488ff', '#ff3333'];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
      className="relative p-6 text-center"
      style={{
        border: `1px solid ${color}30`,
        background: `linear-gradient(180deg, ${color}08 0%, transparent 100%)`
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)`
        }}
      />

      <motion.p
        className="text-4xl md:text-5xl font-bold mb-2 relative z-10"
        style={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          color,
          textShadow: `0 0 30px ${color}40`
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 + index * 0.1 }}
      >
        {value}
      </motion.p>

      <p className="text-[#444] text-xs uppercase tracking-[0.3em] relative z-10">
        {label.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 + i * 0.02 }}
          >
            {char}
          </motion.span>
        ))}
      </p>

      {/* Accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px]"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: '60%' }}
        transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
      />
    </motion.div>
  );
}

// Quote block with dramatic styling
function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="relative pl-8 border-l-2 border-[#333]"
    >
      <motion.div
        className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#00ff88] via-[#4488ff] to-[#ff3333]"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ originY: 0 }}
      />
      <div className="text-[#555] text-lg leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}

export default function ExperienceStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative min-h-screen py-32 bg-[#050505] flex items-center overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#222] to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="max-w-[1000px] mx-auto px-8 w-full relative z-10">
        <motion.div ref={ref} className="text-center">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="mb-12"
          >
            <div 
              className="inline-block px-6 py-2"
              style={{
                border: '1px solid #333',
                background: 'linear-gradient(90deg, rgba(255,51,51,0.1), transparent)'
              }}
            >
              <p className="text-[#ff3333] text-xs uppercase tracking-[0.5em]">
                {'The Story'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-white mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(36px, 8vw, 80px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            <RevealText text="Beat cancer." delay={0.2} />
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="mb-12"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(36px, 8vw, 80px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            <span className="text-[#333]">
              <RevealText text="Rebuilt stronger." delay={0.5} />
            </span>
          </motion.h2>

          {/* Story quote */}
          <div className="max-w-2xl mx-auto mb-16">
            <QuoteBlock>
              <p className="text-[#555]">
                {'A PhD biochemist faced mortality. '.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.01 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
              <p className="text-[#555] mt-2">
                {'Applied laboratory precision to recovery. '.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 + i * 0.01 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
              <p className="text-[#555] mt-2">
                {'Emerged with a formula that doesn\'t compromise.'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.6 + i * 0.01 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            </QuoteBlock>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <StatBox value="PhD" label="Biochemistry" index={0} />
            <StatBox value="3rd" label="Party Tested" index={1} />
            <StatBox value="0" label="Compromise" index={2} />
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="mt-16 flex justify-center"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-[#333]" />
              <div className="w-2 h-2 rotate-45 border border-[#00ff88]" />
              <div className="w-12 h-px bg-[#333]" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
