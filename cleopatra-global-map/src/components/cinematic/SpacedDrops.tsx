'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const featuredDrop = {
  name: 'Midnight Pyramid',
  region: 'Egypt',
  description: 'Activated charcoal sponge with 24k gold leaf. Limited to 50 pieces.',
  price: '$89',
  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
};

export default function SpacedDrops() {
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
      id="drops" 
      ref={ref} 
      style={{ paddingTop: '120px', paddingBottom: '120px' }}
      className="px-5 md:px-8 lg:px-12 bg-charcoal/20"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-gold-400 text-sm uppercase tracking-[0.3em] mb-6"
            style={{ lineHeight: '1.6' }}
          >
            Weekly Drop
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display"
            style={{ 
              fontSize: 'clamp(28px, 3vw, 52px)',
              lineHeight: '1.15'
            }}
          >
            This Week
          </motion.h2>
        </div>

        {/* Featured drop - 2 column with generous gap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24"
        >
          <div className="aspect-square bg-charcoal overflow-hidden"
          >
            <img
              src={featuredDrop.image}
              alt={featuredDrop.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div style={{ padding: '8px 0' }}
          >
            <p 
              className="text-text-muted text-sm uppercase tracking-wider mb-3"
              style={{ lineHeight: '1.6' }}
            >
              {featuredDrop.region}
            </p>
            
            <h3 
              className="font-display text-3xl md:text-4xl mb-6"
              style={{ lineHeight: '1.15' }}
            >
              {featuredDrop.name}
            </h3>            
            
            <p 
              className="text-text-secondary mb-8"
              style={{ 
                fontSize: '17px',
                lineHeight: '1.7',
                maxWidth: '45ch'
              }}
            >
              {featuredDrop.description}
            </p>
            
            <div className="flex items-center gap-8 mb-10"
            >
              <span 
                className="text-gold-400 font-display text-3xl"
                style={{ lineHeight: '1' }}
              >
                {featuredDrop.price}
              </span>
              <span 
                className="text-text-muted text-sm"
                style={{ lineHeight: '1.6' }}
              >
                Limited to 50
              </span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-4 bg-gold-400 text-void font-medium uppercase tracking-wider text-sm hover:bg-gold-500 transition-colors"
              style={{ minHeight: '44px' }}
            >
              Order Now
            </motion.button>
          </div>
        </motion.div>

        {/* Newsletter - clean, spacious */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center pt-16 border-t border-mist/30"
        >
          <p 
            className="text-text-secondary mb-8"
            style={{ 
              fontSize: '17px',
              lineHeight: '1.7'
            }}
          >
            Get weekly drop alerts
          </p>

          {subscribed ? (
            <p className="text-gold-400 text-lg">You're on the list.</p>
          ) : (
            <form 
              onSubmit={handleSubscribe} 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-4 bg-void border border-mist text-white placeholder:text-text-muted focus:border-gold-400 focus:outline-none transition-colors"
                style={{ 
                  fontSize: '16px',
                  lineHeight: '1.5',
                  minHeight: '44px'
                }}
              />
              <button
                type="submit"
                className="px-8 py-4 border border-gold-400 text-gold-400 uppercase tracking-wider text-sm hover:bg-gold-400 hover:text-void transition-colors"
                style={{ minHeight: '44px' }}
              >
                Subscribe
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
