'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const ingredients = [
  {
    id: 'whey',
    name: 'Whey Protein Isolate',
    dosage: '25g',
    source: 'Grass-fed, hormone-free',
    purpose: 'Complete amino acid profile for muscle protein synthesis',
    purity: '92%'
  },
  {
    id: 'leucine',
    name: 'L-Leucine',
    dosage: '2.8g',
    source: 'Fermented, vegan',
    purpose: 'Primary mTOR activator for muscle growth signaling',
    purity: '99%'
  },
  {
    id: 'enzymes',
    name: 'Protease Enzymes',
    dosage: '50mg',
    source: 'Plant-derived',
    purpose: 'Enhanced protein breakdown and absorption',
    purity: '100%'
  },
  {
    id: 'electrolytes',
    name: 'Electrolyte Blend',
    dosage: '300mg',
    source: 'Chelated minerals',
    purpose: 'Hydration support and muscle function',
    purity: '98%'
  },
  {
    id: 'bcaa',
    name: 'BCAA 2:1:1',
    dosage: '5.5g',
    source: 'Fermented',
    purpose: 'Intra-workout energy and recovery',
    purity: '95%'
  },
  {
    id: 'glutamine',
    name: 'L-Glutamine',
    dosage: '4.2g',
    source: 'Fermented, vegan',
    purpose: 'Gut health and immune support',
    purity: '99%'
  }
];

function IngredientPanel({ ingredient, index }: { ingredient: typeof ingredients[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-t border-[#2a2a2a] py-8 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-baseline mb-4"
      >
        <h3 
          className="text-white group-hover:text-[#c9a227] transition-colors duration-300"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(18px, 2vw, 24px)',
            fontWeight: 500
          }}
        >
          {ingredient.name}
        </h3>        
        <span 
          className="text-[#888] text-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {ingredient.dosage}
        </span>
      </div>
      
      <p 
        className="text-[#666] mb-4"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          lineHeight: '1.6',
          maxWidth: '50ch'
        }}
      >
        {ingredient.purpose}
      </p>
      
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isHovered ? 'auto' : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-[#1a1a1a]"
        >
          <div className="grid grid-cols-2 gap-4 text-sm"
          >
            <div>
              <p className="text-[#555] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Source</p>
              <p className="text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>{ingredient.source}</p>
            </div>            
            <div>
              <p className="text-[#555] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Purity</p>
              <p className="text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{ingredient.purity}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function LabIngredients() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-32 md:py-48 px-8 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef} className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-[#666] text-xs uppercase tracking-[0.4em] mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The Breakdown
          </motion.p>          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 500,
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            Ingredient Transparency
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12"
        >
          {ingredients.map((ingredient, index) => (
            <IngredientPanel 
              key={ingredient.id} 
              ingredient={ingredient} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
