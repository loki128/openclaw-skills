'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative min-h-screen py-32 bg-[#050505] flex items-center">
      <div className="max-w-[1000px] mx-auto px-8 w-full">
        <motion.div 
          ref={ref}
          className="text-center"
        >
          {/* Single powerful line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-[#333] text-xs uppercase tracking-[0.5em] mb-12"
          >
            The Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: 600,
              lineHeight: 1.2
            }}
          >
            Beat cancer.
            <br />
            <span className="text-[#333]">Rebuilt stronger.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-[#555] max-w-xl mx-auto mb-16"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              lineHeight: 1.8
            }}
          >
            A PhD biochemist faced mortality. 
            Applied laboratory precision to recovery. 
            Emerged with a formula that doesn't compromise.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: 'PhD', label: 'Biochemistry' },
              { value: '3rd', label: 'Party Tested' },
              { value: '0', label: 'Compromise' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p 
                  className="text-white text-2xl md:text-3xl mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
                >
                  {stat.value}
                </p>                
                <p className="text-[#444] text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
