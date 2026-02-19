'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Terminal text effect
function TerminalText({ text, color = '#00ff88' }: { text: string; color?: string }) {
  return (
    <motion.span
      className="font-mono"
      style={{ color }}
    >
      {'> '}{text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        _
      </motion.span>
    </motion.span>
  );
}

// Status badge with pulse
function StatusBadge({ status, color }: { status: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs uppercase tracking-wider" style={{ color }}>
        {status}
      </span>
    </div>
  );
}

// Lab panel with cyber styling
function LabPanel({ 
  panel, 
  index 
}: { 
  panel: { id: string; title: string; status: string; date: string; color: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15 }}
      className="relative p-6 overflow-hidden group"
      style={{
        border: `1px solid ${panel.color}30`,
        background: `linear-gradient(135deg, ${panel.color}05 0%, transparent 60%)`
      }}
    >
      {/* Animated border on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${panel.color}10, transparent)`,
        }}
      />

      {/* Top bar */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="px-3 py-1 border border-[#333] bg-[#0a0a0a]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#555]">
            {panel.title}
          </span>
        </div>
        <StatusBadge status={panel.status} color={panel.color} />
      </div>

      {/* Content */}
      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-center py-2 border-b border-[#1a1a1a]">
          <span className="text-[#444] text-xs uppercase tracking-wider">Date Verified</span>
          <span className="text-[#888] text-sm font-mono">{panel.date}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-[#1a1a1a]">
          <span className="text-[#444] text-xs uppercase tracking-wider">Protocol</span>
          <span className="text-[#888] text-xs">ISO 17025</span>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <motion.div 
            className="w-5 h-5 flex items-center justify-center"
            style={{ border: `1px solid ${panel.color}` }}
            animate={{ 
              borderColor: [panel.color, `${panel.color}60`, panel.color]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span style={{ color: panel.color }}>✓</span>
          </motion.div>
          <span className="text-[#444] text-xs uppercase tracking-wider">Blockchain Verified</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: panel.color }}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
      />

      {/* Corner decorations */}
      <div 
        className="absolute top-0 left-0 w-2 h-2"
        style={{ borderTop: `1px solid ${panel.color}`, borderLeft: `1px solid ${panel.color}` }}
      />
      <div 
        className="absolute top-0 right-0 w-2 h-2"
        style={{ borderTop: `1px solid ${panel.color}`, borderRight: `1px solid ${panel.color}` }}
      />
    </motion.div>
  );
}

// Progress bar with animation
function ProgressBar({ 
  label, 
  value, 
  color, 
  index 
}: { 
  label: string; 
  value: number; 
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[#555] uppercase tracking-wider text-xs">{label}</span>
        <motion.span 
          className="font-mono"
          style={{ color }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 + index * 0.1 }}
        >
          {value}%
        </motion.span>
      </div>
      
      <div className="h-2 bg-[#111] border border-[#222] relative overflow-hidden">
        <motion.div
          className="h-full relative"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperienceLab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const panels = [
    { id: 'batch', title: 'BATCH TESTING', status: 'PASSED', date: '2024-02-15', color: '#00ff88' },
    { id: 'nsf', title: 'NSF CERTIFIED', status: 'ACTIVE', date: '2024-01-20', color: '#4488ff' },
    { id: 'gmp', title: 'GMP FACILITY', status: 'VERIFIED', date: '2024-02-01', color: '#ffffff' },
  ];

  return (
    <section className="relative min-h-screen py-32 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div ref={ref}>
          {/* Header with terminal styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="mb-16"
          >
            <motion.div
              className="inline-block px-4 py-2 mb-6 border border-[#333]"
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
            >
              <TerminalText text="cd /lab/protocols" color="#4488ff" />
            </motion.div>
            
            <h2 
              className="text-white text-4xl md:text-6xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {'Scientific Precision'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          {/* Lab panels grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {panels.map((panel, index) => (
              <LabPanel key={panel.id} panel={panel} index={index} />
            ))}
          </div>

          {/* Data visualization panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-8 relative"
            style={{
              border: '1px solid #222',
              background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#00ff88] animate-pulse" />
                <span className="text-[#555] text-xs uppercase tracking-[0.3em]">
                  Purity Analysis
                </span>
              </div>
              
              <motion.div 
                className="px-4 py-2 border border-[#00ff88]"
                style={{ 
                  background: 'linear-gradient(90deg, rgba(0,255,136,0.1), transparent)',
                  boxShadow: '0 0 20px rgba(0,255,136,0.2)'
                }}
              >
                <span className="text-[#00ff88] font-mono text-sm">92.4% PURE</span>
              </motion.div>
            </div>

            {/* Progress bars */}
            <div className="space-y-6">
              <ProgressBar label="Protein Content" value={92} color="#00ff88" index={0} />
              <ProgressBar label="Heavy Metals" value={0} color="#ff3333" index={1} />
              <ProgressBar label="Microbial" value={0} color="#4488ff" index={2} />
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#333]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#333]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#333]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#333]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
