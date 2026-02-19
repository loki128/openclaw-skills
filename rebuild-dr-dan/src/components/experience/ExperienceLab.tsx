'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceLab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const certifications = [
    { title: 'NSF Certified', desc: 'Independently tested for banned substances and label accuracy.', color: '#00ff88' },
    { title: 'GMP Facility', desc: 'Manufactured in FDA-registered facilities following strict protocols.', color: '#4488ff' },
    { title: 'Third-Party Tested', desc: 'Every batch verified by independent laboratories for purity.', color: '#ffffff' },
  ];

  return (
    <section className="relative py-32 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div ref={ref}>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-[#4488ff] text-sm uppercase tracking-[0.5em] mb-6"
            >
              The Lab
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-white text-4xl md:text-5xl font-bold mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Laboratory Standards
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-[#888] text-lg leading-relaxed"
            >
              We don't trust marketing claims. We trust data. Every batch 
              undergoes rigorous testing for heavy metals, microbial contamination, 
              and protein content. If it doesn't meet our standards, it doesn't 
              leave the lab.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-8 border border-[#1a1a1a]"
              >
                <div 
                  className="w-3 h-3 mb-6"
                  style={{ backgroundColor: cert.color }}
                />
                
                <h3 className="text-white text-xl font-bold mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {cert.title}
                </h3>
                
                <p className="text-[#555] leading-relaxed">
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="p-8 border border-[#1a1a1a]"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]">
              <span className="text-[#555] text-sm uppercase tracking-wider">
                Purity Analysis
              </span>
              <span className="text-[#00ff88] font-mono">92.4% Pure</span>
            </div>

            <div className="space-y-6">
              {[
                { label: 'Protein Content', value: 92, color: '#00ff88' },
                { label: 'Heavy Metals', value: 0, color: '#ff3333' },
                { label: 'Microbial Contamination', value: 0, color: '#4488ff' },
              ].map((item, index) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#555]">{item.label}</span>
                    <span className="font-mono" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                  <div className="h-2 bg-[#111] border border-[#1a1a1a]">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.value}%` } : {}}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
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
