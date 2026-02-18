'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function DoctorDiagnosis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heartbeat, setHeartbeat] = useState(60);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Heartbeat effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(prev => prev === 60 ? 120 : 60);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const textLines = [
    { text: "DIAGNOSIS:", delay: 0.5, color: "#ff3333" },
    { text: "STAGE 3", delay: 1.2, color: "#ffffff" },
    { text: "PROGNOSIS:", delay: 2.0, color: "#ff3333" },
    { text: "UNKNOWN", delay: 2.8, color: "#ffffff" },
    { text: "RESPONSE:", delay: 4.0, color: "#00ff88" },
    { text: "FIGHT", delay: 4.8, color: "#00ff88" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[200vh] bg-[#0a0a0a]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* EKG Background */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-10"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50% L20%,50% L25%,50% L30%,20% L35%,80% L40%,50% L100%,50%"
            fill="none"
            stroke="#ff3333"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Heart rate monitor */}
        <div className="absolute top-8 right-8 flex items-center gap-4"
        >
          <span className="text-[#ff3333] font-mono text-sm">BPM</span>
          <motion.span 
            className="text-white font-mono text-2xl"
            animate={{ 
              color: heartbeat > 80 ? "#ff3333" : "#00ff88",
              scale: heartbeat > 80 ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {heartbeat}
          </motion.span>
        </div>

        {/* Main content */}
        <motion.div 
          className="text-center z-10 px-8"
          style={{ opacity, scale }}
        >
          {textLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ 
                delay: line.delay,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="mb-4"
            >
              <span
                style={{
                  fontFamily: "'Tungsten', 'Impact', sans-serif",
                  fontSize: 'clamp(48px, 12vw, 160px)',
                  fontWeight: 700,
                  color: line.color,
                  letterSpacing: '0.05em',
                  textShadow: line.color === "#00ff88" ? "0 0 40px rgba(0,255,136,0.5)" : "none"
                }}
              >
                {line.text}
              </span>
            </motion.div>
          ))}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#666] text-sm uppercase tracking-[0.3em]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Continue to Lab
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 50%, rgba(255,51,51,0.03) 50%)",
            backgroundSize: "100% 4px"
          }}
        />
      </div>
    </section>
  );
}
