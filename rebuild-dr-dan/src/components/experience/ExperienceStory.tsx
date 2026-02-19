'use client';

import { motion } from 'framer-motion';

export default function ExperienceStory() {
  return (
    <section className="h-screen bg-[#050505] flex items-center justify-center px-8 relative overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,51,51,0.1) 0%, transparent 60%)'
        }}
      />

      <div className="text-center max-w-[1000px] relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#ff3333] text-xs uppercase tracking-[0.5em] mb-12"
        >
          The Story
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white mb-4"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}
        >
          Beat cancer.
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#333] mb-16"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(64px, 10vw, 120px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}
        >
          Rebuilt stronger.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-[#555] text-xl max-w-[60ch] mx-auto leading-relaxed mb-16"
        >
          A PhD biochemist faced mortality. Applied laboratory precision 
          to recovery. Emerged with a formula that doesn't compromise.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-16"
        >
          {[
            { value: 'PhD', label: 'Biochemistry', color: '#00ff88' },
            { value: '3rd', label: 'Party Tested', color: '#4488ff' },
            { value: '0', label: 'Compromise', color: '#ff3333' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <p 
                className="text-5xl font-bold mb-2"
                style={{ 
                  color: stat.color,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow: `0 0 30px ${stat.color}30`
                }}
              >
                {stat.value}
              </p>
              <p className="text-[#444] text-xs uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
