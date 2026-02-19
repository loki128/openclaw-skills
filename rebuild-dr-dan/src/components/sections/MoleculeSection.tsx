'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function MoleculeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  // Generate helix structure
  const helixPoints = Array.from({ length: 24 }, (_, i) => {
    const t = i / 23;
    const angle = t * Math.PI * 8; // 4 full rotations
    const radius = 80;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (t - 0.5) * 300;
    return { x, y, z, angle, t, id: i };
  });

  return (
    <section 
      ref={containerRef}
      className="relative h-[250vh] bg-black"
    >
      <motion.div 
        className="sticky top-0 h-screen flex items-center overflow-hidden"
      >
        <div className="w-full px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="relative w-[400px] h-[400px]"
                style={{
                  rotateY,
                  rotateX,
                  scale,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Helix backbone */}
                {helixPoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate3d(${point.x}px, ${point.y}px, ${point.z}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02, type: "spring" }}
                  >
                    {/* Amino acid sphere */}
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{
                        background: index % 2 === 0 
                          ? 'radial-gradient(circle at 30% 30%, #00ff88, #00aa55)' 
                          : 'radial-gradient(circle at 30% 30%, #4488ff, #2255aa)',
                        boxShadow: `0 0 20px ${index % 2 === 0 ? '#00ff8860' : '#4488ff60'}`
                      }}
                    />
                  </motion.div>
                ))}

                {/* Side chains */}
                {helixPoints.map((point, index) => {
                  if (index % 3 !== 0) return null;
                  const sideChainLength = 40 + Math.random() * 30;
                  const sideAngle = point.angle + Math.PI / 2;
                  
                  return (
                    <motion.div
                      key={`side-${point.id}`}
                      className="absolute left-1/2 top-1/2 h-0.5 origin-left"
                      style={{
                        width: sideChainLength,
                        background: 'linear-gradient(90deg, #00ff88, transparent)',
                        transform: `translate3d(${point.x}px, ${point.y}px, ${point.z}px) rotateZ(${sideAngle}rad)`,
                        opacity: 0.6
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.02 }}
                    />
                  );
                })}

                {/* Hydrogen bonds (characteristic of alpha helix) */}
                {helixPoints.slice(0, -4).map((point, index) => {
                  const partner = helixPoints[index + 4];
                  if (!partner) return null;
                  
                  const midX = (point.x + partner.x) / 2;
                  const midY = (point.y + partner.y) / 2;
                  const midZ = (point.z + partner.z) / 2;
                  
                  return (
                    <motion.div
                      key={`h-bond-${index}`}
                      className="absolute left-1/2 top-1/2 w-px h-px"
                      style={{
                        transform: `translate3d(${midX}px, ${midY}px, ${midZ}px)`
                      }}
                    >
                      <div 
                        className="w-16 h-px -translate-x-1/2 -translate-y-1/2"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transform: `rotateZ(${Math.atan2(partner.y - point.y, partner.x - point.x)}rad)`
                        }}
                      />
                    </motion.div>
                  );
                })}

                {/* Outer glow */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 60%)'
                  }}
                />
              </motion.div>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-emerald-400 text-sm tracking-[0.4em] uppercase mb-6"
              >
                The Science
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white font-black mb-8"
                style={{
                  fontSize: 'clamp(48px, 8vw, 100px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.03em'
                }}
              >
                ALPHA
                <br />
                <span className="text-emerald-500">HELIX.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-zinc-400 text-lg leading-relaxed"
                >
                  Cold-processed microfiltration preserves the delicate 
                  alpha-helix structures that trigger rapid muscle protein synthesis.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  {[
                    { value: '92%', label: 'Protein', color: '#00ff88' },
                    { value: '2.8g', label: 'Leucine', color: '#4488ff' },
                    { value: '98%', label: 'Digestibility', color: '#00ff88' },
                    { value: '5.5g', label: 'BCAAs', color: '#4488ff' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="border-l-2 border-zinc-800 pl-4"
                    >
                      <p 
                        className="text-3xl font-black"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-zinc-600 text-sm uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
