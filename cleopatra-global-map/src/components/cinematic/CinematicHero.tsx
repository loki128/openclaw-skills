'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

// Floating particles component
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
    }));
    setParticles(newParticles);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gold-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Mouse follower glow
function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  return (
    <motion.div
      className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0 opacity-20"
      style={{
        x: useTransform(x, (val) => val - 300),
        y: useTransform(y, (val) => val - 300),
        background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />
  );
}

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <MouseGlow />
      
      {/* Cinematic Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        {/* Deep gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-charcoal to-void" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 via-transparent to-transparent" />
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212,175,55,0.15), transparent),
              radial-gradient(ellipse 60% 40% at 80% 80%, rgba(180,140,30,0.1), transparent)
            `,
          }}
        />
        
        {/* Rich texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* Cinematic vignette */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,0.4) 70%, rgba(5,5,5,0.8) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity }}
      >
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mb-8"
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold-400 text-xs md:text-sm uppercase tracking-[0.4em] mb-6 font-medium"
        >
          From the Pyramids to the World
        </motion.p>

        {/* Main Headline with character animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-display text-center mb-8"
        >
          <motion.span 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block text-5xl md:text-7xl lg:text-9xl text-white leading-[0.9] tracking-tight"
          >
            CLEOPATRA
          </motion.span>
          <motion.span 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="block text-4xl md:text-6xl lg:text-8xl mt-2"
            style={{ 
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4E4BC 50%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DELIGHTS
          </motion.span>
        </motion.h1>

        {/* Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl text-center mb-12 leading-relaxed"
        >
          We mastered sweets across continents. 
          <span className="text-white">Eight culinary kingdoms.</span>
          <br className="hidden md:block" />
          One extraordinary journey.
        </motion.p>

        {/* CTA Buttons with enhanced hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="#journey">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-gold-400 text-void font-semibold uppercase tracking-wider text-sm overflow-hidden"
            >
              <span className="relative z-10">Begin the Journey</span>
              <motion.div
                className="absolute inset-0 bg-gold-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
          
          <Link href="#drops">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#D4AF37',
                color: '#D4AF37',
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-mist text-white font-semibold uppercase tracking-wider text-sm transition-all duration-300"
            >
              This Week's Drops
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-32 left-0 right-0 flex justify-center gap-12 md:gap-24"
        >
          {[
            { value: '8', label: 'Kingdoms' },
            { value: '40+', label: 'Desserts' },
            { value: '∞', label: 'Delight' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-3xl md:text-4xl text-gold-400">{stat.value}</div>
              <div className="text-text-muted text-xs uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-text-muted text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-gold-400 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
