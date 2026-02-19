'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePosition({ x, y });
  };

  return (
    <section className="relative min-h-screen bg-black py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
            className="relative flex justify-center"
          >
            <motion.div
              style={{
                rotateX: isHovered ? -mousePosition.y : 0,
                rotateY: isHovered ? mousePosition.x : 0,
                transformStyle: 'preserve-3d'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-20 -z-10"
                animate={{ 
                  opacity: isHovered ? 0.6 : 0.3,
                  scale: isHovered ? 1.1 : 1
                }}
                style={{
                  background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,255,136,0.15) 0%, transparent 70%)'
                }}
              />

              {/* Product image */}
              <div 
                className="relative w-[400px] h-[550px] overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0%, 92% 0%, 100% 4%, 100% 96%, 92% 100%, 8% 100%, 0% 96%, 0% 4%)'
                }}
              >
                <img 
                  src="https://i.ibb.co/tT3q3BVr/PHOTO-2025-06-17-20-53-25.jpg"
                  alt="NO BS WHEY"
                  className="w-full h-full object-cover"
                />
                
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex gap-3 mb-8">
              <span className="px-4 py-2 bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider"
              >
                PhD Formulated
              </span>
              <span className="px-4 py-2 border border-red-500 text-red-500 text-xs font-bold uppercase tracking-wider"
              >
                Survivor Approved
              </span>
            </div>

            <h2 
              className="text-white font-black mb-8"
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em'
              }}
            >
              NO BS WHEY
            </h2>

            <div className="space-y-4 mb-10">
              {[
                { value: '25g', label: 'Protein per serving' },
                { value: '2.8g', label: 'Leucine for muscle synthesis' },
                { value: '0', label: 'Fillers or artificial junk' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-emerald-400 text-2xl font-bold w-16"
                  >
                    {item.value}
                  </span>
                  <span className="text-zinc-500">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-baseline gap-4 mb-10">
              <span className="text-white text-5xl font-black"
              >
                $49.99
              </span>
              <span className="text-zinc-600">/ 30 servings</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: '#00ff88' }}
              whileTap={{ scale: 0.98 }}
              className="px-16 py-5 bg-white text-black text-sm font-bold uppercase tracking-[0.2em] transition-colors"
            >
              Add to Cart
            </motion.button>

            <p className="text-zinc-700 text-sm mt-6">
              Free shipping over $75. 30-day guarantee.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
