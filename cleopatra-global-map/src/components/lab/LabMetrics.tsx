'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const metrics = [
  { id: 'protein', label: 'Protein Content', value: 92, unit: '%', color: '#ffffff' },
  { id: 'leucine', label: 'Leucine Ratio', value: 11.2, unit: '%', color: '#c9a227' },
  { id: 'mixability', label: 'Mixability', value: 98, unit: '%', color: '#ffffff' },
  { id: 'digestion', label: 'Digestion Rate', value: 85, unit: '%', color: '#888888' },
];

function MetricBar({ metric, index }: { metric: typeof metrics[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: index * 0.15 }}
      className="mb-12"
    >
      <div className="flex justify-between items-baseline mb-4"
      >
        <span 
          className="text-white"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '16px',
            fontWeight: 500
          }}
        >
          {metric.label}
        </span>        
        <span 
          className="text-white"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '24px',
            fontWeight: 300
          }}
        >
          {metric.value}<span className="text-[#666] text-sm ml-1">{metric.unit}</span>
        </span>
      </div>
      
      <div className="h-2 bg-[#1a1a1a] overflow-hidden"
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: metric.color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${Math.min(metric.value, 100)}%` } : {}}
          transition={{ 
            duration: 1.2, 
            delay: 0.3 + index * 0.15,
            ease: [0.16, 1, 0.3, 1]
          }}
        />
      </div>
    </motion.div>
  );
}

export default function LabMetrics() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-32 md:py-48 px-8 bg-[#0a0a0a]">
      <div className="max-w-[800px] mx-auto">
        <div ref={headerRef} className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-[#666] text-xs uppercase tracking-[0.4em] mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Performance Data
          </motion.p>          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-white"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 500,
              lineHeight: '1.1'
            }}
          >
            Lab Results
          </motion.h2>
        </div>

        <div>
          {metrics.map((metric, index) => (
            <MetricBar key={metric.id} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
