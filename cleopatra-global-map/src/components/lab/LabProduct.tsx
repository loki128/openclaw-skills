'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function LabProduct() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-32 md:py-48 px-8 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Product Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="aspect-square bg-[#141414] border border-[#2a2a2a] flex items-center justify-center"
          >
            <div className="text-center"
            >
              <div 
                className="w-48 h-64 bg-[#1a1a1a] border border-[#2a2a2a] mx-auto mb-8 flex items-center justify-center"
              >
                <span 
                  className="text-white text-xs uppercase tracking-[0.3em]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  NO BS
                </span>
              </div>              
              <p className="text-[#444] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                2lb / 907g / 30 servings
              </p>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p 
              className="text-[#666] text-xs uppercase tracking-[0.4em] mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              The Formula
            </p>

            <h2 
              className="text-white mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 500,
                lineHeight: '1.1'
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
              25g protein per serving. 2.8g leucine. Zero fillers. 
              Third-party tested. Unflavored or Chocolate.
            </p>

            <div className="flex items-baseline gap-4 mb-8"
            >
              <span 
                className="text-white"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '32px',
                  fontWeight: 500
                }}
              >
                $49.99
              </span>              
              <span className="text-[#666] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                / 30 servings
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-8"
            >
              <span className="text-[#666] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Quantity</span>              
              <div className="flex items-center border border-[#2a2a2a]"
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-[#888] hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  -
                </button>                
                <span 
                  className="px-4 py-2 text-white min-w-[3rem] text-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {quantity}
                </span>                
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-[#888] hover:text-white transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-12 py-4 bg-white text-[#0a0a0a] text-sm uppercase tracking-[0.15em] font-medium hover:bg-[#c9a227] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Add to Formula
            </motion.button>

            <p 
              className="text-[#444] text-xs mt-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Free shipping on orders over $75. Ships within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
