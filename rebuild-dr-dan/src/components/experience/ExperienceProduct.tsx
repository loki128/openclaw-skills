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
            className="relative"
            style={{
              rotateX: isHovered ? -mousePosition.y : 0,
              rotateY: isHovered ? mousePosition.x : 0,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{ 
                opacity: isHovered ? 0.5 : 0.3,
                scale: isHovered ? 1.1 : 1
              }}
              style={{
                background: 'radial-gradient(circle, rgba(0,255,136,0.2) 0%, transparent 70%)',
                filter: 'blur(60px)'
              }}
            />

            {/* Actual product image */}
            <motion.div
              className="relative w-[450px] h-[600px] overflow-hidden"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 5%, 100% 95%, 90% 100%, 10% 100%, 0% 95%, 0% 5%)'
              }}
            >
              <img 
                src="https://i.ibb.co/tT3q3BVr/PHOTO-2025-06-17-20-53-25.jpg"
                alt="NO BS WHEY Protein"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient for blend */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, transparent 20%, transparent 80%, rgba(5,5,5,0.5) 100%)'
                }}
              />
            </motion.div>

            {/* Reflection */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 opacity-30"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,255,136,0.3), transparent)',
                filter: 'blur(30px)'
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="px-4 py-2 bg-[#00ff88] text-black text-xs font-bold uppercase tracking-wider">
              PhD Formulated
            </span>
            <span className="px-4 py-2 border border-[#ff3333] text-[#ff3333] text-xs font-bold uppercase tracking-wider">
              Survivor Approved
            </span>
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

          <p className="text-[#666] text-xl mb-12 max-w-[40ch]">
            25g protein. 2.8g leucine. Zero fillers. 
            Third-party tested.
          </p>

          <div className="flex items-baseline gap-4 mb-12">
            <span className="text-white text-5xl font-bold">$49.99</span>
            <span className="text-[#444]">/ 30 servings</span>
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
