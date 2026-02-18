'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function LabHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNutrient, setHoveredNutrient] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const nutrients = [
    { id: 'protein', label: 'Protein', value: '25g', percent: 85 },
    { id: 'leucine', label: 'Leucine', value: '2.8g', percent: 92 },
    { id: 'bcaa', label: 'BCAAs', value: '5.5g', percent: 78 },
    { id: 'glutamine', label: 'Glutamine', value: '4.2g', percent: 65 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#0a0a0a]"
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
    >
      <motion.div 
        className="max-w-[1200px] mx-auto px-8 w-full"
        style={{ opacity, y }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Typography */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#666] text-xs uppercase tracking-[0.4em] mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Performance Lab
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-white mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(48px, 8vw, 120px)',
                fontWeight: 500,
                lineHeight: '0.95',
                letterSpacing: '-0.03em'
              }}
            >
              NO BS
              <br />
              WHEY.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[#888] mb-12"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                lineHeight: '1.6',
                maxWidth: '45ch'
              }}
            >
              Formulated. Not Marketed.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 border border-white text-white text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-[#0a0a0a] transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View Formula
            </motion.button>
          </div>

          {/* Right: Interactive Nutrition Label */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative"
          >
            <div className="border border-[#2a2a2a] p-8 bg-[#141414]"
            >
              <p 
                className="text-[#666] text-xs uppercase tracking-[0.3em] mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Nutrition Facts
              </p>

              <div className="space-y-4">
                {nutrients.map((nutrient) => (
                  <motion.div
                    key={nutrient.id}
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHoveredNutrient(nutrient.id)}
                    onMouseLeave={() => setHoveredNutrient(null)}
                  >
                    <div className="flex justify-between items-center mb-2"
                    >
                      <span 
                        className="text-white text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {nutrient.label}
                      </span>
                      <span 
                        className="text-[#888] text-sm"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {nutrient.value}
                      </span>
                    </div>
                    
                    <div className="h-1 bg-[#2a2a2a] overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${nutrient.percent}%` }}
                        transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    
                    {hoveredNutrient === nutrient.id && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#666] text-xs mt-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {nutrient.percent}% of daily value
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
