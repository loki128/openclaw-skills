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
    <section className="relative min-h-screen py-32 bg-[#050505] flex items-center">
      {/* Controlled lighting background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 50%)'
          }}
        />
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-8 w-full">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Product visual with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePosition({ x: 0, y: 0 });
            }}
          >
            <motion.div
              className="aspect-square max-w-[500px] mx-auto relative"
              style={{
                rotateX: isHovered ? -mousePosition.y : 0,
                rotateY: isHovered ? mousePosition.x : 0,
                transformStyle: 'preserve-3d'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0"
                animate={{ opacity: isHovered ? 0.3 : 0 }}
                style={{
                  background: 'radial-gradient(circle, rgba(0,255,136,0.3) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />

              {/* Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-[#222] flex items-center justify-center">
                {/* Product representation */}
                <div className="text-center">
                  <motion.div
                    className="w-32 h-48 mx-auto mb-6 relative"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    {/* Tub body */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#111] border border-[#2a2a2a]"
                      style={{
                        clipPath: 'polygon(15% 0%, 85% 0%, 100% 8%, 100% 92%, 85% 100%, 15% 100%, 0% 92%, 0% 8%)'
                      }}
                    />
                    
                    {/* Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[#00ff88] text-[10px] uppercase tracking-[0.3em] mb-2">NO BS</span>                      
                      <span className="text-white text-xl font-bold">WHEY</span>                      
                      <span className="text-[#444] text-[8px] mt-4 uppercase tracking-wider">PhD Formulated</span>
                    </div>
                  </motion.div>

                  <p className="text-[#333] text-xs">2LB / 30 SERVINGS</p>
                </div>
              </div>

              {/* Reflection */}
              <motion.div
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 opacity-20"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,255,136,0.2), transparent)',
                  filter: 'blur(20px)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-[#00ff88] text-black text-[10px] font-bold uppercase tracking-wider">PhD Formulated</span>              
              <span className="px-3 py-1 border border-[#ff3333] text-[#ff3333] text-[10px] font-bold uppercase tracking-wider">Survivor Approved</span>
            </div>

            <h2 
              className="text-white mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 600
              }}
            >
              NO BS WHEY
            </h2>

            <p className="text-[#555] mb-8 max-w-md">
              25g protein. 2.8g leucine. Zero fillers. 
              Third-party tested. Precision formulated for those who refuse to compromise.
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-white text-4xl font-bold">$49.99</span>              
              <span className="text-[#444]">/ 30 servings</span>
            </div>

            {/* Minimal UI */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-white text-black text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#00ff88] transition-colors"
            >
              Add to Cart
            </motion.button>

            <p className="text-[#333] text-xs mt-6">Free shipping over $75. 30-day guarantee.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
