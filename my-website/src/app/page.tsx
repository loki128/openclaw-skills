"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const features = [
  {
    title: "Lightning Fast",
    description: "Optimized performance with 60fps animations",
    icon: "⚡",
  },
  {
    title: "Beautiful Design",
    description: "Crafted with attention to every detail",
    icon: "✨",
  },
  {
    title: "Fully Responsive",
    description: "Looks perfect on any device",
    icon: "📱",
  },
  {
    title: "Type Safe",
    description: "Built with TypeScript for reliability",
    icon: "🔒",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm"
          >
            <span className="mr-2 flex h-2 w-2 rounded-full bg-green-500" />
            Now available
          </motion.div>

          <motion.h1
            className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Build something
            <br />
            <span className="text-neutral-500">amazing today</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg leading-8 text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            A modern, animated website built with Next.js, Tailwind CSS, and
            Framer Motion. Experience smooth interactions and beautiful design.
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              size="lg"
              className="rounded-full px-8 transition-transform hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full transition-transform hover:scale-105"
            >
              Learn more →
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="group h-full border-neutral-200 bg-white/50 backdrop-blur transition-all hover:border-neutral-300 hover:shadow-lg">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <motion.div
                      className="mb-4 text-4xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="mb-2 text-lg font-semibold text-neutral-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Animated Cards Section */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full overflow-hidden border-neutral-200">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-2xl font-bold text-neutral-900">
                    Smooth Animations
                  </h3>
                  <p className="mb-6 text-neutral-600">
                    Every interaction is carefully crafted with Framer Motion for
                    buttery smooth 60fps animations that delight users.
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-12 w-12 rounded-lg bg-neutral-200"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="h-full overflow-hidden border-neutral-200">
                <CardContent className="p-8">
                  <h3 className="mb-4 text-2xl font-bold text-neutral-900">
                    Responsive Design
                  </h3>
                  <p className="mb-6 text-neutral-600">
                    Built mobile-first with Tailwind CSS. Every component adapts
                    beautifully from phones to widescreen displays.
                  </p>
                  <div className="flex items-end gap-2">
                    {[40, 60, 80, 100, 80, 60, 40].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-8 rounded-t bg-neutral-800"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          type: "spring",
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Join thousands of developers building amazing things.
          </p>
          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="rounded-full px-8 text-lg shadow-lg transition-shadow hover:shadow-xl"
            >
              Start Building Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 px-6 py-12 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl text-center text-sm text-neutral-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© 2024 My Website. Built with Next.js, Tailwind CSS & Framer Motion.</p>
        </motion.div>
      </footer>
    </main>
  );
}
