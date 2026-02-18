"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
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
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">Our Story</p>

            <h1 className="font-display text-5xl md:text-7xl mb-6">
              <span className="text-gold-gradient">From the Pyramids</span>
              <br />
to the World
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              Cleopatra Delights began with a simple obsession: the pursuit of the perfect dessert. 
              What started as a small patisserie in Cairo has evolved into a global celebration 
              of sweetness, spanning eight culinary kingdoms and countless generations of craft.
            </p>

            <p className="text-text-secondary leading-relaxed mb-8">
              Our journey has taken us from the banks of the Nile to the misty mountains of China, 
              from the bustling streets of Istanbul to the elegant salons of Paris. Along the way, 
              we have mastered techniques passed down through millennia, learned from master craftspeople 
              in every corner of the globe, and developed a deep respect for the traditions that make 
              each dessert unique.
            </p>

            <p className="text-text-secondary leading-relaxed mb-8">
              Today, Cleopatra Delights is more than a brand—it is a passport to the world of desserts. 
              Our interactive map invites you to explore the legendary sweets of eight regions, 
              each with its own story, techniques, and flavors. From the honey-drenched baklava of 
              Turkey to the delicate macarons of France, every dessert in our collection represents 
              the pinnacle of its craft.
            </p>

            <div className="my-12 p-8 border border-gold/30 bg-gold/5">
              <blockquote className="font-display text-2xl text-gold text-center">
                "We do not just make desserts. We preserve history, honor tradition, 
                and push the boundaries of what sweetness can be."
              </blockquote>
            </div>

            <p className="text-text-secondary leading-relaxed">
              Our commitment to quality is unwavering. We source only the finest ingredients, 
              work with master craftspeople who have dedicated their lives to their art, and 
              never compromise on the techniques that make each dessert authentic. Whether you 
              are exploring our interactive map, collecting stamps in your culinary passport, 
              or ordering from our global catalog, you are experiencing the result of years of 
              dedication to the art of dessert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-16 px-6 border-t border-graphite">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl mb-4">Our Values</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                description:
                  "We respect the traditions behind every dessert. Our recipes are researched, tested, and approved by masters of each craft.",
              },
              {
                title: "Excellence",
                description:
                  "We never compromise on quality. From ingredients to technique, we pursue perfection in every detail.",
              },
              {
                title: "Innovation",
                description:
                  "While we honor tradition, we also push boundaries. Our fusion lab creates new classics that bridge cultures.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <h3 className="font-display text-2xl mb-4 text-gold">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 py-16 px-6 border-t border-graphite">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-4xl mb-4 text-center">Our Journey</h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { year: "2018", event: "Founded in Cairo, Egypt" },
              { year: "2019", event: "Expanded to Turkey and Greece" },
              { year: "2020", event: "Opened fusion lab for cross-cultural experiments" },
              { year: "2021", event: "Added France, Italy, and Saudi Arabia" },
              { year: "2022", event: "Launched interactive global dessert map" },
              { year: "2023", event: "Reached 8 culinary kingdoms" },
              { year: "2024", event: "Launched global passport program" },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <div className="w-24 text-right">
                  <span className="font-display text-2xl text-gold">{item.year}</span>
                </div>
                <div className="w-px h-12 bg-gold/30"></div>
                <div className="flex-1">
                  <p className="text-text-secondary">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-6">Begin Your Journey</h2>
            
            <p className="text-text-secondary text-lg mb-8">
              Explore our interactive map and discover the world of desserts.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gold text-void font-semibold uppercase tracking-wider hover:bg-gold-light transition-colors"
              >
                Explore the Map
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
