'use client';

import { motion } from 'framer-motion';

export default function StorySection() {
  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          viewport={{ once: true }}
          className="text-white font-black whitespace-nowrap"
          style={{ fontSize: 'clamp(150px, 25vw, 350px)' }}
        >
          SURVIVOR
        </motion.span>
      </div>

      <div className="relative z-10 w-full px-8 lg:px-16 py-32">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-500 text-sm tracking-[0.4em] uppercase mb-8"
          >
            The Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white font-black mb-4"
            style={{
              fontSize: 'clamp(64px, 10vw, 140px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em'
            }}
          >
            BEAT CANCER.
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-800 font-black mb-12"
            style={{
              fontSize: 'clamp(64px, 10vw, 140px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em'
            }}
          >
            REBUILT STRONGER.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 max-w-3xl"
          >
            <p className="text-zinc-400 text-lg leading-relaxed">
              As a PhD biochemist, I spent years studying molecular structures 
              in sterile labs. Then I faced my own mortality.
            </p>
            
            <p className="text-zinc-400 text-lg leading-relaxed">
              During recovery, I applied laboratory precision to my own nutrition. 
              What I found disappointed me. So I built what I couldn't find.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex gap-12 mt-16"
          >
            {[
              { value: 'PhD', label: 'Biochemistry' },
              { value: '3rd', label: 'Party Tested' },
              { value: '0', label: 'Compromise' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  className="text-4xl md:text-5xl font-black text-white mb-2"
                >
                  {stat.value}
                </motion.p>
                <p className="text-zinc-600 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
