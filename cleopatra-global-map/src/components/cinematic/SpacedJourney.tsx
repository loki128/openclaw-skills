'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { regions } from '@/data/regions';

// Just 3 featured regions - not crowded
const featuredRegions = [
  { id: 'egypt', name: 'Egypt', chapter: '01' },
  { id: 'turkey', name: 'Turkey', chapter: '02' },
  { id: 'france', name: 'France', chapter: '03' },
];

function RegionCard({ region, chapter, index }: { 
  region: typeof regions[0]; 
  chapter: string; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <Link href={`/region/${region.slug}`}>
        {/* Image - proper aspect ratio */}
        <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-charcoal"
        >
          <img
            src={region.desserts[0]?.image}
            alt={region.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
          
          {/* Chapter number */}
          <div className="absolute top-6 left-6"
          >
            <span className="text-5xl font-display text-white/10">{chapter}</span>
          </div>
        </div>
        
        {/* Content - proper spacing */}
        <div style={{ paddingLeft: '4px' }}
        >
          <h3 
            className="font-display text-2xl mb-2 group-hover:text-gold-400 transition-colors"
            style={{ lineHeight: '1.2' }}
          >
            {region.name}
          </h3>          
          
          <p className="text-text-muted text-sm" style={{ lineHeight: '1.6' }}>
            {region.desserts.length} desserts
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SpacedJourney() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section 
      id="journey" 
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
      className="px-5 md:px-8 lg:px-12"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header - centered, reading width */}
        <div ref={headerRef} className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-6"
            style={{ lineHeight: '1.6' }}
          >
            The Journey
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display mb-6"
            style={{ 
              fontSize: 'clamp(28px, 3vw, 52px)',
              lineHeight: '1.15'
            }}
          >
            Three Kingdoms
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-text-secondary mx-auto"
            style={{ 
              fontSize: '17px',
              lineHeight: '1.7',
              maxWidth: '52ch'
            }}
          >
            Explore our featured regions. Each with unique techniques 
            passed down through generations.
          </motion.p>
        </div>

        {/* Grid - 3 columns with proper gap */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {featuredRegions.map((stop, index) => {
            const region = regions.find(r => r.slug === stop.id);
            if (!region) return null;
            
            return (
              <RegionCard
                key={stop.id}
                region={region}
                chapter={stop.chapter}
                index={index}
              />
            );
          })}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link href="/menu">
            <span 
              className="text-gold-400 uppercase tracking-wider text-sm hover:underline"
              style={{ lineHeight: '1.6' }}
            >
              View all eight regions →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
