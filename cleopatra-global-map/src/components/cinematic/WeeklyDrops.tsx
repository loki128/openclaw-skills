'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { regions } from '@/data/regions';

const weeklyDrops = [
  {
    id: 'drop-1',
    name: 'Midnight Pyramid',
    region: 'Egypt',
    description: 'Activated charcoal sponge with gold leaf. Limited to 50 pieces.',
    price: '$89',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    tags: ['Limited', 'Signature'],
    stock: 12,
  },
  {
    id: 'drop-2',
    name: 'Silk Road Collection',
    region: 'Turkey',
    description: 'Assorted baklava with pistachio, walnut, and honey varieties.',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600',
    tags: ['New', 'Assorted'],
    stock: 8,
  },
  {
    id: 'drop-3',
    name: 'Emperor\'s Mooncake',
    region: 'China',
    description: 'Lotus paste with salted egg yolk. Traditional craftsmanship.',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1631160299919-6a175aa6d189?w=600',
    tags: ['Seasonal', 'Traditional'],
    stock: 3,
  },
];

export default function WeeklyDrops() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    <section id="drops" ref={ref} className="relative py-32 px-6 bg-charcoal/30">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/30 mb-6">
            <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></span>
            <span className="text-gold-400 text-xs uppercase tracking-widest">This Week's Drops</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            Limited Drops
          </h2>
          
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Fresh from our kitchens. Once they're gone, they're gone. 
            New drops every Friday at midnight.
          </p>
        </motion.div>

        {/* Drops Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {weeklyDrops.map((drop, index) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative bg-void border border-mist overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={drop.image}
                  alt={drop.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                
                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {drop.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gold-400 text-void text-xs font-bold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Stock indicator */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-text-muted">Remaining</span>
                    <span className={drop.stock <= 5 ? 'text-red-500' : 'text-gold-400'}>
                      {drop.stock} left
                    </span>
                  </div>
                  <div className="h-1 bg-mist overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${(drop.stock / 20) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      className={`h-full ${drop.stock <= 5 ? 'bg-red-500' : 'bg-gold-400'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-text-muted text-xs uppercase tracking-wider mb-2">{drop.region}</p>
                <h3 className="font-display text-2xl mb-2 group-hover:text-gold-400 transition-colors">
                  {drop.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">{drop.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gold-400 font-display text-2xl">{drop.price}</span>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gold-400 text-void text-sm font-semibold uppercase tracking-wider hover:bg-gold-500 transition-colors"
                  >
                    Order
                  </motion.button>
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/30 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-center p-8 border border-mist bg-charcoal/50"
        >
          <h3 className="font-display text-3xl mb-4">Never Miss a Drop</h3>
          
          <p className="text-text-secondary mb-6">
            Get weekly alerts for new drops, exclusive items, and behind-the-scenes content.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-gold-400/10 border border-gold-400"
            >
              <p className="text-gold-400 font-semibold">✓ You're on the list. Welcome to the inner circle.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-void border border-mist text-white placeholder:text-text-muted focus:border-gold-400 focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 py-4 bg-gold-400 text-void font-semibold uppercase tracking-wider hover:bg-gold-500 transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          )}

          <p className="text-text-muted text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
