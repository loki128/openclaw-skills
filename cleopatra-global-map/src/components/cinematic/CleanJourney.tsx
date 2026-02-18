'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { regions } from '@/data/regions';

// Simplified journey - just 4 key stops
const keyStops = [
  { id: 'egypt', name: 'Egypt', chapter: '01', tagline: 'Where it began' },
  { id: 'turkey', name: 'Turkey', chapter: '02', tagline: 'The crossroads' },
  { id: 'france', name: 'France', chapter: '03', tagline: 'Haute patisserie' },
  { id: 'china', name: 'China', chapter: '04', tagline: 'Ancient craft' },
];

function JourneyCard({ region, chapter, index }: { region: typeof regions[0]; chapter: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/region/${region.slug}`}>
        <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-charcoal"
        >
          <img
            src={region.desserts[0]?.image}
            alt={region.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
          
          <div className="absolute top-4 left-4"
          >
            <span className="text-5xl font-display text-white/20">{chapter}</span>
          </div>
        </div>
        
        <h3 className="font-display text-2xl mb-1 group-hover:text-gold-400 transition-colors">
          {region.name}
        </h3>        
        <p className="text-text-muted text-sm">{region.desserts.length} desserts</p>
      </Link>
    </motion.div>
  );
}

export default function CleanJourney() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="journey" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Clean header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-gold-400 text-xs uppercase tracking-[0.4em] mb-4"
          >
            The Journey
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl mb-6"
          >
            Four Kingdoms
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-md mx-auto"
          >
            From ancient Egypt to the Far East. 
            Click to explore all eight regions.
          </motion.p>
        </div>

        {/* Clean grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {keyStops.map((stop, index) => {
            const region = regions.find(r => r.slug === stop.id);
            if (!region) return null;
            
            return (
              <JourneyCard
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
          className="text-center mt-16"
        >
          <Link href="/menu">
            <span className="text-gold-400 uppercase tracking-wider text-sm hover:underline">
              View all regions →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
