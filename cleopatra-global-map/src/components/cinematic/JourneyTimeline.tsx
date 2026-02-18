'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { journeyRoute } from '@/lib/tokens';
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
      initial={{ opacity: 0, x: isEven ? -80 : 80 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-32 last:mb-0`}
    >
      {/* Image Side */}
      <div className={`relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          {/* Main Image */}
          <div className="absolute inset-0 bg-charcoal overflow-hidden"
          >
            <motion.img
              src={region.desserts[0]?.image || 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800'}
              alt={region.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1, rotateY: isEven ? 3 : -3 }}
              transition={{ duration: 0.7 }}
            />
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-70" />
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${region.accentColor}20 0%, transparent 50%)`,
            }}
          />
          
          {/* Chapter number - large watermark */}
          <div className="absolute top-4 left-4"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-7xl md:text-9xl font-display font-bold"
              style={{ color: region.accentColor }}
            >
              {String(chapter).padStart(2, '0')}
            </motion.span>
          </div>
          
          {/* Hover border with region color */}
          <div 
            className="absolute inset-0 border-2 border-transparent group-hover:border-opacity-100 transition-all duration-500 pointer-events-none"
            style={{ borderColor: `${region.accentColor}50` }}
          />
          
          {/* Corner accent */}
          <div 
            className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${region.accentColor}30 50%)`,
            }}
          />
        </motion.div>
      </div>

      {/* Content Side */}
      <div className={`${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={isEven ? 'md:pl-8' : 'md:pr-8'}
        >
          {/* Region name in local script */}
          <motion.p 
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm uppercase tracking-[0.3em] mb-2 font-medium"
            style={{ color: region.accentColor }}
          >
            {region.nameLocal}
          </motion.p>
          
          {/* Region name */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-4xl md:text-6xl mb-4"
          >
            {region.name}
          </motion.h2>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gold-400 text-lg mb-4 italic font-light"
          >
            "{journeyRoute.find(r => r.id === region.slug)?.tagline}"
          </motion.p>
          
          {/* Story */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-text-secondary mb-6 leading-relaxed"
          >
            {region.mythicStory}
          </motion.p>
          
          {/* Flavor profile */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {region.flavorProfile.slice(0, 4).map((flavor, i) => (
              <motion.span
                key={flavor}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="px-3 py-1 text-xs border rounded-sm transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: `${region.accentColor}40`,
                  color: region.accentColor,
                }}
              >
                {flavor}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Signature sweets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-8"
          >
            <p className="text-text-muted text-xs uppercase tracking-widest mb-3">Signature Desserts</p>
            <div className="flex flex-wrap gap-3">
              {region.desserts.slice(0, 3).map((dessert, i) => (
                <motion.div
                  key={dessert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: region.accentColor }}
                  />
                  {dessert.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <Link href={`/region/${region.slug}`}>
              <motion.button
                whileHover={{ x: isEven ? 8 : -8, color: region.accentColor }}
                className="group inline-flex items-center gap-3 text-white uppercase tracking-wider text-sm font-semibold transition-colors"
              >
                <span>Explore {region.name}</span>
                <motion.span 
                  className="text-lg"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isEven ? '→' : '←'}
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline connector dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 hidden md:block z-10"
        style={{ 
          borderColor: region.accentColor,
          backgroundColor: '#050505',
        }}
      />
    </motion.div>
  );
}

export default function JourneyTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ['0%', '100%']);

  return (
    <section 
      id="journey"
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-charcoal/30 to-void" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-16 h-px bg-gold-400 mx-auto mb-6"
          />
          
          <p className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-4 font-medium">The Route</p>
          
          <h2 className="font-display text-5xl md:text-7xl mb-6">
            The Journey
          </h2>
          
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            From ancient Egypt through the Silk Road, across the Mediterranean, 
            over the Great Wall, to the New World. <span className="text-white">A culinary expedition spanning millennia.</span>
          </p>
        </motion.div>
      </div>

      {/* Animated Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
      >
        {/* Background line */}
        <div className="absolute inset-0 bg-mist/30" />
        
        {/* Animated progress line */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-400 via-gold-400/50 to-transparent"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Journey Stops */}
      <div className="max-w-6xl mx-auto relative z-10"
      >
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mt-24 pt-16 border-t border-mist/30 relative z-10"
      >
        <p className="text-text-muted text-sm uppercase tracking-widest mb-6">More Destinations Coming Soon</p>
        <div className="flex flex-wrap justify-center gap-3"
        >
          {['Japan', 'India', 'Mexico', 'Morocco', 'Thailand'].map((country, i) => (
            <motion.span 
              key={country}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-4 py-2 border border-mist text-text-muted text-sm hover:border-gold-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {country}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
