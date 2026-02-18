'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function TheInvitation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <section 
      ref={ref}
      className="py-32 md:py-48 px-8 bg-[#050505] border-t border-[#1a1a1a]"
    >
      <div className="max-w-[800px] mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[#666] text-xs uppercase tracking-[0.4em] mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The Invitation
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-white mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            lineHeight: '1.2'
          }}
        >
          Acquire the Exceptional
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[#888] mb-16 max-w-md mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            lineHeight: '1.8'
          }}
        >
          Limited editions released weekly. 
          Join the list to be notified of new acquisitions.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {submitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#C9A227]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '24px',
                fontStyle: 'italic'
              }}
            >
              You have been added to the list.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-4 bg-transparent border-b border-[#333] text-white placeholder:text-[#555] focus:border-[#C9A227] focus:outline-none transition-colors text-center sm:text-left"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px'
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 border border-[#C9A227] text-[#C9A227] text-sm uppercase tracking-[0.2em] hover:bg-[#C9A227] hover:text-[#050505] transition-all duration-500"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Request Access
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-12 border-t border-[#1a1a1a]"
        >
          <p 
            className="text-[#444] text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            For private commissions: 
            <a href="mailto:concierge@cleopatradelights.com" className="text-[#666] hover:text-[#C9A227] transition-colors">
              concierge@cleopatradelights.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
