"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { regions, fusionDesserts } from "@/data/regions";

export default function MenuPage() {
  const allDesserts = regions.flatMap((region) =>
    region.desserts.map((dessert) => ({
      ...dessert,
      regionName: region.name,
      regionColor: region.accentColor,
    }))
  );

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-charcoal to-void" />

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

          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-gold transition-colors uppercase tracking-wider"
          >
            ← Back to Map
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">Global Catalog</p>

            <h1 className="font-display text-5xl md:text-7xl mb-6">
              <span className="text-gold-gradient">The Complete Menu</span>
            </h1>

            <p className="text-text-secondary text-lg">
              Every dessert from every region. Available for order while supplies last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fusion Section */}
      <section className="relative z-10 py-16 px-6 border-t border-graphite">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl mb-4">Signature Fusion Lab</h2>
            <p className="text-text-secondary">Cross-cultural mashups that push boundaries</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {fusionDesserts.map((fusion, index) => (
              <motion.div
                key={fusion.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-charcoal border border-graphite overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={fusion.image}
                    alt={fusion.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-gold text-void text-xs font-semibold uppercase">
                      Fusion
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-2xl mb-2 group-hover:text-gold transition-colors">
                    {fusion.name}
                  </h3>
                  
                  <p className="text-text-secondary text-sm mb-4">{fusion.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {fusion.regions.map((region) => (
                      <span
                        key={region}
                        className="text-xs px-2 py-1 rounded bg-graphite text-text-muted"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Desserts */}
      <section className="relative z-10 py-16 px-6 border-t border-graphite">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl mb-4">All Desserts</h2>
            <p className="text-text-secondary">{allDesserts.length} items from {regions.length} regions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allDesserts.map((dessert, index) => (
              <motion.div
                key={dessert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                viewport={{ once: true }}
                className="group bg-charcoal border border-graphite overflow-hidden hover:border-gold/30 transition-colors"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div
                    className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold uppercase"
                    style={{
                      backgroundColor: `${dessert.regionColor}20`,
                      color: dessert.regionColor,
                    }}
                  >
                    {dessert.regionName}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-display text-lg mb-1">{dessert.name}</h3>
                  
                  <p className="text-text-muted text-sm line-clamp-2">{dessert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
