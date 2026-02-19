'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative py-32 bg-[#050505]">
      <div className="max-w-[1000px] mx-auto px-8">
        <div ref={ref}>
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-[#ff3333] text-sm uppercase tracking-[0.5em] mb-6"
            >
              The Story
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-white text-4xl md:text-6xl font-bold mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Beat cancer.
              <br />
              <span className="text-[#333]">Rebuilt stronger.</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <p className="text-[#888] text-lg leading-relaxed mb-6">
                As a PhD biochemist, I spent years studying molecular structures 
                in sterile labs. Then I faced my own mortality. Cancer doesn't 
                care about your credentials or your research papers.
              </p>
              
              <p className="text-[#888] text-lg leading-relaxed">
                During recovery, I applied the same laboratory precision to 
                my own nutrition. I needed protein that worked—without the 
                fillers, the marketing claims, or the compromises.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#888] text-lg leading-relaxed mb-6">
                What I found disappointed me. The supplement industry was 
                built on hype, not science. Products loaded with artificial 
                sweeteners, undisclosed ingredients, and protein content that 
                didn't match the label.
              </p>
              
              <p className="text-[#888] text-lg leading-relaxed">
                So I built what I couldn't find: a whey protein that meets 
                laboratory standards. No BS. Just pure, tested, effective 
                nutrition.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-8"
          >
            {[
              { value: 'PhD', label: 'Biochemistry' },
              { value: '3rd', label: 'Party Tested' },
              { value: '0', label: 'Compromise' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center p-6 border border-[#1a1a1a]">
                <p className="text-white text-3xl md:text-4xl font-bold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#444] text-xs uppercase tracking-wider">
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
