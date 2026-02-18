'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { regions } from '@/data/regions';

const regionRooms = [
  { id: 'egypt', mood: 'warm', temperature: '#C9A227', subtitle: 'Sacred' },
  { id: 'france', mood: 'elegant', temperature: '#C0C0C0', subtitle: 'Refined' },
  { id: 'italy', mood: 'rich', temperature: '#8B4513', subtitle: 'Sensual' },
  { id: 'china', mood: 'calm', temperature: '#2F4F4F', subtitle: 'Refined' },
  { id: 'america', mood: 'bold', temperature: '#4682B4', subtitle: 'Modern' },
];

function RegionRoom({ region, index, total }: { 
  region: typeof regions[0]; 
  index: number;
  total: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  const roomConfig = regionRooms.find(r => r.id === region.slug) || regionRooms[0];

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center py-32"
      style={{ 
        background: `
          linear-gradient(180deg, #050505 0%, ${roomConfig.temperature}08 50%, #050505 100%)
        `
      }}
    >
      <motion.div 
        className="max-w-[1400px] mx-auto px-8 md:px-16 w-full"
        style={{ y, opacity, scale }}
      >
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Number - massive */}
          <div className="md:col-span-2">
            <span 
              className="text-white/5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(120px, 20vw, 300px)',
                fontWeight: 300,
                lineHeight: '0.8'
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Content */}
          <div className="md:col-span-5">
            <p 
              className="text-xs uppercase tracking-[0.4em] mb-4"
              style={{ 
                color: roomConfig.temperature,
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {region.nameLocal}
            </p>
            
            <h2 
              className="text-white mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 300,
                lineHeight: '1',
                letterSpacing: '-0.02em'
              }}
            >
              {region.name}
            </h2>            
            
            <p 
              className="text-[#C9A227] mb-6 italic"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(20px, 2vw, 28px)',
                fontWeight: 400
              }}
            >
              {roomConfig.subtitle}
            </p>            
            
            <p 
              className="text-[#888] mb-8 max-w-md"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                lineHeight: '1.8'
              }}
            >
              {region.mythicStory}
            </p>
            
            <div className="space-y-2">
              {region.desserts.slice(0, 2).map((dessert) => (
                <p 
                  key={dessert.id}
                  className="text-white/60 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {dessert.name}
                </p>
              ))}
            </div>
          </div>

          {/* Image - treated as art */}
          <div className="md:col-span-5">
            <motion.div 
              className="relative aspect-[3/4] overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.img
                src={region.desserts[0]?.image}
                alt={region.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
              
              {/* Subtle overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${roomConfig.temperature}15 0%, transparent 60%)`
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default function TheJourney() {
  return (
    <div className="relative bg-[#050505]">
      {/* Section header */}
      <section className="py-32 px-8 text-center">
        <p 
          className="text-[#666] text-xs uppercase tracking-[0.4em] mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The Journey
        </p>
        
        <h2 
          className="text-white max-w-3xl mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            lineHeight: '1.2',
            fontStyle: 'italic'
          }}
        >
          Eight kingdoms. Eight traditions. One pursuit of perfection.
        </h2>
      </section>

      {/* Region rooms */}
      <div>
        {regionRooms.map((room, index) => {
          const region = regions.find(r => r.slug === room.id);
          if (!region) return null;
          
          return (
            <RegionRoom
              key={room.id}
              region={region}
              index={index}
              total={regionRooms.length}
            />
          );
        })}
      </div>
    </div>
  );
}
