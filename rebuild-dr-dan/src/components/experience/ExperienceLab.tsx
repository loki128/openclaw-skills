'use client';

import { motion } from 'framer-motion';

export default function ExperienceLab() {
  return (
    <section className="min-h-screen bg-[#050505] flex items-center px-16 py-32">
      <div className="w-1/3">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#4488ff] text-xs uppercase tracking-[0.5em] mb-8"
        >
          The Lab
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white mb-8"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1
          }}
        >
          Tested.
          <br />
          Verified.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#555] text-lg max-w-[40ch] leading-relaxed mb-12"
        >
          Every batch tested for heavy metals, microbial contamination, 
          and protein content. If it doesn't meet our standards, 
          it doesn't leave the lab.
        </motion.p>

        <div className="space-y-6">
          {[
            { label: 'Protein Content', value: 92, color: '#00ff88' },
            { label: 'Heavy Metals', value: 0, color: '#ff3333' },
            { label: 'Microbial', value: 0, color: '#4488ff' },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#555]">{item.label}</span>
                <span className="font-mono" style={{ color: item.color }}>{item.value}%</span>
              </div>
              <div className="h-1 bg-[#111] border border-[#1a1a1a]">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute right-16 top-1/2 -translate-y-1/2 grid grid-cols-1 gap-8">
        {[
          { title: 'NSF', desc: 'Certified' },
          { title: 'GMP', desc: 'Facility' },
          { title: '3rd', desc: 'Party Tested' },
        ].map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.15 }}
            className="text-right"
          >
            <p className="text-white text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {cert.title}
            </p>
            <p className="text-[#444] text-sm uppercase tracking-wider">
              {cert.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
