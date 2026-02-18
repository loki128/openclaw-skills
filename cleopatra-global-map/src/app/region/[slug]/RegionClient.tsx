"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Region } from "@/data/regions";
import { regions } from "@/data/regions";

interface RegionClientProps {
  region: Region;
}

export default function RegionClient({ region }: RegionClientProps) {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background with region accent */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background: `linear-gradient(135deg, #0a0a0a 0%, ${region.accentColor}10 50%, #0a0a0a 100%)`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold flex items-center justify-center">
              <span className="text-void font-bold text-lg">C</span>
            </div>
            <div>
              <span className="font-display text-xl tracking-wide">Cleopatra Delights</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-text-secondary hover:text-gold transition-colors uppercase tracking-wider"
            >
              ← Back to Map
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p
              className="text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: region.accentColor }}
            >
              {region.nameLocal}
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6">
              <span style={{ color: region.accentColor }}>{region.name}</span>
            </h1>

            <p className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-8">
              {region.mythicStory}
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {region.flavorProfile.map((flavor) => (
                <span
                  key={flavor}
                  className="px-4 py-2 text-sm rounded-full border"
                  style={{
                    borderColor: `${region.accentColor}40`,
                    color: region.accentColor,
                  }}
                >
                  {flavor}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mastered Sweets Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl mb-4">Mastered Sweets</h2>
            <p className="text-text-secondary">Legendary desserts perfected over generations</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {region.desserts.map((dessert, index) => (
              <motion.div
                key={dessert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-charcoal border border-graphite overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {dessert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: `${region.accentColor}20`,
                          color: region.accentColor,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-2xl mb-2 group-hover:text-gold transition-colors">
                    {dessert.name}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4">{dessert.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {dessert.flavorNotes.map((note) => (
                      <span key={note} className="text-xs text-text-muted">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-300"
                  style={{ backgroundColor: region.accentColor }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Techniques Section */}
      <section className="relative z-10 py-16 px-6 bg-charcoal/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-5xl mb-6">Craft Techniques</h2>
              
              <p className="text-text-secondary mb-8">
                The ancient arts that transform simple ingredients into legendary desserts.
              </p>

              <div className="space-y-4">
                {region.techniques.map((technique, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 border border-graphite hover:border-gold/30 transition-colors"
                  >
                    <span
                      className="text-2xl font-display"
                      style={{ color: region.accentColor }}
                    >
                      0{index + 1}
                    </span>
                    <p className="text-text-secondary">{technique}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className="aspect-square border border-graphite p-8 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${region.accentColor}10, transparent)`,
                }}
              >
                <div className="text-center">
                  <div
                    className="text-8xl font-display mb-4"
                    style={{ color: region.accentColor }}
                  >
                    {region.desserts.length}
                  </div>
                  <p className="text-text-secondary uppercase tracking-wider">
                    Mastered Desserts
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-6">Experience {region.name}</h2>
            
            <p className="text-text-secondary text-lg mb-8">
              Order from our curated selection of {region.name}&apos;s finest desserts.
              Each piece is crafted to order and shipped fresh.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 font-semibold uppercase tracking-wider transition-colors"
                style={{
                  backgroundColor: region.accentColor,
                  color: '#0a0a0a',
                }}
              >
                View Drop Menu
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/"
                  className="inline-block px-8 py-4 border border-gold text-gold font-semibold uppercase tracking-wider hover:bg-gold/10 transition-colors"
                >
                  Explore More Regions
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-graphite">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold flex items-center justify-center">
              <span className="text-void font-bold">C</span>
            </div>
            <span className="font-display text-lg">Cleopatra Delights</span>
          </Link>

          <div className="flex gap-6">
            {regions
              .filter((r) => r.slug !== region.slug)
              .slice(0, 4)
              .map((r) => (
                <Link
                  key={r.slug}
                  href={`/region/${r.slug}`}
                  className="text-sm text-text-secondary hover:text-gold transition-colors"
                >
                  {r.name}
                </Link>
              ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
