'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { journeyRoute, tokens } from '@/lib/tokens';
import { regions } from '@/data/regions';

interface JourneyStopProps {
  region: typeof regions[0];
  chapter: number;
  isEven: boolean;
  index: number;
}

function JourneyStop({ region, chapter, isEven, index }: JourneyStopProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-32 ${
        isEven ? '' : 'md:direction-rtl'
      }`}
    >
      {/* Image Side */}
      <div className={`relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.div
          whileHover={{ scale: 1.02, rotateY: isEven ? 2 : -2 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          {/* Image */}
          <div className="absolute inset-0 bg-charcoal">
            <img
              src={region.desserts[0]?.image || 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800'}
              alt={region.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
          
          {/* Chapter number */}
          <div className="absolute top-4 left-4">
            <span 
              className="text-6xl md:text-8xl font-display opacity-30"
              style={{ color: region.accentColor }}
            >
              {String(chapter).padStart(2, '0')}
            </span>
          </div>
          
          {/* Hover border effect */}
          <div 
            className="absolute inset-0 border-2 border-transparent transition-colors duration-300 group-hover:border-gold-400/50"
          />
        </motion.div>
      </div>

      {/* Content Side */}
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'} ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Region name in local script */}
          <p 
            className="text-sm uppercase tracking-[0.3em] mb-2"
            style={{ color: region.accentColor }}
          >
            {region.nameLocal}
          </p>
          
          {/* Region name */}
          <h2 className="font-display text-4xl md:text-6xl mb-4">
            {region.name}
          </h2>
          
          {/* Tagline */}
          <p className="text-gold-400 text-lg mb-4 italic">
            "{journeyRoute.find(r => r.id === region.slug)?.tagline}"
          </p>
          
          {/* Story */}
          <p className="text-text-secondary mb-6 leading-relaxed">
            {region.mythicStory}
          </p>
          
          {/* Signature sweets */}
          <div className={`flex flex-wrap gap-2 mb-8 ${isEven ? '' : 'md:justify-end'}`}>
            {region.desserts.slice(0, 3).map((dessert) => (
              <span
                key={dessert.id}
                className="px-3 py-1 text-xs border rounded-sm transition-colors hover:border-gold-400 hover:text-gold-400"
                style={{ 
                  borderColor: `${region.accentColor}40`,
                  color: region.accentColor,
                }}
              >
                {dessert.name}
              </span>
            ))}
          </div>
          
          {/* CTA */}
          <Link href={`/region/${region.slug}`}>
            <motion.button
              whileHover={{ x: isEven ? 5 : -5 }}
              className="group inline-flex items-center gap-2 text-gold-400 uppercase tracking-wider text-sm font-semibold"
            >
              <span>Explore {region.name}</span>
              <span className={`transition-transform group-hover:${isEven ? 'translate-x-1' : '-translate-x-1'}`}>
                {isEven ? '→' : '←'}
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Connecting line (except for last item) */}
      {index < journeyRoute.length - 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full w-px h-16 bg-gradient-to-b from-gold-400/50 to-transparent hidden md:block" />
      )}
    </motion.div>
  );
}

export default function JourneyTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section 
      id="journey"
      ref={containerRef}
      className="relative py-32 px-6"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-4">The Route</p>
          
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            The Journey
          </h2>
          
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From ancient Egypt through the Silk Road, across the Mediterranean, 
            over the Great Wall, to the New World. A culinary expedition spanning millennia.
          </p>
        </motion.div>
      </div>

      {/* Animated Path Line (Background) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block">
        <motion.div
          className="w-full bg-gradient-to-b from-gold-400 via-gold-400/50 to-transparent"
          style={{ 
            height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
            opacity: 0.3
          }}
        />
      </div>

      {/* Journey Stops */}
      <div className="max-w-6xl mx-auto relative">
        {journeyRoute.map((stop, index) => {
          const region = regions.find(r => r.slug === stop.id);
          if (!region) return null;
          
          return (
            <JourneyStop
              key={stop.id}
              region={region}
              chapter={stop.chapter}
              isEven={index % 2 === 0}
              index={index}
            />
          );
        })}
      </div>

      {/* More to come teaser */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mt-16 pt-16 border-t border-mist"
      >
        <p className="text-text-muted text-sm uppercase tracking-widest mb-4">More Destinations Coming</p>
        <div className="flex justify-center gap-4">
          {['Japan', 'India', 'Mexico', 'Morocco'].map((country) => (
            <span 
              key={country}
              className="px-4 py-2 border border-mist text-text-muted text-sm"
            >
              {country}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
