'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="mb-16"
          >
            <p className="text-[#333] text-xs uppercase tracking-[0.4em] mb-4">The Lab</p>            
            <h2 
              className="text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 600
              }}
            >
              Scientific Precision
            </h2>
          </motion.div>

          {/* Lab panels */}
          <div className="grid md:grid-cols-3 gap-6">
            {panels.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15 }}
                className="border border-[#1a1a1a] bg-[#0a0a0a] p-6 relative overflow-hidden group"
              >
                {/* Status indicator */}
                <motion.div
                  className="absolute top-0 right-0 w-2 h-2 m-4 rounded-full"
                  style={{ backgroundColor: panel.color }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <p className="text-[#444] text-xs uppercase tracking-wider mb-8">{panel.title}</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#555] text-sm">Status</span>                    
                    <span 
                      className="text-sm font-medium"
                      style={{ color: panel.color }}
                    >
                      {panel.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#555] text-sm">Date</span>                    
                    <span className="text-[#888] text-sm">{panel.date}</span>
                  </div>

                  <div className="h-px bg-[#1a1a1a] my-4" />

                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-sm flex items-center justify-center"
                      style={{ border: `1px solid ${panel.color}` }}
                    >
                      <span style={{ color: panel.color }}>✓</span>
                    </div>                    
                    <span className="text-[#444] text-xs">Verified</span>
                  </div>
                </div>

                {/* Hover line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px"
                  style={{ backgroundColor: panel.color }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Data visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-16 border border-[#1a1a1a] p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#444] text-xs uppercase tracking-wider">Purity Analysis</p>              
              <p className="text-[#00ff88] text-sm">92.4% Pure</p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Protein Content', value: 92, color: '#00ff88' },
                { label: 'Heavy Metals', value: 0, color: '#ff3333' },
                { label: 'Microbial', value: 0, color: '#4488ff' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#555]">{item.label}</span>                    
                    <span className="text-[#888]">{item.value}%</span>
                  </div>                  
                  <div className="h-1 bg-[#1a1a1a]">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.value}%` } : {}}
                      transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
