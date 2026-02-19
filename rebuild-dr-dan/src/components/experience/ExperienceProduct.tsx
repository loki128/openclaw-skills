'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// 3D floating text
function FloatingText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0, z: -100 }}
      whileInView={{ opacity: 1, z: 0 }}
      transition={{ delay, duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, rotateY: -90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: delay + i * 0.03, duration: 0.4 }}
          className="inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Neon badge
function NeonBadge({ text, color = '#00ff88' }: { text: string; color?: string }) {
  return (
    <motion.div
      className="relative inline-block px-4 py-1"
      style={{
        border: `1px solid ${color}`,
        background: `${color}15`,
        boxShadow: `0 0 15px ${color}30, inset 0 0 10px ${color}10`
      }}
      whileHover={{ 
        boxShadow: `0 0 25px ${color}50, inset 0 0 15px ${color}20`,
        scale: 1.05
      }}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold"
        style={{ color }}
      >
        {text}
      </span>
      <motion.div
        className="absolute inset-0 opacity-0"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: `linear-gradient(90deg, transparent, ${color}30, transparent)`
        }}
      />
    </motion.div>
  );
}

// Price display with glow
function PriceDisplay({ price }: { price: string }) {
  return (
    <motion.div
      className="relative inline-flex items-baseline gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      <motion.span
        className="text-5xl md:text-6xl font-bold text-white"
        style={{ 
          fontFamily: "'Space Grotesk', sans-serif",
          textShadow: '0 0 30px rgba(255,255,255,0.3)'
        }}
        animate={{ 
          textShadow: [
            '0 0 30px rgba(255,255,255,0.3)',
            '0 0 50px rgba(0,255,136,0.4)',
            '0 0 30px rgba(255,255,255,0.3)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {price}
      </motion.span>
    </motion.div>
  );
}

// Feature list with checkmarks
function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="flex items-center gap-3"
        >
          <motion.div
            className="w-5 h-5 flex items-center justify-center border border-[#00ff88]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
          >
            <motion.span 
              className="text-[#00ff88] text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              ✓
            </motion.span>
          </motion.div>
          
          <span className="text-[#888] text-sm">
            {feature.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 + i * 0.01 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function ExperienceProduct() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  return (
    <section className="relative min-h-screen py-32 bg-[#050505] flex items-center overflow-hidden">
      {/* Controlled lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div 
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 60%)'
          }}
        />
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-8 w-full">
        <div 
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Product visual with 3D tilt */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePosition({ x: 0, y: 0 });
            }}
          >
            <motion.div
              className="aspect-square max-w-[500px] mx-auto relative"
              style={{
                rotateX: isHovered ? -mousePosition.y : 0,
                rotateY: isHovered ? mousePosition.x : 0,
                transformStyle: 'preserve-3d'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ 
                  opacity: isHovered ? 0.4 : 0.2,
                  scale: isHovered ? 1.1 : 1
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(0,255,136,0.3) 0%, transparent 70%)',
                  filter: 'blur(60px)'
                }}
              />

              {/* Container */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #111 0%, #0a0a0a 100%)',
                  border: '1px solid #222',
                  boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
                  transform: 'translateZ(20px)'
                }}
              >
                {/* Product representation */}
                <div className="text-center">
                  <motion.div
                    className="w-36 h-56 mx-auto mb-6 relative"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    {/* Tub body */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                        border: '1px solid #2a2a2a',
                        clipPath: 'polygon(15% 0%, 85% 0%, 100% 8%, 100% 92%, 85% 100%, 15% 100%, 0% 92%, 0% 8%)',
                        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
                      }}
                    />
                    
                    {/* Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.span 
                        className="text-[#00ff88] text-xs uppercase tracking-[0.4em] mb-3"
                        style={{ textShadow: '0 0 10px rgba(0,255,136,0.5)' }}
                      >
                        NO BS
                      </motion.span>
                      
                      <motion.span 
                        className="text-white text-2xl font-bold"
                        style={{ 
                          fontFamily: "'Space Grotesk', sans-serif",
                          textShadow: '0 0 20px rgba(255,255,255,0.3)'
                        }}
                      >
                        WHEY
                      </motion.span>
                      
                      <motion.span 
                        className="text-[#444] text-[10px] mt-5 uppercase tracking-wider"
                      >
                        PhD Formulated
                      </motion.span>
                    </div>

                    {/* Side accent */}
                    <div 
                      className="absolute left-0 top-8 bottom-8 w-1"
                      style={{
                        background: 'linear-gradient(180deg, transparent, #00ff88, transparent)'
                      }}
                    />
                  </motion.div>

                  <p className="text-[#333] text-xs tracking-[0.2em]">
                    2LB / 30 SERVINGS
                  </p>
                </div>
              </div>

              {/* Reflection */}
              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-16"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,255,136,0.15), transparent)',
                  filter: 'blur(30px)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badges */}
            <div className="flex items-center gap-3 mb-6">
              <NeonBadge text="PhD Formulated" color="#00ff88" />
              <NeonBadge text="Survivor Approved" color="#ff3333" />
            </div>

            {/* Title */}
            <h2 
              className="text-white mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              <FloatingText text="NO BS WHEY" delay={0.3} />
            </h2>

            {/* Features */}
            <FeatureList features={[
              '25g protein per serving',
              '2.8g leucine for muscle synthesis',
              'Zero fillers or artificial junk',
              'Third-party tested purity'
            ]} />

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-8 mb-8">
              <PriceDisplay price="$49.99" />
              <span className="text-[#444] text-sm">
                / 30 servings
              </span>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 30px rgba(0,255,136,0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              className="relative px-12 py-4 bg-white text-black text-sm uppercase tracking-[0.2em] font-bold overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-[#00ff88]"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-black transition-colors">
                Add to Cart
              </span>
            </motion.button>

            {/* Shipping note */}
            <motion.p 
              className="text-[#333] text-xs mt-6 flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="w-1 h-1 bg-[#00ff88] rounded-full" />
              Free shipping over $75. 30-day guarantee.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
