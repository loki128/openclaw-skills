'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExperienceMolecule() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 375]);

  // Generate amino acid chain positions
  const aminoAcids = Array.from({ length: 20 }, (_, i) => {
    const t = i / 19;
    const x = Math.sin(t * Math.PI * 4) * 120;
    const y = Math.cos(t * Math.PI * 3) * 80;
    const z = Math.sin(t * Math.PI * 2) * 60;
    return { x, y, z, id: i };
  });

  return (
    <section 
      ref={containerRef}
      className="h-[200vh] bg-[#050505] relative"
    >
      <motion.div 
        className="sticky top-0 h-screen flex items-center px-16"
        style={{ opacity }}
      >
        <div className="w-1/3">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#00ff88] text-xs uppercase tracking-[0.5em] mb-8"
          >
            The Science
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white mb-8"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(48px, 6vw, 80px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}
          >
            Molecular
            <br />
            Precision.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#555] text-lg max-w-[40ch] leading-relaxed"
          >
            Cold-processed microfiltration preserves delicate protein 
            fractions for rapid absorption.
          </motion.p>
        </div>

        <div className="absolute right-16 top-1/2 -translate-y-1/2 w-[500px] h-[500px]"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="w-full h-full relative"
            style={{ 
              rotateY,
              rotateX,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Central alpha helix structure */}
            {aminoAcids.map((aa, index) => (
              <motion.div
                key={aa.id}
                className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: index % 3 === 0 ? '#00ff88' : index % 3 === 1 ? '#4488ff' : '#ffffff',
                  boxShadow: `0 0 15px ${index % 3 === 0 ? '#00ff88' : index % 3 === 1 ? '#4488ff' : '#ffffff'}50`,
                  transform: `translate3d(${aa.x}px, ${aa.y}px, ${aa.z}px)`
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
              />
            ))}

            {/* Connecting bonds */}
            {aminoAcids.slice(0, -1).map((aa, index) => {
              const next = aminoAcids[index + 1];
              const midX = (aa.x + next.x) / 2;
              const midY = (aa.y + next.y) / 2;
              const midZ = (aa.z + next.z) / 2;
              const length = Math.sqrt(
                Math.pow(next.x - aa.x, 2) + 
                Math.pow(next.y - aa.y, 2) + 
                Math.pow(next.z - aa.z, 2)
              );
              const angleY = Math.atan2(next.x - aa.x, next.z - aa.z);
              const angleX = Math.atan2(next.y - aa.y, Math.sqrt(Math.pow(next.x - aa.x, 2) + Math.pow(next.z - aa.z, 2)));
              
              return (
                <motion.div
                  key={`bond-${index}`}
                  className="absolute top-1/2 left-1/2 h-0.5 bg-[#333] origin-left"
                  style={{
                    width: length,
                    transform: `translate3d(${aa.x}px, ${aa.y}px, ${aa.z}px) rotateY(${angleY}rad) rotateX(${-angleX}rad)`
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                />
              );
            })}

            {/* Hydrogen bonds (alpha helix characteristic) */}
            {aminoAcids.slice(0, -4).map((aa, index) => {
              const partner = aminoAcids[index + 4];
              if (!partner) return null;
              
              return (
                <motion.div
                  key={`h-bond-${index}`}
                  className="absolute top-1/2 left-1/2 h-px origin-left"
                  style={{
                    width: 60,
                    background: 'linear-gradient(90deg, transparent, #00ff8830, transparent)',
                    transform: `translate3d(${aa.x}px, ${aa.y}px, ${aa.z}px) rotateY(${Math.atan2(partner.x - aa.x, partner.z - aa.z)}rad)`
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.03 }}
                />
              );
            })}

            {/* Outer glow sphere */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)'
              }}
            />

            {/* Stats floating around */}
            {[
              { label: '92%', sub: 'Protein', pos: { x: 200, y: -150, z: 50 } },
              { label: '2.8g', sub: 'Leucine', pos: { x: 220, y: 0, z: -30 } },
              { label: '98%', sub: 'Digestibility', pos: { x: 200, y: 150, z: 40 } },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="absolute text-center"
                style={{
                  transform: `translate3d(${stat.pos.x}px, ${stat.pos.y}px, ${stat.pos.z}px)`
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + index * 0.2 }}
              >
                <p className="text-[#00ff88] text-2xl font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.label}
                </p>
                <p className="text-[#444] text-xs uppercase tracking-wider"
                >
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
