'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function DoctorProduct() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="relative min-h-screen py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ duration: 1 }}
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(0,255,136,0.1) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Container */}
            <motion.div
              className="aspect-square max-w-[500px] mx-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(0,255,136,0.1) 0%, transparent 70%)'
                }}
              />

              {/* Product representation */}
              <div className="text-center relative z-10">
                <motion.div
                  className="w-40 h-56 mx-auto mb-6 relative"
                  initial={{ y: 20 }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  {/* Container body */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border border-[#3a3a3a]"
                    style={{
                      clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
                    }}
                  />                  
                  
                  {/* Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span 
                      className="text-[#00ff88] text-xs uppercase tracking-[0.3em] mb-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      NO BS
                    </span>                    
                    <span 
                      className="text-white text-2xl font-bold"
                      style={{ fontFamily: "'Tungsten', sans-serif" }}
                    >
                      WHEY
                    </span>                    
                    <span 
                      className="text-[#666] text-xs mt-4"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      PhD FORMULATED
                    </span>
                  </div>
                </motion.div>

                <p className="text-[#444] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  2LB / 30 SERVINGS / UNFLAVORED
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="flex items-center gap-4 mb-6"
            >
              <span 
                className="px-3 py-1 bg-[#00ff88] text-black text-xs font-bold uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                PhD Formulated
              </span>              
              <span 
                className="px-3 py-1 border border-[#ff4444] text-[#ff4444] text-xs font-bold uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Cancer Survivor Approved
              </span>
            </motion.div>

            <h2 
              className="text-white mb-4"
              style={{
                fontFamily: "'Tungsten', sans-serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700
              }}
            >
              NO BS WHEY
            </h2>

            <p 
              className="text-[#888] mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '1.7',
                maxWidth: '45ch'
              }}
            >
              Formulated by a PhD biochemist who beat cancer. 
              25g protein. 2.8g leucine. Zero fillers. 
              Third-party tested. Because your recovery deserves better.
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span 
                className="text-white text-4xl font-bold"
                style={{ fontFamily: "'Tungsten', sans-serif" }}
              >
                $49.99
              </span>              
              <span className="text-[#666]" style={{ fontFamily: "'Inter', sans-serif" }}>
                / 30 servings
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-[#666] text-sm uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>Qty</span>              
              <div className="flex items-center border border-[#333]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-[#888] hover:text-white transition-colors"
                >-</button>                
                <span className="px-4 py-2 text-white min-w-[3rem] text-center">{quantity}</span>                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-[#888] hover:text-white transition-colors"
                >+</button>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#00ff88" }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-16 py-5 bg-white text-black text-sm uppercase tracking-[0.2em] font-bold transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ADD TO CART
            </motion.button>

            <p className="text-[#444] text-xs mt-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Free shipping over $75. Ships within 24 hours. 30-day guarantee.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
