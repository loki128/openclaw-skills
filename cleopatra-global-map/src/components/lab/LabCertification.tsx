'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const certifications = [
  { id: 'nsf', name: 'NSF Certified', batch: 'NSF-2024-0847', date: '2024-02-15' },
  { id: 'informed', name: 'Informed Sport', batch: 'IS-2024-1241', date: '2024-02-10' },
  { id: 'gmp', name: 'GMP Facility', batch: 'GMP-2024-0092', date: '2024-02-01' },
];

export default function LabCertification() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-48 px-8 bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="max-w-[1200px] mx-auto">
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#666] text-xs uppercase tracking-[0.4em] mb-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Purity & Testing
          </motion.p>          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-white mb-16"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 500,
              lineHeight: '1.1'
            }}
          >
            Batch Certification
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="border border-[#2a2a2a] p-8 bg-[#141414]"
              >
                <div className="w-16 h-16 border border-[#2a2a2a] flex items-center justify-center mb-6"
                >
                  <span className="text-[#c9a227] text-xs font-bold">✓</span>
                </div>                
                <h3 
                  className="text-white mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '20px',
                    fontWeight: 500
                  }}
                >
                  {cert.name}
                </h3>                
                <div className="space-y-2 text-sm"
                >
                  <div className="flex justify-between"
                  >
                    <span className="text-[#555]" style={{ fontFamily: "'Inter', sans-serif" }}>Batch</span>
                    <span className="text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>{cert.batch}</span>
                  </div>                  
                  <div className="flex justify-between"
                  >
                    <span className="text-[#555]" style={{ fontFamily: "'Inter', sans-serif" }}>Tested</span>
                    <span className="text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
