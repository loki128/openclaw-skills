"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WorldMap from "@/components/WorldMap";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-charcoal to-void" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.1),transparent_50%)]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold flex items-center justify-center">
              <span className="text-void font-bold text-lg">C</span>
            </div>
            <div>
              <span className="font-display text-xl tracking-wide">Cleopatra Delights</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/passport" className="text-sm text-text-secondary hover:text-gold transition-colors uppercase tracking-wider">
              Passport
            </Link>
            <Link href="/menu" className="text-sm text-text-secondary hover:text-gold transition-colors uppercase tracking-wider">
              Menu
            </Link>
            <Link href="/about" className="text-sm text-text-secondary hover:text-gold transition-colors uppercase tracking-wider">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">From the Pyramids to the World</p>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6">
              <span className="text-gold-gradient">Global Dessert Map</span>
            </h1>
            
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8">
              We mastered sweets across continents. Explore our interactive map 
              and discover legendary desserts from eight culinary kingdoms.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#map"
                  className="inline-block px-8 py-4 bg-gold text-void font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors"
                >
                  Explore the Map
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/passport"
                  className="inline-block px-8 py-4 border border-gold text-gold font-semibold uppercase tracking-wider hover:bg-gold/10 transition-colors"
                >
                  View Passport
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <WorldMap />
            
            {/* Map Legend */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gold"></span>
                <span>Available Regions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-graphite"></span>
                <span>Coming Soon</span>
              </div>
              <p className="w-full text-center mt-4 text-text-muted">
                Click on a region to explore its desserts
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "8 Culinary Kingdoms",
                description: "From Egypt to Italy, explore the world's most legendary dessert traditions.",
                icon: "🌍",
              },
              {
                title: "Mastered Techniques",
                description: "Learn the ancient craft behind phyllo mastery, syrup control, and more.",
                icon: "⚡",
              },
              {
                title: "Signature Fusions",
                description: "Experience cross-cultural mashups that push the boundaries of sweetness.",
                icon: "✦",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-graphite bg-charcoal/50 backdrop-blur-sm hover:border-gold/50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-2xl mb-3">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-graphite">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gold flex items-center justify-center">
                <span className="text-void font-bold">C</span>
              </div>
              <span className="font-display text-lg">Cleopatra Delights</span>
            </div>
            
            <p className="text-text-muted text-sm">© 2024 Cleopatra Delights. All rights reserved.</p>
            
            <div className="flex gap-6">
              <a href="#" className="text-text-secondary hover:text-gold transition-colors">Instagram</a>
              <a href="#" className="text-text-secondary hover:text-gold transition-colors">Twitter</a>
              <a href="#" className="text-text-secondary hover:text-gold transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
