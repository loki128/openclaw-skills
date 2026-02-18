'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const featuredDrop = {
  name: 'Midnight Pyramid',
  region: 'Egypt',
  description: 'Activated charcoal sponge with 24k gold leaf.',
  price: '$89',
  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
};

export default function CleanDrops() {
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
    <section id="drops" ref={ref} className="py-32 px-6 bg-charcoal/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-gold-400 text-xs uppercase tracking-[0.4em] mb-4"
          >
            Weekly Drop
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl"
          >
            This Week
          </motion.h2>
        </div>

        {/* Single featured drop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20"
        >
          <div className="aspect-square bg-charcoal overflow-hidden"
          >
            <img
              src={featuredDrop.image}
              alt={featuredDrop.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <p className="text-text-muted text-sm uppercase tracking-wider mb-2">{featuredDrop.region}</p>
            <h3 className="font-display text-3xl md:text-4xl mb-4">{featuredDrop.name}</h3>            
            <p className="text-text-secondary mb-6">{featuredDrop.description}</p>
            
            <div className="flex items-center gap-6 mb-8">
              <span className="text-gold-400 text-2xl font-display">{featuredDrop.price}</span>
              <span className="text-text-muted text-sm">Limited to 50</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-10 py-4 bg-gold-400 text-void font-medium uppercase tracking-wider text-sm hover:bg-gold-500 transition-colors"
            >
              Order Now
            </motion.button>
          </div>
        </motion.div>

        {/* Newsletter - simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center pt-16 border-t border-mist/30"
        >
          <p className="text-text-secondary mb-6">Get weekly drop alerts</p>

          {subscribed ? (
            <p className="text-gold-400">You're on the list.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-3 bg-void border border-mist text-white placeholder:text-text-muted focus:border-gold-400 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 border border-gold-400 text-gold-400 uppercase tracking-wider text-sm hover:bg-gold-400 hover:text-void transition-colors"
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
