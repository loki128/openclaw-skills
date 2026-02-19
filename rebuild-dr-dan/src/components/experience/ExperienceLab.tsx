'use client';

import { motion } from 'framer-motion';

export default function ExperienceLab() {
  return (
    <section className="min-h-screen bg-[#050505] flex items-center px-16 py-32 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #333 1px, transparent 0)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-1/3 relative z-10">
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
              <div className="h-2 bg-[#111] border border-[#1a1a1a] relative overflow-hidden">
                <motion.div
                  className="h-full relative"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
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
          ))}
        </div>
      </div>

      {/* Right side - Lab equipment visualization */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2">
        {/* Test tubes rack */}
        <div className="flex gap-4">
          {[
            { color: '#00ff88', level: 80, label: 'Protein' },
            { color: '#4488ff', level: 60, label: 'Leucine' },
            { color: '#ff3333', level: 40, label: 'BCAAs' },
          ].map((tube, index) => (
            <motion.div
              key={tube.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="flex flex-col items-center"
            >
              <div 
                className="w-8 h-32 relative rounded-b-full overflow-hidden border border-[#333] border-t-0"
                style={{ background: '#0a0a0a' }}
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ backgroundColor: tube.color }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${tube.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                >
                  <div 
                    className="absolute top-0 left-0 right-0 h-2"
                    style={{
                      background: `linear-gradient(180deg, ${tube.color}80, ${tube.color})`
                    }}
                  />
                </motion.div>
              </div>
              
              <p className="text-[#444] text-xs uppercase tracking-wider mt-3">
                {tube.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <div className="mt-16 space-y-4">
          {[
            { title: 'NSF', desc: 'Certified', color: '#00ff88' },
            { title: 'GMP', desc: 'Facility', color: '#4488ff' },
            { title: '3RD', desc: 'Party Tested', color: '#ffffff' },
          ].map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div 
                className="w-12 h-12 flex items-center justify-center border"
                style={{ borderColor: cert.color }}
              >
                <span 
                  className="text-lg font-bold"
                  style={{ color: cert.color, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {cert.title}
                </span>
              </div>
              
              <p className="text-[#444] text-sm uppercase tracking-wider">
                {cert.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
