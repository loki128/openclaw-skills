'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LabSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-blue-400 text-sm tracking-[0.4em] uppercase mb-6"
          >
            The Lab
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white font-black"
            style={{
              fontSize: 'clamp(48px, 8vw, 100px)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em'
            }}
          >
            TESTED.
            <br />
            <span className="text-zinc-700">VERIFIED.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {[
            { 
              title: 'NSF Certified', 
              desc: 'Independently tested for banned substances and label accuracy.',
              icon: '✓',
              color: '#00ff88'
            },
            { 
              title: 'GMP Facility', 
              desc: 'Manufactured in FDA-registered facilities following strict protocols.',
              icon: '⚗',
              color: '#4488ff'
            },
            { 
              title: '3rd Party Tested', 
              desc: 'Every batch verified by independent laboratories for purity.',
              icon: '◈',
              color: '#ffffff'
            },
          ].map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 border border-zinc-900 hover:border-zinc-700 transition-colors"
            >
              <div 
                className="text-4xl mb-6"
                style={{ color: cert.color }}
              >
                {cert.icon}
              </div>
              
              <h3 className="text-white text-xl font-bold mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {cert.title}
              </h3>
              
              <p className="text-zinc-500 leading-relaxed">
                {cert.desc}
              </p>

              <motion.div
                className="absolute bottom-0 left-0 h-0.5"
                style={{ 
                  backgroundColor: cert.color,
                  scaleX: lineProgress,
                  transformOrigin: 'left'
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Purity analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-zinc-900 p-8 lg:p-12"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-zinc-500 text-sm uppercase tracking-wider">
              Purity Analysis
            </span>
            <span className="text-emerald-400 font-mono text-lg">92.4% PURE</span>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Protein Content', value: 92, color: '#00ff88' },
              { label: 'Heavy Metals', value: 0, color: '#ff3333' },
              { label: 'Microbial', value: 0, color: '#4488ff' },
            ].map((item, index) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-500">{item.label}</span>
                  <span className="font-mono" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="h-2 bg-zinc-900 overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                  >
                    <motion.div
                      className="h-full w-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                      }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
