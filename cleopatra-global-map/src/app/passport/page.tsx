"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { regions } from "@/data/regions";

export default function PassportPage() {
  const [visitedRegions, setVisitedRegions] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading visited regions from localStorage
    const saved = localStorage.getItem("visitedRegions");
    if (saved) {
      setVisitedRegions(JSON.parse(saved));
    }
  }, []);

  const toggleVisited = (slug: string) => {
    const newVisited = visitedRegions.includes(slug)
      ? visitedRegions.filter((r) => r !== slug)
      : [...visitedRegions, slug];
    setVisitedRegions(newVisited);
    localStorage.setItem("visitedRegions", JSON.stringify(newVisited));
  };

  const progress = (visitedRegions.length / regions.length) * 100;

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
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-4">Your Journey</p>

            <h1 className="font-display text-5xl md:text-7xl mb-6">
              <span className="text-gold-gradient">Culinary Passport</span>
            </h1>

            <p className="text-text-secondary text-lg mb-8">
              Collect stamps as you explore the world of desserts. 
              Visit all 8 regions to become a true connoisseur.
            </p>

            {/* Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-text-secondary mb-2">
                <span>Progress</span>
                <span>{visitedRegions.length} / {regions.length}</span>
              </div>
              <div className="h-2 bg-graphite rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stamps Grid */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => {
              const isVisited = visitedRegions.includes(region.slug);

              return (
                <motion.div
                  key={region.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => toggleVisited(region.slug)}
                  className={`relative aspect-square border-2 cursor-pointer transition-all duration-300 ${
                    isVisited
                      ? "border-gold bg-gold/10"
                      : "border-graphite bg-charcoal/50 hover:border-gold/50"
                  }`}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    {isVisited ? (
                      <>
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="text-6xl mb-4"
                          style={{ color: region.accentColor }}
                        >
                          ✦
                        </motion.div>
                        <h3 className="font-display text-2xl text-center">{region.name}</h3>
                        <p className="text-gold text-sm uppercase tracking-wider mt-2">Visited</p>
                      </>
                    ) : (
                      <>
                        <div className="text-4xl text-graphite mb-4">🔒</div>
                        <h3 className="font-display text-xl text-text-muted text-center">
                          {region.name}
                        </h3>
                        <p className="text-text-muted text-sm mt-2">Click to stamp</p>
                      </>
                    )}
                  </div>

                  {isVisited && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-2 right-2 w-8 h-8 bg-gold flex items-center justify-center"
                    >
                      <span className="text-void text-lg">✓</span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievement */}
      {visitedRegions.length === regions.length && (
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 py-16 px-6"
        >
          <div className="max-w-2xl mx-auto text-center p-8 border-2 border-gold bg-gold/5">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="font-display text-4xl mb-4">Master Connoisseur</h2>
            <p className="text-text-secondary">
              You have explored all 8 culinary kingdoms. 
              You now possess knowledge of the world&apos;s finest desserts.
            </p>
          </div>
        </motion.section>
      )}
    </main>
  );
}
