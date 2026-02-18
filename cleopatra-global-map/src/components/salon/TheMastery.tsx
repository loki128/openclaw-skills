'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const artifacts = [
  {
    name: 'Midnight Pyramid',
    origin: 'Egypt',
    technique: 'Activated charcoal sponge, 24k gold leaf',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
  },
  {
    name: 'Silk Road',
    origin: 'Turkey',
    technique: 'Forty layers of phyllo, pistachio, clarified butter',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800',
  },
  {
    name: 'Imperial Moon',
    origin: 'China',
    technique: 'Lotus paste, salted egg yolk, hand-pressed mold',
    image: 'https://images.unsplash.com/photo-1631160299919-6a175aa6d189?w=800',
  },
];

function Artifact({ item, index }: { item: typeof artifacts[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group"
    >
      {/* Image on pedestal */}
      <motion.div 
        className="relative aspect-square mb-8 overflow-hidden bg-[#0a0a0a]"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* Pedestal effect */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
          }}
        />
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-px bg-[#C9A227]/30" />
        <div className="absolute top-4 left-4 w-px h-8 bg-[#C9A227]/30" />
        <div className="absolute top-4 right-4 w-8 h-px bg-[#C9A227]/30" />
        <div className="absolute top-4 right-4 w-px h-8 bg-[#C9A227]/30" />
      </motion.div>

      {/* Details */}
      <div className="space-y-2">
        <p 
          className="text-[#666] text-xs uppercase tracking-[0.3em]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {item.origin}
        </p>        
        <h3 
          className="text-white group-hover:text-[#C9A227] transition-colors duration-500"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            lineHeight: '1.2'
          }}
        >
          {item.name}
        </h3>        
        <p 
          className="text-[#666] text-sm max-w-xs"
          style={{
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.7'
          }}
        >
          {item.technique}
        </p>
      </div>
    </motion.div>
  );
}

export default function TheMastery() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-32 md:py-48 px-8 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-[#666] text-xs uppercase tracking-[0.4em] mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The Mastery
          </motion.p>          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 300,
              lineHeight: '1.2'
            }}
          >
            Crafted with techniques passed down through generations
          </motion.h2>
        </div>

        {/* Artifacts grid - asymmetric */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {artifacts.map((item, index) => (
            <Artifact key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
