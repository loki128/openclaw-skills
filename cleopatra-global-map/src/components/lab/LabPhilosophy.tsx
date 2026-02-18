'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function LabPhilosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-48 px-8 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-[1000px] mx-auto text-center">
        <motion.div ref={ref}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#666] text-xs uppercase tracking-[0.4em] mb-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-white mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 500,
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            We formulate.
            <br />
            <span className="text-[#444]">Others market.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-[#888] max-w-xl mx-auto mb-16"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              lineHeight: '1.7'
            }}
          >
            No fillers. No proprietary blends. No marketing fluff. 
            Just pure, tested, transparent nutrition science.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '0', label: 'Fillers' },
              { value: '100%', label: 'Transparent' },
              { value: '3rd', label: 'Party Tested' },
            ].map((stat) => (
              <div key={stat.label} className="text-center"
              >
                <p 
                  className="text-white mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(24px, 4vw, 40px)',
                    fontWeight: 500
                  }}
                >
                  {stat.value}
                </p>                
                <p 
                  className="text-[#666] text-xs uppercase tracking-[0.2em]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
