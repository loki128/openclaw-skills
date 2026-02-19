'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ExperienceProduct() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <section className="min-h-screen bg-[#050505] flex items-center px-16 py-32">
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePosition({ x: 0, y: 0 });
          }}
          className="flex justify-center"
        >
          <motion.div
            className="w-[400px] h-[500px] relative"
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
              <div className="text-center"
              >
                <div className="w-40 h-56 mx-auto mb-6 relative"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(180deg, #1a1a1a 0%, #111 100%)',
                      border: '1px solid #2a2a2a',
                      clipPath: 'polygon(15% 0%, 85% 0%, 100% 8%, 100% 92%, 85% 100%, 15% 100%, 0% 92%, 0% 8%)'
                    }}
                  />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <span className="text-[#00ff88] text-sm uppercase tracking-[0.4em] mb-3"
                    >NO BS</span>
                    
                    <span className="text-white text-3xl font-bold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      WHEY
                    </span>
                    
                    <span className="text-[#444] text-xs mt-6 uppercase tracking-wider"
                    >PhD Formulated</span>
                  </div>
                </div>

                <p className="text-[#333] text-sm tracking-[0.2em]"
                >2LB / 30 SERVINGS</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8"
          >
            <span className="px-4 py-2 bg-[#00ff88] text-black text-xs font-bold uppercase tracking-wider"
            >PhD Formulated</span>
            
            <span className="px-4 py-2 border border-[#ff3333] text-[#ff3333] text-xs font-bold uppercase tracking-wider"
            >Survivor Approved</span>
          </div>

          <h2 
            className="text-white mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.02em'
            }}
          >
            NO BS WHEY
          </h2>

          <p className="text-[#666] text-xl mb-12 max-w-[40ch]"
          >
            25g protein. 2.8g leucine. Zero fillers. 
            Third-party tested.
          </p>

          <div className="flex items-baseline gap-4 mb-12"
          >
            <span className="text-white text-5xl font-bold"
            >$49.99</span>
            
            <span className="text-[#444]"
            >/ 30 servings</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-16 py-5 bg-white text-black text-sm uppercase tracking-[0.2em] font-bold hover:bg-[#00ff88] transition-colors"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
