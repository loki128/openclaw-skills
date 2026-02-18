'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { regions } from '@/data/regions';

// Curated regions for narrative flow
const atelierRegions = [
  { 
    id: 'egypt', 
    position: 'left',
    accent: '#c9a227'
  },
  { 
    id: 'turkey', 
    position: 'right',
    accent: '#c41e3a'
  },
  { 
    id: 'france', 
    position: 'left',
    accent: '#1e40af'
  },
  { 
    id: 'china', 
    position: 'right',
    accent: '#dc2626'
  },
];

function RegionShowcase({ region, position, index }: { 
  region: typeof regions[0]; 
  position: 'left' | 'right';
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const isLeft = position === 'left';
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-32 last:mb-0"
    >
      {/* Image */}
      <div className={`${isLeft ? 'md:order-1' : 'md:order-2'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-[4/5] overflow-hidden bg-[#111]"
        >
          <img
            src={region.desserts[0]?.image}
            alt={region.name}
            className="w-full h-full object-cover"
          />
          
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${region.accentColor}10 0%, transparent 60%)`
            }}
          />
          
          {/* Region number */}
          <div className="absolute top-6 left-6"
          >
            <span 
              className="text-6xl font-light text-white/10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className={`${isLeft ? 'md:order-2' : 'md:order-1'} ${isLeft ? 'md:pl-8' : 'md:pr-8'}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Local name */}
          <p 
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: region.accentColor, lineHeight: '1.6' }}
          >
            {region.nameLocal}
          </p>
          
          {/* Region name */}
          <h2 
            className="text-white mb-5"
            style={{ 
              fontSize: 'clamp(32px, 3.5vw, 56px)',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400
            }}
          >
            {region.name}
          </h2>
          
          {/* Story - concise */}
          <p 
            className="text-[#a3a3a3] mb-8"
            style={{ 
              fontSize: '17px',
              lineHeight: '1.75',
              maxWidth: '38ch',
              letterSpacing: '0.01em'
            }}
          >
            {region.mythicStory}
          </p>
          
          {/* Signature dessert */}
          <div className="pt-6 border-t border-[#2a2a2a]"
          >
            <p className="text-[#666] text-xs uppercase tracking-wider mb-2">Signature</p>
            <p className="text-white text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              {region.desserts[0]?.name}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AtelierRegions() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section 
      id="regions" 
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
      className="px-5 md:px-8 lg:px-12 bg-[#0a0a0f]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-[#8b7355] text-xs uppercase tracking-[0.4em] mb-6"
            style={{ lineHeight: '1.6' }}
          >
            The Kingdoms
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-white"
            style={{ 
              fontSize: 'clamp(28px, 3vw, 52px)',
              lineHeight: '1.15',
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Eight Realms of Mastery
          </motion.h2>
        </div>

        {/* Regions */}
        <div>
          {atelierRegions.map((item, index) => {
            const region = regions.find(r => r.slug === item.id);
            if (!region) return null;
            
            return (
              <RegionShowcase
                key={item.id}
                region={region}
                position={item.position as 'left' | 'right'}
                index={index}
              />
            );
          })}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-24 pt-12 border-t border-[#1a1a1a]"
        >
          <a 
            href="/menu"
            className="inline-flex items-center gap-4 text-[#d4af37] text-sm uppercase tracking-[0.2em] hover:gap-6 transition-all duration-300"
            style={{ lineHeight: '1.6' }}
          >
            <span>Explore all eight kingdoms</span>
            <span className="w-8 h-px bg-[#d4af37]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
