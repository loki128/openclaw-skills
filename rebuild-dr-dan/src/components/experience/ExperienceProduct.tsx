'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ExperienceProduct() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <section className="relative py-32 bg-[#050505]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div ref={ref}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setMousePosition({ x: 0, y: 0 });
              }}
            >
              <motion.div
                className="aspect-square max-w-[500px] mx-auto"
                style={{
                  rotateX: isHovered ? -mousePosition.y : 0,
                  rotateY: isHovered ? mousePosition.x : 0,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)',
                    border: '1px solid #222'
                  }}
                >
                  <div className="text-center">
                    <div className="w-32 h-48 mx-auto mb-4 relative"
                      style={{ transform: 'translateZ(30px)' }}
                    >
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
                          border: '1px solid #2a2a2a',
                          clipPath: 'polygon(15% 0%, 85% 0%, 100% 8%, 100% 92%, 85% 100%, 15% 100%, 0% 92%, 0% 8%)'
                        }}
                      />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[#00ff88] text-xs uppercase tracking-[0.3em] mb-2">NO BS</span>
                        <span className="text-white text-2xl font-bold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          WHEY
                        </span>
                        <span className="text-[#444] text-[10px] mt-4 uppercase tracking-wider">PhD Formulated</span>
                      </div>
                    </div>

                    <p className="text-[#333] text-xs">2LB / 30 SERVINGS</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-[#00ff88] text-black text-[10px] font-bold uppercase tracking-wider">
                  PhD Formulated
                </span>
                <span className="px-3 py-1 border border-[#ff3333] text-[#ff3333] text-[10px] font-bold uppercase tracking-wider">
                  Survivor Approved
                </span>
              </div>

              <h2 
                className="text-white text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                NO BS WHEY
              </h2>

              <p className="text-[#888] text-lg leading-relaxed mb-8">
                25g protein. 2.8g leucine. Zero fillers. Third-party tested. 
                Precision formulated for those who refuse to compromise on quality.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  '25g protein per serving',
                  '2.8g leucine for muscle synthesis',
                  'Zero fillers or artificial ingredients',
                  'Third-party tested for purity'
                ].map((feature, index) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center border border-[#00ff88]">
                      <span className="text-[#00ff88] text-xs">✓</span>
                    </div>
                    <span className="text-[#888]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-white text-4xl font-bold">$49.99</span>
                <span className="text-[#444]">/ 30 servings</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-white text-black text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#00ff88] transition-colors"
              >
                Add to Cart
              </motion.button>

              <p className="text-[#333] text-xs mt-6">
                Free shipping over $75. 30-day guarantee.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
