'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function IronSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const liftY = useTransform(scrollYProgress, [0.2, 0.6], [200, -100]);
  const gripRotate = useTransform(scrollYProgress, [0.2, 0.6], [0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-[200vh] bg-black"
    >
      <motion.div 
        className="sticky top-0 h-screen flex items-center overflow-hidden"
        style={{ opacity }}
      >
        {/* Background text */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.03, 0.1]) }}
        >
          <span 
            className="text-white font-black whitespace-nowrap"
            style={{ fontSize: 'clamp(200px, 30vw, 400px)' }}
          >
            IRON
          </span>
        </motion.div>

        <div className="relative z-10 w-full px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-red-500 text-sm tracking-[0.4em] uppercase mb-6"
              >
                The Foundation
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white font-black mb-8"
                style={{
                  fontSize: 'clamp(48px, 8vw, 100px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em'
                }}
              >
                OLD SCHOOL.
                <br />
                <span className="text-zinc-700">NO EXCUSES.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 text-lg max-w-md leading-relaxed"
              >
                The bar doesn't care about your excuses. Neither do we. 
                Every batch tested. Every ingredient verified.
              </motion.p>
            </div>

            <div className="relative h-[500px] flex items-center justify-center">
              {/* Barbell visualization */}
              <motion.div
                className="relative w-full max-w-lg"
                style={{ y: liftY }}
              >
                {/* Bar */}
                <div className="relative h-4 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 rounded-full"
                >
                  {/* Knurling pattern */}
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 w-32 h-full opacity-50"
                    style={{
                      background: 'repeating-linear-gradient(90deg, transparent, transparent 3px, #000 3px, #000 6px)'
                    }}
                  />
                </div>

                {/* Left plates */}
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center"
                  style={{ rotate: gripRotate }}
                >
                  {[45, 25, 10, 5].map((weight, i) => (
                    <motion.div
                      key={`left-${weight}`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="relative mx-0.5"
                      style={{ transformOrigin: 'center' }}
                    >
                      <div
                        className="bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-700 border-x border-zinc-600"
                        style={{
                          width: 8 + i * 4,
                          height: 60 + weight * 2
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-zinc-900 text-[8px] font-bold">
                            {weight}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Right plates */}
                <motion.div 
                  className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center flex-row-reverse"
                  style={{ rotate: useTransform(gripRotate, v => -v) }}
                >
                  {[45, 25, 10, 5].map((weight, i) => (
                    <motion.div
                      key={`right-${weight}`}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="relative mx-0.5"
                      style={{ transformOrigin: 'center' }}
                    >
                      <div
                        className="bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-700 border-x border-zinc-600"
                        style={{
                          width: 8 + i * 4,
                          height: 60 + weight * 2
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-zinc-900 text-[8px] font-bold">
                            {weight}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
