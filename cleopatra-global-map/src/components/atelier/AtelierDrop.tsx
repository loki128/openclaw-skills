'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const weeklyArtifact = {
  name: 'The Midnight Pyramid',
  origin: 'Egypt',
  description: 'Activated charcoal sponge, black sesame buttercream, 24-karat gold leaf.',
  price: '$89',
  edition: 'Edition of 50',
  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
};

export default function AtelierDrop() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section 
      ref={ref} 
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
      className="px-5 md:px-8 lg:px-12 bg-[#050508]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-[#8b7355] text-xs uppercase tracking-[0.4em] mb-6"
            style={{ lineHeight: '1.6' }}
          >
            Weekly Artifact
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-white"
            style={{ 
              fontSize: 'clamp(28px, 3vw, 52px)',
              lineHeight: '1.15',
              fontFamily: "'Playfair Display', serif"
            }}
          >
            This Week's Creation
          </motion.h2>
        </div>

        {/* Featured artifact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20"
        >
          <div className="aspect-[4/5] bg-[#111] overflow-hidden"
          >
            <img
              src={weeklyArtifact.image}
              alt={weeklyArtifact.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <p 
              className="text-[#666] text-xs uppercase tracking-[0.3em] mb-3"
              style={{ lineHeight: '1.6' }}
            >
              {weeklyArtifact.origin}
            </p>            
            <h3 
              className="text-white mb-4"
              style={{ 
                fontSize: 'clamp(28px, 3vw, 48px)',
                lineHeight: '1.15',
                fontFamily: "'Playfair Display', serif"
              }}
            >
              {weeklyArtifact.name}
            </h3>            
            <p 
              className="text-[#a3a3a3] mb-8"
              style={{ 
                fontSize: '16px',
                lineHeight: '1.7',
                maxWidth: '45ch'
              }}
            >
              {weeklyArtifact.description}
            </p>
            
            <div className="flex items-baseline gap-8 mb-10"
            >
              <span 
                className="text-[#d4af37]"
                style={{ 
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  lineHeight: '1',
                  fontFamily: "'Playfair Display', serif"
                }}
              >
                {weeklyArtifact.price}
              </span>
              <span 
                className="text-[#666] text-sm"
                style={{ lineHeight: '1.6' }}
              >
                {weeklyArtifact.edition}
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-[#d4af37] text-[#0a0a0f] text-sm uppercase tracking-[0.15em] font-medium hover:bg-[#c4a028] transition-colors"
              style={{ minHeight: '44px' }}
            >
              Acquire
            </motion.button>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="max-w-md mx-auto text-center pt-16 border-t border-[#1a1a1a]"
        >
          <p 
            className="text-[#666] mb-8"
            style={{ fontSize: '15px', lineHeight: '1.6' }}
          >
            Be notified of new artifacts
          </p>

          {subscribed ? (
            <p className="text-[#d4af37]">You are now on the list.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3 bg-transparent border border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#d4af37] focus:outline-none transition-colors text-sm"
                style={{ minHeight: '44px' }}
              />
              <button
                type="submit"
                className="px-6 py-3 border border-[#d4af37] text-[#d4af37] text-sm uppercase tracking-wider hover:bg-[#d4af37] hover:text-[#0a0a0f] transition-colors"
                style={{ minHeight: '44px' }}
              >
                Join
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
